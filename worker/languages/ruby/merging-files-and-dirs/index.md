---
title: Merging Files & Directories
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['Ruby', '/ruby']
  - ['Merging Files & Directories', '/merging-files-and-dirs']
---

# Merging Files & Directories

Workers sometimes need access to resource files to be able to do their jobs. 
Whether these files are templates, configuration files, or data dumps, it's 
simple to upload them with the official client libraries.

## iron_worker_ng

To upload a resource file through `iron_worker_ng`, just use the `code.merge_file` 
method:

{% highlight ruby %}
code.merge_file '../config/database.yml' # will be in the same directory as the worker
code.merge_file 'clients.csv', 'information/clients' # will be in the information/clients subdirectory
{% endhighlight %}

`code.merge_file` takes two arguments. The first is the path to the file, the 
second is the optional destination. If the destination is omitted, the file 
will be stored in the same directory as the worker, otherwise the file will be 
stored as a file in the subdirectory specified by `destination`.

If you want to merge many files, however, there's also the option to use the 
built-in `code.merge_dir` method:

{% highlight ruby %}
code.merge_dir '../config' # will be in the same directory as the worker
code.merge_dir 'lib', 'utils' # will be in the utils subdirectory, accessible as utils/lib
{% endhighlight %}

Again, the two arguments are simply the path and the destination. `merge_dir` 
treats them exactly as `merge_file` does.

For more information, see the [iron_worker_ng README](https://github.com/iron-io/iron_worker_ruby_ng#readme).

## iron_worker

To upload a resource file through `iron_worker`, just the `merge` method:

{% highlight ruby %}
merge 'config.yml'
{% endhighlight %}

The file will be made available in the same directory your worker runs from.

You can also merge entire folders into your worker:

{% highlight ruby %}
merge_folder '../templates/templates_sub_dir/'
{% endhighlight %}

The folder will be made available in the same directory your worker runs from.

For more information, see the [iron_worker wiki page on merging](https://github.com/iron-io/iron_worker_ruby/wiki/merge).
