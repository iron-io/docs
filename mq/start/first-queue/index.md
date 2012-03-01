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
