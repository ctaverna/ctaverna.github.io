---
title: "CDK"
subtitle: "Cloud Development Kit, an open source framework to define cloud application resources using familiar programming languages"
is-folder: false
subcategory: "tools"
sequence: 3
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [Main components](#main-components)
- [CDK construct levels](#cdk-construct-levels)


Open source SDK to abstract IaC with known programming languages.

Available languages: _Python, Java, C#, TypeScript, Go_

#### Main components

* Core Framework
* AWS Construct Library
* AWS CDK CLI

Source code -> CDK CLI -> CloudFormation template -> AWS CloudFormation -> Deploy

#### CDK construct levels

* **L3+** Purpose built constructs (opinionated abstractions, multi-service)
* **L2** AWS constructs
* **L1** CloudFormation base constructs

