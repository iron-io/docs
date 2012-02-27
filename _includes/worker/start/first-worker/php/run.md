{% highlight php %}
<?php
require("IronWorker.class.php");
$opts = getopt("", array("max:"));
if($opts['max'] != null) {
    $max = 100000;
} else {
    $max = $opts['max'];
}

$worker = new IronWorker(array("token" => "INSERT TOKEN HERE", "project_id" => "INSERT PROJECT_ID HERE"));
$task = $worker->postTask("FibWorker", array("max" => $max));
echo $task_id."\n";
?>
{% endhighlight %}
