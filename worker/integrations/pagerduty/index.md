---
title: PagerDuty Integration
layout: default
section: docs/worker/integrations/ pagerduty
breadcrumbs:
  - ['PagerDuty']
---

## Setting Up IronWorker PagerDuty Integration

With a few simple steps, you can set up a PagerDuty trigger to be set off on any non successfully run IronWorker tasks. This includes errors, timeouts etc. this article only goes into the basic setup of the process, for more control, please refer to the 
[PagerDuty API guide](https://v2.developer.pagerduty.com/v2/page/api-reference)

<ol>


<li style="margin-top:60px;">Log into your Iron.io Account and click the Integration icon on any of your projects to see if you already have something setup. If nothing is in place yet, click the Go to Settings and start to use some link. If you don’t see that option in your account, please reach out to support.
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/images/intIcon.png' style="width: 90%;padding-top: 10px;"></li>

<li style="margin-top:60px;">Click the Add button and enter in your PagerDuty username and click the Activate button
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/images/add.png' style="width: 90%;padding-top: 10px;"></li>

<li style="margin-top:60px;">In your PagerDuty account, create a new Service. Select Iron.io from the dropdown and fill in the rest of the information as usual.
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/images/pager.png' style="width: 90%;padding-top: 10px;"></li>

<li style="margin-top:60px;">Returning back to the Hud Dashboard, you should now see that integration in the drop down
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/images/thereNow.png' style="width: 90%;padding-top: 10px;"></li>

<li style="margin-top:60px;">Now, just turn on the switch and your next failed task will create a PagerDuty Incident
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/images/active.png'  style="width: 90%;padding-top: 10px;"></li>

<li style="margin-top:60px;">This will show in PagerDuty<br>
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/images/incident.png'  style="width: 70%;padding-top: 10px;"></li>
<ol>
