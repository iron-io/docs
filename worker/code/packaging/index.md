---
title: Packaging
layout: default
section: worker
breadcrumbs:
  - ['Code', '/code']
  - ['Packaging', '/packaging']
---

# Packaging Code for IronWorker

This section will explain how to develop client code to upload to this endpoint. The examples are in Ruby,
but would apply to any language.

Let's start with an extremely simple example, let's say all we wanted to do was run:

{% highlight ruby %}
puts "Hello World!"
{% endhighlight %}

Put that in a file called hello.rb.

## Loading the Task Data Payload

When your code is executed on IronWorker, it will be given six program arguments (3 keys and 3 values).

### Program Arguments

-id: The task id.
-payload: the filename containing the data payload for this particular task.
-d: the user writable directory that can be used while running your job.

Here is a ruby example of obtaining this information (this is from the simple_worker ruby gem):

{% highlight ruby %}
payload_file = nil
task_id = nil
ARGV.each do |arg|
  if arg == \"-d\"
    dirname = ARGV[i+1]
  end
  if arg == \"-id\"
    task_id = ARGV[i+1]
  end
  if arg == \"-payload\"
    payload_file = ARGV[i+1]
  end
  i+=1
end

# Now load in job data
require 'json'
payload = JSON.load(File.open(payload_file))
{% endhighlight %}

## Packaging Code

test

Code must be submitted as a zip file containing all of the necessary files to execute.

{% highlight ruby %}
# this method will create a zip file given an array of file names.
def package_code(files)
  fname = "package.zip"
  Zip::ZipFile.open(fname, 'w') do |f|
    files.each do |file|
      f.add(file, file)
    end
  end
  fname
end

zip_filename = package_code(\['hello.rb'\])
{% endhighlight %}

So now we have a zip file containing the code we want to execute on IronWorker.

## Uploading Code

Now we need to upload this package to IronWorker so we can start using it for our tasks.
For this, we use the Tasks Upload method of the API. In this example, we'll use the Ruby gem to make it easier.

{% highlight ruby %}
@sw.upload_code('hello', zip_filename, 'hello.rb', :runtime=>'ruby')
{% endhighlight %}

This is a method that exists in the iron_worker gem already that takes a name ('hello'), the zip filename from the
packaging step above, the name of the file to execute ('hello.rb') and the runtime to execute it with.

Now that it's uploaded, we can queue up a job to use it.

## Running a Job Using Your Code

Now we simply queue up a task that uses our 'hello' code.

{% highlight ruby %}
@sw.queue('hello')
{% endhighlight %}

## Conclusion

That's the very basics, but should give you an idea of how to get started.

