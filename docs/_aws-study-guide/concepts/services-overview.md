---
title: "Services overview"
subtitle: "An overview of core services, with different grouping"
is-folder: false
subcategory: "concepts"
sequence: 3
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [Services grouped by scope](#services-grouped-by-scope)
  - [AZ scopes resources](#az-scopes-resources)
  - [Region scoped resources](#region-scoped-resources)
  - [Multiregion resources](#multiregion-resources)
  - [Edge locations resources](#edge-locations-resources)
- [Service availability summary](#service-availability-summary)
  - [ELB](#elb)
  - [Auto scaling](#auto-scaling)
  - [RDS](#rds)
  - [Aurora](#aurora)
  - [Route 53](#route-53)
  - [Cloudfront](#cloudfront)
  - [S3](#s3)
  - [API Gateway](#api-gateway)
  - [Cognito](#cognito)
  - [Lambda](#lambda)
  - [DynamoDB](#dynamodb)



# Services grouped by scope

## AZ scopes resources

Failure zone = **3+ datacenters** (HA building blocks - Low latency)

* EBS Volumes
* NAT gateways
* EC2 Instances
* Redshift nodes
* RDS instances

## Region scoped resources

\= **3+ AZ** (HA/FT)

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

# Service availability summary

## ELB

* MultiAZ (automatically deployed on multiple AZs)
* Redundant
* Availability **4** 9s (99.99% uptime)

## Auto scaling

* MultiAZ, redundant(EC2)
* Availability **1** 9s /EC2

## RDS

* MultiAZ
* HA, active/passive writes
* Availability **3,5** 9s (99,95%)

## Aurora

* Multi master active/active writes
* Availability **4** 9s

## Route 53

* Global (Edge Loc)
* **100%** uptime SLA

## Cloudfront

* Global (EL)
* **4** 9s

## S3

* Region
* **4** 9s

## API Gateway

* Region
* **4** 9s

## Cognito

* Region
* **3** 9s

## Lambda

* Region
* **3,5** 9s

## DynamoDB

* Region
* **4** 9s
