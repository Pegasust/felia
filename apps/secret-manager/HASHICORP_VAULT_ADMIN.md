# Hashicorp's Vault Administration

A dump of knowledge, commands, and documentations to lookup for troubleshooting
or setting up

## CLI getting started

`export VAULT_ADDR='https://c4c.pegasust.com'`

`vault login`

- Note, the vault will first need to be unsealed
- The first time we log in as admin, it's probably best to use the
root token to access.


## Seal/unseal

- Vault server begins sealed
- I generated with 6/10 cluster vault configuration (10 keys & require 6 keys to unseal)
  - These keys can be shared to other admins
  - This means an admin only need 6 keys to unseal the vault when needed

## Enabling GitHub auth

- First, add our policy:

```bash
vault policy write {POLICY_NAME} {POLICY_FILE}
```
- Our deployment's replacements:
  - `{POLICY_NAME}` is `web-app-admin`
  - `{POLICY_FILE}` is `config/hashicorp-policy/web-app-admin.hcl`

- Then, we enable GitHub auth and attach `web-app-admin` to our `web-app-dev` team

```bash
vault auth enable github
vault write auth/github/config organization={GITHUB_ORG}
vault write auth/github/map/teams/{GITHUB_TEAM} value={VAULT_POLICY}
```

- Our deployment's version replaces:
  - `{GITHUB_ORG}` is `change-for-change`
  - `{GITHUB_TEAM}` is `web-app-dev`
  - `{VAULT_POLICY}` is `web-app-admin`

## Updating policy

```bash
vault write sys/policy/{POLICY_NAME} policy=@{POLICY_FILE}
```

- An example is:
  - `{POLICY_NAME}`: `web-app-admin`
  - `{POLICY_FILE}`: `config/hashicorp-policy/web-app-admin.hcl`

## Bootstrapping our vault

`vault secrets enable -path=secret kv`
`vault secrets enable -path=secretv2 kv-v2`
