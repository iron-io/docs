---
title: IronWorker | Articles | Common Use Cases
layout: default
section: worker
breadcrumbs:
  - ['Articles', '/articles']
  - ['Common Use Cases', '/usecases']
---

<h2>Common Use Cases</h2>

<ul>
  {% for post in site.categories.usecases %}
  <li><a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>