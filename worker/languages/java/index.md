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

{% highlight manifest %}
Main-Class: HelloWorld
{% endhighlight %}

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
code = IronWorkerNG::Code::Java.new(:name => "JavaWorker",
        :worker => 'path/to/hello.jar')
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
parse it as JSON.

{% highlight java %}
import java.io.File;
import java.io.IOException;
import java.io.FileInputStream;
import java.nio.MappedByteBuffer;
import java.nio.charset.Charset;
import java.nio.channels.FileChannel;

public class HelloWorld {

    public static void main(String[] args) {
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

        String payload = "";
        try {
                payload = readFile(args[payloadPos]);
        } catch (IOException e) {
                System.err.println("IOException");
                System.exit(1);
        }
        System.out.println(payload);
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
