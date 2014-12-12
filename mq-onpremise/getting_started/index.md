---
title: IronMQ On-Premise Installation
summary: "IronMQ On-Premise requires some knowledge of deployment and server management. If you do not possess these skills please schedule a consultation with our team"
layout: default
section: mq-onpremise
---

<p class="subtitle">
<!--   IronMQ On-Premise requires some knowledge of deployment and server management. If you do not possess these skills please schedule a consultation with our team -->
</p>

<section id="toc">
  <h3>Getting Started</h3>
  <ul>
    <li><a href="#requirements">Recommended System Requirements</a></li>
    <li><a href="#download">Download</a></li>
    <li><a href="#install">Install</a></li>
    <li><a href="#setup_user_project">Setup New User and Project</a></li>
    <li><a href="#start">Client lib and API docs</a></li>
    <li><a href="#custom_config">Custom Configuration</a></li>
  </ul>
</section>

<h2 id="requirements">Recommended Minimum System Requirements</h2>

* __OS__: Docker installed
* __RAM__ : 8GB+
* __CPU__ : 2+ CPU
* __Storage__ : SSD Drive

Yes, it will probably work on your laptop. Don't benchmark on your laptop :)

<h2 id="download">Download</h2>

```
$ docker pull iron/mq
$ docker pull iron/auth
```

<h2 id="install">Install and Start</h2>

Reference:

* `-d` runs as daemon, omit to run in foreground
* `-p HOST:CONTAINER` binds to port on host machine
* `--net=host` use host machines network interface

__Note__: if you are familiar with Docker, you can run without `--net=host`,
but you'll have to point mq to auth, see [configuration](#custom_config)

```
// MQ
$ docker run -d -p 8080:8080 --net=host iron/mq

// Auth
$ docker run -d -p 8090:8090 --net=host iron/auth
```

You are welcome to further modify the docker environment for each of these containers, e.g. name them.
Also, data inside of each of these containers is ephemeral to the lifetime of
the container. If you would like to persist the data, the recommended way
is to create a persistent data volume container that is mounted where you
would like to store data. Here is a brief example, see Docker docs for details:

```
// create the data container, mounted on host at /mnt/data 
// note: ironmq and ironauth both store their data at /ironmq/data in container by default
$ docker run -name irondata -v /mnt/data:/ironmq/data busybox true

// run mq with data volume
$ docker run -d --volumes-from irondata -p 8080:8080 iron/mq
```

<h3 id="setup_user_project">Setup New User and Project</h3>

##### With the auth server running:

__1)__ create a new user

```
$ docker run -it --net=host iron/authcli iron -t adminToken create user somebody@somewhere.com password
```

__Note__: If auth is not located at `http://localhost:8090` on the host machine, you can do:

```
$ docker run -it iron/authcli iron -t adminToken -h http://authHost[:port] create user somebody@somewhere.com password
```

__2)__ create a new project

```
$ docker run -it --net=host iron/authcli iron -t NEWTOKEN create project myproject
```

__3)__ save your new token and project\_id into an iron.json or environment variables

<h3 id="start">Start using MQ</h3>

* [Client Libraries](http://dev.iron.io/mq-onpremise/reference/client_libraries/)
* [REST API](http://dev.iron.io/mq-onpremise/reference/api/)
* [Auth CLI](https://github.com/iron-io/enterprise/wiki/2.-Auth-CLI-Tool)

<h2 id="custom_config">Configuration</h2>

This step is completely optional, you should already be up and running with the
default configuration. If you would like to tinker, some instructions are below.

You can download or copy & paste these to your file system:

* [MQ config](https://github.com/iron-io/enterprise/blob/master/mq_config.json)
* [Auth config](https://github.com/iron-io/enterprise/blob/master/auth_config.json)

These configs are good to get you up and running (they're the same as
the ones in the docker container) but you can modify them.

To start mq or auth with the updated config, simply pass it through the
environment variable `CONFIG_JSON`. An example with mq:

```
$ docker run -d -p 8090:8090 --net=host -e CONFIG_JSON="`cat path/to/mq_config.json`" iron/mq
```
