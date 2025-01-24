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
/**
  If you want to avoid using BigInt,
  you can use a 32-bit FNV-1a hash algorithm twice,
  once for the first half of the string and once for the second half.
  This will give you two 32-bit hashes which you can concatenate to get a 64-bit hash.
  */
export function hashFileName(fileName: any): string;
export function cacheKey(resourceStr: any, folder: any, prefix?: string): string;
export function getCacheKey(urlStr: any, folder: any, prefix?: string): {
    originURL: URL;
    cacheKey: string;
};
export function pathReplaceLast(url: any, newPath: any): string;
export function getLastPath(url: any): any;
export function portGenerate(): number;
export function reverseProxyURL(reqUrl: any, port: any): string;
export function getOriginURL(reqUrl: any, port: any): string | null;
export function reverseProxyPlaylist(data: any, reqUrl: any, port: any): string;
export function processPlaylistLine(line: any, reqUrl: any, port: any): any;
export function lineByReplacingURI(line: any, reqUrl: any, port: any): any;
export function absoluteURL(line: any, reqUrl: any): any;
export function mergeWithCustomCondition(origin: any, dest: any, condition: any): any;
export function byteRangeStr(byteRange: any): string;
export function absoluteFilePath(filePath: any, options: any): any;
export function isNull(data: any): boolean;
export function getExtensionIfNeed(fileUrl: any, includeDot?: null): string;
export function mergeLargerNumber(a: any, b: any): number;
export function isMediaUrl(url: any): boolean;
export function isHLSUrl(url: any): boolean;
import { URL } from 'react-native-url-polyfill';
//# sourceMappingURL=util.d.ts.map