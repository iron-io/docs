---
title: Creating and Running your First Worker
layout: default
section: worker
breadcrumbs:
- ['Getting Started', '/start']
- ['Your First Worker', '/first-worker']
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
---
<style type="text/css">
.container .fixed-width {
font-family: monospace;
}
pre {
overflow: auto;
}
</style>

# Creating and Running your First Worker

{% if page.languages %}
{% include language-switcher-head.html %}
{% endif %}

{% include language-switcher.html %}

IronWorker is a product that helps you separate elements of your project into specialised, resilient chunks. Each worker is intended to be a single piece of your project, operating independently from the other workers and your own servers. They leverage cloud computing to do a lot of work very quickly with great uptime. By using workers, you can easily create a resilient, easily-managed project that operates even under worst-case scenarios.

It doesn't take long to get your workers running on IronWorker. There are [official libraries](/code/libraries) that can make the process a lot easier, too.

<div class="{% for language in page.languages %}{% if language.name != "ruby" %}{{ language.name }}{% unless forloop.last %} {% endunless %}{% endif %}{% endfor %}">
{% capture tutorial %}{% include worker/start/first-worker/tutorial.md %}{% endcapture %}{{ tutorial | markdownify }}
</div>

<div class="ruby">
{% capture rubytutorial %}{% include worker/start/first-worker/ruby/tutorial.md %}{% endcapture %}{{ rubytutorial | markdownify }}
</div>

Congratulations, you're now ready to use IronWorker!

## Where to go from here

Now that you've got the basics of IronWorker down, you might want to check out some more advanced topics:

* [**Scheduling tasks**](/worker/start/scheduling-tasks): tasks can be scheduled to happen at some point in the future, some amount of time from now, or even repeating over time.
* [**Setting task progress**](/worker/start/task-progress): you can set a progress variable on tasks that will show up in their detail view. Wouldn't it be nice to know how many Fibonacci numbers we had gotten through, instead of just "working"?
* [**Managing tasks**](/worker/start/managing-tasks): In really big projects, you can have a lot of tasks running at once. The API lets you list, cancel, and delete tasks to help you manage your worker.
* [**Interfacing with IronMQ**](/worker/articles/integrations/ironmq): Getting your results as a log is a pain. There has to be a better way. Sure, you could have them emailed, Twittered, or sent as parameters in an HTTP request, but that requires you to run your own systems. IronMQ is a messaging queue built in the cloud, so you don't have to worry about that. Even better, IronWorker and IronMQ can work together.

