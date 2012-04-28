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

Go is only currently supported at the [Working](/worker/languages) level; this 
means that no special tools exist for making it easier to run Go workers yet. 
We're working on it, but in the meantime, you have two options: use another 
client library (there's an example of using `iron_worker_ng` [here](/worker/languages/go/using-ng)), 
or interact with the [API](/worker/reference/api) manually. We're going to make 
the API calls manually in these examples.

First, we need to create a configuration file. It's a good idea to do this to 
separate out your project ID and tokens from your code (which prevents sensitive 
information from getting committed into a public repository). It also lets you 
define these variables once and reuse them in all your interactions with the API.

Your configuration file should look like this:

{% highlight js %}
{
  "token": "aRJsg9...",
  "project_id": "JpoAig..."
}
{% endhighlight %}

Substitute your own values, obviously, and save this as "config.json" in the same 
directory as your executable.

Next, we're going to need a `__runner__.sh` script. IronWorker actually executes 
Go code by calling a shell script, so we need to create a shell script that will 
execute our Go worker. You can technically save this script as anything, but our 
client libraries have standardised around "__runner__", so we're going to mimic 
them here.

The script below switches to the worker's directory, makes your worker executable, 
and runs it.

{% highlight bash %}
#!/bin/sh

root() {
  while [ $# -gt 0 ]; do
    if [ "$1" = "-d" ]; then
      printf "%s\n" "$2"
      break
    fi
  done
}

cd "$(root "$@")"

chmod +x "worker"

./"worker" "$@"
{% endhighlight %}

Note that if your executable (from compiling your worker) is not named "worker", 
you need to change every instance of "worker" in that script to match the name 
of the executable. Make sure you quote it!

Next, we need to zip the executable and our shell script. The API expects only 
a single package for all your code. Use your favourite method of generating a 
zip file to package your executable and `__runner__.sh` together. Name the zip 
"worker.zip" and place it in the same directory as your executable. **Important:** 
make sure both files end up in the root of the zip file!

**Note:** Be sure you're *zipping* the files, not using 7z, tar.gz, or any other 
compression algorithm. The file should end in ".zip".

Finally, we need to upload the zip file with some JSON data. Here's an example 
Go script that does that:

{% highlight go %}
package main

import (
        "fmt"
        "net/http"
        "mime/multipart"
        "bytes"
        "os"
        "io"
        "io/ioutil"
        "encoding/json"
)

type ReqData struct {
        Name string `json:"name"`
        FileName string `json:"file_name"`
        Runtime string `json:"runtime"`
}

type Config struct {
        Token string `json:"token"`
        Project string `json:"project_id"`
        WorkerName string `json:"worker_name"`
        Zip string `json:"zip"`
}

func getConfig() (cfg *Config) {
        config_str, err := ioutil.ReadFile("config.json")
        if err != nil {
                panic(err.Error())
        }
        err = json.Unmarshal(config_str, &cfg)
        if err != nil {
                panic(err.Error())
        }
        if cfg.Token == "" {
                panic("Missing token in configuration file.")
        }
        if cfg.Project == "" {
                panic("Missing project_id in configuration file.")
        }
        // You can name workers on IronWorker. Add a "worker" property to your config file and watch what happens
        if cfg.WorkerName == "" {
                cfg.WorkerName = "GoWorker"
        }
        // If your zip file isn't named worker.zip, add a "zip" property to your config file with the name of the zip file
        if cfg.Zip == "" {
                cfg.Zip = "worker.zip"
        }
        return
}

func main() {
        // Read in the config.json
        cfg := getConfig()
        
        // Insert our project ID and token into the API endpoint
        target := fmt.Sprintf("http://worker-aws-us-east-1.iron.io/2/projects/%s/codes?oauth=%s", cfg.Project, cfg.Token)

        // Build the JSON data for the request
        json_data := &ReqData {
                Name: cfg.WorkerName,
                FileName: "__runner__.sh",
                Runtime: "sh",
        }
        json_bytes, err := json.Marshal(json_data)
        if err != nil {
                panic(err.Error())
        }
        json_str := string(json_bytes)

        // Create the request object
        body_buf := bytes.NewBufferString("")
        body_writer := multipart.NewWriter(body_buf)

        // Add the zip to the request object
        file_writer, err := body_writer.CreateFormFile("file", cfg.Zip)
        if err != nil {
                panic(err.Error())
        }
        fh, err := os.Open(cfg.Zip)
        if err != nil {
                panic(err.Error())
        }
        io.Copy(file_writer, fh)

        // Add the json data to the request object
        body_writer.WriteField("data", json_str)

        // Copy the content type of the request
        // Note: You can't manually just set this to "multipart/form-data"
        // We need the multipart boundary, as well, which is randomly generated
        content_type := body_writer.FormDataContentType()
        
        // Actually make the request
        body_writer.Close()
        resp, err := http.Post(target, content_type, body_buf)
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

If you save this script as "upload.go" and call `go run upload.go`, you should 
get a response similar to this:

{% highlight js %}
{"msg":"Upload successful.","status_code":200}
{% endhighlight %}

Congratulations, your code has been uploaded. You're now ready to give it tasks.

### Queue a task to the new worker.

Once your code has been uploaded, it's easy to queue a task to it. It's a single, 
authenticated [POST request](/worker/reference/api/#queue_a_task) with a JSON 
object. Here's a script that queues up a task to your new worker, using the same 
`config.json` file you created to upload the worker:

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

type Config struct {
        Token string `json:"token"`
        Project string `json:"project_id"`
        WorkerName string `json:"worker_name"`
        Zip string `json:"zip"`
}

func getConfig() (cfg *Config) {
        config_str, err := ioutil.ReadFile("config.json")
        if err != nil {
                panic(err.Error())
        }
        err = json.Unmarshal(config_str, &cfg)
        if err != nil {
                panic(err.Error())
        }
        if cfg.Token == "" {
                panic("Missing token in configuration file.")
        }
        if cfg.Project == "" {
                panic("Missing project_id in configuration file.")
        }
        // You can name workers on IronWorker. Add a "worker" property to your config file and watch what happens
        if cfg.WorkerName == "" {
                cfg.WorkerName = "GoWorker"
        }
        // If your zip file isn't named worker.zip, add a "zip" property to your config file with the name of the zip file
        if cfg.Zip == "" {
                cfg.Zip = "worker.zip"
        }
        return
}

func main() {
        // Read in the config.json
        cfg := getConfig()

        // Insert our project ID and token into the API endpoint
        target := fmt.Sprintf("http://worker-aws-us-east-1.iron.io/2/projects/%s/tasks?oauth=%s", cfg.Project, cfg.Token)

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
                CodeName: cfg.WorkerName,
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
