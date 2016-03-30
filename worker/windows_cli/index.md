---
title: Windows version of the IronWorker CLI
layout: default
section: worker
breadcrumbs:
  - ['CLI Tool', 'cli', 'Windows']
---

The Iron.io command line tool will help you interact with the IronWorker API to make creating workers easier.

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#installing">Installing</a></li>
    <li><a href="#path">Add the tool to Your Path</a></li>
    </ul>
</section>

<h2 id="installing">Installing</h2>

Head over to [https://github.com/iron-io/ironcli/releases](https://github.com/iron-io/ironcli/releases) and download the newest version of the cli. Execute the file and you will see a terminal flash in front of you momentarily and then disappear.

Open a new terminal and CD into the directory you’ve downloaded the executable to. From that directory, confirm the installation was successful by checking the version

```sh
ironcli.exe --version
```
<img style= "display: block; width: 645px; margin: 0 auto;"  src="/images/version.PNG" style=""/>

Now that it’s working, we need to add it to the $PATH so it can be used from anywhere.


<h2 id="path">Add the tool to Your Path</h2>

Go into your advanced settings and select environmental variables:
<img style= "display: block; width: 645px; margin: 0 auto;"  src="/images/settings.png" style=""/>


Locate the PATH variable in the System Variables section, and click edit. 
<img style= "display: block; width: 645px; margin: 0 auto;"  src="/images/findPath.png" style=""/>


From here, click new to add and add the path to the folder tha's holding ironcli.exe
<img style= "display: block; width: 645px; margin: 0 auto;"  src="/images/new.png" style=""/>


Finally, click OK on all of the open windows, and you’re all set. To confirm, open a new terminal and enter 
```sh
ironcli.exe --version
```
<img style= "display: block; width: 645px; margin: 0 auto;"  src="/images/works.PNG" style=""/>


Now you can follow along with all of the examples in the docs. 



