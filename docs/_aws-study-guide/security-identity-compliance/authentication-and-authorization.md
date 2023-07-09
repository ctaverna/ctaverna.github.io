---
title: "Authentication and authorization"
subtitle: "Identity management and access control in the AWS platform"
is-folder: false
subcategory: security-identity-compliance
sequence: 1
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [**General concepts**](#general-concepts)
  - [Control plane and data plane](#control-plane-and-data-plane)
  - [Authentication and Authorization](#authentication-and-authorization)
- [Federation](#federation)
  - [Custom Build](#custom-build)
  - [Cross-Account Access](#cross-account-access)
  - [Security Assertion Markup Language *(SAML)*](#security-assertion-markup-language-saml)
  - [OpenID Connect](#openid-connect)
  - [Microsoft Active Directory](#microsoft-active-directory)
- [AWS Single Sign-On](#aws-single-sign-on)
- [AWS Security Token Service (STS)](#aws-security-token-service-sts)
    - [STS supported APIs](#sts-supported-apis)
- [Active Directory Connector](#active-directory-connector)
- [Simple Active Directory](#simple-active-directory)
- [AWS Managed Microsoft AD](#aws-managed-microsoft-ad)


## **General concepts**

**IAM** serves as an identity provider (IdP).

Benefits of integrating an existing IdP:

* Users no longer required to manage multiple sets of credentials
* Fewer credentials to administer
* Credentials are centrally managed
* Easier to establish and enforce **compliance standards**.

Using a third party to provide identity services is known as **federation**.

### Control plane and data plane

There are two different planes of access used to manage and access AWS services:&#x20;

The **control plane** permits access to perform operations on a particular AWS instance.

The **data plane** permits access to the application running on AWS. The data plane permits access to sign in to the compute instance using Secure Shell (SSH) or Remote Desktop Protocol (RDP) and to make changes to the guest operating system or to the application itself.

The control and data planes use different paths, different protocols, and different credentials; however, for several AWS services, the control and data planes are identical. Amazon DynamoDB allows you to stop and start the compute instances (control plane) and stop and start the database (data plane) using an AWS API.

### Authentication and Authorization

The **identity** is established by AWS in these ways:

| Name                | Identifier    | Credential        |
| ------------------- | ------------- | ----------------- |
| Root user           | email         | password          |
| User                | email         | password          |
| User, Group or Role | Access key ID | Secret access key |
| API                 | Access key ID | Secret access key |

The **authorization** is established by applying policies on user-executed APIs.

## Federation

A federation consists of two components: _identity provider_ and _identity consumer._

- **Identity provider**  
Stores **identities**, provides a mechanism for **authentication**, and provides a **course level of authorization**.
- **Identity consumer**  
Stores a **reference to the identity**, providing **authorization at a greater granularity** than the identity provider.

### Custom Build

_Custom builds_ were the original method of federation within AWS, but they have since been supplanted. With SAML, you can build a custom IdP that verifies users and their identities.

### Cross-Account Access

You can enable users to access resources across multiple AWS accounts, by using only one set of credentials.

* **source account:**  the account in which the user resides
* **target account:**  the account with the resources to which the user wants access
  * Here must exist an _IAM role_ with:
    * _permissions policy:_ grant access to AWS services and resources
    * _trust policy:_ who can assume the role and their external ID

The _target account_ issues short-term credentials to the _role_, which allows access to AWS services and the resources specified.

### Security Assertion Markup Language *(SAML)*

Provides **federation** between an **IdP** and a **service provider (SP).**\
The IdP and the SP exchange metadata in an **XML** file that contains **certificates** and **attributes.**

**You interact only with the IdP**, and all authentication and authorization occurs between you and the IdP. &#x20;

After a previously **established trust relationship** and a **successful authentication and authorization**:

* The _**IdP**_ makes an **assertion** to the service provider.
* The _**service provider**_ accepts this assertion and **provides access**.

### OpenID Connect

It's the **successor to SAML.**  
OIDC is easier to configure than SAML and **uses tokens rather than assertions** to provide access. Most use cases for OIDC involve external versus internal users.

With OIDC, _OpenID provider_ (OP) uses a _relying party_ (RP) trust to track the service provider.\
OP and RP exchange metadata by focusing on the OP providing information to the RP about the location of its endpoints.\
The RP must register with the OP and then receive a client ID and a client secret. This exchange establishes a trust relationship between the OP and the RP.

All **authentication** and **authorization** occur only between **you and the OP**.

The OP issues a token to the _service provider_, which accepts this token and provides access\
&#x20;OIDC includes three different types of tokens.

* _**ID token:**_ establishes a user’s identity
* _**Access token:**_ provides access to APIs
* _**Refresh token:**_ allows you to acquire a new _access token_ when the previous one expires

Companies such as Google, Twitter, Facebook, and Amazon can also establish their own OpenID provider.

### Microsoft Active Directory

Identity provider for a majority of corporations.\
You use the _Active Directory **forest trusts**_ to establish trust between an _**AD domain controller** _ and _AWS Directory Service for Microsoft Active Directory (**AWS Managed Microsoft AD**)_.

For Microsoft Active Directory, the domain controller is on-premises or in the AWS Cloud.

In the Microsoft Active Directory setup, the **AD domain controller** defines **the user**.\
However, you add users to the **groups** that you define in the **AWS Managed Microsoft AD**.\
Access to services depends on membership within these groups.

## AWS Single Sign-On

It's an AWS service that manages SSO access.\
AWS SSO allows users to **sign in** to a user portal **with** their existing **corporate credentials** and **access** both **AWS accounts** and business accounts.\
You can have multiple permission sets, allowing for greater granularity and control over access.

It's integrated with Microsoft Active Directory through the Directory Service.

## AWS Security Token Service (STS)

Provides **temporary security credentials** associated to **trusted users.**\
Temporary security credentials work similarly to long-term access key credentials, but with the following differences:

* Consist of an _**access key ID**_, a _**secret access key**_, and a _**security token**_.
* Are **short-term**, and you configure them to remain valid for a duration between a few minutes to several hours.&#x20;
* Are **generated dynamically** and provided to you upon request.

#### STS supported APIs

* **AssumeRole**\
  Provides a set of _temporary security credentials_ to access AWS resources.\
  \- Can be used to **grant access** to **IAM users** defined in **other AWS accounts**.\
  \- Supports multi-factor authentication (MFA).\
  \- Default and minimum duration of the credentials is **60 minutes** (can be extended 12 hours)
* **AssumeRoleWithSAML**\
  Same as _AssumeRole_, to be used when you are using an identity store or directory that is SAML-based, rather than having an identity from an IAM user in another AWS account.\
  This API does not support MFA.
* **DecodeAuthorizationMessage**\
  Decodes additional information about the **authorization status of a request** from an encoded message **returned in response** to an AWS request.\
  The message is encoded to prevent the requesting user from seeing details of the authorization status, which can contain privileged information.\
  The decoded message includes the following:\
  \- Whether the request was denied for an explicit deny or for absence of an explicit allow\
  \- Principal who made the request\
  \- Requested action\
  \- Requested resource\
  \- Values of condition keys in the context of the user’s request
* **GetCallerIdentity**\
  Returns details about the IAM identity whose credentials call the API.
* **GetFederationToken**\
  Provides a set of temporary security credentials to access AWS resources **for a federated user**.\
  Because the call uses the long-term security credentials of an IAM user, this call is appropriate in contexts where credentials can be safely stored.\
  In addition to the policies attached to the IAM user, **additional _policies_** can be passed **as a parameter**, and the most restrictive is the one enforced.\
  The API credentials can have a duration of up to 36 hours.\
  This API does not support MFA.
* **GetSessionToken**\
  Provides a set of temporary security credentials to access AWS resources.\
  Normally used to enable **MFA** to protect programmatic calls to specific AWS APIs.



## Active Directory Connector

**Connects** your existing **on-premises** Microsoft Active Directory with compatible AWS applications.

Enables you to access the AWS Management Console by **signing in with** your existing **AD credentials**.

AWS-compatible applications include WorkSpaces, QuickSight, WorkMail, and EC2 for Windows Server instances, among others.\
Acting as a **proxy service**, you can add a service account to your Active Directory, and AD Connector eliminates the need for directory synchronization or the cost and complexity of hosting a federation infrastructure.

When you add users to AWS applications, AD Connector reads your existing Active Directory to create lists of users and groups from which to select.\
When users sign in to the AWS applications, AD Connector forwards sign-in requests to your on-premises Active Directory domain controllers for authentication.

## Simple Active Directory

It's a Microsoft Active Directory that is compatible with AWS Directory Service and is powered by Samba 4.

Simple AD is a **standalone directory in the cloud**, where you create and manage identities and manage access to applications.

Supports **basic** Active Directory **features** such as user accounts, group memberships, memberships for a Linux domain or Windows-based Amazon EC2 instances, Kerberos-based SSO, and group policies.

However, Simple AD **does not support** many features like: trust relationships, DNS dynamic update, schema extensions, MFA, communication over LDAPs, PowerShell Active Directory cmdlets, or Flexible Single Master Operation (FSMO) role transfer.\
In addition, Simple AD is not compatible with RDS SQL Server.

## AWS Managed Microsoft AD

Its an **actual** Microsoft Windows Server Active Directory, managed by AWS in the AWS Cloud.\
It enables you to migrate a broad range of Active Directory–aware applications to the AWS Cloud.

AWS Managed Microsoft AD works with Microsoft SharePoint, Microsoft SQL Server Always-On Availability Groups, and many .NET applications.



