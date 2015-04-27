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

##### Caveats for custom configurations

* MQ and Auth must run on separate ports, offset by at least 4. This means that
  if you run MQ on `:8080`, you __can not__ run Auth on `:8084`. The defaults are MQ on
  `8080` and Auth on `8090`.
* MQ and Auth __can not__ share the same data directory. Each will attempt to
  create a unique directory for itself within the given path, but make sure not
  to mix the files together.
* MQ and Auth __can not__ have any instance of the other in their "cohosts" for
  bootstrapping; i.e. MQ's cohosts must only contain other instances of MQ.
