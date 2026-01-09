var Ve = (e) => {
  throw TypeError(e);
};
var ve = (e, t, r) => t.has(e) || Ve("Cannot " + r);
var s = (e, t, r) => (ve(e, t, "read from private field"), r ? r.call(e) : t.get(e)), y = (e, t, r) => t.has(e) ? Ve("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), _ = (e, t, r, n) => (ve(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), b = (e, t, r) => (ve(e, t, "access private method"), r);
const St = window.React.useState, ye = window.React.useRef, Je = window.React.useEffect;
function It(e, t, r = { leading: !1 }) {
  const [n, a] = St(e), i = ye(!1), c = ye(null), l = ye(!1), u = () => window.clearTimeout(c.current);
  return Je(() => {
    i.current && (!l.current && r.leading ? (l.current = !0, a(e)) : (u(), c.current = window.setTimeout(() => {
      l.current = !1, a(e);
    }, t)));
  }, [e, r.leading, t]), Je(() => (i.current = !0, u), []), [n, u];
}
var Be = class {
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
}, Tt = {
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
}, j, Qe, dt, Lt = (dt = class {
  constructor() {
    // We cannot have TimeoutManager<T> as we must instantiate it with a concrete
    // type at app boot; and if we leave that type, then any new timer provider
    // would need to support ReturnType<typeof setTimeout>, which is infeasible.
    //
    // We settle for type safety for the TimeoutProvider type, and accept that
    // this class is unsafe internally to allow for extension.
    y(this, j, Tt);
    y(this, Qe, !1);
  }
  setTimeoutProvider(e) {
    _(this, j, e);
  }
  setTimeout(e, t) {
    return s(this, j).setTimeout(e, t);
  }
  clearTimeout(e) {
    s(this, j).clearTimeout(e);
  }
  setInterval(e, t) {
    return s(this, j).setInterval(e, t);
  }
  clearInterval(e) {
    s(this, j).clearInterval(e);
  }
}, j = new WeakMap(), Qe = new WeakMap(), dt), fe = new Lt();
function Pt(e) {
  setTimeout(e, 0);
}
var ue = typeof window > "u" || "Deno" in globalThis;
function Se() {
}
function We(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function $t(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function ce(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function T(e, t) {
  return typeof e == "function" ? e(t) : e;
}
var Ot = Object.prototype.hasOwnProperty;
function gt(e, t) {
  if (e === t)
    return e;
  const r = He(e) && He(t);
  if (!r && !(qe(e) && qe(t))) return t;
  const a = (r ? e : Object.keys(e)).length, i = r ? t : Object.keys(t), c = i.length, l = r ? new Array(c) : {};
  let u = 0;
  for (let w = 0; w < c; w++) {
    const p = r ? w : i[w], h = e[p], v = t[p];
    if (h === v) {
      l[p] = h, (r ? w < a : Ot.call(e, p)) && u++;
      continue;
    }
    if (h === null || v === null || typeof h != "object" || typeof v != "object") {
      l[p] = v;
      continue;
    }
    const f = gt(h, v);
    l[p] = f, f === h && u++;
  }
  return a === c && u === a ? e : l;
}
function Ie(e, t) {
  if (!t || Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const r in e)
    if (e[r] !== t[r])
      return !1;
  return !0;
}
function He(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function qe(e) {
  if (!Ye(e))
    return !1;
  const t = e.constructor;
  if (t === void 0)
    return !0;
  const r = t.prototype;
  return !(!Ye(r) || !r.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(e) !== Object.prototype);
}
function Ye(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function Xe(e, t, r) {
  return typeof r.structuralSharing == "function" ? r.structuralSharing(e, t) : r.structuralSharing !== !1 ? gt(e, t) : t;
}
function wt(e, t) {
  return typeof e == "function" ? e(...t) : !!e;
}
var G, z, X, _t, Nt = (_t = class extends Be {
  constructor() {
    super();
    y(this, G);
    y(this, z);
    y(this, X);
    _(this, X, (t) => {
      if (!ue && window.addEventListener) {
        const r = () => t();
        return window.addEventListener("visibilitychange", r, !1), () => {
          window.removeEventListener("visibilitychange", r);
        };
      }
    });
  }
  onSubscribe() {
    s(this, z) || this.setEventListener(s(this, X));
  }
  onUnsubscribe() {
    var t;
    this.hasListeners() || ((t = s(this, z)) == null || t.call(this), _(this, z, void 0));
  }
  setEventListener(t) {
    var r;
    _(this, X, t), (r = s(this, z)) == null || r.call(this), _(this, z, t((n) => {
      typeof n == "boolean" ? this.setFocused(n) : this.onFocus();
    }));
  }
  setFocused(t) {
    s(this, G) !== t && (_(this, G, t), this.onFocus());
  }
  onFocus() {
    const t = this.isFocused();
    this.listeners.forEach((r) => {
      r(t);
    });
  }
  isFocused() {
    var t;
    return typeof s(this, G) == "boolean" ? s(this, G) : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !== "hidden";
  }
}, G = new WeakMap(), z = new WeakMap(), X = new WeakMap(), _t), jt = new Nt();
function Ze() {
  let e, t;
  const r = new Promise((a, i) => {
    e = a, t = i;
  });
  r.status = "pending", r.catch(() => {
  });
  function n(a) {
    Object.assign(r, a), delete r.resolve, delete r.reject;
  }
  return r.resolve = (a) => {
    n({
      status: "fulfilled",
      value: a
    }), e(a);
  }, r.reject = (a) => {
    n({
      status: "rejected",
      reason: a
    }), t(a);
  }, r;
}
var zt = Pt;
function Ft() {
  let e = [], t = 0, r = (l) => {
    l();
  }, n = (l) => {
    l();
  }, a = zt;
  const i = (l) => {
    t ? e.push(l) : a(() => {
      r(l);
    });
  }, c = () => {
    const l = e;
    e = [], l.length && a(() => {
      n(() => {
        l.forEach((u) => {
          r(u);
        });
      });
    });
  };
  return {
    batch: (l) => {
      let u;
      t++;
      try {
        u = l();
      } finally {
        t--, t || c();
      }
      return u;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (l) => (...u) => {
      i(() => {
        l(...u);
      });
    },
    schedule: i,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (l) => {
      r = l;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (l) => {
      n = l;
    },
    setScheduler: (l) => {
      a = l;
    }
  };
}
var pt = Ft(), Z, F, E, mt, Qt = (mt = class extends Be {
  constructor() {
    super();
    y(this, Z, !0);
    y(this, F);
    y(this, E);
    _(this, E, (t) => {
      if (!ue && window.addEventListener) {
        const r = () => t(!0), n = () => t(!1);
        return window.addEventListener("online", r, !1), window.addEventListener("offline", n, !1), () => {
          window.removeEventListener("online", r), window.removeEventListener("offline", n);
        };
      }
    });
  }
  onSubscribe() {
    s(this, F) || this.setEventListener(s(this, E));
  }
  onUnsubscribe() {
    var t;
    this.hasListeners() || ((t = s(this, F)) == null || t.call(this), _(this, F, void 0));
  }
  setEventListener(t) {
    var r;
    _(this, E, t), (r = s(this, F)) == null || r.call(this), _(this, F, t(this.setOnline.bind(this)));
  }
  setOnline(t) {
    s(this, Z) !== t && (_(this, Z, t), this.listeners.forEach((n) => {
      n(t);
    }));
  }
  isOnline() {
    return s(this, Z);
  }
}, Z = new WeakMap(), F = new WeakMap(), E = new WeakMap(), mt), Bt = new Qt();
function Ut(e) {
  return (e ?? "online") === "online" ? Bt.isOnline() : !0;
}
function Dt(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: Ut(t.networkMode) ? "fetching" : "paused",
    ...e === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
var M, d, he, R, V, K, O, Q, de, A, ee, J, W, B, te, g, ie, Te, Le, Pe, $e, Oe, Ne, je, vt, ft, Gt = (ft = class extends Be {
  constructor(t, r) {
    super();
    y(this, g);
    y(this, M);
    y(this, d);
    y(this, he);
    y(this, R);
    y(this, V);
    y(this, K);
    y(this, O);
    y(this, Q);
    y(this, de);
    y(this, A);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    y(this, ee);
    y(this, J);
    y(this, W);
    y(this, B);
    y(this, te, /* @__PURE__ */ new Set());
    this.options = r, _(this, M, t), _(this, Q, null), _(this, O, Ze()), this.bindMethods(), this.setOptions(r);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 && (s(this, d).addObserver(this), Ee(s(this, d), this.options) ? b(this, g, ie).call(this) : this.updateResult(), b(this, g, $e).call(this));
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return ze(
      s(this, d),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return ze(
      s(this, d),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), b(this, g, Oe).call(this), b(this, g, Ne).call(this), s(this, d).removeObserver(this);
  }
  setOptions(t) {
    const r = this.options, n = s(this, d);
    if (this.options = s(this, M).defaultQueryOptions(t), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof T(this.options.enabled, s(this, d)) != "boolean")
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    b(this, g, je).call(this), s(this, d).setOptions(this.options), r._defaulted && !Ie(this.options, r) && s(this, M).getQueryCache().notify({
      type: "observerOptionsUpdated",
      query: s(this, d),
      observer: this
    });
    const a = this.hasListeners();
    a && Ke(
      s(this, d),
      n,
      this.options,
      r
    ) && b(this, g, ie).call(this), this.updateResult(), a && (s(this, d) !== n || T(this.options.enabled, s(this, d)) !== T(r.enabled, s(this, d)) || ce(this.options.staleTime, s(this, d)) !== ce(r.staleTime, s(this, d))) && b(this, g, Te).call(this);
    const i = b(this, g, Le).call(this);
    a && (s(this, d) !== n || T(this.options.enabled, s(this, d)) !== T(r.enabled, s(this, d)) || i !== s(this, B)) && b(this, g, Pe).call(this, i);
  }
  getOptimisticResult(t) {
    const r = s(this, M).getQueryCache().build(s(this, M), t), n = this.createResult(r, t);
    return Jt(this, n) && (_(this, R, n), _(this, K, this.options), _(this, V, s(this, d).state)), n;
  }
  getCurrentResult() {
    return s(this, R);
  }
  trackResult(t, r) {
    return new Proxy(t, {
      get: (n, a) => (this.trackProp(a), r == null || r(a), a === "promise" && (this.trackProp("data"), !this.options.experimental_prefetchInRender && s(this, O).status === "pending" && s(this, O).reject(
        new Error(
          "experimental_prefetchInRender feature flag is not enabled"
        )
      )), Reflect.get(n, a))
    });
  }
  trackProp(t) {
    s(this, te).add(t);
  }
  getCurrentQuery() {
    return s(this, d);
  }
  refetch({ ...t } = {}) {
    return this.fetch({
      ...t
    });
  }
  fetchOptimistic(t) {
    const r = s(this, M).defaultQueryOptions(t), n = s(this, M).getQueryCache().build(s(this, M), r);
    return n.fetch().then(() => this.createResult(n, r));
  }
  fetch(t) {
    return b(this, g, ie).call(this, {
      ...t,
      cancelRefetch: t.cancelRefetch ?? !0
    }).then(() => (this.updateResult(), s(this, R)));
  }
  createResult(t, r) {
    var Ge;
    const n = s(this, d), a = this.options, i = s(this, R), c = s(this, V), l = s(this, K), w = t !== n ? t.state : s(this, he), { state: p } = t;
    let h = { ...p }, v = !1, f;
    if (r._optimisticResults) {
      const S = this.hasListeners(), _e = !S && Ee(t, r), Y = S && Ke(t, n, r, a);
      (_e || Y) && (h = {
        ...h,
        ...Dt(p.data, t.options)
      }), r._optimisticResults === "isRestoring" && (h.fetchStatus = "idle");
    }
    let { error: x, errorUpdatedAt: D, status: C } = h;
    f = h.data;
    let H = !1;
    if (r.placeholderData !== void 0 && f === void 0 && C === "pending") {
      let S;
      i != null && i.isPlaceholderData && r.placeholderData === (l == null ? void 0 : l.placeholderData) ? (S = i.data, H = !0) : S = typeof r.placeholderData == "function" ? r.placeholderData(
        (Ge = s(this, ee)) == null ? void 0 : Ge.state.data,
        s(this, ee)
      ) : r.placeholderData, S !== void 0 && (C = "success", f = Xe(
        i == null ? void 0 : i.data,
        S,
        r
      ), v = !0);
    }
    if (r.select && f !== void 0 && !H)
      if (i && f === (c == null ? void 0 : c.data) && r.select === s(this, de))
        f = s(this, A);
      else
        try {
          _(this, de, r.select), f = r.select(f), f = Xe(i == null ? void 0 : i.data, f, r), _(this, A, f), _(this, Q, null);
        } catch (S) {
          _(this, Q, S);
        }
    s(this, Q) && (x = s(this, Q), f = s(this, A), D = Date.now(), C = "error");
    const se = h.fetchStatus === "fetching", ae = C === "pending", k = C === "error", q = ae && se, $ = f !== void 0, L = {
      status: C,
      fetchStatus: h.fetchStatus,
      isPending: ae,
      isSuccess: C === "success",
      isError: k,
      isInitialLoading: q,
      isLoading: q,
      data: f,
      dataUpdatedAt: h.dataUpdatedAt,
      error: x,
      errorUpdatedAt: D,
      failureCount: h.fetchFailureCount,
      failureReason: h.fetchFailureReason,
      errorUpdateCount: h.errorUpdateCount,
      isFetched: h.dataUpdateCount > 0 || h.errorUpdateCount > 0,
      isFetchedAfterMount: h.dataUpdateCount > w.dataUpdateCount || h.errorUpdateCount > w.errorUpdateCount,
      isFetching: se,
      isRefetching: se && !ae,
      isLoadingError: k && !$,
      isPaused: h.fetchStatus === "paused",
      isPlaceholderData: v,
      isRefetchError: k && $,
      isStale: Ue(t, r),
      refetch: this.refetch,
      promise: s(this, O),
      isEnabled: T(r.enabled, t) !== !1
    };
    if (this.options.experimental_prefetchInRender) {
      const S = (me) => {
        L.status === "error" ? me.reject(L.error) : L.data !== void 0 && me.resolve(L.data);
      }, _e = () => {
        const me = _(this, O, L.promise = Ze());
        S(me);
      }, Y = s(this, O);
      switch (Y.status) {
        case "pending":
          t.queryHash === n.queryHash && S(Y);
          break;
        case "fulfilled":
          (L.status === "error" || L.data !== Y.value) && _e();
          break;
        case "rejected":
          (L.status !== "error" || L.error !== Y.reason) && _e();
          break;
      }
    }
    return L;
  }
  updateResult() {
    const t = s(this, R), r = this.createResult(s(this, d), this.options);
    if (_(this, V, s(this, d).state), _(this, K, this.options), s(this, V).data !== void 0 && _(this, ee, s(this, d)), Ie(r, t))
      return;
    _(this, R, r);
    const n = () => {
      if (!t)
        return !0;
      const { notifyOnChangeProps: a } = this.options, i = typeof a == "function" ? a() : a;
      if (i === "all" || !i && !s(this, te).size)
        return !0;
      const c = new Set(
        i ?? s(this, te)
      );
      return this.options.throwOnError && c.add("error"), Object.keys(s(this, R)).some((l) => {
        const u = l;
        return s(this, R)[u] !== t[u] && c.has(u);
      });
    };
    b(this, g, vt).call(this, { listeners: n() });
  }
  onQueryUpdate() {
    this.updateResult(), this.hasListeners() && b(this, g, $e).call(this);
  }
}, M = new WeakMap(), d = new WeakMap(), he = new WeakMap(), R = new WeakMap(), V = new WeakMap(), K = new WeakMap(), O = new WeakMap(), Q = new WeakMap(), de = new WeakMap(), A = new WeakMap(), ee = new WeakMap(), J = new WeakMap(), W = new WeakMap(), B = new WeakMap(), te = new WeakMap(), g = new WeakSet(), ie = function(t) {
  b(this, g, je).call(this);
  let r = s(this, d).fetch(
    this.options,
    t
  );
  return t != null && t.throwOnError || (r = r.catch(Se)), r;
}, Te = function() {
  b(this, g, Oe).call(this);
  const t = ce(
    this.options.staleTime,
    s(this, d)
  );
  if (ue || s(this, R).isStale || !We(t))
    return;
  const n = $t(s(this, R).dataUpdatedAt, t) + 1;
  _(this, J, fe.setTimeout(() => {
    s(this, R).isStale || this.updateResult();
  }, n));
}, Le = function() {
  return (typeof this.options.refetchInterval == "function" ? this.options.refetchInterval(s(this, d)) : this.options.refetchInterval) ?? !1;
}, Pe = function(t) {
  b(this, g, Ne).call(this), _(this, B, t), !(ue || T(this.options.enabled, s(this, d)) === !1 || !We(s(this, B)) || s(this, B) === 0) && _(this, W, fe.setInterval(() => {
    (this.options.refetchIntervalInBackground || jt.isFocused()) && b(this, g, ie).call(this);
  }, s(this, B)));
}, $e = function() {
  b(this, g, Te).call(this), b(this, g, Pe).call(this, b(this, g, Le).call(this));
}, Oe = function() {
  s(this, J) && (fe.clearTimeout(s(this, J)), _(this, J, void 0));
}, Ne = function() {
  s(this, W) && (fe.clearInterval(s(this, W)), _(this, W, void 0));
}, je = function() {
  const t = s(this, M).getQueryCache().build(s(this, M), this.options);
  if (t === s(this, d))
    return;
  const r = s(this, d);
  _(this, d, t), _(this, he, t.state), this.hasListeners() && (r == null || r.removeObserver(this), t.addObserver(this));
}, vt = function(t) {
  pt.batch(() => {
    t.listeners && this.listeners.forEach((r) => {
      r(s(this, R));
    }), s(this, M).getQueryCache().notify({
      query: s(this, d),
      type: "observerResultsUpdated"
    });
  });
}, ft);
function Vt(e, t) {
  return T(t.enabled, e) !== !1 && e.state.data === void 0 && !(e.state.status === "error" && t.retryOnMount === !1);
}
function Ee(e, t) {
  return Vt(e, t) || e.state.data !== void 0 && ze(e, t, t.refetchOnMount);
}
function ze(e, t, r) {
  if (T(t.enabled, e) !== !1 && ce(t.staleTime, e) !== "static") {
    const n = typeof r == "function" ? r(e) : r;
    return n === "always" || n !== !1 && Ue(e, t);
  }
  return !1;
}
function Ke(e, t, r, n) {
  return (e !== t || T(n.enabled, e) === !1) && (!r.suspense || e.state.status !== "error") && Ue(e, r);
}
function Ue(e, t) {
  return T(t.enabled, e) !== !1 && e.isStaleByTime(ce(t.staleTime, e));
}
function Jt(e, t) {
  return !Ie(e.getCurrentResult(), t);
}
var be = { exports: {} }, ne = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ae;
function Wt() {
  if (Ae) return ne;
  Ae = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function r(n, a, i) {
    var c = null;
    if (i !== void 0 && (c = "" + i), a.key !== void 0 && (c = "" + a.key), "key" in a) {
      i = {};
      for (var l in a)
        l !== "key" && (i[l] = a[l]);
    } else i = a;
    return a = i.ref, {
      $$typeof: e,
      type: n,
      key: c,
      ref: a !== void 0 ? a : null,
      props: i
    };
  }
  return ne.Fragment = t, ne.jsx = r, ne.jsxs = r, ne;
}
var et;
function Ht() {
  return et || (et = 1, be.exports = Wt()), be.exports;
}
Ht();
const yt = window.React;
var qt = yt.createContext(
  void 0
), Yt = (e) => {
  const t = yt.useContext(qt);
  if (e)
    return e;
  if (!t)
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  return t;
};
const bt = window.React;
var kt = bt.createContext(!1), Xt = () => bt.useContext(kt);
kt.Provider;
const Ct = window.React;
function Zt() {
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
var Et = Ct.createContext(Zt()), Kt = () => Ct.useContext(Et);
const At = window.React;
var er = (e, t, r) => {
  const n = r != null && r.state.error && typeof e.throwOnError == "function" ? wt(e.throwOnError, [r.state.error, r]) : e.throwOnError;
  (e.suspense || e.experimental_prefetchInRender || n) && (t.isReset() || (e.retryOnMount = !1));
}, tr = (e) => {
  At.useEffect(() => {
    e.clearReset();
  }, [e]);
}, rr = ({
  result: e,
  errorResetBoundary: t,
  throwOnError: r,
  query: n,
  suspense: a
}) => e.isError && !t.isReset() && !e.isFetching && n && (a && e.data === void 0 || wt(r, [e.error, n])), sr = (e) => {
  if (e.suspense) {
    const r = (a) => a === "static" ? a : Math.max(a ?? 1e3, 1e3), n = e.staleTime;
    e.staleTime = typeof n == "function" ? (...a) => r(n(...a)) : r(n), typeof e.gcTime == "number" && (e.gcTime = Math.max(
      e.gcTime,
      1e3
    ));
  }
}, ar = (e, t) => e.isLoading && e.isFetching && !t, nr = (e, t) => (e == null ? void 0 : e.suspense) && t.isPending, tt = (e, t, r) => t.fetchOptimistic(e).catch(() => {
  r.clearReset();
});
const ge = window.React;
function or(e, t, r) {
  var v, f, x, D;
  const n = Xt(), a = Kt(), i = Yt(r), c = i.defaultQueryOptions(e);
  (f = (v = i.getDefaultOptions().queries) == null ? void 0 : v._experimental_beforeQuery) == null || f.call(
    v,
    c
  );
  const l = i.getQueryCache().get(c.queryHash);
  c._optimisticResults = n ? "isRestoring" : "optimistic", sr(c), er(c, a, l), tr(a);
  const u = !i.getQueryCache().get(c.queryHash), [w] = ge.useState(
    () => new t(
      i,
      c
    )
  ), p = w.getOptimisticResult(c), h = !n && e.subscribed !== !1;
  if (ge.useSyncExternalStore(
    ge.useCallback(
      (C) => {
        const H = h ? w.subscribe(pt.batchCalls(C)) : Se;
        return w.updateResult(), H;
      },
      [w, h]
    ),
    () => w.getCurrentResult(),
    () => w.getCurrentResult()
  ), ge.useEffect(() => {
    w.setOptions(c);
  }, [c, w]), nr(c, p))
    throw tt(c, w, a);
  if (rr({
    result: p,
    errorResetBoundary: a,
    throwOnError: c.throwOnError,
    query: l,
    suspense: c.suspense
  }))
    throw p.error;
  if ((D = (x = i.getDefaultOptions().queries) == null ? void 0 : x._experimental_afterQuery) == null || D.call(
    x,
    c,
    p
  ), c.experimental_prefetchInRender && !ue && ar(p, n)) {
    const C = u ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      tt(c, w, a)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      l == null ? void 0 : l.promise
    );
    C == null || C.catch(Se).finally(() => {
      w.updateResult();
    });
  }
  return c.notifyOnChangeProps ? p : w.trackResult(p);
}
function ir(e, t) {
  return or(e, Gt, t);
}
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
var lr = {
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
const cr = window.React.forwardRef, ke = window.React.createElement, N = (e, t, r, n) => {
  const a = cr(
    ({ color: i = "currentColor", size: c = 24, stroke: l = 2, title: u, className: w, children: p, ...h }, v) => ke(
      "svg",
      {
        ref: v,
        ...lr[e],
        width: c,
        height: c,
        className: ["tabler-icon", `tabler-icon-${t}`, w].join(" "),
        strokeWidth: l,
        stroke: i,
        ...h
      },
      [
        u && ke("title", { key: "svg-title" }, u),
        ...n.map(([f, x]) => ke(f, x)),
        ...Array.isArray(p) ? p : [p]
      ]
    )
  );
  return a.displayName = `${r}`, a;
};
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ur = [["path", { d: "M12 9v4", key: "svg-0" }], ["path", { d: "M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0", key: "svg-1" }], ["path", { d: "M12 16h.01", key: "svg-2" }]], Fe = N("outline", "alert-triangle", "AlertTriangle", ur);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hr = [["path", { d: "M4 4h6v6h-6l0 -6", key: "svg-0" }], ["path", { d: "M14 4h6v6h-6l0 -6", key: "svg-1" }], ["path", { d: "M4 14h6v6h-6l0 -6", key: "svg-2" }], ["path", { d: "M14 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0", key: "svg-3" }]], Rt = N("outline", "category", "Category", hr);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dr = [["path", { d: "M6 9l6 6l6 -6", key: "svg-0" }]], _r = N("outline", "chevron-down", "ChevronDown", dr);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mr = [["path", { d: "M9 6l6 6l-6 6", key: "svg-0" }]], fr = N("outline", "chevron-right", "ChevronRight", mr);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gr = [["path", { d: "M7 7l5 5l5 -5", key: "svg-0" }], ["path", { d: "M7 13l5 5l5 -5", key: "svg-1" }]], wr = N("outline", "chevrons-down", "ChevronsDown", gr);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pr = [["path", { d: "M7 11l5 -5l5 5", key: "svg-0" }], ["path", { d: "M7 17l5 -5l5 5", key: "svg-1" }]], vr = N("outline", "chevrons-up", "ChevronsUp", pr);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yr = [["path", { d: "M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0", key: "svg-0" }], ["path", { d: "M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0", key: "svg-1" }]], xt = N("outline", "map-pin", "MapPin", yr);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const br = [["path", { d: "M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", key: "svg-0" }], ["path", { d: "M21 21l-6 -6", key: "svg-1" }]], kr = N("outline", "search", "Search", br);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cr = [["path", { d: "M18 6l-12 12", key: "svg-0" }], ["path", { d: "M6 6l12 12", key: "svg-1" }]], Rr = N("outline", "x", "X", Cr), rt = "0.7.0";
var m = /* @__PURE__ */ ((e) => (e.api_server_info = "", e.user_list = "user/", e.user_set_password = "user/:id/set-password/", e.user_me = "user/me/", e.user_profile = "user/profile/", e.user_roles = "user/roles/", e.user_token = "user/token/", e.user_tokens = "user/tokens/", e.user_simple_login = "email/generate/", e.user_reset = "auth/v1/auth/password/request", e.user_reset_set = "auth/v1/auth/password/reset", e.auth_pwd_change = "auth/v1/account/password/change", e.auth_login = "auth/v1/auth/login", e.auth_login_2fa = "auth/v1/auth/2fa/authenticate", e.auth_session = "auth/v1/auth/session", e.auth_signup = "auth/v1/auth/signup", e.auth_authenticators = "auth/v1/account/authenticators", e.auth_recovery = "auth/v1/account/authenticators/recovery-codes", e.auth_mfa_reauthenticate = "auth/v1/auth/2fa/reauthenticate", e.auth_totp = "auth/v1/account/authenticators/totp", e.auth_trust = "auth/v1/auth/2fa/trust", e.auth_reauthenticate = "auth/v1/auth/reauthenticate", e.auth_email = "auth/v1/account/email", e.auth_email_verify = "auth/v1/auth/email/verify", e.auth_providers = "auth/v1/account/providers", e.auth_provider_redirect = "auth/v1/auth/provider/redirect", e.auth_config = "auth/v1/config", e.currency_list = "currency/exchange/", e.currency_refresh = "currency/refresh/", e.all_units = "units/all/", e.task_overview = "background-task/", e.task_pending_list = "background-task/pending/", e.task_scheduled_list = "background-task/scheduled/", e.task_failed_list = "background-task/failed/", e.api_search = "search/", e.settings_global_list = "settings/global/", e.settings_user_list = "settings/user/", e.news = "news/", e.global_status = "generic/status/", e.custom_state_list = "generic/status/custom/", e.version = "version/", e.license = "license/", e.group_list = "user/group/", e.owner_list = "user/owner/", e.ruleset_list = "user/ruleset/", e.content_type_list = "contenttype/", e.icons = "icons/", e.selectionlist_list = "selection/", e.selectionlist_detail = "selection/:id/", e.barcode = "barcode/", e.barcode_history = "barcode/history/", e.barcode_link = "barcode/link/", e.barcode_unlink = "barcode/unlink/", e.barcode_generate = "barcode/generate/", e.data_output = "data-output/", e.import_session_list = "importer/session/", e.import_session_accept_fields = "importer/session/:id/accept_fields/", e.import_session_accept_rows = "importer/session/:id/accept_rows/", e.import_session_column_mapping_list = "importer/column-mapping/", e.import_session_row_list = "importer/row/", e.notifications_list = "notifications/", e.notifications_readall = "notifications/readall/", e.build_order_list = "build/", e.build_order_issue = "build/:id/issue/", e.build_order_cancel = "build/:id/cancel/", e.build_order_hold = "build/:id/hold/", e.build_order_complete = "build/:id/finish/", e.build_output_complete = "build/:id/complete/", e.build_output_create = "build/:id/create-output/", e.build_output_scrap = "build/:id/scrap-outputs/", e.build_output_delete = "build/:id/delete-outputs/", e.build_order_auto_allocate = "build/:id/auto-allocate/", e.build_order_allocate = "build/:id/allocate/", e.build_order_consume = "build/:id/consume/", e.build_order_deallocate = "build/:id/unallocate/", e.build_line_list = "build/line/", e.build_item_list = "build/item/", e.bom_list = "bom/", e.bom_item_validate = "bom/:id/validate/", e.bom_validate = "part/:id/bom-validate/", e.bom_substitute_list = "bom/substitute/", e.part_list = "part/", e.part_parameter_list = "part/parameter/", e.part_parameter_template_list = "part/parameter/template/", e.part_thumbs_list = "part/thumbs/", e.part_pricing = "part/:id/pricing/", e.part_requirements = "part/:id/requirements/", e.part_serial_numbers = "part/:id/serial-numbers/", e.part_scheduling = "part/:id/scheduling/", e.part_pricing_internal = "part/internal-price/", e.part_pricing_sale = "part/sale-price/", e.part_stocktake_list = "part/stocktake/", e.category_list = "part/category/", e.category_tree = "part/category/tree/", e.category_parameter_list = "part/category/parameters/", e.related_part_list = "part/related/", e.part_test_template_list = "part/test-template/", e.company_list = "company/", e.contact_list = "company/contact/", e.address_list = "company/address/", e.supplier_part_list = "company/part/", e.supplier_part_pricing_list = "company/price-break/", e.manufacturer_part_list = "company/part/manufacturer/", e.manufacturer_part_parameter_list = "company/part/manufacturer/parameter/", e.stock_location_list = "stock/location/", e.stock_location_type_list = "stock/location-type/", e.stock_location_tree = "stock/location/tree/", e.stock_item_list = "stock/", e.stock_tracking_list = "stock/track/", e.stock_test_result_list = "stock/test/", e.stock_transfer = "stock/transfer/", e.stock_remove = "stock/remove/", e.stock_return = "stock/return/", e.stock_add = "stock/add/", e.stock_count = "stock/count/", e.stock_change_status = "stock/change_status/", e.stock_merge = "stock/merge/", e.stock_assign = "stock/assign/", e.stock_status = "stock/status/", e.stock_install = "stock/:id/install/", e.stock_uninstall = "stock/:id/uninstall/", e.stock_serialize = "stock/:id/serialize/", e.stock_serial_info = "stock/:id/serial-numbers/", e.generate_batch_code = "generate/batch-code/", e.generate_serial_number = "generate/serial-number/", e.purchase_order_list = "order/po/", e.purchase_order_issue = "order/po/:id/issue/", e.purchase_order_hold = "order/po/:id/hold/", e.purchase_order_cancel = "order/po/:id/cancel/", e.purchase_order_complete = "order/po/:id/complete/", e.purchase_order_line_list = "order/po-line/", e.purchase_order_extra_line_list = "order/po-extra-line/", e.purchase_order_receive = "order/po/:id/receive/", e.sales_order_list = "order/so/", e.sales_order_issue = "order/so/:id/issue/", e.sales_order_hold = "order/so/:id/hold/", e.sales_order_cancel = "order/so/:id/cancel/", e.sales_order_ship = "order/so/:id/ship/", e.sales_order_complete = "order/so/:id/complete/", e.sales_order_allocate = "order/so/:id/allocate/", e.sales_order_allocate_serials = "order/so/:id/allocate-serials/", e.sales_order_line_list = "order/so-line/", e.sales_order_extra_line_list = "order/so-extra-line/", e.sales_order_allocation_list = "order/so-allocation/", e.sales_order_shipment_list = "order/so/shipment/", e.sales_order_shipment_complete = "order/so/shipment/:id/ship/", e.return_order_list = "order/ro/", e.return_order_issue = "order/ro/:id/issue/", e.return_order_hold = "order/ro/:id/hold/", e.return_order_cancel = "order/ro/:id/cancel/", e.return_order_complete = "order/ro/:id/complete/", e.return_order_receive = "order/ro/:id/receive/", e.return_order_line_list = "order/ro-line/", e.return_order_extra_line_list = "order/ro-extra-line/", e.label_list = "label/template/", e.label_print = "label/print/", e.report_list = "report/template/", e.report_print = "report/print/", e.report_snippet = "report/snippet/", e.report_asset = "report/asset/", e.plugin_list = "plugins/", e.plugin_setting_list = "plugins/:plugin/settings/", e.plugin_user_setting_list = "plugins/:plugin/user-settings/", e.plugin_registry_status = "plugins/status/", e.plugin_install = "plugins/install/", e.plugin_reload = "plugins/reload/", e.plugin_activate = "plugins/:key/activate/", e.plugin_uninstall = "plugins/:key/uninstall/", e.plugin_admin = "plugins/:key/admin/", e.plugin_ui_features_list = "plugins/ui/features/:feature_type/", e.plugin_locate_item = "locate/", e.machine_types_list = "machine/types/", e.machine_driver_list = "machine/drivers/", e.machine_registry_status = "machine/status/", e.machine_list = "machine/", e.machine_restart = "machine/:machine/restart/", e.machine_setting_list = "machine/:machine/settings/", e.machine_setting_detail = "machine/:machine/settings/:config_type/", e.attachment_list = "attachment/", e.error_report_list = "error-report/", e.project_code_list = "project-code/", e.custom_unit_list = "units/", e.notes_image_upload = "notes-image-upload/", e.email_list = "admin/email/", e.email_test = "admin/email/test/", e.config_list = "admin/config/", e))(m || {});
window.LinguiCore.i18n;
window.LinguiCore.i18n;
m.part_list, m.part_parameter_template_list, m.part_test_template_list, m.supplier_part_list, m.manufacturer_part_list, m.category_list, m.stock_item_list, m.stock_location_list, m.stock_location_type_list, m.stock_tracking_list, m.build_order_list, m.build_line_list, m.build_item_list, m.company_list, m.project_code_list, m.purchase_order_list, m.purchase_order_line_list, m.sales_order_list, m.sales_order_shipment_list, m.return_order_list, m.return_order_line_list, m.address_list, m.contact_list, m.owner_list, m.user_list, m.group_list, m.import_session_list, m.label_list, m.report_list, m.plugin_list, m.content_type_list, m.selectionlist_list, m.error_report_list;
function xr(e) {
  var t;
  const r = ((t = e == null ? void 0 : e.version) == null ? void 0 : t.inventree) || "";
  rt != r && console.info(`Plugin version mismatch! Expected version ${rt}, got ${r}`);
}
var Ce = { exports: {} }, oe = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var st;
function Mr() {
  if (st) return oe;
  st = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function r(n, a, i) {
    var c = null;
    if (i !== void 0 && (c = "" + i), a.key !== void 0 && (c = "" + a.key), "key" in a) {
      i = {};
      for (var l in a)
        l !== "key" && (i[l] = a[l]);
    } else i = a;
    return a = i.ref, {
      $$typeof: e,
      type: n,
      key: c,
      ref: a !== void 0 ? a : null,
      props: i
    };
  }
  return oe.Fragment = t, oe.jsx = r, oe.jsxs = r, oe;
}
var at;
function Sr() {
  return at || (at = 1, Ce.exports = Mr()), Ce.exports;
}
Sr();
window.MantineCore.ActionIcon;
window.MantineCore.Group;
window.MantineCore.Tooltip;
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Ir = {
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
const Tr = window.React.forwardRef, Re = window.React.createElement, U = (e, t, r, n) => {
  const a = Tr(
    ({ color: i = "currentColor", size: c = 24, stroke: l = 2, title: u, className: w, children: p, ...h }, v) => Re(
      "svg",
      {
        ref: v,
        ...Ir[e],
        width: c,
        height: c,
        className: ["tabler-icon", `tabler-icon-${t}`, w].join(" "),
        strokeWidth: l,
        stroke: i,
        ...h
      },
      [
        u && Re("title", { key: "svg-title" }, u),
        ...n.map(([f, x]) => Re(f, x)),
        ...Array.isArray(p) ? p : [p]
      ]
    )
  );
  return a.displayName = `${r}`, a;
};
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lr = [["path", { d: "M12 5l0 14", key: "svg-0" }], ["path", { d: "M5 12l14 0", key: "svg-1" }]];
U("outline", "plus", "Plus", Lr);
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
const Pr = [["path", { d: "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", key: "svg-0" }], ["path", { d: "M21 21l-6 -6", key: "svg-1" }]];
U("outline", "search", "Search", Pr);
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
const $r = [["path", { d: "M5 12l14 0", key: "svg-0" }], ["path", { d: "M13 18l6 -6", key: "svg-1" }], ["path", { d: "M13 6l6 6", key: "svg-2" }]];
U("outline", "arrow-right", "ArrowRight", $r);
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Or = [["path", { d: "M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z", key: "svg-0" }], ["path", { d: "M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1", key: "svg-1" }]];
U("outline", "copy", "Copy", Or);
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nr = [["path", { d: "M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1", key: "svg-0" }], ["path", { d: "M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z", key: "svg-1" }], ["path", { d: "M16 5l3 3", key: "svg-2" }]];
U("outline", "edit", "Edit", Nr);
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jr = [["path", { d: "M4 7l16 0", key: "svg-0" }], ["path", { d: "M10 11l0 6", key: "svg-1" }], ["path", { d: "M14 11l0 6", key: "svg-2" }], ["path", { d: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12", key: "svg-3" }], ["path", { d: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3", key: "svg-4" }]];
U("outline", "trash", "Trash", jr);
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zr = [["path", { d: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", key: "svg-0" }], ["path", { d: "M10 10l4 4m0 -4l-4 4", key: "svg-1" }]];
U("outline", "circle-x", "CircleX", zr);
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fr = [["path", { d: "M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-0" }], ["path", { d: "M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-1" }], ["path", { d: "M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-2" }]];
U("outline", "dots", "Dots", Fr);
window.LinguiCore.i18n;
window.MantineCore.ActionIcon;
window.MantineCore.Menu;
window.MantineCore.Tooltip;
window.React.useMemo;
window.React.useState;
const nt = window.React, Qr = window.LinguiReact.I18nProvider, ot = window.LinguiCore.i18n;
function Br({
  locale: e,
  children: t
}) {
  return nt.useEffect(() => {
    ot.activate(e);
  }, [e]), /* @__PURE__ */ nt.createElement(Qr, { i18n: ot }, t);
}
const o = window.React, le = window.React.useCallback, we = window.React.useMemo, xe = window.React.useState, it = window.MantineCore.ActionIcon, lt = window.MantineCore.Alert, Ur = window.MantineCore.Anchor, Dr = window.MantineCore.Avatar, pe = window.MantineCore.Badge, re = window.MantineCore.Box, Gr = window.MantineCore.CloseButton, Vr = window.MantineCore.Collapse, Jr = window.MantineCore.Divider, P = window.MantineCore.Group, Wr = window.MantineCore.Loader, ct = window.MantineCore.Paper, Hr = window.MantineCore.Progress, qr = window.MantineCore.SegmentedControl, Me = window.MantineCore.Stack, I = window.MantineCore.Text, Yr = window.MantineCore.TextInput, ut = window.MantineCore.Title, ht = window.MantineCore.Tooltip, Xr = window.MantineCore.UnstyledButton;
function Zr(e, t) {
  const r = [];
  function n(a, i) {
    for (const c of a)
      r.push(`${t}-${c.id ?? "none"}-${i}`), c.children && c.children.length > 0 && n(c.children, i + 1);
  }
  return n(e, 0), r;
}
function De(e) {
  let t = e.parts ? e.parts.length : 0;
  if (e.children)
    for (const r of e.children)
      t += De(r);
  return t;
}
function Er(e, t) {
  if (!t) return e;
  const r = t.toLowerCase();
  function n(a) {
    const i = a.parts.filter(
      (l) => l.name.toLowerCase().includes(r) || l.IPN && l.IPN.toLowerCase().includes(r) || l.description && l.description.toLowerCase().includes(r)
    ), c = a.children.map(n).filter((l) => l !== null);
    return i.length > 0 || c.length > 0 ? {
      ...a,
      parts: i,
      children: c
    } : null;
  }
  return e.map(n).filter((a) => a !== null);
}
function Kr(e) {
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
function Ar(e, t = !1) {
  if (t && e.quantity_at_location !== void 0)
    return `${e.quantity_at_location}`;
  const r = e.total_stock ?? 0, n = e.minimum_stock ?? 0;
  return n > 0 ? `${r} / ${n}` : `${r}`;
}
function es({
  part: e,
  context: t,
  showLocationQty: r = !1
}) {
  const n = Kr(e), a = le(() => {
    t.navigate(`/part/${e.id}/`);
  }, [t, e.id]);
  return /* @__PURE__ */ o.createElement(
    re,
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
    /* @__PURE__ */ o.createElement(P, { gap: "sm", wrap: "nowrap", style: { paddingLeft: "32px" } }, /* @__PURE__ */ o.createElement(
      Dr,
      {
        src: e.thumbnail || e.image,
        size: "sm",
        radius: "sm",
        color: "gray"
      },
      e.name.charAt(0)
    ), /* @__PURE__ */ o.createElement(re, { style: { minWidth: 0, flex: 1 } }, /* @__PURE__ */ o.createElement(
      Ur,
      {
        size: "sm",
        fw: 500,
        onClick: a,
        style: { cursor: "pointer" },
        truncate: !0
      },
      e.name
    ), e.IPN && /* @__PURE__ */ o.createElement(I, { size: "xs", c: "dimmed", truncate: !0 }, e.IPN))),
    /* @__PURE__ */ o.createElement(I, { size: "sm", c: "dimmed", lineClamp: 1 }, e.description || "-"),
    /* @__PURE__ */ o.createElement(
      pe,
      {
        color: n.color,
        size: "sm",
        variant: "light",
        leftSection: n.label === "Low Stock" ? /* @__PURE__ */ o.createElement(Fe, { size: 10 }) : null
      },
      n.label
    ),
    /* @__PURE__ */ o.createElement(P, { gap: "sm", wrap: "nowrap", justify: "flex-end" }, /* @__PURE__ */ o.createElement(
      Hr,
      {
        value: n.progressValue,
        color: n.progressColor,
        size: "sm",
        style: { width: 80 }
      }
    ), /* @__PURE__ */ o.createElement(I, { size: "sm", fw: 500, style: { minWidth: 60, textAlign: "right" } }, Ar(e, r)))
  );
}
function ts({
  group: e,
  isExpanded: t,
  onToggle: r,
  level: n = 0,
  icon: a
}) {
  const i = we(() => De(e), [e]);
  return i === 0 ? null : /* @__PURE__ */ o.createElement(
    Xr,
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
    /* @__PURE__ */ o.createElement(P, { gap: "xs", wrap: "nowrap", style: { paddingLeft: n * 16 } }, t ? /* @__PURE__ */ o.createElement(_r, { size: 16, color: "gray" }) : /* @__PURE__ */ o.createElement(fr, { size: 16, color: "gray" }), a, /* @__PURE__ */ o.createElement(I, { size: "sm", fw: 600, style: { flex: 1 } }, e.name), /* @__PURE__ */ o.createElement(pe, { color: "gray", size: "sm", variant: "light" }, i))
  );
}
function Mt({
  group: e,
  context: t,
  expandedGroups: r,
  toggleGroup: n,
  level: a = 0,
  prefix: i,
  isLocationView: c = !1
}) {
  const l = `${i}-${e.id ?? "none"}-${a}`, u = r.has(l);
  if (De(e) === 0) return null;
  const p = e.parts && e.parts.length > 0, h = e.children && e.children.length > 0;
  return /* @__PURE__ */ o.createElement(re, null, /* @__PURE__ */ o.createElement(
    ts,
    {
      group: e,
      isExpanded: u,
      onToggle: () => n(l),
      level: a,
      icon: c ? /* @__PURE__ */ o.createElement(xt, { size: 16, color: "gray" }) : /* @__PURE__ */ o.createElement(Rt, { size: 16, color: "gray" })
    }
  ), /* @__PURE__ */ o.createElement(Vr, { in: u }, p && /* @__PURE__ */ o.createElement(re, null, e.parts.map((v) => /* @__PURE__ */ o.createElement(
    es,
    {
      key: `part-${v.id}-${e.id}`,
      part: v,
      context: t,
      showLocationQty: c
    }
  ))), h && e.children.map((v) => /* @__PURE__ */ o.createElement(
    Mt,
    {
      key: `child-${v.id ?? "none"}-${a + 1}`,
      group: v,
      context: t,
      expandedGroups: r,
      toggleGroup: n,
      level: a + 1,
      prefix: i,
      isLocationView: c
    }
  ))));
}
function rs({ showLocationQty: e = !1 }) {
  return /* @__PURE__ */ o.createElement(
    re,
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
    /* @__PURE__ */ o.createElement(I, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase", style: { paddingLeft: "32px" } }, "Part Name"),
    /* @__PURE__ */ o.createElement(I, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "Description"),
    /* @__PURE__ */ o.createElement(I, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "Status"),
    /* @__PURE__ */ o.createElement(I, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase", ta: "right" }, e ? "Qty at Location" : "Stock Level")
  );
}
function ss({
  value: e,
  onChange: t
}) {
  return /* @__PURE__ */ o.createElement(
    Yr,
    {
      value: e,
      placeholder: "Search parts by name, IPN, or description...",
      leftSection: /* @__PURE__ */ o.createElement(kr, { size: 16 }),
      rightSection: e.length > 0 ? /* @__PURE__ */ o.createElement(Gr, { size: "sm", onClick: () => t("") }) : null,
      onChange: (r) => t(r.target.value),
      style: { flex: 1, maxWidth: 400 }
    }
  );
}
function as({
  context: e
}) {
  const [t, r] = xe("category"), [n, a] = xe(""), [i] = It(n, 300), [c, l] = xe(/* @__PURE__ */ new Set()), { data: u, isLoading: w, isError: p, error: h } = ir(
    {
      queryKey: ["critical-components", t],
      queryFn: async () => (await e.api.get(
        `/plugin/criticalcomponents/list/?group_by=${t}`
      )).data
    },
    e.queryClient
  ), v = we(() => u ? t === "location" ? u.locations ?? [] : u.categories ?? [] : [], [u, t]), f = we(() => Er(v, i), [v, i]), x = we(() => Zr(f, t === "location" ? "loc" : "cat"), [f, t]), D = le((k) => {
    l((q) => {
      const $ = new Set(q);
      return $.has(k) ? $.delete(k) : $.add(k), $;
    });
  }, []), C = le(() => {
    l(new Set(x));
  }, [x]), H = le(() => {
    l(/* @__PURE__ */ new Set());
  }, []), se = le((k) => {
    r(k), l(/* @__PURE__ */ new Set());
  }, []);
  if (o.useEffect(() => {
    if (f.length > 0 && c.size === 0) {
      const k = t === "location" ? "loc" : "cat", q = f.map(
        ($) => `${k}-${$.id ?? "none"}-0`
      );
      l(new Set(q));
    }
  }, [f.length, t]), w)
    return /* @__PURE__ */ o.createElement(Me, { align: "center", justify: "center", p: "xl" }, /* @__PURE__ */ o.createElement(Wr, { size: "lg" }), /* @__PURE__ */ o.createElement(I, { c: "dimmed" }, "Loading critical components..."));
  if (p)
    return /* @__PURE__ */ o.createElement(
      lt,
      {
        icon: /* @__PURE__ */ o.createElement(Rr, { size: 16 }),
        title: "Error Loading Data",
        color: "red",
        variant: "light"
      },
      h instanceof Error ? h.message : "Failed to load critical components"
    );
  if (!u || u.total_parts === 0)
    return /* @__PURE__ */ o.createElement(Me, { gap: "md" }, /* @__PURE__ */ o.createElement(P, { justify: "space-between" }, /* @__PURE__ */ o.createElement(ut, { order: 3 }, "Critical Components")), /* @__PURE__ */ o.createElement(
      lt,
      {
        icon: /* @__PURE__ */ o.createElement(Fe, { size: 16 }),
        title: "No Critical Components Found",
        color: "gray",
        variant: "light"
      },
      /* @__PURE__ */ o.createElement(I, { size: "sm" }, "No parts have been marked as critical components."),
      /* @__PURE__ */ o.createElement(I, { size: "xs", c: "dimmed", mt: "xs" }, 'To mark a part as critical, add the "CriticalComponent" parameter to a part and set its value to "True".')
    ));
  const ae = t === "location" ? "loc" : "cat";
  return /* @__PURE__ */ o.createElement(Me, { gap: "md" }, /* @__PURE__ */ o.createElement(P, { justify: "space-between", wrap: "wrap" }, /* @__PURE__ */ o.createElement(P, { gap: "sm" }, /* @__PURE__ */ o.createElement(ut, { order: 3 }, "Critical Components"), /* @__PURE__ */ o.createElement(pe, { color: "blue", size: "lg" }, u.total_parts, " Parts"), u.total_critical_low_stock > 0 && /* @__PURE__ */ o.createElement(pe, { color: "orange", size: "lg", leftSection: /* @__PURE__ */ o.createElement(Fe, { size: 12 }) }, u.total_critical_low_stock, " Low Stock"))), /* @__PURE__ */ o.createElement(ct, { p: "sm", withBorder: !0 }, /* @__PURE__ */ o.createElement(P, { justify: "space-between", wrap: "wrap", gap: "sm" }, /* @__PURE__ */ o.createElement(ss, { value: n, onChange: a }), /* @__PURE__ */ o.createElement(P, { gap: "xs" }, /* @__PURE__ */ o.createElement(
    qr,
    {
      value: t,
      onChange: se,
      data: [
        {
          label: /* @__PURE__ */ o.createElement(P, { gap: 4 }, /* @__PURE__ */ o.createElement(Rt, { size: 14 }), /* @__PURE__ */ o.createElement("span", null, "Category")),
          value: "category"
        },
        {
          label: /* @__PURE__ */ o.createElement(P, { gap: 4 }, /* @__PURE__ */ o.createElement(xt, { size: 14 }), /* @__PURE__ */ o.createElement("span", null, "Location")),
          value: "location"
        }
      ],
      size: "xs"
    }
  ), /* @__PURE__ */ o.createElement(Jr, { orientation: "vertical" }), /* @__PURE__ */ o.createElement(ht, { label: "Expand All" }, /* @__PURE__ */ o.createElement(it, { variant: "light", onClick: C }, /* @__PURE__ */ o.createElement(wr, { size: 16 }))), /* @__PURE__ */ o.createElement(ht, { label: "Collapse All" }, /* @__PURE__ */ o.createElement(it, { variant: "light", onClick: H }, /* @__PURE__ */ o.createElement(vr, { size: 16 })))))), i && /* @__PURE__ */ o.createElement(I, { size: "sm", c: "dimmed" }, 'Showing results for "', i, '"', f.length === 0 && " - No matching parts found"), f.length > 0 && /* @__PURE__ */ o.createElement(ct, { withBorder: !0, style: { overflow: "hidden" } }, /* @__PURE__ */ o.createElement(rs, { showLocationQty: t === "location" }), /* @__PURE__ */ o.createElement(re, { style: { maxHeight: "60vh", overflowY: "auto" } }, f.map((k) => /* @__PURE__ */ o.createElement(
    Mt,
    {
      key: `group-${k.id ?? "none"}-0`,
      group: k,
      context: e,
      expandedGroups: c,
      toggleGroup: D,
      level: 0,
      prefix: ae,
      isLocationView: t === "location"
    }
  )))));
}
function is(e) {
  return xr(e), /* @__PURE__ */ o.createElement(Br, { locale: e.locale }, /* @__PURE__ */ o.createElement(as, { context: e }));
}
export {
  is as default,
  is as renderPanel
};
