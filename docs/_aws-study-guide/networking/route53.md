---
title: "Route 53"
subtitle: "Highly available and scalable Domain Name System (DNS) web service"
is-folder: false
subcategory: networking
sequence: 2
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [How it works](#how-it-works)
- [Traffic policies](#traffic-policies)
- [Restricting access](#restricting-access)


# How it works

- HA and scalable cloud **DNS service**
- You can combine with health-checking services to **route to healthy endpoints**
- You can also **purchase and manage domains**
- If you have stringent SLA add **Global Accelerator**, protecting users and applications from caching
- Routing options
  - **Simple routing**
  - **Weighted routing**  
Enables A/B testing using any number between 0 and 255  
ie: a:3/b:1 means a:75%, b:25%
  - **Latency based routing** (LBR) 
Routes to the fastest endpoint, based on actual performance measurements
  - **Failover**  policy (active-passive failover)
  - **Geolocation** routing (based on user location)
  - **Geoproximity** routing (based on resource location)
  - **IP based**

**Alias**  
Similar to CNAME record, pointing to a LB

# Traffic policies

* Graphic editor
* Rules can be based on location, latency...
  * Value -> ELB target group
  * Value -> Weighted rule
    * 30% -> ELB TG
    * 70% -> IP

# Restricting access
CloudFront provides two ways to send authenticated requests to an Amazon S3 origin:  
- Origin Access Control (OAC) 
- Origin Access Identity (OAI)

We recommend using OAC because it supports:
- All Amazon S3 buckets in all AWS Regions
- Amazon S3 server-side encryption with AWS KMS (SSE-KMS)
- Dynamic requests (PUT and DELETE) to Amazon S3

Origin access identity (OAI) doesn't work for the scenarios in the preceding list, or it requires extra workarounds in those scenarios. 
