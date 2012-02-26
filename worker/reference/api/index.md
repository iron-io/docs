---
title: IronWorker HTTP API
layout: default
section: worker
---

<style type="text/css">
table.reference {
font-size: small;
width: 100%;
}

table.reference td {
padding: 2px 7px;
text-align: left;
}

table.reference th {
text-align: left;
border-bottom: 1px solid #000;
}

.variable.project_id {
color: red;
}

.variable.code_id, .variable.schedule_id, .variable.task_id {
color: blue;
}

h4 {
padding: 5px 0px 0px 0px !important;
margin-bottom: -10px !important;
}

h3 {
padding: 5px 0px;
margin: 0px;
}
</style>

IronWorker provides a RESTful HTTP API to allow you to interact programmatically with our service and your workers.

## Endpoints

### Code Packages

<table class="reference">
<tr><th style="width: 55%;">URL</th><th style="width: 11%;">HTTP Verb</th><th style="width: 34%;">Purpose</th></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/codes</td><td>GET</td><td><a href="#list_code_packages" title="List Code Packages">List Code Packages</a></td></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/codes</td><td>POST</td><td><a href="#upload_a_code_package" title="Upload a Code Package">Upload a Code Package</a></td></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/codes/<span class="code_id variable">{Code ID}</span></td><td>GET</td><td><a href="#get_info_about_a_code_package" title="Get Info About a Code Package">Get Info About A Code Package</a></td></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/codes/<span class="code_id variable">{Code ID}</span></td><td>DELETE</td><td><a href="#delete_a_code_package" title="Delete a Code Package">Delete a Code Package</a></td></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/codes/<span class="code_id variable">{Code ID}</span>/download</td><td>GET</td><td><a href="#download_a_code_package" title="Download a Code Package">Download a Code Package</a></td></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/codes/<span class="code_id variable">{Code ID}</span>/revisions</td><td>GET</td><td><a href="#list_code_package_revisions" title="List Code Package Revisions">List Code Package Revisions</a></td></tr>
</table>

### Tasks

<table class="reference">
<tr><th style="width: 55%;">URL</th><th style="width: 11%;">HTTP Verb</th><th style="width: 34%;">Purpose</th></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/tasks</td><td>GET</td><td><a href="#list_tasks" title="List Tasks">List Tasks</a></td></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/tasks</td><td>POST</td><td><a href="#queue_a_task" title="Queue a Task">Queue a Task</a></td></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/tasks/webhook</td><td>POST</td><td><a href="#queue_a_task_from_webhook" title="Queue a Task from Webhook">Queue a Task from Webhook</a></td></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/tasks/<span class="task_id variable">{Task ID}</span></td><td>GET</td><td><a href="#get_info_about_a_task" title="Get Info About a Task">Get Info About a Task</a></td></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/tasks/<span class="task_id variable">{Task ID}</span>/log</td><td>GET</td><td><a href="#get_a_tasks_log" title="Get a Task's Log">Get a Task's Log</a></td></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/tasks/<span class="task_id variable">{Task ID}</span>/cancel</td><td>POST</td><td><a href="#cancel_a_task" title="Cancel a Task">Cancel a Task</a></td></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/tasks/<span class="task_id variable">{Task ID}</span>/progress</td><td>POST</td><td><a href="#set_a_tasks_progress" title="Set a Task's Progress">Set a Task's Progress</a></td></tr>
</table>

### Scheduled Tasks

<table class="reference" style="padding-bottom: 20px;">
<tr><th style="width: 55%;">URL</th><th style="width: 11%;">HTTP Verb</th><th style="width: 34%;">Purpose</th></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/schedules</td><td>GET</td><td><a href="#list_scheduled_tasks" title="List Scheduled Tasks">List Scheduled Tasks</a></td></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/schedules</td><td>POST</td><td><a href="#schedule_a_task" title="Schedule a Task">Schedule a Task</a></td></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/schedules/<span class="schedule_id variable">{Schedule ID}</span></td><td>GET</td><td><a href="#get_info_about_a_scheduled_task" title="Get Info About a Scheduled Task">Get Info About a Scheduled Task</a></td></tr>
<tr><td>/projects/<span class="project_id variable">{Project ID}</span>/schedules/<span class="schedule_id variable">{Schedule ID}</span>/cancel</td><td>POST</td><td><a href="#cancel_a_scheduled_task" title="Cancel a Scheduled Task">Cancel a Scheduled Task</a></td></tr>
</table>

## Authentication

IronWorker uses OAuth2 tokens to authenticate API requests. You can find (and create) your API tokens [in the HUD](https://hud.iron.io/tokens).

To authenticate your request, you should include a token in the Authorization header for your request or in your query parameters. Tokens are universal, and can be used across services.

Note that each request also requires a Project ID to specify which project the action will be performed on. You can find your Project IDs [in the HUD](https://hud.iron.io). Project IDs are also universal, so they can be used across services, as well.

**Example Authorization Header**:  
Authorization: OAuth <span class="variable token">{Your Token Here}</span>

**Example Query with Parameters**:  
GET https://<span class="variable host">worker-aws-us-east-1</span>.iron.io/2/projects/<span class="variable project_id">{Project ID}</span>/tasks?oauth=<span class="variable token">{Token}</span>

## Requests

Requests to the API are simple HTTP requests against the API endpoints.

Unless otherwise noted, all requests should use the following headers (in addition to their authentication):
- Accept : application/json
- Accept-Encoding : gzip/deflate

Furthermore, all requests are limited to 64KB in size, unless otherwise noted.

## Responses

All responses are in JSON with a Content-Type of “application/json”. Your requests should all contain an “Accept: application/json” header to accommodate the responses.

### Status Codes

The success failure for request is indicated by an HTTP status code. A 200 status code indicates success, whereas a 4xx status code indicates an error.

<table class="reference">
<tr><th style="width: 10%">Code</th><th style="width: 90%">Status</th></tr>
<tr><td>200</td><td>Success</td></tr>
<tr><td>401</td><td>Invalid authentication: The OAuth token is either not provided or invalid.</td></tr>
<tr><td>404</td><td>Invalid endpoint: The resource, project, or endpoint being requested doesn’t exist.</td></tr>
<tr><td>405</td><td>Invalid HTTP method: A GET, POST, DELETE, or PUT was sent to an endpoint that doesn’t support that particular verb.</td></tr>
<tr><td>406</td><td>Invalid request: Required fields are missing.</td></tr>
</table>

### Errors
In the event of an error, The appropriate status code will be returned with a body containing more information. An error response is structured as follows:

{% highlight js %}
{
    "msg": "reason for error"
}
{% endhighlight %}

### Dates and Times

All dates, times, and timestamps will use the [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) / [RFC 3339](http://www.ietf.org/rfc/rfc3339.txt) format.

## Code Packages

Your workers are run against code packages that can be updated and deleted over time. The code packages define the functionality a worker has through the code they contain. Put simply, code packages are simply the code that will run when your worker runs.

### List Code Packages

#### Endpoint

GET /projects/<span class="variable project_id">{Project ID}</span>/codes

#### URL Parameters

* **Project ID**: The ID of the project whose code packages you want to get a list of.

#### Optional URL Parameters

* **page**: The page of code packages you want to retrieve, starting from 0. Default is 0, maximum is 100.
* **per_page**: The number of code packages to return per page. Note this is a maximum value, so there may be fewer packages returned if there aren’t enough results. Default is 30, maximum is 100.

#### Response

The response will be a JSON object. The “codes” property will contain a JSON array of objects, each representing a code package.

Sample:  
{% highlight js %}
{
    "codes": [
        {
            "id": "4ea9c05dcddb131f1a000002",
            “Timestamper” : {
                “created_at”: 1328732329979000000,
                “updated_at”: 1328732360000000000
            },
            "project_id": "4ea9c05dcddb131f1a000001",
            "name": "MyWorker",
            "runtime": "ruby",
            “latest_checksum”: "b4781a30fc3bd54e16b55d283588055a",
            "rev": 1,
            “latest_history_id”: "4f32ecb4f840063758022153",
            “latest_change”: 1328737460598000000
        }
    ]
}
{% endhighlight %}

### Upload a Code Package

#### Endpoint

POST /projects/<span class="variable project_id">{Project ID}</span>/codes

#### URL Parameters

* **Project ID**: The ID of the project that you are uploading the code to.

#### Request

The request should be JSON-encoded and contain the following information:

* **name**: A unique name for your worker. This will be used to assign tasks to the worker as well as to update the code. If a worker with this name already exists, the code you are uploading will be added as a new revision.
* **file**: A multipart-encoded string containing the zip file you are uploading.
* **file_name**: The name of the file within the zip that will be executed when a task is run.
* **runtime**: The language to execute your worker with. The following values are valid:
  * ruby
  * python
  * php


Your request also needs the following headers, in addition to the headers required by all API calls:

* **Content-Length**: The number of bytes in your JSON-encoded request body
* **Content-Type**: Should be set to “multipart/form-data ; boundary={Insert Value Here}” with boundary set to [an appropriate value](http://en.wikipedia.org/wiki/MIME#Multipart_messages).

**Note**: This request is not limited to 64 KB, unlike other requests.

**Sample Headers**:  
Content-Length: 3119  
Content-Type: multipart/form-data; boundary=39f5903459794ad483153244cc6486ec

**Sample Body**:
--39f5903459794ad483153244cc6486ec  
Content-Disposition: form-data; name="data"  
Content-Type: text/plain; charset=utf-8  
{% highlight js %}
{
    "file_name": "MyWorker.rb",
    "name": "MyWorker",
    "runtime": "ruby"
}{% endhighlight %}
--39f5903459794ad483153244cc6486ec  
Content-Disposition: form-data; name="file"; filename="MyWorker.zip"  
Content-Type: application/zip  

{ Form-encoded zip data goes here }
	
--39f5903459794ad483153244cc6486ec--

#### Response

The response will be a JSON object containing a “msg” property that contains a description of the response.

Sample:
{% highlight js %}
{
    "msg": "Upload successful."
}
{% endhighlight %}

### Get Info About a Code Package

#### Endpoint

GET /projects/<span class="variable project_id">{Project ID}</span>/codes/<span class="variable code_id">{Code ID}</span>

#### URL Parameters

* **Project ID**: The ID of the project that the code package belongs to.
* **Code ID**: The ID of the code package you want details on.

#### Response

The response will be a JSON object containing the details of the code package.

Sample:  
{% highlight js %}
{
    "id": "4eb1b241cddb13606500000b",
    “Timestamper”: {
        “created_at”: 1328732616171000000,
        “updated_at”: 1328737460598000000,
    },
    "project_id": "4eb1b240cddb13606500000a",
    "name": "MyWorker",
    "runtime": "ruby",
    “latest_checksum”: "a0702e9e9a84b758850d19ddd997cf4a",
    "rev": 1,
    "latest_history_id": "4eb1b241cddb13606500000c",
    "latest_change": 1328737460598000000
}
{% endhighlight %}

### Delete a Code Package

#### Endpoint

DELETE /projects/<span class="variable project_id">{Project ID}</span>/codes/<span class="variable code_id">{Code ID}</span>

#### URL Parameters

* **Project ID**: The ID of the project that the code package belongs to.
* **Code ID**: The ID of the code package you want to delete.

#### Response

The response will be a JSON object containing a message property explaining whether the request was successful or not.

Sample:  
{% highlight js %}
{
    "msg":"Deleted"
}
{% endhighlight %}

### Download a Code Package

#### Endpoint

GET /projects/<span class="variable project_id">{Project ID}</span>/codes/<span class="variable code_id">{Code ID}</span>/download

#### URL Parameters

* **Project ID**: The ID of the project that the task belongs to.
* **Code Package ID**: The ID of the task you want details on.

#### Optional URL Parameters

* **revision**: The revision of the code package you want to download. If not specified, the latest revision will be downloaded.

#### Response

The response will be a zip file containing your code package. The response header will include a Content-Disposition header containing “filename=yourworker_rev.zip”, where yourworker is the code package’s name and rev is the numeric revision. The response’s Content-Type will be “application/zip”.

### List Code Package Revisions

#### Endpoint

GET /projects/<span class="variable project_id">{Project ID}</span>/codes/<span class="variable code_id">{Code ID}</span>/revisions

#### URL Parameters

* **Project ID**: The ID of the project that the task belongs to.
* **Code Package ID**: The ID of the code package whose revisions you’re retrieving.

#### Optional URL Parameters

* **page**: The page of revisions you want to retrieve, starting from 0. Default is 0, maximum is 100.
* **per_page**: The number of revisions to return per page. Note this is a maximum value, so there may be less revisions returned if there aren’t enough results. Default is 30, maximum is 100.

#### Response

The response will be a JSON object with a revisions property, containing a list of JSON objects, each representing a revision to the code package.

Sample:  
{% highlight js %}
{
    "revisions": [
        {
            "id": "4f32d9c81cf75447be020ea6",
            "Timestamper": {
                "created_at": 1328732616223000000,
                "updated_at":1328732621000000000
            },
            "code_id": "4f32d9c81cf75447be020ea5",
            "project_id": "4f32d521519cb67829000390",
            "rev": 1,
            "runtime": "ruby",
            "name": "MyWorker",
            "file_name": "worker.rb",
            "last_email": 1328732621000000000
        },
        {
            "id": "4f32da021cf75447be020ea8",
            "Timestamper": {
                "created_at": 1328732674478000000,
                "updated_at": 1328732680000000000
            },
            "code_id": "4f32d9c81cf75447be020ea5",
            "project_id": "4f32d521519cb67829000390",
            "rev": 2,
            "runtime": "ruby”,
            "name": "MyWorker",
            "file_name": "worker.rb",
            "last_email": 1328732680000000000
        }
    ]
}
{% endhighlight %}
