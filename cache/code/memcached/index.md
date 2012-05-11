---
title: Memcached Support
layout: default
section: cache
breadcrumbs:
  - ['Code', '/code']
  - ['Memcached', '/memcached']
---

# Memcached Support

You can use any of the [Memcached clients](http://code.google.com/p/memcached/wiki/Clients) 
with IronCache. The list of supported languages is extensive, so there is 
sure to be a library for your language of choice. 

Here's a sample list of languages available (with multiple clients libs to 
choose from for many languages):

<table class="reference">
  <thead>
    <tr><th>Memcached Language Clients</th><th> </th></tr>
  </thead>
  <tbody>
    <tr>
      <td>C</td>
      <td>C++</td>
    </tr>
    <tr>
      <td>Perl</td>
      <td>OCaml</td>
    </tr>
    <tr>
      <td>Django</td>
      <td>PHP</td>
    </tr>
    <tr>
      <td>Lisp</td>
      <td>Python</td>
    </tr>
    <tr>
      <td>Erlang</td>
      <td>Rails</td>
    </tr>
    <tr>
      <td>Go</td>
      <td>Ruby</td>
    </tr>
    <tr>
      <td>Scheme</td>
      <td>Java</td>
    </tr>
    <tr>
      <td>Io</td>
      <td>.NET/C#</td>
    </tr>
  </tbody>
</table>


## Host Information
To connect to IronCache using Memcached, use the host below:

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
