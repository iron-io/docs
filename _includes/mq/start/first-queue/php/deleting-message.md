<div class="php">
{% highlight php %}
<?
require_once('IronMQ.class.php');

$mq = new IronMQ(array("token" => "INSERT TOKEN HERE", "project_id" => "INSERT PROJECT_ID HERE"));

// Need to get a message ID before we can delete a message
$message = $mq->getMessage("test_queue");

// Delete the message
$mq->deleteMessage("test_queue", $message['id']);
?>
{% endhighlight %}
</div>
