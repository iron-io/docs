---
title: Articles | Running on Cloud Platforms
layout: default
section: mq
breadcrumbs:
  - ['Articles', '/articles']
  - ['Running on Cloud Platforms', '/platforms']
categories:
  - articles
---

<h1>Running on Cloud Platforms</h1>

<ul>
  {% for post in site.categories.platforms %}
  {% if post.categories contains "mq" %}
  <li><a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endif %}
  {% endfor %}
</ul>
