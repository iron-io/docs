<div class="ruby-ng">{% highlight python %}
import argparse
import json

parser = argparse.ArgumentParser(
        description="Calculates the Fibonacci sequence up to a maximum number")
parser.add_argument("-payload", type=str, required=False,
        help="The location of a file containing a JSON payload.")
parser.add_argument("-d", type=str, required=False,
        help="The directory that the worker is running from.")
parser.add_argument("-e", type=str, required=False,
        help="The environment this worker is running under.")
parser.add_argument("-id", type=str, required=False,
        help="This worker's unique identifier.")

args = parser.parse_args()

max = 100

if args.payload != None:
    payload = json.loads(open(args.payload).read())
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
