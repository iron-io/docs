---
title: IronMQ On Your Own Cloud
summary: "IronMQ is a full featured high-performance messaging solution. Previously, we
offered IronMQ in two hosting configurations (multi-tenant or dedicated).

Our new on-premise product is the first to allow you to run our software on your own
dedicated hardware."
layout: default
section: mq-v3
---

# Introduction

We've revamped IronMQ so that it can be easily deployed in high availability
configurations on your infrastructure. We offer two primary deployment options:

- **Docker containers** (*preferred*) - you pull our docker containers from
[Docker Hub](https://hub.docker.com/) and run them on your hardware. They work
out of the box with minimal configuration, and can be scaled up easily.
- **Binaries** - we build our software and provide you the binaries as well
as configuration files and additional documentation. The setup process for
this option is more involved and potentially complex than the Docker-based
option.

# Hardware requirements

IronMQ is exploits modern hardware technologies to achieve
exponential performance gains over older alternatives. Also, IronMQ is an
advanced distributed system which makes it highly available and redundant.

Here are the minimum hardware requirements that IronMQ needs to run successfully on your cloud:

- **3 separate nodes** - These nodes may be virtual machines (VMs) or "bare metal" hardware.
IronMQ can run on a single node node for testing purposes.
- **8 GB RAM per node**
- **4 cores per node** - on VMs, IronMQ needs 4 VCPUs
- **64 GB Solid state storage per node** - IronMQ persists messages that flow through the
system. Spinning disk drives will significantly slow the system. As your
enqueue and dequeue rates change, storage requirements change

# Installation and management

If you meet the above system requirements, please read our
[installation guide](/mq/3/on-premise/installation) to get started running IronMQ
on your infrastructure.

If you've already installed IronMQ, please read our
[management guide](/mq/3/on-premise/management) to administer your running IronMQ.
