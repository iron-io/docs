<div class="php">{% highlight php %}
<?php
require("IronWorker.class.php");

$name = "FibWorker";
$zipName = "$name.zip";

$zipFile = IronWorker::createZip("", array("fibonacci.php"),  $zipName, true);

$worker = new IronWorker(array("token" => "INSERT TOKEN HERE", "project_id" => "INSERT PROJECT_ID HERE"));
$res = $worker->postCode("fibonacci.php", $zipName, $name);
print_r($res);
?>
{% endhighlight %}
</div>
