---
title: Creating and Running Your First Worker
layout: default
section: worker
breadcrumbs:
- ['Getting Started', '/start']
- ['Creating and Running Your First Worker', '/first-worker']
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

# Creating and Running Your First Worker

{% if page.languages %}
{% include language-switcher-head.html %}
{% endif %}

{% include language-switcher.html %}

IronWorker is a product that helps you separate elements of your project into specialised, resilient chunks. Each worker is intended to be a single piece of your project, operating independently from the other workers and your own servers. They leverage cloud computing to do a lot of work very quickly with great uptime. By using workers, you can easily create a resilient, easily-managed project that operates even under worst-case scenarios.

It doesn't take long to get your workers running on IronWorker. There are [official libraries](/worker/code) that can make the process a lot easier, too.

<div class="{% for language in page.languages %}{% if language.name != "ruby" %}{{ language.name }}{% unless forloop.last %} {% endunless %}{% endif %}{% endfor %}">
{% capture tutorial %}{% include worker/start/first-worker/tutorial.md %}{% endcapture %}{{ tutorial | markdownify }}
</div>

<div class="ruby">
{% capture rubytutorial %}{% include worker/start/first-worker/ruby/tutorial.md %}{% endcapture %}{{ rubytutorial | markdownify }}
</div>

Congratulations, you're now ready to use IronWorker!
