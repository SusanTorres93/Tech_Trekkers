{ pkgs, ... }: {
  # Using the stable Nixpkgs channel
  channel = "stable-23.11";

  # Packages needed for the project
  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.http-server
    pkgs.nodePackages.live-server
  ];

  # Environment variables (none needed for this setup)
  env = {};

  idx = {
    # Extensions for the IDE
    extensions = [
      "ritwickdey.liveserver"
      "dbaeumer.vscode-eslint"
      "esbenp.prettier-vscode"
    ];

    # Preview configuration
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["live-server" "--port=$PORT" "--no-browser"];
          manager = "web";
          env = {
            PORT = "$PORT";
          };
        };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      onCreate = {
        install-deps = "npm init -y && npm install eslint prettier --save-dev";
      };
      onStart = {
        start-server = "echo 'To start the server, run: live-server'";
      };
    };
  };
}