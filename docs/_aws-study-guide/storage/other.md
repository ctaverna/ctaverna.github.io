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
- [AWS Snowball](#aws-snowball)
- [AWS Snowball Edge Optimized](#aws-snowball-edge-optimized)
- [AWS Snowmobile](#aws-snowmobile)



# AWS Storage Gateway

Connects an **on-premises software appliance** with cloud-based storage to provide seamless and highly secure integration between your on-premises IT environment and the AWS storage infrastructure.

* **File Gateway**: stores in S3 and exposes NFS and SMB
* **Volume Gateway**: provide iSCSI protocol and writes into S3. In AWS you can take EBS snapshots and create EBS volumes
  * **Cache mode:**  
  Data is written locally in order to have a faster access and reduce traffic
  * **Storage:**  
  Data is saved locally, and the entire dataset is asynchronously backupped to AWS.
* **Tape Gateway:**  
Provide iSCSI virtual tape library (VTL) and stores data in S3 or S3 Glacier

# Backup

* **AWS Backup** can create restore points
* **AWS Data Sync** can be used for cross-region copy

# FSx

- **Amazon File Cache:** a high-speed cache on AWS that makes it easier to process file data, regardless of where the data is stored. It serves data in the cache at consistent high speeds with sub-millisecond latency to applications running on AWS—up to hundreds of GB/s of throughput, and up to millions of operations per second. Automatically loads data into the cache when it’s accessed for the first time and releases data when it’s not used.
- **FSx for Windows File Server**: SMB, Windows NTFS, ActiveDirectory (AD) integration, Distributed file system (DFS). High levels of throughput and sub-millisecond latency
- **FSx for Lustre**: fully managed file system that is optimized for high performance computing (HPC), machine learning, and media processing workflows. Ccan process hundreds of GB per second of throughput at sub-millisecond latencies. Amazon FSx for Lustre can be integrated with Amazon S3, so you can join long-term data sets with a high performance file system. Data can be automatically copied to and from Amazon S3 from your Amazon FSx for Lustre file system.
- **NetApp ONTAP**
- **OpenZFS**

# AWS Snowball

**AWS Snowball** is a petabyte-scale data transport option.\
All you need to do is create a job in the AWS management console and a Snowball appliance will be shipped to you. Simply attach the appliance into your local network and transfer the files directly onto it. The Snowball will then be shipped back into a secure Amazon facility and transferred into the network.

# AWS Snowball Edge Optimized

**AWS Snowball Edge Optimized** is ideal for edge processing usage cases that require additional computing power in remote, disconnected, or harsh environments. This service provides 52 vCPUs, 208 GB of memory, 7.68TB of NVMe SSD, and 42 TB of S3-compatible storage. Typical usage scenarios include advanced machine learning and full-motion video analysis in disconnected environments.

# AWS Snowmobile

**AWS Snowmobile** is an even larger data transfer option that operates in exabyte-scale. It should only be used to move extremely large amounts of data into AWS. A Snowmobile is 45-foot-long ruggedized shipping container that is pulled by a semi-trailer truck. You can transfer 100 PB per Snowmobile. ©
