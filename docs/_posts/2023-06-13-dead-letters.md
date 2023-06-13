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

## A short off topic about the name
The term "dead letter" used in this context is due to the expression borrowed by the postal world.  
There are strong analogies between real world deliveries and the messaging between software components in distributed systems. These analogies have strongly influenced the naming itself.  
In the real workd the reasons for a letter or a package to be marked as "undeliverable" are many: both recipient and sender addresses are incorrect, the envelope is damaged, both recipient and sender are no more available, the content is not compliant with postal regulations, and many others.  
All postal companies in different countries have faced the problem of handling undeliverable mail, usually with a dedicated office having the critical responsibility of opening the letters searching for clues about the real recipient, and the extreme solution of auctioning the content or destroying it.  
If you like to waste some time reading fun facts, consider googling [the story and the statistics](https://international.thenewslens.com/article/30102) of *Dead Letter Offices* all around the world, you'll find many astonishing numbers and funny stories about strange contents, from alive snakes to bags full of money, drugs, and weapons.

## Dead lettering advantages
Jumping back in the field of distributed systems, when a messaging system has the responsibility of the asynchronous communication between components, it's essential to provide a mechanism to handle the failures.  
This is a general good advise, because as Werner Vogels said: "Everything fails, all the time".  
And we need to design systems so that they will continue to work, as much as possible, also **during** and **after** the failures.  

Any asynchronous communication can potentially encounter many kinds of different problems:
- The recipient is not available
- The recipient is available but it's not working correctly
- The recipient cannot correctly handle the request
The problem can be transient or persistent, and the consequent action changes.  

The point is that when **any kind** of failure happens, the broker between two components has only two options:
- Lock the queue
- Discard the message and continue

The first option is mandatory when there are strict constraints on message ordering, but fortunately this is not the most common scenario. In most cases the distributed systems are designed to be able to handle unordered messages, and poison messages can simply be put aside for retry or future investigations.




## TLDR
