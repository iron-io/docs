---
title: IronMQ On-Premise - Getting Started
#summary: "IronMQ On-Premise requires some knowledge of deployment and server management. If you do not possess these skills please schedule a consultation with our team"
layout: default
section: mq-on-premise
---

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
