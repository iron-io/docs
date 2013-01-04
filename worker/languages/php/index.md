---
title: Writing Workers in PHP
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['PHP', '/php']
---

PHP has grown to be one of the most popular languages to write web software in. You can add some power to your current PHP application using PHP workers on IronWorker. This article will help you get started with PHP workers, but you should be familiar with the [basics of IronWorker](/worker).

## Quick Start

### Get The PHP Client Library

You can download the PHP client library, `iron_worker_php`, from [Github](https://github.com/iron-io/iron_worker_php). 
If you're using PHP 5.3 or greater, you can just download the 
`iron_worker.phar` file. If you're using an earlier version of PHP, you need to 
download the `IronWorker.class.php` file **and** the `IronCore.class.php` file 
from [here](https://github.com/iron-io/iron_core_php).

If you aren't sure which version of PHP you're using, you can run `php -v` from 
your shell to find out.

### Write Your PHP Worker

Save the following as `worker.php`:

{% highlight php %}
<?php
echo "Hello from PHP";
?>
{% endhighlight %}

### Create Your Configuration File

The PHP library uses a configuration file or environment variables set that tell it what your credentials are. We have some [pretty good documentation](/worker/reference/configuration) about how this works, but for simplicity's sake, just save the following as `iron.json` in the same folder as your `.worker` file:

{% highlight js %}
{
  "project_id": "INSERT YOUR PROJECT ID HERE",
  "token": "INSERT YOUR TOKEN HERE"
}
{% endhighlight %}

You should insert your [project ID](https://hud.iron.io) and [token](https://hud.iron.io/tokens) into that `iron.json` file. Then, assuming you're running the commands from within the folder, the CLI will pick up your credentials and use them automatically.

### Create A Script To Upload The Worker.

Save the following as `upload.php`:

{% highlight php %}
<?php
require("phar://iron_worker.phar");
// If your PHP is less than 5.3, comment out the line above and uncomment the two following lines
//require("IronWorker.class.php");
//require("IronCore.class.php");

$name = "PHPWorker";
$worker = new IronWorker();
// First param is the folder containing your worker files
// Second param is the file to be run when tasks are queued
// Third param is the name of your worker
$res = $worker->upload(dirname(__FILE__), "worker.php", $name);
print_r($res);
?>
{% endhighlight %}

You can then upload your worker by running `php upload.php`. **Note**: Once you upload a code package, you can queue as many tasks as you'd like against it. You only need to re-upload the code package when your code changes.

### Queue A Task To The New Worker.

Save the following as `enqueue.php`:

{% highlight php %}
<?
require("phar://iron_worker.phar");
// If your PHP is less than 5.3, comment out the line above and uncomment the two following lines
//require("IronWorker.class.php");
//require("IronCore.class.php");

$worker = new IronWorker();
$res = $worker->postTask("PHPWorker");
print_r($res);
?>
{% endhighlight %}

You can now queue up a task by calling `php enqueue.php` from your shell.

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

### Environment

The PHP environment that the workers run in on IronWorker is as follows:

<table class="reference">
  <tbody>
    <tr>
      <td style="width: 25%;">PHP Version</td>
      <td style="width: 75%;"><a href="http://php.net/downloads.php#v5" title="Version 5.3.6">Version 5.3.6</a></td>
    </tr>
    <tr>
      <td colspan="2" style="text-align: center; width: 100%;"><h4 style="padding: 0px;">Installed Modules</h4></td>
    </tr>
    <tr>
      <td>php5-curl</td>
      <td></td>
    </tr>
    <tr>
      <td>php5-mysql</td>
      <td></td>
    </tr>
    <tr>
      <td>php5-gd</td>
      <td></td>
    </tr>
    <tr>
      <td>mongo</td>
      <td></td>
    </tr>
  </tbody>
</table>

You can just use `require_once('{MODULE_NAME}');` to use these modules in your 
workers. **Note:** While it is possible to use these modules without bundling 
them, we *highly recommend* that you include modules your code is reliant upon
in the code package whenever possible. Most of these modules are included in the 
environment because they are binary modules, making it impossible to supply them 
at runtime. The ones that are not binary modules are some of the more popular 
modules, which we include to allow users to try things out and test things with 
minimal setup and pain. We cannot guarantee which version of the module will be 
available, and we may update them without warning. Reliance on these modules may 
cause some unexpected conflicts in your code.
