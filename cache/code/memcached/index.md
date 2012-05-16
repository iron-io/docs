---
title: Memcached Interface
layout: default
section: cache
breadcrumbs:
  - ['Code', '/code']
  - ['Memcached', '/memcached']
languages:
  - name: 'ruby'
  - name: 'python'
---

{% if page.languages %}
{% include language-switcher-head.html %}
{% endif %}

# Memcached Interface

You can use any of the [memcached clients](http://code.google.com/p/memcached/wiki/Clients) 
with IronCache. As an industry standard, memcached has accumulated an 
extensive list of supported languages, so it's extremely likely your 
language of choice is supported.

<div class="alert alert-danger">
<p>
<strong>Warning!</strong> Using the memcached interface <em>does not</em> encrypt 
your credentials during transport. It should be used temporarily or for 
testing only, as it is less secure than the <a href="/cache/reference/api">REST API</a>.
</p>
</div>

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

<div class="alert">
<p>
It's important to note that only the <strong>text protocol</strong> is 
supported in IronCache. The <strong>binary</strong> protocol for 
memcached is <strong>not supported</strong> at this time.
</p>
</div>

## Host Information
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

## Authentication
Because IronCache requires authentication, clients must set a pseudo-item as 
soon as they connect. Set the "oauth" key to the following:

<div class="grey-box"><span class="variable token">{TOKEN}</span> <span class="variable project_id">{PROJECT_ID}</span> <span class="variable cache_name">{CACHE_NAME}</span></div>

This **will not** be stored in your cache. Subsequent attempts to set the value 
of the "oauth" key, however, will be stored in the cache.

## Example

The following example should help you get up and running using IronCache 
with memcached quickly:

### Install the Library

{% include language-switcher.html %}
<div class="ruby">
{% include cache/code/memcached/ruby/install.html %}
</div>
<div class="python">
{% include cache/code/memcached/python/install.html %}
</div>

### Run the Example

{% include language-switcher.html %}
<div class="ruby">
{% include cache/code/memcached/ruby/code.html %}
</div>
<div class="python">
{% include cache/code/memcached/python/code.html %}
</div>
