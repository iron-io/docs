---
title: IronWorker on Azure
layout: default
section: worker
breadcrumbs:
  - ['Integrations', '/integrations']
---

Iron.io is pleased to announce it is offering its IronWorker platform as an Application Service within the Azure Marketplace, providing a key infrastructure component that gives developers immediate access to highly scalable event-driven computing services.

Every application in the cloud needs to process workloads on a continuous basis, at scale, on a schedule, or in the background. IronWorker is a modern application development platform for processing at a task level by isolating code packages and dependencies in a containerized compute environment managed by Iron.io.

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#getting_started">Getting Started</a></li>
      <ul>
        <li><a href="#azure_portal">Azure Marketplace</a></li>
        <li><a href="create_a_worker">Upload your first IronWorker</a></li>
        <li><a href="queue_a_task">Start Queueing Tasks on Azure</a></li>
      </ul>
    <li><a href="reference">Reference</a></li>
  </ul>
</section>

<h2 id="getting_started">Getting Started</h2>
If you havent already sign up for a Microsoft Azure Account  [http://azure.microsoft.com/en-us/pricing/free-trial/](link) **for a limited time you'll receive a $200 credit with Azure**
<h2 id="azure_portal"> Azure Marketplace</h2>
Once you've signed in and have access to the Azure Dashboard you can add a new marketplace addon
<ol>
  <li>click on this button <br>
   <img src="/images/worker/azure/azure-new-button.jpg" alt="">
  </li>
  <li>select the azure marketplace <img width="100%" src="/images/worker/azure/azure-select-marketplace.jpg" alt=""> </li>
  <li>select the IronWorker from the list <img width="100%" src="/images/worker/azure/azure-select-iron-worker.jpg" alt=""> </li>
  <li>wait for the addon to install. <img width="100%" src="/images/worker/azure/azure-provisioning-addon.jpg" alt="">
  <p>if the addon doesn't change after a minute, refresh your browser.</p>
  </li>
  <li>Getting Iron Credentials <br>
  on Azure's Dashboard click on the connection info button <br>
  <img src="/images/worker/azure/azure-button-connection-info.jpg" alt=""><br>
  <img width="100%" src="/images/worker/azure/azure-iron-credentials.jpg" alt=""><br>
  on Iron.io's Dashboard click on the key button to access your credentials <br>
  <img src="/images/worker/azure/azure-iron-hud-credentials" alt=""> <br>
  </li>
</ol>

<h2 id="upload_a_worker">Upload your first IronWorker</h2>
We've written a simple tutorial on how to package and upload your first IronWorker. [http://dev.iron.io/4000/worker/](link)

configure your client via our client wrappers[http://dev.iron.io/worker/reference/configuration/](link)

*   Ruby IronWorker Upload Guide [http://dev.iron.io/worker/languages/ruby](link)
*   Node.js IronWorker Upload Guide [http://dev.iron.io/worker/languages/nodejs](link)
*   Python IronWorker Upload Guide [http://dev.iron.io/worker/languages/python](link)
*   PHP IronWorker Upload Guide [http://dev.iron.io/worker/languages/php](link)
*   Go IronWorker Upload Guide [http://dev.iron.io/worker/languages/go](link)
*   Java IronWorker Upload Guide [http://dev.iron.io/worker/languages/java](link)
*   .NET IronWorker Upload Guide [http://dev.iron.io/worker/languages/dotnet](link)

<h2 id="queue_a_task">Start Queueing Tasks on Azure</h2>



When queueing a task add the cluster param along with your POST request to create a task. [http://dev.iron.io/worker/reference/api/#queue_a_task](link)

```js
{
    "tasks": [
        {
            "code_name": "MyWorker",
            "payload": "{\"x\": \"abc\", \"y\": \"def\"}",
            "cluster": "azure"
        }
    ]
}
```

<h2 id="reference">Reference</h2>
IronWorker Client Libraries [http://dev.iron.io/worker/libraries](link)
API Reference [http://dev.iron.io/worker/reference/api](link)






