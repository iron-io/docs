---
permalink: /articles/configuration
title: Configuring the Official Client Libraries
categories:
  - articles
breadcrumbs:
  - ['Articles', '/articles']
  - ['Library Configuration', '/configuration']
layout: post
section: overview
---

# {{ page.title }}

In the interest of letting users stop writing increasingly lengthy configuration 
files and start writing code, the maintainers of Iron.io's official client 
libraries have developed a global configuration scheme for all of Iron.io's 
services. This lets you set your project ID and token once to make them 
available to across all of Iron.io's services, and even across workspaces. 
The authors took care to provide a scheme that would allow users the 
flexibility to set a default, then override it at the service, workspace, 
or client level.

## Quick Start

If you just want to get started quickly, here's the section for you.

Create a file called `.iron.json` in your home directory (ie: `~/.iron.json`) and enter your Iron.io credentials:

<div >
{% highlight js %}
{
    "token": "MY_TOKEN",
    "project_id": "MY_PROJECT_ID"
 }
{% endhighlight %}
</div>

The project_id you use will be the default project to use. You can always override this in your code.

Alternatively, you can set the following environment variables:

{% highlight bash %}
IRON_TOKEN=MY_TOKEN
IRON_PROJECT_ID=MY_PROJECT_ID
{% endhighlight %}

That's it, now you can get started.

Keep reading for full details about configuration.

## About the Scheme

The configuration scheme consists of three hierarchies: the file hierarchy, 
the JSON hierarchy, and the overall hierarchy. By understanding these three 
hierarchies and how clients determine the final configuration values, you 
can build a powerful system that saves you redundant configuration while 
allowing edge cases.

### The Overall Hierarchy

The overall hierarchy is simple to understand: local takes precedence 
over global. The configuration is constructed as follows:

* The global configuration file sets the defaults according to the file 
  hierarchy.
* The global environment variables overwrite the global configuration file's 
  values.
* The product-specific environment variables overwrite everything before 
  them.
* The local configuration file overwrites everything before it according 
  to the file hierarchy.
* The configuration file specified when instantiating the client library 
  overwrites everything before it according to the file hierarchy.
* The arguments passed when instantiating the client library overwrite 
  everything before them.

### The Environment Variables

The environment variables the scheme looks for are all of the same formula: 
the camel-cased product name is switched to an underscore ("IronWorker" 
becomes "iron_worker") and converted to be all capital letters. For the 
global environment variables, "IRON" is used by itself. The value being 
loaded is then joined by an underscore to the name, and again capitalised. 
For example, to retrieve the OAuth token, the client looks for "IRON_TOKEN". 
In the case of product-specific variables (which override global variables), 
it would be "IRON_WORKER_TOKEN" (for IronWorker).

### The File Hierarchy

The hierarchy of files is simple enough: if a file named ".iron.json" 
exists in your home folder, that will provide the defaults. In addition, 
if an "iron.json" file exists in the same directory as the script being 
run, that will be used to *overwrite* the values from the ".iron.json" 
file in your home folder. Any values in "iron.json" that are not found 
in ".iron.json" will be added; any values in ".iron.json" that are not 
found in "iron.json" will be left alone; any values in ".iron.json" that 
are found in "iron.json" will be replaced with the values in "iron.json".

This allows a lot of flexibility: you can specify a token that will be 
used globally (in ".iron.json"), then specify the project ID for each 
project in its own "iron.json" file. You can set a default project ID, 
but overwrite it for that one project that uses a different project ID.

### The JSON Hierarchy

Each file consists of a single JSON object, potentially with many sub-objects. 
The JSON hierarchy works in a similar manner to the file hierarchy: the 
top level provides the defaults. If the top level contains a JSON object 
whose key is an Iron.io service ("iron_worker", "iron_mq", or "iron_cache"), 
that will be used to overwrite those defaults when one of their clients 
loads the config file.

This allows you to define a project ID once and have two of the services 
use it, but have the third use a different project ID.

## Example

In the event that you wanted to set a token that would be used globally, 
you would set "~/.iron.json" to look like this:

{% highlight js %}
{
  "token": "YOUR TOKEN HERE"
}
{% endhighlight %}

To follow this up by setting your project ID for each project, you would 
create an "iron.json" file in each project's directory:

{% highlight js %}
{
  "project_id": "PROJECT ID HERE"
}
{% endhighlight %}

If, for one project, you want to use a different token, simply include it 
in that project's "iron.json" file:

{% highlight js %}
{
  "project_id": "PROJECT ID HERE",
  "token": "YOUR TOKEN HERE"
}
{% endhighlight %}

Now for that project *and that project only*, the new token will be used.

If you want all your IronCache projects to use a different project ID, you 
can put that in the "~/.iron.json" file:

{% highlight js %}
{
  "project_id": "GLOBAL PROJECT ID",
  "iron_cache": {
    "project_id": "IRONCACHE ONLY PROJECT ID"
  }
}
{% endhighlight %}

If you don't want to write things to disk or on Heroku or a similar platform 
that has integrated with Iron.io to provide your project ID and token 
automatically, the library will pick them up for you automatically.

## Accepted Values

The configuration scheme looks for the following values:

* **host**: The domain name the API can be located at. Defaults to a 
  product-specific value, but always using Amazon's cloud.
* **protocol**: The protocol that will be used to communicate with the API. 
  Defaults to "https", which should be sufficient for 99% of users.
* **port**: The port to connect to the API through. Defaults to 443, which 
  should be sufficient for 99% of users.
* **api_version**: The version of the API to connect through. Defaults to 
  the version supported by the client. End-users should probably never 
  change this.
* **project_id**: The ID of the project to use for requests.
* **token**: The OAuth token that should be used to authenticate requests. 
  Can be found [in the HUD](https://hud.iron.io/tokens).
