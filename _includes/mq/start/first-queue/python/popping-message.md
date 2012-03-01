<div class="python">
{% highlight python %}
from iron_mq import *

mq = IronMQ(token="INSERT TOKEN HERE", project_id="INSERT PROJECT_ID HERE")

message = mq.getMessage(queue_name="test_queue")
print message['id']

# You can also pop multiple messages in a single call:
messages = mq.getMessage(queue_name="test_queue", max=10)
for message in messages:
    print message['id']
{% endhighlight %}
</div>
