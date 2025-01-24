"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreCacheProvider = void 0;
var _constants = require("../Utils/constants");
var _util = require("../Utils/util");
class PreCacheProvider {
  isRunningThread = false;
  // support hash table for origin url ready to cache
  // page of caching list, this data structure is array of requesting
  preCachingList = [];
  // support cancel mechanism
  cachingUrl = {};
  // support for re-cache if need
  errorCachingList = {};
  //

  //
  constructor(cacheFolder, sessionTask) {
    this.sessionTask = sessionTask;
    this.cacheFolder = cacheFolder;
    //
  }

  // MARK: - Pre-cache
  // pre-caching mechanism
  // download url to local file
  // ignore new request if file is already exist
  // ignore new request if file is already downloading
  async preCacheForList(urls) {
    // check cached file exist or not
    const existCache = url => this.delegate?.existsFile((0, _util.cacheKey)(url, this.cacheFolder, _constants.KEY_PREFIX));
    // filter empty url
    const validUrls = urls.filter(url => url.length > 0);
    // check cached file exist or not
    const existsCachedFiles = await Promise.all(validUrls.map(existCache));
    const newPage = [];
    existsCachedFiles.forEach(async (exist, index) => {
      const urlStr = validUrls[index];
      const originURL = new URL(urlStr);
      // pushes to cached list if it exists in file system
      if (exist) {
        // this.cache.setCachedFile(urlStr);
        // update to cached list
        this.delegate?.onCachingPlaylistSource(urlStr, _constants.SIGNAL_NOT_DOWNLOAD_ACTION, this.cacheFolder);
        // get first segment of playlist if need
        if ((0, _util.isHLSUrl)(urlStr)) {
          // TODO:
        }
        // continue if the file already exists
        return;
      } else {
        // cached file does not exist in system
        if (
        // not in queue to caching
        !this.preCachingList.includes(originURL.href) && (
        // doest not have any cached list
        // not in current cached list
        !this.delegate || !this.delegate?.contain(originURL.href))) {
          // first state we need push as queue
          newPage.push(originURL.href);
        } else {
          // TODO:
          // waiting for download
          // or already cached file
          // or retry
        }
      }
    });
    this.preCachingList.unshift(...newPage);
    this.runThread(this.runCacheFromCDN.bind(this));
  }

  // need focus on current cache
  // if in free state, run cache list
  async runThread(callback) {
    // don't run if already running
    // don't need to wait for run
    if (this.isRunningThread) {
      return;
    }
    this.isRunningThread = true;
    try {
      await callback();
    } catch (error) {
      throw error;
    } finally {
      // reset semaphore
      this.isRunningThread = false;
    }
  }
  async preCacheFor(url) {
    // detect stream or not
    if ((0, _util.isHLSUrl)(url)) {
      // return this.prepareSourceStream(url);
      console.warn('react-native-cache-video does not support pre stream caching');
      return url;
    } else if ((0, _util.isMediaUrl)(url)) {
      return this.prepareSourceMedia(url);
    } else {
      return url;
    }
  }
  cancelCachingList() {
    Object.entries(this.cachingUrl).forEach(([originUrl, httpRequest]) => {
      if (httpRequest && httpRequest.cancel) {
        httpRequest.cancel();
        delete this.errorCachingList[originUrl];
        //
        const indexed = this.preCachingList.indexOf(originUrl);
        if (indexed > -1) {
          // only splice array when item is found
          this.preCachingList.splice(indexed, 1); // 2nd parameter means remove one item only
        }
      }
    });

    this.cachingUrl = {};
  }

  // MARK: - Cache from CDN
  async runCacheFromCDN() {
    // run caching
    const originURL = this.preCachingList.shift();
    if (originURL && !this.cachingUrl[originURL]) {
      // making sync request
      await this.preCacheFor(originURL);
      // delay 300ms
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    // continue if need
    if (this.preCachingList.length > 0) {
      this.runCacheFromCDN();
      return;
    }
    return Promise.resolve();
  }
  async prepareSourceMedia(url) {
    const {
      originURL,
      cacheKey: prepareCacheKey
    } = (0, _util.getCacheKey)(url, this.cacheFolder, _constants.KEY_PREFIX);
    try {
      // start download
      const httpRequest = this.sessionTask.dataTask(originURL.href, {
        overwrite: true,
        fileCache: true,
        path: prepareCacheKey
      });

      // mark it as downloading
      this.cachingUrl[originURL.href] = httpRequest;

      // update to cached list
      this.delegate?.onCachingPlaylistSource(originURL.href, null, this.cacheFolder);
      await httpRequest;
      if (this.errorCachingList[originURL.href]) {
        delete this.errorCachingList[originURL.href];
      }
      return originURL.href;
    } catch (error) {
      // maybe cancel case
      this.errorCachingList[originURL.href] = prepareCacheKey;
      return originURL.href;
    } finally {
      delete this.cachingUrl[originURL.href];
    }
  }
  // - MARK: Utils
  // END: Utils
}
exports.PreCacheProvider = PreCacheProvider;
//# sourceMappingURL=PreCacheProvider.js.map