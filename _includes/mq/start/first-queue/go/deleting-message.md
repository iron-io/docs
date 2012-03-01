<div class="go">
{% highlight go %}
package main

import (
        "github.com/iron-io/iron_mq_go"
)

func main() {
        // Instantiate our API client
        // The first argument is just your project_id
        // The second argument is your OAuth token
        // The third argument is the cloud you want to use.
        //    See http://dev.iron.io/mq/reference/clouds for more info.
        client := ironmq.NewClient("INSERT PROJECT_ID HERE", "INSERT TOKEN HERE", ironmq.IronAWSUSEast)

        // Select the queue we want to use
        // The argument is your queue's name
        queue := client.Queue("test_queue")

        // Pop a message off the queue
        // msg will be the message (type iron_mq.Message)
        // err will return any errors that may arise
        msg, err := queue.Get()
        if err != nil {
            panic(err.Error())
        }
        print(msg.Id +": "+msg.Body)
}
{% endhighlight %}
</div>
