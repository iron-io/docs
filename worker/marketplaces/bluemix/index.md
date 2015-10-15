---
title: IBM Bluemix
layout: default
section: worker
breadcrumbs:
- ['IronWorker Marketplaces', '/worker']
- ['IBM Bluemix', '/bluemix']
---

IronWorker is available as a Third Party Service within the IBM Bluemix Marketplace, allowing developers to leverage the service directly with their Bluemix applications. IronWorker by Iron.io is an event-driven computing platform that leverages containers for its runtime, giving developers and systems architects an effective environment for powering asynchronous workloads at massive scale. IronWorker gives you a flexible way to run tens, hundreds, or thousands of tasks at once without having to stand up servers or manage queues. Offload tasks from your app, schedule jobs to run later, or fire off tasks from webhooks. IronWorker scales out the processing to let you focus on building out the features of your applications.

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#getting_started">Getting Started</a></li>
    <li><a href="#marketplace">Bluemix Marketplace</a></li>
    <li><a href="#bind">Adding IronWorker to Your App</a></li>
    <li><a href="#start">Start Using IronWorker</a></li>
  </ul>
</section>

<h2 id="getting_started">Getting Started</h2>
If you havent already, sign up for an IBM Bluemix Account. <a href="https://console.ng.bluemix.net/">link</a>

<h2 id="marketplace">Bluemix Marketplace</h2>
Once you've signed in and have access to the Bluemix Dashboard, create an App in your preferred language or framework. For this example, we'll select Go and name our app ironworker-demo. From the App view, you can find IronWorker in the Catalog by selecting 'Add a Service or API', or by following this direct link. <a href="https://console.ng.bluemix.net/catalog/ironworker/">link</a>

<img src="/images/worker/bluemix/ironworker-marketplace.png" alt="IronWorker on IBM Bluemix Marketplace">

<h2 id="bind">Adding IronWorker to Your App</h2>

Make sure the selections for Space and App on the right are correct, name the service, and select a Plan. When ready, click Create. This will provision an account with Iron.io and bind the IronWorker service to your Bluemix application. When the process is complete, you will see IronWorker as a Service within your App.

<img src="/images/worker/bluemix/ironworker-apprunning.png" alt="IronWorker on IBM Bluemix App">

The IronWorker block on the Bluemix dashboard allows you to quickly access the Iron.io dashboard, access the documentation, and perform the actions: Favorite, Unbind Service, Rename Service, and Delete Service. You can also get your Iron.io credentials, which you'll need when building workers. You can also access your credentials via the Environment Variables submenu.

<img src="/images/worker/bluemix/ironworker-envvariables.png" alt="IronWorker on IBM Bluemix Env Variables">

<h2 id="start">Start Using IronWorker</h2>

With IronWorker bound to your App, you can start using the service by following our Getting Started guide. <a href="http://dev.iron.io/worker/getting_started/">link</a>

