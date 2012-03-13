---
title: Securing Your Workers
layout: default
section: worker
breadcrumbs:
  - ['Reference', '/reference']
  - ['Securing Your Workers', '/security']
---

# Securing Your Workers

Cloud computing represents a big step forward in terms of flexibility, agility, high-availability, and scalability. But it also brings added challenges with regards to security. Applications and processes run on systems where there is no physical or logical control of the hardware. Multiple instances may inhabit the same resources on a virtual basis and thousands and millions of processes can be running concurrently within the same physical zones. It's imperative then that measures up and down the infrastructure and platform stack provide added security within this mass scale virtual environment.

Years of work and many layers are involved in ensuring cloud resources are secure. Iron.io inherits these industrial-strength security measures on the infrastructures we operate on. These measures include physical, network, data continuity, service access and service-specific protections among others. Please refer to the [AWS Security Whitepaper](http://d36cz9buwru1tt.cloudfront.net/pdf/AWS_Security_Whitepaper.pdf) for a detailed description of this extensive list. 

Iron.io takes further measures to isolate and protect **processes** at the IronWorker platform level to a similar degree as happens to **instances** at the infrastructure level. These steps include access restrictions, process isolation, resource monitoring/management, service restrictions and more.

## Security Measures

### OAuth2 Authorization
Iron's [API](/worker/refrence/api) uses [OAuth 2](http://www.oauth.net/2/), an industry-standard authentication scheme, to securely authenticate API requests. This scheme relies on SSL for security instead of requiring your application to do cryptographic signing directly which means ease of use without compromising security.  

### HTTPS Encryption
The IronWorker [API](/worker/reference/api) is the standard method of interacting with workers and projects. **HTTPS encryption** is the default access method for the API and the recommended approach for all access requests. All Iron.io (official) client libraries use HTTPS encryption by default. This renders most common packet-interception attacks useless. 

### Process Isolation
IronWorker makes use of OS-level **sandboxing** to keep processes isolated and separate from system influences and other processes in the system. Each IronWorker process runs in an isolated virtualized container such that the environment appears to processes as a unique minimal Ubuntu distribution. Runtime limits are placed on the amount of RAM and disk each worker process may consume. (Workers that exceed the RAM limit are terminated terminated immediately by the IronWorker runtime.) CPU allocation is balanced across IronWorker processes, but bursting is allowed. 

### Resource Management
IronWorker uses process-level runtime monitoring/management to ensure that workers receive a standard set of compute resources. Workers may utilize more resources depending on system load (which could introduce slight performance variations across workers) but never less than the standard level.

### SMTP and Other Service Restrictions
IronWorker by design does not provide SMTP host services. Workers must make use third-party services such as gmail, SendGrid, or other service providers. Users must also adhere to Iron.io's Use Policy.

### Security Groups and IP Ranges
IronWorker provides a AWS security group and IP ranges in the event users want to isolate AWS EC2, RDS, or other services to these groups/ranges. 

## Security Guidelines/Best Practices

### Environment Vars/Code Separation
Avoid including any sensitive data or credentials within your code. Instead, include include them as part of **the data payload**. This is in keeping with the 12-Factor app tenet regarding [Config](http://www.12factor.net/config) and its guidance on *strict separation of config from code*.

### Create Worker-Specific Credentials
Make use of **worker-specific** credentials that only your workers depend on. For example, database users can be set up specifically for one or more workers. Additional auth tokens can be created for API services. Restricting/limiting these credentials to *only* the services/tables/capabilities workers need will provide an added level of isolation. It also makes changing/rotating credentials easier.

### Use Security Groups and IP Ranges
Some cloud infrastructures such as AWS provide system level security measures. If available look to make use of 

### Encrypt Data Payloads
Consider **encrypting your sensitive data** before including it as part of the payload, and then decrypt it in the worker. This measure requires an attacker compromise both the payload and the worker in order to gain access to the data.

### Restrict Logging
Do not log sensitive data. This includes sending information to STDOUT, as STDOUT is included in IronWorker's logs. If certain ID information is needed then provide an excerpt of the data (e.g xxxx4f689a5 or 32e78f....) that can be used for identification purposes.

## Questions/Concerns about Security Issues
We've taken measures to ensure the security of your data in our systems, and we're working hard to educate customers on how to make the most of that security. Our mission is to take the stress out of managing cloud infrastructure, and that includes concerns about security and data compromise.

If you have any questions, please do not hesitate to get in touch with us. We **encourage the dialogue** and want to do everything we can to ensure your trust. Enter a [support ticket](http://support.iron.io/customer/portal/emails/new) or join the [public support chat room](http://www.hipchat.com/gNWgTiqIC). It's staffed almost around the clock and we'd be happy to answer questions or provide advice on a case-by-case basis.
