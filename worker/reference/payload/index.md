---
title: Sending and Accessing a Payload to IronWorker
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['Payload', 'payload']
---

Workers are just sections of discrete, modular code that you queue tasks against.
It's rare, though, that you want to run the same code repeatedly with no changes or variables.
To address this, IronWorker has the concept of a "payload".
The payload is the same thing, conceptually, as an argument or variable that is passed to a
function, method, or command —
just a piece of information you want to supply at runtime and make available in the worker itself.

Client is able to specify payload for queued or scheduled workers.
Payloads are strings. But usually we suggest to use JSON format.

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#get_payload_in_a_worker">Get Payload in a Worker</a></li>
    <li><a href="#other_information">Other Information</a></li>
    <li><a href="#payload_filtering_in_the_dash">Payload Filtering in the Dashboard</a></li>
  </ul>
</section>

<h2 id="get_payload_in_a_worker">Get Payload in a Worker</h2>

When payload is posted to a worker when using the *queue* or *schedule* API endpoints, that payload will be written
to a file for your worker to use in it's working directory. The location of that file is passed to the worker using 
the `PAYLOAD_FILE` environment variable.

To get the contents of your payload, you need to:

1. Read the `PAYLOAD_FILE` environment variable using whatever your language uses to read env variables. 
2. Open and read the file specified by the `PAYLOAD_FILE` variable
3. Parse the contents of the file (for example, if your payload is JSON)

Most of our [client libraries](/worker/libraries/) have helper methods to help with this, see your client libs docs for more information.

<h2 id="other_information">Other Information</h2>

The `TASK_ID` and `TASK_DIR` env variables will be also available for your worker.
The value of `TASK_ID` will be the ID of the task that is currently being executed,
and the value of `TASK_DIR` will be the user-writable directory
that can be used for temporary storage for the duration of the task's execution.

<h2 id="payload_filtering_in_the_dash">Payload Filtering in the Dashboard</h2>

You can see your tasks payload in the [Dashboard](https://dash.iron.io).
Go to Worker project's section, click on "Tasks" tab and then on one of your workers where you use payload.
Click on "Details" link on task.

The Dashboard filters payload by the next rule.
It looks for all keys on any level of nesting which contains substrings:

* `token`
* `security`
* `password`
* `secret`
* `pass`
* `connectionstring`
* `api_key`
* `license`

and change their values to `[FILTERED]`.

### Example: original payload


```js
{
  "database": {
    "connectionstring": "postgres://usr:pass@host:port/db"
  },
  "iron": {
    "project_id": "1234567890",
    "token": "TOKEN1234"
  },
  "3rdparty_service": {
    "user": "username",
    "service_pass": "userp4ss"
  }
}
```

### Example: payload visible through the Dashboard


```js
{
  "database": {
    "connectionstring": "[FILTERED]"
  },
  "iron": {
    "project_id": "1234567890",
    "token": "[FILTERED]"
  },
  "3rdparty_service": {
    "user": "username",
    "service_pass": "[FILTERED]"
  }
}
```
