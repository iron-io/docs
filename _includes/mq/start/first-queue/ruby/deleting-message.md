<div class="ruby">
{% highlight ruby %}
require 'iron_mq'

mq = IronMQ::Client.new("token" => "INSERT TOKEN HERE", "project_id" => "INSERT PROJECT_ID HERE")

# We need a message ID to delete the message
message = mq.messages.get().first

# Delete the message
mq.messages.delete(message.id)
{% endhighlight %}
</div>
