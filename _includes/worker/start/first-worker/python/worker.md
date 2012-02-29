<div class="python">{% highlight python %}
import json

max = 100

payload = None

for i in range(len(sys.argv)):
    if sys.argv[i] == "-payload" and (i +1) < len(sys.argv):
        payload = sys.argv[i+1]
        break

if payload != None:
    payload = json.loads(open(helper.getArg("payload")).read())
    if 'max' in payload:
        max = payload['max']

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
</div>
