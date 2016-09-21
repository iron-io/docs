---
title: IronWorker On-Premise Manual Installation
layout: default
section: worker
breadcrumbs:
  - ['On-Premise', '/on-premise']
---

This section has manual installation instructions for all operations. While best effort is made to keep this in sync with the installer, this should not be assumed as canonical. 
The canonical source are the [Ansible instructions](https://github.com/iron-io/on-premises/tree/installer-packaging/images/installer/ansible/roles). 
Versions for these images should be obtained from there. 

The intention of this page is:

1. Maintain a write-up of the set of steps required to get our infrastructure running.
2. Allow customization of the install process.
 
## Start Data Services

TODO: Update these commands with drive mounts to persist data. 

### Start Postgres

Postgres is the main database for IronWorker data. 

```sh
docker run -d --name postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432  postgres
```

### Start MongoDB

MongoDB stores task collection data. 

```sh
docker run -d --name mongo -p 27017:27017 mongo
```

### Start IronMQ

IronMQ is the message queue. 

```sh
docker run -d --name ironmq -e CONFIG_AUTH="" -p 8067:8080 iron/mq
```

### Start Minio

Minio is used to provide an AWS S3 compatible storage API. It is used to store task logs. Below we start a simple one disk backed store that has the access key and secret key as `mysecretaccesskey` and `mysecretsecretkey` respectively. The host's `/mnt/mino_data` directory is exposed as the log storage volume. The `/mnt/minio_config` directory is exposed as `~/.minio`.

```sh
docker run -p 9000:9000 --name iron-minio \
  -e "MINIO_ACCESS_KEY=mysecretaccesskey" \
  -e "MINIO_SECRET_KEY=mysecretsecretkey" \
  -v /mnt/minio_data:/export \
  -v /mnt/minio_config:/root/.minio \
  minio/minio /export
```

For further Minio configuration, such as custom syslog logging and notifications, you will have to modify the configuration file. See [the Minio documentation](https://docs.minio.io/docs/minio-server-configuration-files-guide).

## Start Iron services:

### Initialize and seed the database(s)

This will create tables and seed them with required data. 

```sh
docker run --rm \
 -e AUTH_DB_URL=postgres://user3123:passkja83kd8@{PG_HOST}:{PG_PORT}/ironauth \
 -e API_DB_URL=postgres://user3123:passkja83kd8@{PG_HOST}:{PG_PORT}/ironauth \
 -e TASKS_DB_URL=mongodb://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DATABASE} \
 -e OBJECTSTORE_URL=s3://{ACCESS_KEY}:{SECRET_KEY}@{HOST}:{PORT}/{BUCKET} \
 iron/seed
```

### Start IronAuth

This is the Iron.io Authentication service. 

```sh
docker run -d --name auth -p 8090:8090 \
 -e DB_URL=postgres://user3123:passkja83kd8@{PG_HOST}:{PG_PORT}/ironauth \
 -e JWT_KEY={ABC} \
 -e SUPER_USER={EMAIL}:{PASSWORD}:{TOKEN}
 -e TODO MAIL STUFF?  NEEDED? OPTIONAL? PROBABLY NOT REQUIRED FOR POC
 iron/auth
```

### Start IronWorker API

This is the API and the brains of the operation.

```sh
docker run -d --name swapi -p 8080:8080 
-e MQ_URL=ironmq://{PROJECT_ID}:{TOKEN}@{HOST}:{PORT} \
-e DB_URL=mongodb://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DATABASE} \
-e TASKS_DB_URL=mongodb://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DATABASE} \
-e OBJECTSTORE_URL=s3://{ACCESS_KEY}:{SECRET_KEY}@{HOST}:{PORT}/{BUCKET} \
iron/swapi

# We'll also want to initialize the database and get everything setup, run the following to set things up:
# TODO: create this script that will create any admin tokens, admin user, default cluster, etc
docker run --rm iron/swapi:init
```

### Start IronWorker Runners

The runners are where the tasks are actually executed. The more of servers you can start with runners on them, the better. 

#### Ruby Runner (deprecated, but production ready)

* API_URL points to the IronWorker API you started above, or the load balancer for the API if you added a load balancer. 
* MQ_URL points to the IronMQ API you started above
* CLUSTER_ID is provided after you create a cluster in the API
* CLUSTER_TOKEN is provided after you create a cluster in the API
* CONCURRENCY number of workers to start on this machine

```sh
docker run -d \
-e API_URL=http://{PROJECT_ID}:{TOKEN}@{HOST}:{PORT} \
-e MQ_URL=http://{PROJECT_ID}:{TOKEN}@{HOST}:{PORT} \
-e CLUSTER_ID={CLUSTER_ID} \
-e SUPER_TOKEN={CLUSTER_TOKEN} \
-e CONCURRENCY=5 \
iron/smartrunner ?
```

#### Go Runner (beta)

* API_URL points to the IronWorker API you started above, or the load balancer for the API if you added a load balancer. 
* CLUSTER_ID is provided after you create a cluster in the API
* CLUSTER_TOKEN is provided after you create a cluster in the API

```sh
docker run -d \
-e API_URL={API_URL} \
-e CLUSTER_ID={CLUSTER_ID} \
-e CLUSTER_TOKEN={CLUSTER_TOKEN} \
iron/runner
```

### Start the Scheduler

```sh
docker run -d --name scheduler \
-e API_URL={SWAPI_URL} \
-e TODO - tokens or something? can the auth be part of the API_URL? \
iron/scheduler:ruby
```

## Test Your Setup!

Run the test container to ensure everything is working:

```sh
docker run --rm TODO iron/onprem-test
```

## Now You're Ready to Start Using It!

Usage is the same as the public service except you'll change the host to point to your IronWorker API. See [Getting Started](doc:getting-started).

## Optional services

### Logging and Stats Services

You can use any syslog supported service for logs, but for this quickstart guide, we'll use the ELK stack. This has a few steps to it, to initialize it. 

```sh
docker run -d -p 5601:5601 -p 9200:9200 -p 5044:5044 -p 5000:5000 -it --name elk sebp/elk

# Now we need to add one piece of data to get things initialized, so let's enter our container:
docker exec -it elk /bin/bash
# Inside the container, run:
/opt/logstash/bin/logstash -e 'input { stdin { } } output { elasticsearch { hosts => ["localhost"] } }'
# When you see `Pipeline started`, type anything, for instance: 
this is a dummy entry
# Ensure it's in there: http://localhost:9200/_search?pretty
# Now open the Kibana UI at http://localhost:5601. You'll see a setup screen, just click the Create button.
```

We'll also want to collect system metrics, so let's start a graphite and grafana image. 

```sh
docker run -d --name graphite --restart=always -p 80:80 -p 2003-2004:2003-2004 -p 2023-2024:2023-2024 -p 8125:8125/udp -p 8126:8126 hopsoft/graphite-statsd
```

#### Run Logspout on EVERY Server From Now On

Logspout collects logs from Docker containers and forwards them to our log collector. 

Do not start a separate server for this. Run this command on every server you fire up below, replace HOST and PORT with the ELK stack server you started above. 

```sh
docker run -d --name logspout -v /var/run/docker.sock:/var/run/docker.sock gliderlabs/logspout syslog://{HOST}:{PORT}
```