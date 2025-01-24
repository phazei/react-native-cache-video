/**
 *
- LRU (Least Recently Used): The least recently used item is evicted. This policy is often used to keep recently accessed items in the cache.
- LFU (Least Frequently Used): The least frequently used item is evicted. This policy is based on the number of accesses to each item.
- LFUSize (Least Frequently Used by Size): The least frequently used item is evicted. This bases the eviction check on cache directory size in MB.
- FIFO (First-In-First-Out): The first item added to the cache is the first one to be evicted. This is a straightforward and easy-to-implement policy.
- Random Replacement: A random item is selected for eviction. This policy does not consider access patterns and can lead to uneven cache performance.
- MRU (Most Recently Used): The most recently used item is evicted. In contrast to LRU, MRU keeps the most recent item in the cache.
- Second-Chance or Clock: Similar to the Second-Chance page replacement algorithm, this policy gives items a second chance before evicting them based on a reference bit.
 */
export class LFUPolicy {
    constructor(capacity: any);
    referenceBit: {};
    capacity: any;
    clear(): void;
    removeEntry(key: any): void;
    onAccess(cache: any, key: any): void;
    onEvict(cache: any, delegate: any): void;
    set dataSource(arg: {});
    get dataSource(): {};
}
//# sourceMappingURL=MemoryCacheLFUPolicy.d.ts.map