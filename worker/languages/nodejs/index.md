---
title: IronWorkers in Node.js
layout: default
section: worker
breadcrumbs:
  - ['Languages', '/languages']
  - ['Node.js', '/nodejs']
---

<b>This approach uses our depreciated workflow. Please see <a href='https://github.com/iron-io/dockerworker/tree/master/node'>https://github.com/iron-io/dockerworker/tree/master/node</a> for the current process.</b>

<span class="notice-highlight">
Notice -- For the NPM Certificate Error. Please use the following in your ".worker" file, instead of <code>build "npm install"</code>:
</span>

```js
build "npm config set strict-ssl false; npm install --production"
```
<hr>

[Node.js](http://www.nodejs.org) is an evented language that brings the well-known
Javascript language to server-side development, using Google's [V8](http://code.google.com/p/v8/)
runtime. The evented model of programming lends itself nicely to the asynchronous
nature of workers, making it a natural fit for IronWorker. This article will walk you through getting your Node.js workers running on IronWorker, but you should still be familiar with the [basics of IronWorker](/worker).

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li>
      <a href="#quick_start">Quick Start</a>
      <ul>
        <li><a href="#get_the_cli">Get the CLI</a></li>
        <li><a href="#get_docker">Get Docker</a></li>
        <li><a href="#create_your_configuration_file">Create Your Configuration File</a></li>
        <li><a href="#write_your_nodejs_worker">Write Your Node.js Worker</a></li>
        <li><a href="#params_and_config_inside_worker">Accessing the Params and Config Variables.</a></li>
        <li><a href="#test_locally">Test Your Code Locally</a></li>
        <li><a href="#upload_your_worker">Upload Your Worker</a></li>
        <li><a href="#queue_up_tasks_for_your_worker">Queue Up Tasks for Your Worker</a></li>
      </ul>
    </li>
    <li>
      <a href="#deep_dive">Deep Dive</a>
      <ul>
        <li><a href="#payload_example">Payload Example</a></li>
        <li><a href="#exit_example">Exit Worker expicitly with an exit code</a></li>
        <li><a href="#packaging_dependencies">Packaging Dependencies</a></li>
      </ul>
    </li>
  </ul>
</section>

<h2 id="quick_start">Quick Start</h2>

<h3 id="get_the_cli">Get the CLI</h3>

We've created a [command line interface](/worker/reference/cli) to the IronWorker service
that makes working with the service a lot easier and more convenient.

<figcaption><span>Command Line </span></figcaption>


```sh
$ curl -sSL https://cli.iron.io/install | sh
```

<h3 id="get_docker">Get Docker</h3>
This allows you to test your worker locally in the exact same environment as when running on the IronWorker platform using Iron.io's public Docker images. To get started, just head to <a href="http://www.docker.com">www.docker.com<a/> and download the appropriate version.



<h3 id="create_your_configuration_file">Create Your Configuration File</h3>

You'll need a configuration file or environment variables set that tell it what your credentials are. We have some [pretty good documentation](/worker/reference/configuration) about how this works, but for simplicity's sake, just save the following as `iron.json` in the same directory as your JavaScript file.

<figcaption><span>iron.json </span></figcaption>

```js
{
  "project_id": "INSERT YOUR PROJECT ID HERE",
  "token": "INSERT YOUR TOKEN HERE"
}
```

You should insert your [project ID](https://hud-e.iron.io) and [token](https://hud-e.iron.io/tokens) into that `iron.json` file. Then, assuming you're running the commands from within the folder, the CLI will pick up your credentials and use them automatically.

<h3 id="write_your_nodejs_worker">Write Your Node.js Worker</h3>

<figcaption><span>hello_worker.js </span></figcaption>

```js
console.log("Hello World from Node.js.");
```

<h3 id="params_and_config_inside_worker">Accessing the Params and Config Variables.</h3>
To access the contents of the configuration and payload variables from within your worker use the following helpers we've included in your environment. see source for these helpers <a href="https://github.com/iron-io/iron_worker_ruby_ng/blob/master/lib/iron_worker_ng/code/runtime/node.rb">here</a>.
<figcaption><span>hello_worker.js </span></figcaption>

```js
var worker = require('node_helper');
console.log("params:", worker.params);
console.log("config:", worker.config);
console.log("task_id:", worker.task_id);
```

<h3 id="test_locally">Test Your Code Locally</h3>

If this is your first time using these images, it may take a bit of time to download, but once their on your system, it's lightening fast. Run the following commands:

<figcaption><span>hello.worker </span></figcaption>

```
$ docker run --rm -v "$PWD":/worker -w /worker iron/node node hello_worker.js

```


<h3 id="upload_your_worker">Upload Your Worker</h3>

Commands below will create your worker code package and upload it to the IronWorker platform. Remember, you only need to do this when you make changes to your worker code.

<figcaption><span>Command Line </span></figcaption>


```sh
$ zip -r hello_worker.zip .
$ iron worker upload --zip hello_worker.zip --name hello_worker iron/images:node-4.1 nodehello_worker.js
```

The first command zips up everything in the current directory named hello_worker.zip.

The next command uploads the package to the Iron.io platform. 
That command will read your .worker file, create your worker code package and upload it to IronWorker. Head over to [hud-e.iron.io](https://hud-e.iron.io), click the Worker link on your projects list, then click the Tasks tab. You should see your new worker listed there with zero runs. Click on it to show the task list which will be empty, but not for long.

Let’s quickly test it by running:

    iron_worker queue hello

Now look at the task list in HUD and you should see your task show up and go from "queued" to "running" to "completed".

Now that we know it works, let’s queue up a bunch of tasks from code. **Note**: Once you upload a code package, you can queue as many tasks as you'd like against it. You only need to re-upload the code package when your code changes.

<h3 id="queue_up_tasks_for_your_worker">Queue Up Tasks for Your Worker</h3>

Once your code has been uploaded, it's easy to queue a task to it. It's a single,
authenticated [POST request](/worker/reference/api/#queue_a_task) with a JSON
object. This can be done through your code, or the commandline:

<figcaption><span>Command Line </span></figcaption>

```shell
iron worker queue --wait hello_worker
```

You can also do this through your code:


<figcaption><span>Node.js </span></figcaption>
```js
var ironWorker = require('iron_worker');
 
var client = new ironWorker.Client();
 
client.tasksCreate('hello', {foo: 'bar'}, {}, function(error, body) {
  console.log(body);
});
```


**Note**: Please make sure to check out our official [node client library](/worker/libraries)


<h2 id="deep_dive">Deep Dive</h2>

<h3 id="payload_example">Payload Example</h3>

Retrieving the payload in Node.js is the same as it is on any other language.
Retrieve the `-payload` argument passed to the script, load that file, and
parse it as JSON.

We've included a useful helper module in node to assist in retrieving the payload and configuration variables in node. Simply require the helper module  and call config, params, task_id.

<figcaption><span>payload.js </span></figcaption>

```js
var worker = require('node_helper');
console.log("params:", worker.params);

// you can also access the following
console.log("config:", worker.config);
console.log("task_id:", worker.task_id);
```

<h3 id="packaging_dependencies"> Packaging Worker Dependencies using Node </h3>

dependencies with Node require that you create a package.json file
To generate a package.json the following **more info:**[npm init](https://github.com/isaacs/init-package-json)

```sh
npm-init
```

when adding and installing modules run then following to automatically update your package.json manifest.

```sh
npm install <module name> --save
```

<h3 id="exit_example">Ensuring your script exits with the right exit code</h3>

It is important in some cases to declare a explicit exit code to give our systems a indication if your worker has completed sucessfully or failed. this also prevents instances where your worker may just hang or wait.
In your worker:

```python
process.exit(1); 
/* Task was unsuccessful */
process.exit(0); 
/* Task was successful */
```

### Local build

**requirements**
- package.json with included dependencies
- /node_modules directory
- any other dependencies (files, directories, etc.) 

If you're using NPM modules within your worker, you're going to need to package those dependencies when you upload the worker. To do this, add

`dir "node_modules"`

and

`file "package.json"`

to your .worker file:

<figcaption><span>hello.worker </span></figcaption>

```ruby
# set the runtime language; this should be "node" for Node.js workers
runtime "node"
# exec is the file that will be executed when you queue a task
exec "hello_worker.js" # replace with your file
dir "node_modules" # include dependency files when uploading
file "package.json" # include dependency manifest when uploading
```

### Remote build

**requirements**
- package.json with included dependencies

If you're using NPM modules within your worker, you're going to need to package those dependencies when you upload the worker. To do this, add a `dir "node_modules"` line and a `file "package.json"` line to your .worker file:

<figcaption><span>hello.worker </span></figcaption>

```ruby
runtime "node"
exec "hello_worker.js" # replace with your file
file "package.json" # include dependency manifest when uploading
build "npm install" # run npm install
# build your dependencies remotely from package.json
remote # you can use "full_remote_build true" or shorthand "remote"
```
