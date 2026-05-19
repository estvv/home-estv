const fs = require('fs');
const path = require('path');
const CacheService = require('./cache');
const { checkUrl } = require('./urlChecker');

class StatusService {
  constructor(config) {
    this.configPath = config.configPath;
    this.timeout = config.timeout;
    this.cache = new CacheService(config.cacheTtl);
  }

  async loadServices() {
    const absolutePath = path.resolve(__dirname, this.configPath);
    const raw = fs.readFileSync(absolutePath, 'utf8');
    const config = JSON.parse(raw);
    return config.services || [];
  }

  async checkAll() {
    const cached = this.cache.get('status');
    if (cached) {
      return { ...cached, cached: true };
    }

    const services = await this.loadServices();

    const results = await Promise.all(
      services.map(async (service) => {
        const url = service.checkUrl || service.url;
        const status = await checkUrl(url, this.timeout);
        return {
          id: service.id,
          name: service.name,
          status
        };
      })
    );

    const data = {
      services: results,
      timestamp: new Date().toISOString()
    };

    this.cache.set('status', data);
    return { ...data, cached: false };
  }
}

module.exports = StatusService;
