---
title: IronMQ v3 Hud Walk-Through
layout: default
section: 3
breadcrumbs:
  - ['Hud', 'mq', 'Walk-Through']
---

When you first log into <a href="https://hud.iron.io">Hud</a>, you'll be taken to the Dashboard. Here you'll see  list of your projects as well as a usage indicator on the right. Click the "MQ 3" button to the right of the project name to move forward.
<center><img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/jpkImages/hudWalkthrough/standardDash.png' style="width: 450px;"></center>


<section id="toc">
  <h3>Tabs</h3>
  <ul>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#messages">Messages</a></li>
  </ul>
</section>

This will show you all of the queues for that project for that location. This example is in EU-West, but that can be changed by clicking the down error next to the location at the top.
<center><img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/jpkImages/mq/queuesInProject.png' style="width: 450px;"></center>

<h2 id="overview">Overview</h2>
If you click the name of the queue, you'll first be taken to the overview page. All of the information about the queue can be found here. Including the webhook URL, type of queue and Realtime data.
<center><img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/jpkImages/mq/queueOverview.png' style="width: 450px;"></center>


<h2 id="messages">Messages</h2>
The messages tab will show you all of the messages in that queue. If you don't see a particular message you're looking for, check if the "show reserved messages" option is checked.
<center><img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/jpkImages/mq/messagesInQueue.png' style="width: 450px;"></center>


You can click on the message to see it's body and ID
<center><img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/jpkImages/mq/messageDetails.png' style="width: 450px;"></center>
