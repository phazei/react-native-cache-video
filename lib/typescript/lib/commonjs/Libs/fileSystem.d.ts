export const __esModule: boolean;
export const FileBucket: {};
export class FileSystemManager {
    static get shared(): FileSystemManager;
    read(resourceURL: any, format?: string): Promise<any>;
    write(resourceURL: any, content: any, format?: string): Promise<void>;
    getBucketFolder(bucket: any): any;
    forEachBucket(callBack: any): void;
    containInBucket(fileUri: any): boolean;
    configuration(): Promise<void>;
    clearDirectory(bucket: any): Promise<void>;
    clearBucket(bucket: any): Promise<void>;
    copyfile(fromPath: any, toBucket: any): Promise<any>;
    unlinkFile(fromPath: any): Promise<void>;
    getStatistic(fromUrl: any): Promise<any>;
    getStatisticList(directory: any): Promise<any>;
    existsFile(forFile: any): Promise<boolean>;
    readStream(resourceURL: any, callback: any, format?: string, bufferSize?: number): Promise<void>;
}
//# sourceMappingURL=fileSystem.d.ts.map