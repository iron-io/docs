---
title: IronMQ Dead Letter Queue Reference
layout: default
section: mq-v3
breadcrumbs:
  - ['Reference', '/reference']
  - ['Dead Letter Queue', '/dlq']
---

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#creating">Creating a Dead Letter Queue</a></li>
    <li><a href="#deleting">Deleting a Dead Letter Queue</a></li>
    <li><a href="#behavior">Behavior</a></li>
    <li><a href="#use-case">One Time Delivery Use Case</a></li>
  </ul>
</section>

<h2 id="overview">Overview</h2>

A dead letter queue is a queue that other (source) queues can target to send
messages that for some reason could not be successfully processed. Dead letter
queues can only be used as a target from a pull queue. Messages that have
exceeded the allowed number of time outs on the source queue are
placed onto the dead letter queue. Messages on the dead letter queue can then
be processed again or analyzed to try to determine why they weren't
successfully processed in the first place, without having to throw them away.

A dead letter queue <b>cannot be specified on a push queue</b>, for
something similar, see [error queues](/reference/push_queues#error_queues).

<h2 id="creating">Creating a Dead Letter Queue</h2>

To add a dead letter queue to a queue, use the create or update queue
endpoint:

```
PUT /3/projects/:project/queues/:queue

{"queue":{"dead_letter":{"queue_name":"deadies", "max_reservations":1}}}
```

`"queue_name"` must be a non-empty string in order to create a dead letter
queue, otherwise the request will error unless the queue already has a dead
letter queue defined on it. `"max_reservations"` can be specified if desired
to be a value `1 <= max_reservations <= 1000`, and will default to 10 if
omitted. 
If a queue with the given dead letter queue name already exists, it's used as
is. Otherwise, a new queue is automatically created with the default pull
queue settings.

<h2 id="deleting">Removing a Dead Letter Queue</h2>

In order to turn off the dead letter queue feature on a queue, the user should
use the update queue endpoint with an empty `"queue_name"` in the
`"dead_letter"` field:

```
PUT /3/projects/:projects/queues/:queue

{"queue":{"dead_letter":{"queue_name":""}}}
```

The response will be a queue without a `"dead_letter"` section, if successful.
This action will not remove the messages on the queue or delete the queue previously
at `"queue_name"`. The only consequence of this action is that messages will
no longer be sent from the source queue to the dead letter queue.

<h2 id="behavior">Behavior</h2>

Upon addition of a dead letter queue to a queue's configuration, any message,
including any existing messages on the queue, whose `reserved_count` field
exceeds the `dead_letter.max_reservations` threshold will be placed onto the
queue specified as `dead_letter.queue_name` under the same project, and
removed from the current queue.

The messages are sent to the dead letter queue as is; that is, the message
`id` is the same as the original message from the queue of origin. The
`reserved_count` field is preserved on the dead letter queue, as well.  The
`body` of the message also remains unchanged. The `id` remaining the same
should make it easy to correlate events on each message across the original
queue and the dead letter queue, if desired. The only field we update is the
message expiration is adjusted to the message expiration for the dead letter
queue upon insertion into the dead letter queue; i.e. after adding a message
to the dead letter queue, the expiration will be extended to 7 days (by
default) from that point in time, not the original enqueue time. Since
`reserved_count` is maintained, users should be careful if they have a dead
letter queue for their dead letter queue (yo dawg...). Example dlq message for
a queue with `dead_letter.max_reservations = 10`:

```
queue                       dlq

{                           {
  id: 1234567891011,          id: 1234567891011,
  reserved_count: 10,         reserved_count: 10,
  body: "sup"                 body: "sup"
}                           {
```

There is only one operation that can spur a message being moved to the dead
letter queue, that operation is `reserve`. Viewing messages in the dashboard
or using `peek` or `get`  will not count against the current `reserved_count`.
Also, simply adding a `dead_letter` section to a queue will not in itself make
messages move to the dead letter queue, only from `reserving` once we come
across any messages that meet the criterion.

`reserved_count` is a field on each message that will be incremented each time
a message is returned from `reserve` with the current reservation count,
including the reservation which took place to return it from `reserve`; i.e.,
the first reservation of a message will have `msg.reserved_count = 1`.
`touch` is the only other operation that modifies `msg.reserved_count`,
however, `touch` causing `reserved_count` to exceed the
`dead_letter.max_reservations` threshold will not cause the message to be
moved to the dead letter queue immediately, only after we come across the
message in `reserve`.

Since queues may exist across nodes, we cannot guarantee delivery of messages
to the dead letter queue and both progress on the current queue. This means
that during certain failure scenarios (such as the dead letter queue having no
replicas online) we prefer to make progress on the main queue and can drop
messages that were intended to go to the dead letter queue. The expectation is
that this is rare, and only during failure scenarios, but here is a disclaimer
that it can happen. This also means that there is a slight latency penalty on
`reserve` once we do come across any messages that meet the dead letter queue
criterion; in nominal usage having a dead letter queue specified doesn't
affect performance. If this policy is unacceptable, users can do a similar
check of `msg.reserved_count` and do whatever they please with each message.

<h2 id="use-case">One Time Delivery Use Case</h2>

The all hailed one time delivery for messages in a queueing system can be
imitated using a dead letter queue, if desired, by setting
`dead_letter.max_reservations = 1`.

Doing so will mean that the message can only be reserved one time on the
original queue, and any successive attempts to reserve the message will result
in the message being moved to the dead letter queue. The message then exists
on the dead letter queue and the second, third, etc deliveries can be handled
differently by consumers / by different consumers.

This can also be done simply by checking the `reserved_count` on each message
even without the dead letter queue specified, but the dead letter queue makes
this easier for consumers if they would like to use it.
