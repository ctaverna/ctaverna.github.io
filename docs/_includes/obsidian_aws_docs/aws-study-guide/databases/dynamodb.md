- [Amazon DynamoDB](#amazon-dynamodb)
	- [Read data](#read-data)
		- [Query](#query)
		- [Scan](#scan)
		- [Consistency](#consistency)
			- [Eventually Consistent Read (default)](#eventually-consistent-read-default)
			- [Strongly Consistent Reads](#strongly-consistent-reads)
	- [Throughput capacity (Write/Read Request Units)](#throughput-capacity-writeread-request-units)
	- [Secondary index](#secondary-index)
	- [Data types](#data-types)
	- [DynamoDB Streams](#dynamodb-streams)
	- [Other concepts](#other-concepts)
		- [Cross-Region Replication](#cross-region-replication)
		- [Auto scaling](#auto-scaling)
		- [Burst capacity](#burst-capacity)
		- [Optimistic locking](#optimistic-locking)
	- [DynamoDB Accelerator (DAX)](#dynamodb-accelerator-dax)

![service-logo](/assets/img/aws-icons/Arch_Amazon-DynamoDB_64.png)
# Amazon DynamoDB
Managed NoSQL, fault tolerant, multi AZ, can scale up/down with no downtime

* **Table**: collection of items
* **Item**: collection of attributes
* **Attribute**: key-value pair (can be nested up to 32 levels)
* **Primary KEY** (input to internal has function)
  * Partition KEY
  * Sort KEY (optional)

**Authentication** is performed using **IAM User**, **IAM Role** or Account root user

**Authorization** is made using **identity-based policies**

****

* A **global table** is a collection of one or more DynamoDB tables, all owned by a single AWS account, identified as replica tables.
  * Any given global table can only have one replica table per region
* A **replica table** (or replica, for short) is a single DynamoDB table that functions as a part of a global table.
  * Each replica has the same table name and the same primary key schema.

Amazon DynamoDB global tables provide a fully managed solution for deploying a multi-region, multi-master database, without having to build and maintain your own replication solution. When you create a global table, you specify the AWS regions where you want the table to be available. DynamoDB performs all of the necessary tasks to create identical tables in these regions, and propagate ongoing data changes to all of them.

## Read data
It is possible to read from **tables or indexes** in the same way, using a _Query_ or a _Scan._

### Query
To perform a query command, you must specify a **primary key** (at a minimum).\
If you query an index you must specify both TableName and IndexName.

### Scan
The Scan operation returns one or more items and item attributes by accessing **every item** in a table or a secondary index.

If the total number of scanned items exceeds the maximum dataset size limit of **1 MB**:

* the scan stops
* together with results, it is added a _LastEvaluatedKey_ value to continue the scan in a subsequent operation, and the number of _items exceeding_ the limit

### Consistency

#### Eventually Consistent Read (default)
When you read data from a DynamoDB table, the response might not reflect the results of a recently completed write operation. The response might include some stale data. If you repeat your read request after a short time, the response should return the latest data.\
_DynamoDB uses eventually consistent reads, unless you specify otherwise._

#### Strongly Consistent Reads
When you request a strongly consistent read, DynamoDB returns a response with the most up-to-date data, reflecting the updates from all prior write operations that were successful. A strongly consistent read might not be available if there is a network delay or outage.

## Throughput capacity (Write/Read Request Units)

| Operation | Capacity unit | Speed                                  | Max size                 |
| --------- | ------------- | -------------------------------------- | ------------------------ |
| Write     | **1** WRU     | **1** write/sec                        | < **1** KB (item)        |
| Write     | **2** WRU     | **1** transactional write              | < 100 items / 4 MB       |
| Read      | **1** RRU     | **1** read/sec (strongly consistent)   | < **4** KB (item) (item) |
| Read      | **1.5** RRU   | **1** read/sec (eventually consistent) | < **4** KB (item)        |
| Read      | **2** RRU     | **1** transactional write              | < 100 items / 4 MB       |

* RCUs and WCUs across partitions **evenly.**\
	_Example: if you have 1,000 RCUs and 10 partitions -> 100 RCUs allocated to each partition._

## Secondary index
When you create an index, you define an **alternate key** (partition key and sort key) for the index. You also define the **attributes** that you want to **project** from the base table into the index.

You can Query or Scan the index like a table.

* **Global secondary index**
  * partition key and sort key can be different from base table
  * can be created in any moment
* **Local secondary index**
  * has the _same partition key_ as the base table but _a different sort key_
  * _sort key_ does **not need to be unique,** so will be returned **all items,** unorder
  * can only be created at **table creation** time

## Data types

* **Scalar**\
	number, string, binary, Boolean, and null
* **Document**
  * **List** (ordered collection of values.)\
    `MyFavoriteThings: ["Thriller", "Purple Rain", 1983, 2]`
  * **Map** (unordered collection of name/value pairs)\
    `{ Location: "Labrynth", MagicStaff: 1, MagicRings: [ "The One Ring", { ElevenKings: { Quantity : 3}, DwarfLords: { Quantity : 7}, MortalMen: { Quantity : 9} } ] }`&#x20;

****

## DynamoDB Streams
It is a time-ordered flow of information of item-level modifications (create, update, or delete) to items in a DynamoDB table.

* Each stream record appears **exactly once** in the stream
* The stream records appear **in the same sequence** as the actual modifications to the item

Available stream types:\
\- **KEYS\_ONLY** Only the key attributes of the modified item\
\- **NEW\_IMAGE** The entire item as it appears after it was modified\
\- **OLD\_IMAGE** The entire item as it appeared before it was modified\
\- **NEW\_AND\_OLD\_IMAGES** Both the new and the old images of the item

## Other concepts

### Cross-Region Replication
You can create tables that automatically replicate across two or more AWS Regions with full support for **multi-master writes**.

Using cross-region replication, you can build fast, massively scaled applications for a global user base without having to manage the replication process.

### Auto scaling
It is possible to create a scaling policy for a table or a global secondary index.\
DynamoDB automatic scaling modifies provisioned throughput settings only when the actual workload stays elevated or depressed for a sustained period of **several minutes**.

### Burst capacity
DynamoDB currently retains up to 5 minutes (300 seconds) of unused read and write capacity.\
During an occasional burst of read or write activity, these extra capacity units **can** be consumed quickly, even faster than the per-second provisioned throughput capacity that you have defined for your table.

However, **do not rely** on burst capacity being available at all times.

### Optimistic locking
Each item has an attribute that acts as a version number.

* If you retrieve an item from a table, the application records the version number of that item
* You can update the item, but only if the version number on the server side has not changed
* If there is a version mismatch, then someone else has modified the item before you did, and the update attempt fails because you have an outdated version of the item.

To disable optimistic locking, change the Amazon DynamoDBMapperConfig.SaveBehavior enumeration value from UPDATE to CLOBBER.

> DynamoDB **global tables** use a **“last writer wins” reconciliation** between concurrent updates. If you use Global Tables, last writer policy wins. In this case, the locking strategy does not work as expected.

## DynamoDB Accelerator (DAX)
Fully managed, highly available, **in-memory cache** for DynamoDB that delivers up to 10 times the performance improvement—from milliseconds to microseconds—even at millions of requests per second.

DAX does all of the heavy lifting required to add in-memory acceleration to your DynamoDB tables, without requiring developers to manage cache invalidation, data population, or cluster management.

* **Performance**: single digit ms latency
* **Highly scalable**: start with 3 nodes up to 10
* **Flexible**: one cluster for multiple tables, multiple clusters for a single table
* Integrated with IAM
* Compatible with existing DynamoDB API calls
* Enable DAX with a few clicks in the Console or by using the AWS SDK
