---
title: IronWorker On-Premise Quickstart
layout: default
section: worker
breadcrumbs:
  - ['On-Premise', '/on-premise']
---

We've created a load testing script that you can easily run as a docker container. 

Be sure you have enough resources deployed, we recommend:

TODO

## Run Load Test Script

TODO: Build and publish this image: 

```sh
docker run --rm -e TASKS=1000000 iron/onprem:loadtest
```
