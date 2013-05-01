---
title: IronWorker Local and Remote Builds
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['Local/Remote Builds', '/builds']
---

A lot of users want to use packages, gems,
and libraries that depend on binary extensions when working with IronWorker.
These binaries need to be built to target the IronWorker environment,
which can make the process of deploying a worker more complex.

To make working with binary extensions easier, our CLI provides two different ways to build your workers:
locally (on your machine) and remotely (in a build worker on Iron.io's servers).

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#local_build">Local Build</a></li>
    <li>
    	<a href="#remote_build">Remote Build</a>
    	<ul>
    		<li><a href="#resolve_the_issue_with_native_extensions">Resolve the Issue with Native Extensions</a></li>
    		<li><a href="#remote__file">Remote <code>.worker</code> File</a></li>
    	</ul>
    </li>
  </ul>  
</section>

## Local Build

By default, workers are built locally.
If your worker does not need any binary extensions or compiled components, building locally is the best choice.
Just type

<figcaption><span>Command Line</span></figcaption>
{% highlight bash %}
iron_worker upload cool_feature
{% endhighlight %}

and relax. The CLI will merge the directories, files, libraries, and modules you listed in your [.worker file](/worker/reference/dotworker) into a zip archive that is then uploaded to IronWorker using [the API](/worker/reference/api).

Now you are able to [queue](/worker/reference/cli/#queuing_tasks) or [schedule](/worker/scheduling) tasks against the worker.

## Remote Build

### Resolve the Issue with Native Extensions

When you worker requires a native extension or is written in a compiled language that produces a binary, it needs to be compiled against the IronWorker architecture. While you can compile everything manually against 64-bit (x86-64) Linux and write scripts to set up your worker environment, it's a lot easier to just let the worker build everything for you.

This is what the remote build is for. It automatically creates a worker that will build the worker specified by your .worker file, builds your worker, and uploads it using the API. This allows you to run your build process entirely on IronWorker's infrastructure, so everything is automatically targeting the right environment. The only downside is that this type of build can take a couple of minutes to run, making it slower than a local build.

To enable remote build, add the following line to your `.worker` file:

<figcaption><span>.worker</span></figcaption>
{% highlight ruby %}
full_remote_build true
{% endhighlight %}

or just

<figcaption><span>.worker</span></figcaption>
{% highlight ruby %}
remote
{% endhighlight %}

This forces to install all your dependencies in IronWorker [environment](/worker/reference/environment).

### Remote `.worker` File

Using HTTP link as your `.worker` file enables full remote build automatically.

<figcaption><span>Command Line</span></figcaption>
{% highlight bash %}
iron_worker upload http://my.site/my.worker
{% endhighlight %}

This could be helpful when you want to load the worker from HTTP endpoint.
In this case `exec`, `file`, `gemfile`, and `deb` directives are all prepended with the base URL of the `.worker` file.

If the `http://my.site/my.worker` file looks like this:

<figcaption><span>.worker</span></figcaption>
{% highlight ruby %}
exec "my_exec"
file "my_file"
deb "my.deb"
gemfile "Gemfile"
{% endhighlight %}

It will be read by the remote build worker as this:

<figcaption><span>.worker</span></figcaption>
{% highlight ruby %}
exec "http://my.site/my_exec"
file "http://my.site/my_file"
deb "http://my.site/my.deb"
gemfile "http://my.site/Gemfile"
{% endhighlight %}
