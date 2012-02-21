---
title: Getting Started With IronWorker & Python
template: default
---
IronWorker is a product that helps you separate elements of your project into specialised, resilient chunks. Each worker is intended to be a single piece of your project, operating independently from the other workers and your own servers. They leverage cloud computing to do a lot of work very quickly with great uptime. By using workers, you can easily create a resilient, easily-managed project that operates even under worst-case scenarios.

It doesn't take long to get your Python workers running on IronWorker. There is [an official library](https://github.com/iron-io/iron_worker_python) that can make the process a lot easier, too.

Running a worker involves three major steps:

1. Creating the worker
2. Running the worker
3. Checking the status of the worker

## Creating a Worker

Worker creation is about as simple as it gets: you just write the Python script you want executed, write a script to upload it to IronWorker, and you're done. The IronWorker library makes uploading the worker even simpler.

### Writing the Script

You should never assume anything is installed in the IronWorker runtime. That means anything your Python script needs in terms of classes or libraries should be zipped and uploaded with it. It also means only a handful of common Linux executables are available. You can find more about the runtime [here](http://docs.iron.io/worker/system-environment). The best way to make sure your worker will run is to create a directory for it and as you add dependencies, add those files to the directory and import them from that directory.

Here's a pretty basic worker script:

{% highlight python %}
import argparse
import json

parser = argparse.ArgumentParser(
        description="Calculates the Fibonacci sequence up to a maximum number")
parser.add_argument("-payload", type=str, required=False,
        help="The location of a file containing a JSON payload.")
parser.add_argument("-d", type=str, required=False,
        help="The directory that the worker is running from.")
parser.add_argument("-e", type=str, required=False,
        help="The environment this worker is running under.")
parser.add_argument("-id", type=str, required=False,
        help="This worker's unique identifier.")

args = parser.parse_args()

max = 100

if args.payload != None:
    payload = json.loads(open(args.payload).read())
    if 'max' in payload:
        max = payload['max']

values = []
num1 = 0
num2 = 0
next = 1
while next < max:
    num1 = num2
    num2 = next
    next = num1 + num2
    values.append(num2)

print "MAGICALSTDOUTSEPARATOR%sMAGICALSTDOUTSEPARATOR" % json.dumps(values)
{% endhighlight %}

As you can see, that script calculates the Fibonacci sequence up to a maximum number. That maximum number is determined by the `max` value in a file that gets passed in through the payload parameter. Essentially, the payload file is a JSON dictionary that gets passed to workers when they're run. We'll come back to that later. The worker finishes by outputting a JSON-encoded array of the Fibonacci sequence to STDOUT, surrounded by `MAGICALSTDOUTSEPARATOR`. The reasons for this will be explained at the end.

You can test that code by putting it in a file ("fibonacci.py", for example), and then calling `python fibonacci.py`. For extra credit, try creating the following payload.json file:

`{"max": 100000}`

Now run the script by calling `python fibonacci.py -payload="payload.json"` and see how it differs.

Now that we have the script written, we need to turn it into a worker. You can delete payload.json.

### Uploading to IronWorker

Uploading our worker to IronWorker will take another Python script. You can do this by hand using the [API calls](http://docs.iron.io/worker/api/codes), but it's far easier to just use the official library. We're going to use the official library.

Uploading consists of two simple steps: packaging and uploading. Fortunately, the library makes both really simple.

First, we're going to instantiate the library. This is done as follows:

{% highlight python %}
worker = IronWorker("config.ini")
{% endhighlight %}

The config.ini file is a configuration file. It looks like this:

{% highlight ini %}
[iron_worker]
token = INSERT_TOKEN_HERE
project_id = INSERT_PROJECT_ID_HERE
{% endhighlight %}

You can find your `project_id` and `token` on [your HUD](https://hud.iron.io). Just log in, and you'll find the `token` under "API Tokens" on your account page. The `project_id` is found on the Projects page.

You can also pass your configuration values in through named arguments:

{% highlight python %}
worker = IronWorker(token="INSERT_TOKEN_HERE", project_id="INSERT_PROJECT_ID_HERE")
{% endhighlight %}

Now that we have the library configured, we need to package our code up to upload it. Fortunately, the library has a function that lets us do that:

{% highlight python %}
zipFile = IronWorker.zipDirectory(directory="/path/to/directory", destination="fileNameForZip.zip", overwrite=True)
{% endhighlight %}

That `directory` parameter is just the path to the directory you want to zip. Relative and absolute paths are both okay. The `destination` parameter is the name you want the zip file to use. The `overwrite` parameter is a boolean switch: if true, the packager will overwrite fileNameForZip.zip if it exists. If false and fileNameForZip.zip already exists, the packager will do nothing. The function returns true if the zip was created or false if creation failed.

We don't need to upload a full directory, though--we just want to upload a single file. We still need to package that, but you don't need to separate it into its own directory. Just call this, instead:

{% highlight python %}
zipFile = IronWorker.createZip(base_dir="", files=["fibonacci.py"], destination="fileNameForZip.zip", overwrite=True)
{% endhighlight %}

The `base_dir` parameter is the base directory for files inside the zip. If you leave it blank, as the example above does, it defaults to the root directory of the zip. The `files` parameter is an array of files to zip. These will all have the base directory prepended to them inside the zip. In our case, that means `"" + "fibonacci.py"`, which just yields `"fibonacci.py"`. The final two parameters are just the destination for the zip file and the boolean switch to overwrite the zip file if it exists, just like zipDirectory. This, again, returns true if the zip was created or false if creation failed.

Now that we've packaged everything up, it's time to upload it to IronWorker. You can do this in a single library call:

{% highlight python %}
response = worker.postCode(runFilename="fibonacci.py", zipFilename="fileNameForZip.zip", name="FibWorker")
{% endhighlight %}

The `runFilename` parameter is the filename in the zip you want the worker to execute when it runs. The `zipFilename` parameter is the zip you want to upload. The `name` parameter is a name for the worker that will help you find it on your HUD and will let you run the worker. The function returns a response from the server. If everything goes well, you'll see this:
 
{% highlight javascript %}
{
    "msg": "Upload successful.",
    "status_code": 200
}
{% endhighlight %}

To pull it all together, here's the full upload script:

{% highlight python %}
from iron_worker import *

name = "FibWorker"
zipName = "%s.zip" % name

zipFile = IronWorker.createZip(files=["fibonacci.py"], destination=zipName,
        overwrite=True)

worker = IronWorker(token = "INSERT TOKEN HERE",
        project_id = "INSERT PROJECT_ID HERE")
res = worker.postCode(runFilename="fibonacci.py", name=name,
        zipFilename=zipName)

print res
{% endhighlight %}

To run, just save the script as "upload.py" in the same directory as fibonacci.py and the IronWorker library (iron_worker.py), and call `python upload.py`.

## Running the Worker

Running a worker is a pretty trivial task, once the code is uploaded. To run a worker, you give it a "task". Assigning a task to a worker consists of a single library call:

{% highlight python %}
task = worker.postTask(name="WorkerName", payload=payload)
{% endhighlight %}

The `name` parameter is just the name of the worker you want to give the task to. The `payload` parameter is just a dict of the payload data you want to pass to the task. Remember payload.json back when we were writing the Fibonacci script? This is where that data comes from. But rather than hand-writing JSON to a file, you just specify a dict and IronWorker takes care of the rest. The payload parameter is the best place for specifying arguments for you worker, things that will change between runs. And if your worker doesn't need any arguments, you can always just pass None or leave it out of the arguments entirely. The return is the response, containing relevant information on the task. You should hang on to that (sessions, cookies, database, memcached... whatever floats your boat for data retention) to check how the task is progressing (which we'll cover in the next part).

Here's an example run script. Just save it as "run.py", then execute `python run.py`:

{% highlight python %}
import argparse

parser = argparse.ArgumentParser(description="Runs a FibWorker task to calculate Fibonacci.")
parser.add_argument("--max", type=int, required=False, help="The number the sequence shouldn't go above.")

args = parser.parse_args()

if args.max is None:
    max = 100000
else:
    max = args.max

worker = IronWorker(token="INSERT TOKEN HERE", project_id="INSERT PROJECT_ID HERE")
task = worker.postTask(name="FibWorker", payload={"max": max})
print task
{% endhighlight %}

The script will upload a task to your worker, then print out the task information so you can check on it. If you want to change the max variable, you can run it as `python run.py --max=9000` or whatever value you like.

## Checking the status of the worker

Now that we've got our code on IronWorker and we've got it running, it would help to know the status of our worker. Has it finished that job yet? Fortunately, there's a simple way to do this.

{% highlight python %}
details = worker.getTaskDetails(task_id=task['tasks'][0]['id'])
status = details['status']
{% endhighlight %}

`worker` is, again, just the library configured with a `project_id` and `token`. `task` is just the task information that was returned when we uploaded the task--it's a `dict` of information, the specifics of which you can find [here](http://docs.iron.io/worker/api/tasks#TOC-Response1). `status` will be a string like "complete", "running", "queued", or "cancelled". `details` is an object of all the details about the task from the [API](http://docs.iron.io/worker/api/tasks#TOC-Response2).

Here's a sample script that draws the task ID out of the --task option:

{% highlight python %}
from iron_worker import *
import argparse

parser = argparse.ArgumentParser(description="Checks the status of an IronWorker task.")
parser.add_argument("--task", type=str, required=True, help="The id of the task whose status is being checked.")

args = parser.parse_args()

worker = IronWorker(token="INSERT TOKEN HERE", project_id="INSERT PROJECT_ID HERE")

details = worker.getTaskDetails(args.task)
print "Task is %s." % details["status"]

{% endhighlight %}

Save the script as checkTask.py, then run `python checkTask.py --task="INSERT_TASK_ID"`, substituting the task ID that `run.py` echoed to STDOUT. It will tell you the status of the task. But how do we get the sequence we generated? Well, remember when we printed it surrounded by `MAGICALSTDOUTSEPARATOR`? We're going to fetch the log, find the sequence, and print it. We needed to surround it with a unique string in case something else decided to print to STDOUT, dirtying our logs.

Getting the log is pretty easy:

{% highlight python %}
log = worker.getLog(task_id=task['tasks'][0]['id'])
{% endhighlight %}

`worker` is just the library, configured with your `token` and `project_id`. `task_id` is just the task you want to get the log for. Once you have the log, just use `split` to separate the output we want. Finally, use `json.loads` to turn the JSON array into a Python array. Here's a sample script:

{% highlight python %}
from iron_worker import *
import argparse
import json

parser = argparse.ArgumentParser(description="Gets the log for an IronWorker task.")
parser.add_argument("--task", type=str, required=True, help="The id of the task whose log is being retrieved.")

args = parser.parse_args()

worker = IronWorker(token="INSERT TOKEN HERE", project_id="INSERT PROJECT_ID HERE")
log = worker.getLog(args.task)

logsplit = log.split("MAGICALSTDOUTSEPARATOR")
log = logsplit[1]

sequence = json.loads(log)
print sequence
{% endhighlight %}

Save the script as "getLog.py" and run `python getLog.py --task="INSERT_TASK_ID"`, again inserting a task ID, and you'll see the Fibonacci sequence printed out.

Congratulations, you're now ready to use IronWorker!

## Where to go from here

Now that you've got the basics of IronWorker down, you might want to check out some more advanced topics:

* **Scheduling tasks**: tasks can be scheduled to happen at some point in the future, some amount of time from now, or even repeating over time.
* **Setting task progress**: you can set a progress variable on tasks that will show up in their detail view. Wouldn't it be nice to know how many Fibonacci numbers we had gotten through, instead of just "working"?
* **Managing tasks**: In really big projects, you can have a lot of tasks running at once. The library lets you list, cancel, and delete tasks to help you manage your worker.
* **Interfacing with IronMQ**: Getting your results as a log is a pain. There has to be a better way. Sure, you could have them emailed, Twittered, or sent as parameters in an HTTP request, but that requires you to run your own systems. IronMQ is a messaging queue built in the cloud, so you don't have to worry about that. Even better, IronWorker and IronMQ can work together.

