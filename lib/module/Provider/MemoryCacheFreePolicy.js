/**
 *
 * Free policy is a policy that doesn't care about anything, just cache it
 */
export class FreePolicy {
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
//# sourceMappingURL=MemoryCacheFreePolicy.js.map