---
title: Using Local Disk Storage
layout: default
section: worker
breadcrumbs:
  - ['Start', '/start']
  - ['Configuration', '/configuration']
---

##Workers Queueing Other Workers
A common worker pattern is to have one worker queue or schedule one or more other workers. An example is a scheduled task that runs periodically to process data being stored in a database or on a queue (the scheduled time could vary depending the load). When the scheduled task runs, it creates one or more workers to process the data -- passing indices to the data slices or messages ids as part of the data payload. 

Doing this within IronWorker is pretty easy. All you need to do is upload the workers to IronWorker and then the master worker can queue or schedule the slave worker just by using the worker name. 

In Application or Runner Code
    upload master_worker
    upload slave_worker

In MasterWorker
    create slave_worker instance
    assign iron_worker config
    assign params
    queue/schedule slave_worker



###Client Libraries
There are some convenience methods in some of client libraries that facilitate the upload and queueing/scheduling of the slave workers.

<pre>
require 'iron_worker'

class MasterWorker < IronWorker::Base

  merge_worker './status_processor.rb', 'StatusProcessor'

  def run
    slave_worker = StatusProcessor.new
    slave_worker.queue
  end
end
</pre>


###Examples
Here are a few examples of workers calling other workers: 

* [Master-Slave (ruby)](http://github.com/iron-io/iron_worker_examples/tree/master/ruby/master_slave_worker) on Github
* [Master-Slave2 (ruby)](http://github.com/iron-io/iron_worker_examples/tree/master/ruby_ng/master_slave) on Github 



