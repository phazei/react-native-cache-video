import React from 'react';
import { CacheManager } from '../ProxyCacheManager';
import type { MemoryCachePolicyInterface } from '../types/type';
/**
 * from reactjs.org/docs/context.html#reactcreatecontext: "
 *  The defaultValue argument is only used when a component does not have a matching Provider above it in the tree.
 *  This can be helpful for testing components in isolation without wrapping them.
 *  Note: passing undefined as a Provider value does not cause consuming components to use defaultValue.
 *  "
 */
export declare const CacheManagerContext: React.Context<{
    cacheManager: CacheManager;
}>;
export declare const CacheManagerProvider: ({ cachePolicy, devMode, children, }: {
    cachePolicy?: MemoryCachePolicyInterface | undefined;
    devMode?: boolean | undefined;
    children: any;
}) => JSX.Element;
export declare function useProxyCacheManager(): {
    cacheManager: CacheManager;
};
//# sourceMappingURL=useProxyCacheProvider.d.ts.map