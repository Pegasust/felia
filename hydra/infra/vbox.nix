{
  my-hydra =
    { config
    , pkgs
    , keyFiles ? [
        ../ssh/pi.pub
        ../ssh/fel.pub
        ../ssh/felia.pub
        ../ssh/fel_ed.pub
        ../ssh/hwtr-prince.pub
        ../ssh/nixos_felia.pub
      ]
    , ...
    }: {
      deployment.targetEnv = "virtualbox";
      deployment.virtualbox = {
        memorySize = 2048;
        vcpu = 1;
        headless = true;
      };
      services.nixosManual.showManual = false;
      services.ntp.enable = true; # time daemon
      services.openssh.allowSFTP = false;
      services.openssh.passwordAuthentication = false;
      users = {
        mutableUsers = false; # frozen user config
        users.root.openssh.authorizedKeys.keyFiles = keyFiles;
      };
    };
}
