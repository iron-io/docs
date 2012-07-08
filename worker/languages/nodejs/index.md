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
nature of workers, making it a natural fit for IronWorker. This article will walk you through getting your Node.js workers running on IronWorker, but you should still be familiar with the [basics of IronWorker](/worker).

## Quick Start

### Get The `iron_worker_ng` Gem

We've created a [command line interface](/worker/reference/cli) to the IronWorker service that makes working with the service a lot easier and more convenient. It does, however, require you to have Ruby 1.9+ installed and to install the `iron_worker_ng` gem. Once Ruby 1.9+ is installed, you can just the following command to get the gem:

{% highlight bash %}
gem install iron_worker_ng
{% endhighlight %}

It is possible to use our [other client libraries](/worker/languages/#full_support) or even our [API](/worker/reference/api) to upload a package, but these samples will use the CLI.

### Write Your Node.js Worker

{% highlight js %}
console.log("Hello World from Node.js.");
{% endhighlight %}

### Create A .worker File

Worker files are a simple way to define your worker and its dependencies. Save the following in a file called `hello.worker`:

{% highlight ruby %}
# set the runtime language; this should be "nodejs" for Node.js workers
runtime "nodejs"
# exec is the file that will be executed when you queue a task
exec "hello_worker.js" # replace with your file
{% endhighlight %}

### Create Your Configuration File

The CLI needs a configuration file or environment variables set that tell it what your credentials are. We have some [pretty good documentation](/worker/reference/configuration) about how this works, but for simplicity's sake, just save the following as `iron.json` in the same folder as your `.worker` file:

{% highlight js %}
{
  "project_id": "INSERT YOUR PROJECT ID HERE",
  "token": "INSERT YOUR TOKEN HERE"
}
{% endhighlight %}

You should insert your [project ID](https://hud.iron.io) and [token](https://hud.iron.io/tokens) into that `iron.json` file. Then, assuming you're running the commands from within the folder, the CLI will pick up your credentials and use them automatically.

### Upload Your Worker

{% highlight bash %}
iron_worker upload hello
{% endhighlight %}

That command will read your .worker file, create your worker code package and upload it to IronWorker.  Head over to [hud.iron.io](https://hud.iron.io), click the Worker link on your projects list, then click the Tasks tab. You should see your new worker listed there with zero runs. Click on it to show the task list which will be empty, but not for long.

Let’s quickly test it by running:

    iron_worker queue hello

Now look at the task list in HUD and you should see your task show up and go from "queued" to "running" to "completed".

Now that we know it works, let’s queue up a bunch of tasks from code.

### Queue Tasks To The New Worker

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
worker. You should get a response similar to this:

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
