---
title: "Cost"
subtitle: "Cost related services"
is-folder: false
subcategory: "other-services"
sequence: 1
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [Cost Explorer](#cost-explorer)
- [AWS Budgets](#aws-budgets)
- [AWS Compute Optimizer](#aws-compute-optimizer)

# Cost Explorer
* To know **where you are spending** money
* View last **13 months**
* **Forecasting** based on past usage
* Alarms and budgets

# AWS Budgets

You can use AWS Budgets:
- To **track** and **take action** on your AWS costs and usage
- To **monitor** your **utilization and coverage** metrics for your Reserved Instances (RIs) or Savings Plans

You can create the following types of budgets:
- Cost budgets
- Usage budgets
- RI **utilization** budgets (unused or under-utilized alerts)
- RI **coverage** budgets (how much of your instance usage is covered by a reservation)
- Savings Plans **utilization** budgets
- Savings Plans **coverage** budgets


# AWS Compute Optimizer

Service that analyzes the **configuration** and **utilization** metrics of your AWS resources.  
It reports whether your resources are optimal, and **generates optimization recommendations** to **reduce the cost** and **improve the performance** of your workloads.   
Compute Optimizer also provides **graphs** showing recent utilization metric history data, as well as **projected utilization** for recommendations, which you can use to evaluate which recommendation provides the best price-performance trade-off.

Compute Optimizer generates recommendations for the following resources:
- Amazon EC2 instances
- Amazon EC2 Auto Scaling groups
- Amazon Elastic Block Store (Amazon EBS) volumes
- AWS Lambda functions
- Amazon Elastic Container Service (Amazon ECS) services on AWS Fargate
- Commercial software licenses


