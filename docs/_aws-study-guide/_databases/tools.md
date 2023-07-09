---
title: "Database tools"
subtitle: "Tools related with data migrations between different databases"
is-folder: false
subcategory: "databases"
sequence: 4
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [AWS Database Migration Service (DMS)](#aws-database-migration-service-dms)
    - [**How it works**](#how-it-works)
- [AWS Schema Conversion Tool](#aws-schema-conversion-tool)


## AWS Database Migration Service (DMS)

AWS DMS supports migration between the most widely used databases (Oracle, PostgreSQL, Microsoft SQL Server, Amazon Redshift, Amazon Aurora, MariaDB, and MySQL).

* It supports homogenous (same engine) and heterogeneous (different engines) migrations.
* The service can be used to migrate between databases on Amazon EC2, Amazon RDS and on-premises.
* Either the target or the source database must be located in Amazon EC2 (cannot migrate between two on-premises databases).
* Options:
  * One-time migration
  * Ongoing migration

When migrating is unfeasible because database is too large, connection is too slow or for privacy and security concerns, use **AWS snowball edge.**

#### **How it works**

* Create a **replication server**
* Create **source and target endpoints** that have connection information about your data stores
* Create one or more **tasks** to migrate data between the source and target data stores

****

## AWS Schema Conversion Tool

The AWS Schema Conversion Tool makes database **heterogeneous migrations** predictable by automatically converting the source database schema and a majority of the database code objects, including views, stored procedures, and functions, to a format compatible with the target database.\
It is a **downloadable software**, not a service.
