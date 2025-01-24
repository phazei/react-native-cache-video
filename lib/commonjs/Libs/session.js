"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  SimpleSessionProvider: true
};
exports.SimpleSessionProvider = void 0;
var _reactNativeBlobUtil = _interopRequireWildcard(require("react-native-blob-util"));
Object.keys(_reactNativeBlobUtil).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _reactNativeBlobUtil[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _reactNativeBlobUtil[key];
    }
  });
});
var _constants = require("../Utils/constants");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class SimpleSessionProvider {
  // current caching m3u8 playlist
  // any are session task object
  downloadingList = {};
  dataTask = (url, options, callback) => {
    const downloadTask = _reactNativeBlobUtil.default.config({
      session: _constants.KEY_PREFIX,
      ...options
    }).fetch('GET', url, {
      'RNFB-Response': 'base64',
      ...options.headers
    });
    // mark it as downloading
    this.downloadingList[url] = downloadTask;
    // listen response download
    downloadTask.then(res => {
      // res.respInfo?.headers && console.log(res.respInfo?.headers);
      callback && callback(res.data, res, undefined);
    }).catch(error => {
      callback && callback(null, null, error);
    }).finally(() => {
      delete this.downloadingList[url];
    });
    //
    return downloadTask;
  };
  cancelTask = url => {
    const downloadTask = this.downloadingList[url];
    if (!downloadTask) {
      return;
    }
    downloadTask.cancel();
    delete this.downloadingList[url];
  };
  cancelAllTask = () => {
    Object.entries(this.downloadingList).forEach(([url, downloadTask]) => {
      url && downloadTask?.cancel();
    });
    this.downloadingList = {};
  };
}
exports.SimpleSessionProvider = SimpleSessionProvider;
//# sourceMappingURL=session.js.map