export function useAsyncCache(): {
    setVideoPlayUrlBy: (newUrl: any) => Promise<void>;
    cachedVideoUrl: undefined;
    removeVideoFromCache: (url: any) => Promise<void>;
};
//# sourceMappingURL=useCache.d.ts.map