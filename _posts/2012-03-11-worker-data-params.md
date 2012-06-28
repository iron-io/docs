---
title: Data Params and Payloads
layout: default
section: worker
permalink: /worker/articles/databases/data-params
breadcrumbs:
  - ['Articles', '/articles']
  - ['Working With Data & Databases', '/data']
  - ['Data Params and Payloads', '/data-params']
categories:
  - worker
  - articles
  - data
summary: "Best practices for getting data into and out of your workers."
---

# Data Params and Payloads

When queuing a task or scheduling a job within IronWorker, a data `payload` gets passed along with a `code_name`. The `code_name` is a unique identifier for the uploaded worker, its code libraries, and the other files the worker needs.

## Request

### Endpoint

The REST/HTTP API provides the following endpoint for queuing a worker:

<div class="grey-box">
    POST /projects/<span class="variable project_id">{Project ID}</span>/tasks
</div>

To schedule a task, instead use this endpoint:

<div class="grey-box">
    POST /projects/<span class="variable project_id">{Project ID}</span>/schedules
</div>

### Body
The request body is a JSON-encoded object with a single property, "tasks", which in turn contains an array of objects. Each object in this array consists of the following:

* **code_name**: The name of the code package to execute for this task.
* **payload**: A string of data to be passed to the worker. The payload will be passed to the code package at runtime, and can be used to pass varying information on a task-by-task basis. The payload cannot be larger than 64KB in size.

The request also needs to be sent with a "Content-Type: application/json" header, or it will respond with a 406 status code and a "msg" property explaining the missing header.

Requests for scheduled tasks are similarly structured. For the specifics, you can [check our API reference](/worker/reference/api/#schedule_a_task).

Sample Request Body:  
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

If you're using the API directly, you are responsible for packing and unpacking the data payload. 

## Client Libraries

If you're using a client library, the library will largely determine how data gets passed and in what form that data is supplied to your worker. 

Some client libraries&mdash;such as the official Ruby library&mdash;create abstractions on the data payload to make data passing simple while supporting some time-saving features. For example, local and global variables can be defined and passed relatively simply. 

Global variables can be set in a config block within the IronWorker class. Local variables can also defined in the worker class (which inherits the IronWorker class) and set after a worker instance has been created.

The Ruby libraries also help with serializing and deserializing objects within the payload. Core objects pass seamlessly; complex objects may need some additional work before they will deserialize (as described below). In terms of technical details, IronWorker converts data payloads to JSON as part of the upload process. (It also uses `Base64.encode`, but that's a bit more behind-the-scenes than most people need to know).

## Global and Local Variables

### Setting Global Variables

As described above, the IronWorker Ruby gems allow global parameters to be set within an IronWorker `config` hash. This is a convenient way to pass parameters that are common to a large number of workers or in cases where access keys may change between environments.

As an example, if you were to include the following as part of your config block, the values would be available to all of your workers.

{% highlight ruby %}
IronWorker.config do |config|
  config.token = 'TOKEN'
  config.project_id = 'PROJECT`_ID'
  config.global_attributes[:db_user] = "username"
  config.global_attributes[:db_pass] = "password"
end
{% endhighlight %}

In your worker, you simply define `attr_accessor`s for the attributes to be able to make use of them:

{% highlight ruby %}
class SomeWorker < IronWorker::Base

  attr_accessor :db_user, :db_pass, :user_id

  def run

    # db_user and db_pass would be the values set in the config block.
	...
{% endhighlight %}

### Setting Local Variables

Setting local variables using the Ruby client libraries is also a matter of defining them in the worker class and then assigning them once the instance has been created. Using the `SomeWorker` class above, you would pass in a User ID using the `user_id` param.

{% highlight ruby %}
worker = MyWorker.new
worker.user_id = user_id
worker.queue
{% endhighlight %}


## Basic Objects

With the IronWorker Ruby gems, core Ruby objects can be passed as arguments from your app to IronWorker. Just declare them within your worker and you'll be able to access them just as you would in your app running in your production environment. 

### In the runner code:

{% highlight ruby %}
worker = AttributeWorker.new
worker.fixnum_arg = 27
worker.floatnum_arg = 3.3333
worker.array_arg = [57, 121, 149, 288, 333] 
worker.string_arg = "Here's a string."
worker.hash_arg = { "user" => { "name" => { "first" => "Bob", "last" => "Smith" } } }
worker.queue
{% endhighlight %}

### In the worker:

A log output of the params within the worker shows a match between the object types. 

{% highlight ruby %}
  @fixnum_arg: 27  [Fixnum]
  @floatnum_arg: 3.3333  [Float]
  @array_arg: [57, 121, 149, 288, 333]  [Array]
  @string_arg: Here's a string.  [String]
  @hash_arg: {"user"=>{"name"=>{"first"=>"Bob", "last"=>"Smith"}}}  [Hash]
{% endhighlight %}

## Complex Objects and Models

Passing complex objects and models is a bit more complicated. These objects will be converted into hashes as part of the upload and will need to be deserialized within IronWorker.

### Passing IDs/Data References

The recommended approach to passing in complex types is to pass in data IDs (such as a user_id) instead. These IDs can point to data in the database, on AWS S3, or in some other data store. You can then access the data from your worker and not have to address any serialization/deserialization issues.

### Serializing and Deserializing Data

An alternative is to upload the object and deserialize it from JSON within the worker&ndash;provided, of course, that the object is JSON-serializable. It's likely that you'll need to add JSON methods as part of the class definition in order to perform the serialization and deserialization. 

Here's an example that performs JSON serialization in a generic way within a Ruby model. Note that models can be merged as part of the code that's uploaded to use within your worker&ndash;only the payload is serialized.

{% highlight ruby %}
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
{% endhighlight %}

## Dates and Times

To pass dates and times, we suggest that you convert them to an integer and then convert them back within IronWorker. It's possible to use strings as well, but using integers is more language-agnostic given the treatment of integers and time within most languages. Using UTC is also beneficial, because the representation will be the same in each environment.

### In the runner code:

In this example, we pass the time in a couple of different ways.

{% highlight ruby %}
worker = TimeWorker.new
worker.time_arg = Time.new.utc
worker.time_string = worker.time.to_s
worker.time_int = worker.time.to_i
worker.queue
{% endhighlight %}

Logging these parameters would produce the following values and object types.

{% highlight js %}
  @time_arg: 2012-03-01 10:39:38 UTC  [Time]
  @time_string_arg: 2012-03-01 10:39:38 UTC  [String]
  @time_int_arg: 1330598378  [Fixnum]
{% endhighlight %}

### In the worker:

In the worker, we convert some of the values back to Time objects. 

{% highlight ruby %}
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
{% endhighlight %}

A log of values shows that the serialized Time object does not get converted back, instead remaining a string.

{% highlight js %}
  @time_arg: 2012-03-01T10:39:38Z  [String]
  @time1: 2012-03-01 10:39:38 UTC  [Time]
  @time2: 2012-03-01 10:39:38 UTC [Time]
{% endhighlight %}

## Notes:

* IronWorker passes data in a straight-forward way as part of the data payload in the API call.
* Client libraries may or may not provide support for deserializing parameters that are passed. Check your library's documentation to find out.
* If in doubt, make use of logging to confirm data in your worker is in the form that you need it in.

## Examples

You can see more examples of passing data and deserializing objects here:

* [Attribute Passing](https://github.com/iron-io/iron_worker_examples/tree/master/ruby/attribute_passing) on Github
