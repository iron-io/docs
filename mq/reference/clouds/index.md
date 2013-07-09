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
			<td>Rackspace ORD</td>
			<td>mq-rackspace-ord.iron.io</td>
		</tr>
		<tr>
			<td>Rackspace DFW<br/>
			Deprecated - please use ORD.
			</td>
			<td>mq-rackspace-dfw.iron.io</td>
		</tr>
	</tbody>
</table>

**NOTE**: Beanstalkd is currently not supported on Rackspace. Please use one of our 
[HTTP clients](/mq/libraries) if you are on Rackspace. 

Check your library's documentation for information on switching the host within the library.

Do we not support your cloud of choice? [Let us know](http://support.iron.io/customer/portal/emails/new), and we'll try to add support for it.
