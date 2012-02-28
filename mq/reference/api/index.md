---
title: IronMQ REST/HTTP API
layout: default
section: mq
breadcrumbs:
  - ['Reference', '/reference']
  - ['REST/HTTP API', '/api']
---

<style type="text/css">
.content table.reference {
font-size: small;
width: 100%;
}

.content table.reference td {
padding: 2px 7px;
text-align: left;
}

.content table.reference th {
text-align: left;
border-bottom: 1px solid #000;
}

.variable {
font-style: italic;
}

.variable.project_id {
color: red;
}

.variable.queue_name, .variable.message_id {
color: blue;
}

.content h4 {
padding: 5px 0px 0px 0px !important;
margin-bottom: -10px !important;
}

.content h3 {
padding: 5px 0px;
margin: 0px;
}

.content li > p {
margin: 0px;
}

</style>

<h1>REST/HTTP API</h1>

IronMQ provides a RESTful HTTP API to allow you to interact programmatically with our service and your queues.

## Endpoints

<table class="reference">
<tr><th style="width: 57%;">URL</th><th style="width: 11%;">HTTP Verb</th><th style="width: 32%;">Purpose</th></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/queues</td><td>GET</td><td><a href="#list_message_queues" title="List Message Queues">List Message Queues</a></td></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/queues/<span class="queue_name variable">{Queue Name}</span></td><td>GET</td><td><a href="#get_info_about_a_message_queue" title="Get Info About a Message Queue">Get Info About a Message Queue</a></td></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/queues/<span class="queue_name variable">{Queue Name}</span>/messages</td><td>POST</td><td><a href="#add_a_message_to_a_queue" title="Add a Message to a Queue">Add a Message to a Queue</a></td></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/queues/<span class="queue_name variable">{Queue Name}</span>/messages</td><td>GET</td><td><a href="#get_a_message_from_a_queue" title="Get a Message from a Queue">Get a Message from a Queue</a></td></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/queues/<span class="queue_name variable">{Queue Name}</span>/messages/<span class="variable message_id">{Message ID}</span></td><td>DELETE</td><td><a href="#delete_a_message_from_a_queue" title="Delete a Message from a Queue">Delete a Message from a Queue</a></td></tr>
</table>

## Authentication

All methods require authentication unless specified otherwise.
Authentication is done via an Oauth2 token using Authorization header, eg:
Authorization: OAuth abc4c7c627376858

Note: be sure you have the correct case, it's OAuth, not Oauth. 
or in URL parameters:
?oauth=abc4c7c627376858

## Requests

All request bodies should be in JSON format, with Content-Type application/json.

### Base URL

All endpoints are prefixed with this:

https://<span class="variable domain">{Domain}</span>.iron.io/1

For Amazon Web Services, <span class="variable domain">{Domain}</span> is mq-aws-us-east-1. For Rackspace, <span class="variable domain">{Domain}</span> is mq-rackspace-dfw.

### Pagination

For endpoints that return lists/arrays of values:
* page - the page of results to return. Default is 0. Maximum is 100.
* per_page - the number of results to return. It may be less if there aren't enough results. Default is 30. Maximum is 100. 

### Responses

All responses are in JSON, with Content-Type application/json.

Common response:
{% highlight js %}
{ "msg": "some success or error message" }
{% endhighlight %}

Status Codes:

* All successful GET requests return 200 OK
* All successful POST requests return 201 Created
* Invalid JSON (can't be parsed or has wrong types) results in 400 Bad Request
* Failure to authenticate results in 401 Unauthorized
* Bad project ID/task ID/etc. results in 404 Not Found
* Bad request methods result in 405 Method Not Allowed.  More specifically, the URL may be ok, but not for the method invoked (e.g. ok for GET, not ok to DELETE)
* Bad Content-Type in a POST request results in 406 Not Acceptable

Specific endpoints may provide other errors in other situations.

When there's an error, the response body contains a JSON object something like:

{% highlight js %}
{ "msg": "reason for error" }
{% endhighlight %}

## List Message Queues

Get a list of all queues in a project. 100 queues are listed at a time. To see more, use the page parameter.

### Endpoint

GET /projects/<span class="variable project_id">{Project ID}</span>/queues

### Parameters

In URL:
* **Project ID**: Project these queues belong to

Optional:
* **page**: The 0-based page to view. The default is 0.

### Response

{% highlight js %}
[
  {
    "id": "1234567890abcdef12345678",
    "project_id": "1234567890abcdef12345678",
    "name": "queue name"
  }
]
{% endhighlight %}

## Get Info About a Message Queue

Get general information about the queue.

### Endpoint

GET /projects/<span class="variable project_id">{Project ID}</span>/queues/<span class="variable queue_name">{Queue Name}</span>

### Parameters

In URL:
* **Project ID**: Project the queue belongs to
* **Queue Name**: Name of the queue. If the queue does not exist, it will be created.

### Response
{% highlight js %}
{
  "size": "queue size"
}
{% endhighlight %}

## Add a Message to a Queue

Push a message onto the queue.

### Endpoint

POST /projects/<span class="variable project_id">{Project ID}</span>/queues/<span class="variable queue_name">{Queue Name}</span>/messages

### Parameters

In URL:
* **Project ID**: project these messages belong to
* **Queue Name**: name of the queue. If the queue does not exist, it will be created for you.

Required:

* **messages** - an array of message objects. Each object contains these keys:

  * **Required**
    
    * **body**: the message data

  * **Optional**
    
    * **timeout**: after timeout (in seconds), item will be placed back onto queue. You must delete the message from the queue to ensure it does not go back onto the queue. Default is 60 seconds.
    * **delay**: the item will not be available on the queue until this many seconds have passed. Default is 0 seconds.
    * **expires_in**: how long in seconds to keep the item on the queue before it is deleted. Default is 604,800 seconds (7 days). Maximum is 2,592,000 seconds (30 days).

### Request

{% highlight js %}
{
  "messages": [
    {
      "body": "This is my message 1."
    },
    {
      "body": "This is my message 2.",
      "timeout": 30,
      "delay": 2,
      "expires_in": 86400
    }
  ]
}
{% endhighlight %}

### Response

{% highlight js %}
{
  "ids": ["message 1 ID", "message 2 ID"],
  "msg": "Messages put on queue."
}
{% endhighlight %}

## Get a Message from a Queue

Get/reserve a message from the queue. This will not be deleted, but will be reserved until the timeout expires. If the timeout expires before the message is deleted, the message will be placed back onto the queue, so be sure to delete every message after you're done with it.  

### Endpoint

GET /projects/<span class="variable project_id">{Project ID}</span>/queues/<span class="variable queue_name">{Queue Name}</span>/messages

### Parameters

In URL:
* **Project ID**: project these messages belong to
* **Queue Name**: name of queue. If the queue does not exist, it will be created for you.
* **n**: maximum number of messages to get. Default is 1. Maximum is 100.

### Response

{% highlight js %}
{
  "messages": [
    {
       "id": 1,
       "body": "first message body",
       "timeout": 600
    },
    {
       "id": 2,
       "body": "second message body",
       "timeout": 600
    }
  ],
  "timeout": 600
}
{% endhighlight %}

## Delete a Message from a Queue

This will delete the message. Be sure you call this after you're done with a message or it will be placed back on the queue.

### Endpoint

DELETE /projects/<span class="variable project_id">{Project ID}</span>/queues/<span class="variable queue_name">{Queue Name}</span>/messages/<span class="variable message_id">{Message ID}</span>

### Parameters

In URL:
* **Project ID**: project these messages belong to
* **Queue Name**: name of queue. If the queue does not exist, it will be created for you.
* **Message ID**: id of the message to delete.

### Response
{% highlight js %}
{
  "msg": "Deleted"
}
{% endhighlight %}
