<p>Many of the client libraries make use of a global configuration scheme for all of Iron.io services. This approach lets you set and manage your tokens and project IDs in a centralized manner and make them available across all of Iron.io's services, even across workspaces.</p>

<p>This scheme allows you to spend less time on configuration issues and more on writing code. It also supports the <a href="http://www.12factor.net/config" title="The Twelve Factor App" target="_blank">design pattern</a> that calls for strict separation of configuration information from application code.</p>

<p>The two most common variables used in configuration are the <strong>project ID</strong> and the <strong>token</strong>. The <strong>project ID</strong> is a unique identifier for your project and can be found <a href="https://hud.iron.io">in the HUD</a>. The <strong>token</strong> is one of your OAuth2 tokens, which can be found <a href="https://hud.iron.io/tokens">on their own page</a> in the HUD.</p>

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#quick_start">Quick Start</a></li>
    <li><a href="#the_environment_variables">The Environment Variables</a></li>
    <li><a href="#using_iron_json">Configuration using iron.json</a></li>
  </ul>
</section>



<h2 id="quick_start">Quick Start</h2>

<p>Set the following environment variables:</p>

{% highlight bash %}
IRON_TOKEN=MY_TOKEN
IRON_PROJECT_ID=MY_PROJECT_ID
{% endhighlight %}

<p>The <span class="fixed-width">IRON_PROJECT_ID</span> you use will be the default project to use. You can always override this in your code.</p>
<p>That's it, now you can get started.</p>

<h2 id="the_environment_variables">The Client's Environment Variables</h2>

<p>The environment variables the scheme looks for are all of the same formula: the camel-cased product name is switched to an underscore ("IronWorker" becomes "IRON_WORKER") and converted to be all capital letters. For the global environment variables, "IRON" is used by itself. The value being loaded is then joined by an underscore to the name, and again capitalised. For example, to retrieve the OAuth token, the client looks for "IRON_TOKEN".</p>

<p>In the case of product-specific variables (which override global variables), it would be "IRON_WORKER_TOKEN" (for IronWorker).</p>

<h2 id="using_iron_json">Configuration using iron.json</h2>

You can follow the <a href="/worker/reference/configuration-iron-json/index.html">configuration scheme</a> and set project_id, token and other parameters in iron.json file but using only environment variables is preferred.
