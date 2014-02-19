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
  </ul>  
</section>

<h2 id="overview">Overview</h2>

[Blog Post for Overview](http://blog.iron.io).

Alerts have now been incorporated into IronMQ. This feature lets developers control actions based on the activity within a queue. With alerts, actions can be triggered when the number of messages in a queue reach a certain threshold. These actions can include things like auto-scaling, failure detection, load-monitoring, and system health.&nbsp;

<h2 id="alerts_parameters">Alerts Parameters</h2>

IronMQ provides number of routes to manipulate queue alerts.

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

Acceptable fields of alert hash are:

* **type** - required - "fixed" or "progressive".
In case of alert's type set to "fixed", alert will be triggered when queue size pass value
set by **trigger** parameter.
When type set to "progressive", alert will be triggered when queue size pass any of values,
calculated by `trigger * N` where N >= 1. For example, if **trigger** set to 10,
alert will be triggered at queue sizes 10, 20, 30, etc. 

* **direction** - required - "asc" or "desc".
Set direction in which queue size must be changed when pass trigger value.
If direction set to "asc" queue size must growing to trigger alert.
When direction is "desc" queue size must decreasing to trigger alert.
* **trigger** - required. It will be used to calculate actual values of queue size when alert must be triggered.
See **type** field description. Trigger must be integer value greater than 0.
* **queue** - required. Name of queue which will be used to post alert messages.
* **snooze** - optional. Number of seconds between alerts.
If alert must be triggered but snooze is still active, alert will be omitted.
Snooze must be integer value greater than or equal to 0.

##### Delete Alerts Endpoints

* [Delete alerts from a queue](/mq/reference/api/#delete_alerts_from_a_queue)
* [Delete alert from a queue by ID](/mq/reference/api/#delete_alert_from_a_queue_by_id)


<h2 id="alerts_messages">Alerts Messages</h2>

Alerts messages are JSONified strings in the following format:

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
