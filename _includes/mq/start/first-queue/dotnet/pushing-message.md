<div class="dotnet">
{% highlight csharp %}
Client client = new Client("INSERT TOKEN HERE", "INSERT PROJECT_ID HERE");
Queue queue = client.queue("test_queue");
queue.push("Hello world.")
{% endhighlight %}
</div>
