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
**Required** Names of the artifacts to retrieve. It could be a name of the single artifact or the list of the artifacts, 
presented in the form of JSON array

## Outputs
### `artifacts`
The retrieved artifacts details in the form of the map, where key is the artifact name. **Note** that if the artifact name 
contains `-` dash character you need to use jq to extract value of the such key *(see example below)* 

## Example
Before adding this action to your workflow, set a secret with the API token in your project.
Then, you can retrieve the artifact details using this step:
```yaml
- name: Retrieve Artifacts
  uses: iktech/retrieve-artifacts-javascript-action@v1.0.2
  id: single
  with:
    apiToken: ${{ secrets.ARTIFACTZ_TOKEN }}
    stage: Development
    artifacts: test
- name: Retrieve Artifacts
  uses: iktech/retrieve-artifacts-javascript-action@v1.0.3
  id: multiple
  with:
    apiToken: ${{ secrets.ARTIFACTZ_TOKEN }}
    stage: Development
    artifacts: ["test", "artifactz-client"]
- name: Display details
  run: |
    echo ${{ steps.single.outputs.artifacts.test }}
    echo ${{ steps.multiple.outputs.artifacts.test }}

    DATA='${{ steps.retrieve_tags.outputs.artifacts }}'
    VALUE=$(echo "$DATA" | jq -r '.["artifactz-client"]')
    echo $VALUE
```
