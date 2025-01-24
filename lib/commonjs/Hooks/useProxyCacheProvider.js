"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheManagerProvider = exports.CacheManagerContext = void 0;
exports.useProxyCacheManager = useProxyCacheManager;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = _interopRequireDefault(require("react-native"));
var _ProxyCacheManager = require("../ProxyCacheManager");
var _useIsForeground = require("./useIsForeground");
var _constants = require("../Utils/constants");
var _util = require("../Utils/util");
var _userDefinedGuard = require("../user-defined-guard");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
//
/**
 * from reactjs.org/docs/context.html#reactcreatecontext: "
 *  The defaultValue argument is only used when a component does not have a matching Provider above it in the tree.
 *  This can be helpful for testing components in isolation without wrapping them.
 *  Note: passing undefined as a Provider value does not cause consuming components to use defaultValue.
 *  "
 */
const CacheManagerContext = exports.CacheManagerContext = /*#__PURE__*/(0, _react.createContext)({
  cacheManager: new _ProxyCacheManager.CacheManager('react-native-cache-video', __DEV__)
});
CacheManagerContext.displayName = Symbol('CacheManagerContext').toString();
const CacheManagerProvider = ({
  cachePolicy,
  devMode = true,
  children
}) => {
  const cacheManager = (0, _react.useRef)(new _ProxyCacheManager.CacheManager('react-native-cache-video', devMode));
  //
  const isForeground = (0, _useIsForeground.useIsForeground)();
  //
  // we dont use state here because we dont want to re-render the component
  // you should listen HLS_CACHING_RESTART event to get the running port
  const notifyEvent = (0, _react.useCallback)(runningPort => {
    _reactNative.default.DeviceEventEmitter.emit(_constants.HLS_CACHING_RESTART, runningPort);
  }, []);
  (0, _react.useEffect)(() => {
    const server = cacheManager.current;
    // check with user define type guard to avoid undefined
    // apply cache policy that implement MemoryCachePolicyInterface

    if ((0, _userDefinedGuard.isMemoryCachePolicyInterface)(cachePolicy)) {
      server.enableMemoryCache(cachePolicy);
    }
    return () => {
      server.disableMemoryCache();
    };
  }, [cachePolicy]);
  (0, _react.useEffect)(() => {
    const server = cacheManager.current;
    if (isForeground) {
      const port = (0, _util.portGenerate)();
      server.enableBridgeServer(port);
      setTimeout(() => notifyEvent(port), 1000);
    } else if (!isForeground) {
      server.disableBridgeServer();
    }
    return () => {
      server.disableBridgeServer();
    };
  }, [isForeground, notifyEvent]);
  return /*#__PURE__*/_react.default.createElement(CacheManagerContext.Provider, {
    value: {
      cacheManager: cacheManager.current
    }
  }, children);
};
exports.CacheManagerProvider = CacheManagerProvider;
function useProxyCacheManager() {
  const shared = _react.default.useContext(CacheManagerContext);
  return shared;
}
//# sourceMappingURL=useProxyCacheProvider.js.map