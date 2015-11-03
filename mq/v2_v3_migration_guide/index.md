---
title: IronMQ v3 Migration Guide
summary: "The complete guide to moving your app from IronMQ v2 to IronMQ v3"
layout: default
section: mq-v3
---

[IronMQ v3](/mq/3) is the next generation queue product from Iron.io. We built it
from the ground up to be faster, more reliable and more predictable, even when
facing fluctuating workloads. We are recommending that all v2 apps move to v3 as
soon as possible to take advantages of these stability and performance improvements.

This document explains those differences and walks you through the steps you
need to take to make your app work with v3.

# Step 1: Understand `post-reserve-delete`

We designed v3 to be as similar as possible to v2, but decided to make one minor
conceptual difference to the API: the `post-reserve-delete` workflow.

This workflow differs from v2's `post-get-delete`, and here's how:

- v3's introduces a `reserve` call for clients to use. This call replaces v2's `get` call.
- v3's `get` is only intended to view a message, not for processing it
- `reserve` returns a `reservation_id`, which must be used in later calls to [delete](/mq/3/reference/api/#delete-messages) or [release](/mq/3/reference/api/#release-message) the message, or [extend its reservation](/mq/3/reference/api/#touch-message)

See [IronMQ v3 Basics](/mq/3/reference/api/#changes) for more details on these new concepts.

# Step 2: Update Your Library

If you're using an [officially supported client library](/mq/3/libraries/), simply change
your dependency to use the `v3` branch. If you're confused about how to do this, please
[contact our support team](/support/).

If you're using a third party library, you may need to alter it to reflect the new IronMQ v3
API. See the [IronMQ v3 changelog](/mq/3/reference/api/#changes) for an
overview of what's changed and how you should alter the client to work with v3.

# Step 3: Audit Your app

Now that you're using a v3-compatible client, we recommend that you audit your codebase
to ensure it works with the new `post-reserve-delete` workflow and to avoid potential
production problems. Here is a list of issues to look for:

1. __Use `reserve` instead of `get`.__ The v2 `get` API method has been replaced
by v3's `reserve`
2. __Create your queues with reasonable default message timeouts.__ All reserved messages
automatically time out after that default duration unless otherwise specified in the [API call](/mq/3/reference/api/#reserve-messages). You can specify these
timeouts in the [create queue call](/mq/3/reference/api/#create-queue)
3. __Keep track of reservation IDs.__ The [delete call](/mq/3/reference/api/#delete-message)
will fail without it if you try on a reserved message
4. __Ensure reservations are not timing out frequently.__ If they are, increase the message
timeouts so that your code has more time to process each message
