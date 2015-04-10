---
title: IronMQ On-Premise - Deploying with CoreOS
#summary: "IronMQ On-Premise requires some knowledge of deployment and server management. If you do not possess these skills please schedule a consultation with our team"
layout: default
section: mq-on-premise
---

This page is a work in progress.

# Deploying IronMQ HA on CoreOS

CoreOS is a convenient operating system for deploying IronMQ HA because it includes
basic service discovery and configuration management tools that ease the deployment
process significantly.

This page details how to deploy a 3 node IronMQ HA cluster using CoreOS. These instructions
assume basic working knowledge of CoreOS concepts and systems.

# 1. Provisioning Nodes

We provide a CoreOS `cloud-config` file to make provisioning new nodes easier.
Please save it to a file with the following command:

```bash
curl https://raw.githubusercontent.com/iron-io/enterprise/master/cloud-config > cloud_config
```
# 2. Configure etcd discovery token

Go to [discovery.etcd.io/new](https://discovery.etcd.io/new) and copy the URL on
that page. Open `cloud_config` and replace `https://discovery.etcd.io/{TODO_GET_A_NEW_ONE}` with
the copied URL.

# 3. Bootstrap cloud_config onto new nodes

New nodes that start on your cloud will need to have `cloud_config` somewhere
on the filesystem. You may need to manually build a VM image or include `cloud_config`
in a startup script.

On AWS, you can do it in the EC2 dashboard under the
`"Configure instance" -> "Advanced Details" -> "User Data"` section.

# 4. Open ports

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

# 5. Add configuration

The `*_config.json` files are stored in [etcd](https://github.com/coreos/etcd),
a distributed, consistent storage system that CoreOS uses for storing
configuration data.

Add the `*_config.json` files to etcd with these commands:

```
cd $HOME
etcdctl set /ironmq/config.json "`cat mq_config.json`"
etcdctl set /ironauth/config.json “`cat auth_config.json`”
```

# 6. Start services

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

# 7. HUD-E



After your cluster is running, `ssh` into one of them.

In each node's `$HOME` directory, you should see the following files:

- `mq_config.json`
- `auth_config.json`
- `ironmq.service`
- `ironauth.service`


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
