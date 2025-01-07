---
layout: post
title:  "OpenSearch metrics challenge: can you spot the performance flaw?"
subtitle: "How a deep analysis of metrics can reveal a hidden issue"
tags: [OpenSearch, data, cloud services, aws, metrics, monitoring]
imgs-path: /assets/img/opensearch-metrics/
cover-img: /assets/img/opensearch-metrics/cover.jpeg
permalink: /opensearch-metrics/
---

{: .toc .toc-title}
- [Introduction](#introduction)
- [The project context](#the-project-context)
- [Three high-level metrics](#three-high-level-metrics)
- [Need a little help?](#need-a-little-help)
    - [Clue n.1](#clue-n1)
    - [Clue n.2](#clue-n2)
    - [Clue n.3](#clue-n3)
    - [Clue n.4](#clue-n4)
    - [Clue n.5](#clue-n5)
- [The hidden anomaly](#the-hidden-anomaly)
- [Identifying the Root Cause](#identifying-the-root-cause)
- [Fixing the Issue](#fixing-the-issue)
    - [HTTP Requests](#http-requests)
    - [SearchRate](#searchrate)
    - [Average Request Time](#average-request-time)
    - [ThreadPoolSearchQueue](#threadpoolsearchqueue)
- [Scaling-in the cluster](#scaling-in-the-cluster)
- [Lessons Learned](#lessons-learned)


## Introduction
If you run an OpenSearch cluster, as with all other cloud services, performance and cost optimization are a must.\
By carefully analyzing performance metrics, we can uncover hidden issues and significantly boost the efficiency of our systems.

In this article, we will explore a specific real world case involving an error in the code, and how a deep analysis of the metrics led to a surprising revelation and a subsequent performance improvement.

To make the reading experience a little bit more interactive, instead of simply starting from the ending revelation, let's try to live the same experience that our team faced while managing the system.\
  If you don't want to play this little game, go ahead and you'll find the interesting details in the paragraph ["The hidden anomaly"](#the-hidden-anomaly) below.

## The project context
The OpenSearch cluster was used in our system for different application features, but mostly as a regular document store, with documents added and updated at a high frequency and queries executed mostly by Id.\
The indexes were configured with 5 shards and 1 replica, and all documents had a consistent schema.\
As often happens, the adoption of OpenSearch started with a single small feature and gradually more features were added.

In the previous months, the growing performance requirements and the high cpu usage brought the original 3-node cluster to grow up to 12 nodes (3 master nodes + 9 data nodes) and worryingly it seemed that the performance couldn't improve anymore, even adding more nodes.

## Three high-level metrics
This is the recurring daily shape that we see in many metrics, due to the load pattern that follows the business hours, with the lunch break in the middle of the hill.\
![Daily recurring shape]({{page.imgs-path}}recurring-shape.png){: .max-width-40 .centered}

AWS offers a lot of different metrics, but in this article, we will focus on just 3 of them.\
All the following charts represent the average value for each metric in a time range of 3 days.

- **Indexing Data Rate** (IndexingRate): *The number of indexing operations per minute.*
![Indexing rate]({{page.imgs-path}}indexing-rate.png)

- **HTTP requests** by response code: *The number of requests to a domain.*
![HTTP requests]({{page.imgs-path}}http-requests.png)

- **Search rate** (SearchRate): *The number of search operations per minute for all shards in the cluster.*
![Search rate]({{page.imgs-path}}search-rate.png)

**The Challenge:** Looking at these metrics and knowing the context given before, can you see anything strange in these metrics?

## Need a little help?

![Question]({{page.imgs-path}}question-small.png){: .float-right }
If you have already found the anomaly, congratulations, you're a true master of OpenSearch monitoring!\
Otherwise, try to read the following clues, which will gradually lead you to the solution.

#### Clue n.1
- The anomaly is not related to the shape of the metric chart.\
Okay, this clue is important but probably it doesn't help so much.\
Let's go on.

#### Clue n.2
- Focus on the metric SearchRate.\
Anything yet?

#### Clue n.3
- Compare the metric SearchRate and HTTPRequests.\
Uhm... yes, the unbalance between the morning hill and the afternoon hill is strange, but here it's not meaningful.

#### Clue n.4
- Think about this detail given in the context: "queries are mostly executed by Id".\
Still nothing?

#### Clue n.5
- Consider the fact that *searches per Id* should actually contribute to the *SearchRate* metric, **but** should be performed **only on the shard** that is relevant, not all shards.

## The hidden anomaly

![Idea]({{page.imgs-path}}idea.png){: .float-right }
The interesting point here, that has been in front of our eyes but remained unnoticed for months, is **the scale** of the SearchRate metric.

The shape of the metric was pretty much regular and well overlapped with the others, but we missed an important detail.\
Let's look at the top values during peak hours for these metrics:
- 8,000 HTTP requests per minute
- 80,000 searches per minute

![Metrics comparison]({{page.imgs-path}}metrics-compare.png)

Why is the search rate ~10 times higher than the request rate?

As said the indexes are configured to have 5 shards, so for each HTTP request there should be **at most 5 search operations**, one for each shard of the index, but here we can see an unexplainable 10x ratio.

![Think]({{page.imgs-path}}think-small.png){: .float-right }
Also, if we think that these searches are not full-text searches but are simple *per-Id* queries, for each request we should see **just one search**, because after hashing the document id and applying the internal routing algorithm, we should expect the OpenSearch engine to go straight and ask for the document only to the relevant shard.

So, what are we missing here?

## Identifying the Root Cause
Our investigation revealed that the root cause of the anomaly was due to how our queries were executed.\
The queries were executed by our components leveraging a common library shared by many of our Java micro-services. Because of a bug introduced years before, probably when the engine was still ElasticSearch, **the queries were always run without specifying the index pattern**.\
The caller software was regularly executing each query specifying **both** the document Id **and** the index pattern, but the index pattern parameter was routinely lost inside the shared library and the resulting query that was sent to OpenSearch was lacking of it.

The default behavior of OpenSearch, not so obvious for people thinking with a traditional relational data approach, is that if you don't specify the index name or the index pattern, the search operation is performed on the whole cluster.\
This way, every single query, instead of being addressed to the right index and to the right shard, was addressed to each index with a compatible schema, with a significant and unintended consumption of resources. 

## Fixing the Issue
Once we identified the root cause, we corrected our code to ensure that the index pattern was always specified in the queries.\
This small yet crucial change led to a significant improvement in performance and resource utilization. 

Let's see what happened when we deployed the new software version of the shared library that fixed the error.

#### HTTP Requests
This is the **HTTP requests** metric, where we can see the usual system load and the interruption created by the maintenance window while the deployment was made:
![HTTP requests]({{page.imgs-path}}after-fix-1-http-requests.png)

#### SearchRate
Immediately after the deploy, we could see an **amazing drop** in the number of searches operations:
![Search rate]({{page.imgs-path}}after-fix-2-search-rate.png)

#### Average Request Time
The highest level representation of the real impact of the perfromance improvement, as perceived by the caller clients, is the request time measured by DataDog APM.
![Average Request Timel]({{page.imgs-path}}after-fix-4-average-time-per-request.png)

#### ThreadPoolSearchQueue
This is another metric that highlighted very well the load reduction on the cluster. It represents *the number of queued tasks in the search thread pool*.
![Search thread pool]({{page.imgs-path}}after-fix-3-search-thread-pool.png)
The documentation also states that *if the queue size is consistently high, consider scaling your cluster*.

## Scaling-in the cluster
Of course, given the situation, we could evaluate an unexpected horizontal scale-in of our cluster, in order to reduce our cloud cost. The next consequent step was a progressive reduction of the number of nodes in the cluster.\
This is what happened during a 2 weeks time window in which we gradually reduced the number of data nodes from 9 to 6, and eventually to 3.

![OpenSearch nodes reduction]({{page.imgs-path}}nodes-reduction-1-nodes.png)

And here is the last chart, where we can see that the impact on the cluster **CPU utilization** was almost unnoticeable, even if we were executing the queries on a cluster whose data nodes pool had been reduced by 66%. 

![OpenSearch CPU utilization]({{page.imgs-path}}nodes-reduction-2-cpu.png)

## Lessons Learned
This experience taught us several valuable lessons.

Firstly, specifying the index name or the index pattern in search queries per Id is crucial to prevent waste of resources.\
Quite an obvious concept, but not so easily noticeable if the lack of index reference has been introduced by mistake.\
OpenSearch's good performances can hide very well the additional load created by unoptimized queries.

Secondly, monitoring performance metrics can reveal hidden issues that might otherwise go unnoticed and can have very bad consequences. But this kind of monitoring requires great attention to detail, a deep understanding of metrics and logs, and deepening down into hundreds of metrics is very time-consuming.\
It is really easy to be deceived by superficial analysis.

Lastly, as a developer, never forget that the impact of a simple bug due to distraction, like forgetting to pass an optional parameter, can cost so much more than you can imagine.

