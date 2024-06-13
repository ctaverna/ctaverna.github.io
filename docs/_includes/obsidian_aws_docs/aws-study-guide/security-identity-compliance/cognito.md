- [Amazon Cognito](#amazon-cognito)
	- [User pools](#user-pools)
	- [Identity pools](#identity-pools)


![service-logo](/assets/img/aws-icons/Arch_Amazon-Cognito_64.png)
# Amazon Cognito

Fully-managed service that provides **authentication, authorization, and user management** for web and mobile apps.

* ***Amazon Cognito Sync store***
  Authenticate users using third-party social identity providers or create your own identity store.
* ***Amazon Cognito Sync***
  Synchronize identities across multiple devices and the web.

The two main components are _user pools_ and _identity pools, and_ can be used separately or together.

*   **User pools**
	User directories that provide sign-up and sign-in options for your app users.
* **Identity pools**
	Enable you to grant your users access to other AWS services.

## User pools

* Sign-up and sign-in **services**.
* A built-in, customizable **web UI** to sign in users.
* **Sign-in with social** like Facebook, Google, Login with Amazon, and Sign in with Apple
* **Sign-in with SAML IdP** from your user pool.
* **User directory** management and user profiles.
* **Security features** such as multi-factor authentication (**MFA**), checks for compromised credentials, account takeover protection, and phone and email verification.
* **Customized workflows** and **user migration** through AWS Lambda triggers.

After successfully authenticating a user, Amazon Cognito issues **JSON web tokens (JWT)** that you can use to secure and authorize access **to your own APIs**, or exchange for **AWS credentials**.

## Identity pools

Enable you to **create unique identities** for your users and **federate** them with **identity providers**.\
You can obtain temporary, limited-privilege AWS credentials to access other AWS services.


Identity providers supported:

* Public providers: Amazon, Facebook, Google, Apple.
* Amazon Cognito user pools
* Open ID Connect providers
* SAML identity providers
* Developer authenticated identities



