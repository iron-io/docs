---
title: Choosing the Cloud Your Queues Run On
section: mq
breadcrumbs:
  - ['Reference', '/reference']
  - ['Choosing the Cloud Your Queues Run On', '/clouds']
layout: default
---

IronMQ is available on multiple cloud hosts, so your queue can run in the same infrastructure your app does. This saves time on latencies and allows you to spread your queues across multiple clouds, if desired, to maximize your queues' availability.

Each of the official IronMQ [client libraries](/mq/libraries) allows you to change a configuration setting to set the host the library connects to. Changing your cloud is as simple as selecting the host you want.

<table class="reference">
  <thead>
    <tr>
      <th>Cloud</th>
      <th>Host</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>AWS</td>
      <td>mq-aws-us-east-1.iron.io</td>
    </tr>
    <tr>
      <td>AWS EU-WEST</td>
      <td>mq-aws-eu-west-1.iron.io</td>
    </tr>
    <tr>
      <td>Rackspace ORD</td>
      <td>mq-rackspace-ord.iron.io</td>
    </tr>
    <tr>
      <td> Rackspace LON </td>
      <td>mq-rackspace-lon-1.iron.io</td>
    </tr>
    <tr>
      <td>Rackspace DFW</td>
      <td>Pro Plans Only - <a href="http://support.iron.io/customer/portal/emails/new">Contact Us</a></td>
    </tr>
  </tbody>
</table>

[Alternative domains can be found here in case of dns failures](https://plus.google.com/u/0/101022900381697718949/posts/36PS2dQH3Gn).

**NOTE**: Beanstalkd is currently not supported on Rackspace. Please use one of our
[HTTP clients](/mq/libraries) if you are on Rackspace.

Check your library's documentation for information on switching the host within the library.

Do we not support your cloud of choice? [Let us know](http://support.iron.io/customer/portal/emails/new), and we'll try to add support for it.
