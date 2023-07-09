---
title: "EC2"
subtitle: "Elastic Compute Cloud"
is-folder: false
subcategory: "compute-and-containers"
sequence: 1
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [AMI](#ami)
- [User data](#user-data)
- [Default user](#default-user)
- [EC2 Key pairs](#ec2-key-pairs)
- [**Instance profile**](#instance-profile)
- [Instance metadata service](#instance-metadata-service)
- [Instance types](#instance-types)
    - [General purpose](#general-purpose)
    - [Compute Optimized](#compute-optimized)
    - [Memory optimized](#memory-optimized)
    - [Accelerated computing](#accelerated-computing)
    - [Storage optimized](#storage-optimized)
    - [Graviton2 processors](#graviton2-processors)
    - [Intel Processors](#intel-processors)
- [Pricing options](#pricing-options)
    - [On-demand instances](#on-demand-instances)
    - [Reserved instances](#reserved-instances)
    - [Savings plan](#savings-plan)
    - [Spot instances](#spot-instances)
    - [Dedicated instances](#dedicated-instances)
    - [Dedicated host](#dedicated-host)
- [Architectural considerations](#architectural-considerations)
- [EC2 Status checks](#ec2-status-checks)
- [Auto scaling](#auto-scaling)
- [Note su Elastic IP](#note-su-elastic-ip)
- [EC2 Spot Fleet](#ec2-spot-fleet)
- [EC2](#ec2)


**Launch template** (new) is better than the old **launch config.**

**AWS Compute Optimizer** recommends optimal resources for your workloads.

Apply **tags** to manage, search and filter.

## AMI

You can use a Quick Start **Amazon Machine Image** (AMI) to create any instance type.

* Pre-built
* AWS Marketplace
* Create your own

An AMI includes the following:

* **One or more EBS snapshots**, (or, for instance-store-backed AMIs, a template for the root volume of the instance). A root volume typically contains a full operating system (OS) and everything that has been installed into that OS (the applications, libraries, utilities, and so on). The EC2 service copies the template to the root volume of a new EC2 instance and then starts it up.
* **Launch permissions** that control which AWS accounts can use the AMI to launch instances
* **A block device mapping** that specifies the volumes to attach to the instance (if any) when it's launched

How do AMIs help?

* Repeatability
* Reusability
* Recoverability
* Marketplace solutions
* Backup

## User data

It's an option to automate the completion of the instance launch.\
Is implemented as a **shell script** that runs with root or Administrator privilege **after start** but **before** it becomes accessible on the **network**.

`#!/bin/bash yum update -y service httpd start chkconfig httpd on`

## Default user

* The default user for Amazon Linux instances is **ec2-user**.
* For other Linux distribution it may vary, for example for Ubuntu Linux is **ubuntu.**
* For Windows instances, the default user is **Administrator** but can vary depending on language.

## EC2 Key pairs

An Amazon EC2 key pair has a **name**, and it is composed of:

* a **public key**, retained by AWS
* a **private key**, stored securely under your responsibility (can be downloaded only during generation)

If specified at launch time, the credential is stored as part of the instance provisioning process.\
For a Linux instance, the public key from the key pair is added to the \~/.ssh/authorized\_keys file for the default user.\
For a Windows instance, the password for the default administrator account is encrypted with the public key and can be decrypted with the private key.

A key pair can be **created** by AWS or **imported** after being generated locally.

## **Instance profile**

An Instance Profile is a container for an IAM role.\
Associations follow this rules:

\[1] **IAM role** -> \[1] **Instance profile** -> \[Many] **EC2s**

\[1] **EC2s** -> \[1] **Instance profile --- one **_**at a time**_, and can be changed also while instance is running

After this association the EC2 makes a call to STS to get new short-term credentials, that are exposed through EC2 metadata service

## Instance metadata service

```
IPv4
http://169.254.169.254/latest/meta-data/

IPv6
http://[fd00:ec2::254]/latest/meta-data/
```

## Instance types

Example: **m5.large**

* **m** is family
* **5** is generation number
* **large** is the size of the instance

large = 2 vCPU\
xlarge = 4 vCPU\
2xlarge = 8 vCPU\
4xlarge = 16 vCPU\
12xlarge = 48 vCPU\
24xlarge = 96 vCPU

#### General purpose

**T2** instances are burstable performance instances that provide a baseline level of CPU performance with the ability to burst above the baseline. Use cases for this type of instance include websites and web applications, development environments, build servers, code repositories, micro services, test and staging environments, and line of business applications.

#### Compute Optimized

**C5** instances are optimized for **compute-intensive workloads** and deliver very cost-effective high performance at a low price per compute ratio.\
Use cases include high-performance web servers, scientific modelling, batch processing, distributed analytics, high-performance computing (HPC), machine/deep learning inference, ad serving, highly scalable multiplayer gaming, and video encoding.

#### Memory optimized

**R4** instances are optimized for memory-intensive applications. Use cases include high-performance databases, data mining and analysis, in-memory databases, distributed web scale in-memory caches, applications performing real-time processing of unstructured big data, Hadoop/Spark clusters, and other enterprise applications.

#### Accelerated computing

**P3** instances are intended for general-purpose GPU compute applications. Use cases include machine learning, deep learning, high-performance computing, computational fluid dynamics, computational finance, seismic analysis, speech recognition, autonomous vehicles, and drug discovery.

#### Storage optimized

**H1** instances feature up to 16 TB of HDD-based local storage, deliver high disk throughput, and a balance of compute and memory. Use cases include Amazon EMR-based workloads, distributed file systems such as HDFS and MapR-FS, network file systems, log or data processing applications such as Apache Kafka, and big data workload clusters.

#### Graviton2 processors

Custom silicon designed by AWS, based on 64-bit Arm Neoverse cores

* **M6g**: General purpose
* **C6g** - Compute optimized
* **R6g** - Memory optimized

#### Intel Processors

There are several different Intel processors to fit different workloads.

* Intel® **AVX 512**: Optimized for: scientific simulations, financial analytics, artificial intelligence (AI)/deep learning, 3D modeling and analysis, image and audio/video processing, cryptography and data compression.
* Intel® **AES-NI**: AES-NI provides faster data protection and greater security; making pervasive encryption feasible in areas where previously it was not.
* Intel® **TSX**: Transactional Synchronization Extensions allows the processor to determine dynamically whether threads need to serialize through lock-protected critical sections, and to perform serialization only when required. Optimizing compute performance for business applications dynamically
* Intel® **Turbo Boost**: Turbo Boost Technology 2.0 accelerates processor and graphics performance for peak loads, automatically allowing processor cores to run faster than the rated operating frequency if they’re operating below power, current, and temperature specification limits.

## Pricing options

#### On-demand instances

* Pay per second (Amazon linux & Ubuntu) or by the hour (all other OS)
* No long term commitments
* No upfront payments
* Elastic capacity

#### Reserved instances

* Pre-pay per capacity
* Standard RI, Convertible RI, Scheduled RI
* All upfront, Partial upfront, no upfront
* Can be shared between multiple accounts

#### Savings plan

* **Compute savings plan**: Most flexibility and reduce cost up to 66%
* **EC2 Instance savings plan:** apply to specific instance family within a region, largest discount (up to 72%, like Standard RIs)

#### Spot instances

* Purchase unused capacity
* Prices based on supply and demand
* Termination notice provided 2 minutes prior to termination
* Spot blocks: launch spot instances with a duration lasting 1 to 6 hours

#### Dedicated instances

Instances that run on hardware that is dedicated to a single customer.\
Pricing: hourly fee per instance + dedicated per region fee (once per hour)

#### Dedicated host

Full physical server with EC2 instance capacity fully dedicated to your use. It can be useful for:

* Save money for licensing cost per-core or per-socket
* Meet compliance or regulatory requirements

## Architectural considerations

The **cluster placement group** is a logical grouping of instances within a single AZ. It provides the lowest latency and highest packet per second network performance possible.

A **spread placement group** is a grouping of instances that are purposely positioned on distinct underlying hardware, to _reduce the risk of simultaneous failures_ that could occur if instances were sharing underlying hardware.\
This type of group can span multiple Availability Zones, up to a maximum of seven instances per Availability Zone per group.

**Partition placement groups** spread EC2 instances across logical partitions and ensure that instances in different partitions do not share the same underlying hardware, thus containing the impact of hardware failure to a single partition. In addition, partition placement groups offer visibility into the partitions and allow topology aware applications to use this information to make intelligent data replication decisions, increasing data availability and durability.

## EC2 Status checks

* System reachability (Host OS and hardware layer)
* Instance reachability (Guest OS and processes)

## Auto scaling

It's based on a **Launch configuration**, which is similar to the creation of an instance

An **autoscaling group** is based on a _Launch configuration_, and contains details about networking, size, scaling policies, notifications...

* **Scheduled**
  * Scale based on time or day
  * Use case: Turning off your DEV and TEST environment at night.
* **Dynamic**
  * Scaling based on CPU utilization
* **Predictive**
  * Machine learning based scaling

Supports **multiple purchasing options** within the same auto scaling group (ASG). You can include spot, on remand and reserved instances.\
For example on-demand instances for scheduled scaling and spot instances for dynamic scaling.

![](broken-reference)

![](broken-reference)

![](broken-reference)

## Note su Elastic IP

Cambiare l'instance type di una EC2 NON genera un nuovo IP

## EC2 Spot Fleet

* Cost effective
* Multi AZ
* Multi instance type

## EC2

* Durable
* Multi AZ
* Multi instance type
