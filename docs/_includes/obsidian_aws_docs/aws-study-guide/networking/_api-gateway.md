---
title: "API gateway"
subtitle: "Create, publish, maintain, monitor, and secure APIs at any scale"
is-folder: false
subcategory: networking
sequence: 5
layout: aws_study_guide_page
---

{: .toc .toc-title}
- [API Gateway](#api-gateway)

# API Gateway

* Host and use **multiple versions and stages** of your APIs
* Create and distribute **API Keys**
* Prevents exposing endpoints
* Protection from DDoS and injections
  

## Request validation
Basic validation of an API request before proceeding with the integration request, reducing unnecessary calls to the backend
Validation fails > 400 error response to the caller > validation results in CloudWatch Logs. 

You can validate a request body by verifying that required request parameters are **valid and non-null** or by specifying a **model schema** for more complicated data validation.

## Lambda auhorizer
A _Lambda authorizer_ (formerly known as a _custom authorizer_) is an API Gateway feature that uses a Lambda function to control access to your API.

- Client makes a request
	- API Gateway calls your Lambda authorizer
		- Lambda takes the caller's identity as input
		- Lambda returns an IAM policy as output.

There are two types of Lambda authorizers:

- **_Token-based_** Lambda authorizer (also called a `TOKEN` authorizer) receives the caller's identity in a bearer token, such as a JSON Web Token (JWT) or an OAuth token.
- **_Request parameter-based_** Lambda authorizer (also called a `REQUEST` authorizer) receives the caller's identity in a combination of headers, query string parameters, [stageVariables](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html#stagevariables-template-reference), and [$context](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html#context-variable-reference) variables.
	  For WebSocket APIs, only request parameter-based authorizers are supported.


**.....WIP.....**