---
title: "EBS/EFS"
subtitle: "Elastic Block Store / Elastic File System"
is-folder: false
subcategory: storage
sequence: 2
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [Instance Storage](#instance-storage)
- [EBS](#ebs)
  - [Point-in-time EBS Snapshots](#point-in-time-ebs-snapshots)
  - [RAID](#raid)
    - [EBS Volume Status checks](#ebs-volume-status-checks)
  - [EBS Types](#ebs-types)
    - [EBS General purpose SSD](#ebs-general-purpose-ssd)
    - [EBS Provisioned IOPS SSD](#ebs-provisioned-iops-ssd)
    - [EBS Throughput Optimized HDD](#ebs-throughput-optimized-hdd)
    - [EBS Cold HDD](#ebs-cold-hdd)
    - [EBS Standard HDD (Legacy)](#ebs-standard-hdd-legacy)
- [EFS](#efs)
  - [EFS Types](#efs-types)
    - [General purpose performance mode](#general-purpose-performance-mode)
    - [MaxIO performance mode](#maxio-performance-mode)

# Instance Storage

It's a disk physically connected to the host.

The data is **lost** whenever you **stop** or **terminate** the instance, but **persists** if the instance **reboots.**

* Scope: **server** ()
* **Not persistent**
* **Low** latency
* **High** IOPS

Suggested for cache, buffers, scratch data and other temporary data.

# EBS

EBS volumes are automatically replicated in the **same AZ** of the EC2.

EBS volumes can be **encrypted**.

* Scope: **AZ**
* Availability **5** 9s
* Durability **.1**% to **.2**%

## Point-in-time EBS Snapshots

To increase durability you can use PIT Snapshots, that are replicated across **multiple AZs** in the region. These sanpshots can be used to **create new volumes**.

If there’s an accidental delete or other application error, snapshots enable you to recover your data.

* Scope: **Region** (S3)
* Availability **4** 9s (S3)
* Durability **11** 9s (S3)
* To increase resilience = custom solution multi backup, multi region, multi account

## RAID

EBS Striped volume = Raid 0\
EBS Mirror = Raid 1

### EBS Volume Status checks

* Any volume type
  * ok
  * warning
  * impaired
  * insufficient data
* Provisioned IOPS SSD
  * Normal
  * Degraded
  * Stalled
  * Insufficient data



## EBS Types

### EBS General purpose SSD

Balance price and performance, recommended for most workloads.

* Up to **16.000** IOPS
* Up to **128-250** MiB/s
* Dependent on size

### EBS Provisioned IOPS SSD

Highest performance, for mission-critical low-latency or high throughput workloads (large databases).

* Up to **64.000** IOPS ++++
* Up to **1000** MiB/s +++
* Dependent on size

### EBS Throughput Optimized HDD

Low cost designed for frequently accesses, throughput-intensive workloads (streaming, big data, data warehouses, log processing...)\
It can't be a boot volume.

* Up to **500** MiB/s
* Dependent on size

### EBS Cold HDD

Lowest cost, designed for less frequently accesses workloads (when lower storage cost is important)

* Up to **250** MiB/s
* Dependent on size

### EBS Standard HDD (Legacy)

* Low IOPS
* Up to **90** MiB/s
* Independent of size

![](broken-reference)

# EFS

Simple, scalable elastic file system for linux that can be mounted **concurrently** through NFSv4.

* Scope: **Region**
* Availability: **3** 9s ---> Lower availability than EBS
* Durability: **11** 9s ---> Higher durability than EBS
* Replicato in modo sincrono in due istanze nella AZ
* Up to **3GB**/s throughput (in some regions is 1GB/s)
* 250MB/s per client
* Latency: unpublished but can be 1ms

Tenere d'occhio la metrica di **BurstIO**, se scende a zero per un alto numero di client ci sarà un crollo delle prestazioni.

## EFS Types

### General purpose performance mode

* **7000** IOPS
* **Lowest** metadata latency

### MaxIO performance mode

* **500.000+** IOPS
* **Highest** metadata latency

