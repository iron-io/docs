---
title: Securing Your Workers
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['Securing Your Workers', '/security']
---

Years of work and many layers are involved in ensuring cloud resources are secure. Iron.io inherits these industrial-strength security measures through the infrastructures we operate on. These measures include physical, network, data continuity, service access and service-specific protections, among others. Please refer to the [AWS Security Whitepaper](http://d36cz9buwru1tt.cloudfront.net/pdf/AWS_Security_Whitepaper.pdf) for a detailed description of this extensive list. 

Iron.io takes further measures to isolate and protect **processes** at the IronWorker platform level, just as we isolate and protect **instances** at the infrastructure level. These steps include access restrictions, process isolation, resource monitoring/management, service restrictions, and more.

## Security Measures

### OAuth2 Authorization

Iron's [API](/worker/refrence/api) uses [OAuth 2](http://www.oauth.net/2/), an industry-standard authentication scheme, to securely authenticate API requests. This scheme relies on SSL for security, instead of requiring your application to do cryptographic signing directly. This makes the API easy to use without compromising security.  

### HTTPS Encryption

The IronWorker [API](/worker/reference/api) is the standard method of interacting with workers and projects. **HTTPS encryption** is the default access method for the API and the recommended approach for all access requests. All the client libraries provided by Iron.io use HTTPS encryption by default. This renders most common packet-interception attacks useless. 

### Process Isolation

IronWorker makes use of OS-level **sandboxing** to keep processes isolated from system influences and other processes in the system. Each IronWorker process runs in a virtualized container that appears to processes as a unique, minimal Ubuntu installation.
Runtime limits are placed on the amount of RAM and disk each worker process may consume. Workers that exceed the
memory limit will error out and exit. CPU allocation is balanced across IronWorker processes, but may burst to higher CPU
allocation depending IronWorker system load.

### Resource Management

IronWorker uses process-level runtime monitoring/management to ensure that workers receive a standard set of compute resources. Workers may utilize more resources depending on system load (which could introduce slight performance variations across workers) but never less than the standard level.

### SMTP and Other Service Restrictions

IronWorker, by design, does not provide SMTP host services. Workers must use third-party services such as [GMail](http://gmail.com), [SendGrid](http://www.sendgrid.com), [Amazon SES](http://aws.amazon.com/ses), or other service providers. Users must also adhere to Iron.io's [Use Policy](http://iron.io/legal).

### Security Groups and IP Ranges

IronWorker provides an AWS security group and [IP ranges](https://forums.aws.amazon.com/forum.jspa?forumID=30) in the event users want to isolate AWS EC2, RDS, or other services to these groups/ranges. **Please note that this security group only works in the US East region.**

<table>
<thead>
<tr>
<th>EC2 Security Group</th><th>Account ID</th><th>Security Group String</th><th>Security Group ID</th>
</tr>
</thead>
<tbody>
<tr>
<td>simple_worker_sg</td><td>7227-1646-5567</td><td>722716465567/simple_worker_sg</td><td>sg-0d500c64</td>
</tr>
</tbody>
</table>

## Security Guidelines/Best Practices

### Environment Variables/Code Separation

Avoid including any sensitive data or credentials within your code. Instead, include them as part of **the data payload**. This is in keeping with the 12-Factor app tenet regarding [Config](http://www.12factor.net/config) and its guidance on *strict separation of config from code*.

### Create Worker-Specific Credentials

Make use of **worker-specific** credentials that only your workers depend on. For example, database users can be set up specifically for one or more workers. Additional auth tokens can be created for API services. Restricting/limiting these credentials to *only* the services/tables/capabilities workers need will provide an added level of isolation. It also makes changing/rotating credentials easier.

### Encrypt Data Payloads

Consider **encrypting your sensitive data** before including it as part of the payload, and then decrypt it in the worker. This measure requires an attacker compromise both the payload and the worker in order to gain access to the data.

### Restrict Logging

Do not log sensitive data. This includes sending information to STDOUT, as STDOUT is included in IronWorker's logs. If certain ID information is needed then provide an excerpt of the data (e.g xxxx4f689a5 or 32e78f....) that can be used for identification purposes.

## Questions/Concerns About Security Issues

We've taken measures to ensure the security of your data in our systems, and we're working hard to educate customers on how to make the most of that security. Our mission is to take the stress out of managing cloud infrastructure, and that includes concerns about security and compromised data.

If you have any questions, please do not hesitate to get in touch with us. We **encourage the dialogue** and want to do everything we can to ensure the safety of your data. Enter a [support ticket](http://support.iron.io/customer/portal/emails/new) or join the [public support chat room](http://get.iron.io/chat). It's staffed almost constantly, around the clock, and we'd be happy to answer questions or provide advice on a case-by-case basis.
