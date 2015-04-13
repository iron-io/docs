---
title: IronMQ On-Premise - Single Node Installation
layout: default
section: mq-on-premise
---

This guide will show you how to install and configure a single, full featured
IronMQ node. This is the first step to install your IronMA HA cluster.

# 1. Pull Docker images

IronMQ HA requires 2 major components running at all times. We provide docker images
for both:

- [`iron/mq`](https://registry.hub.docker.com/u/iron/mq/) - the core queue database
- [`iron/auth`](https://registry.hub.docker.com/u/iron/auth/) - user & project storage, authentication and authorization

Download those docker images with the following:

```bash
docker pull iron/mq
docker pull iron/auth
```

# 2. Run the Docker images

Use the following commands to run the Docker images that you just pulled:

```
docker run --name=ironmq -d -p 8080:8080 --net=host iron/mq
docker run --name=ironauth -d -p 8090:8090 --net=host iron/auth
```

These commands start the queue database and auth server, respectively. If you're
familiar with Docker, you can run without `--net=host`, but you'll have to
point the `iron/mq` container to `iron/auth` with a different method. Please see [configuration](#custom-config) for more on that topic.

Additionally, there are a wide variety of Docker CLI flags that you can use to
further customize. Please see [the CLI reference](https://docs.docker.com/reference/commandline/cli/) for more details.

We've listed a few below:

* `-d` runs as daemon, omit to run in foreground
* `-p HOST:CONTAINER` binds to port on host machine
* `--net=host` uses the host machine's network interface

Note: when you're ready to stop IronMQ, simply run:

```
docker stop ironmq
docker stop ironauth
```

## Note: Data storage

As mentioned in other sections, IronMQ persists messages until they've been
completely processed. In the above setup, user, project, message and other data
are stored *ephemerally* inside the applicable containers.

That means that when you shut down the `iron/mq` container, for example, you will
lose **all** unprocessed messages.

If you would like to persist the data, we suggest that you create a persistent
data volume container that `iron/mq` mounts on startup. Below is a brief
example. See the
[Docker documentation](https://docs.docker.com/userguide/dockervolumes/)
for more details.

```
# create the data container, mounted on host at /mnt/data
# note: ironmq and ironauth both store their data at /ironmq/data in container by default
docker run --name irondata -v /mnt/data:/ironmq/data busybox true
# run mq with data volume
docker run -d --volumes-from irondata -p 8080:8080 iron/mq
```

# 3. Create a new user and project

The IronMQ API requires a user token and a project ID to post a message onto the
queue.

First, create a user:

```
docker run --net=host iron/authcli iron -t adminToken create user $USER_EMAIL $USER_PASSWORD
```

If this succeeded, you'll see a log message that looks like this:

```
INFO[04-10|20:13:45] user created successfully                id=55282ef9b1a1940006000003 email=$USER_EMAIL token=$USER_TOKEN
```

Copy the `$USER_TOKEN`, then create a new project with it:

```
docker run --net=host iron/authcli iron -t $USER_TOKEN create project $PROJECT_NAME
```

Save your `$USER_TOKEN` and `$PROJECT_NAME` into an `iron.json` file or environment
variables. The format of the file or variables is specified [in the client libraries
configuration file](/mq/3/reference/configuration).

# 4. Post messages to IronMQ

You are now ready to use client libraries or APIs to enqueue and dequeue messages.

TODO: these links are broken

* [Client Libraries](http://dev.iron.io/mq-onpremise/reference/client_libraries/)
* [REST API](/mq/3/on-premise/reference/api/)
* [Auth CLI](https://github.com/iron-io/enterprise/wiki/2.-Auth-CLI-Tool)

# 5. Next steps

You now have a single IronMQ node up and running. After you're comfortable
doing operations on your queues, we recommend that you read our instructions
on [setting up an HA cluster](/mq/3/on-premise/installation/ha.html).

# Support

If you find issues are problems during your setup, please contact us at
<support@iron.io> and we'd be happy to help.
