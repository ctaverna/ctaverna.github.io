---
title: "CodePipeline"
subtitle: "Orchestrate the steps of your pipelines"
is-folder: false
subcategory: "tools"
sequence: 4
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [Main entities](#main-entities)
- [Actions](#actions)


The main service to orchestrate the steps of your pipelines, model and visualize your software release processes.

## Main entities

* **Pipeline**\
  The overall workflow that defines what transformations software changes will undergo.\
  You cannot change the name of a pipeline, you must create a new pipeline.\
  &#x20;A pipeline must have two or more _stages_.&#x20;
* **Revision** \
  The work item that passes through a pipeline.\
  It can be a _change_ to your source code or data stored in CodeCommit, GitHub or the version of an archive in Amazon S3 (with versioning enabled).\
  A pipeline can have _multiple revisions_ flowing through it at the same time, but a single stage can process one revision at a time.\
  A revision is immediately picked up by a source _action_ when a change is detected (such as a commit to an AWS CodeCommit repository).
* **Stage** \
  A _group_ of one or more _actions_.\
  Each stage must have a unique name.\
  If one action in a stage fails, the entire stage fails for this revision.\
  If all actions in a stage complete successfully, it passes to the next stage in the pipeline.
* **Action**\
  Defines the work to perform on the revision.\
  You can configure pipeline actions to run _in series_ or _in parallel_.\
  Every action in the same stage must have a unique name.\
  The first stage, and only the first, includes one or more _source actions_.
*   **Artifact**\
    Acts on a file or set of files, to provide a final result or version of the files.\
    For example, an artifact that passes from a _build action_ would deploy to Amazon EC2 during a _deploy action_. Multiple actions in a single pipeline cannot output artifacts with the same name.

    For example, the output artifact of a source action would be an archive (.zip) containing the repository contents, which would then act as the input artifact to a build action. For an artifact to transition between stages successfully, you must provide unique input and output artifact names.
* **Transition**\
  ****Connect _stages_ in a pipeline and define which stages should transition to one another.\
  When all actions in a stage complete successfully, the revision passes to the next stage(s) in the pipeline.\
  You can manually disable transitions, which stops all revisions in the pipeline:\
  \- Once you enable the transition again, the most recent successful revision resumes.\
  \- Other previous successful revisions will not resume through the pipeline at this time.

## Actions

*   **Source action**\
    ****Defines the location where you store and update source files.\
    Modifications to files in a source repository or archive trigger deployments to a pipeline.\
    CodePipeline supports these sources: S3,  CodeCommit, GitHub

    If the pipeline contains multiple source actions, if a change is detected in one of the sources, all source actions will be invoked.
* **Build action**\
  Defines tasks such as _compiling_ source code, running _unit tests_, and performing other tasks that _**produce output artifacts**_ for later use in your pipeline.\
  For example, you can use a build stage to import large assets that are not part of a source bundle into the artifact. CodePipeline supports the integrations for the following build actions: CodeBuild, CloudBees, Jenkins, Solano CI TeamCity
* **Test action**\
  Run various **tests against source and compiled code**, such as lint or syntax tests on source code, and unit tests on compiled, running applications.\
  CodePipeline supports the following test integrations: CodeBuild, BlazeMeter, Ghost Inspector, Hewlett Packard Enterprise (HPE) StormRunner Load, Nouvola, Runscope.
* **Deploy action**\
  ****Responsible for taking compiled or prepared assets and installing them on instances, on-premises servers, serverless functions, or deploying and updating infrastructure using AWS CloudFormation templates.\
  The following services are supported as deploy actions: CloudFormation, CodeDeploy, ECS, Elastic Beanstalk, OpsWorks Stacks, Xebia Labs
* **Approval action**\
  Manual gate that controls whether a revision can proceed to the next _stage_ in a pipeline.\
  The purpose of this action is to allow manual review of the code or other quality assurance tasks prior to moving further down the pipeline. \
  Further progress by a revision is halted until a manual approval by an IAM user or IAM role occurs (codepipeline:PutApprovalResultaction must be included in the IAM policy).\
  Approval actions cannot occur within source stages.\
  You must approve actions manually within 7 days; otherwise CodePipeline rejects the code.\
  When an approval action rejects, the outcome is equivalent to when the stage fails.
* **Invoke** \
  ****Invoke actions execute Lambda functions, which allows arbitrary code to be run as part of the pipeline execution. Uses cases can include:\
  \- Backing up data volumes, S3 buckets, or databases\
  \- Interacting with third-party products, such as posting messages to Slack channels\
  \- Running test interactions with deployed web applications\
  \- Updating IAM Roles to allow permissions to newly created resources

****

{: .box-warning}
In some architectures, environments may be spread across multiple AWS accounts.\
If an organization has separate accounts for development, test, and production workloads, you can leverage one pipeline to deploy to resources in all three.

{: .box-warning}
A source action of Amazon S3 cannot reference buckets in accounts other than the pipeline account.
