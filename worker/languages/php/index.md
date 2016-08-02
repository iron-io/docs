---
title: IronWorkers in PHP
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['PHP', '/php']
---

<b>This approach uses our depreciated workflow. Please see <a href='https://github.com/iron-io/dockerworker/tree/master/php'>https://github.com/iron-io/dockerworker/tree/master/php</a> for the current process.</b>

PHP has grown to be one of the most popular languages to write web software in.
You can add some power to your current PHP application using PHP workers on IronWorker.
This article will help you get started with PHP workers, but you should be familiar with the [basics of IronWorker](/worker).


<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li>
      <a href="#quick_start">Quick Start</a>
      <ul>
        <li><a href="#get_the_cli">Get the CLI</a></li>
        <li><a href="#get_the_php_client_library">Get the PHP Client Library</a></li>
        <li><a href="#create_your_configuration_file">Create Your Configuration File</a></li>
        <li><a href="#write_your_php_worker">Write Your PHP Worker</a></li>
        <li><a href="#create_a_worker_file">Create a .worker File</a></li>
        <li><a href="#upload_the_worker">Upload the Worker</a></li>
        <li><a href="#queue_up_tasks_for_your_worker">Queue Up Tasks for Your Worker</a></li>
      </ul>
    </li>
    <li>
      <a href="#deep_dive">Deep Dive</a>
      <ul>
        <li><a href="#payload_example">Payload Example</a></li>
        <li><a href="#environment">Environment</a></li>
      </ul>
    </li>
  </ul>
</section>

<h2 id="quick_start">Quick Start</h2>

<h3 id="get_the_cli">Get the CLI</h3>

We've created a [command line interface](/worker/reference/cli) to the IronWorker service
that makes working with the service a lot easier and more convenient.
It does, however, require you to have Ruby 1.9+ installed and to install the `iron_worker_ng` gem.
Once Ruby 1.9+ is installed, you can just run the following command to get the gem:

<figcaption><span>Command Line </span></figcaption>


```sh
$ gem install iron_worker_ng
```

<h3 id="get_the_php_client_library">Get the PHP Client Library</h3>

You can download the PHP client library, `iron_worker_php`, from [Github](https://github.com/iron-io/iron_worker_php).
If you're using PHP 5.3 or greater, you can just download the
`iron_worker.phar` file. If you're using an earlier version of PHP, you need to
download the `IronWorker.class.php` file **and** the `IronCore.class.php` file
from [here](https://github.com/iron-io/iron_core_php).

If you aren't sure which version of PHP you're using, you can run `php -v` from
your shell to find out.

<h3 id="create_your_configuration_file">Create Your Configuration File</h3>

The PHP library uses a configuration file or environment variables set that tell it what your credentials are.
We have some [pretty good documentation](/worker/reference/configuration) about how this works,
but for simplicity's sake, just save the following as `iron.json` in the same folder as your `.worker` file:

<figcaption><span>iron.json</span></figcaption>

```js
{
  "project_id": "INSERT YOUR PROJECT ID HERE",
  "token": "INSERT YOUR TOKEN HERE"
}
```

You should insert your [project ID](https://hud.iron.io) and [token](https://hud.iron.io/tokens) into that `iron.json` file.
Then, assuming you're running the commands from within the folder, the CLI will pick up your credentials and use them automatically.

<h3 id="write_your_php_worker">Write Your PHP Worker</h3>

Save the following as `hello_worker.php`:

<figcaption><span>hello_worker.php</span></figcaption>

```php
<?php
echo "Hello from PHP";
?>
```

<h3 id="create_a_worker_file">Create a .worker File</h3>

Worker files are a simple way to define your worker and its dependencies. Save the
following in a file called `hello.worker`

<figcaption><span>hello.worker</span></figcaption>

```ruby
# set the runtime language. PHP workers use "php"
runtime "php"
# exec is the file that will be executed:
exec "hello_worker.php"
```

You could include gems and other files in there too. [You can read more about .worker files here](/worker/reference/dotworker/).

<h3 id="upload_the_worker">Upload the Worker</h3>

<figcaption><span>Command Line</span></figcaption>


```sh
$ iron_worker upload hello
```

That command will read your .worker file, create your worker code package and upload it to IronWorker.
Head over to [hud.iron.io](https://hud.iron.io), click the Worker link on your projects list, then click the Tasks tab.
You should see your new worker listed there with zero runs. Click on it to show the task list which will be empty, but not for long.

<h3 id="queue_up_tasks_for_your_worker">Queue Up Tasks for Your Worker</h3>

Save the following as `enqueue.php`:

<figcaption><span>enqueue.php</span></figcaption>

```php
<?php
require("phar://iron_worker.phar");
/* If your PHP is less than 5.3,
   comment out the line above and uncomment the two following lines */
//require("IronWorker.class.php");
//require("IronCore.class.php");

$worker = new IronWorker();
$res = $worker->postTask("PHPWorker");
print_r($res);
?>
```

You can now queue up a task by calling `php enqueue.php` from your shell.

Another way is to use CLI:

<figcaption><span>Command Line</span></figcaption>


```sh
$ iron_worker queue hello
```

Now look at the task list in HUD and you should see your task show up and go from "queued" to "running" to "completed".

Now that we know it works, let’s queue up a bunch of tasks from code.

<div class="alert">
<p><strong>Note:</strong> Once you upload a code package, you can queue as many tasks as you'd like against it.
You only need to re-upload the code package when your code changes.</p>
</div>

<h2 id="deep_dive">Deep Dive</h2>

<h3 id="payload_example">Payload Example</h3>

Retrieving the payload in PHP is the same as it is on any other language.
Retrieve the `-payload` argument passed to the script, load that file, and
parse it as JSON.

Fortunately, the `iron_worker_php` library includes a helper function with
your worker that makes this easy. Just call `getPayload();` to retrieve the
payload.

<figcaption><span>hello_worker.php</span></figcaption>

```php
<?php
$payload = getPayload();
print_r($payload);
?>
```

<h3 id="environment">Environment</h3>

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
workers.

<div class="alert">
<p><strong>Note:</strong> While it is possible to use these modules without bundling
them, we <i>highly recommend</i> that you include modules your code is reliant upon
in the code package whenever possible. Most of these modules are included in the
environment because they are binary modules, making it impossible to supply them
at runtime. The ones that are not binary modules are some of the more popular
modules, which we include to allow users to try things out and test things with
minimal setup and pain. We cannot guarantee which version of the module will be
available, and we may update them without warning. Reliance on these modules may
cause some unexpected conflicts in your code.</p>
</div>
