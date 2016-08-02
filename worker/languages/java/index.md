---
title: IronWorkers in Java
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['Java', '/java']
---


<b>This approach uses our depreciated workflow. Please see <a href='https://github.com/iron-io/dockerworker/tree/master/java'>https://github.com/iron-io/dockerworker/tree/master/java</a> for the current process</b>

.Java has become one of the most popular languages in the enterprise. With Java workers, you can use the same tools your enterprise software uses, but with the power of the cloud behind it.

Java workers need to be compiled into jar files before they're uploaded. Once they're uploaded to the IronWorker cloud, they can be invoked via a simple API call to be put on the processing queues immediately or scheduled to run at a later time&mdash;you only need to upload the worker again when the code changes. This article will walk you through the specifics of using Java workers, but you should be familiar with the [basics of IronWorker](/worker).

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li>
      <a href="#quick_start">Quick Start</a>
      <ul>
        <li><a href="#get_the_cli">Get the CLI</a></li>
        <li><a href="#create_your_configuration_file">Create Your Configuration File</a></li>
        <li><a href="#write_your_java_worker">Write Your Java Worker</a></li>
        <li><a href="#compile_your_java_worker_to_a_jar_file">Compile Your Java Worker to a jar File</a></li>
        <li><a href="#create_a_worker_file">Create a .worker File</a></li>
        <li><a href="#upload_your_worker">Upload Your Worker</a></li>
        <li><a href="#queue_up_tasks_for_your_worker">Queue Up Tasks for Your Worker</a></li>
      </ul>
    </li>
    <li>
      <a href="#deep_dive">Deep Dive</a>
      <ul>
        <li><a href="#payload_example">Payload Example</a></li>
        <li><a href="#get_gson">Get GSON</a></li>
        <li><a href="#modify_the_worker">Modify The Worker</a></li>
        <li><a href="#recompile_the_jar_file">Recompile the jar File</a></li>
        <li><a href="#update_the_worker_file_and_reupload">Update the .worker File and Reupload</a></li>
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

The CLI needs a configuration file or environment variables set that tell it what your credentials are. We have some [pretty good documentation](/worker/reference/configuration) about how this works, but for simplicity's sake, just save the following as `iron.json` in the same folder as your `.worker` file:

<figcaption><span>iron.json </span></figcaption>

```js
{
  "project_id": "INSERT YOUR PROJECT ID HERE",
  "token": "INSERT YOUR TOKEN HERE"
}
```

You should insert your [project ID](https://hud.iron.io) and [token](https://hud.iron.io/tokens) into that `iron.json` file. Then, assuming you're running the commands from within the folder, the CLI will pick up your credentials and use them automatically.

<h3 id="write_your_java_worker">Write Your Java Worker</h3>

<figcaption><span>HelloWorld.java </span></figcaption>

```java
public class HelloWorld {

    public static void main(String[] args) {
        System.out.println("Hello World from Java");
    }

}
```

<h3 id="compile_your_java_worker_to_a_jar_file">Compile Your Java Worker to a jar File</h3>

IronWorker runs jar files that you upload to the cloud. You need to generate
these jar files first, however. It's likely your development environment
already has a simple method for generating these files, but in case it doesn't,
you can generate them from the command line.

First, create a `manifest.txt` file in the same directory as your Worker.
Put the following in it:

<div class="grey-box">
<pre>
Main-Class: HelloWorld
</pre>
</div>

Then run the following commands:

<figcaption><span>Command Line </span></figcaption>


```sh
$ javac HelloWorld.java
$ jar cfm hello.jar manifest.txt HelloWorld.class
```

A hello.jar file will now be in the same directory as your worker.

<h3 id="create_a_worker_file">Create a .worker File</h3>

Worker files are a simple way to define your worker and its dependencies. Save the following in a file called `hello.worker`:

<figcaption><span>hello.worker </span></figcaption>

```ruby
# set the runtime language; this should be "java" for Java workers
runtime "java"
# exec is the file that will be executed when you queue a task
exec "hello.jar" # replace with your jar file
```

<h3 id="upload_your_worker">Upload Your Worker</h3>

<figcaption><span>Command Line </span></figcaption>


```sh
$ iron_worker upload hello
```

That command will read your .worker file, create your worker code package and upload it to IronWorker.  Head over to [hud.iron.io](https://hud.iron.io), click the Worker link on your projects list, then click the Tasks tab. You should see your new worker listed there with zero runs. Click on it to show the task list which will be empty, but not for long.

Let’s quickly test it by running:

    iron_worker queue hello

Now look at the task list in HUD and you should see your task show up and go from "queued" to "running" to "completed".

Now that we know it works, let’s queue up a bunch of tasks from code. **Note**: Once you upload a code package, you can queue as many tasks as you'd like against it. You only need to re-upload the code package when your code changes.

<h3 id="queue_up_tasks_for_your_worker">Queue Up Tasks for Your Worker</h3>

Once your code has been uploaded, it's easy to queue a task to it. The following
example will queue up a task using the [`iron_worker_java`](https://github.com/iron-io/iron_worker_java) library. Just insert
your token and project ID into the code.

<figcaption><span>Enqueue.java </span></figcaption>

```java
import io.iron.ironworker.client.Client;
import io.iron.ironworker.client.entities.TaskEntity;
import io.iron.ironworker.client.builders.Params;
import io.iron.ironworker.client.builders.TaskOptions;
import io.iron.ironworker.client.APIException;

public class Enqueue {
        public static void main(String[] args) throws APIException{
                Client client = new Client("INSERT TOKEN HERE", "INSERT PROJECT ID HERE");
                TaskEntity t = client.createTask("JavaWorker", Params.add("arg1", "Test").add("another_arg", new String[]{"apples", "oranges"}));
                System.out.println(t.getId());
        }
}
```

Save that as "Enqueue.java" and compile it. Run the compiled code (usually
`java Enqueue`, but your IDE may have an easier way to run your code) and you'll
see the queued task's ID printed.

<h2 id="deep_dive">Deep Dive</h2>

<h3 id="payload_example">Payload Example</h3>

Retrieving the payload in Java is largely the same as it is on any other
language. Retrieve the `-payload` argument passed to the script, load that file,
and parse it as JSON. Java doesn't play nicely with JSON, however, so this takes
a little more work for Java than it does for the other languages.

<h4 id="get_gson">Get GSON</h4>

First, you're going to need the [GSON](http://code.google.com/p/google-gson)
library&mdash;this is a library that Google released that can take JSON and
turn it into Java objects, and vice-versa. Go ahead and download the latest
release, unzip it, and copy the gson-#.#.jar file to the directory your
worker is in. Rename the jar file to gson.jar, to make life easier.

<h4 id="modify_the_worker">Modify The Worker</h4>

Next, we're going to modify your worker to load the file and parse it as JSON:

<figcaption><span>Enqueue.java </span></figcaption>

```java
import java.io.File;
import java.io.IOException;
import java.io.FileInputStream;
import java.nio.MappedByteBuffer;
import java.nio.charset.Charset;
import java.nio.channels.FileChannel;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;

public class HelloWorld {

    public static void main(String[] args) {
        //obtain the filename from the passed arguments
        int payloadPos = -1;
        for(int i=0; i < args.length; i++) {
                if(args[i].equals("-payload")) {
                        payloadPos = i + 1;
                        break;
                }
        }
        if(payloadPos >= args.length) {
                System.err.println("Invalid payload argument.");
                System.exit(1);
        }
        if(payloadPos == -1) {
                System.err.println("No payload argument.");
                System.exit(1);
        }

        //read the contents of the file to a string
        String payload = "";
        try {
                payload = readFile(args[payloadPos]);
        } catch (IOException e) {
                System.err.println("IOException");
                System.exit(1);
        }

        //The string looks like this:
        // { "arg1": "Test", "another_arg": ["apples", "oranges"]}

        //parse the string as JSON
        Gson gson = new Gson();
        JsonParser parser = new JsonParser();
        JsonObject passed_args = parser.parse(payload).getAsJsonObject();

        //print the output of the "arg1" property of the passed JSON object
        System.out.println("arg1 = " + gson.fromJson(passed_args.get("arg1"), String.class));

        //the "another_arg" property is an array, so parse it as one
        String[] another_arg = gson.fromJson(passed_args.get("another_arg"), String[].class);
        //print the first and second elements of the array
        System.out.println("another_arg[0] = " + another_arg[0]);
        System.out.println("another_arg[1] = " + another_arg[1]);
    }

    private static String readFile(String path) throws IOException {
        FileInputStream stream = new FileInputStream(new File(path));
        try {
                FileChannel chan = stream.getChannel();
                MappedByteBuffer buf = chan.map(FileChannel.MapMode.READ_ONLY, 0, chan.size());
                return Charset.defaultCharset().decode(buf).toString();
        }
        finally {
                stream.close();
        }
    }
}
```

<h4 id="recompile_the_jar_file">Recompile the jar File</h4>

We're going to have to modify that `manifest.txt` file before we can use the
GSON jar, though, so replace `manifest.txt` with the following:

<div class="grey-box">
<pre>
Main-Class: HelloWorld
Class-Path: gson.jar
</pre>
</div>

Next we need to compile the Java file, but we need to insert the `gson.jar`
file into the classpath on compile, so the compiler can find it. Use this new
command:

<figcaption><span>Command Line </span></figcaption>


```sh
$ javac -cp ".:gson.jar" HelloWorld.java
```

If you're on Windows, that command looks a little different (Windows uses a
different character to separate classpaths):

<figcaption><span>Command Line </span></figcaption>


```sh
$ javac -cp ".;gson.jar" HelloWorld.java
```

Now we need to generate another jar file:

<figcaption><span>Command Line </span></figcaption>


```sh
$ jar cfm hello.jar manifest.txt HelloWorld.class
```

<h4 id="update_the_worker_file_and_reupload">Update the .worker File and Reupload</h4>

Finally, we need to modify the `.worker` file to include the `gson.jar` file
in the code package it uploads. The new file is below:

<figcaption><span>HelloWorld.worker </span></figcaption>

```ruby
# set the runtime language; this should be "java" for Java workers
runtime "java"
# exec is the file that will be executed when you queue a task
exec "hello.jar" # replace with your jar file
# file includes a file
file "path/to/gson.jar" # replace with the path to your gson.jar file
```

Upload that again by running the following command:

<figcaption><span>Command Line </span></figcaption>


```sh
$ iron_worker upload hello
```

Your worker will start printing out the contents of the payload.
