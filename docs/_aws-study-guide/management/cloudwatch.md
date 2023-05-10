---
title: "CloudWatch"
subtitle: "Collects and visualizes real-time logs, metrics, and event data"
is-folder: false
subcategory: "management"
sequence: 5
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [CloudWatch alarms](#cloudwatch-alarms)
  - [Alarm Actions (remediation)](#alarm-actions-remediation)
  - [Commands](#commands)
  - [Composite alarms](#composite-alarms)
- [CloudWatch Agent](#cloudwatch-agent)
- [CloudWatch metric filters](#cloudwatch-metric-filters)
  - [Space delimited metric filter examples](#space-delimited-metric-filter-examples)
- [CloudWatch Logs Insights](#cloudwatch-logs-insights)
  - [Commands](#commands-1)
- [CloudWatch Agent](#cloudwatch-agent-1)

WIP introduction

* Region scope
* Fault tolerant
* Durable
* Push, not pull

#### Main entities

* Log-groups
* Log-stream

#### Functionalities

* Push, not pull
* Collects and tracks **metrics**
* Enables you to **create alarms** and send notifications
* Can **trigger changes in capacity**, based on rules that you set
* An **Event** describes changes in AWS resources
* A **Rule** matches incoming events and routes them to targets
* A **Target** processes events (Lambda, Kinesis, SNS topics, SQS queues...)

### CloudWatch alarms

* **Period**\
  Length of time to evaluate metric or expression to create an individual data point
* **Evaluation period**\
  number of data points to evaluate (ie 10)
* **Datapoints to alarm**\
  ****how many datapoints within evaluation period must be breaching to cause alarm state (ie 5)
* **Evaluation range**\
  ****how many datapoints retrieved by CloudWatch for alarm evaluation (greater than evaluation period)

Every datapoint can be **NotBreaching**, **Breaching** or **Missing.**

Missing datapoints can be classified as:\
\- missing -> not considered \
\- notBreaching -> as if it was within threshold\
\- breaching -> as if if was breaching threshold\
\- ignore -> current alarms state is maintained

#### Alarm Actions (remediation)

#### Commands

* SNS topics (email/sms/lambda/etc)
* EC2 actions  (stop/reboot/terminate/recover)
* Auto Scaling actions
  * Reaction time of several minutes
  * Truly elastic (increase/decrease)
* Systems Manager (SSM) OpsItem
* start-query / stop-query
* get-query-results

#### Composite alarms

### CloudWatch Agent

Usually you can have multiple alarms without action, and then you can define a single alarm that performs an action evaluating a query with a syntax like: _ALARM("ONE") OR ALARM("two")_

* Can be installed on EC2 to get custom metrics
* Can also be installed via SSM

### CloudWatch metric filters

* Match everything -> " "
* Single term -> "ERROR"    (NB: case sensitive)
* Include/exclude terms -> "ERROR" - "permissions"
* Multiple terms using AND -> "ERROR memory exception"
* Multiple terms using OR -> ?ERROR ?WARN

#### Space delimited metric filter examples

* \[ip, id, user, timestamp, request, status\_code = 4\*, size]\
  \-> Match all 4XX codes
* \[ip, id, user, timestamp, request, status\_code, size > 1000]\
  \-> Match response sizes > 1000 bytes
* \[ip, id, user, timestamp, request, status\_code != 3\*, size]\
  \-> Ignore all redirect responses

### CloudWatch Logs Insights

Can be used to analyze your logs in seconds, with fast and interactive queries and visualizations.

#### Commands

`start-query / stop-query / get-query-results`

### CloudWatch Agent

Can be installed on EC2 to collect custom metrics (can be also installed via [SSM](cloudformation-and-sam.md#aws-systems-manager))

