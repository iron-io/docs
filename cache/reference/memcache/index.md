---
title: IronCache: Memcache Interface
layout: default
section: cache
breadcrumbs:
  - ['Reference', '/reference']
  - ['Memcache', '/memcache']
---

As an industry standard, memcached has accumulated an
extensive list of supported languages, so it's extremely likely your
language of choice is supported.

<div class="alert">
<p>
It's important to note that only the <strong>text protocol</strong> is
supported in IronCache. The <strong>binary</strong> protocol for
memcached is <strong>not supported</strong> at this time.
</p>
<p>
Using the memcached interface <em>does not</em> encrypt
your credentials during transport.
</p>
</div>

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#memcache_libraries">Memcache Libraries</a></li>
    <li><a href="#host_information">Host Information</a></li>
    <li><a href="#authentication">Authentication</a></li>
    <li>
      <a href="#example">Example</a>
      <ul>
        <li><a href="#install_the_library">Install the Library</a></li>
        <li><a href="#run_the_example">Run the Example</a></li>
      </ul>
    </li>
  </ul>
</section>

<h2 id="memcache_libraries"> Memcache Libraries </h2>

Here's a sample list of languages available (with multiple clients libs to
choose from for many languages):

<table style="border: 0px; width: 100%;">
<tr>
<td style="width: 25%;">
<ul>
<li>C</li>
<li>C++</li>
<li>Perl</li>
<li>OCaml</li>
</ul>
</td>

<td style="width: 25%">
<ul>
<li>Django</li>
<li>PHP</li>
<li>Lisp</li>
<li>Python</li>
</ul>
</td>

<td style="width: 25%">
<ul>
<li>Erlang</li>
<li>Rails</li>
<li>Go</li>
<li>Ruby</li>
</ul>
</td>

<td style="width: 25%">
<ul>
<li>Scheme</li>
<li>Java</li>
<li>Io</li>
<li>.NET/C#</li>
</ul>
</td></tr>
</table>

You can use any of the [memcached clients](http://code.google.com/p/memcached/wiki/Clients)
with IronCache.

<h2 id="host_information"> Host Information </h2>
To connect to IronCache using memcached, use the host below:

<table class="reference">
  <thead>
    <tr>
      <th style="width: 75%;">Host</th>
      <th style="width: 25%;">Port</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>cache-aws-us-east-1.iron.io</td>
      <td>11211</td>
    </tr>
  </tbody>
</table>

<h2 id="authentication">Authentication</h2>
Because IronCache requires authentication, clients must set a pseudo-item as
soon as they connect. Set the "oauth" key to the following:

<div class="grey-box"><span class="variable token">{TOKEN}</span> <span class="variable project_id">{PROJECT_ID}</span> <span class="variable cache_name">{CACHE_NAME}</span></div>

This **will not** be stored in your cache. Subsequent attempts to set the value
of the "oauth" key, however, will be stored in the cache.

<h2 id="example">Example</h2>

The following example should help you get up and running using IronCache
with memcached quickly:

<h2 id="install_the_library">Install the Library</h2>

The sample uses the memcache-client gem; you'll need to install it
before you can use the sample.

**Note:** The popular Dalli client **will not** work, as it requires support for the binary memcached protocol, which IronCache does not support at this time.

To install memcache-client, just run the following from your command line:

<figcaption><span>Command Line </span></figcaption>

```sh
$ gem install memcache-client
```

<!-- Python

The sample uses the python-memcached client; you'll need to install it
before you can use the sample.

To install python-memcached, just run the following from your command line:

```sh
pip install python-memcached
```

If you prefer <span class="fixed-width">easy_install</span>, you can run:

```sh
easy_install python-memcached
```

-->

<h3 id="run_the_example">Run the Example</h3>

<figcaption><span>iron_cache_memcache.rb </span></figcaption>

```ruby
require 'memcache'

# connect
mc = MemCache.new(['cache-aws-us-east-1.iron.io:11211'])

# Tokens can be retrieved from https://hud.iron.io/tokens
token = "Insert your token here"
# Project IDs are listed at https://hud.iron.io
project_id = 'Insert your project_id here'
cache_name = 'Give your cache a unique name'

# authenticate, expiration is 0, don't use marshal serialization
mc.set('oauth', "#{token} #{project_id} #{cache_name}", 0, true)

# store for 5 seconds
mc.set('abc', 123, 5)

# retrieve
p mc.get('abc')

sleep 5

# and it's gone
p mc.get('abc')
```

<!-- PYTHON

```ruby
import memcache
import time

mc = memcache.Client(['cache-aws-us-east-1.iron.io:11211'], debug=0)

# Tokens can be retrieved from https://hud.iron.io/tokens
token = "Insert your token here"
# Project IDs are listed at https://hud.iron.io
project_id = 'Insert your project_id here'
cache_name = 'Give your cache a unique name'

mc.set("oauth", token + " " + project_id + " " + cache_name)

mc.set("abc", "123")
print(mc.get("abc"))

# increment the value
mc.incr("abc")
print(mc.get("abc"))

mc.set("this-value", "disappears after 3 seconds", time=3)
time.sleep(4)

print(mc.get("this-value"))
```
-->
