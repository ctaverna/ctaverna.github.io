
## SysOps Associate certification

### Domain 1: Monitoring, Logging, and Remediation

- Amazon **CloudWatch** 
  - CloudWatch Logs
  - CloudWatch Logs Insights
  - CloudWatch agent: metrics and logs collected
  - CloudWatch alarms
  - CloudWatch metric filters
  - CloudWatch dashboards
- AWS **CloudTrail** logs
- Notifications
  - Amazon **SNS**, 
  - Service Quotas
  - **AWS Health** events

- Amazon **EventBridge** rules to invoke actions
- AWS **Systems Manager** Automation runbooks to take action based on **AWS Config** rules


### Domain 2: Reliability and Business Continuity
- AWS **Auto Scaling plans**
- Caching
- **RDS** Replicas and Aurora Replicas
- ELB and Route53 **health checks**
- Single AZ and Multi-AZ deployments
  - Amazon EC2 Auto Scaling groups
  - ELB
  - Amazon FSx
  - Amazon RDS
- Fault-tolerant workloads (Amazon EFS, Elastic IP addresses)
- **Route 53 routing policies** (failover, weighted, latency based)

- **Snapshots** and **backups**
  - RDS snapshots
  - AWS Backup
  - RTO and RPO
  - Amazon Data Lifecycle Manager
  - Retention policy
- Restore databases (point-in-time restore, promote read replica)
- Versioning and lifecycle rules
- Amazon S3 Cross-Region Replication (CRR)
- Perform disaster recovery procedures

### Domain 3: Deployment, Provisioning, and Automation

- Create and manage AMIs (**EC2 Image Builder**)
- AWS **CloudFormation**
- Cross-region and cross-account resources
  - AWS Resource Access Manager (**AWS RAM**)
  - CloudFormation **StackSets**
  - **IAM cross-account roles**
- Deployment scenarios and services (blue/green, rolling, canary)
- Identify and remediate deployment issues (service quotas, subnet sizing, CloudFormation errors, permissions)
- Automated deployments (Systems Manager, CloudFormation)
- Automated patch management
- Tasks schedulation (EventBridge, **AWS Config**)
- IAM features
  - password policies
  - multi-factor authentication [MFA]
  - roles
  - SAML
  - federated identity
  - resource policies
  - policy conditions
  - Troubleshoot and audit access issues
    - CloudTrail
    - IAM Access Analyzer
    - IAM policy simulator
  - Service control policies (**SCPs**) and permissions boundaries
  - **AWS Trusted Advisor** security checks
  - Secure multi-account strategies (AWS **Control Tower**, AWS **Organizations**)

- Create, manage, and protect encryption keys
- Encryption at rest with AWS Key Management Service (AWS **KMS**)
- Encryption in transit (AWS Certificate Manager [ACM], VPN)
- Secrets management (AWS Secrets Manager, Systems Manager Parameter Store)
- Review reports or findings (AWS Security Hub, Amazon GuardDuty, AWS Config, Amazon Inspector)
  
### Domain 5: Networking and Content Delivery

- VPC (subnets, route tables, network ACLs, security groups, NAT gateway, internet gateway)
- Private connectivity (Systems Manager Session Manager, VPC endpoints, VPC peering, VPN)
- AWS network protection services (AWS WAF, AWS Shield)
- Route 53 
  - hosted zones and records
  - routing policies (geolocation, geoproximity)
  - Route 53 Resolver
- Amazon CloudFront and S3 **origin access control** (OAC)
- **S3 static website hosting** configuration
- Collect and interpret logs 
  - VPC Flow Logs
  - ELB access logs
  - AWS WAF web ACL logs
  - CloudFront logs
- **CloudFront caching issues**: identify and remediate
- Troubleshoot hybrid and private **connectivity issues**

### Domain 6: Cost and Performance Optimization

- Cost allocation tags
- Underutilized or unused resources (Trusted Advisor, AWS Compute Optimizer, AWS Cost Explorer)
- Configure **AWS Budgets** and billing alarms
- **EC2 Spot Instances**: identify resource usage patterns that qualify workloads
- Identify opportunities to use managed services (Amazon RDS,AWS Fargate, Amazon EFS)

- Amazon Elastic Block Store (Amazon **EBS**): monitor metrics and modify configuration to increase performance efficiency
- S3: performance features (S3 Transfer Acceleration, multipart uploads)
- RDS: monitor metrics and modify the configuration to increase performance efficiency (Performance Insights, RDS Proxy)
- Enable **enhanced EC2 capabilities** (Elastic Network Adapter, instance store, placement groups)




## In-scope AWS services and features

#### Analytics:
- Amazon **OpenSearch** Service 
#### Application Integration:
- Amazon **EventBridge**
- Amazon Simple Notification Service (Amazon **SNS**)
- Amazon Simple Queue Service (Amazon **SQS**)
#### Cloud Financial Management:
- AWS **Cost and Usage Report**
- AWS **Cost Explorer**
- *Savings Plans*
#### Compute:
- AWS *Auto Scaling*
- Amazon **EC2**
- Amazon EC2 *Auto Scaling*
- Amazon **EC2 Image Builder**
- AWS **Lambda**
#### Database:
- Amazon **Aurora**
- Amazon **DynamoDB**
- Amazon **ElastiCache**
- Amazon **RDS**

#### Developer Tools:
- AWS tools and SDKs
#### Management and Governance:
- AWS CLI
- AWS **CloudFormation**
- AWS **CloudTrail**
- Amazon **CloudWatch**
- AWS **Compute Optimizer**
- AWS **Config**
- AWS **Control Tower**
- AWS **Health Dashboard**
- AWS **License Manager**
- AWS Management Console
- AWS **Organizations**
- AWS **Service Catalog**
- AWS **Systems Manager**
- AWS **Trusted Advisor**
#### Migration and Transfer:
- AWS **DataSync**
- AWS Transfer Family Networking and Content Delivery:
- Amazon **CloudFront**
- Elastic Load Balancing (**ELB**)
- AWS **Global Accelerator**
- Amazon **Route 53**
- AWS **Transit Gateway**
- Amazon **VPC**
- AWS **VPN**

#### Security, Identity, and Compliance:
- AWS **Certificate Manager** (ACM)
- Amazon **Detective**
- AWS **Directory Service**
- AWS **Firewall Manager**
- Amazon **GuardDuty**
- AWS Identity and Access Management (**IAM**)
- AWS **IAM Access Analyzer**
- Amazon **Inspector**
- AWS Key Management Service (AWS **KMS**)
- AWS **Secrets Manager**
- AWS **Security Hub**
- AWS **Shield**
- AWS **WAF**
#### Storage:
- AWS **Backup**
- Amazon Elastic Block Store (Amazon **EBS**)
- Amazon Elastic File System (Amazon **EFS**)
- Amazon **FSx**
- Amazon **S3**
- Amazon S3 Glacier
- AWS **Storage Gateway**