---
title: IronMQ v3 On Premise
layout: default
section: mq-v3
---

IronMQ is a full featured high-performance messaging solution. Previously, we
offered IronMQ in two hosting configurations (multi-tenant or dedicated).
Our new on-premise product is the first to allow you to run our software in your
own dedicated cloud.

# Overview

IronMQ On Premise features a new, robust distributed database to power queues
and queue metadata. This new foundation ensures that the product will run as well on
your infrastructure as it does on ours.

- **High performance** - we run the same software in our hosted environments supporting
many queues at high throughputs
- **High availability** - we host this software in multiple clouds and have remained
available through outages
- **Scalable** - IronMQ scales horizontally, and every node is homogeneous. Simply add more nodes to the system to scale up the number of queues.
- **Redundant** - message data and queue metadata are replicated to multiple nodes, and
the database can do snapshot backups..
- **Simple to configure** - our [installation](/mq/3/on-premise/installation) takes
a few minutes, and we also offer a quick setup process using [Terraform](https://terraform.io/).

# Getting Started

We provide IronMQ on premise in [Docker](https://docker.com) containers. This means
that almost any cloud (or even bare metal server) that runs Docker can run IronMQ.

Please [read our system requirements](/mq/3/on-premise/system_requirements.html) to ensure
that IronMQ will run efficiently on your infrastructure.

Once you're done, you're ready to [install IronMQ On Premise](/mq/3/on-premise/installation)

(If you've already installed IronMQ On Premise, please see our
[management guide](/mq/3/on-premise/management))
