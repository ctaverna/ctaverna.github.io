- [AWS CloudTrail](#aws-cloudtrail)
		- [Commands](#commands)
		- [JSON metric filter examples](#json-metric-filter-examples)
- [VPC Flow Logs](#vpc-flow-logs)

![service-logo](/assets/img/aws-icons/Arch_AWS-CloudTrail_64.png)
## AWS CloudTrail

A service that **records API calls** and delivers log files for you (S3).

You can turn on CloudTrail on a per-region basis.

#### Commands

* create-trail
* delete-trail
* start-log / stop-log

#### JSON metric filter examples

* {($.event\_Name=ConsoleLogin) && ($.responseElements.ConsoleLogin="Failure") }\
  \-> Match all console login failures
* {($.event\_Name=ConsoleLogin) && ($.userIdentity.userName="csmith") }\
  \-> Match all console logins by IAM user csmith

## VPC Flow Logs

Captures traffic flow details in your VPC

* Accepted, rejected or ALL traffic
* Can be enabled for VPCs, subnets and ENIs
* Logs published to 
  * CloudWatch
  * S3
* Use cases:
  * Troubleshoot connectivity issues
  * Test network access rules
  * Monitor traffic
  * Detect and investigate security incidents
