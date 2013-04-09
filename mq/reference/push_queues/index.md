---
title: IronMQ Push Queues
layout: default
section: mq
breadcrumbs:
  - ['Reference', '/reference']
  - ['Push Queues', '/push_queues']
---

* [Overview](#overview)
* [Push Queue Settings](#push_queue_settings)
* [Queueing Messages](#queueing_messages)
* [Checking Status](#checking_status)
* [How the Endpoint Should Handle Push Messages](#how_the_endpoint_should_handle_push_messages)
  * [Response Codes](#response_codes)
  * [Timeout](#timeout)
  * [Long Running Processes - aka 202's](#long_running_processes__aka_202s)
  * [Push Queue Headers](#push_queue_headers)
* [Important Notes](#important_notes)

## Overview

[Blog Post for Overview](http://blog.iron.io/2013/01/ironmq-push-queues-reliable-message.html)

## Push Queue Settings

To turn a queue into a push queue (or create one), POST to your queue endpoint with the following parameters:

- subscribers - required - an array of hashes containing subscribers. eg: {"url": "http://myserver.com/endpoint"}
- push_type - multicast or unicast. Default is multicast.
- retries - number of times to retry. Default is 3.
- retries_delay - time in seconds between retries. Default is 60.

<div>
<script src="https://gist.github.com/4479844.js"> </script>
</div>

## Queueing Messages

This is the same as posting any message to IronMQ. Here is a curl example to post a message to the queue:

<div>
<script src="https://gist.github.com/4479849.js"> </script>
</div>

You should get a curl response that looks like this:

<div>
<script src="https://gist.github.com/4489435.js"> </script>
</div>

## Checking Status

If you want the detailed status of the delivery to each of your subscribers, you can check that too. In the curl example below, you'll need to exchange MESSAGE_ID with the id that was returned in the response above when you posted a message.

<div>
<script src="https://gist.github.com/4489392.js"> </script>
</div>

This should return a response like this:

<div>
<script src="https://gist.github.com/4489402.js"> </script>
</div>

## How the Endpoint Should Handle Push Messages

These are the things the endpoint that is receiving the push should know about. The receiving endpoint must respond
with a 200 or 202 if they have accepted the message successfully.

### Response Codes

- 200 - message is deleted / acknowledged and removed from the queue.
- 202 - message is reserved until explicitly deleted or the timeout is exceeded. See 202 section below.
- 4XX or 5XX - the push request will be retried.

### Timeout

If an endpoint doesn't respond within timeout, it's marked as failed/error and will be retried.

Default timeout is 60 seconds.

If you'd like to take more time to process messages, see 202 section below.

### Long Running Processes - aka 202's

If you'd like to take some time to process a message, more than the 60 second timeout, you must respond with HTTP status code 202.
Be sure to set the "timeout" value when [posting your message](/mq/reference/api) to the maximum amount of time you'd like your processing to take.
If you do not explicitly delete the message before the "timeout" has passed, the message will be retried.
To delete the message, check the "Iron-Subscriber-Message-Url" header and send a DELETE request to that URL.

### Push Queue Headers

Each message pushed will have some special headers as part of the HTTP request.

- User-Agent - static - "IronMQ Pusherd"
- Iron-Message-Id - The ID for your original message allowing you to check the status
- Iron-Subscriber-Message-Id - The ID for the message to the particular subscriber.
- Iron-Subscriber-Message-Url - A URL to delete/acknowledge the message. Generally used with the 202 response code to tell
IronMQ that you're done with the message. Send a DELETE http request to this URL to delete it.

## Important Notes

- You should not push and pull from a queue, a push queue's messages will be deleted/acknowledged immediately and not be
available for pulling.
- When a Pull Queue contains messages and you turn it to Push Queue you still be able to get messages from the queue.
Also, contained messages will not be send to your subscribers. New messages will be processed as usual for Push Queue.
- To revert your Push Queue to regular Pull Queue just update `push_type` to `"pull"`.
