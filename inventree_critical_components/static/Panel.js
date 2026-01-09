var ut = (e) => {
  throw TypeError(e);
};
var Be = (e, t, r) => t.has(e) || ut("Cannot " + r);
var o = (e, t, r) => (Be(e, t, "read from private field"), r ? r.call(e) : t.get(e)), S = (e, t, r) => t.has(e) ? ut("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), p = (e, t, r, s) => (Be(e, t, "write to private field"), s ? s.call(e, r) : t.set(e, r), r), E = (e, t, r) => (Be(e, t, "access private method"), r);
const Xt = window.React.useState, Qe = window.React.useRef, dt = window.React.useEffect;
function Zt(e, t, r = { leading: !1 }) {
  const [s, n] = Xt(e), l = Qe(!1), d = Qe(null), u = Qe(!1), f = () => window.clearTimeout(d.current);
  return dt(() => {
    l.current && (!u.current && r.leading ? (u.current = !0, n(e)) : (f(), d.current = window.setTimeout(() => {
      u.current = !1, n(e);
    }, t)));
  }, [e, r.leading, t]), dt(() => (l.current = !0, f), []), [s, f];
}
var it = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set(), this.subscribe = this.subscribe.bind(this);
  }
  subscribe(e) {
    return this.listeners.add(e), this.onSubscribe(), () => {
      this.listeners.delete(e), this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
}, Kt = {
  // We need the wrapper function syntax below instead of direct references to
  // global setTimeout etc.
  //
  // BAD: `setTimeout: setTimeout`
  // GOOD: `setTimeout: (cb, delay) => setTimeout(cb, delay)`
  //
  // If we use direct references here, then anything that wants to spy on or
  // replace the global setTimeout (like tests) won't work since we'll already
  // have a hard reference to the original implementation at the time when this
  // file was imported.
  setTimeout: (e, t) => setTimeout(e, t),
  clearTimeout: (e) => clearTimeout(e),
  setInterval: (e, t) => setInterval(e, t),
  clearInterval: (e) => clearInterval(e)
}, q, oe, $t, At = ($t = class {
  constructor() {
    // We cannot have TimeoutManager<T> as we must instantiate it with a concrete
    // type at app boot; and if we leave that type, then any new timer provider
    // would need to support ReturnType<typeof setTimeout>, which is infeasible.
    //
    // We settle for type safety for the TimeoutProvider type, and accept that
    // this class is unsafe internally to allow for extension.
    S(this, q, Kt);
    S(this, oe, !1);
  }
  setTimeoutProvider(e) {
    process.env.NODE_ENV !== "production" && o(this, oe) && e !== o(this, q) && console.error(
      "[timeoutManager]: Switching provider after calls to previous provider might result in unexpected behavior.",
      { previous: o(this, q), provider: e }
    ), p(this, q, e), process.env.NODE_ENV !== "production" && p(this, oe, !1);
  }
  setTimeout(e, t) {
    return process.env.NODE_ENV !== "production" && p(this, oe, !0), o(this, q).setTimeout(e, t);
  }
  clearTimeout(e) {
    o(this, q).clearTimeout(e);
  }
  setInterval(e, t) {
    return process.env.NODE_ENV !== "production" && p(this, oe, !0), o(this, q).setInterval(e, t);
  }
  clearInterval(e) {
    o(this, q).clearInterval(e);
  }
}, q = new WeakMap(), oe = new WeakMap(), $t), Fe = new At();
function er(e) {
  setTimeout(e, 0);
}
var Ie = typeof window > "u" || "Deno" in globalThis;
function He() {
}
function ht(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function tr(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function Ne(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Y(e, t) {
  return typeof e == "function" ? e(t) : e;
}
var rr = Object.prototype.hasOwnProperty;
function Xe(e, t) {
  if (e === t)
    return e;
  const r = ft(e) && ft(t);
  if (!r && !(_t(e) && _t(t))) return t;
  const n = (r ? e : Object.keys(e)).length, l = r ? t : Object.keys(t), d = l.length, u = r ? new Array(d) : {};
  let f = 0;
  for (let k = 0; k < d; k++) {
    const v = r ? k : l[k], _ = e[v], b = t[v];
    if (_ === b) {
      u[v] = _, (r ? k < n : rr.call(e, v)) && f++;
      continue;
    }
    if (_ === null || b === null || typeof _ != "object" || typeof b != "object") {
      u[v] = b;
      continue;
    }
    const m = Xe(_, b);
    u[v] = m, m === _ && f++;
  }
  return n === d && f === n ? e : u;
}
function Ze(e, t) {
  if (!t || Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const r in e)
    if (e[r] !== t[r])
      return !1;
  return !0;
}
function ft(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function _t(e) {
  if (!mt(e))
    return !1;
  const t = e.constructor;
  if (t === void 0)
    return !0;
  const r = t.prototype;
  return !(!mt(r) || !r.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(e) !== Object.prototype);
}
function mt(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function gt(e, t, r) {
  if (typeof r.structuralSharing == "function")
    return r.structuralSharing(e, t);
  if (r.structuralSharing !== !1) {
    if (process.env.NODE_ENV !== "production")
      try {
        return Xe(e, t);
      } catch (s) {
        throw console.error(
          `Structural sharing requires data to be JSON serializable. To fix this, turn off structuralSharing or return JSON-serializable data from your queryFn. [${r.queryHash}]: ${s}`
        ), s;
      }
    return Xe(e, t);
  }
  return t;
}
function Dt(e, t) {
  return typeof e == "function" ? e(...t) : !!e;
}
var ie, ee, he, Lt, ar = (Lt = class extends it {
  constructor() {
    super();
    S(this, ie);
    S(this, ee);
    S(this, he);
    p(this, he, (t) => {
      if (!Ie && window.addEventListener) {
        const r = () => t();
        return window.addEventListener("visibilitychange", r, !1), () => {
          window.removeEventListener("visibilitychange", r);
        };
      }
    });
  }
  onSubscribe() {
    o(this, ee) || this.setEventListener(o(this, he));
  }
  onUnsubscribe() {
    var t;
    this.hasListeners() || ((t = o(this, ee)) == null || t.call(this), p(this, ee, void 0));
  }
  setEventListener(t) {
    var r;
    p(this, he, t), (r = o(this, ee)) == null || r.call(this), p(this, ee, t((s) => {
      typeof s == "boolean" ? this.setFocused(s) : this.onFocus();
    }));
  }
  setFocused(t) {
    o(this, ie) !== t && (p(this, ie, t), this.onFocus());
  }
  onFocus() {
    const t = this.isFocused();
    this.listeners.forEach((r) => {
      r(t);
    });
  }
  isFocused() {
    var t;
    return typeof o(this, ie) == "boolean" ? o(this, ie) : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !== "hidden";
  }
}, ie = new WeakMap(), ee = new WeakMap(), he = new WeakMap(), Lt), sr = new ar();
function pt() {
  let e, t;
  const r = new Promise((n, l) => {
    e = n, t = l;
  });
  r.status = "pending", r.catch(() => {
  });
  function s(n) {
    Object.assign(r, n), delete r.resolve, delete r.reject;
  }
  return r.resolve = (n) => {
    s({
      status: "fulfilled",
      value: n
    }), e(n);
  }, r.reject = (n) => {
    s({
      status: "rejected",
      reason: n
    }), t(n);
  }, r;
}
var nr = er;
function or() {
  let e = [], t = 0, r = (u) => {
    u();
  }, s = (u) => {
    u();
  }, n = nr;
  const l = (u) => {
    t ? e.push(u) : n(() => {
      r(u);
    });
  }, d = () => {
    const u = e;
    e = [], u.length && n(() => {
      s(() => {
        u.forEach((f) => {
          r(f);
        });
      });
    });
  };
  return {
    batch: (u) => {
      let f;
      t++;
      try {
        f = u();
      } finally {
        t--, t || d();
      }
      return f;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (u) => (...f) => {
      l(() => {
        u(...f);
      });
    },
    schedule: l,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (u) => {
      r = u;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (u) => {
      s = u;
    },
    setScheduler: (u) => {
      n = u;
    }
  };
}
var Ut = or(), fe, te, _e, Ft, ir = (Ft = class extends it {
  constructor() {
    super();
    S(this, fe, !0);
    S(this, te);
    S(this, _e);
    p(this, _e, (t) => {
      if (!Ie && window.addEventListener) {
        const r = () => t(!0), s = () => t(!1);
        return window.addEventListener("online", r, !1), window.addEventListener("offline", s, !1), () => {
          window.removeEventListener("online", r), window.removeEventListener("offline", s);
        };
      }
    });
  }
  onSubscribe() {
    o(this, te) || this.setEventListener(o(this, _e));
  }
  onUnsubscribe() {
    var t;
    this.hasListeners() || ((t = o(this, te)) == null || t.call(this), p(this, te, void 0));
  }
  setEventListener(t) {
    var r;
    p(this, _e, t), (r = o(this, te)) == null || r.call(this), p(this, te, t(this.setOnline.bind(this)));
  }
  setOnline(t) {
    o(this, fe) !== t && (p(this, fe, t), this.listeners.forEach((s) => {
      s(t);
    }));
  }
  isOnline() {
    return o(this, fe);
  }
}, fe = new WeakMap(), te = new WeakMap(), _e = new WeakMap(), Ft), lr = new ir();
function cr(e) {
  return (e ?? "online") === "online" ? lr.isOnline() : !0;
}
function ur(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: cr(t.networkMode) ? "fetching" : "paused",
    ...e === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
var L, w, je, $, le, me, Z, re, $e, ge, pe, ce, ue, ae, ve, R, Ee, Ke, Ae, et, tt, rt, at, st, Yt, zt, dr = (zt = class extends it {
  constructor(t, r) {
    super();
    S(this, R);
    S(this, L);
    S(this, w);
    S(this, je);
    S(this, $);
    S(this, le);
    S(this, me);
    S(this, Z);
    S(this, re);
    S(this, $e);
    S(this, ge);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    S(this, pe);
    S(this, ce);
    S(this, ue);
    S(this, ae);
    S(this, ve, /* @__PURE__ */ new Set());
    this.options = r, p(this, L, t), p(this, re, null), p(this, Z, pt()), this.bindMethods(), this.setOptions(r);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 && (o(this, w).addObserver(this), vt(o(this, w), this.options) ? E(this, R, Ee).call(this) : this.updateResult(), E(this, R, tt).call(this));
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return nt(
      o(this, w),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return nt(
      o(this, w),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), E(this, R, rt).call(this), E(this, R, at).call(this), o(this, w).removeObserver(this);
  }
  setOptions(t) {
    const r = this.options, s = o(this, w);
    if (this.options = o(this, L).defaultQueryOptions(t), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof Y(this.options.enabled, o(this, w)) != "boolean")
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    E(this, R, st).call(this), o(this, w).setOptions(this.options), r._defaulted && !Ze(this.options, r) && o(this, L).getQueryCache().notify({
      type: "observerOptionsUpdated",
      query: o(this, w),
      observer: this
    });
    const n = this.hasListeners();
    n && wt(
      o(this, w),
      s,
      this.options,
      r
    ) && E(this, R, Ee).call(this), this.updateResult(), n && (o(this, w) !== s || Y(this.options.enabled, o(this, w)) !== Y(r.enabled, o(this, w)) || Ne(this.options.staleTime, o(this, w)) !== Ne(r.staleTime, o(this, w))) && E(this, R, Ke).call(this);
    const l = E(this, R, Ae).call(this);
    n && (o(this, w) !== s || Y(this.options.enabled, o(this, w)) !== Y(r.enabled, o(this, w)) || l !== o(this, ae)) && E(this, R, et).call(this, l);
  }
  getOptimisticResult(t) {
    const r = o(this, L).getQueryCache().build(o(this, L), t), s = this.createResult(r, t);
    return fr(this, s) && (p(this, $, s), p(this, me, this.options), p(this, le, o(this, w).state)), s;
  }
  getCurrentResult() {
    return o(this, $);
  }
  trackResult(t, r) {
    return new Proxy(t, {
      get: (s, n) => (this.trackProp(n), r == null || r(n), n === "promise" && (this.trackProp("data"), !this.options.experimental_prefetchInRender && o(this, Z).status === "pending" && o(this, Z).reject(
        new Error(
          "experimental_prefetchInRender feature flag is not enabled"
        )
      )), Reflect.get(s, n))
    });
  }
  trackProp(t) {
    o(this, ve).add(t);
  }
  getCurrentQuery() {
    return o(this, w);
  }
  refetch({ ...t } = {}) {
    return this.fetch({
      ...t
    });
  }
  fetchOptimistic(t) {
    const r = o(this, L).defaultQueryOptions(t), s = o(this, L).getQueryCache().build(o(this, L), r);
    return s.fetch().then(() => this.createResult(s, r));
  }
  fetch(t) {
    return E(this, R, Ee).call(this, {
      ...t,
      cancelRefetch: t.cancelRefetch ?? !0
    }).then(() => (this.updateResult(), o(this, $)));
  }
  createResult(t, r) {
    var A;
    const s = o(this, w), n = this.options, l = o(this, $), d = o(this, le), u = o(this, me), k = t !== s ? t.state : o(this, je), { state: v } = t;
    let _ = { ...v }, b = !1, m;
    if (r._optimisticResults) {
      const N = this.hasListeners(), Q = !N && vt(t, r), D = N && wt(t, s, r, n);
      (Q || D) && (_ = {
        ..._,
        ...ur(v.data, t.options)
      }), r._optimisticResults === "isRestoring" && (_.fetchStatus = "idle");
    }
    let { error: P, errorUpdatedAt: F, status: O } = _;
    m = _.data;
    let V = !1;
    if (r.placeholderData !== void 0 && m === void 0 && O === "pending") {
      let N;
      l != null && l.isPlaceholderData && r.placeholderData === (u == null ? void 0 : u.placeholderData) ? (N = l.data, V = !0) : N = typeof r.placeholderData == "function" ? r.placeholderData(
        (A = o(this, pe)) == null ? void 0 : A.state.data,
        o(this, pe)
      ) : r.placeholderData, N !== void 0 && (O = "success", m = gt(
        l == null ? void 0 : l.data,
        N,
        r
      ), b = !0);
    }
    if (r.select && m !== void 0 && !V)
      if (l && m === (d == null ? void 0 : d.data) && r.select === o(this, $e))
        m = o(this, ge);
      else
        try {
          p(this, $e, r.select), m = r.select(m), m = gt(l == null ? void 0 : l.data, m, r), p(this, ge, m), p(this, re, null);
        } catch (N) {
          p(this, re, N);
        }
    o(this, re) && (P = o(this, re), m = o(this, ge), F = Date.now(), O = "error");
    const J = _.fetchStatus === "fetching", H = O === "pending", M = O === "error", B = H && J, z = m !== void 0, I = {
      status: O,
      fetchStatus: _.fetchStatus,
      isPending: H,
      isSuccess: O === "success",
      isError: M,
      isInitialLoading: B,
      isLoading: B,
      data: m,
      dataUpdatedAt: _.dataUpdatedAt,
      error: P,
      errorUpdatedAt: F,
      failureCount: _.fetchFailureCount,
      failureReason: _.fetchFailureReason,
      errorUpdateCount: _.errorUpdateCount,
      isFetched: _.dataUpdateCount > 0 || _.errorUpdateCount > 0,
      isFetchedAfterMount: _.dataUpdateCount > k.dataUpdateCount || _.errorUpdateCount > k.errorUpdateCount,
      isFetching: J,
      isRefetching: J && !H,
      isLoadingError: M && !z,
      isPaused: _.fetchStatus === "paused",
      isPlaceholderData: b,
      isRefetchError: M && z,
      isStale: lt(t, r),
      refetch: this.refetch,
      promise: o(this, Z),
      isEnabled: Y(r.enabled, t) !== !1
    };
    if (this.options.experimental_prefetchInRender) {
      const N = (X) => {
        I.status === "error" ? X.reject(I.error) : I.data !== void 0 && X.resolve(I.data);
      }, Q = () => {
        const X = p(this, Z, I.promise = pt());
        N(X);
      }, D = o(this, Z);
      switch (D.status) {
        case "pending":
          t.queryHash === s.queryHash && N(D);
          break;
        case "fulfilled":
          (I.status === "error" || I.data !== D.value) && Q();
          break;
        case "rejected":
          (I.status !== "error" || I.error !== D.reason) && Q();
          break;
      }
    }
    return I;
  }
  updateResult() {
    const t = o(this, $), r = this.createResult(o(this, w), this.options);
    if (p(this, le, o(this, w).state), p(this, me, this.options), o(this, le).data !== void 0 && p(this, pe, o(this, w)), Ze(r, t))
      return;
    p(this, $, r);
    const s = () => {
      if (!t)
        return !0;
      const { notifyOnChangeProps: n } = this.options, l = typeof n == "function" ? n() : n;
      if (l === "all" || !l && !o(this, ve).size)
        return !0;
      const d = new Set(
        l ?? o(this, ve)
      );
      return this.options.throwOnError && d.add("error"), Object.keys(o(this, $)).some((u) => {
        const f = u;
        return o(this, $)[f] !== t[f] && d.has(f);
      });
    };
    E(this, R, Yt).call(this, { listeners: s() });
  }
  onQueryUpdate() {
    this.updateResult(), this.hasListeners() && E(this, R, tt).call(this);
  }
}, L = new WeakMap(), w = new WeakMap(), je = new WeakMap(), $ = new WeakMap(), le = new WeakMap(), me = new WeakMap(), Z = new WeakMap(), re = new WeakMap(), $e = new WeakMap(), ge = new WeakMap(), pe = new WeakMap(), ce = new WeakMap(), ue = new WeakMap(), ae = new WeakMap(), ve = new WeakMap(), R = new WeakSet(), Ee = function(t) {
  E(this, R, st).call(this);
  let r = o(this, w).fetch(
    this.options,
    t
  );
  return t != null && t.throwOnError || (r = r.catch(He)), r;
}, Ke = function() {
  E(this, R, rt).call(this);
  const t = Ne(
    this.options.staleTime,
    o(this, w)
  );
  if (Ie || o(this, $).isStale || !ht(t))
    return;
  const s = tr(o(this, $).dataUpdatedAt, t) + 1;
  p(this, ce, Fe.setTimeout(() => {
    o(this, $).isStale || this.updateResult();
  }, s));
}, Ae = function() {
  return (typeof this.options.refetchInterval == "function" ? this.options.refetchInterval(o(this, w)) : this.options.refetchInterval) ?? !1;
}, et = function(t) {
  E(this, R, at).call(this), p(this, ae, t), !(Ie || Y(this.options.enabled, o(this, w)) === !1 || !ht(o(this, ae)) || o(this, ae) === 0) && p(this, ue, Fe.setInterval(() => {
    (this.options.refetchIntervalInBackground || sr.isFocused()) && E(this, R, Ee).call(this);
  }, o(this, ae)));
}, tt = function() {
  E(this, R, Ke).call(this), E(this, R, et).call(this, E(this, R, Ae).call(this));
}, rt = function() {
  o(this, ce) && (Fe.clearTimeout(o(this, ce)), p(this, ce, void 0));
}, at = function() {
  o(this, ue) && (Fe.clearInterval(o(this, ue)), p(this, ue, void 0));
}, st = function() {
  const t = o(this, L).getQueryCache().build(o(this, L), this.options);
  if (t === o(this, w))
    return;
  const r = o(this, w);
  p(this, w, t), p(this, je, t.state), this.hasListeners() && (r == null || r.removeObserver(this), t.addObserver(this));
}, Yt = function(t) {
  Ut.batch(() => {
    t.listeners && this.listeners.forEach((r) => {
      r(o(this, $));
    }), o(this, L).getQueryCache().notify({
      query: o(this, w),
      type: "observerResultsUpdated"
    });
  });
}, zt);
function hr(e, t) {
  return Y(t.enabled, e) !== !1 && e.state.data === void 0 && !(e.state.status === "error" && t.retryOnMount === !1);
}
function vt(e, t) {
  return hr(e, t) || e.state.data !== void 0 && nt(e, t, t.refetchOnMount);
}
function nt(e, t, r) {
  if (Y(t.enabled, e) !== !1 && Ne(t.staleTime, e) !== "static") {
    const s = typeof r == "function" ? r(e) : r;
    return s === "always" || s !== !1 && lt(e, t);
  }
  return !1;
}
function wt(e, t, r, s) {
  return (e !== t || Y(s.enabled, e) === !1) && (!r.suspense || e.state.status !== "error") && lt(e, r);
}
function lt(e, t) {
  return Y(t.enabled, e) !== !1 && e.isStaleByTime(Ne(t.staleTime, e));
}
function fr(e, t) {
  return !Ze(e.getCurrentResult(), t);
}
var ze = { exports: {} }, Te = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bt;
function _r() {
  if (bt) return Te;
  bt = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function r(s, n, l) {
    var d = null;
    if (l !== void 0 && (d = "" + l), n.key !== void 0 && (d = "" + n.key), "key" in n) {
      l = {};
      for (var u in n)
        u !== "key" && (l[u] = n[u]);
    } else l = n;
    return n = l.ref, {
      $$typeof: e,
      type: s,
      key: d,
      ref: n !== void 0 ? n : null,
      props: l
    };
  }
  return Te.Fragment = t, Te.jsx = r, Te.jsxs = r, Te;
}
var xe = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yt;
function mr() {
  return yt || (yt = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(a) {
      if (a == null) return null;
      if (typeof a == "function")
        return a.$$typeof === Q ? null : a.displayName || a.name || null;
      if (typeof a == "string") return a;
      switch (a) {
        case O:
          return "Fragment";
        case J:
          return "Profiler";
        case V:
          return "StrictMode";
        case z:
          return "Suspense";
        case Le:
          return "SuspenseList";
        case N:
          return "Activity";
      }
      if (typeof a == "object")
        switch (typeof a.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), a.$$typeof) {
          case F:
            return "Portal";
          case M:
            return a.displayName || "Context";
          case H:
            return (a._context.displayName || "Context") + ".Consumer";
          case B:
            var h = a.render;
            return a = a.displayName, a || (a = h.displayName || h.name || "", a = a !== "" ? "ForwardRef(" + a + ")" : "ForwardRef"), a;
          case I:
            return h = a.displayName || null, h !== null ? h : e(a.type) || "Memo";
          case A:
            h = a._payload, a = a._init;
            try {
              return e(a(h));
            } catch {
            }
        }
      return null;
    }
    function t(a) {
      return "" + a;
    }
    function r(a) {
      try {
        t(a);
        var h = !1;
      } catch {
        h = !0;
      }
      if (h) {
        h = console;
        var g = h.error, C = typeof Symbol == "function" && Symbol.toStringTag && a[Symbol.toStringTag] || a.constructor.name || "Object";
        return g.call(
          h,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          C
        ), t(a);
      }
    }
    function s(a) {
      if (a === O) return "<>";
      if (typeof a == "object" && a !== null && a.$$typeof === A)
        return "<...>";
      try {
        var h = e(a);
        return h ? "<" + h + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function n() {
      var a = D.A;
      return a === null ? null : a.getOwner();
    }
    function l() {
      return Error("react-stack-top-frame");
    }
    function d(a) {
      if (X.call(a, "key")) {
        var h = Object.getOwnPropertyDescriptor(a, "key").get;
        if (h && h.isReactWarning) return !1;
      }
      return a.key !== void 0;
    }
    function u(a, h) {
      function g() {
        ye || (ye = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          h
        ));
      }
      g.isReactWarning = !0, Object.defineProperty(a, "key", {
        get: g,
        configurable: !0
      });
    }
    function f() {
      var a = e(this.type);
      return ke[a] || (ke[a] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), a = this.props.ref, a !== void 0 ? a : null;
    }
    function k(a, h, g, C, j, ne) {
      var T = g.ref;
      return a = {
        $$typeof: P,
        type: a,
        key: h,
        props: g,
        _owner: C
      }, (T !== void 0 ? T : null) !== null ? Object.defineProperty(a, "ref", {
        enumerable: !1,
        get: f
      }) : Object.defineProperty(a, "ref", { enumerable: !1, value: null }), a._store = {}, Object.defineProperty(a._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(a, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(a, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: j
      }), Object.defineProperty(a, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ne
      }), Object.freeze && (Object.freeze(a.props), Object.freeze(a)), a;
    }
    function v(a, h, g, C, j, ne) {
      var T = h.children;
      if (T !== void 0)
        if (C)
          if (be(T)) {
            for (C = 0; C < T.length; C++)
              _(T[C]);
            Object.freeze && Object.freeze(T);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else _(T);
      if (X.call(h, "key")) {
        T = e(a);
        var x = Object.keys(h).filter(function(Se) {
          return Se !== "key";
        });
        C = 0 < x.length ? "{key: someKey, " + x.join(": ..., ") + ": ...}" : "{key: someKey}", i[T + C] || (x = 0 < x.length ? "{" + x.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          C,
          T,
          x,
          T
        ), i[T + C] = !0);
      }
      if (T = null, g !== void 0 && (r(g), T = "" + g), d(h) && (r(h.key), T = "" + h.key), "key" in h) {
        g = {};
        for (var W in h)
          W !== "key" && (g[W] = h[W]);
      } else g = h;
      return T && u(
        g,
        typeof a == "function" ? a.displayName || a.name || "Unknown" : a
      ), k(
        a,
        T,
        g,
        n(),
        j,
        ne
      );
    }
    function _(a) {
      b(a) ? a._store && (a._store.validated = 1) : typeof a == "object" && a !== null && a.$$typeof === A && (a._payload.status === "fulfilled" ? b(a._payload.value) && a._payload.value._store && (a._payload.value._store.validated = 1) : a._store && (a._store.validated = 1));
    }
    function b(a) {
      return typeof a == "object" && a !== null && a.$$typeof === P;
    }
    var m = window.React, P = Symbol.for("react.transitional.element"), F = Symbol.for("react.portal"), O = Symbol.for("react.fragment"), V = Symbol.for("react.strict_mode"), J = Symbol.for("react.profiler"), H = Symbol.for("react.consumer"), M = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), z = Symbol.for("react.suspense"), Le = Symbol.for("react.suspense_list"), I = Symbol.for("react.memo"), A = Symbol.for("react.lazy"), N = Symbol.for("react.activity"), Q = Symbol.for("react.client.reference"), D = m.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, X = Object.prototype.hasOwnProperty, be = Array.isArray, de = console.createTask ? console.createTask : function() {
      return null;
    };
    m = {
      react_stack_bottom_frame: function(a) {
        return a();
      }
    };
    var ye, ke = {}, Re = m.react_stack_bottom_frame.bind(
      m,
      l
    )(), Ce = de(s(l)), i = {};
    xe.Fragment = O, xe.jsx = function(a, h, g) {
      var C = 1e4 > D.recentlyCreatedOwnerStacks++;
      return v(
        a,
        h,
        g,
        !1,
        C ? Error("react-stack-top-frame") : Re,
        C ? de(s(a)) : Ce
      );
    }, xe.jsxs = function(a, h, g) {
      var C = 1e4 > D.recentlyCreatedOwnerStacks++;
      return v(
        a,
        h,
        g,
        !0,
        C ? Error("react-stack-top-frame") : Re,
        C ? de(s(a)) : Ce
      );
    };
  })()), xe;
}
var kt;
function gr() {
  return kt || (kt = 1, process.env.NODE_ENV === "production" ? ze.exports = _r() : ze.exports = mr()), ze.exports;
}
gr();
const Vt = window.React;
var pr = Vt.createContext(
  void 0
), vr = (e) => {
  const t = Vt.useContext(pr);
  if (e)
    return e;
  if (!t)
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  return t;
};
const Bt = window.React;
var Qt = Bt.createContext(!1), wr = () => Bt.useContext(Qt);
Qt.Provider;
const Wt = window.React;
function br() {
  let e = !1;
  return {
    clearReset: () => {
      e = !1;
    },
    reset: () => {
      e = !0;
    },
    isReset: () => e
  };
}
var yr = Wt.createContext(br()), kr = () => Wt.useContext(yr);
const Rr = window.React;
var Cr = (e, t, r) => {
  const s = r != null && r.state.error && typeof e.throwOnError == "function" ? Dt(e.throwOnError, [r.state.error, r]) : e.throwOnError;
  (e.suspense || e.experimental_prefetchInRender || s) && (t.isReset() || (e.retryOnMount = !1));
}, Sr = (e) => {
  Rr.useEffect(() => {
    e.clearReset();
  }, [e]);
}, Tr = ({
  result: e,
  errorResetBoundary: t,
  throwOnError: r,
  query: s,
  suspense: n
}) => e.isError && !t.isReset() && !e.isFetching && s && (n && e.data === void 0 || Dt(r, [e.error, s])), xr = (e) => {
  if (e.suspense) {
    const r = (n) => n === "static" ? n : Math.max(n ?? 1e3, 1e3), s = e.staleTime;
    e.staleTime = typeof s == "function" ? (...n) => r(s(...n)) : r(s), typeof e.gcTime == "number" && (e.gcTime = Math.max(
      e.gcTime,
      1e3
    ));
  }
}, Or = (e, t) => e.isLoading && e.isFetching && !t, Mr = (e, t) => (e == null ? void 0 : e.suspense) && t.isPending, Rt = (e, t, r) => t.fetchOptimistic(e).catch(() => {
  r.clearReset();
});
const De = window.React;
function Er(e, t, r) {
  var b, m, P, F;
  if (process.env.NODE_ENV !== "production" && (typeof e != "object" || Array.isArray(e)))
    throw new Error(
      'Bad argument type. Starting with v5, only the "Object" form is allowed when calling query related functions. Please use the error stack to find the culprit call. More info here: https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5#supports-a-single-signature-one-object'
    );
  const s = wr(), n = kr(), l = vr(r), d = l.defaultQueryOptions(e);
  (m = (b = l.getDefaultOptions().queries) == null ? void 0 : b._experimental_beforeQuery) == null || m.call(
    b,
    d
  );
  const u = l.getQueryCache().get(d.queryHash);
  process.env.NODE_ENV !== "production" && (d.queryFn || console.error(
    `[${d.queryHash}]: No queryFn was passed as an option, and no default queryFn was found. The queryFn parameter is only optional when using a default queryFn. More info here: https://tanstack.com/query/latest/docs/framework/react/guides/default-query-function`
  )), d._optimisticResults = s ? "isRestoring" : "optimistic", xr(d), Cr(d, n, u), Sr(n);
  const f = !l.getQueryCache().get(d.queryHash), [k] = De.useState(
    () => new t(
      l,
      d
    )
  ), v = k.getOptimisticResult(d), _ = !s && e.subscribed !== !1;
  if (De.useSyncExternalStore(
    De.useCallback(
      (O) => {
        const V = _ ? k.subscribe(Ut.batchCalls(O)) : He;
        return k.updateResult(), V;
      },
      [k, _]
    ),
    () => k.getCurrentResult(),
    () => k.getCurrentResult()
  ), De.useEffect(() => {
    k.setOptions(d);
  }, [d, k]), Mr(d, v))
    throw Rt(d, k, n);
  if (Tr({
    result: v,
    errorResetBoundary: n,
    throwOnError: d.throwOnError,
    query: u,
    suspense: d.suspense
  }))
    throw v.error;
  if ((F = (P = l.getDefaultOptions().queries) == null ? void 0 : P._experimental_afterQuery) == null || F.call(
    P,
    d,
    v
  ), d.experimental_prefetchInRender && !Ie && Or(v, s)) {
    const O = f ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      Rt(d, k, n)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      u == null ? void 0 : u.promise
    );
    O == null || O.catch(He).finally(() => {
      k.updateResult();
    });
  }
  return d.notifyOnChangeProps ? v : k.trackResult(v);
}
function Pr(e, t) {
  return Er(e, dr, t);
}
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Nr = {
  outline: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  },
  filled: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none"
  }
};
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ir = window.React.forwardRef, We = window.React.createElement, K = (e, t, r, s) => {
  const n = Ir(
    ({ color: l = "currentColor", size: d = 24, stroke: u = 2, title: f, className: k, children: v, ..._ }, b) => We(
      "svg",
      {
        ref: b,
        ...Nr[e],
        width: d,
        height: d,
        className: ["tabler-icon", `tabler-icon-${t}`, k].join(" "),
        strokeWidth: u,
        stroke: l,
        ..._
      },
      [
        f && We("title", { key: "svg-title" }, f),
        ...s.map(([m, P]) => We(m, P)),
        ...Array.isArray(v) ? v : [v]
      ]
    )
  );
  return n.displayName = `${r}`, n;
};
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jr = [["path", { d: "M12 9v4", key: "svg-0" }], ["path", { d: "M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0", key: "svg-1" }], ["path", { d: "M12 16h.01", key: "svg-2" }]], ot = K("outline", "alert-triangle", "AlertTriangle", jr);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $r = [["path", { d: "M4 4h6v6h-6l0 -6", key: "svg-0" }], ["path", { d: "M14 4h6v6h-6l0 -6", key: "svg-1" }], ["path", { d: "M4 14h6v6h-6l0 -6", key: "svg-2" }], ["path", { d: "M14 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0", key: "svg-3" }]], Gt = K("outline", "category", "Category", $r);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lr = [["path", { d: "M6 9l6 6l6 -6", key: "svg-0" }]], Fr = K("outline", "chevron-down", "ChevronDown", Lr);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zr = [["path", { d: "M9 6l6 6l-6 6", key: "svg-0" }]], Dr = K("outline", "chevron-right", "ChevronRight", zr);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ur = [["path", { d: "M7 7l5 5l5 -5", key: "svg-0" }], ["path", { d: "M7 13l5 5l5 -5", key: "svg-1" }]], Yr = K("outline", "chevrons-down", "ChevronsDown", Ur);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vr = [["path", { d: "M7 11l5 -5l5 5", key: "svg-0" }], ["path", { d: "M7 17l5 -5l5 5", key: "svg-1" }]], Br = K("outline", "chevrons-up", "ChevronsUp", Vr);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qr = [["path", { d: "M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0", key: "svg-0" }], ["path", { d: "M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0", key: "svg-1" }]], qt = K("outline", "map-pin", "MapPin", Qr);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wr = [["path", { d: "M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", key: "svg-0" }], ["path", { d: "M21 21l-6 -6", key: "svg-1" }]], Gr = K("outline", "search", "Search", Wr);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qr = [["path", { d: "M18 6l-12 12", key: "svg-0" }], ["path", { d: "M6 6l12 12", key: "svg-1" }]], Jr = K("outline", "x", "X", qr), Ct = "0.7.0";
var y = /* @__PURE__ */ ((e) => (e.api_server_info = "", e.user_list = "user/", e.user_set_password = "user/:id/set-password/", e.user_me = "user/me/", e.user_profile = "user/profile/", e.user_roles = "user/roles/", e.user_token = "user/token/", e.user_tokens = "user/tokens/", e.user_simple_login = "email/generate/", e.user_reset = "auth/v1/auth/password/request", e.user_reset_set = "auth/v1/auth/password/reset", e.auth_pwd_change = "auth/v1/account/password/change", e.auth_login = "auth/v1/auth/login", e.auth_login_2fa = "auth/v1/auth/2fa/authenticate", e.auth_session = "auth/v1/auth/session", e.auth_signup = "auth/v1/auth/signup", e.auth_authenticators = "auth/v1/account/authenticators", e.auth_recovery = "auth/v1/account/authenticators/recovery-codes", e.auth_mfa_reauthenticate = "auth/v1/auth/2fa/reauthenticate", e.auth_totp = "auth/v1/account/authenticators/totp", e.auth_trust = "auth/v1/auth/2fa/trust", e.auth_reauthenticate = "auth/v1/auth/reauthenticate", e.auth_email = "auth/v1/account/email", e.auth_email_verify = "auth/v1/auth/email/verify", e.auth_providers = "auth/v1/account/providers", e.auth_provider_redirect = "auth/v1/auth/provider/redirect", e.auth_config = "auth/v1/config", e.currency_list = "currency/exchange/", e.currency_refresh = "currency/refresh/", e.all_units = "units/all/", e.task_overview = "background-task/", e.task_pending_list = "background-task/pending/", e.task_scheduled_list = "background-task/scheduled/", e.task_failed_list = "background-task/failed/", e.api_search = "search/", e.settings_global_list = "settings/global/", e.settings_user_list = "settings/user/", e.news = "news/", e.global_status = "generic/status/", e.custom_state_list = "generic/status/custom/", e.version = "version/", e.license = "license/", e.group_list = "user/group/", e.owner_list = "user/owner/", e.ruleset_list = "user/ruleset/", e.content_type_list = "contenttype/", e.icons = "icons/", e.selectionlist_list = "selection/", e.selectionlist_detail = "selection/:id/", e.barcode = "barcode/", e.barcode_history = "barcode/history/", e.barcode_link = "barcode/link/", e.barcode_unlink = "barcode/unlink/", e.barcode_generate = "barcode/generate/", e.data_output = "data-output/", e.import_session_list = "importer/session/", e.import_session_accept_fields = "importer/session/:id/accept_fields/", e.import_session_accept_rows = "importer/session/:id/accept_rows/", e.import_session_column_mapping_list = "importer/column-mapping/", e.import_session_row_list = "importer/row/", e.notifications_list = "notifications/", e.notifications_readall = "notifications/readall/", e.build_order_list = "build/", e.build_order_issue = "build/:id/issue/", e.build_order_cancel = "build/:id/cancel/", e.build_order_hold = "build/:id/hold/", e.build_order_complete = "build/:id/finish/", e.build_output_complete = "build/:id/complete/", e.build_output_create = "build/:id/create-output/", e.build_output_scrap = "build/:id/scrap-outputs/", e.build_output_delete = "build/:id/delete-outputs/", e.build_order_auto_allocate = "build/:id/auto-allocate/", e.build_order_allocate = "build/:id/allocate/", e.build_order_consume = "build/:id/consume/", e.build_order_deallocate = "build/:id/unallocate/", e.build_line_list = "build/line/", e.build_item_list = "build/item/", e.bom_list = "bom/", e.bom_item_validate = "bom/:id/validate/", e.bom_validate = "part/:id/bom-validate/", e.bom_substitute_list = "bom/substitute/", e.part_list = "part/", e.part_parameter_list = "part/parameter/", e.part_parameter_template_list = "part/parameter/template/", e.part_thumbs_list = "part/thumbs/", e.part_pricing = "part/:id/pricing/", e.part_requirements = "part/:id/requirements/", e.part_serial_numbers = "part/:id/serial-numbers/", e.part_scheduling = "part/:id/scheduling/", e.part_pricing_internal = "part/internal-price/", e.part_pricing_sale = "part/sale-price/", e.part_stocktake_list = "part/stocktake/", e.category_list = "part/category/", e.category_tree = "part/category/tree/", e.category_parameter_list = "part/category/parameters/", e.related_part_list = "part/related/", e.part_test_template_list = "part/test-template/", e.company_list = "company/", e.contact_list = "company/contact/", e.address_list = "company/address/", e.supplier_part_list = "company/part/", e.supplier_part_pricing_list = "company/price-break/", e.manufacturer_part_list = "company/part/manufacturer/", e.manufacturer_part_parameter_list = "company/part/manufacturer/parameter/", e.stock_location_list = "stock/location/", e.stock_location_type_list = "stock/location-type/", e.stock_location_tree = "stock/location/tree/", e.stock_item_list = "stock/", e.stock_tracking_list = "stock/track/", e.stock_test_result_list = "stock/test/", e.stock_transfer = "stock/transfer/", e.stock_remove = "stock/remove/", e.stock_return = "stock/return/", e.stock_add = "stock/add/", e.stock_count = "stock/count/", e.stock_change_status = "stock/change_status/", e.stock_merge = "stock/merge/", e.stock_assign = "stock/assign/", e.stock_status = "stock/status/", e.stock_install = "stock/:id/install/", e.stock_uninstall = "stock/:id/uninstall/", e.stock_serialize = "stock/:id/serialize/", e.stock_serial_info = "stock/:id/serial-numbers/", e.generate_batch_code = "generate/batch-code/", e.generate_serial_number = "generate/serial-number/", e.purchase_order_list = "order/po/", e.purchase_order_issue = "order/po/:id/issue/", e.purchase_order_hold = "order/po/:id/hold/", e.purchase_order_cancel = "order/po/:id/cancel/", e.purchase_order_complete = "order/po/:id/complete/", e.purchase_order_line_list = "order/po-line/", e.purchase_order_extra_line_list = "order/po-extra-line/", e.purchase_order_receive = "order/po/:id/receive/", e.sales_order_list = "order/so/", e.sales_order_issue = "order/so/:id/issue/", e.sales_order_hold = "order/so/:id/hold/", e.sales_order_cancel = "order/so/:id/cancel/", e.sales_order_ship = "order/so/:id/ship/", e.sales_order_complete = "order/so/:id/complete/", e.sales_order_allocate = "order/so/:id/allocate/", e.sales_order_allocate_serials = "order/so/:id/allocate-serials/", e.sales_order_line_list = "order/so-line/", e.sales_order_extra_line_list = "order/so-extra-line/", e.sales_order_allocation_list = "order/so-allocation/", e.sales_order_shipment_list = "order/so/shipment/", e.sales_order_shipment_complete = "order/so/shipment/:id/ship/", e.return_order_list = "order/ro/", e.return_order_issue = "order/ro/:id/issue/", e.return_order_hold = "order/ro/:id/hold/", e.return_order_cancel = "order/ro/:id/cancel/", e.return_order_complete = "order/ro/:id/complete/", e.return_order_receive = "order/ro/:id/receive/", e.return_order_line_list = "order/ro-line/", e.return_order_extra_line_list = "order/ro-extra-line/", e.label_list = "label/template/", e.label_print = "label/print/", e.report_list = "report/template/", e.report_print = "report/print/", e.report_snippet = "report/snippet/", e.report_asset = "report/asset/", e.plugin_list = "plugins/", e.plugin_setting_list = "plugins/:plugin/settings/", e.plugin_user_setting_list = "plugins/:plugin/user-settings/", e.plugin_registry_status = "plugins/status/", e.plugin_install = "plugins/install/", e.plugin_reload = "plugins/reload/", e.plugin_activate = "plugins/:key/activate/", e.plugin_uninstall = "plugins/:key/uninstall/", e.plugin_admin = "plugins/:key/admin/", e.plugin_ui_features_list = "plugins/ui/features/:feature_type/", e.plugin_locate_item = "locate/", e.machine_types_list = "machine/types/", e.machine_driver_list = "machine/drivers/", e.machine_registry_status = "machine/status/", e.machine_list = "machine/", e.machine_restart = "machine/:machine/restart/", e.machine_setting_list = "machine/:machine/settings/", e.machine_setting_detail = "machine/:machine/settings/:config_type/", e.attachment_list = "attachment/", e.error_report_list = "error-report/", e.project_code_list = "project-code/", e.custom_unit_list = "units/", e.notes_image_upload = "notes-image-upload/", e.email_list = "admin/email/", e.email_test = "admin/email/test/", e.config_list = "admin/config/", e))(y || {});
window.LinguiCore.i18n;
window.LinguiCore.i18n;
y.part_list, y.part_parameter_template_list, y.part_test_template_list, y.supplier_part_list, y.manufacturer_part_list, y.category_list, y.stock_item_list, y.stock_location_list, y.stock_location_type_list, y.stock_tracking_list, y.build_order_list, y.build_line_list, y.build_item_list, y.company_list, y.project_code_list, y.purchase_order_list, y.purchase_order_line_list, y.sales_order_list, y.sales_order_shipment_list, y.return_order_list, y.return_order_line_list, y.address_list, y.contact_list, y.owner_list, y.user_list, y.group_list, y.import_session_list, y.label_list, y.report_list, y.plugin_list, y.content_type_list, y.selectionlist_list, y.error_report_list;
function Hr(e) {
  var t;
  const r = ((t = e == null ? void 0 : e.version) == null ? void 0 : t.inventree) || "";
  Ct != r && console.info(`Plugin version mismatch! Expected version ${Ct}, got ${r}`);
}
var Ue = { exports: {} }, Oe = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var St;
function Xr() {
  if (St) return Oe;
  St = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function r(s, n, l) {
    var d = null;
    if (l !== void 0 && (d = "" + l), n.key !== void 0 && (d = "" + n.key), "key" in n) {
      l = {};
      for (var u in n)
        u !== "key" && (l[u] = n[u]);
    } else l = n;
    return n = l.ref, {
      $$typeof: e,
      type: s,
      key: d,
      ref: n !== void 0 ? n : null,
      props: l
    };
  }
  return Oe.Fragment = t, Oe.jsx = r, Oe.jsxs = r, Oe;
}
var Me = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Tt;
function Zr() {
  return Tt || (Tt = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(i) {
      if (i == null) return null;
      if (typeof i == "function")
        return i.$$typeof === N ? null : i.displayName || i.name || null;
      if (typeof i == "string") return i;
      switch (i) {
        case F:
          return "Fragment";
        case V:
          return "Profiler";
        case O:
          return "StrictMode";
        case B:
          return "Suspense";
        case z:
          return "SuspenseList";
        case A:
          return "Activity";
      }
      if (typeof i == "object")
        switch (typeof i.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), i.$$typeof) {
          case P:
            return "Portal";
          case H:
            return (i.displayName || "Context") + ".Provider";
          case J:
            return (i._context.displayName || "Context") + ".Consumer";
          case M:
            var a = i.render;
            return i = i.displayName, i || (i = a.displayName || a.name || "", i = i !== "" ? "ForwardRef(" + i + ")" : "ForwardRef"), i;
          case Le:
            return a = i.displayName || null, a !== null ? a : e(i.type) || "Memo";
          case I:
            a = i._payload, i = i._init;
            try {
              return e(i(a));
            } catch {
            }
        }
      return null;
    }
    function t(i) {
      return "" + i;
    }
    function r(i) {
      try {
        t(i);
        var a = !1;
      } catch {
        a = !0;
      }
      if (a) {
        a = console;
        var h = a.error, g = typeof Symbol == "function" && Symbol.toStringTag && i[Symbol.toStringTag] || i.constructor.name || "Object";
        return h.call(
          a,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          g
        ), t(i);
      }
    }
    function s(i) {
      if (i === F) return "<>";
      if (typeof i == "object" && i !== null && i.$$typeof === I)
        return "<...>";
      try {
        var a = e(i);
        return a ? "<" + a + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function n() {
      var i = Q.A;
      return i === null ? null : i.getOwner();
    }
    function l() {
      return Error("react-stack-top-frame");
    }
    function d(i) {
      if (D.call(i, "key")) {
        var a = Object.getOwnPropertyDescriptor(i, "key").get;
        if (a && a.isReactWarning) return !1;
      }
      return i.key !== void 0;
    }
    function u(i, a) {
      function h() {
        de || (de = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          a
        ));
      }
      h.isReactWarning = !0, Object.defineProperty(i, "key", {
        get: h,
        configurable: !0
      });
    }
    function f() {
      var i = e(this.type);
      return ye[i] || (ye[i] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), i = this.props.ref, i !== void 0 ? i : null;
    }
    function k(i, a, h, g, C, j, ne, T) {
      return h = j.ref, i = {
        $$typeof: m,
        type: i,
        key: a,
        props: j,
        _owner: C
      }, (h !== void 0 ? h : null) !== null ? Object.defineProperty(i, "ref", {
        enumerable: !1,
        get: f
      }) : Object.defineProperty(i, "ref", { enumerable: !1, value: null }), i._store = {}, Object.defineProperty(i._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(i, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(i, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: ne
      }), Object.defineProperty(i, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: T
      }), Object.freeze && (Object.freeze(i.props), Object.freeze(i)), i;
    }
    function v(i, a, h, g, C, j, ne, T) {
      var x = a.children;
      if (x !== void 0)
        if (g)
          if (X(x)) {
            for (g = 0; g < x.length; g++)
              _(x[g]);
            Object.freeze && Object.freeze(x);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else _(x);
      if (D.call(a, "key")) {
        x = e(i);
        var W = Object.keys(a).filter(function(Ht) {
          return Ht !== "key";
        });
        g = 0 < W.length ? "{key: someKey, " + W.join(": ..., ") + ": ...}" : "{key: someKey}", Ce[x + g] || (W = 0 < W.length ? "{" + W.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          g,
          x,
          W,
          x
        ), Ce[x + g] = !0);
      }
      if (x = null, h !== void 0 && (r(h), x = "" + h), d(a) && (r(a.key), x = "" + a.key), "key" in a) {
        h = {};
        for (var Se in a)
          Se !== "key" && (h[Se] = a[Se]);
      } else h = a;
      return x && u(
        h,
        typeof i == "function" ? i.displayName || i.name || "Unknown" : i
      ), k(
        i,
        x,
        j,
        C,
        n(),
        h,
        ne,
        T
      );
    }
    function _(i) {
      typeof i == "object" && i !== null && i.$$typeof === m && i._store && (i._store.validated = 1);
    }
    var b = window.React, m = Symbol.for("react.transitional.element"), P = Symbol.for("react.portal"), F = Symbol.for("react.fragment"), O = Symbol.for("react.strict_mode"), V = Symbol.for("react.profiler"), J = Symbol.for("react.consumer"), H = Symbol.for("react.context"), M = Symbol.for("react.forward_ref"), B = Symbol.for("react.suspense"), z = Symbol.for("react.suspense_list"), Le = Symbol.for("react.memo"), I = Symbol.for("react.lazy"), A = Symbol.for("react.activity"), N = Symbol.for("react.client.reference"), Q = b.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, D = Object.prototype.hasOwnProperty, X = Array.isArray, be = console.createTask ? console.createTask : function() {
      return null;
    };
    b = {
      react_stack_bottom_frame: function(i) {
        return i();
      }
    };
    var de, ye = {}, ke = b.react_stack_bottom_frame.bind(
      b,
      l
    )(), Re = be(s(l)), Ce = {};
    Me.Fragment = F, Me.jsx = function(i, a, h, g, C) {
      var j = 1e4 > Q.recentlyCreatedOwnerStacks++;
      return v(
        i,
        a,
        h,
        !1,
        g,
        C,
        j ? Error("react-stack-top-frame") : ke,
        j ? be(s(i)) : Re
      );
    }, Me.jsxs = function(i, a, h, g, C) {
      var j = 1e4 > Q.recentlyCreatedOwnerStacks++;
      return v(
        i,
        a,
        h,
        !0,
        g,
        C,
        j ? Error("react-stack-top-frame") : ke,
        j ? be(s(i)) : Re
      );
    };
  })()), Me;
}
var xt;
function Kr() {
  return xt || (xt = 1, process.env.NODE_ENV === "production" ? Ue.exports = Xr() : Ue.exports = Zr()), Ue.exports;
}
Kr();
window.MantineCore.ActionIcon;
window.MantineCore.Group;
window.MantineCore.Tooltip;
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Ar = {
  outline: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  },
  filled: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none"
  }
};
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ea = window.React.forwardRef, Ge = window.React.createElement, se = (e, t, r, s) => {
  const n = ea(
    ({ color: l = "currentColor", size: d = 24, stroke: u = 2, title: f, className: k, children: v, ..._ }, b) => Ge(
      "svg",
      {
        ref: b,
        ...Ar[e],
        width: d,
        height: d,
        className: ["tabler-icon", `tabler-icon-${t}`, k].join(" "),
        strokeWidth: u,
        stroke: l,
        ..._
      },
      [
        f && Ge("title", { key: "svg-title" }, f),
        ...s.map(([m, P]) => Ge(m, P)),
        ...Array.isArray(v) ? v : [v]
      ]
    )
  );
  return n.displayName = `${r}`, n;
};
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ta = [["path", { d: "M12 5l0 14", key: "svg-0" }], ["path", { d: "M5 12l14 0", key: "svg-1" }]];
se("outline", "plus", "Plus", ta);
window.MantineCore.ActionIcon;
window.MantineCore.Menu;
window.MantineCore.Tooltip;
window.MantineCore.Progress;
window.MantineCore.Stack;
window.MantineCore.Text;
window.React.useMemo;
window.LinguiCore.i18n;
window.MantineCore.Badge;
window.MantineCore.Skeleton;
window.React.useState;
window.React.useRef;
window.React.useCallback;
window.React.useEffect;
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ra = [["path", { d: "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", key: "svg-0" }], ["path", { d: "M21 21l-6 -6", key: "svg-1" }]];
se("outline", "search", "Search", ra);
window.LinguiCore.i18n;
window.MantineCore.CloseButton;
window.MantineCore.TextInput;
window.React.useEffect;
window.React.useState;
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aa = [["path", { d: "M5 12l14 0", key: "svg-0" }], ["path", { d: "M13 18l6 -6", key: "svg-1" }], ["path", { d: "M13 6l6 6", key: "svg-2" }]];
se("outline", "arrow-right", "ArrowRight", aa);
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sa = [["path", { d: "M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z", key: "svg-0" }], ["path", { d: "M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1", key: "svg-1" }]];
se("outline", "copy", "Copy", sa);
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const na = [["path", { d: "M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1", key: "svg-0" }], ["path", { d: "M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z", key: "svg-1" }], ["path", { d: "M16 5l3 3", key: "svg-2" }]];
se("outline", "edit", "Edit", na);
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oa = [["path", { d: "M4 7l16 0", key: "svg-0" }], ["path", { d: "M10 11l0 6", key: "svg-1" }], ["path", { d: "M14 11l0 6", key: "svg-2" }], ["path", { d: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12", key: "svg-3" }], ["path", { d: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3", key: "svg-4" }]];
se("outline", "trash", "Trash", oa);
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ia = [["path", { d: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", key: "svg-0" }], ["path", { d: "M10 10l4 4m0 -4l-4 4", key: "svg-1" }]];
se("outline", "circle-x", "CircleX", ia);
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const la = [["path", { d: "M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-0" }], ["path", { d: "M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-1" }], ["path", { d: "M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-2" }]];
se("outline", "dots", "Dots", la);
window.LinguiCore.i18n;
window.MantineCore.ActionIcon;
window.MantineCore.Menu;
window.MantineCore.Tooltip;
window.React.useMemo;
window.React.useState;
const Ot = window.React, ca = window.LinguiReact.I18nProvider, Mt = window.LinguiCore.i18n;
function ua({
  locale: e,
  children: t
}) {
  return Ot.useEffect(() => {
    Mt.activate(e);
  }, [e]), /* @__PURE__ */ Ot.createElement(ca, { i18n: Mt }, t);
}
const c = window.React, Pe = window.React.useCallback, Ye = window.React.useMemo, qe = window.React.useState, Et = window.MantineCore.ActionIcon, Pt = window.MantineCore.Alert, da = window.MantineCore.Anchor, ha = window.MantineCore.Avatar, Ve = window.MantineCore.Badge, we = window.MantineCore.Box, fa = window.MantineCore.CloseButton, _a = window.MantineCore.Collapse, ma = window.MantineCore.Divider, G = window.MantineCore.Group, ga = window.MantineCore.Loader, Nt = window.MantineCore.Paper, pa = window.MantineCore.Progress, va = window.MantineCore.SegmentedControl, Je = window.MantineCore.Stack, U = window.MantineCore.Text, wa = window.MantineCore.TextInput, It = window.MantineCore.Title, jt = window.MantineCore.Tooltip, ba = window.MantineCore.UnstyledButton;
function ya(e, t) {
  const r = [];
  function s(n, l) {
    for (const d of n)
      r.push(`${t}-${d.id ?? "none"}-${l}`), d.children && d.children.length > 0 && s(d.children, l + 1);
  }
  return s(e, 0), r;
}
function ct(e) {
  let t = e.parts ? e.parts.length : 0;
  if (e.children)
    for (const r of e.children)
      t += ct(r);
  return t;
}
function ka(e, t) {
  if (!t) return e;
  const r = t.toLowerCase();
  function s(n) {
    const l = n.parts.filter(
      (u) => u.name.toLowerCase().includes(r) || u.IPN && u.IPN.toLowerCase().includes(r) || u.description && u.description.toLowerCase().includes(r)
    ), d = n.children.map(s).filter((u) => u !== null);
    return l.length > 0 || d.length > 0 ? {
      ...n,
      parts: l,
      children: d
    } : null;
  }
  return e.map(s).filter((n) => n !== null);
}
function Ra(e) {
  const t = e.total_stock ?? 0, r = e.minimum_stock ?? 0;
  return t <= 0 ? {
    label: "Out of Stock",
    color: "red",
    progressColor: "red",
    progressValue: 0
  } : e.is_low_stock || r > 0 && t < r ? {
    label: "Low Stock",
    color: "orange",
    progressColor: "orange",
    progressValue: r > 0 ? Math.min(t / r * 100, 100) : 50
  } : {
    label: "In Stock",
    color: "green",
    progressColor: "teal",
    progressValue: r > 0 ? Math.min(t / r * 100, 100) : 100
  };
}
function Ca(e, t = !1) {
  if (t && e.quantity_at_location !== void 0)
    return `${e.quantity_at_location}`;
  const r = e.total_stock ?? 0, s = e.minimum_stock ?? 0;
  return s > 0 ? `${r} / ${s}` : `${r}`;
}
function Sa({
  part: e,
  context: t,
  showLocationQty: r = !1
}) {
  const s = Ra(e), n = Pe(() => {
    t.navigate(`/part/${e.id}/`);
  }, [t, e.id]);
  return /* @__PURE__ */ c.createElement(
    we,
    {
      px: "md",
      py: "xs",
      style: {
        display: "grid",
        gridTemplateColumns: "minmax(200px, 2fr) minmax(100px, 1fr) 100px minmax(120px, 1fr)",
        gap: "16px",
        alignItems: "center",
        borderBottom: "1px solid var(--mantine-color-gray-2)"
      },
      className: "part-row"
    },
    /* @__PURE__ */ c.createElement(G, { gap: "sm", wrap: "nowrap", style: { paddingLeft: "32px" } }, /* @__PURE__ */ c.createElement(
      ha,
      {
        src: e.thumbnail || e.image,
        size: "sm",
        radius: "sm",
        color: "gray"
      },
      e.name.charAt(0)
    ), /* @__PURE__ */ c.createElement(we, { style: { minWidth: 0, flex: 1 } }, /* @__PURE__ */ c.createElement(
      da,
      {
        size: "sm",
        fw: 500,
        onClick: n,
        style: { cursor: "pointer" },
        truncate: !0
      },
      e.name
    ), e.IPN && /* @__PURE__ */ c.createElement(U, { size: "xs", c: "dimmed", truncate: !0 }, e.IPN))),
    /* @__PURE__ */ c.createElement(U, { size: "sm", c: "dimmed", lineClamp: 1 }, e.description || "-"),
    /* @__PURE__ */ c.createElement(
      Ve,
      {
        color: s.color,
        size: "sm",
        variant: "light",
        leftSection: s.label === "Low Stock" ? /* @__PURE__ */ c.createElement(ot, { size: 10 }) : null
      },
      s.label
    ),
    /* @__PURE__ */ c.createElement(G, { gap: "sm", wrap: "nowrap", justify: "flex-end" }, /* @__PURE__ */ c.createElement(
      pa,
      {
        value: s.progressValue,
        color: s.progressColor,
        size: "sm",
        style: { width: 80 }
      }
    ), /* @__PURE__ */ c.createElement(U, { size: "sm", fw: 500, style: { minWidth: 60, textAlign: "right" } }, Ca(e, r)))
  );
}
function Ta({
  group: e,
  isExpanded: t,
  onToggle: r,
  level: s = 0,
  icon: n
}) {
  const l = Ye(() => ct(e), [e]);
  return l === 0 ? null : /* @__PURE__ */ c.createElement(
    ba,
    {
      onClick: r,
      w: "100%",
      px: "md",
      py: "xs",
      style: {
        backgroundColor: "var(--mantine-color-gray-1)",
        borderBottom: "1px solid var(--mantine-color-gray-3)"
      }
    },
    /* @__PURE__ */ c.createElement(G, { gap: "xs", wrap: "nowrap", style: { paddingLeft: s * 16 } }, t ? /* @__PURE__ */ c.createElement(Fr, { size: 16, color: "gray" }) : /* @__PURE__ */ c.createElement(Dr, { size: 16, color: "gray" }), n, /* @__PURE__ */ c.createElement(U, { size: "sm", fw: 600, style: { flex: 1 } }, e.name), /* @__PURE__ */ c.createElement(Ve, { color: "gray", size: "sm", variant: "light" }, l))
  );
}
function Jt({
  group: e,
  context: t,
  expandedGroups: r,
  toggleGroup: s,
  level: n = 0,
  prefix: l,
  isLocationView: d = !1
}) {
  const u = `${l}-${e.id ?? "none"}-${n}`, f = r.has(u);
  if (ct(e) === 0) return null;
  const v = e.parts && e.parts.length > 0, _ = e.children && e.children.length > 0;
  return /* @__PURE__ */ c.createElement(we, null, /* @__PURE__ */ c.createElement(
    Ta,
    {
      group: e,
      isExpanded: f,
      onToggle: () => s(u),
      level: n,
      icon: d ? /* @__PURE__ */ c.createElement(qt, { size: 16, color: "gray" }) : /* @__PURE__ */ c.createElement(Gt, { size: 16, color: "gray" })
    }
  ), /* @__PURE__ */ c.createElement(_a, { in: f }, v && /* @__PURE__ */ c.createElement(we, null, e.parts.map((b) => /* @__PURE__ */ c.createElement(
    Sa,
    {
      key: `part-${b.id}-${e.id}`,
      part: b,
      context: t,
      showLocationQty: d
    }
  ))), _ && e.children.map((b) => /* @__PURE__ */ c.createElement(
    Jt,
    {
      key: `child-${b.id ?? "none"}-${n + 1}`,
      group: b,
      context: t,
      expandedGroups: r,
      toggleGroup: s,
      level: n + 1,
      prefix: l,
      isLocationView: d
    }
  ))));
}
function xa({ showLocationQty: e = !1 }) {
  return /* @__PURE__ */ c.createElement(
    we,
    {
      px: "md",
      py: "xs",
      style: {
        display: "grid",
        gridTemplateColumns: "minmax(200px, 2fr) minmax(100px, 1fr) 100px minmax(120px, 1fr)",
        gap: "16px",
        backgroundColor: "var(--mantine-color-gray-2)",
        borderBottom: "1px solid var(--mantine-color-gray-3)"
      }
    },
    /* @__PURE__ */ c.createElement(U, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase", style: { paddingLeft: "32px" } }, "Part Name"),
    /* @__PURE__ */ c.createElement(U, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "Description"),
    /* @__PURE__ */ c.createElement(U, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "Status"),
    /* @__PURE__ */ c.createElement(U, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase", ta: "right" }, e ? "Qty at Location" : "Stock Level")
  );
}
function Oa({
  value: e,
  onChange: t
}) {
  return /* @__PURE__ */ c.createElement(
    wa,
    {
      value: e,
      placeholder: "Search parts by name, IPN, or description...",
      leftSection: /* @__PURE__ */ c.createElement(Gr, { size: 16 }),
      rightSection: e.length > 0 ? /* @__PURE__ */ c.createElement(fa, { size: "sm", onClick: () => t("") }) : null,
      onChange: (r) => t(r.target.value),
      style: { flex: 1, maxWidth: 400 }
    }
  );
}
function Ma({
  context: e
}) {
  const [t, r] = qe("category"), [s, n] = qe(""), [l] = Zt(s, 300), [d, u] = qe(/* @__PURE__ */ new Set()), { data: f, isLoading: k, isError: v, error: _ } = Pr(
    {
      queryKey: ["critical-components", t],
      queryFn: async () => (await e.api.get(
        `/plugin/criticalcomponents/list/?group_by=${t}`
      )).data
    },
    e.queryClient
  ), b = Ye(() => f ? t === "location" ? f.locations ?? [] : f.categories ?? [] : [], [f, t]), m = Ye(() => ka(b, l), [b, l]), P = Ye(() => ya(m, t === "location" ? "loc" : "cat"), [m, t]), F = Pe((M) => {
    u((B) => {
      const z = new Set(B);
      return z.has(M) ? z.delete(M) : z.add(M), z;
    });
  }, []), O = Pe(() => {
    u(new Set(P));
  }, [P]), V = Pe(() => {
    u(/* @__PURE__ */ new Set());
  }, []), J = Pe((M) => {
    r(M), u(/* @__PURE__ */ new Set());
  }, []);
  if (c.useEffect(() => {
    if (m.length > 0 && d.size === 0) {
      const M = t === "location" ? "loc" : "cat", B = m.map(
        (z) => `${M}-${z.id ?? "none"}-0`
      );
      u(new Set(B));
    }
  }, [m.length, t]), k)
    return /* @__PURE__ */ c.createElement(Je, { align: "center", justify: "center", p: "xl" }, /* @__PURE__ */ c.createElement(ga, { size: "lg" }), /* @__PURE__ */ c.createElement(U, { c: "dimmed" }, "Loading critical components..."));
  if (v)
    return /* @__PURE__ */ c.createElement(
      Pt,
      {
        icon: /* @__PURE__ */ c.createElement(Jr, { size: 16 }),
        title: "Error Loading Data",
        color: "red",
        variant: "light"
      },
      _ instanceof Error ? _.message : "Failed to load critical components"
    );
  if (!f || f.total_parts === 0)
    return /* @__PURE__ */ c.createElement(Je, { gap: "md" }, /* @__PURE__ */ c.createElement(G, { justify: "space-between" }, /* @__PURE__ */ c.createElement(It, { order: 3 }, "Critical Components")), /* @__PURE__ */ c.createElement(
      Pt,
      {
        icon: /* @__PURE__ */ c.createElement(ot, { size: 16 }),
        title: "No Critical Components Found",
        color: "gray",
        variant: "light"
      },
      /* @__PURE__ */ c.createElement(U, { size: "sm" }, "No parts have been marked as critical components."),
      /* @__PURE__ */ c.createElement(U, { size: "xs", c: "dimmed", mt: "xs" }, 'To mark a part as critical, add the "CriticalComponent" parameter to a part and set its value to "True".')
    ));
  const H = t === "location" ? "loc" : "cat";
  return /* @__PURE__ */ c.createElement(Je, { gap: "md" }, /* @__PURE__ */ c.createElement(G, { justify: "space-between", wrap: "wrap" }, /* @__PURE__ */ c.createElement(G, { gap: "sm" }, /* @__PURE__ */ c.createElement(It, { order: 3 }, "Critical Components"), /* @__PURE__ */ c.createElement(Ve, { color: "blue", size: "lg" }, f.total_parts, " Parts"), f.total_critical_low_stock > 0 && /* @__PURE__ */ c.createElement(Ve, { color: "orange", size: "lg", leftSection: /* @__PURE__ */ c.createElement(ot, { size: 12 }) }, f.total_critical_low_stock, " Low Stock"))), /* @__PURE__ */ c.createElement(Nt, { p: "sm", withBorder: !0 }, /* @__PURE__ */ c.createElement(G, { justify: "space-between", wrap: "wrap", gap: "sm" }, /* @__PURE__ */ c.createElement(Oa, { value: s, onChange: n }), /* @__PURE__ */ c.createElement(G, { gap: "xs" }, /* @__PURE__ */ c.createElement(
    va,
    {
      value: t,
      onChange: J,
      data: [
        {
          label: /* @__PURE__ */ c.createElement(G, { gap: 4 }, /* @__PURE__ */ c.createElement(Gt, { size: 14 }), /* @__PURE__ */ c.createElement("span", null, "Category")),
          value: "category"
        },
        {
          label: /* @__PURE__ */ c.createElement(G, { gap: 4 }, /* @__PURE__ */ c.createElement(qt, { size: 14 }), /* @__PURE__ */ c.createElement("span", null, "Location")),
          value: "location"
        }
      ],
      size: "xs"
    }
  ), /* @__PURE__ */ c.createElement(ma, { orientation: "vertical" }), /* @__PURE__ */ c.createElement(jt, { label: "Expand All" }, /* @__PURE__ */ c.createElement(Et, { variant: "light", onClick: O }, /* @__PURE__ */ c.createElement(Yr, { size: 16 }))), /* @__PURE__ */ c.createElement(jt, { label: "Collapse All" }, /* @__PURE__ */ c.createElement(Et, { variant: "light", onClick: V }, /* @__PURE__ */ c.createElement(Br, { size: 16 })))))), l && /* @__PURE__ */ c.createElement(U, { size: "sm", c: "dimmed" }, 'Showing results for "', l, '"', m.length === 0 && " - No matching parts found"), m.length > 0 && /* @__PURE__ */ c.createElement(Nt, { withBorder: !0, style: { overflow: "hidden" } }, /* @__PURE__ */ c.createElement(xa, { showLocationQty: t === "location" }), /* @__PURE__ */ c.createElement(we, { style: { maxHeight: "60vh", overflowY: "auto" } }, m.map((M) => /* @__PURE__ */ c.createElement(
    Jt,
    {
      key: `group-${M.id ?? "none"}-0`,
      group: M,
      context: e,
      expandedGroups: d,
      toggleGroup: F,
      level: 0,
      prefix: H,
      isLocationView: t === "location"
    }
  )))));
}
function Pa(e) {
  return Hr(e), /* @__PURE__ */ c.createElement(ua, { locale: e.locale }, /* @__PURE__ */ c.createElement(Ma, { context: e }));
}
export {
  Pa as default,
  Pa as renderPanel
};
