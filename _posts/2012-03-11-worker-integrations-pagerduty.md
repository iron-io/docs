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
languages:
- name: 'ruby'
  command: 'ruby'
  extension: 'rb'
- name: 'php'
  command: 'php'
  extension: 'php'
layout: default
section: worker
summary: "How to trigger [PagerDuty](http://www.pagerduty.com) alerts from your workers."
---

# Triggering PagerDuty

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
<div class="php">
{% highlight php %}
<?php
  $data = array(
      'service_key' => $api_key,
      "event_type" => "trigger",
      "description" => $e->__toString()
  );
{% endhighlight %}
</div>



## Step 3: Post to the PagerDuty API

<div class="ruby">
{% highlight ruby %}
url = 'https://events.pagerduty.com/generic/2010-04-15/create_event.json'
resp = HTTParty.post(url, {:body => payload})
{% endhighlight %}
</div>
<div class="php">
{% highlight php %}
<?php
  $ctx = stream_context_create(array(
      'method' => 'POST',
      'content' => json_encode($data)
  ));
  file_get_contents('https://events.pagerduty.com/generic/2010-04-15/create_event.json', null, $ctx);
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
<div class="php">
{% highlight php %}
<?php
try
{
    //your worker code here
}
catch (Exception $e)
{
    trigger_alert($e, $payload['API_KEY']);
}
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
<div class="php">
{% highlight php %}
<?php
function trigger_alert(Exception $e, $api_key)
{
    $data = array(
        'service_key' => $api_key,
        "event_type" => "trigger",
        "description" => $e->__toString()
    );
    $ctx = stream_context_create(array(
        'method' => 'POST',
        'content' => json_encode($data)
    ));
    file_get_contents('https://events.pagerduty.com/generic/2010-04-15/create_event.json', null, $ctx);
}

$payload = getPayload();
try
{
    //your worker code here
}
catch (Exception $e)
{
    trigger_alert($e, $payload['API_KEY']);
}
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
<div class="php">
{% highlight php %}
<?php
include("../IronWorker.class.php");

$name = "pagerDuty-php";

$iw = new IronWorker('config.ini');
$iw->debug_enabled = true;

$zipName = "code/$name.zip";

$zipFile = IronWorker::zipDirectory(dirname(__FILE__)."/workers/pager_duty", $zipName, true);

$res = $iw->postCode('pagerDuty.php', $zipName, $name);

$payload = array(
    'API_KEY' => PAGERDUTY_API_KEY
);

$iw->postTask($name, $payload);
{% endhighlight %}
</div>
