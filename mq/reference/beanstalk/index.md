---
title: Beanstalk Interface
layout: default
section: mq
breadcrumbs:
  - ['Reference', '/reference']
  - ['Beanstalk Interface', '/beanstalk']
---

You can use any of the [Beanstalkd clients](https://github.com/kr/beanstalkd/wiki/client-libraries) with IronMQ. The list of supported languages is extensive and so there is sure to one for your language of choice. 

--------

* [Beanstalk Libraries](#beanstalk_libraries)
* [Host Information](#host_information)
* [Authentication](#authentication)
* [Tubes vs Queues](#tubes_vs_queues)
* [Notes](#notes)

## Beanstalk Libraries

Here's a sample list of languages available (with multiple clients libs to choose from for many languages):

<table class="reference">
  <thead>
    <tr><th>Beanstalkd Language Clients</th><th> </th></tr>
  </thead>
  <tbody>
    <tr><td>C</td><td>Node.js</td></tr>
    <tr><td>C++</td><td>OCaml</td></tr>
    <tr><td>Clojure</td><td>Perl</td></tr>
    <tr><td>Django</td><td>PHP</td></tr>
    <tr><td>Common Lisp</td><td>Python</td></tr>
    <tr><td>Erlang</td><td>Rails</td></tr>
    <tr><td>Go</td><td>Ruby</td></tr>
    <tr><td>Haskell</td><td>Scheme (Chicken)</td></tr>
    <tr><td>Io</td><td>.NET/C#</td></tr>
    <tr><td>Java</td></tr>
  </tbody>
</table>

Check out list of client libraries [on GitHub](https://github.com/kr/beanstalkd/wiki/client-libraries)

## Host Information
To connect to IronMQ using Beanstalkd, use one of the hosts below (depending on the [cloud you're using](/mq/reference/clouds)). 

<table class="reference">
  <thead>
    <tr><th style="width: 30%;">Cloud</th><th style="width: 55%;">Host</th><th style="width: 15%;">Port</th></tr>
  </thead>
  <tbody>
    <tr><td>AWS</td><td>mq-aws-us-east-1.iron.io</td><td>11300</td></tr>
    <tr><td>Rackspace</td><td>mq-rackspace-dfw.iron.io</td><td>11300</td></tr>
  </tbody>
</table>

**NOTE**: Beanstalkd is currently not supported on Rackspace. Please use one of our 
[HTTP clients](/mq/libraries) if you are on Rackspace. 

## Authentication
Because IronMQ requires authentication, the first command you send must put a message onto the queue with the contents:

oauth <span class="variable token">{TOKEN}</span> <span class="variable project_id">{PROJECT_ID}</span>

The DRAINING response will be returned if authentication fails or if any other command is sent before authentication.

## Tubes vs Queues
Note that a Beanstalkd _tube_ is synonymous with an IronMQ <span class="queue_name variable">{Queue Name}</span> within the REST/HTTP API.

If a tube/queue name is not specified, then the queue name `default` will be used within IronMQ.

## Notes
* The ID you receive when using the Beanstalkd interface will *not* be the same as the HTTP interface so you *cannot* use them interchangeably.

* At the moment, there are some commands that IronMQ does not implement. These include:
  * bury
  * peek, peek-delayed, peek-buried
  * kick
  * list-tubes
  * stats, stats-job, stats-tube
  * pause-tube
  * quit
