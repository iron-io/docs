---
title: Writing Workers in Go
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['Go', '/go']
---

The [Go](http://www.golang.org) programming language is a fast, statically typed, compiled language with an emphasis on concurrency. It's a great language for cloud systems (we use it here at Iron.io!) and is a natural fit for workers.

Go Workers need to be compiled, then uploaded. Once they're uploaded to the 
IronWorker cloud, they can be invoked via a simple API to be put on the 
processing queues immediately or scheduled to run at a later time&mdash;you only need to upload the worker again when the code changes. This article will walk you through the specifics of things, but you should be familiar with the [basics of IronWorker](/worker).

**Note**: we don't use it for this walkthrough, but there's a great [library](https://github.com/iron-io/iron_go) for working with the IronWorker API in Go. If working with raw HTTP requests doesn't sound like fun to you, check it out.

## Quick Start

### Get The `iron_worker_ng` Gem

We've created a [command line interface](/worker/reference/cli) to the IronWorker service that makes working with the service a lot easier and more convenient. It does, however, require you to have Ruby 1.9+ installed and to install the `iron_worker_ng` gem. Once Ruby 1.9+ is installed, you can just the following command to get the gem:

<figcaption><span>Command Line </span></figcaption>
{% highlight bash %}
$ gem install iron_worker_ng
{% endhighlight %}

It is possible to use our [other client libraries](/worker/languages/#full_support) or even our [API](/worker/reference/api) to upload a package, but these samples will use the CLI.

### Write Your Go Worker

<figcaption><span>hello_worker.go </span></figcaption>
{% highlight go %}
package main

import "fmt"

func main() {
        fmt.Println("Hello World from Go.")
}
{% endhighlight %}

### Compile Your Go Worker To A Binary File

You may need to recompile Go with `GOOS=linux`, `GOARCH=amd64`, and 
`CGO_ENABLED=0` before you can [cross compile](#cross_compiling) from Windows, Mac, or a 32 bit 
machine.

{% highlight bash %}
GOOS=linux GOARCH=amd64 go build
{% endhighlight %}

### Create A .worker File

Worker files are a simple way to define your worker and its dependencies. Save the following in a file called `hello.worker`:

<figcaption><span>hello.worker </span></figcaption>
{% highlight ruby %}
# set the runtime language; this should be "binary" for Go workers
runtime "binary"
# exec is the file that will be executed when you queue a task
exec "hello_worker" # replace with your Go executable
{% endhighlight %}

### Create Your Configuration File

The CLI needs a configuration file or environment variables set that tell it what your credentials are. We have some [pretty good documentation](/worker/reference/configuration) about how this works, but for simplicity's sake, just save the following as `iron.json` in the same folder as your `.worker` file:

<figcaption><span>iron.json </span></figcaption>
{% highlight js %}
{
  "project_id": "INSERT YOUR PROJECT ID HERE",
  "token": "INSERT YOUR TOKEN HERE"
}
{% endhighlight %}

You should insert your [project ID](https://hud.iron.io) and [token](https://hud.iron.io/tokens) into that `iron.json` file. Then, assuming you're running the commands from within the folder, the CLI will pick up your credentials and use them automatically.

### Upload Your Worker

<figcaption><span>Command Line </span></figcaption>
{% highlight bash %}
$ iron_worker upload hello
{% endhighlight %}

That command will read your .worker file, create your worker code package and upload it to IronWorker.  Head over to [hud.iron.io](https://hud.iron.io), click the Worker link on your projects list, then click the Tasks tab. You should see your new worker listed there with zero runs. Click on it to show the task list which will be empty, but not for long.

Let’s quickly test it by running:

    iron_worker queue hello

Now look at the task list in HUD and you should see your task show up and go from "queued" to "running" to "completed".

Now that we know it works, let’s queue up a bunch of tasks from code. **Note**: Once you upload a code package, you can queue as many tasks as you'd like against it. You only need to re-upload the code package when your code changes.

### Queue Tasks To The New Worker

Once your code has been uploaded, it's easy to queue a task to it. It's a single, 
authenticated [POST request](/worker/reference/api/#queue_a_task) with a JSON 
object. The following program will queue up a task to your worker; just insert 
your token and project ID into the code.

<figcaption><span>enqueue.go </span></figcaption>
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

<figcaption><span>payload.go </span></figcaption>
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
