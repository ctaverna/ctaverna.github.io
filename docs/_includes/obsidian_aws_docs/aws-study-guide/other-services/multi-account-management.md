- [AWS Trusted advisor](#aws-trusted-advisor)
- [AWS Service Catalog](#aws-service-catalog)
- [AWS Organizations](#aws-organizations)
- [AWS Control Tower](#aws-control-tower)
	- [Landing Zone](#landing-zone)
- [Amazon GuardDuty](#amazon-guardduty)
- [AWS Security Hub](#aws-security-hub)

![service-logo](/assets/img/aws-icons/Arch_AWS-Trusted-Advisor_64.png)
# AWS Trusted advisor
Review check results for your AWS account and then follow the recommended steps to fix any issues.  
For example, Trusted Advisor might recommend that you delete unused resources to reduce your monthly bill, such as an Amazon Elastic Compute Cloud (Amazon EC2) instance.

**Summary** 

- **Action recommended (red)**  
Trusted Advisor recommends an action for the check (eg. security issues)
- **Investigation recommended (yellow)**  
Possible issues, for example it might recommend ways to delete unused resources
- **Checks with excluded items (gray)**  
Excluded items that you want a check to ignore

**Categories**

- Cost optimization
- Performance
- Security
- Fault tolerance
- Service limits
- Operational Excellence

![service-logo](/assets/img/aws-icons/Arch_AWS-Service-Catalog_64.png)
# AWS Service Catalog

Create and manage catalogs of IT services that are approved for AWS.  
Service Catalog allows organizations to **centrally manage** commonly deployed IT services, and helps organizations achieve **consistent governance** and **meet compliance requirements**.  
> End users can quickly deploy only the approved IT services they need, following the constraints set by your organization.

![service-logo](/assets/img/aws-icons/Arch_AWS-Organizations_64.png)
# AWS Organizations

Account management service that enables you to **consolidate multiple AWS accounts** into an organization that you create and centrally manage.  
AWS Organizations includes **account management** and **consolidated billing** capabilities that enable you to better meet the budgetary, security, and compliance needs of your business. As an administrator of an organization, you can **create accounts** in your organization and **invite existing accounts to join** the organization.

- Centralized management of all of your AWS accounts
- Consolidated billing for all member accounts
- Hierarchical grouping of your accounts to meet your budgetary, security, or compliance needs
- You can group your accounts into organizational units (OUs) and attach different access policies to each OU
- Policies to centralize control over the AWS services and API actions that each account can access


![service-logo](/assets/img/aws-icons/Arch_AWS-Control-Tower_64.png)
# AWS Control Tower

Set up and govern an AWS multi-account environment, following prescriptive best practices.  
AWS Control Tower orchestrates the capabilities of several other AWS services, including AWS **Organizations**, AWS **Service Catalog**, and AWS **IAM Identity Center**, to build a landing zone in less than an hour.  
> Resources are set up and managed on your behalf.

AWS Control Tower orchestration **extends** the capabilities of AWS Organizations.  
To help keep your organizations and accounts from drift, which is divergence from best practices, AWS Control Tower applies **controls** (sometimes called **guardrails**).  
For example, you can use controls to help **ensure** that security **logs** and necessary cross-account access **permissions** are **created, and not altered**.

## Landing Zone

A solution to help customers set up a secure, multi account AWS environments.


![service-logo](/assets/img/aws-icons/Arch_Amazon-GuardDuty_64.png)
# Amazon GuardDuty 
Security monitoring service that analyzes and processes Foundational data sources, such as AWS CloudTrail management events, AWS CloudTrail event logs, VPC flow logs (from Amazon EC2 instances), and DNS logs.  

It uses **threat intelligence** feeds, such as **lists of malicious IP** addresses and domains, and **machine learning** to identify unexpected, potentially unauthorized, and malicious activity within your AWS environment.

GuardDuty **informs you** of the status of your AWS environment by **producing security findings** that you can view in the GuardDuty **console** or through **EventBridge**.  
Can also export your findings to S3.

![service-logo](/assets/img/aws-icons/Arch_AWS-Security-Hub_64.png)
# AWS Security Hub 
Provides you with a **comprehensive view** of your **security state** in AWS and helps you assess your AWS environment against security industry standards and best practices.

Security Hub collects security data across AWS accounts, AWS services, and supported **third-party products** and helps you analyze your security trends and identify the highest priority security issues.

To help you manage the security state of your organization, Security Hub supports multiple security standards. These include:
- the AWS Foundational Security Best Practices (FSBP) standard developed by AWS
- Center for Internet Security (CIS)
- Payment Card Industry Data Security Standard (PCI DSS)
- National Institute of Standards and Technology (NIST)

Each standard includes several security controls, each of which represents a security best practice. Security Hub runs checks against security controls and generates control findings to help you assess your compliance against security best practices.

In addition to generating control findings, Security Hub also receives findings from other AWS services—such as Amazon GuardDuty, Amazon Inspector, and Amazon Macie— and supported third-party products. This gives you a **single pane of glass** into a variety of security-related issues. 