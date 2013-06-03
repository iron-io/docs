---
title: Local Disk Storage
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['Disk Storage', '/disk-storage']
---

Workers can make use of a [large amount](/worker/reference/environment/) of local temporary storage space that's dedicated on a per-worker basis. You can perform almost any file operations with it that you could within a local environment.

You access this storage by making use of the `PWD` environment variable in the worker. This contains the path of the directory your worker has write access to.

## Saving Files to Disk

Here's an example that downloads a file from the web and saves it in local storage. The end snippet just logs the contents of your worker's directory.

<figcaption><span>local_file.rb </span></figcaption>
{% highlight ruby %}
require 'open-uri'

filepath = ENV["PWD"] + "/ironman.jpg"

File.open(filepath, 'wb') do |fo|
  fo.write open("http://www.iron.io/assets/banner-scale-robot.png").read
end

user_files = %x[ls #{ENV['PWD']}]
puts  "\nLocal Temporary Storage ('ENV[\"PWD\"]')"
puts "#{user_files}"

{% endhighlight ruby %}

## Location of Uploaded Files and Folders

Your local storage directory also contains any uploaded files that you've included with your code. Note that any folders or nested files will appear at the top level.

For example, let's say you upload a file with the following structure:

{% highlight ruby %}
merge "../site_stats/client.rb"
{% endhighlight ruby %}

This file will be placed in your local storage directory. You can make use of it there, create local/remote path references (using the local/remote query switch in your worker), or replicate the path and move the file there. (We recommend one of the first two options.)

<pre class="grey-box fixed-width">
$PWD/
  ...
  client.rb
  ...
</pre>

In Ruby, to make use of the file (in the case of a code file), you would use a `require_relative` statement with the base path.

{% highlight ruby %}
 require_relative './client'
{% endhighlight ruby %}

## Use Cases

Typical use cases might include:

* Downloading a large product catalog or log file, parsing it, processing the data, and inserting the new data into a database
* Downloading an image from S3, modifying it, and re-uploading it,
* Splitting up a large video file or the results of a website crawl in S3, then creating and queuing multiple workers to process each video or page slice.

##Best Practices

This is temporary storage and only available while the worker is running. You'll want to make use of databases and object stores to persist any data the worker produces.

We recommend that you not pass any large data objects or data files in to workers, but instead use object storage solutions like [AWS S3](http://aws.amazon.com/s3/) or databases. To do this, just upload your data to S3 or store it in the database from your app, then pass the **identifier of the object** to the worker. The worker can then access the data from the data store. This is more efficient in terms of worker management and better for exception handling.

## Examples

You can find more examples of making use of local disk storage here:

* [Image Processing Example](https://github.com/iron-io/iron_worker_examples/blob/master/ruby/Image_processing/image_processor.rb) on Github
* [Image Processing Example with Carrierwave](https://github.com/iron-io/iron_worker_examples/tree/master/ruby/carrierwave) on Github
* [S3 Example](https://github.com/iron-io/iron_worker_examples/blob/master/ruby/s3_tester/s3_worker.rb) on Github
* [S3 Example 2](https://github.com/iron-io/iron_worker_examples/tree/master/ruby/download_to_s3) on Github
