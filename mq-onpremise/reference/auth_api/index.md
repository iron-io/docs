---
title: IronAuth API
summary: "IronAuth API used to authenticate users that hit the IronMQ API."
layout: default
section: mq-onpremise
---

## Objects (json)

Not all fields are required.

```js
<token> {
  "_id"
  "user_id"
  "type"
  "name"
  "token"
  "admin"                bool
}
```



```js
<project> {
  "id"
  "user_id"
  "name"
  "type"
  "partner"
  "status"
  "total_duration"
  "max_schedules"
  "schedules_count"
  "task_count"
  "hourly_task\_count"
  "hourly_time"          time.Time
  "flags"                map[string]bool
  "shared_with"          []id
}
```



```js
<user> {
  "user_id"
  "email"
  "password"
  "tokens"                []string
  "status"
  "plan_worker"
  "flags"                 map[string]interface{}
}
```

## Endpoints

### Authentication

HEADER: `Authorization` alternatively (add query string of `oauth`)

* **project_id**: Request Query String

GET `/1/authentication`

Response: 200 or 403

```js
{}
```

## Login (for HUD)

HEADER: application/json (no token/oauth)

POST `/1/authentication`

Request:

```js
request: {
  email: <email>,
  password: <password>
}
```

Response:

```js
response: {
  user object
}
```

All other endpoints require Authorization HEADER

## Tokens

POST `/1/tokens`

```js
request: {
  <token>
}
response: {
  <token>
}
```

DELETE `/1/tokens/{token_id}`

```js
response: {
  msg: success/fail
}
```

## Users

POST `/1/users`
```js
request: {
    email:  <insert user email>
  password: <user password>
}
response: {
  <user>
}
```

GET `/1/users`

#### URL query params:

 * **previous**: to paginate, the id of the last user from the last page; if not specified, will start from beginning.
 * **per_page**: size of the list to return. Default: 30, max: 100.
  

```js
response: {
  "users": [
    <user1>, <user2>, ...
  ]
}
```

GET `/1/users/{user_id_or_email}`

```js
response: {
  <user>
}
```

PATCH `/1/users/{user_id_or_email}`

```js
request: {
  email: <optional field>
  password: <optional field>
}

response: {
  <user>
}
```

DELETE `/1/users/{user_id_or_email}`

```js
response: {
  msg: "success/fail"
}
```

## Projects

POST `/1/projects`

```js
request: {
    name:  <insert project name>
}
```

```js
response: {
  <project>
}
```

GET `/1/projects/{project_id}`

```js
response: {
  <project>
}
```

DELETE `/1/projects/{project_id}`

```js
response: {
  msg: success/fail
}
```

PATCH `/1/projects/{project_id}/share`
PATCH `/1/projects/{project_id}/unshare`

```js
request: {
  []user_id
}
```