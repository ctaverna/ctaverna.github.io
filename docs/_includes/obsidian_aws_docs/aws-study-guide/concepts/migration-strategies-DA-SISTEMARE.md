A _migration strategy_ is the approach used to migrate a workload into the AWS Cloud. There are seven migration strategies for moving applications to the cloud, known as the _7 Rs_:

- [Retire](https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#retire)
    
- [Retain](https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#retain)
    
- [Rehost](https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#rehost)
    
- [Relocate](https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#relocate)
    
- [Repurchase](https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#repurchase)
    
- [Replatform](https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#replatform)
    
- [Refactor or re-architect](https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html#refactor)
    

Common strategies for large migrations include rehost, replatform, relocate, and retire. Refactor is not recommended for large migrations because it involves modernizing the application during the migration. This is the most complex of the migration strategies, and it can be complicated to manage for a large number of applications. Instead, we recommend rehosting, relocating, or replatforming the application and then modernizing the application after the migration is complete.

Selecting migration strategies is critical to a large migration. You might have selected migration strategies in the mobilize phase or during the initial portfolio assessment. This section reviews each migration strategy and their common use cases.

## Retire

This is the migration strategy for the applications that you want to decommission or archive. Retiring the application means that you can shut down the servers within that application stack. The following are common use cases for the retire strategy:

- There is no business value in retaining the application or moving it to cloud.
    
- You want to eliminate the cost of maintaining and hosting the application.
    
- You want to reduce the security risks of operating an application that uses an operating system (OS) version or components that are no longer supported.
    
- You might want to retire applications based on their performance. For example, you might want to retire applications that have an average CPU and memory usage below 5 percent, known as _zombie applications_. You might also choose to retire some applications that have an average CPU and memory usage between 5 and 20 percent over a period of 90 days, known as _idle applications_. You can use the utilization and performance data from your discovery tool to identify zombie and idle applications.
    
- There has been no inbound connection to the application for the last 90 days.
    

For more information, see [Best practices for assessing applications to be retired during a migration to the AWS Cloud](https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-retiring-applications/).

## Retain

This is the migration strategy for applications that you want to keep in your source environment or applications that you are not ready to migrate. You might choose to migrate these applications in the future.

The following are common use cases for the retain strategy:

- Security and compliance – You might want to retain applications in order to remain in compliance with data residency requirements.
    
- High risk – You might decide to retain an application because it requires a detailed assessment and plan prior to migration.
    
- Dependencies – You might decide to retain an application if you need to migrate one or more other applications first.
    
- Applications that are recently upgraded – You might want to postpone migrating the application until the next technical refresh because you recently invested in upgrading your current system.
    
- No business value to migrate – There is no business value for migrating some applications to the cloud, such as those with only a few internal users.
    
- Plans to migrate to software as a service (SaaS) – You might choose retain an application until the SaaS version is released by the vendor. This is a common strategy for vendor-based applications.
    
- Unresolved physical dependencies – You might choose to retain an application that is dependent on specialized hardware that does not have a cloud equivalent, such as machines in a manufacturing plant.
    
- Mainframe or mid-range applications and non-x86 Unix applications – These applications require careful assessment and planning before migrating them to the cloud. Examples of mid-range applications include IBM AS/400 and Oracle Solaris.
    
- Performance – You might want to retain applications based on their performance. For example, you might want to keep zombie or idle applications in your source environment.
    

## Rehost

This strategy is also known as _lift and shift_. Using this strategy, you move your applications from your source environment to the AWS Cloud without making any changes to the application. For example, you migrate your application stack from on-premises to the AWS Cloud.

With rehost, you can migrate a large number of machines from multiple source platforms (physical, virtual, or another cloud) to the AWS Cloud without worrying about compatibility, performance disruption, long cutover windows, or long-distance data replications.

Your application continues to serve users while the workloads are being migrated, which minimizes disruption and downtime. The downtime depends on your cutover strategy.

This strategy helps you to scale your applications without implementing any cloud optimizations that could save you time or money. Applications are easier to optimize or re-architect when they are already running in cloud because it is easier to integrate to AWS services and manage your workloads.

You can automate rehosting by using the following services:

- [AWS Application Migration Service](https://aws.amazon.com/application-migration-service/when-to-choose-aws-mgn/)
    
- [AWS Cloud Migration Factory Solution](https://aws.amazon.com/solutions/implementations/aws-cloudendure-migration-factory-solution/)
    
- [VM Import/Export](https://aws.amazon.com/ec2/vm-import/)
    

For a list of migration patterns for the rehost migration strategy, see [Rehost](https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/migration-rehost-pattern-list.html) on the AWS Prescriptive Guidance website.

## Relocate

Using this strategy, you can transfer a large number of servers, comprising one or more applications, at a given time from on-premises platform to a cloud version of the platform. You can also use the relocate strategy to move instances or objects to a different virtual private cloud (VPC), AWS Region, or AWS account. For example, you can use this strategy to transfer servers in bulk from VMware software-defined data center (SSDC) to VMware Cloud on AWS, or you can transfer an Amazon Relational Database Service (Amazon RDS) DB instance to another VPC or AWS account.

The relocate strategy doesn’t require that you purchase new hardware, rewrite applications, or modify your existing operation. During relocation, the application continues to serve users, which minimizes disruption and downtime. Relocate is the quickest way to migrate and operate your workload in the cloud because it does not impact the overall architecture of your application.

For a list of migration patterns for the relocate migration strategy, see [Relocate](https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/migration-relocate-pattern-list.html) on the AWS Prescriptive Guidance website.

## Repurchase

This strategy is also known as _drop and shop_. You replace your application with a different version or product. The new application should provide more business value than the existing, on-premises application, including features such as accessibility from anywhere, no infrastructure to maintain, and pay-as-you-go pricing models. Repurchasing the application typically reduces costs associated with maintenance, infrastructure, and licensing.

The following are common use cases for the repurchase migration strategy:

- Moving from a traditional license to SaaS – This removes the burden of managing and maintaining the infrastructure and helps reduce licensing issues.
    
- Version upgrades or third-party equivalents – By replacing your existing on-premises application with the vendor’s latest version or third-party equivalent in the cloud, you can leverage new features, integrate with cloud services, and scale the application more easily.
    
- Replacing a custom application – You can avoid recoding and re-architecting a custom application by repurchasing a vendor-based SaaS or cloud-based application.
    

Before purchasing, you need to assess the application according to your business requirements, especially security and compliance.

After you purchase the new application, the following are the next steps:

- Training your team and users with the new system
    
- Migrating your data to the newly purchased application
    
- Integrating the application into your authentication services, such as Microsoft Active Directory, to centralize authentication
    
- Configuring networking to help secure communication between the purchased application, your users, and your infrastructure
    

Typically, the application vendor helps you with these activities for a smooth transition.

## Replatform

This strategy is also known as _lift, tinker, and shift_ or _lift and reshape_. Using this migration strategy, you move the application to the cloud, and you introduce some level of optimization in order to operate the application efficiently, to reduce costs, or to take advantage of cloud capabilities. For example, you might replatform a Microsoft SQL Server database to Amazon RDS for SQL Server.

Using this strategy, you might make a few or many changes to the application, depending on your business goals and your target platform.

The following are common use cases for the replatform migration strategy:

- You want to save time and reduce cost by moving to a fully managed service or serverless service in the AWS Cloud.
    
- You want to improve your security and compliance stance by upgrading your operating system to the latest version. By using [End-of-Support Migration Program (EMP) for Windows Server](https://aws.amazon.com/emp-windows-server/), you can migrate your legacy Windows Server applications to the latest, supported versions of Windows Server on AWS, without any code changes. You can use this [decision tree](https://docs.aws.amazon.com/emp/latest/userguide/emp-decision-tree.html) in the _AWS EMP for Windows Server User Guide_ to help you determine your EMP workloads.
    
- You can reduce costs by using [AWS Graviton Processors](https://aws.amazon.com/ec2/graviton/), custom-built processors developed by AWS.
    
- You can reduce costs by moving from a Microsoft Windows operating system to a Linux operating system. You can port your .NET Framework applications to .NET Core, which can run on a Linux operating system. [Porting Assistant for .NET](https://aws.amazon.com/porting-assistant-dotnet/) is an analysis tool that helps you port your applications to Linux.
    
- You can improve performance by migrating virtual machines into containers, without making any code changes. You can modernize your .NET and Java applications into containerized applications by using the [AWS App2Container migration tool](https://aws.amazon.com/app2container/).
    

The replatform strategy keeps your legacy application running without compromising security and compliance.

Replatform reduces cost and improves performance by migrating to a managed or serverless service, moving virtual machines to container, and avoiding licensing expenses.

For a list of migration patterns for the replatform migration strategy, see [Replatform](https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/migration-replatform-pattern-list.html) on the AWS Prescriptive Guidance website.

## Refactor or re-architect

Using this strategy, you move an application to the cloud and modify its architecture by taking full advantage of cloud-native features to improve agility, performance, and scalability. This is driven by strong business demand to scale, accelerate product and feature releases, and to reduce costs.

The following are common use cases for the refactor migration strategy:

- The legacy mainframe application can no longer address the demand of the business due to its limitations or is expensive to maintain.
    
- You have a monolith application that is already hindering efforts to deliver product quickly or address customer needs and demands.
    
- You have a legacy application that nobody knows how to maintain, or the source code is unavailable.
    
- The application is difficult to test, or test coverage is very low. This affects the quality and delivery of new application features and fixes. By redesigning the application for the cloud, you can increase the test coverage and integrate automated testing tools.
    
- For security and compliance reasons, when moving a database to the cloud, you might need to extract some tables (such as customer information, patient, or patient diagnosis tables) and retain those tables on premises. In this situation, you need to refactor your database in order to separate the tables that will be migrated from those that will be retained on premises.
    

For a list of migration patterns for the refactor migration strategy, see [Re-architect](https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/migration-rearchitect-pattern-list.html) on the AWS Prescriptive Guidance website.