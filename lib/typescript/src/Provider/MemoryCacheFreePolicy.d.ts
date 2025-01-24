import type { MemoryCacheDelegate, MemoryCachePolicyInterface } from '../types/type';
/**
 *
 * Free policy is a policy that doesn't care about anything, just cache it
 */
export declare class FreePolicy implements MemoryCachePolicyInterface {
    constructor();
    clear(): void;
    removeEntry(_key: string): void;
    onAccess(_cache: Map<string, any>, _key: string): void;
    onEvict(_cache: Map<string, any>, _delegate?: MemoryCacheDelegate<any>): void;
    get dataSource(): {
        [key in string]: number;
    };
    set dataSource(_data: {
        [key in string]: number;
    });
}
//# sourceMappingURL=MemoryCacheFreePolicy.d.ts.map