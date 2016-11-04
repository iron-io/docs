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

The basic process is to create new queues, or auto migrate them, update any client libraries you are using, and audit any code to use the new libraries.

Review the [changes between IronMQ v2 and v3](#changes) before you begin the migration process.

## Step 1: Create IronMQ v3 Queues

There are 2 ways to start using IronMQ v3. You can manually re-create your queues, *or* you can use the automated queue migration tool.

### Manual Queue Migration

1. Log into the new <a href='https://hud-e.iron.io'>Hud-e</a> dashboard.
2. Create a new project using the "+ New Project" button.
3. In the new project, choose a cluster region from the cluster dropdown menu.
4. Create a new queue using the "Create Queue" button.

### Automated Queue Migration

1. Log into <a href='//hud.iron.io'>hud.iron.io</a> and view the project you want to migrate.
2. Press the "Migrate to v3!" button.
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/images/migrateButton.png' style='height:40%; width:76%'>
3. Wait while your queues are created in v3, and messages are moved into the new queue.
4. Log into your <a href='//hud-e.iron.io'>Hud-E</a> account, choose the proper cluster location, and all your queues will be there.

The automated queue migration will create a project and queues with the same name your existing project and queues; and it will copy over any messages currently in the queues.

After you go to your Hud-E account, <b>if you do not see your queue, don't worry</b>! In the new HUD-e dashboard you can switch between cluster views to show queues specific to the selected cluster.
<img src="/images/mq/v2_v3_migration_guide/choose_cluster.png" width="100%">
<br><br>
If your queues were in aws-us-east-1, you will need to select that mq-aws-us-east-1-1 to view them.


## Step 2: Update your Iron.io client library

**The v2 client libraries will NOT work with IronMQ v3.**

### Official client libraries

Update the [client libraries](/mq/3/libraries/) for your projects. The
libraries are available through our [Dev Center](/mq/3/libraries/) and github.

If you have any questions, please
contact the [Iron.io support team](/support/).

### Community support client libraries

If you are using a third party library, you should check with the maintainer
for updates. If there are no updates, you may need to alter the library
yourself to reflect the new IronMQ v3 API. See the [IronMQ v3 changelog](/mq/3/reference/api/#changes) for an overview of what is changed,
and how you should update the client to be compatible with v3.

## Step 3: Audit Your App

Review the [changes between IronMQ v2 and v3](#changes) to help you better know which parts of your code needs to be updated.

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

## <a name="changes"></a>Differences and changes between IronMQ v2 and v3

See [IronMQ v3 Basics](/mq/3/reference/api) for the full API Reference.

### Understand `post-reserve-delete`

We designed v3 to be as similar as possible to v2, but decided to make one
conceptual difference to the API: the `post-reserve-delete` workflow.

This workflow differs from v2's `post-get-delete`, and here is how:

- v3's introduces a `reserve` call for clients to use. This call replaces v2's `get` call.
- v3's `get` is only intended to view a message, not for processing it
- `reserve` returns a `reservation_id`, which must be used in later calls to [delete](/mq/3/reference/api/#delete-messages) or [release](/mq/3/reference/api/#release-message) the message, or [extend its reservation](/mq/3/reference/api/#touch-message)

### Other notable changes

- Can no longer set timeout when posting a message, only when reserving one.
- The webhook URL has changed.
- Push queues must be explicitly created. There's no changing a queue's type.

See [IronMQ v3 Basics](/mq/3/reference/api/#changes) for a full list of changes.
