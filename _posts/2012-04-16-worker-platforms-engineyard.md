---
permalink: /worker/articles/platforms/engineyard
title: Getting started on Engine Yard
categories:
 - worker
 - articles
 - platforms
breadcrumbs:
  - ['Articles', '/articles']
  - ['Platforms', '/platforms']
  - ['Engine Yard', '/engineyard']
layout: post
section: worker
---

# Getting started on Engine Yard

[Engine Yard](http://www.engineyard.com) is a scalable platform for hosting 
Ruby on Railse and PHP applications. They offer a git-based deployment and 
are a natural platform to build from with Iron.io's product offerings. 
Iron.io and Engine Yard have teamed up to create a close integration between 
your Engine Yard apps and IronWorker, to help you get the most out of our 
respective products easily.

## Working With Engine Yard

### Deploying Your First App

Deploying your first Engine Yard account is so simple, you can do it in under 
three minutes. Engine Yard has created a [cool screencast](http://vimeo.com/17825326) 
to walk you through setting up your account and deploying your first app. They 
also have a much more [in-depth writeup](https://support.cloud.engineyard.com/entries/20996711-how-your-code-is-deployed-on-engine-yard-cloud) 
on how deployment works in their developer center.

### Adding IronWorker

Adding IronWorker is pretty easy. You just log in to your [dashboard](http://cloud.engineyard.com) 
and click the "Add-ons" link.

![Add-ons link](/images/engineyard/add-ons-link.png)

In the resulting page, search for "Iron":

![Search for Iron](/images/engineyard/ironworker-listing.png)

Click the details button to sign up for an account.

Iron.io has partnered with Engine Yard to provide several levels of IronWorker, 
to make your pricing more predictable. You'll see the different levels and 
their limits (including the free option) on [this page](https://cloud.engineyard.com/accounts/11395/services/954/signup). 
Click the "Sign up" button and agree to the terms and conditions, and Engine 
Yard will provision an Iron.io account for you. You then just need to click 
the "Activate" button next to the application/environment you want to enable 
IronWorker for.

You're all set! Just [update your code](/worker/start/first-worker) to use 
IronWorker, and you're good to go.

*BONUS*: If you use the `ey_config` gem, you can use

<div class="ruby">
```ruby
config.token = EY::Config.get(:ironworker, 'IRON_WORKER_TOKEN')
config.project_id = EY::Config.get(:ironworker, 'IRON_WORKER_PROJECT_ID')
```
</div>

to configure your worker, instead of hardcoding the token and project ID in 
by hand.

### Getting Your Credentials

Engine Yard stores your IronWorker credentials in their system, accessible 
through their `ey_config` gem, for easy access. But if you want to access 
the IronWorker API from your Workers or off the Engine Yard cloud, you'll 
need your project ID and auth token. You can get these by going to the 
[IronWorker add-on page on Engine Yard](https://cloud.engineyard.com/accounts/11395/services/954) 
and clicking the "View my IronWorker account" link. That will bring you to 
the Iron.io HUD and automatically log you in. Your project ID will be listed 
on the first page you see. Your tokens can be accessed by clicking "My Account" 
in the top right and clicking "API Tokens".

### Removing IronWorker

You can remove IronWorker from your Engine Yard control panel. We're sad to 
see you go. If you want to [let us know](http://support.iron.io/customer/portal/emails/new) 
why you're leaving, we'd really appreciate the feedback.

To remove IronWorker, just navigate to the 
[IronWorker add-on page on Engine Yard](https://cloud.engineyard.com/accounts/11395/services/954) 
and click "Cancel account".

![Cancel account](/images/engineyard/worker-cancel-account.png)

Your account will be canceled and your workers will be deprovisioned.
