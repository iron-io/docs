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

## Creating IronWorkers

See the <a href="http://dev.iron.io/worker/">IronWorker documentation</a>.

## Support

Issues should get logged with [Heroku Support](https://support.heroku.com).
You're also welcome to email [support@iron.io](mailto:support@iron.io) to chat with Iron.io's staff about issues. You can also find more resources and documentation on the
Iron.io [Dev Center](http://dev.iron.io).
