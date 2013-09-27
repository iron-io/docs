---
title: IronWorker Environment
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['Environment', '/environment']
---

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#operating_system">Operating System</a></li>
    <li><a href="#installed_linux_packages">Installed Linux Packages</a></li>
    <li><a href="#maximum_data_payload">Maximum Data Payload</a></li>
    <li><a href="#memory_per_worker">Memory per Worker</a></li>
    <li><a href="#local_disk_space_per_worker">Local Disk Space per Worker</a></li>
    <li><a href="#maximum_run_time_per_worker">Maximum Run Time per Worker</a></li>
    <li><a href="#priority_queue_management">Priority Queue Management</a></li>
    <li><a href="#maximum_scheduled_tasks_per_project">Maximum Scheduled Tasks per Project</a></li>
    <li><a href="#minimum__time">Scheduled Task Frequency</a></li>
    <li><a href="#security_groups_and_ip_ranges">Security Groups and IP Ranges</a></li>
    <li><a href="#default_languages_versions">Default Languages Versions</a></li>
  </ul>  
</section>

## Operating System
The operating system and version information is provided for completeness and transparency. We recommend, however, you avoid binding your workers to specifics of the OS as much as possible.  

<div class="grey-box">
<b>Operating System:</b> Ubuntu Linux 12.04 x64
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

These are included because they are common binary libraries. Other binary libraries and files can be included as part of your worker code package, though you'll first need to compile them to target Linux x64 architectures.

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

Tip: We recommend distributing workloads over multiple workers&mdash;not only for better resource management, but also to take advantage of the massive concurrency enabled by a cloud worker system. 

## Local Disk Space per Worker
Each worker task has local disk space available to it for use on a temporary basis while the worker is running. You have full read/write privileges to create directories and files inside this space, and can perform most ordinary file operations. This directory is used as the current working directory ("<span class="fixed-width">.</span>") when executing your workers.

<div class="grey-box">
<b>Local Disk Space:</b> 10GB
</div>

## Maximum Run Time per Worker
There is a system-wide limit for the maximum length a task may run. Tasks that exceed this limit will be terminated and will have `timeout` as their status. 

<div class="grey-box">
<b>Max Worker Run Time:</b> 3600 seconds (60 minutes)
</div>

Tip: You should design your tasks to be moderate in terms of the length of time they take to run. If operations are small in nature (seconds or milliseconds) then you'll want to group them together so as to amortize the worker setup costs. Likewise, if they are long-running operations, you should break them up into a number of workers. Note that you can chain together workers as well as use IronMQ, scheduled jobs, and datastores to orchestrate a complex series or sequence of tasks.

## Priority Queue Management

Each priority (p0, p1, p2) has a targeted maximum time limit for tasks sitting in the queue. Average queue times will typically be less than those listed on the pricing page. High numbers of tasks, however, could raise those average queue times for all users. To keep the processing time for high priority jobs down, per user capacities are in place for high priority queues. Limits are on per-queue basis and are reset hourly. High priority tasks that exceed the limit, are queued at the next highest priority. Only under high overall system load should queue times for tasks exceeding the capacity extend beyond the initial targeted time limits. Usage rates will be based on the actual priority tasks run on, not the priority initially queued.

<table style="text-align: center;">
<thead>
<tr>
<th>Priority</th>
<th>Capacity Per Hour Per User</th>
</tr>
</thead>
<tbody>
<tr>
<td>p2</td>
<td>100</td>
</tr>
<tr>
<td>p1</td>
<td>250</td>
</tr>
</tbody>
</table>

## Maximum Scheduled Tasks per Project
The following is the default number of scheduled tasks. It should be sufficient for even the largest projects. If you would like this number increased, however, please feel free to contact us.

<div class="grey-box">
<b>Max Scheduled Tasks:</b> 100
</div>

Tip: A common mistake is to create scheduled jobs on a per user or per item basis. Instead, use scheduled jobs as master tasks that orchestrate activities around sets of users or items. When scheduled tasks run, they can access databases to get a list of actions to perform and then queue up one or more workers to handle the set. View the [page on scheduling](/worker/scheduling) for more information on scheduling patterns and best practices.

##  Scheduled Task Frequency

Tasks can be scheduled to run **every X seconds or more** using the `run_every` parameter.
The minimum frequency is 60 seconds.
<div class="alert">
  <p>
    <strong>Note:</strong>
     a task may be executed a short time after it is scheduled frequency depending on it's priority level. (Scheduled tasks can be given a priority; higher priorities can reduce the maximum time allowed in queue.)
  </p>
</div>

## Security Groups and IP Ranges

IronWorker provides an AWS security group and [IP ranges](https://forums.aws.amazon.com/forum.jspa?forumID=30) in the event users want to isolate AWS EC2, RDS, or other services to these groups/ranges. More information about [security](/worker/reference/security/).

<table>
<thead>
<tr>
<th>EC2 Security Group</th><th>Account ID</th><th>Security Group String</th><th>Security Group ID</th>
</tr>
</thead>
<tbody>
<tr>
<td>simple_worker_sg</td><td>7227-1646-5567</td><td>722716465567/simple_worker_sg</td><td>sg-0d500c64</td>
</tr>
</tbody>
</table>

<div class="alert">
  <p>
    <strong>Note:</strong>
    security group only works in the US regions.
  </p>
</div>

## Default Languages Versions

Below you can see the pre-installed versions of languages in the IronWorker environment.

<table>
  <thead>
    <tr><th>Language</th><th>Version Installed</th></tr>
  </thead>
  <tbody>
    <tr><td>Ruby</td><td>1.9.3</td></tr>
    <tr><td>PHP</td><td>5.3.10</td></tr>
    <tr><td>Python</td><td>2.7.3</td></tr>
    <tr><td>Java</td><td>1.7.0</td></tr>
    <tr><td>Node.js</td><td>0.8.8</td></tr>
    <tr><td>Go</td><td>1.0.2</td></tr>
    <tr><td>.NET (Mono JIT)</td><td>2.10.8.1</td></tr>
  </tbody>
</table>

<div class="alert">
  <p>
    <strong>Note:</strong>
    It may be possible to update the language by
    <a href="/worker/reference/dotworker/#syntax_reference">adding related <span class="fixed-width">deb</span> packages to your worker</a>
    although you should go this route only if necessary.
    Use of earlier versions, especially major versions, may run into difficulties.
  </p>
</div>
