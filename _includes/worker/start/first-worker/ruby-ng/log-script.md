<div class="ruby-ng">{% highlight python %}
from iron_worker import *
import argparse
import json

parser = argparse.ArgumentParser(description="Gets the log for an IronWorker task.")
parser.add_argument("--task", type=str, required=True, help="The id of the task whose log is being retrieved.")

args = parser.parse_args()

worker = IronWorker(token="INSERT TOKEN HERE", project_id="INSERT PROJECT_ID HERE")
log = worker.getLog(args.task)

logsplit = log.split("MAGICALSTDOUTSEPARATOR")
log = logsplit[1]

sequence = json.loads(log)
print sequence
{% endhighlight %}
</div>
