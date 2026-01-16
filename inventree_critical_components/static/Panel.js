var Ki = (e) => {
  throw TypeError(e);
};
var Fa = (e, r, t) => r.has(e) || Ki("Cannot " + t);
var X = (e, r, t) => (Fa(e, r, "read from private field"), t ? t.call(e) : r.get(e)), Re = (e, r, t) => r.has(e) ? Ki("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(e) : r.set(e, t), de = (e, r, t, n) => (Fa(e, r, "write to private field"), n ? n.call(e, t) : r.set(e, t), t), Ue = (e, r, t) => (Fa(e, r, "access private method"), t);
const Nf = window.React.useState, Ca = window.React.useRef, Ji = window.React.useEffect;
function Df(e, r, t = { leading: !1 }) {
  const [n, a] = Nf(e), i = Ca(!1), s = Ca(null), o = Ca(!1), l = () => window.clearTimeout(s.current);
  return Ji(() => {
    i.current && (!o.current && t.leading ? (o.current = !0, a(e)) : (l(), s.current = window.setTimeout(() => {
      o.current = !1, a(e);
    }, r)));
  }, [e, t.leading, r]), Ji(() => (i.current = !0, l), []), [n, l];
}
var xi = class {
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
}, Pf = {
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
  setTimeout: (e, r) => setTimeout(e, r),
  clearTimeout: (e) => clearTimeout(e),
  setInterval: (e, r) => setInterval(e, r),
  clearInterval: (e) => clearInterval(e)
}, Zt, ui, us, Mf = (us = class {
  constructor() {
    // We cannot have TimeoutManager<T> as we must instantiate it with a concrete
    // type at app boot; and if we leave that type, then any new timer provider
    // would need to support ReturnType<typeof setTimeout>, which is infeasible.
    //
    // We settle for type safety for the TimeoutProvider type, and accept that
    // this class is unsafe internally to allow for extension.
    Re(this, Zt, Pf);
    Re(this, ui, !1);
  }
  setTimeoutProvider(e) {
    de(this, Zt, e);
  }
  setTimeout(e, r) {
    return X(this, Zt).setTimeout(e, r);
  }
  clearTimeout(e) {
    X(this, Zt).clearTimeout(e);
  }
  setInterval(e, r) {
    return X(this, Zt).setInterval(e, r);
  }
  clearInterval(e) {
    X(this, Zt).clearInterval(e);
  }
}, Zt = new WeakMap(), ui = new WeakMap(), us), Bn = new Mf();
function Lf(e) {
  setTimeout(e, 0);
}
var gn = typeof window > "u" || "Deno" in globalThis;
function Qa() {
}
function Qi(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function Bf(e, r) {
  return Math.max(e + (r || 0) - Date.now(), 0);
}
function un(e, r) {
  return typeof e == "function" ? e(r) : e;
}
function Ot(e, r) {
  return typeof e == "function" ? e(r) : e;
}
var bf = Object.prototype.hasOwnProperty;
function ps(e, r) {
  if (e === r)
    return e;
  const t = Zi(e) && Zi(r);
  if (!t && !(qi(e) && qi(r))) return r;
  const a = (t ? e : Object.keys(e)).length, i = t ? r : Object.keys(r), s = i.length, o = t ? new Array(s) : {};
  let l = 0;
  for (let f = 0; f < s; f++) {
    const c = t ? f : i[f], d = e[c], h = r[c];
    if (d === h) {
      o[c] = d, (t ? f < a : bf.call(e, c)) && l++;
      continue;
    }
    if (d === null || h === null || typeof d != "object" || typeof h != "object") {
      o[c] = h;
      continue;
    }
    const u = ps(d, h);
    o[c] = u, u === d && l++;
  }
  return a === s && l === a ? e : o;
}
function Za(e, r) {
  if (!r || Object.keys(e).length !== Object.keys(r).length)
    return !1;
  for (const t in e)
    if (e[t] !== r[t])
      return !1;
  return !0;
}
function Zi(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function qi(e) {
  if (!e0(e))
    return !1;
  const r = e.constructor;
  if (r === void 0)
    return !0;
  const t = r.prototype;
  return !(!e0(t) || !t.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(e) !== Object.prototype);
}
function e0(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function t0(e, r, t) {
  return typeof t.structuralSharing == "function" ? t.structuralSharing(e, r) : t.structuralSharing !== !1 ? ps(e, r) : r;
}
function vs(e, r) {
  return typeof e == "function" ? e(...r) : !!e;
}
var pr, qt, Gr, xs, Uf = (xs = class extends xi {
  constructor() {
    super();
    Re(this, pr);
    Re(this, qt);
    Re(this, Gr);
    de(this, Gr, (r) => {
      if (!gn && window.addEventListener) {
        const t = () => r();
        return window.addEventListener("visibilitychange", t, !1), () => {
          window.removeEventListener("visibilitychange", t);
        };
      }
    });
  }
  onSubscribe() {
    X(this, qt) || this.setEventListener(X(this, Gr));
  }
  onUnsubscribe() {
    var r;
    this.hasListeners() || ((r = X(this, qt)) == null || r.call(this), de(this, qt, void 0));
  }
  setEventListener(r) {
    var t;
    de(this, Gr, r), (t = X(this, qt)) == null || t.call(this), de(this, qt, r((n) => {
      typeof n == "boolean" ? this.setFocused(n) : this.onFocus();
    }));
  }
  setFocused(r) {
    X(this, pr) !== r && (de(this, pr, r), this.onFocus());
  }
  onFocus() {
    const r = this.isFocused();
    this.listeners.forEach((t) => {
      t(r);
    });
  }
  isFocused() {
    var r;
    return typeof X(this, pr) == "boolean" ? X(this, pr) : ((r = globalThis.document) == null ? void 0 : r.visibilityState) !== "hidden";
  }
}, pr = new WeakMap(), qt = new WeakMap(), Gr = new WeakMap(), xs), Wf = new Uf();
function r0() {
  let e, r;
  const t = new Promise((a, i) => {
    e = a, r = i;
  });
  t.status = "pending", t.catch(() => {
  });
  function n(a) {
    Object.assign(t, a), delete t.resolve, delete t.reject;
  }
  return t.resolve = (a) => {
    n({
      status: "fulfilled",
      value: a
    }), e(a);
  }, t.reject = (a) => {
    n({
      status: "rejected",
      reason: a
    }), r(a);
  }, t;
}
var Hf = Lf;
function Gf() {
  let e = [], r = 0, t = (o) => {
    o();
  }, n = (o) => {
    o();
  }, a = Hf;
  const i = (o) => {
    r ? e.push(o) : a(() => {
      t(o);
    });
  }, s = () => {
    const o = e;
    e = [], o.length && a(() => {
      n(() => {
        o.forEach((l) => {
          t(l);
        });
      });
    });
  };
  return {
    batch: (o) => {
      let l;
      r++;
      try {
        l = o();
      } finally {
        r--, r || s();
      }
      return l;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (o) => (...l) => {
      i(() => {
        o(...l);
      });
    },
    schedule: i,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (o) => {
      t = o;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (o) => {
      n = o;
    },
    setScheduler: (o) => {
      a = o;
    }
  };
}
var _s = Gf(), $r, er, Vr, ds, $f = (ds = class extends xi {
  constructor() {
    super();
    Re(this, $r, !0);
    Re(this, er);
    Re(this, Vr);
    de(this, Vr, (r) => {
      if (!gn && window.addEventListener) {
        const t = () => r(!0), n = () => r(!1);
        return window.addEventListener("online", t, !1), window.addEventListener("offline", n, !1), () => {
          window.removeEventListener("online", t), window.removeEventListener("offline", n);
        };
      }
    });
  }
  onSubscribe() {
    X(this, er) || this.setEventListener(X(this, Vr));
  }
  onUnsubscribe() {
    var r;
    this.hasListeners() || ((r = X(this, er)) == null || r.call(this), de(this, er, void 0));
  }
  setEventListener(r) {
    var t;
    de(this, Vr, r), (t = X(this, er)) == null || t.call(this), de(this, er, r(this.setOnline.bind(this)));
  }
  setOnline(r) {
    X(this, $r) !== r && (de(this, $r, r), this.listeners.forEach((n) => {
      n(r);
    }));
  }
  isOnline() {
    return X(this, $r);
  }
}, $r = new WeakMap(), er = new WeakMap(), Vr = new WeakMap(), ds), Vf = new $f();
function zf(e) {
  return (e ?? "online") === "online" ? Vf.isOnline() : !0;
}
function Xf(e, r) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: zf(r.networkMode) ? "fetching" : "paused",
    ...e === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
var ct, xe, An, st, vr, zr, Ht, tr, kn, Xr, jr, _r, gr, rr, Yr, Te, cn, qa, ei, ti, ri, ni, ai, ii, gs, ms, jf = (ms = class extends xi {
  constructor(r, t) {
    super();
    Re(this, Te);
    Re(this, ct);
    Re(this, xe);
    Re(this, An);
    Re(this, st);
    Re(this, vr);
    Re(this, zr);
    Re(this, Ht);
    Re(this, tr);
    Re(this, kn);
    Re(this, Xr);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    Re(this, jr);
    Re(this, _r);
    Re(this, gr);
    Re(this, rr);
    Re(this, Yr, /* @__PURE__ */ new Set());
    this.options = t, de(this, ct, r), de(this, tr, null), de(this, Ht, r0()), this.bindMethods(), this.setOptions(t);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 && (X(this, xe).addObserver(this), n0(X(this, xe), this.options) ? Ue(this, Te, cn).call(this) : this.updateResult(), Ue(this, Te, ri).call(this));
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return si(
      X(this, xe),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return si(
      X(this, xe),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), Ue(this, Te, ni).call(this), Ue(this, Te, ai).call(this), X(this, xe).removeObserver(this);
  }
  setOptions(r) {
    const t = this.options, n = X(this, xe);
    if (this.options = X(this, ct).defaultQueryOptions(r), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof Ot(this.options.enabled, X(this, xe)) != "boolean")
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    Ue(this, Te, ii).call(this), X(this, xe).setOptions(this.options), t._defaulted && !Za(this.options, t) && X(this, ct).getQueryCache().notify({
      type: "observerOptionsUpdated",
      query: X(this, xe),
      observer: this
    });
    const a = this.hasListeners();
    a && a0(
      X(this, xe),
      n,
      this.options,
      t
    ) && Ue(this, Te, cn).call(this), this.updateResult(), a && (X(this, xe) !== n || Ot(this.options.enabled, X(this, xe)) !== Ot(t.enabled, X(this, xe)) || un(this.options.staleTime, X(this, xe)) !== un(t.staleTime, X(this, xe))) && Ue(this, Te, qa).call(this);
    const i = Ue(this, Te, ei).call(this);
    a && (X(this, xe) !== n || Ot(this.options.enabled, X(this, xe)) !== Ot(t.enabled, X(this, xe)) || i !== X(this, rr)) && Ue(this, Te, ti).call(this, i);
  }
  getOptimisticResult(r) {
    const t = X(this, ct).getQueryCache().build(X(this, ct), r), n = this.createResult(t, r);
    return Kf(this, n) && (de(this, st, n), de(this, zr, this.options), de(this, vr, X(this, xe).state)), n;
  }
  getCurrentResult() {
    return X(this, st);
  }
  trackResult(r, t) {
    return new Proxy(r, {
      get: (n, a) => (this.trackProp(a), t == null || t(a), a === "promise" && (this.trackProp("data"), !this.options.experimental_prefetchInRender && X(this, Ht).status === "pending" && X(this, Ht).reject(
        new Error(
          "experimental_prefetchInRender feature flag is not enabled"
        )
      )), Reflect.get(n, a))
    });
  }
  trackProp(r) {
    X(this, Yr).add(r);
  }
  getCurrentQuery() {
    return X(this, xe);
  }
  refetch({ ...r } = {}) {
    return this.fetch({
      ...r
    });
  }
  fetchOptimistic(r) {
    const t = X(this, ct).defaultQueryOptions(r), n = X(this, ct).getQueryCache().build(X(this, ct), t);
    return n.fetch().then(() => this.createResult(n, t));
  }
  fetch(r) {
    return Ue(this, Te, cn).call(this, {
      ...r,
      cancelRefetch: r.cancelRefetch ?? !0
    }).then(() => (this.updateResult(), X(this, st)));
  }
  createResult(r, t) {
    var k;
    const n = X(this, xe), a = this.options, i = X(this, st), s = X(this, vr), o = X(this, zr), f = r !== n ? r.state : X(this, An), { state: c } = r;
    let d = { ...c }, h = !1, u;
    if (t._optimisticResults) {
      const W = this.hasListeners(), H = !W && n0(r, t), z = W && a0(r, n, t, a);
      (H || z) && (d = {
        ...d,
        ...Xf(c.data, r.options)
      }), t._optimisticResults === "isRestoring" && (d.fetchStatus = "idle");
    }
    let { error: v, errorUpdatedAt: x, status: g } = d;
    u = d.data;
    let C = !1;
    if (t.placeholderData !== void 0 && u === void 0 && g === "pending") {
      let W;
      i != null && i.isPlaceholderData && t.placeholderData === (o == null ? void 0 : o.placeholderData) ? (W = i.data, C = !0) : W = typeof t.placeholderData == "function" ? t.placeholderData(
        (k = X(this, jr)) == null ? void 0 : k.state.data,
        X(this, jr)
      ) : t.placeholderData, W !== void 0 && (g = "success", u = t0(
        i == null ? void 0 : i.data,
        W,
        t
      ), h = !0);
    }
    if (t.select && u !== void 0 && !C)
      if (i && u === (s == null ? void 0 : s.data) && t.select === X(this, kn))
        u = X(this, Xr);
      else
        try {
          de(this, kn, t.select), u = t.select(u), u = t0(i == null ? void 0 : i.data, u, t), de(this, Xr, u), de(this, tr, null);
        } catch (W) {
          de(this, tr, W);
        }
    X(this, tr) && (v = X(this, tr), u = X(this, Xr), x = Date.now(), g = "error");
    const O = d.fetchStatus === "fetching", F = g === "pending", L = g === "error", Y = F && O, q = u !== void 0, U = {
      status: g,
      fetchStatus: d.fetchStatus,
      isPending: F,
      isSuccess: g === "success",
      isError: L,
      isInitialLoading: Y,
      isLoading: Y,
      data: u,
      dataUpdatedAt: d.dataUpdatedAt,
      error: v,
      errorUpdatedAt: x,
      failureCount: d.fetchFailureCount,
      failureReason: d.fetchFailureReason,
      errorUpdateCount: d.errorUpdateCount,
      isFetched: d.dataUpdateCount > 0 || d.errorUpdateCount > 0,
      isFetchedAfterMount: d.dataUpdateCount > f.dataUpdateCount || d.errorUpdateCount > f.errorUpdateCount,
      isFetching: O,
      isRefetching: O && !F,
      isLoadingError: L && !q,
      isPaused: d.fetchStatus === "paused",
      isPlaceholderData: h,
      isRefetchError: L && q,
      isStale: di(r, t),
      refetch: this.refetch,
      promise: X(this, Ht),
      isEnabled: Ot(t.enabled, r) !== !1
    };
    if (this.options.experimental_prefetchInRender) {
      const W = (ee) => {
        U.status === "error" ? ee.reject(U.error) : U.data !== void 0 && ee.resolve(U.data);
      }, H = () => {
        const ee = de(this, Ht, U.promise = r0());
        W(ee);
      }, z = X(this, Ht);
      switch (z.status) {
        case "pending":
          r.queryHash === n.queryHash && W(z);
          break;
        case "fulfilled":
          (U.status === "error" || U.data !== z.value) && H();
          break;
        case "rejected":
          (U.status !== "error" || U.error !== z.reason) && H();
          break;
      }
    }
    return U;
  }
  updateResult() {
    const r = X(this, st), t = this.createResult(X(this, xe), this.options);
    if (de(this, vr, X(this, xe).state), de(this, zr, this.options), X(this, vr).data !== void 0 && de(this, jr, X(this, xe)), Za(t, r))
      return;
    de(this, st, t);
    const n = () => {
      if (!r)
        return !0;
      const { notifyOnChangeProps: a } = this.options, i = typeof a == "function" ? a() : a;
      if (i === "all" || !i && !X(this, Yr).size)
        return !0;
      const s = new Set(
        i ?? X(this, Yr)
      );
      return this.options.throwOnError && s.add("error"), Object.keys(X(this, st)).some((o) => {
        const l = o;
        return X(this, st)[l] !== r[l] && s.has(l);
      });
    };
    Ue(this, Te, gs).call(this, { listeners: n() });
  }
  onQueryUpdate() {
    this.updateResult(), this.hasListeners() && Ue(this, Te, ri).call(this);
  }
}, ct = new WeakMap(), xe = new WeakMap(), An = new WeakMap(), st = new WeakMap(), vr = new WeakMap(), zr = new WeakMap(), Ht = new WeakMap(), tr = new WeakMap(), kn = new WeakMap(), Xr = new WeakMap(), jr = new WeakMap(), _r = new WeakMap(), gr = new WeakMap(), rr = new WeakMap(), Yr = new WeakMap(), Te = new WeakSet(), cn = function(r) {
  Ue(this, Te, ii).call(this);
  let t = X(this, xe).fetch(
    this.options,
    r
  );
  return r != null && r.throwOnError || (t = t.catch(Qa)), t;
}, qa = function() {
  Ue(this, Te, ni).call(this);
  const r = un(
    this.options.staleTime,
    X(this, xe)
  );
  if (gn || X(this, st).isStale || !Qi(r))
    return;
  const n = Bf(X(this, st).dataUpdatedAt, r) + 1;
  de(this, _r, Bn.setTimeout(() => {
    X(this, st).isStale || this.updateResult();
  }, n));
}, ei = function() {
  return (typeof this.options.refetchInterval == "function" ? this.options.refetchInterval(X(this, xe)) : this.options.refetchInterval) ?? !1;
}, ti = function(r) {
  Ue(this, Te, ai).call(this), de(this, rr, r), !(gn || Ot(this.options.enabled, X(this, xe)) === !1 || !Qi(X(this, rr)) || X(this, rr) === 0) && de(this, gr, Bn.setInterval(() => {
    (this.options.refetchIntervalInBackground || Wf.isFocused()) && Ue(this, Te, cn).call(this);
  }, X(this, rr)));
}, ri = function() {
  Ue(this, Te, qa).call(this), Ue(this, Te, ti).call(this, Ue(this, Te, ei).call(this));
}, ni = function() {
  X(this, _r) && (Bn.clearTimeout(X(this, _r)), de(this, _r, void 0));
}, ai = function() {
  X(this, gr) && (Bn.clearInterval(X(this, gr)), de(this, gr, void 0));
}, ii = function() {
  const r = X(this, ct).getQueryCache().build(X(this, ct), this.options);
  if (r === X(this, xe))
    return;
  const t = X(this, xe);
  de(this, xe, r), de(this, An, r.state), this.hasListeners() && (t == null || t.removeObserver(this), r.addObserver(this));
}, gs = function(r) {
  _s.batch(() => {
    r.listeners && this.listeners.forEach((t) => {
      t(X(this, st));
    }), X(this, ct).getQueryCache().notify({
      query: X(this, xe),
      type: "observerResultsUpdated"
    });
  });
}, ms);
function Yf(e, r) {
  return Ot(r.enabled, e) !== !1 && e.state.data === void 0 && !(e.state.status === "error" && r.retryOnMount === !1);
}
function n0(e, r) {
  return Yf(e, r) || e.state.data !== void 0 && si(e, r, r.refetchOnMount);
}
function si(e, r, t) {
  if (Ot(r.enabled, e) !== !1 && un(r.staleTime, e) !== "static") {
    const n = typeof t == "function" ? t(e) : t;
    return n === "always" || n !== !1 && di(e, r);
  }
  return !1;
}
function a0(e, r, t, n) {
  return (e !== r || Ot(n.enabled, e) === !1) && (!t.suspense || e.state.status !== "error") && di(e, t);
}
function di(e, r) {
  return Ot(r.enabled, e) !== !1 && e.isStaleByTime(un(r.staleTime, e));
}
function Kf(e, r) {
  return !Za(e.getCurrentResult(), r);
}
var Aa = { exports: {} }, nn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var i0;
function Jf() {
  if (i0) return nn;
  i0 = 1;
  var e = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function t(n, a, i) {
    var s = null;
    if (i !== void 0 && (s = "" + i), a.key !== void 0 && (s = "" + a.key), "key" in a) {
      i = {};
      for (var o in a)
        o !== "key" && (i[o] = a[o]);
    } else i = a;
    return a = i.ref, {
      $$typeof: e,
      type: n,
      key: s,
      ref: a !== void 0 ? a : null,
      props: i
    };
  }
  return nn.Fragment = r, nn.jsx = t, nn.jsxs = t, nn;
}
var s0;
function Qf() {
  return s0 || (s0 = 1, Aa.exports = Jf()), Aa.exports;
}
Qf();
const ws = window.React;
var Zf = ws.createContext(
  void 0
), qf = (e) => {
  const r = ws.useContext(Zf);
  if (e)
    return e;
  if (!r)
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  return r;
};
const Ts = window.React;
var Es = Ts.createContext(!1), el = () => Ts.useContext(Es);
Es.Provider;
const Ss = window.React;
function tl() {
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
var rl = Ss.createContext(tl()), nl = () => Ss.useContext(rl);
const al = window.React;
var il = (e, r, t) => {
  const n = t != null && t.state.error && typeof e.throwOnError == "function" ? vs(e.throwOnError, [t.state.error, t]) : e.throwOnError;
  (e.suspense || e.experimental_prefetchInRender || n) && (r.isReset() || (e.retryOnMount = !1));
}, sl = (e) => {
  al.useEffect(() => {
    e.clearReset();
  }, [e]);
}, ol = ({
  result: e,
  errorResetBoundary: r,
  throwOnError: t,
  query: n,
  suspense: a
}) => e.isError && !r.isReset() && !e.isFetching && n && (a && e.data === void 0 || vs(t, [e.error, n])), fl = (e) => {
  if (e.suspense) {
    const t = (a) => a === "static" ? a : Math.max(a ?? 1e3, 1e3), n = e.staleTime;
    e.staleTime = typeof n == "function" ? (...a) => t(n(...a)) : t(n), typeof e.gcTime == "number" && (e.gcTime = Math.max(
      e.gcTime,
      1e3
    ));
  }
}, ll = (e, r) => e.isLoading && e.isFetching && !r, cl = (e, r) => (e == null ? void 0 : e.suspense) && r.isPending, o0 = (e, r, t) => r.fetchOptimistic(e).catch(() => {
  t.clearReset();
});
const bn = window.React;
function hl(e, r, t) {
  var h, u, v, x;
  const n = el(), a = nl(), i = qf(t), s = i.defaultQueryOptions(e);
  (u = (h = i.getDefaultOptions().queries) == null ? void 0 : h._experimental_beforeQuery) == null || u.call(
    h,
    s
  );
  const o = i.getQueryCache().get(s.queryHash);
  s._optimisticResults = n ? "isRestoring" : "optimistic", fl(s), il(s, a, o), sl(a);
  const l = !i.getQueryCache().get(s.queryHash), [f] = bn.useState(
    () => new r(
      i,
      s
    )
  ), c = f.getOptimisticResult(s), d = !n && e.subscribed !== !1;
  if (bn.useSyncExternalStore(
    bn.useCallback(
      (g) => {
        const C = d ? f.subscribe(_s.batchCalls(g)) : Qa;
        return f.updateResult(), C;
      },
      [f, d]
    ),
    () => f.getCurrentResult(),
    () => f.getCurrentResult()
  ), bn.useEffect(() => {
    f.setOptions(s);
  }, [s, f]), cl(s, c))
    throw o0(s, f, a);
  if (ol({
    result: c,
    errorResetBoundary: a,
    throwOnError: s.throwOnError,
    query: o,
    suspense: s.suspense
  }))
    throw c.error;
  if ((x = (v = i.getDefaultOptions().queries) == null ? void 0 : v._experimental_afterQuery) == null || x.call(
    v,
    s,
    c
  ), s.experimental_prefetchInRender && !gn && ll(c, n)) {
    const g = l ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      o0(s, f, a)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      o == null ? void 0 : o.promise
    );
    g == null || g.catch(Qa).finally(() => {
      f.updateResult();
    });
  }
  return s.notifyOnChangeProps ? c : f.trackResult(c);
}
function ul(e, r) {
  return hl(e, jf, r);
}
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
var xl = {
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
const dl = window.React.forwardRef, ka = window.React.createElement, wt = (e, r, t, n) => {
  const a = dl(
    ({ color: i = "currentColor", size: s = 24, stroke: o = 2, title: l, className: f, children: c, ...d }, h) => ka(
      "svg",
      {
        ref: h,
        ...xl[e],
        width: s,
        height: s,
        className: ["tabler-icon", `tabler-icon-${r}`, f].join(" "),
        strokeWidth: o,
        stroke: i,
        ...d
      },
      [
        l && ka("title", { key: "svg-title" }, l),
        ...n.map(([u, v]) => ka(u, v)),
        ...Array.isArray(c) ? c : [c]
      ]
    )
  );
  return a.displayName = `${t}`, a;
};
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ml = [["path", { d: "M12 9v4", key: "svg-0" }], ["path", { d: "M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0", key: "svg-1" }], ["path", { d: "M12 16h.01", key: "svg-2" }]], Jn = wt("outline", "alert-triangle", "AlertTriangle", ml);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pl = [["path", { d: "M17.765 17.757l-5.765 3.243l-8 -4.5v-9l2.236 -1.258m2.57 -1.445l3.194 -1.797l8 4.5v8.5", key: "svg-0" }], ["path", { d: "M14.561 10.559l5.439 -3.059", key: "svg-1" }], ["path", { d: "M12 12v9", key: "svg-2" }], ["path", { d: "M12 12l-8 -4.5", key: "svg-3" }], ["path", { d: "M3 3l18 18", key: "svg-4" }]], vl = wt("outline", "box-off", "BoxOff", pl);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _l = [["path", { d: "M4 4h6v6h-6l0 -6", key: "svg-0" }], ["path", { d: "M14 4h6v6h-6l0 -6", key: "svg-1" }], ["path", { d: "M4 14h6v6h-6l0 -6", key: "svg-2" }], ["path", { d: "M14 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0", key: "svg-3" }]], ys = wt("outline", "category", "Category", _l);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gl = [["path", { d: "M6 9l6 6l6 -6", key: "svg-0" }]], mi = wt("outline", "chevron-down", "ChevronDown", gl);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wl = [["path", { d: "M9 6l6 6l-6 6", key: "svg-0" }]], pi = wt("outline", "chevron-right", "ChevronRight", wl);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tl = [["path", { d: "M7 7l5 5l5 -5", key: "svg-0" }], ["path", { d: "M7 13l5 5l5 -5", key: "svg-1" }]], El = wt("outline", "chevrons-down", "ChevronsDown", Tl);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sl = [["path", { d: "M7 11l5 -5l5 5", key: "svg-0" }], ["path", { d: "M7 17l5 -5l5 5", key: "svg-1" }]], yl = wt("outline", "chevrons-up", "ChevronsUp", Sl);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fl = [["path", { d: "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0", key: "svg-0" }], ["path", { d: "M12 7v5l3 3", key: "svg-1" }]], oi = wt("outline", "clock", "Clock", Fl);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cl = [["path", { d: "M14 3v4a1 1 0 0 0 1 1h4", key: "svg-0" }], ["path", { d: "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2", key: "svg-1" }], ["path", { d: "M8 11h8v7h-8l0 -7", key: "svg-2" }], ["path", { d: "M8 15h8", key: "svg-3" }], ["path", { d: "M11 11v7", key: "svg-4" }]], Al = wt("outline", "file-spreadsheet", "FileSpreadsheet", Cl);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kl = [["path", { d: "M9 6l11 0", key: "svg-0" }], ["path", { d: "M9 12l11 0", key: "svg-1" }], ["path", { d: "M9 18l11 0", key: "svg-2" }], ["path", { d: "M5 6l0 .01", key: "svg-3" }], ["path", { d: "M5 12l0 .01", key: "svg-4" }], ["path", { d: "M5 18l0 .01", key: "svg-5" }]], Ol = wt("outline", "list", "List", kl);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rl = [["path", { d: "M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0", key: "svg-0" }], ["path", { d: "M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0", key: "svg-1" }]], Fs = wt("outline", "map-pin", "MapPin", Rl);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Il = [["path", { d: "M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", key: "svg-0" }], ["path", { d: "M21 21l-6 -6", key: "svg-1" }]], Nl = wt("outline", "search", "Search", Il);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dl = [["path", { d: "M18 6l-12 12", key: "svg-0" }], ["path", { d: "M6 6l12 12", key: "svg-1" }]], Pl = wt("outline", "x", "X", Dl), f0 = "0.7.0";
var me = /* @__PURE__ */ ((e) => (e.api_server_info = "", e.user_list = "user/", e.user_set_password = "user/:id/set-password/", e.user_me = "user/me/", e.user_profile = "user/profile/", e.user_roles = "user/roles/", e.user_token = "user/token/", e.user_tokens = "user/tokens/", e.user_simple_login = "email/generate/", e.user_reset = "auth/v1/auth/password/request", e.user_reset_set = "auth/v1/auth/password/reset", e.auth_pwd_change = "auth/v1/account/password/change", e.auth_login = "auth/v1/auth/login", e.auth_login_2fa = "auth/v1/auth/2fa/authenticate", e.auth_session = "auth/v1/auth/session", e.auth_signup = "auth/v1/auth/signup", e.auth_authenticators = "auth/v1/account/authenticators", e.auth_recovery = "auth/v1/account/authenticators/recovery-codes", e.auth_mfa_reauthenticate = "auth/v1/auth/2fa/reauthenticate", e.auth_totp = "auth/v1/account/authenticators/totp", e.auth_trust = "auth/v1/auth/2fa/trust", e.auth_reauthenticate = "auth/v1/auth/reauthenticate", e.auth_email = "auth/v1/account/email", e.auth_email_verify = "auth/v1/auth/email/verify", e.auth_providers = "auth/v1/account/providers", e.auth_provider_redirect = "auth/v1/auth/provider/redirect", e.auth_config = "auth/v1/config", e.currency_list = "currency/exchange/", e.currency_refresh = "currency/refresh/", e.all_units = "units/all/", e.task_overview = "background-task/", e.task_pending_list = "background-task/pending/", e.task_scheduled_list = "background-task/scheduled/", e.task_failed_list = "background-task/failed/", e.api_search = "search/", e.settings_global_list = "settings/global/", e.settings_user_list = "settings/user/", e.news = "news/", e.global_status = "generic/status/", e.custom_state_list = "generic/status/custom/", e.version = "version/", e.license = "license/", e.group_list = "user/group/", e.owner_list = "user/owner/", e.ruleset_list = "user/ruleset/", e.content_type_list = "contenttype/", e.icons = "icons/", e.selectionlist_list = "selection/", e.selectionlist_detail = "selection/:id/", e.barcode = "barcode/", e.barcode_history = "barcode/history/", e.barcode_link = "barcode/link/", e.barcode_unlink = "barcode/unlink/", e.barcode_generate = "barcode/generate/", e.data_output = "data-output/", e.import_session_list = "importer/session/", e.import_session_accept_fields = "importer/session/:id/accept_fields/", e.import_session_accept_rows = "importer/session/:id/accept_rows/", e.import_session_column_mapping_list = "importer/column-mapping/", e.import_session_row_list = "importer/row/", e.notifications_list = "notifications/", e.notifications_readall = "notifications/readall/", e.build_order_list = "build/", e.build_order_issue = "build/:id/issue/", e.build_order_cancel = "build/:id/cancel/", e.build_order_hold = "build/:id/hold/", e.build_order_complete = "build/:id/finish/", e.build_output_complete = "build/:id/complete/", e.build_output_create = "build/:id/create-output/", e.build_output_scrap = "build/:id/scrap-outputs/", e.build_output_delete = "build/:id/delete-outputs/", e.build_order_auto_allocate = "build/:id/auto-allocate/", e.build_order_allocate = "build/:id/allocate/", e.build_order_consume = "build/:id/consume/", e.build_order_deallocate = "build/:id/unallocate/", e.build_line_list = "build/line/", e.build_item_list = "build/item/", e.bom_list = "bom/", e.bom_item_validate = "bom/:id/validate/", e.bom_validate = "part/:id/bom-validate/", e.bom_substitute_list = "bom/substitute/", e.part_list = "part/", e.part_parameter_list = "part/parameter/", e.part_parameter_template_list = "part/parameter/template/", e.part_thumbs_list = "part/thumbs/", e.part_pricing = "part/:id/pricing/", e.part_requirements = "part/:id/requirements/", e.part_serial_numbers = "part/:id/serial-numbers/", e.part_scheduling = "part/:id/scheduling/", e.part_pricing_internal = "part/internal-price/", e.part_pricing_sale = "part/sale-price/", e.part_stocktake_list = "part/stocktake/", e.category_list = "part/category/", e.category_tree = "part/category/tree/", e.category_parameter_list = "part/category/parameters/", e.related_part_list = "part/related/", e.part_test_template_list = "part/test-template/", e.company_list = "company/", e.contact_list = "company/contact/", e.address_list = "company/address/", e.supplier_part_list = "company/part/", e.supplier_part_pricing_list = "company/price-break/", e.manufacturer_part_list = "company/part/manufacturer/", e.manufacturer_part_parameter_list = "company/part/manufacturer/parameter/", e.stock_location_list = "stock/location/", e.stock_location_type_list = "stock/location-type/", e.stock_location_tree = "stock/location/tree/", e.stock_item_list = "stock/", e.stock_tracking_list = "stock/track/", e.stock_test_result_list = "stock/test/", e.stock_transfer = "stock/transfer/", e.stock_remove = "stock/remove/", e.stock_return = "stock/return/", e.stock_add = "stock/add/", e.stock_count = "stock/count/", e.stock_change_status = "stock/change_status/", e.stock_merge = "stock/merge/", e.stock_assign = "stock/assign/", e.stock_status = "stock/status/", e.stock_install = "stock/:id/install/", e.stock_uninstall = "stock/:id/uninstall/", e.stock_serialize = "stock/:id/serialize/", e.stock_serial_info = "stock/:id/serial-numbers/", e.generate_batch_code = "generate/batch-code/", e.generate_serial_number = "generate/serial-number/", e.purchase_order_list = "order/po/", e.purchase_order_issue = "order/po/:id/issue/", e.purchase_order_hold = "order/po/:id/hold/", e.purchase_order_cancel = "order/po/:id/cancel/", e.purchase_order_complete = "order/po/:id/complete/", e.purchase_order_line_list = "order/po-line/", e.purchase_order_extra_line_list = "order/po-extra-line/", e.purchase_order_receive = "order/po/:id/receive/", e.sales_order_list = "order/so/", e.sales_order_issue = "order/so/:id/issue/", e.sales_order_hold = "order/so/:id/hold/", e.sales_order_cancel = "order/so/:id/cancel/", e.sales_order_ship = "order/so/:id/ship/", e.sales_order_complete = "order/so/:id/complete/", e.sales_order_allocate = "order/so/:id/allocate/", e.sales_order_allocate_serials = "order/so/:id/allocate-serials/", e.sales_order_line_list = "order/so-line/", e.sales_order_extra_line_list = "order/so-extra-line/", e.sales_order_allocation_list = "order/so-allocation/", e.sales_order_shipment_list = "order/so/shipment/", e.sales_order_shipment_complete = "order/so/shipment/:id/ship/", e.return_order_list = "order/ro/", e.return_order_issue = "order/ro/:id/issue/", e.return_order_hold = "order/ro/:id/hold/", e.return_order_cancel = "order/ro/:id/cancel/", e.return_order_complete = "order/ro/:id/complete/", e.return_order_receive = "order/ro/:id/receive/", e.return_order_line_list = "order/ro-line/", e.return_order_extra_line_list = "order/ro-extra-line/", e.label_list = "label/template/", e.label_print = "label/print/", e.report_list = "report/template/", e.report_print = "report/print/", e.report_snippet = "report/snippet/", e.report_asset = "report/asset/", e.plugin_list = "plugins/", e.plugin_setting_list = "plugins/:plugin/settings/", e.plugin_user_setting_list = "plugins/:plugin/user-settings/", e.plugin_registry_status = "plugins/status/", e.plugin_install = "plugins/install/", e.plugin_reload = "plugins/reload/", e.plugin_activate = "plugins/:key/activate/", e.plugin_uninstall = "plugins/:key/uninstall/", e.plugin_admin = "plugins/:key/admin/", e.plugin_ui_features_list = "plugins/ui/features/:feature_type/", e.plugin_locate_item = "locate/", e.machine_types_list = "machine/types/", e.machine_driver_list = "machine/drivers/", e.machine_registry_status = "machine/status/", e.machine_list = "machine/", e.machine_restart = "machine/:machine/restart/", e.machine_setting_list = "machine/:machine/settings/", e.machine_setting_detail = "machine/:machine/settings/:config_type/", e.attachment_list = "attachment/", e.error_report_list = "error-report/", e.project_code_list = "project-code/", e.custom_unit_list = "units/", e.notes_image_upload = "notes-image-upload/", e.email_list = "admin/email/", e.email_test = "admin/email/test/", e.config_list = "admin/config/", e))(me || {});
window.LinguiCore.i18n;
window.LinguiCore.i18n;
me.part_list, me.part_parameter_template_list, me.part_test_template_list, me.supplier_part_list, me.manufacturer_part_list, me.category_list, me.stock_item_list, me.stock_location_list, me.stock_location_type_list, me.stock_tracking_list, me.build_order_list, me.build_line_list, me.build_item_list, me.company_list, me.project_code_list, me.purchase_order_list, me.purchase_order_line_list, me.sales_order_list, me.sales_order_shipment_list, me.return_order_list, me.return_order_line_list, me.address_list, me.contact_list, me.owner_list, me.user_list, me.group_list, me.import_session_list, me.label_list, me.report_list, me.plugin_list, me.content_type_list, me.selectionlist_list, me.error_report_list;
function Ml(e) {
  var r;
  const t = ((r = e == null ? void 0 : e.version) == null ? void 0 : r.inventree) || "";
  f0 != t && console.info(`Plugin version mismatch! Expected version ${f0}, got ${t}`);
}
var Oa = { exports: {} }, an = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l0;
function Ll() {
  if (l0) return an;
  l0 = 1;
  var e = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function t(n, a, i) {
    var s = null;
    if (i !== void 0 && (s = "" + i), a.key !== void 0 && (s = "" + a.key), "key" in a) {
      i = {};
      for (var o in a)
        o !== "key" && (i[o] = a[o]);
    } else i = a;
    return a = i.ref, {
      $$typeof: e,
      type: n,
      key: s,
      ref: a !== void 0 ? a : null,
      props: i
    };
  }
  return an.Fragment = r, an.jsx = t, an.jsxs = t, an;
}
var c0;
function Bl() {
  return c0 || (c0 = 1, Oa.exports = Ll()), Oa.exports;
}
Bl();
window.MantineCore.ActionIcon;
window.MantineCore.Group;
window.MantineCore.Tooltip;
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
var bl = {
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
const Ul = window.React.forwardRef, Ra = window.React.createElement, fr = (e, r, t, n) => {
  const a = Ul(
    ({ color: i = "currentColor", size: s = 24, stroke: o = 2, title: l, className: f, children: c, ...d }, h) => Ra(
      "svg",
      {
        ref: h,
        ...bl[e],
        width: s,
        height: s,
        className: ["tabler-icon", `tabler-icon-${r}`, f].join(" "),
        strokeWidth: o,
        stroke: i,
        ...d
      },
      [
        l && Ra("title", { key: "svg-title" }, l),
        ...n.map(([u, v]) => Ra(u, v)),
        ...Array.isArray(c) ? c : [c]
      ]
    )
  );
  return a.displayName = `${t}`, a;
};
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wl = [["path", { d: "M12 5l0 14", key: "svg-0" }], ["path", { d: "M5 12l14 0", key: "svg-1" }]];
fr("outline", "plus", "Plus", Wl);
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
const Hl = [["path", { d: "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", key: "svg-0" }], ["path", { d: "M21 21l-6 -6", key: "svg-1" }]];
fr("outline", "search", "Search", Hl);
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
const Gl = [["path", { d: "M5 12l14 0", key: "svg-0" }], ["path", { d: "M13 18l6 -6", key: "svg-1" }], ["path", { d: "M13 6l6 6", key: "svg-2" }]];
fr("outline", "arrow-right", "ArrowRight", Gl);
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $l = [["path", { d: "M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z", key: "svg-0" }], ["path", { d: "M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1", key: "svg-1" }]];
fr("outline", "copy", "Copy", $l);
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vl = [["path", { d: "M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1", key: "svg-0" }], ["path", { d: "M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z", key: "svg-1" }], ["path", { d: "M16 5l3 3", key: "svg-2" }]];
fr("outline", "edit", "Edit", Vl);
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zl = [["path", { d: "M4 7l16 0", key: "svg-0" }], ["path", { d: "M10 11l0 6", key: "svg-1" }], ["path", { d: "M14 11l0 6", key: "svg-2" }], ["path", { d: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12", key: "svg-3" }], ["path", { d: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3", key: "svg-4" }]];
fr("outline", "trash", "Trash", zl);
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xl = [["path", { d: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", key: "svg-0" }], ["path", { d: "M10 10l4 4m0 -4l-4 4", key: "svg-1" }]];
fr("outline", "circle-x", "CircleX", Xl);
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jl = [["path", { d: "M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-0" }], ["path", { d: "M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-1" }], ["path", { d: "M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-2" }]];
fr("outline", "dots", "Dots", jl);
window.LinguiCore.i18n;
window.MantineCore.ActionIcon;
window.MantineCore.Menu;
window.MantineCore.Tooltip;
window.React.useMemo;
window.React.useState;
const h0 = window.React, Yl = window.LinguiReact.I18nProvider, u0 = window.LinguiCore.i18n;
function Kl({
  locale: e,
  children: r
}) {
  return h0.useEffect(() => {
    u0.activate(e);
  }, [e]), /* @__PURE__ */ h0.createElement(Yl, { i18n: u0 }, r);
}
function Cs(e) {
  const r = e.total_stock ?? 0, t = e.minimum_stock ?? 0;
  return r <= 0 ? {
    label: "Out of Stock",
    color: "red",
    progressColor: "red",
    progressValue: 0
  } : e.is_low_stock || t > 0 && r < t ? {
    label: "Low Stock",
    color: "orange",
    progressColor: "orange",
    progressValue: t > 0 ? Math.min(r / t * 100, 100) : 50
  } : {
    label: "In Stock",
    color: "green",
    progressColor: "teal",
    progressValue: t > 0 ? Math.min(r / t * 100, 100) : 100
  };
}
function Jl(e, r = !1) {
  if (r && e.quantity_at_location !== void 0)
    return {
      stock: e.quantity_at_location,
      min: null,
      showMin: !1
    };
  const t = e.total_stock ?? 0, n = e.minimum_stock ?? 0;
  return {
    stock: t,
    min: n > 0 ? n : null,
    showMin: n > 0
  };
}
function As(e) {
  if (!e) return "-";
  try {
    return new Date(e).toLocaleDateString(void 0, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  } catch {
    return "-";
  }
}
function vi(e) {
  let r = e.parts ? e.parts.length : 0;
  if (e.children)
    for (const t of e.children)
      r += vi(t);
  return r;
}
function x0(e, r) {
  const t = [];
  function n(a, i) {
    for (const s of a)
      t.push(`${r}-${s.id ?? "none"}-${i}`), s.children && s.children.length > 0 && n(s.children, i + 1);
  }
  return n(e, 0), t;
}
function Ql(e, r) {
  if (!r) return e;
  const t = r.toLowerCase();
  function n(a) {
    const i = a.parts.filter(
      (o) => {
        var l, f;
        return o.name.toLowerCase().includes(t) || ((l = o.IPN) == null ? void 0 : l.toLowerCase().includes(t)) || ((f = o.description) == null ? void 0 : f.toLowerCase().includes(t));
      }
    ), s = a.children.map(n).filter((o) => o !== null);
    return i.length > 0 || s.length > 0 ? {
      ...a,
      parts: i,
      children: s
    } : null;
  }
  return e.map(n).filter((a) => a !== null);
}
function ks(e, r) {
  if (!r) return e;
  const t = r.toLowerCase();
  return e.filter(
    (n) => {
      var a, i, s, o;
      return n.name.toLowerCase().includes(t) || ((a = n.IPN) == null ? void 0 : a.toLowerCase().includes(t)) || ((i = n.description) == null ? void 0 : i.toLowerCase().includes(t)) || ((s = n.category_name) == null ? void 0 : s.toLowerCase().includes(t)) || ((o = n.category_path) == null ? void 0 : o.toLowerCase().includes(t));
    }
  );
}
function Os(e) {
  return e.filter((r) => r.is_low_stock || (r.total_stock ?? 0) <= 0);
}
function Zl(e) {
  function r(t) {
    const n = t.parts.filter(
      (i) => i.is_low_stock || (i.total_stock ?? 0) <= 0
    ), a = t.children.map(r).filter((i) => i !== null);
    return n.length > 0 || a.length > 0 ? {
      ...t,
      parts: n,
      children: a
    } : null;
  }
  return e.map(r).filter((t) => t !== null);
}
function Rs(e) {
  return e.filter((r) => r.has_needs_check === !0);
}
function ql(e) {
  function r(t) {
    const n = t.parts.filter(
      (i) => i.has_needs_check === !0
    ), a = t.children.map(r).filter((i) => i !== null);
    return n.length > 0 || a.length > 0 ? {
      ...t,
      parts: n,
      children: a
    } : null;
  }
  return e.map(r).filter((t) => t !== null);
}
/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var Qn = {};
Qn.version = "0.18.5";
var Is = 1252, ec = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4], Ns = function(e) {
  ec.indexOf(e) != -1 && (Is = e);
};
function tc() {
  Ns(1252);
}
var wn = function(e) {
  Ns(e);
};
function rc() {
  wn(1200), tc();
}
var Un = function(r) {
  return String.fromCharCode(r);
}, d0 = function(r) {
  return String.fromCharCode(r);
}, Zn, nr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function Tn(e) {
  for (var r = "", t = 0, n = 0, a = 0, i = 0, s = 0, o = 0, l = 0, f = 0; f < e.length; )
    t = e.charCodeAt(f++), i = t >> 2, n = e.charCodeAt(f++), s = (t & 3) << 4 | n >> 4, a = e.charCodeAt(f++), o = (n & 15) << 2 | a >> 6, l = a & 63, isNaN(n) ? o = l = 64 : isNaN(a) && (l = 64), r += nr.charAt(i) + nr.charAt(s) + nr.charAt(o) + nr.charAt(l);
  return r;
}
function zt(e) {
  var r = "", t = 0, n = 0, a = 0, i = 0, s = 0, o = 0, l = 0;
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var f = 0; f < e.length; )
    i = nr.indexOf(e.charAt(f++)), s = nr.indexOf(e.charAt(f++)), t = i << 2 | s >> 4, r += String.fromCharCode(t), o = nr.indexOf(e.charAt(f++)), n = (s & 15) << 4 | o >> 2, o !== 64 && (r += String.fromCharCode(n)), l = nr.indexOf(e.charAt(f++)), a = (o & 3) << 6 | l, l !== 64 && (r += String.fromCharCode(a));
  return r;
}
var ge = /* @__PURE__ */ (function() {
  return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
})(), jt = /* @__PURE__ */ (function() {
  if (typeof Buffer < "u") {
    var e = !Buffer.from;
    if (!e) try {
      Buffer.from("foo", "utf8");
    } catch {
      e = !0;
    }
    return e ? function(r, t) {
      return t ? new Buffer(r, t) : new Buffer(r);
    } : Buffer.from.bind(Buffer);
  }
  return function() {
  };
})();
function Tr(e) {
  return ge ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
function m0(e) {
  return ge ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
var Rt = function(r) {
  return ge ? jt(r, "binary") : r.split("").map(function(t) {
    return t.charCodeAt(0) & 255;
  });
};
function ua(e) {
  if (typeof ArrayBuffer > "u") return Rt(e);
  for (var r = new ArrayBuffer(e.length), t = new Uint8Array(r), n = 0; n != e.length; ++n) t[n] = e.charCodeAt(n) & 255;
  return r;
}
function On(e) {
  if (Array.isArray(e)) return e.map(function(n) {
    return String.fromCharCode(n);
  }).join("");
  for (var r = [], t = 0; t < e.length; ++t) r[t] = String.fromCharCode(e[t]);
  return r.join("");
}
function nc(e) {
  if (typeof Uint8Array > "u") throw new Error("Unsupported");
  return new Uint8Array(e);
}
var Qe = ge ? function(e) {
  return Buffer.concat(e.map(function(r) {
    return Buffer.isBuffer(r) ? r : jt(r);
  }));
} : function(e) {
  if (typeof Uint8Array < "u") {
    var r = 0, t = 0;
    for (r = 0; r < e.length; ++r) t += e[r].length;
    var n = new Uint8Array(t), a = 0;
    for (r = 0, t = 0; r < e.length; t += a, ++r)
      if (a = e[r].length, e[r] instanceof Uint8Array) n.set(e[r], t);
      else {
        if (typeof e[r] == "string")
          throw "wtf";
        n.set(new Uint8Array(e[r]), t);
      }
    return n;
  }
  return [].concat.apply([], e.map(function(i) {
    return Array.isArray(i) ? i : [].slice.call(i);
  }));
};
function ac(e) {
  for (var r = [], t = 0, n = e.length + 250, a = Tr(e.length + 255), i = 0; i < e.length; ++i) {
    var s = e.charCodeAt(i);
    if (s < 128) a[t++] = s;
    else if (s < 2048)
      a[t++] = 192 | s >> 6 & 31, a[t++] = 128 | s & 63;
    else if (s >= 55296 && s < 57344) {
      s = (s & 1023) + 64;
      var o = e.charCodeAt(++i) & 1023;
      a[t++] = 240 | s >> 8 & 7, a[t++] = 128 | s >> 2 & 63, a[t++] = 128 | o >> 6 & 15 | (s & 3) << 4, a[t++] = 128 | o & 63;
    } else
      a[t++] = 224 | s >> 12 & 15, a[t++] = 128 | s >> 6 & 63, a[t++] = 128 | s & 63;
    t > n && (r.push(a.slice(0, t)), t = 0, a = Tr(65535), n = 65530);
  }
  return r.push(a.slice(0, t)), Qe(r);
}
var xn = /\u0000/g, Wn = /[\u0001-\u0006]/g;
function br(e) {
  for (var r = "", t = e.length - 1; t >= 0; ) r += e.charAt(t--);
  return r;
}
function It(e, r) {
  var t = "" + e;
  return t.length >= r ? t : Le("0", r - t.length) + t;
}
function _i(e, r) {
  var t = "" + e;
  return t.length >= r ? t : Le(" ", r - t.length) + t;
}
function qn(e, r) {
  var t = "" + e;
  return t.length >= r ? t : t + Le(" ", r - t.length);
}
function ic(e, r) {
  var t = "" + Math.round(e);
  return t.length >= r ? t : Le("0", r - t.length) + t;
}
function sc(e, r) {
  var t = "" + e;
  return t.length >= r ? t : Le("0", r - t.length) + t;
}
var p0 = /* @__PURE__ */ Math.pow(2, 32);
function Rr(e, r) {
  if (e > p0 || e < -p0) return ic(e, r);
  var t = Math.round(e);
  return sc(t, r);
}
function ea(e, r) {
  return r = r || 0, e.length >= 7 + r && (e.charCodeAt(r) | 32) === 103 && (e.charCodeAt(r + 1) | 32) === 101 && (e.charCodeAt(r + 2) | 32) === 110 && (e.charCodeAt(r + 3) | 32) === 101 && (e.charCodeAt(r + 4) | 32) === 114 && (e.charCodeAt(r + 5) | 32) === 97 && (e.charCodeAt(r + 6) | 32) === 108;
}
var v0 = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"]
], Ia = [
  ["J", "Jan", "January"],
  ["F", "Feb", "February"],
  ["M", "Mar", "March"],
  ["A", "Apr", "April"],
  ["M", "May", "May"],
  ["J", "Jun", "June"],
  ["J", "Jul", "July"],
  ["A", "Aug", "August"],
  ["S", "Sep", "September"],
  ["O", "Oct", "October"],
  ["N", "Nov", "November"],
  ["D", "Dec", "December"]
];
function oc(e) {
  return e || (e = {}), e[0] = "General", e[1] = "0", e[2] = "0.00", e[3] = "#,##0", e[4] = "#,##0.00", e[9] = "0%", e[10] = "0.00%", e[11] = "0.00E+00", e[12] = "# ?/?", e[13] = "# ??/??", e[14] = "m/d/yy", e[15] = "d-mmm-yy", e[16] = "d-mmm", e[17] = "mmm-yy", e[18] = "h:mm AM/PM", e[19] = "h:mm:ss AM/PM", e[20] = "h:mm", e[21] = "h:mm:ss", e[22] = "m/d/yy h:mm", e[37] = "#,##0 ;(#,##0)", e[38] = "#,##0 ;[Red](#,##0)", e[39] = "#,##0.00;(#,##0.00)", e[40] = "#,##0.00;[Red](#,##0.00)", e[45] = "mm:ss", e[46] = "[h]:mm:ss", e[47] = "mmss.0", e[48] = "##0.0E+0", e[49] = "@", e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "', e;
}
var Be = {
  0: "General",
  1: "0",
  2: "0.00",
  3: "#,##0",
  4: "#,##0.00",
  9: "0%",
  10: "0.00%",
  11: "0.00E+00",
  12: "# ?/?",
  13: "# ??/??",
  14: "m/d/yy",
  15: "d-mmm-yy",
  16: "d-mmm",
  17: "mmm-yy",
  18: "h:mm AM/PM",
  19: "h:mm:ss AM/PM",
  20: "h:mm",
  21: "h:mm:ss",
  22: "m/d/yy h:mm",
  37: "#,##0 ;(#,##0)",
  38: "#,##0 ;[Red](#,##0)",
  39: "#,##0.00;(#,##0.00)",
  40: "#,##0.00;[Red](#,##0.00)",
  45: "mm:ss",
  46: "[h]:mm:ss",
  47: "mmss.0",
  48: "##0.0E+0",
  49: "@",
  56: '"上午/下午 "hh"時"mm"分"ss"秒 "'
}, _0 = {
  5: 37,
  6: 38,
  7: 39,
  8: 40,
  //  5 -> 37 ...  8 -> 40
  23: 0,
  24: 0,
  25: 0,
  26: 0,
  // 23 ->  0 ... 26 ->  0
  27: 14,
  28: 14,
  29: 14,
  30: 14,
  31: 14,
  // 27 -> 14 ... 31 -> 14
  50: 14,
  51: 14,
  52: 14,
  53: 14,
  54: 14,
  // 50 -> 14 ... 58 -> 14
  55: 14,
  56: 14,
  57: 14,
  58: 14,
  59: 1,
  60: 2,
  61: 3,
  62: 4,
  // 59 ->  1 ... 62 ->  4
  67: 9,
  68: 10,
  // 67 ->  9 ... 68 -> 10
  69: 12,
  70: 13,
  71: 14,
  // 69 -> 12 ... 71 -> 14
  72: 14,
  73: 15,
  74: 16,
  75: 17,
  // 72 -> 14 ... 75 -> 17
  76: 20,
  77: 21,
  78: 22,
  // 76 -> 20 ... 78 -> 22
  79: 45,
  80: 46,
  81: 47,
  // 79 -> 45 ... 81 -> 47
  82: 0
  // 82 ->  0 ... 65536 -> 0 (omitted)
}, fc = {
  //  5 -- Currency,   0 decimal, black negative
  5: '"$"#,##0_);\\("$"#,##0\\)',
  63: '"$"#,##0_);\\("$"#,##0\\)',
  //  6 -- Currency,   0 decimal, red   negative
  6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  //  7 -- Currency,   2 decimal, black negative
  7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  //  8 -- Currency,   2 decimal, red   negative
  8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  // 41 -- Accounting, 0 decimal, No Symbol
  41: '_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)',
  // 42 -- Accounting, 0 decimal, $  Symbol
  42: '_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)',
  // 43 -- Accounting, 2 decimal, No Symbol
  43: '_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)',
  // 44 -- Accounting, 2 decimal, $  Symbol
  44: '_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)'
};
function ta(e, r, t) {
  for (var n = e < 0 ? -1 : 1, a = e * n, i = 0, s = 1, o = 0, l = 1, f = 0, c = 0, d = Math.floor(a); f < r && (d = Math.floor(a), o = d * s + i, c = d * f + l, !(a - d < 5e-8)); )
    a = 1 / (a - d), i = s, s = o, l = f, f = c;
  if (c > r && (f > r ? (c = l, o = i) : (c = f, o = s)), !t) return [0, n * o, c];
  var h = Math.floor(n * o / c);
  return [h, n * o - h * c, c];
}
function Hn(e, r, t) {
  if (e > 2958465 || e < 0) return null;
  var n = e | 0, a = Math.floor(86400 * (e - n)), i = 0, s = [], o = { D: n, T: a, u: 86400 * (e - n) - a, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
  if (Math.abs(o.u) < 1e-6 && (o.u = 0), r && r.date1904 && (n += 1462), o.u > 0.9999 && (o.u = 0, ++a == 86400 && (o.T = a = 0, ++n, ++o.D)), n === 60)
    s = t ? [1317, 10, 29] : [1900, 2, 29], i = 3;
  else if (n === 0)
    s = t ? [1317, 8, 29] : [1900, 1, 0], i = 6;
  else {
    n > 60 && --n;
    var l = new Date(1900, 0, 1);
    l.setDate(l.getDate() + n - 1), s = [l.getFullYear(), l.getMonth() + 1, l.getDate()], i = l.getDay(), n < 60 && (i = (i + 6) % 7), t && (i = mc(l, s));
  }
  return o.y = s[0], o.m = s[1], o.d = s[2], o.S = a % 60, a = Math.floor(a / 60), o.M = a % 60, a = Math.floor(a / 60), o.H = a, o.q = i, o;
}
var Ds = /* @__PURE__ */ new Date(1899, 11, 31, 0, 0, 0), lc = /* @__PURE__ */ Ds.getTime(), cc = /* @__PURE__ */ new Date(1900, 2, 1, 0, 0, 0);
function Ps(e, r) {
  var t = /* @__PURE__ */ e.getTime();
  return r ? t -= 1461 * 24 * 60 * 60 * 1e3 : e >= cc && (t += 1440 * 60 * 1e3), (t - (lc + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ Ds.getTimezoneOffset()) * 6e4)) / (1440 * 60 * 1e3);
}
function gi(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function hc(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function uc(e) {
  var r = e < 0 ? 12 : 11, t = gi(e.toFixed(12));
  return t.length <= r || (t = e.toPrecision(10), t.length <= r) ? t : e.toExponential(5);
}
function xc(e) {
  var r = gi(e.toFixed(11));
  return r.length > (e < 0 ? 12 : 11) || r === "0" || r === "-0" ? e.toPrecision(6) : r;
}
function dc(e) {
  var r = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E), t;
  return r >= -4 && r <= -1 ? t = e.toPrecision(10 + r) : Math.abs(r) <= 9 ? t = uc(e) : r === 10 ? t = e.toFixed(10).substr(0, 12) : t = xc(e), gi(hc(t.toUpperCase()));
}
function fi(e, r) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : dc(e);
    case "undefined":
      return "";
    case "object":
      if (e == null) return "";
      if (e instanceof Date) return ir(14, Ps(e, r && r.date1904), r);
  }
  throw new Error("unsupported value in General format: " + e);
}
function mc(e, r) {
  r[0] -= 581;
  var t = e.getDay();
  return e < 60 && (t = (t + 6) % 7), t;
}
function pc(e, r, t, n) {
  var a = "", i = 0, s = 0, o = t.y, l, f = 0;
  switch (e) {
    case 98:
      o = t.y + 543;
    /* falls through */
    case 121:
      switch (r.length) {
        case 1:
        case 2:
          l = o % 100, f = 2;
          break;
        default:
          l = o % 1e4, f = 4;
          break;
      }
      break;
    case 109:
      switch (r.length) {
        case 1:
        case 2:
          l = t.m, f = r.length;
          break;
        case 3:
          return Ia[t.m - 1][1];
        case 5:
          return Ia[t.m - 1][0];
        default:
          return Ia[t.m - 1][2];
      }
      break;
    case 100:
      switch (r.length) {
        case 1:
        case 2:
          l = t.d, f = r.length;
          break;
        case 3:
          return v0[t.q][0];
        default:
          return v0[t.q][1];
      }
      break;
    case 104:
      switch (r.length) {
        case 1:
        case 2:
          l = 1 + (t.H + 11) % 12, f = r.length;
          break;
        default:
          throw "bad hour format: " + r;
      }
      break;
    case 72:
      switch (r.length) {
        case 1:
        case 2:
          l = t.H, f = r.length;
          break;
        default:
          throw "bad hour format: " + r;
      }
      break;
    case 77:
      switch (r.length) {
        case 1:
        case 2:
          l = t.M, f = r.length;
          break;
        default:
          throw "bad minute format: " + r;
      }
      break;
    case 115:
      if (r != "s" && r != "ss" && r != ".0" && r != ".00" && r != ".000") throw "bad second format: " + r;
      return t.u === 0 && (r == "s" || r == "ss") ? It(t.S, r.length) : (n >= 2 ? s = n === 3 ? 1e3 : 100 : s = n === 1 ? 10 : 1, i = Math.round(s * (t.S + t.u)), i >= 60 * s && (i = 0), r === "s" ? i === 0 ? "0" : "" + i / s : (a = It(i, 2 + n), r === "ss" ? a.substr(0, 2) : "." + a.substr(2, r.length - 1)));
    case 90:
      switch (r) {
        case "[h]":
        case "[hh]":
          l = t.D * 24 + t.H;
          break;
        case "[m]":
        case "[mm]":
          l = (t.D * 24 + t.H) * 60 + t.M;
          break;
        case "[s]":
        case "[ss]":
          l = ((t.D * 24 + t.H) * 60 + t.M) * 60 + Math.round(t.S + t.u);
          break;
        default:
          throw "bad abstime format: " + r;
      }
      f = r.length === 3 ? 1 : 2;
      break;
    case 101:
      l = o, f = 1;
      break;
  }
  var c = f > 0 ? It(l, f) : "";
  return c;
}
function ar(e) {
  var r = 3;
  if (e.length <= r) return e;
  for (var t = e.length % r, n = e.substr(0, t); t != e.length; t += r) n += (n.length > 0 ? "," : "") + e.substr(t, r);
  return n;
}
var Ms = /%/g;
function vc(e, r, t) {
  var n = r.replace(Ms, ""), a = r.length - n.length;
  return Gt(e, n, t * Math.pow(10, 2 * a)) + Le("%", a);
}
function _c(e, r, t) {
  for (var n = r.length - 1; r.charCodeAt(n - 1) === 44; ) --n;
  return Gt(e, r.substr(0, n), t / Math.pow(10, 3 * (r.length - n)));
}
function Ls(e, r) {
  var t, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (r == 0) return "0.0E+0";
    if (r < 0) return "-" + Ls(e, -r);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(r) * Math.LOG10E) % a;
    if (i < 0 && (i += a), t = (r / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), t.indexOf("e") === -1) {
      var s = Math.floor(Math.log(r) * Math.LOG10E);
      for (t.indexOf(".") === -1 ? t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + i) : t += "E+" + (s - i); t.substr(0, 2) === "0."; )
        t = t.charAt(0) + t.substr(2, a) + "." + t.substr(2 + a), t = t.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
      t = t.replace(/\+-/, "-");
    }
    t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(o, l, f, c) {
      return l + f + c.substr(0, (a + i) % a) + "." + c.substr(i) + "E";
    });
  } else t = r.toExponential(n);
  return e.match(/E\+00$/) && t.match(/e[+-]\d$/) && (t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1)), e.match(/E\-/) && t.match(/e\+/) && (t = t.replace(/e\+/, "e")), t.replace("e", "E");
}
var Bs = /# (\?+)( ?)\/( ?)(\d+)/;
function gc(e, r, t) {
  var n = parseInt(e[4], 10), a = Math.round(r * n), i = Math.floor(a / n), s = a - i * n, o = n;
  return t + (i === 0 ? "" : "" + i) + " " + (s === 0 ? Le(" ", e[1].length + 1 + e[4].length) : _i(s, e[1].length) + e[2] + "/" + e[3] + It(o, e[4].length));
}
function wc(e, r, t) {
  return t + (r === 0 ? "" : "" + r) + Le(" ", e[1].length + 2 + e[4].length);
}
var bs = /^#*0*\.([0#]+)/, Us = /\).*[0#]/, Ws = /\(###\) ###\\?-####/;
function ot(e) {
  for (var r = "", t, n = 0; n != e.length; ++n) switch (t = e.charCodeAt(n)) {
    case 35:
      break;
    case 63:
      r += " ";
      break;
    case 48:
      r += "0";
      break;
    default:
      r += String.fromCharCode(t);
  }
  return r;
}
function g0(e, r) {
  var t = Math.pow(10, r);
  return "" + Math.round(e * t) / t;
}
function w0(e, r) {
  var t = e - Math.floor(e), n = Math.pow(10, r);
  return r < ("" + Math.round(t * n)).length ? 0 : Math.round(t * n);
}
function Tc(e, r) {
  return r < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, r))).length ? 1 : 0;
}
function Ec(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function St(e, r, t) {
  if (e.charCodeAt(0) === 40 && !r.match(Us)) {
    var n = r.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return t >= 0 ? St("n", n, t) : "(" + St("n", n, -t) + ")";
  }
  if (r.charCodeAt(r.length - 1) === 44) return _c(e, r, t);
  if (r.indexOf("%") !== -1) return vc(e, r, t);
  if (r.indexOf("E") !== -1) return Ls(r, t);
  if (r.charCodeAt(0) === 36) return "$" + St(e, r.substr(r.charAt(1) == " " ? 2 : 1), t);
  var a, i, s, o, l = Math.abs(t), f = t < 0 ? "-" : "";
  if (r.match(/^00+$/)) return f + Rr(l, r.length);
  if (r.match(/^[#?]+$/))
    return a = Rr(t, 0), a === "0" && (a = ""), a.length > r.length ? a : ot(r.substr(0, r.length - a.length)) + a;
  if (i = r.match(Bs)) return gc(i, l, f);
  if (r.match(/^#+0+$/)) return f + Rr(l, r.length - r.indexOf("0"));
  if (i = r.match(bs))
    return a = g0(t, i[1].length).replace(/^([^\.]+)$/, "$1." + ot(i[1])).replace(/\.$/, "." + ot(i[1])).replace(/\.(\d*)$/, function(v, x) {
      return "." + x + Le("0", ot(
        /*::(*/
        i[1]
      ).length - x.length);
    }), r.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (r = r.replace(/^#+([0.])/, "$1"), i = r.match(/^(0*)\.(#*)$/))
    return f + g0(l, i[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = r.match(/^#{1,3},##0(\.?)$/)) return f + ar(Rr(l, 0));
  if (i = r.match(/^#,##0\.([#0]*0)$/))
    return t < 0 ? "-" + St(e, r, -t) : ar("" + (Math.floor(t) + Tc(t, i[1].length))) + "." + It(w0(t, i[1].length), i[1].length);
  if (i = r.match(/^#,#*,#0/)) return St(e, r.replace(/^#,#*,/, ""), t);
  if (i = r.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = br(St(e, r.replace(/[\\-]/g, ""), t)), s = 0, br(br(r.replace(/\\/g, "")).replace(/[0#]/g, function(v) {
      return s < a.length ? a.charAt(s++) : v === "0" ? "0" : "";
    }));
  if (r.match(Ws))
    return a = St(e, "##########", t), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var c = "";
  if (i = r.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), o = ta(l, Math.pow(10, s) - 1, !1), a = "" + f, c = Gt(
      "n",
      /*::String(*/
      i[1],
      o[1]
    ), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), a += c + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], c = qn(o[2], s), c.length < i[4].length && (c = ot(i[4].substr(i[4].length - c.length)) + c), a += c, a;
  if (i = r.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), o = ta(l, Math.pow(10, s) - 1, !0), f + (o[0] || (o[1] ? "" : "0")) + " " + (o[1] ? _i(o[1], s) + i[2] + "/" + i[3] + qn(o[2], s) : Le(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = r.match(/^[#0?]+$/))
    return a = Rr(t, 0), r.length <= a.length ? a : ot(r.substr(0, r.length - a.length)) + a;
  if (i = r.match(/^([#0?]+)\.([#0]+)$/)) {
    a = "" + t.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var d = r.indexOf(".") - s, h = r.length - a.length - d;
    return ot(r.substr(0, d) + a + r.substr(r.length - h));
  }
  if (i = r.match(/^00,000\.([#0]*0)$/))
    return s = w0(t, i[1].length), t < 0 ? "-" + St(e, r, -t) : ar(Ec(t)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(v) {
      return "00," + (v.length < 3 ? It(0, 3 - v.length) : "") + v;
    }) + "." + It(s, i[1].length);
  switch (r) {
    case "###,##0.00":
      return St(e, "#,##0.00", t);
    case "###,###":
    case "##,###":
    case "#,###":
      var u = ar(Rr(l, 0));
      return u !== "0" ? f + u : "";
    case "###,###.00":
      return St(e, "###,##0.00", t).replace(/^0\./, ".");
    case "#,###.00":
      return St(e, "#,##0.00", t).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + r + "|");
}
function Sc(e, r, t) {
  for (var n = r.length - 1; r.charCodeAt(n - 1) === 44; ) --n;
  return Gt(e, r.substr(0, n), t / Math.pow(10, 3 * (r.length - n)));
}
function yc(e, r, t) {
  var n = r.replace(Ms, ""), a = r.length - n.length;
  return Gt(e, n, t * Math.pow(10, 2 * a)) + Le("%", a);
}
function Hs(e, r) {
  var t, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (r == 0) return "0.0E+0";
    if (r < 0) return "-" + Hs(e, -r);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(r) * Math.LOG10E) % a;
    if (i < 0 && (i += a), t = (r / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), !t.match(/[Ee]/)) {
      var s = Math.floor(Math.log(r) * Math.LOG10E);
      t.indexOf(".") === -1 ? t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + i) : t += "E+" + (s - i), t = t.replace(/\+-/, "-");
    }
    t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(o, l, f, c) {
      return l + f + c.substr(0, (a + i) % a) + "." + c.substr(i) + "E";
    });
  } else t = r.toExponential(n);
  return e.match(/E\+00$/) && t.match(/e[+-]\d$/) && (t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1)), e.match(/E\-/) && t.match(/e\+/) && (t = t.replace(/e\+/, "e")), t.replace("e", "E");
}
function Mt(e, r, t) {
  if (e.charCodeAt(0) === 40 && !r.match(Us)) {
    var n = r.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return t >= 0 ? Mt("n", n, t) : "(" + Mt("n", n, -t) + ")";
  }
  if (r.charCodeAt(r.length - 1) === 44) return Sc(e, r, t);
  if (r.indexOf("%") !== -1) return yc(e, r, t);
  if (r.indexOf("E") !== -1) return Hs(r, t);
  if (r.charCodeAt(0) === 36) return "$" + Mt(e, r.substr(r.charAt(1) == " " ? 2 : 1), t);
  var a, i, s, o, l = Math.abs(t), f = t < 0 ? "-" : "";
  if (r.match(/^00+$/)) return f + It(l, r.length);
  if (r.match(/^[#?]+$/))
    return a = "" + t, t === 0 && (a = ""), a.length > r.length ? a : ot(r.substr(0, r.length - a.length)) + a;
  if (i = r.match(Bs)) return wc(i, l, f);
  if (r.match(/^#+0+$/)) return f + It(l, r.length - r.indexOf("0"));
  if (i = r.match(bs))
    return a = ("" + t).replace(/^([^\.]+)$/, "$1." + ot(i[1])).replace(/\.$/, "." + ot(i[1])), a = a.replace(/\.(\d*)$/, function(v, x) {
      return "." + x + Le("0", ot(i[1]).length - x.length);
    }), r.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (r = r.replace(/^#+([0.])/, "$1"), i = r.match(/^(0*)\.(#*)$/))
    return f + ("" + l).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = r.match(/^#{1,3},##0(\.?)$/)) return f + ar("" + l);
  if (i = r.match(/^#,##0\.([#0]*0)$/))
    return t < 0 ? "-" + Mt(e, r, -t) : ar("" + t) + "." + Le("0", i[1].length);
  if (i = r.match(/^#,#*,#0/)) return Mt(e, r.replace(/^#,#*,/, ""), t);
  if (i = r.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = br(Mt(e, r.replace(/[\\-]/g, ""), t)), s = 0, br(br(r.replace(/\\/g, "")).replace(/[0#]/g, function(v) {
      return s < a.length ? a.charAt(s++) : v === "0" ? "0" : "";
    }));
  if (r.match(Ws))
    return a = Mt(e, "##########", t), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var c = "";
  if (i = r.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), o = ta(l, Math.pow(10, s) - 1, !1), a = "" + f, c = Gt(
      "n",
      /*::String(*/
      i[1],
      o[1]
    ), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), a += c + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], c = qn(o[2], s), c.length < i[4].length && (c = ot(i[4].substr(i[4].length - c.length)) + c), a += c, a;
  if (i = r.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), o = ta(l, Math.pow(10, s) - 1, !0), f + (o[0] || (o[1] ? "" : "0")) + " " + (o[1] ? _i(o[1], s) + i[2] + "/" + i[3] + qn(o[2], s) : Le(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = r.match(/^[#0?]+$/))
    return a = "" + t, r.length <= a.length ? a : ot(r.substr(0, r.length - a.length)) + a;
  if (i = r.match(/^([#0]+)\.([#0]+)$/)) {
    a = "" + t.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var d = r.indexOf(".") - s, h = r.length - a.length - d;
    return ot(r.substr(0, d) + a + r.substr(r.length - h));
  }
  if (i = r.match(/^00,000\.([#0]*0)$/))
    return t < 0 ? "-" + Mt(e, r, -t) : ar("" + t).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(v) {
      return "00," + (v.length < 3 ? It(0, 3 - v.length) : "") + v;
    }) + "." + It(0, i[1].length);
  switch (r) {
    case "###,###":
    case "##,###":
    case "#,###":
      var u = ar("" + l);
      return u !== "0" ? f + u : "";
    default:
      if (r.match(/\.[0#?]*$/)) return Mt(e, r.slice(0, r.lastIndexOf(".")), t) + ot(r.slice(r.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + r + "|");
}
function Gt(e, r, t) {
  return (t | 0) === t ? Mt(e, r, t) : St(e, r, t);
}
function Fc(e) {
  for (var r = [], t = !1, n = 0, a = 0; n < e.length; ++n) switch (
    /*cc=*/
    e.charCodeAt(n)
  ) {
    case 34:
      t = !t;
      break;
    case 95:
    case 42:
    case 92:
      ++n;
      break;
    case 59:
      r[r.length] = e.substr(a, n - a), a = n + 1;
  }
  if (r[r.length] = e.substr(a), t === !0) throw new Error("Format |" + e + "| unterminated string ");
  return r;
}
var Gs = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function $s(e) {
  for (var r = 0, t = "", n = ""; r < e.length; )
    switch (t = e.charAt(r)) {
      case "G":
        ea(e, r) && (r += 6), r++;
        break;
      case '"':
        for (
          ;
          /*cc=*/
          e.charCodeAt(++r) !== 34 && r < e.length;
        )
          ;
        ++r;
        break;
      case "\\":
        r += 2;
        break;
      case "_":
        r += 2;
        break;
      case "@":
        ++r;
        break;
      case "B":
      case "b":
        if (e.charAt(r + 1) === "1" || e.charAt(r + 1) === "2") return !0;
      /* falls through */
      case "M":
      case "D":
      case "Y":
      case "H":
      case "S":
      case "E":
      /* falls through */
      case "m":
      case "d":
      case "y":
      case "h":
      case "s":
      case "e":
      case "g":
        return !0;
      case "A":
      case "a":
      case "上":
        if (e.substr(r, 3).toUpperCase() === "A/P" || e.substr(r, 5).toUpperCase() === "AM/PM" || e.substr(r, 5).toUpperCase() === "上午/下午") return !0;
        ++r;
        break;
      case "[":
        for (n = t; e.charAt(r++) !== "]" && r < e.length; ) n += e.charAt(r);
        if (n.match(Gs)) return !0;
        break;
      case ".":
      /* falls through */
      case "0":
      case "#":
        for (; r < e.length && ("0#?.,E+-%".indexOf(t = e.charAt(++r)) > -1 || t == "\\" && e.charAt(r + 1) == "-" && "0#".indexOf(e.charAt(r + 2)) > -1); )
          ;
        break;
      case "?":
        for (; e.charAt(++r) === t; )
          ;
        break;
      case "*":
        ++r, (e.charAt(r) == " " || e.charAt(r) == "*") && ++r;
        break;
      case "(":
      case ")":
        ++r;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        for (; r < e.length && "0123456789".indexOf(e.charAt(++r)) > -1; )
          ;
        break;
      case " ":
        ++r;
        break;
      default:
        ++r;
        break;
    }
  return !1;
}
function Cc(e, r, t, n) {
  for (var a = [], i = "", s = 0, o = "", l = "t", f, c, d, h = "H"; s < e.length; )
    switch (o = e.charAt(s)) {
      case "G":
        if (!ea(e, s)) throw new Error("unrecognized character " + o + " in " + e);
        a[a.length] = { t: "G", v: "General" }, s += 7;
        break;
      case '"':
        for (i = ""; (d = e.charCodeAt(++s)) !== 34 && s < e.length; ) i += String.fromCharCode(d);
        a[a.length] = { t: "t", v: i }, ++s;
        break;
      case "\\":
        var u = e.charAt(++s), v = u === "(" || u === ")" ? u : "t";
        a[a.length] = { t: v, v: u }, ++s;
        break;
      case "_":
        a[a.length] = { t: "t", v: " " }, s += 2;
        break;
      case "@":
        a[a.length] = { t: "T", v: r }, ++s;
        break;
      case "B":
      case "b":
        if (e.charAt(s + 1) === "1" || e.charAt(s + 1) === "2") {
          if (f == null && (f = Hn(r, t, e.charAt(s + 1) === "2"), f == null))
            return "";
          a[a.length] = { t: "X", v: e.substr(s, 2) }, l = o, s += 2;
          break;
        }
      /* falls through */
      case "M":
      case "D":
      case "Y":
      case "H":
      case "S":
      case "E":
        o = o.toLowerCase();
      /* falls through */
      case "m":
      case "d":
      case "y":
      case "h":
      case "s":
      case "e":
      case "g":
        if (r < 0 || f == null && (f = Hn(r, t), f == null))
          return "";
        for (i = o; ++s < e.length && e.charAt(s).toLowerCase() === o; ) i += o;
        o === "m" && l.toLowerCase() === "h" && (o = "M"), o === "h" && (o = h), a[a.length] = { t: o, v: i }, l = o;
        break;
      case "A":
      case "a":
      case "上":
        var x = { t: o, v: o };
        if (f == null && (f = Hn(r, t)), e.substr(s, 3).toUpperCase() === "A/P" ? (f != null && (x.v = f.H >= 12 ? "P" : "A"), x.t = "T", h = "h", s += 3) : e.substr(s, 5).toUpperCase() === "AM/PM" ? (f != null && (x.v = f.H >= 12 ? "PM" : "AM"), x.t = "T", s += 5, h = "h") : e.substr(s, 5).toUpperCase() === "上午/下午" ? (f != null && (x.v = f.H >= 12 ? "下午" : "上午"), x.t = "T", s += 5, h = "h") : (x.t = "t", ++s), f == null && x.t === "T") return "";
        a[a.length] = x, l = o;
        break;
      case "[":
        for (i = o; e.charAt(s++) !== "]" && s < e.length; ) i += e.charAt(s);
        if (i.slice(-1) !== "]") throw 'unterminated "[" block: |' + i + "|";
        if (i.match(Gs)) {
          if (f == null && (f = Hn(r, t), f == null))
            return "";
          a[a.length] = { t: "Z", v: i.toLowerCase() }, l = i.charAt(1);
        } else i.indexOf("$") > -1 && (i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$", $s(e) || (a[a.length] = { t: "t", v: i }));
        break;
      /* Numbers */
      case ".":
        if (f != null) {
          for (i = o; ++s < e.length && (o = e.charAt(s)) === "0"; ) i += o;
          a[a.length] = { t: "s", v: i };
          break;
        }
      /* falls through */
      case "0":
      case "#":
        for (i = o; ++s < e.length && "0#?.,E+-%".indexOf(o = e.charAt(s)) > -1; ) i += o;
        a[a.length] = { t: "n", v: i };
        break;
      case "?":
        for (i = o; e.charAt(++s) === o; ) i += o;
        a[a.length] = { t: o, v: i }, l = o;
        break;
      case "*":
        ++s, (e.charAt(s) == " " || e.charAt(s) == "*") && ++s;
        break;
      // **
      case "(":
      case ")":
        a[a.length] = { t: n === 1 ? "t" : o, v: o }, ++s;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        for (i = o; s < e.length && "0123456789".indexOf(e.charAt(++s)) > -1; ) i += e.charAt(s);
        a[a.length] = { t: "D", v: i };
        break;
      case " ":
        a[a.length] = { t: o, v: o }, ++s;
        break;
      case "$":
        a[a.length] = { t: "t", v: "$" }, ++s;
        break;
      default:
        if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(o) === -1) throw new Error("unrecognized character " + o + " in " + e);
        a[a.length] = { t: "t", v: o }, ++s;
        break;
    }
  var g = 0, C = 0, O;
  for (s = a.length - 1, l = "t"; s >= 0; --s)
    switch (a[s].t) {
      case "h":
      case "H":
        a[s].t = h, l = "h", g < 1 && (g = 1);
        break;
      case "s":
        (O = a[s].v.match(/\.0+$/)) && (C = Math.max(C, O[0].length - 1)), g < 3 && (g = 3);
      /* falls through */
      case "d":
      case "y":
      case "M":
      case "e":
        l = a[s].t;
        break;
      case "m":
        l === "s" && (a[s].t = "M", g < 2 && (g = 2));
        break;
      case "X":
        break;
      case "Z":
        g < 1 && a[s].v.match(/[Hh]/) && (g = 1), g < 2 && a[s].v.match(/[Mm]/) && (g = 2), g < 3 && a[s].v.match(/[Ss]/) && (g = 3);
    }
  switch (g) {
    case 0:
      break;
    case 1:
      f.u >= 0.5 && (f.u = 0, ++f.S), f.S >= 60 && (f.S = 0, ++f.M), f.M >= 60 && (f.M = 0, ++f.H);
      break;
    case 2:
      f.u >= 0.5 && (f.u = 0, ++f.S), f.S >= 60 && (f.S = 0, ++f.M);
      break;
  }
  var F = "", L;
  for (s = 0; s < a.length; ++s)
    switch (a[s].t) {
      case "t":
      case "T":
      case " ":
      case "D":
        break;
      case "X":
        a[s].v = "", a[s].t = ";";
        break;
      case "d":
      case "m":
      case "y":
      case "h":
      case "H":
      case "M":
      case "s":
      case "e":
      case "b":
      case "Z":
        a[s].v = pc(a[s].t.charCodeAt(0), a[s].v, f, C), a[s].t = "t";
        break;
      case "n":
      case "?":
        for (L = s + 1; a[L] != null && ((o = a[L].t) === "?" || o === "D" || (o === " " || o === "t") && a[L + 1] != null && (a[L + 1].t === "?" || a[L + 1].t === "t" && a[L + 1].v === "/") || a[s].t === "(" && (o === " " || o === "n" || o === ")") || o === "t" && (a[L].v === "/" || a[L].v === " " && a[L + 1] != null && a[L + 1].t == "?")); )
          a[s].v += a[L].v, a[L] = { v: "", t: ";" }, ++L;
        F += a[s].v, s = L - 1;
        break;
      case "G":
        a[s].t = "t", a[s].v = fi(r, t);
        break;
    }
  var Y = "", q, R;
  if (F.length > 0) {
    F.charCodeAt(0) == 40 ? (q = r < 0 && F.charCodeAt(0) === 45 ? -r : r, R = Gt("n", F, q)) : (q = r < 0 && n > 1 ? -r : r, R = Gt("n", F, q), q < 0 && a[0] && a[0].t == "t" && (R = R.substr(1), a[0].v = "-" + a[0].v)), L = R.length - 1;
    var U = a.length;
    for (s = 0; s < a.length; ++s) if (a[s] != null && a[s].t != "t" && a[s].v.indexOf(".") > -1) {
      U = s;
      break;
    }
    var k = a.length;
    if (U === a.length && R.indexOf("E") === -1) {
      for (s = a.length - 1; s >= 0; --s)
        a[s] == null || "n?".indexOf(a[s].t) === -1 || (L >= a[s].v.length - 1 ? (L -= a[s].v.length, a[s].v = R.substr(L + 1, a[s].v.length)) : L < 0 ? a[s].v = "" : (a[s].v = R.substr(0, L + 1), L = -1), a[s].t = "t", k = s);
      L >= 0 && k < a.length && (a[k].v = R.substr(0, L + 1) + a[k].v);
    } else if (U !== a.length && R.indexOf("E") === -1) {
      for (L = R.indexOf(".") - 1, s = U; s >= 0; --s)
        if (!(a[s] == null || "n?".indexOf(a[s].t) === -1)) {
          for (c = a[s].v.indexOf(".") > -1 && s === U ? a[s].v.indexOf(".") - 1 : a[s].v.length - 1, Y = a[s].v.substr(c + 1); c >= 0; --c)
            L >= 0 && (a[s].v.charAt(c) === "0" || a[s].v.charAt(c) === "#") && (Y = R.charAt(L--) + Y);
          a[s].v = Y, a[s].t = "t", k = s;
        }
      for (L >= 0 && k < a.length && (a[k].v = R.substr(0, L + 1) + a[k].v), L = R.indexOf(".") + 1, s = U; s < a.length; ++s)
        if (!(a[s] == null || "n?(".indexOf(a[s].t) === -1 && s !== U)) {
          for (c = a[s].v.indexOf(".") > -1 && s === U ? a[s].v.indexOf(".") + 1 : 0, Y = a[s].v.substr(0, c); c < a[s].v.length; ++c)
            L < R.length && (Y += R.charAt(L++));
          a[s].v = Y, a[s].t = "t", k = s;
        }
    }
  }
  for (s = 0; s < a.length; ++s) a[s] != null && "n?".indexOf(a[s].t) > -1 && (q = n > 1 && r < 0 && s > 0 && a[s - 1].v === "-" ? -r : r, a[s].v = Gt(a[s].t, a[s].v, q), a[s].t = "t");
  var W = "";
  for (s = 0; s !== a.length; ++s) a[s] != null && (W += a[s].v);
  return W;
}
var T0 = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function E0(e, r) {
  if (r == null) return !1;
  var t = parseFloat(r[2]);
  switch (r[1]) {
    case "=":
      if (e == t) return !0;
      break;
    case ">":
      if (e > t) return !0;
      break;
    case "<":
      if (e < t) return !0;
      break;
    case "<>":
      if (e != t) return !0;
      break;
    case ">=":
      if (e >= t) return !0;
      break;
    case "<=":
      if (e <= t) return !0;
      break;
  }
  return !1;
}
function Ac(e, r) {
  var t = Fc(e), n = t.length, a = t[n - 1].indexOf("@");
  if (n < 4 && a > -1 && --n, t.length > 4) throw new Error("cannot find right format for |" + t.join("|") + "|");
  if (typeof r != "number") return [4, t.length === 4 || a > -1 ? t[t.length - 1] : "@"];
  switch (t.length) {
    case 1:
      t = a > -1 ? ["General", "General", "General", t[0]] : [t[0], t[0], t[0], "@"];
      break;
    case 2:
      t = a > -1 ? [t[0], t[0], t[0], t[1]] : [t[0], t[1], t[0], "@"];
      break;
    case 3:
      t = a > -1 ? [t[0], t[1], t[0], t[2]] : [t[0], t[1], t[2], "@"];
      break;
  }
  var i = r > 0 ? t[0] : r < 0 ? t[1] : t[2];
  if (t[0].indexOf("[") === -1 && t[1].indexOf("[") === -1) return [n, i];
  if (t[0].match(/\[[=<>]/) != null || t[1].match(/\[[=<>]/) != null) {
    var s = t[0].match(T0), o = t[1].match(T0);
    return E0(r, s) ? [n, t[0]] : E0(r, o) ? [n, t[1]] : [n, t[s != null && o != null ? 2 : 1]];
  }
  return [n, i];
}
function ir(e, r, t) {
  t == null && (t = {});
  var n = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && t.dateNF ? n = t.dateNF : n = e;
      break;
    case "number":
      e == 14 && t.dateNF ? n = t.dateNF : n = (t.table != null ? t.table : Be)[e], n == null && (n = t.table && t.table[_0[e]] || Be[_0[e]]), n == null && (n = fc[e] || "General");
      break;
  }
  if (ea(n, 0)) return fi(r, t);
  r instanceof Date && (r = Ps(r, t.date1904));
  var a = Ac(n, r);
  if (ea(a[1])) return fi(r, t);
  if (r === !0) r = "TRUE";
  else if (r === !1) r = "FALSE";
  else if (r === "" || r == null) return "";
  return Cc(a[1], r, t, a[0]);
}
function Vs(e, r) {
  if (typeof r != "number") {
    r = +r || -1;
    for (var t = 0; t < 392; ++t) {
      if (Be[t] == null) {
        r < 0 && (r = t);
        continue;
      }
      if (Be[t] == e) {
        r = t;
        break;
      }
    }
    r < 0 && (r = 391);
  }
  return Be[r] = e, r;
}
function xa(e) {
  for (var r = 0; r != 392; ++r)
    e[r] !== void 0 && Vs(e[r], r);
}
function da() {
  Be = oc();
}
var zs = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function kc(e) {
  var r = typeof e == "number" ? Be[e] : e;
  return r = r.replace(zs, "(\\d+)"), new RegExp("^" + r + "$");
}
function Oc(e, r, t) {
  var n = -1, a = -1, i = -1, s = -1, o = -1, l = -1;
  (r.match(zs) || []).forEach(function(d, h) {
    var u = parseInt(t[h + 1], 10);
    switch (d.toLowerCase().charAt(0)) {
      case "y":
        n = u;
        break;
      case "d":
        i = u;
        break;
      case "h":
        s = u;
        break;
      case "s":
        l = u;
        break;
      case "m":
        s >= 0 ? o = u : a = u;
        break;
    }
  }), l >= 0 && o == -1 && a >= 0 && (o = a, a = -1);
  var f = ("" + (n >= 0 ? n : (/* @__PURE__ */ new Date()).getFullYear())).slice(-4) + "-" + ("00" + (a >= 1 ? a : 1)).slice(-2) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2);
  f.length == 7 && (f = "0" + f), f.length == 8 && (f = "20" + f);
  var c = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (o >= 0 ? o : 0)).slice(-2) + ":" + ("00" + (l >= 0 ? l : 0)).slice(-2);
  return s == -1 && o == -1 && l == -1 ? f : n == -1 && a == -1 && i == -1 ? c : f + "T" + c;
}
var Rc = /* @__PURE__ */ (function() {
  var e = {};
  e.version = "1.2.0";
  function r() {
    for (var R = 0, U = new Array(256), k = 0; k != 256; ++k)
      R = k, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, U[k] = R;
    return typeof Int32Array < "u" ? new Int32Array(U) : U;
  }
  var t = r();
  function n(R) {
    var U = 0, k = 0, W = 0, H = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
    for (W = 0; W != 256; ++W) H[W] = R[W];
    for (W = 0; W != 256; ++W)
      for (k = R[W], U = 256 + W; U < 4096; U += 256) k = H[U] = k >>> 8 ^ R[k & 255];
    var z = [];
    for (W = 1; W != 16; ++W) z[W - 1] = typeof Int32Array < "u" ? H.subarray(W * 256, W * 256 + 256) : H.slice(W * 256, W * 256 + 256);
    return z;
  }
  var a = n(t), i = a[0], s = a[1], o = a[2], l = a[3], f = a[4], c = a[5], d = a[6], h = a[7], u = a[8], v = a[9], x = a[10], g = a[11], C = a[12], O = a[13], F = a[14];
  function L(R, U) {
    for (var k = U ^ -1, W = 0, H = R.length; W < H; ) k = k >>> 8 ^ t[(k ^ R.charCodeAt(W++)) & 255];
    return ~k;
  }
  function Y(R, U) {
    for (var k = U ^ -1, W = R.length - 15, H = 0; H < W; ) k = F[R[H++] ^ k & 255] ^ O[R[H++] ^ k >> 8 & 255] ^ C[R[H++] ^ k >> 16 & 255] ^ g[R[H++] ^ k >>> 24] ^ x[R[H++]] ^ v[R[H++]] ^ u[R[H++]] ^ h[R[H++]] ^ d[R[H++]] ^ c[R[H++]] ^ f[R[H++]] ^ l[R[H++]] ^ o[R[H++]] ^ s[R[H++]] ^ i[R[H++]] ^ t[R[H++]];
    for (W += 15; H < W; ) k = k >>> 8 ^ t[(k ^ R[H++]) & 255];
    return ~k;
  }
  function q(R, U) {
    for (var k = U ^ -1, W = 0, H = R.length, z = 0, ee = 0; W < H; )
      z = R.charCodeAt(W++), z < 128 ? k = k >>> 8 ^ t[(k ^ z) & 255] : z < 2048 ? (k = k >>> 8 ^ t[(k ^ (192 | z >> 6 & 31)) & 255], k = k >>> 8 ^ t[(k ^ (128 | z & 63)) & 255]) : z >= 55296 && z < 57344 ? (z = (z & 1023) + 64, ee = R.charCodeAt(W++) & 1023, k = k >>> 8 ^ t[(k ^ (240 | z >> 8 & 7)) & 255], k = k >>> 8 ^ t[(k ^ (128 | z >> 2 & 63)) & 255], k = k >>> 8 ^ t[(k ^ (128 | ee >> 6 & 15 | (z & 3) << 4)) & 255], k = k >>> 8 ^ t[(k ^ (128 | ee & 63)) & 255]) : (k = k >>> 8 ^ t[(k ^ (224 | z >> 12 & 15)) & 255], k = k >>> 8 ^ t[(k ^ (128 | z >> 6 & 63)) & 255], k = k >>> 8 ^ t[(k ^ (128 | z & 63)) & 255]);
    return ~k;
  }
  return e.table = t, e.bstr = L, e.buf = Y, e.str = q, e;
})(), Ae = /* @__PURE__ */ (function() {
  var r = {};
  r.version = "1.2.1";
  function t(m, w) {
    for (var p = m.split("/"), _ = w.split("/"), T = 0, E = 0, N = Math.min(p.length, _.length); T < N; ++T) {
      if (E = p[T].length - _[T].length) return E;
      if (p[T] != _[T]) return p[T] < _[T] ? -1 : 1;
    }
    return p.length - _.length;
  }
  function n(m) {
    if (m.charAt(m.length - 1) == "/") return m.slice(0, -1).indexOf("/") === -1 ? m : n(m.slice(0, -1));
    var w = m.lastIndexOf("/");
    return w === -1 ? m : m.slice(0, w + 1);
  }
  function a(m) {
    if (m.charAt(m.length - 1) == "/") return a(m.slice(0, -1));
    var w = m.lastIndexOf("/");
    return w === -1 ? m : m.slice(w + 1);
  }
  function i(m, w) {
    typeof w == "string" && (w = new Date(w));
    var p = w.getHours();
    p = p << 6 | w.getMinutes(), p = p << 5 | w.getSeconds() >>> 1, m.write_shift(2, p);
    var _ = w.getFullYear() - 1980;
    _ = _ << 4 | w.getMonth() + 1, _ = _ << 5 | w.getDate(), m.write_shift(2, _);
  }
  function s(m) {
    var w = m.read_shift(2) & 65535, p = m.read_shift(2) & 65535, _ = /* @__PURE__ */ new Date(), T = p & 31;
    p >>>= 5;
    var E = p & 15;
    p >>>= 4, _.setMilliseconds(0), _.setFullYear(p + 1980), _.setMonth(E - 1), _.setDate(T);
    var N = w & 31;
    w >>>= 5;
    var b = w & 63;
    return w >>>= 6, _.setHours(w), _.setMinutes(b), _.setSeconds(N << 1), _;
  }
  function o(m) {
    pt(m, 0);
    for (var w = (
      /*::(*/
      {}
    ), p = 0; m.l <= m.length - 4; ) {
      var _ = m.read_shift(2), T = m.read_shift(2), E = m.l + T, N = {};
      switch (_) {
        /* UNIX-style Timestamps */
        case 21589:
          p = m.read_shift(1), p & 1 && (N.mtime = m.read_shift(4)), T > 5 && (p & 2 && (N.atime = m.read_shift(4)), p & 4 && (N.ctime = m.read_shift(4))), N.mtime && (N.mt = new Date(N.mtime * 1e3));
          break;
      }
      m.l = E, w[_] = N;
    }
    return w;
  }
  var l;
  function f() {
    return l || (l = {});
  }
  function c(m, w) {
    if (m[0] == 80 && m[1] == 75) return Yi(m, w);
    if ((m[0] | 32) == 109 && (m[1] | 32) == 105) return Cf(m, w);
    if (m.length < 512) throw new Error("CFB file size " + m.length + " < 512");
    var p = 3, _ = 512, T = 0, E = 0, N = 0, b = 0, I = 0, D = [], P = (
      /*::(*/
      m.slice(0, 512)
    );
    pt(P, 0);
    var j = d(P);
    switch (p = j[0], p) {
      case 3:
        _ = 512;
        break;
      case 4:
        _ = 4096;
        break;
      case 0:
        if (j[1] == 0) return Yi(m, w);
      /* falls through */
      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + p);
    }
    _ !== 512 && (P = /*::(*/
    m.slice(0, _), pt(
      P,
      28
      /* blob.l */
    ));
    var Z = m.slice(0, _);
    h(P, p);
    var ne = P.read_shift(4, "i");
    if (p === 3 && ne !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + ne);
    P.l += 4, N = P.read_shift(4, "i"), P.l += 4, P.chk("00100000", "Mini Stream Cutoff Size: "), b = P.read_shift(4, "i"), T = P.read_shift(4, "i"), I = P.read_shift(4, "i"), E = P.read_shift(4, "i");
    for (var K = -1, re = 0; re < 109 && (K = P.read_shift(4, "i"), !(K < 0)); ++re)
      D[re] = K;
    var ce = u(m, _);
    g(I, E, ce, _, D);
    var De = O(ce, N, D, _);
    De[N].name = "!Directory", T > 0 && b !== ee && (De[b].name = "!MiniFAT"), De[D[0]].name = "!FAT", De.fat_addrs = D, De.ssz = _;
    var Pe = {}, tt = [], en = [], tn = [];
    F(N, De, ce, tt, T, Pe, en, b), v(en, tn, tt), tt.shift();
    var rn = {
      FileIndex: en,
      FullPaths: tn
    };
    return w && w.raw && (rn.raw = { header: Z, sectors: ce }), rn;
  }
  function d(m) {
    if (m[m.l] == 80 && m[m.l + 1] == 75) return [0, 0];
    m.chk(Ce, "Header Signature: "), m.l += 16;
    var w = m.read_shift(2, "u");
    return [m.read_shift(2, "u"), w];
  }
  function h(m, w) {
    var p = 9;
    switch (m.l += 2, p = m.read_shift(2)) {
      case 9:
        if (w != 3) throw new Error("Sector Shift: Expected 9 saw " + p);
        break;
      case 12:
        if (w != 4) throw new Error("Sector Shift: Expected 12 saw " + p);
        break;
      default:
        throw new Error("Sector Shift: Expected 9 or 12 saw " + p);
    }
    m.chk("0600", "Mini Sector Shift: "), m.chk("000000000000", "Reserved: ");
  }
  function u(m, w) {
    for (var p = Math.ceil(m.length / w) - 1, _ = [], T = 1; T < p; ++T) _[T - 1] = m.slice(T * w, (T + 1) * w);
    return _[p - 1] = m.slice(p * w), _;
  }
  function v(m, w, p) {
    for (var _ = 0, T = 0, E = 0, N = 0, b = 0, I = p.length, D = [], P = []; _ < I; ++_)
      D[_] = P[_] = _, w[_] = p[_];
    for (; b < P.length; ++b)
      _ = P[b], T = m[_].L, E = m[_].R, N = m[_].C, D[_] === _ && (T !== -1 && D[T] !== T && (D[_] = D[T]), E !== -1 && D[E] !== E && (D[_] = D[E])), N !== -1 && (D[N] = _), T !== -1 && _ != D[_] && (D[T] = D[_], P.lastIndexOf(T) < b && P.push(T)), E !== -1 && _ != D[_] && (D[E] = D[_], P.lastIndexOf(E) < b && P.push(E));
    for (_ = 1; _ < I; ++_) D[_] === _ && (E !== -1 && D[E] !== E ? D[_] = D[E] : T !== -1 && D[T] !== T && (D[_] = D[T]));
    for (_ = 1; _ < I; ++_)
      if (m[_].type !== 0) {
        if (b = _, b != D[b]) do
          b = D[b], w[_] = w[b] + "/" + w[_];
        while (b !== 0 && D[b] !== -1 && b != D[b]);
        D[_] = -1;
      }
    for (w[0] += "/", _ = 1; _ < I; ++_)
      m[_].type !== 2 && (w[_] += "/");
  }
  function x(m, w, p) {
    for (var _ = m.start, T = m.size, E = [], N = _; p && T > 0 && N >= 0; )
      E.push(w.slice(N * z, N * z + z)), T -= z, N = mr(p, N * 4);
    return E.length === 0 ? B(0) : Qe(E).slice(0, m.size);
  }
  function g(m, w, p, _, T) {
    var E = ee;
    if (m === ee) {
      if (w !== 0) throw new Error("DIFAT chain shorter than expected");
    } else if (m !== -1) {
      var N = p[m], b = (_ >>> 2) - 1;
      if (!N) return;
      for (var I = 0; I < b && (E = mr(N, I * 4)) !== ee; ++I)
        T.push(E);
      g(mr(N, _ - 4), w - 1, p, _, T);
    }
  }
  function C(m, w, p, _, T) {
    var E = [], N = [];
    T || (T = []);
    var b = _ - 1, I = 0, D = 0;
    for (I = w; I >= 0; ) {
      T[I] = !0, E[E.length] = I, N.push(m[I]);
      var P = p[Math.floor(I * 4 / _)];
      if (D = I * 4 & b, _ < 4 + D) throw new Error("FAT boundary crossed: " + I + " 4 " + _);
      if (!m[P]) break;
      I = mr(m[P], D);
    }
    return { nodes: E, data: R0([N]) };
  }
  function O(m, w, p, _) {
    var T = m.length, E = [], N = [], b = [], I = [], D = _ - 1, P = 0, j = 0, Z = 0, ne = 0;
    for (P = 0; P < T; ++P)
      if (b = [], Z = P + w, Z >= T && (Z -= T), !N[Z]) {
        I = [];
        var K = [];
        for (j = Z; j >= 0; ) {
          K[j] = !0, N[j] = !0, b[b.length] = j, I.push(m[j]);
          var re = p[Math.floor(j * 4 / _)];
          if (ne = j * 4 & D, _ < 4 + ne) throw new Error("FAT boundary crossed: " + j + " 4 " + _);
          if (!m[re] || (j = mr(m[re], ne), K[j])) break;
        }
        E[Z] = { nodes: b, data: R0([I]) };
      }
    return E;
  }
  function F(m, w, p, _, T, E, N, b) {
    for (var I = 0, D = _.length ? 2 : 0, P = w[m].data, j = 0, Z = 0, ne; j < P.length; j += 128) {
      var K = (
        /*::(*/
        P.slice(j, j + 128)
      );
      pt(K, 64), Z = K.read_shift(2), ne = yi(K, 0, Z - D), _.push(ne);
      var re = {
        name: ne,
        type: K.read_shift(1),
        color: K.read_shift(1),
        L: K.read_shift(4, "i"),
        R: K.read_shift(4, "i"),
        C: K.read_shift(4, "i"),
        clsid: K.read_shift(16),
        state: K.read_shift(4, "i"),
        start: 0,
        size: 0
      }, ce = K.read_shift(2) + K.read_shift(2) + K.read_shift(2) + K.read_shift(2);
      ce !== 0 && (re.ct = L(K, K.l - 8));
      var De = K.read_shift(2) + K.read_shift(2) + K.read_shift(2) + K.read_shift(2);
      De !== 0 && (re.mt = L(K, K.l - 8)), re.start = K.read_shift(4, "i"), re.size = K.read_shift(4, "i"), re.size < 0 && re.start < 0 && (re.size = re.type = 0, re.start = ee, re.name = ""), re.type === 5 ? (I = re.start, T > 0 && I !== ee && (w[I].name = "!StreamData")) : re.size >= 4096 ? (re.storage = "fat", w[re.start] === void 0 && (w[re.start] = C(p, re.start, w.fat_addrs, w.ssz)), w[re.start].name = re.name, re.content = w[re.start].data.slice(0, re.size)) : (re.storage = "minifat", re.size < 0 ? re.size = 0 : I !== ee && re.start !== ee && w[I] && (re.content = x(re, w[I].data, (w[b] || {}).data))), re.content && pt(re.content, 0), E[ne] = re, N.push(re);
    }
  }
  function L(m, w) {
    return new Date((_t(m, w + 4) / 1e7 * Math.pow(2, 32) + _t(m, w) / 1e7 - 11644473600) * 1e3);
  }
  function Y(m, w) {
    return f(), c(l.readFileSync(m), w);
  }
  function q(m, w) {
    var p = w && w.type;
    switch (p || ge && Buffer.isBuffer(m) && (p = "buffer"), p || "base64") {
      case "file":
        return Y(m, w);
      case "base64":
        return c(Rt(zt(m)), w);
      case "binary":
        return c(Rt(m), w);
    }
    return c(
      /*::typeof blob == 'string' ? new Buffer(blob, 'utf-8') : */
      m,
      w
    );
  }
  function R(m, w) {
    var p = w || {}, _ = p.root || "Root Entry";
    if (m.FullPaths || (m.FullPaths = []), m.FileIndex || (m.FileIndex = []), m.FullPaths.length !== m.FileIndex.length) throw new Error("inconsistent CFB structure");
    m.FullPaths.length === 0 && (m.FullPaths[0] = _ + "/", m.FileIndex[0] = { name: _, type: 5 }), p.CLSID && (m.FileIndex[0].clsid = p.CLSID), U(m);
  }
  function U(m) {
    var w = "Sh33tJ5";
    if (!Ae.find(m, "/" + w)) {
      var p = B(4);
      p[0] = 55, p[1] = p[3] = 50, p[2] = 54, m.FileIndex.push({ name: w, type: 2, content: p, size: 4, L: 69, R: 69, C: 69 }), m.FullPaths.push(m.FullPaths[0] + w), k(m);
    }
  }
  function k(m, w) {
    R(m);
    for (var p = !1, _ = !1, T = m.FullPaths.length - 1; T >= 0; --T) {
      var E = m.FileIndex[T];
      switch (E.type) {
        case 0:
          _ ? p = !0 : (m.FileIndex.pop(), m.FullPaths.pop());
          break;
        case 1:
        case 2:
        case 5:
          _ = !0, isNaN(E.R * E.L * E.C) && (p = !0), E.R > -1 && E.L > -1 && E.R == E.L && (p = !0);
          break;
        default:
          p = !0;
          break;
      }
    }
    if (!(!p && !w)) {
      var N = new Date(1987, 1, 19), b = 0, I = Object.create ? /* @__PURE__ */ Object.create(null) : {}, D = [];
      for (T = 0; T < m.FullPaths.length; ++T)
        I[m.FullPaths[T]] = !0, m.FileIndex[T].type !== 0 && D.push([m.FullPaths[T], m.FileIndex[T]]);
      for (T = 0; T < D.length; ++T) {
        var P = n(D[T][0]);
        _ = I[P], _ || (D.push([P, {
          name: a(P).replace("/", ""),
          type: 1,
          clsid: Ye,
          ct: N,
          mt: N,
          content: null
        }]), I[P] = !0);
      }
      for (D.sort(function(ne, K) {
        return t(ne[0], K[0]);
      }), m.FullPaths = [], m.FileIndex = [], T = 0; T < D.length; ++T)
        m.FullPaths[T] = D[T][0], m.FileIndex[T] = D[T][1];
      for (T = 0; T < D.length; ++T) {
        var j = m.FileIndex[T], Z = m.FullPaths[T];
        if (j.name = a(Z).replace("/", ""), j.L = j.R = j.C = -(j.color = 1), j.size = j.content ? j.content.length : 0, j.start = 0, j.clsid = j.clsid || Ye, T === 0)
          j.C = D.length > 1 ? 1 : -1, j.size = 0, j.type = 5;
        else if (Z.slice(-1) == "/") {
          for (b = T + 1; b < D.length && n(m.FullPaths[b]) != Z; ++b) ;
          for (j.C = b >= D.length ? -1 : b, b = T + 1; b < D.length && n(m.FullPaths[b]) != n(Z); ++b) ;
          j.R = b >= D.length ? -1 : b, j.type = 1;
        } else
          n(m.FullPaths[T + 1] || "") == n(Z) && (j.R = T + 1), j.type = 2;
      }
    }
  }
  function W(m, w) {
    var p = w || {};
    if (p.fileType == "mad") return Af(m, p);
    switch (k(m), p.fileType) {
      case "zip":
        return wf(m, p);
    }
    var _ = (function(ne) {
      for (var K = 0, re = 0, ce = 0; ce < ne.FileIndex.length; ++ce) {
        var De = ne.FileIndex[ce];
        if (De.content) {
          var Pe = De.content.length;
          Pe > 0 && (Pe < 4096 ? K += Pe + 63 >> 6 : re += Pe + 511 >> 9);
        }
      }
      for (var tt = ne.FullPaths.length + 3 >> 2, en = K + 7 >> 3, tn = K + 127 >> 7, rn = en + re + tt + tn, ur = rn + 127 >> 7, ya = ur <= 109 ? 0 : Math.ceil((ur - 109) / 127); rn + ur + ya + 127 >> 7 > ur; ) ya = ++ur <= 109 ? 0 : Math.ceil((ur - 109) / 127);
      var Wt = [1, ya, ur, tn, tt, re, K, 0];
      return ne.FileIndex[0].size = K << 6, Wt[7] = (ne.FileIndex[0].start = Wt[0] + Wt[1] + Wt[2] + Wt[3] + Wt[4] + Wt[5]) + (Wt[6] + 7 >> 3), Wt;
    })(m), T = B(_[7] << 9), E = 0, N = 0;
    {
      for (E = 0; E < 8; ++E) T.write_shift(1, he[E]);
      for (E = 0; E < 8; ++E) T.write_shift(2, 0);
      for (T.write_shift(2, 62), T.write_shift(2, 3), T.write_shift(2, 65534), T.write_shift(2, 9), T.write_shift(2, 6), E = 0; E < 3; ++E) T.write_shift(2, 0);
      for (T.write_shift(4, 0), T.write_shift(4, _[2]), T.write_shift(4, _[0] + _[1] + _[2] + _[3] - 1), T.write_shift(4, 0), T.write_shift(4, 4096), T.write_shift(4, _[3] ? _[0] + _[1] + _[2] - 1 : ee), T.write_shift(4, _[3]), T.write_shift(-4, _[1] ? _[0] - 1 : ee), T.write_shift(4, _[1]), E = 0; E < 109; ++E) T.write_shift(-4, E < _[2] ? _[1] + E : -1);
    }
    if (_[1])
      for (N = 0; N < _[1]; ++N) {
        for (; E < 236 + N * 127; ++E) T.write_shift(-4, E < _[2] ? _[1] + E : -1);
        T.write_shift(-4, N === _[1] - 1 ? ee : N + 1);
      }
    var b = function(ne) {
      for (N += ne; E < N - 1; ++E) T.write_shift(-4, E + 1);
      ne && (++E, T.write_shift(-4, ee));
    };
    for (N = E = 0, N += _[1]; E < N; ++E) T.write_shift(-4, be.DIFSECT);
    for (N += _[2]; E < N; ++E) T.write_shift(-4, be.FATSECT);
    b(_[3]), b(_[4]);
    for (var I = 0, D = 0, P = m.FileIndex[0]; I < m.FileIndex.length; ++I)
      P = m.FileIndex[I], P.content && (D = P.content.length, !(D < 4096) && (P.start = N, b(D + 511 >> 9)));
    for (b(_[6] + 7 >> 3); T.l & 511; ) T.write_shift(-4, be.ENDOFCHAIN);
    for (N = E = 0, I = 0; I < m.FileIndex.length; ++I)
      P = m.FileIndex[I], P.content && (D = P.content.length, !(!D || D >= 4096) && (P.start = N, b(D + 63 >> 6)));
    for (; T.l & 511; ) T.write_shift(-4, be.ENDOFCHAIN);
    for (E = 0; E < _[4] << 2; ++E) {
      var j = m.FullPaths[E];
      if (!j || j.length === 0) {
        for (I = 0; I < 17; ++I) T.write_shift(4, 0);
        for (I = 0; I < 3; ++I) T.write_shift(4, -1);
        for (I = 0; I < 12; ++I) T.write_shift(4, 0);
        continue;
      }
      P = m.FileIndex[E], E === 0 && (P.start = P.size ? P.start - 1 : ee);
      var Z = E === 0 && p.root || P.name;
      if (D = 2 * (Z.length + 1), T.write_shift(64, Z, "utf16le"), T.write_shift(2, D), T.write_shift(1, P.type), T.write_shift(1, P.color), T.write_shift(-4, P.L), T.write_shift(-4, P.R), T.write_shift(-4, P.C), P.clsid) T.write_shift(16, P.clsid, "hex");
      else for (I = 0; I < 4; ++I) T.write_shift(4, 0);
      T.write_shift(4, P.state || 0), T.write_shift(4, 0), T.write_shift(4, 0), T.write_shift(4, 0), T.write_shift(4, 0), T.write_shift(4, P.start), T.write_shift(4, P.size), T.write_shift(4, 0);
    }
    for (E = 1; E < m.FileIndex.length; ++E)
      if (P = m.FileIndex[E], P.size >= 4096)
        if (T.l = P.start + 1 << 9, ge && Buffer.isBuffer(P.content))
          P.content.copy(T, T.l, 0, P.size), T.l += P.size + 511 & -512;
        else {
          for (I = 0; I < P.size; ++I) T.write_shift(1, P.content[I]);
          for (; I & 511; ++I) T.write_shift(1, 0);
        }
    for (E = 1; E < m.FileIndex.length; ++E)
      if (P = m.FileIndex[E], P.size > 0 && P.size < 4096)
        if (ge && Buffer.isBuffer(P.content))
          P.content.copy(T, T.l, 0, P.size), T.l += P.size + 63 & -64;
        else {
          for (I = 0; I < P.size; ++I) T.write_shift(1, P.content[I]);
          for (; I & 63; ++I) T.write_shift(1, 0);
        }
    if (ge)
      T.l = T.length;
    else
      for (; T.l < T.length; ) T.write_shift(1, 0);
    return T;
  }
  function H(m, w) {
    var p = m.FullPaths.map(function(I) {
      return I.toUpperCase();
    }), _ = p.map(function(I) {
      var D = I.split("/");
      return D[D.length - (I.slice(-1) == "/" ? 2 : 1)];
    }), T = !1;
    w.charCodeAt(0) === 47 ? (T = !0, w = p[0].slice(0, -1) + w) : T = w.indexOf("/") !== -1;
    var E = w.toUpperCase(), N = T === !0 ? p.indexOf(E) : _.indexOf(E);
    if (N !== -1) return m.FileIndex[N];
    var b = !E.match(Wn);
    for (E = E.replace(xn, ""), b && (E = E.replace(Wn, "!")), N = 0; N < p.length; ++N)
      if ((b ? p[N].replace(Wn, "!") : p[N]).replace(xn, "") == E || (b ? _[N].replace(Wn, "!") : _[N]).replace(xn, "") == E) return m.FileIndex[N];
    return null;
  }
  var z = 64, ee = -2, Ce = "d0cf11e0a1b11ae1", he = [208, 207, 17, 224, 161, 177, 26, 225], Ye = "00000000000000000000000000000000", be = {
    /* 2.1 Compund File Sector Numbers and Types */
    MAXREGSECT: -6,
    DIFSECT: -4,
    FATSECT: -3,
    ENDOFCHAIN: ee,
    FREESECT: -1,
    /* 2.2 Compound File Header */
    HEADER_SIGNATURE: Ce,
    HEADER_MINOR_VERSION: "3e00",
    MAXREGSID: -6,
    NOSTREAM: -1,
    HEADER_CLSID: Ye,
    /* 2.6.1 Compound File Directory Entry */
    EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
  };
  function Ct(m, w, p) {
    f();
    var _ = W(m, p);
    l.writeFileSync(w, _);
  }
  function Ve(m) {
    for (var w = new Array(m.length), p = 0; p < m.length; ++p) w[p] = String.fromCharCode(m[p]);
    return w.join("");
  }
  function Tt(m, w) {
    var p = W(m, w);
    switch (w && w.type || "buffer") {
      case "file":
        return f(), l.writeFileSync(w.filename, p), p;
      case "binary":
        return typeof p == "string" ? p : Ve(p);
      case "base64":
        return Tn(typeof p == "string" ? p : Ve(p));
      case "buffer":
        if (ge) return Buffer.isBuffer(p) ? p : jt(p);
      /* falls through */
      case "array":
        return typeof p == "string" ? Rt(p) : p;
    }
    return p;
  }
  var dt;
  function S(m) {
    try {
      var w = m.InflateRaw, p = new w();
      if (p._processChunk(new Uint8Array([3, 0]), p._finishFlushFlag), p.bytesRead) dt = m;
      else throw new Error("zlib does not expose bytesRead");
    } catch (_) {
      console.error("cannot use native zlib: " + (_.message || _));
    }
  }
  function M(m, w) {
    if (!dt) return Xi(m, w);
    var p = dt.InflateRaw, _ = new p(), T = _._processChunk(m.slice(m.l), _._finishFlushFlag);
    return m.l += _.bytesRead, T;
  }
  function A(m) {
    return dt ? dt.deflateRawSync(m) : Wi(m);
  }
  var y = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], V = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], oe = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  function fe(m) {
    var w = (m << 1 | m << 11) & 139536 | (m << 5 | m << 15) & 558144;
    return (w >> 16 | w >> 8 | w) & 255;
  }
  for (var se = typeof Uint8Array < "u", te = se ? new Uint8Array(256) : [], ke = 0; ke < 256; ++ke) te[ke] = fe(ke);
  function pe(m, w) {
    var p = te[m & 255];
    return w <= 8 ? p >>> 8 - w : (p = p << 8 | te[m >> 8 & 255], w <= 16 ? p >>> 16 - w : (p = p << 8 | te[m >> 16 & 255], p >>> 24 - w));
  }
  function at(m, w) {
    var p = w & 7, _ = w >>> 3;
    return (m[_] | (p <= 6 ? 0 : m[_ + 1] << 8)) >>> p & 3;
  }
  function we(m, w) {
    var p = w & 7, _ = w >>> 3;
    return (m[_] | (p <= 5 ? 0 : m[_ + 1] << 8)) >>> p & 7;
  }
  function bt(m, w) {
    var p = w & 7, _ = w >>> 3;
    return (m[_] | (p <= 4 ? 0 : m[_ + 1] << 8)) >>> p & 15;
  }
  function Me(m, w) {
    var p = w & 7, _ = w >>> 3;
    return (m[_] | (p <= 3 ? 0 : m[_ + 1] << 8)) >>> p & 31;
  }
  function ie(m, w) {
    var p = w & 7, _ = w >>> 3;
    return (m[_] | (p <= 1 ? 0 : m[_ + 1] << 8)) >>> p & 127;
  }
  function Et(m, w, p) {
    var _ = w & 7, T = w >>> 3, E = (1 << p) - 1, N = m[T] >>> _;
    return p < 8 - _ || (N |= m[T + 1] << 8 - _, p < 16 - _) || (N |= m[T + 2] << 16 - _, p < 24 - _) || (N |= m[T + 3] << 24 - _), N & E;
  }
  function Ut(m, w, p) {
    var _ = w & 7, T = w >>> 3;
    return _ <= 5 ? m[T] |= (p & 7) << _ : (m[T] |= p << _ & 255, m[T + 1] = (p & 7) >> 8 - _), w + 3;
  }
  function cr(m, w, p) {
    var _ = w & 7, T = w >>> 3;
    return p = (p & 1) << _, m[T] |= p, w + 1;
  }
  function Or(m, w, p) {
    var _ = w & 7, T = w >>> 3;
    return p <<= _, m[T] |= p & 255, p >>>= 8, m[T + 1] = p, w + 8;
  }
  function Ui(m, w, p) {
    var _ = w & 7, T = w >>> 3;
    return p <<= _, m[T] |= p & 255, p >>>= 8, m[T + 1] = p & 255, m[T + 2] = p >>> 8, w + 16;
  }
  function wa(m, w) {
    var p = m.length, _ = 2 * p > w ? 2 * p : w + 5, T = 0;
    if (p >= w) return m;
    if (ge) {
      var E = m0(_);
      if (m.copy) m.copy(E);
      else for (; T < m.length; ++T) E[T] = m[T];
      return E;
    } else if (se) {
      var N = new Uint8Array(_);
      if (N.set) N.set(m);
      else for (; T < p; ++T) N[T] = m[T];
      return N;
    }
    return m.length = _, m;
  }
  function Dt(m) {
    for (var w = new Array(m), p = 0; p < m; ++p) w[p] = 0;
    return w;
  }
  function Mn(m, w, p) {
    var _ = 1, T = 0, E = 0, N = 0, b = 0, I = m.length, D = se ? new Uint16Array(32) : Dt(32);
    for (E = 0; E < 32; ++E) D[E] = 0;
    for (E = I; E < p; ++E) m[E] = 0;
    I = m.length;
    var P = se ? new Uint16Array(I) : Dt(I);
    for (E = 0; E < I; ++E)
      D[T = m[E]]++, _ < T && (_ = T), P[E] = 0;
    for (D[0] = 0, E = 1; E <= _; ++E) D[E + 16] = b = b + D[E - 1] << 1;
    for (E = 0; E < I; ++E)
      b = m[E], b != 0 && (P[E] = D[b + 16]++);
    var j = 0;
    for (E = 0; E < I; ++E)
      if (j = m[E], j != 0)
        for (b = pe(P[E], _) >> _ - j, N = (1 << _ + 4 - j) - 1; N >= 0; --N)
          w[b | N << j] = j & 15 | E << 4;
    return _;
  }
  var Ta = se ? new Uint16Array(512) : Dt(512), Ea = se ? new Uint16Array(32) : Dt(32);
  if (!se) {
    for (var hr = 0; hr < 512; ++hr) Ta[hr] = 0;
    for (hr = 0; hr < 32; ++hr) Ea[hr] = 0;
  }
  (function() {
    for (var m = [], w = 0; w < 32; w++) m.push(5);
    Mn(m, Ea, 32);
    var p = [];
    for (w = 0; w <= 143; w++) p.push(8);
    for (; w <= 255; w++) p.push(9);
    for (; w <= 279; w++) p.push(7);
    for (; w <= 287; w++) p.push(8);
    Mn(p, Ta, 288);
  })();
  var pf = /* @__PURE__ */ (function() {
    for (var w = se ? new Uint8Array(32768) : [], p = 0, _ = 0; p < oe.length - 1; ++p)
      for (; _ < oe[p + 1]; ++_) w[_] = p;
    for (; _ < 32768; ++_) w[_] = 29;
    var T = se ? new Uint8Array(259) : [];
    for (p = 0, _ = 0; p < V.length - 1; ++p)
      for (; _ < V[p + 1]; ++_) T[_] = p;
    function E(b, I) {
      for (var D = 0; D < b.length; ) {
        var P = Math.min(65535, b.length - D), j = D + P == b.length;
        for (I.write_shift(1, +j), I.write_shift(2, P), I.write_shift(2, ~P & 65535); P-- > 0; ) I[I.l++] = b[D++];
      }
      return I.l;
    }
    function N(b, I) {
      for (var D = 0, P = 0, j = se ? new Uint16Array(32768) : []; P < b.length; ) {
        var Z = (
          /* data.length - boff; */
          Math.min(65535, b.length - P)
        );
        if (Z < 10) {
          for (D = Ut(I, D, +(P + Z == b.length)), D & 7 && (D += 8 - (D & 7)), I.l = D / 8 | 0, I.write_shift(2, Z), I.write_shift(2, ~Z & 65535); Z-- > 0; ) I[I.l++] = b[P++];
          D = I.l * 8;
          continue;
        }
        D = Ut(I, D, +(P + Z == b.length) + 2);
        for (var ne = 0; Z-- > 0; ) {
          var K = b[P];
          ne = (ne << 5 ^ K) & 32767;
          var re = -1, ce = 0;
          if ((re = j[ne]) && (re |= P & -32768, re > P && (re -= 32768), re < P))
            for (; b[re + ce] == b[P + ce] && ce < 250; ) ++ce;
          if (ce > 2) {
            K = T[ce], K <= 22 ? D = Or(I, D, te[K + 1] >> 1) - 1 : (Or(I, D, 3), D += 5, Or(I, D, te[K - 23] >> 5), D += 3);
            var De = K < 8 ? 0 : K - 4 >> 2;
            De > 0 && (Ui(I, D, ce - V[K]), D += De), K = w[P - re], D = Or(I, D, te[K] >> 3), D -= 3;
            var Pe = K < 4 ? 0 : K - 2 >> 1;
            Pe > 0 && (Ui(I, D, P - re - oe[K]), D += Pe);
            for (var tt = 0; tt < ce; ++tt)
              j[ne] = P & 32767, ne = (ne << 5 ^ b[P]) & 32767, ++P;
            Z -= ce - 1;
          } else
            K <= 143 ? K = K + 48 : D = cr(I, D, 1), D = Or(I, D, te[K]), j[ne] = P & 32767, ++P;
        }
        D = Or(I, D, 0) - 1;
      }
      return I.l = (D + 7) / 8 | 0, I.l;
    }
    return function(I, D) {
      return I.length < 8 ? E(I, D) : N(I, D);
    };
  })();
  function Wi(m) {
    var w = B(50 + Math.floor(m.length * 1.1)), p = pf(m, w);
    return w.slice(0, p);
  }
  var Hi = se ? new Uint16Array(32768) : Dt(32768), Gi = se ? new Uint16Array(32768) : Dt(32768), $i = se ? new Uint16Array(128) : Dt(128), Vi = 1, zi = 1;
  function vf(m, w) {
    var p = Me(m, w) + 257;
    w += 5;
    var _ = Me(m, w) + 1;
    w += 5;
    var T = bt(m, w) + 4;
    w += 4;
    for (var E = 0, N = se ? new Uint8Array(19) : Dt(19), b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], I = 1, D = se ? new Uint8Array(8) : Dt(8), P = se ? new Uint8Array(8) : Dt(8), j = N.length, Z = 0; Z < T; ++Z)
      N[y[Z]] = E = we(m, w), I < E && (I = E), D[E]++, w += 3;
    var ne = 0;
    for (D[0] = 0, Z = 1; Z <= I; ++Z) P[Z] = ne = ne + D[Z - 1] << 1;
    for (Z = 0; Z < j; ++Z) (ne = N[Z]) != 0 && (b[Z] = P[ne]++);
    var K = 0;
    for (Z = 0; Z < j; ++Z)
      if (K = N[Z], K != 0) {
        ne = te[b[Z]] >> 8 - K;
        for (var re = (1 << 7 - K) - 1; re >= 0; --re) $i[ne | re << K] = K & 7 | Z << 3;
      }
    var ce = [];
    for (I = 1; ce.length < p + _; )
      switch (ne = $i[ie(m, w)], w += ne & 7, ne >>>= 3) {
        case 16:
          for (E = 3 + at(m, w), w += 2, ne = ce[ce.length - 1]; E-- > 0; ) ce.push(ne);
          break;
        case 17:
          for (E = 3 + we(m, w), w += 3; E-- > 0; ) ce.push(0);
          break;
        case 18:
          for (E = 11 + ie(m, w), w += 7; E-- > 0; ) ce.push(0);
          break;
        default:
          ce.push(ne), I < ne && (I = ne);
          break;
      }
    var De = ce.slice(0, p), Pe = ce.slice(p);
    for (Z = p; Z < 286; ++Z) De[Z] = 0;
    for (Z = _; Z < 30; ++Z) Pe[Z] = 0;
    return Vi = Mn(De, Hi, 286), zi = Mn(Pe, Gi, 30), w;
  }
  function _f(m, w) {
    if (m[0] == 3 && !(m[1] & 3))
      return [Tr(w), 2];
    for (var p = 0, _ = 0, T = m0(w || 1 << 18), E = 0, N = T.length >>> 0, b = 0, I = 0; (_ & 1) == 0; ) {
      if (_ = we(m, p), p += 3, _ >>> 1)
        _ >> 1 == 1 ? (b = 9, I = 5) : (p = vf(m, p), b = Vi, I = zi);
      else {
        p & 7 && (p += 8 - (p & 7));
        var D = m[p >>> 3] | m[(p >>> 3) + 1] << 8;
        if (p += 32, D > 0)
          for (!w && N < E + D && (T = wa(T, E + D), N = T.length); D-- > 0; )
            T[E++] = m[p >>> 3], p += 8;
        continue;
      }
      for (; ; ) {
        !w && N < E + 32767 && (T = wa(T, E + 32767), N = T.length);
        var P = Et(m, p, b), j = _ >>> 1 == 1 ? Ta[P] : Hi[P];
        if (p += j & 15, j >>>= 4, (j >>> 8 & 255) === 0) T[E++] = j;
        else {
          if (j == 256) break;
          j -= 257;
          var Z = j < 8 ? 0 : j - 4 >> 2;
          Z > 5 && (Z = 0);
          var ne = E + V[j];
          Z > 0 && (ne += Et(m, p, Z), p += Z), P = Et(m, p, I), j = _ >>> 1 == 1 ? Ea[P] : Gi[P], p += j & 15, j >>>= 4;
          var K = j < 4 ? 0 : j - 2 >> 1, re = oe[j];
          for (K > 0 && (re += Et(m, p, K), p += K), !w && N < ne && (T = wa(T, ne + 100), N = T.length); E < ne; )
            T[E] = T[E - re], ++E;
        }
      }
    }
    return w ? [T, p + 7 >>> 3] : [T.slice(0, E), p + 7 >>> 3];
  }
  function Xi(m, w) {
    var p = m.slice(m.l || 0), _ = _f(p, w);
    return m.l += _[1], _[0];
  }
  function ji(m, w) {
    if (m)
      typeof console < "u" && console.error(w);
    else throw new Error(w);
  }
  function Yi(m, w) {
    var p = (
      /*::(*/
      m
    );
    pt(p, 0);
    var _ = [], T = [], E = {
      FileIndex: _,
      FullPaths: T
    };
    R(E, { root: w.root });
    for (var N = p.length - 4; (p[N] != 80 || p[N + 1] != 75 || p[N + 2] != 5 || p[N + 3] != 6) && N >= 0; ) --N;
    p.l = N + 4, p.l += 4;
    var b = p.read_shift(2);
    p.l += 6;
    var I = p.read_shift(4);
    for (p.l = I, N = 0; N < b; ++N) {
      p.l += 20;
      var D = p.read_shift(4), P = p.read_shift(4), j = p.read_shift(2), Z = p.read_shift(2), ne = p.read_shift(2);
      p.l += 8;
      var K = p.read_shift(4), re = o(
        /*::(*/
        p.slice(p.l + j, p.l + j + Z)
        /*:: :any)*/
      );
      p.l += j + Z + ne;
      var ce = p.l;
      p.l = K + 4, gf(p, D, P, E, re), p.l = ce;
    }
    return E;
  }
  function gf(m, w, p, _, T) {
    m.l += 2;
    var E = m.read_shift(2), N = m.read_shift(2), b = s(m);
    if (E & 8257) throw new Error("Unsupported ZIP encryption");
    for (var I = m.read_shift(4), D = m.read_shift(4), P = m.read_shift(4), j = m.read_shift(2), Z = m.read_shift(2), ne = "", K = 0; K < j; ++K) ne += String.fromCharCode(m[m.l++]);
    if (Z) {
      var re = o(
        /*::(*/
        m.slice(m.l, m.l + Z)
        /*:: :any)*/
      );
      (re[21589] || {}).mt && (b = re[21589].mt), ((T || {})[21589] || {}).mt && (b = T[21589].mt);
    }
    m.l += Z;
    var ce = m.slice(m.l, m.l + D);
    switch (N) {
      case 8:
        ce = M(m, P);
        break;
      case 0:
        break;
      // TODO: scan for magic number
      default:
        throw new Error("Unsupported ZIP Compression method " + N);
    }
    var De = !1;
    E & 8 && (I = m.read_shift(4), I == 134695760 && (I = m.read_shift(4), De = !0), D = m.read_shift(4), P = m.read_shift(4)), D != w && ji(De, "Bad compressed size: " + w + " != " + D), P != p && ji(De, "Bad uncompressed size: " + p + " != " + P), Sa(_, ne, ce, { unsafe: !0, mt: b });
  }
  function wf(m, w) {
    var p = w || {}, _ = [], T = [], E = B(1), N = p.compression ? 8 : 0, b = 0, I = 0, D = 0, P = 0, j = 0, Z = m.FullPaths[0], ne = Z, K = m.FileIndex[0], re = [], ce = 0;
    for (I = 1; I < m.FullPaths.length; ++I)
      if (ne = m.FullPaths[I].slice(Z.length), K = m.FileIndex[I], !(!K.size || !K.content || ne == "Sh33tJ5")) {
        var De = P, Pe = B(ne.length);
        for (D = 0; D < ne.length; ++D) Pe.write_shift(1, ne.charCodeAt(D) & 127);
        Pe = Pe.slice(0, Pe.l), re[j] = Rc.buf(
          /*::((*/
          K.content,
          0
        );
        var tt = K.content;
        N == 8 && (tt = A(tt)), E = B(30), E.write_shift(4, 67324752), E.write_shift(2, 20), E.write_shift(2, b), E.write_shift(2, N), K.mt ? i(E, K.mt) : E.write_shift(4, 0), E.write_shift(-4, re[j]), E.write_shift(4, tt.length), E.write_shift(
          4,
          /*::(*/
          K.content.length
        ), E.write_shift(2, Pe.length), E.write_shift(2, 0), P += E.length, _.push(E), P += Pe.length, _.push(Pe), P += tt.length, _.push(tt), E = B(46), E.write_shift(4, 33639248), E.write_shift(2, 0), E.write_shift(2, 20), E.write_shift(2, b), E.write_shift(2, N), E.write_shift(4, 0), E.write_shift(-4, re[j]), E.write_shift(4, tt.length), E.write_shift(
          4,
          /*::(*/
          K.content.length
        ), E.write_shift(2, Pe.length), E.write_shift(2, 0), E.write_shift(2, 0), E.write_shift(2, 0), E.write_shift(2, 0), E.write_shift(4, 0), E.write_shift(4, De), ce += E.l, T.push(E), ce += Pe.length, T.push(Pe), ++j;
      }
    return E = B(22), E.write_shift(4, 101010256), E.write_shift(2, 0), E.write_shift(2, 0), E.write_shift(2, j), E.write_shift(2, j), E.write_shift(4, ce), E.write_shift(4, P), E.write_shift(2, 0), Qe([Qe(_), Qe(T), E]);
  }
  var Ln = {
    htm: "text/html",
    xml: "text/xml",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    mso: "application/x-mso",
    thmx: "application/vnd.ms-officetheme",
    sh33tj5: "application/octet-stream"
  };
  function Tf(m, w) {
    if (m.ctype) return m.ctype;
    var p = m.name || "", _ = p.match(/\.([^\.]+)$/);
    return _ && Ln[_[1]] || w && (_ = (p = w).match(/[\.\\]([^\.\\])+$/), _ && Ln[_[1]]) ? Ln[_[1]] : "application/octet-stream";
  }
  function Ef(m) {
    for (var w = Tn(m), p = [], _ = 0; _ < w.length; _ += 76) p.push(w.slice(_, _ + 76));
    return p.join(`\r
`) + `\r
`;
  }
  function Sf(m) {
    var w = m.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(D) {
      var P = D.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (P.length == 1 ? "0" + P : P);
    });
    w = w.replace(/ $/mg, "=20").replace(/\t$/mg, "=09"), w.charAt(0) == `
` && (w = "=0D" + w.slice(1)), w = w.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, `
=0A`).replace(/([^\r\n])\n/mg, "$1=0A");
    for (var p = [], _ = w.split(`\r
`), T = 0; T < _.length; ++T) {
      var E = _[T];
      if (E.length == 0) {
        p.push("");
        continue;
      }
      for (var N = 0; N < E.length; ) {
        var b = 76, I = E.slice(N, N + b);
        I.charAt(b - 1) == "=" ? b-- : I.charAt(b - 2) == "=" ? b -= 2 : I.charAt(b - 3) == "=" && (b -= 3), I = E.slice(N, N + b), N += b, N < E.length && (I += "="), p.push(I);
      }
    }
    return p.join(`\r
`);
  }
  function yf(m) {
    for (var w = [], p = 0; p < m.length; ++p) {
      for (var _ = m[p]; p <= m.length && _.charAt(_.length - 1) == "="; ) _ = _.slice(0, _.length - 1) + m[++p];
      w.push(_);
    }
    for (var T = 0; T < w.length; ++T) w[T] = w[T].replace(/[=][0-9A-Fa-f]{2}/g, function(E) {
      return String.fromCharCode(parseInt(E.slice(1), 16));
    });
    return Rt(w.join(`\r
`));
  }
  function Ff(m, w, p) {
    for (var _ = "", T = "", E = "", N, b = 0; b < 10; ++b) {
      var I = w[b];
      if (!I || I.match(/^\s*$/)) break;
      var D = I.match(/^(.*?):\s*([^\s].*)$/);
      if (D) switch (D[1].toLowerCase()) {
        case "content-location":
          _ = D[2].trim();
          break;
        case "content-type":
          E = D[2].trim();
          break;
        case "content-transfer-encoding":
          T = D[2].trim();
          break;
      }
    }
    switch (++b, T.toLowerCase()) {
      case "base64":
        N = Rt(zt(w.slice(b).join("")));
        break;
      case "quoted-printable":
        N = yf(w.slice(b));
        break;
      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + T);
    }
    var P = Sa(m, _.slice(p.length), N, { unsafe: !0 });
    E && (P.ctype = E);
  }
  function Cf(m, w) {
    if (Ve(m.slice(0, 13)).toLowerCase() != "mime-version:") throw new Error("Unsupported MAD header");
    var p = w && w.root || "", _ = (ge && Buffer.isBuffer(m) ? m.toString("binary") : Ve(m)).split(`\r
`), T = 0, E = "";
    for (T = 0; T < _.length; ++T)
      if (E = _[T], !!/^Content-Location:/i.test(E) && (E = E.slice(E.indexOf("file")), p || (p = E.slice(0, E.lastIndexOf("/") + 1)), E.slice(0, p.length) != p))
        for (; p.length > 0 && (p = p.slice(0, p.length - 1), p = p.slice(0, p.lastIndexOf("/") + 1), E.slice(0, p.length) != p); )
          ;
    var N = (_[1] || "").match(/boundary="(.*?)"/);
    if (!N) throw new Error("MAD cannot find boundary");
    var b = "--" + (N[1] || ""), I = [], D = [], P = {
      FileIndex: I,
      FullPaths: D
    };
    R(P);
    var j, Z = 0;
    for (T = 0; T < _.length; ++T) {
      var ne = _[T];
      ne !== b && ne !== b + "--" || (Z++ && Ff(P, _.slice(j, T), p), j = T);
    }
    return P;
  }
  function Af(m, w) {
    var p = w || {}, _ = p.boundary || "SheetJS";
    _ = "------=" + _;
    for (var T = [
      "MIME-Version: 1.0",
      'Content-Type: multipart/related; boundary="' + _.slice(2) + '"',
      "",
      "",
      ""
    ], E = m.FullPaths[0], N = E, b = m.FileIndex[0], I = 1; I < m.FullPaths.length; ++I)
      if (N = m.FullPaths[I].slice(E.length), b = m.FileIndex[I], !(!b.size || !b.content || N == "Sh33tJ5")) {
        N = N.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(ce) {
          return "_x" + ce.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function(ce) {
          return "_u" + ce.charCodeAt(0).toString(16) + "_";
        });
        for (var D = b.content, P = ge && Buffer.isBuffer(D) ? D.toString("binary") : Ve(D), j = 0, Z = Math.min(1024, P.length), ne = 0, K = 0; K <= Z; ++K) (ne = P.charCodeAt(K)) >= 32 && ne < 128 && ++j;
        var re = j >= Z * 4 / 5;
        T.push(_), T.push("Content-Location: " + (p.root || "file:///C:/SheetJS/") + N), T.push("Content-Transfer-Encoding: " + (re ? "quoted-printable" : "base64")), T.push("Content-Type: " + Tf(b, N)), T.push(""), T.push(re ? Sf(P) : Ef(P));
      }
    return T.push(_ + `--\r
`), T.join(`\r
`);
  }
  function kf(m) {
    var w = {};
    return R(w, m), w;
  }
  function Sa(m, w, p, _) {
    var T = _ && _.unsafe;
    T || R(m);
    var E = !T && Ae.find(m, w);
    if (!E) {
      var N = m.FullPaths[0];
      w.slice(0, N.length) == N ? N = w : (N.slice(-1) != "/" && (N += "/"), N = (N + w).replace("//", "/")), E = { name: a(w), type: 2 }, m.FileIndex.push(E), m.FullPaths.push(N), T || Ae.utils.cfb_gc(m);
    }
    return E.content = p, E.size = p ? p.length : 0, _ && (_.CLSID && (E.clsid = _.CLSID), _.mt && (E.mt = _.mt), _.ct && (E.ct = _.ct)), E;
  }
  function Of(m, w) {
    R(m);
    var p = Ae.find(m, w);
    if (p) {
      for (var _ = 0; _ < m.FileIndex.length; ++_) if (m.FileIndex[_] == p)
        return m.FileIndex.splice(_, 1), m.FullPaths.splice(_, 1), !0;
    }
    return !1;
  }
  function Rf(m, w, p) {
    R(m);
    var _ = Ae.find(m, w);
    if (_) {
      for (var T = 0; T < m.FileIndex.length; ++T) if (m.FileIndex[T] == _)
        return m.FileIndex[T].name = a(p), m.FullPaths[T] = p, !0;
    }
    return !1;
  }
  function If(m) {
    k(m, !0);
  }
  return r.find = H, r.read = q, r.parse = c, r.write = Tt, r.writeFile = Ct, r.utils = {
    cfb_new: kf,
    cfb_add: Sa,
    cfb_del: Of,
    cfb_mov: Rf,
    cfb_gc: If,
    ReadShift: mn,
    CheckField: lo,
    prep_blob: pt,
    bconcat: Qe,
    use_zlib: S,
    _deflateRaw: Wi,
    _inflateRaw: Xi,
    consts: be
  }, r;
})();
function Ic(e) {
  return typeof e == "string" ? ua(e) : Array.isArray(e) ? nc(e) : e;
}
function Rn(e, r, t) {
  if (typeof Deno < "u") {
    if (t && typeof r == "string") switch (t) {
      case "utf8":
        r = new TextEncoder(t).encode(r);
        break;
      case "binary":
        r = ua(r);
        break;
      /* TODO: binary equivalent */
      default:
        throw new Error("Unsupported encoding " + t);
    }
    return Deno.writeFileSync(e, r);
  }
  var n = t == "utf8" ? Sn(r) : r;
  if (typeof IE_SaveFile < "u") return IE_SaveFile(n, e);
  if (typeof Blob < "u") {
    var a = new Blob([Ic(n)], { type: "application/octet-stream" });
    if (typeof navigator < "u" && navigator.msSaveBlob) return navigator.msSaveBlob(a, e);
    if (typeof saveAs < "u") return saveAs(a, e);
    if (typeof URL < "u" && typeof document < "u" && document.createElement && URL.createObjectURL) {
      var i = URL.createObjectURL(a);
      if (typeof chrome == "object" && typeof (chrome.downloads || {}).download == "function")
        return URL.revokeObjectURL && typeof setTimeout < "u" && setTimeout(function() {
          URL.revokeObjectURL(i);
        }, 6e4), chrome.downloads.download({ url: i, filename: e, saveAs: !0 });
      var s = document.createElement("a");
      if (s.download != null)
        return s.download = e, s.href = i, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL && typeof setTimeout < "u" && setTimeout(function() {
          URL.revokeObjectURL(i);
        }, 6e4), i;
    }
  }
  if (typeof $ < "u" && typeof File < "u" && typeof Folder < "u") try {
    var o = File(e);
    return o.open("w"), o.encoding = "binary", Array.isArray(r) && (r = On(r)), o.write(r), o.close(), r;
  } catch (l) {
    if (!l.message || !l.message.match(/onstruct/)) throw l;
  }
  throw new Error("cannot save file " + e);
}
function et(e) {
  for (var r = Object.keys(e), t = [], n = 0; n < r.length; ++n) Object.prototype.hasOwnProperty.call(e, r[n]) && t.push(r[n]);
  return t;
}
function S0(e, r) {
  for (var t = [], n = et(e), a = 0; a !== n.length; ++a) t[e[n[a]][r]] == null && (t[e[n[a]][r]] = n[a]);
  return t;
}
function wi(e) {
  for (var r = [], t = et(e), n = 0; n !== t.length; ++n) r[e[t[n]]] = t[n];
  return r;
}
function ma(e) {
  for (var r = [], t = et(e), n = 0; n !== t.length; ++n) r[e[t[n]]] = parseInt(t[n], 10);
  return r;
}
function Nc(e) {
  for (var r = [], t = et(e), n = 0; n !== t.length; ++n)
    r[e[t[n]]] == null && (r[e[t[n]]] = []), r[e[t[n]]].push(t[n]);
  return r;
}
var ra = /* @__PURE__ */ new Date(1899, 11, 30, 0, 0, 0);
function ut(e, r) {
  var t = /* @__PURE__ */ e.getTime(), n = /* @__PURE__ */ ra.getTime() + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ ra.getTimezoneOffset()) * 6e4;
  return (t - n) / (1440 * 60 * 1e3);
}
var Xs = /* @__PURE__ */ new Date(), Dc = /* @__PURE__ */ ra.getTime() + (/* @__PURE__ */ Xs.getTimezoneOffset() - /* @__PURE__ */ ra.getTimezoneOffset()) * 6e4, y0 = /* @__PURE__ */ Xs.getTimezoneOffset();
function js(e) {
  var r = /* @__PURE__ */ new Date();
  return r.setTime(e * 24 * 60 * 60 * 1e3 + Dc), r.getTimezoneOffset() !== y0 && r.setTime(r.getTime() + (r.getTimezoneOffset() - y0) * 6e4), r;
}
var F0 = /* @__PURE__ */ new Date("2017-02-19T19:06:09.000Z"), Ys = /* @__PURE__ */ isNaN(/* @__PURE__ */ F0.getFullYear()) ? /* @__PURE__ */ new Date("2/19/17") : F0, Pc = /* @__PURE__ */ Ys.getFullYear() == 2017;
function lt(e, r) {
  var t = new Date(e);
  if (Pc)
    return r > 0 ? t.setTime(t.getTime() + t.getTimezoneOffset() * 60 * 1e3) : r < 0 && t.setTime(t.getTime() - t.getTimezoneOffset() * 60 * 1e3), t;
  if (e instanceof Date) return e;
  if (Ys.getFullYear() == 1917 && !isNaN(t.getFullYear())) {
    var n = t.getFullYear();
    return e.indexOf("" + n) > -1 || t.setFullYear(t.getFullYear() + 100), t;
  }
  var a = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"], i = new Date(+a[0], +a[1] - 1, +a[2], +a[3] || 0, +a[4] || 0, +a[5] || 0);
  return e.indexOf("Z") > -1 && (i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3)), i;
}
function pa(e, r) {
  if (ge && Buffer.isBuffer(e))
    return e.toString("binary");
  if (typeof TextDecoder < "u") try {
    var t = {
      "€": "",
      "‚": "",
      ƒ: "",
      "„": "",
      "…": "",
      "†": "",
      "‡": "",
      "ˆ": "",
      "‰": "",
      Š: "",
      "‹": "",
      Œ: "",
      Ž: "",
      "‘": "",
      "’": "",
      "“": "",
      "”": "",
      "•": "",
      "–": "",
      "—": "",
      "˜": "",
      "™": "",
      š: "",
      "›": "",
      œ: "",
      ž: "",
      Ÿ: ""
    };
    return Array.isArray(e) && (e = new Uint8Array(e)), new TextDecoder("latin1").decode(e).replace(/[€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]/g, function(i) {
      return t[i] || i;
    });
  } catch {
  }
  for (var n = [], a = 0; a != e.length; ++a) n.push(String.fromCharCode(e[a]));
  return n.join("");
}
function xt(e) {
  if (typeof JSON < "u" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null) return e;
  if (e instanceof Date) return new Date(e.getTime());
  var r = {};
  for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = xt(e[t]));
  return r;
}
function Le(e, r) {
  for (var t = ""; t.length < r; ) t += e;
  return t;
}
function $t(e) {
  var r = Number(e);
  if (!isNaN(r)) return isFinite(r) ? r : NaN;
  if (!/\d/.test(e)) return r;
  var t = 1, n = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function() {
    return t *= 100, "";
  });
  return !isNaN(r = Number(n)) || (n = n.replace(/[(](.*)[)]/, function(a, i) {
    return t = -t, i;
  }), !isNaN(r = Number(n))) ? r / t : r;
}
var Mc = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function En(e) {
  var r = new Date(e), t = /* @__PURE__ */ new Date(NaN), n = r.getYear(), a = r.getMonth(), i = r.getDate();
  if (isNaN(i)) return t;
  var s = e.toLowerCase();
  if (s.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (s = s.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), s.length > 3 && Mc.indexOf(s) == -1) return t;
  } else if (s.match(/[a-z]/)) return t;
  return n < 0 || n > 8099 ? t : (a > 0 || i > 1) && n != 101 ? r : e.match(/[^-0-9:,\/\\]/) ? t : r;
}
function ue(e, r, t) {
  if (e.FullPaths) {
    if (typeof t == "string") {
      var n;
      return ge ? n = jt(t) : n = ac(t), Ae.utils.cfb_add(e, r, n);
    }
    Ae.utils.cfb_add(e, r, t);
  } else e.file(r, t);
}
function Ti() {
  return Ae.utils.cfb_new();
}
var Ge = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`, Lc = {
  "&quot;": '"',
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&amp;": "&"
}, Ei = /* @__PURE__ */ wi(Lc), Si = /[&<>'"]/g, Bc = /[\u0000-\u0008\u000b-\u001f]/g;
function ye(e) {
  var r = e + "";
  return r.replace(Si, function(t) {
    return Ei[t];
  }).replace(Bc, function(t) {
    return "_x" + ("000" + t.charCodeAt(0).toString(16)).slice(-4) + "_";
  });
}
function C0(e) {
  return ye(e).replace(/ /g, "_x0020_");
}
var Ks = /[\u0000-\u001f]/g;
function bc(e) {
  var r = e + "";
  return r.replace(Si, function(t) {
    return Ei[t];
  }).replace(/\n/g, "<br/>").replace(Ks, function(t) {
    return "&#x" + ("000" + t.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}
function Uc(e) {
  var r = e + "";
  return r.replace(Si, function(t) {
    return Ei[t];
  }).replace(Ks, function(t) {
    return "&#x" + t.charCodeAt(0).toString(16).toUpperCase() + ";";
  });
}
function Wc(e) {
  return e.replace(/(\r\n|[\r\n])/g, "&#10;");
}
function Hc(e) {
  switch (e) {
    case 1:
    case !0:
    case "1":
    case "true":
    case "TRUE":
      return !0;
    /* case '0': case 'false': case 'FALSE':*/
    default:
      return !1;
  }
}
function Na(e) {
  for (var r = "", t = 0, n = 0, a = 0, i = 0, s = 0, o = 0; t < e.length; ) {
    if (n = e.charCodeAt(t++), n < 128) {
      r += String.fromCharCode(n);
      continue;
    }
    if (a = e.charCodeAt(t++), n > 191 && n < 224) {
      s = (n & 31) << 6, s |= a & 63, r += String.fromCharCode(s);
      continue;
    }
    if (i = e.charCodeAt(t++), n < 240) {
      r += String.fromCharCode((n & 15) << 12 | (a & 63) << 6 | i & 63);
      continue;
    }
    s = e.charCodeAt(t++), o = ((n & 7) << 18 | (a & 63) << 12 | (i & 63) << 6 | s & 63) - 65536, r += String.fromCharCode(55296 + (o >>> 10 & 1023)), r += String.fromCharCode(56320 + (o & 1023));
  }
  return r;
}
function A0(e) {
  var r = Tr(2 * e.length), t, n, a = 1, i = 0, s = 0, o;
  for (n = 0; n < e.length; n += a)
    a = 1, (o = e.charCodeAt(n)) < 128 ? t = o : o < 224 ? (t = (o & 31) * 64 + (e.charCodeAt(n + 1) & 63), a = 2) : o < 240 ? (t = (o & 15) * 4096 + (e.charCodeAt(n + 1) & 63) * 64 + (e.charCodeAt(n + 2) & 63), a = 3) : (a = 4, t = (o & 7) * 262144 + (e.charCodeAt(n + 1) & 63) * 4096 + (e.charCodeAt(n + 2) & 63) * 64 + (e.charCodeAt(n + 3) & 63), t -= 65536, s = 55296 + (t >>> 10 & 1023), t = 56320 + (t & 1023)), s !== 0 && (r[i++] = s & 255, r[i++] = s >>> 8, s = 0), r[i++] = t % 256, r[i++] = t >>> 8;
  return r.slice(0, i).toString("ucs2");
}
function k0(e) {
  return jt(e, "binary").toString("utf8");
}
var Gn = "foo bar bazâð£", dn = ge && (/* @__PURE__ */ k0(Gn) == /* @__PURE__ */ Na(Gn) && k0 || /* @__PURE__ */ A0(Gn) == /* @__PURE__ */ Na(Gn) && A0) || Na, Sn = ge ? function(e) {
  return jt(e, "utf8").toString("binary");
} : function(e) {
  for (var r = [], t = 0, n = 0, a = 0; t < e.length; )
    switch (n = e.charCodeAt(t++), !0) {
      case n < 128:
        r.push(String.fromCharCode(n));
        break;
      case n < 2048:
        r.push(String.fromCharCode(192 + (n >> 6))), r.push(String.fromCharCode(128 + (n & 63)));
        break;
      case (n >= 55296 && n < 57344):
        n -= 55296, a = e.charCodeAt(t++) - 56320 + (n << 10), r.push(String.fromCharCode(240 + (a >> 18 & 7))), r.push(String.fromCharCode(144 + (a >> 12 & 63))), r.push(String.fromCharCode(128 + (a >> 6 & 63))), r.push(String.fromCharCode(128 + (a & 63)));
        break;
      default:
        r.push(String.fromCharCode(224 + (n >> 12))), r.push(String.fromCharCode(128 + (n >> 6 & 63))), r.push(String.fromCharCode(128 + (n & 63)));
    }
  return r.join("");
}, Gc = /* @__PURE__ */ (function() {
  var e = [
    ["nbsp", " "],
    ["middot", "·"],
    ["quot", '"'],
    ["apos", "'"],
    ["gt", ">"],
    ["lt", "<"],
    ["amp", "&"]
  ].map(function(r) {
    return [new RegExp("&" + r[0] + ";", "ig"), r[1]];
  });
  return function(t) {
    for (var n = t.replace(/^[\t\n\r ]+/, "").replace(/[\t\n\r ]+$/, "").replace(/>\s+/g, ">").replace(/\s+</g, "<").replace(/[\t\n\r ]+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, `
`).replace(/<[^>]*>/g, ""), a = 0; a < e.length; ++a) n = n.replace(e[a][0], e[a][1]);
    return n;
  };
})(), Js = /(^\s|\s$|\n)/;
function Ze(e, r) {
  return "<" + e + (r.match(Js) ? ' xml:space="preserve"' : "") + ">" + r + "</" + e + ">";
}
function yn(e) {
  return et(e).map(function(r) {
    return " " + r + '="' + e[r] + '"';
  }).join("");
}
function J(e, r, t) {
  return "<" + e + (t != null ? yn(t) : "") + (r != null ? (r.match(Js) ? ' xml:space="preserve"' : "") + ">" + r + "</" + e : "/") + ">";
}
function li(e, r) {
  try {
    return e.toISOString().replace(/\.\d*/, "");
  } catch (t) {
    if (r) throw t;
  }
  return "";
}
function $c(e, r) {
  switch (typeof e) {
    case "string":
      var t = J("vt:lpwstr", ye(e));
      return t = t.replace(/&quot;/g, "_x0022_"), t;
    case "number":
      return J((e | 0) == e ? "vt:i4" : "vt:r8", ye(String(e)));
    case "boolean":
      return J("vt:bool", e ? "true" : "false");
  }
  if (e instanceof Date) return J("vt:filetime", li(e));
  throw new Error("Unable to serialize " + e);
}
var ze = {
  CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
  CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
  EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
  CT: "http://schemas.openxmlformats.org/package/2006/content-types",
  RELS: "http://schemas.openxmlformats.org/package/2006/relationships",
  TCMNT: "http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments",
  dc: "http://purl.org/dc/elements/1.1/",
  dcterms: "http://purl.org/dc/terms/",
  dcmitype: "http://purl.org/dc/dcmitype/",
  r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
  vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
  xsi: "http://www.w3.org/2001/XMLSchema-instance",
  xsd: "http://www.w3.org/2001/XMLSchema"
}, Jr = [
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://purl.oclc.org/ooxml/spreadsheetml/main",
  "http://schemas.microsoft.com/office/excel/2006/main",
  "http://schemas.microsoft.com/office/excel/2006/2"
], vt = {
  o: "urn:schemas-microsoft-com:office:office",
  x: "urn:schemas-microsoft-com:office:excel",
  ss: "urn:schemas-microsoft-com:office:spreadsheet",
  dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
  mv: "http://macVmlSchemaUri",
  v: "urn:schemas-microsoft-com:vml",
  html: "http://www.w3.org/TR/REC-html40"
};
function Vc(e, r) {
  for (var t = 1 - 2 * (e[r + 7] >>> 7), n = ((e[r + 7] & 127) << 4) + (e[r + 6] >>> 4 & 15), a = e[r + 6] & 15, i = 5; i >= 0; --i) a = a * 256 + e[r + i];
  return n == 2047 ? a == 0 ? t * (1 / 0) : NaN : (n == 0 ? n = -1022 : (n -= 1023, a += Math.pow(2, 52)), t * Math.pow(2, n - 52) * a);
}
function zc(e, r, t) {
  var n = (r < 0 || 1 / r == -1 / 0 ? 1 : 0) << 7, a = 0, i = 0, s = n ? -r : r;
  isFinite(s) ? s == 0 ? a = i = 0 : (a = Math.floor(Math.log(s) / Math.LN2), i = s * Math.pow(2, 52 - a), a <= -1023 && (!isFinite(i) || i < Math.pow(2, 52)) ? a = -1022 : (i -= Math.pow(2, 52), a += 1023)) : (a = 2047, i = isNaN(r) ? 26985 : 0);
  for (var o = 0; o <= 5; ++o, i /= 256) e[t + o] = i & 255;
  e[t + 6] = (a & 15) << 4 | i & 15, e[t + 7] = a >> 4 | n;
}
var O0 = function(e) {
  for (var r = [], t = 10240, n = 0; n < e[0].length; ++n) if (e[0][n]) for (var a = 0, i = e[0][n].length; a < i; a += t) r.push.apply(r, e[0][n].slice(a, a + t));
  return r;
}, R0 = ge ? function(e) {
  return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(r) {
    return Buffer.isBuffer(r) ? r : jt(r);
  })) : O0(e);
} : O0, I0 = function(e, r, t) {
  for (var n = [], a = r; a < t; a += 2) n.push(String.fromCharCode(hn(e, a)));
  return n.join("").replace(xn, "");
}, yi = ge ? function(e, r, t) {
  return Buffer.isBuffer(e) ? e.toString("utf16le", r, t).replace(xn, "") : I0(e, r, t);
} : I0, N0 = function(e, r, t) {
  for (var n = [], a = r; a < r + t; ++a) n.push(("0" + e[a].toString(16)).slice(-2));
  return n.join("");
}, Qs = ge ? function(e, r, t) {
  return Buffer.isBuffer(e) ? e.toString("hex", r, r + t) : N0(e, r, t);
} : N0, D0 = function(e, r, t) {
  for (var n = [], a = r; a < t; a++) n.push(String.fromCharCode(Lr(e, a)));
  return n.join("");
}, In = ge ? function(r, t, n) {
  return Buffer.isBuffer(r) ? r.toString("utf8", t, n) : D0(r, t, n);
} : D0, Zs = function(e, r) {
  var t = _t(e, r);
  return t > 0 ? In(e, r + 4, r + 4 + t - 1) : "";
}, qs = Zs, eo = function(e, r) {
  var t = _t(e, r);
  return t > 0 ? In(e, r + 4, r + 4 + t - 1) : "";
}, to = eo, ro = function(e, r) {
  var t = 2 * _t(e, r);
  return t > 0 ? In(e, r + 4, r + 4 + t - 1) : "";
}, no = ro, ao = function(r, t) {
  var n = _t(r, t);
  return n > 0 ? yi(r, t + 4, t + 4 + n) : "";
}, io = ao, so = function(e, r) {
  var t = _t(e, r);
  return t > 0 ? In(e, r + 4, r + 4 + t) : "";
}, oo = so, fo = function(e, r) {
  return Vc(e, r);
}, na = fo, Fi = function(r) {
  return Array.isArray(r) || typeof Uint8Array < "u" && r instanceof Uint8Array;
};
ge && (qs = function(r, t) {
  if (!Buffer.isBuffer(r)) return Zs(r, t);
  var n = r.readUInt32LE(t);
  return n > 0 ? r.toString("utf8", t + 4, t + 4 + n - 1) : "";
}, to = function(r, t) {
  if (!Buffer.isBuffer(r)) return eo(r, t);
  var n = r.readUInt32LE(t);
  return n > 0 ? r.toString("utf8", t + 4, t + 4 + n - 1) : "";
}, no = function(r, t) {
  if (!Buffer.isBuffer(r)) return ro(r, t);
  var n = 2 * r.readUInt32LE(t);
  return r.toString("utf16le", t + 4, t + 4 + n - 1);
}, io = function(r, t) {
  if (!Buffer.isBuffer(r)) return ao(r, t);
  var n = r.readUInt32LE(t);
  return r.toString("utf16le", t + 4, t + 4 + n);
}, oo = function(r, t) {
  if (!Buffer.isBuffer(r)) return so(r, t);
  var n = r.readUInt32LE(t);
  return r.toString("utf8", t + 4, t + 4 + n);
}, na = function(r, t) {
  return Buffer.isBuffer(r) ? r.readDoubleLE(t) : fo(r, t);
}, Fi = function(r) {
  return Buffer.isBuffer(r) || Array.isArray(r) || typeof Uint8Array < "u" && r instanceof Uint8Array;
});
var Lr = function(e, r) {
  return e[r];
}, hn = function(e, r) {
  return e[r + 1] * 256 + e[r];
}, Xc = function(e, r) {
  var t = e[r + 1] * 256 + e[r];
  return t < 32768 ? t : (65535 - t + 1) * -1;
}, _t = function(e, r) {
  return e[r + 3] * (1 << 24) + (e[r + 2] << 16) + (e[r + 1] << 8) + e[r];
}, mr = function(e, r) {
  return e[r + 3] << 24 | e[r + 2] << 16 | e[r + 1] << 8 | e[r];
}, jc = function(e, r) {
  return e[r] << 24 | e[r + 1] << 16 | e[r + 2] << 8 | e[r + 3];
};
function mn(e, r) {
  var t = "", n, a, i = [], s, o, l, f;
  switch (r) {
    case "dbcs":
      if (f = this.l, ge && Buffer.isBuffer(this)) t = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else for (l = 0; l < e; ++l)
        t += String.fromCharCode(hn(this, f)), f += 2;
      e *= 2;
      break;
    case "utf8":
      t = In(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, t = yi(this, this.l, this.l + e);
      break;
    case "wstr":
      return mn.call(this, e, "dbcs");
    /* [MS-OLEDS] 2.1.4 LengthPrefixedAnsiString */
    case "lpstr-ansi":
      t = qs(this, this.l), e = 4 + _t(this, this.l);
      break;
    case "lpstr-cp":
      t = to(this, this.l), e = 4 + _t(this, this.l);
      break;
    /* [MS-OLEDS] 2.1.5 LengthPrefixedUnicodeString */
    case "lpwstr":
      t = no(this, this.l), e = 4 + 2 * _t(this, this.l);
      break;
    /* [MS-OFFCRYPTO] 2.1.2 Length-Prefixed Padded Unicode String (UNICODE-LP-P4) */
    case "lpp4":
      e = 4 + _t(this, this.l), t = io(this, this.l), e & 2 && (e += 2);
      break;
    /* [MS-OFFCRYPTO] 2.1.3 Length-Prefixed UTF-8 String (UTF-8-LP-P4) */
    case "8lpp4":
      e = 4 + _t(this, this.l), t = oo(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, t = ""; (s = Lr(this, this.l + e++)) !== 0; ) i.push(Un(s));
      t = i.join("");
      break;
    case "_wstr":
      for (e = 0, t = ""; (s = hn(this, this.l + e)) !== 0; )
        i.push(Un(s)), e += 2;
      e += 2, t = i.join("");
      break;
    /* sbcs and dbcs support continue records in the SST way TODO codepages */
    case "dbcs-cont":
      for (t = "", f = this.l, l = 0; l < e; ++l) {
        if (this.lens && this.lens.indexOf(f) !== -1)
          return s = Lr(this, f), this.l = f + 1, o = mn.call(this, e - l, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + o;
        i.push(Un(hn(this, f))), f += 2;
      }
      t = i.join(""), e *= 2;
      break;
    case "cpstr":
    /* falls through */
    case "sbcs-cont":
      for (t = "", f = this.l, l = 0; l != e; ++l) {
        if (this.lens && this.lens.indexOf(f) !== -1)
          return s = Lr(this, f), this.l = f + 1, o = mn.call(this, e - l, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + o;
        i.push(Un(Lr(this, f))), f += 1;
      }
      t = i.join("");
      break;
    default:
      switch (e) {
        case 1:
          return n = Lr(this, this.l), this.l++, n;
        case 2:
          return n = (r === "i" ? Xc : hn)(this, this.l), this.l += 2, n;
        case 4:
        case -4:
          return r === "i" || (this[this.l + 3] & 128) === 0 ? (n = (e > 0 ? mr : jc)(this, this.l), this.l += 4, n) : (a = _t(this, this.l), this.l += 4, a);
        case 8:
        case -8:
          if (r === "f")
            return e == 8 ? a = na(this, this.l) : a = na([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, a;
          e = 8;
        /* falls through */
        case 16:
          t = Qs(this, this.l, e);
          break;
      }
  }
  return this.l += e, t;
}
var Yc = function(e, r, t) {
  e[t] = r & 255, e[t + 1] = r >>> 8 & 255, e[t + 2] = r >>> 16 & 255, e[t + 3] = r >>> 24 & 255;
}, Kc = function(e, r, t) {
  e[t] = r & 255, e[t + 1] = r >> 8 & 255, e[t + 2] = r >> 16 & 255, e[t + 3] = r >> 24 & 255;
}, Jc = function(e, r, t) {
  e[t] = r & 255, e[t + 1] = r >>> 8 & 255;
};
function Qc(e, r, t) {
  var n = 0, a = 0;
  if (t === "dbcs") {
    for (a = 0; a != r.length; ++a) Jc(this, r.charCodeAt(a), this.l + 2 * a);
    n = 2 * r.length;
  } else if (t === "sbcs") {
    for (r = r.replace(/[^\x00-\x7F]/g, "_"), a = 0; a != r.length; ++a) this[this.l + a] = r.charCodeAt(a) & 255;
    n = r.length;
  } else if (t === "hex") {
    for (; a < e; ++a)
      this[this.l++] = parseInt(r.slice(2 * a, 2 * a + 2), 16) || 0;
    return this;
  } else if (t === "utf16le") {
    var i = Math.min(this.l + e, this.length);
    for (a = 0; a < Math.min(r.length, e); ++a) {
      var s = r.charCodeAt(a);
      this[this.l++] = s & 255, this[this.l++] = s >> 8;
    }
    for (; this.l < i; ) this[this.l++] = 0;
    return this;
  } else switch (e) {
    case 1:
      n = 1, this[this.l] = r & 255;
      break;
    case 2:
      n = 2, this[this.l] = r & 255, r >>>= 8, this[this.l + 1] = r & 255;
      break;
    case 3:
      n = 3, this[this.l] = r & 255, r >>>= 8, this[this.l + 1] = r & 255, r >>>= 8, this[this.l + 2] = r & 255;
      break;
    case 4:
      n = 4, Yc(this, r, this.l);
      break;
    case 8:
      if (n = 8, t === "f") {
        zc(this, r, this.l);
        break;
      }
    /* falls through */
    case 16:
      break;
    case -4:
      n = 4, Kc(this, r, this.l);
      break;
  }
  return this.l += n, this;
}
function lo(e, r) {
  var t = Qs(this, this.l, e.length >> 1);
  if (t !== e) throw new Error(r + "Expected " + e + " saw " + t);
  this.l += e.length >> 1;
}
function pt(e, r) {
  e.l = r, e.read_shift = /*::(*/
  mn, e.chk = lo, e.write_shift = Qc;
}
function Bt(e, r) {
  e.l += r;
}
function B(e) {
  var r = Tr(e);
  return pt(r, 0), r;
}
function ht() {
  var e = [], r = ge ? 256 : 2048, t = function(f) {
    var c = B(f);
    return pt(c, 0), c;
  }, n = t(r), a = function() {
    n && (n.length > n.l && (n = n.slice(0, n.l), n.l = n.length), n.length > 0 && e.push(n), n = null);
  }, i = function(f) {
    return n && f < n.length - n.l ? n : (a(), n = t(Math.max(f + 1, r)));
  }, s = function() {
    return a(), Qe(e);
  }, o = function(f) {
    a(), n = f, n.l == null && (n.l = n.length), i(r);
  };
  return { next: i, push: o, end: s, _bufs: e };
}
function G(e, r, t, n) {
  var a = +r, i;
  if (!isNaN(a)) {
    n || (n = Vm[a].p || (t || []).length || 0), i = 1 + (a >= 128 ? 1 : 0) + 1, n >= 128 && ++i, n >= 16384 && ++i, n >= 2097152 && ++i;
    var s = e.next(i);
    a <= 127 ? s.write_shift(1, a) : (s.write_shift(1, (a & 127) + 128), s.write_shift(1, a >> 7));
    for (var o = 0; o != 4; ++o)
      if (n >= 128)
        s.write_shift(1, (n & 127) + 128), n >>= 7;
      else {
        s.write_shift(1, n);
        break;
      }
    /*:: length != null &&*/
    n > 0 && Fi(t) && e.push(t);
  }
}
function pn(e, r, t) {
  var n = xt(e);
  if (r.s ? (n.cRel && (n.c += r.s.c), n.rRel && (n.r += r.s.r)) : (n.cRel && (n.c += r.c), n.rRel && (n.r += r.r)), !t || t.biff < 12) {
    for (; n.c >= 256; ) n.c -= 256;
    for (; n.r >= 65536; ) n.r -= 65536;
  }
  return n;
}
function P0(e, r, t) {
  var n = xt(e);
  return n.s = pn(n.s, r.s, t), n.e = pn(n.e, r.s, t), n;
}
function vn(e, r) {
  if (e.cRel && e.c < 0)
    for (e = xt(e); e.c < 0; ) e.c += r > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = xt(e); e.r < 0; ) e.r += r > 8 ? 1048576 : r > 5 ? 65536 : 16384;
  var t = Fe(e);
  return !e.cRel && e.cRel != null && (t = eh(t)), !e.rRel && e.rRel != null && (t = Zc(t)), t;
}
function Da(e, r) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (r.biff >= 12 ? 1048575 : r.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + rt(e.s.c) + ":" + (e.e.cRel ? "" : "$") + rt(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (r.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + qe(e.s.r) + ":" + (e.e.rRel ? "" : "$") + qe(e.e.r) : vn(e.s, r.biff) + ":" + vn(e.e, r.biff);
}
function Ci(e) {
  return parseInt(qc(e), 10) - 1;
}
function qe(e) {
  return "" + (e + 1);
}
function Zc(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function qc(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function Ai(e) {
  for (var r = th(e), t = 0, n = 0; n !== r.length; ++n) t = 26 * t + r.charCodeAt(n) - 64;
  return t - 1;
}
function rt(e) {
  if (e < 0) throw new Error("invalid column " + e);
  var r = "";
  for (++e; e; e = Math.floor((e - 1) / 26)) r = String.fromCharCode((e - 1) % 26 + 65) + r;
  return r;
}
function eh(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}
function th(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}
function rh(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function Xe(e) {
  for (var r = 0, t = 0, n = 0; n < e.length; ++n) {
    var a = e.charCodeAt(n);
    a >= 48 && a <= 57 ? r = 10 * r + (a - 48) : a >= 65 && a <= 90 && (t = 26 * t + (a - 64));
  }
  return { c: t - 1, r: r - 1 };
}
function Fe(e) {
  for (var r = e.c + 1, t = ""; r; r = (r - 1) / 26 | 0) t = String.fromCharCode((r - 1) % 26 + 65) + t;
  return t + (e.r + 1);
}
function gt(e) {
  var r = e.indexOf(":");
  return r == -1 ? { s: Xe(e), e: Xe(e) } : { s: Xe(e.slice(0, r)), e: Xe(e.slice(r + 1)) };
}
function He(e, r) {
  return typeof r > "u" || typeof r == "number" ? He(e.s, e.e) : (typeof e != "string" && (e = Fe(e)), typeof r != "string" && (r = Fe(r)), e == r ? e : e + ":" + r);
}
function Ne(e) {
  var r = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }, t = 0, n = 0, a = 0, i = e.length;
  for (t = 0; n < i && !((a = e.charCodeAt(n) - 64) < 1 || a > 26); ++n)
    t = 26 * t + a;
  for (r.s.c = --t, t = 0; n < i && !((a = e.charCodeAt(n) - 48) < 0 || a > 9); ++n)
    t = 10 * t + a;
  if (r.s.r = --t, n === i || a != 10)
    return r.e.c = r.s.c, r.e.r = r.s.r, r;
  for (++n, t = 0; n != i && !((a = e.charCodeAt(n) - 64) < 1 || a > 26); ++n)
    t = 26 * t + a;
  for (r.e.c = --t, t = 0; n != i && !((a = e.charCodeAt(n) - 48) < 0 || a > 9); ++n)
    t = 10 * t + a;
  return r.e.r = --t, r;
}
function M0(e, r) {
  var t = e.t == "d" && r instanceof Date;
  if (e.z != null) try {
    return e.w = ir(e.z, t ? ut(r) : r);
  } catch {
  }
  try {
    return e.w = ir((e.XF || {}).numFmtId || (t ? 14 : 0), t ? ut(r) : r);
  } catch {
    return "" + r;
  }
}
function Xt(e, r, t) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && t && t.dateNF && (e.z = t.dateNF), e.t == "e" ? Nn[e.v] || e.v : r == null ? M0(e, e.v) : M0(e, r));
}
function yr(e, r) {
  var t = r && r.sheet ? r.sheet : "Sheet1", n = {};
  return n[t] = e, { SheetNames: [t], Sheets: n };
}
function co(e, r, t) {
  var n = t || {}, a = e ? Array.isArray(e) : n.dense, i = e || (a ? [] : {}), s = 0, o = 0;
  if (i && n.origin != null) {
    if (typeof n.origin == "number") s = n.origin;
    else {
      var l = typeof n.origin == "string" ? Xe(n.origin) : n.origin;
      s = l.r, o = l.c;
    }
    i["!ref"] || (i["!ref"] = "A1:A1");
  }
  var f = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };
  if (i["!ref"]) {
    var c = Ne(i["!ref"]);
    f.s.c = c.s.c, f.s.r = c.s.r, f.e.c = Math.max(f.e.c, c.e.c), f.e.r = Math.max(f.e.r, c.e.r), s == -1 && (f.e.r = s = c.e.r + 1);
  }
  for (var d = 0; d != r.length; ++d)
    if (r[d]) {
      if (!Array.isArray(r[d])) throw new Error("aoa_to_sheet expects an array of arrays");
      for (var h = 0; h != r[d].length; ++h)
        if (!(typeof r[d][h] > "u")) {
          var u = { v: r[d][h] }, v = s + d, x = o + h;
          if (f.s.r > v && (f.s.r = v), f.s.c > x && (f.s.c = x), f.e.r < v && (f.e.r = v), f.e.c < x && (f.e.c = x), r[d][h] && typeof r[d][h] == "object" && !Array.isArray(r[d][h]) && !(r[d][h] instanceof Date)) u = r[d][h];
          else if (Array.isArray(u.v) && (u.f = r[d][h][1], u.v = u.v[0]), u.v === null)
            if (u.f) u.t = "n";
            else if (n.nullError)
              u.t = "e", u.v = 0;
            else if (n.sheetStubs) u.t = "z";
            else continue;
          else typeof u.v == "number" ? u.t = "n" : typeof u.v == "boolean" ? u.t = "b" : u.v instanceof Date ? (u.z = n.dateNF || Be[14], n.cellDates ? (u.t = "d", u.w = ir(u.z, ut(u.v))) : (u.t = "n", u.v = ut(u.v), u.w = ir(u.z, u.v))) : u.t = "s";
          if (a)
            i[v] || (i[v] = []), i[v][x] && i[v][x].z && (u.z = i[v][x].z), i[v][x] = u;
          else {
            var g = Fe({ c: x, r: v });
            i[g] && i[g].z && (u.z = i[g].z), i[g] = u;
          }
        }
    }
  return f.s.c < 1e7 && (i["!ref"] = He(f)), i;
}
function Qr(e, r) {
  return co(null, e, r);
}
function nh(e) {
  return e.read_shift(4, "i");
}
function Nt(e, r) {
  return r || (r = B(4)), r.write_shift(4, e), r;
}
function nt(e) {
  var r = e.read_shift(4);
  return r === 0 ? "" : e.read_shift(r, "dbcs");
}
function je(e, r) {
  var t = !1;
  return r == null && (t = !0, r = B(4 + 2 * e.length)), r.write_shift(4, e.length), e.length > 0 && r.write_shift(0, e, "dbcs"), t ? r.slice(0, r.l) : r;
}
function ah(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function ih(e, r) {
  return r || (r = B(4)), r.write_shift(2, 0), r.write_shift(2, 0), r;
}
function ki(e, r) {
  var t = e.l, n = e.read_shift(1), a = nt(e), i = [], s = { t: a, h: a };
  if ((n & 1) !== 0) {
    for (var o = e.read_shift(4), l = 0; l != o; ++l) i.push(ah(e));
    s.r = i;
  } else s.r = [{ ich: 0, ifnt: 0 }];
  return e.l = t + r, s;
}
function sh(e, r) {
  var t = !1;
  return r == null && (t = !0, r = B(15 + 4 * e.t.length)), r.write_shift(1, 0), je(e.t, r), t ? r.slice(0, r.l) : r;
}
var oh = ki;
function fh(e, r) {
  var t = !1;
  return r == null && (t = !0, r = B(23 + 4 * e.t.length)), r.write_shift(1, 1), je(e.t, r), r.write_shift(4, 1), ih({}, r), t ? r.slice(0, r.l) : r;
}
function Ft(e) {
  var r = e.read_shift(4), t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, { c: r, iStyleRef: t };
}
function Fr(e, r) {
  return r == null && (r = B(8)), r.write_shift(-4, e.c), r.write_shift(3, e.iStyleRef || e.s), r.write_shift(1, 0), r;
}
function Cr(e) {
  var r = e.read_shift(2);
  return r += e.read_shift(1) << 16, e.l++, { c: -1, iStyleRef: r };
}
function Ar(e, r) {
  return r == null && (r = B(4)), r.write_shift(3, e.iStyleRef || e.s), r.write_shift(1, 0), r;
}
var lh = nt, ho = je;
function Oi(e) {
  var r = e.read_shift(4);
  return r === 0 || r === 4294967295 ? "" : e.read_shift(r, "dbcs");
}
function aa(e, r) {
  var t = !1;
  return r == null && (t = !0, r = B(127)), r.write_shift(4, e.length > 0 ? e.length : 4294967295), e.length > 0 && r.write_shift(0, e, "dbcs"), t ? r.slice(0, r.l) : r;
}
var ch = nt, ci = Oi, Ri = aa;
function uo(e) {
  var r = e.slice(e.l, e.l + 4), t = r[0] & 1, n = r[0] & 2;
  e.l += 4;
  var a = n === 0 ? na([0, 0, 0, 0, r[0] & 252, r[1], r[2], r[3]], 0) : mr(r, 0) >> 2;
  return t ? a / 100 : a;
}
function xo(e, r) {
  r == null && (r = B(4));
  var t = 0, n = 0, a = e * 100;
  if (e == (e | 0) && e >= -536870912 && e < 1 << 29 ? n = 1 : a == (a | 0) && a >= -536870912 && a < 1 << 29 && (n = 1, t = 1), n) r.write_shift(-4, ((t ? a : e) << 2) + (t + 2));
  else throw new Error("unsupported RkNumber " + e);
}
function mo(e) {
  var r = { s: {}, e: {} };
  return r.s.r = e.read_shift(4), r.e.r = e.read_shift(4), r.s.c = e.read_shift(4), r.e.c = e.read_shift(4), r;
}
function hh(e, r) {
  return r || (r = B(16)), r.write_shift(4, e.s.r), r.write_shift(4, e.e.r), r.write_shift(4, e.s.c), r.write_shift(4, e.e.c), r;
}
var kr = mo, Zr = hh;
function qr(e) {
  if (e.length - e.l < 8) throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function Er(e, r) {
  return (r || B(8)).write_shift(8, e, "f");
}
function uh(e) {
  var r = {}, t = e.read_shift(1), n = t >>> 1, a = e.read_shift(1), i = e.read_shift(2, "i"), s = e.read_shift(1), o = e.read_shift(1), l = e.read_shift(1);
  switch (e.l++, n) {
    case 0:
      r.auto = 1;
      break;
    case 1:
      r.index = a;
      var f = Th[a];
      f && (r.rgb = X0(f));
      break;
    case 2:
      r.rgb = X0([s, o, l]);
      break;
    case 3:
      r.theme = a;
      break;
  }
  return i != 0 && (r.tint = i > 0 ? i / 32767 : i / 32768), r;
}
function ia(e, r) {
  if (r || (r = B(8)), !e || e.auto)
    return r.write_shift(4, 0), r.write_shift(4, 0), r;
  e.index != null ? (r.write_shift(1, 2), r.write_shift(1, e.index)) : e.theme != null ? (r.write_shift(1, 6), r.write_shift(1, e.theme)) : (r.write_shift(1, 5), r.write_shift(1, 0));
  var t = e.tint || 0;
  if (t > 0 ? t *= 32767 : t < 0 && (t *= 32768), r.write_shift(2, t), !e.rgb || e.theme != null)
    r.write_shift(2, 0), r.write_shift(1, 0), r.write_shift(1, 0);
  else {
    var n = e.rgb || "FFFFFF";
    typeof n == "number" && (n = ("000000" + n.toString(16)).slice(-6)), r.write_shift(1, parseInt(n.slice(0, 2), 16)), r.write_shift(1, parseInt(n.slice(2, 4), 16)), r.write_shift(1, parseInt(n.slice(4, 6), 16)), r.write_shift(1, 255);
  }
  return r;
}
function xh(e) {
  var r = e.read_shift(1);
  e.l++;
  var t = {
    fBold: r & 1,
    fItalic: r & 2,
    fUnderline: r & 4,
    fStrikeout: r & 8,
    fOutline: r & 16,
    fShadow: r & 32,
    fCondense: r & 64,
    fExtend: r & 128
  };
  return t;
}
function dh(e, r) {
  r || (r = B(2));
  var t = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
  return r.write_shift(1, t), r.write_shift(1, 0), r;
}
var po = 2, mt = 3, $n = 11, sa = 19, Vn = 64, mh = 65, ph = 71, vh = 4108, _h = 4126, Je = 80, L0 = {
  /*::[*/
  1: { n: "CodePage", t: po },
  /*::[*/
  2: { n: "Category", t: Je },
  /*::[*/
  3: { n: "PresentationFormat", t: Je },
  /*::[*/
  4: { n: "ByteCount", t: mt },
  /*::[*/
  5: { n: "LineCount", t: mt },
  /*::[*/
  6: { n: "ParagraphCount", t: mt },
  /*::[*/
  7: { n: "SlideCount", t: mt },
  /*::[*/
  8: { n: "NoteCount", t: mt },
  /*::[*/
  9: { n: "HiddenCount", t: mt },
  /*::[*/
  10: { n: "MultimediaClipCount", t: mt },
  /*::[*/
  11: { n: "ScaleCrop", t: $n },
  /*::[*/
  12: {
    n: "HeadingPairs",
    t: vh
    /* VT_VECTOR | VT_VARIANT */
  },
  /*::[*/
  13: {
    n: "TitlesOfParts",
    t: _h
    /* VT_VECTOR | VT_LPSTR */
  },
  /*::[*/
  14: { n: "Manager", t: Je },
  /*::[*/
  15: { n: "Company", t: Je },
  /*::[*/
  16: { n: "LinksUpToDate", t: $n },
  /*::[*/
  17: { n: "CharacterCount", t: mt },
  /*::[*/
  19: { n: "SharedDoc", t: $n },
  /*::[*/
  22: { n: "HyperlinksChanged", t: $n },
  /*::[*/
  23: { n: "AppVersion", t: mt, p: "version" },
  /*::[*/
  24: { n: "DigSig", t: mh },
  /*::[*/
  26: { n: "ContentType", t: Je },
  /*::[*/
  27: { n: "ContentStatus", t: Je },
  /*::[*/
  28: { n: "Language", t: Je },
  /*::[*/
  29: { n: "Version", t: Je },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: sa },
  /*::[*/
  2147483651: { n: "Behavior", t: sa },
  /*::[*/
  1919054434: {}
}, B0 = {
  /*::[*/
  1: { n: "CodePage", t: po },
  /*::[*/
  2: { n: "Title", t: Je },
  /*::[*/
  3: { n: "Subject", t: Je },
  /*::[*/
  4: { n: "Author", t: Je },
  /*::[*/
  5: { n: "Keywords", t: Je },
  /*::[*/
  6: { n: "Comments", t: Je },
  /*::[*/
  7: { n: "Template", t: Je },
  /*::[*/
  8: { n: "LastAuthor", t: Je },
  /*::[*/
  9: { n: "RevNumber", t: Je },
  /*::[*/
  10: { n: "EditTime", t: Vn },
  /*::[*/
  11: { n: "LastPrinted", t: Vn },
  /*::[*/
  12: { n: "CreatedDate", t: Vn },
  /*::[*/
  13: { n: "ModifiedDate", t: Vn },
  /*::[*/
  14: { n: "PageCount", t: mt },
  /*::[*/
  15: { n: "WordCount", t: mt },
  /*::[*/
  16: { n: "CharCount", t: mt },
  /*::[*/
  17: { n: "Thumbnail", t: ph },
  /*::[*/
  18: { n: "Application", t: Je },
  /*::[*/
  19: { n: "DocSecurity", t: mt },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: sa },
  /*::[*/
  2147483651: { n: "Behavior", t: sa },
  /*::[*/
  1919054434: {}
};
function gh(e) {
  return e.map(function(r) {
    return [r >> 16 & 255, r >> 8 & 255, r & 255];
  });
}
var wh = /* @__PURE__ */ gh([
  /* Color Constants */
  0,
  16777215,
  16711680,
  65280,
  255,
  16776960,
  16711935,
  65535,
  /* Overridable Defaults */
  0,
  16777215,
  16711680,
  65280,
  255,
  16776960,
  16711935,
  65535,
  8388608,
  32768,
  128,
  8421376,
  8388736,
  32896,
  12632256,
  8421504,
  10066431,
  10040166,
  16777164,
  13434879,
  6684774,
  16744576,
  26316,
  13421823,
  128,
  16711935,
  16776960,
  65535,
  8388736,
  8388608,
  32896,
  255,
  52479,
  13434879,
  13434828,
  16777113,
  10079487,
  16751052,
  13408767,
  16764057,
  3368703,
  3394764,
  10079232,
  16763904,
  16750848,
  16737792,
  6710937,
  9868950,
  13158,
  3381606,
  13056,
  3355392,
  10040064,
  10040166,
  3355545,
  3355443,
  /* Other entries to appease BIFF8/12 */
  16777215,
  /* 0x40 icvForeground ?? */
  0,
  /* 0x41 icvBackground ?? */
  0,
  /* 0x42 icvFrame ?? */
  0,
  /* 0x43 icv3D ?? */
  0,
  /* 0x44 icv3DText ?? */
  0,
  /* 0x45 icv3DHilite ?? */
  0,
  /* 0x46 icv3DShadow ?? */
  0,
  /* 0x47 icvHilite ?? */
  0,
  /* 0x48 icvCtlText ?? */
  0,
  /* 0x49 icvCtlScrl ?? */
  0,
  /* 0x4A icvCtlInv ?? */
  0,
  /* 0x4B icvCtlBody ?? */
  0,
  /* 0x4C icvCtlFrame ?? */
  0,
  /* 0x4D icvCtlFore ?? */
  0,
  /* 0x4E icvCtlBack ?? */
  0,
  /* 0x4F icvCtlNeutral */
  0,
  /* 0x50 icvInfoBk ?? */
  0
  /* 0x51 icvInfoText ?? */
]), Th = /* @__PURE__ */ xt(wh), Nn = {
  /*::[*/
  0: "#NULL!",
  /*::[*/
  7: "#DIV/0!",
  /*::[*/
  15: "#VALUE!",
  /*::[*/
  23: "#REF!",
  /*::[*/
  29: "#NAME?",
  /*::[*/
  36: "#NUM!",
  /*::[*/
  42: "#N/A",
  /*::[*/
  43: "#GETTING_DATA",
  /*::[*/
  255: "#WTF?"
}, Eh = {
  /* Workbook */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": "workbooks",
  "application/vnd.ms-excel.sheet.macroEnabled.main+xml": "workbooks",
  "application/vnd.ms-excel.sheet.binary.macroEnabled.main": "workbooks",
  "application/vnd.ms-excel.addin.macroEnabled.main+xml": "workbooks",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": "workbooks",
  /* Worksheet */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": "sheets",
  "application/vnd.ms-excel.worksheet": "sheets",
  "application/vnd.ms-excel.binIndexWs": "TODO",
  /* Binary Index */
  /* Chartsheet */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": "charts",
  "application/vnd.ms-excel.chartsheet": "charts",
  /* Macrosheet */
  "application/vnd.ms-excel.macrosheet+xml": "macros",
  "application/vnd.ms-excel.macrosheet": "macros",
  "application/vnd.ms-excel.intlmacrosheet": "TODO",
  "application/vnd.ms-excel.binIndexMs": "TODO",
  /* Binary Index */
  /* Dialogsheet */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": "dialogs",
  "application/vnd.ms-excel.dialogsheet": "dialogs",
  /* Shared Strings */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml": "strs",
  "application/vnd.ms-excel.sharedStrings": "strs",
  /* Styles */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": "styles",
  "application/vnd.ms-excel.styles": "styles",
  /* File Properties */
  "application/vnd.openxmlformats-package.core-properties+xml": "coreprops",
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": "custprops",
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": "extprops",
  /* Custom Data Properties */
  "application/vnd.openxmlformats-officedocument.customXmlProperties+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty": "TODO",
  /* Comments */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": "comments",
  "application/vnd.ms-excel.comments": "comments",
  "application/vnd.ms-excel.threadedcomments+xml": "threadedcomments",
  "application/vnd.ms-excel.person+xml": "people",
  /* Metadata (Stock/Geography and Dynamic Array) */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml": "metadata",
  "application/vnd.ms-excel.sheetMetadata": "metadata",
  /* PivotTable */
  "application/vnd.ms-excel.pivotTable": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml": "TODO",
  /* Chart Objects */
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "TODO",
  /* Chart Colors */
  "application/vnd.ms-office.chartcolorstyle+xml": "TODO",
  /* Chart Style */
  "application/vnd.ms-office.chartstyle+xml": "TODO",
  /* Chart Advanced */
  "application/vnd.ms-office.chartex+xml": "TODO",
  /* Calculation Chain */
  "application/vnd.ms-excel.calcChain": "calcchains",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml": "calcchains",
  /* Printer Settings */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings": "TODO",
  /* ActiveX */
  "application/vnd.ms-office.activeX": "TODO",
  "application/vnd.ms-office.activeX+xml": "TODO",
  /* Custom Toolbars */
  "application/vnd.ms-excel.attachedToolbars": "TODO",
  /* External Data Connections */
  "application/vnd.ms-excel.connections": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": "TODO",
  /* External Links */
  "application/vnd.ms-excel.externalLink": "links",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml": "links",
  /* PivotCache */
  "application/vnd.ms-excel.pivotCacheDefinition": "TODO",
  "application/vnd.ms-excel.pivotCacheRecords": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml": "TODO",
  /* Query Table */
  "application/vnd.ms-excel.queryTable": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml": "TODO",
  /* Shared Workbook */
  "application/vnd.ms-excel.userNames": "TODO",
  "application/vnd.ms-excel.revisionHeaders": "TODO",
  "application/vnd.ms-excel.revisionLog": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml": "TODO",
  /* Single Cell Table */
  "application/vnd.ms-excel.tableSingleCells": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml": "TODO",
  /* Slicer */
  "application/vnd.ms-excel.slicer": "TODO",
  "application/vnd.ms-excel.slicerCache": "TODO",
  "application/vnd.ms-excel.slicer+xml": "TODO",
  "application/vnd.ms-excel.slicerCache+xml": "TODO",
  /* Sort Map */
  "application/vnd.ms-excel.wsSortMap": "TODO",
  /* Table */
  "application/vnd.ms-excel.table": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": "TODO",
  /* Themes */
  "application/vnd.openxmlformats-officedocument.theme+xml": "themes",
  /* Theme Override */
  "application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO",
  /* Timeline */
  "application/vnd.ms-excel.Timeline+xml": "TODO",
  /* verify */
  "application/vnd.ms-excel.TimelineCache+xml": "TODO",
  /* verify */
  /* VBA */
  "application/vnd.ms-office.vbaProject": "vba",
  "application/vnd.ms-office.vbaProjectSignature": "TODO",
  /* Volatile Dependencies */
  "application/vnd.ms-office.volatileDependencies": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml": "TODO",
  /* Control Properties */
  "application/vnd.ms-excel.controlproperties+xml": "TODO",
  /* Data Model */
  "application/vnd.openxmlformats-officedocument.model+data": "TODO",
  /* Survey */
  "application/vnd.ms-excel.Survey+xml": "TODO",
  /* Drawing */
  "application/vnd.openxmlformats-officedocument.drawing+xml": "drawings",
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml": "TODO",
  /* VML */
  "application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO",
  "application/vnd.openxmlformats-package.relationships+xml": "rels",
  "application/vnd.openxmlformats-officedocument.oleObject": "TODO",
  /* Image */
  "image/png": "TODO",
  sheet: "js"
}, zn = {
  workbooks: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
    xlsm: "application/vnd.ms-excel.sheet.macroEnabled.main+xml",
    xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.main",
    xlam: "application/vnd.ms-excel.addin.macroEnabled.main+xml",
    xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml"
  },
  strs: {
    /* Shared Strings */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
    xlsb: "application/vnd.ms-excel.sharedStrings"
  },
  comments: {
    /* Comments */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",
    xlsb: "application/vnd.ms-excel.comments"
  },
  sheets: {
    /* Worksheet */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
    xlsb: "application/vnd.ms-excel.worksheet"
  },
  charts: {
    /* Chartsheet */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",
    xlsb: "application/vnd.ms-excel.chartsheet"
  },
  dialogs: {
    /* Dialogsheet */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",
    xlsb: "application/vnd.ms-excel.dialogsheet"
  },
  macros: {
    /* Macrosheet (Excel 4.0 Macros) */
    xlsx: "application/vnd.ms-excel.macrosheet+xml",
    xlsb: "application/vnd.ms-excel.macrosheet"
  },
  metadata: {
    /* Metadata (Stock/Geography and Dynamic Array) */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml",
    xlsb: "application/vnd.ms-excel.sheetMetadata"
  },
  styles: {
    /* Styles */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
    xlsb: "application/vnd.ms-excel.styles"
  }
};
function vo() {
  return {
    workbooks: [],
    sheets: [],
    charts: [],
    dialogs: [],
    macros: [],
    rels: [],
    strs: [],
    comments: [],
    threadedcomments: [],
    links: [],
    coreprops: [],
    extprops: [],
    custprops: [],
    themes: [],
    styles: [],
    calcchains: [],
    vba: [],
    drawings: [],
    metadata: [],
    people: [],
    TODO: [],
    xmlns: ""
  };
}
function _o(e, r) {
  var t = Nc(Eh), n = [], a;
  n[n.length] = Ge, n[n.length] = J("Types", null, {
    xmlns: ze.CT,
    "xmlns:xsd": ze.xsd,
    "xmlns:xsi": ze.xsi
  }), n = n.concat([
    ["xml", "application/xml"],
    ["bin", "application/vnd.ms-excel.sheet.binary.macroEnabled.main"],
    ["vml", "application/vnd.openxmlformats-officedocument.vmlDrawing"],
    ["data", "application/vnd.openxmlformats-officedocument.model+data"],
    /* from test files */
    ["bmp", "image/bmp"],
    ["png", "image/png"],
    ["gif", "image/gif"],
    ["emf", "image/x-emf"],
    ["wmf", "image/x-wmf"],
    ["jpg", "image/jpeg"],
    ["jpeg", "image/jpeg"],
    ["tif", "image/tiff"],
    ["tiff", "image/tiff"],
    ["pdf", "application/pdf"],
    ["rels", "application/vnd.openxmlformats-package.relationships+xml"]
  ].map(function(l) {
    return J("Default", null, { Extension: l[0], ContentType: l[1] });
  }));
  var i = function(l) {
    e[l] && e[l].length > 0 && (a = e[l][0], n[n.length] = J("Override", null, {
      PartName: (a[0] == "/" ? "" : "/") + a,
      ContentType: zn[l][r.bookType] || zn[l].xlsx
    }));
  }, s = function(l) {
    (e[l] || []).forEach(function(f) {
      n[n.length] = J("Override", null, {
        PartName: (f[0] == "/" ? "" : "/") + f,
        ContentType: zn[l][r.bookType] || zn[l].xlsx
      });
    });
  }, o = function(l) {
    (e[l] || []).forEach(function(f) {
      n[n.length] = J("Override", null, {
        PartName: (f[0] == "/" ? "" : "/") + f,
        ContentType: t[l][0]
      });
    });
  };
  return i("workbooks"), s("sheets"), s("charts"), o("themes"), ["strs", "styles"].forEach(i), ["coreprops", "extprops", "custprops"].forEach(o), o("vba"), o("comments"), o("threadedcomments"), o("drawings"), s("metadata"), o("people"), n.length > 2 && (n[n.length] = "</Types>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var ve = {
  WB: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
  HLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
  VML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
  XPATH: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath",
  XMISS: "http://schemas.microsoft.com/office/2006/relationships/xlExternalLinkPath/xlPathMissing",
  CMNT: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",
  CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",
  EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",
  CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties",
  SST: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",
  STY: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
  THEME: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
  WS: [
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
    "http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"
  ],
  DRAW: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",
  XLMETA: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sheetMetadata",
  TCMNT: "http://schemas.microsoft.com/office/2017/10/relationships/threadedComment",
  PEOPLE: "http://schemas.microsoft.com/office/2017/10/relationships/person",
  VBA: "http://schemas.microsoft.com/office/2006/relationships/vbaProject"
};
function go(e) {
  var r = e.lastIndexOf("/");
  return e.slice(0, r + 1) + "_rels/" + e.slice(r + 1) + ".rels";
}
function Ur(e) {
  var r = [Ge, J("Relationships", null, {
    //'xmlns:ns0': XMLNS.RELS,
    xmlns: ze.RELS
  })];
  return et(e["!id"]).forEach(function(t) {
    r[r.length] = J("Relationship", null, e["!id"][t]);
  }), r.length > 2 && (r[r.length] = "</Relationships>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Se(e, r, t, n, a, i) {
  if (a || (a = {}), e["!id"] || (e["!id"] = {}), e["!idx"] || (e["!idx"] = 1), r < 0) for (r = e["!idx"]; e["!id"]["rId" + r]; ++r)
    ;
  if (e["!idx"] = r + 1, a.Id = "rId" + r, a.Type = n, a.Target = t, [ve.HLINK, ve.XPATH, ve.XMISS].indexOf(a.Type) > -1 && (a.TargetMode = "External"), e["!id"][a.Id]) throw new Error("Cannot rewrite rId " + r);
  return e["!id"][a.Id] = a, e[("/" + a.Target).replace("//", "/")] = a, r;
}
function Sh(e) {
  var r = [Ge];
  r.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`), r.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);
  for (var t = 0; t < e.length; ++t) r.push('  <manifest:file-entry manifest:full-path="' + e[t][0] + '" manifest:media-type="' + e[t][1] + `"/>
`);
  return r.push("</manifest:manifest>"), r.join("");
}
function b0(e, r, t) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (t || "odf") + "#" + r + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function yh(e, r) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + r + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function Fh(e) {
  var r = [Ge];
  r.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
  for (var t = 0; t != e.length; ++t)
    r.push(b0(e[t][0], e[t][1])), r.push(yh("", e[t][0]));
  return r.push(b0("", "Document", "pkg")), r.push("</rdf:RDF>"), r.join("");
}
function wo() {
  return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + Qn.version + "</meta:generator></office:meta></office:document-meta>";
}
var wr = [
  ["cp:category", "Category"],
  ["cp:contentStatus", "ContentStatus"],
  ["cp:keywords", "Keywords"],
  ["cp:lastModifiedBy", "LastAuthor"],
  ["cp:lastPrinted", "LastPrinted"],
  ["cp:revision", "RevNumber"],
  ["cp:version", "Version"],
  ["dc:creator", "Author"],
  ["dc:description", "Comments"],
  ["dc:identifier", "Identifier"],
  ["dc:language", "Language"],
  ["dc:subject", "Subject"],
  ["dc:title", "Title"],
  ["dcterms:created", "CreatedDate", "date"],
  ["dcterms:modified", "ModifiedDate", "date"]
];
function Pa(e, r, t, n, a) {
  a[e] != null || r == null || r === "" || (a[e] = r, r = ye(r), n[n.length] = t ? J(e, r, t) : Ze(e, r));
}
function To(e, r) {
  var t = r || {}, n = [Ge, J("cp:coreProperties", null, {
    //'xmlns': XMLNS.CORE_PROPS,
    "xmlns:cp": ze.CORE_PROPS,
    "xmlns:dc": ze.dc,
    "xmlns:dcterms": ze.dcterms,
    "xmlns:dcmitype": ze.dcmitype,
    "xmlns:xsi": ze.xsi
  })], a = {};
  if (!e && !t.Props) return n.join("");
  e && (e.CreatedDate != null && Pa("dcterms:created", typeof e.CreatedDate == "string" ? e.CreatedDate : li(e.CreatedDate, t.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a), e.ModifiedDate != null && Pa("dcterms:modified", typeof e.ModifiedDate == "string" ? e.ModifiedDate : li(e.ModifiedDate, t.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a));
  for (var i = 0; i != wr.length; ++i) {
    var s = wr[i], o = t.Props && t.Props[s[1]] != null ? t.Props[s[1]] : e ? e[s[1]] : null;
    o === !0 ? o = "1" : o === !1 ? o = "0" : typeof o == "number" && (o = String(o)), o != null && Pa(s[0], o, null, n, a);
  }
  return n.length > 2 && (n[n.length] = "</cp:coreProperties>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var Wr = [
  ["Application", "Application", "string"],
  ["AppVersion", "AppVersion", "string"],
  ["Company", "Company", "string"],
  ["DocSecurity", "DocSecurity", "string"],
  ["Manager", "Manager", "string"],
  ["HyperlinksChanged", "HyperlinksChanged", "bool"],
  ["SharedDoc", "SharedDoc", "bool"],
  ["LinksUpToDate", "LinksUpToDate", "bool"],
  ["ScaleCrop", "ScaleCrop", "bool"],
  ["HeadingPairs", "HeadingPairs", "raw"],
  ["TitlesOfParts", "TitlesOfParts", "raw"]
], Eo = [
  "Worksheets",
  "SheetNames",
  "NamedRanges",
  "DefinedNames",
  "Chartsheets",
  "ChartNames"
];
function So(e) {
  var r = [], t = J;
  return e || (e = {}), e.Application = "SheetJS", r[r.length] = Ge, r[r.length] = J("Properties", null, {
    xmlns: ze.EXT_PROPS,
    "xmlns:vt": ze.vt
  }), Wr.forEach(function(n) {
    if (e[n[1]] !== void 0) {
      var a;
      switch (n[2]) {
        case "string":
          a = ye(String(e[n[1]]));
          break;
        case "bool":
          a = e[n[1]] ? "true" : "false";
          break;
      }
      a !== void 0 && (r[r.length] = t(n[0], a));
    }
  }), r[r.length] = t("HeadingPairs", t("vt:vector", t("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + t("vt:variant", t("vt:i4", String(e.Worksheets))), { size: 2, baseType: "variant" })), r[r.length] = t("TitlesOfParts", t("vt:vector", e.SheetNames.map(function(n) {
    return "<vt:lpstr>" + ye(n) + "</vt:lpstr>";
  }).join(""), { size: e.Worksheets, baseType: "lpstr" })), r.length > 2 && (r[r.length] = "</Properties>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function yo(e) {
  var r = [Ge, J("Properties", null, {
    xmlns: ze.CUST_PROPS,
    "xmlns:vt": ze.vt
  })];
  if (!e) return r.join("");
  var t = 1;
  return et(e).forEach(function(a) {
    ++t, r[r.length] = J("property", $c(e[a]), {
      fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: t,
      name: ye(a)
    });
  }), r.length > 2 && (r[r.length] = "</Properties>", r[1] = r[1].replace("/>", ">")), r.join("");
}
var U0 = {
  Title: "Title",
  Subject: "Subject",
  Author: "Author",
  Keywords: "Keywords",
  Comments: "Description",
  LastAuthor: "LastAuthor",
  RevNumber: "Revision",
  Application: "AppName",
  /* TotalTime: 'TotalTime', */
  LastPrinted: "LastPrinted",
  CreatedDate: "Created",
  ModifiedDate: "LastSaved",
  /* Pages */
  /* Words */
  /* Characters */
  Category: "Category",
  /* PresentationFormat */
  Manager: "Manager",
  Company: "Company",
  /* Guid */
  /* HyperlinkBase */
  /* Bytes */
  /* Lines */
  /* Paragraphs */
  /* CharactersWithSpaces */
  AppVersion: "Version",
  ContentStatus: "ContentStatus",
  /* NOTE: missing from schema */
  Identifier: "Identifier",
  /* NOTE: missing from schema */
  Language: "Language"
  /* NOTE: missing from schema */
};
function Ch(e, r) {
  var t = [];
  return et(U0).map(function(n) {
    for (var a = 0; a < wr.length; ++a) if (wr[a][1] == n) return wr[a];
    for (a = 0; a < Wr.length; ++a) if (Wr[a][1] == n) return Wr[a];
    throw n;
  }).forEach(function(n) {
    if (e[n[1]] != null) {
      var a = r && r.Props && r.Props[n[1]] != null ? r.Props[n[1]] : e[n[1]];
      switch (n[2]) {
        case "date":
          a = new Date(a).toISOString().replace(/\.\d*Z/, "Z");
          break;
      }
      typeof a == "number" ? a = String(a) : a === !0 || a === !1 ? a = a ? "1" : "0" : a instanceof Date && (a = new Date(a).toISOString().replace(/\.\d*Z/, "")), t.push(Ze(U0[n[1]] || n[1], a));
    }
  }), J("DocumentProperties", t.join(""), { xmlns: vt.o });
}
function Ah(e, r) {
  var t = ["Worksheets", "SheetNames"], n = "CustomDocumentProperties", a = [];
  return e && et(e).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(e, i)) {
      for (var s = 0; s < wr.length; ++s) if (i == wr[s][1]) return;
      for (s = 0; s < Wr.length; ++s) if (i == Wr[s][1]) return;
      for (s = 0; s < t.length; ++s) if (i == t[s]) return;
      var o = e[i], l = "string";
      typeof o == "number" ? (l = "float", o = String(o)) : o === !0 || o === !1 ? (l = "boolean", o = o ? "1" : "0") : o = String(o), a.push(J(C0(i), o, { "dt:dt": l }));
    }
  }), r && et(r).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(r, i) && !(e && Object.prototype.hasOwnProperty.call(e, i))) {
      var s = r[i], o = "string";
      typeof s == "number" ? (o = "float", s = String(s)) : s === !0 || s === !1 ? (o = "boolean", s = s ? "1" : "0") : s instanceof Date ? (o = "dateTime.tz", s = s.toISOString()) : s = String(s), a.push(J(C0(i), s, { "dt:dt": o }));
    }
  }), "<" + n + ' xmlns="' + vt.o + '">' + a.join("") + "</" + n + ">";
}
function kh(e) {
  var r = typeof e == "string" ? new Date(Date.parse(e)) : e, t = r.getTime() / 1e3 + 11644473600, n = t % Math.pow(2, 32), a = (t - n) / Math.pow(2, 32);
  n *= 1e7, a *= 1e7;
  var i = n / Math.pow(2, 32) | 0;
  i > 0 && (n = n % Math.pow(2, 32), a += i);
  var s = B(8);
  return s.write_shift(4, n), s.write_shift(4, a), s;
}
function W0(e, r) {
  var t = B(4), n = B(4);
  switch (t.write_shift(4, e == 80 ? 31 : e), e) {
    case 3:
      n.write_shift(-4, r);
      break;
    case 5:
      n = B(8), n.write_shift(8, r, "f");
      break;
    case 11:
      n.write_shift(4, r ? 1 : 0);
      break;
    case 64:
      n = kh(r);
      break;
    case 31:
    case 80:
      for (n = B(4 + 2 * (r.length + 1) + (r.length % 2 ? 0 : 2)), n.write_shift(4, r.length + 1), n.write_shift(0, r, "dbcs"); n.l != n.length; ) n.write_shift(1, 0);
      break;
    default:
      throw new Error("TypedPropertyValue unrecognized type " + e + " " + r);
  }
  return Qe([t, n]);
}
var Fo = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];
function Oh(e) {
  switch (typeof e) {
    case "boolean":
      return 11;
    case "number":
      return (e | 0) == e ? 3 : 5;
    case "string":
      return 31;
    case "object":
      if (e instanceof Date) return 64;
      break;
  }
  return -1;
}
function H0(e, r, t) {
  var n = B(8), a = [], i = [], s = 8, o = 0, l = B(8), f = B(8);
  if (l.write_shift(4, 2), l.write_shift(4, 1200), f.write_shift(4, 1), i.push(l), a.push(f), s += 8 + l.length, !r) {
    f = B(8), f.write_shift(4, 0), a.unshift(f);
    var c = [B(4)];
    for (c[0].write_shift(4, e.length), o = 0; o < e.length; ++o) {
      var d = e[o][0];
      for (l = B(8 + 2 * (d.length + 1) + (d.length % 2 ? 0 : 2)), l.write_shift(4, o + 2), l.write_shift(4, d.length + 1), l.write_shift(0, d, "dbcs"); l.l != l.length; ) l.write_shift(1, 0);
      c.push(l);
    }
    l = Qe(c), i.unshift(l), s += 8 + l.length;
  }
  for (o = 0; o < e.length; ++o)
    if (!(r && !r[e[o][0]]) && !(Fo.indexOf(e[o][0]) > -1 || Eo.indexOf(e[o][0]) > -1) && e[o][1] != null) {
      var h = e[o][1], u = 0;
      if (r) {
        u = +r[e[o][0]];
        var v = t[u];
        if (v.p == "version" && typeof h == "string") {
          var x = h.split(".");
          h = (+x[0] << 16) + (+x[1] || 0);
        }
        l = W0(v.t, h);
      } else {
        var g = Oh(h);
        g == -1 && (g = 31, h = String(h)), l = W0(g, h);
      }
      i.push(l), f = B(8), f.write_shift(4, r ? u : 2 + o), a.push(f), s += 8 + l.length;
    }
  var C = 8 * (i.length + 1);
  for (o = 0; o < i.length; ++o)
    a[o].write_shift(4, C), C += i[o].length;
  return n.write_shift(4, s), n.write_shift(4, i.length), Qe([n].concat(a).concat(i));
}
function G0(e, r, t, n, a, i) {
  var s = B(a ? 68 : 48), o = [s];
  s.write_shift(2, 65534), s.write_shift(2, 0), s.write_shift(4, 842412599), s.write_shift(16, Ae.utils.consts.HEADER_CLSID, "hex"), s.write_shift(4, a ? 2 : 1), s.write_shift(16, r, "hex"), s.write_shift(4, a ? 68 : 48);
  var l = H0(e, t, n);
  if (o.push(l), a) {
    var f = H0(a, null, null);
    s.write_shift(16, i, "hex"), s.write_shift(4, 68 + l.length), o.push(f);
  }
  return Qe(o);
}
function Rh(e, r) {
  r || (r = B(e));
  for (var t = 0; t < e; ++t) r.write_shift(1, 0);
  return r;
}
function Ih(e, r) {
  return e.read_shift(r) === 1;
}
function ft(e, r) {
  return r || (r = B(2)), r.write_shift(2, +!!e), r;
}
function Co(e) {
  return e.read_shift(2, "u");
}
function yt(e, r) {
  return r || (r = B(2)), r.write_shift(2, e), r;
}
function Ao(e, r, t) {
  return t || (t = B(2)), t.write_shift(1, r == "e" ? +e : +!!e), t.write_shift(1, r == "e" ? 1 : 0), t;
}
function ko(e, r, t) {
  var n = e.read_shift(t && t.biff >= 12 ? 2 : 1), a = "sbcs-cont";
  if (t && t.biff >= 8, !t || t.biff == 8) {
    var i = e.read_shift(1);
    i && (a = "dbcs-cont");
  } else t.biff == 12 && (a = "wstr");
  t.biff >= 2 && t.biff <= 5 && (a = "cpstr");
  var s = n ? e.read_shift(n, a) : "";
  return s;
}
function Nh(e) {
  var r = e.t || "", t = B(3);
  t.write_shift(2, r.length), t.write_shift(1, 1);
  var n = B(2 * r.length);
  n.write_shift(2 * r.length, r, "utf16le");
  var a = [t, n];
  return Qe(a);
}
function Dh(e, r, t) {
  var n;
  if (t) {
    if (t.biff >= 2 && t.biff <= 5) return e.read_shift(r, "cpstr");
    if (t.biff >= 12) return e.read_shift(r, "dbcs-cont");
  }
  var a = e.read_shift(1);
  return a === 0 ? n = e.read_shift(r, "sbcs-cont") : n = e.read_shift(r, "dbcs-cont"), n;
}
function Ph(e, r, t) {
  var n = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return n === 0 ? (e.l++, "") : Dh(e, n, t);
}
function Mh(e, r, t) {
  if (t.biff > 5) return Ph(e, r, t);
  var n = e.read_shift(1);
  return n === 0 ? (e.l++, "") : e.read_shift(n, t.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function Oo(e, r, t) {
  return t || (t = B(3 + 2 * e.length)), t.write_shift(2, e.length), t.write_shift(1, 1), t.write_shift(31, e, "utf16le"), t;
}
function $0(e, r) {
  r || (r = B(6 + e.length * 2)), r.write_shift(4, 1 + e.length);
  for (var t = 0; t < e.length; ++t) r.write_shift(2, e.charCodeAt(t));
  return r.write_shift(2, 0), r;
}
function Lh(e) {
  var r = B(512), t = 0, n = e.Target;
  n.slice(0, 7) == "file://" && (n = n.slice(7));
  var a = n.indexOf("#"), i = a > -1 ? 31 : 23;
  switch (n.charAt(0)) {
    case "#":
      i = 28;
      break;
    case ".":
      i &= -3;
      break;
  }
  r.write_shift(4, 2), r.write_shift(4, i);
  var s = [8, 6815827, 6619237, 4849780, 83];
  for (t = 0; t < s.length; ++t) r.write_shift(4, s[t]);
  if (i == 28)
    n = n.slice(1), $0(n, r);
  else if (i & 2) {
    for (s = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), t = 0; t < s.length; ++t) r.write_shift(1, parseInt(s[t], 16));
    var o = a > -1 ? n.slice(0, a) : n;
    for (r.write_shift(4, 2 * (o.length + 1)), t = 0; t < o.length; ++t) r.write_shift(2, o.charCodeAt(t));
    r.write_shift(2, 0), i & 8 && $0(a > -1 ? n.slice(a + 1) : "", r);
  } else {
    for (s = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), t = 0; t < s.length; ++t) r.write_shift(1, parseInt(s[t], 16));
    for (var l = 0; n.slice(l * 3, l * 3 + 3) == "../" || n.slice(l * 3, l * 3 + 3) == "..\\"; ) ++l;
    for (r.write_shift(2, l), r.write_shift(4, n.length - 3 * l + 1), t = 0; t < n.length - 3 * l; ++t) r.write_shift(1, n.charCodeAt(t + 3 * l) & 255);
    for (r.write_shift(1, 0), r.write_shift(2, 65535), r.write_shift(2, 57005), t = 0; t < 6; ++t) r.write_shift(4, 0);
  }
  return r.slice(0, r.l);
}
function Sr(e, r, t, n) {
  return n || (n = B(6)), n.write_shift(2, e), n.write_shift(2, r), n.write_shift(2, t || 0), n;
}
function Bh(e, r, t) {
  var n = t.biff > 8 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n, "i"), s = e.read_shift(n, "i");
  return [a, i, s];
}
function bh(e) {
  var r = e.read_shift(2), t = e.read_shift(2), n = e.read_shift(2), a = e.read_shift(2);
  return { s: { c: n, r }, e: { c: a, r: t } };
}
function Ro(e, r) {
  return r || (r = B(8)), r.write_shift(2, e.s.r), r.write_shift(2, e.e.r), r.write_shift(2, e.s.c), r.write_shift(2, e.e.c), r;
}
function Ii(e, r, t) {
  var n = 1536, a = 16;
  switch (t.bookType) {
    case "biff8":
      break;
    case "biff5":
      n = 1280, a = 8;
      break;
    case "biff4":
      n = 4, a = 6;
      break;
    case "biff3":
      n = 3, a = 6;
      break;
    case "biff2":
      n = 2, a = 4;
      break;
    case "xla":
      break;
    default:
      throw new Error("unsupported BIFF version");
  }
  var i = B(a);
  return i.write_shift(2, n), i.write_shift(2, r), a > 4 && i.write_shift(2, 29282), a > 6 && i.write_shift(2, 1997), a > 8 && (i.write_shift(2, 49161), i.write_shift(2, 1), i.write_shift(2, 1798), i.write_shift(2, 0)), i;
}
function Uh(e, r) {
  var t = !r || r.biff == 8, n = B(t ? 112 : 54);
  for (n.write_shift(r.biff == 8 ? 2 : 1, 7), t && n.write_shift(1, 0), n.write_shift(4, 859007059), n.write_shift(4, 5458548 | (t ? 0 : 536870912)); n.l < n.length; ) n.write_shift(1, t ? 0 : 32);
  return n;
}
function Wh(e, r) {
  var t = !r || r.biff >= 8 ? 2 : 1, n = B(8 + t * e.name.length);
  n.write_shift(4, e.pos), n.write_shift(1, e.hs || 0), n.write_shift(1, e.dt), n.write_shift(1, e.name.length), r.biff >= 8 && n.write_shift(1, 1), n.write_shift(t * e.name.length, e.name, r.biff < 8 ? "sbcs" : "utf16le");
  var a = n.slice(0, n.l);
  return a.l = n.l, a;
}
function Hh(e, r) {
  var t = B(8);
  t.write_shift(4, e.Count), t.write_shift(4, e.Unique);
  for (var n = [], a = 0; a < e.length; ++a) n[a] = Nh(e[a]);
  var i = Qe([t].concat(n));
  return i.parts = [t.length].concat(n.map(function(s) {
    return s.length;
  })), i;
}
function Gh() {
  var e = B(18);
  return e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 29280), e.write_shift(2, 17600), e.write_shift(2, 56), e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 1), e.write_shift(2, 500), e;
}
function $h(e) {
  var r = B(18), t = 1718;
  return e && e.RTL && (t |= 64), r.write_shift(2, t), r.write_shift(4, 0), r.write_shift(4, 64), r.write_shift(4, 0), r.write_shift(4, 0), r;
}
function Vh(e, r) {
  var t = e.name || "Arial", n = r && r.biff == 5, a = n ? 15 + t.length : 16 + 2 * t.length, i = B(a);
  return i.write_shift(2, e.sz * 20), i.write_shift(4, 0), i.write_shift(2, 400), i.write_shift(4, 0), i.write_shift(2, 0), i.write_shift(1, t.length), n || i.write_shift(1, 1), i.write_shift((n ? 1 : 2) * t.length, t, n ? "sbcs" : "utf16le"), i;
}
function zh(e, r, t, n) {
  var a = B(10);
  return Sr(e, r, n, a), a.write_shift(4, t), a;
}
function Xh(e, r, t, n, a) {
  var i = !a || a.biff == 8, s = B(8 + +i + (1 + i) * t.length);
  return Sr(e, r, n, s), s.write_shift(2, t.length), i && s.write_shift(1, 1), s.write_shift((1 + i) * t.length, t, i ? "utf16le" : "sbcs"), s;
}
function jh(e, r, t, n) {
  var a = t && t.biff == 5;
  n || (n = B(a ? 3 + r.length : 5 + 2 * r.length)), n.write_shift(2, e), n.write_shift(a ? 1 : 2, r.length), a || n.write_shift(1, 1), n.write_shift((a ? 1 : 2) * r.length, r, a ? "sbcs" : "utf16le");
  var i = n.length > n.l ? n.slice(0, n.l) : n;
  return i.l == null && (i.l = i.length), i;
}
function Yh(e, r) {
  var t = r.biff == 8 || !r.biff ? 4 : 2, n = B(2 * t + 6);
  return n.write_shift(t, e.s.r), n.write_shift(t, e.e.r + 1), n.write_shift(2, e.s.c), n.write_shift(2, e.e.c + 1), n.write_shift(2, 0), n;
}
function V0(e, r, t, n) {
  var a = t && t.biff == 5;
  n || (n = B(a ? 16 : 20)), n.write_shift(2, 0), e.style ? (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, 65524)) : (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, r << 4));
  var i = 0;
  return e.numFmtId > 0 && a && (i |= 1024), n.write_shift(4, i), n.write_shift(4, 0), a || n.write_shift(4, 0), n.write_shift(2, 0), n;
}
function Kh(e) {
  var r = B(8);
  return r.write_shift(4, 0), r.write_shift(2, 0), r.write_shift(2, 0), r;
}
function Jh(e, r, t, n, a, i) {
  var s = B(8);
  return Sr(e, r, n, s), Ao(t, i, s), s;
}
function Qh(e, r, t, n) {
  var a = B(14);
  return Sr(e, r, n, a), Er(t, a), a;
}
function Zh(e, r, t) {
  if (t.biff < 8) return qh(e, r, t);
  for (var n = [], a = e.l + r, i = e.read_shift(t.biff > 8 ? 4 : 2); i-- !== 0; ) n.push(Bh(e, t.biff > 8 ? 12 : 6, t));
  if (e.l != a) throw new Error("Bad ExternSheet: " + e.l + " != " + a);
  return n;
}
function qh(e, r, t) {
  e[e.l + 1] == 3 && e[e.l]++;
  var n = ko(e, r, t);
  return n.charCodeAt(0) == 3 ? n.slice(1) : n;
}
function eu(e) {
  var r = B(2 + e.length * 8);
  r.write_shift(2, e.length);
  for (var t = 0; t < e.length; ++t) Ro(e[t], r);
  return r;
}
function tu(e) {
  var r = B(24), t = Xe(e[0]);
  r.write_shift(2, t.r), r.write_shift(2, t.r), r.write_shift(2, t.c), r.write_shift(2, t.c);
  for (var n = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), a = 0; a < 16; ++a) r.write_shift(1, parseInt(n[a], 16));
  return Qe([r, Lh(e[1])]);
}
function ru(e) {
  var r = e[1].Tooltip, t = B(10 + 2 * (r.length + 1));
  t.write_shift(2, 2048);
  var n = Xe(e[0]);
  t.write_shift(2, n.r), t.write_shift(2, n.r), t.write_shift(2, n.c), t.write_shift(2, n.c);
  for (var a = 0; a < r.length; ++a) t.write_shift(2, r.charCodeAt(a));
  return t.write_shift(2, 0), t;
}
function nu(e) {
  return e || (e = B(4)), e.write_shift(2, 1), e.write_shift(2, 1), e;
}
function au(e, r, t) {
  if (!t.cellStyles) return Bt(e, r);
  var n = t && t.biff >= 12 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n), s = e.read_shift(n), o = e.read_shift(n), l = e.read_shift(2);
  n == 2 && (e.l += 2);
  var f = { s: a, e: i, w: s, ixfe: o, flags: l };
  return (t.biff >= 5 || !t.biff) && (f.level = l >> 8 & 7), f;
}
function iu(e, r) {
  var t = B(12);
  t.write_shift(2, r), t.write_shift(2, r), t.write_shift(2, e.width * 256), t.write_shift(2, 0);
  var n = 0;
  return e.hidden && (n |= 1), t.write_shift(1, n), n = e.level || 0, t.write_shift(1, n), t.write_shift(2, 0), t;
}
function su(e) {
  for (var r = B(2 * e), t = 0; t < e; ++t) r.write_shift(2, t + 1);
  return r;
}
function ou(e, r, t) {
  var n = B(15);
  return Pn(n, e, r), n.write_shift(8, t, "f"), n;
}
function fu(e, r, t) {
  var n = B(9);
  return Pn(n, e, r), n.write_shift(2, t), n;
}
var lu = /* @__PURE__ */ (function() {
  var e = {
    /* Code Pages Supported by Visual FoxPro */
    /*::[*/
    1: 437,
    /*::[*/
    2: 850,
    /*::[*/
    3: 1252,
    /*::[*/
    4: 1e4,
    /*::[*/
    100: 852,
    /*::[*/
    101: 866,
    /*::[*/
    102: 865,
    /*::[*/
    103: 861,
    /*::[*/
    104: 895,
    /*::[*/
    105: 620,
    /*::[*/
    106: 737,
    /*::[*/
    107: 857,
    /*::[*/
    120: 950,
    /*::[*/
    121: 949,
    /*::[*/
    122: 936,
    /*::[*/
    123: 932,
    /*::[*/
    124: 874,
    /*::[*/
    125: 1255,
    /*::[*/
    126: 1256,
    /*::[*/
    150: 10007,
    /*::[*/
    151: 10029,
    /*::[*/
    152: 10006,
    /*::[*/
    200: 1250,
    /*::[*/
    201: 1251,
    /*::[*/
    202: 1254,
    /*::[*/
    203: 1253,
    /* shapefile DBF extension */
    /*::[*/
    0: 20127,
    /*::[*/
    8: 865,
    /*::[*/
    9: 437,
    /*::[*/
    10: 850,
    /*::[*/
    11: 437,
    /*::[*/
    13: 437,
    /*::[*/
    14: 850,
    /*::[*/
    15: 437,
    /*::[*/
    16: 850,
    /*::[*/
    17: 437,
    /*::[*/
    18: 850,
    /*::[*/
    19: 932,
    /*::[*/
    20: 850,
    /*::[*/
    21: 437,
    /*::[*/
    22: 850,
    /*::[*/
    23: 865,
    /*::[*/
    24: 437,
    /*::[*/
    25: 437,
    /*::[*/
    26: 850,
    /*::[*/
    27: 437,
    /*::[*/
    28: 863,
    /*::[*/
    29: 850,
    /*::[*/
    31: 852,
    /*::[*/
    34: 852,
    /*::[*/
    35: 852,
    /*::[*/
    36: 860,
    /*::[*/
    37: 850,
    /*::[*/
    38: 866,
    /*::[*/
    55: 850,
    /*::[*/
    64: 852,
    /*::[*/
    77: 936,
    /*::[*/
    78: 949,
    /*::[*/
    79: 950,
    /*::[*/
    80: 874,
    /*::[*/
    87: 1252,
    /*::[*/
    88: 1252,
    /*::[*/
    89: 1252,
    /*::[*/
    108: 863,
    /*::[*/
    134: 737,
    /*::[*/
    135: 852,
    /*::[*/
    136: 857,
    /*::[*/
    204: 1257,
    /*::[*/
    255: 16969
  }, r = wi({
    /*::[*/
    1: 437,
    /*::[*/
    2: 850,
    /*::[*/
    3: 1252,
    /*::[*/
    4: 1e4,
    /*::[*/
    100: 852,
    /*::[*/
    101: 866,
    /*::[*/
    102: 865,
    /*::[*/
    103: 861,
    /*::[*/
    104: 895,
    /*::[*/
    105: 620,
    /*::[*/
    106: 737,
    /*::[*/
    107: 857,
    /*::[*/
    120: 950,
    /*::[*/
    121: 949,
    /*::[*/
    122: 936,
    /*::[*/
    123: 932,
    /*::[*/
    124: 874,
    /*::[*/
    125: 1255,
    /*::[*/
    126: 1256,
    /*::[*/
    150: 10007,
    /*::[*/
    151: 10029,
    /*::[*/
    152: 10006,
    /*::[*/
    200: 1250,
    /*::[*/
    201: 1251,
    /*::[*/
    202: 1254,
    /*::[*/
    203: 1253,
    /*::[*/
    0: 20127
  });
  function t(o, l) {
    var f = [], c = Tr(1);
    switch (l.type) {
      case "base64":
        c = Rt(zt(o));
        break;
      case "binary":
        c = Rt(o);
        break;
      case "buffer":
      case "array":
        c = o;
        break;
    }
    pt(c, 0);
    var d = c.read_shift(1), h = !!(d & 136), u = !1, v = !1;
    switch (d) {
      case 2:
        break;
      // dBASE II
      case 3:
        break;
      // dBASE III
      case 48:
        u = !0, h = !0;
        break;
      // VFP
      case 49:
        u = !0, h = !0;
        break;
      // VFP with autoincrement
      // 0x43 dBASE IV SQL table files
      // 0x63 dBASE IV SQL system files
      case 131:
        break;
      // dBASE III with memo
      case 139:
        break;
      // dBASE IV with memo
      case 140:
        v = !0;
        break;
      // dBASE Level 7 with memo
      // case 0xCB dBASE IV SQL table files with memo
      case 245:
        break;
      // FoxPro 2.x with memo
      // case 0xFB FoxBASE
      default:
        throw new Error("DBF Unsupported Version: " + d.toString(16));
    }
    var x = 0, g = 521;
    d == 2 && (x = c.read_shift(2)), c.l += 3, d != 2 && (x = c.read_shift(4)), x > 1048576 && (x = 1e6), d != 2 && (g = c.read_shift(2));
    var C = c.read_shift(2), O = l.codepage || 1252;
    d != 2 && (c.l += 16, c.read_shift(1), c[c.l] !== 0 && (O = e[c[c.l]]), c.l += 1, c.l += 2), v && (c.l += 36);
    for (var F = [], L = {}, Y = Math.min(c.length, d == 2 ? 521 : g - 10 - (u ? 264 : 0)), q = v ? 32 : 11; c.l < Y && c[c.l] != 13; )
      switch (L = {}, L.name = Zn.utils.decode(O, c.slice(c.l, c.l + q)).replace(/[\u0000\r\n].*$/g, ""), c.l += q, L.type = String.fromCharCode(c.read_shift(1)), d != 2 && !v && (L.offset = c.read_shift(4)), L.len = c.read_shift(1), d == 2 && (L.offset = c.read_shift(2)), L.dec = c.read_shift(1), L.name.length && F.push(L), d != 2 && (c.l += v ? 13 : 14), L.type) {
        case "B":
          (!u || L.len != 8) && l.WTF && console.log("Skipping " + L.name + ":" + L.type);
          break;
        case "G":
        // General (FoxPro and dBASE L7)
        case "P":
          l.WTF && console.log("Skipping " + L.name + ":" + L.type);
          break;
        case "+":
        // Autoincrement (dBASE L7 only)
        case "0":
        // _NullFlags (VFP only)
        case "@":
        // Timestamp (dBASE L7 only)
        case "C":
        // Character (dBASE II)
        case "D":
        // Date (dBASE III)
        case "F":
        // Float (dBASE IV)
        case "I":
        // Long (VFP and dBASE L7)
        case "L":
        // Logical (dBASE II)
        case "M":
        // Memo (dBASE III)
        case "N":
        // Number (dBASE II)
        case "O":
        // Double (dBASE L7 only)
        case "T":
        // Datetime (VFP only)
        case "Y":
          break;
        default:
          throw new Error("Unknown Field Type: " + L.type);
      }
    if (c[c.l] !== 13 && (c.l = g - 1), c.read_shift(1) !== 13) throw new Error("DBF Terminator not found " + c.l + " " + c[c.l]);
    c.l = g;
    var R = 0, U = 0;
    for (f[0] = [], U = 0; U != F.length; ++U) f[0][U] = F[U].name;
    for (; x-- > 0; ) {
      if (c[c.l] === 42) {
        c.l += C;
        continue;
      }
      for (++c.l, f[++R] = [], U = 0, U = 0; U != F.length; ++U) {
        var k = c.slice(c.l, c.l + F[U].len);
        c.l += F[U].len, pt(k, 0);
        var W = Zn.utils.decode(O, k);
        switch (F[U].type) {
          case "C":
            W.trim().length && (f[R][U] = W.replace(/\s+$/, ""));
            break;
          case "D":
            W.length === 8 ? f[R][U] = new Date(+W.slice(0, 4), +W.slice(4, 6) - 1, +W.slice(6, 8)) : f[R][U] = W;
            break;
          case "F":
            f[R][U] = parseFloat(W.trim());
            break;
          case "+":
          case "I":
            f[R][U] = v ? k.read_shift(-4, "i") ^ 2147483648 : k.read_shift(4, "i");
            break;
          case "L":
            switch (W.trim().toUpperCase()) {
              case "Y":
              case "T":
                f[R][U] = !0;
                break;
              case "N":
              case "F":
                f[R][U] = !1;
                break;
              case "":
              case "?":
                break;
              default:
                throw new Error("DBF Unrecognized L:|" + W + "|");
            }
            break;
          case "M":
            if (!h) throw new Error("DBF Unexpected MEMO for type " + d.toString(16));
            f[R][U] = "##MEMO##" + (v ? parseInt(W.trim(), 10) : k.read_shift(4));
            break;
          case "N":
            W = W.replace(/\u0000/g, "").trim(), W && W != "." && (f[R][U] = +W || 0);
            break;
          case "@":
            f[R][U] = new Date(k.read_shift(-8, "f") - 621356832e5);
            break;
          case "T":
            f[R][U] = new Date((k.read_shift(4) - 2440588) * 864e5 + k.read_shift(4));
            break;
          case "Y":
            f[R][U] = k.read_shift(4, "i") / 1e4 + k.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
            break;
          case "O":
            f[R][U] = -k.read_shift(-8, "f");
            break;
          case "B":
            if (u && F[U].len == 8) {
              f[R][U] = k.read_shift(8, "f");
              break;
            }
          /* falls through */
          case "G":
          case "P":
            k.l += F[U].len;
            break;
          case "0":
            if (F[U].name === "_NullFlags") break;
          /* falls through */
          default:
            throw new Error("DBF Unsupported data type " + F[U].type);
        }
      }
    }
    if (d != 2 && c.l < c.length && c[c.l++] != 26) throw new Error("DBF EOF Marker missing " + (c.l - 1) + " of " + c.length + " " + c[c.l - 1].toString(16));
    return l && l.sheetRows && (f = f.slice(0, l.sheetRows)), l.DBF = F, f;
  }
  function n(o, l) {
    var f = l || {};
    f.dateNF || (f.dateNF = "yyyymmdd");
    var c = Qr(t(o, f), f);
    return c["!cols"] = f.DBF.map(function(d) {
      return {
        wch: d.len,
        DBF: d
      };
    }), delete f.DBF, c;
  }
  function a(o, l) {
    try {
      return yr(n(o, l), l);
    } catch (f) {
      if (l && l.WTF) throw f;
    }
    return { SheetNames: [], Sheets: {} };
  }
  var i = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
  function s(o, l) {
    var f = l || {};
    if (+f.codepage >= 0 && wn(+f.codepage), f.type == "string") throw new Error("Cannot write DBF to JS string");
    var c = ht(), d = ha(o, { header: 1, raw: !0, cellDates: !0 }), h = d[0], u = d.slice(1), v = o["!cols"] || [], x = 0, g = 0, C = 0, O = 1;
    for (x = 0; x < h.length; ++x) {
      if (((v[x] || {}).DBF || {}).name) {
        h[x] = v[x].DBF.name, ++C;
        continue;
      }
      if (h[x] != null) {
        if (++C, typeof h[x] == "number" && (h[x] = h[x].toString(10)), typeof h[x] != "string") throw new Error("DBF Invalid column name " + h[x] + " |" + typeof h[x] + "|");
        if (h.indexOf(h[x]) !== x) {
          for (g = 0; g < 1024; ++g)
            if (h.indexOf(h[x] + "_" + g) == -1) {
              h[x] += "_" + g;
              break;
            }
        }
      }
    }
    var F = Ne(o["!ref"]), L = [], Y = [], q = [];
    for (x = 0; x <= F.e.c - F.s.c; ++x) {
      var R = "", U = "", k = 0, W = [];
      for (g = 0; g < u.length; ++g)
        u[g][x] != null && W.push(u[g][x]);
      if (W.length == 0 || h[x] == null) {
        L[x] = "?";
        continue;
      }
      for (g = 0; g < W.length; ++g) {
        switch (typeof W[g]) {
          /* TODO: check if L2 compat is desired */
          case "number":
            U = "B";
            break;
          case "string":
            U = "C";
            break;
          case "boolean":
            U = "L";
            break;
          case "object":
            U = W[g] instanceof Date ? "D" : "C";
            break;
          default:
            U = "C";
        }
        k = Math.max(k, String(W[g]).length), R = R && R != U ? "C" : U;
      }
      k > 250 && (k = 250), U = ((v[x] || {}).DBF || {}).type, U == "C" && v[x].DBF.len > k && (k = v[x].DBF.len), R == "B" && U == "N" && (R = "N", q[x] = v[x].DBF.dec, k = v[x].DBF.len), Y[x] = R == "C" || U == "N" ? k : i[R] || 0, O += Y[x], L[x] = R;
    }
    var H = c.next(32);
    for (H.write_shift(4, 318902576), H.write_shift(4, u.length), H.write_shift(2, 296 + 32 * C), H.write_shift(2, O), x = 0; x < 4; ++x) H.write_shift(4, 0);
    for (H.write_shift(4, 0 | (+r[
      /*::String(*/
      Is
      /*::)*/
    ] || 3) << 8), x = 0, g = 0; x < h.length; ++x)
      if (h[x] != null) {
        var z = c.next(32), ee = (h[x].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        z.write_shift(1, ee, "sbcs"), z.write_shift(1, L[x] == "?" ? "C" : L[x], "sbcs"), z.write_shift(4, g), z.write_shift(1, Y[x] || i[L[x]] || 0), z.write_shift(1, q[x] || 0), z.write_shift(1, 2), z.write_shift(4, 0), z.write_shift(1, 0), z.write_shift(4, 0), z.write_shift(4, 0), g += Y[x] || i[L[x]] || 0;
      }
    var Ce = c.next(264);
    for (Ce.write_shift(4, 13), x = 0; x < 65; ++x) Ce.write_shift(4, 0);
    for (x = 0; x < u.length; ++x) {
      var he = c.next(O);
      for (he.write_shift(1, 0), g = 0; g < h.length; ++g)
        if (h[g] != null)
          switch (L[g]) {
            case "L":
              he.write_shift(1, u[x][g] == null ? 63 : u[x][g] ? 84 : 70);
              break;
            case "B":
              he.write_shift(8, u[x][g] || 0, "f");
              break;
            case "N":
              var Ye = "0";
              for (typeof u[x][g] == "number" && (Ye = u[x][g].toFixed(q[g] || 0)), C = 0; C < Y[g] - Ye.length; ++C) he.write_shift(1, 32);
              he.write_shift(1, Ye, "sbcs");
              break;
            case "D":
              u[x][g] ? (he.write_shift(4, ("0000" + u[x][g].getFullYear()).slice(-4), "sbcs"), he.write_shift(2, ("00" + (u[x][g].getMonth() + 1)).slice(-2), "sbcs"), he.write_shift(2, ("00" + u[x][g].getDate()).slice(-2), "sbcs")) : he.write_shift(8, "00000000", "sbcs");
              break;
            case "C":
              var be = String(u[x][g] != null ? u[x][g] : "").slice(0, Y[g]);
              for (he.write_shift(1, be, "sbcs"), C = 0; C < Y[g] - be.length; ++C) he.write_shift(1, 32);
              break;
          }
    }
    return c.next(1).write_shift(1, 26), c.end();
  }
  return {
    to_workbook: a,
    to_sheet: n,
    from_sheet: s
  };
})(), cu = /* @__PURE__ */ (function() {
  var e = {
    AA: "À",
    BA: "Á",
    CA: "Â",
    DA: 195,
    HA: "Ä",
    JA: 197,
    AE: "È",
    BE: "É",
    CE: "Ê",
    HE: "Ë",
    AI: "Ì",
    BI: "Í",
    CI: "Î",
    HI: "Ï",
    AO: "Ò",
    BO: "Ó",
    CO: "Ô",
    DO: 213,
    HO: "Ö",
    AU: "Ù",
    BU: "Ú",
    CU: "Û",
    HU: "Ü",
    Aa: "à",
    Ba: "á",
    Ca: "â",
    Da: 227,
    Ha: "ä",
    Ja: 229,
    Ae: "è",
    Be: "é",
    Ce: "ê",
    He: "ë",
    Ai: "ì",
    Bi: "í",
    Ci: "î",
    Hi: "ï",
    Ao: "ò",
    Bo: "ó",
    Co: "ô",
    Do: 245,
    Ho: "ö",
    Au: "ù",
    Bu: "ú",
    Cu: "û",
    Hu: "ü",
    KC: "Ç",
    Kc: "ç",
    q: "æ",
    z: "œ",
    a: "Æ",
    j: "Œ",
    DN: 209,
    Dn: 241,
    Hy: 255,
    S: 169,
    c: 170,
    R: 174,
    "B ": 180,
    /*::[*/
    0: 176,
    /*::[*/
    1: 177,
    /*::[*/
    2: 178,
    /*::[*/
    3: 179,
    /*::[*/
    5: 181,
    /*::[*/
    6: 182,
    /*::[*/
    7: 183,
    Q: 185,
    k: 186,
    b: 208,
    i: 216,
    l: 222,
    s: 240,
    y: 248,
    "!": 161,
    '"': 162,
    "#": 163,
    "(": 164,
    "%": 165,
    "'": 167,
    "H ": 168,
    "+": 171,
    ";": 187,
    "<": 188,
    "=": 189,
    ">": 190,
    "?": 191,
    "{": 223
  }, r = new RegExp("\x1BN(" + et(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm"), t = function(h, u) {
    var v = e[u];
    return typeof v == "number" ? d0(v) : v;
  }, n = function(h, u, v) {
    var x = u.charCodeAt(0) - 32 << 4 | v.charCodeAt(0) - 48;
    return x == 59 ? h : d0(x);
  };
  e["|"] = 254;
  function a(h, u) {
    switch (u.type) {
      case "base64":
        return i(zt(h), u);
      case "binary":
        return i(h, u);
      case "buffer":
        return i(ge && Buffer.isBuffer(h) ? h.toString("binary") : On(h), u);
      case "array":
        return i(pa(h), u);
    }
    throw new Error("Unrecognized type " + u.type);
  }
  function i(h, u) {
    var v = h.split(/[\n\r]+/), x = -1, g = -1, C = 0, O = 0, F = [], L = [], Y = null, q = {}, R = [], U = [], k = [], W = 0, H;
    for (+u.codepage >= 0 && wn(+u.codepage); C !== v.length; ++C) {
      W = 0;
      var z = v[C].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, n).replace(r, t), ee = z.replace(/;;/g, "\0").split(";").map(function(y) {
        return y.replace(/\u0000/g, ";");
      }), Ce = ee[0], he;
      if (z.length > 0) switch (Ce) {
        case "ID":
          break;
        /* header */
        case "E":
          break;
        /* EOF */
        case "B":
          break;
        /* dimensions */
        case "O":
          break;
        /* options? */
        case "W":
          break;
        /* window? */
        case "P":
          ee[1].charAt(0) == "P" && L.push(z.slice(3).replace(/;;/g, ";"));
          break;
        case "C":
          var Ye = !1, be = !1, Ct = !1, Ve = !1, Tt = -1, dt = -1;
          for (O = 1; O < ee.length; ++O) switch (ee[O].charAt(0)) {
            case "A":
              break;
            // TODO: comment
            case "X":
              g = parseInt(ee[O].slice(1)) - 1, be = !0;
              break;
            case "Y":
              for (x = parseInt(ee[O].slice(1)) - 1, be || (g = 0), H = F.length; H <= x; ++H) F[H] = [];
              break;
            case "K":
              he = ee[O].slice(1), he.charAt(0) === '"' ? he = he.slice(1, he.length - 1) : he === "TRUE" ? he = !0 : he === "FALSE" ? he = !1 : isNaN($t(he)) ? isNaN(En(he).getDate()) || (he = lt(he)) : (he = $t(he), Y !== null && $s(Y) && (he = js(he))), Ye = !0;
              break;
            case "E":
              Ve = !0;
              var S = f1(ee[O].slice(1), { r: x, c: g });
              F[x][g] = [F[x][g], S];
              break;
            case "S":
              Ct = !0, F[x][g] = [F[x][g], "S5S"];
              break;
            case "G":
              break;
            // unknown
            case "R":
              Tt = parseInt(ee[O].slice(1)) - 1;
              break;
            case "C":
              dt = parseInt(ee[O].slice(1)) - 1;
              break;
            default:
              if (u && u.WTF) throw new Error("SYLK bad record " + z);
          }
          if (Ye && (F[x][g] && F[x][g].length == 2 ? F[x][g][0] = he : F[x][g] = he, Y = null), Ct) {
            if (Ve) throw new Error("SYLK shared formula cannot have own formula");
            var M = Tt > -1 && F[Tt][dt];
            if (!M || !M[1]) throw new Error("SYLK shared formula cannot find base");
            F[x][g][1] = l1(M[1], { r: x - Tt, c: g - dt });
          }
          break;
        case "F":
          var A = 0;
          for (O = 1; O < ee.length; ++O) switch (ee[O].charAt(0)) {
            case "X":
              g = parseInt(ee[O].slice(1)) - 1, ++A;
              break;
            case "Y":
              for (x = parseInt(ee[O].slice(1)) - 1, H = F.length; H <= x; ++H) F[H] = [];
              break;
            case "M":
              W = parseInt(ee[O].slice(1)) / 20;
              break;
            case "F":
              break;
            /* ??? */
            case "G":
              break;
            /* hide grid */
            case "P":
              Y = L[parseInt(ee[O].slice(1))];
              break;
            case "S":
              break;
            /* cell style */
            case "D":
              break;
            /* column */
            case "N":
              break;
            /* font */
            case "W":
              for (k = ee[O].slice(1).split(" "), H = parseInt(k[0], 10); H <= parseInt(k[1], 10); ++H)
                W = parseInt(k[2], 10), U[H - 1] = W === 0 ? { hidden: !0 } : { wch: W }, Ni(U[H - 1]);
              break;
            case "C":
              g = parseInt(ee[O].slice(1)) - 1, U[g] || (U[g] = {});
              break;
            case "R":
              x = parseInt(ee[O].slice(1)) - 1, R[x] || (R[x] = {}), W > 0 ? (R[x].hpt = W, R[x].hpx = Mo(W)) : W === 0 && (R[x].hidden = !0);
              break;
            default:
              if (u && u.WTF) throw new Error("SYLK bad record " + z);
          }
          A < 1 && (Y = null);
          break;
        default:
          if (u && u.WTF) throw new Error("SYLK bad record " + z);
      }
    }
    return R.length > 0 && (q["!rows"] = R), U.length > 0 && (q["!cols"] = U), u && u.sheetRows && (F = F.slice(0, u.sheetRows)), [F, q];
  }
  function s(h, u) {
    var v = a(h, u), x = v[0], g = v[1], C = Qr(x, u);
    return et(g).forEach(function(O) {
      C[O] = g[O];
    }), C;
  }
  function o(h, u) {
    return yr(s(h, u), u);
  }
  function l(h, u, v, x) {
    var g = "C;Y" + (v + 1) + ";X" + (x + 1) + ";K";
    switch (h.t) {
      case "n":
        g += h.v || 0, h.f && !h.F && (g += ";E" + Pi(h.f, { r: v, c: x }));
        break;
      case "b":
        g += h.v ? "TRUE" : "FALSE";
        break;
      case "e":
        g += h.w || h.v;
        break;
      case "d":
        g += '"' + (h.w || h.v) + '"';
        break;
      case "s":
        g += '"' + h.v.replace(/"/g, "").replace(/;/g, ";;") + '"';
        break;
    }
    return g;
  }
  function f(h, u) {
    u.forEach(function(v, x) {
      var g = "F;W" + (x + 1) + " " + (x + 1) + " ";
      v.hidden ? g += "0" : (typeof v.width == "number" && !v.wpx && (v.wpx = oa(v.width)), typeof v.wpx == "number" && !v.wch && (v.wch = fa(v.wpx)), typeof v.wch == "number" && (g += Math.round(v.wch))), g.charAt(g.length - 1) != " " && h.push(g);
    });
  }
  function c(h, u) {
    u.forEach(function(v, x) {
      var g = "F;";
      v.hidden ? g += "M0;" : v.hpt ? g += "M" + 20 * v.hpt + ";" : v.hpx && (g += "M" + 20 * la(v.hpx) + ";"), g.length > 2 && h.push(g + "R" + (x + 1));
    });
  }
  function d(h, u) {
    var v = ["ID;PWXL;N;E"], x = [], g = Ne(h["!ref"]), C, O = Array.isArray(h), F = `\r
`;
    v.push("P;PGeneral"), v.push("F;P0;DG0G8;M255"), h["!cols"] && f(v, h["!cols"]), h["!rows"] && c(v, h["!rows"]), v.push("B;Y" + (g.e.r - g.s.r + 1) + ";X" + (g.e.c - g.s.c + 1) + ";D" + [g.s.c, g.s.r, g.e.c, g.e.r].join(" "));
    for (var L = g.s.r; L <= g.e.r; ++L)
      for (var Y = g.s.c; Y <= g.e.c; ++Y) {
        var q = Fe({ r: L, c: Y });
        C = O ? (h[L] || [])[Y] : h[q], !(!C || C.v == null && (!C.f || C.F)) && x.push(l(C, h, L, Y));
      }
    return v.join(F) + F + x.join(F) + F + "E" + F;
  }
  return {
    to_workbook: o,
    to_sheet: s,
    from_sheet: d
  };
})(), hu = /* @__PURE__ */ (function() {
  function e(i, s) {
    switch (s.type) {
      case "base64":
        return r(zt(i), s);
      case "binary":
        return r(i, s);
      case "buffer":
        return r(ge && Buffer.isBuffer(i) ? i.toString("binary") : On(i), s);
      case "array":
        return r(pa(i), s);
    }
    throw new Error("Unrecognized type " + s.type);
  }
  function r(i, s) {
    for (var o = i.split(`
`), l = -1, f = -1, c = 0, d = []; c !== o.length; ++c) {
      if (o[c].trim() === "BOT") {
        d[++l] = [], f = 0;
        continue;
      }
      if (!(l < 0)) {
        var h = o[c].trim().split(","), u = h[0], v = h[1];
        ++c;
        for (var x = o[c] || ""; (x.match(/["]/g) || []).length & 1 && c < o.length - 1; ) x += `
` + o[++c];
        switch (x = x.trim(), +u) {
          case -1:
            if (x === "BOT") {
              d[++l] = [], f = 0;
              continue;
            } else if (x !== "EOD") throw new Error("Unrecognized DIF special command " + x);
            break;
          case 0:
            x === "TRUE" ? d[l][f] = !0 : x === "FALSE" ? d[l][f] = !1 : isNaN($t(v)) ? isNaN(En(v).getDate()) ? d[l][f] = v : d[l][f] = lt(v) : d[l][f] = $t(v), ++f;
            break;
          case 1:
            x = x.slice(1, x.length - 1), x = x.replace(/""/g, '"'), x && x.match(/^=".*"$/) && (x = x.slice(2, -1)), d[l][f++] = x !== "" ? x : null;
            break;
        }
        if (x === "EOD") break;
      }
    }
    return s && s.sheetRows && (d = d.slice(0, s.sheetRows)), d;
  }
  function t(i, s) {
    return Qr(e(i, s), s);
  }
  function n(i, s) {
    return yr(t(i, s), s);
  }
  var a = /* @__PURE__ */ (function() {
    var i = function(l, f, c, d, h) {
      l.push(f), l.push(c + "," + d), l.push('"' + h.replace(/"/g, '""') + '"');
    }, s = function(l, f, c, d) {
      l.push(f + "," + c), l.push(f == 1 ? '"' + d.replace(/"/g, '""') + '"' : d);
    };
    return function(l) {
      var f = [], c = Ne(l["!ref"]), d, h = Array.isArray(l);
      i(f, "TABLE", 0, 1, "sheetjs"), i(f, "VECTORS", 0, c.e.r - c.s.r + 1, ""), i(f, "TUPLES", 0, c.e.c - c.s.c + 1, ""), i(f, "DATA", 0, 0, "");
      for (var u = c.s.r; u <= c.e.r; ++u) {
        s(f, -1, 0, "BOT");
        for (var v = c.s.c; v <= c.e.c; ++v) {
          var x = Fe({ r: u, c: v });
          if (d = h ? (l[u] || [])[v] : l[x], !d) {
            s(f, 1, 0, "");
            continue;
          }
          switch (d.t) {
            case "n":
              var g = d.w;
              !g && d.v != null && (g = d.v), g == null ? d.f && !d.F ? s(f, 1, 0, "=" + d.f) : s(f, 1, 0, "") : s(f, 0, g, "V");
              break;
            case "b":
              s(f, 0, d.v ? 1 : 0, d.v ? "TRUE" : "FALSE");
              break;
            case "s":
              s(f, 1, 0, isNaN(d.v) ? d.v : '="' + d.v + '"');
              break;
            case "d":
              d.w || (d.w = ir(d.z || Be[14], ut(lt(d.v)))), s(f, 0, d.w, "V");
              break;
            default:
              s(f, 1, 0, "");
          }
        }
      }
      s(f, -1, 0, "EOD");
      var C = `\r
`, O = f.join(C);
      return O;
    };
  })();
  return {
    to_workbook: n,
    to_sheet: t,
    from_sheet: a
  };
})(), Io = /* @__PURE__ */ (function() {
  function e(d) {
    return d.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
  }
  function r(d) {
    return d.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
  }
  function t(d, h) {
    for (var u = d.split(`
`), v = -1, x = -1, g = 0, C = []; g !== u.length; ++g) {
      var O = u[g].trim().split(":");
      if (O[0] === "cell") {
        var F = Xe(O[1]);
        if (C.length <= F.r) for (v = C.length; v <= F.r; ++v) C[v] || (C[v] = []);
        switch (v = F.r, x = F.c, O[2]) {
          case "t":
            C[v][x] = e(O[3]);
            break;
          case "v":
            C[v][x] = +O[3];
            break;
          case "vtf":
            var L = O[O.length - 1];
          /* falls through */
          case "vtc":
            switch (O[3]) {
              case "nl":
                C[v][x] = !!+O[4];
                break;
              default:
                C[v][x] = +O[4];
                break;
            }
            O[2] == "vtf" && (C[v][x] = [C[v][x], L]);
        }
      }
    }
    return h && h.sheetRows && (C = C.slice(0, h.sheetRows)), C;
  }
  function n(d, h) {
    return Qr(t(d, h), h);
  }
  function a(d, h) {
    return yr(n(d, h), h);
  }
  var i = [
    "socialcalc:version:1.5",
    "MIME-Version: 1.0",
    "Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave"
  ].join(`
`), s = [
    "--SocialCalcSpreadsheetControlSave",
    "Content-type: text/plain; charset=UTF-8"
  ].join(`
`) + `
`, o = [
    "# SocialCalc Spreadsheet Control Save",
    "part:sheet"
  ].join(`
`), l = "--SocialCalcSpreadsheetControlSave--";
  function f(d) {
    if (!d || !d["!ref"]) return "";
    for (var h = [], u = [], v, x = "", g = gt(d["!ref"]), C = Array.isArray(d), O = g.s.r; O <= g.e.r; ++O)
      for (var F = g.s.c; F <= g.e.c; ++F)
        if (x = Fe({ r: O, c: F }), v = C ? (d[O] || [])[F] : d[x], !(!v || v.v == null || v.t === "z")) {
          switch (u = ["cell", x, "t"], v.t) {
            case "s":
            case "str":
              u.push(r(v.v));
              break;
            case "n":
              v.f ? (u[2] = "vtf", u[3] = "n", u[4] = v.v, u[5] = r(v.f)) : (u[2] = "v", u[3] = v.v);
              break;
            case "b":
              u[2] = "vt" + (v.f ? "f" : "c"), u[3] = "nl", u[4] = v.v ? "1" : "0", u[5] = r(v.f || (v.v ? "TRUE" : "FALSE"));
              break;
            case "d":
              var L = ut(lt(v.v));
              u[2] = "vtc", u[3] = "nd", u[4] = "" + L, u[5] = v.w || ir(v.z || Be[14], L);
              break;
            case "e":
              continue;
          }
          h.push(u.join(":"));
        }
    return h.push("sheet:c:" + (g.e.c - g.s.c + 1) + ":r:" + (g.e.r - g.s.r + 1) + ":tvf:1"), h.push("valueformat:1:text-wiki"), h.join(`
`);
  }
  function c(d) {
    return [i, s, o, s, f(d), l].join(`
`);
  }
  return {
    to_workbook: a,
    to_sheet: n,
    from_sheet: c
  };
})(), uu = /* @__PURE__ */ (function() {
  function e(c, d, h, u, v) {
    v.raw ? d[h][u] = c : c === "" || (c === "TRUE" ? d[h][u] = !0 : c === "FALSE" ? d[h][u] = !1 : isNaN($t(c)) ? isNaN(En(c).getDate()) ? d[h][u] = c : d[h][u] = lt(c) : d[h][u] = $t(c));
  }
  function r(c, d) {
    var h = d || {}, u = [];
    if (!c || c.length === 0) return u;
    for (var v = c.split(/[\r\n]/), x = v.length - 1; x >= 0 && v[x].length === 0; ) --x;
    for (var g = 10, C = 0, O = 0; O <= x; ++O)
      C = v[O].indexOf(" "), C == -1 ? C = v[O].length : C++, g = Math.max(g, C);
    for (O = 0; O <= x; ++O) {
      u[O] = [];
      var F = 0;
      for (e(v[O].slice(0, g).trim(), u, O, F, h), F = 1; F <= (v[O].length - g) / 10 + 1; ++F)
        e(v[O].slice(g + (F - 1) * 10, g + F * 10).trim(), u, O, F, h);
    }
    return h.sheetRows && (u = u.slice(0, h.sheetRows)), u;
  }
  var t = {
    /*::[*/
    44: ",",
    /*::[*/
    9: "	",
    /*::[*/
    59: ";",
    /*::[*/
    124: "|"
  }, n = {
    /*::[*/
    44: 3,
    /*::[*/
    9: 2,
    /*::[*/
    59: 1,
    /*::[*/
    124: 0
  };
  function a(c) {
    for (var d = {}, h = !1, u = 0, v = 0; u < c.length; ++u)
      (v = c.charCodeAt(u)) == 34 ? h = !h : !h && v in t && (d[v] = (d[v] || 0) + 1);
    v = [];
    for (u in d) Object.prototype.hasOwnProperty.call(d, u) && v.push([d[u], u]);
    if (!v.length) {
      d = n;
      for (u in d) Object.prototype.hasOwnProperty.call(d, u) && v.push([d[u], u]);
    }
    return v.sort(function(x, g) {
      return x[0] - g[0] || n[x[1]] - n[g[1]];
    }), t[v.pop()[1]] || 44;
  }
  function i(c, d) {
    var h = d || {}, u = "", v = h.dense ? [] : {}, x = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    c.slice(0, 4) == "sep=" ? c.charCodeAt(5) == 13 && c.charCodeAt(6) == 10 ? (u = c.charAt(4), c = c.slice(7)) : c.charCodeAt(5) == 13 || c.charCodeAt(5) == 10 ? (u = c.charAt(4), c = c.slice(6)) : u = a(c.slice(0, 1024)) : h && h.FS ? u = h.FS : u = a(c.slice(0, 1024));
    var g = 0, C = 0, O = 0, F = 0, L = 0, Y = u.charCodeAt(0), q = !1, R = 0, U = c.charCodeAt(0);
    c = c.replace(/\r\n/mg, `
`);
    var k = h.dateNF != null ? kc(h.dateNF) : null;
    function W() {
      var H = c.slice(F, L), z = {};
      if (H.charAt(0) == '"' && H.charAt(H.length - 1) == '"' && (H = H.slice(1, -1).replace(/""/g, '"')), H.length === 0) z.t = "z";
      else if (h.raw)
        z.t = "s", z.v = H;
      else if (H.trim().length === 0)
        z.t = "s", z.v = H;
      else if (H.charCodeAt(0) == 61)
        H.charCodeAt(1) == 34 && H.charCodeAt(H.length - 1) == 34 ? (z.t = "s", z.v = H.slice(2, -1).replace(/""/g, '"')) : c1(H) ? (z.t = "n", z.f = H.slice(1)) : (z.t = "s", z.v = H);
      else if (H == "TRUE")
        z.t = "b", z.v = !0;
      else if (H == "FALSE")
        z.t = "b", z.v = !1;
      else if (!isNaN(O = $t(H)))
        z.t = "n", h.cellText !== !1 && (z.w = H), z.v = O;
      else if (!isNaN(En(H).getDate()) || k && H.match(k)) {
        z.z = h.dateNF || Be[14];
        var ee = 0;
        k && H.match(k) && (H = Oc(H, h.dateNF, H.match(k) || []), ee = 1), h.cellDates ? (z.t = "d", z.v = lt(H, ee)) : (z.t = "n", z.v = ut(lt(H, ee))), h.cellText !== !1 && (z.w = ir(z.z, z.v instanceof Date ? ut(z.v) : z.v)), h.cellNF || delete z.z;
      } else
        z.t = "s", z.v = H;
      if (z.t == "z" || (h.dense ? (v[g] || (v[g] = []), v[g][C] = z) : v[Fe({ c: C, r: g })] = z), F = L + 1, U = c.charCodeAt(F), x.e.c < C && (x.e.c = C), x.e.r < g && (x.e.r = g), R == Y) ++C;
      else if (C = 0, ++g, h.sheetRows && h.sheetRows <= g) return !0;
    }
    e: for (; L < c.length; ++L) switch (R = c.charCodeAt(L)) {
      case 34:
        U === 34 && (q = !q);
        break;
      case Y:
      case 10:
      case 13:
        if (!q && W()) break e;
        break;
    }
    return L - F > 0 && W(), v["!ref"] = He(x), v;
  }
  function s(c, d) {
    return !(d && d.PRN) || d.FS || c.slice(0, 4) == "sep=" || c.indexOf("	") >= 0 || c.indexOf(",") >= 0 || c.indexOf(";") >= 0 ? i(c, d) : Qr(r(c, d), d);
  }
  function o(c, d) {
    var h = "", u = d.type == "string" ? [0, 0, 0, 0] : yp(c, d);
    switch (d.type) {
      case "base64":
        h = zt(c);
        break;
      case "binary":
        h = c;
        break;
      case "buffer":
        d.codepage == 65001 ? h = c.toString("utf8") : d.codepage && typeof Zn < "u" || (h = ge && Buffer.isBuffer(c) ? c.toString("binary") : On(c));
        break;
      case "array":
        h = pa(c);
        break;
      case "string":
        h = c;
        break;
      default:
        throw new Error("Unrecognized type " + d.type);
    }
    return u[0] == 239 && u[1] == 187 && u[2] == 191 ? h = dn(h.slice(3)) : d.type != "string" && d.type != "buffer" && d.codepage == 65001 ? h = dn(h) : d.type == "binary" && typeof Zn < "u", h.slice(0, 19) == "socialcalc:version:" ? Io.to_sheet(d.type == "string" ? h : dn(h), d) : s(h, d);
  }
  function l(c, d) {
    return yr(o(c, d), d);
  }
  function f(c) {
    for (var d = [], h = Ne(c["!ref"]), u, v = Array.isArray(c), x = h.s.r; x <= h.e.r; ++x) {
      for (var g = [], C = h.s.c; C <= h.e.c; ++C) {
        var O = Fe({ r: x, c: C });
        if (u = v ? (c[x] || [])[C] : c[O], !u || u.v == null) {
          g.push("          ");
          continue;
        }
        for (var F = (u.w || (Xt(u), u.w) || "").slice(0, 10); F.length < 10; ) F += " ";
        g.push(F + (C === 0 ? " " : ""));
      }
      d.push(g.join(""));
    }
    return d.join(`
`);
  }
  return {
    to_workbook: l,
    to_sheet: o,
    from_sheet: f
  };
})(), z0 = /* @__PURE__ */ (function() {
  function e(S, M, A) {
    if (S) {
      pt(S, S.l || 0);
      for (var y = A.Enum || Tt; S.l < S.length; ) {
        var V = S.read_shift(2), oe = y[V] || y[65535], fe = S.read_shift(2), se = S.l + fe, te = oe.f && oe.f(S, fe, A);
        if (S.l = se, M(te, oe, V)) return;
      }
    }
  }
  function r(S, M) {
    switch (M.type) {
      case "base64":
        return t(Rt(zt(S)), M);
      case "binary":
        return t(Rt(S), M);
      case "buffer":
      case "array":
        return t(S, M);
    }
    throw "Unsupported type " + M.type;
  }
  function t(S, M) {
    if (!S) return S;
    var A = M || {}, y = A.dense ? [] : {}, V = "Sheet1", oe = "", fe = 0, se = {}, te = [], ke = [], pe = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, at = A.sheetRows || 0;
    if (S[2] == 0 && (S[3] == 8 || S[3] == 9) && S.length >= 16 && S[14] == 5 && S[15] === 108)
      throw new Error("Unsupported Works 3 for Mac file");
    if (S[2] == 2)
      A.Enum = Tt, e(S, function(ie, Et, Ut) {
        switch (Ut) {
          case 0:
            A.vers = ie, ie >= 4096 && (A.qpro = !0);
            break;
          case 6:
            pe = ie;
            break;
          /* RANGE */
          case 204:
            ie && (oe = ie);
            break;
          /* SHEETNAMECS */
          case 222:
            oe = ie;
            break;
          /* SHEETNAMELP */
          case 15:
          /* LABEL */
          case 51:
            A.qpro || (ie[1].v = ie[1].v.slice(1));
          /* falls through */
          case 13:
          /* INTEGER */
          case 14:
          /* NUMBER */
          case 16:
            Ut == 14 && (ie[2] & 112) == 112 && (ie[2] & 15) > 1 && (ie[2] & 15) < 15 && (ie[1].z = A.dateNF || Be[14], A.cellDates && (ie[1].t = "d", ie[1].v = js(ie[1].v))), A.qpro && ie[3] > fe && (y["!ref"] = He(pe), se[V] = y, te.push(V), y = A.dense ? [] : {}, pe = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, fe = ie[3], V = oe || "Sheet" + (fe + 1), oe = "");
            var cr = A.dense ? (y[ie[0].r] || [])[ie[0].c] : y[Fe(ie[0])];
            if (cr) {
              cr.t = ie[1].t, cr.v = ie[1].v, ie[1].z != null && (cr.z = ie[1].z), ie[1].f != null && (cr.f = ie[1].f);
              break;
            }
            A.dense ? (y[ie[0].r] || (y[ie[0].r] = []), y[ie[0].r][ie[0].c] = ie[1]) : y[Fe(ie[0])] = ie[1];
            break;
        }
      }, A);
    else if (S[2] == 26 || S[2] == 14)
      A.Enum = dt, S[2] == 14 && (A.qpro = !0, S.l = 0), e(S, function(ie, Et, Ut) {
        switch (Ut) {
          case 204:
            V = ie;
            break;
          /* SHEETNAMECS */
          case 22:
            ie[1].v = ie[1].v.slice(1);
          /* falls through */
          case 23:
          /* NUMBER17 */
          case 24:
          /* NUMBER18 */
          case 25:
          /* FORMULA19 */
          case 37:
          /* NUMBER25 */
          case 39:
          /* NUMBER27 */
          case 40:
            if (ie[3] > fe && (y["!ref"] = He(pe), se[V] = y, te.push(V), y = A.dense ? [] : {}, pe = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, fe = ie[3], V = "Sheet" + (fe + 1)), at > 0 && ie[0].r >= at) break;
            A.dense ? (y[ie[0].r] || (y[ie[0].r] = []), y[ie[0].r][ie[0].c] = ie[1]) : y[Fe(ie[0])] = ie[1], pe.e.c < ie[0].c && (pe.e.c = ie[0].c), pe.e.r < ie[0].r && (pe.e.r = ie[0].r);
            break;
          case 27:
            ie[14e3] && (ke[ie[14e3][0]] = ie[14e3][1]);
            break;
          case 1537:
            ke[ie[0]] = ie[1], ie[0] == fe && (V = ie[1]);
            break;
        }
      }, A);
    else throw new Error("Unrecognized LOTUS BOF " + S[2]);
    if (y["!ref"] = He(pe), se[oe || V] = y, te.push(oe || V), !ke.length) return { SheetNames: te, Sheets: se };
    for (var we = {}, bt = [], Me = 0; Me < ke.length; ++Me) se[te[Me]] ? (bt.push(ke[Me] || te[Me]), we[ke[Me]] = se[ke[Me]] || se[te[Me]]) : (bt.push(ke[Me]), we[ke[Me]] = { "!ref": "A1" });
    return { SheetNames: bt, Sheets: we };
  }
  function n(S, M) {
    var A = M || {};
    if (+A.codepage >= 0 && wn(+A.codepage), A.type == "string") throw new Error("Cannot write WK1 to JS string");
    var y = ht(), V = Ne(S["!ref"]), oe = Array.isArray(S), fe = [];
    Q(y, 0, i(1030)), Q(y, 6, l(V));
    for (var se = Math.min(V.e.r, 8191), te = V.s.r; te <= se; ++te)
      for (var ke = qe(te), pe = V.s.c; pe <= V.e.c; ++pe) {
        te === V.s.r && (fe[pe] = rt(pe));
        var at = fe[pe] + ke, we = oe ? (S[te] || [])[pe] : S[at];
        if (!(!we || we.t == "z"))
          if (we.t == "n")
            (we.v | 0) == we.v && we.v >= -32768 && we.v <= 32767 ? Q(y, 13, u(te, pe, we.v)) : Q(y, 14, x(te, pe, we.v));
          else {
            var bt = Xt(we);
            Q(y, 15, d(te, pe, bt.slice(0, 239)));
          }
      }
    return Q(y, 1), y.end();
  }
  function a(S, M) {
    var A = M || {};
    if (+A.codepage >= 0 && wn(+A.codepage), A.type == "string") throw new Error("Cannot write WK3 to JS string");
    var y = ht();
    Q(y, 0, s(S));
    for (var V = 0, oe = 0; V < S.SheetNames.length; ++V) (S.Sheets[S.SheetNames[V]] || {})["!ref"] && Q(y, 27, Ve(S.SheetNames[V], oe++));
    var fe = 0;
    for (V = 0; V < S.SheetNames.length; ++V) {
      var se = S.Sheets[S.SheetNames[V]];
      if (!(!se || !se["!ref"])) {
        for (var te = Ne(se["!ref"]), ke = Array.isArray(se), pe = [], at = Math.min(te.e.r, 8191), we = te.s.r; we <= at; ++we)
          for (var bt = qe(we), Me = te.s.c; Me <= te.e.c; ++Me) {
            we === te.s.r && (pe[Me] = rt(Me));
            var ie = pe[Me] + bt, Et = ke ? (se[we] || [])[Me] : se[ie];
            if (!(!Et || Et.t == "z"))
              if (Et.t == "n")
                Q(y, 23, W(we, Me, fe, Et.v));
              else {
                var Ut = Xt(Et);
                Q(y, 22, R(we, Me, fe, Ut.slice(0, 239)));
              }
          }
        ++fe;
      }
    }
    return Q(y, 1), y.end();
  }
  function i(S) {
    var M = B(2);
    return M.write_shift(2, S), M;
  }
  function s(S) {
    var M = B(26);
    M.write_shift(2, 4096), M.write_shift(2, 4), M.write_shift(4, 0);
    for (var A = 0, y = 0, V = 0, oe = 0; oe < S.SheetNames.length; ++oe) {
      var fe = S.SheetNames[oe], se = S.Sheets[fe];
      if (!(!se || !se["!ref"])) {
        ++V;
        var te = gt(se["!ref"]);
        A < te.e.r && (A = te.e.r), y < te.e.c && (y = te.e.c);
      }
    }
    return A > 8191 && (A = 8191), M.write_shift(2, A), M.write_shift(1, V), M.write_shift(1, y), M.write_shift(2, 0), M.write_shift(2, 0), M.write_shift(1, 1), M.write_shift(1, 2), M.write_shift(4, 0), M.write_shift(4, 0), M;
  }
  function o(S, M, A) {
    var y = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    return M == 8 && A.qpro ? (y.s.c = S.read_shift(1), S.l++, y.s.r = S.read_shift(2), y.e.c = S.read_shift(1), S.l++, y.e.r = S.read_shift(2), y) : (y.s.c = S.read_shift(2), y.s.r = S.read_shift(2), M == 12 && A.qpro && (S.l += 2), y.e.c = S.read_shift(2), y.e.r = S.read_shift(2), M == 12 && A.qpro && (S.l += 2), y.s.c == 65535 && (y.s.c = y.e.c = y.s.r = y.e.r = 0), y);
  }
  function l(S) {
    var M = B(8);
    return M.write_shift(2, S.s.c), M.write_shift(2, S.s.r), M.write_shift(2, S.e.c), M.write_shift(2, S.e.r), M;
  }
  function f(S, M, A) {
    var y = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0, 0];
    return A.qpro && A.vers != 20768 ? (y[0].c = S.read_shift(1), y[3] = S.read_shift(1), y[0].r = S.read_shift(2), S.l += 2) : (y[2] = S.read_shift(1), y[0].c = S.read_shift(2), y[0].r = S.read_shift(2)), y;
  }
  function c(S, M, A) {
    var y = S.l + M, V = f(S, M, A);
    if (V[1].t = "s", A.vers == 20768) {
      S.l++;
      var oe = S.read_shift(1);
      return V[1].v = S.read_shift(oe, "utf8"), V;
    }
    return A.qpro && S.l++, V[1].v = S.read_shift(y - S.l, "cstr"), V;
  }
  function d(S, M, A) {
    var y = B(7 + A.length);
    y.write_shift(1, 255), y.write_shift(2, M), y.write_shift(2, S), y.write_shift(1, 39);
    for (var V = 0; V < y.length; ++V) {
      var oe = A.charCodeAt(V);
      y.write_shift(1, oe >= 128 ? 95 : oe);
    }
    return y.write_shift(1, 0), y;
  }
  function h(S, M, A) {
    var y = f(S, M, A);
    return y[1].v = S.read_shift(2, "i"), y;
  }
  function u(S, M, A) {
    var y = B(7);
    return y.write_shift(1, 255), y.write_shift(2, M), y.write_shift(2, S), y.write_shift(2, A, "i"), y;
  }
  function v(S, M, A) {
    var y = f(S, M, A);
    return y[1].v = S.read_shift(8, "f"), y;
  }
  function x(S, M, A) {
    var y = B(13);
    return y.write_shift(1, 255), y.write_shift(2, M), y.write_shift(2, S), y.write_shift(8, A, "f"), y;
  }
  function g(S, M, A) {
    var y = S.l + M, V = f(S, M, A);
    if (V[1].v = S.read_shift(8, "f"), A.qpro) S.l = y;
    else {
      var oe = S.read_shift(2);
      L(S.slice(S.l, S.l + oe), V), S.l += oe;
    }
    return V;
  }
  function C(S, M, A) {
    var y = M & 32768;
    return M &= -32769, M = (y ? S : 0) + (M >= 8192 ? M - 16384 : M), (y ? "" : "$") + (A ? rt(M) : qe(M));
  }
  var O = {
    51: ["FALSE", 0],
    52: ["TRUE", 0],
    70: ["LEN", 1],
    80: ["SUM", 69],
    81: ["AVERAGEA", 69],
    82: ["COUNTA", 69],
    83: ["MINA", 69],
    84: ["MAXA", 69],
    111: ["T", 1]
  }, F = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    // eslint-disable-line no-mixed-spaces-and-tabs
    "",
    "+",
    "-",
    "*",
    "/",
    "^",
    "=",
    "<>",
    // eslint-disable-line no-mixed-spaces-and-tabs
    "<=",
    ">=",
    "<",
    ">",
    "",
    "",
    "",
    "",
    // eslint-disable-line no-mixed-spaces-and-tabs
    "&",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
    // eslint-disable-line no-mixed-spaces-and-tabs
  ];
  function L(S, M) {
    pt(S, 0);
    for (var A = [], y = 0, V = "", oe = "", fe = "", se = ""; S.l < S.length; ) {
      var te = S[S.l++];
      switch (te) {
        case 0:
          A.push(S.read_shift(8, "f"));
          break;
        case 1:
          oe = C(M[0].c, S.read_shift(2), !0), V = C(M[0].r, S.read_shift(2), !1), A.push(oe + V);
          break;
        case 2:
          {
            var ke = C(M[0].c, S.read_shift(2), !0), pe = C(M[0].r, S.read_shift(2), !1);
            oe = C(M[0].c, S.read_shift(2), !0), V = C(M[0].r, S.read_shift(2), !1), A.push(ke + pe + ":" + oe + V);
          }
          break;
        case 3:
          if (S.l < S.length) {
            console.error("WK1 premature formula end");
            return;
          }
          break;
        case 4:
          A.push("(" + A.pop() + ")");
          break;
        case 5:
          A.push(S.read_shift(2));
          break;
        case 6:
          {
            for (var at = ""; te = S[S.l++]; ) at += String.fromCharCode(te);
            A.push('"' + at.replace(/"/g, '""') + '"');
          }
          break;
        case 8:
          A.push("-" + A.pop());
          break;
        case 23:
          A.push("+" + A.pop());
          break;
        case 22:
          A.push("NOT(" + A.pop() + ")");
          break;
        case 20:
        case 21:
          se = A.pop(), fe = A.pop(), A.push(["AND", "OR"][te - 20] + "(" + fe + "," + se + ")");
          break;
        default:
          if (te < 32 && F[te])
            se = A.pop(), fe = A.pop(), A.push(fe + F[te] + se);
          else if (O[te]) {
            if (y = O[te][1], y == 69 && (y = S[S.l++]), y > A.length) {
              console.error("WK1 bad formula parse 0x" + te.toString(16) + ":|" + A.join("|") + "|");
              return;
            }
            var we = A.slice(-y);
            A.length -= y, A.push(O[te][0] + "(" + we.join(",") + ")");
          } else return te <= 7 ? console.error("WK1 invalid opcode " + te.toString(16)) : te <= 24 ? console.error("WK1 unsupported op " + te.toString(16)) : te <= 30 ? console.error("WK1 invalid opcode " + te.toString(16)) : te <= 115 ? console.error("WK1 unsupported function opcode " + te.toString(16)) : console.error("WK1 unrecognized opcode " + te.toString(16));
      }
    }
    A.length == 1 ? M[1].f = "" + A[0] : console.error("WK1 bad formula parse |" + A.join("|") + "|");
  }
  function Y(S) {
    var M = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0];
    return M[0].r = S.read_shift(2), M[3] = S[S.l++], M[0].c = S[S.l++], M;
  }
  function q(S, M) {
    var A = Y(S);
    return A[1].t = "s", A[1].v = S.read_shift(M - 4, "cstr"), A;
  }
  function R(S, M, A, y) {
    var V = B(6 + y.length);
    V.write_shift(2, S), V.write_shift(1, A), V.write_shift(1, M), V.write_shift(1, 39);
    for (var oe = 0; oe < y.length; ++oe) {
      var fe = y.charCodeAt(oe);
      V.write_shift(1, fe >= 128 ? 95 : fe);
    }
    return V.write_shift(1, 0), V;
  }
  function U(S, M) {
    var A = Y(S);
    A[1].v = S.read_shift(2);
    var y = A[1].v >> 1;
    if (A[1].v & 1)
      switch (y & 7) {
        case 0:
          y = (y >> 3) * 5e3;
          break;
        case 1:
          y = (y >> 3) * 500;
          break;
        case 2:
          y = (y >> 3) / 20;
          break;
        case 3:
          y = (y >> 3) / 200;
          break;
        case 4:
          y = (y >> 3) / 2e3;
          break;
        case 5:
          y = (y >> 3) / 2e4;
          break;
        case 6:
          y = (y >> 3) / 16;
          break;
        case 7:
          y = (y >> 3) / 64;
          break;
      }
    return A[1].v = y, A;
  }
  function k(S, M) {
    var A = Y(S), y = S.read_shift(4), V = S.read_shift(4), oe = S.read_shift(2);
    if (oe == 65535)
      return y === 0 && V === 3221225472 ? (A[1].t = "e", A[1].v = 15) : y === 0 && V === 3489660928 ? (A[1].t = "e", A[1].v = 42) : A[1].v = 0, A;
    var fe = oe & 32768;
    return oe = (oe & 32767) - 16446, A[1].v = (1 - fe * 2) * (V * Math.pow(2, oe + 32) + y * Math.pow(2, oe)), A;
  }
  function W(S, M, A, y) {
    var V = B(14);
    if (V.write_shift(2, S), V.write_shift(1, A), V.write_shift(1, M), y == 0)
      return V.write_shift(4, 0), V.write_shift(4, 0), V.write_shift(2, 65535), V;
    var oe = 0, fe = 0, se = 0, te = 0;
    return y < 0 && (oe = 1, y = -y), fe = Math.log2(y) | 0, y /= Math.pow(2, fe - 31), te = y >>> 0, (te & 2147483648) == 0 && (y /= 2, ++fe, te = y >>> 0), y -= te, te |= 2147483648, te >>>= 0, y *= Math.pow(2, 32), se = y >>> 0, V.write_shift(4, se), V.write_shift(4, te), fe += 16383 + (oe ? 32768 : 0), V.write_shift(2, fe), V;
  }
  function H(S, M) {
    var A = k(S);
    return S.l += M - 14, A;
  }
  function z(S, M) {
    var A = Y(S), y = S.read_shift(4);
    return A[1].v = y >> 6, A;
  }
  function ee(S, M) {
    var A = Y(S), y = S.read_shift(8, "f");
    return A[1].v = y, A;
  }
  function Ce(S, M) {
    var A = ee(S);
    return S.l += M - 10, A;
  }
  function he(S, M) {
    return S[S.l + M - 1] == 0 ? S.read_shift(M, "cstr") : "";
  }
  function Ye(S, M) {
    var A = S[S.l++];
    A > M - 1 && (A = M - 1);
    for (var y = ""; y.length < A; ) y += String.fromCharCode(S[S.l++]);
    return y;
  }
  function be(S, M, A) {
    if (!(!A.qpro || M < 21)) {
      var y = S.read_shift(1);
      S.l += 17, S.l += 1, S.l += 2;
      var V = S.read_shift(M - 21, "cstr");
      return [y, V];
    }
  }
  function Ct(S, M) {
    for (var A = {}, y = S.l + M; S.l < y; ) {
      var V = S.read_shift(2);
      if (V == 14e3) {
        for (A[V] = [0, ""], A[V][0] = S.read_shift(2); S[S.l]; )
          A[V][1] += String.fromCharCode(S[S.l]), S.l++;
        S.l++;
      }
    }
    return A;
  }
  function Ve(S, M) {
    var A = B(5 + S.length);
    A.write_shift(2, 14e3), A.write_shift(2, M);
    for (var y = 0; y < S.length; ++y) {
      var V = S.charCodeAt(y);
      A[A.l++] = V > 127 ? 95 : V;
    }
    return A[A.l++] = 0, A;
  }
  var Tt = {
    /*::[*/
    0: { n: "BOF", f: Co },
    /*::[*/
    1: { n: "EOF" },
    /*::[*/
    2: { n: "CALCMODE" },
    /*::[*/
    3: { n: "CALCORDER" },
    /*::[*/
    4: { n: "SPLIT" },
    /*::[*/
    5: { n: "SYNC" },
    /*::[*/
    6: { n: "RANGE", f: o },
    /*::[*/
    7: { n: "WINDOW1" },
    /*::[*/
    8: { n: "COLW1" },
    /*::[*/
    9: { n: "WINTWO" },
    /*::[*/
    10: { n: "COLW2" },
    /*::[*/
    11: { n: "NAME" },
    /*::[*/
    12: { n: "BLANK" },
    /*::[*/
    13: { n: "INTEGER", f: h },
    /*::[*/
    14: { n: "NUMBER", f: v },
    /*::[*/
    15: { n: "LABEL", f: c },
    /*::[*/
    16: { n: "FORMULA", f: g },
    /*::[*/
    24: { n: "TABLE" },
    /*::[*/
    25: { n: "ORANGE" },
    /*::[*/
    26: { n: "PRANGE" },
    /*::[*/
    27: { n: "SRANGE" },
    /*::[*/
    28: { n: "FRANGE" },
    /*::[*/
    29: { n: "KRANGE1" },
    /*::[*/
    32: { n: "HRANGE" },
    /*::[*/
    35: { n: "KRANGE2" },
    /*::[*/
    36: { n: "PROTEC" },
    /*::[*/
    37: { n: "FOOTER" },
    /*::[*/
    38: { n: "HEADER" },
    /*::[*/
    39: { n: "SETUP" },
    /*::[*/
    40: { n: "MARGINS" },
    /*::[*/
    41: { n: "LABELFMT" },
    /*::[*/
    42: { n: "TITLES" },
    /*::[*/
    43: { n: "SHEETJS" },
    /*::[*/
    45: { n: "GRAPH" },
    /*::[*/
    46: { n: "NGRAPH" },
    /*::[*/
    47: { n: "CALCCOUNT" },
    /*::[*/
    48: { n: "UNFORMATTED" },
    /*::[*/
    49: { n: "CURSORW12" },
    /*::[*/
    50: { n: "WINDOW" },
    /*::[*/
    51: { n: "STRING", f: c },
    /*::[*/
    55: { n: "PASSWORD" },
    /*::[*/
    56: { n: "LOCKED" },
    /*::[*/
    60: { n: "QUERY" },
    /*::[*/
    61: { n: "QUERYNAME" },
    /*::[*/
    62: { n: "PRINT" },
    /*::[*/
    63: { n: "PRINTNAME" },
    /*::[*/
    64: { n: "GRAPH2" },
    /*::[*/
    65: { n: "GRAPHNAME" },
    /*::[*/
    66: { n: "ZOOM" },
    /*::[*/
    67: { n: "SYMSPLIT" },
    /*::[*/
    68: { n: "NSROWS" },
    /*::[*/
    69: { n: "NSCOLS" },
    /*::[*/
    70: { n: "RULER" },
    /*::[*/
    71: { n: "NNAME" },
    /*::[*/
    72: { n: "ACOMM" },
    /*::[*/
    73: { n: "AMACRO" },
    /*::[*/
    74: { n: "PARSE" },
    /*::[*/
    102: { n: "PRANGES??" },
    /*::[*/
    103: { n: "RRANGES??" },
    /*::[*/
    104: { n: "FNAME??" },
    /*::[*/
    105: { n: "MRANGES??" },
    /*::[*/
    204: { n: "SHEETNAMECS", f: he },
    /*::[*/
    222: { n: "SHEETNAMELP", f: Ye },
    /*::[*/
    65535: { n: "" }
  }, dt = {
    /*::[*/
    0: { n: "BOF" },
    /*::[*/
    1: { n: "EOF" },
    /*::[*/
    2: { n: "PASSWORD" },
    /*::[*/
    3: { n: "CALCSET" },
    /*::[*/
    4: { n: "WINDOWSET" },
    /*::[*/
    5: { n: "SHEETCELLPTR" },
    /*::[*/
    6: { n: "SHEETLAYOUT" },
    /*::[*/
    7: { n: "COLUMNWIDTH" },
    /*::[*/
    8: { n: "HIDDENCOLUMN" },
    /*::[*/
    9: { n: "USERRANGE" },
    /*::[*/
    10: { n: "SYSTEMRANGE" },
    /*::[*/
    11: { n: "ZEROFORCE" },
    /*::[*/
    12: { n: "SORTKEYDIR" },
    /*::[*/
    13: { n: "FILESEAL" },
    /*::[*/
    14: { n: "DATAFILLNUMS" },
    /*::[*/
    15: { n: "PRINTMAIN" },
    /*::[*/
    16: { n: "PRINTSTRING" },
    /*::[*/
    17: { n: "GRAPHMAIN" },
    /*::[*/
    18: { n: "GRAPHSTRING" },
    /*::[*/
    19: { n: "??" },
    /*::[*/
    20: { n: "ERRCELL" },
    /*::[*/
    21: { n: "NACELL" },
    /*::[*/
    22: { n: "LABEL16", f: q },
    /*::[*/
    23: { n: "NUMBER17", f: k },
    /*::[*/
    24: { n: "NUMBER18", f: U },
    /*::[*/
    25: { n: "FORMULA19", f: H },
    /*::[*/
    26: { n: "FORMULA1A" },
    /*::[*/
    27: { n: "XFORMAT", f: Ct },
    /*::[*/
    28: { n: "DTLABELMISC" },
    /*::[*/
    29: { n: "DTLABELCELL" },
    /*::[*/
    30: { n: "GRAPHWINDOW" },
    /*::[*/
    31: { n: "CPA" },
    /*::[*/
    32: { n: "LPLAUTO" },
    /*::[*/
    33: { n: "QUERY" },
    /*::[*/
    34: { n: "HIDDENSHEET" },
    /*::[*/
    35: { n: "??" },
    /*::[*/
    37: { n: "NUMBER25", f: z },
    /*::[*/
    38: { n: "??" },
    /*::[*/
    39: { n: "NUMBER27", f: ee },
    /*::[*/
    40: { n: "FORMULA28", f: Ce },
    /*::[*/
    142: { n: "??" },
    /*::[*/
    147: { n: "??" },
    /*::[*/
    150: { n: "??" },
    /*::[*/
    151: { n: "??" },
    /*::[*/
    152: { n: "??" },
    /*::[*/
    153: { n: "??" },
    /*::[*/
    154: { n: "??" },
    /*::[*/
    155: { n: "??" },
    /*::[*/
    156: { n: "??" },
    /*::[*/
    163: { n: "??" },
    /*::[*/
    174: { n: "??" },
    /*::[*/
    175: { n: "??" },
    /*::[*/
    176: { n: "??" },
    /*::[*/
    177: { n: "??" },
    /*::[*/
    184: { n: "??" },
    /*::[*/
    185: { n: "??" },
    /*::[*/
    186: { n: "??" },
    /*::[*/
    187: { n: "??" },
    /*::[*/
    188: { n: "??" },
    /*::[*/
    195: { n: "??" },
    /*::[*/
    201: { n: "??" },
    /*::[*/
    204: { n: "SHEETNAMECS", f: he },
    /*::[*/
    205: { n: "??" },
    /*::[*/
    206: { n: "??" },
    /*::[*/
    207: { n: "??" },
    /*::[*/
    208: { n: "??" },
    /*::[*/
    256: { n: "??" },
    /*::[*/
    259: { n: "??" },
    /*::[*/
    260: { n: "??" },
    /*::[*/
    261: { n: "??" },
    /*::[*/
    262: { n: "??" },
    /*::[*/
    263: { n: "??" },
    /*::[*/
    265: { n: "??" },
    /*::[*/
    266: { n: "??" },
    /*::[*/
    267: { n: "??" },
    /*::[*/
    268: { n: "??" },
    /*::[*/
    270: { n: "??" },
    /*::[*/
    271: { n: "??" },
    /*::[*/
    384: { n: "??" },
    /*::[*/
    389: { n: "??" },
    /*::[*/
    390: { n: "??" },
    /*::[*/
    393: { n: "??" },
    /*::[*/
    396: { n: "??" },
    /*::[*/
    512: { n: "??" },
    /*::[*/
    514: { n: "??" },
    /*::[*/
    513: { n: "??" },
    /*::[*/
    516: { n: "??" },
    /*::[*/
    517: { n: "??" },
    /*::[*/
    640: { n: "??" },
    /*::[*/
    641: { n: "??" },
    /*::[*/
    642: { n: "??" },
    /*::[*/
    643: { n: "??" },
    /*::[*/
    644: { n: "??" },
    /*::[*/
    645: { n: "??" },
    /*::[*/
    646: { n: "??" },
    /*::[*/
    647: { n: "??" },
    /*::[*/
    648: { n: "??" },
    /*::[*/
    658: { n: "??" },
    /*::[*/
    659: { n: "??" },
    /*::[*/
    660: { n: "??" },
    /*::[*/
    661: { n: "??" },
    /*::[*/
    662: { n: "??" },
    /*::[*/
    665: { n: "??" },
    /*::[*/
    666: { n: "??" },
    /*::[*/
    768: { n: "??" },
    /*::[*/
    772: { n: "??" },
    /*::[*/
    1537: { n: "SHEETINFOQP", f: be },
    /*::[*/
    1600: { n: "??" },
    /*::[*/
    1602: { n: "??" },
    /*::[*/
    1793: { n: "??" },
    /*::[*/
    1794: { n: "??" },
    /*::[*/
    1795: { n: "??" },
    /*::[*/
    1796: { n: "??" },
    /*::[*/
    1920: { n: "??" },
    /*::[*/
    2048: { n: "??" },
    /*::[*/
    2049: { n: "??" },
    /*::[*/
    2052: { n: "??" },
    /*::[*/
    2688: { n: "??" },
    /*::[*/
    10998: { n: "??" },
    /*::[*/
    12849: { n: "??" },
    /*::[*/
    28233: { n: "??" },
    /*::[*/
    28484: { n: "??" },
    /*::[*/
    65535: { n: "" }
  };
  return {
    sheet_to_wk1: n,
    book_to_wk3: a,
    to_workbook: r
  };
})(), xu = /^\s|\s$|[\t\n\r]/;
function No(e, r) {
  if (!r.bookSST) return "";
  var t = [Ge];
  t[t.length] = J("sst", null, {
    xmlns: Jr[0],
    count: e.Count,
    uniqueCount: e.Unique
  });
  for (var n = 0; n != e.length; ++n)
    if (e[n] != null) {
      var a = e[n], i = "<si>";
      a.r ? i += a.r : (i += "<t", a.t || (a.t = ""), a.t.match(xu) && (i += ' xml:space="preserve"'), i += ">" + ye(a.t) + "</t>"), i += "</si>", t[t.length] = i;
    }
  return t.length > 2 && (t[t.length] = "</sst>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function du(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function mu(e, r) {
  return r || (r = B(8)), r.write_shift(4, e.Count), r.write_shift(4, e.Unique), r;
}
var pu = sh;
function vu(e) {
  var r = ht();
  G(r, 159, mu(e));
  for (var t = 0; t < e.length; ++t) G(r, 19, pu(e[t]));
  return G(
    r,
    160
    /* BrtEndSst */
  ), r.end();
}
function _u(e) {
  for (var r = [], t = e.split(""), n = 0; n < t.length; ++n) r[n] = t[n].charCodeAt(0);
  return r;
}
function Do(e) {
  var r = 0, t, n = _u(e), a = n.length + 1, i, s, o, l, f;
  for (t = Tr(a), t[0] = n.length, i = 1; i != a; ++i) t[i] = n[i - 1];
  for (i = a - 1; i >= 0; --i)
    s = t[i], o = (r & 16384) === 0 ? 0 : 1, l = r << 1 & 32767, f = o | l, r = f ^ s;
  return r ^ 52811;
}
var gu = /* @__PURE__ */ (function() {
  function e(a, i) {
    switch (i.type) {
      case "base64":
        return r(zt(a), i);
      case "binary":
        return r(a, i);
      case "buffer":
        return r(ge && Buffer.isBuffer(a) ? a.toString("binary") : On(a), i);
      case "array":
        return r(pa(a), i);
    }
    throw new Error("Unrecognized type " + i.type);
  }
  function r(a, i) {
    var s = i || {}, o = s.dense ? [] : {}, l = a.match(/\\trowd.*?\\row\b/g);
    if (!l.length) throw new Error("RTF missing table");
    var f = { s: { c: 0, r: 0 }, e: { c: 0, r: l.length - 1 } };
    return l.forEach(function(c, d) {
      Array.isArray(o) && (o[d] = []);
      for (var h = /\\\w+\b/g, u = 0, v, x = -1; v = h.exec(c); ) {
        switch (v[0]) {
          case "\\cell":
            var g = c.slice(u, h.lastIndex - v[0].length);
            if (g[0] == " " && (g = g.slice(1)), ++x, g.length) {
              var C = { v: g, t: "s" };
              Array.isArray(o) ? o[d][x] = C : o[Fe({ r: d, c: x })] = C;
            }
            break;
        }
        u = h.lastIndex;
      }
      x > f.e.c && (f.e.c = x);
    }), o["!ref"] = He(f), o;
  }
  function t(a, i) {
    return yr(e(a, i), i);
  }
  function n(a) {
    for (var i = ["{\\rtf1\\ansi"], s = Ne(a["!ref"]), o, l = Array.isArray(a), f = s.s.r; f <= s.e.r; ++f) {
      i.push("\\trowd\\trautofit1");
      for (var c = s.s.c; c <= s.e.c; ++c) i.push("\\cellx" + (c + 1));
      for (i.push("\\pard\\intbl"), c = s.s.c; c <= s.e.c; ++c) {
        var d = Fe({ r: f, c });
        o = l ? (a[f] || [])[c] : a[d], !(!o || o.v == null && (!o.f || o.F)) && (i.push(" " + (o.w || (Xt(o), o.w))), i.push("\\cell"));
      }
      i.push("\\pard\\intbl\\row");
    }
    return i.join("") + "}";
  }
  return {
    to_workbook: t,
    to_sheet: e,
    from_sheet: n
  };
})();
function X0(e) {
  for (var r = 0, t = 1; r != 3; ++r) t = t * 256 + (e[r] > 255 ? 255 : e[r] < 0 ? 0 : e[r]);
  return t.toString(16).toUpperCase().slice(1);
}
var wu = 6, Vt = wu;
function oa(e) {
  return Math.floor((e + Math.round(128 / Vt) / 256) * Vt);
}
function fa(e) {
  return Math.floor((e - 5) / Vt * 100 + 0.5) / 100;
}
function hi(e) {
  return Math.round((e * Vt + 5) / Vt * 256) / 256;
}
function Ni(e) {
  e.width ? (e.wpx = oa(e.width), e.wch = fa(e.wpx), e.MDW = Vt) : e.wpx ? (e.wch = fa(e.wpx), e.width = hi(e.wch), e.MDW = Vt) : typeof e.wch == "number" && (e.width = hi(e.wch), e.wpx = oa(e.width), e.MDW = Vt), e.customWidth && delete e.customWidth;
}
var Tu = 96, Po = Tu;
function la(e) {
  return e * 96 / Po;
}
function Mo(e) {
  return e * Po / 96;
}
function Eu(e) {
  var r = ["<numFmts>"];
  return [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(t) {
    for (var n = t[0]; n <= t[1]; ++n) e[n] != null && (r[r.length] = J("numFmt", null, { numFmtId: n, formatCode: ye(e[n]) }));
  }), r.length === 1 ? "" : (r[r.length] = "</numFmts>", r[0] = J("numFmts", null, { count: r.length - 2 }).replace("/>", ">"), r.join(""));
}
function Su(e) {
  var r = [];
  return r[r.length] = J("cellXfs", null), e.forEach(function(t) {
    r[r.length] = J("xf", null, t);
  }), r[r.length] = "</cellXfs>", r.length === 2 ? "" : (r[0] = J("cellXfs", null, { count: r.length - 2 }).replace("/>", ">"), r.join(""));
}
function Lo(e, r) {
  var t = [Ge, J("styleSheet", null, {
    xmlns: Jr[0],
    "xmlns:vt": ze.vt
  })], n;
  return e.SSF && (n = Eu(e.SSF)) != null && (t[t.length] = n), t[t.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', t[t.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', t[t.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', t[t.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (n = Su(r.cellXfs)) && (t[t.length] = n), t[t.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', t[t.length] = '<dxfs count="0"/>', t[t.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', t.length > 2 && (t[t.length] = "</styleSheet>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function yu(e, r) {
  var t = e.read_shift(2), n = nt(e);
  return [t, n];
}
function Fu(e, r, t) {
  t || (t = B(6 + 4 * r.length)), t.write_shift(2, e), je(r, t);
  var n = t.length > t.l ? t.slice(0, t.l) : t;
  return t.l == null && (t.l = t.length), n;
}
function Cu(e, r, t) {
  var n = {};
  n.sz = e.read_shift(2) / 20;
  var a = xh(e);
  a.fItalic && (n.italic = 1), a.fCondense && (n.condense = 1), a.fExtend && (n.extend = 1), a.fShadow && (n.shadow = 1), a.fOutline && (n.outline = 1), a.fStrikeout && (n.strike = 1);
  var i = e.read_shift(2);
  switch (i === 700 && (n.bold = 1), e.read_shift(2)) {
    /* case 0: out.vertAlign = "baseline"; break; */
    case 1:
      n.vertAlign = "superscript";
      break;
    case 2:
      n.vertAlign = "subscript";
      break;
  }
  var s = e.read_shift(1);
  s != 0 && (n.underline = s);
  var o = e.read_shift(1);
  o > 0 && (n.family = o);
  var l = e.read_shift(1);
  switch (l > 0 && (n.charset = l), e.l++, n.color = uh(e), e.read_shift(1)) {
    /* case 0: out.scheme = "none": break; */
    case 1:
      n.scheme = "major";
      break;
    case 2:
      n.scheme = "minor";
      break;
  }
  return n.name = nt(e), n;
}
function Au(e, r) {
  r || (r = B(153)), r.write_shift(2, e.sz * 20), dh(e, r), r.write_shift(2, e.bold ? 700 : 400);
  var t = 0;
  e.vertAlign == "superscript" ? t = 1 : e.vertAlign == "subscript" && (t = 2), r.write_shift(2, t), r.write_shift(1, e.underline || 0), r.write_shift(1, e.family || 0), r.write_shift(1, e.charset || 0), r.write_shift(1, 0), ia(e.color, r);
  var n = 0;
  return n = 2, r.write_shift(1, n), je(e.name, r), r.length > r.l ? r.slice(0, r.l) : r;
}
var ku = [
  "none",
  "solid",
  "mediumGray",
  "darkGray",
  "lightGray",
  "darkHorizontal",
  "darkVertical",
  "darkDown",
  "darkUp",
  "darkGrid",
  "darkTrellis",
  "lightHorizontal",
  "lightVertical",
  "lightDown",
  "lightUp",
  "lightGrid",
  "lightTrellis",
  "gray125",
  "gray0625"
], Ma, Ou = Bt;
function j0(e, r) {
  r || (r = B(84)), Ma || (Ma = wi(ku));
  var t = Ma[e.patternType];
  t == null && (t = 40), r.write_shift(4, t);
  var n = 0;
  if (t != 40)
    for (ia({ auto: 1 }, r), ia({ auto: 1 }, r); n < 12; ++n) r.write_shift(4, 0);
  else {
    for (; n < 4; ++n) r.write_shift(4, 0);
    for (; n < 12; ++n) r.write_shift(4, 0);
  }
  return r.length > r.l ? r.slice(0, r.l) : r;
}
function Ru(e, r) {
  var t = e.l + r, n = e.read_shift(2), a = e.read_shift(2);
  return e.l = t, { ixfe: n, numFmtId: a };
}
function Bo(e, r, t) {
  t || (t = B(16)), t.write_shift(2, r || 0), t.write_shift(2, e.numFmtId || 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(1, 0), t.write_shift(1, 0);
  var n = 0;
  return t.write_shift(1, n), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(1, 0), t;
}
function sn(e, r) {
  return r || (r = B(10)), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(4, 0), r.write_shift(4, 0), r;
}
var Iu = Bt;
function Nu(e, r) {
  return r || (r = B(51)), r.write_shift(1, 0), sn(null, r), sn(null, r), sn(null, r), sn(null, r), sn(null, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function Du(e, r) {
  return r || (r = B(52)), r.write_shift(4, e.xfId), r.write_shift(2, 1), r.write_shift(1, 0), r.write_shift(1, 0), aa(e.name || "", r), r.length > r.l ? r.slice(0, r.l) : r;
}
function Pu(e, r, t) {
  var n = B(2052);
  return n.write_shift(4, e), aa(r, n), aa(t, n), n.length > n.l ? n.slice(0, n.l) : n;
}
function Mu(e, r) {
  if (r) {
    var t = 0;
    [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a) r[a] != null && ++t;
    }), t != 0 && (G(e, 615, Nt(t)), [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a) r[a] != null && G(e, 44, Fu(a, r[a]));
    }), G(
      e,
      616
      /* BrtEndFmts */
    ));
  }
}
function Lu(e) {
  var r = 1;
  G(e, 611, Nt(r)), G(e, 43, Au({
    sz: 12,
    color: { theme: 1 },
    name: "Calibri",
    family: 2
  })), G(
    e,
    612
    /* BrtEndFonts */
  );
}
function Bu(e) {
  var r = 2;
  G(e, 603, Nt(r)), G(e, 45, j0({ patternType: "none" })), G(e, 45, j0({ patternType: "gray125" })), G(
    e,
    604
    /* BrtEndFills */
  );
}
function bu(e) {
  var r = 1;
  G(e, 613, Nt(r)), G(e, 46, Nu()), G(
    e,
    614
    /* BrtEndBorders */
  );
}
function Uu(e) {
  var r = 1;
  G(e, 626, Nt(r)), G(e, 47, Bo({
    numFmtId: 0
  }, 65535)), G(
    e,
    627
    /* BrtEndCellStyleXFs */
  );
}
function Wu(e, r) {
  G(e, 617, Nt(r.length)), r.forEach(function(t) {
    G(e, 47, Bo(t, 0));
  }), G(
    e,
    618
    /* BrtEndCellXFs */
  );
}
function Hu(e) {
  var r = 1;
  G(e, 619, Nt(r)), G(e, 48, Du({
    xfId: 0,
    name: "Normal"
  })), G(
    e,
    620
    /* BrtEndStyles */
  );
}
function Gu(e) {
  var r = 0;
  G(e, 505, Nt(r)), G(
    e,
    506
    /* BrtEndDXFs */
  );
}
function $u(e) {
  var r = 0;
  G(e, 508, Pu(r, "TableStyleMedium9", "PivotStyleMedium4")), G(
    e,
    509
    /* BrtEndTableStyles */
  );
}
function Vu(e, r) {
  var t = ht();
  return G(
    t,
    278
    /* BrtBeginStyleSheet */
  ), Mu(t, e.SSF), Lu(t), Bu(t), bu(t), Uu(t), Wu(t, r.cellXfs), Hu(t), Gu(t), $u(t), G(
    t,
    279
    /* BrtEndStyleSheet */
  ), t.end();
}
function bo(e, r) {
  if (r && r.themeXLSX) return r.themeXLSX;
  if (e && typeof e.raw == "string") return e.raw;
  var t = [Ge];
  return t[t.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', t[t.length] = "<a:themeElements>", t[t.length] = '<a:clrScheme name="Office">', t[t.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', t[t.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', t[t.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', t[t.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', t[t.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', t[t.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', t[t.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', t[t.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', t[t.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', t[t.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', t[t.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', t[t.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', t[t.length] = "</a:clrScheme>", t[t.length] = '<a:fontScheme name="Office">', t[t.length] = "<a:majorFont>", t[t.length] = '<a:latin typeface="Cambria"/>', t[t.length] = '<a:ea typeface=""/>', t[t.length] = '<a:cs typeface=""/>', t[t.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', t[t.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', t[t.length] = '<a:font script="Hans" typeface="宋体"/>', t[t.length] = '<a:font script="Hant" typeface="新細明體"/>', t[t.length] = '<a:font script="Arab" typeface="Times New Roman"/>', t[t.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>', t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>', t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>', t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>', t[t.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', t[t.length] = '<a:font script="Knda" typeface="Tunga"/>', t[t.length] = '<a:font script="Guru" typeface="Raavi"/>', t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>', t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>', t[t.length] = '<a:font script="Deva" typeface="Mangal"/>', t[t.length] = '<a:font script="Telu" typeface="Gautami"/>', t[t.length] = '<a:font script="Taml" typeface="Latha"/>', t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>', t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>', t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>', t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', t[t.length] = '<a:font script="Viet" typeface="Times New Roman"/>', t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>', t[t.length] = "</a:majorFont>", t[t.length] = "<a:minorFont>", t[t.length] = '<a:latin typeface="Calibri"/>', t[t.length] = '<a:ea typeface=""/>', t[t.length] = '<a:cs typeface=""/>', t[t.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', t[t.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', t[t.length] = '<a:font script="Hans" typeface="宋体"/>', t[t.length] = '<a:font script="Hant" typeface="新細明體"/>', t[t.length] = '<a:font script="Arab" typeface="Arial"/>', t[t.length] = '<a:font script="Hebr" typeface="Arial"/>', t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>', t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>', t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>', t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>', t[t.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', t[t.length] = '<a:font script="Knda" typeface="Tunga"/>', t[t.length] = '<a:font script="Guru" typeface="Raavi"/>', t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>', t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>', t[t.length] = '<a:font script="Deva" typeface="Mangal"/>', t[t.length] = '<a:font script="Telu" typeface="Gautami"/>', t[t.length] = '<a:font script="Taml" typeface="Latha"/>', t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>', t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>', t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>', t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', t[t.length] = '<a:font script="Viet" typeface="Arial"/>', t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>', t[t.length] = "</a:minorFont>", t[t.length] = "</a:fontScheme>", t[t.length] = '<a:fmtScheme name="Office">', t[t.length] = "<a:fillStyleLst>", t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:lin ang="16200000" scaled="1"/>', t[t.length] = "</a:gradFill>", t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:lin ang="16200000" scaled="0"/>', t[t.length] = "</a:gradFill>", t[t.length] = "</a:fillStyleLst>", t[t.length] = "<a:lnStyleLst>", t[t.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', t[t.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', t[t.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', t[t.length] = "</a:lnStyleLst>", t[t.length] = "<a:effectStyleLst>", t[t.length] = "<a:effectStyle>", t[t.length] = "<a:effectLst>", t[t.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', t[t.length] = "</a:effectLst>", t[t.length] = "</a:effectStyle>", t[t.length] = "<a:effectStyle>", t[t.length] = "<a:effectLst>", t[t.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', t[t.length] = "</a:effectLst>", t[t.length] = "</a:effectStyle>", t[t.length] = "<a:effectStyle>", t[t.length] = "<a:effectLst>", t[t.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', t[t.length] = "</a:effectLst>", t[t.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', t[t.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', t[t.length] = "</a:effectStyle>", t[t.length] = "</a:effectStyleLst>", t[t.length] = "<a:bgFillStyleLst>", t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', t[t.length] = "</a:gradFill>", t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', t[t.length] = "</a:gradFill>", t[t.length] = "</a:bgFillStyleLst>", t[t.length] = "</a:fmtScheme>", t[t.length] = "</a:themeElements>", t[t.length] = "<a:objectDefaults>", t[t.length] = "<a:spDef>", t[t.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', t[t.length] = "</a:spDef>", t[t.length] = "<a:lnDef>", t[t.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', t[t.length] = "</a:lnDef>", t[t.length] = "</a:objectDefaults>", t[t.length] = "<a:extraClrSchemeLst/>", t[t.length] = "</a:theme>", t.join("");
}
function zu(e, r) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: nt(e)
  };
}
function Xu(e) {
  var r = B(12 + 2 * e.name.length);
  return r.write_shift(4, e.flags), r.write_shift(4, e.version), je(e.name, r), r.slice(0, r.l);
}
function ju(e) {
  for (var r = [], t = e.read_shift(4); t-- > 0; )
    r.push([e.read_shift(4), e.read_shift(4)]);
  return r;
}
function Yu(e) {
  var r = B(4 + 8 * e.length);
  r.write_shift(4, e.length);
  for (var t = 0; t < e.length; ++t)
    r.write_shift(4, e[t][0]), r.write_shift(4, e[t][1]);
  return r;
}
function Ku(e, r) {
  var t = B(8 + 2 * r.length);
  return t.write_shift(4, e), je(r, t), t.slice(0, t.l);
}
function Ju(e) {
  return e.l += 4, e.read_shift(4) != 0;
}
function Qu(e, r) {
  var t = B(8);
  return t.write_shift(4, e), t.write_shift(4, 1), t;
}
function Zu() {
  var e = ht();
  return G(e, 332), G(e, 334, Nt(1)), G(e, 335, Xu({
    name: "XLDAPR",
    version: 12e4,
    flags: 3496657072
  })), G(e, 336), G(e, 339, Ku(1, "XLDAPR")), G(e, 52), G(e, 35, Nt(514)), G(e, 4096, Nt(0)), G(e, 4097, yt(1)), G(e, 36), G(e, 53), G(e, 340), G(e, 337, Qu(1)), G(e, 51, Yu([[1, 0]])), G(e, 338), G(e, 333), e.end();
}
function Uo() {
  var e = [Ge];
  return e.push(`<metadata xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:xlrd="http://schemas.microsoft.com/office/spreadsheetml/2017/richdata" xmlns:xda="http://schemas.microsoft.com/office/spreadsheetml/2017/dynamicarray">
  <metadataTypes count="1">
    <metadataType name="XLDAPR" minSupportedVersion="120000" copy="1" pasteAll="1" pasteValues="1" merge="1" splitFirst="1" rowColShift="1" clearFormats="1" clearComments="1" assign="1" coerce="1" cellMeta="1"/>
  </metadataTypes>
  <futureMetadata name="XLDAPR" count="1">
    <bk>
      <extLst>
        <ext uri="{bdbb8cdc-fa1e-496e-a857-3c3f30c029c3}">
          <xda:dynamicArrayProperties fDynamic="1" fCollapsed="0"/>
        </ext>
      </extLst>
    </bk>
  </futureMetadata>
  <cellMetadata count="1">
    <bk>
      <rc t="1" v="0"/>
    </bk>
  </cellMetadata>
</metadata>`), e.join("");
}
function qu(e) {
  var r = {};
  r.i = e.read_shift(4);
  var t = {};
  t.r = e.read_shift(4), t.c = e.read_shift(4), r.r = Fe(t);
  var n = e.read_shift(1);
  return n & 2 && (r.l = "1"), n & 8 && (r.a = "1"), r;
}
var Br = 1024;
function Wo(e, r) {
  for (var t = [21600, 21600], n = ["m0,0l0", t[1], t[0], t[1], t[0], "0xe"].join(","), a = [
    J("xml", null, { "xmlns:v": vt.v, "xmlns:o": vt.o, "xmlns:x": vt.x, "xmlns:mv": vt.mv }).replace(/\/>/, ">"),
    J("o:shapelayout", J("o:idmap", null, { "v:ext": "edit", data: e }), { "v:ext": "edit" }),
    J("v:shapetype", [
      J("v:stroke", null, { joinstyle: "miter" }),
      J("v:path", null, { gradientshapeok: "t", "o:connecttype": "rect" })
    ].join(""), { id: "_x0000_t202", "o:spt": 202, coordsize: t.join(","), path: n })
  ]; Br < e * 1e3; ) Br += 1e3;
  return r.forEach(function(i) {
    var s = Xe(i[0]), o = (
      /*::(*/
      { color2: "#BEFF82", type: "gradient" }
    );
    o.type == "gradient" && (o.angle = "-180");
    var l = o.type == "gradient" ? J("o:fill", null, { type: "gradientUnscaled", "v:ext": "view" }) : null, f = J("v:fill", l, o), c = { on: "t", obscured: "t" };
    ++Br, a = a.concat([
      "<v:shape" + yn({
        id: "_x0000_s" + Br,
        type: "#_x0000_t202",
        style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (i[1].hidden ? ";visibility:hidden" : ""),
        fillcolor: "#ECFAD4",
        strokecolor: "#edeaa1"
      }) + ">",
      f,
      J("v:shadow", null, c),
      J("v:path", null, { "o:connecttype": "none" }),
      '<v:textbox><div style="text-align:left"></div></v:textbox>',
      '<x:ClientData ObjectType="Note">',
      "<x:MoveWithCells/>",
      "<x:SizeWithCells/>",
      /* Part 4 19.4.2.3 Anchor (Anchor) */
      Ze("x:Anchor", [s.c + 1, 0, s.r + 1, 0, s.c + 3, 20, s.r + 5, 20].join(",")),
      Ze("x:AutoFill", "False"),
      Ze("x:Row", String(s.r)),
      Ze("x:Column", String(s.c)),
      i[1].hidden ? "" : "<x:Visible/>",
      "</x:ClientData>",
      "</v:shape>"
    ]);
  }), a.push("</xml>"), a.join("");
}
function Ho(e) {
  var r = [Ge, J("comments", null, { xmlns: Jr[0] })], t = [];
  return r.push("<authors>"), e.forEach(function(n) {
    n[1].forEach(function(a) {
      var i = ye(a.a);
      t.indexOf(i) == -1 && (t.push(i), r.push("<author>" + i + "</author>")), a.T && a.ID && t.indexOf("tc=" + a.ID) == -1 && (t.push("tc=" + a.ID), r.push("<author>tc=" + a.ID + "</author>"));
    });
  }), t.length == 0 && (t.push("SheetJ5"), r.push("<author>SheetJ5</author>")), r.push("</authors>"), r.push("<commentList>"), e.forEach(function(n) {
    var a = 0, i = [];
    if (n[1][0] && n[1][0].T && n[1][0].ID ? a = t.indexOf("tc=" + n[1][0].ID) : n[1].forEach(function(l) {
      l.a && (a = t.indexOf(ye(l.a))), i.push(l.t || "");
    }), r.push('<comment ref="' + n[0] + '" authorId="' + a + '"><text>'), i.length <= 1) r.push(Ze("t", ye(i[0] || "")));
    else {
      for (var s = `Comment:
    ` + i[0] + `
`, o = 1; o < i.length; ++o) s += `Reply:
    ` + i[o] + `
`;
      r.push(Ze("t", ye(s)));
    }
    r.push("</text></comment>");
  }), r.push("</commentList>"), r.length > 2 && (r[r.length] = "</comments>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function e1(e, r, t) {
  var n = [Ge, J("ThreadedComments", null, { xmlns: ze.TCMNT }).replace(/[\/]>/, ">")];
  return e.forEach(function(a) {
    var i = "";
    (a[1] || []).forEach(function(s, o) {
      if (!s.T) {
        delete s.ID;
        return;
      }
      s.a && r.indexOf(s.a) == -1 && r.push(s.a);
      var l = {
        ref: a[0],
        id: "{54EE7951-7262-4200-6969-" + ("000000000000" + t.tcid++).slice(-12) + "}"
      };
      o == 0 ? i = l.id : l.parentId = i, s.ID = l.id, s.a && (l.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + r.indexOf(s.a)).slice(-12) + "}"), n.push(J("threadedComment", Ze("text", s.t || ""), l));
    });
  }), n.push("</ThreadedComments>"), n.join("");
}
function t1(e) {
  var r = [Ge, J("personList", null, {
    xmlns: ze.TCMNT,
    "xmlns:x": Jr[0]
  }).replace(/[\/]>/, ">")];
  return e.forEach(function(t, n) {
    r.push(J("person", null, {
      displayName: t,
      id: "{54EE7950-7262-4200-6969-" + ("000000000000" + n).slice(-12) + "}",
      userId: t,
      providerId: "None"
    }));
  }), r.push("</personList>"), r.join("");
}
function r1(e) {
  var r = {};
  r.iauthor = e.read_shift(4);
  var t = kr(e);
  return r.rfx = t.s, r.ref = Fe(t.s), e.l += 16, r;
}
function n1(e, r) {
  return r == null && (r = B(36)), r.write_shift(4, e[1].iauthor), Zr(e[0], r), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r;
}
var a1 = nt;
function i1(e) {
  return je(e.slice(0, 54));
}
function s1(e) {
  var r = ht(), t = [];
  return G(
    r,
    628
    /* BrtBeginComments */
  ), G(
    r,
    630
    /* BrtBeginCommentAuthors */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      t.indexOf(a.a) > -1 || (t.push(a.a.slice(0, 54)), G(r, 632, i1(a.a)));
    });
  }), G(
    r,
    631
    /* BrtEndCommentAuthors */
  ), G(
    r,
    633
    /* BrtBeginCommentList */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      a.iauthor = t.indexOf(a.a);
      var i = { s: Xe(n[0]), e: Xe(n[0]) };
      G(r, 635, n1([i, a])), a.t && a.t.length > 0 && G(r, 637, fh(a)), G(
        r,
        636
        /* BrtEndComment */
      ), delete a.iauthor;
    });
  }), G(
    r,
    634
    /* BrtEndCommentList */
  ), G(
    r,
    629
    /* BrtEndComments */
  ), r.end();
}
function o1(e, r) {
  r.FullPaths.forEach(function(t, n) {
    if (n != 0) {
      var a = t.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      a.slice(-1) !== "/" && Ae.utils.cfb_add(e, a, r.FileIndex[n].content);
    }
  });
}
var Go = ["xlsb", "xlsm", "xlam", "biff8", "xla"], f1 = /* @__PURE__ */ (function() {
  var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, r = { r: 0, c: 0 };
  function t(n, a, i, s) {
    var o = !1, l = !1;
    i.length == 0 ? l = !0 : i.charAt(0) == "[" && (l = !0, i = i.slice(1, -1)), s.length == 0 ? o = !0 : s.charAt(0) == "[" && (o = !0, s = s.slice(1, -1));
    var f = i.length > 0 ? parseInt(i, 10) | 0 : 0, c = s.length > 0 ? parseInt(s, 10) | 0 : 0;
    return o ? c += r.c : --c, l ? f += r.r : --f, a + (o ? "" : "$") + rt(c) + (l ? "" : "$") + qe(f);
  }
  return function(a, i) {
    return r = i, a.replace(e, t);
  };
})(), Di = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g, Pi = /* @__PURE__ */ (function() {
  return function(r, t) {
    return r.replace(Di, function(n, a, i, s, o, l) {
      var f = Ai(s) - (i ? 0 : t.c), c = Ci(l) - (o ? 0 : t.r), d = c == 0 ? "" : o ? c + 1 : "[" + c + "]", h = f == 0 ? "" : i ? f + 1 : "[" + f + "]";
      return a + "R" + d + "C" + h;
    });
  };
})();
function l1(e, r) {
  return e.replace(Di, function(t, n, a, i, s, o) {
    return n + (a == "$" ? a + i : rt(Ai(i) + r.c)) + (s == "$" ? s + o : qe(Ci(o) + r.r));
  });
}
function c1(e) {
  return e.length != 1;
}
function We(e) {
  e.l += 1;
}
function sr(e, r) {
  var t = e.read_shift(2);
  return [t & 16383, t >> 14 & 1, t >> 15 & 1];
}
function $o(e, r, t) {
  var n = 2;
  if (t) {
    if (t.biff >= 2 && t.biff <= 5) return Vo(e);
    t.biff == 12 && (n = 4);
  }
  var a = e.read_shift(n), i = e.read_shift(n), s = sr(e), o = sr(e);
  return { s: { r: a, c: s[0], cRel: s[1], rRel: s[2] }, e: { r: i, c: o[0], cRel: o[1], rRel: o[2] } };
}
function Vo(e) {
  var r = sr(e), t = sr(e), n = e.read_shift(1), a = e.read_shift(1);
  return { s: { r: r[0], c: n, cRel: r[1], rRel: r[2] }, e: { r: t[0], c: a, cRel: t[1], rRel: t[2] } };
}
function h1(e, r, t) {
  if (t.biff < 8) return Vo(e);
  var n = e.read_shift(t.biff == 12 ? 4 : 2), a = e.read_shift(t.biff == 12 ? 4 : 2), i = sr(e), s = sr(e);
  return { s: { r: n, c: i[0], cRel: i[1], rRel: i[2] }, e: { r: a, c: s[0], cRel: s[1], rRel: s[2] } };
}
function zo(e, r, t) {
  if (t && t.biff >= 2 && t.biff <= 5) return u1(e);
  var n = e.read_shift(t && t.biff == 12 ? 4 : 2), a = sr(e);
  return { r: n, c: a[0], cRel: a[1], rRel: a[2] };
}
function u1(e) {
  var r = sr(e), t = e.read_shift(1);
  return { r: r[0], c: t, cRel: r[1], rRel: r[2] };
}
function x1(e) {
  var r = e.read_shift(2), t = e.read_shift(2);
  return { r, c: t & 255, fQuoted: !!(t & 16384), cRel: t >> 15, rRel: t >> 15 };
}
function d1(e, r, t) {
  var n = t && t.biff ? t.biff : 8;
  if (n >= 2 && n <= 5) return m1(e);
  var a = e.read_shift(n >= 12 ? 4 : 2), i = e.read_shift(2), s = (i & 16384) >> 14, o = (i & 32768) >> 15;
  if (i &= 16383, o == 1) for (; a > 524287; ) a -= 1048576;
  if (s == 1) for (; i > 8191; ) i = i - 16384;
  return { r: a, c: i, cRel: s, rRel: o };
}
function m1(e) {
  var r = e.read_shift(2), t = e.read_shift(1), n = (r & 32768) >> 15, a = (r & 16384) >> 14;
  return r &= 16383, n == 1 && r >= 8192 && (r = r - 16384), a == 1 && t >= 128 && (t = t - 256), { r, c: t, cRel: a, rRel: n };
}
function p1(e, r, t) {
  var n = (e[e.l++] & 96) >> 5, a = $o(e, t.biff >= 2 && t.biff <= 5 ? 6 : 8, t);
  return [n, a];
}
function v1(e, r, t) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2, "i"), i = 8;
  if (t) switch (t.biff) {
    case 5:
      e.l += 12, i = 6;
      break;
    case 12:
      i = 12;
      break;
  }
  var s = $o(e, i, t);
  return [n, a, s];
}
function _1(e, r, t) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += t && t.biff > 8 ? 12 : t.biff < 8 ? 6 : 8, [n];
}
function g1(e, r, t) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2), i = 8;
  if (t) switch (t.biff) {
    case 5:
      e.l += 12, i = 6;
      break;
    case 12:
      i = 12;
      break;
  }
  return e.l += i, [n, a];
}
function w1(e, r, t) {
  var n = (e[e.l++] & 96) >> 5, a = h1(e, r - 1, t);
  return [n, a];
}
function T1(e, r, t) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += t.biff == 2 ? 6 : t.biff == 12 ? 14 : 7, [n];
}
function Y0(e) {
  var r = e[e.l + 1] & 1, t = 1;
  return e.l += 4, [r, t];
}
function E1(e, r, t) {
  e.l += 2;
  for (var n = e.read_shift(t && t.biff == 2 ? 1 : 2), a = [], i = 0; i <= n; ++i) a.push(e.read_shift(t && t.biff == 2 ? 1 : 2));
  return a;
}
function S1(e, r, t) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(t && t.biff == 2 ? 1 : 2)];
}
function y1(e, r, t) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(t && t.biff == 2 ? 1 : 2)];
}
function F1(e) {
  var r = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [r, e.read_shift(2)];
}
function C1(e, r, t) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += t && t.biff == 2 ? 3 : 4, [n];
}
function Xo(e) {
  var r = e.read_shift(1), t = e.read_shift(1);
  return [r, t];
}
function A1(e) {
  return e.read_shift(2), Xo(e);
}
function k1(e) {
  return e.read_shift(2), Xo(e);
}
function O1(e, r, t) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = zo(e, 0, t);
  return [n, a];
}
function R1(e, r, t) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = d1(e, 0, t);
  return [n, a];
}
function I1(e, r, t) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(2);
  t && t.biff == 5 && (e.l += 12);
  var i = zo(e, 0, t);
  return [n, a, i];
}
function N1(e, r, t) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(t && t.biff <= 3 ? 1 : 2);
  return [Nx[a], Ko[a], n];
}
function D1(e, r, t) {
  var n = e[e.l++], a = e.read_shift(1), i = t && t.biff <= 3 ? [n == 88 ? -1 : 0, e.read_shift(1)] : P1(e);
  return [a, (i[0] === 0 ? Ko : Ix)[i[1]]];
}
function P1(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function M1(e, r, t) {
  e.l += t && t.biff == 2 ? 3 : 4;
}
function L1(e, r, t) {
  if (e.l++, t && t.biff == 12) return [e.read_shift(4, "i"), 0];
  var n = e.read_shift(2), a = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return [n, a];
}
function B1(e) {
  return e.l++, Nn[e.read_shift(1)];
}
function b1(e) {
  return e.l++, e.read_shift(2);
}
function U1(e) {
  return e.l++, e.read_shift(1) !== 0;
}
function W1(e) {
  return e.l++, qr(e);
}
function H1(e, r, t) {
  return e.l++, ko(e, r - 1, t);
}
function G1(e, r) {
  var t = [e.read_shift(1)];
  if (r == 12) switch (t[0]) {
    case 2:
      t[0] = 4;
      break;
    /* SerBool */
    case 4:
      t[0] = 16;
      break;
    /* SerErr */
    case 0:
      t[0] = 1;
      break;
    /* SerNum */
    case 1:
      t[0] = 2;
      break;
  }
  switch (t[0]) {
    case 4:
      t[1] = Ih(e, 1) ? "TRUE" : "FALSE", r != 12 && (e.l += 7);
      break;
    case 37:
    /* appears to be an alias */
    case 16:
      t[1] = Nn[e[e.l]], e.l += r == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      t[1] = qr(e);
      break;
    case 2:
      t[1] = Mh(e, 0, { biff: r > 0 && r < 8 ? 2 : r });
      break;
    default:
      throw new Error("Bad SerAr: " + t[0]);
  }
  return t;
}
function $1(e, r, t) {
  for (var n = e.read_shift(t.biff == 12 ? 4 : 2), a = [], i = 0; i != n; ++i) a.push((t.biff == 12 ? kr : bh)(e));
  return a;
}
function V1(e, r, t) {
  var n = 0, a = 0;
  t.biff == 12 ? (n = e.read_shift(4), a = e.read_shift(4)) : (a = 1 + e.read_shift(1), n = 1 + e.read_shift(2)), t.biff >= 2 && t.biff < 8 && (--n, --a == 0 && (a = 256));
  for (var i = 0, s = []; i != n && (s[i] = []); ++i)
    for (var o = 0; o != a; ++o) s[i][o] = G1(e, t.biff);
  return s;
}
function z1(e, r, t) {
  var n = e.read_shift(1) >>> 5 & 3, a = !t || t.biff >= 8 ? 4 : 2, i = e.read_shift(a);
  switch (t.biff) {
    case 2:
      e.l += 5;
      break;
    case 3:
    case 4:
      e.l += 8;
      break;
    case 5:
      e.l += 12;
      break;
  }
  return [n, 0, i];
}
function X1(e, r, t) {
  if (t.biff == 5) return j1(e);
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(2), i = e.read_shift(4);
  return [n, a, i];
}
function j1(e) {
  var r = e.read_shift(1) >>> 5 & 3, t = e.read_shift(2, "i");
  e.l += 8;
  var n = e.read_shift(2);
  return e.l += 12, [r, t, n];
}
function Y1(e, r, t) {
  var n = e.read_shift(1) >>> 5 & 3;
  e.l += t && t.biff == 2 ? 3 : 4;
  var a = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return [n, a];
}
function K1(e, r, t) {
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return [n, a];
}
function J1(e, r, t) {
  var n = e.read_shift(1) >>> 5 & 3;
  return e.l += 4, t.biff < 8 && e.l--, t.biff == 12 && (e.l += 2), [n];
}
function Q1(e, r, t) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2), i = 4;
  if (t) switch (t.biff) {
    case 5:
      i = 15;
      break;
    case 12:
      i = 6;
      break;
  }
  return e.l += i, [n, a];
}
var Z1 = Bt, q1 = Bt, ex = Bt;
function Dn(e, r, t) {
  return e.l += 2, [x1(e)];
}
function Mi(e) {
  return e.l += 6, [];
}
var tx = Dn, rx = Mi, nx = Mi, ax = Dn;
function jo(e) {
  return e.l += 2, [Co(e), e.read_shift(2) & 1];
}
var ix = Dn, sx = jo, ox = Mi, fx = Dn, lx = Dn, cx = [
  "Data",
  "All",
  "Headers",
  "??",
  "?Data2",
  "??",
  "?DataHeaders",
  "??",
  "Totals",
  "??",
  "??",
  "??",
  "?DataTotals",
  "??",
  "??",
  "??",
  "?Current"
];
function hx(e) {
  e.l += 2;
  var r = e.read_shift(2), t = e.read_shift(2), n = e.read_shift(4), a = e.read_shift(2), i = e.read_shift(2), s = cx[t >> 2 & 31];
  return { ixti: r, coltype: t & 3, rt: s, idx: n, c: a, C: i };
}
function ux(e) {
  return e.l += 2, [e.read_shift(4)];
}
function xx(e, r, t) {
  return e.l += 5, e.l += 2, e.l += t.biff == 2 ? 1 : 4, ["PTGSHEET"];
}
function dx(e, r, t) {
  return e.l += t.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function mx(e) {
  var r = e.read_shift(1) >>> 5 & 3, t = e.read_shift(2);
  return [r, t];
}
function px(e) {
  var r = e.read_shift(1) >>> 5 & 3, t = e.read_shift(2);
  return [r, t];
}
function vx(e) {
  return e.l += 4, [0, 0];
}
var K0 = {
  /*::[*/
  1: { n: "PtgExp", f: L1 },
  /*::[*/
  2: { n: "PtgTbl", f: ex },
  /*::[*/
  3: { n: "PtgAdd", f: We },
  /*::[*/
  4: { n: "PtgSub", f: We },
  /*::[*/
  5: { n: "PtgMul", f: We },
  /*::[*/
  6: { n: "PtgDiv", f: We },
  /*::[*/
  7: { n: "PtgPower", f: We },
  /*::[*/
  8: { n: "PtgConcat", f: We },
  /*::[*/
  9: { n: "PtgLt", f: We },
  /*::[*/
  10: { n: "PtgLe", f: We },
  /*::[*/
  11: { n: "PtgEq", f: We },
  /*::[*/
  12: { n: "PtgGe", f: We },
  /*::[*/
  13: { n: "PtgGt", f: We },
  /*::[*/
  14: { n: "PtgNe", f: We },
  /*::[*/
  15: { n: "PtgIsect", f: We },
  /*::[*/
  16: { n: "PtgUnion", f: We },
  /*::[*/
  17: { n: "PtgRange", f: We },
  /*::[*/
  18: { n: "PtgUplus", f: We },
  /*::[*/
  19: { n: "PtgUminus", f: We },
  /*::[*/
  20: { n: "PtgPercent", f: We },
  /*::[*/
  21: { n: "PtgParen", f: We },
  /*::[*/
  22: { n: "PtgMissArg", f: We },
  /*::[*/
  23: { n: "PtgStr", f: H1 },
  /*::[*/
  26: { n: "PtgSheet", f: xx },
  /*::[*/
  27: { n: "PtgEndSheet", f: dx },
  /*::[*/
  28: { n: "PtgErr", f: B1 },
  /*::[*/
  29: { n: "PtgBool", f: U1 },
  /*::[*/
  30: { n: "PtgInt", f: b1 },
  /*::[*/
  31: { n: "PtgNum", f: W1 },
  /*::[*/
  32: { n: "PtgArray", f: T1 },
  /*::[*/
  33: { n: "PtgFunc", f: N1 },
  /*::[*/
  34: { n: "PtgFuncVar", f: D1 },
  /*::[*/
  35: { n: "PtgName", f: z1 },
  /*::[*/
  36: { n: "PtgRef", f: O1 },
  /*::[*/
  37: { n: "PtgArea", f: p1 },
  /*::[*/
  38: { n: "PtgMemArea", f: Y1 },
  /*::[*/
  39: { n: "PtgMemErr", f: Z1 },
  /*::[*/
  40: { n: "PtgMemNoMem", f: q1 },
  /*::[*/
  41: { n: "PtgMemFunc", f: K1 },
  /*::[*/
  42: { n: "PtgRefErr", f: J1 },
  /*::[*/
  43: { n: "PtgAreaErr", f: _1 },
  /*::[*/
  44: { n: "PtgRefN", f: R1 },
  /*::[*/
  45: { n: "PtgAreaN", f: w1 },
  /*::[*/
  46: { n: "PtgMemAreaN", f: mx },
  /*::[*/
  47: { n: "PtgMemNoMemN", f: px },
  /*::[*/
  57: { n: "PtgNameX", f: X1 },
  /*::[*/
  58: { n: "PtgRef3d", f: I1 },
  /*::[*/
  59: { n: "PtgArea3d", f: v1 },
  /*::[*/
  60: { n: "PtgRefErr3d", f: Q1 },
  /*::[*/
  61: { n: "PtgAreaErr3d", f: g1 },
  /*::[*/
  255: {}
}, _x = {
  /*::[*/
  64: 32,
  /*::[*/
  96: 32,
  /*::[*/
  65: 33,
  /*::[*/
  97: 33,
  /*::[*/
  66: 34,
  /*::[*/
  98: 34,
  /*::[*/
  67: 35,
  /*::[*/
  99: 35,
  /*::[*/
  68: 36,
  /*::[*/
  100: 36,
  /*::[*/
  69: 37,
  /*::[*/
  101: 37,
  /*::[*/
  70: 38,
  /*::[*/
  102: 38,
  /*::[*/
  71: 39,
  /*::[*/
  103: 39,
  /*::[*/
  72: 40,
  /*::[*/
  104: 40,
  /*::[*/
  73: 41,
  /*::[*/
  105: 41,
  /*::[*/
  74: 42,
  /*::[*/
  106: 42,
  /*::[*/
  75: 43,
  /*::[*/
  107: 43,
  /*::[*/
  76: 44,
  /*::[*/
  108: 44,
  /*::[*/
  77: 45,
  /*::[*/
  109: 45,
  /*::[*/
  78: 46,
  /*::[*/
  110: 46,
  /*::[*/
  79: 47,
  /*::[*/
  111: 47,
  /*::[*/
  88: 34,
  /*::[*/
  120: 34,
  /*::[*/
  89: 57,
  /*::[*/
  121: 57,
  /*::[*/
  90: 58,
  /*::[*/
  122: 58,
  /*::[*/
  91: 59,
  /*::[*/
  123: 59,
  /*::[*/
  92: 60,
  /*::[*/
  124: 60,
  /*::[*/
  93: 61,
  /*::[*/
  125: 61
}, gx = {
  /*::[*/
  1: { n: "PtgElfLel", f: jo },
  /*::[*/
  2: { n: "PtgElfRw", f: fx },
  /*::[*/
  3: { n: "PtgElfCol", f: tx },
  /*::[*/
  6: { n: "PtgElfRwV", f: lx },
  /*::[*/
  7: { n: "PtgElfColV", f: ax },
  /*::[*/
  10: { n: "PtgElfRadical", f: ix },
  /*::[*/
  11: { n: "PtgElfRadicalS", f: ox },
  /*::[*/
  13: { n: "PtgElfColS", f: rx },
  /*::[*/
  15: { n: "PtgElfColSV", f: nx },
  /*::[*/
  16: { n: "PtgElfRadicalLel", f: sx },
  /*::[*/
  25: { n: "PtgList", f: hx },
  /*::[*/
  29: { n: "PtgSxName", f: ux },
  /*::[*/
  255: {}
}, wx = {
  /*::[*/
  0: { n: "PtgAttrNoop", f: vx },
  /*::[*/
  1: { n: "PtgAttrSemi", f: C1 },
  /*::[*/
  2: { n: "PtgAttrIf", f: y1 },
  /*::[*/
  4: { n: "PtgAttrChoose", f: E1 },
  /*::[*/
  8: { n: "PtgAttrGoto", f: S1 },
  /*::[*/
  16: { n: "PtgAttrSum", f: M1 },
  /*::[*/
  32: { n: "PtgAttrBaxcel", f: Y0 },
  /*::[*/
  33: { n: "PtgAttrBaxcel", f: Y0 },
  /*::[*/
  64: { n: "PtgAttrSpace", f: A1 },
  /*::[*/
  65: { n: "PtgAttrSpaceSemi", f: k1 },
  /*::[*/
  128: { n: "PtgAttrIfError", f: F1 },
  /*::[*/
  255: {}
};
function Tx(e, r, t, n) {
  if (n.biff < 8) return Bt(e, r);
  for (var a = e.l + r, i = [], s = 0; s !== t.length; ++s)
    switch (t[s][0]) {
      case "PtgArray":
        t[s][1] = V1(e, 0, n), i.push(t[s][1]);
        break;
      case "PtgMemArea":
        t[s][2] = $1(e, t[s][1], n), i.push(t[s][2]);
        break;
      case "PtgExp":
        n && n.biff == 12 && (t[s][1][1] = e.read_shift(4), i.push(t[s][1]));
        break;
      case "PtgList":
      /* TODO: PtgList -> PtgExtraList */
      case "PtgElfRadicalS":
      /* TODO: PtgElfRadicalS -> PtgExtraElf */
      case "PtgElfColS":
      /* TODO: PtgElfColS -> PtgExtraElf */
      case "PtgElfColSV":
        throw "Unsupported " + t[s][0];
    }
  return r = a - e.l, r !== 0 && i.push(Bt(e, r)), i;
}
function Ex(e, r, t) {
  for (var n = e.l + r, a, i, s = []; n != e.l; )
    r = n - e.l, i = e[e.l], a = K0[i] || K0[_x[i]], (i === 24 || i === 25) && (a = (i === 24 ? gx : wx)[e[e.l + 1]]), !a || !a.f ? Bt(e, r) : s.push([a.n, a.f(e, r, t)]);
  return s;
}
function Sx(e) {
  for (var r = [], t = 0; t < e.length; ++t) {
    for (var n = e[t], a = [], i = 0; i < n.length; ++i) {
      var s = n[i];
      if (s) switch (s[0]) {
        // TODO: handle embedded quotes
        case 2:
          a.push('"' + s[1].replace(/"/g, '""') + '"');
          break;
        default:
          a.push(s[1]);
      }
      else a.push("");
    }
    r.push(a.join(","));
  }
  return r.join(";");
}
var yx = {
  PtgAdd: "+",
  PtgConcat: "&",
  PtgDiv: "/",
  PtgEq: "=",
  PtgGe: ">=",
  PtgGt: ">",
  PtgLe: "<=",
  PtgLt: "<",
  PtgMul: "*",
  PtgNe: "<>",
  PtgPower: "^",
  PtgSub: "-"
};
function Fx(e, r) {
  if (!e && !(r && r.biff <= 5 && r.biff >= 2)) throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e + "'" : e;
}
function Yo(e, r, t) {
  if (!e) return "SH33TJSERR0";
  if (t.biff > 8 && (!e.XTI || !e.XTI[r])) return e.SheetNames[r];
  if (!e.XTI) return "SH33TJSERR6";
  var n = e.XTI[r];
  if (t.biff < 8)
    return r > 1e4 && (r -= 65536), r < 0 && (r = -r), r == 0 ? "" : e.XTI[r - 1];
  if (!n) return "SH33TJSERR1";
  var a = "";
  if (t.biff > 8) switch (e[n[0]][0]) {
    case 357:
      return a = n[1] == -1 ? "#REF" : e.SheetNames[n[1]], n[1] == n[2] ? a : a + ":" + e.SheetNames[n[2]];
    case 358:
      return t.SID != null ? e.SheetNames[t.SID] : "SH33TJSSAME" + e[n[0]][0];
    case 355:
    /* 'BrtSupBookSrc' */
    /* falls through */
    default:
      return "SH33TJSSRC" + e[n[0]][0];
  }
  switch (e[n[0]][0][0]) {
    case 1025:
      return a = n[1] == -1 ? "#REF" : e.SheetNames[n[1]] || "SH33TJSERR3", n[1] == n[2] ? a : a + ":" + e.SheetNames[n[2]];
    case 14849:
      return e[n[0]].slice(1).map(function(i) {
        return i.Name;
      }).join(";;");
    //return "SH33TJSERR8";
    default:
      return e[n[0]][0][3] ? (a = n[1] == -1 ? "#REF" : e[n[0]][0][3][n[1]] || "SH33TJSERR4", n[1] == n[2] ? a : a + ":" + e[n[0]][0][3][n[2]]) : "SH33TJSERR2";
  }
}
function J0(e, r, t) {
  var n = Yo(e, r, t);
  return n == "#REF" ? n : Fx(n, t);
}
function Kr(e, r, t, n, a) {
  var i = a && a.biff || 8, s = (
    /*range != null ? range :*/
    { s: { c: 0, r: 0 } }
  ), o = [], l, f, c, d = 0, h = 0, u, v = "";
  if (!e[0] || !e[0][0]) return "";
  for (var x = -1, g = "", C = 0, O = e[0].length; C < O; ++C) {
    var F = e[0][C];
    switch (F[0]) {
      case "PtgUminus":
        o.push("-" + o.pop());
        break;
      case "PtgUplus":
        o.push("+" + o.pop());
        break;
      case "PtgPercent":
        o.push(o.pop() + "%");
        break;
      case "PtgAdd":
      /* [MS-XLS] 2.5.198.26 */
      case "PtgConcat":
      /* [MS-XLS] 2.5.198.43 */
      case "PtgDiv":
      /* [MS-XLS] 2.5.198.45 */
      case "PtgEq":
      /* [MS-XLS] 2.5.198.56 */
      case "PtgGe":
      /* [MS-XLS] 2.5.198.64 */
      case "PtgGt":
      /* [MS-XLS] 2.5.198.65 */
      case "PtgLe":
      /* [MS-XLS] 2.5.198.68 */
      case "PtgLt":
      /* [MS-XLS] 2.5.198.69 */
      case "PtgMul":
      /* [MS-XLS] 2.5.198.75 */
      case "PtgNe":
      /* [MS-XLS] 2.5.198.78 */
      case "PtgPower":
      /* [MS-XLS] 2.5.198.82 */
      case "PtgSub":
        if (l = o.pop(), f = o.pop(), x >= 0) {
          switch (e[0][x][1][0]) {
            case 0:
              g = Le(" ", e[0][x][1][1]);
              break;
            case 1:
              g = Le("\r", e[0][x][1][1]);
              break;
            default:
              if (g = "", a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][x][1][0]);
          }
          f = f + g, x = -1;
        }
        o.push(f + yx[F[0]] + l);
        break;
      case "PtgIsect":
        l = o.pop(), f = o.pop(), o.push(f + " " + l);
        break;
      case "PtgUnion":
        l = o.pop(), f = o.pop(), o.push(f + "," + l);
        break;
      case "PtgRange":
        l = o.pop(), f = o.pop(), o.push(f + ":" + l);
        break;
      case "PtgAttrChoose":
        break;
      case "PtgAttrGoto":
        break;
      case "PtgAttrIf":
        break;
      case "PtgAttrIfError":
        break;
      case "PtgRef":
        c = pn(F[1][1], s, a), o.push(vn(c, i));
        break;
      case "PtgRefN":
        c = t ? pn(F[1][1], t, a) : F[1][1], o.push(vn(c, i));
        break;
      case "PtgRef3d":
        d = /*::Number(*/
        F[1][1], c = pn(F[1][2], s, a), v = J0(n, d, a), o.push(v + "!" + vn(c, i));
        break;
      case "PtgFunc":
      /* [MS-XLS] 2.5.198.62 */
      case "PtgFuncVar":
        var L = F[1][0], Y = F[1][1];
        L || (L = 0), L &= 127;
        var q = L == 0 ? [] : o.slice(-L);
        o.length -= L, Y === "User" && (Y = q.shift()), o.push(Y + "(" + q.join(",") + ")");
        break;
      case "PtgBool":
        o.push(F[1] ? "TRUE" : "FALSE");
        break;
      case "PtgInt":
        o.push(
          /*::String(*/
          F[1]
          /*::)*/
        );
        break;
      case "PtgNum":
        o.push(String(F[1]));
        break;
      case "PtgStr":
        o.push('"' + F[1].replace(/"/g, '""') + '"');
        break;
      case "PtgErr":
        o.push(
          /*::String(*/
          F[1]
          /*::)*/
        );
        break;
      case "PtgAreaN":
        u = P0(F[1][1], t ? { s: t } : s, a), o.push(Da(u, a));
        break;
      case "PtgArea":
        u = P0(F[1][1], s, a), o.push(Da(u, a));
        break;
      case "PtgArea3d":
        d = /*::Number(*/
        F[1][1], u = F[1][2], v = J0(n, d, a), o.push(v + "!" + Da(u, a));
        break;
      case "PtgAttrSum":
        o.push("SUM(" + o.pop() + ")");
        break;
      case "PtgAttrBaxcel":
      /* [MS-XLS] 2.5.198.33 */
      case "PtgAttrSemi":
        break;
      case "PtgName":
        h = F[1][2];
        var R = (n.names || [])[h - 1] || (n[0] || [])[h], U = R ? R.Name : "SH33TJSNAME" + String(h);
        U && U.slice(0, 6) == "_xlfn." && !a.xlfn && (U = U.slice(6)), o.push(U);
        break;
      case "PtgNameX":
        var k = F[1][1];
        h = F[1][2];
        var W;
        if (a.biff <= 5)
          k < 0 && (k = -k), n[k] && (W = n[k][h]);
        else {
          var H = "";
          if (((n[k] || [])[0] || [])[0] == 14849 || (((n[k] || [])[0] || [])[0] == 1025 ? n[k][h] && n[k][h].itab > 0 && (H = n.SheetNames[n[k][h].itab - 1] + "!") : H = n.SheetNames[h - 1] + "!"), n[k] && n[k][h]) H += n[k][h].Name;
          else if (n[0] && n[0][h]) H += n[0][h].Name;
          else {
            var z = (Yo(n, k, a) || "").split(";;");
            z[h - 1] ? H = z[h - 1] : H += "SH33TJSERRX";
          }
          o.push(H);
          break;
        }
        W || (W = { Name: "SH33TJSERRY" }), o.push(W.Name);
        break;
      case "PtgParen":
        var ee = "(", Ce = ")";
        if (x >= 0) {
          switch (g = "", e[0][x][1][0]) {
            // $FlowIgnore
            case 2:
              ee = Le(" ", e[0][x][1][1]) + ee;
              break;
            // $FlowIgnore
            case 3:
              ee = Le("\r", e[0][x][1][1]) + ee;
              break;
            // $FlowIgnore
            case 4:
              Ce = Le(" ", e[0][x][1][1]) + Ce;
              break;
            // $FlowIgnore
            case 5:
              Ce = Le("\r", e[0][x][1][1]) + Ce;
              break;
            default:
              if (a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][x][1][0]);
          }
          x = -1;
        }
        o.push(ee + o.pop() + Ce);
        break;
      case "PtgRefErr":
        o.push("#REF!");
        break;
      case "PtgRefErr3d":
        o.push("#REF!");
        break;
      case "PtgExp":
        c = { c: F[1][1], r: F[1][0] };
        var he = { c: t.c, r: t.r };
        if (n.sharedf[Fe(c)]) {
          var Ye = n.sharedf[Fe(c)];
          o.push(Kr(Ye, s, he, n, a));
        } else {
          var be = !1;
          for (l = 0; l != n.arrayf.length; ++l)
            if (f = n.arrayf[l], !(c.c < f[0].s.c || c.c > f[0].e.c) && !(c.r < f[0].s.r || c.r > f[0].e.r)) {
              o.push(Kr(f[1], s, he, n, a)), be = !0;
              break;
            }
          be || o.push(
            /*::String(*/
            F[1]
            /*::)*/
          );
        }
        break;
      case "PtgArray":
        o.push("{" + Sx(
          /*::(*/
          F[1]
          /*:: :any)*/
        ) + "}");
        break;
      case "PtgMemArea":
        break;
      case "PtgAttrSpace":
      /* [MS-XLS] 2.5.198.38 */
      case "PtgAttrSpaceSemi":
        x = C;
        break;
      case "PtgTbl":
        break;
      case "PtgMemErr":
        break;
      case "PtgMissArg":
        o.push("");
        break;
      case "PtgAreaErr":
        o.push("#REF!");
        break;
      case "PtgAreaErr3d":
        o.push("#REF!");
        break;
      case "PtgList":
        o.push("Table" + F[1].idx + "[#" + F[1].rt + "]");
        break;
      case "PtgMemAreaN":
      case "PtgMemNoMemN":
      case "PtgAttrNoop":
      case "PtgSheet":
      case "PtgEndSheet":
        break;
      case "PtgMemFunc":
        break;
      case "PtgMemNoMem":
        break;
      case "PtgElfCol":
      /* [MS-XLS] 2.5.198.46 */
      case "PtgElfColS":
      /* [MS-XLS] 2.5.198.47 */
      case "PtgElfColSV":
      /* [MS-XLS] 2.5.198.48 */
      case "PtgElfColV":
      /* [MS-XLS] 2.5.198.49 */
      case "PtgElfLel":
      /* [MS-XLS] 2.5.198.50 */
      case "PtgElfRadical":
      /* [MS-XLS] 2.5.198.51 */
      case "PtgElfRadicalLel":
      /* [MS-XLS] 2.5.198.52 */
      case "PtgElfRadicalS":
      /* [MS-XLS] 2.5.198.53 */
      case "PtgElfRw":
      /* [MS-XLS] 2.5.198.54 */
      case "PtgElfRwV":
        throw new Error("Unsupported ELFs");
      case "PtgSxName":
        throw new Error("Unrecognized Formula Token: " + String(F));
      default:
        throw new Error("Unrecognized Formula Token: " + String(F));
    }
    var Ct = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (a.biff != 3 && x >= 0 && Ct.indexOf(e[0][C][0]) == -1) {
      F = e[0][x];
      var Ve = !0;
      switch (F[1][0]) {
        /* note: some bad XLSB files omit the PtgParen */
        case 4:
          Ve = !1;
        /* falls through */
        case 0:
          g = Le(" ", F[1][1]);
          break;
        case 5:
          Ve = !1;
        /* falls through */
        case 1:
          g = Le("\r", F[1][1]);
          break;
        default:
          if (g = "", a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + F[1][0]);
      }
      o.push((Ve ? g : "") + o.pop() + (Ve ? "" : g)), x = -1;
    }
  }
  if (o.length > 1 && a.WTF) throw new Error("bad formula stack");
  return o[0];
}
function Cx(e) {
  if (e == null) {
    var r = B(8);
    return r.write_shift(1, 3), r.write_shift(1, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 65535), r;
  } else if (typeof e == "number") return Er(e);
  return Er(0);
}
function Ax(e, r, t, n, a) {
  var i = Sr(r, t, a), s = Cx(e.v), o = B(6), l = 33;
  o.write_shift(2, l), o.write_shift(4, 0);
  for (var f = B(e.bf.length), c = 0; c < e.bf.length; ++c) f[c] = e.bf[c];
  var d = Qe([i, s, o, f]);
  return d;
}
function va(e, r, t) {
  var n = e.read_shift(4), a = Ex(e, n, t), i = e.read_shift(4), s = i > 0 ? Tx(e, i, a, t) : null;
  return [a, s];
}
var kx = va, _a = va, Ox = va, Rx = va, Ix = {
  0: "BEEP",
  1: "OPEN",
  2: "OPEN.LINKS",
  3: "CLOSE.ALL",
  4: "SAVE",
  5: "SAVE.AS",
  6: "FILE.DELETE",
  7: "PAGE.SETUP",
  8: "PRINT",
  9: "PRINTER.SETUP",
  10: "QUIT",
  11: "NEW.WINDOW",
  12: "ARRANGE.ALL",
  13: "WINDOW.SIZE",
  14: "WINDOW.MOVE",
  15: "FULL",
  16: "CLOSE",
  17: "RUN",
  22: "SET.PRINT.AREA",
  23: "SET.PRINT.TITLES",
  24: "SET.PAGE.BREAK",
  25: "REMOVE.PAGE.BREAK",
  26: "FONT",
  27: "DISPLAY",
  28: "PROTECT.DOCUMENT",
  29: "PRECISION",
  30: "A1.R1C1",
  31: "CALCULATE.NOW",
  32: "CALCULATION",
  34: "DATA.FIND",
  35: "EXTRACT",
  36: "DATA.DELETE",
  37: "SET.DATABASE",
  38: "SET.CRITERIA",
  39: "SORT",
  40: "DATA.SERIES",
  41: "TABLE",
  42: "FORMAT.NUMBER",
  43: "ALIGNMENT",
  44: "STYLE",
  45: "BORDER",
  46: "CELL.PROTECTION",
  47: "COLUMN.WIDTH",
  48: "UNDO",
  49: "CUT",
  50: "COPY",
  51: "PASTE",
  52: "CLEAR",
  53: "PASTE.SPECIAL",
  54: "EDIT.DELETE",
  55: "INSERT",
  56: "FILL.RIGHT",
  57: "FILL.DOWN",
  61: "DEFINE.NAME",
  62: "CREATE.NAMES",
  63: "FORMULA.GOTO",
  64: "FORMULA.FIND",
  65: "SELECT.LAST.CELL",
  66: "SHOW.ACTIVE.CELL",
  67: "GALLERY.AREA",
  68: "GALLERY.BAR",
  69: "GALLERY.COLUMN",
  70: "GALLERY.LINE",
  71: "GALLERY.PIE",
  72: "GALLERY.SCATTER",
  73: "COMBINATION",
  74: "PREFERRED",
  75: "ADD.OVERLAY",
  76: "GRIDLINES",
  77: "SET.PREFERRED",
  78: "AXES",
  79: "LEGEND",
  80: "ATTACH.TEXT",
  81: "ADD.ARROW",
  82: "SELECT.CHART",
  83: "SELECT.PLOT.AREA",
  84: "PATTERNS",
  85: "MAIN.CHART",
  86: "OVERLAY",
  87: "SCALE",
  88: "FORMAT.LEGEND",
  89: "FORMAT.TEXT",
  90: "EDIT.REPEAT",
  91: "PARSE",
  92: "JUSTIFY",
  93: "HIDE",
  94: "UNHIDE",
  95: "WORKSPACE",
  96: "FORMULA",
  97: "FORMULA.FILL",
  98: "FORMULA.ARRAY",
  99: "DATA.FIND.NEXT",
  100: "DATA.FIND.PREV",
  101: "FORMULA.FIND.NEXT",
  102: "FORMULA.FIND.PREV",
  103: "ACTIVATE",
  104: "ACTIVATE.NEXT",
  105: "ACTIVATE.PREV",
  106: "UNLOCKED.NEXT",
  107: "UNLOCKED.PREV",
  108: "COPY.PICTURE",
  109: "SELECT",
  110: "DELETE.NAME",
  111: "DELETE.FORMAT",
  112: "VLINE",
  113: "HLINE",
  114: "VPAGE",
  115: "HPAGE",
  116: "VSCROLL",
  117: "HSCROLL",
  118: "ALERT",
  119: "NEW",
  120: "CANCEL.COPY",
  121: "SHOW.CLIPBOARD",
  122: "MESSAGE",
  124: "PASTE.LINK",
  125: "APP.ACTIVATE",
  126: "DELETE.ARROW",
  127: "ROW.HEIGHT",
  128: "FORMAT.MOVE",
  129: "FORMAT.SIZE",
  130: "FORMULA.REPLACE",
  131: "SEND.KEYS",
  132: "SELECT.SPECIAL",
  133: "APPLY.NAMES",
  134: "REPLACE.FONT",
  135: "FREEZE.PANES",
  136: "SHOW.INFO",
  137: "SPLIT",
  138: "ON.WINDOW",
  139: "ON.DATA",
  140: "DISABLE.INPUT",
  142: "OUTLINE",
  143: "LIST.NAMES",
  144: "FILE.CLOSE",
  145: "SAVE.WORKBOOK",
  146: "DATA.FORM",
  147: "COPY.CHART",
  148: "ON.TIME",
  149: "WAIT",
  150: "FORMAT.FONT",
  151: "FILL.UP",
  152: "FILL.LEFT",
  153: "DELETE.OVERLAY",
  155: "SHORT.MENUS",
  159: "SET.UPDATE.STATUS",
  161: "COLOR.PALETTE",
  162: "DELETE.STYLE",
  163: "WINDOW.RESTORE",
  164: "WINDOW.MAXIMIZE",
  166: "CHANGE.LINK",
  167: "CALCULATE.DOCUMENT",
  168: "ON.KEY",
  169: "APP.RESTORE",
  170: "APP.MOVE",
  171: "APP.SIZE",
  172: "APP.MINIMIZE",
  173: "APP.MAXIMIZE",
  174: "BRING.TO.FRONT",
  175: "SEND.TO.BACK",
  185: "MAIN.CHART.TYPE",
  186: "OVERLAY.CHART.TYPE",
  187: "SELECT.END",
  188: "OPEN.MAIL",
  189: "SEND.MAIL",
  190: "STANDARD.FONT",
  191: "CONSOLIDATE",
  192: "SORT.SPECIAL",
  193: "GALLERY.3D.AREA",
  194: "GALLERY.3D.COLUMN",
  195: "GALLERY.3D.LINE",
  196: "GALLERY.3D.PIE",
  197: "VIEW.3D",
  198: "GOAL.SEEK",
  199: "WORKGROUP",
  200: "FILL.GROUP",
  201: "UPDATE.LINK",
  202: "PROMOTE",
  203: "DEMOTE",
  204: "SHOW.DETAIL",
  206: "UNGROUP",
  207: "OBJECT.PROPERTIES",
  208: "SAVE.NEW.OBJECT",
  209: "SHARE",
  210: "SHARE.NAME",
  211: "DUPLICATE",
  212: "APPLY.STYLE",
  213: "ASSIGN.TO.OBJECT",
  214: "OBJECT.PROTECTION",
  215: "HIDE.OBJECT",
  216: "SET.EXTRACT",
  217: "CREATE.PUBLISHER",
  218: "SUBSCRIBE.TO",
  219: "ATTRIBUTES",
  220: "SHOW.TOOLBAR",
  222: "PRINT.PREVIEW",
  223: "EDIT.COLOR",
  224: "SHOW.LEVELS",
  225: "FORMAT.MAIN",
  226: "FORMAT.OVERLAY",
  227: "ON.RECALC",
  228: "EDIT.SERIES",
  229: "DEFINE.STYLE",
  240: "LINE.PRINT",
  243: "ENTER.DATA",
  249: "GALLERY.RADAR",
  250: "MERGE.STYLES",
  251: "EDITION.OPTIONS",
  252: "PASTE.PICTURE",
  253: "PASTE.PICTURE.LINK",
  254: "SPELLING",
  256: "ZOOM",
  259: "INSERT.OBJECT",
  260: "WINDOW.MINIMIZE",
  265: "SOUND.NOTE",
  266: "SOUND.PLAY",
  267: "FORMAT.SHAPE",
  268: "EXTEND.POLYGON",
  269: "FORMAT.AUTO",
  272: "GALLERY.3D.BAR",
  273: "GALLERY.3D.SURFACE",
  274: "FILL.AUTO",
  276: "CUSTOMIZE.TOOLBAR",
  277: "ADD.TOOL",
  278: "EDIT.OBJECT",
  279: "ON.DOUBLECLICK",
  280: "ON.ENTRY",
  281: "WORKBOOK.ADD",
  282: "WORKBOOK.MOVE",
  283: "WORKBOOK.COPY",
  284: "WORKBOOK.OPTIONS",
  285: "SAVE.WORKSPACE",
  288: "CHART.WIZARD",
  289: "DELETE.TOOL",
  290: "MOVE.TOOL",
  291: "WORKBOOK.SELECT",
  292: "WORKBOOK.ACTIVATE",
  293: "ASSIGN.TO.TOOL",
  295: "COPY.TOOL",
  296: "RESET.TOOL",
  297: "CONSTRAIN.NUMERIC",
  298: "PASTE.TOOL",
  302: "WORKBOOK.NEW",
  305: "SCENARIO.CELLS",
  306: "SCENARIO.DELETE",
  307: "SCENARIO.ADD",
  308: "SCENARIO.EDIT",
  309: "SCENARIO.SHOW",
  310: "SCENARIO.SHOW.NEXT",
  311: "SCENARIO.SUMMARY",
  312: "PIVOT.TABLE.WIZARD",
  313: "PIVOT.FIELD.PROPERTIES",
  314: "PIVOT.FIELD",
  315: "PIVOT.ITEM",
  316: "PIVOT.ADD.FIELDS",
  318: "OPTIONS.CALCULATION",
  319: "OPTIONS.EDIT",
  320: "OPTIONS.VIEW",
  321: "ADDIN.MANAGER",
  322: "MENU.EDITOR",
  323: "ATTACH.TOOLBARS",
  324: "VBAActivate",
  325: "OPTIONS.CHART",
  328: "VBA.INSERT.FILE",
  330: "VBA.PROCEDURE.DEFINITION",
  336: "ROUTING.SLIP",
  338: "ROUTE.DOCUMENT",
  339: "MAIL.LOGON",
  342: "INSERT.PICTURE",
  343: "EDIT.TOOL",
  344: "GALLERY.DOUGHNUT",
  350: "CHART.TREND",
  352: "PIVOT.ITEM.PROPERTIES",
  354: "WORKBOOK.INSERT",
  355: "OPTIONS.TRANSITION",
  356: "OPTIONS.GENERAL",
  370: "FILTER.ADVANCED",
  373: "MAIL.ADD.MAILER",
  374: "MAIL.DELETE.MAILER",
  375: "MAIL.REPLY",
  376: "MAIL.REPLY.ALL",
  377: "MAIL.FORWARD",
  378: "MAIL.NEXT.LETTER",
  379: "DATA.LABEL",
  380: "INSERT.TITLE",
  381: "FONT.PROPERTIES",
  382: "MACRO.OPTIONS",
  383: "WORKBOOK.HIDE",
  384: "WORKBOOK.UNHIDE",
  385: "WORKBOOK.DELETE",
  386: "WORKBOOK.NAME",
  388: "GALLERY.CUSTOM",
  390: "ADD.CHART.AUTOFORMAT",
  391: "DELETE.CHART.AUTOFORMAT",
  392: "CHART.ADD.DATA",
  393: "AUTO.OUTLINE",
  394: "TAB.ORDER",
  395: "SHOW.DIALOG",
  396: "SELECT.ALL",
  397: "UNGROUP.SHEETS",
  398: "SUBTOTAL.CREATE",
  399: "SUBTOTAL.REMOVE",
  400: "RENAME.OBJECT",
  412: "WORKBOOK.SCROLL",
  413: "WORKBOOK.NEXT",
  414: "WORKBOOK.PREV",
  415: "WORKBOOK.TAB.SPLIT",
  416: "FULL.SCREEN",
  417: "WORKBOOK.PROTECT",
  420: "SCROLLBAR.PROPERTIES",
  421: "PIVOT.SHOW.PAGES",
  422: "TEXT.TO.COLUMNS",
  423: "FORMAT.CHARTTYPE",
  424: "LINK.FORMAT",
  425: "TRACER.DISPLAY",
  430: "TRACER.NAVIGATE",
  431: "TRACER.CLEAR",
  432: "TRACER.ERROR",
  433: "PIVOT.FIELD.GROUP",
  434: "PIVOT.FIELD.UNGROUP",
  435: "CHECKBOX.PROPERTIES",
  436: "LABEL.PROPERTIES",
  437: "LISTBOX.PROPERTIES",
  438: "EDITBOX.PROPERTIES",
  439: "PIVOT.REFRESH",
  440: "LINK.COMBO",
  441: "OPEN.TEXT",
  442: "HIDE.DIALOG",
  443: "SET.DIALOG.FOCUS",
  444: "ENABLE.OBJECT",
  445: "PUSHBUTTON.PROPERTIES",
  446: "SET.DIALOG.DEFAULT",
  447: "FILTER",
  448: "FILTER.SHOW.ALL",
  449: "CLEAR.OUTLINE",
  450: "FUNCTION.WIZARD",
  451: "ADD.LIST.ITEM",
  452: "SET.LIST.ITEM",
  453: "REMOVE.LIST.ITEM",
  454: "SELECT.LIST.ITEM",
  455: "SET.CONTROL.VALUE",
  456: "SAVE.COPY.AS",
  458: "OPTIONS.LISTS.ADD",
  459: "OPTIONS.LISTS.DELETE",
  460: "SERIES.AXES",
  461: "SERIES.X",
  462: "SERIES.Y",
  463: "ERRORBAR.X",
  464: "ERRORBAR.Y",
  465: "FORMAT.CHART",
  466: "SERIES.ORDER",
  467: "MAIL.LOGOFF",
  468: "CLEAR.ROUTING.SLIP",
  469: "APP.ACTIVATE.MICROSOFT",
  470: "MAIL.EDIT.MAILER",
  471: "ON.SHEET",
  472: "STANDARD.WIDTH",
  473: "SCENARIO.MERGE",
  474: "SUMMARY.INFO",
  475: "FIND.FILE",
  476: "ACTIVE.CELL.FONT",
  477: "ENABLE.TIPWIZARD",
  478: "VBA.MAKE.ADDIN",
  480: "INSERTDATATABLE",
  481: "WORKGROUP.OPTIONS",
  482: "MAIL.SEND.MAILER",
  485: "AUTOCORRECT",
  489: "POST.DOCUMENT",
  491: "PICKLIST",
  493: "VIEW.SHOW",
  494: "VIEW.DEFINE",
  495: "VIEW.DELETE",
  509: "SHEET.BACKGROUND",
  510: "INSERT.MAP.OBJECT",
  511: "OPTIONS.MENONO",
  517: "MSOCHECKS",
  518: "NORMAL",
  519: "LAYOUT",
  520: "RM.PRINT.AREA",
  521: "CLEAR.PRINT.AREA",
  522: "ADD.PRINT.AREA",
  523: "MOVE.BRK",
  545: "HIDECURR.NOTE",
  546: "HIDEALL.NOTES",
  547: "DELETE.NOTE",
  548: "TRAVERSE.NOTES",
  549: "ACTIVATE.NOTES",
  620: "PROTECT.REVISIONS",
  621: "UNPROTECT.REVISIONS",
  647: "OPTIONS.ME",
  653: "WEB.PUBLISH",
  667: "NEWWEBQUERY",
  673: "PIVOT.TABLE.CHART",
  753: "OPTIONS.SAVE",
  755: "OPTIONS.SPELL",
  808: "HIDEALL.INKANNOTS"
}, Ko = {
  0: "COUNT",
  1: "IF",
  2: "ISNA",
  3: "ISERROR",
  4: "SUM",
  5: "AVERAGE",
  6: "MIN",
  7: "MAX",
  8: "ROW",
  9: "COLUMN",
  10: "NA",
  11: "NPV",
  12: "STDEV",
  13: "DOLLAR",
  14: "FIXED",
  15: "SIN",
  16: "COS",
  17: "TAN",
  18: "ATAN",
  19: "PI",
  20: "SQRT",
  21: "EXP",
  22: "LN",
  23: "LOG10",
  24: "ABS",
  25: "INT",
  26: "SIGN",
  27: "ROUND",
  28: "LOOKUP",
  29: "INDEX",
  30: "REPT",
  31: "MID",
  32: "LEN",
  33: "VALUE",
  34: "TRUE",
  35: "FALSE",
  36: "AND",
  37: "OR",
  38: "NOT",
  39: "MOD",
  40: "DCOUNT",
  41: "DSUM",
  42: "DAVERAGE",
  43: "DMIN",
  44: "DMAX",
  45: "DSTDEV",
  46: "VAR",
  47: "DVAR",
  48: "TEXT",
  49: "LINEST",
  50: "TREND",
  51: "LOGEST",
  52: "GROWTH",
  53: "GOTO",
  54: "HALT",
  55: "RETURN",
  56: "PV",
  57: "FV",
  58: "NPER",
  59: "PMT",
  60: "RATE",
  61: "MIRR",
  62: "IRR",
  63: "RAND",
  64: "MATCH",
  65: "DATE",
  66: "TIME",
  67: "DAY",
  68: "MONTH",
  69: "YEAR",
  70: "WEEKDAY",
  71: "HOUR",
  72: "MINUTE",
  73: "SECOND",
  74: "NOW",
  75: "AREAS",
  76: "ROWS",
  77: "COLUMNS",
  78: "OFFSET",
  79: "ABSREF",
  80: "RELREF",
  81: "ARGUMENT",
  82: "SEARCH",
  83: "TRANSPOSE",
  84: "ERROR",
  85: "STEP",
  86: "TYPE",
  87: "ECHO",
  88: "SET.NAME",
  89: "CALLER",
  90: "DEREF",
  91: "WINDOWS",
  92: "SERIES",
  93: "DOCUMENTS",
  94: "ACTIVE.CELL",
  95: "SELECTION",
  96: "RESULT",
  97: "ATAN2",
  98: "ASIN",
  99: "ACOS",
  100: "CHOOSE",
  101: "HLOOKUP",
  102: "VLOOKUP",
  103: "LINKS",
  104: "INPUT",
  105: "ISREF",
  106: "GET.FORMULA",
  107: "GET.NAME",
  108: "SET.VALUE",
  109: "LOG",
  110: "EXEC",
  111: "CHAR",
  112: "LOWER",
  113: "UPPER",
  114: "PROPER",
  115: "LEFT",
  116: "RIGHT",
  117: "EXACT",
  118: "TRIM",
  119: "REPLACE",
  120: "SUBSTITUTE",
  121: "CODE",
  122: "NAMES",
  123: "DIRECTORY",
  124: "FIND",
  125: "CELL",
  126: "ISERR",
  127: "ISTEXT",
  128: "ISNUMBER",
  129: "ISBLANK",
  130: "T",
  131: "N",
  132: "FOPEN",
  133: "FCLOSE",
  134: "FSIZE",
  135: "FREADLN",
  136: "FREAD",
  137: "FWRITELN",
  138: "FWRITE",
  139: "FPOS",
  140: "DATEVALUE",
  141: "TIMEVALUE",
  142: "SLN",
  143: "SYD",
  144: "DDB",
  145: "GET.DEF",
  146: "REFTEXT",
  147: "TEXTREF",
  148: "INDIRECT",
  149: "REGISTER",
  150: "CALL",
  151: "ADD.BAR",
  152: "ADD.MENU",
  153: "ADD.COMMAND",
  154: "ENABLE.COMMAND",
  155: "CHECK.COMMAND",
  156: "RENAME.COMMAND",
  157: "SHOW.BAR",
  158: "DELETE.MENU",
  159: "DELETE.COMMAND",
  160: "GET.CHART.ITEM",
  161: "DIALOG.BOX",
  162: "CLEAN",
  163: "MDETERM",
  164: "MINVERSE",
  165: "MMULT",
  166: "FILES",
  167: "IPMT",
  168: "PPMT",
  169: "COUNTA",
  170: "CANCEL.KEY",
  171: "FOR",
  172: "WHILE",
  173: "BREAK",
  174: "NEXT",
  175: "INITIATE",
  176: "REQUEST",
  177: "POKE",
  178: "EXECUTE",
  179: "TERMINATE",
  180: "RESTART",
  181: "HELP",
  182: "GET.BAR",
  183: "PRODUCT",
  184: "FACT",
  185: "GET.CELL",
  186: "GET.WORKSPACE",
  187: "GET.WINDOW",
  188: "GET.DOCUMENT",
  189: "DPRODUCT",
  190: "ISNONTEXT",
  191: "GET.NOTE",
  192: "NOTE",
  193: "STDEVP",
  194: "VARP",
  195: "DSTDEVP",
  196: "DVARP",
  197: "TRUNC",
  198: "ISLOGICAL",
  199: "DCOUNTA",
  200: "DELETE.BAR",
  201: "UNREGISTER",
  204: "USDOLLAR",
  205: "FINDB",
  206: "SEARCHB",
  207: "REPLACEB",
  208: "LEFTB",
  209: "RIGHTB",
  210: "MIDB",
  211: "LENB",
  212: "ROUNDUP",
  213: "ROUNDDOWN",
  214: "ASC",
  215: "DBCS",
  216: "RANK",
  219: "ADDRESS",
  220: "DAYS360",
  221: "TODAY",
  222: "VDB",
  223: "ELSE",
  224: "ELSE.IF",
  225: "END.IF",
  226: "FOR.CELL",
  227: "MEDIAN",
  228: "SUMPRODUCT",
  229: "SINH",
  230: "COSH",
  231: "TANH",
  232: "ASINH",
  233: "ACOSH",
  234: "ATANH",
  235: "DGET",
  236: "CREATE.OBJECT",
  237: "VOLATILE",
  238: "LAST.ERROR",
  239: "CUSTOM.UNDO",
  240: "CUSTOM.REPEAT",
  241: "FORMULA.CONVERT",
  242: "GET.LINK.INFO",
  243: "TEXT.BOX",
  244: "INFO",
  245: "GROUP",
  246: "GET.OBJECT",
  247: "DB",
  248: "PAUSE",
  251: "RESUME",
  252: "FREQUENCY",
  253: "ADD.TOOLBAR",
  254: "DELETE.TOOLBAR",
  255: "User",
  256: "RESET.TOOLBAR",
  257: "EVALUATE",
  258: "GET.TOOLBAR",
  259: "GET.TOOL",
  260: "SPELLING.CHECK",
  261: "ERROR.TYPE",
  262: "APP.TITLE",
  263: "WINDOW.TITLE",
  264: "SAVE.TOOLBAR",
  265: "ENABLE.TOOL",
  266: "PRESS.TOOL",
  267: "REGISTER.ID",
  268: "GET.WORKBOOK",
  269: "AVEDEV",
  270: "BETADIST",
  271: "GAMMALN",
  272: "BETAINV",
  273: "BINOMDIST",
  274: "CHIDIST",
  275: "CHIINV",
  276: "COMBIN",
  277: "CONFIDENCE",
  278: "CRITBINOM",
  279: "EVEN",
  280: "EXPONDIST",
  281: "FDIST",
  282: "FINV",
  283: "FISHER",
  284: "FISHERINV",
  285: "FLOOR",
  286: "GAMMADIST",
  287: "GAMMAINV",
  288: "CEILING",
  289: "HYPGEOMDIST",
  290: "LOGNORMDIST",
  291: "LOGINV",
  292: "NEGBINOMDIST",
  293: "NORMDIST",
  294: "NORMSDIST",
  295: "NORMINV",
  296: "NORMSINV",
  297: "STANDARDIZE",
  298: "ODD",
  299: "PERMUT",
  300: "POISSON",
  301: "TDIST",
  302: "WEIBULL",
  303: "SUMXMY2",
  304: "SUMX2MY2",
  305: "SUMX2PY2",
  306: "CHITEST",
  307: "CORREL",
  308: "COVAR",
  309: "FORECAST",
  310: "FTEST",
  311: "INTERCEPT",
  312: "PEARSON",
  313: "RSQ",
  314: "STEYX",
  315: "SLOPE",
  316: "TTEST",
  317: "PROB",
  318: "DEVSQ",
  319: "GEOMEAN",
  320: "HARMEAN",
  321: "SUMSQ",
  322: "KURT",
  323: "SKEW",
  324: "ZTEST",
  325: "LARGE",
  326: "SMALL",
  327: "QUARTILE",
  328: "PERCENTILE",
  329: "PERCENTRANK",
  330: "MODE",
  331: "TRIMMEAN",
  332: "TINV",
  334: "MOVIE.COMMAND",
  335: "GET.MOVIE",
  336: "CONCATENATE",
  337: "POWER",
  338: "PIVOT.ADD.DATA",
  339: "GET.PIVOT.TABLE",
  340: "GET.PIVOT.FIELD",
  341: "GET.PIVOT.ITEM",
  342: "RADIANS",
  343: "DEGREES",
  344: "SUBTOTAL",
  345: "SUMIF",
  346: "COUNTIF",
  347: "COUNTBLANK",
  348: "SCENARIO.GET",
  349: "OPTIONS.LISTS.GET",
  350: "ISPMT",
  351: "DATEDIF",
  352: "DATESTRING",
  353: "NUMBERSTRING",
  354: "ROMAN",
  355: "OPEN.DIALOG",
  356: "SAVE.DIALOG",
  357: "VIEW.GET",
  358: "GETPIVOTDATA",
  359: "HYPERLINK",
  360: "PHONETIC",
  361: "AVERAGEA",
  362: "MAXA",
  363: "MINA",
  364: "STDEVPA",
  365: "VARPA",
  366: "STDEVA",
  367: "VARA",
  368: "BAHTTEXT",
  369: "THAIDAYOFWEEK",
  370: "THAIDIGIT",
  371: "THAIMONTHOFYEAR",
  372: "THAINUMSOUND",
  373: "THAINUMSTRING",
  374: "THAISTRINGLENGTH",
  375: "ISTHAIDIGIT",
  376: "ROUNDBAHTDOWN",
  377: "ROUNDBAHTUP",
  378: "THAIYEAR",
  379: "RTD",
  380: "CUBEVALUE",
  381: "CUBEMEMBER",
  382: "CUBEMEMBERPROPERTY",
  383: "CUBERANKEDMEMBER",
  384: "HEX2BIN",
  385: "HEX2DEC",
  386: "HEX2OCT",
  387: "DEC2BIN",
  388: "DEC2HEX",
  389: "DEC2OCT",
  390: "OCT2BIN",
  391: "OCT2HEX",
  392: "OCT2DEC",
  393: "BIN2DEC",
  394: "BIN2OCT",
  395: "BIN2HEX",
  396: "IMSUB",
  397: "IMDIV",
  398: "IMPOWER",
  399: "IMABS",
  400: "IMSQRT",
  401: "IMLN",
  402: "IMLOG2",
  403: "IMLOG10",
  404: "IMSIN",
  405: "IMCOS",
  406: "IMEXP",
  407: "IMARGUMENT",
  408: "IMCONJUGATE",
  409: "IMAGINARY",
  410: "IMREAL",
  411: "COMPLEX",
  412: "IMSUM",
  413: "IMPRODUCT",
  414: "SERIESSUM",
  415: "FACTDOUBLE",
  416: "SQRTPI",
  417: "QUOTIENT",
  418: "DELTA",
  419: "GESTEP",
  420: "ISEVEN",
  421: "ISODD",
  422: "MROUND",
  423: "ERF",
  424: "ERFC",
  425: "BESSELJ",
  426: "BESSELK",
  427: "BESSELY",
  428: "BESSELI",
  429: "XIRR",
  430: "XNPV",
  431: "PRICEMAT",
  432: "YIELDMAT",
  433: "INTRATE",
  434: "RECEIVED",
  435: "DISC",
  436: "PRICEDISC",
  437: "YIELDDISC",
  438: "TBILLEQ",
  439: "TBILLPRICE",
  440: "TBILLYIELD",
  441: "PRICE",
  442: "YIELD",
  443: "DOLLARDE",
  444: "DOLLARFR",
  445: "NOMINAL",
  446: "EFFECT",
  447: "CUMPRINC",
  448: "CUMIPMT",
  449: "EDATE",
  450: "EOMONTH",
  451: "YEARFRAC",
  452: "COUPDAYBS",
  453: "COUPDAYS",
  454: "COUPDAYSNC",
  455: "COUPNCD",
  456: "COUPNUM",
  457: "COUPPCD",
  458: "DURATION",
  459: "MDURATION",
  460: "ODDLPRICE",
  461: "ODDLYIELD",
  462: "ODDFPRICE",
  463: "ODDFYIELD",
  464: "RANDBETWEEN",
  465: "WEEKNUM",
  466: "AMORDEGRC",
  467: "AMORLINC",
  468: "CONVERT",
  724: "SHEETJS",
  469: "ACCRINT",
  470: "ACCRINTM",
  471: "WORKDAY",
  472: "NETWORKDAYS",
  473: "GCD",
  474: "MULTINOMIAL",
  475: "LCM",
  476: "FVSCHEDULE",
  477: "CUBEKPIMEMBER",
  478: "CUBESET",
  479: "CUBESETCOUNT",
  480: "IFERROR",
  481: "COUNTIFS",
  482: "SUMIFS",
  483: "AVERAGEIF",
  484: "AVERAGEIFS"
}, Nx = {
  2: 1,
  3: 1,
  10: 0,
  15: 1,
  16: 1,
  17: 1,
  18: 1,
  19: 0,
  20: 1,
  21: 1,
  22: 1,
  23: 1,
  24: 1,
  25: 1,
  26: 1,
  27: 2,
  30: 2,
  31: 3,
  32: 1,
  33: 1,
  34: 0,
  35: 0,
  38: 1,
  39: 2,
  40: 3,
  41: 3,
  42: 3,
  43: 3,
  44: 3,
  45: 3,
  47: 3,
  48: 2,
  53: 1,
  61: 3,
  63: 0,
  65: 3,
  66: 3,
  67: 1,
  68: 1,
  69: 1,
  70: 1,
  71: 1,
  72: 1,
  73: 1,
  74: 0,
  75: 1,
  76: 1,
  77: 1,
  79: 2,
  80: 2,
  83: 1,
  85: 0,
  86: 1,
  89: 0,
  90: 1,
  94: 0,
  95: 0,
  97: 2,
  98: 1,
  99: 1,
  101: 3,
  102: 3,
  105: 1,
  106: 1,
  108: 2,
  111: 1,
  112: 1,
  113: 1,
  114: 1,
  117: 2,
  118: 1,
  119: 4,
  121: 1,
  126: 1,
  127: 1,
  128: 1,
  129: 1,
  130: 1,
  131: 1,
  133: 1,
  134: 1,
  135: 1,
  136: 2,
  137: 2,
  138: 2,
  140: 1,
  141: 1,
  142: 3,
  143: 4,
  144: 4,
  161: 1,
  162: 1,
  163: 1,
  164: 1,
  165: 2,
  172: 1,
  175: 2,
  176: 2,
  177: 3,
  178: 2,
  179: 1,
  184: 1,
  186: 1,
  189: 3,
  190: 1,
  195: 3,
  196: 3,
  197: 1,
  198: 1,
  199: 3,
  201: 1,
  207: 4,
  210: 3,
  211: 1,
  212: 2,
  213: 2,
  214: 1,
  215: 1,
  225: 0,
  229: 1,
  230: 1,
  231: 1,
  232: 1,
  233: 1,
  234: 1,
  235: 3,
  244: 1,
  247: 4,
  252: 2,
  257: 1,
  261: 1,
  271: 1,
  273: 4,
  274: 2,
  275: 2,
  276: 2,
  277: 3,
  278: 3,
  279: 1,
  280: 3,
  281: 3,
  282: 3,
  283: 1,
  284: 1,
  285: 2,
  286: 4,
  287: 3,
  288: 2,
  289: 4,
  290: 3,
  291: 3,
  292: 3,
  293: 4,
  294: 1,
  295: 3,
  296: 1,
  297: 3,
  298: 1,
  299: 2,
  300: 3,
  301: 3,
  302: 4,
  303: 2,
  304: 2,
  305: 2,
  306: 2,
  307: 2,
  308: 2,
  309: 3,
  310: 2,
  311: 2,
  312: 2,
  313: 2,
  314: 2,
  315: 2,
  316: 4,
  325: 2,
  326: 2,
  327: 2,
  328: 2,
  331: 2,
  332: 2,
  337: 2,
  342: 1,
  343: 1,
  346: 2,
  347: 1,
  350: 4,
  351: 3,
  352: 1,
  353: 2,
  360: 1,
  368: 1,
  369: 1,
  370: 1,
  371: 1,
  372: 1,
  373: 1,
  374: 1,
  375: 1,
  376: 1,
  377: 1,
  378: 1,
  382: 3,
  385: 1,
  392: 1,
  393: 1,
  396: 2,
  397: 2,
  398: 2,
  399: 1,
  400: 1,
  401: 1,
  402: 1,
  403: 1,
  404: 1,
  405: 1,
  406: 1,
  407: 1,
  408: 1,
  409: 1,
  410: 1,
  414: 4,
  415: 1,
  416: 1,
  417: 2,
  420: 1,
  421: 1,
  422: 2,
  424: 1,
  425: 2,
  426: 2,
  427: 2,
  428: 2,
  430: 3,
  438: 3,
  439: 3,
  440: 3,
  443: 2,
  444: 2,
  445: 2,
  446: 2,
  447: 6,
  448: 6,
  449: 2,
  450: 2,
  464: 2,
  468: 3,
  476: 2,
  479: 1,
  480: 2,
  65535: 0
};
function Dx(e) {
  var r = "of:=" + e.replace(Di, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
  return r.replace(/;/g, "|").replace(/,/g, ";");
}
function Px(e) {
  return e.replace(/\./, "!");
}
var _n = typeof Map < "u";
function Li(e, r, t) {
  var n = 0, a = e.length;
  if (t) {
    if (_n ? t.has(r) : Object.prototype.hasOwnProperty.call(t, r)) {
      for (var i = _n ? t.get(r) : t[r]; n < i.length; ++n)
        if (e[i[n]].t === r)
          return e.Count++, i[n];
    }
  } else for (; n < a; ++n)
    if (e[n].t === r)
      return e.Count++, n;
  return e[a] = { t: r }, e.Count++, e.Unique++, t && (_n ? (t.has(r) || t.set(r, []), t.get(r).push(a)) : (Object.prototype.hasOwnProperty.call(t, r) || (t[r] = []), t[r].push(a))), a;
}
function ga(e, r) {
  var t = { min: e + 1, max: e + 1 }, n = -1;
  return r.MDW && (Vt = r.MDW), r.width != null ? t.customWidth = 1 : r.wpx != null ? n = fa(r.wpx) : r.wch != null && (n = r.wch), n > -1 ? (t.width = hi(n), t.customWidth = 1) : r.width != null && (t.width = r.width), r.hidden && (t.hidden = !0), r.level != null && (t.outlineLevel = t.level = r.level), t;
}
function Jo(e, r) {
  if (e) {
    var t = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    e.left == null && (e.left = t[0]), e.right == null && (e.right = t[1]), e.top == null && (e.top = t[2]), e.bottom == null && (e.bottom = t[3]), e.header == null && (e.header = t[4]), e.footer == null && (e.footer = t[5]);
  }
}
function lr(e, r, t) {
  var n = t.revssf[r.z != null ? r.z : "General"], a = 60, i = e.length;
  if (n == null && t.ssf) {
    for (; a < 392; ++a) if (t.ssf[a] == null) {
      Vs(r.z, a), t.ssf[a] = r.z, t.revssf[r.z] = n = a;
      break;
    }
  }
  for (a = 0; a != i; ++a) if (e[a].numFmtId === n) return a;
  return e[i] = {
    numFmtId: n,
    fontId: 0,
    fillId: 0,
    borderId: 0,
    xfId: 0,
    applyNumberFormat: 1
  }, i;
}
function Mx(e, r, t) {
  if (e && e["!ref"]) {
    var n = Ne(e["!ref"]);
    if (n.e.c < n.s.c || n.e.r < n.s.r) throw new Error("Bad range (" + t + "): " + e["!ref"]);
  }
}
function Lx(e) {
  if (e.length === 0) return "";
  for (var r = '<mergeCells count="' + e.length + '">', t = 0; t != e.length; ++t) r += '<mergeCell ref="' + He(e[t]) + '"/>';
  return r + "</mergeCells>";
}
function Bx(e, r, t, n, a) {
  var i = !1, s = {}, o = null;
  if (n.bookType !== "xlsx" && r.vbaraw) {
    var l = r.SheetNames[t];
    try {
      r.Workbook && (l = r.Workbook.Sheets[t].CodeName || l);
    } catch {
    }
    i = !0, s.codeName = Sn(ye(l));
  }
  if (e && e["!outline"]) {
    var f = { summaryBelow: 1, summaryRight: 1 };
    e["!outline"].above && (f.summaryBelow = 0), e["!outline"].left && (f.summaryRight = 0), o = (o || "") + J("outlinePr", null, f);
  }
  !i && !o || (a[a.length] = J("sheetPr", o, s));
}
var bx = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"], Ux = [
  "formatColumns",
  "formatRows",
  "formatCells",
  "insertColumns",
  "insertRows",
  "insertHyperlinks",
  "deleteColumns",
  "deleteRows",
  "sort",
  "autoFilter",
  "pivotTables"
];
function Wx(e) {
  var r = { sheet: 1 };
  return bx.forEach(function(t) {
    e[t] != null && e[t] && (r[t] = "1");
  }), Ux.forEach(function(t) {
    e[t] != null && !e[t] && (r[t] = "0");
  }), e.password && (r.password = Do(e.password).toString(16).toUpperCase()), J("sheetProtection", null, r);
}
function Hx(e) {
  return Jo(e), J("pageMargins", null, e);
}
function Gx(e, r) {
  for (var t = ["<cols>"], n, a = 0; a != r.length; ++a)
    (n = r[a]) && (t[t.length] = J("col", null, ga(a, n)));
  return t[t.length] = "</cols>", t.join("");
}
function $x(e, r, t, n) {
  var a = typeof e.ref == "string" ? e.ref : He(e.ref);
  t.Workbook || (t.Workbook = { Sheets: [] }), t.Workbook.Names || (t.Workbook.Names = []);
  var i = t.Workbook.Names, s = gt(a);
  s.s.r == s.e.r && (s.e.r = gt(r["!ref"]).e.r, a = He(s));
  for (var o = 0; o < i.length; ++o) {
    var l = i[o];
    if (l.Name == "_xlnm._FilterDatabase" && l.Sheet == n) {
      l.Ref = "'" + t.SheetNames[n] + "'!" + a;
      break;
    }
  }
  return o == i.length && i.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + t.SheetNames[n] + "'!" + a }), J("autoFilter", null, { ref: a });
}
function Vx(e, r, t, n) {
  var a = { workbookViewId: "0" };
  return (((n || {}).Workbook || {}).Views || [])[0] && (a.rightToLeft = n.Workbook.Views[0].RTL ? "1" : "0"), J("sheetViews", J("sheetView", null, a), {});
}
function zx(e, r, t, n) {
  if (e.c && t["!comments"].push([r, e.c]), e.v === void 0 && typeof e.f != "string" || e.t === "z" && !e.f) return "";
  var a = "", i = e.t, s = e.v;
  if (e.t !== "z") switch (e.t) {
    case "b":
      a = e.v ? "1" : "0";
      break;
    case "n":
      a = "" + e.v;
      break;
    case "e":
      a = Nn[e.v];
      break;
    case "d":
      n && n.cellDates ? a = lt(e.v, -1).toISOString() : (e = xt(e), e.t = "n", a = "" + (e.v = ut(lt(e.v)))), typeof e.z > "u" && (e.z = Be[14]);
      break;
    default:
      a = e.v;
      break;
  }
  var o = Ze("v", ye(a)), l = { r }, f = lr(n.cellXfs, e, n);
  switch (f !== 0 && (l.s = f), e.t) {
    case "n":
      break;
    case "d":
      l.t = "d";
      break;
    case "b":
      l.t = "b";
      break;
    case "e":
      l.t = "e";
      break;
    case "z":
      break;
    default:
      if (e.v == null) {
        delete e.t;
        break;
      }
      if (e.v.length > 32767) throw new Error("Text length must not exceed 32767 characters");
      if (n && n.bookSST) {
        o = Ze("v", "" + Li(n.Strings, e.v, n.revStrings)), l.t = "s";
        break;
      }
      l.t = "str";
      break;
  }
  if (e.t != i && (e.t = i, e.v = s), typeof e.f == "string" && e.f) {
    var c = e.F && e.F.slice(0, r.length) == r ? { t: "array", ref: e.F } : null;
    o = J("f", ye(e.f), c) + (e.v != null ? o : "");
  }
  return e.l && t["!links"].push([r, e.l]), e.D && (l.cm = 1), J("c", o, l);
}
function Xx(e, r, t, n) {
  var a = [], i = [], s = Ne(e["!ref"]), o = "", l, f = "", c = [], d = 0, h = 0, u = e["!rows"], v = Array.isArray(e), x = { r: f }, g, C = -1;
  for (h = s.s.c; h <= s.e.c; ++h) c[h] = rt(h);
  for (d = s.s.r; d <= s.e.r; ++d) {
    for (i = [], f = qe(d), h = s.s.c; h <= s.e.c; ++h) {
      l = c[h] + f;
      var O = v ? (e[d] || [])[h] : e[l];
      O !== void 0 && (o = zx(O, l, e, r)) != null && i.push(o);
    }
    (i.length > 0 || u && u[d]) && (x = { r: f }, u && u[d] && (g = u[d], g.hidden && (x.hidden = 1), C = -1, g.hpx ? C = la(g.hpx) : g.hpt && (C = g.hpt), C > -1 && (x.ht = C, x.customHeight = 1), g.level && (x.outlineLevel = g.level)), a[a.length] = J("row", i.join(""), x));
  }
  if (u) for (; d < u.length; ++d)
    u && u[d] && (x = { r: d + 1 }, g = u[d], g.hidden && (x.hidden = 1), C = -1, g.hpx ? C = la(g.hpx) : g.hpt && (C = g.hpt), C > -1 && (x.ht = C, x.customHeight = 1), g.level && (x.outlineLevel = g.level), a[a.length] = J("row", "", x));
  return a.join("");
}
function Qo(e, r, t, n) {
  var a = [Ge, J("worksheet", null, {
    xmlns: Jr[0],
    "xmlns:r": ze.r
  })], i = t.SheetNames[e], s = 0, o = "", l = t.Sheets[i];
  l == null && (l = {});
  var f = l["!ref"] || "A1", c = Ne(f);
  if (c.e.c > 16383 || c.e.r > 1048575) {
    if (r.WTF) throw new Error("Range " + f + " exceeds format limit A1:XFD1048576");
    c.e.c = Math.min(c.e.c, 16383), c.e.r = Math.min(c.e.c, 1048575), f = He(c);
  }
  n || (n = {}), l["!comments"] = [];
  var d = [];
  Bx(l, t, e, r, a), a[a.length] = J("dimension", null, { ref: f }), a[a.length] = Vx(l, r, e, t), r.sheetFormat && (a[a.length] = J("sheetFormatPr", null, {
    defaultRowHeight: r.sheetFormat.defaultRowHeight || "16",
    baseColWidth: r.sheetFormat.baseColWidth || "10",
    outlineLevelRow: r.sheetFormat.outlineLevelRow || "7"
  })), l["!cols"] != null && l["!cols"].length > 0 && (a[a.length] = Gx(l, l["!cols"])), a[s = a.length] = "<sheetData/>", l["!links"] = [], l["!ref"] != null && (o = Xx(l, r), o.length > 0 && (a[a.length] = o)), a.length > s + 1 && (a[a.length] = "</sheetData>", a[s] = a[s].replace("/>", ">")), l["!protect"] && (a[a.length] = Wx(l["!protect"])), l["!autofilter"] != null && (a[a.length] = $x(l["!autofilter"], l, t, e)), l["!merges"] != null && l["!merges"].length > 0 && (a[a.length] = Lx(l["!merges"]));
  var h = -1, u, v = -1;
  return (
    /*::(*/
    l["!links"].length > 0 && (a[a.length] = "<hyperlinks>", l["!links"].forEach(function(x) {
      x[1].Target && (u = { ref: x[0] }, x[1].Target.charAt(0) != "#" && (v = Se(n, -1, ye(x[1].Target).replace(/#.*$/, ""), ve.HLINK), u["r:id"] = "rId" + v), (h = x[1].Target.indexOf("#")) > -1 && (u.location = ye(x[1].Target.slice(h + 1))), x[1].Tooltip && (u.tooltip = ye(x[1].Tooltip)), a[a.length] = J("hyperlink", null, u));
    }), a[a.length] = "</hyperlinks>"), delete l["!links"], l["!margins"] != null && (a[a.length] = Hx(l["!margins"])), (!r || r.ignoreEC || r.ignoreEC == null) && (a[a.length] = Ze("ignoredErrors", J("ignoredError", null, { numberStoredAsText: 1, sqref: f }))), d.length > 0 && (v = Se(n, -1, "../drawings/drawing" + (e + 1) + ".xml", ve.DRAW), a[a.length] = J("drawing", null, { "r:id": "rId" + v }), l["!drawing"] = d), l["!comments"].length > 0 && (v = Se(n, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", ve.VML), a[a.length] = J("legacyDrawing", null, { "r:id": "rId" + v }), l["!legacy"] = v), a.length > 1 && (a[a.length] = "</worksheet>", a[1] = a[1].replace("/>", ">")), a.join("")
  );
}
function jx(e, r) {
  var t = {}, n = e.l + r;
  t.r = e.read_shift(4), e.l += 4;
  var a = e.read_shift(2);
  e.l += 1;
  var i = e.read_shift(1);
  return e.l = n, i & 7 && (t.level = i & 7), i & 16 && (t.hidden = !0), i & 32 && (t.hpt = a / 20), t;
}
function Yx(e, r, t) {
  var n = B(145), a = (t["!rows"] || [])[e] || {};
  n.write_shift(4, e), n.write_shift(4, 0);
  var i = 320;
  a.hpx ? i = la(a.hpx) * 20 : a.hpt && (i = a.hpt * 20), n.write_shift(2, i), n.write_shift(1, 0);
  var s = 0;
  a.level && (s |= a.level), a.hidden && (s |= 16), (a.hpx || a.hpt) && (s |= 32), n.write_shift(1, s), n.write_shift(1, 0);
  var o = 0, l = n.l;
  n.l += 4;
  for (var f = { r: e, c: 0 }, c = 0; c < 16; ++c)
    if (!(r.s.c > c + 1 << 10 || r.e.c < c << 10)) {
      for (var d = -1, h = -1, u = c << 10; u < c + 1 << 10; ++u) {
        f.c = u;
        var v = Array.isArray(t) ? (t[f.r] || [])[f.c] : t[Fe(f)];
        v && (d < 0 && (d = u), h = u);
      }
      d < 0 || (++o, n.write_shift(4, d), n.write_shift(4, h));
    }
  var x = n.l;
  return n.l = l, n.write_shift(4, o), n.l = x, n.length > n.l ? n.slice(0, n.l) : n;
}
function Kx(e, r, t, n) {
  var a = Yx(n, t, r);
  (a.length > 17 || (r["!rows"] || [])[n]) && G(e, 0, a);
}
var Jx = kr, Qx = Zr;
function Zx() {
}
function qx(e, r) {
  var t = {}, n = e[e.l];
  return ++e.l, t.above = !(n & 64), t.left = !(n & 128), e.l += 18, t.name = lh(e), t;
}
function ed(e, r, t) {
  t == null && (t = B(84 + 4 * e.length));
  var n = 192;
  r && (r.above && (n &= -65), r.left && (n &= -129)), t.write_shift(1, n);
  for (var a = 1; a < 3; ++a) t.write_shift(1, 0);
  return ia({ auto: 1 }, t), t.write_shift(-4, -1), t.write_shift(-4, -1), ho(e, t), t.slice(0, t.l);
}
function td(e) {
  var r = Ft(e);
  return [r];
}
function rd(e, r, t) {
  return t == null && (t = B(8)), Fr(r, t);
}
function nd(e) {
  var r = Cr(e);
  return [r];
}
function ad(e, r, t) {
  return t == null && (t = B(4)), Ar(r, t);
}
function id(e) {
  var r = Ft(e), t = e.read_shift(1);
  return [r, t, "b"];
}
function sd(e, r, t) {
  return t == null && (t = B(9)), Fr(r, t), t.write_shift(1, e.v ? 1 : 0), t;
}
function od(e) {
  var r = Cr(e), t = e.read_shift(1);
  return [r, t, "b"];
}
function fd(e, r, t) {
  return t == null && (t = B(5)), Ar(r, t), t.write_shift(1, e.v ? 1 : 0), t;
}
function ld(e) {
  var r = Ft(e), t = e.read_shift(1);
  return [r, t, "e"];
}
function cd(e, r, t) {
  return t == null && (t = B(9)), Fr(r, t), t.write_shift(1, e.v), t;
}
function hd(e) {
  var r = Cr(e), t = e.read_shift(1);
  return [r, t, "e"];
}
function ud(e, r, t) {
  return t == null && (t = B(8)), Ar(r, t), t.write_shift(1, e.v), t.write_shift(2, 0), t.write_shift(1, 0), t;
}
function xd(e) {
  var r = Ft(e), t = e.read_shift(4);
  return [r, t, "s"];
}
function dd(e, r, t) {
  return t == null && (t = B(12)), Fr(r, t), t.write_shift(4, r.v), t;
}
function md(e) {
  var r = Cr(e), t = e.read_shift(4);
  return [r, t, "s"];
}
function pd(e, r, t) {
  return t == null && (t = B(8)), Ar(r, t), t.write_shift(4, r.v), t;
}
function vd(e) {
  var r = Ft(e), t = qr(e);
  return [r, t, "n"];
}
function _d(e, r, t) {
  return t == null && (t = B(16)), Fr(r, t), Er(e.v, t), t;
}
function gd(e) {
  var r = Cr(e), t = qr(e);
  return [r, t, "n"];
}
function wd(e, r, t) {
  return t == null && (t = B(12)), Ar(r, t), Er(e.v, t), t;
}
function Td(e) {
  var r = Ft(e), t = uo(e);
  return [r, t, "n"];
}
function Ed(e, r, t) {
  return t == null && (t = B(12)), Fr(r, t), xo(e.v, t), t;
}
function Sd(e) {
  var r = Cr(e), t = uo(e);
  return [r, t, "n"];
}
function yd(e, r, t) {
  return t == null && (t = B(8)), Ar(r, t), xo(e.v, t), t;
}
function Fd(e) {
  var r = Ft(e), t = ki(e);
  return [r, t, "is"];
}
function Cd(e) {
  var r = Ft(e), t = nt(e);
  return [r, t, "str"];
}
function Ad(e, r, t) {
  return t == null && (t = B(12 + 4 * e.v.length)), Fr(r, t), je(e.v, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function kd(e) {
  var r = Cr(e), t = nt(e);
  return [r, t, "str"];
}
function Od(e, r, t) {
  return t == null && (t = B(8 + 4 * e.v.length)), Ar(r, t), je(e.v, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Rd(e, r, t) {
  var n = e.l + r, a = Ft(e);
  a.r = t["!row"];
  var i = e.read_shift(1), s = [a, i, "b"];
  if (t.cellFormula) {
    e.l += 2;
    var o = _a(e, n - e.l, t);
    s[3] = Kr(o, null, a, t.supbooks, t);
  } else e.l = n;
  return s;
}
function Id(e, r, t) {
  var n = e.l + r, a = Ft(e);
  a.r = t["!row"];
  var i = e.read_shift(1), s = [a, i, "e"];
  if (t.cellFormula) {
    e.l += 2;
    var o = _a(e, n - e.l, t);
    s[3] = Kr(o, null, a, t.supbooks, t);
  } else e.l = n;
  return s;
}
function Nd(e, r, t) {
  var n = e.l + r, a = Ft(e);
  a.r = t["!row"];
  var i = qr(e), s = [a, i, "n"];
  if (t.cellFormula) {
    e.l += 2;
    var o = _a(e, n - e.l, t);
    s[3] = Kr(o, null, a, t.supbooks, t);
  } else e.l = n;
  return s;
}
function Dd(e, r, t) {
  var n = e.l + r, a = Ft(e);
  a.r = t["!row"];
  var i = nt(e), s = [a, i, "str"];
  if (t.cellFormula) {
    e.l += 2;
    var o = _a(e, n - e.l, t);
    s[3] = Kr(o, null, a, t.supbooks, t);
  } else e.l = n;
  return s;
}
var Pd = kr, Md = Zr;
function Ld(e, r) {
  return r == null && (r = B(4)), r.write_shift(4, e), r;
}
function Bd(e, r) {
  var t = e.l + r, n = kr(e), a = Oi(e), i = nt(e), s = nt(e), o = nt(e);
  e.l = t;
  var l = { rfx: n, relId: a, loc: i, display: o };
  return s && (l.Tooltip = s), l;
}
function bd(e, r) {
  var t = B(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
  Zr({ s: Xe(e[0]), e: Xe(e[0]) }, t), Ri("rId" + r, t);
  var n = e[1].Target.indexOf("#"), a = n == -1 ? "" : e[1].Target.slice(n + 1);
  return je(a || "", t), je(e[1].Tooltip || "", t), je("", t), t.slice(0, t.l);
}
function Ud() {
}
function Wd(e, r, t) {
  var n = e.l + r, a = mo(e), i = e.read_shift(1), s = [a];
  if (s[2] = i, t.cellFormula) {
    var o = kx(e, n - e.l, t);
    s[1] = o;
  } else e.l = n;
  return s;
}
function Hd(e, r, t) {
  var n = e.l + r, a = kr(e), i = [a];
  if (t.cellFormula) {
    var s = Rx(e, n - e.l, t);
    i[1] = s, e.l = n;
  } else e.l = n;
  return i;
}
function Gd(e, r, t) {
  t == null && (t = B(18));
  var n = ga(e, r);
  t.write_shift(-4, e), t.write_shift(-4, e), t.write_shift(4, (n.width || 10) * 256), t.write_shift(
    4,
    0
    /*ixfe*/
  );
  var a = 0;
  return r.hidden && (a |= 1), typeof n.width == "number" && (a |= 2), r.level && (a |= r.level << 8), t.write_shift(2, a), t;
}
var Zo = ["left", "right", "top", "bottom", "header", "footer"];
function $d(e) {
  var r = {};
  return Zo.forEach(function(t) {
    r[t] = qr(e);
  }), r;
}
function Vd(e, r) {
  return r == null && (r = B(48)), Jo(e), Zo.forEach(function(t) {
    Er(e[t], r);
  }), r;
}
function zd(e) {
  var r = e.read_shift(2);
  return e.l += 28, { RTL: r & 32 };
}
function Xd(e, r, t) {
  t == null && (t = B(30));
  var n = 924;
  return (((r || {}).Views || [])[0] || {}).RTL && (n |= 32), t.write_shift(2, n), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(2, 0), t.write_shift(2, 100), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(4, 0), t;
}
function jd(e) {
  var r = B(24);
  return r.write_shift(4, 4), r.write_shift(4, 1), Zr(e, r), r;
}
function Yd(e, r) {
  return r == null && (r = B(66)), r.write_shift(2, e.password ? Do(e.password) : 0), r.write_shift(4, 1), [
    ["objects", !1],
    // fObjects
    ["scenarios", !1],
    // fScenarios
    ["formatCells", !0],
    // fFormatCells
    ["formatColumns", !0],
    // fFormatColumns
    ["formatRows", !0],
    // fFormatRows
    ["insertColumns", !0],
    // fInsertColumns
    ["insertRows", !0],
    // fInsertRows
    ["insertHyperlinks", !0],
    // fInsertHyperlinks
    ["deleteColumns", !0],
    // fDeleteColumns
    ["deleteRows", !0],
    // fDeleteRows
    ["selectLockedCells", !1],
    // fSelLockedCells
    ["sort", !0],
    // fSort
    ["autoFilter", !0],
    // fAutoFilter
    ["pivotTables", !0],
    // fPivotTables
    ["selectUnlockedCells", !1]
    // fSelUnlockedCells
  ].forEach(function(t) {
    t[1] ? r.write_shift(4, e[t[0]] != null && !e[t[0]] ? 1 : 0) : r.write_shift(4, e[t[0]] != null && e[t[0]] ? 0 : 1);
  }), r;
}
function Kd() {
}
function Jd() {
}
function Qd(e, r, t, n, a, i, s) {
  if (r.v === void 0) return !1;
  var o = "";
  switch (r.t) {
    case "b":
      o = r.v ? "1" : "0";
      break;
    case "d":
      r = xt(r), r.z = r.z || Be[14], r.v = ut(lt(r.v)), r.t = "n";
      break;
    /* falls through */
    case "n":
    case "e":
      o = "" + r.v;
      break;
    default:
      o = r.v;
      break;
  }
  var l = { r: t, c: n };
  switch (l.s = lr(a.cellXfs, r, a), r.l && i["!links"].push([Fe(l), r.l]), r.c && i["!comments"].push([Fe(l), r.c]), r.t) {
    case "s":
    case "str":
      return a.bookSST ? (o = Li(a.Strings, r.v, a.revStrings), l.t = "s", l.v = o, s ? G(e, 18, pd(r, l)) : G(e, 7, dd(r, l))) : (l.t = "str", s ? G(e, 17, Od(r, l)) : G(e, 6, Ad(r, l))), !0;
    case "n":
      return r.v == (r.v | 0) && r.v > -1e3 && r.v < 1e3 ? s ? G(e, 13, yd(r, l)) : G(e, 2, Ed(r, l)) : s ? G(e, 16, wd(r, l)) : G(e, 5, _d(r, l)), !0;
    case "b":
      return l.t = "b", s ? G(e, 15, fd(r, l)) : G(e, 4, sd(r, l)), !0;
    case "e":
      return l.t = "e", s ? G(e, 14, ud(r, l)) : G(e, 3, cd(r, l)), !0;
  }
  return s ? G(e, 12, ad(r, l)) : G(e, 1, rd(r, l)), !0;
}
function Zd(e, r, t, n) {
  var a = Ne(r["!ref"] || "A1"), i, s = "", o = [];
  G(
    e,
    145
    /* BrtBeginSheetData */
  );
  var l = Array.isArray(r), f = a.e.r;
  r["!rows"] && (f = Math.max(a.e.r, r["!rows"].length - 1));
  for (var c = a.s.r; c <= f; ++c) {
    s = qe(c), Kx(e, r, a, c);
    var d = !1;
    if (c <= a.e.r) for (var h = a.s.c; h <= a.e.c; ++h) {
      c === a.s.r && (o[h] = rt(h)), i = o[h] + s;
      var u = l ? (r[c] || [])[h] : r[i];
      if (!u) {
        d = !1;
        continue;
      }
      d = Qd(e, u, c, h, n, r, d);
    }
  }
  G(
    e,
    146
    /* BrtEndSheetData */
  );
}
function qd(e, r) {
  !r || !r["!merges"] || (G(e, 177, Ld(r["!merges"].length)), r["!merges"].forEach(function(t) {
    G(e, 176, Md(t));
  }), G(
    e,
    178
    /* BrtEndMergeCells */
  ));
}
function em(e, r) {
  !r || !r["!cols"] || (G(
    e,
    390
    /* BrtBeginColInfos */
  ), r["!cols"].forEach(function(t, n) {
    t && G(e, 60, Gd(n, t));
  }), G(
    e,
    391
    /* BrtEndColInfos */
  ));
}
function tm(e, r) {
  !r || !r["!ref"] || (G(
    e,
    648
    /* BrtBeginCellIgnoreECs */
  ), G(e, 649, jd(Ne(r["!ref"]))), G(
    e,
    650
    /* BrtEndCellIgnoreECs */
  ));
}
function rm(e, r, t) {
  r["!links"].forEach(function(n) {
    if (n[1].Target) {
      var a = Se(t, -1, n[1].Target.replace(/#.*$/, ""), ve.HLINK);
      G(e, 494, bd(n, a));
    }
  }), delete r["!links"];
}
function nm(e, r, t, n) {
  if (r["!comments"].length > 0) {
    var a = Se(n, -1, "../drawings/vmlDrawing" + (t + 1) + ".vml", ve.VML);
    G(e, 551, Ri("rId" + a)), r["!legacy"] = a;
  }
}
function am(e, r, t, n) {
  if (r["!autofilter"]) {
    var a = r["!autofilter"], i = typeof a.ref == "string" ? a.ref : He(a.ref);
    t.Workbook || (t.Workbook = { Sheets: [] }), t.Workbook.Names || (t.Workbook.Names = []);
    var s = t.Workbook.Names, o = gt(i);
    o.s.r == o.e.r && (o.e.r = gt(r["!ref"]).e.r, i = He(o));
    for (var l = 0; l < s.length; ++l) {
      var f = s[l];
      if (f.Name == "_xlnm._FilterDatabase" && f.Sheet == n) {
        f.Ref = "'" + t.SheetNames[n] + "'!" + i;
        break;
      }
    }
    l == s.length && s.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + t.SheetNames[n] + "'!" + i }), G(e, 161, Zr(Ne(i))), G(
      e,
      162
      /* BrtEndAFilter */
    );
  }
}
function im(e, r, t) {
  G(
    e,
    133
    /* BrtBeginWsViews */
  ), G(e, 137, Xd(r, t)), G(
    e,
    138
    /* BrtEndWsView */
  ), G(
    e,
    134
    /* BrtEndWsViews */
  );
}
function sm(e, r) {
  r["!protect"] && G(e, 535, Yd(r["!protect"]));
}
function om(e, r, t, n) {
  var a = ht(), i = t.SheetNames[e], s = t.Sheets[i] || {}, o = i;
  try {
    t && t.Workbook && (o = t.Workbook.Sheets[e].CodeName || o);
  } catch {
  }
  var l = Ne(s["!ref"] || "A1");
  if (l.e.c > 16383 || l.e.r > 1048575) {
    if (r.WTF) throw new Error("Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
    l.e.c = Math.min(l.e.c, 16383), l.e.r = Math.min(l.e.c, 1048575);
  }
  return s["!links"] = [], s["!comments"] = [], G(
    a,
    129
    /* BrtBeginSheet */
  ), (t.vbaraw || s["!outline"]) && G(a, 147, ed(o, s["!outline"])), G(a, 148, Qx(l)), im(a, s, t.Workbook), em(a, s), Zd(a, s, e, r), sm(a, s), am(a, s, t, e), qd(a, s), rm(a, s, n), s["!margins"] && G(a, 476, Vd(s["!margins"])), (!r || r.ignoreEC || r.ignoreEC == null) && tm(a, s), nm(a, s, e, n), G(
    a,
    130
    /* BrtEndSheet */
  ), a.end();
}
function fm(e, r) {
  e.l += 10;
  var t = nt(e);
  return { name: t };
}
var lm = [
  ["allowRefreshQuery", !1, "bool"],
  ["autoCompressPictures", !0, "bool"],
  ["backupFile", !1, "bool"],
  ["checkCompatibility", !1, "bool"],
  ["CodeName", ""],
  ["date1904", !1, "bool"],
  ["defaultThemeVersion", 0, "int"],
  ["filterPrivacy", !1, "bool"],
  ["hidePivotFieldList", !1, "bool"],
  ["promptedSolutions", !1, "bool"],
  ["publishItems", !1, "bool"],
  ["refreshAllConnections", !1, "bool"],
  ["saveExternalLinkValues", !0, "bool"],
  ["showBorderUnselectedTables", !0, "bool"],
  ["showInkAnnotation", !0, "bool"],
  ["showObjects", "all"],
  ["showPivotChartFilter", !1, "bool"],
  ["updateLinks", "userSet"]
];
function cm(e) {
  return !e.Workbook || !e.Workbook.WBProps ? "false" : Hc(e.Workbook.WBProps.date1904) ? "true" : "false";
}
var hm = /* @__PURE__ */ "][*?/\\".split("");
function qo(e, r) {
  if (e.length > 31)
    throw new Error("Sheet names cannot exceed 31 chars");
  var t = !0;
  return hm.forEach(function(n) {
    if (e.indexOf(n) != -1)
      throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
  }), t;
}
function um(e, r, t) {
  e.forEach(function(n, a) {
    qo(n);
    for (var i = 0; i < a; ++i) if (n == e[i]) throw new Error("Duplicate Sheet Name: " + n);
    if (t) {
      var s = r && r[a] && r[a].CodeName || n;
      if (s.charCodeAt(0) == 95 && s.length > 22) throw new Error("Bad Code Name: Worksheet" + s);
    }
  });
}
function xm(e) {
  if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
  if (!e.SheetNames.length) throw new Error("Workbook is empty");
  var r = e.Workbook && e.Workbook.Sheets || [];
  um(e.SheetNames, r, !!e.vbaraw);
  for (var t = 0; t < e.SheetNames.length; ++t) Mx(e.Sheets[e.SheetNames[t]], e.SheetNames[t], t);
}
function ef(e) {
  var r = [Ge];
  r[r.length] = J("workbook", null, {
    xmlns: Jr[0],
    //'xmlns:mx': XMLNS.mx,
    //'xmlns:s': XMLNS_main[0],
    "xmlns:r": ze.r
  });
  var t = e.Workbook && (e.Workbook.Names || []).length > 0, n = { codeName: "ThisWorkbook" };
  e.Workbook && e.Workbook.WBProps && (lm.forEach(function(o) {
    e.Workbook.WBProps[o[0]] != null && e.Workbook.WBProps[o[0]] != o[1] && (n[o[0]] = e.Workbook.WBProps[o[0]]);
  }), e.Workbook.WBProps.CodeName && (n.codeName = e.Workbook.WBProps.CodeName, delete n.CodeName)), r[r.length] = J("workbookPr", null, n);
  var a = e.Workbook && e.Workbook.Sheets || [], i = 0;
  if (a && a[0] && a[0].Hidden) {
    for (r[r.length] = "<bookViews>", i = 0; i != e.SheetNames.length && !(!a[i] || !a[i].Hidden); ++i)
      ;
    i == e.SheetNames.length && (i = 0), r[r.length] = '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>', r[r.length] = "</bookViews>";
  }
  for (r[r.length] = "<sheets>", i = 0; i != e.SheetNames.length; ++i) {
    var s = { name: ye(e.SheetNames[i].slice(0, 31)) };
    if (s.sheetId = "" + (i + 1), s["r:id"] = "rId" + (i + 1), a[i]) switch (a[i].Hidden) {
      case 1:
        s.state = "hidden";
        break;
      case 2:
        s.state = "veryHidden";
        break;
    }
    r[r.length] = J("sheet", null, s);
  }
  return r[r.length] = "</sheets>", t && (r[r.length] = "<definedNames>", e.Workbook && e.Workbook.Names && e.Workbook.Names.forEach(function(o) {
    var l = { name: o.Name };
    o.Comment && (l.comment = o.Comment), o.Sheet != null && (l.localSheetId = "" + o.Sheet), o.Hidden && (l.hidden = "1"), o.Ref && (r[r.length] = J("definedName", ye(o.Ref), l));
  }), r[r.length] = "</definedNames>"), r.length > 2 && (r[r.length] = "</workbook>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function dm(e, r) {
  var t = {};
  return t.Hidden = e.read_shift(4), t.iTabID = e.read_shift(4), t.strRelID = ci(e), t.name = nt(e), t;
}
function mm(e, r) {
  return r || (r = B(127)), r.write_shift(4, e.Hidden), r.write_shift(4, e.iTabID), Ri(e.strRelID, r), je(e.name.slice(0, 31), r), r.length > r.l ? r.slice(0, r.l) : r;
}
function pm(e, r) {
  var t = {}, n = e.read_shift(4);
  t.defaultThemeVersion = e.read_shift(4);
  var a = r > 8 ? nt(e) : "";
  return a.length > 0 && (t.CodeName = a), t.autoCompressPictures = !!(n & 65536), t.backupFile = !!(n & 64), t.checkCompatibility = !!(n & 4096), t.date1904 = !!(n & 1), t.filterPrivacy = !!(n & 8), t.hidePivotFieldList = !!(n & 1024), t.promptedSolutions = !!(n & 16), t.publishItems = !!(n & 2048), t.refreshAllConnections = !!(n & 262144), t.saveExternalLinkValues = !!(n & 128), t.showBorderUnselectedTables = !!(n & 4), t.showInkAnnotation = !!(n & 32), t.showObjects = ["all", "placeholders", "none"][n >> 13 & 3], t.showPivotChartFilter = !!(n & 32768), t.updateLinks = ["userSet", "never", "always"][n >> 8 & 3], t;
}
function vm(e, r) {
  r || (r = B(72));
  var t = 0;
  return e && e.filterPrivacy && (t |= 8), r.write_shift(4, t), r.write_shift(4, 0), ho(e && e.CodeName || "ThisWorkbook", r), r.slice(0, r.l);
}
function _m(e, r, t) {
  var n = e.l + r;
  e.l += 4, e.l += 1;
  var a = e.read_shift(4), i = ch(e), s = Ox(e, 0, t), o = Oi(e);
  e.l = n;
  var l = { Name: i, Ptg: s };
  return a < 268435455 && (l.Sheet = a), o && (l.Comment = o), l;
}
function gm(e, r) {
  G(
    e,
    143
    /* BrtBeginBundleShs */
  );
  for (var t = 0; t != r.SheetNames.length; ++t) {
    var n = r.Workbook && r.Workbook.Sheets && r.Workbook.Sheets[t] && r.Workbook.Sheets[t].Hidden || 0, a = { Hidden: n, iTabID: t + 1, strRelID: "rId" + (t + 1), name: r.SheetNames[t] };
    G(e, 156, mm(a));
  }
  G(
    e,
    144
    /* BrtEndBundleShs */
  );
}
function wm(e, r) {
  r || (r = B(127));
  for (var t = 0; t != 4; ++t) r.write_shift(4, 0);
  return je("SheetJS", r), je(Qn.version, r), je(Qn.version, r), je("7262", r), r.length > r.l ? r.slice(0, r.l) : r;
}
function Tm(e, r) {
  r || (r = B(29)), r.write_shift(-4, 0), r.write_shift(-4, 460), r.write_shift(4, 28800), r.write_shift(4, 17600), r.write_shift(4, 500), r.write_shift(4, e), r.write_shift(4, e);
  var t = 120;
  return r.write_shift(1, t), r.length > r.l ? r.slice(0, r.l) : r;
}
function Em(e, r) {
  if (!(!r.Workbook || !r.Workbook.Sheets)) {
    for (var t = r.Workbook.Sheets, n = 0, a = -1, i = -1; n < t.length; ++n)
      !t[n] || !t[n].Hidden && a == -1 ? a = n : t[n].Hidden == 1 && i == -1 && (i = n);
    i > a || (G(
      e,
      135
      /* BrtBeginBookViews */
    ), G(e, 158, Tm(a)), G(
      e,
      136
      /* BrtEndBookViews */
    ));
  }
}
function Sm(e, r) {
  var t = ht();
  return G(
    t,
    131
    /* BrtBeginBook */
  ), G(t, 128, wm()), G(t, 153, vm(e.Workbook && e.Workbook.WBProps || null)), Em(t, e), gm(t, e), G(
    t,
    132
    /* BrtEndBook */
  ), t.end();
}
function ym(e, r, t) {
  return (r.slice(-4) === ".bin" ? Sm : ef)(e);
}
function Fm(e, r, t, n, a) {
  return (r.slice(-4) === ".bin" ? om : Qo)(e, t, n, a);
}
function Cm(e, r, t) {
  return (r.slice(-4) === ".bin" ? Vu : Lo)(e, t);
}
function Am(e, r, t) {
  return (r.slice(-4) === ".bin" ? vu : No)(e, t);
}
function km(e, r, t) {
  return (r.slice(-4) === ".bin" ? s1 : Ho)(e);
}
function Om(e) {
  return (e.slice(-4) === ".bin" ? Zu : Uo)();
}
function Rm(e, r) {
  var t = [];
  return e.Props && t.push(Ch(e.Props, r)), e.Custprops && t.push(Ah(e.Props, e.Custprops)), t.join("");
}
function Im() {
  return "";
}
function Nm(e, r) {
  var t = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
  return r.cellXfs.forEach(function(n, a) {
    var i = [];
    i.push(J("NumberFormat", null, { "ss:Format": ye(Be[n.numFmtId]) }));
    var s = (
      /*::(*/
      { "ss:ID": "s" + (21 + a) }
    );
    t.push(J("Style", i.join(""), s));
  }), J("Styles", t.join(""));
}
function tf(e) {
  return J("NamedRange", null, { "ss:Name": e.Name, "ss:RefersTo": "=" + Pi(e.Ref, { r: 0, c: 0 }) });
}
function Dm(e) {
  if (!((e || {}).Workbook || {}).Names) return "";
  for (var r = e.Workbook.Names, t = [], n = 0; n < r.length; ++n) {
    var a = r[n];
    a.Sheet == null && (a.Name.match(/^_xlfn\./) || t.push(tf(a)));
  }
  return J("Names", t.join(""));
}
function Pm(e, r, t, n) {
  if (!e || !((n || {}).Workbook || {}).Names) return "";
  for (var a = n.Workbook.Names, i = [], s = 0; s < a.length; ++s) {
    var o = a[s];
    o.Sheet == t && (o.Name.match(/^_xlfn\./) || i.push(tf(o)));
  }
  return i.join("");
}
function Mm(e, r, t, n) {
  if (!e) return "";
  var a = [];
  if (e["!margins"] && (a.push("<PageSetup>"), e["!margins"].header && a.push(J("Header", null, { "x:Margin": e["!margins"].header })), e["!margins"].footer && a.push(J("Footer", null, { "x:Margin": e["!margins"].footer })), a.push(J("PageMargins", null, {
    "x:Bottom": e["!margins"].bottom || "0.75",
    "x:Left": e["!margins"].left || "0.7",
    "x:Right": e["!margins"].right || "0.7",
    "x:Top": e["!margins"].top || "0.75"
  })), a.push("</PageSetup>")), n && n.Workbook && n.Workbook.Sheets && n.Workbook.Sheets[t])
    if (n.Workbook.Sheets[t].Hidden) a.push(J("Visible", n.Workbook.Sheets[t].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));
    else {
      for (var i = 0; i < t && !(n.Workbook.Sheets[i] && !n.Workbook.Sheets[i].Hidden); ++i) ;
      i == t && a.push("<Selected/>");
    }
  return ((((n || {}).Workbook || {}).Views || [])[0] || {}).RTL && a.push("<DisplayRightToLeft/>"), e["!protect"] && (a.push(Ze("ProtectContents", "True")), e["!protect"].objects && a.push(Ze("ProtectObjects", "True")), e["!protect"].scenarios && a.push(Ze("ProtectScenarios", "True")), e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells ? a.push(Ze("EnableSelection", "NoSelection")) : e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells && a.push(Ze("EnableSelection", "UnlockedCells")), [
    ["formatCells", "AllowFormatCells"],
    ["formatColumns", "AllowSizeCols"],
    ["formatRows", "AllowSizeRows"],
    ["insertColumns", "AllowInsertCols"],
    ["insertRows", "AllowInsertRows"],
    ["insertHyperlinks", "AllowInsertHyperlinks"],
    ["deleteColumns", "AllowDeleteCols"],
    ["deleteRows", "AllowDeleteRows"],
    ["sort", "AllowSort"],
    ["autoFilter", "AllowFilter"],
    ["pivotTables", "AllowUsePivotTables"]
  ].forEach(function(s) {
    e["!protect"][s[0]] && a.push("<" + s[1] + "/>");
  })), a.length == 0 ? "" : J("WorksheetOptions", a.join(""), { xmlns: vt.x });
}
function Lm(e) {
  return e.map(function(r) {
    var t = Wc(r.t || ""), n = J("ss:Data", t, { xmlns: "http://www.w3.org/TR/REC-html40" });
    return J("Comment", n, { "ss:Author": r.a });
  }).join("");
}
function Bm(e, r, t, n, a, i, s) {
  if (!e || e.v == null && e.f == null) return "";
  var o = {};
  if (e.f && (o["ss:Formula"] = "=" + ye(Pi(e.f, s))), e.F && e.F.slice(0, r.length) == r) {
    var l = Xe(e.F.slice(r.length + 1));
    o["ss:ArrayRange"] = "RC:R" + (l.r == s.r ? "" : "[" + (l.r - s.r) + "]") + "C" + (l.c == s.c ? "" : "[" + (l.c - s.c) + "]");
  }
  if (e.l && e.l.Target && (o["ss:HRef"] = ye(e.l.Target), e.l.Tooltip && (o["x:HRefScreenTip"] = ye(e.l.Tooltip))), t["!merges"])
    for (var f = t["!merges"], c = 0; c != f.length; ++c)
      f[c].s.c != s.c || f[c].s.r != s.r || (f[c].e.c > f[c].s.c && (o["ss:MergeAcross"] = f[c].e.c - f[c].s.c), f[c].e.r > f[c].s.r && (o["ss:MergeDown"] = f[c].e.r - f[c].s.r));
  var d = "", h = "";
  switch (e.t) {
    case "z":
      if (!n.sheetStubs) return "";
      break;
    case "n":
      d = "Number", h = String(e.v);
      break;
    case "b":
      d = "Boolean", h = e.v ? "1" : "0";
      break;
    case "e":
      d = "Error", h = Nn[e.v];
      break;
    case "d":
      d = "DateTime", h = new Date(e.v).toISOString(), e.z == null && (e.z = e.z || Be[14]);
      break;
    case "s":
      d = "String", h = Uc(e.v || "");
      break;
  }
  var u = lr(n.cellXfs, e, n);
  o["ss:StyleID"] = "s" + (21 + u), o["ss:Index"] = s.c + 1;
  var v = e.v != null ? h : "", x = e.t == "z" ? "" : '<Data ss:Type="' + d + '">' + v + "</Data>";
  return (e.c || []).length > 0 && (x += Lm(e.c)), J("Cell", x, o);
}
function bm(e, r) {
  var t = '<Row ss:Index="' + (e + 1) + '"';
  return r && (r.hpt && !r.hpx && (r.hpx = Mo(r.hpt)), r.hpx && (t += ' ss:AutoFitHeight="0" ss:Height="' + r.hpx + '"'), r.hidden && (t += ' ss:Hidden="1"')), t + ">";
}
function Um(e, r, t, n) {
  if (!e["!ref"]) return "";
  var a = Ne(e["!ref"]), i = e["!merges"] || [], s = 0, o = [];
  e["!cols"] && e["!cols"].forEach(function(g, C) {
    Ni(g);
    var O = !!g.width, F = ga(C, g), L = { "ss:Index": C + 1 };
    O && (L["ss:Width"] = oa(F.width)), g.hidden && (L["ss:Hidden"] = "1"), o.push(J("Column", null, L));
  });
  for (var l = Array.isArray(e), f = a.s.r; f <= a.e.r; ++f) {
    for (var c = [bm(f, (e["!rows"] || [])[f])], d = a.s.c; d <= a.e.c; ++d) {
      var h = !1;
      for (s = 0; s != i.length; ++s)
        if (!(i[s].s.c > d) && !(i[s].s.r > f) && !(i[s].e.c < d) && !(i[s].e.r < f)) {
          (i[s].s.c != d || i[s].s.r != f) && (h = !0);
          break;
        }
      if (!h) {
        var u = { r: f, c: d }, v = Fe(u), x = l ? (e[f] || [])[d] : e[v];
        c.push(Bm(x, v, e, r, t, n, u));
      }
    }
    c.push("</Row>"), c.length > 2 && o.push(c.join(""));
  }
  return o.join("");
}
function Wm(e, r, t) {
  var n = [], a = t.SheetNames[e], i = t.Sheets[a], s = i ? Pm(i, r, e, t) : "";
  return s.length > 0 && n.push("<Names>" + s + "</Names>"), s = i ? Um(i, r, e, t) : "", s.length > 0 && n.push("<Table>" + s + "</Table>"), n.push(Mm(i, r, e, t)), n.join("");
}
function Hm(e, r) {
  r || (r = {}), e.SSF || (e.SSF = xt(Be)), e.SSF && (da(), xa(e.SSF), r.revssf = ma(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF, r.cellXfs = [], lr(r.cellXfs, {}, { revssf: { General: 0 } }));
  var t = [];
  t.push(Rm(e, r)), t.push(Im()), t.push(""), t.push("");
  for (var n = 0; n < e.SheetNames.length; ++n)
    t.push(J("Worksheet", Wm(n, r, e), { "ss:Name": ye(e.SheetNames[n]) }));
  return t[2] = Nm(e, r), t[3] = Dm(e), Ge + J("Workbook", t.join(""), {
    xmlns: vt.ss,
    "xmlns:o": vt.o,
    "xmlns:x": vt.x,
    "xmlns:ss": vt.ss,
    "xmlns:dt": vt.dt,
    "xmlns:html": vt.html
  });
}
var La = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function Gm(e, r) {
  var t = [], n = [], a = [], i = 0, s, o = S0(L0, "n"), l = S0(B0, "n");
  if (e.Props)
    for (s = et(e.Props), i = 0; i < s.length; ++i) (Object.prototype.hasOwnProperty.call(o, s[i]) ? t : Object.prototype.hasOwnProperty.call(l, s[i]) ? n : a).push([s[i], e.Props[s[i]]]);
  if (e.Custprops)
    for (s = et(e.Custprops), i = 0; i < s.length; ++i) Object.prototype.hasOwnProperty.call(e.Props || {}, s[i]) || (Object.prototype.hasOwnProperty.call(o, s[i]) ? t : Object.prototype.hasOwnProperty.call(l, s[i]) ? n : a).push([s[i], e.Custprops[s[i]]]);
  var f = [];
  for (i = 0; i < a.length; ++i)
    Fo.indexOf(a[i][0]) > -1 || Eo.indexOf(a[i][0]) > -1 || a[i][1] != null && f.push(a[i]);
  n.length && Ae.utils.cfb_add(r, "/SummaryInformation", G0(n, La.SI, l, B0)), (t.length || f.length) && Ae.utils.cfb_add(r, "/DocumentSummaryInformation", G0(t, La.DSI, o, L0, f.length ? f : null, La.UDI));
}
function $m(e, r) {
  var t = r || {}, n = Ae.utils.cfb_new({ root: "R" }), a = "/Workbook";
  switch (t.bookType || "xls") {
    case "xls":
      t.bookType = "biff8";
    /* falls through */
    case "xla":
      t.bookType || (t.bookType = "xla");
    /* falls through */
    case "biff8":
      a = "/Workbook", t.biff = 8;
      break;
    case "biff5":
      a = "/Book", t.biff = 5;
      break;
    default:
      throw new Error("invalid type " + t.bookType + " for XLS CFB");
  }
  return Ae.utils.cfb_add(n, a, rf(e, t)), t.biff == 8 && (e.Props || e.Custprops) && Gm(e, n), t.biff == 8 && e.vbaraw && o1(n, Ae.read(e.vbaraw, { type: typeof e.vbaraw == "string" ? "binary" : "buffer" })), n;
}
var Vm = {
  /*::[*/
  0: {
    /* n:"BrtRowHdr", */
    f: jx
  },
  /*::[*/
  1: {
    /* n:"BrtCellBlank", */
    f: td
  },
  /*::[*/
  2: {
    /* n:"BrtCellRk", */
    f: Td
  },
  /*::[*/
  3: {
    /* n:"BrtCellError", */
    f: ld
  },
  /*::[*/
  4: {
    /* n:"BrtCellBool", */
    f: id
  },
  /*::[*/
  5: {
    /* n:"BrtCellReal", */
    f: vd
  },
  /*::[*/
  6: {
    /* n:"BrtCellSt", */
    f: Cd
  },
  /*::[*/
  7: {
    /* n:"BrtCellIsst", */
    f: xd
  },
  /*::[*/
  8: {
    /* n:"BrtFmlaString", */
    f: Dd
  },
  /*::[*/
  9: {
    /* n:"BrtFmlaNum", */
    f: Nd
  },
  /*::[*/
  10: {
    /* n:"BrtFmlaBool", */
    f: Rd
  },
  /*::[*/
  11: {
    /* n:"BrtFmlaError", */
    f: Id
  },
  /*::[*/
  12: {
    /* n:"BrtShortBlank", */
    f: nd
  },
  /*::[*/
  13: {
    /* n:"BrtShortRk", */
    f: Sd
  },
  /*::[*/
  14: {
    /* n:"BrtShortError", */
    f: hd
  },
  /*::[*/
  15: {
    /* n:"BrtShortBool", */
    f: od
  },
  /*::[*/
  16: {
    /* n:"BrtShortReal", */
    f: gd
  },
  /*::[*/
  17: {
    /* n:"BrtShortSt", */
    f: kd
  },
  /*::[*/
  18: {
    /* n:"BrtShortIsst", */
    f: md
  },
  /*::[*/
  19: {
    /* n:"BrtSSTItem", */
    f: ki
  },
  /*::[*/
  20: {
    /* n:"BrtPCDIMissing" */
  },
  /*::[*/
  21: {
    /* n:"BrtPCDINumber" */
  },
  /*::[*/
  22: {
    /* n:"BrtPCDIBoolean" */
  },
  /*::[*/
  23: {
    /* n:"BrtPCDIError" */
  },
  /*::[*/
  24: {
    /* n:"BrtPCDIString" */
  },
  /*::[*/
  25: {
    /* n:"BrtPCDIDatetime" */
  },
  /*::[*/
  26: {
    /* n:"BrtPCDIIndex" */
  },
  /*::[*/
  27: {
    /* n:"BrtPCDIAMissing" */
  },
  /*::[*/
  28: {
    /* n:"BrtPCDIANumber" */
  },
  /*::[*/
  29: {
    /* n:"BrtPCDIABoolean" */
  },
  /*::[*/
  30: {
    /* n:"BrtPCDIAError" */
  },
  /*::[*/
  31: {
    /* n:"BrtPCDIAString" */
  },
  /*::[*/
  32: {
    /* n:"BrtPCDIADatetime" */
  },
  /*::[*/
  33: {
    /* n:"BrtPCRRecord" */
  },
  /*::[*/
  34: {
    /* n:"BrtPCRRecordDt" */
  },
  /*::[*/
  35: {
    /* n:"BrtFRTBegin", */
    T: 1
  },
  /*::[*/
  36: {
    /* n:"BrtFRTEnd", */
    T: -1
  },
  /*::[*/
  37: {
    /* n:"BrtACBegin", */
    T: 1
  },
  /*::[*/
  38: {
    /* n:"BrtACEnd", */
    T: -1
  },
  /*::[*/
  39: {
    /* n:"BrtName", */
    f: _m
  },
  /*::[*/
  40: {
    /* n:"BrtIndexRowBlock" */
  },
  /*::[*/
  42: {
    /* n:"BrtIndexBlock" */
  },
  /*::[*/
  43: {
    /* n:"BrtFont", */
    f: Cu
  },
  /*::[*/
  44: {
    /* n:"BrtFmt", */
    f: yu
  },
  /*::[*/
  45: {
    /* n:"BrtFill", */
    f: Ou
  },
  /*::[*/
  46: {
    /* n:"BrtBorder", */
    f: Iu
  },
  /*::[*/
  47: {
    /* n:"BrtXF", */
    f: Ru
  },
  /*::[*/
  48: {
    /* n:"BrtStyle" */
  },
  /*::[*/
  49: {
    /* n:"BrtCellMeta", */
    f: nh
  },
  /*::[*/
  50: {
    /* n:"BrtValueMeta" */
  },
  /*::[*/
  51: {
    /* n:"BrtMdb" */
    f: ju
  },
  /*::[*/
  52: {
    /* n:"BrtBeginFmd", */
    T: 1
  },
  /*::[*/
  53: {
    /* n:"BrtEndFmd", */
    T: -1
  },
  /*::[*/
  54: {
    /* n:"BrtBeginMdx", */
    T: 1
  },
  /*::[*/
  55: {
    /* n:"BrtEndMdx", */
    T: -1
  },
  /*::[*/
  56: {
    /* n:"BrtBeginMdxTuple", */
    T: 1
  },
  /*::[*/
  57: {
    /* n:"BrtEndMdxTuple", */
    T: -1
  },
  /*::[*/
  58: {
    /* n:"BrtMdxMbrIstr" */
  },
  /*::[*/
  59: {
    /* n:"BrtStr" */
  },
  /*::[*/
  60: {
    /* n:"BrtColInfo", */
    f: au
  },
  /*::[*/
  62: {
    /* n:"BrtCellRString", */
    f: Fd
  },
  /*::[*/
  63: {
    /* n:"BrtCalcChainItem$", */
    f: qu
  },
  /*::[*/
  64: {
    /* n:"BrtDVal", */
    f: Kd
  },
  /*::[*/
  65: {
    /* n:"BrtSxvcellNum" */
  },
  /*::[*/
  66: {
    /* n:"BrtSxvcellStr" */
  },
  /*::[*/
  67: {
    /* n:"BrtSxvcellBool" */
  },
  /*::[*/
  68: {
    /* n:"BrtSxvcellErr" */
  },
  /*::[*/
  69: {
    /* n:"BrtSxvcellDate" */
  },
  /*::[*/
  70: {
    /* n:"BrtSxvcellNil" */
  },
  /*::[*/
  128: {
    /* n:"BrtFileVersion" */
  },
  /*::[*/
  129: {
    /* n:"BrtBeginSheet", */
    T: 1
  },
  /*::[*/
  130: {
    /* n:"BrtEndSheet", */
    T: -1
  },
  /*::[*/
  131: {
    /* n:"BrtBeginBook", */
    T: 1,
    f: Bt,
    p: 0
  },
  /*::[*/
  132: {
    /* n:"BrtEndBook", */
    T: -1
  },
  /*::[*/
  133: {
    /* n:"BrtBeginWsViews", */
    T: 1
  },
  /*::[*/
  134: {
    /* n:"BrtEndWsViews", */
    T: -1
  },
  /*::[*/
  135: {
    /* n:"BrtBeginBookViews", */
    T: 1
  },
  /*::[*/
  136: {
    /* n:"BrtEndBookViews", */
    T: -1
  },
  /*::[*/
  137: {
    /* n:"BrtBeginWsView", */
    T: 1,
    f: zd
  },
  /*::[*/
  138: {
    /* n:"BrtEndWsView", */
    T: -1
  },
  /*::[*/
  139: {
    /* n:"BrtBeginCsViews", */
    T: 1
  },
  /*::[*/
  140: {
    /* n:"BrtEndCsViews", */
    T: -1
  },
  /*::[*/
  141: {
    /* n:"BrtBeginCsView", */
    T: 1
  },
  /*::[*/
  142: {
    /* n:"BrtEndCsView", */
    T: -1
  },
  /*::[*/
  143: {
    /* n:"BrtBeginBundleShs", */
    T: 1
  },
  /*::[*/
  144: {
    /* n:"BrtEndBundleShs", */
    T: -1
  },
  /*::[*/
  145: {
    /* n:"BrtBeginSheetData", */
    T: 1
  },
  /*::[*/
  146: {
    /* n:"BrtEndSheetData", */
    T: -1
  },
  /*::[*/
  147: {
    /* n:"BrtWsProp", */
    f: qx
  },
  /*::[*/
  148: {
    /* n:"BrtWsDim", */
    f: Jx,
    p: 16
  },
  /*::[*/
  151: {
    /* n:"BrtPane", */
    f: Ud
  },
  /*::[*/
  152: {
    /* n:"BrtSel" */
  },
  /*::[*/
  153: {
    /* n:"BrtWbProp", */
    f: pm
  },
  /*::[*/
  154: {
    /* n:"BrtWbFactoid" */
  },
  /*::[*/
  155: {
    /* n:"BrtFileRecover" */
  },
  /*::[*/
  156: {
    /* n:"BrtBundleSh", */
    f: dm
  },
  /*::[*/
  157: {
    /* n:"BrtCalcProp" */
  },
  /*::[*/
  158: {
    /* n:"BrtBookView" */
  },
  /*::[*/
  159: {
    /* n:"BrtBeginSst", */
    T: 1,
    f: du
  },
  /*::[*/
  160: {
    /* n:"BrtEndSst", */
    T: -1
  },
  /*::[*/
  161: {
    /* n:"BrtBeginAFilter", */
    T: 1,
    f: kr
  },
  /*::[*/
  162: {
    /* n:"BrtEndAFilter", */
    T: -1
  },
  /*::[*/
  163: {
    /* n:"BrtBeginFilterColumn", */
    T: 1
  },
  /*::[*/
  164: {
    /* n:"BrtEndFilterColumn", */
    T: -1
  },
  /*::[*/
  165: {
    /* n:"BrtBeginFilters", */
    T: 1
  },
  /*::[*/
  166: {
    /* n:"BrtEndFilters", */
    T: -1
  },
  /*::[*/
  167: {
    /* n:"BrtFilter" */
  },
  /*::[*/
  168: {
    /* n:"BrtColorFilter" */
  },
  /*::[*/
  169: {
    /* n:"BrtIconFilter" */
  },
  /*::[*/
  170: {
    /* n:"BrtTop10Filter" */
  },
  /*::[*/
  171: {
    /* n:"BrtDynamicFilter" */
  },
  /*::[*/
  172: {
    /* n:"BrtBeginCustomFilters", */
    T: 1
  },
  /*::[*/
  173: {
    /* n:"BrtEndCustomFilters", */
    T: -1
  },
  /*::[*/
  174: {
    /* n:"BrtCustomFilter" */
  },
  /*::[*/
  175: {
    /* n:"BrtAFilterDateGroupItem" */
  },
  /*::[*/
  176: {
    /* n:"BrtMergeCell", */
    f: Pd
  },
  /*::[*/
  177: {
    /* n:"BrtBeginMergeCells", */
    T: 1
  },
  /*::[*/
  178: {
    /* n:"BrtEndMergeCells", */
    T: -1
  },
  /*::[*/
  179: {
    /* n:"BrtBeginPivotCacheDef", */
    T: 1
  },
  /*::[*/
  180: {
    /* n:"BrtEndPivotCacheDef", */
    T: -1
  },
  /*::[*/
  181: {
    /* n:"BrtBeginPCDFields", */
    T: 1
  },
  /*::[*/
  182: {
    /* n:"BrtEndPCDFields", */
    T: -1
  },
  /*::[*/
  183: {
    /* n:"BrtBeginPCDField", */
    T: 1
  },
  /*::[*/
  184: {
    /* n:"BrtEndPCDField", */
    T: -1
  },
  /*::[*/
  185: {
    /* n:"BrtBeginPCDSource", */
    T: 1
  },
  /*::[*/
  186: {
    /* n:"BrtEndPCDSource", */
    T: -1
  },
  /*::[*/
  187: {
    /* n:"BrtBeginPCDSRange", */
    T: 1
  },
  /*::[*/
  188: {
    /* n:"BrtEndPCDSRange", */
    T: -1
  },
  /*::[*/
  189: {
    /* n:"BrtBeginPCDFAtbl", */
    T: 1
  },
  /*::[*/
  190: {
    /* n:"BrtEndPCDFAtbl", */
    T: -1
  },
  /*::[*/
  191: {
    /* n:"BrtBeginPCDIRun", */
    T: 1
  },
  /*::[*/
  192: {
    /* n:"BrtEndPCDIRun", */
    T: -1
  },
  /*::[*/
  193: {
    /* n:"BrtBeginPivotCacheRecords", */
    T: 1
  },
  /*::[*/
  194: {
    /* n:"BrtEndPivotCacheRecords", */
    T: -1
  },
  /*::[*/
  195: {
    /* n:"BrtBeginPCDHierarchies", */
    T: 1
  },
  /*::[*/
  196: {
    /* n:"BrtEndPCDHierarchies", */
    T: -1
  },
  /*::[*/
  197: {
    /* n:"BrtBeginPCDHierarchy", */
    T: 1
  },
  /*::[*/
  198: {
    /* n:"BrtEndPCDHierarchy", */
    T: -1
  },
  /*::[*/
  199: {
    /* n:"BrtBeginPCDHFieldsUsage", */
    T: 1
  },
  /*::[*/
  200: {
    /* n:"BrtEndPCDHFieldsUsage", */
    T: -1
  },
  /*::[*/
  201: {
    /* n:"BrtBeginExtConnection", */
    T: 1
  },
  /*::[*/
  202: {
    /* n:"BrtEndExtConnection", */
    T: -1
  },
  /*::[*/
  203: {
    /* n:"BrtBeginECDbProps", */
    T: 1
  },
  /*::[*/
  204: {
    /* n:"BrtEndECDbProps", */
    T: -1
  },
  /*::[*/
  205: {
    /* n:"BrtBeginECOlapProps", */
    T: 1
  },
  /*::[*/
  206: {
    /* n:"BrtEndECOlapProps", */
    T: -1
  },
  /*::[*/
  207: {
    /* n:"BrtBeginPCDSConsol", */
    T: 1
  },
  /*::[*/
  208: {
    /* n:"BrtEndPCDSConsol", */
    T: -1
  },
  /*::[*/
  209: {
    /* n:"BrtBeginPCDSCPages", */
    T: 1
  },
  /*::[*/
  210: {
    /* n:"BrtEndPCDSCPages", */
    T: -1
  },
  /*::[*/
  211: {
    /* n:"BrtBeginPCDSCPage", */
    T: 1
  },
  /*::[*/
  212: {
    /* n:"BrtEndPCDSCPage", */
    T: -1
  },
  /*::[*/
  213: {
    /* n:"BrtBeginPCDSCPItem", */
    T: 1
  },
  /*::[*/
  214: {
    /* n:"BrtEndPCDSCPItem", */
    T: -1
  },
  /*::[*/
  215: {
    /* n:"BrtBeginPCDSCSets", */
    T: 1
  },
  /*::[*/
  216: {
    /* n:"BrtEndPCDSCSets", */
    T: -1
  },
  /*::[*/
  217: {
    /* n:"BrtBeginPCDSCSet", */
    T: 1
  },
  /*::[*/
  218: {
    /* n:"BrtEndPCDSCSet", */
    T: -1
  },
  /*::[*/
  219: {
    /* n:"BrtBeginPCDFGroup", */
    T: 1
  },
  /*::[*/
  220: {
    /* n:"BrtEndPCDFGroup", */
    T: -1
  },
  /*::[*/
  221: {
    /* n:"BrtBeginPCDFGItems", */
    T: 1
  },
  /*::[*/
  222: {
    /* n:"BrtEndPCDFGItems", */
    T: -1
  },
  /*::[*/
  223: {
    /* n:"BrtBeginPCDFGRange", */
    T: 1
  },
  /*::[*/
  224: {
    /* n:"BrtEndPCDFGRange", */
    T: -1
  },
  /*::[*/
  225: {
    /* n:"BrtBeginPCDFGDiscrete", */
    T: 1
  },
  /*::[*/
  226: {
    /* n:"BrtEndPCDFGDiscrete", */
    T: -1
  },
  /*::[*/
  227: {
    /* n:"BrtBeginPCDSDTupleCache", */
    T: 1
  },
  /*::[*/
  228: {
    /* n:"BrtEndPCDSDTupleCache", */
    T: -1
  },
  /*::[*/
  229: {
    /* n:"BrtBeginPCDSDTCEntries", */
    T: 1
  },
  /*::[*/
  230: {
    /* n:"BrtEndPCDSDTCEntries", */
    T: -1
  },
  /*::[*/
  231: {
    /* n:"BrtBeginPCDSDTCEMembers", */
    T: 1
  },
  /*::[*/
  232: {
    /* n:"BrtEndPCDSDTCEMembers", */
    T: -1
  },
  /*::[*/
  233: {
    /* n:"BrtBeginPCDSDTCEMember", */
    T: 1
  },
  /*::[*/
  234: {
    /* n:"BrtEndPCDSDTCEMember", */
    T: -1
  },
  /*::[*/
  235: {
    /* n:"BrtBeginPCDSDTCQueries", */
    T: 1
  },
  /*::[*/
  236: {
    /* n:"BrtEndPCDSDTCQueries", */
    T: -1
  },
  /*::[*/
  237: {
    /* n:"BrtBeginPCDSDTCQuery", */
    T: 1
  },
  /*::[*/
  238: {
    /* n:"BrtEndPCDSDTCQuery", */
    T: -1
  },
  /*::[*/
  239: {
    /* n:"BrtBeginPCDSDTCSets", */
    T: 1
  },
  /*::[*/
  240: {
    /* n:"BrtEndPCDSDTCSets", */
    T: -1
  },
  /*::[*/
  241: {
    /* n:"BrtBeginPCDSDTCSet", */
    T: 1
  },
  /*::[*/
  242: {
    /* n:"BrtEndPCDSDTCSet", */
    T: -1
  },
  /*::[*/
  243: {
    /* n:"BrtBeginPCDCalcItems", */
    T: 1
  },
  /*::[*/
  244: {
    /* n:"BrtEndPCDCalcItems", */
    T: -1
  },
  /*::[*/
  245: {
    /* n:"BrtBeginPCDCalcItem", */
    T: 1
  },
  /*::[*/
  246: {
    /* n:"BrtEndPCDCalcItem", */
    T: -1
  },
  /*::[*/
  247: {
    /* n:"BrtBeginPRule", */
    T: 1
  },
  /*::[*/
  248: {
    /* n:"BrtEndPRule", */
    T: -1
  },
  /*::[*/
  249: {
    /* n:"BrtBeginPRFilters", */
    T: 1
  },
  /*::[*/
  250: {
    /* n:"BrtEndPRFilters", */
    T: -1
  },
  /*::[*/
  251: {
    /* n:"BrtBeginPRFilter", */
    T: 1
  },
  /*::[*/
  252: {
    /* n:"BrtEndPRFilter", */
    T: -1
  },
  /*::[*/
  253: {
    /* n:"BrtBeginPNames", */
    T: 1
  },
  /*::[*/
  254: {
    /* n:"BrtEndPNames", */
    T: -1
  },
  /*::[*/
  255: {
    /* n:"BrtBeginPName", */
    T: 1
  },
  /*::[*/
  256: {
    /* n:"BrtEndPName", */
    T: -1
  },
  /*::[*/
  257: {
    /* n:"BrtBeginPNPairs", */
    T: 1
  },
  /*::[*/
  258: {
    /* n:"BrtEndPNPairs", */
    T: -1
  },
  /*::[*/
  259: {
    /* n:"BrtBeginPNPair", */
    T: 1
  },
  /*::[*/
  260: {
    /* n:"BrtEndPNPair", */
    T: -1
  },
  /*::[*/
  261: {
    /* n:"BrtBeginECWebProps", */
    T: 1
  },
  /*::[*/
  262: {
    /* n:"BrtEndECWebProps", */
    T: -1
  },
  /*::[*/
  263: {
    /* n:"BrtBeginEcWpTables", */
    T: 1
  },
  /*::[*/
  264: {
    /* n:"BrtEndECWPTables", */
    T: -1
  },
  /*::[*/
  265: {
    /* n:"BrtBeginECParams", */
    T: 1
  },
  /*::[*/
  266: {
    /* n:"BrtEndECParams", */
    T: -1
  },
  /*::[*/
  267: {
    /* n:"BrtBeginECParam", */
    T: 1
  },
  /*::[*/
  268: {
    /* n:"BrtEndECParam", */
    T: -1
  },
  /*::[*/
  269: {
    /* n:"BrtBeginPCDKPIs", */
    T: 1
  },
  /*::[*/
  270: {
    /* n:"BrtEndPCDKPIs", */
    T: -1
  },
  /*::[*/
  271: {
    /* n:"BrtBeginPCDKPI", */
    T: 1
  },
  /*::[*/
  272: {
    /* n:"BrtEndPCDKPI", */
    T: -1
  },
  /*::[*/
  273: {
    /* n:"BrtBeginDims", */
    T: 1
  },
  /*::[*/
  274: {
    /* n:"BrtEndDims", */
    T: -1
  },
  /*::[*/
  275: {
    /* n:"BrtBeginDim", */
    T: 1
  },
  /*::[*/
  276: {
    /* n:"BrtEndDim", */
    T: -1
  },
  /*::[*/
  277: {
    /* n:"BrtIndexPartEnd" */
  },
  /*::[*/
  278: {
    /* n:"BrtBeginStyleSheet", */
    T: 1
  },
  /*::[*/
  279: {
    /* n:"BrtEndStyleSheet", */
    T: -1
  },
  /*::[*/
  280: {
    /* n:"BrtBeginSXView", */
    T: 1
  },
  /*::[*/
  281: {
    /* n:"BrtEndSXVI", */
    T: -1
  },
  /*::[*/
  282: {
    /* n:"BrtBeginSXVI", */
    T: 1
  },
  /*::[*/
  283: {
    /* n:"BrtBeginSXVIs", */
    T: 1
  },
  /*::[*/
  284: {
    /* n:"BrtEndSXVIs", */
    T: -1
  },
  /*::[*/
  285: {
    /* n:"BrtBeginSXVD", */
    T: 1
  },
  /*::[*/
  286: {
    /* n:"BrtEndSXVD", */
    T: -1
  },
  /*::[*/
  287: {
    /* n:"BrtBeginSXVDs", */
    T: 1
  },
  /*::[*/
  288: {
    /* n:"BrtEndSXVDs", */
    T: -1
  },
  /*::[*/
  289: {
    /* n:"BrtBeginSXPI", */
    T: 1
  },
  /*::[*/
  290: {
    /* n:"BrtEndSXPI", */
    T: -1
  },
  /*::[*/
  291: {
    /* n:"BrtBeginSXPIs", */
    T: 1
  },
  /*::[*/
  292: {
    /* n:"BrtEndSXPIs", */
    T: -1
  },
  /*::[*/
  293: {
    /* n:"BrtBeginSXDI", */
    T: 1
  },
  /*::[*/
  294: {
    /* n:"BrtEndSXDI", */
    T: -1
  },
  /*::[*/
  295: {
    /* n:"BrtBeginSXDIs", */
    T: 1
  },
  /*::[*/
  296: {
    /* n:"BrtEndSXDIs", */
    T: -1
  },
  /*::[*/
  297: {
    /* n:"BrtBeginSXLI", */
    T: 1
  },
  /*::[*/
  298: {
    /* n:"BrtEndSXLI", */
    T: -1
  },
  /*::[*/
  299: {
    /* n:"BrtBeginSXLIRws", */
    T: 1
  },
  /*::[*/
  300: {
    /* n:"BrtEndSXLIRws", */
    T: -1
  },
  /*::[*/
  301: {
    /* n:"BrtBeginSXLICols", */
    T: 1
  },
  /*::[*/
  302: {
    /* n:"BrtEndSXLICols", */
    T: -1
  },
  /*::[*/
  303: {
    /* n:"BrtBeginSXFormat", */
    T: 1
  },
  /*::[*/
  304: {
    /* n:"BrtEndSXFormat", */
    T: -1
  },
  /*::[*/
  305: {
    /* n:"BrtBeginSXFormats", */
    T: 1
  },
  /*::[*/
  306: {
    /* n:"BrtEndSxFormats", */
    T: -1
  },
  /*::[*/
  307: {
    /* n:"BrtBeginSxSelect", */
    T: 1
  },
  /*::[*/
  308: {
    /* n:"BrtEndSxSelect", */
    T: -1
  },
  /*::[*/
  309: {
    /* n:"BrtBeginISXVDRws", */
    T: 1
  },
  /*::[*/
  310: {
    /* n:"BrtEndISXVDRws", */
    T: -1
  },
  /*::[*/
  311: {
    /* n:"BrtBeginISXVDCols", */
    T: 1
  },
  /*::[*/
  312: {
    /* n:"BrtEndISXVDCols", */
    T: -1
  },
  /*::[*/
  313: {
    /* n:"BrtEndSXLocation", */
    T: -1
  },
  /*::[*/
  314: {
    /* n:"BrtBeginSXLocation", */
    T: 1
  },
  /*::[*/
  315: {
    /* n:"BrtEndSXView", */
    T: -1
  },
  /*::[*/
  316: {
    /* n:"BrtBeginSXTHs", */
    T: 1
  },
  /*::[*/
  317: {
    /* n:"BrtEndSXTHs", */
    T: -1
  },
  /*::[*/
  318: {
    /* n:"BrtBeginSXTH", */
    T: 1
  },
  /*::[*/
  319: {
    /* n:"BrtEndSXTH", */
    T: -1
  },
  /*::[*/
  320: {
    /* n:"BrtBeginISXTHRws", */
    T: 1
  },
  /*::[*/
  321: {
    /* n:"BrtEndISXTHRws", */
    T: -1
  },
  /*::[*/
  322: {
    /* n:"BrtBeginISXTHCols", */
    T: 1
  },
  /*::[*/
  323: {
    /* n:"BrtEndISXTHCols", */
    T: -1
  },
  /*::[*/
  324: {
    /* n:"BrtBeginSXTDMPS", */
    T: 1
  },
  /*::[*/
  325: {
    /* n:"BrtEndSXTDMPs", */
    T: -1
  },
  /*::[*/
  326: {
    /* n:"BrtBeginSXTDMP", */
    T: 1
  },
  /*::[*/
  327: {
    /* n:"BrtEndSXTDMP", */
    T: -1
  },
  /*::[*/
  328: {
    /* n:"BrtBeginSXTHItems", */
    T: 1
  },
  /*::[*/
  329: {
    /* n:"BrtEndSXTHItems", */
    T: -1
  },
  /*::[*/
  330: {
    /* n:"BrtBeginSXTHItem", */
    T: 1
  },
  /*::[*/
  331: {
    /* n:"BrtEndSXTHItem", */
    T: -1
  },
  /*::[*/
  332: {
    /* n:"BrtBeginMetadata", */
    T: 1
  },
  /*::[*/
  333: {
    /* n:"BrtEndMetadata", */
    T: -1
  },
  /*::[*/
  334: {
    /* n:"BrtBeginEsmdtinfo", */
    T: 1
  },
  /*::[*/
  335: {
    /* n:"BrtMdtinfo", */
    f: zu
  },
  /*::[*/
  336: {
    /* n:"BrtEndEsmdtinfo", */
    T: -1
  },
  /*::[*/
  337: {
    /* n:"BrtBeginEsmdb", */
    f: Ju,
    T: 1
  },
  /*::[*/
  338: {
    /* n:"BrtEndEsmdb", */
    T: -1
  },
  /*::[*/
  339: {
    /* n:"BrtBeginEsfmd", */
    T: 1
  },
  /*::[*/
  340: {
    /* n:"BrtEndEsfmd", */
    T: -1
  },
  /*::[*/
  341: {
    /* n:"BrtBeginSingleCells", */
    T: 1
  },
  /*::[*/
  342: {
    /* n:"BrtEndSingleCells", */
    T: -1
  },
  /*::[*/
  343: {
    /* n:"BrtBeginList", */
    T: 1
  },
  /*::[*/
  344: {
    /* n:"BrtEndList", */
    T: -1
  },
  /*::[*/
  345: {
    /* n:"BrtBeginListCols", */
    T: 1
  },
  /*::[*/
  346: {
    /* n:"BrtEndListCols", */
    T: -1
  },
  /*::[*/
  347: {
    /* n:"BrtBeginListCol", */
    T: 1
  },
  /*::[*/
  348: {
    /* n:"BrtEndListCol", */
    T: -1
  },
  /*::[*/
  349: {
    /* n:"BrtBeginListXmlCPr", */
    T: 1
  },
  /*::[*/
  350: {
    /* n:"BrtEndListXmlCPr", */
    T: -1
  },
  /*::[*/
  351: {
    /* n:"BrtListCCFmla" */
  },
  /*::[*/
  352: {
    /* n:"BrtListTrFmla" */
  },
  /*::[*/
  353: {
    /* n:"BrtBeginExternals", */
    T: 1
  },
  /*::[*/
  354: {
    /* n:"BrtEndExternals", */
    T: -1
  },
  /*::[*/
  355: {
    /* n:"BrtSupBookSrc", */
    f: ci
  },
  /*::[*/
  357: {
    /* n:"BrtSupSelf" */
  },
  /*::[*/
  358: {
    /* n:"BrtSupSame" */
  },
  /*::[*/
  359: {
    /* n:"BrtSupTabs" */
  },
  /*::[*/
  360: {
    /* n:"BrtBeginSupBook", */
    T: 1
  },
  /*::[*/
  361: {
    /* n:"BrtPlaceholderName" */
  },
  /*::[*/
  362: {
    /* n:"BrtExternSheet", */
    f: Zh
  },
  /*::[*/
  363: {
    /* n:"BrtExternTableStart" */
  },
  /*::[*/
  364: {
    /* n:"BrtExternTableEnd" */
  },
  /*::[*/
  366: {
    /* n:"BrtExternRowHdr" */
  },
  /*::[*/
  367: {
    /* n:"BrtExternCellBlank" */
  },
  /*::[*/
  368: {
    /* n:"BrtExternCellReal" */
  },
  /*::[*/
  369: {
    /* n:"BrtExternCellBool" */
  },
  /*::[*/
  370: {
    /* n:"BrtExternCellError" */
  },
  /*::[*/
  371: {
    /* n:"BrtExternCellString" */
  },
  /*::[*/
  372: {
    /* n:"BrtBeginEsmdx", */
    T: 1
  },
  /*::[*/
  373: {
    /* n:"BrtEndEsmdx", */
    T: -1
  },
  /*::[*/
  374: {
    /* n:"BrtBeginMdxSet", */
    T: 1
  },
  /*::[*/
  375: {
    /* n:"BrtEndMdxSet", */
    T: -1
  },
  /*::[*/
  376: {
    /* n:"BrtBeginMdxMbrProp", */
    T: 1
  },
  /*::[*/
  377: {
    /* n:"BrtEndMdxMbrProp", */
    T: -1
  },
  /*::[*/
  378: {
    /* n:"BrtBeginMdxKPI", */
    T: 1
  },
  /*::[*/
  379: {
    /* n:"BrtEndMdxKPI", */
    T: -1
  },
  /*::[*/
  380: {
    /* n:"BrtBeginEsstr", */
    T: 1
  },
  /*::[*/
  381: {
    /* n:"BrtEndEsstr", */
    T: -1
  },
  /*::[*/
  382: {
    /* n:"BrtBeginPRFItem", */
    T: 1
  },
  /*::[*/
  383: {
    /* n:"BrtEndPRFItem", */
    T: -1
  },
  /*::[*/
  384: {
    /* n:"BrtBeginPivotCacheIDs", */
    T: 1
  },
  /*::[*/
  385: {
    /* n:"BrtEndPivotCacheIDs", */
    T: -1
  },
  /*::[*/
  386: {
    /* n:"BrtBeginPivotCacheID", */
    T: 1
  },
  /*::[*/
  387: {
    /* n:"BrtEndPivotCacheID", */
    T: -1
  },
  /*::[*/
  388: {
    /* n:"BrtBeginISXVIs", */
    T: 1
  },
  /*::[*/
  389: {
    /* n:"BrtEndISXVIs", */
    T: -1
  },
  /*::[*/
  390: {
    /* n:"BrtBeginColInfos", */
    T: 1
  },
  /*::[*/
  391: {
    /* n:"BrtEndColInfos", */
    T: -1
  },
  /*::[*/
  392: {
    /* n:"BrtBeginRwBrk", */
    T: 1
  },
  /*::[*/
  393: {
    /* n:"BrtEndRwBrk", */
    T: -1
  },
  /*::[*/
  394: {
    /* n:"BrtBeginColBrk", */
    T: 1
  },
  /*::[*/
  395: {
    /* n:"BrtEndColBrk", */
    T: -1
  },
  /*::[*/
  396: {
    /* n:"BrtBrk" */
  },
  /*::[*/
  397: {
    /* n:"BrtUserBookView" */
  },
  /*::[*/
  398: {
    /* n:"BrtInfo" */
  },
  /*::[*/
  399: {
    /* n:"BrtCUsr" */
  },
  /*::[*/
  400: {
    /* n:"BrtUsr" */
  },
  /*::[*/
  401: {
    /* n:"BrtBeginUsers", */
    T: 1
  },
  /*::[*/
  403: {
    /* n:"BrtEOF" */
  },
  /*::[*/
  404: {
    /* n:"BrtUCR" */
  },
  /*::[*/
  405: {
    /* n:"BrtRRInsDel" */
  },
  /*::[*/
  406: {
    /* n:"BrtRREndInsDel" */
  },
  /*::[*/
  407: {
    /* n:"BrtRRMove" */
  },
  /*::[*/
  408: {
    /* n:"BrtRREndMove" */
  },
  /*::[*/
  409: {
    /* n:"BrtRRChgCell" */
  },
  /*::[*/
  410: {
    /* n:"BrtRREndChgCell" */
  },
  /*::[*/
  411: {
    /* n:"BrtRRHeader" */
  },
  /*::[*/
  412: {
    /* n:"BrtRRUserView" */
  },
  /*::[*/
  413: {
    /* n:"BrtRRRenSheet" */
  },
  /*::[*/
  414: {
    /* n:"BrtRRInsertSh" */
  },
  /*::[*/
  415: {
    /* n:"BrtRRDefName" */
  },
  /*::[*/
  416: {
    /* n:"BrtRRNote" */
  },
  /*::[*/
  417: {
    /* n:"BrtRRConflict" */
  },
  /*::[*/
  418: {
    /* n:"BrtRRTQSIF" */
  },
  /*::[*/
  419: {
    /* n:"BrtRRFormat" */
  },
  /*::[*/
  420: {
    /* n:"BrtRREndFormat" */
  },
  /*::[*/
  421: {
    /* n:"BrtRRAutoFmt" */
  },
  /*::[*/
  422: {
    /* n:"BrtBeginUserShViews", */
    T: 1
  },
  /*::[*/
  423: {
    /* n:"BrtBeginUserShView", */
    T: 1
  },
  /*::[*/
  424: {
    /* n:"BrtEndUserShView", */
    T: -1
  },
  /*::[*/
  425: {
    /* n:"BrtEndUserShViews", */
    T: -1
  },
  /*::[*/
  426: {
    /* n:"BrtArrFmla", */
    f: Wd
  },
  /*::[*/
  427: {
    /* n:"BrtShrFmla", */
    f: Hd
  },
  /*::[*/
  428: {
    /* n:"BrtTable" */
  },
  /*::[*/
  429: {
    /* n:"BrtBeginExtConnections", */
    T: 1
  },
  /*::[*/
  430: {
    /* n:"BrtEndExtConnections", */
    T: -1
  },
  /*::[*/
  431: {
    /* n:"BrtBeginPCDCalcMems", */
    T: 1
  },
  /*::[*/
  432: {
    /* n:"BrtEndPCDCalcMems", */
    T: -1
  },
  /*::[*/
  433: {
    /* n:"BrtBeginPCDCalcMem", */
    T: 1
  },
  /*::[*/
  434: {
    /* n:"BrtEndPCDCalcMem", */
    T: -1
  },
  /*::[*/
  435: {
    /* n:"BrtBeginPCDHGLevels", */
    T: 1
  },
  /*::[*/
  436: {
    /* n:"BrtEndPCDHGLevels", */
    T: -1
  },
  /*::[*/
  437: {
    /* n:"BrtBeginPCDHGLevel", */
    T: 1
  },
  /*::[*/
  438: {
    /* n:"BrtEndPCDHGLevel", */
    T: -1
  },
  /*::[*/
  439: {
    /* n:"BrtBeginPCDHGLGroups", */
    T: 1
  },
  /*::[*/
  440: {
    /* n:"BrtEndPCDHGLGroups", */
    T: -1
  },
  /*::[*/
  441: {
    /* n:"BrtBeginPCDHGLGroup", */
    T: 1
  },
  /*::[*/
  442: {
    /* n:"BrtEndPCDHGLGroup", */
    T: -1
  },
  /*::[*/
  443: {
    /* n:"BrtBeginPCDHGLGMembers", */
    T: 1
  },
  /*::[*/
  444: {
    /* n:"BrtEndPCDHGLGMembers", */
    T: -1
  },
  /*::[*/
  445: {
    /* n:"BrtBeginPCDHGLGMember", */
    T: 1
  },
  /*::[*/
  446: {
    /* n:"BrtEndPCDHGLGMember", */
    T: -1
  },
  /*::[*/
  447: {
    /* n:"BrtBeginQSI", */
    T: 1
  },
  /*::[*/
  448: {
    /* n:"BrtEndQSI", */
    T: -1
  },
  /*::[*/
  449: {
    /* n:"BrtBeginQSIR", */
    T: 1
  },
  /*::[*/
  450: {
    /* n:"BrtEndQSIR", */
    T: -1
  },
  /*::[*/
  451: {
    /* n:"BrtBeginDeletedNames", */
    T: 1
  },
  /*::[*/
  452: {
    /* n:"BrtEndDeletedNames", */
    T: -1
  },
  /*::[*/
  453: {
    /* n:"BrtBeginDeletedName", */
    T: 1
  },
  /*::[*/
  454: {
    /* n:"BrtEndDeletedName", */
    T: -1
  },
  /*::[*/
  455: {
    /* n:"BrtBeginQSIFs", */
    T: 1
  },
  /*::[*/
  456: {
    /* n:"BrtEndQSIFs", */
    T: -1
  },
  /*::[*/
  457: {
    /* n:"BrtBeginQSIF", */
    T: 1
  },
  /*::[*/
  458: {
    /* n:"BrtEndQSIF", */
    T: -1
  },
  /*::[*/
  459: {
    /* n:"BrtBeginAutoSortScope", */
    T: 1
  },
  /*::[*/
  460: {
    /* n:"BrtEndAutoSortScope", */
    T: -1
  },
  /*::[*/
  461: {
    /* n:"BrtBeginConditionalFormatting", */
    T: 1
  },
  /*::[*/
  462: {
    /* n:"BrtEndConditionalFormatting", */
    T: -1
  },
  /*::[*/
  463: {
    /* n:"BrtBeginCFRule", */
    T: 1
  },
  /*::[*/
  464: {
    /* n:"BrtEndCFRule", */
    T: -1
  },
  /*::[*/
  465: {
    /* n:"BrtBeginIconSet", */
    T: 1
  },
  /*::[*/
  466: {
    /* n:"BrtEndIconSet", */
    T: -1
  },
  /*::[*/
  467: {
    /* n:"BrtBeginDatabar", */
    T: 1
  },
  /*::[*/
  468: {
    /* n:"BrtEndDatabar", */
    T: -1
  },
  /*::[*/
  469: {
    /* n:"BrtBeginColorScale", */
    T: 1
  },
  /*::[*/
  470: {
    /* n:"BrtEndColorScale", */
    T: -1
  },
  /*::[*/
  471: {
    /* n:"BrtCFVO" */
  },
  /*::[*/
  472: {
    /* n:"BrtExternValueMeta" */
  },
  /*::[*/
  473: {
    /* n:"BrtBeginColorPalette", */
    T: 1
  },
  /*::[*/
  474: {
    /* n:"BrtEndColorPalette", */
    T: -1
  },
  /*::[*/
  475: {
    /* n:"BrtIndexedColor" */
  },
  /*::[*/
  476: {
    /* n:"BrtMargins", */
    f: $d
  },
  /*::[*/
  477: {
    /* n:"BrtPrintOptions" */
  },
  /*::[*/
  478: {
    /* n:"BrtPageSetup" */
  },
  /*::[*/
  479: {
    /* n:"BrtBeginHeaderFooter", */
    T: 1
  },
  /*::[*/
  480: {
    /* n:"BrtEndHeaderFooter", */
    T: -1
  },
  /*::[*/
  481: {
    /* n:"BrtBeginSXCrtFormat", */
    T: 1
  },
  /*::[*/
  482: {
    /* n:"BrtEndSXCrtFormat", */
    T: -1
  },
  /*::[*/
  483: {
    /* n:"BrtBeginSXCrtFormats", */
    T: 1
  },
  /*::[*/
  484: {
    /* n:"BrtEndSXCrtFormats", */
    T: -1
  },
  /*::[*/
  485: {
    /* n:"BrtWsFmtInfo", */
    f: Zx
  },
  /*::[*/
  486: {
    /* n:"BrtBeginMgs", */
    T: 1
  },
  /*::[*/
  487: {
    /* n:"BrtEndMGs", */
    T: -1
  },
  /*::[*/
  488: {
    /* n:"BrtBeginMGMaps", */
    T: 1
  },
  /*::[*/
  489: {
    /* n:"BrtEndMGMaps", */
    T: -1
  },
  /*::[*/
  490: {
    /* n:"BrtBeginMG", */
    T: 1
  },
  /*::[*/
  491: {
    /* n:"BrtEndMG", */
    T: -1
  },
  /*::[*/
  492: {
    /* n:"BrtBeginMap", */
    T: 1
  },
  /*::[*/
  493: {
    /* n:"BrtEndMap", */
    T: -1
  },
  /*::[*/
  494: {
    /* n:"BrtHLink", */
    f: Bd
  },
  /*::[*/
  495: {
    /* n:"BrtBeginDCon", */
    T: 1
  },
  /*::[*/
  496: {
    /* n:"BrtEndDCon", */
    T: -1
  },
  /*::[*/
  497: {
    /* n:"BrtBeginDRefs", */
    T: 1
  },
  /*::[*/
  498: {
    /* n:"BrtEndDRefs", */
    T: -1
  },
  /*::[*/
  499: {
    /* n:"BrtDRef" */
  },
  /*::[*/
  500: {
    /* n:"BrtBeginScenMan", */
    T: 1
  },
  /*::[*/
  501: {
    /* n:"BrtEndScenMan", */
    T: -1
  },
  /*::[*/
  502: {
    /* n:"BrtBeginSct", */
    T: 1
  },
  /*::[*/
  503: {
    /* n:"BrtEndSct", */
    T: -1
  },
  /*::[*/
  504: {
    /* n:"BrtSlc" */
  },
  /*::[*/
  505: {
    /* n:"BrtBeginDXFs", */
    T: 1
  },
  /*::[*/
  506: {
    /* n:"BrtEndDXFs", */
    T: -1
  },
  /*::[*/
  507: {
    /* n:"BrtDXF" */
  },
  /*::[*/
  508: {
    /* n:"BrtBeginTableStyles", */
    T: 1
  },
  /*::[*/
  509: {
    /* n:"BrtEndTableStyles", */
    T: -1
  },
  /*::[*/
  510: {
    /* n:"BrtBeginTableStyle", */
    T: 1
  },
  /*::[*/
  511: {
    /* n:"BrtEndTableStyle", */
    T: -1
  },
  /*::[*/
  512: {
    /* n:"BrtTableStyleElement" */
  },
  /*::[*/
  513: {
    /* n:"BrtTableStyleClient" */
  },
  /*::[*/
  514: {
    /* n:"BrtBeginVolDeps", */
    T: 1
  },
  /*::[*/
  515: {
    /* n:"BrtEndVolDeps", */
    T: -1
  },
  /*::[*/
  516: {
    /* n:"BrtBeginVolType", */
    T: 1
  },
  /*::[*/
  517: {
    /* n:"BrtEndVolType", */
    T: -1
  },
  /*::[*/
  518: {
    /* n:"BrtBeginVolMain", */
    T: 1
  },
  /*::[*/
  519: {
    /* n:"BrtEndVolMain", */
    T: -1
  },
  /*::[*/
  520: {
    /* n:"BrtBeginVolTopic", */
    T: 1
  },
  /*::[*/
  521: {
    /* n:"BrtEndVolTopic", */
    T: -1
  },
  /*::[*/
  522: {
    /* n:"BrtVolSubtopic" */
  },
  /*::[*/
  523: {
    /* n:"BrtVolRef" */
  },
  /*::[*/
  524: {
    /* n:"BrtVolNum" */
  },
  /*::[*/
  525: {
    /* n:"BrtVolErr" */
  },
  /*::[*/
  526: {
    /* n:"BrtVolStr" */
  },
  /*::[*/
  527: {
    /* n:"BrtVolBool" */
  },
  /*::[*/
  528: {
    /* n:"BrtBeginCalcChain$", */
    T: 1
  },
  /*::[*/
  529: {
    /* n:"BrtEndCalcChain$", */
    T: -1
  },
  /*::[*/
  530: {
    /* n:"BrtBeginSortState", */
    T: 1
  },
  /*::[*/
  531: {
    /* n:"BrtEndSortState", */
    T: -1
  },
  /*::[*/
  532: {
    /* n:"BrtBeginSortCond", */
    T: 1
  },
  /*::[*/
  533: {
    /* n:"BrtEndSortCond", */
    T: -1
  },
  /*::[*/
  534: {
    /* n:"BrtBookProtection" */
  },
  /*::[*/
  535: {
    /* n:"BrtSheetProtection" */
  },
  /*::[*/
  536: {
    /* n:"BrtRangeProtection" */
  },
  /*::[*/
  537: {
    /* n:"BrtPhoneticInfo" */
  },
  /*::[*/
  538: {
    /* n:"BrtBeginECTxtWiz", */
    T: 1
  },
  /*::[*/
  539: {
    /* n:"BrtEndECTxtWiz", */
    T: -1
  },
  /*::[*/
  540: {
    /* n:"BrtBeginECTWFldInfoLst", */
    T: 1
  },
  /*::[*/
  541: {
    /* n:"BrtEndECTWFldInfoLst", */
    T: -1
  },
  /*::[*/
  542: {
    /* n:"BrtBeginECTwFldInfo", */
    T: 1
  },
  /*::[*/
  548: {
    /* n:"BrtFileSharing" */
  },
  /*::[*/
  549: {
    /* n:"BrtOleSize" */
  },
  /*::[*/
  550: {
    /* n:"BrtDrawing", */
    f: ci
  },
  /*::[*/
  551: {
    /* n:"BrtLegacyDrawing" */
  },
  /*::[*/
  552: {
    /* n:"BrtLegacyDrawingHF" */
  },
  /*::[*/
  553: {
    /* n:"BrtWebOpt" */
  },
  /*::[*/
  554: {
    /* n:"BrtBeginWebPubItems", */
    T: 1
  },
  /*::[*/
  555: {
    /* n:"BrtEndWebPubItems", */
    T: -1
  },
  /*::[*/
  556: {
    /* n:"BrtBeginWebPubItem", */
    T: 1
  },
  /*::[*/
  557: {
    /* n:"BrtEndWebPubItem", */
    T: -1
  },
  /*::[*/
  558: {
    /* n:"BrtBeginSXCondFmt", */
    T: 1
  },
  /*::[*/
  559: {
    /* n:"BrtEndSXCondFmt", */
    T: -1
  },
  /*::[*/
  560: {
    /* n:"BrtBeginSXCondFmts", */
    T: 1
  },
  /*::[*/
  561: {
    /* n:"BrtEndSXCondFmts", */
    T: -1
  },
  /*::[*/
  562: {
    /* n:"BrtBkHim" */
  },
  /*::[*/
  564: {
    /* n:"BrtColor" */
  },
  /*::[*/
  565: {
    /* n:"BrtBeginIndexedColors", */
    T: 1
  },
  /*::[*/
  566: {
    /* n:"BrtEndIndexedColors", */
    T: -1
  },
  /*::[*/
  569: {
    /* n:"BrtBeginMRUColors", */
    T: 1
  },
  /*::[*/
  570: {
    /* n:"BrtEndMRUColors", */
    T: -1
  },
  /*::[*/
  572: {
    /* n:"BrtMRUColor" */
  },
  /*::[*/
  573: {
    /* n:"BrtBeginDVals", */
    T: 1
  },
  /*::[*/
  574: {
    /* n:"BrtEndDVals", */
    T: -1
  },
  /*::[*/
  577: {
    /* n:"BrtSupNameStart" */
  },
  /*::[*/
  578: {
    /* n:"BrtSupNameValueStart" */
  },
  /*::[*/
  579: {
    /* n:"BrtSupNameValueEnd" */
  },
  /*::[*/
  580: {
    /* n:"BrtSupNameNum" */
  },
  /*::[*/
  581: {
    /* n:"BrtSupNameErr" */
  },
  /*::[*/
  582: {
    /* n:"BrtSupNameSt" */
  },
  /*::[*/
  583: {
    /* n:"BrtSupNameNil" */
  },
  /*::[*/
  584: {
    /* n:"BrtSupNameBool" */
  },
  /*::[*/
  585: {
    /* n:"BrtSupNameFmla" */
  },
  /*::[*/
  586: {
    /* n:"BrtSupNameBits" */
  },
  /*::[*/
  587: {
    /* n:"BrtSupNameEnd" */
  },
  /*::[*/
  588: {
    /* n:"BrtEndSupBook", */
    T: -1
  },
  /*::[*/
  589: {
    /* n:"BrtCellSmartTagProperty" */
  },
  /*::[*/
  590: {
    /* n:"BrtBeginCellSmartTag", */
    T: 1
  },
  /*::[*/
  591: {
    /* n:"BrtEndCellSmartTag", */
    T: -1
  },
  /*::[*/
  592: {
    /* n:"BrtBeginCellSmartTags", */
    T: 1
  },
  /*::[*/
  593: {
    /* n:"BrtEndCellSmartTags", */
    T: -1
  },
  /*::[*/
  594: {
    /* n:"BrtBeginSmartTags", */
    T: 1
  },
  /*::[*/
  595: {
    /* n:"BrtEndSmartTags", */
    T: -1
  },
  /*::[*/
  596: {
    /* n:"BrtSmartTagType" */
  },
  /*::[*/
  597: {
    /* n:"BrtBeginSmartTagTypes", */
    T: 1
  },
  /*::[*/
  598: {
    /* n:"BrtEndSmartTagTypes", */
    T: -1
  },
  /*::[*/
  599: {
    /* n:"BrtBeginSXFilters", */
    T: 1
  },
  /*::[*/
  600: {
    /* n:"BrtEndSXFilters", */
    T: -1
  },
  /*::[*/
  601: {
    /* n:"BrtBeginSXFILTER", */
    T: 1
  },
  /*::[*/
  602: {
    /* n:"BrtEndSXFilter", */
    T: -1
  },
  /*::[*/
  603: {
    /* n:"BrtBeginFills", */
    T: 1
  },
  /*::[*/
  604: {
    /* n:"BrtEndFills", */
    T: -1
  },
  /*::[*/
  605: {
    /* n:"BrtBeginCellWatches", */
    T: 1
  },
  /*::[*/
  606: {
    /* n:"BrtEndCellWatches", */
    T: -1
  },
  /*::[*/
  607: {
    /* n:"BrtCellWatch" */
  },
  /*::[*/
  608: {
    /* n:"BrtBeginCRErrs", */
    T: 1
  },
  /*::[*/
  609: {
    /* n:"BrtEndCRErrs", */
    T: -1
  },
  /*::[*/
  610: {
    /* n:"BrtCrashRecErr" */
  },
  /*::[*/
  611: {
    /* n:"BrtBeginFonts", */
    T: 1
  },
  /*::[*/
  612: {
    /* n:"BrtEndFonts", */
    T: -1
  },
  /*::[*/
  613: {
    /* n:"BrtBeginBorders", */
    T: 1
  },
  /*::[*/
  614: {
    /* n:"BrtEndBorders", */
    T: -1
  },
  /*::[*/
  615: {
    /* n:"BrtBeginFmts", */
    T: 1
  },
  /*::[*/
  616: {
    /* n:"BrtEndFmts", */
    T: -1
  },
  /*::[*/
  617: {
    /* n:"BrtBeginCellXFs", */
    T: 1
  },
  /*::[*/
  618: {
    /* n:"BrtEndCellXFs", */
    T: -1
  },
  /*::[*/
  619: {
    /* n:"BrtBeginStyles", */
    T: 1
  },
  /*::[*/
  620: {
    /* n:"BrtEndStyles", */
    T: -1
  },
  /*::[*/
  625: {
    /* n:"BrtBigName" */
  },
  /*::[*/
  626: {
    /* n:"BrtBeginCellStyleXFs", */
    T: 1
  },
  /*::[*/
  627: {
    /* n:"BrtEndCellStyleXFs", */
    T: -1
  },
  /*::[*/
  628: {
    /* n:"BrtBeginComments", */
    T: 1
  },
  /*::[*/
  629: {
    /* n:"BrtEndComments", */
    T: -1
  },
  /*::[*/
  630: {
    /* n:"BrtBeginCommentAuthors", */
    T: 1
  },
  /*::[*/
  631: {
    /* n:"BrtEndCommentAuthors", */
    T: -1
  },
  /*::[*/
  632: {
    /* n:"BrtCommentAuthor", */
    f: a1
  },
  /*::[*/
  633: {
    /* n:"BrtBeginCommentList", */
    T: 1
  },
  /*::[*/
  634: {
    /* n:"BrtEndCommentList", */
    T: -1
  },
  /*::[*/
  635: {
    /* n:"BrtBeginComment", */
    T: 1,
    f: r1
  },
  /*::[*/
  636: {
    /* n:"BrtEndComment", */
    T: -1
  },
  /*::[*/
  637: {
    /* n:"BrtCommentText", */
    f: oh
  },
  /*::[*/
  638: {
    /* n:"BrtBeginOleObjects", */
    T: 1
  },
  /*::[*/
  639: {
    /* n:"BrtOleObject" */
  },
  /*::[*/
  640: {
    /* n:"BrtEndOleObjects", */
    T: -1
  },
  /*::[*/
  641: {
    /* n:"BrtBeginSxrules", */
    T: 1
  },
  /*::[*/
  642: {
    /* n:"BrtEndSxRules", */
    T: -1
  },
  /*::[*/
  643: {
    /* n:"BrtBeginActiveXControls", */
    T: 1
  },
  /*::[*/
  644: {
    /* n:"BrtActiveX" */
  },
  /*::[*/
  645: {
    /* n:"BrtEndActiveXControls", */
    T: -1
  },
  /*::[*/
  646: {
    /* n:"BrtBeginPCDSDTCEMembersSortBy", */
    T: 1
  },
  /*::[*/
  648: {
    /* n:"BrtBeginCellIgnoreECs", */
    T: 1
  },
  /*::[*/
  649: {
    /* n:"BrtCellIgnoreEC" */
  },
  /*::[*/
  650: {
    /* n:"BrtEndCellIgnoreECs", */
    T: -1
  },
  /*::[*/
  651: {
    /* n:"BrtCsProp", */
    f: fm
  },
  /*::[*/
  652: {
    /* n:"BrtCsPageSetup" */
  },
  /*::[*/
  653: {
    /* n:"BrtBeginUserCsViews", */
    T: 1
  },
  /*::[*/
  654: {
    /* n:"BrtEndUserCsViews", */
    T: -1
  },
  /*::[*/
  655: {
    /* n:"BrtBeginUserCsView", */
    T: 1
  },
  /*::[*/
  656: {
    /* n:"BrtEndUserCsView", */
    T: -1
  },
  /*::[*/
  657: {
    /* n:"BrtBeginPcdSFCIEntries", */
    T: 1
  },
  /*::[*/
  658: {
    /* n:"BrtEndPCDSFCIEntries", */
    T: -1
  },
  /*::[*/
  659: {
    /* n:"BrtPCDSFCIEntry" */
  },
  /*::[*/
  660: {
    /* n:"BrtBeginListParts", */
    T: 1
  },
  /*::[*/
  661: {
    /* n:"BrtListPart" */
  },
  /*::[*/
  662: {
    /* n:"BrtEndListParts", */
    T: -1
  },
  /*::[*/
  663: {
    /* n:"BrtSheetCalcProp" */
  },
  /*::[*/
  664: {
    /* n:"BrtBeginFnGroup", */
    T: 1
  },
  /*::[*/
  665: {
    /* n:"BrtFnGroup" */
  },
  /*::[*/
  666: {
    /* n:"BrtEndFnGroup", */
    T: -1
  },
  /*::[*/
  667: {
    /* n:"BrtSupAddin" */
  },
  /*::[*/
  668: {
    /* n:"BrtSXTDMPOrder" */
  },
  /*::[*/
  669: {
    /* n:"BrtCsProtection" */
  },
  /*::[*/
  671: {
    /* n:"BrtBeginWsSortMap", */
    T: 1
  },
  /*::[*/
  672: {
    /* n:"BrtEndWsSortMap", */
    T: -1
  },
  /*::[*/
  673: {
    /* n:"BrtBeginRRSort", */
    T: 1
  },
  /*::[*/
  674: {
    /* n:"BrtEndRRSort", */
    T: -1
  },
  /*::[*/
  675: {
    /* n:"BrtRRSortItem" */
  },
  /*::[*/
  676: {
    /* n:"BrtFileSharingIso" */
  },
  /*::[*/
  677: {
    /* n:"BrtBookProtectionIso" */
  },
  /*::[*/
  678: {
    /* n:"BrtSheetProtectionIso" */
  },
  /*::[*/
  679: {
    /* n:"BrtCsProtectionIso" */
  },
  /*::[*/
  680: {
    /* n:"BrtRangeProtectionIso" */
  },
  /*::[*/
  681: {
    /* n:"BrtDValList" */
  },
  /*::[*/
  1024: {
    /* n:"BrtRwDescent" */
  },
  /*::[*/
  1025: {
    /* n:"BrtKnownFonts" */
  },
  /*::[*/
  1026: {
    /* n:"BrtBeginSXTupleSet", */
    T: 1
  },
  /*::[*/
  1027: {
    /* n:"BrtEndSXTupleSet", */
    T: -1
  },
  /*::[*/
  1028: {
    /* n:"BrtBeginSXTupleSetHeader", */
    T: 1
  },
  /*::[*/
  1029: {
    /* n:"BrtEndSXTupleSetHeader", */
    T: -1
  },
  /*::[*/
  1030: {
    /* n:"BrtSXTupleSetHeaderItem" */
  },
  /*::[*/
  1031: {
    /* n:"BrtBeginSXTupleSetData", */
    T: 1
  },
  /*::[*/
  1032: {
    /* n:"BrtEndSXTupleSetData", */
    T: -1
  },
  /*::[*/
  1033: {
    /* n:"BrtBeginSXTupleSetRow", */
    T: 1
  },
  /*::[*/
  1034: {
    /* n:"BrtEndSXTupleSetRow", */
    T: -1
  },
  /*::[*/
  1035: {
    /* n:"BrtSXTupleSetRowItem" */
  },
  /*::[*/
  1036: {
    /* n:"BrtNameExt" */
  },
  /*::[*/
  1037: {
    /* n:"BrtPCDH14" */
  },
  /*::[*/
  1038: {
    /* n:"BrtBeginPCDCalcMem14", */
    T: 1
  },
  /*::[*/
  1039: {
    /* n:"BrtEndPCDCalcMem14", */
    T: -1
  },
  /*::[*/
  1040: {
    /* n:"BrtSXTH14" */
  },
  /*::[*/
  1041: {
    /* n:"BrtBeginSparklineGroup", */
    T: 1
  },
  /*::[*/
  1042: {
    /* n:"BrtEndSparklineGroup", */
    T: -1
  },
  /*::[*/
  1043: {
    /* n:"BrtSparkline" */
  },
  /*::[*/
  1044: {
    /* n:"BrtSXDI14" */
  },
  /*::[*/
  1045: {
    /* n:"BrtWsFmtInfoEx14" */
  },
  /*::[*/
  1046: {
    /* n:"BrtBeginConditionalFormatting14", */
    T: 1
  },
  /*::[*/
  1047: {
    /* n:"BrtEndConditionalFormatting14", */
    T: -1
  },
  /*::[*/
  1048: {
    /* n:"BrtBeginCFRule14", */
    T: 1
  },
  /*::[*/
  1049: {
    /* n:"BrtEndCFRule14", */
    T: -1
  },
  /*::[*/
  1050: {
    /* n:"BrtCFVO14" */
  },
  /*::[*/
  1051: {
    /* n:"BrtBeginDatabar14", */
    T: 1
  },
  /*::[*/
  1052: {
    /* n:"BrtBeginIconSet14", */
    T: 1
  },
  /*::[*/
  1053: {
    /* n:"BrtDVal14", */
    f: Jd
  },
  /*::[*/
  1054: {
    /* n:"BrtBeginDVals14", */
    T: 1
  },
  /*::[*/
  1055: {
    /* n:"BrtColor14" */
  },
  /*::[*/
  1056: {
    /* n:"BrtBeginSparklines", */
    T: 1
  },
  /*::[*/
  1057: {
    /* n:"BrtEndSparklines", */
    T: -1
  },
  /*::[*/
  1058: {
    /* n:"BrtBeginSparklineGroups", */
    T: 1
  },
  /*::[*/
  1059: {
    /* n:"BrtEndSparklineGroups", */
    T: -1
  },
  /*::[*/
  1061: {
    /* n:"BrtSXVD14" */
  },
  /*::[*/
  1062: {
    /* n:"BrtBeginSXView14", */
    T: 1
  },
  /*::[*/
  1063: {
    /* n:"BrtEndSXView14", */
    T: -1
  },
  /*::[*/
  1064: {
    /* n:"BrtBeginSXView16", */
    T: 1
  },
  /*::[*/
  1065: {
    /* n:"BrtEndSXView16", */
    T: -1
  },
  /*::[*/
  1066: {
    /* n:"BrtBeginPCD14", */
    T: 1
  },
  /*::[*/
  1067: {
    /* n:"BrtEndPCD14", */
    T: -1
  },
  /*::[*/
  1068: {
    /* n:"BrtBeginExtConn14", */
    T: 1
  },
  /*::[*/
  1069: {
    /* n:"BrtEndExtConn14", */
    T: -1
  },
  /*::[*/
  1070: {
    /* n:"BrtBeginSlicerCacheIDs", */
    T: 1
  },
  /*::[*/
  1071: {
    /* n:"BrtEndSlicerCacheIDs", */
    T: -1
  },
  /*::[*/
  1072: {
    /* n:"BrtBeginSlicerCacheID", */
    T: 1
  },
  /*::[*/
  1073: {
    /* n:"BrtEndSlicerCacheID", */
    T: -1
  },
  /*::[*/
  1075: {
    /* n:"BrtBeginSlicerCache", */
    T: 1
  },
  /*::[*/
  1076: {
    /* n:"BrtEndSlicerCache", */
    T: -1
  },
  /*::[*/
  1077: {
    /* n:"BrtBeginSlicerCacheDef", */
    T: 1
  },
  /*::[*/
  1078: {
    /* n:"BrtEndSlicerCacheDef", */
    T: -1
  },
  /*::[*/
  1079: {
    /* n:"BrtBeginSlicersEx", */
    T: 1
  },
  /*::[*/
  1080: {
    /* n:"BrtEndSlicersEx", */
    T: -1
  },
  /*::[*/
  1081: {
    /* n:"BrtBeginSlicerEx", */
    T: 1
  },
  /*::[*/
  1082: {
    /* n:"BrtEndSlicerEx", */
    T: -1
  },
  /*::[*/
  1083: {
    /* n:"BrtBeginSlicer", */
    T: 1
  },
  /*::[*/
  1084: {
    /* n:"BrtEndSlicer", */
    T: -1
  },
  /*::[*/
  1085: {
    /* n:"BrtSlicerCachePivotTables" */
  },
  /*::[*/
  1086: {
    /* n:"BrtBeginSlicerCacheOlapImpl", */
    T: 1
  },
  /*::[*/
  1087: {
    /* n:"BrtEndSlicerCacheOlapImpl", */
    T: -1
  },
  /*::[*/
  1088: {
    /* n:"BrtBeginSlicerCacheLevelsData", */
    T: 1
  },
  /*::[*/
  1089: {
    /* n:"BrtEndSlicerCacheLevelsData", */
    T: -1
  },
  /*::[*/
  1090: {
    /* n:"BrtBeginSlicerCacheLevelData", */
    T: 1
  },
  /*::[*/
  1091: {
    /* n:"BrtEndSlicerCacheLevelData", */
    T: -1
  },
  /*::[*/
  1092: {
    /* n:"BrtBeginSlicerCacheSiRanges", */
    T: 1
  },
  /*::[*/
  1093: {
    /* n:"BrtEndSlicerCacheSiRanges", */
    T: -1
  },
  /*::[*/
  1094: {
    /* n:"BrtBeginSlicerCacheSiRange", */
    T: 1
  },
  /*::[*/
  1095: {
    /* n:"BrtEndSlicerCacheSiRange", */
    T: -1
  },
  /*::[*/
  1096: {
    /* n:"BrtSlicerCacheOlapItem" */
  },
  /*::[*/
  1097: {
    /* n:"BrtBeginSlicerCacheSelections", */
    T: 1
  },
  /*::[*/
  1098: {
    /* n:"BrtSlicerCacheSelection" */
  },
  /*::[*/
  1099: {
    /* n:"BrtEndSlicerCacheSelections", */
    T: -1
  },
  /*::[*/
  1100: {
    /* n:"BrtBeginSlicerCacheNative", */
    T: 1
  },
  /*::[*/
  1101: {
    /* n:"BrtEndSlicerCacheNative", */
    T: -1
  },
  /*::[*/
  1102: {
    /* n:"BrtSlicerCacheNativeItem" */
  },
  /*::[*/
  1103: {
    /* n:"BrtRangeProtection14" */
  },
  /*::[*/
  1104: {
    /* n:"BrtRangeProtectionIso14" */
  },
  /*::[*/
  1105: {
    /* n:"BrtCellIgnoreEC14" */
  },
  /*::[*/
  1111: {
    /* n:"BrtList14" */
  },
  /*::[*/
  1112: {
    /* n:"BrtCFIcon" */
  },
  /*::[*/
  1113: {
    /* n:"BrtBeginSlicerCachesPivotCacheIDs", */
    T: 1
  },
  /*::[*/
  1114: {
    /* n:"BrtEndSlicerCachesPivotCacheIDs", */
    T: -1
  },
  /*::[*/
  1115: {
    /* n:"BrtBeginSlicers", */
    T: 1
  },
  /*::[*/
  1116: {
    /* n:"BrtEndSlicers", */
    T: -1
  },
  /*::[*/
  1117: {
    /* n:"BrtWbProp14" */
  },
  /*::[*/
  1118: {
    /* n:"BrtBeginSXEdit", */
    T: 1
  },
  /*::[*/
  1119: {
    /* n:"BrtEndSXEdit", */
    T: -1
  },
  /*::[*/
  1120: {
    /* n:"BrtBeginSXEdits", */
    T: 1
  },
  /*::[*/
  1121: {
    /* n:"BrtEndSXEdits", */
    T: -1
  },
  /*::[*/
  1122: {
    /* n:"BrtBeginSXChange", */
    T: 1
  },
  /*::[*/
  1123: {
    /* n:"BrtEndSXChange", */
    T: -1
  },
  /*::[*/
  1124: {
    /* n:"BrtBeginSXChanges", */
    T: 1
  },
  /*::[*/
  1125: {
    /* n:"BrtEndSXChanges", */
    T: -1
  },
  /*::[*/
  1126: {
    /* n:"BrtSXTupleItems" */
  },
  /*::[*/
  1128: {
    /* n:"BrtBeginSlicerStyle", */
    T: 1
  },
  /*::[*/
  1129: {
    /* n:"BrtEndSlicerStyle", */
    T: -1
  },
  /*::[*/
  1130: {
    /* n:"BrtSlicerStyleElement" */
  },
  /*::[*/
  1131: {
    /* n:"BrtBeginStyleSheetExt14", */
    T: 1
  },
  /*::[*/
  1132: {
    /* n:"BrtEndStyleSheetExt14", */
    T: -1
  },
  /*::[*/
  1133: {
    /* n:"BrtBeginSlicerCachesPivotCacheID", */
    T: 1
  },
  /*::[*/
  1134: {
    /* n:"BrtEndSlicerCachesPivotCacheID", */
    T: -1
  },
  /*::[*/
  1135: {
    /* n:"BrtBeginConditionalFormattings", */
    T: 1
  },
  /*::[*/
  1136: {
    /* n:"BrtEndConditionalFormattings", */
    T: -1
  },
  /*::[*/
  1137: {
    /* n:"BrtBeginPCDCalcMemExt", */
    T: 1
  },
  /*::[*/
  1138: {
    /* n:"BrtEndPCDCalcMemExt", */
    T: -1
  },
  /*::[*/
  1139: {
    /* n:"BrtBeginPCDCalcMemsExt", */
    T: 1
  },
  /*::[*/
  1140: {
    /* n:"BrtEndPCDCalcMemsExt", */
    T: -1
  },
  /*::[*/
  1141: {
    /* n:"BrtPCDField14" */
  },
  /*::[*/
  1142: {
    /* n:"BrtBeginSlicerStyles", */
    T: 1
  },
  /*::[*/
  1143: {
    /* n:"BrtEndSlicerStyles", */
    T: -1
  },
  /*::[*/
  1144: {
    /* n:"BrtBeginSlicerStyleElements", */
    T: 1
  },
  /*::[*/
  1145: {
    /* n:"BrtEndSlicerStyleElements", */
    T: -1
  },
  /*::[*/
  1146: {
    /* n:"BrtCFRuleExt" */
  },
  /*::[*/
  1147: {
    /* n:"BrtBeginSXCondFmt14", */
    T: 1
  },
  /*::[*/
  1148: {
    /* n:"BrtEndSXCondFmt14", */
    T: -1
  },
  /*::[*/
  1149: {
    /* n:"BrtBeginSXCondFmts14", */
    T: 1
  },
  /*::[*/
  1150: {
    /* n:"BrtEndSXCondFmts14", */
    T: -1
  },
  /*::[*/
  1152: {
    /* n:"BrtBeginSortCond14", */
    T: 1
  },
  /*::[*/
  1153: {
    /* n:"BrtEndSortCond14", */
    T: -1
  },
  /*::[*/
  1154: {
    /* n:"BrtEndDVals14", */
    T: -1
  },
  /*::[*/
  1155: {
    /* n:"BrtEndIconSet14", */
    T: -1
  },
  /*::[*/
  1156: {
    /* n:"BrtEndDatabar14", */
    T: -1
  },
  /*::[*/
  1157: {
    /* n:"BrtBeginColorScale14", */
    T: 1
  },
  /*::[*/
  1158: {
    /* n:"BrtEndColorScale14", */
    T: -1
  },
  /*::[*/
  1159: {
    /* n:"BrtBeginSxrules14", */
    T: 1
  },
  /*::[*/
  1160: {
    /* n:"BrtEndSxrules14", */
    T: -1
  },
  /*::[*/
  1161: {
    /* n:"BrtBeginPRule14", */
    T: 1
  },
  /*::[*/
  1162: {
    /* n:"BrtEndPRule14", */
    T: -1
  },
  /*::[*/
  1163: {
    /* n:"BrtBeginPRFilters14", */
    T: 1
  },
  /*::[*/
  1164: {
    /* n:"BrtEndPRFilters14", */
    T: -1
  },
  /*::[*/
  1165: {
    /* n:"BrtBeginPRFilter14", */
    T: 1
  },
  /*::[*/
  1166: {
    /* n:"BrtEndPRFilter14", */
    T: -1
  },
  /*::[*/
  1167: {
    /* n:"BrtBeginPRFItem14", */
    T: 1
  },
  /*::[*/
  1168: {
    /* n:"BrtEndPRFItem14", */
    T: -1
  },
  /*::[*/
  1169: {
    /* n:"BrtBeginCellIgnoreECs14", */
    T: 1
  },
  /*::[*/
  1170: {
    /* n:"BrtEndCellIgnoreECs14", */
    T: -1
  },
  /*::[*/
  1171: {
    /* n:"BrtDxf14" */
  },
  /*::[*/
  1172: {
    /* n:"BrtBeginDxF14s", */
    T: 1
  },
  /*::[*/
  1173: {
    /* n:"BrtEndDxf14s", */
    T: -1
  },
  /*::[*/
  1177: {
    /* n:"BrtFilter14" */
  },
  /*::[*/
  1178: {
    /* n:"BrtBeginCustomFilters14", */
    T: 1
  },
  /*::[*/
  1180: {
    /* n:"BrtCustomFilter14" */
  },
  /*::[*/
  1181: {
    /* n:"BrtIconFilter14" */
  },
  /*::[*/
  1182: {
    /* n:"BrtPivotCacheConnectionName" */
  },
  /*::[*/
  2048: {
    /* n:"BrtBeginDecoupledPivotCacheIDs", */
    T: 1
  },
  /*::[*/
  2049: {
    /* n:"BrtEndDecoupledPivotCacheIDs", */
    T: -1
  },
  /*::[*/
  2050: {
    /* n:"BrtDecoupledPivotCacheID" */
  },
  /*::[*/
  2051: {
    /* n:"BrtBeginPivotTableRefs", */
    T: 1
  },
  /*::[*/
  2052: {
    /* n:"BrtEndPivotTableRefs", */
    T: -1
  },
  /*::[*/
  2053: {
    /* n:"BrtPivotTableRef" */
  },
  /*::[*/
  2054: {
    /* n:"BrtSlicerCacheBookPivotTables" */
  },
  /*::[*/
  2055: {
    /* n:"BrtBeginSxvcells", */
    T: 1
  },
  /*::[*/
  2056: {
    /* n:"BrtEndSxvcells", */
    T: -1
  },
  /*::[*/
  2057: {
    /* n:"BrtBeginSxRow", */
    T: 1
  },
  /*::[*/
  2058: {
    /* n:"BrtEndSxRow", */
    T: -1
  },
  /*::[*/
  2060: {
    /* n:"BrtPcdCalcMem15" */
  },
  /*::[*/
  2067: {
    /* n:"BrtQsi15" */
  },
  /*::[*/
  2068: {
    /* n:"BrtBeginWebExtensions", */
    T: 1
  },
  /*::[*/
  2069: {
    /* n:"BrtEndWebExtensions", */
    T: -1
  },
  /*::[*/
  2070: {
    /* n:"BrtWebExtension" */
  },
  /*::[*/
  2071: {
    /* n:"BrtAbsPath15" */
  },
  /*::[*/
  2072: {
    /* n:"BrtBeginPivotTableUISettings", */
    T: 1
  },
  /*::[*/
  2073: {
    /* n:"BrtEndPivotTableUISettings", */
    T: -1
  },
  /*::[*/
  2075: {
    /* n:"BrtTableSlicerCacheIDs" */
  },
  /*::[*/
  2076: {
    /* n:"BrtTableSlicerCacheID" */
  },
  /*::[*/
  2077: {
    /* n:"BrtBeginTableSlicerCache", */
    T: 1
  },
  /*::[*/
  2078: {
    /* n:"BrtEndTableSlicerCache", */
    T: -1
  },
  /*::[*/
  2079: {
    /* n:"BrtSxFilter15" */
  },
  /*::[*/
  2080: {
    /* n:"BrtBeginTimelineCachePivotCacheIDs", */
    T: 1
  },
  /*::[*/
  2081: {
    /* n:"BrtEndTimelineCachePivotCacheIDs", */
    T: -1
  },
  /*::[*/
  2082: {
    /* n:"BrtTimelineCachePivotCacheID" */
  },
  /*::[*/
  2083: {
    /* n:"BrtBeginTimelineCacheIDs", */
    T: 1
  },
  /*::[*/
  2084: {
    /* n:"BrtEndTimelineCacheIDs", */
    T: -1
  },
  /*::[*/
  2085: {
    /* n:"BrtBeginTimelineCacheID", */
    T: 1
  },
  /*::[*/
  2086: {
    /* n:"BrtEndTimelineCacheID", */
    T: -1
  },
  /*::[*/
  2087: {
    /* n:"BrtBeginTimelinesEx", */
    T: 1
  },
  /*::[*/
  2088: {
    /* n:"BrtEndTimelinesEx", */
    T: -1
  },
  /*::[*/
  2089: {
    /* n:"BrtBeginTimelineEx", */
    T: 1
  },
  /*::[*/
  2090: {
    /* n:"BrtEndTimelineEx", */
    T: -1
  },
  /*::[*/
  2091: {
    /* n:"BrtWorkBookPr15" */
  },
  /*::[*/
  2092: {
    /* n:"BrtPCDH15" */
  },
  /*::[*/
  2093: {
    /* n:"BrtBeginTimelineStyle", */
    T: 1
  },
  /*::[*/
  2094: {
    /* n:"BrtEndTimelineStyle", */
    T: -1
  },
  /*::[*/
  2095: {
    /* n:"BrtTimelineStyleElement" */
  },
  /*::[*/
  2096: {
    /* n:"BrtBeginTimelineStylesheetExt15", */
    T: 1
  },
  /*::[*/
  2097: {
    /* n:"BrtEndTimelineStylesheetExt15", */
    T: -1
  },
  /*::[*/
  2098: {
    /* n:"BrtBeginTimelineStyles", */
    T: 1
  },
  /*::[*/
  2099: {
    /* n:"BrtEndTimelineStyles", */
    T: -1
  },
  /*::[*/
  2100: {
    /* n:"BrtBeginTimelineStyleElements", */
    T: 1
  },
  /*::[*/
  2101: {
    /* n:"BrtEndTimelineStyleElements", */
    T: -1
  },
  /*::[*/
  2102: {
    /* n:"BrtDxf15" */
  },
  /*::[*/
  2103: {
    /* n:"BrtBeginDxfs15", */
    T: 1
  },
  /*::[*/
  2104: {
    /* n:"BrtEndDxfs15", */
    T: -1
  },
  /*::[*/
  2105: {
    /* n:"BrtSlicerCacheHideItemsWithNoData" */
  },
  /*::[*/
  2106: {
    /* n:"BrtBeginItemUniqueNames", */
    T: 1
  },
  /*::[*/
  2107: {
    /* n:"BrtEndItemUniqueNames", */
    T: -1
  },
  /*::[*/
  2108: {
    /* n:"BrtItemUniqueName" */
  },
  /*::[*/
  2109: {
    /* n:"BrtBeginExtConn15", */
    T: 1
  },
  /*::[*/
  2110: {
    /* n:"BrtEndExtConn15", */
    T: -1
  },
  /*::[*/
  2111: {
    /* n:"BrtBeginOledbPr15", */
    T: 1
  },
  /*::[*/
  2112: {
    /* n:"BrtEndOledbPr15", */
    T: -1
  },
  /*::[*/
  2113: {
    /* n:"BrtBeginDataFeedPr15", */
    T: 1
  },
  /*::[*/
  2114: {
    /* n:"BrtEndDataFeedPr15", */
    T: -1
  },
  /*::[*/
  2115: {
    /* n:"BrtTextPr15" */
  },
  /*::[*/
  2116: {
    /* n:"BrtRangePr15" */
  },
  /*::[*/
  2117: {
    /* n:"BrtDbCommand15" */
  },
  /*::[*/
  2118: {
    /* n:"BrtBeginDbTables15", */
    T: 1
  },
  /*::[*/
  2119: {
    /* n:"BrtEndDbTables15", */
    T: -1
  },
  /*::[*/
  2120: {
    /* n:"BrtDbTable15" */
  },
  /*::[*/
  2121: {
    /* n:"BrtBeginDataModel", */
    T: 1
  },
  /*::[*/
  2122: {
    /* n:"BrtEndDataModel", */
    T: -1
  },
  /*::[*/
  2123: {
    /* n:"BrtBeginModelTables", */
    T: 1
  },
  /*::[*/
  2124: {
    /* n:"BrtEndModelTables", */
    T: -1
  },
  /*::[*/
  2125: {
    /* n:"BrtModelTable" */
  },
  /*::[*/
  2126: {
    /* n:"BrtBeginModelRelationships", */
    T: 1
  },
  /*::[*/
  2127: {
    /* n:"BrtEndModelRelationships", */
    T: -1
  },
  /*::[*/
  2128: {
    /* n:"BrtModelRelationship" */
  },
  /*::[*/
  2129: {
    /* n:"BrtBeginECTxtWiz15", */
    T: 1
  },
  /*::[*/
  2130: {
    /* n:"BrtEndECTxtWiz15", */
    T: -1
  },
  /*::[*/
  2131: {
    /* n:"BrtBeginECTWFldInfoLst15", */
    T: 1
  },
  /*::[*/
  2132: {
    /* n:"BrtEndECTWFldInfoLst15", */
    T: -1
  },
  /*::[*/
  2133: {
    /* n:"BrtBeginECTWFldInfo15", */
    T: 1
  },
  /*::[*/
  2134: {
    /* n:"BrtFieldListActiveItem" */
  },
  /*::[*/
  2135: {
    /* n:"BrtPivotCacheIdVersion" */
  },
  /*::[*/
  2136: {
    /* n:"BrtSXDI15" */
  },
  /*::[*/
  2137: {
    /* n:"BrtBeginModelTimeGroupings", */
    T: 1
  },
  /*::[*/
  2138: {
    /* n:"BrtEndModelTimeGroupings", */
    T: -1
  },
  /*::[*/
  2139: {
    /* n:"BrtBeginModelTimeGrouping", */
    T: 1
  },
  /*::[*/
  2140: {
    /* n:"BrtEndModelTimeGrouping", */
    T: -1
  },
  /*::[*/
  2141: {
    /* n:"BrtModelTimeGroupingCalcCol" */
  },
  /*::[*/
  3072: {
    /* n:"BrtUid" */
  },
  /*::[*/
  3073: {
    /* n:"BrtRevisionPtr" */
  },
  /*::[*/
  4096: {
    /* n:"BrtBeginDynamicArrayPr", */
    T: 1
  },
  /*::[*/
  4097: {
    /* n:"BrtEndDynamicArrayPr", */
    T: -1
  },
  /*::[*/
  5002: {
    /* n:"BrtBeginRichValueBlock", */
    T: 1
  },
  /*::[*/
  5003: {
    /* n:"BrtEndRichValueBlock", */
    T: -1
  },
  /*::[*/
  5081: {
    /* n:"BrtBeginRichFilters", */
    T: 1
  },
  /*::[*/
  5082: {
    /* n:"BrtEndRichFilters", */
    T: -1
  },
  /*::[*/
  5083: {
    /* n:"BrtRichFilter" */
  },
  /*::[*/
  5084: {
    /* n:"BrtBeginRichFilterColumn", */
    T: 1
  },
  /*::[*/
  5085: {
    /* n:"BrtEndRichFilterColumn", */
    T: -1
  },
  /*::[*/
  5086: {
    /* n:"BrtBeginCustomRichFilters", */
    T: 1
  },
  /*::[*/
  5087: {
    /* n:"BrtEndCustomRichFilters", */
    T: -1
  },
  /*::[*/
  5088: {
    /* n:"BrtCustomRichFilter" */
  },
  /*::[*/
  5089: {
    /* n:"BrtTop10RichFilter" */
  },
  /*::[*/
  5090: {
    /* n:"BrtDynamicRichFilter" */
  },
  /*::[*/
  5092: {
    /* n:"BrtBeginRichSortCondition", */
    T: 1
  },
  /*::[*/
  5093: {
    /* n:"BrtEndRichSortCondition", */
    T: -1
  },
  /*::[*/
  5094: {
    /* n:"BrtRichFilterDateGroupItem" */
  },
  /*::[*/
  5095: {
    /* n:"BrtBeginCalcFeatures", */
    T: 1
  },
  /*::[*/
  5096: {
    /* n:"BrtEndCalcFeatures", */
    T: -1
  },
  /*::[*/
  5097: {
    /* n:"BrtCalcFeature" */
  },
  /*::[*/
  5099: {
    /* n:"BrtExternalLinksPr" */
  },
  /*::[*/
  65535: { n: "" }
};
function Q(e, r, t, n) {
  var a = r;
  if (!isNaN(a)) {
    var i = n || (t || []).length || 0, s = e.next(4);
    s.write_shift(2, a), s.write_shift(2, i), /*:: len != null &&*/
    i > 0 && Fi(t) && e.push(t);
  }
}
function zm(e, r, t, n) {
  var a = (t || []).length || 0;
  if (a <= 8224) return Q(e, r, t, a);
  var i = r;
  if (!isNaN(i)) {
    for (var s = t.parts || [], o = 0, l = 0, f = 0; f + (s[o] || 8224) <= 8224; )
      f += s[o] || 8224, o++;
    var c = e.next(4);
    for (c.write_shift(2, i), c.write_shift(2, f), e.push(t.slice(l, l + f)), l += f; l < a; ) {
      for (c = e.next(4), c.write_shift(2, 60), f = 0; f + (s[o] || 8224) <= 8224; )
        f += s[o] || 8224, o++;
      c.write_shift(2, f), e.push(t.slice(l, l + f)), l += f;
    }
  }
}
function Pn(e, r, t) {
  return e || (e = B(7)), e.write_shift(2, r), e.write_shift(2, t), e.write_shift(2, 0), e.write_shift(1, 0), e;
}
function Xm(e, r, t, n) {
  var a = B(9);
  return Pn(a, e, r), Ao(t, n || "b", a), a;
}
function jm(e, r, t) {
  var n = B(8 + 2 * t.length);
  return Pn(n, e, r), n.write_shift(1, t.length), n.write_shift(t.length, t, "sbcs"), n.l < n.length ? n.slice(0, n.l) : n;
}
function Ym(e, r, t, n) {
  if (r.v != null) switch (r.t) {
    case "d":
    case "n":
      var a = r.t == "d" ? ut(lt(r.v)) : r.v;
      a == (a | 0) && a >= 0 && a < 65536 ? Q(e, 2, fu(t, n, a)) : Q(e, 3, ou(t, n, a));
      return;
    case "b":
    case "e":
      Q(e, 5, Xm(t, n, r.v, r.t));
      return;
    /* TODO: codepage, sst */
    case "s":
    case "str":
      Q(e, 4, jm(t, n, (r.v || "").slice(0, 255)));
      return;
  }
  Q(e, 1, Pn(null, t, n));
}
function Km(e, r, t, n) {
  var a = Array.isArray(r), i = Ne(r["!ref"] || "A1"), s, o = "", l = [];
  if (i.e.c > 255 || i.e.r > 16383) {
    if (n.WTF) throw new Error("Range " + (r["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    i.e.c = Math.min(i.e.c, 255), i.e.r = Math.min(i.e.c, 16383), s = He(i);
  }
  for (var f = i.s.r; f <= i.e.r; ++f) {
    o = qe(f);
    for (var c = i.s.c; c <= i.e.c; ++c) {
      f === i.s.r && (l[c] = rt(c)), s = l[c] + o;
      var d = a ? (r[f] || [])[c] : r[s];
      d && Ym(e, d, f, c);
    }
  }
}
function Jm(e, r) {
  for (var t = r || {}, n = ht(), a = 0, i = 0; i < e.SheetNames.length; ++i) e.SheetNames[i] == t.sheet && (a = i);
  if (a == 0 && t.sheet && e.SheetNames[0] != t.sheet) throw new Error("Sheet not found: " + t.sheet);
  return Q(n, t.biff == 4 ? 1033 : t.biff == 3 ? 521 : 9, Ii(e, 16, t)), Km(n, e.Sheets[e.SheetNames[a]], a, t), Q(n, 10), n.end();
}
function Qm(e, r, t) {
  Q(e, 49, Vh({
    sz: 12,
    name: "Arial"
  }, t));
}
function Zm(e, r, t) {
  r && [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(n) {
    for (var a = n[0]; a <= n[1]; ++a) r[a] != null && Q(e, 1054, jh(a, r[a], t));
  });
}
function qm(e, r) {
  var t = B(19);
  t.write_shift(4, 2151), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(2, 3), t.write_shift(1, 1), t.write_shift(4, 0), Q(e, 2151, t), t = B(39), t.write_shift(4, 2152), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(2, 3), t.write_shift(1, 0), t.write_shift(4, 0), t.write_shift(2, 1), t.write_shift(4, 4), t.write_shift(2, 0), Ro(Ne(r["!ref"] || "A1"), t), t.write_shift(4, 4), Q(e, 2152, t);
}
function ep(e, r) {
  for (var t = 0; t < 16; ++t) Q(e, 224, V0({ numFmtId: 0, style: !0 }, 0, r));
  r.cellXfs.forEach(function(n) {
    Q(e, 224, V0(n, 0, r));
  });
}
function tp(e, r) {
  for (var t = 0; t < r["!links"].length; ++t) {
    var n = r["!links"][t];
    Q(e, 440, tu(n)), n[1].Tooltip && Q(e, 2048, ru(n));
  }
  delete r["!links"];
}
function rp(e, r) {
  if (r) {
    var t = 0;
    r.forEach(function(n, a) {
      ++t <= 256 && n && Q(e, 125, iu(ga(a, n), a));
    });
  }
}
function np(e, r, t, n, a) {
  var i = 16 + lr(a.cellXfs, r, a);
  if (r.v == null && !r.bf) {
    Q(e, 513, Sr(t, n, i));
    return;
  }
  if (r.bf) Q(e, 6, Ax(r, t, n, a, i));
  else switch (r.t) {
    case "d":
    case "n":
      var s = r.t == "d" ? ut(lt(r.v)) : r.v;
      Q(e, 515, Qh(t, n, s, i));
      break;
    case "b":
    case "e":
      Q(e, 517, Jh(t, n, r.v, i, a, r.t));
      break;
    /* TODO: codepage, sst */
    case "s":
    case "str":
      if (a.bookSST) {
        var o = Li(a.Strings, r.v, a.revStrings);
        Q(e, 253, zh(t, n, o, i));
      } else Q(e, 516, Xh(t, n, (r.v || "").slice(0, 255), i, a));
      break;
    default:
      Q(e, 513, Sr(t, n, i));
  }
}
function ap(e, r, t) {
  var n = ht(), a = t.SheetNames[e], i = t.Sheets[a] || {}, s = (t || {}).Workbook || {}, o = (s.Sheets || [])[e] || {}, l = Array.isArray(i), f = r.biff == 8, c, d = "", h = [], u = Ne(i["!ref"] || "A1"), v = f ? 65536 : 16384;
  if (u.e.c > 255 || u.e.r >= v) {
    if (r.WTF) throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    u.e.c = Math.min(u.e.c, 255), u.e.r = Math.min(u.e.c, v - 1);
  }
  Q(n, 2057, Ii(t, 16, r)), Q(n, 13, yt(1)), Q(n, 12, yt(100)), Q(n, 15, ft(!0)), Q(n, 17, ft(!1)), Q(n, 16, Er(1e-3)), Q(n, 95, ft(!0)), Q(n, 42, ft(!1)), Q(n, 43, ft(!1)), Q(n, 130, yt(1)), Q(n, 128, Kh()), Q(n, 131, ft(!1)), Q(n, 132, ft(!1)), f && rp(n, i["!cols"]), Q(n, 512, Yh(u, r)), f && (i["!links"] = []);
  for (var x = u.s.r; x <= u.e.r; ++x) {
    d = qe(x);
    for (var g = u.s.c; g <= u.e.c; ++g) {
      x === u.s.r && (h[g] = rt(g)), c = h[g] + d;
      var C = l ? (i[x] || [])[g] : i[c];
      C && (np(n, C, x, g, r), f && C.l && i["!links"].push([c, C.l]));
    }
  }
  var O = o.CodeName || o.name || a;
  return f && Q(n, 574, $h((s.Views || [])[0])), f && (i["!merges"] || []).length && Q(n, 229, eu(i["!merges"])), f && tp(n, i), Q(n, 442, Oo(O)), f && qm(n, i), Q(
    n,
    10
    /* EOF */
  ), n.end();
}
function ip(e, r, t) {
  var n = ht(), a = (e || {}).Workbook || {}, i = a.Sheets || [], s = (
    /*::((*/
    a.WBProps || {
      /*::CodeName:"ThisWorkbook"*/
    }
  ), o = t.biff == 8, l = t.biff == 5;
  if (Q(n, 2057, Ii(e, 5, t)), t.bookType == "xla" && Q(
    n,
    135
    /* Addin */
  ), Q(n, 225, o ? yt(1200) : null), Q(n, 193, Rh(2)), l && Q(
    n,
    191
    /* ToolbarHdr */
  ), l && Q(
    n,
    192
    /* ToolbarEnd */
  ), Q(
    n,
    226
    /* InterfaceEnd */
  ), Q(n, 92, Uh("SheetJS", t)), Q(n, 66, yt(o ? 1200 : 1252)), o && Q(n, 353, yt(0)), o && Q(
    n,
    448
    /* Excel9File */
  ), Q(n, 317, su(e.SheetNames.length)), o && e.vbaraw && Q(
    n,
    211
    /* ObProj */
  ), o && e.vbaraw) {
    var f = s.CodeName || "ThisWorkbook";
    Q(n, 442, Oo(f));
  }
  Q(n, 156, yt(17)), Q(n, 25, ft(!1)), Q(n, 18, ft(!1)), Q(n, 19, yt(0)), o && Q(n, 431, ft(!1)), o && Q(n, 444, yt(0)), Q(n, 61, Gh()), Q(n, 64, ft(!1)), Q(n, 141, yt(0)), Q(n, 34, ft(cm(e) == "true")), Q(n, 14, ft(!0)), o && Q(n, 439, ft(!1)), Q(n, 218, yt(0)), Qm(n, e, t), Zm(n, e.SSF, t), ep(n, t), o && Q(n, 352, ft(!1));
  var c = n.end(), d = ht();
  o && Q(d, 140, nu()), o && t.Strings && zm(d, 252, Hh(t.Strings)), Q(
    d,
    10
    /* EOF */
  );
  var h = d.end(), u = ht(), v = 0, x = 0;
  for (x = 0; x < e.SheetNames.length; ++x) v += (o ? 12 : 11) + (o ? 2 : 1) * e.SheetNames[x].length;
  var g = c.length + v + h.length;
  for (x = 0; x < e.SheetNames.length; ++x) {
    var C = i[x] || {};
    Q(u, 133, Wh({ pos: g, hs: C.Hidden || 0, dt: 0, name: e.SheetNames[x] }, t)), g += r[x].length;
  }
  var O = u.end();
  if (v != O.length) throw new Error("BS8 " + v + " != " + O.length);
  var F = [];
  return c.length && F.push(c), O.length && F.push(O), h.length && F.push(h), Qe(F);
}
function sp(e, r) {
  var t = r || {}, n = [];
  e && !e.SSF && (e.SSF = xt(Be)), e && e.SSF && (da(), xa(e.SSF), t.revssf = ma(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Bi(t), t.cellXfs = [], lr(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {});
  for (var a = 0; a < e.SheetNames.length; ++a) n[n.length] = ap(a, t, e);
  return n.unshift(ip(e, n, t)), Qe(n);
}
function rf(e, r) {
  for (var t = 0; t <= e.SheetNames.length; ++t) {
    var n = e.Sheets[e.SheetNames[t]];
    if (!(!n || !n["!ref"])) {
      var a = gt(n["!ref"]);
      a.e.c > 255 && typeof console < "u" && console.error && console.error("Worksheet '" + e.SheetNames[t] + "' extends beyond column IV (255).  Data may be lost.");
    }
  }
  var i = r || {};
  switch (i.biff || 2) {
    case 8:
    case 5:
      return sp(e, r);
    case 4:
    case 3:
    case 2:
      return Jm(e, r);
  }
  throw new Error("invalid type " + i.bookType + " for BIFF");
}
function op(e, r, t, n) {
  for (var a = e["!merges"] || [], i = [], s = r.s.c; s <= r.e.c; ++s) {
    for (var o = 0, l = 0, f = 0; f < a.length; ++f)
      if (!(a[f].s.r > t || a[f].s.c > s) && !(a[f].e.r < t || a[f].e.c < s)) {
        if (a[f].s.r < t || a[f].s.c < s) {
          o = -1;
          break;
        }
        o = a[f].e.r - a[f].s.r + 1, l = a[f].e.c - a[f].s.c + 1;
        break;
      }
    if (!(o < 0)) {
      var c = Fe({ r: t, c: s }), d = n.dense ? (e[t] || [])[s] : e[c], h = d && d.v != null && (d.h || bc(d.w || (Xt(d), d.w) || "")) || "", u = {};
      o > 1 && (u.rowspan = o), l > 1 && (u.colspan = l), n.editable ? h = '<span contenteditable="true">' + h + "</span>" : d && (u["data-t"] = d && d.t || "z", d.v != null && (u["data-v"] = d.v), d.z != null && (u["data-z"] = d.z), d.l && (d.l.Target || "#").charAt(0) != "#" && (h = '<a href="' + d.l.Target + '">' + h + "</a>")), u.id = (n.id || "sjs") + "-" + c, i.push(J("td", h, u));
    }
  }
  var v = "<tr>";
  return v + i.join("") + "</tr>";
}
var fp = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>', lp = "</body></html>";
function cp(e, r, t) {
  var n = [];
  return n.join("") + "<table" + (t && t.id ? ' id="' + t.id + '"' : "") + ">";
}
function nf(e, r) {
  var t = r || {}, n = t.header != null ? t.header : fp, a = t.footer != null ? t.footer : lp, i = [n], s = gt(e["!ref"]);
  t.dense = Array.isArray(e), i.push(cp(e, s, t));
  for (var o = s.s.r; o <= s.e.r; ++o) i.push(op(e, s, o, t));
  return i.push("</table>" + a), i.join("");
}
function af(e, r, t) {
  var n = t || {}, a = 0, i = 0;
  if (n.origin != null)
    if (typeof n.origin == "number") a = n.origin;
    else {
      var s = typeof n.origin == "string" ? Xe(n.origin) : n.origin;
      a = s.r, i = s.c;
    }
  var o = r.getElementsByTagName("tr"), l = Math.min(n.sheetRows || 1e7, o.length), f = { s: { r: 0, c: 0 }, e: { r: a, c: i } };
  if (e["!ref"]) {
    var c = gt(e["!ref"]);
    f.s.r = Math.min(f.s.r, c.s.r), f.s.c = Math.min(f.s.c, c.s.c), f.e.r = Math.max(f.e.r, c.e.r), f.e.c = Math.max(f.e.c, c.e.c), a == -1 && (f.e.r = a = c.e.r + 1);
  }
  var d = [], h = 0, u = e["!rows"] || (e["!rows"] = []), v = 0, x = 0, g = 0, C = 0, O = 0, F = 0;
  for (e["!cols"] || (e["!cols"] = []); v < o.length && x < l; ++v) {
    var L = o[v];
    if (Q0(L)) {
      if (n.display) continue;
      u[x] = { hidden: !0 };
    }
    var Y = L.children;
    for (g = C = 0; g < Y.length; ++g) {
      var q = Y[g];
      if (!(n.display && Q0(q))) {
        var R = q.hasAttribute("data-v") ? q.getAttribute("data-v") : q.hasAttribute("v") ? q.getAttribute("v") : Gc(q.innerHTML), U = q.getAttribute("data-z") || q.getAttribute("z");
        for (h = 0; h < d.length; ++h) {
          var k = d[h];
          k.s.c == C + i && k.s.r < x + a && x + a <= k.e.r && (C = k.e.c + 1 - i, h = -1);
        }
        F = +q.getAttribute("colspan") || 1, ((O = +q.getAttribute("rowspan") || 1) > 1 || F > 1) && d.push({ s: { r: x + a, c: C + i }, e: { r: x + a + (O || 1) - 1, c: C + i + (F || 1) - 1 } });
        var W = { t: "s", v: R }, H = q.getAttribute("data-t") || q.getAttribute("t") || "";
        R != null && (R.length == 0 ? W.t = H || "z" : n.raw || R.trim().length == 0 || H == "s" || (R === "TRUE" ? W = { t: "b", v: !0 } : R === "FALSE" ? W = { t: "b", v: !1 } : isNaN($t(R)) ? isNaN(En(R).getDate()) || (W = { t: "d", v: lt(R) }, n.cellDates || (W = { t: "n", v: ut(W.v) }), W.z = n.dateNF || Be[14]) : W = { t: "n", v: $t(R) })), W.z === void 0 && U != null && (W.z = U);
        var z = "", ee = q.getElementsByTagName("A");
        if (ee && ee.length) for (var Ce = 0; Ce < ee.length && !(ee[Ce].hasAttribute("href") && (z = ee[Ce].getAttribute("href"), z.charAt(0) != "#")); ++Ce) ;
        z && z.charAt(0) != "#" && (W.l = { Target: z }), n.dense ? (e[x + a] || (e[x + a] = []), e[x + a][C + i] = W) : e[Fe({ c: C + i, r: x + a })] = W, f.e.c < C + i && (f.e.c = C + i), C += F;
      }
    }
    ++x;
  }
  return d.length && (e["!merges"] = (e["!merges"] || []).concat(d)), f.e.r = Math.max(f.e.r, x - 1 + a), e["!ref"] = He(f), x >= l && (e["!fullref"] = He((f.e.r = o.length - v + x - 1 + a, f))), e;
}
function sf(e, r) {
  var t = r || {}, n = t.dense ? [] : {};
  return af(n, e, r);
}
function hp(e, r) {
  return yr(sf(e, r), r);
}
function Q0(e) {
  var r = "", t = up(e);
  return t && (r = t(e).getPropertyValue("display")), r || (r = e.style && e.style.display), r === "none";
}
function up(e) {
  return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}
var xp = /* @__PURE__ */ (function() {
  var e = [
    "<office:master-styles>",
    '<style:master-page style:name="mp1" style:page-layout-name="mp1">',
    "<style:header/>",
    '<style:header-left style:display="false"/>',
    "<style:footer/>",
    '<style:footer-left style:display="false"/>',
    "</style:master-page>",
    "</office:master-styles>"
  ].join(""), r = "<office:document-styles " + yn({
    "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
    "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
    "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
    "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
    "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
    "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    "xmlns:dc": "http://purl.org/dc/elements/1.1/",
    "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
    "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
    "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
    "office:version": "1.2"
  }) + ">" + e + "</office:document-styles>";
  return function() {
    return Ge + r;
  };
})(), Z0 = /* @__PURE__ */ (function() {
  var e = function(i) {
    return ye(i).replace(/  +/g, function(s) {
      return '<text:s text:c="' + s.length + '"/>';
    }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>");
  }, r = `          <table:table-cell />
`, t = `          <table:covered-table-cell/>
`, n = function(i, s, o) {
    var l = [];
    l.push('      <table:table table:name="' + ye(s.SheetNames[o]) + `" table:style-name="ta1">
`);
    var f = 0, c = 0, d = gt(i["!ref"] || "A1"), h = i["!merges"] || [], u = 0, v = Array.isArray(i);
    if (i["!cols"])
      for (c = 0; c <= d.e.c; ++c) l.push("        <table:table-column" + (i["!cols"][c] ? ' table:style-name="co' + i["!cols"][c].ods + '"' : "") + `></table:table-column>
`);
    var x = "", g = i["!rows"] || [];
    for (f = 0; f < d.s.r; ++f)
      x = g[f] ? ' table:style-name="ro' + g[f].ods + '"' : "", l.push("        <table:table-row" + x + `></table:table-row>
`);
    for (; f <= d.e.r; ++f) {
      for (x = g[f] ? ' table:style-name="ro' + g[f].ods + '"' : "", l.push("        <table:table-row" + x + `>
`), c = 0; c < d.s.c; ++c) l.push(r);
      for (; c <= d.e.c; ++c) {
        var C = !1, O = {}, F = "";
        for (u = 0; u != h.length; ++u)
          if (!(h[u].s.c > c) && !(h[u].s.r > f) && !(h[u].e.c < c) && !(h[u].e.r < f)) {
            (h[u].s.c != c || h[u].s.r != f) && (C = !0), O["table:number-columns-spanned"] = h[u].e.c - h[u].s.c + 1, O["table:number-rows-spanned"] = h[u].e.r - h[u].s.r + 1;
            break;
          }
        if (C) {
          l.push(t);
          continue;
        }
        var L = Fe({ r: f, c }), Y = v ? (i[f] || [])[c] : i[L];
        if (Y && Y.f && (O["table:formula"] = ye(Dx(Y.f)), Y.F && Y.F.slice(0, L.length) == L)) {
          var q = gt(Y.F);
          O["table:number-matrix-columns-spanned"] = q.e.c - q.s.c + 1, O["table:number-matrix-rows-spanned"] = q.e.r - q.s.r + 1;
        }
        if (!Y) {
          l.push(r);
          continue;
        }
        switch (Y.t) {
          case "b":
            F = Y.v ? "TRUE" : "FALSE", O["office:value-type"] = "boolean", O["office:boolean-value"] = Y.v ? "true" : "false";
            break;
          case "n":
            F = Y.w || String(Y.v || 0), O["office:value-type"] = "float", O["office:value"] = Y.v || 0;
            break;
          case "s":
          case "str":
            F = Y.v == null ? "" : Y.v, O["office:value-type"] = "string";
            break;
          case "d":
            F = Y.w || lt(Y.v).toISOString(), O["office:value-type"] = "date", O["office:date-value"] = lt(Y.v).toISOString(), O["table:style-name"] = "ce1";
            break;
          //case 'e':
          default:
            l.push(r);
            continue;
        }
        var R = e(F);
        if (Y.l && Y.l.Target) {
          var U = Y.l.Target;
          U = U.charAt(0) == "#" ? "#" + Px(U.slice(1)) : U, U.charAt(0) != "#" && !U.match(/^\w+:/) && (U = "../" + U), R = J("text:a", R, { "xlink:href": U.replace(/&/g, "&amp;") });
        }
        l.push("          " + J("table:table-cell", J("text:p", R, {}), O) + `
`);
      }
      l.push(`        </table:table-row>
`);
    }
    return l.push(`      </table:table>
`), l.join("");
  }, a = function(i, s) {
    i.push(` <office:automatic-styles>
`), i.push(`  <number:date-style style:name="N37" number:automatic-order="true">
`), i.push(`   <number:month number:style="long"/>
`), i.push(`   <number:text>/</number:text>
`), i.push(`   <number:day number:style="long"/>
`), i.push(`   <number:text>/</number:text>
`), i.push(`   <number:year/>
`), i.push(`  </number:date-style>
`);
    var o = 0;
    s.SheetNames.map(function(f) {
      return s.Sheets[f];
    }).forEach(function(f) {
      if (f && f["!cols"]) {
        for (var c = 0; c < f["!cols"].length; ++c) if (f["!cols"][c]) {
          var d = f["!cols"][c];
          if (d.width == null && d.wpx == null && d.wch == null) continue;
          Ni(d), d.ods = o;
          var h = f["!cols"][c].wpx + "px";
          i.push('  <style:style style:name="co' + o + `" style:family="table-column">
`), i.push('   <style:table-column-properties fo:break-before="auto" style:column-width="' + h + `"/>
`), i.push(`  </style:style>
`), ++o;
        }
      }
    });
    var l = 0;
    s.SheetNames.map(function(f) {
      return s.Sheets[f];
    }).forEach(function(f) {
      if (f && f["!rows"]) {
        for (var c = 0; c < f["!rows"].length; ++c) if (f["!rows"][c]) {
          f["!rows"][c].ods = l;
          var d = f["!rows"][c].hpx + "px";
          i.push('  <style:style style:name="ro' + l + `" style:family="table-row">
`), i.push('   <style:table-row-properties fo:break-before="auto" style:row-height="' + d + `"/>
`), i.push(`  </style:style>
`), ++l;
        }
      }
    }), i.push(`  <style:style style:name="ta1" style:family="table" style:master-page-name="mp1">
`), i.push(`   <style:table-properties table:display="true" style:writing-mode="lr-tb"/>
`), i.push(`  </style:style>
`), i.push(`  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>
`), i.push(` </office:automatic-styles>
`);
  };
  return function(s, o) {
    var l = [Ge], f = yn({
      "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
      "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
      "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
      "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
      "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
      "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "xmlns:dc": "http://purl.org/dc/elements/1.1/",
      "xmlns:meta": "urn:oasis:names:tc:opendocument:xmlns:meta:1.0",
      "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
      "xmlns:presentation": "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
      "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
      "xmlns:chart": "urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
      "xmlns:dr3d": "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",
      "xmlns:math": "http://www.w3.org/1998/Math/MathML",
      "xmlns:form": "urn:oasis:names:tc:opendocument:xmlns:form:1.0",
      "xmlns:script": "urn:oasis:names:tc:opendocument:xmlns:script:1.0",
      "xmlns:ooo": "http://openoffice.org/2004/office",
      "xmlns:ooow": "http://openoffice.org/2004/writer",
      "xmlns:oooc": "http://openoffice.org/2004/calc",
      "xmlns:dom": "http://www.w3.org/2001/xml-events",
      "xmlns:xforms": "http://www.w3.org/2002/xforms",
      "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "xmlns:sheet": "urn:oasis:names:tc:opendocument:sh33tjs:1.0",
      "xmlns:rpt": "http://openoffice.org/2005/report",
      "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
      "xmlns:xhtml": "http://www.w3.org/1999/xhtml",
      "xmlns:grddl": "http://www.w3.org/2003/g/data-view#",
      "xmlns:tableooo": "http://openoffice.org/2009/table",
      "xmlns:drawooo": "http://openoffice.org/2010/draw",
      "xmlns:calcext": "urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0",
      "xmlns:loext": "urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0",
      "xmlns:field": "urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0",
      "xmlns:formx": "urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0",
      "xmlns:css3t": "http://www.w3.org/TR/css3-text/",
      "office:version": "1.2"
    }), c = yn({
      "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
      "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
    });
    o.bookType == "fods" ? (l.push("<office:document" + f + c + `>
`), l.push(wo().replace(/office:document-meta/g, "office:meta"))) : l.push("<office:document-content" + f + `>
`), a(l, s), l.push(`  <office:body>
`), l.push(`    <office:spreadsheet>
`);
    for (var d = 0; d != s.SheetNames.length; ++d) l.push(n(s.Sheets[s.SheetNames[d]], s, d));
    return l.push(`    </office:spreadsheet>
`), l.push(`  </office:body>
`), o.bookType == "fods" ? l.push("</office:document>") : l.push("</office:document-content>"), l.join("");
  };
})();
function of(e, r) {
  if (r.bookType == "fods") return Z0(e, r);
  var t = Ti(), n = "", a = [], i = [];
  return n = "mimetype", ue(t, n, "application/vnd.oasis.opendocument.spreadsheet"), n = "content.xml", ue(t, n, Z0(e, r)), a.push([n, "text/xml"]), i.push([n, "ContentFile"]), n = "styles.xml", ue(t, n, xp(e, r)), a.push([n, "text/xml"]), i.push([n, "StylesFile"]), n = "meta.xml", ue(t, n, Ge + wo(
    /*::wb, opts*/
  )), a.push([n, "text/xml"]), i.push([n, "MetadataFile"]), n = "manifest.rdf", ue(t, n, Fh(
    i
    /*, opts*/
  )), a.push([n, "application/rdf+xml"]), n = "META-INF/manifest.xml", ue(t, n, Sh(
    a
    /*, opts*/
  )), t;
}
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
function ca(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function dp(e) {
  return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : Rt(Sn(e));
}
function mp(e, r) {
  e:
    for (var t = 0; t <= e.length - r.length; ++t) {
      for (var n = 0; n < r.length; ++n)
        if (e[t + n] != r[n])
          continue e;
      return !0;
    }
  return !1;
}
function or(e) {
  var r = e.reduce(function(a, i) {
    return a + i.length;
  }, 0), t = new Uint8Array(r), n = 0;
  return e.forEach(function(a) {
    t.set(a, n), n += a.length;
  }), t;
}
function pp(e, r, t) {
  var n = Math.floor(t == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(t))) + 6176 - 20, a = t / Math.pow(10, n - 6176);
  e[r + 15] |= n >> 7, e[r + 14] |= (n & 127) << 1;
  for (var i = 0; a >= 1; ++i, a /= 256)
    e[r + i] = a & 255;
  e[r + 15] |= t >= 0 ? 0 : 128;
}
function Fn(e, r) {
  var t = r ? r[0] : 0, n = e[t] & 127;
  e:
    if (e[t++] >= 128 && (n |= (e[t] & 127) << 7, e[t++] < 128 || (n |= (e[t] & 127) << 14, e[t++] < 128) || (n |= (e[t] & 127) << 21, e[t++] < 128) || (n += (e[t] & 127) * Math.pow(2, 28), ++t, e[t++] < 128) || (n += (e[t] & 127) * Math.pow(2, 35), ++t, e[t++] < 128) || (n += (e[t] & 127) * Math.pow(2, 42), ++t, e[t++] < 128)))
      break e;
  return r && (r[0] = t), n;
}
function Ee(e) {
  var r = new Uint8Array(7);
  r[0] = e & 127;
  var t = 1;
  e:
    if (e > 127) {
      if (r[t - 1] |= 128, r[t] = e >> 7 & 127, ++t, e <= 16383 || (r[t - 1] |= 128, r[t] = e >> 14 & 127, ++t, e <= 2097151) || (r[t - 1] |= 128, r[t] = e >> 21 & 127, ++t, e <= 268435455) || (r[t - 1] |= 128, r[t] = e / 256 >>> 21 & 127, ++t, e <= 34359738367) || (r[t - 1] |= 128, r[t] = e / 65536 >>> 21 & 127, ++t, e <= 4398046511103))
        break e;
      r[t - 1] |= 128, r[t] = e / 16777216 >>> 21 & 127, ++t;
    }
  return r.slice(0, t);
}
function Hr(e) {
  var r = 0, t = e[r] & 127;
  e:
    if (e[r++] >= 128) {
      if (t |= (e[r] & 127) << 7, e[r++] < 128 || (t |= (e[r] & 127) << 14, e[r++] < 128) || (t |= (e[r] & 127) << 21, e[r++] < 128))
        break e;
      t |= (e[r] & 127) << 28;
    }
  return t;
}
function $e(e) {
  for (var r = [], t = [0]; t[0] < e.length; ) {
    var n = t[0], a = Fn(e, t), i = a & 7;
    a = Math.floor(a / 8);
    var s = 0, o;
    if (a == 0)
      break;
    switch (i) {
      case 0:
        {
          for (var l = t[0]; e[t[0]++] >= 128; )
            ;
          o = e.slice(l, t[0]);
        }
        break;
      case 5:
        s = 4, o = e.slice(t[0], t[0] + s), t[0] += s;
        break;
      case 1:
        s = 8, o = e.slice(t[0], t[0] + s), t[0] += s;
        break;
      case 2:
        s = Fn(e, t), o = e.slice(t[0], t[0] + s), t[0] += s;
        break;
      case 3:
      case 4:
      default:
        throw new Error("PB Type ".concat(i, " for Field ").concat(a, " at offset ").concat(n));
    }
    var f = { data: o, type: i };
    r[a] == null ? r[a] = [f] : r[a].push(f);
  }
  return r;
}
function Ke(e) {
  var r = [];
  return e.forEach(function(t, n) {
    t.forEach(function(a) {
      a.data && (r.push(Ee(n * 8 + a.type)), a.type == 2 && r.push(Ee(a.data.length)), r.push(a.data));
    });
  }), or(r);
}
function At(e) {
  for (var r, t = [], n = [0]; n[0] < e.length; ) {
    var a = Fn(e, n), i = $e(e.slice(n[0], n[0] + a));
    n[0] += a;
    var s = {
      id: Hr(i[1][0].data),
      messages: []
    };
    i[2].forEach(function(o) {
      var l = $e(o.data), f = Hr(l[3][0].data);
      s.messages.push({
        meta: l,
        data: e.slice(n[0], n[0] + f)
      }), n[0] += f;
    }), (r = i[3]) != null && r[0] && (s.merge = Hr(i[3][0].data) >>> 0 > 0), t.push(s);
  }
  return t;
}
function Ir(e) {
  var r = [];
  return e.forEach(function(t) {
    var n = [];
    n[1] = [{ data: Ee(t.id), type: 0 }], n[2] = [], t.merge != null && (n[3] = [{ data: Ee(+!!t.merge), type: 0 }]);
    var a = [];
    t.messages.forEach(function(s) {
      a.push(s.data), s.meta[3] = [{ type: 0, data: Ee(s.data.length) }], n[2].push({ data: Ke(s.meta), type: 2 });
    });
    var i = Ke(n);
    r.push(Ee(i.length)), r.push(i), a.forEach(function(s) {
      return r.push(s);
    });
  }), or(r);
}
function vp(e, r) {
  if (e != 0)
    throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var t = [0], n = Fn(r, t), a = []; t[0] < r.length; ) {
    var i = r[t[0]] & 3;
    if (i == 0) {
      var s = r[t[0]++] >> 2;
      if (s < 60)
        ++s;
      else {
        var o = s - 59;
        s = r[t[0]], o > 1 && (s |= r[t[0] + 1] << 8), o > 2 && (s |= r[t[0] + 2] << 16), o > 3 && (s |= r[t[0] + 3] << 24), s >>>= 0, s++, t[0] += o;
      }
      a.push(r.slice(t[0], t[0] + s)), t[0] += s;
      continue;
    } else {
      var l = 0, f = 0;
      if (i == 1 ? (f = (r[t[0]] >> 2 & 7) + 4, l = (r[t[0]++] & 224) << 3, l |= r[t[0]++]) : (f = (r[t[0]++] >> 2) + 1, i == 2 ? (l = r[t[0]] | r[t[0] + 1] << 8, t[0] += 2) : (l = (r[t[0]] | r[t[0] + 1] << 8 | r[t[0] + 2] << 16 | r[t[0] + 3] << 24) >>> 0, t[0] += 4)), a = [or(a)], l == 0)
        throw new Error("Invalid offset 0");
      if (l > a[0].length)
        throw new Error("Invalid offset beyond length");
      if (f >= l)
        for (a.push(a[0].slice(-l)), f -= l; f >= a[a.length - 1].length; )
          a.push(a[a.length - 1]), f -= a[a.length - 1].length;
      a.push(a[0].slice(-l, -l + f));
    }
  }
  var c = or(a);
  if (c.length != n)
    throw new Error("Unexpected length: ".concat(c.length, " != ").concat(n));
  return c;
}
function kt(e) {
  for (var r = [], t = 0; t < e.length; ) {
    var n = e[t++], a = e[t] | e[t + 1] << 8 | e[t + 2] << 16;
    t += 3, r.push(vp(n, e.slice(t, t + a))), t += a;
  }
  if (t !== e.length)
    throw new Error("data is not a valid framed stream!");
  return or(r);
}
function Nr(e) {
  for (var r = [], t = 0; t < e.length; ) {
    var n = Math.min(e.length - t, 268435455), a = new Uint8Array(4);
    r.push(a);
    var i = Ee(n), s = i.length;
    r.push(i), n <= 60 ? (s++, r.push(new Uint8Array([n - 1 << 2]))) : n <= 256 ? (s += 2, r.push(new Uint8Array([240, n - 1 & 255]))) : n <= 65536 ? (s += 3, r.push(new Uint8Array([244, n - 1 & 255, n - 1 >> 8 & 255]))) : n <= 16777216 ? (s += 4, r.push(new Uint8Array([248, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255]))) : n <= 4294967296 && (s += 5, r.push(new Uint8Array([252, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255, n - 1 >>> 24 & 255]))), r.push(e.slice(t, t + n)), s += n, a[0] = 0, a[1] = s & 255, a[2] = s >> 8 & 255, a[3] = s >> 16 & 255, t += n;
  }
  return or(r);
}
function Ba(e, r) {
  var t = new Uint8Array(32), n = ca(t), a = 12, i = 0;
  switch (t[0] = 5, e.t) {
    case "n":
      t[1] = 2, pp(t, a, e.v), i |= 1, a += 16;
      break;
    case "b":
      t[1] = 6, n.setFloat64(a, e.v ? 1 : 0, !0), i |= 2, a += 8;
      break;
    case "s":
      if (r.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      t[1] = 3, n.setUint32(a, r.indexOf(e.v), !0), i |= 8, a += 4;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return n.setUint32(8, i, !0), t.slice(0, a);
}
function ba(e, r) {
  var t = new Uint8Array(32), n = ca(t), a = 12, i = 0;
  switch (t[0] = 3, e.t) {
    case "n":
      t[2] = 2, n.setFloat64(a, e.v, !0), i |= 32, a += 8;
      break;
    case "b":
      t[2] = 6, n.setFloat64(a, e.v ? 1 : 0, !0), i |= 32, a += 8;
      break;
    case "s":
      if (r.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      t[2] = 3, n.setUint32(a, r.indexOf(e.v), !0), i |= 16, a += 4;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return n.setUint32(4, i, !0), t.slice(0, a);
}
function Yt(e) {
  var r = $e(e);
  return Fn(r[1][0].data);
}
function _p(e, r, t) {
  var n, a, i, s;
  if (!((n = e[6]) != null && n[0]) || !((a = e[7]) != null && a[0]))
    throw "Mutation only works on post-BNC storages!";
  var o = ((s = (i = e[8]) == null ? void 0 : i[0]) == null ? void 0 : s.data) && Hr(e[8][0].data) > 0 || !1;
  if (o)
    throw "Math only works with normal offsets";
  for (var l = 0, f = ca(e[7][0].data), c = 0, d = [], h = ca(e[4][0].data), u = 0, v = [], x = 0; x < r.length; ++x) {
    if (r[x] == null) {
      f.setUint16(x * 2, 65535, !0), h.setUint16(x * 2, 65535);
      continue;
    }
    f.setUint16(x * 2, c, !0), h.setUint16(x * 2, u, !0);
    var g, C;
    switch (typeof r[x]) {
      case "string":
        g = Ba({ t: "s", v: r[x] }, t), C = ba({ t: "s", v: r[x] }, t);
        break;
      case "number":
        g = Ba({ t: "n", v: r[x] }, t), C = ba({ t: "n", v: r[x] }, t);
        break;
      case "boolean":
        g = Ba({ t: "b", v: r[x] }, t), C = ba({ t: "b", v: r[x] }, t);
        break;
      default:
        throw new Error("Unsupported value " + r[x]);
    }
    d.push(g), c += g.length, v.push(C), u += C.length, ++l;
  }
  for (e[2][0].data = Ee(l); x < e[7][0].data.length / 2; ++x)
    f.setUint16(x * 2, 65535, !0), h.setUint16(x * 2, 65535, !0);
  return e[6][0].data = or(d), e[3][0].data = or(v), l;
}
function gp(e, r) {
  if (!r || !r.numbers)
    throw new Error("Must pass a `numbers` option -- check the README");
  var t = e.Sheets[e.SheetNames[0]];
  e.SheetNames.length > 1 && console.error("The Numbers writer currently writes only the first table");
  var n = gt(t["!ref"]);
  n.s.r = n.s.c = 0;
  var a = !1;
  n.e.c > 9 && (a = !0, n.e.c = 9), n.e.r > 49 && (a = !0, n.e.r = 49), a && console.error("The Numbers writer is currently limited to ".concat(He(n)));
  var i = ha(t, { range: n, header: 1 }), s = ["~Sh33tJ5~"];
  i.forEach(function(M) {
    return M.forEach(function(A) {
      typeof A == "string" && s.push(A);
    });
  });
  var o = {}, l = [], f = Ae.read(r.numbers, { type: "base64" });
  f.FileIndex.map(function(M, A) {
    return [M, f.FullPaths[A]];
  }).forEach(function(M) {
    var A = M[0], y = M[1];
    if (A.type == 2 && A.name.match(/\.iwa/)) {
      var V = A.content, oe = kt(V), fe = At(oe);
      fe.forEach(function(se) {
        l.push(se.id), o[se.id] = { deps: [], location: y, type: Hr(se.messages[0].meta[1][0].data) };
      });
    }
  }), l.sort(function(M, A) {
    return M - A;
  });
  var c = l.filter(function(M) {
    return M > 1;
  }).map(function(M) {
    return [M, Ee(M)];
  });
  f.FileIndex.map(function(M, A) {
    return [M, f.FullPaths[A]];
  }).forEach(function(M) {
    var A = M[0];
    if (M[1], !!A.name.match(/\.iwa/)) {
      var y = At(kt(A.content));
      y.forEach(function(V) {
        V.messages.forEach(function(oe) {
          c.forEach(function(fe) {
            V.messages.some(function(se) {
              return Hr(se.meta[1][0].data) != 11006 && mp(se.data, fe[1]);
            }) && o[fe[0]].deps.push(V.id);
          });
        });
      });
    }
  });
  for (var d = Ae.find(f, o[1].location), h = At(kt(d.content)), u, v = 0; v < h.length; ++v) {
    var x = h[v];
    x.id == 1 && (u = x);
  }
  var g = Yt($e(u.messages[0].data)[1][0].data);
  for (d = Ae.find(f, o[g].location), h = At(kt(d.content)), v = 0; v < h.length; ++v)
    x = h[v], x.id == g && (u = x);
  for (g = Yt($e(u.messages[0].data)[2][0].data), d = Ae.find(f, o[g].location), h = At(kt(d.content)), v = 0; v < h.length; ++v)
    x = h[v], x.id == g && (u = x);
  for (g = Yt($e(u.messages[0].data)[2][0].data), d = Ae.find(f, o[g].location), h = At(kt(d.content)), v = 0; v < h.length; ++v)
    x = h[v], x.id == g && (u = x);
  var C = $e(u.messages[0].data);
  {
    C[6][0].data = Ee(n.e.r + 1), C[7][0].data = Ee(n.e.c + 1);
    var O = Yt(C[46][0].data), F = Ae.find(f, o[O].location), L = At(kt(F.content));
    {
      for (var Y = 0; Y < L.length && L[Y].id != O; ++Y)
        ;
      if (L[Y].id != O)
        throw "Bad ColumnRowUIDMapArchive";
      var q = $e(L[Y].messages[0].data);
      q[1] = [], q[2] = [], q[3] = [];
      for (var R = 0; R <= n.e.c; ++R) {
        var U = [];
        U[1] = U[2] = [{ type: 0, data: Ee(R + 420690) }], q[1].push({ type: 2, data: Ke(U) }), q[2].push({ type: 0, data: Ee(R) }), q[3].push({ type: 0, data: Ee(R) });
      }
      q[4] = [], q[5] = [], q[6] = [];
      for (var k = 0; k <= n.e.r; ++k)
        U = [], U[1] = U[2] = [{ type: 0, data: Ee(k + 726270) }], q[4].push({ type: 2, data: Ke(U) }), q[5].push({ type: 0, data: Ee(k) }), q[6].push({ type: 0, data: Ee(k) });
      L[Y].messages[0].data = Ke(q);
    }
    F.content = Nr(Ir(L)), F.size = F.content.length, delete C[46];
    var W = $e(C[4][0].data);
    {
      W[7][0].data = Ee(n.e.r + 1);
      var H = $e(W[1][0].data), z = Yt(H[2][0].data);
      F = Ae.find(f, o[z].location), L = At(kt(F.content));
      {
        if (L[0].id != z)
          throw "Bad HeaderStorageBucket";
        var ee = $e(L[0].messages[0].data);
        for (k = 0; k < i.length; ++k) {
          var Ce = $e(ee[2][0].data);
          Ce[1][0].data = Ee(k), Ce[4][0].data = Ee(i[k].length), ee[2][k] = { type: ee[2][0].type, data: Ke(Ce) };
        }
        L[0].messages[0].data = Ke(ee);
      }
      F.content = Nr(Ir(L)), F.size = F.content.length;
      var he = Yt(W[2][0].data);
      F = Ae.find(f, o[he].location), L = At(kt(F.content));
      {
        if (L[0].id != he)
          throw "Bad HeaderStorageBucket";
        for (ee = $e(L[0].messages[0].data), R = 0; R <= n.e.c; ++R)
          Ce = $e(ee[2][0].data), Ce[1][0].data = Ee(R), Ce[4][0].data = Ee(n.e.r + 1), ee[2][R] = { type: ee[2][0].type, data: Ke(Ce) };
        L[0].messages[0].data = Ke(ee);
      }
      F.content = Nr(Ir(L)), F.size = F.content.length;
      var Ye = Yt(W[4][0].data);
      (function() {
        for (var M = Ae.find(f, o[Ye].location), A = At(kt(M.content)), y, V = 0; V < A.length; ++V) {
          var oe = A[V];
          oe.id == Ye && (y = oe);
        }
        var fe = $e(y.messages[0].data);
        {
          fe[3] = [];
          var se = [];
          s.forEach(function(pe, at) {
            se[1] = [{ type: 0, data: Ee(at) }], se[2] = [{ type: 0, data: Ee(1) }], se[3] = [{ type: 2, data: dp(pe) }], fe[3].push({ type: 2, data: Ke(se) });
          });
        }
        y.messages[0].data = Ke(fe);
        var te = Ir(A), ke = Nr(te);
        M.content = ke, M.size = M.content.length;
      })();
      var be = $e(W[3][0].data);
      {
        var Ct = be[1][0];
        delete be[2];
        var Ve = $e(Ct.data);
        {
          var Tt = Yt(Ve[2][0].data);
          (function() {
            for (var M = Ae.find(f, o[Tt].location), A = At(kt(M.content)), y, V = 0; V < A.length; ++V) {
              var oe = A[V];
              oe.id == Tt && (y = oe);
            }
            var fe = $e(y.messages[0].data);
            {
              delete fe[6], delete be[7];
              var se = new Uint8Array(fe[5][0].data);
              fe[5] = [];
              for (var te = 0, ke = 0; ke <= n.e.r; ++ke) {
                var pe = $e(se);
                te += _p(pe, i[ke], s), pe[1][0].data = Ee(ke), fe[5].push({ data: Ke(pe), type: 2 });
              }
              fe[1] = [{ type: 0, data: Ee(n.e.c + 1) }], fe[2] = [{ type: 0, data: Ee(n.e.r + 1) }], fe[3] = [{ type: 0, data: Ee(te) }], fe[4] = [{ type: 0, data: Ee(n.e.r + 1) }];
            }
            y.messages[0].data = Ke(fe);
            var at = Ir(A), we = Nr(at);
            M.content = we, M.size = M.content.length;
          })();
        }
        Ct.data = Ke(Ve);
      }
      W[3][0].data = Ke(be);
    }
    C[4][0].data = Ke(W);
  }
  u.messages[0].data = Ke(C);
  var dt = Ir(h), S = Nr(dt);
  return d.content = S, d.size = d.content.length, f;
}
function wp(e) {
  return function(t) {
    for (var n = 0; n != e.length; ++n) {
      var a = e[n];
      t[a[0]] === void 0 && (t[a[0]] = a[1]), a[2] === "n" && (t[a[0]] = Number(t[a[0]]));
    }
  };
}
function Bi(e) {
  wp([
    ["cellDates", !1],
    /* write date cells with type `d` */
    ["bookSST", !1],
    /* Generate Shared String Table */
    ["bookType", "xlsx"],
    /* Type of workbook (xlsx/m/b) */
    ["compression", !1],
    /* Use file compression */
    ["WTF", !1]
    /* WTF mode (throws errors) */
  ])(e);
}
function Tp(e, r) {
  return r.bookType == "ods" ? of(e, r) : r.bookType == "numbers" ? gp(e, r) : r.bookType == "xlsb" ? Ep(e, r) : Sp(e, r);
}
function Ep(e, r) {
  Br = 1024, e && !e.SSF && (e.SSF = xt(Be)), e && e.SSF && (da(), xa(e.SSF), r.revssf = ma(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.rels = {}, r.wbrels = {}, r.Strings = /*::((*/
  [], r.Strings.Count = 0, r.Strings.Unique = 0, _n ? r.revStrings = /* @__PURE__ */ new Map() : (r.revStrings = {}, r.revStrings.foo = [], delete r.revStrings.foo);
  var t = r.bookType == "xlsb" ? "bin" : "xml", n = Go.indexOf(r.bookType) > -1, a = vo();
  Bi(r = r || {});
  var i = Ti(), s = "", o = 0;
  if (r.cellXfs = [], lr(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", ue(i, s, To(e.Props, r)), a.coreprops.push(s), Se(r.rels, 2, s, ve.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var l = [], f = 0; f < e.SheetNames.length; ++f)
      (e.Workbook.Sheets[f] || {}).Hidden != 2 && l.push(e.SheetNames[f]);
    e.Props.SheetNames = l;
  }
  for (e.Props.Worksheets = e.Props.SheetNames.length, ue(i, s, So(e.Props)), a.extprops.push(s), Se(r.rels, 3, s, ve.EXT_PROPS), e.Custprops !== e.Props && et(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", ue(i, s, yo(e.Custprops)), a.custprops.push(s), Se(r.rels, 4, s, ve.CUST_PROPS)), o = 1; o <= e.SheetNames.length; ++o) {
    var c = { "!id": {} }, d = e.Sheets[e.SheetNames[o - 1]], h = (d || {})["!type"] || "sheet";
    switch (h) {
      case "chart":
      /* falls through */
      default:
        s = "xl/worksheets/sheet" + o + "." + t, ue(i, s, Fm(o - 1, s, r, e, c)), a.sheets.push(s), Se(r.wbrels, -1, "worksheets/sheet" + o + "." + t, ve.WS[0]);
    }
    if (d) {
      var u = d["!comments"], v = !1, x = "";
      u && u.length > 0 && (x = "xl/comments" + o + "." + t, ue(i, x, km(u, x)), a.comments.push(x), Se(c, -1, "../comments" + o + "." + t, ve.CMNT), v = !0), d["!legacy"] && v && ue(i, "xl/drawings/vmlDrawing" + o + ".vml", Wo(o, d["!comments"])), delete d["!comments"], delete d["!legacy"];
    }
    c["!id"].rId1 && ue(i, go(s), Ur(c));
  }
  return r.Strings != null && r.Strings.length > 0 && (s = "xl/sharedStrings." + t, ue(i, s, Am(r.Strings, s, r)), a.strs.push(s), Se(r.wbrels, -1, "sharedStrings." + t, ve.SST)), s = "xl/workbook." + t, ue(i, s, ym(e, s)), a.workbooks.push(s), Se(r.rels, 1, s, ve.WB), s = "xl/theme/theme1.xml", ue(i, s, bo(e.Themes, r)), a.themes.push(s), Se(r.wbrels, -1, "theme/theme1.xml", ve.THEME), s = "xl/styles." + t, ue(i, s, Cm(e, s, r)), a.styles.push(s), Se(r.wbrels, -1, "styles." + t, ve.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", ue(i, s, e.vbaraw), a.vba.push(s), Se(r.wbrels, -1, "vbaProject.bin", ve.VBA)), s = "xl/metadata." + t, ue(i, s, Om(s)), a.metadata.push(s), Se(r.wbrels, -1, "metadata." + t, ve.XLMETA), ue(i, "[Content_Types].xml", _o(a, r)), ue(i, "_rels/.rels", Ur(r.rels)), ue(i, "xl/_rels/workbook." + t + ".rels", Ur(r.wbrels)), delete r.revssf, delete r.ssf, i;
}
function Sp(e, r) {
  Br = 1024, e && !e.SSF && (e.SSF = xt(Be)), e && e.SSF && (da(), xa(e.SSF), r.revssf = ma(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.rels = {}, r.wbrels = {}, r.Strings = /*::((*/
  [], r.Strings.Count = 0, r.Strings.Unique = 0, _n ? r.revStrings = /* @__PURE__ */ new Map() : (r.revStrings = {}, r.revStrings.foo = [], delete r.revStrings.foo);
  var t = "xml", n = Go.indexOf(r.bookType) > -1, a = vo();
  Bi(r = r || {});
  var i = Ti(), s = "", o = 0;
  if (r.cellXfs = [], lr(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", ue(i, s, To(e.Props, r)), a.coreprops.push(s), Se(r.rels, 2, s, ve.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var l = [], f = 0; f < e.SheetNames.length; ++f)
      (e.Workbook.Sheets[f] || {}).Hidden != 2 && l.push(e.SheetNames[f]);
    e.Props.SheetNames = l;
  }
  e.Props.Worksheets = e.Props.SheetNames.length, ue(i, s, So(e.Props)), a.extprops.push(s), Se(r.rels, 3, s, ve.EXT_PROPS), e.Custprops !== e.Props && et(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", ue(i, s, yo(e.Custprops)), a.custprops.push(s), Se(r.rels, 4, s, ve.CUST_PROPS));
  var c = ["SheetJ5"];
  for (r.tcid = 0, o = 1; o <= e.SheetNames.length; ++o) {
    var d = { "!id": {} }, h = e.Sheets[e.SheetNames[o - 1]], u = (h || {})["!type"] || "sheet";
    switch (u) {
      case "chart":
      /* falls through */
      default:
        s = "xl/worksheets/sheet" + o + "." + t, ue(i, s, Qo(o - 1, r, e, d)), a.sheets.push(s), Se(r.wbrels, -1, "worksheets/sheet" + o + "." + t, ve.WS[0]);
    }
    if (h) {
      var v = h["!comments"], x = !1, g = "";
      if (v && v.length > 0) {
        var C = !1;
        v.forEach(function(O) {
          O[1].forEach(function(F) {
            F.T == !0 && (C = !0);
          });
        }), C && (g = "xl/threadedComments/threadedComment" + o + "." + t, ue(i, g, e1(v, c, r)), a.threadedcomments.push(g), Se(d, -1, "../threadedComments/threadedComment" + o + "." + t, ve.TCMNT)), g = "xl/comments" + o + "." + t, ue(i, g, Ho(v)), a.comments.push(g), Se(d, -1, "../comments" + o + "." + t, ve.CMNT), x = !0;
      }
      h["!legacy"] && x && ue(i, "xl/drawings/vmlDrawing" + o + ".vml", Wo(o, h["!comments"])), delete h["!comments"], delete h["!legacy"];
    }
    d["!id"].rId1 && ue(i, go(s), Ur(d));
  }
  return r.Strings != null && r.Strings.length > 0 && (s = "xl/sharedStrings." + t, ue(i, s, No(r.Strings, r)), a.strs.push(s), Se(r.wbrels, -1, "sharedStrings." + t, ve.SST)), s = "xl/workbook." + t, ue(i, s, ef(e)), a.workbooks.push(s), Se(r.rels, 1, s, ve.WB), s = "xl/theme/theme1.xml", ue(i, s, bo(e.Themes, r)), a.themes.push(s), Se(r.wbrels, -1, "theme/theme1.xml", ve.THEME), s = "xl/styles." + t, ue(i, s, Lo(e, r)), a.styles.push(s), Se(r.wbrels, -1, "styles." + t, ve.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", ue(i, s, e.vbaraw), a.vba.push(s), Se(r.wbrels, -1, "vbaProject.bin", ve.VBA)), s = "xl/metadata." + t, ue(i, s, Uo()), a.metadata.push(s), Se(r.wbrels, -1, "metadata." + t, ve.XLMETA), c.length > 1 && (s = "xl/persons/person.xml", ue(i, s, t1(c)), a.people.push(s), Se(r.wbrels, -1, "persons/person.xml", ve.PEOPLE)), ue(i, "[Content_Types].xml", _o(a, r)), ue(i, "_rels/.rels", Ur(r.rels)), ue(i, "xl/_rels/workbook." + t + ".rels", Ur(r.wbrels)), delete r.revssf, delete r.ssf, i;
}
function yp(e, r) {
  var t = "";
  switch ((r || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      t = zt(e.slice(0, 12));
      break;
    case "binary":
      t = e;
      break;
    case "array":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    default:
      throw new Error("Unrecognized type " + (r && r.type || "undefined"));
  }
  return [t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2), t.charCodeAt(3), t.charCodeAt(4), t.charCodeAt(5), t.charCodeAt(6), t.charCodeAt(7)];
}
function ff(e, r) {
  switch (r.type) {
    case "base64":
    case "binary":
      break;
    case "buffer":
    case "array":
      r.type = "";
      break;
    case "file":
      return Rn(r.file, Ae.write(e, { type: ge ? "buffer" : "" }));
    case "string":
      throw new Error("'string' output type invalid for '" + r.bookType + "' files");
    default:
      throw new Error("Unrecognized type " + r.type);
  }
  return Ae.write(e, r);
}
function Fp(e, r) {
  var t = xt(r || {}), n = Tp(e, t);
  return Cp(n, t);
}
function Cp(e, r) {
  var t = {}, n = ge ? "nodebuffer" : typeof Uint8Array < "u" ? "array" : "string";
  if (r.compression && (t.compression = "DEFLATE"), r.password) t.type = n;
  else switch (r.type) {
    case "base64":
      t.type = "base64";
      break;
    case "binary":
      t.type = "string";
      break;
    case "string":
      throw new Error("'string' output type invalid for '" + r.bookType + "' files");
    case "buffer":
    case "file":
      t.type = n;
      break;
    default:
      throw new Error("Unrecognized type " + r.type);
  }
  var a = e.FullPaths ? Ae.write(e, { fileType: "zip", type: (
    /*::(*/
    { nodebuffer: "buffer", string: "binary" }[t.type] || t.type
  ), compression: !!r.compression }) : e.generate(t);
  if (typeof Deno < "u" && typeof a == "string") {
    if (r.type == "binary" || r.type == "base64") return a;
    a = new Uint8Array(ua(a));
  }
  return r.password && typeof encrypt_agile < "u" ? ff(encrypt_agile(a, r.password), r) : r.type === "file" ? Rn(r.file, a) : r.type == "string" ? dn(
    /*::(*/
    a
    /*:: :any)*/
  ) : a;
}
function Ap(e, r) {
  var t = r || {}, n = $m(e, t);
  return ff(n, t);
}
function Lt(e, r, t) {
  t || (t = "");
  var n = t + e;
  switch (r.type) {
    case "base64":
      return Tn(Sn(n));
    case "binary":
      return Sn(n);
    case "string":
      return e;
    case "file":
      return Rn(r.file, n, "utf8");
    case "buffer":
      return ge ? jt(n, "utf8") : typeof TextEncoder < "u" ? new TextEncoder().encode(n) : Lt(n, { type: "binary" }).split("").map(function(a) {
        return a.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + r.type);
}
function kp(e, r) {
  switch (r.type) {
    case "base64":
      return Tn(e);
    case "binary":
      return e;
    case "string":
      return e;
    /* override in sheet_to_txt */
    case "file":
      return Rn(r.file, e, "binary");
    case "buffer":
      return ge ? jt(e, "binary") : e.split("").map(function(t) {
        return t.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + r.type);
}
function Xn(e, r) {
  switch (r.type) {
    case "string":
    case "base64":
    case "binary":
      for (var t = "", n = 0; n < e.length; ++n) t += String.fromCharCode(e[n]);
      return r.type == "base64" ? Tn(t) : r.type == "string" ? dn(t) : t;
    case "file":
      return Rn(r.file, e);
    case "buffer":
      return e;
    default:
      throw new Error("Unrecognized type " + r.type);
  }
}
function lf(e, r) {
  rc(), xm(e);
  var t = xt(r || {});
  if (t.cellStyles && (t.cellNF = !0, t.sheetStubs = !0), t.type == "array") {
    t.type = "binary";
    var n = lf(e, t);
    return t.type = "array", ua(n);
  }
  var a = 0;
  if (t.sheet && (typeof t.sheet == "number" ? a = t.sheet : a = e.SheetNames.indexOf(t.sheet), !e.SheetNames[a]))
    throw new Error("Sheet not found: " + t.sheet + " : " + typeof t.sheet);
  switch (t.bookType || "xlsb") {
    case "xml":
    case "xlml":
      return Lt(Hm(e, t), t);
    case "slk":
    case "sylk":
      return Lt(cu.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "htm":
    case "html":
      return Lt(nf(e.Sheets[e.SheetNames[a]], t), t);
    case "txt":
      return kp(cf(e.Sheets[e.SheetNames[a]], t), t);
    case "csv":
      return Lt(bi(e.Sheets[e.SheetNames[a]], t), t, "\uFEFF");
    case "dif":
      return Lt(hu.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "dbf":
      return Xn(lu.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "prn":
      return Lt(uu.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "rtf":
      return Lt(gu.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "eth":
      return Lt(Io.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "fods":
      return Lt(of(e, t), t);
    case "wk1":
      return Xn(z0.sheet_to_wk1(e.Sheets[e.SheetNames[a]], t), t);
    case "wk3":
      return Xn(z0.book_to_wk3(e, t), t);
    case "biff2":
      t.biff || (t.biff = 2);
    /* falls through */
    case "biff3":
      t.biff || (t.biff = 3);
    /* falls through */
    case "biff4":
      return t.biff || (t.biff = 4), Xn(rf(e, t), t);
    case "biff5":
      t.biff || (t.biff = 5);
    /* falls through */
    case "biff8":
    case "xla":
    case "xls":
      return t.biff || (t.biff = 8), Ap(e, t);
    case "xlsx":
    case "xlsm":
    case "xlam":
    case "xlsb":
    case "numbers":
    case "ods":
      return Fp(e, t);
    default:
      throw new Error("Unrecognized bookType |" + t.bookType + "|");
  }
}
function Op(e) {
  if (!e.bookType) {
    var r = {
      xls: "biff8",
      htm: "html",
      slk: "sylk",
      socialcalc: "eth",
      Sh33tJS: "WTF"
    }, t = e.file.slice(e.file.lastIndexOf(".")).toLowerCase();
    t.match(/^\.[a-z]+$/) && (e.bookType = t.slice(1)), e.bookType = r[e.bookType] || e.bookType;
  }
}
function Rp(e, r, t) {
  var n = {};
  return n.type = "file", n.file = r, Op(n), lf(e, n);
}
function Ip(e, r, t, n, a, i, s, o) {
  var l = qe(t), f = o.defval, c = o.raw || !Object.prototype.hasOwnProperty.call(o, "raw"), d = !0, h = a === 1 ? [] : {};
  if (a !== 1)
    if (Object.defineProperty) try {
      Object.defineProperty(h, "__rowNum__", { value: t, enumerable: !1 });
    } catch {
      h.__rowNum__ = t;
    }
    else h.__rowNum__ = t;
  if (!s || e[t]) for (var u = r.s.c; u <= r.e.c; ++u) {
    var v = s ? e[t][u] : e[n[u] + l];
    if (v === void 0 || v.t === void 0) {
      if (f === void 0) continue;
      i[u] != null && (h[i[u]] = f);
      continue;
    }
    var x = v.v;
    switch (v.t) {
      case "z":
        if (x == null) break;
        continue;
      case "e":
        x = x == 0 ? null : void 0;
        break;
      case "s":
      case "d":
      case "b":
      case "n":
        break;
      default:
        throw new Error("unrecognized type " + v.t);
    }
    if (i[u] != null) {
      if (x == null)
        if (v.t == "e" && x === null) h[i[u]] = null;
        else if (f !== void 0) h[i[u]] = f;
        else if (c && x === null) h[i[u]] = null;
        else continue;
      else
        h[i[u]] = c && (v.t !== "n" || v.t === "n" && o.rawNumbers !== !1) ? x : Xt(v, x, o);
      x != null && (d = !1);
    }
  }
  return { row: h, isempty: d };
}
function ha(e, r) {
  if (e == null || e["!ref"] == null) return [];
  var t = { t: "n", v: 0 }, n = 0, a = 1, i = [], s = 0, o = "", l = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, f = r || {}, c = f.range != null ? f.range : e["!ref"];
  switch (f.header === 1 ? n = 1 : f.header === "A" ? n = 2 : Array.isArray(f.header) ? n = 3 : f.header == null && (n = 0), typeof c) {
    case "string":
      l = Ne(c);
      break;
    case "number":
      l = Ne(e["!ref"]), l.s.r = c;
      break;
    default:
      l = c;
  }
  n > 0 && (a = 0);
  var d = qe(l.s.r), h = [], u = [], v = 0, x = 0, g = Array.isArray(e), C = l.s.r, O = 0, F = {};
  g && !e[C] && (e[C] = []);
  var L = f.skipHidden && e["!cols"] || [], Y = f.skipHidden && e["!rows"] || [];
  for (O = l.s.c; O <= l.e.c; ++O)
    if (!(L[O] || {}).hidden)
      switch (h[O] = rt(O), t = g ? e[C][O] : e[h[O] + d], n) {
        case 1:
          i[O] = O - l.s.c;
          break;
        case 2:
          i[O] = h[O];
          break;
        case 3:
          i[O] = f.header[O - l.s.c];
          break;
        default:
          if (t == null && (t = { w: "__EMPTY", t: "s" }), o = s = Xt(t, null, f), x = F[s] || 0, !x) F[s] = 1;
          else {
            do
              o = s + "_" + x++;
            while (F[o]);
            F[s] = x, F[o] = 1;
          }
          i[O] = o;
      }
  for (C = l.s.r + a; C <= l.e.r; ++C)
    if (!(Y[C] || {}).hidden) {
      var q = Ip(e, l, C, h, n, i, g, f);
      (q.isempty === !1 || (n === 1 ? f.blankrows !== !1 : f.blankrows)) && (u[v++] = q.row);
    }
  return u.length = v, u;
}
var q0 = /"/g;
function Np(e, r, t, n, a, i, s, o) {
  for (var l = !0, f = [], c = "", d = qe(t), h = r.s.c; h <= r.e.c; ++h)
    if (n[h]) {
      var u = o.dense ? (e[t] || [])[h] : e[n[h] + d];
      if (u == null) c = "";
      else if (u.v != null) {
        l = !1, c = "" + (o.rawNumbers && u.t == "n" ? u.v : Xt(u, null, o));
        for (var v = 0, x = 0; v !== c.length; ++v) if ((x = c.charCodeAt(v)) === a || x === i || x === 34 || o.forceQuotes) {
          c = '"' + c.replace(q0, '""') + '"';
          break;
        }
        c == "ID" && (c = '"ID"');
      } else u.f != null && !u.F ? (l = !1, c = "=" + u.f, c.indexOf(",") >= 0 && (c = '"' + c.replace(q0, '""') + '"')) : c = "";
      f.push(c);
    }
  return o.blankrows === !1 && l ? null : f.join(s);
}
function bi(e, r) {
  var t = [], n = r ?? {};
  if (e == null || e["!ref"] == null) return "";
  var a = Ne(e["!ref"]), i = n.FS !== void 0 ? n.FS : ",", s = i.charCodeAt(0), o = n.RS !== void 0 ? n.RS : `
`, l = o.charCodeAt(0), f = new RegExp((i == "|" ? "\\|" : i) + "+$"), c = "", d = [];
  n.dense = Array.isArray(e);
  for (var h = n.skipHidden && e["!cols"] || [], u = n.skipHidden && e["!rows"] || [], v = a.s.c; v <= a.e.c; ++v) (h[v] || {}).hidden || (d[v] = rt(v));
  for (var x = 0, g = a.s.r; g <= a.e.r; ++g)
    (u[g] || {}).hidden || (c = Np(e, a, g, d, s, l, i, n), c != null && (n.strip && (c = c.replace(f, "")), (c || n.blankrows !== !1) && t.push((x++ ? o : "") + c)));
  return delete n.dense, t.join("");
}
function cf(e, r) {
  r || (r = {}), r.FS = "	", r.RS = `
`;
  var t = bi(e, r);
  return t;
}
function Dp(e) {
  var r = "", t, n = "";
  if (e == null || e["!ref"] == null) return [];
  var a = Ne(e["!ref"]), i = "", s = [], o, l = [], f = Array.isArray(e);
  for (o = a.s.c; o <= a.e.c; ++o) s[o] = rt(o);
  for (var c = a.s.r; c <= a.e.r; ++c)
    for (i = qe(c), o = a.s.c; o <= a.e.c; ++o)
      if (r = s[o] + i, t = f ? (e[c] || [])[o] : e[r], n = "", t !== void 0) {
        if (t.F != null) {
          if (r = t.F, !t.f) continue;
          n = t.f, r.indexOf(":") == -1 && (r = r + ":" + r);
        }
        if (t.f != null) n = t.f;
        else {
          if (t.t == "z") continue;
          if (t.t == "n" && t.v != null) n = "" + t.v;
          else if (t.t == "b") n = t.v ? "TRUE" : "FALSE";
          else if (t.w !== void 0) n = "'" + t.w;
          else {
            if (t.v === void 0) continue;
            t.t == "s" ? n = "'" + t.v : n = "" + t.v;
          }
        }
        l[l.length] = r + "=" + n;
      }
  return l;
}
function hf(e, r, t) {
  var n = t || {}, a = +!n.skipHeader, i = e || {}, s = 0, o = 0;
  if (i && n.origin != null)
    if (typeof n.origin == "number") s = n.origin;
    else {
      var l = typeof n.origin == "string" ? Xe(n.origin) : n.origin;
      s = l.r, o = l.c;
    }
  var f, c = { s: { c: 0, r: 0 }, e: { c: o, r: s + r.length - 1 + a } };
  if (i["!ref"]) {
    var d = Ne(i["!ref"]);
    c.e.c = Math.max(c.e.c, d.e.c), c.e.r = Math.max(c.e.r, d.e.r), s == -1 && (s = d.e.r + 1, c.e.r = s + r.length - 1 + a);
  } else
    s == -1 && (s = 0, c.e.r = r.length - 1 + a);
  var h = n.header || [], u = 0;
  r.forEach(function(x, g) {
    et(x).forEach(function(C) {
      (u = h.indexOf(C)) == -1 && (h[u = h.length] = C);
      var O = x[C], F = "z", L = "", Y = Fe({ c: o + u, r: s + g + a });
      f = Cn(i, Y), O && typeof O == "object" && !(O instanceof Date) ? i[Y] = O : (typeof O == "number" ? F = "n" : typeof O == "boolean" ? F = "b" : typeof O == "string" ? F = "s" : O instanceof Date ? (F = "d", n.cellDates || (F = "n", O = ut(O)), L = n.dateNF || Be[14]) : O === null && n.nullError && (F = "e", O = 0), f ? (f.t = F, f.v = O, delete f.w, delete f.R, L && (f.z = L)) : i[Y] = f = { t: F, v: O }, L && (f.z = L));
    });
  }), c.e.c = Math.max(c.e.c, o + h.length - 1);
  var v = qe(s);
  if (a) for (u = 0; u < h.length; ++u) i[rt(u + o) + v] = { t: "s", v: h[u] };
  return i["!ref"] = He(c), i;
}
function Pp(e, r) {
  return hf(null, e, r);
}
function Cn(e, r, t) {
  if (typeof r == "string") {
    if (Array.isArray(e)) {
      var n = Xe(r);
      return e[n.r] || (e[n.r] = []), e[n.r][n.c] || (e[n.r][n.c] = { t: "z" });
    }
    return e[r] || (e[r] = { t: "z" });
  }
  return typeof r != "number" ? Cn(e, Fe(r)) : Cn(e, Fe({ r, c: t || 0 }));
}
function Mp(e, r) {
  if (typeof r == "number") {
    if (r >= 0 && e.SheetNames.length > r) return r;
    throw new Error("Cannot find sheet # " + r);
  } else if (typeof r == "string") {
    var t = e.SheetNames.indexOf(r);
    if (t > -1) return t;
    throw new Error("Cannot find sheet name |" + r + "|");
  } else throw new Error("Cannot find sheet |" + r + "|");
}
function Lp() {
  return { SheetNames: [], Sheets: {} };
}
function Bp(e, r, t, n) {
  var a = 1;
  if (!t) for (; a <= 65535 && e.SheetNames.indexOf(t = "Sheet" + a) != -1; ++a, t = void 0) ;
  if (!t || e.SheetNames.length >= 65535) throw new Error("Too many worksheets");
  if (n && e.SheetNames.indexOf(t) >= 0) {
    var i = t.match(/(^.*?)(\d+)$/);
    a = i && +i[2] || 0;
    var s = i && i[1] || t;
    for (++a; a <= 65535 && e.SheetNames.indexOf(t = s + a) != -1; ++a) ;
  }
  if (qo(t), e.SheetNames.indexOf(t) >= 0) throw new Error("Worksheet with name |" + t + "| already exists!");
  return e.SheetNames.push(t), e.Sheets[t] = r, t;
}
function bp(e, r, t) {
  e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
  var n = Mp(e, r);
  switch (e.Workbook.Sheets[n] || (e.Workbook.Sheets[n] = {}), t) {
    case 0:
    case 1:
    case 2:
      break;
    default:
      throw new Error("Bad sheet visibility setting " + t);
  }
  e.Workbook.Sheets[n].Hidden = t;
}
function Up(e, r) {
  return e.z = r, e;
}
function uf(e, r, t) {
  return r ? (e.l = { Target: r }, t && (e.l.Tooltip = t)) : delete e.l, e;
}
function Wp(e, r, t) {
  return uf(e, "#" + r, t);
}
function Hp(e, r, t) {
  e.c || (e.c = []), e.c.push({ t: r, a: t || "SheetJS" });
}
function Gp(e, r, t, n) {
  for (var a = typeof r != "string" ? r : Ne(r), i = typeof r == "string" ? r : He(r), s = a.s.r; s <= a.e.r; ++s) for (var o = a.s.c; o <= a.e.c; ++o) {
    var l = Cn(e, s, o);
    l.t = "n", l.F = i, delete l.v, s == a.s.r && o == a.s.c && (l.f = t, n && (l.D = !0));
  }
  return e;
}
var Ua = {
  encode_col: rt,
  encode_row: qe,
  encode_cell: Fe,
  encode_range: He,
  decode_col: Ai,
  decode_row: Ci,
  split_cell: rh,
  decode_cell: Xe,
  decode_range: gt,
  format_cell: Xt,
  sheet_add_aoa: co,
  sheet_add_json: hf,
  sheet_add_dom: af,
  aoa_to_sheet: Qr,
  json_to_sheet: Pp,
  table_to_sheet: sf,
  table_to_book: hp,
  sheet_to_csv: bi,
  sheet_to_txt: cf,
  sheet_to_json: ha,
  sheet_to_html: nf,
  sheet_to_formulae: Dp,
  sheet_to_row_object_array: ha,
  sheet_get_cell: Cn,
  book_new: Lp,
  book_append_sheet: Bp,
  book_set_sheet_visibility: bp,
  cell_set_number_format: Up,
  cell_set_hyperlink: uf,
  cell_set_internal_link: Wp,
  cell_add_comment: Hp,
  sheet_set_array_formula: Gp,
  consts: {
    SHEET_VISIBLE: 0,
    SHEET_HIDDEN: 1,
    SHEET_VERY_HIDDEN: 2
  }
};
function $p(e, r) {
  const t = e.map((o) => ({
    "Part Name": o.name,
    IPN: o.IPN || "",
    Category: o.category_path || o.category_name || "Uncategorized",
    Description: o.description || "",
    Status: Cs(o).label,
    "Current Stock": o.total_stock,
    "Minimum Stock": o.minimum_stock || ""
  })), n = Ua.book_new(), a = Ua.json_to_sheet(t);
  a["!cols"] = [
    { wch: 30 },
    // Part Name
    { wch: 15 },
    // IPN
    { wch: 30 },
    // Category
    { wch: 40 },
    // Description
    { wch: 12 },
    // Status
    { wch: 15 },
    // Current Stock
    { wch: 15 }
    // Minimum Stock
  ], Ua.book_append_sheet(n, a, "Critical Components");
  const s = `critical-components-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.xlsx`;
  Rp(n, s);
}
const Oe = window.React, Wa = window.MantineCore.Box, it = window.MantineCore.Table, Kt = window.MantineCore.Text;
function Vp({ entries: e, loading: r }) {
  return r ? /* @__PURE__ */ Oe.createElement(Wa, { px: "lg", py: "sm", bg: "gray.1" }, /* @__PURE__ */ Oe.createElement(Kt, { size: "sm", c: "dimmed", fs: "italic" }, "Loading tracking history...")) : !e || e.length === 0 ? /* @__PURE__ */ Oe.createElement(Wa, { px: "lg", py: "sm", bg: "gray.1" }, /* @__PURE__ */ Oe.createElement(Kt, { size: "sm", c: "dimmed", fs: "italic" }, "No tracking history available")) : /* @__PURE__ */ Oe.createElement(
    Wa,
    {
      px: "lg",
      py: "sm",
      bg: "gray.1",
      style: { borderLeft: "3px solid var(--mantine-color-blue-4)" }
    },
    /* @__PURE__ */ Oe.createElement(Kt, { size: "xs", fw: 600, c: "dimmed", mb: "xs" }, "Stock Tracking History"),
    /* @__PURE__ */ Oe.createElement(it, { striped: !0, highlightOnHover: !0, withTableBorder: !1 }, /* @__PURE__ */ Oe.createElement(it.Thead, null, /* @__PURE__ */ Oe.createElement(it.Tr, null, /* @__PURE__ */ Oe.createElement(it.Th, null, "Date"), /* @__PURE__ */ Oe.createElement(it.Th, null, "Action"), /* @__PURE__ */ Oe.createElement(it.Th, null, "Details"), /* @__PURE__ */ Oe.createElement(it.Th, null, "User"), /* @__PURE__ */ Oe.createElement(it.Th, null, "Notes"))), /* @__PURE__ */ Oe.createElement(it.Tbody, null, e.map((t) => /* @__PURE__ */ Oe.createElement(it.Tr, { key: t.id }, /* @__PURE__ */ Oe.createElement(it.Td, null, /* @__PURE__ */ Oe.createElement(Kt, { size: "xs", c: "dimmed" }, As(t.date))), /* @__PURE__ */ Oe.createElement(it.Td, null, /* @__PURE__ */ Oe.createElement(Kt, { size: "xs", fw: 500 }, t.label || "-")), /* @__PURE__ */ Oe.createElement(it.Td, null, /* @__PURE__ */ Oe.createElement(Kt, { size: "xs", c: "dimmed" }, t.details || "-")), /* @__PURE__ */ Oe.createElement(it.Td, null, /* @__PURE__ */ Oe.createElement(Kt, { size: "xs", c: "dimmed" }, t.user || "-")), /* @__PURE__ */ Oe.createElement(it.Td, null, /* @__PURE__ */ Oe.createElement(Kt, { size: "xs", c: "dimmed", lineClamp: 1 }, t.notes || "-"))))))
  );
}
const le = window.React, es = window.React.useMemo, Ha = window.React.useState, zp = window.React.useCallback, Xp = window.MantineCore.ActionIcon, Ga = window.MantineCore.Anchor, jp = window.MantineCore.Badge, ts = window.MantineCore.Box, Ie = window.MantineCore.Table, Dr = window.MantineCore.Text;
function Yp({ stockItems: e, context: r }) {
  const [t, n] = Ha(/* @__PURE__ */ new Set()), [a, i] = Ha({}), [s, o] = Ha(/* @__PURE__ */ new Set()), { hasSerial: l, hasNotes: f } = es(() => {
    let h = !1, u = !1;
    for (const v of e)
      if (v.serial && v.serial.trim() !== "" && (h = !0), v.notes && v.notes.trim() !== "" && (u = !0), h && u) break;
    return { hasSerial: h, hasNotes: u };
  }, [e]), c = es(() => {
    let h = 7;
    return f && (h += 1), h;
  }, [f]), d = zp(async (h) => {
    if (t.has(h))
      n((u) => {
        const v = new Set(u);
        return v.delete(h), v;
      });
    else if (n((u) => new Set(u).add(h)), !a[h]) {
      o((u) => new Set(u).add(h));
      try {
        const u = await r.api.get(`/plugin/criticalcomponents/stock-tracking/${h}/`);
        i((v) => ({ ...v, [h]: u.data.entries || [] }));
      } catch (u) {
        console.error("Failed to fetch stock tracking:", u), i((v) => ({ ...v, [h]: [] }));
      } finally {
        o((u) => {
          const v = new Set(u);
          return v.delete(h), v;
        });
      }
    }
  }, [t, a, r.api]);
  return !e || e.length === 0 ? /* @__PURE__ */ le.createElement(ts, { px: "md", py: "sm", bg: "gray.0" }, /* @__PURE__ */ le.createElement(Dr, { size: "sm", c: "dimmed", fs: "italic" }, "No stock items available")) : /* @__PURE__ */ le.createElement(
    ts,
    {
      px: "md",
      py: "sm",
      bg: "gray.0",
      style: { borderTop: "1px solid var(--mantine-color-gray-3)" }
    },
    /* @__PURE__ */ le.createElement(Ie, { striped: !0, highlightOnHover: !0, withTableBorder: !1 }, /* @__PURE__ */ le.createElement(Ie.Thead, null, /* @__PURE__ */ le.createElement(Ie.Tr, null, /* @__PURE__ */ le.createElement(Ie.Th, { style: { width: 40 } }), l && /* @__PURE__ */ le.createElement(Ie.Th, null, "Serial"), !l && /* @__PURE__ */ le.createElement(Ie.Th, null, "Stock Item"), /* @__PURE__ */ le.createElement(Ie.Th, null, "Location"), /* @__PURE__ */ le.createElement(Ie.Th, { style: { textAlign: "right" } }, "Quantity"), /* @__PURE__ */ le.createElement(Ie.Th, null, "Last Stock Count Date"), /* @__PURE__ */ le.createElement(Ie.Th, null, "Days Since Last Stock Count"), /* @__PURE__ */ le.createElement(Ie.Th, null, "Status"), f && /* @__PURE__ */ le.createElement(Ie.Th, null, "Notes"))), /* @__PURE__ */ le.createElement(Ie.Tbody, null, e.map((h) => /* @__PURE__ */ le.createElement(le.Fragment, { key: h.id }, /* @__PURE__ */ le.createElement(Ie.Tr, null, /* @__PURE__ */ le.createElement(Ie.Td, { style: { width: 40 } }, /* @__PURE__ */ le.createElement(
      Xp,
      {
        variant: "subtle",
        size: "sm",
        onClick: () => d(h.id),
        "aria-label": t.has(h.id) ? "Collapse" : "Expand"
      },
      t.has(h.id) ? /* @__PURE__ */ le.createElement(mi, { size: 16 }) : /* @__PURE__ */ le.createElement(pi, { size: 16 })
    )), l && /* @__PURE__ */ le.createElement(Ie.Td, null, /* @__PURE__ */ le.createElement(
      Ga,
      {
        size: "sm",
        fw: 500,
        onClick: () => {
          r.navigate(h.url);
        },
        style: { cursor: "pointer" }
      },
      h.serial || "-"
    )), !l && /* @__PURE__ */ le.createElement(Ie.Td, null, /* @__PURE__ */ le.createElement(
      Ga,
      {
        size: "sm",
        fw: 500,
        onClick: () => {
          r.navigate(h.url);
        },
        style: { cursor: "pointer" }
      },
      "#",
      h.id
    )), /* @__PURE__ */ le.createElement(Ie.Td, null, /* @__PURE__ */ le.createElement(
      Ga,
      {
        size: "sm",
        onClick: () => {
          h.location_id && r.navigate(`/stock/location/${h.location_id}/`);
        },
        style: { cursor: h.location_id ? "pointer" : "default" }
      },
      h.location_path || h.location
    )), /* @__PURE__ */ le.createElement(Ie.Td, { style: { textAlign: "right" } }, /* @__PURE__ */ le.createElement(Dr, { size: "sm", fw: 500 }, h.quantity)), /* @__PURE__ */ le.createElement(Ie.Td, null, /* @__PURE__ */ le.createElement(Dr, { size: "sm", c: "dimmed" }, As(h.stocktake_date))), /* @__PURE__ */ le.createElement(Ie.Td, null, h.days_since_check !== null ? /* @__PURE__ */ le.createElement(
      jp,
      {
        color: h.check_days_configured ? h.needs_check ? "orange" : "green" : "gray",
        variant: "light",
        size: "sm",
        leftSection: h.needs_check ? /* @__PURE__ */ le.createElement(oi, { size: 10 }) : null
      },
      h.days_since_check,
      " days",
      h.check_days_configured ? h.needs_check ? " - Needs Check" : "" : " - Not Configured"
    ) : /* @__PURE__ */ le.createElement(Dr, { size: "sm", c: "dimmed" }, "-")), /* @__PURE__ */ le.createElement(Ie.Td, null, /* @__PURE__ */ le.createElement(Dr, { size: "sm", c: "dimmed" }, h.status)), f && /* @__PURE__ */ le.createElement(Ie.Td, null, /* @__PURE__ */ le.createElement(Dr, { size: "sm", c: "dimmed", lineClamp: 2 }, h.notes || "-"))), t.has(h.id) && /* @__PURE__ */ le.createElement(Ie.Tr, null, /* @__PURE__ */ le.createElement(Ie.Td, { colSpan: c, style: { padding: 0 } }, /* @__PURE__ */ le.createElement(
      Vp,
      {
        entries: a[h.id] || [],
        loading: s.has(h.id)
      }
    )))))))
  );
}
const _e = window.React, rs = window.React.useCallback, Kp = window.React.useState, Jp = window.MantineCore.ActionIcon, Qp = window.MantineCore.Anchor, Zp = window.MantineCore.Avatar, $a = window.MantineCore.Badge, on = window.MantineCore.Box, qp = window.MantineCore.Collapse, Va = window.MantineCore.Group, ev = window.MantineCore.Progress, Pr = window.MantineCore.Text, za = window.MantineCore.Tooltip;
function xf({
  part: e,
  context: r,
  showLocationQty: t = !1,
  showCategory: n = !1,
  isExpandable: a = !0,
  indent: i = 0
}) {
  const [s, o] = Kp(!1), l = Cs(e), f = Jl(e, t), c = e.stock_items && e.stock_items.length > 0, d = a && c, h = rs(() => {
    r.navigate(`/part/${e.id}/`);
  }, [r, e.id]), u = rs(() => {
    d && o((C) => !C);
  }, [d]), v = n ? "30px minmax(150px, 1.5fr) 100px minmax(120px, 1fr) minmax(100px, 1fr) 100px 110px minmax(140px, 1fr)" : "30px minmax(180px, 2fr) 100px minmax(100px, 1fr) 100px 110px minmax(140px, 1fr)", g = !e.stock_items || e.stock_items.length === 0 ? { label: "No Stock", color: "gray" } : e.stock_items.some((O) => !O.check_days_configured) && !e.has_needs_check && e.stock_items.every((F) => !F.check_days_configured) ? { label: "Not Configured", color: "gray" } : e.has_needs_check ? { label: "Needs Check", color: "orange" } : { label: "Inv Up to Date", color: "green" };
  return /* @__PURE__ */ _e.createElement(_e.Fragment, null, /* @__PURE__ */ _e.createElement(
    on,
    {
      px: "md",
      py: "xs",
      style: {
        display: "grid",
        gridTemplateColumns: v,
        gap: "12px",
        alignItems: "center",
        borderBottom: "1px solid var(--mantine-color-gray-2)",
        paddingLeft: `calc(var(--mantine-spacing-md) + ${i * 16}px)`,
        backgroundColor: s ? "var(--mantine-color-gray-0)" : void 0
      },
      className: "part-row"
    },
    /* @__PURE__ */ _e.createElement(on, { style: { display: "flex", justifyContent: "center" } }, d ? /* @__PURE__ */ _e.createElement(Jp, { variant: "subtle", size: "sm", onClick: u }, s ? /* @__PURE__ */ _e.createElement(mi, { size: 16 }) : /* @__PURE__ */ _e.createElement(pi, { size: 16 })) : /* @__PURE__ */ _e.createElement(on, { style: { width: 22 } })),
    /* @__PURE__ */ _e.createElement(Va, { gap: "sm", wrap: "nowrap" }, /* @__PURE__ */ _e.createElement(
      Zp,
      {
        src: e.thumbnail || e.image,
        size: "sm",
        radius: "sm",
        color: "gray"
      },
      e.name.charAt(0)
    ), /* @__PURE__ */ _e.createElement(on, { style: { minWidth: 0, flex: 1 } }, /* @__PURE__ */ _e.createElement(Va, { gap: "xs", wrap: "nowrap" }, /* @__PURE__ */ _e.createElement(
      Qp,
      {
        size: "sm",
        fw: 500,
        onClick: h,
        style: { cursor: "pointer" },
        truncate: !0
      },
      e.name
    ), e.trackable && /* @__PURE__ */ _e.createElement($a, { size: "xs", variant: "light", color: "blue" }, "Trackable")))),
    /* @__PURE__ */ _e.createElement(za, { label: e.IPN, disabled: !e.IPN }, /* @__PURE__ */ _e.createElement(Pr, { size: "sm", c: e.IPN ? "dark" : "dimmed", truncate: !0, fw: e.IPN ? 500 : 400 }, e.IPN || "-")),
    n && /* @__PURE__ */ _e.createElement(Pr, { size: "sm", c: "dimmed", lineClamp: 1, title: e.category_path }, e.category_name || "Uncategorized"),
    /* @__PURE__ */ _e.createElement(za, { label: e.description, disabled: !e.description }, /* @__PURE__ */ _e.createElement(Pr, { size: "sm", c: "dimmed", lineClamp: 1 }, e.description || "-")),
    /* @__PURE__ */ _e.createElement(
      $a,
      {
        color: l.color,
        size: "sm",
        variant: "light",
        leftSection: l.label === "Low Stock" || l.label === "Out of Stock" ? /* @__PURE__ */ _e.createElement(Jn, { size: 10 }) : null
      },
      l.label
    ),
    /* @__PURE__ */ _e.createElement(
      $a,
      {
        color: g.color,
        size: "sm",
        variant: "light"
      },
      g.label
    ),
    /* @__PURE__ */ _e.createElement(
      za,
      {
        label: f.showMin ? `${f.stock} in stock / ${f.min} minimum required` : `${f.stock} in stock`,
        position: "left"
      },
      /* @__PURE__ */ _e.createElement(Va, { gap: "sm", wrap: "nowrap", justify: "flex-end" }, /* @__PURE__ */ _e.createElement(
        ev,
        {
          value: l.progressValue,
          color: l.progressColor,
          size: "sm",
          style: { width: 60 }
        }
      ), /* @__PURE__ */ _e.createElement(on, { style: { minWidth: 80, textAlign: "right" } }, /* @__PURE__ */ _e.createElement(Pr, { size: "sm", fw: 500, component: "span" }, f.stock), f.showMin && /* @__PURE__ */ _e.createElement(Pr, { size: "xs", c: "dimmed", component: "span" }, " ", "/ ", f.min, " ", /* @__PURE__ */ _e.createElement(Pr, { component: "span", size: "xs", c: "dimmed", fs: "italic" }, "min"))))
    )
  ), d && /* @__PURE__ */ _e.createElement(qp, { in: s }, /* @__PURE__ */ _e.createElement(Yp, { stockItems: e.stock_items || [], context: r })));
}
const Pt = window.React, ns = window.MantineCore.Box, xr = window.MantineCore.Text, tv = window.MantineCore.Tooltip;
function df({
  showLocationQty: e = !1,
  showCategory: r = !1
}) {
  const t = r ? "30px minmax(150px, 1.5fr) 100px minmax(120px, 1fr) minmax(100px, 1fr) 100px 110px minmax(140px, 1fr)" : "30px minmax(180px, 2fr) 100px minmax(100px, 1fr) 100px 110px minmax(140px, 1fr)";
  return /* @__PURE__ */ Pt.createElement(
    ns,
    {
      px: "md",
      py: "xs",
      style: {
        display: "grid",
        gridTemplateColumns: t,
        gap: "12px",
        backgroundColor: "var(--mantine-color-gray-2)",
        borderBottom: "1px solid var(--mantine-color-gray-3)"
      }
    },
    /* @__PURE__ */ Pt.createElement(ns, null),
    /* @__PURE__ */ Pt.createElement(xr, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "Part Name"),
    /* @__PURE__ */ Pt.createElement(xr, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "IPN"),
    r && /* @__PURE__ */ Pt.createElement(xr, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "Category"),
    /* @__PURE__ */ Pt.createElement(xr, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "Description"),
    /* @__PURE__ */ Pt.createElement(xr, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "Qty Status"),
    /* @__PURE__ */ Pt.createElement(xr, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "Inv Status"),
    /* @__PURE__ */ Pt.createElement(
      tv,
      {
        label: "Current stock quantity / Minimum stock level",
        position: "left"
      },
      /* @__PURE__ */ Pt.createElement(xr, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase", ta: "right" }, e ? "Qty at Location" : "Stock / Min")
    )
  );
}
const Jt = window.React, rv = window.React.useMemo, as = window.MantineCore.Box, is = window.MantineCore.Paper, ss = window.MantineCore.Text;
function nv({
  parts: e,
  context: r,
  searchTerm: t,
  showLowStockOnly: n = !1,
  showNeedsCheckOnly: a = !1
}) {
  const i = rv(() => {
    let s = ks(e, t);
    return n && (s = Os(s)), a && (s = Rs(s)), s;
  }, [e, t, n, a]);
  return i.length === 0 ? /* @__PURE__ */ Jt.createElement(is, { withBorder: !0, p: "xl" }, /* @__PURE__ */ Jt.createElement(ss, { c: "dimmed", ta: "center" }, t ? `No parts found matching "${t}"` : n ? "No low stock parts found" : a ? "No parts needing stock check found" : "No critical parts available")) : /* @__PURE__ */ Jt.createElement(as, null, /* @__PURE__ */ Jt.createElement(is, { withBorder: !0, style: { overflow: "hidden" } }, /* @__PURE__ */ Jt.createElement(df, { showCategory: !0 }), /* @__PURE__ */ Jt.createElement(as, { style: { maxHeight: "60vh", overflowY: "auto" } }, i.map((s) => /* @__PURE__ */ Jt.createElement(
    xf,
    {
      key: `part-${s.id}`,
      part: s,
      context: r,
      showCategory: !0,
      isExpandable: !0
    }
  )))), t && /* @__PURE__ */ Jt.createElement(ss, { size: "sm", c: "dimmed", mt: "sm" }, "Showing ", i.length, " of ", e.length, " parts"));
}
const dr = window.React, av = window.React.useMemo, iv = window.MantineCore.Badge, sv = window.MantineCore.Group, ov = window.MantineCore.Text, fv = window.MantineCore.UnstyledButton;
function lv({
  group: e,
  isExpanded: r,
  onToggle: t,
  level: n = 0,
  isLocationView: a = !1
}) {
  const i = av(() => vi(e), [e]);
  if (i === 0) return null;
  const s = a ? Fs : ys;
  return /* @__PURE__ */ dr.createElement(
    fv,
    {
      onClick: t,
      w: "100%",
      px: "md",
      py: "xs",
      style: {
        backgroundColor: "var(--mantine-color-gray-1)",
        borderBottom: "1px solid var(--mantine-color-gray-3)"
      }
    },
    /* @__PURE__ */ dr.createElement(sv, { gap: "xs", wrap: "nowrap", style: { paddingLeft: n * 16 } }, r ? /* @__PURE__ */ dr.createElement(mi, { size: 16, color: "gray" }) : /* @__PURE__ */ dr.createElement(pi, { size: 16, color: "gray" }), /* @__PURE__ */ dr.createElement(s, { size: 16, color: "gray" }), /* @__PURE__ */ dr.createElement(ov, { size: "sm", fw: 600, style: { flex: 1 } }, e.name), /* @__PURE__ */ dr.createElement(iv, { color: "gray", size: "sm", variant: "light" }, i))
  );
}
const Mr = window.React, os = window.MantineCore.Box, cv = window.MantineCore.Collapse;
function mf({
  group: e,
  context: r,
  expandedGroups: t,
  toggleGroup: n,
  level: a = 0,
  prefix: i,
  isLocationView: s = !1
}) {
  const o = `${i}-${e.id ?? "none"}-${a}`, l = t.has(o);
  if (vi(e) === 0) return null;
  const c = e.parts && e.parts.length > 0, d = e.children && e.children.length > 0;
  return /* @__PURE__ */ Mr.createElement(os, null, /* @__PURE__ */ Mr.createElement(
    lv,
    {
      group: e,
      isExpanded: l,
      onToggle: () => n(o),
      level: a,
      isLocationView: s
    }
  ), /* @__PURE__ */ Mr.createElement(cv, { in: l }, c && /* @__PURE__ */ Mr.createElement(os, null, e.parts.map((h) => /* @__PURE__ */ Mr.createElement(
    xf,
    {
      key: `part-${h.id}-${e.id}`,
      part: h,
      context: r,
      showLocationQty: s,
      isExpandable: !0,
      indent: a + 1
    }
  ))), d && e.children.map((h) => /* @__PURE__ */ Mr.createElement(
    mf,
    {
      key: `child-${h.id ?? "none"}-${a + 1}`,
      group: h,
      context: r,
      expandedGroups: t,
      toggleGroup: n,
      level: a + 1,
      prefix: i,
      isLocationView: s
    }
  ))));
}
const Xa = window.React, hv = window.MantineCore.CloseButton, uv = window.MantineCore.TextInput;
function xv({
  value: e,
  onChange: r,
  placeholder: t = "Search parts by name, IPN, or description..."
}) {
  return /* @__PURE__ */ Xa.createElement(
    uv,
    {
      value: e,
      placeholder: t,
      leftSection: /* @__PURE__ */ Xa.createElement(Nl, { size: 16 }),
      rightSection: e.length > 0 ? /* @__PURE__ */ Xa.createElement(hv, { size: "sm", onClick: () => r("") }) : null,
      onChange: (n) => r(n.target.value),
      style: { flex: 1, maxWidth: 400 }
    }
  );
}
const ae = window.React, jn = window.React.useCallback, dv = window.React.useEffect, ja = window.React.useMemo, fn = window.React.useState, Ya = window.MantineCore.ActionIcon, fs = window.MantineCore.Alert, Yn = window.MantineCore.Badge, mv = window.MantineCore.Box, Ka = window.MantineCore.Divider, Qt = window.MantineCore.Group, pv = window.MantineCore.Loader, ls = window.MantineCore.Paper, vv = window.MantineCore.SegmentedControl, Ja = window.MantineCore.Stack, cs = window.MantineCore.Switch, Kn = window.MantineCore.Text, hs = window.MantineCore.Title, ln = window.MantineCore.Tooltip;
function _v({
  context: e
}) {
  const [r, t] = fn("all"), [n, a] = fn(""), [i] = Df(n, 300), [s, o] = fn(/* @__PURE__ */ new Set()), [l, f] = fn(!1), [c, d] = fn(!1), { data: h, isLoading: u, isError: v, error: x } = ul(
    {
      queryKey: ["critical-components", r],
      queryFn: async () => (await e.api.get(
        `/plugin/criticalcomponents/list/?group_by=${r}`
      )).data
    },
    e.queryClient
  ), g = ja(() => h ? r === "location" ? h.locations ?? [] : r === "category" ? h.categories ?? [] : [] : [], [h, r]), C = ja(() => {
    let k = Ql(g, i);
    return l && (k = Zl(k)), c && (k = ql(k)), k;
  }, [g, i, l, c]), O = ja(() => x0(C, r === "location" ? "loc" : "cat"), [C, r]), F = jn((k) => {
    o((W) => {
      const H = new Set(W);
      return H.has(k) ? H.delete(k) : H.add(k), H;
    });
  }, []), L = jn(() => {
    o(new Set(O));
  }, [O]), Y = jn(() => {
    o(/* @__PURE__ */ new Set());
  }, []), q = jn((k) => {
    t(k), o(/* @__PURE__ */ new Set());
  }, []);
  if (dv(() => {
    if (C.length > 0 && s.size === 0 && r !== "all") {
      const W = x0(C, r === "location" ? "loc" : "cat");
      o(new Set(W));
    }
  }, [C.length, r]), u)
    return /* @__PURE__ */ ae.createElement(Ja, { align: "center", justify: "center", p: "xl" }, /* @__PURE__ */ ae.createElement(pv, { size: "lg" }), /* @__PURE__ */ ae.createElement(Kn, { c: "dimmed" }, "Loading critical components..."));
  if (v)
    return /* @__PURE__ */ ae.createElement(
      fs,
      {
        icon: /* @__PURE__ */ ae.createElement(Pl, { size: 16 }),
        title: "Error Loading Data",
        color: "red",
        variant: "light"
      },
      x instanceof Error ? x.message : "Failed to load critical components"
    );
  if (!h || h.total_parts === 0)
    return /* @__PURE__ */ ae.createElement(Ja, { gap: "md" }, /* @__PURE__ */ ae.createElement(Qt, { justify: "space-between" }, /* @__PURE__ */ ae.createElement(hs, { order: 3 }, "Critical Components")), /* @__PURE__ */ ae.createElement(
      fs,
      {
        icon: /* @__PURE__ */ ae.createElement(Jn, { size: 16 }),
        title: "No Critical Components Found",
        color: "gray",
        variant: "light"
      },
      /* @__PURE__ */ ae.createElement(Kn, { size: "sm" }, "No parts have been marked as critical components."),
      /* @__PURE__ */ ae.createElement(Kn, { size: "xs", c: "dimmed", mt: "xs" }, 'To mark a part as critical, add the "CriticalComponent" parameter to a part and set its value to "True".')
    ));
  const R = r === "location" ? "loc" : "cat", U = r === "category" || r === "location";
  return /* @__PURE__ */ ae.createElement(Ja, { gap: "md" }, /* @__PURE__ */ ae.createElement(Qt, { justify: "space-between", wrap: "wrap" }, /* @__PURE__ */ ae.createElement(Qt, { gap: "sm" }, /* @__PURE__ */ ae.createElement(hs, { order: 3 }, "Critical Components"), /* @__PURE__ */ ae.createElement(Yn, { color: "blue", size: "lg" }, h.total_parts, " Parts"), h.total_critical_low_stock > 0 && /* @__PURE__ */ ae.createElement(
    Yn,
    {
      color: "orange",
      size: "lg",
      leftSection: /* @__PURE__ */ ae.createElement(Jn, { size: 12 })
    },
    h.total_critical_low_stock,
    " Low Stock"
  ), (h.total_out_of_stock ?? 0) > 0 && /* @__PURE__ */ ae.createElement(
    Yn,
    {
      color: "red",
      size: "lg",
      leftSection: /* @__PURE__ */ ae.createElement(vl, { size: 12 })
    },
    h.total_out_of_stock,
    " Out of Stock"
  ), (h.total_needs_check ?? 0) > 0 && /* @__PURE__ */ ae.createElement(
    Yn,
    {
      color: "yellow",
      size: "lg",
      leftSection: /* @__PURE__ */ ae.createElement(oi, { size: 12 })
    },
    h.total_needs_check,
    " Needs Stock Count"
  ))), /* @__PURE__ */ ae.createElement(ls, { p: "sm", withBorder: !0 }, /* @__PURE__ */ ae.createElement(Qt, { justify: "space-between", wrap: "wrap", gap: "sm" }, /* @__PURE__ */ ae.createElement(xv, { value: n, onChange: a }), /* @__PURE__ */ ae.createElement(Qt, { gap: "xs" }, /* @__PURE__ */ ae.createElement(
    vv,
    {
      value: r,
      onChange: q,
      data: [
        {
          label: /* @__PURE__ */ ae.createElement(Qt, { gap: 4 }, /* @__PURE__ */ ae.createElement(Ol, { size: 14 }), /* @__PURE__ */ ae.createElement("span", null, "All")),
          value: "all"
        },
        {
          label: /* @__PURE__ */ ae.createElement(Qt, { gap: 4 }, /* @__PURE__ */ ae.createElement(ys, { size: 14 }), /* @__PURE__ */ ae.createElement("span", null, "Category")),
          value: "category"
        },
        {
          label: /* @__PURE__ */ ae.createElement(Qt, { gap: 4 }, /* @__PURE__ */ ae.createElement(Fs, { size: 14 }), /* @__PURE__ */ ae.createElement("span", null, "Location")),
          value: "location"
        }
      ],
      size: "xs"
    }
  ), U && /* @__PURE__ */ ae.createElement(ae.Fragment, null, /* @__PURE__ */ ae.createElement(Ka, { orientation: "vertical" }), /* @__PURE__ */ ae.createElement(ln, { label: "Expand All" }, /* @__PURE__ */ ae.createElement(Ya, { variant: "light", onClick: L }, /* @__PURE__ */ ae.createElement(El, { size: 16 }))), /* @__PURE__ */ ae.createElement(ln, { label: "Collapse All" }, /* @__PURE__ */ ae.createElement(Ya, { variant: "light", onClick: Y }, /* @__PURE__ */ ae.createElement(yl, { size: 16 })))), /* @__PURE__ */ ae.createElement(Ka, { orientation: "vertical" }), /* @__PURE__ */ ae.createElement(ln, { label: "Show only low stock items" }, /* @__PURE__ */ ae.createElement(
    cs,
    {
      checked: l,
      onChange: (k) => f(k.currentTarget.checked),
      label: "Low Stock Only",
      size: "xs",
      color: "orange",
      thumbIcon: l ? /* @__PURE__ */ ae.createElement(Jn, { size: 10, color: "orange" }) : null
    }
  )), /* @__PURE__ */ ae.createElement(ln, { label: "Show only items needing stock check" }, /* @__PURE__ */ ae.createElement(
    cs,
    {
      checked: c,
      onChange: (k) => d(k.currentTarget.checked),
      label: "Needs Stock Count Only",
      size: "xs",
      color: "yellow",
      thumbIcon: c ? /* @__PURE__ */ ae.createElement(oi, { size: 10, color: "orange" }) : null
    }
  )), /* @__PURE__ */ ae.createElement(Ka, { orientation: "vertical" }), /* @__PURE__ */ ae.createElement(ln, { label: "Export to Excel" }, /* @__PURE__ */ ae.createElement(
    Ya,
    {
      variant: "light",
      color: "green",
      onClick: () => {
        let k = ks(h.parts ?? [], i);
        l && (k = Os(k)), c && (k = Rs(k)), $p(k);
      }
    },
    /* @__PURE__ */ ae.createElement(Al, { size: 16 })
  ))))), i && U && /* @__PURE__ */ ae.createElement(Kn, { size: "sm", c: "dimmed" }, 'Showing results for "', i, '"', C.length === 0 && " - No matching parts found"), r === "all" ? (
    /* All Parts Table (flat view) */
    /* @__PURE__ */ ae.createElement(
      nv,
      {
        parts: h.parts ?? [],
        context: e,
        searchTerm: i,
        showLowStockOnly: l,
        showNeedsCheckOnly: c
      }
    )
  ) : (
    /* Grouped View (category or location) */
    C.length > 0 && /* @__PURE__ */ ae.createElement(ls, { withBorder: !0, style: { overflow: "hidden" } }, /* @__PURE__ */ ae.createElement(df, { showLocationQty: r === "location" }), /* @__PURE__ */ ae.createElement(mv, { style: { maxHeight: "60vh", overflowY: "auto" } }, C.map((k) => /* @__PURE__ */ ae.createElement(
      mf,
      {
        key: `group-${k.id ?? "none"}-0`,
        group: k,
        context: e,
        expandedGroups: s,
        toggleGroup: F,
        level: 0,
        prefix: R,
        isLocationView: r === "location"
      }
    ))))
  ));
}
function wv(e) {
  return Ml(e), /* @__PURE__ */ ae.createElement(Kl, { locale: e.locale }, /* @__PURE__ */ ae.createElement(_v, { context: e }));
}
export {
  wv as default,
  wv as renderPanel
};
