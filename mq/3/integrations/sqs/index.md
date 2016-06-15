---
title: Amazon SQS Protocol
layout: default
section: mq-v3
---

## Amazon

IronMQ implements an alternative API that is compatible with Amazon's SQS API.

To use this API, configure your client so that your AWS access key ID is set to
your Iron.io project ID, followed by a colon, followed by the token you want to
use. For example, if your project ID is 69b49b5231077ba1df050570 and your token is CGDrfv0D432IPclkO34, you set your access key ID to:

    69b49b5231077ba1df050570:CGDrfv0D432IPclkO34

Your secret key can be anything and does not matter.

You must also configure your client's service URL to the IronMQ host that you
wish to use.

## Feature Support

There are some features that aren't supported by our SQS interface.

The following queue actions are unsupported:

* AddPermission
* ChangeMessageVisibilityBatch
* DeleteMessageBatch
* ListDeadLetterSourceQueues
* RemovePermission
* PurgeQueue
* SendMessageBatch

The following queue attributes are unsupported:

* CreatedTimestamp
* DelaySeconds
* LastModifiedTimestamp
* MaximumMessageSize
* Policy
* QueueArn
* RedrivePolicy
