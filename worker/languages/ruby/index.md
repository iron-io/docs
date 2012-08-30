---
title: Writing Workers in Ruby
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['Ruby', '/ruby']
---

# Writing Workers in Ruby

Ruby was the first language supported on IronWorker, and a lot of IronWorker's tools are written in Ruby. It is probably the easiest language to get your worker running in, as it is the most-supported language on the platform. This article will walk you through the specifics of things, but you should be familiar with the [basics of IronWorker](/worker).

## Quick Start

### Get The Ruby Gem

We recommend new users use the [iron_worker_ng](https://github.com/iron-io/iron_worker_ruby_ng) 
gem for Ruby workers, which makes packaging code libraries and other dependencies much easier. Older customers may be using the [iron_worker](https://github.com/iron-io/iron_worker_ruby) 
gem. We recommend switching off that at your earliest convenience.

You're going to need to have Ruby version 1.9 or higher installed to use the `iron_worker_ng` gem.

You can install the `iron_worker_ng` gem from the command line:
{% highlight bash %}
gem install iron_worker_ng
{% endhighlight %}

### Write Your Ruby Worker

{% highlight ruby %}
# Worker code can be anything you want.
puts "Starting HelloWorker at #{Time.now}"
puts "Payload: #{params}"
puts "Simulating hard work for 5 seconds..."
5.times do |i|
  puts "Sleep #{i}..."
  sleep 1
end
puts "HelloWorker completed at #{Time.now}"
{% endhighlight %}

### Create a .worker File

Worker files are a simple way to define your worker and its dependencies. Save the
following in a file called `hello.worker`

{% highlight ruby %}
# set the runtime language. Ruby workers use "ruby"
runtime "ruby"
# exec is the file that will be executed:
exec "hello_worker.rb"
{% endhighlight %}

You could include gems and other files in there too. [You can read more about .worker files here](/worker/reference/dotworker/).

### Create Your Configuration File

The CLI needs a configuration file or environment variables set that tell it what your credentials are. We have some [pretty good documentation](/worker/reference/configuration) about how this works, but for simplicity's sake, just save the following as `iron.json` in the same folder as your `.worker` file:

{% highlight js %}
{
  "project_id": "INSERT YOUR PROJECT ID HERE",
  "token": "INSERT YOUR TOKEN HERE"
}
{% endhighlight %}

You should insert your [project ID](https://hud.iron.io) and [token](https://hud.iron.io/tokens) into that `iron.json` file. Then, assuming you're running the commands from within the folder, the CLI will pick up your credentials and use them automatically.

### Upload Your Worker

{% highlight bash %}
iron_worker upload hello
{% endhighlight %}

That command will read your .worker file, create your worker code package and upload it to IronWorker.  Head over to [hud.iron.io](https://hud.iron.io), click the Worker link on your projects list, then click the Tasks tab. You should see your new worker listed there with zero runs. Click on it to show the task list which will be empty, but not for long.

Let’s quickly test it by running:

    iron_worker queue hello

Now look at the task list in HUD and you should see your task show up and go from "queued" to "running" to "completed".

Now that we know it works, let’s queue up a bunch of tasks from code. **Note**: Once you upload a code package, you can queue as many tasks as you'd like against it. You only need to re-upload the code package when your code changes.

### Queue Up Tasks For Your Worker

Now you can queue up as many tasks as you want, whenever you want, from whatever language you want. You will want to look at the docs for the client library for your language for how to queue or create a task. The following is an example in ruby, save the following into a file called `enqueue.rb`:

{% highlight ruby %}
require 'iron_worker_ng'
client = IronWorkerNG::Client.new
100.times do
   client.tasks.create("hello", "foo"=>"bar")
end
{% endhighlight %}

You can run that code with:

    ruby enqueue.rb

## Deep Dive

### A Note On Libraries

We currently offer both the [iron_worker](https://github.com/iron-io/iron_worker_ruby) 
and [iron_worker_ng](https://github.com/iron-io/iron_worker_ruby_ng) gems as 
officially supported client libraries. The `iron_worker` gem is deprecated and will no longer be under active
development; the `iron_worker_ng` gem is actively maintained and is considered to be the gold standard gem.

We suggest that new users use the `iron_worker_ng` gem and that users who are 
currently using the `iron_worker` gem slowly and carefully transition over when 
they get the opportunity.

### Payload Example

Retrieving the payload in Ruby workers is a bit different&mdash;some of the 
clients take care of the dirty work for you. So while it's still the same 
process&mdash;get the `-payload` argument passed to the script at runtime, 
read the file it specifies, and parse the JSON contained within that file&mdash;
the official client library takes care of that for you and let you just access 
the payload as a variable at runtime. Here's an example:

In the upload script:
{% highlight ruby %}
require 'iron_worker_ng'

client = IronWorkerNG::Client.new
task_id = client.tasks.create('Worker Name Here', { :arg1 => "Test", :another_arg => ["apples", "oranges"]})
{% endhighlight %}

In the worker:
{% highlight ruby %}
puts params['arg1']
puts params['another_arg'].inspect
{% endhighlight %}

### Merging

Because your Ruby workers run in a Ruby environment in the cloud, you need to 
upload all your gems and other dependencies with your workers. Fortunately, the 
official client library has a built-in solution for this, called "merging".

#### Gems

A [limited number of gems](#environment) are included in the cloud environment, 
but we highly recommend that you don't rely on those&mdash;we can't guarantee 
they will always match the version you require or will continue to exist on our 
system. They are largely there to make quick tests easier. For production workers, 
we suggest you merge everything, so you can manage your own dependencies.

You can find out how to merge gems and more about best practices on the 
[Merging Gems page](/worker/languages/ruby/merging-gems).

#### Files and Directories

It's often the case that a worker needs files besides the script that contains 
its functionality. You may need configuration files, other scripts, or other 
static resources. Both official client libraries have made it easy to include 
these auxiliary files.

You can find out more about merging files and directories on the 
[Merging Files & Directories page](/worker/languages/ruby/merging-files-and-dirs).

### Environment

The Ruby environment that the workers run in on IronWorker is as follows:

<table class="reference">
<tbody>
<tr>
<td style="width: 25%;">Ruby Version</td>
<td style="width: 75%;"><a href="http://www.ruby-lang.org/en/downloads/" title="Version 1.9.2p280">1.9.2p280</a></td>
</tr>
<tr>
<td colspan="2" style="text-align: center; width: 100%;"><h4 style="padding: 0px;">Installed Gems</h4></td>
</tr>
<tr>
<td>bson_ext</td>
<td></td>
</tr>
<tr>
<td>curb</td>
<td></td>
</tr>
<tr>
<td>em-http-request</td>
<td></td>
</tr>
<tr>
<td>eventmachine</td>
<td></td>
</tr>
<tr>
<td>mysql2</td>
<td></td>
</tr>
<tr>
<td>net-scp</td>
<td></td>
</tr>
<tr>
<td>net-sftp</td>
<td></td>
</tr>
<tr>
<td>net-ssh</td>
<td></td>
</tr>
<tr>
<td>nokogiri</td>
<td></td>
</tr>
<tr>
<td>rmagick</td>
<td><strong>Note:</strong> Import this as follows: <span class="fixed-width">require 'RMagick'</span></td>
</tr>
<tr>
<td>sqlite3</td>
<td></td>
</tr>
<tr>
<td>typhoeus</td>
<td></td>
</tr>
<tr>
<td>yajl-ruby</td>
<td></td>
</tr>
</tbody>
</table>

You can just use `require '{GEM_NAME}'` to use these gems in your workers. 
**Note:** While it is possible to use these gems without bundling them, we 
*highly recommend* that you merge gems your code is reliant upon whenever 
possible. Most of these gems are included in the environment because they are 
binary gems, making it impossible to merge them. The ones that are not binary 
gems are some of the more popular gems, which we include to allow users to try 
things out and test things with minimal setup and pain. We cannot guarantee 
which version of the gem will be available, and we may update them without 
warning. Reliance on these gems may cause some unexpected conflicts in your code.

### Ruby on Rails

It is possible to upload, queue, and manage your workers from
within a Rails application, but it's important to note that IronWorker
**does not auto-include** your models, libraries, and other Rails stack pieces.
Your workers should be independent, discrete parts of an application, a mini-application in themselves, so
framework usage in workers, in general, is frowned upon.


Check out [this blog post](http://blog.iron.io/2012/06/powerful-email-infrastructure-with.html) for step-by-step instructions on including and using
the Rails stack including some models, ActionMailers, etc.
