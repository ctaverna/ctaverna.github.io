---
title: "DR & Support"
subtitle: "Disaster recovery and support concepts"
is-folder: false
subcategory: concepts
sequence: 4
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [RPO and RTO](#rpo-and-rto)
  - [Recovery Point Objective *(RPO)*](#recovery-point-objective-rpo)
  - [Recovery Time Objective *(RTO)*](#recovery-time-objective-rto)
- [Common practices](#common-practices)
  - [Backup and Restore](#backup-and-restore)
  - [Pilot Light](#pilot-light)
  - [Full working Low-Capacity Standby](#full-working-low-capacity-standby)
  - [Multi-site Active-Active](#multi-site-active-active)



## RPO and RTO

### Recovery Point Objective *(RPO)*

**How often** data needs to be backed up

Example: *The business can recover from losing (at most) the last 12 hours of data*

### Recovery Time Objective *(RTO)*

**How long** the application can be unavailable

Example: *The application can be unavailable for a maximum of 1 hour*

## Common practices

There are different possible approaches, from lower to higher priority (and cost):

### Backup and Restore
This is the basic ability to manually restore a non-critical system.
> WHEN: Low priority use cases

### Pilot Light
**Replicated core dataset**, ready to be used by a replacement system, generated in case of DR and pointed by DNS.  
> WHEN: For lower RTO and RPO requirements

### Full working Low-Capacity Standby
It's a **full working, low capacity environment**, fully functional.  
In case of DR it's a warm solution that simply needs to be scaled up.  
If the primary environment is unavailable, Route 53 switches over to the secondary system.
> WHEN: When RTO and RPO need to be expressed in minutes


### Multi-site Active-Active
Two production environments, balanced by DNS weighted
> WHEN: When auto failover is needed


