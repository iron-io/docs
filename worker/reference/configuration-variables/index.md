---
title: Using Configuration Variables with IronWorker
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['Configuration', '/configuration-variables']
layout: post
---

<p></p>

<p>There are three primary methods of setting important configuration information for your IronWorker, <strong>setting the config variable</strong>, sending your worker the variables via the payload/params, and finally through our hud interface</p>

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#via_task_payload">Setting Config Variables via Task Payload</a></li>
    <li><a href="#config-via-file">Setting Config Variables via File (yaml & json)</a></li>
    <li><a href="#config-via-hud">Setting Config Variables via Iron.io HUD</a></li>
  </ul>
</section>

<h2 id="via_task_payload">Set config variables via Worker's task payload/params</h2>

<p>When queueing up a task you can easily pass configuration information via the payload. Each enviroment has it's own way to access parameters inside a worker. in ruby you access it by calling the <strong>params</strong> variable, in php you access it via

``` php
  $postdata = file_get_contents("php://input");
```

<p>This is preferable when your worker may have different variations, adapters or strategies when receiving different types of payload. </p>

<p>That's it. The next example walks you through setting a static configuration on you IronWorker upon upload</p>

<h2 id="#config-via-file">Set config variables on upload via .yml or .json</h2>

<p>First create a .yml or a .json file and save it within your worker directory or directory where you will be running your IronWorker commandline tools from ex: config.yml or config.json</p>

<figcaption><span>config.json </span></figcaption>

``` javascript
{ "MY_CONFIG_VARIABLE": 12345678901234567890,
  "MY_CONFIG_VARIABLE2": "ASDGFHJTHFVCBDXFGHSF",}
```

<figcaption><span>config.yml </span></figcaption>

``` yaml
"MY_CONFIG_VARIABLE": 12345678901234567890
"MY_CONFIG_VARIABLE2": "ASDGFHJTHFVCBDXFGHSF
```

<p>Next run your standard upload command</p>
```sh
iron_worker upload --worker-config config.yml
```
<p>and you should see in the upload logs that your configuration variables were uploaded with your worker</p>
<img src="/images/worker/reference/config-uploaded.png" alt="config-uploaded">

When your task is run, a file containing this configuration will be available to your worker and the location of this file will be provided via the program args right after `-config`. For example, to load your config with Ruby:

```ruby
require 'json'
config = {}
ARGV.each_with_index do |arg, i|
  if arg == "-config"
    config = JSON.parse(IO.read(ARGV[i+1]))
  end
end
```

<h2 id="#config-via-hud">Set config variables in the Iron.io HUD aka dashboard</h2>
<p>it is often times useful to change configuration variables without having to reupload your code. We allow you to do so visually with our HUD (dashboard) by following two simple steps.</p>

<p>Navigate to the hud <a href="http://hud.iron.io">http://hud.iron.io</a>. next navigate to your uploaded code's information by clicking on the code tab and your worker's name. NOTE: for those who remotely build their workers, please make sure you select your worker and not the remote build process</p>
<img src="/images/worker/reference/hud-view-code.png" alt="hud-view-code">
<p>Through your Worker Code's dashboard you have a useful box where you can change your configuration information in yml format! i.e Key seperated by a colon and the value without quotations and no commas delimiting the values.</p>
<img src="/images/worker/reference/hud-config-setup.png" alt="hud-config-setup">
<p>click <strong>edit</strong> and...voila! your worker now has updated configuration variables without having to reupload your worker or enter the commandline!</p>
