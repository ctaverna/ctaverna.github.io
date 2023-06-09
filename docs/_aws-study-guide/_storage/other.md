---
title: "Other storage services"
subtitle: "Services related with storage, like Snowball, Snowmobile, Storage Gateway, AWS Backup..."
is-folder: false
subcategory: storage
sequence: 3
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [AWS Storage Gateway](#aws-storage-gateway)
- [Backup](#backup)
- [FSx](#fsx)
- [GlusterFS](#glusterfs)
- [AWS Snowball](#aws-snowball)
- [AWS Snowball Edge Optimized](#aws-snowball-edge-optimized)
- [AWS Snowmobile](#aws-snowmobile)



# AWS Storage Gateway

Connects an **on-premises software appliance** with cloud-based storage to provide seamless and highly secure integration between your on-premises IT environment and the AWS storage infrastructure.

Nella rete locale offre:

* **File Gateway**: stores in S3 and exposes NFS and SMB
* **Volume Gateway**: provide iSCSI protocol and writes into S3. In AWS you can take EBS snapshots and create EBS volumes
  * Nella modalità **cache**, i dati principali sono scritti su S3, mantenendo in una cache locale di dati a cui si accede spesso per accedervi con bassa latenza.
  * Nella modalità **storage**, i dati principali sono immagazzinati localmente e l'intero gruppo di dati è disponibile per accesso a latenza bassa mentre viene eseguito un backup asincrono su AWS.
* **Tape Gateway:** provide iSCSI virtual tape library (VTL) and stores data in S3 or S3 Glacier

# Backup

* **AWS Backup** can create restore points
* **AWS Data Sync** can be used for cross-region copy

# FSx

Two filesystems to choose:

* **FSx for Windows File Server**: SMB, Windows NTFS, ActiveDirectory (AD) integration, Distributed file system (DFS). High levels of throughput and sub-millisecond latency
* **FSx for Lustre**: fully managed file system that is optimized for high performance computing (HPC), machine learning, and media processing workflows. A single Amazon FSx for Lustre file system can process massive data sets with hundreds of gigabytes (GB) per second of throughput at sub-millisecond latencies. Amazon FSx for Lustre can be integrated with Amazon S3, so you can join long-term data sets with a high performance file system. Data can be automatically copied to and from Amazon S3 from your Amazon FSx for Lustre file system.

# GlusterFS

????????

# AWS Snowball

**AWS Snowball** is a petabyte-scale data transport option.\
All you need to do is create a job in the AWS management console and a Snowball appliance will be shipped to you. Simply attach the appliance into your local network and transfer the files directly onto it. The Snowball will then be shipped back into a secure Amazon facility and transferred into the network.

# AWS Snowball Edge Optimized

**AWS Snowball Edge Optimized** is ideal for edge processing usage cases that require additional computing power in remote, disconnected, or harsh environments. This service provides 52 vCPUs, 208 GB of memory, 7.68TB of NVMe SSD, and 42 TB of S3-compatible storage. Typical usage scenarios include advanced machine learning and full-motion video analysis in disconnected environments.

# AWS Snowmobile

**AWS Snowmobile** is an even larger data transfer option that operates in exabyte-scale. It should only be used to move extremely large amounts of data into AWS. A Snowmobile is 45-foot-long ruggedized shipping container that is pulled by a semi-trailer truck. You can transfer 100 PB per Snowmobile. ©
