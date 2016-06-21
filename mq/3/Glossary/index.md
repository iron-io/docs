---
title: IronMQ v3 Glossary
layout: default
section: mq-v3
breadcrumbs:
  - ['index', 'Definitions']
---

<section id="toc">
  <h3>Table of Contents</h3>
<table>
<tbody>
      <tr>
            <td>
      <ul>
        <li><a href="#body">body</a></li>
        <li><a href="#clear">clear messages</a></li>
        <li><a href="#dead_letter">dead_letter</a></li>
        <li><a href="#delay">delay</a></li>
        <li><a href="#delete">delete</a></li>
        <li><a href="#error_queue">error_queue</a></li>
        <li><a href="#header">Header</a></li>
        <li><a href="#max_reservations">max_reservations</a></li>
        <li><a href="#message_expiration">message_expiration</a></li>
        <li><a href="#message_timeout">message_timeout</a></li>
        <li><a href="#multicast">multicast</a></li>
        <li><a href="#n">n</a></li>
        <li><a href="#per_page">per_page</a></li>
        <li><a href="#prefix">prefix</a></li>
        <li><a href="#previous">Previous</a></li>
        <li><a href="#pull">Pull Queue</a></li>
      </ul>
    </td>
            <td>
    <ul>
      <li><a href="#push_headers">push_headers</a></li>
      <li><a href="#queue_name">queue_name</a></li>
      <li><a href="#queue">Queue</a></li>
      <li><a href="#release">Release Message</a></li>
      <li><a href="#reservation_id">reservation_id</a></li>
      <li><a href="#reserved_count">reserved_count</a></li>
      <li><a href="#retries_delay">retries_delay</a></li>
      <li><a href="#retries">retries</a></li>
      <li><a href="#subscriber_name">subscriber_name</a></li>
      <li><a href="#subscriber">Subscriber</a></li>
      <li><a href="#timeout">Timeout</a></li>
      <li><a href="#total_messages">total_messages</a></li>
      <li><a href="#touch">Touch Message</a></li>
      <li><a href="#type">Type</a></li>
      <li><a href="#unicast">Unicast</a></li>
      <li><a href="#wait">wait</a></li>
    </ul>
    </td>
      </tr>
</tbody>
</table>
</section>



<p id="body"><b>body</b> - The data of the message being pushed or pulled</p>

<p id="clear"><b>Clear Messages</b> - This endpoint will remove all messages from a queue

<p id="dead_letter"><b>dead_letter</b> - A queue that other (source) queues can target to send messages that for some reason could not be successfully processed. A primary benefit of using a dead letter queue is the ability to sideline and isolate the unsuccessfully processed messages

<p id="delay"><b>delay</b> - The item will not be available on the queue until this many seconds have passed. Default is 0 seconds. Maximum is 604,800 seconds (7 days)

<p id="delete"><b>delete</b> - Removal of message and it’s reservation ID

<p id="error_queue"><b>error_queue</b> - The name of another queue where information about messages that can't be delivered after retrying retries number of times will be placed. Please note, error queue will not appear in the hud.iron.io until first error occurs

<p id="header"><b>Header</b> - Meta data about the queue. This includes Content-Type: application/json and Authorization: OAuth TOKEN

<p id="max_reservations"><b>max_reservations</b> - This is used on conjunction with a dead letter queue to limit the amount of messages that can be placed in it. The default is 10

<p id="message_expiration"><b>message_expiration</b> - The amount of time a message will live on the queue

<p id="message_timeout"><b>message_timeout</b> - How many seconds new reservation will be valid

<p id="multicast"><b>multicast</b> - An option for Push queues. This is a routing pattern that will push the messages to all the subscribers

<p id="n"><b>n</b> - The maximum number of messages to get. Default is 1. Maximum is 100. Note: You may not receive all n messages on every request, the more sparse the queue, the less likely you are to receive all n messages

<p id="per_page"><b>per_page</b> - Number of elements in response, default is 30

<p id="prefix"><b>prefix</b> - An optional queue prefix to search on. e.g., prefix=ca could return queues ["cars", "cats", etc.]

<p id="previous"><b>Previous</b> - When listing the queues, this is the last queue on the previous page

<p id="pull"><b>Pull Queue</b> - This is the default queue style when creating an IronMQ queue. Pull queues require the client to check in and take message out

<p id="push_headers"><b>push_headers</b> - This is additional information you wish to add to the header of a push queue

<p id="queue_name"><b>queue_name</b> - This is the unique name given to each of your queues

<p id="queue"><b>Queue</b> - A queue can be either a multicast or unicast (both push queues) or it can be a pull queue

<p id="release"><b>Release Message</b> - This releases the reservation of a message so it can be used for another process

<p id="reservation_id"><b>reservation_id</b> - This id is returned when you reserve a message

<p id="reserved_count"><b>reserved_count</b> - Shows the amount of reserved messages in your request

<p id="retries_delay"><b>retries_delay</b> - Time in seconds between retries. Default is 60. Minimum is 3 and maximum is 86400 seconds

<p id="retries"><b>retries</b> - Number of times to retry. Default is 3. Maximum is 10

<p id="subscriber_name"><b>subscriber_name</b> - This field could be used in case of push message processing acknowledge. When request from IronMQ Pusher is received, and subscriber endpoint returns HTTP 202 Accepted, message must be acknowledged, otherwise it will be pushed again

<p id="subscriber"><b>Subscriber</b> - These are simply URLs that IronMQ will post to whenever a message is posted to your queue

<p id="timeout"><b>Timeout</b> - The amount of time given to an endpoint to respond. If the endpoint does not respond within the timeout, it's marked as failed/error and will be retried

<p id="total_messages"><b>total_messages</b> - When getting queue info, this shows the total messages in your query

<p id="touch"><b>Touch Message</b> - Extends the timeout period so process can finish processing message

<p id="type"><b>Type</b> - This shows what kind of queue it is. Options are pull, multicast and unicast

<p id="unicast"><b>Unicast</b> - A queue that will try one endpoint in the set of subscribers. If it succeeds, that message is considered delivered. If it fails, a different endpoint is tried immediately and this continues until a successful response is returned or all endpoints have been tried. If there is no successful response from all endpoints, then the message will be retried after retries_delay

<p id="wait"><b>wait</b> - Time to long poll for messages, in seconds. Max is 30 seconds. The default is 0
