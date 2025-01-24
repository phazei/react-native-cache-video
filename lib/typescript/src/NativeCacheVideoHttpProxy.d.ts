import type { TurboModule } from 'react-native';
export interface Spec extends TurboModule {
    start(port: number, serviceName: string): void;
    stop(): void;
    respond(requestId: number, code: number, type: string, body: string): void;
}
declare const _default: Spec;
export default _default;
//# sourceMappingURL=NativeCacheVideoHttpProxy.d.ts.map