---
title: Introduction
layout: default
section: mq-v3
---

IronMQ is a full featured high-performance messaging solution. Previously, we
offered IronMQ in two hosting configurations (multi-tenant or dedicated). Our new on-premise product 
is the first to allow you to run our software on your own dedicated hardware.

We offer two primary deployment options:

- **Docker containers** (*preferred*) - you pull our docker containers from
[Docker Hub](https://hub.docker.com/) and run them on your hardware. They work
out of the box with minimal configuration, and can be scaled up easily.
- **Binaries** - we build our software and provide you the binaries as well
as configuration files and additional documentation. The setup process for
this option is more involved and potentially complex than the Docker-based
option.

## Hardware requirements

IronMQ uses modern hardware technologies to achieve
exponential performance gains over older alternatives. Also, IronMQ is an
advanced distributed system which makes it highly available and redundant.

Here are the minimum hardware requirements that IronMQ needs to run successfully on your cloud:

* __OS__: Docker 1.5.0 installed
* __RAM__: 8GB+
* __CPU__: 2+ CPU (VMs, IronMQ needs 4 VCPUs)
* __Storage__: 64GB SSD Drive (IronMQ persists messages that flow through the
system. Spinning disk drives will significantly slow the system. As your
enqueue and dequeue rates change, storage requirements may change.)
* __Nodes__: Minimum 3 nodes for high availability and redundancy. These nodes may be virtual machines (VMs) or "bare metal" hardware.
IronMQ can run on a single node for testing purposes.

### Reference configuration

We run one of our hosted multi-tenant environments in Amazon's EC2. We use
three c3.2xlarge instances. Those nodes each 2 80GB SSDs, 15 GB RAM and 8 VCPUs.
This setup serves many high throughput queues.

Please contact us if you have specific questions or want help estimating your
system requirements.


## Installation and management

If you meet the above system requirements, please read our
[installation guide](/mq/3/on-premise/installation) to get started running IronMQ
on your infrastructure.

If you've already installed IronMQ, please read our
[management guide](/mq/3/on-premise/management) to administer your running IronMQ.
