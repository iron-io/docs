<div class="php">{% highlight php %}
<?php
require("IronWorker.class.php");

$opts = getopt("", array("task:"));

$worker = new IronWorker(array("project_id" => "INSERT PROJECT_ID HERE", "token" => "INSERT TOKEN HERE"));
$log = $worker->getLog($opts["task"]);

$logSplit = explode("MAGICALSTDOUTSEPARATOR", $log);
$log = $logSplit[1];

$sequence = json_decode($log);
print_r($sequence);
?>
{% endhighlight %}
</div>
