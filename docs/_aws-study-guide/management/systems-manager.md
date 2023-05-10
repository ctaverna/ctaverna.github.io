---
title: "Systems Manager (SSM)"
subtitle: "End-to-end management solution for resources on AWS, multicloud and hybrid environments"
is-folder: false
subcategory: "management"
sequence: 2
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [Quick Setup ](#quick-setup-)
- [Application management](#application-management)
- [Change management ](#change-management-)
- [Node management](#node-management)
- [Operations management](#operations-management)
- [Shared resources](#shared-resources)


(aka SSM, because it was formerly known as _Simple Systems Manager_)

AWS Systems Manager is a **management service** that helps you automatically **collect software inventory**, apply OS **patches**, create **system images**, and **configure** Windows and Linux operating systems.

* Across all your Win and Linux workloads
* Runs in EC2 or on-premises
* Based on AWS Systems Manager Agent (**SSM Agent**) that can be installed and is available preinstalled on some AMIs

## Quick Setup&#x20;

Configure frequently used AWS services and features with recommended best practices.\
You can use Quick Setup in an individual AWS account or across multiple AWS accounts and AWS Regions by integrating with AWS Organizations.

Quick Setup simplifies setting up services, including Systems Manager, by automating common or recommended tasks. These tasks include, for example, creating required AWS Identity and Access Management (IAM) instance profile roles and setting up operational best practices, such as periodic patch scans and inventory collection.

## Application management

**Application Manager** \
****An _application_ is a logical group of AWS resources that you want to operate as a unit. This logical group can represent, for example, different versions of an application, ownership boundaries for operators, or developer environments. Groups can be defined by tag, CloudFormation stack, or resource group.

**AppConfig**\
****Helps you create, manage, and deploy application configurations and feature flags.\
Works with applications hosted on Amazon EC2 instances, AWS Lambda containers, mobile applications, or edge devices.\
To prevent errors when deploying application configurations, AppConfig includes validators (syntactic or semantic check), and in case of errors rolls back the change to minimize the impact for your application users.

**Parameter Store**\
****You can define key-values that can be used in your code or, for example, as CloudFormation parameters or CodeDeploy environment variables.

## Change management&#x20;

**Change Manager**\
It's an enterprise multi-account change management framework for requesting, approving, implementing, and reporting on operational changes to your application configuration and infrastructure. Change Manager reports on _why_ changes were requested across your organization, _who_ approved them, and _how_ they were implemented.

**Automation**\
****Tool to automate common maintenance and deployment tasks. You can use Automation to create and update AMIs, apply driver and agent updates, reset passwords on Windows Server instances, reset SSH keys on Linux instances, and apply OS patches or application updates.

**Change Calendar** \
Helps you set up date and time ranges, called _events_, when actions you specify (for example, in Systems Manager Automation runbooks) can or can't be performed in your AWS accounts. You can add events manually in the Change Calendar interface or import events from a supported third-party calendar using an .ics file.

**Maintenance Windows** \
Can be used to schedule and run automatically administrative tasks such as installing patches and updates without interrupting business-critical operations. (EC2, Run Command, Automation workflows, AWS Step Functions, or AWS Lambda functions)

## Node management

A _managed node_ is any machine configured for SSM (EC2, edge devices, on-prem servers or virtual machines)

**Compliance**\
****Scan your fleet of managed nodes for patch compliance and configuration inconsistencies. Collect and aggregate data from multiple AWS accounts and AWS Regions.

**Fleet Manager**\
****Remotely manage your nodes, and view the health and performance status of your entire fleet from one console. Perform common troubleshooting and management tasks from the console (viewing directory and file contents, Windows registry management, OS users management...).

**Inventory**\
****Automates the process of collecting software inventory from your managed nodes.

**Session Manager**\
****Manage edge devices and EC2 instances through console or CLI, without opening inbound ports, maintain bastion hosts, or manage SSH keys. To use Session Manager, you must enable the advanced-instances tier.

**Run Command**\
****Perform on-demand changes such as updating applications or running Linux shell scripts and Windows PowerShell commands on a target set of dozens or hundreds of managed nodes.

**State Manager**\
****Automate the process of keeping your managed nodes in a defined state (managed nodes are bootstrapped with specific software at startup, joined to a Windows domain, or patched with specific software updates).

**Patch Manager**\
****Automate the process of patching your nodes for both operating systems and applications. Scan managed nodes for missing patches and apply missing patches individually or to large groups by using tags.\
\- _patch baselines: r_ules for auto-approving patches and a list of approved and rejected patches\
\- install security patches on a regular basis by scheduling\
\- patch your managed nodes on demand at any time\
\- manage trusted repositories\
\- generate patch reports

**Distributor**\
****Create and deploy packages to managed nodes (your own software or AWS-provided agent software packages, such as _AmazonCloudWatchAgent)._ Uninstall and reinstall new package versions.

**Hybrid Activations**\
****To setup a machine in your hybrid environment it is needed to create a managed instance activation. Activation code and ID that you get provide secure access to the SSM service from your managed instances.

## Operations management

**Incident Manager**\
****It's an incident management console that helps users mitigate and recover from incidents affecting their AWS hosted applications. Increases incident resolution by notifying responders of impact, highlighting relevant troubleshooting data, and providing collaboration tools to get services back up and running. Automates response plans and allows responder team escalation.

**Explorer** \
****Customizable operations dashboard that reports information about your AWS resources.\
\- aggregated view of operations data (OpsData) for your AWS accounts and across AWS Regions\
\- metadata about your EC2 instances, patch compliance details\
\- operational work items (OpsItems)\
\- context about how OpsItems are distributed across your business units or applications\
\- how OpsItems trend over time, and how they vary by category\
You can group and filter information in Explorer to focus on items that are relevant to you and that require action. When you identify high priority issues, you can use OpsCenter to run Automation runbooks and resolve those issues.

**OpsCenter** \
****Prrovides a central location to view, investigate, and resolve operational work items (OpsItems) related to AWS resources. Designed to reduce mean time to resolution. Provides SSM _Automation runbooks_ that you can use to resolve issues. You can specify searchable, custom data for each OpsItem. You can also view automatically generated summary reports about OpsItems by status and source.

## Shared resources

A **Systems Manager document** (SSM document) defines the actions that SSM performs.

* _Command_ documents, which are used by State Manager and Run Command, and Automation runbooks, which are used by Systems Manager Automation.&#x20;
* Dozens of pre-configured documents that you can use by specifying parameters at runtime. Documents can be expressed in JSON or YAML, and include steps and parameters that you specify.\


