"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.absoluteFilePath = absoluteFilePath;
exports.absoluteURL = absoluteURL;
exports.byteRangeStr = byteRangeStr;
exports.cacheKey = cacheKey;
exports.getCacheKey = getCacheKey;
exports.getExtensionIfNeed = void 0;
exports.getLastPath = getLastPath;
exports.getOriginURL = getOriginURL;
exports.hashFileName = hashFileName;
exports.isNull = exports.isMediaUrl = exports.isHLSUrl = void 0;
exports.lineByReplacingURI = lineByReplacingURI;
exports.mergeLargerNumber = void 0;
exports.mergeWithCustomCondition = mergeWithCustomCondition;
exports.pathReplaceLast = pathReplaceLast;
exports.portGenerate = portGenerate;
exports.processPlaylistLine = processPlaylistLine;
exports.reverseProxyPlaylist = reverseProxyPlaylist;
exports.reverseProxyURL = reverseProxyURL;
var _reactNativeUrlPolyfill = require("react-native-url-polyfill");
var _constants = require("./constants");
//
const isNull = data => {
  if (data === undefined || data == null || data?.length === 0) {
    return true;
  } else if (typeof data === 'string') {
    data = String(data).trim();
    return data === '';
  } else if (typeof data === 'object' && data.constructor === Object) {
    if (Object.keys(data).length === 0) {
      return true;
    }
  } else if (Array.isArray(data) && data.length === 0) {
    return true;
  }
  return false;
};
exports.isNull = isNull;
const getExtensionIfNeed = (fileUrl, includeDot = null) => {
  const fileNameIndex = fileUrl.lastIndexOf('/');
  const extensionLastIndex = fileUrl.lastIndexOf('.') + 1;
  const dot = includeDot ? '.' : '';
  if (extensionLastIndex > -1 && extensionLastIndex > fileNameIndex) {
    return dot + fileUrl.substring(extensionLastIndex); // include dot
  }

  return '';
};
// MD5 - start
/**
function md5cycle(x: number[], k: number[]) {
  var a = x[0]!,
    b = x[1]!,
    c = x[2]!,
    d = x[3]!;

  a = ff(a, b, c, d, k[0]!, 7, -680876936);
  d = ff(d, a, b, c, k[1]!, 12, -389564586);
  c = ff(c, d, a, b, k[2]!, 17, 606105819);
  b = ff(b, c, d, a, k[3]!, 22, -1044525330);
  // ... More operations ...

  x[0] = add32(a, x[0]!);
  x[1] = add32(b, x[1]!);
  x[2] = add32(c, x[2]!);
  x[3] = add32(d, x[3]!);
}

function md5blk(s: string) {
  var md5blks = [],
    i; // array of 16x 32-bit integers

  for (i = 0; i < 64; i += 4) {
    md5blks[i >> 2] =
      s.charCodeAt(i) +
      (s.charCodeAt(i + 1) << 8) +
      (s.charCodeAt(i + 2) << 16) +
      (s.charCodeAt(i + 3) << 24);
  }
  return md5blks;
}

function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
  a = add32(add32(a, q), add32(x, t));
  return add32((a << s) | (a >>> (32 - s)), b);
}

function ff(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number
) {
  return cmn((b & c) | (~b & d), a, b, x, s, t);
}

function add32(x: number, y: number) {
  return (x + y) & 0xffffffff;
}

function md5(str: string) {
  var n = str.length,
    state = [1732584193, -271733879, -1732584194, 271733878],
    i;
  for (i = 64; i <= str.length; i += 64) {
    md5cycle(state, md5blk(str.substring(i - 64, i)));
  }
  str = str.substring(i - 64);
  var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (i = 0; i < str.length; i++)
    tail[i >> 2] |= str.charCodeAt(i) << (i % 4 << 3);
  tail[i >> 2] |= 0x80 << (i % 4 << 3);
  if (i > 55) {
    md5cycle(state, tail);
    for (i = 0; i < 16; i++) tail[i] = 0;
  }

  tail[14] = n * 8;
  md5cycle(state, tail);
  return state;
}
//
function rhex(n: number) {
  var hex_chr = '0123456789abcdef'.split('');
  var s = '',
    j = 0;
  for (; j < 4; j++)
    s += hex_chr[(n >> (j * 8 + 4)) & 0x0f]! + hex_chr[(n >> (j * 8)) & 0x0f];
  return s;
}

function hex(x: any[]) {
  for (var i = 0; i < x.length; i++) x[i] = rhex(x[i]!);
  return x.join('');
}

export function hashFileName(fileName: string) {
  return hex(md5(fileName));
}
*/
// MD5 - end
// MARK: - Utils
/**
  If you want to avoid using BigInt,
  you can use a 32-bit FNV-1a hash algorithm twice,
  once for the first half of the string and once for the second half.
  This will give you two 32-bit hashes which you can concatenate to get a 64-bit hash.
  */

// function hash32(str: string) {
//   let h = 2166136261 >>> 0; // offset_basis
//   for (let i = 0; i < str.length; i++) {
//     h ^= str.charCodeAt(i);
//     h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
//   }
//   return h >>> 0;
// }
exports.getExtensionIfNeed = getExtensionIfNeed;
function hashFileName(fileName) {
  let hash = 0;
  for (let i = 0; i < fileName.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + fileName.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash |= 0; // Convert to 32bit integer
  }

  return Math.abs(hash).toString(16).toUpperCase();
  //
  // const halfLength = Math.floor(fileName.length / 2);
  // const firstHalf = fileName.slice(0, halfLength);
  // const secondHalf = fileName.slice(halfLength);
  // const firstHash = hash32(firstHalf).toString(16).padStart(8, '0');
  // const secondHash = hash32(secondHalf).toString(16).padStart(8, '0');
  // return (firstHash + secondHash).toUpperCase();
}

function cacheKey(resourceStr, folder, prefix = '') {
  const resourceURL = new _reactNativeUrlPolyfill.URL(decodeURIComponent(resourceStr));
  const fileExt = getExtensionIfNeed(resourceURL.href);
  const hashedFileName = hashFileName(resourceURL.pathname);
  const filePath = `${folder}${isNull(prefix) ? '' : prefix + '-'}${hashedFileName}.${fileExt}`;
  return filePath;
}
function getCacheKey(urlStr, folder, prefix = '') {
  const decodeUrl = new _reactNativeUrlPolyfill.URL(decodeURIComponent(urlStr));
  const cacheKeyStr = cacheKey(urlStr, folder, prefix);
  return {
    originURL: decodeUrl,
    cacheKey: cacheKeyStr
  };
}
function pathReplaceLast(url, newPath) {
  const separator = '/';
  const pathComponents = url.split(separator).filter(Boolean);
  pathComponents.pop();
  pathComponents.push(newPath);
  const newPathname = pathComponents.join(separator);
  return new _reactNativeUrlPolyfill.URL(newPathname).pathname;
}
function getLastPath(url) {
  const path = url;
  if (!path || path === '/') {
    return '';
  }
  const parts = path.split('/');
  const lastPart = parts[parts.length - 1];
  return lastPart;
}
function portGenerate() {
  const port = Math.floor(Math.random() * (_constants.MAX_PORT - _constants.MIN_PORT + 1) + _constants.MIN_PORT);
  // return 58728;
  return port;
}

// MARK: http proxy server handle url
function reverseProxyURL(reqUrl, port) {
  if (!port) {
    return '';
  }
  const components = new _reactNativeUrlPolyfill.URLSearchParams();
  components.set(_constants.QUERY_ORIGIN_PATH, reqUrl);
  const lastPath = new _reactNativeUrlPolyfill.URL(reqUrl).pathname;
  const url = new _reactNativeUrlPolyfill.URL(`${_constants.LOCALHOST}:${port}${lastPath}`);
  url.search = components.toString();
  return url.href;
}
function getOriginURL(reqUrl, port) {
  const url = new _reactNativeUrlPolyfill.URL(`${_constants.LOCALHOST}:${port}` + reqUrl);
  const encodedURLString = url.searchParams.get(_constants.QUERY_ORIGIN_PATH) ?? '';
  const urlString = decodeURIComponent(encodedURLString);
  if (!encodedURLString) {
    return null;
  }
  return urlString;
}
function reverseProxyPlaylist(data, reqUrl, port) {
  const Buffer = require('buffer').Buffer;
  try {
    const dataStr = Buffer.from(data, 'base64').toString('utf8');
    const newTextData = dataStr.split('\n').map(line => {
      const result = processPlaylistLine(line, reqUrl, port);
      return result;
    }).join('\n');
    const playlistStr = Buffer.from(newTextData, 'utf8');
    //

    return playlistStr.toString('base64');
  } catch (error) {
    throw error;
  }
}
function processPlaylistLine(line, reqUrl, port) {
  if (isNull(line)) {
    return line;
  }
  if (line.startsWith('#')) {
    return lineByReplacingURI(line, reqUrl, port);
  }
  const originalSegmentURL = absoluteURL(line, reqUrl);
  const reverseProxyURLObj = reverseProxyURL(originalSegmentURL, port);
  if (reverseProxyURLObj) {
    return reverseProxyURLObj.toString();
  }
  return line;
}
function lineByReplacingURI(line, reqUrl, port) {
  const uriPattern = new RegExp(/URI="(.*)"/);
  const lineRange = {
    location: 0,
    length: line.length
  };
  const result = uriPattern.exec(line.substring(lineRange.location, lineRange.length));
  const uri = result?.[1];
  if (!uri) {
    return line;
  }
  // convert from relative path to absolute path
  // example: /hls/playlist.m3u8 -> scheme://host/hls/playlist.m3u8
  const originalSegmentURL = absoluteURL(uri, reqUrl);
  // convert from absolute path to reverse proxy path
  // example: scheme://host/hls/playlist.m3u8 -> localhost:port/hls/playlist.m3u8
  const reverseProxyURLObj = reverseProxyURL(originalSegmentURL, port);
  if (!reverseProxyURLObj) {
    return line;
  }
  const template = `URI="${reverseProxyURLObj.toString()}"`;
  return line.substring(0, result.index) + template + line.substring(result.index + result[0].length);
}
function absoluteURL(line, reqUrl) {
  if (line.startsWith('http://') || line.startsWith('https://')) {
    return line;
  }
  const originUrl = new _reactNativeUrlPolyfill.URL(decodeURIComponent(reqUrl));
  const scheme = originUrl.protocol;
  const host = originUrl.host;
  if (!scheme || !host) {
    return line;
  }
  let path;
  if (line.startsWith('/')) {
    path = line;
  } else {
    path = pathReplaceLast(originUrl.href, line);
  }
  return `${scheme}//${host}${path}`;
}
// Custom condition: choose the larger value
const mergeLargerNumber = (a, b) => Math.max(a, b);
exports.mergeLargerNumber = mergeLargerNumber;
function mergeWithCustomCondition(origin, dest, condition) {
  const result = {
    ...origin
  };

  // ignore if dest is null
  // because we don't need to merge
  if (isNull(dest)) {
    return result;
  }
  Object.entries(dest).forEach(([key, value]) => {
    if (result.hasOwnProperty(key)) {
      result[key] = condition(result[key], value);
    } else {
      result[key] = value;
    }
  });
  return result;
}
const isMediaUrl = url => {
  const urlObj = new _reactNativeUrlPolyfill.URL(url);
  const pathName = urlObj.pathname;
  const fileExt = getExtensionIfNeed(pathName);
  return _constants.VIDEO_EXTENSIONS.some(ext => ext.includes(fileExt.toLowerCase()));
};
exports.isMediaUrl = isMediaUrl;
const isHLSUrl = url => {
  const urlObj = new _reactNativeUrlPolyfill.URL(url);
  const pathName = urlObj.pathname;
  const fileExt = getExtensionIfNeed(pathName);
  return fileExt.toLowerCase() === 'm3u8';
};

/*  Turns segment byterange into a string suitable for use in
 *  HTTP Range requests
 */
exports.isHLSUrl = isHLSUrl;
function byteRangeStr(byteRange) {
  var byteRangeStart, byteRangeEnd;

  // Subtract 1 from byteRange end because length includes the 1st byte,
  // not the last one
  byteRangeEnd = byteRange.offset + byteRange.length - 1;
  byteRangeStart = byteRange.offset;
  return 'bytes=' + byteRangeStart + '-' + byteRangeEnd;
}

//
function absoluteFilePath(filePath, options) {
  const range = options?.Range || options?.range || options?.RANGE;
  if (range) {
    const rangePattern = new RegExp(/bytes=(\d+)-(\d+)/);
    const result = rangePattern.exec(range);
    const offset = result?.[1];
    const length = result?.[2];
    if (offset && length) {
      // make new filePath in include byteRange
      // current file path have format: <folder>/<prefix>-<hashname>.<extension>
      // add byte range to file path before extension
      const fileExt = getExtensionIfNeed(filePath);
      const fileName = filePath.replace(`.${fileExt}`, '');
      const newFilePath = `${fileName}-${offset}-${length}.${fileExt}`;
      return newFilePath;
    }
  }
  return filePath;
}
//# sourceMappingURL=util.js.map