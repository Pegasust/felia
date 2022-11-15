# c4c-secrets

A dive into secret management for c4c web-app

# HashiCorp vault

- `docker-compose.yml` -> `docker-compose.hashicorp.yml`
  - Uses in-file store (maybe slow/unreliable!)
  - Can be migrated to AWS in the future

- Pretty good cli experience

- You could try my (@Pegasust) deployment at [pegasust.com/vault](https://pegasust.com/vault)
  - Log in with your GitHub account 
(this is done with personal access token [docs](https://www.vaultproject.io/docs/auth/github))
  - Make sure that you're in our change-for-change organization
  - And also is in web-dev GitHub team

## Installing the CLI

See here [hashicorp's official installtion guide](https://developer.hashicorp.com/vault/downloads)

- You could also access the secrets with the web UI. But to streamline the env
exchange process, we should use the CLI

## Login as user (CLI)

`export VAULT_ADDR='https://c4c.pegasust.com'`
`vault login -method=github`

## Vault onto `.env*`

```bash
vault kv get --format=json path/to/secret | jq -r '.data|to_entries|map("\(.key)=\(.value|tostring)")|.[]'
# Likely
vault kv get --format=json secret/c4c-web-app | jq -r '.data|to_entries|map("\(.key)=\(.value|tostring)")|.[]'
```

## Simple put-get-list

```bash
# put
vault kv put path/to/secret hello="world"
# get
vault kv get path/to/secret hello
# list
vault kv get path/to/secret
```

## `.env.*` onto Vault

- NOTE: This does not support syntax like `HELLO='WORLD'`. Everything must be
in the form of: `HELLO=WORLD`

```bash
vault kv put path/to/secret `cat .env`
# Likely
vault kv put secret/c4c-web-app `grep -v ^# .env`
```

## About the `cubbyhole` secret engine

- It is per-token (that means per-auth) secret storage
  - Can be used as secret manager
  - Don't count on my deployment to be 100\% reliable!

