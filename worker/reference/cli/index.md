---
title: The IronWorker Command Line Tool
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['Command Line', 'cli']
---

The Iron.io command line tool will help you interact with the IronWorker API to make creating workers easier.

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#installing">Installing</a></li>
    <li><a href="#configuration">Configuration</a></li>
    <li><a href="#creating__uploading_code_packages">Creating and Uploading Code Packages</a></li>
    <li><a href="#upload_with_multiple_environments">Upload with Multiple Environments</a></li>
    <li><a href="#queuing_tasks">Queuing Tasks</a></li>
    <li><a href="#scheduling_tasks">Scheduling Tasks</a></li>
    <li><a href="#retrieving_a_tasks_log">Retrieving a Task's Log</a></li>
  </ul>
</section>

<h2 id="installing">Installing</h2>

The new [Iron cli](https://github.com/iron-io/ironcli) tool has an easy installer:

```sh
curl -sSL http://get.iron.io/cli | sh
```

You can find downloads if you don't want to install it with the above command in the ironcli repo.

You'll also need [Docker](http://docker.com) installed on your machine to test your workers.

You should be all set up now. To check your installation, run the following:

```sh
iron --version
```

<h2 id="configuration">Configuration</h2>

The command line tool follows the global
[configuration scheme](/worker/reference/configuration) that all official libraries
use. You can configure the tool by creating an `iron.json` file in the
directory of your worker, an `.iron.json` file in your home directory,
or the environment variables. For example, to override the project ID for a
single command, you could run the following:

```sh
IRON_PROJECT_ID=new_project_id_here iron worker upload --zip myworker.zip --name myworker iron/images:ruby-2.1 ruby myworker.rb
```

The same applies to the `IRON_TOKEN` environment variable.

Where `$WORKER` is replaced by the name of your packaged worker zip and `$COMMAND` is the command you want executed, the same
one you used with `docker run`.

Sometimes, you want to limit the number of parallel workers for any given task, to prevent external resources like databases or APIs from crashing under the weight of your workers' requests. We have a [max_concurrency](http://blog.iron.io/2012/08/ironworkers-most-requested-feature-is.html) feature that lets you do just this. To use it, simply use the `--max-concurrency` option when uploading a worker, with the maximum number of workers that can be run in parallel:

```sh
iron worker upload --max-concurrency 10 ...
```

If you're worried about errors, your worker is idempotent (meaning that it can be run multiple times without affecting the result), and you'd like to automatically retry your worker if it errors out, you can use the `retries` and `retries-delay` options. `retries` allows you to specify the maximum number of times failed tasks will be re-run:

```sh
iron worker upload --retries 5 ...
```

You can also optionally specify the delay between retries by using `retries-delay`:

```sh
iron worker upload --retries 5 --retries-delay 10 ...
```

There are additional options available to the upload command; you can find
a list of them by running `iron worker upload --help`. All of these options can be mixed and matched at will to easily create very complex, specific behaviors.

<h2 id='creating__uploading_code_packages'>Creating and Uploading Code Packages</h2>

Once your code has been written, you will want to use the CLI to upload your code package into Iron.io. The first thing you'll do is compress the directory you are working in (assumming this directory is only for this worker) by running
```sh
zip -r helloworker.zip .
```

Now that our code ius ready, ut's time to uplod it to Iron.io
```sh
iron worker upload [--zip rubies.zip] --name myworker DOCKER_IMAGE [COMMAND]

```

<h2 id="upload_with_multiple_environments">Upload with Multiple Environments</h2>

It is common to want to use IronWorker across many different development environments.

When uploading your worker you can specify an environment via the ``--env`.

```sh
iron --env test       worker upload --zip helloworker.zip --name helloworker iron/images:ruby-2.1 ruby rubies.rb
iron --env production worker upload --zip helloworker.zip --name helloworker iron/images:node-0.10 node nodes.js
```

We recommend you create separate projects for each development environment.
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

<h2 id="queuing_tasks">Queuing Tasks</h2>

Testing workers no longer takes a script that creates a task to test with.
Instead, you can queue tasks directly from the command line:

```sh
iron worker queue [--priority 0|1|2] [--payload '{"somekey": "some_value", "array": ["item1", "item2"]}'] $WORKER
```

Alternatively, you can specify a payload file, instead of providing the payload inline:

```sh
iron worker queue --payload-file /path/to/payload/file.json $WORKER
```

Sometimes, you want a task to be queued after a delay. You can easily do this with the `--delay` option:

```sh
iron worker queue --delay 60 $WORKER
```

The task will then be queued after the number of seconds passed to delay (one minute in the above example).

If you want to limit a task to a certain run time below our one hour max, you can do that with the `--timeout` option:

```sh
iron worker queue --timeout 1800 $WORKER
```

The task will automatically be killed after the number of seconds passed to timeout (half an hour in the above example).

There are a lot of options when you queuing tasks that can be combined to get exactly the execution you need. You can find a list of these options by running `iron_worker queue --help`.

<h2 id="scheduling_tasks">Scheduling Tasks</h2>

The command line tool also allows you to schedule tasks to be run repeatedly
or at a later time, just as the gem would allow you to in a script.

You can schedule a task using the following command:

```sh
iron worker schedule [--start-at "2013-01-01T00:00:00-04:00"] [--run-times 4] [--priority 0|1|2] [--payload '{"somekey": "some_value"}'] $WORKER
```

You can find a list of options for the command by running `iron worker schedule --help`.

<h2 id="retrieving_a_tasks_log">Retrieving a Task's Log</h2>

You no longer have to write a script to check the log of your tasks. You can
install call the following command:

```sh
iron worker log [OPTIONS]
```

You can find a list of options for the command by running `iron worker log --help`.
