---
permalink: /mq/articles/platforms/heroku
title: Getting Started on Heroku
categories:
 - mq
 - articles
 - platforms
breadcrumbs:
 - ['Articles', '/articles']
 - ['Platforms', '/platforms']
 - ['Heroku', '/heroku']
tags:
  - heroku
  - platform
layout: post
section: mq
---


IronMQ is a massively scalable messaging queue that makes it easy for you to keep a resilient and synchronised message-passing system in the cloud, between any number of clients, without server set-up or maintenance. It makes managing data and event flow within your application simple.

Iron has partnered with Heroku to make using both services together even easier.

## Get Started

It's quick and easy to get IronMQ set up and running on Heroku. You just need to install the IronMQ add-on for Heroku. You can do this with the `heroku` command:

    :::term
    $ heroku addons:add iron_mq:rust
    -----> Adding iron_mq to cold-winter-5462... done, v10 (free)

This will add the starter level add-on for IronMQ, which will let you test the add-on and play around a bit. There are [other levels](http://addons.heroku.com/iron_mq) of the add-on, as well.

## Configuration

Now that you've added the add-on, you need to retrieve your token and project ID. The token functions as a password, so please keep it secure! Each app has a different project ID. You can get the token and project ID by running the following command:

    :::term
    $ heroku config | grep IRON
    IRON_MQ_PROJECT_ID => 123456789
    IRON_MQ_TOKEN      => aslkdjflaksuilaks

You can also get your token and project ID from the Iron.io HUD. To get to the Iron.io HUD, go to your apps panel for Heroku, choose your app, expand the add-ons drop-down, and click on IronMQ. This will bring you to the Iron.io HUD, where you can see your project ID and token listed.

![IronMQ add-on](http://i.imgur.com/RpEzb.png)

IronMQ has clients for [a lot of languages](http://docs.iron.io/mq/clients), and you can always use [the REST/HTTP API](http://docs.iron.io/mq/api) (or write your own!). This means your existing Heroku stack should work without any changes. The remainder of this article will be using the Ruby library, but all of the libraries have analagous calls (that should be well-documented).

We're going to need to install the Ruby gem, for development purposes:

    :::term
    $ gem install iron_mq
    Fetching: iron_mq-1.4.0.gem (100%)
    Successfully installed iron_mq-1.4.0

Heroku automatically adds the token and project ID to your production environment variables. You need to take care of your development environment yourself, however. Simply add the following in `config/environments/development.rb`:

    :::ruby
    ENV['IRON_MQ_TOKEN'] = 'YOUR TOKEN'
    ENV['IRON_MQ_PROJECT_ID'] = 'YOUR PROJECT ID'

If you’re building for Rails 3, add the following to your Gemfile:

    :::ruby
    gem 'iron_mq'

If you’re building on Rails 2, add the following to your environment.rb file:

    :::ruby
    config.gem 'iron_mq'

## Basic Example

We're ready to start working with our message queue. We're going to build a sample application that pulls tweets from Twitter's search function every time a URL is hit. We're then going to push those tweets onto an IronMQ queue. Then we'll pull tweets off the queue, one at a time, and display them to the user. We'll then let the user delete them from the queue.

### Pulling the Tweets

To make life a little easier on ourselves, let's use the Twitter gem. Install it:

    :::term
    $ gem install twitter
    Fetching: twitter-2.1.0.gem (100%)
    Successfully installed twitter-2.1.0

If you're building for Rails 3, add the following to your Gemfile:

    :::ruby
    gem 'twitter'

If you're building for Rails 2, add the following to your environment.rb file:

    :::ruby
    gem 'twitter'

Now that we have a convenient wrapper for the Twitter API, let's do a search. We're going to search for "IronMQ", but you could search for mentions of your company, your product, or your favourite cat video.

Run the following command:

    :::term
    $ rails generate controller tweets get view

Rails will generate a bunch of files for you, giving us a skeleton we can work in. Go ahead and open `app/controllers/tweets_controller.rb`. Modify it to look like this:

    :::ruby
    class TweetsController < ApplicationController
      require 'iron_mq'
      require 'twitter'
     
      def get
        tweets = Twitter.search("IronMQ")
        render :json => tweets.inspect
      end

      def view
      end
    end

Easy, right? Load up `your-heroku-app.herokuapp.com/tweets/get`, and you'll see the results of your Twitter search.

### Adding the Tweets to IronMQ

It's time to actually make use of those tweets. We're going to push them to an IronMQ queue, so we can deal with them whenever we feel like it and know we're not missing any of them. Let's modify `app/controllers/tweets_controller.rb` some more:

    :::ruby
    class TweetsController < ApplicationController
      require 'iron_mq'
      require 'twitter'
     
      def get
        tweets = Twitter.search("IronMQ")
        ironmq = IronMQ::Client.new("token"=>ENV["IRON_MQ_TOKEN"], "project_id"=>ENV["IRON_MQ_PROJECT_ID"], "queue_name"=>"tweets")
        tweets.map do |tweet|
          ironmq.messages.post("#{tweet.id}")
        end
        render :json => tweets.inspect
      end

      def view
      end
    end

The IronMQ gem is pretty simple to use. You just instantiate a new client (`IronMQ::Client.new`) and pass it some information. The `token` and `project_id` are the variables we set up earlier, and the `queue_name` is just an identifier for the message queue you want to use. You can have multiple queues per project, and these identifiers help tell them apart. After that, posting a message is as easy as `ironmq.messages.post()`, passing the message we want to post (the ID of the tweet, in this case).

If you load up `your-heroku-app.herokuapp.com/tweets/get`, the tweets you pull from Twitter will be stored in IronMQ. You can tell it worked by going to your Iron.io HUD (click on the IronMQ addon in your Heroku dashboard) and selecting Queues. This will display a list of your queues, along with the number of messages waiting in them.

![Iron.io dashboard](http://i.imgur.com/Ws82V.png)

### Retrieving Tweets from IronMQ

Putting information into IronMQ is great, but it's a little useless if we can't get it out again. We're going to write a method that pulls a single Tweet from IronMQ and displays it. Let's modify `app/controllers/tweets_controller.rb` again:

    :::ruby
    class TweetsController < ApplicationController
      require 'iron_mq'
      require 'twitter'
     
      def get
        tweets = Twitter.search("IronMQ")
        ironmq = IronMQ::Client.new("token"=>ENV["IRON_MQ_TOKEN"], "project_id"=>ENV["IRON_MQ_PROJECT_ID"], "queue_name"=>"tweets")
        tweets.map do |tweet|
          ironmq.messages.post("#{tweet.id}")
        end
        render :json => tweets.inspect
      end

      def view
        ironmq = IronMQ::Client.new('token'=>ENV['IRON_MQ_TOKEN'], 'project_id'=>ENV['IRON_MQ_PROJECT_ID'], 'queue_name'=>'tweets')
        tweet = ironmq.messages.get()
        Twitter.configure do |config|
          config.consumer_key = "CONSUMER_KEY"
          config.consumer_secret = "CONSUMER_SECRET"
          config.oauth_token = "ACCESS_TOKEN"
          config.oauth_token_secret = "ACCESS_SECRET"
        end
        render :inline => Twitter.oembed(tweet.body.to_i).html
      end
    end

As you can see, we now have a `view` method defined. This method configures an IronMQ client (just like we did before) and pops a message off the queue. When a message is popped off the queue, it isn't removed from the queue automatically. 60 seconds after a message is popped off the queue, it's returned to the queue if it hasn't been deleted yet. This ensures that messages are only removed when they've been properly handled.

After we get the message, we configure a Twitter client. The only reason we do this is to get around the rate limiting that Twitter uses on unauthenticated apps. Twitter rate-limits unauthenticated requests based on the IP, and depending on your app, you may have problems with other apps sharing your IP and eating up your API requests. You may be able to avoid this step.

Finally, we get the tweet ID from the `body` attribute of our message, convert it to an integer with `.to_i` so that it will play nice with Twitter's `oembed` function, and get the html output of the `oembed` function. This gives us a nice, embeddable HTML version of the tweet, which we render.

Load up `your-heroku-app.herokuapp.com/tweets/view`, and you'll see the most recent tweet that matched your search query.

### Deleting Tweets from IronMQ

Once we've dealt with the tweet, we need a way to remove it from the queue. We're going to add a new action to our Rails app to take care of this for us. Edit `app/controllers/tweets_controller.rb` again:

    :::ruby
    class TweetsController < ApplicationController
      require 'iron_mq'
      require 'twitter'
     
      def get
        tweets = Twitter.search("IronMQ")
        ironmq = IronMQ::Client.new("token"=>ENV["IRON_MQ_TOKEN"], "project_id"=>ENV["IRON_MQ_PROJECT_ID"], "queue_name"=>"tweets")
        tweets.map do |tweet|
          ironmq.messages.post("#{tweet.id}")
        end
        render :json => tweets.inspect
      end

      def view
        ironmq = IronMQ::Client.new('token'=>ENV['IRON_MQ_TOKEN'], 'project_id'=>ENV['IRON_MQ_PROJECT_ID'], 'queue_name'=>'tweets')
        tweet = ironmq.messages.get()
        Twitter.configure do |config|
          config.consumer_key = "CONSUMER_KEY"
          config.consumer_secret = "CONSUMER_SECRET"
          config.oauth_token = "ACCESS_TOKEN"
          config.oauth_token_secret = "ACCESS_SECRET"
        end
        render :inline => Twitter.oembed(tweet.body.to_i).html + "<br /><br /><a href=\"/tweets/acknowledge/#{tweet.id}\">Acknowledge</a>"
      end

      def acknowledge
        ironmq = IronMQ::Client.new('token'=>ENV['IRON_MQ_TOKEN'], 'project_id'=>ENV['IRON_MQ_PROJECT_ID'], 'queue_name'=>'tweets')
        render :json => ironmq.messages.delete(params[:id])
      end
    end

You'll notice we've added a link to `/tweets/acknowledge/#{tweet.id}` to our `/tweets/view` output. When you get a message off your queue, you get a bunch of useful metadata with it, beyond just the data you passed in. One bit of this metadata is the message ID, which we use to delete the message from the queue.

The `acknowledge` action is simple: we create an `IronMQ::Client` again, using the same code we used in the other two actions. Once it's created, we call `.messages.delete` on it, passing the ID we put in the URL. We render the JSON response we get from the delete call.

That's all it take takes to delete a message. To wire up our new action, edit `config/routes.rb` and add the following line:

    :::ruby
    match "tweets/acknowledge/:id" => "tweets#acknowledge"

This tells Rails to match our new action and that we expect an ID parameter.

### Next Steps

Congratulations! You've written your first application using IronMQ. To get into more advanced uses of it, you may want to check out the [API docs](http://docs.iron.io/mq/api) or a more advanced implementation that ties in [IronWorker](http://addons.heroku.com/iron_worker), [TweetWorker](https://github.com/iron-io/heroku_sinatra_example). 

### Troubleshooting

Issues should get logged with [Heroku Support](https://support.heroku.com). You're also welcome to stop by the Iron.io [support chat room](http://www.hipchat.com/gNWgTiqIC) and chat with Iron's staff about issues. You can also find more resources on the Iron.io [support site](http://support.iron.io) and more documentation on the Iron.io [documentation site](http://docs.iron.io).
