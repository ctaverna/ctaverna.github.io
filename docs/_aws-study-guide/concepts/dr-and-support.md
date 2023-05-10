---
title: "DR & Support"
subtitle: "Disaster recovery and support concepts"
is-folder: false
subcategory: "concepts"
sequence: 4
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [Support](#support)
- [RPO and RTO](#rpo-and-rto)
  - [Recovery Point Objective (RPO)](#recovery-point-objective-rpo)
  - [Recovery Time Objective (RTO)](#recovery-time-objective-rto)
- [_Common practices_](#common-practices)
  - [Backup and Restore](#backup-and-restore)
  - [Pilot Light](#pilot-light)
  - [Full working Low-Capacity Standby](#full-working-low-capacity-standby)
  - [Multi-site Active-Active](#multi-site-active-active)


## Support

Developer support plan NON ha delle API



## RPO and RTO

### Recovery Point Objective \(RPO\)

**How often** data need to be backed up

Example_: The business can recover from losing \(at most\) the last 12 hours of data_

### Recovery Time Objective \(RTO\)

**How long** can the application be unavailable

Example_: The application can be unavailable for a maximum of 1 hour_

## _Common practices_

From Lower to Higher:

### Backup and Restore

_Low priority use case - Cost $_

### Pilot Light

**Replicated core dataset**, ready to be used by a replacement system, generated in case of DR and pointed by DNS.

_Lower RTO and RPO requirements - Cost $$_

### Full working Low-Capacity Standby

It's a **full working, low capacity environment**, fully functional.  
In case of DR it's a warm solution that simply needs to be scaled up.  
If the primary environment is unavailable, Route 53 switches over to the secondary system.

_RTO and RPO in minutes - Cost $$$_

### Multi-site Active-Active

Two production environments, balanced by DNS weighted

_Auto failover- Cost $$$$_

