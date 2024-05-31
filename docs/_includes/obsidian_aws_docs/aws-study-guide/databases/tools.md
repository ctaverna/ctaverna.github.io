- [AWS DMS](#aws-dms)
	- [How it works](#how-it-works)
	- [AWS Schema Conversion Tool](#aws-schema-conversion-tool)


![service-logo](/assets/img/aws-icons/Arch_AWS-Database-Migration-Service_64.png)
# AWS DMS
**Database Migration Service** supports migration between the most widely used databases (Oracle, PostgreSQL, Microsoft SQL Server, Amazon Redshift, Amazon Aurora, MariaDB, and MySQL).

* It supports homogenous (same engine) and heterogeneous (different engines) migrations.
* The service can be used to migrate between databases on Amazon EC2, Amazon RDS and on-premises.
* Either the target or the source database must be located in Amazon EC2 (cannot migrate between two on-premises databases).
* Options:
	* One-time migration
	* Ongoing migration

When migrating is unfeasible because database is too large, connection is too slow or for privacy and security concerns, use **AWS snowball edge.**

## How it works

* Create a **replication server**
* Create **source and target endpoints** that have connection information about your data stores
* Create one or more **tasks** to migrate data between the source and target data stores

## AWS Schema Conversion Tool

The AWS Schema Conversion Tool makes database **heterogeneous migrations** predictable by automatically converting the source database schema and a majority of the database code objects, including views, stored procedures, and functions, to a format compatible with the target database.\
It is a **downloadable software**, not a service.
