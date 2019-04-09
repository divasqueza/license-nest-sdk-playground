# chart

This folder contains the [Helm](https://helm.sh/) chart definition. This should only be modified by the DevOps
team since is basically the Kubernetes manifests that are going to be deployed.

# Environment values

To override the different chart values per environment (prod, stage, etc.) a YAML file for the env should be uploaded to
`s3://dp-deployment-artifacts/apps/APP_NAME/ENV.yml` this would be setup in the CD pipeline in Spinnaker.
