---
title: IronMQ On-Premise - HA Installation
layout: default
section: mq-on-premise
---

This guide will show you how to add nodes to a single IronMQ to create a
3 node high availability (HA) cluster, and installing HUD-e to manage
and introspect your queues with a web UI.

## Prerequisites

These instructions assume that you've already set up a single IronMQ node.
If you haven't, please first complete
[the single node setup](/mq/3/on-premise/installation/single.html).

# 1. Add 2 more nodes

All nodes in the HA cluster need to communicate with each other in order
to provide the high availability, redundancy, and other advantages that IronMQ's
distributed algorithms provide.

To facilitate that process, IronMQ implements a modified [gossip protocol](http://en.wikipedia.org/wiki/Gossip_protocol) to find all of the other
nodes to talk to. On startup, you only need to tell the new node about at least one other
existing node in the cluster (a **seed node**).

We'll specify the seed node using the `LEVELDB_CONFIG_COHOSTS` environment variable,
which allows for easy use of separate service discovery services like etcd or
consul (also can be done in a config line):

```
docker run --name=ironmq1 -d -p 8180:8180 -e LEVELDB_CONFIG_COHOSTS='["127.0.0.1:8080","127.0.0.1:8280"]' -e APICONFIG_HTTPPORT=8180 --net=host iron/mq
docker run --name=ironmq2 -d -p 8280:8280 -e LEVELDB_CONFIG_COHOSTS='["127.0.0.1:8080","127.0.0.1:8180"]' -e APICONFIG_HTTPPORT=8280 --net=host iron/mq
```

These commands assume that all 3 nodes are running on the same machine.
If you're starting the new nodes on different machines, you can omit the
`-e APICONFIG_HTTPPORT` environment variables and use the default port (8080).
If you choose to omit, make sure to also change the `-p` parameter and
`LEVELDB_CONFIG_COHOSTS`.

# 2. Start HUD-e

HUD-e is the web UI that allows you to introspect and manage your queues.
Setting up HUD-e is similar to setting up the previous services:

```
docker run -d --name hud-e -p 3000:3000 --net=host -e IRON_AUTH_URL=localhost:8090 -e 'SECRET_KEY_BASE=$RANDOM_STRING' iron/hud-e
```

`$RANDOM_STRING` is a string that you randomly select on your own. Make sure that
it is cryptographically strong (e.g. using a cryptographically sound hashing
algorithm on random string).

After HUD-e is running, go to [http://localhost:3000](http://localhost:3000) and
login with the following credentials:

```
username: admin@somewhere.com
password: password
```

After you've logged in, we recommend that you create new user accounts, projects,
etc...

# 3. Add additional nodes (optional)

You can add additional nodes using the same commands as the previous section.
Please follow these guidelines when running your cluster:

- Always run at least 3 nodes
- Allow at least 5 unused open ports above the port that you tell `iron/mq` to bind to,
so that `iron/mq` can run internal RPC services
- Always run an odd number of nodes. `iron/mq` and `iron/auth` both use a [quorum](http://en.wikipedia.org/wiki/Quorum_%28distributed_computing%29) based
distributed algorithm in their databases to handle network errors and failures,
so they require an odd number of nodes to properly maintain majorities
- We recommend sizing your cluster with 3 nodes and scaling up once you're comfortable with
managing IronMQ clusters
- We recommend creating a load balancer to forward traffic to these nodes. To do so,
allow your load balancer to forward traffic to the ports you choose to run `iron/mq`
on (8080, 8081, and 8082 in the previous section) and the ports that you choose to run
`iron/auth` on (8090 from the single node setup guide).

# Notes for production usage

At this point, you've successfully set up a 3 node IronMQ cluster and HUD-e.
Remember that in the above configuration, *all* data is ephemeral and will be erased
after a container is stopped. To persist the data, see [this guide](https://docs.docker.com/userguide/dockervolumes/).

We also recommend running the `iron/auth` container on a separate set of nodes
from the `iron/mq` nodes, for higher availability. They should also have a different
load balancer in front of them.

You can tell `iron/mq` where `iron/auth` is by using the `-e AUTH_HOST` environment variable.

Finally, HUD-e is stateless and relies exclusively on the APIs provided by
`iron/auth` and `iron/mq`, so we recommend hosting it on separate nodes, fronted
by its own load balancer. For reference, we deploy HUD-e on Heroku for our
hosted products.

We will add more information about IronMQ production configurations soon.
