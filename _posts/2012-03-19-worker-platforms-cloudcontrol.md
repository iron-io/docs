---
permalink: /worker/articles/platforms/cloudcontrol
title: Getting Started on CloudControl
categories:
 - worker
 - mq
 - articles
 - platforms
breadcrumbs:
  - ['Articles', '/articles']
  - ['Platforms', '/platforms']
  - ['CloudControl', '/cloudcontrol']
layout: post
section: worker
---

# Getting Started on CloudControl

[CloudControl](http://www.cloudcontrol.com) is a scalable host for your application. 
They offer hassle-free agile deployment, which makes them a perfect match for Iron.io 
products. CloudControl and Iron.io have teamed up to create a close integration for 
CloudControl apps and IronWorker and IronMQ, to let developers get the most out of 
our respective products with minimal work.

## Working With CloudControl

### Deploying Your First App

CloudControl has [an excellent walkthrough](https://www.cloudcontrol.com/documentation/getting-started/tutorial-deploy-an-app) 
that will lead you through deploying your first app with their command line client. 
We're going to interface with IronWorker and IronMQ using the command line client, 
so go ahead and get it set up.

### Adding IronWorker and IronMQ

You can add IronWorker right from the CloudControl command line client. Just run the 
following command, replacing <span class="fixed-width">APP_NAME</span> and <span 
class="fixed-width">DEP_NAME</span> with your app ID and your deployment ID, 
respectively.

<div class="gray-box">
{% highlight bash %}
cctrlapp APP_NAME/DEP_NAME addon.add iron_worker.starter
{% endhighlight %}
</div>

That will add a free, limited version of IronWorker to your deployment. It should be 
sufficient for testing and development, but isn't recommended for production use. 
You can find the limitations and levels [here](https://www.cloudcontrol.com/add-ons/iron_worker).

IronMQ can similarly be added:

<div class="gray-box">
{% highlight bash %}
cctrlapp APP_NAME/DEP_NAME addon.add iron_mq.rust
{% endhighlight %}
</div>

Again, this will add a free, limited version of IronMQ to your deployment for testing 
and development. You can find the limitations and levels [here](https://www.cloudcontrol.com/add-ons/iron_mq).

### Upgrading Your Plan

To upgrade your plan, you'll need to know your current plan and the identifier for the 
new plan. You can find the plan identifiers for IronWorker [here](https://www.cloudcontrol.com/add-ons/iron_worker) 
and the identifiers for IronMQ [here](https://www.cloudcontrol.com/add-ons/iron_mq). The 
plans and their restrictions are outlined on those pages, as well.

To upgrade your IronWorker plan, just run the following command. Replace 
<span class="fixed-width">APP_NAME</span> with your app ID and <span class="fixed-width">DEP_NAME</span>
with your deployment ID. <span class="fixed-width">PLAN_OLD</span> and 
<span class="fixed-width">PLAN_NEW</span> are the plan IDs for the current and desired 
plans, respectively.

<div class="gray-box">
{% highlight bash %}
cctrlapp APP_NAME/DEP_NAME addon.upgrade iron_worker.PLAN_OLD iron_worker.PLAN_NEW
{% endhighlight %}
</div>

Upgrading IronMQ is a similar command. Again, replace <span class="fixed-width">APP_NAME</span>, 
<span class="fixed-width">DEP_NAME</span>, <span class="fixed-width">PLAN_OLD</span>, 
and <span class="fixed-width">PLAN_NEW</span>.

<div class="gray-box">
{% highlight bash %}
cctrlapp APP_NAME/DEP_NAME addon.upgrade iron_mq.PLAN_OLD iron_mq.PLAN_NEW
{% endhighlight %}
</div>

### Downgrading Your Plan

To downgrade your plan, you'll need to know your current plan and the identifier for the 
new plan. You can find the plan identifiers for IronWorker [here](https://www.cloudcontrol.com/add-ons/iron_worker) 
and the identifiers for IronMQ [here](https://www.cloudcontrol.com/add-ons/iron_mq). The 
plans and their restrictions are outlined on those pages, as well.

To downgrade your IronWorker plan, just run the following command. Replace 
<span class="fixed-width">APP_NAME</span> with your app ID and <span class="fixed-width">DEP_NAME</span>
with your deployment ID. <span class="fixed-width">PLAN_OLD</span> and 
<span class="fixed-width">PLAN_NEW</span> are the plan IDs for the current and desired 
plans, respectively.

<div class="gray-box">
{% highlight bash %}
cctrlapp APP_NAME/DEP_NAME addon.downgrade iron_worker.PLAN_OLD iron_worker.PLAN_NEW
{% endhighlight %}
</div>

Downgrading IronMQ is a similar command. Again, replace <span class="fixed-width">APP_NAME</span>, 
<span class="fixed-width">DEP_NAME</span>, <span class="fixed-width">PLAN_OLD</span>, 
and <span class="fixed-width">PLAN_NEW</span>.

<div class="gray-box">
{% highlight bash %}
cctrlapp APP_NAME/DEP_NAME addon.downgrade iron_mq.PLAN_OLD iron_mq.PLAN_NEW
{% endhighlight %}
</div>

### Removing IronWorker and IronMQ

Removing IronWorker and IronMQ is a single command each. We're sad to see you go. 
If you want to [let us know](http://support.iron.io/customer/portal/emails/new) 
why you're leaving, we'd really appreciate the feedback.

To remove IronWorker, just replace <span class="fixed-width">APP_NAME</span> with 
your app's ID, <span class="fixed-width">DEP_NAME</span> with your deployment 
ID, and <span class="fixed-width">PLAN_ID</span> with your plan's ID, then run the 
command.

<div class="gray-box">
{% highlight bash %}
cctrlapp APP_NAME/DEP_NAME addon.remove iron_worker.PLAN_ID
{% endhighlight %}
</div>

To remove IronMQ, replace <span class="fixed-width">APP_NAME</span>, <span class="fixed-width">DEP_NAME</span>, 
and <span class="fixed-width">PLAN_ID</span> like you did for IronWorker, and run the 
following command:

<div class="gray-box">
{% highlight bash %}
cctrlapp APP_NAME/DEP_NAME addon.remove iron_mq.PLAN_ID
{% endhighlight %}
</div>
