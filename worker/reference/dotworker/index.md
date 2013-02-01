---
title: .worker Files
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['.worker Files', 'dotworker']
---

We like to encourage our users to think of workers as independent chunks 
of functionality, reusable building blocks that they can then build an 
application out of. `.worker` (pronounced dotworker) files serve to reinforce this idea, by allowing users to define their workers outside of their application code.

`.worker` files are pretty easy to understand: their purpose is to construct 
the code packages that are uploaded to the IronWorker cloud. This is done 
in almost precisely the same way that code packages are constructed in 
scripts, but `.worker` files can be bundled with the workers and stored in 
their own git repository, or moved about without any worry that unnecessary 
code lingers in your application, cluttering it, or that you're missing 
code that it will take for your worker to run. Workers can finally be their 
own self-contained units.

## Making a Worker File

Writing a `.worker` file is simple: give it a recognisable name, then append 
".worker" to the end. For example: `hello.worker` will create a code package named "hello".

<div class="alert">
<p><strong>Note:</strong> You should never have a file named ".worker". They should always be given a unique, recognisable name: "helloworld.worker", "sendmail.worker", "dosomethingawesome.worker", etc.</p>
</div>

### Structure

The `.worker` file mirrors the code you would use to construct a package 
in your application. Here's a simple example:

<figcaption><span>.worker </span></figcaption>
{% highlight ruby %}
runtime "ruby"
exec "hello_worker.rb"
{% endhighlight %}

This `.worker` file defines a code package that consists of a single 
`hello_worker.rb` script, which is what will be executed when your worker 
is run.

You can also add the files your worker is dependent upon:

<figcaption><span>.worker </span></figcaption>
{% highlight ruby %}
runtime "ruby"
exec "hello_worker.rb"

file "dependency.rb"
file "config.json"
{% endhighlight %}

That worker will have access to the `dependency.rb` and `config.json` files 
after it's uploaded.

Everything you can do in your application to construct a code package, you 
can do in a `.worker` file. Here's an example that includes a gem:

<figcaption><span>.worker </span></figcaption>
{% highlight ruby %}
runtime "ruby"
exec "hello_worker.rb"

file "dependency.rb"
file "config.json"

gem "mongoid"
{% endhighlight %}

Not only will this worker have access to `dependency.rb` and `config.json`, 
it will have access to the `mongoid` gem, as well.

<div class="alert">
<p><strong>Note:</strong> Gems merged with the <span class="fixed-width">.worker</span> 
file will not be automatically required in your worker files, just as they 
are not when you merge gems in your application's code.</p>
</div>

## Syntax Reference

The following syntax is valid in `.worker` files:

<table class="reference">
  <tr>
    <th style="width: 10%;">Keyword</th>
    <th style="width: 10%;">Runtime</th>
    <th style="width: 40%;">Purpose</th>
    <th style="width: 40%;">Arguments</th>
  </tr>
  
  <tr id="syntax-name">
    <td>name</td>
    <td>all</td>
    <td>Set the worker's name</td>
    <td>The name to give the worker</td>
  </tr>

  <tr id="syntax-frb">
    <td>full_remote_build</td>
    <td>all</td>
    <td>Activates full remote build mode.</td>
    <td>true or false, defaults to false</td>
  </tr>
  
  <tr id="syntax-exec">
    <td>exec</td>
    <td>all</td>
    <td>Merge a file and designate it as the file to be executed when the 
        worker is run. <strong>You may only have one file designated as the 
        executable per worker.</strong></td>
    <td>
      <ol>
        <li>The path to the file</li>
        <li>The name to give the worker. Defaults to a camel-cased version 
            of the file name will be used. <strong>(optional)</strong></li>
      </ol>
    </td>
  </tr>

  <tr id="syntax-file">
    <td>file</td>
    <td>all</td>
    <td>Merge a file into the code package.</td>
    <td>
      <ol>
        <li>The path to the file</li>
        <li>The path the file should be stored under in the package. Defaults 
            to the root directory. <strong>(optional)</strong></li>
      </ol>
    </td>
  </tr>

  <tr id="syntax-dir">
    <td>dir</td>
    <td>all</td>
    <td>Merge an entire directory (and all its contents) into the code package.</td>
    <td>
      <ol>
        <li>The path to the directory</li>
        <li>The path the directory should be stored under in the package. 
            Defaults to the root directory. <strong>(optional)</strong></li>
      </ol>
    </td>
  </tr>

  <tr id="syntax-deb">
    <td>deb</td>
    <td>all</td>
    <td>Merge a x86_64 deb package into the code package. <strong>Note:</strong> dependencies
        will not be handled.</td>
    <td>
        The path to the deb file
    </td>
  </tr>

  <tr id="syntax-gem">
    <td>gem</td>
    <td>ruby</td>
    <td>Merge a gem with its dependencies. <strong>Note:</strong> binary 
        extensions will not be merged, as they are not supported.</td>
    <td>
      <ol>
        <li>The name of the gem to merge, as it appears in a 
            <span class="fixed-width">require</span> statement</li>
        <li>The version requirement for the gem. Defaults to ">= 0". 
            <strong>(optional)</strong></li>
      </ol>
    </td>
  </tr>

  <tr id="syntax-gemfile">
    <td>gemfile</td>
    <td>ruby</td>
    <td>Merge all the gems from the specified Gemfile.</td>
    <td>
      <ol>
        <li>The path to the Gemfile</li>
        <li>The groups to include in the merge. Defaults to the "default" group&mdash;the top level. 
            <strong>(optional)</strong>. Example:<br /><span class="fixed-width">gemfile 'Gemfile', 'default', 'othergroup'</span></li>
      </ol>
    </td>
  </tr>

  <tr id="syntax-jar">
    <td>jar</td>
    <td>java</td>
    <td>Merge a jar into code package. <strong>Note:</strong> it'll 
        be available in worker's classpath.</td>
    <td>
        The path to jar file
    </td>
  </tr>

  <tr id="syntax-pip">
    <td>pip</td>
    <td>python</td>
    <td>Merge a pip package with its dependencies.</td>
    <td>
      <ol>
        <li>The name of the pip package to merge.</li>
        <li>The version requirement for the pip package. Defaults to latest available at pypi.</li>
      </ol>
    </td>
  </tr>
</table>
