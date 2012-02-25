---
permalink: /worker/articles/heroku
title: Using IronWorker with Heroku
categories:
  - articles
  - worker
layout: proposed
---
IronWorker is a massively scalable task queue/job queue that makes it easy for you offload front end tasks, run background jobs, and process many tasks at once -- all in the cloud and with no servers to set-up and manage. It can also function as a cron-in-the-cloud service, running tasks on a schedule you define. 

IronWorker has partnered with Heroku to make using both services together even easier.

## Get Started

It's quick and easy to get IronWorker set up and running on Heroku using your [language of choice](http://docs.iron.io/worker#TOC-Clients). Note that Ruby IronWorker currently requires **Ruby 1.9 or later**. Please check the [Heroku documentation](http://devcenter.heroku.com/articles/stack) to find out whether your stack is supported and how to select a supported stack.

Once you have a stack selected, you need to install the IronWorker add-on for Heroku. You can do this with a quick command:

    :::term
    $ heroku addons:add iron_worker:starter
    -----> Adding iron_worker to strong-mountain-405... done, v29 (free)

This will add the starter level add-on for IronWorker, which will let you test the add-on and play around a bit. There are [other levels](http://addons.heroku.com/iron_worker) of the add-on, as well.

## Configuration

Now that you've added the add-on, you need to retrieve your token and project ID. The token functions as a password, so please keep it secure! Each app has a different project ID. You can get the token and project ID by running the following command:

    :::term
    $ heroku config | grep IRON
    IRON_WORKER_PROJECT_ID => 123456789
    IRON_WORKER_TOKEN      => aslkdjflaksuilaks

You can also get your token and project ID from the Iron.io HUD. To get to the Iron.io HUD, go to your apps panel for Heroku, choose your app, expand the add-ons drop-down, and click on IronWorker. This will bring you to the IronWorker HUD, where you can see your project ID and token listed.

![IronWorker add-on](http://i.imgur.com/dFQoH.png)

Heroku automatically adds the token and project ID to your production environment variables. You need to take care of your development environment yourself, however. Simply add the following in `config/environments/development.rb`:

    :::ruby
    ENV['IRON_WORKER_TOKEN'] = 'YOUR TOKEN'
    ENV['IRON_WORKER_PROJECT_ID'] = 'YOUR PROJECT ID'

Then create a file at `config/initializers/iron_worker.rb` and put the following into it:

    :::ruby
    IronWorker.configure do |config|
      config.token = ENV['IRON_WORKER_TOKEN']
      config.project_id = ENV['IRON_WORKER_PROJECT_ID']
    end

If you're building for Rails 3, add the following to your `Gemfile`:

    :::ruby
    gem 'iron_worker'

If you're building on Rails 2, add the following to your `environment.rb` file:

    :::ruby
    config.gem 'iron_worker'
    config.load_paths += %W( #{RAILS_ROOT}/app/workers )

## Basic Example

Now we're ready to create a worker and show how it gets invoked within an application. For demonstration purposes, we're going to make a FibonacciWorker that will calculate the Fibonacci sequence up to a given number.

### Writing the Worker

Here's the worker that calculates the sequence. You can copy and paste and place in in a file called `fibonacci_worker.rb`.

    :::ruby
    require 'iron_worker'

    class FibonacciWorker < IronWorker::Base

      attr_accessor :max

      def run
        values = Array.new
        num1 = 0
        num2 = 0
        nextNum = 1
        while nextNum < max
          num1 = num2
          num2 = nextNum
          nextNum = num1 + num2
          values << num2
        end
        log "#{values}"
      end
    end

This example uses a basic implementation of a Fibonacci calculation up to the max attribute we set, then logs the values.

We require the `iron_worker` gem and sub-class `IronWorker::Base`. Then we set up an attribute accessor to hold the number we want to calculate up to. Finally, we define a run method and place the code to execute in there. This is what will run when tasks are taken off the queue and processed within IronWorker. 

### Testing the Worker

It's time to make use of those hard-won credentials. Testing the worker is just a matter of running it on your local machine. Doing so is simple. Put the following in `run_fibworker.rb`:

    :::ruby
    require 'iron_worker'
    require_relative 'fibonacci_worker'

    IronWorker.configure do |config|
      config.token = 'YOUR TOKEN HERE'
      config.project_id = 'YOUR PROJECT ID HERE'
    end

    worker = FibonacciWorker.new
    worker.max = 1000
    worker.run_local

We require the `iron_worker` gem, use `require_relative` to load up the worker file, set the credentials we pulled from the IronWorker HUD, set any attributes, and call `run_local`. The `run_local` command just runs the worker on your local machine and prints any puts statements to STDOUT. To see it in action, enter `ruby run_fibworker.rb` in your console.

### Queuing the Worker

Once the worker is tested to your satisfaction, it's time to offload it to the IronWorker cloud. Edit `run_fibworker.rb` and change the last line (`worker.run_local`) to `worker.queue`. Enter `ruby run_fibworker.rb` in your console again, and you'll see the following output:

    :::term
    IronWorker initialized.
    Uploading FibonacciWorker, code modified.
    file size to upload: 283625
    Uploading now...
    Done uploading.
    Queuing FibonacciWorker...

Your Worker is now running in the cloud.

### Running from Heroku

Now that we know the worker runs and uploads from your machine, we want to run it from within your application within Heroku.

First, you need to get an app running on Heroku. Heroku has some [great documentation](http://devcenter.heroku.com/articles/rails3) on how to do that. Once you get the Heroku app running, integrating it with our Fibonacci Worker is simple. Create an `app/workers` directory, and move `fibonacci_worker.rb` into it. Then just take our `run_fibworker.rb` code, and move it into a Controller. For example, `WorkerController` may look like this:

    :::ruby
    def run
      worker = FibonacciWorker.new
      worker.max = 1000
      resp = worker.queue
      render :json => resp
    end

Deploy the app to Heroku, and load up `your-app.herokuapp.com/worker/run` to see the success message.

### Next Steps

This is just the tip of the iceberg. IronWorker has a robust API that allows for a lot more interaction with your Workers. You may want to try:

 * [Checking the status](http://docs.iron.io/worker/ruby/fibonacci-worker#TOC-Checking-the-Status-of-Your-Worker) of your worker.
 * [Getting the logs](http://docs.iron.io/worker/ruby/fibonacc-worker#TOC-Getting-Your-Worker-Logs) from your worker.
 * [Scheduling tasks](http://docs.iron.io/worker/ruby/fibonacci-worker#TOC-Scheduling-Tasks) for your worker that will be run after a delay, repeating, or both.

You can also check out some example workers:

* [TweetWorker](https://github.com/iron-io/heroku_sinatra_example), an app that pulls tweets and displays them. It uses IronWorker, IronMQ, and Sinatra, all while being hosted on Heroku.
* We also have a [full repository](https://github.com/iron-io/iron_worker_examples) of IronWorker examples for Rails on Github.

### Troubleshooting

When trying to troubleshoot a Worker, the best first step is to try and run the Worker locally. If the Worker runs locally, it should run on the cloud. You can also access your Worker logs through the Iron.io HUD. These logs will show you any errors thrown or debug messages you log while the worker is running.

The most common source of Worker errors is a mismatch between your local environment and the cloud's environment. Double-check your `Gemfile` and your Ruby version -- workers run under Ruby >1.9. Also, make sure your `Gemfile.lock` has been updated. Run `bundle install` to make sure.

Also note that IronWorker is not able to to connect with Heroku's shared databases. At this point, Heroku's shared databases do not allow for direct connections. We are working to remedy this situation. The suggested workaround is to pass the data back through your application, post-processing.

Issues should get logged with [Heroku Support](https://support.heroku.com). You're also welcome to stop by the Iron.io [support chat room](http://www.hipchat.com/gNWgTiqIC) and chat with Iron's staff about issues. You can also find more resources on the Iron.io [support site](http://support.iron.io) and more documentation on the Iron.io [documentation site](http://docs.iron.io).
