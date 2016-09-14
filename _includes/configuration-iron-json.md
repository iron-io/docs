<p>Many of the client libraries make use of a global configuration scheme for all of Iron.io services. This approach lets you set and manage your tokens and project IDs in a centralized manner and make them available across all of Iron.io's services, even across workspaces.</p>

<p>This scheme allows you to spend less time on configuration issues and more on writing code. It also supports the <a href="http://www.12factor.net/config" title="The Twelve Factor App" target="_blank">design pattern</a> that calls for strict separation of configuration information from application code.</p>

<p>The two most common variables used in configuration are the <strong>project ID</strong> and the <strong>token</strong>. The <strong>project ID</strong> is a unique identifier for your project and can be found <a href="https://hud.iron.io">in the HUD</a>. The <strong>token</strong> is one of your OAuth2 tokens, which can be found <a href="https://hud.iron.io/tokens">on their own page</a> in the HUD.</p>

<section id="toc">
  <h3>Table of Contents</h3> 
  <ul>
    <li><a href="#quick_start">Quick Start</a></li>
    <li>
      <a href="#about_the_scheme">About the Scheme</a>
      <ul>
        <li><a href="#the_overall_hierarchy">The Overall Hierarchy</a></li>
        <li><a href="#the_environment_variables">The Environment Variables</a></li>
        <li><a href="#the_file_hierarchy">The File Hierarchy</a></li>
        <li><a href="#the_json_hierarchy">The JSON Hierarchy</a></li>
      </ul>
    </li>
    <li><a href="#example">Example</a></li>
    <li><a href="#host_example">Setting Host Example</a></li>
    <li><a href="#accepted_values">Accepted Values</a></li>
  </ul>
</section>



<h2 id="quick_start">Quick Start</h2>

<p>Create a file called <span class="fixed-width">.iron.json</span> in your home directory (i.e., <span class="fixed-width">~/.iron.json</span>) and enter your Iron.io credentials:</p>

<figcaption><span>.iron.json </span></figcaption>
{% highlight js %}
{
    "token": "MY_TOKEN",
    "project_id": "MY_PROJECT_ID"
 }
{% endhighlight %}

<p>The <span class="fixed-width">project_id</span> you use will be the default project to use. You can always override this in your code.</p>

<p>Alternatively, you can set the following environment variables:</p>

{% highlight bash %}
IRON_TOKEN=MY_TOKEN
IRON_PROJECT_ID=MY_PROJECT_ID
{% endhighlight %}

<p>That's it, now you can get started.</p>

<h2 id="about_the_scheme">About the Scheme</h2>

<p>The configuration scheme consists of three hierarchies: the file hierarchy, the JSON hierarchy, and the overall hierarchy. By understanding these three hierarchies and how clients determine the final configuration values, you can build a powerful system that saves you redundant configuration while allowing edge cases.</p>

<h3 id="the_overall_hierarchy">The Overall Hierarchy</h3>

<p>The overall hierarchy is simple to understand: local takes precedence over global. The configuration is constructed as follows:</p>

<ul>
  <li>The global configuration file sets the defaults according to the file hierarchy.</li>
  <li>The global environment variables overwrite the global configuration file's values.</li>
  <li>The product-specific environment variables overwrite everything before them.</li>
  <li>The local configuration file overwrites everything before it according to the file hierarchy.</li>
  <li>The configuration file specified when instantiating the client library overwrites everything before it according to the file hierarchy.</li>
  <li>The arguments passed when instantiating the client library overwrite everything before them.</li>
</ul>

<h3 id="the_environment_variables">The Client's Environment Variables set in iron.json</h3>

<p>The environment variables the scheme looks for are all of the same formula: the camel-cased product name is switched to an underscore ("IronWorker" becomes "IRON_WORKER") and converted to be all capital letters. For the global environment variables, "IRON" is used by itself. The value being loaded is then joined by an underscore to the name, and again capitalised. For example, to retrieve the OAuth token, the client looks for "IRON_TOKEN".</p>

<p>In the case of product-specific variables (which override global variables), it would be "IRON_WORKER_TOKEN" (for IronWorker).</p>

<h3 id="accepted_values">Accepted Values</h3>

<p>The configuration scheme looks for the following values:</p>

<ul>
  <li><strong>project_id</strong>: The ID of the project to use for requests.</li>
  <li><strong>token</strong>: The OAuth token that should be used to authenticate requests. Can be found <a href="https://hud.iron.io/tokens">in the HUD</a>.</li>
  <li><strong>host</strong>: The domain name the API can be located at. Defaults to a product-specific value, but always using Amazon's cloud.</li>
  <li><strong>protocol</strong>: The protocol that will be used to communicate with the API. Defaults to "https", which should be sufficient for 99% of users.</li>
  <li><strong>port</strong>: The port to connect to the API through. Defaults to 443, which should be sufficient for 99% of users.</li>
  <li><strong>api_version</strong>: The version of the API to connect through. Defaults to the version supported by the client. End-users should probably never change this.</li>
</ul>

<p>Note that <strong>only</strong> the <span class="fixed-width">project_id</span> and <span class="fixed-width">token</span> values need to be set. They do not need to be set at <strong>every</strong> level of the configuration, but they must be set at least once by the levels that are used in any given configuration. It is recommended that you specify a default <span class="fixed-width">project_id</span> and <span class="fixed-width">token</span> in your <span class="fixed-width">iron.json</span> file.

<h3 id="the_file_hierarchy">The File Hierarchy</h3>

<p>The hierarchy of files is simple enough:</p>

<ol>
  <li>if a file named <span class="fixed-width">.iron.json</span> exists in your home folder, that will provide the defaults.</li>
  <li>if a file named <span class="fixed-width">iron.json</span> exists in the same directory as the script being run, that will be used to <em>overwrite</em> the values from the <span class="fixed-width">.iron.json</span> file in your home folder. Any values in <span class="fixed-width">iron.json</span> that are not found in <span class="fixed-width">.iron.json</span> will be added; any values in <span class="fixed-width">.iron.json</span> that are not found in <span class="fixed-width">iron.json</span> will be left alone; any values in <span class="fixed-width">.iron.json</span> that are found in <span class="fixed-width">iron.json</span> will be replaced with the values in <span class="fixed-width">iron.json</span>.</li>
</ol>

<p>This allows a lot of flexibility: you can specify a token that will be used globally (in <span class="fixed-width">.iron.json</span>), then specify the project ID for each project in its own <span class="fixed-width">iron.json</span> file. You can set a default project ID, but overwrite it for that one project that uses a different project ID.</p>

<h3 id="the_json_hierarchy">The JSON Hierarchy</h3>

<p>Each file consists of a single JSON object, potentially with many sub-objects. The JSON hierarchy works in a similar manner to the file hierarchy: the top level provides the defaults. If the top level contains a JSON object whose key is an Iron.io service (<span class="fixed-width">iron_worker</span>, <span class="fixed-width">iron_mq</span>, or <span class="fixed-width">iron_cache</span>), that will be used to overwrite those defaults when one of their clients loads the config file.</p>

<p>This allows you to define a project ID once and have two of the services use it, but have the third use a different project ID.</p>

<h2 id="example">Example</h2>

<p>In the event that you wanted to set a token that would be used globally, you would set <span class="fixed-width">~/.iron.json</span> to look like this:</p>

<figcaption><span>.iron.json </span></figcaption>
{% highlight js %}
{
  "token": "YOUR TOKEN HERE"
}
{% endhighlight %}

<p>To follow this up by setting your project ID for each project, you would create an <span class="fixed-width">iron.json</span> file in each project's directory:</p>

<figcaption><span>iron.json </span></figcaption>
{% highlight js %}
{
  "project_id": "PROJECT ID HERE"
}
{% endhighlight %}

<p>If, for one project, you want to use a different token, simply include it in that project's <span class="fixed-width">iron.json</span> file:</p>

<figcaption><span>iron.json </span></figcaption>
{% highlight js %}
{
  "project_id": "PROJECT ID HERE",
  "token": "YOUR TOKEN HERE"
}
{% endhighlight %}

<p>Now for that project <em>and that project only</em>, the new token will be used.</p>

<p>If you want all your IronCache projects to use a different project ID, you can put that in the <span class="fixed-width">~/.iron.json</span> file:</p>

<figcaption><span>.iron.json </span></figcaption>
{% highlight js %}
{
  "project_id": "GLOBAL PROJECT ID",
  "iron_cache": {
    "project_id": "IRONCACHE ONLY PROJECT ID"
  }
}
{% endhighlight %}

<p>If you don't want to write things to disk or on Heroku or a similar platform that has integrated with Iron.io to provide your project ID and token automatically, the library will pick them up for you automatically.</p>

<h2 id="host_example">Setting Host</h2>
It is useful to quickly change your host in cases where your region has gone down.
<p>If want to set the Host, Post, and Protocol specifically, simply include those keys in that project's <span class="fixed-width">iron.json</span> file:</p>

<figcaption><span>iron.json </span></figcaption>
{% highlight json %}
{
  "project_id": "PROJECT ID HERE",
  "token": "YOUR TOKEN HERE",
  "port":443,
  "protocol": "https",
  "scheme":"mq-rackspace-ord.iron.io"
}
{% endhighlight %}
