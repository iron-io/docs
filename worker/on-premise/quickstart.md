---
title: IronWorker On-Premise Quickstart
layout: default
section: worker
breadcrumbs:
  - ['On-Premise', '/on-premise']
---

This guide will help set up an initial on-premise IronWorker installation. 

## Requirements

The IronWorker platform delivers asynchronous task execution at scale. To provide this scale, we operate several systems on multiple hosts.

TODO: Add diagram

TODO: Move this diagram to introduction page.

The [IronWorker Platform](introduction) can all be run on one shared machine, or multiple machines. A recommended set up is to have each of the products on a separate machine. That is what we will assume for the rest of this installer.

In addition a local machine is required from which the installer can be run. This machine _MUST_ be able to access all the machines above, but is not required for regular operation.

Each of these machines must have:

* Ubuntu 16.04
* SSH access for user `ubuntu`.
* An SSH public key added to the `ubuntu` user's `authorized_keys` file.

### Installation machine requirements.

In addition, we need a "control machine" where we will run the installer. This machine:

* Can be any OS that supports Docker.
* Must have Docker installed.
* Must have the private key corresponding to the SSH public key on the host machines. 

### Optional

For tasks like logging and stats, additional hosts can be deployed for:

1. ELK stack
2. Graphite/Grafana

## Running the installer

On the host machine, create a directory called `config`.

Create a file called `config/inventory.ini` that contains IP addresses for the host machines.

```
[mongo]
192.168.0.100

[postgresql]
192.168.0.101

[auth]
192.168.0.102

[mq]
192.168.0.103

[minio]
192.168.0.104

[swapi]
192.168.0.105

[runners]
192.168.0.106

[hude]
192.168.0.107

[elk]
192.168.0.108
```

And another file called `config/ssh_key` that contains the SSH private key.

```
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEA11y2JNyxzu+tjodYaeV6f/XaTYs4Fpp+lc1eSF1UYdwkGpzf
...
Faug31F++ZNTER2Tsj4y0qza7bXpJlqsYC1LFhIUC6BgRlFMYjc=
-----END RSA PRIVATE KEY-----
```

You will have to ask an Iron.io employee (TODO: Replace employee with some other term) for credentials required to access all our software. They will provide 2 credentials, a _login_ and a _password_.

Run the following commands to run the installer:

```sh
export DOCKER_LOGIN=<login obtained from Iron.io>
export DOCKER_PASSWORD=<password obtained from Iron.io>
docker run --rm -it -v $PWD/config:/installer/config -e DOCKER_LOGIN -e DOCKER_PASSWORD -e SSH_USER=ubuntu iron/onprem-installer:ansible
```

You should see output similar to:

```
PLAY ***************************************************************************                                                                                           [120/3981]

TASK [python : install python] *************************************************
ok: [192.168.0.100]
ok: [192.168.0.101]
ok: [192.168.0.102]
ok: [192.168.0.103]
ok: [192.168.0.104]
ok: [192.168.0.105]

...
...
...

PLAY RECAP *********************************************************************
192.168.0.100              : ok=17   changed=3    unreachable=0    failed=0
192.168.0.101               : ok=13   changed=1    unreachable=0    failed=0
192.168.0.102               : ok=16   changed=3    unreachable=0    failed=0
192.168.0.103               : ok=16   changed=2    unreachable=0    failed=1
192.168.0.104                 : ok=13   changed=1    unreachable=0    failed=0
192.168.0.105                : ok=13   changed=1    unreachable=0    failed=0
```

If everything went well, there should be no `failed` or `unreachable` items. Perfect, now the installation is complete! We can try running a task.

## Test the installation

TODO: It should be possible for ansible to accept files that do not have a .yml suffix, that way we can have more "command like" invocations.
TODO: Not implemented

    $ docker run --rm -it -v $PWD/config:/installer/config iron/onprem-installer test-install.yml

## Login to the IronWorker dashboard, create a project and get a token

Surf to the IP you used for `hude` in the inventory.ini file above. 

Login with: `ironauth@iron.io` / `password`

Create a new project and copy the project ID to be used in the next step. 

Click the ironauth@iron.io email in the top right and in the drop down menu, choose My Tokens. 

Type in `token1` and then click Create Token. Copy the token to use for the next step. 

## Running tasks

You can either install the [Iron.io CLI Tool](doc:ironio-cli-tool) or use the CLI's docker image. We'll use the docker image here so you don't have to install anything right now. 

To make things easier, let's add our required environment variables to a file called `.env`, and copy the following into it:

```sh
IRON_TOKEN=$TOKEN_FROM_ABOVE 
IRON_PROJECT_ID=$PROJECT_ID_FROM_ABOVE \
IRON_HOST=$IP_OF_SWAPI_HOST \
IRON_SCHEME=http
IRON_PORT=9090
```

TODO: make iron cli support WORKER_URL to include all of the above in one var. 

Now let's register a docker image with the service:

```sh
docker run --rm -it --env-file .env iron/cli register iron/hello
```

And queue up a job for it:

```sh
docker run --rm -it --env-file .env iron/cli worker queue --wait iron/hello
```
    
Once that runs, look at the project your created in the IronWorker Dashboard to see the task status. It will probably have finished running already. You can see the task log, which should say `Hello World!`. Success!

## Logging

Logging is provided by the ELK stack. 

Surf to http://$IP_OF_ELK_HOST:5601/ , then change the text field that shows up from "logstash-*" to "*". Then click the discover tab to see the logs!

## Metrics

TODO:
