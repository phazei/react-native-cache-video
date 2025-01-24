"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIDEO_EXTENSIONS = exports.THRESH_HOLD_TIMEOUT = exports.SIGNAL_NOT_DOWNLOAD_ACTION = exports.SECOND_CHANCE_TO_COUNT = exports.QUERY_ORIGIN_PATH = exports.MIN_PORT = exports.MAX_PORT = exports.LOCALHOST = exports.KEY_PREFIX = exports.HLS_VIDEO_TYPE = exports.HLS_CONTENT_TYPE = exports.HLS_CACHING_RESTART = void 0;
//
const SIGNAL_NOT_DOWNLOAD_ACTION = exports.SIGNAL_NOT_DOWNLOAD_ACTION = 0x1;
// this is important to avoid evict item that just download and does not access anytime
// we assume that if item is not access in any time, it will be have second chance to access
const SECOND_CHANCE_TO_COUNT = exports.SECOND_CHANCE_TO_COUNT = 0;
const KEY_PREFIX = exports.KEY_PREFIX = 'react-native-cache-video';

// application/x-mpegurl
// application/vnd.apple.mpegurl
const HLS_CONTENT_TYPE = exports.HLS_CONTENT_TYPE = 'application/x-mpegurl';
const HLS_VIDEO_TYPE = exports.HLS_VIDEO_TYPE = 'video/MP2T';
const HLS_CACHING_RESTART = exports.HLS_CACHING_RESTART = 'RNCV_HLS_CACHING_RESTART';
const QUERY_ORIGIN_PATH = exports.QUERY_ORIGIN_PATH = '__hls_origin_url';
const LOCALHOST = exports.LOCALHOST = 'http://127.0.0.1';
const VIDEO_EXTENSIONS = exports.VIDEO_EXTENSIONS = ['mp4', 'webm', 'mov', 'avi', 'wmv'];
const THRESH_HOLD_TIMEOUT = exports.THRESH_HOLD_TIMEOUT = 300;
const MIN_PORT = exports.MIN_PORT = 49152;
const MAX_PORT = exports.MAX_PORT = 65535;
//# sourceMappingURL=constants.js.map