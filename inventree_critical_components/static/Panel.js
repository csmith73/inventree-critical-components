var Mi = (e) => {
  throw TypeError(e);
};
var wa = (e, r, t) => r.has(e) || Mi("Cannot " + t);
var X = (e, r, t) => (wa(e, r, "read from private field"), t ? t.call(e) : r.get(e)), Oe = (e, r, t) => r.has(e) ? Mi("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(e) : r.set(e, t), xe = (e, r, t, n) => (wa(e, r, "write to private field"), n ? n.call(e, t) : r.set(e, t), t), Be = (e, r, t) => (wa(e, r, "access private method"), t);
const vo = window.React.useState, Ta = window.React.useRef, Li = window.React.useEffect;
function _o(e, r, t = { leading: !1 }) {
  const [n, a] = vo(e), i = Ta(!1), s = Ta(null), f = Ta(!1), l = () => window.clearTimeout(s.current);
  return Li(() => {
    i.current && (!f.current && t.leading ? (f.current = !0, a(e)) : (l(), s.current = window.setTimeout(() => {
      f.current = !1, a(e);
    }, r)));
  }, [e, t.leading, r]), Li(() => (i.current = !0, l), []), [n, l];
}
var ti = class {
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
}, go = {
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
}, Kt, ei, q0, wo = (q0 = class {
  constructor() {
    // We cannot have TimeoutManager<T> as we must instantiate it with a concrete
    // type at app boot; and if we leave that type, then any new timer provider
    // would need to support ReturnType<typeof setTimeout>, which is infeasible.
    //
    // We settle for type safety for the TimeoutProvider type, and accept that
    // this class is unsafe internally to allow for extension.
    Oe(this, Kt, go);
    Oe(this, ei, !1);
  }
  setTimeoutProvider(e) {
    xe(this, Kt, e);
  }
  setTimeout(e, r) {
    return X(this, Kt).setTimeout(e, r);
  }
  clearTimeout(e) {
    X(this, Kt).clearTimeout(e);
  }
  setInterval(e, r) {
    return X(this, Kt).setInterval(e, r);
  }
  clearInterval(e) {
    X(this, Kt).clearInterval(e);
  }
}, Kt = new WeakMap(), ei = new WeakMap(), q0), Dn = new wo();
function To(e) {
  setTimeout(e, 0);
}
var dn = typeof window > "u" || "Deno" in globalThis;
function Wa() {
}
function Bi(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function Eo(e, r) {
  return Math.max(e + (r || 0) - Date.now(), 0);
}
function fn(e, r) {
  return typeof e == "function" ? e(r) : e;
}
function kt(e, r) {
  return typeof e == "function" ? e(r) : e;
}
var So = Object.prototype.hasOwnProperty;
function ns(e, r) {
  if (e === r)
    return e;
  const t = bi(e) && bi(r);
  if (!t && !(Ui(e) && Ui(r))) return r;
  const a = (t ? e : Object.keys(e)).length, i = t ? r : Object.keys(r), s = i.length, f = t ? new Array(s) : {};
  let l = 0;
  for (let o = 0; o < s; o++) {
    const c = t ? o : i[o], u = e[c], d = r[c];
    if (u === d) {
      f[c] = u, (t ? o < a : So.call(e, c)) && l++;
      continue;
    }
    if (u === null || d === null || typeof u != "object" || typeof d != "object") {
      f[c] = d;
      continue;
    }
    const m = ns(u, d);
    f[c] = m, m === u && l++;
  }
  return a === s && l === a ? e : f;
}
function Ha(e, r) {
  if (!r || Object.keys(e).length !== Object.keys(r).length)
    return !1;
  for (const t in e)
    if (e[t] !== r[t])
      return !1;
  return !0;
}
function bi(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Ui(e) {
  if (!Wi(e))
    return !1;
  const r = e.constructor;
  if (r === void 0)
    return !0;
  const t = r.prototype;
  return !(!Wi(t) || !t.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(e) !== Object.prototype);
}
function Wi(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function Hi(e, r, t) {
  return typeof t.structuralSharing == "function" ? t.structuralSharing(e, r) : t.structuralSharing !== !1 ? ns(e, r) : r;
}
function as(e, r) {
  return typeof e == "function" ? e(...r) : !!e;
}
var xr, Jt, Ur, es, yo = (es = class extends ti {
  constructor() {
    super();
    Oe(this, xr);
    Oe(this, Jt);
    Oe(this, Ur);
    xe(this, Ur, (r) => {
      if (!dn && window.addEventListener) {
        const t = () => r();
        return window.addEventListener("visibilitychange", t, !1), () => {
          window.removeEventListener("visibilitychange", t);
        };
      }
    });
  }
  onSubscribe() {
    X(this, Jt) || this.setEventListener(X(this, Ur));
  }
  onUnsubscribe() {
    var r;
    this.hasListeners() || ((r = X(this, Jt)) == null || r.call(this), xe(this, Jt, void 0));
  }
  setEventListener(r) {
    var t;
    xe(this, Ur, r), (t = X(this, Jt)) == null || t.call(this), xe(this, Jt, r((n) => {
      typeof n == "boolean" ? this.setFocused(n) : this.onFocus();
    }));
  }
  setFocused(r) {
    X(this, xr) !== r && (xe(this, xr, r), this.onFocus());
  }
  onFocus() {
    const r = this.isFocused();
    this.listeners.forEach((t) => {
      t(r);
    });
  }
  isFocused() {
    var r;
    return typeof X(this, xr) == "boolean" ? X(this, xr) : ((r = globalThis.document) == null ? void 0 : r.visibilityState) !== "hidden";
  }
}, xr = new WeakMap(), Jt = new WeakMap(), Ur = new WeakMap(), es), Fo = new yo();
function Gi() {
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
var Co = To;
function Ao() {
  let e = [], r = 0, t = (f) => {
    f();
  }, n = (f) => {
    f();
  }, a = Co;
  const i = (f) => {
    r ? e.push(f) : a(() => {
      t(f);
    });
  }, s = () => {
    const f = e;
    e = [], f.length && a(() => {
      n(() => {
        f.forEach((l) => {
          t(l);
        });
      });
    });
  };
  return {
    batch: (f) => {
      let l;
      r++;
      try {
        l = f();
      } finally {
        r--, r || s();
      }
      return l;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (f) => (...l) => {
      i(() => {
        f(...l);
      });
    },
    schedule: i,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (f) => {
      t = f;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (f) => {
      n = f;
    },
    setScheduler: (f) => {
      a = f;
    }
  };
}
var is = Ao(), Wr, Qt, Hr, ts, ko = (ts = class extends ti {
  constructor() {
    super();
    Oe(this, Wr, !0);
    Oe(this, Qt);
    Oe(this, Hr);
    xe(this, Hr, (r) => {
      if (!dn && window.addEventListener) {
        const t = () => r(!0), n = () => r(!1);
        return window.addEventListener("online", t, !1), window.addEventListener("offline", n, !1), () => {
          window.removeEventListener("online", t), window.removeEventListener("offline", n);
        };
      }
    });
  }
  onSubscribe() {
    X(this, Qt) || this.setEventListener(X(this, Hr));
  }
  onUnsubscribe() {
    var r;
    this.hasListeners() || ((r = X(this, Qt)) == null || r.call(this), xe(this, Qt, void 0));
  }
  setEventListener(r) {
    var t;
    xe(this, Hr, r), (t = X(this, Qt)) == null || t.call(this), xe(this, Qt, r(this.setOnline.bind(this)));
  }
  setOnline(r) {
    X(this, Wr) !== r && (xe(this, Wr, r), this.listeners.forEach((n) => {
      n(r);
    }));
  }
  isOnline() {
    return X(this, Wr);
  }
}, Wr = new WeakMap(), Qt = new WeakMap(), Hr = new WeakMap(), ts), Oo = new ko();
function Ro(e) {
  return (e ?? "online") === "online" ? Oo.isOnline() : !0;
}
function Io(e, r) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: Ro(r.networkMode) ? "fetching" : "paused",
    ...e === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
var ot, ue, En, at, dr, Gr, Wt, Zt, Sn, Vr, $r, mr, pr, qt, zr, ge, an, Ga, Va, $a, za, Xa, ja, Ya, ss, rs, Do = (rs = class extends ti {
  constructor(r, t) {
    super();
    Oe(this, ge);
    Oe(this, ot);
    Oe(this, ue);
    Oe(this, En);
    Oe(this, at);
    Oe(this, dr);
    Oe(this, Gr);
    Oe(this, Wt);
    Oe(this, Zt);
    Oe(this, Sn);
    Oe(this, Vr);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    Oe(this, $r);
    Oe(this, mr);
    Oe(this, pr);
    Oe(this, qt);
    Oe(this, zr, /* @__PURE__ */ new Set());
    this.options = t, xe(this, ot, r), xe(this, Zt, null), xe(this, Wt, Gi()), this.bindMethods(), this.setOptions(t);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 && (X(this, ue).addObserver(this), Vi(X(this, ue), this.options) ? Be(this, ge, an).call(this) : this.updateResult(), Be(this, ge, za).call(this));
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return Ka(
      X(this, ue),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return Ka(
      X(this, ue),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), Be(this, ge, Xa).call(this), Be(this, ge, ja).call(this), X(this, ue).removeObserver(this);
  }
  setOptions(r) {
    const t = this.options, n = X(this, ue);
    if (this.options = X(this, ot).defaultQueryOptions(r), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof kt(this.options.enabled, X(this, ue)) != "boolean")
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    Be(this, ge, Ya).call(this), X(this, ue).setOptions(this.options), t._defaulted && !Ha(this.options, t) && X(this, ot).getQueryCache().notify({
      type: "observerOptionsUpdated",
      query: X(this, ue),
      observer: this
    });
    const a = this.hasListeners();
    a && $i(
      X(this, ue),
      n,
      this.options,
      t
    ) && Be(this, ge, an).call(this), this.updateResult(), a && (X(this, ue) !== n || kt(this.options.enabled, X(this, ue)) !== kt(t.enabled, X(this, ue)) || fn(this.options.staleTime, X(this, ue)) !== fn(t.staleTime, X(this, ue))) && Be(this, ge, Ga).call(this);
    const i = Be(this, ge, Va).call(this);
    a && (X(this, ue) !== n || kt(this.options.enabled, X(this, ue)) !== kt(t.enabled, X(this, ue)) || i !== X(this, qt)) && Be(this, ge, $a).call(this, i);
  }
  getOptimisticResult(r) {
    const t = X(this, ot).getQueryCache().build(X(this, ot), r), n = this.createResult(t, r);
    return Po(this, n) && (xe(this, at, n), xe(this, Gr, this.options), xe(this, dr, X(this, ue).state)), n;
  }
  getCurrentResult() {
    return X(this, at);
  }
  trackResult(r, t) {
    return new Proxy(r, {
      get: (n, a) => (this.trackProp(a), t == null || t(a), a === "promise" && (this.trackProp("data"), !this.options.experimental_prefetchInRender && X(this, Wt).status === "pending" && X(this, Wt).reject(
        new Error(
          "experimental_prefetchInRender feature flag is not enabled"
        )
      )), Reflect.get(n, a))
    });
  }
  trackProp(r) {
    X(this, zr).add(r);
  }
  getCurrentQuery() {
    return X(this, ue);
  }
  refetch({ ...r } = {}) {
    return this.fetch({
      ...r
    });
  }
  fetchOptimistic(r) {
    const t = X(this, ot).defaultQueryOptions(r), n = X(this, ot).getQueryCache().build(X(this, ot), t);
    return n.fetch().then(() => this.createResult(n, t));
  }
  fetch(r) {
    return Be(this, ge, an).call(this, {
      ...r,
      cancelRefetch: r.cancelRefetch ?? !0
    }).then(() => (this.updateResult(), X(this, at)));
  }
  createResult(r, t) {
    var D;
    const n = X(this, ue), a = this.options, i = X(this, at), s = X(this, dr), f = X(this, Gr), o = r !== n ? r.state : X(this, En), { state: c } = r;
    let u = { ...c }, d = !1, m;
    if (t._optimisticResults) {
      const W = this.hasListeners(), V = !W && Vi(r, t), z = W && $i(r, n, t, a);
      (V || z) && (u = {
        ...u,
        ...Io(c.data, r.options)
      }), t._optimisticResults === "isRestoring" && (u.fetchStatus = "idle");
    }
    let { error: g, errorUpdatedAt: h, status: _ } = u;
    m = u.data;
    let k = !1;
    if (t.placeholderData !== void 0 && m === void 0 && _ === "pending") {
      let W;
      i != null && i.isPlaceholderData && t.placeholderData === (f == null ? void 0 : f.placeholderData) ? (W = i.data, k = !0) : W = typeof t.placeholderData == "function" ? t.placeholderData(
        (D = X(this, $r)) == null ? void 0 : D.state.data,
        X(this, $r)
      ) : t.placeholderData, W !== void 0 && (_ = "success", m = Hi(
        i == null ? void 0 : i.data,
        W,
        t
      ), d = !0);
    }
    if (t.select && m !== void 0 && !k)
      if (i && m === (s == null ? void 0 : s.data) && t.select === X(this, Sn))
        m = X(this, Vr);
      else
        try {
          xe(this, Sn, t.select), m = t.select(m), m = Hi(i == null ? void 0 : i.data, m, t), xe(this, Vr, m), xe(this, Zt, null);
        } catch (W) {
          xe(this, Zt, W);
        }
    X(this, Zt) && (g = X(this, Zt), m = X(this, Vr), h = Date.now(), _ = "error");
    const O = u.fetchStatus === "fetching", C = _ === "pending", L = _ === "error", Y = C && O, q = m !== void 0, b = {
      status: _,
      fetchStatus: u.fetchStatus,
      isPending: C,
      isSuccess: _ === "success",
      isError: L,
      isInitialLoading: Y,
      isLoading: Y,
      data: m,
      dataUpdatedAt: u.dataUpdatedAt,
      error: g,
      errorUpdatedAt: h,
      failureCount: u.fetchFailureCount,
      failureReason: u.fetchFailureReason,
      errorUpdateCount: u.errorUpdateCount,
      isFetched: u.dataUpdateCount > 0 || u.errorUpdateCount > 0,
      isFetchedAfterMount: u.dataUpdateCount > o.dataUpdateCount || u.errorUpdateCount > o.errorUpdateCount,
      isFetching: O,
      isRefetching: O && !C,
      isLoadingError: L && !q,
      isPaused: u.fetchStatus === "paused",
      isPlaceholderData: d,
      isRefetchError: L && q,
      isStale: ri(r, t),
      refetch: this.refetch,
      promise: X(this, Wt),
      isEnabled: kt(t.enabled, r) !== !1
    };
    if (this.options.experimental_prefetchInRender) {
      const W = (ee) => {
        b.status === "error" ? ee.reject(b.error) : b.data !== void 0 && ee.resolve(b.data);
      }, V = () => {
        const ee = xe(this, Wt, b.promise = Gi());
        W(ee);
      }, z = X(this, Wt);
      switch (z.status) {
        case "pending":
          r.queryHash === n.queryHash && W(z);
          break;
        case "fulfilled":
          (b.status === "error" || b.data !== z.value) && V();
          break;
        case "rejected":
          (b.status !== "error" || b.error !== z.reason) && V();
          break;
      }
    }
    return b;
  }
  updateResult() {
    const r = X(this, at), t = this.createResult(X(this, ue), this.options);
    if (xe(this, dr, X(this, ue).state), xe(this, Gr, this.options), X(this, dr).data !== void 0 && xe(this, $r, X(this, ue)), Ha(t, r))
      return;
    xe(this, at, t);
    const n = () => {
      if (!r)
        return !0;
      const { notifyOnChangeProps: a } = this.options, i = typeof a == "function" ? a() : a;
      if (i === "all" || !i && !X(this, zr).size)
        return !0;
      const s = new Set(
        i ?? X(this, zr)
      );
      return this.options.throwOnError && s.add("error"), Object.keys(X(this, at)).some((f) => {
        const l = f;
        return X(this, at)[l] !== r[l] && s.has(l);
      });
    };
    Be(this, ge, ss).call(this, { listeners: n() });
  }
  onQueryUpdate() {
    this.updateResult(), this.hasListeners() && Be(this, ge, za).call(this);
  }
}, ot = new WeakMap(), ue = new WeakMap(), En = new WeakMap(), at = new WeakMap(), dr = new WeakMap(), Gr = new WeakMap(), Wt = new WeakMap(), Zt = new WeakMap(), Sn = new WeakMap(), Vr = new WeakMap(), $r = new WeakMap(), mr = new WeakMap(), pr = new WeakMap(), qt = new WeakMap(), zr = new WeakMap(), ge = new WeakSet(), an = function(r) {
  Be(this, ge, Ya).call(this);
  let t = X(this, ue).fetch(
    this.options,
    r
  );
  return r != null && r.throwOnError || (t = t.catch(Wa)), t;
}, Ga = function() {
  Be(this, ge, Xa).call(this);
  const r = fn(
    this.options.staleTime,
    X(this, ue)
  );
  if (dn || X(this, at).isStale || !Bi(r))
    return;
  const n = Eo(X(this, at).dataUpdatedAt, r) + 1;
  xe(this, mr, Dn.setTimeout(() => {
    X(this, at).isStale || this.updateResult();
  }, n));
}, Va = function() {
  return (typeof this.options.refetchInterval == "function" ? this.options.refetchInterval(X(this, ue)) : this.options.refetchInterval) ?? !1;
}, $a = function(r) {
  Be(this, ge, ja).call(this), xe(this, qt, r), !(dn || kt(this.options.enabled, X(this, ue)) === !1 || !Bi(X(this, qt)) || X(this, qt) === 0) && xe(this, pr, Dn.setInterval(() => {
    (this.options.refetchIntervalInBackground || Fo.isFocused()) && Be(this, ge, an).call(this);
  }, X(this, qt)));
}, za = function() {
  Be(this, ge, Ga).call(this), Be(this, ge, $a).call(this, Be(this, ge, Va).call(this));
}, Xa = function() {
  X(this, mr) && (Dn.clearTimeout(X(this, mr)), xe(this, mr, void 0));
}, ja = function() {
  X(this, pr) && (Dn.clearInterval(X(this, pr)), xe(this, pr, void 0));
}, Ya = function() {
  const r = X(this, ot).getQueryCache().build(X(this, ot), this.options);
  if (r === X(this, ue))
    return;
  const t = X(this, ue);
  xe(this, ue, r), xe(this, En, r.state), this.hasListeners() && (t == null || t.removeObserver(this), r.addObserver(this));
}, ss = function(r) {
  is.batch(() => {
    r.listeners && this.listeners.forEach((t) => {
      t(X(this, at));
    }), X(this, ot).getQueryCache().notify({
      query: X(this, ue),
      type: "observerResultsUpdated"
    });
  });
}, rs);
function No(e, r) {
  return kt(r.enabled, e) !== !1 && e.state.data === void 0 && !(e.state.status === "error" && r.retryOnMount === !1);
}
function Vi(e, r) {
  return No(e, r) || e.state.data !== void 0 && Ka(e, r, r.refetchOnMount);
}
function Ka(e, r, t) {
  if (kt(r.enabled, e) !== !1 && fn(r.staleTime, e) !== "static") {
    const n = typeof t == "function" ? t(e) : t;
    return n === "always" || n !== !1 && ri(e, r);
  }
  return !1;
}
function $i(e, r, t, n) {
  return (e !== r || kt(n.enabled, e) === !1) && (!t.suspense || e.state.status !== "error") && ri(e, t);
}
function ri(e, r) {
  return kt(r.enabled, e) !== !1 && e.isStaleByTime(fn(r.staleTime, e));
}
function Po(e, r) {
  return !Ha(e.getCurrentResult(), r);
}
var Ea = { exports: {} }, en = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zi;
function Mo() {
  if (zi) return en;
  zi = 1;
  var e = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function t(n, a, i) {
    var s = null;
    if (i !== void 0 && (s = "" + i), a.key !== void 0 && (s = "" + a.key), "key" in a) {
      i = {};
      for (var f in a)
        f !== "key" && (i[f] = a[f]);
    } else i = a;
    return a = i.ref, {
      $$typeof: e,
      type: n,
      key: s,
      ref: a !== void 0 ? a : null,
      props: i
    };
  }
  return en.Fragment = r, en.jsx = t, en.jsxs = t, en;
}
var Xi;
function Lo() {
  return Xi || (Xi = 1, Ea.exports = Mo()), Ea.exports;
}
Lo();
const fs = window.React;
var Bo = fs.createContext(
  void 0
), bo = (e) => {
  const r = fs.useContext(Bo);
  if (e)
    return e;
  if (!r)
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  return r;
};
const os = window.React;
var ls = os.createContext(!1), Uo = () => os.useContext(ls);
ls.Provider;
const cs = window.React;
function Wo() {
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
var Ho = cs.createContext(Wo()), Go = () => cs.useContext(Ho);
const Vo = window.React;
var $o = (e, r, t) => {
  const n = t != null && t.state.error && typeof e.throwOnError == "function" ? as(e.throwOnError, [t.state.error, t]) : e.throwOnError;
  (e.suspense || e.experimental_prefetchInRender || n) && (r.isReset() || (e.retryOnMount = !1));
}, zo = (e) => {
  Vo.useEffect(() => {
    e.clearReset();
  }, [e]);
}, Xo = ({
  result: e,
  errorResetBoundary: r,
  throwOnError: t,
  query: n,
  suspense: a
}) => e.isError && !r.isReset() && !e.isFetching && n && (a && e.data === void 0 || as(t, [e.error, n])), jo = (e) => {
  if (e.suspense) {
    const t = (a) => a === "static" ? a : Math.max(a ?? 1e3, 1e3), n = e.staleTime;
    e.staleTime = typeof n == "function" ? (...a) => t(n(...a)) : t(n), typeof e.gcTime == "number" && (e.gcTime = Math.max(
      e.gcTime,
      1e3
    ));
  }
}, Yo = (e, r) => e.isLoading && e.isFetching && !r, Ko = (e, r) => (e == null ? void 0 : e.suspense) && r.isPending, ji = (e, r, t) => r.fetchOptimistic(e).catch(() => {
  t.clearReset();
});
const Nn = window.React;
function Jo(e, r, t) {
  var d, m, g, h;
  const n = Uo(), a = Go(), i = bo(t), s = i.defaultQueryOptions(e);
  (m = (d = i.getDefaultOptions().queries) == null ? void 0 : d._experimental_beforeQuery) == null || m.call(
    d,
    s
  );
  const f = i.getQueryCache().get(s.queryHash);
  s._optimisticResults = n ? "isRestoring" : "optimistic", jo(s), $o(s, a, f), zo(a);
  const l = !i.getQueryCache().get(s.queryHash), [o] = Nn.useState(
    () => new r(
      i,
      s
    )
  ), c = o.getOptimisticResult(s), u = !n && e.subscribed !== !1;
  if (Nn.useSyncExternalStore(
    Nn.useCallback(
      (_) => {
        const k = u ? o.subscribe(is.batchCalls(_)) : Wa;
        return o.updateResult(), k;
      },
      [o, u]
    ),
    () => o.getCurrentResult(),
    () => o.getCurrentResult()
  ), Nn.useEffect(() => {
    o.setOptions(s);
  }, [s, o]), Ko(s, c))
    throw ji(s, o, a);
  if (Xo({
    result: c,
    errorResetBoundary: a,
    throwOnError: s.throwOnError,
    query: f,
    suspense: s.suspense
  }))
    throw c.error;
  if ((h = (g = i.getDefaultOptions().queries) == null ? void 0 : g._experimental_afterQuery) == null || h.call(
    g,
    s,
    c
  ), s.experimental_prefetchInRender && !dn && Yo(c, n)) {
    const _ = l ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      ji(s, o, a)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      f == null ? void 0 : f.promise
    );
    _ == null || _.catch(Wa).finally(() => {
      o.updateResult();
    });
  }
  return s.notifyOnChangeProps ? c : o.trackResult(c);
}
function Qo(e, r) {
  return Jo(e, Do, r);
}
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Zo = {
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
const qo = window.React.forwardRef, Sa = window.React.createElement, St = (e, r, t, n) => {
  const a = qo(
    ({ color: i = "currentColor", size: s = 24, stroke: f = 2, title: l, className: o, children: c, ...u }, d) => Sa(
      "svg",
      {
        ref: d,
        ...Zo[e],
        width: s,
        height: s,
        className: ["tabler-icon", `tabler-icon-${r}`, o].join(" "),
        strokeWidth: f,
        stroke: i,
        ...u
      },
      [
        l && Sa("title", { key: "svg-title" }, l),
        ...n.map(([m, g]) => Sa(m, g)),
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
const el = [["path", { d: "M12 9v4", key: "svg-0" }], ["path", { d: "M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0", key: "svg-1" }], ["path", { d: "M12 16h.01", key: "svg-2" }]], zn = St("outline", "alert-triangle", "AlertTriangle", el);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tl = [["path", { d: "M17.765 17.757l-5.765 3.243l-8 -4.5v-9l2.236 -1.258m2.57 -1.445l3.194 -1.797l8 4.5v8.5", key: "svg-0" }], ["path", { d: "M14.561 10.559l5.439 -3.059", key: "svg-1" }], ["path", { d: "M12 12v9", key: "svg-2" }], ["path", { d: "M12 12l-8 -4.5", key: "svg-3" }], ["path", { d: "M3 3l18 18", key: "svg-4" }]], rl = St("outline", "box-off", "BoxOff", tl);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nl = [["path", { d: "M4 4h6v6h-6l0 -6", key: "svg-0" }], ["path", { d: "M14 4h6v6h-6l0 -6", key: "svg-1" }], ["path", { d: "M4 14h6v6h-6l0 -6", key: "svg-2" }], ["path", { d: "M14 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0", key: "svg-3" }]], hs = St("outline", "category", "Category", nl);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const al = [["path", { d: "M6 9l6 6l6 -6", key: "svg-0" }]], us = St("outline", "chevron-down", "ChevronDown", al);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const il = [["path", { d: "M9 6l6 6l-6 6", key: "svg-0" }]], xs = St("outline", "chevron-right", "ChevronRight", il);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sl = [["path", { d: "M7 7l5 5l5 -5", key: "svg-0" }], ["path", { d: "M7 13l5 5l5 -5", key: "svg-1" }]], fl = St("outline", "chevrons-down", "ChevronsDown", sl);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ol = [["path", { d: "M7 11l5 -5l5 5", key: "svg-0" }], ["path", { d: "M7 17l5 -5l5 5", key: "svg-1" }]], ll = St("outline", "chevrons-up", "ChevronsUp", ol);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cl = [["path", { d: "M14 3v4a1 1 0 0 0 1 1h4", key: "svg-0" }], ["path", { d: "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2", key: "svg-1" }], ["path", { d: "M8 11h8v7h-8l0 -7", key: "svg-2" }], ["path", { d: "M8 15h8", key: "svg-3" }], ["path", { d: "M11 11v7", key: "svg-4" }]], hl = St("outline", "file-spreadsheet", "FileSpreadsheet", cl);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ul = [["path", { d: "M9 6l11 0", key: "svg-0" }], ["path", { d: "M9 12l11 0", key: "svg-1" }], ["path", { d: "M9 18l11 0", key: "svg-2" }], ["path", { d: "M5 6l0 .01", key: "svg-3" }], ["path", { d: "M5 12l0 .01", key: "svg-4" }], ["path", { d: "M5 18l0 .01", key: "svg-5" }]], xl = St("outline", "list", "List", ul);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dl = [["path", { d: "M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0", key: "svg-0" }], ["path", { d: "M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0", key: "svg-1" }]], ds = St("outline", "map-pin", "MapPin", dl);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ml = [["path", { d: "M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", key: "svg-0" }], ["path", { d: "M21 21l-6 -6", key: "svg-1" }]], pl = St("outline", "search", "Search", ml);
/**
 * @license @tabler/icons-react v3.36.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vl = [["path", { d: "M18 6l-12 12", key: "svg-0" }], ["path", { d: "M6 6l12 12", key: "svg-1" }]], _l = St("outline", "x", "X", vl), Yi = "0.7.0";
var de = /* @__PURE__ */ ((e) => (e.api_server_info = "", e.user_list = "user/", e.user_set_password = "user/:id/set-password/", e.user_me = "user/me/", e.user_profile = "user/profile/", e.user_roles = "user/roles/", e.user_token = "user/token/", e.user_tokens = "user/tokens/", e.user_simple_login = "email/generate/", e.user_reset = "auth/v1/auth/password/request", e.user_reset_set = "auth/v1/auth/password/reset", e.auth_pwd_change = "auth/v1/account/password/change", e.auth_login = "auth/v1/auth/login", e.auth_login_2fa = "auth/v1/auth/2fa/authenticate", e.auth_session = "auth/v1/auth/session", e.auth_signup = "auth/v1/auth/signup", e.auth_authenticators = "auth/v1/account/authenticators", e.auth_recovery = "auth/v1/account/authenticators/recovery-codes", e.auth_mfa_reauthenticate = "auth/v1/auth/2fa/reauthenticate", e.auth_totp = "auth/v1/account/authenticators/totp", e.auth_trust = "auth/v1/auth/2fa/trust", e.auth_reauthenticate = "auth/v1/auth/reauthenticate", e.auth_email = "auth/v1/account/email", e.auth_email_verify = "auth/v1/auth/email/verify", e.auth_providers = "auth/v1/account/providers", e.auth_provider_redirect = "auth/v1/auth/provider/redirect", e.auth_config = "auth/v1/config", e.currency_list = "currency/exchange/", e.currency_refresh = "currency/refresh/", e.all_units = "units/all/", e.task_overview = "background-task/", e.task_pending_list = "background-task/pending/", e.task_scheduled_list = "background-task/scheduled/", e.task_failed_list = "background-task/failed/", e.api_search = "search/", e.settings_global_list = "settings/global/", e.settings_user_list = "settings/user/", e.news = "news/", e.global_status = "generic/status/", e.custom_state_list = "generic/status/custom/", e.version = "version/", e.license = "license/", e.group_list = "user/group/", e.owner_list = "user/owner/", e.ruleset_list = "user/ruleset/", e.content_type_list = "contenttype/", e.icons = "icons/", e.selectionlist_list = "selection/", e.selectionlist_detail = "selection/:id/", e.barcode = "barcode/", e.barcode_history = "barcode/history/", e.barcode_link = "barcode/link/", e.barcode_unlink = "barcode/unlink/", e.barcode_generate = "barcode/generate/", e.data_output = "data-output/", e.import_session_list = "importer/session/", e.import_session_accept_fields = "importer/session/:id/accept_fields/", e.import_session_accept_rows = "importer/session/:id/accept_rows/", e.import_session_column_mapping_list = "importer/column-mapping/", e.import_session_row_list = "importer/row/", e.notifications_list = "notifications/", e.notifications_readall = "notifications/readall/", e.build_order_list = "build/", e.build_order_issue = "build/:id/issue/", e.build_order_cancel = "build/:id/cancel/", e.build_order_hold = "build/:id/hold/", e.build_order_complete = "build/:id/finish/", e.build_output_complete = "build/:id/complete/", e.build_output_create = "build/:id/create-output/", e.build_output_scrap = "build/:id/scrap-outputs/", e.build_output_delete = "build/:id/delete-outputs/", e.build_order_auto_allocate = "build/:id/auto-allocate/", e.build_order_allocate = "build/:id/allocate/", e.build_order_consume = "build/:id/consume/", e.build_order_deallocate = "build/:id/unallocate/", e.build_line_list = "build/line/", e.build_item_list = "build/item/", e.bom_list = "bom/", e.bom_item_validate = "bom/:id/validate/", e.bom_validate = "part/:id/bom-validate/", e.bom_substitute_list = "bom/substitute/", e.part_list = "part/", e.part_parameter_list = "part/parameter/", e.part_parameter_template_list = "part/parameter/template/", e.part_thumbs_list = "part/thumbs/", e.part_pricing = "part/:id/pricing/", e.part_requirements = "part/:id/requirements/", e.part_serial_numbers = "part/:id/serial-numbers/", e.part_scheduling = "part/:id/scheduling/", e.part_pricing_internal = "part/internal-price/", e.part_pricing_sale = "part/sale-price/", e.part_stocktake_list = "part/stocktake/", e.category_list = "part/category/", e.category_tree = "part/category/tree/", e.category_parameter_list = "part/category/parameters/", e.related_part_list = "part/related/", e.part_test_template_list = "part/test-template/", e.company_list = "company/", e.contact_list = "company/contact/", e.address_list = "company/address/", e.supplier_part_list = "company/part/", e.supplier_part_pricing_list = "company/price-break/", e.manufacturer_part_list = "company/part/manufacturer/", e.manufacturer_part_parameter_list = "company/part/manufacturer/parameter/", e.stock_location_list = "stock/location/", e.stock_location_type_list = "stock/location-type/", e.stock_location_tree = "stock/location/tree/", e.stock_item_list = "stock/", e.stock_tracking_list = "stock/track/", e.stock_test_result_list = "stock/test/", e.stock_transfer = "stock/transfer/", e.stock_remove = "stock/remove/", e.stock_return = "stock/return/", e.stock_add = "stock/add/", e.stock_count = "stock/count/", e.stock_change_status = "stock/change_status/", e.stock_merge = "stock/merge/", e.stock_assign = "stock/assign/", e.stock_status = "stock/status/", e.stock_install = "stock/:id/install/", e.stock_uninstall = "stock/:id/uninstall/", e.stock_serialize = "stock/:id/serialize/", e.stock_serial_info = "stock/:id/serial-numbers/", e.generate_batch_code = "generate/batch-code/", e.generate_serial_number = "generate/serial-number/", e.purchase_order_list = "order/po/", e.purchase_order_issue = "order/po/:id/issue/", e.purchase_order_hold = "order/po/:id/hold/", e.purchase_order_cancel = "order/po/:id/cancel/", e.purchase_order_complete = "order/po/:id/complete/", e.purchase_order_line_list = "order/po-line/", e.purchase_order_extra_line_list = "order/po-extra-line/", e.purchase_order_receive = "order/po/:id/receive/", e.sales_order_list = "order/so/", e.sales_order_issue = "order/so/:id/issue/", e.sales_order_hold = "order/so/:id/hold/", e.sales_order_cancel = "order/so/:id/cancel/", e.sales_order_ship = "order/so/:id/ship/", e.sales_order_complete = "order/so/:id/complete/", e.sales_order_allocate = "order/so/:id/allocate/", e.sales_order_allocate_serials = "order/so/:id/allocate-serials/", e.sales_order_line_list = "order/so-line/", e.sales_order_extra_line_list = "order/so-extra-line/", e.sales_order_allocation_list = "order/so-allocation/", e.sales_order_shipment_list = "order/so/shipment/", e.sales_order_shipment_complete = "order/so/shipment/:id/ship/", e.return_order_list = "order/ro/", e.return_order_issue = "order/ro/:id/issue/", e.return_order_hold = "order/ro/:id/hold/", e.return_order_cancel = "order/ro/:id/cancel/", e.return_order_complete = "order/ro/:id/complete/", e.return_order_receive = "order/ro/:id/receive/", e.return_order_line_list = "order/ro-line/", e.return_order_extra_line_list = "order/ro-extra-line/", e.label_list = "label/template/", e.label_print = "label/print/", e.report_list = "report/template/", e.report_print = "report/print/", e.report_snippet = "report/snippet/", e.report_asset = "report/asset/", e.plugin_list = "plugins/", e.plugin_setting_list = "plugins/:plugin/settings/", e.plugin_user_setting_list = "plugins/:plugin/user-settings/", e.plugin_registry_status = "plugins/status/", e.plugin_install = "plugins/install/", e.plugin_reload = "plugins/reload/", e.plugin_activate = "plugins/:key/activate/", e.plugin_uninstall = "plugins/:key/uninstall/", e.plugin_admin = "plugins/:key/admin/", e.plugin_ui_features_list = "plugins/ui/features/:feature_type/", e.plugin_locate_item = "locate/", e.machine_types_list = "machine/types/", e.machine_driver_list = "machine/drivers/", e.machine_registry_status = "machine/status/", e.machine_list = "machine/", e.machine_restart = "machine/:machine/restart/", e.machine_setting_list = "machine/:machine/settings/", e.machine_setting_detail = "machine/:machine/settings/:config_type/", e.attachment_list = "attachment/", e.error_report_list = "error-report/", e.project_code_list = "project-code/", e.custom_unit_list = "units/", e.notes_image_upload = "notes-image-upload/", e.email_list = "admin/email/", e.email_test = "admin/email/test/", e.config_list = "admin/config/", e))(de || {});
window.LinguiCore.i18n;
window.LinguiCore.i18n;
de.part_list, de.part_parameter_template_list, de.part_test_template_list, de.supplier_part_list, de.manufacturer_part_list, de.category_list, de.stock_item_list, de.stock_location_list, de.stock_location_type_list, de.stock_tracking_list, de.build_order_list, de.build_line_list, de.build_item_list, de.company_list, de.project_code_list, de.purchase_order_list, de.purchase_order_line_list, de.sales_order_list, de.sales_order_shipment_list, de.return_order_list, de.return_order_line_list, de.address_list, de.contact_list, de.owner_list, de.user_list, de.group_list, de.import_session_list, de.label_list, de.report_list, de.plugin_list, de.content_type_list, de.selectionlist_list, de.error_report_list;
function gl(e) {
  var r;
  const t = ((r = e == null ? void 0 : e.version) == null ? void 0 : r.inventree) || "";
  Yi != t && console.info(`Plugin version mismatch! Expected version ${Yi}, got ${t}`);
}
var ya = { exports: {} }, tn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ki;
function wl() {
  if (Ki) return tn;
  Ki = 1;
  var e = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function t(n, a, i) {
    var s = null;
    if (i !== void 0 && (s = "" + i), a.key !== void 0 && (s = "" + a.key), "key" in a) {
      i = {};
      for (var f in a)
        f !== "key" && (i[f] = a[f]);
    } else i = a;
    return a = i.ref, {
      $$typeof: e,
      type: n,
      key: s,
      ref: a !== void 0 ? a : null,
      props: i
    };
  }
  return tn.Fragment = r, tn.jsx = t, tn.jsxs = t, tn;
}
var Ji;
function Tl() {
  return Ji || (Ji = 1, ya.exports = wl()), ya.exports;
}
Tl();
window.MantineCore.ActionIcon;
window.MantineCore.Group;
window.MantineCore.Tooltip;
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
var El = {
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
const Sl = window.React.forwardRef, Fa = window.React.createElement, ir = (e, r, t, n) => {
  const a = Sl(
    ({ color: i = "currentColor", size: s = 24, stroke: f = 2, title: l, className: o, children: c, ...u }, d) => Fa(
      "svg",
      {
        ref: d,
        ...El[e],
        width: s,
        height: s,
        className: ["tabler-icon", `tabler-icon-${r}`, o].join(" "),
        strokeWidth: f,
        stroke: i,
        ...u
      },
      [
        l && Fa("title", { key: "svg-title" }, l),
        ...n.map(([m, g]) => Fa(m, g)),
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
const yl = [["path", { d: "M12 5l0 14", key: "svg-0" }], ["path", { d: "M5 12l14 0", key: "svg-1" }]];
ir("outline", "plus", "Plus", yl);
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
const Fl = [["path", { d: "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", key: "svg-0" }], ["path", { d: "M21 21l-6 -6", key: "svg-1" }]];
ir("outline", "search", "Search", Fl);
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
const Cl = [["path", { d: "M5 12l14 0", key: "svg-0" }], ["path", { d: "M13 18l6 -6", key: "svg-1" }], ["path", { d: "M13 6l6 6", key: "svg-2" }]];
ir("outline", "arrow-right", "ArrowRight", Cl);
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Al = [["path", { d: "M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z", key: "svg-0" }], ["path", { d: "M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1", key: "svg-1" }]];
ir("outline", "copy", "Copy", Al);
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kl = [["path", { d: "M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1", key: "svg-0" }], ["path", { d: "M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z", key: "svg-1" }], ["path", { d: "M16 5l3 3", key: "svg-2" }]];
ir("outline", "edit", "Edit", kl);
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ol = [["path", { d: "M4 7l16 0", key: "svg-0" }], ["path", { d: "M10 11l0 6", key: "svg-1" }], ["path", { d: "M14 11l0 6", key: "svg-2" }], ["path", { d: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12", key: "svg-3" }], ["path", { d: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3", key: "svg-4" }]];
ir("outline", "trash", "Trash", Ol);
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rl = [["path", { d: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", key: "svg-0" }], ["path", { d: "M10 10l4 4m0 -4l-4 4", key: "svg-1" }]];
ir("outline", "circle-x", "CircleX", Rl);
/**
 * @license @tabler/icons-react v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Il = [["path", { d: "M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-0" }], ["path", { d: "M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-1" }], ["path", { d: "M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-2" }]];
ir("outline", "dots", "Dots", Il);
window.LinguiCore.i18n;
window.MantineCore.ActionIcon;
window.MantineCore.Menu;
window.MantineCore.Tooltip;
window.React.useMemo;
window.React.useState;
const Qi = window.React, Dl = window.LinguiReact.I18nProvider, Zi = window.LinguiCore.i18n;
function Nl({
  locale: e,
  children: r
}) {
  return Qi.useEffect(() => {
    Zi.activate(e);
  }, [e]), /* @__PURE__ */ Qi.createElement(Dl, { i18n: Zi }, r);
}
function ms(e) {
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
function Pl(e, r = !1) {
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
function qi(e) {
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
function ni(e) {
  let r = e.parts ? e.parts.length : 0;
  if (e.children)
    for (const t of e.children)
      r += ni(t);
  return r;
}
function Ml(e, r) {
  const t = [];
  function n(a, i) {
    for (const s of a)
      t.push(`${r}-${s.id ?? "none"}-${i}`), s.children && s.children.length > 0 && n(s.children, i + 1);
  }
  return n(e, 0), t;
}
function Ll(e, r) {
  if (!r) return e;
  const t = r.toLowerCase();
  function n(a) {
    const i = a.parts.filter(
      (f) => {
        var l, o;
        return f.name.toLowerCase().includes(t) || ((l = f.IPN) == null ? void 0 : l.toLowerCase().includes(t)) || ((o = f.description) == null ? void 0 : o.toLowerCase().includes(t));
      }
    ), s = a.children.map(n).filter((f) => f !== null);
    return i.length > 0 || s.length > 0 ? {
      ...a,
      parts: i,
      children: s
    } : null;
  }
  return e.map(n).filter((a) => a !== null);
}
function Bl(e, r) {
  if (!r) return e;
  const t = r.toLowerCase();
  return e.filter(
    (n) => {
      var a, i, s, f;
      return n.name.toLowerCase().includes(t) || ((a = n.IPN) == null ? void 0 : a.toLowerCase().includes(t)) || ((i = n.description) == null ? void 0 : i.toLowerCase().includes(t)) || ((s = n.category_name) == null ? void 0 : s.toLowerCase().includes(t)) || ((f = n.category_path) == null ? void 0 : f.toLowerCase().includes(t));
    }
  );
}
function bl(e) {
  return e.filter((r) => r.is_low_stock || (r.total_stock ?? 0) <= 0);
}
function Ul(e) {
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
/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var Xn = {};
Xn.version = "0.18.5";
var ps = 1252, Wl = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4], vs = function(e) {
  Wl.indexOf(e) != -1 && (ps = e);
};
function Hl() {
  vs(1252);
}
var mn = function(e) {
  vs(e);
};
function Gl() {
  mn(1200), Hl();
}
var Pn = function(r) {
  return String.fromCharCode(r);
}, e0 = function(r) {
  return String.fromCharCode(r);
}, jn, er = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function pn(e) {
  for (var r = "", t = 0, n = 0, a = 0, i = 0, s = 0, f = 0, l = 0, o = 0; o < e.length; )
    t = e.charCodeAt(o++), i = t >> 2, n = e.charCodeAt(o++), s = (t & 3) << 4 | n >> 4, a = e.charCodeAt(o++), f = (n & 15) << 2 | a >> 6, l = a & 63, isNaN(n) ? f = l = 64 : isNaN(a) && (l = 64), r += er.charAt(i) + er.charAt(s) + er.charAt(f) + er.charAt(l);
  return r;
}
function $t(e) {
  var r = "", t = 0, n = 0, a = 0, i = 0, s = 0, f = 0, l = 0;
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var o = 0; o < e.length; )
    i = er.indexOf(e.charAt(o++)), s = er.indexOf(e.charAt(o++)), t = i << 2 | s >> 4, r += String.fromCharCode(t), f = er.indexOf(e.charAt(o++)), n = (s & 15) << 4 | f >> 2, f !== 64 && (r += String.fromCharCode(n)), l = er.indexOf(e.charAt(o++)), a = (f & 3) << 6 | l, l !== 64 && (r += String.fromCharCode(a));
  return r;
}
var ve = /* @__PURE__ */ (function() {
  return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
})(), Xt = /* @__PURE__ */ (function() {
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
function _r(e) {
  return ve ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
function t0(e) {
  return ve ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
var Ot = function(r) {
  return ve ? Xt(r, "binary") : r.split("").map(function(t) {
    return t.charCodeAt(0) & 255;
  });
};
function fa(e) {
  if (typeof ArrayBuffer > "u") return Ot(e);
  for (var r = new ArrayBuffer(e.length), t = new Uint8Array(r), n = 0; n != e.length; ++n) t[n] = e.charCodeAt(n) & 255;
  return r;
}
function yn(e) {
  if (Array.isArray(e)) return e.map(function(n) {
    return String.fromCharCode(n);
  }).join("");
  for (var r = [], t = 0; t < e.length; ++t) r[t] = String.fromCharCode(e[t]);
  return r.join("");
}
function Vl(e) {
  if (typeof Uint8Array > "u") throw new Error("Unsupported");
  return new Uint8Array(e);
}
var Je = ve ? function(e) {
  return Buffer.concat(e.map(function(r) {
    return Buffer.isBuffer(r) ? r : Xt(r);
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
function $l(e) {
  for (var r = [], t = 0, n = e.length + 250, a = _r(e.length + 255), i = 0; i < e.length; ++i) {
    var s = e.charCodeAt(i);
    if (s < 128) a[t++] = s;
    else if (s < 2048)
      a[t++] = 192 | s >> 6 & 31, a[t++] = 128 | s & 63;
    else if (s >= 55296 && s < 57344) {
      s = (s & 1023) + 64;
      var f = e.charCodeAt(++i) & 1023;
      a[t++] = 240 | s >> 8 & 7, a[t++] = 128 | s >> 2 & 63, a[t++] = 128 | f >> 6 & 15 | (s & 3) << 4, a[t++] = 128 | f & 63;
    } else
      a[t++] = 224 | s >> 12 & 15, a[t++] = 128 | s >> 6 & 63, a[t++] = 128 | s & 63;
    t > n && (r.push(a.slice(0, t)), t = 0, a = _r(65535), n = 65530);
  }
  return r.push(a.slice(0, t)), Je(r);
}
var on = /\u0000/g, Mn = /[\u0001-\u0006]/g;
function Mr(e) {
  for (var r = "", t = e.length - 1; t >= 0; ) r += e.charAt(t--);
  return r;
}
function Rt(e, r) {
  var t = "" + e;
  return t.length >= r ? t : Pe("0", r - t.length) + t;
}
function ai(e, r) {
  var t = "" + e;
  return t.length >= r ? t : Pe(" ", r - t.length) + t;
}
function Yn(e, r) {
  var t = "" + e;
  return t.length >= r ? t : t + Pe(" ", r - t.length);
}
function zl(e, r) {
  var t = "" + Math.round(e);
  return t.length >= r ? t : Pe("0", r - t.length) + t;
}
function Xl(e, r) {
  var t = "" + e;
  return t.length >= r ? t : Pe("0", r - t.length) + t;
}
var r0 = /* @__PURE__ */ Math.pow(2, 32);
function Ar(e, r) {
  if (e > r0 || e < -r0) return zl(e, r);
  var t = Math.round(e);
  return Xl(t, r);
}
function Kn(e, r) {
  return r = r || 0, e.length >= 7 + r && (e.charCodeAt(r) | 32) === 103 && (e.charCodeAt(r + 1) | 32) === 101 && (e.charCodeAt(r + 2) | 32) === 110 && (e.charCodeAt(r + 3) | 32) === 101 && (e.charCodeAt(r + 4) | 32) === 114 && (e.charCodeAt(r + 5) | 32) === 97 && (e.charCodeAt(r + 6) | 32) === 108;
}
var n0 = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"]
], Ca = [
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
function jl(e) {
  return e || (e = {}), e[0] = "General", e[1] = "0", e[2] = "0.00", e[3] = "#,##0", e[4] = "#,##0.00", e[9] = "0%", e[10] = "0.00%", e[11] = "0.00E+00", e[12] = "# ?/?", e[13] = "# ??/??", e[14] = "m/d/yy", e[15] = "d-mmm-yy", e[16] = "d-mmm", e[17] = "mmm-yy", e[18] = "h:mm AM/PM", e[19] = "h:mm:ss AM/PM", e[20] = "h:mm", e[21] = "h:mm:ss", e[22] = "m/d/yy h:mm", e[37] = "#,##0 ;(#,##0)", e[38] = "#,##0 ;[Red](#,##0)", e[39] = "#,##0.00;(#,##0.00)", e[40] = "#,##0.00;[Red](#,##0.00)", e[45] = "mm:ss", e[46] = "[h]:mm:ss", e[47] = "mmss.0", e[48] = "##0.0E+0", e[49] = "@", e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "', e;
}
var Me = {
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
}, a0 = {
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
}, Yl = {
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
function Jn(e, r, t) {
  for (var n = e < 0 ? -1 : 1, a = e * n, i = 0, s = 1, f = 0, l = 1, o = 0, c = 0, u = Math.floor(a); o < r && (u = Math.floor(a), f = u * s + i, c = u * o + l, !(a - u < 5e-8)); )
    a = 1 / (a - u), i = s, s = f, l = o, o = c;
  if (c > r && (o > r ? (c = l, f = i) : (c = o, f = s)), !t) return [0, n * f, c];
  var d = Math.floor(n * f / c);
  return [d, n * f - d * c, c];
}
function Ln(e, r, t) {
  if (e > 2958465 || e < 0) return null;
  var n = e | 0, a = Math.floor(86400 * (e - n)), i = 0, s = [], f = { D: n, T: a, u: 86400 * (e - n) - a, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
  if (Math.abs(f.u) < 1e-6 && (f.u = 0), r && r.date1904 && (n += 1462), f.u > 0.9999 && (f.u = 0, ++a == 86400 && (f.T = a = 0, ++n, ++f.D)), n === 60)
    s = t ? [1317, 10, 29] : [1900, 2, 29], i = 3;
  else if (n === 0)
    s = t ? [1317, 8, 29] : [1900, 1, 0], i = 6;
  else {
    n > 60 && --n;
    var l = new Date(1900, 0, 1);
    l.setDate(l.getDate() + n - 1), s = [l.getFullYear(), l.getMonth() + 1, l.getDate()], i = l.getDay(), n < 60 && (i = (i + 6) % 7), t && (i = tc(l, s));
  }
  return f.y = s[0], f.m = s[1], f.d = s[2], f.S = a % 60, a = Math.floor(a / 60), f.M = a % 60, a = Math.floor(a / 60), f.H = a, f.q = i, f;
}
var _s = /* @__PURE__ */ new Date(1899, 11, 31, 0, 0, 0), Kl = /* @__PURE__ */ _s.getTime(), Jl = /* @__PURE__ */ new Date(1900, 2, 1, 0, 0, 0);
function gs(e, r) {
  var t = /* @__PURE__ */ e.getTime();
  return r ? t -= 1461 * 24 * 60 * 60 * 1e3 : e >= Jl && (t += 1440 * 60 * 1e3), (t - (Kl + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ _s.getTimezoneOffset()) * 6e4)) / (1440 * 60 * 1e3);
}
function ii(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function Ql(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function Zl(e) {
  var r = e < 0 ? 12 : 11, t = ii(e.toFixed(12));
  return t.length <= r || (t = e.toPrecision(10), t.length <= r) ? t : e.toExponential(5);
}
function ql(e) {
  var r = ii(e.toFixed(11));
  return r.length > (e < 0 ? 12 : 11) || r === "0" || r === "-0" ? e.toPrecision(6) : r;
}
function ec(e) {
  var r = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E), t;
  return r >= -4 && r <= -1 ? t = e.toPrecision(10 + r) : Math.abs(r) <= 9 ? t = Zl(e) : r === 10 ? t = e.toFixed(10).substr(0, 12) : t = ql(e), ii(Ql(t.toUpperCase()));
}
function Ja(e, r) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : ec(e);
    case "undefined":
      return "";
    case "object":
      if (e == null) return "";
      if (e instanceof Date) return rr(14, gs(e, r && r.date1904), r);
  }
  throw new Error("unsupported value in General format: " + e);
}
function tc(e, r) {
  r[0] -= 581;
  var t = e.getDay();
  return e < 60 && (t = (t + 6) % 7), t;
}
function rc(e, r, t, n) {
  var a = "", i = 0, s = 0, f = t.y, l, o = 0;
  switch (e) {
    case 98:
      f = t.y + 543;
    /* falls through */
    case 121:
      switch (r.length) {
        case 1:
        case 2:
          l = f % 100, o = 2;
          break;
        default:
          l = f % 1e4, o = 4;
          break;
      }
      break;
    case 109:
      switch (r.length) {
        case 1:
        case 2:
          l = t.m, o = r.length;
          break;
        case 3:
          return Ca[t.m - 1][1];
        case 5:
          return Ca[t.m - 1][0];
        default:
          return Ca[t.m - 1][2];
      }
      break;
    case 100:
      switch (r.length) {
        case 1:
        case 2:
          l = t.d, o = r.length;
          break;
        case 3:
          return n0[t.q][0];
        default:
          return n0[t.q][1];
      }
      break;
    case 104:
      switch (r.length) {
        case 1:
        case 2:
          l = 1 + (t.H + 11) % 12, o = r.length;
          break;
        default:
          throw "bad hour format: " + r;
      }
      break;
    case 72:
      switch (r.length) {
        case 1:
        case 2:
          l = t.H, o = r.length;
          break;
        default:
          throw "bad hour format: " + r;
      }
      break;
    case 77:
      switch (r.length) {
        case 1:
        case 2:
          l = t.M, o = r.length;
          break;
        default:
          throw "bad minute format: " + r;
      }
      break;
    case 115:
      if (r != "s" && r != "ss" && r != ".0" && r != ".00" && r != ".000") throw "bad second format: " + r;
      return t.u === 0 && (r == "s" || r == "ss") ? Rt(t.S, r.length) : (n >= 2 ? s = n === 3 ? 1e3 : 100 : s = n === 1 ? 10 : 1, i = Math.round(s * (t.S + t.u)), i >= 60 * s && (i = 0), r === "s" ? i === 0 ? "0" : "" + i / s : (a = Rt(i, 2 + n), r === "ss" ? a.substr(0, 2) : "." + a.substr(2, r.length - 1)));
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
      o = r.length === 3 ? 1 : 2;
      break;
    case 101:
      l = f, o = 1;
      break;
  }
  var c = o > 0 ? Rt(l, o) : "";
  return c;
}
function tr(e) {
  var r = 3;
  if (e.length <= r) return e;
  for (var t = e.length % r, n = e.substr(0, t); t != e.length; t += r) n += (n.length > 0 ? "," : "") + e.substr(t, r);
  return n;
}
var ws = /%/g;
function nc(e, r, t) {
  var n = r.replace(ws, ""), a = r.length - n.length;
  return Ht(e, n, t * Math.pow(10, 2 * a)) + Pe("%", a);
}
function ac(e, r, t) {
  for (var n = r.length - 1; r.charCodeAt(n - 1) === 44; ) --n;
  return Ht(e, r.substr(0, n), t / Math.pow(10, 3 * (r.length - n)));
}
function Ts(e, r) {
  var t, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (r == 0) return "0.0E+0";
    if (r < 0) return "-" + Ts(e, -r);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(r) * Math.LOG10E) % a;
    if (i < 0 && (i += a), t = (r / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), t.indexOf("e") === -1) {
      var s = Math.floor(Math.log(r) * Math.LOG10E);
      for (t.indexOf(".") === -1 ? t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + i) : t += "E+" + (s - i); t.substr(0, 2) === "0."; )
        t = t.charAt(0) + t.substr(2, a) + "." + t.substr(2 + a), t = t.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
      t = t.replace(/\+-/, "-");
    }
    t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, l, o, c) {
      return l + o + c.substr(0, (a + i) % a) + "." + c.substr(i) + "E";
    });
  } else t = r.toExponential(n);
  return e.match(/E\+00$/) && t.match(/e[+-]\d$/) && (t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1)), e.match(/E\-/) && t.match(/e\+/) && (t = t.replace(/e\+/, "e")), t.replace("e", "E");
}
var Es = /# (\?+)( ?)\/( ?)(\d+)/;
function ic(e, r, t) {
  var n = parseInt(e[4], 10), a = Math.round(r * n), i = Math.floor(a / n), s = a - i * n, f = n;
  return t + (i === 0 ? "" : "" + i) + " " + (s === 0 ? Pe(" ", e[1].length + 1 + e[4].length) : ai(s, e[1].length) + e[2] + "/" + e[3] + Rt(f, e[4].length));
}
function sc(e, r, t) {
  return t + (r === 0 ? "" : "" + r) + Pe(" ", e[1].length + 2 + e[4].length);
}
var Ss = /^#*0*\.([0#]+)/, ys = /\).*[0#]/, Fs = /\(###\) ###\\?-####/;
function it(e) {
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
function i0(e, r) {
  var t = Math.pow(10, r);
  return "" + Math.round(e * t) / t;
}
function s0(e, r) {
  var t = e - Math.floor(e), n = Math.pow(10, r);
  return r < ("" + Math.round(t * n)).length ? 0 : Math.round(t * n);
}
function fc(e, r) {
  return r < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, r))).length ? 1 : 0;
}
function oc(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function Tt(e, r, t) {
  if (e.charCodeAt(0) === 40 && !r.match(ys)) {
    var n = r.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return t >= 0 ? Tt("n", n, t) : "(" + Tt("n", n, -t) + ")";
  }
  if (r.charCodeAt(r.length - 1) === 44) return ac(e, r, t);
  if (r.indexOf("%") !== -1) return nc(e, r, t);
  if (r.indexOf("E") !== -1) return Ts(r, t);
  if (r.charCodeAt(0) === 36) return "$" + Tt(e, r.substr(r.charAt(1) == " " ? 2 : 1), t);
  var a, i, s, f, l = Math.abs(t), o = t < 0 ? "-" : "";
  if (r.match(/^00+$/)) return o + Ar(l, r.length);
  if (r.match(/^[#?]+$/))
    return a = Ar(t, 0), a === "0" && (a = ""), a.length > r.length ? a : it(r.substr(0, r.length - a.length)) + a;
  if (i = r.match(Es)) return ic(i, l, o);
  if (r.match(/^#+0+$/)) return o + Ar(l, r.length - r.indexOf("0"));
  if (i = r.match(Ss))
    return a = i0(t, i[1].length).replace(/^([^\.]+)$/, "$1." + it(i[1])).replace(/\.$/, "." + it(i[1])).replace(/\.(\d*)$/, function(g, h) {
      return "." + h + Pe("0", it(
        /*::(*/
        i[1]
      ).length - h.length);
    }), r.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (r = r.replace(/^#+([0.])/, "$1"), i = r.match(/^(0*)\.(#*)$/))
    return o + i0(l, i[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = r.match(/^#{1,3},##0(\.?)$/)) return o + tr(Ar(l, 0));
  if (i = r.match(/^#,##0\.([#0]*0)$/))
    return t < 0 ? "-" + Tt(e, r, -t) : tr("" + (Math.floor(t) + fc(t, i[1].length))) + "." + Rt(s0(t, i[1].length), i[1].length);
  if (i = r.match(/^#,#*,#0/)) return Tt(e, r.replace(/^#,#*,/, ""), t);
  if (i = r.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = Mr(Tt(e, r.replace(/[\\-]/g, ""), t)), s = 0, Mr(Mr(r.replace(/\\/g, "")).replace(/[0#]/g, function(g) {
      return s < a.length ? a.charAt(s++) : g === "0" ? "0" : "";
    }));
  if (r.match(Fs))
    return a = Tt(e, "##########", t), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var c = "";
  if (i = r.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = Jn(l, Math.pow(10, s) - 1, !1), a = "" + o, c = Ht(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), a += c + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], c = Yn(f[2], s), c.length < i[4].length && (c = it(i[4].substr(i[4].length - c.length)) + c), a += c, a;
  if (i = r.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = Jn(l, Math.pow(10, s) - 1, !0), o + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? ai(f[1], s) + i[2] + "/" + i[3] + Yn(f[2], s) : Pe(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = r.match(/^[#0?]+$/))
    return a = Ar(t, 0), r.length <= a.length ? a : it(r.substr(0, r.length - a.length)) + a;
  if (i = r.match(/^([#0?]+)\.([#0]+)$/)) {
    a = "" + t.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var u = r.indexOf(".") - s, d = r.length - a.length - u;
    return it(r.substr(0, u) + a + r.substr(r.length - d));
  }
  if (i = r.match(/^00,000\.([#0]*0)$/))
    return s = s0(t, i[1].length), t < 0 ? "-" + Tt(e, r, -t) : tr(oc(t)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(g) {
      return "00," + (g.length < 3 ? Rt(0, 3 - g.length) : "") + g;
    }) + "." + Rt(s, i[1].length);
  switch (r) {
    case "###,##0.00":
      return Tt(e, "#,##0.00", t);
    case "###,###":
    case "##,###":
    case "#,###":
      var m = tr(Ar(l, 0));
      return m !== "0" ? o + m : "";
    case "###,###.00":
      return Tt(e, "###,##0.00", t).replace(/^0\./, ".");
    case "#,###.00":
      return Tt(e, "#,##0.00", t).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + r + "|");
}
function lc(e, r, t) {
  for (var n = r.length - 1; r.charCodeAt(n - 1) === 44; ) --n;
  return Ht(e, r.substr(0, n), t / Math.pow(10, 3 * (r.length - n)));
}
function cc(e, r, t) {
  var n = r.replace(ws, ""), a = r.length - n.length;
  return Ht(e, n, t * Math.pow(10, 2 * a)) + Pe("%", a);
}
function Cs(e, r) {
  var t, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (r == 0) return "0.0E+0";
    if (r < 0) return "-" + Cs(e, -r);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(r) * Math.LOG10E) % a;
    if (i < 0 && (i += a), t = (r / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), !t.match(/[Ee]/)) {
      var s = Math.floor(Math.log(r) * Math.LOG10E);
      t.indexOf(".") === -1 ? t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + i) : t += "E+" + (s - i), t = t.replace(/\+-/, "-");
    }
    t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, l, o, c) {
      return l + o + c.substr(0, (a + i) % a) + "." + c.substr(i) + "E";
    });
  } else t = r.toExponential(n);
  return e.match(/E\+00$/) && t.match(/e[+-]\d$/) && (t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1)), e.match(/E\-/) && t.match(/e\+/) && (t = t.replace(/e\+/, "e")), t.replace("e", "E");
}
function Nt(e, r, t) {
  if (e.charCodeAt(0) === 40 && !r.match(ys)) {
    var n = r.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return t >= 0 ? Nt("n", n, t) : "(" + Nt("n", n, -t) + ")";
  }
  if (r.charCodeAt(r.length - 1) === 44) return lc(e, r, t);
  if (r.indexOf("%") !== -1) return cc(e, r, t);
  if (r.indexOf("E") !== -1) return Cs(r, t);
  if (r.charCodeAt(0) === 36) return "$" + Nt(e, r.substr(r.charAt(1) == " " ? 2 : 1), t);
  var a, i, s, f, l = Math.abs(t), o = t < 0 ? "-" : "";
  if (r.match(/^00+$/)) return o + Rt(l, r.length);
  if (r.match(/^[#?]+$/))
    return a = "" + t, t === 0 && (a = ""), a.length > r.length ? a : it(r.substr(0, r.length - a.length)) + a;
  if (i = r.match(Es)) return sc(i, l, o);
  if (r.match(/^#+0+$/)) return o + Rt(l, r.length - r.indexOf("0"));
  if (i = r.match(Ss))
    return a = ("" + t).replace(/^([^\.]+)$/, "$1." + it(i[1])).replace(/\.$/, "." + it(i[1])), a = a.replace(/\.(\d*)$/, function(g, h) {
      return "." + h + Pe("0", it(i[1]).length - h.length);
    }), r.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (r = r.replace(/^#+([0.])/, "$1"), i = r.match(/^(0*)\.(#*)$/))
    return o + ("" + l).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = r.match(/^#{1,3},##0(\.?)$/)) return o + tr("" + l);
  if (i = r.match(/^#,##0\.([#0]*0)$/))
    return t < 0 ? "-" + Nt(e, r, -t) : tr("" + t) + "." + Pe("0", i[1].length);
  if (i = r.match(/^#,#*,#0/)) return Nt(e, r.replace(/^#,#*,/, ""), t);
  if (i = r.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = Mr(Nt(e, r.replace(/[\\-]/g, ""), t)), s = 0, Mr(Mr(r.replace(/\\/g, "")).replace(/[0#]/g, function(g) {
      return s < a.length ? a.charAt(s++) : g === "0" ? "0" : "";
    }));
  if (r.match(Fs))
    return a = Nt(e, "##########", t), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var c = "";
  if (i = r.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = Jn(l, Math.pow(10, s) - 1, !1), a = "" + o, c = Ht(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), a += c + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], c = Yn(f[2], s), c.length < i[4].length && (c = it(i[4].substr(i[4].length - c.length)) + c), a += c, a;
  if (i = r.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = Jn(l, Math.pow(10, s) - 1, !0), o + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? ai(f[1], s) + i[2] + "/" + i[3] + Yn(f[2], s) : Pe(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = r.match(/^[#0?]+$/))
    return a = "" + t, r.length <= a.length ? a : it(r.substr(0, r.length - a.length)) + a;
  if (i = r.match(/^([#0]+)\.([#0]+)$/)) {
    a = "" + t.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var u = r.indexOf(".") - s, d = r.length - a.length - u;
    return it(r.substr(0, u) + a + r.substr(r.length - d));
  }
  if (i = r.match(/^00,000\.([#0]*0)$/))
    return t < 0 ? "-" + Nt(e, r, -t) : tr("" + t).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(g) {
      return "00," + (g.length < 3 ? Rt(0, 3 - g.length) : "") + g;
    }) + "." + Rt(0, i[1].length);
  switch (r) {
    case "###,###":
    case "##,###":
    case "#,###":
      var m = tr("" + l);
      return m !== "0" ? o + m : "";
    default:
      if (r.match(/\.[0#?]*$/)) return Nt(e, r.slice(0, r.lastIndexOf(".")), t) + it(r.slice(r.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + r + "|");
}
function Ht(e, r, t) {
  return (t | 0) === t ? Nt(e, r, t) : Tt(e, r, t);
}
function hc(e) {
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
var As = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function ks(e) {
  for (var r = 0, t = "", n = ""; r < e.length; )
    switch (t = e.charAt(r)) {
      case "G":
        Kn(e, r) && (r += 6), r++;
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
        if (n.match(As)) return !0;
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
function uc(e, r, t, n) {
  for (var a = [], i = "", s = 0, f = "", l = "t", o, c, u, d = "H"; s < e.length; )
    switch (f = e.charAt(s)) {
      case "G":
        if (!Kn(e, s)) throw new Error("unrecognized character " + f + " in " + e);
        a[a.length] = { t: "G", v: "General" }, s += 7;
        break;
      case '"':
        for (i = ""; (u = e.charCodeAt(++s)) !== 34 && s < e.length; ) i += String.fromCharCode(u);
        a[a.length] = { t: "t", v: i }, ++s;
        break;
      case "\\":
        var m = e.charAt(++s), g = m === "(" || m === ")" ? m : "t";
        a[a.length] = { t: g, v: m }, ++s;
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
          if (o == null && (o = Ln(r, t, e.charAt(s + 1) === "2"), o == null))
            return "";
          a[a.length] = { t: "X", v: e.substr(s, 2) }, l = f, s += 2;
          break;
        }
      /* falls through */
      case "M":
      case "D":
      case "Y":
      case "H":
      case "S":
      case "E":
        f = f.toLowerCase();
      /* falls through */
      case "m":
      case "d":
      case "y":
      case "h":
      case "s":
      case "e":
      case "g":
        if (r < 0 || o == null && (o = Ln(r, t), o == null))
          return "";
        for (i = f; ++s < e.length && e.charAt(s).toLowerCase() === f; ) i += f;
        f === "m" && l.toLowerCase() === "h" && (f = "M"), f === "h" && (f = d), a[a.length] = { t: f, v: i }, l = f;
        break;
      case "A":
      case "a":
      case "上":
        var h = { t: f, v: f };
        if (o == null && (o = Ln(r, t)), e.substr(s, 3).toUpperCase() === "A/P" ? (o != null && (h.v = o.H >= 12 ? "P" : "A"), h.t = "T", d = "h", s += 3) : e.substr(s, 5).toUpperCase() === "AM/PM" ? (o != null && (h.v = o.H >= 12 ? "PM" : "AM"), h.t = "T", s += 5, d = "h") : e.substr(s, 5).toUpperCase() === "上午/下午" ? (o != null && (h.v = o.H >= 12 ? "下午" : "上午"), h.t = "T", s += 5, d = "h") : (h.t = "t", ++s), o == null && h.t === "T") return "";
        a[a.length] = h, l = f;
        break;
      case "[":
        for (i = f; e.charAt(s++) !== "]" && s < e.length; ) i += e.charAt(s);
        if (i.slice(-1) !== "]") throw 'unterminated "[" block: |' + i + "|";
        if (i.match(As)) {
          if (o == null && (o = Ln(r, t), o == null))
            return "";
          a[a.length] = { t: "Z", v: i.toLowerCase() }, l = i.charAt(1);
        } else i.indexOf("$") > -1 && (i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$", ks(e) || (a[a.length] = { t: "t", v: i }));
        break;
      /* Numbers */
      case ".":
        if (o != null) {
          for (i = f; ++s < e.length && (f = e.charAt(s)) === "0"; ) i += f;
          a[a.length] = { t: "s", v: i };
          break;
        }
      /* falls through */
      case "0":
      case "#":
        for (i = f; ++s < e.length && "0#?.,E+-%".indexOf(f = e.charAt(s)) > -1; ) i += f;
        a[a.length] = { t: "n", v: i };
        break;
      case "?":
        for (i = f; e.charAt(++s) === f; ) i += f;
        a[a.length] = { t: f, v: i }, l = f;
        break;
      case "*":
        ++s, (e.charAt(s) == " " || e.charAt(s) == "*") && ++s;
        break;
      // **
      case "(":
      case ")":
        a[a.length] = { t: n === 1 ? "t" : f, v: f }, ++s;
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
        for (i = f; s < e.length && "0123456789".indexOf(e.charAt(++s)) > -1; ) i += e.charAt(s);
        a[a.length] = { t: "D", v: i };
        break;
      case " ":
        a[a.length] = { t: f, v: f }, ++s;
        break;
      case "$":
        a[a.length] = { t: "t", v: "$" }, ++s;
        break;
      default:
        if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(f) === -1) throw new Error("unrecognized character " + f + " in " + e);
        a[a.length] = { t: "t", v: f }, ++s;
        break;
    }
  var _ = 0, k = 0, O;
  for (s = a.length - 1, l = "t"; s >= 0; --s)
    switch (a[s].t) {
      case "h":
      case "H":
        a[s].t = d, l = "h", _ < 1 && (_ = 1);
        break;
      case "s":
        (O = a[s].v.match(/\.0+$/)) && (k = Math.max(k, O[0].length - 1)), _ < 3 && (_ = 3);
      /* falls through */
      case "d":
      case "y":
      case "M":
      case "e":
        l = a[s].t;
        break;
      case "m":
        l === "s" && (a[s].t = "M", _ < 2 && (_ = 2));
        break;
      case "X":
        break;
      case "Z":
        _ < 1 && a[s].v.match(/[Hh]/) && (_ = 1), _ < 2 && a[s].v.match(/[Mm]/) && (_ = 2), _ < 3 && a[s].v.match(/[Ss]/) && (_ = 3);
    }
  switch (_) {
    case 0:
      break;
    case 1:
      o.u >= 0.5 && (o.u = 0, ++o.S), o.S >= 60 && (o.S = 0, ++o.M), o.M >= 60 && (o.M = 0, ++o.H);
      break;
    case 2:
      o.u >= 0.5 && (o.u = 0, ++o.S), o.S >= 60 && (o.S = 0, ++o.M);
      break;
  }
  var C = "", L;
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
        a[s].v = rc(a[s].t.charCodeAt(0), a[s].v, o, k), a[s].t = "t";
        break;
      case "n":
      case "?":
        for (L = s + 1; a[L] != null && ((f = a[L].t) === "?" || f === "D" || (f === " " || f === "t") && a[L + 1] != null && (a[L + 1].t === "?" || a[L + 1].t === "t" && a[L + 1].v === "/") || a[s].t === "(" && (f === " " || f === "n" || f === ")") || f === "t" && (a[L].v === "/" || a[L].v === " " && a[L + 1] != null && a[L + 1].t == "?")); )
          a[s].v += a[L].v, a[L] = { v: "", t: ";" }, ++L;
        C += a[s].v, s = L - 1;
        break;
      case "G":
        a[s].t = "t", a[s].v = Ja(r, t);
        break;
    }
  var Y = "", q, F;
  if (C.length > 0) {
    C.charCodeAt(0) == 40 ? (q = r < 0 && C.charCodeAt(0) === 45 ? -r : r, F = Ht("n", C, q)) : (q = r < 0 && n > 1 ? -r : r, F = Ht("n", C, q), q < 0 && a[0] && a[0].t == "t" && (F = F.substr(1), a[0].v = "-" + a[0].v)), L = F.length - 1;
    var b = a.length;
    for (s = 0; s < a.length; ++s) if (a[s] != null && a[s].t != "t" && a[s].v.indexOf(".") > -1) {
      b = s;
      break;
    }
    var D = a.length;
    if (b === a.length && F.indexOf("E") === -1) {
      for (s = a.length - 1; s >= 0; --s)
        a[s] == null || "n?".indexOf(a[s].t) === -1 || (L >= a[s].v.length - 1 ? (L -= a[s].v.length, a[s].v = F.substr(L + 1, a[s].v.length)) : L < 0 ? a[s].v = "" : (a[s].v = F.substr(0, L + 1), L = -1), a[s].t = "t", D = s);
      L >= 0 && D < a.length && (a[D].v = F.substr(0, L + 1) + a[D].v);
    } else if (b !== a.length && F.indexOf("E") === -1) {
      for (L = F.indexOf(".") - 1, s = b; s >= 0; --s)
        if (!(a[s] == null || "n?".indexOf(a[s].t) === -1)) {
          for (c = a[s].v.indexOf(".") > -1 && s === b ? a[s].v.indexOf(".") - 1 : a[s].v.length - 1, Y = a[s].v.substr(c + 1); c >= 0; --c)
            L >= 0 && (a[s].v.charAt(c) === "0" || a[s].v.charAt(c) === "#") && (Y = F.charAt(L--) + Y);
          a[s].v = Y, a[s].t = "t", D = s;
        }
      for (L >= 0 && D < a.length && (a[D].v = F.substr(0, L + 1) + a[D].v), L = F.indexOf(".") + 1, s = b; s < a.length; ++s)
        if (!(a[s] == null || "n?(".indexOf(a[s].t) === -1 && s !== b)) {
          for (c = a[s].v.indexOf(".") > -1 && s === b ? a[s].v.indexOf(".") + 1 : 0, Y = a[s].v.substr(0, c); c < a[s].v.length; ++c)
            L < F.length && (Y += F.charAt(L++));
          a[s].v = Y, a[s].t = "t", D = s;
        }
    }
  }
  for (s = 0; s < a.length; ++s) a[s] != null && "n?".indexOf(a[s].t) > -1 && (q = n > 1 && r < 0 && s > 0 && a[s - 1].v === "-" ? -r : r, a[s].v = Ht(a[s].t, a[s].v, q), a[s].t = "t");
  var W = "";
  for (s = 0; s !== a.length; ++s) a[s] != null && (W += a[s].v);
  return W;
}
var f0 = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function o0(e, r) {
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
function xc(e, r) {
  var t = hc(e), n = t.length, a = t[n - 1].indexOf("@");
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
    var s = t[0].match(f0), f = t[1].match(f0);
    return o0(r, s) ? [n, t[0]] : o0(r, f) ? [n, t[1]] : [n, t[s != null && f != null ? 2 : 1]];
  }
  return [n, i];
}
function rr(e, r, t) {
  t == null && (t = {});
  var n = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && t.dateNF ? n = t.dateNF : n = e;
      break;
    case "number":
      e == 14 && t.dateNF ? n = t.dateNF : n = (t.table != null ? t.table : Me)[e], n == null && (n = t.table && t.table[a0[e]] || Me[a0[e]]), n == null && (n = Yl[e] || "General");
      break;
  }
  if (Kn(n, 0)) return Ja(r, t);
  r instanceof Date && (r = gs(r, t.date1904));
  var a = xc(n, r);
  if (Kn(a[1])) return Ja(r, t);
  if (r === !0) r = "TRUE";
  else if (r === !1) r = "FALSE";
  else if (r === "" || r == null) return "";
  return uc(a[1], r, t, a[0]);
}
function Os(e, r) {
  if (typeof r != "number") {
    r = +r || -1;
    for (var t = 0; t < 392; ++t) {
      if (Me[t] == null) {
        r < 0 && (r = t);
        continue;
      }
      if (Me[t] == e) {
        r = t;
        break;
      }
    }
    r < 0 && (r = 391);
  }
  return Me[r] = e, r;
}
function oa(e) {
  for (var r = 0; r != 392; ++r)
    e[r] !== void 0 && Os(e[r], r);
}
function la() {
  Me = jl();
}
var Rs = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function dc(e) {
  var r = typeof e == "number" ? Me[e] : e;
  return r = r.replace(Rs, "(\\d+)"), new RegExp("^" + r + "$");
}
function mc(e, r, t) {
  var n = -1, a = -1, i = -1, s = -1, f = -1, l = -1;
  (r.match(Rs) || []).forEach(function(u, d) {
    var m = parseInt(t[d + 1], 10);
    switch (u.toLowerCase().charAt(0)) {
      case "y":
        n = m;
        break;
      case "d":
        i = m;
        break;
      case "h":
        s = m;
        break;
      case "s":
        l = m;
        break;
      case "m":
        s >= 0 ? f = m : a = m;
        break;
    }
  }), l >= 0 && f == -1 && a >= 0 && (f = a, a = -1);
  var o = ("" + (n >= 0 ? n : (/* @__PURE__ */ new Date()).getFullYear())).slice(-4) + "-" + ("00" + (a >= 1 ? a : 1)).slice(-2) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2);
  o.length == 7 && (o = "0" + o), o.length == 8 && (o = "20" + o);
  var c = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (f >= 0 ? f : 0)).slice(-2) + ":" + ("00" + (l >= 0 ? l : 0)).slice(-2);
  return s == -1 && f == -1 && l == -1 ? o : n == -1 && a == -1 && i == -1 ? c : o + "T" + c;
}
var pc = /* @__PURE__ */ (function() {
  var e = {};
  e.version = "1.2.0";
  function r() {
    for (var F = 0, b = new Array(256), D = 0; D != 256; ++D)
      F = D, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, F = F & 1 ? -306674912 ^ F >>> 1 : F >>> 1, b[D] = F;
    return typeof Int32Array < "u" ? new Int32Array(b) : b;
  }
  var t = r();
  function n(F) {
    var b = 0, D = 0, W = 0, V = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
    for (W = 0; W != 256; ++W) V[W] = F[W];
    for (W = 0; W != 256; ++W)
      for (D = F[W], b = 256 + W; b < 4096; b += 256) D = V[b] = D >>> 8 ^ F[D & 255];
    var z = [];
    for (W = 1; W != 16; ++W) z[W - 1] = typeof Int32Array < "u" ? V.subarray(W * 256, W * 256 + 256) : V.slice(W * 256, W * 256 + 256);
    return z;
  }
  var a = n(t), i = a[0], s = a[1], f = a[2], l = a[3], o = a[4], c = a[5], u = a[6], d = a[7], m = a[8], g = a[9], h = a[10], _ = a[11], k = a[12], O = a[13], C = a[14];
  function L(F, b) {
    for (var D = b ^ -1, W = 0, V = F.length; W < V; ) D = D >>> 8 ^ t[(D ^ F.charCodeAt(W++)) & 255];
    return ~D;
  }
  function Y(F, b) {
    for (var D = b ^ -1, W = F.length - 15, V = 0; V < W; ) D = C[F[V++] ^ D & 255] ^ O[F[V++] ^ D >> 8 & 255] ^ k[F[V++] ^ D >> 16 & 255] ^ _[F[V++] ^ D >>> 24] ^ h[F[V++]] ^ g[F[V++]] ^ m[F[V++]] ^ d[F[V++]] ^ u[F[V++]] ^ c[F[V++]] ^ o[F[V++]] ^ l[F[V++]] ^ f[F[V++]] ^ s[F[V++]] ^ i[F[V++]] ^ t[F[V++]];
    for (W += 15; V < W; ) D = D >>> 8 ^ t[(D ^ F[V++]) & 255];
    return ~D;
  }
  function q(F, b) {
    for (var D = b ^ -1, W = 0, V = F.length, z = 0, ee = 0; W < V; )
      z = F.charCodeAt(W++), z < 128 ? D = D >>> 8 ^ t[(D ^ z) & 255] : z < 2048 ? (D = D >>> 8 ^ t[(D ^ (192 | z >> 6 & 31)) & 255], D = D >>> 8 ^ t[(D ^ (128 | z & 63)) & 255]) : z >= 55296 && z < 57344 ? (z = (z & 1023) + 64, ee = F.charCodeAt(W++) & 1023, D = D >>> 8 ^ t[(D ^ (240 | z >> 8 & 7)) & 255], D = D >>> 8 ^ t[(D ^ (128 | z >> 2 & 63)) & 255], D = D >>> 8 ^ t[(D ^ (128 | ee >> 6 & 15 | (z & 3) << 4)) & 255], D = D >>> 8 ^ t[(D ^ (128 | ee & 63)) & 255]) : (D = D >>> 8 ^ t[(D ^ (224 | z >> 12 & 15)) & 255], D = D >>> 8 ^ t[(D ^ (128 | z >> 6 & 63)) & 255], D = D >>> 8 ^ t[(D ^ (128 | z & 63)) & 255]);
    return ~D;
  }
  return e.table = t, e.bstr = L, e.buf = Y, e.str = q, e;
})(), Ce = /* @__PURE__ */ (function() {
  var r = {};
  r.version = "1.2.1";
  function t(x, w) {
    for (var p = x.split("/"), v = w.split("/"), T = 0, E = 0, I = Math.min(p.length, v.length); T < I; ++T) {
      if (E = p[T].length - v[T].length) return E;
      if (p[T] != v[T]) return p[T] < v[T] ? -1 : 1;
    }
    return p.length - v.length;
  }
  function n(x) {
    if (x.charAt(x.length - 1) == "/") return x.slice(0, -1).indexOf("/") === -1 ? x : n(x.slice(0, -1));
    var w = x.lastIndexOf("/");
    return w === -1 ? x : x.slice(0, w + 1);
  }
  function a(x) {
    if (x.charAt(x.length - 1) == "/") return a(x.slice(0, -1));
    var w = x.lastIndexOf("/");
    return w === -1 ? x : x.slice(w + 1);
  }
  function i(x, w) {
    typeof w == "string" && (w = new Date(w));
    var p = w.getHours();
    p = p << 6 | w.getMinutes(), p = p << 5 | w.getSeconds() >>> 1, x.write_shift(2, p);
    var v = w.getFullYear() - 1980;
    v = v << 4 | w.getMonth() + 1, v = v << 5 | w.getDate(), x.write_shift(2, v);
  }
  function s(x) {
    var w = x.read_shift(2) & 65535, p = x.read_shift(2) & 65535, v = /* @__PURE__ */ new Date(), T = p & 31;
    p >>>= 5;
    var E = p & 15;
    p >>>= 4, v.setMilliseconds(0), v.setFullYear(p + 1980), v.setMonth(E - 1), v.setDate(T);
    var I = w & 31;
    w >>>= 5;
    var U = w & 63;
    return w >>>= 6, v.setHours(w), v.setMinutes(U), v.setSeconds(I << 1), v;
  }
  function f(x) {
    dt(x, 0);
    for (var w = (
      /*::(*/
      {}
    ), p = 0; x.l <= x.length - 4; ) {
      var v = x.read_shift(2), T = x.read_shift(2), E = x.l + T, I = {};
      switch (v) {
        /* UNIX-style Timestamps */
        case 21589:
          p = x.read_shift(1), p & 1 && (I.mtime = x.read_shift(4)), T > 5 && (p & 2 && (I.atime = x.read_shift(4)), p & 4 && (I.ctime = x.read_shift(4))), I.mtime && (I.mt = new Date(I.mtime * 1e3));
          break;
      }
      x.l = E, w[v] = I;
    }
    return w;
  }
  var l;
  function o() {
    return l || (l = {});
  }
  function c(x, w) {
    if (x[0] == 80 && x[1] == 75) return Pi(x, w);
    if ((x[0] | 32) == 109 && (x[1] | 32) == 105) return co(x, w);
    if (x.length < 512) throw new Error("CFB file size " + x.length + " < 512");
    var p = 3, v = 512, T = 0, E = 0, I = 0, U = 0, R = 0, N = [], P = (
      /*::(*/
      x.slice(0, 512)
    );
    dt(P, 0);
    var j = u(P);
    switch (p = j[0], p) {
      case 3:
        v = 512;
        break;
      case 4:
        v = 4096;
        break;
      case 0:
        if (j[1] == 0) return Pi(x, w);
      /* falls through */
      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + p);
    }
    v !== 512 && (P = /*::(*/
    x.slice(0, v), dt(
      P,
      28
      /* blob.l */
    ));
    var Z = x.slice(0, v);
    d(P, p);
    var ne = P.read_shift(4, "i");
    if (p === 3 && ne !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + ne);
    P.l += 4, I = P.read_shift(4, "i"), P.l += 4, P.chk("00100000", "Mini Stream Cutoff Size: "), U = P.read_shift(4, "i"), T = P.read_shift(4, "i"), R = P.read_shift(4, "i"), E = P.read_shift(4, "i");
    for (var K = -1, re = 0; re < 109 && (K = P.read_shift(4, "i"), !(K < 0)); ++re)
      N[re] = K;
    var le = m(x, v);
    _(R, E, le, v, N);
    var Ie = O(le, I, N, v);
    Ie[I].name = "!Directory", T > 0 && U !== ee && (Ie[U].name = "!MiniFAT"), Ie[N[0]].name = "!FAT", Ie.fat_addrs = N, Ie.ssz = v;
    var De = {}, et = [], Qr = [], Zr = [];
    C(I, Ie, le, et, T, De, Qr, U), g(Qr, Zr, et), et.shift();
    var qr = {
      FileIndex: Qr,
      FullPaths: Zr
    };
    return w && w.raw && (qr.raw = { header: Z, sectors: le }), qr;
  }
  function u(x) {
    if (x[x.l] == 80 && x[x.l + 1] == 75) return [0, 0];
    x.chk(Fe, "Header Signature: "), x.l += 16;
    var w = x.read_shift(2, "u");
    return [x.read_shift(2, "u"), w];
  }
  function d(x, w) {
    var p = 9;
    switch (x.l += 2, p = x.read_shift(2)) {
      case 9:
        if (w != 3) throw new Error("Sector Shift: Expected 9 saw " + p);
        break;
      case 12:
        if (w != 4) throw new Error("Sector Shift: Expected 12 saw " + p);
        break;
      default:
        throw new Error("Sector Shift: Expected 9 or 12 saw " + p);
    }
    x.chk("0600", "Mini Sector Shift: "), x.chk("000000000000", "Reserved: ");
  }
  function m(x, w) {
    for (var p = Math.ceil(x.length / w) - 1, v = [], T = 1; T < p; ++T) v[T - 1] = x.slice(T * w, (T + 1) * w);
    return v[p - 1] = x.slice(p * w), v;
  }
  function g(x, w, p) {
    for (var v = 0, T = 0, E = 0, I = 0, U = 0, R = p.length, N = [], P = []; v < R; ++v)
      N[v] = P[v] = v, w[v] = p[v];
    for (; U < P.length; ++U)
      v = P[U], T = x[v].L, E = x[v].R, I = x[v].C, N[v] === v && (T !== -1 && N[T] !== T && (N[v] = N[T]), E !== -1 && N[E] !== E && (N[v] = N[E])), I !== -1 && (N[I] = v), T !== -1 && v != N[v] && (N[T] = N[v], P.lastIndexOf(T) < U && P.push(T)), E !== -1 && v != N[v] && (N[E] = N[v], P.lastIndexOf(E) < U && P.push(E));
    for (v = 1; v < R; ++v) N[v] === v && (E !== -1 && N[E] !== E ? N[v] = N[E] : T !== -1 && N[T] !== T && (N[v] = N[T]));
    for (v = 1; v < R; ++v)
      if (x[v].type !== 0) {
        if (U = v, U != N[U]) do
          U = N[U], w[v] = w[U] + "/" + w[v];
        while (U !== 0 && N[U] !== -1 && U != N[U]);
        N[v] = -1;
      }
    for (w[0] += "/", v = 1; v < R; ++v)
      x[v].type !== 2 && (w[v] += "/");
  }
  function h(x, w, p) {
    for (var v = x.start, T = x.size, E = [], I = v; p && T > 0 && I >= 0; )
      E.push(w.slice(I * z, I * z + z)), T -= z, I = ur(p, I * 4);
    return E.length === 0 ? B(0) : Je(E).slice(0, x.size);
  }
  function _(x, w, p, v, T) {
    var E = ee;
    if (x === ee) {
      if (w !== 0) throw new Error("DIFAT chain shorter than expected");
    } else if (x !== -1) {
      var I = p[x], U = (v >>> 2) - 1;
      if (!I) return;
      for (var R = 0; R < U && (E = ur(I, R * 4)) !== ee; ++R)
        T.push(E);
      _(ur(I, v - 4), w - 1, p, v, T);
    }
  }
  function k(x, w, p, v, T) {
    var E = [], I = [];
    T || (T = []);
    var U = v - 1, R = 0, N = 0;
    for (R = w; R >= 0; ) {
      T[R] = !0, E[E.length] = R, I.push(x[R]);
      var P = p[Math.floor(R * 4 / v)];
      if (N = R * 4 & U, v < 4 + N) throw new Error("FAT boundary crossed: " + R + " 4 " + v);
      if (!x[P]) break;
      R = ur(x[P], N);
    }
    return { nodes: E, data: p0([I]) };
  }
  function O(x, w, p, v) {
    var T = x.length, E = [], I = [], U = [], R = [], N = v - 1, P = 0, j = 0, Z = 0, ne = 0;
    for (P = 0; P < T; ++P)
      if (U = [], Z = P + w, Z >= T && (Z -= T), !I[Z]) {
        R = [];
        var K = [];
        for (j = Z; j >= 0; ) {
          K[j] = !0, I[j] = !0, U[U.length] = j, R.push(x[j]);
          var re = p[Math.floor(j * 4 / v)];
          if (ne = j * 4 & N, v < 4 + ne) throw new Error("FAT boundary crossed: " + j + " 4 " + v);
          if (!x[re] || (j = ur(x[re], ne), K[j])) break;
        }
        E[Z] = { nodes: U, data: p0([R]) };
      }
    return E;
  }
  function C(x, w, p, v, T, E, I, U) {
    for (var R = 0, N = v.length ? 2 : 0, P = w[x].data, j = 0, Z = 0, ne; j < P.length; j += 128) {
      var K = (
        /*::(*/
        P.slice(j, j + 128)
      );
      dt(K, 64), Z = K.read_shift(2), ne = ci(K, 0, Z - N), v.push(ne);
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
      }, le = K.read_shift(2) + K.read_shift(2) + K.read_shift(2) + K.read_shift(2);
      le !== 0 && (re.ct = L(K, K.l - 8));
      var Ie = K.read_shift(2) + K.read_shift(2) + K.read_shift(2) + K.read_shift(2);
      Ie !== 0 && (re.mt = L(K, K.l - 8)), re.start = K.read_shift(4, "i"), re.size = K.read_shift(4, "i"), re.size < 0 && re.start < 0 && (re.size = re.type = 0, re.start = ee, re.name = ""), re.type === 5 ? (R = re.start, T > 0 && R !== ee && (w[R].name = "!StreamData")) : re.size >= 4096 ? (re.storage = "fat", w[re.start] === void 0 && (w[re.start] = k(p, re.start, w.fat_addrs, w.ssz)), w[re.start].name = re.name, re.content = w[re.start].data.slice(0, re.size)) : (re.storage = "minifat", re.size < 0 ? re.size = 0 : R !== ee && re.start !== ee && w[R] && (re.content = h(re, w[R].data, (w[U] || {}).data))), re.content && dt(re.content, 0), E[ne] = re, I.push(re);
    }
  }
  function L(x, w) {
    return new Date((pt(x, w + 4) / 1e7 * Math.pow(2, 32) + pt(x, w) / 1e7 - 11644473600) * 1e3);
  }
  function Y(x, w) {
    return o(), c(l.readFileSync(x), w);
  }
  function q(x, w) {
    var p = w && w.type;
    switch (p || ve && Buffer.isBuffer(x) && (p = "buffer"), p || "base64") {
      case "file":
        return Y(x, w);
      case "base64":
        return c(Ot($t(x)), w);
      case "binary":
        return c(Ot(x), w);
    }
    return c(
      /*::typeof blob == 'string' ? new Buffer(blob, 'utf-8') : */
      x,
      w
    );
  }
  function F(x, w) {
    var p = w || {}, v = p.root || "Root Entry";
    if (x.FullPaths || (x.FullPaths = []), x.FileIndex || (x.FileIndex = []), x.FullPaths.length !== x.FileIndex.length) throw new Error("inconsistent CFB structure");
    x.FullPaths.length === 0 && (x.FullPaths[0] = v + "/", x.FileIndex[0] = { name: v, type: 5 }), p.CLSID && (x.FileIndex[0].clsid = p.CLSID), b(x);
  }
  function b(x) {
    var w = "Sh33tJ5";
    if (!Ce.find(x, "/" + w)) {
      var p = B(4);
      p[0] = 55, p[1] = p[3] = 50, p[2] = 54, x.FileIndex.push({ name: w, type: 2, content: p, size: 4, L: 69, R: 69, C: 69 }), x.FullPaths.push(x.FullPaths[0] + w), D(x);
    }
  }
  function D(x, w) {
    F(x);
    for (var p = !1, v = !1, T = x.FullPaths.length - 1; T >= 0; --T) {
      var E = x.FileIndex[T];
      switch (E.type) {
        case 0:
          v ? p = !0 : (x.FileIndex.pop(), x.FullPaths.pop());
          break;
        case 1:
        case 2:
        case 5:
          v = !0, isNaN(E.R * E.L * E.C) && (p = !0), E.R > -1 && E.L > -1 && E.R == E.L && (p = !0);
          break;
        default:
          p = !0;
          break;
      }
    }
    if (!(!p && !w)) {
      var I = new Date(1987, 1, 19), U = 0, R = Object.create ? /* @__PURE__ */ Object.create(null) : {}, N = [];
      for (T = 0; T < x.FullPaths.length; ++T)
        R[x.FullPaths[T]] = !0, x.FileIndex[T].type !== 0 && N.push([x.FullPaths[T], x.FileIndex[T]]);
      for (T = 0; T < N.length; ++T) {
        var P = n(N[T][0]);
        v = R[P], v || (N.push([P, {
          name: a(P).replace("/", ""),
          type: 1,
          clsid: je,
          ct: I,
          mt: I,
          content: null
        }]), R[P] = !0);
      }
      for (N.sort(function(ne, K) {
        return t(ne[0], K[0]);
      }), x.FullPaths = [], x.FileIndex = [], T = 0; T < N.length; ++T)
        x.FullPaths[T] = N[T][0], x.FileIndex[T] = N[T][1];
      for (T = 0; T < N.length; ++T) {
        var j = x.FileIndex[T], Z = x.FullPaths[T];
        if (j.name = a(Z).replace("/", ""), j.L = j.R = j.C = -(j.color = 1), j.size = j.content ? j.content.length : 0, j.start = 0, j.clsid = j.clsid || je, T === 0)
          j.C = N.length > 1 ? 1 : -1, j.size = 0, j.type = 5;
        else if (Z.slice(-1) == "/") {
          for (U = T + 1; U < N.length && n(x.FullPaths[U]) != Z; ++U) ;
          for (j.C = U >= N.length ? -1 : U, U = T + 1; U < N.length && n(x.FullPaths[U]) != n(Z); ++U) ;
          j.R = U >= N.length ? -1 : U, j.type = 1;
        } else
          n(x.FullPaths[T + 1] || "") == n(Z) && (j.R = T + 1), j.type = 2;
      }
    }
  }
  function W(x, w) {
    var p = w || {};
    if (p.fileType == "mad") return ho(x, p);
    switch (D(x), p.fileType) {
      case "zip":
        return ao(x, p);
    }
    var v = (function(ne) {
      for (var K = 0, re = 0, le = 0; le < ne.FileIndex.length; ++le) {
        var Ie = ne.FileIndex[le];
        if (Ie.content) {
          var De = Ie.content.length;
          De > 0 && (De < 4096 ? K += De + 63 >> 6 : re += De + 511 >> 9);
        }
      }
      for (var et = ne.FullPaths.length + 3 >> 2, Qr = K + 7 >> 3, Zr = K + 127 >> 7, qr = Qr + re + et + Zr, lr = qr + 127 >> 7, ga = lr <= 109 ? 0 : Math.ceil((lr - 109) / 127); qr + lr + ga + 127 >> 7 > lr; ) ga = ++lr <= 109 ? 0 : Math.ceil((lr - 109) / 127);
      var bt = [1, ga, lr, Zr, et, re, K, 0];
      return ne.FileIndex[0].size = K << 6, bt[7] = (ne.FileIndex[0].start = bt[0] + bt[1] + bt[2] + bt[3] + bt[4] + bt[5]) + (bt[6] + 7 >> 3), bt;
    })(x), T = B(v[7] << 9), E = 0, I = 0;
    {
      for (E = 0; E < 8; ++E) T.write_shift(1, ce[E]);
      for (E = 0; E < 8; ++E) T.write_shift(2, 0);
      for (T.write_shift(2, 62), T.write_shift(2, 3), T.write_shift(2, 65534), T.write_shift(2, 9), T.write_shift(2, 6), E = 0; E < 3; ++E) T.write_shift(2, 0);
      for (T.write_shift(4, 0), T.write_shift(4, v[2]), T.write_shift(4, v[0] + v[1] + v[2] + v[3] - 1), T.write_shift(4, 0), T.write_shift(4, 4096), T.write_shift(4, v[3] ? v[0] + v[1] + v[2] - 1 : ee), T.write_shift(4, v[3]), T.write_shift(-4, v[1] ? v[0] - 1 : ee), T.write_shift(4, v[1]), E = 0; E < 109; ++E) T.write_shift(-4, E < v[2] ? v[1] + E : -1);
    }
    if (v[1])
      for (I = 0; I < v[1]; ++I) {
        for (; E < 236 + I * 127; ++E) T.write_shift(-4, E < v[2] ? v[1] + E : -1);
        T.write_shift(-4, I === v[1] - 1 ? ee : I + 1);
      }
    var U = function(ne) {
      for (I += ne; E < I - 1; ++E) T.write_shift(-4, E + 1);
      ne && (++E, T.write_shift(-4, ee));
    };
    for (I = E = 0, I += v[1]; E < I; ++E) T.write_shift(-4, Le.DIFSECT);
    for (I += v[2]; E < I; ++E) T.write_shift(-4, Le.FATSECT);
    U(v[3]), U(v[4]);
    for (var R = 0, N = 0, P = x.FileIndex[0]; R < x.FileIndex.length; ++R)
      P = x.FileIndex[R], P.content && (N = P.content.length, !(N < 4096) && (P.start = I, U(N + 511 >> 9)));
    for (U(v[6] + 7 >> 3); T.l & 511; ) T.write_shift(-4, Le.ENDOFCHAIN);
    for (I = E = 0, R = 0; R < x.FileIndex.length; ++R)
      P = x.FileIndex[R], P.content && (N = P.content.length, !(!N || N >= 4096) && (P.start = I, U(N + 63 >> 6)));
    for (; T.l & 511; ) T.write_shift(-4, Le.ENDOFCHAIN);
    for (E = 0; E < v[4] << 2; ++E) {
      var j = x.FullPaths[E];
      if (!j || j.length === 0) {
        for (R = 0; R < 17; ++R) T.write_shift(4, 0);
        for (R = 0; R < 3; ++R) T.write_shift(4, -1);
        for (R = 0; R < 12; ++R) T.write_shift(4, 0);
        continue;
      }
      P = x.FileIndex[E], E === 0 && (P.start = P.size ? P.start - 1 : ee);
      var Z = E === 0 && p.root || P.name;
      if (N = 2 * (Z.length + 1), T.write_shift(64, Z, "utf16le"), T.write_shift(2, N), T.write_shift(1, P.type), T.write_shift(1, P.color), T.write_shift(-4, P.L), T.write_shift(-4, P.R), T.write_shift(-4, P.C), P.clsid) T.write_shift(16, P.clsid, "hex");
      else for (R = 0; R < 4; ++R) T.write_shift(4, 0);
      T.write_shift(4, P.state || 0), T.write_shift(4, 0), T.write_shift(4, 0), T.write_shift(4, 0), T.write_shift(4, 0), T.write_shift(4, P.start), T.write_shift(4, P.size), T.write_shift(4, 0);
    }
    for (E = 1; E < x.FileIndex.length; ++E)
      if (P = x.FileIndex[E], P.size >= 4096)
        if (T.l = P.start + 1 << 9, ve && Buffer.isBuffer(P.content))
          P.content.copy(T, T.l, 0, P.size), T.l += P.size + 511 & -512;
        else {
          for (R = 0; R < P.size; ++R) T.write_shift(1, P.content[R]);
          for (; R & 511; ++R) T.write_shift(1, 0);
        }
    for (E = 1; E < x.FileIndex.length; ++E)
      if (P = x.FileIndex[E], P.size > 0 && P.size < 4096)
        if (ve && Buffer.isBuffer(P.content))
          P.content.copy(T, T.l, 0, P.size), T.l += P.size + 63 & -64;
        else {
          for (R = 0; R < P.size; ++R) T.write_shift(1, P.content[R]);
          for (; R & 63; ++R) T.write_shift(1, 0);
        }
    if (ve)
      T.l = T.length;
    else
      for (; T.l < T.length; ) T.write_shift(1, 0);
    return T;
  }
  function V(x, w) {
    var p = x.FullPaths.map(function(R) {
      return R.toUpperCase();
    }), v = p.map(function(R) {
      var N = R.split("/");
      return N[N.length - (R.slice(-1) == "/" ? 2 : 1)];
    }), T = !1;
    w.charCodeAt(0) === 47 ? (T = !0, w = p[0].slice(0, -1) + w) : T = w.indexOf("/") !== -1;
    var E = w.toUpperCase(), I = T === !0 ? p.indexOf(E) : v.indexOf(E);
    if (I !== -1) return x.FileIndex[I];
    var U = !E.match(Mn);
    for (E = E.replace(on, ""), U && (E = E.replace(Mn, "!")), I = 0; I < p.length; ++I)
      if ((U ? p[I].replace(Mn, "!") : p[I]).replace(on, "") == E || (U ? v[I].replace(Mn, "!") : v[I]).replace(on, "") == E) return x.FileIndex[I];
    return null;
  }
  var z = 64, ee = -2, Fe = "d0cf11e0a1b11ae1", ce = [208, 207, 17, 224, 161, 177, 26, 225], je = "00000000000000000000000000000000", Le = {
    /* 2.1 Compund File Sector Numbers and Types */
    MAXREGSECT: -6,
    DIFSECT: -4,
    FATSECT: -3,
    ENDOFCHAIN: ee,
    FREESECT: -1,
    /* 2.2 Compound File Header */
    HEADER_SIGNATURE: Fe,
    HEADER_MINOR_VERSION: "3e00",
    MAXREGSID: -6,
    NOSTREAM: -1,
    HEADER_CLSID: je,
    /* 2.6.1 Compound File Directory Entry */
    EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
  };
  function Ft(x, w, p) {
    o();
    var v = W(x, p);
    l.writeFileSync(w, v);
  }
  function Ve(x) {
    for (var w = new Array(x.length), p = 0; p < x.length; ++p) w[p] = String.fromCharCode(x[p]);
    return w.join("");
  }
  function _t(x, w) {
    var p = W(x, w);
    switch (w && w.type || "buffer") {
      case "file":
        return o(), l.writeFileSync(w.filename, p), p;
      case "binary":
        return typeof p == "string" ? p : Ve(p);
      case "base64":
        return pn(typeof p == "string" ? p : Ve(p));
      case "buffer":
        if (ve) return Buffer.isBuffer(p) ? p : Xt(p);
      /* falls through */
      case "array":
        return typeof p == "string" ? Ot(p) : p;
    }
    return p;
  }
  var ut;
  function S(x) {
    try {
      var w = x.InflateRaw, p = new w();
      if (p._processChunk(new Uint8Array([3, 0]), p._finishFlushFlag), p.bytesRead) ut = x;
      else throw new Error("zlib does not expose bytesRead");
    } catch (v) {
      console.error("cannot use native zlib: " + (v.message || v));
    }
  }
  function M(x, w) {
    if (!ut) return Di(x, w);
    var p = ut.InflateRaw, v = new p(), T = v._processChunk(x.slice(x.l), v._finishFlushFlag);
    return x.l += v.bytesRead, T;
  }
  function A(x) {
    return ut ? ut.deflateRawSync(x) : Ci(x);
  }
  var y = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], G = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], se = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  function fe(x) {
    var w = (x << 1 | x << 11) & 139536 | (x << 5 | x << 15) & 558144;
    return (w >> 16 | w >> 8 | w) & 255;
  }
  for (var ie = typeof Uint8Array < "u", te = ie ? new Uint8Array(256) : [], Ae = 0; Ae < 256; ++Ae) te[Ae] = fe(Ae);
  function me(x, w) {
    var p = te[x & 255];
    return w <= 8 ? p >>> 8 - w : (p = p << 8 | te[x >> 8 & 255], w <= 16 ? p >>> 16 - w : (p = p << 8 | te[x >> 16 & 255], p >>> 24 - w));
  }
  function nt(x, w) {
    var p = w & 7, v = w >>> 3;
    return (x[v] | (p <= 6 ? 0 : x[v + 1] << 8)) >>> p & 3;
  }
  function _e(x, w) {
    var p = w & 7, v = w >>> 3;
    return (x[v] | (p <= 5 ? 0 : x[v + 1] << 8)) >>> p & 7;
  }
  function Lt(x, w) {
    var p = w & 7, v = w >>> 3;
    return (x[v] | (p <= 4 ? 0 : x[v + 1] << 8)) >>> p & 15;
  }
  function Ne(x, w) {
    var p = w & 7, v = w >>> 3;
    return (x[v] | (p <= 3 ? 0 : x[v + 1] << 8)) >>> p & 31;
  }
  function ae(x, w) {
    var p = w & 7, v = w >>> 3;
    return (x[v] | (p <= 1 ? 0 : x[v + 1] << 8)) >>> p & 127;
  }
  function gt(x, w, p) {
    var v = w & 7, T = w >>> 3, E = (1 << p) - 1, I = x[T] >>> v;
    return p < 8 - v || (I |= x[T + 1] << 8 - v, p < 16 - v) || (I |= x[T + 2] << 16 - v, p < 24 - v) || (I |= x[T + 3] << 24 - v), I & E;
  }
  function Bt(x, w, p) {
    var v = w & 7, T = w >>> 3;
    return v <= 5 ? x[T] |= (p & 7) << v : (x[T] |= p << v & 255, x[T + 1] = (p & 7) >> 8 - v), w + 3;
  }
  function fr(x, w, p) {
    var v = w & 7, T = w >>> 3;
    return p = (p & 1) << v, x[T] |= p, w + 1;
  }
  function Cr(x, w, p) {
    var v = w & 7, T = w >>> 3;
    return p <<= v, x[T] |= p & 255, p >>>= 8, x[T + 1] = p, w + 8;
  }
  function Fi(x, w, p) {
    var v = w & 7, T = w >>> 3;
    return p <<= v, x[T] |= p & 255, p >>>= 8, x[T + 1] = p & 255, x[T + 2] = p >>> 8, w + 16;
  }
  function ma(x, w) {
    var p = x.length, v = 2 * p > w ? 2 * p : w + 5, T = 0;
    if (p >= w) return x;
    if (ve) {
      var E = t0(v);
      if (x.copy) x.copy(E);
      else for (; T < x.length; ++T) E[T] = x[T];
      return E;
    } else if (ie) {
      var I = new Uint8Array(v);
      if (I.set) I.set(x);
      else for (; T < p; ++T) I[T] = x[T];
      return I;
    }
    return x.length = v, x;
  }
  function Dt(x) {
    for (var w = new Array(x), p = 0; p < x; ++p) w[p] = 0;
    return w;
  }
  function Rn(x, w, p) {
    var v = 1, T = 0, E = 0, I = 0, U = 0, R = x.length, N = ie ? new Uint16Array(32) : Dt(32);
    for (E = 0; E < 32; ++E) N[E] = 0;
    for (E = R; E < p; ++E) x[E] = 0;
    R = x.length;
    var P = ie ? new Uint16Array(R) : Dt(R);
    for (E = 0; E < R; ++E)
      N[T = x[E]]++, v < T && (v = T), P[E] = 0;
    for (N[0] = 0, E = 1; E <= v; ++E) N[E + 16] = U = U + N[E - 1] << 1;
    for (E = 0; E < R; ++E)
      U = x[E], U != 0 && (P[E] = N[U + 16]++);
    var j = 0;
    for (E = 0; E < R; ++E)
      if (j = x[E], j != 0)
        for (U = me(P[E], v) >> v - j, I = (1 << v + 4 - j) - 1; I >= 0; --I)
          w[U | I << j] = j & 15 | E << 4;
    return v;
  }
  var pa = ie ? new Uint16Array(512) : Dt(512), va = ie ? new Uint16Array(32) : Dt(32);
  if (!ie) {
    for (var or = 0; or < 512; ++or) pa[or] = 0;
    for (or = 0; or < 32; ++or) va[or] = 0;
  }
  (function() {
    for (var x = [], w = 0; w < 32; w++) x.push(5);
    Rn(x, va, 32);
    var p = [];
    for (w = 0; w <= 143; w++) p.push(8);
    for (; w <= 255; w++) p.push(9);
    for (; w <= 279; w++) p.push(7);
    for (; w <= 287; w++) p.push(8);
    Rn(p, pa, 288);
  })();
  var eo = /* @__PURE__ */ (function() {
    for (var w = ie ? new Uint8Array(32768) : [], p = 0, v = 0; p < se.length - 1; ++p)
      for (; v < se[p + 1]; ++v) w[v] = p;
    for (; v < 32768; ++v) w[v] = 29;
    var T = ie ? new Uint8Array(259) : [];
    for (p = 0, v = 0; p < G.length - 1; ++p)
      for (; v < G[p + 1]; ++v) T[v] = p;
    function E(U, R) {
      for (var N = 0; N < U.length; ) {
        var P = Math.min(65535, U.length - N), j = N + P == U.length;
        for (R.write_shift(1, +j), R.write_shift(2, P), R.write_shift(2, ~P & 65535); P-- > 0; ) R[R.l++] = U[N++];
      }
      return R.l;
    }
    function I(U, R) {
      for (var N = 0, P = 0, j = ie ? new Uint16Array(32768) : []; P < U.length; ) {
        var Z = (
          /* data.length - boff; */
          Math.min(65535, U.length - P)
        );
        if (Z < 10) {
          for (N = Bt(R, N, +(P + Z == U.length)), N & 7 && (N += 8 - (N & 7)), R.l = N / 8 | 0, R.write_shift(2, Z), R.write_shift(2, ~Z & 65535); Z-- > 0; ) R[R.l++] = U[P++];
          N = R.l * 8;
          continue;
        }
        N = Bt(R, N, +(P + Z == U.length) + 2);
        for (var ne = 0; Z-- > 0; ) {
          var K = U[P];
          ne = (ne << 5 ^ K) & 32767;
          var re = -1, le = 0;
          if ((re = j[ne]) && (re |= P & -32768, re > P && (re -= 32768), re < P))
            for (; U[re + le] == U[P + le] && le < 250; ) ++le;
          if (le > 2) {
            K = T[le], K <= 22 ? N = Cr(R, N, te[K + 1] >> 1) - 1 : (Cr(R, N, 3), N += 5, Cr(R, N, te[K - 23] >> 5), N += 3);
            var Ie = K < 8 ? 0 : K - 4 >> 2;
            Ie > 0 && (Fi(R, N, le - G[K]), N += Ie), K = w[P - re], N = Cr(R, N, te[K] >> 3), N -= 3;
            var De = K < 4 ? 0 : K - 2 >> 1;
            De > 0 && (Fi(R, N, P - re - se[K]), N += De);
            for (var et = 0; et < le; ++et)
              j[ne] = P & 32767, ne = (ne << 5 ^ U[P]) & 32767, ++P;
            Z -= le - 1;
          } else
            K <= 143 ? K = K + 48 : N = fr(R, N, 1), N = Cr(R, N, te[K]), j[ne] = P & 32767, ++P;
        }
        N = Cr(R, N, 0) - 1;
      }
      return R.l = (N + 7) / 8 | 0, R.l;
    }
    return function(R, N) {
      return R.length < 8 ? E(R, N) : I(R, N);
    };
  })();
  function Ci(x) {
    var w = B(50 + Math.floor(x.length * 1.1)), p = eo(x, w);
    return w.slice(0, p);
  }
  var Ai = ie ? new Uint16Array(32768) : Dt(32768), ki = ie ? new Uint16Array(32768) : Dt(32768), Oi = ie ? new Uint16Array(128) : Dt(128), Ri = 1, Ii = 1;
  function to(x, w) {
    var p = Ne(x, w) + 257;
    w += 5;
    var v = Ne(x, w) + 1;
    w += 5;
    var T = Lt(x, w) + 4;
    w += 4;
    for (var E = 0, I = ie ? new Uint8Array(19) : Dt(19), U = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], R = 1, N = ie ? new Uint8Array(8) : Dt(8), P = ie ? new Uint8Array(8) : Dt(8), j = I.length, Z = 0; Z < T; ++Z)
      I[y[Z]] = E = _e(x, w), R < E && (R = E), N[E]++, w += 3;
    var ne = 0;
    for (N[0] = 0, Z = 1; Z <= R; ++Z) P[Z] = ne = ne + N[Z - 1] << 1;
    for (Z = 0; Z < j; ++Z) (ne = I[Z]) != 0 && (U[Z] = P[ne]++);
    var K = 0;
    for (Z = 0; Z < j; ++Z)
      if (K = I[Z], K != 0) {
        ne = te[U[Z]] >> 8 - K;
        for (var re = (1 << 7 - K) - 1; re >= 0; --re) Oi[ne | re << K] = K & 7 | Z << 3;
      }
    var le = [];
    for (R = 1; le.length < p + v; )
      switch (ne = Oi[ae(x, w)], w += ne & 7, ne >>>= 3) {
        case 16:
          for (E = 3 + nt(x, w), w += 2, ne = le[le.length - 1]; E-- > 0; ) le.push(ne);
          break;
        case 17:
          for (E = 3 + _e(x, w), w += 3; E-- > 0; ) le.push(0);
          break;
        case 18:
          for (E = 11 + ae(x, w), w += 7; E-- > 0; ) le.push(0);
          break;
        default:
          le.push(ne), R < ne && (R = ne);
          break;
      }
    var Ie = le.slice(0, p), De = le.slice(p);
    for (Z = p; Z < 286; ++Z) Ie[Z] = 0;
    for (Z = v; Z < 30; ++Z) De[Z] = 0;
    return Ri = Rn(Ie, Ai, 286), Ii = Rn(De, ki, 30), w;
  }
  function ro(x, w) {
    if (x[0] == 3 && !(x[1] & 3))
      return [_r(w), 2];
    for (var p = 0, v = 0, T = t0(w || 1 << 18), E = 0, I = T.length >>> 0, U = 0, R = 0; (v & 1) == 0; ) {
      if (v = _e(x, p), p += 3, v >>> 1)
        v >> 1 == 1 ? (U = 9, R = 5) : (p = to(x, p), U = Ri, R = Ii);
      else {
        p & 7 && (p += 8 - (p & 7));
        var N = x[p >>> 3] | x[(p >>> 3) + 1] << 8;
        if (p += 32, N > 0)
          for (!w && I < E + N && (T = ma(T, E + N), I = T.length); N-- > 0; )
            T[E++] = x[p >>> 3], p += 8;
        continue;
      }
      for (; ; ) {
        !w && I < E + 32767 && (T = ma(T, E + 32767), I = T.length);
        var P = gt(x, p, U), j = v >>> 1 == 1 ? pa[P] : Ai[P];
        if (p += j & 15, j >>>= 4, (j >>> 8 & 255) === 0) T[E++] = j;
        else {
          if (j == 256) break;
          j -= 257;
          var Z = j < 8 ? 0 : j - 4 >> 2;
          Z > 5 && (Z = 0);
          var ne = E + G[j];
          Z > 0 && (ne += gt(x, p, Z), p += Z), P = gt(x, p, R), j = v >>> 1 == 1 ? va[P] : ki[P], p += j & 15, j >>>= 4;
          var K = j < 4 ? 0 : j - 2 >> 1, re = se[j];
          for (K > 0 && (re += gt(x, p, K), p += K), !w && I < ne && (T = ma(T, ne + 100), I = T.length); E < ne; )
            T[E] = T[E - re], ++E;
        }
      }
    }
    return w ? [T, p + 7 >>> 3] : [T.slice(0, E), p + 7 >>> 3];
  }
  function Di(x, w) {
    var p = x.slice(x.l || 0), v = ro(p, w);
    return x.l += v[1], v[0];
  }
  function Ni(x, w) {
    if (x)
      typeof console < "u" && console.error(w);
    else throw new Error(w);
  }
  function Pi(x, w) {
    var p = (
      /*::(*/
      x
    );
    dt(p, 0);
    var v = [], T = [], E = {
      FileIndex: v,
      FullPaths: T
    };
    F(E, { root: w.root });
    for (var I = p.length - 4; (p[I] != 80 || p[I + 1] != 75 || p[I + 2] != 5 || p[I + 3] != 6) && I >= 0; ) --I;
    p.l = I + 4, p.l += 4;
    var U = p.read_shift(2);
    p.l += 6;
    var R = p.read_shift(4);
    for (p.l = R, I = 0; I < U; ++I) {
      p.l += 20;
      var N = p.read_shift(4), P = p.read_shift(4), j = p.read_shift(2), Z = p.read_shift(2), ne = p.read_shift(2);
      p.l += 8;
      var K = p.read_shift(4), re = f(
        /*::(*/
        p.slice(p.l + j, p.l + j + Z)
        /*:: :any)*/
      );
      p.l += j + Z + ne;
      var le = p.l;
      p.l = K + 4, no(p, N, P, E, re), p.l = le;
    }
    return E;
  }
  function no(x, w, p, v, T) {
    x.l += 2;
    var E = x.read_shift(2), I = x.read_shift(2), U = s(x);
    if (E & 8257) throw new Error("Unsupported ZIP encryption");
    for (var R = x.read_shift(4), N = x.read_shift(4), P = x.read_shift(4), j = x.read_shift(2), Z = x.read_shift(2), ne = "", K = 0; K < j; ++K) ne += String.fromCharCode(x[x.l++]);
    if (Z) {
      var re = f(
        /*::(*/
        x.slice(x.l, x.l + Z)
        /*:: :any)*/
      );
      (re[21589] || {}).mt && (U = re[21589].mt), ((T || {})[21589] || {}).mt && (U = T[21589].mt);
    }
    x.l += Z;
    var le = x.slice(x.l, x.l + N);
    switch (I) {
      case 8:
        le = M(x, P);
        break;
      case 0:
        break;
      // TODO: scan for magic number
      default:
        throw new Error("Unsupported ZIP Compression method " + I);
    }
    var Ie = !1;
    E & 8 && (R = x.read_shift(4), R == 134695760 && (R = x.read_shift(4), Ie = !0), N = x.read_shift(4), P = x.read_shift(4)), N != w && Ni(Ie, "Bad compressed size: " + w + " != " + N), P != p && Ni(Ie, "Bad uncompressed size: " + p + " != " + P), _a(v, ne, le, { unsafe: !0, mt: U });
  }
  function ao(x, w) {
    var p = w || {}, v = [], T = [], E = B(1), I = p.compression ? 8 : 0, U = 0, R = 0, N = 0, P = 0, j = 0, Z = x.FullPaths[0], ne = Z, K = x.FileIndex[0], re = [], le = 0;
    for (R = 1; R < x.FullPaths.length; ++R)
      if (ne = x.FullPaths[R].slice(Z.length), K = x.FileIndex[R], !(!K.size || !K.content || ne == "Sh33tJ5")) {
        var Ie = P, De = B(ne.length);
        for (N = 0; N < ne.length; ++N) De.write_shift(1, ne.charCodeAt(N) & 127);
        De = De.slice(0, De.l), re[j] = pc.buf(
          /*::((*/
          K.content,
          0
        );
        var et = K.content;
        I == 8 && (et = A(et)), E = B(30), E.write_shift(4, 67324752), E.write_shift(2, 20), E.write_shift(2, U), E.write_shift(2, I), K.mt ? i(E, K.mt) : E.write_shift(4, 0), E.write_shift(-4, re[j]), E.write_shift(4, et.length), E.write_shift(
          4,
          /*::(*/
          K.content.length
        ), E.write_shift(2, De.length), E.write_shift(2, 0), P += E.length, v.push(E), P += De.length, v.push(De), P += et.length, v.push(et), E = B(46), E.write_shift(4, 33639248), E.write_shift(2, 0), E.write_shift(2, 20), E.write_shift(2, U), E.write_shift(2, I), E.write_shift(4, 0), E.write_shift(-4, re[j]), E.write_shift(4, et.length), E.write_shift(
          4,
          /*::(*/
          K.content.length
        ), E.write_shift(2, De.length), E.write_shift(2, 0), E.write_shift(2, 0), E.write_shift(2, 0), E.write_shift(2, 0), E.write_shift(4, 0), E.write_shift(4, Ie), le += E.l, T.push(E), le += De.length, T.push(De), ++j;
      }
    return E = B(22), E.write_shift(4, 101010256), E.write_shift(2, 0), E.write_shift(2, 0), E.write_shift(2, j), E.write_shift(2, j), E.write_shift(4, le), E.write_shift(4, P), E.write_shift(2, 0), Je([Je(v), Je(T), E]);
  }
  var In = {
    htm: "text/html",
    xml: "text/xml",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    mso: "application/x-mso",
    thmx: "application/vnd.ms-officetheme",
    sh33tj5: "application/octet-stream"
  };
  function io(x, w) {
    if (x.ctype) return x.ctype;
    var p = x.name || "", v = p.match(/\.([^\.]+)$/);
    return v && In[v[1]] || w && (v = (p = w).match(/[\.\\]([^\.\\])+$/), v && In[v[1]]) ? In[v[1]] : "application/octet-stream";
  }
  function so(x) {
    for (var w = pn(x), p = [], v = 0; v < w.length; v += 76) p.push(w.slice(v, v + 76));
    return p.join(`\r
`) + `\r
`;
  }
  function fo(x) {
    var w = x.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(N) {
      var P = N.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (P.length == 1 ? "0" + P : P);
    });
    w = w.replace(/ $/mg, "=20").replace(/\t$/mg, "=09"), w.charAt(0) == `
` && (w = "=0D" + w.slice(1)), w = w.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, `
=0A`).replace(/([^\r\n])\n/mg, "$1=0A");
    for (var p = [], v = w.split(`\r
`), T = 0; T < v.length; ++T) {
      var E = v[T];
      if (E.length == 0) {
        p.push("");
        continue;
      }
      for (var I = 0; I < E.length; ) {
        var U = 76, R = E.slice(I, I + U);
        R.charAt(U - 1) == "=" ? U-- : R.charAt(U - 2) == "=" ? U -= 2 : R.charAt(U - 3) == "=" && (U -= 3), R = E.slice(I, I + U), I += U, I < E.length && (R += "="), p.push(R);
      }
    }
    return p.join(`\r
`);
  }
  function oo(x) {
    for (var w = [], p = 0; p < x.length; ++p) {
      for (var v = x[p]; p <= x.length && v.charAt(v.length - 1) == "="; ) v = v.slice(0, v.length - 1) + x[++p];
      w.push(v);
    }
    for (var T = 0; T < w.length; ++T) w[T] = w[T].replace(/[=][0-9A-Fa-f]{2}/g, function(E) {
      return String.fromCharCode(parseInt(E.slice(1), 16));
    });
    return Ot(w.join(`\r
`));
  }
  function lo(x, w, p) {
    for (var v = "", T = "", E = "", I, U = 0; U < 10; ++U) {
      var R = w[U];
      if (!R || R.match(/^\s*$/)) break;
      var N = R.match(/^(.*?):\s*([^\s].*)$/);
      if (N) switch (N[1].toLowerCase()) {
        case "content-location":
          v = N[2].trim();
          break;
        case "content-type":
          E = N[2].trim();
          break;
        case "content-transfer-encoding":
          T = N[2].trim();
          break;
      }
    }
    switch (++U, T.toLowerCase()) {
      case "base64":
        I = Ot($t(w.slice(U).join("")));
        break;
      case "quoted-printable":
        I = oo(w.slice(U));
        break;
      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + T);
    }
    var P = _a(x, v.slice(p.length), I, { unsafe: !0 });
    E && (P.ctype = E);
  }
  function co(x, w) {
    if (Ve(x.slice(0, 13)).toLowerCase() != "mime-version:") throw new Error("Unsupported MAD header");
    var p = w && w.root || "", v = (ve && Buffer.isBuffer(x) ? x.toString("binary") : Ve(x)).split(`\r
`), T = 0, E = "";
    for (T = 0; T < v.length; ++T)
      if (E = v[T], !!/^Content-Location:/i.test(E) && (E = E.slice(E.indexOf("file")), p || (p = E.slice(0, E.lastIndexOf("/") + 1)), E.slice(0, p.length) != p))
        for (; p.length > 0 && (p = p.slice(0, p.length - 1), p = p.slice(0, p.lastIndexOf("/") + 1), E.slice(0, p.length) != p); )
          ;
    var I = (v[1] || "").match(/boundary="(.*?)"/);
    if (!I) throw new Error("MAD cannot find boundary");
    var U = "--" + (I[1] || ""), R = [], N = [], P = {
      FileIndex: R,
      FullPaths: N
    };
    F(P);
    var j, Z = 0;
    for (T = 0; T < v.length; ++T) {
      var ne = v[T];
      ne !== U && ne !== U + "--" || (Z++ && lo(P, v.slice(j, T), p), j = T);
    }
    return P;
  }
  function ho(x, w) {
    var p = w || {}, v = p.boundary || "SheetJS";
    v = "------=" + v;
    for (var T = [
      "MIME-Version: 1.0",
      'Content-Type: multipart/related; boundary="' + v.slice(2) + '"',
      "",
      "",
      ""
    ], E = x.FullPaths[0], I = E, U = x.FileIndex[0], R = 1; R < x.FullPaths.length; ++R)
      if (I = x.FullPaths[R].slice(E.length), U = x.FileIndex[R], !(!U.size || !U.content || I == "Sh33tJ5")) {
        I = I.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(le) {
          return "_x" + le.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function(le) {
          return "_u" + le.charCodeAt(0).toString(16) + "_";
        });
        for (var N = U.content, P = ve && Buffer.isBuffer(N) ? N.toString("binary") : Ve(N), j = 0, Z = Math.min(1024, P.length), ne = 0, K = 0; K <= Z; ++K) (ne = P.charCodeAt(K)) >= 32 && ne < 128 && ++j;
        var re = j >= Z * 4 / 5;
        T.push(v), T.push("Content-Location: " + (p.root || "file:///C:/SheetJS/") + I), T.push("Content-Transfer-Encoding: " + (re ? "quoted-printable" : "base64")), T.push("Content-Type: " + io(U, I)), T.push(""), T.push(re ? fo(P) : so(P));
      }
    return T.push(v + `--\r
`), T.join(`\r
`);
  }
  function uo(x) {
    var w = {};
    return F(w, x), w;
  }
  function _a(x, w, p, v) {
    var T = v && v.unsafe;
    T || F(x);
    var E = !T && Ce.find(x, w);
    if (!E) {
      var I = x.FullPaths[0];
      w.slice(0, I.length) == I ? I = w : (I.slice(-1) != "/" && (I += "/"), I = (I + w).replace("//", "/")), E = { name: a(w), type: 2 }, x.FileIndex.push(E), x.FullPaths.push(I), T || Ce.utils.cfb_gc(x);
    }
    return E.content = p, E.size = p ? p.length : 0, v && (v.CLSID && (E.clsid = v.CLSID), v.mt && (E.mt = v.mt), v.ct && (E.ct = v.ct)), E;
  }
  function xo(x, w) {
    F(x);
    var p = Ce.find(x, w);
    if (p) {
      for (var v = 0; v < x.FileIndex.length; ++v) if (x.FileIndex[v] == p)
        return x.FileIndex.splice(v, 1), x.FullPaths.splice(v, 1), !0;
    }
    return !1;
  }
  function mo(x, w, p) {
    F(x);
    var v = Ce.find(x, w);
    if (v) {
      for (var T = 0; T < x.FileIndex.length; ++T) if (x.FileIndex[T] == v)
        return x.FileIndex[T].name = a(p), x.FullPaths[T] = p, !0;
    }
    return !1;
  }
  function po(x) {
    D(x, !0);
  }
  return r.find = V, r.read = q, r.parse = c, r.write = _t, r.writeFile = Ft, r.utils = {
    cfb_new: uo,
    cfb_add: _a,
    cfb_del: xo,
    cfb_mov: mo,
    cfb_gc: po,
    ReadShift: cn,
    CheckField: Ys,
    prep_blob: dt,
    bconcat: Je,
    use_zlib: S,
    _deflateRaw: Ci,
    _inflateRaw: Di,
    consts: Le
  }, r;
})();
function vc(e) {
  return typeof e == "string" ? fa(e) : Array.isArray(e) ? Vl(e) : e;
}
function Fn(e, r, t) {
  if (typeof Deno < "u") {
    if (t && typeof r == "string") switch (t) {
      case "utf8":
        r = new TextEncoder(t).encode(r);
        break;
      case "binary":
        r = fa(r);
        break;
      /* TODO: binary equivalent */
      default:
        throw new Error("Unsupported encoding " + t);
    }
    return Deno.writeFileSync(e, r);
  }
  var n = t == "utf8" ? _n(r) : r;
  if (typeof IE_SaveFile < "u") return IE_SaveFile(n, e);
  if (typeof Blob < "u") {
    var a = new Blob([vc(n)], { type: "application/octet-stream" });
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
    var f = File(e);
    return f.open("w"), f.encoding = "binary", Array.isArray(r) && (r = yn(r)), f.write(r), f.close(), r;
  } catch (l) {
    if (!l.message || !l.message.match(/onstruct/)) throw l;
  }
  throw new Error("cannot save file " + e);
}
function qe(e) {
  for (var r = Object.keys(e), t = [], n = 0; n < r.length; ++n) Object.prototype.hasOwnProperty.call(e, r[n]) && t.push(r[n]);
  return t;
}
function l0(e, r) {
  for (var t = [], n = qe(e), a = 0; a !== n.length; ++a) t[e[n[a]][r]] == null && (t[e[n[a]][r]] = n[a]);
  return t;
}
function si(e) {
  for (var r = [], t = qe(e), n = 0; n !== t.length; ++n) r[e[t[n]]] = t[n];
  return r;
}
function ca(e) {
  for (var r = [], t = qe(e), n = 0; n !== t.length; ++n) r[e[t[n]]] = parseInt(t[n], 10);
  return r;
}
function _c(e) {
  for (var r = [], t = qe(e), n = 0; n !== t.length; ++n)
    r[e[t[n]]] == null && (r[e[t[n]]] = []), r[e[t[n]]].push(t[n]);
  return r;
}
var Qn = /* @__PURE__ */ new Date(1899, 11, 30, 0, 0, 0);
function ct(e, r) {
  var t = /* @__PURE__ */ e.getTime(), n = /* @__PURE__ */ Qn.getTime() + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ Qn.getTimezoneOffset()) * 6e4;
  return (t - n) / (1440 * 60 * 1e3);
}
var Is = /* @__PURE__ */ new Date(), gc = /* @__PURE__ */ Qn.getTime() + (/* @__PURE__ */ Is.getTimezoneOffset() - /* @__PURE__ */ Qn.getTimezoneOffset()) * 6e4, c0 = /* @__PURE__ */ Is.getTimezoneOffset();
function Ds(e) {
  var r = /* @__PURE__ */ new Date();
  return r.setTime(e * 24 * 60 * 60 * 1e3 + gc), r.getTimezoneOffset() !== c0 && r.setTime(r.getTime() + (r.getTimezoneOffset() - c0) * 6e4), r;
}
var h0 = /* @__PURE__ */ new Date("2017-02-19T19:06:09.000Z"), Ns = /* @__PURE__ */ isNaN(/* @__PURE__ */ h0.getFullYear()) ? /* @__PURE__ */ new Date("2/19/17") : h0, wc = /* @__PURE__ */ Ns.getFullYear() == 2017;
function ft(e, r) {
  var t = new Date(e);
  if (wc)
    return r > 0 ? t.setTime(t.getTime() + t.getTimezoneOffset() * 60 * 1e3) : r < 0 && t.setTime(t.getTime() - t.getTimezoneOffset() * 60 * 1e3), t;
  if (e instanceof Date) return e;
  if (Ns.getFullYear() == 1917 && !isNaN(t.getFullYear())) {
    var n = t.getFullYear();
    return e.indexOf("" + n) > -1 || t.setFullYear(t.getFullYear() + 100), t;
  }
  var a = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"], i = new Date(+a[0], +a[1] - 1, +a[2], +a[3] || 0, +a[4] || 0, +a[5] || 0);
  return e.indexOf("Z") > -1 && (i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3)), i;
}
function ha(e, r) {
  if (ve && Buffer.isBuffer(e))
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
function ht(e) {
  if (typeof JSON < "u" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null) return e;
  if (e instanceof Date) return new Date(e.getTime());
  var r = {};
  for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = ht(e[t]));
  return r;
}
function Pe(e, r) {
  for (var t = ""; t.length < r; ) t += e;
  return t;
}
function Gt(e) {
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
var Tc = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function vn(e) {
  var r = new Date(e), t = /* @__PURE__ */ new Date(NaN), n = r.getYear(), a = r.getMonth(), i = r.getDate();
  if (isNaN(i)) return t;
  var s = e.toLowerCase();
  if (s.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (s = s.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), s.length > 3 && Tc.indexOf(s) == -1) return t;
  } else if (s.match(/[a-z]/)) return t;
  return n < 0 || n > 8099 ? t : (a > 0 || i > 1) && n != 101 ? r : e.match(/[^-0-9:,\/\\]/) ? t : r;
}
function he(e, r, t) {
  if (e.FullPaths) {
    if (typeof t == "string") {
      var n;
      return ve ? n = Xt(t) : n = $l(t), Ce.utils.cfb_add(e, r, n);
    }
    Ce.utils.cfb_add(e, r, t);
  } else e.file(r, t);
}
function fi() {
  return Ce.utils.cfb_new();
}
var We = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`, Ec = {
  "&quot;": '"',
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&amp;": "&"
}, oi = /* @__PURE__ */ si(Ec), li = /[&<>'"]/g, Sc = /[\u0000-\u0008\u000b-\u001f]/g;
function Se(e) {
  var r = e + "";
  return r.replace(li, function(t) {
    return oi[t];
  }).replace(Sc, function(t) {
    return "_x" + ("000" + t.charCodeAt(0).toString(16)).slice(-4) + "_";
  });
}
function u0(e) {
  return Se(e).replace(/ /g, "_x0020_");
}
var Ps = /[\u0000-\u001f]/g;
function yc(e) {
  var r = e + "";
  return r.replace(li, function(t) {
    return oi[t];
  }).replace(/\n/g, "<br/>").replace(Ps, function(t) {
    return "&#x" + ("000" + t.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}
function Fc(e) {
  var r = e + "";
  return r.replace(li, function(t) {
    return oi[t];
  }).replace(Ps, function(t) {
    return "&#x" + t.charCodeAt(0).toString(16).toUpperCase() + ";";
  });
}
function Cc(e) {
  return e.replace(/(\r\n|[\r\n])/g, "&#10;");
}
function Ac(e) {
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
function Aa(e) {
  for (var r = "", t = 0, n = 0, a = 0, i = 0, s = 0, f = 0; t < e.length; ) {
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
    s = e.charCodeAt(t++), f = ((n & 7) << 18 | (a & 63) << 12 | (i & 63) << 6 | s & 63) - 65536, r += String.fromCharCode(55296 + (f >>> 10 & 1023)), r += String.fromCharCode(56320 + (f & 1023));
  }
  return r;
}
function x0(e) {
  var r = _r(2 * e.length), t, n, a = 1, i = 0, s = 0, f;
  for (n = 0; n < e.length; n += a)
    a = 1, (f = e.charCodeAt(n)) < 128 ? t = f : f < 224 ? (t = (f & 31) * 64 + (e.charCodeAt(n + 1) & 63), a = 2) : f < 240 ? (t = (f & 15) * 4096 + (e.charCodeAt(n + 1) & 63) * 64 + (e.charCodeAt(n + 2) & 63), a = 3) : (a = 4, t = (f & 7) * 262144 + (e.charCodeAt(n + 1) & 63) * 4096 + (e.charCodeAt(n + 2) & 63) * 64 + (e.charCodeAt(n + 3) & 63), t -= 65536, s = 55296 + (t >>> 10 & 1023), t = 56320 + (t & 1023)), s !== 0 && (r[i++] = s & 255, r[i++] = s >>> 8, s = 0), r[i++] = t % 256, r[i++] = t >>> 8;
  return r.slice(0, i).toString("ucs2");
}
function d0(e) {
  return Xt(e, "binary").toString("utf8");
}
var Bn = "foo bar bazâð£", ln = ve && (/* @__PURE__ */ d0(Bn) == /* @__PURE__ */ Aa(Bn) && d0 || /* @__PURE__ */ x0(Bn) == /* @__PURE__ */ Aa(Bn) && x0) || Aa, _n = ve ? function(e) {
  return Xt(e, "utf8").toString("binary");
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
}, kc = /* @__PURE__ */ (function() {
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
})(), Ms = /(^\s|\s$|\n)/;
function Qe(e, r) {
  return "<" + e + (r.match(Ms) ? ' xml:space="preserve"' : "") + ">" + r + "</" + e + ">";
}
function gn(e) {
  return qe(e).map(function(r) {
    return " " + r + '="' + e[r] + '"';
  }).join("");
}
function J(e, r, t) {
  return "<" + e + (t != null ? gn(t) : "") + (r != null ? (r.match(Ms) ? ' xml:space="preserve"' : "") + ">" + r + "</" + e : "/") + ">";
}
function Qa(e, r) {
  try {
    return e.toISOString().replace(/\.\d*/, "");
  } catch (t) {
    if (r) throw t;
  }
  return "";
}
function Oc(e, r) {
  switch (typeof e) {
    case "string":
      var t = J("vt:lpwstr", Se(e));
      return t = t.replace(/&quot;/g, "_x0022_"), t;
    case "number":
      return J((e | 0) == e ? "vt:i4" : "vt:r8", Se(String(e)));
    case "boolean":
      return J("vt:bool", e ? "true" : "false");
  }
  if (e instanceof Date) return J("vt:filetime", Qa(e));
  throw new Error("Unable to serialize " + e);
}
var $e = {
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
}, jr = [
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://purl.oclc.org/ooxml/spreadsheetml/main",
  "http://schemas.microsoft.com/office/excel/2006/main",
  "http://schemas.microsoft.com/office/excel/2006/2"
], mt = {
  o: "urn:schemas-microsoft-com:office:office",
  x: "urn:schemas-microsoft-com:office:excel",
  ss: "urn:schemas-microsoft-com:office:spreadsheet",
  dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
  mv: "http://macVmlSchemaUri",
  v: "urn:schemas-microsoft-com:vml",
  html: "http://www.w3.org/TR/REC-html40"
};
function Rc(e, r) {
  for (var t = 1 - 2 * (e[r + 7] >>> 7), n = ((e[r + 7] & 127) << 4) + (e[r + 6] >>> 4 & 15), a = e[r + 6] & 15, i = 5; i >= 0; --i) a = a * 256 + e[r + i];
  return n == 2047 ? a == 0 ? t * (1 / 0) : NaN : (n == 0 ? n = -1022 : (n -= 1023, a += Math.pow(2, 52)), t * Math.pow(2, n - 52) * a);
}
function Ic(e, r, t) {
  var n = (r < 0 || 1 / r == -1 / 0 ? 1 : 0) << 7, a = 0, i = 0, s = n ? -r : r;
  isFinite(s) ? s == 0 ? a = i = 0 : (a = Math.floor(Math.log(s) / Math.LN2), i = s * Math.pow(2, 52 - a), a <= -1023 && (!isFinite(i) || i < Math.pow(2, 52)) ? a = -1022 : (i -= Math.pow(2, 52), a += 1023)) : (a = 2047, i = isNaN(r) ? 26985 : 0);
  for (var f = 0; f <= 5; ++f, i /= 256) e[t + f] = i & 255;
  e[t + 6] = (a & 15) << 4 | i & 15, e[t + 7] = a >> 4 | n;
}
var m0 = function(e) {
  for (var r = [], t = 10240, n = 0; n < e[0].length; ++n) if (e[0][n]) for (var a = 0, i = e[0][n].length; a < i; a += t) r.push.apply(r, e[0][n].slice(a, a + t));
  return r;
}, p0 = ve ? function(e) {
  return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(r) {
    return Buffer.isBuffer(r) ? r : Xt(r);
  })) : m0(e);
} : m0, v0 = function(e, r, t) {
  for (var n = [], a = r; a < t; a += 2) n.push(String.fromCharCode(sn(e, a)));
  return n.join("").replace(on, "");
}, ci = ve ? function(e, r, t) {
  return Buffer.isBuffer(e) ? e.toString("utf16le", r, t).replace(on, "") : v0(e, r, t);
} : v0, _0 = function(e, r, t) {
  for (var n = [], a = r; a < r + t; ++a) n.push(("0" + e[a].toString(16)).slice(-2));
  return n.join("");
}, Ls = ve ? function(e, r, t) {
  return Buffer.isBuffer(e) ? e.toString("hex", r, r + t) : _0(e, r, t);
} : _0, g0 = function(e, r, t) {
  for (var n = [], a = r; a < t; a++) n.push(String.fromCharCode(Nr(e, a)));
  return n.join("");
}, Cn = ve ? function(r, t, n) {
  return Buffer.isBuffer(r) ? r.toString("utf8", t, n) : g0(r, t, n);
} : g0, Bs = function(e, r) {
  var t = pt(e, r);
  return t > 0 ? Cn(e, r + 4, r + 4 + t - 1) : "";
}, bs = Bs, Us = function(e, r) {
  var t = pt(e, r);
  return t > 0 ? Cn(e, r + 4, r + 4 + t - 1) : "";
}, Ws = Us, Hs = function(e, r) {
  var t = 2 * pt(e, r);
  return t > 0 ? Cn(e, r + 4, r + 4 + t - 1) : "";
}, Gs = Hs, Vs = function(r, t) {
  var n = pt(r, t);
  return n > 0 ? ci(r, t + 4, t + 4 + n) : "";
}, $s = Vs, zs = function(e, r) {
  var t = pt(e, r);
  return t > 0 ? Cn(e, r + 4, r + 4 + t) : "";
}, Xs = zs, js = function(e, r) {
  return Rc(e, r);
}, Zn = js, hi = function(r) {
  return Array.isArray(r) || typeof Uint8Array < "u" && r instanceof Uint8Array;
};
ve && (bs = function(r, t) {
  if (!Buffer.isBuffer(r)) return Bs(r, t);
  var n = r.readUInt32LE(t);
  return n > 0 ? r.toString("utf8", t + 4, t + 4 + n - 1) : "";
}, Ws = function(r, t) {
  if (!Buffer.isBuffer(r)) return Us(r, t);
  var n = r.readUInt32LE(t);
  return n > 0 ? r.toString("utf8", t + 4, t + 4 + n - 1) : "";
}, Gs = function(r, t) {
  if (!Buffer.isBuffer(r)) return Hs(r, t);
  var n = 2 * r.readUInt32LE(t);
  return r.toString("utf16le", t + 4, t + 4 + n - 1);
}, $s = function(r, t) {
  if (!Buffer.isBuffer(r)) return Vs(r, t);
  var n = r.readUInt32LE(t);
  return r.toString("utf16le", t + 4, t + 4 + n);
}, Xs = function(r, t) {
  if (!Buffer.isBuffer(r)) return zs(r, t);
  var n = r.readUInt32LE(t);
  return r.toString("utf8", t + 4, t + 4 + n);
}, Zn = function(r, t) {
  return Buffer.isBuffer(r) ? r.readDoubleLE(t) : js(r, t);
}, hi = function(r) {
  return Buffer.isBuffer(r) || Array.isArray(r) || typeof Uint8Array < "u" && r instanceof Uint8Array;
});
var Nr = function(e, r) {
  return e[r];
}, sn = function(e, r) {
  return e[r + 1] * 256 + e[r];
}, Dc = function(e, r) {
  var t = e[r + 1] * 256 + e[r];
  return t < 32768 ? t : (65535 - t + 1) * -1;
}, pt = function(e, r) {
  return e[r + 3] * (1 << 24) + (e[r + 2] << 16) + (e[r + 1] << 8) + e[r];
}, ur = function(e, r) {
  return e[r + 3] << 24 | e[r + 2] << 16 | e[r + 1] << 8 | e[r];
}, Nc = function(e, r) {
  return e[r] << 24 | e[r + 1] << 16 | e[r + 2] << 8 | e[r + 3];
};
function cn(e, r) {
  var t = "", n, a, i = [], s, f, l, o;
  switch (r) {
    case "dbcs":
      if (o = this.l, ve && Buffer.isBuffer(this)) t = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else for (l = 0; l < e; ++l)
        t += String.fromCharCode(sn(this, o)), o += 2;
      e *= 2;
      break;
    case "utf8":
      t = Cn(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, t = ci(this, this.l, this.l + e);
      break;
    case "wstr":
      return cn.call(this, e, "dbcs");
    /* [MS-OLEDS] 2.1.4 LengthPrefixedAnsiString */
    case "lpstr-ansi":
      t = bs(this, this.l), e = 4 + pt(this, this.l);
      break;
    case "lpstr-cp":
      t = Ws(this, this.l), e = 4 + pt(this, this.l);
      break;
    /* [MS-OLEDS] 2.1.5 LengthPrefixedUnicodeString */
    case "lpwstr":
      t = Gs(this, this.l), e = 4 + 2 * pt(this, this.l);
      break;
    /* [MS-OFFCRYPTO] 2.1.2 Length-Prefixed Padded Unicode String (UNICODE-LP-P4) */
    case "lpp4":
      e = 4 + pt(this, this.l), t = $s(this, this.l), e & 2 && (e += 2);
      break;
    /* [MS-OFFCRYPTO] 2.1.3 Length-Prefixed UTF-8 String (UTF-8-LP-P4) */
    case "8lpp4":
      e = 4 + pt(this, this.l), t = Xs(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, t = ""; (s = Nr(this, this.l + e++)) !== 0; ) i.push(Pn(s));
      t = i.join("");
      break;
    case "_wstr":
      for (e = 0, t = ""; (s = sn(this, this.l + e)) !== 0; )
        i.push(Pn(s)), e += 2;
      e += 2, t = i.join("");
      break;
    /* sbcs and dbcs support continue records in the SST way TODO codepages */
    case "dbcs-cont":
      for (t = "", o = this.l, l = 0; l < e; ++l) {
        if (this.lens && this.lens.indexOf(o) !== -1)
          return s = Nr(this, o), this.l = o + 1, f = cn.call(this, e - l, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(Pn(sn(this, o))), o += 2;
      }
      t = i.join(""), e *= 2;
      break;
    case "cpstr":
    /* falls through */
    case "sbcs-cont":
      for (t = "", o = this.l, l = 0; l != e; ++l) {
        if (this.lens && this.lens.indexOf(o) !== -1)
          return s = Nr(this, o), this.l = o + 1, f = cn.call(this, e - l, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(Pn(Nr(this, o))), o += 1;
      }
      t = i.join("");
      break;
    default:
      switch (e) {
        case 1:
          return n = Nr(this, this.l), this.l++, n;
        case 2:
          return n = (r === "i" ? Dc : sn)(this, this.l), this.l += 2, n;
        case 4:
        case -4:
          return r === "i" || (this[this.l + 3] & 128) === 0 ? (n = (e > 0 ? ur : Nc)(this, this.l), this.l += 4, n) : (a = pt(this, this.l), this.l += 4, a);
        case 8:
        case -8:
          if (r === "f")
            return e == 8 ? a = Zn(this, this.l) : a = Zn([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, a;
          e = 8;
        /* falls through */
        case 16:
          t = Ls(this, this.l, e);
          break;
      }
  }
  return this.l += e, t;
}
var Pc = function(e, r, t) {
  e[t] = r & 255, e[t + 1] = r >>> 8 & 255, e[t + 2] = r >>> 16 & 255, e[t + 3] = r >>> 24 & 255;
}, Mc = function(e, r, t) {
  e[t] = r & 255, e[t + 1] = r >> 8 & 255, e[t + 2] = r >> 16 & 255, e[t + 3] = r >> 24 & 255;
}, Lc = function(e, r, t) {
  e[t] = r & 255, e[t + 1] = r >>> 8 & 255;
};
function Bc(e, r, t) {
  var n = 0, a = 0;
  if (t === "dbcs") {
    for (a = 0; a != r.length; ++a) Lc(this, r.charCodeAt(a), this.l + 2 * a);
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
      n = 4, Pc(this, r, this.l);
      break;
    case 8:
      if (n = 8, t === "f") {
        Ic(this, r, this.l);
        break;
      }
    /* falls through */
    case 16:
      break;
    case -4:
      n = 4, Mc(this, r, this.l);
      break;
  }
  return this.l += n, this;
}
function Ys(e, r) {
  var t = Ls(this, this.l, e.length >> 1);
  if (t !== e) throw new Error(r + "Expected " + e + " saw " + t);
  this.l += e.length >> 1;
}
function dt(e, r) {
  e.l = r, e.read_shift = /*::(*/
  cn, e.chk = Ys, e.write_shift = Bc;
}
function Mt(e, r) {
  e.l += r;
}
function B(e) {
  var r = _r(e);
  return dt(r, 0), r;
}
function lt() {
  var e = [], r = ve ? 256 : 2048, t = function(o) {
    var c = B(o);
    return dt(c, 0), c;
  }, n = t(r), a = function() {
    n && (n.length > n.l && (n = n.slice(0, n.l), n.l = n.length), n.length > 0 && e.push(n), n = null);
  }, i = function(o) {
    return n && o < n.length - n.l ? n : (a(), n = t(Math.max(o + 1, r)));
  }, s = function() {
    return a(), Je(e);
  }, f = function(o) {
    a(), n = o, n.l == null && (n.l = n.length), i(r);
  };
  return { next: i, push: f, end: s, _bufs: e };
}
function H(e, r, t, n) {
  var a = +r, i;
  if (!isNaN(a)) {
    n || (n = Rm[a].p || (t || []).length || 0), i = 1 + (a >= 128 ? 1 : 0) + 1, n >= 128 && ++i, n >= 16384 && ++i, n >= 2097152 && ++i;
    var s = e.next(i);
    a <= 127 ? s.write_shift(1, a) : (s.write_shift(1, (a & 127) + 128), s.write_shift(1, a >> 7));
    for (var f = 0; f != 4; ++f)
      if (n >= 128)
        s.write_shift(1, (n & 127) + 128), n >>= 7;
      else {
        s.write_shift(1, n);
        break;
      }
    /*:: length != null &&*/
    n > 0 && hi(t) && e.push(t);
  }
}
function hn(e, r, t) {
  var n = ht(e);
  if (r.s ? (n.cRel && (n.c += r.s.c), n.rRel && (n.r += r.s.r)) : (n.cRel && (n.c += r.c), n.rRel && (n.r += r.r)), !t || t.biff < 12) {
    for (; n.c >= 256; ) n.c -= 256;
    for (; n.r >= 65536; ) n.r -= 65536;
  }
  return n;
}
function w0(e, r, t) {
  var n = ht(e);
  return n.s = hn(n.s, r.s, t), n.e = hn(n.e, r.s, t), n;
}
function un(e, r) {
  if (e.cRel && e.c < 0)
    for (e = ht(e); e.c < 0; ) e.c += r > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = ht(e); e.r < 0; ) e.r += r > 8 ? 1048576 : r > 5 ? 65536 : 16384;
  var t = ye(e);
  return !e.cRel && e.cRel != null && (t = Wc(t)), !e.rRel && e.rRel != null && (t = bc(t)), t;
}
function ka(e, r) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (r.biff >= 12 ? 1048575 : r.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + tt(e.s.c) + ":" + (e.e.cRel ? "" : "$") + tt(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (r.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + Ze(e.s.r) + ":" + (e.e.rRel ? "" : "$") + Ze(e.e.r) : un(e.s, r.biff) + ":" + un(e.e, r.biff);
}
function ui(e) {
  return parseInt(Uc(e), 10) - 1;
}
function Ze(e) {
  return "" + (e + 1);
}
function bc(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function Uc(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function xi(e) {
  for (var r = Hc(e), t = 0, n = 0; n !== r.length; ++n) t = 26 * t + r.charCodeAt(n) - 64;
  return t - 1;
}
function tt(e) {
  if (e < 0) throw new Error("invalid column " + e);
  var r = "";
  for (++e; e; e = Math.floor((e - 1) / 26)) r = String.fromCharCode((e - 1) % 26 + 65) + r;
  return r;
}
function Wc(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}
function Hc(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}
function Gc(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function ze(e) {
  for (var r = 0, t = 0, n = 0; n < e.length; ++n) {
    var a = e.charCodeAt(n);
    a >= 48 && a <= 57 ? r = 10 * r + (a - 48) : a >= 65 && a <= 90 && (t = 26 * t + (a - 64));
  }
  return { c: t - 1, r: r - 1 };
}
function ye(e) {
  for (var r = e.c + 1, t = ""; r; r = (r - 1) / 26 | 0) t = String.fromCharCode((r - 1) % 26 + 65) + t;
  return t + (e.r + 1);
}
function vt(e) {
  var r = e.indexOf(":");
  return r == -1 ? { s: ze(e), e: ze(e) } : { s: ze(e.slice(0, r)), e: ze(e.slice(r + 1)) };
}
function Ue(e, r) {
  return typeof r > "u" || typeof r == "number" ? Ue(e.s, e.e) : (typeof e != "string" && (e = ye(e)), typeof r != "string" && (r = ye(r)), e == r ? e : e + ":" + r);
}
function Re(e) {
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
function T0(e, r) {
  var t = e.t == "d" && r instanceof Date;
  if (e.z != null) try {
    return e.w = rr(e.z, t ? ct(r) : r);
  } catch {
  }
  try {
    return e.w = rr((e.XF || {}).numFmtId || (t ? 14 : 0), t ? ct(r) : r);
  } catch {
    return "" + r;
  }
}
function zt(e, r, t) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && t && t.dateNF && (e.z = t.dateNF), e.t == "e" ? An[e.v] || e.v : r == null ? T0(e, e.v) : T0(e, r));
}
function Tr(e, r) {
  var t = r && r.sheet ? r.sheet : "Sheet1", n = {};
  return n[t] = e, { SheetNames: [t], Sheets: n };
}
function Ks(e, r, t) {
  var n = t || {}, a = e ? Array.isArray(e) : n.dense, i = e || (a ? [] : {}), s = 0, f = 0;
  if (i && n.origin != null) {
    if (typeof n.origin == "number") s = n.origin;
    else {
      var l = typeof n.origin == "string" ? ze(n.origin) : n.origin;
      s = l.r, f = l.c;
    }
    i["!ref"] || (i["!ref"] = "A1:A1");
  }
  var o = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };
  if (i["!ref"]) {
    var c = Re(i["!ref"]);
    o.s.c = c.s.c, o.s.r = c.s.r, o.e.c = Math.max(o.e.c, c.e.c), o.e.r = Math.max(o.e.r, c.e.r), s == -1 && (o.e.r = s = c.e.r + 1);
  }
  for (var u = 0; u != r.length; ++u)
    if (r[u]) {
      if (!Array.isArray(r[u])) throw new Error("aoa_to_sheet expects an array of arrays");
      for (var d = 0; d != r[u].length; ++d)
        if (!(typeof r[u][d] > "u")) {
          var m = { v: r[u][d] }, g = s + u, h = f + d;
          if (o.s.r > g && (o.s.r = g), o.s.c > h && (o.s.c = h), o.e.r < g && (o.e.r = g), o.e.c < h && (o.e.c = h), r[u][d] && typeof r[u][d] == "object" && !Array.isArray(r[u][d]) && !(r[u][d] instanceof Date)) m = r[u][d];
          else if (Array.isArray(m.v) && (m.f = r[u][d][1], m.v = m.v[0]), m.v === null)
            if (m.f) m.t = "n";
            else if (n.nullError)
              m.t = "e", m.v = 0;
            else if (n.sheetStubs) m.t = "z";
            else continue;
          else typeof m.v == "number" ? m.t = "n" : typeof m.v == "boolean" ? m.t = "b" : m.v instanceof Date ? (m.z = n.dateNF || Me[14], n.cellDates ? (m.t = "d", m.w = rr(m.z, ct(m.v))) : (m.t = "n", m.v = ct(m.v), m.w = rr(m.z, m.v))) : m.t = "s";
          if (a)
            i[g] || (i[g] = []), i[g][h] && i[g][h].z && (m.z = i[g][h].z), i[g][h] = m;
          else {
            var _ = ye({ c: h, r: g });
            i[_] && i[_].z && (m.z = i[_].z), i[_] = m;
          }
        }
    }
  return o.s.c < 1e7 && (i["!ref"] = Ue(o)), i;
}
function Yr(e, r) {
  return Ks(null, e, r);
}
function Vc(e) {
  return e.read_shift(4, "i");
}
function It(e, r) {
  return r || (r = B(4)), r.write_shift(4, e), r;
}
function rt(e) {
  var r = e.read_shift(4);
  return r === 0 ? "" : e.read_shift(r, "dbcs");
}
function Xe(e, r) {
  var t = !1;
  return r == null && (t = !0, r = B(4 + 2 * e.length)), r.write_shift(4, e.length), e.length > 0 && r.write_shift(0, e, "dbcs"), t ? r.slice(0, r.l) : r;
}
function $c(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function zc(e, r) {
  return r || (r = B(4)), r.write_shift(2, 0), r.write_shift(2, 0), r;
}
function di(e, r) {
  var t = e.l, n = e.read_shift(1), a = rt(e), i = [], s = { t: a, h: a };
  if ((n & 1) !== 0) {
    for (var f = e.read_shift(4), l = 0; l != f; ++l) i.push($c(e));
    s.r = i;
  } else s.r = [{ ich: 0, ifnt: 0 }];
  return e.l = t + r, s;
}
function Xc(e, r) {
  var t = !1;
  return r == null && (t = !0, r = B(15 + 4 * e.t.length)), r.write_shift(1, 0), Xe(e.t, r), t ? r.slice(0, r.l) : r;
}
var jc = di;
function Yc(e, r) {
  var t = !1;
  return r == null && (t = !0, r = B(23 + 4 * e.t.length)), r.write_shift(1, 1), Xe(e.t, r), r.write_shift(4, 1), zc({}, r), t ? r.slice(0, r.l) : r;
}
function yt(e) {
  var r = e.read_shift(4), t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, { c: r, iStyleRef: t };
}
function Er(e, r) {
  return r == null && (r = B(8)), r.write_shift(-4, e.c), r.write_shift(3, e.iStyleRef || e.s), r.write_shift(1, 0), r;
}
function Sr(e) {
  var r = e.read_shift(2);
  return r += e.read_shift(1) << 16, e.l++, { c: -1, iStyleRef: r };
}
function yr(e, r) {
  return r == null && (r = B(4)), r.write_shift(3, e.iStyleRef || e.s), r.write_shift(1, 0), r;
}
var Kc = rt, Js = Xe;
function mi(e) {
  var r = e.read_shift(4);
  return r === 0 || r === 4294967295 ? "" : e.read_shift(r, "dbcs");
}
function qn(e, r) {
  var t = !1;
  return r == null && (t = !0, r = B(127)), r.write_shift(4, e.length > 0 ? e.length : 4294967295), e.length > 0 && r.write_shift(0, e, "dbcs"), t ? r.slice(0, r.l) : r;
}
var Jc = rt, Za = mi, pi = qn;
function Qs(e) {
  var r = e.slice(e.l, e.l + 4), t = r[0] & 1, n = r[0] & 2;
  e.l += 4;
  var a = n === 0 ? Zn([0, 0, 0, 0, r[0] & 252, r[1], r[2], r[3]], 0) : ur(r, 0) >> 2;
  return t ? a / 100 : a;
}
function Zs(e, r) {
  r == null && (r = B(4));
  var t = 0, n = 0, a = e * 100;
  if (e == (e | 0) && e >= -536870912 && e < 1 << 29 ? n = 1 : a == (a | 0) && a >= -536870912 && a < 1 << 29 && (n = 1, t = 1), n) r.write_shift(-4, ((t ? a : e) << 2) + (t + 2));
  else throw new Error("unsupported RkNumber " + e);
}
function qs(e) {
  var r = { s: {}, e: {} };
  return r.s.r = e.read_shift(4), r.e.r = e.read_shift(4), r.s.c = e.read_shift(4), r.e.c = e.read_shift(4), r;
}
function Qc(e, r) {
  return r || (r = B(16)), r.write_shift(4, e.s.r), r.write_shift(4, e.e.r), r.write_shift(4, e.s.c), r.write_shift(4, e.e.c), r;
}
var Fr = qs, Kr = Qc;
function Jr(e) {
  if (e.length - e.l < 8) throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function gr(e, r) {
  return (r || B(8)).write_shift(8, e, "f");
}
function Zc(e) {
  var r = {}, t = e.read_shift(1), n = t >>> 1, a = e.read_shift(1), i = e.read_shift(2, "i"), s = e.read_shift(1), f = e.read_shift(1), l = e.read_shift(1);
  switch (e.l++, n) {
    case 0:
      r.auto = 1;
      break;
    case 1:
      r.index = a;
      var o = fh[a];
      o && (r.rgb = D0(o));
      break;
    case 2:
      r.rgb = D0([s, f, l]);
      break;
    case 3:
      r.theme = a;
      break;
  }
  return i != 0 && (r.tint = i > 0 ? i / 32767 : i / 32768), r;
}
function ea(e, r) {
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
function qc(e) {
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
function eh(e, r) {
  r || (r = B(2));
  var t = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
  return r.write_shift(1, t), r.write_shift(1, 0), r;
}
var ef = 2, xt = 3, bn = 11, ta = 19, Un = 64, th = 65, rh = 71, nh = 4108, ah = 4126, Ke = 80, E0 = {
  /*::[*/
  1: { n: "CodePage", t: ef },
  /*::[*/
  2: { n: "Category", t: Ke },
  /*::[*/
  3: { n: "PresentationFormat", t: Ke },
  /*::[*/
  4: { n: "ByteCount", t: xt },
  /*::[*/
  5: { n: "LineCount", t: xt },
  /*::[*/
  6: { n: "ParagraphCount", t: xt },
  /*::[*/
  7: { n: "SlideCount", t: xt },
  /*::[*/
  8: { n: "NoteCount", t: xt },
  /*::[*/
  9: { n: "HiddenCount", t: xt },
  /*::[*/
  10: { n: "MultimediaClipCount", t: xt },
  /*::[*/
  11: { n: "ScaleCrop", t: bn },
  /*::[*/
  12: {
    n: "HeadingPairs",
    t: nh
    /* VT_VECTOR | VT_VARIANT */
  },
  /*::[*/
  13: {
    n: "TitlesOfParts",
    t: ah
    /* VT_VECTOR | VT_LPSTR */
  },
  /*::[*/
  14: { n: "Manager", t: Ke },
  /*::[*/
  15: { n: "Company", t: Ke },
  /*::[*/
  16: { n: "LinksUpToDate", t: bn },
  /*::[*/
  17: { n: "CharacterCount", t: xt },
  /*::[*/
  19: { n: "SharedDoc", t: bn },
  /*::[*/
  22: { n: "HyperlinksChanged", t: bn },
  /*::[*/
  23: { n: "AppVersion", t: xt, p: "version" },
  /*::[*/
  24: { n: "DigSig", t: th },
  /*::[*/
  26: { n: "ContentType", t: Ke },
  /*::[*/
  27: { n: "ContentStatus", t: Ke },
  /*::[*/
  28: { n: "Language", t: Ke },
  /*::[*/
  29: { n: "Version", t: Ke },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: ta },
  /*::[*/
  2147483651: { n: "Behavior", t: ta },
  /*::[*/
  1919054434: {}
}, S0 = {
  /*::[*/
  1: { n: "CodePage", t: ef },
  /*::[*/
  2: { n: "Title", t: Ke },
  /*::[*/
  3: { n: "Subject", t: Ke },
  /*::[*/
  4: { n: "Author", t: Ke },
  /*::[*/
  5: { n: "Keywords", t: Ke },
  /*::[*/
  6: { n: "Comments", t: Ke },
  /*::[*/
  7: { n: "Template", t: Ke },
  /*::[*/
  8: { n: "LastAuthor", t: Ke },
  /*::[*/
  9: { n: "RevNumber", t: Ke },
  /*::[*/
  10: { n: "EditTime", t: Un },
  /*::[*/
  11: { n: "LastPrinted", t: Un },
  /*::[*/
  12: { n: "CreatedDate", t: Un },
  /*::[*/
  13: { n: "ModifiedDate", t: Un },
  /*::[*/
  14: { n: "PageCount", t: xt },
  /*::[*/
  15: { n: "WordCount", t: xt },
  /*::[*/
  16: { n: "CharCount", t: xt },
  /*::[*/
  17: { n: "Thumbnail", t: rh },
  /*::[*/
  18: { n: "Application", t: Ke },
  /*::[*/
  19: { n: "DocSecurity", t: xt },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: ta },
  /*::[*/
  2147483651: { n: "Behavior", t: ta },
  /*::[*/
  1919054434: {}
};
function ih(e) {
  return e.map(function(r) {
    return [r >> 16 & 255, r >> 8 & 255, r & 255];
  });
}
var sh = /* @__PURE__ */ ih([
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
]), fh = /* @__PURE__ */ ht(sh), An = {
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
}, oh = {
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
}, Wn = {
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
function tf() {
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
function rf(e, r) {
  var t = _c(oh), n = [], a;
  n[n.length] = We, n[n.length] = J("Types", null, {
    xmlns: $e.CT,
    "xmlns:xsd": $e.xsd,
    "xmlns:xsi": $e.xsi
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
      ContentType: Wn[l][r.bookType] || Wn[l].xlsx
    }));
  }, s = function(l) {
    (e[l] || []).forEach(function(o) {
      n[n.length] = J("Override", null, {
        PartName: (o[0] == "/" ? "" : "/") + o,
        ContentType: Wn[l][r.bookType] || Wn[l].xlsx
      });
    });
  }, f = function(l) {
    (e[l] || []).forEach(function(o) {
      n[n.length] = J("Override", null, {
        PartName: (o[0] == "/" ? "" : "/") + o,
        ContentType: t[l][0]
      });
    });
  };
  return i("workbooks"), s("sheets"), s("charts"), f("themes"), ["strs", "styles"].forEach(i), ["coreprops", "extprops", "custprops"].forEach(f), f("vba"), f("comments"), f("threadedcomments"), f("drawings"), s("metadata"), f("people"), n.length > 2 && (n[n.length] = "</Types>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var pe = {
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
function nf(e) {
  var r = e.lastIndexOf("/");
  return e.slice(0, r + 1) + "_rels/" + e.slice(r + 1) + ".rels";
}
function Lr(e) {
  var r = [We, J("Relationships", null, {
    //'xmlns:ns0': XMLNS.RELS,
    xmlns: $e.RELS
  })];
  return qe(e["!id"]).forEach(function(t) {
    r[r.length] = J("Relationship", null, e["!id"][t]);
  }), r.length > 2 && (r[r.length] = "</Relationships>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Ee(e, r, t, n, a, i) {
  if (a || (a = {}), e["!id"] || (e["!id"] = {}), e["!idx"] || (e["!idx"] = 1), r < 0) for (r = e["!idx"]; e["!id"]["rId" + r]; ++r)
    ;
  if (e["!idx"] = r + 1, a.Id = "rId" + r, a.Type = n, a.Target = t, [pe.HLINK, pe.XPATH, pe.XMISS].indexOf(a.Type) > -1 && (a.TargetMode = "External"), e["!id"][a.Id]) throw new Error("Cannot rewrite rId " + r);
  return e["!id"][a.Id] = a, e[("/" + a.Target).replace("//", "/")] = a, r;
}
function lh(e) {
  var r = [We];
  r.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`), r.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);
  for (var t = 0; t < e.length; ++t) r.push('  <manifest:file-entry manifest:full-path="' + e[t][0] + '" manifest:media-type="' + e[t][1] + `"/>
`);
  return r.push("</manifest:manifest>"), r.join("");
}
function y0(e, r, t) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (t || "odf") + "#" + r + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function ch(e, r) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + r + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function hh(e) {
  var r = [We];
  r.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
  for (var t = 0; t != e.length; ++t)
    r.push(y0(e[t][0], e[t][1])), r.push(ch("", e[t][0]));
  return r.push(y0("", "Document", "pkg")), r.push("</rdf:RDF>"), r.join("");
}
function af() {
  return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + Xn.version + "</meta:generator></office:meta></office:document-meta>";
}
var vr = [
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
function Oa(e, r, t, n, a) {
  a[e] != null || r == null || r === "" || (a[e] = r, r = Se(r), n[n.length] = t ? J(e, r, t) : Qe(e, r));
}
function sf(e, r) {
  var t = r || {}, n = [We, J("cp:coreProperties", null, {
    //'xmlns': XMLNS.CORE_PROPS,
    "xmlns:cp": $e.CORE_PROPS,
    "xmlns:dc": $e.dc,
    "xmlns:dcterms": $e.dcterms,
    "xmlns:dcmitype": $e.dcmitype,
    "xmlns:xsi": $e.xsi
  })], a = {};
  if (!e && !t.Props) return n.join("");
  e && (e.CreatedDate != null && Oa("dcterms:created", typeof e.CreatedDate == "string" ? e.CreatedDate : Qa(e.CreatedDate, t.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a), e.ModifiedDate != null && Oa("dcterms:modified", typeof e.ModifiedDate == "string" ? e.ModifiedDate : Qa(e.ModifiedDate, t.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a));
  for (var i = 0; i != vr.length; ++i) {
    var s = vr[i], f = t.Props && t.Props[s[1]] != null ? t.Props[s[1]] : e ? e[s[1]] : null;
    f === !0 ? f = "1" : f === !1 ? f = "0" : typeof f == "number" && (f = String(f)), f != null && Oa(s[0], f, null, n, a);
  }
  return n.length > 2 && (n[n.length] = "</cp:coreProperties>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var Br = [
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
], ff = [
  "Worksheets",
  "SheetNames",
  "NamedRanges",
  "DefinedNames",
  "Chartsheets",
  "ChartNames"
];
function of(e) {
  var r = [], t = J;
  return e || (e = {}), e.Application = "SheetJS", r[r.length] = We, r[r.length] = J("Properties", null, {
    xmlns: $e.EXT_PROPS,
    "xmlns:vt": $e.vt
  }), Br.forEach(function(n) {
    if (e[n[1]] !== void 0) {
      var a;
      switch (n[2]) {
        case "string":
          a = Se(String(e[n[1]]));
          break;
        case "bool":
          a = e[n[1]] ? "true" : "false";
          break;
      }
      a !== void 0 && (r[r.length] = t(n[0], a));
    }
  }), r[r.length] = t("HeadingPairs", t("vt:vector", t("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + t("vt:variant", t("vt:i4", String(e.Worksheets))), { size: 2, baseType: "variant" })), r[r.length] = t("TitlesOfParts", t("vt:vector", e.SheetNames.map(function(n) {
    return "<vt:lpstr>" + Se(n) + "</vt:lpstr>";
  }).join(""), { size: e.Worksheets, baseType: "lpstr" })), r.length > 2 && (r[r.length] = "</Properties>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function lf(e) {
  var r = [We, J("Properties", null, {
    xmlns: $e.CUST_PROPS,
    "xmlns:vt": $e.vt
  })];
  if (!e) return r.join("");
  var t = 1;
  return qe(e).forEach(function(a) {
    ++t, r[r.length] = J("property", Oc(e[a]), {
      fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: t,
      name: Se(a)
    });
  }), r.length > 2 && (r[r.length] = "</Properties>", r[1] = r[1].replace("/>", ">")), r.join("");
}
var F0 = {
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
function uh(e, r) {
  var t = [];
  return qe(F0).map(function(n) {
    for (var a = 0; a < vr.length; ++a) if (vr[a][1] == n) return vr[a];
    for (a = 0; a < Br.length; ++a) if (Br[a][1] == n) return Br[a];
    throw n;
  }).forEach(function(n) {
    if (e[n[1]] != null) {
      var a = r && r.Props && r.Props[n[1]] != null ? r.Props[n[1]] : e[n[1]];
      switch (n[2]) {
        case "date":
          a = new Date(a).toISOString().replace(/\.\d*Z/, "Z");
          break;
      }
      typeof a == "number" ? a = String(a) : a === !0 || a === !1 ? a = a ? "1" : "0" : a instanceof Date && (a = new Date(a).toISOString().replace(/\.\d*Z/, "")), t.push(Qe(F0[n[1]] || n[1], a));
    }
  }), J("DocumentProperties", t.join(""), { xmlns: mt.o });
}
function xh(e, r) {
  var t = ["Worksheets", "SheetNames"], n = "CustomDocumentProperties", a = [];
  return e && qe(e).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(e, i)) {
      for (var s = 0; s < vr.length; ++s) if (i == vr[s][1]) return;
      for (s = 0; s < Br.length; ++s) if (i == Br[s][1]) return;
      for (s = 0; s < t.length; ++s) if (i == t[s]) return;
      var f = e[i], l = "string";
      typeof f == "number" ? (l = "float", f = String(f)) : f === !0 || f === !1 ? (l = "boolean", f = f ? "1" : "0") : f = String(f), a.push(J(u0(i), f, { "dt:dt": l }));
    }
  }), r && qe(r).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(r, i) && !(e && Object.prototype.hasOwnProperty.call(e, i))) {
      var s = r[i], f = "string";
      typeof s == "number" ? (f = "float", s = String(s)) : s === !0 || s === !1 ? (f = "boolean", s = s ? "1" : "0") : s instanceof Date ? (f = "dateTime.tz", s = s.toISOString()) : s = String(s), a.push(J(u0(i), s, { "dt:dt": f }));
    }
  }), "<" + n + ' xmlns="' + mt.o + '">' + a.join("") + "</" + n + ">";
}
function dh(e) {
  var r = typeof e == "string" ? new Date(Date.parse(e)) : e, t = r.getTime() / 1e3 + 11644473600, n = t % Math.pow(2, 32), a = (t - n) / Math.pow(2, 32);
  n *= 1e7, a *= 1e7;
  var i = n / Math.pow(2, 32) | 0;
  i > 0 && (n = n % Math.pow(2, 32), a += i);
  var s = B(8);
  return s.write_shift(4, n), s.write_shift(4, a), s;
}
function C0(e, r) {
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
      n = dh(r);
      break;
    case 31:
    case 80:
      for (n = B(4 + 2 * (r.length + 1) + (r.length % 2 ? 0 : 2)), n.write_shift(4, r.length + 1), n.write_shift(0, r, "dbcs"); n.l != n.length; ) n.write_shift(1, 0);
      break;
    default:
      throw new Error("TypedPropertyValue unrecognized type " + e + " " + r);
  }
  return Je([t, n]);
}
var cf = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];
function mh(e) {
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
function A0(e, r, t) {
  var n = B(8), a = [], i = [], s = 8, f = 0, l = B(8), o = B(8);
  if (l.write_shift(4, 2), l.write_shift(4, 1200), o.write_shift(4, 1), i.push(l), a.push(o), s += 8 + l.length, !r) {
    o = B(8), o.write_shift(4, 0), a.unshift(o);
    var c = [B(4)];
    for (c[0].write_shift(4, e.length), f = 0; f < e.length; ++f) {
      var u = e[f][0];
      for (l = B(8 + 2 * (u.length + 1) + (u.length % 2 ? 0 : 2)), l.write_shift(4, f + 2), l.write_shift(4, u.length + 1), l.write_shift(0, u, "dbcs"); l.l != l.length; ) l.write_shift(1, 0);
      c.push(l);
    }
    l = Je(c), i.unshift(l), s += 8 + l.length;
  }
  for (f = 0; f < e.length; ++f)
    if (!(r && !r[e[f][0]]) && !(cf.indexOf(e[f][0]) > -1 || ff.indexOf(e[f][0]) > -1) && e[f][1] != null) {
      var d = e[f][1], m = 0;
      if (r) {
        m = +r[e[f][0]];
        var g = t[m];
        if (g.p == "version" && typeof d == "string") {
          var h = d.split(".");
          d = (+h[0] << 16) + (+h[1] || 0);
        }
        l = C0(g.t, d);
      } else {
        var _ = mh(d);
        _ == -1 && (_ = 31, d = String(d)), l = C0(_, d);
      }
      i.push(l), o = B(8), o.write_shift(4, r ? m : 2 + f), a.push(o), s += 8 + l.length;
    }
  var k = 8 * (i.length + 1);
  for (f = 0; f < i.length; ++f)
    a[f].write_shift(4, k), k += i[f].length;
  return n.write_shift(4, s), n.write_shift(4, i.length), Je([n].concat(a).concat(i));
}
function k0(e, r, t, n, a, i) {
  var s = B(a ? 68 : 48), f = [s];
  s.write_shift(2, 65534), s.write_shift(2, 0), s.write_shift(4, 842412599), s.write_shift(16, Ce.utils.consts.HEADER_CLSID, "hex"), s.write_shift(4, a ? 2 : 1), s.write_shift(16, r, "hex"), s.write_shift(4, a ? 68 : 48);
  var l = A0(e, t, n);
  if (f.push(l), a) {
    var o = A0(a, null, null);
    s.write_shift(16, i, "hex"), s.write_shift(4, 68 + l.length), f.push(o);
  }
  return Je(f);
}
function ph(e, r) {
  r || (r = B(e));
  for (var t = 0; t < e; ++t) r.write_shift(1, 0);
  return r;
}
function vh(e, r) {
  return e.read_shift(r) === 1;
}
function st(e, r) {
  return r || (r = B(2)), r.write_shift(2, +!!e), r;
}
function hf(e) {
  return e.read_shift(2, "u");
}
function Et(e, r) {
  return r || (r = B(2)), r.write_shift(2, e), r;
}
function uf(e, r, t) {
  return t || (t = B(2)), t.write_shift(1, r == "e" ? +e : +!!e), t.write_shift(1, r == "e" ? 1 : 0), t;
}
function xf(e, r, t) {
  var n = e.read_shift(t && t.biff >= 12 ? 2 : 1), a = "sbcs-cont";
  if (t && t.biff >= 8, !t || t.biff == 8) {
    var i = e.read_shift(1);
    i && (a = "dbcs-cont");
  } else t.biff == 12 && (a = "wstr");
  t.biff >= 2 && t.biff <= 5 && (a = "cpstr");
  var s = n ? e.read_shift(n, a) : "";
  return s;
}
function _h(e) {
  var r = e.t || "", t = B(3);
  t.write_shift(2, r.length), t.write_shift(1, 1);
  var n = B(2 * r.length);
  n.write_shift(2 * r.length, r, "utf16le");
  var a = [t, n];
  return Je(a);
}
function gh(e, r, t) {
  var n;
  if (t) {
    if (t.biff >= 2 && t.biff <= 5) return e.read_shift(r, "cpstr");
    if (t.biff >= 12) return e.read_shift(r, "dbcs-cont");
  }
  var a = e.read_shift(1);
  return a === 0 ? n = e.read_shift(r, "sbcs-cont") : n = e.read_shift(r, "dbcs-cont"), n;
}
function wh(e, r, t) {
  var n = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return n === 0 ? (e.l++, "") : gh(e, n, t);
}
function Th(e, r, t) {
  if (t.biff > 5) return wh(e, r, t);
  var n = e.read_shift(1);
  return n === 0 ? (e.l++, "") : e.read_shift(n, t.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function df(e, r, t) {
  return t || (t = B(3 + 2 * e.length)), t.write_shift(2, e.length), t.write_shift(1, 1), t.write_shift(31, e, "utf16le"), t;
}
function O0(e, r) {
  r || (r = B(6 + e.length * 2)), r.write_shift(4, 1 + e.length);
  for (var t = 0; t < e.length; ++t) r.write_shift(2, e.charCodeAt(t));
  return r.write_shift(2, 0), r;
}
function Eh(e) {
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
    n = n.slice(1), O0(n, r);
  else if (i & 2) {
    for (s = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), t = 0; t < s.length; ++t) r.write_shift(1, parseInt(s[t], 16));
    var f = a > -1 ? n.slice(0, a) : n;
    for (r.write_shift(4, 2 * (f.length + 1)), t = 0; t < f.length; ++t) r.write_shift(2, f.charCodeAt(t));
    r.write_shift(2, 0), i & 8 && O0(a > -1 ? n.slice(a + 1) : "", r);
  } else {
    for (s = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), t = 0; t < s.length; ++t) r.write_shift(1, parseInt(s[t], 16));
    for (var l = 0; n.slice(l * 3, l * 3 + 3) == "../" || n.slice(l * 3, l * 3 + 3) == "..\\"; ) ++l;
    for (r.write_shift(2, l), r.write_shift(4, n.length - 3 * l + 1), t = 0; t < n.length - 3 * l; ++t) r.write_shift(1, n.charCodeAt(t + 3 * l) & 255);
    for (r.write_shift(1, 0), r.write_shift(2, 65535), r.write_shift(2, 57005), t = 0; t < 6; ++t) r.write_shift(4, 0);
  }
  return r.slice(0, r.l);
}
function wr(e, r, t, n) {
  return n || (n = B(6)), n.write_shift(2, e), n.write_shift(2, r), n.write_shift(2, t || 0), n;
}
function Sh(e, r, t) {
  var n = t.biff > 8 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n, "i"), s = e.read_shift(n, "i");
  return [a, i, s];
}
function yh(e) {
  var r = e.read_shift(2), t = e.read_shift(2), n = e.read_shift(2), a = e.read_shift(2);
  return { s: { c: n, r }, e: { c: a, r: t } };
}
function mf(e, r) {
  return r || (r = B(8)), r.write_shift(2, e.s.r), r.write_shift(2, e.e.r), r.write_shift(2, e.s.c), r.write_shift(2, e.e.c), r;
}
function vi(e, r, t) {
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
function Fh(e, r) {
  var t = !r || r.biff == 8, n = B(t ? 112 : 54);
  for (n.write_shift(r.biff == 8 ? 2 : 1, 7), t && n.write_shift(1, 0), n.write_shift(4, 859007059), n.write_shift(4, 5458548 | (t ? 0 : 536870912)); n.l < n.length; ) n.write_shift(1, t ? 0 : 32);
  return n;
}
function Ch(e, r) {
  var t = !r || r.biff >= 8 ? 2 : 1, n = B(8 + t * e.name.length);
  n.write_shift(4, e.pos), n.write_shift(1, e.hs || 0), n.write_shift(1, e.dt), n.write_shift(1, e.name.length), r.biff >= 8 && n.write_shift(1, 1), n.write_shift(t * e.name.length, e.name, r.biff < 8 ? "sbcs" : "utf16le");
  var a = n.slice(0, n.l);
  return a.l = n.l, a;
}
function Ah(e, r) {
  var t = B(8);
  t.write_shift(4, e.Count), t.write_shift(4, e.Unique);
  for (var n = [], a = 0; a < e.length; ++a) n[a] = _h(e[a]);
  var i = Je([t].concat(n));
  return i.parts = [t.length].concat(n.map(function(s) {
    return s.length;
  })), i;
}
function kh() {
  var e = B(18);
  return e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 29280), e.write_shift(2, 17600), e.write_shift(2, 56), e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 1), e.write_shift(2, 500), e;
}
function Oh(e) {
  var r = B(18), t = 1718;
  return e && e.RTL && (t |= 64), r.write_shift(2, t), r.write_shift(4, 0), r.write_shift(4, 64), r.write_shift(4, 0), r.write_shift(4, 0), r;
}
function Rh(e, r) {
  var t = e.name || "Arial", n = r && r.biff == 5, a = n ? 15 + t.length : 16 + 2 * t.length, i = B(a);
  return i.write_shift(2, e.sz * 20), i.write_shift(4, 0), i.write_shift(2, 400), i.write_shift(4, 0), i.write_shift(2, 0), i.write_shift(1, t.length), n || i.write_shift(1, 1), i.write_shift((n ? 1 : 2) * t.length, t, n ? "sbcs" : "utf16le"), i;
}
function Ih(e, r, t, n) {
  var a = B(10);
  return wr(e, r, n, a), a.write_shift(4, t), a;
}
function Dh(e, r, t, n, a) {
  var i = !a || a.biff == 8, s = B(8 + +i + (1 + i) * t.length);
  return wr(e, r, n, s), s.write_shift(2, t.length), i && s.write_shift(1, 1), s.write_shift((1 + i) * t.length, t, i ? "utf16le" : "sbcs"), s;
}
function Nh(e, r, t, n) {
  var a = t && t.biff == 5;
  n || (n = B(a ? 3 + r.length : 5 + 2 * r.length)), n.write_shift(2, e), n.write_shift(a ? 1 : 2, r.length), a || n.write_shift(1, 1), n.write_shift((a ? 1 : 2) * r.length, r, a ? "sbcs" : "utf16le");
  var i = n.length > n.l ? n.slice(0, n.l) : n;
  return i.l == null && (i.l = i.length), i;
}
function Ph(e, r) {
  var t = r.biff == 8 || !r.biff ? 4 : 2, n = B(2 * t + 6);
  return n.write_shift(t, e.s.r), n.write_shift(t, e.e.r + 1), n.write_shift(2, e.s.c), n.write_shift(2, e.e.c + 1), n.write_shift(2, 0), n;
}
function R0(e, r, t, n) {
  var a = t && t.biff == 5;
  n || (n = B(a ? 16 : 20)), n.write_shift(2, 0), e.style ? (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, 65524)) : (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, r << 4));
  var i = 0;
  return e.numFmtId > 0 && a && (i |= 1024), n.write_shift(4, i), n.write_shift(4, 0), a || n.write_shift(4, 0), n.write_shift(2, 0), n;
}
function Mh(e) {
  var r = B(8);
  return r.write_shift(4, 0), r.write_shift(2, 0), r.write_shift(2, 0), r;
}
function Lh(e, r, t, n, a, i) {
  var s = B(8);
  return wr(e, r, n, s), uf(t, i, s), s;
}
function Bh(e, r, t, n) {
  var a = B(14);
  return wr(e, r, n, a), gr(t, a), a;
}
function bh(e, r, t) {
  if (t.biff < 8) return Uh(e, r, t);
  for (var n = [], a = e.l + r, i = e.read_shift(t.biff > 8 ? 4 : 2); i-- !== 0; ) n.push(Sh(e, t.biff > 8 ? 12 : 6, t));
  if (e.l != a) throw new Error("Bad ExternSheet: " + e.l + " != " + a);
  return n;
}
function Uh(e, r, t) {
  e[e.l + 1] == 3 && e[e.l]++;
  var n = xf(e, r, t);
  return n.charCodeAt(0) == 3 ? n.slice(1) : n;
}
function Wh(e) {
  var r = B(2 + e.length * 8);
  r.write_shift(2, e.length);
  for (var t = 0; t < e.length; ++t) mf(e[t], r);
  return r;
}
function Hh(e) {
  var r = B(24), t = ze(e[0]);
  r.write_shift(2, t.r), r.write_shift(2, t.r), r.write_shift(2, t.c), r.write_shift(2, t.c);
  for (var n = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), a = 0; a < 16; ++a) r.write_shift(1, parseInt(n[a], 16));
  return Je([r, Eh(e[1])]);
}
function Gh(e) {
  var r = e[1].Tooltip, t = B(10 + 2 * (r.length + 1));
  t.write_shift(2, 2048);
  var n = ze(e[0]);
  t.write_shift(2, n.r), t.write_shift(2, n.r), t.write_shift(2, n.c), t.write_shift(2, n.c);
  for (var a = 0; a < r.length; ++a) t.write_shift(2, r.charCodeAt(a));
  return t.write_shift(2, 0), t;
}
function Vh(e) {
  return e || (e = B(4)), e.write_shift(2, 1), e.write_shift(2, 1), e;
}
function $h(e, r, t) {
  if (!t.cellStyles) return Mt(e, r);
  var n = t && t.biff >= 12 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n), s = e.read_shift(n), f = e.read_shift(n), l = e.read_shift(2);
  n == 2 && (e.l += 2);
  var o = { s: a, e: i, w: s, ixfe: f, flags: l };
  return (t.biff >= 5 || !t.biff) && (o.level = l >> 8 & 7), o;
}
function zh(e, r) {
  var t = B(12);
  t.write_shift(2, r), t.write_shift(2, r), t.write_shift(2, e.width * 256), t.write_shift(2, 0);
  var n = 0;
  return e.hidden && (n |= 1), t.write_shift(1, n), n = e.level || 0, t.write_shift(1, n), t.write_shift(2, 0), t;
}
function Xh(e) {
  for (var r = B(2 * e), t = 0; t < e; ++t) r.write_shift(2, t + 1);
  return r;
}
function jh(e, r, t) {
  var n = B(15);
  return On(n, e, r), n.write_shift(8, t, "f"), n;
}
function Yh(e, r, t) {
  var n = B(9);
  return On(n, e, r), n.write_shift(2, t), n;
}
var Kh = /* @__PURE__ */ (function() {
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
  }, r = si({
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
  function t(f, l) {
    var o = [], c = _r(1);
    switch (l.type) {
      case "base64":
        c = Ot($t(f));
        break;
      case "binary":
        c = Ot(f);
        break;
      case "buffer":
      case "array":
        c = f;
        break;
    }
    dt(c, 0);
    var u = c.read_shift(1), d = !!(u & 136), m = !1, g = !1;
    switch (u) {
      case 2:
        break;
      // dBASE II
      case 3:
        break;
      // dBASE III
      case 48:
        m = !0, d = !0;
        break;
      // VFP
      case 49:
        m = !0, d = !0;
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
        g = !0;
        break;
      // dBASE Level 7 with memo
      // case 0xCB dBASE IV SQL table files with memo
      case 245:
        break;
      // FoxPro 2.x with memo
      // case 0xFB FoxBASE
      default:
        throw new Error("DBF Unsupported Version: " + u.toString(16));
    }
    var h = 0, _ = 521;
    u == 2 && (h = c.read_shift(2)), c.l += 3, u != 2 && (h = c.read_shift(4)), h > 1048576 && (h = 1e6), u != 2 && (_ = c.read_shift(2));
    var k = c.read_shift(2), O = l.codepage || 1252;
    u != 2 && (c.l += 16, c.read_shift(1), c[c.l] !== 0 && (O = e[c[c.l]]), c.l += 1, c.l += 2), g && (c.l += 36);
    for (var C = [], L = {}, Y = Math.min(c.length, u == 2 ? 521 : _ - 10 - (m ? 264 : 0)), q = g ? 32 : 11; c.l < Y && c[c.l] != 13; )
      switch (L = {}, L.name = jn.utils.decode(O, c.slice(c.l, c.l + q)).replace(/[\u0000\r\n].*$/g, ""), c.l += q, L.type = String.fromCharCode(c.read_shift(1)), u != 2 && !g && (L.offset = c.read_shift(4)), L.len = c.read_shift(1), u == 2 && (L.offset = c.read_shift(2)), L.dec = c.read_shift(1), L.name.length && C.push(L), u != 2 && (c.l += g ? 13 : 14), L.type) {
        case "B":
          (!m || L.len != 8) && l.WTF && console.log("Skipping " + L.name + ":" + L.type);
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
    if (c[c.l] !== 13 && (c.l = _ - 1), c.read_shift(1) !== 13) throw new Error("DBF Terminator not found " + c.l + " " + c[c.l]);
    c.l = _;
    var F = 0, b = 0;
    for (o[0] = [], b = 0; b != C.length; ++b) o[0][b] = C[b].name;
    for (; h-- > 0; ) {
      if (c[c.l] === 42) {
        c.l += k;
        continue;
      }
      for (++c.l, o[++F] = [], b = 0, b = 0; b != C.length; ++b) {
        var D = c.slice(c.l, c.l + C[b].len);
        c.l += C[b].len, dt(D, 0);
        var W = jn.utils.decode(O, D);
        switch (C[b].type) {
          case "C":
            W.trim().length && (o[F][b] = W.replace(/\s+$/, ""));
            break;
          case "D":
            W.length === 8 ? o[F][b] = new Date(+W.slice(0, 4), +W.slice(4, 6) - 1, +W.slice(6, 8)) : o[F][b] = W;
            break;
          case "F":
            o[F][b] = parseFloat(W.trim());
            break;
          case "+":
          case "I":
            o[F][b] = g ? D.read_shift(-4, "i") ^ 2147483648 : D.read_shift(4, "i");
            break;
          case "L":
            switch (W.trim().toUpperCase()) {
              case "Y":
              case "T":
                o[F][b] = !0;
                break;
              case "N":
              case "F":
                o[F][b] = !1;
                break;
              case "":
              case "?":
                break;
              default:
                throw new Error("DBF Unrecognized L:|" + W + "|");
            }
            break;
          case "M":
            if (!d) throw new Error("DBF Unexpected MEMO for type " + u.toString(16));
            o[F][b] = "##MEMO##" + (g ? parseInt(W.trim(), 10) : D.read_shift(4));
            break;
          case "N":
            W = W.replace(/\u0000/g, "").trim(), W && W != "." && (o[F][b] = +W || 0);
            break;
          case "@":
            o[F][b] = new Date(D.read_shift(-8, "f") - 621356832e5);
            break;
          case "T":
            o[F][b] = new Date((D.read_shift(4) - 2440588) * 864e5 + D.read_shift(4));
            break;
          case "Y":
            o[F][b] = D.read_shift(4, "i") / 1e4 + D.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
            break;
          case "O":
            o[F][b] = -D.read_shift(-8, "f");
            break;
          case "B":
            if (m && C[b].len == 8) {
              o[F][b] = D.read_shift(8, "f");
              break;
            }
          /* falls through */
          case "G":
          case "P":
            D.l += C[b].len;
            break;
          case "0":
            if (C[b].name === "_NullFlags") break;
          /* falls through */
          default:
            throw new Error("DBF Unsupported data type " + C[b].type);
        }
      }
    }
    if (u != 2 && c.l < c.length && c[c.l++] != 26) throw new Error("DBF EOF Marker missing " + (c.l - 1) + " of " + c.length + " " + c[c.l - 1].toString(16));
    return l && l.sheetRows && (o = o.slice(0, l.sheetRows)), l.DBF = C, o;
  }
  function n(f, l) {
    var o = l || {};
    o.dateNF || (o.dateNF = "yyyymmdd");
    var c = Yr(t(f, o), o);
    return c["!cols"] = o.DBF.map(function(u) {
      return {
        wch: u.len,
        DBF: u
      };
    }), delete o.DBF, c;
  }
  function a(f, l) {
    try {
      return Tr(n(f, l), l);
    } catch (o) {
      if (l && l.WTF) throw o;
    }
    return { SheetNames: [], Sheets: {} };
  }
  var i = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
  function s(f, l) {
    var o = l || {};
    if (+o.codepage >= 0 && mn(+o.codepage), o.type == "string") throw new Error("Cannot write DBF to JS string");
    var c = lt(), u = sa(f, { header: 1, raw: !0, cellDates: !0 }), d = u[0], m = u.slice(1), g = f["!cols"] || [], h = 0, _ = 0, k = 0, O = 1;
    for (h = 0; h < d.length; ++h) {
      if (((g[h] || {}).DBF || {}).name) {
        d[h] = g[h].DBF.name, ++k;
        continue;
      }
      if (d[h] != null) {
        if (++k, typeof d[h] == "number" && (d[h] = d[h].toString(10)), typeof d[h] != "string") throw new Error("DBF Invalid column name " + d[h] + " |" + typeof d[h] + "|");
        if (d.indexOf(d[h]) !== h) {
          for (_ = 0; _ < 1024; ++_)
            if (d.indexOf(d[h] + "_" + _) == -1) {
              d[h] += "_" + _;
              break;
            }
        }
      }
    }
    var C = Re(f["!ref"]), L = [], Y = [], q = [];
    for (h = 0; h <= C.e.c - C.s.c; ++h) {
      var F = "", b = "", D = 0, W = [];
      for (_ = 0; _ < m.length; ++_)
        m[_][h] != null && W.push(m[_][h]);
      if (W.length == 0 || d[h] == null) {
        L[h] = "?";
        continue;
      }
      for (_ = 0; _ < W.length; ++_) {
        switch (typeof W[_]) {
          /* TODO: check if L2 compat is desired */
          case "number":
            b = "B";
            break;
          case "string":
            b = "C";
            break;
          case "boolean":
            b = "L";
            break;
          case "object":
            b = W[_] instanceof Date ? "D" : "C";
            break;
          default:
            b = "C";
        }
        D = Math.max(D, String(W[_]).length), F = F && F != b ? "C" : b;
      }
      D > 250 && (D = 250), b = ((g[h] || {}).DBF || {}).type, b == "C" && g[h].DBF.len > D && (D = g[h].DBF.len), F == "B" && b == "N" && (F = "N", q[h] = g[h].DBF.dec, D = g[h].DBF.len), Y[h] = F == "C" || b == "N" ? D : i[F] || 0, O += Y[h], L[h] = F;
    }
    var V = c.next(32);
    for (V.write_shift(4, 318902576), V.write_shift(4, m.length), V.write_shift(2, 296 + 32 * k), V.write_shift(2, O), h = 0; h < 4; ++h) V.write_shift(4, 0);
    for (V.write_shift(4, 0 | (+r[
      /*::String(*/
      ps
      /*::)*/
    ] || 3) << 8), h = 0, _ = 0; h < d.length; ++h)
      if (d[h] != null) {
        var z = c.next(32), ee = (d[h].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        z.write_shift(1, ee, "sbcs"), z.write_shift(1, L[h] == "?" ? "C" : L[h], "sbcs"), z.write_shift(4, _), z.write_shift(1, Y[h] || i[L[h]] || 0), z.write_shift(1, q[h] || 0), z.write_shift(1, 2), z.write_shift(4, 0), z.write_shift(1, 0), z.write_shift(4, 0), z.write_shift(4, 0), _ += Y[h] || i[L[h]] || 0;
      }
    var Fe = c.next(264);
    for (Fe.write_shift(4, 13), h = 0; h < 65; ++h) Fe.write_shift(4, 0);
    for (h = 0; h < m.length; ++h) {
      var ce = c.next(O);
      for (ce.write_shift(1, 0), _ = 0; _ < d.length; ++_)
        if (d[_] != null)
          switch (L[_]) {
            case "L":
              ce.write_shift(1, m[h][_] == null ? 63 : m[h][_] ? 84 : 70);
              break;
            case "B":
              ce.write_shift(8, m[h][_] || 0, "f");
              break;
            case "N":
              var je = "0";
              for (typeof m[h][_] == "number" && (je = m[h][_].toFixed(q[_] || 0)), k = 0; k < Y[_] - je.length; ++k) ce.write_shift(1, 32);
              ce.write_shift(1, je, "sbcs");
              break;
            case "D":
              m[h][_] ? (ce.write_shift(4, ("0000" + m[h][_].getFullYear()).slice(-4), "sbcs"), ce.write_shift(2, ("00" + (m[h][_].getMonth() + 1)).slice(-2), "sbcs"), ce.write_shift(2, ("00" + m[h][_].getDate()).slice(-2), "sbcs")) : ce.write_shift(8, "00000000", "sbcs");
              break;
            case "C":
              var Le = String(m[h][_] != null ? m[h][_] : "").slice(0, Y[_]);
              for (ce.write_shift(1, Le, "sbcs"), k = 0; k < Y[_] - Le.length; ++k) ce.write_shift(1, 32);
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
})(), Jh = /* @__PURE__ */ (function() {
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
  }, r = new RegExp("\x1BN(" + qe(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm"), t = function(d, m) {
    var g = e[m];
    return typeof g == "number" ? e0(g) : g;
  }, n = function(d, m, g) {
    var h = m.charCodeAt(0) - 32 << 4 | g.charCodeAt(0) - 48;
    return h == 59 ? d : e0(h);
  };
  e["|"] = 254;
  function a(d, m) {
    switch (m.type) {
      case "base64":
        return i($t(d), m);
      case "binary":
        return i(d, m);
      case "buffer":
        return i(ve && Buffer.isBuffer(d) ? d.toString("binary") : yn(d), m);
      case "array":
        return i(ha(d), m);
    }
    throw new Error("Unrecognized type " + m.type);
  }
  function i(d, m) {
    var g = d.split(/[\n\r]+/), h = -1, _ = -1, k = 0, O = 0, C = [], L = [], Y = null, q = {}, F = [], b = [], D = [], W = 0, V;
    for (+m.codepage >= 0 && mn(+m.codepage); k !== g.length; ++k) {
      W = 0;
      var z = g[k].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, n).replace(r, t), ee = z.replace(/;;/g, "\0").split(";").map(function(y) {
        return y.replace(/\u0000/g, ";");
      }), Fe = ee[0], ce;
      if (z.length > 0) switch (Fe) {
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
          var je = !1, Le = !1, Ft = !1, Ve = !1, _t = -1, ut = -1;
          for (O = 1; O < ee.length; ++O) switch (ee[O].charAt(0)) {
            case "A":
              break;
            // TODO: comment
            case "X":
              _ = parseInt(ee[O].slice(1)) - 1, Le = !0;
              break;
            case "Y":
              for (h = parseInt(ee[O].slice(1)) - 1, Le || (_ = 0), V = C.length; V <= h; ++V) C[V] = [];
              break;
            case "K":
              ce = ee[O].slice(1), ce.charAt(0) === '"' ? ce = ce.slice(1, ce.length - 1) : ce === "TRUE" ? ce = !0 : ce === "FALSE" ? ce = !1 : isNaN(Gt(ce)) ? isNaN(vn(ce).getDate()) || (ce = ft(ce)) : (ce = Gt(ce), Y !== null && ks(Y) && (ce = Ds(ce))), je = !0;
              break;
            case "E":
              Ve = !0;
              var S = Yu(ee[O].slice(1), { r: h, c: _ });
              C[h][_] = [C[h][_], S];
              break;
            case "S":
              Ft = !0, C[h][_] = [C[h][_], "S5S"];
              break;
            case "G":
              break;
            // unknown
            case "R":
              _t = parseInt(ee[O].slice(1)) - 1;
              break;
            case "C":
              ut = parseInt(ee[O].slice(1)) - 1;
              break;
            default:
              if (m && m.WTF) throw new Error("SYLK bad record " + z);
          }
          if (je && (C[h][_] && C[h][_].length == 2 ? C[h][_][0] = ce : C[h][_] = ce, Y = null), Ft) {
            if (Ve) throw new Error("SYLK shared formula cannot have own formula");
            var M = _t > -1 && C[_t][ut];
            if (!M || !M[1]) throw new Error("SYLK shared formula cannot find base");
            C[h][_][1] = Ku(M[1], { r: h - _t, c: _ - ut });
          }
          break;
        case "F":
          var A = 0;
          for (O = 1; O < ee.length; ++O) switch (ee[O].charAt(0)) {
            case "X":
              _ = parseInt(ee[O].slice(1)) - 1, ++A;
              break;
            case "Y":
              for (h = parseInt(ee[O].slice(1)) - 1, V = C.length; V <= h; ++V) C[V] = [];
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
              for (D = ee[O].slice(1).split(" "), V = parseInt(D[0], 10); V <= parseInt(D[1], 10); ++V)
                W = parseInt(D[2], 10), b[V - 1] = W === 0 ? { hidden: !0 } : { wch: W }, _i(b[V - 1]);
              break;
            case "C":
              _ = parseInt(ee[O].slice(1)) - 1, b[_] || (b[_] = {});
              break;
            case "R":
              h = parseInt(ee[O].slice(1)) - 1, F[h] || (F[h] = {}), W > 0 ? (F[h].hpt = W, F[h].hpx = wf(W)) : W === 0 && (F[h].hidden = !0);
              break;
            default:
              if (m && m.WTF) throw new Error("SYLK bad record " + z);
          }
          A < 1 && (Y = null);
          break;
        default:
          if (m && m.WTF) throw new Error("SYLK bad record " + z);
      }
    }
    return F.length > 0 && (q["!rows"] = F), b.length > 0 && (q["!cols"] = b), m && m.sheetRows && (C = C.slice(0, m.sheetRows)), [C, q];
  }
  function s(d, m) {
    var g = a(d, m), h = g[0], _ = g[1], k = Yr(h, m);
    return qe(_).forEach(function(O) {
      k[O] = _[O];
    }), k;
  }
  function f(d, m) {
    return Tr(s(d, m), m);
  }
  function l(d, m, g, h) {
    var _ = "C;Y" + (g + 1) + ";X" + (h + 1) + ";K";
    switch (d.t) {
      case "n":
        _ += d.v || 0, d.f && !d.F && (_ += ";E" + wi(d.f, { r: g, c: h }));
        break;
      case "b":
        _ += d.v ? "TRUE" : "FALSE";
        break;
      case "e":
        _ += d.w || d.v;
        break;
      case "d":
        _ += '"' + (d.w || d.v) + '"';
        break;
      case "s":
        _ += '"' + d.v.replace(/"/g, "").replace(/;/g, ";;") + '"';
        break;
    }
    return _;
  }
  function o(d, m) {
    m.forEach(function(g, h) {
      var _ = "F;W" + (h + 1) + " " + (h + 1) + " ";
      g.hidden ? _ += "0" : (typeof g.width == "number" && !g.wpx && (g.wpx = ra(g.width)), typeof g.wpx == "number" && !g.wch && (g.wch = na(g.wpx)), typeof g.wch == "number" && (_ += Math.round(g.wch))), _.charAt(_.length - 1) != " " && d.push(_);
    });
  }
  function c(d, m) {
    m.forEach(function(g, h) {
      var _ = "F;";
      g.hidden ? _ += "M0;" : g.hpt ? _ += "M" + 20 * g.hpt + ";" : g.hpx && (_ += "M" + 20 * aa(g.hpx) + ";"), _.length > 2 && d.push(_ + "R" + (h + 1));
    });
  }
  function u(d, m) {
    var g = ["ID;PWXL;N;E"], h = [], _ = Re(d["!ref"]), k, O = Array.isArray(d), C = `\r
`;
    g.push("P;PGeneral"), g.push("F;P0;DG0G8;M255"), d["!cols"] && o(g, d["!cols"]), d["!rows"] && c(g, d["!rows"]), g.push("B;Y" + (_.e.r - _.s.r + 1) + ";X" + (_.e.c - _.s.c + 1) + ";D" + [_.s.c, _.s.r, _.e.c, _.e.r].join(" "));
    for (var L = _.s.r; L <= _.e.r; ++L)
      for (var Y = _.s.c; Y <= _.e.c; ++Y) {
        var q = ye({ r: L, c: Y });
        k = O ? (d[L] || [])[Y] : d[q], !(!k || k.v == null && (!k.f || k.F)) && h.push(l(k, d, L, Y));
      }
    return g.join(C) + C + h.join(C) + C + "E" + C;
  }
  return {
    to_workbook: f,
    to_sheet: s,
    from_sheet: u
  };
})(), Qh = /* @__PURE__ */ (function() {
  function e(i, s) {
    switch (s.type) {
      case "base64":
        return r($t(i), s);
      case "binary":
        return r(i, s);
      case "buffer":
        return r(ve && Buffer.isBuffer(i) ? i.toString("binary") : yn(i), s);
      case "array":
        return r(ha(i), s);
    }
    throw new Error("Unrecognized type " + s.type);
  }
  function r(i, s) {
    for (var f = i.split(`
`), l = -1, o = -1, c = 0, u = []; c !== f.length; ++c) {
      if (f[c].trim() === "BOT") {
        u[++l] = [], o = 0;
        continue;
      }
      if (!(l < 0)) {
        var d = f[c].trim().split(","), m = d[0], g = d[1];
        ++c;
        for (var h = f[c] || ""; (h.match(/["]/g) || []).length & 1 && c < f.length - 1; ) h += `
` + f[++c];
        switch (h = h.trim(), +m) {
          case -1:
            if (h === "BOT") {
              u[++l] = [], o = 0;
              continue;
            } else if (h !== "EOD") throw new Error("Unrecognized DIF special command " + h);
            break;
          case 0:
            h === "TRUE" ? u[l][o] = !0 : h === "FALSE" ? u[l][o] = !1 : isNaN(Gt(g)) ? isNaN(vn(g).getDate()) ? u[l][o] = g : u[l][o] = ft(g) : u[l][o] = Gt(g), ++o;
            break;
          case 1:
            h = h.slice(1, h.length - 1), h = h.replace(/""/g, '"'), h && h.match(/^=".*"$/) && (h = h.slice(2, -1)), u[l][o++] = h !== "" ? h : null;
            break;
        }
        if (h === "EOD") break;
      }
    }
    return s && s.sheetRows && (u = u.slice(0, s.sheetRows)), u;
  }
  function t(i, s) {
    return Yr(e(i, s), s);
  }
  function n(i, s) {
    return Tr(t(i, s), s);
  }
  var a = /* @__PURE__ */ (function() {
    var i = function(l, o, c, u, d) {
      l.push(o), l.push(c + "," + u), l.push('"' + d.replace(/"/g, '""') + '"');
    }, s = function(l, o, c, u) {
      l.push(o + "," + c), l.push(o == 1 ? '"' + u.replace(/"/g, '""') + '"' : u);
    };
    return function(l) {
      var o = [], c = Re(l["!ref"]), u, d = Array.isArray(l);
      i(o, "TABLE", 0, 1, "sheetjs"), i(o, "VECTORS", 0, c.e.r - c.s.r + 1, ""), i(o, "TUPLES", 0, c.e.c - c.s.c + 1, ""), i(o, "DATA", 0, 0, "");
      for (var m = c.s.r; m <= c.e.r; ++m) {
        s(o, -1, 0, "BOT");
        for (var g = c.s.c; g <= c.e.c; ++g) {
          var h = ye({ r: m, c: g });
          if (u = d ? (l[m] || [])[g] : l[h], !u) {
            s(o, 1, 0, "");
            continue;
          }
          switch (u.t) {
            case "n":
              var _ = u.w;
              !_ && u.v != null && (_ = u.v), _ == null ? u.f && !u.F ? s(o, 1, 0, "=" + u.f) : s(o, 1, 0, "") : s(o, 0, _, "V");
              break;
            case "b":
              s(o, 0, u.v ? 1 : 0, u.v ? "TRUE" : "FALSE");
              break;
            case "s":
              s(o, 1, 0, isNaN(u.v) ? u.v : '="' + u.v + '"');
              break;
            case "d":
              u.w || (u.w = rr(u.z || Me[14], ct(ft(u.v)))), s(o, 0, u.w, "V");
              break;
            default:
              s(o, 1, 0, "");
          }
        }
      }
      s(o, -1, 0, "EOD");
      var k = `\r
`, O = o.join(k);
      return O;
    };
  })();
  return {
    to_workbook: n,
    to_sheet: t,
    from_sheet: a
  };
})(), pf = /* @__PURE__ */ (function() {
  function e(u) {
    return u.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
  }
  function r(u) {
    return u.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
  }
  function t(u, d) {
    for (var m = u.split(`
`), g = -1, h = -1, _ = 0, k = []; _ !== m.length; ++_) {
      var O = m[_].trim().split(":");
      if (O[0] === "cell") {
        var C = ze(O[1]);
        if (k.length <= C.r) for (g = k.length; g <= C.r; ++g) k[g] || (k[g] = []);
        switch (g = C.r, h = C.c, O[2]) {
          case "t":
            k[g][h] = e(O[3]);
            break;
          case "v":
            k[g][h] = +O[3];
            break;
          case "vtf":
            var L = O[O.length - 1];
          /* falls through */
          case "vtc":
            switch (O[3]) {
              case "nl":
                k[g][h] = !!+O[4];
                break;
              default:
                k[g][h] = +O[4];
                break;
            }
            O[2] == "vtf" && (k[g][h] = [k[g][h], L]);
        }
      }
    }
    return d && d.sheetRows && (k = k.slice(0, d.sheetRows)), k;
  }
  function n(u, d) {
    return Yr(t(u, d), d);
  }
  function a(u, d) {
    return Tr(n(u, d), d);
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
`, f = [
    "# SocialCalc Spreadsheet Control Save",
    "part:sheet"
  ].join(`
`), l = "--SocialCalcSpreadsheetControlSave--";
  function o(u) {
    if (!u || !u["!ref"]) return "";
    for (var d = [], m = [], g, h = "", _ = vt(u["!ref"]), k = Array.isArray(u), O = _.s.r; O <= _.e.r; ++O)
      for (var C = _.s.c; C <= _.e.c; ++C)
        if (h = ye({ r: O, c: C }), g = k ? (u[O] || [])[C] : u[h], !(!g || g.v == null || g.t === "z")) {
          switch (m = ["cell", h, "t"], g.t) {
            case "s":
            case "str":
              m.push(r(g.v));
              break;
            case "n":
              g.f ? (m[2] = "vtf", m[3] = "n", m[4] = g.v, m[5] = r(g.f)) : (m[2] = "v", m[3] = g.v);
              break;
            case "b":
              m[2] = "vt" + (g.f ? "f" : "c"), m[3] = "nl", m[4] = g.v ? "1" : "0", m[5] = r(g.f || (g.v ? "TRUE" : "FALSE"));
              break;
            case "d":
              var L = ct(ft(g.v));
              m[2] = "vtc", m[3] = "nd", m[4] = "" + L, m[5] = g.w || rr(g.z || Me[14], L);
              break;
            case "e":
              continue;
          }
          d.push(m.join(":"));
        }
    return d.push("sheet:c:" + (_.e.c - _.s.c + 1) + ":r:" + (_.e.r - _.s.r + 1) + ":tvf:1"), d.push("valueformat:1:text-wiki"), d.join(`
`);
  }
  function c(u) {
    return [i, s, f, s, o(u), l].join(`
`);
  }
  return {
    to_workbook: a,
    to_sheet: n,
    from_sheet: c
  };
})(), Zh = /* @__PURE__ */ (function() {
  function e(c, u, d, m, g) {
    g.raw ? u[d][m] = c : c === "" || (c === "TRUE" ? u[d][m] = !0 : c === "FALSE" ? u[d][m] = !1 : isNaN(Gt(c)) ? isNaN(vn(c).getDate()) ? u[d][m] = c : u[d][m] = ft(c) : u[d][m] = Gt(c));
  }
  function r(c, u) {
    var d = u || {}, m = [];
    if (!c || c.length === 0) return m;
    for (var g = c.split(/[\r\n]/), h = g.length - 1; h >= 0 && g[h].length === 0; ) --h;
    for (var _ = 10, k = 0, O = 0; O <= h; ++O)
      k = g[O].indexOf(" "), k == -1 ? k = g[O].length : k++, _ = Math.max(_, k);
    for (O = 0; O <= h; ++O) {
      m[O] = [];
      var C = 0;
      for (e(g[O].slice(0, _).trim(), m, O, C, d), C = 1; C <= (g[O].length - _) / 10 + 1; ++C)
        e(g[O].slice(_ + (C - 1) * 10, _ + C * 10).trim(), m, O, C, d);
    }
    return d.sheetRows && (m = m.slice(0, d.sheetRows)), m;
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
    for (var u = {}, d = !1, m = 0, g = 0; m < c.length; ++m)
      (g = c.charCodeAt(m)) == 34 ? d = !d : !d && g in t && (u[g] = (u[g] || 0) + 1);
    g = [];
    for (m in u) Object.prototype.hasOwnProperty.call(u, m) && g.push([u[m], m]);
    if (!g.length) {
      u = n;
      for (m in u) Object.prototype.hasOwnProperty.call(u, m) && g.push([u[m], m]);
    }
    return g.sort(function(h, _) {
      return h[0] - _[0] || n[h[1]] - n[_[1]];
    }), t[g.pop()[1]] || 44;
  }
  function i(c, u) {
    var d = u || {}, m = "", g = d.dense ? [] : {}, h = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    c.slice(0, 4) == "sep=" ? c.charCodeAt(5) == 13 && c.charCodeAt(6) == 10 ? (m = c.charAt(4), c = c.slice(7)) : c.charCodeAt(5) == 13 || c.charCodeAt(5) == 10 ? (m = c.charAt(4), c = c.slice(6)) : m = a(c.slice(0, 1024)) : d && d.FS ? m = d.FS : m = a(c.slice(0, 1024));
    var _ = 0, k = 0, O = 0, C = 0, L = 0, Y = m.charCodeAt(0), q = !1, F = 0, b = c.charCodeAt(0);
    c = c.replace(/\r\n/mg, `
`);
    var D = d.dateNF != null ? dc(d.dateNF) : null;
    function W() {
      var V = c.slice(C, L), z = {};
      if (V.charAt(0) == '"' && V.charAt(V.length - 1) == '"' && (V = V.slice(1, -1).replace(/""/g, '"')), V.length === 0) z.t = "z";
      else if (d.raw)
        z.t = "s", z.v = V;
      else if (V.trim().length === 0)
        z.t = "s", z.v = V;
      else if (V.charCodeAt(0) == 61)
        V.charCodeAt(1) == 34 && V.charCodeAt(V.length - 1) == 34 ? (z.t = "s", z.v = V.slice(2, -1).replace(/""/g, '"')) : Ju(V) ? (z.t = "n", z.f = V.slice(1)) : (z.t = "s", z.v = V);
      else if (V == "TRUE")
        z.t = "b", z.v = !0;
      else if (V == "FALSE")
        z.t = "b", z.v = !1;
      else if (!isNaN(O = Gt(V)))
        z.t = "n", d.cellText !== !1 && (z.w = V), z.v = O;
      else if (!isNaN(vn(V).getDate()) || D && V.match(D)) {
        z.z = d.dateNF || Me[14];
        var ee = 0;
        D && V.match(D) && (V = mc(V, d.dateNF, V.match(D) || []), ee = 1), d.cellDates ? (z.t = "d", z.v = ft(V, ee)) : (z.t = "n", z.v = ct(ft(V, ee))), d.cellText !== !1 && (z.w = rr(z.z, z.v instanceof Date ? ct(z.v) : z.v)), d.cellNF || delete z.z;
      } else
        z.t = "s", z.v = V;
      if (z.t == "z" || (d.dense ? (g[_] || (g[_] = []), g[_][k] = z) : g[ye({ c: k, r: _ })] = z), C = L + 1, b = c.charCodeAt(C), h.e.c < k && (h.e.c = k), h.e.r < _ && (h.e.r = _), F == Y) ++k;
      else if (k = 0, ++_, d.sheetRows && d.sheetRows <= _) return !0;
    }
    e: for (; L < c.length; ++L) switch (F = c.charCodeAt(L)) {
      case 34:
        b === 34 && (q = !q);
        break;
      case Y:
      case 10:
      case 13:
        if (!q && W()) break e;
        break;
    }
    return L - C > 0 && W(), g["!ref"] = Ue(h), g;
  }
  function s(c, u) {
    return !(u && u.PRN) || u.FS || c.slice(0, 4) == "sep=" || c.indexOf("	") >= 0 || c.indexOf(",") >= 0 || c.indexOf(";") >= 0 ? i(c, u) : Yr(r(c, u), u);
  }
  function f(c, u) {
    var d = "", m = u.type == "string" ? [0, 0, 0, 0] : cp(c, u);
    switch (u.type) {
      case "base64":
        d = $t(c);
        break;
      case "binary":
        d = c;
        break;
      case "buffer":
        u.codepage == 65001 ? d = c.toString("utf8") : u.codepage && typeof jn < "u" || (d = ve && Buffer.isBuffer(c) ? c.toString("binary") : yn(c));
        break;
      case "array":
        d = ha(c);
        break;
      case "string":
        d = c;
        break;
      default:
        throw new Error("Unrecognized type " + u.type);
    }
    return m[0] == 239 && m[1] == 187 && m[2] == 191 ? d = ln(d.slice(3)) : u.type != "string" && u.type != "buffer" && u.codepage == 65001 ? d = ln(d) : u.type == "binary" && typeof jn < "u", d.slice(0, 19) == "socialcalc:version:" ? pf.to_sheet(u.type == "string" ? d : ln(d), u) : s(d, u);
  }
  function l(c, u) {
    return Tr(f(c, u), u);
  }
  function o(c) {
    for (var u = [], d = Re(c["!ref"]), m, g = Array.isArray(c), h = d.s.r; h <= d.e.r; ++h) {
      for (var _ = [], k = d.s.c; k <= d.e.c; ++k) {
        var O = ye({ r: h, c: k });
        if (m = g ? (c[h] || [])[k] : c[O], !m || m.v == null) {
          _.push("          ");
          continue;
        }
        for (var C = (m.w || (zt(m), m.w) || "").slice(0, 10); C.length < 10; ) C += " ";
        _.push(C + (k === 0 ? " " : ""));
      }
      u.push(_.join(""));
    }
    return u.join(`
`);
  }
  return {
    to_workbook: l,
    to_sheet: f,
    from_sheet: o
  };
})(), I0 = /* @__PURE__ */ (function() {
  function e(S, M, A) {
    if (S) {
      dt(S, S.l || 0);
      for (var y = A.Enum || _t; S.l < S.length; ) {
        var G = S.read_shift(2), se = y[G] || y[65535], fe = S.read_shift(2), ie = S.l + fe, te = se.f && se.f(S, fe, A);
        if (S.l = ie, M(te, se, G)) return;
      }
    }
  }
  function r(S, M) {
    switch (M.type) {
      case "base64":
        return t(Ot($t(S)), M);
      case "binary":
        return t(Ot(S), M);
      case "buffer":
      case "array":
        return t(S, M);
    }
    throw "Unsupported type " + M.type;
  }
  function t(S, M) {
    if (!S) return S;
    var A = M || {}, y = A.dense ? [] : {}, G = "Sheet1", se = "", fe = 0, ie = {}, te = [], Ae = [], me = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, nt = A.sheetRows || 0;
    if (S[2] == 0 && (S[3] == 8 || S[3] == 9) && S.length >= 16 && S[14] == 5 && S[15] === 108)
      throw new Error("Unsupported Works 3 for Mac file");
    if (S[2] == 2)
      A.Enum = _t, e(S, function(ae, gt, Bt) {
        switch (Bt) {
          case 0:
            A.vers = ae, ae >= 4096 && (A.qpro = !0);
            break;
          case 6:
            me = ae;
            break;
          /* RANGE */
          case 204:
            ae && (se = ae);
            break;
          /* SHEETNAMECS */
          case 222:
            se = ae;
            break;
          /* SHEETNAMELP */
          case 15:
          /* LABEL */
          case 51:
            A.qpro || (ae[1].v = ae[1].v.slice(1));
          /* falls through */
          case 13:
          /* INTEGER */
          case 14:
          /* NUMBER */
          case 16:
            Bt == 14 && (ae[2] & 112) == 112 && (ae[2] & 15) > 1 && (ae[2] & 15) < 15 && (ae[1].z = A.dateNF || Me[14], A.cellDates && (ae[1].t = "d", ae[1].v = Ds(ae[1].v))), A.qpro && ae[3] > fe && (y["!ref"] = Ue(me), ie[G] = y, te.push(G), y = A.dense ? [] : {}, me = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, fe = ae[3], G = se || "Sheet" + (fe + 1), se = "");
            var fr = A.dense ? (y[ae[0].r] || [])[ae[0].c] : y[ye(ae[0])];
            if (fr) {
              fr.t = ae[1].t, fr.v = ae[1].v, ae[1].z != null && (fr.z = ae[1].z), ae[1].f != null && (fr.f = ae[1].f);
              break;
            }
            A.dense ? (y[ae[0].r] || (y[ae[0].r] = []), y[ae[0].r][ae[0].c] = ae[1]) : y[ye(ae[0])] = ae[1];
            break;
        }
      }, A);
    else if (S[2] == 26 || S[2] == 14)
      A.Enum = ut, S[2] == 14 && (A.qpro = !0, S.l = 0), e(S, function(ae, gt, Bt) {
        switch (Bt) {
          case 204:
            G = ae;
            break;
          /* SHEETNAMECS */
          case 22:
            ae[1].v = ae[1].v.slice(1);
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
            if (ae[3] > fe && (y["!ref"] = Ue(me), ie[G] = y, te.push(G), y = A.dense ? [] : {}, me = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, fe = ae[3], G = "Sheet" + (fe + 1)), nt > 0 && ae[0].r >= nt) break;
            A.dense ? (y[ae[0].r] || (y[ae[0].r] = []), y[ae[0].r][ae[0].c] = ae[1]) : y[ye(ae[0])] = ae[1], me.e.c < ae[0].c && (me.e.c = ae[0].c), me.e.r < ae[0].r && (me.e.r = ae[0].r);
            break;
          case 27:
            ae[14e3] && (Ae[ae[14e3][0]] = ae[14e3][1]);
            break;
          case 1537:
            Ae[ae[0]] = ae[1], ae[0] == fe && (G = ae[1]);
            break;
        }
      }, A);
    else throw new Error("Unrecognized LOTUS BOF " + S[2]);
    if (y["!ref"] = Ue(me), ie[se || G] = y, te.push(se || G), !Ae.length) return { SheetNames: te, Sheets: ie };
    for (var _e = {}, Lt = [], Ne = 0; Ne < Ae.length; ++Ne) ie[te[Ne]] ? (Lt.push(Ae[Ne] || te[Ne]), _e[Ae[Ne]] = ie[Ae[Ne]] || ie[te[Ne]]) : (Lt.push(Ae[Ne]), _e[Ae[Ne]] = { "!ref": "A1" });
    return { SheetNames: Lt, Sheets: _e };
  }
  function n(S, M) {
    var A = M || {};
    if (+A.codepage >= 0 && mn(+A.codepage), A.type == "string") throw new Error("Cannot write WK1 to JS string");
    var y = lt(), G = Re(S["!ref"]), se = Array.isArray(S), fe = [];
    Q(y, 0, i(1030)), Q(y, 6, l(G));
    for (var ie = Math.min(G.e.r, 8191), te = G.s.r; te <= ie; ++te)
      for (var Ae = Ze(te), me = G.s.c; me <= G.e.c; ++me) {
        te === G.s.r && (fe[me] = tt(me));
        var nt = fe[me] + Ae, _e = se ? (S[te] || [])[me] : S[nt];
        if (!(!_e || _e.t == "z"))
          if (_e.t == "n")
            (_e.v | 0) == _e.v && _e.v >= -32768 && _e.v <= 32767 ? Q(y, 13, m(te, me, _e.v)) : Q(y, 14, h(te, me, _e.v));
          else {
            var Lt = zt(_e);
            Q(y, 15, u(te, me, Lt.slice(0, 239)));
          }
      }
    return Q(y, 1), y.end();
  }
  function a(S, M) {
    var A = M || {};
    if (+A.codepage >= 0 && mn(+A.codepage), A.type == "string") throw new Error("Cannot write WK3 to JS string");
    var y = lt();
    Q(y, 0, s(S));
    for (var G = 0, se = 0; G < S.SheetNames.length; ++G) (S.Sheets[S.SheetNames[G]] || {})["!ref"] && Q(y, 27, Ve(S.SheetNames[G], se++));
    var fe = 0;
    for (G = 0; G < S.SheetNames.length; ++G) {
      var ie = S.Sheets[S.SheetNames[G]];
      if (!(!ie || !ie["!ref"])) {
        for (var te = Re(ie["!ref"]), Ae = Array.isArray(ie), me = [], nt = Math.min(te.e.r, 8191), _e = te.s.r; _e <= nt; ++_e)
          for (var Lt = Ze(_e), Ne = te.s.c; Ne <= te.e.c; ++Ne) {
            _e === te.s.r && (me[Ne] = tt(Ne));
            var ae = me[Ne] + Lt, gt = Ae ? (ie[_e] || [])[Ne] : ie[ae];
            if (!(!gt || gt.t == "z"))
              if (gt.t == "n")
                Q(y, 23, W(_e, Ne, fe, gt.v));
              else {
                var Bt = zt(gt);
                Q(y, 22, F(_e, Ne, fe, Bt.slice(0, 239)));
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
    for (var A = 0, y = 0, G = 0, se = 0; se < S.SheetNames.length; ++se) {
      var fe = S.SheetNames[se], ie = S.Sheets[fe];
      if (!(!ie || !ie["!ref"])) {
        ++G;
        var te = vt(ie["!ref"]);
        A < te.e.r && (A = te.e.r), y < te.e.c && (y = te.e.c);
      }
    }
    return A > 8191 && (A = 8191), M.write_shift(2, A), M.write_shift(1, G), M.write_shift(1, y), M.write_shift(2, 0), M.write_shift(2, 0), M.write_shift(1, 1), M.write_shift(1, 2), M.write_shift(4, 0), M.write_shift(4, 0), M;
  }
  function f(S, M, A) {
    var y = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    return M == 8 && A.qpro ? (y.s.c = S.read_shift(1), S.l++, y.s.r = S.read_shift(2), y.e.c = S.read_shift(1), S.l++, y.e.r = S.read_shift(2), y) : (y.s.c = S.read_shift(2), y.s.r = S.read_shift(2), M == 12 && A.qpro && (S.l += 2), y.e.c = S.read_shift(2), y.e.r = S.read_shift(2), M == 12 && A.qpro && (S.l += 2), y.s.c == 65535 && (y.s.c = y.e.c = y.s.r = y.e.r = 0), y);
  }
  function l(S) {
    var M = B(8);
    return M.write_shift(2, S.s.c), M.write_shift(2, S.s.r), M.write_shift(2, S.e.c), M.write_shift(2, S.e.r), M;
  }
  function o(S, M, A) {
    var y = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0, 0];
    return A.qpro && A.vers != 20768 ? (y[0].c = S.read_shift(1), y[3] = S.read_shift(1), y[0].r = S.read_shift(2), S.l += 2) : (y[2] = S.read_shift(1), y[0].c = S.read_shift(2), y[0].r = S.read_shift(2)), y;
  }
  function c(S, M, A) {
    var y = S.l + M, G = o(S, M, A);
    if (G[1].t = "s", A.vers == 20768) {
      S.l++;
      var se = S.read_shift(1);
      return G[1].v = S.read_shift(se, "utf8"), G;
    }
    return A.qpro && S.l++, G[1].v = S.read_shift(y - S.l, "cstr"), G;
  }
  function u(S, M, A) {
    var y = B(7 + A.length);
    y.write_shift(1, 255), y.write_shift(2, M), y.write_shift(2, S), y.write_shift(1, 39);
    for (var G = 0; G < y.length; ++G) {
      var se = A.charCodeAt(G);
      y.write_shift(1, se >= 128 ? 95 : se);
    }
    return y.write_shift(1, 0), y;
  }
  function d(S, M, A) {
    var y = o(S, M, A);
    return y[1].v = S.read_shift(2, "i"), y;
  }
  function m(S, M, A) {
    var y = B(7);
    return y.write_shift(1, 255), y.write_shift(2, M), y.write_shift(2, S), y.write_shift(2, A, "i"), y;
  }
  function g(S, M, A) {
    var y = o(S, M, A);
    return y[1].v = S.read_shift(8, "f"), y;
  }
  function h(S, M, A) {
    var y = B(13);
    return y.write_shift(1, 255), y.write_shift(2, M), y.write_shift(2, S), y.write_shift(8, A, "f"), y;
  }
  function _(S, M, A) {
    var y = S.l + M, G = o(S, M, A);
    if (G[1].v = S.read_shift(8, "f"), A.qpro) S.l = y;
    else {
      var se = S.read_shift(2);
      L(S.slice(S.l, S.l + se), G), S.l += se;
    }
    return G;
  }
  function k(S, M, A) {
    var y = M & 32768;
    return M &= -32769, M = (y ? S : 0) + (M >= 8192 ? M - 16384 : M), (y ? "" : "$") + (A ? tt(M) : Ze(M));
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
  }, C = [
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
    dt(S, 0);
    for (var A = [], y = 0, G = "", se = "", fe = "", ie = ""; S.l < S.length; ) {
      var te = S[S.l++];
      switch (te) {
        case 0:
          A.push(S.read_shift(8, "f"));
          break;
        case 1:
          se = k(M[0].c, S.read_shift(2), !0), G = k(M[0].r, S.read_shift(2), !1), A.push(se + G);
          break;
        case 2:
          {
            var Ae = k(M[0].c, S.read_shift(2), !0), me = k(M[0].r, S.read_shift(2), !1);
            se = k(M[0].c, S.read_shift(2), !0), G = k(M[0].r, S.read_shift(2), !1), A.push(Ae + me + ":" + se + G);
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
            for (var nt = ""; te = S[S.l++]; ) nt += String.fromCharCode(te);
            A.push('"' + nt.replace(/"/g, '""') + '"');
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
          ie = A.pop(), fe = A.pop(), A.push(["AND", "OR"][te - 20] + "(" + fe + "," + ie + ")");
          break;
        default:
          if (te < 32 && C[te])
            ie = A.pop(), fe = A.pop(), A.push(fe + C[te] + ie);
          else if (O[te]) {
            if (y = O[te][1], y == 69 && (y = S[S.l++]), y > A.length) {
              console.error("WK1 bad formula parse 0x" + te.toString(16) + ":|" + A.join("|") + "|");
              return;
            }
            var _e = A.slice(-y);
            A.length -= y, A.push(O[te][0] + "(" + _e.join(",") + ")");
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
  function F(S, M, A, y) {
    var G = B(6 + y.length);
    G.write_shift(2, S), G.write_shift(1, A), G.write_shift(1, M), G.write_shift(1, 39);
    for (var se = 0; se < y.length; ++se) {
      var fe = y.charCodeAt(se);
      G.write_shift(1, fe >= 128 ? 95 : fe);
    }
    return G.write_shift(1, 0), G;
  }
  function b(S, M) {
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
  function D(S, M) {
    var A = Y(S), y = S.read_shift(4), G = S.read_shift(4), se = S.read_shift(2);
    if (se == 65535)
      return y === 0 && G === 3221225472 ? (A[1].t = "e", A[1].v = 15) : y === 0 && G === 3489660928 ? (A[1].t = "e", A[1].v = 42) : A[1].v = 0, A;
    var fe = se & 32768;
    return se = (se & 32767) - 16446, A[1].v = (1 - fe * 2) * (G * Math.pow(2, se + 32) + y * Math.pow(2, se)), A;
  }
  function W(S, M, A, y) {
    var G = B(14);
    if (G.write_shift(2, S), G.write_shift(1, A), G.write_shift(1, M), y == 0)
      return G.write_shift(4, 0), G.write_shift(4, 0), G.write_shift(2, 65535), G;
    var se = 0, fe = 0, ie = 0, te = 0;
    return y < 0 && (se = 1, y = -y), fe = Math.log2(y) | 0, y /= Math.pow(2, fe - 31), te = y >>> 0, (te & 2147483648) == 0 && (y /= 2, ++fe, te = y >>> 0), y -= te, te |= 2147483648, te >>>= 0, y *= Math.pow(2, 32), ie = y >>> 0, G.write_shift(4, ie), G.write_shift(4, te), fe += 16383 + (se ? 32768 : 0), G.write_shift(2, fe), G;
  }
  function V(S, M) {
    var A = D(S);
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
  function Fe(S, M) {
    var A = ee(S);
    return S.l += M - 10, A;
  }
  function ce(S, M) {
    return S[S.l + M - 1] == 0 ? S.read_shift(M, "cstr") : "";
  }
  function je(S, M) {
    var A = S[S.l++];
    A > M - 1 && (A = M - 1);
    for (var y = ""; y.length < A; ) y += String.fromCharCode(S[S.l++]);
    return y;
  }
  function Le(S, M, A) {
    if (!(!A.qpro || M < 21)) {
      var y = S.read_shift(1);
      S.l += 17, S.l += 1, S.l += 2;
      var G = S.read_shift(M - 21, "cstr");
      return [y, G];
    }
  }
  function Ft(S, M) {
    for (var A = {}, y = S.l + M; S.l < y; ) {
      var G = S.read_shift(2);
      if (G == 14e3) {
        for (A[G] = [0, ""], A[G][0] = S.read_shift(2); S[S.l]; )
          A[G][1] += String.fromCharCode(S[S.l]), S.l++;
        S.l++;
      }
    }
    return A;
  }
  function Ve(S, M) {
    var A = B(5 + S.length);
    A.write_shift(2, 14e3), A.write_shift(2, M);
    for (var y = 0; y < S.length; ++y) {
      var G = S.charCodeAt(y);
      A[A.l++] = G > 127 ? 95 : G;
    }
    return A[A.l++] = 0, A;
  }
  var _t = {
    /*::[*/
    0: { n: "BOF", f: hf },
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
    6: { n: "RANGE", f },
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
    13: { n: "INTEGER", f: d },
    /*::[*/
    14: { n: "NUMBER", f: g },
    /*::[*/
    15: { n: "LABEL", f: c },
    /*::[*/
    16: { n: "FORMULA", f: _ },
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
    204: { n: "SHEETNAMECS", f: ce },
    /*::[*/
    222: { n: "SHEETNAMELP", f: je },
    /*::[*/
    65535: { n: "" }
  }, ut = {
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
    23: { n: "NUMBER17", f: D },
    /*::[*/
    24: { n: "NUMBER18", f: b },
    /*::[*/
    25: { n: "FORMULA19", f: V },
    /*::[*/
    26: { n: "FORMULA1A" },
    /*::[*/
    27: { n: "XFORMAT", f: Ft },
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
    40: { n: "FORMULA28", f: Fe },
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
    204: { n: "SHEETNAMECS", f: ce },
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
    1537: { n: "SHEETINFOQP", f: Le },
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
})(), qh = /^\s|\s$|[\t\n\r]/;
function vf(e, r) {
  if (!r.bookSST) return "";
  var t = [We];
  t[t.length] = J("sst", null, {
    xmlns: jr[0],
    count: e.Count,
    uniqueCount: e.Unique
  });
  for (var n = 0; n != e.length; ++n)
    if (e[n] != null) {
      var a = e[n], i = "<si>";
      a.r ? i += a.r : (i += "<t", a.t || (a.t = ""), a.t.match(qh) && (i += ' xml:space="preserve"'), i += ">" + Se(a.t) + "</t>"), i += "</si>", t[t.length] = i;
    }
  return t.length > 2 && (t[t.length] = "</sst>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function eu(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function tu(e, r) {
  return r || (r = B(8)), r.write_shift(4, e.Count), r.write_shift(4, e.Unique), r;
}
var ru = Xc;
function nu(e) {
  var r = lt();
  H(r, 159, tu(e));
  for (var t = 0; t < e.length; ++t) H(r, 19, ru(e[t]));
  return H(
    r,
    160
    /* BrtEndSst */
  ), r.end();
}
function au(e) {
  for (var r = [], t = e.split(""), n = 0; n < t.length; ++n) r[n] = t[n].charCodeAt(0);
  return r;
}
function _f(e) {
  var r = 0, t, n = au(e), a = n.length + 1, i, s, f, l, o;
  for (t = _r(a), t[0] = n.length, i = 1; i != a; ++i) t[i] = n[i - 1];
  for (i = a - 1; i >= 0; --i)
    s = t[i], f = (r & 16384) === 0 ? 0 : 1, l = r << 1 & 32767, o = f | l, r = o ^ s;
  return r ^ 52811;
}
var iu = /* @__PURE__ */ (function() {
  function e(a, i) {
    switch (i.type) {
      case "base64":
        return r($t(a), i);
      case "binary":
        return r(a, i);
      case "buffer":
        return r(ve && Buffer.isBuffer(a) ? a.toString("binary") : yn(a), i);
      case "array":
        return r(ha(a), i);
    }
    throw new Error("Unrecognized type " + i.type);
  }
  function r(a, i) {
    var s = i || {}, f = s.dense ? [] : {}, l = a.match(/\\trowd.*?\\row\b/g);
    if (!l.length) throw new Error("RTF missing table");
    var o = { s: { c: 0, r: 0 }, e: { c: 0, r: l.length - 1 } };
    return l.forEach(function(c, u) {
      Array.isArray(f) && (f[u] = []);
      for (var d = /\\\w+\b/g, m = 0, g, h = -1; g = d.exec(c); ) {
        switch (g[0]) {
          case "\\cell":
            var _ = c.slice(m, d.lastIndex - g[0].length);
            if (_[0] == " " && (_ = _.slice(1)), ++h, _.length) {
              var k = { v: _, t: "s" };
              Array.isArray(f) ? f[u][h] = k : f[ye({ r: u, c: h })] = k;
            }
            break;
        }
        m = d.lastIndex;
      }
      h > o.e.c && (o.e.c = h);
    }), f["!ref"] = Ue(o), f;
  }
  function t(a, i) {
    return Tr(e(a, i), i);
  }
  function n(a) {
    for (var i = ["{\\rtf1\\ansi"], s = Re(a["!ref"]), f, l = Array.isArray(a), o = s.s.r; o <= s.e.r; ++o) {
      i.push("\\trowd\\trautofit1");
      for (var c = s.s.c; c <= s.e.c; ++c) i.push("\\cellx" + (c + 1));
      for (i.push("\\pard\\intbl"), c = s.s.c; c <= s.e.c; ++c) {
        var u = ye({ r: o, c });
        f = l ? (a[o] || [])[c] : a[u], !(!f || f.v == null && (!f.f || f.F)) && (i.push(" " + (f.w || (zt(f), f.w))), i.push("\\cell"));
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
function D0(e) {
  for (var r = 0, t = 1; r != 3; ++r) t = t * 256 + (e[r] > 255 ? 255 : e[r] < 0 ? 0 : e[r]);
  return t.toString(16).toUpperCase().slice(1);
}
var su = 6, Vt = su;
function ra(e) {
  return Math.floor((e + Math.round(128 / Vt) / 256) * Vt);
}
function na(e) {
  return Math.floor((e - 5) / Vt * 100 + 0.5) / 100;
}
function qa(e) {
  return Math.round((e * Vt + 5) / Vt * 256) / 256;
}
function _i(e) {
  e.width ? (e.wpx = ra(e.width), e.wch = na(e.wpx), e.MDW = Vt) : e.wpx ? (e.wch = na(e.wpx), e.width = qa(e.wch), e.MDW = Vt) : typeof e.wch == "number" && (e.width = qa(e.wch), e.wpx = ra(e.width), e.MDW = Vt), e.customWidth && delete e.customWidth;
}
var fu = 96, gf = fu;
function aa(e) {
  return e * 96 / gf;
}
function wf(e) {
  return e * gf / 96;
}
function ou(e) {
  var r = ["<numFmts>"];
  return [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(t) {
    for (var n = t[0]; n <= t[1]; ++n) e[n] != null && (r[r.length] = J("numFmt", null, { numFmtId: n, formatCode: Se(e[n]) }));
  }), r.length === 1 ? "" : (r[r.length] = "</numFmts>", r[0] = J("numFmts", null, { count: r.length - 2 }).replace("/>", ">"), r.join(""));
}
function lu(e) {
  var r = [];
  return r[r.length] = J("cellXfs", null), e.forEach(function(t) {
    r[r.length] = J("xf", null, t);
  }), r[r.length] = "</cellXfs>", r.length === 2 ? "" : (r[0] = J("cellXfs", null, { count: r.length - 2 }).replace("/>", ">"), r.join(""));
}
function Tf(e, r) {
  var t = [We, J("styleSheet", null, {
    xmlns: jr[0],
    "xmlns:vt": $e.vt
  })], n;
  return e.SSF && (n = ou(e.SSF)) != null && (t[t.length] = n), t[t.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', t[t.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', t[t.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', t[t.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (n = lu(r.cellXfs)) && (t[t.length] = n), t[t.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', t[t.length] = '<dxfs count="0"/>', t[t.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', t.length > 2 && (t[t.length] = "</styleSheet>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function cu(e, r) {
  var t = e.read_shift(2), n = rt(e);
  return [t, n];
}
function hu(e, r, t) {
  t || (t = B(6 + 4 * r.length)), t.write_shift(2, e), Xe(r, t);
  var n = t.length > t.l ? t.slice(0, t.l) : t;
  return t.l == null && (t.l = t.length), n;
}
function uu(e, r, t) {
  var n = {};
  n.sz = e.read_shift(2) / 20;
  var a = qc(e);
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
  var f = e.read_shift(1);
  f > 0 && (n.family = f);
  var l = e.read_shift(1);
  switch (l > 0 && (n.charset = l), e.l++, n.color = Zc(e), e.read_shift(1)) {
    /* case 0: out.scheme = "none": break; */
    case 1:
      n.scheme = "major";
      break;
    case 2:
      n.scheme = "minor";
      break;
  }
  return n.name = rt(e), n;
}
function xu(e, r) {
  r || (r = B(153)), r.write_shift(2, e.sz * 20), eh(e, r), r.write_shift(2, e.bold ? 700 : 400);
  var t = 0;
  e.vertAlign == "superscript" ? t = 1 : e.vertAlign == "subscript" && (t = 2), r.write_shift(2, t), r.write_shift(1, e.underline || 0), r.write_shift(1, e.family || 0), r.write_shift(1, e.charset || 0), r.write_shift(1, 0), ea(e.color, r);
  var n = 0;
  return n = 2, r.write_shift(1, n), Xe(e.name, r), r.length > r.l ? r.slice(0, r.l) : r;
}
var du = [
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
], Ra, mu = Mt;
function N0(e, r) {
  r || (r = B(84)), Ra || (Ra = si(du));
  var t = Ra[e.patternType];
  t == null && (t = 40), r.write_shift(4, t);
  var n = 0;
  if (t != 40)
    for (ea({ auto: 1 }, r), ea({ auto: 1 }, r); n < 12; ++n) r.write_shift(4, 0);
  else {
    for (; n < 4; ++n) r.write_shift(4, 0);
    for (; n < 12; ++n) r.write_shift(4, 0);
  }
  return r.length > r.l ? r.slice(0, r.l) : r;
}
function pu(e, r) {
  var t = e.l + r, n = e.read_shift(2), a = e.read_shift(2);
  return e.l = t, { ixfe: n, numFmtId: a };
}
function Ef(e, r, t) {
  t || (t = B(16)), t.write_shift(2, r || 0), t.write_shift(2, e.numFmtId || 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(1, 0), t.write_shift(1, 0);
  var n = 0;
  return t.write_shift(1, n), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(1, 0), t;
}
function rn(e, r) {
  return r || (r = B(10)), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(4, 0), r.write_shift(4, 0), r;
}
var vu = Mt;
function _u(e, r) {
  return r || (r = B(51)), r.write_shift(1, 0), rn(null, r), rn(null, r), rn(null, r), rn(null, r), rn(null, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function gu(e, r) {
  return r || (r = B(52)), r.write_shift(4, e.xfId), r.write_shift(2, 1), r.write_shift(1, 0), r.write_shift(1, 0), qn(e.name || "", r), r.length > r.l ? r.slice(0, r.l) : r;
}
function wu(e, r, t) {
  var n = B(2052);
  return n.write_shift(4, e), qn(r, n), qn(t, n), n.length > n.l ? n.slice(0, n.l) : n;
}
function Tu(e, r) {
  if (r) {
    var t = 0;
    [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a) r[a] != null && ++t;
    }), t != 0 && (H(e, 615, It(t)), [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a) r[a] != null && H(e, 44, hu(a, r[a]));
    }), H(
      e,
      616
      /* BrtEndFmts */
    ));
  }
}
function Eu(e) {
  var r = 1;
  H(e, 611, It(r)), H(e, 43, xu({
    sz: 12,
    color: { theme: 1 },
    name: "Calibri",
    family: 2
  })), H(
    e,
    612
    /* BrtEndFonts */
  );
}
function Su(e) {
  var r = 2;
  H(e, 603, It(r)), H(e, 45, N0({ patternType: "none" })), H(e, 45, N0({ patternType: "gray125" })), H(
    e,
    604
    /* BrtEndFills */
  );
}
function yu(e) {
  var r = 1;
  H(e, 613, It(r)), H(e, 46, _u()), H(
    e,
    614
    /* BrtEndBorders */
  );
}
function Fu(e) {
  var r = 1;
  H(e, 626, It(r)), H(e, 47, Ef({
    numFmtId: 0
  }, 65535)), H(
    e,
    627
    /* BrtEndCellStyleXFs */
  );
}
function Cu(e, r) {
  H(e, 617, It(r.length)), r.forEach(function(t) {
    H(e, 47, Ef(t, 0));
  }), H(
    e,
    618
    /* BrtEndCellXFs */
  );
}
function Au(e) {
  var r = 1;
  H(e, 619, It(r)), H(e, 48, gu({
    xfId: 0,
    name: "Normal"
  })), H(
    e,
    620
    /* BrtEndStyles */
  );
}
function ku(e) {
  var r = 0;
  H(e, 505, It(r)), H(
    e,
    506
    /* BrtEndDXFs */
  );
}
function Ou(e) {
  var r = 0;
  H(e, 508, wu(r, "TableStyleMedium9", "PivotStyleMedium4")), H(
    e,
    509
    /* BrtEndTableStyles */
  );
}
function Ru(e, r) {
  var t = lt();
  return H(
    t,
    278
    /* BrtBeginStyleSheet */
  ), Tu(t, e.SSF), Eu(t), Su(t), yu(t), Fu(t), Cu(t, r.cellXfs), Au(t), ku(t), Ou(t), H(
    t,
    279
    /* BrtEndStyleSheet */
  ), t.end();
}
function Sf(e, r) {
  if (r && r.themeXLSX) return r.themeXLSX;
  if (e && typeof e.raw == "string") return e.raw;
  var t = [We];
  return t[t.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', t[t.length] = "<a:themeElements>", t[t.length] = '<a:clrScheme name="Office">', t[t.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', t[t.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', t[t.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', t[t.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', t[t.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', t[t.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', t[t.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', t[t.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', t[t.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', t[t.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', t[t.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', t[t.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', t[t.length] = "</a:clrScheme>", t[t.length] = '<a:fontScheme name="Office">', t[t.length] = "<a:majorFont>", t[t.length] = '<a:latin typeface="Cambria"/>', t[t.length] = '<a:ea typeface=""/>', t[t.length] = '<a:cs typeface=""/>', t[t.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', t[t.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', t[t.length] = '<a:font script="Hans" typeface="宋体"/>', t[t.length] = '<a:font script="Hant" typeface="新細明體"/>', t[t.length] = '<a:font script="Arab" typeface="Times New Roman"/>', t[t.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>', t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>', t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>', t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>', t[t.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', t[t.length] = '<a:font script="Knda" typeface="Tunga"/>', t[t.length] = '<a:font script="Guru" typeface="Raavi"/>', t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>', t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>', t[t.length] = '<a:font script="Deva" typeface="Mangal"/>', t[t.length] = '<a:font script="Telu" typeface="Gautami"/>', t[t.length] = '<a:font script="Taml" typeface="Latha"/>', t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>', t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>', t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>', t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', t[t.length] = '<a:font script="Viet" typeface="Times New Roman"/>', t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>', t[t.length] = "</a:majorFont>", t[t.length] = "<a:minorFont>", t[t.length] = '<a:latin typeface="Calibri"/>', t[t.length] = '<a:ea typeface=""/>', t[t.length] = '<a:cs typeface=""/>', t[t.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', t[t.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', t[t.length] = '<a:font script="Hans" typeface="宋体"/>', t[t.length] = '<a:font script="Hant" typeface="新細明體"/>', t[t.length] = '<a:font script="Arab" typeface="Arial"/>', t[t.length] = '<a:font script="Hebr" typeface="Arial"/>', t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>', t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>', t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>', t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>', t[t.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', t[t.length] = '<a:font script="Knda" typeface="Tunga"/>', t[t.length] = '<a:font script="Guru" typeface="Raavi"/>', t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>', t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>', t[t.length] = '<a:font script="Deva" typeface="Mangal"/>', t[t.length] = '<a:font script="Telu" typeface="Gautami"/>', t[t.length] = '<a:font script="Taml" typeface="Latha"/>', t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>', t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>', t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>', t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', t[t.length] = '<a:font script="Viet" typeface="Arial"/>', t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>', t[t.length] = "</a:minorFont>", t[t.length] = "</a:fontScheme>", t[t.length] = '<a:fmtScheme name="Office">', t[t.length] = "<a:fillStyleLst>", t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:lin ang="16200000" scaled="1"/>', t[t.length] = "</a:gradFill>", t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:lin ang="16200000" scaled="0"/>', t[t.length] = "</a:gradFill>", t[t.length] = "</a:fillStyleLst>", t[t.length] = "<a:lnStyleLst>", t[t.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', t[t.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', t[t.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', t[t.length] = "</a:lnStyleLst>", t[t.length] = "<a:effectStyleLst>", t[t.length] = "<a:effectStyle>", t[t.length] = "<a:effectLst>", t[t.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', t[t.length] = "</a:effectLst>", t[t.length] = "</a:effectStyle>", t[t.length] = "<a:effectStyle>", t[t.length] = "<a:effectLst>", t[t.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', t[t.length] = "</a:effectLst>", t[t.length] = "</a:effectStyle>", t[t.length] = "<a:effectStyle>", t[t.length] = "<a:effectLst>", t[t.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', t[t.length] = "</a:effectLst>", t[t.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', t[t.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', t[t.length] = "</a:effectStyle>", t[t.length] = "</a:effectStyleLst>", t[t.length] = "<a:bgFillStyleLst>", t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', t[t.length] = "</a:gradFill>", t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', t[t.length] = "</a:gradFill>", t[t.length] = "</a:bgFillStyleLst>", t[t.length] = "</a:fmtScheme>", t[t.length] = "</a:themeElements>", t[t.length] = "<a:objectDefaults>", t[t.length] = "<a:spDef>", t[t.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', t[t.length] = "</a:spDef>", t[t.length] = "<a:lnDef>", t[t.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', t[t.length] = "</a:lnDef>", t[t.length] = "</a:objectDefaults>", t[t.length] = "<a:extraClrSchemeLst/>", t[t.length] = "</a:theme>", t.join("");
}
function Iu(e, r) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: rt(e)
  };
}
function Du(e) {
  var r = B(12 + 2 * e.name.length);
  return r.write_shift(4, e.flags), r.write_shift(4, e.version), Xe(e.name, r), r.slice(0, r.l);
}
function Nu(e) {
  for (var r = [], t = e.read_shift(4); t-- > 0; )
    r.push([e.read_shift(4), e.read_shift(4)]);
  return r;
}
function Pu(e) {
  var r = B(4 + 8 * e.length);
  r.write_shift(4, e.length);
  for (var t = 0; t < e.length; ++t)
    r.write_shift(4, e[t][0]), r.write_shift(4, e[t][1]);
  return r;
}
function Mu(e, r) {
  var t = B(8 + 2 * r.length);
  return t.write_shift(4, e), Xe(r, t), t.slice(0, t.l);
}
function Lu(e) {
  return e.l += 4, e.read_shift(4) != 0;
}
function Bu(e, r) {
  var t = B(8);
  return t.write_shift(4, e), t.write_shift(4, 1), t;
}
function bu() {
  var e = lt();
  return H(e, 332), H(e, 334, It(1)), H(e, 335, Du({
    name: "XLDAPR",
    version: 12e4,
    flags: 3496657072
  })), H(e, 336), H(e, 339, Mu(1, "XLDAPR")), H(e, 52), H(e, 35, It(514)), H(e, 4096, It(0)), H(e, 4097, Et(1)), H(e, 36), H(e, 53), H(e, 340), H(e, 337, Bu(1)), H(e, 51, Pu([[1, 0]])), H(e, 338), H(e, 333), e.end();
}
function yf() {
  var e = [We];
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
function Uu(e) {
  var r = {};
  r.i = e.read_shift(4);
  var t = {};
  t.r = e.read_shift(4), t.c = e.read_shift(4), r.r = ye(t);
  var n = e.read_shift(1);
  return n & 2 && (r.l = "1"), n & 8 && (r.a = "1"), r;
}
var Pr = 1024;
function Ff(e, r) {
  for (var t = [21600, 21600], n = ["m0,0l0", t[1], t[0], t[1], t[0], "0xe"].join(","), a = [
    J("xml", null, { "xmlns:v": mt.v, "xmlns:o": mt.o, "xmlns:x": mt.x, "xmlns:mv": mt.mv }).replace(/\/>/, ">"),
    J("o:shapelayout", J("o:idmap", null, { "v:ext": "edit", data: e }), { "v:ext": "edit" }),
    J("v:shapetype", [
      J("v:stroke", null, { joinstyle: "miter" }),
      J("v:path", null, { gradientshapeok: "t", "o:connecttype": "rect" })
    ].join(""), { id: "_x0000_t202", "o:spt": 202, coordsize: t.join(","), path: n })
  ]; Pr < e * 1e3; ) Pr += 1e3;
  return r.forEach(function(i) {
    var s = ze(i[0]), f = (
      /*::(*/
      { color2: "#BEFF82", type: "gradient" }
    );
    f.type == "gradient" && (f.angle = "-180");
    var l = f.type == "gradient" ? J("o:fill", null, { type: "gradientUnscaled", "v:ext": "view" }) : null, o = J("v:fill", l, f), c = { on: "t", obscured: "t" };
    ++Pr, a = a.concat([
      "<v:shape" + gn({
        id: "_x0000_s" + Pr,
        type: "#_x0000_t202",
        style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (i[1].hidden ? ";visibility:hidden" : ""),
        fillcolor: "#ECFAD4",
        strokecolor: "#edeaa1"
      }) + ">",
      o,
      J("v:shadow", null, c),
      J("v:path", null, { "o:connecttype": "none" }),
      '<v:textbox><div style="text-align:left"></div></v:textbox>',
      '<x:ClientData ObjectType="Note">',
      "<x:MoveWithCells/>",
      "<x:SizeWithCells/>",
      /* Part 4 19.4.2.3 Anchor (Anchor) */
      Qe("x:Anchor", [s.c + 1, 0, s.r + 1, 0, s.c + 3, 20, s.r + 5, 20].join(",")),
      Qe("x:AutoFill", "False"),
      Qe("x:Row", String(s.r)),
      Qe("x:Column", String(s.c)),
      i[1].hidden ? "" : "<x:Visible/>",
      "</x:ClientData>",
      "</v:shape>"
    ]);
  }), a.push("</xml>"), a.join("");
}
function Cf(e) {
  var r = [We, J("comments", null, { xmlns: jr[0] })], t = [];
  return r.push("<authors>"), e.forEach(function(n) {
    n[1].forEach(function(a) {
      var i = Se(a.a);
      t.indexOf(i) == -1 && (t.push(i), r.push("<author>" + i + "</author>")), a.T && a.ID && t.indexOf("tc=" + a.ID) == -1 && (t.push("tc=" + a.ID), r.push("<author>tc=" + a.ID + "</author>"));
    });
  }), t.length == 0 && (t.push("SheetJ5"), r.push("<author>SheetJ5</author>")), r.push("</authors>"), r.push("<commentList>"), e.forEach(function(n) {
    var a = 0, i = [];
    if (n[1][0] && n[1][0].T && n[1][0].ID ? a = t.indexOf("tc=" + n[1][0].ID) : n[1].forEach(function(l) {
      l.a && (a = t.indexOf(Se(l.a))), i.push(l.t || "");
    }), r.push('<comment ref="' + n[0] + '" authorId="' + a + '"><text>'), i.length <= 1) r.push(Qe("t", Se(i[0] || "")));
    else {
      for (var s = `Comment:
    ` + i[0] + `
`, f = 1; f < i.length; ++f) s += `Reply:
    ` + i[f] + `
`;
      r.push(Qe("t", Se(s)));
    }
    r.push("</text></comment>");
  }), r.push("</commentList>"), r.length > 2 && (r[r.length] = "</comments>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Wu(e, r, t) {
  var n = [We, J("ThreadedComments", null, { xmlns: $e.TCMNT }).replace(/[\/]>/, ">")];
  return e.forEach(function(a) {
    var i = "";
    (a[1] || []).forEach(function(s, f) {
      if (!s.T) {
        delete s.ID;
        return;
      }
      s.a && r.indexOf(s.a) == -1 && r.push(s.a);
      var l = {
        ref: a[0],
        id: "{54EE7951-7262-4200-6969-" + ("000000000000" + t.tcid++).slice(-12) + "}"
      };
      f == 0 ? i = l.id : l.parentId = i, s.ID = l.id, s.a && (l.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + r.indexOf(s.a)).slice(-12) + "}"), n.push(J("threadedComment", Qe("text", s.t || ""), l));
    });
  }), n.push("</ThreadedComments>"), n.join("");
}
function Hu(e) {
  var r = [We, J("personList", null, {
    xmlns: $e.TCMNT,
    "xmlns:x": jr[0]
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
function Gu(e) {
  var r = {};
  r.iauthor = e.read_shift(4);
  var t = Fr(e);
  return r.rfx = t.s, r.ref = ye(t.s), e.l += 16, r;
}
function Vu(e, r) {
  return r == null && (r = B(36)), r.write_shift(4, e[1].iauthor), Kr(e[0], r), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r;
}
var $u = rt;
function zu(e) {
  return Xe(e.slice(0, 54));
}
function Xu(e) {
  var r = lt(), t = [];
  return H(
    r,
    628
    /* BrtBeginComments */
  ), H(
    r,
    630
    /* BrtBeginCommentAuthors */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      t.indexOf(a.a) > -1 || (t.push(a.a.slice(0, 54)), H(r, 632, zu(a.a)));
    });
  }), H(
    r,
    631
    /* BrtEndCommentAuthors */
  ), H(
    r,
    633
    /* BrtBeginCommentList */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      a.iauthor = t.indexOf(a.a);
      var i = { s: ze(n[0]), e: ze(n[0]) };
      H(r, 635, Vu([i, a])), a.t && a.t.length > 0 && H(r, 637, Yc(a)), H(
        r,
        636
        /* BrtEndComment */
      ), delete a.iauthor;
    });
  }), H(
    r,
    634
    /* BrtEndCommentList */
  ), H(
    r,
    629
    /* BrtEndComments */
  ), r.end();
}
function ju(e, r) {
  r.FullPaths.forEach(function(t, n) {
    if (n != 0) {
      var a = t.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      a.slice(-1) !== "/" && Ce.utils.cfb_add(e, a, r.FileIndex[n].content);
    }
  });
}
var Af = ["xlsb", "xlsm", "xlam", "biff8", "xla"], Yu = /* @__PURE__ */ (function() {
  var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, r = { r: 0, c: 0 };
  function t(n, a, i, s) {
    var f = !1, l = !1;
    i.length == 0 ? l = !0 : i.charAt(0) == "[" && (l = !0, i = i.slice(1, -1)), s.length == 0 ? f = !0 : s.charAt(0) == "[" && (f = !0, s = s.slice(1, -1));
    var o = i.length > 0 ? parseInt(i, 10) | 0 : 0, c = s.length > 0 ? parseInt(s, 10) | 0 : 0;
    return f ? c += r.c : --c, l ? o += r.r : --o, a + (f ? "" : "$") + tt(c) + (l ? "" : "$") + Ze(o);
  }
  return function(a, i) {
    return r = i, a.replace(e, t);
  };
})(), gi = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g, wi = /* @__PURE__ */ (function() {
  return function(r, t) {
    return r.replace(gi, function(n, a, i, s, f, l) {
      var o = xi(s) - (i ? 0 : t.c), c = ui(l) - (f ? 0 : t.r), u = c == 0 ? "" : f ? c + 1 : "[" + c + "]", d = o == 0 ? "" : i ? o + 1 : "[" + o + "]";
      return a + "R" + u + "C" + d;
    });
  };
})();
function Ku(e, r) {
  return e.replace(gi, function(t, n, a, i, s, f) {
    return n + (a == "$" ? a + i : tt(xi(i) + r.c)) + (s == "$" ? s + f : Ze(ui(f) + r.r));
  });
}
function Ju(e) {
  return e.length != 1;
}
function be(e) {
  e.l += 1;
}
function nr(e, r) {
  var t = e.read_shift(2);
  return [t & 16383, t >> 14 & 1, t >> 15 & 1];
}
function kf(e, r, t) {
  var n = 2;
  if (t) {
    if (t.biff >= 2 && t.biff <= 5) return Of(e);
    t.biff == 12 && (n = 4);
  }
  var a = e.read_shift(n), i = e.read_shift(n), s = nr(e), f = nr(e);
  return { s: { r: a, c: s[0], cRel: s[1], rRel: s[2] }, e: { r: i, c: f[0], cRel: f[1], rRel: f[2] } };
}
function Of(e) {
  var r = nr(e), t = nr(e), n = e.read_shift(1), a = e.read_shift(1);
  return { s: { r: r[0], c: n, cRel: r[1], rRel: r[2] }, e: { r: t[0], c: a, cRel: t[1], rRel: t[2] } };
}
function Qu(e, r, t) {
  if (t.biff < 8) return Of(e);
  var n = e.read_shift(t.biff == 12 ? 4 : 2), a = e.read_shift(t.biff == 12 ? 4 : 2), i = nr(e), s = nr(e);
  return { s: { r: n, c: i[0], cRel: i[1], rRel: i[2] }, e: { r: a, c: s[0], cRel: s[1], rRel: s[2] } };
}
function Rf(e, r, t) {
  if (t && t.biff >= 2 && t.biff <= 5) return Zu(e);
  var n = e.read_shift(t && t.biff == 12 ? 4 : 2), a = nr(e);
  return { r: n, c: a[0], cRel: a[1], rRel: a[2] };
}
function Zu(e) {
  var r = nr(e), t = e.read_shift(1);
  return { r: r[0], c: t, cRel: r[1], rRel: r[2] };
}
function qu(e) {
  var r = e.read_shift(2), t = e.read_shift(2);
  return { r, c: t & 255, fQuoted: !!(t & 16384), cRel: t >> 15, rRel: t >> 15 };
}
function e1(e, r, t) {
  var n = t && t.biff ? t.biff : 8;
  if (n >= 2 && n <= 5) return t1(e);
  var a = e.read_shift(n >= 12 ? 4 : 2), i = e.read_shift(2), s = (i & 16384) >> 14, f = (i & 32768) >> 15;
  if (i &= 16383, f == 1) for (; a > 524287; ) a -= 1048576;
  if (s == 1) for (; i > 8191; ) i = i - 16384;
  return { r: a, c: i, cRel: s, rRel: f };
}
function t1(e) {
  var r = e.read_shift(2), t = e.read_shift(1), n = (r & 32768) >> 15, a = (r & 16384) >> 14;
  return r &= 16383, n == 1 && r >= 8192 && (r = r - 16384), a == 1 && t >= 128 && (t = t - 256), { r, c: t, cRel: a, rRel: n };
}
function r1(e, r, t) {
  var n = (e[e.l++] & 96) >> 5, a = kf(e, t.biff >= 2 && t.biff <= 5 ? 6 : 8, t);
  return [n, a];
}
function n1(e, r, t) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2, "i"), i = 8;
  if (t) switch (t.biff) {
    case 5:
      e.l += 12, i = 6;
      break;
    case 12:
      i = 12;
      break;
  }
  var s = kf(e, i, t);
  return [n, a, s];
}
function a1(e, r, t) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += t && t.biff > 8 ? 12 : t.biff < 8 ? 6 : 8, [n];
}
function i1(e, r, t) {
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
function s1(e, r, t) {
  var n = (e[e.l++] & 96) >> 5, a = Qu(e, r - 1, t);
  return [n, a];
}
function f1(e, r, t) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += t.biff == 2 ? 6 : t.biff == 12 ? 14 : 7, [n];
}
function P0(e) {
  var r = e[e.l + 1] & 1, t = 1;
  return e.l += 4, [r, t];
}
function o1(e, r, t) {
  e.l += 2;
  for (var n = e.read_shift(t && t.biff == 2 ? 1 : 2), a = [], i = 0; i <= n; ++i) a.push(e.read_shift(t && t.biff == 2 ? 1 : 2));
  return a;
}
function l1(e, r, t) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(t && t.biff == 2 ? 1 : 2)];
}
function c1(e, r, t) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(t && t.biff == 2 ? 1 : 2)];
}
function h1(e) {
  var r = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [r, e.read_shift(2)];
}
function u1(e, r, t) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += t && t.biff == 2 ? 3 : 4, [n];
}
function If(e) {
  var r = e.read_shift(1), t = e.read_shift(1);
  return [r, t];
}
function x1(e) {
  return e.read_shift(2), If(e);
}
function d1(e) {
  return e.read_shift(2), If(e);
}
function m1(e, r, t) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = Rf(e, 0, t);
  return [n, a];
}
function p1(e, r, t) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e1(e, 0, t);
  return [n, a];
}
function v1(e, r, t) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(2);
  t && t.biff == 5 && (e.l += 12);
  var i = Rf(e, 0, t);
  return [n, a, i];
}
function _1(e, r, t) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(t && t.biff <= 3 ? 1 : 2);
  return [_x[a], Pf[a], n];
}
function g1(e, r, t) {
  var n = e[e.l++], a = e.read_shift(1), i = t && t.biff <= 3 ? [n == 88 ? -1 : 0, e.read_shift(1)] : w1(e);
  return [a, (i[0] === 0 ? Pf : vx)[i[1]]];
}
function w1(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function T1(e, r, t) {
  e.l += t && t.biff == 2 ? 3 : 4;
}
function E1(e, r, t) {
  if (e.l++, t && t.biff == 12) return [e.read_shift(4, "i"), 0];
  var n = e.read_shift(2), a = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return [n, a];
}
function S1(e) {
  return e.l++, An[e.read_shift(1)];
}
function y1(e) {
  return e.l++, e.read_shift(2);
}
function F1(e) {
  return e.l++, e.read_shift(1) !== 0;
}
function C1(e) {
  return e.l++, Jr(e);
}
function A1(e, r, t) {
  return e.l++, xf(e, r - 1, t);
}
function k1(e, r) {
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
      t[1] = vh(e, 1) ? "TRUE" : "FALSE", r != 12 && (e.l += 7);
      break;
    case 37:
    /* appears to be an alias */
    case 16:
      t[1] = An[e[e.l]], e.l += r == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      t[1] = Jr(e);
      break;
    case 2:
      t[1] = Th(e, 0, { biff: r > 0 && r < 8 ? 2 : r });
      break;
    default:
      throw new Error("Bad SerAr: " + t[0]);
  }
  return t;
}
function O1(e, r, t) {
  for (var n = e.read_shift(t.biff == 12 ? 4 : 2), a = [], i = 0; i != n; ++i) a.push((t.biff == 12 ? Fr : yh)(e));
  return a;
}
function R1(e, r, t) {
  var n = 0, a = 0;
  t.biff == 12 ? (n = e.read_shift(4), a = e.read_shift(4)) : (a = 1 + e.read_shift(1), n = 1 + e.read_shift(2)), t.biff >= 2 && t.biff < 8 && (--n, --a == 0 && (a = 256));
  for (var i = 0, s = []; i != n && (s[i] = []); ++i)
    for (var f = 0; f != a; ++f) s[i][f] = k1(e, t.biff);
  return s;
}
function I1(e, r, t) {
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
function D1(e, r, t) {
  if (t.biff == 5) return N1(e);
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(2), i = e.read_shift(4);
  return [n, a, i];
}
function N1(e) {
  var r = e.read_shift(1) >>> 5 & 3, t = e.read_shift(2, "i");
  e.l += 8;
  var n = e.read_shift(2);
  return e.l += 12, [r, t, n];
}
function P1(e, r, t) {
  var n = e.read_shift(1) >>> 5 & 3;
  e.l += t && t.biff == 2 ? 3 : 4;
  var a = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return [n, a];
}
function M1(e, r, t) {
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return [n, a];
}
function L1(e, r, t) {
  var n = e.read_shift(1) >>> 5 & 3;
  return e.l += 4, t.biff < 8 && e.l--, t.biff == 12 && (e.l += 2), [n];
}
function B1(e, r, t) {
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
var b1 = Mt, U1 = Mt, W1 = Mt;
function kn(e, r, t) {
  return e.l += 2, [qu(e)];
}
function Ti(e) {
  return e.l += 6, [];
}
var H1 = kn, G1 = Ti, V1 = Ti, $1 = kn;
function Df(e) {
  return e.l += 2, [hf(e), e.read_shift(2) & 1];
}
var z1 = kn, X1 = Df, j1 = Ti, Y1 = kn, K1 = kn, J1 = [
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
function Q1(e) {
  e.l += 2;
  var r = e.read_shift(2), t = e.read_shift(2), n = e.read_shift(4), a = e.read_shift(2), i = e.read_shift(2), s = J1[t >> 2 & 31];
  return { ixti: r, coltype: t & 3, rt: s, idx: n, c: a, C: i };
}
function Z1(e) {
  return e.l += 2, [e.read_shift(4)];
}
function q1(e, r, t) {
  return e.l += 5, e.l += 2, e.l += t.biff == 2 ? 1 : 4, ["PTGSHEET"];
}
function ex(e, r, t) {
  return e.l += t.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function tx(e) {
  var r = e.read_shift(1) >>> 5 & 3, t = e.read_shift(2);
  return [r, t];
}
function rx(e) {
  var r = e.read_shift(1) >>> 5 & 3, t = e.read_shift(2);
  return [r, t];
}
function nx(e) {
  return e.l += 4, [0, 0];
}
var M0 = {
  /*::[*/
  1: { n: "PtgExp", f: E1 },
  /*::[*/
  2: { n: "PtgTbl", f: W1 },
  /*::[*/
  3: { n: "PtgAdd", f: be },
  /*::[*/
  4: { n: "PtgSub", f: be },
  /*::[*/
  5: { n: "PtgMul", f: be },
  /*::[*/
  6: { n: "PtgDiv", f: be },
  /*::[*/
  7: { n: "PtgPower", f: be },
  /*::[*/
  8: { n: "PtgConcat", f: be },
  /*::[*/
  9: { n: "PtgLt", f: be },
  /*::[*/
  10: { n: "PtgLe", f: be },
  /*::[*/
  11: { n: "PtgEq", f: be },
  /*::[*/
  12: { n: "PtgGe", f: be },
  /*::[*/
  13: { n: "PtgGt", f: be },
  /*::[*/
  14: { n: "PtgNe", f: be },
  /*::[*/
  15: { n: "PtgIsect", f: be },
  /*::[*/
  16: { n: "PtgUnion", f: be },
  /*::[*/
  17: { n: "PtgRange", f: be },
  /*::[*/
  18: { n: "PtgUplus", f: be },
  /*::[*/
  19: { n: "PtgUminus", f: be },
  /*::[*/
  20: { n: "PtgPercent", f: be },
  /*::[*/
  21: { n: "PtgParen", f: be },
  /*::[*/
  22: { n: "PtgMissArg", f: be },
  /*::[*/
  23: { n: "PtgStr", f: A1 },
  /*::[*/
  26: { n: "PtgSheet", f: q1 },
  /*::[*/
  27: { n: "PtgEndSheet", f: ex },
  /*::[*/
  28: { n: "PtgErr", f: S1 },
  /*::[*/
  29: { n: "PtgBool", f: F1 },
  /*::[*/
  30: { n: "PtgInt", f: y1 },
  /*::[*/
  31: { n: "PtgNum", f: C1 },
  /*::[*/
  32: { n: "PtgArray", f: f1 },
  /*::[*/
  33: { n: "PtgFunc", f: _1 },
  /*::[*/
  34: { n: "PtgFuncVar", f: g1 },
  /*::[*/
  35: { n: "PtgName", f: I1 },
  /*::[*/
  36: { n: "PtgRef", f: m1 },
  /*::[*/
  37: { n: "PtgArea", f: r1 },
  /*::[*/
  38: { n: "PtgMemArea", f: P1 },
  /*::[*/
  39: { n: "PtgMemErr", f: b1 },
  /*::[*/
  40: { n: "PtgMemNoMem", f: U1 },
  /*::[*/
  41: { n: "PtgMemFunc", f: M1 },
  /*::[*/
  42: { n: "PtgRefErr", f: L1 },
  /*::[*/
  43: { n: "PtgAreaErr", f: a1 },
  /*::[*/
  44: { n: "PtgRefN", f: p1 },
  /*::[*/
  45: { n: "PtgAreaN", f: s1 },
  /*::[*/
  46: { n: "PtgMemAreaN", f: tx },
  /*::[*/
  47: { n: "PtgMemNoMemN", f: rx },
  /*::[*/
  57: { n: "PtgNameX", f: D1 },
  /*::[*/
  58: { n: "PtgRef3d", f: v1 },
  /*::[*/
  59: { n: "PtgArea3d", f: n1 },
  /*::[*/
  60: { n: "PtgRefErr3d", f: B1 },
  /*::[*/
  61: { n: "PtgAreaErr3d", f: i1 },
  /*::[*/
  255: {}
}, ax = {
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
}, ix = {
  /*::[*/
  1: { n: "PtgElfLel", f: Df },
  /*::[*/
  2: { n: "PtgElfRw", f: Y1 },
  /*::[*/
  3: { n: "PtgElfCol", f: H1 },
  /*::[*/
  6: { n: "PtgElfRwV", f: K1 },
  /*::[*/
  7: { n: "PtgElfColV", f: $1 },
  /*::[*/
  10: { n: "PtgElfRadical", f: z1 },
  /*::[*/
  11: { n: "PtgElfRadicalS", f: j1 },
  /*::[*/
  13: { n: "PtgElfColS", f: G1 },
  /*::[*/
  15: { n: "PtgElfColSV", f: V1 },
  /*::[*/
  16: { n: "PtgElfRadicalLel", f: X1 },
  /*::[*/
  25: { n: "PtgList", f: Q1 },
  /*::[*/
  29: { n: "PtgSxName", f: Z1 },
  /*::[*/
  255: {}
}, sx = {
  /*::[*/
  0: { n: "PtgAttrNoop", f: nx },
  /*::[*/
  1: { n: "PtgAttrSemi", f: u1 },
  /*::[*/
  2: { n: "PtgAttrIf", f: c1 },
  /*::[*/
  4: { n: "PtgAttrChoose", f: o1 },
  /*::[*/
  8: { n: "PtgAttrGoto", f: l1 },
  /*::[*/
  16: { n: "PtgAttrSum", f: T1 },
  /*::[*/
  32: { n: "PtgAttrBaxcel", f: P0 },
  /*::[*/
  33: { n: "PtgAttrBaxcel", f: P0 },
  /*::[*/
  64: { n: "PtgAttrSpace", f: x1 },
  /*::[*/
  65: { n: "PtgAttrSpaceSemi", f: d1 },
  /*::[*/
  128: { n: "PtgAttrIfError", f: h1 },
  /*::[*/
  255: {}
};
function fx(e, r, t, n) {
  if (n.biff < 8) return Mt(e, r);
  for (var a = e.l + r, i = [], s = 0; s !== t.length; ++s)
    switch (t[s][0]) {
      case "PtgArray":
        t[s][1] = R1(e, 0, n), i.push(t[s][1]);
        break;
      case "PtgMemArea":
        t[s][2] = O1(e, t[s][1], n), i.push(t[s][2]);
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
  return r = a - e.l, r !== 0 && i.push(Mt(e, r)), i;
}
function ox(e, r, t) {
  for (var n = e.l + r, a, i, s = []; n != e.l; )
    r = n - e.l, i = e[e.l], a = M0[i] || M0[ax[i]], (i === 24 || i === 25) && (a = (i === 24 ? ix : sx)[e[e.l + 1]]), !a || !a.f ? Mt(e, r) : s.push([a.n, a.f(e, r, t)]);
  return s;
}
function lx(e) {
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
var cx = {
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
function hx(e, r) {
  if (!e && !(r && r.biff <= 5 && r.biff >= 2)) throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e + "'" : e;
}
function Nf(e, r, t) {
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
function L0(e, r, t) {
  var n = Nf(e, r, t);
  return n == "#REF" ? n : hx(n, t);
}
function Xr(e, r, t, n, a) {
  var i = a && a.biff || 8, s = (
    /*range != null ? range :*/
    { s: { c: 0, r: 0 } }
  ), f = [], l, o, c, u = 0, d = 0, m, g = "";
  if (!e[0] || !e[0][0]) return "";
  for (var h = -1, _ = "", k = 0, O = e[0].length; k < O; ++k) {
    var C = e[0][k];
    switch (C[0]) {
      case "PtgUminus":
        f.push("-" + f.pop());
        break;
      case "PtgUplus":
        f.push("+" + f.pop());
        break;
      case "PtgPercent":
        f.push(f.pop() + "%");
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
        if (l = f.pop(), o = f.pop(), h >= 0) {
          switch (e[0][h][1][0]) {
            case 0:
              _ = Pe(" ", e[0][h][1][1]);
              break;
            case 1:
              _ = Pe("\r", e[0][h][1][1]);
              break;
            default:
              if (_ = "", a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][h][1][0]);
          }
          o = o + _, h = -1;
        }
        f.push(o + cx[C[0]] + l);
        break;
      case "PtgIsect":
        l = f.pop(), o = f.pop(), f.push(o + " " + l);
        break;
      case "PtgUnion":
        l = f.pop(), o = f.pop(), f.push(o + "," + l);
        break;
      case "PtgRange":
        l = f.pop(), o = f.pop(), f.push(o + ":" + l);
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
        c = hn(C[1][1], s, a), f.push(un(c, i));
        break;
      case "PtgRefN":
        c = t ? hn(C[1][1], t, a) : C[1][1], f.push(un(c, i));
        break;
      case "PtgRef3d":
        u = /*::Number(*/
        C[1][1], c = hn(C[1][2], s, a), g = L0(n, u, a), f.push(g + "!" + un(c, i));
        break;
      case "PtgFunc":
      /* [MS-XLS] 2.5.198.62 */
      case "PtgFuncVar":
        var L = C[1][0], Y = C[1][1];
        L || (L = 0), L &= 127;
        var q = L == 0 ? [] : f.slice(-L);
        f.length -= L, Y === "User" && (Y = q.shift()), f.push(Y + "(" + q.join(",") + ")");
        break;
      case "PtgBool":
        f.push(C[1] ? "TRUE" : "FALSE");
        break;
      case "PtgInt":
        f.push(
          /*::String(*/
          C[1]
          /*::)*/
        );
        break;
      case "PtgNum":
        f.push(String(C[1]));
        break;
      case "PtgStr":
        f.push('"' + C[1].replace(/"/g, '""') + '"');
        break;
      case "PtgErr":
        f.push(
          /*::String(*/
          C[1]
          /*::)*/
        );
        break;
      case "PtgAreaN":
        m = w0(C[1][1], t ? { s: t } : s, a), f.push(ka(m, a));
        break;
      case "PtgArea":
        m = w0(C[1][1], s, a), f.push(ka(m, a));
        break;
      case "PtgArea3d":
        u = /*::Number(*/
        C[1][1], m = C[1][2], g = L0(n, u, a), f.push(g + "!" + ka(m, a));
        break;
      case "PtgAttrSum":
        f.push("SUM(" + f.pop() + ")");
        break;
      case "PtgAttrBaxcel":
      /* [MS-XLS] 2.5.198.33 */
      case "PtgAttrSemi":
        break;
      case "PtgName":
        d = C[1][2];
        var F = (n.names || [])[d - 1] || (n[0] || [])[d], b = F ? F.Name : "SH33TJSNAME" + String(d);
        b && b.slice(0, 6) == "_xlfn." && !a.xlfn && (b = b.slice(6)), f.push(b);
        break;
      case "PtgNameX":
        var D = C[1][1];
        d = C[1][2];
        var W;
        if (a.biff <= 5)
          D < 0 && (D = -D), n[D] && (W = n[D][d]);
        else {
          var V = "";
          if (((n[D] || [])[0] || [])[0] == 14849 || (((n[D] || [])[0] || [])[0] == 1025 ? n[D][d] && n[D][d].itab > 0 && (V = n.SheetNames[n[D][d].itab - 1] + "!") : V = n.SheetNames[d - 1] + "!"), n[D] && n[D][d]) V += n[D][d].Name;
          else if (n[0] && n[0][d]) V += n[0][d].Name;
          else {
            var z = (Nf(n, D, a) || "").split(";;");
            z[d - 1] ? V = z[d - 1] : V += "SH33TJSERRX";
          }
          f.push(V);
          break;
        }
        W || (W = { Name: "SH33TJSERRY" }), f.push(W.Name);
        break;
      case "PtgParen":
        var ee = "(", Fe = ")";
        if (h >= 0) {
          switch (_ = "", e[0][h][1][0]) {
            // $FlowIgnore
            case 2:
              ee = Pe(" ", e[0][h][1][1]) + ee;
              break;
            // $FlowIgnore
            case 3:
              ee = Pe("\r", e[0][h][1][1]) + ee;
              break;
            // $FlowIgnore
            case 4:
              Fe = Pe(" ", e[0][h][1][1]) + Fe;
              break;
            // $FlowIgnore
            case 5:
              Fe = Pe("\r", e[0][h][1][1]) + Fe;
              break;
            default:
              if (a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][h][1][0]);
          }
          h = -1;
        }
        f.push(ee + f.pop() + Fe);
        break;
      case "PtgRefErr":
        f.push("#REF!");
        break;
      case "PtgRefErr3d":
        f.push("#REF!");
        break;
      case "PtgExp":
        c = { c: C[1][1], r: C[1][0] };
        var ce = { c: t.c, r: t.r };
        if (n.sharedf[ye(c)]) {
          var je = n.sharedf[ye(c)];
          f.push(Xr(je, s, ce, n, a));
        } else {
          var Le = !1;
          for (l = 0; l != n.arrayf.length; ++l)
            if (o = n.arrayf[l], !(c.c < o[0].s.c || c.c > o[0].e.c) && !(c.r < o[0].s.r || c.r > o[0].e.r)) {
              f.push(Xr(o[1], s, ce, n, a)), Le = !0;
              break;
            }
          Le || f.push(
            /*::String(*/
            C[1]
            /*::)*/
          );
        }
        break;
      case "PtgArray":
        f.push("{" + lx(
          /*::(*/
          C[1]
          /*:: :any)*/
        ) + "}");
        break;
      case "PtgMemArea":
        break;
      case "PtgAttrSpace":
      /* [MS-XLS] 2.5.198.38 */
      case "PtgAttrSpaceSemi":
        h = k;
        break;
      case "PtgTbl":
        break;
      case "PtgMemErr":
        break;
      case "PtgMissArg":
        f.push("");
        break;
      case "PtgAreaErr":
        f.push("#REF!");
        break;
      case "PtgAreaErr3d":
        f.push("#REF!");
        break;
      case "PtgList":
        f.push("Table" + C[1].idx + "[#" + C[1].rt + "]");
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
        throw new Error("Unrecognized Formula Token: " + String(C));
      default:
        throw new Error("Unrecognized Formula Token: " + String(C));
    }
    var Ft = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (a.biff != 3 && h >= 0 && Ft.indexOf(e[0][k][0]) == -1) {
      C = e[0][h];
      var Ve = !0;
      switch (C[1][0]) {
        /* note: some bad XLSB files omit the PtgParen */
        case 4:
          Ve = !1;
        /* falls through */
        case 0:
          _ = Pe(" ", C[1][1]);
          break;
        case 5:
          Ve = !1;
        /* falls through */
        case 1:
          _ = Pe("\r", C[1][1]);
          break;
        default:
          if (_ = "", a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + C[1][0]);
      }
      f.push((Ve ? _ : "") + f.pop() + (Ve ? "" : _)), h = -1;
    }
  }
  if (f.length > 1 && a.WTF) throw new Error("bad formula stack");
  return f[0];
}
function ux(e) {
  if (e == null) {
    var r = B(8);
    return r.write_shift(1, 3), r.write_shift(1, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 65535), r;
  } else if (typeof e == "number") return gr(e);
  return gr(0);
}
function xx(e, r, t, n, a) {
  var i = wr(r, t, a), s = ux(e.v), f = B(6), l = 33;
  f.write_shift(2, l), f.write_shift(4, 0);
  for (var o = B(e.bf.length), c = 0; c < e.bf.length; ++c) o[c] = e.bf[c];
  var u = Je([i, s, f, o]);
  return u;
}
function ua(e, r, t) {
  var n = e.read_shift(4), a = ox(e, n, t), i = e.read_shift(4), s = i > 0 ? fx(e, i, a, t) : null;
  return [a, s];
}
var dx = ua, xa = ua, mx = ua, px = ua, vx = {
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
}, Pf = {
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
}, _x = {
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
function gx(e) {
  var r = "of:=" + e.replace(gi, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
  return r.replace(/;/g, "|").replace(/,/g, ";");
}
function wx(e) {
  return e.replace(/\./, "!");
}
var xn = typeof Map < "u";
function Ei(e, r, t) {
  var n = 0, a = e.length;
  if (t) {
    if (xn ? t.has(r) : Object.prototype.hasOwnProperty.call(t, r)) {
      for (var i = xn ? t.get(r) : t[r]; n < i.length; ++n)
        if (e[i[n]].t === r)
          return e.Count++, i[n];
    }
  } else for (; n < a; ++n)
    if (e[n].t === r)
      return e.Count++, n;
  return e[a] = { t: r }, e.Count++, e.Unique++, t && (xn ? (t.has(r) || t.set(r, []), t.get(r).push(a)) : (Object.prototype.hasOwnProperty.call(t, r) || (t[r] = []), t[r].push(a))), a;
}
function da(e, r) {
  var t = { min: e + 1, max: e + 1 }, n = -1;
  return r.MDW && (Vt = r.MDW), r.width != null ? t.customWidth = 1 : r.wpx != null ? n = na(r.wpx) : r.wch != null && (n = r.wch), n > -1 ? (t.width = qa(n), t.customWidth = 1) : r.width != null && (t.width = r.width), r.hidden && (t.hidden = !0), r.level != null && (t.outlineLevel = t.level = r.level), t;
}
function Mf(e, r) {
  if (e) {
    var t = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    e.left == null && (e.left = t[0]), e.right == null && (e.right = t[1]), e.top == null && (e.top = t[2]), e.bottom == null && (e.bottom = t[3]), e.header == null && (e.header = t[4]), e.footer == null && (e.footer = t[5]);
  }
}
function sr(e, r, t) {
  var n = t.revssf[r.z != null ? r.z : "General"], a = 60, i = e.length;
  if (n == null && t.ssf) {
    for (; a < 392; ++a) if (t.ssf[a] == null) {
      Os(r.z, a), t.ssf[a] = r.z, t.revssf[r.z] = n = a;
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
function Tx(e, r, t) {
  if (e && e["!ref"]) {
    var n = Re(e["!ref"]);
    if (n.e.c < n.s.c || n.e.r < n.s.r) throw new Error("Bad range (" + t + "): " + e["!ref"]);
  }
}
function Ex(e) {
  if (e.length === 0) return "";
  for (var r = '<mergeCells count="' + e.length + '">', t = 0; t != e.length; ++t) r += '<mergeCell ref="' + Ue(e[t]) + '"/>';
  return r + "</mergeCells>";
}
function Sx(e, r, t, n, a) {
  var i = !1, s = {}, f = null;
  if (n.bookType !== "xlsx" && r.vbaraw) {
    var l = r.SheetNames[t];
    try {
      r.Workbook && (l = r.Workbook.Sheets[t].CodeName || l);
    } catch {
    }
    i = !0, s.codeName = _n(Se(l));
  }
  if (e && e["!outline"]) {
    var o = { summaryBelow: 1, summaryRight: 1 };
    e["!outline"].above && (o.summaryBelow = 0), e["!outline"].left && (o.summaryRight = 0), f = (f || "") + J("outlinePr", null, o);
  }
  !i && !f || (a[a.length] = J("sheetPr", f, s));
}
var yx = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"], Fx = [
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
function Cx(e) {
  var r = { sheet: 1 };
  return yx.forEach(function(t) {
    e[t] != null && e[t] && (r[t] = "1");
  }), Fx.forEach(function(t) {
    e[t] != null && !e[t] && (r[t] = "0");
  }), e.password && (r.password = _f(e.password).toString(16).toUpperCase()), J("sheetProtection", null, r);
}
function Ax(e) {
  return Mf(e), J("pageMargins", null, e);
}
function kx(e, r) {
  for (var t = ["<cols>"], n, a = 0; a != r.length; ++a)
    (n = r[a]) && (t[t.length] = J("col", null, da(a, n)));
  return t[t.length] = "</cols>", t.join("");
}
function Ox(e, r, t, n) {
  var a = typeof e.ref == "string" ? e.ref : Ue(e.ref);
  t.Workbook || (t.Workbook = { Sheets: [] }), t.Workbook.Names || (t.Workbook.Names = []);
  var i = t.Workbook.Names, s = vt(a);
  s.s.r == s.e.r && (s.e.r = vt(r["!ref"]).e.r, a = Ue(s));
  for (var f = 0; f < i.length; ++f) {
    var l = i[f];
    if (l.Name == "_xlnm._FilterDatabase" && l.Sheet == n) {
      l.Ref = "'" + t.SheetNames[n] + "'!" + a;
      break;
    }
  }
  return f == i.length && i.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + t.SheetNames[n] + "'!" + a }), J("autoFilter", null, { ref: a });
}
function Rx(e, r, t, n) {
  var a = { workbookViewId: "0" };
  return (((n || {}).Workbook || {}).Views || [])[0] && (a.rightToLeft = n.Workbook.Views[0].RTL ? "1" : "0"), J("sheetViews", J("sheetView", null, a), {});
}
function Ix(e, r, t, n) {
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
      a = An[e.v];
      break;
    case "d":
      n && n.cellDates ? a = ft(e.v, -1).toISOString() : (e = ht(e), e.t = "n", a = "" + (e.v = ct(ft(e.v)))), typeof e.z > "u" && (e.z = Me[14]);
      break;
    default:
      a = e.v;
      break;
  }
  var f = Qe("v", Se(a)), l = { r }, o = sr(n.cellXfs, e, n);
  switch (o !== 0 && (l.s = o), e.t) {
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
        f = Qe("v", "" + Ei(n.Strings, e.v, n.revStrings)), l.t = "s";
        break;
      }
      l.t = "str";
      break;
  }
  if (e.t != i && (e.t = i, e.v = s), typeof e.f == "string" && e.f) {
    var c = e.F && e.F.slice(0, r.length) == r ? { t: "array", ref: e.F } : null;
    f = J("f", Se(e.f), c) + (e.v != null ? f : "");
  }
  return e.l && t["!links"].push([r, e.l]), e.D && (l.cm = 1), J("c", f, l);
}
function Dx(e, r, t, n) {
  var a = [], i = [], s = Re(e["!ref"]), f = "", l, o = "", c = [], u = 0, d = 0, m = e["!rows"], g = Array.isArray(e), h = { r: o }, _, k = -1;
  for (d = s.s.c; d <= s.e.c; ++d) c[d] = tt(d);
  for (u = s.s.r; u <= s.e.r; ++u) {
    for (i = [], o = Ze(u), d = s.s.c; d <= s.e.c; ++d) {
      l = c[d] + o;
      var O = g ? (e[u] || [])[d] : e[l];
      O !== void 0 && (f = Ix(O, l, e, r)) != null && i.push(f);
    }
    (i.length > 0 || m && m[u]) && (h = { r: o }, m && m[u] && (_ = m[u], _.hidden && (h.hidden = 1), k = -1, _.hpx ? k = aa(_.hpx) : _.hpt && (k = _.hpt), k > -1 && (h.ht = k, h.customHeight = 1), _.level && (h.outlineLevel = _.level)), a[a.length] = J("row", i.join(""), h));
  }
  if (m) for (; u < m.length; ++u)
    m && m[u] && (h = { r: u + 1 }, _ = m[u], _.hidden && (h.hidden = 1), k = -1, _.hpx ? k = aa(_.hpx) : _.hpt && (k = _.hpt), k > -1 && (h.ht = k, h.customHeight = 1), _.level && (h.outlineLevel = _.level), a[a.length] = J("row", "", h));
  return a.join("");
}
function Lf(e, r, t, n) {
  var a = [We, J("worksheet", null, {
    xmlns: jr[0],
    "xmlns:r": $e.r
  })], i = t.SheetNames[e], s = 0, f = "", l = t.Sheets[i];
  l == null && (l = {});
  var o = l["!ref"] || "A1", c = Re(o);
  if (c.e.c > 16383 || c.e.r > 1048575) {
    if (r.WTF) throw new Error("Range " + o + " exceeds format limit A1:XFD1048576");
    c.e.c = Math.min(c.e.c, 16383), c.e.r = Math.min(c.e.c, 1048575), o = Ue(c);
  }
  n || (n = {}), l["!comments"] = [];
  var u = [];
  Sx(l, t, e, r, a), a[a.length] = J("dimension", null, { ref: o }), a[a.length] = Rx(l, r, e, t), r.sheetFormat && (a[a.length] = J("sheetFormatPr", null, {
    defaultRowHeight: r.sheetFormat.defaultRowHeight || "16",
    baseColWidth: r.sheetFormat.baseColWidth || "10",
    outlineLevelRow: r.sheetFormat.outlineLevelRow || "7"
  })), l["!cols"] != null && l["!cols"].length > 0 && (a[a.length] = kx(l, l["!cols"])), a[s = a.length] = "<sheetData/>", l["!links"] = [], l["!ref"] != null && (f = Dx(l, r), f.length > 0 && (a[a.length] = f)), a.length > s + 1 && (a[a.length] = "</sheetData>", a[s] = a[s].replace("/>", ">")), l["!protect"] && (a[a.length] = Cx(l["!protect"])), l["!autofilter"] != null && (a[a.length] = Ox(l["!autofilter"], l, t, e)), l["!merges"] != null && l["!merges"].length > 0 && (a[a.length] = Ex(l["!merges"]));
  var d = -1, m, g = -1;
  return (
    /*::(*/
    l["!links"].length > 0 && (a[a.length] = "<hyperlinks>", l["!links"].forEach(function(h) {
      h[1].Target && (m = { ref: h[0] }, h[1].Target.charAt(0) != "#" && (g = Ee(n, -1, Se(h[1].Target).replace(/#.*$/, ""), pe.HLINK), m["r:id"] = "rId" + g), (d = h[1].Target.indexOf("#")) > -1 && (m.location = Se(h[1].Target.slice(d + 1))), h[1].Tooltip && (m.tooltip = Se(h[1].Tooltip)), a[a.length] = J("hyperlink", null, m));
    }), a[a.length] = "</hyperlinks>"), delete l["!links"], l["!margins"] != null && (a[a.length] = Ax(l["!margins"])), (!r || r.ignoreEC || r.ignoreEC == null) && (a[a.length] = Qe("ignoredErrors", J("ignoredError", null, { numberStoredAsText: 1, sqref: o }))), u.length > 0 && (g = Ee(n, -1, "../drawings/drawing" + (e + 1) + ".xml", pe.DRAW), a[a.length] = J("drawing", null, { "r:id": "rId" + g }), l["!drawing"] = u), l["!comments"].length > 0 && (g = Ee(n, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", pe.VML), a[a.length] = J("legacyDrawing", null, { "r:id": "rId" + g }), l["!legacy"] = g), a.length > 1 && (a[a.length] = "</worksheet>", a[1] = a[1].replace("/>", ">")), a.join("")
  );
}
function Nx(e, r) {
  var t = {}, n = e.l + r;
  t.r = e.read_shift(4), e.l += 4;
  var a = e.read_shift(2);
  e.l += 1;
  var i = e.read_shift(1);
  return e.l = n, i & 7 && (t.level = i & 7), i & 16 && (t.hidden = !0), i & 32 && (t.hpt = a / 20), t;
}
function Px(e, r, t) {
  var n = B(145), a = (t["!rows"] || [])[e] || {};
  n.write_shift(4, e), n.write_shift(4, 0);
  var i = 320;
  a.hpx ? i = aa(a.hpx) * 20 : a.hpt && (i = a.hpt * 20), n.write_shift(2, i), n.write_shift(1, 0);
  var s = 0;
  a.level && (s |= a.level), a.hidden && (s |= 16), (a.hpx || a.hpt) && (s |= 32), n.write_shift(1, s), n.write_shift(1, 0);
  var f = 0, l = n.l;
  n.l += 4;
  for (var o = { r: e, c: 0 }, c = 0; c < 16; ++c)
    if (!(r.s.c > c + 1 << 10 || r.e.c < c << 10)) {
      for (var u = -1, d = -1, m = c << 10; m < c + 1 << 10; ++m) {
        o.c = m;
        var g = Array.isArray(t) ? (t[o.r] || [])[o.c] : t[ye(o)];
        g && (u < 0 && (u = m), d = m);
      }
      u < 0 || (++f, n.write_shift(4, u), n.write_shift(4, d));
    }
  var h = n.l;
  return n.l = l, n.write_shift(4, f), n.l = h, n.length > n.l ? n.slice(0, n.l) : n;
}
function Mx(e, r, t, n) {
  var a = Px(n, t, r);
  (a.length > 17 || (r["!rows"] || [])[n]) && H(e, 0, a);
}
var Lx = Fr, Bx = Kr;
function bx() {
}
function Ux(e, r) {
  var t = {}, n = e[e.l];
  return ++e.l, t.above = !(n & 64), t.left = !(n & 128), e.l += 18, t.name = Kc(e), t;
}
function Wx(e, r, t) {
  t == null && (t = B(84 + 4 * e.length));
  var n = 192;
  r && (r.above && (n &= -65), r.left && (n &= -129)), t.write_shift(1, n);
  for (var a = 1; a < 3; ++a) t.write_shift(1, 0);
  return ea({ auto: 1 }, t), t.write_shift(-4, -1), t.write_shift(-4, -1), Js(e, t), t.slice(0, t.l);
}
function Hx(e) {
  var r = yt(e);
  return [r];
}
function Gx(e, r, t) {
  return t == null && (t = B(8)), Er(r, t);
}
function Vx(e) {
  var r = Sr(e);
  return [r];
}
function $x(e, r, t) {
  return t == null && (t = B(4)), yr(r, t);
}
function zx(e) {
  var r = yt(e), t = e.read_shift(1);
  return [r, t, "b"];
}
function Xx(e, r, t) {
  return t == null && (t = B(9)), Er(r, t), t.write_shift(1, e.v ? 1 : 0), t;
}
function jx(e) {
  var r = Sr(e), t = e.read_shift(1);
  return [r, t, "b"];
}
function Yx(e, r, t) {
  return t == null && (t = B(5)), yr(r, t), t.write_shift(1, e.v ? 1 : 0), t;
}
function Kx(e) {
  var r = yt(e), t = e.read_shift(1);
  return [r, t, "e"];
}
function Jx(e, r, t) {
  return t == null && (t = B(9)), Er(r, t), t.write_shift(1, e.v), t;
}
function Qx(e) {
  var r = Sr(e), t = e.read_shift(1);
  return [r, t, "e"];
}
function Zx(e, r, t) {
  return t == null && (t = B(8)), yr(r, t), t.write_shift(1, e.v), t.write_shift(2, 0), t.write_shift(1, 0), t;
}
function qx(e) {
  var r = yt(e), t = e.read_shift(4);
  return [r, t, "s"];
}
function ed(e, r, t) {
  return t == null && (t = B(12)), Er(r, t), t.write_shift(4, r.v), t;
}
function td(e) {
  var r = Sr(e), t = e.read_shift(4);
  return [r, t, "s"];
}
function rd(e, r, t) {
  return t == null && (t = B(8)), yr(r, t), t.write_shift(4, r.v), t;
}
function nd(e) {
  var r = yt(e), t = Jr(e);
  return [r, t, "n"];
}
function ad(e, r, t) {
  return t == null && (t = B(16)), Er(r, t), gr(e.v, t), t;
}
function id(e) {
  var r = Sr(e), t = Jr(e);
  return [r, t, "n"];
}
function sd(e, r, t) {
  return t == null && (t = B(12)), yr(r, t), gr(e.v, t), t;
}
function fd(e) {
  var r = yt(e), t = Qs(e);
  return [r, t, "n"];
}
function od(e, r, t) {
  return t == null && (t = B(12)), Er(r, t), Zs(e.v, t), t;
}
function ld(e) {
  var r = Sr(e), t = Qs(e);
  return [r, t, "n"];
}
function cd(e, r, t) {
  return t == null && (t = B(8)), yr(r, t), Zs(e.v, t), t;
}
function hd(e) {
  var r = yt(e), t = di(e);
  return [r, t, "is"];
}
function ud(e) {
  var r = yt(e), t = rt(e);
  return [r, t, "str"];
}
function xd(e, r, t) {
  return t == null && (t = B(12 + 4 * e.v.length)), Er(r, t), Xe(e.v, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function dd(e) {
  var r = Sr(e), t = rt(e);
  return [r, t, "str"];
}
function md(e, r, t) {
  return t == null && (t = B(8 + 4 * e.v.length)), yr(r, t), Xe(e.v, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function pd(e, r, t) {
  var n = e.l + r, a = yt(e);
  a.r = t["!row"];
  var i = e.read_shift(1), s = [a, i, "b"];
  if (t.cellFormula) {
    e.l += 2;
    var f = xa(e, n - e.l, t);
    s[3] = Xr(f, null, a, t.supbooks, t);
  } else e.l = n;
  return s;
}
function vd(e, r, t) {
  var n = e.l + r, a = yt(e);
  a.r = t["!row"];
  var i = e.read_shift(1), s = [a, i, "e"];
  if (t.cellFormula) {
    e.l += 2;
    var f = xa(e, n - e.l, t);
    s[3] = Xr(f, null, a, t.supbooks, t);
  } else e.l = n;
  return s;
}
function _d(e, r, t) {
  var n = e.l + r, a = yt(e);
  a.r = t["!row"];
  var i = Jr(e), s = [a, i, "n"];
  if (t.cellFormula) {
    e.l += 2;
    var f = xa(e, n - e.l, t);
    s[3] = Xr(f, null, a, t.supbooks, t);
  } else e.l = n;
  return s;
}
function gd(e, r, t) {
  var n = e.l + r, a = yt(e);
  a.r = t["!row"];
  var i = rt(e), s = [a, i, "str"];
  if (t.cellFormula) {
    e.l += 2;
    var f = xa(e, n - e.l, t);
    s[3] = Xr(f, null, a, t.supbooks, t);
  } else e.l = n;
  return s;
}
var wd = Fr, Td = Kr;
function Ed(e, r) {
  return r == null && (r = B(4)), r.write_shift(4, e), r;
}
function Sd(e, r) {
  var t = e.l + r, n = Fr(e), a = mi(e), i = rt(e), s = rt(e), f = rt(e);
  e.l = t;
  var l = { rfx: n, relId: a, loc: i, display: f };
  return s && (l.Tooltip = s), l;
}
function yd(e, r) {
  var t = B(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
  Kr({ s: ze(e[0]), e: ze(e[0]) }, t), pi("rId" + r, t);
  var n = e[1].Target.indexOf("#"), a = n == -1 ? "" : e[1].Target.slice(n + 1);
  return Xe(a || "", t), Xe(e[1].Tooltip || "", t), Xe("", t), t.slice(0, t.l);
}
function Fd() {
}
function Cd(e, r, t) {
  var n = e.l + r, a = qs(e), i = e.read_shift(1), s = [a];
  if (s[2] = i, t.cellFormula) {
    var f = dx(e, n - e.l, t);
    s[1] = f;
  } else e.l = n;
  return s;
}
function Ad(e, r, t) {
  var n = e.l + r, a = Fr(e), i = [a];
  if (t.cellFormula) {
    var s = px(e, n - e.l, t);
    i[1] = s, e.l = n;
  } else e.l = n;
  return i;
}
function kd(e, r, t) {
  t == null && (t = B(18));
  var n = da(e, r);
  t.write_shift(-4, e), t.write_shift(-4, e), t.write_shift(4, (n.width || 10) * 256), t.write_shift(
    4,
    0
    /*ixfe*/
  );
  var a = 0;
  return r.hidden && (a |= 1), typeof n.width == "number" && (a |= 2), r.level && (a |= r.level << 8), t.write_shift(2, a), t;
}
var Bf = ["left", "right", "top", "bottom", "header", "footer"];
function Od(e) {
  var r = {};
  return Bf.forEach(function(t) {
    r[t] = Jr(e);
  }), r;
}
function Rd(e, r) {
  return r == null && (r = B(48)), Mf(e), Bf.forEach(function(t) {
    gr(e[t], r);
  }), r;
}
function Id(e) {
  var r = e.read_shift(2);
  return e.l += 28, { RTL: r & 32 };
}
function Dd(e, r, t) {
  t == null && (t = B(30));
  var n = 924;
  return (((r || {}).Views || [])[0] || {}).RTL && (n |= 32), t.write_shift(2, n), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(2, 0), t.write_shift(2, 100), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(4, 0), t;
}
function Nd(e) {
  var r = B(24);
  return r.write_shift(4, 4), r.write_shift(4, 1), Kr(e, r), r;
}
function Pd(e, r) {
  return r == null && (r = B(66)), r.write_shift(2, e.password ? _f(e.password) : 0), r.write_shift(4, 1), [
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
function Md() {
}
function Ld() {
}
function Bd(e, r, t, n, a, i, s) {
  if (r.v === void 0) return !1;
  var f = "";
  switch (r.t) {
    case "b":
      f = r.v ? "1" : "0";
      break;
    case "d":
      r = ht(r), r.z = r.z || Me[14], r.v = ct(ft(r.v)), r.t = "n";
      break;
    /* falls through */
    case "n":
    case "e":
      f = "" + r.v;
      break;
    default:
      f = r.v;
      break;
  }
  var l = { r: t, c: n };
  switch (l.s = sr(a.cellXfs, r, a), r.l && i["!links"].push([ye(l), r.l]), r.c && i["!comments"].push([ye(l), r.c]), r.t) {
    case "s":
    case "str":
      return a.bookSST ? (f = Ei(a.Strings, r.v, a.revStrings), l.t = "s", l.v = f, s ? H(e, 18, rd(r, l)) : H(e, 7, ed(r, l))) : (l.t = "str", s ? H(e, 17, md(r, l)) : H(e, 6, xd(r, l))), !0;
    case "n":
      return r.v == (r.v | 0) && r.v > -1e3 && r.v < 1e3 ? s ? H(e, 13, cd(r, l)) : H(e, 2, od(r, l)) : s ? H(e, 16, sd(r, l)) : H(e, 5, ad(r, l)), !0;
    case "b":
      return l.t = "b", s ? H(e, 15, Yx(r, l)) : H(e, 4, Xx(r, l)), !0;
    case "e":
      return l.t = "e", s ? H(e, 14, Zx(r, l)) : H(e, 3, Jx(r, l)), !0;
  }
  return s ? H(e, 12, $x(r, l)) : H(e, 1, Gx(r, l)), !0;
}
function bd(e, r, t, n) {
  var a = Re(r["!ref"] || "A1"), i, s = "", f = [];
  H(
    e,
    145
    /* BrtBeginSheetData */
  );
  var l = Array.isArray(r), o = a.e.r;
  r["!rows"] && (o = Math.max(a.e.r, r["!rows"].length - 1));
  for (var c = a.s.r; c <= o; ++c) {
    s = Ze(c), Mx(e, r, a, c);
    var u = !1;
    if (c <= a.e.r) for (var d = a.s.c; d <= a.e.c; ++d) {
      c === a.s.r && (f[d] = tt(d)), i = f[d] + s;
      var m = l ? (r[c] || [])[d] : r[i];
      if (!m) {
        u = !1;
        continue;
      }
      u = Bd(e, m, c, d, n, r, u);
    }
  }
  H(
    e,
    146
    /* BrtEndSheetData */
  );
}
function Ud(e, r) {
  !r || !r["!merges"] || (H(e, 177, Ed(r["!merges"].length)), r["!merges"].forEach(function(t) {
    H(e, 176, Td(t));
  }), H(
    e,
    178
    /* BrtEndMergeCells */
  ));
}
function Wd(e, r) {
  !r || !r["!cols"] || (H(
    e,
    390
    /* BrtBeginColInfos */
  ), r["!cols"].forEach(function(t, n) {
    t && H(e, 60, kd(n, t));
  }), H(
    e,
    391
    /* BrtEndColInfos */
  ));
}
function Hd(e, r) {
  !r || !r["!ref"] || (H(
    e,
    648
    /* BrtBeginCellIgnoreECs */
  ), H(e, 649, Nd(Re(r["!ref"]))), H(
    e,
    650
    /* BrtEndCellIgnoreECs */
  ));
}
function Gd(e, r, t) {
  r["!links"].forEach(function(n) {
    if (n[1].Target) {
      var a = Ee(t, -1, n[1].Target.replace(/#.*$/, ""), pe.HLINK);
      H(e, 494, yd(n, a));
    }
  }), delete r["!links"];
}
function Vd(e, r, t, n) {
  if (r["!comments"].length > 0) {
    var a = Ee(n, -1, "../drawings/vmlDrawing" + (t + 1) + ".vml", pe.VML);
    H(e, 551, pi("rId" + a)), r["!legacy"] = a;
  }
}
function $d(e, r, t, n) {
  if (r["!autofilter"]) {
    var a = r["!autofilter"], i = typeof a.ref == "string" ? a.ref : Ue(a.ref);
    t.Workbook || (t.Workbook = { Sheets: [] }), t.Workbook.Names || (t.Workbook.Names = []);
    var s = t.Workbook.Names, f = vt(i);
    f.s.r == f.e.r && (f.e.r = vt(r["!ref"]).e.r, i = Ue(f));
    for (var l = 0; l < s.length; ++l) {
      var o = s[l];
      if (o.Name == "_xlnm._FilterDatabase" && o.Sheet == n) {
        o.Ref = "'" + t.SheetNames[n] + "'!" + i;
        break;
      }
    }
    l == s.length && s.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + t.SheetNames[n] + "'!" + i }), H(e, 161, Kr(Re(i))), H(
      e,
      162
      /* BrtEndAFilter */
    );
  }
}
function zd(e, r, t) {
  H(
    e,
    133
    /* BrtBeginWsViews */
  ), H(e, 137, Dd(r, t)), H(
    e,
    138
    /* BrtEndWsView */
  ), H(
    e,
    134
    /* BrtEndWsViews */
  );
}
function Xd(e, r) {
  r["!protect"] && H(e, 535, Pd(r["!protect"]));
}
function jd(e, r, t, n) {
  var a = lt(), i = t.SheetNames[e], s = t.Sheets[i] || {}, f = i;
  try {
    t && t.Workbook && (f = t.Workbook.Sheets[e].CodeName || f);
  } catch {
  }
  var l = Re(s["!ref"] || "A1");
  if (l.e.c > 16383 || l.e.r > 1048575) {
    if (r.WTF) throw new Error("Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
    l.e.c = Math.min(l.e.c, 16383), l.e.r = Math.min(l.e.c, 1048575);
  }
  return s["!links"] = [], s["!comments"] = [], H(
    a,
    129
    /* BrtBeginSheet */
  ), (t.vbaraw || s["!outline"]) && H(a, 147, Wx(f, s["!outline"])), H(a, 148, Bx(l)), zd(a, s, t.Workbook), Wd(a, s), bd(a, s, e, r), Xd(a, s), $d(a, s, t, e), Ud(a, s), Gd(a, s, n), s["!margins"] && H(a, 476, Rd(s["!margins"])), (!r || r.ignoreEC || r.ignoreEC == null) && Hd(a, s), Vd(a, s, e, n), H(
    a,
    130
    /* BrtEndSheet */
  ), a.end();
}
function Yd(e, r) {
  e.l += 10;
  var t = rt(e);
  return { name: t };
}
var Kd = [
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
function Jd(e) {
  return !e.Workbook || !e.Workbook.WBProps ? "false" : Ac(e.Workbook.WBProps.date1904) ? "true" : "false";
}
var Qd = /* @__PURE__ */ "][*?/\\".split("");
function bf(e, r) {
  if (e.length > 31)
    throw new Error("Sheet names cannot exceed 31 chars");
  var t = !0;
  return Qd.forEach(function(n) {
    if (e.indexOf(n) != -1)
      throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
  }), t;
}
function Zd(e, r, t) {
  e.forEach(function(n, a) {
    bf(n);
    for (var i = 0; i < a; ++i) if (n == e[i]) throw new Error("Duplicate Sheet Name: " + n);
    if (t) {
      var s = r && r[a] && r[a].CodeName || n;
      if (s.charCodeAt(0) == 95 && s.length > 22) throw new Error("Bad Code Name: Worksheet" + s);
    }
  });
}
function qd(e) {
  if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
  if (!e.SheetNames.length) throw new Error("Workbook is empty");
  var r = e.Workbook && e.Workbook.Sheets || [];
  Zd(e.SheetNames, r, !!e.vbaraw);
  for (var t = 0; t < e.SheetNames.length; ++t) Tx(e.Sheets[e.SheetNames[t]], e.SheetNames[t], t);
}
function Uf(e) {
  var r = [We];
  r[r.length] = J("workbook", null, {
    xmlns: jr[0],
    //'xmlns:mx': XMLNS.mx,
    //'xmlns:s': XMLNS_main[0],
    "xmlns:r": $e.r
  });
  var t = e.Workbook && (e.Workbook.Names || []).length > 0, n = { codeName: "ThisWorkbook" };
  e.Workbook && e.Workbook.WBProps && (Kd.forEach(function(f) {
    e.Workbook.WBProps[f[0]] != null && e.Workbook.WBProps[f[0]] != f[1] && (n[f[0]] = e.Workbook.WBProps[f[0]]);
  }), e.Workbook.WBProps.CodeName && (n.codeName = e.Workbook.WBProps.CodeName, delete n.CodeName)), r[r.length] = J("workbookPr", null, n);
  var a = e.Workbook && e.Workbook.Sheets || [], i = 0;
  if (a && a[0] && a[0].Hidden) {
    for (r[r.length] = "<bookViews>", i = 0; i != e.SheetNames.length && !(!a[i] || !a[i].Hidden); ++i)
      ;
    i == e.SheetNames.length && (i = 0), r[r.length] = '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>', r[r.length] = "</bookViews>";
  }
  for (r[r.length] = "<sheets>", i = 0; i != e.SheetNames.length; ++i) {
    var s = { name: Se(e.SheetNames[i].slice(0, 31)) };
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
  return r[r.length] = "</sheets>", t && (r[r.length] = "<definedNames>", e.Workbook && e.Workbook.Names && e.Workbook.Names.forEach(function(f) {
    var l = { name: f.Name };
    f.Comment && (l.comment = f.Comment), f.Sheet != null && (l.localSheetId = "" + f.Sheet), f.Hidden && (l.hidden = "1"), f.Ref && (r[r.length] = J("definedName", Se(f.Ref), l));
  }), r[r.length] = "</definedNames>"), r.length > 2 && (r[r.length] = "</workbook>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function em(e, r) {
  var t = {};
  return t.Hidden = e.read_shift(4), t.iTabID = e.read_shift(4), t.strRelID = Za(e), t.name = rt(e), t;
}
function tm(e, r) {
  return r || (r = B(127)), r.write_shift(4, e.Hidden), r.write_shift(4, e.iTabID), pi(e.strRelID, r), Xe(e.name.slice(0, 31), r), r.length > r.l ? r.slice(0, r.l) : r;
}
function rm(e, r) {
  var t = {}, n = e.read_shift(4);
  t.defaultThemeVersion = e.read_shift(4);
  var a = r > 8 ? rt(e) : "";
  return a.length > 0 && (t.CodeName = a), t.autoCompressPictures = !!(n & 65536), t.backupFile = !!(n & 64), t.checkCompatibility = !!(n & 4096), t.date1904 = !!(n & 1), t.filterPrivacy = !!(n & 8), t.hidePivotFieldList = !!(n & 1024), t.promptedSolutions = !!(n & 16), t.publishItems = !!(n & 2048), t.refreshAllConnections = !!(n & 262144), t.saveExternalLinkValues = !!(n & 128), t.showBorderUnselectedTables = !!(n & 4), t.showInkAnnotation = !!(n & 32), t.showObjects = ["all", "placeholders", "none"][n >> 13 & 3], t.showPivotChartFilter = !!(n & 32768), t.updateLinks = ["userSet", "never", "always"][n >> 8 & 3], t;
}
function nm(e, r) {
  r || (r = B(72));
  var t = 0;
  return e && e.filterPrivacy && (t |= 8), r.write_shift(4, t), r.write_shift(4, 0), Js(e && e.CodeName || "ThisWorkbook", r), r.slice(0, r.l);
}
function am(e, r, t) {
  var n = e.l + r;
  e.l += 4, e.l += 1;
  var a = e.read_shift(4), i = Jc(e), s = mx(e, 0, t), f = mi(e);
  e.l = n;
  var l = { Name: i, Ptg: s };
  return a < 268435455 && (l.Sheet = a), f && (l.Comment = f), l;
}
function im(e, r) {
  H(
    e,
    143
    /* BrtBeginBundleShs */
  );
  for (var t = 0; t != r.SheetNames.length; ++t) {
    var n = r.Workbook && r.Workbook.Sheets && r.Workbook.Sheets[t] && r.Workbook.Sheets[t].Hidden || 0, a = { Hidden: n, iTabID: t + 1, strRelID: "rId" + (t + 1), name: r.SheetNames[t] };
    H(e, 156, tm(a));
  }
  H(
    e,
    144
    /* BrtEndBundleShs */
  );
}
function sm(e, r) {
  r || (r = B(127));
  for (var t = 0; t != 4; ++t) r.write_shift(4, 0);
  return Xe("SheetJS", r), Xe(Xn.version, r), Xe(Xn.version, r), Xe("7262", r), r.length > r.l ? r.slice(0, r.l) : r;
}
function fm(e, r) {
  r || (r = B(29)), r.write_shift(-4, 0), r.write_shift(-4, 460), r.write_shift(4, 28800), r.write_shift(4, 17600), r.write_shift(4, 500), r.write_shift(4, e), r.write_shift(4, e);
  var t = 120;
  return r.write_shift(1, t), r.length > r.l ? r.slice(0, r.l) : r;
}
function om(e, r) {
  if (!(!r.Workbook || !r.Workbook.Sheets)) {
    for (var t = r.Workbook.Sheets, n = 0, a = -1, i = -1; n < t.length; ++n)
      !t[n] || !t[n].Hidden && a == -1 ? a = n : t[n].Hidden == 1 && i == -1 && (i = n);
    i > a || (H(
      e,
      135
      /* BrtBeginBookViews */
    ), H(e, 158, fm(a)), H(
      e,
      136
      /* BrtEndBookViews */
    ));
  }
}
function lm(e, r) {
  var t = lt();
  return H(
    t,
    131
    /* BrtBeginBook */
  ), H(t, 128, sm()), H(t, 153, nm(e.Workbook && e.Workbook.WBProps || null)), om(t, e), im(t, e), H(
    t,
    132
    /* BrtEndBook */
  ), t.end();
}
function cm(e, r, t) {
  return (r.slice(-4) === ".bin" ? lm : Uf)(e);
}
function hm(e, r, t, n, a) {
  return (r.slice(-4) === ".bin" ? jd : Lf)(e, t, n, a);
}
function um(e, r, t) {
  return (r.slice(-4) === ".bin" ? Ru : Tf)(e, t);
}
function xm(e, r, t) {
  return (r.slice(-4) === ".bin" ? nu : vf)(e, t);
}
function dm(e, r, t) {
  return (r.slice(-4) === ".bin" ? Xu : Cf)(e);
}
function mm(e) {
  return (e.slice(-4) === ".bin" ? bu : yf)();
}
function pm(e, r) {
  var t = [];
  return e.Props && t.push(uh(e.Props, r)), e.Custprops && t.push(xh(e.Props, e.Custprops)), t.join("");
}
function vm() {
  return "";
}
function _m(e, r) {
  var t = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
  return r.cellXfs.forEach(function(n, a) {
    var i = [];
    i.push(J("NumberFormat", null, { "ss:Format": Se(Me[n.numFmtId]) }));
    var s = (
      /*::(*/
      { "ss:ID": "s" + (21 + a) }
    );
    t.push(J("Style", i.join(""), s));
  }), J("Styles", t.join(""));
}
function Wf(e) {
  return J("NamedRange", null, { "ss:Name": e.Name, "ss:RefersTo": "=" + wi(e.Ref, { r: 0, c: 0 }) });
}
function gm(e) {
  if (!((e || {}).Workbook || {}).Names) return "";
  for (var r = e.Workbook.Names, t = [], n = 0; n < r.length; ++n) {
    var a = r[n];
    a.Sheet == null && (a.Name.match(/^_xlfn\./) || t.push(Wf(a)));
  }
  return J("Names", t.join(""));
}
function wm(e, r, t, n) {
  if (!e || !((n || {}).Workbook || {}).Names) return "";
  for (var a = n.Workbook.Names, i = [], s = 0; s < a.length; ++s) {
    var f = a[s];
    f.Sheet == t && (f.Name.match(/^_xlfn\./) || i.push(Wf(f)));
  }
  return i.join("");
}
function Tm(e, r, t, n) {
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
  return ((((n || {}).Workbook || {}).Views || [])[0] || {}).RTL && a.push("<DisplayRightToLeft/>"), e["!protect"] && (a.push(Qe("ProtectContents", "True")), e["!protect"].objects && a.push(Qe("ProtectObjects", "True")), e["!protect"].scenarios && a.push(Qe("ProtectScenarios", "True")), e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells ? a.push(Qe("EnableSelection", "NoSelection")) : e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells && a.push(Qe("EnableSelection", "UnlockedCells")), [
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
  })), a.length == 0 ? "" : J("WorksheetOptions", a.join(""), { xmlns: mt.x });
}
function Em(e) {
  return e.map(function(r) {
    var t = Cc(r.t || ""), n = J("ss:Data", t, { xmlns: "http://www.w3.org/TR/REC-html40" });
    return J("Comment", n, { "ss:Author": r.a });
  }).join("");
}
function Sm(e, r, t, n, a, i, s) {
  if (!e || e.v == null && e.f == null) return "";
  var f = {};
  if (e.f && (f["ss:Formula"] = "=" + Se(wi(e.f, s))), e.F && e.F.slice(0, r.length) == r) {
    var l = ze(e.F.slice(r.length + 1));
    f["ss:ArrayRange"] = "RC:R" + (l.r == s.r ? "" : "[" + (l.r - s.r) + "]") + "C" + (l.c == s.c ? "" : "[" + (l.c - s.c) + "]");
  }
  if (e.l && e.l.Target && (f["ss:HRef"] = Se(e.l.Target), e.l.Tooltip && (f["x:HRefScreenTip"] = Se(e.l.Tooltip))), t["!merges"])
    for (var o = t["!merges"], c = 0; c != o.length; ++c)
      o[c].s.c != s.c || o[c].s.r != s.r || (o[c].e.c > o[c].s.c && (f["ss:MergeAcross"] = o[c].e.c - o[c].s.c), o[c].e.r > o[c].s.r && (f["ss:MergeDown"] = o[c].e.r - o[c].s.r));
  var u = "", d = "";
  switch (e.t) {
    case "z":
      if (!n.sheetStubs) return "";
      break;
    case "n":
      u = "Number", d = String(e.v);
      break;
    case "b":
      u = "Boolean", d = e.v ? "1" : "0";
      break;
    case "e":
      u = "Error", d = An[e.v];
      break;
    case "d":
      u = "DateTime", d = new Date(e.v).toISOString(), e.z == null && (e.z = e.z || Me[14]);
      break;
    case "s":
      u = "String", d = Fc(e.v || "");
      break;
  }
  var m = sr(n.cellXfs, e, n);
  f["ss:StyleID"] = "s" + (21 + m), f["ss:Index"] = s.c + 1;
  var g = e.v != null ? d : "", h = e.t == "z" ? "" : '<Data ss:Type="' + u + '">' + g + "</Data>";
  return (e.c || []).length > 0 && (h += Em(e.c)), J("Cell", h, f);
}
function ym(e, r) {
  var t = '<Row ss:Index="' + (e + 1) + '"';
  return r && (r.hpt && !r.hpx && (r.hpx = wf(r.hpt)), r.hpx && (t += ' ss:AutoFitHeight="0" ss:Height="' + r.hpx + '"'), r.hidden && (t += ' ss:Hidden="1"')), t + ">";
}
function Fm(e, r, t, n) {
  if (!e["!ref"]) return "";
  var a = Re(e["!ref"]), i = e["!merges"] || [], s = 0, f = [];
  e["!cols"] && e["!cols"].forEach(function(_, k) {
    _i(_);
    var O = !!_.width, C = da(k, _), L = { "ss:Index": k + 1 };
    O && (L["ss:Width"] = ra(C.width)), _.hidden && (L["ss:Hidden"] = "1"), f.push(J("Column", null, L));
  });
  for (var l = Array.isArray(e), o = a.s.r; o <= a.e.r; ++o) {
    for (var c = [ym(o, (e["!rows"] || [])[o])], u = a.s.c; u <= a.e.c; ++u) {
      var d = !1;
      for (s = 0; s != i.length; ++s)
        if (!(i[s].s.c > u) && !(i[s].s.r > o) && !(i[s].e.c < u) && !(i[s].e.r < o)) {
          (i[s].s.c != u || i[s].s.r != o) && (d = !0);
          break;
        }
      if (!d) {
        var m = { r: o, c: u }, g = ye(m), h = l ? (e[o] || [])[u] : e[g];
        c.push(Sm(h, g, e, r, t, n, m));
      }
    }
    c.push("</Row>"), c.length > 2 && f.push(c.join(""));
  }
  return f.join("");
}
function Cm(e, r, t) {
  var n = [], a = t.SheetNames[e], i = t.Sheets[a], s = i ? wm(i, r, e, t) : "";
  return s.length > 0 && n.push("<Names>" + s + "</Names>"), s = i ? Fm(i, r, e, t) : "", s.length > 0 && n.push("<Table>" + s + "</Table>"), n.push(Tm(i, r, e, t)), n.join("");
}
function Am(e, r) {
  r || (r = {}), e.SSF || (e.SSF = ht(Me)), e.SSF && (la(), oa(e.SSF), r.revssf = ca(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF, r.cellXfs = [], sr(r.cellXfs, {}, { revssf: { General: 0 } }));
  var t = [];
  t.push(pm(e, r)), t.push(vm()), t.push(""), t.push("");
  for (var n = 0; n < e.SheetNames.length; ++n)
    t.push(J("Worksheet", Cm(n, r, e), { "ss:Name": Se(e.SheetNames[n]) }));
  return t[2] = _m(e, r), t[3] = gm(e), We + J("Workbook", t.join(""), {
    xmlns: mt.ss,
    "xmlns:o": mt.o,
    "xmlns:x": mt.x,
    "xmlns:ss": mt.ss,
    "xmlns:dt": mt.dt,
    "xmlns:html": mt.html
  });
}
var Ia = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function km(e, r) {
  var t = [], n = [], a = [], i = 0, s, f = l0(E0, "n"), l = l0(S0, "n");
  if (e.Props)
    for (s = qe(e.Props), i = 0; i < s.length; ++i) (Object.prototype.hasOwnProperty.call(f, s[i]) ? t : Object.prototype.hasOwnProperty.call(l, s[i]) ? n : a).push([s[i], e.Props[s[i]]]);
  if (e.Custprops)
    for (s = qe(e.Custprops), i = 0; i < s.length; ++i) Object.prototype.hasOwnProperty.call(e.Props || {}, s[i]) || (Object.prototype.hasOwnProperty.call(f, s[i]) ? t : Object.prototype.hasOwnProperty.call(l, s[i]) ? n : a).push([s[i], e.Custprops[s[i]]]);
  var o = [];
  for (i = 0; i < a.length; ++i)
    cf.indexOf(a[i][0]) > -1 || ff.indexOf(a[i][0]) > -1 || a[i][1] != null && o.push(a[i]);
  n.length && Ce.utils.cfb_add(r, "/SummaryInformation", k0(n, Ia.SI, l, S0)), (t.length || o.length) && Ce.utils.cfb_add(r, "/DocumentSummaryInformation", k0(t, Ia.DSI, f, E0, o.length ? o : null, Ia.UDI));
}
function Om(e, r) {
  var t = r || {}, n = Ce.utils.cfb_new({ root: "R" }), a = "/Workbook";
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
  return Ce.utils.cfb_add(n, a, Hf(e, t)), t.biff == 8 && (e.Props || e.Custprops) && km(e, n), t.biff == 8 && e.vbaraw && ju(n, Ce.read(e.vbaraw, { type: typeof e.vbaraw == "string" ? "binary" : "buffer" })), n;
}
var Rm = {
  /*::[*/
  0: {
    /* n:"BrtRowHdr", */
    f: Nx
  },
  /*::[*/
  1: {
    /* n:"BrtCellBlank", */
    f: Hx
  },
  /*::[*/
  2: {
    /* n:"BrtCellRk", */
    f: fd
  },
  /*::[*/
  3: {
    /* n:"BrtCellError", */
    f: Kx
  },
  /*::[*/
  4: {
    /* n:"BrtCellBool", */
    f: zx
  },
  /*::[*/
  5: {
    /* n:"BrtCellReal", */
    f: nd
  },
  /*::[*/
  6: {
    /* n:"BrtCellSt", */
    f: ud
  },
  /*::[*/
  7: {
    /* n:"BrtCellIsst", */
    f: qx
  },
  /*::[*/
  8: {
    /* n:"BrtFmlaString", */
    f: gd
  },
  /*::[*/
  9: {
    /* n:"BrtFmlaNum", */
    f: _d
  },
  /*::[*/
  10: {
    /* n:"BrtFmlaBool", */
    f: pd
  },
  /*::[*/
  11: {
    /* n:"BrtFmlaError", */
    f: vd
  },
  /*::[*/
  12: {
    /* n:"BrtShortBlank", */
    f: Vx
  },
  /*::[*/
  13: {
    /* n:"BrtShortRk", */
    f: ld
  },
  /*::[*/
  14: {
    /* n:"BrtShortError", */
    f: Qx
  },
  /*::[*/
  15: {
    /* n:"BrtShortBool", */
    f: jx
  },
  /*::[*/
  16: {
    /* n:"BrtShortReal", */
    f: id
  },
  /*::[*/
  17: {
    /* n:"BrtShortSt", */
    f: dd
  },
  /*::[*/
  18: {
    /* n:"BrtShortIsst", */
    f: td
  },
  /*::[*/
  19: {
    /* n:"BrtSSTItem", */
    f: di
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
    f: am
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
    f: uu
  },
  /*::[*/
  44: {
    /* n:"BrtFmt", */
    f: cu
  },
  /*::[*/
  45: {
    /* n:"BrtFill", */
    f: mu
  },
  /*::[*/
  46: {
    /* n:"BrtBorder", */
    f: vu
  },
  /*::[*/
  47: {
    /* n:"BrtXF", */
    f: pu
  },
  /*::[*/
  48: {
    /* n:"BrtStyle" */
  },
  /*::[*/
  49: {
    /* n:"BrtCellMeta", */
    f: Vc
  },
  /*::[*/
  50: {
    /* n:"BrtValueMeta" */
  },
  /*::[*/
  51: {
    /* n:"BrtMdb" */
    f: Nu
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
    f: $h
  },
  /*::[*/
  62: {
    /* n:"BrtCellRString", */
    f: hd
  },
  /*::[*/
  63: {
    /* n:"BrtCalcChainItem$", */
    f: Uu
  },
  /*::[*/
  64: {
    /* n:"BrtDVal", */
    f: Md
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
    f: Mt,
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
    f: Id
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
    f: Ux
  },
  /*::[*/
  148: {
    /* n:"BrtWsDim", */
    f: Lx,
    p: 16
  },
  /*::[*/
  151: {
    /* n:"BrtPane", */
    f: Fd
  },
  /*::[*/
  152: {
    /* n:"BrtSel" */
  },
  /*::[*/
  153: {
    /* n:"BrtWbProp", */
    f: rm
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
    f: em
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
    f: eu
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
    f: Fr
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
    f: wd
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
    f: Iu
  },
  /*::[*/
  336: {
    /* n:"BrtEndEsmdtinfo", */
    T: -1
  },
  /*::[*/
  337: {
    /* n:"BrtBeginEsmdb", */
    f: Lu,
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
    f: Za
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
    f: bh
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
    f: Cd
  },
  /*::[*/
  427: {
    /* n:"BrtShrFmla", */
    f: Ad
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
    f: Od
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
    f: bx
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
    f: Sd
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
    f: Za
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
    f: $u
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
    f: Gu
  },
  /*::[*/
  636: {
    /* n:"BrtEndComment", */
    T: -1
  },
  /*::[*/
  637: {
    /* n:"BrtCommentText", */
    f: jc
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
    f: Yd
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
    f: Ld
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
    i > 0 && hi(t) && e.push(t);
  }
}
function Im(e, r, t, n) {
  var a = (t || []).length || 0;
  if (a <= 8224) return Q(e, r, t, a);
  var i = r;
  if (!isNaN(i)) {
    for (var s = t.parts || [], f = 0, l = 0, o = 0; o + (s[f] || 8224) <= 8224; )
      o += s[f] || 8224, f++;
    var c = e.next(4);
    for (c.write_shift(2, i), c.write_shift(2, o), e.push(t.slice(l, l + o)), l += o; l < a; ) {
      for (c = e.next(4), c.write_shift(2, 60), o = 0; o + (s[f] || 8224) <= 8224; )
        o += s[f] || 8224, f++;
      c.write_shift(2, o), e.push(t.slice(l, l + o)), l += o;
    }
  }
}
function On(e, r, t) {
  return e || (e = B(7)), e.write_shift(2, r), e.write_shift(2, t), e.write_shift(2, 0), e.write_shift(1, 0), e;
}
function Dm(e, r, t, n) {
  var a = B(9);
  return On(a, e, r), uf(t, n || "b", a), a;
}
function Nm(e, r, t) {
  var n = B(8 + 2 * t.length);
  return On(n, e, r), n.write_shift(1, t.length), n.write_shift(t.length, t, "sbcs"), n.l < n.length ? n.slice(0, n.l) : n;
}
function Pm(e, r, t, n) {
  if (r.v != null) switch (r.t) {
    case "d":
    case "n":
      var a = r.t == "d" ? ct(ft(r.v)) : r.v;
      a == (a | 0) && a >= 0 && a < 65536 ? Q(e, 2, Yh(t, n, a)) : Q(e, 3, jh(t, n, a));
      return;
    case "b":
    case "e":
      Q(e, 5, Dm(t, n, r.v, r.t));
      return;
    /* TODO: codepage, sst */
    case "s":
    case "str":
      Q(e, 4, Nm(t, n, (r.v || "").slice(0, 255)));
      return;
  }
  Q(e, 1, On(null, t, n));
}
function Mm(e, r, t, n) {
  var a = Array.isArray(r), i = Re(r["!ref"] || "A1"), s, f = "", l = [];
  if (i.e.c > 255 || i.e.r > 16383) {
    if (n.WTF) throw new Error("Range " + (r["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    i.e.c = Math.min(i.e.c, 255), i.e.r = Math.min(i.e.c, 16383), s = Ue(i);
  }
  for (var o = i.s.r; o <= i.e.r; ++o) {
    f = Ze(o);
    for (var c = i.s.c; c <= i.e.c; ++c) {
      o === i.s.r && (l[c] = tt(c)), s = l[c] + f;
      var u = a ? (r[o] || [])[c] : r[s];
      u && Pm(e, u, o, c);
    }
  }
}
function Lm(e, r) {
  for (var t = r || {}, n = lt(), a = 0, i = 0; i < e.SheetNames.length; ++i) e.SheetNames[i] == t.sheet && (a = i);
  if (a == 0 && t.sheet && e.SheetNames[0] != t.sheet) throw new Error("Sheet not found: " + t.sheet);
  return Q(n, t.biff == 4 ? 1033 : t.biff == 3 ? 521 : 9, vi(e, 16, t)), Mm(n, e.Sheets[e.SheetNames[a]], a, t), Q(n, 10), n.end();
}
function Bm(e, r, t) {
  Q(e, 49, Rh({
    sz: 12,
    name: "Arial"
  }, t));
}
function bm(e, r, t) {
  r && [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(n) {
    for (var a = n[0]; a <= n[1]; ++a) r[a] != null && Q(e, 1054, Nh(a, r[a], t));
  });
}
function Um(e, r) {
  var t = B(19);
  t.write_shift(4, 2151), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(2, 3), t.write_shift(1, 1), t.write_shift(4, 0), Q(e, 2151, t), t = B(39), t.write_shift(4, 2152), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(2, 3), t.write_shift(1, 0), t.write_shift(4, 0), t.write_shift(2, 1), t.write_shift(4, 4), t.write_shift(2, 0), mf(Re(r["!ref"] || "A1"), t), t.write_shift(4, 4), Q(e, 2152, t);
}
function Wm(e, r) {
  for (var t = 0; t < 16; ++t) Q(e, 224, R0({ numFmtId: 0, style: !0 }, 0, r));
  r.cellXfs.forEach(function(n) {
    Q(e, 224, R0(n, 0, r));
  });
}
function Hm(e, r) {
  for (var t = 0; t < r["!links"].length; ++t) {
    var n = r["!links"][t];
    Q(e, 440, Hh(n)), n[1].Tooltip && Q(e, 2048, Gh(n));
  }
  delete r["!links"];
}
function Gm(e, r) {
  if (r) {
    var t = 0;
    r.forEach(function(n, a) {
      ++t <= 256 && n && Q(e, 125, zh(da(a, n), a));
    });
  }
}
function Vm(e, r, t, n, a) {
  var i = 16 + sr(a.cellXfs, r, a);
  if (r.v == null && !r.bf) {
    Q(e, 513, wr(t, n, i));
    return;
  }
  if (r.bf) Q(e, 6, xx(r, t, n, a, i));
  else switch (r.t) {
    case "d":
    case "n":
      var s = r.t == "d" ? ct(ft(r.v)) : r.v;
      Q(e, 515, Bh(t, n, s, i));
      break;
    case "b":
    case "e":
      Q(e, 517, Lh(t, n, r.v, i, a, r.t));
      break;
    /* TODO: codepage, sst */
    case "s":
    case "str":
      if (a.bookSST) {
        var f = Ei(a.Strings, r.v, a.revStrings);
        Q(e, 253, Ih(t, n, f, i));
      } else Q(e, 516, Dh(t, n, (r.v || "").slice(0, 255), i, a));
      break;
    default:
      Q(e, 513, wr(t, n, i));
  }
}
function $m(e, r, t) {
  var n = lt(), a = t.SheetNames[e], i = t.Sheets[a] || {}, s = (t || {}).Workbook || {}, f = (s.Sheets || [])[e] || {}, l = Array.isArray(i), o = r.biff == 8, c, u = "", d = [], m = Re(i["!ref"] || "A1"), g = o ? 65536 : 16384;
  if (m.e.c > 255 || m.e.r >= g) {
    if (r.WTF) throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    m.e.c = Math.min(m.e.c, 255), m.e.r = Math.min(m.e.c, g - 1);
  }
  Q(n, 2057, vi(t, 16, r)), Q(n, 13, Et(1)), Q(n, 12, Et(100)), Q(n, 15, st(!0)), Q(n, 17, st(!1)), Q(n, 16, gr(1e-3)), Q(n, 95, st(!0)), Q(n, 42, st(!1)), Q(n, 43, st(!1)), Q(n, 130, Et(1)), Q(n, 128, Mh()), Q(n, 131, st(!1)), Q(n, 132, st(!1)), o && Gm(n, i["!cols"]), Q(n, 512, Ph(m, r)), o && (i["!links"] = []);
  for (var h = m.s.r; h <= m.e.r; ++h) {
    u = Ze(h);
    for (var _ = m.s.c; _ <= m.e.c; ++_) {
      h === m.s.r && (d[_] = tt(_)), c = d[_] + u;
      var k = l ? (i[h] || [])[_] : i[c];
      k && (Vm(n, k, h, _, r), o && k.l && i["!links"].push([c, k.l]));
    }
  }
  var O = f.CodeName || f.name || a;
  return o && Q(n, 574, Oh((s.Views || [])[0])), o && (i["!merges"] || []).length && Q(n, 229, Wh(i["!merges"])), o && Hm(n, i), Q(n, 442, df(O)), o && Um(n, i), Q(
    n,
    10
    /* EOF */
  ), n.end();
}
function zm(e, r, t) {
  var n = lt(), a = (e || {}).Workbook || {}, i = a.Sheets || [], s = (
    /*::((*/
    a.WBProps || {
      /*::CodeName:"ThisWorkbook"*/
    }
  ), f = t.biff == 8, l = t.biff == 5;
  if (Q(n, 2057, vi(e, 5, t)), t.bookType == "xla" && Q(
    n,
    135
    /* Addin */
  ), Q(n, 225, f ? Et(1200) : null), Q(n, 193, ph(2)), l && Q(
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
  ), Q(n, 92, Fh("SheetJS", t)), Q(n, 66, Et(f ? 1200 : 1252)), f && Q(n, 353, Et(0)), f && Q(
    n,
    448
    /* Excel9File */
  ), Q(n, 317, Xh(e.SheetNames.length)), f && e.vbaraw && Q(
    n,
    211
    /* ObProj */
  ), f && e.vbaraw) {
    var o = s.CodeName || "ThisWorkbook";
    Q(n, 442, df(o));
  }
  Q(n, 156, Et(17)), Q(n, 25, st(!1)), Q(n, 18, st(!1)), Q(n, 19, Et(0)), f && Q(n, 431, st(!1)), f && Q(n, 444, Et(0)), Q(n, 61, kh()), Q(n, 64, st(!1)), Q(n, 141, Et(0)), Q(n, 34, st(Jd(e) == "true")), Q(n, 14, st(!0)), f && Q(n, 439, st(!1)), Q(n, 218, Et(0)), Bm(n, e, t), bm(n, e.SSF, t), Wm(n, t), f && Q(n, 352, st(!1));
  var c = n.end(), u = lt();
  f && Q(u, 140, Vh()), f && t.Strings && Im(u, 252, Ah(t.Strings)), Q(
    u,
    10
    /* EOF */
  );
  var d = u.end(), m = lt(), g = 0, h = 0;
  for (h = 0; h < e.SheetNames.length; ++h) g += (f ? 12 : 11) + (f ? 2 : 1) * e.SheetNames[h].length;
  var _ = c.length + g + d.length;
  for (h = 0; h < e.SheetNames.length; ++h) {
    var k = i[h] || {};
    Q(m, 133, Ch({ pos: _, hs: k.Hidden || 0, dt: 0, name: e.SheetNames[h] }, t)), _ += r[h].length;
  }
  var O = m.end();
  if (g != O.length) throw new Error("BS8 " + g + " != " + O.length);
  var C = [];
  return c.length && C.push(c), O.length && C.push(O), d.length && C.push(d), Je(C);
}
function Xm(e, r) {
  var t = r || {}, n = [];
  e && !e.SSF && (e.SSF = ht(Me)), e && e.SSF && (la(), oa(e.SSF), t.revssf = ca(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Si(t), t.cellXfs = [], sr(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {});
  for (var a = 0; a < e.SheetNames.length; ++a) n[n.length] = $m(a, t, e);
  return n.unshift(zm(e, n, t)), Je(n);
}
function Hf(e, r) {
  for (var t = 0; t <= e.SheetNames.length; ++t) {
    var n = e.Sheets[e.SheetNames[t]];
    if (!(!n || !n["!ref"])) {
      var a = vt(n["!ref"]);
      a.e.c > 255 && typeof console < "u" && console.error && console.error("Worksheet '" + e.SheetNames[t] + "' extends beyond column IV (255).  Data may be lost.");
    }
  }
  var i = r || {};
  switch (i.biff || 2) {
    case 8:
    case 5:
      return Xm(e, r);
    case 4:
    case 3:
    case 2:
      return Lm(e, r);
  }
  throw new Error("invalid type " + i.bookType + " for BIFF");
}
function jm(e, r, t, n) {
  for (var a = e["!merges"] || [], i = [], s = r.s.c; s <= r.e.c; ++s) {
    for (var f = 0, l = 0, o = 0; o < a.length; ++o)
      if (!(a[o].s.r > t || a[o].s.c > s) && !(a[o].e.r < t || a[o].e.c < s)) {
        if (a[o].s.r < t || a[o].s.c < s) {
          f = -1;
          break;
        }
        f = a[o].e.r - a[o].s.r + 1, l = a[o].e.c - a[o].s.c + 1;
        break;
      }
    if (!(f < 0)) {
      var c = ye({ r: t, c: s }), u = n.dense ? (e[t] || [])[s] : e[c], d = u && u.v != null && (u.h || yc(u.w || (zt(u), u.w) || "")) || "", m = {};
      f > 1 && (m.rowspan = f), l > 1 && (m.colspan = l), n.editable ? d = '<span contenteditable="true">' + d + "</span>" : u && (m["data-t"] = u && u.t || "z", u.v != null && (m["data-v"] = u.v), u.z != null && (m["data-z"] = u.z), u.l && (u.l.Target || "#").charAt(0) != "#" && (d = '<a href="' + u.l.Target + '">' + d + "</a>")), m.id = (n.id || "sjs") + "-" + c, i.push(J("td", d, m));
    }
  }
  var g = "<tr>";
  return g + i.join("") + "</tr>";
}
var Ym = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>', Km = "</body></html>";
function Jm(e, r, t) {
  var n = [];
  return n.join("") + "<table" + (t && t.id ? ' id="' + t.id + '"' : "") + ">";
}
function Gf(e, r) {
  var t = r || {}, n = t.header != null ? t.header : Ym, a = t.footer != null ? t.footer : Km, i = [n], s = vt(e["!ref"]);
  t.dense = Array.isArray(e), i.push(Jm(e, s, t));
  for (var f = s.s.r; f <= s.e.r; ++f) i.push(jm(e, s, f, t));
  return i.push("</table>" + a), i.join("");
}
function Vf(e, r, t) {
  var n = t || {}, a = 0, i = 0;
  if (n.origin != null)
    if (typeof n.origin == "number") a = n.origin;
    else {
      var s = typeof n.origin == "string" ? ze(n.origin) : n.origin;
      a = s.r, i = s.c;
    }
  var f = r.getElementsByTagName("tr"), l = Math.min(n.sheetRows || 1e7, f.length), o = { s: { r: 0, c: 0 }, e: { r: a, c: i } };
  if (e["!ref"]) {
    var c = vt(e["!ref"]);
    o.s.r = Math.min(o.s.r, c.s.r), o.s.c = Math.min(o.s.c, c.s.c), o.e.r = Math.max(o.e.r, c.e.r), o.e.c = Math.max(o.e.c, c.e.c), a == -1 && (o.e.r = a = c.e.r + 1);
  }
  var u = [], d = 0, m = e["!rows"] || (e["!rows"] = []), g = 0, h = 0, _ = 0, k = 0, O = 0, C = 0;
  for (e["!cols"] || (e["!cols"] = []); g < f.length && h < l; ++g) {
    var L = f[g];
    if (B0(L)) {
      if (n.display) continue;
      m[h] = { hidden: !0 };
    }
    var Y = L.children;
    for (_ = k = 0; _ < Y.length; ++_) {
      var q = Y[_];
      if (!(n.display && B0(q))) {
        var F = q.hasAttribute("data-v") ? q.getAttribute("data-v") : q.hasAttribute("v") ? q.getAttribute("v") : kc(q.innerHTML), b = q.getAttribute("data-z") || q.getAttribute("z");
        for (d = 0; d < u.length; ++d) {
          var D = u[d];
          D.s.c == k + i && D.s.r < h + a && h + a <= D.e.r && (k = D.e.c + 1 - i, d = -1);
        }
        C = +q.getAttribute("colspan") || 1, ((O = +q.getAttribute("rowspan") || 1) > 1 || C > 1) && u.push({ s: { r: h + a, c: k + i }, e: { r: h + a + (O || 1) - 1, c: k + i + (C || 1) - 1 } });
        var W = { t: "s", v: F }, V = q.getAttribute("data-t") || q.getAttribute("t") || "";
        F != null && (F.length == 0 ? W.t = V || "z" : n.raw || F.trim().length == 0 || V == "s" || (F === "TRUE" ? W = { t: "b", v: !0 } : F === "FALSE" ? W = { t: "b", v: !1 } : isNaN(Gt(F)) ? isNaN(vn(F).getDate()) || (W = { t: "d", v: ft(F) }, n.cellDates || (W = { t: "n", v: ct(W.v) }), W.z = n.dateNF || Me[14]) : W = { t: "n", v: Gt(F) })), W.z === void 0 && b != null && (W.z = b);
        var z = "", ee = q.getElementsByTagName("A");
        if (ee && ee.length) for (var Fe = 0; Fe < ee.length && !(ee[Fe].hasAttribute("href") && (z = ee[Fe].getAttribute("href"), z.charAt(0) != "#")); ++Fe) ;
        z && z.charAt(0) != "#" && (W.l = { Target: z }), n.dense ? (e[h + a] || (e[h + a] = []), e[h + a][k + i] = W) : e[ye({ c: k + i, r: h + a })] = W, o.e.c < k + i && (o.e.c = k + i), k += C;
      }
    }
    ++h;
  }
  return u.length && (e["!merges"] = (e["!merges"] || []).concat(u)), o.e.r = Math.max(o.e.r, h - 1 + a), e["!ref"] = Ue(o), h >= l && (e["!fullref"] = Ue((o.e.r = f.length - g + h - 1 + a, o))), e;
}
function $f(e, r) {
  var t = r || {}, n = t.dense ? [] : {};
  return Vf(n, e, r);
}
function Qm(e, r) {
  return Tr($f(e, r), r);
}
function B0(e) {
  var r = "", t = Zm(e);
  return t && (r = t(e).getPropertyValue("display")), r || (r = e.style && e.style.display), r === "none";
}
function Zm(e) {
  return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}
var qm = /* @__PURE__ */ (function() {
  var e = [
    "<office:master-styles>",
    '<style:master-page style:name="mp1" style:page-layout-name="mp1">',
    "<style:header/>",
    '<style:header-left style:display="false"/>',
    "<style:footer/>",
    '<style:footer-left style:display="false"/>',
    "</style:master-page>",
    "</office:master-styles>"
  ].join(""), r = "<office:document-styles " + gn({
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
    return We + r;
  };
})(), b0 = /* @__PURE__ */ (function() {
  var e = function(i) {
    return Se(i).replace(/  +/g, function(s) {
      return '<text:s text:c="' + s.length + '"/>';
    }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>");
  }, r = `          <table:table-cell />
`, t = `          <table:covered-table-cell/>
`, n = function(i, s, f) {
    var l = [];
    l.push('      <table:table table:name="' + Se(s.SheetNames[f]) + `" table:style-name="ta1">
`);
    var o = 0, c = 0, u = vt(i["!ref"] || "A1"), d = i["!merges"] || [], m = 0, g = Array.isArray(i);
    if (i["!cols"])
      for (c = 0; c <= u.e.c; ++c) l.push("        <table:table-column" + (i["!cols"][c] ? ' table:style-name="co' + i["!cols"][c].ods + '"' : "") + `></table:table-column>
`);
    var h = "", _ = i["!rows"] || [];
    for (o = 0; o < u.s.r; ++o)
      h = _[o] ? ' table:style-name="ro' + _[o].ods + '"' : "", l.push("        <table:table-row" + h + `></table:table-row>
`);
    for (; o <= u.e.r; ++o) {
      for (h = _[o] ? ' table:style-name="ro' + _[o].ods + '"' : "", l.push("        <table:table-row" + h + `>
`), c = 0; c < u.s.c; ++c) l.push(r);
      for (; c <= u.e.c; ++c) {
        var k = !1, O = {}, C = "";
        for (m = 0; m != d.length; ++m)
          if (!(d[m].s.c > c) && !(d[m].s.r > o) && !(d[m].e.c < c) && !(d[m].e.r < o)) {
            (d[m].s.c != c || d[m].s.r != o) && (k = !0), O["table:number-columns-spanned"] = d[m].e.c - d[m].s.c + 1, O["table:number-rows-spanned"] = d[m].e.r - d[m].s.r + 1;
            break;
          }
        if (k) {
          l.push(t);
          continue;
        }
        var L = ye({ r: o, c }), Y = g ? (i[o] || [])[c] : i[L];
        if (Y && Y.f && (O["table:formula"] = Se(gx(Y.f)), Y.F && Y.F.slice(0, L.length) == L)) {
          var q = vt(Y.F);
          O["table:number-matrix-columns-spanned"] = q.e.c - q.s.c + 1, O["table:number-matrix-rows-spanned"] = q.e.r - q.s.r + 1;
        }
        if (!Y) {
          l.push(r);
          continue;
        }
        switch (Y.t) {
          case "b":
            C = Y.v ? "TRUE" : "FALSE", O["office:value-type"] = "boolean", O["office:boolean-value"] = Y.v ? "true" : "false";
            break;
          case "n":
            C = Y.w || String(Y.v || 0), O["office:value-type"] = "float", O["office:value"] = Y.v || 0;
            break;
          case "s":
          case "str":
            C = Y.v == null ? "" : Y.v, O["office:value-type"] = "string";
            break;
          case "d":
            C = Y.w || ft(Y.v).toISOString(), O["office:value-type"] = "date", O["office:date-value"] = ft(Y.v).toISOString(), O["table:style-name"] = "ce1";
            break;
          //case 'e':
          default:
            l.push(r);
            continue;
        }
        var F = e(C);
        if (Y.l && Y.l.Target) {
          var b = Y.l.Target;
          b = b.charAt(0) == "#" ? "#" + wx(b.slice(1)) : b, b.charAt(0) != "#" && !b.match(/^\w+:/) && (b = "../" + b), F = J("text:a", F, { "xlink:href": b.replace(/&/g, "&amp;") });
        }
        l.push("          " + J("table:table-cell", J("text:p", F, {}), O) + `
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
    var f = 0;
    s.SheetNames.map(function(o) {
      return s.Sheets[o];
    }).forEach(function(o) {
      if (o && o["!cols"]) {
        for (var c = 0; c < o["!cols"].length; ++c) if (o["!cols"][c]) {
          var u = o["!cols"][c];
          if (u.width == null && u.wpx == null && u.wch == null) continue;
          _i(u), u.ods = f;
          var d = o["!cols"][c].wpx + "px";
          i.push('  <style:style style:name="co' + f + `" style:family="table-column">
`), i.push('   <style:table-column-properties fo:break-before="auto" style:column-width="' + d + `"/>
`), i.push(`  </style:style>
`), ++f;
        }
      }
    });
    var l = 0;
    s.SheetNames.map(function(o) {
      return s.Sheets[o];
    }).forEach(function(o) {
      if (o && o["!rows"]) {
        for (var c = 0; c < o["!rows"].length; ++c) if (o["!rows"][c]) {
          o["!rows"][c].ods = l;
          var u = o["!rows"][c].hpx + "px";
          i.push('  <style:style style:name="ro' + l + `" style:family="table-row">
`), i.push('   <style:table-row-properties fo:break-before="auto" style:row-height="' + u + `"/>
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
  return function(s, f) {
    var l = [We], o = gn({
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
    }), c = gn({
      "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
      "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
    });
    f.bookType == "fods" ? (l.push("<office:document" + o + c + `>
`), l.push(af().replace(/office:document-meta/g, "office:meta"))) : l.push("<office:document-content" + o + `>
`), a(l, s), l.push(`  <office:body>
`), l.push(`    <office:spreadsheet>
`);
    for (var u = 0; u != s.SheetNames.length; ++u) l.push(n(s.Sheets[s.SheetNames[u]], s, u));
    return l.push(`    </office:spreadsheet>
`), l.push(`  </office:body>
`), f.bookType == "fods" ? l.push("</office:document>") : l.push("</office:document-content>"), l.join("");
  };
})();
function zf(e, r) {
  if (r.bookType == "fods") return b0(e, r);
  var t = fi(), n = "", a = [], i = [];
  return n = "mimetype", he(t, n, "application/vnd.oasis.opendocument.spreadsheet"), n = "content.xml", he(t, n, b0(e, r)), a.push([n, "text/xml"]), i.push([n, "ContentFile"]), n = "styles.xml", he(t, n, qm(e, r)), a.push([n, "text/xml"]), i.push([n, "StylesFile"]), n = "meta.xml", he(t, n, We + af(
    /*::wb, opts*/
  )), a.push([n, "text/xml"]), i.push([n, "MetadataFile"]), n = "manifest.rdf", he(t, n, hh(
    i
    /*, opts*/
  )), a.push([n, "application/rdf+xml"]), n = "META-INF/manifest.xml", he(t, n, lh(
    a
    /*, opts*/
  )), t;
}
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
function ia(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function ep(e) {
  return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : Ot(_n(e));
}
function tp(e, r) {
  e:
    for (var t = 0; t <= e.length - r.length; ++t) {
      for (var n = 0; n < r.length; ++n)
        if (e[t + n] != r[n])
          continue e;
      return !0;
    }
  return !1;
}
function ar(e) {
  var r = e.reduce(function(a, i) {
    return a + i.length;
  }, 0), t = new Uint8Array(r), n = 0;
  return e.forEach(function(a) {
    t.set(a, n), n += a.length;
  }), t;
}
function rp(e, r, t) {
  var n = Math.floor(t == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(t))) + 6176 - 20, a = t / Math.pow(10, n - 6176);
  e[r + 15] |= n >> 7, e[r + 14] |= (n & 127) << 1;
  for (var i = 0; a >= 1; ++i, a /= 256)
    e[r + i] = a & 255;
  e[r + 15] |= t >= 0 ? 0 : 128;
}
function wn(e, r) {
  var t = r ? r[0] : 0, n = e[t] & 127;
  e:
    if (e[t++] >= 128 && (n |= (e[t] & 127) << 7, e[t++] < 128 || (n |= (e[t] & 127) << 14, e[t++] < 128) || (n |= (e[t] & 127) << 21, e[t++] < 128) || (n += (e[t] & 127) * Math.pow(2, 28), ++t, e[t++] < 128) || (n += (e[t] & 127) * Math.pow(2, 35), ++t, e[t++] < 128) || (n += (e[t] & 127) * Math.pow(2, 42), ++t, e[t++] < 128)))
      break e;
  return r && (r[0] = t), n;
}
function Te(e) {
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
function br(e) {
  var r = 0, t = e[r] & 127;
  e:
    if (e[r++] >= 128) {
      if (t |= (e[r] & 127) << 7, e[r++] < 128 || (t |= (e[r] & 127) << 14, e[r++] < 128) || (t |= (e[r] & 127) << 21, e[r++] < 128))
        break e;
      t |= (e[r] & 127) << 28;
    }
  return t;
}
function Ge(e) {
  for (var r = [], t = [0]; t[0] < e.length; ) {
    var n = t[0], a = wn(e, t), i = a & 7;
    a = Math.floor(a / 8);
    var s = 0, f;
    if (a == 0)
      break;
    switch (i) {
      case 0:
        {
          for (var l = t[0]; e[t[0]++] >= 128; )
            ;
          f = e.slice(l, t[0]);
        }
        break;
      case 5:
        s = 4, f = e.slice(t[0], t[0] + s), t[0] += s;
        break;
      case 1:
        s = 8, f = e.slice(t[0], t[0] + s), t[0] += s;
        break;
      case 2:
        s = wn(e, t), f = e.slice(t[0], t[0] + s), t[0] += s;
        break;
      case 3:
      case 4:
      default:
        throw new Error("PB Type ".concat(i, " for Field ").concat(a, " at offset ").concat(n));
    }
    var o = { data: f, type: i };
    r[a] == null ? r[a] = [o] : r[a].push(o);
  }
  return r;
}
function Ye(e) {
  var r = [];
  return e.forEach(function(t, n) {
    t.forEach(function(a) {
      a.data && (r.push(Te(n * 8 + a.type)), a.type == 2 && r.push(Te(a.data.length)), r.push(a.data));
    });
  }), ar(r);
}
function Ct(e) {
  for (var r, t = [], n = [0]; n[0] < e.length; ) {
    var a = wn(e, n), i = Ge(e.slice(n[0], n[0] + a));
    n[0] += a;
    var s = {
      id: br(i[1][0].data),
      messages: []
    };
    i[2].forEach(function(f) {
      var l = Ge(f.data), o = br(l[3][0].data);
      s.messages.push({
        meta: l,
        data: e.slice(n[0], n[0] + o)
      }), n[0] += o;
    }), (r = i[3]) != null && r[0] && (s.merge = br(i[3][0].data) >>> 0 > 0), t.push(s);
  }
  return t;
}
function kr(e) {
  var r = [];
  return e.forEach(function(t) {
    var n = [];
    n[1] = [{ data: Te(t.id), type: 0 }], n[2] = [], t.merge != null && (n[3] = [{ data: Te(+!!t.merge), type: 0 }]);
    var a = [];
    t.messages.forEach(function(s) {
      a.push(s.data), s.meta[3] = [{ type: 0, data: Te(s.data.length) }], n[2].push({ data: Ye(s.meta), type: 2 });
    });
    var i = Ye(n);
    r.push(Te(i.length)), r.push(i), a.forEach(function(s) {
      return r.push(s);
    });
  }), ar(r);
}
function np(e, r) {
  if (e != 0)
    throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var t = [0], n = wn(r, t), a = []; t[0] < r.length; ) {
    var i = r[t[0]] & 3;
    if (i == 0) {
      var s = r[t[0]++] >> 2;
      if (s < 60)
        ++s;
      else {
        var f = s - 59;
        s = r[t[0]], f > 1 && (s |= r[t[0] + 1] << 8), f > 2 && (s |= r[t[0] + 2] << 16), f > 3 && (s |= r[t[0] + 3] << 24), s >>>= 0, s++, t[0] += f;
      }
      a.push(r.slice(t[0], t[0] + s)), t[0] += s;
      continue;
    } else {
      var l = 0, o = 0;
      if (i == 1 ? (o = (r[t[0]] >> 2 & 7) + 4, l = (r[t[0]++] & 224) << 3, l |= r[t[0]++]) : (o = (r[t[0]++] >> 2) + 1, i == 2 ? (l = r[t[0]] | r[t[0] + 1] << 8, t[0] += 2) : (l = (r[t[0]] | r[t[0] + 1] << 8 | r[t[0] + 2] << 16 | r[t[0] + 3] << 24) >>> 0, t[0] += 4)), a = [ar(a)], l == 0)
        throw new Error("Invalid offset 0");
      if (l > a[0].length)
        throw new Error("Invalid offset beyond length");
      if (o >= l)
        for (a.push(a[0].slice(-l)), o -= l; o >= a[a.length - 1].length; )
          a.push(a[a.length - 1]), o -= a[a.length - 1].length;
      a.push(a[0].slice(-l, -l + o));
    }
  }
  var c = ar(a);
  if (c.length != n)
    throw new Error("Unexpected length: ".concat(c.length, " != ").concat(n));
  return c;
}
function At(e) {
  for (var r = [], t = 0; t < e.length; ) {
    var n = e[t++], a = e[t] | e[t + 1] << 8 | e[t + 2] << 16;
    t += 3, r.push(np(n, e.slice(t, t + a))), t += a;
  }
  if (t !== e.length)
    throw new Error("data is not a valid framed stream!");
  return ar(r);
}
function Or(e) {
  for (var r = [], t = 0; t < e.length; ) {
    var n = Math.min(e.length - t, 268435455), a = new Uint8Array(4);
    r.push(a);
    var i = Te(n), s = i.length;
    r.push(i), n <= 60 ? (s++, r.push(new Uint8Array([n - 1 << 2]))) : n <= 256 ? (s += 2, r.push(new Uint8Array([240, n - 1 & 255]))) : n <= 65536 ? (s += 3, r.push(new Uint8Array([244, n - 1 & 255, n - 1 >> 8 & 255]))) : n <= 16777216 ? (s += 4, r.push(new Uint8Array([248, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255]))) : n <= 4294967296 && (s += 5, r.push(new Uint8Array([252, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255, n - 1 >>> 24 & 255]))), r.push(e.slice(t, t + n)), s += n, a[0] = 0, a[1] = s & 255, a[2] = s >> 8 & 255, a[3] = s >> 16 & 255, t += n;
  }
  return ar(r);
}
function Da(e, r) {
  var t = new Uint8Array(32), n = ia(t), a = 12, i = 0;
  switch (t[0] = 5, e.t) {
    case "n":
      t[1] = 2, rp(t, a, e.v), i |= 1, a += 16;
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
function Na(e, r) {
  var t = new Uint8Array(32), n = ia(t), a = 12, i = 0;
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
function jt(e) {
  var r = Ge(e);
  return wn(r[1][0].data);
}
function ap(e, r, t) {
  var n, a, i, s;
  if (!((n = e[6]) != null && n[0]) || !((a = e[7]) != null && a[0]))
    throw "Mutation only works on post-BNC storages!";
  var f = ((s = (i = e[8]) == null ? void 0 : i[0]) == null ? void 0 : s.data) && br(e[8][0].data) > 0 || !1;
  if (f)
    throw "Math only works with normal offsets";
  for (var l = 0, o = ia(e[7][0].data), c = 0, u = [], d = ia(e[4][0].data), m = 0, g = [], h = 0; h < r.length; ++h) {
    if (r[h] == null) {
      o.setUint16(h * 2, 65535, !0), d.setUint16(h * 2, 65535);
      continue;
    }
    o.setUint16(h * 2, c, !0), d.setUint16(h * 2, m, !0);
    var _, k;
    switch (typeof r[h]) {
      case "string":
        _ = Da({ t: "s", v: r[h] }, t), k = Na({ t: "s", v: r[h] }, t);
        break;
      case "number":
        _ = Da({ t: "n", v: r[h] }, t), k = Na({ t: "n", v: r[h] }, t);
        break;
      case "boolean":
        _ = Da({ t: "b", v: r[h] }, t), k = Na({ t: "b", v: r[h] }, t);
        break;
      default:
        throw new Error("Unsupported value " + r[h]);
    }
    u.push(_), c += _.length, g.push(k), m += k.length, ++l;
  }
  for (e[2][0].data = Te(l); h < e[7][0].data.length / 2; ++h)
    o.setUint16(h * 2, 65535, !0), d.setUint16(h * 2, 65535, !0);
  return e[6][0].data = ar(u), e[3][0].data = ar(g), l;
}
function ip(e, r) {
  if (!r || !r.numbers)
    throw new Error("Must pass a `numbers` option -- check the README");
  var t = e.Sheets[e.SheetNames[0]];
  e.SheetNames.length > 1 && console.error("The Numbers writer currently writes only the first table");
  var n = vt(t["!ref"]);
  n.s.r = n.s.c = 0;
  var a = !1;
  n.e.c > 9 && (a = !0, n.e.c = 9), n.e.r > 49 && (a = !0, n.e.r = 49), a && console.error("The Numbers writer is currently limited to ".concat(Ue(n)));
  var i = sa(t, { range: n, header: 1 }), s = ["~Sh33tJ5~"];
  i.forEach(function(M) {
    return M.forEach(function(A) {
      typeof A == "string" && s.push(A);
    });
  });
  var f = {}, l = [], o = Ce.read(r.numbers, { type: "base64" });
  o.FileIndex.map(function(M, A) {
    return [M, o.FullPaths[A]];
  }).forEach(function(M) {
    var A = M[0], y = M[1];
    if (A.type == 2 && A.name.match(/\.iwa/)) {
      var G = A.content, se = At(G), fe = Ct(se);
      fe.forEach(function(ie) {
        l.push(ie.id), f[ie.id] = { deps: [], location: y, type: br(ie.messages[0].meta[1][0].data) };
      });
    }
  }), l.sort(function(M, A) {
    return M - A;
  });
  var c = l.filter(function(M) {
    return M > 1;
  }).map(function(M) {
    return [M, Te(M)];
  });
  o.FileIndex.map(function(M, A) {
    return [M, o.FullPaths[A]];
  }).forEach(function(M) {
    var A = M[0];
    if (M[1], !!A.name.match(/\.iwa/)) {
      var y = Ct(At(A.content));
      y.forEach(function(G) {
        G.messages.forEach(function(se) {
          c.forEach(function(fe) {
            G.messages.some(function(ie) {
              return br(ie.meta[1][0].data) != 11006 && tp(ie.data, fe[1]);
            }) && f[fe[0]].deps.push(G.id);
          });
        });
      });
    }
  });
  for (var u = Ce.find(o, f[1].location), d = Ct(At(u.content)), m, g = 0; g < d.length; ++g) {
    var h = d[g];
    h.id == 1 && (m = h);
  }
  var _ = jt(Ge(m.messages[0].data)[1][0].data);
  for (u = Ce.find(o, f[_].location), d = Ct(At(u.content)), g = 0; g < d.length; ++g)
    h = d[g], h.id == _ && (m = h);
  for (_ = jt(Ge(m.messages[0].data)[2][0].data), u = Ce.find(o, f[_].location), d = Ct(At(u.content)), g = 0; g < d.length; ++g)
    h = d[g], h.id == _ && (m = h);
  for (_ = jt(Ge(m.messages[0].data)[2][0].data), u = Ce.find(o, f[_].location), d = Ct(At(u.content)), g = 0; g < d.length; ++g)
    h = d[g], h.id == _ && (m = h);
  var k = Ge(m.messages[0].data);
  {
    k[6][0].data = Te(n.e.r + 1), k[7][0].data = Te(n.e.c + 1);
    var O = jt(k[46][0].data), C = Ce.find(o, f[O].location), L = Ct(At(C.content));
    {
      for (var Y = 0; Y < L.length && L[Y].id != O; ++Y)
        ;
      if (L[Y].id != O)
        throw "Bad ColumnRowUIDMapArchive";
      var q = Ge(L[Y].messages[0].data);
      q[1] = [], q[2] = [], q[3] = [];
      for (var F = 0; F <= n.e.c; ++F) {
        var b = [];
        b[1] = b[2] = [{ type: 0, data: Te(F + 420690) }], q[1].push({ type: 2, data: Ye(b) }), q[2].push({ type: 0, data: Te(F) }), q[3].push({ type: 0, data: Te(F) });
      }
      q[4] = [], q[5] = [], q[6] = [];
      for (var D = 0; D <= n.e.r; ++D)
        b = [], b[1] = b[2] = [{ type: 0, data: Te(D + 726270) }], q[4].push({ type: 2, data: Ye(b) }), q[5].push({ type: 0, data: Te(D) }), q[6].push({ type: 0, data: Te(D) });
      L[Y].messages[0].data = Ye(q);
    }
    C.content = Or(kr(L)), C.size = C.content.length, delete k[46];
    var W = Ge(k[4][0].data);
    {
      W[7][0].data = Te(n.e.r + 1);
      var V = Ge(W[1][0].data), z = jt(V[2][0].data);
      C = Ce.find(o, f[z].location), L = Ct(At(C.content));
      {
        if (L[0].id != z)
          throw "Bad HeaderStorageBucket";
        var ee = Ge(L[0].messages[0].data);
        for (D = 0; D < i.length; ++D) {
          var Fe = Ge(ee[2][0].data);
          Fe[1][0].data = Te(D), Fe[4][0].data = Te(i[D].length), ee[2][D] = { type: ee[2][0].type, data: Ye(Fe) };
        }
        L[0].messages[0].data = Ye(ee);
      }
      C.content = Or(kr(L)), C.size = C.content.length;
      var ce = jt(W[2][0].data);
      C = Ce.find(o, f[ce].location), L = Ct(At(C.content));
      {
        if (L[0].id != ce)
          throw "Bad HeaderStorageBucket";
        for (ee = Ge(L[0].messages[0].data), F = 0; F <= n.e.c; ++F)
          Fe = Ge(ee[2][0].data), Fe[1][0].data = Te(F), Fe[4][0].data = Te(n.e.r + 1), ee[2][F] = { type: ee[2][0].type, data: Ye(Fe) };
        L[0].messages[0].data = Ye(ee);
      }
      C.content = Or(kr(L)), C.size = C.content.length;
      var je = jt(W[4][0].data);
      (function() {
        for (var M = Ce.find(o, f[je].location), A = Ct(At(M.content)), y, G = 0; G < A.length; ++G) {
          var se = A[G];
          se.id == je && (y = se);
        }
        var fe = Ge(y.messages[0].data);
        {
          fe[3] = [];
          var ie = [];
          s.forEach(function(me, nt) {
            ie[1] = [{ type: 0, data: Te(nt) }], ie[2] = [{ type: 0, data: Te(1) }], ie[3] = [{ type: 2, data: ep(me) }], fe[3].push({ type: 2, data: Ye(ie) });
          });
        }
        y.messages[0].data = Ye(fe);
        var te = kr(A), Ae = Or(te);
        M.content = Ae, M.size = M.content.length;
      })();
      var Le = Ge(W[3][0].data);
      {
        var Ft = Le[1][0];
        delete Le[2];
        var Ve = Ge(Ft.data);
        {
          var _t = jt(Ve[2][0].data);
          (function() {
            for (var M = Ce.find(o, f[_t].location), A = Ct(At(M.content)), y, G = 0; G < A.length; ++G) {
              var se = A[G];
              se.id == _t && (y = se);
            }
            var fe = Ge(y.messages[0].data);
            {
              delete fe[6], delete Le[7];
              var ie = new Uint8Array(fe[5][0].data);
              fe[5] = [];
              for (var te = 0, Ae = 0; Ae <= n.e.r; ++Ae) {
                var me = Ge(ie);
                te += ap(me, i[Ae], s), me[1][0].data = Te(Ae), fe[5].push({ data: Ye(me), type: 2 });
              }
              fe[1] = [{ type: 0, data: Te(n.e.c + 1) }], fe[2] = [{ type: 0, data: Te(n.e.r + 1) }], fe[3] = [{ type: 0, data: Te(te) }], fe[4] = [{ type: 0, data: Te(n.e.r + 1) }];
            }
            y.messages[0].data = Ye(fe);
            var nt = kr(A), _e = Or(nt);
            M.content = _e, M.size = M.content.length;
          })();
        }
        Ft.data = Ye(Ve);
      }
      W[3][0].data = Ye(Le);
    }
    k[4][0].data = Ye(W);
  }
  m.messages[0].data = Ye(k);
  var ut = kr(d), S = Or(ut);
  return u.content = S, u.size = u.content.length, o;
}
function sp(e) {
  return function(t) {
    for (var n = 0; n != e.length; ++n) {
      var a = e[n];
      t[a[0]] === void 0 && (t[a[0]] = a[1]), a[2] === "n" && (t[a[0]] = Number(t[a[0]]));
    }
  };
}
function Si(e) {
  sp([
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
function fp(e, r) {
  return r.bookType == "ods" ? zf(e, r) : r.bookType == "numbers" ? ip(e, r) : r.bookType == "xlsb" ? op(e, r) : lp(e, r);
}
function op(e, r) {
  Pr = 1024, e && !e.SSF && (e.SSF = ht(Me)), e && e.SSF && (la(), oa(e.SSF), r.revssf = ca(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.rels = {}, r.wbrels = {}, r.Strings = /*::((*/
  [], r.Strings.Count = 0, r.Strings.Unique = 0, xn ? r.revStrings = /* @__PURE__ */ new Map() : (r.revStrings = {}, r.revStrings.foo = [], delete r.revStrings.foo);
  var t = r.bookType == "xlsb" ? "bin" : "xml", n = Af.indexOf(r.bookType) > -1, a = tf();
  Si(r = r || {});
  var i = fi(), s = "", f = 0;
  if (r.cellXfs = [], sr(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", he(i, s, sf(e.Props, r)), a.coreprops.push(s), Ee(r.rels, 2, s, pe.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var l = [], o = 0; o < e.SheetNames.length; ++o)
      (e.Workbook.Sheets[o] || {}).Hidden != 2 && l.push(e.SheetNames[o]);
    e.Props.SheetNames = l;
  }
  for (e.Props.Worksheets = e.Props.SheetNames.length, he(i, s, of(e.Props)), a.extprops.push(s), Ee(r.rels, 3, s, pe.EXT_PROPS), e.Custprops !== e.Props && qe(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", he(i, s, lf(e.Custprops)), a.custprops.push(s), Ee(r.rels, 4, s, pe.CUST_PROPS)), f = 1; f <= e.SheetNames.length; ++f) {
    var c = { "!id": {} }, u = e.Sheets[e.SheetNames[f - 1]], d = (u || {})["!type"] || "sheet";
    switch (d) {
      case "chart":
      /* falls through */
      default:
        s = "xl/worksheets/sheet" + f + "." + t, he(i, s, hm(f - 1, s, r, e, c)), a.sheets.push(s), Ee(r.wbrels, -1, "worksheets/sheet" + f + "." + t, pe.WS[0]);
    }
    if (u) {
      var m = u["!comments"], g = !1, h = "";
      m && m.length > 0 && (h = "xl/comments" + f + "." + t, he(i, h, dm(m, h)), a.comments.push(h), Ee(c, -1, "../comments" + f + "." + t, pe.CMNT), g = !0), u["!legacy"] && g && he(i, "xl/drawings/vmlDrawing" + f + ".vml", Ff(f, u["!comments"])), delete u["!comments"], delete u["!legacy"];
    }
    c["!id"].rId1 && he(i, nf(s), Lr(c));
  }
  return r.Strings != null && r.Strings.length > 0 && (s = "xl/sharedStrings." + t, he(i, s, xm(r.Strings, s, r)), a.strs.push(s), Ee(r.wbrels, -1, "sharedStrings." + t, pe.SST)), s = "xl/workbook." + t, he(i, s, cm(e, s)), a.workbooks.push(s), Ee(r.rels, 1, s, pe.WB), s = "xl/theme/theme1.xml", he(i, s, Sf(e.Themes, r)), a.themes.push(s), Ee(r.wbrels, -1, "theme/theme1.xml", pe.THEME), s = "xl/styles." + t, he(i, s, um(e, s, r)), a.styles.push(s), Ee(r.wbrels, -1, "styles." + t, pe.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", he(i, s, e.vbaraw), a.vba.push(s), Ee(r.wbrels, -1, "vbaProject.bin", pe.VBA)), s = "xl/metadata." + t, he(i, s, mm(s)), a.metadata.push(s), Ee(r.wbrels, -1, "metadata." + t, pe.XLMETA), he(i, "[Content_Types].xml", rf(a, r)), he(i, "_rels/.rels", Lr(r.rels)), he(i, "xl/_rels/workbook." + t + ".rels", Lr(r.wbrels)), delete r.revssf, delete r.ssf, i;
}
function lp(e, r) {
  Pr = 1024, e && !e.SSF && (e.SSF = ht(Me)), e && e.SSF && (la(), oa(e.SSF), r.revssf = ca(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.rels = {}, r.wbrels = {}, r.Strings = /*::((*/
  [], r.Strings.Count = 0, r.Strings.Unique = 0, xn ? r.revStrings = /* @__PURE__ */ new Map() : (r.revStrings = {}, r.revStrings.foo = [], delete r.revStrings.foo);
  var t = "xml", n = Af.indexOf(r.bookType) > -1, a = tf();
  Si(r = r || {});
  var i = fi(), s = "", f = 0;
  if (r.cellXfs = [], sr(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", he(i, s, sf(e.Props, r)), a.coreprops.push(s), Ee(r.rels, 2, s, pe.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var l = [], o = 0; o < e.SheetNames.length; ++o)
      (e.Workbook.Sheets[o] || {}).Hidden != 2 && l.push(e.SheetNames[o]);
    e.Props.SheetNames = l;
  }
  e.Props.Worksheets = e.Props.SheetNames.length, he(i, s, of(e.Props)), a.extprops.push(s), Ee(r.rels, 3, s, pe.EXT_PROPS), e.Custprops !== e.Props && qe(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", he(i, s, lf(e.Custprops)), a.custprops.push(s), Ee(r.rels, 4, s, pe.CUST_PROPS));
  var c = ["SheetJ5"];
  for (r.tcid = 0, f = 1; f <= e.SheetNames.length; ++f) {
    var u = { "!id": {} }, d = e.Sheets[e.SheetNames[f - 1]], m = (d || {})["!type"] || "sheet";
    switch (m) {
      case "chart":
      /* falls through */
      default:
        s = "xl/worksheets/sheet" + f + "." + t, he(i, s, Lf(f - 1, r, e, u)), a.sheets.push(s), Ee(r.wbrels, -1, "worksheets/sheet" + f + "." + t, pe.WS[0]);
    }
    if (d) {
      var g = d["!comments"], h = !1, _ = "";
      if (g && g.length > 0) {
        var k = !1;
        g.forEach(function(O) {
          O[1].forEach(function(C) {
            C.T == !0 && (k = !0);
          });
        }), k && (_ = "xl/threadedComments/threadedComment" + f + "." + t, he(i, _, Wu(g, c, r)), a.threadedcomments.push(_), Ee(u, -1, "../threadedComments/threadedComment" + f + "." + t, pe.TCMNT)), _ = "xl/comments" + f + "." + t, he(i, _, Cf(g)), a.comments.push(_), Ee(u, -1, "../comments" + f + "." + t, pe.CMNT), h = !0;
      }
      d["!legacy"] && h && he(i, "xl/drawings/vmlDrawing" + f + ".vml", Ff(f, d["!comments"])), delete d["!comments"], delete d["!legacy"];
    }
    u["!id"].rId1 && he(i, nf(s), Lr(u));
  }
  return r.Strings != null && r.Strings.length > 0 && (s = "xl/sharedStrings." + t, he(i, s, vf(r.Strings, r)), a.strs.push(s), Ee(r.wbrels, -1, "sharedStrings." + t, pe.SST)), s = "xl/workbook." + t, he(i, s, Uf(e)), a.workbooks.push(s), Ee(r.rels, 1, s, pe.WB), s = "xl/theme/theme1.xml", he(i, s, Sf(e.Themes, r)), a.themes.push(s), Ee(r.wbrels, -1, "theme/theme1.xml", pe.THEME), s = "xl/styles." + t, he(i, s, Tf(e, r)), a.styles.push(s), Ee(r.wbrels, -1, "styles." + t, pe.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", he(i, s, e.vbaraw), a.vba.push(s), Ee(r.wbrels, -1, "vbaProject.bin", pe.VBA)), s = "xl/metadata." + t, he(i, s, yf()), a.metadata.push(s), Ee(r.wbrels, -1, "metadata." + t, pe.XLMETA), c.length > 1 && (s = "xl/persons/person.xml", he(i, s, Hu(c)), a.people.push(s), Ee(r.wbrels, -1, "persons/person.xml", pe.PEOPLE)), he(i, "[Content_Types].xml", rf(a, r)), he(i, "_rels/.rels", Lr(r.rels)), he(i, "xl/_rels/workbook." + t + ".rels", Lr(r.wbrels)), delete r.revssf, delete r.ssf, i;
}
function cp(e, r) {
  var t = "";
  switch ((r || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      t = $t(e.slice(0, 12));
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
function Xf(e, r) {
  switch (r.type) {
    case "base64":
    case "binary":
      break;
    case "buffer":
    case "array":
      r.type = "";
      break;
    case "file":
      return Fn(r.file, Ce.write(e, { type: ve ? "buffer" : "" }));
    case "string":
      throw new Error("'string' output type invalid for '" + r.bookType + "' files");
    default:
      throw new Error("Unrecognized type " + r.type);
  }
  return Ce.write(e, r);
}
function hp(e, r) {
  var t = ht(r || {}), n = fp(e, t);
  return up(n, t);
}
function up(e, r) {
  var t = {}, n = ve ? "nodebuffer" : typeof Uint8Array < "u" ? "array" : "string";
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
  var a = e.FullPaths ? Ce.write(e, { fileType: "zip", type: (
    /*::(*/
    { nodebuffer: "buffer", string: "binary" }[t.type] || t.type
  ), compression: !!r.compression }) : e.generate(t);
  if (typeof Deno < "u" && typeof a == "string") {
    if (r.type == "binary" || r.type == "base64") return a;
    a = new Uint8Array(fa(a));
  }
  return r.password && typeof encrypt_agile < "u" ? Xf(encrypt_agile(a, r.password), r) : r.type === "file" ? Fn(r.file, a) : r.type == "string" ? ln(
    /*::(*/
    a
    /*:: :any)*/
  ) : a;
}
function xp(e, r) {
  var t = r || {}, n = Om(e, t);
  return Xf(n, t);
}
function Pt(e, r, t) {
  t || (t = "");
  var n = t + e;
  switch (r.type) {
    case "base64":
      return pn(_n(n));
    case "binary":
      return _n(n);
    case "string":
      return e;
    case "file":
      return Fn(r.file, n, "utf8");
    case "buffer":
      return ve ? Xt(n, "utf8") : typeof TextEncoder < "u" ? new TextEncoder().encode(n) : Pt(n, { type: "binary" }).split("").map(function(a) {
        return a.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + r.type);
}
function dp(e, r) {
  switch (r.type) {
    case "base64":
      return pn(e);
    case "binary":
      return e;
    case "string":
      return e;
    /* override in sheet_to_txt */
    case "file":
      return Fn(r.file, e, "binary");
    case "buffer":
      return ve ? Xt(e, "binary") : e.split("").map(function(t) {
        return t.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + r.type);
}
function Hn(e, r) {
  switch (r.type) {
    case "string":
    case "base64":
    case "binary":
      for (var t = "", n = 0; n < e.length; ++n) t += String.fromCharCode(e[n]);
      return r.type == "base64" ? pn(t) : r.type == "string" ? ln(t) : t;
    case "file":
      return Fn(r.file, e);
    case "buffer":
      return e;
    default:
      throw new Error("Unrecognized type " + r.type);
  }
}
function jf(e, r) {
  Gl(), qd(e);
  var t = ht(r || {});
  if (t.cellStyles && (t.cellNF = !0, t.sheetStubs = !0), t.type == "array") {
    t.type = "binary";
    var n = jf(e, t);
    return t.type = "array", fa(n);
  }
  var a = 0;
  if (t.sheet && (typeof t.sheet == "number" ? a = t.sheet : a = e.SheetNames.indexOf(t.sheet), !e.SheetNames[a]))
    throw new Error("Sheet not found: " + t.sheet + " : " + typeof t.sheet);
  switch (t.bookType || "xlsb") {
    case "xml":
    case "xlml":
      return Pt(Am(e, t), t);
    case "slk":
    case "sylk":
      return Pt(Jh.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "htm":
    case "html":
      return Pt(Gf(e.Sheets[e.SheetNames[a]], t), t);
    case "txt":
      return dp(Yf(e.Sheets[e.SheetNames[a]], t), t);
    case "csv":
      return Pt(yi(e.Sheets[e.SheetNames[a]], t), t, "\uFEFF");
    case "dif":
      return Pt(Qh.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "dbf":
      return Hn(Kh.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "prn":
      return Pt(Zh.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "rtf":
      return Pt(iu.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "eth":
      return Pt(pf.from_sheet(e.Sheets[e.SheetNames[a]], t), t);
    case "fods":
      return Pt(zf(e, t), t);
    case "wk1":
      return Hn(I0.sheet_to_wk1(e.Sheets[e.SheetNames[a]], t), t);
    case "wk3":
      return Hn(I0.book_to_wk3(e, t), t);
    case "biff2":
      t.biff || (t.biff = 2);
    /* falls through */
    case "biff3":
      t.biff || (t.biff = 3);
    /* falls through */
    case "biff4":
      return t.biff || (t.biff = 4), Hn(Hf(e, t), t);
    case "biff5":
      t.biff || (t.biff = 5);
    /* falls through */
    case "biff8":
    case "xla":
    case "xls":
      return t.biff || (t.biff = 8), xp(e, t);
    case "xlsx":
    case "xlsm":
    case "xlam":
    case "xlsb":
    case "numbers":
    case "ods":
      return hp(e, t);
    default:
      throw new Error("Unrecognized bookType |" + t.bookType + "|");
  }
}
function mp(e) {
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
function pp(e, r, t) {
  var n = {};
  return n.type = "file", n.file = r, mp(n), jf(e, n);
}
function vp(e, r, t, n, a, i, s, f) {
  var l = Ze(t), o = f.defval, c = f.raw || !Object.prototype.hasOwnProperty.call(f, "raw"), u = !0, d = a === 1 ? [] : {};
  if (a !== 1)
    if (Object.defineProperty) try {
      Object.defineProperty(d, "__rowNum__", { value: t, enumerable: !1 });
    } catch {
      d.__rowNum__ = t;
    }
    else d.__rowNum__ = t;
  if (!s || e[t]) for (var m = r.s.c; m <= r.e.c; ++m) {
    var g = s ? e[t][m] : e[n[m] + l];
    if (g === void 0 || g.t === void 0) {
      if (o === void 0) continue;
      i[m] != null && (d[i[m]] = o);
      continue;
    }
    var h = g.v;
    switch (g.t) {
      case "z":
        if (h == null) break;
        continue;
      case "e":
        h = h == 0 ? null : void 0;
        break;
      case "s":
      case "d":
      case "b":
      case "n":
        break;
      default:
        throw new Error("unrecognized type " + g.t);
    }
    if (i[m] != null) {
      if (h == null)
        if (g.t == "e" && h === null) d[i[m]] = null;
        else if (o !== void 0) d[i[m]] = o;
        else if (c && h === null) d[i[m]] = null;
        else continue;
      else
        d[i[m]] = c && (g.t !== "n" || g.t === "n" && f.rawNumbers !== !1) ? h : zt(g, h, f);
      h != null && (u = !1);
    }
  }
  return { row: d, isempty: u };
}
function sa(e, r) {
  if (e == null || e["!ref"] == null) return [];
  var t = { t: "n", v: 0 }, n = 0, a = 1, i = [], s = 0, f = "", l = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, o = r || {}, c = o.range != null ? o.range : e["!ref"];
  switch (o.header === 1 ? n = 1 : o.header === "A" ? n = 2 : Array.isArray(o.header) ? n = 3 : o.header == null && (n = 0), typeof c) {
    case "string":
      l = Re(c);
      break;
    case "number":
      l = Re(e["!ref"]), l.s.r = c;
      break;
    default:
      l = c;
  }
  n > 0 && (a = 0);
  var u = Ze(l.s.r), d = [], m = [], g = 0, h = 0, _ = Array.isArray(e), k = l.s.r, O = 0, C = {};
  _ && !e[k] && (e[k] = []);
  var L = o.skipHidden && e["!cols"] || [], Y = o.skipHidden && e["!rows"] || [];
  for (O = l.s.c; O <= l.e.c; ++O)
    if (!(L[O] || {}).hidden)
      switch (d[O] = tt(O), t = _ ? e[k][O] : e[d[O] + u], n) {
        case 1:
          i[O] = O - l.s.c;
          break;
        case 2:
          i[O] = d[O];
          break;
        case 3:
          i[O] = o.header[O - l.s.c];
          break;
        default:
          if (t == null && (t = { w: "__EMPTY", t: "s" }), f = s = zt(t, null, o), h = C[s] || 0, !h) C[s] = 1;
          else {
            do
              f = s + "_" + h++;
            while (C[f]);
            C[s] = h, C[f] = 1;
          }
          i[O] = f;
      }
  for (k = l.s.r + a; k <= l.e.r; ++k)
    if (!(Y[k] || {}).hidden) {
      var q = vp(e, l, k, d, n, i, _, o);
      (q.isempty === !1 || (n === 1 ? o.blankrows !== !1 : o.blankrows)) && (m[g++] = q.row);
    }
  return m.length = g, m;
}
var U0 = /"/g;
function _p(e, r, t, n, a, i, s, f) {
  for (var l = !0, o = [], c = "", u = Ze(t), d = r.s.c; d <= r.e.c; ++d)
    if (n[d]) {
      var m = f.dense ? (e[t] || [])[d] : e[n[d] + u];
      if (m == null) c = "";
      else if (m.v != null) {
        l = !1, c = "" + (f.rawNumbers && m.t == "n" ? m.v : zt(m, null, f));
        for (var g = 0, h = 0; g !== c.length; ++g) if ((h = c.charCodeAt(g)) === a || h === i || h === 34 || f.forceQuotes) {
          c = '"' + c.replace(U0, '""') + '"';
          break;
        }
        c == "ID" && (c = '"ID"');
      } else m.f != null && !m.F ? (l = !1, c = "=" + m.f, c.indexOf(",") >= 0 && (c = '"' + c.replace(U0, '""') + '"')) : c = "";
      o.push(c);
    }
  return f.blankrows === !1 && l ? null : o.join(s);
}
function yi(e, r) {
  var t = [], n = r ?? {};
  if (e == null || e["!ref"] == null) return "";
  var a = Re(e["!ref"]), i = n.FS !== void 0 ? n.FS : ",", s = i.charCodeAt(0), f = n.RS !== void 0 ? n.RS : `
`, l = f.charCodeAt(0), o = new RegExp((i == "|" ? "\\|" : i) + "+$"), c = "", u = [];
  n.dense = Array.isArray(e);
  for (var d = n.skipHidden && e["!cols"] || [], m = n.skipHidden && e["!rows"] || [], g = a.s.c; g <= a.e.c; ++g) (d[g] || {}).hidden || (u[g] = tt(g));
  for (var h = 0, _ = a.s.r; _ <= a.e.r; ++_)
    (m[_] || {}).hidden || (c = _p(e, a, _, u, s, l, i, n), c != null && (n.strip && (c = c.replace(o, "")), (c || n.blankrows !== !1) && t.push((h++ ? f : "") + c)));
  return delete n.dense, t.join("");
}
function Yf(e, r) {
  r || (r = {}), r.FS = "	", r.RS = `
`;
  var t = yi(e, r);
  return t;
}
function gp(e) {
  var r = "", t, n = "";
  if (e == null || e["!ref"] == null) return [];
  var a = Re(e["!ref"]), i = "", s = [], f, l = [], o = Array.isArray(e);
  for (f = a.s.c; f <= a.e.c; ++f) s[f] = tt(f);
  for (var c = a.s.r; c <= a.e.r; ++c)
    for (i = Ze(c), f = a.s.c; f <= a.e.c; ++f)
      if (r = s[f] + i, t = o ? (e[c] || [])[f] : e[r], n = "", t !== void 0) {
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
function Kf(e, r, t) {
  var n = t || {}, a = +!n.skipHeader, i = e || {}, s = 0, f = 0;
  if (i && n.origin != null)
    if (typeof n.origin == "number") s = n.origin;
    else {
      var l = typeof n.origin == "string" ? ze(n.origin) : n.origin;
      s = l.r, f = l.c;
    }
  var o, c = { s: { c: 0, r: 0 }, e: { c: f, r: s + r.length - 1 + a } };
  if (i["!ref"]) {
    var u = Re(i["!ref"]);
    c.e.c = Math.max(c.e.c, u.e.c), c.e.r = Math.max(c.e.r, u.e.r), s == -1 && (s = u.e.r + 1, c.e.r = s + r.length - 1 + a);
  } else
    s == -1 && (s = 0, c.e.r = r.length - 1 + a);
  var d = n.header || [], m = 0;
  r.forEach(function(h, _) {
    qe(h).forEach(function(k) {
      (m = d.indexOf(k)) == -1 && (d[m = d.length] = k);
      var O = h[k], C = "z", L = "", Y = ye({ c: f + m, r: s + _ + a });
      o = Tn(i, Y), O && typeof O == "object" && !(O instanceof Date) ? i[Y] = O : (typeof O == "number" ? C = "n" : typeof O == "boolean" ? C = "b" : typeof O == "string" ? C = "s" : O instanceof Date ? (C = "d", n.cellDates || (C = "n", O = ct(O)), L = n.dateNF || Me[14]) : O === null && n.nullError && (C = "e", O = 0), o ? (o.t = C, o.v = O, delete o.w, delete o.R, L && (o.z = L)) : i[Y] = o = { t: C, v: O }, L && (o.z = L));
    });
  }), c.e.c = Math.max(c.e.c, f + d.length - 1);
  var g = Ze(s);
  if (a) for (m = 0; m < d.length; ++m) i[tt(m + f) + g] = { t: "s", v: d[m] };
  return i["!ref"] = Ue(c), i;
}
function wp(e, r) {
  return Kf(null, e, r);
}
function Tn(e, r, t) {
  if (typeof r == "string") {
    if (Array.isArray(e)) {
      var n = ze(r);
      return e[n.r] || (e[n.r] = []), e[n.r][n.c] || (e[n.r][n.c] = { t: "z" });
    }
    return e[r] || (e[r] = { t: "z" });
  }
  return typeof r != "number" ? Tn(e, ye(r)) : Tn(e, ye({ r, c: t || 0 }));
}
function Tp(e, r) {
  if (typeof r == "number") {
    if (r >= 0 && e.SheetNames.length > r) return r;
    throw new Error("Cannot find sheet # " + r);
  } else if (typeof r == "string") {
    var t = e.SheetNames.indexOf(r);
    if (t > -1) return t;
    throw new Error("Cannot find sheet name |" + r + "|");
  } else throw new Error("Cannot find sheet |" + r + "|");
}
function Ep() {
  return { SheetNames: [], Sheets: {} };
}
function Sp(e, r, t, n) {
  var a = 1;
  if (!t) for (; a <= 65535 && e.SheetNames.indexOf(t = "Sheet" + a) != -1; ++a, t = void 0) ;
  if (!t || e.SheetNames.length >= 65535) throw new Error("Too many worksheets");
  if (n && e.SheetNames.indexOf(t) >= 0) {
    var i = t.match(/(^.*?)(\d+)$/);
    a = i && +i[2] || 0;
    var s = i && i[1] || t;
    for (++a; a <= 65535 && e.SheetNames.indexOf(t = s + a) != -1; ++a) ;
  }
  if (bf(t), e.SheetNames.indexOf(t) >= 0) throw new Error("Worksheet with name |" + t + "| already exists!");
  return e.SheetNames.push(t), e.Sheets[t] = r, t;
}
function yp(e, r, t) {
  e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
  var n = Tp(e, r);
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
function Fp(e, r) {
  return e.z = r, e;
}
function Jf(e, r, t) {
  return r ? (e.l = { Target: r }, t && (e.l.Tooltip = t)) : delete e.l, e;
}
function Cp(e, r, t) {
  return Jf(e, "#" + r, t);
}
function Ap(e, r, t) {
  e.c || (e.c = []), e.c.push({ t: r, a: t || "SheetJS" });
}
function kp(e, r, t, n) {
  for (var a = typeof r != "string" ? r : Re(r), i = typeof r == "string" ? r : Ue(r), s = a.s.r; s <= a.e.r; ++s) for (var f = a.s.c; f <= a.e.c; ++f) {
    var l = Tn(e, s, f);
    l.t = "n", l.F = i, delete l.v, s == a.s.r && f == a.s.c && (l.f = t, n && (l.D = !0));
  }
  return e;
}
var Pa = {
  encode_col: tt,
  encode_row: Ze,
  encode_cell: ye,
  encode_range: Ue,
  decode_col: xi,
  decode_row: ui,
  split_cell: Gc,
  decode_cell: ze,
  decode_range: vt,
  format_cell: zt,
  sheet_add_aoa: Ks,
  sheet_add_json: Kf,
  sheet_add_dom: Vf,
  aoa_to_sheet: Yr,
  json_to_sheet: wp,
  table_to_sheet: $f,
  table_to_book: Qm,
  sheet_to_csv: yi,
  sheet_to_txt: Yf,
  sheet_to_json: sa,
  sheet_to_html: Gf,
  sheet_to_formulae: gp,
  sheet_to_row_object_array: sa,
  sheet_get_cell: Tn,
  book_new: Ep,
  book_append_sheet: Sp,
  book_set_sheet_visibility: yp,
  cell_set_number_format: Fp,
  cell_set_hyperlink: Jf,
  cell_set_internal_link: Cp,
  cell_add_comment: Ap,
  sheet_set_array_formula: kp,
  consts: {
    SHEET_VISIBLE: 0,
    SHEET_HIDDEN: 1,
    SHEET_VERY_HIDDEN: 2
  }
};
function Op(e, r) {
  const t = e.map((f) => ({
    "Part Name": f.name,
    IPN: f.IPN || "",
    Category: f.category_path || f.category_name || "Uncategorized",
    Description: f.description || "",
    Status: ms(f).label,
    "Current Stock": f.total_stock,
    "Minimum Stock": f.minimum_stock || ""
  })), n = Pa.book_new(), a = Pa.json_to_sheet(t);
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
  ], Pa.book_append_sheet(n, a, "Critical Components");
  const s = `critical-components-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.xlsx`;
  pp(n, s);
}
const we = window.React, Rp = window.React.useMemo, Ip = window.MantineCore.Anchor, W0 = window.MantineCore.Box, He = window.MantineCore.Table, cr = window.MantineCore.Text;
function Dp({ stockItems: e, context: r }) {
  const { hasSerial: t, hasNotes: n } = Rp(() => {
    let a = !1, i = !1;
    for (const s of e)
      if (s.serial && s.serial.trim() !== "" && (a = !0), s.notes && s.notes.trim() !== "" && (i = !0), a && i) break;
    return { hasSerial: a, hasNotes: i };
  }, [e]);
  return !e || e.length === 0 ? /* @__PURE__ */ we.createElement(W0, { px: "md", py: "sm", bg: "gray.0" }, /* @__PURE__ */ we.createElement(cr, { size: "sm", c: "dimmed", fs: "italic" }, "No stock items available")) : /* @__PURE__ */ we.createElement(
    W0,
    {
      px: "md",
      py: "sm",
      bg: "gray.0",
      style: { borderTop: "1px solid var(--mantine-color-gray-3)" }
    },
    /* @__PURE__ */ we.createElement(He, { striped: !0, highlightOnHover: !0, withTableBorder: !1 }, /* @__PURE__ */ we.createElement(He.Thead, null, /* @__PURE__ */ we.createElement(He.Tr, null, /* @__PURE__ */ we.createElement(He.Th, null, "Location"), t && /* @__PURE__ */ we.createElement(He.Th, null, "Serial"), /* @__PURE__ */ we.createElement(He.Th, { style: { textAlign: "right" } }, "Quantity"), /* @__PURE__ */ we.createElement(He.Th, null, "Last Updated"), /* @__PURE__ */ we.createElement(He.Th, null, "Stocktake Date"), /* @__PURE__ */ we.createElement(He.Th, null, "Status"), n && /* @__PURE__ */ we.createElement(He.Th, null, "Notes"))), /* @__PURE__ */ we.createElement(He.Tbody, null, e.map((a) => /* @__PURE__ */ we.createElement(He.Tr, { key: a.id }, /* @__PURE__ */ we.createElement(He.Td, null, /* @__PURE__ */ we.createElement(
      Ip,
      {
        size: "sm",
        onClick: () => {
          a.location_id && r.navigate(`/stock/location/${a.location_id}/`);
        },
        style: { cursor: a.location_id ? "pointer" : "default" }
      },
      a.location_path || a.location
    )), t && /* @__PURE__ */ we.createElement(He.Td, null, /* @__PURE__ */ we.createElement(cr, { size: "sm", fw: 500 }, a.serial || "-")), /* @__PURE__ */ we.createElement(He.Td, { style: { textAlign: "right" } }, /* @__PURE__ */ we.createElement(cr, { size: "sm", fw: 500 }, a.quantity)), /* @__PURE__ */ we.createElement(He.Td, null, /* @__PURE__ */ we.createElement(cr, { size: "sm", c: "dimmed" }, qi(a.updated))), /* @__PURE__ */ we.createElement(He.Td, null, /* @__PURE__ */ we.createElement(cr, { size: "sm", c: "dimmed" }, qi(a.stocktake_date))), /* @__PURE__ */ we.createElement(He.Td, null, /* @__PURE__ */ we.createElement(cr, { size: "sm", c: "dimmed" }, a.status)), n && /* @__PURE__ */ we.createElement(He.Td, null, /* @__PURE__ */ we.createElement(cr, { size: "sm", c: "dimmed", lineClamp: 2 }, a.notes || "-"))))))
  );
}
const ke = window.React, H0 = window.React.useCallback, Np = window.React.useState, Pp = window.MantineCore.ActionIcon, Mp = window.MantineCore.Anchor, Lp = window.MantineCore.Avatar, Bp = window.MantineCore.Badge, nn = window.MantineCore.Box, bp = window.MantineCore.Collapse, G0 = window.MantineCore.Group, Up = window.MantineCore.Progress, Rr = window.MantineCore.Text, Wp = window.MantineCore.Tooltip;
function Qf({
  part: e,
  context: r,
  showLocationQty: t = !1,
  showCategory: n = !1,
  isExpandable: a = !0,
  indent: i = 0
}) {
  const [s, f] = Np(!1), l = ms(e), o = Pl(e, t), c = e.stock_items && e.stock_items.length > 0, u = a && c, d = H0(() => {
    r.navigate(`/part/${e.id}/`);
  }, [r, e.id]), m = H0(() => {
    u && f((h) => !h);
  }, [u]), g = n ? "30px minmax(150px, 1.5fr) 100px minmax(120px, 1fr) minmax(100px, 1fr) 100px minmax(140px, 1fr)" : "30px minmax(180px, 2fr) 100px minmax(100px, 1fr) 100px minmax(140px, 1fr)";
  return /* @__PURE__ */ ke.createElement(ke.Fragment, null, /* @__PURE__ */ ke.createElement(
    nn,
    {
      px: "md",
      py: "xs",
      style: {
        display: "grid",
        gridTemplateColumns: g,
        gap: "12px",
        alignItems: "center",
        borderBottom: "1px solid var(--mantine-color-gray-2)",
        paddingLeft: `calc(var(--mantine-spacing-md) + ${i * 16}px)`,
        backgroundColor: s ? "var(--mantine-color-gray-0)" : void 0
      },
      className: "part-row"
    },
    /* @__PURE__ */ ke.createElement(nn, { style: { display: "flex", justifyContent: "center" } }, u ? /* @__PURE__ */ ke.createElement(Pp, { variant: "subtle", size: "sm", onClick: m }, s ? /* @__PURE__ */ ke.createElement(us, { size: 16 }) : /* @__PURE__ */ ke.createElement(xs, { size: 16 })) : /* @__PURE__ */ ke.createElement(nn, { style: { width: 22 } })),
    /* @__PURE__ */ ke.createElement(G0, { gap: "sm", wrap: "nowrap" }, /* @__PURE__ */ ke.createElement(
      Lp,
      {
        src: e.thumbnail || e.image,
        size: "sm",
        radius: "sm",
        color: "gray"
      },
      e.name.charAt(0)
    ), /* @__PURE__ */ ke.createElement(nn, { style: { minWidth: 0, flex: 1 } }, /* @__PURE__ */ ke.createElement(
      Mp,
      {
        size: "sm",
        fw: 500,
        onClick: d,
        style: { cursor: "pointer" },
        truncate: !0
      },
      e.name
    ))),
    /* @__PURE__ */ ke.createElement(Rr, { size: "sm", c: e.IPN ? "dark" : "dimmed", truncate: !0, fw: e.IPN ? 500 : 400 }, e.IPN || "-"),
    n && /* @__PURE__ */ ke.createElement(Rr, { size: "sm", c: "dimmed", lineClamp: 1, title: e.category_path }, e.category_name || "Uncategorized"),
    /* @__PURE__ */ ke.createElement(Rr, { size: "sm", c: "dimmed", lineClamp: 1 }, e.description || "-"),
    /* @__PURE__ */ ke.createElement(
      Bp,
      {
        color: l.color,
        size: "sm",
        variant: "light",
        leftSection: l.label === "Low Stock" || l.label === "Out of Stock" ? /* @__PURE__ */ ke.createElement(zn, { size: 10 }) : null
      },
      l.label
    ),
    /* @__PURE__ */ ke.createElement(
      Wp,
      {
        label: o.showMin ? `${o.stock} in stock / ${o.min} minimum required` : `${o.stock} in stock`,
        position: "left"
      },
      /* @__PURE__ */ ke.createElement(G0, { gap: "sm", wrap: "nowrap", justify: "flex-end" }, /* @__PURE__ */ ke.createElement(
        Up,
        {
          value: l.progressValue,
          color: l.progressColor,
          size: "sm",
          style: { width: 60 }
        }
      ), /* @__PURE__ */ ke.createElement(nn, { style: { minWidth: 80, textAlign: "right" } }, /* @__PURE__ */ ke.createElement(Rr, { size: "sm", fw: 500, component: "span" }, o.stock), o.showMin && /* @__PURE__ */ ke.createElement(Rr, { size: "xs", c: "dimmed", component: "span" }, " ", "/ ", o.min, " ", /* @__PURE__ */ ke.createElement(Rr, { component: "span", size: "xs", c: "dimmed", fs: "italic" }, "min"))))
    )
  ), u && /* @__PURE__ */ ke.createElement(bp, { in: s }, /* @__PURE__ */ ke.createElement(Dp, { stockItems: e.stock_items || [], context: r })));
}
const Ut = window.React, V0 = window.MantineCore.Box, Ir = window.MantineCore.Text, Hp = window.MantineCore.Tooltip;
function Zf({
  showLocationQty: e = !1,
  showCategory: r = !1
}) {
  const t = r ? "30px minmax(150px, 1.5fr) 100px minmax(120px, 1fr) minmax(100px, 1fr) 100px minmax(140px, 1fr)" : "30px minmax(180px, 2fr) 100px minmax(100px, 1fr) 100px minmax(140px, 1fr)";
  return /* @__PURE__ */ Ut.createElement(
    V0,
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
    /* @__PURE__ */ Ut.createElement(V0, null),
    /* @__PURE__ */ Ut.createElement(Ir, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "Part Name"),
    /* @__PURE__ */ Ut.createElement(Ir, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "IPN"),
    r && /* @__PURE__ */ Ut.createElement(Ir, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "Category"),
    /* @__PURE__ */ Ut.createElement(Ir, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "Description"),
    /* @__PURE__ */ Ut.createElement(Ir, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "Status"),
    /* @__PURE__ */ Ut.createElement(
      Hp,
      {
        label: "Current stock quantity / Minimum stock level",
        position: "left"
      },
      /* @__PURE__ */ Ut.createElement(Ir, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase", ta: "right" }, e ? "Qty at Location" : "Stock / Min")
    )
  );
}
const wt = window.React, Gp = window.React.useMemo, Vp = window.MantineCore.ActionIcon, $0 = window.MantineCore.Box, $p = window.MantineCore.Group, z0 = window.MantineCore.Paper, X0 = window.MantineCore.Text, zp = window.MantineCore.Tooltip;
function Xp({
  parts: e,
  context: r,
  searchTerm: t,
  showLowStockOnly: n = !1
}) {
  const a = Gp(() => {
    let s = Bl(e, t);
    return n && (s = bl(s)), s;
  }, [e, t, n]), i = () => {
    Op(a);
  };
  return a.length === 0 ? /* @__PURE__ */ wt.createElement(z0, { withBorder: !0, p: "xl" }, /* @__PURE__ */ wt.createElement(X0, { c: "dimmed", ta: "center" }, t ? `No parts found matching "${t}"` : n ? "No low stock parts found" : "No critical parts available")) : /* @__PURE__ */ wt.createElement($0, null, /* @__PURE__ */ wt.createElement($p, { justify: "flex-end", mb: "sm" }, /* @__PURE__ */ wt.createElement(zp, { label: "Export to Excel" }, /* @__PURE__ */ wt.createElement(
    Vp,
    {
      variant: "light",
      color: "green",
      size: "lg",
      onClick: i
    },
    /* @__PURE__ */ wt.createElement(hl, { size: 20 })
  ))), /* @__PURE__ */ wt.createElement(z0, { withBorder: !0, style: { overflow: "hidden" } }, /* @__PURE__ */ wt.createElement(Zf, { showCategory: !0 }), /* @__PURE__ */ wt.createElement($0, { style: { maxHeight: "60vh", overflowY: "auto" } }, a.map((s) => /* @__PURE__ */ wt.createElement(
    Qf,
    {
      key: `part-${s.id}`,
      part: s,
      context: r,
      showCategory: !0,
      isExpandable: !0
    }
  )))), t && /* @__PURE__ */ wt.createElement(X0, { size: "sm", c: "dimmed", mt: "sm" }, "Showing ", a.length, " of ", e.length, " parts"));
}
const hr = window.React, jp = window.React.useMemo, Yp = window.MantineCore.Badge, Kp = window.MantineCore.Group, Jp = window.MantineCore.Text, Qp = window.MantineCore.UnstyledButton;
function Zp({
  group: e,
  isExpanded: r,
  onToggle: t,
  level: n = 0,
  isLocationView: a = !1
}) {
  const i = jp(() => ni(e), [e]);
  if (i === 0) return null;
  const s = a ? ds : hs;
  return /* @__PURE__ */ hr.createElement(
    Qp,
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
    /* @__PURE__ */ hr.createElement(Kp, { gap: "xs", wrap: "nowrap", style: { paddingLeft: n * 16 } }, r ? /* @__PURE__ */ hr.createElement(us, { size: 16, color: "gray" }) : /* @__PURE__ */ hr.createElement(xs, { size: 16, color: "gray" }), /* @__PURE__ */ hr.createElement(s, { size: 16, color: "gray" }), /* @__PURE__ */ hr.createElement(Jp, { size: "sm", fw: 600, style: { flex: 1 } }, e.name), /* @__PURE__ */ hr.createElement(Yp, { color: "gray", size: "sm", variant: "light" }, i))
  );
}
const Dr = window.React, j0 = window.MantineCore.Box, qp = window.MantineCore.Collapse;
function qf({
  group: e,
  context: r,
  expandedGroups: t,
  toggleGroup: n,
  level: a = 0,
  prefix: i,
  isLocationView: s = !1
}) {
  const f = `${i}-${e.id ?? "none"}-${a}`, l = t.has(f);
  if (ni(e) === 0) return null;
  const c = e.parts && e.parts.length > 0, u = e.children && e.children.length > 0;
  return /* @__PURE__ */ Dr.createElement(j0, null, /* @__PURE__ */ Dr.createElement(
    Zp,
    {
      group: e,
      isExpanded: l,
      onToggle: () => n(f),
      level: a,
      isLocationView: s
    }
  ), /* @__PURE__ */ Dr.createElement(qp, { in: l }, c && /* @__PURE__ */ Dr.createElement(j0, null, e.parts.map((d) => /* @__PURE__ */ Dr.createElement(
    Qf,
    {
      key: `part-${d.id}-${e.id}`,
      part: d,
      context: r,
      showLocationQty: s,
      isExpandable: !0,
      indent: a + 1
    }
  ))), u && e.children.map((d) => /* @__PURE__ */ Dr.createElement(
    qf,
    {
      key: `child-${d.id ?? "none"}-${a + 1}`,
      group: d,
      context: r,
      expandedGroups: t,
      toggleGroup: n,
      level: a + 1,
      prefix: i,
      isLocationView: s
    }
  ))));
}
const Ma = window.React, ev = window.MantineCore.CloseButton, tv = window.MantineCore.TextInput;
function rv({
  value: e,
  onChange: r,
  placeholder: t = "Search parts by name, IPN, or description..."
}) {
  return /* @__PURE__ */ Ma.createElement(
    tv,
    {
      value: e,
      placeholder: t,
      leftSection: /* @__PURE__ */ Ma.createElement(pl, { size: 16 }),
      rightSection: e.length > 0 ? /* @__PURE__ */ Ma.createElement(ev, { size: "sm", onClick: () => r("") }) : null,
      onChange: (n) => r(n.target.value),
      style: { flex: 1, maxWidth: 400 }
    }
  );
}
const oe = window.React, Gn = window.React.useCallback, nv = window.React.useEffect, La = window.React.useMemo, Vn = window.React.useState, Y0 = window.MantineCore.ActionIcon, K0 = window.MantineCore.Alert, Ba = window.MantineCore.Badge, av = window.MantineCore.Box, J0 = window.MantineCore.Divider, Yt = window.MantineCore.Group, iv = window.MantineCore.Loader, Q0 = window.MantineCore.Paper, sv = window.MantineCore.SegmentedControl, ba = window.MantineCore.Stack, fv = window.MantineCore.Switch, $n = window.MantineCore.Text, Z0 = window.MantineCore.Title, Ua = window.MantineCore.Tooltip;
function ov({
  context: e
}) {
  const [r, t] = Vn("category"), [n, a] = Vn(""), [i] = _o(n, 300), [s, f] = Vn(/* @__PURE__ */ new Set()), [l, o] = Vn(!1), { data: c, isLoading: u, isError: d, error: m } = Qo(
    {
      queryKey: ["critical-components", r],
      queryFn: async () => (await e.api.get(
        `/plugin/criticalcomponents/list/?group_by=${r}`
      )).data
    },
    e.queryClient
  ), g = La(() => c ? r === "location" ? c.locations ?? [] : r === "category" ? c.categories ?? [] : [] : [], [c, r]), h = La(() => {
    let F = Ll(g, i);
    return l && (F = Ul(F)), F;
  }, [g, i, l]), _ = La(() => Ml(h, r === "location" ? "loc" : "cat"), [h, r]), k = Gn((F) => {
    f((b) => {
      const D = new Set(b);
      return D.has(F) ? D.delete(F) : D.add(F), D;
    });
  }, []), O = Gn(() => {
    f(new Set(_));
  }, [_]), C = Gn(() => {
    f(/* @__PURE__ */ new Set());
  }, []), L = Gn((F) => {
    t(F), f(/* @__PURE__ */ new Set());
  }, []);
  if (nv(() => {
    if (h.length > 0 && s.size === 0 && r !== "all") {
      const F = r === "location" ? "loc" : "cat", b = h.map(
        (D) => `${F}-${D.id ?? "none"}-0`
      );
      f(new Set(b));
    }
  }, [h.length, r]), u)
    return /* @__PURE__ */ oe.createElement(ba, { align: "center", justify: "center", p: "xl" }, /* @__PURE__ */ oe.createElement(iv, { size: "lg" }), /* @__PURE__ */ oe.createElement($n, { c: "dimmed" }, "Loading critical components..."));
  if (d)
    return /* @__PURE__ */ oe.createElement(
      K0,
      {
        icon: /* @__PURE__ */ oe.createElement(_l, { size: 16 }),
        title: "Error Loading Data",
        color: "red",
        variant: "light"
      },
      m instanceof Error ? m.message : "Failed to load critical components"
    );
  if (!c || c.total_parts === 0)
    return /* @__PURE__ */ oe.createElement(ba, { gap: "md" }, /* @__PURE__ */ oe.createElement(Yt, { justify: "space-between" }, /* @__PURE__ */ oe.createElement(Z0, { order: 3 }, "Critical Components")), /* @__PURE__ */ oe.createElement(
      K0,
      {
        icon: /* @__PURE__ */ oe.createElement(zn, { size: 16 }),
        title: "No Critical Components Found",
        color: "gray",
        variant: "light"
      },
      /* @__PURE__ */ oe.createElement($n, { size: "sm" }, "No parts have been marked as critical components."),
      /* @__PURE__ */ oe.createElement($n, { size: "xs", c: "dimmed", mt: "xs" }, 'To mark a part as critical, add the "CriticalComponent" parameter to a part and set its value to "True".')
    ));
  const Y = r === "location" ? "loc" : "cat", q = r === "category" || r === "location";
  return /* @__PURE__ */ oe.createElement(ba, { gap: "md" }, /* @__PURE__ */ oe.createElement(Yt, { justify: "space-between", wrap: "wrap" }, /* @__PURE__ */ oe.createElement(Yt, { gap: "sm" }, /* @__PURE__ */ oe.createElement(Z0, { order: 3 }, "Critical Components"), /* @__PURE__ */ oe.createElement(Ba, { color: "blue", size: "lg" }, c.total_parts, " Parts"), c.total_critical_low_stock > 0 && /* @__PURE__ */ oe.createElement(
    Ba,
    {
      color: "orange",
      size: "lg",
      leftSection: /* @__PURE__ */ oe.createElement(zn, { size: 12 })
    },
    c.total_critical_low_stock,
    " Low Stock"
  ), (c.total_out_of_stock ?? 0) > 0 && /* @__PURE__ */ oe.createElement(
    Ba,
    {
      color: "red",
      size: "lg",
      leftSection: /* @__PURE__ */ oe.createElement(rl, { size: 12 })
    },
    c.total_out_of_stock,
    " Out of Stock"
  ))), /* @__PURE__ */ oe.createElement(Q0, { p: "sm", withBorder: !0 }, /* @__PURE__ */ oe.createElement(Yt, { justify: "space-between", wrap: "wrap", gap: "sm" }, /* @__PURE__ */ oe.createElement(rv, { value: n, onChange: a }), /* @__PURE__ */ oe.createElement(Yt, { gap: "xs" }, /* @__PURE__ */ oe.createElement(
    sv,
    {
      value: r,
      onChange: L,
      data: [
        {
          label: /* @__PURE__ */ oe.createElement(Yt, { gap: 4 }, /* @__PURE__ */ oe.createElement(hs, { size: 14 }), /* @__PURE__ */ oe.createElement("span", null, "Category")),
          value: "category"
        },
        {
          label: /* @__PURE__ */ oe.createElement(Yt, { gap: 4 }, /* @__PURE__ */ oe.createElement(ds, { size: 14 }), /* @__PURE__ */ oe.createElement("span", null, "Location")),
          value: "location"
        },
        {
          label: /* @__PURE__ */ oe.createElement(Yt, { gap: 4 }, /* @__PURE__ */ oe.createElement(xl, { size: 14 }), /* @__PURE__ */ oe.createElement("span", null, "All")),
          value: "all"
        }
      ],
      size: "xs"
    }
  ), q && /* @__PURE__ */ oe.createElement(oe.Fragment, null, /* @__PURE__ */ oe.createElement(J0, { orientation: "vertical" }), /* @__PURE__ */ oe.createElement(Ua, { label: "Expand All" }, /* @__PURE__ */ oe.createElement(Y0, { variant: "light", onClick: O }, /* @__PURE__ */ oe.createElement(fl, { size: 16 }))), /* @__PURE__ */ oe.createElement(Ua, { label: "Collapse All" }, /* @__PURE__ */ oe.createElement(Y0, { variant: "light", onClick: C }, /* @__PURE__ */ oe.createElement(ll, { size: 16 })))), /* @__PURE__ */ oe.createElement(J0, { orientation: "vertical" }), /* @__PURE__ */ oe.createElement(Ua, { label: "Show only low stock items" }, /* @__PURE__ */ oe.createElement(
    fv,
    {
      checked: l,
      onChange: (F) => o(F.currentTarget.checked),
      label: "Low Stock Only",
      size: "xs",
      color: "orange",
      thumbIcon: l ? /* @__PURE__ */ oe.createElement(zn, { size: 10, color: "orange" }) : null
    }
  ))))), i && q && /* @__PURE__ */ oe.createElement($n, { size: "sm", c: "dimmed" }, 'Showing results for "', i, '"', h.length === 0 && " - No matching parts found"), r === "all" ? (
    /* All Parts Table (flat view) */
    /* @__PURE__ */ oe.createElement(
      Xp,
      {
        parts: c.parts ?? [],
        context: e,
        searchTerm: i,
        showLowStockOnly: l
      }
    )
  ) : (
    /* Grouped View (category or location) */
    h.length > 0 && /* @__PURE__ */ oe.createElement(Q0, { withBorder: !0, style: { overflow: "hidden" } }, /* @__PURE__ */ oe.createElement(Zf, { showLocationQty: r === "location" }), /* @__PURE__ */ oe.createElement(av, { style: { maxHeight: "60vh", overflowY: "auto" } }, h.map((F) => /* @__PURE__ */ oe.createElement(
      qf,
      {
        key: `group-${F.id ?? "none"}-0`,
        group: F,
        context: e,
        expandedGroups: s,
        toggleGroup: k,
        level: 0,
        prefix: Y,
        isLocationView: r === "location"
      }
    ))))
  ));
}
function cv(e) {
  return gl(e), /* @__PURE__ */ oe.createElement(Nl, { locale: e.locale }, /* @__PURE__ */ oe.createElement(ov, { context: e }));
}
export {
  cv as default,
  cv as renderPanel
};
