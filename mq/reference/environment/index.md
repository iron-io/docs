---
title: IronMQ Environment
layout: default
section: mq
breadcrumbs:
  - ['Reference', '/reference']
  - ['System Environment', '/system']
---

<style type="text/css">
.content table.reference {
font-size: small;
width: 100%;
}

.content table.reference td {
padding: 2px 7px;
text-align: left;
}

.content table.reference th {
text-align: left;
border-bottom: 1px solid #000;
}

.content table.reference_list {
font-size: small;
width: 100%;
}

.content table.reference_list td {
padding: 2px 7px;
text-align: center;
}

.content table.reference_list th {
text-align: center;
border-bottom: 1px solid #000;
}
</style>

## System Environment

### Message Format
Messages can be variable in size and can contain almost any text or data format.

<table class="reference">
<tr><th style="width: 50%;">Message Element</th><th style="width: 50%;">Type</th></tr>
<tr><td>token</td><td>OAuth2 access token</td></tr>
<tr><td>delay</td><td>integer (seconds)</td></tr>
<tr><td>timeout</td><td>integer (seconds)</td></tr>
<tr><td>message body</td><td>ASCII text</td></tr>
</table>

### Message Vars

<table class="reference">
<tr><th style="width: 20%;">Message Var</th><th style="width: 15%;">Default</th><th style="width: 15%;">Maximum</th><th style="width: 50%;">Notes</th></tr>
<tr><td>Message Size</td><td>0</td><td>64KB</td><td>Includes header information  (token, delay, timeout).</td></tr>
<tr><td>Messages per Get</td><td>1</td><td>100msg</td><td>One or more messages can be handled at a time.</td></tr>
<tr><td>Timeout</td><td>60sec</td><td>???</td><td>A message goes back on the queue if not deleted before the timeout.</td></tr>
<tr><td>Delay</td><td>0</td><td>???</td><td>A message is not be made available on the queue until the delay is up.</td></tr>
<tr><td>Expiration</td><td>604,800sec</td><td>2,592,000sec</td><td>7 days and 30 days.</td></tr>
</table>
