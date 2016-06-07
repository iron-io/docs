---
title: IronMQ Push Queues Reference
layout: default
section: mq-v3
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
    <li><a href="#troubleshooting_push_queues">Troubleshooting Your Push Queues</a>
      <ul>
        <li><a href="#using_error_queue">Using Error Queues feature</a></li>
        <li><a href="#requestbin">Using Requestb.in</a></li>
        <li><a href="#using_ngrok">Testing on localhost with Ngrok</a></li>
      </ul>
    </li>
  </ul>
</section>

<h2 id="overview">Overview</h2>

[Blog Post for Overview](http://blog.iron.io/2013/01/ironmq-push-queues-reliable-message.html). You should also review
the [MQ API for push queue related endpoints](http://dev.iron.io/mq/reference/api/).

<h2 id="subscribers">Subscribers</h2>

Subscribers are simply URL's that IronMQ will post to whenever a message is posted to your queue. There are currently
three types of subscribers supported, all differentiated by the URL scheme (first part of the URL):

1. **HTTP endpoints:** urls with the  **http** or **https** prefix for instance, http://myapp.com/some/endpoint or https://myapp.com/some/endpoint. **WARNING:** Do not use the following RFC 3986 Reserved Characters  within your in the naming of your subscriber endpoints.
2. **IronMQ endpoints:** IronMQ endpoints point to another queue on IronMQ. Use these to do fan-out to multiple queues. More info on the IronMQ URL format below.
3. **IronWorker endpoints:** IronWorker endpoints will fire up an IronWorker task with the message body as the payload. More info on the IronWorker URL format below.

### Iron.io URL Formats

The basic formats are similar to any other URL:

    ironmq://[{ProjectID}:{Token}@[{Host}[:{Port}]]]/{QueueName}

    ironworker://{ProjectID}:{Token}@{Host}[:{Port}]/{CodeName}

Here are some examples:

- ironmq:///receiver-queue - refers to the queue named "receiver-queue" in the same project.
- ironmq://ProjectId:Token@/QueueName - refers to the queue named "QueueName" in a different project on same region/cloud.
- ironmq://ProjectId:Token@mq-rackspace-dfw.iron.io/MyQueue - refers to the queue named "MyQueue" on a different region/cloud.
- ironworker://ProjectId:Token@worker-aws-us-east-1.iron.io/myWorker - refers to a worker on IronWorker called "MyWorker".

<h2 id="push_queue_settings">Push Queue Settings</h2>

To create a push queue, POST to your queue endpoint with the following parameters:

- `subscribers` - required - an array of hashes containing subscribers. eg: `{"name": "my-subscriber", "url": "http://myserver.com/endpoint"}`.
**WARNING:** Do not use the following RFC 3986 Reserved Characters in the naming of your subscriber endpoints (URLs)
<p>! * ' ( ) ; : @ & = + $ , / ? # [ ]</p>
- `push_type` - multicast or unicast. Default is multicast. Set this to 'pull' to revert back to a pull queue.
- `retries` - number of times to retry. Default is 3. Maximum is 100.
- `retries_delay` - time in seconds between retries. Default is 60. Minimum is 3 and maximum is 86400 seconds.
- `error_queue` - the name of another queue where information about messages that can't be delivered after retrying `retries` number
of times will be placed. Pass in an empty string to disable error queue. Default is disabled.
The default queue type for an error queue will be a pull queue. See
<a href="#error_queues">Error Queues</a> section below.

<div>
<script src="https://gist.github.com/featalion/0d18d579f62361e70ed7.js"></script>
</div>

<h2 id="queueing_messages">Queueing Messages</h2>

This is the same as posting any message to IronMQ. Here is a curl example to post a message to the queue:

<div>
<script src="https://gist.github.com/featalion/a649e7e82401a8522da0.js"></script>
</div>

You should get a curl response that looks like this:

<div>
<script src="https://gist.github.com/4489435.js"> </script>
</div>

<h2 id="retries">Retries</h2>

IronMQ will automatically retry if it fails to deliver a message. This can be either a connection error, an error response (eg: 5xx),
or any other scenario that does not return 2xx response. The behavior is a bit different depending on whether it's unicast or
multicast as follows:

- **multicast** treats each endpoint separately and will try each endpoint once per retry. If one endpoint fails,
it will retry that single endpoint after retries_delay, it won't retry endpoints that were successful.
- **unicast** will try one endpoint in the set of subscribers. If it succeeds, that message is considered delivered.
If it fails, a different endpoint is tried immediately and this continues until a successful response is returned
or all endpoints have been tried. If there is no successful response from all endpoints, then the message will
be retried after retries_delay.

<h2 id="error_queues">Error Queues</h2>

Error queues are used to get information about messages that we were unable to deliver due to errors/failures while trying to push a message.

### To create an error queue
Post to your push queue a message with the "error_queue" option defined.

<div>
<script src="https://gist.github.com/featalion/eb48f00593b45e902e58.js"></script>
</div>

If a push queue is set with the `error_queue` parameter, then after the set number of `retries`, a message will be put in the named error queue and viewable via your account dashboard. By default, the error queue will be a pull queue.

<div>
<img src="http://i.imgur.com/PVyiVWG.png" alt="appearence of first error message on a iron error queue" class="img-med">
</div>

**NOTE:** An error queue will not appear in your dashboard until an initial error message is received.

The error queue message will contain the following information:

```json
{
  "source_msg_id": "5924620498196814694",
  "body":"SOURCE_MESSAGE_BODY_HERE",
  "headers":{
    "USER_AGENT":"YOU",
    "OTHER_HEADERS":"HERE"
  },
  "subscribers": [
    {
      "name": "my-subscriber",
      "url": "http://thiswebsitewillthrowanerror.com",
      "code": 500,
      "msg": "Internal server error."
    }
  ]
}
```

You can look up the original message if needed via the [GET message endpoint](/mq/reference/api/#get_message_by_id) using
the `source_msg_id` value.

### To turn off/disable an error queue
Post to your push queue set the error queue option to an empty string. ex: "error_queue": "".

<div>
<script src="https://gist.github.com/featalion/d4128ebb9812b3859020.js"></script>
</div>

**NOTE:** Ommitting the "error_queue" option will not disable the error queue.

<h2 id="checking_status">Checking Status</h2>

If you want the detailed status of the delivery to each of your subscribers, you can check that too. In the curl example below, you'll need to exchange MESSAGE_ID with the id that was returned in the response above when you posted a message.

<div>
<script src="https://gist.github.com/featalion/76f4d924c5d904b2d48e.js"></script>
</div>

This should return a response like this:

<div>
<script src="https://gist.github.com/featalion/1717c7d50c00ab00e14e.js"></script>
</div>

<h2 id="how_the_endpoint_should_handle_push_messages">How the Endpoint Should Handle Push Messages</h2>

These are the things the endpoint that is receiving the push should know about.

Push messages' bodies will be sent to endpoints as is (strings) as POST request body.
To obtain message's body just read request body.

The receiving endpoint must respond with a 200 or 202 if they have accepted the message successfully.

<h3 id="response_codes">Response Codes</h3>

- 200 - message is deleted / acknowledged and removed from the queue.
- 202 - message is reserved until explicitly deleted or the timeout is exceeded. See 202 section below.
- 4XX or 5XX - the push request will be retried.

<h3 id="timeout">Timeout</h3>

If an endpoint doesn't respond within timeout, it's marked as failed/error and will be retried.

Default timeout is 10 seconds.

If you'd like to take more time to process messages, see 202 section below.

<h3 id="long_running_processes__aka_202s">Long Running Processes - aka 202</h3>

If you'd like to take some time to process a message, more than the 10 second timeout, you must respond with HTTP status code 202.
Be sure to set `retries_delay`'s value to the maximum amount of time you'd like your processing to take.
If you do not explicitly delete the message before the timeout has passed, the message will be retried.
To delete the message, check the `Iron-Subscriber-Message-Url` header and send a DELETE request to that URL.

<h3 id="push_queue_headers">Push Queue Headers</h3>

<p>
Each message pushed will have the following special headers as part of the HTTP request.
</p>

<p>
Only <code>User-Agent</code> and <code>Content-Type</code> headers may be overwritten
by subscriber or push headers, the others are always set by push queues.
</p>

- `User-Agent` - <code>IronMQ Pusherd</code> (default, may be overwritten by subscriber or message headers)
- `Content-Type` - <code>text/plain; encoding=utf-8</code> (default, may be overwritten by subscriber or message headers)
- `Iron-Message-Id` - The ID for your original message allowing you to check the status
- `Iron-Reservation-Id` - The ID of a message reservation. If client respond with 202, it will be valid "retries_delay" seconds.
- `Iron-Subscriber-Name` - A name of the particular subscriber.
- `Iron-Subscriber-Message-Url` - A URL to delete/acknowledge the message. Generally used with the 202 response code to tell
IronMQ that you're done with the message. Send a DELETE http request to this URL to acknowledge it.

<h2 id="encryption_and_security">Encryption and Security</h2>

When you are using your private API as subscriber
and want to secure connection to IronMQ you are able to use HTTPS endpoints.

    https://subscriber.domain.com/push/endpoint

Also, if you want some kind of authentication you can use various standards for authorization with tokens.
Like OAuth or OpenID. In this case, specify a token in your subscriber's URL.

    https://subscriber.domain.com/push/endpoint?auth=TOKEN

Another possibility to specify a token is put it to your messages' bodies and parse it on your side.
In this case a token will be encrypted by SSL/TLS.

<h2 id="important_notes">Important Notes</h2>

- Queue type is static.
- Do not use the following RFC 3986 Reserved Characters in the naming of your subscriber endpoints.

<h2 id="troubleshooting_push_queues">Troubleshooting Push Queues</h2>
Push queues are extremely powerful but do not by default give insight on what happens to your message once it leaves queue. Did it hit the endpoint? Did it retry multple times due to a server timeout error? Do I need to set a different content-type header?

At Iron we have 3 recommended ways to debug problems you may encounter with your push queues: using IronMQ's Error Queue feature, RequestBin, and Ngrok

<h3 id="using_error_queue">Using Error Queues (IronMQ Feature)</h3>
Error queues are vastly useful to record, document, and react to retries, errors, and bugs that involve your Message queue endpoint.
See our <a href="http://dev.iron.io/mq/reference/push_queues/#error_queues">Error Queue Documentation</a> on how to setup and read error queue messages.

<h3 id="requestbin">Using RequestBin</h3>
<a href="http://requestb.in/">RequestBin</a> is a very useful and free service provided by Iron.io's friends at <a href="https://www.runscope.com/">Runscope</a> that helps users debug all kinds of request to a unqiuely generated endpoint. A bin will keep the last 20 requests made to it and remain available for 48 hours after it was created.You can create a more permanent bin by signing up  <a href="https://www.runscope.com/signup">here</a>.
<ol style="list-style-type: none">
  <li><strong>Step 1:</strong> go to <a href="http://requestb.in/">http://requestb.in/</a> and click on "Create a RequestBin <br><img src="/images/mq/reference/troubleshooting/step-1.png" alt="push queue troubleshooting step 1">  </li>
  <li><strong>Step 2:</strong> copy the unique url<br> <img src="/images/mq/reference/troubleshooting/step-2.png" alt="push queue troubleshooting step 2"></li>
  <li><strong>Step 3:</strong> paste it as a subscriber endpoint on your queue. This example shows us pasting it via the hud/dashboard interface but you an do the same using th raw api.<br><img src="/images/mq/reference/troubleshooting/step-3.png" alt="push queue troubleshooting step 3" width="100%"></li>
  <li><strong>Step 4:</strong> post a message to your push queue, return to your unique RequestBin's inspect page. Here you will be able to view and inspect your the headers and response body amongst other very useful information about your push queue's request.
    <img src="/images/mq/reference/troubleshooting/step-4.png" width="100%" alt="push queue troubleshooting step 4"></li>
</ol>
<p>Seeing that your message was delivered successfully to a bin will easily tell you that there may be a problem with how your server is handling the message that is coming from your push queue. Often times it could be an endpoint that has not been coded to handle the post parameter's content type, endpoints that don't exist, or returning a bad response code due to internal server errors.</p>

<h2 id="using_ngrok">Testing on localhost with Ngrok</h2>
To be able to develop and test on your local machine, you'll need to make your localhost accessible for IronMQ. This can be easily done by tunneling it to the outside world with tools such as [ngrok](https://ngrok.com/).
<ol style="list-style-type: none">
  <li><strong>Step 1:</strong> install ngrok</li>
  <li><strong>Step 2:</strong> open ngrok to your localhost's port and recieve a unique subdomain on http://XXXXX.ngrok.com or https://XXXXX.ngrok.com<img src="/images/mq/reference/troubleshooting/ngrok-step-2.png" width="100%" alt="push queue troubleshooting with ngrok step 2"></li>
  <li><strong>Step 3:</strong> inspect your traffic via Ngrok's local interface at http://localhost:4040 <img src="/images/mq/reference/troubleshooting/ngrok-step-3.png" width="100%" alt="push queue troubleshooting with ngrok step 3"></li>
  <li><strong>Last Step: debug, debug, debug!</strong> You can reply the message to your local server at which point you can debug consistantly with your favorite debugging methods, i.e print statements and runtime debuggers.
  </li>
</ol>
