export const __esModule: boolean;
export const CacheVideoHttpProxy: any;
export namespace HttpProxy {
    function start(port: any, serviceName: any, callback: any): void;
    function stop(): void;
    function respond(requestId: any, code: any, type: any, body: any): any;
}
export class BridgeServer {
    constructor(serviceName: any, devMode: any);
    serviceName: any;
    callbacks: any[];
    isRunning: boolean;
    get(url: any, callback: any): void;
    post(url: any, callback: any): void;
    put(url: any, callback: any): void;
    delete(url: any, callback: any): void;
    patch(url: any, callback: any): void;
    use(callback: any): void;
    listen: (port: any) => void;
    stop(): void;
}
//# sourceMappingURL=httpProxy.d.ts.map