---
title: Writing Workers in Python
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['Python', '/python']
---

# Writing Workers in Python

## Quick Start

### Get the Python client library

You can download the Python client library, `iron_worker_python`, from [Github](https://github.com/iron-io/iron_worker_python).

### Write your Python worker.

{% highlight python %}
print "Hello from Python";
{% endhighlight %}

### Create a script to upload the worker.
{% highlight python %}
from iron_worker import *

worker = IronWorker(token="INSERT TOKEN HERE", project_id="INSERT PROJECT_ID HERE")

IronWorker.createZip(destination="worker.zip", files=["HelloWorld.py"], overwrite=True)
response = worker.postCode(runFilename="HelloWorld.py", zipFilename="worker.zip", name="HelloWorld")
{% endhighlight %}

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
