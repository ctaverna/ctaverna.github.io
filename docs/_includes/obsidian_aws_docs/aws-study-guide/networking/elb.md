- [Elastic Load Balancing](#elastic-load-balancing)
	- [Target group](#target-group)
- [Application load balancer (ALB)](#application-load-balancer-alb)
- [Network load balancer (ELB)](#network-load-balancer-elb)
- [Gateway load balancer (GWLB)](#gateway-load-balancer-gwlb)

![service-logo](/assets/img/aws-icons/Arch_Elastic-Load-Balancing_64.png)
# Elastic Load Balancing

Managed load balancing service that distributes traffic to EC2 instances, containers and IP addresses (+ metrics to CloudWatch).

- **HTTP, HTTPS, TCP and SSL** (Secure TCP)
- Can be **external or internal** facing
- Each load balancer is given a **DNS name**
- Recognizes and responds to **unhealthy instances**
- **Sticky sessions** (load balancer-generated cookies only)

## Target group

The target group is the connection between the load balancer and, for example, an autoscaling group.

# Application load balancer (ALB)

- HTTP, HTTPS (Layer 7)

# Network load balancer (ELB)

- TCP, TLS, UDP (Layer 4)

# Gateway load balancer (GWLB)
 - third-party virtual appliance from AWS Marketplace