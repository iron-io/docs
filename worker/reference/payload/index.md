---
title: The IronWorker's Payload
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
Also, when using `ruby` or `php` runtimes JSON payload will be automatically parsed.

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#get_payload_in_a_worker">Get Payload in a Worker</a></li>
    <li><a href="#other_information">Other Information</a></li>
  </ul>
</section>

## Get Payload in a Worker

When payload is specified during *queue* or *schedule*, then it is stored in the database.
Before your worker is launched in the IronWorker [environment](worker/reference/environment),
this payload is then stored in your worker's runtime directory. The location of that file is passed to the worker using the `-payload` command line flag.

To get the contents of your payload, you need to:

1. Read the `-payload` flag using `ARGV` (or whatever your language uses to read command line flags)
2. Open and read the file specified by the `-payload`> flag
3. Parse the contents of the file (for example, if you encoded the payload when queuing the task)

Workers that use either `ruby` or `php` runtimes have more possibilities to access the payload.

#### Access to a Payload in Ruby Runtime

Ruby workers have access to special methods to obtain the payload.

<div class="language ruby">
{% highlight ruby %}
payload_string = payload # string
{% endhighlight %}
</div>

If specified payload is in JSON format it will be parsed automatically.

<div class="language ruby">
{% highlight ruby %}
parsed_payload = params # parsed JSON
{% endhighlight %}
</div>

#### Access to a Payload in PHP Runtime

The payload in PHP runtime is accessible by calling method `getPayload()`.
If payload is a parsable JSON string it will be converted automatically.

<div class="language php">
{% highlight php %}
<?php
payload = getPayload(); // parsed JSON or string
{% endhighlight %}
</div>

## Other Information

Your worker will also be passed `-id` and `-d` command line arguments.
The value of `-id` will be the ID of the task that is currently being executed,
and the value of `-d` will be the user-writable directory
that can be used for temporary storage for the duration of the task's execution.
