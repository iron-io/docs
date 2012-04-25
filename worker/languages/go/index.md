---
title: Writing Workers in Go
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['Go', '/go']
---

# Writing Workers in Go

The [Go](http://www.golang.org) programming language is a fast, statically 
typed, compiled language with an emphasis on concurrency. It's a great language 
for cloud systems (we use it here at Iron.io!) and is a natural fit for workers.

Go Workers need to be compiled, then uploaded. Once they're uploaded to the 
IronWorker cloud, they can be invoked via a simple API to be put on the 
processing queues immediately or scheduled to run at a later time.

## Quick Start

### Get the `iron_worker_ng` gem.

There isn't a library for interacting with the IronWorker API written in Go 
yet. While running workers written in Go is supported, you have to upload 
them using another language's library and queue tasks using our simple HTTP 
[API](/worker/reference/api) or another language's library. We're using the 
`iron_worker_ng` Ruby library in these examples. You can download it off 
[Github](https://github.com/iron-io/iron_worker_ruby_ng) or install it using 
`gem install iron_worker_ng`. **Note:** You'll need to have Ruby installed to 
use the gem.

### Write your Go worker.

{% highlight go %}
package main

import "fmt"

func main() {
        fmt.Println("Hello, playground")
}
{% endhighlight %}

### Compile your Go worker to a binary file.

You may need to recompile Go with `GOOS=linux`, `GOARCH=amd64`, and 
`CGO_ENABLED=0` before you can [cross compile](#cross_compiling) from Windows, Mac, or a 32 bit 
machine.
{% highlight bash %}
GOOS=linux GOARCH=amd64 go build
{% endhighlight %}

### Create a script to upload the worker.
{% highlight ruby %}
require 'iron_worker_ng'

client = IronWorkerNG::Client.new(:token => "TOKEN", :project_id => "PROJECT_ID")
code = IronWorkerNG::Code::Binary.new(:name => "GoWorker", :exec => 'PATH TO EXECUTABLE')
client.codes.create(code)
{% endhighlight %}

### Queue a task to the new worker.
{% highlight ruby %}
require 'iron_worker_ng'

client = IronWorkerNG::Client.new(:token => "TOKEN", :project_id => "PROJECT_ID")
task_id = client.tasks.create('GoWorker', {:some_arg => "This is a payload arg", :other_arg => ["apples", "oranges]})
{% endhighlight %}

## Deep Dive

### Payload Example

Retrieving the payload from within the worker on Go is the same as it is on any 
other language. Retrieve the `-payload` argument passed to the script, load that 
file, and parse it as JSON.

{% highlight go %}
package main

import (
        "io/ioutil"
        "flag"
        "fmt"
        "encoding/json"
)

func main() {
        var payload string
        flag.StringVar(&payload, "payload", "", "the data payload")
        flag.Parse()

        var data interface{}
        raw, err := ioutil.ReadFile(payload)
	if err != nil {
		panic(err.Error())
	}

	err = json.Unmarshal(raw, &data)
	if err != nil {
		panic(err.Error())
	}
        fmt.Printf("%v", data)
}
{% endhighlight %}

### Cross Compiling

To make a binary distribution that runs on the IronWorker cloud, it's often 
necessary to compile your Go executable for a system different from your 
native system&mdash;unless you're running 64 bit Linux, the binaries you 
generate won't be executable on IronWorker's cloud.

The solution to this is "cross compile" your Go Workers. By recompiling 
Go with specific flags set, you can compile binaries that will work on 
IronWorker. You can find more information on that in the [Go mailing list](https://groups.google.com/d/topic/golang-nuts/dQxQ9O7u11g/discussion).

The `GOOS` value should be set to `linux` and the `GOARCH` value should be 
set to `amd64`.

Note that you must disable cgo to cross compile Go. This means that certain 
packages ([net](http://www.golang.org/pkg/net) being the most notable) will 
take a performance hit.
