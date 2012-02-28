---
title: IronWorker Environment
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['Environment', '/environment']
---

<style type="text/css">
.content table.reference {
font-size: small;
width: 100%;
}

.content table.reference td {
padding: 2px 7px;
text-align: left;
}

.content table.reference th {
text-align: left;
border-bottom: 1px solid #000;
}

.content table.reference_list {
font-size: small;
width: 100%;
}

.content table.reference_list td {
padding: 2px 7px;
text-align: center;
}

.content table.reference_list th {
text-align: center;
border-bottom: 1px solid #000;
}

</style>
# System Environment

##Operating System

<table class="reference_list">
<tr><th>Operating System</th></tr>
<tr><td>Ubuntu Linux 11.10</td></tr>
</table>

##Installed Linux Packages
IronWorker contains several popular Linux packages as part of the standard worker environment.

<table class="reference">
<tr><th style="width: 20%;">Package</th><th style="width: 45%;">Full Name</th><th style="width: 35%;">Purpose</th></tr
<tr><td><a href="http://www.imagemagick.org/" title="ImageMagick">ImageMagick</a></td><td>ImageMagick Image Processing</td><td>Image processing</td></tr>
<tr><td><a href="http://freeimage.sourceforge.net//" title="FreeImage">FreeImage</a></td><td>The FreeImage Project</td><td>Image processing</td></tr>
<tr><td><a href="http://sox.sourceforge.net/" title="SoX">SoX</a></td><td>Sound eXchange Library</td><td>Sound processing</td></tr>
<tr><td><a href="http://curl.haxx.se/" title="curl">curl</a></td><td>Client URL Request Library</td><td>URL file processing</td></tr>
</table>

These are included for convenience because they are binary packages. (See the tip below regarding environment independence.) 

If you don't see what you need here, please [contact us](http://support.iron.io/customer/portal/emails/new) and tell us what you're looking for. If it's a common/popular package, we can certainly look to include it.

##Language Environments

<table class="reference">
<tr><th style="width: 50%;">Language</th><th style="width: 50%;">Version</th></tr>
<tr><td>Ruby</td><td><a href="http://www.ruby-lang.org/en/downloads/" title="Version 1.9.2p280">Version 1.9.2p280</a></td></tr>
<tr><td>Python</td><td><a href="" title="Version ..."></a>Version ...</td></tr>
<tr><td>PHP</td><td><a href="" title="Version ..."></a>Version ...</td></tr>
</table>

We have included a small set of Ruby gems as part of the IronWorker native environment. See the table below for this list.

##Memory per Worker
The standard worker sandbox environment contains a certain amount of accessible memory. This amount should be sufficient for almost all workloads. We are working on a super worker environment that would allow greater memory allocations. Please contact us if you have specific needs here.

<table class="reference_list">
<tr><th>Memory per Worker</th></tr>
<tr><td>~320MB</td></tr>
</table>

Tip: We recommend distributing workloads over multiple workers -- not only for better resource management but also to take advantage of massive concurrency enabled by a cloud worker system. 

##Local Disk Space (per Worker)
Each worker task has local disk space available to it for use on a temporary basis while the worker is running. You have full read/write privileges to create directories and files and can perform most ordinary file operations. You access this disk space via the `user_dir` directory.

<table class="reference_list">
<tr><th>Local Disk Space</th></tr>
<tr><td>10GB</td></tr>
</table>

##Max Run Time (per Worker)
There is a system-wide limit for the maximum length a task may run. Tasks that exceed this limit will be terminated and will have `timeout` as their status. 

<table class="reference_list">
<tr><th>Max Worker Run Time</th></tr>
<tr><td>3600 seconds (60 minutes)</td></tr>
</table>

Tip: You should design your tasks to be moderate in terms of the length of time they take to run. If tasks are small (seconds or milli-seconds) then you want to group them together so as to amortize the worker setup costs. Likewise, if they are long-running tasks, you should break them up into a number of workers. Note that you can chain together workers as well as use scheduled jobs and datastores to orchestrate a complex series or sequence of tasks.

##Max Scheduled Tasks (per Project)
The following is the default number of scheduled tasks. It should be sufficient for even the largest projects (see the Tip below). If you would like this number increased, however, please feel free to contact us.

<table class="reference_list">
<tr><th>Max Scheduled Tasks</th></tr>
<tr><td>100</td></tr>
</table>

Tip: A common mistake is to create scheduled jobs on a per user or per item basis. Instead, use scheduled jobs as master tasks that orchestrate activities around sets of users or items. When schedule tasks run, they can access databases to get a list of actions to perform and then queue up one or more workers to handle the set. View the pages on Scheduling for more information on scheduling patterns and best practices.

##Pre-installed Code Libraries (language-specific)
IronWorker supports a handful of pre-installed code libraries specifically around certain languages. 

We recommend, however, that you design your workers to be environment independent. In other words, you recommend that you upload (or merge) all language-specific code libraries (such as Ruby gems or Python packages) that your workers as part of the code package. We don't recommend relying on these language libraries because they may change or new versions may be added creating conflicts with your workers. We provide them as a convenience to help users get started but production workers should strive to isolate their environments as much as possible.

###Ruby Gems Installed
Here is the list of Ruby gems installed in IronWorker environment. Note that a number are binary gems which is why they are pre-installed. Whenever possible, merge the gems you need as part of the code upload.

<table class="reference_list">
<tr><th>Ruby Gems</th><th>Comments</th></tr>
<tr><td>bson_ext</td></tr>
<tr><td>curb</td></tr>
<tr><td>em-http-request</td></tr>
<tr><td>eventmachine</td></tr>
<tr><td>mysql2</td></tr>
<tr><td>net-scp</td></tr>
<tr><td>net-sftp</td></tr>
<tr><td>net-ssh</td></tr>
<tr><td>nokogiri</td><td>May need to merge with `merge_gem` but then unmerge with `unmerge_gem`</td></tr>
<tr><td>rmagick</td><td>Use require 'RMagick'</td></tr>
<tr><td>sqlite3</td></tr> 
<tr><td>typhoeus</td></tr>
<tr><td>yajl-ruby</td></tr>
</table>

To make use of one of the pre-installed gems, use a `require` along with the gem name.

<pre>
require 'iron_worker'
require 'nokogiri'

class PageWorker < IronWorker::Base

  def run
    ...
  end
end
</pre>

If you need a specific version, we recommend using the `merge_gem` command along with a version parameter.

<pre>
merge_gem "some_gem", "1.2.3"
</pre>

Note: There are other gems installed in the system but we don't publish the full list because we can't guarantee they will be included. Instead upload the gems your worker needs along with your code.
