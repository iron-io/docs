Cluster API for IronWorker
========

This is a premium feature for customers to have access to more powerful or custom built worker solutions. Dedicated worker clusters exist for users who want to reserve a set number of workers just for their queued tasks.

Endpoints
=========

All endpoints require your OAuth token be passed in with the ```Authorization``` header

Example:
```
curl -H 'Authorization: OAuth <token redacted>' worker-us-east.iron.io/2/clusters
```

#### Cluster credentials
```
GET worker-us-east.iron.io/2/{cluster_id}/credentials

response: {
  cluster: {
    id: <cluster_id>,
    tokens: []
  }
}
```

#### List clusters
```
GET worker-us-east.iron.io/2/clusters
```

```
GET worker-us-east.iron.io/2/clusters/shared
```

#### Cluster sharing

```
POST worker-us-east.iron.io/2/clusters/{cluster_id}/share

request: {
     email: <email>
}

response: {
     msg: success/fail
}
```

```
POST worker-us-east.iron.io/2/clusters/{cluster_id}/unshare/{user_id}

response: {
     msg: success/fail
}
```

### Cluster management

#### Create cluster

```
POST worker-us-east.iron.io/2/clusters/

request: {
  cluster: <cluster_name>

}

response: {
  msg: success/fail
}
```

#### Delete cluster

```
DELETE worker-us-east.iron.io/2/clusters/{cluster_id}

response: {
  msg: success/fail
}
```
