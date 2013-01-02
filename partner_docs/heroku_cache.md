IronCache is an elastic, scalable, highly available, persistent and secure cloud based key/value store. IronCache
grows with you on demand, no eviction (only expiration) and you'll never need to rebuild your cache. Great for
persistent and reliable incrementors/counters too. Access via a super easy to use REST
interface or memcached interface.  Can be used for short term persistence and long term persistence without worrying
about losing data.

You also have full visibility into your caches and usage in the Iron.io user interface:

![Cache List](https://raw.github.com/iron-io/docs/gh-pages/partner_docs/cache_page.png)

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
[the REST API](http://dev.iron.io/cache/reference/api/) (or write your own!). This means your existing
Heroku stack should work without any changes.

## Ruby

First, install the Ruby gem:

    :::term
    $ gem install iron_cache
    Fetching: iron_cache-1.4.0.gem (100%)
    Successfully installed iron_cache-1.4.0

If you’re building for a Rails application or anything that uses Bundler, add the following to your Gemfile:

    :::ruby
    gem 'iron_cache'

### Ruby Usage

This is for the Ruby client, but all clients have the same operations. See the docs for your particular language.

    :::ruby
    require 'iron_cache'

    # Create an IronCache::Client object
    @ironcache = IronCache::Client.new

    # Get a cache (if it doesn't exist, it will be created when you first post an item
    @cache = @ironcache.cache("my_cache")

    # Put an item
    @cache.put("mykey", "hello world!")

    # Get an item
    item = @cache.get("mykey")
    p item.value

    # Delete an item
    item.delete # or @cache.delete("mykey")

    # Increment an item in the cache
    item = @cache.increment("mycounter", 1)
    p item

## Python

### Install with pip/easy_install

iron_cache_python is available in the Python Package Index as "iron_cache". This means you can run `pip install iron_cache`
or `easy_install iron_cache` from your command line to download iron_cache_python and all its dependencies.

### Install From Source

You can also [download the source from Github](https://github.com/iron-io/iron_cache_python). Once you have the source, you can run python setup.py install
from the directory containing the source code to install iron_cache_python.

Note: You will need the iron_core_python module for iron_cache_python to function.

### Python Usage

    :::python
    from iron_cache import *

    # Create an client object
    cache = IronCache()

    # Put an item
    cache.put(cache="test_cache", key="mykey", value="Hello IronCache!")

    # Get an item
    item = cache.get(cache="test_cache", key="mykey")
    print item.value

    # Delete an item
    cache.delete(cache="test_cache", key="mykey")

    # Increment an item in the cache
    cache.increment(cache="test_cache", key="mykey", amount=10)

## PHP

### Install

Download iron_cache.phar from from [Github](https://github.com/iron-io/iron_cache_php) and require it in your code:

    :::php
    <?php
    require_once "phar://iron_cache.phar";

### PHP Usage

    :::php
    <?php
    require_once "phar://iron_cache.phar";

    # Create a client object
    $cache = new IronCache();
    $cache->setCacheName('my_cache');

    # Put an item
    $cache->put("mykey", "hello world!");

    # Get an item
    $item = $cache->get("mykey");
    echo $item->value

    # Delete a message (you must delete a message when you're done with it or it will go back on the queue after a timeout
    $cache->delete("mykey");

    # Increment an item in the cache
    $cache->increment("mykey", 1);


## Next Steps

You can find full documentation at the [Iron.io Dev Center](http://dev.iron.io/cache/).

## Support

Issues should get logged with [Heroku Support](https://support.heroku.com). You're also welcome to stop by the
[Iron.io support chat room](http://get.iron.io/chat) and chat with Iron.io staff about issues. You can also find more
resources at the [Iron.io Dev Center](http://dev.iron.io).
