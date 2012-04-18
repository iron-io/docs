---
title: Writing Workers in Go
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['Go', '/go']
---

# Writing Workers in Go

## Quick Start

1. **Write your [Go](http://www.golang.org) worker.**
        {% highlight go %}
        package main
        
        import "fmt"
        func main() {
                fmt.Println("Hello, playground")
        }
        {% endhighlight %}
2. **Compile your Go worker** to a binary file. You may need to recompile Go 
with `GOOS=linux`, `GOARCH=amd64`, and `CGO_ENABLED=0` before you can cross 
compile from Windows, Mac, or a 32 bit machine.
        {% highlight bash %}
        GOOS=linux GOARCH=amd64 go build
        {% endhighlight %}
3. Create a script to **upload the worker** to IronWorker's servers.
        {% highlight ruby %}
        require 'iron_worker_ng'
        
        client = IronWorkerNG::Client.new(:token => "TOKEN", :project_id => "PROJECT_ID")
        code = IronWorkerNG::Code::Binary.new('NAME OF EXECUTABLE')
        code.name = "GoWorker"
        client.codes.create(code)
        {% endhighlight %}
4. **Queue a task** to the new worker.
        {% highlight ruby %}
        require 'iron_worker_ng'
        
        client = IronWorkerNG::Client.new(:token => "TOKEN", :project_id => "PROJECT_ID")
        task_id = client.tasks.create('GoWorker')
        {% endhighlight %}
