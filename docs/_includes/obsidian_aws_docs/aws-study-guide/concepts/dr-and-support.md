- [RPO and RTO](#rpo-and-rto)
	- [Recovery Point Objective *(RPO)*](#recovery-point-objective-rpo)
	- [Recovery Time Objective *(RTO)*](#recovery-time-objective-rto)
- [Common practices](#common-practices)
	- [Backup and Restore](#backup-and-restore)
	- [Pilot Light](#pilot-light)
	- [Full working Low-Capacity Standby](#full-working-low-capacity-standby)
	- [Multi-site Active-Active](#multi-site-active-active)

# RPO and RTO

## Recovery Point Objective *(RPO)*
**How often** data needs to be backed up
> Example: *The business can recover from losing (at most) the last 12 hours of data*

## Recovery Time Objective *(RTO)*
**How long** the application can be unavailable
> Example: *The application can be unavailable for a maximum of 1 hour*

# Common practices
There are different possible approaches, from lower to higher priority (and cost):

## Backup and Restore
This is the basic ability to manually restore a non-critical system.
> WHEN: Low priority use cases

## Pilot Light
**Replicated core dataset**, ready to be used by a replacement system, generated in case of DR and pointed by DNS.  
> WHEN: For lower RTO and RPO requirements

## Full working Low-Capacity Standby
It's a **full working, low capacity environment**, fully functional.  
In case of DR it's a warm solution that simply needs to be scaled up.  
If the primary environment is unavailable, Route 53 switches over to the secondary system.
> WHEN: When RTO and RPO need to be expressed in minutes

## Multi-site Active-Active
Two production environments, balanced by DNS weighted
> WHEN: When auto failover is needed


# Categorizing workloads
To avoid administrative overhead and inefficiencies, it's a best practice to categorize workloads into tiered groups that have similar disaster recovery requirements. By creating these tiered workload groups, you can implement fewer and more standardized disaster recovery processes at the group level.

Example:

- **Tier 1**

	Tier 1 workloads are the most critical. Failures prevent your organization from functioning. For example, Windows domain controllers are typically considered tier 1 workloads.
	**Recovery objectives:**
	- RTO: 10 minutes or less
	- RPO: 10 minutes or less

- **Tier 2**

	Tier 2 workloads are important but not critical for short periods of time. Failures prevent significant parts of your organization from functioning. For example, customer enterprise resource planning (ERP) systems are typically considered tier 2 workloads.
	**Recovery objectives:**
	- RTO: 1 hour or less
	- RPO: 1 hour or less

- **Tier 3**

	Tier 3 workloads are standard systems. Failures prevent smaller, individual parts of your organization from working effectively. For example, divisional file servers are typically considered tier 3 workloads.
	**Recovery objectives:**
	- RTO: 8 hours or less
	- RPO: 4 hours or less

- **Tier 4**

	Tier 4 workloads are noncritical systems. Failures impact a small number of users in a way that doesn't prevent the organization from functioning. For example, staff training portals are typically considered tier 4 workloads.
	**Recovery objectives:**
	- RTO: 48 hours or less
	- RPO: 48 hours or less