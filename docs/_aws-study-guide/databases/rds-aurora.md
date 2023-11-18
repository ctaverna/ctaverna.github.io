---
title: "RDS + Aurora"
subtitle: "Relational Database Service"
is-folder: false
subcategory: "databases"
sequence: 1
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [Multi-AZ deployments _(Global Databases)_](#multi-az-deployments-global-databases)
- [Encryption](#encryption)
  - [Encryption at rest](#encryption-at-rest)
  - [Encryption in transit](#encryption-in-transit)
- [Database Backup](#database-backup)
  - [Automated Backups (Point-in-Time) ](#automated-backups-point-in-time-)
  - [Database Snapshots (Manual)](#database-snapshots-manual)


**Amazon Relational Database Service** (Amazon RDS) is a collection of managed services to set up, operate, and scale databases in the cloud.  
Choose from seven popular engines:
- Amazon Aurora with MySQL compatibility
- Amazon Aurora with PostgreSQL compatibility
- MySQL
- MariaDB
- PostgreSQL
- Oracle
- SQL Server 

**Amazon Aurora** is a relational database management system (RDBMS) built for the cloud with full MySQL and PostgreSQL compatibility.  
Aurora gives you the performance and availability of commercial-grade databases at one-tenth the cost.

* **Storage** can be **increased** with **no downtime**.
* **Changing instance type** requires **downtime**.

## Multi-AZ deployments _(Global Databases)_

In this scenario you have a **primary** and a **standby** DB instance.\
Updates to the primary database replicated **synchronously** to the standby replica in a different Availability Zone.

RDS **automatically fails over** to the standby so that you can resume your workload as soon as the standby is promoted to the primary. This means that you can reduce your downtime in the event of a failure.\


## Encryption

### Encryption at rest
* RDS uses the AWS KMS for AES-256 encryption
* Must be configured when the DB instance is **created.**
* You **cannot modify** a database to enable encryption, but you can create a snapshot and restore to an encrypted DB instance or cluster.
* Some RDS instance types are not supported for encryption at rest

### Encryption in transit
RDS generates **an SSL certificate for each database instance** that can be used to connect your application and the Amazon RDS instance.  
However, encryption is a compute-intensive operation that increases the latency of your database connection.

## Database Backup

### Automated Backups (Point-in-Time)&#x20;

* Full **daily snapshot** of your data during your preferred backup window, followed by **transaction logs** of all changes made to the database.&#x20;
* During a point-in-time recovery, the transaction logs are applied to the most appropriate daily backup, up to the specific second
* The default retention period is **7 days**, but it can be a maximum of up to **35 days**.
* Automated backups are kept until the source database is deleted.

### Database Snapshots (Manual)

* It is a **user-initiated** backup that can be taken **at any time**. You can also restore to that specific snapshot at any time.
* Snapshots are kept **until explicitly deleted**
* Storage I/O may be briefly suspended (typically a few seconds) while the backup process initializes, and you may experience **a brief period of elevated latency**.\
  To avoid these types of suspensions it can be used a Multi-AZ configuration, taking the backup from the standby instead of the primary database.

