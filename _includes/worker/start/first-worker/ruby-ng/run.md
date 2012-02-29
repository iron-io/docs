<div class="ruby-ng">{% highlight python %}
import argparse

parser = argparse.ArgumentParser(description="Runs a FibWorker task to calculate Fibonacci.")
parser.add_argument("--max", type=int, required=False, help="The number the sequence shouldn't go above.")

args = parser.parse_args()

if args.max is None:
    max = 100000
else:
    max = args.max

worker = IronWorker(token="INSERT TOKEN HERE", project_id="INSERT PROJECT_ID HERE")
task = worker.postTask(name="FibWorker", payload={"max": max})
print task
{% endhighlight %}
</div>
