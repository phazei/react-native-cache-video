"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemoryCacheProvider = void 0;
var _util = require("../Utils/util");
var _constants = require("../Utils/constants");
// LRU is not good enough for this case
// this is not best case for performance,
// assuming page 1 always use when user entered app,
// but when you scroll to page 10 and it out of frames,
// you will remove page 1 so it will cause bad performance for user experience,

class MemoryCacheProvider {
  //

  constructor(cachePolicy) {
    this.cache = new Map();
    this.cachePolicy = cachePolicy;
  }
  has(key) {
    return this.cache.has(key) && !(0, _util.isNull)(this.cache.get(key));
  }
  get(key) {
    // Update access time or frequency based on the policy
    this.cachePolicy.onAccess(this.cache, key);
    this.cachePolicy.onEvict(this.cache, this.delegate, key);
    return this.cache.get(key);
  }
  put(key, value) {
    // if this is same key
    // ignore it triggers cachePolicy
    if (this.has(key)) {
      // this will mix LRU and LFU
      this.cache.delete(key);
    } else {
      // set for new key only, give it a chance to be counted
      this.cachePolicy.dataSource[key] = _constants.SECOND_CHANCE_TO_COUNT;
      // If the cache is full, apply the replacement policy to evict an item
      this.cachePolicy.onEvict(this.cache, this.delegate, key);
    }
    this.cache.set(key, value);
  }
  syncCache(key, value) {
    if (value) {
      // insert
      this.cache.set(key, value);
    } else {
      // remove
      this.cache.delete(key);
      // Also clean up policy tracking when removing
      this.cachePolicy.removeEntry(key);
    }
  }
  //

  export() {
    const jsonArray = Array.from(this.cache.entries());
    const jsonObj = {
      lruCachedLocalFiles: jsonArray,
      referenceBit: this.cachePolicy.dataSource
    };
    return jsonObj;
  }
  async load(jsonStr) {
    if ((0, _util.isNull)(jsonStr)) {
      return;
    }
    try {
      const jsonObj = JSON.parse(jsonStr);
      if (jsonObj) {
        // this should merge with current lruCachedLocalFiles
        this.cachePolicy.dataSource = jsonObj.referenceBit;
        //
        const previousAccessCache = new Map(jsonObj.lruCachedLocalFiles);
        this.cache.forEach((value, key) => {
          previousAccessCache.set(key, value);
        });
        this.cache = previousAccessCache;
      }
    } catch (error) {
      throw error;
    }
  }
  //

  clear() {
    // Clear the actual cache
    this.cache = new Map();

    // Clear the policy tracking
    this.cachePolicy.clear();
  }
}
exports.MemoryCacheProvider = MemoryCacheProvider;
//# sourceMappingURL=MemoryCacheProvider.js.map