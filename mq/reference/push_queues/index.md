---
title: IronMQ Push Queues
layout: default
section: mq
breadcrumbs:
  - ['Reference', '/reference']
  - ['Push Queues', '/push_queues']
---

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#subscribers">Subscribers</a></li>
    <li><a href="#push_queue_settings">Push Queue Settings</a></li>
    <li><a href="#queueing_messages">Queueing Messages</a></li>
    <li><a href="#retries">Retries</a></li>
    <li><a href="#error_queues">Error Queues</a></li>
    <li><a href="#checking_status">Checking Status</a></li>
    <li>
      <a href="#how_the_endpoint_should_handle_push_messages">How the Endpoint Should Handle Push Messages</a>
      <ul>
        <li><a href="#response_codes">Response Codes</a></li>
        <li><a href="#timeout">Timeout</a></li>
        <li><a href="#long_running_processes__aka_202s">Long Running Processes - aka 202's</a></li>
        <li><a href="#push_queue_headers">Push Queue Headers</a></li>
      </ul>
    </li>
    <li><a href="#encryption_and_security">Encryption and Security</a></li>
    <li><a href="#important_notes">Important Notes</a></li>
    <li><a href="#testing_on_localhost">Testing on localhost</a></li>
  </ul>  
</section>

## Overview

[Blog Post for Overview](http://blog.iron.io/2013/01/ironmq-push-queues-reliable-message.html). You should also review
the [MQ API for push queue related endpoints](http://dev.iron.io/mq/reference/api/).

## Subscribers

Subscribers are simply URL's that IronMQ will post to whenever a message is posted to your queue. There are currently
three types subscribers supported, all differentiated by the URL scheme (first part of the URL):

1. **HTTP endpoints:** urls with the  **http** or **https** prefix for instance, http://myapp.com/some/endpoint or https://myapp.com/some/endpoint
1. **IronMQ endpoints:** IronMQ endpoints point to another queue on IronMQ. Use these to do fan-out to multiple queues. More info on the IronMQ URL format below.
1. **IronWorker endpoints:** IronWorker endpoints will fire up an IronWorker task with the message body as the payload. More info on the IronWorker URL format below.

### Iron.io URL Formats

The basic format is similar to any other URL:

    [ironmq_or_ironworker]://[project_id:token]@[host]/queue_or_worker_name

Here are some examples:

- ironmq:///queue_name - refers to the queue named "queue_name" in the same project.
- ironmq://project_id:token@/queue_name - refers to the queue named "queue_name" in a different project on same region/cloud.
- ironmq://project_id:token@mq-rackspace-dfw.iron.io/queue_name - refers to the queue named "queue_name" on a different region/cloud.
- ironworker:///worker_name - refers to a worker on IronWorker called "worker_name".

## Push Queue Settings

To turn a queue into a push queue (or create one), POST to your queue endpoint with the following parameters:

- subscribers - required - an array of hashes containing subscribers. eg: `{"url": "http://myserver.com/endpoint"}`.
The maximum is 64kb for JSONify array of subscribers' hashes.
- push_type - multicast or unicast. Default is multicast. Set this to 'pull' to revert back to a pull queue.
- retries - number of times to retry. Default is 3. Maximum is 100.
- retries_delay - time in seconds between retries. Default is 60. Minimum is 3 and maximum is 86400 seconds.
- error_queue - the name of another queue where information about messages that can't be delivered after retrying `retries` number of times will be placed. Pass in an empty string to disable Error queues. Default is disabled.
The default queue type for an error queue will be a pull queue. See <a href="#error_queues">Error Queues</a> section below. 

<div>
<script src="https://gist.github.com/4479844.js"> </script>
</div>

## Queuing Messages

This is the same as posting any message to IronMQ. Here is a curl example to post a message to the queue:

<div>
<script src="https://gist.github.com/4479849.js"> </script>
</div>

You should get a curl response that looks like this:

<div>
<script src="https://gist.github.com/4489435.js"> </script>
</div>

## Retries

IronMQ will automatically retry if it fails to deliver a message. This can be either a connection error, an error response (eg: 5xx), 
or any other scenario that does not return 2xx response. The behavior is a bit different depending on whether it's unicast or
multicast as follows:

- multicast treats each endpoint separately and will try each endpoint once per retry. If one endpoint fails,
  it will retry that single endpoint after retries_delay, it won't retry endpoints that were successful.
- unicast will try one endpoint in the set of subscribers. If it succeeds, that message is considered delivered. 
  If it fails, a different endpoint is tried immediately and this continues until a successful response is returned 
  or all endpoints have been tried. If there is no successful response from all endpoints, then the message will
  be retried after retries_delay. 

## Error Queues

Error queues are used to get information about messages that we were unable to deliver due to errors/failures while trying to push a message. 

### To create an error queue
Post to your push queue a message with the "error_queue" option defined.

```
{"push_type":"multicast/unicast",
"subscribers": [
  {"url": "http://thiswebsitewillthrowanerror.com"}
  ],
"error_queue": "MY_EXAMPLE_ERROR_QUEUE"}
```

If a push queue is set with the `error_queue` parameter, then after the set number of `retries`, a message will be put in the named error queue and viewable via your account dashboard. By default, the error queue will be a pull queue.

<div>
<img src="http://i.imgur.com/PVyiVWG.png" alt="appearence of first error message on a iron error queue" class="img-med">
</div>

**NOTE:** An error queue will not appear in your dashboard until an initial error message is received.

The error queue message will contain the following information:
<div>
<script src="https://gist.github.com/6596528.js"> </script>
</div>

You can look up the original message if needed via the [GET message endpoint](/mq/reference/api/#get_message_by_id) using
the `source_msg_id` value. 

### To turn off/disable an error queue
Post to your push queue set the error queue option to an empty string. ex: "error_queue": "".

```
{"push_type":"multicast/unicast",
"subscribers": [
  {"url": "http://thiswebsitewillthrowanerror.com"}
  ],
"error_queue": ""}
```

**NOTE:** Ommitting the "error_queue" option will not disable the error queue.

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

These are the things the endpoint that is receiving the push should know about.

Push messages' bodies will be sent to endpoints as is (strings) as POST request body.
To obtain message's body just read request body.

The receiving endpoint must respond with a 200 or 202 if they have accepted the message successfully.

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

## Encryption and Security

When you are using your private API as subscriber
and want to secure connection to IronMQ you are able to use HTTPS endpoints.

    https://subscriber.domain.com/push/endpoint

Also, if you want some kind of authentication you can use various standards for authorization with tokens.
Like OAuth or OpenID. In this case, specify a token in your subscriber's URL.

    https://subscriber.domain.com/push/endpoint?auth=TOKEN

Another possibility to specify a token is put it to your messages' bodies and parse it on your side.
In this case a token will be encrypted by SSL/TLS.

## Important Notes

- You should not push and pull from a queue, a push queue's messages will be deleted/acknowledged immediately and not be
available for pulling.

- When a Pull Queue contains messages and you turn it to Push Queue you are still able to get messages from the queue.
Also, messages put on the queue before it becomes a Push Queue will not be sent to your subscribers.
New messages will be processed as usual for Push Queues, and pushed to your subscribers.

- To revert your Push Queue to regular Pull Queue just update `push_type` to `"pull"`.

## Testing on localhost

To be able to develop and test on your local machine, you'll need to make your localhost accessible for IronMQ. This can be easily done by tunneling it to the outside world with tools such as [ngrok](https://ngrok.com/).
