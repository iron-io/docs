IronCache is an elastic cache and key/value data store designed for sharing state, passing data, and coordinating activity between concurrent processes.

## Getting Started

It's quick and easy to get IronCache set up and running on Heroku. You just need to install the IronCache add-on for Heroku.
You can do this with the `heroku` command:

    :::term
    $ heroku addons:add iron_cache:rust
    -----> Adding iron_cache to cold-winter-5462... done, v10 (free)

This will add the starter level add-on for IronCache, which will let you test the add-on and play around a bit.
There are [other levels](http://addons.heroku.com/iron_cache) of the add-on, as well.

## Configuration

IronCache has clients for [a lot of languages](http://dev.iron.io/cache/reference/libraries/), and you can always use
[the REST API](http://dev.iron.io/mq/reference/api/) (or write your own!). This means your existing
Heroku stack should work without any changes. The remainder of this article will be using the Ruby library,
but all of the libraries have analagous calls (that should be well-documented).

We're going to need to install the Ruby gem, for development purposes:

    :::term
    $ gem install iron_cache
    Fetching: iron_cache-1.4.0.gem (100%)
    Successfully installed iron_cache-1.4.0

If you’re building for a Rails application or anything that uses Bundler, add the following to your Gemfile:

    :::ruby
    gem 'iron_cache'

## Usage

This is for the Ruby client, but all clients have the same operations. See the docs for your particular language.

    :::ruby
    # Create an IronCache::Client object
    @ironcache = IronCache::Client.new

    # Get a cache (if it doesn't exist, it will be created when you first post an item
    @cache = @ironcache.cache("my_cache")

    # Post a message
    @cache.put("mykey", "hello world!")

    # Get a message
    item = @cache.get("mykey")
    p item.value

    # Delete a message (you must delete a message when you're done with it or it will go back on the queue after a timeout
    item.delete # or @cache.delete("mykey")

    # Increment an item in the cache
    item = @cache.increment("mycounter", 1)
    p item


### Next Steps

You can find full documentation at the [Iron.io Dev Center](http://dev.iron.io/mq/).

### Support

Issues should get logged with [Heroku Support](https://support.heroku.com). You're also welcome to stop by the
[Iron.io support chat room](http://get.iron.io/chat) and chat with Iron.io staff about issues. You can also find more
resources at the [Iron.io Dev Center](http://dev.iron.io).
