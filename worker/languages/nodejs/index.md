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
        <li><a href="#local_test">Test Your Worker Locally</a></li>
        <li><a href="#Zip_and_Upload">Zip and Upload</a></li>
        <li><a href="#queue_job">Queue a Worker</a></li>
      </ul>
    </li>
    <li>
      <a href="#deep_dive">Deep Dive</a>
      <ul>
        <li><a href="#exit_example">Exit Worker expicitly with an exit code</a></li>
        <li><a href="#packaging_dependencies">Packaging Dependencies</a></li>
      </ul>
    </li>
  </ul>
</section>

<h2 id="quick_start">Quick Start</h2>

<h3 id="get_the_cli">Get the CLI</h3>

We've created a [command line interface](/worker/cli) to the IronWorker service
that makes working with the service a lot easier and more convenient.
Simply open the terminal, and run this command:

<figcaption><span>Command Line </span></figcaption>


```sh
$ curl -sSL https://cli.iron.io/install | sh
```
<h3 id="get_docker">Get Docker</h3>
Docker is the tool to create and manage images for your workers. It also allows you to test locally in the exact same environment as production to allow for easy intergenerations.

To download Docker, click this link- <a href="https://docs.docker.com/mac/started/">https://docs.docker.com/mac/started/</a>

<h3 id="create_your_configuration_file">Create Your Configuration File</h3>

The CLI needs a configuration file or environment variables set that tell it what your credentials are. We have some [pretty good documentation](/worker/reference/configuration) about how this works, but for simplicity's sake, just save the following as `iron.json` in the same directory as your worker file:

<figcaption><span>iron.json </span></figcaption>

```js
{
  "project_id": "INSERT YOUR PROJECT ID HERE",
  "token": "INSERT YOUR TOKEN HERE"
}
```

You should insert your [project ID](https://hud.iron.io) and [token](https://hud.iron.io/tokens) into that `iron.json` file. Then, assuming you're running the commands from within the folder, the CLI will pick up your credentials and use them automatically.

<h3 id="write_your_nodejs_worker">Write Your Node.js Worker</h3>

<figcaption><span>hello_worker.js </span></figcaption>

```js
console.log("Hello World from Node.js.");
```
<h3 id="local_test">Test your Worker Locally</h3>
In the directory that holds your worker and the iron.json file run:

<figcaption><span>Command Line </span></figcaption>


```sh
$ docker run --rm -v "$PWD":/worker -w /worker iron/node node hello_worker.js
```

That command will take your code and run it in the iron/node image we have. If this is your first time using this image, Docker will need to go download a copy from Docker Hub. That may take a few moments, but only needs to be done once.

<h3 id="Zip_and_Upload">Zip and Upload your Worker</h3>

Now that the code has been successfully tested, it's time to move it into IronWorker. First, zip the contents of your current directory 

<figcaption><span>Command Line</span></figcaption>

```sh
$ zip -r hello_worker.zip .
```

This will put all of the files in your directory in a compressed file called hello_worker.zip. Now, let's upload that file into Iron.


```sh
$ $ iron worker upload --zip hello_worker.zip --name hello_worker iron/node node hello_worker.js
```
That will take the file we created and upload it into Iron with the name of hello_worker. iron/node is the image we are runnoingthis on and node hello_worker.js is the command we are running.

<h3 id="queue_job">Queue a Job</h3>
Now you can queue up as many tasks as you want, whenever you want:

```sh
$ iron worker queue --wait hello_worker
```

If you prefer, you can do this in your worker:
<figcaption><span>hello_worker.js</span></figcaption>
```js
var ironWorker = require('iron_worker');
 
var client = new ironWorker.Client();
 
client.tasksCreate('hello', {foo: 'bar'}, {}, function(error, body) {
  console.log(body);
});
```



<h2 id="deep_dive">Deep Dive</h2>



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
