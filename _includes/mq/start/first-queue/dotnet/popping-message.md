<div class="dotnet">
{% highlight csharp %}
Client client = new Client("INSERT TOKEN HERE", "INSERT PROJECT_ID HERE");
Queue queue = client.queue("test_queue");
Message msg = queue.get();

Console.WriteLine(msg.Id.toString()) //here you go
{% endhighlight %}
</div>

