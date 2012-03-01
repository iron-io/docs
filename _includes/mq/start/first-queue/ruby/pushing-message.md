<div class="ruby">
{% highlight ruby %}
require 'iron_mq'

mq = IronMQ::Client.new("token" => "INSERT TOKEN HERE", "project_id" => "INSERT PROJECT_ID HERE")
mq.messages.post("Hello, world.", {"queue_name" => "test_queue"})
# You can also pass in multiple messages in a single call
mq.messages.post(["Message 1", "Message 2"], {:queue_name => "test_queue"})
{% endhighlight %}
</div>
