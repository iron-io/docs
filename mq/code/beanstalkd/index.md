---
title: IronMQ Code
layout: default
section: mq
breadcrumbs:
  - ['Code', '/code']
  - ['Beanstalkd', '/beanstalkd']
---

## Beanstalkd Support


<div><font face="Arial, Verdana, sans-serif"><span style="line-height:21px">You can use any of the <a href="https://github.com/kr/beanstalkd/wiki/client-libraries">Beanstalkd clients</a>
and there is sure to be one for your language of choice.
Learn how to authenticate, connect, and use the library below.</span></font></div>

<br />

### Connecting
<p>Host:<code>&nbsp;mq-aws-us-east-1.iron.io</code> (AWS)&nbsp;OR <code>mq-rackspace-dfw.iron.io</code> (Rackspace)</p>
<p>Port:<code>&nbsp;11300<br>
</code></p>
<div><font size="2"><br>
</font></div>


### Authenticating
<div style="color:rgb(68,68,68);font-family:Arial,Verdana,sans-serif;line-height:21px">Because IronMQ requires authentication, the first command you send must put a message with the contents:<br>
<br>
<code>oauth MY_TOKEN PROJECT_ID</code><br>
</div>
<div style="color:rgb(68,68,68);font-family:Arial,Verdana,sans-serif;line-height:21px"><br>
The DRAINING response will be returned if authentication fails or if any other command is sent before authentication.<br>
</div>
<div style="color:rgb(68,68,68);font-family:Arial,Verdana,sans-serif;line-height:21px"><br>
</div>

### Queues and Tubes
<div style="color:rgb(68,68,68);font-family:Arial,Verdana,sans-serif;line-height:21px">beanstalkd `tubes` are synonymous with `queue names` in the <a href="https://sites.google.com/a/iron.io/documentation/mq/api">HTTP API</a>. &nbsp;</div>
<div style="color:rgb(68,68,68);font-family:Arial,Verdana,sans-serif;line-height:21px"><br>
</div>
<div style="color:rgb(68,68,68);font-family:Arial,Verdana,sans-serif;line-height:21px">A tube named `default` will be used if not specified.</div>
<div style="color:rgb(68,68,68);font-family:Arial,Verdana,sans-serif;line-height:21px"><br>
</div>


### Notes

<div style="color:rgb(68,68,68);font-family:Arial,Verdana,sans-serif;line-height:21px">
<ul>
  <li style="list-style-position:outside;list-style-type:square">The ID you receive when using the beanstalkd interface will not be the same as the HTTP interface so you cannot use them interchangeably.</li>
  <li style="list-style-position:outside;list-style-type:square">There are some commands that IronMQ does not implement. These include:
  <ul>
    <li style="list-style-position:outside;list-style-type:square">release</li>
    <li style="list-style-position:outside;list-style-type:square">bury</li>
    <li style="list-style-position:outside;list-style-type:square">touch</li>
    <li style="list-style-position:outside;list-style-type:square">peek, peek-ready, peek-delayed, peek-buried</li>
    <li style="list-style-position:outside;list-style-type:square">kick</li>
    <li style="list-style-position:outside;list-style-type:square">list-tubes, list-tube-used</li>
    <li style="list-style-position:outside;list-style-type:square">stats, stats-job, stats-tube</li>
    <li style="list-style-position:outside;list-style-type:square">pause-tube</li>
    <li style="list-style-position:outside;list-style-type:square">quit</li>
  </ul></li>
</ul>
</div>
