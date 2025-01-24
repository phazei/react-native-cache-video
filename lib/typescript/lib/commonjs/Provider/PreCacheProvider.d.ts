export const __esModule: boolean;
export class PreCacheProvider {
    constructor(cacheFolder: any, sessionTask: any);
    isRunningThread: boolean;
    preCachingList: any[];
    cachingUrl: {};
    errorCachingList: {};
    sessionTask: any;
    cacheFolder: any;
    preCacheForList(urls: any): Promise<void>;
    runThread(callback: any): Promise<void>;
    preCacheFor(url: any): Promise<any>;
    cancelCachingList(): void;
    runCacheFromCDN(): Promise<void>;
    prepareSourceMedia(url: any): Promise<string>;
}
//# sourceMappingURL=PreCacheProvider.d.ts.map