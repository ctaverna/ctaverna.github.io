- [Elasticity](#elasticity)
- [High availability](#high-availability)
- [Fault tolerance](#fault-tolerance)
- [Resiliency](#resiliency)
- [Durability](#durability)
- [Availability](#availability)
- [Reliability](#reliability)
- [Partition tolerance](#partition-tolerance)
- [Latency](#latency)
- [Auto scaling](#auto-scaling)
- [Infrastructure as Code (IaC)](#infrastructure-as-code-iac)
- [Continuous integration (CI)](#continuous-integration-ci)
- [Continuous delivery (CD)](#continuous-delivery-cd)

# Scalability
A measurement of a system's **ability to grow** to accommodate an increase in demand.  
Both horizontally and vertically.  
**Not** necessarily automatically.

# Elasticity
The ability to **acquire resources** as you need them **and release resources** when you no longer need them.  
Both horizontally and vertically.  
**Automatically**.

{: .box-warning}
An _elastic_ resource is _also scalable_, the opposite is not always true.

# High availability
The system will **continue to function** despite the complete failure of any component of the architecture.
_NAT GW, Elastricache, Redshift, RDS multi-AZ..._

# Fault tolerance
The system will **continue to function** **without degradation in performance** despite the complete failure of any component of the architecture.
_S3, DynamoDB, API GW, Cloudfront, Route53..._

# Resiliency
The ability of a workload to **recover from** infrastructure or service **disruptions**, dynamically **acquire computing resources** to meet demand, and **mitigate disruptions**, such as misconfigurations or transient network issues

# Durability
The ability of a system to **remain functional** when faced with the challenges of normal operation **over its lifetime**

# Availability
The **percentage of time** that a workload is **available for use**, where "available for use" means that it performs its agreed function when required.  
It is a commonly used metric to quantitatively measure reliability.  
Determined by percentage uptime, expressed in 9s.

# Reliability
The **ability** of a workload **to perform** its intended function **correctly and consistently** when it’s expected to. This includes the ability to operate and test the workload through its total lifecycle.

# Partition tolerance
A system's ability to **continue to operate** correctly **when** it has been **partial separated**; often in reference to a distributed system.

# Latency
A measurement of the amount of time between an action and the result, often between a request and a response.

# Auto scaling
- **Unmanaged services** *(EC2, RDS...)*\
	When new resources are added, minimum reaction time is **a few minutes.**
- **Managed services** *(APIGW, S3, ALB, Lambda, ECS, DynamoDB...)* \
	Can scale **instantly,** or at least **very fast**.
**Predictive scaling** is based on ML and can be a good solution to scale faster

# Infrastructure as Code (IaC)
* Provision and manage cloud resources by writing **human readable** and **machine consumable** templates
* Replicate, redeploy and repurpose your infrastructure
* **Rollback** to the last good state on failures
* Single source of truth
* Version control infrastructure and app together
* Build infrastructure and run it through your CI/CD pipeline

# Continuous integration (CI)
The software development practice in which you continuously **integrate** (or check in) **all code changes into a main branch** of a central repository.  
This practice enables you to **verify your code changes early** and often with an automated build and test process.

# Continuous delivery (CD)
The software development practice in which **all code changes** are **automatically** prepared and always **deployable** (ready to go into production) at a single step.

Continuous delivery **extends continuous integration** to include **testing** production-like stages and running verification testing against those deployments.

Although _**continuous delivery**_ can extend to a production deployment, it requires **manual intervention** between a code check-in and when that code is available for customer use.

_**Continuous deployment**_ extends _continuous delivery_ and is the automated release of software to customers, from check-in through production, **without human intervention**.

