---
title: "CloudFormation and SAM"
subtitle: "Infrastructure as code, in the AWS way"
is-folder: false
subcategory: "management"
sequence: 1
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [CloudFormation entities](#cloudformation-entities)
  - [Stacks](#stacks)
  - [Change Sets](#change-sets)
  - [Permissions](#permissions)
- [Template anatomy](#template-anatomy)
  - [AWSTemplateFormatVersion](#awstemplateformatversion)
  - [Description](#description)
  - [Metadata](#metadata)
  - [**Parameters**](#parameters)
  - [**Mappings**](#mappings)
  - [**Conditions**](#conditions)
  - [**Transform**](#transform)
  - [Resources (required)](#resources-required)
    - [Custom Resources](#custom-resources)
    - [Resource Relationships](#resource-relationships)
    - [Creation Policies](#creation-policies)
    - [Wait Conditions](#wait-conditions)
  - [Outputs](#outputs)
- [Template Example](#template-example)
- [Intrinsic function](#intrinsic-function)
- [Stack updates](#stack-updates)
    - [**Update Policies**](#update-policies)
- [Large templates management](#large-templates-management)
- [**Stack Policies**](#stack-policies)
- [**AWS CloudFormation Helper Scripts**](#aws-cloudformation-helper-scripts)
- [StackSets](#stacksets)
    - [Stack Instance](#stack-instance)
    - [Permissions](#permissions-1)
- [Service limits](#service-limits)
- [SAM](#sam)
- [Example of *template.yaml* file](#example-of-templateyaml-file)
- [AWS SAM resource and property type](#aws-sam-resource-and-property-type)


Provides a common language to describe an AWS infrastructure, creates and builds those described resources.

* Based on JSON/YAML **templates**
* The output of AWS CloudFormation is called a **stack**. A stack is a collection of AWS resources deployed together as a group.
* To update a stack you can **create** a changeset, inspect the changes and then **run changeset**

## CloudFormation entities

### Stacks

Represents **a collection of resources** to deploy and manage by AWS CloudFormation. \
When you submit a template, the resources you configure are provisioned and then make up the stack itself.\
Any **modifications** to the stack **affect underlying resources**.\
For example, if you remove an AWS::EC2::Instance resource from the template and update the stack, AWS CloudFormation causes the referred instance to terminate.

{: .box-note}
If you **manually** update the resource outside of CloudFormation, the result will be **inconsistencies** between the state CloudFormation expects and the actual resource state. This can cause future stack operations to fail.

### Change Sets

Instead of submitting the update directly, you can generate a change set.\
A _change set_ is a **description of the changes** that will occur to a stack submitting the template.\
If the changes are acceptable, **the change set itself can execute on the stack** and implement the proposed modifications.&#x20;

### Permissions

By **default** CloudFormation functions within the **context** of the **IAM user** or **role** that invoked a stack action.  
So, any action that CloudFormation performs **is done on your behalf**, with **your authorizations**.

You can provide a **service role** the stack uses for the create, update, or delete actions.  
To create an CloudFormation service role, make sure that the role has a **trust policy** that allows `cloudformation.amazonaws.com` to assume the role.  
As a user, your _IAM credentials_ will need to include the ability to pass the role to AWS CloudFormation, using the `iam:PassRole` permission.

You can submit a template from a **local file** or via a URL that points to an object in **S3**.  
If you submit from a local file the template is uploaded on S3, so you need these permissions:
`- cloudformation:CreateUploadBucket`\
`- s3:PutObject`\
`- s3:ListBucket`\
`- s3:GetObject`\
`- s3:CreateBucket`

## Template anatomy

The high-level structure of a template is as follows:

```
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "String Description",
  "Metadata": { },
  "Parameters": { },
  "Mappings": { },
  "Conditions": { },
  "Transform": { },
  "Resources": { },
  "Outputs": { }
}
```

### AWSTemplateFormatVersion

Template engine version, always "2010-09-09"

### Description

Text description, max 1024 bytes

### Metadata

Additional template info, also used by AWS itself.\
You cannot update template metadata by itself, you must perform an update to one or more resources when you update the Metadata section.

**AWS::CloudFormation:Init**

```
"Metadata" : {
      "AWS::CloudFormation::Init" : {
        "config" : {
          "packages" : { <yum, apt, python, and others> },
          "groups" :   { <linux groups> },
          "users" :    { <linux users> },
          "sources" :  { "local path", "URL" },
          "files" :    { <inline file to be written> },
          "commands" : { <arbitrary commands to be executed> },
          "services" : { <services to be started or stopped on an instance> }
        }
      }
    },
```

You can organize config keys into _**configSets**_, which allow you to call groups of configurations at different times during an instance’s setup process and change the order in which configurations are applied.

**AWS::CloudFormation::Interface**

This section details how to modify the **ordering and presentation** of parameters in the AWS CloudFormation console.\
It is composed of two sections:

- **ParameterGroups:** To organize sets of **parameters** into **logical groupings**, which are then separated by horizontal lines in the console.
- **ParameterLabels:** To define **friendly names** for **parameters** in the console.&#x20;


**AWS::CloudFormation::Designer**

Specifies the visual layout and representation of resources when you design templates in the AWS CloudFormation Designer.\
It is not recommended to manually modify this section.





### **Parameters**

Values to pass to the build, ca be set either when you create the stack or when you perform updates&#x20;

```
"Parameters": {
  "InstanceTypeParam": {
    "Type": "String",
    "Default": "t2.micro",
    "AllowedValues": [ "t2.micro", "m1.small", "m1.large" ],
    "Description": "Enter t2.micro, m1.small, or m1.large. Default is t2.micro."
  }
}
```

The **Ref** intrinsic function can be used to refer to the parameter:

```
...
  "Properties": {
    "InstanceType": { "Ref": "InstanceTypeParam" },
...    
```

Supported **parameter types**:&#x20;

* String
* Number
* List of numbers
* Comma-delimited list
* AWS parameter types (for AWS account properties like AWS::EC2::KeyPair::KeyName)
* AWS Systems Manager Parameter Store (Systems Manager) parameter types

If a parameter value is sensitive, you can add the _**NoEcho**_ property, so that the sensitive value will be used normally but will be displayed as asterisks (\*\*\*).

**Pseudoparameters (automatically defined by AWS)**

The **AWS::Region** parameter, for example, resolves to the region code where the stack is being deployed (such as **us-east-1**).

### **Mappings**

Lookup table for conditional values (only strings allowed).  
A common example of mappings usage is to look up Amazon EC2 instance AMI IDs based on the region and architecture type.  
To query the values within the mapping you can use the **Fn::FindInMap** intrinsic function.

```
"Mappings" : {
  "RegionMap" : {
    "us-east-1"      : { "32" : "ami-6411e20d", "64" : "ami-7a11e213" },
    "us-west-1"      : { "32" : "ami-c9c7978c", "64" : "ami-cfc7978a" },
    "eu-west-1"      : { "32" : "ami-37c2f643", "64" : "ami-31c2f645" },
    "ap-southeast-1" : { "32" : "ami-66f28c34", "64" : "ami-60f28c32" },
    "ap-northeast-1" : { "32" : "ami-9c03a89d", "64" : "ami-a003a8a1" }
  }
}
```

### **Conditions**

Statements to control how and when resources are created.\
A common use case would be, for example, to conditionally set an EC2 instance to use a larger instance type if the environment to which you deploy is _prod_ versus _dev._

```
  "Conditions" : {
    "CreateProdResources" : {"Fn::Equals" : [{"Ref" : "EnvType"}, "prod"]}
  },
```

### **Transform**

Set of macros you can use to reduce the amount of time spent in the authoring process.\
Transforms are applied to the template during the _change set_ creation process.

- **WS::Include Transform**  
Acts as a tool to import template snippets from S3 buckets into the template being developed. When the template is evaluated, a change set is created, and the template snippet is copied from its location and is added to the overall template structure.  
You can use this transform anywhere in a template, except the _Parameters_ and _AWSTemplateFormatVersion_ sections. Nested transforms are not supported.  
```
{
  "Transform" : {
    "Name" : "AWS::Include",
    "Parameters" : {
      "Location" : "s3://MyAmazonS3BucketName/MyFileName.json"
    }
  }
}
```

- **AWS::Serverless Transform**  
Can be used to convert AWS Serverless Application Model (AWS SAM) templates to valid AWS CloudFormation templates for deployment.  
AWS SAM uses an abbreviated template syntax to deploy serverless applications with Lambda,  API Gateway, and DynamoDB.  
```
Transform: AWS::Serverless-2016-10-31
Resources:
  MyServerlessFunctionLogicalID:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs4.3
      CodeUri: 's3://testBucket/mySourceCode.zip'
```

### Resources (required)

What to create, with properties.  
A logical ID acts as the resource key, to be referenced in other parts of the template.

```
{
  "Resources": {
    "MyBucket": {
      "Type": "AWS::S3::Bucket",
      "Properties": {
        "BucketName": "MyBucketName1234"
      }
    }
  }
}
```

Properties can be either **optional or required.**

#### Custom Resources

Sometimes custom provisioning logic is required**,** for example to manage managing **resources not currently supported** by AWS CloudFormation, interacting with **third-party tools**, or other situations where more complexity is involved in the provisioning process.

Custom resource providers may be AWS Lambda functions or Amazon Simple Notification Service (Amazon SNS) topics.

#### Resource Relationships

By default CloudFormation tracks most dependencies between resources.\
There are, however, some exceptions, for example, an application server may not function properly until the backend database is up and running.\
In this case, you can add a **DependsOn** attribute to your template to specify the order of creation.

#### Creation Policies

Instructs CloudFormation not to mark a resource as CREATE\_COMPLETE until the resource itself signals back to the service. You can configure the creation policy to require a specific number of signals in a certain amount of time; otherwise, the resource will show CREATE\_FAILED.

#### Wait Conditions

You can use the WaitCondition property to insert **arbitrary pauses until resources complete**.

### Outputs

Values to be returned to the users

```
"Outputs" : {
  "BackupLoadBalancerDNSName" : {
    "Description": "The DNSName of the backup load balancer",
    "Value" : { "Fn::GetAtt" : [ "BackupLoadBalancer", "DNSName" ]}
  }
}
```



## Template Example
This is a complete example of a template, for a DynamoDB table
```json
{
  "AWSTemplateFormatVersion" : "2010-09-09",
 
  "Description" : "AWS CloudFormation Sample Template DynamoDB_Table: This template demonstrates the creation of a DynamoDB table.",
 
  "Parameters" : {
    "HashKeyElementName" : {
      "Description" : "HashType PrimaryKey Name",
      "Type" : "String",
      "AllowedPattern" : "[a-zA-Z0-9]*",
      "MinLength": "1",
      "MaxLength": "2048",
      "ConstraintDescription" : "must contain only alphanumberic characters"
    },

    "HashKeyElementType" : {
      "Description" : "HashType PrimaryKey Type",
      "Type" : "String",
      "Default" : "S",
      "AllowedPattern" : "[S|N]",
      "MinLength": "1",
      "MaxLength": "1",
      "ConstraintDescription" : "must be either S or N"
    },

    "ReadCapacityUnits" : {
      "Description" : "Provisioned read throughput",
      "Type" : "Number",
      "Default" : "5",
      "MinValue": "5",
      "MaxValue": "10000",
      "ConstraintDescription" : "must be between 5 and 10000"
    },

    "WriteCapacityUnits" : {
      "Description" : "Provisioned write throughput",
      "Type" : "Number",
      "Default" : "10",
      "MinValue": "5",
      "MaxValue": "10000",
      "ConstraintDescription" : "must be between 5 and 10000"
    }
  },
 
  "Resources" : {
    "myDynamoDBTable" : {
      "Type" : "AWS::DynamoDB::Table",
      "Properties" : {
        "AttributeDefinitions": [ { 
          "AttributeName" : {"Ref" : "HashKeyElementName"},
          "AttributeType" : {"Ref" : "HashKeyElementType"}
        } ],
        "KeySchema": [
          { "AttributeName": {"Ref" : "HashKeyElementName"}, "KeyType": "HASH" }
        ],
        "ProvisionedThroughput" : {
          "ReadCapacityUnits" : {"Ref" : "ReadCapacityUnits"},
          "WriteCapacityUnits" : {"Ref" : "WriteCapacityUnits"}
        }                
      }
    }
  },
 
  "Outputs" : {
    "TableName" : {
      "Value" : {"Ref" : "myDynamoDBTable"},
      "Description" : "Table name of the newly created DynamoDB table"
    }
  }
}
s
```

## Intrinsic function

- **Fn::Base64**  
Converts a string into its Base64 equivalent.  
The primary purpose is to pass string instructions to an EC2 instance’s UserData property.  
`{ "Fn::Base64": valueToEncode }`

- **Fn::Cidr**  
Allows you to convert an IP address block, subnet count, and size mask (optional) into a valid CIDR notation.  
`{ "Fn::Cidr": \[ ipBlock, count, sizeMask ] }`

- **Fn::FindInMap**  
Query information stored in the mapping table.  
`{ "Fn::FindInMap": \[ "MapName", "TopLevelKey", "SecondLevelKey" ] }`

- **Fn::GetAtt**  
Used to get information from a created resource to be used in other parts of the same template. For example, to get the ARN.  
`{ "Fn::GetAtt" : \[ "logicalIDOfResource", "attributeName" ] }`

- **Fn::GetAZs**  
Returns a list of availability zones in the region in which the stack is being created.  
`{ "Fn::GetAZs" : "region" }`

- **Fn::ImportValue**  
Returns the value of an output exported by another stack.  
`{ "Fn::ImportValue" : sharedValueToImport }`

- **Fn::Join**  
Join string values with a predefined delimiter, which you supply to the function along with a list of strings to join.  
`{ "Fn::Join" : \[ "delimiter", \[ listOfvalues] ] }`

- **Fn::Select**  
Choose an item in a list based on the zero-based index (out of bounds equals null)  
`{ "Fn::Select" : \[ index, \[listOfObjects] ] }`

- **Fn::Split**  
Create a list of strings by separating a single string by a known delimiter.  
`{ "Fn::Split" : \[ "delimiter", "source string" ] }`

- **Fn::Sub**  
Substitutes variables in the format _${MyVarName}_ with values that you specify.  
`{ "Fn::Sub" : \[ String, { Var1Name: Var1Value, Var2Name: Var2Value } ] }`

- **Ref**  
Returns the value of the specified _parameter_ or _resource_.  
With resources, will return the _name_, the _ARN_ or _physical ID_, depending on the resource type.  
`{ "Ref" : "logicalName" }`

- **Condition Functions:**
  - **Fn::And**
  - **Fn::Equals**
  - **Fn::If**
  - **Fn::Not**
  - **Fn::Or**




## Stack updates

#### **Update Policies**

Can be used to determine how to respond to changes to\
AWS::AutoScaling::**AutoScalingGroup** and AWS::Lambda::**Alias** resources.

**Deletion Policies**

Can be used to **preserve resources** when you delete a stack (set DeletionPolicy to _Retain_), for example to retain an S3 bucket.\
Some resources can instead have a **snapshot** (set DeletionPolicy to _Snapshot_).\
The following resource types support snapshots:\
AWS::EC2::Volume\
AWS::ElastiCache::CacheCluster\
AWS::ElastiCache::ReplicationGroup\
AWS::RDS::DBInstance\
AWS::RDS::DBCluster\
AWS::Redshift::Cluster

## Large templates management

There are two approaches to manage relationships between multiple stacks.

**Export and Import Stack Outputs**

You can **export stack output** values and **import them into other stacks** in the same account and region. For example, create a networking infrastructure in one stack, export the IDs of such resources from this stack and import them into others.

**Nesting with the AWS::CloudFormation::Stack Resource**

You can **manage stacks as resources** within the service in AWS CloudFormation.\
A single **parent stack** can create one or more AWS::CloudFormation::Stack resources, which act as **child stacks** that the parent manages.

## **Stack Policies**

There may be situations where you will want to **prevent certain types of updates to stacks** themselves. To do so you can assign a _stack policy_ to a stack to allow or deny access to modify certain stack resources, which you can filter by the type of update.\
Stack policies **apply to all users**, regardless of their IAM permissions.

{: .box-note}
Stack policies are **not a replacement for appropriate access control** from an IAM policy. Stack policies are an **additional fail-safe** to prevent accidental updates to critical resources.

## **AWS CloudFormation Helper Scripts**

When you execute custom scripts on EC2 instances as part of your _UserData_, CloudFormation provides several important helper scripts, located in `/opt/aws/bin`.

- **cfn-init**  
can be used to read **init metadata** from inside the resource created (packages, users, groups...) for example inside an injected _UserData_

- **cfn-signal**  
can be used to notify that the instance has completed its configuration, when using a _CreationPolicy_ or a _WaitCondition_

- **cfn-get-metadata**  
to get arbitrary metadata, supports only top-level keys

- **cfn-hup**  
is a daemon that detects changes in resource metadata and runs user-specified actions when a change is detected

## StackSets

CloudFormation _StackSets_ gives users the ability to control, provision, and manage multiple **stacks across multiple accounts.**\
**Each stack** set contains information about the stacks you deploy to a **single target account** in **one or more regions**. You can configure stack sets to deploy to regions in a specific order and how many unsuccessful deployments are required to fail the entire deployment.

The stack set itself exists in one region, and you must manage it there.

#### Stack Instance

For every **account+region pair** you need a _Stack Instance_.  
An update to a stack set propagates to all stack instances in all accounts and regions.

#### Permissions

For an _administrator account_ to deploy to any _target accounts_, you must create a **trust relationship** between the accounts.\
To do this, you create **an IAM role in each account**.

The _administrator account_ requires an IAM service role with permissions to _execute stack set operations_ and assume an execution role in any target accounts.\
This service role must have a trust policy that allows cloudformation.amazonaws.com.

_Target accounts_ will require an _execution role_ that you create in the administrator account, which the service role can assume.\
This execution role will require CloudFormation permissions and permissions to manage any resources you define in the template being deployed by the stack set.

## Service limits

| **Mappings** per template   |                        100                        |
| --------------------------- | :-----------------------------------------------: |
| **Outputs** per template    |                         60                        |
| **Parameters** per template |                         60                        |
| **Resources** per template  |                        200                        |
| **Stacks** per account      |                        200                        |
| Template body **size**      | 51,200 Bytes (local file) / 460,800 Bytes (S3)    |

## SAM

It's a CloudFormation extension, optimized for serverless.\
Every _SAM template_ is "transformed" into a _CloudFormation template_

* Supports YAML/JSON
* Supports anything AWS CloudFormation supports
* Can **mix** other **non-SAM** CloudFormation resources in the same template
* Supports intrinsic functions (i.e., Ref, Sub, Join, Select, Split)

## Example of *template.yaml* file

```yaml
AWSTemplateFormatVersion: '2010-09-09’
Transform: AWS::Serverless-2016-10-31
Resources:
    GetHtmlFunction:
        Type: AWS::Serverless::Function
        Properties:
            CodeUri: s3://sam-demo-bucket/todo_list.zip
            Handler: index.gethtml
            Runtime: nodejs6.10
            Policies: AmazonDynamoDBReadOnlyAccess
            Events:
                GetHtml:
                    Type: Api
                    Properties:
                        Path: /{proxy+}
                        Method: ANY
    ListTable:
        Type: AWS::Serverless::SimpleTable
```

## AWS SAM resource and property type


| ----------------------------- | ------------------------------------------------ |
| AWS::Serverless::Api          | API Gateway (OpenAPI)                            |
| AWS::Serverless::Application  | Cloudformation stack                             |
| AWS::Serverless::Connector    | Lambda to DynamoDB, SNS, ....                    |
| AWS::Serverless::Function     | Lambda+IAM                                       |
| AWS::Serverless::GraphQLApi   | AWS AppSync GraphQL API                          |
| AWS::Serverless::HttpApi      | API Gateway hhtp api                             |
| AWS::Serverless::LayerVersion | layer library for a lambda                       |
| AWS::Serverless::SimpleTable  | dynamodb table with single attribute primary key |
| AWS::Serverless::StateMachine | Step function                                    |

