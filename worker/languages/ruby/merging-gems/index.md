---
title: Merging Gems
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['Ruby', '/ruby']
  - ['Merging Gems', 'merging-gems']
---

Your workers can take advantage of the wealth of libraries that the Ruby community 
has produced, but it takes a little bit of setup.

Merging gems is simple in `iron_worker_ng`; you just use the `gem` command in your `.worker` file:

<figcaption><span>.worker</span></figcaption>
{% highlight ruby %}
gem 'activerecord'
gem 'paperclip', '< 3.0.0,>=2.1.0'
{% endhighlight %}

The first parameter is the gem name, the second is an optional string of version 
constraints. See the [.worker file](/worker/reference/dotworker) reference for more information.

<div class="alert">
<p><strong>Note:</strong> Gems with binary extensions will not be merged by default.
If you have such gems use <a href="/worker/reference/builds/#remote_build">remote build</a>.</p>
</div>

You can also use the `gemfile` command to merge gems from a Gemfile 
into your worker:

<figcaption><span>.worker</span></figcaption>
{% highlight ruby %}
gemfile '../Gemfile', 'common', 'worker' # merges gems from common and worker groups
{% endhighlight %}
