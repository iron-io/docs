---
title: IronWorker Webhooks
layout: default
section: worker
breadcrumbs:
  - ['Webhooks', '/webhooks']
---

Using IronWorker webhooks enables you to run pretty much anything you want whenever an event happens at a third
party service that supports webhooks.

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li>
      <a href="#how_to_use_ironworker_webhooks">How to Use IronWorker Webhooks</a>
    </li>
    <li>
      <a href="#example">Example</a>
      <ul>
        <li><a href="#step_1_create_a_worker_and_upload_it_to_ironworker">Step 1</a></li>
        <li><a href="#step_2_add_your_workers_webhook_url_to_github_service_hooks">Step 2</a></li>
        <li><a href="#step_3_commit_and_push_some_code_to_your_github_project_and_watch_the_magic_happen">Step 3</a></li>
      </ul>
    </li>
  </ul>
</section>

<h2 id="how_to_use_ironworker_webhooks">How to Use IronWorker Webhooks</h2>

A Webhook is simply an [HTTP POST API endpoint](/worker/reference/api/#queue_a_task_from_a_webhook) so
you don't need any updates in your existing workers to use them. A typical workflow for a webhook is:

* [Create and upload a worker](/worker)
* Obtain webhook link:
  * From the [HUD](https://hud.iron.io)
  * Or by the [CLI](/worker/reference/cli)


```sh
$ iron_worker webhook $WORKER_NAME
```

* Pass webhook link to 3rdparty service like GitHub, or as subscriber URL for [IronMQ Push Queue](/mq/reference/push_queues)
* Do something to trigger the webhook, say, commit to GitHub or post a message to a Push Queue.

When the IronWorker service receives the HTTP POST request to your webhook endpoint,
it will pass the request's body to a worker as a file, specified by [`-payload` option](/worker/reference/payload).

The URL's scheme for webhooks is:


```sh
$ WORKER_API_URL/projects/$PROJECT_ID/tasks/webhook?code_name=$CODE_NAME&oauth=$TOKEN
```

Where:

* `$WORKER_API_URL` is `https://worker-aws-us-east-1.iron.io/2`
* `$PROJECT_ID` and `$TOKEN` are credentials to access to your project
* `$CODE_NAME` is name of your worker

<h2 id="example">Example</h2>

The best way to see how this works is via an example. The rest of this section will use a **Github to Hipchat** webhook
where Github will hit the webhook and the worker will post to Hipchat. [The full code is here](https://github.com/iron-io/iron_worker_examples/tree/master/ruby_ng/github_to_hipchat_webhook_worker).
 
<h3 id="step_1_create_a_worker_and_upload_it_to_ironworker">Step 1: Create a worker and upload it to IronWorker</h3>

This is the same as you would create and upload a worker normally, the difference is in how the task
is queued up.

First let's create the worker:

<script src="https://gist.github.com/2308369.js?file=github_to_hipchat_webhook_worker.rb">---</script>

Now let's upload it:

<script src="https://gist.github.com/2308369.js?file=upload.rb">---</script>
 
<h3 id="step_2_add_your_workers_webhook_url_to_github_service_hooks">Step 2: Add your workers webhook URL to Github service hooks</h3>

[Github service hooks](http://help.github.com/post-receive-hooks/) are where you can add webhooks for Github events. In
your Github project, click Admin, Service Hooks, then Post-Receive URLs.

![Admin button](http://img.skitch.com/20100620-r8st7468q7q5waf3y85hmpwtqs.png)

![Post-receive](http://img.skitch.com/20100620-br6dw5iiyk2643fahkqbi54h36.png)

In the text field, add the webhook url for
your worker, it should look something like this:

    https://worker-aws-us-east-1.iron.io/2/projects/{Project ID}/tasks/webhook?code_name={Code Name}&oauth={Token}

The upload script above will print the exact URL to your console so you can just copy and paste it.
 
<h3 id="step_3_commit_and_push_some_code_to_your_github_project_and_watch_the_magic_happen">Step 3: Commit and push some code to your github project and watch the magic happen!</h3>

That's it! It will post your github commit information to the Hipchat room you specified in the config file.
