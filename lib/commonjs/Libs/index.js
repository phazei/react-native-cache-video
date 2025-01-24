"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _session = require("../Libs/session");
Object.keys(_session).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _session[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _session[key];
    }
  });
});
var _fileSystem = require("../Libs/fileSystem");
Object.keys(_fileSystem).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _fileSystem[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fileSystem[key];
    }
  });
});
var _httpProxy = require("../Libs/httpProxy");
Object.keys(_httpProxy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _httpProxy[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _httpProxy[key];
    }
  });
});
//# sourceMappingURL=index.js.map