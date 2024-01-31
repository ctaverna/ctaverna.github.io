---
layout: post
title:  "I asked 3 cloud architecture questions to Amazon Q"
subtitle: "And compared the result with Copilot and ChatGPT"
tags: [AI, aws, software architecture, cloud architecture, cloud services]
imgs-path: /assets/img/3-questions-to-amazon-q/
cover-img: /assets/img/3-questions-to-amazon-q/cover.jpg
permalink: /3-questions-to-amazon-q/
---

{: .toc .toc-title}
- [Question 1 - A general architectural question](#question-1---a-general-architectural-question)
    - [Amazon Q Answer](#amazon-q-answer)
    - [Amazon Q Answer](#amazon-q-answer-1)
    - [Copilot answer](#copilot-answer)
    - [ChatGPT answer](#chatgpt-answer)
- [Question 2 - A technical issue](#question-2---a-technical-issue)
    - [Amazon Q Answer](#amazon-q-answer-2)
    - [Amazon Q Answer](#amazon-q-answer-3)
    - [Copilot Answer](#copilot-answer-1)
    - [ChatGPT Answer](#chatgpt-answer-1)
- [Question 3 - A cost evaluation](#question-3---a-cost-evaluation)
    - [Amazon Q Answer](#amazon-q-answer-4)
    - [Copilot Answer](#copilot-answer-2)
    - [ChatGPT Answer](#chatgpt-answer-2)
- [Conclusion](#conclusion)


After the re:Invent 2023 release announcement of Amazon Q, I immediately started to wonder if it can **really** be a useful tool to help me in my daily job as a cloud architect using AWS services.  
Is it just a cool toy or a game-changer?  

My basic expectation is that Amazon Q can be a good assistant in the daily boring and time-consuming task of searching for information in the AWS documentation. 
I’m not saying that creating a smart interface for information gathering should be taken for granted because it’s an easy implementation, of course. But we are in 2024, we are talking about AWS, we are used to seeing and using generative AI tools, and the wow effect has (almost) gone.
I appreciate a lot the AWS idea of creating a “generative AI–powered assistant designed for work”, for real-world users and not just for demonstrations.
So, focusing on its generic ability to be an expert in AWS I made my tests using the Amazon Q assistant in the sidebar of the AWS management console. This is just one of the capabilities of Amazon Q, but is for sure the most immediate to interact with.

I started chatting with Q about a simple architectural design question, then I asked for help with a technical issue, and finally a cost evaluation.  
As an additional quality check, I submitted each question also to Copilot and ChatGPT 3.5, and then I expressed my evaluation of the quality of each response.

This is the result of my far-from-analytical analysis.

# Question 1 - A general architectural question

I asked a high-level architectural question, not too difficult but not too simple, with many possible right options. 

```I have a system with very unpredictable load.```  
```I need to implement a feature to show simple polls to the users and collect their feedbacks.```  
```Users should be able to express one vote in a 2 minutes time window.```  
```The results should be hidden for the first minute and then they should see the results being updated in real time.```  
```Can you suggest me a good architecture?```

### Amazon Q Answer

>I apologize, but your request seems to be outside my domain of expertise. However, I'm happy to try discussing related topics that I may have more information on. How can I help further our conversation productively?

Okay, this approach for some unknown reason is not working.  
May a more precise question sound better to Q?

```I have to collect votes from the users of my platforms.```  
```What services could be a good solution to ingest this data and at the same time be able to read at a high frequency?```  

### Amazon Q Answer
> Here are a few options on AWS that would be suitable for ingesting vote data at high frequency while being able to read the data:
1. Amazon Kinesis Data Streams - This service allows you to continuously capture and store terabytes of data per hour from hundreds of thousands of sources. It supports stream processing frameworks like Kinesis Client Library, Apache Storm, and Apache Spark Streaming. The ingested data can then be processed in real-time. 
2. Amazon DynamoDB - Being a fully managed NoSQL database service, DynamoDB provides fast and predictable performance with seamless scalability. It can handle millions of requests per second and can scale to handle any workload. The vote data can be ingested into DynamoDB tables and queried for aggregation and analysis at high frequency.
3. Amazon ElastiCache for Redis - Using ElastiCache which provides in-memory data store solutions like Redis, the vote data can be written to Redis very quickly due to its in-memory speed. The data can then be aggregated and read in real-time for high frequency needs. ElastiCache also auto scales the cache capacity as needed.

This answer is pretty good.  
Of course, it's just a starting point and it's necessary to deepen into many details.  
But in my opinion, this is absolutely a good answer: it explores the problem of ingesting the votes, where to store the data and how to read the data at high frequency. Amazon Q does not mention any computing service, but probably this is not a crucial point at this level of design.

Let's check what other competitors can do.

*NB: Being outside AWS, in these cases I used identical wording but I added a short premise in the beginning "I have a project in AWS."*

### Copilot answer

> Searching for: `AWS services for collecting votes from users`  
If you’re looking for an AWS service to collect votes from users, you might want to consider using **Amazon Simple Queue Service (SQS)**. SQS is a fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications. It can be used to transmit any volume of data, at any level of throughput, without losing messages or requiring other services to be available. You can use SQS to collect votes from your users and then process them at a high frequency. SQS is also highly available and fault-tolerant, so you can rely on it to handle your data with minimal downtime  
>
>Another AWS service that could be useful for your use case is **Amazon Kinesis Data Streams**. Kinesis Data Streams is a fully managed service that enables you to build custom applications that process or analyze streaming data for specialized needs. It can be used to collect and process large streams of data records in real time. You can use Kinesis Data Streams to ingest votes from your users and then process them in real time. Kinesis Data Streams is also highly scalable and can handle millions of data records per second.  
I hope this helps! Let me know if you have any other questions.

This answer is not completely wrong, but for sure it is not complete.  
Copilot is shortening and simplifying the question, moving the focus only on the ingestion services, SQS or Kinesis.

### ChatGPT answer

>For collecting votes from users on your platform and handling high-frequency reads, several AWS services can be employed to create a robust and scalable solution:
> 1. **Amazon API Gateway**: Use API Gateway to create RESTful APIs that can receive and process incoming votes from your users. API Gateway can handle high-frequency requests and integrate seamlessly with other AWS services.  
>2. **Amazon Kinesis**: If you're dealing with a high volume of incoming data (votes), consider using Amazon Kinesis. Kinesis Data Streams can ingest and store data in real-time and scale elastically to accommodate varying loads.  
>3. **Amazon DynamoDB**: DynamoDB is a fully managed NoSQL database service that offers low-latency performance at any scale. You can use DynamoDB to store and retrieve the votes submitted by your users. Its flexible schema and automatic scaling capabilities make it ideal for handling high-frequency reads and writes.  
>4. **Amazon S3**: For storing large volumes of data or for backup purposes, you can utilize Amazon S3. S3 is highly scalable, durable, and secure, making it suitable for storing raw or processed data related to the votes.  
>5. **AWS Lambda**: AWS Lambda can be used to execute code in response to events such as incoming votes. You can trigger Lambda functions to process and analyze the votes, perform validation checks, and store the data in DynamoDB or S3.  
>6. **Amazon CloudWatch**: Monitor the performance of your AWS resources and set up alarms using Amazon CloudWatch. This service can help you track metrics such as API Gateway request rates, DynamoDB throughput, and Lambda function invocations.
>  
>By combining these AWS services, you can design a highly available, scalable, and resilient architecture for collecting and processing votes from users on your platform. Make sure to consider factors like data consistency, security, and cost optimization while designing your solution.
 
At first glance, this answer seems even better than the one given by Amazon Q. But if you pay attention to the details, you can see that ChatGPT is just aggregating generic service descriptions.  
This is ok, and there is for sure a considerable value in giving a good selection of services that could be used in this architecture.
But, in the response given by Amazon Q, each service description is customized based on the specific use case of vote ingestion. I don't know if this is just a cosmetic difference, but it seems to me an indicator of a deeper "understanding" of the problem.

In my opinion, Amazon Q is the winner of this test.  
These are the points I decided to assign:

AmazonQ: **3 points** / Copilot: **0 points** / ChatGPT: **2 points**

# Question 2 - A technical issue 

For my experiment, I want Q now to support me in understanding a particular behavior of a service.

```In the last few days I can see an increase in the metric "Read throughput exceeded" of a Kinesis Data stream. What's the problem? ```

### Amazon Q Answer
> It looks like you need help with network connectivity issues. Amazon Q works with VPC Reachability Analyzer to provide an interactive generative AI experience for troubleshooting network connectivity issues. You can try [...]

No good.  
I tried to rephrase the question in many ways but without success, always this dumb answer.  
In the end, after a lot of tries, I got a meaningful answer using this format:

```Explain me the Read throughput exceeded metric exposed by Kinesis Data Stream```

### Amazon Q Answer
> The "Read throughput exceeded" metric indicates that the read capacity limits of the Kinesis data stream shard have been exceeded.
>
>Some potential reasons for this to occur are:
>1. The consumer application is not able to read data from the stream as fast as records are being produced. Each Kinesis shard can support a maximum of 2MB/s of read throughput on average.
>2. Multiple consumer applications are reading from the same shard and their combined read throughput exceeds 2MB/s.
>3. The GetRecords API call that the consumer uses to read data is retrieving too many records at once (over 10,000 records or 10MB of data) from the shard. This can throttle subsequent reads for 5 seconds.
>4. The processing of each record within the consumer application is taking too long, causing a backlog to build up.
>
>To resolve this, the consumer application should check if it can optimize record processing to keep pace with the incoming data rate. Other options are adding more shards to scale up throughput, or distributing reads across applications/shards in a way that balances utilization. Referring to the AWS documentation on Kinesis data stream quotas and limits would also help determine the appropriate configuration.

I think that Amazon Q is giving a barely sufficient answer.  
The reason 1 and 4 are both wrong, we have read throttling, not a high iterator age: the consumer is too fast, not too slow.

### Copilot Answer

>The “Read throughput exceeded” metric of a Kinesis Data stream indicates that the number of read operations on the stream has exceeded the provisioned read capacity. This can happen when the number of consumers reading from the stream increases, or when the size of the data being read increases. To identify the root cause of the issue, you can monitor the Amazon Kinesis Data Streams Service with Amazon CloudWatch.  
>Reviewing the following metrics in CloudWatch can help you identify the root cause of the error:
>
>- **ReadProvisionedThroughputExceeded**: This metric indicates that the number of read operations on the stream has exceeded the provisioned read capacity.
>- **GetRecords.Bytes**: This metric indicates the number of bytes read from the stream.
>- **GetRecords.Latency**: This metric indicates the time taken to read data from the stream.
>
> Once you have identified the root cause of the issue, you can take appropriate actions to resolve it. For example, you can increase the provisioned read capacity of the stream, or reduce the number of consumers reading from the stream. I hope this helps!

I only copied here the text from the Copilot answer, but the output was full of good links to various sources, official AWS documentation pages and other sites.  
Good job from Copilot, concise but relevant.

### ChatGPT Answer

> An increase in the "Read throughput exceeded" metric for a Kinesis Data stream typically indicates that your application is attempting to read more data from the stream than what it can handle. This could be due to various reasons:
>1. **Increased Traffic**: A sudden surge in incoming data to the Kinesis Data stream might be causing the read throughput to exceed its provisioned capacity.
>2. **Inefficient Consumer Code**: If your consumer application is inefficient or experiencing bottlenecks, it may not be able to keep up with the rate at which data is being written to the stream.
>3. **Scaling Issues**: If your application is not properly scaled to handle the increased load, it may struggle to process the incoming data from the stream efficiently.
>4. **Misconfigured Shard Count**: If the shard count for your Kinesis Data stream is not properly configured to handle the incoming data rate, you may encounter throughput issues.
>
>To address the problem:
>- **Monitor Metrics**: Continuously monitor the metrics for your Kinesis Data stream to understand the patterns and identify any anomalies.
>- **Increase Shard Count**: If the increased throughput is sustained and not just a temporary spike, consider increasing the number of shards in your Kinesis Data stream to handle the higher load.
>- **Optimize Consumer Code**: Review and optimize your consumer application code to ensure it can efficiently process the data from the stream.
>- **Implement Backpressure Mechanisms**: Implement backpressure mechanisms in your consumer application to regulate the rate at which data is read from the stream, allowing it to keep up with the incoming data.
>- **Consider AWS Lambda**: If applicable, consider using AWS Lambda functions to process data from the Kinesis Data stream. AWS Lambda can automatically scale to handle varying workloads.
>
>By addressing these factors, you can effectively manage the increased read throughput on your Kinesis Data stream and ensure the smooth operation of your AWS project.


This answer seems again very good at first glance, but if you go deeper you can find the same errors that had Amazon Q. The reasons 2, 3 and 4 are wrong, and so are most of the suggested solutions.  

The second round goes to Copilot.

AmazonQ: **1 point** / Copilot: **3 points** / ChatGPT: **1 point**


# Question 3 - A cost evaluation

```I have an S3 bucket where kinesis firehose is writing 1,000 files every day, each one weighting on average 10 MB.```  
```The probability to have the need of accessing the data is very low, and the data should be retained for 2 years.```  
```How much could I save each month switching from Stardard tier to Glacier Deep Archive tier?```  

### Amazon Q Answer
>Based on the information provided, here is how you could estimate the potential savings:
>Kinesis Data Firehose is writing 1000 files to your S3 bucket every day. Each file is approximately 10MB in size.
>- So daily incoming data is 1000 files x 10MB per file = 10GB per day
>- Monthly incoming data is approximately 10GB x 30 days = 300GB per month
>
>Since the data needs to be retained for 2 years, you could consider archiving it to Glacier Deep Archive tier.
>- Standard tier pricing is $0.023 per GB per month
>- Glacier Deep Archive tier pricing is $0.00099 per GB per month
>
>To calculate estimated monthly savings:
>
>- Monthly data stored in Standard tier would cost 300GB x $0.023 = $6.90
>- Monthly data stored in Glacier Deep Archive tier would cost 300GB x $0.00099 = $0.30
>
>Estimated monthly savings by switching to Glacier Deep Archive tier = $6.90 - $0.30 = $6.60
>
>For the most accurate pricing information, you should check the AWS documentation or pricing pages.

The calculation is not completely wrong, but Q is not considering the data accumulation.  
The first month the storage needed is 300 GB, but the second month it will be 600 GB, the third 900 GB and so on, up to the 24th month, when it will stop growing at about 7.2 TB. At this point, the total storage will be constant, and each month the oldest data will be replaced by the new.  

When fully operational, the AWS cost calculator, configured with 7.2 TB and 30.000 monthly PUT requests / Lifecycle Transitions, gives this estimation:

- Monthly cost of ~169$ for S3 Standard  
- Monthly cost of ~11$ for S3 Glacier Deep Archive

The monthly saving after 2 years will be something around 150$.  
In this scenario, it would probably have been more useful to ask something simpler like: "Give me a comparison between the cost of S3 standard tier and glacier deep archive".
For the purpose of this test it's interesting to point out that the answer from Amazon Q is good but not great.

### Copilot Answer

>Searching for: `AWS S3 bucket kinesis firehose 1000 files 10 MB 2 years cost comparison`
>
>Based on the information you provided, you could save a significant amount of money by switching from the Standard tier to the Glacier Deep Archive tier. The Standard tier is designed for frequent access to data, while the Glacier Deep Archive tier is intended for long-term data retention with infrequent access.
>
>The cost of storing 1,000 files per day, each weighing 10 MB, for 2 years in the Standard tier would be approximately **$6.912**.  
However, if you switch to the Glacier Deep Archive tier, the cost would be reduced to approximately **$1.152**.  
This means that you could save around **$5.760** per month by switching to the Glacier Deep Archive tier.
>
>Please note that the cost estimates are based on the current AWS pricing as of January 2024 and are subject to change.  Also, keep in mind that the retrieval time for data stored in the Glacier Deep Archive tier is longer than that of the Standard tier. If you need to access your data frequently, the Standard tier might be a better option for you.
>
>I hope this helps! Let me know if you have any other questions.

Same problem shown by Q, but without any useful detail about the calculations that have been made to get the evaluation.  
Not sufficient.

### ChatGPT Answer
> To calculate the potential savings from switching from the Standard tier to the Glacier Deep Archive tier for your S3 storage, we need to consider the difference in pricing between the two storage classes.
>
>Here are the main differences in pricing between Standard S3 storage and Glacier Deep Archive:
> 1. **Standard S3 Storage Pricing**: Standard S3 storage has a higher storage cost compared to Glacier Deep Archive. As of my last update, the standard S3 storage cost was around $0.023 per GB-month for the first 50 TB tier.
>2. **Glacier Deep Archive Pricing**: Glacier Deep Archive is significantly cheaper but incurs additional costs for data retrieval. As of my last update, the storage cost for Glacier Deep Archive was around $0.00099 per GB-month.
>
>Given that you have 1,000 files per day, each averaging 10 MB, let's calculate the monthly storage usage:
Each file: 10 MB = 0.01 GB  
Total daily storage: 1,000 files * 0.01 GB = 10 GB
Monthly storage: 10 GB * 30 days = 300 GB
>
>Now, let's calculate the monthly storage cost for both tiers:
>1. **Standard S3 Storage Cost**: Monthly cost = 300 GB * $0.023 per GB = $6.90
>2. **Glacier Deep Archive Storage Cost**: Monthly cost = 300 GB * $0.00099 per GB = $0.297
>
>Now, let's calculate the potential monthly savings:
>
>Savings = Standard S3 Storage Cost - Glacier Deep Archive
>Storage Cost Savings = $6.90 - $0.297 = $6.603
>
>So, by switching from the Standard tier to the Glacier Deep Archive tier, you could potentially save around $6.603 per month on storage costs.
>
>Please note that this calculation does not include additional costs for data retrieval from Glacier Deep Archive, which would be incurred if you need to access the data. Make sure to consider those costs if you anticipate needing to retrieve data from Glacier Deep Archive.

The result is very similar to the one from Amazon Q.
So these are my votes for the third test:
AmazonQ: **2 points** / Copilot: **1 point** / ChatGPT: **2 points**


# Conclusion

This is my final **personal** ranking:

| Test | Amazon Q | Copilot | ChatGPT |
| --- | --- | --- | --- |
| Architecture question | 3 | 0 | 2 |
| Technical issue | 1 | 3 | 1 |
| Cost evaluation | 2 | 1 | 2 |
|  | **6** | **4** | **5** |


In my opinion, **the winner is Amazon Q**.  
It has been fun to make this experiment, and the result is not far from what I was expecting from the test.  

My experience with Amazon Q as a companion while architecting on AWS is absolutely positive. Like all other generative AI tools it’s far from being perfect but it can be an invaluable ally in my everyday work as a software architect.

I am sure that in the future it will be improved and will become smarter, but **today** it is already a useful tool to retrieve information, validate options and get good suggestions.
