---
title: IronWorker Local and Remote Builds
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['Local/Remote Builds', '/builds']
---

When you are playing with IronWorkers you could be faced with problem like binary incompatibility.
It is subject to Ruby, Python and, sometimes, Node.js.

To cover as many as possible customers' environments with our CLI we provide two types of builds for your workers.

* [Local Build](#local_build)
* [Remote Build](#remote_build)
  * [Resolve the Issue with Native Extensions](#resolve_the_issue_with_native_extensions)
  * [Remote `.worker` File](#remote__file)

## Local Build

This type of builds is enabled by default.
If you are not using any binary extensions with interpretad languages this is the best choice.
All you need CLI does for you. Just type

<figcaption><span>Command Line</span></figcaption>
{% highlight bash %}
iron_worker upload cool_feature
{% endhighlight %}

and relax. CLI merges directories, files, extensions which you pointed in your [.worker file](/worker/reference/dotworker).
Packs all in Zip archive and uploads to IronWorker service thru [the API](/worker/reference/api).

Now you are able to [queue](/worker/reference/cli/#queuing_tasks) or [schedule](/worker/scheduling) the Worker.

## Remote Build

### Resolve the Issue with Native Extensions

Interpreted languages are cool. You can write you application and be sure it will be work accross many platforms.
But in real sometimes we are forced to use native extensions, compiled binaries, to bind to poprietary library, for speed, etc.

For example, you are on Mac OS X with Ruby and use gem with native extension in the Worker.
In this case during local build binaries will be grabbed from your local machine and load to the IronWorker service.
Service launchs workers under x86-64 Linux. It means loaded binaries are incompatible and could not be used.
We clearly understand that cross-compilation especially for IronWorker could be real pain.

We developed full remote build for such use cases. To enable it add to `.worker` file:

<figcaption><span>Ruby Code</span></figcaption>
{% highlight ruby %}
full_remote_build true
{% endhighlight %}

or just

<figcaption><span>Ruby Code</span></figcaption>
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
In this case `exec`, `file`, `gemfile` and `deb` directives will be expanded with base URL to dotworker file.

For example, this dotworker:

<figcaption><span>Ruby Code</span></figcaption>
{% highlight ruby %}
exec "my_exec"
file "my_file"
deb "my.deb"
gemfile "Gemfile"
{% endhighlight %}

will be converted to this:

<figcaption><span>Ruby Code</span></figcaption>
{% highlight ruby %}
exec "http://my.site/my_exec"
file "http://my.site/my_file"
deb "http://my.site/my.deb"
gemfile "http://my.site/Gemfile"
{% endhighlight %}
