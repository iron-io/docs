{% highlight python %}
import json

max = 100

values = []
num1 = 0
num2 = 0
next = 1
while next < max:
    num1 = num2
    num2 = next
    next = num1 + num2
    values.append(num2)

print "MAGICALSTDOUTSEPARATOR%sMAGICALSTDOUTSEPARATOR" % json.dumps(values)
{% endhighlight %}
