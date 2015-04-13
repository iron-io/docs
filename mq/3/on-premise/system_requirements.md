---
title: IronMQ v3 On Premise - System Requirements
layout: default
section: mq-v3
---

IronMQ uses modern hardware & software technologies to achieve exponential
performance gains over older alternatives. This page details the minimum
system requirements that your cloud will need to ensure that IronMQ runs
efficiently.

# Software requirements

We distribute IronMQ in [Docker](https://docker.com) containers, so your operating
system must have Docker 1.5.0 installed and running. We recommend that you run
[CoreOS](http://coreos.com/) because it has already has Docker as well as additional
software that will make High Availability cluster installation and management
significantly easier.

# Hardware requirements

IronMQ can run on virtual machines or 'bare metal' hardware with at least the following:

* __RAM__: 8GB+
* __CPU__: 2+ CPU (on VMs, IronMQ needs 4 VCPUs)
* __Storage__: 64GB SSD Drive. IronMQ persists messages that flow through the
system. Spinning disk drives will significantly slow the system. As your
enqueue and dequeue rates change, storage requirements may change.
* __Nodes__: Minimum 3 nodes for high availability and redundancy. These nodes may be virtual machines (VMs) or "bare metal" hardware. IronMQ can also run on a single node for testing purposes.

# Reference configuration

We run one of our hosted multi-tenant environments in Amazon's EC2. We use
three c3.2xlarge instances. Those nodes each 2 80GB SSDs, 15 GB RAM and 8 VCPUs.
This setup serves many high throughput queues.

Please contact us if you have specific questions or want help estimating your
system requirements.


## Installation and management

If you meet the above prerequisites, please read our
[installation guide](/mq/3/on-premise/installation) to get started running IronMQ
on your infrastructure.

(If you've already installed IronMQ, please read our [management guide](/mq/3/on-premise/management) to administer your running IronMQ.)
