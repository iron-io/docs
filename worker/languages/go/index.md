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

Go is only currently supported at the [Working](/worker/languages) level; this 
means that no special tools exist for making it easier to run Go workers yet. 
We're working on it, but in the meantime, you have two options: use another 
client library or interact with the [API](/worker/reference/api) manually. 
We're going to show how to upload your code using the `iron_worker_ng` Ruby 
gem and how to queue tasks using raw API calls.

To get the `iron_worker_ng` gem, make sure you have Ruby installed and run the 
following command:

{% highlight bash %}
gem install iron_worker_ng
{% endhighlight %}

### Write your Go worker.

{% highlight go %}
package main

import "fmt"

func main() {
        fmt.Println("Hello World from Go.")
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

Insert your token, project ID , and the path to your Go executable into the 
following script and save it as something like "upload.rb":

{% highlight ruby %}
require 'iron_worker_ng'

client = IronWorkerNG::Client.new(:token => "TOKEN", :project_id => "PROJECT_ID")
code = IronWorkerNG::Code::Binary.new(:name => "GoWorker", :exec => 'PATH TO EXECUTABLE')
client.codes.create(code)
{% endhighlight %}

Run `ruby upload.rb` (or whatever you saved th script as) and it will upload 
your code to the IronWorker cloud. You can then queue tasks against the code 
from whatever client you want, including raw API calls (which we'll show below).

### Queue a task to the new worker.

Once your code has been uploaded, it's easy to queue a task to it. It's a single, 
authenticated [POST request](/worker/reference/api/#queue_a_task) with a JSON 
object. The following program will queue up a task to your worker; just insert 
your token and project ID into the code.

{% highlight go %}
package main

import (
        "fmt"
        "net/http"
        "io/ioutil"
        "encoding/json"
        "bytes"
)

type Task struct {
        CodeName string `json:"code_name"`
        Payload string `json:"payload"`
}

type ReqData struct {
        Tasks []*Task `json:"tasks"`
}

func main() {
        const token = "INSERT TOKEN HERE"
        const project = "INSERT PROJECT ID HERE"

        // Insert our project ID and token into the API endpoint
        target := fmt.Sprintf("http://worker-aws-us-east-1.iron.io/2/projects/%s/tasks?oauth=%s", project, token)

        // Build the payload
        // The payload is a string to pass information into your worker as part of a task
        // It generally is a JSON-serialized string (which is what we're doing here) that can be deserialized in the worker
        payload := map[string]interface{} {
                "arg1": "Test",
                "another_arg": []string{"apples", "oranges"},
        }
        payload_bytes, err := json.Marshal(payload)
        if err != nil {
                panic(err.Error())
        }
        payload_str := string(payload_bytes)

        // Build the task
        task := &Task {
                CodeName: "GoWorker",
                Payload: payload_str,
        }

        // Build a request containing the task
        json_data := &ReqData {
                Tasks: []*Task { task },
        }
        json_bytes, err := json.Marshal(json_data)
        if err != nil {
                panic(err.Error())
        }
        json_str := string(json_bytes)

        // Post expects a Reader
        json_buf := bytes.NewBufferString(json_str)

        // Make the request
        resp, err := http.Post(target, "application/json", json_buf)
        if err != nil {
                panic(err.Error())
        }
        defer resp.Body.Close()

        // Read the response
        resp_body, err := ioutil.ReadAll(resp.Body)
        if err != nil {
                panic(err.Error())
        }

        // Print the response to STDOUT
        fmt.Println(string(resp_body))
}
{% endhighlight %}

Save this as "enqueue.go" and use `go run enqueue.go` to queue up the task for 
your worker. You should get a response similar to this:

{% highlight js %}
{"msg":"Queued up","status_code":200,"tasks":[{"id":"4f9b51631bab47589b017391"}]}
{% endhighlight %}

If you check in the [HUD](https://hud.iron.io), you should see the task.

## Deep Dive

### Payload Example

Retrieving the payload from within the worker on Go is the same as it is on any 
other language. Retrieve the `-payload` argument passed to the script, load that 
file, and parse it as JSON.

{% highlight go %}
package main

import (
        "io/ioutil"
        "os"
        "fmt"
        "encoding/json"
)

func main() {
        payloadIndex := 0
        for index, arg := range(os.Args) {
                if arg == "-payload" {
                        payloadIndex = index + 1
                }
        }
        if payloadIndex >= len(os.Args) {
                panic("No payload value.")
        }
        payload := os.Args[payloadIndex]
        var data interface{}
        raw, err := ioutil.ReadFile(payload)
	if err != nil {
		panic(err.Error())
	}

	err = json.Unmarshal(raw, &data)
	if err != nil {
		panic(err.Error())
	}
        fmt.Printf("%v\n", data)
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
