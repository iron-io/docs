---
title: IronMQ On-Premise - Getting Started
summary: "IronMQ On-Premise requires some knowledge of deployment and server management. If you do not possess these skills please schedule a consultation with our team"
layout: default
section: mq-on-premise
---

## Outline

- <a href="#requirements">System requirements</a>
  - <a href="#reference-config">Reference configuration</a>
- <a href="#setup">Setting up IronMQ</a>
- <a href="#terraform">Automated setup with Terraform</a>
- <a href="#manual">Manual setup (single node)</a>
  - <a href="#download">Download</a>
  - <a href="#install">Install</a>
  - <a href="#create_new_user_account">Setup New User Account</a>
  - <a href="#start">Client lib and API docs</a>
  - <a href="#custom_config">Custom Configuration</a>
- <a href="#manual-cluster">Manual setup (clustered)</a>

# <h2 id="requirements">Minimum System Requirements</h2>

* __OS__: Docker 1.5.0 installed
* __RAM__: 8GB+
* __CPU__: 2+ CPU
* __Storage__: 64GB SSD Drive
* __Individual Nodes__: 3, for high availability and redundancy

<a id="reference-config"></a>
### Reference configuration

We run one of our hosted multi-tenant environments in Amazon's EC2. We use
three c3.2xlarge instances. Those nodes each 2 80GB SSDs, 15 GB RAM and 8 VCPUs.
This setup serves many high throughput queues.

Please contact us if you have specific questions or want help estimating your
system requirements.

<a id="setup"></a>
## Setting up IronMQ

We offer two setup options for IronMQ:

- [Terraform](https://www.terraform.io/) - an automated infrastructure setup tool.
We recommend this option if possible on your infrastructure.
- Manual - you do all the setup steps yourself. If you want to customize your install,
this is for you.

<a id="terraform"></a>
## Automated setup with Terraform

Terraform is an infrastructure deployment tool which you can use to automatically
launch an IronMQ cluster. It only works for cloud based deployments, as it
needs to use cloud APIs. It supports a wide variety of clouds.

This guide assumes that you're setting up IronMQ on Amazon Web Services (AWS).

1. [Download and install Terraform](https://terraform.io/downloads.html)
2. (Optional) Read the [introduction to Terraform](https://terraform.io/intro/)
3. `wget https://github.com/iron-io/enterprise/archive/master.zip`
4. `unzip master.zip`
5. `cd enterprise-master/terraform/ironmq/`
6. `curl https://raw.githubusercontent.com/iron-io/enterprise/master/terraform/ironmq/sample.tfvars.json > terraform.tfvars.json`
7. Edit `terraform.tfvars.json` (created in the previous step). Change the values of
`aws_access_key` and `aws_secret_key` to your own AWS access key and AWS secret key, respectively.
8. `terraform plan -out=plan -var-file=terraform.tfvars.json`.
9. Review the output of the previous. If you find any possible issues with Terraform's
plan to set up your infrastructure, please stop and contact us.
10. `terraform apply plan`

<a id="manual"></a>
## Manual setup (single node)

Setting up IronMQ manually is more complex than the automatic option with Terraform,
but allows you to customize your install further.

We've included instructions below on setting up a single node IronMQ.

<a id="download"></a>
### 1. Download with Docker

IronMQ is containerized with [Docker](https://docker.com). Use the Docker CLI
to download the containers that IronMQ needs to run:

```bash
$ docker pull iron/mq
$ docker pull iron/auth
```

<a id="install"></a>
### 2. Install and start a single IronMQ instance</h2>

IronMQ needs the queue server and an authorization / authentication server to run.
Use the following commands to run those, respectively.

```
docker run --name=ironmq -d -p 8080:8080 --net=host iron/mq # run the queue server
docker run --name=ironauth -d -p 8090:8090 --net=host iron/auth # run the auth server
```

If you're familiar with Docker, you can run without `--net=host`, but you'll have to
point the `iron/mq` container to `iron/auth` differently. Please see
[configuration](#custom-config) for more on that topic.

Additionally, there are a wide variety of Docker CLI flags that you can use to
further customize. Please see [the CLI reference](https://docs.docker.com/reference/commandline/cli/) for all of them.
We've listed a few below.

* `-d` runs as daemon, omit to run in foreground
* `-p HOST:CONTAINER` binds to port on host machine
* `--net=host` use host machines network interface

When you're ready to stop IronMQ, simply run:

```
docker stop ironmq
docker stop ironauth
```

#### Sidenote: persisted queue data

As mentioned in other sections, IronMQ persists messages until they've been
completely processed. In the above setup, message data and metadata are stored
*ephemerally* inside the `iron/mq` container. That means that when you shut down
that container, your message data will be lost.

If you would like to persist the data, we suggest that you create a persistent
data volume container that `iron/mq` mounts on startup. Below is a brief
example. See the
[Docker documentation](https://docs.docker.com/userguide/dockervolumes/)
for more details.

```
# create the data container, mounted on host at /mnt/data
# note: ironmq and ironauth both store their data at /ironmq/data in container by default
docker run -name irondata -v /mnt/data:/ironmq/data busybox true
# run mq with data volume
$ docker run -d --volumes-from irondata -p 8080:8080 iron/mq
```

<a id="create_new_user_account"></a>
### 3. Create a new user and project

The IronMQ API requires a user token and a project ID to post a message onto the
queue. To create a user and project, make sure the `iron/auth` container is
running and execute the following:

```
# create a new user
docker run -it --net=host iron/authcli iron -t adminToken create user somebody@somewhere.com password
# create a new project
$ docker run -it --net=host iron/authcli iron -t mytoken create project myproject
```

Use the token and project ID you just created (`mytoken` and `myproject`, respectively)
and save them to an `iron.json` file or the environment variables specified
[in the client library documentation](http://dev.iron.io/mq-onpremise/reference/client_libraries/)

<a id="start"></a>
### Post messages to IronMQ

You are now ready to use client libraries or APIs to enqueue and dequeue messages.

* [Client Libraries](http://dev.iron.io/mq-onpremise/reference/client_libraries/)
* [REST API](http://dev.iron.io/mq-onpremise/reference/api/)
* [Auth CLI](https://github.com/iron-io/enterprise/wiki/2.-Auth-CLI-Tool)

<a id="custom_config"></a>
### Optional - additional configuration

Once you're completely up and running with Terraform or your manual setup,
you can make other changes. Configurations for `iron/mq` and `iron/auth` are
applied with the following files:

* [MQ config](https://github.com/iron-io/enterprise/blob/master/mq_config.json)
* [Auth config](https://github.com/iron-io/enterprise/blob/master/auth_config.json)

The above configurations are included by default in the docker containers that
you launched above, and they're valid to bootstrap a default server.

If you'd like to make modifications, change the appropriate configuration file
and tell the server to use the new file. Here's an example with `iron/mq`:

```
docker run -d -p 8090:8090 --net=host -e CONFIG_JSON="`cat path/to/mq_config.json`" iron/mq
```

<a id="manual-cluster"></a>
## Manual setup (clustered)

This section describes how to set up IronMQ in clustered mode.

We recommend that you use [CoreOS](https://coreos.com/) to run IronMQ components for
clustered mode, because it includes basic service discovery and configuration management that
you'll need for setup.

We provide a `cloud-config` to make provisioning boxes with a few parameters and
files pretty easy, you can find it here: [cloud-config](https://github.com/iron-io/enterprise/blob/master/cloud-config).
Note that you'll need to enter a new CoreOS discovery url to bootstrap CoreOS's
service discovery system. Set one up at [discovery.etcd.io/net](https://discovery.etcd.io/new).

You'll want to at least have the `cloud-config` copied into your clipboard or downloaded, to
stick it into the platform's configuration. For AWS, you can find this section
in "Configure instance -> Advanced Details -> user data".

This will not take care of security groups if you're on AWS, so you'll need the
following ports opened up (note: private ones could be public, but not recommended):

```
coreos, private ports:
:4001 tcp
:7001 tcp

ironmq, public:
:8080 tcp

ironmq, private:
:8081 tcp & udp
:8082 tcp

ironauth, public:
:8090 tcp

ironauth, private:
:8091 tcp & udp
:8092 tcp

hud-e, public:
:3000 tcp
```

You'll want an odd numbered (>=3) amount of boxes, because IronMQ and
IronAuth both use a quorum-based approach to handle network partitions. We
recommend starting with 3 nodes and scaling up once you're comfortable with
managing IronMQ clusters. We also recommend creating a load balancer to point to
these nodes. IronMQ runs on `:8080` and IronAuth runs on `:8090`.

After getting the boxes provisioned and running, you can ssh onto one of them to
take care of fixing up the configs however you might like. They should be in the
home directory as `mq_config.json` and `auth_config.json`. You should also see
the service files, we'll need these in a minute.

To get started, you'll have to submit the configs to etcd. For example:

```
$ etcdctl set /ironmq/config.json “`cat mq_config.json`”
$ etcdctl set /ironauth/config.json “`cat auth_config.json`”
```

Afterwards, you can start up the services.

```
$ fleetctl start ironmq.service
$ fleetctl start ironauth.service
$ fleetctl start hud-e.service
```

You can see that everything is running, and where to find hud-e, by doing:

```
$ fleetctl list-units
```

Afterwards, you should be able to go to HUD-e in your browser, it's running on
port 3000 on the box it landed on. From there, you can use the initial login
(from `auth_config.json`) to get in, and then we recommend creating other users,
tokens and projects to get started. You'll have to add an address in HUD-e in
the `manage clusters` section of the admin section for MQ, a load balancer address
works great.

This should give you a basic installation of IronMQ, IronAuth and
HUD-enterprise. We do not recommend using the above instructions in a production
environment. This is because IronMQ is counting on IronAuth running on the same
instance and being available. In a production setting, IronAuth should probably
run on separate boxes, and IronMQ should access it through a load balancer or
DNS -- you can find the auth URL in `mq_config.json`.
For HUD-e, we deploy on Heroku internally, and recommend that approach, as well.

We will add more information about the configuration for IronMQ, IronAuth and
HUD-enterprise soon.

<!-- TODO list all config options for ironmq, ironauth, hud-e -->

If you ran into any issues, feel free to contact us at <support@iron.io> and we'd be
happy to help, otherwise feel free to [get started](#start).
