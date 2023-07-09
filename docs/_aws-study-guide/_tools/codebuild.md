---
title: "CodeBuild"
subtitle: "Managed build server"
is-folder: false
subcategory: "tools"
sequence: 5
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [Build Projects](#build-projects)
- [Build Specification (buildspec.yml)](#build-specification-buildspecyml)
- [Build Environments ](#build-environments-)
- [Builds](#builds)
- [Limits ](#limits-)


Managed build server that **compiles** source code, executes **tests** and **builds** software packages.

Comes with prepackaged build environments for most common workloads and build tools (Apache Maven, Grade, and others), and it allows you to create custom environments for any custom tools or processes.

Includes built-in integration with CodePipeline, and can act as a **provider for any build or test actions** in your pipelines.

* Continuously scale and process several builds in **parallel**
* You can create **custom build environments** using Docker images
* Native integration with AWS CodePipeline and Jenkins
* Languages supported:
  * .NET: C#, F#, VB.net, etc.
  * Java e JVM: Java, Scala, JRuby
  * Go
  * iOS: Swift, Objective-C

How does it work:

1. Download source code
2. Runs commands from **buildspec.yml** using temporary containers
3. Send build logs to cloudwatch
4. Save the built artifacts to S3



## Build Projects

Build projects define all aspects of a build: the **environment** in which to perform builds, any **tools to include** in the environment, the actual build **steps to perform**, and **outputs to save**.

CodeBuild supports **caching**, that saves some components of the build environment to reduce the time to create environments when you submit build jobs.

Every build project requires an IAM **service role** that is accessible by AWS CodeBuild.\
When you create new projects, you can automatically create a service role that you restrict to this project only. You can update service roles to work with up to 10 build projects at a time.

When you set **environment variables**, they will be visible in **plain text** in the AWS CodeBuild console and AWS CLI or SDK. If there is sensitive information that you would like to pass to build jobs, consider using the **AWS Systems Manager Parameter Store**. This will require the build project’s IAM role to have permissions to access the parameter store.



## Build Specification (buildspec.yml)

The buildspec.yml file can provide the build specification to your build projects.\
You can supply only one build specification to a build project.

<details>

<summary>Example of buildspec.yml</summary>

```yaml
version: 0.2
 
env:
  variables:
    key: "value"
  parameter-store:
    key: "value"
            
phases:
  install:
    commands:
      - command
  pre_build:
    commands:
      - command
  build:
    commands:
      - command
  post_build:
    commands:
      - command
artifacts:
  files:
    - location
  discard-paths: yes
  base-directory: location
cache:
  paths:
    - path

```

</details>

* **Version**: use the latest version whenever possible
* **Environment Variables (env):** optional environment variables to build jobs. Any variables that you define here will overwrite those you define elsewhere in the build project, such as those in the container itself or by Docker.
* **Phases** The phases mapping specifies commands to run at each stage of the build job.\
  If a command fails in any stage, subsequent stages will not run.\
  \- _install_: Commands to execute during installation of the build environment.\
  \- _pre\_build_: Commands to be run before the build begins.\
  \- _build:_ Commands to be run during the build.\
  \- post\_build:  Commands to be run after the build completes.
* **Artifacts:** Specifies where AWS CodeBuild will place output artifacts, if any. Required only if your build job produces actual outputs. \
  The files list specifies individual files in the build environment that will act as output artifacts. You can specify individual files, directories, or recursive directories. You can use discard-paths and base-directory to specify a different directory structure to package output artifacts.&#x20;
* **Cache** If you configure caching for the build project, the cache map specifies which files to upload to Amazon S3 for use in subsequent builds.\


## Build Environments&#x20;

A build environment is a Docker image with a preconfigured operating system, programming language runtime, and any other tools that CodeBuild uses.\
AWS CodeBuild maintains its own repository of preconfigured build environments.\
If these environments do not meet your requirements, you can use public Docker Hub images.\
Alternatively, you can use container images in Amazon Elastic Container Registry (Amazon ECR).&#x20;

&#x20;CodeBuild provides build environments for Ubuntu and Amazon Linux operating systems, and it supports the following: Android, Docker, Golang, Java, Node.js, PHP, Python, Ruby, .NET Core.

## Builds

When you initiate a build, AWS CodeBuild copies the input artifact(s) into the build environment. According to the build specification is run the build process, which includes any steps to perform and outputs to provide after the build completes.

Build logs are made available to Amazon CloudWatch Logs for real-time monitoring.

## Limits&#x20;

Build projects per region per account: **1,000**\
Build timeout: **8 hours** \
Concurrently running builds: **20**

