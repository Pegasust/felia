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
    }:
    let
      host = "pixi";
    in
    {
      services.postfix = {
        enable = true;
        setSendmail = true;
      };
      services.postgresql = {
        enable = true;
        package = pkgs.postgresql;
        identMap = ''
          hydra-users hydra hydra
          hydra-users hydra-queue-runner hydra
          hydra-users hydra-www hydra
          hydra-users root postgres
          hydra-users postgres postgres
        '';
      };
      services.hydra =
        let
          hydraUrl = "https://hydra.felia.cloud";
          hydraEmail = "hydra@felia.cloud";
        in
        {
          enable = true;
          # Whether to use binary cache to download store paths. Binary substitutions 
          # HTTP requests that slow down queue monitor thread significantly. Don't 
          # enable this feature unless active binary cache is absolutely trustworthy
          useSubstitutes = true;
          hydraURL = hydraUrl;
          notificationSender = hydraEmail;
          buildMachinesFiles = [ ];
          extraConfig = ''
            store_uri = file:///var/lib/hydra/cache?secret-key=/etc/nix/${host}/secret
            binary_cache_secret_key_file = /etc/nix/${host}/secret
            binary_cache_dir = /var/lib/hydra/cache
          '';
        };
      services.nginx = {
        enable = true;
        recommendedProxySettings = true;
        virtualHosts."hydra.felia.cloud" = {
          forceSSL = true;
          enableACME = true;
          locations."/".proxyPass = "http://localhost:3000";
        };
      };
      systemd.services.hydra-manual-setup = {
        description = "Create Admin User for Hydra";
        serviceConfig.Type = "oneshot";
        serviceConfig.RemainAfterExit = true;
        wantedBy = [ "multi-user.target" ];
        requires = [ "hydra-init.service" ];
        after = [ "hydra-init.service" ];
        environment = builtins.removeAttrs (config.systemd.services.hydra-init.environment) [ "PATH" ];
        scripts = ''
          if [ ! -e ~hydra/.setup-is-complete ]; then
            # create signing keys
            /run/current-system/sw/bin/install -d -m 551 /etc/nix/${host}
            /run/current-system/sw/bin/nix-store --generate-binary-cache-key ${host} /etc/nix/${host}/secret /etc/nix/${host}/public
            /run/current-system/sw/bin/chown -R hydra:hydra /etc/nix/${host}
            /run/current-system/sw/bin/chmod 440 /etc/nix/${host}/secret
            /run/current-system/sw/bin/chmod 444 /etc/nix/${host}/public
            # create cache
            /run/current-system/sw/bin/install -d -m 755 /var/lib/hydra/cache
            /run/current-system/sw/bin/chown -R hydra-queue-runner:hydra /var/lib/hydra/cache
            # done
            touch ~hydra/.setup-is-complete
          fi
        '';
      };
      nix.gc = {
        automatic = true;
        # garbage collect every day at 3:15 AM, local time
        dates = "15 3 * * *";
      };
      nix.autoOptimiseStore = true;
      nix.trustedUsers = [ "hydra" "hydra-evaluator" "hydra-queue-runner" ];
      nix.buildMachines = [
        {
          hostName = "localhost";
          systems = [ "x86_64-linux" "i686-linux" ];
          maxJobs = 6;
          # for building VirtualBox VMs as build artifacts, you might need other
          # features depending on what you are doing
          supportedFeatures = [ ];
        }
      ];
      networking.firewall.allowedTCPPorts = [ config.services.hydra.port ];
    };
}
