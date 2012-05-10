---
title: Setting Up Your First Cache
layout: post
section: cache
breadcrumbs:
  - ['Getting Started', '/start']
  - ['Your First Cache', '/first-cache']
---

# Setting Up Your First Cache

IronCache is a product that allows you to store temporary information for a 
limited amount of time, without having to worry about managing the memory or 
availability of such a store. It focuses on [a simple API](/cache/reference/api) 
and interoperability with [industry standards](/cache/code/memcached), making 
it simple to integrate into your current application. The [atomic operations](#incrementing) 
offered by IronCache make managing state in concurrent, scalable applications 
a simple matter.

Setting up your first cache on IronCache is easy. To make life easier, some 
[official libraries](/cache/code/libraries) have been created to interface with 
our API natively from within some of the most popular languages.

Caches consist of items, which hold the data of the cache. Items are just a key 
and a value; the key is a string that identifies the item, the value is the 
data that item holds.

There are two main operations for caches: [storing](#storing_data) and [retrieving](#retrieving_data) 
your data. [Deleting](#deleting_data) is also supported, but optional.

## Storing Data

Every cache begins with a call to store data. When you tell it to store data, 
IronCache will always behave intelligently. If the cache you want to store data 
in doesn't exist, IronCache will create it. If the data doesn't exist, IronCache 
will create the item in the cache; if the item exists, IronCache will overwrite 
it. The overwriting and creation of items can be configured via the API.

Here's how to store data in a cache:

<div class="python">
{% highlight python %}
{% include cache/start/first-cache/python/storing.md %}
{% endhighlight %}
</div>

### Incrementing

Sometimes, though, a more atomic operation is necessary. In situations where 
many clients may be modifying an item all at the same time, it's necessary to 
not overwrite a value, but modify it. For example, you may wish to count the 
number of times a piece of code runs. If two clients attempt to first get the 
value stored in cache, modify it locally, then write it, they may overwrite 
each other's modifications. For situations like this, IronCache offers an 
increment method, which asks for a difference to modify the value by, not a 
value to set.

Here's an example of incrementing a value:

<div class="python">
{% highlight python %}
{% include cache/start/first-cache/python/incrementing.md %}
{% endhighlight %}
</div>

To decrement a value, simply use a negative number:

<div class="python">
{% highlight python %}
{% include cache/start/first-cache/python/decrementing.md %}
{% endhighlight %}
</div>

## Retrieving Data

Once your data is stored, it's easy to get it out of the cache. A single, 
authenticated request will retrieve the value for you:

<div class="python">
{% highlight python %}
{% include cache/start/first-cache/python/retrieving.md %}
{% endhighlight %}
</div>

## Deleting Data

Cache data will expire automatically over time, but it's often desirable 
to delete the data from the cache manually. Doing so is as easy as retrieving 
the data:

<div class="python">
{% highlight python %}
{% include cache/start/first-cache/python/deleting.md %}
{% endhighlight %}
</div>

That's everything you need to know to get started with IronCache. Yes, really. 
From here, check out our [client libraries](/cache/code/libraries) to get a 
list of API wrappers you can use, our [API reference](/cache/reference/API) to 
get all the details about the API and the cache environment, and look into our 
[memcached support](/cache/code/memcached) to connect with IronCache from your 
favourite [memcached](http://memcached.org) client.
