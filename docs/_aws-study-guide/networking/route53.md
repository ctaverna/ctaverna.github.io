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


# How it works

- HA and scalable cloud **DNS service**
- You can combine with health-checking services to **route to healthy endpoints**
- You can also **purchase and manage domains**
- If you have stringent SLA add **Global Accelerator**, protecting users and applications from caching
- Routing options
  - **Simple round robin**
  - **Weighted round robin**  
Enables A/B testing using any number between 0 and 255  
ie: a:3/b:1 means a:75%, b:25%
  - **Latency based routing** (LBR) 
Routes to the fastest endpoint, based on actual performance measurements
- Health checks
- Geolocation routing
- Geoproximity routing (physical user-resource distance)

**Alias**\
Similar to CNAME record, pointing to a LB

# Traffic policies

* Graphic editor
* Rules can be based on location, latency...
  * Value -> ELB target goup
  * Value -> Weighted rule&#x20;
    * 30% -> ELB TG
    * 70% -> IP

