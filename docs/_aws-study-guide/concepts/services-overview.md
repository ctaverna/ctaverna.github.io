---
title: "Services overview"
subtitle: "An overview of core services, through different groupings"
is-folder: false
subcategory: "concepts"
sequence: 3
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [Services grouped by scope](#services-grouped-by-scope)
  - [AZ scoped resources](#az-scoped-resources)
  - [Region scoped resources](#region-scoped-resources)
  - [Multiregion resources](#multiregion-resources)
  - [Edge locations resources](#edge-locations-resources)
- [Serverless services](#serverless-services)
    - [Compute](#compute)
    - [Data Stores](#data-stores)
    - [Integration](#integration)

This page is just a listing of some core services, as an additional help to memorize them from different perspectives.

--- 

# Services grouped by scope

## AZ scoped resources
Failure zone = **3+ datacenters** (Highly available)

* EBS Volumes
* NAT gateways
* EC2 Instances
* Redshift nodes
* RDS instances

## Region scoped resources
Failure zone = **3+ AZ** (Highly availabile + Fault Tolerant)

* S3 buckets
* DynamoDB tables
* SNS Topics
* VPC
* Cloudwatch resources

## Multiregion resources
* S3 cross-region replication
* RDS Cross-Region read replica
* Dynamo DB Global table (on region by region basis)

## Edge locations resources
* Route 53 hosted zone
* CloudFront distribution
* WAF filtering rule
* Lambda@Edge

---

# Serverless services

Advantages of a serverless approach:
* No infrastructure provisioning, no management
* Automatic scaling
* Pay for value
* Highly available and secure

### Compute

- AWS Lambda
- AWS Fargate

### Data Stores

- S3
- Aurora Serverless
- DynamoDB

### Integration

- API Gateway
- SQS
- SNS
- StepFunctions
- AppSync