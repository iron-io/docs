---
title: Celery on IronMQ
layout: default
section: mq
breadcrumbs:
  - ['Worker Integrations', '/workers']
  - ['Celery for Python', '/celery']
---

[Celery](http://celeryproject.org/) is a task queue for Python. Originally developed as part of the [Django](https://www.djangoproject.com/) framework,
it was split off into its own project and has quickly become the standard for task processing in Python.

Celery supports multiple technologies for it's queue broker including RabbitMQ, Redis, and IronMQ. There are many advantages to choosing IronMQ
over the others. To name a few:

1. Instant high availability
1. No servers, maintenance, or scaling to worry about
1. Greater job visibility with IronMQ dashboards

For more information, visit [Iron.io/celery](http://www.iron.io/celery)


## Getting Started

Celery was designed to easily change your broker which makes changing to IronMQ as easy as 1-2-3.

1. Install iron_celery: `pip install iron_celery`
1. add `import iron_celery`
1. set `BROKER_URL = 'ironmq://project_id:token@'`


## Further Reading

Official Client Docs: [https://github.com/iron-io/iron_celery#readme](https://github.com/iron-io/iron_celery#readme)

Getting Started Blog Post: [http://blog.iron.io/2013/02/using-ironmq-as-celery-broker.html](http://blog.iron.io/2013/02/using-ironmq-as-celery-broker.html)