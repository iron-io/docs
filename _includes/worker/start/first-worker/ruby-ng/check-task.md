<div class="ruby-ng">{% highlight python %}
from iron_worker import *
import argparse

parser = argparse.ArgumentParser(description="Checks the status of an IronWorker task.")
parser.add_argument("--task", type=str, required=True, help="The id of the task whose status is being checked.")

args = parser.parse_args()

worker = IronWorker(token="INSERT TOKEN HERE", project_id="INSERT PROJECT_ID HERE")

details = worker.getTaskDetails(args.task)
print "Task is %s." % details["status"]

{% endhighlight %}
</div>
