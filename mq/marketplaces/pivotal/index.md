---
title: Pivotal Web Services
layout: default
section: mq
breadcrumbs:
- ['IronMQ Marketplaces', '/mq']
- ['Pivotal Web Services', '/pivotal']
---

IronMQ is available as a Third Party Service within the Pivotal Web Services Marketplace, allowing developers to leverage the service directly with their cloud native applications. IronMQ by Iron.io is an industrial-strength message queue solution built for the modern cloud, with advanced features and flexible deployment capabilities not found elsewhere. Accessible through REST API calls and client libraries for all major languages, IronMQ is easy to use, highly available, and requires no setup, no maintenance, and no ops.

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#getting_started">Getting Started</a></li>
    <li><a href="#marketplace">Pivotal Web Services Marketplace</a></li>
    <li><a href="#bind">Adding IronMQ to Your App</a></li>
    <li><a href="#start">Start Using IronMQ</a></li>
  </ul>
</section>

<h2 id="getting_started">Getting Started</h2>
If you havent already, sign up for a Pivotal Web Services Account. <a href="https://console.run.pivotal.io/register">link</a>

<h2 id="marketplace">Pivotal Web Services Marketplace</h2>
Once you've signed in and have access to the Pivotal Web Services Dashboard, <a href="http://docs.run.pivotal.io/devguide/deploy-apps/deploy-app.html#push">push an App</a> in your preferred language.

Once your App has been pushed to Pivotal Web Services, you can add and bind services. You can find IronMQ in the Catalog by selecting 'Add Service', or by following this direct link. <a href="https://console.run.pivotal.io/marketplace/ironmq">link</a> 

<img src="/images/mq/pivotal/ironmq-marketplace.png" alt="IronMQ on Pivotal Web Services Marketplace">

<h2 id="bind">Adding IronMQ to Your App</h2>

Make sure the selections for Space and App on the right are correct, name the service, and select a Plan. When ready, click Create. This will provision an account with Iron.io and bind the IronMQ service to your Pivotal Web Services application. When the process is complete, you will see IronMQ as a Service within your App.

<img src="/images/mq/pivotal/ironmq-service.png" alt="IronMQ service on Pivotal Web Services">

<h2 id="start">Start Using IronMQ</h2>

With IronMQ bound to your App, you can start using the service by following our Getting Started guide. <a href="http://dev.iron.io/mq/getting_started/">link</a>