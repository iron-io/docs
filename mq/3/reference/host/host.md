---
title: Choosing the Cluster Your Queues Run On
section: mq v3
breadcrumbs:
  - ['Reference', '/reference']
  - ['Choosing the Cloud Your Queues Run On', '/clouds']
layout: default
---

<p>IronMQ v3 public clusters are available in 2 locations. To use Iron.io on another cloud (private or public) please reach out to <a href='mailto:sales@iron.io'>Iron.io</a> and we can assist.

<p>Our public cluster options are:

```bash
mq-aws-eu-west-1-1.iron.io
mq-aws-us-east-1-1.iron.io
mq-aws-us-east-1-2.iron.io
```

<p>This will get set in a number of different ways, but here is a selection of examples for posting a single message to a pull queue.

  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#curl">cURL</a></li>
    <li><a href="#ruby">Ruby</a></li>
    <li><a href="#go">Go</a></li>
    <li><a href="#java">Java</a></li>
    <li><a href="#python">Python</a></li>
    <li><a href="#php">PHP</a></li>
    <li><a href="#node">Node</a></li>
    <li><a href="#net">.Net</a></li>
  </ul>  
</section>

<p>The basic format is very similar for most major languages. These examples are using the ```mq-aws-eu-west-1-1.iron.io``` cluster, but that should be changed for your needs:

<h3 id='curl'>cURL</h3>
```bash
curl -X POST -H "Authorization: OAuth <$token>" -H "Content-Type: application/json" -H "Cache-Control: no-cache"  -d '{
  "messages": [
    {
      "body": "This is my message 1.",
      "delay": 0
    }
  ]
}' "https://mq-aws-eu-west-1-1.iron.io/3/projects/57f7cf0ece60dc0007dd3659/queues/queueNamesGoesInHere/messages"
```

<h3 id='ruby'>Ruby</h3>
```ruby
require 'uri'
require 'net/http'

url = URI("https://mq-aws-eu-west-1-1.iron.io/3/projects/57f7cf0ece60dc0007dd3659/queues/queueNamesGoesInHere/messages")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Post.new(url)
request["authorization"] = 'OAuth <$token>'
request["content-type"] = 'application/json'
request["cache-control"] = 'no-cache'
request.body = "{\n  \"messages\": [\n    {\n      \"body\": \"This is my message 1.\",\n      \"delay\": 0\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

<h3 id='go'>Go</h3>
```go
package main

import (
  "fmt"
  "strings"
  "net/http"
  "io/ioutil"
)

func main() {

  url := "https://mq-aws-eu-west-1-1.iron.io/3/projects/57f7cf0ece60dc0007dd3659/queues/queueNamesGoesInHere/messages"

  payload := strings.NewReader("{\n  \"messages\": [\n    {\n      \"body\": \"This is my message 1.\",\n      \"delay\": 0\n    }\n  ]\n}")

  req, _ := http.NewRequest("POST", url, payload)

  req.Header.Add("authorization", "OAuth <$token>")
  req.Header.Add("content-type", "application/json")
  req.Header.Add("cache-control", "no-cache")

  res, _ := http.DefaultClient.Do(req)

  defer res.Body.Close()
  body, _ := ioutil.ReadAll(res.Body)

  fmt.Println(res)
  fmt.Println(string(body))

}
```

<h3 id='java'>Java</h3>
```java
OkHttpClient client = new OkHttpClient();

MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\n  \"messages\": [\n    {\n      \"body\": \"This is my message 1.\",\n      \"delay\": 0\n    }\n  ]\n}");
Request request = new Request.Builder()
  .url("https://mq-aws-eu-west-1-1.iron.io/3/projects/57f7cf0ece60dc0007dd3659/queues/queueNamesGoesInHere/messages")
  .post(body)
  .addHeader("authorization", "OAuth <$token>")
  .addHeader("content-type", "application/json")
  .addHeader("cache-control", "no-cache")
  .build();

Response response = client.newCall(request).execute();
```

<h3 id='python'>Python</h3>
```python

url = "https://mq-aws-eu-west-1-1.iron.io/3/projects/57f7cf0ece60dc0007dd3659/queues/queueNamesGoesInHere/messages"

payload = "{\n  \"messages\": [\n    {\n      \"body\": \"This is my message 1.\",\n      \"delay\": 0\n    }\n  ]\n}"
headers = {
    'authorization': "OAuth <$token>",
    'content-type': "application/json",
    'cache-control': "no-cache",
    }

response = requests.request("POST", url, data=payload, headers=headers)

print(response.text)
```

<h3 id='php'>PHP</h3>
```php
<?php

$request = new HttpRequest();
$request->setUrl('https://mq-aws-eu-west-1-1.iron.io/3/projects/57f7cf0ece60dc0007dd3659/queues/queueNamesGoesInHere/messages');
$request->setMethod(HTTP_METH_POST);

$request->setHeaders(array(
  'cache-control' => 'no-cache',
  'content-type' => 'application/json',
  'authorization' => 'OAuth <$token>'
));

$request->setBody('{
  "messages": [
    {
      "body": "This is my message 1.",
      "delay": 0
    }
  ]
}');

try {
  $response = $request->send();

  echo $response->getBody();
} catch (HttpException $ex) {
  echo $ex;
}
```

<h3 id='node'>Node</h3>
```js
var request = require("request");

var options = { method: 'POST',
  url: 'https://mq-aws-eu-west-1-1.iron.io/3/projects/57f7cf0ece60dc0007dd3659/queues/queueNamesGoesInHere/messages',
  headers: 
     'cache-control': 'no-cache',
     'content-type': 'application/json',
     authorization: 'OAuth <$token>' },
  body: { messages: [ { body: 'This is my message 1.', delay: 0 } ] },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

<h3 id='net'>.Net</h3>
```net
var client = new RestClient("https://mq-aws-eu-west-1-1.iron.io/3/projects/57f7cf0ece60dc0007dd3659/queues/queueNamesGoesInHere/messages");
var request = new RestRequest(Method.POST);
request.AddHeader("cache-control", "no-cache");
request.AddHeader("content-type", "application/json");
request.AddHeader("authorization", "OAuth <$token>");
request.AddParameter("application/json", "{\n  \"messages\": [\n    {\n      \"body\": \"This is my message 1.\",\n      \"delay\": 0\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```





