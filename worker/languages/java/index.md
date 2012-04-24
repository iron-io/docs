---
title: Writing Workers in Java
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['Java', '/java']
---

# Writing Workers in Java

## Quick Start

### Write your Java worker.

{% highlight java %}
public class HelloWorld {

    public static void main(String[] args) {
        System.out.println("Hello, World");
    }

}
{% endhighlight %}

### Compile your Java worker to a JAR file.

IronWorker runs JAR files that you upload to the cloud. You need to generate 
these JAR files first, however. It's likely your development environment 
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

{% highlight bash %}
javac HelloWorld.java
jar cfm hello.jar manifest.txt HelloWorld.class
{% endhighlight %}

A hello.jar file will now be in the same directory as your worker.

### Create a script to upload the worker.
{% highlight ruby %}
require 'iron_worker_ng'

client = IronWorkerNG::Client.new(:token => "TOKEN", :project_id => "PROJECT_ID")
code = IronWorkerNG::Code::Java.new(:name => "JavaWorker", :exec => 'path/to/hello.jar')
client.codes.create(code)
{% endhighlight %}

### Queue a task to the new worker.
{% highlight ruby %}
require 'iron_worker_ng'

client = IronWorkerNG::Client.new(:token => "TOKEN", :project_id => "PROJECT_ID")
task_id = client.tasks.create('JavaWorker')
{% endhighlight %}

## Deep Dive

### Payload Example

Retrieving the payload in Java is the same as it is on any other language. 
Retrieve the `-payload` argument passed to the script, load that file, and 
parse it as JSON. Java doesn't play nicely with JSON, so this takes a little 
more work than the other languages, but it shouldn't take too much effort.

First, you're going to need the [GSON](http://code.google.com/p/google-gson) 
library&mdash;this is a library that Google released that can take JSON and 
turn it into Java objects, and vice-versa. Go ahead and download the latest 
release, unzip it, and copy the gson-#.#.jar file to the directory your 
worker is in. Rename the jar file to gson.jar, to make life easier.

Next, we're going to modify your script to load the file and parse it as JSON:

{% highlight java %}
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
        JsonObject raw_params = parser.parse(payload).getAsJsonObject();

        //the iron_worker_ruby_ng library modifies the payload before sending it
        //the original payload you specified on upload lives in the "params" property
        JsonObject passed_args = raw_params.getAsJsonObject("params");

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
{% endhighlight %}

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

{% highlight bash %}
javac -cp ".:gson.jar" HelloWorld.java
{% endhighlight %}

If you're on Windows, that command looks a little different (Windows uses a 
different character to separate classpaths):

{% highlight bash %}
javac -cp ".;gson.jar" HelloWorld.java
{% endhighlight %}

Now we need to generate another jar file:

{% highlight bash %}
jar cfm hello.jar manifest.txt HelloWorld.class
{% endhighlight %}

Finally, we need to modify the upload script to include the `gson.jar` file 
in the code package it uploads. The new script is below:

{% highlight ruby %}
require 'iron_worker_ng'

client = IronWorkerNG::Client.new(:token => "TOKEN", :project_id => "PROJECT_ID")
code = IronWorkerNG::Code::Java.new(:name => "JavaWorker", :exec => 'path/to/hello.jar')
code.merge_file("path/to/gson.jar")

client.codes.create(code)
{% endhighlight %}

To pass arguments, just modify the code you're using to queue tasks to the 
worker:

{% highlight ruby %}
require 'iron_worker_ng'

client = IronWorkerNG::Client.new(:token => "TOKEN", :project_id => "PROJECT_ID")
task_id = client.tasks.create('JavaWorker', {:arg1 => "Test", :another_arg => ["apples", "oranges"]})
{% endhighlight %}
