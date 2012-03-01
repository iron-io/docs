<div class="dotnet">
{% highlight csharp %}
Client client = new Client("INSERT TOKEN HERE", "INSERT PROJECT_ID HERE");
Queue queue = client.queue("test_queue");
// Need to get a message before we can delete a message
Message msg = queue.get();
// Delete the message
queue.deleteMessage(msg);
{% endhighlight %}
</div>
