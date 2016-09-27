---
title: IronWorker Hybrid Installation and Usage
layout: default
section: worker
breadcrumbs: hybrid, hybrid-worker

---

The Iron.io command line tool will help you interact with the IronWorker API to make creating workers easier.
<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#installing">Install and Setup</a></li>
    <li><a href="#usingNewCluster">Using your new Cluster</a></li>
    <li><a href="#aws">Running on AWS</a></li>
    <li><a href="#encryption">End-to-End encryption of task payloads</a></li>
  </ul>
</section>

# Hybrid IronWorker
Hybrid IronWorker enables you to get all the power and benefits of IronWorker platform while running your workloads on your own hardware. You can run them on your own servers on any cloud or even in your own datacenter, behind the firewall.


<h2 id='installing'>Install and Setup</h2>

It's very easy to get started using Hybrid IronWorker. Just follow the steps below to get started.

NOTE: You must have Hybrid access enabled on your account. Email <a href="mailto:support@iron.io">support@iron.io</a> to upgrade your account.

<h3 id='createCluster'>Create a Cluster</h3>
Login to <a href='https://hud-e.iron.io'>HUD</a>, click IronWorker, then click your name in the top right and then click Clusters. You'll see a list of existing clusters if any and a link to Create a new one. Click the Create Cluster link. Fill out the form and submit it. You'll get a `CLUSTER_ID` and `CLUSTER_TOKEN` that you'll need in the next steps.
</section>

<section id='launchImage'>
<h3 id='launch'>Launch the iron/runner image</h3>

On any machine that has Docker installed, just run our iron/runner image with the following flags:

<section is='code'
```sh
docker run --privileged -d -e "CLUSTER_ID={CLUSTER_ID}" -e "CLUSTER_TOKEN={CLUSTER_TOKEN}" iron/runner
```

Replace `{CLUSTER_ID}` and `{CLUSTER_TOKEN}` with the id and token you obtained in step 1 above.
</section
That's it!  Launch as many of these as you want/need.
</section>


<h2 id='usingNewCluster'>Using Your New Cluster</h2>
Everything is the same as using IronWorker on the public cloud, except When queuing jobs,
simply pass in the `CLUSTER_ID` in the "cluster" param ([API docs](http://dev.iron.io/worker/reference/api/#queue_a_task)).
Here is a quick example you can use with [IronCLI]

First register your worker Docker image. You can use the example worker image as is with the commands below:

```sh
iron register iron/hello
```

Example from the cli:

```sh
iron worker queue --cluster CLUSTER_ID --wait iron/hello
```


<h2 id='aws'>Running on AWS</h2>
Nothing special is required to run on AWS, the same steps apply above, but you can use the following
cloud-init/User Data script to install Docker and start IronWorker.
This has been tested on Ubuntu 15.04 and 14.04 AMI.

```
#!/bin/sh
curl -sSL https://get.docker.com/ | sh
sudo service docker start
echo \"Starting runners\"
sudo docker run --privileged -d -e "CLUSTER_ID={CLUSTER_ID}" -e "CLUSTER_TOKEN=#{CLUSTER_TOKEN}" iron/runner
```


<h2 id='encryption'>End-to-End encryption of task payloads</h2>
While it's possible to do end to end encryption of payloads yourself, we do offer a convenient way to help  accomplish this. Currently, we support a scheme similar to  [PGP](https://en.wikipedia.org/wiki/Pretty_Good_Privacy) via [IronCLI] and the hybrid runner, with the encryption and decryption keys never reaching the cloud. Our scheme provides encryption as well as authentication, which means not only can you trust that payloads were hidden from prying eyes, but you can also verify that they came from where you sent them from.

<h4 id='basics'>Basics</h4>

We use RSA, a public key encryption scheme that is hard to break until quantum
computing robots figure out how to factor prime numbers and take over the world.
This also means you can conveniently hand out public keys to whoever can run tasks
without compromising the private key. Since RSA is slow, we only use it to encrypt
a session key, which is unique for each task. We then use this session key
to encrypt the payload using AES-GCM and send it, along with the RSA encrypted
session key, to the IronWorker API. Code can be audited
[here](https://github.com/iron-io/ironcli).

Below is a good diagram of how it works:

<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/images/pgp.png' style='width: 80%;'/>

<h4 id='started'>Getting Started</h4>

To get started, you'll need to generate an RSA key pair that is not password
protected (reiterate: no password). The easiest way to do this is with
[OpenSSL](https://en.wikibooks.org/wiki/Cryptography/Generate_a_keypair_using_OpenSSL):

```sh
$ openssl genpkey -algorithm RSA -out private_key.pem 4096
Generating RSA private key, 4096 bit long modulus
.............................++++++
................................................................++++++
e is 65537 (0x10001)
```

It's recommended to use at least 1024 bits for the modulus; 1024, 2048 and
4096 will all work swimmingly. After you've generated a private key, you'll
want to generate a public key from it:

```sh
$ openssl rsa -pubout -in private_key.pem -out public_key.pem
writing RSA key
```

After these two commands, you'll end up with 2 files, `public_key.pem` and
`private_key.pem`. Store the private key file somewhere safe and then you
can hand out the `public_key.pem` to anybody who you'd like to let run tasks
on your cluster. From here on, we'll periodically refer to `private_key.pem`
as the "Decryption Key" and `public_key.pem` as the "Encryption Key". Note
that if you are generating keys via an alternate method, it's important that
each file is base64 pem encoded as OpenSSL does.

After generating keys, you'll need to make sure your hybrid cluster runners
are started with the private key before queueing tasks to it. To do this, simply
add the env var `DECRYPTION_KEY` passed to the `iron/runner` docker container,
like so:

```sh
$ docker run --privileged -d -e "DECRYPTION_KEY=${KEY}" \
 -e "CLUSTER_ID=${CLUSTER_ID}" -e "CLUSTER_TOKEN=${CLUSTER_TOKEN}" --net=host iron/runner
```

Note that `${KEY}` needs to be the *contents* of `private_key.pem`, an easy way
to do this is with a shell command, e.g. `-e "DECRYPTION_KEY=$(cat private_key.pem)"`.
We encourage you to take extra steps to keep your key private, such as setting
the variable on the host and passing it to docker that way, and then clearing
the variable afterwards, to keep the key from being in the process list or the
environment. For more details, see the docker docs [here](https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables-e-env-env-file).

When you start a runner with `DECRYPTION_KEY` set, the runner will use that
key to decrypt and authenticate _all_ payloads it comes across before
passing them to the job. This means a few things:

* all tasks queued to this cluster must be queued with the encryption key
* all runners for a cluster need to be started with the decryption key
* jobs will transparently receive plaintext payloads, and do not need to be modified

After getting all the runners started up with the decryption key you may begin
queueing jobs to your cluster with encrypted payloads. [IronCLI] can take care
of the encryption before queueing a job, and the key will not leave the CLI process.
Note that when queueing tasks against a cluster whose runners have been started
with a decryption key, you **MUST** queue tasks with `--encryption-key` or
`--encryption-key-file` set to your encryption key, even if the task doesn't
have a payload. This ensures that only someone with your encryption key can queue
tasks against your cluster. A template command for queueing with encryption is:

```sh
# export KEY=$(cat public_key.pem)
$ iron worker queue --encryption-key ${KEY} --cluster ${CLUSTER_ID} --payload "hello" my_task

# or

# export KEY_FILE=/path/to/public_key.pem
$ iron worker queue --encryption-key-file ${KEY_FILE} --cluster ${CLUSTER_ID} --payload "hello" my_task
```

You won't have to update any of your tasks to start using the encrypted payloads
feature, and your payloads are now never stored nor sent in plaintext within the Iron
platform. If your hybrid cluster is behind a firewall and you queue tasks from
behind the firewall, this means your payloads never leave your firewall as
plaintext. If you have any additional questions, feel free to reach out at <support@iron.io>.

Note that using the encrypted payloads feature will increase the size of your
payloads by around 33%, because we need to base64 the output in order to send
it to the worker API. If you are running large payloads and need your limit
increased, reach out and we are happy to bump the max payload size up for you.
We are in the process of adding support for encrypting payloads to our
client libraries, as well; if you need one in a hurry, just let us know.
</section>
