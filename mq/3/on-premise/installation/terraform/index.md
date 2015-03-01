Automated Deployment with Terraform
===================================

If you have an Amazon Web Services account, you can automatically provision an IronMQ cluster there using these Terraform scripts.

1. Download and install Terraform: https://terraform.io/downloads.html
2. Create a `terraform.tfvars.json` file with your credentials and an empty `"coreos_discovery_url"` key:
```json
{
  "aws_access_key": "...",
  "aws_secret_key": "...",
  "aws_region": "us-east-1",
  "ssh_key_name": "my_key",
  "ssh_key_path": "~/.ssh/my_key.pem",
  "count": "3",
  "cluster_name": "ironmq-trial",
  "coreos_discovery_url": ""
}
```
3. Execute the `new_coreos_disco.sh` script.  Note: this will fill the "coreos_discovery_url" key in the `terraform.tfvars.json` file.
3. Run `terraform plan -out=plan -var-file=terraform.tfvars.json`
4. Review the plan displayed in the console
5. Run `terraform apply plan`
