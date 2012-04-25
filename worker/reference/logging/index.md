---
title: Logging
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['Logging', '/logging']
---

# Logging from your Workers

Anything you write to STDOUT or STDERR will be logged and stored so you can view and/or retrieve it later.

## Viewing Logs

You can view your worker logs in the [HUD](https://hud.iron.io) by clicking on a task.

## Retrieving Logs via the API

You can also retrieve the logs via the API, [view the reference docs here](/worker/reference/api/#get_a_tasks_log).
All of the client libraries have a simple method to retrieve the logs via the API too.
