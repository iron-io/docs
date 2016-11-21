---
title: Iron.io Organizational Support 
layout: default
section: worker
breadcrumbs:
  - ['org support', 'org']
---
Iron.io’s Org support allows you to set up one or more members of your team as the admins of your Iron.io account. As the admins, they will have the ability to create users, as well as control which projects each account has access to. This guide will walk you through the different options in Org Support and how to start using it. If you do not see this option, but would like to use this free feature, please contact <a href='mailto:support@iron.io'>support@iron.io</a>.


<section id="toc">
  <h3>Table of Contents</h3>
  <ul>
    <li><a href="#users">Users</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#clusters">Clusters</a></li>
    <li><a href="#plans">Plans</a></li></ul>
</section>

<h2 id="users">Users</h2>
When you first go to this page, you will see a list of all current users and what access they have. If this is a new account, you may only see one entry for the admin.<br />
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/images/users.png' style="width: 90%;">

To create a new user, click the blue Add User Button. Enter in the information for the first 3 fields. In the Role section, you will see a dropdown with 3 options: Admin, Admin RO and Developer:<br />
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/images/createUser.png' style="width: 90%;">
<ul>
<li><b>Admin</b>- This is the account type that can create projects and users and assign access.  We suggest using an address not tied to one specific person (for example, team@domain.com). This will avoid any access issues if that person is out of town.</li>

<li><b>Admin RO</b>- This account has access to the Organization menu, but can not add or edit anything. It was designed to be used for finance teams or other people that need to see anything, but not make changes.</li>

<li><b>Developer</b>- This is the standard Iron.io account. Users created as developers will only have access to the projects that the admin has given them.</li></ul>
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/images/madeRoles.png' style="width: 90%;">

Once the other users have been added, it’s time to assign their access. To the right of each name is a gear icon, click that to see all of the options:<br />
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/images/gearWithDripDowns.png' style="width: 90%;">

<ul><li><b>Manage User Projects</b>- Allows you to give or remove access from the projects in your organization.

<li><b>Manage User Clusters</b>- Customers using Iron Hybrid worker (https://www.iron.io/hybrid-iron-io-on-premise-job-processing-with-the-help-of-the-cloud/) can control which clusters people will have access to.</li>

<li><b>Manage User Roles</b>- This allows you to change the role of each user</li>

<li><b>Edit User</b>- Gives the ability to change a user’s name or email address</li>

<li><b>Delete User</b>- Removes the user’s account</li></ul>

<h2 id="projects">Projects</h2>
When you first click into this page, you will see a list of all the current projects owned by your organization
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/images/projectsOverview.png' style="width: 90%;"><br />

You can click the Blue Create Button to make a new project, or click the gear to the right of the project name to set access rights.

<h2 id="clusters">Clusters</h2>
Customers making user of Iron.io’s Hybrid worker can use this tab to spin up as many cluster as they need. When you first go to the page, you will see all existing clusters you have made already
<img src='https://raw.githubusercontent.com/iron-io/docs/gh-pages/images/clusterOverview.png' style="width: 90%;"><br />

To create a new cluster, click the blue New Cluster and fill out the following information:<ul>
<li><b>Cluster name</b>- A unique name to allow easier use of the new cluster.</li>
<li><b>Memory per runner</b>- This is the amount of memory each worker can use.</li>
<li><b>Disk Space per runner</b>- How much disk space each runner will have to use.</li></ul>

<h2 id="plans">Plans</h2>
This page will give you an overview of the plans your organization uses for IronWorker, IronMQ and IronCache.
