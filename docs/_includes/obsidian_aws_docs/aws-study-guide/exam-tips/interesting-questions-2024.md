
You have enabled several of your AWS Lambda functions for an Amazon VPC connection. You defined security groups that allow inbound and outbound access to resources in private subnets of the VPC. An Amazon EC2 instance in one of the defined subnets is running an application that needs to invoke one of your VPC enabled functions.  
  
What options would allow access from a private subnet to your VPC enabled Lambda function? (Select TWO)

- Utilize VPC enabled Lambda functions which can be invoked privately from resources in the VPC.
- Create a NAT Gateway in the public subnet of the VPC and route private traffic through it to the public internet to invoke the Lambda function.
- Create an interface VPC endpoint for the Lambda service.
    
    Comments: Lambda functions are accessible only through publicly routed requests. To invoke them through AWS network directly from private VPC a VPC endpoint needs to be created which works with Private link.<br><br>From Accessing Resources in VPC of AWS Lambda function permissions section
    
- Create a Network Load Balancer (NLB), set the Lambda function as its target and invoke the Lambda function from the EC2 instance by sending request to the NLB.
- Create a Gateway VPC endpoint for the Lambda service and access the Lambda function through AWS network.

1 errore
3 ok
mistero sulla seconda risposta corretta

---

An architect is designing a real-time chat module for a new online game platform and wants to use the WebSocket API capabilities within Amazon API Gateway. An important requirement for this chat system is the ability to track the current number of active users on the platform.  
  
Which of the options below could help implement this functionality?

- Use the $connect and $disconnect predefined routes to trigger a Lambda Function which increments and decrements an active user counter in DynamoDB respectively.
    
    Comments: This is the correct answer. The $connect and $disconnected routes are predefined routes that are called when a client connects to the API and when the client or the server disconnects respectively.
    
- Use the $default route to trigger a Lambda function that increments an active user count in DynamoDB.
- Use the `active-connections` command on the @connections API to periodically retrieve the total number of active connections and store this as a count in a DynamoDB table.
- Use the predefined $active route when a connection is activated to trigger a Lambda function that updates an active users counter stored in a DynamoDB table.

giusto, ma interessante

---

An organization developed serverless applications by using an event driven architecture (Amazon API Gateway, AWS Lambda). When launched in production, customers complained about slow response during the morning peak hours. Developers pointed out it is related to AWS Lambda cold starts. On average, the development team estimated there will be 100 concurrent users.  
  
How do you mitigate the AWS Lambda cold starts?

- Prevent AWS Lambda cold starts by increasing the service limits.
- Prevent AWS Lambda cold starts with Lambda provisioned concurrency.
    
    Comments: Provisioned concurrency helps to prevent the cold starts.
    
- Prevent AWS Lambda cold start with the Amazon CloudWatch Metrics to schedule events on morning hours.
- Prevent AWS Lambda cold starts with Lambda reserved concurrency.

---

Your customer, who runs an online shopping platform with consistent and predictable traffic, is planning to incrementally migrate to serverless. They are looking to start with a microservice that returns available quantity for a product. This microservice is currently running as a container on premise and is continuously invoked. The development team is looking to lift and shift this service into serverless.  
  
Which of the following will be simplest option to lift and shift this container based microservice to serverless without making changes to the microservice?

- Create a Lambda function to fetch the quantity. Use Application Load Balancer to direct traffic for inventory check to this Lambda Function
- Deploy the microservice as a container based app on AWS Fargate. Use Amazon API Gateway to direct traffic for inventory check to this microservice
- Create a Lambda function to fetch the quantity. Use API Gateway to direct traffic for inventory check to this Lambda Function.
- Deploy the microservice as a container based app on Amazon Elastic Container Service (ECS). Use Application Load Balancer to direct traffic for inventory check to this microservice

4 è sbagliata

---
An application that is processing customer requests has to also distribute the message to a number of downstream applications.  
  
What AWS services can the application use to distribute the request messages to the downstream applications? (Select TWO)

- Amazon Aurora Database Activity Streams
- Amazon Simple Queue Service
    
    Comments: Incorrect - Amazon SQS is a message queue service - https://aws.amazon.com/sqs/FAQs/. This implies that any particular message can be received by only one of the receivers, even though it is possible to have multiple consumers consuming messages off the queue
    
- Amazon AppFlow
- Amazon EventBridge
- Amazon Simple Notification Service

2 sbagliata
5 ok

---

A developer has just started using AWS Lambda to write an application and wants to ensure the code is well tested.  
  
What design best practice can help with testing Lambda function code?

- Separate business logic from Lambda-specific code
    
    Comments: Separating business logic from Lambda specific code can make your code more portable and also make it easier to isolate business logic when writing unit tests. This best practice therefore helps with testing Lambda functions.
    
- Take advantage of execution environment reuse.
- Minimize dependencies and packages used by the Lambda functions.
- Avoid using recursive code within the Lambda functions.

1 ok

---

You are responsible for building an e-commerce site. In your development process you create a MVP (Minimum Viable Product) and deploy it in a TEST environment. Your architecture is made of an Amazon API Gateway that calls a Lambda function and an Amazon DynamoDB table. A member of the QA team reported that during testing a synchronous call broke the system causing a timeout error.  
  
What should you do to fix the error?

- Increase the timeout limit in the API Gateway. If the invocation request returns invocation errors, Lambda retries that request two more times by default. You can configure this retry value between 0 and 2.
- Do nothing. In a synchronous invocation, like between API Gateway and Lambda, Lambda provides built-in retry behaviors.
- Generate the SDK from the API stage, and use the backoff and retry mechanisms it provides.
- Increase the timeout limit in the API Gateway. If the invocation request returns invocation errors, Lambda retries that invocation for up to 6 hours. You can decrease the default duration using the maximum age of event setting.

2 sbagliata

----
As a Solution Architect working for an online gaming company, you have been informed the player feedback system is slow to respond during peak periods. The feedback is reviewed weekly by the game developers. The current system submits the feedback to an Amazon API Gateway which invokes a Lambda function to first validate and then store the review in a Amazon DynamoDB table. This table has been configured with provisioned capacity.  
  
What suggestion would you offer to remove the players wait time?

- Insert an Amazon Simple Queue Service queue between the API Gateway and Lambda function. Use Lambda's native SQS poller to read off the queue. Refactor the Lambda function to handle the new event object.
- Increase the Lambda functions memory configuration so that it can process each client request faster.
- Enable API caching and payload compression in Amazon API Gateway
- Change Amazon DynamoDB from provisioned capacity to on-demand allowing the table to scale up to handle any increases in demand.
    
    Comments: We have no view at this time where in the architecture the slow down may be occurring.

4 sbagliata

---

A Solutions Architect is working with a company to migrate an existing application to AWS Lambda. A key requirement for the application is high throughput and low latency. The company is concerned about the potential impact of Lambda cold starts.  
  
Which of the following Lambda design best practices can help to reduce cold start durations? (Select TWO)

- Include only the dependencies and modules needed by the function.
    
    Comments: Minimizing the number of deployment packages and the overall deployment size will reduce the startup time for a Lambda function.
    
- Write modular functions that have a singular purpose.
- Avoid using recursive code in the Lambda functions.
- Use environment variables for operational parameters.
    
    Comments: Using environment variables for operational parameters rather than hard-coding parameters that might change will make a Lambda function more extensible but will not help with cold starts.
    
- Separate business logic from Lambda-specific handler code.

1 ok
4 sbagliata

---

Your company has a serverless application with Amazon API Gateway and AWS Lambda having both read, as well as, write APIs. The developers make frequent changes to the Lambda code and run load tests on the application after every change. The regular load testing has resulted in a spike in the cost.  
  
What are the best practices and cost savings options available on their Lambda compute usage? (Select TWO)

- Changing Lambda code does not necessarily require load testing. Unit and integration tests are sufficient.
- Use caching on Amazon API Gateway.
    
    Comments: Caching on API Gateway would only help for read only endpoints. However question mentions that the application has both read and write endpoints
    
- User reserve concurrency for the lambda functions and set the concurrency to a lower value.
- Use Amazon EC2 instead of lambda.
- Use compute savings plan for lambda (discounted Savings Plans rates of up to 17% for a 1 or 3 year term, up to the commitment level.)
    
    Comments: AWS Lambda now participates in Compute Savings Plans, a flexible pricing model that allows customers to save money

2 sbagliata
5 giusta

---


