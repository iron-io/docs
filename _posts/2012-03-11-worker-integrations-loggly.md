---
permalink: /worker/articles/integrations/loggly
title: Logging from your workers to Loggly
categories:
 - worker
 - articles
 - integrations
breadcrumbs:
  - ['Articles', '/articles']
  - ['Integrations', '/integrations']
  - ['Loggly', '/loggly']
tags:
 - loggly
 - integrations
 - logging
languages:
- name: 'ruby'
  command: 'ruby'
  extension: 'rb'
layout: default
section: worker
---

{% if page.languages %}
{% include language-switcher-head.html %}
{% endif %}

{% include language-switcher.html %}

# Logging to Loggly

[Loggly](http://www.loggly.com) provides a cloud based application intelligence solution for app developers.
Loggly indexes application log data which can be used to troubleshoot, monitor and analyze customer usage.

This tutorial shows you how to send all logs from your workers to the Loggly service.


## Step 1: Signup for a Loggly Account

Visit [Loggly](http://www.loggly.com) to sign up for a free account.




## Step 2: Include the Loggly Library

<div class="ruby">
{% highlight ruby %}
merge_gem 'logglier'
{% endhighlight %}
</div>



## Step 3: Setup the connection

<div class="ruby">
{% highlight ruby %}
log = Logglier.new("https://logs.loggly.com/inputs/#{loggly_key}")
{% endhighlight %}
</div>



## Step 4: Use the connection to log to Loggly

<div class="ruby">
{% highlight ruby %}
log.info("Logging from your worker to Loggly!")
{% endhighlight %}
</div>



## That's it! Here's the entire worker.

<div class="ruby">
{% highlight ruby %}
class LogglyWorker < IronWorker::Base
  merge_gem 'logglier'

  attr_accessor :loggly_key

  def run
    puts "I'm going to start logging to loggly... right... now!"
    log = Logglier.new("https://logs.loggly.com/inputs/#{loggly_key}")

    log.info("Logging from your worker to Loggly!")
  end
end
{% endhighlight %}
</div>



## And a sample runner file you can run to call the worker

<div class="ruby">
{% highlight ruby %}
require 'iron_worker'
require "yaml"

load "loggly_worker.rb"

IronWorker.configure do |config|
  config.token = TOKEN
  config.project_id = PROJECT_ID
end

worker = LogglyWorker.new
worker.loggly_key = LOGGLY_KEY
worker.queue
{% endhighlight %}
</div>