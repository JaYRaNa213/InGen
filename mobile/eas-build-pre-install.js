// eas-build-pre-install.js
module.exports = () => {
  process.env.npm_config_legacy_peer_deps = 'true';
  process.env.npm_config_force = 'true';
};
