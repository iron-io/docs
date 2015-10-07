# Hybrid IronWorker

Hybrid IronWorker enables you to get all the power and benefits of IronWorker platform while running your workloads on your own
hardware. You can run them on your own servers on any cloud or even in your own datacenter, behind the firewall.

## Installation / Setup

It's very easy to get started using Hybrid IronWorker. Just follow the steps below to get started. 

NOTE: You must have Hybrid access enabled on your account. Email [support@iron.io](mailto:support@iron.io) to upgrade your account. 

### 1. Create a Cluster

Login to [HUD](http://hud.iron.io), click IronWorker, then click your name in the top right and then click Clusters.
You'll see a list of existing clusters if any and a link to Create a new one. Click the _Create Cluster_ link. 
Fill out the form and submit it. You'll get a CLUSTER_ID and CLUSTER_TOKEN that you'll need in the next steps. 

### 2. Launch the iron/runner image

On any machine that has Docker installed, just run our iron/runner image with the following flags:

```sh
sudo docker run --name ironrunner -it --privileged -d -e "CLUSTER_ID={CLUSTER_ID}" -e "CLUSTER_TOKEN={CLUSTER_TOKEN}" --net=host iron/runner
```

Replace {CLUSTER_ID} and {CLUSTER_TOKEN} with the id and token you obtained in step 1 above. 

That's it!  Launch as many of these as you want/need. 

## Using your new Cluster

Everything is the same as using IronWorker on the public cloud, except When queuing jobs, simply pass in the CLUSTER_ID in the "cluster" param ([API docs](http://dev.iron.io/worker/reference/api/#queue_a_task)). Example from the cli:

```sh
iron worker queue --cluster CLUSTER_ID myworker
```

## Running on AWS

Nothing special is required to run on AWS, the same steps apply above, but you can use the following cloud-init/User Data script to install Docker and start IronWorker. This has been tested on Ubuntu 15.04 AMI. 

```
#!/bin/sh
curl -sSL https://get.docker.com/ | sh
sudo service docker start
echo \"Starting runners\"
sudo docker run --name ironrunner -it --privileged -d -e "CLUSTER={CLUSTER_ID}" -e "TOKEN=#{CLUSTER_TOKEN}" --net=host iron/runner
```
