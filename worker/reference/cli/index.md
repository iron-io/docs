---
title: The IronWorker Command Line Interface
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['Command Line', 'cli']
---

PaaS providers like [Heroku](http://www.heroku.com), [AppFog](http://www.appfog.com),
and [App Engine](http://appengine.google.com) have all standardised around
the convention of using a command line interface to interact with your apps.
In our effort to provide tools that work with developers' current work flow,
IronWorker has created a command line tool to interact with the service.

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#installing">Installing</a></li>
    <li><a href="#configuration">Configuration</a></li>
    <li><a href="#testing_your_workers_locally">Testing Your Workers Locally</a></li>
    <li><a href="#creating__uploading_code_packages">Creating and Uploading Code Packages</a></li>
    <li><a href="#upload_with_multiple_environments">Upload with Multiple Environments</a></li>
    <li><a href="#queuing_tasks">Queuing Tasks</a></li>
    <li><a href="#scheduling_tasks">Scheduling Tasks</a></li>
    <li><a href="#retrieving_a_tasks_log">Retrieving a Task's Log</a></li>
  </ul>
</section>

## Installing

The command line interface for IronWorker uses the [IronWorkerNG gem](http://github.com/iron-io/iron_worker_ruby_ng),
so you'll need to install both the gem and Ruby.

To check if you have Ruby installed, run

<figcaption><span>Command Line </span></figcaption>


```sh
$ ruby -v
```

If you don't have Ruby installed, you can get instructions on installing it
from [the Ruby website](http://www.ruby-lang.org/en/downloads/).

Once Ruby is installed, you'll need the IronWorkerNG gem:

<figcaption><span>Command Line </span></figcaption>


```sh
$ gem install iron_worker_ng
```

You should be all set up now. To check your installation, run the following:

<figcaption><span>Command Line </span></figcaption>


```sh
$ iron_worker -v
```

## Configuration

The command line tool is really just the Ruby gem, so it follows the global
[configuration scheme](/worker/reference/configuration) that all official libraries
use. You can configure the tool by creating an `iron.json` file in the
directory of the `.worker` file, an `.iron.json` file in your home directory,
or the environment variables. For example, to override the project ID for a
single command, you could run the following:

<figcaption><span>Command Line </span></figcaption>


```sh
$ IRON_PROJECT_ID=new_project_id_here iron_worker upload myworker
```

The same applies to the `IRON_TOKEN` environment variable.

You can use [.worker files](/worker/reference/dotworker) to define workers
that can then be uploaded or run using the command line tools.

## Testing Your Workers Locally

It's a pain to upload every change in code without knowing if it works. To help ease that pain, we've created a command to run workers locally, on your machine. You can use the following command to run a worker:

<figcaption><span>Command Line </span></figcaption>


```sh
$ iron_worker run $WORKER
```

Where `$WORKER` is replaced with the name your .worker file. For example, if your file is named `my_worker.worker`, you would use `iron_worker run my_worker`.

If you need to test code that uses a payload, just include the payload or the path to a file containing the payload:

<figcaption><span>Command Line </span></figcaption>


```sh
$ # specify the payload inline
$ iron_worker run $WORKER --payload '{"this": "is a test", "that": {"test": "object test"}}'

$ # specify a file containing the payload
$ iron_worker run $WORKER --payload-file /path/to/payload.json
```

#### Important notes:

The CLI offers the run command to try and help test and debug workers locally.
Because it is so complicated to manage an environment, this may not function in every environment.
Here are some scenarios in which you may not be able to use the run command:

1. When running under Windows.

2. When running compiled binaries or packages on OS X or 32-bit Linux.

3. When using the `deb` feature in your `.worker` file under non-Debian systems:
    <figcaption><span>Ruby Code</span></figcaption>

```ruby
    deb "feature-package.deb"
    ```
    Possible solution: install `dpkg`.

4. Trying to use a dependency (like "mono") that is present in IronWorker's environment but not your local environment.

For best results, we recommend using the run command in an environment that matches
IronWorker's as closely as possible: 64-bit (x86-64) Ubuntu Linux, with the same pre-installed packages installed.

## Creating & Uploading Code Packages

The command to upload a worker is:

<figcaption><span>Command Line </span></figcaption>


```sh
$ iron_worker upload $WORKER
```

Where `$WORKER` is replaced by the name of your worker file, minus the .worker.

Sometimes, you want to limit the number of parallel workers for any given task, to prevent external resources like databases or APIs from crashing under the weight of your workers' requests. We have a [max_concurrency](http://blog.iron.io/2012/08/ironworkers-most-requested-feature-is.html) feature that lets you do just this. To use it, simply use the `--max-concurrency` option when uploading a worker, with the maximum number of workers that can be run in parallel:

<figcaption><span>Command Line </span></figcaption>


```sh
$ iron_worker upload $WORKER --max-concurrency 10
```

If you're worried about errors, your worker is idempotent (meaning that it can be run multiple times without affecting the result), and you'd like to automatically retry your worker if it errors out, you can use the `retries` and `retries-delay` options. `retries` allows you to specify the maximum number of times failed tasks will be re-run:

<figcaption><span>Command Line </span></figcaption>


```sh
$ iron_worker upload $WORKER --retries 5
```

You can also optionally specify the delay between retries by using `retries-delay`:

<figcaption><span>Command Line </span></figcaption>


```sh
$ iron_worker upload $WORKER --retries 5 --retries-delay 10
```

There are additional options available to the upload command; you can find
a list of them by running `iron_worker upload --help`. All of these options can be mixed and matched at will to easily create very complex, specific behaviors.

## Upload with Multiple Environments (--env)

It is common to want to use IronWorker across many different development environments.

When uploading your worker you can specify an environment via the ** --env ** (or ** -e ** option).

<figcaption><span>Command Line </span></figcaption>


```sh
$ iron_worker upload helloworker --env development
$ iron_worker upload helloworker --env staging
$ iron_worker upload helloworker -e test
$ iron_worker upload helloworker -e production
```

 We reccomend you create seperate projects for each development environment.
Below is an example of a typical iron.json with multiple environments iron.json into multiple development environments via different project id's and tokens.


```js
{
  "production": {
    "token": "AAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "project_id": "000000000000000000000001"
  },
  "staging": {
    "token": "BBBBBBBBBBBBBBBBBBBBBBBBBB",
    "project_id": "000000000000000000000002"
  },
  "development": {
    "token": "CCCCCCCCCCCCCCCCCCCCCCCCCC",
    "project_id": "000000000000000000000003"
  },
  "test": {
    "token": "DDDDDDDDDDDDDDDDDDDDDDDDDD",
    "project_id": "000000000000000000000004"
  }
}
```

## Queuing Tasks

Testing workers no longer takes a script that creates a task to test with.
Instead, you can queue tasks directly from the command line:

<figcaption><span>Command Line </span></figcaption>


```sh
$ iron_worker queue $WORKER [--priority 0|1|2] [--payload '{"somekey": "some_value", "array": ["item1", "item2"]}']
```

Alternatively, you can specifiy a payload file, instead of providing the payload inline:

<figcaption><span>Command Line </span></figcaption>


```sh
$ iron_worker queue $WORKER --payload-file /path/to/payload/file.json
```

Sometimes, you want a task to be queued after a delay. You can easily do this with the `--delay` option:

<figcaption><span>Command Line </span></figcaption>


```sh
$ iron_worker queue $WORKER --delay 60
```

The task will then be queued after the number of seconds passed to delay (one minute in the above example).

If you want to limit a task to a certain run time below our one hour max, you can do that with the `--timeout` option:

<figcaption><span>Command Line </span></figcaption>


```sh
$ iron_worker queue $WORKER --timeout 1800
```

The task will automatically be killed after the number of seconds passed to timeout (half an hour in the above example).

There are a lot of options when you queuing tasks that can be combined to get exactly the execution you need. You can find a list of these options by running `iron_worker queue --help`.

## Scheduling Tasks

The command line tool also allows you to schedule tasks to be run repeatedly
or at a later time, just as the gem would allow you to in a script.

You can schedule a task using the following command:

<figcaption><span>Command Line </span></figcaption>


```sh
$ iron_worker schedule [--start-at "2013-01-01T00:00:00-04:00"] [--run-times 4] [--priority 0|1|2] [--payload '{"somekey": "some_value"}'] $WORKER
```

You can find a list of options for the command by running `iron_worker schedule --help`.

## Retrieving a Task's Log

You no longer have to write a script to check the log of your tasks. You can
install call the following command:

<figcaption><span>Command Line </span></figcaption>


```sh
$ iron_worker log [OPTIONS]
```

You can find a list of options for the command by running `iron_worker log --help`.
