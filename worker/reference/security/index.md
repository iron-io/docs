---
title: Securing Your Workers
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['Securing Your Workers', '/security']
---

# Securing Your Workers

Security has always been an issue when using the power of cloud computing. To have your code running on a system that another company controls is a risk, and boils down to a matter of trust, in most cases. At Iron, we work hard to deserve your trust. We've taken measures to ensure the security of your data in our systems, and we work hard to educate customers on how to make the most of that security. Our mission is to take the stress out of building your cloud infrastructure, and that includes stress about security.

## What We Do

Iron's [API](/worker/reference/api) is the standard way of interacting with your workers. We have **HTTPS encryption** available for our API, and all our official client libraries use it by default. This renders most common packet-interception attacks useless.

Our system uses **sandboxing** to keep workers separated from each other. This means that only your worker can access the data you're sending to it and the source code you upload.

Iron's [API](/worker/refrence/api) also uses the industry-standard [OAuth 2](http://www.oauth.net/2/) authentication scheme to securely authenticate your requests while mitigating the damage that lost or compromised access codes can cause.

Finally, Iron has a **strict policy** that requires **explicit customer approval** before accessing any code or payload data uploaded into our system. Your workers are *yours*, and we respect your privacy.

## What You Can Do

Always upload sensitive data **in the payload**, rather than embedding it in your code.

Always use **worker-specific** credentials that only your worker depends on, if possible. Limit these credentials to the *only* the services the worker needs access to, if at all possible. This will make changing or mitigating compromised credentials easier.

**Encrypt your sensitive data** before entering it in the payload, then decrypt it in the worker. This requires an attacker to gain access to both the payload *and* the worker's source to comrpomise your data.

Never log sensitive data. This includes sending information to STDOUT, as STDOUT is included in IronWorker's logs.

**Keep the dialogue open** with us. Iron staffs a [public support chat room](http://www.hipchat.com/gNWgTiqIC) around the clock, and we're always happy to help you secure your data as best we can.
