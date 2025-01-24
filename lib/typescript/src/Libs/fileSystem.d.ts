import type { Encoding } from 'react-native-blob-util';
export declare enum FileBucket {
    cache = "react-native-cache-video/"
}
export declare class FileSystemManager {
    private static _instance;
    constructor();
    static get shared(): FileSystemManager;
    getBucketFolder(bucket?: FileBucket): string;
    forEachBucket(callBack: (directory: string) => void): void;
    containInBucket(fileUri: string): boolean;
    configuration(): Promise<void>;
    clearDirectory(bucket: string): Promise<void>;
    clearBucket(bucket: FileBucket): Promise<void>;
    copyfile(fromPath: string, toBucket: FileBucket): Promise<string>;
    unlinkFile(fromPath?: string): Promise<void>;
    getStatistic(fromUrl?: string): Promise<import("react-native-blob-util").ReactNativeBlobUtilStat>;
    getStatisticList(directory?: string): Promise<import("react-native-blob-util").ReactNativeBlobUtilStat[]>;
    existsFile(forFile: string): Promise<boolean>;
    read(resourceURL: string, format?: Encoding): Promise<string>;
    readStream(resourceURL: string, callback: (data: string, error?: Error) => void, format?: Encoding, bufferSize?: number): Promise<void>;
    write(resourceURL: string, content: string, format?: Encoding): Promise<void>;
}
//# sourceMappingURL=fileSystem.d.ts.map