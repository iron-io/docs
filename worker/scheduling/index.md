---
layout: default
title: IronWorker&colon; Scheduling Tasks with Scheduler
section: worker
breadcrumbs:
  - ["Scheduling Tasks", "/scheduling"]
---

<p>IronWorker tasks are flexible; they don't have to be queued immediately. Rather, you can schedule a task to be queued at a specific time or after a set amount of time. This article shows you how to create them using the <span class="fixed-width">iron_worker_ng</span> Ruby gem</p>

<p>Scheduled jobs are separate resources than queued tasks. When scheduled tasks run, they queue a task to execute the worker code. The Scheduled Task has a Scheduled ID. The task that executes is separate and has a distinct Task ID. You monitor Scheduled Tasks in the Schedule tab in the HUD. Tasks that subsequently queued can be monitored within the Task tab.</p>


<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li>
    	<a href="#api_reference">Schedule Task API Reference</a>
    </li>
    <li>
    	<a href="#best_practices">Scheduling Best Practices</a>
    </li>
    <li>
    	<a href="#scheduling_in_dashboard">Schedule Task via HUD/Dashboard</a>
    </li>
    <li>
    	<a href="#scheduling_with_ruby_client">Scheduling Examples with Ruby Client</a>
    </li>
  </ul>
</section>

<h2 id="api_reference">API Reference</h2>

#### Endpoint

<div class="grey-box">
    POST /projects/<span class="variable project_id">{Project ID}</span>/schedules
</div>

#### URL Parameters

* **Project ID**: The ID of the project that you want to schedule the task in.

#### Request

The request should be a JSON object with a "schedules" property containing an array of objects with the following properties:

* **code_name**: The name of the code package to execute.
* **payload**: A string of data to pass to the code package on execution.

Optionally, each object in the array can specify the following properties:

* **start_at**: The time the scheduled task should first be run.
* **run_every**: The amount of time, in seconds, between runs. By default, the task will only run once. run_every will return a 400 error if it is set to <a href="/worker/reference/environment/#minimum_run_every_time">less than 60</a>.
* **end_at**: The time tasks will stop being queued. Should be a time or datetime.
* **run_times**: The number of times a task will run.
* **priority**: The priority queue to run the task in. Valid values are 0, 1, and 2. Task priority determines how much time a task may sit in queue. Higher values means tasks spend less time in the queue once they come off the schedule. Access to priorities depends on your selected IronWorker plan [see plans](http://www.iron.io/products/worker/pricing). You must have access to higher priority levels in your chosen plan or your priority will automatically default back to 0.  The standard/default priority is 0.
* **timeout**: The maximum runtime of your task in seconds. No task can exceed 3600 seconds (60 minutes). The default is 3600 but can be set to a shorter duration.
* **delay**: The number of seconds to delay before scheduling the tasks. Default is 0.
* **task_delay**: The number of seconds to delay before actually queuing the task. Default is 0.
* **cluster**: cluster name ex: "high-mem" or "dedicated".  This is a premium feature for customers for customers to have access to more powerful or custom built worker solutions. Dedicated worker clusters exist for users who want to reserve a set number of workers just for their queued tasks. If not set default is set to  "default" which is the public IronWorker cluster.


<h2 id="best_practices">Best Practices</h2>
<ul>
	<li>
		<p>Many Tasks To Run in Future - If you have lots of the same individual tasks to run in the future (sending emails to users, for example), we suggest <strong>not</strong> creating individual scheduled tasks (or queuing lots of tasks with delays). It's better to create a scheduled task that repeats on a regular basis. This scheduled task should then query a data base or datastore for the users to email (or actions to take). It can then spin up one or more sub-tasks to execute the work (creating one task per action or better yet, allocating a certain number of data slices to each task to better amortize the setup cost of a task).</p>
		<p>Here are a few posts on the topic:</p>
		<ul>
			<li><a href="http://blog.iron.io/2011/06/worker-patterns-creating-task-level.html">Pattern: Creating Task-Level Workers at Runtime</a></li>
			<li><a href="http://blog.iron.io/2011/07/anti-pattern-lots-of-scheduled-jobs.html">Anti-Pattern: Lots of Scheduled Jobs</a></li>
		</ul>
	</li>

	<li>
		<p>Finer-Grained Scheduling - There may be the need to run tasks on specific days or dates (end of month or Tuesday and Thursday). We recommend creating a scheduled job that runs frequently and then does a quick check to see if the scheduling condition is met. For example, running daily and checking if it's the last day of the month or a Tuesday or Thursday. If so, then continue with the task; if not, then exit. (We're looking at addressing finer-grain scheduling options but don't accommodate it at present.)</p>
	</li>

	<li>
		<p>Specific times are expressed as time objects and so can be in UTC or local time. They'll be recorded in the system as UTC but displayed in the HUD/dashboard in the timezone that you specify for the HUD.</p>
	</li>

	<li>
		<p><strong>Note:</strong> Scheduled tasks may not be <em>executed</em> at the scheduled time; they will simply be placed on the queue at that time. Depending on the circumstances, a task may be executed a short time after it is scheduled to be. Tasks will never be executed before their schedule, however. (Scheduled tasks can be given a priority; higher priorities can reduce the time in queue.)</p>
	</li>
</ul>

<h2 id="scheduling_in_dashboard">Schedule Task via HUD/Dashboard</h2>
<p>We've added a easy to use GUI to help you create and manage your schedules.</p>
<ol>
	<li>Click on the create schedule button on our schedule's page in the dashboard
		<a href="/images/worker/scheduling/step1.png" target="_blank"><img style="max-width: 50%;" src="/images/worker/scheduling/step1.png" alt=""></a>
	</li>
	<li>Fill in the relevant parameters for the scheduled task you want to create
		<a href="/images/worker/scheduling/step2.png" target="_blank"><img style="max-width: 50%;" src="/images/worker/scheduling/step2.png" alt=""></a>
	</li>
	<li>Click on the create schedule button on our schedule's page in the dashboard
		<a href="/images/worker/scheduling/step3.png" target="_blank"><img style="max-width: 50%;" src="/images/worker/scheduling/step3.png" alt=""></a>
	</li>
	<li>You can now view your current, past, and deleted scheduled in the list view.
		<a href="/images/worker/scheduling/step4.png" target="_blank"><img style="max-width: 50%;" src="/images/worker/scheduling/step4.png" alt=""></a>
	</li>
	<li>If you click on a schedule you have the ability to view the details and edit/update your schedules accodingly. <strong>note:</strong> updating a schedule will delete the old one and create a new one.
		<a href="/images/worker/scheduling/step5.png" target="_blank"><img style="max-width: 50%;" src="/images/worker/scheduling/step5.png" alt=""></a>
	</li>
</ol>

<h2 id ="scheduling_with_ruby_client">Scheduling with the Ruby Client</h2>
<p>Scheduling a task to be queued at a specific time is easy:</p>


```ruby
schedule = client.schedules.create('MyWorker', payload, {:start_at => Time.now + 3600})
```

<p>To run on a regular schedule, then just include an interval to repeat execution of the scheduled task. (This is useful, for example, for sending out daily notifications or cleaning up old database entries.)</p>

```ruby
schedule = client.schedules.create('MyWorker', payload, {:run_every => 3600})
# will be run every hour
```

<p>These repeating tasks can also be set to queued at a specific start time:</p>

```ruby
schedule = client.schedules.create('MyWorker', payload, {:start_at => Time.now + 3600, :run_every => 3600})
# will be run every hour, starting an hour from now
```

<p>You can also schedule a task to be queued after a certain delay:</p>

```ruby
schedule = client.tasks.create('MyWorker', payload, {:delay => 3600})
# queues the task after one hour
```

<div class="alert">
<p><strong>Note:</strong>You can use a delay for a scheduled job <strong>and</strong> for a <a href="http://dev.iron.io/worker/reference/api/#queue_a_task">queued task</a>. The difference is a delayed scheduled task will kick off a regular task whereas a delayed task executes directly (after the delay). We suggest using a delayed task if the delay time is brief; a scheduled task if it's longer into the future and/or repeats frequently. See the note below, however, on good practices especially for large numbers of individual  tasks to run in the future.</p>
</div>

<p>Finally, you can also control how many times a repeating task is run:</p>

```ruby
schedule = client.schedules.create('MyWorker', payload, {:start_at => Time.now + 3600, :run_every => 3600, :run_times => 24 })
# will be run every hour for one day, starting an hour from now
```
