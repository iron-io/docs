---
title: Securing Your Workers
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['Securing Your Workers', '/security']
---

# Securing Your Workers

Security has always been an issue when using the power of cloud computing. To have your code running on a system that another company controls is a risk, and boils down to a matter of trust, in most cases.

At Iron, we work hard to deserve your trust. The code powering your workers and the data you pass to your workers will **only** be accessed by Iron or its team with your *explicit* permission or as required by California state law or United States federal law. Your workers belong to **you**.

We also take security very seriously. Our system is designed to keep your workers away from other customers and intruders with unauthorised access. It doesn't hurt, however, to take precautions about your data. We've come up with this list of best practices for workers to help keep your data secure in even the worst-case scenarios.

## Always Use HTTPS

Our [API](/worker/reference/api) is available over a secure connection. Double-check that the API endpoints you are using are prefixed with "https" and that the port the information is being passed through is set to 443. This renders many common attacks for intercepting data and transmission impossible or impractical.

## Don't Hardcode Sensitive Information

When your worker needs access to sensitive information (whether that be credentials, an OAuth token, or anything else you'd like to keep private), it is always best to pass that information through in task payloads, instead of keeping it "hardcoded" or inserted directly into the code of your worker. There are two reasons for this:

1. The payload data has a much shorter lifespan on our servers than your worker's source code does. This allows us to store the sensitive information for as brief a time as possible, minimizing the risk.
2. In the event that your sensitive information is compromised and can be changed (for example, changing credentials), you can simply change them in the payloads you're passing and not tell your worker anything about the change. This separation of responsibility is one of the core tenants of IronWorker, allowing for small code chunks that do specific tasks very well.

## Encrypt Your Data

For a bit of extra reassurance, you can always encrypt your sensitive data before sending it to IronWorker, then decrypt it in your worker. While this solution isn't bulletproof (if someone gains access to the worker code, they can decrypt the information just as the worker can), it adds another lock to the door. The more barriers to stealing your data you erect, the less likely it is that the data will be taken.

## Never Print or Log Sensitive Data

Depending on your language runtime and client library, there are several ways to get your data stored into your worker logs. Any mention of logging should raise a red flag, and anything that gets sent to STDOUT will be saved in our log files, as well. That means print, puts, echo, and the like will all get data stored in your logs.

Your logs have a long life on our servers so that you can [check them at will](/worker/reference/api/#get_a_tasks_log). This means that any information that winds up in a log has a long life ahead of it, so any sensitive information should be kept out of the logs. The goal is to keep the window of opportunity for stealing that information to the lowest possible duration; by storing the information in logs, the window of opportunity is needlessly stretched.

## Talk to Us

Healthy dialogue is always essential to security of a system, especially one that is operated cooperatively, like your workers are. Iron maintains a [public support chat room](http://www.hipchat.com/gNWgTiqIC) that is staffed by our team around the clock. If you have questions or concerns or would just like some reassurance, feel free to stop by and chat with us. Our goal is to take the stress out of building and maintaining cloud systems; that includes stress about security.
