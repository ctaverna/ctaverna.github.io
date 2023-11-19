---
title: "Resource Access Manager"
subtitle: "API calls tracking, VPC traffic tracking"
is-folder: false
subcategory: "management"
sequence: 6
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [AWS Resource Access Manager (AWS RAM)](#aws-resource-access-manager-aws-ram)
- [How it works](#how-it-works)



# AWS Resource Access Manager (AWS RAM)
Share the resources in one AWS account with other AWS accounts.  
If your account is managed by AWS Organizations, you can use AWS RAM to share resources with the **accounts in an organizational unit**, or **all of the accounts in the organization**.  
The shared resources work for users in those accounts just like they would if they were created in the local account.

# How it works
When you share a resource in the **owning account** with another AWS account, the **consuming account**, you are granting access for principals in the consuming account to the shared resource.  
**Any policies and permissions** that apply to roles and users in the consuming account **also apply to the shared resource**.  
> The resources in the share look like they're native resources in the AWS accounts you shared them with.

You can share both **global** and **Regional** resources

