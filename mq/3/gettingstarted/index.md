---
title: Getting Started with IronMQ v3
layout: default
section: mq
---



<p class="subtitle">Connect your applications and processes with an elastic message queue. Decouple your processes and create a highly scalable system by passing messages. This example is in Ruby, but can be done in your language of choice. You can find all of our client libraries <a href='http://dev.iron.io/mq/3/libraries'>here</a>/</p>

<div class="flow-steps">
    <div class="step">
        <a class="number">1</a>
        <a class="title">Create a Project and Setup Credentials</a>
    </div>
        <i class="icon-long-arrow-right icon-2x"></i>

    <div class="step">
        <a class="number">2</a>
        <a class="title">Create a Queue and Add a Message</a>
    </div>
        <i class="icon-long-arrow-right icon-2x"></i>

    <div class="step last">
        <a class="number">3</a>
        <a class="title">Process/Consume the Messages</a>
    </div>
</div>

<h2>Create a Project and Setup Credentials</h2>

Before starting, you'll need to setup a couple of things. You only need to do this once.

1. First we need to create a project to put this example into.
<center>
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/images/newProject.png' style='width: 400px;'></center>

Next, click the Hud and click the MQ 3 button next to the title to go to the project's dashboard.
<center>
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/images/dashButton.png' style='width: 400px;'></center>

Now lets create a directory on our loca computer to hold this project. I'm calling mine mqExample, but yours can be anything you'd like. After it's made, CD into it:
{% highlight bash %}
$ mkdir mqExample
$ cd mqExample
{% endhighlight %}

Great, the last thing we need to do to get ready is download the iron.json file and move it into that directory.
<center>
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/images/ironDown.png' style='width: 400px;'></center>
{% highlight bash %}
$ mv ~/Downloads/iron.json .
{% endhighlight %}

Now, we're all done with the setup process and can get to work.

<h2>Create a Queue and Add a Message</h2>

In your working directory, create a file called example.rb containning:
{% highlight ruby %}
# Get package here: https://github.com/iron-io/iron_mq_ruby
require 'iron_mq'

#Create an IronMQ client object
#The api_version can also be placed in your iron.json file if you prefer
ironmq = IronMQ::Client.new(
    api_version: 3
    )

#create a queue
queue = ironmq.queue('My_Very_First_Queue')

#add a message to the queue
queue.post('IronMQ v3 is great!')
{% endhighlight %}

This simple script creates a queue called My Very First Queue with one message in it. Let's go ahead and run it
{% highlight bash %}
$ ruby example.rb
{% endhighlight %}

Now, if you refresh your Dashboard, you should see that queue there waiting for you:
<center>
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/images/newQueue.png' style='width: 400px;'></center>

You can click on the queue ame to see more information about that queue:
<center>
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/images/queueInfo.png' style='width: 400px;'></center>

<h2>Process/Consume the Messages</h2>
From here, you can work with the queue via the Hud UI, or programatically, whichever you prefer. Because this is a demo I don't have anything consuming the messages, so let's use the Iron CLI to reserve and delete the message.

If you don't already have the CLI installed, [please click here](/worker/cli/) for installation instructions

We'll be using the pop tool. For information on this speific tool as well as all of the other features in the CLI, please refer to their man pages. 
{% highlight bash %}
$ iron mq pop My_Very_First_Queue
{% endhighlight %}

If you watch the dashboard as you send that command, you'll see the mesage being removed in the realtime graph.
<center>
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/images/postPop.png' style='width: 400px;'></center>

