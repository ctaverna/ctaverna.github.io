---
title: "OpsWorks, Beanstalk, Lightsail"
subtitle: "Running application stacks"
is-folder: false
subcategory: "management"
sequence: 3
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [OpsWorks](#opsworks)
- [Elastic Beanstalk](#elastic-beanstalk)
  - [BeansTalk CLI](#beanstalk-cli)
  - [Concepts](#concepts)
  - [Deployments](#deployments)
    - [All-at-Once deployments](#all-at-once-deployments)
    - [In-Place deployments](#in-place-deployments)
    - [Rolling deployments](#rolling-deployments)
    - [**Blue/Green deployment**](#bluegreen-deployment)
    - [Immutable Deployment](#immutable-deployment)
- [Lightsail](#lightsail)


## OpsWorks

**AWS OpsWorks Stacks** is a configuration management service that helps you configure and operate applications of all shapes and sizes using Chef.

**AWS OpsWorks for Chef Automate** provides a fully managed Chef Automate server\
The Chef Automate platform gives you full stack automation by handling operational tasks such as software and operating system configurations, continuous compliance, package installations, database setups, and more.

**AWS OpsWorks for Puppet Enterprise** provides a managed Puppet Enterprise server and suite of automation tools that give you workflow automation for orchestration, automated provisioning, and visualization for traceability

## Elastic Beanstalk

It's a service that you can use to **deploy applications, services, and architecture**.

It provides provisioned scalability, load balancing, and high availability, using common languages, including _Java, .NET, PHP, Node.js, Python, Ruby, Go,_ and _Docker_, on common-type web servers, such as _Apache, NGINX, Passenger,_ and _IIS_.

Elastic Beanstalk can launch AWS resources automatically with Route 53, Auto Scaling, ELB, EC2, and RDS instances, and it allows you to customize additional AWS resources.

You can also use **Docker containers** with Elastic Beanstalk.

You are **charged** only for the **resources you use** to run your application.

{: .box-note}
You can view Elastic Beanstalk stacks in AWS _CloudFormation_, but always use the Elastic Beanstalk service to make modifications.

### BeansTalk CLI

There was a specific EB CLI for BeansTalk, today it has been integrated in the AWS CLI.

```bash
--- EB CLI ---
eb create my-env

--- AWS CLI ---
aws elasticbeanstalk check-dns-availability --cname-prefix my-cname
```

### Concepts

* **Application:** a logical collection of environment variables and components, application versions, and environment configurations.&#x20;
* **Application Versions:** iterations of the application’s deployable code, pointing to an Amazon S3 object with the code source package. An application can have many versions, with each version being unique. You can deploy and access any application version at any time.
* **Environment:** a separate version of the application, each environment runs one application version at a time, but you can run multiple environments, with the same application on each, along with its own customizations and resources.
* **Environment Tier:** to launch an environment, you must first choose an _environment tier_, a sort of template (eg: _WebServer_ or a _Worker)._
* **Environment Configuration:** You can change your environment to create, modify, delete, or deploy resources and change the settings for each. Your environment configuration saves to a configuration template exclusive to each environment.

### Deployments

#### All-at-Once deployments

An all-at-once deployment applies updates to **all your instances at once**.

When you execute this strategy, you experience **downtime**.\
An appropriate strategy for **simple, immediate update requirements** when it’s not critical to have your application always available.

#### In-Place deployments

AWS CodeDeploy **stops currently running applications** on the target instance, **deploys** the latest revision, **restarts** applications, and **validates** successful deployment.\
In-place deployments can support the automatic configuration of a **load balancer**.\
Available for your platform updates, such as a coding-language platform update for a web server.

#### Rolling deployments

Applies changes to all of your instances **by rolling the updates from one instance to another**.\
This approach **reduces possible downtime** during implementation of the change and allows available instances to run while you deploy.\
Updates are applied in **batches**, one after the other.\
You might specify a time to wait between health-based updates and checks between batches.\
If the rolling update fails, the service begins another rolling update to rollback the previous configuration.

#### **Blue/Green deployment**

The **running** environment is considered the **blue** environment, and the **newer** environment with your update is considered the **green** environment.\
When your changes are ready and have gone through **all tests** in your green environment, you can **swap** the CNAMEs of the environments **to redirect** traffic to the newer running environment.\
This strategy provides an **instantaneous update** with typically **zero downtime**.

#### Immutable Deployment

Is best when an environment requires a **total replacement** of instances, rather than updates to an existing part of an infrastructure.\
This approach implements a safety feature: EB creates a **temporary Auto Scaling group** behind your environment’s load balancer to contain the new instances with the updates you apply. If the update fails, the rollback process terminates the Auto Scaling group.\
If all instances pass the checks, EB **transfers the new configurations** to the original Auto Scaling group. After the updates are made, EB deletes the temporary Auto Scaling group of the older instances.

## Lightsail

Provides easy-to-use cloud resources to get your web application or websites up and running in just a few clicks.  
Lightsail offers **simplified services** such as instances, containers, databases, storage, and more.  
You can use pre-configured blueprints like WordPress, Prestashop, or LAMP.

The Lightsail console guides you through the configuration process, and in many cases, has components already configured.

Can be used to start using AWS with a super-light approach, with almost no knowledge of how AWS works.