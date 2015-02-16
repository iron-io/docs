---
title: IronMQ On-Premise API Reference
summary: "IronMQ On-Premise has made a vew improvements over our previous API. This reference is a continuing work in progress"
layout: default
section: mq-onpremise
---


## Contents

1. [Changes](#changes)
2. [Global Stuff](#global-stuff)
3. [Queues](#queues)
  1. [Create Queue](#create-queue)
  2. [Get Queue](#get-queue)
  3. [Update Queue](#update-queue)
  4. [Delete Queue](#delete-queue)
  5. [List Queues](#list-queues)
  6. [Add or Update Subscribers](#add-subscribers)
  7. [Replace Subscribers](#replace-subscribers)
  8. [Remove Subscribers](#remove-subscribers)
4. [Messages](#messages)
  1. [Post Messages](#post-messages) - Core operation to add messages to a queue
  2. [Post Messages via Webhook](#post-message-via-webhook)
  3. [Reserve/Get Messages](#reserve-messages) - Core operation to get message(s) off the queue.
  4. [Get Message by Id](#get-message-by-id)
  5. [Peek Messages](#peek-messages) - View first messages in queue without reserving them
  6. [Delete Message](#delete-message) - Core operation to delete a message after it's been processed
  7. [Delete Messages](#delete-messages) - Batch delete
  8. [Release Message](#release-message) - Makes a message available for another process
  9. [Touch Message](#touch-message) - Extends the timeout period so process can finish processing message
  10. [Clear Messages](#clear-messages) - Removes all messages from a queue
  11. [Get Push Statuses for a Message](#get-push-statuses)


## <a name="changes"></a> Changes

Changes from v2.0.1:

- Dequeue now returns a reservation. This `reservation_id` and `message_id` are required
to perform any action (ie deleting, touching, releasing). The reservation is valid for
the length of the message timeout (inherited from the queues timeout) unless a timeout
was specified on the dequeue call.
- Expiration and timeout can no longer be set on message enqueue.
- Timed out and released messages go to the front of the queue. (This
is not an API change, but it is a behavior change that will likely
cause some tests to fail.)
- Push queues must be explicitly created. There's no changing a queue's type.
- All json objects are wrapped at the root level.
- All object structures changed a bit, please review json.
- Clear messages endpoint changed to be part of delete messages.
- Can no longer set timeout when posting a message, only when reserving one.
- Webhook url is no longer `/queues/{Queue Name}/messages/webhook`,
it is now `/queues/{Queue Name}/webhook`
- Pagination principle in List Queues changed. It doesn’t support `page` parameter.
You should specify the name of queue prior to the first desirable queue in result.
- Trying to get messages from a queue that doesn't exist now returns a "Queue not found" error.


## <a name="global-stuff"></a> Global Stuff

Base path: `/3/projects/{Project ID}`

All requests:

Headers:

- Content-type: application/json

Authentication

Headers:

- Authorization: OAuth TOKEN


## <a name="queues"></a> Queues

### <a name="create-queue"></a> Create Queue

<div class="grey-box">
PUT /queues/<span class="variable queue_name">{Queue Name}</span>
</div>

Request:

All fields are optional.

`type` can be one of: [`multicast`, `unicast`, `pull`]
where `multicast` and `unicast` define push queues. default is `pull`

If `push` field is defined, this queue will be created as a push queue and must
contain at least one subscriber. Everything else in the push map is optional.

<!--A `push` queue cannot have alerts.-->

```json
{
  "queue": {
    "message_timeout": 60,
    "message_expiration": 3600,
    "type": "pull/unicast/multicast",
    "push": {
      "subscribers": [
        {
          "name": "subscriber_name",
          "url": "http://mysterious-brook-1807.herokuapp.com/ironmq_push_1",
          "headers": {"Content-Type": "application/json"}
        }
      ],
      "retries": 3,
      "retries_delay": 60,
      "error_queue": "error_queue_name",
      "rate_limit": 10
    }
  }
}
```

<!--
"alerts": [
      {
       "type": "fixed",
       "trigger": 100,
       "direction": "asc",
       "queue": "target_queue_name",
       "snooze": 60
      }
      -->


Response: 201 Created

SAME AS GET QUEUE INFO


### <a name="get-queue"></a> Get Queue Info

<div class="grey-box">
GET /queues/<span class="variable queue_name">{Queue Name}</span>
</div>

Response: 200 or 404

Some fields will not be included if they are not applicable like `push`
if it's not a push queue and `alerts` if there are no alerts.

```json
{
  "queue": {
    "project_id": 123,
    "name": "my_queue",
    "size": 0,
    "total_messages": 0,
    "message_timeout": 60,
    "message_expiration": 604800,
    "type": "pull/unicast/multicast",
    "push": {
      "subscribers": [
        {
          "name": "subscriber_name",
          "url": "http://mysterious-brook-1807.herokuapp.com/ironmq_push_1",
          "headers": {
            "Content-Type": "application/json"
          }
        }
      ],
      "retries": 3,
      "retries_delay": 60,
      "error_queue": "error_queue_name",
      "rate_limit": 10
    }
  }
}
```

<!--,
    "alerts": [
      {
        "type": "fixed",
        "trigger": 100,
        "direction": "asc",
        "queue": "target_queue_name",
        "snooze": 60
      }
-->


### <a name="update-queue"></a> Update Queue

<div class="grey-box">
PATCH /queues/<span class="variable queue_name">{Queue Name}</span>
</div>

Request:

SAME AS CREATE QUEUE, except queue type, which is static.

**Note:** API raises error when you try to set subscribers to pull type queue or alerts on push queue.

Response: 200 or 404

Some fields will not be included if they are not applicable like `push`
if it's not a push queue and `alerts` if there are no alerts.

SAME AS GET QUEUE INFO


### <a name="delete-queue"></a> Delete Queue

<div class="grey-box">
DELETE /queues/<span class="variable queue_name">{Queue Name}</span>
</div>

Response: 200 or 404

```json
{
  "msg": "Deleted"
}
```


### <a name="list-queues"></a> List Queues

<div class="grey-box">
GET /queues
</div>

Lists queues in alphabetical order.

Request URL Query Parameters:

- `per_page`: number of elements in response, default is 30.
- `previous`: this is the last queue on the previous page, it will start from the next one.
If queue with specified name doesn’t exist result will contain first `per_page` queues that
lexicographically greater than `previous`
- `prefix`: an optional queue prefix to search on. e.g., prefix=ca could return
queues ["cars", "cats", etc.]

Response: 200 or 404

```json
{
  "queues": [
    {
      "name": "queue_name_here"
    },
    {
      "name": "another_queue_name"
    }
  ]
}
```


### <a name="add-subscribers"></a> Add or Update Subscribers to a Queue

<div class="grey-box">
POST /queues/<span class="variable queue_name">{Queue Name}</span>/subscribers
</div>

Add subscribers (HTTP endpoints) to a queue.
In the case subscriber with given name exists, it will be updated.

Request:

```json
{
  "subscribers": [
    {
      "name": "first",
      "url": "http://mysterious-brook-1807.herokuapp.com/ironmq_push_2",
      "headers": {
        "Content-Type": "application/json"
      }
    },
    {
      "name": "other",
      "url": "http://this.host.is/not/exist"
    }
  ]
}
```

Response:

```json
{
  "msg": "Updated"
}
```


### <a name="replace-subscribers"></a> Replace Subscribers on a Queue

<div class="grey-box">
PUT /queues/<span class="variable queue_name">{Queue Name}</span>/subscribers
</div>

Sets list of subscribers to a queue. Older subscribers will be removed.

Request:

```json
{
  "subscribers": [
    {
      "name": "the_only",
      "url": "http://my.over9k.host.com/push"
    }
  ]
}
```

Response:

```json
{
  "msg": "Updated"
}
```


### <a name="remove-subscribers"></a> Remove Subscribers from a Queue

<div class="grey-box">
DELETE /queues/<span class="variable queue_name">{Queue Name}</span>/subscribers
</div>

Remove subscriber from a queue. This is for Push Queues only.

Request:

```json
{
  "subscribers": [
    {
      "name": "other"
    }
  ]
}
```

Response:

```json
{
  "msg": "Updated"
}
```


## <a name="messages"></a> Messages

### <a name="post-messages"></a> Post Messages

<div class="grey-box">
POST /queues/<span class="variable queue_name">{Queue Name}</span>/messages
</div>

Request:

```json
{
  "messages": [
    {
      "body": "This is my message 1.",
      "delay": 0,
      "push_headers": {
        "X-Custom-Header": "custom header value",
        "Authentication": "the token"
      }
    }
  ]
}
```

Response: 201 Created

Returns a list of message ids in the same order as they were sent in.

```json
{
  "ids": [
    "2605601678238811215"
  ],
  "msg": "Messages put on queue."
}
```

#### Push Headers Restrictions

* the maximum number of push headers per message is 5
* push header name cannot be empty
* the maximum length of push header name is 64 bytes
* push header name cannot be any of `Content-Type`, `User-Agent`, `Iron-Message-Id`, `Iron-Reservation-Id`, `Iron-Subscriber-Name`, `Iron-Subscriber-Message-Url`
* push header value cannot be empty
* the maximum length of header value is 1kb

If request contravenes restrictions, IronMQ responds with HTTP 400 Bad Request.

### <a name="post-message-via-webhook"></a> Post Messages via Webhook

By adding the queue URL below to a third party service that supports webhooks, every webhook event that the third party posts
will be added to your queue. The request body as is will be used as the "body" parameter in normal POST to queue above.

#### Push Headers

It is possible to supply custom push headers for messages, posted via webhook. IronMQ treats headers, which start with `X-Subscribers-` prefix, as push headers.
Prefix will be removed and reminder will be used as actual header name.

**NOTE:** push headers, that contravene restrictions (see [Post Messages](#post-messages) section), will be ignored and error will not be raised.

### Endpoint

<div class="grey-box">
POST /queues/<span class="variable queue_name">{Queue Name}</span>/webhook
</div>

#### URL Parameters

* **Project ID**: The project these messages belong to.
* **Queue Name**: The name of the queue. If the queue does not exist, it will be created for you.

### <a name="reserve-messages"></a> Reserve Messages

<div class="grey-box">
POST /queues/<span class="variable queue_name">{Queue Name}</span>/reservations
</div>

Request:

All fields are optional.

- `n`: The maximum number of messages to get. Default is 1. Maximum is 100. Note: You may not receive all n messages on every request, the more sparse the queue, the less likely you are to receive all n messages.
- `timeout`:  After timeout (in seconds), item will be placed back onto queue. You must delete the message from the queue to ensure it does not go back onto the queue. If not set, value from queue is used. Default is 60 seconds, minimum is 30 seconds, and maximum is 86,400 seconds (24 hours).
- `wait`: Time to long poll for messages, in seconds. Max is 30 seconds. Default 0.
- `delete`: If true, do not put each message back on to the queue after reserving. Default false.

```json
{
  "n": 1,
  "timeout": 60,
  "wait": 0,
  "delete": false
}
```

Response: 200

```json
{
  "messages": [
    {
       "id": 123,
       "body": "this is the body",
       "reserved_count": 1,
       "reservation_id": "def456"
    },
  ]
}
```

Will return an empty array if no messages are available in queue.

### <a name="get-message-by-id"></a> Get Message by Id

<div class="grey-box">
GET /queues/<span class="variable queue_name">{Queue Name}</span>/messages/<span class="variable message_id">{Message ID}</span>
</div>

Response: 200

```json
{
  "message": {
    "id": 123,
    "body": "This is my message 1.",
    "reserved_count": 1,
    "reservation_id": "abcdefghijklmnop"
  }
}
```

### <a name="peek-messages"></a> Peek Messages

<div class="grey-box">
GET /queues/<span class="variable queue_name">{Queue Name}</span>/messages
</div>

Request:

- `n`: The maximum number of messages to peek. Default is 1. Maximum is 100.
Note: You may not receive all n messages on every request, the more sparse
the queue, the less likely you are to receive all n messages.

Response: 200

Some fields will not be included if they are not applicable like `push`
if it's not a push queue and `alerts` if there are no alerts.

```json
{
  "messages": [
    {
       "id": 123,
       "body": "message body",
       "reserved_count": 1
    },
  ]
}
```

### <a name="delete-message"></a> Delete Message

<div class="grey-box">
DELETE /queues/<span class="variable queue_name">{Queue Name}</span>/messages/<span class="variable message_id">{Message ID}</span>
</div>

Request:

- `reservation_id`: This id is returned when you [reserve a message](#reserve-messages)
and must be provided to delete a message that is reserved. If a reservation times out,
this will return an error when deleting so the consumer knows that some other consumer
will be processing this message and can rollback or react accordingly.
If the message isn't reserved, it can be deleted without the reservation\_id.
- `subscriber_name`: This field could be used in case of push message processing acknowledge.
When request from IronMQ Pusher is received, and subscriber endpoint returns `HTTP 202 Accepted`,
message must be acknowledged, otherwise it will be pushed again (if retries are configured).
Send both reservation\_id and subscriber\_name to acknowledge processed message.

```json
{
  "reservation_id": "def456"
}
```

Response: 200 or 404

```json
{
  "msg": "Deleted"
}
```

### <a name="delete-messages"></a> Delete Messages

<div class="grey-box">
DELETE /queues/<span class="variable queue_name">{Queue Name}</span>/messages
</div>

This is for batch deleting messages. Maximum number of messages you can delete at once is 100.

Request:

- `reservation_id`: This id is returned when you [reserve a message](#reserve-messages)
and must be provided to delete a message that is reserved. If a reservation times out,
this will return an error when deleting so the worker knows that some other worker
will be processing this message and can rollback or react accordingly.
- `subscriber_name`: This field could be used in case of push message processing acknowledge.
When request from IronMQ Pusher is received, and subscriber endpoint returns `HTTP 202 Accepted`,
message must be acknowledged, otherwise it will be pushed again (if retries are configured).
Send both reservation\_id and subscriber\_name to acknowledge processed message.

```json
{
  "ids": [
    {
      "id": 123,
      "reservation_id": "abc"
    },
  ]
}
```

Response: 200 or 404

```json
{
  "msg": "Deleted"
}
```

### <a name="touch-message"></a> Touch Message

<div class="grey-box">
POST /queues/<span class="variable queue_name">{Queue Name}</span>/messages/<span class="variable message_id">{Message ID}</span>/touch
</div>

This request creates new reservation for a message. It requires valid `reservation_id`,
and returns new `reservation_id` for the message.

Request:

- `reservation_id`: appropriate message's reservation ID.
- `timeout`: optional. How many seconds new reservation will be valid.
Defaults to queue's `message_timeout` option.
  
```json
{
  "reservation_id": "5259a40cf166faa76a23f7450daaf497",
  "timeout": 120
}
```

Response: 200 or 404

```json
{
  "reservation_id": "5359a40cf166faa76a23f7450daaffff",
  "msg": "Touched"
}
```


### <a name="release-message"></a> Release Message

<div class="grey-box">
POST /queues/<span class="variable queue_name">{Queue Name}</span>/messages/<span class="variable message_id">{Message ID}</span>/release
</div>

Request:

```json
{
  "reservation_id": "5359a40cf166faa76a23f7450daaffff",
  "delay": 60
}
```

Response: 200 or 404

```json
{
  "msg": "Released"
}
```


### <a name="clear-messages"></a> Clear Messages

<div class="grey-box">
DELETE /queues/<span class="variable queue_name">{Queue Name}</span>/messages
</div>

This will remove all messages from a queue.

Request:

```json
{}
```

Response: 200 or 404

```json
{
  "msg": "Cleared"
}
```


### <a name="get-push-statuses"></a> Get Push Statuses for a Message

<div class="grey-box">
GET /queues/<span class="variable queue_name">{Queue Name}</span>/messages/<span class="variable message_id">{Message ID}</span>/subscribers
</div>

You can retrieve the push statuses for a particular message which will let you know which subscribers have received the
message, which have failed, how many times it's tried to be delivered and the status code returned from the endpoint.

Response:

```json
{
  "subscribers": [
    {
      "name": "first"
      "retries_remaining": 2,
      "retries_total": 6,
      "status_code": 200,
      "url": "http://mysterious-brook-1807.herokuapp.com/ironmq_push_2",
      "last_try_at": "2014-07-30T15:45:03Z"
    },
    {
      "name": "other"
      "retries_remaining": 2,
      "retries_total": 6,
      "status_code": 200,
      "url": "http://this.host.is/not/exist",
      "last_try_at": "2014-07-30T15:44:29Z"
    }
  ]
}
```
