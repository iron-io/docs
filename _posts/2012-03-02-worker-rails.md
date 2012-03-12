
---
permalink: /worker/articles/platforms/heroku
title: IronWorker and Rails
categories:
 - worker
 - languages
 - rails
breadcrumbs:
  - ['Articles', '/articles']
  - ['Languages', '/langauges']
  - ['Heroku', '/rails']
tags:
  - rails
  - languages
  - ruby
  - frameworks
layout: default
section: worker
---

# IronWorker and Ruby on Rails

Here's a simple example of how to create and run workers in **Ruby on Rails**.

If you haven't already, please start with our [IronWorker in 5 minutes](https://sites.google.com/site/ironiodocs/worker/ruby/getting-started/ironworker-in-5-minutes) article, which uses just the Ruby language. 

This example takes it the next step to use it within a **Rails environment**.

## Confirm Ruby 1.9 or above.

IronWorker uses Ruby 1.9 or above and so if you're still on Ruby 1.8.7, you'll need to upgrade your Ruby version.

## Configure IronWorker Gem

### Rails 3

For **Rails 3.X**, add the following to your Gemfile:

<div class="grey-box fixed-width">
    gem 'iron_worker'
</div>

### Rails 2

For **Rails 2.X**, add the following to your <span class="fixed-width">environment.rb</span> file:

<div class="grey-box fixed-width">
    config.gem 'iron_worker'
</div>

## Configure IronWorker Tokens

IronWorker uses OAuth2 for authentication, making use of a token and a project_ID.

Create a file at <span class="fixed-width">config/initializers/iron_worker_worker.rb</span> and put the following configuration block into it:

Use this config block for **>v2.x** of the iron_worker gem

{% highlight ruby %}
# Use this for iron_worker gem v2.X
IronWorker.configure do |config|
  config.token = 'TOKEN'
  config.project_id = 'PROJECT_ID'
end
{% endhighlight %}

## Configure IronWorker Worker Path

**NOTE: This is only required in Rails < 3.**

And finally, add the workers directory to your load paths. In environment. rb:

{% highlight ruby %}
config.load_paths += %W( #{RAILS_ROOT}/app/workers )
{% endhighlight %}

## Create a Worker

Now that things are configured, let's queue up a worker from an action.

First, create a workers directory at <span class="fixed-width">#{Rails.root}/app/workers</span>.

Now create a file called <span class="fixed-width">my_worker.rb</span> in that directory (<span class="fixed-width">/app/workers/my_worker.rb</span>) and put the following code in it:

{% highlight ruby %}
class MyWorker < IronWorker::Base

  attr_accessor :x

  # The run method is what IronWorker calls to run your worker
  def run
    x.times do |n|
      log "Hello, I've done something #{n.to_s} times!"
      sleep 2
    end
  end

end
{% endhighlight %}

## Queue up the Worker in the Cloud 

Let's say we have a controller called <span class="fixed-width">WelcomeController</span>, now let's just add the following to the <span class="fixed-width">index</span> action to keep it simple.

{% highlight ruby %}
def index
  worker = MyWorker.new
  worker.x = 5
  worker.queue
end
{% endhighlight %}

Now just visit your welcome controller, eg: http://localhost:3000/welcome and this job will be queued up!

You can visit your IronWorker dashboard at [hud.iron.io](https://hud.iron.io/tq) to get the status of the job or make use of the <span class="fixed-width">status</span> method to check in on it via your code.

To run jobs with a higher priority, just pass in a priority when you queue them.

{% highlight ruby %}
worker.queue(:priority=>1)

worker.queue(:priority=>2)
{% endhighlight %}

Check out this [github repository for a full Rails example](https://github.com/iron-io/simple_worker_rails_example).
