---
title: IronWorker On-Premise Docker Registry
layout: default
section: worker
breadcrumbs:
  - ['On-Premise', '/on-premise']
---

This will allow you to use a custom docker registry with an Iron On-Premise installation.

There are two types of docker registries, insecure and secure. The one which you configure depends on your situation. However, due to limitations on controlling domains and certificates in an On Premise environment, we are only able to create an insecure registry.

# Installation

The only difference in workflow between an insecure registry and a secure registry is that you'll need to whitelist the registry from your local docker daemon.

To set up a registry with the On Premise Installer, simply include a `[docker-registry]` host in your `./config/inventory.ini` with a proper server IP and the docker registry will be installed on that server.

```
[docker-registry]
192.168.x.x
```

This registry will serve on port `6000`.

# Usage

You will need to alter your local docker before being able to push images to this registry. This is a little different depending on your OS -- please see [here](https://docs.docker.com/registry/insecure/) for how to set it up.

You can then docker push `hello` to your insecure registry

```
docker push 192.168.x.x:6000/hello
```

Then register this image with Iron

```
iron register -name test 192.168.x.x:6000/hello
```

You can then queue tasks to run like this

```
iron worker queue test
```

For more information on the docker registry and how to create and push images, please see [this TL;DR](https://docs.docker.com/registry/#/tl-dr) from docker.
