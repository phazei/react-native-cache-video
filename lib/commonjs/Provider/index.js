"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _MemoryCacheLFUPolicy = require("./MemoryCacheLFUPolicy");
Object.keys(_MemoryCacheLFUPolicy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MemoryCacheLFUPolicy[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MemoryCacheLFUPolicy[key];
    }
  });
});
var _MemoryCacheLFUSizePolicy = require("./MemoryCacheLFUSizePolicy");
Object.keys(_MemoryCacheLFUSizePolicy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MemoryCacheLFUSizePolicy[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MemoryCacheLFUSizePolicy[key];
    }
  });
});
var _MemoryCacheProvider = require("./MemoryCacheProvider");
Object.keys(_MemoryCacheProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MemoryCacheProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MemoryCacheProvider[key];
    }
  });
});
var _PreCacheProvider = require("./PreCacheProvider");
Object.keys(_PreCacheProvider).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _PreCacheProvider[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _PreCacheProvider[key];
    }
  });
});
var _MemoryCacheFreePolicy = require("./MemoryCacheFreePolicy");
Object.keys(_MemoryCacheFreePolicy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MemoryCacheFreePolicy[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MemoryCacheFreePolicy[key];
    }
  });
});
//# sourceMappingURL=index.js.map