---
title: "Containers"
subtitle: "ECS, EKS, Fargate and other services relate to software containerization"
is-folder: false
subcategory: "compute-and-containers"
sequence: 3
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [Elastic Container Service (ECS)](#elastic-container-service-ecs)
  - [ECS Concepts](#ecs-concepts)
    - [**Amazon ECS Cluster**](#amazon-ecs-cluster)
    - [**Task Definition**](#task-definition)
    - [**Services**](#services)
    - [**Amazon ECS Service Discovery**](#amazon-ecs-service-discovery)
- [Elastic Kubernetes Service (EKS)](#elastic-kubernetes-service-eks)
- [Elastic Container Registry (ECR)](#elastic-container-registry-ecr)
- [AWS Cloud Map](#aws-cloud-map)
- [AWS App Mesh](#aws-app-mesh)
- [AWS Fargate](#aws-fargate)


## Elastic Container Service (ECS)

It's a managed Docker container orchestration service.

* Supports **Auto scaling groups**
* **Steps:**
  * Create a **service** for each application (component)
  * Register the **target group instances** (EC2) for these services
  * Create an **ALB** with target groups that points to ECS app services
* Two modes:
  * **Fargate** launch type
  * **EC2** launch type

### ECS Concepts

#### **Amazon ECS Cluster**

Foundational infrastructure components on which containers run, it consists of **one or more EC2** instances, **with an agent** installed.\
In an AWS **Fargate** launch type, ECS clusters are not made up of EC2 instances, but AWS simply assigns each one an **elastic network interface**. This provides network connectivity for the container without the need to manage the infrastructure on which it runs.

#### **Task Definition**

A _task definition_ is a **JSON document** that describes one or more **containers to launch**.\
A single task definition can describe between one and 10 containers and their requirements.\
Task definitions can also specify **compute**, **networking**, and **storage requirements**, such as which ports to expose to which containers and which volumes to mount.

#### **Services**

When creating a _service_, you can specify the **task definition and number of tasks** to maintain at any point in time. After the service creates, it will launch the desired number of tasks; thus, it launches each of the containers in the task definition.\
If any containers in the task become unhealthy, the service is responsible and launches **replacement tasks.**

* **Target Tracking Policies**\
  Determine when to **scale OUT** the number of tasks based on a **target metric**.\
  In the case of a conflict of multiple target tracking policies, the highest task count wins.
* **Step Scaling Policies**\
  Determine when to **scale IN or OUT** as metrics **increase or decrease**.
*   **Task Placement Strategies**  
Determine on a best-effort basis, **on which instances** tasks are distributed.\
The **`spread`** task placement strategy distributes tasks across multiple AZs as much as possible. Other strategies include **`binpack`** (try to leave the least amount of unused CPU or memory) and **`random`**.
*   **Task Placement Constraints**  
Enforce **specific requirements** on the container instances on which tasks launch, such as to specify the instance type as t2.micro.

#### **Amazon ECS Service Discovery**

Allows you to **assign** Amazon Route 53 **DNS entries automatically** for tasks your service manages. A service directory maps DNS entries to available service endpoints.\
_ECS Service Discovery_ maintains **health checks** of containers, and it removes them from the service directory should they become unavailable.

**Amazon ECS Container Agent**

Responsible for **monitoring** the **status of tasks** that run **on cluster instances**.\
If a new task needs to launch, the container agent will download the container images and start or stop containers. If any containers fail health checks, the container agent will replace them

****

## Elastic Kubernetes Service (EKS)

Managed Kubernetes service to run Kubernetes in the AWS cloud and on-premises data centers.

## Elastic Container Registry (ECR)

It's simply a managed Docker registry.

## AWS Cloud Map

AWS Cloud Map is a **fully managed service** that allows you to **register** any application **resources** (such as databases, queues, microservices, and other cloud resources) with custom namespaces.\
AWS Cloud Map then constantly **checks the health** of resources to make sure the location is up-to-date, allowing you to add and register any resource with minimal manual intervention of mappings.\
AWS Cloud Map assists with **service discovery**, **continuous integration**, and **health monitoring** of your microservices and applications.

## AWS App Mesh

AWS App Mesh **captures metrics, logs, and traces from every microservice** which you can export to Amazon CloudWatch, AWS X-Ray, and compatible AWS partner and community tools for monitoring and tracing.\
It also provides **custom control over traffic routing** between microservices to assist with deployments, failures, or scaling of your application.\
App Mesh lets you configure **microservices** to **connect directly to each other via a proxy** instead of requiring code within the application or using a load balancer.\
App Mesh uses **Envoy**, an open source service mesh proxy which is deployed alongside your microservice containers.

## AWS Fargate

AWS Fargate is a **technology** for Amazon ECS and Amazon Elastic Container Service for Kubernetes (Amazon EKS) that allows you to **run containers without having to manage servers or clusters**.
