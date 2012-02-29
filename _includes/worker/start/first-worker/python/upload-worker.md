<div class="python">{% highlight python %}
from iron_worker import *

name = "FibWorker"
zipName = "%s.zip" % name

zipFile = IronWorker.createZip(files=["fibonacci.py"], destination=zipName,
        overwrite=True)

worker = IronWorker(token = "INSERT TOKEN HERE",
        project_id = "INSERT PROJECT_ID HERE")
res = worker.postCode(runFilename="fibonacci.py", name=name,
        zipFilename=zipName)

print res
{% endhighlight %}
</div>
