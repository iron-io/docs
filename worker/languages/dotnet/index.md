---
title: IronWorkers in .NET
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['.NET', '/dotnet']
---

<b>This approach uses our depreciated workflow. Please see <a href='https://github.com/iron-io/dockerworker/tree/master/mono'>https://github.com/iron-io/dockerworker/tree/master/mono</a> for the current process</b>

.NET is a framework from Microsoft that is the de-facto standard for writing software that runs on Windows, Windows Server, and Windows Phone. Now you can integrate your existing .NET codebase with IronWorker, without needing to learn a new language. This article will walk you through getting .NET workers running on IronWorker, but you should still take the time to familiarise yourself with the [basics of IronWorker](/worker).

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li>
      <a href="#quick_start">Quick Start</a>
      <ul>
        <li><a href="#get_the_cli">Get the CLI</a></li>
        <li><a href="#create_your_configuration_file">Create Your Configuration File</a></li>
        <li><a href="#write_your_net_worker">Write Your .NET Worker</a></li>
        <li><a href="#compile_your_net_worker">Compile Your .NET Worker</a></li>
        <li><a href="#create_a_worker_file">Create a .worker File</a></li>
        <li><a href="#upload_your_worker">Upload Your Worker</a></li>
        <li><a href="#queue_up_tasks_for_your_worker">Queue Up Tasks for Your Worker</a></li>
      </ul>
    </li>
    <li>
      <a href="#deep_dive">Deep Dive</a>
      <ul>
        <li><a href="#payload_example">Payload Example</a></li>
      </ul>
    </li>
  </ul>
</section>

<h2 id="quick_start">Quick Start</h2>

<h3 id="get_the_cli">Get the CLI</h3>

We've created a [command line interface](/worker/reference/cli) to the IronWorker service
that makes working with the service a lot easier and more convenient.
It does, however, require you to have Ruby 1.9+ installed and to install the `iron_worker_ng` gem.
Once Ruby 1.9+ is installed, you can just run the following command to get the gem:

<figcaption><span>Command Line </span></figcaption>


```sh
$ gem install iron_worker_ng
```

<h3 id="create_your_configuration_file">Create Your Configuration File</h3>

The CLI needs a configuration file or environment variables set that tell it what your credentials are. We have [documentation](/worker/reference/configuration) about how this works, but for simplicity's sake, just save the following as `iron.json` in the same folder as your `.worker` file:


```js
{
  "project_id": "INSERT YOUR PROJECT ID HERE",
  "token": "INSERT YOUR TOKEN HERE"
}
```

You should insert your [project ID](https://hud.iron.io) and [token](https://hud.iron.io/tokens) into that `iron.json` file. Then, assuming you're running the commands from within the folder, the CLI will pick up your credentials and use them automatically.

<h3 id="write_your_net_worker">Write Your .NET Worker</h3>

```c#
public class HelloWorld
{
    static public void Main(string[] args)
    {
        System.Console.WriteLine( "Hello World from .NET!" );
    }

}
```

<h3 id="compile_your_net_worker">Compile Your .NET Worker</h3>

For .NET code, IronWorker runs the compiled executables in the cloud, so you're going to need to generate the executable. It's likely your development environment (e.g. Visual Studio) has a simple way to do this; that will work just fine. If you're a Mono users, use `gmcs`:



```sh
gmcs hello.cs
```

<h3 id="create_a_worker_file">Create a .worker File</h3>

Worker files are a simple way to define your worker and its dependencies. Save the following in a file called `hello.worker`:


```ruby
# set the runtime language; this should be "mono" for .NET workers
runtime "mono"
# exec is the file that will be executed when you queue a task
exec "hello.exe" # replace with your file
```

<h3 id="upload_your_worker">Upload Your Worker</h3>

```sh
iron_worker upload hello
```

That command will read your .worker file, create your worker code package and upload it to IronWorker.  Head over to [hud.iron.io](https://hud.iron.io), click the Worker link on your projects list, then click the Tasks tab. You should see your new worker listed there with zero runs. Click on it to show the task list, which will be empty, but not for long.

Let’s quickly test it by running:

```sh
iron_worker queue hello
```

Now look at the task list in [HUD](https://hud.iron.io) and you should see your task show up and go from "queued" to "running" to "completed".

Now that we know it works, let’s queue up a bunch of tasks from code. **Note**: Once you upload a code package, you can queue as many tasks as you'd like against it. You only need to re-upload the code package when your code changes.

<h3 id="queue_up_tasks_for_your_worker">Queue Up Tasks for Your Worker</h3>

Once your code has been uploaded, it's easy to queue a task to it. It's a single,
authenticated [POST request](/worker/reference/api/#queue_a_task) with a JSON
object. The example below queues up a task for your worker. Just insert your
project ID and token at the bottom (that third argument is the name of your worker).

```c#
using System;
using System.Net;

public class QueueTask
{
    private static string queue_task(string projectId, string token, string worker)
    {
        string uri = "https://worker-aws-us-east-1.iron.io:443/2/projects/" + projectId + "/tasks";
        HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create(uri);
        request.ContentType = "application/json";
        request.Headers.Add("Authorization", "OAuth " + token);
        request.UserAgent = "IronMQ .Net Client";
        request.Method = "POST";
        // We hand code the JSON payload here. You can automatically convert it, if you prefer
        string body = "{\"tasks\": [ { \"code_name\": \"" + worker + "\", \"payload\": \"{\\\"key\\\": \\\"value\\\", \\\"fruits\\\": [\\\"apples\\\", \\\"oranges\\\"]}\"} ] }";
        if (body != null)
        {
            using (System.IO.StreamWriter write = new System.IO.StreamWriter(request.GetRequestStream()))
            {
                write.Write(body);
                write.Flush();
            }
        }
        HttpWebResponse response = (HttpWebResponse)request.GetResponse();

        using (System.IO.StreamReader reader = new System.IO.StreamReader(response.GetResponseStream()))
        {
            return reader.ReadToEnd();
        }
    }

    static public void Main(string[] args)
    {
        Console.WriteLine(queue_task("INSERT PROJECT ID", "INSERT TOKEN", "hello"));
    }
}
```

Save this as "enqueue.cs", compile it, and run it to queue up the task to your worker. You should get a response similar to this:


```js
{"msg":"Queued up","tasks":[{"id":"506e1a8e29a33a57650db95d"}]}
```

For most people, calling the API by hand is overkill. We don't have an official IronWorker library for .NET yet, but our community has built a great project for interacting with our APIs. If you're using Iron.io from .NET, you may wish to check out [IronTools](https://github.com/odeits/IronTools).

**Note:** One of our customers, [Oscar Deits](https://github.com/odeits) lent us his considerable expertise with .NET as we came up with this sample code. Thanks Oscar!

<h2 id="deep_dive">Deep Dive</h2>

<h3 id="payload_example">Payload Example</h3>

Retrieving the payload in .NET is the same as it is on any other language.
Retrieve the `-payload` argument passed to the script, load that file, and
parse it as JSON. **Note**: This script only parses payloads that consist of strings in a key/value pair. Implementing more advanced parsing is an exercise left to the reader.

```c#
using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using System.Web.Script.Serialization;

public class HelloWorld
{
    static public void Main(string[] args)
    {
        int ind = Array.IndexOf(args, "-payload");
        if( ind >= 0 && (ind+1) < args.Length ){
            string path = args[ind+1];
            string payload = File.ReadAllText(path);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            IDictionary<string,string> json = serializer.Deserialize <Dictionary<string, string>>(payload);
            foreach (string key in json.Keys)
            {
                Console.WriteLine( key + " = " + json[key] );
            }
        }
    }

}
```

You'll notice that we're using the `System.Web.Script` assembly in the payload example; you'll need to specify that when compiling the binary. `System.Web.Script` lives in System.Web.Extensions.dll, so the command looks like this:



```sh
gmcs payloadworker.cs -r:System.Web.Extensions.dll
```
