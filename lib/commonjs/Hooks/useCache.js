"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAsyncCache = void 0;
var _react = require("react");
var _constants = require("../Utils/constants");
var _util = require("../Utils/util");
var _useProxyCacheProvider = require("./useProxyCacheProvider");
const useAsyncCache = () => {
  const currentVideoUrl = (0, _react.useRef)(undefined);
  const [cachedVideoUrl, setVideoUrl] = (0, _react.useState)(undefined);
  //
  const {
    cacheManager
  } = (0, _useProxyCacheProvider.useProxyCacheManager)();
  const delayUpdateVideo = (0, _react.useCallback)(videoFile => setTimeout(() => {
    if (currentVideoUrl.current !== videoFile) {
      // wait for video load first video then play next video
      // trigger re-render to load new
      //
      currentVideoUrl.current = videoFile;
      setVideoUrl(videoFile);
    }
  }, _constants.THRESH_HOLD_TIMEOUT), []);
  const setVideoPlayUrlBy = (0, _react.useCallback)(async newUrl => {
    // in case onLayout call multiple times
    if (newUrl && cacheManager) {
      const isStream = (0, _util.isHLSUrl)(newUrl);

      // always loading from reverse proxy for stream link
      if (isStream) {
        const reverseVideoUrl = cacheManager.reverseProxyURL(newUrl);
        //
        delayUpdateVideo(reverseVideoUrl);
        return;
      }

      // try get pre-cached video url
      // applied for mp4 only because stream file need to using reverse proxy
      const cachedFile = await cacheManager.getCachedFileAsync(newUrl);

      // try load from cache for media file
      if (cachedFile) {
        delayUpdateVideo(cachedFile);
        return;
      }

      // try load from CDN
      delayUpdateVideo(newUrl);
      // and cache it the same time
      cacheManager.preCacheFor(newUrl).then(cacheManager.getCachedFile);
    } else {
      delayUpdateVideo(undefined);
    }
  }, [cacheManager, delayUpdateVideo]);
  const removeVideoFromCache = (0, _react.useCallback)(async url => {
    if (cacheManager) {
      await cacheManager.removeCachedVideo(url);
      // Clear our local state if this was the current video
      if (url === currentVideoUrl.current) {
        currentVideoUrl.current = undefined;
        setVideoUrl(undefined);
      }
    }
  }, [cacheManager]);
  return {
    setVideoPlayUrlBy,
    cachedVideoUrl,
    removeVideoFromCache
  };
};
exports.useAsyncCache = useAsyncCache;
//# sourceMappingURL=useCache.js.map