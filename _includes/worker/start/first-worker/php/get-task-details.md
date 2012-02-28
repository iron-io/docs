{% include language-switcher.html %}
{% highlight php %}
<?php
$details = $worker->getTaskDetails($task['tasks'][0]['id']);
$status = $details->status;
?>
{% endhighlight %}
