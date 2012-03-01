<div class="php">
{% highlight php %}
<?
require_once('IronMQ.class.php');

$mq = new IronMQ(array("token" => "INSERT TOKEN HERE", "project_id" => "INSERT PROJECT_ID HERE"));
$mq->postMessage("test_queue", "Hello, world.");
// You can also pass in multiple messages in a single call:
$mq->postMessages("test_queue", array("Message 1", "Message 2"));
?>
{% endhighlight %}
</div>
