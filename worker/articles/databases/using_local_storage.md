---
title: Using Local Disk Storage
layout: default
section: worker
breadcrumbs:
  - ['Articles', '/articles']
  - ['How To', '/how_to']
---

##Local Temporary Storage
Workers can make use of a [large amount](http://docs-beta.iron.io/worker/reference/environment/) of local temporary storage space, that's dedicated on a per-worker basis. You can perform almost any file operations with it just as you might within a local environment. 

You access this storage by making use of the var `user_dir` in the worker. This var provides the path of the directory your worker has write access to.

Here's an example takes a file from the web and saves it in local storage.(The log snippet just logs the contents of `user_dir`.)

<pre>
class S3Worker < IronWorker::Base

  filepath = user_dir + "ironman.jpg"
  File.open(filepath, 'wb') do |fo|
    fo.write open("http://fitnessgurunyc.com/wp/wp-content/uploads/2010/12/ironman74.jpg").read
  end

  user_files = %x[ls #{user_dir.inspect}]
  log "\nLocal Temporary Storage ('user_dir')"
  log "#{user_files}"

end
</pre>

###Location of Uploaded Files and Folders
The `user_dir` directory also contains any uploaded files that you've included with your code. Note that any folders or nested files will appear at the top level. 

For example, let's say you upload a file with the following structure:

<pre>
merge "../site_stats/client.rb"
</pre>

This file will be placed in the `user_dir` directory. You can make use of it there, create local/remote path references (using the local/remote query switch in your worker), or replicate the path and move the file there. (We recommend one of the first two options.)

<pre>
user_dir/
  ...
  client.rb
  ...
</pre>

In Ruby, to make use of the file (in the case of a code file), you would use a `require_relative` statement with the base path.

<pre>
 require_relative './client'
</pre>

###Use Cases
Typical use cases might include:

* downloading a multi-megabyte product catalog or log file, parsing it, processing the data, and inserting the new data into a database
* downloading an image from S3, modifying it, and re-uploading it,
* splitting up a large video file or the results of a website crawl in S3 and then creating and queuing multiple workers to process each video or page slice.

###Best Practices
This is temporary storage and only available while the worker is running and so you'll want to make use of databases and object stores to persist any data the worker produces.

We recommend that you not pass in to workers any large data objects or data files but instead use object storage solutions like AWS S3 or databases. Upload to S3/store in the DB outside of the worker and then pass the **identifier of the object** to the worker. The worker can then access the data from the data store. This is more efficient in terms of worker management and also better for exception handling. 


###Examples
You can find more examples of making use of local temp storage here: 

* [Image Processing Example](https://github.com/iron-io/iron_worker_examples/blob/master/ruby/Image_processing/image_processor.rb) on Github
* [Image Processing Example w/Carrierwave](https://github.com/iron-io/iron_worker_examples/tree/master/ruby/carrierwave) on Github 
* [S3 Example](https://github.com/iron-io/iron_worker_examples/blob/master/ruby/s3_tester/s3_worker.rb) on Github
* [S3 Example2](https://github.com/iron-io/iron_worker_examples/tree/master/ruby/download_to_s3) on Github


