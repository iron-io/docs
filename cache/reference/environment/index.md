---
title: IronCache Environment
layout: default
section: cache
breadcrumbs:
  - ['Reference', '/reference']
  - ['Environment', '/system']
---

# IronCache Environment

## Item Structure
Caches are key/value stores comprised of *items*. The Item structure is 
flexible and straight-forward. Items can be variable in size and can contain 
almost any text or data format.

<table class="reference">
  <thead>
    <tr><th style="width: 46%;">Item Element</th><th style="width: 54%;">Type</th></tr>
  </thead>
  <tbody>
    <tr><td>Token</td><td>OAuth2 access token (string)</td></tr>
    <tr><td>expires_in</td><td>Integer (seconds)</td></tr>
    <tr><td>key</td><td>URL-encoded string</td></tr>
    <tr><td>value</td><td>string</td></tr>
  </tbody>
</table>

## Item Constraints

Items are decaying objects in a key/value store. This mean that, after a 
certain point, the item will be evicted from the cache. Caches are meant to 
be temporary storage only. You can also manually remove an item from a cache 
at any time. Unlike other cache systems, IronCache *will not* automatically 
remove items before their expiration date. Your item will *always* be 
available before the expiration date.

<table class="reference">
  <thead>
    <tr><th style="width: 16%;">Item Var</th><th style="width: 15%;">Default</th><th style="width: 15%;">Maximum</th><th style="width: 54%;">Notes</th></tr>
  </thead>
  <tbody>
    <tr><td>Item Size</td><td>--</td><td>1MB</td><td>Includes the entire body of the request (expiration, etc.)</td></tr>
    <tr><td>Key</td><td>--</td><td>--</td><td>Because it is part of the URL in the <a href="/cache/reference/api">API request</a>, the key must be URL encoded.</td></tr>
    <tr><td>Expiration</td><td>604,800sec</td><td>2,592,000sec</td><td>Equates to 7 days and 30 days, respectively.</td></tr>
  </tbody>
</table>
