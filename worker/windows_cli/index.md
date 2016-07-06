---
title: Windows version of the IronWorker CLI
layout: default
section: worker
breadcrumbs:
  - ['CLI Tool', 'cli', 'Windows']
---

The Iron.io command line tool will help you interact with the IronWorker API to make creating workers easier.
<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#installing">Install</a></li>
    <li><a href="#configuration">Configure</a></li>
    <li><a href="#Confirm">Confirm</a></li>
    <li><a href="#troubleshooting">Docker Troubleshooting</a></li>
  </ul>
</section>

<h2 id="installing">Install</h2>

Head over to [https://github.com/iron-io/ironcli/releases](https://github.com/iron-io/ironcli/releases) and download the newest version of the cli. 


<h2 id="configuration">Configure</h2>
Open a new Command Line and CD into the directory you’ve downloaded the executable to. From that directory, confirm the installation was successful by checking the version

```sh
ironcli.exe --version
```

Now that it’s working, let's move everything to C:\ directly (Replacing $username with your username)

```sh
copy c:\Users\$username\Downloads\ironcli.exe c:\IronCli\iron.exe
```

Once that has been completed, add the C:\IronCli to the PATH Environment Variable. If you need help with this step, please see [this article](http://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/) as a guide.

<h2 id="confirm">Confirm</h2>
Finally, to confirm everything has been setup properly, open a new Command Line and run

```sh
iron --version
```

Now you can follow along with all of the examples in the docs. 

<hr />

<h2 id="troubleshooting">Docker Troubleshooting</h2>

If you're having trouble getting started with Docker in Windows, here are a few things to consider.

The Linux VM in the VirtualBox maps the c/Users directory in the VM instance to the C:\Users folder in Windows. So be sure your source code for your worker is in a folder under C:\Users, then cd to that folder in the context of the VM (in Docker terminal) and run it from there.

<h3>Specifying paths in docker commands</h3>

Sometimes the Docker Terminal tool cannot properly recognize the paths given to docker commands as arguments. Assume you're creating a bind mount using the <b>-v</b> option:

```sh
docker run --rm -v "$PWD":/worker-w /worker IMAGE [COMMAND]
```

If you get an invalid path error, you should retry the above command with additional "/" signs:

```sh
docker run --rm -v "//$PWD":/worker -w //worker IMAGE [COMMAND]
```
