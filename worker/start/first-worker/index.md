---
title: Your First Worker
layout: default
section: worker
breadcrumbs:
- ['Getting Started', '/start']
- ['Your First Worker', '/first-worker']
languages:
# ['command to run scripts', 'file extension']
- ['python', 'py']
- ['php', 'php']
- ['ruby', 'rb']
---

IronWorker is a product that helps you separate elements of your project into specialised, resilient chunks. Each worker is intended to be a single piece of your project, operating independently from the other workers and your own servers. They leverage cloud computing to do a lot of work very quickly with great uptime. By using workers, you can easily create a resilient, easily-managed project that operates even under worst-case scenarios.

It doesn't take long to get your workers running on IronWorker. There are [official libraries](/code/libraries) that can make the process a lot easier, too.

Running a worker involves four major steps:

1. [Creating the Worker](#creating_the_worker)
2. [Uploading the Worker](#uploading_the_worker)
3. [Queuing a Task](#queuing_a_task)
4. [Checking the status of the worker](#checking_the_status_of_the_worker)

## Creating the Worker

Worker creation is about as simple as it gets: you just write the script you want executed.

### Writing the Script

You should never assume anything is installed in the IronWorker runtime. That means anything your Python script needs in terms of classes or libraries should be zipped and uploaded with it. It also means only a handful of common Linux executables are available. You can find more about the runtime [here](http://docs.iron.io/worker/system-environment). The best way to make sure your worker will run is to create a directory for it and as you add dependencies, add those files to the directory and import them from that directory.

Here's a pretty basic worker script:

{% include worker/start/first-worker/python/worker-no-payload.md %}

As you can see, that script calculates the Fibonacci sequence up to a maximum number. The worker finishes by outputting a JSON-encoded array of the Fibonacci sequence to STDOUT, surrounded by `MAGICALSTDOUTSEPARATOR`. The reasons for this will be explained at the end.

You can test that code by putting it in a file ("fibonacci.<span class="language extension">py</span>", for example), and then calling `<span class="language command">python</span> fibonacci.<span class="language extension">py</span>`.

### Using the Payload

The payload parameter is the best place for specifying arguments for you worker, things that will change between runs. For this worker, that could be the `max` variable we created earlier: what if we want the worker to calculate up to 100 on one run, and up to 100000 on the next? With the payload, we can do that.

First, we need to modify our script to take advantage of the payload:

{% include worker/start/first-worker/python/worker.md %}

To test it, create a `payload.json` file in the same directory your worker script resides in. The contents of the file should look like this:

{% highlight js %}
{
  "max": 1000
}
{% endhighlight %}

Now call `<span class="language command">python</span> fibonacci.<span class="language extension">py</span> -payload=payload.json`, and your script will read the payload and override its default max value.

Now that we have the script written, we need to upload it to IronWorker.

## Uploading the Worker

Uploading our worker to IronWorker will take another script. You can do this by hand using the [API calls](/worker/reference/api#upload_a_code_package), but it's far easier to just use a library, so that's what we're going to do.

Uploading consists of two simple steps: packaging and uploading. Fortunately, the library makes both really simple.

First, we're going to instantiate the library. This is done as follows:

{% include worker/start/first-worker/python/instantiate-library.md %}

The config.ini file is a configuration file. It looks like this:

{% highlight ini %}
[iron_worker]
token = INSERT_TOKEN_HERE
project_id = INSERT_PROJECT_ID_HERE
{% endhighlight %}

You can find your `project_id` and `token` on [your HUD](https://hud.iron.io). Just log in, and you'll find the `token` under "[API Tokens](https://hud.iron.io/tokens)" on your account page. The `project_id` is found on the Projects page.

You can also pass your configuration values in through named arguments:

{% include worker/start/first-worker/python/instantiate-library-with-args.md %}

Now that we have the library configured, we need to package our code up to upload it. Fortunately, the library has a function that lets us do that:

{% include worker/start/first-worker/python/zip-directory.md %}

That `directory` parameter is just the path to the directory you want to zip. Relative and absolute paths are both okay. The `destination` parameter is the name you want the zip file to use. The `overwrite` parameter is a boolean switch: if true, the packager will overwrite fileNameForZip.zip if it exists. If false and fileNameForZip.zip already exists, the packager will do nothing. The function returns true if the zip was created or false if creation failed.

We don't need to upload a full directory, though--we just want to upload a single file. We still need to package that, but you don't need to separate it into its own directory. Just call this, instead:

{% include worker/start/first-worker/python/zip-files.md %}

The `base_dir` parameter is the base directory for files inside the zip. If you leave it blank, as the example above does, it defaults to the root directory of the zip. The `files` parameter is an array of files to zip. These will all have the base directory prepended to them inside the zip. In our case, that means `"" + "fibonacci.<span class="language extension">py</span>"`, which just yields `"fibonacci.<span class="language extension">py</span>"`. The final two parameters are just the destination for the zip file and the boolean switch to overwrite the zip file if it exists, just like zipDirectory. This, again, returns true if the zip was created or false if creation failed.

Now that we've packaged everything up, it's time to upload it to IronWorker. You can do this in a single library call:

{% include worker/start/first-worker/python/post-code.md %}

The `runFilename` parameter is the filename in the zip you want the worker to execute when it runs. The `zipFilename` parameter is the zip you want to upload. The `name` parameter is a name for the worker that will help you find it on your HUD and will let you run the worker. The function returns a response from the server. If everything goes well, you'll see this:

{% include worker/start/first-worker/python/post-code-response.md %}

To pull it all together, here's the full upload script:

{% include worker/start/first-worker/python/upload-worker.md %}

To run, just save the script as "upload.<span class="language extension">py</span>" in the same directory as fibonacci.<span class="language extension">py</span>, then call `<span class="language command">python</span> upload.<span class="language extension">py</span>`.

## Queuing a Task

Queuing a task is pretty trivial, once the code is uploaded. It consists of a single library call:

{% include worker/start/first-worker/python/queue-task.md %}

The `name` parameter is just the name of the worker you want to give the task to. The `payload` parameter is just a dict of the payload data you want to pass to the task. Remember payload.json back when we were writing the Fibonacci script? This is where that data comes from. But rather than hand-writing JSON to a file, you just specify a dict and IronWorker takes care of the rest. If your worker doesn't need a payload, you can just pass `None` for payload, or leave it off entirely.

The return is the response, containing relevant information on the task. You should hang on to that (sessions, cookies, database, memcached... whatever floats your boat for data retention) to check how the task is progressing (which we'll cover in the next part).

Here's an example run script. Just save it as "run.<span class="language extension">py</span>", then execute `<span class="language command">python</span> run.<span class="language extension">py</span>`:

{% include worker/start/first-worker/python/run.md %}

The script will upload a task to your worker, then print out the task information so you can check on it. If you want to change the max variable, you can run it as `<span class="language command">python</span> run.<span class="language extension">py</span> --max=9000` or whatever value you like.

## Checking the status of the worker

Now that we've got our code on IronWorker and we've got it running, it would help to know the status of our worker. Has it finished that job yet? Fortunately, there's a simple way to do this.

{% include worker/start/first-worker/python/get-task-details.md %}

`worker` is, again, just the library configured with a `project_id` and `token`. `task` is just the task information that was returned when we queued the task--it's a `dict` of information, the specifics of which you can find [here](/worker/reference/api/#queue_a_task). `status` will be a string like "complete", "running", "queued", or "cancelled". `details` is an object of all the details about the task from the [API](/worker/reference/api/#get_info_about_a_task).

Here's a sample script that draws the task ID out of the --task option:

{% include worker/start/first-worker/python/check-task.md %}

Save the script as checkTask.<span class="language extension">py</span>, then run `<span class="language command">python</span> checkTask.<span class="language extension">py</span> --task="INSERT_TASK_ID"`, substituting the task ID that `run.<span class="language extension">py</span>` echoed to STDOUT. It will tell you the status of the task.

But how do we get the sequence we generated? Well, remember when we printed it surrounded by `MAGICALSTDOUTSEPARATOR`? We're going to fetch the log, find the sequence, and print it. We needed to surround it with a unique string in case something else decided to print to STDOUT, dirtying our logs.

Getting the log is pretty easy:

{% include worker/start/first-worker/python/get-log.md %}

`worker` is just the library, configured with your `token` and `project_id`. `task_id` is just the task you want to get the log for. Once you have the log, just split the string to separate the output we want. Finally, use parse the string as JSON to turn the JSON array into a native array. Here's a sample script:

{% include worker/start/first-worker/python/log-script.md %}

Save the script as "getLog.<span class="language extension">py</span>" and run `<span class="language command">python</span> getLog.<span class="language extension">py</span> --task="INSERT_TASK_ID"`, again inserting a task ID, and you'll see the Fibonacci sequence printed out.

Congratulations, you're now ready to use IronWorker!

## Where to go from here

Now that you've got the basics of IronWorker down, you might want to check out some more advanced topics:

* [**Scheduling tasks**](/worker/start/scheduling-tasks): tasks can be scheduled to happen at some point in the future, some amount of time from now, or even repeating over time.
* [**Setting task progress**](/worker/start/task-progress): you can set a progress variable on tasks that will show up in their detail view. Wouldn't it be nice to know how many Fibonacci numbers we had gotten through, instead of just "working"?
* [**Managing tasks**](/worker/start/managing-tasks): In really big projects, you can have a lot of tasks running at once. The library lets you list, cancel, and delete tasks to help you manage your worker.
* [**Interfacing with IronMQ**](/worker/articles/integrations/ironmq): Getting your results as a log is a pain. There has to be a better way. Sure, you could have them emailed, Twittered, or sent as parameters in an HTTP request, but that requires you to run your own systems. IronMQ is a messaging queue built in the cloud, so you don't have to worry about that. Even better, IronWorker and IronMQ can work together.

