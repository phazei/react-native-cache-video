import type { MemoryCacheDelegate, MemoryCachePolicyInterface } from '../types/type';
/**
 *
- LFUSize (Least Recently Used by Size): The least recently used item is evicted. This bases the eviction check on cache directory size in MB.
 */
export declare class LFUSizePolicy implements MemoryCachePolicyInterface {
    private isEvicting;
    private referenceBit;
    private capacityBytes;
    private storage;
    constructor(capacityMB: number);
    clear(): void;
    removeEntry(key: string): void;
    onAccess(cache: Map<string, any>, key: string): void;
    onEvict(cache: Map<string, any>, delegate?: MemoryCacheDelegate<any>, triggerKey?: string): Promise<void>;
    private findLFUKey;
    get dataSource(): {
        [key in string]: number;
    };
    set dataSource(data: {
        [key in string]: number;
    });
}
//# sourceMappingURL=MemoryCacheLFUSizePolicy.d.ts.map