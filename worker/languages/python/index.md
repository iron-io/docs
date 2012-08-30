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

You can download the Python client library, `iron_worker_python`, from [Github](https://github.com/iron-io/iron_worker_python).

### Write your Python worker.

{% highlight python %}
print "Hello from Python"
{% endhighlight %}

### Create a script to upload the worker.
{% highlight python %}
from iron_worker import *

worker = IronWorker(token="INSERT TOKEN HERE", project_id="INSERT PROJECT_ID HERE")

IronWorker.createZip(destination="worker.zip", files=["HelloWorld.py"], overwrite=True)
response = worker.postCode(runFilename="HelloWorld.py", zipFilename="worker.zip", name="HelloWorld")
{% endhighlight %}

**Note**: Once you upload a code package, you can queue as many tasks as you'd like against it. You only need to re-upload the code package when your code changes.

### Queue a task to the new worker.
{% highlight python %}
from iron_worker import *

worker = IronWorker(token="INSERT TOKEN HERE", project_id="INSERT PROJECT_ID HERE")
response = worker.postTask(name="HelloWorld")
{% endhighlight %}

## Deep Dive

### Payload Example

Retrieving the payload in Python is the same as it is on any other language. 
Retrieve the `-payload` argument passed to the script, load that file, and 
parse it as JSON.

The `iron_worker_python` library has a [helper.py file](https://github.com/iron-io/iron_worker_python/blob/master/helper.py) 
that you can include to make this easier.

In your worker:
{% highlight python %}
import helper

payload = getArg("payload")
print payload
{% endhighlight %}

In your upload code, you need to add the helper file. Copy it to the same 
directory your worker resides in, and modify your upload script as follows:

{% highlight python %}
from iron_worker import *

worker = IronWorker(token="INSERT TOKEN HERE", project_id="INSERT PROJECT_ID HERE")

IronWorker.createZip(destination="worker.zip", files=["HelloWorld.py", "helper.py"], overwrite=True)
response = worker.postCode(runFilename="HelloWorld.py", zipFilename="worker.zip", name="HelloWorld")
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
