---
title: "Lambda functions"
subtitle: "Serverless compute platform"
is-folder: false
subcategory: "compute-and-containers"
sequence: 2
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [Invocation Models](#invocation-models)
- [Invocation Type](#invocation-type)
- [Securing Lambda Functions](#securing-lambda-functions)
  - [Permission policies](#permission-policies)
- [Code package](#code-package)
- [Function Handler](#function-handler)
- [Parameters](#parameters)
  - [Event Object](#event-object)
  - [Context Object](#context-object)
- [Configuration](#configuration)


Serverless compute platform that enables you to **run code** without provisioning or managing servers, with zero administration.

You can configure code to **trigger automatically from other AWS services**, or **call it directly** from any web or mobile app.\
AWS Lambda is sometimes referred to as a _function-as-a-service_ (FaaS).\


* Java, Go, PowerShell, Node.js, C#, Python e Ruby
* A single function can consume up to **5 layers** at a time
* Total unzipped size: **max 250 MB**
* Runs up to **15 minutes** long
* Can be registered as target to:
  * Target group (ALB) -> http request forwarded as JSON
  * S3
  * DynamoDB
  * SNS
  * SQS
  * CloudWatch eventsM
  * Many more



## Invocation Models

There are two invocation models for AWS Lambda.

* **Nonstreaming Event Source (Push Model)**\
  ****Amazon Echo, Amazon S3, Amazon SNS, and Amazon Cognito\
  With this model a service invokes the Lambda **each time an event occurs**.
* **Streaming Event Source (Pull Model)**\
  ****Amazon Kinesis or Amazon DynamoDB stream.\
  With this model Lambda **polls** a stream and invokes the function **upon detection** of a new record on the stream.

## Invocation Type

Additionally, you can execute an AWS Lambda function **synchronously** or **asynchronously**.\
The _**InvocationType**_ parameter can have three possible values:

* **RequestReponse:** Execute synchronously.
* **Event**: Execute asynchronously.
* **DryRun:** Test that the caller permits the invocation but does not execute the function.



## Securing Lambda Functions

AWS Lambda functions include two types of permissions.

* _**Execution permissions**_\
  _****_Enable the Lambda function **to access other AWS resources** in your account.\
  AWS Lambda refers to the IAM role that uses as an _execution role_.
* _**Invocation permissions**_** ** \
  ****The permissions **needed by an event source** to communicate with the Lambda.\
  Depending on the invocation model (push or pull), you can either update the access policy you associate with your AWS Lambda function (push) or update the execution role (pull).

### Permission policies

* **LambdaBasicExecutionRole**\
  ****Only CloudWatch log actions to write logs
* **LambdaKinesisExecutionRole** \
  ****Amazon Kinesis data stream and Amazon CloudWatch log actions
* **LambdaDynamoDBExecutionRole** \
  ****DynamoDB stream and Amazon CloudWatch log actions
* **LambdaVPCAccessExecutionRole** \
  ****EC2 actions to manage elastic network interfaces and CloudWatch log actions to write logs



## Code package

Contains **everything you need** to be available locally when your function is executed.\
At minimum, it contains your code for the function itself, but it may also contain other assets or files that your code references upon execution (binaries, imports, or configuration files).\
The **maximum size** of a function code package is **50 MB compressed** and **250 MB uncompressed**.

## Function Handler

The handler is a **method** inside the AWS Lambda function that you create and include in your package, and that is the entry point of the execution.\
The handler syntax depends on the language you use for the AWS Lambda function.

## Parameters

### Event Object

Includes **all the data and metadata** that are needed to implement the logic.

If you use the API Gateway service, it contains details of the HTTPS request that was made by the API client. Values, such as the path, query string, and the request body, are within the event object. The event object has different data depending on the event that it creates.\
For example, Amazon S3 has different values inside the event object than the Amazon API Gateway service.

### Context Object

Contains **data about the Lambda invocation itself**.\
The context and structure of the object vary based on the language, but there are three primary data points that the context object contains:

* **AWS Requestid**\
  ****Tracks specific invocations of an AWS Lambda function, and it is important for error reports or when you need to contact AWS Support
* **Remaining time**\
  ****Amount of time in milliseconds that remain before your function timeout occurs. Lambda functions can run a maximum of 300 seconds (5 minutes), but you can configure a shorter timeout.
* **Logging**\
  ****Contains information about which CloudWatch Log stream your log statements are sent to.\
  This ability is provided by all language runtime.

## Configuration

* **Memory**\
  ****Amount of memory available to your function when it executes.\
  ****You can allocate **128 MB** of RAM up to **3008 MB,** in 64-MB increments.
* **Timeout**\
  How long your function executes for before a timeout is returned.\
  The default timeout value is **3 seconds**, the maximum is 300 seconds (**5 minutes**).
* **Network**\
  ****By default, your Lambda communicates from **insi,de a VPC** managed by AWS.\
  If you deploy a Lambda function with access to your VPC, you may need may IP addresses available, using this formula: \
  `Projected peak concurrent executions * (Memory in GB / 3GB)`
*   **Concurrency**\
    ****By default, the **account-level** concurrency **within a given region** is set with **1,000**_._

    You can request a limit increase for concurrent executions from the AWS Support Center.\
    If you need **to stop processing** any invocations, set the _**concurrency**_** to 0**.
* **Dead letter queues (DLQ)**\
  ****When a failure occurs, your function generates an **exception** that is **sent to a DLQ**.\
  It can be an _SNS topic_ or an _SQS queue_.\
  For asynchronous event sources, Lambda makes 2 retries with automatic back-off.
*   #### Environment Variables

    Are simply key-value pairs that you create and modify as part of your function configuration.&#x20;

    By default are encrypted at rest, using a default KMS key of _aws/lambda_.
*   #### Versioning

    It allows you to create multiple **versions**, each function version has a unique ARN.\
    After you publish a version, it is immutable, and you cannot change it.
* **Alias**\
  ****To avoid the work of changing ARN references based on version, it's a best practice to assign an alias to a particular funtion+version and use that alias in the application.

****\
****







