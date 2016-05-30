---
title: PagerDuty Integration Guide
layout: default
section: worker
breadcrumbs:
  - ['Integrations', '/integrations']
---

<a href="http://www.pagerduty.com">PagerDuty</a> is software-as-a-service that protects businesses from the evils of downtime and system unreliability by enabling IT ops to resolve problems faster.

PagerDuty has been integrated with IronWorker to create an incident that notifies your team when a task errors or timeouts. This guide outlines the steps needed to authenticate, activate, and leverage the PagerDuty integration.

<h2 id="start">Getting Started</h2>
If you haven't already, <a href="https://signup.pagerduty.com/accounts/new">sign up</a> for a PagerDuty account today. They offer a 14 day free trial of the service.

Once you have a PagerDuty account, you can add Iron.io as a service from the dashboard by selecting 'Add New Service'. Start typing Iron and Iron.io will show up. Make sure the settings are correct and select 'Add Service'.

<img src="/images/worker/integrations/pd_addiron.png" alt="PagerDuty Add Service">

Once you have added Iron.io as a service, it will show up in your list of Services where you can copy your API Key. You'll need this for the Iron.io HUD.

<img src="/images/worker/integrations/pd_token.png" alt="PagerDuty API Key">

<h2 id="auth">Authenticate With PagerDuty</h2>
With your PagerDuty API Key, head over to the Iron.io HUD. Navigate to your Profile and select the Integrations menu. Select the 'Add' button for PagerDuty and copy the API Key in the field. Selecting 'Activate' will authenticate PagerDuty with Iron.io.

<img src="/images/worker/integrations/pd_auth1.png" alt="PagerDuty Auth">
<img src="/images/worker/integrations/pd_auth2.png" alt="PagerDuty Auth">
<img src="/images/worker/integrations/pd_auth3.png" alt="PagerDuty Auth">

<h2 id="activate">Activate the PagerDuty Integration</h2>
Once you have authenticated with PagerDuty, you can activate the integration for a specific project. Selecting the Integrations icon (plug), will display a list of services you have authenticated with. Find PagerDuty and toggle the switch button on to activate the integration.

<img src="/images/worker/integrations/pd_activation1.png" alt="PagerDuty Activation">
<img src="/images/worker/integrations/pd_activation2.png" alt="PagerDuty Activation">

<h2 id="Test">Test the Integration</h2>
With PagerDuty authenticated and activated, any IronWorker tasks that errors will deliver the data to PagerDuty and create an Incident. To test, write, upload, and run a simple task that you know will generate an error. Once complete, you will see the error in your PagerDuty dashboard and can take further action.

<img src="/images/worker/integrations/pd_incident.png" alt="PagerDuty Incident">



