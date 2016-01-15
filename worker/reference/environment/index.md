---
title: IronWorker Environment & Stack Information
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['Environment', '/environment']
---

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#images">Offical Docker Images</a></li>
    <li><a href="#maximum_data_payload">Maximum Data Payload</a></li>
    <li><a href="#memory_per_worker">Memory per Worker</a></li>
    <li><a href="#local_disk_space_per_worker">Local Disk Space per Worker</a></li>
    <li><a href="#maximum_run_time_per_worker">Maximum Run Time per Worker</a></li>
    <li><a href="#priority_queue_management">Priority Queue Management</a></li>
    <li><a href="#maximum_scheduled_tasks_per_project">Maximum Scheduled Tasks per Project</a></li>
    <li><a href="#scheduled_task_frequency">Scheduled Task Frequency</a></li>
    <li><a href="#security_groups_and_ip_ranges">Security Groups and IP Ranges</a></li>
  </ul>
</section>

If you don't see what you need here, please [contact us](mailto:support@iron.io) and tell us what you're looking for. If it's a common/popular package, we can certainly look to include it. 

<h2 id="images">Offical Docker Images</h2>
To see all of Iron's offically supported Docker Images, visit us on Docker Hub <a href='https://hub.docker.com/r/iron' target='_blank'>https://hub.docker.com/r/iron/</a>

<h2 id="maximum_data_payload">Maximum Data Payload</h2>
The following is the maximum data payload that can be passed to IronWorker. A data payload that exceeds this size will generate an error response from the API.

<div class="grey-box">
<b>Maximum Data Payload:</b>  64KB
</div>

Tip: We recommend that you avoid sending large payloads with your workers. Instead use a data store to hold the data and then pass an ID or reference to the worker. The worker can grab the data and then do its processing. It's more efficient on the API as well as better in terms of creating atomic/stateless processing.

<h2 id="memory_per_worker">Memory per Worker</h2>
The standard worker sandbox environment contains a certain amount of accessible memory. This amount should be sufficient for almost all workloads. We are working on a super worker environment that would allow greater memory allocations. Please contact us if you have specific needs here.

<div class="grey-box">
<b>Memory per Worker:</b>  ~ 320MB
</div>

Tip: We recommend distributing workloads over multiple workers&mdash;not only for better resource management, but also to take advantage of the massive concurrency enabled by a cloud worker system.

<h2 id="local_disk_space_per_worker">Local Disk Space per Worker</h2>
Each worker task has local disk space available to it for use on a temporary basis while the worker is running. You have full read/write privileges to create directories and files inside this space, and can perform most ordinary file operations. This directory is used as the current working directory ("<span class="fixed-width">.</span>") when executing your workers.

<div class="grey-box">
<b>Local Disk Space:</b> 10GB
</div>

<h2 id="maximum_run_time_per_worker">Maximum Run Time per Worker</h2>
There is a system-wide limit for the maximum length a task may run. Tasks that exceed this limit will be terminated and will have `timeout` as their status.

<div class="grey-box">
<b>Max Worker Run Time:</b> 3600 seconds (60 minutes)
</div>

Tip: You should design your tasks to be moderate in terms of the length of time they take to run. If operations are small in nature (seconds or milliseconds) then you'll want to group them together so as to amortize the worker setup costs. Likewise, if they are long-running operations, you should break them up into a number of workers. Note that you can chain together workers as well as use IronMQ, scheduled jobs, and datastores to orchestrate a complex series or sequence of tasks.

<h2 id="priority_queue_management">Priority Queue Management</h2>

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

<h2 id="maximum_scheduled_tasks_per_project">Maximum Scheduled Tasks per Project</h2>
The following is the default number of scheduled tasks. It should be sufficient for even the largest projects. If you would like this number increased, however, please feel free to contact us.

<div class="grey-box">
<b>Max Scheduled Tasks:</b> 100
</div>

Tip: A common mistake is to create scheduled jobs on a per user or per item basis. Instead, use scheduled jobs as master tasks that orchestrate activities around sets of users or items. When scheduled tasks run, they can access databases to get a list of actions to perform and then queue up one or more workers to handle the set. View the [page on scheduling](/worker/scheduling) for more information on scheduling patterns and best practices.

<h2 id="scheduled_task_frequency">Scheduled Task Frequency</h2>

Tasks can be scheduled to run **every N seconds or more** specifying **N** using the `run_every` parameter and where **N** > 60. (The minimum frequency is every 60 seconds.)
<div class="alert">
  <p>
    <strong>Note:</strong>
     A task may be executed a short time after its scheduled frequency depending on the priority level. (Scheduled tasks can be given a priority; higher priorities can reduce the maximum time allowed in queue.)
  </p>
</div>

<h2 id="security_groups_and_ip_ranges">Security Groups and IP Ranges</h2>

IronWorker provides an AWS security group and [IP ranges](https://forums.aws.amazon.com/forum.jspa?forumID=30) in the event users want to isolate AWS EC2, RDS, or other services to these groups/ranges.

<table>
<thead>
<tr>
<th>EC2 Security Group</th><th>Account ID</th><th>Security Group String</th>
</tr>
</thead>
<tbody>
<tr>
<td>simple_worker_sg</td><td>7227-1646-5567</td><td>722716465567/simple_worker_sg</td>
</tr>
</tbody>
</table>
