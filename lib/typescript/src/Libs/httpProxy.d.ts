import type { BridgeServerInterface, HttpServer } from '../types/type';
export declare const CacheVideoHttpProxy: HttpServer;
export declare const HttpProxy: {
    start: (port: number, serviceName: string, callback: (response: any) => void) => void;
    stop: () => void;
    respond: (requestId: number, code: number, type: string, body: string) => void;
};
export declare class BridgeServer implements BridgeServerInterface {
    serviceName: string;
    isRunning: boolean;
    callbacks: {
        method: string;
        url: string;
        callback: Function;
    }[];
    static server: BridgeServer;
    constructor(serviceName: string, devMode: boolean);
    get(url: string, callback: Function): void;
    post(url: string, callback: Function): void;
    put(url: string, callback: Function): void;
    delete(url: string, callback: Function): void;
    patch(url: string, callback: Function): void;
    use(callback: Function): void;
    listen: (port: number) => void;
    stop(): void;
}
//# sourceMappingURL=httpProxy.d.ts.map