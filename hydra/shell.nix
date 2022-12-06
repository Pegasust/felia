{ pkgs ? import <nixpkgs> { }
}:
let shellHookAfter = ''
  echo "Welcome to Felia\'s Hydra setup"
  echo "TODO: Actually write a MOTD here LOL"
''; in
rec {
  nixops = pkgs.mkShell {
    nativeBuildInputs = [ pkgs.nixops_unstable ];
    shellHook = ''
        echo "profile: nixops"
    ''+shellHookAfter;
  };
  default = nixops;
}
