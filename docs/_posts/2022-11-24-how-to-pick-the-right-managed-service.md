---
layout: post
title:  "How to pick the right managed service"
subtitle: "A wide range of options is great but an informed choice can be quite time-consuming"
tags: [software architecture, cloud architecture, cloud providers, aws, managed services, cloud services, cloud cost]
imgs-path: /assets/img/how-to-pick-the-right-managed-service/
cover-img: /assets/img/how-to-pick-the-right-managed-service/caramelle.jpg
permalink: /how-to-pick-the-right-managed-service/
---

{: .toc .toc-title}
- [A *fairly* easy example](#a-fairly-easy-example)
- [A *not-so-easy* example](#a-not-so-easy-example)
- [A rational analytic approach](#a-rational-analytic-approach)
- [An intuitive approach - the expert's opinion](#an-intuitive-approach---the-experts-opinion)
- [TLDR](#tldr)

During a feature development, it may happen that it's advisable to introduce a new managed service, for example a new database, a new storage type, or a computing or integration service.

In some cases the choice is quite easy, because in the context of the project, there are no equally valid alternatives or because that service is universally recognized as optimal, or at least the preferable one.
To be clear, there are *always* alternatives to consider, but in some cases it doesn't make sense to spend a lot of time evaluating all the options, because one of them is very clearly recommended.

## A *fairly* easy example

Let's take the example of a use case where a software component needs a cache to reduce the number of requests made to the database and increase the throughput. It is an application hosted on a cloud provider, and there are no tight budget constraints. Data volumes are not extremely heavy and we need a simple in-memory key-value store. The best strategy could be almost obvious: use *Redis* as a managed service. Minimal infrastructure impact for the DevOps team, adoption of an established and standard tool, known and loved by developers, etc etc.
We could talk for hours about all the possible alternatives, nuances of configuration and different possible options, but all in all, I think that 90% of people would agree and would suggest the same strategy.

## A *not-so-easy* example

![]({{page.imgs-path}}headache.jpg){: .float-right .max-width-50 .lightborder}

The choice is not always so easy, sometimes there are *many* managed services that would perfectly fit the use case, or that at least, in slightly different ways, could let us achieve the desired result.  
In these cases the variables to consider are many, and it's not easy to put them all on the table and make the right decision.

An example that recently happened to me is: which storage should I use for metrics coming from IoT devices? This is a project on AWS, and the possible options here are many:  
- Amazon Timestream? With what lifecycle policy?  
- Amazon DynamoDB? With what primarykey configuration?  
- OpenSearch or ElasticSearch could work well too?  
- Or Amazon Managed Service for Prometheus?  
- And what about a good old partitioned table on Amazon RDS for PostgreSQL?  
- In addition to the write load, do we have to manage intensive reading?  
- What reading patterns should we use?  
- What will be the data life cycle?

The issue is not simple, and the effect of this choice can have a huge impact on costs, on the time needed to achieve the result, and on its final value.

## A rational analytic approach
![]({{page.imgs-path}}abacus.jpg){: .float-right .max-width-50 .lightborder}

The most natural approach, since after all we are software engineers, is to ask ourselves some questions, pull out something measurable, and weigh the pros and cons.
 
If it's a new service, for example, it would be right to ask ourselves:

- What is the cost model? Is it sustainable?
- Having no costs' historical data, are we sure that there are no side costs?
- How long can we invest in a POC to validate the theory and test it?
- What is the delta value that the service would provide in the short and long term?
- Have we considered all the extra costs of an extra service? For example those related to additional effort for Devops processes, monitoring, and maintenance?
- Are there any indirect benefits to its adoption? Would it bring value to the project also for other future features?
- Could this new technology become a problem in the future because of the lack of skills in the team or in the company?

If we are evaluating an already used service, the questions will be slightly different, but still quite complicated, for example:

- Is the cost model that we already have a 100% valid time series, in this new scenario?
- Are we making compromises on alternatives?
- Are we sure that we’ve considered all of the alternatives?

It's easy to opt for a **good** risk-free solution instead of a **great** one with some risk margin, but it may not always be a winning strategy, especially in the long run.

There are also many other general questions, not so exciting for a typical developer, that are often forgotten:
- Is the service mature and production-ready?
- Is it already listed as *generally available*?
- Is the support service suitable for our production environment?
- Is the service geographically available in the region where the project will be deployed?
- Is it or will it be available also in the regions where an expansion is planned?

This is not meant to be an exhaustive list, I’m definitely forgetting several points, and of course the specificity of the single project would produce more specific and detailed questions.

A further bad news is that to follow such an analytical approach we should answer all these questions *for each* of the possible options.
Also, when the choice is not only on a single component but involves more than one, the amount of possible variables grows exponentially, and consequently the number of assessments in charge to the decision maker.
In these cases, this type of approach, which is always preferable in principle, could become very challenging, or even unsustainable.

##  An intuitive approach - the expert's opinion

In order not to get bogged down into a never-ending analysis, at this point the only way out is to use the experience, built mostly on past mistakes and successes, to make a choice dictated *also* by a small instinctive component.

![]({{page.imgs-path}}platone.jpg){: .float-left .max-width-50 .lightborder}

{: .box-citation .max-width-50 .float-left}
Opinion is the medium between knowledge and ignorance.  
&emsp; &emsp; &emsp; &emsp; &emsp; **--Plato**

The aim is certainly not to make irrational and not-data-driven choices. But from my point of view, it is sometimes crucial to try to simplify the problem by removing some options from the table without major time investments, for example looking for just a single reason to discard them. Sometimes these options are possible, reasonable, and maybe even could bring some remarkable strengths, but we can still assume with a certain degree of security that they will not be those with the best cost/benefit balance.
A few examples:
- The service costs *much more* than other options, and for the project the cost is a critical point (has ever existed one where it wasn't?)
- The service demands very specific knowledge that is not available in the team, and there is no time to acquire that competence
- High performance is required, and other solutions are definitely better

Reducing the number of options by relying on experience is the best way to make sure that the remaining options are an acceptable number and so that an analytical approach is sustainable.
When it comes to software architecture is always good to be flexible and find a balance, sometimes accepting some compromise.

Last but not least, once the decision is made, it is *fundamental* to document it as an ADR (architectural decision record), for a long series of good reasons, that maybe in the future I will talk about in a dedicated article.

## TLDR
Making a conscious choice in the rich offer of cloud providers is tough, and requires a multi-disciplinary approach. But there are some questions that we can ask ourselves to simplify the process. 
It's good to be analytical but to be faster enough for the business it's equally important to be pragmatic and leverage your experience in order to reduce the amount of evaluations.
