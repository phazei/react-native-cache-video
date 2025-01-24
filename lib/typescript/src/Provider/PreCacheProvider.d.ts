import type { PreCacheDelegate, PreCacheInterface, SessionTaskInterface } from '../types/type';
export declare class PreCacheProvider implements PreCacheInterface {
    private isRunningThread;
    private preCachingList;
    private cachingUrl;
    private errorCachingList;
    delegate?: PreCacheDelegate;
    sessionTask: SessionTaskInterface;
    cacheFolder: string;
    constructor(cacheFolder: string, sessionTask: SessionTaskInterface);
    preCacheForList(urls: string[]): Promise<void>;
    private runThread;
    preCacheFor(url: string): Promise<string>;
    cancelCachingList(): void;
    private runCacheFromCDN;
    private prepareSourceMedia;
}
//# sourceMappingURL=PreCacheProvider.d.ts.map