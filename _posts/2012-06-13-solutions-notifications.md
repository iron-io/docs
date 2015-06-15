---
title: Sending Email & Notifications
layout: default
permalink: /solutions/notifications
categories:
  - solutions
section: solutions
summary: Sending notifications is key to delivering great service. A growing user base means distributing the effort and shrinking the time it takes to get emails and messages to your users.
breadcrumbs:
  - ['Email & Notifications', '/notifications']
---

Sending notifications is a required part of almost any application or service.
Whether it's sending email verification emails, texting users, sending out a
newsletter, emailing usage data, or even a more complicated use case, it's
important for you to keep in communication with your users.

This communication never really needs to block requests, however. Notifications
are asynchronous by nature, which makes them a perfect match for Iron.io's
services. As your application grows, your notification system needs to scale
with your user base and usage. This, again, is something that the elastic,
on-demand, massively scalable Iron.io architecture supports out of the box.

<p style="text-align: center;">
<img src="/images/notifications.png" alt="Notifications diagram" />
</p>

## Basics

Notification workers generally follow the same three-step process:

1. **Create Your Workers**. Create different workers to handle a variety of
   emails and notifications&mdash;alerts, daily summaries, weekly updates,
   personalized offers, special notices, and more.
2. **Choose Your Delivery Gateway**. Use an SMTP gateway like
   [SendGrid](http://www.sendgrid.com) or an API like Android [C2DM](http://developers.google.com/android/c2dm)
   and [Twilio](http://www.twilio.com) to manage the actual sending,
   monitoring, and analysis of the delivery step.
3. **Process and Send Notifications in Parallel**. Use IronWorker to handle the
   processing and interface with the gateway. Queue up thousands of jobs
   at once or use scheduled jobs to send messages at set times.

## The Worker

The worker can also be split up into three major steps: initializing the
notification headers, preparing and sending the notification, and signaling
exceptions and recording the status.

For a detailed example using SendGrid, IronWorker, and ActionMailer, check
out our [blog post](http://blog.iron.io/2012/06/powerful-email-infrastructure-with.html).

### Preparing the Headers

Based on your gateway, your language, and your library, this step may be
trivial. It consists largely of configuring the sender, the subject, and
other information that is common to all the notifications.

### Preparing the Notification

This will again depend on your specific implementation, but this will almost
always consist of a loop through the users you want to notify. If the notifications
are customized on a per-user basis, this is when the message would be generated.
Finally, the worker sends the mail or notification.

### Signaling Exceptions & Recording Status

This step is an important one if stability and logging are important to your
notifications. "Signaling Exceptions" simply means notifying your application
when something goes wrong--this can be as simple as a callback to an HTTP request
endpoint, pushing a message to IronMQ, or flagging a notification in the database.
However you want to do it, you should implement a way to trigger retries on
notifications. Scheduled workers can help in this: simply schedule a worker to
run every hour or every day and retry emails or notifications that threw errors
or failed. If a messge fails a certain number of times, bring it to the attention
of your team, as it probably indicates a bug in your worker.

Recording status is important for providing an audit log. It's often important
to know that, e.g., the user *was* warned about their overdue status. You
should log that the notification or email was successfully sent, along with
the timestamp.

## Sending in Parallel

Notifications and emails can often need to be sent in a timely fashion; users
are often not impressed with 9 hour delays between an event and receiving a
notification of it. As your usage and user base grow, a single task that
processes notifications one at a time will quickly become inadequate.

As with the [transformation of a 9-hour job to a 9-minute job](http://blog.iron.io/2012/03/how-to-reduce-9-hour-job-into-10-minute.html),
the solution to this lies in massive parallelisation. By queuing tens, hundreds,
or thousands of tasks to manage your queue, you can process a staggering
amount of notifications and emails in a brief time period. Many hands makes
light work.

Workers do have a setup time, and sending a notification is a pretty quick
action. To try to make the most of the setup time, we usually recommend that
tasks run for at least several minutes. The most straight-forward architecture,
queuing a task for each notification, will work&mdash;it's just not the most
efficient method available. A more elegant model would be to batch notifications
into tens or hundreds, then queue that batch, instead of *all* tasks or just *one*.

## Using IronMQ to Guarantee Delivery

IronMQ uses a get-delete paradigm that keeps messages on the queue until they
are explicitly deleted, but reserves them for short periods of time for clients
to prevent duplicate handling. This architecture makes it really easy to implement
messages that will automatically retry. As long as a message is not removed from
the queue until after the worker sends it, any error that causes the worker to fail
or sending to fail will result in the message being returned to the queue to be
tried again, without any intervention or error-handling on your part.

Furthermore, IronMQ can be used for tightly controlled parallelisation.
Assuming messages are queued up, workers can be spun up to consume the queue
until it is empty. This allows you to spin up as many workers as you want,
working in parallel with no modification to your code or batching. You can
avoid overloading an API or database with thousands of simultaneous requests
through this tight control over the number of running workers.

## More Info

Need more help? Email [support@iron.io](mailto:support@iron.io) and our
engineers will help you architect a solution that fits your needs.
