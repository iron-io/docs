---
title: Writing Workers in Node.js
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['Node.js', '/nodejs']
---

# Writing Workers in Node.js

[Node.js](http://www.nodejs.org) is an evented language that brings the well-known 
Javascript language to server-side development, using Google's [V8](http://code.google.com/p/v8/) 
runtime. The evented model of programming lends itself nicely to the asynchronous 
nature of workers, making it a natural fit for IronWorker.

## Quick Start

### Get the `iron_worker_ng` gem.

Node.js is only currently supported at the [Convenient](/worker/languages) 
level; this means that there isn't a native Node.js library written yet, 
but some of the other libraries have convenience functions specifically built 
for Node.js workers. We're working on a Node.js library, but in the meantime, 
you have two options: use another client library or interact with the [API](/worker/reference/api) 
manually. We're going to show how to to upload your code using the `iron_worker_ng` 
Ruby gem and how to queue tasks using raw API calls.

To get the `iron_worker_ng` gem, make sure you have Ruby installed and run the 
following command:

{% highlight bash %}
gem install iron_worker_ng
{% endhighlight %}

### Write your Node.js worker.

{% highlight js %}
console.log("Hello World from Node.js.");
{% endhighlight %}

### Create a script to upload the worker.

Insert your token, project ID, and the path to your Node.js worker into the 
following script and save it as something like "upload.rb":

{% highlight ruby %}
require 'iron_worker_ng'

client = IronWorkerNG::Client.new(:token => "TOKEN", :project_id => "PROJECT_ID")
code = IronWorkerNG::Code::Node.new(:name => "NodeWorker", :exec => 'PATH/TO/WORKER.js')
client.codes.create(code)
{% endhighlight %}

Run `ruby upload.rb` (or whatever you saved the script as) and it will upload 
your code to the IronWorker cloud. You can then queue tasks against the code 
from whatever client you want, including raw API calls (which we'll show 
below).

### Queue a task to the new worker.

Once your code has been uploaded, it's easy to queue a task to it. It's a single, 
authenticated [POST request](/worker/reference/api/#queue_a_task) with a JSON 
object. The example below queues up a task for your NodeWorker. Just insert your 
project ID and token at the bottom (that third argument is the name of your worker).

{% highlight js %}
var https = require("https");

function queue_task(project, token, code_name) {
  // Build the payload
  var payload = {
    "arg1": "Test",
    "another_arg": ["apples", "oranges"]
  };
  
  var req_json = {
    "tasks": [{
      "code_name": code_name,
      "payload": JSON.stringify(payload)
    }]
  }

  // Convert the JSON data
  var req_data = JSON.stringify(req_json);

  // Create the request headers
  var headers = {
    'Authorization': 'OAuth ' + token,
    'Content-Type': "application/json"
  };

  // Build config object for https.request
  var endpoint = {
    "host": "worker-aws-us-east-1.iron.io",
    "port": 443,
    "path": "/2/projects/" + project + "/tasks",
    "method": "POST",
    "headers": headers
  };

  var post_req = https.request(endpoint, function(res) {
    console.log("statusCode: ", res.statusCode);

    res.on('data', function(d) {
      process.stdout.write(d);
    });
  });
  
  post_req.write(req_data)
  post_req.end();

  post_req.on('error', function(e) {
    console.error(e);
  });
}

queue_task("INSERT PROJECT ID", "INSERT TOKEN", "NodeWorker");
{% endhighlight %}

Save this as "enqueue.js" and use `node enqueue.js` to queue up the task to your 
worker. You should got a response similar to this:

{% highlight js %}
statusCode:  200
{"msg":"Queued up","status_code":200,"tasks":[{"id":"4f9ecdd01bab47589b02a097"}]}
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
