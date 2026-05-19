class CacheService {
  constructor(ttlMs) {
    this.ttl = ttlMs;
    this.store = new Map();
  }

  get(key) {
    const item = this.store.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.store.delete(key);
      return null;
    }

    return item.data;
  }

  set(key, data) {
    this.store.set(key, {
      data,
      expiry: Date.now() + this.ttl
    });
  }

  clear() {
    this.store.clear();
  }
}

module.exports = CacheService;
