---
title: IronWorker Webhooks
layout: default
section: worker
breadcrumbs:
  - ['Webhooks', '/webhooks']
---

Using IronWorker webhooks enables you to run pretty much anything you want whenever an event happens at a third
party service that supports webhooks.

--------

* [How to Use IronWorker Webhooks](#how_to_use_ironworker_webhooks)
  * [Step 1](#step_1_create_a_worker_and_upload_it_to_ironworker)
  * [Step 2](#step_2_add_your_workers_webhook_url_to_github_service_hooks)
  * [Step 3](#step_3_commit_and_push_some_code_to_your_github_project_and_watch_the_magic_happen)

## How to Use IronWorker Webhooks

The best way to see how this works is via an example. The rest of this section will use a **Github to Hipchat** webhook
where Github will hit the webhook and the worker will post to Hipchat. [The full code is here](https://github.com/iron-io/iron_worker_examples/tree/master/ruby_ng/github_to_hipchat_webhook_worker).

### Step 1: Create a worker and upload it to IronWorker

This is the same as you would create and upload a worker normally, the difference is in how the task
is queued up.

First let's create the worker:

<script src="https://gist.github.com/2308369.js?file=github_to_hipchat_webhook_worker.rb">---</script>

Now let's upload it:

<script src="https://gist.github.com/2308369.js?file=upload.rb">---</script>

### Step 2: Add your workers webhook URL to Github service hooks

[Github service hooks](http://help.github.com/post-receive-hooks/) are where you can add webhooks for Github events. In
your Github project, click Admin, Service Hooks, then Post-Receive URLs.

![Admin button](http://img.skitch.com/20100620-r8st7468q7q5waf3y85hmpwtqs.png)

![Post-receive](http://img.skitch.com/20100620-br6dw5iiyk2643fahkqbi54h36.png)

In the text field, add the webhook url for
your worker, it should look something like this:

    https://worker-aws-us-east-1.iron.io/2/projects/{Project ID}/tasks/webhook?code_name={Code Name}&oauth={Token}

The upload script above will print the exact URL to your console so you can just copy and paste it.

### Step 3: Commit and push some code to your github project and watch the magic happen!

That's it! It will post your github commit information to the Hipchat room you specified in the config file.
