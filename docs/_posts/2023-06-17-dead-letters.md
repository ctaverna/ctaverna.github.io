---
layout: post
title:  "Design for failure by using Dead Letter Queues (DLQ)"
subtitle: "What are dead letters and why they are essential in any distributed system"
tags: [software architecture, message brokers, messaging, distributed systems]
imgs-path: /assets/img/dead-letters/
cover-img: /assets/img/dead-letters/cover.jpg
permalink: /dead-letters/
---

{: .toc .toc-title}
- [What is a dead letter](#what-is-a-dead-letter)
- [A short off-topic about the name](#a-short-off-topic-about-the-name)
- [Design for failure](#design-for-failure)
- [How to handle errors](#how-to-handle-errors)
  - [Option 1: Retry](#option-1-retry)
  - [Option 2: Lock](#option-2-lock)
  - [Option 3: Discard and continue](#option-3-discard-and-continue)
- [Dead letter queue vs other options](#dead-letter-queue-vs-other-options)
  - [Faster retry and purging](#faster-retry-and-purging)
  - [Observability for free](#observability-for-free)
  - [No custom code](#no-custom-code)
  - [Not so good for analysis](#not-so-good-for-analysis)
- [TLDR](#tldr)


## What is a dead letter
Let's start with a short definition, effective in the context of distributed systems and messaging platforms:

**A *dead letter* is simply a container where *messages* that cannot be delivered are collected and stored.**

This container is usually a queue, but it's not strictly mandatory, the concept is broader and not necessarily based on it.  
This article is not focused on a specific broker or technology, but addresses the subject from a general perspective. Each system has its specificities, and the official documentation is definitely the way to go.

## A short off-topic about the name
The term "dead letter" is due to an expression borrowed by the postal world.  
There are strong analogies between real-world mail deliveries and how, in distributed systems, messages are delivered between software components.  
In the real world, there are many reasons for a letter or a package to be marked as "undeliverable": both recipient and sender addresses are incorrect, the envelope is damaged and addresses are no more readable, both recipient and sender are no more available, the content is not compliant with postal regulations, and many others.  
All postal companies in different countries have faced the problem of handling all undeliverable mail, usually with a dedicated office having the critical responsibility of opening private letters and packages, searching for clues about the recipient or the sender, to finally becoming able to deliver it or move to the extreme solution of destroying or auctioning the content.  
If you like to waste some time reading fun facts, consider googling about the story and the statistics of *Dead Letter Offices* all around the world, you'll find many astonishing numbers and funny stories about strange contents, from alive rattlesnakes to smelly dead fishes, human skulls, bags full of money, drugs, and weapons.  

## Design for failure
Jumping back to the field of distributed systems, when a messaging system has the responsibility of the asynchronous communication between components, it's essential to provide a mechanism to handle the failures.  
This is, in general, a piece of good advice. Like the Amazon CTO Werner Vogels has wisely said: "Everything fails, all the time".  
In other words, the point is not *IF* something will fail, but only *WHEN* this will happen.  
Hence we need to design systems so that they will continue to work, as much as possible, also during and after these foreseeable failures.  

## How to handle errors
Any asynchronous communication can potentially encounter different kinds of problems related to delivery:
- The recipient is not available
- The recipient explicitly refuses the message
- The recipient is not giving an _acknowledge_ to the message

The problem can be transient or persistent, and the consequent action should change accordingly.  
But when a delivery failure happens, the broker between two components has only a few options:
- Try again
- Lock the queue
- Discard the message and continue

### Option 1: Retry
Retrying is a good option for transient errors, but it is useless, when not counterproductive, if the error is persistent.  
Retrying should be done waiting some time between each attempt, through an [exponential backoff algorithm](https://en.wikipedia.org/wiki/Exponential_backoff). In this case, the retry process can take a long time and this results actually in a temporary lock, which can be unacceptable for high-load systems, as discussed in the next bullet point.  
Also, even a transient error, if repeated many times, should be considered in practice a persistent error. An infinite loop is never a good idea, and at a certain point, in any case, it is advisable to stop trying if it is not working.  
We can say that generally speaking retrying is good, but it's usually not enough.

### Option 2: Lock
The option of locking the queue is mandatory when there is a strict constraint about message ordering, but fortunately, this is not the most common scenario. In most cases the distributed systems are designed to handle unordered messages, and _poison messages_ can simply be put aside for retry or future investigation.  
Locking can sometimes be a reasonable option, but in many cases, especially when there is a critical process with a huge quantity of data to be processed, it is simply not acceptable.  
A locked queue means indeed that the queue is growing indefinitely, and this is not sustainable for a long time, and can bring other even worse infrastructure problems. In addition to that, the consumers are not allowed to proceed on a locked queue, and this means that someone (user or software) is not receiving the expected data, experiencing a malfunction or an unexpected delay.

### Option 3: Discard and continue
And here we are to the third option: discard the message and continue to process the others. Here, "discard" doesn't mean to delete the message but means "remove from the queue and put it somewhere".  
This is usually the best option because the consumer can forget the problematic message and continue to work, but the message is not lost and can be analyzed and/or recovered later on.  

## Dead letter queue vs other options
The general concept of _dead lettering_ a message can be carried on in multiple ways.  
Just to list a few, the _poison messages_ could be simply saved into log files, it could be inserted in a database, it could be written to disk in a text file, or it could be saved into an object storage service like AWS S3 or Azure Blob Storage.  
In some specific cases, one of these strategies might even be the best option, but using a dead letter queue has many advantages.

### Faster retry and purging
A _dead letter queue_ is, after all, a normal queue, with all the advantages offered by this kind of entity. For example, it's usually very easy to "*forward*" the messages from the DLQ to the original queue. If the consumer had a bug that meanwhile has been corrected, for example, we can simply re-enqueue the dead-lettered messages, and the new version of the consumer will be now able to process the "old" dead-lettered messages together with the ordinary flow of real-time messages.  
On the contrary, if after an investigation we know that the messages are wrong and can be deleted, with one click we can purge the entire queue.

### Observability for free
If you are using a message broker you likely already have a monitoring platform.  
In this case, it will be almost immediate to activate observability principles also on the DLQ, with very little additional effort. No need to generate custom metrics in your code or analyze log files to understand and count errors, because the broker, if configured properly, can do it for you.  
The rate of messages entering the DLQ, compared with the rate of the main queue, is a good metric for the health status of the process run by the consumers. The absolute quantity of messages in the dead letter is telling us how many failures we had since the last purge, and if the rate has a predictable trend or DLQ is usually empty, these metrics are also good choices for automatic alerts.  

### No custom code
Most brokers, when sending a message to the dead letter, add in the header of the message a field with the reason why this has happened. It may be a broker-generated error like "too many retries" or "message expired", or maybe a consumer-generated and broker-forwarded error like "explicitly nacked with this error message: unknown id".   
The reason for dead-lettering is put inside the message itself, and this comes for free, without writing code, because it is implemented *in the broker*, not in the consumer software.

### Not so good for analysis
The only little disadvantage that I experienced using DLQs, compared to other solutions like a database, is the fact that messages in a queue cannot be easily queried and counted, but can only be peeked one by one. In case of high volumes and considerable quantities of messages ending up in a dead letter, it can be a good idea to attach a consumer and move them into a data store where it is possible to analyze them statistically.  

## TLDR
Dead letter queues are definitely the best place to save error messages and poison messages. Monitoring is richer and easier, re-publishing and purging is super fast and the broker itself owns the responsibility of this process.  
