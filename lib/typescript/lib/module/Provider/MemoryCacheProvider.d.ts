export class MemoryCacheProvider {
    constructor(cachePolicy: any);
    cache: Map<any, any>;
    cachePolicy: any;
    has(key: any): boolean;
    get(key: any): any;
    put(key: any, value: any): void;
    syncCache(key: any, value: any): void;
    export(): {
        lruCachedLocalFiles: [any, any][];
        referenceBit: any;
    };
    load(jsonStr: any): Promise<void>;
    clear(): void;
}
//# sourceMappingURL=MemoryCacheProvider.d.ts.map