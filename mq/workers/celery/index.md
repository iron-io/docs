---
title: Celery on IronMQ
layout: default
section: mq
breadcrumbs:
  - ['Worker Integrations', '/workers']
  - ['Celery for Python', '/celery']
---

You can use IronMQ as a highly available message broker for [Celery](http://celeryproject.org/) (and optionally IronCache as a
result store).

It's easy:

1. Install iron_celery: `pip install iron_celery`
1. add `import iron_celery`
1. set `BROKER_URL = 'ironmq://project_id:token@'`

That's pretty much it!  More info at: [https://github.com/iron-io/iron_celery#readme](https://github.com/iron-io/iron_celery#readme)

