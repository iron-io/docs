---
title: IronCache API Reference
layout: default
section: cache
breadcrumbs:
  - ['Reference', '/reference']
  - ['REST/HTTP API', '/api']
---

IronCache provides a REST/HTTP API to allow you to interact programmatically with your caches on IronCache.

<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#authentication">Authentication</a></li>
    <li>
      <a href="#requests">Requests</a>
      <ul>
        <li><a href="#base_url">Base URL</a></li>
        <li><a href="#pagination">Pagination</a></li>
      </ul>
    </li>
    <li>
      <a href="#responses">Responses</a>
      <ul>
        <li><a href="#status_codes">Status Codes</a></li>
        <li><a href="#exponential_backoff">Exponential Backoff</a></li>
      </ul>
    </li>
  </ul>
</section>

<h2 id="endpoints"> Endpoints </h2>

<table class="reference">
  <thead>
    <tr><th style="width: 58%;">URL</th><th style="width: 10%;">HTTP Verb</th><th style="width: 32%;">Purpose</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>/projects/<span class="project_id variable">{Project ID}</span>/caches</td>
      <td>GET</td><td><a href="#list_caches" title="List Caches">List Caches</a></td>
    </tr>
    <tr>
      <td>/projects/<span class="project_id variable">{Project ID}</span>/caches/<span class="cache_name variable">{Cache Name}</span></td>
      <td>GET</td>
      <td><a href="#get_info_about_a_cache" title="Get Info About a Cache">Get Info About a Cache</a></td>
    </tr>
    <tr>
      <td>/projects/<span class="project_id variable">{Project ID}</span>/caches/<span class="cache_name variable">{Cache Name}</span></td>
      <td>DELETE</td>
      <td><a href="#delete_a_cache" title="Delete a Cache">Delete a Cache</a></td>
    </tr>
    <tr>
      <td>/projects/<span class="project_id variable">{Project ID}</span>/caches/<span class="cache_name variable">{Cache Name}</span>/clear</td>
      <td>POST</td>
      <td><a href="#clear_a_cache" title="Clear a Cache">Clear a Cache</a></td>
    </tr>
    <tr>
      <td>/projects/<span class="project_id variable">{Project ID}</span>/caches/<span class="cache_name variable">{Cache Name}</span>/items/<span class="item_key variable">{Key}</span></td>
      <td>PUT</td>
      <td><a href="#put_an_item_into_a_cache" title="Put an Item into a Cache">Put an Item into a Cache</a></td>
    </tr>
    <tr>
      <td>/projects/<span class="project_id variable">{Project ID}</span>/caches/<span class="cache_name variable">{Cache Name}</span>/items/<span class="item_key variable">{Key}</span>/increment</td><td>POST</td>
      <td><a href="#increment_an_items_value" title="Increment an Item's value">Increment an Item's value</a></td>
    </tr>
    <tr>
      <td>/projects/<span class="project_id variable">{Project ID}</span>/caches/<span class="cache_name variable">{Cache Name}</span>/items/<span class="item_key variable">{Key}</span></td>
      <td>GET</td>
      <td><a href="#get_an_item_from_a_cache" title="Get an Item from a Cache">Get an Item from a Cache</a></td>
    </tr>
    <tr>
      <td>/projects/<span class="project_id variable">{Project ID}</span>/caches/<span class="cache_name variable">{Cache Name}</span>/items/<span class="variable item_key">{Key}</span></td>
      <td>DELETE</td>
      <td><a href="#delete_an_item_from_a_cache" title="Delete an Item from a Cache">Delete an Item from a Cache</a></td>
    </tr>
  </tbody>
</table>

<h2 id="authentication"> Authentication </h2>
IronCache uses OAuth2 tokens to authenticate API requests. All methods require authentication unless specified otherwise. You can find and create your API tokens [in the HUD](https://hud-e.iron.io/tokens). To authenticate your request, you should include a token in the Authorization header for your request or in your query parameters. Tokens are universal, and can be used across services.

Note that each request also requires a Project ID to specify which project the action will be performed on. You can find your Project IDs [in the HUD](https://hud-e.iron.io). Project IDs are also universal, so they can be used across services as well.

**Example Authorization Header**:
Authorization: OAuth abc4c7c627376858

**Example Query with Parameters**:
GET https://cache-aws-us-east-1.iron.io/1/projects/<span class="variable project_id">{Project ID}</span>/caches?oauth=abc4c7c627376858

Notes:

* Be sure you have the correct case, it's **OAuth**, not Oauth.
* In URL parameter form, this will be represented as:
        `?oauth=abc4c7c627376858`

<h2 id="requests"> Requests </h2>

Requests to the API are simple HTTP requests against the API endpoints.

All request bodies should be in JSON format, with Content-Type of `application/json`.

<h3 id="base_url"> Base URL </h3>

All endpoints should be prefixed with the following:

<strong>https://<span class="variable domain project_id">{Host}</span>.iron.io/<span class="variable version project_id">{API Version}</span>/</strong>

<strong>API Version Support</strong> : IronCache API supports version <strong>1</strong>

The domains for the clouds IronCache supports are as follows:
<table class="reference">
  <thead>
    <tr><th style="width: 30%;">Cloud</th><th style="width: 70%;"><span class="variable domain">{Domain}</span></th></tr>
  </thead>
  <tbody>
    <tr><td>AWS</td><td>cache-aws-us-east-1</td></tr>
  </tbody>
</table>

<h3 id="pagination"> Pagination </h3>

For endpoints that return lists/arrays of values:

* page - The page of results to return. Default is 0. Maximum is 100.
* per_page - The number of results to return. It may be less if there aren't enough results. Default is 30. Maximum is 100.

<h2 id="responses"> Responses </h2>

All responses are in JSON, with Content-Type of `application/json`. A response is structured as follows:

```js
{ "msg": "some success or error message" }
```

<h3 id="status_codes"> Status Codes </h3>
The success or failure of a request is indicated by an HTTP status code. A 2xx status code indicates success, whereas a 4xx or 5xx status code indicates an error.

<table class="reference">
    <thead>
        <tr>
            <th style="width: 10%">Code</th><th style="width: 90%">Status</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>200</td><td>OK: Successful GET</td>
        </tr>
        <tr>
            <td>201</td><td>Created: Successful POST</td>
        </tr>
        <tr>
            <td>400</td><td>Bad Request: Invalid JSON (can't be parsed or has wrong types).</td>
        </tr>
        <tr>
            <td>401</td><td>Unauthorized: The OAuth token is either not provided or invalid.</td>
        </tr>
        <tr>
            <td>403</td><td>Project suspected, resource limits.</td>
        </tr>
        <tr>
            <td>404</td><td>Not Found: The resource, project, or endpoint being requested doesn’t exist.</td>
        </tr>
        <tr>
            <td>405</td><td>Invalid HTTP method: A GET, POST, DELETE, or PUT was sent to an endpoint that doesn’t support that particular verb.</td>
        </tr>
        <tr>
            <td>406</td><td>Not Acceptable: Required fields are missing.</td>
        </tr>
        <tr>
            <td>500</td><td>Internal Server Error: Something went wrong on the server side.</td>
        </tr>
        <tr>
            <td>503</td><td>Service Unavailable: A temporary error occurred with the request. Clients should implement <a href="#exponential_backoff" title="Exponential backoff">exponential backoff</a> and retry the request.</td>
        </tr>
    </tbody>
</table>

Specific endpoints may provide other errors in other situations.

When there's an error, the response body contains a JSON object similar to the following:

```js
{ "msg": "reason for error" }
```

<h3 id="exponential_backoff"> Exponential Backoff </h3>

When a 503 error code is returned, it signifies that the server is currently unavailable. This means there was a problem processing the request on the server-side; it makes no comment on the validity of the request. Libraries and clients should use [exponential backoff](http://en.wikipedia.org/wiki/Exponential_backoff) when confronted with a 503 error, retrying their request with increasing delays until it succeeds or a maximum number of retries (configured by the client) has been reached.

## <a name="list_caches"></a> List Caches

Get a list of all caches in a project. 100 caches are listed at a time. To see more, use the page parameter.

### Endpoint

<div class="grey-box">
GET /projects/<span class="variable project_id">{Project ID}</span>/caches
</div>

#### URL Parameters

* **Project ID**: Project these caches belong to

#### Optional URL Parameters

* **page**: The 0-based page to view. The default is 0. See [pagination](#pagination).

### Response

```js
[
  {
    "project_id": "PROJECT ID",
    "name": "CACHE NAME"
  },
  {
    "project_id": "PROJECT ID",
    "name": "CACHE NAME"
  }
]
```

## <a name="get_info_about_a_cache"></a> Get Info About a Cache

This call gets general information about a cache.

### Endpoint

<div class="grey-box">
GET /projects/<span class="variable project_id">{Project ID}</span>/caches/<span class="variable cache_name">{Cache Name}</span>
</div>

#### URL Parameters

* **Project ID**: Project the cache belongs to
* **Cache Name**: The name of the cache

### Response

```js
{
  "size": "cache size"
}
```

## <a name="delete_a_cache"></a> Delete a Cache

Delete a cache and all items in it.

### Endpoint

<div class="grey-box">
DELETE /projects/<span class="variable project_id">{Project ID}</span>/caches/<span class="variable cache_name">{Cache Name}</span>
</div>

#### URL Parameters

* **Project ID**: Project the cache belongs to
* **Cache Name**: The name of the cache

### Response

```js
{
  "msg": "Deleted."
}
```

## <a name="clear_a_cache"></a> Clear a Cache

Delete all items in a cache. This cannot be undone.

### Endpoint

<div class="grey-box">
POST /projects/<span class="variable project_id">{Project ID}</span>/caches/<span class="variable cache_name">{Cache Name}</span>/clear
</div>

#### URL Parameters

* **Project ID**: Project the cache belongs to
* **Cache Name**: The name of the cache whose items should be cleared.

### Response

```js
{
  "msg": "Cleared."
}
```

## <a name="put_an_item_into_a_cache"></a> Put an Item into a Cache

This call puts an item into a cache.

### Endpoint

<div class="grey-box">
PUT /projects/<span class="variable project_id">{Project ID}</span>/caches/<span class="variable cache_name">{Cache Name}</span>/items/<span class="variable item_key">{Key}</span>
</div>

#### URL Parameters

* **Project ID**: The project these items belong to.
* **Cache Name**: The name of the cache. If the cache does not exist, it will be created for you.
* **Key**: The key to store the item under in the cache.

#### Item Object

Each item object should contain the following keys:

##### Required

* **value**: The item's data

##### Optional

* **expires_in**: How long in seconds to keep the item in the cache before it is deleted. Maximum is 604,800 seconds (7 days).
* **replace**: If set to true, only set the item if the item is already in the cache. If the item is not in the cache, do not create it.
* **add**: If set to true, only set the item if the item is not already in the cache. If the item is in the cache, do not overwrite it.
* **cas**: If set, the new item will only be placed in the cache if there is an existing item with a matching key and cas value. An item's cas value is automatically generated and is included when the item is <a href="#get_an_item_from_a_cache" title="Get an Item from a Cache">retrieved</a>.

### Request

```js
{
  "value": "This is my cache item.",
  "expires_in": 86400,
  "replace": true
}
```

### Response

```js
{
  "msg": "Stored."
}
```

## <a name="increment_an_items_value"></a> Increment an Item's value

This call increments the numeric value of an item in the cache. The amount must be a number and attempting to increment non-numeric values results in an error. Negative amounts may be passed to decrement the value. The increment is atomic, so concurrent increments will all be observed.

### Endpoint

<div class="grey-box">
POST /projects/<span class="project_id variable">{Project ID}</span>/caches/<span class="cache_name variable">{Cache Name}</span>/items/<span class="item_key variable">{Key}</span>/increment
</div>

#### URL Parameters

* **Project ID**: The project the item belongs to.
* **Cache Name**: The name of the cache. If the cache does not exist, it will be created for you.
* **Key**: The key of the item to increment.

#### Request Parameters

The request body should contain the following keys:

##### Required

* **amount**: The amount to increment the value, as an integer. If negative, the value will be decremented.

### Request

```js
{
  "amount": 10
}
```

### Response

```js
{
  "msg": "Added",
  "value": 132
}
```

## <a name="get_an_item_from_a_cache"></a> Get an Item from a Cache

This call retrieves an item from the cache. The item will not be deleted.

### Endpoint

<div class="grey-box">
GET /projects/<span class="project_id variable">{Project ID}</span>/caches/<span class="cache_name variable">{Cache Name}</span>/items/<span class="item_key variable">{Key}</span>
</div>

#### URL Parameters

* **Project ID**: The project the cache belongs to.
* **Cache Name**: The name of the cache the item belongs to.
* **Key**: The key the item is stored under in the cache.

### Response

```js
{
  "cache": "CACHE NAME",
  "key": "ITEM KEY",
  "value": "ITEM VALUE",
  "cas": "12345"
}
```

## <a name="delete_an_item_from_a_cache"></a> Delete an Item from a Cache

This call will delete the item from the cache.

### Endpoint

<div class="grey-box">
DELETE /projects/<span class="project_id variable">{Project ID}</span>/caches/<span class="cache_name variable">{Cache Name}</span>/items/<span class="item_key variable">{Key}</span>
</div>

#### URL Parameters

* **Project ID**: The project the cache belongs to.
* **Cache Name**: The name of the cache the item belongs to.
* **Key**: The key the item is stored under in the cache.

### Response
```js
{
  "msg": "Deleted."
}
```
