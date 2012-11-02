---
title: Writing Workers in Python
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['Python', '/python']
---

# Writing Workers in Python

Python has become one of the most popular languages for web software and scientific or mathematical computing. By offloading tasks to IronWorker, computations and requests can be run in parallel using the power of the cloud. This article will get you started writing Python workers, but you should be familiar with the [basics of IronWorker](/worker).

## Quick Start

### Get the Python client library

You can download the Python client library, `iron_worker_python`, from [Github](https://github.com/iron-io/iron_worker_python)&mdash;note that you'll need the [iron_core_python](https://github.com/iron-io/iron_core_python) library installed, too. Users of pip or easy_install can simply use `pip install iron_worker` and `easy_install iron_worker`.

### Create Your Configuration File

The Python library uses a configuration file or environment variables set that tell it what your credentials are. We have some [pretty good documentation](/worker/reference/configuration) about how this works, but for simplicity's sake, just save the following as `iron.json` in the root of your project:

{% highlight js %}
{
  "project_id": "INSERT YOUR PROJECT ID HERE",
  "token": "INSERT YOUR TOKEN HERE"
}
{% endhighlight %}

You should insert your [project ID](https://hud.iron.io) and [token](https://hud.iron.io/tokens) into that `iron.json` file. Then, assuming you're running the commands from within the folder, the library will pick up your credentials and use them automatically.

### Write your Python worker.

{% highlight python %}
print "Hello from Python"
{% endhighlight %}

### Create a script to upload the worker.
{% highlight python %}
from iron_worker import *

worker = IronWorker()
response = worker.upload("HelloWorld.py")
{% endhighlight %}

**Note**: Once you upload a code package, you can queue as many tasks as you'd like against it. You only need to re-upload the code package when your code changes.

### Queue a task to the new worker.
{% highlight python %}
from iron_worker import *

worker = IronWorker()
response = worker.queue(code_name="HelloWorld")
{% endhighlight %}

## Deep Dive

### Payload Example

Retrieving the payload in Python is the same as it is on any other language. 
Retrieve the `-payload` argument passed to the script, load that file, and 
parse it as JSON.

In your worker:
{% highlight python %}
payload = None
payload_file = None
for i in range(len(sys.argv)):
    if sys.argv[i] == "-payload" and (i + 1) < len(sys.argv):
        payload_file = sys.argv[i]
        break

f = open(payload_file, "r")
contents = f.read()
f.close()

payload = json.loads(contents)
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
**Note:** While it is possible to use these modules without bundling them, we 
*highly recommend* that you include modules your code is reliant upon in the 
code package whenever possible. Most of these modules are included in the 
environment because they are binary modules, making it impossible to supply them 
at runtime. The ones that are not binary modules are some of the more popular 
modules, which we include to allow users to try things out and test things with 
minimal setup and pain. We cannot guarantee which version of the module will be 
available, and we may update them without warning. Reliance on these modules may 
cause some unexpected conflicts in your code.
