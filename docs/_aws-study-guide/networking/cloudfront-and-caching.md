---
title: "Cloudfront"
subtitle: "Content delivery network (CDN) service"
is-folder: false
subcategory: networking
sequence: 4
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [CloudFront](#cloudfront)
    - [Process:](#process)
- [Caching](#caching)
- [](#)



## CloudFront

Global network of **edge locations** to deliver a **cached** copy of **web content** to your customers, or simply a CDN (Content Delivery Network).

* Reduce **response time** using nearest edge location
* **Throughput** dramatically increased
* Provides an additional layer of **security** for your architecture
* Supports **websocket** protocol
* Types of content:
  * **Static**: images,js, html etc..... with high TTL
  * **Video**: rtmp and http streaming support
  * **Dynamic**: customizations and non-cachable content
  * **User input:** http action support including Put/Post
  * **Secure**: Serve the content securely with SSL (https)
* **Geo-restriction** features (also known as geoblocking) at country level, or even with finer granularity if using third party geolocation services

#### Process:

1. Specify an **origin server** (S3 bucket or any http server)
2. Create a CloudFront **distribution** (linked to origin servers)
3. CloudFront assigns a **domain name** to your distribution
4. The distribution's **configuration** is sent to its edge locations

How to expire contents:

* **TTL**: Fixed period set by you, using **If-Modified-Since header** (if set to 0 the content will still be cached if it hasn't changed at the origin)
* **New name:** update is immediate (avoid using same name, as content is refreshed only at first request in every edge)
* **Invalidate** object: bad solution, needs interact with all edge locations

## Caching

Types of caching:

* **Client** side:
  * browser
* **Server** side:
  * WebServer
  * Reverse proxy cache

##
