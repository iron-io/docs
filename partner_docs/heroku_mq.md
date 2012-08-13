IronMQ is a massively scalable messaging queue that makes it easy for you to keep a resilient and synchronised message-passing system in the cloud, between any number of clients, without server set-up or maintenance. It makes managing data and event flow within your application simple.

## Getting Started

It's quick and easy to get IronMQ set up and running on Heroku. You just need to install the IronMQ add-on for Heroku. You can do this with the `heroku` command:

    :::term
    $ heroku addons:add iron_mq:rust
    -----> Adding iron_mq to cold-winter-5462... done, v10 (free)

This will add the starter level add-on for IronMQ, which will let you test the add-on and play around a bit.
There are [other levels](http://addons.heroku.com/iron_mq) of the add-on, as well.

## Configuration

IronMQ has clients for [a lot of languages](http://dev.iron.io/mq/libraries/), and you can always use
[the REST API](http://dev.iron.io/mq/reference/api/) (or write your own!). This means your existing
Heroku stack should work without any changes. The remainder of this article will be using the Ruby library,
but all of the libraries have analagous calls (that should be well-documented).

We're going to need to install the Ruby gem, for development purposes:

    :::term
    $ gem install iron_mq
    Fetching: iron_mq-1.4.0.gem (100%)
    Successfully installed iron_mq-1.4.0

If you’re building for a Rails application or anything that uses Bundler, add the following to your Gemfile:

    :::ruby
    gem 'iron_mq'

## Usage

This is for the Ruby client, but all clients have the same operations. See the docs for your particular language.

    :::ruby
    # Create an IronMQ::Client object
    @ironmq = IronMQ::Client.new()

    # Get a queue (if it doesn't exist, it will be created when you first post a message
    @queue = @ironmq.queue("my_queue")

    # Post a message
    @queue.post("hello world!")

    # Get a message
    msg = @queue.get()
    p msg

    # Delete a message (you must delete a message when you're done with it or it will go back on the queue after a timeout
    msg.delete # or @queue.delete(msg.id)


### Next Steps

To get into more advanced uses of it, you may want to check out the
[API docs](http://dev.iron.io/mq/reference/api/) or check out an example Sinatra application
that ties in [IronWorker](http://addons.heroku.com/iron_worker)
at [](https://github.com/iron-io/heroku_sinatra_example).

### Support

Issues should get logged with [Heroku Support](https://support.heroku.com). You're also welcome to stop by the
[Iron.io support chat room](http://get.iron.io/chat) and chat with Iron.io staff about issues. You can also find more
resources at the [Iron.io Dev Center](http://dev.iron.io).
