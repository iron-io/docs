---
title: Delayed Job on IronMQ
layout: default
section: mq
breadcrumbs:
  - ['Worker Integrations', '/workers']
  - ['Delayed Job for Ruby', '/delayed_job']
---

You can use IronMQ as a highly available message broker for Delayed Job.

It's easy:

1. Add gem to your Gemfile: `gem 'delayed_job_ironmq'`
1. Add an iron.json file to the root of your Rails project, see: [Configuration](http://dev.iron.io/mq/reference/configuration/)

That's pretty much it, now use Delayed Job as normal! More info at: [https://github.com/iron-io/delayed_job_ironmq](https://github.com/iron-io/delayed_job_ironmq#readme)

