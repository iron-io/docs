---
title: Writing Workers in Node.js
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['Node.js', '/nodejs']
---

# Writing Workers in Node.js

## Quick Start

### Get the `iron_worker_ng` gem.

There isn't a library for interacting with the IronWorker API written for 
Node.js yet. While running workers written in Node.js is supported, you have to 
upload them using another language's library and queue tasks using our simple 
HTTP [API](/worker/reference/api) or another language's library. We're using the 
`iron_worker_ng` Ruby library in these examples. You can download it off 
[Github](https://github.com/iron-io/iron_worker_ruby_ng) or install it using 
`gem install iron_worker_ng`. **Note:** You'll need to have Ruby installed to 
use the gem.

### Write your Node.js worker.

{% highlight js %}
console.log("Hello from Node.js");
{% endhighlight %}

### Create a script to upload the worker.
{% highlight ruby %}
require 'iron_worker_ng'

client = IronWorkerNG::Client.new(:token => "TOKEN", :project_id => "PROJECT_ID")
code = IronWorkerNG::Code::Node.new(:name => "NodeWorker", :exec => 'worker.js')
client.codes.create(code)
{% endhighlight %}

### Queue a task to the new worker.
{% highlight ruby %}
require 'iron_worker_ng'

client = IronWorkerNG::Client.new(:token => "TOKEN", :project_id => "PROJECT_ID")
task_id = client.tasks.create('NodeWorker')
{% endhighlight %}

## Deep Dive

### Payload Example

Retrieving the payload in Node.js is the same as it is on any other language. 
Retrieve the `-payload` argument passed to the script, load that file, and 
parse it as JSON.

{% highlight js %}
var fs = require('fs');
var payloadIndex = -1;

process.argv.forEach(function(val, index, array) {
        if(val == "-payload") {
                payloadIndex = index + 1;
        }
});

if(payloadIndex == -1) {
        console.error("No payload argument");
        process.exit(1);
}

if(payloadIndex >= process.argv.length) {
        console.error("No payload value");
        process.exit(1);
}

fs.readFile(process.argv[payloadIndex], 'ascii', function(err, data) {
        if(err) {
                console.error("Could not open file: %s", err);
                process.exit(1);
        }
        console.log(JSON.parse(data));
});
{% endhighlight %}
