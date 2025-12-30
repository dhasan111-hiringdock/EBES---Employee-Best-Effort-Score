import { EventEmitter } from "node:events";
import { Writable } from "node:stream";
const hrtime$1 = /* @__PURE__ */ Object.assign(function hrtime(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, { bigint: function bigint() {
  return BigInt(Date.now() * 1e6);
} });
class ReadStream {
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
}
class WriteStream {
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
}
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = () => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  };
  return Object.assign(fn, { __unenv__: true });
}
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
const NODE_VERSION = "22.14.0";
class Process extends EventEmitter {
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw /* @__PURE__ */ createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw /* @__PURE__ */ createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw /* @__PURE__ */ createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw /* @__PURE__ */ createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw /* @__PURE__ */ createNotImplementedError("process.kill");
  }
  abort() {
    throw /* @__PURE__ */ createNotImplementedError("process.abort");
  }
  dlopen() {
    throw /* @__PURE__ */ createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw /* @__PURE__ */ createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw /* @__PURE__ */ createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw /* @__PURE__ */ createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw /* @__PURE__ */ createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw /* @__PURE__ */ createNotImplementedError("process.openStdin");
  }
  assert() {
    throw /* @__PURE__ */ createNotImplementedError("process.assert");
  }
  binding() {
    throw /* @__PURE__ */ createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: () => 0 });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
}
const globalProcess = globalThis["process"];
const getBuiltinModule = globalProcess.getBuiltinModule;
const workerdProcess = getBuiltinModule("node:process");
const isWorkerdProcessV2 = globalThis.Cloudflare.compatibilityFlags.enable_nodejs_process_v2;
const unenvProcess = new Process({
  env: globalProcess.env,
  // `hrtime` is only available from workerd process v2
  hrtime: isWorkerdProcessV2 ? workerdProcess.hrtime : hrtime$1,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
const { exit, features, platform } = workerdProcess;
const {
  // Always implemented by workerd
  env,
  // Only implemented in workerd v2
  hrtime: hrtime2,
  // Always implemented by workerd
  nextTick
} = unenvProcess;
const {
  _channel,
  _disconnect,
  _events,
  _eventsCount,
  _handleQueue,
  _maxListeners,
  _pendingMessage,
  _send,
  assert,
  disconnect,
  mainModule
} = unenvProcess;
const {
  // @ts-expect-error `_debugEnd` is missing typings
  _debugEnd,
  // @ts-expect-error `_debugProcess` is missing typings
  _debugProcess,
  // @ts-expect-error `_exiting` is missing typings
  _exiting,
  // @ts-expect-error `_fatalException` is missing typings
  _fatalException,
  // @ts-expect-error `_getActiveHandles` is missing typings
  _getActiveHandles,
  // @ts-expect-error `_getActiveRequests` is missing typings
  _getActiveRequests,
  // @ts-expect-error `_kill` is missing typings
  _kill,
  // @ts-expect-error `_linkedBinding` is missing typings
  _linkedBinding,
  // @ts-expect-error `_preload_modules` is missing typings
  _preload_modules,
  // @ts-expect-error `_rawDebug` is missing typings
  _rawDebug,
  // @ts-expect-error `_startProfilerIdleNotifier` is missing typings
  _startProfilerIdleNotifier,
  // @ts-expect-error `_stopProfilerIdleNotifier` is missing typings
  _stopProfilerIdleNotifier,
  // @ts-expect-error `_tickCallback` is missing typings
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  availableMemory,
  // @ts-expect-error `binding` is missing typings
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  // @ts-expect-error `domain` is missing typings
  domain,
  emit,
  emitWarning,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  // @ts-expect-error `initgroups` is missing typings
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  memoryUsage,
  // @ts-expect-error `moduleLoadList` is missing typings
  moduleLoadList,
  off,
  on,
  once,
  // @ts-expect-error `openStdin` is missing typings
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  // @ts-expect-error `reallyExit` is missing typings
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = isWorkerdProcessV2 ? workerdProcess : unenvProcess;
const _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime2,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
globalThis.process = _process;
const noop = Object.assign(() => {
}, { __unenv__: true });
const _console = globalThis.console;
const _ignoreErrors = true;
const _stderr = new Writable();
const _stdout = new Writable();
const Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
const _times = /* @__PURE__ */ new Map();
const _stdoutErrorHandler = noop;
const _stderrErrorHandler = noop;
const workerdConsole = globalThis["console"];
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
globalThis.console = workerdConsole;
const _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
const _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
const nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
class PerformanceEntry {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
}
const PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
class PerformanceMeasure extends PerformanceEntry {
  entryType = "measure";
}
class PerformanceResourceTiming extends PerformanceEntry {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
}
class PerformanceObserverEntryList {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
}
class Performance {
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
}
class PerformanceObserver {
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw /* @__PURE__ */ createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
}
const performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
var compose = (middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
  };
};
var parseBody = async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
};
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
var handleParsingAllValues = (form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    form[key] = value;
  }
};
var handleParsingNestedValues = (form, key, value) => {
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
};
var splitPath = (path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
};
var splitRoutingPath = (routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
};
var extractGroupsFromPath = (path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match, index) => {
    const mark = `@${index}`;
    groups.push([mark, match]);
    return mark;
  });
  return { groups, path };
};
var replaceGroupMarks = (paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label, next) => {
  if (label === "*") {
    return "*";
  }
  const match = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match[1], new RegExp(`^${match[2]}(?=/${next})`)] : [label, match[1], new RegExp(`^${match[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
};
var tryDecode = (str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match) => {
      try {
        return decoder(match);
      } catch {
        return match;
      }
    });
  }
};
var tryDecodeURI = (str) => tryDecode(str, decodeURI);
var getPath = (request) => {
  const url = request.url;
  const start = url.indexOf("/", 8);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const path = url.slice(start, queryIndex === -1 ? void 0 : queryIndex);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63) {
      break;
    }
  }
  return url.slice(start, i);
};
var getPathNoStrict = (request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
};
var mergePath = (base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
};
var checkOptionalParameter = (path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
};
var _decodeURI = (value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? decodeURIComponent_(value) : value;
};
var _getQueryParam = (url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf(`?${key}`, 8);
    if (keyIndex2 === -1) {
      keyIndex2 = url.indexOf(`&${key}`, 8);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;
var tryDecodeURIComponent = (str) => tryDecode(str, decodeURIComponent_);
var HonoRequest = class {
  raw;
  #validatedData;
  #matchResult;
  routeIndex = 0;
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param ? /\%/.test(param) ? tryDecodeURIComponent(param) : param : void 0;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value && typeof value === "string") {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return this.bodyCache.parsedBody ??= await parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw[key]();
  };
  json() {
    return this.#cachedBody("json");
  }
  text() {
    return this.#cachedBody("text");
  }
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  blob() {
    return this.#cachedBody("blob");
  }
  formData() {
    return this.#cachedBody("formData");
  }
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};
var HtmlEscapedCallbackPhase = {
  Stringify: 1
};
var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  {
    return resStr;
  }
};
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setHeaders = (headers, map = {}) => {
  for (const key of Object.keys(map)) {
    headers.set(key, map[key]);
  }
  return headers;
};
var Context = class {
  #rawRequest;
  #req;
  env = {};
  #var;
  finalized = false;
  error;
  #status = 200;
  #executionCtx;
  #headers;
  #preparedHeaders;
  #res;
  #isFresh = true;
  #layout;
  #renderer;
  #notFoundHandler;
  #matchResult;
  #path;
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  get res() {
    this.#isFresh = false;
    return this.#res ||= new Response("404 Not Found", { status: 404 });
  }
  set res(_res) {
    this.#isFresh = false;
    if (this.#res && _res) {
      _res = new Response(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  setLayout = (layout) => this.#layout = layout;
  getLayout = () => this.#layout;
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = new Response(this.#res.body, this.#res);
    }
    if (value === void 0) {
      if (this.#headers) {
        this.#headers.delete(name);
      } else if (this.#preparedHeaders) {
        delete this.#preparedHeaders[name.toLocaleLowerCase()];
      }
      if (this.finalized) {
        this.res.headers.delete(name);
      }
      return;
    }
    if (options?.append) {
      if (!this.#headers) {
        this.#isFresh = false;
        this.#headers = new Headers(this.#preparedHeaders);
        this.#preparedHeaders = {};
      }
      this.#headers.append(name, value);
    } else {
      if (this.#headers) {
        this.#headers.set(name, value);
      } else {
        this.#preparedHeaders ??= {};
        this.#preparedHeaders[name.toLowerCase()] = value;
      }
    }
    if (this.finalized) {
      if (options?.append) {
        this.res.headers.append(name, value);
      } else {
        this.res.headers.set(name, value);
      }
    }
  };
  status = (status) => {
    this.#isFresh = false;
    this.#status = status;
  };
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    if (this.#isFresh && !headers && !arg && this.#status === 200) {
      return new Response(data, {
        headers: this.#preparedHeaders
      });
    }
    if (arg && typeof arg !== "number") {
      const header = new Headers(arg.headers);
      if (this.#headers) {
        this.#headers.forEach((v, k) => {
          if (k === "set-cookie") {
            header.append(k, v);
          } else {
            header.set(k, v);
          }
        });
      }
      const headers2 = setHeaders(header, this.#preparedHeaders);
      return new Response(data, {
        headers: headers2,
        status: arg.status ?? this.#status
      });
    }
    const status = typeof arg === "number" ? arg : this.#status;
    this.#preparedHeaders ??= {};
    this.#headers ??= new Headers();
    setHeaders(this.#headers, this.#preparedHeaders);
    if (this.#res) {
      this.#res.headers.forEach((v, k) => {
        if (k === "set-cookie") {
          this.#headers?.append(k, v);
        } else {
          this.#headers?.set(k, v);
        }
      });
      setHeaders(this.#headers, this.#preparedHeaders);
    }
    headers ??= {};
    for (const [k, v] of Object.entries(headers)) {
      if (typeof v === "string") {
        this.#headers.set(k, v);
      } else {
        this.#headers.delete(k);
        for (const v2 of v) {
          this.#headers.append(k, v2);
        }
      }
    }
    return new Response(data, {
      status,
      headers: this.#headers
    });
  }
  newResponse = (...args) => this.#newResponse(...args);
  body = (data, arg, headers) => {
    return typeof arg === "number" ? this.#newResponse(data, arg, headers) : this.#newResponse(data, arg);
  };
  text = (text, arg, headers) => {
    if (!this.#preparedHeaders) {
      if (this.#isFresh && !headers && !arg) {
        return new Response(text);
      }
      this.#preparedHeaders = {};
    }
    this.#preparedHeaders["content-type"] = TEXT_PLAIN;
    if (typeof arg === "number") {
      return this.#newResponse(text, arg, headers);
    }
    return this.#newResponse(text, arg);
  };
  json = (object, arg, headers) => {
    const body = JSON.stringify(object);
    this.#preparedHeaders ??= {};
    this.#preparedHeaders["content-type"] = "application/json";
    return typeof arg === "number" ? this.#newResponse(body, arg, headers) : this.#newResponse(body, arg);
  };
  html = (html, arg, headers) => {
    this.#preparedHeaders ??= {};
    this.#preparedHeaders["content-type"] = "text/html; charset=UTF-8";
    if (typeof html === "object") {
      return resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then((html2) => {
        return typeof arg === "number" ? this.#newResponse(html2, arg, headers) : this.#newResponse(html2, arg);
      });
    }
    return typeof arg === "number" ? this.#newResponse(html, arg, headers) : this.#newResponse(html, arg);
  };
  redirect = (location, status) => {
    this.#headers ??= new Headers();
    this.#headers.set("Location", String(location));
    return this.newResponse(null, status ?? 302);
  };
  notFound = () => {
    this.#notFoundHandler ??= () => new Response();
    return this.#notFoundHandler(this);
  };
};
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
};
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";
var notFoundHandler = (c) => {
  return c.text("404 Not Found", 404);
};
var errorHandler = (err, c) => {
  if ("getResponse" in err) {
    return err.getResponse();
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
};
var Hono$1 = class Hono {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  router;
  getPath;
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new Hono$1({
      router: this.router,
      getPath: this.getPath
    });
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  errorHandler = errorHandler;
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res;
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        replaceRequest = options.replaceRequest;
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    };
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env2, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env2, "GET")))();
    }
    const path = this.getPath(request, { env: env2 });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env: env2,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  };
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
};
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
var Node$1 = class Node {
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name && pattern[2]) {
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new Node$1();
        if (name !== "") {
          node.#varIndex = context.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name !== "") {
        paramMap.push([name, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new Node$1();
      }
    }
    node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};
var Trie = class {
  #context = { varIndex: 0 };
  #root = new Node$1();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};
var emptyParam = [];
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
var RegExpRouter = class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match(method, path) {
    clearWildcardRegExpCache();
    const matchers = this.#buildAllMatchers();
    this.match = (method2, path2) => {
      const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
      const staticMatch = matcher[2][path2];
      if (staticMatch) {
        return staticMatch;
      }
      const match = path2.match(matcher[0]);
      if (!match) {
        return [[], emptyParam];
      }
      const index = match.indexOf("", 1);
      return [matcher[1][index], match];
    };
    return this.match(method, path);
  }
  #buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
};
var SmartRouter = class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};
var emptyParams = /* @__PURE__ */ Object.create(null);
var Node2 = class {
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (Object.keys(curNode.#children).includes(key)) {
        curNode = curNode.#children[key];
        const pattern2 = getPattern(p, nextP);
        if (pattern2) {
          possibleKeys.push(pattern2[1]);
        }
        continue;
      }
      curNode.#children[key] = new Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    const m = /* @__PURE__ */ Object.create(null);
    const handlerSet = {
      handler,
      possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
      score: this.#order
    };
    m[method] = handlerSet;
    curNode.#methods.push(m);
    return curNode;
  }
  #getHandlerSets(node, method, nodeParams, params) {
    const handlerSets = [];
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
    return handlerSets;
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              handlerSets.push(
                ...this.#getHandlerSets(nextNode.#children["*"], method, node.#params)
              );
            }
            handlerSets.push(...this.#getHandlerSets(nextNode, method, node.#params));
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              handlerSets.push(...this.#getHandlerSets(astNode, method, node.#params));
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          if (part === "") {
            continue;
          }
          const [key, name, matcher] = pattern;
          const child = node.#children[key];
          const restPathString = parts.slice(i).join("/");
          if (matcher instanceof RegExp) {
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              handlerSets.push(...this.#getHandlerSets(child, method, node.#params, params));
              if (Object.keys(child.#children).length) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              handlerSets.push(...this.#getHandlerSets(child, method, params, node.#params));
              if (child.#children["*"]) {
                handlerSets.push(
                  ...this.#getHandlerSets(child.#children["*"], method, params, node.#params)
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      curNodes = tempNodes.concat(curNodesQueue.shift() ?? []);
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};
var TrieRouter = class {
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
};
var Hono2 = class extends Hono$1 {
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};
var cors = (options) => {
  const defaults = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    allowHeaders: [],
    exposeHeaders: []
  };
  const opts = {
    ...defaults,
    ...options
  };
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  return async function cors2(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    const allowOrigin = findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.origin !== "*") {
      const existingVary = c.req.header("Vary");
      if (existingVary) {
        set("Vary", existingVary);
      } else {
        set("Vary", "Origin");
      }
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (opts.exposeHeaders?.length) {
      set("Access-Control-Expose-Headers", opts.exposeHeaders.join(","));
    }
    if (c.req.method === "OPTIONS") {
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      if (opts.allowMethods?.length) {
        set("Access-Control-Allow-Methods", opts.allowMethods.join(","));
      }
      let headers = opts.allowHeaders;
      if (!headers?.length) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      if (headers?.length) {
        set("Access-Control-Allow-Headers", headers.join(","));
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
  };
};
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
const ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
const getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
const ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
const quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
class ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
}
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
const errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
let overrideErrorMap = errorMap;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
const makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
const EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === errorMap ? void 0 : errorMap
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
class ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
}
const INVALID = Object.freeze({
  status: "aborted"
});
const DIRTY = (value) => ({ status: "dirty", value });
const OK = (value) => ({ status: "valid", value });
const isAborted = (x) => x.status === "aborted";
const isDirty = (x) => x.status === "dirty";
const isValid = (x) => x.status === "valid";
const isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));
class ParseInputLazyPath {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
}
const handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
class ZodType {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const cuidRegex = /^c[^\s-]{8,}$/i;
const cuid2Regex = /^[0-9a-z]+$/;
const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const nanoidRegex = /^[a-z0-9_-]{21}$/i;
const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
const durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
const _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
let emojiRegex;
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
const ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
const base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
const dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version2) {
  if ((version2 === "v4" || !version2) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version2 === "v6" || !version2) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version2) {
  if ((version2 === "v4" || !version2) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version2 === "v6" || !version2) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
class ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
class ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
}
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
class ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
class ZodBoolean extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
class ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
}
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
class ZodSymbol extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
class ZodUndefined extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
class ZodNull extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
class ZodAny extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
class ZodUnknown extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
class ZodNever extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
}
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
class ZodVoid extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
class ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
class ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
}
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
class ZodUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
}
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
const getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
class ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
}
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
class ZodIntersection extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
}
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
class ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
}
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
class ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
}
class ZodMap extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
}
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
class ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
class ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), errorMap].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), errorMap].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
}
class ZodLazy extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
}
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
class ZodLiteral extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
}
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
class ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
}
ZodEnum.create = createZodEnum;
class ZodNativeEnum extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
}
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
class ZodPromise extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
}
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
class ZodEffects extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
}
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
class ZodOptional extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
class ZodNullable extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
class ZodDefault extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
class ZodCatch extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
class ZodNaN extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
}
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
const BRAND = Symbol("zod_brand");
class ZodBranded extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
}
class ZodReadonly extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
const late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
const instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
const stringType = ZodString.create;
const numberType = ZodNumber.create;
const nanType = ZodNaN.create;
const bigIntType = ZodBigInt.create;
const booleanType = ZodBoolean.create;
const dateType = ZodDate.create;
const symbolType = ZodSymbol.create;
const undefinedType = ZodUndefined.create;
const nullType = ZodNull.create;
const anyType = ZodAny.create;
const unknownType = ZodUnknown.create;
const neverType = ZodNever.create;
const voidType = ZodVoid.create;
const arrayType = ZodArray.create;
const objectType = ZodObject.create;
const strictObjectType = ZodObject.strictCreate;
const unionType = ZodUnion.create;
const discriminatedUnionType = ZodDiscriminatedUnion.create;
const intersectionType = ZodIntersection.create;
const tupleType = ZodTuple.create;
const recordType = ZodRecord.create;
const mapType = ZodMap.create;
const setType = ZodSet.create;
const functionType = ZodFunction.create;
const lazyType = ZodLazy.create;
const literalType = ZodLiteral.create;
const enumType = ZodEnum.create;
const nativeEnumType = ZodNativeEnum.create;
const promiseType = ZodPromise.create;
const effectsType = ZodEffects.create;
const optionalType = ZodOptional.create;
const nullableType = ZodNullable.create;
const preprocessType = ZodEffects.createWithPreprocess;
const pipelineType = ZodPipeline.create;
const ostring = () => stringType().optional();
const onumber = () => numberType().optional();
const oboolean = () => booleanType().optional();
const coerce = {
  string: ((arg) => ZodString.create({ ...arg, coerce: true })),
  number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
  boolean: ((arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  })),
  bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
  date: ((arg) => ZodDate.create({ ...arg, coerce: true }))
};
const NEVER = INVALID;
const z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BRAND,
  DIRTY,
  EMPTY_PATH,
  INVALID,
  NEVER,
  OK,
  ParseStatus,
  Schema: ZodType,
  ZodAny,
  ZodArray,
  ZodBigInt,
  ZodBoolean,
  ZodBranded,
  ZodCatch,
  ZodDate,
  ZodDefault,
  ZodDiscriminatedUnion,
  ZodEffects,
  ZodEnum,
  ZodError,
  get ZodFirstPartyTypeKind() {
    return ZodFirstPartyTypeKind;
  },
  ZodFunction,
  ZodIntersection,
  ZodIssueCode,
  ZodLazy,
  ZodLiteral,
  ZodMap,
  ZodNaN,
  ZodNativeEnum,
  ZodNever,
  ZodNull,
  ZodNullable,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodParsedType,
  ZodPipeline,
  ZodPromise,
  ZodReadonly,
  ZodRecord,
  ZodSchema: ZodType,
  ZodSet,
  ZodString,
  ZodSymbol,
  ZodTransformer: ZodEffects,
  ZodTuple,
  ZodType,
  ZodUndefined,
  ZodUnion,
  ZodUnknown,
  ZodVoid,
  addIssueToContext,
  any: anyType,
  array: arrayType,
  bigint: bigIntType,
  boolean: booleanType,
  coerce,
  custom,
  date: dateType,
  datetimeRegex,
  defaultErrorMap: errorMap,
  discriminatedUnion: discriminatedUnionType,
  effect: effectsType,
  enum: enumType,
  function: functionType,
  getErrorMap,
  getParsedType,
  instanceof: instanceOfType,
  intersection: intersectionType,
  isAborted,
  isAsync,
  isDirty,
  isValid,
  late,
  lazy: lazyType,
  literal: literalType,
  makeIssue,
  map: mapType,
  nan: nanType,
  nativeEnum: nativeEnumType,
  never: neverType,
  null: nullType,
  nullable: nullableType,
  number: numberType,
  object: objectType,
  get objectUtil() {
    return objectUtil;
  },
  oboolean,
  onumber,
  optional: optionalType,
  ostring,
  pipeline: pipelineType,
  preprocess: preprocessType,
  promise: promiseType,
  quotelessJson,
  record: recordType,
  set: setType,
  setErrorMap,
  strictObject: strictObjectType,
  string: stringType,
  symbol: symbolType,
  transformer: effectsType,
  tuple: tupleType,
  undefined: undefinedType,
  union: unionType,
  unknown: unknownType,
  get util() {
    return util;
  },
  void: voidType
}, Symbol.toStringTag, { value: "Module" }));
const app$b = new Hono2();
const LoginSchema = objectType({
  email: stringType().email(),
  password: stringType().min(1)
});
app$b.post("/api/auth/login", async (c) => {
  const db = c.env.DB;
  try {
    const body = await c.req.json();
    const { email, password } = LoginSchema.parse(body);
    const user = await db.prepare("SELECT * FROM users WHERE LOWER(email) = LOWER(?)").bind(email).first();
    if (!user) {
      console.error(`Login failed: User not found for email: ${email}`);
      return c.json({ error: "Invalid email or password" }, 401);
    }
    const userData = user;
    if (!userData.is_active) {
      return c.json({ error: "Your account has been deactivated. Please contact your administrator." }, 403);
    }
    if (userData.password !== password) {
      console.error(`Login failed: Invalid password for email: ${email}`);
      return c.json({ error: "Invalid email or password" }, 401);
    }
    const userRole = userData.email === "ebes@gmail.com" ? "super_admin" : userData.role;
    return c.json({
      success: true,
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userRole,
        user_code: userData.user_code,
        is_active: userData.is_active
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ error: "An error occurred during login" }, 500);
  }
});
app$b.post("/api/auth/logout", async (c) => {
  return c.json({ success: true });
});
z.object({
  id: z.number(),
  mocha_user_id: z.string(),
  email: z.string(),
  user_code: z.string(),
  role: z.enum(["admin", "recruiter", "account_manager", "recruitment_manager"]),
  name: z.string(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string()
});
z.object({
  id: z.number(),
  client_code: z.string(),
  name: z.string(),
  short_name: z.string(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string()
});
z.object({
  id: z.number(),
  team_code: z.string(),
  name: z.string(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string()
});
const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  role: z.enum(["admin", "recruiter", "account_manager", "recruitment_manager"]),
  password: z.string().min(6)
});
const UpdateUserSchema = z.object({
  name: z.string().min(1).optional(),
  role: z.enum(["admin", "recruiter", "account_manager", "recruitment_manager"]).optional(),
  password: z.string().min(6).optional(),
  is_active: z.boolean().optional()
});
const UpdateClientSchema = z.object({
  name: z.string().min(1).optional(),
  short_name: z.string().min(1).max(10).optional(),
  is_active: z.boolean().optional()
});
const UpdateTeamSchema = z.object({
  name: z.string().min(1).optional(),
  is_active: z.boolean().optional()
});
const CreateClientSchema = z.object({
  name: z.string().min(1),
  short_name: z.string().min(1).max(10)
});
const CreateTeamSchema = z.object({
  name: z.string().min(1)
});
const AssignTeamSchema = z.object({
  user_id: z.number(),
  team_id: z.number()
});
const AssignClientSchema = z.object({
  user_id: z.number(),
  client_id: z.number()
});
const app$a = new Hono2();
const authOnly$1 = async (c, next) => {
  const db = c.env.DB;
  const userId = c.req.header("x-user-id");
  if (!userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  const user = await db.prepare("SELECT * FROM users WHERE id = ? AND is_active = 1").bind(userId).first();
  if (!user) {
    return c.json({ error: "Unauthorized" }, 403);
  }
  c.set("user", user);
  await next();
};
app$a.get("/api/notifications", authOnly$1, async (c) => {
  const db = c.env.DB;
  const user = c.get("user");
  const limit = c.req.query("limit") || "20";
  const unreadOnly = c.req.query("unread_only") === "true";
  try {
    let query = "SELECT * FROM notifications WHERE user_id = ?";
    const params = [user.id];
    if (unreadOnly) {
      query += " AND is_read = 0";
    }
    query += " ORDER BY created_at DESC LIMIT ?";
    params.push(parseInt(limit));
    const notifications = await db.prepare(query).bind(...params).all();
    return c.json(notifications.results || []);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return c.json({ error: "Failed to fetch notifications" }, 500);
  }
});
app$a.get("/api/notifications/unread-count", authOnly$1, async (c) => {
  const db = c.env.DB;
  const user = c.get("user");
  try {
    const result = await db.prepare("SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND is_read = 0").bind(user.id).first();
    return c.json({ count: result?.count || 0 });
  } catch (error) {
    console.error("Error fetching unread count:", error);
    return c.json({ error: "Failed to fetch unread count" }, 500);
  }
});
app$a.put("/api/notifications/:id/read", authOnly$1, async (c) => {
  const db = c.env.DB;
  const user = c.get("user");
  const notificationId = c.req.param("id");
  try {
    const notification = await db.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(notificationId, user.id).first();
    if (!notification) {
      return c.json({ error: "Notification not found" }, 404);
    }
    await db.prepare("UPDATE notifications SET is_read = 1, updated_at = datetime('now') WHERE id = ?").bind(notificationId).run();
    return c.json({ success: true });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return c.json({ error: "Failed to mark notification as read" }, 500);
  }
});
app$a.put("/api/notifications/read-all", authOnly$1, async (c) => {
  const db = c.env.DB;
  const user = c.get("user");
  try {
    await db.prepare("UPDATE notifications SET is_read = 1, updated_at = datetime('now') WHERE user_id = ? AND is_read = 0").bind(user.id).run();
    return c.json({ success: true });
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return c.json({ error: "Failed to mark all as read" }, 500);
  }
});
app$a.delete("/api/notifications/:id", authOnly$1, async (c) => {
  const db = c.env.DB;
  const user = c.get("user");
  const notificationId = c.req.param("id");
  try {
    const notification = await db.prepare("SELECT * FROM notifications WHERE id = ? AND user_id = ?").bind(notificationId, user.id).first();
    if (!notification) {
      return c.json({ error: "Notification not found" }, 404);
    }
    await db.prepare("DELETE FROM notifications WHERE id = ?").bind(notificationId).run();
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return c.json({ error: "Failed to delete notification" }, 500);
  }
});
async function createNotification(db, params) {
  try {
    await db.prepare(
      `INSERT INTO notifications (user_id, type, title, message, related_entity_type, related_entity_id)
         VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(
      params.userId,
      params.type,
      params.title,
      params.message,
      params.relatedEntityType || null,
      params.relatedEntityId || null
    ).run();
  } catch (error) {
    console.error("Error creating notification:", error);
  }
}
const app$9 = new Hono2();
const adminOnly$1 = async (c, next) => {
  const db = c.env.DB;
  try {
    const userId = c.req.header("x-user-id");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const appUser = await db.prepare("SELECT * FROM users WHERE id = ? AND role = 'admin' AND is_active = 1").bind(userId).first();
    if (!appUser) {
      return c.json({ error: "Unauthorized - Admin access required" }, 403);
    }
    c.set("appUser", appUser);
    await next();
  } catch (error) {
    return c.json({ error: "Unauthorized" }, 401);
  }
};
async function generateUserCode(db, role) {
  let category;
  let prefix;
  switch (role) {
    case "admin":
      category = "admin";
      prefix = "ADM";
      break;
    case "recruitment_manager":
      category = "recruitment_manager";
      prefix = "RM";
      break;
    case "account_manager":
      category = "account_manager";
      prefix = "AM";
      break;
    case "recruiter":
      category = "recruiter";
      prefix = "REC";
      break;
    default:
      throw new Error("Invalid role");
  }
  const counter = await db.prepare("SELECT next_number FROM code_counters WHERE category = ?").bind(category).first();
  const number = counter.next_number;
  const code = `${prefix}-${number.toString().padStart(3, "0")}`;
  await db.prepare("UPDATE code_counters SET next_number = next_number + 1 WHERE category = ?").bind(category).run();
  return code;
}
async function generateClientCode(db, shortName) {
  const prefix = `CL-${shortName.toUpperCase()}`;
  const existingCodes = await db.prepare("SELECT client_code FROM clients WHERE client_code LIKE ?").bind(`${prefix}-%`).all();
  let maxNumber = 0;
  for (const row of existingCodes.results || []) {
    const code = row.client_code;
    const parts = code.split("-");
    if (parts.length === 3) {
      const num = parseInt(parts[2], 10);
      if (!isNaN(num) && num > maxNumber) {
        maxNumber = num;
      }
    }
  }
  const nextNumber = maxNumber + 1;
  return `${prefix}-${nextNumber.toString().padStart(3, "0")}`;
}
async function generateTeamCode(db) {
  const existingCodes = await db.prepare("SELECT team_code FROM app_teams ORDER BY id DESC LIMIT 1").first();
  let nextNumber = 1;
  if (existingCodes) {
    const code = existingCodes.team_code;
    const parts = code.split("-");
    if (parts.length === 2 && parts[0] === "TEAM") {
      const num = parseInt(parts[1], 10);
      if (!isNaN(num)) {
        nextNumber = num + 1;
      }
    }
  }
  return `TEAM-${nextNumber.toString().padStart(3, "0")}`;
}
app$9.post("/api/admin/users", adminOnly$1, async (c) => {
  const body = await c.req.json();
  const validatedData = CreateUserSchema.parse(body);
  const db = c.env.DB;
  try {
    const existingUser = await db.prepare("SELECT * FROM users WHERE email = ?").bind(validatedData.email).first();
    if (existingUser) {
      return c.json({ error: "User with this email already exists" }, 400);
    }
    const userCode = await generateUserCode(db, validatedData.role);
    const mochaUserId = `pending_${validatedData.email}`;
    const result = await db.prepare(`
        INSERT INTO users (mocha_user_id, email, user_code, role, name, password, is_active)
        VALUES (?, ?, ?, ?, ?, ?, 1)
      `).bind(mochaUserId, validatedData.email, userCode, validatedData.role, validatedData.name, validatedData.password).run();
    await createNotification(db, {
      userId: result.meta.last_row_id,
      type: "system",
      title: "Welcome to EBES",
      message: `Your account has been created. Your user code is ${userCode}. Please check your email for login credentials.`,
      relatedEntityType: "user",
      relatedEntityId: result.meta.last_row_id
    });
    return c.json({
      success: true,
      id: result.meta.last_row_id,
      user_code: userCode
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return c.json({ error: "Failed to create user" }, 500);
  }
});
app$9.get("/api/admin/users", adminOnly$1, async (c) => {
  const db = c.env.DB;
  try {
    const users = await db.prepare("SELECT * FROM users ORDER BY created_at DESC").all();
    return c.json(users.results || []);
  } catch (error) {
    return c.json({ error: "Failed to fetch users" }, 500);
  }
});
app$9.put("/api/admin/users/:id", adminOnly$1, async (c) => {
  const userId = c.req.param("id");
  const body = await c.req.json();
  const validatedData = UpdateUserSchema.parse(body);
  const db = c.env.DB;
  try {
    const user = await db.prepare("SELECT email, role FROM users WHERE id = ?").bind(userId).first();
    if (user?.email === "dhasan111@gmail.com" && user?.role === "admin") {
      if (validatedData.role !== void 0 && validatedData.role !== "admin") {
        return c.json({ error: "Cannot change the role of the default admin account" }, 403);
      }
      if (validatedData.is_active !== void 0 && !validatedData.is_active) {
        return c.json({ error: "Cannot deactivate the default admin account" }, 403);
      }
    }
    const updates = [];
    const values = [];
    if (validatedData.name !== void 0) {
      updates.push("name = ?");
      values.push(validatedData.name);
    }
    if (validatedData.role !== void 0) {
      updates.push("role = ?");
      values.push(validatedData.role);
    }
    if (validatedData.password !== void 0) {
      updates.push("password = ?");
      values.push(validatedData.password);
    }
    if (validatedData.is_active !== void 0) {
      updates.push("is_active = ?");
      values.push(validatedData.is_active ? 1 : 0);
    }
    if (updates.length === 0) {
      return c.json({ error: "No fields to update" }, 400);
    }
    updates.push("updated_at = CURRENT_TIMESTAMP");
    values.push(userId);
    await db.prepare(`UPDATE users SET ${updates.join(", ")} WHERE id = ?`).bind(...values).run();
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to update user" }, 500);
  }
});
app$9.delete("/api/admin/users/:id", adminOnly$1, async (c) => {
  const userId = c.req.param("id");
  const db = c.env.DB;
  try {
    const user = await db.prepare("SELECT email, role FROM users WHERE id = ?").bind(userId).first();
    if (user?.email === "dhasan111@gmail.com" && user?.role === "admin") {
      return c.json({ error: "Cannot delete the default admin account" }, 403);
    }
    await db.prepare("DELETE FROM team_assignments WHERE user_id = ?").bind(userId).run();
    await db.prepare("DELETE FROM client_assignments WHERE user_id = ?").bind(userId).run();
    await db.prepare("DELETE FROM recruiter_team_assignments WHERE recruiter_user_id = ?").bind(userId).run();
    await db.prepare("DELETE FROM users WHERE id = ?").bind(userId).run();
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to delete user" }, 500);
  }
});
app$9.post("/api/admin/clients", adminOnly$1, async (c) => {
  const body = await c.req.json();
  const validatedData = CreateClientSchema.parse(body);
  const db = c.env.DB;
  try {
    const clientCode = await generateClientCode(db, validatedData.short_name);
    const result = await db.prepare(`
        INSERT INTO clients (client_code, name, short_name, is_active)
        VALUES (?, ?, ?, 1)
      `).bind(clientCode, validatedData.name, validatedData.short_name).run();
    return c.json({
      success: true,
      id: result.meta.last_row_id,
      client_code: clientCode
    });
  } catch (error) {
    return c.json({ error: "Failed to create client" }, 500);
  }
});
app$9.get("/api/admin/clients", adminOnly$1, async (c) => {
  const db = c.env.DB;
  try {
    const clients = await db.prepare("SELECT * FROM clients ORDER BY created_at DESC").all();
    return c.json(clients.results || []);
  } catch (error) {
    return c.json({ error: "Failed to fetch clients" }, 500);
  }
});
app$9.put("/api/admin/clients/:id", adminOnly$1, async (c) => {
  const clientId = c.req.param("id");
  const body = await c.req.json();
  const validatedData = UpdateClientSchema.parse(body);
  const db = c.env.DB;
  try {
    const updates = [];
    const values = [];
    if (validatedData.name !== void 0) {
      updates.push("name = ?");
      values.push(validatedData.name);
    }
    if (validatedData.short_name !== void 0) {
      updates.push("short_name = ?");
      values.push(validatedData.short_name);
    }
    if (validatedData.is_active !== void 0) {
      updates.push("is_active = ?");
      values.push(validatedData.is_active ? 1 : 0);
    }
    if (updates.length === 0) {
      return c.json({ error: "No fields to update" }, 400);
    }
    updates.push("updated_at = CURRENT_TIMESTAMP");
    values.push(clientId);
    await db.prepare(`UPDATE clients SET ${updates.join(", ")} WHERE id = ?`).bind(...values).run();
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to update client" }, 500);
  }
});
app$9.delete("/api/admin/clients/:id", adminOnly$1, async (c) => {
  const clientId = c.req.param("id");
  const db = c.env.DB;
  try {
    await db.prepare("DELETE FROM client_assignments WHERE client_id = ?").bind(clientId).run();
    await db.prepare("DELETE FROM clients WHERE id = ?").bind(clientId).run();
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to delete client" }, 500);
  }
});
app$9.post("/api/admin/teams", adminOnly$1, async (c) => {
  const body = await c.req.json();
  const validatedData = CreateTeamSchema.parse(body);
  const db = c.env.DB;
  try {
    const teamCode = await generateTeamCode(db);
    const result = await db.prepare(`
        INSERT INTO app_teams (team_code, name, is_active)
        VALUES (?, ?, 1)
      `).bind(teamCode, validatedData.name).run();
    return c.json({
      success: true,
      id: result.meta.last_row_id,
      team_code: teamCode
    });
  } catch (error) {
    return c.json({ error: "Failed to create team" }, 500);
  }
});
app$9.get("/api/admin/teams", adminOnly$1, async (c) => {
  const db = c.env.DB;
  try {
    const teams = await db.prepare("SELECT * FROM app_teams ORDER BY created_at DESC").all();
    return c.json(teams.results || []);
  } catch (error) {
    return c.json({ error: "Failed to fetch teams" }, 500);
  }
});
app$9.put("/api/admin/teams/:id", adminOnly$1, async (c) => {
  const teamId = c.req.param("id");
  const body = await c.req.json();
  const validatedData = UpdateTeamSchema.parse(body);
  const db = c.env.DB;
  try {
    const updates = [];
    const values = [];
    if (validatedData.name !== void 0) {
      updates.push("name = ?");
      values.push(validatedData.name);
    }
    if (validatedData.is_active !== void 0) {
      updates.push("is_active = ?");
      values.push(validatedData.is_active ? 1 : 0);
    }
    if (updates.length === 0) {
      return c.json({ error: "No fields to update" }, 400);
    }
    updates.push("updated_at = CURRENT_TIMESTAMP");
    values.push(teamId);
    await db.prepare(`UPDATE app_teams SET ${updates.join(", ")} WHERE id = ?`).bind(...values).run();
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to update team" }, 500);
  }
});
app$9.delete("/api/admin/teams/:id", adminOnly$1, async (c) => {
  const teamId = c.req.param("id");
  const db = c.env.DB;
  try {
    await db.prepare("DELETE FROM team_assignments WHERE team_id = ?").bind(teamId).run();
    await db.prepare("DELETE FROM recruiter_team_assignments WHERE team_id = ?").bind(teamId).run();
    await db.prepare("DELETE FROM app_teams WHERE id = ?").bind(teamId).run();
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to delete team" }, 500);
  }
});
app$9.post("/api/admin/assign-team", adminOnly$1, async (c) => {
  const body = await c.req.json();
  const validatedData = AssignTeamSchema.parse(body);
  const db = c.env.DB;
  const adminUser = c.get("appUser");
  try {
    const existing = await db.prepare("SELECT * FROM team_assignments WHERE user_id = ? AND team_id = ?").bind(validatedData.user_id, validatedData.team_id).first();
    if (existing) {
      return c.json({ error: "Team already assigned to this user" }, 400);
    }
    await db.prepare(`
        INSERT INTO team_assignments (user_id, team_id, assigned_by_user_id)
        VALUES (?, ?, ?)
      `).bind(validatedData.user_id, validatedData.team_id, adminUser.id).run();
    const team = await db.prepare("SELECT name FROM app_teams WHERE id = ?").bind(validatedData.team_id).first();
    await createNotification(db, {
      userId: validatedData.user_id,
      type: "role_assignment",
      title: "Team Assigned",
      message: `You have been assigned to team: ${team?.name || "Unknown"}`,
      relatedEntityType: "team",
      relatedEntityId: validatedData.team_id
    });
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to assign team" }, 500);
  }
});
app$9.post("/api/admin/assign-client", adminOnly$1, async (c) => {
  const body = await c.req.json();
  const validatedData = AssignClientSchema.parse(body);
  const db = c.env.DB;
  const adminUser = c.get("appUser");
  try {
    const user = await db.prepare("SELECT * FROM users WHERE id = ? AND (role = 'account_manager' OR role = 'recruitment_manager')").bind(validatedData.user_id).first();
    if (!user) {
      return c.json({ error: "User is not an Account Manager or Recruitment Manager" }, 400);
    }
    const existing = await db.prepare("SELECT * FROM client_assignments WHERE user_id = ? AND client_id = ?").bind(validatedData.user_id, validatedData.client_id).first();
    if (existing) {
      return c.json({ error: "Client already assigned to this user" }, 400);
    }
    await db.prepare(`
        INSERT INTO client_assignments (user_id, client_id, assigned_by_user_id)
        VALUES (?, ?, ?)
      `).bind(validatedData.user_id, validatedData.client_id, adminUser.id).run();
    const client = await db.prepare("SELECT name FROM clients WHERE id = ?").bind(validatedData.client_id).first();
    await createNotification(db, {
      userId: validatedData.user_id,
      type: "role_assignment",
      title: "Client Assigned",
      message: `You have been assigned to client: ${client?.name || "Unknown"}`,
      relatedEntityType: "client",
      relatedEntityId: validatedData.client_id
    });
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to assign client" }, 500);
  }
});
app$9.get("/api/admin/users/:userId/assignments", adminOnly$1, async (c) => {
  const userId = c.req.param("userId");
  const db = c.env.DB;
  try {
    const user = await db.prepare("SELECT role FROM users WHERE id = ?").bind(userId).first();
    if (user?.role === "recruiter") {
      const recruiterClientAssignments = await db.prepare(`
          SELECT rca.id, rca.client_id, c.name as client_name, c.client_code,
                 rca.team_id, t.name as team_name, t.team_code
          FROM recruiter_client_assignments rca
          INNER JOIN clients c ON rca.client_id = c.id
          INNER JOIN app_teams t ON rca.team_id = t.id
          WHERE rca.recruiter_user_id = ?
        `).bind(userId).all();
      return c.json({
        recruiter_clients: recruiterClientAssignments.results || [],
        teams: [],
        clients: []
      });
    } else {
      const teamAssignments = await db.prepare(`
          SELECT t.* FROM app_teams t
          INNER JOIN team_assignments ta ON t.id = ta.team_id
          WHERE ta.user_id = ?
        `).bind(userId).all();
      const clientAssignments = await db.prepare(`
          SELECT c.* FROM clients c
          INNER JOIN client_assignments ca ON c.id = ca.client_id
          WHERE ca.user_id = ?
        `).bind(userId).all();
      return c.json({
        teams: teamAssignments.results || [],
        clients: clientAssignments.results || []
      });
    }
  } catch (error) {
    return c.json({ error: "Failed to fetch assignments" }, 500);
  }
});
app$9.delete("/api/admin/unassign-team", adminOnly$1, async (c) => {
  const body = await c.req.json();
  const { user_id, team_id } = body;
  const db = c.env.DB;
  try {
    await db.prepare("DELETE FROM team_assignments WHERE user_id = ? AND team_id = ?").bind(user_id, team_id).run();
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to unassign team" }, 500);
  }
});
app$9.delete("/api/admin/unassign-client", adminOnly$1, async (c) => {
  const body = await c.req.json();
  const { user_id, client_id } = body;
  const db = c.env.DB;
  try {
    await db.prepare("DELETE FROM client_assignments WHERE user_id = ? AND client_id = ?").bind(user_id, client_id).run();
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to unassign client" }, 500);
  }
});
app$9.post("/api/admin/assign-recruiter-client", adminOnly$1, async (c) => {
  const db = c.env.DB;
  const body = await c.req.json();
  const adminUser = c.get("appUser");
  const AssignRecruiterClientSchema = objectType({
    recruiter_user_id: numberType(),
    client_id: numberType(),
    team_id: numberType()
  });
  try {
    const data = AssignRecruiterClientSchema.parse(body);
    const existing = await db.prepare("SELECT * FROM recruiter_client_assignments WHERE recruiter_user_id = ? AND client_id = ? AND team_id = ?").bind(data.recruiter_user_id, data.client_id, data.team_id).first();
    if (existing) {
      return c.json({ error: "Client already assigned to this recruiter" }, 400);
    }
    await db.prepare(`
        INSERT INTO recruiter_client_assignments (recruiter_user_id, client_id, team_id, assigned_by_user_id)
        VALUES (?, ?, ?, ?)
      `).bind(data.recruiter_user_id, data.client_id, data.team_id, adminUser.id).run();
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to assign client" }, 500);
  }
});
app$9.delete("/api/admin/recruiter-client/:recruiterId/:clientId", adminOnly$1, async (c) => {
  const recruiterId = c.req.param("recruiterId");
  const clientId = c.req.param("clientId");
  const db = c.env.DB;
  try {
    await db.prepare("DELETE FROM recruiter_client_assignments WHERE recruiter_user_id = ? AND client_id = ?").bind(recruiterId, clientId).run();
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to remove assignment" }, 500);
  }
});
app$9.post("/api/admin/assign-recruiter-team", adminOnly$1, async (c) => {
  const db = c.env.DB;
  const body = await c.req.json();
  const adminUser = c.get("appUser");
  const AssignRecruiterTeamSchema = objectType({
    recruiter_user_id: numberType(),
    team_id: numberType()
  });
  try {
    const data = AssignRecruiterTeamSchema.parse(body);
    const recruiter = await db.prepare("SELECT * FROM users WHERE id = ? AND role = 'recruiter'").bind(data.recruiter_user_id).first();
    if (!recruiter) {
      return c.json({ error: "Recruiter not found" }, 404);
    }
    const existing = await db.prepare("SELECT * FROM recruiter_team_assignments WHERE recruiter_user_id = ? AND team_id = ?").bind(data.recruiter_user_id, data.team_id).first();
    if (existing) {
      return c.json({ error: "Team already assigned to this recruiter" }, 400);
    }
    await db.prepare(`
        INSERT INTO recruiter_team_assignments (team_id, recruiter_user_id, assigned_by_user_id, created_at)
        VALUES (?, ?, ?, datetime('now'))
      `).bind(data.team_id, data.recruiter_user_id, adminUser.id).run();
    const clientsResult = await db.prepare("SELECT id FROM clients WHERE is_active = 1").all();
    const clients = clientsResult.results || [];
    if (clients.length === 1) {
      const clientId = clients[0].id;
      const existingClientAssignment = await db.prepare("SELECT * FROM recruiter_client_assignments WHERE recruiter_user_id = ? AND client_id = ? AND team_id = ?").bind(data.recruiter_user_id, clientId, data.team_id).first();
      if (!existingClientAssignment) {
        await db.prepare(`
            INSERT INTO recruiter_client_assignments (recruiter_user_id, client_id, team_id, assigned_by_user_id, created_at)
            VALUES (?, ?, ?, ?, datetime('now'))
          `).bind(data.recruiter_user_id, clientId, data.team_id, adminUser.id).run();
      }
    }
    return c.json({
      success: true,
      auto_assigned_client: clients.length === 1
    });
  } catch (error) {
    console.error("Error assigning recruiter to team:", error);
    return c.json({ error: "Failed to assign team" }, 500);
  }
});
app$9.delete("/api/admin/recruiter-team/:recruiterId/:teamId", adminOnly$1, async (c) => {
  const recruiterId = c.req.param("recruiterId");
  const teamId = c.req.param("teamId");
  const db = c.env.DB;
  try {
    await db.prepare("DELETE FROM recruiter_team_assignments WHERE recruiter_user_id = ? AND team_id = ?").bind(recruiterId, teamId).run();
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to remove assignment" }, 500);
  }
});
app$9.get("/api/admin/performance-stats", adminOnly$1, async (c) => {
  const db = c.env.DB;
  const role = c.req.query("role");
  const userName = c.req.query("userName");
  const teamId = c.req.query("teamId");
  const clientId = c.req.query("clientId");
  const startDate = c.req.query("startDate");
  const endDate = c.req.query("endDate");
  try {
    let userQuery = "SELECT * FROM users WHERE is_active = 1";
    const queryParams = [];
    if (role && role !== "all") {
      userQuery += " AND role = ?";
      queryParams.push(role);
    }
    if (userName) {
      userQuery += " AND (name LIKE ? OR email LIKE ? OR user_code LIKE ?)";
      const searchTerm = `%${userName}%`;
      queryParams.push(searchTerm, searchTerm, searchTerm);
    }
    userQuery += " ORDER BY role, name";
    const usersResult = await db.prepare(userQuery).bind(...queryParams).all();
    const users = usersResult.results || [];
    const stats = [];
    for (const user of users) {
      const userData = user;
      const teamsResult = await db.prepare(`
          SELECT t.id, t.name, t.team_code
          FROM app_teams t
          INNER JOIN team_assignments ta ON t.id = ta.team_id
          WHERE ta.user_id = ?
        `).bind(userData.id).all();
      const teams = teamsResult.results || [];
      const clientsResult = await db.prepare(`
          SELECT c.id, c.name, c.client_code
          FROM clients c
          INNER JOIN client_assignments ca ON c.id = ca.client_id
          WHERE ca.user_id = ?
        `).bind(userData.id).all();
      const clients = clientsResult.results || [];
      if (teamId && teamId !== "all") {
        if (!teams.find((t) => t.id === parseInt(teamId))) {
          continue;
        }
      }
      if (clientId && clientId !== "all") {
        if (!clients.find((c2) => c2.id === parseInt(clientId))) {
          continue;
        }
      }
      let userStats = {
        user_id: userData.id,
        user_code: userData.user_code,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        teams: teams.map((t) => ({ id: t.id, name: t.name, code: t.team_code })),
        clients: clients.map((c2) => ({ id: c2.id, name: c2.name, code: c2.client_code })),
        ebesScore: 0,
        performanceLabel: "No Data"
      };
      if (userData.role === "recruiter") {
        let submissionsQuery = "SELECT * FROM recruiter_submissions WHERE recruiter_user_id = ?";
        const submissionsParams = [userData.id];
        if (startDate) {
          submissionsQuery += " AND submission_date >= ?";
          submissionsParams.push(startDate);
        }
        if (endDate) {
          submissionsQuery += " AND submission_date <= ?";
          submissionsParams.push(endDate);
        }
        const submissionsResult = await db.prepare(submissionsQuery).bind(...submissionsParams).all();
        const submissions = submissionsResult.results || [];
        let totalSubmissions = 0;
        let interviews1st = 0;
        let interviews2nd = 0;
        let interviews3rd = 0;
        let deals = 0;
        let dropouts = 0;
        for (const sub of submissions) {
          const subData = sub;
          if (subData.entry_type === "submission") totalSubmissions++;
          else if (subData.entry_type === "interview") {
            if (subData.interview_level === 1) interviews1st++;
            else if (subData.interview_level === 2) interviews2nd++;
            else if (subData.interview_level === 3) interviews3rd++;
          } else if (subData.entry_type === "deal") deals++;
          else if (subData.entry_type === "dropout") dropouts++;
        }
        const totalInterviews = interviews1st + interviews2nd + interviews3rd;
        const table1Points = totalSubmissions * 1.5 + totalInterviews * 3 + deals * 7;
        const activeRolesResult = await db.prepare(`
            SELECT COUNT(DISTINCT r.id) as count
            FROM am_roles r
            INNER JOIN recruiter_client_assignments rca ON r.client_id = rca.client_id
            WHERE rca.recruiter_user_id = ? AND r.status = 'active'
          `).bind(userData.id).first();
        const activeRoles = activeRolesResult?.count || 0;
        const table2Points = activeRoles * 4;
        const ebesScore = table2Points > 0 ? table1Points / table2Points * 100 : 0;
        let performanceLabel = "No Data";
        if (ebesScore >= 80) performanceLabel = "Excellent";
        else if (ebesScore >= 60) performanceLabel = "Good";
        else if (ebesScore >= 40) performanceLabel = "Average";
        else if (ebesScore > 0) performanceLabel = "Needs Improvement";
        userStats = {
          ...userStats,
          totalSubmissions,
          interviews1st,
          interviews2nd,
          interviews3rd,
          totalInterviews,
          deals,
          dropouts,
          activeRoles,
          nonActiveRoles: 0,
          ebesScore: Math.min(100, Math.max(0, Math.round(ebesScore * 10) / 10)),
          performanceLabel
        };
      } else if (userData.role === "account_manager") {
        let rolesQuery = "SELECT * FROM am_roles WHERE account_manager_id = ?";
        const rolesParams = [userData.id];
        if (startDate) {
          rolesQuery += " AND created_at >= ?";
          rolesParams.push(startDate);
        }
        if (endDate) {
          rolesQuery += " AND created_at <= ?";
          rolesParams.push(endDate);
        }
        const rolesResult = await db.prepare(rolesQuery).bind(...rolesParams).all();
        const roles = rolesResult.results || [];
        const totalRoles = roles.length;
        const activeRoles = roles.filter((r) => r.status === "active").length;
        const dealsClosedRoles = roles.filter((r) => r.status === "deal").length;
        const lostRoles = roles.filter((r) => r.status === "lost").length;
        const onHoldRoles = roles.filter((r) => r.status === "on_hold").length;
        const noAnswerRoles = roles.filter((r) => r.status === "no_answer").length;
        const interviewsResult = await db.prepare(`
            SELECT interview_round, SUM(interview_count) as count
            FROM am_role_interviews
            WHERE role_id IN (SELECT id FROM am_roles WHERE account_manager_id = ?)
            GROUP BY interview_round
          `).bind(userData.id).all();
        let interviews1st = 0;
        let interviews2nd = 0;
        let interviews3rd = 0;
        for (const row of interviewsResult.results || []) {
          const r = row;
          if (r.interview_round === 1) interviews1st = r.count;
          else if (r.interview_round === 2) interviews2nd = r.count;
          else if (r.interview_round === 3) interviews3rd = r.count;
        }
        const totalInterviews = interviews1st + interviews2nd + interviews3rd;
        const table1Points = activeRoles * 3 + dealsClosedRoles * 7 + totalInterviews * 2;
        const table2Points = totalRoles * 4;
        const ebesScore = table2Points > 0 ? table1Points / table2Points * 100 : 0;
        let performanceLabel = "No Data";
        if (ebesScore >= 80) performanceLabel = "Excellent";
        else if (ebesScore >= 60) performanceLabel = "Good";
        else if (ebesScore >= 40) performanceLabel = "Average";
        else if (ebesScore > 0) performanceLabel = "Needs Improvement";
        userStats = {
          ...userStats,
          totalRoles,
          activeRoles,
          nonActiveRoles: totalRoles - activeRoles,
          dealsClosedRoles,
          lostRoles,
          onHoldRoles,
          noAnswerRoles,
          interviews1st,
          interviews2nd,
          interviews3rd,
          totalInterviews,
          ebesScore: Math.min(100, Math.max(0, Math.round(ebesScore * 10) / 10)),
          performanceLabel
        };
      } else if (userData.role === "recruitment_manager") {
        const managedTeams = teams.length;
        const recruitersResult = await db.prepare(`
            SELECT COUNT(DISTINCT rta.recruiter_user_id) as count
            FROM recruiter_team_assignments rta
            INNER JOIN team_assignments ta ON rta.team_id = ta.team_id
            WHERE ta.user_id = ?
          `).bind(userData.id).first();
        const totalRecruiters = recruitersResult?.count || 0;
        let rmRolesQuery = `
          SELECT r.*
          FROM am_roles r
          INNER JOIN client_assignments ca ON r.client_id = ca.client_id
          WHERE ca.user_id = ?
        `;
        const rmRolesParams = [userData.id];
        if (startDate) {
          rmRolesQuery += " AND r.created_at >= ?";
          rmRolesParams.push(startDate);
        }
        if (endDate) {
          rmRolesQuery += " AND r.created_at <= ?";
          rmRolesParams.push(endDate);
        }
        const rmRolesResult = await db.prepare(rmRolesQuery).bind(...rmRolesParams).all();
        const rmRoles = rmRolesResult.results || [];
        const totalRoles = rmRoles.length;
        const activeRoles = rmRoles.filter((r) => r.status === "active").length;
        const dealsResult = await db.prepare(`
            SELECT COUNT(*) as count
            FROM recruiter_submissions rs
            INNER JOIN recruiter_team_assignments rta ON rs.recruiter_user_id = rta.recruiter_user_id
            INNER JOIN team_assignments ta ON rta.team_id = ta.team_id
            WHERE ta.user_id = ? AND rs.entry_type = 'deal'
          `).bind(userData.id).first();
        const totalDeals = dealsResult?.count || 0;
        const interviewsResult = await db.prepare(`
            SELECT rs.interview_level, COUNT(*) as count
            FROM recruiter_submissions rs
            INNER JOIN recruiter_team_assignments rta ON rs.recruiter_user_id = rta.recruiter_user_id
            INNER JOIN team_assignments ta ON rta.team_id = ta.team_id
            WHERE ta.user_id = ? AND rs.entry_type = 'interview'
            GROUP BY rs.interview_level
          `).bind(userData.id).all();
        let interviews1st = 0;
        let interviews2nd = 0;
        let interviews3rd = 0;
        for (const row of interviewsResult.results || []) {
          const r = row;
          if (r.interview_level === 1) interviews1st = r.count;
          else if (r.interview_level === 2) interviews2nd = r.count;
          else if (r.interview_level === 3) interviews3rd = r.count;
        }
        const totalInterviews = interviews1st + interviews2nd + interviews3rd;
        const table1Points = totalDeals * 7 + totalInterviews * 3 + activeRoles * 2;
        const table2Points = totalRecruiters * 5 + managedTeams * 3;
        const ebesScore = table2Points > 0 ? table1Points / table2Points * 100 : 0;
        let performanceLabel = "No Data";
        if (ebesScore >= 80) performanceLabel = "Excellent";
        else if (ebesScore >= 60) performanceLabel = "Good";
        else if (ebesScore >= 40) performanceLabel = "Average";
        else if (ebesScore > 0) performanceLabel = "Needs Improvement";
        userStats = {
          ...userStats,
          managedTeams,
          totalRecruiters,
          totalRoles,
          activeRoles,
          nonActiveRoles: totalRoles - activeRoles,
          totalDeals,
          interviews1st,
          interviews2nd,
          interviews3rd,
          totalInterviews,
          ebesScore: Math.min(100, Math.max(0, Math.round(ebesScore * 10) / 10)),
          performanceLabel
        };
      }
      stats.push(userStats);
    }
    return c.json(stats);
  } catch (error) {
    console.error("Error fetching performance stats:", error);
    return c.json({ error: "Failed to fetch performance stats" }, 500);
  }
});
app$9.get("/api/admin/sla", adminOnly$1, async (c) => {
  const db = c.env.DB;
  const clientId = c.req.query("client_id");
  const teamId = c.req.query("team_id");
  const status = c.req.query("status") || "active";
  try {
    let query = `
      SELECT r.*
      FROM am_roles r
      WHERE 1 = 1
    `;
    const params = [];
    if (clientId) {
      query += " AND r.client_id = ?";
      params.push(parseInt(clientId));
    }
    if (teamId) {
      query += " AND r.team_id = ?";
      params.push(parseInt(teamId));
    }
    if (status && status !== "all") {
      query += " AND r.status = ?";
      params.push(status);
    }
    const rolesRes = await db.prepare(query).bind(...params).all();
    const roles = rolesRes.results || [];
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1e3;
    const items = [];
    let daysOpenSum = 0;
    let firstSubSum = 0;
    let firstIntSum = 0;
    let firstSubCount = 0;
    let firstIntCount = 0;
    let over14 = 0;
    let over30 = 0;
    for (const role of roles) {
      const r = role;
      const createdAt = new Date(r.created_at).getTime();
      const daysOpen = Math.max(0, Math.floor((now - createdAt) / dayMs));
      daysOpenSum += daysOpen;
      if (daysOpen >= 14) over14++;
      if (daysOpen >= 30) over30++;
      const firstSubmission = await db.prepare(
        `SELECT submission_date FROM recruiter_submissions WHERE role_id = ? AND entry_type = 'submission' ORDER BY submission_date ASC LIMIT 1`
      ).bind(r.id).first();
      let firstSubmissionDays = null;
      if (firstSubmission) {
        const subDate = new Date(firstSubmission.submission_date).getTime();
        firstSubmissionDays = Math.max(0, Math.floor((subDate - createdAt) / dayMs));
        firstSubSum += firstSubmissionDays;
        firstSubCount++;
      }
      const firstInterview = await db.prepare(
        `SELECT submission_date FROM recruiter_submissions WHERE role_id = ? AND entry_type = 'interview' ORDER BY submission_date ASC LIMIT 1`
      ).bind(r.id).first();
      let firstInterviewDays = null;
      if (firstInterview) {
        const intDate = new Date(firstInterview.submission_date).getTime();
        firstInterviewDays = Math.max(0, Math.floor((intDate - createdAt) / dayMs));
        firstIntSum += firstInterviewDays;
        firstIntCount++;
      }
      const dropoutRequest = await db.prepare(
        "SELECT am_decision FROM dropout_requests WHERE role_id = ? AND final_status = 'completed' ORDER BY am_decided_at DESC LIMIT 1"
      ).bind(r.id).first();
      items.push({
        id: r.id,
        role_code: r.role_code,
        title: r.title,
        status: r.status,
        days_open: daysOpen,
        first_submission_days: firstSubmissionDays,
        first_interview_days: firstInterviewDays,
        has_dropout: !!dropoutRequest,
        dropout_decision: dropoutRequest ? dropoutRequest.am_decision : null
      });
    }
    items.sort((a, b) => b.days_open - a.days_open);
    const avgDaysOpen = roles.length > 0 ? Math.round(daysOpenSum / roles.length * 10) / 10 : 0;
    const avgFirstSubmission = firstSubCount > 0 ? Math.round(firstSubSum / firstSubCount * 10) / 10 : 0;
    const avgFirstInterview = firstIntCount > 0 ? Math.round(firstIntSum / firstIntCount * 10) / 10 : 0;
    return c.json({
      metrics: {
        avg_days_open: avgDaysOpen,
        roles_over_14: over14,
        roles_over_30: over30,
        avg_time_to_first_submission: avgFirstSubmission,
        avg_time_to_first_interview: avgFirstInterview
      },
      roles: items
    });
  } catch (error) {
    console.error("Error fetching admin SLA metrics:", error);
    return c.json({ error: "Failed to fetch SLA metrics" }, 500);
  }
});
app$9.get("/api/admin/leaderboards", adminOnly$1, async (c) => {
  const db = c.env.DB;
  try {
    const usersResult = await db.prepare("SELECT * FROM users WHERE is_active = 1").all();
    const users = usersResult.results || [];
    const recruiters = [];
    const accountManagers = [];
    const recruitmentManagers = [];
    for (const user of users) {
      const userData = user;
      const teamsResult = await db.prepare(`
          SELECT t.name
          FROM app_teams t
          INNER JOIN team_assignments ta ON t.id = ta.team_id
          WHERE ta.user_id = ?
          LIMIT 1
        `).bind(userData.id).first();
      const teamName = teamsResult?.name || "No Team";
      let ebesScore = 0;
      let performanceLabel = "No Data";
      if (userData.role === "recruiter") {
        const submissionsResult = await db.prepare("SELECT * FROM recruiter_submissions WHERE recruiter_user_id = ?").bind(userData.id).all();
        const submissions = submissionsResult.results || [];
        let totalSubmissions = 0;
        let totalInterviews = 0;
        let deals = 0;
        let totalDropouts = 0;
        for (const sub of submissions) {
          const subData = sub;
          if (subData.entry_type === "submission") totalSubmissions++;
          else if (subData.entry_type === "interview") totalInterviews++;
          else if (subData.entry_type === "deal") deals++;
          else if (subData.entry_type === "dropout") totalDropouts++;
        }
        const lostRolesResult = await db.prepare(`
            SELECT COUNT(DISTINCT r.id) as count
            FROM am_roles r
            INNER JOIN recruiter_client_assignments rca ON r.client_id = rca.client_id
            WHERE rca.recruiter_user_id = ? AND r.status = 'lost'
          `).bind(userData.id).first();
        const lostRoles = lostRolesResult?.count || 0;
        const table1Points = totalSubmissions * 1.5 + totalInterviews * 3 + deals * 7 - (lostRoles + totalDropouts) * 3;
        const activeRolesResult = await db.prepare(`
            SELECT COUNT(DISTINCT r.id) as count
            FROM am_roles r
            INNER JOIN recruiter_client_assignments rca ON r.client_id = rca.client_id
            WHERE rca.recruiter_user_id = ? AND r.status = 'active'
          `).bind(userData.id).first();
        const activeRoles = activeRolesResult?.count || 0;
        const table2Raw = activeRoles * 4;
        const table2Points = Math.min(table2Raw, 20);
        const effectiveT2 = Math.max(table2Points, 1);
        ebesScore = table1Points / effectiveT2 * 100;
        if (ebesScore >= 80) performanceLabel = "Excellent";
        else if (ebesScore >= 60) performanceLabel = "Good";
        else if (ebesScore >= 40) performanceLabel = "Average";
        else if (ebesScore > 0) performanceLabel = "Needs Improvement";
        recruiters.push({
          name: userData.name,
          team: teamName,
          ebesScore: Math.min(100, Math.max(0, Math.round(ebesScore * 10) / 10)),
          performanceLabel
        });
      } else if (userData.role === "account_manager") {
        const rolesResult = await db.prepare("SELECT * FROM am_roles WHERE account_manager_id = ?").bind(userData.id).all();
        const roles = rolesResult.results || [];
        const totalRoles = roles.length;
        const activeRoles = roles.filter((r) => r.status === "active").length;
        const dealsClosedRoles = roles.filter((r) => r.status === "deal").length;
        const interviewsResult = await db.prepare(`
            SELECT SUM(interview_count) as count
            FROM am_role_interviews
            WHERE role_id IN (SELECT id FROM am_roles WHERE account_manager_id = ?)
          `).bind(userData.id).first();
        const totalInterviews = interviewsResult?.count || 0;
        const table1Points = activeRoles * 3 + dealsClosedRoles * 7 + totalInterviews * 2;
        const table2Points = totalRoles * 4;
        const effectiveT2 = Math.max(table2Points, 1);
        ebesScore = table1Points / effectiveT2 * 100;
        if (ebesScore >= 80) performanceLabel = "Excellent";
        else if (ebesScore >= 60) performanceLabel = "Good";
        else if (ebesScore >= 40) performanceLabel = "Average";
        else if (ebesScore > 0) performanceLabel = "Needs Improvement";
        accountManagers.push({
          name: userData.name,
          team: teamName,
          ebesScore: Math.min(100, Math.max(0, Math.round(ebesScore * 10) / 10)),
          performanceLabel
        });
      } else if (userData.role === "recruitment_manager") {
        const teamsResult2 = await db.prepare(`
            SELECT COUNT(DISTINCT ta.team_id) as count
            FROM team_assignments ta
            WHERE ta.user_id = ?
          `).bind(userData.id).first();
        const managedTeams = teamsResult2?.count || 0;
        const recruitersResult = await db.prepare(`
            SELECT COUNT(DISTINCT rta.recruiter_user_id) as count
            FROM recruiter_team_assignments rta
            INNER JOIN team_assignments ta ON rta.team_id = ta.team_id
            WHERE ta.user_id = ?
          `).bind(userData.id).first();
        const totalRecruiters = recruitersResult?.count || 0;
        const dealsResult = await db.prepare(`
            SELECT COUNT(*) as count
            FROM recruiter_submissions rs
            INNER JOIN recruiter_team_assignments rta ON rs.recruiter_user_id = rta.recruiter_user_id
            INNER JOIN team_assignments ta ON rta.team_id = ta.team_id
            WHERE ta.user_id = ? AND rs.entry_type = 'deal'
          `).bind(userData.id).first();
        const totalDeals = dealsResult?.count || 0;
        const interviewsResult = await db.prepare(`
            SELECT COUNT(*) as count
            FROM recruiter_submissions rs
            INNER JOIN recruiter_team_assignments rta ON rs.recruiter_user_id = rta.recruiter_user_id
            INNER JOIN team_assignments ta ON rta.team_id = ta.team_id
            WHERE ta.user_id = ? AND rs.entry_type = 'interview'
          `).bind(userData.id).first();
        const totalInterviews = interviewsResult?.count || 0;
        const rolesResult = await db.prepare(`
            SELECT COUNT(*) as count
            FROM am_roles r
            INNER JOIN client_assignments ca ON r.client_id = ca.client_id
            WHERE ca.user_id = ? AND r.status = 'active'
          `).bind(userData.id).first();
        const activeRoles = rolesResult?.count || 0;
        const table1Points = totalDeals * 7 + totalInterviews * 3 + activeRoles * 2;
        const table2Points = totalRecruiters * 5 + managedTeams * 3;
        ebesScore = table2Points > 0 ? table1Points / table2Points * 100 : 0;
        if (ebesScore >= 80) performanceLabel = "Excellent";
        else if (ebesScore >= 60) performanceLabel = "Good";
        else if (ebesScore >= 40) performanceLabel = "Average";
        else if (ebesScore > 0) performanceLabel = "Needs Improvement";
        recruitmentManagers.push({
          name: userData.name,
          team: teamName,
          ebesScore: Math.min(100, Math.max(0, Math.round(ebesScore * 10) / 10)),
          performanceLabel
        });
      }
    }
    recruiters.sort((a, b) => b.ebesScore - a.ebesScore);
    accountManagers.sort((a, b) => b.ebesScore - a.ebesScore);
    recruitmentManagers.sort((a, b) => b.ebesScore - a.ebesScore);
    return c.json({
      recruiters: recruiters.slice(0, 10),
      accountManagers: accountManagers.slice(0, 10),
      recruitmentManagers: recruitmentManagers.slice(0, 10)
    });
  } catch (error) {
    console.error("Error fetching leaderboards:", error);
    return c.json({ error: "Failed to fetch leaderboards" }, 500);
  }
});
app$9.get("/api/admin/profile-settings", adminOnly$1, async (c) => {
  const db = c.env.DB;
  try {
    const settings = await db.prepare(`
        SELECT setting_key, setting_value
        FROM app_settings
        WHERE setting_key IN (
          'show_employee_profiles',
          'show_recruiter_stats',
          'show_rm_stats',
          'show_am_stats',
          'show_client_stats',
          'show_team_stats'
        )
      `).all();
    const settingsMap = {
      show_employee_profiles: true,
      show_recruiter_stats: true,
      show_rm_stats: true,
      show_am_stats: true,
      show_client_stats: true,
      show_team_stats: true
    };
    for (const setting of settings.results || []) {
      const data = setting;
      settingsMap[data.setting_key] = data.setting_value === "true";
    }
    return c.json(settingsMap);
  } catch (error) {
    console.error("Error fetching profile settings:", error);
    return c.json({ error: "Failed to fetch profile settings" }, 500);
  }
});
app$9.put("/api/admin/profile-settings", adminOnly$1, async (c) => {
  const db = c.env.DB;
  const body = await c.req.json();
  const schema = objectType({
    show_employee_profiles: booleanType().optional(),
    show_recruiter_stats: booleanType().optional(),
    show_rm_stats: booleanType().optional(),
    show_am_stats: booleanType().optional(),
    show_client_stats: booleanType().optional(),
    show_team_stats: booleanType().optional()
  });
  try {
    const data = schema.parse(body);
    for (const [key, value] of Object.entries(data)) {
      if (value !== void 0) {
        await db.prepare(`
            INSERT INTO app_settings (setting_key, setting_value)
            VALUES (?, ?)
            ON CONFLICT(setting_key) DO UPDATE SET setting_value = ?
          `).bind(key, value ? "true" : "false", value ? "true" : "false").run();
      }
    }
    return c.json({ success: true });
  } catch (error) {
    console.error("Error updating profile settings:", error);
    return c.json({ error: "Failed to update profile settings" }, 500);
  }
});
function calculateRecruiterEBES(data) {
  let table1Points = 0;
  table1Points += data.submissions_6h * 2;
  table1Points += data.submissions_24h * 1.5;
  table1Points += data.submissions_after_24h * 1;
  table1Points += data.interviews_level_1 * 3;
  table1Points += data.interviews_level_2 * 2;
  table1Points += data.deals * 10;
  table1Points -= Math.min(data.accepted_dropouts * 5, 20);
  table1Points -= Math.min(data.discarded_candidates * 1, 10);
  table1Points -= Math.min(data.lost_role_candidates * 1, 10);
  let table2Points = 0;
  table2Points += data.assigned_roles * 3;
  table2Points += data.actively_worked_roles * 2;
  const effectiveT2 = Math.max(table2Points, 1);
  let ebesScore = table1Points / effectiveT2 * 100;
  const hasNegativeEvents = data.accepted_dropouts > 0 || data.discarded_candidates > 0 || data.lost_role_candidates > 0;
  const baseCap = hasNegativeEvents ? 95 : 100;
  const quality = typeof data.avg_cv_quality === "number" ? data.avg_cv_quality : 0;
  let qualityBonus = 0;
  if (quality >= 98) qualityBonus = 5;
  else if (quality >= 95) qualityBonus = 4;
  else if (quality >= 90) qualityBonus = 2;
  const finalCap = Math.min(baseCap + qualityBonus, 100);
  ebesScore = Math.min(finalCap, Math.max(0, ebesScore));
  let performanceLabel = "At Risk";
  if (ebesScore >= 90) performanceLabel = "Excellent";
  else if (ebesScore >= 75) performanceLabel = "Strong";
  else if (ebesScore >= 60) performanceLabel = "Average";
  return {
    score: Math.round(ebesScore * 10) / 10,
    // Round to 1 decimal
    performance_label: performanceLabel,
    table1_points: Math.round(table1Points * 10) / 10,
    table2_points: table2Points
  };
}
function calculateAccountManagerEBES(data) {
  const MAX_EXPECTED_AM_POINTS = 60;
  let points = data.total_roles * 2 + data.interview_1_count * 2 + data.interview_2_count * 2 + data.deal_roles * 12 - data.lost_roles * 12 - data.no_answer_roles * 10 - data.cancelled_roles * 10 - data.on_hold_roles * 0.5 - data.dropout_roles * 5;
  if (data.active_roles > 15 && data.deal_roles === 0) {
    points -= 20;
  }
  const base = points / Math.max(MAX_EXPECTED_AM_POINTS, 1) * 100;
  const hasNeg = data.dropout_roles > 0 || data.lost_roles > 0 || data.no_answer_roles > 0 || data.cancelled_roles > 0;
  const amCap = hasNeg ? 95 : 100;
  const cappedScore = Math.min(amCap, Math.max(0, base));
  let performanceLabel = "Average";
  if (cappedScore >= 100) performanceLabel = "Excellent";
  else if (cappedScore >= 50) performanceLabel = "Strong";
  else if (cappedScore < 20) performanceLabel = "At Risk";
  return {
    score: Math.round(cappedScore * 10) / 10,
    // Round to 1 decimal
    performance_label: performanceLabel
  };
}
function calculateRecruitmentManagerEBES(data) {
  let table1Points = 0;
  table1Points += data.submissions_6h * 2;
  table1Points += data.submissions_24h * 1.5;
  table1Points += data.submissions_after_24h * 1;
  table1Points += data.interviews_level_1 * 3;
  table1Points += data.interviews_level_2 * 1.5;
  table1Points += data.total_deals * 7;
  table1Points -= data.total_dropouts * 5;
  let table2Points = 0;
  table2Points += data.total_roles * 3;
  table2Points += data.total_active_roles * 1;
  let ebesScore = 0;
  if (table2Points > 0) {
    ebesScore = table1Points / table2Points * 100;
  }
  const rmCap = data.total_dropouts > 0 ? 95 : 100;
  ebesScore = Math.min(rmCap, Math.max(0, ebesScore));
  let performanceLabel = "At Risk";
  if (ebesScore >= 90) performanceLabel = "Excellent";
  else if (ebesScore >= 75) performanceLabel = "Strong";
  else if (ebesScore >= 60) performanceLabel = "Average";
  return {
    score: Math.round(ebesScore * 10) / 10,
    // Round to 1 decimal
    performance_label: performanceLabel,
    table1_points: Math.round(table1Points * 10) / 10,
    table2_points: table2Points
  };
}
const app$8 = new Hono2();
const amOnly = async (c, next) => {
  const db = c.env.DB;
  const userId = c.req.header("x-user-id");
  if (!userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  const user = await db.prepare("SELECT * FROM users WHERE id = ? AND role = 'account_manager'").bind(userId).first();
  if (!user) {
    return c.json({ error: "Unauthorized - Account Manager only" }, 403);
  }
  c.set("amUser", user);
  await next();
};
async function generateRoleCode(db) {
  const counter = await db.prepare("SELECT next_number FROM code_counters WHERE category = 'am_role'").first();
  const number = counter.next_number;
  const code = `ROLE-${number.toString().padStart(4, "0")}`;
  await db.prepare("UPDATE code_counters SET next_number = next_number + 1 WHERE category = 'am_role'").run();
  return code;
}
function getCurrentMonth() {
  const now = /* @__PURE__ */ new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}
app$8.get("/api/am/assignments", amOnly, async (c) => {
  const db = c.env.DB;
  const amUser = c.get("amUser");
  try {
    const clients = await db.prepare(`
        SELECT c.* FROM clients c
        INNER JOIN client_assignments ca ON c.id = ca.client_id
        WHERE ca.user_id = ?
      `).bind(amUser.id).all();
    const teams = await db.prepare(`
        SELECT t.* FROM app_teams t
        INNER JOIN team_assignments ta ON t.id = ta.team_id
        WHERE ta.user_id = ?
      `).bind(amUser.id).all();
    return c.json({
      clients: clients.results || [],
      teams: teams.results || []
    });
  } catch (error) {
    return c.json({ error: "Failed to fetch assignments" }, 500);
  }
});
app$8.get("/api/am/reminder-status", amOnly, async (c) => {
  const db = c.env.DB;
  const amUser = c.get("amUser");
  const currentMonth = getCurrentMonth();
  try {
    const reminder = await db.prepare("SELECT * FROM am_monthly_reminders WHERE user_id = ? AND reminder_month = ?").bind(amUser.id, currentMonth).first();
    return c.json({
      shouldShow: !reminder || !reminder.is_confirmed,
      currentMonth
    });
  } catch (error) {
    return c.json({ error: "Failed to check reminder status" }, 500);
  }
});
app$8.post("/api/am/confirm-reminder", amOnly, async (c) => {
  const db = c.env.DB;
  const amUser = c.get("amUser");
  const currentMonth = getCurrentMonth();
  try {
    await db.prepare(`
        INSERT INTO am_monthly_reminders (user_id, reminder_month, is_confirmed)
        VALUES (?, ?, 1)
        ON CONFLICT(user_id, reminder_month) DO UPDATE SET is_confirmed = 1
      `).bind(amUser.id, currentMonth).run();
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to confirm reminder" }, 500);
  }
});
app$8.get("/api/am/roles", amOnly, async (c) => {
  const db = c.env.DB;
  const amUser = c.get("amUser");
  const status = c.req.query("status");
  const clientId = c.req.query("client_id");
  const teamId = c.req.query("team_id");
  try {
    let query = `
      SELECT r.*, c.name as client_name, t.name as team_name
      FROM am_roles r
      INNER JOIN clients c ON r.client_id = c.id
      INNER JOIN app_teams t ON r.team_id = t.id
      WHERE r.account_manager_id = ?
    `;
    const params = [amUser.id];
    if (clientId) {
      query += " AND r.client_id = ?";
      params.push(clientId);
    }
    if (teamId) {
      query += " AND r.team_id = ?";
      params.push(teamId);
    }
    if (status === "active") {
      query += " AND r.status = 'active'";
    } else if (status === "non-active") {
      query += " AND r.status != 'active'";
    }
    query += " ORDER BY r.created_at DESC";
    const roles = await db.prepare(query).bind(...params).all();
    const rolesWithInterviews = await Promise.all(
      (roles.results || []).map(async (role) => {
        const interviews = await db.prepare(`
            SELECT interview_round, SUM(interview_count) as total
            FROM am_role_interviews
            WHERE role_id = ?
            GROUP BY interview_round
          `).bind(role.id).all();
        const interviewMap = { 1: 0, 2: 0, 3: 0 };
        for (const interview of interviews.results || []) {
          const data = interview;
          interviewMap[data.interview_round] = data.total;
        }
        const pendingStatus = await db.prepare("SELECT * FROM role_status_pending WHERE role_id = ? ORDER BY created_at DESC LIMIT 1").bind(role.id).first();
        const dropoutRequest = await db.prepare("SELECT * FROM dropout_requests WHERE role_id = ? AND final_status = 'completed' ORDER BY am_decided_at DESC LIMIT 1").bind(role.id).first();
        const additionalTeams = await db.prepare(`
            SELECT t.id, t.name, t.team_code
            FROM am_role_teams rt
            INNER JOIN app_teams t ON rt.team_id = t.id
            WHERE rt.role_id = ?
          `).bind(role.id).all();
        const submissions = await db.prepare(`
            SELECT COUNT(*) as total_submissions
            FROM recruiter_submissions
            WHERE role_id = ?
          `).bind(role.id).first();
        const totalSubmissions = submissions?.total_submissions || 0;
        return {
          ...role,
          interview_1_count: interviewMap[1],
          interview_2_count: interviewMap[2],
          interview_3_count: interviewMap[3],
          total_interviews: interviewMap[1] + interviewMap[2] + interviewMap[3],
          total_submissions: totalSubmissions,
          has_pending_dropout: !!pendingStatus,
          pending_dropout_reason: pendingStatus ? pendingStatus.reason : null,
          has_dropout: !!dropoutRequest,
          dropout_decision: dropoutRequest ? dropoutRequest.am_decision : null,
          additional_teams: additionalTeams.results || []
        };
      })
    );
    return c.json(rolesWithInterviews);
  } catch (error) {
    return c.json({ error: "Failed to fetch roles" }, 500);
  }
});
app$8.post("/api/am/roles", amOnly, async (c) => {
  const db = c.env.DB;
  const amUser = c.get("amUser");
  const body = await c.req.json();
  const schema = objectType({
    client_id: numberType(),
    team_id: numberType(),
    team_ids: arrayType(numberType()).optional(),
    title: stringType().min(1),
    description: stringType().optional()
  });
  try {
    const data = schema.parse(body);
    const activeCount = await db.prepare("SELECT COUNT(*) as count FROM am_roles WHERE account_manager_id = ? AND status = 'active'").bind(amUser.id).first();
    if (activeCount.count >= 30) {
      return c.json({ error: "You have reached the maximum of 30 active roles. Please update role statuses to continue." }, 400);
    }
    const roleCode = await generateRoleCode(db);
    const result = await db.prepare(`
        INSERT INTO am_roles (role_code, client_id, team_id, account_manager_id, title, description, status)
        VALUES (?, ?, ?, ?, ?, ?, 'active')
      `).bind(roleCode, data.client_id, data.team_id, amUser.id, data.title, data.description || "").run();
    const roleId = result.meta.last_row_id;
    if (data.team_ids && data.team_ids.length > 0) {
      for (const teamId of data.team_ids) {
        if (teamId !== data.team_id) {
          await db.prepare("INSERT INTO am_role_teams (role_id, team_id) VALUES (?, ?)").bind(roleId, teamId).run();
        }
      }
    }
    const rmUsersPrimary = await db.prepare(`
        SELECT u.id
        FROM users u
        INNER JOIN team_assignments ta ON u.id = ta.user_id
        WHERE ta.team_id = ? AND u.role = 'recruitment_manager'
      `).bind(data.team_id).all();
    for (const row of rmUsersPrimary.results || []) {
      const rmId = row.id;
      await createNotification(db, {
        userId: rmId,
        type: "system",
        title: "New Role Created",
        message: `Account Manager ${amUser.name} created role ${data.title}`,
        relatedEntityType: "role",
        relatedEntityId: Number(roleId)
      });
    }
    if (data.team_ids && data.team_ids.length > 0) {
      for (const teamId of data.team_ids) {
        if (teamId !== data.team_id) {
          const rmUsersExtra = await db.prepare(`
              SELECT u.id
              FROM users u
              INNER JOIN team_assignments ta ON u.id = ta.user_id
              WHERE ta.team_id = ? AND u.role = 'recruitment_manager'
            `).bind(teamId).all();
          for (const row of rmUsersExtra.results || []) {
            const rmId = row.id;
            await createNotification(db, {
              userId: rmId,
              type: "system",
              title: "New Role Created",
              message: `Account Manager ${amUser.name} created role ${data.title}`,
              relatedEntityType: "role",
              relatedEntityId: Number(roleId)
            });
          }
        }
      }
    }
    return c.json({
      success: true,
      id: roleId,
      role_code: roleCode
    });
  } catch (error) {
    console.error("Error creating role:", error);
    return c.json({ error: "Failed to create role" }, 500);
  }
});
app$8.put("/api/am/roles/:id", amOnly, async (c) => {
  const db = c.env.DB;
  const amUser = c.get("amUser");
  const roleId = c.req.param("id");
  const body = await c.req.json();
  const schema = objectType({
    title: stringType().min(1).optional(),
    description: stringType().optional(),
    client_id: numberType().optional(),
    team_id: numberType().optional(),
    team_ids: arrayType(numberType()).optional(),
    status: enumType(["active", "lost", "deal", "on_hold", "cancelled", "no_answer"]).optional(),
    clear_pending_dropout: booleanType().optional()
  });
  try {
    const data = schema.parse(body);
    const role = await db.prepare("SELECT * FROM am_roles WHERE id = ? AND account_manager_id = ?").bind(roleId, amUser.id).first();
    if (!role) {
      return c.json({ error: "Role not found" }, 404);
    }
    const updates = [];
    const values = [];
    if (data.title !== void 0) {
      updates.push("title = ?");
      values.push(data.title);
    }
    if (data.description !== void 0) {
      updates.push("description = ?");
      values.push(data.description);
    }
    if (data.client_id !== void 0) {
      updates.push("client_id = ?");
      values.push(data.client_id);
    }
    if (data.team_id !== void 0) {
      updates.push("team_id = ?");
      values.push(data.team_id);
    }
    if (data.status !== void 0) {
      updates.push("status = ?");
      values.push(data.status);
    }
    if (updates.length === 0 && !data.clear_pending_dropout && !data.team_ids) {
      return c.json({ error: "No fields to update" }, 400);
    }
    if (updates.length > 0) {
      updates.push("updated_at = CURRENT_TIMESTAMP");
      values.push(roleId, amUser.id);
      await db.prepare(`UPDATE am_roles SET ${updates.join(", ")} WHERE id = ? AND account_manager_id = ?`).bind(...values).run();
      if (data.status !== void 0) {
        const newStatus = data.status;
        if (["on_hold", "cancelled", "deal"].includes(newStatus)) {
          await db.prepare(`
              UPDATE candidate_role_associations 
              SET is_discarded = 1, 
                  discarded_at = CURRENT_TIMESTAMP,
                  discarded_reason = 'Role status changed to ${newStatus}',
                  updated_at = CURRENT_TIMESTAMP
              WHERE role_id = ? AND is_discarded = 0
            `).bind(roleId).run();
        }
        if (newStatus === "lost") {
          await db.prepare(`
              UPDATE candidate_role_associations 
              SET is_discarded = 1,
                  is_lost_role = 1,
                  discarded_at = CURRENT_TIMESTAMP,
                  discarded_reason = 'Role marked as lost',
                  updated_at = CURRENT_TIMESTAMP
              WHERE role_id = ? AND is_discarded = 0
            `).bind(roleId).run();
        }
        const targetTeamId = data.team_id !== void 0 ? data.team_id : role.team_id;
        const rmUsers = await db.prepare(`
            SELECT u.id
            FROM users u
            INNER JOIN team_assignments ta ON u.id = ta.user_id
            WHERE ta.team_id = ? AND u.role = 'recruitment_manager'
          `).bind(targetTeamId).all();
        for (const row of rmUsers.results || []) {
          const rmId = row.id;
          await createNotification(db, {
            userId: rmId,
            type: newStatus === "deal" ? "deal" : "system",
            title: newStatus === "deal" ? "Role Closed as Deal" : "Role Status Updated",
            message: `Role ${role.title} status changed to ${newStatus}`,
            relatedEntityType: "role",
            relatedEntityId: Number(roleId)
          });
        }
        const assignedRecruiters = await db.prepare(`
            SELECT DISTINCT recruiter_user_id AS id
            FROM role_recruiter_assignments
            WHERE role_id = ?
          `).bind(roleId).all();
        for (const row of assignedRecruiters.results || []) {
          const recId = row.id;
          await createNotification(db, {
            userId: recId,
            type: newStatus === "deal" ? "deal" : "system",
            title: newStatus === "deal" ? "Role Closed as Deal" : "Role Status Updated",
            message: `Role ${role.title} status changed to ${newStatus}`,
            relatedEntityType: "role",
            relatedEntityId: Number(roleId)
          });
        }
      }
    }
    if (data.team_ids !== void 0) {
      await db.prepare("DELETE FROM am_role_teams WHERE role_id = ?").bind(roleId).run();
      const primaryTeamId = data.team_id || role.team_id;
      for (const teamId of data.team_ids) {
        if (teamId !== primaryTeamId) {
          await db.prepare("INSERT INTO am_role_teams (role_id, team_id) VALUES (?, ?)").bind(roleId, teamId).run();
        }
      }
    }
    if (data.clear_pending_dropout) {
      await db.prepare("DELETE FROM role_status_pending WHERE role_id = ?").bind(roleId).run();
    }
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to update role" }, 500);
  }
});
app$8.delete("/api/am/roles/:id", amOnly, async (c) => {
  const db = c.env.DB;
  const amUser = c.get("amUser");
  const roleId = c.req.param("id");
  try {
    await db.prepare("DELETE FROM am_role_interviews WHERE role_id = ?").bind(roleId).run();
    await db.prepare("DELETE FROM am_roles WHERE id = ? AND account_manager_id = ?").bind(roleId, amUser.id).run();
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to delete role" }, 500);
  }
});
app$8.post("/api/am/roles/:id/interviews", amOnly, async (c) => {
  const db = c.env.DB;
  const amUser = c.get("amUser");
  const roleId = c.req.param("id");
  const body = await c.req.json();
  const schema = objectType({
    interview_round: numberType().min(1).max(3),
    interview_count: numberType().min(1)
  });
  try {
    const data = schema.parse(body);
    const role = await db.prepare("SELECT * FROM am_roles WHERE id = ? AND account_manager_id = ?").bind(roleId, amUser.id).first();
    if (!role) {
      return c.json({ error: "Role not found" }, 404);
    }
    const currentMonth = getCurrentMonth();
    await db.prepare(`
        INSERT INTO am_role_interviews (role_id, interview_round, interview_count, entry_month)
        VALUES (?, ?, ?, ?)
      `).bind(roleId, data.interview_round, data.interview_count, currentMonth).run();
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to add interview entry" }, 500);
  }
});
app$8.get("/api/am/client-analytics", amOnly, async (c) => {
  const db = c.env.DB;
  const amUser = c.get("amUser");
  try {
    const clients = await db.prepare(`
        SELECT c.* FROM clients c
        INNER JOIN client_assignments ca ON c.id = ca.client_id
        WHERE ca.user_id = ?
      `).bind(amUser.id).all();
    const clientAnalytics = await Promise.all(
      (clients.results || []).map(async (client) => {
        const roles = await db.prepare("SELECT * FROM am_roles WHERE client_id = ? AND account_manager_id = ?").bind(client.id, amUser.id).all();
        const allRoles = roles.results || [];
        const totalRoles = allRoles.length;
        const activeRoles = allRoles.filter((r) => r.status === "active").length;
        const dealRoles = allRoles.filter((r) => r.status === "deal").length;
        const dropouts = await db.prepare(`
            SELECT COUNT(*) as count
            FROM dropout_requests dr
            INNER JOIN am_roles r ON dr.role_id = r.id
            WHERE r.client_id = ? AND r.account_manager_id = ?
          `).bind(client.id, amUser.id).first();
        const dropoutCount = dropouts?.count || 0;
        let totalInterviews = 0;
        for (const role of allRoles) {
          const interviews = await db.prepare(`
              SELECT SUM(interview_count) as total
              FROM am_role_interviews
              WHERE role_id = ?
            `).bind(role.id).first();
          totalInterviews += interviews?.total || 0;
        }
        let health = "Average";
        const dealRate = totalRoles > 0 ? dealRoles / totalRoles * 100 : 0;
        const dropoutRate = totalRoles > 0 ? dropoutCount / totalRoles * 100 : 0;
        if (dealRate >= 30 && dropoutRate < 10) health = "Strong";
        else if (dealRate < 10 || dropoutRate > 30) health = "At Risk";
        return {
          id: client.id,
          name: client.name,
          client_code: client.client_code,
          total_roles: totalRoles,
          active_roles: activeRoles,
          interviews: totalInterviews,
          deals: dealRoles,
          dropouts: dropoutCount,
          health
        };
      })
    );
    return c.json(clientAnalytics);
  } catch (error) {
    console.error("Error fetching client analytics:", error);
    return c.json({ error: "Failed to fetch client analytics" }, 500);
  }
});
app$8.get("/api/am/analytics", amOnly, async (c) => {
  const db = c.env.DB;
  const amUser = c.get("amUser");
  let startDate = c.req.query("start_date");
  let endDate = c.req.query("end_date");
  if (!startDate || !endDate) {
    const now = /* @__PURE__ */ new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];
    startDate = startOfMonth;
    endDate = endOfMonth;
  }
  try {
    const clients = await db.prepare(`
        SELECT c.* FROM clients c
        INNER JOIN client_assignments ca ON c.id = ca.client_id
        WHERE ca.user_id = ?
      `).bind(amUser.id).all();
    const currentMonth = getCurrentMonth();
    const now = /* @__PURE__ */ new Date();
    const lastMonth = `${now.getFullYear()}-${String(now.getMonth() === 0 ? 12 : now.getMonth()).padStart(2, "0")}`;
    const clientAnalytics = await Promise.all(
      (clients.results || []).map(async (client) => {
        let rolesQuery = "SELECT * FROM am_roles WHERE client_id = ? AND account_manager_id = ?";
        const rolesParams = [client.id, amUser.id];
        rolesQuery += " AND created_at BETWEEN ? AND ?";
        rolesParams.push(startDate, endDate + " 23:59:59");
        const roles = await db.prepare(rolesQuery).bind(...rolesParams).all();
        const allRoles = roles.results || [];
        const totalRoles = allRoles.length;
        const activeRoles = allRoles.filter((r) => r.status === "active").length;
        const dealRoles = allRoles.filter((r) => r.status === "deal").length;
        const lostRoles = allRoles.filter((r) => r.status === "lost").length;
        const onHoldRoles = allRoles.filter((r) => r.status === "on_hold").length;
        const cancelledRoles = allRoles.filter((r) => r.status === "cancelled").length;
        const noAnswerRoles = allRoles.filter((r) => r.status === "no_answer").length;
        let totalInterviews = 0;
        let interview1Total = 0;
        let interview2Total = 0;
        let interview3Total = 0;
        for (const role of allRoles) {
          const interviews = await db.prepare(`
              SELECT interview_round, SUM(interview_count) as total
              FROM am_role_interviews
              WHERE role_id = ?
              GROUP BY interview_round
            `).bind(role.id).all();
          for (const interview of interviews.results || []) {
            const data = interview;
            const count = data.total;
            totalInterviews += count;
            if (data.interview_round === 1) interview1Total += count;
            if (data.interview_round === 2) interview2Total += count;
            if (data.interview_round === 3) interview3Total += count;
          }
        }
        const currentMonthRoles = allRoles.filter(
          (r) => r.created_at && r.created_at.startsWith(currentMonth)
        ).length;
        const lastMonthRoles = allRoles.filter(
          (r) => r.created_at && r.created_at.startsWith(lastMonth)
        ).length;
        const currentMonthDeals = allRoles.filter(
          (r) => r.status === "deal" && r.updated_at && r.updated_at.startsWith(currentMonth)
        ).length;
        const lastMonthDeals = allRoles.filter(
          (r) => r.status === "deal" && r.updated_at && r.updated_at.startsWith(lastMonth)
        ).length;
        const currentMonthLost = allRoles.filter(
          (r) => r.status === "lost" && r.updated_at && r.updated_at.startsWith(currentMonth)
        ).length;
        const lastMonthLost = allRoles.filter(
          (r) => r.status === "lost" && r.updated_at && r.updated_at.startsWith(lastMonth)
        ).length;
        let currentMonthInterviews = 0;
        let lastMonthInterviews = 0;
        for (const role of allRoles) {
          const rangeInterviews = await db.prepare(`
              SELECT SUM(interview_count) as total
              FROM am_role_interviews
              WHERE role_id = ? AND entry_month BETWEEN ? AND ?
            `).bind(role.id, startDate.substring(0, 7), endDate.substring(0, 7)).first();
          currentMonthInterviews += rangeInterviews?.total || 0;
        }
        const rolesToDealConversion = totalRoles > 0 ? dealRoles / totalRoles * 100 : 0;
        const interviewToDealConversion = totalInterviews > 0 ? (interview2Total + interview3Total + dealRoles) / totalInterviews * 100 : 0;
        const stage1To2Dropoff = interview1Total > 0 ? (interview1Total - interview2Total) / interview1Total * 100 : 0;
        const stage2To3Dropoff = interview2Total > 0 ? (interview2Total - interview3Total) / interview2Total * 100 : 0;
        let healthScore = 0;
        if (totalRoles > 0) healthScore += 20;
        if (dealRoles > 0) healthScore += dealRoles / Math.max(totalRoles, 1) * 30;
        if (totalInterviews > 0) healthScore += 15;
        if (rolesToDealConversion > 20) healthScore += 20;
        if (currentMonthDeals > lastMonthDeals) healthScore += 10;
        if (lostRoles > dealRoles) healthScore -= 15;
        if (cancelledRoles > 3) healthScore -= 10;
        if (noAnswerRoles > 5) healthScore -= 10;
        if (activeRoles > 15 && dealRoles === 0) healthScore -= 20;
        healthScore = Math.max(0, Math.min(100, healthScore));
        let healthTag = "Average Account";
        if (healthScore >= 70) healthTag = "Strong Account";
        else if (healthScore < 40) healthTag = "At Risk Account";
        const highActiveRoleLowDeals = activeRoles > 10 && dealRoles < 2;
        const highInterviewsNoClosures = totalInterviews > 20 && dealRoles === 0;
        const consistentClosures = dealRoles >= 3 && currentMonthDeals > 0;
        const repeatedCancellations = cancelledRoles > 3;
        return {
          client_id: client.id,
          client_name: client.name,
          client_code: client.client_code,
          // Overview
          total_roles: totalRoles,
          active_roles: activeRoles,
          deal_roles: dealRoles,
          lost_roles: lostRoles,
          on_hold_roles: onHoldRoles,
          cancelled_roles: cancelledRoles,
          no_answer_roles: noAnswerRoles,
          // Interviews
          total_interviews: totalInterviews,
          interview_1_count: interview1Total,
          interview_2_count: interview2Total,
          interview_3_count: interview3Total,
          // Conversions
          roles_to_deal_conversion: Math.round(rolesToDealConversion * 10) / 10,
          interview_to_deal_conversion: Math.round(interviewToDealConversion * 10) / 10,
          stage_1_to_2_dropoff: Math.round(stage1To2Dropoff * 10) / 10,
          stage_2_to_3_dropoff: Math.round(stage2To3Dropoff * 10) / 10,
          // Monthly comparison
          current_month: {
            roles_created: currentMonthRoles,
            interviews: currentMonthInterviews,
            deals: currentMonthDeals,
            lost: currentMonthLost
          },
          last_month: {
            roles_created: lastMonthRoles,
            interviews: lastMonthInterviews,
            deals: lastMonthDeals,
            lost: lastMonthLost
          },
          // Growth
          roles_growth: lastMonthRoles > 0 ? Math.round((currentMonthRoles - lastMonthRoles) / lastMonthRoles * 100) : 0,
          interviews_growth: lastMonthInterviews > 0 ? Math.round((currentMonthInterviews - lastMonthInterviews) / lastMonthInterviews * 100) : 0,
          deals_growth: lastMonthDeals > 0 ? Math.round((currentMonthDeals - lastMonthDeals) / lastMonthDeals * 100) : 0,
          // Health
          health_score: Math.round(healthScore),
          health_tag: healthTag,
          // Risk indicators
          high_active_low_deals: highActiveRoleLowDeals,
          high_interviews_no_closures: highInterviewsNoClosures,
          consistent_closures: consistentClosures,
          repeated_cancellations: repeatedCancellations
        };
      })
    );
    return c.json({
      clients: clientAnalytics,
      summary: {
        total_clients: clientAnalytics.length,
        strong_accounts: clientAnalytics.filter((c2) => c2.health_tag === "Strong Account").length,
        average_accounts: clientAnalytics.filter((c2) => c2.health_tag === "Average Account").length,
        at_risk_accounts: clientAnalytics.filter((c2) => c2.health_tag === "At Risk Account").length
      }
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return c.json({ error: "Failed to fetch analytics" }, 500);
  }
});
app$8.get("/api/am/performance", amOnly, async (c) => {
  const db = c.env.DB;
  const amUser = c.get("amUser");
  const clientId = c.req.query("client_id");
  const teamId = c.req.query("team_id");
  const status = c.req.query("status");
  const dateRange = c.req.query("date_range");
  const startDate = c.req.query("start_date");
  const endDate = c.req.query("end_date");
  try {
    let dateFilter = "";
    let dateParams = [];
    if (startDate && endDate) {
      dateFilter = " AND created_at BETWEEN ? AND ?";
      dateParams = [startDate, endDate + " 23:59:59"];
    } else if (dateRange) {
      const now2 = /* @__PURE__ */ new Date();
      if (dateRange === "this_week") {
        const weekStart = new Date(now2);
        weekStart.setDate(now2.getDate() - now2.getDay());
        dateFilter = " AND created_at >= ?";
        dateParams = [weekStart.toISOString().split("T")[0]];
      } else if (dateRange === "this_month") {
        const monthStart = new Date(now2.getFullYear(), now2.getMonth(), 1);
        dateFilter = " AND created_at >= ?";
        dateParams = [monthStart.toISOString().split("T")[0]];
      } else if (dateRange === "last_month") {
        const lastMonthStart = new Date(now2.getFullYear(), now2.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now2.getFullYear(), now2.getMonth(), 0);
        dateFilter = " AND created_at BETWEEN ? AND ?";
        dateParams = [
          lastMonthStart.toISOString().split("T")[0],
          lastMonthEnd.toISOString().split("T")[0] + " 23:59:59"
        ];
      }
    }
    let rolesQuery = "SELECT * FROM am_roles WHERE account_manager_id = ?";
    const rolesParams = [amUser.id];
    if (clientId) {
      rolesQuery += " AND client_id = ?";
      rolesParams.push(clientId);
    }
    if (teamId) {
      rolesQuery += " AND team_id = ?";
      rolesParams.push(teamId);
    }
    if (status && status !== "all") {
      rolesQuery += " AND status = ?";
      rolesParams.push(status);
    }
    rolesQuery += dateFilter;
    rolesParams.push(...dateParams);
    const roles = await db.prepare(rolesQuery).bind(...rolesParams).all();
    const allRoles = roles.results || [];
    const totalRoles = allRoles.length;
    const activeRoles = allRoles.filter((r) => r.status === "active").length;
    const nonActiveRoles = totalRoles - activeRoles;
    const dealRoles = allRoles.filter((r) => r.status === "deal").length;
    const lostRoles = allRoles.filter((r) => r.status === "lost").length;
    const onHoldRoles = allRoles.filter((r) => r.status === "on_hold").length;
    const noAnswerRoles = allRoles.filter((r) => r.status === "no_answer").length;
    const cancelledRoles = allRoles.filter((r) => r.status === "cancelled").length;
    const dropoutRoles = allRoles.filter((r) => r.status === "dropout").length;
    let interview1Count = 0;
    let interview2Count = 0;
    let interview3Count = 0;
    for (const role of allRoles) {
      const interviews = await db.prepare(`
          SELECT interview_round, SUM(interview_count) as total
          FROM am_role_interviews
          WHERE role_id = ?
          GROUP BY interview_round
        `).bind(role.id).all();
      for (const interview of interviews.results || []) {
        const data = interview;
        if (data.interview_round === 1) interview1Count += data.total;
        if (data.interview_round === 2) interview2Count += data.total;
        if (data.interview_round === 3) interview3Count += data.total;
      }
    }
    const totalInterviews = interview1Count + interview2Count + interview3Count;
    const ebesData = {
      total_roles: totalRoles,
      interview_1_count: interview1Count,
      interview_2_count: interview2Count,
      deal_roles: dealRoles,
      lost_roles: lostRoles,
      no_answer_roles: noAnswerRoles,
      on_hold_roles: onHoldRoles,
      cancelled_roles: cancelledRoles,
      dropout_roles: dropoutRoles,
      active_roles: activeRoles
    };
    const ebesResult = calculateAccountManagerEBES(ebesData);
    const cappedEbesScore = ebesResult.score;
    const performanceLabel = ebesResult.performance_label;
    const now = /* @__PURE__ */ new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const lastMonth = `${now.getFullYear()}-${String(now.getMonth() === 0 ? 12 : now.getMonth()).padStart(2, "0")}`;
    const currentMonthRoles = allRoles.filter(
      (r) => r.created_at && r.created_at.startsWith(currentMonth)
    ).length;
    const lastMonthRoles = allRoles.filter(
      (r) => r.created_at && r.created_at.startsWith(lastMonth)
    ).length;
    const currentMonthDeals = allRoles.filter(
      (r) => r.status === "deal" && r.updated_at && r.updated_at.startsWith(currentMonth)
    ).length;
    const lastMonthDeals = allRoles.filter(
      (r) => r.status === "deal" && r.updated_at && r.updated_at.startsWith(lastMonth)
    ).length;
    const currentMonthLost = allRoles.filter(
      (r) => r.status === "lost" && r.updated_at && r.updated_at.startsWith(currentMonth)
    ).length;
    const lastMonthLost = allRoles.filter(
      (r) => r.status === "lost" && r.updated_at && r.updated_at.startsWith(lastMonth)
    ).length;
    let currentMonthInterviews = 0;
    let lastMonthInterviews = 0;
    for (const role of allRoles) {
      const currentInterviews = await db.prepare(`
          SELECT SUM(interview_count) as total
          FROM am_role_interviews
          WHERE role_id = ? AND entry_month = ?
        `).bind(role.id, currentMonth).first();
      const lastInterviews = await db.prepare(`
          SELECT SUM(interview_count) as total
          FROM am_role_interviews
          WHERE role_id = ? AND entry_month = ?
        `).bind(role.id, lastMonth).first();
      currentMonthInterviews += currentInterviews?.total || 0;
      lastMonthInterviews += lastInterviews?.total || 0;
    }
    const rolesToInterviewsConversion = totalRoles > 0 ? totalInterviews / totalRoles * 100 : 0;
    const interviewsToDealsConversion = totalInterviews > 0 ? dealRoles / totalInterviews * 100 : 0;
    const clientPerformance = [];
    const clientIds = [...new Set(allRoles.map((r) => r.client_id))];
    for (const cId of clientIds) {
      const clientRoles = allRoles.filter((r) => r.client_id === cId);
      const client = await db.prepare("SELECT * FROM clients WHERE id = ?").bind(cId).first();
      if (!client) continue;
      const clientTotalRoles = clientRoles.length;
      const clientActiveRoles = clientRoles.filter((r) => r.status === "active").length;
      const clientDeals = clientRoles.filter((r) => r.status === "deal").length;
      const clientLost = clientRoles.filter((r) => r.status === "lost").length;
      const clientOnHold = clientRoles.filter((r) => r.status === "on_hold").length;
      const clientNoAnswer = clientRoles.filter((r) => r.status === "no_answer").length;
      const clientCancelled = clientRoles.filter((r) => r.status === "cancelled").length;
      let clientInt1 = 0, clientInt2 = 0, clientInt3 = 0;
      for (const role of clientRoles) {
        const interviews = await db.prepare(`
            SELECT interview_round, SUM(interview_count) as total
            FROM am_role_interviews
            WHERE role_id = ?
            GROUP BY interview_round
          `).bind(role.id).all();
        for (const interview of interviews.results || []) {
          const data = interview;
          if (data.interview_round === 1) clientInt1 += data.total;
          if (data.interview_round === 2) clientInt2 += data.total;
          if (data.interview_round === 3) clientInt3 += data.total;
        }
      }
      let health = "Average";
      const dealRate = clientTotalRoles > 0 ? clientDeals / clientTotalRoles * 100 : 0;
      if (dealRate >= 30 && clientActiveRoles > 0) health = "Strong";
      else if (dealRate < 10 && (clientLost > clientDeals || clientNoAnswer > 5)) health = "At Risk";
      clientPerformance.push({
        client_id: cId,
        client_name: client.name,
        client_code: client.client_code,
        total_roles: clientTotalRoles,
        active_roles: clientActiveRoles,
        interview_1: clientInt1,
        interview_2: clientInt2,
        interview_3: clientInt3,
        deals: clientDeals,
        lost: clientLost,
        on_hold: clientOnHold,
        no_answer: clientNoAnswer,
        cancelled: clientCancelled,
        health
      });
    }
    const teamPerformance = [];
    const teamIds = [...new Set(allRoles.map((r) => r.team_id))];
    for (const tId of teamIds) {
      const teamRoles = allRoles.filter((r) => r.team_id === tId);
      const team = await db.prepare("SELECT * FROM app_teams WHERE id = ?").bind(tId).first();
      if (!team) continue;
      const teamTotalRoles = teamRoles.length;
      const teamActiveRoles = teamRoles.filter((r) => r.status === "active").length;
      const teamDeals = teamRoles.filter((r) => r.status === "deal").length;
      const teamLost = teamRoles.filter((r) => r.status === "lost").length;
      let teamInterviews = 0;
      for (const role of teamRoles) {
        const interviews = await db.prepare(`
            SELECT SUM(interview_count) as total
            FROM am_role_interviews
            WHERE role_id = ?
          `).bind(role.id).first();
        teamInterviews += interviews?.total || 0;
      }
      let performanceLabel2 = "Average";
      const teamDealRate = teamTotalRoles > 0 ? teamDeals / teamTotalRoles * 100 : 0;
      if (teamDealRate >= 30) performanceLabel2 = "Strong";
      else if (teamDealRate < 10) performanceLabel2 = "At Risk";
      teamPerformance.push({
        team_id: tId,
        team_name: team.name,
        team_code: team.team_code,
        total_roles: teamTotalRoles,
        active_roles: teamActiveRoles,
        total_interviews: teamInterviews,
        total_deals: teamDeals,
        total_lost: teamLost,
        performance_label: performanceLabel2
      });
    }
    return c.json({
      overview: {
        total_roles: totalRoles,
        active_roles: activeRoles,
        non_active_roles: nonActiveRoles,
        total_interviews: totalInterviews,
        interview_1_count: interview1Count,
        interview_2_count: interview2Count,
        interview_3_count: interview3Count,
        total_deals: dealRoles,
        total_lost: lostRoles,
        total_on_hold: onHoldRoles,
        total_no_answer: noAnswerRoles,
        total_cancelled: cancelledRoles,
        total_dropouts: dropoutRoles,
        ebes_score: Math.round(cappedEbesScore * 10) / 10,
        performance_label: performanceLabel,
        current_month: {
          roles: currentMonthRoles,
          interviews: currentMonthInterviews,
          deals: currentMonthDeals,
          lost: currentMonthLost
        },
        last_month: {
          roles: lastMonthRoles,
          interviews: lastMonthInterviews,
          deals: lastMonthDeals,
          lost: lastMonthLost
        },
        roles_to_interviews_conversion: Math.round(rolesToInterviewsConversion * 10) / 10,
        interviews_to_deals_conversion: Math.round(interviewsToDealsConversion * 10) / 10
      },
      client_performance: clientPerformance,
      team_performance: teamPerformance
    });
  } catch (error) {
    console.error("Error fetching performance data:", error);
    return c.json({ error: "Failed to fetch performance data" }, 500);
  }
});
app$8.get("/api/am/aging", amOnly, async (c) => {
  const db = c.env.DB;
  const amUser = c.get("amUser");
  const clientId = c.req.query("client_id");
  const teamId = c.req.query("team_id");
  const status = c.req.query("status") || "active";
  try {
    let query = `
      SELECT r.*
      FROM am_roles r
      WHERE r.account_manager_id = ?
    `;
    const params = [amUser.id];
    if (clientId) {
      query += " AND r.client_id = ?";
      params.push(parseInt(clientId));
    }
    if (teamId) {
      query += " AND r.team_id = ?";
      params.push(parseInt(teamId));
    }
    if (status === "active") {
      query += " AND r.status = 'active'";
    }
    const rolesRes = await db.prepare(query).bind(...params).all();
    const roles = rolesRes.results || [];
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1e3;
    const items = [];
    let daysOpenSum = 0;
    let firstSubSum = 0;
    let firstIntSum = 0;
    let firstSubCount = 0;
    let firstIntCount = 0;
    let over14 = 0;
    let over30 = 0;
    for (const role of roles) {
      const r = role;
      const createdAt = new Date(r.created_at).getTime();
      const daysOpen = Math.max(0, Math.floor((now - createdAt) / dayMs));
      daysOpenSum += daysOpen;
      if (daysOpen >= 14) over14++;
      if (daysOpen >= 30) over30++;
      const firstSubmission = await db.prepare(`SELECT submission_date FROM recruiter_submissions WHERE role_id = ? AND entry_type = 'submission' ORDER BY submission_date ASC LIMIT 1`).bind(r.id).first();
      let firstSubmissionDays = null;
      if (firstSubmission) {
        const subDate = new Date(firstSubmission.submission_date).getTime();
        firstSubmissionDays = Math.max(0, Math.floor((subDate - createdAt) / dayMs));
        firstSubSum += firstSubmissionDays;
        firstSubCount++;
      }
      const firstInterview = await db.prepare(`SELECT submission_date FROM recruiter_submissions WHERE role_id = ? AND entry_type = 'interview' ORDER BY submission_date ASC LIMIT 1`).bind(r.id).first();
      let firstInterviewDays = null;
      if (firstInterview) {
        const intDate = new Date(firstInterview.submission_date).getTime();
        firstInterviewDays = Math.max(0, Math.floor((intDate - createdAt) / dayMs));
        firstIntSum += firstInterviewDays;
        firstIntCount++;
      }
      const dropoutRequest = await db.prepare("SELECT am_decision FROM dropout_requests WHERE role_id = ? AND final_status = 'completed' ORDER BY am_decided_at DESC LIMIT 1").bind(r.id).first();
      items.push({
        id: r.id,
        role_code: r.role_code,
        title: r.title,
        status: r.status,
        days_open: daysOpen,
        first_submission_days: firstSubmissionDays,
        first_interview_days: firstInterviewDays,
        has_dropout: !!dropoutRequest,
        dropout_decision: dropoutRequest ? dropoutRequest.am_decision : null
      });
    }
    items.sort((a, b) => b.days_open - a.days_open);
    const avgDaysOpen = roles.length > 0 ? Math.round(daysOpenSum / roles.length * 10) / 10 : 0;
    const avgFirstSubmission = firstSubCount > 0 ? Math.round(firstSubSum / firstSubCount * 10) / 10 : 0;
    const avgFirstInterview = firstIntCount > 0 ? Math.round(firstIntSum / firstIntCount * 10) / 10 : 0;
    return c.json({
      metrics: {
        avg_days_open: avgDaysOpen,
        roles_over_14: over14,
        roles_over_30: over30,
        avg_time_to_first_submission: avgFirstSubmission,
        avg_time_to_first_interview: avgFirstInterview
      },
      roles: items
    });
  } catch (error) {
    console.error("Error fetching aging metrics:", error);
    return c.json({ error: "Failed to fetch aging metrics" }, 500);
  }
});
app$8.get("/api/am/dropout-requests", amOnly, async (c) => {
  const db = c.env.DB;
  const amUser = c.get("amUser");
  try {
    const requests = await db.prepare(`
        SELECT 
          dr.*,
          r.role_code,
          r.title as role_title,
          c.name as client_name,
          u_recruiter.name as recruiter_name,
          u_recruiter.user_code as recruiter_code,
          u_rm.name as rm_name
        FROM dropout_requests dr
        INNER JOIN am_roles r ON dr.role_id = r.id
        INNER JOIN clients c ON r.client_id = c.id
        INNER JOIN users u_recruiter ON dr.recruiter_user_id = u_recruiter.id
        LEFT JOIN users u_rm ON dr.rm_user_id = u_rm.id
        WHERE dr.am_user_id = ? AND dr.rm_status = 'acknowledged' AND dr.am_decision IS NULL
        ORDER BY dr.rm_acknowledged_at DESC
      `).bind(amUser.id).all();
    return c.json(requests.results || []);
  } catch (error) {
    console.error("Error fetching dropout requests:", error);
    return c.json({ error: "Failed to fetch dropout requests" }, 500);
  }
});
app$8.put("/api/am/dropout-requests/:id/decide", amOnly, async (c) => {
  const db = c.env.DB;
  const amUser = c.get("amUser");
  const requestId = c.req.param("id");
  const { decision, new_role_status } = await c.req.json();
  if (!["accept", "ignore"].includes(decision)) {
    return c.json({ error: "Decision must be 'accept' or 'ignore'" }, 400);
  }
  try {
    const request = await db.prepare("SELECT * FROM dropout_requests WHERE id = ? AND am_user_id = ?").bind(requestId, amUser.id).first();
    if (!request) {
      return c.json({ error: "Dropout request not found" }, 404);
    }
    const req = request;
    await db.prepare(`
        UPDATE dropout_requests 
        SET am_decision = ?,
            am_new_role_status = ?,
            am_decided_at = datetime('now'),
            final_status = 'completed',
            updated_at = datetime('now')
        WHERE id = ?
      `).bind(decision, new_role_status || null, requestId).run();
    if (decision === "accept") {
      const proposed = new_role_status || "active";
      const finalStatus = proposed === "dropout" ? "active" : proposed;
      await db.prepare("UPDATE am_roles SET status = ?, updated_at = datetime('now') WHERE id = ?").bind(finalStatus, req.role_id).run();
      await createNotification(db, {
        userId: req.recruiter_user_id,
        type: "dropout",
        title: "Dropout Accepted",
        message: `Your dropout request was accepted by the Account Manager. Role remains ${finalStatus}.`,
        relatedEntityType: "role",
        relatedEntityId: req.role_id
      });
    } else if (decision === "ignore") {
      const proposed = new_role_status || "active";
      const finalStatus = proposed === "dropout" ? "active" : proposed;
      await db.prepare("UPDATE am_roles SET status = ?, updated_at = datetime('now') WHERE id = ?").bind(finalStatus, req.role_id).run();
      await createNotification(db, {
        userId: req.recruiter_user_id,
        type: "system",
        title: "Dropout Ignored",
        message: `Your dropout request was reviewed. Role remains ${finalStatus}.`,
        relatedEntityType: "role",
        relatedEntityId: req.role_id
      });
    }
    if (req.rm_user_id) {
      await createNotification(db, {
        userId: req.rm_user_id,
        type: "system",
        title: "Dropout Decision Made",
        message: `AM ${decision === "accept" ? "accepted" : "ignored"} the dropout request for role ${req.role_id}.`,
        relatedEntityType: "role",
        relatedEntityId: req.role_id
      });
    }
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deciding on dropout:", error);
    return c.json({ error: "Failed to process decision" }, 500);
  }
});
app$8.get("/api/am/ebes-score", amOnly, async (c) => {
  const db = c.env.DB;
  const amUser = c.get("amUser");
  const startDate = c.req.query("start_date");
  const endDate = c.req.query("end_date");
  try {
    let newRolesCount = 0;
    if (startDate && endDate) {
      const newRoles = await db.prepare("SELECT COUNT(*) as total FROM am_roles WHERE account_manager_id = ? AND created_at BETWEEN ? AND ?").bind(amUser.id, startDate, endDate + " 23:59:59").first();
      newRolesCount = newRoles?.total || 0;
    } else {
      const newRoles = await db.prepare("SELECT COUNT(*) as total FROM am_roles WHERE account_manager_id = ?").bind(amUser.id).first();
      newRolesCount = newRoles?.total || 0;
    }
    let activeRoles = 0;
    let dealRoles = 0;
    let lostRoles = 0;
    let noAnswerRoles = 0;
    let onHoldRoles = 0;
    let cancelledRoles = 0;
    let dropoutRoles = 0;
    if (startDate && endDate) {
      const statusRows = await db.prepare(`
          SELECT status, COUNT(*) as total
          FROM am_roles
          WHERE account_manager_id = ?
            AND updated_at BETWEEN ? AND ?
          GROUP BY status
        `).bind(amUser.id, startDate, endDate + " 23:59:59").all();
      for (const row of statusRows.results || []) {
        const s = row.status;
        const t = row.total;
        if (s === "active") activeRoles = t;
        else if (s === "deal") dealRoles = t;
        else if (s === "lost") lostRoles = t;
        else if (s === "no_answer") noAnswerRoles = t;
        else if (s === "on_hold") onHoldRoles = t;
        else if (s === "cancelled") cancelledRoles = t;
        else if (s === "dropout") dropoutRoles = t;
      }
    } else {
      const statusRows = await db.prepare(`
          SELECT status, COUNT(*) as total
          FROM am_roles
          WHERE account_manager_id = ?
          GROUP BY status
        `).bind(amUser.id).all();
      for (const row of statusRows.results || []) {
        const s = row.status;
        const t = row.total;
        if (s === "active") activeRoles = t;
        else if (s === "deal") dealRoles = t;
        else if (s === "lost") lostRoles = t;
        else if (s === "no_answer") noAnswerRoles = t;
        else if (s === "on_hold") onHoldRoles = t;
        else if (s === "cancelled") cancelledRoles = t;
        else if (s === "dropout") dropoutRoles = t;
      }
    }
    let interview1Count = 0;
    let interview2Count = 0;
    const rolesForInterviews = await db.prepare("SELECT id FROM am_roles WHERE account_manager_id = ?").bind(amUser.id).all();
    for (const role of rolesForInterviews.results || []) {
      let interviewQuery = `
        SELECT interview_round, SUM(interview_count) as total
        FROM am_role_interviews
        WHERE role_id = ?
      `;
      const interviewParams = [role.id];
      if (startDate && endDate) {
        interviewQuery += " AND entry_month BETWEEN ? AND ?";
        interviewParams.push(startDate.substring(0, 7), endDate.substring(0, 7));
      }
      interviewQuery += " GROUP BY interview_round";
      const interviews = await db.prepare(interviewQuery).bind(...interviewParams).all();
      for (const interview of interviews.results || []) {
        const data = interview;
        const count = data.total;
        if (data.interview_round === 1) interview1Count += count;
        if (data.interview_round === 2) interview2Count += count;
      }
    }
    const ebesData = {
      total_roles: newRolesCount,
      interview_1_count: interview1Count,
      interview_2_count: interview2Count,
      deal_roles: dealRoles,
      lost_roles: lostRoles,
      no_answer_roles: noAnswerRoles,
      on_hold_roles: onHoldRoles,
      cancelled_roles: cancelledRoles,
      dropout_roles: dropoutRoles,
      active_roles: activeRoles
    };
    const ebesResult = calculateAccountManagerEBES(ebesData);
    return c.json({
      score: ebesResult.score,
      performance_label: ebesResult.performance_label
    });
  } catch (error) {
    console.error("Error calculating EBES score:", error);
    return c.json({ error: "Failed to calculate EBES score" }, 500);
  }
});
const app$7 = new Hono2();
const authenticatedUser$1 = async (c, next) => {
  const db = c.env.DB;
  const userId = c.req.header("x-user-id");
  if (!userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  const user = await db.prepare("SELECT * FROM users WHERE id = ? AND is_active = 1").bind(userId).first();
  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }
  c.set("currentUser", user);
  await next();
};
app$7.get("/api/profile", authenticatedUser$1, async (c) => {
  const user = c.get("currentUser");
  return c.json({
    id: user.id,
    email: user.email,
    name: user.name,
    user_code: user.user_code,
    role: user.role,
    is_active: user.is_active
  });
});
app$7.put("/api/profile", authenticatedUser$1, async (c) => {
  const db = c.env.DB;
  const user = c.get("currentUser");
  const body = await c.req.json();
  const schema = objectType({
    name: stringType().min(1).optional(),
    email: stringType().email().optional()
  });
  try {
    const data = schema.parse(body);
    const updates = [];
    const values = [];
    if (data.name !== void 0) {
      updates.push("name = ?");
      values.push(data.name);
    }
    if (data.email !== void 0) {
      const existingUser = await db.prepare("SELECT * FROM users WHERE email = ? AND id != ?").bind(data.email, user.id).first();
      if (existingUser) {
        return c.json({ error: "Email already in use by another user" }, 400);
      }
      updates.push("email = ?");
      values.push(data.email);
    }
    if (updates.length === 0) {
      return c.json({ error: "No fields to update" }, 400);
    }
    updates.push("updated_at = CURRENT_TIMESTAMP");
    values.push(user.id);
    await db.prepare(`UPDATE users SET ${updates.join(", ")} WHERE id = ?`).bind(...values).run();
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to update profile" }, 500);
  }
});
app$7.post("/api/profile/change-password", authenticatedUser$1, async (c) => {
  const db = c.env.DB;
  const user = c.get("currentUser");
  const body = await c.req.json();
  const schema = objectType({
    current_password: stringType().min(1),
    new_password: stringType().min(6)
  });
  try {
    const data = schema.parse(body);
    if (user.password !== data.current_password) {
      return c.json({ error: "Current password is incorrect" }, 400);
    }
    await db.prepare("UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").bind(data.new_password, user.id).run();
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to change password" }, 500);
  }
});
const app$6 = new Hono2();
const recruiterOnly$1 = async (c, next) => {
  const db = c.env.DB;
  const userId = c.req.header("x-user-id");
  if (!userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  const user = await db.prepare("SELECT * FROM users WHERE id = ? AND role = 'recruiter' AND is_active = 1").bind(userId).first();
  if (!user) {
    return c.json({ error: "Unauthorized - Recruiter only" }, 403);
  }
  c.set("recruiterUser", user);
  await next();
};
app$6.get("/api/recruiter/clients", recruiterOnly$1, async (c) => {
  const db = c.env.DB;
  const recruiterUser = c.get("recruiterUser");
  try {
    const assignments = await db.prepare(`
        SELECT c.*, t.id as team_id, t.name as team_name, t.team_code
        FROM recruiter_client_assignments rca
        INNER JOIN clients c ON rca.client_id = c.id
        INNER JOIN app_teams t ON rca.team_id = t.id
        WHERE rca.recruiter_user_id = ? AND c.is_active = 1
      `).bind(recruiterUser.id).all();
    return c.json(assignments.results || []);
  } catch (error) {
    console.error("Error fetching recruiter clients:", error);
    return c.json({ error: "Failed to fetch clients" }, 500);
  }
});
app$6.get("/api/recruiter/teams", recruiterOnly$1, async (c) => {
  const db = c.env.DB;
  const recruiterUser = c.get("recruiterUser");
  try {
    const teams = await db.prepare(`
        SELECT DISTINCT t.*
        FROM app_teams t
        INNER JOIN recruiter_team_assignments rta ON t.id = rta.team_id
        WHERE rta.recruiter_user_id = ? AND t.is_active = 1
        ORDER BY t.name
      `).bind(recruiterUser.id).all();
    return c.json(teams.results || []);
  } catch (error) {
    console.error("Error fetching recruiter teams:", error);
    return c.json({ error: "Failed to fetch teams" }, 500);
  }
});
app$6.get("/api/recruiter/roles/:clientId/:teamId", recruiterOnly$1, async (c) => {
  const db = c.env.DB;
  const clientId = c.req.param("clientId");
  const teamId = c.req.param("teamId");
  try {
    const roles = await db.prepare(`
        SELECT r.*, u.name as account_manager_name
        FROM am_roles r
        INNER JOIN users u ON r.account_manager_id = u.id
        WHERE r.client_id = ? AND r.team_id = ? AND r.status = 'active'
        ORDER BY r.created_at DESC
      `).bind(clientId, teamId).all();
    return c.json(roles.results || []);
  } catch (error) {
    console.error("Error fetching roles:", error);
    return c.json({ error: "Failed to fetch roles" }, 500);
  }
});
app$6.get("/api/recruiter/team-info", recruiterOnly$1, async (c) => {
  const db = c.env.DB;
  const recruiterUser = c.get("recruiterUser");
  try {
    const teamAssignment = await db.prepare(`
        SELECT t.id, t.name, t.team_code
        FROM recruiter_team_assignments rta
        INNER JOIN app_teams t ON rta.team_id = t.id
        WHERE rta.recruiter_user_id = ?
        LIMIT 1
      `).bind(recruiterUser.id).first();
    if (!teamAssignment) {
      return c.json({ error: "No team assigned" }, 404);
    }
    const recruitmentManager = await db.prepare(`
        SELECT u.id, u.name, u.email, u.user_code
        FROM users u
        INNER JOIN team_assignments ta ON u.id = ta.user_id
        WHERE ta.team_id = ? AND u.role = 'recruitment_manager'
        LIMIT 1
      `).bind(teamAssignment.id).first();
    return c.json({
      team: teamAssignment,
      recruitment_manager: recruitmentManager || null
    });
  } catch (error) {
    console.error("Error fetching team info:", error);
    return c.json({ error: "Failed to fetch team info" }, 500);
  }
});
app$6.get("/api/recruiter/pipeline", recruiterOnly$1, async (c) => {
  const db = c.env.DB;
  const recruiterUser = c.get("recruiterUser");
  const clientId = c.req.query("client_id");
  try {
    const submissionsRes = await db.prepare(`SELECT COUNT(*) as count FROM recruiter_submissions WHERE recruiter_user_id = ? ${clientId ? "AND client_id = ?" : ""} AND entry_type = 'submission'`).bind(...[recruiterUser.id].concat(clientId ? [parseInt(clientId)] : [])).first();
    const interviews1Res = await db.prepare(`SELECT COUNT(*) as count FROM recruiter_submissions WHERE recruiter_user_id = ? ${clientId ? "AND client_id = ?" : ""} AND entry_type = 'interview' AND interview_level = 1`).bind(...[recruiterUser.id].concat(clientId ? [parseInt(clientId)] : [])).first();
    const interviews2Res = await db.prepare(`SELECT COUNT(*) as count FROM recruiter_submissions WHERE recruiter_user_id = ? ${clientId ? "AND client_id = ?" : ""} AND entry_type = 'interview' AND interview_level = 2`).bind(...[recruiterUser.id].concat(clientId ? [parseInt(clientId)] : [])).first();
    const interviews3Res = await db.prepare(`SELECT COUNT(*) as count FROM recruiter_submissions WHERE recruiter_user_id = ? ${clientId ? "AND client_id = ?" : ""} AND entry_type = 'interview' AND interview_level = 3`).bind(...[recruiterUser.id].concat(clientId ? [parseInt(clientId)] : [])).first();
    const dealsRes = await db.prepare(`SELECT COUNT(*) as count FROM recruiter_submissions WHERE recruiter_user_id = ? ${clientId ? "AND client_id = ?" : ""} AND entry_type = 'deal'`).bind(...[recruiterUser.id].concat(clientId ? [parseInt(clientId)] : [])).first();
    const dropoutsRes = await db.prepare(`SELECT COUNT(*) as count FROM dropout_requests WHERE recruiter_user_id = ? ${clientId ? "AND role_id IN (SELECT id FROM am_roles WHERE client_id = ?)" : ""}`).bind(...[recruiterUser.id].concat(clientId ? [parseInt(clientId)] : [])).first();
    const rolesBaseQuery = `SELECT r.id, r.title, r.role_code, r.created_at FROM am_roles r WHERE r.status = 'active' ${clientId ? "AND r.client_id = ?" : ""}`;
    const rolesBaseParams = clientId ? [parseInt(clientId)] : [];
    const rolesRes = await db.prepare(rolesBaseQuery).bind(...rolesBaseParams).all();
    const roles = rolesRes.results || [];
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0];
    let rolesNoSubmission7d = 0;
    let rolesNoInterview7d = 0;
    const focus = [];
    for (const role of roles) {
      const r = role;
      const latestSubmission = await db.prepare(`SELECT submission_date FROM recruiter_submissions WHERE role_id = ? AND recruiter_user_id = ? AND entry_type = 'submission' ORDER BY submission_date DESC LIMIT 1`).bind(r.id, recruiterUser.id).first();
      const latestInterview = await db.prepare(`SELECT submission_date FROM recruiter_submissions WHERE role_id = ? AND recruiter_user_id = ? AND entry_type = 'interview' ORDER BY submission_date DESC LIMIT 1`).bind(r.id, recruiterUser.id).first();
      if (!latestSubmission || latestSubmission.submission_date < sevenDaysAgo) {
        rolesNoSubmission7d++;
        if (focus.length < 5) focus.push({ role_id: r.id, role_code: r.role_code, title: r.title, reason: "No submission ≥7d" });
      } else if (!latestInterview || latestInterview.submission_date < sevenDaysAgo) {
        rolesNoInterview7d++;
        if (focus.length < 5) focus.push({ role_id: r.id, role_code: r.role_code, title: r.title, reason: "No interview ≥7d" });
      }
      const lastDropout = await db.prepare(`SELECT am_decision FROM dropout_requests WHERE role_id = ? AND recruiter_user_id = ? ORDER BY created_at DESC LIMIT 1`).bind(r.id, recruiterUser.id).first();
      if (lastDropout?.am_decision === "accept" && focus.length < 5) {
        focus.push({ role_id: r.id, role_code: r.role_code, title: r.title, reason: "Dropout accepted – rework" });
      }
    }
    return c.json({
      counts: {
        submissions: submissionsRes?.count || 0,
        interview_1: interviews1Res?.count || 0,
        interview_2: interviews2Res?.count || 0,
        interview_3: interviews3Res?.count || 0,
        deals: dealsRes?.count || 0,
        dropouts: dropoutsRes?.count || 0
      },
      sla: {
        roles_no_submission_7d: rolesNoSubmission7d,
        roles_no_interview_7d: rolesNoInterview7d
      },
      focus
    });
  } catch (error) {
    console.error("Error fetching pipeline metrics:", error);
    return c.json({ error: "Failed to fetch pipeline metrics" }, 500);
  }
});
app$6.get("/api/recruiter/deal-roles", recruiterOnly$1, async (c) => {
  const db = c.env.DB;
  const recruiterUser = c.get("recruiterUser");
  try {
    const clientIdParam = c.req.query("client_id");
    const teamIdParam = c.req.query("team_id");
    let where = "r.status = 'deal'";
    const params = [];
    if (clientIdParam) {
      where += " AND r.client_id = ?";
      params.push(parseInt(clientIdParam));
    }
    if (teamIdParam) {
      where += " AND r.team_id = ?";
      params.push(parseInt(teamIdParam));
    } else {
      const assignedTeams = await db.prepare(`SELECT team_id FROM team_assignments WHERE user_id = ?`).bind(recruiterUser.id).all();
      const teamIds = (assignedTeams.results || []).map((row) => row.team_id);
      if (teamIds.length > 0) {
        const placeholders = teamIds.map(() => "?").join(",");
        where += ` AND r.team_id IN (${placeholders})`;
        params.push(...teamIds);
      }
    }
    const query = `
      SELECT r.*, c.name as client_name, t.name as team_name
      FROM am_roles r
      INNER JOIN clients c ON r.client_id = c.id
      INNER JOIN app_teams t ON r.team_id = t.id
      WHERE ${where}
      ORDER BY r.updated_at DESC
      LIMIT 50
    `;
    const dealRoles = await db.prepare(query).bind(...params).all();
    return c.json(dealRoles.results || []);
  } catch (error) {
    console.error("Error fetching deal roles:", error);
    return c.json({ error: "Failed to fetch deal roles" }, 500);
  }
});
app$6.post("/api/recruiter/submissions", recruiterOnly$1, async (c) => {
  const db = c.env.DB;
  const recruiterUser = c.get("recruiterUser");
  const body = await c.req.json();
  const schema = objectType({
    client_id: numberType().optional(),
    team_id: numberType().optional(),
    role_id: numberType().optional(),
    submission_type: enumType(["6h", "24h", "after_24h"]).optional(),
    submission_date: stringType(),
    candidate_name: stringType().optional(),
    candidate_email: stringType().optional(),
    candidate_phone: stringType().optional(),
    candidate_id: numberType().nullable().optional(),
    notes: stringType().optional(),
    entry_type: enumType(["submission", "interview", "deal", "dropout"]).optional(),
    interview_level: numberType().min(1).max(3).optional(),
    dropout_role_id: numberType().optional(),
    dropout_reason: stringType().optional(),
    cv_match_percent: numberType().min(0).max(100).optional()
  });
  try {
    const data = schema.parse(body);
    const entryType = data.entry_type || "submission";
    let roleId = data.role_id;
    let clientId = data.client_id;
    let teamId = data.team_id;
    let accountManagerId = null;
    let recruitmentManagerId = null;
    if (entryType === "dropout" && data.dropout_role_id) {
      roleId = data.dropout_role_id;
      const dropoutRole = await db.prepare("SELECT * FROM am_roles WHERE id = ?").bind(data.dropout_role_id).first();
      if (!dropoutRole) {
        return c.json({ error: "Dropout role not found" }, 404);
      }
      clientId = dropoutRole.client_id;
      teamId = dropoutRole.team_id;
      accountManagerId = dropoutRole.account_manager_id;
      let rmUserId = null;
      if (teamId) {
        const rm = await db.prepare(`
            SELECT u.id
            FROM users u
            INNER JOIN team_assignments ta ON u.id = ta.user_id
            WHERE ta.team_id = ? AND u.role = 'recruitment_manager'
            LIMIT 1
          `).bind(teamId).first();
        rmUserId = rm ? rm.id : null;
      }
      await db.prepare(`
          INSERT INTO dropout_requests (
            role_id, recruiter_user_id, rm_user_id, am_user_id, 
            dropout_reason, rm_status, final_status
          ) VALUES (?, ?, ?, ?, ?, 'pending', 'pending')
        `).bind(
        data.dropout_role_id,
        recruiterUser.id,
        rmUserId,
        accountManagerId,
        data.dropout_reason || "Not specified"
      ).run();
      if (rmUserId) {
        await createNotification(db, {
          userId: rmUserId,
          type: "dropout",
          title: "Dropout Requires Acknowledgment",
          message: `Recruiter ${recruiterUser.name} marked a dropout on role ${dropoutRole.title}. Please review and acknowledge.`,
          relatedEntityType: "role",
          relatedEntityId: data.dropout_role_id
        });
      }
    } else if (roleId) {
      const role = await db.prepare("SELECT * FROM am_roles WHERE id = ?").bind(roleId).first();
      if (!role) {
        return c.json({ error: "Role not found" }, 404);
      }
      accountManagerId = role.account_manager_id;
      clientId = clientId || role.client_id;
      teamId = teamId || role.team_id;
      if (entryType === "deal") {
        await db.prepare("UPDATE am_roles SET status = 'deal' WHERE id = ?").bind(roleId).run();
        if (accountManagerId) {
          await createNotification(db, {
            userId: accountManagerId,
            type: "deal",
            title: "New Deal!",
            message: `Recruiter ${recruiterUser.name} closed a deal on role ${role.title}`,
            relatedEntityType: "role",
            relatedEntityId: Number(roleId)
          });
        }
        if (teamId) {
          const rmUsers = await db.prepare(`
              SELECT u.id
              FROM users u
              INNER JOIN team_assignments ta ON u.id = ta.user_id
              WHERE ta.team_id = ? AND u.role = 'recruitment_manager'
            `).bind(teamId).all();
          for (const row of rmUsers.results || []) {
            const rmId = row.id;
            await createNotification(db, {
              userId: rmId,
              type: "deal",
              title: "New Deal!",
              message: `Recruiter ${recruiterUser.name} closed a deal on role ${role.title}`,
              relatedEntityType: "role",
              relatedEntityId: Number(roleId)
            });
          }
        }
      }
    }
    if (teamId) {
      const recruitmentManager = await db.prepare(`
          SELECT u.id
          FROM users u
          INNER JOIN team_assignments ta ON u.id = ta.user_id
          WHERE ta.team_id = ? AND u.role = 'recruitment_manager'
          LIMIT 1
        `).bind(teamId).first();
      recruitmentManagerId = recruitmentManager ? recruitmentManager.id : null;
    }
    let candidateId = data.candidate_id;
    if (entryType === "submission" && data.candidate_name && data.candidate_name.trim()) {
      if (!candidateId) {
        const candidateName = data.candidate_name.trim();
        const codeCounter = await db.prepare("SELECT next_number FROM code_counters WHERE category = 'candidate'").first();
        let nextNumber = 1;
        if (codeCounter) {
          nextNumber = codeCounter.next_number;
          await db.prepare("UPDATE code_counters SET next_number = next_number + 1 WHERE category = 'candidate'").run();
        } else {
          await db.prepare("INSERT INTO code_counters (category, next_number) VALUES ('candidate', 2)").run();
        }
        const candidateCode = `NL-${String(nextNumber).padStart(4, "0")}`;
        const candidateResult = await db.prepare(`
            INSERT INTO candidates (candidate_code, name, email, phone, is_active, created_by_user_id, created_at, updated_at)
            VALUES (?, ?, ?, ?, 1, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          `).bind(
          candidateCode,
          candidateName,
          data.candidate_email?.trim() || null,
          data.candidate_phone?.trim() || null,
          recruiterUser.id
        ).run();
        candidateId = candidateResult.meta.last_row_id;
      }
      if (candidateId && roleId) {
        await db.prepare(`
            INSERT INTO candidate_role_associations (
              candidate_id, role_id, recruiter_user_id, client_id, team_id,
              status, submission_date, is_discarded
            )
            VALUES (?, ?, ?, ?, ?, 'submitted', ?, 0)
          `).bind(candidateId, roleId, recruiterUser.id, clientId, teamId, data.submission_date).run();
      }
    }
    const submissionTypeValue = data.submission_type || "24h";
    if (entryType === "submission") {
      const percent = typeof data.cv_match_percent === "number" ? data.cv_match_percent : void 0;
      if (percent === void 0) {
        return c.json({ error: "cv_match_percent is required for submissions" }, 400);
      }
      if (percent < 85) {
        return c.json({ error: "Submission blocked: CV matching percentage must be at least 85%" }, 400);
      }
    }
    await db.prepare(`
        INSERT INTO recruiter_submissions (
          recruiter_user_id, client_id, team_id, role_id, 
          account_manager_id, recruitment_manager_id, 
          submission_type, submission_date, candidate_name, notes, entry_type,
          interview_level, dropout_role_id, dropout_reason, cv_match_percent
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
      recruiterUser.id,
      clientId || null,
      teamId || null,
      roleId || null,
      accountManagerId,
      recruitmentManagerId,
      submissionTypeValue,
      data.submission_date,
      data.candidate_name || null,
      data.notes || "",
      entryType,
      data.interview_level || null,
      data.dropout_role_id || null,
      data.dropout_reason || null,
      entryType === "submission" ? data.cv_match_percent : null
    ).run();
    return c.json({ success: true });
  } catch (error) {
    console.error("Error creating submission:", error);
    return c.json({ error: "Failed to create submission" }, 500);
  }
});
app$6.get("/api/recruiter/submissions", recruiterOnly$1, async (c) => {
  const db = c.env.DB;
  const recruiterUser = c.get("recruiterUser");
  const startDate = c.req.query("start_date");
  const endDate = c.req.query("end_date");
  const clientId = c.req.query("client_id");
  const searchName = c.req.query("search_name");
  try {
    let query = `
      SELECT rs.*, c.name as client_name, t.name as team_name, 
             r.title as role_title, r.role_code,
             u.name as account_manager_name
      FROM recruiter_submissions rs
      INNER JOIN clients c ON rs.client_id = c.id
      INNER JOIN app_teams t ON rs.team_id = t.id
      INNER JOIN am_roles r ON rs.role_id = r.id
      INNER JOIN users u ON rs.account_manager_id = u.id
      WHERE rs.recruiter_user_id = ?
    `;
    const params = [recruiterUser.id];
    if (clientId) {
      query += " AND rs.client_id = ?";
      params.push(parseInt(clientId));
    }
    if (startDate && endDate) {
      query += " AND rs.submission_date BETWEEN ? AND ?";
      params.push(startDate, endDate);
    }
    if (searchName) {
      query += " AND rs.candidate_name LIKE ?";
      params.push(`%${searchName}%`);
    }
    query += " ORDER BY rs.submission_date DESC, rs.created_at DESC";
    const submissions = await db.prepare(query).bind(...params).all();
    const stats = {
      total: submissions.results?.length || 0,
      submission_6h: submissions.results?.filter((s) => s.entry_type === "submission" && s.submission_type === "6h").length || 0,
      submission_24h: submissions.results?.filter((s) => s.entry_type === "submission" && s.submission_type === "24h").length || 0,
      submission_after_24h: submissions.results?.filter((s) => s.entry_type === "submission" && s.submission_type === "after_24h").length || 0,
      interviews: submissions.results?.filter((s) => s.entry_type === "interview").length || 0,
      deals: submissions.results?.filter((s) => s.entry_type === "deal").length || 0,
      dropouts: submissions.results?.filter((s) => s.entry_type === "dropout").length || 0
    };
    return c.json({
      submissions: submissions.results || [],
      stats
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return c.json({ error: "Failed to fetch submissions" }, 500);
  }
});
app$6.get("/api/recruiter/ebes", recruiterOnly$1, async (c) => {
  const db = c.env.DB;
  const recruiterUser = c.get("recruiterUser");
  const filter = c.req.query("filter") || "combined";
  const clientId = c.req.query("client_id");
  try {
    let dateFilter = "";
    const dateParams = [];
    const now = /* @__PURE__ */ new Date();
    if (filter === "date") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];
      dateFilter = " AND rs.submission_date BETWEEN ? AND ?";
      dateParams.push(startOfMonth, endOfMonth);
    }
    let query = `
      SELECT rs.*
      FROM recruiter_submissions rs
      WHERE rs.recruiter_user_id = ?${dateFilter}
    `;
    const params = [recruiterUser.id, ...dateParams];
    if (filter === "client" && clientId) {
      query += ` AND rs.client_id = ?`;
      params.push(parseInt(clientId));
    }
    const submissions = await db.prepare(query).bind(...params).all();
    const results = submissions.results || [];
    let table1Points = 0;
    const submission6h = results.filter((s) => s.entry_type === "submission" && s.submission_type === "6h").length;
    const submission24h = results.filter((s) => s.entry_type === "submission" && s.submission_type === "24h").length;
    const submissionAfter24h = results.filter((s) => s.entry_type === "submission" && s.submission_type === "after_24h").length;
    table1Points += submission6h * 2;
    table1Points += submission24h * 1.5;
    table1Points += submissionAfter24h * 1;
    const interview1 = results.filter((s) => s.entry_type === "interview" && s.interview_level === 1).length;
    const interview2 = results.filter((s) => s.entry_type === "interview" && s.interview_level === 2).length;
    const interview3 = results.filter((s) => s.entry_type === "interview" && s.interview_level === 3).length;
    table1Points += interview1 * 3;
    table1Points += interview2 * 1.5;
    table1Points += interview3 * 0;
    const deals = results.filter((s) => s.entry_type === "deal").length;
    table1Points += deals * 7;
    const dropoutEntries = results.filter((s) => s.entry_type === "dropout");
    let acceptedDropouts = 0;
    for (const dropout of dropoutEntries) {
      const dropoutRequest = await db.prepare("SELECT am_decision FROM dropout_requests WHERE role_id = ? AND recruiter_user_id = ? ORDER BY created_at DESC LIMIT 1").bind(dropout.role_id, recruiterUser.id).first();
      if (dropoutRequest?.am_decision === "accept") {
        acceptedDropouts++;
      }
    }
    let craDateFilter = "";
    let craDateParams = [];
    if (dateParams.length === 2) {
      craDateFilter = " AND submission_date BETWEEN ? AND ?";
      craDateParams = [dateParams[0], dateParams[1]];
    }
    const discardedCandidatesQuery = `
      SELECT COUNT(DISTINCT candidate_id) as count
      FROM candidate_role_associations
      WHERE recruiter_user_id = ? AND is_discarded = 1 AND (is_lost_role = 0 OR is_lost_role IS NULL)${craDateFilter}
    `;
    const discardedCandidatesResult = await db.prepare(discardedCandidatesQuery).bind(recruiterUser.id, ...craDateParams).first();
    const discardedCandidatesCount = discardedCandidatesResult?.count || 0;
    const lostRoleCandidatesQuery = `
      SELECT COUNT(DISTINCT candidate_id) as count
      FROM candidate_role_associations
      WHERE recruiter_user_id = ? AND is_discarded = 1 AND is_lost_role = 1${craDateFilter}
    `;
    const lostRoleCandidatesResult = await db.prepare(lostRoleCandidatesQuery).bind(recruiterUser.id, ...craDateParams).first();
    const lostRoleCandidatesCount = lostRoleCandidatesResult?.count || 0;
    let table2Points = 0;
    const assignedRolesQuery = `
      SELECT COUNT(DISTINCT role_id) as count
      FROM role_recruiter_assignments
      WHERE recruiter_user_id = ?
    `;
    const assignedRolesResult = await db.prepare(assignedRolesQuery).bind(recruiterUser.id).first();
    const assignedRolesCount = assignedRolesResult?.count || 0;
    table2Points += assignedRolesCount * 3;
    const activelyWorkedQuery = `
      SELECT COUNT(DISTINCT rs.role_id) as count
      FROM recruiter_submissions rs
      WHERE rs.recruiter_user_id = ?${dateFilter}
        AND rs.role_id NOT IN (
          SELECT role_id 
          FROM role_recruiter_assignments 
          WHERE recruiter_user_id = ?
        )
    `;
    const activelyWorkedResult = await db.prepare(activelyWorkedQuery).bind(recruiterUser.id, ...dateParams, recruiterUser.id).first();
    const activelyWorkedCount = activelyWorkedResult?.count || 0;
    table2Points += activelyWorkedCount * 1;
    const percents = results.filter((s) => s.entry_type === "submission" && typeof s.cv_match_percent === "number").map((s) => s.cv_match_percent);
    const avgCvQuality = percents.length > 0 ? percents.reduce((a, b) => a + b, 0) / percents.length : 0;
    const ebesData = {
      submissions_6h: submission6h,
      submissions_24h: submission24h,
      submissions_after_24h: submissionAfter24h,
      interviews_level_1: interview1,
      interviews_level_2: interview2,
      deals,
      accepted_dropouts: acceptedDropouts,
      discarded_candidates: discardedCandidatesCount,
      lost_role_candidates: lostRoleCandidatesCount,
      assigned_roles: assignedRolesCount,
      actively_worked_roles: activelyWorkedCount,
      avg_cv_quality: avgCvQuality
    };
    const result = calculateRecruiterEBES(ebesData);
    return c.json({
      score: result.score,
      breakdown: {
        table1: {
          total: result.table1_points,
          submission_6h: submission6h,
          submission_24h: submission24h,
          submission_after_24h: submissionAfter24h,
          interview_1: interview1,
          interview_2: interview2,
          interview_3: interview3,
          deals,
          dropouts: dropoutEntries.length,
          accepted_dropouts: acceptedDropouts,
          discarded_candidates: discardedCandidatesCount,
          lost_role_candidates: lostRoleCandidatesCount
        },
        table2: {
          total: result.table2_points,
          assigned_roles: assignedRolesCount,
          actively_worked_roles: activelyWorkedCount
        }
      }
    });
  } catch (error) {
    console.error("Error calculating EBES:", error);
    return c.json({ error: "Failed to calculate EBES" }, 500);
  }
});
app$6.get("/api/recruiter/all-roles", recruiterOnly$1, async (c) => {
  const db = c.env.DB;
  const recruiterUser = c.get("recruiterUser");
  try {
    const roles = await db.prepare(`
        SELECT DISTINCT r.id, r.title, r.role_code
        FROM am_roles r
        INNER JOIN recruiter_submissions rs ON r.id = rs.role_id
        WHERE rs.recruiter_user_id = ?
        ORDER BY r.title
      `).bind(recruiterUser.id).all();
    return c.json(roles.results || []);
  } catch (error) {
    console.error("Error fetching roles:", error);
    return c.json({ error: "Failed to fetch roles" }, 500);
  }
});
app$6.get("/api/recruiter/analytics", recruiterOnly$1, async (c) => {
  const db = c.env.DB;
  const recruiterUser = c.get("recruiterUser");
  const clientId = c.req.query("client_id");
  const roleId = c.req.query("role_id");
  const entryType = c.req.query("entry_type");
  const dateRange = c.req.query("date_range") || "";
  const startDate = c.req.query("start_date");
  const endDate = c.req.query("end_date");
  try {
    let dateFilter = "";
    const now = /* @__PURE__ */ new Date();
    let dateParams = [];
    if (dateRange === "today") {
      const today = now.toISOString().split("T")[0];
      dateFilter = "AND rs.submission_date = ?";
      dateParams = [today];
    } else if (dateRange === "this_week") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      dateFilter = "AND rs.submission_date BETWEEN ? AND ?";
      dateParams = [startOfWeek.toISOString().split("T")[0], endOfWeek.toISOString().split("T")[0]];
    } else if (dateRange === "this_month") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      dateFilter = "AND rs.submission_date BETWEEN ? AND ?";
      dateParams = [startOfMonth.toISOString().split("T")[0], endOfMonth.toISOString().split("T")[0]];
    } else if (dateRange === "custom" && startDate && endDate) {
      dateFilter = "AND rs.submission_date BETWEEN ? AND ?";
      dateParams = [startDate, endDate];
    }
    let query = `
      SELECT rs.*
      FROM recruiter_submissions rs
      WHERE rs.recruiter_user_id = ?
    `;
    const params = [recruiterUser.id];
    if (clientId) {
      query += " AND rs.client_id = ?";
      params.push(parseInt(clientId));
    }
    if (roleId) {
      query += " AND rs.role_id = ?";
      params.push(parseInt(roleId));
    }
    if (entryType) {
      query += " AND rs.entry_type = ?";
      params.push(entryType);
    }
    if (dateFilter) {
      query += ` ${dateFilter}`;
      params.push(...dateParams);
    }
    const submissions = await db.prepare(query).bind(...params).all();
    const results = submissions.results || [];
    const total_submissions = results.filter((s) => s.entry_type === "submission").length;
    const total_interviews = results.filter((s) => s.entry_type === "interview").length;
    const interview_1 = results.filter((s) => s.entry_type === "interview" && s.interview_level === 1).length;
    const interview_2 = results.filter((s) => s.entry_type === "interview" && s.interview_level === 2).length;
    const interview_3 = results.filter((s) => s.entry_type === "interview" && s.interview_level === 3).length;
    const total_deals = results.filter((s) => s.entry_type === "deal").length;
    const total_dropouts = results.filter((s) => s.entry_type === "dropout").length;
    const submissionPercents = results.filter((s) => s.entry_type === "submission" && typeof s.cv_match_percent === "number").map((s) => s.cv_match_percent);
    const cv_quality_average = submissionPercents.length > 0 ? submissionPercents.reduce((a, b) => a + b, 0) / submissionPercents.length : 0;
    let cv_quality_label = "Poor";
    if (cv_quality_average >= 95) cv_quality_label = "Excellent";
    else if (cv_quality_average >= 90) cv_quality_label = "Good";
    else if (cv_quality_average >= 85) cv_quality_label = "Okay";
    const activeRolesQuery = `
      SELECT COUNT(DISTINCT rs.role_id) as count
      FROM recruiter_submissions rs
      INNER JOIN am_roles r ON rs.role_id = r.id
      WHERE rs.recruiter_user_id = ? AND r.status = 'active'
    `;
    const activeRolesResult = await db.prepare(activeRolesQuery).bind(recruiterUser.id).first();
    const active_roles_count = activeRolesResult?.count || 0;
    const clientBreakdown = await db.prepare(`
        SELECT c.name as client_name, COUNT(*) as count
        FROM recruiter_submissions rs
        INNER JOIN clients c ON rs.client_id = c.id
        WHERE rs.recruiter_user_id = ? ${roleId ? "AND rs.role_id = ?" : ""} ${entryType ? "AND rs.entry_type = ?" : ""} ${dateFilter}
        GROUP BY c.id, c.name
        ORDER BY count DESC
      `).bind(...[
      recruiterUser.id,
      ...roleId ? [parseInt(roleId)] : [],
      ...entryType ? [entryType] : [],
      ...dateParams
    ].filter((p) => p !== void 0)).all();
    const teamBreakdown = await db.prepare(`
        SELECT t.name as team_name, COUNT(*) as count
        FROM recruiter_submissions rs
        INNER JOIN app_teams t ON rs.team_id = t.id
        WHERE rs.recruiter_user_id = ? ${clientId ? "AND rs.client_id = ?" : ""} ${roleId ? "AND rs.role_id = ?" : ""} ${entryType ? "AND rs.entry_type = ?" : ""} ${dateFilter}
        GROUP BY t.id, t.name
        ORDER BY count DESC
      `).bind(...[
      recruiterUser.id,
      ...clientId ? [parseInt(clientId)] : [],
      ...roleId ? [parseInt(roleId)] : [],
      ...entryType ? [entryType] : [],
      ...dateParams
    ].filter((p) => p !== void 0)).all();
    const dailyTrend = await db.prepare(`
        SELECT rs.submission_date as date, COUNT(*) as count
        FROM recruiter_submissions rs
        WHERE rs.recruiter_user_id = ? 
          ${clientId ? "AND rs.client_id = ?" : ""}
          ${roleId ? "AND rs.role_id = ?" : ""}
          ${entryType ? "AND rs.entry_type = ?" : ""}
          AND rs.submission_date >= date('now', '-30 days')
        GROUP BY rs.submission_date
        ORDER BY rs.submission_date DESC
        LIMIT 30
      `).bind(...[
      recruiterUser.id,
      ...clientId ? [parseInt(clientId)] : [],
      ...roleId ? [parseInt(roleId)] : [],
      ...entryType ? [entryType] : []
    ].filter((p) => p !== void 0)).all();
    const monthlyTrend = await db.prepare(`
        SELECT strftime('%Y-%m', rs.submission_date) as month, COUNT(*) as count
        FROM recruiter_submissions rs
        WHERE rs.recruiter_user_id = ? 
          ${clientId ? "AND rs.client_id = ?" : ""}
          ${roleId ? "AND rs.role_id = ?" : ""}
          ${entryType ? "AND rs.entry_type = ?" : ""}
          AND rs.submission_date >= date('now', '-12 months')
        GROUP BY month
        ORDER BY month DESC
        LIMIT 12
      `).bind(...[
      recruiterUser.id,
      ...clientId ? [parseInt(clientId)] : [],
      ...roleId ? [parseInt(roleId)] : [],
      ...entryType ? [entryType] : []
    ].filter((p) => p !== void 0)).all();
    return c.json({
      total_submissions,
      total_interviews,
      interview_1,
      interview_2,
      interview_3,
      total_deals,
      total_dropouts,
      active_roles_count,
      cv_quality_average,
      cv_quality_label,
      client_breakdown: clientBreakdown.results || [],
      team_breakdown: teamBreakdown.results || [],
      daily_trend: (dailyTrend.results || []).reverse(),
      monthly_trend: (monthlyTrend.results || []).reverse()
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return c.json({ error: "Failed to fetch analytics" }, 500);
  }
});
app$6.get("/api/recruiter/roles-list", recruiterOnly$1, async (c) => {
  const db = c.env.DB;
  const recruiterUser = c.get("recruiterUser");
  const isActive = c.req.query("is_active");
  const searchQuery = c.req.query("search");
  try {
    let query = `
      SELECT 
        r.*,
        c.name as client_name,
        t.name as team_name,
        u.name as account_manager_name,
        COUNT(DISTINCT CASE WHEN rs.entry_type = 'submission' THEN rs.id END) as total_submissions,
        COUNT(DISTINCT CASE WHEN rs.entry_type = 'interview' THEN rs.id END) as total_interviews,
        COUNT(DISTINCT CASE WHEN rs.entry_type = 'deal' THEN rs.id END) as total_deals,
        COUNT(DISTINCT CASE WHEN cra.is_discarded = 0 THEN cra.candidate_id END) as total_candidates,
        COUNT(DISTINCT CASE WHEN cra.is_discarded = 0 THEN cra.candidate_id END) as active_candidates,
        COUNT(DISTINCT CASE WHEN cra.is_discarded = 1 THEN cra.candidate_id END) as discarded_candidates,
        COUNT(DISTINCT CASE WHEN rs.entry_type = 'submission' AND cra.is_discarded = 0 THEN cra.candidate_id END) as in_play_submissions
      FROM am_roles r
      INNER JOIN clients c ON r.client_id = c.id
      INNER JOIN app_teams t ON r.team_id = t.id
      LEFT JOIN users u ON r.account_manager_id = u.id
      LEFT JOIN recruiter_submissions rs ON r.id = rs.role_id AND rs.recruiter_user_id = ?
      LEFT JOIN candidate_role_associations cra ON r.id = cra.role_id AND cra.recruiter_user_id = ?
      WHERE 1=1
    `;
    const params = [recruiterUser.id, recruiterUser.id];
    if (isActive !== void 0) {
      if (isActive === "1") {
        query += ` AND r.status = 'active'`;
      } else {
        query += ` AND r.status != 'active'`;
      }
    }
    if (searchQuery) {
      query += ` AND (r.title LIKE ? OR r.role_code LIKE ?)`;
      params.push(`%${searchQuery}%`, `%${searchQuery}%`);
    }
    query += ` GROUP BY r.id ORDER BY r.created_at DESC`;
    const { results } = await db.prepare(query).bind(...params).all();
    return c.json(results);
  } catch (error) {
    console.error("Error fetching roles list:", error);
    return c.json({ error: error.message }, 500);
  }
});
app$6.get("/api/recruiter/ebes-score", recruiterOnly$1, async (c) => {
  const db = c.env.DB;
  const recruiterUser = c.get("recruiterUser");
  const filter = c.req.query("filter") || "current_month";
  const startDate = c.req.query("start_date");
  const endDate = c.req.query("end_date");
  try {
    let dateFilter = "";
    const dateParams = [];
    const now = /* @__PURE__ */ new Date();
    if (filter === "current_month") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];
      dateFilter = " AND rs.submission_date BETWEEN ? AND ?";
      dateParams.push(startOfMonth, endOfMonth);
    } else if (filter === "last_month") {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const startOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1).toISOString().split("T")[0];
      const endOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0).toISOString().split("T")[0];
      dateFilter = " AND rs.submission_date BETWEEN ? AND ?";
      dateParams.push(startOfLastMonth, endOfLastMonth);
    } else if (filter === "current_quarter") {
      const q = Math.floor(now.getMonth() / 3);
      const startMonth = q * 3;
      const startOfQuarter = new Date(now.getFullYear(), startMonth, 1).toISOString().split("T")[0];
      const endOfQuarter = new Date(now.getFullYear(), startMonth + 3, 0).toISOString().split("T")[0];
      dateFilter = " AND rs.submission_date BETWEEN ? AND ?";
      dateParams.push(startOfQuarter, endOfQuarter);
    } else if (filter === "last_quarter") {
      const q = Math.floor(now.getMonth() / 3) - 1;
      const yearAdjust = q < 0 ? -1 : 0;
      const quarterIndex = q < 0 ? 3 : q;
      const startMonth = quarterIndex * 3;
      const startOfQuarter = new Date(now.getFullYear() + yearAdjust, startMonth, 1).toISOString().split("T")[0];
      const endOfQuarter = new Date(now.getFullYear() + yearAdjust, startMonth + 3, 0).toISOString().split("T")[0];
      dateFilter = " AND rs.submission_date BETWEEN ? AND ?";
      dateParams.push(startOfQuarter, endOfQuarter);
    } else if (filter === "custom" && startDate && endDate) {
      dateFilter = " AND rs.submission_date BETWEEN ? AND ?";
      dateParams.push(startDate, endDate);
    }
    const allSubmissionsQuery = `
      SELECT rs.*
      FROM recruiter_submissions rs
      WHERE rs.recruiter_user_id = ?${dateFilter}
    `;
    const allSubmissions = await db.prepare(allSubmissionsQuery).bind(recruiterUser.id, ...dateParams).all();
    const results = allSubmissions.results || [];
    let table1Points = 0;
    const submission6h = results.filter((s) => s.entry_type === "submission" && s.submission_type === "6h").length;
    const submission24h = results.filter((s) => s.entry_type === "submission" && s.submission_type === "24h").length;
    const submissionAfter24h = results.filter((s) => s.entry_type === "submission" && s.submission_type === "after_24h").length;
    table1Points += submission6h * 2;
    table1Points += submission24h * 1.5;
    table1Points += submissionAfter24h * 1;
    const interview1 = results.filter((s) => s.entry_type === "interview" && s.interview_level === 1).length;
    const interview2 = results.filter((s) => s.entry_type === "interview" && s.interview_level === 2).length;
    const interview3 = results.filter((s) => s.entry_type === "interview" && s.interview_level === 3).length;
    table1Points += interview1 * 3;
    table1Points += interview2 * 1.5;
    table1Points += interview3 * 0;
    const deals = results.filter((s) => s.entry_type === "deal").length;
    table1Points += deals * 7;
    const dropoutEntries = results.filter((s) => s.entry_type === "dropout");
    let acceptedDropoutsCount = 0;
    for (const dropout of dropoutEntries) {
      const dropoutRequest = await db.prepare("SELECT am_decision FROM dropout_requests WHERE role_id = ? AND recruiter_user_id = ? ORDER BY created_at DESC LIMIT 1").bind(dropout.role_id, recruiterUser.id).first();
      if (dropoutRequest?.am_decision === "accept") {
        acceptedDropoutsCount++;
      }
    }
    const discardedCandidatesQuery = `
      SELECT COUNT(DISTINCT candidate_id) as count
      FROM candidate_role_associations
      WHERE recruiter_user_id = ? AND is_discarded = 1 AND (is_lost_role = 0 OR is_lost_role IS NULL)
    `;
    const discardedCandidatesResult = await db.prepare(discardedCandidatesQuery).bind(recruiterUser.id).first();
    const discardedCandidatesCount = discardedCandidatesResult?.count || 0;
    const lostRoleCandidatesQuery = `
      SELECT COUNT(DISTINCT candidate_id) as count
      FROM candidate_role_associations
      WHERE recruiter_user_id = ? AND is_discarded = 1 AND is_lost_role = 1
    `;
    const lostRoleCandidatesResult = await db.prepare(lostRoleCandidatesQuery).bind(recruiterUser.id).first();
    const lostRoleCandidatesCount = lostRoleCandidatesResult?.count || 0;
    let table2Points = 0;
    const assignedRolesQuery = `
      SELECT COUNT(DISTINCT role_id) as count
      FROM role_recruiter_assignments
      WHERE recruiter_user_id = ?
    `;
    const assignedRolesResult = await db.prepare(assignedRolesQuery).bind(recruiterUser.id).first();
    const assignedRolesCount = assignedRolesResult?.count || 0;
    table2Points += assignedRolesCount * 3;
    const activelyWorkedQuery = `
      SELECT COUNT(DISTINCT rs.role_id) as count
      FROM recruiter_submissions rs
      WHERE rs.recruiter_user_id = ?${dateFilter}
        AND rs.role_id NOT IN (
          SELECT role_id 
          FROM role_recruiter_assignments 
          WHERE recruiter_user_id = ?
        )
    `;
    const activelyWorkedResult = await db.prepare(activelyWorkedQuery).bind(recruiterUser.id, ...dateParams, recruiterUser.id).first();
    const activelyWorkedCount = activelyWorkedResult?.count || 0;
    table2Points += activelyWorkedCount * 1;
    const ebesData = {
      submissions_6h: submission6h,
      submissions_24h: submission24h,
      submissions_after_24h: submissionAfter24h,
      interviews_level_1: interview1,
      interviews_level_2: interview2,
      deals,
      accepted_dropouts: acceptedDropoutsCount,
      discarded_candidates: discardedCandidatesCount,
      lost_role_candidates: lostRoleCandidatesCount,
      assigned_roles: assignedRolesCount,
      actively_worked_roles: activelyWorkedCount
    };
    const result = calculateRecruiterEBES(ebesData);
    const percents = results.filter((s) => s.entry_type === "submission" && typeof s.cv_match_percent === "number").map((s) => s.cv_match_percent);
    const cv_quality_average = percents.length > 0 ? percents.reduce((a, b) => a + b, 0) / percents.length : 0;
    let cv_quality_label = "Poor";
    if (cv_quality_average >= 95) cv_quality_label = "Excellent";
    else if (cv_quality_average >= 90) cv_quality_label = "Good";
    else if (cv_quality_average >= 85) cv_quality_label = "Okay";
    return c.json({
      score: result.score,
      performance_label: result.performance_label,
      cv_quality_average,
      cv_quality_label,
      breakdown: {
        table1: {
          total: result.table1_points,
          submission6h,
          submission24h,
          submissionAfter24h,
          interview_1: interview1,
          interview_2: interview2,
          deals,
          dropouts: dropoutEntries.length,
          accepted_dropouts: acceptedDropoutsCount,
          discarded_candidates: discardedCandidatesCount,
          lost_role_candidates: lostRoleCandidatesCount
        },
        table2: {
          total: result.table2_points,
          assigned_roles: assignedRolesCount,
          actively_worked_roles: activelyWorkedCount
        }
      }
    });
  } catch (error) {
    console.error("Error calculating EBES score:", error);
    return c.json({ error: "Failed to calculate EBES score" }, 500);
  }
});
const app$5 = new Hono2();
const recruiterOnly = async (c, next) => {
  const userId = c.req.header("x-user-id");
  if (!userId) {
    return c.json({ error: "Unauthorized - User ID required" }, 401);
  }
  const db = c.env.DB;
  const user = await db.prepare("SELECT * FROM users WHERE id = ? AND role = ? AND is_active = 1").bind(userId, "recruiter").first();
  if (!user) {
    return c.json({ error: "Unauthorized - Recruiter access required" }, 401);
  }
  c.set("user", user);
  await next();
};
app$5.use("*", recruiterOnly);
async function generateCandidateCode(db) {
  const counter = await db.prepare(
    "SELECT next_number FROM code_counters WHERE category = ?"
  ).bind("candidate").first();
  const nextNumber = counter?.next_number || 1;
  const code = `NL-${String(nextNumber).padStart(4, "0")}`;
  await db.prepare(
    "UPDATE code_counters SET next_number = next_number + 1 WHERE category = ?"
  ).bind("candidate").run();
  return code;
}
app$5.get("/candidates", async (c) => {
  try {
    const user = c.get("user");
    const db = c.env.DB;
    const isActive = c.req.query("is_active");
    const searchQuery = c.req.query("search");
    let query = `
      SELECT 
        c.*,
        COUNT(DISTINCT cra.id) as total_associations,
        COUNT(DISTINCT CASE WHEN cra.is_discarded = 0 THEN cra.id END) as active_associations,
        COUNT(DISTINCT CASE WHEN cra.is_discarded = 1 THEN cra.id END) as discarded_associations
      FROM candidates c
      LEFT JOIN candidate_role_associations cra ON c.id = cra.candidate_id AND cra.recruiter_user_id = ?
      WHERE c.created_by_user_id = ?
    `;
    const params = [user.id, user.id];
    if (isActive !== void 0) {
      query += ` AND c.is_active = ?`;
      params.push(isActive === "1" ? 1 : 0);
    }
    if (searchQuery) {
      query += ` AND c.name LIKE ?`;
      params.push(`%${searchQuery}%`);
    }
    query += ` GROUP BY c.id ORDER BY c.created_at DESC`;
    const { results } = await db.prepare(query).bind(...params).all();
    return c.json(results);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return c.json({ error: error.message }, 500);
  }
});
app$5.get("/candidates/:id", async (c) => {
  try {
    const user = c.get("user");
    const candidateId = c.req.param("id");
    const db = c.env.DB;
    const candidate = await db.prepare(`
      SELECT * FROM candidates 
      WHERE id = ? AND created_by_user_id = ?
    `).bind(candidateId, user.id).first();
    if (!candidate) {
      return c.json({ error: "Candidate not found" }, 404);
    }
    const { results: associations } = await db.prepare(`
      SELECT 
        cra.*,
        r.role_code,
        r.title as role_title,
        r.description as role_description,
        r.status as role_status,
        cl.name as client_name,
        cl.client_code,
        t.name as team_name,
        t.team_code,
        u.name as account_manager_name,
        rec.name as recruiter_name,
        rec.user_code as recruiter_code
      FROM candidate_role_associations cra
      INNER JOIN am_roles r ON cra.role_id = r.id
      INNER JOIN clients cl ON cra.client_id = cl.id
      INNER JOIN app_teams t ON cra.team_id = t.id
      LEFT JOIN users u ON r.account_manager_id = u.id
      LEFT JOIN users rec ON cra.recruiter_user_id = rec.id
      WHERE cra.candidate_id = ? AND cra.recruiter_user_id = ?
      ORDER BY cra.created_at DESC
    `).bind(candidateId, user.id).all();
    return c.json({
      candidate,
      associations
    });
  } catch (error) {
    console.error("Error fetching candidate:", error);
    return c.json({ error: error.message }, 500);
  }
});
app$5.post("/candidates", async (c) => {
  try {
    const user = c.get("user");
    const db = c.env.DB;
    const body = await c.req.json();
    const { name, email, phone, resume_url, notes } = body;
    if (!name) {
      return c.json({ error: "Candidate name is required" }, 400);
    }
    const candidateCode = await generateCandidateCode(db);
    const result = await db.prepare(`
      INSERT INTO candidates (candidate_code, name, email, phone, resume_url, notes, created_by_user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      candidateCode,
      name.trim(),
      email?.trim() || null,
      phone?.trim() || null,
      resume_url?.trim() || null,
      notes?.trim() || null,
      user.id
    ).run();
    const candidate = await db.prepare("SELECT * FROM candidates WHERE id = ?").bind(result.meta.last_row_id).first();
    return c.json(candidate, 201);
  } catch (error) {
    console.error("Error creating candidate:", error);
    return c.json({ error: error.message }, 500);
  }
});
app$5.put("/candidates/:id", async (c) => {
  try {
    const user = c.get("user");
    const candidateId = c.req.param("id");
    const db = c.env.DB;
    const body = await c.req.json();
    const candidate = await db.prepare(`
      SELECT * FROM candidates WHERE id = ? AND created_by_user_id = ?
    `).bind(candidateId, user.id).first();
    if (!candidate) {
      return c.json({ error: "Candidate not found" }, 404);
    }
    const { name, email, phone, resume_url, notes } = body;
    await db.prepare(`
      UPDATE candidates 
      SET name = ?, email = ?, phone = ?, resume_url = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      name?.trim() || candidate.name,
      email?.trim() || null,
      phone?.trim() || null,
      resume_url?.trim() || null,
      notes?.trim() || null,
      candidateId
    ).run();
    const updated = await db.prepare("SELECT * FROM candidates WHERE id = ?").bind(candidateId).first();
    return c.json(updated);
  } catch (error) {
    console.error("Error updating candidate:", error);
    return c.json({ error: error.message }, 500);
  }
});
app$5.post("/candidates/:id/discard", async (c) => {
  try {
    const user = c.get("user");
    const candidateId = c.req.param("id");
    const db = c.env.DB;
    const candidate = await db.prepare(`
      SELECT * FROM candidates WHERE id = ? AND created_by_user_id = ?
    `).bind(candidateId, user.id).first();
    if (!candidate) {
      return c.json({ error: "Candidate not found" }, 404);
    }
    await db.prepare(`
      UPDATE candidates 
      SET is_active = 0, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(candidateId).run();
    await db.prepare(`
      UPDATE candidate_role_associations 
      SET is_discarded = 1, 
          is_lost_role = 0,
          discarded_at = CURRENT_TIMESTAMP,
          discarded_reason = 'Candidate globally discarded',
          updated_at = CURRENT_TIMESTAMP
      WHERE candidate_id = ? AND recruiter_user_id = ? AND is_discarded = 0
    `).bind(candidateId, user.id).run();
    return c.json({ message: "Candidate discarded successfully" });
  } catch (error) {
    console.error("Error discarding candidate:", error);
    return c.json({ error: error.message }, 500);
  }
});
app$5.post("/candidates/:id/restore", async (c) => {
  try {
    const user = c.get("user");
    const candidateId = c.req.param("id");
    const db = c.env.DB;
    const candidate = await db.prepare(`
      SELECT * FROM candidates WHERE id = ? AND created_by_user_id = ?
    `).bind(candidateId, user.id).first();
    if (!candidate) {
      return c.json({ error: "Candidate not found" }, 404);
    }
    await db.prepare(`
      UPDATE candidates 
      SET is_active = 1, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(candidateId).run();
    await db.prepare(`
      UPDATE candidate_role_associations 
      SET is_discarded = 0, 
          discarded_at = NULL,
          discarded_reason = NULL,
          updated_at = CURRENT_TIMESTAMP
      WHERE candidate_id = ? 
        AND recruiter_user_id = ? 
        AND is_discarded = 1 
        AND discarded_reason = 'Candidate globally discarded'
    `).bind(candidateId, user.id).run();
    return c.json({ message: "Candidate restored successfully" });
  } catch (error) {
    console.error("Error restoring candidate:", error);
    return c.json({ error: error.message }, 500);
  }
});
app$5.get("/candidates/search/similar", async (c) => {
  try {
    const db = c.env.DB;
    const name = c.req.query("name");
    if (!name || name.trim().length < 3) {
      return c.json([]);
    }
    const { results } = await db.prepare(`
      SELECT 
        c.*,
        COUNT(DISTINCT cra.id) as total_associations,
        COUNT(DISTINCT CASE WHEN cra.is_discarded = 0 THEN cra.id END) as active_associations,
        COUNT(DISTINCT CASE WHEN cra.is_discarded = 1 THEN cra.id END) as discarded_associations
      FROM candidates c
      LEFT JOIN candidate_role_associations cra ON c.id = cra.candidate_id
      WHERE c.name LIKE ?
      GROUP BY c.id
      ORDER BY c.is_active DESC, c.name
      LIMIT 5
    `).bind(`%${name.trim()}%`).all();
    return c.json(results);
  } catch (error) {
    console.error("Error searching similar candidates:", error);
    return c.json({ error: error.message }, 500);
  }
});
app$5.post("/candidates/:id/associate", async (c) => {
  try {
    const user = c.get("user");
    const candidateId = c.req.param("id");
    const db = c.env.DB;
    const body = await c.req.json();
    const { role_id, client_id, team_id, submission_date, status } = body;
    if (!role_id || !client_id || !team_id || !submission_date) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    const candidate = await db.prepare(`
      SELECT * FROM candidates WHERE id = ? AND created_by_user_id = ?
    `).bind(candidateId, user.id).first();
    if (!candidate) {
      return c.json({ error: "Candidate not found" }, 404);
    }
    await db.prepare(`
      INSERT INTO candidate_role_associations 
      (candidate_id, role_id, recruiter_user_id, client_id, team_id, status, submission_date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      candidateId,
      role_id,
      user.id,
      client_id,
      team_id,
      status || "submitted",
      submission_date
    ).run();
    return c.json({ message: "Candidate associated with role successfully" });
  } catch (error) {
    console.error("Error associating candidate:", error);
    return c.json({ error: error.message }, 500);
  }
});
app$5.post("/candidates/:candidateId/roles/:roleId/discard", async (c) => {
  try {
    const user = c.get("user");
    const candidateId = c.req.param("candidateId");
    const roleId = c.req.param("roleId");
    const db = c.env.DB;
    const body = await c.req.json();
    const { reason } = body;
    await db.prepare(`
      UPDATE candidate_role_associations 
      SET is_discarded = 1, 
          discarded_at = CURRENT_TIMESTAMP,
          discarded_reason = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE candidate_id = ? 
        AND role_id = ? 
        AND recruiter_user_id = ?
    `).bind(reason || null, candidateId, roleId, user.id).run();
    return c.json({ message: "Candidate discarded from role successfully" });
  } catch (error) {
    console.error("Error discarding candidate from role:", error);
    return c.json({ error: error.message }, 500);
  }
});
const app$4 = new Hono2();
const rmOnly = async (c, next) => {
  const db = c.env.DB;
  try {
    const userId = c.req.header("x-user-id");
    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const rmUser = await db.prepare("SELECT * FROM users WHERE id = ? AND role = 'recruitment_manager' AND is_active = 1").bind(userId).first();
    if (!rmUser) {
      return c.json({ error: "Unauthorized - Recruitment Manager access required" }, 403);
    }
    c.set("rmUser", rmUser);
    await next();
  } catch (error) {
    return c.json({ error: "Unauthorized" }, 401);
  }
};
app$4.get("/api/rm/teams", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  try {
    const teams = await db.prepare(`
        SELECT t.* FROM app_teams t
        INNER JOIN team_assignments ta ON t.id = ta.team_id
        WHERE ta.user_id = ?
      `).bind(rmUser.id).all();
    return c.json(teams.results || []);
  } catch (error) {
    return c.json({ error: "Failed to fetch teams" }, 500);
  }
});
app$4.get("/api/rm/clients", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  try {
    const clients = await db.prepare(`
        SELECT c.* FROM clients c
        INNER JOIN client_assignments ca ON c.id = ca.client_id
        WHERE ca.user_id = ?
      `).bind(rmUser.id).all();
    return c.json(clients.results || []);
  } catch (error) {
    return c.json({ error: "Failed to fetch clients" }, 500);
  }
});
app$4.post("/api/rm/roles", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  const { client_id, team_ids, title: title2, description, account_manager_id } = await c.req.json();
  if (!client_id || !team_ids || team_ids.length === 0 || !title2 || !account_manager_id) {
    return c.json({ error: "Client, at least one team, title, and account manager are required" }, 400);
  }
  try {
    const clientAccess = await db.prepare("SELECT * FROM client_assignments WHERE user_id = ? AND client_id = ?").bind(rmUser.id, client_id).first();
    if (!clientAccess) {
      return c.json({ error: "You don't have access to this client" }, 403);
    }
    for (const team_id of team_ids) {
      const teamAccess = await db.prepare("SELECT * FROM team_assignments WHERE user_id = ? AND team_id = ?").bind(rmUser.id, team_id).first();
      if (!teamAccess) {
        return c.json({ error: `You don't have access to team ${team_id}` }, 403);
      }
    }
    const codeCounter = await db.prepare("SELECT next_number FROM code_counters WHERE category = 'role'").first();
    let nextNumber = 1;
    if (codeCounter) {
      nextNumber = codeCounter.next_number;
      await db.prepare("UPDATE code_counters SET next_number = next_number + 1 WHERE category = 'role'").run();
    } else {
      await db.prepare("INSERT INTO code_counters (category, next_number) VALUES ('role', 2)").run();
    }
    const roleCode = `ROL-${String(nextNumber).padStart(3, "0")}`;
    const result = await db.prepare(`
        INSERT INTO am_roles (
          role_code, client_id, team_id, account_manager_id, title, description, status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, 'active', datetime('now'))
      `).bind(roleCode, client_id, team_ids[0], account_manager_id, title2, description || null).run();
    const roleId = result.meta.last_row_id;
    for (const team_id of team_ids) {
      await db.prepare("INSERT INTO am_role_teams (role_id, team_id, created_at) VALUES (?, ?, datetime('now'))").bind(roleId, team_id).run();
    }
    await createNotification(db, {
      userId: account_manager_id,
      type: "system",
      title: "New Role Created",
      message: `Recruitment Manager ${rmUser.name} created role ${title2}`,
      relatedEntityType: "role",
      relatedEntityId: Number(roleId)
    });
    return c.json({ success: true, role_id: roleId, role_code: roleCode });
  } catch (error) {
    console.error("Error creating role:", error);
    return c.json({ error: "Failed to create role" }, 500);
  }
});
app$4.put("/api/rm/roles/:id", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  const roleId = c.req.param("id");
  const { client_id, team_ids, title: title2, description, account_manager_id } = await c.req.json();
  if (!client_id || !team_ids || team_ids.length === 0 || !title2 || !account_manager_id) {
    return c.json({ error: "Client, at least one team, title, and account manager are required" }, 400);
  }
  try {
    const role = await db.prepare("SELECT * FROM am_roles WHERE id = ?").bind(roleId).first();
    if (!role) {
      return c.json({ error: "Role not found" }, 404);
    }
    const clientAccess = await db.prepare("SELECT * FROM client_assignments WHERE user_id = ? AND client_id = ?").bind(rmUser.id, client_id).first();
    if (!clientAccess) {
      return c.json({ error: "You don't have access to this client" }, 403);
    }
    for (const team_id of team_ids) {
      const teamAccess = await db.prepare("SELECT * FROM team_assignments WHERE user_id = ? AND team_id = ?").bind(rmUser.id, team_id).first();
      if (!teamAccess) {
        return c.json({ error: `You don't have access to team ${team_id}` }, 403);
      }
    }
    await db.prepare(`
        UPDATE am_roles 
        SET client_id = ?, team_id = ?, account_manager_id = ?, title = ?, description = ?, updated_at = datetime('now')
        WHERE id = ?
      `).bind(client_id, team_ids[0], account_manager_id, title2, description || null, roleId).run();
    await db.prepare("DELETE FROM am_role_teams WHERE role_id = ?").bind(roleId).run();
    for (const team_id of team_ids) {
      await db.prepare("INSERT INTO am_role_teams (role_id, team_id, created_at) VALUES (?, ?, datetime('now'))").bind(roleId, team_id).run();
    }
    return c.json({ success: true });
  } catch (error) {
    console.error("Error updating role:", error);
    return c.json({ error: "Failed to update role" }, 500);
  }
});
app$4.get("/api/rm/roles/:id/teams", rmOnly, async (c) => {
  const db = c.env.DB;
  const roleId = c.req.param("id");
  try {
    const teams = await db.prepare(`
        SELECT t.* FROM app_teams t
        INNER JOIN am_role_teams art ON t.id = art.team_id
        WHERE art.role_id = ?
      `).bind(roleId).all();
    return c.json(teams.results || []);
  } catch (error) {
    console.error("Error fetching role teams:", error);
    return c.json({ error: "Failed to fetch role teams" }, 500);
  }
});
app$4.get("/api/rm/account-managers", rmOnly, async (c) => {
  const db = c.env.DB;
  try {
    const ams = await db.prepare(`
        SELECT DISTINCT u.* FROM users u
        WHERE u.role = 'account_manager' AND u.is_active = 1
      `).all();
    return c.json(ams.results || []);
  } catch (error) {
    return c.json({ error: "Failed to fetch account managers" }, 500);
  }
});
app$4.get("/api/rm/roles", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  const status = c.req.query("status");
  const clientId = c.req.query("client_id");
  const teamId = c.req.query("team_id");
  try {
    const teams = await db.prepare(`
        SELECT t.id FROM app_teams t
        INNER JOIN team_assignments ta ON t.id = ta.team_id
        WHERE ta.user_id = ?
      `).bind(rmUser.id).all();
    const teamIds = (teams.results || []).map((t) => t.id);
    const clients = await db.prepare(`
        SELECT c.id FROM clients c
        INNER JOIN client_assignments ca ON c.id = ca.client_id
        WHERE ca.user_id = ?
      `).bind(rmUser.id).all();
    const clientIds = (clients.results || []).map((c2) => c2.id);
    if (teamIds.length === 0 && clientIds.length === 0) {
      return c.json([]);
    }
    let query = `
      SELECT 
        r.*,
        c.name as client_name,
        c.client_code,
        t.name as team_name,
        t.team_code,
        u.name as account_manager_name,
        u.user_code as account_manager_code,
        (SELECT COUNT(DISTINCT cra.candidate_id) 
         FROM candidate_role_associations cra 
         WHERE cra.role_id = r.id AND cra.is_discarded = 0) as in_play_submissions,
        (SELECT COUNT(*) 
         FROM recruiter_submissions rs 
         WHERE rs.role_id = r.id AND rs.entry_type = 'interview') as total_interviews
      FROM am_roles r
      INNER JOIN clients c ON r.client_id = c.id
      INNER JOIN app_teams t ON r.team_id = t.id
      INNER JOIN users u ON r.account_manager_id = u.id
      WHERE 1=1
    `;
    const params = [];
    if (teamIds.length > 0 && clientIds.length > 0) {
      query += ` AND (r.team_id IN (${teamIds.join(",")}) OR r.client_id IN (${clientIds.join(",")}))`;
    } else if (teamIds.length > 0) {
      query += ` AND r.team_id IN (${teamIds.join(",")})`;
    } else if (clientIds.length > 0) {
      query += ` AND r.client_id IN (${clientIds.join(",")})`;
    }
    if (status === "active") {
      query += " AND r.status = 'active'";
    } else if (status === "non-active") {
      query += " AND r.status != 'active'";
    }
    if (clientId) {
      query += " AND r.client_id = ?";
      params.push(parseInt(clientId));
    }
    if (teamId) {
      query += " AND r.team_id = ?";
      params.push(parseInt(teamId));
    }
    query += " ORDER BY r.created_at DESC";
    const roles = await db.prepare(query).bind(...params).all();
    return c.json(roles.results || []);
  } catch (error) {
    console.error("Error fetching RM roles:", error);
    return c.json({ error: "Failed to fetch roles" }, 500);
  }
});
app$4.get("/api/rm/recruiters", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  try {
    const recruiters = await db.prepare(`
        SELECT DISTINCT u.*, t.id as team_id, t.name as team_name, t.team_code
        FROM users u
        INNER JOIN recruiter_team_assignments rta ON u.id = rta.recruiter_user_id
        INNER JOIN app_teams t ON rta.team_id = t.id
        INNER JOIN team_assignments ta ON t.id = ta.team_id
        WHERE ta.user_id = ? AND u.role = 'recruiter'
      `).bind(rmUser.id).all();
    return c.json(recruiters.results || []);
  } catch (error) {
    return c.json({ error: "Failed to fetch recruiters" }, 500);
  }
});
app$4.get("/api/rm/team-recruiters/:teamId", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  const teamId = c.req.param("teamId");
  try {
    const teamAssignment = await db.prepare("SELECT * FROM team_assignments WHERE user_id = ? AND team_id = ?").bind(rmUser.id, teamId).first();
    if (!teamAssignment) {
      return c.json({ error: "Team not assigned to this recruitment manager" }, 403);
    }
    const recruiters = await db.prepare(`
        SELECT u.id, u.name, u.email, u.user_code, rta.created_at as assigned_at
        FROM users u
        INNER JOIN recruiter_team_assignments rta ON u.id = rta.recruiter_user_id
        WHERE rta.team_id = ? AND u.role = 'recruiter' AND u.is_active = 1
        ORDER BY u.name
      `).bind(teamId).all();
    return c.json(recruiters.results || []);
  } catch (error) {
    return c.json({ error: "Failed to fetch team recruiters" }, 500);
  }
});
app$4.get("/api/rm/available-recruiters", rmOnly, async (c) => {
  const db = c.env.DB;
  const teamId = c.req.query("team_id");
  if (!teamId) {
    return c.json({ error: "Team ID required" }, 400);
  }
  try {
    const recruiters = await db.prepare(`
        SELECT u.id, u.name, u.email, u.user_code
        FROM users u
        WHERE u.role = 'recruiter' 
        AND u.is_active = 1
        AND u.id NOT IN (
          SELECT recruiter_user_id 
          FROM recruiter_team_assignments 
          WHERE team_id = ?
        )
        ORDER BY u.name
      `).bind(teamId).all();
    return c.json(recruiters.results || []);
  } catch (error) {
    return c.json({ error: "Failed to fetch available recruiters" }, 500);
  }
});
app$4.post("/api/rm/team-recruiters", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  const { team_id, recruiter_user_id } = await c.req.json();
  if (!team_id || !recruiter_user_id) {
    return c.json({ error: "Team ID and Recruiter ID required" }, 400);
  }
  try {
    const teamAssignment = await db.prepare("SELECT * FROM team_assignments WHERE user_id = ? AND team_id = ?").bind(rmUser.id, team_id).first();
    if (!teamAssignment) {
      return c.json({ error: "Team not assigned to this recruitment manager" }, 403);
    }
    const existing = await db.prepare("SELECT * FROM recruiter_team_assignments WHERE team_id = ? AND recruiter_user_id = ?").bind(team_id, recruiter_user_id).first();
    if (existing) {
      return c.json({ error: "Recruiter already assigned to this team" }, 400);
    }
    await db.prepare("INSERT INTO recruiter_team_assignments (team_id, recruiter_user_id, assigned_by_user_id, created_at) VALUES (?, ?, ?, datetime('now'))").bind(team_id, recruiter_user_id, rmUser.id).run();
    const rmClients = await db.prepare(`
        SELECT c.id FROM clients c
        INNER JOIN client_assignments ca ON c.id = ca.client_id
        WHERE ca.user_id = ?
      `).bind(rmUser.id).all();
    const clientCount = rmClients.results?.length || 0;
    if (clientCount === 1) {
      const clientId = (rmClients.results?.[0]).id;
      const existingClientAssignment = await db.prepare("SELECT * FROM recruiter_client_assignments WHERE recruiter_user_id = ? AND client_id = ? AND team_id = ?").bind(recruiter_user_id, clientId, team_id).first();
      if (!existingClientAssignment) {
        await db.prepare("INSERT INTO recruiter_client_assignments (recruiter_user_id, client_id, team_id, assigned_by_user_id, created_at) VALUES (?, ?, ?, ?, datetime('now'))").bind(recruiter_user_id, clientId, team_id, rmUser.id).run();
      }
    }
    return c.json({ success: true, auto_assigned_client: clientCount === 1 });
  } catch (error) {
    return c.json({ error: "Failed to add recruiter to team" }, 500);
  }
});
app$4.delete("/api/rm/team-recruiters/:teamId/:recruiterId", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  const teamId = c.req.param("teamId");
  const recruiterId = c.req.param("recruiterId");
  try {
    const teamAssignment = await db.prepare("SELECT * FROM team_assignments WHERE user_id = ? AND team_id = ?").bind(rmUser.id, teamId).first();
    if (!teamAssignment) {
      return c.json({ error: "Team not assigned to this recruitment manager" }, 403);
    }
    await db.prepare("DELETE FROM recruiter_team_assignments WHERE team_id = ? AND recruiter_user_id = ?").bind(teamId, recruiterId).run();
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to remove recruiter from team" }, 500);
  }
});
app$4.get("/api/rm/analytics", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  let startDate = c.req.query("start_date");
  let endDate = c.req.query("end_date");
  const teamId = c.req.query("team_id");
  const clientId = c.req.query("client_id");
  const recruiterId = c.req.query("recruiter_id");
  try {
    const teams = await db.prepare(`
        SELECT t.* FROM app_teams t
        INNER JOIN team_assignments ta ON t.id = ta.team_id
        WHERE ta.user_id = ?
      `).bind(rmUser.id).all();
    const teamIds = (teams.results || []).map((t) => t.id);
    if (teamIds.length === 0) {
      return c.json({
        total_teams: 0,
        total_recruiters: 0,
        total_active_roles: 0,
        total_non_active_roles: 0,
        total_interviews: 0,
        total_deals: 0,
        total_lost: 0,
        total_on_hold: 0,
        total_no_answer: 0,
        team_breakdown: [],
        recruiter_breakdown: []
      });
    }
    if (!startDate || !endDate) {
      const now = /* @__PURE__ */ new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];
      startDate = startOfMonth;
      endDate = endOfMonth;
    }
    let roleQuery = `
      SELECT 
        ar.id,
        ar.status,
        ar.team_id,
        ar.account_manager_id,
        ar.client_id,
        t.name as team_name,
        c.name as client_name
      FROM am_roles ar
      INNER JOIN app_teams t ON ar.team_id = t.id
      INNER JOIN clients c ON ar.client_id = c.id
      WHERE ar.team_id IN (${teamIds.join(",")})
    `;
    const roleParams = [];
    if (teamId) {
      roleQuery += " AND ar.team_id = ?";
      roleParams.push(teamId);
    }
    if (clientId) {
      roleQuery += " AND ar.client_id = ?";
      roleParams.push(clientId);
    }
    roleQuery += " AND ar.created_at BETWEEN ? AND ?";
    roleParams.push(startDate, endDate);
    const roles = await db.prepare(roleQuery).bind(...roleParams).all();
    let total_active_roles = 0;
    let total_non_active_roles = 0;
    let total_deals = 0;
    let total_lost = 0;
    let total_on_hold = 0;
    let total_no_answer = 0;
    for (const role of roles.results || []) {
      const r = role;
      if (r.status === "active") total_active_roles++;
      else total_non_active_roles++;
      if (r.status === "deal") total_deals++;
      if (r.status === "lost") total_lost++;
      if (r.status === "on_hold") total_on_hold++;
      if (r.status === "no_answer") total_no_answer++;
    }
    const roleIds = (roles.results || []).map((r) => r.id);
    let total_interviews = 0;
    if (roleIds.length > 0) {
      const interviews = await db.prepare(`
          SELECT SUM(interview_count) as total
          FROM am_role_interviews
          WHERE role_id IN (${roleIds.join(",")})
        `).first();
      total_interviews = interviews?.total || 0;
    }
    const teamBreakdown = [];
    for (const team of teams.results || []) {
      const t = team;
      const teamRoles = (roles.results || []).filter((r) => r.team_id === t.id);
      let active = 0, deals = 0, lost = 0, on_hold = 0, no_answer = 0;
      const teamRoleIds = teamRoles.map((r) => r.id);
      for (const r of teamRoles) {
        const role = r;
        if (role.status === "active") active++;
        if (role.status === "deal") deals++;
        if (role.status === "lost") lost++;
        if (role.status === "on_hold") on_hold++;
        if (role.status === "no_answer") no_answer++;
      }
      let interviews = 0;
      if (teamRoleIds.length > 0) {
        const teamInterviews = await db.prepare(`
            SELECT SUM(interview_count) as total
            FROM am_role_interviews
            WHERE role_id IN (${teamRoleIds.join(",")})
          `).first();
        interviews = teamInterviews?.total || 0;
      }
      teamBreakdown.push({
        team_id: t.id,
        team_name: t.name,
        team_code: t.team_code,
        total_roles: teamRoles.length,
        active_roles: active,
        interviews,
        deals,
        lost,
        on_hold,
        no_answer
      });
    }
    let recruiterQuery = `
      SELECT DISTINCT u.id, u.name, u.user_code
      FROM users u
      INNER JOIN recruiter_team_assignments rta ON u.id = rta.recruiter_user_id
      WHERE rta.team_id IN (${teamIds.join(",")}) AND u.role = 'recruiter'
    `;
    const recruiterParams = [];
    if (recruiterId) {
      recruiterQuery += " AND u.id = ?";
      recruiterParams.push(recruiterId);
    }
    const recruiters = await db.prepare(recruiterQuery).bind(...recruiterParams).all();
    const recruiterBreakdown = [];
    for (const recruiter of recruiters.results || []) {
      const r = recruiter;
      let submissionQuery = `
        SELECT 
          COUNT(*) as total_submissions,
          SUM(CASE WHEN entry_type = 'interview' THEN 1 ELSE 0 END) as interviews,
          SUM(CASE WHEN entry_type = 'deal' THEN 1 ELSE 0 END) as deals,
          SUM(CASE WHEN entry_type = 'dropout' THEN 1 ELSE 0 END) as dropouts
        FROM recruiter_submissions
        WHERE recruiter_user_id = ? AND team_id IN (${teamIds.join(",")})
      `;
      const subParams = [r.id];
      if (teamId) {
        submissionQuery += " AND team_id = ?";
        subParams.push(teamId);
      }
      if (clientId) {
        submissionQuery += " AND client_id = ?";
        subParams.push(clientId);
      }
      submissionQuery += " AND submission_date BETWEEN ? AND ?";
      subParams.push(startDate, endDate);
      const stats = await db.prepare(submissionQuery).bind(...subParams).first();
      const s = stats;
      recruiterBreakdown.push({
        recruiter_id: r.id,
        recruiter_name: r.name,
        recruiter_code: r.user_code,
        total_submissions: s?.total_submissions || 0,
        interviews: s?.interviews || 0,
        deals: s?.deals || 0,
        lost_roles: s?.dropouts || 0
      });
    }
    return c.json({
      total_teams: teams.results?.length || 0,
      total_recruiters: recruiters.results?.length || 0,
      total_active_roles,
      total_non_active_roles,
      total_interviews,
      total_deals,
      total_lost,
      total_on_hold,
      total_no_answer,
      team_breakdown: teamBreakdown,
      recruiter_breakdown: recruiterBreakdown
    });
  } catch (error) {
    console.error("Error fetching RM analytics:", error);
    return c.json({ error: "Failed to fetch analytics" }, 500);
  }
});
app$4.post("/api/rm/roles/:id/recruiters", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  const roleId = c.req.param("id");
  const { recruiter_ids } = await c.req.json();
  if (!recruiter_ids || !Array.isArray(recruiter_ids)) {
    return c.json({ error: "Recruiter IDs array required" }, 400);
  }
  try {
    const role = await db.prepare("SELECT * FROM am_roles WHERE id = ?").bind(roleId).first();
    if (!role) {
      return c.json({ error: "Role not found" }, 404);
    }
    const teamAccess = await db.prepare("SELECT * FROM team_assignments WHERE user_id = ? AND team_id = ?").bind(rmUser.id, role.team_id).first();
    if (!teamAccess) {
      return c.json({ error: "You don't have access to this role's team" }, 403);
    }
    await db.prepare("DELETE FROM role_recruiter_assignments WHERE role_id = ?").bind(roleId).run();
    for (const recruiterId of recruiter_ids) {
      await db.prepare(`
          INSERT INTO role_recruiter_assignments 
          (role_id, recruiter_user_id, assigned_by_user_id, created_at) 
          VALUES (?, ?, ?, datetime('now'))
        `).bind(roleId, recruiterId, rmUser.id).run();
      await createNotification(db, {
        userId: recruiterId,
        type: "role_assignment",
        title: "New Role Assignment",
        message: `You have been assigned to role ${role.title}`,
        relatedEntityType: "role",
        relatedEntityId: Number(roleId)
      });
    }
    return c.json({ success: true });
  } catch (error) {
    console.error("Error assigning recruiters to role:", error);
    return c.json({ error: "Failed to assign recruiters" }, 500);
  }
});
app$4.get("/api/rm/roles/:id/assigned-recruiters", rmOnly, async (c) => {
  const db = c.env.DB;
  const roleId = c.req.param("id");
  try {
    const recruiters = await db.prepare(`
        SELECT u.id, u.name, u.user_code, rra.created_at as assigned_at
        FROM users u
        INNER JOIN role_recruiter_assignments rra ON u.id = rra.recruiter_user_id
        WHERE rra.role_id = ? AND u.role = 'recruiter' AND u.is_active = 1
        ORDER BY u.name
      `).bind(roleId).all();
    return c.json(recruiters.results || []);
  } catch (error) {
    console.error("Error fetching assigned recruiters:", error);
    return c.json({ error: "Failed to fetch assigned recruiters" }, 500);
  }
});
app$4.get("/api/rm/recruiter-assignments", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  try {
    const teams = await db.prepare(`
        SELECT t.id FROM app_teams t
        INNER JOIN team_assignments ta ON t.id = ta.team_id
        WHERE ta.user_id = ?
      `).bind(rmUser.id).all();
    const teamIds = (teams.results || []).map((t) => t.id);
    if (teamIds.length === 0) {
      return c.json([]);
    }
    const assignments = await db.prepare(`
        SELECT 
          rra.id,
          rra.role_id,
          rra.recruiter_user_id as recruiter_id,
          rra.created_at as assigned_at,
          r.role_code,
          r.title as role_title,
          u.name as recruiter_name,
          u.user_code as recruiter_code
        FROM role_recruiter_assignments rra
        INNER JOIN am_roles r ON rra.role_id = r.id
        INNER JOIN users u ON rra.recruiter_user_id = u.id
        WHERE r.team_id IN (${teamIds.join(",")}) AND r.status = 'active'
        ORDER BY rra.created_at DESC
      `).all();
    return c.json(assignments.results || []);
  } catch (error) {
    console.error("Error fetching recruiter assignments:", error);
    return c.json({ error: "Failed to fetch assignments" }, 500);
  }
});
app$4.post("/api/rm/assign-recruiter-to-role", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  const body = await c.req.json();
  const { role_id, recruiter_id } = body;
  if (!role_id || !recruiter_id) {
    return c.json({ error: "Role ID and Recruiter ID required" }, 400);
  }
  try {
    const role = await db.prepare("SELECT * FROM am_roles WHERE id = ? AND status = 'active'").bind(role_id).first();
    if (!role) {
      return c.json({ error: "Active role not found" }, 404);
    }
    const teamAccess = await db.prepare("SELECT * FROM team_assignments WHERE user_id = ? AND team_id = ?").bind(rmUser.id, role.team_id).first();
    if (!teamAccess) {
      return c.json({ error: "You don't have access to this role's team" }, 403);
    }
    const recruiter = await db.prepare("SELECT * FROM users WHERE id = ? AND role = 'recruiter' AND is_active = 1").bind(recruiter_id).first();
    if (!recruiter) {
      return c.json({ error: "Recruiter not found" }, 404);
    }
    const existing = await db.prepare("SELECT * FROM role_recruiter_assignments WHERE role_id = ? AND recruiter_user_id = ?").bind(role_id, recruiter_id).first();
    if (existing) {
      return c.json({ error: "This recruiter is already assigned to this role" }, 400);
    }
    await db.prepare(`
        INSERT INTO role_recruiter_assignments 
        (role_id, recruiter_user_id, assigned_by_user_id, created_at) 
        VALUES (?, ?, ?, datetime('now'))
      `).bind(role_id, recruiter_id, rmUser.id).run();
    return c.json({ success: true });
  } catch (error) {
    console.error("Error assigning recruiter to role:", error);
    return c.json({ error: "Failed to assign recruiter" }, 500);
  }
});
app$4.delete("/api/rm/recruiter-assignments/:id", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  const assignmentId = c.req.param("id");
  try {
    const assignment = await db.prepare(`
        SELECT rra.*, r.team_id
        FROM role_recruiter_assignments rra
        INNER JOIN am_roles r ON rra.role_id = r.id
        WHERE rra.id = ?
      `).bind(assignmentId).first();
    if (!assignment) {
      return c.json({ error: "Assignment not found" }, 404);
    }
    const teamAccess = await db.prepare("SELECT * FROM team_assignments WHERE user_id = ? AND team_id = ?").bind(rmUser.id, assignment.team_id).first();
    if (!teamAccess) {
      return c.json({ error: "You don't have access to this assignment" }, 403);
    }
    await db.prepare("DELETE FROM role_recruiter_assignments WHERE id = ?").bind(assignmentId).run();
    return c.json({ success: true });
  } catch (error) {
    console.error("Error removing assignment:", error);
    return c.json({ error: "Failed to remove assignment" }, 500);
  }
});
app$4.post("/api/rm/ebes-history", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  const { ebes_score, ebes_label, total_roles, total_deals, total_interviews, total_dropouts } = await c.req.json();
  try {
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const existing = await db.prepare("SELECT * FROM rm_ebes_history WHERE rm_user_id = ? AND recorded_at = ?").bind(rmUser.id, today).first();
    if (existing) {
      await db.prepare(`
          UPDATE rm_ebes_history 
          SET ebes_score = ?, ebes_label = ?, total_roles = ?, total_deals = ?, 
              total_interviews = ?, total_dropouts = ?, updated_at = datetime('now')
          WHERE rm_user_id = ? AND recorded_at = ?
        `).bind(ebes_score, ebes_label, total_roles, total_deals, total_interviews, total_dropouts, rmUser.id, today).run();
    } else {
      await db.prepare(`
          INSERT INTO rm_ebes_history 
          (rm_user_id, ebes_score, ebes_label, total_roles, total_deals, total_interviews, total_dropouts, recorded_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(rmUser.id, ebes_score, ebes_label, total_roles, total_deals, total_interviews, total_dropouts, today).run();
    }
    return c.json({ success: true });
  } catch (error) {
    console.error("Error saving EBES history:", error);
    return c.json({ error: "Failed to save EBES history" }, 500);
  }
});
app$4.get("/api/rm/ebes-history", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  const days = parseInt(c.req.query("days") || "30");
  try {
    const history = await db.prepare(`
        SELECT * FROM rm_ebes_history 
        WHERE rm_user_id = ?
        ORDER BY recorded_at DESC
        LIMIT ?
      `).bind(rmUser.id, days).all();
    return c.json((history.results || []).reverse());
  } catch (error) {
    console.error("Error fetching EBES history:", error);
    return c.json({ error: "Failed to fetch EBES history" }, 500);
  }
});
app$4.get("/api/rm/dropout-requests", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  try {
    const requests = await db.prepare(`
        SELECT 
          dr.*,
          r.role_code,
          r.title as role_title,
          c.name as client_name,
          u_recruiter.name as recruiter_name,
          u_recruiter.user_code as recruiter_code,
          u_am.name as am_name
        FROM dropout_requests dr
        INNER JOIN am_roles r ON dr.role_id = r.id
        INNER JOIN clients c ON r.client_id = c.id
        INNER JOIN users u_recruiter ON dr.recruiter_user_id = u_recruiter.id
        INNER JOIN users u_am ON dr.am_user_id = u_am.id
        WHERE dr.rm_user_id = ? AND dr.rm_status = 'pending'
        ORDER BY dr.created_at DESC
      `).bind(rmUser.id).all();
    return c.json(requests.results || []);
  } catch (error) {
    console.error("Error fetching dropout requests:", error);
    return c.json({ error: "Failed to fetch dropout requests" }, 500);
  }
});
app$4.put("/api/rm/dropout-requests/:id/acknowledge", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  const requestId = c.req.param("id");
  const { rm_notes } = await c.req.json();
  try {
    const request = await db.prepare("SELECT * FROM dropout_requests WHERE id = ? AND rm_user_id = ?").bind(requestId, rmUser.id).first();
    if (!request) {
      return c.json({ error: "Dropout request not found" }, 404);
    }
    await db.prepare(`
        UPDATE dropout_requests 
        SET rm_status = 'acknowledged', 
            rm_notes = ?,
            rm_acknowledged_at = datetime('now'),
            updated_at = datetime('now')
        WHERE id = ?
      `).bind(rm_notes || "", requestId).run();
    const req = request;
    await createNotification(db, {
      userId: req.am_user_id,
      type: "dropout",
      title: "Dropout Requires Decision",
      message: `RM has acknowledged a dropout request. Please review and decide. RM Notes: ${rm_notes || "None"}`,
      relatedEntityType: "role",
      relatedEntityId: req.role_id
    });
    return c.json({ success: true });
  } catch (error) {
    console.error("Error acknowledging dropout:", error);
    return c.json({ error: "Failed to acknowledge dropout" }, 500);
  }
});
app$4.get("/api/rm/ebes-score", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  const startDate = c.req.query("start_date");
  const endDate = c.req.query("end_date");
  const filter = c.req.query("filter") || "custom";
  try {
    const teams = await db.prepare(`
        SELECT t.id FROM app_teams t
        INNER JOIN team_assignments ta ON t.id = ta.team_id
        WHERE ta.user_id = ?
      `).bind(rmUser.id).all();
    const teamIds = (teams.results || []).map((t) => t.id);
    if (teamIds.length === 0) {
      return c.json({
        score: 0,
        performance_label: "No Data"
      });
    }
    let dateFilter = "";
    const dateParams = [];
    const now = /* @__PURE__ */ new Date();
    if (filter === "current_month") {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];
      dateFilter = " AND rs.submission_date BETWEEN ? AND ?";
      dateParams.push(startOfMonth, endOfMonth);
    } else if (filter === "last_month") {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const startOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1).toISOString().split("T")[0];
      const endOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0).toISOString().split("T")[0];
      dateFilter = " AND rs.submission_date BETWEEN ? AND ?";
      dateParams.push(startOfLastMonth, endOfLastMonth);
    } else if (filter === "current_quarter") {
      const q = Math.floor(now.getMonth() / 3);
      const startMonth = q * 3;
      const startOfQuarter = new Date(now.getFullYear(), startMonth, 1).toISOString().split("T")[0];
      const endOfQuarter = new Date(now.getFullYear(), startMonth + 3, 0).toISOString().split("T")[0];
      dateFilter = " AND rs.submission_date BETWEEN ? AND ?";
      dateParams.push(startOfQuarter, endOfQuarter);
    } else if (filter === "last_quarter") {
      const q = Math.floor(now.getMonth() / 3) - 1;
      const yearAdjust = q < 0 ? -1 : 0;
      const quarterIndex = q < 0 ? 3 : q;
      const startMonth = quarterIndex * 3;
      const startOfQuarter = new Date(now.getFullYear() + yearAdjust, startMonth, 1).toISOString().split("T")[0];
      const endOfQuarter = new Date(now.getFullYear() + yearAdjust, startMonth + 3, 0).toISOString().split("T")[0];
      dateFilter = " AND rs.submission_date BETWEEN ? AND ?";
      dateParams.push(startOfQuarter, endOfQuarter);
    } else if (startDate && endDate) {
      dateFilter = " AND rs.submission_date BETWEEN ? AND ?";
      dateParams.push(startDate, endDate);
    }
    let submissionQuery = `
      SELECT 
        rs.*
      FROM recruiter_submissions rs
      WHERE rs.team_id IN (${teamIds.join(",")})${dateFilter}
    `;
    const params = [...dateParams];
    const submissions = await db.prepare(submissionQuery).bind(...params).all();
    let submissions_6h = 0;
    let submissions_24h = 0;
    let submissions_after_24h = 0;
    let totalInterviews = 0;
    let interview_1 = 0;
    let interview_2 = 0;
    let interview_3 = 0;
    let totalDeals = 0;
    let totalDropouts = 0;
    for (const sub of submissions.results || []) {
      const s = sub;
      if (s.submission_type === "6h") submissions_6h++;
      else if (s.submission_type === "24h") submissions_24h++;
      else if (s.submission_type === "after_24h") submissions_after_24h++;
      if (s.entry_type === "interview") {
        totalInterviews++;
        if (s.interview_level === 1) interview_1++;
        else if (s.interview_level === 2) interview_2++;
        else if (s.interview_level === 3) interview_3++;
      } else if (s.entry_type === "deal") {
        totalDeals++;
      } else if (s.entry_type === "dropout") {
        totalDropouts++;
      }
    }
    let roleQuery = `
      SELECT ar.id, ar.status
      FROM am_roles ar
      WHERE ar.team_id IN (${teamIds.join(",")})
    `;
    const roleParams = [];
    if (startDate && endDate) {
      roleQuery += " AND ar.created_at BETWEEN ? AND ?";
      roleParams.push(startDate, endDate);
    }
    const roles = await db.prepare(roleQuery).bind(...roleParams).all();
    let assignedRoles = roles.results?.length || 0;
    let activeRoles = 0;
    for (const role of roles.results || []) {
      const r = role;
      if (r.status === "active") activeRoles++;
    }
    const ebesData = {
      submissions_6h,
      submissions_24h,
      submissions_after_24h,
      interviews_level_1: interview_1,
      interviews_level_2: interview_2,
      interviews_level_3: interview_3,
      total_interviews: interview_1 + interview_2 + interview_3,
      total_deals: totalDeals,
      total_dropouts: totalDropouts,
      total_roles: assignedRoles,
      total_active_roles: activeRoles
    };
    const ebesResult = calculateRecruitmentManagerEBES(ebesData);
    const percents = (submissions.results || []).filter((s) => s.entry_type === "submission" && typeof s.cv_match_percent === "number").map((s) => s.cv_match_percent);
    const cv_quality_average = percents.length > 0 ? percents.reduce((a, b) => a + b, 0) / percents.length : 0;
    let cv_quality_label = "Poor";
    if (cv_quality_average >= 95) cv_quality_label = "Excellent";
    else if (cv_quality_average >= 90) cv_quality_label = "Good";
    else if (cv_quality_average >= 85) cv_quality_label = "Okay";
    let scoreBonus = 0;
    if (cv_quality_average >= 98) scoreBonus = 5;
    else if (cv_quality_average >= 95) scoreBonus = 4;
    else if (cv_quality_average >= 90) scoreBonus = 2;
    const adjustedScore = Math.min(100, Math.max(0, ebesResult.score + scoreBonus));
    let adjustedLabel = ebesResult.performance_label;
    if (adjustedScore >= 90) adjustedLabel = "Excellent";
    else if (adjustedScore >= 75) adjustedLabel = "Strong";
    else if (adjustedScore >= 60) adjustedLabel = "Average";
    return c.json({
      score: adjustedScore,
      performance_label: adjustedLabel,
      total_submissions: submissions.results?.length || 0,
      total_interviews: totalInterviews,
      total_deals: totalDeals,
      total_dropouts: totalDropouts,
      total_roles: assignedRoles,
      active_roles: activeRoles,
      cv_quality_average,
      cv_quality_label
    });
  } catch (error) {
    console.error("Error calculating EBES score:", error);
    return c.json({ error: "Failed to calculate EBES score" }, 500);
  }
});
app$4.get("/api/rm/analytics-comprehensive", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  const clientId = c.req.query("client_id");
  const teamIdParam = c.req.query("team_id");
  const startDate = c.req.query("start_date");
  const endDate = c.req.query("end_date");
  const submissionType = c.req.query("submission_type");
  const roleStatus = c.req.query("role_status");
  try {
    const teamsResult = await db.prepare(`
      SELECT t.* FROM app_teams t
      INNER JOIN team_assignments ta ON t.id = ta.team_id
      WHERE ta.user_id = ?
    `).bind(rmUser.id).all();
    const assignedTeams = teamsResult.results || [];
    const teamIds = assignedTeams.map((t) => t.id);
    if (teamIds.length === 0) {
      return c.json({
        overview: {
          total_teams: 0,
          total_recruiters: 0,
          total_active_roles: 0,
          total_non_active_roles: 0,
          total_deals: 0,
          total_interviews: 0,
          total_dropouts: 0,
          rm_ebes_score: 0,
          rm_ebes_label: "No Data"
        },
        teams: [],
        recruiters: [],
        clients: [],
        trends: [],
        comparison: { this_month: {}, last_month: {} }
      });
    }
    let submissionWhere = `rs.recruiter_user_id IN (
      SELECT recruiter_user_id FROM recruiter_team_assignments 
      WHERE team_id IN (${teamIds.join(",")})
    )`;
    const submissionParams = [];
    if (teamIdParam) {
      submissionWhere += ` AND rs.team_id = ?`;
      submissionParams.push(parseInt(teamIdParam));
    }
    if (startDate) {
      submissionWhere += ` AND DATE(rs.created_at) >= ?`;
      submissionParams.push(startDate);
    }
    if (endDate) {
      submissionWhere += ` AND DATE(rs.created_at) <= ?`;
      submissionParams.push(endDate);
    }
    if (submissionType) {
      submissionWhere += ` AND rs.entry_type = ?`;
      submissionParams.push(submissionType);
    }
    const submissions = await db.prepare(`
      SELECT rs.*
      FROM recruiter_submissions rs
      WHERE ${submissionWhere}
    `).bind(...submissionParams).all();
    const allSubmissions = submissions.results || [];
    let roleWhere = `ar.team_id IN (${teamIds.join(",")})`;
    const roleParams = [];
    if (clientId) {
      roleWhere += ` AND ar.client_id = ?`;
      roleParams.push(parseInt(clientId));
    }
    if (teamIdParam) {
      roleWhere += ` AND ar.team_id = ?`;
      roleParams.push(parseInt(teamIdParam));
    }
    if (roleStatus) {
      roleWhere += ` AND ar.status = ?`;
      roleParams.push(roleStatus);
    }
    if (startDate) {
      roleWhere += ` AND DATE(ar.created_at) >= ?`;
      roleParams.push(startDate);
    }
    if (endDate) {
      roleWhere += ` AND DATE(ar.created_at) <= ?`;
      roleParams.push(endDate);
    }
    const roles = await db.prepare(`
      SELECT ar.*, c.name as client_name, c.client_code, t.name as team_name, t.team_code
      FROM am_roles ar
      INNER JOIN clients c ON ar.client_id = c.id
      INNER JOIN app_teams t ON ar.team_id = t.id
      WHERE ${roleWhere}
    `).bind(...roleParams).all();
    const allRoles = roles.results || [];
    const totalActiveRoles = allRoles.filter((r) => r.status === "active").length;
    const totalNonActiveRoles = allRoles.filter((r) => r.status !== "active").length;
    const totalDeals = allSubmissions.filter((s) => s.entry_type === "deal").length;
    const totalInterviews = allSubmissions.filter((s) => s.entry_type === "interview").length;
    const totalDropouts = allSubmissions.filter((s) => s.entry_type === "dropout").length;
    const recruitersResult = await db.prepare(`
      SELECT DISTINCT u.id, u.name, u.user_code
      FROM users u
      INNER JOIN recruiter_team_assignments rta ON u.id = rta.recruiter_user_id
      WHERE rta.team_id IN (${teamIds.join(",")}) AND u.role = 'recruiter'
    `).all();
    const allRecruiters = recruitersResult.results || [];
    let rm_submissions_6h = 0;
    let rm_submissions_24h = 0;
    let rm_submissions_after_24h = 0;
    let rm_deals = 0;
    let rm_interview_1 = 0;
    let rm_interview_2 = 0;
    let rm_interview_3 = 0;
    for (const sub of allSubmissions) {
      const s = sub;
      if (s.submission_type === "6h") rm_submissions_6h++;
      else if (s.submission_type === "24h") rm_submissions_24h++;
      else if (s.submission_type === "after_24h") rm_submissions_after_24h++;
      if (s.entry_type === "deal") rm_deals++;
      if (s.entry_type === "interview") {
        if (s.interview_level === 1) rm_interview_1++;
        else if (s.interview_level === 2) rm_interview_2++;
        else if (s.interview_level === 3) rm_interview_3++;
      }
    }
    const rmEbesData = {
      submissions_6h: rm_submissions_6h,
      submissions_24h: rm_submissions_24h,
      submissions_after_24h: rm_submissions_after_24h,
      total_interviews: totalInterviews,
      interviews_level_1: rm_interview_1,
      interviews_level_2: rm_interview_2,
      interviews_level_3: rm_interview_3,
      total_deals: rm_deals,
      total_dropouts: totalDropouts,
      total_roles: allRoles.length,
      total_active_roles: totalActiveRoles
    };
    const rmEbesResult = calculateRecruitmentManagerEBES(rmEbesData);
    const rmEbesScore = rmEbesResult.score;
    let rmEbesLabel = "At Risk";
    if (rmEbesScore >= 90) rmEbesLabel = "Excellent";
    else if (rmEbesScore >= 75) rmEbesLabel = "Strong";
    else if (rmEbesScore >= 60) rmEbesLabel = "Average";
    const overviewSubmissionPercents = (allSubmissions || []).filter((s) => s.entry_type === "submission" && typeof s.cv_match_percent === "number").map((s) => s.cv_match_percent);
    const overview_cv_quality_average = overviewSubmissionPercents.length > 0 ? overviewSubmissionPercents.reduce((a, b) => a + b, 0) / overviewSubmissionPercents.length : 0;
    let overview_cv_quality_label = "Poor";
    if (overview_cv_quality_average >= 95) overview_cv_quality_label = "Excellent";
    else if (overview_cv_quality_average >= 90) overview_cv_quality_label = "Good";
    else if (overview_cv_quality_average >= 85) overview_cv_quality_label = "Okay";
    const overview = {
      total_teams: assignedTeams.length,
      total_recruiters: allRecruiters.length,
      total_active_roles: totalActiveRoles,
      total_non_active_roles: totalNonActiveRoles,
      total_deals: totalDeals,
      total_interviews: totalInterviews,
      interviews_level_1: rm_interview_1,
      interviews_level_2: rm_interview_2,
      interviews_level_3: rm_interview_3,
      total_dropouts: totalDropouts,
      rm_ebes_score: Math.min(100, Math.max(0, rmEbesScore)),
      rm_ebes_label: rmEbesLabel,
      rm_ebes_table1_points: rmEbesResult.table1_points,
      rm_ebes_table2_points: rmEbesResult.table2_points,
      cv_quality_average: overview_cv_quality_average,
      cv_quality_label: overview_cv_quality_label
    };
    const teamAnalytics = assignedTeams.map((team) => {
      const teamRoles = allRoles.filter((r) => r.team_id === team.id);
      const teamSubs = allSubmissions.filter((s) => {
        const subRole = allRoles.find((r) => r.id === s.role_id);
        return subRole && subRole.team_id === team.id;
      });
      const teamPercents = teamSubs.filter((s) => s.entry_type === "submission" && typeof s.cv_match_percent === "number").map((s) => s.cv_match_percent);
      const team_cv_quality_average = teamPercents.length > 0 ? teamPercents.reduce((a, b) => a + b, 0) / teamPercents.length : 0;
      let team_cv_quality_label = "Poor";
      if (team_cv_quality_average >= 95) team_cv_quality_label = "Excellent";
      else if (team_cv_quality_average >= 90) team_cv_quality_label = "Good";
      else if (team_cv_quality_average >= 85) team_cv_quality_label = "Okay";
      return {
        team_id: team.id,
        team_name: team.name,
        team_code: team.team_code,
        total_roles: teamRoles.length,
        active_roles: teamRoles.filter((r) => r.status === "active").length,
        non_active_roles: teamRoles.filter((r) => r.status !== "active").length,
        interviews_level_1: teamSubs.filter((s) => s.entry_type === "interview" && s.interview_level === 1).length,
        interviews_level_2: teamSubs.filter((s) => s.entry_type === "interview" && s.interview_level === 2).length,
        interviews_level_3: teamSubs.filter((s) => s.entry_type === "interview" && s.interview_level === 3).length,
        deals: teamSubs.filter((s) => s.entry_type === "deal").length,
        dropouts: teamSubs.filter((s) => s.entry_type === "dropout").length,
        cv_quality_average: team_cv_quality_average,
        cv_quality_label: team_cv_quality_label
      };
    });
    const recruiterAnalytics = await Promise.all(allRecruiters.map(async (recruiter) => {
      const recSubs = allSubmissions.filter((s) => s.recruiter_user_id === recruiter.id);
      const recRoles = allRoles.filter(
        (r) => recSubs.some((s) => s.role_id === r.id)
      );
      const submissions_6h = recSubs.filter((s) => s.submission_type === "6h").length;
      const submissions_24h = recSubs.filter((s) => s.submission_type === "24h").length;
      const submissions_after_24h = recSubs.filter((s) => s.submission_type === "after_24h").length;
      const interview_1 = recSubs.filter((s) => s.entry_type === "interview" && s.interview_level === 1).length;
      const interview_2 = recSubs.filter((s) => s.entry_type === "interview" && s.interview_level === 2).length;
      const deals = recSubs.filter((s) => s.entry_type === "deal").length;
      const dropouts = recSubs.filter((s) => s.entry_type === "dropout").length;
      let accepted_dropouts = 0;
      for (const dropout of recSubs.filter((s) => s.entry_type === "dropout")) {
        const dropoutRequest = await db.prepare("SELECT am_decision FROM dropout_requests WHERE role_id = ? AND recruiter_user_id = ? ORDER BY created_at DESC LIMIT 1").bind(dropout.role_id, recruiter.id).first();
        if (dropoutRequest?.am_decision === "accept") {
          accepted_dropouts++;
        }
      }
      let craWhere = `recruiter_user_id = ? AND is_discarded = 1`;
      const craParams = [recruiter.id];
      if (teamIdParam) {
        craWhere += ` AND team_id = ?`;
        craParams.push(parseInt(teamIdParam));
      }
      if (startDate) {
        craWhere += ` AND submission_date >= ?`;
        craParams.push(startDate);
      }
      if (endDate) {
        craWhere += ` AND submission_date <= ?`;
        craParams.push(endDate);
      }
      const discardedQuery = `
        SELECT COUNT(DISTINCT candidate_id) as count
        FROM candidate_role_associations
        WHERE ${craWhere} AND (is_lost_role = 0 OR is_lost_role IS NULL)
      `;
      const discardedRes = await db.prepare(discardedQuery).bind(...craParams).first();
      const discarded_candidates = discardedRes?.count || 0;
      const lostQuery = `
        SELECT COUNT(DISTINCT candidate_id) as count
        FROM candidate_role_associations
        WHERE ${craWhere} AND is_lost_role = 1
      `;
      const lostRes = await db.prepare(lostQuery).bind(...craParams).first();
      const lost_role_candidates = lostRes?.count || 0;
      const assignedRolesResult = await db.prepare("SELECT COUNT(DISTINCT role_id) as count FROM role_recruiter_assignments WHERE recruiter_user_id = ?").bind(recruiter.id).first();
      const assigned_roles = assignedRolesResult?.count || 0;
      const recEbesData = {
        submissions_6h,
        submissions_24h,
        submissions_after_24h,
        interviews_level_1: interview_1,
        interviews_level_2: interview_2,
        deals,
        accepted_dropouts,
        discarded_candidates,
        lost_role_candidates,
        assigned_roles,
        actively_worked_roles: recRoles.length
      };
      const recEbesResult = calculateRecruiterEBES(recEbesData);
      const recPercents = recSubs.filter((s) => s.entry_type === "submission" && typeof s.cv_match_percent === "number").map((s) => s.cv_match_percent);
      const recruiter_cv_quality_average = recPercents.length > 0 ? recPercents.reduce((a, b) => a + b, 0) / recPercents.length : 0;
      let recruiter_cv_quality_label = "Poor";
      if (recruiter_cv_quality_average >= 95) recruiter_cv_quality_label = "Excellent";
      else if (recruiter_cv_quality_average >= 90) recruiter_cv_quality_label = "Good";
      else if (recruiter_cv_quality_average >= 85) recruiter_cv_quality_label = "Okay";
      return {
        recruiter_id: recruiter.id,
        recruiter_name: recruiter.name,
        recruiter_code: recruiter.user_code,
        submissions: recSubs.filter((s) => s.entry_type === "submission").length,
        interviews: recSubs.filter((s) => s.entry_type === "interview").length,
        deals,
        dropouts,
        recruiter_ebes: recEbesResult.score,
        recruiter_ebes_label: recEbesResult.performance_label,
        cv_quality_average: recruiter_cv_quality_average,
        cv_quality_label: recruiter_cv_quality_label
      };
    }));
    const clientsResult = await db.prepare(`
      SELECT DISTINCT c.* FROM clients c
      INNER JOIN am_roles ar ON c.id = ar.client_id
      WHERE ar.team_id IN (${teamIds.join(",")})
    `).all();
    const clientAnalytics = (clientsResult.results || []).map((client) => {
      const clientRoles = allRoles.filter((r) => r.client_id === client.id);
      const clientSubs = allSubmissions.filter((s) => {
        const subRole = allRoles.find((r) => r.id === s.role_id);
        return subRole && subRole.client_id === client.id;
      });
      const interviews = clientSubs.filter((s) => s.entry_type === "interview").length;
      const deals = clientSubs.filter((s) => s.entry_type === "deal").length;
      const dropouts = clientSubs.filter((s) => s.entry_type === "dropout").length;
      const dropoutRate = clientRoles.length > 0 ? dropouts / clientRoles.length : 0;
      const conversionRate = interviews > 0 ? deals / interviews : 0;
      let health = "Average";
      if (dropoutRate > 0.3 || conversionRate < 0.2) health = "At Risk";
      else if (conversionRate > 0.5 && dropoutRate < 0.1) health = "Strong";
      const clientPercents = clientSubs.filter((s) => s.entry_type === "submission" && typeof s.cv_match_percent === "number").map((s) => s.cv_match_percent);
      const client_cv_quality_average = clientPercents.length > 0 ? clientPercents.reduce((a, b) => a + b, 0) / clientPercents.length : 0;
      let client_cv_quality_label = "Poor";
      if (client_cv_quality_average >= 95) client_cv_quality_label = "Excellent";
      else if (client_cv_quality_average >= 90) client_cv_quality_label = "Good";
      else if (client_cv_quality_average >= 85) client_cv_quality_label = "Okay";
      return {
        client_id: client.id,
        client_name: client.name,
        client_code: client.client_code,
        total_roles: clientRoles.length,
        interviews,
        deals,
        dropouts,
        health,
        cv_quality_average: client_cv_quality_average,
        cv_quality_label: client_cv_quality_label
      };
    });
    const trendsMap = /* @__PURE__ */ new Map();
    for (const sub of allSubmissions) {
      const s = sub;
      const date = s.created_at.split("T")[0];
      if (!trendsMap.has(date)) {
        trendsMap.set(date, { date, submissions: 0, interviews: 0, deals: 0, dropouts: 0 });
      }
      const trend = trendsMap.get(date);
      if (s.entry_type === "submission") trend.submissions++;
      else if (s.entry_type === "interview") trend.interviews++;
      else if (s.entry_type === "deal") trend.deals++;
      else if (s.entry_type === "dropout") trend.dropouts++;
    }
    const trends = Array.from(trendsMap.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, 30);
    const now = /* @__PURE__ */ new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split("T")[0];
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split("T")[0];
    const thisMonthSubs = allSubmissions.filter((s) => s.created_at >= thisMonthStart);
    const lastMonthSubs = allSubmissions.filter(
      (s) => s.created_at >= lastMonthStart && s.created_at <= lastMonthEnd
    );
    const comparison = {
      this_month: {
        submissions: thisMonthSubs.filter((s) => s.entry_type === "submission").length,
        interviews: thisMonthSubs.filter((s) => s.entry_type === "interview").length,
        deals: thisMonthSubs.filter((s) => s.entry_type === "deal").length,
        dropouts: thisMonthSubs.filter((s) => s.entry_type === "dropout").length
      },
      last_month: {
        submissions: lastMonthSubs.filter((s) => s.entry_type === "submission").length,
        interviews: lastMonthSubs.filter((s) => s.entry_type === "interview").length,
        deals: lastMonthSubs.filter((s) => s.entry_type === "deal").length,
        dropouts: lastMonthSubs.filter((s) => s.entry_type === "dropout").length
      }
    };
    let dropoutReasonWhere = `ar.team_id IN (${teamIds.join(",")})`;
    const dropoutReasonParams = [];
    if (clientId) {
      dropoutReasonWhere += ` AND ar.client_id = ?`;
      dropoutReasonParams.push(parseInt(clientId));
    }
    if (teamIdParam) {
      dropoutReasonWhere += ` AND ar.team_id = ?`;
      dropoutReasonParams.push(parseInt(teamIdParam));
    }
    if (startDate) {
      dropoutReasonWhere += ` AND DATE(dr.created_at) >= ?`;
      dropoutReasonParams.push(startDate);
    }
    if (endDate) {
      dropoutReasonWhere += ` AND DATE(dr.created_at) <= ?`;
      dropoutReasonParams.push(endDate);
    }
    const dropoutReasonsRes = await db.prepare(
      `SELECT COALESCE(dropout_reason, 'Unspecified') as reason, COUNT(*) as count
       FROM dropout_requests dr
       INNER JOIN am_roles ar ON dr.role_id = ar.id
       WHERE ${dropoutReasonWhere}
       GROUP BY reason
       ORDER BY count DESC`
    ).bind(...dropoutReasonParams).all();
    const dropout_reasons = (dropoutReasonsRes.results || []).map((r) => ({
      reason: r.reason,
      count: r.count
    }));
    return c.json({
      overview,
      teams: teamAnalytics,
      recruiters: recruiterAnalytics,
      clients: clientAnalytics,
      trends,
      comparison,
      dropout_reasons
    });
  } catch (error) {
    console.error("Error fetching comprehensive analytics:", error);
    return c.json({ error: "Failed to fetch analytics" }, 500);
  }
});
app$4.get("/api/rm/team-analytics/:teamId", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  const teamId = c.req.param("teamId");
  const startDate = c.req.query("start_date");
  const endDate = c.req.query("end_date");
  try {
    const teamAssignment = await db.prepare("SELECT * FROM team_assignments WHERE user_id = ? AND team_id = ?").bind(rmUser.id, teamId).first();
    if (!teamAssignment) {
      return c.json({ error: "Team not assigned to this recruitment manager" }, 404);
    }
    const team = await db.prepare("SELECT * FROM app_teams WHERE id = ?").bind(teamId).first();
    const recruiters = await db.prepare(`
        SELECT u.* FROM users u
        INNER JOIN recruiter_team_assignments rta ON u.id = rta.recruiter_user_id
        WHERE rta.team_id = ? AND u.role = 'recruiter'
      `).bind(teamId).all();
    let submissionQuery = `
      SELECT 
        rs.recruiter_user_id,
        u.name as recruiter_name,
        u.user_code as recruiter_code,
        COUNT(*) as total_submissions,
        SUM(CASE WHEN rs.submission_type = '6h' THEN 1 ELSE 0 END) as submission_6h,
        SUM(CASE WHEN rs.submission_type = '24h' THEN 1 ELSE 0 END) as submission_24h,
        SUM(CASE WHEN rs.submission_type = 'after_24h' THEN 1 ELSE 0 END) as submission_after_24h
      FROM recruiter_submissions rs
      INNER JOIN users u ON rs.recruiter_user_id = u.id
      WHERE rs.team_id = ?
    `;
    const params = [teamId];
    if (startDate && endDate) {
      submissionQuery += " AND rs.submission_date BETWEEN ? AND ?";
      params.push(startDate, endDate);
    }
    submissionQuery += " GROUP BY rs.recruiter_user_id, u.name, u.user_code";
    const submissionStats = await db.prepare(submissionQuery).bind(...params).all();
    const teamStats = {
      total_recruiters: recruiters.results?.length || 0,
      total_submissions: 0,
      submission_6h: 0,
      submission_24h: 0,
      submission_after_24h: 0
    };
    for (const stat of submissionStats.results || []) {
      const data = stat;
      teamStats.total_submissions += data.total_submissions;
      teamStats.submission_6h += data.submission_6h;
      teamStats.submission_24h += data.submission_24h;
      teamStats.submission_after_24h += data.submission_after_24h;
    }
    return c.json({
      team,
      team_stats: teamStats,
      recruiter_stats: submissionStats.results || []
    });
  } catch (error) {
    console.error("Error fetching team analytics:", error);
    return c.json({ error: "Failed to fetch team analytics" }, 500);
  }
});
app$4.get("/api/rm/performance-summary", rmOnly, async (c) => {
  const db = c.env.DB;
  const rmUser = c.get("rmUser");
  const startDate = c.req.query("start_date");
  const endDate = c.req.query("end_date");
  try {
    const teams = await db.prepare(`
        SELECT t.id, t.name, t.team_code FROM app_teams t
        INNER JOIN team_assignments ta ON t.id = ta.team_id
        WHERE ta.user_id = ?
      `).bind(rmUser.id).all();
    const teamIds = (teams.results || []).map((t) => t.id);
    if (teamIds.length === 0) {
      return c.json({
        total_submissions: 0,
        total_recruiters: 0,
        teams: []
      });
    }
    let submissionQuery = `
      SELECT COUNT(*) as total
      FROM recruiter_submissions
      WHERE recruitment_manager_id = ?
    `;
    const params = [rmUser.id];
    if (startDate && endDate) {
      submissionQuery += " AND submission_date BETWEEN ? AND ?";
      params.push(startDate, endDate);
    }
    const totalSubmissions = await db.prepare(submissionQuery).bind(...params).first();
    const totalRecruiters = await db.prepare(`
        SELECT COUNT(DISTINCT recruiter_user_id) as total
        FROM recruiter_team_assignments
        WHERE team_id IN (${teamIds.join(",")})
      `).all();
    return c.json({
      total_submissions: totalSubmissions?.total || 0,
      total_recruiters: totalRecruiters.results?.[0]?.total || 0,
      teams: teams.results || []
    });
  } catch (error) {
    console.error("Error fetching performance summary:", error);
    return c.json({ error: "Failed to fetch performance summary" }, 500);
  }
});
const app$3 = new Hono2();
const authOnly = async (c, next) => {
  const db = c.env.DB;
  const userId = c.req.header("x-user-id");
  if (!userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  const user = await db.prepare("SELECT * FROM users WHERE id = ? AND is_active = 1").bind(userId).first();
  if (!user) {
    return c.json({ error: "Unauthorized" }, 403);
  }
  c.set("user", user);
  await next();
};
const adminOnly = async (c, next) => {
  const db = c.env.DB;
  const userId = c.req.header("x-user-id");
  if (!userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  const user = await db.prepare("SELECT * FROM users WHERE id = ? AND role = 'admin' AND is_active = 1").bind(userId).first();
  if (!user) {
    return c.json({ error: "Unauthorized - Admin only" }, 403);
  }
  c.set("user", user);
  await next();
};
app$3.get("/api/company/filter-teams", authOnly, async (c) => {
  const db = c.env.DB;
  try {
    const teams = await db.prepare("SELECT id, name, team_code FROM app_teams WHERE is_active = 1 ORDER BY name").all();
    return c.json(teams.results || []);
  } catch (error) {
    console.error("Error fetching teams for filters:", error);
    return c.json({ error: "Failed to fetch teams" }, 500);
  }
});
app$3.get("/api/company/filter-clients", authOnly, async (c) => {
  const db = c.env.DB;
  try {
    const clients = await db.prepare("SELECT id, name, client_code FROM clients WHERE is_active = 1 ORDER BY name").all();
    return c.json(clients.results || []);
  } catch (error) {
    console.error("Error fetching clients for filters:", error);
    return c.json({ error: "Failed to fetch clients" }, 500);
  }
});
app$3.get("/api/company/settings", authOnly, async (c) => {
  const db = c.env.DB;
  try {
    const setting = await db.prepare("SELECT setting_value FROM app_settings WHERE setting_key = 'show_company_page'").first();
    return c.json({
      show_company_page: setting ? setting.setting_value === "true" : true
    });
  } catch (error) {
    console.error("Error fetching company settings:", error);
    return c.json({ error: "Failed to fetch settings" }, 500);
  }
});
app$3.put("/api/company/settings", adminOnly, async (c) => {
  const db = c.env.DB;
  const { show_company_page } = await c.req.json();
  try {
    await db.prepare("UPDATE app_settings SET setting_value = ?, updated_at = datetime('now') WHERE setting_key = 'show_company_page'").bind(show_company_page ? "true" : "false").run();
    return c.json({ success: true });
  } catch (error) {
    console.error("Error updating company settings:", error);
    return c.json({ error: "Failed to update settings" }, 500);
  }
});
app$3.get("/api/company/data", authOnly, async (c) => {
  const db = c.env.DB;
  const startDate = c.req.query("start_date");
  const endDate = c.req.query("end_date");
  const teamId = c.req.query("team_id");
  const clientId = c.req.query("client_id");
  try {
    const [
      totalTeams,
      totalClients,
      totalRecruiters,
      totalAMs,
      totalRMs
    ] = await Promise.all([
      db.prepare("SELECT COUNT(*) as count FROM app_teams WHERE is_active = 1").first(),
      db.prepare("SELECT COUNT(*) as count FROM clients WHERE is_active = 1").first(),
      db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'recruiter' AND is_active = 1").first(),
      db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'account_manager' AND is_active = 1").first(),
      db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'recruitment_manager' AND is_active = 1").first()
    ]);
    let rolesWhere = "1=1";
    const rolesParams = [];
    if (teamId) {
      rolesWhere += " AND team_id = ?";
      rolesParams.push(parseInt(teamId));
    }
    if (clientId) {
      rolesWhere += " AND client_id = ?";
      rolesParams.push(parseInt(clientId));
    }
    if (startDate && endDate) {
      rolesWhere += " AND created_at BETWEEN ? AND ?";
      rolesParams.push(startDate, endDate);
    }
    let submissionsWhere = "1=1";
    const submissionsParams = [];
    if (teamId) {
      submissionsWhere += " AND team_id = ?";
      submissionsParams.push(parseInt(teamId));
    }
    if (clientId) {
      submissionsWhere += " AND client_id = ?";
      submissionsParams.push(parseInt(clientId));
    }
    if (startDate && endDate) {
      submissionsWhere += " AND submission_date BETWEEN ? AND ?";
      submissionsParams.push(startDate, endDate);
    }
    const roles = await db.prepare(`SELECT status FROM am_roles WHERE ${rolesWhere}`).bind(...rolesParams).all();
    const totalActiveRoles = (roles.results || []).filter((r) => r.status === "active").length;
    const totalNonActiveRoles = (roles.results || []).filter((r) => r.status !== "active").length;
    const submissions = await db.prepare(`SELECT entry_type FROM recruiter_submissions WHERE ${submissionsWhere}`).bind(...submissionsParams).all();
    const totalSubmissions = (submissions.results || []).filter((s) => s.entry_type === "submission").length;
    const totalInterviews = (submissions.results || []).filter((s) => s.entry_type === "interview").length;
    const totalDeals = (submissions.results || []).filter((s) => s.entry_type === "deal").length;
    const totalDropouts = (submissions.results || []).filter((s) => s.entry_type === "dropout").length;
    const topRecruiters = await db.prepare(`
        SELECT 
          u.name,
          u.user_code,
          COUNT(CASE WHEN rs.entry_type = 'deal' THEN 1 END) as deals,
          COUNT(CASE WHEN rs.entry_type = 'submission' THEN 1 END) as submissions
        FROM users u
        LEFT JOIN recruiter_submissions rs ON u.id = rs.recruiter_user_id
          ${startDate && endDate ? `AND rs.submission_date BETWEEN '${startDate}' AND '${endDate}'` : ""}
          ${teamId ? `AND rs.team_id = ${teamId}` : ""}
          ${clientId ? `AND rs.client_id = ${clientId}` : ""}
        WHERE u.role = 'recruiter' AND u.is_active = 1
        GROUP BY u.id, u.name, u.user_code
        ORDER BY deals DESC, submissions DESC
        LIMIT 5
      `).all();
    const topAMs = await db.prepare(`
        SELECT 
          u.name,
          u.user_code,
          COUNT(DISTINCT r.id) as total_roles,
          COUNT(DISTINCT CASE WHEN r.status = 'active' THEN r.id END) as active_roles
        FROM users u
        LEFT JOIN am_roles r ON u.id = r.account_manager_id
          ${teamId ? `AND r.team_id = ${teamId}` : ""}
          ${clientId ? `AND r.client_id = ${clientId}` : ""}
        WHERE u.role = 'account_manager' AND u.is_active = 1
        GROUP BY u.id, u.name, u.user_code
        ORDER BY active_roles DESC, total_roles DESC
        LIMIT 5
      `).all();
    const topRMs = await db.prepare(`
        SELECT 
          u.name,
          u.user_code,
          COUNT(DISTINCT ta.team_id) as teams_managed
        FROM users u
        LEFT JOIN team_assignments ta ON u.id = ta.user_id
        WHERE u.role = 'recruitment_manager' AND u.is_active = 1
        GROUP BY u.id, u.name, u.user_code
        ORDER BY teams_managed DESC
        LIMIT 5
      `).all();
    return c.json({
      overview: {
        total_teams: totalTeams?.count || 0,
        total_clients: totalClients?.count || 0,
        total_recruiters: totalRecruiters?.count || 0,
        total_account_managers: totalAMs?.count || 0,
        total_recruitment_managers: totalRMs?.count || 0,
        total_active_roles: totalActiveRoles,
        total_non_active_roles: totalNonActiveRoles,
        total_interviews: totalInterviews,
        total_deals: totalDeals,
        total_submissions: totalSubmissions,
        total_dropouts: totalDropouts
      },
      topPerformers: {
        recruiters: (topRecruiters.results || []).map((r) => {
          const rawScore = r.deals * 10 + r.submissions;
          return {
            name: r.name,
            user_code: r.user_code,
            deals: r.deals,
            submissions: r.submissions,
            score: Math.min(100, rawScore)
            // Cap at 100
          };
        }),
        account_managers: (topAMs.results || []).map((a) => {
          const rawScore = a.active_roles * 10 + a.total_roles;
          return {
            name: a.name,
            user_code: a.user_code,
            active_roles: a.active_roles,
            total_roles: a.total_roles,
            score: Math.min(100, rawScore)
            // Cap at 100
          };
        }),
        recruitment_managers: (topRMs.results || []).map((r) => {
          const rawScore = r.teams_managed * 10;
          return {
            name: r.name,
            user_code: r.user_code,
            teams_managed: r.teams_managed,
            score: Math.min(100, rawScore)
            // Cap at 100
          };
        })
      }
    });
  } catch (error) {
    console.error("Error fetching company data:", error);
    return c.json({ error: "Failed to fetch company data" }, 500);
  }
});
app$3.get("/api/company/overview", authOnly, async (c) => {
  const db = c.env.DB;
  const startDate = c.req.query("start_date");
  const endDate = c.req.query("end_date");
  const teamId = c.req.query("team_id");
  const clientId = c.req.query("client_id");
  try {
    const [
      totalTeams,
      totalClients,
      totalRecruiters,
      totalAMs,
      totalRMs
    ] = await Promise.all([
      db.prepare("SELECT COUNT(*) as count FROM app_teams WHERE is_active = 1").first(),
      db.prepare("SELECT COUNT(*) as count FROM clients WHERE is_active = 1").first(),
      db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'recruiter' AND is_active = 1").first(),
      db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'account_manager' AND is_active = 1").first(),
      db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'recruitment_manager' AND is_active = 1").first()
    ]);
    let rolesWhere = "1=1";
    const rolesParams = [];
    if (teamId) {
      rolesWhere += " AND team_id = ?";
      rolesParams.push(parseInt(teamId));
    }
    if (clientId) {
      rolesWhere += " AND client_id = ?";
      rolesParams.push(parseInt(clientId));
    }
    if (startDate && endDate) {
      rolesWhere += " AND created_at BETWEEN ? AND ?";
      rolesParams.push(startDate, endDate);
    }
    const roles = await db.prepare(`SELECT status FROM am_roles WHERE ${rolesWhere}`).bind(...rolesParams).all();
    const totalActiveRoles = (roles.results || []).filter((r) => r.status === "active").length;
    const totalNonActiveRoles = (roles.results || []).filter((r) => r.status !== "active").length;
    let submissionsWhere = "1=1";
    const submissionsParams = [];
    if (teamId) {
      submissionsWhere += " AND team_id = ?";
      submissionsParams.push(parseInt(teamId));
    }
    if (clientId) {
      submissionsWhere += " AND client_id = ?";
      submissionsParams.push(parseInt(clientId));
    }
    if (startDate && endDate) {
      submissionsWhere += " AND submission_date BETWEEN ? AND ?";
      submissionsParams.push(startDate, endDate);
    }
    const submissions = await db.prepare(`SELECT entry_type FROM recruiter_submissions WHERE ${submissionsWhere}`).bind(...submissionsParams).all();
    const totalSubmissions = (submissions.results || []).filter((s) => s.entry_type === "submission").length;
    const totalInterviews = (submissions.results || []).filter((s) => s.entry_type === "interview").length;
    const totalDeals = (submissions.results || []).filter((s) => s.entry_type === "deal").length;
    const totalDropouts = (submissions.results || []).filter((s) => s.entry_type === "dropout").length;
    return c.json({
      total_teams: totalTeams?.count || 0,
      total_clients: totalClients?.count || 0,
      total_recruiters: totalRecruiters?.count || 0,
      total_account_managers: totalAMs?.count || 0,
      total_recruitment_managers: totalRMs?.count || 0,
      total_active_roles: totalActiveRoles,
      total_non_active_roles: totalNonActiveRoles,
      total_interviews: totalInterviews,
      total_deals: totalDeals,
      total_submissions: totalSubmissions,
      total_dropouts: totalDropouts
    });
  } catch (error) {
    console.error("Error fetching company overview:", error);
    return c.json({ error: "Failed to fetch overview" }, 500);
  }
});
app$3.get("/api/company/leaderboards", authOnly, async (c) => {
  return c.json({
    recruiters: [],
    account_managers: [],
    recruitment_managers: []
  });
});
app$3.get("/api/company/teams", authOnly, async (c) => {
  return c.json([]);
});
app$3.get("/api/company/clients", authOnly, async (c) => {
  return c.json([]);
});
const app$2 = new Hono2();
app$2.use("/api/super-admin/*", async (c, next) => {
  const userId = c.req.header("x-user-id");
  if (!userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  const db = c.env.DB;
  const user = await db.prepare("SELECT * FROM users WHERE id = ?").bind(userId).first();
  if (!user || user.email !== "ebes@gmail.com") {
    return c.json({ error: "Forbidden: Super admin access only" }, 403);
  }
  await next();
});
app$2.get("/api/super-admin/dashboard-stats", async (c) => {
  const db = c.env.DB;
  const stats = await db.prepare(`
    SELECT
      COUNT(CASE WHEN is_active = 1 THEN 1 END) as active_companies,
      COUNT(*) as total_companies
    FROM companies
  `).first();
  const userStats = await db.prepare(`
    SELECT
      COUNT(*) as total_users,
      COUNT(CASE WHEN role = 'admin' THEN 1 END) as admin_count,
      COUNT(CASE WHEN role = 'account_manager' THEN 1 END) as am_count,
      COUNT(CASE WHEN role = 'recruitment_manager' THEN 1 END) as rm_count,
      COUNT(CASE WHEN role = 'recruiter' THEN 1 END) as recruiter_count
    FROM users
  `).first();
  return c.json({
    active_companies: stats?.active_companies || 0,
    total_companies: stats?.total_companies || 0,
    admin_count: userStats?.admin_count || 0,
    recruiter_count: userStats?.recruiter_count || 0,
    am_count: userStats?.am_count || 0,
    rm_count: userStats?.rm_count || 0,
    total_users: userStats?.total_users || 0
  });
});
app$2.get("/api/super-admin/companies", async (c) => {
  const db = c.env.DB;
  const companies = await db.prepare(`
    SELECT 
      c.*,
      0 as admin_count,
      0 as total_users
    FROM companies c
    ORDER BY c.created_at DESC
  `).all();
  return c.json(companies.results || []);
});
app$2.post("/api/super-admin/companies", async (c) => {
  const db = c.env.DB;
  const body = await c.req.json();
  const { name, company_code, logo_url } = body;
  if (!name || !company_code) {
    return c.json({ error: "Name and company code are required" }, 400);
  }
  try {
    const result = await db.prepare(`
      INSERT INTO companies (name, company_code, logo_url, is_active, created_at, updated_at)
      VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `).bind(name, company_code, logo_url || null).run();
    return c.json({ success: true, id: result.meta.last_row_id });
  } catch (error) {
    console.error("Failed to create company:", error);
    return c.json({ error: "Failed to create company" }, 500);
  }
});
app$2.put("/api/super-admin/companies/:id", async (c) => {
  const db = c.env.DB;
  const companyId = c.req.param("id");
  const body = await c.req.json();
  const { name, company_code, logo_url, is_active } = body;
  try {
    await db.prepare(`
      UPDATE companies
      SET name = ?, company_code = ?, logo_url = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(name, company_code, logo_url || null, is_active, companyId).run();
    return c.json({ success: true });
  } catch (error) {
    console.error("Failed to update company:", error);
    return c.json({ error: "Failed to update company" }, 500);
  }
});
app$2.delete("/api/super-admin/companies/:id", async (c) => {
  const db = c.env.DB;
  const companyId = c.req.param("id");
  const userCount = await db.prepare(`
    SELECT COUNT(*) as count FROM users WHERE company_id = ?
  `).bind(companyId).first();
  if (userCount && userCount.count > 0) {
    return c.json({ error: "Cannot delete company with existing users" }, 400);
  }
  try {
    await db.prepare("DELETE FROM companies WHERE id = ?").bind(companyId).run();
    return c.json({ success: true });
  } catch (error) {
    console.error("Failed to delete company:", error);
    return c.json({ error: "Failed to delete company" }, 500);
  }
});
app$2.get("/api/super-admin/all-users", async (c) => {
  const db = c.env.DB;
  const users = await db.prepare(`
    SELECT 
      u.*,
      NULL as company_name,
      NULL as company_code
    FROM users u
    ORDER BY u.created_at DESC
  `).all();
  return c.json(users.results || []);
});
app$2.post("/api/super-admin/companies/:id/admin", async (c) => {
  const db = c.env.DB;
  const body = await c.req.json();
  const { name, email, password } = body;
  if (!name || !email || !password) {
    return c.json({ error: "Name, email, and password are required" }, 400);
  }
  const existingUser = await db.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
  if (existingUser) {
    return c.json({ error: "User with this email already exists" }, 400);
  }
  const userCodeResult = await db.prepare(`
    SELECT COALESCE(MAX(CAST(SUBSTR(user_code, 6) AS INTEGER)), 0) + 1 as next_code
    FROM users
    WHERE user_code LIKE 'ADMIN-%'
  `).first();
  const userCode = `ADMIN-${String(userCodeResult?.next_code || 1).padStart(3, "0")}`;
  try {
    const result = await db.prepare(`
      INSERT INTO users (name, email, password, role, user_code, is_active, created_at, updated_at, mocha_user_id)
      VALUES (?, ?, ?, 'admin', ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?)
    `).bind(name, email, password, userCode, `admin-${Date.now()}`).run();
    return c.json({ success: true, id: result.meta.last_row_id, user_code: userCode });
  } catch (error) {
    console.error("Failed to create admin:", error);
    return c.json({ error: "Failed to create admin" }, 500);
  }
});
const app$1 = new Hono2();
const authenticatedUser = async (c, next) => {
  const db = c.env.DB;
  const userId = c.req.header("x-user-id");
  if (!userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  const user = await db.prepare("SELECT * FROM users WHERE id = ? AND is_active = 1").bind(userId).first();
  if (!user) {
    return c.json({ error: "Unauthorized" }, 403);
  }
  c.set("currentUser", user);
  await next();
};
app$1.get("/api/employees/settings", authenticatedUser, async (c) => {
  const db = c.env.DB;
  try {
    const settings = await db.prepare(`
        SELECT setting_key, setting_value
        FROM app_settings
        WHERE setting_key IN (
          'show_employee_profiles',
          'show_recruiter_stats',
          'show_rm_stats',
          'show_am_stats',
          'show_client_stats',
          'show_team_stats'
        )
      `).all();
    const settingsMap = {
      show_employee_profiles: true,
      show_recruiter_stats: true,
      show_rm_stats: true,
      show_am_stats: true,
      show_client_stats: true,
      show_team_stats: true
    };
    for (const setting of settings.results || []) {
      const data = setting;
      const value = data.setting_value;
      settingsMap[data.setting_key] = value === "true" || value === "1" || value === 1 || value === true;
    }
    return c.json(settingsMap);
  } catch (error) {
    console.error("Error fetching employee settings:", error);
    return c.json({ error: "Failed to fetch settings" }, 500);
  }
});
app$1.get("/api/employees/profiles", authenticatedUser, async (c) => {
  const db = c.env.DB;
  const searchQuery = c.req.query("search");
  const roleFilter = c.req.query("role");
  try {
    const settingsResult = await db.prepare(`
        SELECT setting_key, setting_value
        FROM app_settings
        WHERE setting_key IN (
          'show_employee_profiles',
          'show_recruiter_stats',
          'show_rm_stats',
          'show_am_stats',
          'show_client_stats',
          'show_team_stats'
        )
      `).all();
    const settings = {
      show_employee_profiles: true,
      show_recruiter_stats: true,
      show_rm_stats: true,
      show_am_stats: true,
      show_client_stats: true,
      show_team_stats: true
    };
    for (const setting of settingsResult.results || []) {
      const data = setting;
      const value = data.setting_value;
      settings[data.setting_key] = value === "true" || value === "1" || value === 1 || value === true;
    }
    if (!settings.show_employee_profiles) {
      return c.json({ profiles: [], settings });
    }
    let query = "SELECT * FROM users WHERE role != 'admin' AND is_active = 1";
    const params = [];
    if (searchQuery) {
      query += " AND (name LIKE ? OR email LIKE ? OR user_code LIKE ?)";
      const searchTerm = `%${searchQuery}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    if (roleFilter && roleFilter !== "all") {
      query += " AND role = ?";
      params.push(roleFilter);
    }
    query += " ORDER BY role, name";
    const usersResult = await db.prepare(query).bind(...params).all();
    const users = usersResult.results || [];
    const profiles = [];
    for (const user of users) {
      const userData = user;
      const profile = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        user_code: userData.user_code,
        role: userData.role,
        created_at: userData.created_at
      };
      if (settings.show_team_stats) {
        const teamsResult = await db.prepare(`
            SELECT t.id, t.name, t.team_code
            FROM app_teams t
            INNER JOIN team_assignments ta ON t.id = ta.team_id
            WHERE ta.user_id = ?
          `).bind(userData.id).all();
        profile.teams = teamsResult.results || [];
      }
      if (settings.show_client_stats) {
        const clientsResult = await db.prepare(`
            SELECT c.id, c.name, c.client_code
            FROM clients c
            INNER JOIN client_assignments ca ON c.id = ca.client_id
            WHERE ca.user_id = ?
          `).bind(userData.id).all();
        profile.clients = clientsResult.results || [];
      }
      if (userData.role === "recruiter" && settings.show_recruiter_stats) {
        const submissionsResult = await db.prepare(`
            SELECT
              COUNT(CASE WHEN entry_type = 'submission' THEN 1 END) as total_submissions,
              COUNT(CASE WHEN entry_type = 'interview' THEN 1 END) as total_interviews,
              COUNT(CASE WHEN entry_type = 'deal' THEN 1 END) as total_deals,
              COUNT(CASE WHEN entry_type = 'dropout' THEN 1 END) as total_dropouts
            FROM recruiter_submissions
            WHERE recruiter_user_id = ?
          `).bind(userData.id).first();
        const stats = submissionsResult;
        profile.stats = {
          total_submissions: stats?.total_submissions || 0,
          total_interviews: stats?.total_interviews || 0,
          total_deals: stats?.total_deals || 0,
          total_dropouts: stats?.total_dropouts || 0
        };
        const dropoutsResult = await db.prepare(`
            SELECT COUNT(CASE WHEN entry_type = 'dropout' THEN 1 END) as total_dropouts
            FROM recruiter_submissions
            WHERE recruiter_user_id = ?
          `).bind(userData.id).first();
        const totalDropouts = dropoutsResult?.total_dropouts || 0;
        const lostRolesResult = await db.prepare(`
            SELECT COUNT(DISTINCT r.id) as count
            FROM am_roles r
            INNER JOIN recruiter_client_assignments rca ON r.client_id = rca.client_id
            WHERE rca.recruiter_user_id = ? AND r.status = 'lost'
          `).bind(userData.id).first();
        const lostRoles = lostRolesResult?.count || 0;
        const table1Points = (stats?.total_submissions || 0) * 1.5 + (stats?.total_interviews || 0) * 3 + (stats?.total_deals || 0) * 7 - (lostRoles + totalDropouts) * 3;
        const activeRolesResult = await db.prepare(`
            SELECT COUNT(DISTINCT r.id) as count
            FROM am_roles r
            INNER JOIN recruiter_client_assignments rca ON r.client_id = rca.client_id
            WHERE rca.recruiter_user_id = ? AND r.status = 'active'
          `).bind(userData.id).first();
        const activeRoles = activeRolesResult?.count || 0;
        const table2Points = activeRoles * 4;
        const ebesScore = table2Points > 0 ? table1Points / table2Points * 100 : 0;
        profile.stats.ebes_score = Math.min(100, Math.max(0, Math.round(ebesScore * 10) / 10));
        profile.stats.active_roles = activeRoles;
      } else if (userData.role === "recruitment_manager" && settings.show_rm_stats) {
        const teamsResult = await db.prepare(`
            SELECT COUNT(DISTINCT ta.team_id) as count
            FROM team_assignments ta
            WHERE ta.user_id = ?
          `).bind(userData.id).first();
        const managedTeams = teamsResult?.count || 0;
        const recruitersResult = await db.prepare(`
            SELECT COUNT(DISTINCT rta.recruiter_user_id) as count
            FROM recruiter_team_assignments rta
            INNER JOIN team_assignments ta ON rta.team_id = ta.team_id
            WHERE ta.user_id = ?
          `).bind(userData.id).first();
        const totalRecruiters = recruitersResult?.count || 0;
        const rolesResult = await db.prepare(`
            SELECT COUNT(*) as count
            FROM am_roles r
            INNER JOIN client_assignments ca ON r.client_id = ca.client_id
            WHERE ca.user_id = ?
          `).bind(userData.id).first();
        const totalRoles = rolesResult?.count || 0;
        const activeRolesResult = await db.prepare(`
            SELECT COUNT(*) as count
            FROM am_roles r
            INNER JOIN client_assignments ca ON r.client_id = ca.client_id
            WHERE ca.user_id = ? AND r.status = 'active'
          `).bind(userData.id).first();
        const activeRoles = activeRolesResult?.count || 0;
        const dealsResult = await db.prepare(`
            SELECT COUNT(*) as count
            FROM recruiter_submissions rs
            INNER JOIN recruiter_team_assignments rta ON rs.recruiter_user_id = rta.recruiter_user_id
            INNER JOIN team_assignments ta ON rta.team_id = ta.team_id
            WHERE ta.user_id = ? AND rs.entry_type = 'deal'
          `).bind(userData.id).first();
        const totalDeals = dealsResult?.count || 0;
        profile.stats = {
          managed_teams: managedTeams,
          total_recruiters: totalRecruiters,
          total_roles: totalRoles,
          active_roles: activeRoles,
          total_deals: totalDeals
        };
        const table1Points = totalDeals * 7 + activeRoles * 2;
        const table2Points = totalRecruiters * 5 + managedTeams * 3;
        const ebesScore = table2Points > 0 ? table1Points / table2Points * 100 : 0;
        profile.stats.ebes_score = Math.min(100, Math.max(0, Math.round(ebesScore * 10) / 10));
      } else if (userData.role === "account_manager" && settings.show_am_stats) {
        const rolesResult = await db.prepare(`
            SELECT
              COUNT(*) as total_roles,
              COUNT(CASE WHEN status = 'active' THEN 1 END) as active_roles,
              COUNT(CASE WHEN status = 'deal' THEN 1 END) as deals_closed
            FROM am_roles
            WHERE account_manager_id = ?
          `).bind(userData.id).first();
        const interviewsResult = await db.prepare(`
            SELECT SUM(interview_count) as count
            FROM am_role_interviews
            WHERE role_id IN (SELECT id FROM am_roles WHERE account_manager_id = ?)
          `).bind(userData.id).first();
        const stats = rolesResult;
        profile.stats = {
          total_roles: stats?.total_roles || 0,
          active_roles: stats?.active_roles || 0,
          deals_closed: stats?.deals_closed || 0,
          total_interviews: interviewsResult?.count || 0
        };
        const table1Points = (stats?.active_roles || 0) * 3 + (stats?.deals_closed || 0) * 7 + (interviewsResult?.count || 0) * 2;
        const table2Raw = (stats?.active_roles || 0) * 4;
        const table2Points = Math.min(table2Raw, 20);
        const effectiveT2 = Math.max(table2Points, 1);
        const ebesScore = table1Points / effectiveT2 * 100;
        profile.stats.ebes_score = Math.min(100, Math.max(0, Math.round(ebesScore * 10) / 10));
      }
      profiles.push(profile);
    }
    return c.json({ profiles, settings });
  } catch (error) {
    console.error("Error fetching employee profiles:", error);
    return c.json({ error: "Failed to fetch employee profiles" }, 500);
  }
});
app$1.get("/api/employees/profiles/:id", authenticatedUser, async (c) => {
  const db = c.env.DB;
  const employeeId = c.req.param("id");
  try {
    const settingsResult = await db.prepare(`
        SELECT setting_key, setting_value
        FROM app_settings
        WHERE setting_key IN (
          'show_employee_profiles',
          'show_recruiter_stats',
          'show_rm_stats',
          'show_am_stats',
          'show_client_stats',
          'show_team_stats'
        )
      `).all();
    const settings = {
      show_employee_profiles: true,
      show_recruiter_stats: true,
      show_rm_stats: true,
      show_am_stats: true,
      show_client_stats: true,
      show_team_stats: true
    };
    for (const setting of settingsResult.results || []) {
      const data = setting;
      const value = data.setting_value;
      settings[data.setting_key] = value === "true" || value === "1" || value === 1 || value === true;
    }
    if (!settings.show_employee_profiles) {
      return c.json({ error: "Employee profiles are disabled" }, 403);
    }
    const user = await db.prepare("SELECT * FROM users WHERE id = ? AND role != 'admin' AND is_active = 1").bind(employeeId).first();
    if (!user) {
      return c.json({ error: "Employee not found" }, 404);
    }
    const userData = user;
    const profile = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      user_code: userData.user_code,
      role: userData.role,
      created_at: userData.created_at
    };
    if (settings.show_team_stats) {
      const teamsResult = await db.prepare(`
          SELECT t.id, t.name, t.team_code
          FROM app_teams t
          INNER JOIN team_assignments ta ON t.id = ta.team_id
          WHERE ta.user_id = ?
        `).bind(userData.id).all();
      profile.teams = teamsResult.results || [];
    }
    if (settings.show_client_stats) {
      const clientsResult = await db.prepare(`
          SELECT c.id, c.name, c.client_code
          FROM clients c
          INNER JOIN client_assignments ca ON c.id = ca.client_id
          WHERE ca.user_id = ?
        `).bind(userData.id).all();
      profile.clients = clientsResult.results || [];
    }
    if (userData.role === "recruiter" && settings.show_recruiter_stats) {
      const recentSubmissionsResult = await db.prepare(`
          SELECT rs.*, r.title as role_title, r.role_code
          FROM recruiter_submissions rs
          LEFT JOIN am_roles r ON rs.role_id = r.id
          WHERE rs.recruiter_user_id = ?
          ORDER BY rs.created_at DESC
          LIMIT 10
        `).bind(userData.id).all();
      profile.recent_activity = recentSubmissionsResult.results || [];
      const monthlyStatsResult = await db.prepare(`
          SELECT
            strftime('%Y-%m', submission_date) as month,
            COUNT(CASE WHEN entry_type = 'submission' THEN 1 END) as submissions,
            COUNT(CASE WHEN entry_type = 'interview' THEN 1 END) as interviews,
            COUNT(CASE WHEN entry_type = 'deal' THEN 1 END) as deals
          FROM recruiter_submissions
          WHERE recruiter_user_id = ?
          GROUP BY month
          ORDER BY month DESC
          LIMIT 6
        `).bind(userData.id).all();
      profile.monthly_stats = monthlyStatsResult.results || [];
    }
    return c.json({ profile, settings });
  } catch (error) {
    console.error("Error fetching employee profile:", error);
    return c.json({ error: "Failed to fetch employee profile" }, 500);
  }
});
const app = new Hono2();
app.use("*", cors());
app.route("/", app$b);
app.route("/", app$9);
app.route("/", app$8);
app.route("/", app$7);
app.route("/", app$6);
app.route("/api/recruiter", app$5);
app.route("/", app$4);
app.route("/", app$3);
app.route("/", app$2);
app.route("/", app$a);
app.route("/", app$1);
const workerEntry = app ?? {};
export {
  workerEntry as default
};
