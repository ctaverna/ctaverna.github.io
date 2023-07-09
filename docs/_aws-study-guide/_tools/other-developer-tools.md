---
title: "Other developer tools"
subtitle: "Other tools related to software development lifecycle "
is-folder: false
subcategory: "tools"
sequence: 7
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [Other developer tools](#other-developer-tools)
  - [Cloud9](#cloud9)
  - [CodeCommit](#codecommit)
    - [Repository Notifications](#repository-notifications)
    - [**Repository Triggers** ](#repository-triggers-)
  - [X-Ray](#x-ray)
  - [CodeStar](#codestar)
  - [CodeArtifact](#codeartifact)
  - [CodeGuru](#codeguru)


# Other developer tools

## Cloud9

Cloud-based integrated development environment (IDE)

* Write, execute, and debug code in your browser
* Share environment with the team
* Direct access to the terminal

## CodeCommit

* **Git** repository
* Supports **SSH** or **HTTPS**
* Scalability, availability and durability inherited from **S3**
* **Encryption** at rest using customer keys
* **Unlimited size** repository
* Post-commit **triggers** can invoke SNS or Lambda
* _Objects_ are stored on S3, _git indexes_ on DynamoDB, _cryptography keys_ on KMS

### Repository Notifications

AWS CodeCommit supports triggers via Amazon SNS, which you can use to leverage other AWS services for post-commit actions, such as firing a webhook with a Lambda after a commit is pushed to a development branch.\
To implement this, AWS CodeCommit uses AWS CloudWatch Events. (Comments, pull requests, title changes…)

### **Repository Triggers**&#x20;

Repository triggers are not the same as notifications, as the events that fire each differ greatly. Use repository triggers to send notifications to Amazon SNS or AWS Lambda during these events: - Push to Existing Branch\
\- Create a Branch or Tag\
\- Delete a Branch or Tag\
Triggers are similar in functionality to webhooks used by other Git providers, like GitHub.\
You can use triggers to perform automated tasks such as to start external builds, to notify administrators of code pushes, or to perform unit tests.





## X-Ray

Is a service to monitor modern service-oriented web applications.&#x20;

Receives data from SDK and services using UDP and saves it to a local buffer. Data is sent to backend every second or when buffer is full.

Using the X-Ray console the DevOps team can debug and investigate.

* **SDK** is available for Java, .Net, .NetCore, Python, Ruby, Go, Node.js
* A **trace** is a holistic view that encapsulates the end-to-end transactions from a customer standpoint where the customer created the transaction
* The trace is broken down into segments, that are chunks that come from individual servers

## CodeStar

Provides an easy way to coordinate develop, build and deploy activities through a unified project dashboard.

When you choose a **project template**, the underlying AWS services are provisioned in minutes, allowing you to quickly start coding and deploying your applications.

## CodeArtifact

It's a fully managed artifact repository service

* can automatically fetch software packages and dependencies from public artifact repositories
* works with: _Maven, Gradle, npm, yarn, twine, pip,_ and _NuGet_

## CodeGuru

It's a tool that provides intelligent **recommendations** to improve **code quality** and identify **most expensive lines** of code.

* **CodeGuru Reviewer** uses machine learning and automated reasoning to identify critical issues, security vulnerabilities, and hard-to-find bugs
* **CodeGuru Profiler** optimizes performance for applications running in production and identifies the most expensive lines of code (EC2, Amazon ECS, AWS Fargate, Amazon EKS, AWS Lambda, or on premises)

