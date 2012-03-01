<div class="python">
{% highlight python %}
from iron_mq import *

mq = IronMQ(token="INSERT TOKEN HERE", project_id="INSERT PROJECT_ID HERE")
mq.postMessage(queue_name="test_queue", messages=["Hello, world."])
# You can also pass in multiple messages in a single call:
mq.postMessage(queue_name="test_queue", messages=["Message 1", "Message 2"])
{% endhighlight %}
</div>
