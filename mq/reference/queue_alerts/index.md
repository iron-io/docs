---
title: IronMQ Queue Alerts
layout: default
section: mq
breadcrumbs:
  - ['Reference', '/reference']
  - ['Queue Alerts', '/queue_alerts']
---

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#alerts_parameters">Alerts Parameters</a></li>
    <li><a href="#alerts_messages">Alerts Messages</a></li>
    <li><a href="#setting_alerts_in_dashboad">Setting Alerts in Dashboard</a></li>
    <li><a href="#important_notes">Important Notes</a></li>
  </ul>  
</section>

<h2 id="overview">Overview</h2>

[Blog Post Overview](http://blog.iron.io/2014/02/ironio-announces-alerts-for-ironmq.html).

Alerts, triggered when the queue hits a pre-determined number of messages (both ascending and descending), allow developers to notify other systems based on the activity of a queue. Actions include things like: auto-scaling, failure detection, load-monitoring, and system health.&nbsp;

<h2 id="alerts_parameters">Alerts Parameters</h2>

IronMQ provides a number of routes to manipulate queue alerts.

##### Add and Update Alerts Endpoints

* [Add alerts to a queue](/mq/reference/api/#add_alerts_to_a_queue)
* [Update alerts on a queue](/mq/reference/api/#update_alerts_on_a_queue)

Request body example:

```js
{
  "alerts": [
    {
      "type": "fixed",
      "direction": "asc",
      "trigger": 1000,
      "queue": "queue-to-post-size-alerts-to",
      "snooze": 120
    },
    {
      "type": "progressive",
      "direction": "desc",
      "trigger": 100,
      "queue": "queue-to-post-progressive-to"
    }
  ]
}
```

* **alerts** - optional - array of hashes containing alerts hashes.

#### Required
* **type** - set to "fixed" or "progressive"
  * A "fixed" alert will trigger an alert when the queue size passes the value
set by **trigger** parameter.
  * A "progressive" alert will trigger when queue size passes any of values calculated by `trigger * N` where `N >= 1`. Example: **trigger** is set to 10, alerts will be triggered at queue sizes 10, 20, 30, etc. 

* **trigger** - must be integer value > 0.
  * Used to calculate actual values of queue size when alert must be triggered. See **type** field description.

* **queue** 
  - Name of queue which will be used to post alert messages.

#### Optional
* **direction** - set to "asc" (default) or "desc"
  * An "asc" setting will trigger alerts as the queue **grows** in size.
  * A "desc" setting will trigger alerts as the queue **decreases** in size.

* **snooze** - Number of seconds between alerts. Must be integer value >= 0
  * If alert must be triggered but snooze is still active, alert will be omitted.

##### Delete Alerts Endpoints

* [Delete alerts from a queue](/mq/reference/api/#delete_alerts_from_a_queue)
* [Delete alert from a queue by ID](/mq/reference/api/#delete_alert_from_a_queue_by_id)


<h2 id="alerts_messages">Alerts Messages</h2>

Alert messages are JSONified strings in the following format:

```js
{
  "source_queue": "test_queue",
  "queue_size": 12,
  "alert_id": "530392f41185ab1f2a0005f7",
  "alert_type": "progressive",
  "alert_direction": "asc",
  "alert_trigger": 5,
  "created_at": "2014-02-18T17:10:43Z"
}
```

<h2 id="setting_alerts_in_dashboad">Setting Alerts in Dashboard</h2>
You can easily create an alert through our interface on our queue view in the Iron.io dashboard.
Navigate down and click view queue alerts on the left hand side of the queue view.

![IronMQ-Alerts-Location-Dashboard](/images/mq/reference/alerts/IronMQ-Alerts-Location-Dashboard.png "IronMQ-Alerts-Location-Dashboard")

Here you can add up to 5 alerts per queue.

![IronMQ-Alerts-Dashboard](/images/mq/reference/alerts/IronMQ-Alerts-Dashboard.png "IronMQ-Alerts-Dashboard")

<h2 id="important_notes">Important Notes</h2>

* Our system checks for duplicate alerts each time you
  add a new alert to a queue. It the compares `type`, `direction`, and
  `trigger` parameters to find duplicates. If one or more of the new
  alerts is a duplicate, we will return a `HTTP 400` error and message as such: `{"msg": "At least one new alert duplicates current queue alerts."}`.
* When you try to add alerts to a [Push Queue](/mq/reference/push_queues/)
  or convert Pull Queue with alerts to a Push Queue, IronMQ will
  respond with `HTTP 400` error and message as such:
  `{"msg": "Push queues do not support alerts."}`
