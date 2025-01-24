export function useProxyCacheManager(): {
    cacheManager: CacheManager;
};
/**
 * from reactjs.org/docs/context.html#reactcreatecontext: "
 *  The defaultValue argument is only used when a component does not have a matching Provider above it in the tree.
 *  This can be helpful for testing components in isolation without wrapping them.
 *  Note: passing undefined as a Provider value does not cause consuming components to use defaultValue.
 *  "
 */
export const CacheManagerContext: React.Context<{
    cacheManager: CacheManager;
}>;
export function CacheManagerProvider({ cachePolicy, devMode, children }: {
    cachePolicy: any;
    devMode?: boolean | undefined;
    children: any;
}): React.FunctionComponentElement<React.ProviderProps<{
    cacheManager: CacheManager;
}>>;
import { CacheManager } from '../ProxyCacheManager';
import React from 'react';
//# sourceMappingURL=useProxyCacheProvider.d.ts.map