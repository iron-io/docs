---
title: Writing Workers in Ruby
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['Ruby', '/ruby']
languages:
  - name: 'iron_worker_ng'
    command: 'ruby'
    extension: 'rb'
  - name: 'iron_worker'
    command: 'ruby'
    extension: 'rb'
---

# Writing Workers in Ruby

{% if page.languages %}
{% include language-switcher-head.html %}
{% endif %}

## Quick Start

### Get the gem.

We recommend new users use the [iron_worker_ng](https://github.com/iron-io/iron_worker_ruby_ng) 
gem for Ruby workers. Older customers may be using the [iron_worker](https://github.com/iron-io/iron_worker_ruby) 
gem. We recommend switching off that at your earliest convenience.

You can install the `iron_worker_ng` gem from the command line:
{% highlight bash %}
gem install iron_worker_ng
{% endhighlight %}

### Write your Ruby worker.

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

### Create a .worker file

Worker files are a simple way to define your worker and its dependencies. Save the
following in a file called `hello.worker`

{% highlight ruby %}
# define the runtime language, this can be ruby, java, node, php, go, etc.
runtime "ruby"
# exec is the file that will be executed:
exec "hello_worker.rb"
{% endhighlight %}

You could include gems and other files in there too. [You can read more about .worker files here](http://dev.iron.io/worker/reference/dotworker/).

### Upload your Worker

{% highlight bash %}
iron_worker upload hello
{% endhighlight %}

That command will read your .worker file, create your worker code package and upload it to IronWorker.  Head over to hud.iron.io, click the Worker link on your projects list, then click the Tasks tab. You should see your new worker listed there with zero runs. Click on it to show the task list which will be empty, but not for long.

Let’s quickly test it by running:

    iron_worker queue hello

Now look at the task list in HUD and you should see your task show up and go from "queued" to "running" to "completed".
Now that we know it works, let’s queue up a bunch of tasks from code.

### Queue up Tasks for your Worker

Now you can queue up as many tasks as you want, whenever you want, from whatever language you want. You will want to look at the docs for the client library for your language for how to queue (create a task). The following is an example in ruby, save the following into a file called `queue.rb`:

bump

{% highlight ruby %}
require 'iron_worker_ng'
client = IronWorkerNG::Client.new
100.times do
   client.tasks.create("hello", "foo"=>"bar")
end
{% endhighlight %}

You can run that code with:

    ruby queue.rb

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
the official client libraries take care of that for you and let you just access 
the payload as a variable at runtime. Here's an example:

{% include language-switcher.html %}
<div class="iron_worker">
In the upload script:
{% highlight ruby %}
require 'iron_worker'
require_relative 'example_worker.rb'

IronWorker.configure do |config|
  config.token = "INSERT TOKEN HERE"
  config.project_id = "INSERT PROJECT_ID HERE"
end

worker = ExampleWorker.new
worker.arg1 = "test"
worker.another_arg = ["apples", "oranges"]
worker.queue
{% endhighlight %}

In the worker:
{% highlight ruby %}
require 'iron_worker'

class ExampleWorker < IronWorker::Base
  attr_accessor :arg1
  attr_accessor :another_arg

  def run
    puts arg1
    puts another_arg.inspect
  end
end
{% endhighlight %}
</div>
<div class="iron_worker_ng">
In the upload script:
{% highlight ruby %}
require 'iron_worker_ng'

client = IronWorkerNG::Client.new(:token => "TOKEN", :project_id => "PROJECT_ID")
task_id = client.tasks.create('Worker Name Here', { :arg1 => "Test", :another_arg => ["apples", "oranges"]})
{% endhighlight %}

In the worker:
{% highlight ruby %}
puts params['arg1']
puts params['another_arg'].inspect
{% endhighlight %}
</div>

### Merging

Because your Ruby workers run in a Ruby environment in the cloud, you need to 
upload all your gems and other dependencies with your workers. Fortunately, the 
official client libraries both have built-in solutions for this, called "merging".

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

#### Workers

Sometimes it's desirable to queue up another worker from within a worker. This 
is often used to create master/slave setups, where one worker is the "supervisor" 
and manages a group of other workers. The `iron_worker` gem has built-in 
support for this operation via a `merge_worker` method.

**Note**: the `iron_worker` gem's `merge_worker` method is **not** analogous to 
the `iron_worker_ng` gem's `merge_exec` method. The `merge_exec` method will 
**not** queue up another task. For more information on the `merge_worker` method, 
see the `iron_worker` gem's [wiki page on merge_worker](https://github.com/iron-io/iron_worker_ruby/wiki/merge_worker).

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
      <td><strong>Note:</strong> You may need to merge nokogiri using <span class="fixed-width">merge_gem</span> and then unmerge it using <span class="fixed_width">unmerge_gem</span></td>
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
Your workers should be independent, discreet parts of an application, a mini-application in themselves, so
framework usage in workers, in general, is frowned upon.


Check out [this blog post](http://blog.iron.io/2012/06/powerful-email-infrastructure-with.html) for step-by-step instructions on including and using
the Rails stack including some models, ActionMailers, etc.


