---
title: IronMQ On-Premise - Getting Started
summary: "IronMQ On-Premise requires some knowledge of deployment and server management. If you do not possess these skills please schedule a consultation with our team"
layout: default
section: mq-on-premise
---

## Outline

- <a href="#setup">Setting up IronMQ</a>
- <a href="#terraform">Automated setup with Terraform</a>
- <a href="#manual">Manual setup (single node)</a>
  - <a href="#download">Download</a>
  - <a href="#install">Install</a>
  - <a href="#create_new_user_account">Setup New User Account</a>
  - <a href="#start">Client lib and API docs</a>
  - <a href="#custom_config">Custom Configuration</a>
- <a href="#manual-cluster">Manual setup (clustered)</a>


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

### 1. Download `cloud-config`

We provide a CoreOS `cloud-config` file to make provisioning new nodes easier.
Please save it to a file with the following command:

```bash
curl https://raw.githubusercontent.com/iron-io/enterprise/master/cloud-config > cloud_config
```

### 2. Configure etcd discovery token

Go to [discovery.etcd.io/new](https://discovery.etcd.io/new) and copy the URL on
that page. Open `cloud_config` and replace `https://discovery.etcd.io/{TODO_GET_A_NEW_ONE}` with
the copied URL.

### 3. Bootstrap cloud_config onto new nodes

New nodes that start on your cloud will need to have `cloud_config` somewhere
on the filesystem. You may need to manually build a VM image or include `cloud_config`
in a startup script.

On AWS, you can do it in the EC2 dashboard under the
`"Configure instance" -> "Advanced Details" -> "User Data"` section.

### 4. Open ports

Depending on your provider, you'll need to open up ports to make
CoreOS and IronMQ work properly in a distributed setting. On AWS, set up
security groups in the same EC2 dashboard as in the last step.

Below are the ports, protocols and visibilities of the required ports:

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

### 5. Start nodes

You are now ready to start nodes to form your cluster. This process will
depend on your cloud. In many, this can be done with a click of a button in
your cloud dashboard.

Please follow these guidelines when starting and maintaining your cluster:

- Always run at least 3 nodes
- Always run an odd number of nodes (`iron/mq` and `iron/auth` both use a quorum based
distributed algorithm to handle network errors and failures)
- We recommend sizing your cluster with 3 nodes and scaling up once you're comfortable with
managing IronMQ clusters
- We recommend creating a load balancer to point to these nodes. To do this, allow your load
balancer to forward traffic on ports 8080 (`iron/mq`) and 8090 (`iron/auth`)

### 6. Configure nodes & start services

After your cluster is running, `ssh` into one of them.

In each node's `$HOME` directory, you should see the following files:

- `mq_config.json`
- `auth_config.json`
- `ironmq.service`
- `ironauth.service`

### 7. Add configuration

The `*_config.json` files are stored in [etcd](https://github.com/coreos/etcd),
a distributed, consistent storage system that CoreOS uses for storing
configuration data.

Add the `*_config.json` files to etcd with these commands:

```
cd $HOME
etcdctl set /ironmq/config.json "`cat mq_config.json`"
etcdctl set /ironauth/config.json “`cat auth_config.json`”
```

### 8. Start services

The `*.service` files describe the commands that CoreOS's [fleet](https://github.com/coreos/fleet)
should execute on all nodes in the cluster. Fleet builds on etcd to coordinate all
the startup steps.

Start the services with these commands:

```
fleetctl start ironmq.service
fleetctl start ironauth.service
fleetctl start hud-e.service
```

Notice the final `fleetctl start hud-e.service` command. `hud-e` is IronMQ's web
based user interface for viewing and managing user accounts, projects and queues.

### 9. Visit Hud-e

First, find `hud-e.service` in the list that the following command outputs:

```
fleetctl list-units
```

The output of this command might look something like the following:

```
ironmq.service	7a214547.../52.0.97.110	active	running
ironmq.service	7e15465c.../52.0.27.248	active	running
ironmq.service	e23d889d.../52.0.96.29	active	running
hud-e.service	  7e15465c.../52.0.27.248	active	running
```

Open your browser and go to `http://$HUD_E_IP:3000` to see hud-e. In the above
example, the URL would be `http://52.0.27.248:3000`.

Hud-e will ask for a login. Login details are in `$HOME/auth_config.json`
(found in step 6). Use those details to log in and manage clusters, users,
tokens and projects.

We recommend using your load balancer to forward traffic to Hud-e in addition
to `iron/mq` and `iron/auth` so that you have a stable IP or hostname
to manage clusters with.

### Notes for production usage

We do not recommend using the above instructions in a production
environment because `iron/mq` depends on `iron/mq` to run on the same node.

In a production setting, `iron/auth` should run on separate nodes with a separate
load balancer rule (or via DNA). If you use this configuration, set the
`iron/auth` IP or hostname in `iron/mq`'s `mq_config.json` file.

Additionally, since HUD-e is completely API driven, we recommend hosting it on
different nodes from `iron/mq` and `iron/auth`. We deploy it on Heroku for our
hosted products.

We will add more information about IronMQ production configurations soon.

## Support

If you find issues are problems during your setup, please contact us at
<support@iron.io> and we'd be happy to help.
