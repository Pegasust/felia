# Read the configuration secret example
path "secret/config" {
    capabilities = ["read"]
}

path "secret" {
    capabilities = ["list"]
}
path "secret/*" {
    capabilities = ["list"]
}
path "secret/c4c-web-app" {
    capabilities = ["read", "list", "create", "update"]
}
path "secret/c4c-web-app/*" {
    capabilities = ["read", "create", "update", "list"]
}
path "secretv2" {
    capabilities = ["list"]
}
path "secretv2/*" {
    capabilities = ["list"]
}
path "secretv2/c4c-web-app" {
    capabilities = ["read", "list", "create", "update"]
}
path "secretv2/c4c-web-app/*" {
    capabilities = ["read", "create", "update", "list"]
}

# List secrets engines
path "sys/mounts" {
    capabilities = ["read"]
}

