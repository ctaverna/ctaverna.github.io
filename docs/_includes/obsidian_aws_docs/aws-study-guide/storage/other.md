- [AWS Storage Gateway](#aws-storage-gateway)
- [AWS Backup](#aws-backup)
- [AWS DataSync](#aws-datasync)
- [Amazon FSx](#amazon-fsx)
- [Amazon FSx for WFS](#amazon-fsx-for-wfs)
- [Amazon FSx for Lustre](#amazon-fsx-for-lustre)
- [AWS Snowball](#aws-snowball)
- [AWS Snowball Edge](#aws-snowball-edge)
- [AWS Snowmobile](#aws-snowmobile)


![service-logo](/assets/img/aws-icons/Arch_AWS-Storage-Gateway_64.png)
# AWS Storage Gateway

Connects an **on-premises software appliance** with cloud-based storage to provide seamless and highly secure integration between your on-premises IT environment and the AWS storage infrastructure.

* **File Gateway**: stores in S3 and exposes NFS and SMB
* **Volume Gateway**: provide iSCSI protocol and writes into S3. In AWS you can take EBS snapshots and create EBS volumes
  * **Cache mode:**  
  Data is written locally in order to have a faster access and reduce traffic
  * **Storage:**  
  Data is saved locally, and the entire dataset is asynchronously backupped to AWS.
* **Tape Gateway:**  
Provide iSCSI virtual tape library (VTL) and stores data in S3 or S3 Glacier

![service-logo](/assets/img/aws-icons/Arch_AWS-Backup_64.png)
# AWS Backup
Backup service that makes it easy to centralize and automate both backup of cloud AWS services and on premises resources.

**Centralized backup management**
You can centrally manage backup policies that meet your backup requirements.

**Policy-based backup**
You can create backup policies known as _backup plans_, to define your backup requirements and then apply them to the AWS resources that you want to protect. 
You can create separate backup plans that each meet specific business and regulatory compliance requirements. This helps ensure that each AWS resource is backed up according to your requirements. 

**Tag-based backup policies**
You can use AWS Backup to apply backup plans to your AWS resources in a wide variety of ways, including tagging them. 

**Lifecycle management policies**
You can configure lifecycle policies that automatically transition backups from warm storage to cold storage according to a schedule that you define.

**Cross-Region backup**
You can copy backups to multiple different AWS Regions on demand or automatically as part of a scheduled backup plan. Cross-Region backup is particularly valuable if you have business continuity or compliance requirements to store backups a minimum distance away from your production data.

**Cross-account management and cross-account backup**
You can manage your backups across all AWS accounts inside your AWS Organizations structure. 
- Apply backup plans across the AWS accounts within your organization
- Makes compliance and data protection efficient at scale
- Reduces operational overhead
- Helps eliminate manually duplicating backup plans across individual accounts

You can also **copy backups** to multiple different AWS accounts inside your AWS Organizations management structure.
This way, you can "fan in" backups to a single repository account, then "fan out" backups for greater resilience.

Before you can use the cross-account management and cross-account backup features, you must have an existing organization structure configured in AWS Organizations.

### Auditing and reporting with AWS Backup Audit Manager

AWS Backup Audit Manager helps you simplify data governance and compliance management of your backups across AWS. AWS Backup Audit Manager provides built-in, customizable controls that you can align with your organizational requirements. You can also use these controls to automatically track your backup activities and resources.

AWS Backup Audit Manager can help you locate specific activities and resources that are not yet compliant with the controls that you defined. It also generates daily reports that you can use to demonstrate evidence of compliance with your controls over time.

To include your backup compliance alongside your overall compliance posture, you can automatically import AWS Backup Audit Manager findings into AWS Audit Manager.

### Incremental backups

AWS Backup efficiently stores your periodic backups incrementally. The first backup of an AWS resource backs up a full copy of your data. For each successive incremental backup, only the changes to your AWS resources are backed up. Incremental backups enable you to benefit from the data protection of frequent backups while minimizing storage costs (backups to cold storage are full backups).

For a list of which resources support incremental backups, see [Feature availability by resource](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html#features-by-resource).

### Full AWS Backup management

Some resource types support full AWS Backup management. The benefits of full AWS Backup management include:

- **Independent encryption**. AWS Backup automatically encrypts your backups with the KMS key of your AWS Backup vault, instead of using the same encryption key as your source resource. This increases your layers of defense. See [Encryption for backups in AWS Backup](https://docs.aws.amazon.com/aws-backup/latest/devguide/encryption.html) for more information.
    
- **`awsbackup` Amazon Resource Names (ARNs)**. Backup ARNs begin with `arn:aws:backup` instead of `` arn:aws:`source-resource` ``. This allows you to create access policies that apply specifically to backups and not the source resources. See [Access control](https://docs.aws.amazon.com/aws-backup/latest/devguide/access-control.html) for more information.
    
- **Centralized backup billing and Cost Explorer cost allocation tags.**. Charges for AWS Backup (including storage, data transfers, restores, and early deletion) appear under "Backup" in your Amazon Web Services bill, instead of appearing under each supported resource. You can also use Cost Explorer cost allocation tags to track and optimize your backup costs. See [Metering, costs, and billing](https://docs.aws.amazon.com/aws-backup/latest/devguide/metering-and-billing.html) for more information.
    

To see which resource types are eligible for full AWS Backup management, see [Feature availability by resource](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html#features-by-resource).

### Backup activity monitoring

AWS Backup provides a dashboard that makes it simple to audit backup and restore activity across AWS services. With just a few clicks on the AWS Backup console, you can view the status of recent backup jobs. You can also restore jobs across AWS services to ensure that your AWS resources are properly protected.

AWS Backup integrates with Amazon CloudWatch and Amazon EventBridge. CloudWatch allows you to track metrics and create alarms. EventBridge allows you to view and monitor AWS Backup events. For more information, see [Monitoring AWS Backup events using EventBridge](https://docs.aws.amazon.com/aws-backup/latest/devguide/eventbridge.html) and [Monitoring AWS Backup metrics with CloudWatch](https://docs.aws.amazon.com/aws-backup/latest/devguide/cloudwatch.html).

AWS Backup integrates with AWS CloudTrail. CloudTrail gives you a consolidated view of backup activity logs that make it quick and easy to audit how your resources are backed up. AWS Backup also integrates with Amazon Simple Notification Service (Amazon SNS), providing you with backup activity notifications, such as when a backup succeeds or a restore has been initiated. For more information, see [Logging AWS Backup API calls with CloudTrail](https://docs.aws.amazon.com/aws-backup/latest/devguide/logging-using-cloudtrail.html) and [Using Amazon SNS to track AWS Backup events](https://docs.aws.amazon.com/aws-backup/latest/devguide/sns-notifications.html).

### Secure your data in backup vaults

The content of each AWS Backup backup is immutable, meaning that no one can alter that content. AWS Backup further secures your backups in backup vaults, which separates them safely from their source instances. For example, your vault will retain your Amazon EC2 and Amazon EBS backups according to the lifecycle policy you choose, even if you delete the source Amazon EC2 instance and Amazon EBS volumes.

Backup vaults offer encryption and resource-based access policies that let you define who has access to your backups. You can define access policies for a backup vault that define who has access to the backups within that vault and what actions they can take. This provides a simple and secure way to control access to your backups across AWS services. To review AWS and customer managed policies for AWS Backup, see [Managed policies for AWS Backup](https://docs.aws.amazon.com/aws-backup/latest/devguide/security-iam-awsmanpol.html).

You can use AWS Backup Vault Lock to prevent anyone (including you) from deleting backups or altering their retention period. AWS Backup Vault Lock helps you enforce a _write-once-read-many_ (WORM) model and add another layer of defense to your defense in depth. To get started, see [AWS Backup Vault Lock](https://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html).

### Support for compliance obligations

AWS Backup helps you meet your global compliance obligations. AWS Backup is in scope of the following AWS compliance programs:

- [FedRAMP High](https://aws.amazon.com/compliance/services-in-scope)
    
- [GDPR](https://aws.amazon.com/blogs/security/all-aws-services-gdpr-ready)
    
- [SOC 1, 2, and 3](https://aws.amazon.com/compliance/services-in-scope)
    
- [PCI](https://aws.amazon.com/compliance/services-in-scope)
    
- [HIPAA](https://aws.amazon.com/compliance/services-in-scope)
    
- [and many more](https://aws.amazon.com/compliance/services-in-scope)


![service-logo](/assets/img/aws-icons/Arch_AWS-DataSync_64.png)
# AWS DataSync

* **AWS Data Sync** can be used for cross-region copy

![service-logo](/assets/img/aws-icons/Arch_Amazon-FSx_64.png)
# Amazon FSx

- **Amazon File Cache:** a high-speed cache on AWS that makes it easier to process file data, regardless of where the data is stored. It serves data in the cache at consistent high speeds with sub-millisecond latency to applications running on AWS—up to hundreds of GB/s of throughput, and up to millions of operations per second. Automatically loads data into the cache when it’s accessed for the first time and releases data when it’s not used.
- **Amazon FSx for NetApp ONTAP**: high-performance file storage that’s broadly accessible from Linux, Windows, and macOS compute instances via the industry-standard NFS, SMB, and iSCSI protocols. Fully elastic and virtually unlimited in size, and supports compression and deduplication.
- **Amazon FSx for OpenZFS**: accessible from Linux, Windows, and macOS compute instances and containers via the industry-standard NFS protocol (v3, v4, v4.1, and v4.2). Delivers over 1 million IOPs, with latencies as low as a few hundred microseconds for your high-performance workloads.

![service-logo](/assets/img/aws-icons/Arch_Amazon-FSx-for-WFS_64.png)
# Amazon FSx for WFS
- **FSx for Windows File Server**: SMB, Windows NTFS, ActiveDirectory (AD) integration, Distributed file system (DFS). High levels of throughput and sub-millisecond latency
- Provides storage of **up to 64 TB per file system**.

![service-logo](/assets/img/aws-icons/Arch_Amazon-FSx-for-Lustre_64.png)
# Amazon FSx for Lustre

- **FSx for Lustre**: fully managed file system that is optimized for high performance computing (HPC), machine learning, and media processing workflows. Ccan process hundreds of GB per second of throughput at sub-millisecond latencies. 
- Amazon FSx for Lustre can be **integrated with Amazon S3**, so you can join long-term data sets with a high performance file system. Data can be automatically copied to and from Amazon S3 from your Amazon FSx for Lustre file system.

![service-logo](/assets/img/aws-icons/Arch_AWS-Snowball_64.png)
# AWS Snowball

**AWS Snowball** is a petabyte-scale data transport option.\
All you need to do is create a job in the AWS management console and a Snowball appliance will be shipped to you. Simply attach the appliance into your local network and transfer the files directly onto it. The Snowball will then be shipped back into a secure Amazon facility and transferred into the network.

![service-logo](/assets/img/aws-icons/Arch_AWS-Snowball-Edge_64.png)
# AWS Snowball Edge

**AWS Snowball Edge Optimized** is ideal for edge processing usage cases that require additional computing power in remote, disconnected, or harsh environments. This service provides 52 vCPUs, 208 GB of memory, 7.68TB of NVMe SSD, and 42 TB of S3-compatible storage. Typical usage scenarios include advanced machine learning and full-motion video analysis in disconnected environments.

![service-logo](/assets/img/aws-icons/Arch_AWS-Snowmobile_64.png)
# AWS Snowmobile

**AWS Snowmobile** is an even larger data transfer option that operates in exabyte-scale. It should only be used to move extremely large amounts of data into AWS. A Snowmobile is 45-foot-long ruggedized shipping container that is pulled by a semi-trailer truck. You can transfer 100 PB per Snowmobile. ©
