"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpProxy = exports.CacheVideoHttpProxy = exports.BridgeServer = void 0;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package 'react-native-cache-video' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;
const CacheVideoHttpProxyModule = isTurboModuleEnabled ? require('../NativeCacheVideoHttpProxy').default : _reactNative.NativeModules.CacheVideoHttpProxy;
const CacheVideoHttpProxy = exports.CacheVideoHttpProxy = CacheVideoHttpProxyModule ? CacheVideoHttpProxyModule : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
const HttpProxy = exports.HttpProxy = {
  start: (port, serviceName, callback) => {
    if (port === 80) {
      throw new Error('Invalid server port specified. Port 80 is reserved.');
    }
    CacheVideoHttpProxy.start(port, serviceName);
    _reactNative.DeviceEventEmitter.addListener('httpServerResponseReceived', callback);
  },
  stop: () => {
    CacheVideoHttpProxy.stop();
    _reactNative.DeviceEventEmitter.removeAllListeners('httpServerResponseReceived');
  },
  respond: (requestId, code, type, body) => CacheVideoHttpProxy.respond(requestId, code, type, body)
};
//
class Request {
  constructor(rawRequest) {
    const {
      requestId,
      postData,
      type,
      url,
      ...headers
    } = rawRequest;
    this.requestId = requestId;
    this.postData = postData;
    this.type = type;
    this.url = url;
    this.headers = headers;
  }
  get data() {
    return JSON.parse(this.postData);
  }
}
class Response {
  constructor(requestId) {
    this.requestId = requestId;
    this.closed = false;
  }
  send(code, type, body) {
    if (this.closed) {
      throw new Error('Response already sent');
    }
    HttpProxy.respond(this.requestId, code, type, body);
    this.closed = true;
  }
  json(obj, code = 200) {
    this.send(code, 'application/json', JSON.stringify(obj));
  }
  html(html, code = 200) {
    return this.send(code, 'text/html', html);
  }
}
class BridgeServer {
  constructor(serviceName, devMode) {
    if (!serviceName) {
      throw new Error('Invalid service name');
    }
    this.serviceName = serviceName;
    this.callbacks = [];
    this.isRunning = false;
    if (BridgeServer.server) {
      if (devMode) {
        BridgeServer.server.stop();
      } else {
        // throw new Error(
        //   'Only one instance of HttpServer is allowed. Use HttpServer.server to access the instance.'
        // );
        return BridgeServer.server;
      }
    }
    BridgeServer.server = this;
  }

  // override all function of BridgeServer
  get(url, callback) {
    this.callbacks.push({
      method: 'GET',
      url,
      callback
    });
  }
  post(url, callback) {
    this.callbacks.push({
      method: 'POST',
      url,
      callback
    });
  }
  put(url, callback) {
    this.callbacks.push({
      method: 'PUT',
      url,
      callback
    });
  }
  delete(url, callback) {
    this.callbacks.push({
      method: 'DELETE',
      url,
      callback
    });
  }
  patch(url, callback) {
    this.callbacks.push({
      method: 'PATCH',
      url,
      callback
    });
  }
  use(callback) {
    this.callbacks.push({
      method: '*',
      url: '*',
      callback
    });
  }
  listen = port => {
    if (this.isRunning) {
      console.warn('HttpServer is already running in port ' + port, '. Please stop it first');
      return;
    }
    this.isRunning = true;
    if (port < 0 || port > 65535) {
      throw new Error('Invalid port number');
    }
    HttpProxy.start(port, this.serviceName, async rawRequest => {
      //
      const request = new Request(rawRequest);
      const callbacks = this.callbacks.filter(c => (c.method === request.type || c.method === '*') && (c.url === request.url || c.url === '*'));
      for (const c of callbacks) {
        const response = new Response(request.requestId);
        const result = await c.callback(request, response);
        if (result) {
          response.json(result);
        }
        if (response.closed) {
          return;
        }
      }
    });
  };
  stop() {
    HttpProxy.stop();
    this.isRunning = false;
  }
}
exports.BridgeServer = BridgeServer;
//# sourceMappingURL=httpProxy.js.map