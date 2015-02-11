---
title: Airbrake Integration Guide
layout: default
section: worker
breadcrumbs:
  - ['Integrations', '/integrations']
---

<a href="http://www.airbrake.io">Airbrake</a> is the leading exception reporting service, currently providing error tracking for 50,000 applications with support for 18 programming languages.

Airbrake has been integrated with IronWorker to capture task errors for delivery to Airbrake for further inspection. This guide outlines the steps needed to authenticate, activate, and leverage the Airbrake integration.

<h2 id="start">Getting Started</h2>
If you haven't already, <a href="https://airbrake.io/account/new">sign up</a> for an Airbrake account today. They offer a 30 day free trial of the service.

Once you have your Airbrake account, create a new project from the dashboard. Follow the steps provided and then copy the Project API Key from the Project Settings. You'll need this for the Iron.io HUD.

<img src="/images/worker/integrations/airbrake_token.png" alt="Airbrake API Key">

<h2 id="auth">Authenticate With Airbrake</h2>
With your Airbrake Project API Key, head over to the Iron.io HUD. Navigate to your Profile and select the Integrations menu. Select the 'Add' button for Airbrake and copy the Project API Key in the field. Selecting 'Activate' will authenticate Airbrake with Iron.io.

<img src="/images/worker/integrations/airbrake_auth1.png" alt="Airbrake Auth">
<img src="/images/worker/integrations/airbrake_auth2.png" alt="Airbrake Auth">
<img src="/images/worker/integrations/airbrake_auth3.png" alt="Airbrake Auth">

<h2 id="activate">Activate the Airbrake Integration</h2>
Once you have authenticated with Airbrake, you can activate the integration for a specific project. Selecting the Integrations icon (plug), will display a list of services you have authenticated with. Find Airbrake and toggle the switch button on to activate the integration.

<img src="/images/worker/integrations/airbrake_activation1.png" alt="Airbrake Activation">
<img src="/images/worker/integrations/airbrake_activation2.png" alt="Airbrake Activation">

<h2 id="Test">Test the Integration</h2>
With Airbrake authenticated and activated, any IronWorker tasks that errors will deliver the data to Airbrake and create an Unresolved Error. To test, write, upload, and run a simple task that you know will generate an error. Once complete, you will see the error in your Airbrake dashboard and can take further action.

<img src="/images/worker/integrations/airbrake_exception.png" alt="Airbrake Exception">

