module.exports = {
  port: parseInt(process.env.PORT, 10) || 3000,
  cache: {
    ttl: parseInt(process.env.CACHE_TTL, 10) || 60
  },
  check: {
    timeout: parseInt(process.env.CHECK_TIMEOUT, 10) || 5000
  },
  services: {
    configPath: process.env.CONFIG_PATH || '../config.json'
  }
};
