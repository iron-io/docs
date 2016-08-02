---
title: IronWorkers in Ruby
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['Ruby', '/ruby']
---

<b>This approach uses our depreciated workflow. Please see <a href='https://github.com/iron-io/dockerworker/tree/master/ruby'>https://github.com/iron-io/dockerworker/tree/master/ruby</a> for the current process.</b>

Ruby was the first language supported on IronWorker, and a lot of IronWorker's tools are written in Ruby.
It is probably the easiest language to get your worker running in, as it is the most-supported language on the platform.
This article will walk you through the specifics of things, but you should be familiar with the [basics of IronWorker](/worker).

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li>
      <a href="#quick_start">Quick Start</a>
      <ul>
        <li><a href="#get_the__ruby_gem">Get the <code>iron_worker_ng</code> Ruby Gem</a></li>
        <li><a href="#create_your_configuration_file">Create Your Configuration File</a></li>
        <li><a href="#write_your_ruby_worker">Write Your Ruby Worker</a></li>
        <li><a href="#create_a_worker_file">Create a .worker File</a></li>
        <li><a href="#upload_your_worker">Upload Your Worker</a></li>
        <li><a href="#queue_up_tasks_for_your_worker">Queue Up Tasks for Your Worker</a></li>
      </ul>
    </li>
    <li>
      <a href="#deep_dive">Deep Dive</a>
      <ul>
        <li><a href="#a_note_on_libraries">A Note on Libraries</a></li>
        <li><a href="#payload_example">Payload Example</a></li>
        <li><a href="#merging">Merging</a></li>
        <li><a href="#ruby_on_rails">Ruby on Rails</a></li>
      </ul>
    </li>
  </ul>
</section>


<h2 id="quick_start">Quick Start</h2>

<h3 id="get_the__ruby_gem">Get the <code>iron_worker_ng</code> Ruby Gem</h3>

We recommend new users use the [iron_worker_ng](https://github.com/iron-io/iron_worker_ruby_ng)
gem for Ruby workers, which makes packaging code libraries and other dependencies much easier.
It also contains [CLI](/worker/reference/cli).
Older customers may be using the [iron_worker](https://github.com/iron-io/iron_worker_ruby) gem.
We recommend switching off that at your earliest convenience.

If you are running Ruby 1.8, you'll need to install `json` gem additionally.
Note that we are providing Ruby 1.9/Ruby 2.1 and you could select proper version using 'stack' keyword in your .worker file.

You can install the `iron_worker_ng` gem from the command line:

<figcaption><span>Command Line</span></figcaption>


```sh
$ gem install iron_worker_ng
```

<h3 id="create_your_configuration_file">Create Your Configuration File</h3>

The CLI needs a configuration file or environment variables set that tell it what your credentials are.
We have some [pretty good documentation](/worker/reference/configuration) about how this works,
but for simplicity's sake, just save the following as `iron.json` in the same folder as your `.worker` file:

<figcaption><span>iron.json</span></figcaption>

```js
{
  "project_id": "INSERT YOUR PROJECT ID HERE",
  "token": "INSERT YOUR TOKEN HERE"
}
```

You should insert your [project ID](https://hud.iron.io) and [token](https://hud.iron.io/tokens) into that `iron.json` file.
Then, assuming you're running the commands from within the folder, the CLI will pick up your credentials and use them automatically.

<h3 id="write_your_ruby_worker">Write Your Ruby Worker</h3>

<figcaption><span>hello_worker.rb</span></figcaption>

```ruby
# Worker code can be anything you want.
puts "Starting HelloWorker at #{Time.now}"
puts "Payload: #{params}"
puts "Simulating hard work for 5 seconds..."
5.times do |i|
  puts "Sleep #{i}..."
  sleep 1
end
puts "HelloWorker completed at #{Time.now}"
```

<h3 id="create_a_worker_file">Create a .worker File</h3>

Worker files are a simple way to define your worker and its dependencies. Save the
following in a file called `hello.worker`

<figcaption><span>hello.worker</span></figcaption>

```ruby
# set the runtime language. Ruby workers use "ruby"
runtime "ruby"
# exec is the file that will be executed:
exec "hello_worker.rb"
```

You could include gems and other files in there too. [You can read more about .worker files here](/worker/reference/dotworker/).

<h3 id="upload_your_worker">Upload Your Worker</h3>

<figcaption><span>Command Line</span></figcaption>


```sh
$ iron_worker upload hello
```

That command will read your .worker file, create your worker code package and upload it to IronWorker.
Head over to [hud.iron.io](https://hud.iron.io), click the Worker link on your projects list, then click the Tasks tab.
You should see your new worker listed there with zero runs.
Click on it to show the task list which will be empty, but not for long.

Let’s quickly test it by running:

<figcaption><span>Command Line</span></figcaption>


```sh
$ iron_worker queue hello
```

Now look at the task list in HUD and you should see your task show up and go from "queued" to "running" to "completed".

Now that we know it works, let’s queue up a bunch of tasks from code.

<div class="alert">
<p><strong>Note:</strong> Once you upload a code package, you can queue as many tasks as you'd like against it.
You only need to re-upload the code package when your code changes.</p>
</div>

<h3 id="queue_up_tasks_for_your_worker">Queue Up Tasks for Your Worker</h3>

Now you can queue up as many tasks as you want, whenever you want, from whatever language you want.
You will want to look at the docs for the client library for your language for how to queue or create a task.
The following is an example in ruby, save the following into a file called `enqueue.rb`:

<figcaption><span>enqueue.rb</span></figcaption>

```ruby
require 'iron_worker_ng'
client = IronWorkerNG::Client.new
100.times do
   client.tasks.create("hello", "foo"=>"bar")
end
```

You can run that code with:

<figcaption><span>Command Line</span></figcaption>


```sh
$ ruby enqueue.rb
```

<h2 id="deep_dive">Deep Dive</h2>

<h3 id="a_note_on_libraries">A Note on Libraries</h3>

We currently offer both the [iron_worker](https://github.com/iron-io/iron_worker_ruby)
and [iron_worker_ng](https://github.com/iron-io/iron_worker_ruby_ng) gems as
officially supported client libraries. The `iron_worker` gem is deprecated and will no longer be under active
development; the `iron_worker_ng` gem is actively maintained and is considered to be the gold standard gem.

We suggest that new users use the `iron_worker_ng` gem and that users who are
currently using the `iron_worker` gem slowly and carefully transition over when
they get the opportunity.

<h3 id="payload_example">Payload Example</h3>

Retrieving the payload in Ruby workers is a bit different&mdash;some of the
clients take care of the dirty work for you. So while it's still the same
process&mdash;get the `-payload` argument passed to the script at runtime,
read the file it specifies, and parse the JSON contained within that file&mdash;
the official client library takes care of that for you and lets you just access
the payload as a variable at runtime. Here's an example:

In the task queuing script:

<figcaption><span>enqueue.rb</span></figcaption>

```ruby
require 'iron_worker_ng'

client = IronWorkerNG::Client.new
task_id = client.tasks.create('Worker Name Here',
                              {:arg1 => "Test",
                               :another_arg => ["apples", "oranges"]})
```

In the worker:

<figcaption><span>hello_worker.rb</span></figcaption>

```ruby
puts params['arg1']
puts params['another_arg'].inspect
```

Please note that for non-JSON arguments, you should use the `payload` variable instead of the `params` variable.
The `payload` variable is simply the raw contents of the file specified by `-payload`, without any JSON parsing being applied.

<figcaption><span>hello_worker.rb</span></figcaption>

```ruby
puts payload
```

<h3 id="merging">Merging</h3>

Because your Ruby workers run in a Ruby environment in the cloud, you need to
upload all your gems and other dependencies with your workers. Fortunately, the
official client library has a built-in solution for this, called "merging".

#### Gems

You can find out how to merge gems and more about best practices on the
[Merging Gems page](/worker/languages/ruby/merging-gems).

#### Files and Directories

It's often the case that a worker needs files besides the script that contains
its functionality. You may need configuration files, other scripts, or other
static resources. Both official client libraries have made it easy to include
these auxiliary files.

You can find out more about merging files and directories on the
[Merging Files & Directories page](/worker/languages/ruby/merging-files-and-dirs).

<h3 id="ruby_on_rails">Ruby on Rails</h3>

It is possible to upload, queue, and manage your workers from
within a Rails application, but it's important to note that IronWorker
**does not auto-include** your models, libraries, and other Rails stack pieces.
Your workers should be independent, discrete parts of an application, a mini-application in themselves, so
framework usage in workers, in general, is frowned upon.


Check out [this blog post](http://blog.iron.io/2012/06/powerful-email-infrastructure-with.html)
for step-by-step instructions on including and using the Rails stack including some models, ActionMailers, etc.
