---
title: Connecting to Databases
layout: default
section: worker
permalink: /worker/articles/databases
breadcrumbs:
  - ['Articles', '/articles']
  - ['Working With Data & Databases', '/data']
  - ['Connecting to Databases', '/databases']
categories:
  - worker
  - articles
  - data
---

# Connecting to your Database

Connecting to your database from a worker is exactly the same as connecting to it from your application. The thing to
be aware of is that you must make the connection to your database each time your worker runs.

A typical example in pseudo code:

{% highlight ruby %}
# Connect to my database
db = connect_to_db()
# Now do some work
results = db.find(...)
{% endhighlight %}

There's nothing really special to it, just make sure you create the connection explicitly in your worker.
