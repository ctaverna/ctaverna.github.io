---
title: "ELB"
subtitle: "Elastic Load Balancer"
is-folder: false
subcategory: networking
sequence: 3
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [Target group](#target-group)
- [Application LB](#application-lb)
- [Network LB](#network-lb)


Managed load balancing service that distributes traffic to EC2 instances, containers and IP addresses (+ metrics to cloudwatch).

- **HTTP, HTTPS, TCP and SSL** (Secure TCP)
- Can be **external or internal** facing
- Each load balancer is given a **DNS name**
- Recognizes and responds to **unhealthy instances**
- **Sticky sessions** (load balancer-generated cookies only)

# Target group

The target group is the connection between the load balancer and, for example, an autoscaling group.

# Application LB

- HTTP, HTTPS (Layer 7)

# Network LB

- TCP, TLS, UDP (Layer 4)

