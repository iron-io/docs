---
title: IronWorker Environment
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['Environment', '/environment']
---

# IronWorker Environment

## Operating System
The operating system and version information is provided for completeness and transparency. We recommend, however, you avoid binding your workers to specifics of the OS as much as possible.  

<div class="grey-box">
<b>Operating System:</b> Ubuntu Linux 11.10
</div>

## Installed Linux Packages
IronWorker contains several popular Linux packages as part of the standard worker environment.

<table class="reference">
  <thead>
    <tr><th style="width: 20%;">Package</th><th style="width: 45%;">Full Name</th><th style="width: 35%;">Purpose</th></tr>
  </thead>
  <tbody>
    <tr><td><a href="http://www.imagemagick.org/" title="ImageMagick">ImageMagick</a></td><td>ImageMagick Image Processing</td><td>Image processing</td></tr>
    <tr><td><a href="http://freeimage.sourceforge.net//" title="FreeImage">FreeImage</a></td><td>The FreeImage Project</td><td>Image processing</td></tr>
    <tr><td><a href="http://sox.sourceforge.net/" title="SoX">SoX</a></td><td>Sound eXchange Library</td><td>Sound processing</td></tr>
    <tr><td><a href="http://curl.haxx.se/" title="curl">cURL</a></td><td>Client URL Request Library</td><td>URL file processing</td></tr>
  </tbody>
</table>

These are included because they are binary libraries. Language-specific libraries should be included as part of your worker code package.

If you don't see what you need here, please [contact us](http://support.iron.io/customer/portal/emails/new) and tell us what you're looking for. If it's a common/popular package, we can certainly look to include it.

## Maximum Data Payload
The following is the maximum data payload that can be passed to IronWorker. A data payload that exceeds this size will generate an error response from the API.

<div class="grey-box">
<b>Maximum Data Payload:</b>  64KB
</div>

Tip: We recommend that you avoid sending large payloads with your workers. Instead use a data store to hold the data and then pass an ID or reference to the worker. The worker can grab the data and then do its processing. It's more efficient on the API as well as better in terms of creating atomic/stateless processing. 

## Memory per Worker
The standard worker sandbox environment contains a certain amount of accessible memory. This amount should be sufficient for almost all workloads. We are working on a super worker environment that would allow greater memory allocations. Please contact us if you have specific needs here.

<div class="grey-box">
<b>Memory per Worker:</b>  ~ 320MB
</div>

Tip: We recommend distributing workloads over multiple workers -- not only for better resource management but also to take advantage of massive concurrency enabled by a cloud worker system. 

## Local Disk Space (per Worker)
Each worker task has local disk space available to it for use on a temporary basis while the worker is running. You have full read/write privileges to create directories and files and can perform most ordinary file operations. You access this disk space via the `user_dir` directory.

<div class="grey-box">
<b>Local Disk Space:</b> 10GB
</div>

## Max Run Time (per Worker)
There is a system-wide limit for the maximum length a task may run. Tasks that exceed this limit will be terminated and will have `timeout` as their status. 

<div class="grey-box">
<b>Max Worker Run Time:</b> 3600 seconds (60 minutes)
</div>

Tip: You should design your tasks to be moderate in terms of the length of time they take to run. If operations are small in nature (seconds or milli-seconds) then you'll want to group them together so as to amortize the worker setup costs. Likewise, if they are long-running operations, you should break them up into a number of workers. Note that you can chain together workers as well as use IronMQ, scheduled jobs, and datastores to orchestrate a complex series or sequence of tasks.

## Max Scheduled Tasks (per Project)
The following is the default number of scheduled tasks. It should be sufficient for even the largest projects. If you would like this number increased, however, please feel free to contact us.

<div class="grey-box">
<b>Max Scheduled Tasks:</b> 100
</div>

Tip: A common mistake is to create scheduled jobs on a per user or per item basis. Instead, use scheduled jobs as master tasks that orchestrate activities around sets of users or items. When schedule tasks run, they can access databases to get a list of actions to perform and then queue up one or more workers to handle the set. View the pages on Scheduling for more information on scheduling patterns and best practices.
