---
title: "IAM"
subtitle: "Identity and Access Management"
is-folder: false
subcategory: security-identity-compliance
sequence: 2
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [External identity providers](#external-identity-providers)
- [IAM Principals](#iam-principals)
  - [IAM Users](#iam-users)
  - [IAM Groups](#iam-groups)
  - [IAM Role](#iam-role)
- [**IAM Policies**](#iam-policies)
- [**Applying permissions**](#applying-permissions)
- [ARN ](#arn-)
    - [Examples](#examples)


It's a **global resource**, not region-specific.

AWS account **root user** has extreme power and cannot be limited, so, best practice is:

* Create IAM admin user
* Lock away the root user credentials
* Use IAM admin user

## External identity providers

IAM can integrate external identity providers, and attach policies to external entities:

* Corporate user directory
* OIDC (Open ID Connect) providers
* SAML 2.0 identity providers



## IAM Principals

A Principal is an entity that can take action on an AWS resource.

### IAM Users

* IAM users are users **within your account**
* Each user has **his own credentials**
* **Authorized** to perform specific actions **based on its permission**
* **No default permissions**
* Access to CLI or Console must be **explicitly** granted\
  (Programmatic access / Management Console access)

### IAM Groups

Simply a collection of **users** (no roles).

The **name** can be changed, but avoid to do it because also the ARN will change too.

### IAM Role

Roles can be used to assign permissions to users or services on a **temporary basis**.

* **The role is assumed** by the user or the service
  * User-based roles
  * Service roles
  * External roles:
    * Cross-account access
    * Federation
* When you create the role, you specify two policies:
  * The **trust policy** specifies **who is allowed to assume** the role (the trusted entity, or principal)
  * The **access policy** (or _permissions policy_) defines **which actions** and **resources** the principal is allowed to use
* Use cases:
  * Provide AWS resources access to AWS services
  * Provide access to third parties
  * Provide access to externally authenticated users
  * Switch roles to access resources in your aws account or any other

## **IAM Policies**

* A policy is an **entry** that defines permission (attached to an identity or a resource)
* Any API action is **implicitly denied** unless there is a policy that explicitly allows it.
* If there is a policy that explicitly denies an action, that policy always takes precedence.
* Cannot reach outside AWS
* **Resource-based** = Attached to an AWS resource
  * **Attached to**: aws resources
  * **Types**: Inline
* **Identity-based** = Attached to an IAM principal
  * **Attached to**: users / group / role
  * **Types**: AWS-managed / Customer-managed / Inline
    * **AWS-managed policies**\
      ****created by AWS and managed centrally in IAM
    * **Customer-managed policies**\
      ****created by the customer and managed centrally in IAM
    * **Inline policies**\
      ****created by the customer and attached and managed directly at the identity principal
* A single policy document can have multiple statements (_sid_ field is optional).
* If the policy is attached to a resource rather than to an IAM identity, then the policy must also specify a principal (to whom the policy applies)

_**Effect:**_ has the value of either ALLOW or DENY. The entity (whether a user, group, or role) is either granted (or denied) the permission to execute that API.

_**Action**_**:** Action can be an individual API, a grouping of APIs for the same service using a wildcard (for example, S3:\* includes all S3 APIs), or APIs for different services.

_**Resource:**_ You can restrict the policy to a particular object, or particular group of objects (using ARN with the wildcard \*).

{: .box-note}
Use the acronym EAR to remember the three attribute-value pairs



<details>

<summary>Example of a policy to allow read and write access to objects in an S3 Bucket</summary>

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "ListObjectsInBucket",
            "Effect": "Allow",
            "Action": ["s3:ListBucket"],
            "Resource": ["arn:aws:s3:::bucket-name"]
        },
        {
            "Sid": "AllObjectActions",
            "Effect": "Allow",
            "Action": "s3:*Object",
            "Resource": ["arn:aws:s3:::bucket-name/*"]
        }
    ]
}
```

</details>

<details>

<summary>Example of a policy to allow a Lambda function access a DynamoDB table</summary>

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "ReadWriteTable",
            "Effect": "Allow",
            "Action": [
                "dynamodb:BatchGetItem",
                "dynamodb:GetItem",
                "dynamodb:Query",
                "dynamodb:Scan",
                "dynamodb:BatchWriteItem",
                "dynamodb:PutItem",
                "dynamodb:UpdateItem"
            ],
            "Resource": "arn:aws:dynamodb:*:*:table/SampleTable"
        },
        {
            "Sid": "GetStreamRecords",
            "Effect": "Allow",
            "Action": "dynamodb:GetRecords",
            "Resource": "arn:aws:dynamodb:*:*:table/SampleTable/stream/* "
        },
        {
            "Sid": "WriteLogStreamsAndGroups",
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "*"
        },
        {
            "Sid": "CreateLogGroup",
            "Effect": "Allow",
            "Action": "logs:CreateLogGroup",
            "Resource": "*"
        }
    ]
}
```

</details>

## **Applying permissions**

* **Attach** a policy to an IAM principal
* A **single policy** can be **attached to multiple entities**
* A **single entity** can have **multiple policies** attached to it

## ARN&#x20;

An ARN (Amazon Resource Name) always starts with **arn:** and can include the following components to identify a particular AWS resource uniquely:

* **Partition** Usually aws. For some regions, such as in China, this can have a different value.
* **Service** Namespace of the AWS service.&#x20;
* **Region** The region in which the resource is located. Some resources do not require a region to be specified.&#x20;
* **Account ID** The account in which the resource resides. Some resources do not require an account ID to be specified.
* **Resource** The specific resource within the namespace of the AWS service. For services that have multiple types of resources, there may also be a resource type.

#### Examples

```
Example formats:

arn:partition:service:region:account-id:resource
arn:partition:service:region:account-id:resourcetype/resource
arn:partition:service:region:account-id:resourcetype:resource

Examples of ARNs for various AWS resources:

<!-- Amazon Polly Lexicon -->
arn:aws:polly:us-west-2:123456789012:lexicon/awsLexicon
 
<!-- IAM user name -->
arn:aws:iam::123456789012:user/carla
 
<!-- Object in an Amazon S3 bucket -->
arn:aws:s3:::bucket-name/exampleobject.png
```
