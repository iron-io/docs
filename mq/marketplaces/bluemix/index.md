---
title: IBM Bluemix
layout: default
section: mq
breadcrumbs:
- ['IronMQ Marketplaces', '/mq']
- ['IBM Bluemix', '/bluemix']
---

IronMQ is available as a Third Party Service within the IBM Bluemix Marketplace, allowing developers to leverage the service directly with their Bluemix applications. IronMQ by Iron.io is an industrial-strength message queue solution built for the modern cloud, with advanced features and flexible deployment capabilities not found elsewhere. Accessible through REST API calls and client libraries for all major languages, IronMQ is easy to use, highly available, and requires no setup, no maintenance, and no ops.

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#getting_started">Getting Started</a></li>
    <li><a href="#marketplace">Bluemix Marketplace</a></li>
    <li><a href="#bind">Adding IronMQ to Your App</a></li>
    <li><a href="#start">Start Using IronMQ</a></li>
  </ul>
</section>

<h2 id="getting_started">Getting Started</h2>
If you havent already, sign up for an IBM Bluemix Account. <a href="https://console.ng.bluemix.net/">link</a>

<h2 id="marketplace">Bluemix Marketplace</h2>
Once you've signed in and have access to the Bluemix Dashboard, create an App in your preferred language or framework. For this example, we'll select Go and name our app ironmq-demo. From the App view, you can find IronMQ in the Catalog by selecting 'Add a Service or API', or by following this direct link. <a href="https://console.ng.bluemix.net/catalog/ironmq/">link</a>

<img src="/images/worker/bluemix/ironmq-marketplace.png" alt="IronMQ on IBM Bluemix Marketplace">

<h2 id="bind">Adding IronMQ to Your App</h2>

Make sure the selections for Space and App on the right are correct, name the service, and select a Plan. When ready, click Create. This will provision an account with Iron.io and bind the IronMQ service to your Bluemix application. When the process is complete, you will see IronMQ as a Service within your App.

<img src="/images/worker/bluemix/ironmq-apprunning.png" alt="IronMQ on IBM Bluemix App">

The IronMQ block on the Bluemix dashboard allows you to quickly access the Iron.io dashboard, access the documentation, and perform the actions: Favorite, Unbind Service, Rename Service, and Delete Service. You can also get your Iron.io credentials, which you'll need to use the API. You can also access your credentials via the Environment Variables submenu.

<img src="/images/worker/bluemix/ironmq-envvariables.png" alt="IronMQ on IBM Bluemix Env Variables">

<h2 id="start">Start Using IronMQ</h2>

With IronMQ bound to your App, you can start using the service by following our Getting Started guide. <a href="http://dev.iron.io/mq/getting_started/">link</a>