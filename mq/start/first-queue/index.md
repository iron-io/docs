---
title: Setting Up Your First Queue
layout: default
section: mq
breadcrumbs:
- ['Getting Started', '/start']
- ['Your First Queue', '/first_queue']
languages:
- name: 'python'
  command: 'python'
  extension: 'py'
- name: 'php'
  command: 'php'
  extension: 'php'
- name: 'ruby'
  command: 'ruby'
  extension: 'rb'
- name: 'go'
  command: 'go run'
  extension: "go"
---

<style type="text/css">
.container .fixed-width {
font-family: monospace;
}
pre {
overflow: auto;
}
</style>

# Setting Up Your First Queue

{% if page.languages %}
{% include language-switcher-head.html %}
{% endif %}

{% include language-switcher.html %}

IronMQ is a product that helps you maintain communication between each separate element of your project, without having to worry about building out infrastructure yourself. It prioritises making sure each message is delivered once and only once, so it is highly scalable, no matter how many clients are receiving information from it. With IronMQ, you can easily split a workload up across as many clients as you want, and be assured that each piece will only be processed once.

It doesn't take long to start passing messages on IronMQ. There are [official libraries](/mq/code/libraries) that can make the process a lot easier, too.

There are three main steps to passing messages with IronMQ&mdash;we call it the "push-get-delete" paradigm:

1. [Pushing Messages to the Queue](#pushing_messages_to_the_queue)
2. [Getting Messages Off the Queue](#get_messages_off_the_queue)
3. [Delete Messages from the Queue](#delete_messages_from_the_queue)

## Pushing Messages to the Queue

For a queue to be useful, it needs to have messages. A message could be anything from a tweet to an email to a notification&mdash;IronMQ doesn't care. You just pass in the information, and IronMQ will hold on to it.

Passing the information is pretty easy:

{% include language-switcher.html %}
{% include mq/start/first-queue/python/pushing-message.md %}
{% include mq/start/first-queue/php/pushing-message.md %}
{% include mq/start/first-queue/ruby/pushing-message.md %}
{% include mq/start/first-queue/go/pushing-message.md %}

Just replace <span class="fixed-width variable token">INSERT TOKEN HERE</span> with your OAuth 2 API Token (which you can get from your [API Tokens page](https://hud.iron.io/tokens) in [the HUD](https://hud.iron.io)) and replace <span class="fixed-width variable project_id">INSERT PROJECT_ID HERE</span> with your project ID (again, [available in the HUD](https://hud.iron.io/mq/projects)), and you're ready to run the script. It will create a queue for you called <span class="fixed-width">test_queue</span> and push to it.

To run the script, save it as <span class="fixed-width">push.<span class="language extension">py</span></span> and run <span class="language command">python</span> push.<span class="language extension">py</span></span>.

## Getting Messages Off the Queue

Now that the messages are on the queue, we need to get or "*pop*" them off the queue. When you pop a message from the queue, you reserve that message for your client for a set amount of time. By default, you reserve the message for a minute. While the message is reserved, other clients won't be able to see it. After the message's <span class="fixed-width">timeout</span> is up, the message will automatically return to the queue for other clients to access. This prevents messages from getting lost when a client pops a message but runs into an error or fails while processing it.

Here's how to get messages off the queue:

{% include language-switcher.html %}
{% include mq/start/first-queue/python/popping-message.md %}
{% include mq/start/first-queue/php/popping-message.md %}
{% include mq/start/first-queue/ruby/popping-message.md %}
{% include mq/start/first-queue/go/popping-message.md %}

## Delete Messages from the Queue

If the messages get returned to the queue after their <span class="fixed-width">timeout</span> expires, we need to mark a message as handled and remove it from the queue permanently. We do this by deleting the message off the queue.

You can delete messages at any time, and it's pretty easy to do so:

{% include language-switcher.html %}
{% include mq/start/first-queue/python/deleting-message.md %}
{% include mq/start/first-queue/php/deleting-message.md %}
{% include mq/start/first-queue/ruby/deleting-message.md %}
{% include mq/start/first-queue/go/deleting-message.md %}

That's everything! You're now ready to work with IronMQ. Check out our [client libraries](/mq/code/libraries) to get a list of libraries you can use to access the API, our [reference](/mq/reference/environment) to get the nitty-gritty information about the service, and check out [our beanstalkd support](/mq/code/beanstalkd) to connect with IronMQ from your favourite beanstalkd client.
