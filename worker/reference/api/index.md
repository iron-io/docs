---
title: IronWorker REST/HTTP API
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['REST/HTTP API', '/api']
---

# IronWorker REST/HTTP API

IronWorker provides a RESTful HTTP API to allow you to interact programmatically with our service and your workers.

## Endpoints

### Code Packages

<table class="reference">
    <thead>
        <tr>
            <th style="width: 55%;">URL</th>
            <th style="width: 11%;">HTTP Verb</th>
            <th style="width: 34%;">Purpose</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/codes</td>
            <td>GET</td>
            <td><a href="#list_code_packages" title="List Code Packages">List Code Packages</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/codes</td>
            <td>POST</td>
            <td><a href="#upload_a_code_package" title="Upload a Code Package">Upload a Code Package</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/codes/<span class="code_id variable">{Code ID}</span></td><td>GET</td><td><a href="#get_info_about_a_code_package" title="Get Info About a Code Package">Get Info About A Code Package</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/codes/<span class="code_id variable">{Code ID}</span></td><td>DELETE</td><td><a href="#delete_a_code_package" title="Delete a Code Package">Delete a Code Package</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/codes/<span class="code_id variable">{Code ID}</span>/download</td><td>GET</td><td><a href="#download_a_code_package" title="Download a Code Package">Download a Code Package</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/codes/<span class="code_id variable">{Code ID}</span>/revisions</td><td>GET</td><td><a href="#list_code_package_revisions" title="List Code Package Revisions">List Code Package Revisions</a></td>
        </tr>
    </tbody>
</table>

### Tasks

<table class="reference">
    <thead>
        <tr>
            <th style="width: 55%;">URL</th><th style="width: 11%;">HTTP Verb</th><th style="width: 34%;">Purpose</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/tasks</td><td>GET</td><td><a href="#list_tasks" title="List Tasks">List Tasks</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/tasks</td><td>POST</td><td><a href="#queue_a_task" title="Queue a Task">Queue a Task</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/tasks/webhook</td><td>POST</td><td><a href="#queue_a_task_from_a_webhook" title="Queue a Task from a Webhook">Queue a Task from a Webhook</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/tasks/<span class="task_id variable">{Task ID}</span></td><td>GET</td><td><a href="#get_info_about_a_task" title="Get Info About a Task">Get Info About a Task</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/tasks/<span class="task_id variable">{Task ID}</span>/log</td><td>GET</td><td><a href="#get_a_tasks_log" title="Get a Task's Log">Get a Task's Log</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/tasks/<span class="task_id variable">{Task ID}</span>/cancel</td><td>POST</td><td><a href="#cancel_a_task" title="Cancel a Task">Cancel a Task</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/tasks/<span class="task_id variable">{Task ID}</span>/progress</td><td>POST</td><td><a href="#set_a_tasks_progress" title="Set a Task's Progress">Set a Task's Progress</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/tasks/<span class="task_id variable">{Task ID}</span>/retry</td><td>POST</td><td><a href="#retry_a_task" title="Retry a Task">Retry a Task</a></td>
        </tr>
    </tbody>
</table>

### Scheduled Tasks

<table class="reference" style="padding-bottom: 20px;">
    <thead>
        <tr>
            <th style="width: 55%;">URL</th><th style="width: 11%;">HTTP Verb</th><th style="width: 34%;">Purpose</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/schedules</td><td>GET</td><td><a href="#list_scheduled_tasks" title="List Scheduled Tasks">List Scheduled Tasks</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/schedules</td><td>POST</td><td><a href="#schedule_a_task" title="Schedule a Task">Schedule a Task</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/schedules/<span class="schedule_id variable">{Schedule ID}</span></td><td>GET</td><td><a href="#get_info_about_a_scheduled_task" title="Get Info About a Scheduled Task">Get Info About a Scheduled Task</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/schedules/<span class="schedule_id variable">{Schedule ID}</span>/cancel</td><td>POST</td><td><a href="#cancel_a_scheduled_task" title="Cancel a Scheduled Task">Cancel a Scheduled Task</a></td>
        </tr>
    </tbody>
</table>

## Authentication

IronWorker uses OAuth2 tokens to authenticate API requests. You can find and create your API tokens [in the HUD](https://hud.iron.io/tokens). To authenticate your request, you should include a token in the Authorization header for your request or in your query parameters. Tokens are universal, and can be used across services.

Note that each request also requires a Project ID to specify which project the action will be performed on. You can find your Project IDs [in the HUD](https://hud.iron.io). Project IDs are also universal, so they can be used across services as well.

**Example Authorization Header**:  
Authorization: OAuth abc4c7c627376858

**Example Query with Parameters**:  
GET https://<span class="variable host">worker-aws-us-east-1</span>.iron.io/2/projects/<span class="variable project_id">{Project ID}</span>/tasks?oauth=abc4c7c627376858

**Note**: Be sure you have the correct case: it's **OAuth**, not Oauth.

## Requests

Requests to the API are simple HTTP requests against the API endpoints.

All request bodies should be in JSON format.

Unless otherwise noted, all requests should use the following headers (in addition to their authentication):  
\- Accept : application/json  
\- Accept-Encoding : gzip/deflate  
\- Content-Type : application/json

### Base URL

All endpoints should be prefixed with the following:

https://<span class="variable domain">{Domain}</span>.iron.io/<span class="variable version">2</span>

The domains for the clouds IronWorker supports are as follows:
<table class="reference">
  <thead>
    <tr><th style="width: 30%;">Cloud</th><th style="width: 70%;"><span class="variable domain">{Domain}</span></th></tr>
  </thead>
  <tbody>
    <tr><td>AWS</td><td>worker-aws-us-east-1</td></tr>
  </tbody>
</table>


### Pagination

For endpoints that return lists/arrays of values:

* page - The page of results to return. Default is 0. Maximum is 100.
* per_page - The number of results to return. It may be less if there aren't enough results. Default is 30. Maximum is 100. 

## Responses

All responses are in JSON with a Content-Type of `application/json`. Your requests should all contain an `Accept: application/json` header to accommodate the responses.

### Status Codes

The success failure for request is indicated by an HTTP status code. A 2xx status code indicates success, whereas a 4xx status code indicates an error.

<table class="reference">
    <thead>
        <tr>
            <th style="width: 10%">Code</th><th style="width: 90%">Status</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>200</td><td>Success</td>
        </tr>
        <tr>
            <td>401</td><td>Invalid authentication: The OAuth token is either not provided or invalid.</td>
        </tr>
        <tr>
            <td>404</td><td>Invalid endpoint: The resource, project, or endpoint being requested doesn’t exist.</td>
        </tr>
        <tr>
            <td>405</td><td>Invalid HTTP method: A GET, POST, DELETE, or PUT was sent to an endpoint that doesn’t support that particular verb.</td>
        </tr>
        <tr>
            <td>406</td><td>Invalid request: Required fields are missing.</td>
        </tr>
    </tbody>
</table>

### Errors
In the event of an error, the appropriate status code will be returned with a body containing more information. An error response is structured as follows:

{% highlight js %}
{
    "msg": "reason for error"
}
{% endhighlight %}

#### Exponential Backoff

When a 503 error code is returned, it signifies that the server is currently unavailable. This means there was a problem processing the request on the server-side; it makes no comment on the validity of the request. Libraries and clients should use [exponential backoff](http://en.wikipedia.org/wiki/Exponential_backoff) when confronted with a 503 error, retrying their request with increasing delays until it succeeds or a maximum number of retries (configured by the client) has been reached.

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

The response will be a JSON object. The "codes" property will contain a JSON array of objects, each representing a code package.

Sample:  
{% highlight js %}
{
    "codes": [
        {
            "id": "4ea9c05dcddb131f1a000002",
            "project_id": "4ea9c05dcddb131f1a000001",
            "name": "MyWorker",
            "runtime": "ruby",
            "latest_checksum": "b4781a30fc3bd54e16b55d283588055a",
            "rev": 1,
            "latest_history_id": "4f32ecb4f840063758022153",
            "latest_change": 1328737460598000000
        }
    ]
}
{% endhighlight %}

### Upload a Code Package

You will almost always want to use our [Command Line Interface](/worker/reference/cli/) to make uploading easier.

#### Building a Code Package

If your client doesn't support uploading code packages and you don't want to use the [CLI](/worker/reference/cli), you're going to need to build the code package yourself before uploading it.

Code should be submitted as a zip file containing all of the files your project needs. That includes dependencies, libraries, data files... everything.

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
  * sh
  * ruby
  * python
  * php

The request also accepts the following optional parameters:

* **max_concurrency**: The maximum number of workers that should be run in parallel. This is useful for keeping your workers from hitting API quotas or overloading databases that are not prepared to handle the highly-concurrent worker environment. If omitted, there will be no limit on the number of concurrent workers.
* **retries**: The maximum number of times failed tasks should be retried, in the event that there's an error while running them. If omitted, tasks will not be retried. Tasks cannot be retried more than ten times.
* **retries_delay**: The number of seconds to wait before retries. If omitted, tasks will be immediately retried.

Your request also needs the following headers, in addition to the headers required by all API calls:

* **Content-Length**: The number of bytes in your JSON-encoded request body
* **Content-Type**: Should be set to "multipart/form-data ; boundary={Insert Value Here}" with boundary set to [an appropriate value](http://en.wikipedia.org/wiki/MIME#Multipart_messages).

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
    "runtime": "ruby",
    "max_concurrency": 12
}{% endhighlight %}
--39f5903459794ad483153244cc6486ec  
Content-Disposition: form-data; name="file"; filename="MyWorker.zip"  
Content-Type: application/zip  

{ Form-encoded zip data goes here }
    
--39f5903459794ad483153244cc6486ec--

#### Response

The response will be a JSON object containing a "msg" property that contains a description of the response.

Sample:
{% highlight js %}
{
    "msg": "Upload successful."
}
{% endhighlight %}

### Get Info About a Code Package

#### Endpoint

<div class="grey-box">
    GET /projects/<span class="variable project_id">{Project ID}</span>/codes/<span class="variable code_id">{Code ID}</span>
</div>

#### URL Parameters

* **Project ID**: The ID of the project that the code package belongs to.
* **Code ID**: The ID of the code package you want details on.

#### Response

The response will be a JSON object containing the details of the code package.

Sample:  
{% highlight js %}
{
    "id": "4eb1b241cddb13606500000b",
    "project_id": "4eb1b240cddb13606500000a",
    "name": "MyWorker",
    "runtime": "ruby",
    "latest_checksum": "a0702e9e9a84b758850d19ddd997cf4a",
    "rev": 1,
    "latest_history_id": "4eb1b241cddb13606500000c",
    "latest_change": 1328737460598000000
}
{% endhighlight %}

### Delete a Code Package

#### Endpoint

<div class="grey-box">
    DELETE /projects/<span class="variable project_id">{Project ID}</span>/codes/<span class="variable code_id">{Code ID}</span>
</div>

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

<div class="grey-box">
    GET /projects/<span class="variable project_id">{Project ID}</span>/codes/<span class="variable code_id">{Code ID}</span>/download
</div>

#### URL Parameters

* **Project ID**: The ID of the project that the task belongs to.
* **Code Package ID**: The ID of the task you want details on.

#### Optional URL Parameters

* **revision**: The revision of the code package you want to download. If not specified, the latest revision will be downloaded.

#### Response

The response will be a zip file containing your code package. The response header will include a Content-Disposition header containing "filename=yourworker_rev.zip", where yourworker is the code package’s name and rev is the numeric revision. The response’s Content-Type will be "application/zip".

### List Code Package Revisions

#### Endpoint

<div class="grey-box">
    GET /projects/<span class="variable project_id">{Project ID}</span>/codes/<span class="variable code_id">{Code ID}</span>/revisions
</div>

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
            "code_id": "4f32d9c81cf75447be020ea5",
            "project_id": "4f32d521519cb67829000390",
            "rev": 1,
            "runtime": "ruby",
            "name": "MyWorker",
            "file_name": "worker.rb",
        },
        {
            "id": "4f32da021cf75447be020ea8",
            "code_id": "4f32d9c81cf75447be020ea5",
            "project_id": "4f32d521519cb67829000390",
            "rev": 2,
            "runtime": "ruby",
            "name": "MyWorker",
            "file_name": "worker.rb",
        }
    ]
}
{% endhighlight %}

## Tasks

Tasks are specific instance of your workers being run. They encompass a single execution of a code package. Tasks consist of the code package to be run and the data to pass to the code package.

### Task Properties

#### Task State

Tasks will be in different states during the course of operation. Here are the states that tasks can be in in the system:

<table class="reference">
    <thead>
        <tr><th>Task State</th><th>Status</th></tr>
    </thead>
    <tbody>
        <tr><td>queued</td><td>in the queue, waiting to run</td></tr>
        <tr><td>running</td><td>running</td></tr>
        <tr><td>complete</td><td>finished running</td></tr>
        <tr><td>error</td><td>error during processing</td></tr>
        <tr><td>cancelled</td><td>cancelled by user</td></tr>
        <tr><td>killed</td><td>killed by system</td></tr>
        <tr><td>timeout</td><td>exceeded processing time threshold</td></tr>
    </tbody>
</table>

#### Priority

Task priority determines how much time a task may sit in queue. Higher values means tasks spend less time in the queue once they come off the schedule, but also [cost more](http://www.iron.io/products/worker/pricing) to run. The standard/default priority is 0.

<table class="reference">
    <thead>
        <tr><th>Priority</th><th></th></tr>
    </thead>
    <tbody>
        <tr><td>0</td><td>Default</td></tr>
        <tr><td>1</td><td>Medium</td></tr>
        <tr><td>2</td><td>High (less time in queue)</td></tr>
    </tbody>
</table>

#### Timeout

Tasks have timeouts associated with them that specify the amount of time (in seconds) the process may run. The maximum timeout is 3600 seconds (60 minutes). It’s also the default timeout but it can be set on a task-by-task basis to be anytime less than 3600 seconds.

<table class="reference">
    <thead>
        <tr><th>Timeout (in seconds)</th><th></th></tr>
    </thead>
    <tbody>
        <tr><td>3600</td><td>Maximum time a task can run (also default)</td></tr>
    </tbody>
</table>

#### Runtime

<table class="reference" style="margin-top: 10px;">
    <thead>
        <tr><th>Languages</th></tr>
    </thead>
    <tbody>
        <tr><td>ruby</td></tr>
        <tr><td>python</td></tr>
        <tr><td>php</td></tr>
    </tbody>
</table>

### List Tasks

#### Endpoint

<div class="grey-box">
GET /projects/<span class="variable project_id">{Project ID}</span>/tasks
</div>

#### URL Parameters

* **Project ID**: The ID of the project whose tasks you want to get a list of.

#### Optional URL Parameters

* **page**: The page of tasks you want to retrieve, starting from 0. Default is 0, maximum is 100.
* **per_page**: The number of tasks to return per page. Note this is a maximum value, so there may be less tasks returned if there aren’t enough results. Default is 30, maximum is 100.
* Filter by Status: the parameters **queued**, **running**, **complete**, **error**, **cancelled**, **killed**, and **timeout** will all filter by their respective status when given a value of `1`. These parameters can be mixed and matched to return tasks that fall into *any* of the status filters. If no filters are provided, tasks will be displayed across all statuses.
* **from_time**: Limit the retrieved tasks to only those that were created after the time specified in the value. Time should be formatted as the number of seconds since the Unix epoch.
* **to_time**: Limit the retrieved tasks to only those that were created before the time specified in the value. Time should be formatted as the number of seconds since the Unix epoch.

#### Response

The response will be a JSON object. The "tasks" property will contain a JSON array of objects, each representing a task.

Sample:  
{% highlight js %}
{
    "tasks": [
        {
            "id": "4f3595381cf75447be029da5",
            "created_at": "2012-02-10T22:07:52.712Z",
            "updated_at": "2012-02-10T22:11:55Z",
            "project_id": "4f32d521519cb67829000390",
            "code_id": "4f32d9c81cf75447be020ea5",
            "status": "complete",
            "msg": "SetProgress output",
            "code_name": "MyWorker",
            "start_time": "2012-02-10T22:07:54Z",
            "end_time": "2012-02-10T22:11:55Z",
            "duration": 241441,
            "run_times": 1,
            "timeout": 3600,
            "percent": 100
        }
    ]
}
{% endhighlight %}

### Queue a Task

#### Endpoint

<div class="grey-box">
    POST /projects/<span class="variable project_id">{Project ID}</span>/tasks
</div>

#### URL Parameters

* **Project ID**: The ID of the project that you are creating the task in.

#### Request

The request should be JSON-encoded and consist of an object with a single property, "tasks", which contains an array of objects. Each object in the array should consist of:

* **code_name**: The name of the code package to execute for this task.
* **payload**: A string of data to be passed to the worker. The payload will be passed to the code package at runtime, and can be used to pass varying information into a worker that will process it using the same code. The payload cannot be larger than 64KB in size.

Optionally, each object in the array can also contain the following:

* **priority**: The priority queue to run the task in. Valid values are 0, 1, and 2. 0 is the default. 
* **timeout**: The maximum runtime of your task in seconds. No task can exceed 3600 seconds (60 minutes). The default is 3600 but can be set to a shorter duration. 
* **delay**: The number of seconds to delay before actually queuing the task. Default is 0.

The request also needs to be sent with a "Content-Type: application/json" header, or it will respond with a 406 status code and a "msg" property explaining the missing header.

Sample:  
{% highlight js %}
{
    "tasks": [
        {
            "code_name": "MyWorker",
            "payload": "{\"x\": \"abc\", \"y\": \"def\"}"
        }
    ]
}
{% endhighlight %}

#### Response

The response will be a JSON object containing a "msg" property that contains a description of the response and a "tasks" property that contains an array of objects, each with an "id" property that contains the created task’s ID.

Sample:  
{% highlight js %}
{
    "msg": "Queued up",
    "tasks": [
        {
            "id": "4eb1b471cddb136065000010"
        }
    ]
}
{% endhighlight %}

### Queue a Task From a Webhook

#### Endpoint

POST /projects/<span class="variable project_id">{Project ID}</span>/tasks/webhook?code_name=<span class="variable">{Code Name}</span>

#### URL Parameters

* **Project ID**: The ID of the project that you are uploading the code to.
* **Code Name**: The name of the code package you want to execute the task.

#### Request

The request body is free-form: anything at all can be sent. Whatever the request body is will be passed along as the payload for the task, and therefore needs to be under 64KB in size.

#### Response

The response will be a JSON object containing a "msg" property that contains a description of the response.

Sample:  
{% highlight js %}
{
    "id": "4f3595381cf75447be029da5",
    "msg":"Queued up."
}
{% endhighlight %}

### Get Info About a Task

#### Endpoint

<div class="grey-box">
    GET /projects/<span class="variable project_id">{Project ID}</span>/tasks/<span class="variable task_id">{Task ID}</span>
</div>

#### URL Parameters

* **Project ID**: The ID of the project that the task belongs to.
* **Task ID**: The ID of the task you want details on.

#### Response

The response will be a JSON object containing the details of the task.

Sample:  
{% highlight js %}
{
    "id": "4eb1b471cddb136065000010",
    "project_id": "4eb1b46fcddb13606500000d",
    "code_id": "4eb1b46fcddb13606500000e",
    "code_history_id": "4eb1b46fcddb13606500000f",
    "status": "complete",
    "code_name": "MyWorker",
    "code_rev": "1",
    "start_time": 1320268924000000000,
    "end_time": 1320268924000000000,
    "duration": 43,
    "timeout": 3600,
    "payload": "{\"foo\":\"bar\"}", 
    "updated_at": "2012-11-10T18:31:08.064Z", 
    "created_at": "2012-11-10T18:30:43.089Z"
}
{% endhighlight %}

### Get a Task’s Log

#### Endpoint

<div class="grey-box">
    GET /projects/<span class="variable project_id">{Project ID}</span>/tasks/<span class="variable task_id">{Task ID}</span>/log
</div>

#### URL Parameters

* **Project ID**: The ID of the project that the task belongs to.
* **Task ID**: The ID of the task whose log you are retrieving.

#### Response

Unlike the other API methods, this method will return a Content-Type of "text/plain". The response will only include the task’s log.

Sample:  
Hello World!

### Cancel a Task

#### Endpoint

<div class="grey-box">
    POST /projects/<span class="variable project_id">{Project ID}</span>/tasks/<span class="variable task_id">{Task ID}</span>/cancel
</div>

#### URL Parameters

* **Project ID**: The ID of the project that the task belongs to.
* **Task ID**: The ID of the task you want to cancel.

#### Response

The response will be a JSON object containing a message explaining whether the request was successful or not.

Sample:  
{% highlight js %}
{
    "msg": "Cancelled"
}
{% endhighlight %}

### Set a Task’s Progress

#### Endpoint

<div class="grey-box">
    POST /projects/<span class="variable project_id">{Project ID}</span>/tasks/<span class="variable task_id">{Task ID}</span>/progress
</div>

#### URL Parameters

* **Project ID**: The ID of the project that contains the task.
* **Task ID**: The ID of the task whose progress you are updating.

#### Request

The request should be JSON-encoded and can contain the following information:

* **percent**: An integer, between 0 and 100 inclusive, that describes the completion of the task.
* **msg**: Any message or data describing the completion of the task. Must be a string value, and the 64KB request limit applies.


The request also needs to be sent with a "Content-Type: application/json" header, or it will respond with a 406 status code and a "msg" property explaining the missing header.

Sample:  
{% highlight js %}
{
    "percent": 25,
    "msg": "Any message goes here."
}
{% endhighlight %}

#### Response

The response will be a JSON object containing a message explaining whether the request was successful or not.

Sample:  
{% highlight js %}
{
    "msg": "Progress set"
}
{% endhighlight %}

### Retry a Task

#### Endpoint

<div class="grey-box">
    POST /projects/<span class="variable project_id">{Project ID}</span>/tasks/<span class="variable task_id">{Task ID}</span>/retry
</div>

#### URL Parameters

* **Project ID**: The ID of the project that the task belongs to.
* **Task ID**: The ID of the task you want to cancel.

#### Request

The request must be JSON-encoded and can contain the following information:

* **delay**: The number of seconds the task should be delayed before it runs again.

The request also needs to be sent with a "Content-Type: application/json" header, or it will respond with a 406 status code and a "msg" property explaining the missing header.

#### Response

The response will be a JSON object containing a message explaining whether the request was successful or not.

Sample:  
{% highlight js %}
{
    "msg": "Queued up",
    "tasks": [
        {
            "id": "4eb1b471cddb136065000010"
        }
    ]
}
{% endhighlight %}

## Scheduled Tasks

Scheduled tasks are just tasks that run on a schedule. While the concept is simple, it enables a powerful class of functionality: tasks can be used as cron workers, running at specific intervals a set (or unlimited) number of times.

### List Scheduled Tasks

#### Endpoint

<div class="grey-box">
    GET /projects/<span class="variable project_id">{Project ID}</span>/schedules
</div>

#### URL Parameters

* **Project ID**: The ID of the project whose scheduled tasks you want to get a list of.

#### Optional URL Parameters

* **page**: The page of scheduled tasks you want to retrieve, starting from 0. Default is 0, maximum is 100.
* **per_page**: The number of scheduled tasks to return per page. Note this is a maximum value, so there may be less tasks returned if there aren’t enough results. Default is 30, maximum is 100.

#### Response

The response will be a JSON object. The "schedules" property will contain a JSON array of objects, each representing a schedule.

Sample:
{% highlight js %}
{
    "schedules": [
        {
            "id": "4eb1b490cddb136065000011",
            "created_at": "2012-02-14T03:06:41Z",
            "updated_at": "2012-02-14T03:06:41Z",
            "project_id": "4eb1b46fcddb13606500000d",
            "msg": "Ran max times.",
            "status": "complete",
            "code_name": "MyWorker",
            "start_at": "2011-11-02T21:22:34Z",
            "end_at": "2262-04-11T23:47:16Z",
            "next_start": "2011-11-02T21:22:34Z",
            "last_run_time": "2011-11-02T21:22:51Z",
            "run_times": 1,
            "run_count": 1
        }
    ]
}
{% endhighlight %}

### Schedule a Task

#### Endpoint

<div class="grey-box">
    POST /projects/<span class="variable project_id">{Project ID}</span>/schedules
</div>

#### URL Parameters

* **Project ID**: The ID of the project that you want to schedule the task in.

#### Request

The request should be a JSON object with a "schedules" property containing an array of objects with the following properties:

* **code_name**: The name of the code package to execute.
* **payload**: A string of data to pass to the code package on execution.

Optionally, each object in the array can specify the following properties:

* **run_every**: The amount of time, in seconds, between runs. By default, the task will only run once. `run_every` will return a 400 error if it is set to <a href="/worker/reference/environment/#minimum_run_every_time">less than 60</a>.
* **end_at**: The time tasks will stop being queued. Should be a time or datetime.
* **run_times**: The number of times a task will run.
* **priority**: The priority queue to run the job in. Valid values are 0, 1, and 2. The default is 0. Higher values means tasks spend less time in the queue once they come off the schedule.
* **start_at**: The time the scheduled task should first be run.

The request also needs to be sent with a "Content-Type: application/json" header, or it will respond with a 406 status code and a "msg" property explaining the missing header.

Sample:
{% highlight js %}
{
  schedules: [
    {
      payload : "{\"x\": \"abc\", \"y\": \"def\"}",
      name: "MyScheduledTask",
      code_name: "MyWorker"
      run_every: 3600
    }
  ]
}
{% endhighlight %}

#### Response

The response will be a JSON object containing a "msg" property that contains a description of the response and a "schedules" property that contains an array of objects, each with an "id" property that contains the scheduled task’s ID.

Sample:
{% highlight js %}
{
    "msg": "Scheduled",
    "schedules": [
        {
            "id": "4eb1b490cddb136065000011"
        }
    ]
}
{% endhighlight %}

### Get Info About a Scheduled Task

#### Endpoint

<div class="grey-box">
    GET /projects/<span class="variable project_id">{Project ID}</span>/schedules/<span class="variable schedule_id">{Schedule ID}</span>
</div>

#### URL Parameters

* **Project ID**: The ID of the project that the scheduled task belongs to.
* **Schedule ID**: The ID of the scheduled task you want details on.

#### Response

The response will be a JSON object containing the details of the scheduled task.

Sample:
{% highlight js %}
{
    "id": "4eb1b490cddb136065000011",
    "created_at": "2011-11-02T21:22:51Z",
    "updated_at": "2011-11-02T21:22:51Z",
    "project_id": "4eb1b46fcddb13606500000d",
    "msg": "Ran max times.",
    "status": "complete",
    "code_name": "MyWorker",
    "delay": 10,
    "start_at": "2011-11-02T21:22:34Z",
    "end_at": "2262-04-11T23:47:16Z",
    "next_start": "2011-11-02T21:22:34Z",
    "last_run_time": "2011-11-02T21:22:51Z",
    "run_times": 1,
    "run_count": 1
}
{% endhighlight %}

### Cancel a Scheduled Task

#### Endpoint

<div class="grey-box">
    POST /projects/<span class="variable project_id">{Project ID}</span>/schedules/<span class="variable schedule_id">{Schedule ID}</span>/cancel
</div>

#### URL Parameters

* **Project ID**: The ID of the project that the scheduled task belongs to.
* **Schedule ID**: The ID of the scheduled task you want to cancel.

#### Response

The response will be a JSON object containing a message explaining whether the request was successful or not.

Sample:
{% highlight js %}
{
    "msg": "Cancelled"
}
{% endhighlight %}
