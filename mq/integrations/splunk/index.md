---
title: Splunk Modular Input
layout: default
section: mq
breadcrumbs:
- ['MQ Integrations', '/mq']
- ['Splunk Modular Input', '/splunk']
---

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#download">Download IronMQ Modular Input</a></li>
    <li><a href="#install">Installing IronMQ into Splunk</a></li>
    <li><a href="#data">Adding IronMQ as a Data Source in Splunk</a></li>
    <li><a href="#use">Using IronMQ with Splunk</a></li>
    <li><a href="#reference">Additional Reference</a></li>
  </ul>
</section>

[Splunk](http://www.splunk.com) is the leading platform for Operational Intelligence by providing deep insight into a wide range of machine data.

Splunk provides an add-on environment for building integrations that are available through [Splunkbase](https://splunkbase.splunk.com/).

Iron.io has built an official IronMQ Modular Input plugin for Splunk users to reliably deliver and buffer data into their Splunk environment. You must have both an Iron.io account and Splunk Enterprise account to use this integration.

<h2 id="download">Download IronMQ Modular Input</h2>

Go to the IronMQ Modular Input on [Splunkbase](https://splunkbase.splunk.com/app/2744/) and download the add-on by selecting the 'Download' button. Make sure IronMQ is compatible with your version of Splunk Enterprise. 6+.

<img width="100%" src="/images/mq/splunk/splunkbase-ironmq.png" alt="IronMQ Modular Input on Splunkbase">

<h2 id="install">Installing IronMQ into Splunk</h2>

Once downloaded, you can install IronMQ into Splunk Enterprise in one of two ways:

<b>To install from within Splunk Enterprise</b>
<ol>
	<li>Login to Splunk Enterprise</li>
	<li>On the <b>Apps</b> menu, click <b>Manage Apps</b></li>
	<li>Click <b>Install app from file</b></li>
	<li>In the <b>Upload app</b> window, click <b>Choose File</b></li>
	<li>Locate the .tar.gz file you just downloaded, and then click <b>Open</b> or <b>Choose</b></li>
	<li>Click <b>Upload</b></li>
	<li>Click <b>Restart Splunk</b>, and then confirm you want to restart</li>
</ol>
<b>To install directly into Splunk Enterprise</b>
<ol>
	<li>Put the downloaded file in the <b>$SPLUNK_HOME/etc/apps</b> directory</li>
	<li>Untar and unzip the add-on using tar -xvf (*nix) or WinZip (windows)</li>
	<li>Restart Splunk</li>
</ol>

<h2 id="data">Adding IronMQ as a Data Source in Splunk</h2>

Once IronMQ is installed as an app in Splunk, you can set it up as a data input to automatically get messages from a queue into Splunk. From Splunk Enterprise, go to Settings -> Data Inputs. If installed properly from the previous steps, IronMQ will be listed as a "Local input". Under Actions, click 'Add New'.

<img width="100%" src="/images/mq/splunk/splunk-datainput.png" alt="Splunk Data Inputs">

If you don't already have an account with Iron.io, create one [here](https://hud.iron.io/users/new). Create a new project and queue to get the data needed for the Splunk data source.

Once you've created a project with Iron.io, copy your token, project_id, and queue name from the Iron.io HUD. You can set optional parameters for IronMQ such as Max Size of Messages and Interval. Also note that the default host is mq-aws-us-east-1.iron.io, so if you are using IronMQ at another endpoint or on-premises, you'll need to set that here.

<img width="100%" src="/images/mq/splunk/splunk-ironmq-config.png" alt="IronMQ Data Input Configuration">

<h2 id="use">Using IronMQ with Splunk</h2>

With IronMQ configured as a Data Input through Splunk Enterprise, you only need to POST messages to IronMQ. The IronMQ Modular Input will handle the GET and DELETE by pulling messages from the specified queue at the interval set during the configuration step. A simple example in Go.

<figcaption><span>splunk.go </span></figcaption>

```go
package main

import (
	"fmt"
	"github.com/iron-io/iron_go/mq"
)

func main() {
	q := mq.New("splunk-test")

	_, err := q.PushString("Hello, Splunk!")
	if err != nil {
		fmt.Println("error:", err)
	}
}
```

The message will then be indexed by Splunk for further analysis. To see the message just posted, set the Search bar to host=IronMQ. This will display the message id, body, and metadata. From here, you can build your own custom reports on the indexed data.

<img width="100%" src="/images/mq/splunk/splunk-search-ironmq.png" alt="Splunk Search IronMQ">

<h2 id="reference">Additional Reference</h2>

The IronMQ Modular Input source code is available for reference on GitHub [here](https://github.com/iron-io/splunk-ironmq-mi)






