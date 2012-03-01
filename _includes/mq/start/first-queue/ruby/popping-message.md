<div class="ruby">
{% highlight ruby %}
require 'iron_mq'

mq = IronMQ::Client.new("token" => "INSERT TOKEN HERE", "project_id" => "INSERT PROJECT_ID HERE")
messages = mq.messages.get()
puts messages.first.id

# You can also get multiple messages in a single call
messages = mq.messages.get({:id => 2 })
messages.each do |message|
  puts message.id
end
{% endhighlight %}
</div>

