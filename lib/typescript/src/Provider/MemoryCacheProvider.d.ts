import type { MemoryCacheDelegate, MemoryCacheInterface, MemoryCachePolicyInterface } from '../types/type';
export declare class MemoryCacheProvider<V> implements MemoryCacheInterface<V> {
    private cache;
    cachePolicy: MemoryCachePolicyInterface;
    delegate: MemoryCacheDelegate<V> | undefined;
    constructor(cachePolicy: MemoryCachePolicyInterface);
    has(key: string): boolean;
    get(key: string): V | undefined;
    put(key: string, value: V): void;
    syncCache(key: string, value?: V): void;
    export(): {
        lruCachedLocalFiles: [string, V][];
        referenceBit: any;
    };
    load(jsonStr: string): Promise<void>;
    clear(): void;
}
//# sourceMappingURL=MemoryCacheProvider.d.ts.map