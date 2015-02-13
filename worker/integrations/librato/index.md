---
title: Librato Integration Guide
layout: default
section: worker
breadcrumbs:
  - ['Integrations', '/integrations']
---

<a href="http://www.librato.com">Librato</a> is a Software as a Service company offering a platform for Real-time Operations Analytics that accepts metrics from any source for real-time aggregation and transformation, anomaly detection, alerting, visual analysis and storage.

Librato has been integrated with IronWorker to deliver task state metrics for building data dashboards and incorporating alerting capabilities. This guide outlines the steps needed to authenticate, activate, and leverage the Librato integration.

<h2 id="start">Getting Started</h2>
If you haven't already, <a href="https://metrics.librato.com/sign_up">sign up</a> for a Librato account today. They offer a 30 day free trial of the service.

Once you have your Librato account, go to your Account Settings to get your API Key. You'll need this and the email address you signed up with for the Iron.io HUD.

<img src="/images/worker/integrations/librato_token.png" alt="Librato API Key">

<h2 id="auth">Authenticate With Librato</h2>
With your Librato API Key and account email address, head over to the Iron.io HUD. Navigate to your Profile and select the Integrations menu. Select the 'Add' button for Librato and copy your email address and the Project API Key in the field. Selecting 'Activate' will authenticate Librato with Iron.io.

<img src="/images/worker/integrations/librato_auth1.png" alt="Librato Auth">
<img src="/images/worker/integrations/librato_auth2.png" alt="Librato Auth">
<img src="/images/worker/integrations/librato_auth3.png" alt="Librato Auth">

<h2 id="activate">Activate the Librato Integration</h2>
Once you have authenticated with Librato, you can activate the integration for a specific project. Selecting the Integrations icon (plug), will display a list of services you have authenticated with. Find Librato and toggle the switch button on to activate the integration.

<img src="/images/worker/integrations/librato_activation1.png" alt="Librato Activation">
<img src="/images/worker/integrations/librato_activation2.png" alt="Librato Activation">

<h2 id="Test">Test the Integration</h2>
With Librato authenticated and activated, IronWorker tasks will deliver metrics to Librato as Annotations. Create and name an Instrument for collecting metrics. The Annotation will be in the format InstrumentName.WorkerName.

To test, write, upload, and run a simple task that you know will generate an error. Once complete, you will see the error in your Librato Instrument. Once you begin collecting more metrics, you can build custom Dashboards to your liking.

<img src="/images/worker/integrations/librato_instrument.png" alt="Librato Instrument">





