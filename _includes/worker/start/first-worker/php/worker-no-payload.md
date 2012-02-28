{% include language-switcher.html %}
{% highlight php %}
<?php
$max = 100;
$values = array();
$num1 = 0;
$num2 = 0;
$newNum = 1;
while($num2 <= $max) {
    $num1 = $num2;
    $num2 = $newNum;
    $newNum = $num1 + $num2;
    array_push($values, num2);
}
echo "MAGICALSTDOUTSEPARATOR".json_encode($values)."MAGICALSTDOUTSEPARATOR";
?>
{% endhighlight %}
