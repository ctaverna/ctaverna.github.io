---
title: "CodeDeploy"
subtitle: "Automation of code deployments"
is-folder: false
subcategory: "tools"
sequence: 6
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [Deployment ](#deployment-)
  - [In-Place Deployments](#in-place-deployments)
  - [Blue/Green Deployments](#bluegreen-deployments)
  - [How to Stop deployments](#how-to-stop-deployments)
  - [Rollbacks ](#rollbacks-)
  - [Test Deployments Locally](#test-deployments-locally)
- [Application ](#application-)
  - [AppSpec for EC2/On-premises](#appspec-for-ec2on-premises)
    - [Hooks lifecycle](#hooks-lifecycle)
  - [AppSpec for Lambda](#appspec-for-lambda)
    - [Hooks lifecycle](#hooks-lifecycle-1)
  - [AppSpec for ECS](#appspec-for-ecs)
    - [Hooks lifecycle](#hooks-lifecycle-2)
- [Revision](#revision)
- [Deployment Group](#deployment-group)
  - [Deploy to EC2/On-Premises Instances ](#deploy-to-ec2on-premises-instances-)
    - [AWS CodeDeploy Agent](#aws-codedeploy-agent)
  - [Deploy to Amazon EC2 Auto Scaling Groups](#deploy-to-amazon-ec2-auto-scaling-groups)
- [Deployment Configurations](#deployment-configurations)
  - [Amazon EC2/On-Premises ](#amazon-ec2on-premises-)
  - [AWS Lambda](#aws-lambda)


Automates code deployments to a variety of compute services and on-premises.

* **Prevents unavailability** during deploy
* Automatic **rollback** in case of failure
* Based on a **appspec.yml** file (can also be an XML)
  * files to copy (source/destination)
  * permissions
  * speed and deployment group (one at a time / half at a time / all at once)
  * what to do before and then

## Deployment&#x20;

A deployment is **the process of copying content and executing scripts** on instances in your deployment group.&#x20;

To accomplish this, AWS CodeDeploy performs the tasks outlined in the AppSpec configuration file.&#x20;

### In-Place Deployments

Revisions deploy to new infrastructure **instead** of an existing one.\
After deployment completes successfully, the new infrastructure **gradually replaces** old code in a **phased rollout**.

After all traffic **routes** to the new infrastructure, you can keep the old code for review or discard it.

### Blue/Green Deployments

Publish **new versions of each function**, after which traffic shifting **routes** requests to the new function versions **according** to the _**deployment configuration**_ that you define.

Not supported by on-premises instances.

### How to Stop deployments

* You can stop deployments via the Console or CLI.
* If you stop deployments to EC2 instances in an _Auto Scaling group_, this can result in some instances having different application versions. In situations where this occurs, you can **configure** the application to **roll back to the last valid deployment automatically**.

### Rollbacks&#x20;

CodeDeploy achieves **automatic rollbacks** by **redeploying the last working revision** to any instances in the deployment group (this will generate a new deployment ID).

If you do not configure automatic rollbacks for the application, you can perform a manual rollback by redeploying a previous revision as a new deployment. This will accomplish the same result as an automatic rollback.

CodeDeploy will attempt to remove any file(s) that were created on the instance during the failed deployment. A record of the created files is kept in this locations:

**`Linux:`**`/opt/codedeploy-agent/deployment-root/deployment-instructions/[deployment-group-id]-cleanup`\
``**`Windows:`**`C:\ProgramData\Amazon\CodeDeploy\deployment-instructions\ [deployment-group-id]-cleanup`&#x20;

By default, CodeDeploy will not overwrite any files that were not created as part of a deployment. CodeDeploy tracks cleanup files, but script executions are not tracked, and any modification to the instance that is done by scripts cannot be rolled back automatically. As an administrator, you will be responsible for implementing logic in your deployment scripts to ensure that the desired state is reached during deployments and rollbacks.

### Test Deployments Locally

If you would like to test whether a revision will successfully deploy to an instance you are able to access, you can use the **`codedeploy-localcommand`** in the AWS CodeDeploy agent.\
This provides a useful alternative to executing the full workflow when you want simply to **validate** the deployment package.

## Application&#x20;

An application is a logical grouping of a _deployment group_, _revision_, and _deployment configuration_. This serves as a reference to the entire set of objects needed to complete a deployment to your instances or functions.

### AppSpec for EC2/On-premises

The AppSpec file defines the following:

* A **mapping of files** from the revision and location on the instance (**source** and **destination**)
* The **permissions** of files to deploy (not suppoerted by Windows instances)
* The **hooks**, that specifies the **scripts to execute** throughout the lifecycle of the deployment\
  All scripts must return an exit code of 0 to be successful.

<details>

<summary>Example of appspec.yml for an instance</summary>

<pre class="language-yaml"><code class="lang-yaml">version: 0.0
os: linux
files:
    - source: /
        destination: /var/www/html
permissions:
    - object: /var/www/html
        pattern: “*.html”
<strong>        owner: root
</strong>        group: root
        mode: 755
hooks:
    ApplicationStop:
        - location: scripts/deregister_from_elb.sh
    BeforeInstall:
        - location: scripts/install_dependencies.sh
    ApplicationStart:
        - location: scripts/start_httpd.sh
    ValidateService:
        - location: scripts/test_site.sh
        - location: scripts/register_with_elb.sh</code></pre>

</details>

#### Hooks lifecycle

{: .box-note}
Only if your deployment group is registered with a load balancer:\
**BeforeBlockTraffic:** Run tasks _before_ the instance is _**deregistered**_** ** from the load balancer.\
\[**BlockTraffic]**\
**AfterBlockTraffic:** Run tasks _after_ the instance is _deregistered_ from the load balancer.


**ApplicationStop:** Stop any running services on the instance that would be affected by the update. It is important to note that, since the revision has not yet been downloaded, the scripts execute from the previous revision. Because of this, the ApplicationStop hook does not run on the first deployment to an instance. \
**DownloadBundle:** Copy application revision files to a temporary location on the instance.\
**BeforeInstall:** Any pre-installation tasks, such as to clear log files or to create backups.\
\[**Install]:** Reserved for the CodeDeploy agent. \
**AfterInstall:** Any post-installation tasks, such as to modify the application configuration. \
**ApplicationStart:** Start any services that were stopped during the ApplicationStop event.\
**ValidateService:** Verify deployment completed successfully.

{: .box-note}
Only if your deployment group is registered with a load balancer:\
**BeforeAllowTraffic:** Run tasks _before_ instances _**register**_ with the load balancer.\
\[**AllowTraffic]**\
**AfterAllowTraffic:** Run tasks _after_ instances register with the load balancer.


### AppSpec for Lambda

The AppSpec file defines the following:

* The **resources** section with Lambda specifications
* The **hooks**, that specifies the **scripts to execute**

<details>

<summary>Example of appspec.yml for a Lambda</summary>

```yaml
version: 0.0
Resources:
  - myLambdaFunction:
      Type: AWS::Lambda::Function
      Properties:
        Name: "myLambdaFunction"
        Alias: "myLambdaFunctionAlias"
        CurrentVersion: "1"
        TargetVersion: "2"
Hooks:
  - BeforeAllowTraffic: "LambdaFunctionToValidateBeforeTrafficShift"
  - AfterAllowTraffic: "LambdaFunctionToValidateAfterTrafficShift"
```

</details>

#### Hooks lifecycle

**BeforeAllowTraffic:** For running any tasks **prior to** traffic shifting taking place \
**\[AllowTraffic]**\
**AfterAllowTraffic:** For any tasks **after** all traffic shifting has completed\


### AppSpec for ECS

The AppSpec file defines the following:

* The **resources** section with ECS task definition specifications
* The **hooks**, that specifies the **scripts to execute**

<details>

<summary>Example of appspec.yml for a Lambda</summary>

```yaml
version: 0.0
Resources:
  - myLambdaFunction:
      Type: AWS::Lambda::Function
      Properties:
        Name: "myLambdaFunction"
        Alias: "myLambdaFunctionAlias"
        CurrentVersion: "1"
        TargetVersion: "2"
Hooks:
  - BeforeAllowTraffic: "LambdaFunctionToValidateBeforeTrafficShift"
  - AfterAllowTraffic: "LambdaFunctionToValidateAfterTrafficShift"
```

</details>

#### Hooks lifecycle

**BeforeInstall:** Before the _**replacement task set**_ is created. One target group is associated with the original task set.\
\- If an optional test listener is specified, it is associated with the original task set.\
\- A rollback is not possible at this point.\
**\[Install]**\
**AfterInstall:** After the _**replacement task set**_ is created and one of the target groups is associated with it.\
\- If an optional test listener is specified, it is associated with the original task set.\
\- The results of a hook function at this lifecycle event **can trigger a rollback**.

**\[AllowTestTraffic]**\
**AfterAllowTestTraffic:** Run tasks after the test listener serves traffic to the replacement task set. The results of a hook function at this point **can trigger a rollback**.

**BeforeAllowTraffic:** Run tasks after the second target group **is associated** with the replacement task set, **but before** traffic is shifted to the replacement task set.\
The results of a hook function at this lifecycle event can trigger a rollback.\
**\[AllowTraffic]**\
**AfterAllowTraffic:** Run tasks after the second target group **serves traffic** to the replacement task set. \
The results of a hook function at this lifecycle event can trigger a rollback.







## Revision

A revision is an **artifact** that contains both application files to deploy and an **AppSpec** configuration file. \
Application files can include compiled libraries, configuration files, installation packages, static media, and other content.\
The AppSpec file specifies what steps AWS CodeDeploy will follow when it performs deployments of an individual revision.&#x20;

A revision must contain any source files and scripts to execute on the target instance inside a root directory. Within this root directory, the appspec.yml file must exist at the topmost level and not in any subfolders.

## Deployment Group

A deployment group designates the **instances** that a revision deploys to.\
When you deploy to Lambda functions, it specifies what **functions** will deploy new versions. Deployment groups also specify **alarms that trigger automatic rollbacks** after a specified **number or percentage** of instances, or functions fail their deployment.

You can add instances to a deployment group **based on tag** name/value pairs **or Auto Scaling group names**. If an instance matches one or more tags in a tag group, it is associated with the deployment group.

An individual application can have **one or more deployment groups** defined. This allows you to separate groups of instances into environments so that changes can be progressively rolled out and tested before going to production.&#x20;

&#x20;If you would like to require that an instance match multiple tags, each tag must be in a separate tag group. A single deployment group supports up to 10 tags in up to three tag groups.

When you create deployment groups, you can also configure the following:

* **Amazon SNS notifications**\
  ****A notification will be sent to the specified topicwhen deployments events occur.\
  The CodeDeploy service role must have permission to publish messages to the topic.
* **Amazon CloudWatch alarms**\
  ****You can configure a CloudWatch alarm (a metric has passed a certain threshold) to trigger cancellation and rollback of deployments. For example, an alarm when CPU utilization exceeds a certain percentage for instances in an _Auto Scaling group_, or based on Lambda function invocation errors.



### Deploy to EC2/On-Premises Instances&#x20;

To configure an on-premises instance to work with AWS CodeDeploy, you must complete several tasks.

* Ensure that the instance has the ability to communicate over HTTPS (port 443)
* Create an _IAM user_ that the instance assumes with permissions to interact with CodeDeploy
* Install the AWS CLI on the instance
* Configure the AWS CLI with an IAM user
* Register the instance with AWS CodeDeploy with command: `aws deploy register [...]`
* Install the AWS CodeDeploy agent with command: `aws deploy install [...]`

#### AWS CodeDeploy Agent

The agent currently supports Amazon Linux (Amazon EC2 only), Ubuntu Server, Microsoft Windows Server, and Red Hat Enterprise Linux, and it is available as an open source repository on GitHub.

When the agent installs, a **codedeployagent.yml** configuration file copies to the instances.\
You can use this file to adjust the behavior of the AWS CodeDeploy agent on instances throughout various deployments. The most common settings are:\
**max\_revisions:** How many application revisions to archive on an instance. If you are experiencing storage limitations on your instances, turn this value down and release some storage space consumed by the agent.\
**root\_dir:** To change the default storage location for revisions, scripts, and archives.\
**verbose:** Set to true to enable verbose logging output for debugging purposes.\
**proxy\_url:** For environments that use an HTTP proxy, this specifies the URL and credentials to authenticate to the proxy and connect to the CodeDeploy service.

### Deploy to Amazon EC2 Auto Scaling Groups

When you deploy to EC2 Auto Scaling groups, CodeDeploy will automatically run the **latest successful deployment** on any new instances created when the group scales out.\
If the deployment fails on an instance, it updates to maintain the count of healthy instances.

For this reason, AWS **does not recommend** that you associate **multiple **_**deployment groups**_ with the same Auto Scaling group (for example, you want to deploy multiple applications to the same Auto Scaling group).\
\- If both deployment groups perform a deployment at roughly the same time\
\- **If the first deployment fails** on the new instance (and the instance is terminated)\
\- The **second deployment**, unaware that the instance terminated, **will not fail until** the deployment **times out** (the default timeout value is 1 hour).\
Instead, you should **combine your application deployments into one** or consider the use of **multiple** Auto Scaling groups with **smaller instance types**.

## Deployment Configurations

### Amazon EC2/On-Premises&#x20;

You can configure either in-place or blue/green deployments.

* **In-Place deployments:**\
  ****Recycle currently running instances and deploy revisions on existing instances.&#x20;
* **Blue/Green deployments:**\
  ****Replace currently running instances with sets of newly created instances.



| Configuration   | In-place                                                                                                                                                                                                                                     | Blue/green                                                                                                                                                                                                                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AllAtOnce**   | <ul><li>Deploys to: <strong>all instances</strong></li><li>Success criteria: <strong>at least once instance succeeded</strong></li><li>Fails if: <strong>all instances fail</strong></li></ul>                                               | <ul><li>Deploys to: <strong>all instances</strong></li><li>Success criteria: <strong>at least once instance succeeded, then routing will change</strong></li><li>Fails if: <strong>the routing fails</strong></li></ul>                                                                           |
| **HalfAtATime** | <ul><li>Deploys to: up to <strong>half</strong> of the instances (rounded DOWN)</li><li>Success criteria: <strong>half</strong> of the instances (rounded UP) <strong>succeeded</strong></li></ul>                                           | <ul><li>Deploys to: up to <strong>half</strong> of the instances (rounded DOWN)</li><li>Success criteria: <strong>half</strong> of the instances (rounded UP) <strong>successfully handle rerouted traffic</strong></li></ul>                                                                     |
| **OneAtATime**  | <ul><li>Deploys to: <strong>one</strong> at a time</li><li>Success criteria: <strong>all</strong> of the instances must succeed, <strong>except the last one</strong><br><strong></strong>(if only one, it must obviously succeed)</li></ul> | <ul><li>Deploys to: <strong>one</strong> at a time</li><li>Success criteria: <strong>all</strong> of the instances must <strong>successfully handle rerouted traffic</strong>, <strong>except the last one</strong><br><strong></strong>(if only one, it must obviously handle traffic)</li></ul> |

### AWS Lambda

When you deploy to Lambda, the deployment configuration specifies the **traffic switching policy** to follow, which stipulates **how quickly** to **route** requests from the original function versions to the new versions.

You can configure CodeDeploy to deploy instances **only** in a **blue/green** fashion. \
This is because CodeDeploy will always deploy updates to new functions.&#x20;

Three methods are supported:

| Method          |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **All-at-Once** | All traffic is shifted at once to the new function versions.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Canary**      | <p>Traffic shifts in <strong>two percentage-based increments</strong>.</p><ul><li>The first increment routes to the new function version, and it is monitored for the number of minutes you define.</li><li>After this time period, the remainder of traffic routes to the new version if the initial increment of request executes.</li></ul><p>A number of built-in canary-based deployment configurations are provided, such as <strong>LambdaCanary10Percent15Minutes</strong>, where, 10% of traffic shifts in the first increment and is monitored for 15 minutes. After this time period, the 90% of traffic that remains shifts to the new function version. You can create additional configurations as needed.</p> |
| **Linear**      | <p>Traffic can be shifted in <strong>a number of</strong> percentage-based <strong>increments</strong>, with a set number of minutes between each increment.</p><p></p><p>A number of built-in linear deployment configurations, such as <strong>LambdaLinear10PercentEvery1Minute</strong></p>                                                                                                                                                                                                                                                                                                                                                                                                                              |





