import type { FetchBlobResponse, StatefulPromise } from 'react-native-blob-util';
import type { SessionTaskInterface, SessionTaskOptionsType } from '../types/type';
export * from 'react-native-blob-util';
export declare class SimpleSessionProvider implements SessionTaskInterface {
    private downloadingList;
    dataTask: (url: string, options: SessionTaskOptionsType, callback?: ((data: any, res: any, error?: Error) => void) | undefined) => StatefulPromise<FetchBlobResponse>;
    cancelTask: (url: string) => void;
    cancelAllTask: () => void;
}
//# sourceMappingURL=session.d.ts.map