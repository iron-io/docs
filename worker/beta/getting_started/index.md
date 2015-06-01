---
title: IronWorker Getting Started 3-Step Docker Workflow
layout: default
section: worker
---

<img style= "display: block; width: 250px; margin: 0 auto;"  src="/images/docker_logo.png" style=""/>


<p class="subtitle">Offload your tasks to the parallel-processing power of the elastic cloud. Write your code, then queue tasks against it&mdash;no servers to manage, no scaling to worry about.</p>

### Whats New? Why Docker?

1. <strong>Development ENV == Local ENV</strong> Test workers locally in the exact same environment as when it's running on the IronWorker cloud.
1. <strong>Fast testing.</strong> No more wasted time like the older process of write code,
upload (wait for build if doing remote build), queue a task, wait for it to run, view logs in HUD, repeat... Now you can
test your worker locally in milliseconds.
1. <strong>No</strong> Ruby dependency for the cli tool.
1. <strong>No</strong> .worker file required. The .worker file defined all your dependencies, this is no longer required since you're dependencies will be contained in your working directory.
1. <strong>No</strong> cli tool magic. The previous cli tool did a lot of magic behind the scenes, packaging up dependencies and wrapping up your code to make it easy to run.

<div class="alert">
<p><strong>Note:</strong> The Docker Workflow is in BETA. Meaning changes to how the workflow and tool should be expected.</p></div>


<div class="flow-steps">
    <div class="step">
        <a class="number" href="#write">1</a>
        <a class="title" href="#write">Write and Test your Worker</a>
    </div>
        <i class="icon-long-arrow-right icon-2x"></i>

    <div class="step">
        <a class="number" href="#upload">2</a>
        <a class="title" href="#queue">Package and Upload your Worker</a>
    </div>
        <i class="icon-long-arrow-right icon-2x"></i>

    <div class="step last">
        <a class="number" href="#queue">3</a>
        <a class="title" href="#inspect">Queue Tasks for your Worker</a>
    </div>
</div>

## Setup

Before starting, you'll need to setup a couple of things. You only need to do this once.

1. [Install the CLI tool](/worker/beta/cli/)
1. [Setup your Iron.io credentials](/worker/reference/configuration/)
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
iron worker upload --zip helloworld.zip iron/images:ruby-2.1 ruby helloworld.rb
{% endhighlight %}

Notice that we use the same docker image as above.

And finally queue up a job for it!

{% highlight bash %}
iron worker queue --wait helloworld
{% endhighlight %}

The `--wait` parameter waits for the job to finish, then prints the output.
You will also see a link to [HUD](http://hud.iron.io) where you can see all the rest of the task details along with the log output.

That's it, you've ran a worker on the IronWorker cloud platform!

Now let's get into more detail.

<h2 id="write">1. Write and Test your Worker</h2>

IronWorker's <a href="/worker/reference/environment">environment</a> is a Linux Docker container that your task is executed in.
 Anything you write that runs inside of our published Docker images, or [stacks](/worker/reference/environment/#default_language_versions)
 should run just the same as on IronWorker. The key here is getting it to run with the Docker commands below and sample
 payloads.

The primary Docker command is:

{% highlight bash %}
docker run --rm -v "$(pwd)":/worker -w /worker iron/images:MY_STACK sh -c 'MY_EXECUTABLE -payload MY_PAYLOAD.json'
{% endhighlight %}

* Replacing MY\_STACK with one of our [supported stacks](/worker/reference/environment/#default_language_versions)
* Replace MY\_COMMAND with what you'd like to execute. For instance, if your worker was a Ruby script called `myworker.rb`, you'd
replace MY\_COMMAND with `ruby myworker.rb`. If it was a Go program, you'd change it to `./myworker`.
* Replace MY_PAYLOAD with the name of an example payload file to test with. This payload file is the format that you'll use
to queue up jobs/tasks for your worker after it's uploaded.

This command may seem simple at first glance, but the main thing is that it will force you to vendor all your dependencies
along with your worker. You'll find links to an example repository showing how to do this for various languages.

<h2 id="upload">2. Package and Upload your Worker</h2>

Packing is pretty straightforward knowing that you got it working with the `docker run` command above, just zip it up.

{% highlight bash %}
zip -r myworkername.zip .
{% endhighlight %}

Then upload the zip you just created:

{% highlight bash %}
iron worker upload --zip myworkername.zip iron/images:MY_STACK MY_PROGRAM
{% endhighlight %}

<h2 id="queue">3. Queue Tasks for your Worker</h2>

Now you get to queue up tasks/jobs for your Worker!

{% highlight bash %}
iron worker queue --wait myworkername
{% endhighlight %}

Typically you'd use the [IronWorker API](/worker/reference/api/#queue_a_task) to actually queue up tasks from other systems.
The cli queue command above is primarily for testing purposes.


<br/><br/><br/>
