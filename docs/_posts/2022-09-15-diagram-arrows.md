---
layout: post
title:  "Software architecture diagram arrows"
subtitle: "How to manage a relationship that sometimes \"it's complicated\""
tags: [software architecture, diagrams]
imgs-path: /assets/img/diagram-arrows/
cover-img: /assets/img/diagram-arrows/cover.jpg
permalink: /diagram-arrows/
---

{: .toc .toc-title}
- [It's just an arrow!](#its-just-an-arrow)
- [Ok, that's not just an arrow](#ok-thats-not-just-an-arrow)
- [So what?](#so-what)
- [TLDR](#tldr)


# It's just an arrow!

Arrows are used in almost every types of diagrams, and software architectural diagrams are no exception.

Although it may seem something obvious, almost elementary, the meaning of arrows is by no means a universal concept.

Let’s take a minimal, clear and simple scheme:

![]({{page.imgs-path}}a-b.jpg){:.centered}

{:.image-caption .text-align-center}
Component A has *some relation* with component B


# Ok, that's not just an arrow

The clarity is only apparent, because observing these two components connected by an arrow we can imagine many different interpretations, each of which does make sense but with very different meanings:

- A **calls** B
- A **depends** on B
- A is a **client** of B
- A **calls an API** exposed by B
- There is **data stream** from A to B
- A **sends a message** to B

I can stop here because the sense is definitely clear. Some of these interpretations are partly overlapping, but excluding the nuances of meaning we can reduce them to two fundamental relationships, however diametrically opposed:

{: .box-warning}
A **sends data to** B

{: .box-warning}
A **makes a request to** B  
(therefore assuming that B will sends some data back to A)

If the *signifier* assumes an opposite *signified* for different recipients, it's clear that we have a problem. The primary purpose of drawing a diagram is usually to clarify the relationships between different components, so it is not acceptable to communicate in such an ambiguous way.

There are also other aspects, definitely no less mportant, that an arrow itself is not able to express: is the communication synchronous or asynchronous? Is it a single call or there are dozens of them? If the recipient of the arrow is a database, is it a query or an update? If it’s a message, is it an event, a publish/subscribe stream, or a double channel for request/response? Is it an HTTP or grpc call? Or maybe it’s a TCP socket connection?

A single diagram cannot provide all the answers, and this is the reason why I think that when you draw a good diagram you should try to provide only **some** information, as clearly as possible.

# So what?

DISEGNARE LEGENDA A MANO LIBERA ED ESEMPI DI FRECCE CON TESTO

![](/assets/img/hello_world.jpeg){: .float-right .max-width-50}

To add details there are only a couple of possibilities:
- adding a **label** to each arrow, which is not always the best option because the diagram will lose readability
- introduce a **legend**, to give each type of arrow an understandable and ideally universal meaning

In both cases there is a trade off between readability and explicitness.

![](/assets/img/hello_world.jpeg){: .float-right .max-width-50}

In addition to a good **title** defining the purpose of the diagram, in my experience it is also important that the diagram comes with a short **description** to help the reader interpreting the diagram, providing a high-level overview.

Obviously writing a description or a legend are time-consuming activities, and therefore you have to evaluate the cost/benefit ratio.

Fortunately, in some cases the **context** can be very useful to clarify the meaning of an arrow, or any other symbol within a diagram, but it's risky assuming that the context is clear to everyone and that any recipient will always be able to understand what we have in mind.

Of course if the recipients of the diagram are people with whom you usually work, there is likely a kind of *shared common language*, so in most cases it's not necessary to be super specific. Also, in case of doubt it's easy to ask for a clarification.  
But when the diagram is going to be shared with another team, it is definitely a good idea to spend some extra time to make it as much clear as possible. This can minimize the likelihood of future misunderstandings, which could cost much, much more.

![]({{page.imgs-path}}prehistoric.png){: .float-right .max-width-50}

# TLDR
There's no secret recipe.  
An arrow itself just tells that **probably** at least one of the connected parts is aware that the other one exists.  
To add more information you have to add details, and the tough part is to decide how much it makes sense to be detailed.