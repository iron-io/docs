---
title: Using Local Disk Storage
layout: default
section: worker
breadcrumbs:
  - ['Start', '/start']
  - ['Configuration', '/configuration']
---

##Workers Queueing Other Workers
A common worker pattern is to have one worker queue or schedule one or more other workers. An example is a scheduled task that runs periodically to process data being stored in a database or on a queue. When the scheduled task runs, it creates one or more workers to process the data -- passing indices to the data slices or messages ids as part of the data payload. 

Doing this within IronWorker is pretty easy. All you need to do is upload the workers to IronWorker and then the master worker can queue or schedule the slave worker just by using the worker name. 

In your application or runner code:

* upload master_worker
* upload slave_worker

In your MasterWorker:

* queue/schedule slave\_worker (passing data payload for the slave\_worker as part of the queue/schedule call)

###Client Libraries
The explicit method of uploading and then queuing/scheduling a task is recommended but some client libraries have convenience methods that can facilitate the upload and queueing/scheduling of the slave workers.

{% highlight ruby %}
require 'iron_worker'

class MasterWorker < IronWorker::Base

  merge_worker './status_processor.rb', 'StatusProcessor'

  def run
    slave_worker = StatusProcessor.new
	# assign parameters and then queue or schedule
    slave_worker.queue
  end
end
{% endhighlight %}

##Best Practices

* Break up complex processes into a number of task-specific workers.
* Don't pass large blocks of data as parameters to workers.
* Use message queues(!!!) or data stores to hold data between processes.
* Use message queues(!!!) or scheduled workers w/persistent data stores to orchestrate the processes instead of chaining workers together. (In other words, don't pass the baton using workers unless you have some persistence layer in between that can pick up if the baton is dropped i.e. a worker fails.)

###Examples
Here are a few examples of workers calling other workers: 

* [Master-Slave (ruby)](http://github.com/iron-io/iron_worker_examples/tree/master/ruby/master_slave_worker) on Github
* [Master-Slave2 (ruby)](http://github.com/iron-io/iron_worker_examples/tree/master/ruby_ng/master_slave) on Github 



