---
title: IronMQ Push Queues
layout: default
section: mq
breadcrumbs:
  - ['Reference', '/reference']
  - ['Push Queues', '/push_queues']
---

## Overview

[Blog Post for Overview](http://blog.iron.io/2013/01/ironmq-push-queues-reliable-message.html)

## Push Queue Settings

To turn a queue into a push queue, you POST an update to your queue endpoint with the following parameters:

- subscribers - required - an array of hashes containing subscribers. eg: [{"url"=>"http://myserver.com/endpoint"}]
- push_type - multicast or unicast. Default is multicast.
- retries - number of times to retry. Default is 3.
- retries_delay - time in seconds between retries. Default is 60.

## Queueing Messages

This is the same as posting any message to IronMQ.

## The Push

These are the things the endpoint that is receiving the push should know about.

### Response Codes

- If 200, message is deleted
- If 202, message is reserved until explicitly deleted. See 202 section below.
- If 4XX or 5XX, message will be retried.

### Timeout

If an endpoint doesn't respond within timeout, it's marked as failed/error and will be retried.

Default timeout is 60 seconds.

If you'd like to take more time to process messages, see 202 section below.

### Long Running Processes - aka 202's

If you'd like to take some time to process a message, more than the 60 second timeout, respond with a 202 and be sure to
set the "timeout" value when posting your message to the max you'd like your processing to take. If you do not explicitly
delete the message before the "timeout" has passed, the message will be retried. To delete the message, check
the "Iron-Delete-Message" header and POST an empty request to that link. .

### Push Queue Headers

Each message pushed will have some special headers as part of the HTTP request.

- User-Agent - static - "IronMQ Pusherd"
- Iron-Message-Id - this is the ID for your original message allowing you to check the status
- Iron-Delete-Message - this is a URL to delete/acknowledge the message. Generally used with the 202 response code to tell
IronMQ that you're done with the message.



## Notes

- You should not push and pull from a queue, a push queue's messages will be deleted/acknowledged immediately and not be
available for pulling.

