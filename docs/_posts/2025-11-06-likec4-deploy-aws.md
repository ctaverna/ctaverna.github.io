---
layout: post
title:  "Stop Drawing, Start Coding: Modern AWS Architecture with LikeC4"
subtitle: "A hands-on guide to building interactive architecture models and hosting them live on S3 & CloudFront"
tags: [architecture, cloud architecture, diagrams, documentation, cloud services, aws]
imgs-path: /assets/img/likec4-deploy-aws/
cover-img: /assets/img/likec4-deploy-aws/cover.jpg
permalink: /likec4-deploy-aws/
---

{: .toc .toc-title}
- [What is the C4 Model?](#what-is-the-c4-model)
      - [Context (Level 1)](#context-level-1)
    - [- Containers (Level 2)](#--containers-level-2)
  - [Components (Level 3)](#components-level-3)
  - [Code (Level 4)](#code-level-4)
- [Advantages of "Diagram as Code"](#advantages-of-diagram-as-code)
  - [Speed and Efficiency](#speed-and-efficiency)
  - [Consistency and Accuracy](#consistency-and-accuracy)
  - [Culture and Developer Ownership](#culture-and-developer-ownership)
  - [Maintainability and Automation](#maintainability-and-automation)
- [Why LikeC4 is a Good Option](#why-likec4-is-a-good-option)
- [Let's Build an Example of an Architecture Documentation with LikeC4](#lets-build-an-example-of-an-architecture-documentation-with-likec4)
  - [Step 1: Setting up the Project Structure](#step-1-setting-up-the-project-structure)
  - [Step 2: Defining the Language](#step-2-defining-the-language)
  - [Step 3: The corporate landscape (workspace.c4)](#step-3-the-corporate-landscape-workspacec4)
  - [Step 4: The E-commerce Architecture (model.c4)](#step-4-the-e-commerce-architecture-modelc4)
  - [Step 5: Visualizing the Architecture](#step-5-visualizing-the-architecture)
- [LikeC4 CLI and local testing](#likec4-cli-and-local-testing)
- [Shipping your Architecture Docs to AWS (The Manual Way)](#shipping-your-architecture-docs-to-aws-the-manual-way)
  - [Step 1: Build the Static Site Locally](#step-1-build-the-static-site-locally)
  - [Step 2: Create a Private S3 Bucket](#step-2-create-a-private-s3-bucket)
  - [Step 3: Upload your Files](#step-3-upload-your-files)
  - [Step 4: Configure CloudFront for Secure Delivery](#step-4-configure-cloudfront-for-secure-delivery)
  - [Step 5: View Your Architecture](#step-5-view-your-architecture)
  - [Step 6: Embedding the Diagram (The "Live" Documentation)](#step-6-embedding-the-diagram-the-live-documentation)
    - [The Result](#the-result)
    - [Why this matters](#why-this-matters)
- [What's Next?](#whats-next)

# What is the C4 Model?
The [C4 model](https://c4model.com){:target="_blank"} is an approach for structuring and visualizing software architecture design. It was created by [Simon Brown](https://simonbrown.je){:target="_blank"}.  
It aims to provide different levels of detail, much like maps: from a high-level view down to the code.
It stands for Context, Containers, Components, and Code.

These are the four hierarchical levels of abstraction:  

### Context (Level 1)

The Big Picture. Shows the software system and its relationships to users and other systems.  
**Focus**: Why the system exists and who it interacts with.  
**Audience**: Technical and non-technical stakeholders (everyone).

### Containers (Level 2)

The Deployable Units. Breaks down the system into its major building blocks (e.g., web app, mobile app, database, microservice, serverless function).  
**Focus**: How responsibilities are distributed across separate running processes.  
**Audience**: Technical people (Architects, Developers, Ops).  

### Components (Level 3)

The Modules inside a Container. Zooms into a single Container to show its internal structure.  
**Focus**: How the code is organized into logical groups (e.g., services, repositories, controllers).  
**Audience**: Developers and Architects.  

### Code (Level 4)

The Deepest Detail. Focuses on the implementation details, often using UML, ERDs, or generated code-level diagrams.  
**Focus**: Specific classes, interfaces, and functions.  
**Audience**: Developers.  

![]({{page.imgs-path}}c4-static.png){:.centered .max-width-70}

The key advantages of this approach:  
- **Standardization**: A common language for discussing architecture.
- **Progressive Detail**: Stakeholders can choose the level of detail they need.
- **Clarity**: It focuses on boxes and lines (simple notation) rather than complex UML shapes, making it easier to read.

# Advantages of "Diagram as Code"

When documenting complex modern systems, treating your architecture diagrams as code (Diagram as Code or "D.a.C.") offers significant benefits over traditional drawing tools.

## Speed and Efficiency

- **Faster Creation**: You define the architecture using a text-based language instead of dragging and dropping shapes. This is typically much quicker.
- **Rapid Updates**: Changes to the architecture can be implemented and propagated across multiple diagrams instantly by editing a single source file.
- **Reduced Friction**: No need to open external desktop applications. Diagrams can be edited directly in your IDE (e.g., VS Code).

## Consistency and Accuracy

- **Single Source of Truth**: The architecture definition is in one place. Every diagram level (Context, Container, Component) is guaranteed to be consistent.
- **No Stale Diagrams**: By integrating the diagram source files into your version control system, the diagrams are versioned alongside the code they represent. They are always up-to-date with the codebase.
- **Easy Review**: Diagrams can be reviewed in a Pull Request just like source code. This enforces architectural rigor and collaboration.
- **ADR friendly**: Keeping diagrams updated is a great way to help you identify when a new [Architectural Decision Record]({% link _posts/2023-05-25-adr.md %}) (ADR) should be created. Once your diagrams are aligned, every PR in the code of your diagrams should *probably* be the consequence of a new ADR. And viceversa, of course.

## Culture and Developer Ownership

- **Closer to Code**: Defining architecture in a text file (rather than a GUI tool) makes documentation feel like code. This lowers the barrier to entry for developers.
- **Increased Ownership**: Developers are comfortable with text files, IDEs, and Git. This integration helps the development team take greater ownership of the architecture diagrams, ensuring they are maintained actively.
- **Source of Truth Shift**: The architectural definition lives within the repository, making it a first-class citizen alongside the source code.

## Maintainability and Automation

- **Version Control**: You get a full history of architectural changes, allowing you to track who changed what and when. You can easily revert to previous versions.
- **Text-Based Diff**: Comparing architectural versions becomes simple; Git shows the specific lines of text that changed, not just a binary file difference.
- **Automation**: The text files can be processed and rendered as part of your CI/CD pipeline. This means the documentation is automatically published upon every merge.
- **Searchable**: The architectural definition is plain text, making it easily searchable by developers.

# Why LikeC4 is a Good Option

As a software architect working extensively with AWS and complex distributed systems, I have found that certain tools dramatically improve documentation efficiency.  
This is my opinionated list of the core advantages that make [LikeC4](https://likec4.dev){:target="_blank"} the preferred choice for C4 modeling.

- **Relationship Focus**: Core definition focuses on explicit relationships, accurately mapping communication paths.
- **Interactive Web Viewer**: Generates a fast, modern web application for viewing. Stakeholders can easily navigate and drill down through C4 levels.
- **Easy Deployment**: The output is a static web viewer, perfect for deployment to common cloud services like AWS S3/CloudFront.
- **Embeddable**: Simple to integrate into existing documentation (Confluence, GitBook, etc.).
- **Automatic Layout**: Architects focus only on the elements and relationships; LikeC4 handles the complex visual arrangement, saving time.
- **IntelliSense/Validation**: Integrates with IDEs (e.g., VS Code) for auto-completion and syntax checking, minimizing errors.
- **Tags and Styling**: Easy tagging (e.g., tag:aws-lambda) allows for custom styling, enhancing readability and technology recognition.

# Let's Build an Example of an Architecture Documentation with LikeC4

To truly appreciate the power of Diagrams as Code and LikeC4, let's move from theory to practice.  
We will document a common, modern, cloud-native architecture using LikeC4's DSL (Domain Specific Language).

Imagine we are documenting a small, serverless e-commerce application running on AWS. The system needs to:

- Allow customers to browse products and place orders via a frontend.
- Provide a backend API for processing transactions.
- Store data in a highly scalable and resilient manner.
  
This scenario is perfect for illustrating the C4 Model's multiple views and LikeC4's ability to reuse component definitions.

![]({{page.imgs-path}}whiteboard.png){:.centered .max-width-70}

## Step 1: Setting up the Project Structure

To build a documentation that scales, we shouldn't put everything in one file. We will split our architecture into logical files: global definitions, our specific system, and the views.  

My suggestion is to use VSCode and the great [LikeC4 Extension](https://marketplace.visualstudio.com/items?itemName=likec4.likec4-vscode) that will enable you to see the diagram preview in real time inside VSCode itself.  

![]({{page.imgs-path}}vscode-extension.jpg){:.centered .max-width-70}


First, we create a basic project structure. We will place all our LikeC4 definition files (using the .c4 extension) inside a dedicated ```docs``` directory.

``` bash
my-git-repository/
├── docs/
|   ├── specs.c4             # Define the vocabulary
│   ├── workspace.c4         # Define how the company projects are organized
│   ├── ecommerce/
|       ├── model.c4         # Define the system structure and relations
│       ├── views.c4         # Define the views that we need
└── ...
```

## Step 2: Defining the Language

First, we define our "vocabulary." This ensures consistent styling across all diagrams.
``` bash
// docs/specs.c4

specification {
  element actor {
    style { shape person }
  }
  element system
  element container
}
```

## Step 3: The corporate landscape (workspace.c4)

Here we define the "Global Context."  
This includes, for example, an External Warehouse System that provides stock data.
``` bash
// docs/workspace.c4

// External systems
model {

  // External System defined at the corporate level
  warehouse_api = system "Warehouse Management System" {
    description "External legacy system providing stock availability."

    style {
      color muted
    }
  }
}
```

## Step 4: The E-commerce Architecture (model.c4)

Now, we define our internal system.  
Notice, as a suggested best practice, how relationships are defined inside the source element (the active actor).

``` bash
// docs/ecommerce/model.c4

model {

  customer = actor "Customer" "A retail customer" {
      description "A user who browses and purchases products via the e-commerce platform."
      
      // High level relationship to the ecommerce system
      -> ecommerce "Uses"
      // Define how the user enters the system
      -> ecommerce.static_assets "Browses via Browser"
    }


  ecommerce = system "E-commerce Platform" {
    description "Allows customers to browse and purchase products online."
    
    // High level relationship to external warehouse system
    -> warehouse_api "Checks stock availability from"

    // 1. Frontend Layer
    spa = container "Web Portal" "React Application" {
      -> api_gateway "Sends requests to"
    }

    static_assets = container "S3 Bucket" "Static Web Hosting" {
      -> spa "Serves JS/Assets to"
    }

    // 2. API Layer
    api_gateway = container "API Gateway" "REST Interface" {
      -> order_service "Routes requests to"
    }

    // 3. Logic Layer
    order_service = container "Order Lambda" "Node.js / TypeScript" {
      description "Handles order placement and validation."
      
      -> db "Reads/Writes data"
      -> inventory_proxy "Requests stock check"
    }

    inventory_proxy = container "Inventory Lambda" "Python" {
      description "Integrates with external warehouse."
      
      // Relationship to external system defined here (the caller)
      -> warehouse_api "Fetches stock levels via REST API"
    }

    // 4. Data Layer
    db = container "Products & Orders" "DynamoDB" {
      description "Stores product catalog and order information."
      style {
        shape cylinder
      }
    }
  }
}
```

## Step 5: Visualizing the Architecture

Finally, we create some sample views.  
LikeC4 allows for very clean view definitions with powerful filtering.

``` bash
// docs/ecommerce/views.c4

views {

  // 1. System Context View
  view index {
    title "System Context - E-commerce Platform"
    include *
    exclude ecommerce.* // Only show the high-level boundaries
  }

  // 2. Backend Container View (AWS focus)
  view containerView of ecommerce {
    title "AWS Backend Architecture"
    
    // Include backend containers within ecommerce plus the external warehouse

    include ecommerce
    include ecommerce.api_gateway
    include ecommerce.order_service
    include ecommerce.inventory_proxy
    include ecommerce.db
    include warehouse_api

    autoLayout LeftRight
  }

  // 3. Specific focus on Inventory Integration
  view inventoryFlow of ecommerce {
    title "Integration Detail: Inventory Check"
    include 
      ecommerce.order_service,
      ecommerce.inventory_proxy,
      warehouse_api
  }
}
```

# LikeC4 CLI and local testing

If you have used VSCode and LikeC4 extension you have already seen how it works in the live preview inside VSCode, but now it's time to see the real power of this solution.

With just these four files in our local directory, we have defined a full, navigable C4 model.
Now, let's install LikeC4 CLI:

``` bash
npm install -D @likec4/cli
```

Check LikeC4 binary installation and version:

``` bash
likec4 --version
```

And finally start a local dev server to preview LikeC4 views:

``` bash
likec4 start
```

This will start the local server and open your browser at the address ```http://localhost:5173```.  
The first web version of our DaC is now available and ready to be explored:

![Search rate]({{page.imgs-path}}likec4-web-version.png)

Feel free to play with your local deployment, enjoying the features of LikeC4.  
This is just a first release of our diagrams, in future articles we will improve the styling and will deep dive into best practices, but I think that for now it's enough to understand the power.

If everything is like expected, we are finally ready to deploy our brand new DaC on AWS.

# Shipping your Architecture Docs to AWS (The Manual Way)
Now that we have our .c4 files ready, it’s time to move from "Code" to "Cloud".  
In this section, we will manually build our documentation and host it on AWS.  
We’ll use Amazon S3 for storage and Amazon CloudFront as our Content Delivery Network (CDN) to serve our diagrams securely via HTTPS.

## Step 1: Build the Static Site Locally

First, we need to transform our DSL into a set of web-ready files. LikeC4 CLI tool can generate an optimized Single Page Application.

Run the following command:

``` bash
# Generate the static site in the 'dist' folder
likec4 build -o ./dist
```

Inside the ./dist folder, you will now see an index.html file and an /assets folder.  
This is your entire architecture portal, ready to be hosted.

## Step 2: Create a Private S3 Bucket

Even though we are hosting a website, we won't use the "S3 Static Website Hosting" feature.  
Instead, we’ll keep the bucket private and serve the content exclusively through CloudFront for better security and performance.

- Log into the AWS Management Console, navigate to S3 and create a new bucket.
- Choose a bucket name in your preferred region
- Object Ownership: Leave as "**ACLs disabled.**"
- Block Public Access settings: Keep "**Block all public access**" checked.
- Bucket versioning: not needed

## Step 3: Upload your Files

Now open your newly created bucket.

- Click Upload
- Drag and drop all the contents of your local dist folder (not the folder itself, just the files inside) into the S3 console.
- Confirm and upload the files (~5MB)

## Step 4: Configure CloudFront for Secure Delivery

Now, we’ll set up CloudFront to act as the gateway to our private S3 bucket.

- Navigate to the CloudFront console and click Create distribution (Free plan is ok).
- Type a name and continue
- Origin type: S3
- S3 Origin: Select your S3 bucket from the dropdown
- Default root object: "index.html"
- Private S3 bucket access: Leave the default settings
- Security options: Leave the default settings
- Cache settings: Leave the default settings
- Click Create distribution and wait the deployment to be completed

## Step 5: View Your Architecture

It will take a few minutes for the CloudFront distribution to deploy (Status: "Enabled").

- Find and copy your distribution domain name (e.g., abcdd123456789.cloudfront.net).
- Paste it into your browser.

Congratulations! You now have a professional, secure, and globally available architecture documentation site.  
Your stakeholders can now navigate through the layers of your AWS system, from the high-level Context down to specific Lambda components.

Here is my [LikeC4 demo deployment](https://d39cysq6ourkgr.cloudfront.net){:target="_blank"} if you want to take a look.

## Step 6: Embedding the Diagram (The "Live" Documentation)

Now that our architecture is live on CloudFront, we can do something powerful: embed it directly into our technical documentation, wiki, or even this blog article.

Unlike a static PNG export, embedding the interactive viewer allows your readers to zoom, pan, and click to navigate between the views without leaving your page.  
Plus, since it points to your CloudFront URL, whenever you update the code and redeploy, your blog post will be automatically updated with the latest architecture!

Here is the simplest way to do it using a standard HTML iframe:

```html
<iframe 
  src="https://abcd123456789.cloudfront.net/index.html?view=myView" 
  width="100%" 
  height="500px" 
  style="border: 1px solid #e5e7eb; border-radius: 8px;"
></iframe>
```

### The Result

Below is an example of how the interactive diagram looks embedded right here:

<iframe 
  src="https://d39cysq6ourkgr.cloudfront.net" 
  width="100%" 
  height="500px" 
  style="border: 1px solid #a3a3a4ff; border-radius: 6px;"
></iframe>


### Why this matters

As already said, there are several advantages with this approach:

- **Interactivity**: Stakeholders can explore the model themselves.
- **Single Source of Truth**: You don't need to copy-paste screenshots every time you rename, add or update something.
- **Contextual Deep Links**: You can link directly to specific views (e.g., ?view=myView) to highlight specific discussions in your online documentation, wiki or article.
  
# What's Next?

Manual deployment is great for learning, but in real-world "Architecture as Code" or "Diagram as Code" workflows, we want this to happen automatically whenever we commit changes.  
This blog post was just the first taste of LikeC4. In the next articles, we will deep dive into all LikeC4 features, improve the styling, the files structure, and automate the entire Diagram as Code process using tools like Terraform and GitHub Actions.