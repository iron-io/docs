---
title: IronWorker API Reference
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['REST/HTTP API', '/api']
---

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
            <td><a href="#upload_or_update_a_code_package" title="Upload or Update a Code Package">Upload or Update a Code Package</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/codes/<span class="code_id variable">{Code ID}</span></td>
            <td>GET</td>
            <td><a href="#get_info_about_a_code_package" title="Get Info About a Code Package">Get Info About A Code Package</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/codes/<span class="code_id variable">{Code ID}</span></td>
            <td>DELETE</td>
            <td><a href="#delete_a_code_package" title="Delete a Code Package">Delete a Code Package</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/codes/<span class="code_id variable">{Code ID}</span>/download</td>
            <td>GET</td>
            <td><a href="#download_a_code_package" title="Download a Code Package">Download a Code Package</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/codes/<span class="code_id variable">{Code ID}</span>/revisions</td>
            <td>GET</td>
            <td><a href="#list_code_package_revisions" title="List Code Package Revisions">List Code Package Revisions</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/codes/<span class="code_id variable">{Code ID}</span>/stats</td>
            <td>GET</td>
            <td><a href="#get_code_package_stats" title="Get Code Package Stats">Get Code Package Stats</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/codes/<span class="code_id variable">{Code ID}</span>/pause_task_queue</td>
            <td>POST</td>
            <td><a href="#pause_task_queue_for_code_package" title="Pause Task Queue for Code Package">Pause Task Queue for Code Package</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/codes/<span class="code_id variable">{Code ID}</span>/resume_task_queue</td>
            <td>POST</td>
            <td><a href="#resume_task_queue_for_code_package" title="Resume Task Queue for Code Package">Resume Paused Task Queue for Code Package</a></td>
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
            <td>/projects/<span class="project_id variable">{Project ID}</span>/tasks</td>
            <td>GET</td>
            <td><a href="#list_tasks" title="List Tasks">List Tasks</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/tasks</td>
            <td>POST</td>
            <td><a href="#queue_a_task" title="Queue a Task">Queue a Task</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/tasks/webhook</td>
            <td>POST</td>
            <td><a href="#queue_a_task_from_a_webhook" title="Queue a Task from a Webhook">Queue a Task from a Webhook</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/tasks/<span class="task_id variable">{Task ID}</span></td>
            <td>GET</td>
            <td><a href="#get_info_about_a_task" title="Get Info About a Task">Get Info About a Task</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/tasks/<span class="task_id variable">{Task ID}</span>/log</td>
            <td>GET</td>
            <td><a href="#get_a_tasks_log" title="Get a Task's Log">Get a Task's Log</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/tasks/<span class="task_id variable">{Task ID}</span>/cancel</td>
            <td>POST</td>
            <td><a href="#cancel_a_task" title="Cancel a Task">Cancel a Task</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/tasks/<span class="task_id variable">{Task ID}</span>/progress</td>
            <td>POST</td>
            <td><a href="#set_a_tasks_progress" title="Set a Task's Progress">Set a Task's Progress</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/tasks/<span class="task_id variable">{Task ID}</span>/retry</td>
            <td>POST</td>
            <td><a href="#retry_a_task" title="Retry a Task">Retry a Task</a></td>
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
            <td>/projects/<span class="project_id variable">{Project ID}</span>/schedules</td>
            <td>GET</td>
            <td><a href="#list_scheduled_tasks" title="List Scheduled Tasks">List Scheduled Tasks</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/schedules</td>
            <td>POST</td>
            <td><a href="#schedule_a_task" title="Schedule a Task">Schedule a Task</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/schedules/<span class="schedule_id variable">{Schedule ID}</span></td>
            <td>GET</td>
            <td><a href="#get_info_about_a_scheduled_task" title="Get Info About a Scheduled Task">Get Info About a Scheduled Task</a></td>
        </tr>
        <tr>
            <td>/projects/<span class="project_id variable">{Project ID}</span>/schedules/<span class="schedule_id variable">{Schedule ID}</span>/cancel</td>
            <td>POST</td>
            <td><a href="#cancel_a_scheduled_task" title="Cancel a Scheduled Task">Cancel a Scheduled Task</a></td>
        </tr>
    </tbody>
</table>

### Stacks

<table class="reference" style="padding-bottom: 20px;">
    <thead>
        <tr>
            <th style="width: 55%;">URL</th><th style="width: 11%;">HTTP Verb</th><th style="width: 34%;">Purpose</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>/stacks</td>
            <td>GET</td>
            <td><a href="#list_stacks" title="List of available stacks">List of available stacks</a></td>
        </tr>
    </tbody>
</table>

### Clusters

<table class="reference" style="padding-bottom: 20px;">
    <thead>
        <tr>
            <th style="width: 55%;">URL</th><th style="width: 11%;">HTTP Verb</th><th style="width: 34%;">Purpose</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>/clusters</td>
            <td>GET</td>
            <td><a href="#list_clusters" title="List Clusters">List Clusters</a></td>
        </tr>
        <tr>
            <td>/clusters/<span class="cluster_id variable">{Cluster ID}</span></td>
            <td>GET</td>
            <td><a href="#get_cluster" title="Get Cluster">Get Cluster</a></td>
        </tr>
        <tr>
            <td>/clusters/<span class="cluster_id variable">{Cluster ID}</span>/stats</td>
            <td>GET</td>
            <td><a href="#get_cluster_stats" title="Get Cluster Stats">Get Cluster Stats</a></td>
        </tr>
        <tr>
            <td>/clusters</td>
            <td>POST</td>
            <td><a href="#create_cluster" title="Create Cluster">Create Cluster</a></td>
        </tr>
        <tr>
            <td>/clusters/<span class="cluster_id variable">{Cluster ID}</span></td>
            <td>PUT</td>
            <td><a href="#update_cluster" title="Update Cluster">Update Cluster</a></td>
        </tr>
        <tr>
            <td>/clusters/<span class="cluster_id variable">{Cluster ID}</span></td>
            <td>DELETE</td>
            <td><a href="#delete_cluster" title="Delete Cluster">Delete Cluster</a></td>
        </tr>
        <tr>
            <td>/clusters/<span class="cluster_id variable">{Cluster ID}</span>/terminate</td>
            <td>POST</td>
            <td><a href="#terminate_cluster_instances" title="Terminate Cluster Instances">Terminate Cluster Instances</a></td>
        </tr>
    </tbody>
</table>

## Authentication

IronWorker uses OAuth2 tokens to authenticate API requests. You can find and create your API tokens [in the HUD](https://hud.iron.io/tokens). To authenticate your request, you should include a token in the Authorization header for your request or in your query parameters. Tokens are universal, and can be used across services.

Note that each request also requires a Project ID to specify which project the action will be performed on. You can find your Project IDs [in the HUD](https://hud.iron.io). Project IDs are also universal, so they can be used across services as well.

**Example Authorization Header**:
`Authorization: OAuth abc4c7c627376858`

**Note**: Be sure you have the correct case: it's **`OAuth`**, not `Oauth`.

**Example Query with Parameters**:
GET https://<span class="variable host">worker-aws-us-east-1</span>.iron.io/2/projects/<span class="variable project_id">{Project ID}</span>/tasks?oauth=abc4c7c627376858

## Requests

Requests to the API are simple HTTP requests against the API endpoints.

All request bodies should be in JSON format.

Unless otherwise noted, all requests should use the following headers in addition
to the `Authentication` header:

- `Accept : application/json`
- `Accept-Encoding : gzip/deflate`
- `Content-Type : application/json`

### Base URL

All endpoints should be prefixed with the following:

<strong>https://<span class="variable domain project_id">{Host}</span>.iron.io/<span class="variable version project_id">{API Version}</span>/</strong>

<strong>API Version Support</strong> : IronWorker API supports version <strong>2</strong>

The domains for the clouds Iron Worker supports are as follows:
<table class="reference">
  <thead>
    <tr><th style="width: 30%;">Cloud</th><th style="width: 70%;"><span class="variable domain">{Host}</span></th></tr>
  </thead>
  <tbody>
    <tr><td>AWS</td><td>worker-aws-us-east-1</td></tr>
  </tbody>
</table>


### Pagination

Use the following parameters in the query string of the request for endpoints
that return lists/arrays of values:

* `page` - The page of results to return. Default is 0. Maximum is 100.
* `per_page` - The number of results to return. It may be less if there aren't enough results. Default is 30. Maximum is 100.

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
            <td>403</td><td>Project suspected, resource limits.</td>
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

```json
{
    "msg": "reason for error"
}
```

### Exponential Backoff

When a 503 error code is returned, it signifies that the server is currently unavailable. This means there was a problem processing the request on the server-side; it makes no comment on the validity of the request.

Libraries and clients should use [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff) when confronted with a 503 error, retrying their request with increasing delays until it succeeds or a maximum number of retries (configured by the client) has been reached.

### Dates and Times

All dates, times, and timestamps will use the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) / [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format.

## Code Packages

Your workers are run against code packages that can be updated and deleted over time. The code packages define the functionality a worker has through the code they contain. Put simply, code packages are simply the code that will run when your worker runs.

### <a name="list_code_packages"></a> List Code Packages

Return a paginated list of all code packages owned by the given project.

#### Endpoint

GET /projects/<span class="variable project_id">{Project ID}</span>/codes

#### URL Parameters

* **Project ID**: The ID of the project whose code packages you want to get a list of.

#### Optional Query Parameters

* **page**: The page of code packages you want to retrieve, starting from 0. Default is 0, maximum is 100.
* **per_page**: The number of code packages to return per page. Note this is a maximum value, so there may be fewer packages returned if there aren’t enough results. Default is 30, maximum is 100.

#### Response

The response will be a JSON object. The `codes` property will contain a JSON
array of objects, each representing a code package. For information about code
objects, see the [Get Info About A Code Package
endpoint](#get_info_about_a_code_package).

Sample:

```json
{
    "codes": [
        {
            "id": "4ea9c05dcddb131f1a000002",
            "created_at": "2016-06-08T17:52:09.689Z",
            "project_id": "4ea9c05dcddb131f1a000001",
            "name": "MyWorker",
            "image": "iron/hello",
            "latest_checksum": "b4781a30fc3bd54e16b55d283588055a",
            "rev": 1,
            "latest_history_id": "4f32ecb4f840063758022153",
            "latest_change": "2016-06-08T17:52:09.689Z"
        }
    ]
}
```

### <a name="upload_or_update_a_code_package"></a> Upload or Update a Code Package

You will almost always want to use our [Command Line Interface](/worker/reference/cli/) to make uploading easier.

#### Building a Code Package

If your client doesn't support uploading code packages and you don't want to use the [CLI](/worker/reference/cli), you're going to need to build the code package yourself before uploading it.

Code should be submitted as a zip file containing all of the files your project needs. That includes dependencies, libraries, data files... everything.

#### Endpoint

POST /projects/<span class="variable project_id">{Project ID}</span>/codes

#### URL Parameters

* **Project ID**: The ID of the project that you are uploading the code to.

#### Request

This endpoint accepts a `multipart/form-data` request, instead of
`application/json`. The form MUST have a field called `data` that has a JSON
literal describing the code. An optional field of type file called `file` may
contain the zip file containing the worker code.

`data` MUST contain the following information for both uploading a new package
and for updating an existing package:

* **name**: A unique name for your worker. This will be used to assign tasks to the worker as well as to update the code. If a worker with this name already exists, the code you are uploading will be added as a new revision.
* **image**: The Docker image for your worker.

The request also accepts the following optional parameters:

* **command**: String. The command to execute when running your worker code. See [Docker Workflow](/worker/getting_started/) for more information.
* **config**: String. An arbitrary string (usually YAML or JSON) that, if provided, will be available in a file that your worker can access. The config file location will be passed in via the -config argument to your worker. The config cannot be larger than 64KB in size.
* **stack**: **Deprecated**. This is not supported for custom Docker images. A string that, if provided, will set the specific language environment. If blank the language version will be set to default language version defined in runtime. [See More Information on Stack settings](http://dev.iron.io/worker/reference/environment/#default_language_versions).
* **max_concurrency**: The maximum number of workers that should be run in parallel. This is useful for keeping your workers from hitting API quotas or overloading databases that are not prepared to handle the highly-concurrent worker environment. If omitted, there will be no limit on the number of concurrent workers.
* **retries**: The maximum number of times failed tasks should be retried, in the event that there's an error while running them. If omitted, tasks will not be retried. Tasks cannot be retried more than ten times.
* **retries_delay**: The number of seconds to wait before retries. If omitted, tasks will be immediately retried.
* **default_priority**: The default priority of the tasks running this code. Valid values are 0, 1, and 2. The priority of the task can also be set when queueing the task.
* **env_vars**: Environment variables accessible within your code. It's a JSON object consisting of corresponding key/value pairs. Keys and values are intended to be alphanumeric; if you want to pass values composed of wider list of symbols, consider to encode value with base64 encoding and decode it back within your code.

Your request also needs the following headers, in addition to the headers required by all API calls:

* **Content-Length**: The number of bytes in the form-data request.
* **Content-Type**: Should be set to "multipart/form-data ; boundary={Insert Value Here}" with boundary set to [an appropriate value](http://en.wikipedia.org/wiki/MIME#Multipart_messages).

**Note**: This request is not limited to 64 KB, unlike other requests.

**Sample Headers**:

- `Content-Length: 3119`
- `Content-Type: multipart/form-data; boundary=39f5903459794ad483153244cc6486ec`

**Sample Body**:

```
--39f5903459794ad483153244cc6486ec
Content-Disposition: form-data; name="data"
Content-Type: text/plain; charset=utf-8
```
```json
{
    "file_name": "MyWorker.rb",
    "name": "MyWorker",
    "runtime": "ruby",
    "max_concurrency": 12,
    "env_vars": {"KEY":"VALUE", "MQ_URL":"https://mq-aws-us-east-1.iron.io"}
}
```
```
--39f5903459794ad483153244cc6486ec
Content-Disposition: form-data; name="file"; filename="MyWorker.zip"
Content-Type: application/zip

{ Form-encoded zip data goes here }

--39f5903459794ad483153244cc6486ec--
```

#### Response

The response will be a JSON object containing a `msg` property that contains a description of the response.

Sample:

```json
{
    "msg": "Upload successful."
}
```

### <a name="get_info_about_a_code_package"></a> Get Info About a Code Package

#### Endpoint

<div class="grey-box">
    GET /projects/<span class="variable project_id">{Project ID}</span>/codes/<span class="variable code_id">{Code ID}</span>
</div>

#### URL Parameters

* **Project ID**: The ID of the project that the code package belongs to.
* **Code ID**: The ID of the code package you want details on.

#### Response

The response will be a JSON object containing the details of the code package.

The following fields are always present in all code objects:

* `id` - String - unique, opaque, code identifier.
* `project_id` - String.
* `name` - String. As specified during upload.
* `created_at` - Date. This is the date and time the code was first
  created.
* `rev` - Number. Monotonically increasing integer that counts changes to the
  code.
* `latest_history_id` - String. Uniquely identifies the latest version of this
  code.
* `latest_change` - Date. The latest time any changes were made to the code via
  the [Upload or Update a code package
  endpoint](#upload_or_update_a_code_package).

The following fields may be present.
* `latest_checksum` - String. MD5 checksum of the latest code package. Only set
  for old style zip packages.
* `image` - String. The Docker image powering this task.
* `runtime` and `stack` - **Deprecated** Strings. Disjoint with `image`. Only
  set for old style zip packages.
* `command` - String. Command to run in the Docker container or `runtime` to
  begin task execution.
* `max_concurrency` - Number. See [Upload or Update a code package endpoint](#upload_or_update_a_code_package).
* `retries` - Number. See [Upload or Update a code package endpoint](#upload_or_update_a_code_package).
* `retries_delay` - Number. See [Upload or Update a code package endpoint](#upload_or_update_a_code_package).
* `priority` - Number. See [Upload or Update a code package endpoint](#upload_or_update_a_code_package).
* `status` - String. Set to `archived` if the code has been archived.
* `archived_at` - Date. Timestamp when code was archived.
* `config` - String. See [Upload or Update a code package endpoint](#upload_or_update_a_code_package).
* `env_vars` - Object of string values. See [Upload or Update a code package endpoint](#upload_or_update_a_code_package).

Sample:

```json
{
    "id": "4eb1b241cddb13606500000b",
    "project_id": "4eb1b240cddb13606500000a",
    "name": "MyWorker",
    "latest_checksum": "a0702e9e9a84b758850d19ddd997cf4a",
    "rev": 1,
    "latest_history_id": "4eb1b241cddb13606500000c",
    "latest_change": "2016-06-08T17:52:09.689Z",
    "created_at": "2016-03-17T13:12:09.589Z",
    "command": "./hello",
    "image": "example/hello",
    "max_concurrency": 5,
    "retries": 2,
    "config": "user=Alice",
    "env_vars": {
        "GREETING": "Good Morning"
    }
}
```

### <a name="delete_a_code_package"></a> Delete a Code Package

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

```json
{
    "msg":"Deleted"
}
```

### <a name="download_a_code_package"></a> Download a Code Package

#### Endpoint

<div class="grey-box">
    GET /projects/<span class="variable project_id">{Project ID}</span>/codes/<span class="variable code_id">{Code ID}</span>/download
</div>

#### URL Parameters

* **Project ID**: The ID of the project that the code package belongs to.
* **Code Package ID**: The ID of the task you want details on.

#### Optional Query Parameters

* **revision**: The revision of the code package you want to download. If not specified, the latest revision will be downloaded.

#### Response

The response will be a zip file containing your code package. The response header will include a `Content-Disposition` header containing `filename=yourworker_rev.zip`, where `yourworker` is the code package’s name and `rev` is the numeric revision. The response’s `Content-Type` will be `application/zip`.

### <a name="list_code_package_revisions"></a> List Code Package Revisions

#### Endpoint

<div class="grey-box">
    GET /projects/<span class="variable project_id">{Project ID}</span>/codes/<span class="variable code_id">{Code ID}</span>/revisions
</div>

#### URL Parameters

* **Project ID**: The ID of the project that the code package belongs to.
* **Code Package ID**: The ID of the code package whose revisions you’re retrieving.

#### Optional Query Parameters

* **page**: The page of revisions you want to retrieve, starting from 0. Default is 0, maximum is 100.
* **per_page**: The number of revisions to return per page. Note this is a maximum value, so there may be less revisions returned if there aren’t enough results. Default is 30, maximum is 100.

#### Response

The response will be a JSON object with a revisions property, containing a list of JSON objects, each representing a revision to the code package.

The following fields are always present in all code revision objects:

* `id` - String - unique, opaque identifier for the revision.
* `project_id` - String.
* `code_id` - String.
* `name` - String. As specified during upload. Same as the code name.
* `created_at` - Date. This is the date and time this version of code was first
  created.
* `rev` - Number. Monotonically increasing integer identifying this revision in
  relation to the code.

The following fields may be present.
* `checksum` - String. MD5 checksum of the code package for the revision. Only set
  for old style zip packages.
* `code_size` - Number. Size in bytes of the code package for the revision.
  Only set for old style zip packages.
* `image` - String. The Docker image powering this task.
* `runtime` and `stack` - **Deprecated** Strings. Disjoint with `image`. Only
  set for old style zip packages.
* `command` - String. Command to run in the Docker container or `runtime` to
  begin task execution.
* `max_concurrency` - Number. See [Upload or Update a code package endpoint](#upload_or_update_a_code_package).
* `retries` - Number. See [Upload or Update a code package endpoint](#upload_or_update_a_code_package).
* `retries_delay` - Number. See [Upload or Update a code package endpoint](#upload_or_update_a_code_package).
* `priority` - Number. See [Upload or Update a code package endpoint](#upload_or_update_a_code_package).
* `status` - String. Set to `archived` if the code has been archived.
* `archived_at` - Date. Timestamp when code was archived.
* `config` - String. See [Upload or Update a code package endpoint](#upload_or_update_a_code_package).
* `env_vars` - Object of string values. See [Upload or Update a code package endpoint](#upload_or_update_a_code_package).

Sample:

```json
{
    "revisions": [
        {
            "id": "4f32d9c81cf75447be020ea6",
            "code_id": "4f32d9c81cf75447be020ea5",
            "project_id": "4f32d521519cb67829000390",
            "created_at": "2016-03-17T13:12:09.589Z",
            "updated_at": "2016-03-17T13:12:09.589Z",
            "rev": 1,
            "image": "iron/hello",
            "name": "MyWorker",
            "file_name": "worker.rb"
        },
        {
            "id": "4f32da021cf75447be020ea8",
            "code_id": "4f32d9c81cf75447be020ea5",
            "project_id": "4f32d521519cb67829000390",
            "created_at": "2016-04-11T13:12:09.589Z",
            "updated_at": "2016-04-11T13:12:09.589Z",
            "rev": 2,
            "image": "iron/hello",
            "name": "MyWorker",
            "config": "user=Alice",
            "file_name": "worker.rb"
        }
    ]
}
```

### <a name="get_code_package_stats"></a> Get Code Package Stats

#### Endpoint

<div class="grey-box">
    GET /projects/<span class="variable project_id">{Project ID}</span>/codes/<span class="variable code_id">{Code ID}</span>/stats
</div>

#### URL Parameters

* **Project ID**: The ID of the project that the code package belongs to.
* **Code Package ID**: The ID of the code package whose stats you’re retrieving.


#### Optional Query Parameters

* **start_date**: Limit the counts of tasks to those that were last modified after this time specified.  Time should be formatted as the number of seconds since the Unix epoch.
* **end_date**: Limit the counts of tasks to those that were last modified before this time specified.  Time should be formatted as the number of seconds since the Unix epoch.

If neither are specified, tasks run in the last 24 hours are considered.

#### Response

The response will be a JSON object listing the amount of tasks in each of five possible task statuses.

Sample:

```json
{
    "queued": 0,
    "running": 1,
    "cancelled": 0,
    "timeout": 0,
    "error": 0,
    "complete": 1
}
```


### <a name="pause_task_queue_for_code_package"></a> Pause Task Queue for Code Package

#### Endpoint

<div class="grey-box">
    POST /projects/<span class="variable project_id">{Project ID}</span>/codes/<span class="variable code_id">{Code ID}</span>/pause_task_queue
</div>

#### URL Parameters

* **Project ID**: The ID of the project that the code package belongs to.
* **Code Package ID**: The ID of the code package whose tasks (queued and scheduled) you want to pause.

#### Response

The response will be a JSON object containing a message explaining whether the request was successful or not.

Sample:

```json
{
    "msg": "Paused"
}
```

### <a name="resume_task_queue_for_code_package"></a> Resume Paused Task Queue for Code Package

If the given task is paused, resumes it.

Tasks are assigned to the latest code revision when they are *queued*. If you
have uploaded a new version of the specified code package since you paused the task, it will **not** execute the new revision after it is resumed.

#### Endpoint

<div class="grey-box">
    POST /projects/<span class="variable project_id">{Project ID}</span>/codes/<span class="variable code_id">{Code ID}</span>/resume_task_queue
</div>

#### URL Parameters

* **Project ID**: The ID of the project that the code package belongs to.
* **Code Package ID**: The ID of the code package whose paused tasks (queued and scheduled) you want to resume.

#### Response

The response will be a JSON object containing a message explaining whether the request was successful or not.

Sample:

```json
{
    "msg": "Resumed"
}
```

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

#### <a name="task-priority"></a> Priority

Task priority determines how much time a task may sit in queue. Higher values means tasks spend less time in the queue once they come off the schedule. Access to priorities depends on your selected IronWorker plan [see plans](https://www.iron.io/products/worker/pricing). You must have access to higher priority levels in your chosen plan or your priority will automatically default back to 0.  The standard/default priority is 0.

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

#### <a name="task-timeout"></a> Timeout

Tasks have timeouts associated with them that specify the amount of time (in seconds) the process may run. The maximum timeout is 3600 seconds (60 minutes). It’s also the default timeout but it can be set on a task-by-task basis to be any time less than 3600 seconds.

<table class="reference">
    <thead>
        <tr><th>Timeout (in seconds)</th><th></th></tr>
    </thead>
    <tbody>
        <tr><td>3600</td><td>Maximum time a task can run (also default)</td></tr>
    </tbody>
</table>

### <a name="list_tasks"></a> List Tasks

#### Endpoint

<div class="grey-box">
GET /projects/<span class="variable project_id">{Project ID}</span>/tasks
</div>

#### URL Parameters

* **Project ID**: The ID of the project whose tasks you want to get a list of.

#### Optional Query Parameters

* **page**: The page of tasks you want to retrieve, starting from 0. Default is 0, maximum is 100.
* **per_page**: The number of tasks to return per page. Note this is a maximum value, so there may be less tasks returned if there aren’t enough results. Default is 30, maximum is 100.
* **code_name**: The name of your worker (code package).
* Filter by Status: the parameters **queued**, **running**, **complete**, **error**, **cancelled**, **killed**, and **timeout** will all filter by their respective status when given a value of `1`. These parameters can be mixed and matched to return tasks that fall into *any* of the status filters. If no filters are provided, tasks will be displayed across all statuses.
* **from_time**: Limit the retrieved tasks to only those that were created after the time specified in the value. Time should be formatted as the number of seconds since the Unix epoch.
* **to_time**: Limit the retrieved tasks to only those that were created before the time specified in the value. Time should be formatted as the number of seconds since the Unix epoch.

Sample endpoint with several optional parameters set:

```
GET /projects/<span class="variable project_id">{Project ID}</span>/tasks?code_name=<span class="variable">{Code Name}</span>&complete=1&cancelled=1&error=1
```

#### Response

The response will be a JSON object. The `tasks` property will contain a JSON array of objects, each representing a task. For more information about the output, see [Get Info About A Task](#get_info_about_a_task).

Sample:


```json
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
            "percent": 100,
            "schedule_id": "52f02c01c872fd67b5020c06",
            "log_size": 1000,
            "message_id": "6000008730003365393",
            "cluster": "default"
        }
    ]
}
```

### <a name="queue_a_task"></a> Queue a Task

#### Endpoint

<div class="grey-box">
    POST /projects/<span class="variable project_id">{Project ID}</span>/tasks
</div>

#### URL Parameters

* **Project ID**: The ID of the project that you are creating the task in.

#### Request

The request should be JSON-encoded and consist of an object with a single property, `tasks`, which contains an array of objects. Each object in the array should consist of:

* **code_name**: The name of the code package to execute for this task.
* **payload**: A string of data to be passed to the worker (usually JSON) so the worker knows exactly what work it should perform. This is the equivalent to a message in a typical message queue. The payload will be available in a file that your worker can access. The file name is available in the environment variable called `PAYLOAD_FILE`. In old style code packages, the `-payload` argument passed to the command also has the payload. The payload cannot be larger than 64KB in size.

Optionally, each object in the array can also contain the following:

* **priority**: The priority queue to run the task in. Valid values are 0, 1, and 2. Task priority determines how much time a task may sit in queue. Higher values means tasks spend less time in the queue once they come off the schedule. Access to priorities depends on your selected IronWorker plan [see plans](https://www.iron.io/products/worker/pricing). You must have access to higher priority levels in your chosen plan or your priority will automatically default back to 0.  The standard/default priority is 0.
* **cluster**: cluster name ex: "high-mem" or "dedicated".  This is a premium feature for customers to have access to more powerful or custom built worker solutions. Dedicated worker clusters exist for users who want to reserve a set number of workers just for their queued tasks. If not set default is set to  "default" which is the public IronWorker cluster.
* **timeout**: The maximum runtime of your task in seconds. No task can exceed 3600 seconds (60 minutes). The default is 3600 but can be set to a shorter duration.
* **delay**: The number of seconds to delay before actually queuing the task. Default is 0. Maximum is 604,800 seconds (7 days).

The request also needs to be sent with a "Content-Type: application/json" header, or it will respond with a 406 status code and a "msg" property explaining the missing header.

Sample:

```json
{
    "tasks": [
        {
            "code_name": "MyWorker",
            "payload": "{\"x\": \"abc\", \"y\": \"def\"}"
        }
    ]
}
```

#### Response

The response will be a JSON object containing a `msg` property that contains a description of the response and a "tasks" property that contains an array of objects, each with an `id` property that contains the created task’s ID.

Sample:

```json
{
    "msg": "Queued up",
    "tasks": [
        {
            "id": "4eb1b471cddb136065000010"
        }
    ]
}
```

### <a name="queue_a_task_from_a_webhook"></a> Queue a Task From a Webhook

#### Endpoint

POST /projects/<span class="variable project_id">{Project ID}</span>/tasks/webhook?code_name=<span class="variable">{Code Name}</span>

#### URL Parameters

* **Project ID**: The ID of the project that you are uploading the code to.
* **Code Name**: The name of the code package you want to execute the task.

Optionally, following URL parameters can be sent:

* **priority**: See [Queue A Task](#queue_a_task).
* **cluster**: See [Queue A Task](#queue_a_task).
* **timeout**: See [Queue A Task](#queue_a_task).
* **delay**: See [Queue A Task](#queue_a_task).

Sample endpoint with all optional parameters set:

```
POST /projects/<span class="variable project_id">{Project ID}</span>/tasks/webhook?code_name=<span class="variable">{Code Name}</span>&priority=<span class="variable">{priority}</span>&delay=<span class="variable">{delay}</span>&cluster=<span class="variable">{cluster}</span>&timeout=<span class="variable">{timeout}</span>
```

#### Request

The request body is free-form: anything at all can be sent. Whatever the request body is will be passed along as the payload for the task, and therefore needs to be under 64KB in size.

#### Response

The response will be a JSON object containing a `msg` property that contains a description of the response.

Sample:

```json
{
    "id": "4f3595381cf75447be029da5",
    "msg":"Queued up."
}
```

### <a name="get_info_about_a_task"></a> Get Info About a Task

#### Endpoint

<div class="grey-box">
    GET /projects/<span class="variable project_id">{Project ID}</span>/tasks/<span class="variable task_id">{Task ID}</span>
</div>

#### URL Parameters

* **Project ID**: The ID of the project that the task belongs to.
* **Task ID**: The ID of the task you want details on.

#### Response

The response will be a JSON object containing the details of the task.

All task objects have the following fields:

* `id` - String. Identifies the task.
* `created_at` - Date. Time when task was created by [queuing
  a task](#queue_a_task).
* `updated_at` - Date. Various task operations update this as the task proceeds
  through various states to completion.
* `project_id` - String.
* `code_id` - String.
* `code_name` - String.
* `code_rev` - String.
* `code_history_id` - String. The specific revision of code that this task
  executed.
* `status` - String. One of `queued`, `running`, `complete`, `error`,
  `cancelled`, `killed`, `timeout`. Clients should not assume this set is
  complete. New values may be added over time.

In addition, the following fields are optional:

* `msg` - String. Some human-readable text describing the task state.
* `retry_count` - String. If the task was queued with retries, count of how
  many attempts were made to execute it.
* `start_time` - Date. Time when task starts executing.
* `end_time` - Date. Time when task finishes executing. Set regardless of
  success or error.
* `priority` - Number. See [Priority](#task-priority).
* `timeout` - Number. See [Timeout](#task-timeout).
* `delay` - Number. See [Queue a Task](#queue_a_task).
* `payload` - String. See [Queue a Task](#queue_a_task).
* `cluster` - String. See [Queue a Task](#queue_a_task).
* `log_size` - Number. Length in bytes of the log generated by the task.
* `schedule_id` - String. If the task is queued by the scheduler, the ID of the
  schedule that led to this task being queued.

Sample:

```json
{
    "id": "4eb1b471cddb136065000010",
    "project_id": "4eb1b46fcddb13606500000d",
    "code_id": "4eb1b46fcddb13606500000e",
    "code_history_id": "4eb1b46fcddb13606500000f",
    "status": "complete",
    "code_name": "MyWorker",
    "code_rev": "1",
    "start_time": "2016-06-08T17:52:09.689Z",
    "end_time": "2016-06-08T17:52:09.689Z",
    "timeout": 3600,
    "schedule_id": "52f02c01c872fd67b5020c06",
    "log_size": 1000,
    "label": "optionalLabel",
    "payload": "{\"foo\":\"bar\"}",
    "updated_at": "2012-11-10T18:31:08.064Z",
    "created_at": "2012-11-10T18:30:43.089Z"
}
```

### <a name="get_a_tasks_log"></a> Get a Task’s Log

#### Endpoint

<div class="grey-box">
    GET /projects/<span class="variable project_id">{Project ID}</span>/tasks/<span class="variable task_id">{Task ID}</span>/log
</div>

#### URL Parameters

* **Project ID**: The ID of the project that the task belongs to.
* **Task ID**: The ID of the task whose log you are retrieving.

#### Response

Unlike the other API methods, this method will return a `Content-Type` of `text/plain`. The response will only include the task’s log.

Sample:

```
Hello World!
```

### <a name="cancel_a_task"></a> Cancel a Task

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

```json
{
    "msg": "Cancelled"
}
```

### <a name="retry_a_task"></a> Retry a Task

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

The request also needs to be sent with a `Content-Type: application/json` header, or it will respond with a 406 status code and a `msg` property explaining the missing header.

#### Response

The response will be a JSON object containing a message explaining whether the request was successful or not. It will also have a `tasks` field, which is an array of task objects similar to the response of [Queue a Task](#queue_a_task).

Sample:

```json
{
    "msg": "Queued up",
    "tasks": [
        {
            "id": "4eb1b471cddb136065000010"
        }
    ]
}
```

## Scheduled Tasks

Scheduled tasks are just tasks that run on a schedule. While the concept is simple, it enables a powerful class of functionality: tasks can be used as cron workers, running at specific intervals a set (or unlimited) number of times.

### <a name="list_scheduled_tasks"></a> List Scheduled Tasks

#### Endpoint

<div class="grey-box">
    GET /projects/<span class="variable project_id">{Project ID}</span>/schedules
</div>

#### URL Parameters

* **Project ID**: The ID of the project whose scheduled tasks you want to get a list of.

#### Optional Query Parameters

* **page**: The page of scheduled tasks you want to retrieve, starting from 0. Default is 0, maximum is 100.
* **per_page**: The number of scheduled tasks to return per page. Note this is a maximum value, so there may be less tasks returned if there aren’t enough results. Default is 30, maximum is 100.

#### Response

The response will be a JSON object. The `schedules` property will contain a JSON array of objects, each representing a schedule. See [Get Info About a Scheduled Task](#get_info_about_a_scheduled_task) for full output description.

Sample:

```json
{
    "schedules": [
        {
            "id": "4eb1b490cddb136065000011",
            "created_at": "2012-02-14T03:06:41Z",
            "updated_at": "2012-02-14T03:06:41Z",
            "project_id": "4eb1b46fcddb13606500000d",
            "status": "scheduled",
            "code_name": "MyWorker",
            "start_at": "2012-02-14T11:30:00Z",
            "end_at": "0001-01-01T00:00:00Z",
            "next_start": "2012-02-14T11:30:00Z",
            "last_run_time": "0001-01-01T00:00:00Z",
            "timeout": 3600,
            "run_times": 1,
            "run_every": 60,
            "cluster": "high-memory",
            "payload": "{}"
        }
    ]
}
```

### <a name="schedule_a_task"></a> Schedule a Task

#### Endpoint

<div class="grey-box">
    POST /projects/<span class="variable project_id">{Project ID}</span>/schedules
</div>

#### URL Parameters

* **Project ID**: The ID of the project that you want to schedule the task in.

#### Request

The request should be a JSON object with a `schedules` property containing an array of objects with the following properties:

* **code_name**: The name of the code package to execute.
* **payload**: A string of data to pass to the code package on execution.

Optionally, each object in the array can specify the following properties:

* **start_at**: The time the scheduled task should first be run.
* **run_every**: The amount of time, in seconds, between runs. By default, the task will only run once. `run_every` will return a 400 error if it is set to <a href="/worker/reference/environment/#minimum_run_every_time">less than 60</a>.
* **end_at**: The time tasks will stop being queued. Should be a time or datetime.
* **run_times**: The number of times a task will run.
* **priority**: The priority queue to run the task in. Valid values are 0, 1, and 2. Task priority determines how much time a task may sit in queue. Higher values means tasks spend less time in the queue once they come off the schedule. Access to priorities depends on your selected IronWorker plan [see plans](http://www.iron.io/products/worker/pricing). You must have access to higher priority levels in your chosen plan or your priority will automatically default back to 0.  The standard/default priority is 0.
* **timeout**: The maximum runtime of your task in seconds. No task can exceed 3600 seconds (60 minutes). The default is 3600 but can be set to a shorter duration.
* **cluster**: cluster name ex: "high-mem" or "dedicated".  This is a premium feature for customers for customers to have access to more powerful or custom built worker solutions. Dedicated worker clusters exist for users who want to reserve a set number of workers just for their queued tasks. If not set default is set to  "default" which is the public IronWorker cluster.



The request also needs to be sent with a `Content-Type: application/json` header, or it will respond with a 406 status code and a `msg` property explaining the missing header.

Sample:


```json
{
  "schedules": [
    {
      "payload" : "{\"x\": \"abc\", \"y\": \"def\"}",
      "name": "MyScheduledTask",
      "code_name": "MyWorker",
      "run_every": 3600
    }
  ]
}
```

#### Response

The response will be a JSON object containing a `msg` property that contains a description of the response and a "schedules" property that contains an array of objects, each with an `id` property that contains the scheduled task’s ID.

Sample:


```json
{
    "msg": "Scheduled",
    "schedules": [
        {
            "id": "4eb1b490cddb136065000011"
        }
    ]
}
```

### <a name="get_info_about_a_scheduled_task"></a> Get Info About a Scheduled Task

#### Endpoint

<div class="grey-box">
    GET /projects/<span class="variable project_id">{Project ID}</span>/schedules/<span class="variable schedule_id">{Schedule ID}</span>
</div>

#### URL Parameters

* **Project ID**: The ID of the project that the scheduled task belongs to.
* **Schedule ID**: The ID of the scheduled task you want details on.

#### Response

The response will be a JSON object containing the details of the scheduled task. The following fields are always present:

* `id` - String.
* `created_at` - Date.
* `updated_at` - Date.
* `project_id` - String.
* `code_name` - String. Identifies the code this schedule will use to create
  tasks.
* `payload` - String.

The following fields are optional:

* `msg` - String. A human-readable string with more information about the
  schedule.
* `status` - String. Possible states are `complete` if no more tasks will be
  scheduled.
* `error_count` - Number.
* `priority` - Number. See [Schedule a Task](#schedule_a_task).
* `start_at` - Date. See [Schedule a Task](#schedule_a_task).
* `run_every` - Number. See [Schedule a Task](#schedule_a_task).
* `run_times` - Number. See [Schedule a Task](#schedule_a_task).
* `timeout` - Number. See [Schedule a Task](#schedule_a_task).
* `task_delay` - Number. If set, tasks created by the schedule will have a delay
  of `task_delay` seconds before becoming available to run.
* `run_count` - Number. Number of times the scheduled task was queued.
* `last_run_time` - Date. The last time this scheduled task was executed, if
  any.
* `end_at` - Date. See [Schedule a Task](#schedule_a_task).
* `next_start` - Date. The next time this task is scheduled to be executed, if
  any.

Sample:

```json
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
```

### <a name="cancel_a_scheduled_task"></a> Cancel a Scheduled Task

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

```json
{
    "msg": "Cancelled"
}
```

## Stacks

### <a name="list_stacks"></a> List of stacks (Deprecated)

#### Endpoint

<div class="grey-box">
    GET /stacks
</div>

#### Response

The response will be a JSON object describing the stacks supported by
IronWorker. This is only relevant to old style code packages.

Sample:

```json
  ["scala-2.9","ruby-2.1","ruby-1.9","python-3.2","python-2.7","php-5.4","node-0.10","java-1.7","mono-3.0","mono-2.10"]
```

## Clusters

This encompasses all the API endpoints needed to operate autoscaled clusters
on IronWorker.

### <a name="list_clusters"></a> List Clusters

#### Endpoint

<div class="grey-box">
    GET /clusters
</div>

#### Response

The response will be a JSON object.

Sample:

```json
{
  "clusters": [
    {
      "cpu_share": 51,
      "disk_space": 12884901888,
      "id": "5820f9137f2f770006562571",
      "memory": 536870912,
      "name": "MyCluster",
      "user_id": "56ba0e40ba7b31000700001d"
    }
  ]
}
```

### <a name="get_cluster"></a> Get Cluster

Cluster get returns the cluster's configuration information.

#### Endpoint

<div class="grey-box">
    GET /clusters/<span class="variable cluster_id">{Cluster ID}</span>
</div>

#### URL Parameters

* **Cluster ID**: The ID of the cluster.

#### Response

The response will be a JSON object.

Sample:

```json
{
  "cluster": {
    "cpu_share": 51,
    "disk_space": 12884901888,
    "id": "5820f9137f2f770006562571",
    "machines": [],
    "memory": 536870912,
    "name": "test",
    "runners_available": 0,
    "runners_total": 0,
    "shared_to": [],
    "user_id": "56ba0e40ba7b31000700001d"
  }
}
```

### <a name="get_cluster_stats"></a> Get Cluster Stats

Cluster stats returns information about the cluster's current state, including
running instance count, runners available, runners used, etc.

#### Endpoint

<div class="grey-box">
    GET /clusters/<span class="variable cluster_id">{Cluster ID}</span>/stats
</div>

#### URL Parameters

* **Cluster ID**: The ID of the cluster.

#### Response

The response will be a JSON object.

Sample:

```json
{
  "cluster": {
    "ewma": 32.88,
    "instances": [
      {
        "created_at": "2016-11-03T19:45:42.54Z",
        "instance_id": "i-43331ada",
        "runners_available": 9,
        "runners_total": 10,
        "type": "LIVE",
        "updated_at": "2016-11-03T19:45:42.54Z",
        "version": "3.0.89"
      }
    ],
    "queued": 27,
    "runners_available": 9,
    "runners_total": 10
  }
}
```

- `runners_total`: the sum of alive runners, whether they are running jobs or not.
- `runners_available`: the sum of alive runners that are not currently running jobs.
- `queued`: is the number of queued tasks against the cluster.
- `type`: tells us the current state of an instance. It may be one of: `ADD, LIVE, KILL, TERMINATE`
    - `ADD` means that this instance was created with the given cloud provider, we are waiting for it to boot and start up the runner service.
    - `LIVE` means that runners are running on that instance, processing jobs.
    - `KILL` means that we are waiting for all of the runners to finish their jobs before terminating the instance.
    - `TERMINATE` means that the instance has been terminated with the given cloud provider.


### <a name="create_cluster"></a> Create Cluster

This is used to create new clusters.

#### Endpoint

<div class="grey-box">
    POST /clusters/<span class="variable cluster_id">{Cluster ID}</span>
</div>

#### URL Parameters

* **Cluster ID**: The ID of the cluster.

#### Request

The request should be JSON encoded and look like the following.

```json
{
    "name": "REQUIRED",
    "memory": 536870912,
    "disk": 10737418240,
    "autoscale":
    {
        "aws":
        {
            "region": "us-east-1",
            "access_key_id": "REQUIRED",
            "secret_access_key": "REQUIRED",
            "instance_type": "c3.xlarge",
            "image_id": "ami-cbfdb2a1",
            "tags":
            {
                "Name": "Iron: Autoscaled IronWorker Instance $ID"
            },
            "key_name": "",
            "subnet_ids": [""],
            "availability_zones":[""],
            "security_groups": [""],
            "security_group_ids": [""],
            "iam_instance_profile":
            {
                "name": "",
                "arn": ""
            },
            "block_device_mappings":
            [
                {
                    "device_name": "",
                    "no_device": "",
                    "virtual_name": "",
                    "ebs":{
                        "snapshot_id": ""
                        "iops": 0,
                        "encrypted": false,
                        "delete_on_termination": false,
                        "volume_size": 0,
                        "volume_type": ""
                    }
                }
            ]
            "user_data":"SEE BELOW",
        },
        "disable":false,
        "runners_min": 0,
        "runners_max": 0,
        "runners_per_instance": 0,
        "docker_auth": "REQUIRED",
        "docker_email": "REQUIRED"
    }
}
```
- `name`: is a required field that must be non empty, this field does not have to be unique to your other clusters but can be useful for humans to differentiate clusters.
- `memory`:
    - `default`: 512MB
    - `details`: The amount of memory that we allocate for each individual job runner. When paired with dynamically allocating the number of runners on an instance, this can be used to scale the number of runners per instance. This setting depends largely on the jobs that will be running on the cluster and different users will benefit more from different settings. If your jobs tend to not need nearly this much memory, reducing this number can lead to more runners being able to run on an instance, of course at the cost of more jobs sharing the network, disk, cpu, kernel, etc. If your jobs ever get killed for running out of memory, we recommend increasing this number. If you have a number of different jobs that run on your cluster, and only some of them need more or less RAM, we recommend creating a separate cluster to run those jobs on.
- `disk`:
    - `default`: 10GB.
    - `details`: This is a gross over approximation to simply avoid hitting any limits. If your jobs require nearly that much disk space, you will want to make sure to have instances that have disk * runners per instance available on the host and carefully consider the value of this setting.
- `autoscale`: fields documented below. Currently, the only "cloud" supported is AWS.
- `region`:
    - `default`: us-east-1
    - `details`: All other AWS regions are currently supported.
- `access_key_id` and `secret_access_key`: required for aws. These fields are encrypted on the server before being stored and will never be shown in output after being set. Below is an example IAM Policy document that shows the minimum permissions we need for the credentials you are handing over. For the below IAM Policy, you'll need to replace `$region` and `$account` with your desired region and account number. Any field with * could be given more granular access if desired (and we recommend you do, even if we won't do anything cute). We mostly just need the ability to create instances, tag instances, describe instances (in order to determine their status, we only inspect our instances), and terminate instances, but there are some extras tied specifically to creating instances that are more detailed. For further information, consult https://docs.aws.amazon.com/AWSEC2/latest/APIReference/ec2-api-permissions.html

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "sts:DecodeAuthorizationMessage",
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2:CreateTags",
                "ec2:DescribeInstances"
            ],
            "Resource":"*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2:RunInstances"
            ],
            "Resource": [
                "arn:aws:ec2:$region:$account:instance/*",
                "arn:aws:ec2:$region:$account:network-interface/*",
                "arn:aws:ec2:$region:$account:security-group/*",
                "arn:aws:ec2:$region:$account:key-pair/*",
                "arn:aws:ec2:$region:$account:subnet/*",
                "arn:aws:ec2:$region:$account:volume/*",
                "arn:aws:ec2:$region::image/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2:TerminateInstances"
            ],
            "Resource": [
                "arn:aws:ec2:$region:$account:instance/*"
            ],
            "Condition": {
                "StringEqualsIgnoreCase": {
                    "ec2:ResourceTag/Owner": "Iron.io"
                }
            }
        }
    ]
}
```

- `instance_type`:
    - `default`: c3.xlarge
    - `details`: With the default memory setting of 512MB this yields 14 runners. Instance types that will work out of the box for aws with the default user_data are: m3, c3, r3, g2, i2, d2. If you would like to use an instance from another family, you will need to make sure that you have an ebs drive mounted on /mnt if you want to use the default user_data. Tasks have varying workloads and your mileage may vary to which instance types are ideal for your tasks. If you want to run interesting instance configurations we recommend contacting `support@iron.io` so that we can work with you. This does mean that a cluster has homogeneous instances as long as the instance type doesn't change. This is how we run our own clusters and find it ideal, it also helps in calculating the scaling factors and keeping costs down.
- `image_id`:
    - `default`: CoreOS Stable Release
    - `details`: We use CoreOS for many of our internal servers and recommend it. It boots about 3x as fast as Ubuntu and already has Docker installed; boot time for autoscale is critical in reducing resource costs. If you'd like to use an ami of a different flavor, you'll need to bring your own user_data, see the user_data section below for more information.
- `tags`:
    - `default`: {"Name": "Iron: Autoscaled IronWorker Instance Instance"}
    - `details`: If tags is specified, then we won't insert the default "Name" object. "Name" is a special tag in AWS because it is what they use to display the instances in their dashboard. If you'd like to specify your own name or any other tags for the instance, you can do this here, we'll apply all of the given tags to each instance we launch after that point in time. Since AWS does not allow tagging the instance when creating it, it is possible that we create instances that are not tagged if we have errors tagging the instance; we will still track these instances, but this behavior is worth noting for users who want to build tools, and is why we recommend creating subnets specifically for each autoscaled cluster. Also, if any of the necessary permissions require certain tags on the instance, manual intervention may be necessary if we experience issues tagging your instances (such as termination). Updating tags will merge the new tags with the old tags, overwriting any with the same key.
- `key_name`:
    - `default`: none
    - `details`: This is the name of the SSH key to attach to your instance. This means by default we attach no SSH key to your instance, making it effectively inaccessible. This mode will work fine, however if you'd like ssh access to the instances for whatever reason, feel free to specify a key here.
- `subnet_ids`:
    - `default`: none
    - `details`: By default your instances will be spun up in EC2 classic. This is not ideal, but it will work. We recommend setting up at least one VPC, with different subnets for each of your clusters. subnet_ids takes a list of subnet id strings. If you specify more than one, we will attempt to uniformly distribute instances among those subnets. We recommend using at least two subnets in two separate availability zones to be tolerant of an availability zone outage.
- `availability_zones`:
    - `default`: none
    - `details`: This setting can be used in place of subnet_ids for non-vpc deployments to spread placement across availability zones or restrict instance creation to certain availability zones.
- `security_groups` and `security_group_ids`:
    - `default`: none
    - `details`: You may use one or the other. Default VPC / ec2-classic may use security_groups, non-default VPC must use security_group_ids. Neither of these are necessary, and if you specify neither one the default security group will be applied to your instances as you have it configured in your ec2 environment.
- `iam_instance_profile`:
    - `default`: none
    - `details`:The value should be a struct containing either an arn or name string value. Please refer to AWS documentation for details about IAM Instance Profiles. You may need to add an Action: `iam:PassRole` with your instanceProfile as the Resource to the IAM Policy for the account that creates instances.
- `block_device_mappings`:
    - `default`: none
    - `details`: It is used to attach additional EBS volumes or instance stores on launch. Refer to the AWS Block Device Mapping
    documentation for more information about the configurable fields. https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/block-device-mapping-concepts.html
        - `device_name`: The device name exposed to the instance (for example, /dev/sdh or xvdh). ebs Structure containing ebs block drive settings
        - `no_device`: Suppresses the specified device included in the block device mapping of the AMI.
        - `virtual_name`: The virtual device name (ephemeralN). Instance store volumes are numbered starting from 0. An instance type with 2 available instance store volumes can specify mappings for ephemeral0 and ephemeral1.The number of available instance store volumes depends on the instance type. After you connect to the instance, you must mount the volume. Constraints: For M3 instances, you must specify instance store volumes in the block device mapping for the instance. When you launch an M3 instance,we ignore any instance store volumes specified in the block device mapping for the AMI.
        - `delete_on_termination`: Indicates whether the EBS volume is deleted on instance termination.
        - `encrypted`: Indicates whether the EBS volume is encrypted. Encrypted Amazon EBS volumes may only be attached to instances that support Amazon EBS encryption.
        - `iops`: The number of I/O operations per second (IOPS) that the volume supports. Constraint: Range is 100 to 20000 for Provisioned IOPS (SSD) volumes.
        - `snapshot_id`: The ID of the snapshot.
        - `volume_size`: The size of the volume, in GiB. Default: If you're creating the volume from a snapshot and don't specify a volume size, the default is the snapshot size.
        - `volume_type` The volume type. gp2 for General Purpose (SSD) volumes, io1 for Provisioned Default: standard
- `user_data`
    - `default`: large blob of yaml (see below)
    - `details`: This is a coreos friendly (exclusive) configuration file for the instance that will set some more sane networking settings (yay experience), format a drive and mount it on /mnt and then start the runner. You are welcome to modify this to your needs or completely roll your own. For more detailed docs on the cloud config format, see https://coreos.com/os/docs/latest/cloud-config.html and https://cloudinit.readthedocs.org/en/latest/index.html. As a convenience, we offer the following variables that we can fill in for you at launch time in order to help keep your credentials secure:

    - {% raw %}{{.DockerAuth}}{% endraw %}
    - {% raw %}{{.DockerEmail}}{% endraw %}
    - {% raw %}{{.ClusterId}}{% endraw %}
    - {% raw %}{{.ClusterToken}}{% endraw %}
    - {% raw %}{{.RunnersVersion}}{% endraw %}

        For details on the docker credentials, see below sections on docker_auth and docker_email. You can also hard code these if you'd like, however we don't recommend it as anyone that has access to your cluster will be able to see your cluster token and docker credentials in the user data section. A secure alternative to all of this would be building an ami that has all of this baked in and then specifying that ami in image_id. If you're building your own user_data it's important to mount all of the runner directories shown to a host volume that has plenty of space (by default, /mnt), and most of the other flags sent to the runner as shown by default, --privileged included, are required.

```
#cloud-config

write_files:
  - path: /etc/modules-load.d/nf.conf
    content: |
      nf_conntrack
      nf_conntrack_ipv4
  - path: /etc/sysctl.d/nf.conf
    permissions: 0644
    owner: root
    content: |
      net.netfilter.nf_conntrack_tcp_timeout_established = 600
      net.netfilter.nf_conntrack_generic_timeout = 60
      net.netfilter.nf_conntrack_tcp_timeout_unacknowledged = 30
      net.netfilter.nf_conntrack_max=524288
  - path: /home/core/.dockercfg
    owner: core:core
    permissions: 0644
    content: |
      {
        "https://index.docker.io/v1/": {
          "auth": "{{.DockerAuth}}",
          "email": "{{.DockerEmail}}"
        }
      }
  - path: /etc/systemd/system/docker.service.d/increase-ulimit.conf
    owner: core:core
    permissions: 0644
    content: |
      [Service]
      LimitMEMLOCK=infinity
      LimitNOFILE=262144

coreos:
  update:
    reboot-strategy: off
  units:
    - name: docker.service
      command: restart # restart docker for new ulimits
    - name: systemd-modules-load.service
      command: restart
    - name: systemd-sysctl.service
      command: restart
    - name: format-mnt-data.service
      command: start
      content: |
        [Unit]
        Description=Format the data drive
        [Service]
        Type=oneshot
        RemainAfterExit=yes
        ExecStart=/usr/sbin/mkfs -t ext4 /dev/xvdb
    - name: mnt.mount
      command: start
      content: |
        [Unit]
        After=format-mnt-data.service
        Wants=format-mnt-data.service
        [Mount]
        What=/dev/xvdb
        Where=/mnt
        Type=ext4
    - name: runner.service
      command: start
      content: |
        [Unit]
        Description=IronRunner
        After=docker.service
        Requires=docker.service

        [Service]
        User=core
        EnvironmentFile=/etc/environment
        Restart=on-failure
        TimeoutStartSec=0
        ExecStartPre=-/usr/bin/docker kill runner
        ExecStartPre=-/usr/bin/docker rm runner
        ExecStartPre=/usr/bin/bash -c '/usr/bin/docker pull iron/runner'
        ExecStart=/usr/bin/bash -c '/usr/bin/docker run --name runner --net=host --privileged -v /mnt:/var/lib/docker -v /mnt:/mnt -e "CLUSTER_ID={{.ClusterId}}" -e "CLUSTER_TOKEN={{.ClusterToken}}" iron/runner'
        ExecStop=/usr/bin/docker stop runner`
```

- `disable`:
    - `default`: false
    - `details`: When set to true it means that autonomous addition or deletion of runners will be disabled on a cluster and the configuration will remain static, less any outstanding additions or deletions that were in progress at the time disable was set to true, those transitions will be completed. Any manual adjustments of runner instances can still be made through the API and they will be carried out like normal. This facility is useful when one would like to disable autoscale but let tasks complete on a cluster first or leave instances up for debugging purposes without the autoscaler killing them, as two examples.
- `runners_min`:
    - `default`: 0
    - `details`: If there are no tasks on your cluster for long enough this means all instances will be terminated. This is the most cost effective solution for people who have 'bursty' traffic, however it means upon 'burst' from an idle cluster that there will be a few minutes delay in jobs beginning to process. If this is undesirable, you can set runners_min to a higher number and we will both spin up and leave up at least enough instances to maintain that runner count, regardless of traffic. Note that if you have 12 runners per instance, setting runners_min to 13 will cause 2 instances (24 runners) to stay up, resulting in double the cost of setting runners_min to 12 during an idle period, in this example. This setting is very dependent on tolerance to how fast jobs need to be processed. We recommend being as conservative (and patient!) as possible, but of course different people have different needs. If you have 'bursty' traffic with long idle periods, setting runners_min to 1 can reduce queue times significantly when the burst begins and still be relatively cost effective. For users with very large bursts, that cannot tolerate jobs being queued for a few minutes, we recommend setting this number higher so long as you can tolerate the subsequent cost; the specific numbers you will need to figure out, but 100 or 250 should be a good starting range to test. If the number of runners that are available is much larger than 0, consider lowering this number; if queue times are still not satisfactory during a burst, consider raising this number. All that being said, if you have a constant rate of traffic or gradually increasing or decreasing number of jobs, we do not recommend changing runners_min to be greater than 0 -- this is 95% of users, so we do not recommend changing this setting unless you have deemed it necessary. Our algorithm will adapt to your traffic typically within a few minutes when queue times begin to increase, and in most cases this means that queue time increases are barely noticeable. This setting is only effective if you ever experience long idle periods or very large bursts, otherwise we will typically allocate a satisfactory number of runners as fast as possible.
- `runners_max`:
    - `default`: 0
    - `details`: This means by default we will spin up as many instances as we are allowed to during periods of extremely high traffic. Many clouds will put an upper bound on the number of instances an account is allowed to spin up (typically broken down by instance type), so we end up bound on that. If this is a concern for you, consider setting runners_max or your cloud account's instance capacity. There is also the potential to use this setting to put an upper bound on the amount of instances we spin up for cost reasons, especially if you have a very high traffic rate but are tolerant to longer queue times for jobs. Note that we may exceed this number by up to the number of runners per instance, after which we will stop adding more instances. For example, if runners_max is set to 28, and there are 12 runners per instance, during periods of high traffic we may have 36 runners total, or 3 instances; if this is an issue, set runners_max to a number evenly divisible by the number of instances. Also, setting this number lower than the current total runner count will not result in us killing off instances to reach this number; once traffic dips below that number we simply won't add more than that number of instances. This behavior is subject to change. Most users do not need to use this setting, and can leave it as the default of 0 (off).
- `runners_per_instance`:
    - `default`: 0
    - `details`: Using the default of 0 will dynamically allocate the number of runners per instance at runtime based off of the memory setting for the cluster. Dynamic allocation is recommended for most users that are not cpu, disk or network bottlenecked; from our experience this is a large percentage of jobs. If you want to give more resources to each runner, you can set this setting to a lower number than what we are allocating. This setting is entirely dependent upon the jobs being run against the cluster. Most users should use the default setting of 0 (dynamic), and adjust the memory setting to their needs if jobs are running closer to memory limits or are running with too much memory available, there's a chance to reduce that number and increase the number of runners per instance.
- `docker_auth`:
    - `default`: none
    - `details`: This is a base64(<username>:<password>) of your docker hub credentials. If you have run docker login on your own environment before, you should be able to locate yours by inspecting $HOME/.dockercfg, otherwise it is easy enough to generate. docker_email is the accompanying email address for the docker_auth credentials. We need these credentials in order to pull the iron/runner image onto your instance. We recommend making a user solely for this purpose and then allowing us to give access to the iron/runner image to that user; this user should have no access to any of your teams or otherwise private repos. We store your credentials securely using encryption on our servers and they will always be passed using secure network protocols.


#### Response

The response will be a JSON object.

Sample:

```json
{
  "msg": "Cluster updated"
}
```

### <a name="update_cluster"></a> Update Cluster

You can update specific parts of the cluster by making a PUT request with the
field you would like to update.

#### Endpoint

<div class="grey-box">
    PUT /clusters/<span class="variable cluster_id">{Cluster ID}</span>
</div>

#### URL Parameters

* **Cluster ID**: The ID of the cluster.

#### Request

The request should be JSON-encoded and contain the information you would like
to update. This follows the same structure as `Create Cluster`.

Sample:

```
{
  "autoscale": {
    "aws": {
        "region": "us-east-1"
    }
  }
}
```

This will update the region of the cluster.

#### Response

The response will be a JSON object.

Sample:

```json
{
  "msg": "Cluster updated"
}
```

### <a name="delete_cluster"></a> Delete Cluster

Cluster delete will delete a cluster completely.

`NOTE`: Deleting a cluster with autoscale enabled will immediately terminate all instances for that cluster. This means that any tasks that are running will be unsafely shut down. If you desire to delete an autoscaled cluster, we recommend that there be no tasks running when you do so.

#### Endpoint

<div class="grey-box">
    DELETE /clusters/<span class="variable cluster_id">{Cluster ID}</span>
</div>

#### URL Parameters

* **Cluster ID**: The ID of the cluster.

#### Response

The response will be a JSON object.

Sample:

```json
{
  "msg": "Cluster deleted"
}
```

### <a name="terminate_cluster_instances"></a> Terminate Cluster Instances

If you would like to terminate instances for whatever reason (if the disk is full or docker died or you just don't like how it was looking at you), we recommend using this endpoint rather than terminating the instances directly through the cloud provider, so that tasks will finish safely. After tasks on these instances finish, they will be terminated. If there are still jobs to do or if this puts you below the minimum number of runners, then autoscaler will add new machines to get the cluster back to equilibrium after these instances are terminated.

#### Endpoint

<div class="grey-box">
    POST /clusters/<span class="variable cluster_id">{Cluster ID}</span>/terminate
</div>

#### URL Parameters

* **Cluster ID**: The ID of the cluster.


#### Request

The request should be JSON-encoded and contain the following information:

- **instance_ids**: The instance ids of the instances to terminate.

Sample:

```
{
  "instance_ids":["i-aaabbb"]
}
```

#### Response

The response will be a JSON object.

Sample:

```json
{
  "msg": "Instances scheduled for terminated"
}
```
