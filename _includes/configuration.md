<p>In the interest of letting users stop writing increasingly lengthy configuration files and start writing code, the maintainers of Iron.io's official client libraries have developed a global configuration scheme for all of Iron.io's services. This lets you set your project ID and token once to make them available to across all of Iron.io's services, and even across workspaces. The authors took care to provide a scheme that would allow users the flexibility to set a default, then override it at the service, workspace, or client level.</p>

<p>The two most common variables used in configuration are the <strong>project ID</strong> and the <strong>token</strong>. The <strong>project ID</strong> is a unique identifier for your project and can be found <a href="https://hud.iron.io">in the HUD</a>. The <strong>token</strong> is one of your OAuth2 tokens, which can be found <a href="https://hud.iron.io/tokens">on their own page</a> in the HUD.</p>

<h2>Quick Start</h2>

<p>Create a file called <span class="fixed-width">.iron.json</span> in your home directory (i.e., <span class="fixed-width">~/.iron.json</span>) and enter your Iron.io credentials:</p>

{% highlight js %}
{
    "token": "MY_TOKEN",
    "project_id": "MY_PROJECT_ID"
 }
{% endhighlight %}

<p>The project_id you use will be the default project to use. You can always override this in your code.</p>

<p>Alternatively, you can set the following environment variables:</p>

{% highlight bash %}
IRON_TOKEN=MY_TOKEN
IRON_PROJECT_ID=MY_PROJECT_ID
{% endhighlight %}

<p>That's it, now you can get started.</p>

<h2>About the Scheme</h2>

<p>The configuration scheme consists of three hierarchies: the file hierarchy, the JSON hierarchy, and the overall hierarchy. By understanding these three hierarchies and how clients determine the final configuration values, you can build a powerful system that saves you redundant configuration while allowing edge cases.</p>

<h3>The Overall Hierarchy</h3>

<p>The overall hierarchy is simple to understand: local takes precedence over global. The configuration is constructed as follows:</p>

<ul>
  <li>The global configuration file sets the defaults according to the file hierarchy.</li>
  <li>The global environment variables overwrite the global configuration file's values.</li>
  <li>The product-specific environment variables overwrite everything before them.</li>
  <li>The local configuration file overwrites everything before it according to the file hierarchy.</li>
  <li>The configuration file specified when instantiating the client library overwrites everything before it according to the file hierarchy.</li>
  <li>The arguments passed when instantiating the client library overwrite everything before them.</li>
</ul>

<h3>The Environment Variables</h3>

<p>The environment variables the scheme looks for are all of the same formula: the camel-cased product name is switched to an underscore ("IronWorker" becomes "iron_worker") and converted to be all capital letters. For the global environment variables, "IRON" is used by itself. The value being loaded is then joined by an underscore to the name, and again capitalised. For example, to retrieve the OAuth token, the client looks for "IRON_TOKEN".</p>

<p>In the case of product-specific variables (which override global variables), it would be "IRON_WORKER_TOKEN" (for IronWorker).</p>

<h3>The File Hierarchy</h3>

<p>The hierarchy of files is simple enough:</p>

<ol>
  <li>if a file named ".iron.json" exists in your home folder, that will provide the defaults.</li>
  <li>if an "iron.json" file exists in the same directory as the script being run, that will be used to <em>overwrite</em> the values from the ".iron.json" file in your home folder. Any values in "iron.json" that are not found in ".iron.json" will be added; any values in ".iron.json" that are not found in "iron.json" will be left alone; any values in ".iron.json" that are found in "iron.json" will be replaced with the values in "iron.json".</li>
</ol>

<p>This allows a lot of flexibility: you can specify a token that will be used globally (in ".iron.json"), then specify the project ID for each project in its own "iron.json" file. You can set a default project ID, but overwrite it for that one project that uses a different project ID.</p>

<h3>The JSON Hierarchy</h3>

<p>Each file consists of a single JSON object, potentially with many sub-objects. The JSON hierarchy works in a similar manner to the file hierarchy: the top level provides the defaults. If the top level contains a JSON object whose key is an Iron.io service ("iron_worker", "iron_mq", or "iron_cache"), that will be used to overwrite those defaults when one of their clients loads the config file.</p>

<p>This allows you to define a project ID once and have two of the services use it, but have the third use a different project ID.</p>

<h2>Example</h2>

<p>In the event that you wanted to set a token that would be used globally, you would set "~/.iron.json" to look like this:</p>

{% highlight js %}
{
  "token": "YOUR TOKEN HERE"
}
{% endhighlight %}

<p>To follow this up by setting your project ID for each project, you would create an "iron.json" file in each project's directory:</p>

{% highlight js %}
{
  "project_id": "PROJECT ID HERE"
}
{% endhighlight %}

<p>If, for one project, you want to use a different token, simply include it in that project's "iron.json" file:</p>

{% highlight js %}
{
  "project_id": "PROJECT ID HERE",
  "token": "YOUR TOKEN HERE"
}
{% endhighlight %}

<p>Now for that project <em>and that project only</em>, the new token will be used.</p>

<p>If you want all your IronCache projects to use a different project ID, you can put that in the "~/.iron.json" file:</p>

{% highlight js %}
{
  "project_id": "GLOBAL PROJECT ID",
  "iron_cache": {
    "project_id": "IRONCACHE ONLY PROJECT ID"
  }
}
{% endhighlight %}

<p>If you don't want to write things to disk or on Heroku or a similar platform that has integrated with Iron.io to provide your project ID and token automatically, the library will pick them up for you automatically.</p>

<h2>Accepted Values</h2>

<p>The configuration scheme looks for the following values:</p>

<ul>
  <li><strong>host</strong>: The domain name the API can be located at. Defaults to a product-specific value, but always using Amazon's cloud.</li>
  <li><strong>protocol</strong>: The protocol that will be used to communicate with the API. Defaults to "https", which should be sufficient for 99% of users.</li>
  <li><strong>port</strong>: The port to connect to the API through. Defaults to 443, which should be sufficient for 99% of users.</li>
  <li><strong>api_version</strong>: The version of the API to connect through. Defaults to the version supported by the client. End-users should probably never change this.</li>
  <li><strong>project_id</strong>: The ID of the project to use for requests.</li>
  <li><strong>token</strong>: The OAuth token that should be used to authenticate requests. Can be found <a href="https://hud.iron.io/tokens">in the HUD</a>.</li>
</ul>
