{
  description = "My Hydra deployment for felia.cloud";
  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = { self, nixpkgs, flake-utils, ... }@my_inputs: flake-utils.lib.eachDefaultSystem (sys:
    let pkgs = import nixpkgs { system=sys; };
    in
    {
      devShells = import ./shell.nix { inherit pkgs; };
    }
  );
}
