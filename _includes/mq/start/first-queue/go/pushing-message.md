<div class="go">
{% highlight go %}
package main

import (
        "github.com/iron-io/iron_mq_go"
)

func main() {
        # Instantiate our API client
        # The first argument is just your project_id
        # The second argument is your OAuth token
        # The third argument is the cloud you want to use.
        #    See http://dev.iron.io/mq/reference/clouds for more info.
        client := ironmq.NewClient("INSERT PROJECT_ID HERE", "INSERT TOKEN HERE", ironmq.IronAWSUSEAST)

        # Select the queue we want to use
        # The argument is your queue's name
        queue := client.Queue("test_queue")

        # Push a message to the queue
        # id will be the message's ID
        # err will return any errors that may arise
        id, err := queue.Push("Hello, world.")
}
{% endhighlight %}
</div>
