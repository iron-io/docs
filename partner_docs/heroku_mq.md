IronMQ is a massively scalable, hosted message queue. It makes managing data and event flow within your application simple, with support for multiple clients and a managed environment that frees you from needing to manage servers, allowing you to focus on your application instead.

## Getting Started

It's quick and easy to get IronMQ set up and running on Heroku. You just need to install the IronMQ addon; you can do this with the `heroku` command:

    :::term
    $ heroku addons:add iron_mq:developer
    -----> Adding iron_mq to cold-winter-5462... done, v10 (free)

This will add the developer level addon for IronMQ, which will let you test the addon and play around a bit. There are [other levels](http://addons.heroku.com/iron_mq) of the addon, as well.

## Language Support

IronMQ has clients for [a lot of languages](http://dev.iron.io/mq/libraries/), and you can always use [the REST API](http://dev.iron.io/mq/reference/api/) (or write your own!). This means your existing Heroku stack should work without any changes.

## Ruby

We're going to need to install the Ruby gem, for development purposes:

    :::term
    $ gem install iron_mq
    Fetching: iron_mq-3.0.2.gem (100%)
    Successfully installed iron_mq-3.0.2

If you’re building for a Rails application or anything that uses Bundler, add the following to your Gemfile:

    :::ruby
    gem 'iron_mq'

Now you have a simple helper that allows you to interact with your queues:

    :::ruby
    # Create an IronMQ::Client object
    @ironmq = IronMQ::Client.new()

    # Get a queue (if it doesn't exist, it will be created when you first post a message)
    @queue = @ironmq.queue("my_queue")

    # Post a message
    @queue.post("hello world!")

    # Get a message
    msg = @queue.get()
    p msg

    # Delete a message (you must delete a message when you're done with it or it will go back on the queue after a timeout)
    msg.delete # or @queue.delete(msg.id)

## Java

We're going to need to install [the jar file](https://github.com/iron-io/iron_mq_java/downloads) for the official IronMQ Java library. If you're using Maven, you can also add the `http://iron-io.github.com/maven/repository` repository as a dependency.

Once you have the jar file added as a dependency, you have a simple wrapper that allows you to interact with your queues:

    :::java
    // Get your Iron.io credentials from the environment
    Map<String, String> env = System.getenv();

    // Create a Client object
    Client client = new Client(env.get("IRON_MQ_PROJECT_ID"), env.get("IRON_MQ_TOKEN"), Cloud.IronAWSUSEast);

    // Get a queue (if it doesn't exist, it will be created when you first post a message)
    Queue queue = client.queue("my_queue");

    // Post a message
    queue.Push("hello world!");

    // Get a message
    Message msg = queue.get();
    System.out.println(msg.getBody());

    // Delete a message (you must delete a message when you're done with it or it will go back on the queue after a timeout)
    queue.deleteMessage(msg);

## Python

We're going to have to install the [Python client library](https://github.com/iron-io/iron_mq_python) for IronMQ. You can do this using `pip install iron_mq` or `easy_install iron_mq`.

Once the package is installed, you have a simple wrapper that allows you to interact with your queues:

    :::python
    # Create an IronMQ client object
    mq = IronMQ()

    # Get a queue (if it doesn't exist, it will be created when you first post a message)
    queue = mq.queue("my_queue")

    # Post a message
    queue.post("hello world!")

    # Get a message
    msg = queue.get()
    print msg

    # Delete a message (you must delete a message when you're done with it or it will go back on the queue after a timeout)
    queue.delete(msg["messages"][0]["id"])


## Clojure

We're going to need to add the [IronMQ Clojure client](https://github.com/iron-io/iron_mq_clojure) to your project.clj:

    :::clojure
    [iron_mq_clojure "1.0.3"]

Use these to create a client that allows you to interact with your queues:

    :::clojure
    (require '[iron-mq-clojure.client :as mq])

    (def client (mq/create-client (System/getenv "IRON_MQ_TOKEN") (System/getenv "IRON_MQ_PROJECT_ID")))

    ; Post a message
    (mq/post-message client "my_queue" "Hello world!")

    ; Get a message
    (let [msg (mq/get-message client "my_queue")]
      (println (get msg "body"))

      ; Delete a message (you must delete a message when you're done with it or it will go back on the queue after a timeout)
      (mq/delete-message client "my_queue" msg))

## Node.js

We're going to need to the [IronMQ Node.js client](https://github.com/iron-io/iron_mq_node) to interact with our queues. You can get it using `npm install iron_mq` or by downloading the source from Github (though you'll need [iron_core_node](https://github.com/iron-io/iron_core_node), too).

Once that's done, you can require it to get a simple wrapper for the API:

	:::javascript
	var iron_mq = require("iron_mq");

	var client = new iron_mq.Client({"queue_name": "my_queue"});

	// Post a message
	client.post("test message", function(error, body) {
	  console.log(body);
	  console.log(error);
	});

	// Get a message
	client.get({}, function(error, body) {
	  console.log(error);
	  console.log(body);
	  if(error == null) {
	    // Delete a message
	    client.del(body["id"], function(error, body) {
	      console.log(error);
	      console.log(body);
	    });
	  }
	});

## Next Steps

To get into more advanced uses of IronMQ, you may want to check out the
[API docs](http://dev.iron.io/mq/reference/api/) or check out an example Sinatra application that ties in [IronWorker](http://addons.heroku.com/iron_worker)
at [https://github.com/iron-io/heroku_sinatra_example](https://github.com/iron-io/heroku_sinatra_example).

## Support

Issues should get logged with [Heroku Support](https://support.heroku.com). You're also welcome to stop by the
[Iron.io support chat room](http://hud.iron.io/users/support) and chat with Iron.io staff about issues. You can also find more
resources at the [Iron.io Dev Center](http://dev.iron.io).
