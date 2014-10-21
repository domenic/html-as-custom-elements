import * as privateMethods from './private-methods.js';

// Reimplementing URLUtils mixin in terms of URL, somewhat ironically.

var privates = new WeakMap();

export default class URLUtilsImpl {
  get href() {
    return p(this).url.href;
  }
  set href(v) {
    // Working around the exception in https://url.spec.whatwg.org/#dfnReturnLink-12
    try {
      p(this).url.href = v;
    } catch (e) {}

    runPreUpdateSteps(this, v);
  }

  get origin() {
    return p(this).url.origin;
  }
}

var simpleProps = ['protocol', 'username', 'password', 'host', 'hostname', 'port', 'pathname', 'search',
                   'searchParams', 'hash'];

for (const prop of simpleProps) {
  Object.defineProperty(URLUtilsImpl.prototype, prop, {
    enumerable: true,
    configurable: true,
    get() {
      return p(this).url[prop];
    },
    set(v) {
      p(this).url[prop] = v;
      runPreUpdateSteps(this);
    }
  });
}

// The URLUtils mixin provides a "set the input" operation which can be called on any mixin target instance.
export function setTheInput(target, input, url) {
  if (url !== undefined) {
    p(target).url = url;
  } else {
    p(target).url = new URL(input, privateMethods.call(target, 'getTheBase'));
  }
}


function runPreUpdateSteps(obj, value = p(obj).url.href) {
  const updateSteps = privateMethods.get(obj, 'updateSteps');
  if (updateSteps) {
    updateSteps.call(obj, value);
  }
}

function p(obj) {
  ensureInitialized(obj);
  return privates.get(obj);
}

function ensureInitialized(obj) {
  if (!privates.has(obj)) {
    privates.set(obj, { url: new URL(privateMethods.call(obj, 'getTheBase')) });
  }
}
