---
title: Writing Workers in Go
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['Go', '/go']
---

# Quick Start

## Write your [Go](http://www.golang.org) worker.

{% highlight go %}
package main

import "fmt"
func main() {
        fmt.Println("Hello, playground")
}
{% endhighlight %}

## Compile your Go worker to a binary file.

You may need to recompile Go with `GOOS=linux`, `GOARCH=amd64`, and 
`CGO_ENABLED=0` before you can cross compile from Windows, Mac, or a 32 bit 
machine.
{% highlight bash %}
GOOS=linux GOARCH=amd64 go build
{% endhighlight %}

## Create a script to upload the worker.
{% highlight ruby %}
require 'iron_worker_ng'

client = IronWorkerNG::Client.new(:token => "TOKEN", :project_id => "PROJECT_ID")
code = IronWorkerNG::Code::Binary.new('NAME OF EXECUTABLE')
code.name = "GoWorker"
client.codes.create(code)
{% endhighlight %}

## Queue a task to the new worker.
{% highlight ruby %}
require 'iron_worker_ng'

client = IronWorkerNG::Client.new(:token => "TOKEN", :project_id => "PROJECT_ID")
task_id = client.tasks.create('GoWorker')
{% endhighlight %}
