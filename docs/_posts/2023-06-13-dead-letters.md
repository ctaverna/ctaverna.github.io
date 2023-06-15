---
layout: post
title:  "Design for failure by using Dead Letter Queues (DLQ)"
subtitle: "What are dead letters and why they are essential in any distributed system"
tags: [software architecture, documentation]
imgs-path: /assets/img/dead-letters/
cover-img: /assets/img/dead-letters/cover.jpg
permalink: /dead-letters/
---

{: .toc .toc-title}
- [What is a dead letter](#what-is-a-dead-letter)
- [A short off topic about the name](#a-short-off-topic-about-the-name)
- [Dead lettering advantages](#dead-lettering-advantages)
- [TLDR](#tldr)


## What is a dead letter
Let's start from a short definition, effective in the context of distributed systems and messaging platforms:  
A *dead letter* is simply a container where *messages* that cannot be delivered are collected and stored.
This container is usually a queue, but it's not strictly mandatory, the concept is broader and not necessarily based on it.  
This article is not focused on a specific broker or technology, but addresses the subject from a general perspective. Each system has his own specificities, and its official documentation is definitely the way to go. 

## A short off topic about the name
The term "dead letter" is due to an expression borrowed by the postal world.  
There are strong analogies between real world mail deliveries and how, in distributed systems, messages are delivered between software components.
In the real world the reasons for a letter or a package to be marked as "undeliverable" are many: both recipient and sender addresses are incorrect, the envelope is damaged and addresses are not readable, both recipient and sender are no more available, the content is not compliant with postal regulations, and many others.  
All postal companies in different countries have faced the problem of handling these undeliverable mails, usually with a dedicated office having the critical responsibility of opening private letters and packages, searching for clues about the recipient or the sender, to finally become able to deliver or move to the extreme solution of auctioning the content or destroying it.  
If you like to waste some time reading fun facts, consider googling about the story and the statistics of *Dead Letter Offices* all around the world, you'll find many astonishing numbers and funny stories about strange contents, from alive rattlesnakes to smelly dead fishes, human skulls, bags full of money, drugs, and weapons.

## Design for failure
Jumping back in the field of distributed systems, when a messaging system has the responsibility of the asynchronous communication between components, it's essential to provide a mechanism to handle the failures.  
This is a general good advise, because as Werner Vogels, CTO at Amazon, wisely said: "Everything fails, all the time".  
In other words the point is not *IF* something will fail, but only *WHEN* this will happen.  
Hence we need to design systems so that they will continue to work, as much as possible, also **during** and **after** those failures.  

## How to handle errors
Any asynchronous communication can potentially encounter many kinds of different problems:
- The recipient is not available
- The recipient explicitly refuses the message
- The recipient cannot correctly handle the request and is not giving an _acknowledge_ to the message
The problem can be transient or persistent, and the consequent action changes accordingly.  

When **any kind** of failure happens, the broker between two components has only a few options:
- Try again
- Lock the queue
- Discard the message and continue

### Retry
Retrying is a good option for transient errors, but it is a complete nonsense if the error is persistent.  
Retrying should be done waiting some time between each attempt, through an [exponential backoff algorithm](https://en.wikipedia.org/wiki/Exponential_backoff). In this case the retry process can take time and this obviously generates another problem, because results in a temporary lock that can be unacceptable.  
Also, even a transient error, if repeated many times, should be considered as a persistent error. An infinite loop is never a good idea, and at a certain point, in any case, we will have to stop trying if it is not working.  
We can say that generally speaking retrying is good, but it's usually not enough.

### Lock
The option of locking the queue is mandatory when there is a strict constraint about message ordering, but fortunately this is not the most common scenario. In most cases the distributed systems are designed to handle unordered messages, and _poison messages_ can simply be put aside for retry or for future investigation.  
Locking can be a reasonable option, but in many cases it is simply not acceptable. A locked queue means that the queue is growing indefinitely, and this is clearly not sustainable for a long time, and can bring to other even worse problems. In addition to that, the consumers are not allowed to proceed on a locked queue, and this means that someone (user or software) is not receiving the expected data, experiencing a malfunction or an unexpected delay.

### Discard and continue
And here we are to the third option: *discard and continue*, when "discard" means "remove from the queue and put it somewhere".  
This is usually the best option, because the consumer can forget the message and continue to work, but the message is not lost and can be recovered.  

## Dead letter vs other options
The general concept of _dead lettering_ a message can be carried on in multiple ways.  
Just to list a few, the poison message could be simply saved into log files, it could be inserted in a database, it could be written to disk in a text file, or it could be saved into an object storage service like AWS S3 or Azure Blob Storage.  
In some specific case one of these strategies could be the best option, for many different reasons, but the option of using a dead letter queue has many advantages.

### Easier retry and purging
A _dead letter queue_ is, after all, a queue, with all the advantages offered by this kind of entity. For example is easy to "forward" the messages from the DLQ to the original queue. If there was a bug that has been corrected, for example, we can simply re-enqueue the dead-lettered messages, and the new consumer will be now able to process the "old" messages, together with the ordinary flow of real time messages.  
On the contrary, if after an investigation we know that the messages are wrong and can be deleted, with one click we can purge the entire queue.

### Observability
If you are using a message broker you likely already have a monitoring platform.  
In this case it will be almost immediate to enable observability principles also on that queue, without additional effort. The rate of messages entering the DLQ, compared with the rate of the main queue, is a good metric about the health status of the process run by the consumers. The quantity of messages in the dead letter is telling us how many failures we had since last purge, and if fhe DLQ is usually empty, this metric is a good choice for automatic alerts.

### Easier investigations 
Most brokers, when sending a message to the dead letter, add in the header of the message a field with the reason why this has happened. It may be something like "too many errors", or "explicitly nacked by consumer with message: unknown id", or "message expired - time to live has elapsed".  
The advantage is that the reason is put inside the message itself, and this comes for free, without writing code.


## TLDR
