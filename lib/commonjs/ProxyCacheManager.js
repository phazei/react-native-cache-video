"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheManager = void 0;
var _constants = require("./Utils/constants");
var _fileSystem = require("./Libs/fileSystem");
var _session = require("./Libs/session");
var _util = require("./Utils/util");
var _MemoryCacheProvider = require("./Provider/MemoryCacheProvider");
var _httpProxy = require("./Libs/httpProxy");
var _PreCacheProvider = require("./Provider/PreCacheProvider");
class CacheManager {
  //

  //

  //
  constructor(serverName, devMode, _sessionTask = new _session.SimpleSessionProvider(), _storage = new _fileSystem.FileSystemManager()) {
    //
    this._sessionTask = _sessionTask;
    this._storage = _storage;
    this._bridgeServer = new _httpProxy.BridgeServer(serverName, devMode);
    this._preCache = new _PreCacheProvider.PreCacheProvider(this.cacheFolder, this._sessionTask);
    this._preCache.delegate = this;
  }
  get memoryCache() {
    return this._memoryCache;
  }
  get sessionTask() {
    return this._sessionTask;
  }
  get localFileUrl() {
    const localFileUrl = `${this.cacheFolder}${_constants.KEY_PREFIX}`;
    return localFileUrl;
  }
  get fileEncodingFormat() {
    return 'utf8';
  }
  get cacheFolder() {
    // absolute directory
    return this._storage.getBucketFolder(_fileSystem.FileBucket.cache);
  }
  // - MARK: CacheManager section
  putCachedFile(forKey, folder) {
    //
    const {
      originURL,
      cacheKey: cacheKeyStr
    } = (0, _util.getCacheKey)(forKey, folder, _constants.KEY_PREFIX);
    const key = originURL.href;
    this._memoryCache?.put(key, cacheKeyStr);
  }
  getCachedFile(forKey, folder = this.cacheFolder) {
    const {
      originURL
    } = (0, _util.getCacheKey)(forKey, folder, _constants.KEY_PREFIX);
    // return this.lruCachedLocalFiles[originURL.href];
    const key = originURL.href;
    return this._memoryCache?.get(key);
  }
  async getCachedFileAsync(url, folder = this.cacheFolder) {
    // Check memory cache first
    const cachedKey = this.getCachedFile(url);
    if (cachedKey) {
      // Verify file still exists
      if (await this._storage.existsFile(cachedKey)) {
        return cachedKey;
      } else {
        // File missing - clean up cache entries
        this._memoryCache?.syncCache(url);
        return undefined;
      }
    }

    // access cache in file system
    const {
      originURL,
      cacheKey: cacheKeyStr
    } = (0, _util.getCacheKey)(url, folder, _constants.KEY_PREFIX);
    if (await this._storage.existsFile(cacheKeyStr)) {
      this._memoryCache?.syncCache(originURL.href, cacheKeyStr);
      this.getCachedFile(originURL.href);
      return cacheKeyStr;
    }
    // remove reference if need
    this._memoryCache?.syncCache(originURL.href);
    return undefined;
  }
  // END: CacheManager section

  // - MARK: MemoryCache section
  enableMemoryCache(cachePolicy) {
    if (!this._memoryCache) {
      this._memoryCache = new _MemoryCacheProvider.MemoryCacheProvider(cachePolicy);
      this._memoryCache.delegate = this;
      this.loadCacheFromStorage();
    }
  }
  disableMemoryCache() {
    //
    this.saveCacheToStorage();
    this._memoryCache?.delegate && (this._memoryCache.delegate = undefined);
    this._memoryCache = undefined;
  }
  clearMemoryCache() {
    if (this._memoryCache) {
      this._memoryCache?.clear();
    }
  }
  async clearCache() {
    // Clear memory cache and policy
    this.clearMemoryCache();

    // Clear all files from cache directory
    const cacheDir = this._storage.getBucketFolder(_fileSystem.FileBucket.cache);
    await this._storage.clearDirectory(cacheDir);
  }
  async removeCachedVideo(url) {
    if (!this._memoryCache) {
      return;
    }

    // Get the original URL (needed as the key for memory cache)
    const {
      originURL
    } = (0, _util.getCacheKey)(url, this.cacheFolder, _constants.KEY_PREFIX);
    const key = originURL.href;

    // First get the cached file path
    const cachedPath = await this.getCachedFileAsync(url);

    // Clean up memory cache/policy regardless of file existence
    this._memoryCache.syncCache(key);

    // If we had a cached path, try to delete the file
    if (cachedPath) {
      try {
        await this.didEvictHandler(key, cachedPath);
      } catch (error) {
        // Still succeeded in cleaning cache/policy even if file deletion failed
      }
    }
  }
  setMemoryCacheDelegate(delegate) {
    this._memoryCache?.delegate && (this._memoryCache.delegate = delegate);
  }
  async didEvictHandler(key, filePath) {
    if ((0, _util.isHLSUrl)(key)) {
      // TODO:
      // console.warn('didEvictHandler: HLS url not support yet.');
    } else if (key && filePath) {
      await this._storage.unlinkFile(filePath);
    }
  }
  async loadCacheFromStorage() {
    try {
      const jsonStr = await this._storage.read(this.localFileUrl, this.fileEncodingFormat);
      this._memoryCache && this._memoryCache?.load(jsonStr);
    } catch (error) {
      throw error;
    }
  }
  saveCacheToStorage() {
    if (this._memoryCache) {
      //
      const memoryCache = this._memoryCache.export();
      // const jsonObj = Object.assign(memoryCache, { cachedLocalFiles: this.cachedLocalFiles });
      const jsonObj = Object.assign(memoryCache, {});
      const jsonStr = JSON.stringify(jsonObj);
      return this._storage.write(this.localFileUrl, jsonStr, this.fileEncodingFormat);
    }
    return Promise.resolve();
  }

  // END: MemoryCache section

  // - MARK: PreCache section
  async preCacheForList(urls) {
    await this._preCache?.preCacheForList(urls);
  }
  async preCacheFor(url) {
    return await this._preCache?.preCacheFor(url);
  }
  // END: PreCache section

  // - MARK: PreCacheDelegate
  async onCachingPlaylistSource(forUrl, data, folder) {
    const {
      originURL,
      cacheKey: cacheKeyStr
    } = (0, _util.getCacheKey)(forUrl, folder, _constants.KEY_PREFIX);
    if (data === _constants.SIGNAL_NOT_DOWNLOAD_ACTION) {
      // this fetch from exist check
      // silently save to cache
      // because it pre-cache
      this._memoryCache?.syncCache(originURL.href, cacheKeyStr);
    } else {
      // this download and need manually save
      // new file downloaded
      if (data) {
        await this._storage.write(cacheKeyStr, data);
      }
      this.putCachedFile(forUrl, this.cacheFolder);
    }
  }
  contain(forKey) {
    return this._memoryCache ? this._memoryCache?.has(forKey) : false;
  }
  existsFile(forKey) {
    return this._storage.existsFile(forKey);
  }
  // END: PreCacheDelegate

  // - MARK: BridgeServer
  enableBridgeServer(port) {
    //
    this.runningPort = port;
    this._bridgeServer.listen(port);
    //
    this.addRequestHandlers();
    //
    this.loadCacheFromStorage();
  }
  disableBridgeServer() {
    this.runningPort = undefined;
    this._bridgeServer?.stop();
    //
    this._preCache?.cancelCachingList();
    this._sessionTask?.cancelAllTask();
    //
    this.saveCacheToStorage();
  }
  reverseProxyURL(forUrl) {
    if (!forUrl.startsWith('http') || !this.runningPort || !(0, _util.isHLSUrl)(forUrl)) {
      console.warn('reverseProxyURL: invalid url or port.\nShould check if bridge server is running and has been used CDN url start with http protocol.');
      return forUrl;
    }
    return (0, _util.reverseProxyURL)(forUrl, this.runningPort);
  }
  // ======= playlist parser
  addRequestHandlers() {
    this._bridgeServer && this._bridgeServer.get('*', async (req, res) => {
      const urlStr = (0, _util.getOriginURL)(req.url, this.runningPort);
      let filePath = (0, _util.cacheKey)(urlStr ?? '', this.cacheFolder, _constants.KEY_PREFIX);
      if (!urlStr) {
        return res.send(400, 'text/plain', 'Bad Request');
      }
      //
      const defaultHeaders = Object.assign({}, req?.headers ?? {});
      // eslint-disable-next-line dot-notation
      delete defaultHeaders['Host'];
      // android
      delete defaultHeaders['host'];
      delete defaultHeaders['http-client-ip'];
      delete defaultHeaders['remote-addr'];
      //
      // console.log('====== addRequestHandlers: ', urlStr, defaultHeaders);
      //
      if ((0, _util.isHLSUrl)(urlStr)) {
        this.addPlaylistHandler(urlStr, filePath, defaultHeaders, res);
        //
      } else {
        //
        this.addSegmentHandler(urlStr, filePath, defaultHeaders, res);
      }
    });
  }
  async addPlaylistHandler(forUrl, __filePath, headers, reverseRes) {
    try {
      const port = this.runningPort;
      let playlistStr = '';
      const {
        data,
        error,
        ...response
      } = await this._sessionTask.dataTask(forUrl, {
        headers
      });
      if (error) {
        return reverseRes.send(500, 'text/plain', 'Cannot get data from origin server');
      }
      playlistStr = (0, _util.reverseProxyPlaylist)(data, forUrl, port);
      this.putCachedFile(forUrl, this.cacheFolder);
      this.getCachedFile(forUrl);
      //
      reverseRes.send(response.respInfo.status, response.respInfo.headers['Content-Type'], playlistStr);

      // only put new origin file playlist to cache
      // this._memoryCache?.syncCache(forUrl, filePath);
    } catch (error) {
      throw error;
    }
  }
  async addSegmentHandler(forUrl, filePath, headers, reverseRes) {
    const systemStorage = this._storage;
    const sessionTask = this._sessionTask;
    let absFilePath = (0, _util.absoluteFilePath)(filePath, headers);
    //
    try {
      systemStorage.readStream(absFilePath, async (streamData, streamError) => {
        if (streamError) {
          const {
            data,
            error,
            ...response
          } = await sessionTask.dataTask(forUrl, {
            headers
          });
          if (error) {
            return reverseRes.send(500, 'text/plain', 'Cannot get data from origin server');
          }
          //

          // do not need to cache segment data
          // this.syncMemoryCache(forUrl, data);
          systemStorage.write(absFilePath, data);
          // console.log('====== addSegmentHandler download cache: ', filePath);

          return reverseRes.send(200, response.respInfo.headers['Content-Type'], data);
        }
        // console.log('====== addSegmentHandler found cache: ', filePath);
        return reverseRes.send(200, _constants.HLS_VIDEO_TYPE, streamData);
      });
    } catch (error) {
      throw error;
    }
  }
}
exports.CacheManager = CacheManager;
//# sourceMappingURL=ProxyCacheManager.js.map