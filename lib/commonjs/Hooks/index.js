"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _useProxyCacheProvider = require("./useProxyCacheProvider");
Object.keys(_useProxyCacheProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useProxyCacheProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useProxyCacheProvider[key];
    }
  });
});
var _useIsForeground = require("./useIsForeground");
Object.keys(_useIsForeground).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useIsForeground[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useIsForeground[key];
    }
  });
});
var _useCache = require("./useCache");
Object.keys(_useCache).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _useCache[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useCache[key];
    }
  });
});
//# sourceMappingURL=index.js.map