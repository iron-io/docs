---
title: Writing Workers in Ruby
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['Ruby', '/ruby']
languages:
  - name: 'iron_worker'
    command: 'ruby'
    extension: 'rb'
  - name: 'iron_worker_ng'
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
puts "Hello from Ruby"
{% endhighlight %}

### Create a script to upload the worker.
{% highlight ruby %}
require 'iron_worker_ng'

client = IronWorkerNG::Client.new(:token => "TOKEN", :project_id => "PROJECT_ID")
code = IronWorkerNG::Code::Ruby.new(:name => "RubyWorker", :exec => 'PATH TO WORKER SCRIPT')
client.codes.create(code)
{% endhighlight %}

### Queue a task to the new worker.
{% highlight ruby %}
require 'iron_worker_ng'

client = IronWorkerNG::Client.new(:token => "TOKEN", :project_id => "PROJECT_ID")
task_id = client.tasks.create('RubyWorker')
{% endhighlight %}

## Deep Dive

### A Note On Libraries

We currently offer both the [iron_worker](https://github.com/iron-io/iron_worker_ruby) 
and [iron_worker_ng](https://github.com/iron-io/iron_worker_ruby_ng) gems as 
officially supported client libraries. The `iron_worker` gem is considered the 
stable incumbent; the `iron_worker_ng` gem is considered to be the improved 
upstart.

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

A [limited number of gems](/worker/reference/environment?lang=ruby#ruby_gems_installed) 
are included in the cloud environment, but we highly recommend that you don't 
rely on those&mdash;we can't guarantee they will always match the version you 
require or will continue to exist on our system. They are largely there to make 
quick tests easier. For production workers, we suggest you merge everything, so 
you can manage your own dependencies.

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
