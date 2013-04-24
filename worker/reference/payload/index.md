---
title: The IronWorker's Payload
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['Payload', 'payload']
---

One of the fundamental concepts of software development is "code reuse".
We are fully agree with it and provide possibility to pass data to workers.
This turns your workers to remote asyncronous procedures.

Client is able to specify payload for queued or scheduled workers.
Payloads are strings. But usually we suggest to use JSON format.
Also, when using `ruby` or `php` runtimes JSON payload will be automatically parsed.

### Get Payload in a Worker

If payload is specified on worker queue or schedule store it in the database.
Before worker will be launched in our [environment](worker/reference/environment)
the payload is put to the instance as file.
And when the worker launchs it is passed as command line argument `-payload path/to/payload_file`.

To obtain the payload read a file, specified by the parameter. This is related to language you are using.

Workers which are use `ruby` and `php` runtime have more possibilities to access to payload.

#### Access to Payload in Ruby Runtime

When worker is in Ruby it has access to special methods to obtain payload.

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

#### Access to Payload in PHP Runtime

The payload in PHP runtime is accessible by calling method `getPayload()`.
If payload is parsable JSON string it will be converted automatically.

<div class="language php">
{% highlight php %}
<?php
payload = getPayload(); // parsed JSON or string
{% endhighlight %}
</div>
