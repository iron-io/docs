---
title: Merging Files & Directories
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['Ruby', '/ruby']
  - ['Merging Files & Directories', '/merging-files-and-dirs']
---

Workers sometimes need access to resource files to be able to do their jobs.
Whether these files are templates, configuration files, or data dumps, it's
simple to upload them with the official client libraries.

To upload a resource file through `iron_worker_ng`, just use the `file` command in your `.worker` file:

<figcaption><span>.worker </span></figcaption>

```ruby
file '../config/database.yml' # will be in the same directory as the worker
file 'clients.csv', 'information/clients' # will be in the information/clients subdirectory
```

`file` takes two arguments. The first is the path to the file, the
second is the optional destination. If the destination is omitted, the file
will be stored in the same directory as the worker, otherwise the file will be
stored as a file in the subdirectory specified by `destination`.

If you want to merge many files, however, there's also the option to use the
built-in `dir` command in your `.worker` file:

<figcaption><span>.worker </span></figcaption>

```ruby
dir '../config' # will be in the same directory as the worker
dir 'lib', 'utils' # will be in the utils subdirectory, accessible as utils/lib
```

Again, the two arguments are simply the path and the destination. `dir`
treats them exactly as `file` does.

For more information, see the [iron_worker_ng README](https://github.com/iron-io/iron_worker_ruby_ng#readme).
