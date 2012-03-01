<div class="python">
{% highlight python %}
from iron_mq import *

mq = IronMQ(token="INSERT TOKEN HERE", project_id="INSERT PROJECT_ID HERE")

# We need to get a message's ID before we can delete it
message = mq.getMessage(queue_name="test_queue")

# Delete the message
mq.deleteMessage(queue_name="test_queue", message_id=message['id'])
{% endhighlight %}
</div>
