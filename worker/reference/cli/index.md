---
title: The IronWorker Command Line Interface
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['Command Line', 'cli']
---

# The IronWorker Command Line Interface

PaaS providers like [Heroku](http://www.heroku.com), [AppFog](http://www.appfog.com), 
and [App Engine](http://appengine.google.com) have all standardised around 
the convention of using a command line interface to interact with your apps. 
In our effort to provide tools that work with developers' current work flow, 
IronWorker has created a command line tool to interact with the service.

## Installing

The command line interface for IronWorker uses the [IronWorkerNG gem](http://github.com/iron-io/iron_worker_ruby_ng), 
so you'll need to install both the gem and Ruby.

To check if you have Ruby installed, run

{% highlight bash %}
ruby -v
{% endhighlight %}

If you don't have Ruby installed, you can get instructions on installing it 
from [the Ruby website](http://www.ruby-lang.org/en/downloads/).

Once Ruby is installed, you'll need the IronWorkerNG gem:

{% highlight bash %}
sudo gem install iron_worker_ng
{% endhighlight %}

You should be all set up now. To check your installation, run the following:

{% highlight bash %}
iron_worker -v
{% endhighlight %}

## Configuration

The command line tool is really just the Ruby gem, so it follows the global 
[configuration scheme](/articles/configuration) that all official libraries 
use. You can configure the tool by creating an `iron.json` file in the 
directory of the `.worker` file, an `.iron.json` file in your home directory, 
or the environment variables. For example, to override the project ID for a 
single command, you could run the following:

{% highlight bash %}
IRON_PROJECT_ID=new_project_id_here iron_worker upload myworker
{% endhighlight %}

The same applies to the `IRON_TOKEN` environment variable.

## Creating & Uploading Code Packages

You can use [.worker files](/worker/reference/dotworker) to define workers 
that can then be uploaded using the command line tools.

The command to upload a worker is:

{% highlight bash %}
iron_worker upload $WORKER
{% endhighlight %}

Where `$WORKER` is replaced by the name of your worker file, minus the .worker.

There are additional options available to the upload command; you can find 
a list of them by running `iron_worker upload --help`.

## Queuing Tasks

Testing workers no longer takes a script that creates a task to test with. 
Instead, you can queue tasks directly from the command line:

{% highlight bash %}
iron_worker queue [OPTIONS]
{% endhighlight %}

You can find a list of options for the command by running `iron_worker queue --help`.

## Scheduling Tasks

The command line tool also allows you to schedule tasks to be run repeatedly 
or at a later time, just as the gem would allow you to in a script.

You can schedule a task using the following command:

{% highlight bash %}
iron_worker schedule [OPTIONS]
{% endhighlight %}

You can find a list of options for the command by running `iron_worker schedule --help`.

## Retrieving a Task's Log

You no longer have to write a script to check the log of your tasks. You can 
install call the following command:

{% highlight bash %}
iron_worker log [OPTIONS]
{% endhighlight %}

You can find a list of options for the command by running `iron_worker log --help`.
