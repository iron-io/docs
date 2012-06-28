---
permalink: /worker/articles/platforms/cloudcontrol
title: Getting Started on cloudControl
categories:
  - worker
  - articles
  - platforms
breadcrumbs:
  - ['Articles', '/articles']
  - ['Running on Cloud Platforms', '/platforms']
  - ['cloudControl', '/cloudcontrol']
layout: post
section: worker
summary: "Quickly integrate your cloudControl-powered application with IronWorker to offload processing to a massively scalable infrastructure."
---

# Getting Started on cloudControl

[cloudControl](http://www.cloudcontrol.com) is a scalable host for your application. 
They offer hassle-free agile deployment, which makes them a perfect match for Iron.io 
products. cloudControl and Iron.io have teamed up to create a close integration for 
cloudControl apps and IronWorker, to let developers get the most out of 
our respective products with minimal work.

## Working With cloudControl

### Deploying Your First App

cloudControl has [an excellent walkthrough](https://www.cloudcontrol.com/documentation/getting-started/tutorial-deploy-an-app) 
that will lead you through deploying your first app with their command line client. 
We're going to interface with IronWorker using the command line client, so go ahead and 
get it set up.

### Adding IronWorker

You can add IronWorker right from the cloudControl command line client. Just run the 
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

### Getting Your Credentials

cloudControl stores your IronWorker credentials in a file on their system, for ease 
of integration. If you'd like to access your workers outside of cloudControl, however, 
you'll need the credentials.

To retrieve your credentials, just replace <span class="fixed-width">APP_NAME</span>, 
<span class="fixed-width">DEP_NAME</span>, and <span class="fixed-width">PLAN_ID</span> 
with your application ID, deployment ID, and plan ID respectively, then run the following 
command:

<div class="gray-box">
{% highlight bash %}
cctrlapp APP_NAME/DEP_NAME addon iron_worker.PLAN_ID
{% endhighlight %}
</div>

### Upgrading Your Plan

To upgrade your plan, you'll need to know your current plan and the identifier for the 
new plan. You can find the plan identifiers for IronWorker [here](https://www.cloudcontrol.com/add-ons/iron_worker). 
The plans and their restrictions are outlined on that page, as well.

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

### Downgrading Your Plan

To downgrade your plan, you'll need to know your current plan and the identifier for the 
new plan. You can find the plan identifiers for IronWorker [here](https://www.cloudcontrol.com/add-ons/iron_worker). 
The plans and their restrictions are outlined on that page, as well.

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

### Removing IronWorker

Removing IronWorker is a single command. We're sad to see you go. 
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
