---
title: "RDS + Aurora"
subtitle: "Relational Database Service"
is-folder: false
subcategory: "databases"
sequence: 1
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [Storage](#storage)
  - [Based on EBS](#based-on-ebs)
  - [Shared cluster storage](#shared-cluster-storage)
- [Multi-AZ deployments _(Global Databases)_](#multi-az-deployments-global-databases)
  - [RDS](#rds)
  - [Aurora](#aurora)
- [Encryption](#encryption)
  - [Encryption at rest](#encryption-at-rest)
  - [Encryption in transit](#encryption-in-transit)
- [Database Backup](#database-backup)
  - [Automatic backups (Point-in-Time)](#automatic-backups-point-in-time)
  - [Database Snapshots (Manual)](#database-snapshots-manual)
  - [AWS Backup service](#aws-backup-service)
- [Backtrack](#backtrack)


**Amazon Relational Database Service** (Amazon RDS) is a collection of managed services to set up, operate, and scale databases in the cloud.  
Choose from seven popular engines: 
- Amazon Aurora with MySQL compatibility
- Amazon Aurora with PostgreSQL compatibility
- MySQL
- MariaDB
- PostgreSQL
- Oracle
- SQLServer 

**Amazon Aurora** is a relational database management system (RDBMS) built for the cloud with full MySQL and PostgreSQL compatibility.  
Aurora gives you the performance and availability of commercial-grade databases at one-tenth the cost.

## Storage

**Storage autoscaling** is the feature (can be enabled or disabled) to handle automatically the size increase.

### Based on EBS
For MySQL, MariaDB, PostgreSQL, Oracle and SQLServer 
- **General purpose SSD Storage**  
Single digit ms latency (20GiB-64Tib)
- **Provisioned IOPS SSD Storage**  
Very high I/O 8K-80K IOPS  (100GiB-64Tib)
- **Magnetic Storage**  
Just for compatibility

### Shared cluster storage
For Amazon Aurora

- **Managed by the service itself**  
The storage will scale automatically as the DB grows.

---
As a general behaviour:
* **Storage** can be **increased** with **no downtime**.
* **Changing instance type** requires **downtime**.

## Multi-AZ deployments _(Global Databases)_

### RDS
In this scenario you have a **primary instance** and a **standby replica** DB instance.  
Updates to the primary database are replicated **synchronously** to the standby replica in a different Availability Zone.

RDS **automatically fails over** to the standby so that you can resume your workload as soon as the standby is promoted to the primary. This means that you can reduce your downtime in the event of a failure.  
The purpose is **ONLY** to provide a **failover** option. 

RDS usually updates the DNS records to the 2nd instance in **60-120 seconds**.  
Common scenarios when the failover is applied:
- Host failure
- AZ failure
- Patching (maintenance)
- Reboot
- DB instance class is changed

**Read replicas** are available for MySQL, MariaDB and PostgreSQL.  
Can be created in **different AZs**, but also in **different regions**.  
Can be used to improve performance, but are NOT USED as a failover in case of failures.  
Anyway, it's possible to manually promote a Read Replica to master in case of an incident.


### Aurora 
Aurora is fault tolerant by default, with copies of the data in multiple AZs.  
In case of failure, the creation of a new primary instance **can take up to 10 minutes**.  

Using a **Read Replica** is much faster, leveraging the **promotion** of a **read replica** to **master**.  
In addition to that the read replica nodes (up to 15) 

## Encryption

### Encryption at rest

* RDS uses the **AWS KMS** for AES-256 encryption
* Must be configured when the DB instance is **created.**
* You **cannot modify** a database to enable encryption, but you can create a snapshot and restore to an encrypted DB instance or cluster.
* Some RDS instance types are not supported for encryption at rest

### Encryption in transit

&#x20;RDS generates **an SSL certificate for each database instance** that can be used to connect your application and the Amazon RDS instance.

However, encryption is a compute-intensive operation that increases the latency of your database connection.

## Database Backup

### Automatic backups (Point-in-Time)

* Full **daily snapshot** of your data during your preferred backup window, followed by **transaction logs** of all changes made to the database.
* During a point-in-time recovery, the transaction logs are applied to the most appropriate daily backup, up to the specific second
* The default retention period is **7 days**, but the value can be **0 to 35 days**.
* Automated backups are kept until the source database is deleted.  
* The backup window is configurable (when starting, for a few seconds the storage I/O might be stopped)
* With a Multi-AZ database, the backup will use the standby instance, with no effects on master.
* If you delete an instance, you can choose to **keep** or **delete** the snapshots, but even if you keep them, they **will expire** in any case. In this case is better to perform a manual snapshot, that will be retained. 

### Database Snapshots (Manual)

* It is a **user-initiated** backup that can be taken **at any time**
* Snapshots are kept **until explicitly deleted**
* Storage I/O may be briefly suspended (typically a few seconds) while the backup process initializes, and you may experience **a brief period of elevated latency**
* To avoid these types of suspensions it can be used a Multi-AZ configuration, taking the backup from the standby instead of the primary database.

### AWS Backup service


## Backtrack
With **Aurora** it is possible to rewind a cluster to a specific PIT, without backup&restore.  
The parameter **target backtrack window** is the retention time window of availability of this option (up to 72 hours).