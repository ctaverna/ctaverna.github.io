---
title: "Secrets"
subtitle: "Services to securely manage secrets in the cloud"
is-folder: false
subcategory: security-identity-compliance
sequence: 3
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [AWS Secrets Manager (ASM)](#aws-secrets-manager-asm)
- [Key Management Service (KMS)](#key-management-service-kms)
  - [**Keys**](#keys)
    - [CMK](#cmk)
    - [Data Keys](#data-keys)
  - [Controlling the Access Keys](#controlling-the-access-keys)
    - [Option 1](#option-1)
    - [Option 2](#option-2)
    - [Option 3](#option-3)
- [CloudHSM](#cloudhsm)

## AWS Secrets Manager (ASM)

It simply offers an easy way to **rotate, manage and retrieve secrets**, both for managed services and custom applications.

Replace hard-coded secrets in applications with a call to Secrets Manager APIs, eliminating the need to expose plaintext secrets.

## Key Management Service (KMS)

Managed **encryption** service that enables you to easily encrypt your data.\
AWS KMS provides a highly available **key storage, management, and auditing solution** to encrypt your data across AWS services and within your own applications.

To protect your master keys KMS uses FIPS 140-2 validated cryptographic modules, known as a **hardware security module (HSM)**.

The service can **automatically rotates your keys once a year**, without having to re-encrypt data that was previously encrypted.

Use Cases:

* A developer who must **encrypt data in your applications**: use the AWS SDKs with AWS KMS support to easily use and protect encryption keys.
* An IT administrator looking for a **scalable key management infrastructure** to support your developers and their growing number of applications: use AWS KMS to reduce your licensing costs and operational burden.
* You’re responsible for providing data security for **regulatory or compliance purposes**: use AWS KMS to verify that data is encrypted consistently across the applications where it is used and stored.

### **Keys**

CMKs can never leave AWS KMS unencrypted, but data keys can.

#### CMK

AWS KMS uses a type of key called a **customer master key (CMK)** to encrypt and decrypt data.\
CMKs are the fundamental resources that AWS KMS manages.\
CMKs can be either **customer-managed keys** or **AWS managed keys**.\
They can be used inside AWS KMS to encrypt or decrypt up to 4 kilobytes of data directly.

#### Data Keys

CMK can also be used to encrypt generated **data keys**, which are then used to encrypt or decrypt larger amounts of data outside of the service.\

### Controlling the Access Keys

A key management infrastructure (KMI) is composed of two subcomponents:

* **the storage layer** that protects the plaintext keys
* **the management layer** that authorizes key use

#### Option 1
- **You Control the Encryption Method and the Entire KMI**

You are responsible of everything.

* **S3**\
  You can encrypt data by using any encryption method you want and then upload the encrypted data using the Amazon Simple Storage Service (Amazon S3) API. An alternative to these open source encryption tools with the Amazon **S3 encryption client**, which is an open source set of APIs embedded in the AWS SDKs. Supply a key from your KMI that can be used to encrypt or decrypt your data as part of the call to Amazon S3.
* **EBS -** Only data volumes, not boot volumes
  * **System level** or **block-level** encryption\
    Operates below the file system layer using kernel space device drivers to perform the encryption and decryption of data. Useful when you want **all data written to a volume to be encrypted** regardless of what directory the data is stored in. (eg: Loop-AES, dm-crypt, TrueCrypt)
  * **File-system** encryption\
    You can use file system-level encryption, which works by stacking an encrypted file system on top of an existing file system. This method is typically used to encrypt a specific directory. (eg: eCryptfsand EncFs)
  *   **Amazon Relational Database Service**\
      ****RDS does not expose the attached disk it uses for data storage, so transparent disk encryption is not available. However, you can encrypt database fields in your application selectively by using any of the standard encryption libraries such as _Bouncy Castle_ and _OpenSSL_, before the data passes to your Amazon RDS instance.

      The encrypted fields of the returned results can be decrypted by your local application for presentation.

#### Option 2
- **You Control the Encryption Method** 
- **AWS provides the KMI Storage Component**
- **You Provide the KMI Management Layer**

Similar to option 1, but the keys are stored in an AWS CloudHSM appliance rather than in a key storage system that you manage on-premises.

#### Option 3
- **AWS Controls the Encryption Method and the Entire KMI**

AWS provides server-side encryption of your data, transparently managing the encryption method and keys.

- **S3** - There are 3 ways:
  - **Server-side encryption:** Each object is encrypted with a unique data key. As an additional safeguard, this key is encrypted with a periodically rotated master key managed by Amazon S3. Amazon S3 server-side encryption uses 256-bit Advanced Encryption Standard (AES) keys for both object and master keys.\
  No additional cost beyond what you pay for using Amazon S3.

  - **Server-side encryption using customer-provided keys:** After the object is encrypted, the encryption key is deleted. When you retrieve this object from Amazon S3, you must provide the same encryption key in your request. Amazon S3 verifies that the encryption key matches, decrypts the object, and returns the object to you.\
  No additional cost beyond what you pay for using Amazon S3.

  - **Server-side encryption using AWS KMS:** You can encrypt your data in Amazon S3 by defining a _KMS master key_ within your account. This master key is used to encrypt the unique _object key_ (referred to as a _data key_) that ultimately encrypts your object.\
      When you upload your object:\
      \- A request is sent to KMS to create an object key.\
      \- KMS generates this object key and encrypts it using the master key
      \- KMS returns this encrypted object key along with the plaintext object key to S3\
      \- S3 web server encrypts your object using the plaintext object key, stores the now encrypted object (with the encrypted object key), and deletes the plaintext object key from memory.\
      To retrieve this encrypted object\
      \- S3 sends the encrypted object key to KMS\
      \- KMS decrypts the object key using the correct master key and returns the decrypted (plaintext) object key to Amazon S3.\
      \- With the plaintext object key, Amazon S3 decrypts the encrypted object and returns it to you.\
      Amazon S3 also enables you to define a default encryption policy. You can specify that all objects are encrypted when stored. You can also define a bucket policy that rejects uploads of unencrypted objects.
- **EBS**\
  When creating a volume you can choose to encrypt it using a KMS _**master key**_ within your account that encrypts the unique _**volume key**_ that will ultimately encrypt your EBS volume.\
  The plaintext _volume key_ is stored in memory to encrypt and decrypt all data going to and from your attached EBS volume. When the encrypted volume (or any encrypted snapshots derived from that volume) needs to be re-attached to an instance, a call is made to KMS to decrypt the encrypted _volume key_. KMS decrypts this encrypted _volume key_ with the correct _master key_ and returns the decrypted _volume key_ to Amazon EC2.
- **Amazon EMR**\
  S3DistCp is an Amazon EMR feature that moves large amounts of data from Amazon S3 into HDFS, from HDFS to Amazon S3, and between Amazon S3 buckets. With S3DistCp, you can request Amazon S3 to use server-side encryption when it writes Amazon EMR data to an Amazon S3 bucket.
- **Amazon Redshift**\
  When creating an Amazon Redshift cluster, you can choose to encrypt all data in user-created tables. For server-side encryption of an Amazon Redshift cluster, you can choose from the following options:
  - **256-bit AES keys** Data blocks (included backups) are encrypted using random 256-bit AES keys, themselves encrypted using a random 256-bit AES database key, which is encrypted by a 256-bit AES cluster master key that is unique to your cluster.
  - **CloudHSM cluster master key** The 256-bit AES cluster master key used to encrypt your database keys is generated in your CloudHSM.\
    This option lets you **more tightly control the hierarchy and lifecycle** of the keys used to encrypt your data.
  - **AWS KMS cluster master key** The 256-bit AES cluster master key used to encrypt your database keys is generated in AWS KMS. This cluster master key is then encrypted by a master key within AWS KMS.\
    This option lets you define **fine-grained controls over the access and use** of your master keys and audit these controls through AWS CloudTrail.

## CloudHSM

AWS CloudHSM is a **cloud-based security service** that helps you meet **corporate, contractual, and regulatory compliance requirements** for data security by **using dedicated hardware security module** appliances within the AWS cloud.\
A hardware security module (**HSM**) is a hardware appliance that provides secure key storage and cryptographic operations within a tamper-resistant hardware device.\
HSMs are designed to securely store cryptographic key material and use the key material without exposing it outside the cryptographic boundary of the appliance. AWS CloudHSM allows you to protect your encryption keys within HSMs that are designed and validated to government standards for secure key management. You can securely generate, store, and manage the cryptographic keys used for data encryption in a way that ensures that only you have access to the keys.

The CloudHSM appliance is a FIPS 140-2, level 3 HSM that has both physical and logical tamper detection and response mechanisms that trigger **zeroization** of the appliance.

**Zeroization** erases the HSM’s volatile memory where any decrypted keys were stored. Zeroization destroys the key that encrypts stored objects, effectively causing all keys on the HSM to be inaccessible and unrecoverable.
