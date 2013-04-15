---
title: IronMQ Environment
layout: default
section: mq
breadcrumbs:
  - ['Reference', '/reference']
  - ['Environment', '/environment']
---

* [Message Structure](#message_structure)
* [Message Constraints](#message_constraints)
* [Queue Attributes](#queue_attributes)

## Message Structure
The message structure is flexible and straight-forward. Messages can be variable in size and can contain almost any text or data format.

<table class="reference">
  <thead>
    <tr><th style="width: 46%;">Message Element</th><th style="width: 54%;">Type</th></tr>
  </thead>
  <tbody>
    <tr><td>Token</td><td>OAuth2 access token</td></tr>
    <tr><td>Delay</td><td>Integer (seconds)</td></tr>
    <tr><td>Timeout</td><td>Integer (seconds)</td></tr>
    <tr><td>Expiration</td><td>Integer (seconds)</td></tr>
    <tr><td>Message body</td><td>ASCII text</td></tr>
  </tbody>
</table>


## Message Constraints
The basic message handling operation is put-get-delete. Messages are put on the queue by senders. The messages can have **delays** associated with them. If included, the message is not made available on the queue until the delay is up (default is 0 or no delay). 

Receivers get one or more messages (up to 100). Once the receive is done processing a message, it deletes it. If a message is not deleted prior to the **timeout** (default 60 sec), it is put back on the queue. Messages on the queue will **expire** after a certain amount of time (default is 7 days).

<table class="reference">
  <thead>
    <tr><th style="width: 16%;">Message Var</th><th style="width: 15%;">Default</th><th style="width: 15%;">Maximum</th><th style="width: 54%;">Notes</th></tr>
  </thead>
  <tbody>
    <tr><td>Message Size</td><td>--</td><td>64KB</td><td>Includes the entire request (delay, timeout, expiration).</td></tr>
    <tr><td>Delay</td><td>0sec</td><td>604,800sec</td><td>Message is made available on queue after the delay expires.</td></tr>
    <tr><td>Timeout</td><td>60sec</td><td>86,400sec</td><td>Message goes back on queue after timeout unless deleted.</td></tr>
    <tr><td>Expiration</td><td>604,800sec</td><td>2,592,000sec</td><td>Equates to 7 days and 30 days, respectively.</td></tr>
    <tr><td>Messages per Get</td><td>1</td><td>100</td><td>One or more messages can be handled at a time.</td></tr>
  </tbody>
</table>


## Queue Attributes

Queues have their own list of attributes.
To get all information attributes for the queue make [Info API call](/mq/reference/api/#get_info_about_a_message_queue).
The full list of available attributes:

#### Common Attributes
<table class="reference">
  <thead>
    <tr><th style="width: 35%;">Name</th><th style="width: 65%;">Explanation</th></tr>
  </thead>

  <tbody>
    <tr><td><code>name</code></td><td>Queue's name.</td></tr>
    <tr><td><code>id</code></td><td>Unique queue's ID.</td></tr>
    <tr><td><code>size</code></td><td>Current queue size. It's usually 0 for Push Queues.</td></tr>
    <tr><td><code>total_messages</code></td><td>Number of messages which were posted to the queue.</td></tr>
    <tr><td><code>project_id</code></td><td>Project ID which contains the queue.</td></tr>
  </tbody>
</table>

#### Attributes Related to Push Queues
<table class="reference">
  <thead>
    <tr><th style="width: 35%;">Name</th><th style="width: 65%;">Explanation</th></tr>
  </thead>

  <tbody>
    <tr><td><code>push_type</code></td><td>Push queue type. Either <code>multicast</code> (default) or <code>unicast</code>.</td></tr>
    <tr><td><code>retries</code></td><td>Maximum number of times messages will be sent to each HTTP endpoint. Messages will not be resent if HTTP 200 code is received on one of calls. Default is 3. Maximum is 100.</td></tr>
    <tr><td><code>retries_delay</code></td><td>Delay between retries in seconds. Default is 60 seconds. Minimum is 3 and maximum is 86400 seconds.</td></tr>
    <tr><td><code>subscribers</code></td><td>List of subscribers, format is <code>[{url: "http://..."}, ...]</code>.</td></tr>
  </tbody>
</table>
