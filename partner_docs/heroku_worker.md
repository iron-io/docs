IronWorker is a massively scalable task queue/job queue that makes it easy for you offload front end tasks, run background jobs, and process many tasks at once -- all in the cloud and with no servers to set up and manage. It can
also function as a cron-in-the-cloud service, running tasks on a schedule you define.

IronWorker has partnered with Heroku to make using both services together even easier.

## Get Started

It's quick and easy to get IronWorker set up and running on Heroku using your [language of choice](http://dev.iron.io/worker/). Note that Ruby IronWorker currently requires **Ruby 1.9 or later**. Please check the [Heroku documentation](http://devcenter.heroku.com/articles/stack) to find out whether your stack is supported and how to select a supported stack.

Once you have a stack selected, you need to install the IronWorker addon for Heroku. You can do this with a quick command:

    :::term
    $ heroku addons:add iron_worker:developer
    -----> Adding iron_worker to strong-mountain-405... done, v29 (free)

This will add the developer level addon for IronWorker, which will let you test the addon and play around a bit. There are [other levels](http://addons.heroku.com/iron_worker) of the addon, as well.

Install the iron_worker_ng gem:

    :::term
    $ gem install iron_worker_ng

## Configuration

Now that you've added the addon, you need to retrieve your token and project ID. The token functions as a password, so please keep it secure! Each app has a different project ID. You can get the token and project ID by running the following command:

    :::term
    $ heroku config | grep IRON
    IRON_WORKER_PROJECT_ID => 123456789
    IRON_WORKER_TOKEN      => aslkdjflaksuilaks

You can also get your token and project ID from the Iron.io HUD. To get to the Iron.io HUD, go to your apps panel for Heroku, choose your app, expand the addons drop-down, and click on IronWorker. This will bring you to the IronWorker
HUD, where you can see your project ID and token listed.

![IronWorker addon](https://s3.amazonaws.com/heroku.devcenter/heroku_assets/images/22-typus_preview.jpg)

Add those values to a file called `iron.json` in your app root directory and add iron.json to your .gitignore file.

    :::json
    {
      "project_id": "123456789",
      "token": "aslkdjflaksuilaks"
    }

## Create a Worker

First things first, let's create a worker. Save the following code into a file called `hello_worker.rb`:

    :::ruby
    # Worker code can be anything you want.
    puts "Starting HelloWorker at #{Time.now}"
    puts "Payload: #{params}"
    puts "Simulating hard work for 5 seconds..."
    5.times do |i|
      puts "Sleep #{i}..."
      sleep 1
    end
    puts "HelloWorker completed at #{Time.now}"

Now create a file called `hello.worker` that defines your worker's dependencies:

    # define the runtime language, this can be ruby, java, node, php, go, etc.
    runtime "ruby"
    # exec is the file that will be executed:
    exec "hello_worker.rb"

Now upload it:

    iron_worker upload hello

Now you're work is ready to be used. You can quickly test it by running:

    iron_worker queue hello -p "{\"hello\": \"world\"}"

Now you can view the log for the worker with:

    iron_worker log -t 4fcfc8d11bab475a360abd92

Or look at the log in HUD.

Now it's time to put your worker to work!

## Queue Up Tasks for your Worker from your Application

Now that we know the worker runs and uploads from your machine, we want to run it from within your application within Heroku. Heroku automatically adds the token and project ID to your production environment variables. You need to take care of
your development environment yourself, however. Simply add the following to your `config/environments/development.rb`:

    :::ruby
    ENV['IRON_WORKER_TOKEN'] = 'YOUR TOKEN'
    ENV['IRON_WORKER_PROJECT_ID'] = 'YOUR PROJECT ID'

If you're using bundler, add the following to your `Gemfile`:

    :::ruby
    gem 'iron_worker_ng'

Assuming you're using Rails, let's add some code to one of your controllers. For instance, let's say you have a controller called `WelcomeController`:

    :::ruby
    class WelcomeController < ApplicationController
      def index
        iron_worker = IronWorkerNG::Client.new
        iron_worker.tasks.create("hello", "foo"=>"bar")
      end
    end

Deploy the app to Heroku, and load up `http://your-app.herokuapp.com/welcome` to queue up the task.

### Next Steps

This is just the tip of the iceberg. IronWorker has a robust API that allows for a lot more interaction with your workers. You may want to try:

 * [Checking the status](http://dev.iron.io/worker/reference/api/#get_info_about_a_task) of your worker.
 * [Getting the logs](http://dev.iron.io/worker/reference/api/#get_a_tasks_log) from your worker.
 * [Scheduling tasks](http://dev.iron.io/worker/reference/api/#schedule_a_task) for your worker that will be run after a delay, repeating, or both.

You can also check out some example workers:

* [TweetWorker](https://github.com/iron-io/heroku_sinatra_example), an app that pulls tweets and displays them. It uses IronWorker, IronMQ, and Sinatra, all while being hosted on Heroku.
* We also have a [full repository](https://github.com/iron-io/iron_worker_examples) of IronWorker examples for Rails on Github.

### Troubleshooting

When trying to troubleshoot a worker, the best first step is to try and run the worker locally. If the worker runs locally, it should run on the cloud. You can also access your worker logs through the Iron.io HUD. These logs will show you any errors thrown or debug messages you log while the worker is running.

The most common source of worker errors is a mismatch between your local environment and the cloud's environment. Double-check your `Gemfile` and your Ruby version -- workers run under Ruby >1.9. Also, make sure your `Gemfile.lock` has been updated. Run `bundle install` to make sure.

Issues should get logged with [Heroku Support](https://support.heroku.com).
You're also welcome to email [support@iron.io](mailto:support@iron.io) to chat with Iron.io's staff about issues. You can also find more resources and documentation on the
Iron.io [Dev Center](http://dev.iron.io).
