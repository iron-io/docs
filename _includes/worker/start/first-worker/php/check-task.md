{% highlight php %}
<?php
require("IronWorker.class.php");

$opts = getopt("", array("task:"));

$worker = new IronWorker(array("token" => "INSERT TOKEN HERE", "project_id" => "INSERT PROJECT_ID HERE"));

$details = $worker->getTaskDetails($opts["task"]);
echo "Task is ".$details->status."\n";
?>
{% endhighlight %}
