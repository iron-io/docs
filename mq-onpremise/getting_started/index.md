---
title: IronMQ On-Premise Installation
summary: "IronMQ On-Premise requires some knowledge of deployment and server management. If you do not possess these skills please schedule a consultation with our team"
layout: default
section: mq-onpremise
---

<p class="subtitle">
<!--   IronMQ On-Premise requires some knowledge of deployment and server management. If you do not possess these skills please schedule a consultation with our team -->
</p>



<section id="toc">
  <h3>Getting Started</h3>
  <ul>
    <li><a href="#download">Download</a></li>
    <li><a href="#requirements">Recomended System Requirements</a></li>
    <li><a href="#install">Install</a></li>
    <li><a href="#setup_user_project">Setup New User and Project</a></li>
    <li><a href="#update_installation">Updating Installation</a></li>
    <li><a href="#backups">Backups</a></li>
  </ul>
</section>

<h2 id="download">Download Single Server Binary</h2>
You can download our single sever evaluation version <a href="http://iron.io/mq-enterprise">here</a>.
<h2 id="requirements">Recomended System Requirements</h2>
<ul>
  <li>Operating System: x64 linux (kernel 3+) or docker container</li>
  <li>RAM : 8GB+  </li>
  <li>CPU : Multicore CPU</li>
  <li>Storage : SSD Drive</li>
</ul>

<h2 id="install">Unpack, Install, and Start</h2>

  1. #### Unpack the provided archive

    ```
    unzip ironmq-x.y.z....zip
    ```

    You will end up with a directory called `ironmq`, cd into that directory to
    continue.

  2. #### Run install script

    ```
    ./iron install
    ```

  3. ####Start Services

    ```
    ./iron start
    ```

<h3 id="setup_user_project">Setup New User and Project</h3>

  With the server running in a seperate terminal window run the following commands to create a new user and a new project.

1. create a new user
  by default the admin password is set to ***superToken123***, it is recommended you change this after initially creating your first user account.

  ```
  ./iron -t superToken123 create user somebody@somewhere.com password
  ```

2. create a new project

  Grab the token that's printed after previous command, you'll need it for the
  next ones.

  ```
  ./iron -t NEWTOKEN create project myproject
  ```

  Then you can use that new project with the new token to use the API.

<h2 id="configuration">Configuration</h2>
Some Cases you may want to change the default configuration options we have setup in our single server evaluation.

edit ironauth/config.json and/or ironmq/config.json
Note: be sure super_user.token from ironauth config matches super_token in ironmq config.

1. Locate the configuration file ***config.json*** within /bin/mq/config.json

  ```
  {
    "license": {
      "description": "This is your license key provided by Iron.io",
      "key": "DONTCHANGEME"
    },
    "api": {
      "http_port": 8080
    },
    "auth": {
      "host": "http://localhost:8090"
    },
    "logging": {
      "to": "stdout/stderr",
      "level": "debug",
      "prefix": ""
    },
    "stathat":{
      "email":""
      "prefix":""
    }
    "pusher": {
      "num_queues_brokers": 5,
      "num_messages_consumers": 50,
      "dial_timeout": 10,
      "request_timeout": 60
    },
    "aes_key_description": "Key for generating id's.",
    "aes_key": "770A8A65DA156D24EE2A093277530142",
    "data": {
      "dir_description": "Where data files will be stored",
      "dir": "../data",
      "cache_size_description": "Size of cache in MB -- don't get carried away",
      "cache_size": 128
    },
    "host": "locahost"
  }
  ```

  * **license** - do not modify
  * **api** - this is the default port for your IronMQ server
  * **auth** - this is the default host for your IronMQ Auth Server
  * **logging** - by default logs will be output to stdout/stderr. A prefix is useful should you be storing logs for a service like papertrail
  * **stathat** - IronMQ and IronAuth will both default to sending logs in the form of metadata to Iron.io's internal tools. We would appreciate keeping this turned on in order to better assist with performance and configuration questions.
  * **pusher** - do not modify
  * **stathat** - IronMQ and IronAuth will both default to sending logs in the form of metadata to Iron.io's internal tools. We would appreciate keeping this turned on in order to better assist with performance and configuration questions.
  * **aeskey** - do not modify
  * **data**
    * **dir** - this is the data directory that your server will be using.
    * **cache_size** - this is the size of the cache in MB.


<h2 id="updating_installation">Update Installation</h2>

  Get the latest zip package and unzip it (same as in getting started)

  1. ### Stop running services

    ```
    sudo stop ironmq
    sudo stop ironauth
    ```

  2. ### Install upgrade

    ```
    ./iron install
    ```

  3. ### Start services again

    ```
    sudo start ironauth
    sudo start ironmq
    ```

<h2 id="backups">Backing Up Data</h2>

  ***CAUTION:*** Hot backups during runtime are currently not supported, you must stop the services before backing up.

  1. ### Stop services
    First stop the service. If using Upstart:

    ```
    sudo stop ironmq
    sudo stop ironauth
    ```

  2. ### Copy data directory

    Make a copy of the data directory to another directory. Data files will be stored at `$HOME/iron/data` by default if you haven't changed the configs.

  3. ### Start services
    After you've copied the files, you can start the services back up again:

    ```
    sudo start ironauth
    sudo start ironmq
    ```

  4. ### Archive safely.