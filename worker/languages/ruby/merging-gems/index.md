---
title: Merging Gems
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['Ruby', '/ruby']
  - ['Merging Gems', 'merging-gems']
---

# Merging Gems

Your workers can take advantage of the wealth of libraries that the Ruby community 
has produced, but it takes a little bit of setup.

## iron_worker_ng

Merging gems is simple in `iron_worker_ng`; you just use the `code.merge_gem` 
method:

{% highlight ruby %}
code.merge_gem 'activerecord'
code.merge_gem 'paperclip', '< 3.0.0,>=2.1.0'
{% endhighlight %}

The first parameter is the gem name, the second is an optional string of version 
constraints. See the [iron_worker_ng README](https://github.com/iron-io/iron_worker_ruby_ng#readme) 
for more information.

**Note:** Gems with binary extensions **will not be merged**, as binary extensions are 
not supported on IronWorker at this time. We have [a set](/worker/reference/environment/?lang=ruby#ruby_gems_installed) 
of the most common gems with binary extensions pre-installed in the environment 
for your use. If you need a gem that is not installed, feel free to [let us know](http://get.iron.io/chat).

You can also use the `code.merge_gemfile` method to merge gems from a Gemfile 
into your worker:

{% highlight ruby %}
code.merge_gemfile '../Gemfile', 'common', 'worker' # merges gems from common and worker groups
{% endhighlight %}

**Note:** This will not auto-require the gems when executing the worker.

## iron_worker

Merging gems in `iron_worker` is similar to merging gems in `iron_worker_ng`; 
once again, it's just a `merge_gem` method.

{% highlight ruby %}
require 'iron_worker'

class ExampleWorker < IronWorker::Base
  merge_gem "activerecord"
  merge_gem "paperclip", "2.3.4"

  def run
    # your worker code
  end
end
{% endhighlight %}

The first parameter is the gem name, the second is the optional version number. 
There's also an optional `:require` argument that lets you manually select 
which files are included in the merge; you can find more information on the 
[iron_worker merge_gem wiki page](https://github.com/iron-io/iron_worker_ruby/wiki/merge_gem).
