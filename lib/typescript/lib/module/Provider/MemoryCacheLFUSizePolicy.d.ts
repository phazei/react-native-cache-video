/**
 *
- LFUSize (Least Recently Used by Size): The least recently used item is evicted. This bases the eviction check on cache directory size in MB.
 */
export class LFUSizePolicy {
    constructor(capacityMB: any);
    isEvicting: boolean;
    referenceBit: {};
    capacityBytes: number;
    storage: FileSystemManager;
    clear(): void;
    removeEntry(key: any): void;
    onAccess(cache: any, key: any): void;
    onEvict(cache: any, delegate: any, triggerKey: any): Promise<void>;
    findLFUKey(files: any, cache: any, excludeKey: any): any;
    set dataSource(arg: {});
    get dataSource(): {};
}
import { FileSystemManager } from '../Libs/fileSystem';
//# sourceMappingURL=MemoryCacheLFUSizePolicy.d.ts.map