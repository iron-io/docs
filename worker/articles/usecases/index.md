---
title: Articles | Common Use Cases
layout: default
section: worker
breadcrumbs:
  - ['Articles', '/articles']
  - ['Common Use Cases', '/usecases']
categories:
  - articles
---

# Common Use Cases

<ul>
  {% for post in site.categories.usecases %}{% if post.categories contains "worker" %}
  <li><a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endif %}{% endfor %}
</ul>
