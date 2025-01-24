"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FreePolicy = void 0;
/**
 *
 * Free policy is a policy that doesn't care about anything, just cache it
 */
class FreePolicy {
  constructor() {}
  clear() {}
  removeEntry(_key) {}
  onAccess(_cache, _key) {}
  onEvict(_cache, _delegate) {}
  //
  get dataSource() {
    return {};
  }
  set dataSource(_data) {}
}
exports.FreePolicy = FreePolicy;
//# sourceMappingURL=MemoryCacheFreePolicy.js.map