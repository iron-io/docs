---
title: IronMQ On-Premise - Quick setup with Terraform
layout: default
section: mq-on-premise
---

This page is a work in progress.

Terraform is an infrastructure deployment tool which you can use to automatically
launch an IronMQ cluster. It only works for cloud based deployments, as it
needs to use cloud APIs. It supports a wide variety of clouds.

This guide assumes that you're setting up IronMQ on Amazon Web Services (AWS).

1. [Download and install Terraform](https://terraform.io/downloads.html)
2. (Optional) Read the [introduction to Terraform](https://terraform.io/intro/)
3. `wget https://github.com/iron-io/enterprise/archive/master.zip`
4. `unzip master.zip`
5. `cd enterprise-master/terraform/ironmq/`
6. `curl https://raw.githubusercontent.com/iron-io/enterprise/master/terraform/ironmq/sample.tfvars.json > terraform.tfvars.json`
7. Edit `terraform.tfvars.json` (created in the previous step). Change the values of
`aws_access_key` and `aws_secret_key` to your own AWS access key and AWS secret key, respectively.
8. `terraform plan -out=plan -var-file=terraform.tfvars.json`.
9. Review the output of the previous. If you find any possible issues with Terraform's
plan to set up your infrastructure, please stop and contact us.
10. `terraform apply plan`
