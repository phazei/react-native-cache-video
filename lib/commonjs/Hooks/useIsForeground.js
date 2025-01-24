"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIsForeground = void 0;
var _react = require("react");
var _reactNative = require("react-native");
const useIsForeground = () => {
  const [isForeground, setIsForeground] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    const onChange = state => {
      setIsForeground(state === 'active');
    };
    const listener = _reactNative.AppState.addEventListener('change', onChange);
    return () => listener.remove();
  }, [setIsForeground]);
  return isForeground;
};
exports.useIsForeground = useIsForeground;
//# sourceMappingURL=useIsForeground.js.map