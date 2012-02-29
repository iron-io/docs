---
title: Common Use Cases | Iron.io Dev Center
layout: default
section: worker
breadcrumbs:
  - ['Articles', '/articles']
  - ['Common Use Cases', '/usecases']
---

# Common Use Cases

<ul>
  {% for post in site.categories.usecases %}
  <li><a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>