---
permalink: /mq/articles/clouds/rackspace
title: Running your queues on Rackspace
categories:
 - mq
 - articles
 - clouds
breadcrumbs:
  - ['Articles', '/articles']
  - ['Clouds', '/clouds']
  - ['Rackspace', '/rackspace']
layout: default
section: mq
---

## Running your queues on Rackspace

When putting messages into the IronMQ service, by default they will go into our IronMQ service on AWS. You
can also send messages into our Rackspace environment by changing the host inside your configuration settings.

{% highlight python %}
@ironmq = IronMQ::Client.new(
  :token => '_Z_o9cOmHPMGApHoETnS4_K-YWc',
  :project_id => '4edc6973cea6fe44bb000275',
  :host => 'mq-rackspace-dfw.iron.io'
)
{% endhighlight %}