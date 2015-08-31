---
title: IronMQ Lite
summary: "IronMQ Lite is a free single server, single tenant version of IronMQ."
layout: default
section: mq-on-premise
---

<p class="subtitle">
<!--   IronMQ Lite is a free single server, single tenant version of IronMQ. -->
</p>

TODO: link to blog post!

IronMQ Lite is the same great IronMQ your used to, without any of the higher level features multi-tenancy and
  high availability. But if you just want a fast, REST based message queue to run on your own server, look no further. 
  You can be up and running in minutes with a single `docker run` command. 

<section id="toc">
  <ul>
    <li><a href="#install">Install and Run</a></li>
    <li><a href="#libraries">Client Libraries</a></li>
    <li><a href="#datacontainers">Using Docker Data Containers</a></li>
  </ul>
</section>

<h2 id="install">Install and Run</h2>

You can install and run IronMQ with one command:

```sh
docker run -i -t -p 8080:8080 --name ironmq iron/mq:lite
```

To run as a daemon:

```sh
docker run -d -p 8080:8080 --name ironmq iron/mq:lite
```

Then just simply start using it. 

Note: You can use any values for the project_id and token that the clients use. 

<h2 id="libraries">Client Libraries</h2>

Be sure to use the v3 client libraries only, these will not be in the library repositories
like rubygems, npm or Maven quite yet. Links to the v3 client libraries can be [found here](/mq/3/libraries/).

<h2 id="datacontainers">Using Docker Data Containers for your IronMQ Data</h2>

Data Containers can help you better manage the data in a Docker container, please
read [the documentation on data containers](https://docs.docker.com/userguide/dockervolumes/#creating-and-mounting-a-data-volume-container) to learn more. 

First create a data container:

```sh
docker run --name irondata -v /ironmq/data busybox true
```

Then when running IronMQ, use the `--volumes-from` flag:

```
docker run -i -t -p 8080:8080 --name ironmq --volumes-from irondata iron/mq:lite
```

