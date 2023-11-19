---
title: "Network protection"
subtitle: "Services to protect your resources"
is-folder: false
subcategory: networking
sequence: 5
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [AWS WAF](#aws-waf)
- [AWS Shield](#aws-shield)


# AWS WAF
Web application firewall that lets you **monitor web requests** that are **forwarded** to resources, such as AWS API Gateway and AWS Application Load Balancers.  
You can also use AWS WAF to **block or allow requests** based on **conditions** that you specify, such as the IP addresses that requests originate from or values in the requests.
It can respond to requests either with the requested content, with an HTTP 403 status code (Forbidden), or with a custom response.

You can protect the following resource types:
- Amazon CloudFront distribution
- Amazon API Gateway REST API
- Application Load Balancer
- AWS AppSync GraphQL API
- Amazon Cognito user pool
- AWS App Runner service
- AWS Verified Access instance

# AWS Shield

Protection against **Distributed Denial of Service (DDoS)** attacks, provided at no additional cost.  
Additionally, you can use the **AWS Shield Advanced** managed threat protection service to improve your security posture with additional DDoS detection, mitigation, and response capabilities.