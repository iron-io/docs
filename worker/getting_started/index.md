---
title: IronWorker Getting Started
layout: default
section: worker
---

<p class="subtitle">Offload your tasks to the parallel-processing power of the elastic cloud. Write your code, then queue tasks against it&mdash;no servers to manage, no scaling to worry about.</p>

<div class="alert">
<p><strong>Note:</strong> Before starting, be sure to read <a href="/worker/reference/configuration/">Client Configuration</a>
 for information on creating an `iron.json` file with your Iron.io credentials. </p>
</div>

# New Docker Based Workflow - BETA

<img src="/images/docker_logo.png" style="width: 250px;"/>

There are now two flows you can follow:

1. Docker based workflow - BETA
1. IronWorkerNG based workflow (todo: better name?)

The Docker based workflow is a new way to develop workers that has several advantages over the old way:

1. Test workers locally in the exact same environment as when it's running on the IronWorker cloud.
1. Much faster dev/testing since you can test locally. No more wasted time like the current process of write code, 
upload (wait for build if doing remote build), queue a task, wait for it to run, view logs in HUD, repeat... Now you can 
test your worker locally in milliseconds. 
1. No Ruby dependency for the cli tool.
1. No .worker file required. The .worker file defined all your dependencies, this is no longer required since you're dependencies
will be contained in your working directory. 
1. No cli tool magic. The old cli tool did a lot of magic behind the scenes, packaging up dependencies
and wrapping up your code to make it easy to run. 

<h3>NOTE: The Docker Workflow is in BETA. It may change before release so be prepared to keep up with changes if you use it.</h3>


<div class="flow-steps">
	<div class="step">
		<a class="number" href="#writed">1</a>
		<a class="title" href="#write">Write and Test your Worker</a>
	</div>
        <i class="icon-long-arrow-right icon-2x"></i>

	<div class="step">
  		<a class="number" href="#uploadd">2</a>
    	<a class="title" href="#queue">Package and Upload your Worker</a>
  	</div>
        <i class="icon-long-arrow-right icon-2x"></i>

  	<div class="step last">
  		<a class="number" href="#queued">3</a>
    	<a class="title" href="#inspect">Queue Tasks for your Worker</a>
  	</div>
</div>

## Setup

Before starting, you'll need to setup a couple of things. You only need to do this once.

1. [Install the Iron.io cli tool](http://localhost:4000/worker/reference/cli/)
1. [Setup your Iron.io credentials](http://localhost:4000/worker/reference/configuration/)
1. [Install Docker](https://docs.docker.com/installation/#installation)

## Hello World Worker

This is a very simple hello world example worker in Ruby. You don't even need Ruby installed to try this example so give it a go!
All languages follow the same process so you'll get an idea of how things work regardless.

Create a file called `helloworld.rb` containing:

{% highlight ruby %}
puts "Hello World!"
{% endhighlight %}

Now let's run it in one of the Iron stack containers:

{% highlight bash %}
docker run --rm -v "$(pwd)":/worker -w /worker iron/images:ruby-2.1 sh -c 'ruby helloworld.rb'
{% endhighlight %}

The fact that it runs means it's all good to run on IronWorker, so lets upload it and queue up a task for it so it runs on
the IronWorker platform.

Let's package it up first:

{% highlight bash %}
zip -r helloworld.zip .
{% endhighlight %}

Then upload it:

{% highlight bash %}
iron worker upload --stack ruby-2.1 helloworld.zip ruby helloworld.rb
{% endhighlight %}

Notice the --stack parameter is the same as the Docker container we used above.

And finally queue up a job for it!

{% highlight bash %}
iron worker queue --wait helloworld
{% endhighlight %}

The `--wait` parameter waits for the job to finish, then prints the output.
You will also see a link to [HUD](http://hud.iron.io) where you can see all the rest of the task details along with the log output.

That's it, you've ran a worker on the IronWorker cloud platform!

Now let's get into more detail. 

<h2 id="writed">1. Write and Test your Worker</h2>

IronWorker's <a href="/worker/reference/environment">environment</a> is a Linux Docker container that your task is executed in.
 Anything you write that runs inside of our published Docker images, or [stacks](http://localhost:4000/worker/reference/environment/#default_language_versions)
 should run just the same as on IronWorker. The key here is getting it to run with the Docker commands below and sample
 payloads.
 
The primary Docker command is:

{% highlight bash %}
docker run --rm -v "$(pwd)":/worker -w /worker iron/images:MY_STACK sh -c 'MY_EXECUTABLE -payload MY_PAYLOAD.json'
{% endhighlight %}

* Replacing MY\_STACK with one of our [supported stacks](http://localhost:4000/worker/reference/environment/#default_language_versions)
* Replace MY\_COMMAND with what you'd like to execute. For instance, if your worker was a Ruby script called `myworker.rb`, you'd
replace MY\_COMMAND with `ruby myworker.rb`. If it was a Go program, you'd change it to `./myworker`.
* Replace MY_PAYLOAD with the name of an example payload file to test with. This payload file is the format that you'll use
to queue up jobs/tasks for your worker after it's uploaded.

This command may seem simple at first glance, but the main thing is that it will force you to vendor all your dependencies
along with your worker. You'll find links to an example repository showing how to do this for various languages.

<h2 id="uploadd">2. Package and Upload your Worker</h2>

Packing is pretty straightforward knowing that you got it working with the `docker run` command above, just zip it up. 

{% highlight bash %}
zip -r myworkername.zip .
{% endhighlight %}

Then upload the zip you just created:

{% highlight bash %}
iron worker upload --stack MY_STACK myworkername.zip MY_PROGRAM
{% endhighlight %}

<h2 id="queued">3. Queue Tasks for your Worker</h2>

Now you get to queue up tasks/jobs for your Worker!

{% highlight bash %}
iron worker queue --wait myworkername
{% endhighlight %}

Typically you'd use the [IronWorker API](/worker/reference/api/#queue_a_task) to actually queue up tasks from other systems. 
The cli queue command above is primarily for testing purposes.


<br/><br/><br/>

# IronWorkerNG Based Workflow

<div class="flow-steps">
	<div class="step">
		<a class="number" href="#write">1</a>
		<a class="title" href="#write">Write Your Worker</a>
	</div>
        <i class="icon-long-arrow-right icon-2x"></i>

	<div class="step">
    	<a class="number" href="#upload">2</a>
    	<a class="title" href="#upload">Create and Upload Your Code Package</a>
	</div>
        <i class="icon-long-arrow-right icon-2x"></i>

	<div class="step">
  		<a class="number" href="#tasks">3</a>
    	<a class="title" href="#queue">Queue/Schedule Your Task</a>
  	</div>
        <i class="icon-long-arrow-right icon-2x"></i>

  	<div class="step last">
  		<a class="number" href="#inspect">4</a>
    	<a class="title" href="#inspect">Inspect Your Worker</a>
  	</div>
</div>

<h2 id="write">1. Write Your Worker</h2>

<p>IronWorker's <a href="/worker/reference/environment">environment</a> is just a Linux sandbox that your task is executed in. Anything you write that runs on your machine, if packaged correctly, should be able to be run in IronWorker. For example workers, check out the <a href="https://github.com/iron-io/iron_worker_examples">examples repository</a> or the page for <a href="/worker/reference/environment/#default_language_versions">your favorite language versions and runtime environments</a>.</p>

<h2 id="upload">2. Create and Upload Your Code Package</h2>

<p>You need to package all your code <strong>and its dependencies</strong> together and upload it to IronWorker before it can be run&mdash;your code is run <em>entirely</em> on IronWorker's servers, so it's important that you package <strong>all</strong> the dependencies of your code with it. There are several parts to this step, but you only need to do this when you want to update your worker's code, so you shouldn't have to do it very often.</p>

<div class="alert">
	<p><strong>Note:</strong> You only need to upload your code package <em>when your code changes</em>. Queuing tasks <em>does not</em> require you to upload the code package again.</p>
</div>

<p>The suggested way to do this is through a <span class="fixed-width">.worker</span> (pronounced "dotworker") file. There's extensive <a href="/worker/reference/dotworker">documentation</a> for <span class="fixed-width">.worker</span> files, but the snippet below should be enough to get you started. Just save it as "<span class="fixed-width">firstworker.worker</span>" in the same directory as your code.</p>

<figcaption><span>firstworker.worker </span></figcaption>

{% highlight ruby %}
runtime "ruby" # The runtime the code should be run under: ruby, python, php, or sh

exec "path/to/file.rb" # The file to execute when a task is queued. Your worker's entry point

file "config.json" # The path to a file to upload as a dependency of the worker; just leave this out if you don't have any dependencies.
{% endhighlight %}

<div class="alert">
	<p><strong>Note:</strong> You should never have a file named <em>just</em> ".worker". Always use a unique, recognisable name&mdash;it's what your code package will be named. "helloworld.worker" will create a code package named "helloworld", "turnintoaunicorn.worker" will create a code package named "turnintoaunicorn", etc.</p>
</div>

<p>Once you've defined your worker and its dependencies with a <span class="fixed-width">.worker</span> file, you can upload it using the <a href="/worker/reference/cli">command line tool</a> for IronWorker. <strong>Note:</strong> You'll need to have Ruby 1.9+ installed to use the IronWorker CLI. After that, just run "<span class="fixed-width">gem install iron_worker_ng</span>" to get the tool.</p>

<p>To interact with the IronWorker API, you'll need your project's ID and an auth token from the <a href="https://hud.iron.io">HUD</a>. Once you retrieve them, you need to <a href="/worker/reference/configuration">configure the CLI to use them</a>. Create an <span class="fixed-width">iron.json</span> file in the same folder as your <span class="fixed-width">firstworker.worker</span> file that looks like this:</p>

<figcaption><span>iron.json </span></figcaption>

{% highlight js %}
{
  "project_id": "INSERT YOUR PROJECT ID HERE",
  "token": "INSERT YOUR AUTH TOKEN HERE"
}
{% endhighlight %}

<p>Once that's done, you can just run the following command:</p>

<figcaption><span>Command Line </span></figcaption>
<div class="cli">


{% highlight bash %}
$ iron_worker upload firstworker
{% endhighlight %}
</div>

<p>That will upload the code package to IronWorker and name it "firstworker"&mdash;you'll use the name to queue tasks to the package. That's it, your code is ready to be run!</p>

<h2 id="tasks">3. Queue/Schedule Your Task</h2>

<p>Now that you've uploaded your worker, you can just queue tasks against it to run them, in parallel, in the cloud. You can queue a task directly from <a href="/worker/reference/environment/#default_language_versions">your favorite language versions and runtime environments</a> or from the command line:</p>

<figcaption><span>Command Line </span></figcaption>


{% highlight bash %}
$ iron_worker queue firstworker
{% endhighlight %}

<p>You can also specify a payload, which is a string that will be supplied to your worker while it runs the task, letting you pass in information. Almost all payloads are JSON strings:</p>

<figcaption><span>Command Line </span></figcaption>


{% highlight bash %}
$ iron_worker queue firstworker -p '{"key1": "val1", "obj1": {"key2": "val2"}, "arr1": ["item1", "item2"]}'
{% endhighlight %}

<p>Most clients&mdash;including the CLI&mdash;will automatically handle parsing the payload in your worker, so you can just access the variable or function they give you in your worker's code. We have <a href="/worker/reference/payload">more information</a> on payloads, if you're curious.</p>

<div class="alert">
  <p><strong>Protip:</strong> we also offer a <a href="/worker/webhooks">webhook endpoint</a>&mdash;it's great for automating tasks. <a href="http://blog.iron.io/2012/04/one-webhook-to-rule-them-all-one-url.html">Check out our blog post</a> for more information on this.</p>
</div>

<p>Sometimes you want tasks that repeat periodically, or that will be queued (queued, not executed) at a specific time or even date. IronWorker supports <a href="/worker/scheduling">scheduled tasks</a> for this purpose. They're just like regular tasks (payloads, executed in the cloud, in parallel), but they're queued on your schedule.</p>

<p>Again, you can schedule a task from your <a href="/worker/reference/environment/#default_language_versions">your favorite language versions and runtime environments</a> or from the command line:</p>

<figcaption><span>Command Line </span></figcaption>


{% highlight bash %}
$ iron_worker schedule firstworker --start-at "2012-07-19T23:51:00-04:00"
{% endhighlight %}

<p>If you want to just start a task after a short delay, you can do that too. Just specify <span class="fixed-width">--delay</span> followed by the number of seconds the task should be delayed.</p>

<figcaption><span>Command Line </span></figcaption>


{% highlight bash %}
$ iron_worker schedule firstworker --delay 120
{% endhighlight %}

</p>If you want to have a task repeat, you can just specify the <span class="fixed-width">--run-every</span> option, followed by the number of seconds between each run:</p>

<figcaption><span>Command Line </span></figcaption>


{% highlight bash %}
$ iron_worker schedule firstworker --run-every 60
{% endhighlight %}

<p>There are a lot of options to configure scheduling tasks; check our <a href="/worker/scheduling">more detailed guide</a> to see more of the options.</p>

<h2 id="inspect">4. Inspect Your Worker (Logging)</h2>
<h2 id="default_logging">Logging to STDOUT (default)</h2>
<p>In a perfect world, your workers would just work. Sometimes though, workers have bugs in them or an API is down or something goes wrong. In these situations, it's helpful to have some debugging tools.</p>

<p>To aid in debugging, everything that is printed to STDOUT (everything from <span class="fixed-width">puts</span> or <span class="fixed-width">print</span> or <span class="fixed-width">echo</span> or your language's equivalent) in a worker is logged in the <a href="https://hud.iron.io">HUD</a>.</p>

<p>Also, in case you think your package wasn't built correctly or forget which version of your worker is running, the HUD offers downloads for every revision of every code package you upload.</p>

<h2 id="external_logging">Logging to External Services</h2>
<p>Sometimes it is more helpful to have all logs in one place. Say you have a big web application and want to consolidate the logs of all your tasks and run global searches. We make that super simple to do. Read this <a href="http://blog.iron.io/2013/07/real-time-logging-for-ironworker.html">blog article</a> on how to setup real-time remote logging to external services. In the article, Papertrail is used as an example but you can send your log output to any syslog endpoint and see it in real-time. You can run your own syslog server with something like <a href="http://www.debuntu.org/how-to-remote-syslog-logging-on-debian-and-ubuntu/">syslogd</a> or <a href="http://danielmiessler.com/blog/howto-use-splunk-as-your-remote-syslog-server">Splunk</a>, or you can use popular logging services such as <a href="https://papertrailapp.com">Papertrail</a> or <a href="http://loggly.com/">Loggly</a>.</p>

<h2>Next Steps</h2>

<p>You should be well-grounded in the IronWorker paradigm now&mdash;now you need to build something cool! Check out our <a href="/worker/reference/environment/#default_language_versions">runtime/languagea . documentation</a> or <a href="/worker/reference">reference material</a> to explore the boundaries of IronWorker's system. If you're looking for ideas about what you can accomplish with IronWorker, you may want to check out our <a href="/solutions">solutions</a>.</p>
