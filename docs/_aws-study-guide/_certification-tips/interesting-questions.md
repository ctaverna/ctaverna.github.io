# Interesting questions

## Introduction to AWS

**When you use identity federation to assume a role, where are the credentials you use to make AWS API calls generated?**

1. Access key ID and secret access key are generated locally on the client.
2. The AWS Security Token Service (AWS STS) generates the access key ID, secret access key, and session token.
3. The AWS Key Management Service (AWS KMS) generates a customer master key (CMK).
4. Your Security Assertion Markup Language (SAML) identity provider generates the access key ID, secret access key, and session token.

<details>

<summary>Answer</summary>

**B.**\
****The AssumeRole method of the AWS Security Token Service (AWS STS) returns the security credentials for the role that include the access key ID, secret access key, and session token. AWS Key Management Service (AWS KMS) is not used for API signing. The identity provider may provide a SAML assertion, but AWS STS generates the AWS API credentials.

</details>

**The principals who have access to assume an IAM role are defined in which document?**

1. IAM access policy
2. IAM trust policy
3. MS grant token
4. AWS credentials file

<details>

<summary>Answer</summary>

**B.**\
****The IAM trust policy defines the principals who can request role credentials from the AWS STS. Access policies define what API actions can be performed with the credentials from the role.

</details>

**A new developer has joined your small team. You would like to help your team member set up a development computer for access to the team account quickly and securely. How do you proceed?**

1. Generate an access key based on your IAM user, and share it with your team member.
2. Create a new directory with AWS Directory Service, and assign permissions in the AWS Key Management Service (AWS KMS).
3. Create an IAM user, add it to an IAM group that has the appropriate permissions, and generate a long-term access key.
4. Create a new IAM role for this team member, assign permissions to the role, and generate a long-term access key.

<details>

<summary>Answer</summary>

**C.**\
****You can define an IAM user for your new team member and add the IAM user to an IAM group to inherit the appropriate permissions. The best practice is _not_ to use _AWS account root user_ credentials. Though you can use AWS Directory Service to track users, this answer is incomplete, and the AWS KMS is not related to permissions. Roles can be assumed only for short-term sessions—there are no long-term credentials directly associated with the role.

</details>

**You have a process running on an EC2 instance that exceeds the 2 GB of RAM allocated to the instance. This is causing the process to run slowly. How can you resolve the issue?**

1. Stop the instance, change the instance type to one with more RAM, and then start the instance.
2. Modify the RAM allocation for the instance while it is running.
3. Take a snapshot of the data and then launch a new instance. You cannot change the RAM allocation.
4. Send an email to AWS Support to install additional RAM on the server.

<details>

<summary>Answer</summary>

**A.**\
****Amazon EC2 instances are resizable. You can change the RAM available by changing the instance type. Option B is incorrect because you can change this attribute only when the instance is stopped. Although option C is one possible solution, it is not required. Option D is incorrect because the RAM available on the host server does not change the RAM allocation for your EC2 instance.

</details>

**You have launched an EC2 Windows instance, and you would like to connect to it using the Remote Desktop Protocol. The instance is in a public subnet and has a public IP address. How do you find the password to the Administrator account?**

1. Decrypt the password by using the private key from the Amazon EC2 key pair that you used to launch the instance.
2. Use the password that you provided when you launched the instance.
3. Create a new AWS Identity and Access Management (IAM) role, and use the password for that role.
4. Create an IAM user, and use the password for that user.

<details>

<summary>Answer</summary>

**A.**\
****AWS generates the default password for the instance and encrypts it by using the public key from the Amazon EC2 key pair used to launch the instance. You do not select a password when you launch an instance. You can decrypt this with the private key. IAM users and IAM roles are not for providing access to the operating system on the Amazon EC2 instance.

</details>



**Which of the following are true about EC2 instance types? (Select TWO.)**

1. All Amazon EC2 instance types include instance store for ephemeral storage.
2. All Amazon EC2 instance types can use EBS volumes for persistent storage.
3. Amazon EC2 instances cannot be resized once launched.
4. Some Amazon EC2 instances may have access to GPUs or other hardware accelerators.

<details>

<summary>Answer</summary>

**B, D.**\
****Option B is true; Amazon Elastic Block Store (Amazon EBS) provides persistent storage for all types of EC2 instances. Option D is true because hardware accelerators, such as GPU and FGPA, are accessible depending on the type of instance. Option A is false because instance store is provided only for a few Amazon EC2 instance types. Option C is incorrect because Amazon EC2 instances can be resized after they are launched, provided that they are stopped during the resize. Hardware accelerators, such as GPU and FGPA, are accessible depending on the type of instance.

</details>

## Database

**How many read capacity units (RCUs) do you need to support 25 **_**eventually consistent**_** reads per seconds of 15 KB?**

1. 10 RCUs
2. 25 RCUs
3. 50 RCUs
4. 15 RCUs

<details>

<summary>Answer</summary>

**C.**\
****1 RCU = Two eventually consistent reads per second of 4 KB.

* 15 KB is four complete chunks of 4 KB (4 × 4 = 16).
* So you need (25 × 4) / 2 = 50 RCUs.

</details>

**Your company would like to implement a highly available caching solution for its SQL database running on Amazon RDS. Currently, all of its services are running in the AWS Cloud. As their lead developer, what should you recommend?**

1. Implement your own caching solution on-premises.
2. Implement Amazon ElastiCache for Redis.
3. Implement Amazon ElastiCache for Memcached.
4. Implement Amazon DynamoDB Accelerator (DAX).

<details>

<summary>Answer</summary>

**B.**\
****With Amazon ElastiCache, only Redis can be run in a high-availability configuration. Option A is incorrect because this would add complexity to your architecture. It would also likely introduce additional latency, as the company is already using Amazon RDS. Option C is incorrect because ElastiCache for Memcached does not support a high-availability configuration. Option D is incorrect because DAX is a caching mechanism that is used for DynamoDB, not Amazon RDS.

</details>

## Encryption

**Which components are required in an encryption system? (Select THREE.)**

1. A user to upload data
2. Data to encrypt
3. A database to store encryption keys
4. A method to encrypt data
5. A cryptographic algorithm

<details>

<summary>Answer</summary>

**B, D, E.**\
****Option A is incorrect because data can be encrypted in any location (on-premises or in the AWS Cloud). Option C is incorrect because encryption keys should be stored in a secured hardware security module (HSM). Option B is correct because there must be data to encrypt in order to use an encryption system. Option D is correct because tools and a process must be in place to perform encryption. Option E is correct because encryption requires a defined algorithm.

</details>

**Which option uses AWS Key Management Service (AWS KMS) to manage keys to provide server-side encryption to Amazon Simple Storage Service (Amazon S3)?**

1. Amazon S3 managed encryption keys (SSE-S3)
2. Customer-provided encryption keys (SSE-C)
3. Use client-side encryption
4. None of the above

<details>

<summary>Answer</summary>

**D.**\
****Option A is incorrect; with SSE-S3, Amazon S3 is responsible for encrypting the objects, not AWS KMS. Option B is incorrect because the customer provides the key to the Amazon S3 service. Option C is incorrect because the question specifically states that server-side encryption is used. Option D is correct because none of the other options listed server-side encryption with AWS KMS (**SSE-KMS**), whereby AWS KMS manages the keys.

</details>

**Which AWS encryption service provides asymmetric encryption capabilities?**

1. AWS Key Management Service (AWS KMS).
2. AWS CloudHSM.
3. AWS does not provide asymmetric encryption services.
4. None of the above.

<details>

<summary>Answer</summary>

**B.**\
****Option A is incorrect. AWS KMS does not currently support asymmetric encryption. Option B is correct because AWS CloudHSM supports both asymmetric and symmetric encryption. Options C and D are incorrect because CloudHSM supports asymmetric encryption.

</details>

**Which AWS encryption service provides symmetric encryption capabilities? (Select TWO.)**

1. AWS Key Management Service (AWS KMS).
2. AWS CloudHSM.
3. AWS does not provide symmetric encryption services.
4. None of the above.

<details>

<summary>Answer</summary>

**A, B.**\
****Option A is correct because AWS KMS uses AES-256 as its encryption algorithm. Option B is correct because CloudHSM supports a variety of symmetric encryption options. Options C and D are incorrect because AWS KMS and CloudHSM support symmetric encryption options.

</details>

**An organization is using AWS Key Management Service (AWS KMS) to support encryption and would like to encrypt Amazon Elastic Block Store (Amazon EBS) volumes. It wants to encrypt its volumes quickly, with little development time. As their lead developer, what should you recommend?**

1. Implement AWS KMS to encrypt the Amazon EBS volumes.
2. Use open source or third-party encryption tooling.
3. Use AWS CloudHSM.
4. AWS does not provide a mechanism to encrypt Amazon EBS volumes.

<details>

<summary>Answer</summary>

**A.**\
****Option A is correct because AWS KMS provides the simplest solution with little development time to implement encryption on an Amazon EBS volume. Option B is incorrect because even though you can use open source or third-party tooling to encrypt volumes, there would be some setup and configuration involved. Using CloudHSM would also require some configuration and setup, so option C is incorrect. Option D is incorrect because AWS KMS enables you to encrypt Amazon EBS volumes.

</details>

## Deployment strategies

**Which of the following resources can AWS Elastic Beanstalk use to create a web server environment? (Select FOUR.)**

1. Amazon Cognito User Pool
2. AWS Serverless Application Model (AWS SAM) Local
3. Auto Scaling group
4. Amazon Elastic Compute Cloud (Amazon EC2)
5. AWS Lambda

<details>

<summary>Answer </summary>

**A, B, C, D.**\
****A, B, C, and D are correct because you can use them all to create a web server environment with AWS Elastic Beanstalk.

* Option E is incorrect because AWS Lambda is an event-driven, serverless computing platform that runs code in response to events. Lambda automatically manages the computing resources required by that code.

</details>

**Which operating systems does AWS Elastic Beanstalk support? (Select TWO.)**

1. Amazon Linux
2. Ubuntu
3. Windows Server
4. Fedora
5. Jetty

<details>

<summary>Answer</summary>

**A, C.**\
****Elastic Beanstalk supports Linux and Windows. No support is available for an Ubuntu-only operating system, Fedora, or Jetty.

</details>

**Which of the following components can AWS Elastic Beanstalk deploy? (Select TWO.)**

1. Amazon Elastic Compute Cloud (Amazon EC2) instances with write capabilities to an Amazon DynamoDB table
2. A worker application using Amazon Simple Queue Service (Amazon SQS)
3. An Amazon Elastic Container Service (Amazon ECS) cluster supporting multiple containers
4. A mixed fleet of Spot and Reserved Instances with four applications running in each environment
5. A mixed fleet of Reserved Instances scheduled between 9 a.m. to 5 p.m. and On-Demand Instances used for processing data workloads when needed randomly

<details>

<summary>Answer</summary>

**A, B.**\
****Elastic Beanstalk can run Amazon EC2 instances and build queues with Amazon SQS.

</details>

**Which AWS Identity and Access Management (IAM) entities are used when creating an environment? (Select TWO.)**

1. Federated role
2. Service role
3. Instance profile
4. Profile role
5. User name and access keys

<details>

<summary>Answer</summary>

**B, C.**\
****Elastic Beanstalk creates a service role to access AWS services and an instance role to access instances.

</details>

**Which account is billed for user-accessed AWS resources allocated by AWS Elastic Beanstalk?**

1. The account running the services
2. The cross-account able to access the shared services
3. The cross-account with the Amazon Simple Storage Service (Amazon S3) bucket holding a downloaded copy of the code artifact
4. All accounts involved

<details>

<summary>Answer</summary>

**D.**\
****Charges are incurred for all accounts that use the allocated resources.

</details>

## Deployment as code

**If you specify a hook script in the ApplicationStop lifecycle event of an AWS CodeDeploy appspec.yml, will it run on the first deployment to your instance(s)?**

1. Yes
2. No
3. The ApplicationStop lifecycle event does not exist.
4. It will run only if your application is running.

<details>

<summary>Answer</summary>

**B.**\
****Option B is correct because the ApplicationStop lifecycle event occurs before any new deployment files download. For this reason, it will not run the first time a deployment occurs on an instance. Option C is incorrect, as this is a valid lifecycle event. Option A is incorrect. Option D is incorrect because lifecycle hooks are not aware of the current state of your application. Lifecycle hook scripts execute any listed commands.

</details>

**Your team is building a deployment pipeline to a sensitive application in your environment using AWS CodeDeploy. The application consists of an Amazon EC2 Auto Scaling group of instances behind an Elastic Load Balancing load balancer. The nature of the application requires 100 percent availability for both successful and failed deployments. The development team want to deploy changes multiple times per day. How would this be achieved at the lowest cost and with the fastest deployments?**

1. Rolling deployments with an additional batch
2. Rolling deployments without an additional batch
3. Blue/green deployments
4. Immutable updates

<details>

<summary>Answer</summary>

**D.**\
****Option **A** is incorrect because rolling deployments without an additional batch would result in **less than 100 percent** availability, as one batch of the original set of instances would be taken out of circulation during the deployment process.\
Option **B** is incorrect because if you add an additional batch, it would ensure 100 percent availability at the lowest cost but would require a **longer update process** than replacing all instances at once.\
Option **C** is incorrect because, by default, blue/green deployments will leave the original environment intact, accruing charges until it is **manually** deleted.\
Option **D** is correct as immutable updates would result in the **fastest deployment** for the lowest cost. In an immutable update, a new Auto Scaling group is created and registered with the load balancer. Once health checks pass, the existing Auto Scaling group is terminated.

</details>

**In what ways can pipeline actions be ordered in a stage? (Select TWO.)**

1. Series
2. Parallel
3. Stages support only one action each
4. First-in-first-out (FIFO)
5. Last-in-first-out (LIFO)

<details>

<summary>Answer</summary>

**A, B.**\
****Options D and E are incorrect because FIFO/LIFO are not valid pipeline action configurations. Option C is incorrect because pipeline stages support multiple actions. Pipeline actions can be specified to occur both in series and in parallel within the same stage. Thus, options A and B are correct.

</details>

**If you would like to delete an AWS CloudFormation stack before you deploy a new one in your pipeline, what would be the correct set of actions?**

1. One action that specifies “Create or update a stack.”
2. Two actions: the first specifies “Create or update a stack,” and the second specifies “Delete a stack.”
3. Three actions: the first specifies “Delete a stack,” the second specifies “Create or update a stack,” and the third specifies “Replace a failed stack.”
4. Two actions: the first specifies “Delete a stack,” and the second specifies “Create or update a stack.”

<details>

<summary>Answer</summary>

**D.**\
****Option A is incorrect because it will only create or update a stack, not delete the existing stack.\
Option B is incorrect because the desired actions are in the wrong order.\
Option C is incorrect because the final action, “Replace a failed stack,” is not needed. Option D is correct. Only two actions are required. First, the stack must be deleted. Second, the replacement stack can be created. Unless otherwise required, however, both actions can be essentially accomplished by using one “Create or update a stack” action.

</details>

**How can you connect to an AWS CodeCommit repository without Git credentials?**

1. It is not possible.
2. HTTPS
3. SSH
4. AWS CodeCommit credential helper

<details>

<summary>Answer</summary>

D. Option A is incorrect. AWS CodeCommit is fully compatible with existing Git tools, and it also supports authentication with AWS Identity and Access Management (IAM) credentials.\
Options B and C are incorrect. These are the only protocols over which you can interact with a repository.\
You can use the CodeCommit credential helper to convert an IAM access key and secret access key to valid Git credentials for SSH and HTTPS authentication. Thus, option D is correct

</details>

**Which pipeline actions support AWS CodeBuild projects? (Select TWO.)**

1. Invoke
2. Deploy
3. Build
4. Approval
5. Test

<details>

<summary>Answer</summary>

**C, E.**\
****Options A, B, and D are incorrect because these action types do not support CodeBuild projects. Options C and E are correct because CodeBuild projects can be executed in a pipeline as part of build and test actions.

</details>

**Can data passed to build projects using environment variables be encrypted or protected?**

1. Yes, this is supported natively by AWS CodeBuild.
2. No, it is not supported.
3. No, but this can be enabled in the console.
4. No, but this can be supported using other AWS products and services.

<details>

<summary>Answer 4</summary>

**D.** \
****Environment variables in CodeBuild projects are not encrypted and are visible using the CodeBuild API. Thus, options A, B, and C are incorrect. If you need to pass sensitive information to build containers, use Systems Manager Parameter Store instead. Thus, option D is correct.

</details>

**What is the only deployment type supported by on-premises instances?**

1. In-place
2. Blue/green
3. Immutable
4. Progressive

<details>

<summary>Answer</summary>

**A.** \
****Because AWS does not have the ability to create or destroy infrastructure in customer data centers, options B, C, and D are incorrect. Option A is correct because on-premises instances support only in-place deployments.

</details>

**If your AWS CodeDeploy configuration includes creation of a file, nginx.conf, but the file already exists on the server (prior to the use of AWS CodeDeploy), what is the default behavior that will occur during deployment?**

1. The file will be replaced.
2. The file will be renamed nginx.conf.bak, and the new file will be created.
3. The deployment will fail.
4. The deployment will continue, but the file will not be modified.

<details>

<summary>Answer</summary>

**C.**\
Options A and B are incorrect because AWS CodeDeploy will not modify files on an instance that were not created by a deployment. Option D is incorrect because this approach could result in failed deployments because of missing settings in your configuration file. Option C is correct. By default, CodeDeploy will not remove files that it does not manage. This is maintained as a list of files on the instance.

</details>

**How does AWS Lambda support in-place deployments?**

1. Function versions are overwritten during the deployment.
2. New function versions are created, and then version numbers are switched.
3. AWS Lambda does not support in-place deployments.
4. Function aliases are overwritten during the deployment.

<details>

<summary>Answer</summary>

C. Option A is incorrect because function versions cannot be modified after they have been published. Option B is also incorrect because function version numbers cannot be changed. Aliases can be used to point to different function versions; however, the alias itself cannot be overwritten (it is a pointer to a function version). Thus, option D is incorrect. AWS Lambda does not support in-place deployments. This is because, after a function version has been published, it cannot be updated. Option C is correct.

</details>

**What is the minimum number of stages required by a pipeline in AWS CodePipeline?**

1. 0
2. 1
3. 2
4. 3

<details>

<summary>Answer</summary>

**C.**\
****AWS CodePipeline requires that every pipeline contain a **source** stage and at least one **build or deploy** stage. Thus, the minimum number of stages is 2.

</details>

## Infrastructure as Code

**A custom resource associated with AWS Lambda in your stack creates successfully; however, it attempts to update the resource result in the failure message Custom Resource failed to stabilize in the expected time. After you add a service role to extend the timeout duration, the issue still persists. What may also be the cause of this error?**

1. The custom resource defined a function for handling the CREATE action but did not do the same for the UPDATE action; thus, a success or failure signal was not sent to AWS CloudFormation.
2. The service role does not have appropriate permissions to invoke the custom resource function.
3. The custom resource function no longer exists.
4. All of the above.

<details>

<summary>Answer</summary>

**A.** \
****Custom resource function permissions are obtained by a function execution role, not the service role invoking the stack update; thus, option B is incorrect. When the AWS Lambda function corresponding to a custom resource no longer exists, the custom resource will fail to update immediately; thus, option C is incorrect. However, if the custom resource function is executed but does not provide a response to the AWS CloudFormation service endpoint, the resource times out with the aforementioned error. Thus, option A is correct.

</details>

**After you deploy an AWS Serverless Application Model (AWS SAM) template to AWS CloudFormation, can you view the original template? Why or why not?**

1. No, after the template is submitted and the AWS::Serverless transform is executed, an AWS CloudFormation-supported template is generated.
2. Yes, the original template is saved and accessible using the get-stack-template AWS CLI command.
3. Yes, it is saved in the Amazon Simple Storage Service (Amazon S3) bucket created by AWS CloudFormation for AWS SAM templates.
4. No, AWS CloudFormation does not retain processed templates.

<details>

<summary>Answer</summary>

**A.**\
****AWS CloudFormation processes transformations by creating a change set, which generates an AWS CloudFormation supported template. Without the AWS::Serverless transform, AWS CloudFormation cannot process the AWS SAM template. For any stack in your account, the current template can be downloaded using the get-stack-template AWS CLI command. This command will return templates as processed by AWS CloudFormation; thus, option B is incorrect. Option C is also incorrect, because the original template is not saved before executing the transform. Option D is also incorrect, as AWS CloudFormation saves the current template for all stacks.

</details>

**When defining an AWS Serverless Application Model (AWS SAM) template, how can you create an Amazon API Gateway as part of the stack?**

1. By defining an AWS::ApiGateway::RestApi resource and any associated AWS::ApiGateway::Method resources
2. One will be created automatically for you whenever AWS::Serverless::Function resources are declared with one or more Events.
3. By defining an AWS::Serverless::Api and providing an inline or external Swagger definition
4. AWS::ApiGateway::RestApi resources are not supported in AWS SAM templates.
5. A, B, and C

<details>

<summary>Answer</summary>

**E.**\
****AWS SAM supports other AWS CloudFormation resources, and it is not limited to defining only AWS::Serverless::\* resource types; thus, option D is incorrect, and option A is correct. However, the AWS::Serverless transform will not automatically associate serverless functions with AWS::ApiGateway::RestApi resources. The transform will automatically associate any functions with the serverless API being declared, or it will create a new one when the transform is executed. Thus, option B is also correct. Option C is also correct because AWS Serverless also supports Swagger definitions to outline the endpoints of your OpenAPI specification.

</details>

**Which of these options allows you to specify a required number of signals to mark the resource as CREATE\_COMPLETE?**

1. Wait Condition
2. Wait Condition Handler
3. CreationPolicy
4. WaitCount

<details>

<summary>Answer</summary>

**C.** \
Wait conditions accept only one signal and will not track additional signals from the same resource; thus, options A and B are incorrect. WaitCount is an invalid option type, so option D is incorrect. Option C is correct because creation policies enable you to specify a count and timeout.

</details>

**An AWS CloudFormation template declares two resources: an AWS Lambda function and an Amazon DynamoDB table. The function code is declared inline as part of the template and references the table. In what order will AWS CloudFormation provision the two resources?**

1. Amazon DynamoDB table, AWS Lambda function
2. AWS Lambda function, Amazon DynamoDB table
3. This cannot be determined ahead of time.
4. This depends on the template.

<details>

<summary>Answer</summary>

**C.**\
Because the reference to the Amazon DynamoDB table is made as part of an arbitrary string (the function code), AWS CloudFormation does not recognize this as a dependency between resources. To prevent any potential errors, you would need to declare explicitly that the function depends on the table. Thus, option C is correct.

</details>

**Which of the update types results in resource downtime? (Select TWO.)**

1. Update with No Interruption
2. Update with Some Interruption
3. Replacing Update
4. Update with No Data
5. Static Update

<details>

<summary>Answer</summary>

**B, C.** \
****Option A is incorrect, as it states that no interruption will occur. Options D and E are not valid update types. Replacing updates delete the original resource and provision a replacement. Updates with some interruption have resource downtime, but the original resource is not replaced. Thus, options B and C are correct.

</details>

**What does a service token represent in a custom resource declaration?**

1. The AWS service that receives the request
2. The Amazon Simple Notification Service (Amazon SNS) or AWS Lambda resource Amazon Resource Name (ARN) that receives the request
3. The on-premises server IP address that receives the request
4. The type of action to take
5. The commands to execute for the custom resource

<details>

<summary>Answer</summary>

**B.** \
Option C is incorrect because, though on-premises servers can be part of a custom resource’s workflow, they do not receive requests directly. Options D and E are incorrect because specific actions are not declared in custom resource properties. Option A is incorrect because AWS services themselves do not process custom resource requests. Specifically, Amazon SNS topics and AWS Lambda functions can act as recipients to custom resource requests. Thus, option B is correct.

</details>







