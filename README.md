# Retrieve Artifacts Javascript Action

This action retrieves artifact details from the specified stage at the https://artifactz.io.

## Inputs
### `serviceUrl`
**Required** The URL of the artifactz.io service. 
*Default:* https://artifactor.artifactz.io

### `apiToken`
**Required** The API token with write permissions 

### `stage`
**Required** Stage where artifact is getting pushed from

### `artifacts`
**Required** Names of the artifacts to retrieve

## Outputs
### `artifacts`
The retrieved artifacts details 

## Example
Before adding this action to your workflow, set a secret with the API token in your project.
Then, you can retrieve the artifact details using this step:
```yaml
- name: Retrieve Artifacts
  uses: iktech/retrieve-artifacts-javascript-action@v1.0.0
  with:
    apiToken: ${{ secrets.ARTIFACTZ_TOKEN }}
    stage: Development
    artifacts: 
      - test
      - artifactz-clients
```
