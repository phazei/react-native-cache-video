/**
 *
 * Free policy is a policy that doesn't care about anything, just cache it
 */
export class FreePolicy {
    clear(): void;
    removeEntry(_key: any): void;
    onAccess(_cache: any, _key: any): void;
    onEvict(_cache: any, _delegate: any): void;
    set dataSource(arg: {});
    get dataSource(): {};
}
//# sourceMappingURL=MemoryCacheFreePolicy.d.ts.map