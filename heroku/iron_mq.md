IronMQ Add-on
================

IronMQ is an elastic message queue for managing data and event flow within cloud applications and between systems. Ready to send/receive as soon as you connect. Scalable, durable, and high-performance.

Getting Started
---------------

First thing is to add the add-on to your app:

    heroku addons:add iron_mq

IronMQ Ruby Client
---------------

Install the gem:

    gem install iron_mq

Create an IronMQ client object:

    @ironmq = IronMQ::Client.new('token'=>ENV['IRON_WORKER_TOKEN'],  'project_id'=>ENV['IRON_WORKER_PROJECT_ID'])

**Push** a message on the queue:

    msg = @ironmq.messages.post("hello world!")
    p msg

**Pop** a message off the queue:

    msg = @ironmq.messages.get()
    p msg

When you pop/get a message from the queue, it will NOT be deleted. It will eventually go back onto the queue after
a timeout if you don't delete it (default timeout is 60 seconds).

**Delete** a message from the queue:

    res = msg.delete # or @ironmq.messages.delete(msg["id"])
    p res

Delete a message from the queue when you're done with it.

Here is a [full working sintatra example](https://github.com/iron-io/heroku_sinatra_example) that you can clone and push to Heroku.

Other languages
----------------

For other languages, please check out the [list of IronMQ clients](http://docs.iron.io/mq/clients).

More Info
---------

And here is our [full IronMQ documentation](http://docs.iron.io/mq).
