---
title: IronWorker Hud Overview
layout: default
section: worker
breadcrumbs:
  - ['Hud', 'worker']
---

When you first log into Hud, you'll be taken to the Dashboard. Here you'll see  list of your projects as well aaas a usage indicator on the right. Click the "Worker" button to the right of the project name to move forward.
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/jpkImages/hudWalkthrough/standardDash.png'>

<section id="toc">
  <h3>Tabs</h3>
  <ul>
    <li><a href="#start">Get Started</a></li>
    <li><a href="#tasks">Tasks</a></li>
    <li><a href="#schedule">Scheduled Tasks</a></li>
    <li><a href="#code">Code</a></li>
    <li><a href="#analytics">Analytics</a></li>
    <li><a href="#usage">Usage</a></li>
  </ul>
</section>

<h2 id="start">Get Started</h2>
This page takes you through a very basic worker example and shows you were to download the Iron CLI as well as Docker.
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/jpkImages/hudWalkthrough/gettingStarted.png'>

<h2 id="Tasks">Tasks</h2>
The tasks tab has a lot of information. When you first click into it, you're shown a list of all your workers and what they've done in the past 24 hours. You can click the name of any of those workers to get more detailed information about it.
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/jpkImages/hudWalkthrough/taskTab/taskOverview.png'>

You can click the name of any of those workers to get more detailed information about it. From here, you can find all of the tasks for this worker. It includes completed tasks, queued tasks, running tasks, tasks that got an error, cancelled tasks, killed tasks and tasks that timedout. 
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/jpkImages/hudWalkthrough/taskTab/taskList.png'>

You can then click the name of any of those tasks to get the speific information about them. From the task detail page, you can find a wealth of information about each task such as the cluster, payload and priority to name a few. You can also see the log.
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/jpkImages/hudWalkthrough/taskTab/taskDetails.png'>
And it's log
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/jpkImages/hudWalkthrough/taskTab/taskLog.png'> 

<h2 id="schedule">Scheduled Tasks</h2>
Iron.io gives you a simple way to schedule repetive tasks. To add a new scheduled task, simply click the calendar with a plus sign on the right of the page.
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/jpkImages/hudWalkthrough/scheduleTab/scheduleOverview.png'>

Once you have a task scheduled, you can click it's title to get more information.
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/jpkImages/hudWalkthrough/scheduleTab/scueduleDetails.png'>

<h2 id="code">Code</h2>
The code tab shows you all of the code packages you've uploaded.
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/jpkImages/hudWalkthrough/codeTab/codeOverview.png'>

If you click the package name, you can get more details about that code package.
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/jpkImages/hudWalkthrough/codeTab/codeDetails.png'>


<h2 id="analytics">Analytics</h2>
The analytics page gives a nice graphical overview of your workers. This can be broken down to daily of hourly.
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/jpkImages/hudWalkthrough/analyticsOverview.png'>

<h2 id="usage">Usage</h2>
This tab gives an overview of how much you've used your workers.
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/jpkImages/hudWalkthrough/dataOverview.png'>
