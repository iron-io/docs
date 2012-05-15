---
title: Setting Up Your First Cache
layout: default
section: cache
breadcrumbs:
  - ['Getting Started', '/start']
  - ['Your First Cache', '/first-cache']
languages:
  - name: 'ruby'
  - name: 'python'
  - name: 'php'
---

{% if page.languages %}
{% include language-switcher-head.html %}
{% endif %}

# Setting Up Your First Cache

{% include language-switcher.html %}

IronCache is a product that allows you to store temporary information for a 
limited amount of time, without having to worry about managing the memory or 
availability of such a store. It focuses on a [simple API](/cache/reference/api) 
and interoperability with [industry standards](/cache/code/memcached), making 
it simple to integrate into your cloud application. The [atomic operations](#incrementing) 
offered by IronCache make managing state across independent, asynchronous 
processes a simple matter.

Setting up your first cache on IronCache is easy: just insert an item into 
the non-existent cache as if it existed. IronCache will automatically create 
the cache for you.

Caches consist of items, which hold the data of the cache. Items are just a key 
and a value; the key is a string that identifies the item, the value is the 
data that item holds.

There are two main operations for caches: [storing](#storing_data) and [retrieving](#retrieving_data) 
your data. [Deleting](#deleting_data) is also supported, but optional, as items 
will expire after a [set time](/cache/reference/environment#item_constraints).

To make life easier, we've created [official libraries](/cache/code/libraries) 
to interface with our API natively from within some of the most popular languages.

## Setting Up Configuration

{% include config.html %}

## Storing Data

Every cache begins with a call to store data. When you tell it to store data, 
IronCache will always behave intelligently:

* If the cache you want to store data in doesn't exist, IronCache will create it.
* If the data doesn't exist, IronCache will create the item in the cache.
* If the item exists, IronCache will overwrite it.

The overwriting and creation of items can be overriden using [the API](/cache/reference/api).

Here's how to store data in a cache:

{% include language-switcher.html %}
<div class="ruby">
{% highlight ruby %}
{% include cache/start/first-cache/ruby/storing.md %}
{% endhighlight %}
</div>

<div class="python">
{% highlight python %}
{% include cache/start/first-cache/python/storing.md %}
{% endhighlight %}
</div>

<div class="php">
{% highlight php %}
{% include cache/start/first-cache/php/storing.md %}
{% endhighlight %}
</div>

### Incrementing

In some use cases, it's possible to have many clients modifying an item 
at the same time. In these cases, it's necessary to not overwrite a value, 
but modify it.

For example, you may wish to count the number of times a piece of code runs. 
If two clients attempt to first get the value stored in a cache, modify it 
locally, then write it, they may overwrite each other's modifications.

For situations like this, IronCache offers an `increment` method, which asks 
for a difference to modify the value by, as opposed to a specific value to 
set.

Here's an example of incrementing a value:

{% include language-switcher.html %}
<div class="ruby">
{% highlight ruby %}
{% include cache/start/first-cache/ruby/incrementing.md %}
{% endhighlight %}
</div>

<div class="python">
{% highlight python %}
{% include cache/start/first-cache/python/incrementing.md %}
{% endhighlight %}
</div>

<div class="php">
{% highlight php %}
{% include cache/start/first-cache/php/incrementing.md %}
{% endhighlight %}
</div>

To decrement a value, simply use a negative number:

{% include language-switcher.html %}
<div class="ruby">
{% highlight ruby %}
{% include cache/start/first-cache/ruby/decrementing.md %}
{% endhighlight %}
</div>

<div class="python">
{% highlight python %}
{% include cache/start/first-cache/python/decrementing.md %}
{% endhighlight %}
</div>

<div class="php">
{% highlight php %}
{% include cache/start/first-cache/php/decrementing.md %}
{% endhighlight %}
</div>

## Retrieving Data

Once your data is stored, it's easy to get it out of the cache. A single, 
authenticated request will retrieve the value for you:

{% include language-switcher.html %}
<div class="ruby">
{% highlight ruby %}
{% include cache/start/first-cache/ruby/retrieving.md %}
{% endhighlight %}
</div>

<div class="python">
{% highlight python %}
{% include cache/start/first-cache/python/retrieving.md %}
{% endhighlight %}
</div>

<div class="php">
{% highlight php %}
{% include cache/start/first-cache/php/retrieving.md %}
{% endhighlight %}
</div>

## Deleting Data

Cache data will expire automatically over time, but it's often desirable 
to delete the data from the cache manually. Doing so is as easy as retrieving 
the data:

{% include language-switcher.html %}
<div class="ruby">
{% highlight ruby %}
{% include cache/start/first-cache/ruby/deleting.md %}
{% endhighlight %}
</div>

<div class="python">
{% highlight python %}
{% include cache/start/first-cache/python/deleting.md %}
{% endhighlight %}
</div>

<div class="php">
{% highlight php %}
{% include cache/start/first-cache/php/deleting.md %}
{% endhighlight %}
</div>

## Next Steps

That's everything you need to know to get started with IronCache. Yes, really. 
From here, check out our [client libraries](/cache/code/libraries) to get a 
list of API wrappers you can use, our [API reference](/cache/reference/api) to 
get all the details about the API and the cache environment, and look into our 
[memcached support](/cache/code/memcached) to connect with IronCache from your 
favourite [memcached](http://memcached.org) client.
