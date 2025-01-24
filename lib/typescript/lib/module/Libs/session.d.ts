export * from "react-native-blob-util";
export class SimpleSessionProvider {
    downloadingList: {};
    dataTask: (url: any, options: any, callback: any) => import("react-native-blob-util").StatefulPromise<import("react-native-blob-util").FetchBlobResponse>;
    cancelTask: (url: any) => void;
    cancelAllTask: () => void;
}
//# sourceMappingURL=session.d.ts.map