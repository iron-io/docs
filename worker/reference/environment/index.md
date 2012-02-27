---
title: IronWorker Environment
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['Environment', '/environment']
---
# IronWorker System Environment

##Operating System
Ubuntu Linux 11.10

##Installed Linux Packages
IronWorker contains several popular Linux packages as part of the standard worker environment.

* [ImageMagick](http://www.imagemagick.org/) (ImageMagick Image Processing)
* [SoX](http://sox.sourceforge.net/) (Sound eXchange Library)
* [FreeImage](http://freeimage.sourceforge.net/) (The FreeImage Project)
* [curl](http://curl.haxx.se/) (Client for URLs)

These are included for convenience because they are binary packages. (See the tip below regarding worker independence.) 

If you don't see what you need here, please [contact us](http://support.iron.io/customer/portal/emails/new) and tell us what you're looking for. If it's a common/popular package, we can certainly look to include it.

##Language Environments

* Ruby Version 1.9.2p280

##Pre-installed Supported Code Libraries

Ruby
We have included a number of Ruby gems as part of the IronWorker native environment. For the list, please go here:

   IronWorker system gems

Tip:
We recommend you design your workers to be environment independent. In other words, you want to merge or upload  all language-specific code libraries that you need for your worker  (such as Ruby gems or Python packages) and not rely on system libraries (except for the binary Linux packages noted above). The systems libraries may change plus new versions may be added creating conflicts with your workers. We provide them as a convenience to help users get started but production workers should strive to isolate their environments as much as possible.

##Memory per Worker
The standard worker sandbox environment contains a certain amount of accessible memory.

Memory per Worker
~320MB 

This should be sufficient for most workers. We recommend distributing workloads over multiple workers -- not only for better resource management but also to take advantage of massive concurrency enabled by a cloud worker system. We are working on a super worker environment that would allow greater memory allocations. Please contact us if you have specific needs here.

##Local Disk Space (per Worker)
Each worker task has local disk space available to it for use on a temporary basis while the worker is running. You have full read/write privileges to create directories and files and can perform most ordinary file operations. You access this disk space via the `user_dir` directory.

Local Disk Space
10GB


##Max Worker Run Time (per Worker)
There is a system-wide limit for the maximum length a task may run. Tasks that exceed this limit will be terminated and will have `timeout` as their status. 

Max Worker Run Time
60 minutes

Tip: You should design your tasks to be moderate in terms of the length of time they take to run. If tasks are small (seconds or milli-seconds) then you want to group them together so as to amortize the worker setup costs. Likewise, if they are long-running tasks, you should break them up into a number of workers. Note that you can chain together workers as well as use scheduled jobs and datastores to orchestrate a complex series or sequence of tasks.

##Max Scheduled Tasks (per Project)
The following is the default number of scheduled tasks. It should be sufficient for even the largest projects (see the Tip below). If you would like this number increased, however, please feel free to contact us.

Max Scheduled Tasks
100

Tip: A bad anti-pattern is to create scheduled jobs on a per user or per item basis. Instead, you want to create scheduled jobs that act as master tasks that orchestrate activities by accessing databases and queuing up other workers. View the pages on Scheduling for more information on best practices.
