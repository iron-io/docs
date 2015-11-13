---
title: IronMQ v3 Migration Guide
summary: "The guide to moving your app from IronMQ v2 to IronMQ v3"
layout: default
section: mq-v3
---

[IronMQ v3](/mq/3) is the next generation queue from Iron.io. We built it
from the ground up to be fast, reliable and predictable; even when
faced with fluctuating workloads. We recommend that all v2 users migrate to v3
 to take advantages of these stability and performance improvements.

There are 2 ways to migrate from v2 to v3, automated migration or manual migration. In this article, we'll cover both
# Automated Migration

### Step 1: Log into <a href='hud.iron.io'>hud.iron.io</a> and access your message Queues

### Step 2: Press the Migrate to v3 button<br />
<img style='width: 500px !important;' src='https://d1ro8r1rbfn3jf.cloudfront.net/ms_89572/XJRvFhKp2u0IzrkVs6J3xVO99GBXWV/celeryTest%2B%257C%2BQueues%2B%257C%2BHUD%2B--%2BIron.io%2B2015-11-12%2B17-04-14.png?Expires=1447463074&Signature=TZyRSz9lJM-gtRJM4siclGQp72aByxAJpnUh5wmppDFeXiXUnAuhq11k1Kc3f0UjSwYnCslwRpBhwtF-5wzFwy26ab3Gct6~oijfRIa7GRSyh6KE3vJ3pQwT5Kb9I1TunddzJbhlXgZwZQ-QyerYFzzzg9a2isnUjchhX-8rtMBBWD1uubrj1brVVjzZb9x8icvr9LaQp8VPlCekAvwF-2sTdP~DbCqQwyDnqJk~aQ0wc4qCjV-e9p1V4IpHpplERY1dlK4Di~AAZM3soQB14fQK-Js1A7NAzJ6pRGFdO9t3BUGUOVLvjf9OB6Y02tPrVRu8DL-VmAvpRwF13Tag-Q__&Key-Pair-Id=APKAJHEJJBIZWFB73RSA' />

### Step 3: Go to your <a href='hud-e.iron.io'>Hud-E</a> account, makr sure you are in the proper cluster location, and all your queues will be there.

<h1>Manual migration</h1> 

# Step 1: Understand `post-reserve-delete`

We designed v3 to be as similar as possible to v2, but decided to make one minor
conceptual difference to the API: the `post-reserve-delete` workflow.

This workflow differs from v2's `post-get-delete`, and here is how:

- v3's introduces a `reserve` call for clients to use. This call replaces v2's `get` call.
- v3's `get` is only intended to view a message, not for processing it
- `reserve` returns a `reservation_id`, which must be used in later calls to [delete](/mq/3/reference/api/#delete-messages) or [release](/mq/3/reference/api/#release-message) the message, or [extend its reservation](/mq/3/reference/api/#touch-message)

See [IronMQ v3 Basics](/mq/3/reference/api/#changes) for more details on these new concepts.

# Step 2: Update your Iron.io client library

**The v2 client libraries will NOT work with IronMQ v3.**

### Official client libraries

Update the [client libraries](/mq/3/libraries/) for your projects. The
libraries are available through our [Dev Center](/mq/3/libraries/) and github. Each library on
github has two branches, `master` and `v3`. Make sure you are using the `v3`
branch for your languages' libary.

If you have any questions, please
contact the [Iron.io support team](/support/).

### Community support client libraries

If you are using a third party library, you should check with the maintainer
for updates. If there are no updates, you may need to alter the library
yourself to reflect the new IronMQ v3 API. See the [IronMQ v3 changelog](/mq/3/reference/api/#changes) for an overview of what is changed,
and how you should update the client to be compatible with v3.

# Step 3: Audit Your App

Now that you are using a v3-compatible client library, you will need to audit your codebase
to ensure it uses the new `post-reserve-delete` workflow. Here is a list of issues to look for:

1. __Use `reserve` instead of `get`.__ The v2 `get` API method has been replaced
by v3's `reserve`
2. __Create your queues with reasonable default message timeouts.__ All reserved messages
automatically time out after that default duration unless otherwise specified in the [API call](/mq/3/reference/api/#reserve-messages). You can specify these
timeouts in the [create queue call](/mq/3/reference/api/#create-queue)
3. __Keep track of reservation IDs.__ The [delete call](/mq/3/reference/api/#delete-message)
will fail without it if you try on a reserved message
4. __Ensure reservations are not timing out frequently.__ If they are, increase the message
timeouts so that your code has more time to process each message
