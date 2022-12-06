#!/usr/bin/env sh
SCRIPT_DIR="$(realpath $(dirname $0))"
PROJ_ROOT="${SCRIPT_DIR}/.."

# create a deployment of simple_hydra
nixops create ${PROJ_ROOT}/infra/{vbox,simple_hydra}.nix -d simple_hydra

nixops info -d simple_hydra

