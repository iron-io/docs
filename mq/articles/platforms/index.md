---
title: Articles | Platforms
layout: default
section: mq
breadcrumbs:
  - ['Articles', '/articles']
  - ['Clouds', '/platforms']
---

<h1>Platforms</h1>

<ul>
  {% for post in site.categories.platforms %}
  {% if post.categories contains "mq" %}
  <li><a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endif %}
  {% endfor %}
</ul>
