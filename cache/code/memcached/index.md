---
title: Memcached Support
layout: default
section: cache
breadcrumbs:
  - ['Code', '/code']
  - ['Memcached', '/memcached']
---

<style type="text/css">
.alert {
  padding: 8px 35px 8px 14px;
  margin: 10px;
  color: #c09853;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  background-color: #fcf8e3;
  border: 1px solid #fbeed5;
  -webkit-border-radius: 4px;
     -moz-border-radius: 4px;
          border-radius: 4px;
}

.alert-heading {
  color: inherit;
}

.alert .close {
  position: relative;
  top: -2px;
  right: -21px;
  line-height: 18px;
}

.alert-success {
  color: #468847;
  background-color: #dff0d8;
  border-color: #d6e9c6;
}

.alert-danger,
.alert-error {
  color: #b94a48;
  background-color: #f2dede;
  border-color: #eed3d7;
}

.alert-info {
  color: #3a87ad;
  background-color: #d9edf7;
  border-color: #bce8f1;
}

.alert-block {
  padding-top: 14px;
  padding-bottom: 14px;
  margin-top: 10px;
}

.alert-block > p,
.alert-block > ul {
  margin-bottom: 0;
}

.alert-block p + p {
  margin-top: 5px;
}
</style>

# Memcached Support

<div class="alert alert-danger">
<p>
<strong>Warning!</strong> Using the Memcached transport <em>does not</em> encrypt 
your credentials during transport. It should be used temporarily or for 
testing only, as it is less secure than the <a href="/cache/reference/api">REST API</a>.
</p>
</div>

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

<div class="alert">
<p>
It's important to note that <em>only</em> the <strong>text protocol</strong> 
is supported in IronCache. The newer <em>binary</em> protocol is <strong>not 
supported</strong> at this time.
</p>
</div>

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
