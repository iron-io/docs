---
title: Custom Images and Git Repos
layout: default
section: worker
breadcrumbs:
  - ['docker', 'custom docker image']
---

If you’re using IronWorker, you are most likely familiar with using Docker. One of the best things about using Docker is how easy it is to make your own images with whatever you need on it. Sometimes, we want to add a repo hosted on GitHub. This article will explain how.

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#public">Using a Public Repository</a></li>
    <li><a href="#private">Using a Private Repository</a></li>
    <li><a href="#security">Security Warning</a></li>
  </ul>
</section>

<h2 id="public">Using a Public Repository</h2>

GitHub is the world's most largest source code host in the world. With Docker and Git combined, you can easily add the source code code into a container you're building and run everything inside of a self contained ecosystem that has everything you want and nothing else. 

To clone the repo, we first need to install Git on the image itself. Git has a great pacjage for Alpine linux (the OS Iron.io uses as a base) that is only 11.4MB. After that has been installed, you can run a standard git clone command to bring in the repo:


```sh
FROM iron/go:1.6.0
RUN apk update && apk upgrade

RUN apk add git
RUN git clone https://github.com/iron-io/dockerworker.git

RUN rm -rf /var/cache/apk/*
```
Once you run `docker build...`  you'll have a custom image with all of the iron.io Docker examples.  


<h2 id="private">Using a Private Repository</h2>

That worked without any problems at all. What if we simply replace the git clone URL with something private:

```sh
Cloning into 'platinum'...
fatal: could not read Username for 'https://github.com': No such device or address
```
This presents a pretty clear issue. We need to get our credentials into our container. There are a few different ways of accomplishing this, but the easiest way is to simply use an OAuth token.  If you’re unsure how to do that in GitHub, please see <a href="https://help.github.com/articles/creating-an-access-token-for-command-line-use/">this article</a>

Once we have the token we can give our image the access it needs. Change the clone command to:

```sh
FROM iron/go:
RUN apk update && apk upgrade

RUN apk add git
RUN git clone git clone https://<token>:x-oauth-basic@github.com/owner/repo.git

RUN rm -rf /var/cache/apk/*
```
`<token>` = Your OAuth token <br />
`owner` = Your GitHub username <br />
`repo.git` = the Repository you are cloning 

<h2 id="security">Security Warning</h2>

If you are cloning a private in this way, you will need to make your Docker Image private. Otherwise anyone who uses that image will have access to the private repo. If you are unsure how to make an image private, please see <a href='https://docs.docker.com/docker-hub/repos/#private-repositories'>this guide</a>.
