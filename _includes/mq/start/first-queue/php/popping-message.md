<div class="php">
{% highlight php %}
<?
require_once('IronMQ.class.php');

$mq = new IronMQ(array("token" => "INSERT TOKEN HERE", "project_id" => "INSERT PROJECT_ID HERE"));

$message = $mq->getMessage("test_queue");
echo $message['id'];

// You can also get multiple messages with a single call
$messages = $mq->getMessages("test_queue", 10);
foreach($messages as $message) {
  echo $message['id'];
}
?>
{% endhighlight %}
</div>

