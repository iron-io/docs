---
title: IronMQ On-Premise API Reference
summary: "IronMQ On-Premise has made a vew improvements over our previous API. This reference is a continuing work in progress"
layout: default
section: mq-onpremise
---


## Changes

Changes from v2.0:

- Per-message expirations turn into per-queue expirations
- Timed out and released messages go to the front of the queue. (This
is not an API change, but it is a behavior change that will likely
cause some tests to fail.)
- Push queues must be explicitly created. There's no changing a queue's type.
- All json objects are wrapped at the root level.
- All object structures changed a bit, please review json.
- Clear messages endpoint changed to be part of delete messages.
- Can no longer set timeout when posting a message, only when reserving one.
- Webhook url is no longer /queues/{queue_name}/messages/webhook, it's now /queues/{queue_name}/webhook
- Pagination principle in List Queues changed. It doesn’t support `page` parameter. You should specify the name of queue prior to the first desirable queue in result.

## Contents

1. [Global Stuff](#global-stuff)
2. [Queues](#queues)
  1. [Create Queue](#create-queue)
  2. [Get Queue](#get-queue)
  3. [Update Queue](#update-queue)
  4. [Delete Queue](#delete-queue)
  4. [List Queues](#list-queues)
  5. [Add or Update Subscribers](#add-subscribers)
  5. [Replace Subscribers](#replace-subscribers)
  6. [Remove Subscribers](#remove-subscribers)
  5. [Add Alert](#add-alert)
  6. [Remove Alert](#remove-alert)
1. [Messages](#messages)
  1. [Post Message](#post-messages) - Core operation to add messages to a queue
  2. [Post Message via Webhook](#post-message-via-webhook)
  2. [Reserve/Get Messages](#reserve-messages) - Core operation to get message(s) off the queue.
  2. [Get Message by Id](#get-message-by-id)
  2. [Peek Messages](#peek-messages) - View first messages in queue without reserving them
  3. [Delete Message](#delete-message) - Core operation to delete a message after it's been processed
  3. [Delete Messages](#delete-messages) - Batch delete
  2. [Release Message](#release-message) - Makes a message available for another process
  3. [Touch Message](#touch-message) - Extends the timeout period so process can finish processing message
  3. [Clear Messages](#clear-messages) - Removes all messages from a queue
  4. [Get Push Statuses for a Message](#get-push-statuses)


## <a name="global-stuff"></a> Global Stuff

Base path: `/3/projects/{project_id}`

All requests:

Headers:

- Content-type: application/json

Authentication

Headers:

- Authorization: OAuth TOKEN

## <a name="queues"></a> Queues

### <a name="create-queue"></a> Create Queue

PUT `/queues/{queue_name}`

Request:

All fields are optional.

`type` can be one of: [`multicast`, `unicast`, `pull`] where `multicast` and `unicast` define push queues. default is `pull`

If `push` field is defined, this queue will be created as a push queue and must contain at least one subscriber. Everything else in the push map is optional.

A `push` queue cannot have alerts.


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
      "error_queue": "error_queue_name"
    }
    "alerts": [
      {
       "type": "fixed",
       "trigger": 100,
       "direction": "asc",
       "queue": "target_queue_name",
       "snooze": 60
      }
    ]
  }
}
```

Response: 201 Created

SAME AS GET QUEUE INFO

### <a name="get-queue"></a> Get Queue Info

GET `/queues/{queue_name}`

Response: 200 or 404

Some fields will not be included if they are not applicable like `push` if it's not a push queue and `alerts` if
there are no alerts.

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
          "headers": {"Content-Type": "application/json"}
        }
      ],
      "retries": 3,
      "retries_delay": 60,
      "error_queue": "error_queue_name"
    },
    "alerts": [
      {
        "type": "fixed",
        "trigger": 100,
        "direction": "asc",
        "queue": "target_queue_name",
        "snooze": 60
      }
    ]
  }
}
```


### <a name="update-queue"></a> Update Queue

PATCH `/queues/{queue_name}`

Request:

SAME AS CREATE QUEUE, except queue type, which is static.

**Note:** API raises error when you try to set subscribers to pull type queue or alerts on push queue.

Response: 200 or 404

Some fields will not be included if they are not applicable like `push` if it's not a push queue and `alerts` if
there are no alerts.

SAME AS GET QUEUE INFO

### <a name="delete-queue"></a> Delete Queue

DELETE `/queues/{queue_id}`

Response: 200 or 404

```json
{
  "msg": "Deleted"
}
```

### <a name="list-queues"></a> List Queues

GET `/queues`

Lists queues in alphabetical order.

Request URL Query Parameters:

- per\_page - number of elements in response, default is 30.
- previous - this is the last queue on the previous page, it will start from the next one. If queue with specified name doesn’t exist result will contain first `per_page` queues that lexicographically greater than `previous`
- prefix - an optional queue prefix to search on. e.g., prefix=ca could return queues ["cars", "cats", etc.]

Response: 200 or 404

```json
{
  "queues": [
    {
      "name": "queue_name_here"
    },
  ]
}
```


### <a name="add-subscribers"></a> Add or Update Subscribers to a Queue

POST `/queues/{queue_name}/subscribers`

Add subscribers (HTTP endpoints) to a queue.
In the case subscriber with given name exists, it will be updated.

Request:

```js
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

```js
{
  "msg": "Updated"
}
```


### <a name="replace-subscribers"></a> Replace Subscribers on a Queue

PUT `/queues/{queue_name}/subscribers`

Sets list of subscribers to a queue. Older subscribers will be removed.

Request:

```js
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

```js
{
  "msg": "Updated"
}
```


### <a name="remove-subscribers"></a> Remove Subscribers from a Queue

DELETE `/queues/{Queue Name}/subscribers`

Remove subscriber from a queue. This is for Push Queues only.

Request:

```js
{
  "subscribers": [
    {
      "name": "other"
    }
  ]
}
```

Response:

```js
{
  "msg": "Updated"
}
```


## <a name="messages"></a> Messages

### <a name="post-messages"></a> Post Messages

POST `/queues/{queue_name}/messages`

Request:

```json
{
  "messages": [
    {
      "body": "This is my message 1.",
      "delay": 0
    },
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


### <a name="reserve-messages"></a> Reserve Messages

POST `/queues/{queue_name}/reservations`

Request:

All fields are optional.

- n: The maximum number of messages to get. Default is 1. Maximum is 100. Note: You may not receive all n messages on every request, the more sparse the queue, the less likely you are to receive all n messages.
- timeout:  After timeout (in seconds), item will be placed back onto queue. You must delete the message from the queue to ensure it does not go back onto the queue. If not set, value from queue is used. Default is 60 seconds, minimum is 30 seconds, and maximum is 86,400 seconds (24 hours).
- wait: Time to long poll for messages, in seconds. Max is 30 seconds. Default 0.
- delete: If true, do not put each message back on to the queue after reserving. Default false.

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

GET `/queues/{queue_name}/messages/{message_id}`

Response: 200

TODO push queue info ?

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

GET `/queues/{queue_name}/messages`

Request:

- n: The maximum number of messages to peek. Default is 1. Maximum is 100. Note: You may not receive all n messages on every request, the more sparse the queue, the less likely you are to receive all n messages.

Response: 200

Some fields will not be included if they are not applicable like `push` if it's not a push queue and `alerts` if
there are no alerts.

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

DELETE `/queues/{queue_name}/messages/{message_id}`

Request:

- reservation_id: This id is returned when you [reserve a message](#reserve-messages) and must be provided to delete a message that is reserved.
If a reservation times out, this will return an error when deleting so the consumer knows that some other consumer will be processing this message and can rollback or react accordingly.
If the message isn't reserved, it can be deleted without the reservation_id.

```json
{
  "reservation_id": "def456"
}
```

Response: 200 or 404

```json
{
  "msg": "Message deleted."
}
```

### <a name="delete-messages"></a> Delete Messages

DELETE `/queues/{queue_name}/messages`

This is for batch deleting messages. Maximum number of messages you can delete at once is 100.

Request:

- reservation_id: This id is returned when you [reserve a message](#reserve-messages) and must be provided to delete a message that is reserved. If a reservation times out, this will return an error when deleting so the worker knows that some other worker will be processing this message and can rollback or react accordingly.

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
  "msg": "Deleted."
}
```

### <a name="touch-message"></a> Touch Message

POST `/queues/{queue_name}/messages/{message_id}/touch`

Request:

```json
{
  "reservation_id": "5259a40cf166faa76a23f7450daaf497"
}
```

Response: 200 or 404

```json
{
  "msg": "Touched"
}
```


### <a name="release-message"></a> Release Message

POST `/queues/{queue_name}/messages/{message_id}/release`

Request:

```json
{
  "reservation_id": "5259a40cf166faa76a23f7450daaf497",
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

DELETE `/queues/{queue_name}/messages`

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

GET `/queues/{queue_name}/messages/{message_id}/subscribers`

You can retrieve the push statuses for a particular message which will let you know which subscribers have received the
message, which have failed, how many times it's tried to be delivered and the status code returned from the endpoint.

Response:

```js
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
