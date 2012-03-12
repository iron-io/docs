---
permalink: /worker/articles/integrations/pagerduty
title: Integrating with PagerDuty
categories:
 - worker
 - articles
 - integrations
breadcrumbs:
  - ['Articles', '/articles']
  - ['Integrations', '/integrations']
  - ['PagerDuty', '/pagerduty']
tags:
 - integrations
 - error handling
languages:
- name: 'ruby'
  command: 'ruby'
  extension: 'rb'
layout: default
section: worker
---

# Integrating with PagerDuty

{% if page.languages %}
{% include language-switcher-head.html %}
{% endif %}

[PagerDuty](http://www.pagerduty.com) schedules on-calls and adds phone and SMS to your existing IT monitoring tools.

This tutorial shows how you can trigger PagerDuty alerts when your workers encounter errors.

{% include language-switcher.html %}


## Step 1: Sign up for PagerDuty

Visit [PagerDuty](http://www.pagerduty.com) and sign up for a free account. You'll need a PagerDuty service API key
for your worker to communicate with PagerDuty. To get this, create a new "Service" of type "Generic API system".


## Step 2: Generate the JSON payload

This is the JSON payload you will send to PagerDuty. Replace the SERVICE_KEY with the Generic API key you get from Step 1 above.

<div class="ruby">
{% highlight ruby %}
payload = {
  "service_key" => SERVICE_KEY,
  "event_type" => "trigger",
  "description" => "#{ex} - #{ex.backtrace}",
}.to_json
{% endhighlight %}
</div>



## Step 3: Post to the PagerDuty API

<div class="ruby">
{% highlight ruby %}
url = 'https://events.pagerduty.com/generic/2010-04-15/create_event.json'
resp = HTTParty.post(url, {:body => payload})
{% endhighlight %}
</div>



## Step 4: Wrap your worker in error catching blocks

Any errors inside your worker will be caught, sent to PagerDuty, and re-raised so that the worker fails. If you don't re-raise
the error, the worker will look successful at Iron.io but an error occurred.

<div class="ruby">
{% highlight ruby %}
def run
  begin
    # Your worker code in here
  rescue => ex
    trigger_alert(ex)
    raise ex
  end
end
{% endhighlight %}
</div>



## That's it! Here's the entire worker.

<div class="ruby">
{% highlight ruby %}
class PagerdutyWorker < IronWorker::Base
  merge_gem 'httparty'

  attr_accessor :api_key

  def run
    begin
      # Your worker code in here

    rescue => ex
      trigger_alert(ex)
      raise ex
    end
  end


  # Method to hit the PagerDuty "Generic API" trigger
  def trigger_alert(ex)
    payload = {
      "service_key" => api_key,
      "event_type" => "trigger",
      "description" => "#{ex} - #{ex.backtrace}",
    }.to_json
    url = 'https://events.pagerduty.com/generic/2010-04-15/create_event.json'
    resp = HTTParty.post(url, {:body => payload})
  end
end
{% endhighlight %}
</div>



## And a sample runner file you can run to call the worker

<div class="ruby">
{% highlight ruby %}
require 'iron_worker'

load "pagerduty_worker.rb"

IronWorker.configure do |config|
  config.token = TOKEN
  config.project_id = PROJECT_ID
end

worker = PagerdutyWorker.new
worker.api_key = YOUR_PAGERDUTY_API_KEY
worker.queue
{% endhighlight %}
</div>