---
title: Writing Workers in PHP
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['PHP', '/php']
---

# Writing Workers in PHP

## Quick Start

### Get the PHP client library

You can download the PHP client library, `iron_worker_php`, from [Github](https://github.com/iron-io/iron_worker_php).

### Write your PHP worker.

{% highlight php %}
<?php
echo "Hello from PHP";
?>
{% endhighlight %}

### Create a script to upload the worker.
{% highlight php %}
<?php
require("IronWorker.class.php");

$name = "PHPWorker";
$worker = new IronWorker(array("token" => "INSERT TOKEN HERE", "project_id" => "INSERT PROJECT_ID HERE"));
IronWorker::createZip(dirname(__FILE__), array("worker.php"), $name.".zip", true);
$res = $worker->postCode("worker.php", $name.".zip", $name);
?>
{% endhighlight %}

### Queue a task to the new worker.
{% highlight php %}
<?
require("IronWorker.class.php");

$worker = new IronWorker(array("token" => "INSERT TOKEN HERE", "project_id" => "INSERT PROJECT_ID HERE"));
$res = worker->postTask("PHPWorker");
?>
{% endhighlight %}

## Deep Dive

### Payload Example

Retrieving the payload in PHP is the same as it is on any other language. 
Retrieve the `-payload` argument passed to the script, load that file, and 
parse it as JSON.

Fortunately, the `iron_worker_php` library includes a helper function with 
your worker that makes this easy. Just call `getPayload();` to retrieve the 
payload.

{% highlight php %}
<?php
$payload = getPayload();
print_r($payload);
?>
{% endhighlight %}
