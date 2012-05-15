---
title: Designing Systems With IronCache
layout: default
section: cache
breadcrumbs:
  - ['Articles', '/articles']
  - ['System Designs', '/design']
---

# {{ page.title }}

<ul>
  {% for post in site.categories.design %}
  {% if post.categories contains "cache" %}
  <li><a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endif %}
  {% endfor %}
</ul>
