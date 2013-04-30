---
title: Writing Workers in Python
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['Python', '/python']
---

Python has become one of the most popular languages for web software and scientific or mathematical computing.
By offloading tasks to IronWorker, computations and requests can be run in parallel using the power of the cloud.
This article will get you started writing Python workers, but you should be familiar with the [basics of IronWorker](/worker).

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li>
      <a href="#quick_start">Quick Start</a>
      <ul>
        <li><a href="#get_the_cli">Get the CLI</a></li>
        <li><a href="#get_the_python_client_library">Get the Python Client Library</a></li>
        <li><a href="#create_your_configuration_file">Create Your Configuration File</a></li>
        <li><a href="#write_your_python_worker">Write Your Python Worker</a></li>
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

## Quick Start

### Get the CLI

We've created a [command line interface](/worker/reference/cli) to the IronWorker service
that makes working with the service a lot easier and more convenient.
It does, however, require you to have Ruby 1.9+ installed and to install the `iron_worker_ng` gem.
Once Ruby 1.9+ is installed, you can just the following command to get the gem:

<figcaption><span>Command Line </span></figcaption>
{% highlight bash %}
$ gem install iron_worker_ng
{% endhighlight %}

### Get the Python Client Library

You can download the Python client library, `iron_worker_python`,
from [Github](https://github.com/iron-io/iron_worker_python)&mdash;note
that you'll need the [iron_core_python](https://github.com/iron-io/iron_core_python) library installed, too.
Users of pip or easy_install can simply use `pip install iron_worker` and `easy_install iron_worker`.

### Create Your Configuration File

The Python library uses a configuration file or environment variables set that tell it what your credentials are.
We have some [pretty good documentation](/worker/reference/configuration) about how this works,
but for simplicity's sake, just save the following as `iron.json` in the root of your project:

<figcaption><span>iron.json</span></figcaption>
{% highlight js %}
{
  "project_id": "INSERT YOUR PROJECT ID HERE",
  "token": "INSERT YOUR TOKEN HERE"
}
{% endhighlight %}

You should insert your [project ID](https://hud.iron.io) and [token](https://hud.iron.io/tokens) into that `iron.json` file.
Then, assuming you're running the commands from within the folder, the library will pick up your credentials and use them automatically.

### Write Your Python Worker

<figcaption><span>hello_worker.py</span></figcaption>
{% highlight python %}
print "Hello from Python"
{% endhighlight %}

### Create a .worker File

Worker files are a simple way to define your worker and its dependencies. Save the following in a file called `hello.worker`

<figcaption><span>hello.worker</span></figcaption>
{% highlight ruby %}
# set the runtime language. Python workers use "python"
runtime "python"
# exec is the file that will be executed:
exec "hello_worker.py"
{% endhighlight %}

You could include gems and other files in there too. [You can read more about .worker files here](/worker/reference/dotworker/).

### Upload the Worker

<figcaption><span>Command Line</span></figcaption>
{% highlight bash %}
$ iron_worker upload hello
{% endhighlight %}

That command will read your .worker file, create your worker code package and upload it to IronWorker.
Head over to [hud.iron.io](https://hud.iron.io), click the Worker link on your projects list, then click the Tasks tab.
You should see your new worker listed there with zero runs. Click on it to show the task list which will be empty, but not for long.

### Queue Up Tasks for Your Worker

<figcaption><span>enqueue.py</span></figcaption>
{% highlight python %}
from iron_worker import *

worker = IronWorker()
response = worker.queue(code_name="hello")
{% endhighlight %}

You can now queue up a task by calling `python enqueue.py` from your shell.

Another way is to use CLI:

<figcaption><span>Command Line</span></figcaption>
{% highlight bash %}
$ iron_worker queue hello
{% endhighlight %}

Now look at the task list in HUD and you should see your task show up and go from "queued" to "running" to "completed".

Now that we know it works, let’s queue up a bunch of tasks from code.

<div class="alert">
<p><strong>Note:</strong> Once you upload a code package, you can queue as many tasks as you'd like against it.
You only need to re-upload the code package when your code changes.</p>
</div>

## Deep Dive

### Payload Example

Retrieving the payload in Python is the same as it is on any other language. 
Retrieve the `-payload` argument passed to the script, load that file, and 
parse it as JSON.

In your worker:
{% highlight python %}
import sys, json

payload_file = None
payload = None

for i in range(len(sys.argv)):
    if sys.argv[i] == "-payload" and (i + 1) < len(sys.argv):
        payload_file = sys.argv[i + 1]
        with open(payload_file,'r') as f:
            payload = json.loads(f.read())
        break

{% endhighlight %}

### Environment

The Python environment that the workers run in on IronWorker is as follows:

<table class="reference">
  <tbody>
    <tr>
      <td style="width: 25%;">Python Version</td>
      <td style="width: 75%;"><a href="http://python.org/download/releases/2.7.2/" title="Version 2.7.2">Version 2.7.2</a></td>
    </tr>
    <tr>
      <td colspan="2" style="text-align: center; width: 100%;"><h4 style="padding: 0px;">Installed Modules</h4></td>
    </tr>
    <tr>
      <td>python-lxml</td>
      <td></td>
    </tr>
    <tr>
      <td>numpy</td>
      <td></td>
    </tr>
    <tr>
      <td>scipy</td>
      <td></td>
    </tr>
    <tr>
      <td>pymongo</td>
      <td></td>
    </tr>
    <tr>
      <td>gevent</td>
      <td></td>
    </tr>
    <tr>
      <td>PIL</td>
      <td></td>
    </tr>
  </tbody>
</table>

You can just use `import {MODULE_NAME}` to use these modules in your workers. 

<div class="alert">
<p><strong>Note:</strong> While it is possible to use these modules without bundling them, we 
<i>highly recommend</i> that you include modules your code is reliant upon in the 
code package whenever possible. Most of these modules are included in the 
environment because they are binary modules, making it impossible to supply them 
at runtime. The ones that are not binary modules are some of the more popular 
modules, which we include to allow users to try things out and test things with 
minimal setup and pain. We cannot guarantee which version of the module will be 
available, and we may update them without warning. Reliance on these modules may 
cause some unexpected conflicts in your code.</p>
</div>
