---
layout: posts
title: Scheduling Tasks
permalink: /worker/scheduling
---

# {{ page.title }}

IronWorker tasks are flexible; they don't have to be queued immediately. Rather, you can schedule a task to be queued at a specific time or after a set amount of time.

<div class="alert">
<p><strong>Note:</strong> Tasks may not be <em>executed</em> at the scheduled time; they will simply be placed on the queue at that time. Depending on the circumstances, a task may be executed a short time after it is scheduled to be. Tasks will never be executed before their schedule, however.</p>
</div>

Scheduling a task to be queued at a specific time is easy:

<div class="alert">
<p>There should be a code sample here demonstrating how to schedule a task to be executed once at a specific time.</p>
</div>

You can also schedule a task to be queued after a certain delay:

<div class="alert">
<p>There should be a code sample here demonstrating how to schedule a task to be queued after a certain delay.</p>
</div>

Some tasks, like sending out daily notifications or cleaning up old database entries, are more useful run on a repeating schedule. IronWorker supports creating tasks that will run at set intervals:

<div class="alert">
<p>There should be a code sample here demonstrating how to schedule a task to be run every hour</p>
</div>

These repeating tasks can also be set to queued at a specific time:

<div class="alert">
<p>There should be a code sample here demonstrating how to schedule a task to be run every hour, starting at a specific time.</p>
</div>

Of course, you can also schedule repeating tasks after a certain delay, if you prefer:

<div class="alert">
  <p>There should be a code sample here demonstrating how to schedule a task to be queued every hour, starting after a specific delay.</p>
</div>

Finally, you can also control how many times a repeating task is run:

<div class="alert">
  <p>There should be a code sample here demonstrating how to schedule a task to be queued every hour, starting at a specific time, running 5 times.</p>

<div class="alert">
  <p>There should be a code sample here demontrating how to schedule a task to be queued every hour, starting after a specific delay, running 5 times.</p>
</div>
