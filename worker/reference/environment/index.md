---
title: IronWorker Environment
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['Environment', '/environment']
languages:
  - name: php
    command: php
    extension: php
  - name: python
    command: python
    extension: py
  - name: ruby
    command: ruby
    extension: rb
---

{% include language-switcher-head.html %}

# IronWorker Environment

## Operating System
The operating system and version information is provided for completeness and transparency. We recommend, however, you avoid binding your workers to specifics of the OS as much as possible.  

<div class="grey-box">
<b>Operating System:</b> Ubuntu Linux 11.10
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

These are included for convenience because they are binary packages. (See the tip below regarding environment independence.) 

If you don't see what you need here, please [contact us](http://support.iron.io/customer/portal/emails/new) and tell us what you're looking for. If it's a common/popular package, we can certainly look to include it.

## Language Environments
The following languages are officially supported within IronWorker. We have included a small set of Ruby gems as part of the IronWorker native environment in addition to the Linux/binary packages above. See the table below for the list of supported Ruby Gems.

<table class="reference">
  <thead>
    <tr><th style="width: 50%;">Language</th><th style="width: 50%;">Version</th></tr>
  </thead>
  <tbody>
    <tr><td>Ruby</td><td><a href="http://www.ruby-lang.org/en/downloads/" title="Version 1.9.2p280">Version 1.9.2p280</a></td></tr>
    <tr><td>PHP</td><td><a href="http://php.net/downloads.php#v5" title="Version 5.3.6">Version 5.3.6</a></td></tr>
    <tr><td>Python</td><td><a href="http://python.org/download/releases/2.7.2/" title="Version 2.7.2">Version 2.7.2</a></td></tr>
  </tbody>
</table>

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

Tip: We recommend distributing workloads over multiple workers -- not only for better resource management but also to take advantage of massive concurrency enabled by a cloud worker system. 

## Local Disk Space (per Worker)
Each worker task has local disk space available to it for use on a temporary basis while the worker is running. You have full read/write privileges to create directories and files and can perform most ordinary file operations. You access this disk space via the `user_dir` directory.

<div class="grey-box">
<b>Local Disk Space:</b> 10GB
</div>

## Max Run Time (per Worker)
There is a system-wide limit for the maximum length a task may run. Tasks that exceed this limit will be terminated and will have `timeout` as their status. 

<div class="grey-box">
<b>Max Worker Run Time:</b> 3600 seconds (60 minutes)
</div>

Tip: You should design your tasks to be moderate in terms of the length of time they take to run. If tasks are small (seconds or milli-seconds) then you want to group them together so as to amortize the worker setup costs. Likewise, if they are long-running tasks, you should break them up into a number of workers. Note that you can chain together workers as well as use scheduled jobs and datastores to orchestrate a complex series or sequence of tasks.

## Max Scheduled Tasks (per Project)
The following is the default number of scheduled tasks. It should be sufficient for even the largest projects (see the Tip below). If you would like this number increased, however, please feel free to contact us.

<div class="grey-box">
<b>Max Scheduled Tasks:</b> 100
</div>

Tip: A common mistake is to create scheduled jobs on a per user or per item basis. Instead, use scheduled jobs as master tasks that orchestrate activities around sets of users or items. When schedule tasks run, they can access databases to get a list of actions to perform and then queue up one or more workers to handle the set. View the pages on Scheduling for more information on scheduling patterns and best practices.

## Pre-installed Code Libraries (language-specific)
IronWorker supports a handful of pre-installed code libraries specifically around certain languages. 

We recommend, however, that you design your workers to be environment independent. In other words, you recommend that you upload (or merge) all language-specific code libraries (such as Ruby gems or Python packages) that your workers as part of the code package. We don't recommend relying on these language libraries because they may change or new versions may be added creating conflicts with your workers. We provide them as a convenience to help users get started but production workers should strive to isolate their environments as much as possible.

{% include language-switcher.html %}
<div class="ruby">
<h3 id="ruby_gems_installed">Ruby Gems Installed</h3>

<p>Here is the list of Ruby gems installed in the IronWorker environment. Note that a number are binary gems, which is why they are pre-installed. Whenever possible, merge the gems you need as part of the code upload.</p>

<table class="reference_list">
  <thead>
    <tr><th>Ruby Gems</th><th>Comments</th></tr>
  </thead>
  <tbody>
    <tr><td>bson_ext</td><td></td></tr>
    <tr><td>curb</td><td></td></tr>
    <tr><td>em-http-request</td><td></td></tr>
    <tr><td>eventmachine</td><td></td></tr>
    <tr><td>mysql2</td><td></td></tr>
    <tr><td>net-scp</td><td></td></tr>
    <tr><td>net-sftp</td><td></td></tr>
    <tr><td>net-ssh</td><td></td></tr>
    <tr><td>nokogiri</td><td>May need to merge with `merge_gem` but then unmerge with `unmerge_gem`</td></tr>
    <tr><td>rmagick</td><td>Use require 'RMagick'</td></tr>
    <tr><td>sqlite3</td><td></td></tr> 
    <tr><td>typhoeus</td><td></td></tr>
    <tr><td>yajl-ruby</td><td></td></tr>
  </tbody>
</table>

<p>To make use of one of the pre-installed gems, use a <span class="fixed-width">require</span> along with the gem name.</p>

{% highlight ruby %}
require 'iron_worker'
require 'nokogiri'

class PageWorker < IronWorker::Base

  def run
    ...
  end
end
{% endhighlight %}

<p>If you need a specific version, we recommend using the <span class="fixed-width">merge_gem</span> command along with a version parameter.</p>

{% highlight ruby %}
merge_gem "some_gem", "1.2.3"
{% endhighlight %}

<p>Notes: 
<ul>
<li>There are other gems installed in the system but we don't publish the full list because we can't guarantee they will be included. Instead upload the gems your worker needs along with your code.</li>
<li>The Rails framework is not supported in IronWorker. As per the note above, while there are certain code libraries included in IronWorker, you will want to explicitly include or merge in any specific libraries that you need.</li>
</ul>
</p>
</div>
<div class="php">
<h3 id="php_modules_installed">PHP Modules Installed</h3>

<p>Here is the list of PHP modules installed in the IronWorker environment. Generally, it's best practice for users to package their dependencies with their workers, but because these modules cannot be installed on a per-user basis, they are included in the environment.</p>

<table class="reference_list">
  <thead>
    <tr><th>PHP Modules</th><th>Comments</th></tr>
  </thead>
  <tr><td>php5-curl</td><td></td></tr>
  <tr><td>php5-mysql</td><td></td></tr>
  <tr><td>php5-gd</td><td></td></tr>
  <tr><td>mongo</td><td></td></tr>
</table>
</div>
<div class="python">
<h3 id="python_modules_installed">Python Modules Installed</h3>

<p>Here is the list of Python modules installed in the IronWorker environment. Generally, it's best practice for users to package their dependencies with their workers, but because these modules cannot be installed on a per-user basis, they are included in the environment.</p>

<table class="reference_list">
  <thead>
    <tr><th>Python Modules</th><th>Comments</th></tr>
  </thead>
  <tr><td>python-lxml</td><td></td></tr>
</table>
</div>
