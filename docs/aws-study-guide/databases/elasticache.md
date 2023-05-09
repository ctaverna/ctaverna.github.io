---
title: "ElastiCache"
subtitle: "cccccc"
category: "notes-aws"
subcategory: "databases"
sequence: 3
is-folder: false
---

# ElastiCache

## Caching Strategies

A _cache hit_ occurs when the cache contains the information requested.\
A _cache miss_ occurs when the cache does not contain the information requested.

### Lazy loading

It's a caching strategy that loads data into the cache **only when necessary**.\
When your application requests data, it first makes the request to the cache. If the data exists in the cache (a cache hit), it is retrieved; but if it does not or has expired (a cache miss), then the data is retrieved from your data store and then stored in the cache.

* **Advantage:** only the requested data is cached
* **Disadvantage:** is that there is a **cache miss penalty**_._

### Write through

It's a strategy that adds/updetes data or in the cache whenever data is written to the database.

* **Advantage:** data in the cache is **never stale**.
* **Disadvantages**:
  * **write penalty** because every write involves two trips (cache and database)
  * **cost** because there can be data that is stored but never used
  * if data is updated frequently will cause **cache churn**

## Redis vs MemCached

### Redis

Redis is an increasingly popular open-source, key-value store that supports more **advanced data structures**, such as sorted sets, hashes, and lists. Unlike Memcached, Redis has **disk persistence built in**, meaning that you can use it for long-lived data. Redis also supports **replication**, which can be used to achieve Multi-AZ redundancy.&#x20;

### Memcached&#x20;

It's a widely adopted in-memory key store. It is historically the gold standard of web caching. ElastiCache is protocol-compliant with Memcached, and it is designed to work with popular tools that you use today with existing Memcached environments. Memcached is also **multithreaded**, meaning that it makes good use of larger Amazon EC2 instance sizes with multiple cores.

| Feature                    | MemCached | Redis |
| -------------------------- | :-------: | :---: |
| Horizontal scalability     |     X     |       |
| Multi thread               |     X     |       |
| Advanced data types        |           |   X   |
| Sort/rank data sets        |           |   X   |
| Pub/Sub capabilities       |           |   X   |
| MultiAZ with auto failover |           |   X   |
| Backup and restore         |           |   X   |

