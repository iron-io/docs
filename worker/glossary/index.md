---
title: IronWorker Glossary
layout: default
section: worker
breadcrumbs:
  - ['index', 'Definitions']
---

<section id="toc">
  <h3>Table of Contents</h3>
<table>
<tbody>
            <tr>
	     <td>
      <ul>
      <li><a href="#version">API Version</a></li>
      <li><a href="#cancelled">Cancelled</a></li>
      <li><a href="#cli">cli</a></li>
      <li><a href="#cluster">Cluster</a></li>
      <li><a href="#code_name">code_name</a></li>
      <li><a href="#codepackage">Code Package</a></li>
      <li><a href="#command">Command</a></li>
      <li><a href="#complete">Complete</a></li>
      <li><a href="#config">Config</a></li>
      <li><a href="#contentlength">Content-Length</a></li>
      <li><a href="#contenttype">Content-Type</a></li>
      <li><a href="#Default_priority">default_priority</a></li>
      <li><a href="#delay">delay</a></li>
      <li><a href="#end_at">end_at</a></li>
      <li><a href="#end_date">end_date</a></li>
      <li><a href="#endpoint">Endpoint</a></li>
      <li><a href="#env_vars">env_vars</a></li>
      <li><a href="#error">error</a></li>
      <li><a href="#exponentialbackoff">Exponential Backoff</a></li>
      <li><a href="#from_time">from_time</a></li>
      <li><a href="#host">Host</a></li>
      <li><a href="#image">Image</a></li>
      <li><a href="#killed">killed</a></li>
      </ul>
      </td>
      <td>
      <ul>
      <li><a href="#max_concurrency">max_concurrency</a></li>
      <li><a href="#msg">msg</a></li>
      <li><a href="#name">name</a></li>
      <li><a href="#page">page</a></li>
      <li><a href="#payload">payload</a></li>
      <li><a href="#per_page">per_page</a></li>
      <li><a href="#percent">percent</a></li>
      <li><a href="#Priority">priority</a></li>
      <li><a href="#projectid">Project ID</a></li>
      <li><a href="#queued">Queued</a></li>
      <li><a href="#retries_delay">retries_delay</a></li>
      <li><a href="#retries">retries</a></li>
      <li><a href="#revision">revision</a></li>
      <li><a href="#run_every">run_every</a></li>
      <li><a href="#running">Running</a></li>
      <li><a href="#runtime">Runtime</a></li>
      <li><a href="#stack">Stack</a></li>
      <li><a href="#start_at">start_at</a></li>
      <li><a href="#start_date">start_date</a></li>
      <li><a href="#task">Task</a></li>
      <li><a href="#timeout">timeout</a></li>
      <li><a href="#to_time">to_time</a></li>
      <li><a href="#urlparameters">URL Parameters</a></li>
      </ul>
      </td>
    
    
	</tr>
</tbody>
</table>
</section>



<p id="body"><b>Body</b> - The data of the message being pushed or pulled</p>



<p id="version"><b>API Version</b> - The IronWorker API version is 2

<p id="cancelled"><b>Cancelled</b> - This is the task status when cancelled by the user

<p id="cli"><b>CLI</b> - The Iron.io commandline Interface tool written in Go. More information can be found here

<p id="cluster"><b>Cluster</b> - This option is for users with their own custom worker cluster. If it omitted, the default cluster will be used

<p id="code_name"><b>code_name</b> - This option is used when scheduling a task. The code name is assigned during the code upload

<p id="codepackage"><b>Code Package</b> - The code that will run when your worker runs

<p id="command"><b>Command</b> - The command to execute when running your worker code

<p id="complete"><b>Complete</b> - This is the task status when the task has finished

<p id="config"><b>Config</b> - An arbitrary string (usually YAML or JSON) that, if provided, will be available in a file that your worker can access

<p id="contentlength"><b>Content-Length</b> - When uploading or updating a code package, the request needs this added to the header. It is used for the number of bytes in your JSON-encoded request body

<p id="contenttype"><b>Content-Type</b> - When uploading or updating a code package, the request needs this added to the header. It should be set to "multipart/form-data ; boundary={Insert Value Here}" with boundary set to an appropriate value

<p id="Default_priority"><b>default_priority</b> - The default priority of the tasks running this code. Valid values are 0, 1, and 2. The priority of the task can be set when queueing the task. If it's not set when queueing the task, the default priority is used

<p id="delay"><b>delay</b> - The number of seconds to delay before actually queuing the task. Default is 0. Maximum is 604,800 seconds (7 days)

<p id="end_at"><b>end_at</b> - Used when scheduling a task, this is the time tasks will stop being queued. Should be a time or datetime

<p id="end_date"><b>end_date</b> - When getting code package status, this option Limit the counts of tasks to those that were last modified before this time specified. Time should be formatted as the number of seconds since the Unix epoch

<p id="endpoint"><b>Endpoint</b> - The URL where Iron’s services can be reached by your application

<p id="env_vars"><b>env_vars</b> - Environment variables accessible within your code. It's a JSON object consisting corresponding key/value pairs. Keys and values are intended to be alphanumeric; if you want to pass values composed of wider list of symbols, consider to encode value with base64 encoding and decode it back within your code

<p id="error"><b>error</b> - This is the task status when there is an error during processing

<p id="exponentialbackoff"><b>Exponential Backoff</b> - If a 503 error code is returned, retrying the request with increasing delays until it succeeds or a maximum number of retries (configured by the client) has been reached

<p id="from_time"><b>from_time</b> - When getting a list of tasks, this optional parameter is used to limit the retrieved tasks to only those that were created after the time specified in the value

<p id="host"><b>Host</b> - This is the cluster you are running your workers on

<p id="image"><b>Image</b> - This is the docker image you will be running your workers in

<p id="killed"><b>killed</b> - This is the task status when a task is killed by the system

<p id="max_concurrency"><b>max_concurrency</b> - The maximum number of workers that should be run in parallel

<p id="msg"><b>msg</b> - Used when setting a task’s progress. Any message or data describing the completion of the task. Must be a string value, and the 64KB request limit applies

<p id="name"><b>name</b> - A unique name for your worker. This will be used to assign tasks to the worker as well as to update the code. If a worker with this name already exists, the code you are uploading will be added as a new revision

<p id="page"><b>page</b> - This optional query parameter is used when retrieving tasks. The page of tasks you want to retrieve, starting from 0. Default is 0, maximum is 100

<p id="payload"><b>payload</b> - A string of data to be passed to the worker (usually JSON) so the worker knows exactly what worker it should perform. This is the equivalent to a message in a typical message queue. The payload will be available in a file that your worker can access. File location will be passed in via the -payload argument. The payload cannot be larger than 64KB in size

<p id="per_page"><b>per_page</b> - When querying tasks, this optional parameter is used to set how many are returned

<p id="percent"><b>percent</b> - When checking a task’s progress, an integer, between 0 and 100 inclusive, that describes the completion of the task

<p id="Priority"><b>priority</b> - The priority queue to run the task in. Valid values are 0, 1, and 2. Task priority determines how much time a task may sit in queue. Higher values means tasks spend less time in the queue once they come off the schedule. The standard/default priority is 0

<p id="projectid"><b>Project ID</b> - This is the unique identifier for your project. It is a 24 character alphanumeric string

<p id="queued"><b>Queued</b> - This is a task that has been placed in the queue and is waiting for it’s turn to execute

<p id="retries_delay"><b>retries_delay</b> - The number of seconds to wait before retries. If omitted, tasks will be immediately retried

<p id="retries"><b>retries</b> - The maximum number of times failed tasks should be retried, in the event that there's an error while running them. If omitted, tasks will not be retried. Tasks cannot be retried more than ten times

<p id="revision"><b>revision</b> - When working with code packages, this parameter allows you to get a specific version of the code package. If omitted, the latest will be used

<p id="run_every"><b>run_every</b> - When scheduling a task, this sets the amount of time, in seconds, between runs. By default, the task will only run once

<p id="running"><b>Running</b> - This is the task status when the task has started, but is not finished

<p id="runtime"><b>Runtime</b> - This is a holdover from the .worker file days. It was used to declare the programming language you are working in

<p id="stack"><b>Stack</b> - This shows the optional programming stacks to run your code in

<p id="start_at"><b>start_at</b> - When scheduling a task, this optional parameter sets when the task should first be run

<p id="start_date"><b>start_date</b> - When getting a code package status, this optional parameter limits the counts of tasks to those that were last modified after this time specified. Time should be formatted as the number of seconds since the Unix epoch

<p id="task"><b>Task</b> - Tasks are specific instance of your workers being run. They encompass a single execution of a code package. Tasks consist of the code package to be run and the data to pass to the code package

<p id="timeout"><b>timeout</b> - The maximum runtime of your task in seconds. No task can exceed 3600 seconds (60 minutes). The default is 3600 but can be set to a shorter duration

<p id="to_time"><b>to_time</b> - When getting a list of tasks, this optional parameter limits the retrieved tasks to only those that were created before the time specified in the value. Time should be formatted as the number of seconds since the Unix epoch

<p id="urlparameters"><b>URL Parameters</b> - These are elements in a URL you can use to customize the endpoint
