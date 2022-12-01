# Cloudflare-nginx

This mini-repo consists of my configuration for Felia homelab. This is version-controlled 
with Felia's local-fs git. 

NOTE: Felia consists of a custom Linux (fel) and a Windows machine (Felia) with 
NixOS on WSL (felia-1). This deployment works on Docker WSL of Felia node.

## How to apply changes

The current way to apply the changes is to push to Felia's git server and 
`cloudflare-nginx/scripts/reload_nginx.sh` on a Docker client that connected to Felia


