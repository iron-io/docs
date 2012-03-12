---
title: Data Params and Payloads
layout: default
section: worker
breadcrumbs:
  - ['Articles', '/articles']
  - ['Working With Data and Databases', '/data']
---

# Data Params and Payloads
When queuing a task or scheduling a job within IronWorker, a data `payload` gets passed, along with a `code_name` (the `code_name` comprising the uploaded worker, code libraries, and other files the worker needs).

Here's a view of the REST/HTTP API for queuing a worker (scheduling a task is similar insofar the code_name/payload).

<div class="grey-box">
    POST /projects/<span class="variable project_id">{Project ID}</span>/tasks
</div>

#### Request
The request is a JSON-encoded object with a single property, "tasks", which in turn contains an array of objects. Each object in this array consists of:

* **code_name**: The name of the code package to execute for this task.
* **payload**: A string of data to be passed to the worker. The payload will be passed to the code package at runtime, and can be used to pass varying information on a task-by-task basis. The payload cannot be larger than 64KB in size.

The request also needs to be sent with a "Content-Type: application/json" header, or it will respond with a 406 status code and a "msg" property explaining the missing header.

Sample:  
{% highlight js %}
{
    "tasks": [
        {
            "code_name": "MyWorker",
            "payload": "{\"x\": \"abc\", \"y\": \"def\"}"
        }
    ]
}
{% endhighlight %}

If you're using the API directly then you are responsible for packing and unpacking the data payload. 

## Client Libraries
If you're using a client library, then the library will largely determine how data gets passed and what form it's in in a worker. 

Some client libraries -- such as the Ruby libraries, for example -- create abstractions on the data payload to make data passing pretty transparent as well as support some time-saving features. For one, local and global variables can be defined and passed relatively simply. 

Global variables can be set in a config block within the IronWorker class. Local variables can also defined in the worker class (which is a subset of the IronWorker class) and then set after a worker instance has been created.

The Ruby libraries also help with serializing and deserializing objects within the payload. Core objects pass seamlessly although complex objects may need some additional work to deserialize (as described below). In terms of technical details, IronWorker converts data payloads to JSON as part of the upload process. (It also does a Base64.encode but that's a bit more behind the scenes than most people need to know). 


##Global and Local Variables
As described above, the IronWorker Ruby gems allow global parameters to be set within an IronWorker `config` hash. This is a convenient way to pass parameters that are common to a large number of workers or in cases where access keys may change between environments.

As an example, if you were to include the following as part of your config block, then these values will be set for all your workers.

<pre>
IronWorker.config do |config|
  config.token = 'TOKEN'
  config.project`_id = 'PROJECT`_ID'
  config.global`_attributes[:db`_user] = "username"
  config.global`_attributes[:db`_pass] = "password"
end
</pre>

In your worker, you simply define the attributes to be able to make use of them:

<pre>
class SomeWorker < IronWorker::Base

  attr_accessor :db_user, :db_pass, :user_id

  def run

    # db_user and db_pass would be the values set in the config block.
	...
</pre>

### Setting Local Variables
Setting local variables using the Ruby client libraries is also a matter of defining them in the worker class and then assigning them once the instance has been created. Using the `SomeWorker` class above, you would pass in a User ID using the `user_id` param.

<pre>
worker = MyWorker.new
worker.user_id = user_id
worker.queue
</pre>


## Basic Objects
With the IronWorker Ruby gems, core Ruby objects can be passed as arguments from your app to IronWorker. Just declare them within your worker and you'll be able to access them just as you would in your app running in your production environment. 

#### In the runner code:
<pre>
worker = AttributeWorker.new
worker.fixnum_arg = 27
worker.floatnum_arg = 3.3333
worker.array_arg = [57, 121, 149, 288, 333] 
worker.string_arg = "Here's a string."
worker.hash_arg = { "user" => { "name" => { "first" => "Bob", "last" => "Smith" } } }
worker.queue
</pre>

#### In the worker:
A log output of the params within the worker shows a match between the object types. 

<pre>
  @fixnum_arg: 27  [Fixnum]
  @floatnum_arg: 3.3333  [Float]
  @array_arg: [57, 121, 149, 288, 333]  [Array]
  @string_arg: Here's a string.  [String]
  @hash_arg: {"user"=>{"name"=>{"first"=>"Bob", "last"=>"Smith"}}}  [Hash]
</pre>

## Complex Objects and Models
Passing complex objects and models, however, is a bit different. In these cases, these objects will be turned into hashes as part of the upload and will need to be deserialized within IronWorker.

### Passing IDs/Data References
The recommended approach is complex types to pass in data ids (such as a user_id) that point to data in the database, on AWS S3, or in some other data store. You can then access the data from your worker and not have address any serialization/deserialization issues.

### Serializing and Deserializing Data
An alternative is that you can upload the object and then deserialize it from JSON within the worker -- provided, however, that the object can be serialized to JSON and back. It's likely that you'll need to add JSON methods as part of the class definition in order to perform the serialization and deserialization. 

Here's an example of how to perform this in a generic way within a Ruby model. (Note that models can be merged as part of the code that's uploaded to use within your worker -- it's just data within models that is serialized within the data payload.)

<pre>
class ModelGood2

  attr_accessor :name, :position, :bat_ave

  def to_json(*a)
    hash_data = {}
    self.instance_variables.each do |var|
      hash_data[var] = self.instance_variable_get var
    end

    hash = {}
    hash['json_class'] = self.class.name
    hash['data'] = hash_data
    hash.to_json(*a)

  end

  def self.json_create(a) 

    model = new
    a["data"].each do |var, val|
      model.instance_variable_set var, val
    end

      model

  end

end
</pre>

## Dates and Times
To pass dates and times, we suggest that you convert to an integer and then convert back within IronWorker. It's possible to use strings as well but using integers is more language agnostic given the treatment of integers and Time within most languages. (Using UTC is also beneficial because the representation will be the same in each environment.)

#### In the runner code:
In this example, we pass the time in a couple of different ways.

<pre>
worker = TimeWorker.new
worker.time_arg = Time.new.utc
worker.time`_string = worker.time.to`_s
worker.time`_int = worker.time.to`_i
worker.queue
</pre>

Logging these parameters would produce the following values / object types.

{% highlight js %}
  @time_arg: 2012-03-01 10:39:38 UTC  [Time]
  @time`_string`_arg: 2012-03-01 10:39:38 UTC  [String]
  @time`_int`_arg: 1330598378  [Fixnum]
{% endhighlight %}

#### In the worker:
Here we convert some of the values back to times. 

<pre>
...
require 'date'

class TimeWorker < IronWorker::Base

  merge_gem 'chronic'

  attr_accessor :time_string, :time_int

  def run
    log "\n@time_arg: #{time_arg}  [#{time_arg.class}]"

    time1 = Chronic.parse(time_string) 
    log "#{time1} [#{time1.class}]"
  
    time2 = Time.at(time_int_arg).utc 
    log "#{time2} [#{time2.class}]"
 
  end
end
</pre>

A log of values shows that the type in the first var does not get converted back to a Time object.

{% highlight js %}
  @time_arg: 2012-03-01T10:39:38Z  **[String]**
  @time1: 2012-03-01 10:39:38 UTC  [Time]
  @time2: 2012-03-01 10:39:38 UTC [Time]
{% endhighlight %}

## Notes:

* IronWorker passes data in a straight-forward way as part of the data payload in the API call. 
* Client libraries may or may not provide support for deserializing parameters that are passed. 
* Take a look at the docs for the client libs for how it treats the data payload.
* If in down, make use of the logging to confirm data in your worker is in the form that you need it in.

## Examples
You can see more examples of passing data and deserializing objects here:

* [Attribute Passing](https://github.com/iron-io/iron_worker_examples/tree/master/ruby/attribute_passing) on Github

