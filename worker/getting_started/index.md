---
title: Getting Started With IronWorker
layout: default
section: worker
---

IronWorker is a container based distributed work-on-demand platform. We use Docker’s container format, and have container images for the major languages you can use to run your custom code. But because we use Docker you could use any available Docker image to run your custom code. 

This getting started tutorial will walk you through the steps of writing custom code, testing it locally, deploying it to Iron, and queuing message to run tasks. 

<hr style="margin: 3em auto; max-width: 70%">

<p class="subtitle">Offload your tasks to the parallel-processing power of the elastic cloud. Write your code, then queue tasks against it&mdash;no servers to manage, no scaling to worry about.</p>

<div class="flow-steps">
    <div class="step">
        <a class="number" href="#write">1</a>
        <a class="title" href="#write">Write and Test your Worker</a>
    </div>
        <i class="icon-long-arrow-right icon-2x"></i>

    <div class="step">
        <a class="number" href="#upload">2</a>
        <a class="title" href="#queue">Package and Upload your Worker</a>
    </div>
        <i class="icon-long-arrow-right icon-2x"></i>

    <div class="step last">
        <a class="number" href="#queue">3</a>
        <a class="title" href="#inspect">Queue Tasks for your Worker</a>
    </div>
</div>

<h2 id="setup">Before you begin</h2>

Before starting, you will need to setup a couple of things. You only need to do this once.

1. [Install the Iron's CLI tool](/worker/cli/)
1. [Setup your Iron.io credentials](/worker/reference/configuration/)
1. [Install Docker](https://docs.docker.com/installation/#installation)

<h2 id="hello">Hello World Worker</h2>

This is a very simple hello world example worker in Ruby. You do not even need Ruby installed to try this example so give it a go!
All languages follow the same process so you will get an idea of how things work regardless.

<h3 id="write">1. Write your custom Worker code</h3>

Create a file called `helloworld.rb` containing:

{% highlight ruby %}
puts "Hello World!"
{% endhighlight %}

Now let's run it in one of the Iron stack containers:

{% highlight bash %}
docker run --rm -it -v "$PWD":/worker -w /worker iron/ruby ruby helloworld.rb
{% endhighlight %}

The fact that it runs means it's all good to run on IronWorker, so lets upload it and queue up a task for it so it runs on
the IronWorker platform.

Let's package it up inside a Docker image. You should have account on <a href="https://hub.docker.com/" target="_blank">Docker Hub</a> for this.
Copy the <a href="https://github.com/iron-io/dockerworker/blob/master/ruby/Dockerfile" target="_blank">Dockerfile</a> from our repository and modify the ENTRYPOINT line to run your script. Build your docker image:

{% highlight bash %}
ENTRYPOINT ["ruby", "helloworld.rb"]
{% endhighlight %}

Build a docker image:
{% highlight bash %}
docker build -t USERNAME/hello:0.0.1 .
{% endhighlight %}

The `0.0.1` is the version which you can update whenever you make changes to your code.  
`USERNAME` is your username on Docker Hub.
Test your image, just to be sure you created it correctly:

{% highlight bash %}
docker run --rm -it USERNAME/hello:0.0.1
{% endhighlight %}

Push it to Docker Hub and register your image with Iron:

{% highlight bash %}
docker push USERNAME/hello:0.0.1
iron register USERNAME/hello:0.0.1
{% endhighlight %}

And finally queue up a job for it!

{% highlight bash %}
iron worker queue --wait USERNAME/hello
{% endhighlight %}

The `--wait` parameter waits for the job to finish, then prints the output.
You will also see a link to [HUD](http://hud.iron.io) where you can see all the rest of the task details along with the log output.

That's it, you have ran a worker on the IronWorker cloud platform!

Now let's get into more detail.

<h3 id="test">2. Test your Worker</h3>

IronWorker's <a href="/worker/reference/environment">environment</a> is a Linux Docker container that your task is executed in. Anything you write that runs inside of our published <a href="https://hub.docker.com/r/iron" target="_blank">Docker images</a> should run just the same as on IronWorker. The key here is getting it to run with the Docker commands below and sample payloads.

The primary Docker command is:

{% highlight bash %}
docker run --rm -v "$(pwd)":/worker -w /worker IMAGE[:TAG] 'MY_COMMAND -payload MY_PAYLOAD.json'
{% endhighlight %}

* Replace IMAGE with the name of the image you want your code to be executed in. For example, if your worker is a Ruby script, you can replace IMAGE with `iron/ruby`. Also you may need to specify a TAG (version) of the image you want to use: `iron/ruby:2.2`
* Replace MY\_COMMAND with what you would like to execute. For instance, if your worker was a Ruby script called `myworker.rb`, you would
replace MY\_COMMAND with `ruby myworker.rb`. If it was a Go program, you would change it to `./myworker`.
* Replace MY_PAYLOAD with the name of an example payload file to test with. This payload file is the format that you will use
to queue up jobs/tasks for your worker after it's uploaded.

This command may seem simple at first glance, but the main thing is that it will force you to vendor all your dependencies
along with your worker. You'll find links to an example repository showing how to do this for various languages.

<h3 id="upload">3. Package your Worker</h3>

Let's package it up inside a Docker image and upload it to a Docker Registry. Copy the Dockerfile from appropriate directory (depending on used programming language) of this [repository](https://github.com/iron-io/dockerworker) and modify the ENTRYPOINT line to run your script. Build your docker image:

{% highlight bash %}
docker build -t USERNAME/IMAGENAME:0.0.1 .
{% endhighlight %}

That's just a standard `docker build` command. The 0.0.1 is the version which you can update
whenever you make changes to your code. Change `USERNAME` to your Docker Hub username and change `IMAGENAME` to your docker image name.

Test your image, just to be sure you created it correctly:

{% highlight bash %}
docker run --rm -it -e "PAYLOAD_FILE=MY_PAYLOAD.json" -e "YOUR_ENV_VAR=ANYTHING" USERNAME/IMAGENAME:0.0.1
{% endhighlight %}

<h3 id="push">4. Push it to Docker Hub</h3>

Push it to Docker Hub:

{% highlight bash %}
docker push USERNAME/IMAGENAME:0.0.1
{% endhighlight %}

<h3 id="register">5. Register your image with Iron</h3>

Ok, we're ready to run this on Iron now, but first we have to let Iron know about the
image you just pushed to Docker Hub. 

{% highlight bash %}
iron register USERNAME/IMAGENAME:0.0.1
{% endhighlight %}

<h3 id="queue">6. Queue / Schedule jobs for your image</h3>

Now you can start queuing jobs or schedule recurring jobs for your image.

{% highlight bash %}
iron worker queue --payload-file MY_PAYLOAD.json --wait USERNAME/IMAGENAME
{% endhighlight %}

Notice we do not use the image tag when queuing, this is so you can change versions without having to update all your code that's queuing up jobs for the image.

The --wait parameter waits for the job to finish, then prints the output. You will also see a link to HUD where you can see all the rest of the task details along with the log output.

Of course, in practice you will be [queuing up jobs via the API](/worker/reference/api/#queue_a_task), most likely using one of our [client libraries](/worker/libraries).

<h2 id="private">Private images</h2>

If you want to keep your code private and use a [private Docker repository](https://docs.docker.com/docker-hub/repos/#private-repositories), you just need to let Iron know how to access your private images. From the same directory as your iron.json file, run:

{% highlight bash %}
iron docker login -e YOUR_DOCKER_HUB_EMAIL -u YOUR_DOCKER_HUB_USERNAME -p YOUR_DOCKER_HUB_PASSWORD
{% endhighlight %}

Then just do everything the same as above.





<h2 id="zip_packaging">Deploying your code directly to Iron.io without docker</h2>

<h3 id="writetwo">1. Write and Test your Worker</h3>
Stays exactly the same, <a href="#write">Click Here</a> to read.

<h3 id="uploadtwo">2. Package and Upload your Worker</h3>

Packing is pretty straightforward knowing that you got it working with the `docker run` command above, just zip it up.

{% highlight bash %}
zip -r myworker.zip .
{% endhighlight %}

Then upload the zip you just created. You'll notice this command needs you to specify a Docker Image even though you are not using Docker. This is because Iron will still execute your task in a container and needs this information to properly run:

{% highlight bash %}
iron worker upload [--zip myworker.zip] --name myworker DOCKER_IMAGE [COMMAND]
{% endhighlight %}

<h3 id="queuetwo">3. Queue Tasks for your Worker</h3>

Now you get to queue up tasks/jobs for your Worker!

{% highlight bash %}
iron worker queue --wait myworker
{% endhighlight %}

Typically you would use the [IronWorker API](/worker/reference/api/#queue_a_task) to actually queue up tasks from other systems.
The cli queue command above is primarily for testing purposes.


<br/><br/><br/>
