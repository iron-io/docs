Running a worker involves four major steps:

1. [Creating Your Worker](#creating_your_worker)
2. [Queuing Your Worker](#queuing_your_worker)
3. [Checking the Status of Your Worker](#checking_the_status_of_your_worker)

## Creating Your Worker

Worker creation is about as simple as it gets: you just write the script you want executed and a runner to execute the script.

### Writing Your Script

You should never assume anything is installed in the IronWorker runtime. That means anything your script needs in terms of classes or libraries should be zipped and uploaded with it. It also means only a handful of common Linux executables are available. You can find more about the runtime [here](/worker/reference/environment). The best way to make sure your worker will run is to create a directory for it and as you add dependencies, add those files to the directory and import them from that directory.

Here's a pretty basic worker script:

{% highlight ruby %}
require 'iron_worker'
require 'json'

class FibonacciWorker < IronWorker::Base

  attr_accessor :max

  def run
    values = Array.new
    num1 = 0
    num2 = 0
    nextNum = 1
    while nextNum < max
      num1 = num2
      num2 = nextNum
      nextNum = num1 + num2
      values << num2
    end
    log "MAGICALSTDOUTSEPARATOR#{values.to_json}MAGICALSTDOUTSEPARATOR"
  end
end
{% endhighlight %}

As you can see, that script calculates the Fibonacci sequence up to a maximum number. The worker finishes by outputting a JSON-encoded array of the Fibonacci sequence to STDOUT, surrounded by <span class="fixed-width">MAGICALSTDOUTSEPARATOR</span>. The reasons for this will be explained at the end.

Save that script to a file ("fibonacci.<span class="language extension">rb</span>", for example), and we'll walk through testing your worker.

### Testing Your Worker

Testing your workers on your local machine will help you avoid some errors when you upload them to the cloud. To test your worker, you just need to write a script that will execute it.

The first thing we need to do is instantiate the IronWorker library. This is done as follows:

{% highlight ruby %}
config_data = YAML.load_file('config.yml')

IronWorker.configure do |config|
  config.token = config_data["iron_worker"]["token"]
  config.project_id = config_data["iron_worker"]["project_id"]
end
{% endhighlight %}

This just pulls your IronWorker credentials from a YAML configuration file to instantiate the library. The config.yml file looks like this:

{% highlight yaml %}
iron_worker:
    token: INSERT TOKEN HERE
    project_id: INSERT PROJECT_ID HERE
{% endhighlight %}

You can find your <span class="fixed-width">project_id</span> and <span class="fixed-width">token</span> on [your HUD](https://hud.iron.io). Just log in, and you'll find the <span class="fixed-width">token</span> under "[API Tokens](https://hud.iron.io/tokens)" on your account page. The <span class="fixed-width">project_id</span> is found on the Projects page.

You can also simply insert your configuration values, though it's not recommended (nobody likes having their credentials accidentally end up in a repository). Here's how that would look:

{% highlight ruby %}
IronWorker.configure do |config|
  config.token = INSERT TOKEN HERE
  config.project_id = INSERT PROJECT_ID HERE
end
{% endhighlight %}

Now that we have the library configured we can run our code. Here's how:

{% highlight ruby %}
worker = FibonacciWorker.new
worker.max = 1000
worker.run_local
{% endhighlight %}

We just instantiate a new worker from our script, set its <span class="fixed-width">max</span> value, and call <span class="fixed-width">run_local</span> on it.

Here's the entire script:

{% highlight ruby %}
require 'iron_worker'
require_relative 'fibonacci.rb'

IronWorker.configure do |config|
  config.token = 'INSERT TOKEN HERE'
  config.project_id = 'INSERT PROJECT_ID HERE'
end

worker = FibonacciWorker.new
worker.max = 1000
worker.run_local
{% endhighlight %}

To run, just save the script as "run.<span class="language extension">rb</span>" in the same directory as fibonacci.<span class="language extension">rb</span>, then call <span class="fixed-width"><span class="language command">ruby</span> run.<span class="language extension">rb</span></span>.

## Queuing Your Worker

Queuing the worker to run on Iron's infrastructure is trivial, once the worker is running on your machine. It consists of changing a single line of our <span class="fixed-width">run.<span class="language extension">rb</span></span> script:

{% highlight ruby %}
require 'iron_worker'
require_relative 'fibonacci.rb'

IronWorker.configure do |config|
  config.token = 'INSERT TOKEN HERE'
  config.project_id = 'INSERT PROJECT_ID HERE'
end

worker = FibonacciWorker.new
worker.max = 1000
#worker.run_local
puts "#{worker.queue}"
{% endhighlight %}

The output is the response, containing relevant information on the task. You should hang on to that (sessions, cookies, database, memcached... whatever floats your boat for data retention) to check how the task is progressing (which we'll cover in the next part).

The script will upload your worker (if it has changed) and queue up a task, then print out the task information so you can check on it. 

## Checking the Status of Your Worker

Now that we've got our code on IronWorker and we've got it running, it would help to know the status of our worker. Has it finished that job yet? Fortunately, there are two simple ways to do this.

The first way to check the status of the worker can only be used when you have access to the <span class="fixed-width">worker</span> variable that queued the task. Here's a modification of <span class="fixed-width">run.<span class="language extension">rb</span></span> that prints out the status of the task, instead of the response to the queuing operation:

{% highlight ruby %}
require 'iron_worker'
require_relative 'fibonacci.rb'

IronWorker.configure do |config|
  config.token = 'INSERT TOKEN HERE'
  config.project_id = 'INSERT PROJECT_ID HERE'
end

worker = FibonacciWorker.new
worker.max = 1000
worker.queue
puts "Worker is #{worker.status['status']}"
{% endhighlight %}

You can save that script as "inline-status.<span class="language extension">rb</span>" and run it with "<span class="fixed-width"><span class="language command">ruby</span> inline-status.<span class="language extension">rb</span></span>".

Of course, in some situations, you'll have cause to check a task's status entirely independent from queuing it, meaning you won't have access to the variable you used to queue it. In these cases, you can use the task ID to check the status of the task.

You can get the task ID from the output of run.<span class="language extension">rb</span>. To make it easier, we'll modify run.<span class="language extension">rb</span> to return only the task ID:

{% highlight ruby %}
require 'iron_worker'
require_relative 'fibonacci.rb'

IronWorker.configure do |config|
  config.token = 'INSERT TOKEN HERE'
  config.project_id = 'INSERT PROJECT_ID HERE'
end

worker = FibonacciWorker.new
worker.max = 1000
worker.queue
puts "#{worker.task_id}"
{% endhighlight %}

Save this modified run.<span class="language extension">rb</span> and run it to get the task ID.

Now that we have the task ID, it's time to get the status of the task. The library provides a handy call for this:

{% highlight ruby %}
task = IronWorker.service.status(TASK_ID)
{% endhighlight %}

Here's a script that accepts the task ID through a command line argument and outputs its status:

{% highlight ruby %}
require 'iron_worker'

IronWorker.configure do |config|
  config.token = 'INSERT TOKEN HERE'
  config.project_id = 'INSERT PROJECT_ID HERE'
end

puts "Worker is #{IronWorker.service.status(ARGV.first)["status"]}"
{% endhighlight %}

Again, just insert your auth credentials in the configure block, then call the script with <span class="fixed-width"><span class="language command">ruby</span> run.<span class="language extension">rb</span> TASK_ID</span>", substituting in a task ID for TASK_ID. The output will be a sentence telling you the status of the task.

But how do we get the sequence we generated? Well, remember when we printed it surrounded by <span class="fixed-width">MAGICALSTDOUTSEPARATOR</span>? We're going to fetch the log, find the sequence, and print it. We needed to surround it with a unique string in case something else decided to print to STDOUT, dirtying our logs.

### Retrieving Your Logs

Getting the log is pretty easy. If you have access to that original <span class="fixed-width">worker</span> variable, like in inline-status.<span class="language extension">rb</span>, you can just use the following:

{% highlight ruby %}
log = worker.get_log
{% endhighlight %}

If you need to separate queuing the worker and getting its log, as is often the case, you can get the log through the task ID, just like you did with the worker's status:

{% highlight ruby %}
log = IronWorker.service.log(TASK_ID)
{% endhighlight %}

Here's a script that accepts the task ID through a command line argument and outputs the Fibonacci sequence the worker came up with. You'll notice we're just splitting out the <span class="fixed-width">MAGICALSTDOUTSEPARATOR</span> strings, so we don't get any actual log information in the middle of our sequence.

{% highlight ruby %}
require 'iron_worker'

IronWorker.configure do |config|
  config.token = 'INSERT TOKEN HERE'
  config.project_id = 'INSERT PROJECT_ID HERE'
end

log = IronWorker.service.log(ARGV.first).split("MAGICALSTDOUTSEPARATOR")
puts log[1].inspect
{% endhighlight %}

Save the script as "sequence.<span class="language extension">rb</span>" and run <span class="fixed-width"><span class="language command">ruby</span> sequence.<span class="language extension">rb</span> TASK_ID"</span>, again substituting a task ID, and you'll see the Fibonacci sequence printed out.
