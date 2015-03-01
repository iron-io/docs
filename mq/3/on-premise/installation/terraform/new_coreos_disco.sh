#!/usr/bin/env bash
set -e
cp terraform.tfvars.json terraform.tfvars.json.bak
echo "Discarding token: `jq -r .coreos_discovery_url terraform.tfvars.json`"
TOKEN=`curl -s https://discovery.etcd.io/new`
echo "Setting new token: $TOKEN"
CONFIG=`jq ".coreos_discovery_url = \"$TOKEN\"" terraform.tfvars.json`
cat > terraform.tfvars.json <<CONF
$CONFIG
CONF
