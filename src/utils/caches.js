class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) return null;
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key, value) {
        if (this.cache.size >= this.capacity) {
            const leastRecent = this.cache.keys().next().value;
            this.cache.delete(leastRecent);
        }
        this.cache.set(key, value);
    }

    getCache() {
        return Array.from(this.cache.entries());
    }
}


class LFUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.freq = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) return null;
        this.freq.set(key, (this.freq.get(key) || 0) + 1);
        return this.cache.get(key);
    }

    put(key, value) {
        if (this.cache.size >= this.capacity) {
            const leastFreq = Math.min(...this.freq.values());
            const leastFrequentKeys = [...this.freq].filter(([k, f]) => f === leastFreq).map(([k]) => k);
            const keyToRemove = leastFrequentKeys[0];
            this.cache.delete(keyToRemove);
            this.freq.delete(keyToRemove);
        }
        this.cache.set(key, value);
        this.freq.set(key, 1);
    }

    getCache() {
        return Array.from(this.cache.entries());
    }
}


export { LRUCache, LFUCache };
