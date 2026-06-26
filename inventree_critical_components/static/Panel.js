var Bs = (e) => {
  throw TypeError(e);
};
var ni = (e, t, r) => t.has(e) || Bs("Cannot " + r);
var X = (e, t, r) => (ni(e, t, "read from private field"), r ? r.call(e) : t.get(e)), Oe = (e, t, r) => t.has(e) ? Bs("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), me = (e, t, r, n) => (ni(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), Ue = (e, t, r) => (ni(e, t, "access private method"), r);
const Us = window.React.useCallback, Ws = window.React.useEffect, sa = window.React.useRef, df = window.React.useState;
function xf(e, t, r = { leading: !1 }) {
  const [n, a] = df(e), i = sa(!1), s = sa(null), o = sa(!1), c = sa(e);
  c.current = e;
  const l = Us(() => {
    window.clearTimeout(s.current), s.current = null, o.current = !1;
  }, []), f = Us(() => {
    s.current && (l(), o.current = !1, a(c.current));
  }, []);
  return Ws(() => {
    i.current && (!o.current && r.leading ? (o.current = !0, a(e), s.current = window.setTimeout(() => {
      o.current = !1;
    }, t)) : (l(), s.current = window.setTimeout(() => {
      o.current = !1, a(e);
    }, t)));
  }, [
    e,
    r.leading,
    t
  ]), Ws(() => (i.current = !0, l), []), [
    n,
    l,
    {
      cancel: l,
      flush: f
    }
  ];
}
var Ji = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set(), this.subscribe = this.subscribe.bind(this);
  }
  subscribe(t) {
    return this.listeners.add(t), this.onSubscribe(), () => {
      this.listeners.delete(t), this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
}, Fr, ir, nn, ko, pf = (ko = class extends Ji {
  constructor() {
    super();
    Oe(this, Fr);
    Oe(this, ir);
    Oe(this, nn);
    me(this, nn, (r) => {
      if (typeof window < "u" && window.addEventListener) {
        const n = () => r();
        return window.addEventListener("visibilitychange", n, !1), () => {
          window.removeEventListener("visibilitychange", n);
        };
      }
    });
  }
  onSubscribe() {
    X(this, ir) || this.setEventListener(X(this, nn));
  }
  onUnsubscribe() {
    var r;
    this.hasListeners() || ((r = X(this, ir)) == null || r.call(this), me(this, ir, void 0));
  }
  setEventListener(r) {
    var n;
    me(this, nn, r), (n = X(this, ir)) == null || n.call(this), me(this, ir, r((a) => {
      typeof a == "boolean" ? this.setFocused(a) : this.onFocus();
    }));
  }
  setFocused(r) {
    X(this, Fr) !== r && (me(this, Fr, r), this.onFocus());
  }
  onFocus() {
    const r = this.isFocused();
    this.listeners.forEach((n) => {
      n(r);
    });
  }
  isFocused() {
    var r;
    return typeof X(this, Fr) == "boolean" ? X(this, Fr) : ((r = globalThis.document) == null ? void 0 : r.visibilityState) !== "hidden";
  }
}, Fr = new WeakMap(), ir = new WeakMap(), nn = new WeakMap(), ko), mf = new pf(), _f = {
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
}, sr, Ki, Ao, vf = (Ao = class {
  constructor() {
    // We cannot have TimeoutManager<T> as we must instantiate it with a concrete
    // type at app boot; and if we leave that type, then any new timer provider
    // would need to support the default provider's concrete timer ID, which is
    // infeasible across environments.
    //
    // We settle for type safety for the TimeoutProvider type, and accept that
    // this class is unsafe internally to allow for extension.
    Oe(this, sr, _f);
    Oe(this, Ki, !1);
  }
  setTimeoutProvider(t) {
    me(this, sr, t);
  }
  setTimeout(t, r) {
    return X(this, sr).setTimeout(t, r);
  }
  clearTimeout(t) {
    X(this, sr).clearTimeout(t);
  }
  setInterval(t, r) {
    return X(this, sr).setInterval(t, r);
  }
  clearInterval(t) {
    X(this, sr).clearInterval(t);
  }
}, sr = new WeakMap(), Ki = new WeakMap(), Ao), oa = new vf();
function gf(e) {
  setTimeout(e, 0);
}
var wf = typeof window > "u" || "Deno" in globalThis;
function Oi() {
}
function $s(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function Ef(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function Mn(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function At(e, t) {
  return typeof e == "function" ? e(t) : e;
}
var Tf = Object.prototype.hasOwnProperty;
function Io(e, t, r = 0) {
  if (e === t)
    return e;
  if (r > 500) return t;
  const n = Hs(e) && Hs(t);
  if (!n && !(Gs(e) && Gs(t))) return t;
  const i = (n ? e : Object.keys(e)).length, s = n ? t : Object.keys(t), o = s.length, c = n ? new Array(o) : {};
  let l = 0;
  for (let f = 0; f < o; f++) {
    const d = n ? f : s[f], u = e[d], h = t[d];
    if (u === h) {
      c[d] = u, (n ? f < i : Tf.call(e, d)) && l++;
      continue;
    }
    if (u === null || h === null || typeof u != "object" || typeof h != "object") {
      c[d] = h;
      continue;
    }
    const m = Io(u, h, r + 1);
    c[d] = m, m === u && l++;
  }
  return i === o && l === i ? e : c;
}
function Ii(e, t) {
  if (!t || Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const r in e)
    if (e[r] !== t[r])
      return !1;
  return !0;
}
function Hs(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Gs(e) {
  if (!Vs(e))
    return !1;
  const t = e.constructor;
  if (t === void 0)
    return !0;
  const r = t.prototype;
  return !(!Vs(r) || !r.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(e) !== Object.prototype);
}
function Vs(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function zs(e, t, r) {
  return typeof r.structuralSharing == "function" ? r.structuralSharing(e, t) : r.structuralSharing !== !1 ? Io(e, t) : t;
}
function No(e, t) {
  return typeof e == "function" ? e(...t) : !!e;
}
var Ni = /* @__PURE__ */ (() => {
  let e = () => wf;
  return {
    /**
     * Returns whether the current runtime should be treated as a server environment.
     */
    isServer() {
      return e();
    },
    /**
     * Overrides the server check globally.
     */
    setIsServer(t) {
      e = t;
    }
  };
})();
function js() {
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
var Sf = gf;
function yf() {
  let e = [], t = 0, r = (o) => {
    o();
  }, n = (o) => {
    o();
  }, a = Sf;
  const i = (o) => {
    t ? e.push(o) : a(() => {
      r(o);
    });
  }, s = () => {
    const o = e;
    e = [], o.length && a(() => {
      n(() => {
        o.forEach((c) => {
          r(c);
        });
      });
    });
  };
  return {
    batch: (o) => {
      let c;
      t++;
      try {
        c = o();
      } finally {
        t--, t || s();
      }
      return c;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (o) => (...c) => {
      i(() => {
        o(...c);
      });
    },
    schedule: i,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (o) => {
      r = o;
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
var Do = yf(), an, or, sn, Ro, Cf = (Ro = class extends Ji {
  constructor() {
    super();
    Oe(this, an, !0);
    Oe(this, or);
    Oe(this, sn);
    me(this, sn, (r) => {
      if (typeof window < "u" && window.addEventListener) {
        const n = () => r(!0), a = () => r(!1);
        return window.addEventListener("online", n, !1), window.addEventListener("offline", a, !1), () => {
          window.removeEventListener("online", n), window.removeEventListener("offline", a);
        };
      }
    });
  }
  onSubscribe() {
    X(this, or) || this.setEventListener(X(this, sn));
  }
  onUnsubscribe() {
    var r;
    this.hasListeners() || ((r = X(this, or)) == null || r.call(this), me(this, or, void 0));
  }
  setEventListener(r) {
    var n;
    me(this, sn, r), (n = X(this, or)) == null || n.call(this), me(this, or, r(this.setOnline.bind(this)));
  }
  setOnline(r) {
    X(this, an) !== r && (me(this, an, r), this.listeners.forEach((a) => {
      a(r);
    }));
  }
  isOnline() {
    return X(this, an);
  }
}, an = new WeakMap(), or = new WeakMap(), sn = new WeakMap(), Ro), Ff = new Cf();
function kf(e) {
  return (e ?? "online") === "online" ? Ff.isOnline() : !0;
}
function Af(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: kf(t.networkMode) ? "fetching" : "paused",
    ...e === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
var ut, pe, Jn, ot, kr, on, jt, lr, Qn, ln, cn, Ar, Rr, cr, fn, Te, Nn, Di, Mi, Pi, Li, bi, Bi, Ui, Mo, Oo, Rf = (Oo = class extends Ji {
  constructor(t, r) {
    super();
    Oe(this, Te);
    Oe(this, ut);
    Oe(this, pe);
    Oe(this, Jn);
    Oe(this, ot);
    Oe(this, kr);
    Oe(this, on);
    Oe(this, jt);
    Oe(this, lr);
    Oe(this, Qn);
    Oe(this, ln);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    Oe(this, cn);
    Oe(this, Ar);
    Oe(this, Rr);
    Oe(this, cr);
    Oe(this, fn, /* @__PURE__ */ new Set());
    this.options = r, me(this, ut, t), me(this, lr, null), me(this, jt, js()), this.bindMethods(), this.setOptions(r);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 && (X(this, pe).addObserver(this), Xs(X(this, pe), this.options) ? Ue(this, Te, Nn).call(this) : this.updateResult(), Ue(this, Te, Li).call(this));
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return Wi(
      X(this, pe),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return Wi(
      X(this, pe),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), Ue(this, Te, bi).call(this), Ue(this, Te, Bi).call(this), X(this, pe).removeObserver(this);
  }
  setOptions(t) {
    const r = this.options, n = X(this, pe);
    if (this.options = X(this, ut).defaultQueryOptions(t), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof At(this.options.enabled, X(this, pe)) != "boolean")
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    Ue(this, Te, Ui).call(this), X(this, pe).setOptions(this.options), r._defaulted && !Ii(this.options, r) && X(this, ut).getQueryCache().notify({
      type: "observerOptionsUpdated",
      query: X(this, pe),
      observer: this
    });
    const a = this.hasListeners();
    a && Ys(
      X(this, pe),
      n,
      this.options,
      r
    ) && Ue(this, Te, Nn).call(this), this.updateResult(), a && (X(this, pe) !== n || At(this.options.enabled, X(this, pe)) !== At(r.enabled, X(this, pe)) || Mn(this.options.staleTime, X(this, pe)) !== Mn(r.staleTime, X(this, pe))) && Ue(this, Te, Di).call(this);
    const i = Ue(this, Te, Mi).call(this);
    a && (X(this, pe) !== n || At(this.options.enabled, X(this, pe)) !== At(r.enabled, X(this, pe)) || i !== X(this, cr)) && Ue(this, Te, Pi).call(this, i);
  }
  getOptimisticResult(t) {
    const r = X(this, ut).getQueryCache().build(X(this, ut), t), n = this.createResult(r, t);
    return If(this, n) && (me(this, ot, n), me(this, on, this.options), me(this, kr, X(this, pe).state)), n;
  }
  getCurrentResult() {
    return X(this, ot);
  }
  trackResult(t, r) {
    return new Proxy(t, {
      get: (n, a) => (this.trackProp(a), r == null || r(a), a === "promise" && (this.trackProp("data"), !this.options.experimental_prefetchInRender && X(this, jt).status === "pending" && X(this, jt).reject(
        new Error(
          "experimental_prefetchInRender feature flag is not enabled"
        )
      )), Reflect.get(n, a))
    });
  }
  trackProp(t) {
    X(this, fn).add(t);
  }
  getCurrentQuery() {
    return X(this, pe);
  }
  refetch({ ...t } = {}) {
    return this.fetch({
      ...t
    });
  }
  fetchOptimistic(t) {
    const r = X(this, ut).defaultQueryOptions(t), n = X(this, ut).getQueryCache().build(X(this, ut), r);
    return n.fetch().then(() => this.createResult(n, r));
  }
  fetch(t) {
    return Ue(this, Te, Nn).call(this, {
      ...t,
      cancelRefetch: t.cancelRefetch ?? !0
    }).then(() => (this.updateResult(), X(this, ot)));
  }
  createResult(t, r) {
    var P;
    const n = X(this, pe), a = this.options, i = X(this, ot), s = X(this, kr), o = X(this, on), l = t !== n ? t.state : X(this, Jn), { state: f } = t;
    let d = { ...f }, u = !1, h;
    if (r._optimisticResults) {
      const H = this.hasListeners(), D = !H && Xs(t, r), V = H && Ys(t, n, r, a);
      (D || V) && (d = {
        ...d,
        ...Af(f.data, t.options)
      }), r._optimisticResults === "isRestoring" && (d.fetchStatus = "idle");
    }
    let { error: m, errorUpdatedAt: x, status: _ } = d;
    h = d.data;
    let F = !1;
    if (r.placeholderData !== void 0 && h === void 0 && _ === "pending") {
      let H;
      i != null && i.isPlaceholderData && r.placeholderData === (o == null ? void 0 : o.placeholderData) ? (H = i.data, F = !0) : H = typeof r.placeholderData == "function" ? r.placeholderData(
        (P = X(this, cn)) == null ? void 0 : P.state.data,
        X(this, cn)
      ) : r.placeholderData, H !== void 0 && (_ = "success", h = zs(
        i == null ? void 0 : i.data,
        H,
        r
      ), u = !0);
    }
    if (r.select && h !== void 0 && !F)
      if (i && h === (s == null ? void 0 : s.data) && r.select === X(this, Qn))
        h = X(this, ln);
      else
        try {
          me(this, Qn, r.select), h = r.select(h), h = zs(i == null ? void 0 : i.data, h, r), me(this, ln, h), me(this, lr, null);
        } catch (H) {
          me(this, lr, H);
        }
    X(this, lr) && (m = X(this, lr), h = X(this, ln), x = Date.now(), _ = "error");
    const A = d.fetchStatus === "fetching", y = _ === "pending", O = _ === "error", j = y && A, Z = h !== void 0, W = {
      status: _,
      fetchStatus: d.fetchStatus,
      isPending: y,
      isSuccess: _ === "success",
      isError: O,
      isInitialLoading: j,
      isLoading: j,
      data: h,
      dataUpdatedAt: d.dataUpdatedAt,
      error: m,
      errorUpdatedAt: x,
      failureCount: d.fetchFailureCount,
      failureReason: d.fetchFailureReason,
      errorUpdateCount: d.errorUpdateCount,
      isFetched: t.isFetched(),
      isFetchedAfterMount: d.dataUpdateCount > l.dataUpdateCount || d.errorUpdateCount > l.errorUpdateCount,
      isFetching: A,
      isRefetching: A && !y,
      isLoadingError: O && !Z,
      isPaused: d.fetchStatus === "paused",
      isPlaceholderData: u,
      isRefetchError: O && Z,
      isStale: Qi(t, r),
      refetch: this.refetch,
      promise: X(this, jt),
      isEnabled: At(r.enabled, t) !== !1
    };
    if (this.options.experimental_prefetchInRender) {
      const H = W.data !== void 0, D = W.status === "error" && !H, V = (fe) => {
        D ? fe.reject(W.error) : H && fe.resolve(W.data);
      }, q = () => {
        const fe = me(this, jt, W.promise = js());
        V(fe);
      }, _e = X(this, jt);
      switch (_e.status) {
        case "pending":
          t.queryHash === n.queryHash && V(_e);
          break;
        case "fulfilled":
          (D || W.data !== _e.value) && q();
          break;
        case "rejected":
          (!D || W.error !== _e.reason) && q();
          break;
      }
    }
    return W;
  }
  updateResult() {
    const t = X(this, ot), r = this.createResult(X(this, pe), this.options);
    if (me(this, kr, X(this, pe).state), me(this, on, this.options), X(this, kr).data !== void 0 && me(this, cn, X(this, pe)), Ii(r, t))
      return;
    me(this, ot, r);
    const n = () => {
      if (!t)
        return !0;
      const { notifyOnChangeProps: a } = this.options, i = typeof a == "function" ? a() : a;
      if (i === "all" || !i && !X(this, fn).size)
        return !0;
      const s = new Set(
        i ?? X(this, fn)
      );
      return this.options.throwOnError && s.add("error"), Object.keys(X(this, ot)).some((o) => {
        const c = o;
        return X(this, ot)[c] !== t[c] && s.has(c);
      });
    };
    Ue(this, Te, Mo).call(this, { listeners: n() });
  }
  onQueryUpdate() {
    this.updateResult(), this.hasListeners() && Ue(this, Te, Li).call(this);
  }
}, ut = new WeakMap(), pe = new WeakMap(), Jn = new WeakMap(), ot = new WeakMap(), kr = new WeakMap(), on = new WeakMap(), jt = new WeakMap(), lr = new WeakMap(), Qn = new WeakMap(), ln = new WeakMap(), cn = new WeakMap(), Ar = new WeakMap(), Rr = new WeakMap(), cr = new WeakMap(), fn = new WeakMap(), Te = new WeakSet(), Nn = function(t) {
  Ue(this, Te, Ui).call(this);
  let r = X(this, pe).fetch(
    this.options,
    t
  );
  return t != null && t.throwOnError || (r = r.catch(Oi)), r;
}, Di = function() {
  Ue(this, Te, bi).call(this);
  const t = Mn(
    this.options.staleTime,
    X(this, pe)
  );
  if (Ni.isServer() || X(this, ot).isStale || !$s(t))
    return;
  const n = Ef(X(this, ot).dataUpdatedAt, t) + 1;
  me(this, Ar, oa.setTimeout(() => {
    X(this, ot).isStale || this.updateResult();
  }, n));
}, Mi = function() {
  return (typeof this.options.refetchInterval == "function" ? this.options.refetchInterval(X(this, pe)) : this.options.refetchInterval) ?? !1;
}, Pi = function(t) {
  Ue(this, Te, Bi).call(this), me(this, cr, t), !(Ni.isServer() || At(this.options.enabled, X(this, pe)) === !1 || !$s(X(this, cr)) || X(this, cr) === 0) && me(this, Rr, oa.setInterval(() => {
    (this.options.refetchIntervalInBackground || mf.isFocused()) && Ue(this, Te, Nn).call(this);
  }, X(this, cr)));
}, Li = function() {
  Ue(this, Te, Di).call(this), Ue(this, Te, Pi).call(this, Ue(this, Te, Mi).call(this));
}, bi = function() {
  X(this, Ar) !== void 0 && (oa.clearTimeout(X(this, Ar)), me(this, Ar, void 0));
}, Bi = function() {
  X(this, Rr) !== void 0 && (oa.clearInterval(X(this, Rr)), me(this, Rr, void 0));
}, Ui = function() {
  const t = X(this, ut).getQueryCache().build(X(this, ut), this.options);
  if (t === X(this, pe))
    return;
  const r = X(this, pe);
  me(this, pe, t), me(this, Jn, t.state), this.hasListeners() && (r == null || r.removeObserver(this), t.addObserver(this));
}, Mo = function(t) {
  Do.batch(() => {
    t.listeners && this.listeners.forEach((r) => {
      r(X(this, ot));
    }), X(this, ut).getQueryCache().notify({
      query: X(this, pe),
      type: "observerResultsUpdated"
    });
  });
}, Oo);
function Of(e, t) {
  return At(t.enabled, e) !== !1 && e.state.data === void 0 && !(e.state.status === "error" && At(t.retryOnMount, e) === !1);
}
function Xs(e, t) {
  return Of(e, t) || e.state.data !== void 0 && Wi(e, t, t.refetchOnMount);
}
function Wi(e, t, r) {
  if (At(t.enabled, e) !== !1 && Mn(t.staleTime, e) !== "static") {
    const n = typeof r == "function" ? r(e) : r;
    return n === "always" || n !== !1 && Qi(e, t);
  }
  return !1;
}
function Ys(e, t, r, n) {
  return (e !== t || At(n.enabled, e) === !1) && (!r.suspense || e.state.status !== "error") && Qi(e, r);
}
function Qi(e, t) {
  return At(t.enabled, e) !== !1 && e.isStaleByTime(Mn(t.staleTime, e));
}
function If(e, t) {
  return !Ii(e.getCurrentResult(), t);
}
var ai = { exports: {} }, wn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ks;
function Nf() {
  if (Ks) return wn;
  Ks = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function r(n, a, i) {
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
  return wn.Fragment = t, wn.jsx = r, wn.jsxs = r, wn;
}
var Js;
function Df() {
  return Js || (Js = 1, ai.exports = Nf()), ai.exports;
}
Df();
const Po = window.React;
var Mf = Po.createContext(
  void 0
), Pf = (e) => {
  const t = Po.useContext(Mf);
  if (e)
    return e;
  if (!t)
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  return t;
};
const Lo = window.React;
var bo = Lo.createContext(!1), Lf = () => Lo.useContext(bo);
bo.Provider;
const Bo = window.React;
function bf() {
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
var Bf = Bo.createContext(bf()), Uf = () => Bo.useContext(Bf);
const Wf = window.React;
var $f = (e, t, r) => {
  const n = r != null && r.state.error && typeof e.throwOnError == "function" ? No(e.throwOnError, [r.state.error, r]) : e.throwOnError;
  (e.suspense || e.experimental_prefetchInRender || n) && (t.isReset() || (e.retryOnMount = !1));
}, Hf = (e) => {
  Wf.useEffect(() => {
    e.clearReset();
  }, [e]);
}, Gf = ({
  result: e,
  errorResetBoundary: t,
  throwOnError: r,
  query: n,
  suspense: a
}) => e.isError && !t.isReset() && !e.isFetching && n && (a && e.data === void 0 || No(r, [e.error, n])), Vf = (e) => {
  if (e.suspense) {
    const r = (a) => a === "static" ? a : Math.max(a ?? 1e3, 1e3), n = e.staleTime;
    e.staleTime = typeof n == "function" ? (...a) => r(n(...a)) : r(n), typeof e.gcTime == "number" && (e.gcTime = Math.max(
      e.gcTime,
      1e3
    ));
  }
}, zf = (e, t) => e.isLoading && e.isFetching && !t, jf = (e, t) => (e == null ? void 0 : e.suspense) && t.isPending, Qs = (e, t, r) => t.fetchOptimistic(e).catch(() => {
  r.clearReset();
});
const la = window.React;
function Xf(e, t, r) {
  var h, m, x, _;
  const n = Lf(), a = Uf(), i = Pf(r), s = i.defaultQueryOptions(e);
  (m = (h = i.getDefaultOptions().queries) == null ? void 0 : h._experimental_beforeQuery) == null || m.call(
    h,
    s
  );
  const o = i.getQueryCache().get(s.queryHash), c = e.subscribed !== !1;
  s._optimisticResults = n ? "isRestoring" : c ? "optimistic" : void 0, Vf(s), $f(s, a, o), Hf(a);
  const l = !i.getQueryCache().get(s.queryHash), [f] = la.useState(
    () => new t(
      i,
      s
    )
  ), d = f.getOptimisticResult(s), u = !n && c;
  if (la.useSyncExternalStore(
    la.useCallback(
      (F) => {
        const A = u ? f.subscribe(Do.batchCalls(F)) : Oi;
        return f.updateResult(), A;
      },
      [f, u]
    ),
    () => f.getCurrentResult(),
    () => f.getCurrentResult()
  ), la.useEffect(() => {
    f.setOptions(s);
  }, [s, f]), jf(s, d))
    throw Qs(s, f, a);
  if (Gf({
    result: d,
    errorResetBoundary: a,
    throwOnError: s.throwOnError,
    query: o,
    suspense: s.suspense
  }))
    throw d.error;
  if ((_ = (x = i.getDefaultOptions().queries) == null ? void 0 : x._experimental_afterQuery) == null || _.call(
    x,
    s,
    d
  ), s.experimental_prefetchInRender && !Ni.isServer() && zf(d, n)) {
    const F = l ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      Qs(s, f, a)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      o == null ? void 0 : o.promise
    );
    F == null || F.catch(Oi).finally(() => {
      f.updateResult();
    });
  }
  return s.notifyOnChangeProps ? d : f.trackResult(d);
}
function Yf(e, t) {
  return Xf(e, Rf, t);
}
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Kf = {
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
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jf = window.React.forwardRef, ii = window.React.createElement, at = (e, t, r, n) => {
  const a = Jf(
    ({ color: i = "currentColor", size: s = 24, stroke: o = 2, title: c, className: l, children: f, ...d }, u) => ii(
      "svg",
      {
        ref: u,
        ...Kf[e],
        width: s,
        height: s,
        className: ["tabler-icon", `tabler-icon-${t}`, l].join(" "),
        strokeWidth: o,
        stroke: i,
        ...d
      },
      [
        c && ii("title", { key: "svg-title" }, c),
        ...n.map(([h, m]) => ii(h, m)),
        ...Array.isArray(f) ? f : [f]
      ]
    )
  );
  return a.displayName = `${r}`, a;
};
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qf = [["path", { d: "M12 9v4", key: "svg-0" }], ["path", { d: "M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0", key: "svg-1" }], ["path", { d: "M12 16h.01", key: "svg-2" }]], Fa = at("outline", "alert-triangle", "AlertTriangle", Qf);
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qf = [["path", { d: "M17.765 17.757l-5.765 3.243l-8 -4.5v-9l2.236 -1.258m2.57 -1.445l3.194 -1.797l8 4.5v8.5", key: "svg-0" }], ["path", { d: "M14.561 10.559l5.439 -3.059", key: "svg-1" }], ["path", { d: "M12 12v9", key: "svg-2" }], ["path", { d: "M12 12l-8 -4.5", key: "svg-3" }], ["path", { d: "M3 3l18 18", key: "svg-4" }]], Zf = at("outline", "box-off", "BoxOff", qf);
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eu = [["path", { d: "M4 4h6v6h-6l0 -6", key: "svg-0" }], ["path", { d: "M14 4h6v6h-6l0 -6", key: "svg-1" }], ["path", { d: "M4 14h6v6h-6l0 -6", key: "svg-2" }], ["path", { d: "M14 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0", key: "svg-3" }]], Uo = at("outline", "category", "Category", eu);
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tu = [["path", { d: "M6 9l6 6l6 -6", key: "svg-0" }]], qi = at("outline", "chevron-down", "ChevronDown", tu);
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ru = [["path", { d: "M9 6l6 6l-6 6", key: "svg-0" }]], Zi = at("outline", "chevron-right", "ChevronRight", ru);
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nu = [["path", { d: "M7 7l5 5l5 -5", key: "svg-0" }], ["path", { d: "M7 13l5 5l5 -5", key: "svg-1" }]], au = at("outline", "chevrons-down", "ChevronsDown", nu);
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const iu = [["path", { d: "M7 11l5 -5l5 5", key: "svg-0" }], ["path", { d: "M7 17l5 -5l5 5", key: "svg-1" }]], su = at("outline", "chevrons-up", "ChevronsUp", iu);
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ou = [["path", { d: "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0", key: "svg-0" }], ["path", { d: "M12 7v5l3 3", key: "svg-1" }]], $i = at("outline", "clock", "Clock", ou);
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lu = [["path", { d: "M14 3v4a1 1 0 0 0 1 1h4", key: "svg-0" }], ["path", { d: "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2", key: "svg-1" }], ["path", { d: "M8 11h8v7h-8l0 -7", key: "svg-2" }], ["path", { d: "M8 15h8", key: "svg-3" }], ["path", { d: "M11 11v7", key: "svg-4" }]], cu = at("outline", "file-spreadsheet", "FileSpreadsheet", lu);
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fu = [["path", { d: "M9 6l11 0", key: "svg-0" }], ["path", { d: "M9 12l11 0", key: "svg-1" }], ["path", { d: "M9 18l11 0", key: "svg-2" }], ["path", { d: "M5 6l0 .01", key: "svg-3" }], ["path", { d: "M5 12l0 .01", key: "svg-4" }], ["path", { d: "M5 18l0 .01", key: "svg-5" }]], uu = at("outline", "list", "List", fu);
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hu = [["path", { d: "M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6", key: "svg-0" }], ["path", { d: "M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0", key: "svg-1" }], ["path", { d: "M8 11v-4a4 4 0 1 1 8 0v4", key: "svg-2" }]], du = at("outline", "lock", "Lock", hu);
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xu = [["path", { d: "M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0", key: "svg-0" }], ["path", { d: "M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0", key: "svg-1" }]], Wo = at("outline", "map-pin", "MapPin", xu);
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pu = [["path", { d: "M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4", key: "svg-0" }], ["path", { d: "M13.5 6.5l4 4", key: "svg-1" }]], mu = at("outline", "pencil", "Pencil", pu);
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _u = [["path", { d: "M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4", key: "svg-0" }], ["path", { d: "M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4", key: "svg-1" }]], vu = at("outline", "refresh", "Refresh", _u);
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gu = [["path", { d: "M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", key: "svg-0" }], ["path", { d: "M21 21l-6 -6", key: "svg-1" }]], wu = at("outline", "search", "Search", gu);
/**
 * @license @tabler/icons-react v3.44.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eu = [["path", { d: "M18 6l-12 12", key: "svg-0" }], ["path", { d: "M6 6l12 12", key: "svg-1" }]], Tu = at("outline", "x", "X", Eu), qs = "1.4.5";
var xe = /* @__PURE__ */ ((e) => (e.api_server_info = "", e.user_list = "user/", e.user_set_password = "user/:id/set-password/", e.user_tokens = "user/tokens/", e.user_simple_login = "email/generate/", e.user_me_profile = "user/me/profile/", e.user_me_roles = "user/me/roles/", e.user_me_token = "user/me/token/", e.user_me = "user/me/", e.auth_base = "/auth/", e.user_reset = "auth/v1/auth/password/request", e.user_reset_set = "auth/v1/auth/password/reset", e.auth_pwd_change = "auth/v1/account/password/change", e.auth_login = "auth/v1/auth/login", e.auth_login_2fa = "auth/v1/auth/2fa/authenticate", e.auth_session = "auth/v1/auth/session", e.auth_signup = "auth/v1/auth/signup", e.auth_authenticators = "auth/v1/account/authenticators", e.auth_recovery = "auth/v1/account/authenticators/recovery-codes", e.auth_mfa_reauthenticate = "auth/v1/auth/2fa/reauthenticate", e.auth_totp = "auth/v1/account/authenticators/totp", e.auth_trust = "auth/v1/auth/2fa/trust", e.auth_webauthn = "auth/v1/account/authenticators/webauthn", e.auth_webauthn_login = "auth/v1/auth/webauthn/authenticate", e.auth_reauthenticate = "auth/v1/auth/reauthenticate", e.auth_email = "auth/v1/account/email", e.auth_email_verify = "auth/v1/auth/email/verify", e.auth_providers = "auth/v1/account/providers", e.auth_provider_redirect = "auth/v1/auth/provider/redirect", e.auth_config = "auth/v1/config", e.currency_list = "currency/exchange/", e.currency_refresh = "currency/refresh/", e.all_units = "units/all/", e.task_overview = "background-task/", e.task_pending_list = "background-task/pending/", e.task_scheduled_list = "background-task/scheduled/", e.task_failed_list = "background-task/failed/", e.api_search = "search/", e.settings_global_list = "settings/global/", e.settings_user_list = "settings/user/", e.news = "news/", e.global_status = "generic/status/", e.custom_state_list = "generic/status/custom/", e.version = "version/", e.license = "license/", e.group_list = "user/group/", e.owner_list = "user/owner/", e.ruleset_list = "user/ruleset/", e.content_type_list = "contenttype/", e.icons = "icons/", e.selectionlist_list = "selection/", e.selectionentry_list = "selection/:id/entry/", e.barcode = "barcode/", e.barcode_history = "barcode/history/", e.barcode_link = "barcode/link/", e.barcode_unlink = "barcode/unlink/", e.barcode_generate = "barcode/generate/", e.data_output = "data-output/", e.import_session_list = "importer/session/", e.import_session_accept_fields = "importer/session/:id/accept_fields/", e.import_session_accept_rows = "importer/session/:id/accept_rows/", e.import_session_column_mapping_list = "importer/column-mapping/", e.import_session_row_list = "importer/row/", e.notifications_list = "notifications/", e.notifications_readall = "notifications/readall/", e.build_order_list = "build/", e.build_order_issue = "build/:id/issue/", e.build_order_cancel = "build/:id/cancel/", e.build_order_hold = "build/:id/hold/", e.build_order_complete = "build/:id/finish/", e.build_output_complete = "build/:id/complete/", e.build_output_create = "build/:id/create-output/", e.build_output_scrap = "build/:id/scrap-outputs/", e.build_output_delete = "build/:id/delete-outputs/", e.build_order_auto_allocate = "build/:id/auto-allocate/", e.build_order_allocate = "build/:id/allocate/", e.build_order_consume = "build/:id/consume/", e.build_order_deallocate = "build/:id/unallocate/", e.build_line_list = "build/line/", e.build_item_list = "build/item/", e.bom_list = "bom/", e.bom_item_validate = "bom/:id/validate/", e.bom_validate = "part/:id/bom-validate/", e.bom_substitute_list = "bom/substitute/", e.part_list = "part/", e.part_thumbs_list = "part/thumbs/", e.part_pricing = "part/:id/pricing/", e.part_requirements = "part/:id/requirements/", e.part_serial_numbers = "part/:id/serial-numbers/", e.part_scheduling = "part/:id/scheduling/", e.part_pricing_internal = "part/internal-price/", e.part_pricing_sale = "part/sale-price/", e.part_stocktake_list = "part/stocktake/", e.part_stocktake_generate = "part/stocktake/generate/", e.category_list = "part/category/", e.category_tree = "part/category/tree/", e.category_parameter_list = "part/category/parameters/", e.related_part_list = "part/related/", e.part_test_template_list = "part/test-template/", e.company_list = "company/", e.contact_list = "company/contact/", e.address_list = "company/address/", e.supplier_part_list = "company/part/", e.supplier_part_pricing_list = "company/price-break/", e.manufacturer_part_list = "company/part/manufacturer/", e.stock_location_list = "stock/location/", e.stock_location_type_list = "stock/location-type/", e.stock_location_tree = "stock/location/tree/", e.stock_item_list = "stock/", e.stock_tracking_list = "stock/track/", e.stock_test_result_list = "stock/test/", e.stock_transfer = "stock/transfer/", e.stock_remove = "stock/remove/", e.stock_return = "stock/return/", e.stock_add = "stock/add/", e.stock_count = "stock/count/", e.stock_change_status = "stock/change_status/", e.stock_merge = "stock/merge/", e.stock_assign = "stock/assign/", e.stock_status = "stock/status/", e.stock_convert = "stock/:id/convert/", e.stock_install = "stock/:id/install/", e.stock_uninstall = "stock/:id/uninstall/", e.stock_serialize = "stock/:id/serialize/", e.stock_serial_info = "stock/:id/serial-numbers/", e.generate_batch_code = "generate/batch-code/", e.generate_serial_number = "generate/serial-number/", e.purchase_order_list = "order/po/", e.purchase_order_issue = "order/po/:id/issue/", e.purchase_order_hold = "order/po/:id/hold/", e.purchase_order_cancel = "order/po/:id/cancel/", e.purchase_order_complete = "order/po/:id/complete/", e.purchase_order_line_list = "order/po-line/", e.purchase_order_extra_line_list = "order/po-extra-line/", e.purchase_order_receive = "order/po/:id/receive/", e.sales_order_list = "order/so/", e.sales_order_issue = "order/so/:id/issue/", e.sales_order_hold = "order/so/:id/hold/", e.sales_order_cancel = "order/so/:id/cancel/", e.sales_order_ship = "order/so/:id/ship/", e.sales_order_complete = "order/so/:id/complete/", e.sales_order_allocate = "order/so/:id/allocate/", e.sales_order_allocate_serials = "order/so/:id/allocate-serials/", e.sales_order_auto_allocate = "order/so/:id/auto-allocate/", e.sales_order_line_list = "order/so-line/", e.sales_order_extra_line_list = "order/so-extra-line/", e.sales_order_allocation_list = "order/so-allocation/", e.sales_order_shipment_list = "order/so/shipment/", e.sales_order_shipment_complete = "order/so/shipment/:id/ship/", e.return_order_list = "order/ro/", e.return_order_issue = "order/ro/:id/issue/", e.return_order_hold = "order/ro/:id/hold/", e.return_order_cancel = "order/ro/:id/cancel/", e.return_order_complete = "order/ro/:id/complete/", e.return_order_receive = "order/ro/:id/receive/", e.return_order_line_list = "order/ro-line/", e.return_order_extra_line_list = "order/ro-extra-line/", e.transfer_order_list = "order/transfer-order/", e.transfer_order_issue = "order/transfer-order/:id/issue/", e.transfer_order_hold = "order/transfer-order/:id/hold/", e.transfer_order_cancel = "order/transfer-order/:id/cancel/", e.transfer_order_complete = "order/transfer-order/:id/complete/", e.transfer_order_allocate = "order/transfer-order/:id/allocate/", e.transfer_order_allocate_serials = "order/transfer-order/:id/allocate-serials/", e.transfer_order_line_list = "order/transfer-order-line/", e.transfer_order_allocation_list = "order/transfer-order-allocation/", e.label_list = "label/template/", e.label_print = "label/print/", e.report_list = "report/template/", e.report_print = "report/print/", e.report_snippet = "report/snippet/", e.report_asset = "report/asset/", e.plugin_list = "plugins/", e.plugin_setting_list = "plugins/:plugin/settings/", e.plugin_user_setting_list = "plugins/:plugin/user-settings/", e.plugin_registry_status = "plugins/status/", e.plugin_install = "plugins/install/", e.plugin_reload = "plugins/reload/", e.plugin_activate = "plugins/:key/activate/", e.plugin_uninstall = "plugins/:key/uninstall/", e.plugin_admin = "plugins/:key/admin/", e.plugin_ui_features_list = "plugins/ui/features/:feature_type/", e.plugin_locate_item = "locate/", e.plugin_supplier_list = "supplier/list/", e.plugin_supplier_search = "supplier/search/", e.plugin_supplier_import = "supplier/import/", e.machine_types_list = "machine/types/", e.machine_driver_list = "machine/drivers/", e.machine_registry_status = "machine/status/", e.machine_list = "machine/", e.machine_restart = "machine/:machine/restart/", e.machine_setting_list = "machine/:machine/settings/", e.machine_setting_detail = "machine/:machine/settings/:config_type/", e.attachment_list = "attachment/", e.error_report_list = "error-report/", e.project_code_list = "project-code/", e.custom_unit_list = "units/", e.notes_image_upload = "notes-image-upload/", e.email_list = "admin/email/", e.email_test = "admin/email/test/", e.config_list = "admin/config/", e.parameter_list = "parameter/", e.parameter_template_list = "parameter/template/", e.tag_list = "tag/", e.system_internal_trace_end = "system-internal/observability/end", e))(xe || {});
window.LinguiCore.i18n;
window.LinguiCore.i18n;
xe.part_list, xe.parameter_list, xe.parameter_template_list, xe.part_test_template_list, xe.supplier_part_list, xe.manufacturer_part_list, xe.category_list, xe.stock_item_list, xe.stock_location_list, xe.stock_location_type_list, xe.stock_tracking_list, xe.build_order_list, xe.build_line_list, xe.build_item_list, xe.company_list, xe.project_code_list, xe.purchase_order_list, xe.purchase_order_line_list, xe.sales_order_list, xe.sales_order_shipment_list, xe.return_order_list, xe.return_order_line_list, xe.transfer_order_list, xe.transfer_order_line_list, xe.address_list, xe.contact_list, xe.owner_list, xe.user_list, xe.group_list, xe.import_session_list, xe.label_list, xe.report_list, xe.plugin_list, xe.content_type_list, xe.selectionlist_list, xe.selectionentry_list, xe.error_report_list, xe.tag_list;
window.LinguiCore.i18n;
window.MantineNotifications.notifications;
function Su(e) {
  var t;
  const r = ((t = e == null ? void 0 : e.version) == null ? void 0 : t.inventree) || "";
  qs != r && console.info(`Plugin version mismatch! Expected version ${qs}, got ${r}`);
}
var si = { exports: {} }, En = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zs;
function yu() {
  if (Zs) return En;
  Zs = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function r(n, a, i) {
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
  return En.Fragment = t, En.jsx = r, En.jsxs = r, En;
}
var e0;
function Cu() {
  return e0 || (e0 = 1, si.exports = yu()), si.exports;
}
Cu();
window.MantineCore.ActionIcon;
window.MantineCore.Group;
window.MantineCore.Tooltip;
/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Fu = {
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
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ku = window.React.forwardRef, oi = window.React.createElement, pt = (e, t, r, n) => {
  const a = ku(
    ({ color: i = "currentColor", size: s = 24, stroke: o = 2, title: c, className: l, children: f, ...d }, u) => oi(
      "svg",
      {
        ref: u,
        ...Fu[e],
        width: s,
        height: s,
        className: ["tabler-icon", `tabler-icon-${t}`, l].join(" "),
        strokeWidth: o,
        stroke: i,
        ...d
      },
      [
        c && oi("title", { key: "svg-title" }, c),
        ...n.map(([h, m]) => oi(h, m)),
        ...Array.isArray(f) ? f : [f]
      ]
    )
  );
  return a.displayName = `${r}`, a;
};
/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Au = [["path", { d: "M12 5l0 14", key: "svg-0" }], ["path", { d: "M5 12l14 0", key: "svg-1" }]];
pt("outline", "plus", "Plus", Au);
const Ru = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__, $o = Object.prototype.toString;
function Ou(e) {
  switch ($o.call(e)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
    case "[object WebAssembly.Exception]":
      return !0;
    default:
      return Mu(e, Error);
  }
}
function Iu(e, t) {
  return $o.call(e) === `[object ${t}]`;
}
function Nu(e) {
  return Iu(e, "Object");
}
function Du(e) {
  return !!(e != null && e.then && typeof e.then == "function");
}
function Mu(e, t) {
  try {
    return e instanceof t;
  } catch {
    return !1;
  }
}
const Pn = "10.46.0", $t = globalThis;
function Ha() {
  return es($t), $t;
}
function es(e) {
  const t = e.__SENTRY__ = e.__SENTRY__ || {};
  return t.version = t.version || Pn, t[Pn] = t[Pn] || {};
}
function ts(e, t, r = $t) {
  const n = r.__SENTRY__ = r.__SENTRY__ || {}, a = n[Pn] = n[Pn] || {};
  return a[e] || (a[e] = t());
}
const Or = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__;
let $r;
function Ga(e) {
  if ($r !== void 0)
    return $r ? $r(e) : e();
  const t = Symbol.for("__SENTRY_SAFE_RANDOM_ID_WRAPPER__"), r = $t;
  return t in r && typeof r[t] == "function" ? ($r = r[t], $r(e)) : ($r = null, e());
}
function Hi() {
  return Ga(() => Math.random());
}
function Pu() {
  return Ga(() => Date.now());
}
function Lu() {
  const e = $t;
  return e.crypto || e.msCrypto;
}
let li;
function bu() {
  return Hi() * 16;
}
function Ln(e = Lu()) {
  try {
    if (e != null && e.randomUUID)
      return Ga(() => e.randomUUID()).replace(/-/g, "");
  } catch {
  }
  return li || (li = "10000000100040008000" + 1e11), li.replace(
    /[018]/g,
    (t) => (
      // eslint-disable-next-line no-bitwise
      (t ^ (bu() & 15) >> t / 4).toString(16)
    )
  );
}
const Ho = 1e3;
function Go() {
  return Pu() / Ho;
}
function Bu() {
  const { performance: e } = $t;
  if (!(e != null && e.now) || !e.timeOrigin)
    return Go;
  const t = e.timeOrigin;
  return () => (t + Ga(() => e.now())) / Ho;
}
let t0;
function Uu() {
  return (t0 ?? (t0 = Bu()))();
}
function Wu(e, t = {}) {
  if (t.user && (!e.ipAddress && t.user.ip_address && (e.ipAddress = t.user.ip_address), !e.did && !t.did && (e.did = t.user.id || t.user.email || t.user.username)), e.timestamp = t.timestamp || Uu(), t.abnormal_mechanism && (e.abnormal_mechanism = t.abnormal_mechanism), t.ignoreDuration && (e.ignoreDuration = t.ignoreDuration), t.sid && (e.sid = t.sid.length === 32 ? t.sid : Ln()), t.init !== void 0 && (e.init = t.init), !e.did && t.did && (e.did = `${t.did}`), typeof t.started == "number" && (e.started = t.started), e.ignoreDuration)
    e.duration = void 0;
  else if (typeof t.duration == "number")
    e.duration = t.duration;
  else {
    const r = e.timestamp - e.started;
    e.duration = r >= 0 ? r : 0;
  }
  t.release && (e.release = t.release), t.environment && (e.environment = t.environment), !e.ipAddress && t.ipAddress && (e.ipAddress = t.ipAddress), !e.userAgent && t.userAgent && (e.userAgent = t.userAgent), typeof t.errors == "number" && (e.errors = t.errors), t.status && (e.status = t.status);
}
const $u = "Sentry Logger ", r0 = {};
function Vo(e) {
  if (!("console" in $t))
    return e();
  const t = $t.console, r = {}, n = Object.keys(r0);
  n.forEach((a) => {
    const i = r0[a];
    r[a] = t[a], t[a] = i;
  });
  try {
    return e();
  } finally {
    n.forEach((a) => {
      t[a] = r[a];
    });
  }
}
function Hu() {
  ns().enabled = !0;
}
function Gu() {
  ns().enabled = !1;
}
function zo() {
  return ns().enabled;
}
function Vu(...e) {
  rs("log", ...e);
}
function zu(...e) {
  rs("warn", ...e);
}
function ju(...e) {
  rs("error", ...e);
}
function rs(e, ...t) {
  Or && zo() && Vo(() => {
    $t.console[e](`${$u}[${e}]:`, ...t);
  });
}
function ns() {
  return Or ? ts("loggerSettings", () => ({ enabled: !1 })) : { enabled: !1 };
}
const Mt = {
  /** Enable logging. */
  enable: Hu,
  /** Disable logging. */
  disable: Gu,
  /** Check if logging is enabled. */
  isEnabled: zo,
  /** Log a message. */
  log: Vu,
  /** Log a warning. */
  warn: zu,
  /** Log an error. */
  error: ju
};
function jo(e, t, r = 2) {
  if (!t || typeof t != "object" || r <= 0)
    return t;
  if (e && Object.keys(t).length === 0)
    return e;
  const n = { ...e };
  for (const a in t)
    Object.prototype.hasOwnProperty.call(t, a) && (n[a] = jo(n[a], t[a], r - 1));
  return n;
}
function n0() {
  return Ln();
}
function Xu(e, t, r) {
  try {
    Object.defineProperty(e, t, {
      // enumerable: false, // the default, so we can save on bundle size by not explicitly setting it
      value: r,
      writable: !0,
      configurable: !0
    });
  } catch {
    Or && Mt.log(`Failed to add non-enumerable property "${t}" to object`, e);
  }
}
const Gi = "_sentrySpan";
function a0(e, t) {
  t ? Xu(e, Gi, t) : delete e[Gi];
}
function i0(e) {
  return e[Gi];
}
function Yu(e, t = 0) {
  return typeof e != "string" || t === 0 || e.length <= t ? e : `${e.slice(0, t)}...`;
}
const Ku = 100;
class hr {
  /** Flag if notifying is happening. */
  /** Callback for client to receive scope changes. */
  /** Callback list that will be called during event processing. */
  /** Array of breadcrumbs. */
  /** User */
  /** Tags */
  /** Attributes */
  /** Extra */
  /** Contexts */
  /** Attachments */
  /** Propagation Context for distributed tracing */
  /**
   * A place to stash data which is needed at some point in the SDK's event processing pipeline but which shouldn't get
   * sent to Sentry
   */
  /** Fingerprint */
  /** Severity */
  /**
   * Transaction Name
   *
   * IMPORTANT: The transaction name on the scope has nothing to do with root spans/transaction objects.
   * It's purpose is to assign a transaction to the scope that's added to non-transaction events.
   */
  /** Session */
  /** The client on this scope */
  /** Contains the last event id of a captured event.  */
  /** Conversation ID */
  // NOTE: Any field which gets added here should get added not only to the constructor but also to the `clone` method.
  constructor() {
    this._notifyingListeners = !1, this._scopeListeners = [], this._eventProcessors = [], this._breadcrumbs = [], this._attachments = [], this._user = {}, this._tags = {}, this._attributes = {}, this._extra = {}, this._contexts = {}, this._sdkProcessingMetadata = {}, this._propagationContext = {
      traceId: n0(),
      sampleRand: Hi()
    };
  }
  /**
   * Clone all data from this scope into a new scope.
   */
  clone() {
    const t = new hr();
    return t._breadcrumbs = [...this._breadcrumbs], t._tags = { ...this._tags }, t._attributes = { ...this._attributes }, t._extra = { ...this._extra }, t._contexts = { ...this._contexts }, this._contexts.flags && (t._contexts.flags = {
      values: [...this._contexts.flags.values]
    }), t._user = this._user, t._level = this._level, t._session = this._session, t._transactionName = this._transactionName, t._fingerprint = this._fingerprint, t._eventProcessors = [...this._eventProcessors], t._attachments = [...this._attachments], t._sdkProcessingMetadata = { ...this._sdkProcessingMetadata }, t._propagationContext = { ...this._propagationContext }, t._client = this._client, t._lastEventId = this._lastEventId, t._conversationId = this._conversationId, a0(t, i0(this)), t;
  }
  /**
   * Update the client assigned to this scope.
   * Note that not every scope will have a client assigned - isolation scopes & the global scope will generally not have a client,
   * as well as manually created scopes.
   */
  setClient(t) {
    this._client = t;
  }
  /**
   * Set the ID of the last captured error event.
   * This is generally only captured on the isolation scope.
   */
  setLastEventId(t) {
    this._lastEventId = t;
  }
  /**
   * Get the client assigned to this scope.
   */
  getClient() {
    return this._client;
  }
  /**
   * Get the ID of the last captured error event.
   * This is generally only available on the isolation scope.
   */
  lastEventId() {
    return this._lastEventId;
  }
  /**
   * @inheritDoc
   */
  addScopeListener(t) {
    this._scopeListeners.push(t);
  }
  /**
   * Add an event processor that will be called before an event is sent.
   */
  addEventProcessor(t) {
    return this._eventProcessors.push(t), this;
  }
  /**
   * Set the user for this scope.
   * Set to `null` to unset the user.
   */
  setUser(t) {
    return this._user = t || {
      email: void 0,
      id: void 0,
      ip_address: void 0,
      username: void 0
    }, this._session && Wu(this._session, { user: t }), this._notifyScopeListeners(), this;
  }
  /**
   * Get the user from this scope.
   */
  getUser() {
    return this._user;
  }
  /**
   * Set the conversation ID for this scope.
   * Set to `null` to unset the conversation ID.
   */
  setConversationId(t) {
    return this._conversationId = t || void 0, this._notifyScopeListeners(), this;
  }
  /**
   * Set an object that will be merged into existing tags on the scope,
   * and will be sent as tags data with the event.
   */
  setTags(t) {
    return this._tags = {
      ...this._tags,
      ...t
    }, this._notifyScopeListeners(), this;
  }
  /**
   * Set a single tag that will be sent as tags data with the event.
   */
  setTag(t, r) {
    return this.setTags({ [t]: r });
  }
  /**
   * Sets attributes onto the scope.
   *
   * These attributes are currently applied to logs and metrics.
   * In the future, they will also be applied to spans.
   *
   * Important: For now, only strings, numbers and boolean attributes are supported, despite types allowing for
   * more complex attribute types. We'll add this support in the future but already specify the wider type to
   * avoid a breaking change in the future.
   *
   * @param newAttributes - The attributes to set on the scope. You can either pass in key-value pairs, or
   * an object with a `value` and an optional `unit` (if applicable to your attribute).
   *
   * @example
   * ```typescript
   * scope.setAttributes({
   *   is_admin: true,
   *   payment_selection: 'credit_card',
   *   render_duration: { value: 'render_duration', unit: 'ms' },
   * });
   * ```
   */
  setAttributes(t) {
    return this._attributes = {
      ...this._attributes,
      ...t
    }, this._notifyScopeListeners(), this;
  }
  /**
   * Sets an attribute onto the scope.
   *
   * These attributes are currently applied to logs and metrics.
   * In the future, they will also be applied to spans.
   *
   * Important: For now, only strings, numbers and boolean attributes are supported, despite types allowing for
   * more complex attribute types. We'll add this support in the future but already specify the wider type to
   * avoid a breaking change in the future.
   *
   * @param key - The attribute key.
   * @param value - the attribute value. You can either pass in a raw value, or an attribute
   * object with a `value` and an optional `unit` (if applicable to your attribute).
   *
   * @example
   * ```typescript
   * scope.setAttribute('is_admin', true);
   * scope.setAttribute('render_duration', { value: 'render_duration', unit: 'ms' });
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setAttribute(t, r) {
    return this.setAttributes({ [t]: r });
  }
  /**
   * Removes the attribute with the given key from the scope.
   *
   * @param key - The attribute key.
   *
   * @example
   * ```typescript
   * scope.removeAttribute('is_admin');
   * ```
   */
  removeAttribute(t) {
    return t in this._attributes && (delete this._attributes[t], this._notifyScopeListeners()), this;
  }
  /**
   * Set an object that will be merged into existing extra on the scope,
   * and will be sent as extra data with the event.
   */
  setExtras(t) {
    return this._extra = {
      ...this._extra,
      ...t
    }, this._notifyScopeListeners(), this;
  }
  /**
   * Set a single key:value extra entry that will be sent as extra data with the event.
   */
  setExtra(t, r) {
    return this._extra = { ...this._extra, [t]: r }, this._notifyScopeListeners(), this;
  }
  /**
   * Sets the fingerprint on the scope to send with the events.
   * @param {string[]} fingerprint Fingerprint to group events in Sentry.
   */
  setFingerprint(t) {
    return this._fingerprint = t, this._notifyScopeListeners(), this;
  }
  /**
   * Sets the level on the scope for future events.
   */
  setLevel(t) {
    return this._level = t, this._notifyScopeListeners(), this;
  }
  /**
   * Sets the transaction name on the scope so that the name of e.g. taken server route or
   * the page location is attached to future events.
   *
   * IMPORTANT: Calling this function does NOT change the name of the currently active
   * root span. If you want to change the name of the active root span, use
   * `Sentry.updateSpanName(rootSpan, 'new name')` instead.
   *
   * By default, the SDK updates the scope's transaction name automatically on sensible
   * occasions, such as a page navigation or when handling a new request on the server.
   */
  setTransactionName(t) {
    return this._transactionName = t, this._notifyScopeListeners(), this;
  }
  /**
   * Sets context data with the given name.
   * Data passed as context will be normalized. You can also pass `null` to unset the context.
   * Note that context data will not be merged - calling `setContext` will overwrite an existing context with the same key.
   */
  setContext(t, r) {
    return r === null ? delete this._contexts[t] : this._contexts[t] = r, this._notifyScopeListeners(), this;
  }
  /**
   * Set the session for the scope.
   */
  setSession(t) {
    return t ? this._session = t : delete this._session, this._notifyScopeListeners(), this;
  }
  /**
   * Get the session from the scope.
   */
  getSession() {
    return this._session;
  }
  /**
   * Updates the scope with provided data. Can work in three variations:
   * - plain object containing updatable attributes
   * - Scope instance that'll extract the attributes from
   * - callback function that'll receive the current scope as an argument and allow for modifications
   */
  update(t) {
    if (!t)
      return this;
    const r = typeof t == "function" ? t(this) : t, n = r instanceof hr ? r.getScopeData() : Nu(r) ? t : void 0, {
      tags: a,
      attributes: i,
      extra: s,
      user: o,
      contexts: c,
      level: l,
      fingerprint: f = [],
      propagationContext: d,
      conversationId: u
    } = n || {};
    return this._tags = { ...this._tags, ...a }, this._attributes = { ...this._attributes, ...i }, this._extra = { ...this._extra, ...s }, this._contexts = { ...this._contexts, ...c }, o && Object.keys(o).length && (this._user = o), l && (this._level = l), f.length && (this._fingerprint = f), d && (this._propagationContext = d), u && (this._conversationId = u), this;
  }
  /**
   * Clears the current scope and resets its properties.
   * Note: The client will not be cleared.
   */
  clear() {
    return this._breadcrumbs = [], this._tags = {}, this._attributes = {}, this._extra = {}, this._user = {}, this._contexts = {}, this._level = void 0, this._transactionName = void 0, this._fingerprint = void 0, this._session = void 0, this._conversationId = void 0, a0(this, void 0), this._attachments = [], this.setPropagationContext({
      traceId: n0(),
      sampleRand: Hi()
    }), this._notifyScopeListeners(), this;
  }
  /**
   * Adds a breadcrumb to the scope.
   * By default, the last 100 breadcrumbs are kept.
   */
  addBreadcrumb(t, r) {
    var n;
    const a = typeof r == "number" ? r : Ku;
    if (a <= 0)
      return this;
    const i = {
      timestamp: Go(),
      ...t,
      // Breadcrumb messages can theoretically be infinitely large and they're held in memory so we truncate them not to leak (too much) memory
      message: t.message ? Yu(t.message, 2048) : t.message
    };
    return this._breadcrumbs.push(i), this._breadcrumbs.length > a && (this._breadcrumbs = this._breadcrumbs.slice(-a), (n = this._client) == null || n.recordDroppedEvent("buffer_overflow", "log_item")), this._notifyScopeListeners(), this;
  }
  /**
   * Get the last breadcrumb of the scope.
   */
  getLastBreadcrumb() {
    return this._breadcrumbs[this._breadcrumbs.length - 1];
  }
  /**
   * Clear all breadcrumbs from the scope.
   */
  clearBreadcrumbs() {
    return this._breadcrumbs = [], this._notifyScopeListeners(), this;
  }
  /**
   * Add an attachment to the scope.
   */
  addAttachment(t) {
    return this._attachments.push(t), this;
  }
  /**
   * Clear all attachments from the scope.
   */
  clearAttachments() {
    return this._attachments = [], this;
  }
  /**
   * Get the data of this scope, which should be applied to an event during processing.
   */
  getScopeData() {
    return {
      breadcrumbs: this._breadcrumbs,
      attachments: this._attachments,
      contexts: this._contexts,
      tags: this._tags,
      attributes: this._attributes,
      extra: this._extra,
      user: this._user,
      level: this._level,
      fingerprint: this._fingerprint || [],
      eventProcessors: this._eventProcessors,
      propagationContext: this._propagationContext,
      sdkProcessingMetadata: this._sdkProcessingMetadata,
      transactionName: this._transactionName,
      span: i0(this),
      conversationId: this._conversationId
    };
  }
  /**
   * Add data which will be accessible during event processing but won't get sent to Sentry.
   */
  setSDKProcessingMetadata(t) {
    return this._sdkProcessingMetadata = jo(this._sdkProcessingMetadata, t, 2), this;
  }
  /**
   * Add propagation context to the scope, used for distributed tracing
   */
  setPropagationContext(t) {
    return this._propagationContext = t, this;
  }
  /**
   * Get propagation context from the scope, used for distributed tracing
   */
  getPropagationContext() {
    return this._propagationContext;
  }
  /**
   * Capture an exception for this scope.
   *
   * @returns {string} The id of the captured Sentry event.
   */
  captureException(t, r) {
    const n = (r == null ? void 0 : r.event_id) || Ln();
    if (!this._client)
      return Or && Mt.warn("No client configured on scope - will not capture exception!"), n;
    const a = new Error("Sentry syntheticException");
    return this._client.captureException(
      t,
      {
        originalException: t,
        syntheticException: a,
        ...r,
        event_id: n
      },
      this
    ), n;
  }
  /**
   * Capture a message for this scope.
   *
   * @returns {string} The id of the captured message.
   */
  captureMessage(t, r, n) {
    const a = (n == null ? void 0 : n.event_id) || Ln();
    if (!this._client)
      return Or && Mt.warn("No client configured on scope - will not capture message!"), a;
    const i = (n == null ? void 0 : n.syntheticException) ?? new Error(t);
    return this._client.captureMessage(
      t,
      r,
      {
        originalException: t,
        syntheticException: i,
        ...n,
        event_id: a
      },
      this
    ), a;
  }
  /**
   * Capture a Sentry event for this scope.
   *
   * @returns {string} The id of the captured event.
   */
  captureEvent(t, r) {
    const n = t.event_id || (r == null ? void 0 : r.event_id) || Ln();
    return this._client ? (this._client.captureEvent(t, { ...r, event_id: n }, this), n) : (Or && Mt.warn("No client configured on scope - will not capture event!"), n);
  }
  /**
   * This will be called on every set call.
   */
  _notifyScopeListeners() {
    this._notifyingListeners || (this._notifyingListeners = !0, this._scopeListeners.forEach((t) => {
      t(this);
    }), this._notifyingListeners = !1);
  }
}
function Ju() {
  return ts("defaultCurrentScope", () => new hr());
}
function Qu() {
  return ts("defaultIsolationScope", () => new hr());
}
const s0 = (e) => e instanceof Promise && !e[Xo], Xo = Symbol("chained PromiseLike"), qu = (e, t, r) => {
  const n = e.then(
    (a) => (t(a), a),
    (a) => {
      throw r(a), a;
    }
  );
  return s0(n) && s0(e) ? n : Zu(e, n);
}, Zu = (e, t) => {
  let r = !1;
  for (const n in e) {
    if (n in t) continue;
    r = !0;
    const a = e[n];
    typeof a == "function" ? Object.defineProperty(t, n, {
      value: (...i) => a.apply(e, i),
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[n] = a;
  }
  return r && Object.assign(t, { [Xo]: !0 }), t;
};
class eh {
  constructor(t, r) {
    let n;
    t ? n = t : n = new hr();
    let a;
    r ? a = r : a = new hr(), this._stack = [{ scope: n }], this._isolationScope = a;
  }
  /**
   * Fork a scope for the stack.
   */
  withScope(t) {
    const r = this._pushScope();
    let n;
    try {
      n = t(r);
    } catch (a) {
      throw this._popScope(), a;
    }
    return Du(n) ? qu(
      n,
      () => this._popScope(),
      () => this._popScope()
    ) : (this._popScope(), n);
  }
  /**
   * Get the client of the stack.
   */
  getClient() {
    return this.getStackTop().client;
  }
  /**
   * Returns the scope of the top stack.
   */
  getScope() {
    return this.getStackTop().scope;
  }
  /**
   * Get the isolation scope for the stack.
   */
  getIsolationScope() {
    return this._isolationScope;
  }
  /**
   * Returns the topmost scope layer in the order domain > local > process.
   */
  getStackTop() {
    return this._stack[this._stack.length - 1];
  }
  /**
   * Push a scope to the stack.
   */
  _pushScope() {
    const t = this.getScope().clone();
    return this._stack.push({
      client: this.getClient(),
      scope: t
    }), t;
  }
  /**
   * Pop a scope from the stack.
   */
  _popScope() {
    return this._stack.length <= 1 ? !1 : !!this._stack.pop();
  }
}
function un() {
  const e = Ha(), t = es(e);
  return t.stack = t.stack || new eh(Ju(), Qu());
}
function th(e) {
  return un().withScope(e);
}
function rh(e, t) {
  const r = un();
  return r.withScope(() => (r.getStackTop().scope = e, t(e)));
}
function o0(e) {
  return un().withScope(() => e(un().getIsolationScope()));
}
function nh() {
  return {
    withIsolationScope: o0,
    withScope: th,
    withSetScope: rh,
    withSetIsolationScope: (e, t) => o0(t),
    getCurrentScope: () => un().getScope(),
    getIsolationScope: () => un().getIsolationScope()
  };
}
function as(e) {
  const t = es(e);
  return t.acs ? t.acs : nh();
}
function is() {
  const e = Ha();
  return as(e).getCurrentScope();
}
function ah() {
  const e = Ha();
  return as(e).getIsolationScope();
}
function Yo(...e) {
  const t = Ha(), r = as(t);
  if (e.length === 2) {
    const [n, a] = e;
    return n ? r.withSetScope(n, a) : r.withScope(a);
  }
  return r.withScope(e[0]);
}
function Ko() {
  return is().getClient();
}
function ih(e) {
  if (e)
    return sh(e) ? { captureContext: e } : lh(e) ? {
      captureContext: e
    } : e;
}
function sh(e) {
  return e instanceof hr || typeof e == "function";
}
const oh = [
  "user",
  "level",
  "extra",
  "contexts",
  "tags",
  "fingerprint",
  "propagationContext"
];
function lh(e) {
  return Object.keys(e).some((t) => oh.includes(t));
}
function ch(e, t) {
  return is().captureException(e, ih(t));
}
function fh() {
  return ah().lastEventId();
}
const uh = window.React.version;
function hh(e) {
  const t = e.match(/^([^.]+)/);
  return t !== null && parseInt(t[0]) >= 17;
}
function dh(e, t) {
  const r = /* @__PURE__ */ new WeakSet();
  function n(a, i) {
    if (!r.has(a)) {
      if (a.cause)
        return r.add(a), n(a.cause, i);
      a.cause = i;
    }
  }
  n(e, t);
}
function xh(e, { componentStack: t }, r) {
  if (hh(uh) && Ou(e) && t) {
    const n = new Error(e.message);
    n.name = `React ErrorBoundary ${e.name}`, n.stack = t, dh(e, n);
  }
  return Yo((n) => (n.setContext("react", { componentStack: t }), ch(e, r)));
}
const l0 = typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__, ca = $t, ph = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)((?:\[[:.%\w]+\]|[\w.-]+))(?::(\d+))?\/(.+)/;
function mh(e) {
  return e === "http" || e === "https";
}
function _h(e, t = !1) {
  const { host: r, path: n, pass: a, port: i, projectId: s, protocol: o, publicKey: c } = e;
  return `${o}://${c}${t && a ? `:${a}` : ""}@${r}${i ? `:${i}` : ""}/${n && `${n}/`}${s}`;
}
function vh(e) {
  const t = ph.exec(e);
  if (!t) {
    Vo(() => {
      console.error(`Invalid Sentry Dsn: ${e}`);
    });
    return;
  }
  const [r, n, a = "", i = "", s = "", o = ""] = t.slice(1);
  let c = "", l = o;
  const f = l.split("/");
  if (f.length > 1 && (c = f.slice(0, -1).join("/"), l = f.pop()), l) {
    const d = l.match(/^\d+/);
    d && (l = d[0]);
  }
  return Jo({ host: i, pass: a, path: c, projectId: l, port: s, protocol: r, publicKey: n });
}
function Jo(e) {
  return {
    protocol: e.protocol,
    publicKey: e.publicKey || "",
    pass: e.pass || "",
    host: e.host,
    port: e.port || "",
    path: e.path || "",
    projectId: e.projectId
  };
}
function gh(e) {
  if (!Or)
    return !0;
  const { port: t, projectId: r, protocol: n } = e;
  return ["protocol", "publicKey", "host", "projectId"].find((s) => e[s] ? !1 : (Mt.error(`Invalid Sentry Dsn: ${s} missing`), !0)) ? !1 : r.match(/^\d+$/) ? mh(n) ? t && isNaN(parseInt(t, 10)) ? (Mt.error(`Invalid Sentry Dsn: Invalid port ${t}`), !1) : !0 : (Mt.error(`Invalid Sentry Dsn: Invalid protocol ${n}`), !1) : (Mt.error(`Invalid Sentry Dsn: Invalid projectId ${r}`), !1);
}
function wh(e) {
  const t = typeof e == "string" ? vh(e) : Jo(e);
  if (!(!t || !gh(t)))
    return t;
}
function Eh(e) {
  const t = e.protocol ? `${e.protocol}:` : "", r = e.port ? `:${e.port}` : "";
  return `${t}//${e.host}${r}${e.path ? `/${e.path}` : ""}/api/`;
}
function Th(e, t) {
  const r = wh(e);
  if (!r)
    return "";
  const n = `${Eh(r)}embed/error-page/`;
  let a = `dsn=${_h(r)}`;
  for (const i in t)
    if (i !== "dsn" && i !== "onClose")
      if (i === "user") {
        const s = t.user;
        if (!s)
          continue;
        s.name && (a += `&name=${encodeURIComponent(s.name)}`), s.email && (a += `&email=${encodeURIComponent(s.email)}`);
      } else
        a += `&${encodeURIComponent(i)}=${encodeURIComponent(t[i])}`;
  return `${n}?${a}`;
}
function c0(e = {}) {
  const t = ca.document, r = (t == null ? void 0 : t.head) || (t == null ? void 0 : t.body);
  if (!r) {
    l0 && Mt.error("[showReportDialog] Global document not defined");
    return;
  }
  const n = is(), a = Ko(), i = a == null ? void 0 : a.getDsn();
  if (!i) {
    l0 && Mt.error("[showReportDialog] DSN not configured");
    return;
  }
  const s = {
    ...e,
    user: {
      ...n.getUser(),
      ...e.user
    },
    eventId: e.eventId || fh()
  }, o = ca.document.createElement("script");
  o.async = !0, o.crossOrigin = "anonymous", o.src = Th(i, s);
  const { onLoad: c, onClose: l } = s;
  if (c && (o.onload = c), l) {
    const f = (d) => {
      if (d.data === "__sentry_reportdialog_closed__")
        try {
          l();
        } finally {
          ca.removeEventListener("message", f);
        }
    };
    ca.addEventListener("message", f);
  }
  r.appendChild(o);
}
const ci = window.React, fi = {
  componentStack: null,
  error: null,
  eventId: null
};
class W2 extends ci.Component {
  constructor(t) {
    super(t), this.state = fi, this._openFallbackReportDialog = !0;
    const r = Ko();
    r && t.showDialog && (this._openFallbackReportDialog = !1, this._cleanupHook = r.on("afterSendEvent", (n) => {
      !n.type && this._lastEventId && n.event_id === this._lastEventId && c0({ ...t.dialogOptions, eventId: this._lastEventId });
    }));
  }
  componentDidCatch(t, r) {
    const { componentStack: n } = r, { beforeCapture: a, onError: i, showDialog: s, dialogOptions: o } = this.props;
    Yo((c) => {
      a && a(c, t, n);
      const l = this.props.handled != null ? this.props.handled : !!this.props.fallback, f = xh(t, r, {
        mechanism: { handled: l, type: "auto.function.react.error_boundary" }
      });
      i && i(t, n, f), s && (this._lastEventId = f, this._openFallbackReportDialog && c0({ ...o, eventId: f })), this.setState({ error: t, componentStack: n, eventId: f });
    });
  }
  componentDidMount() {
    const { onMount: t } = this.props;
    t && t();
  }
  componentWillUnmount() {
    const { error: t, componentStack: r, eventId: n } = this.state, { onUnmount: a } = this.props;
    a && (this.state === fi ? a(null, null, null) : a(t, r, n)), this._cleanupHook && (this._cleanupHook(), this._cleanupHook = void 0);
  }
  resetErrorBoundary() {
    const { onReset: t } = this.props, { error: r, componentStack: n, eventId: a } = this.state;
    t && t(r, n, a), this.setState(fi);
  }
  render() {
    const { fallback: t, children: r } = this.props, n = this.state;
    if (n.componentStack === null)
      return typeof r == "function" ? r() : r;
    const a = typeof t == "function" ? ci.createElement(t, {
      error: n.error,
      componentStack: n.componentStack,
      resetError: () => this.resetErrorBoundary(),
      eventId: n.eventId
    }) : t;
    return ci.isValidElement(a) ? a : (t && Ru && Mt.warn("fallback did not produce a valid ReactElement"), null);
  }
}
/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sh = [["path", { d: "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", key: "svg-0" }], ["path", { d: "M12 9v4", key: "svg-1" }], ["path", { d: "M12 16v.01", key: "svg-2" }]];
pt("outline", "exclamation-circle", "ExclamationCircle", Sh);
window.LinguiCore.i18n;
window.MantineCore.Alert;
window.MantineCore.Stack;
window.MantineCore.Text;
window.React.useCallback;
window.MantineCore.ActionIcon;
window.MantineCore.Menu;
window.MantineCore.Tooltip;
/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yh = [["path", { d: "M5 12l5 5l10 -10", key: "svg-0" }]];
pt("outline", "check", "Check", yh);
/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ch = [["path", { d: "M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666", key: "svg-0" }], ["path", { d: "M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1", key: "svg-1" }]];
pt("outline", "copy", "Copy", Ch);
window.LinguiCore.i18n;
window.MantineCore.ActionIcon;
window.MantineCore.Button;
window.MantineCore.CopyButton;
window.MantineCore.Text;
window.MantineCore.Tooltip;
window.MantineCore.Group;
window.React.useState;
window.MantineCore.Group;
window.MantineCore.Progress;
window.MantineCore.Stack;
window.MantineCore.Text;
window.React.useMemo;
window.LinguiCore.i18n;
window.MantineCore.Badge;
window.MantineCore.Skeleton;
window.React.useCallback;
window.React.useEffect;
window.React.useRef;
window.React.useState;
/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fh = [["path", { d: "M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", key: "svg-0" }], ["path", { d: "M21 21l-6 -6", key: "svg-1" }]];
pt("outline", "search", "Search", Fh);
window.LinguiCore.i18n;
window.MantineCore.CloseButton;
window.MantineCore.TextInput;
window.React.useEffect;
window.React.useState;
/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kh = [["path", { d: "M4 10a2 2 0 1 0 4 0a2 2 0 0 0 -4 0", key: "svg-0" }], ["path", { d: "M6 4v4", key: "svg-1" }], ["path", { d: "M6 12v8", key: "svg-2" }], ["path", { d: "M10 16a2 2 0 1 0 4 0a2 2 0 0 0 -4 0", key: "svg-3" }], ["path", { d: "M12 4v10", key: "svg-4" }], ["path", { d: "M12 18v2", key: "svg-5" }], ["path", { d: "M16 7a2 2 0 1 0 4 0a2 2 0 0 0 -4 0", key: "svg-6" }], ["path", { d: "M18 4v1", key: "svg-7" }], ["path", { d: "M18 9v11", key: "svg-8" }]];
pt("outline", "adjustments", "Adjustments", kh);
window.LinguiCore.i18n;
window.MantineCore.ActionIcon;
window.MantineCore.Checkbox;
window.MantineCore.Divider;
window.MantineCore.Menu;
window.MantineCore.Tooltip;
/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ah = [["path", { d: "M6.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-0" }], ["path", { d: "M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3", key: "svg-1" }]];
pt("outline", "tag", "Tag", Ah);
window.MantineCore.ActionIcon;
window.MantineCore.Badge;
window.MantineCore.Group;
window.MantineCore.Paper;
window.MantineCore.Alert;
/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rh = [["path", { d: "M4 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-0" }], ["path", { d: "M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-1" }], ["path", { d: "M18 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-2" }]];
pt("outline", "dots", "Dots", Rh);
/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oh = [["path", { d: "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", key: "svg-0" }], ["path", { d: "M10 10l4 4m0 -4l-4 4", key: "svg-1" }]];
pt("outline", "circle-x", "CircleX", Oh);
/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ih = [["path", { d: "M4 7l16 0", key: "svg-0" }], ["path", { d: "M10 11l0 6", key: "svg-1" }], ["path", { d: "M14 11l0 6", key: "svg-2" }], ["path", { d: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12", key: "svg-3" }], ["path", { d: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3", key: "svg-4" }]];
pt("outline", "trash", "Trash", Ih);
/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nh = [["path", { d: "M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1", key: "svg-0" }], ["path", { d: "M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415", key: "svg-1" }], ["path", { d: "M16 5l3 3", key: "svg-2" }]];
pt("outline", "edit", "Edit", Nh);
/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dh = [["path", { d: "M5 12l14 0", key: "svg-0" }], ["path", { d: "M13 18l6 -6", key: "svg-1" }], ["path", { d: "M13 6l6 6", key: "svg-2" }]];
pt("outline", "arrow-right", "ArrowRight", Dh);
window.LinguiCore.i18n;
window.MantineCore.ActionIcon;
window.MantineCore.Menu;
window.MantineCore.Tooltip;
window.React.useMemo;
window.React.useState;
window.React.useEffect;
window.React.useState;
var Qo = class {
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
}, qo = (e) => {
  throw TypeError(e);
}, Zo = (e, t, r) => t.has(e) || qo("Cannot " + r), wr = (e, t, r) => (Zo(e, t, "read from private field"), r ? r.call(e) : t.get(e)), ui = (e, t, r) => t.has(e) ? qo("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), Tn = (e, t, r, n) => (Zo(e, t, "write to private field"), t.set(e, r), r), Hr, Er, Sn, f0, Mh = (f0 = class extends Qo {
  constructor() {
    super(), ui(this, Hr), ui(this, Er), ui(this, Sn), Tn(this, Sn, (e) => {
      if (typeof window < "u" && window.addEventListener) {
        const t = () => e();
        return window.addEventListener("visibilitychange", t, !1), () => {
          window.removeEventListener("visibilitychange", t);
        };
      }
    });
  }
  onSubscribe() {
    wr(this, Er) || this.setEventListener(wr(this, Sn));
  }
  onUnsubscribe() {
    var e;
    this.hasListeners() || ((e = wr(this, Er)) == null || e.call(this), Tn(this, Er, void 0));
  }
  setEventListener(e) {
    var t;
    Tn(this, Sn, e), (t = wr(this, Er)) == null || t.call(this), Tn(this, Er, e((r) => {
      typeof r == "boolean" ? this.setFocused(r) : this.onFocus();
    }));
  }
  setFocused(e) {
    wr(this, Hr) !== e && (Tn(this, Hr, e), this.onFocus());
  }
  onFocus() {
    const e = this.isFocused();
    this.listeners.forEach((t) => {
      t(e);
    });
  }
  isFocused() {
    var e;
    return typeof wr(this, Hr) == "boolean" ? wr(this, Hr) : ((e = globalThis.document) == null ? void 0 : e.visibilityState) !== "hidden";
  }
}, Hr = /* @__PURE__ */ new WeakMap(), Er = /* @__PURE__ */ new WeakMap(), Sn = /* @__PURE__ */ new WeakMap(), f0);
new Mh();
var el = (e) => {
  throw TypeError(e);
}, tl = (e, t, r) => t.has(e) || el("Cannot " + r), fa = (e, t, r) => (tl(e, t, "read from private field"), r ? r.call(e) : t.get(e)), u0 = (e, t, r) => t.has(e) ? el("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), Ph = (e, t, r, n) => (tl(e, t, "write to private field"), t.set(e, r), r), Tr, h0, d0, Lh = {
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
}, bh = (d0 = class {
  constructor() {
    u0(this, Tr, Lh), u0(this, h0, !1);
  }
  setTimeoutProvider(e) {
    Ph(this, Tr, e);
  }
  setTimeout(e, t) {
    return fa(this, Tr).setTimeout(e, t);
  }
  clearTimeout(e) {
    fa(this, Tr).clearTimeout(e);
  }
  setInterval(e, t) {
    return fa(this, Tr).setInterval(e, t);
  }
  clearInterval(e) {
    fa(this, Tr).clearInterval(e);
  }
}, Tr = /* @__PURE__ */ new WeakMap(), h0 = /* @__PURE__ */ new WeakMap(), d0);
new bh();
var rl = (e) => {
  throw TypeError(e);
}, nl = (e, t, r) => t.has(e) || rl("Cannot " + r), Gr = (e, t, r) => (nl(e, t, "read from private field"), r ? r.call(e) : t.get(e)), hi = (e, t, r) => t.has(e) ? rl("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), yn = (e, t, r, n) => (nl(e, t, "write to private field"), t.set(e, r), r), Cn, Sr, Fn, x0, Bh = (x0 = class extends Qo {
  constructor() {
    super(), hi(this, Cn, !0), hi(this, Sr), hi(this, Fn), yn(this, Fn, (e) => {
      if (typeof window < "u" && window.addEventListener) {
        const t = () => e(!0), r = () => e(!1);
        return window.addEventListener("online", t, !1), window.addEventListener("offline", r, !1), () => {
          window.removeEventListener("online", t), window.removeEventListener("offline", r);
        };
      }
    });
  }
  onSubscribe() {
    Gr(this, Sr) || this.setEventListener(Gr(this, Fn));
  }
  onUnsubscribe() {
    var e;
    this.hasListeners() || ((e = Gr(this, Sr)) == null || e.call(this), yn(this, Sr, void 0));
  }
  setEventListener(e) {
    var t;
    yn(this, Fn, e), (t = Gr(this, Sr)) == null || t.call(this), yn(this, Sr, e(this.setOnline.bind(this)));
  }
  setOnline(e) {
    Gr(this, Cn) !== e && (yn(this, Cn, e), this.listeners.forEach((r) => {
      r(e);
    }));
  }
  isOnline() {
    return Gr(this, Cn);
  }
}, Cn = /* @__PURE__ */ new WeakMap(), Sr = /* @__PURE__ */ new WeakMap(), Fn = /* @__PURE__ */ new WeakMap(), x0);
new Bh();
const Uh = window.React;
Uh.createContext(
  void 0
);
const Wh = window.React;
function $h() {
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
Wh.createContext($h());
const Hh = window.React;
var Gh = Hh.createContext(!1);
Gh.Provider;
/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vh = [["path", { d: "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", key: "svg-0" }], ["path", { d: "M9 12l2 2l4 -4", key: "svg-1" }]];
pt("outline", "circle-check", "CircleCheck", Vh);
window.LinguiCore.i18n;
window.MantineNotifications.notifications;
window.MantineNotifications.showNotification;
window.React.useEffect;
window.React.useState;
window.MantineNotifications.notifications;
window.MantineNotifications.showNotification;
window.React.useEffect;
window.React.useState;
window.React.useEffect;
window.React.useEffectEvent;
window.React.useCallback;
window.React.useEffect;
window.React.useState;
window.React.useCallback;
window.React.useEffect;
window.React.useMemo;
window.React.useCallback;
window.React.useMemo;
window.React.useState;
/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var p0;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(p0 || (p0 = {}));
var m0;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(m0 || (m0 = {}));
class zh extends Error {
}
const al = ["post", "put", "patch", "delete"];
new Set(al);
const jh = ["get", ...al];
new Set(jh);
/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
const Wt = window.React, _0 = /* @__PURE__ */ Wt.createContext(null), Xh = /* @__PURE__ */ Wt.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
}), Yh = /* @__PURE__ */ Wt.createContext(null);
class $2 extends Wt.Component {
  constructor(t) {
    super(t), this.state = {
      location: t.location,
      revalidation: t.revalidation,
      error: t.error
    };
  }
  static getDerivedStateFromError(t) {
    return {
      error: t
    };
  }
  static getDerivedStateFromProps(t, r) {
    return r.location !== t.location || r.revalidation !== "idle" && t.revalidation === "idle" ? {
      error: t.error,
      location: t.location,
      revalidation: t.revalidation
    } : {
      error: t.error !== void 0 ? t.error : r.error,
      location: r.location,
      revalidation: t.revalidation || r.revalidation
    };
  }
  componentDidCatch(t, r) {
    console.error("React Router caught the following error during render", t, r);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ Wt.createElement(Xh.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ Wt.createElement(Yh.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
const Kh = "startTransition";
Wt[Kh];
var Ct = /* @__PURE__ */ (function(e) {
  return e[e.pending = 0] = "pending", e[e.success = 1] = "success", e[e.error = 2] = "error", e;
})(Ct || {});
const Jh = new Promise(() => {
});
class H2 extends Wt.Component {
  constructor(t) {
    super(t), this.state = {
      error: null
    };
  }
  static getDerivedStateFromError(t) {
    return {
      error: t
    };
  }
  componentDidCatch(t, r) {
    console.error("<Await> caught the following error during render", t, r);
  }
  render() {
    let {
      children: t,
      errorElement: r,
      resolve: n
    } = this.props, a = null, i = Ct.pending;
    if (!(n instanceof Promise))
      i = Ct.success, a = Promise.resolve(), Object.defineProperty(a, "_tracked", {
        get: () => !0
      }), Object.defineProperty(a, "_data", {
        get: () => n
      });
    else if (this.state.error) {
      i = Ct.error;
      let s = this.state.error;
      a = Promise.reject().catch(() => {
      }), Object.defineProperty(a, "_tracked", {
        get: () => !0
      }), Object.defineProperty(a, "_error", {
        get: () => s
      });
    } else n._tracked ? (a = n, i = "_error" in a ? Ct.error : "_data" in a ? Ct.success : Ct.pending) : (i = Ct.pending, Object.defineProperty(n, "_tracked", {
      get: () => !0
    }), a = n.then((s) => Object.defineProperty(n, "_data", {
      get: () => s
    }), (s) => Object.defineProperty(n, "_error", {
      get: () => s
    })));
    if (i === Ct.error && a._error instanceof zh)
      throw Jh;
    if (i === Ct.error && !r)
      throw a._error;
    if (i === Ct.error)
      return /* @__PURE__ */ Wt.createElement(_0.Provider, {
        value: a,
        children: r
      });
    if (i === Ct.success)
      return /* @__PURE__ */ Wt.createElement(_0.Provider, {
        value: a,
        children: t
      });
    throw a;
  }
}
/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
const il = window.React, Qh = window.ReactDOM, qh = "6";
try {
  window.__reactRouterVersion = qh;
} catch {
}
const Zh = "startTransition";
il[Zh];
const e1 = "flushSync";
Qh[e1];
const t1 = "useId";
il[t1];
var v0;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
})(v0 || (v0 = {}));
var g0;
(function(e) {
  e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(g0 || (g0 = {}));
function r1(e, t) {
  let r;
  try {
    r = e();
  } catch {
    return;
  }
  return {
    getItem: (a) => {
      var i;
      const s = (c) => c === null ? null : JSON.parse(c, void 0), o = (i = r.getItem(a)) != null ? i : null;
      return o instanceof Promise ? o.then(s) : s(o);
    },
    setItem: (a, i) => r.setItem(a, JSON.stringify(i, void 0)),
    removeItem: (a) => r.removeItem(a)
  };
}
const Vi = (e) => (t) => {
  try {
    const r = e(t);
    return r instanceof Promise ? r : {
      then(n) {
        return Vi(n)(r);
      },
      catch(n) {
        return this;
      }
    };
  } catch (r) {
    return {
      then(n) {
        return this;
      },
      catch(n) {
        return Vi(n)(r);
      }
    };
  }
}, n1 = (e, t) => (r, n, a) => {
  let i = {
    storage: r1(() => window.localStorage),
    partialize: (_) => _,
    version: 0,
    merge: (_, F) => ({
      ...F,
      ..._
    }),
    ...t
  }, s = !1, o = 0;
  const c = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set();
  let f = i.storage;
  if (!f)
    return e(
      (..._) => {
        console.warn(
          `[zustand persist middleware] Unable to update item '${i.name}', the given storage is currently unavailable.`
        ), r(..._);
      },
      n,
      a
    );
  const d = () => {
    const _ = i.partialize({ ...n() });
    return f.setItem(i.name, {
      state: _,
      version: i.version
    });
  }, u = a.setState;
  a.setState = (_, F) => (u(_, F), d());
  const h = e(
    (..._) => (r(..._), d()),
    n,
    a
  );
  a.getInitialState = () => h;
  let m;
  const x = () => {
    var _, F;
    if (!f) return;
    const A = ++o;
    s = !1, c.forEach((O) => {
      var j;
      return O((j = n()) != null ? j : h);
    });
    const y = ((F = i.onRehydrateStorage) == null ? void 0 : F.call(i, (_ = n()) != null ? _ : h)) || void 0;
    return Vi(f.getItem.bind(f))(i.name).then((O) => {
      if (O)
        if (typeof O.version == "number" && O.version !== i.version) {
          if (i.migrate) {
            const j = i.migrate(
              O.state,
              O.version
            );
            return j instanceof Promise ? j.then((Z) => [!0, Z]) : [!0, j];
          }
          console.error(
            "State loaded from storage couldn't be migrated since no migrate function was provided"
          );
        } else
          return [!1, O.state];
      return [!1, void 0];
    }).then((O) => {
      var j;
      if (A !== o)
        return;
      const [Z, R] = O;
      if (m = i.merge(
        R,
        (j = n()) != null ? j : h
      ), r(m, !0), Z)
        return d();
    }).then(() => {
      A === o && (y == null || y(n(), void 0), m = n(), s = !0, l.forEach((O) => O(m)));
    }).catch((O) => {
      A === o && (y == null || y(void 0, O));
    });
  };
  return a.persist = {
    setOptions: (_) => {
      i = {
        ...i,
        ..._
      }, _.storage && (f = _.storage);
    },
    clearStorage: () => {
      f == null || f.removeItem(i.name);
    },
    getOptions: () => i,
    rehydrate: () => x(),
    hasHydrated: () => s,
    onHydrate: (_) => (c.add(_), () => {
      c.delete(_);
    }),
    onFinishHydration: (_) => (l.add(_), () => {
      l.delete(_);
    })
  }, i.skipHydration || x(), m || h;
}, sl = n1, w0 = (e) => {
  let t;
  const r = /* @__PURE__ */ new Set(), n = (l, f) => {
    const d = typeof l == "function" ? l(t) : l;
    if (!Object.is(d, t)) {
      const u = t;
      t = f ?? (typeof d != "object" || d === null) ? d : Object.assign({}, t, d), r.forEach((h) => h(t, u));
    }
  }, a = () => t, o = { setState: n, getState: a, getInitialState: () => c, subscribe: (l) => (r.add(l), () => r.delete(l)) }, c = t = e(n, a, o);
  return o;
}, a1 = ((e) => e ? w0(e) : w0), ua = window.React, i1 = (e) => e;
function s1(e, t = i1) {
  const r = ua.useSyncExternalStore(
    e.subscribe,
    ua.useCallback(() => t(e.getState()), [e, t]),
    ua.useCallback(() => t(e.getInitialState()), [e, t])
  );
  return ua.useDebugValue(r), r;
}
const o1 = (e) => {
  const t = a1(e), r = (n) => s1(t, n);
  return Object.assign(r, t), r;
}, ol = ((e) => o1);
ol()(sl((e, t) => ({
  detailDrawerStack: 0,
  addDetailDrawer: (r) => {
    e({
      detailDrawerStack: r === !1 ? 0 : t().detailDrawerStack + r
    });
  }
}), {
  name: "session-settings-inventreedb_lib"
}));
window.MantineCore.Text;
window.MantineCore.darken;
window.MantineCore.getThemeColor;
window.MantineCore.useMantineTheme;
window.React.useMemo;
/**
 * @license @tabler/icons-react v3.40.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const l1 = [["path", { d: "M15 6l-6 6l6 6", key: "svg-0" }]];
pt("outline", "chevron-left", "ChevronLeft", l1);
window.MantineCore.ActionIcon;
window.MantineCore.Divider;
window.MantineCore.Drawer;
window.MantineCore.Group;
window.MantineCore.Stack;
window.MantineCore.Text;
window.React.useCallback;
window.React.useMemo;
const c1 = 25;
ol()(sl((e, t) => ({
  pageSize: c1,
  setPageSize: (r) => {
    e((n) => ({
      pageSize: r
    }));
  },
  tableSorting: {},
  getTableSorting: (r) => t().tableSorting[r] || {},
  setTableSorting: (r) => (n) => {
    e({
      tableSorting: {
        ...t().tableSorting,
        [r]: n
      }
    });
  },
  tableColumnNames: {},
  getTableColumnNames: (r) => t().tableColumnNames[r] || null,
  setTableColumnNames: (r) => (n) => {
    e({
      tableColumnNames: {
        ...t().tableColumnNames,
        [r]: n
      }
    });
  },
  clearTableColumnNames: () => {
    e({
      tableColumnNames: {}
    });
  },
  hiddenColumns: {},
  getHiddenColumns: (r) => {
    var n;
    return ((n = t().hiddenColumns) == null ? void 0 : n[r]) ?? null;
  },
  setHiddenColumns: (r) => (n) => {
    e({
      hiddenColumns: {
        ...t().hiddenColumns,
        [r]: n
      }
    });
  }
}), {
  name: "inventree-table-state"
}));
window.LinguiReact.I18nProvider;
window.MantineCore.Skeleton;
window.React.useEffect;
window.React.useState;
const E0 = window.React, f1 = window.LinguiReact.I18nProvider, T0 = window.LinguiCore.i18n;
function u1({
  locale: e,
  children: t
}) {
  return E0.useEffect(() => {
    T0.activate(e);
  }, [e]), /* @__PURE__ */ E0.createElement(f1, { i18n: T0 }, t);
}
function ll(e) {
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
function h1(e, t = !1) {
  if (t && e.quantity_at_location !== void 0)
    return {
      stock: e.quantity_at_location,
      min: null,
      showMin: !1
    };
  const r = e.total_stock ?? 0, n = e.minimum_stock ?? 0;
  return {
    stock: r,
    min: n > 0 ? n : null,
    showMin: n > 0
  };
}
function cl(e) {
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
function ss(e) {
  let t = e.parts ? e.parts.length : 0;
  if (e.children)
    for (const r of e.children)
      t += ss(r);
  return t;
}
function S0(e, t) {
  const r = [];
  function n(a, i) {
    for (const s of a)
      r.push(`${t}-${s.id ?? "none"}-${i}`), s.children && s.children.length > 0 && n(s.children, i + 1);
  }
  return n(e, 0), r;
}
function d1(e, t) {
  if (!t) return e;
  const r = t.toLowerCase();
  function n(a) {
    const i = a.parts.filter(
      (o) => {
        var c, l;
        return o.name.toLowerCase().includes(r) || ((c = o.IPN) == null ? void 0 : c.toLowerCase().includes(r)) || ((l = o.description) == null ? void 0 : l.toLowerCase().includes(r));
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
function fl(e, t) {
  if (!t) return e;
  const r = t.toLowerCase();
  return e.filter(
    (n) => {
      var a, i, s, o;
      return n.name.toLowerCase().includes(r) || ((a = n.IPN) == null ? void 0 : a.toLowerCase().includes(r)) || ((i = n.description) == null ? void 0 : i.toLowerCase().includes(r)) || ((s = n.category_name) == null ? void 0 : s.toLowerCase().includes(r)) || ((o = n.category_path) == null ? void 0 : o.toLowerCase().includes(r));
    }
  );
}
function ul(e) {
  return e.filter((t) => t.is_low_stock || (t.total_stock ?? 0) <= 0);
}
function x1(e) {
  function t(r) {
    const n = r.parts.filter(
      (i) => i.is_low_stock || (i.total_stock ?? 0) <= 0
    ), a = r.children.map(t).filter((i) => i !== null);
    return n.length > 0 || a.length > 0 ? {
      ...r,
      parts: n,
      children: a
    } : null;
  }
  return e.map(t).filter((r) => r !== null);
}
function hl(e) {
  return e.filter((t) => t.has_needs_check === !0);
}
function p1(e) {
  function t(r) {
    const n = r.parts.filter(
      (i) => i.has_needs_check === !0
    ), a = r.children.map(t).filter((i) => i !== null);
    return n.length > 0 || a.length > 0 ? {
      ...r,
      parts: n,
      children: a
    } : null;
  }
  return e.map(t).filter((r) => r !== null);
}
/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var ka = {};
ka.version = "0.18.5";
var dl = 1252, m1 = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4], xl = function(e) {
  m1.indexOf(e) != -1 && (dl = e);
};
function _1() {
  xl(1252);
}
var Gn = function(e) {
  xl(e);
};
function v1() {
  Gn(1200), _1();
}
var ha = function(t) {
  return String.fromCharCode(t);
}, y0 = function(t) {
  return String.fromCharCode(t);
}, Aa, fr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function Vn(e) {
  for (var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, o = 0, c = 0, l = 0; l < e.length; )
    r = e.charCodeAt(l++), i = r >> 2, n = e.charCodeAt(l++), s = (r & 3) << 4 | n >> 4, a = e.charCodeAt(l++), o = (n & 15) << 2 | a >> 6, c = a & 63, isNaN(n) ? o = c = 64 : isNaN(a) && (c = 64), t += fr.charAt(i) + fr.charAt(s) + fr.charAt(o) + fr.charAt(c);
  return t;
}
function Jt(e) {
  var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, o = 0, c = 0;
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var l = 0; l < e.length; )
    i = fr.indexOf(e.charAt(l++)), s = fr.indexOf(e.charAt(l++)), r = i << 2 | s >> 4, t += String.fromCharCode(r), o = fr.indexOf(e.charAt(l++)), n = (s & 15) << 4 | o >> 2, o !== 64 && (t += String.fromCharCode(n)), c = fr.indexOf(e.charAt(l++)), a = (o & 3) << 6 | c, c !== 64 && (t += String.fromCharCode(a));
  return t;
}
var we = /* @__PURE__ */ (function() {
  return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
})(), qt = /* @__PURE__ */ (function() {
  if (typeof Buffer < "u") {
    var e = !Buffer.from;
    if (!e) try {
      Buffer.from("foo", "utf8");
    } catch {
      e = !0;
    }
    return e ? function(t, r) {
      return r ? new Buffer(t, r) : new Buffer(t);
    } : Buffer.from.bind(Buffer);
  }
  return function() {
  };
})();
function Nr(e) {
  return we ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
function C0(e) {
  return we ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
var Dt = function(t) {
  return we ? qt(t, "binary") : t.split("").map(function(r) {
    return r.charCodeAt(0) & 255;
  });
};
function Va(e) {
  if (typeof ArrayBuffer > "u") return Dt(e);
  for (var t = new ArrayBuffer(e.length), r = new Uint8Array(t), n = 0; n != e.length; ++n) r[n] = e.charCodeAt(n) & 255;
  return t;
}
function qn(e) {
  if (Array.isArray(e)) return e.map(function(n) {
    return String.fromCharCode(n);
  }).join("");
  for (var t = [], r = 0; r < e.length; ++r) t[r] = String.fromCharCode(e[r]);
  return t.join("");
}
function g1(e) {
  if (typeof Uint8Array > "u") throw new Error("Unsupported");
  return new Uint8Array(e);
}
var Qe = we ? function(e) {
  return Buffer.concat(e.map(function(t) {
    return Buffer.isBuffer(t) ? t : qt(t);
  }));
} : function(e) {
  if (typeof Uint8Array < "u") {
    var t = 0, r = 0;
    for (t = 0; t < e.length; ++t) r += e[t].length;
    var n = new Uint8Array(r), a = 0;
    for (t = 0, r = 0; t < e.length; r += a, ++t)
      if (a = e[t].length, e[t] instanceof Uint8Array) n.set(e[t], r);
      else {
        if (typeof e[t] == "string")
          throw "wtf";
        n.set(new Uint8Array(e[t]), r);
      }
    return n;
  }
  return [].concat.apply([], e.map(function(i) {
    return Array.isArray(i) ? i : [].slice.call(i);
  }));
};
function w1(e) {
  for (var t = [], r = 0, n = e.length + 250, a = Nr(e.length + 255), i = 0; i < e.length; ++i) {
    var s = e.charCodeAt(i);
    if (s < 128) a[r++] = s;
    else if (s < 2048)
      a[r++] = 192 | s >> 6 & 31, a[r++] = 128 | s & 63;
    else if (s >= 55296 && s < 57344) {
      s = (s & 1023) + 64;
      var o = e.charCodeAt(++i) & 1023;
      a[r++] = 240 | s >> 8 & 7, a[r++] = 128 | s >> 2 & 63, a[r++] = 128 | o >> 6 & 15 | (s & 3) << 4, a[r++] = 128 | o & 63;
    } else
      a[r++] = 224 | s >> 12 & 15, a[r++] = 128 | s >> 6 & 63, a[r++] = 128 | s & 63;
    r > n && (t.push(a.slice(0, r)), r = 0, a = Nr(65535), n = 65530);
  }
  return t.push(a.slice(0, r)), Qe(t);
}
var bn = /\u0000/g, da = /[\u0001-\u0006]/g;
function Zr(e) {
  for (var t = "", r = e.length - 1; r >= 0; ) t += e.charAt(r--);
  return t;
}
function Pt(e, t) {
  var r = "" + e;
  return r.length >= t ? r : Le("0", t - r.length) + r;
}
function os(e, t) {
  var r = "" + e;
  return r.length >= t ? r : Le(" ", t - r.length) + r;
}
function Ra(e, t) {
  var r = "" + e;
  return r.length >= t ? r : r + Le(" ", t - r.length);
}
function E1(e, t) {
  var r = "" + Math.round(e);
  return r.length >= t ? r : Le("0", t - r.length) + r;
}
function T1(e, t) {
  var r = "" + e;
  return r.length >= t ? r : Le("0", t - r.length) + r;
}
var F0 = /* @__PURE__ */ Math.pow(2, 32);
function Vr(e, t) {
  if (e > F0 || e < -F0) return E1(e, t);
  var r = Math.round(e);
  return T1(r, t);
}
function Oa(e, t) {
  return t = t || 0, e.length >= 7 + t && (e.charCodeAt(t) | 32) === 103 && (e.charCodeAt(t + 1) | 32) === 101 && (e.charCodeAt(t + 2) | 32) === 110 && (e.charCodeAt(t + 3) | 32) === 101 && (e.charCodeAt(t + 4) | 32) === 114 && (e.charCodeAt(t + 5) | 32) === 97 && (e.charCodeAt(t + 6) | 32) === 108;
}
var k0 = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"]
], di = [
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
function S1(e) {
  return e || (e = {}), e[0] = "General", e[1] = "0", e[2] = "0.00", e[3] = "#,##0", e[4] = "#,##0.00", e[9] = "0%", e[10] = "0.00%", e[11] = "0.00E+00", e[12] = "# ?/?", e[13] = "# ??/??", e[14] = "m/d/yy", e[15] = "d-mmm-yy", e[16] = "d-mmm", e[17] = "mmm-yy", e[18] = "h:mm AM/PM", e[19] = "h:mm:ss AM/PM", e[20] = "h:mm", e[21] = "h:mm:ss", e[22] = "m/d/yy h:mm", e[37] = "#,##0 ;(#,##0)", e[38] = "#,##0 ;[Red](#,##0)", e[39] = "#,##0.00;(#,##0.00)", e[40] = "#,##0.00;[Red](#,##0.00)", e[45] = "mm:ss", e[46] = "[h]:mm:ss", e[47] = "mmss.0", e[48] = "##0.0E+0", e[49] = "@", e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "', e;
}
var be = {
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
}, A0 = {
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
}, y1 = {
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
function Ia(e, t, r) {
  for (var n = e < 0 ? -1 : 1, a = e * n, i = 0, s = 1, o = 0, c = 1, l = 0, f = 0, d = Math.floor(a); l < t && (d = Math.floor(a), o = d * s + i, f = d * l + c, !(a - d < 5e-8)); )
    a = 1 / (a - d), i = s, s = o, c = l, l = f;
  if (f > t && (l > t ? (f = c, o = i) : (f = l, o = s)), !r) return [0, n * o, f];
  var u = Math.floor(n * o / f);
  return [u, n * o - u * f, f];
}
function xa(e, t, r) {
  if (e > 2958465 || e < 0) return null;
  var n = e | 0, a = Math.floor(86400 * (e - n)), i = 0, s = [], o = { D: n, T: a, u: 86400 * (e - n) - a, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
  if (Math.abs(o.u) < 1e-6 && (o.u = 0), t && t.date1904 && (n += 1462), o.u > 0.9999 && (o.u = 0, ++a == 86400 && (o.T = a = 0, ++n, ++o.D)), n === 60)
    s = r ? [1317, 10, 29] : [1900, 2, 29], i = 3;
  else if (n === 0)
    s = r ? [1317, 8, 29] : [1900, 1, 0], i = 6;
  else {
    n > 60 && --n;
    var c = new Date(1900, 0, 1);
    c.setDate(c.getDate() + n - 1), s = [c.getFullYear(), c.getMonth() + 1, c.getDate()], i = c.getDay(), n < 60 && (i = (i + 6) % 7), r && (i = I1(c, s));
  }
  return o.y = s[0], o.m = s[1], o.d = s[2], o.S = a % 60, a = Math.floor(a / 60), o.M = a % 60, a = Math.floor(a / 60), o.H = a, o.q = i, o;
}
var pl = /* @__PURE__ */ new Date(1899, 11, 31, 0, 0, 0), C1 = /* @__PURE__ */ pl.getTime(), F1 = /* @__PURE__ */ new Date(1900, 2, 1, 0, 0, 0);
function ml(e, t) {
  var r = /* @__PURE__ */ e.getTime();
  return t ? r -= 1461 * 24 * 60 * 60 * 1e3 : e >= F1 && (r += 1440 * 60 * 1e3), (r - (C1 + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ pl.getTimezoneOffset()) * 6e4)) / (1440 * 60 * 1e3);
}
function ls(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function k1(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function A1(e) {
  var t = e < 0 ? 12 : 11, r = ls(e.toFixed(12));
  return r.length <= t || (r = e.toPrecision(10), r.length <= t) ? r : e.toExponential(5);
}
function R1(e) {
  var t = ls(e.toFixed(11));
  return t.length > (e < 0 ? 12 : 11) || t === "0" || t === "-0" ? e.toPrecision(6) : t;
}
function O1(e) {
  var t = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E), r;
  return t >= -4 && t <= -1 ? r = e.toPrecision(10 + t) : Math.abs(t) <= 9 ? r = A1(e) : t === 10 ? r = e.toFixed(10).substr(0, 12) : r = R1(e), ls(k1(r.toUpperCase()));
}
function zi(e, t) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : O1(e);
    case "undefined":
      return "";
    case "object":
      if (e == null) return "";
      if (e instanceof Date) return dr(14, ml(e, t && t.date1904), t);
  }
  throw new Error("unsupported value in General format: " + e);
}
function I1(e, t) {
  t[0] -= 581;
  var r = e.getDay();
  return e < 60 && (r = (r + 6) % 7), r;
}
function N1(e, t, r, n) {
  var a = "", i = 0, s = 0, o = r.y, c, l = 0;
  switch (e) {
    case 98:
      o = r.y + 543;
    /* falls through */
    case 121:
      switch (t.length) {
        case 1:
        case 2:
          c = o % 100, l = 2;
          break;
        default:
          c = o % 1e4, l = 4;
          break;
      }
      break;
    case 109:
      switch (t.length) {
        case 1:
        case 2:
          c = r.m, l = t.length;
          break;
        case 3:
          return di[r.m - 1][1];
        case 5:
          return di[r.m - 1][0];
        default:
          return di[r.m - 1][2];
      }
      break;
    case 100:
      switch (t.length) {
        case 1:
        case 2:
          c = r.d, l = t.length;
          break;
        case 3:
          return k0[r.q][0];
        default:
          return k0[r.q][1];
      }
      break;
    case 104:
      switch (t.length) {
        case 1:
        case 2:
          c = 1 + (r.H + 11) % 12, l = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 72:
      switch (t.length) {
        case 1:
        case 2:
          c = r.H, l = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 77:
      switch (t.length) {
        case 1:
        case 2:
          c = r.M, l = t.length;
          break;
        default:
          throw "bad minute format: " + t;
      }
      break;
    case 115:
      if (t != "s" && t != "ss" && t != ".0" && t != ".00" && t != ".000") throw "bad second format: " + t;
      return r.u === 0 && (t == "s" || t == "ss") ? Pt(r.S, t.length) : (n >= 2 ? s = n === 3 ? 1e3 : 100 : s = n === 1 ? 10 : 1, i = Math.round(s * (r.S + r.u)), i >= 60 * s && (i = 0), t === "s" ? i === 0 ? "0" : "" + i / s : (a = Pt(i, 2 + n), t === "ss" ? a.substr(0, 2) : "." + a.substr(2, t.length - 1)));
    case 90:
      switch (t) {
        case "[h]":
        case "[hh]":
          c = r.D * 24 + r.H;
          break;
        case "[m]":
        case "[mm]":
          c = (r.D * 24 + r.H) * 60 + r.M;
          break;
        case "[s]":
        case "[ss]":
          c = ((r.D * 24 + r.H) * 60 + r.M) * 60 + Math.round(r.S + r.u);
          break;
        default:
          throw "bad abstime format: " + t;
      }
      l = t.length === 3 ? 1 : 2;
      break;
    case 101:
      c = o, l = 1;
      break;
  }
  var f = l > 0 ? Pt(c, l) : "";
  return f;
}
function ur(e) {
  var t = 3;
  if (e.length <= t) return e;
  for (var r = e.length % t, n = e.substr(0, r); r != e.length; r += t) n += (n.length > 0 ? "," : "") + e.substr(r, t);
  return n;
}
var _l = /%/g;
function D1(e, t, r) {
  var n = t.replace(_l, ""), a = t.length - n.length;
  return Xt(e, n, r * Math.pow(10, 2 * a)) + Le("%", a);
}
function M1(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; ) --n;
  return Xt(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function vl(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + vl(e, -t);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % a;
    if (i < 0 && (i += a), r = (t / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), r.indexOf("e") === -1) {
      var s = Math.floor(Math.log(t) * Math.LOG10E);
      for (r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i) : r += "E+" + (s - i); r.substr(0, 2) === "0."; )
        r = r.charAt(0) + r.substr(2, a) + "." + r.substr(2 + a), r = r.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
      r = r.replace(/\+-/, "-");
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(o, c, l, f) {
      return c + l + f.substr(0, (a + i) % a) + "." + f.substr(i) + "E";
    });
  } else r = t.toExponential(n);
  return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E");
}
var gl = /# (\?+)( ?)\/( ?)(\d+)/;
function P1(e, t, r) {
  var n = parseInt(e[4], 10), a = Math.round(t * n), i = Math.floor(a / n), s = a - i * n, o = n;
  return r + (i === 0 ? "" : "" + i) + " " + (s === 0 ? Le(" ", e[1].length + 1 + e[4].length) : os(s, e[1].length) + e[2] + "/" + e[3] + Pt(o, e[4].length));
}
function L1(e, t, r) {
  return r + (t === 0 ? "" : "" + t) + Le(" ", e[1].length + 2 + e[4].length);
}
var wl = /^#*0*\.([0#]+)/, El = /\).*[0#]/, Tl = /\(###\) ###\\?-####/;
function lt(e) {
  for (var t = "", r, n = 0; n != e.length; ++n) switch (r = e.charCodeAt(n)) {
    case 35:
      break;
    case 63:
      t += " ";
      break;
    case 48:
      t += "0";
      break;
    default:
      t += String.fromCharCode(r);
  }
  return t;
}
function R0(e, t) {
  var r = Math.pow(10, t);
  return "" + Math.round(e * r) / r;
}
function O0(e, t) {
  var r = e - Math.floor(e), n = Math.pow(10, t);
  return t < ("" + Math.round(r * n)).length ? 0 : Math.round(r * n);
}
function b1(e, t) {
  return t < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, t))).length ? 1 : 0;
}
function B1(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function Ft(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(El)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? Ft("n", n, r) : "(" + Ft("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return M1(e, t, r);
  if (t.indexOf("%") !== -1) return D1(e, t, r);
  if (t.indexOf("E") !== -1) return vl(t, r);
  if (t.charCodeAt(0) === 36) return "$" + Ft(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, o, c = Math.abs(r), l = r < 0 ? "-" : "";
  if (t.match(/^00+$/)) return l + Vr(c, t.length);
  if (t.match(/^[#?]+$/))
    return a = Vr(r, 0), a === "0" && (a = ""), a.length > t.length ? a : lt(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(gl)) return P1(i, c, l);
  if (t.match(/^#+0+$/)) return l + Vr(c, t.length - t.indexOf("0"));
  if (i = t.match(wl))
    return a = R0(r, i[1].length).replace(/^([^\.]+)$/, "$1." + lt(i[1])).replace(/\.$/, "." + lt(i[1])).replace(/\.(\d*)$/, function(m, x) {
      return "." + x + Le("0", lt(
        /*::(*/
        i[1]
      ).length - x.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return l + R0(c, i[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/)) return l + ur(Vr(c, 0));
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + Ft(e, t, -r) : ur("" + (Math.floor(r) + b1(r, i[1].length))) + "." + Pt(O0(r, i[1].length), i[1].length);
  if (i = t.match(/^#,#*,#0/)) return Ft(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = Zr(Ft(e, t.replace(/[\\-]/g, ""), r)), s = 0, Zr(Zr(t.replace(/\\/g, "")).replace(/[0#]/g, function(m) {
      return s < a.length ? a.charAt(s++) : m === "0" ? "0" : "";
    }));
  if (t.match(Tl))
    return a = Ft(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var f = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), o = Ia(c, Math.pow(10, s) - 1, !1), a = "" + l, f = Xt(
      "n",
      /*::String(*/
      i[1],
      o[1]
    ), f.charAt(f.length - 1) == " " && (f = f.substr(0, f.length - 1) + "0"), a += f + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], f = Ra(o[2], s), f.length < i[4].length && (f = lt(i[4].substr(i[4].length - f.length)) + f), a += f, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), o = Ia(c, Math.pow(10, s) - 1, !0), l + (o[0] || (o[1] ? "" : "0")) + " " + (o[1] ? os(o[1], s) + i[2] + "/" + i[3] + Ra(o[2], s) : Le(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = Vr(r, 0), t.length <= a.length ? a : lt(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0?]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var d = t.indexOf(".") - s, u = t.length - a.length - d;
    return lt(t.substr(0, d) + a + t.substr(t.length - u));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return s = O0(r, i[1].length), r < 0 ? "-" + Ft(e, t, -r) : ur(B1(r)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(m) {
      return "00," + (m.length < 3 ? Pt(0, 3 - m.length) : "") + m;
    }) + "." + Pt(s, i[1].length);
  switch (t) {
    case "###,##0.00":
      return Ft(e, "#,##0.00", r);
    case "###,###":
    case "##,###":
    case "#,###":
      var h = ur(Vr(c, 0));
      return h !== "0" ? l + h : "";
    case "###,###.00":
      return Ft(e, "###,##0.00", r).replace(/^0\./, ".");
    case "#,###.00":
      return Ft(e, "#,##0.00", r).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + t + "|");
}
function U1(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; ) --n;
  return Xt(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function W1(e, t, r) {
  var n = t.replace(_l, ""), a = t.length - n.length;
  return Xt(e, n, r * Math.pow(10, 2 * a)) + Le("%", a);
}
function Sl(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + Sl(e, -t);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % a;
    if (i < 0 && (i += a), r = (t / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), !r.match(/[Ee]/)) {
      var s = Math.floor(Math.log(t) * Math.LOG10E);
      r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i) : r += "E+" + (s - i), r = r.replace(/\+-/, "-");
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(o, c, l, f) {
      return c + l + f.substr(0, (a + i) % a) + "." + f.substr(i) + "E";
    });
  } else r = t.toExponential(n);
  return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E");
}
function Bt(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(El)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? Bt("n", n, r) : "(" + Bt("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return U1(e, t, r);
  if (t.indexOf("%") !== -1) return W1(e, t, r);
  if (t.indexOf("E") !== -1) return Sl(t, r);
  if (t.charCodeAt(0) === 36) return "$" + Bt(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, o, c = Math.abs(r), l = r < 0 ? "-" : "";
  if (t.match(/^00+$/)) return l + Pt(c, t.length);
  if (t.match(/^[#?]+$/))
    return a = "" + r, r === 0 && (a = ""), a.length > t.length ? a : lt(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(gl)) return L1(i, c, l);
  if (t.match(/^#+0+$/)) return l + Pt(c, t.length - t.indexOf("0"));
  if (i = t.match(wl))
    return a = ("" + r).replace(/^([^\.]+)$/, "$1." + lt(i[1])).replace(/\.$/, "." + lt(i[1])), a = a.replace(/\.(\d*)$/, function(m, x) {
      return "." + x + Le("0", lt(i[1]).length - x.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return l + ("" + c).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/)) return l + ur("" + c);
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + Bt(e, t, -r) : ur("" + r) + "." + Le("0", i[1].length);
  if (i = t.match(/^#,#*,#0/)) return Bt(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = Zr(Bt(e, t.replace(/[\\-]/g, ""), r)), s = 0, Zr(Zr(t.replace(/\\/g, "")).replace(/[0#]/g, function(m) {
      return s < a.length ? a.charAt(s++) : m === "0" ? "0" : "";
    }));
  if (t.match(Tl))
    return a = Bt(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var f = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), o = Ia(c, Math.pow(10, s) - 1, !1), a = "" + l, f = Xt(
      "n",
      /*::String(*/
      i[1],
      o[1]
    ), f.charAt(f.length - 1) == " " && (f = f.substr(0, f.length - 1) + "0"), a += f + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], f = Ra(o[2], s), f.length < i[4].length && (f = lt(i[4].substr(i[4].length - f.length)) + f), a += f, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), o = Ia(c, Math.pow(10, s) - 1, !0), l + (o[0] || (o[1] ? "" : "0")) + " " + (o[1] ? os(o[1], s) + i[2] + "/" + i[3] + Ra(o[2], s) : Le(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = "" + r, t.length <= a.length ? a : lt(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var d = t.indexOf(".") - s, u = t.length - a.length - d;
    return lt(t.substr(0, d) + a + t.substr(t.length - u));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return r < 0 ? "-" + Bt(e, t, -r) : ur("" + r).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(m) {
      return "00," + (m.length < 3 ? Pt(0, 3 - m.length) : "") + m;
    }) + "." + Pt(0, i[1].length);
  switch (t) {
    case "###,###":
    case "##,###":
    case "#,###":
      var h = ur("" + c);
      return h !== "0" ? l + h : "";
    default:
      if (t.match(/\.[0#?]*$/)) return Bt(e, t.slice(0, t.lastIndexOf(".")), r) + lt(t.slice(t.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + t + "|");
}
function Xt(e, t, r) {
  return (r | 0) === r ? Bt(e, t, r) : Ft(e, t, r);
}
function $1(e) {
  for (var t = [], r = !1, n = 0, a = 0; n < e.length; ++n) switch (
    /*cc=*/
    e.charCodeAt(n)
  ) {
    case 34:
      r = !r;
      break;
    case 95:
    case 42:
    case 92:
      ++n;
      break;
    case 59:
      t[t.length] = e.substr(a, n - a), a = n + 1;
  }
  if (t[t.length] = e.substr(a), r === !0) throw new Error("Format |" + e + "| unterminated string ");
  return t;
}
var yl = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function Cl(e) {
  for (var t = 0, r = "", n = ""; t < e.length; )
    switch (r = e.charAt(t)) {
      case "G":
        Oa(e, t) && (t += 6), t++;
        break;
      case '"':
        for (
          ;
          /*cc=*/
          e.charCodeAt(++t) !== 34 && t < e.length;
        )
          ;
        ++t;
        break;
      case "\\":
        t += 2;
        break;
      case "_":
        t += 2;
        break;
      case "@":
        ++t;
        break;
      case "B":
      case "b":
        if (e.charAt(t + 1) === "1" || e.charAt(t + 1) === "2") return !0;
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
        if (e.substr(t, 3).toUpperCase() === "A/P" || e.substr(t, 5).toUpperCase() === "AM/PM" || e.substr(t, 5).toUpperCase() === "上午/下午") return !0;
        ++t;
        break;
      case "[":
        for (n = r; e.charAt(t++) !== "]" && t < e.length; ) n += e.charAt(t);
        if (n.match(yl)) return !0;
        break;
      case ".":
      /* falls through */
      case "0":
      case "#":
        for (; t < e.length && ("0#?.,E+-%".indexOf(r = e.charAt(++t)) > -1 || r == "\\" && e.charAt(t + 1) == "-" && "0#".indexOf(e.charAt(t + 2)) > -1); )
          ;
        break;
      case "?":
        for (; e.charAt(++t) === r; )
          ;
        break;
      case "*":
        ++t, (e.charAt(t) == " " || e.charAt(t) == "*") && ++t;
        break;
      case "(":
      case ")":
        ++t;
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
        for (; t < e.length && "0123456789".indexOf(e.charAt(++t)) > -1; )
          ;
        break;
      case " ":
        ++t;
        break;
      default:
        ++t;
        break;
    }
  return !1;
}
function H1(e, t, r, n) {
  for (var a = [], i = "", s = 0, o = "", c = "t", l, f, d, u = "H"; s < e.length; )
    switch (o = e.charAt(s)) {
      case "G":
        if (!Oa(e, s)) throw new Error("unrecognized character " + o + " in " + e);
        a[a.length] = { t: "G", v: "General" }, s += 7;
        break;
      case '"':
        for (i = ""; (d = e.charCodeAt(++s)) !== 34 && s < e.length; ) i += String.fromCharCode(d);
        a[a.length] = { t: "t", v: i }, ++s;
        break;
      case "\\":
        var h = e.charAt(++s), m = h === "(" || h === ")" ? h : "t";
        a[a.length] = { t: m, v: h }, ++s;
        break;
      case "_":
        a[a.length] = { t: "t", v: " " }, s += 2;
        break;
      case "@":
        a[a.length] = { t: "T", v: t }, ++s;
        break;
      case "B":
      case "b":
        if (e.charAt(s + 1) === "1" || e.charAt(s + 1) === "2") {
          if (l == null && (l = xa(t, r, e.charAt(s + 1) === "2"), l == null))
            return "";
          a[a.length] = { t: "X", v: e.substr(s, 2) }, c = o, s += 2;
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
        if (t < 0 || l == null && (l = xa(t, r), l == null))
          return "";
        for (i = o; ++s < e.length && e.charAt(s).toLowerCase() === o; ) i += o;
        o === "m" && c.toLowerCase() === "h" && (o = "M"), o === "h" && (o = u), a[a.length] = { t: o, v: i }, c = o;
        break;
      case "A":
      case "a":
      case "上":
        var x = { t: o, v: o };
        if (l == null && (l = xa(t, r)), e.substr(s, 3).toUpperCase() === "A/P" ? (l != null && (x.v = l.H >= 12 ? "P" : "A"), x.t = "T", u = "h", s += 3) : e.substr(s, 5).toUpperCase() === "AM/PM" ? (l != null && (x.v = l.H >= 12 ? "PM" : "AM"), x.t = "T", s += 5, u = "h") : e.substr(s, 5).toUpperCase() === "上午/下午" ? (l != null && (x.v = l.H >= 12 ? "下午" : "上午"), x.t = "T", s += 5, u = "h") : (x.t = "t", ++s), l == null && x.t === "T") return "";
        a[a.length] = x, c = o;
        break;
      case "[":
        for (i = o; e.charAt(s++) !== "]" && s < e.length; ) i += e.charAt(s);
        if (i.slice(-1) !== "]") throw 'unterminated "[" block: |' + i + "|";
        if (i.match(yl)) {
          if (l == null && (l = xa(t, r), l == null))
            return "";
          a[a.length] = { t: "Z", v: i.toLowerCase() }, c = i.charAt(1);
        } else i.indexOf("$") > -1 && (i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$", Cl(e) || (a[a.length] = { t: "t", v: i }));
        break;
      /* Numbers */
      case ".":
        if (l != null) {
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
        a[a.length] = { t: o, v: i }, c = o;
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
  var _ = 0, F = 0, A;
  for (s = a.length - 1, c = "t"; s >= 0; --s)
    switch (a[s].t) {
      case "h":
      case "H":
        a[s].t = u, c = "h", _ < 1 && (_ = 1);
        break;
      case "s":
        (A = a[s].v.match(/\.0+$/)) && (F = Math.max(F, A[0].length - 1)), _ < 3 && (_ = 3);
      /* falls through */
      case "d":
      case "y":
      case "M":
      case "e":
        c = a[s].t;
        break;
      case "m":
        c === "s" && (a[s].t = "M", _ < 2 && (_ = 2));
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
      l.u >= 0.5 && (l.u = 0, ++l.S), l.S >= 60 && (l.S = 0, ++l.M), l.M >= 60 && (l.M = 0, ++l.H);
      break;
    case 2:
      l.u >= 0.5 && (l.u = 0, ++l.S), l.S >= 60 && (l.S = 0, ++l.M);
      break;
  }
  var y = "", O;
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
        a[s].v = N1(a[s].t.charCodeAt(0), a[s].v, l, F), a[s].t = "t";
        break;
      case "n":
      case "?":
        for (O = s + 1; a[O] != null && ((o = a[O].t) === "?" || o === "D" || (o === " " || o === "t") && a[O + 1] != null && (a[O + 1].t === "?" || a[O + 1].t === "t" && a[O + 1].v === "/") || a[s].t === "(" && (o === " " || o === "n" || o === ")") || o === "t" && (a[O].v === "/" || a[O].v === " " && a[O + 1] != null && a[O + 1].t == "?")); )
          a[s].v += a[O].v, a[O] = { v: "", t: ";" }, ++O;
        y += a[s].v, s = O - 1;
        break;
      case "G":
        a[s].t = "t", a[s].v = zi(t, r);
        break;
    }
  var j = "", Z, R;
  if (y.length > 0) {
    y.charCodeAt(0) == 40 ? (Z = t < 0 && y.charCodeAt(0) === 45 ? -t : t, R = Xt("n", y, Z)) : (Z = t < 0 && n > 1 ? -t : t, R = Xt("n", y, Z), Z < 0 && a[0] && a[0].t == "t" && (R = R.substr(1), a[0].v = "-" + a[0].v)), O = R.length - 1;
    var W = a.length;
    for (s = 0; s < a.length; ++s) if (a[s] != null && a[s].t != "t" && a[s].v.indexOf(".") > -1) {
      W = s;
      break;
    }
    var P = a.length;
    if (W === a.length && R.indexOf("E") === -1) {
      for (s = a.length - 1; s >= 0; --s)
        a[s] == null || "n?".indexOf(a[s].t) === -1 || (O >= a[s].v.length - 1 ? (O -= a[s].v.length, a[s].v = R.substr(O + 1, a[s].v.length)) : O < 0 ? a[s].v = "" : (a[s].v = R.substr(0, O + 1), O = -1), a[s].t = "t", P = s);
      O >= 0 && P < a.length && (a[P].v = R.substr(0, O + 1) + a[P].v);
    } else if (W !== a.length && R.indexOf("E") === -1) {
      for (O = R.indexOf(".") - 1, s = W; s >= 0; --s)
        if (!(a[s] == null || "n?".indexOf(a[s].t) === -1)) {
          for (f = a[s].v.indexOf(".") > -1 && s === W ? a[s].v.indexOf(".") - 1 : a[s].v.length - 1, j = a[s].v.substr(f + 1); f >= 0; --f)
            O >= 0 && (a[s].v.charAt(f) === "0" || a[s].v.charAt(f) === "#") && (j = R.charAt(O--) + j);
          a[s].v = j, a[s].t = "t", P = s;
        }
      for (O >= 0 && P < a.length && (a[P].v = R.substr(0, O + 1) + a[P].v), O = R.indexOf(".") + 1, s = W; s < a.length; ++s)
        if (!(a[s] == null || "n?(".indexOf(a[s].t) === -1 && s !== W)) {
          for (f = a[s].v.indexOf(".") > -1 && s === W ? a[s].v.indexOf(".") + 1 : 0, j = a[s].v.substr(0, f); f < a[s].v.length; ++f)
            O < R.length && (j += R.charAt(O++));
          a[s].v = j, a[s].t = "t", P = s;
        }
    }
  }
  for (s = 0; s < a.length; ++s) a[s] != null && "n?".indexOf(a[s].t) > -1 && (Z = n > 1 && t < 0 && s > 0 && a[s - 1].v === "-" ? -t : t, a[s].v = Xt(a[s].t, a[s].v, Z), a[s].t = "t");
  var H = "";
  for (s = 0; s !== a.length; ++s) a[s] != null && (H += a[s].v);
  return H;
}
var I0 = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function N0(e, t) {
  if (t == null) return !1;
  var r = parseFloat(t[2]);
  switch (t[1]) {
    case "=":
      if (e == r) return !0;
      break;
    case ">":
      if (e > r) return !0;
      break;
    case "<":
      if (e < r) return !0;
      break;
    case "<>":
      if (e != r) return !0;
      break;
    case ">=":
      if (e >= r) return !0;
      break;
    case "<=":
      if (e <= r) return !0;
      break;
  }
  return !1;
}
function G1(e, t) {
  var r = $1(e), n = r.length, a = r[n - 1].indexOf("@");
  if (n < 4 && a > -1 && --n, r.length > 4) throw new Error("cannot find right format for |" + r.join("|") + "|");
  if (typeof t != "number") return [4, r.length === 4 || a > -1 ? r[r.length - 1] : "@"];
  switch (r.length) {
    case 1:
      r = a > -1 ? ["General", "General", "General", r[0]] : [r[0], r[0], r[0], "@"];
      break;
    case 2:
      r = a > -1 ? [r[0], r[0], r[0], r[1]] : [r[0], r[1], r[0], "@"];
      break;
    case 3:
      r = a > -1 ? [r[0], r[1], r[0], r[2]] : [r[0], r[1], r[2], "@"];
      break;
  }
  var i = t > 0 ? r[0] : t < 0 ? r[1] : r[2];
  if (r[0].indexOf("[") === -1 && r[1].indexOf("[") === -1) return [n, i];
  if (r[0].match(/\[[=<>]/) != null || r[1].match(/\[[=<>]/) != null) {
    var s = r[0].match(I0), o = r[1].match(I0);
    return N0(t, s) ? [n, r[0]] : N0(t, o) ? [n, r[1]] : [n, r[s != null && o != null ? 2 : 1]];
  }
  return [n, i];
}
function dr(e, t, r) {
  r == null && (r = {});
  var n = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && r.dateNF ? n = r.dateNF : n = e;
      break;
    case "number":
      e == 14 && r.dateNF ? n = r.dateNF : n = (r.table != null ? r.table : be)[e], n == null && (n = r.table && r.table[A0[e]] || be[A0[e]]), n == null && (n = y1[e] || "General");
      break;
  }
  if (Oa(n, 0)) return zi(t, r);
  t instanceof Date && (t = ml(t, r.date1904));
  var a = G1(n, t);
  if (Oa(a[1])) return zi(t, r);
  if (t === !0) t = "TRUE";
  else if (t === !1) t = "FALSE";
  else if (t === "" || t == null) return "";
  return H1(a[1], t, r, a[0]);
}
function Fl(e, t) {
  if (typeof t != "number") {
    t = +t || -1;
    for (var r = 0; r < 392; ++r) {
      if (be[r] == null) {
        t < 0 && (t = r);
        continue;
      }
      if (be[r] == e) {
        t = r;
        break;
      }
    }
    t < 0 && (t = 391);
  }
  return be[t] = e, t;
}
function za(e) {
  for (var t = 0; t != 392; ++t)
    e[t] !== void 0 && Fl(e[t], t);
}
function ja() {
  be = S1();
}
var kl = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function V1(e) {
  var t = typeof e == "number" ? be[e] : e;
  return t = t.replace(kl, "(\\d+)"), new RegExp("^" + t + "$");
}
function z1(e, t, r) {
  var n = -1, a = -1, i = -1, s = -1, o = -1, c = -1;
  (t.match(kl) || []).forEach(function(d, u) {
    var h = parseInt(r[u + 1], 10);
    switch (d.toLowerCase().charAt(0)) {
      case "y":
        n = h;
        break;
      case "d":
        i = h;
        break;
      case "h":
        s = h;
        break;
      case "s":
        c = h;
        break;
      case "m":
        s >= 0 ? o = h : a = h;
        break;
    }
  }), c >= 0 && o == -1 && a >= 0 && (o = a, a = -1);
  var l = ("" + (n >= 0 ? n : (/* @__PURE__ */ new Date()).getFullYear())).slice(-4) + "-" + ("00" + (a >= 1 ? a : 1)).slice(-2) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2);
  l.length == 7 && (l = "0" + l), l.length == 8 && (l = "20" + l);
  var f = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (o >= 0 ? o : 0)).slice(-2) + ":" + ("00" + (c >= 0 ? c : 0)).slice(-2);
  return s == -1 && o == -1 && c == -1 ? l : n == -1 && a == -1 && i == -1 ? f : l + "T" + f;
}
var j1 = /* @__PURE__ */ (function() {
  var e = {};
  e.version = "1.2.0";
  function t() {
    for (var R = 0, W = new Array(256), P = 0; P != 256; ++P)
      R = P, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, R = R & 1 ? -306674912 ^ R >>> 1 : R >>> 1, W[P] = R;
    return typeof Int32Array < "u" ? new Int32Array(W) : W;
  }
  var r = t();
  function n(R) {
    var W = 0, P = 0, H = 0, D = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
    for (H = 0; H != 256; ++H) D[H] = R[H];
    for (H = 0; H != 256; ++H)
      for (P = R[H], W = 256 + H; W < 4096; W += 256) P = D[W] = P >>> 8 ^ R[P & 255];
    var V = [];
    for (H = 1; H != 16; ++H) V[H - 1] = typeof Int32Array < "u" ? D.subarray(H * 256, H * 256 + 256) : D.slice(H * 256, H * 256 + 256);
    return V;
  }
  var a = n(r), i = a[0], s = a[1], o = a[2], c = a[3], l = a[4], f = a[5], d = a[6], u = a[7], h = a[8], m = a[9], x = a[10], _ = a[11], F = a[12], A = a[13], y = a[14];
  function O(R, W) {
    for (var P = W ^ -1, H = 0, D = R.length; H < D; ) P = P >>> 8 ^ r[(P ^ R.charCodeAt(H++)) & 255];
    return ~P;
  }
  function j(R, W) {
    for (var P = W ^ -1, H = R.length - 15, D = 0; D < H; ) P = y[R[D++] ^ P & 255] ^ A[R[D++] ^ P >> 8 & 255] ^ F[R[D++] ^ P >> 16 & 255] ^ _[R[D++] ^ P >>> 24] ^ x[R[D++]] ^ m[R[D++]] ^ h[R[D++]] ^ u[R[D++]] ^ d[R[D++]] ^ f[R[D++]] ^ l[R[D++]] ^ c[R[D++]] ^ o[R[D++]] ^ s[R[D++]] ^ i[R[D++]] ^ r[R[D++]];
    for (H += 15; D < H; ) P = P >>> 8 ^ r[(P ^ R[D++]) & 255];
    return ~P;
  }
  function Z(R, W) {
    for (var P = W ^ -1, H = 0, D = R.length, V = 0, q = 0; H < D; )
      V = R.charCodeAt(H++), V < 128 ? P = P >>> 8 ^ r[(P ^ V) & 255] : V < 2048 ? (P = P >>> 8 ^ r[(P ^ (192 | V >> 6 & 31)) & 255], P = P >>> 8 ^ r[(P ^ (128 | V & 63)) & 255]) : V >= 55296 && V < 57344 ? (V = (V & 1023) + 64, q = R.charCodeAt(H++) & 1023, P = P >>> 8 ^ r[(P ^ (240 | V >> 8 & 7)) & 255], P = P >>> 8 ^ r[(P ^ (128 | V >> 2 & 63)) & 255], P = P >>> 8 ^ r[(P ^ (128 | q >> 6 & 15 | (V & 3) << 4)) & 255], P = P >>> 8 ^ r[(P ^ (128 | q & 63)) & 255]) : (P = P >>> 8 ^ r[(P ^ (224 | V >> 12 & 15)) & 255], P = P >>> 8 ^ r[(P ^ (128 | V >> 6 & 63)) & 255], P = P >>> 8 ^ r[(P ^ (128 | V & 63)) & 255]);
    return ~P;
  }
  return e.table = r, e.bstr = O, e.buf = j, e.str = Z, e;
})(), ke = /* @__PURE__ */ (function() {
  var t = {};
  t.version = "1.2.1";
  function r(p, w) {
    for (var v = p.split("/"), g = w.split("/"), E = 0, T = 0, N = Math.min(v.length, g.length); E < N; ++E) {
      if (T = v[E].length - g[E].length) return T;
      if (v[E] != g[E]) return v[E] < g[E] ? -1 : 1;
    }
    return v.length - g.length;
  }
  function n(p) {
    if (p.charAt(p.length - 1) == "/") return p.slice(0, -1).indexOf("/") === -1 ? p : n(p.slice(0, -1));
    var w = p.lastIndexOf("/");
    return w === -1 ? p : p.slice(0, w + 1);
  }
  function a(p) {
    if (p.charAt(p.length - 1) == "/") return a(p.slice(0, -1));
    var w = p.lastIndexOf("/");
    return w === -1 ? p : p.slice(w + 1);
  }
  function i(p, w) {
    typeof w == "string" && (w = new Date(w));
    var v = w.getHours();
    v = v << 6 | w.getMinutes(), v = v << 5 | w.getSeconds() >>> 1, p.write_shift(2, v);
    var g = w.getFullYear() - 1980;
    g = g << 4 | w.getMonth() + 1, g = g << 5 | w.getDate(), p.write_shift(2, g);
  }
  function s(p) {
    var w = p.read_shift(2) & 65535, v = p.read_shift(2) & 65535, g = /* @__PURE__ */ new Date(), E = v & 31;
    v >>>= 5;
    var T = v & 15;
    v >>>= 4, g.setMilliseconds(0), g.setFullYear(v + 1980), g.setMonth(T - 1), g.setDate(E);
    var N = w & 31;
    w >>>= 5;
    var U = w & 63;
    return w >>>= 6, g.setHours(w), g.setMinutes(U), g.setSeconds(N << 1), g;
  }
  function o(p) {
    vt(p, 0);
    for (var w = (
      /*::(*/
      {}
    ), v = 0; p.l <= p.length - 4; ) {
      var g = p.read_shift(2), E = p.read_shift(2), T = p.l + E, N = {};
      switch (g) {
        /* UNIX-style Timestamps */
        case 21589:
          v = p.read_shift(1), v & 1 && (N.mtime = p.read_shift(4)), E > 5 && (v & 2 && (N.atime = p.read_shift(4)), v & 4 && (N.ctime = p.read_shift(4))), N.mtime && (N.mt = new Date(N.mtime * 1e3));
          break;
      }
      p.l = T, w[g] = N;
    }
    return w;
  }
  var c;
  function l() {
    return c || (c = {});
  }
  function f(p, w) {
    if (p[0] == 80 && p[1] == 75) return bs(p, w);
    if ((p[0] | 32) == 109 && (p[1] | 32) == 105) return of(p, w);
    if (p.length < 512) throw new Error("CFB file size " + p.length + " < 512");
    var v = 3, g = 512, E = 0, T = 0, N = 0, U = 0, I = 0, M = [], L = (
      /*::(*/
      p.slice(0, 512)
    );
    vt(L, 0);
    var Y = d(L);
    switch (v = Y[0], v) {
      case 3:
        g = 512;
        break;
      case 4:
        g = 4096;
        break;
      case 0:
        if (Y[1] == 0) return bs(p, w);
      /* falls through */
      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + v);
    }
    g !== 512 && (L = /*::(*/
    p.slice(0, g), vt(
      L,
      28
      /* blob.l */
    ));
    var ee = p.slice(0, g);
    u(L, v);
    var ae = L.read_shift(4, "i");
    if (v === 3 && ae !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + ae);
    L.l += 4, N = L.read_shift(4, "i"), L.l += 4, L.chk("00100000", "Mini Stream Cutoff Size: "), U = L.read_shift(4, "i"), E = L.read_shift(4, "i"), I = L.read_shift(4, "i"), T = L.read_shift(4, "i");
    for (var K = -1, re = 0; re < 109 && (K = L.read_shift(4, "i"), !(K < 0)); ++re)
      M[re] = K;
    var he = h(p, g);
    _(I, T, he, g, M);
    var De = A(he, N, M, g);
    De[N].name = "!Directory", E > 0 && U !== q && (De[U].name = "!MiniFAT"), De[M[0]].name = "!FAT", De.fat_addrs = M, De.ssz = g;
    var Me = {}, tt = [], _n = [], vn = [];
    y(N, De, he, tt, E, Me, _n, U), m(_n, vn, tt), tt.shift();
    var gn = {
      FileIndex: _n,
      FullPaths: vn
    };
    return w && w.raw && (gn.raw = { header: ee, sectors: he }), gn;
  }
  function d(p) {
    if (p[p.l] == 80 && p[p.l + 1] == 75) return [0, 0];
    p.chk(_e, "Header Signature: "), p.l += 16;
    var w = p.read_shift(2, "u");
    return [p.read_shift(2, "u"), w];
  }
  function u(p, w) {
    var v = 9;
    switch (p.l += 2, v = p.read_shift(2)) {
      case 9:
        if (w != 3) throw new Error("Sector Shift: Expected 9 saw " + v);
        break;
      case 12:
        if (w != 4) throw new Error("Sector Shift: Expected 12 saw " + v);
        break;
      default:
        throw new Error("Sector Shift: Expected 9 or 12 saw " + v);
    }
    p.chk("0600", "Mini Sector Shift: "), p.chk("000000000000", "Reserved: ");
  }
  function h(p, w) {
    for (var v = Math.ceil(p.length / w) - 1, g = [], E = 1; E < v; ++E) g[E - 1] = p.slice(E * w, (E + 1) * w);
    return g[v - 1] = p.slice(v * w), g;
  }
  function m(p, w, v) {
    for (var g = 0, E = 0, T = 0, N = 0, U = 0, I = v.length, M = [], L = []; g < I; ++g)
      M[g] = L[g] = g, w[g] = v[g];
    for (; U < L.length; ++U)
      g = L[U], E = p[g].L, T = p[g].R, N = p[g].C, M[g] === g && (E !== -1 && M[E] !== E && (M[g] = M[E]), T !== -1 && M[T] !== T && (M[g] = M[T])), N !== -1 && (M[N] = g), E !== -1 && g != M[g] && (M[E] = M[g], L.lastIndexOf(E) < U && L.push(E)), T !== -1 && g != M[g] && (M[T] = M[g], L.lastIndexOf(T) < U && L.push(T));
    for (g = 1; g < I; ++g) M[g] === g && (T !== -1 && M[T] !== T ? M[g] = M[T] : E !== -1 && M[E] !== E && (M[g] = M[E]));
    for (g = 1; g < I; ++g)
      if (p[g].type !== 0) {
        if (U = g, U != M[U]) do
          U = M[U], w[g] = w[U] + "/" + w[g];
        while (U !== 0 && M[U] !== -1 && U != M[U]);
        M[g] = -1;
      }
    for (w[0] += "/", g = 1; g < I; ++g)
      p[g].type !== 2 && (w[g] += "/");
  }
  function x(p, w, v) {
    for (var g = p.start, E = p.size, T = [], N = g; v && E > 0 && N >= 0; )
      T.push(w.slice(N * V, N * V + V)), E -= V, N = Cr(v, N * 4);
    return T.length === 0 ? B(0) : Qe(T).slice(0, p.size);
  }
  function _(p, w, v, g, E) {
    var T = q;
    if (p === q) {
      if (w !== 0) throw new Error("DIFAT chain shorter than expected");
    } else if (p !== -1) {
      var N = v[p], U = (g >>> 2) - 1;
      if (!N) return;
      for (var I = 0; I < U && (T = Cr(N, I * 4)) !== q; ++I)
        E.push(T);
      _(Cr(N, g - 4), w - 1, v, g, E);
    }
  }
  function F(p, w, v, g, E) {
    var T = [], N = [];
    E || (E = []);
    var U = g - 1, I = 0, M = 0;
    for (I = w; I >= 0; ) {
      E[I] = !0, T[T.length] = I, N.push(p[I]);
      var L = v[Math.floor(I * 4 / g)];
      if (M = I * 4 & U, g < 4 + M) throw new Error("FAT boundary crossed: " + I + " 4 " + g);
      if (!p[L]) break;
      I = Cr(p[L], M);
    }
    return { nodes: T, data: W0([N]) };
  }
  function A(p, w, v, g) {
    var E = p.length, T = [], N = [], U = [], I = [], M = g - 1, L = 0, Y = 0, ee = 0, ae = 0;
    for (L = 0; L < E; ++L)
      if (U = [], ee = L + w, ee >= E && (ee -= E), !N[ee]) {
        I = [];
        var K = [];
        for (Y = ee; Y >= 0; ) {
          K[Y] = !0, N[Y] = !0, U[U.length] = Y, I.push(p[Y]);
          var re = v[Math.floor(Y * 4 / g)];
          if (ae = Y * 4 & M, g < 4 + ae) throw new Error("FAT boundary crossed: " + Y + " 4 " + g);
          if (!p[re] || (Y = Cr(p[re], ae), K[Y])) break;
        }
        T[ee] = { nodes: U, data: W0([I]) };
      }
    return T;
  }
  function y(p, w, v, g, E, T, N, U) {
    for (var I = 0, M = g.length ? 2 : 0, L = w[p].data, Y = 0, ee = 0, ae; Y < L.length; Y += 128) {
      var K = (
        /*::(*/
        L.slice(Y, Y + 128)
      );
      vt(K, 64), ee = K.read_shift(2), ae = ds(K, 0, ee - M), g.push(ae);
      var re = {
        name: ae,
        type: K.read_shift(1),
        color: K.read_shift(1),
        L: K.read_shift(4, "i"),
        R: K.read_shift(4, "i"),
        C: K.read_shift(4, "i"),
        clsid: K.read_shift(16),
        state: K.read_shift(4, "i"),
        start: 0,
        size: 0
      }, he = K.read_shift(2) + K.read_shift(2) + K.read_shift(2) + K.read_shift(2);
      he !== 0 && (re.ct = O(K, K.l - 8));
      var De = K.read_shift(2) + K.read_shift(2) + K.read_shift(2) + K.read_shift(2);
      De !== 0 && (re.mt = O(K, K.l - 8)), re.start = K.read_shift(4, "i"), re.size = K.read_shift(4, "i"), re.size < 0 && re.start < 0 && (re.size = re.type = 0, re.start = q, re.name = ""), re.type === 5 ? (I = re.start, E > 0 && I !== q && (w[I].name = "!StreamData")) : re.size >= 4096 ? (re.storage = "fat", w[re.start] === void 0 && (w[re.start] = F(v, re.start, w.fat_addrs, w.ssz)), w[re.start].name = re.name, re.content = w[re.start].data.slice(0, re.size)) : (re.storage = "minifat", re.size < 0 ? re.size = 0 : I !== q && re.start !== q && w[I] && (re.content = x(re, w[I].data, (w[U] || {}).data))), re.content && vt(re.content, 0), T[ae] = re, N.push(re);
    }
  }
  function O(p, w) {
    return new Date((wt(p, w + 4) / 1e7 * Math.pow(2, 32) + wt(p, w) / 1e7 - 11644473600) * 1e3);
  }
  function j(p, w) {
    return l(), f(c.readFileSync(p), w);
  }
  function Z(p, w) {
    var v = w && w.type;
    switch (v || we && Buffer.isBuffer(p) && (v = "buffer"), v || "base64") {
      case "file":
        return j(p, w);
      case "base64":
        return f(Dt(Jt(p)), w);
      case "binary":
        return f(Dt(p), w);
    }
    return f(
      /*::typeof blob == 'string' ? new Buffer(blob, 'utf-8') : */
      p,
      w
    );
  }
  function R(p, w) {
    var v = w || {}, g = v.root || "Root Entry";
    if (p.FullPaths || (p.FullPaths = []), p.FileIndex || (p.FileIndex = []), p.FullPaths.length !== p.FileIndex.length) throw new Error("inconsistent CFB structure");
    p.FullPaths.length === 0 && (p.FullPaths[0] = g + "/", p.FileIndex[0] = { name: g, type: 5 }), v.CLSID && (p.FileIndex[0].clsid = v.CLSID), W(p);
  }
  function W(p) {
    var w = "Sh33tJ5";
    if (!ke.find(p, "/" + w)) {
      var v = B(4);
      v[0] = 55, v[1] = v[3] = 50, v[2] = 54, p.FileIndex.push({ name: w, type: 2, content: v, size: 4, L: 69, R: 69, C: 69 }), p.FullPaths.push(p.FullPaths[0] + w), P(p);
    }
  }
  function P(p, w) {
    R(p);
    for (var v = !1, g = !1, E = p.FullPaths.length - 1; E >= 0; --E) {
      var T = p.FileIndex[E];
      switch (T.type) {
        case 0:
          g ? v = !0 : (p.FileIndex.pop(), p.FullPaths.pop());
          break;
        case 1:
        case 2:
        case 5:
          g = !0, isNaN(T.R * T.L * T.C) && (v = !0), T.R > -1 && T.L > -1 && T.R == T.L && (v = !0);
          break;
        default:
          v = !0;
          break;
      }
    }
    if (!(!v && !w)) {
      var N = new Date(1987, 1, 19), U = 0, I = Object.create ? /* @__PURE__ */ Object.create(null) : {}, M = [];
      for (E = 0; E < p.FullPaths.length; ++E)
        I[p.FullPaths[E]] = !0, p.FileIndex[E].type !== 0 && M.push([p.FullPaths[E], p.FileIndex[E]]);
      for (E = 0; E < M.length; ++E) {
        var L = n(M[E][0]);
        g = I[L], g || (M.push([L, {
          name: a(L).replace("/", ""),
          type: 1,
          clsid: Ye,
          ct: N,
          mt: N,
          content: null
        }]), I[L] = !0);
      }
      for (M.sort(function(ae, K) {
        return r(ae[0], K[0]);
      }), p.FullPaths = [], p.FileIndex = [], E = 0; E < M.length; ++E)
        p.FullPaths[E] = M[E][0], p.FileIndex[E] = M[E][1];
      for (E = 0; E < M.length; ++E) {
        var Y = p.FileIndex[E], ee = p.FullPaths[E];
        if (Y.name = a(ee).replace("/", ""), Y.L = Y.R = Y.C = -(Y.color = 1), Y.size = Y.content ? Y.content.length : 0, Y.start = 0, Y.clsid = Y.clsid || Ye, E === 0)
          Y.C = M.length > 1 ? 1 : -1, Y.size = 0, Y.type = 5;
        else if (ee.slice(-1) == "/") {
          for (U = E + 1; U < M.length && n(p.FullPaths[U]) != ee; ++U) ;
          for (Y.C = U >= M.length ? -1 : U, U = E + 1; U < M.length && n(p.FullPaths[U]) != n(ee); ++U) ;
          Y.R = U >= M.length ? -1 : U, Y.type = 1;
        } else
          n(p.FullPaths[E + 1] || "") == n(ee) && (Y.R = E + 1), Y.type = 2;
      }
    }
  }
  function H(p, w) {
    var v = w || {};
    if (v.fileType == "mad") return lf(p, v);
    switch (P(p), v.fileType) {
      case "zip":
        return ef(p, v);
    }
    var g = (function(ae) {
      for (var K = 0, re = 0, he = 0; he < ae.FileIndex.length; ++he) {
        var De = ae.FileIndex[he];
        if (De.content) {
          var Me = De.content.length;
          Me > 0 && (Me < 4096 ? K += Me + 63 >> 6 : re += Me + 511 >> 9);
        }
      }
      for (var tt = ae.FullPaths.length + 3 >> 2, _n = K + 7 >> 3, vn = K + 127 >> 7, gn = _n + re + tt + vn, gr = gn + 127 >> 7, ri = gr <= 109 ? 0 : Math.ceil((gr - 109) / 127); gn + gr + ri + 127 >> 7 > gr; ) ri = ++gr <= 109 ? 0 : Math.ceil((gr - 109) / 127);
      var zt = [1, ri, gr, vn, tt, re, K, 0];
      return ae.FileIndex[0].size = K << 6, zt[7] = (ae.FileIndex[0].start = zt[0] + zt[1] + zt[2] + zt[3] + zt[4] + zt[5]) + (zt[6] + 7 >> 3), zt;
    })(p), E = B(g[7] << 9), T = 0, N = 0;
    {
      for (T = 0; T < 8; ++T) E.write_shift(1, fe[T]);
      for (T = 0; T < 8; ++T) E.write_shift(2, 0);
      for (E.write_shift(2, 62), E.write_shift(2, 3), E.write_shift(2, 65534), E.write_shift(2, 9), E.write_shift(2, 6), T = 0; T < 3; ++T) E.write_shift(2, 0);
      for (E.write_shift(4, 0), E.write_shift(4, g[2]), E.write_shift(4, g[0] + g[1] + g[2] + g[3] - 1), E.write_shift(4, 0), E.write_shift(4, 4096), E.write_shift(4, g[3] ? g[0] + g[1] + g[2] - 1 : q), E.write_shift(4, g[3]), E.write_shift(-4, g[1] ? g[0] - 1 : q), E.write_shift(4, g[1]), T = 0; T < 109; ++T) E.write_shift(-4, T < g[2] ? g[1] + T : -1);
    }
    if (g[1])
      for (N = 0; N < g[1]; ++N) {
        for (; T < 236 + N * 127; ++T) E.write_shift(-4, T < g[2] ? g[1] + T : -1);
        E.write_shift(-4, N === g[1] - 1 ? q : N + 1);
      }
    var U = function(ae) {
      for (N += ae; T < N - 1; ++T) E.write_shift(-4, T + 1);
      ae && (++T, E.write_shift(-4, q));
    };
    for (N = T = 0, N += g[1]; T < N; ++T) E.write_shift(-4, Be.DIFSECT);
    for (N += g[2]; T < N; ++T) E.write_shift(-4, Be.FATSECT);
    U(g[3]), U(g[4]);
    for (var I = 0, M = 0, L = p.FileIndex[0]; I < p.FileIndex.length; ++I)
      L = p.FileIndex[I], L.content && (M = L.content.length, !(M < 4096) && (L.start = N, U(M + 511 >> 9)));
    for (U(g[6] + 7 >> 3); E.l & 511; ) E.write_shift(-4, Be.ENDOFCHAIN);
    for (N = T = 0, I = 0; I < p.FileIndex.length; ++I)
      L = p.FileIndex[I], L.content && (M = L.content.length, !(!M || M >= 4096) && (L.start = N, U(M + 63 >> 6)));
    for (; E.l & 511; ) E.write_shift(-4, Be.ENDOFCHAIN);
    for (T = 0; T < g[4] << 2; ++T) {
      var Y = p.FullPaths[T];
      if (!Y || Y.length === 0) {
        for (I = 0; I < 17; ++I) E.write_shift(4, 0);
        for (I = 0; I < 3; ++I) E.write_shift(4, -1);
        for (I = 0; I < 12; ++I) E.write_shift(4, 0);
        continue;
      }
      L = p.FileIndex[T], T === 0 && (L.start = L.size ? L.start - 1 : q);
      var ee = T === 0 && v.root || L.name;
      if (M = 2 * (ee.length + 1), E.write_shift(64, ee, "utf16le"), E.write_shift(2, M), E.write_shift(1, L.type), E.write_shift(1, L.color), E.write_shift(-4, L.L), E.write_shift(-4, L.R), E.write_shift(-4, L.C), L.clsid) E.write_shift(16, L.clsid, "hex");
      else for (I = 0; I < 4; ++I) E.write_shift(4, 0);
      E.write_shift(4, L.state || 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, L.start), E.write_shift(4, L.size), E.write_shift(4, 0);
    }
    for (T = 1; T < p.FileIndex.length; ++T)
      if (L = p.FileIndex[T], L.size >= 4096)
        if (E.l = L.start + 1 << 9, we && Buffer.isBuffer(L.content))
          L.content.copy(E, E.l, 0, L.size), E.l += L.size + 511 & -512;
        else {
          for (I = 0; I < L.size; ++I) E.write_shift(1, L.content[I]);
          for (; I & 511; ++I) E.write_shift(1, 0);
        }
    for (T = 1; T < p.FileIndex.length; ++T)
      if (L = p.FileIndex[T], L.size > 0 && L.size < 4096)
        if (we && Buffer.isBuffer(L.content))
          L.content.copy(E, E.l, 0, L.size), E.l += L.size + 63 & -64;
        else {
          for (I = 0; I < L.size; ++I) E.write_shift(1, L.content[I]);
          for (; I & 63; ++I) E.write_shift(1, 0);
        }
    if (we)
      E.l = E.length;
    else
      for (; E.l < E.length; ) E.write_shift(1, 0);
    return E;
  }
  function D(p, w) {
    var v = p.FullPaths.map(function(I) {
      return I.toUpperCase();
    }), g = v.map(function(I) {
      var M = I.split("/");
      return M[M.length - (I.slice(-1) == "/" ? 2 : 1)];
    }), E = !1;
    w.charCodeAt(0) === 47 ? (E = !0, w = v[0].slice(0, -1) + w) : E = w.indexOf("/") !== -1;
    var T = w.toUpperCase(), N = E === !0 ? v.indexOf(T) : g.indexOf(T);
    if (N !== -1) return p.FileIndex[N];
    var U = !T.match(da);
    for (T = T.replace(bn, ""), U && (T = T.replace(da, "!")), N = 0; N < v.length; ++N)
      if ((U ? v[N].replace(da, "!") : v[N]).replace(bn, "") == T || (U ? g[N].replace(da, "!") : g[N]).replace(bn, "") == T) return p.FileIndex[N];
    return null;
  }
  var V = 64, q = -2, _e = "d0cf11e0a1b11ae1", fe = [208, 207, 17, 224, 161, 177, 26, 225], Ye = "00000000000000000000000000000000", Be = {
    /* 2.1 Compund File Sector Numbers and Types */
    MAXREGSECT: -6,
    DIFSECT: -4,
    FATSECT: -3,
    ENDOFCHAIN: q,
    FREESECT: -1,
    /* 2.2 Compound File Header */
    HEADER_SIGNATURE: _e,
    HEADER_MINOR_VERSION: "3e00",
    MAXREGSID: -6,
    NOSTREAM: -1,
    HEADER_CLSID: Ye,
    /* 2.6.1 Compound File Directory Entry */
    EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
  };
  function Ot(p, w, v) {
    l();
    var g = H(p, v);
    c.writeFileSync(w, g);
  }
  function Ve(p) {
    for (var w = new Array(p.length), v = 0; v < p.length; ++v) w[v] = String.fromCharCode(p[v]);
    return w.join("");
  }
  function Tt(p, w) {
    var v = H(p, w);
    switch (w && w.type || "buffer") {
      case "file":
        return l(), c.writeFileSync(w.filename, v), v;
      case "binary":
        return typeof v == "string" ? v : Ve(v);
      case "base64":
        return Vn(typeof v == "string" ? v : Ve(v));
      case "buffer":
        if (we) return Buffer.isBuffer(v) ? v : qt(v);
      /* falls through */
      case "array":
        return typeof v == "string" ? Dt(v) : v;
    }
    return v;
  }
  var mt;
  function S(p) {
    try {
      var w = p.InflateRaw, v = new w();
      if (v._processChunk(new Uint8Array([3, 0]), v._finishFlushFlag), v.bytesRead) mt = p;
      else throw new Error("zlib does not expose bytesRead");
    } catch (g) {
      console.error("cannot use native zlib: " + (g.message || g));
    }
  }
  function b(p, w) {
    if (!mt) return Ps(p, w);
    var v = mt.InflateRaw, g = new v(), E = g._processChunk(p.slice(p.l), g._finishFlushFlag);
    return p.l += g.bytesRead, E;
  }
  function k(p) {
    return mt ? mt.deflateRawSync(p) : Rs(p);
  }
  var C = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], z = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], oe = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  function le(p) {
    var w = (p << 1 | p << 11) & 139536 | (p << 5 | p << 15) & 558144;
    return (w >> 16 | w >> 8 | w) & 255;
  }
  for (var se = typeof Uint8Array < "u", te = se ? new Uint8Array(256) : [], Ae = 0; Ae < 256; ++Ae) te[Ae] = le(Ae);
  function ve(p, w) {
    var v = te[p & 255];
    return w <= 8 ? v >>> 8 - w : (v = v << 8 | te[p >> 8 & 255], w <= 16 ? v >>> 16 - w : (v = v << 8 | te[p >> 16 & 255], v >>> 24 - w));
  }
  function it(p, w) {
    var v = w & 7, g = w >>> 3;
    return (p[g] | (v <= 6 ? 0 : p[g + 1] << 8)) >>> v & 3;
  }
  function Ee(p, w) {
    var v = w & 7, g = w >>> 3;
    return (p[g] | (v <= 5 ? 0 : p[g + 1] << 8)) >>> v & 7;
  }
  function Gt(p, w) {
    var v = w & 7, g = w >>> 3;
    return (p[g] | (v <= 4 ? 0 : p[g + 1] << 8)) >>> v & 15;
  }
  function Pe(p, w) {
    var v = w & 7, g = w >>> 3;
    return (p[g] | (v <= 3 ? 0 : p[g + 1] << 8)) >>> v & 31;
  }
  function ie(p, w) {
    var v = w & 7, g = w >>> 3;
    return (p[g] | (v <= 1 ? 0 : p[g + 1] << 8)) >>> v & 127;
  }
  function St(p, w, v) {
    var g = w & 7, E = w >>> 3, T = (1 << v) - 1, N = p[E] >>> g;
    return v < 8 - g || (N |= p[E + 1] << 8 - g, v < 16 - g) || (N |= p[E + 2] << 16 - g, v < 24 - g) || (N |= p[E + 3] << 24 - g), N & T;
  }
  function Vt(p, w, v) {
    var g = w & 7, E = w >>> 3;
    return g <= 5 ? p[E] |= (v & 7) << g : (p[E] |= v << g & 255, p[E + 1] = (v & 7) >> 8 - g), w + 3;
  }
  function _r(p, w, v) {
    var g = w & 7, E = w >>> 3;
    return v = (v & 1) << g, p[E] |= v, w + 1;
  }
  function Wr(p, w, v) {
    var g = w & 7, E = w >>> 3;
    return v <<= g, p[E] |= v & 255, v >>>= 8, p[E + 1] = v, w + 8;
  }
  function As(p, w, v) {
    var g = w & 7, E = w >>> 3;
    return v <<= g, p[E] |= v & 255, v >>>= 8, p[E + 1] = v & 255, p[E + 2] = v >>> 8, w + 16;
  }
  function qa(p, w) {
    var v = p.length, g = 2 * v > w ? 2 * v : w + 5, E = 0;
    if (v >= w) return p;
    if (we) {
      var T = C0(g);
      if (p.copy) p.copy(T);
      else for (; E < p.length; ++E) T[E] = p[E];
      return T;
    } else if (se) {
      var N = new Uint8Array(g);
      if (N.set) N.set(p);
      else for (; E < v; ++E) N[E] = p[E];
      return N;
    }
    return p.length = g, p;
  }
  function bt(p) {
    for (var w = new Array(p), v = 0; v < p; ++v) w[v] = 0;
    return w;
  }
  function aa(p, w, v) {
    var g = 1, E = 0, T = 0, N = 0, U = 0, I = p.length, M = se ? new Uint16Array(32) : bt(32);
    for (T = 0; T < 32; ++T) M[T] = 0;
    for (T = I; T < v; ++T) p[T] = 0;
    I = p.length;
    var L = se ? new Uint16Array(I) : bt(I);
    for (T = 0; T < I; ++T)
      M[E = p[T]]++, g < E && (g = E), L[T] = 0;
    for (M[0] = 0, T = 1; T <= g; ++T) M[T + 16] = U = U + M[T - 1] << 1;
    for (T = 0; T < I; ++T)
      U = p[T], U != 0 && (L[T] = M[U + 16]++);
    var Y = 0;
    for (T = 0; T < I; ++T)
      if (Y = p[T], Y != 0)
        for (U = ve(L[T], g) >> g - Y, N = (1 << g + 4 - Y) - 1; N >= 0; --N)
          w[U | N << Y] = Y & 15 | T << 4;
    return g;
  }
  var Za = se ? new Uint16Array(512) : bt(512), ei = se ? new Uint16Array(32) : bt(32);
  if (!se) {
    for (var vr = 0; vr < 512; ++vr) Za[vr] = 0;
    for (vr = 0; vr < 32; ++vr) ei[vr] = 0;
  }
  (function() {
    for (var p = [], w = 0; w < 32; w++) p.push(5);
    aa(p, ei, 32);
    var v = [];
    for (w = 0; w <= 143; w++) v.push(8);
    for (; w <= 255; w++) v.push(9);
    for (; w <= 279; w++) v.push(7);
    for (; w <= 287; w++) v.push(8);
    aa(v, Za, 288);
  })();
  var Jc = /* @__PURE__ */ (function() {
    for (var w = se ? new Uint8Array(32768) : [], v = 0, g = 0; v < oe.length - 1; ++v)
      for (; g < oe[v + 1]; ++g) w[g] = v;
    for (; g < 32768; ++g) w[g] = 29;
    var E = se ? new Uint8Array(259) : [];
    for (v = 0, g = 0; v < z.length - 1; ++v)
      for (; g < z[v + 1]; ++g) E[g] = v;
    function T(U, I) {
      for (var M = 0; M < U.length; ) {
        var L = Math.min(65535, U.length - M), Y = M + L == U.length;
        for (I.write_shift(1, +Y), I.write_shift(2, L), I.write_shift(2, ~L & 65535); L-- > 0; ) I[I.l++] = U[M++];
      }
      return I.l;
    }
    function N(U, I) {
      for (var M = 0, L = 0, Y = se ? new Uint16Array(32768) : []; L < U.length; ) {
        var ee = (
          /* data.length - boff; */
          Math.min(65535, U.length - L)
        );
        if (ee < 10) {
          for (M = Vt(I, M, +(L + ee == U.length)), M & 7 && (M += 8 - (M & 7)), I.l = M / 8 | 0, I.write_shift(2, ee), I.write_shift(2, ~ee & 65535); ee-- > 0; ) I[I.l++] = U[L++];
          M = I.l * 8;
          continue;
        }
        M = Vt(I, M, +(L + ee == U.length) + 2);
        for (var ae = 0; ee-- > 0; ) {
          var K = U[L];
          ae = (ae << 5 ^ K) & 32767;
          var re = -1, he = 0;
          if ((re = Y[ae]) && (re |= L & -32768, re > L && (re -= 32768), re < L))
            for (; U[re + he] == U[L + he] && he < 250; ) ++he;
          if (he > 2) {
            K = E[he], K <= 22 ? M = Wr(I, M, te[K + 1] >> 1) - 1 : (Wr(I, M, 3), M += 5, Wr(I, M, te[K - 23] >> 5), M += 3);
            var De = K < 8 ? 0 : K - 4 >> 2;
            De > 0 && (As(I, M, he - z[K]), M += De), K = w[L - re], M = Wr(I, M, te[K] >> 3), M -= 3;
            var Me = K < 4 ? 0 : K - 2 >> 1;
            Me > 0 && (As(I, M, L - re - oe[K]), M += Me);
            for (var tt = 0; tt < he; ++tt)
              Y[ae] = L & 32767, ae = (ae << 5 ^ U[L]) & 32767, ++L;
            ee -= he - 1;
          } else
            K <= 143 ? K = K + 48 : M = _r(I, M, 1), M = Wr(I, M, te[K]), Y[ae] = L & 32767, ++L;
        }
        M = Wr(I, M, 0) - 1;
      }
      return I.l = (M + 7) / 8 | 0, I.l;
    }
    return function(I, M) {
      return I.length < 8 ? T(I, M) : N(I, M);
    };
  })();
  function Rs(p) {
    var w = B(50 + Math.floor(p.length * 1.1)), v = Jc(p, w);
    return w.slice(0, v);
  }
  var Os = se ? new Uint16Array(32768) : bt(32768), Is = se ? new Uint16Array(32768) : bt(32768), Ns = se ? new Uint16Array(128) : bt(128), Ds = 1, Ms = 1;
  function Qc(p, w) {
    var v = Pe(p, w) + 257;
    w += 5;
    var g = Pe(p, w) + 1;
    w += 5;
    var E = Gt(p, w) + 4;
    w += 4;
    for (var T = 0, N = se ? new Uint8Array(19) : bt(19), U = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], I = 1, M = se ? new Uint8Array(8) : bt(8), L = se ? new Uint8Array(8) : bt(8), Y = N.length, ee = 0; ee < E; ++ee)
      N[C[ee]] = T = Ee(p, w), I < T && (I = T), M[T]++, w += 3;
    var ae = 0;
    for (M[0] = 0, ee = 1; ee <= I; ++ee) L[ee] = ae = ae + M[ee - 1] << 1;
    for (ee = 0; ee < Y; ++ee) (ae = N[ee]) != 0 && (U[ee] = L[ae]++);
    var K = 0;
    for (ee = 0; ee < Y; ++ee)
      if (K = N[ee], K != 0) {
        ae = te[U[ee]] >> 8 - K;
        for (var re = (1 << 7 - K) - 1; re >= 0; --re) Ns[ae | re << K] = K & 7 | ee << 3;
      }
    var he = [];
    for (I = 1; he.length < v + g; )
      switch (ae = Ns[ie(p, w)], w += ae & 7, ae >>>= 3) {
        case 16:
          for (T = 3 + it(p, w), w += 2, ae = he[he.length - 1]; T-- > 0; ) he.push(ae);
          break;
        case 17:
          for (T = 3 + Ee(p, w), w += 3; T-- > 0; ) he.push(0);
          break;
        case 18:
          for (T = 11 + ie(p, w), w += 7; T-- > 0; ) he.push(0);
          break;
        default:
          he.push(ae), I < ae && (I = ae);
          break;
      }
    var De = he.slice(0, v), Me = he.slice(v);
    for (ee = v; ee < 286; ++ee) De[ee] = 0;
    for (ee = g; ee < 30; ++ee) Me[ee] = 0;
    return Ds = aa(De, Os, 286), Ms = aa(Me, Is, 30), w;
  }
  function qc(p, w) {
    if (p[0] == 3 && !(p[1] & 3))
      return [Nr(w), 2];
    for (var v = 0, g = 0, E = C0(w || 1 << 18), T = 0, N = E.length >>> 0, U = 0, I = 0; (g & 1) == 0; ) {
      if (g = Ee(p, v), v += 3, g >>> 1)
        g >> 1 == 1 ? (U = 9, I = 5) : (v = Qc(p, v), U = Ds, I = Ms);
      else {
        v & 7 && (v += 8 - (v & 7));
        var M = p[v >>> 3] | p[(v >>> 3) + 1] << 8;
        if (v += 32, M > 0)
          for (!w && N < T + M && (E = qa(E, T + M), N = E.length); M-- > 0; )
            E[T++] = p[v >>> 3], v += 8;
        continue;
      }
      for (; ; ) {
        !w && N < T + 32767 && (E = qa(E, T + 32767), N = E.length);
        var L = St(p, v, U), Y = g >>> 1 == 1 ? Za[L] : Os[L];
        if (v += Y & 15, Y >>>= 4, (Y >>> 8 & 255) === 0) E[T++] = Y;
        else {
          if (Y == 256) break;
          Y -= 257;
          var ee = Y < 8 ? 0 : Y - 4 >> 2;
          ee > 5 && (ee = 0);
          var ae = T + z[Y];
          ee > 0 && (ae += St(p, v, ee), v += ee), L = St(p, v, I), Y = g >>> 1 == 1 ? ei[L] : Is[L], v += Y & 15, Y >>>= 4;
          var K = Y < 4 ? 0 : Y - 2 >> 1, re = oe[Y];
          for (K > 0 && (re += St(p, v, K), v += K), !w && N < ae && (E = qa(E, ae + 100), N = E.length); T < ae; )
            E[T] = E[T - re], ++T;
        }
      }
    }
    return w ? [E, v + 7 >>> 3] : [E.slice(0, T), v + 7 >>> 3];
  }
  function Ps(p, w) {
    var v = p.slice(p.l || 0), g = qc(v, w);
    return p.l += g[1], g[0];
  }
  function Ls(p, w) {
    if (p)
      typeof console < "u" && console.error(w);
    else throw new Error(w);
  }
  function bs(p, w) {
    var v = (
      /*::(*/
      p
    );
    vt(v, 0);
    var g = [], E = [], T = {
      FileIndex: g,
      FullPaths: E
    };
    R(T, { root: w.root });
    for (var N = v.length - 4; (v[N] != 80 || v[N + 1] != 75 || v[N + 2] != 5 || v[N + 3] != 6) && N >= 0; ) --N;
    v.l = N + 4, v.l += 4;
    var U = v.read_shift(2);
    v.l += 6;
    var I = v.read_shift(4);
    for (v.l = I, N = 0; N < U; ++N) {
      v.l += 20;
      var M = v.read_shift(4), L = v.read_shift(4), Y = v.read_shift(2), ee = v.read_shift(2), ae = v.read_shift(2);
      v.l += 8;
      var K = v.read_shift(4), re = o(
        /*::(*/
        v.slice(v.l + Y, v.l + Y + ee)
        /*:: :any)*/
      );
      v.l += Y + ee + ae;
      var he = v.l;
      v.l = K + 4, Zc(v, M, L, T, re), v.l = he;
    }
    return T;
  }
  function Zc(p, w, v, g, E) {
    p.l += 2;
    var T = p.read_shift(2), N = p.read_shift(2), U = s(p);
    if (T & 8257) throw new Error("Unsupported ZIP encryption");
    for (var I = p.read_shift(4), M = p.read_shift(4), L = p.read_shift(4), Y = p.read_shift(2), ee = p.read_shift(2), ae = "", K = 0; K < Y; ++K) ae += String.fromCharCode(p[p.l++]);
    if (ee) {
      var re = o(
        /*::(*/
        p.slice(p.l, p.l + ee)
        /*:: :any)*/
      );
      (re[21589] || {}).mt && (U = re[21589].mt), ((E || {})[21589] || {}).mt && (U = E[21589].mt);
    }
    p.l += ee;
    var he = p.slice(p.l, p.l + M);
    switch (N) {
      case 8:
        he = b(p, L);
        break;
      case 0:
        break;
      // TODO: scan for magic number
      default:
        throw new Error("Unsupported ZIP Compression method " + N);
    }
    var De = !1;
    T & 8 && (I = p.read_shift(4), I == 134695760 && (I = p.read_shift(4), De = !0), M = p.read_shift(4), L = p.read_shift(4)), M != w && Ls(De, "Bad compressed size: " + w + " != " + M), L != v && Ls(De, "Bad uncompressed size: " + v + " != " + L), ti(g, ae, he, { unsafe: !0, mt: U });
  }
  function ef(p, w) {
    var v = w || {}, g = [], E = [], T = B(1), N = v.compression ? 8 : 0, U = 0, I = 0, M = 0, L = 0, Y = 0, ee = p.FullPaths[0], ae = ee, K = p.FileIndex[0], re = [], he = 0;
    for (I = 1; I < p.FullPaths.length; ++I)
      if (ae = p.FullPaths[I].slice(ee.length), K = p.FileIndex[I], !(!K.size || !K.content || ae == "Sh33tJ5")) {
        var De = L, Me = B(ae.length);
        for (M = 0; M < ae.length; ++M) Me.write_shift(1, ae.charCodeAt(M) & 127);
        Me = Me.slice(0, Me.l), re[Y] = j1.buf(
          /*::((*/
          K.content,
          0
        );
        var tt = K.content;
        N == 8 && (tt = k(tt)), T = B(30), T.write_shift(4, 67324752), T.write_shift(2, 20), T.write_shift(2, U), T.write_shift(2, N), K.mt ? i(T, K.mt) : T.write_shift(4, 0), T.write_shift(-4, re[Y]), T.write_shift(4, tt.length), T.write_shift(
          4,
          /*::(*/
          K.content.length
        ), T.write_shift(2, Me.length), T.write_shift(2, 0), L += T.length, g.push(T), L += Me.length, g.push(Me), L += tt.length, g.push(tt), T = B(46), T.write_shift(4, 33639248), T.write_shift(2, 0), T.write_shift(2, 20), T.write_shift(2, U), T.write_shift(2, N), T.write_shift(4, 0), T.write_shift(-4, re[Y]), T.write_shift(4, tt.length), T.write_shift(
          4,
          /*::(*/
          K.content.length
        ), T.write_shift(2, Me.length), T.write_shift(2, 0), T.write_shift(2, 0), T.write_shift(2, 0), T.write_shift(2, 0), T.write_shift(4, 0), T.write_shift(4, De), he += T.l, E.push(T), he += Me.length, E.push(Me), ++Y;
      }
    return T = B(22), T.write_shift(4, 101010256), T.write_shift(2, 0), T.write_shift(2, 0), T.write_shift(2, Y), T.write_shift(2, Y), T.write_shift(4, he), T.write_shift(4, L), T.write_shift(2, 0), Qe([Qe(g), Qe(E), T]);
  }
  var ia = {
    htm: "text/html",
    xml: "text/xml",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    mso: "application/x-mso",
    thmx: "application/vnd.ms-officetheme",
    sh33tj5: "application/octet-stream"
  };
  function tf(p, w) {
    if (p.ctype) return p.ctype;
    var v = p.name || "", g = v.match(/\.([^\.]+)$/);
    return g && ia[g[1]] || w && (g = (v = w).match(/[\.\\]([^\.\\])+$/), g && ia[g[1]]) ? ia[g[1]] : "application/octet-stream";
  }
  function rf(p) {
    for (var w = Vn(p), v = [], g = 0; g < w.length; g += 76) v.push(w.slice(g, g + 76));
    return v.join(`\r
`) + `\r
`;
  }
  function nf(p) {
    var w = p.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(M) {
      var L = M.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (L.length == 1 ? "0" + L : L);
    });
    w = w.replace(/ $/mg, "=20").replace(/\t$/mg, "=09"), w.charAt(0) == `
` && (w = "=0D" + w.slice(1)), w = w.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, `
=0A`).replace(/([^\r\n])\n/mg, "$1=0A");
    for (var v = [], g = w.split(`\r
`), E = 0; E < g.length; ++E) {
      var T = g[E];
      if (T.length == 0) {
        v.push("");
        continue;
      }
      for (var N = 0; N < T.length; ) {
        var U = 76, I = T.slice(N, N + U);
        I.charAt(U - 1) == "=" ? U-- : I.charAt(U - 2) == "=" ? U -= 2 : I.charAt(U - 3) == "=" && (U -= 3), I = T.slice(N, N + U), N += U, N < T.length && (I += "="), v.push(I);
      }
    }
    return v.join(`\r
`);
  }
  function af(p) {
    for (var w = [], v = 0; v < p.length; ++v) {
      for (var g = p[v]; v <= p.length && g.charAt(g.length - 1) == "="; ) g = g.slice(0, g.length - 1) + p[++v];
      w.push(g);
    }
    for (var E = 0; E < w.length; ++E) w[E] = w[E].replace(/[=][0-9A-Fa-f]{2}/g, function(T) {
      return String.fromCharCode(parseInt(T.slice(1), 16));
    });
    return Dt(w.join(`\r
`));
  }
  function sf(p, w, v) {
    for (var g = "", E = "", T = "", N, U = 0; U < 10; ++U) {
      var I = w[U];
      if (!I || I.match(/^\s*$/)) break;
      var M = I.match(/^(.*?):\s*([^\s].*)$/);
      if (M) switch (M[1].toLowerCase()) {
        case "content-location":
          g = M[2].trim();
          break;
        case "content-type":
          T = M[2].trim();
          break;
        case "content-transfer-encoding":
          E = M[2].trim();
          break;
      }
    }
    switch (++U, E.toLowerCase()) {
      case "base64":
        N = Dt(Jt(w.slice(U).join("")));
        break;
      case "quoted-printable":
        N = af(w.slice(U));
        break;
      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + E);
    }
    var L = ti(p, g.slice(v.length), N, { unsafe: !0 });
    T && (L.ctype = T);
  }
  function of(p, w) {
    if (Ve(p.slice(0, 13)).toLowerCase() != "mime-version:") throw new Error("Unsupported MAD header");
    var v = w && w.root || "", g = (we && Buffer.isBuffer(p) ? p.toString("binary") : Ve(p)).split(`\r
`), E = 0, T = "";
    for (E = 0; E < g.length; ++E)
      if (T = g[E], !!/^Content-Location:/i.test(T) && (T = T.slice(T.indexOf("file")), v || (v = T.slice(0, T.lastIndexOf("/") + 1)), T.slice(0, v.length) != v))
        for (; v.length > 0 && (v = v.slice(0, v.length - 1), v = v.slice(0, v.lastIndexOf("/") + 1), T.slice(0, v.length) != v); )
          ;
    var N = (g[1] || "").match(/boundary="(.*?)"/);
    if (!N) throw new Error("MAD cannot find boundary");
    var U = "--" + (N[1] || ""), I = [], M = [], L = {
      FileIndex: I,
      FullPaths: M
    };
    R(L);
    var Y, ee = 0;
    for (E = 0; E < g.length; ++E) {
      var ae = g[E];
      ae !== U && ae !== U + "--" || (ee++ && sf(L, g.slice(Y, E), v), Y = E);
    }
    return L;
  }
  function lf(p, w) {
    var v = w || {}, g = v.boundary || "SheetJS";
    g = "------=" + g;
    for (var E = [
      "MIME-Version: 1.0",
      'Content-Type: multipart/related; boundary="' + g.slice(2) + '"',
      "",
      "",
      ""
    ], T = p.FullPaths[0], N = T, U = p.FileIndex[0], I = 1; I < p.FullPaths.length; ++I)
      if (N = p.FullPaths[I].slice(T.length), U = p.FileIndex[I], !(!U.size || !U.content || N == "Sh33tJ5")) {
        N = N.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(he) {
          return "_x" + he.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function(he) {
          return "_u" + he.charCodeAt(0).toString(16) + "_";
        });
        for (var M = U.content, L = we && Buffer.isBuffer(M) ? M.toString("binary") : Ve(M), Y = 0, ee = Math.min(1024, L.length), ae = 0, K = 0; K <= ee; ++K) (ae = L.charCodeAt(K)) >= 32 && ae < 128 && ++Y;
        var re = Y >= ee * 4 / 5;
        E.push(g), E.push("Content-Location: " + (v.root || "file:///C:/SheetJS/") + N), E.push("Content-Transfer-Encoding: " + (re ? "quoted-printable" : "base64")), E.push("Content-Type: " + tf(U, N)), E.push(""), E.push(re ? nf(L) : rf(L));
      }
    return E.push(g + `--\r
`), E.join(`\r
`);
  }
  function cf(p) {
    var w = {};
    return R(w, p), w;
  }
  function ti(p, w, v, g) {
    var E = g && g.unsafe;
    E || R(p);
    var T = !E && ke.find(p, w);
    if (!T) {
      var N = p.FullPaths[0];
      w.slice(0, N.length) == N ? N = w : (N.slice(-1) != "/" && (N += "/"), N = (N + w).replace("//", "/")), T = { name: a(w), type: 2 }, p.FileIndex.push(T), p.FullPaths.push(N), E || ke.utils.cfb_gc(p);
    }
    return T.content = v, T.size = v ? v.length : 0, g && (g.CLSID && (T.clsid = g.CLSID), g.mt && (T.mt = g.mt), g.ct && (T.ct = g.ct)), T;
  }
  function ff(p, w) {
    R(p);
    var v = ke.find(p, w);
    if (v) {
      for (var g = 0; g < p.FileIndex.length; ++g) if (p.FileIndex[g] == v)
        return p.FileIndex.splice(g, 1), p.FullPaths.splice(g, 1), !0;
    }
    return !1;
  }
  function uf(p, w, v) {
    R(p);
    var g = ke.find(p, w);
    if (g) {
      for (var E = 0; E < p.FileIndex.length; ++E) if (p.FileIndex[E] == g)
        return p.FileIndex[E].name = a(v), p.FullPaths[E] = v, !0;
    }
    return !1;
  }
  function hf(p) {
    P(p, !0);
  }
  return t.find = D, t.read = Z, t.parse = f, t.write = Tt, t.writeFile = Ot, t.utils = {
    cfb_new: cf,
    cfb_add: ti,
    cfb_del: ff,
    cfb_mov: uf,
    cfb_gc: hf,
    ReadShift: Un,
    CheckField: zl,
    prep_blob: vt,
    bconcat: Qe,
    use_zlib: S,
    _deflateRaw: Rs,
    _inflateRaw: Ps,
    consts: Be
  }, t;
})();
function X1(e) {
  return typeof e == "string" ? Va(e) : Array.isArray(e) ? g1(e) : e;
}
function Zn(e, t, r) {
  if (typeof Deno < "u") {
    if (r && typeof t == "string") switch (r) {
      case "utf8":
        t = new TextEncoder(r).encode(t);
        break;
      case "binary":
        t = Va(t);
        break;
      /* TODO: binary equivalent */
      default:
        throw new Error("Unsupported encoding " + r);
    }
    return Deno.writeFileSync(e, t);
  }
  var n = r == "utf8" ? jn(t) : t;
  if (typeof IE_SaveFile < "u") return IE_SaveFile(n, e);
  if (typeof Blob < "u") {
    var a = new Blob([X1(n)], { type: "application/octet-stream" });
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
    return o.open("w"), o.encoding = "binary", Array.isArray(t) && (t = qn(t)), o.write(t), o.close(), t;
  } catch (c) {
    if (!c.message || !c.message.match(/onstruct/)) throw c;
  }
  throw new Error("cannot save file " + e);
}
function et(e) {
  for (var t = Object.keys(e), r = [], n = 0; n < t.length; ++n) Object.prototype.hasOwnProperty.call(e, t[n]) && r.push(t[n]);
  return r;
}
function D0(e, t) {
  for (var r = [], n = et(e), a = 0; a !== n.length; ++a) r[e[n[a]][t]] == null && (r[e[n[a]][t]] = n[a]);
  return r;
}
function cs(e) {
  for (var t = [], r = et(e), n = 0; n !== r.length; ++n) t[e[r[n]]] = r[n];
  return t;
}
function Xa(e) {
  for (var t = [], r = et(e), n = 0; n !== r.length; ++n) t[e[r[n]]] = parseInt(r[n], 10);
  return t;
}
function Y1(e) {
  for (var t = [], r = et(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] == null && (t[e[r[n]]] = []), t[e[r[n]]].push(r[n]);
  return t;
}
var Na = /* @__PURE__ */ new Date(1899, 11, 30, 0, 0, 0);
function dt(e, t) {
  var r = /* @__PURE__ */ e.getTime(), n = /* @__PURE__ */ Na.getTime() + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ Na.getTimezoneOffset()) * 6e4;
  return (r - n) / (1440 * 60 * 1e3);
}
var Al = /* @__PURE__ */ new Date(), K1 = /* @__PURE__ */ Na.getTime() + (/* @__PURE__ */ Al.getTimezoneOffset() - /* @__PURE__ */ Na.getTimezoneOffset()) * 6e4, M0 = /* @__PURE__ */ Al.getTimezoneOffset();
function Rl(e) {
  var t = /* @__PURE__ */ new Date();
  return t.setTime(e * 24 * 60 * 60 * 1e3 + K1), t.getTimezoneOffset() !== M0 && t.setTime(t.getTime() + (t.getTimezoneOffset() - M0) * 6e4), t;
}
var P0 = /* @__PURE__ */ new Date("2017-02-19T19:06:09.000Z"), Ol = /* @__PURE__ */ isNaN(/* @__PURE__ */ P0.getFullYear()) ? /* @__PURE__ */ new Date("2/19/17") : P0, J1 = /* @__PURE__ */ Ol.getFullYear() == 2017;
function ft(e, t) {
  var r = new Date(e);
  if (J1)
    return t > 0 ? r.setTime(r.getTime() + r.getTimezoneOffset() * 60 * 1e3) : t < 0 && r.setTime(r.getTime() - r.getTimezoneOffset() * 60 * 1e3), r;
  if (e instanceof Date) return e;
  if (Ol.getFullYear() == 1917 && !isNaN(r.getFullYear())) {
    var n = r.getFullYear();
    return e.indexOf("" + n) > -1 || r.setFullYear(r.getFullYear() + 100), r;
  }
  var a = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"], i = new Date(+a[0], +a[1] - 1, +a[2], +a[3] || 0, +a[4] || 0, +a[5] || 0);
  return e.indexOf("Z") > -1 && (i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3)), i;
}
function Ya(e, t) {
  if (we && Buffer.isBuffer(e))
    return e.toString("binary");
  if (typeof TextDecoder < "u") try {
    var r = {
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
      return r[i] || i;
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
  var t = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = xt(e[r]));
  return t;
}
function Le(e, t) {
  for (var r = ""; r.length < t; ) r += e;
  return r;
}
function Yt(e) {
  var t = Number(e);
  if (!isNaN(t)) return isFinite(t) ? t : NaN;
  if (!/\d/.test(e)) return t;
  var r = 1, n = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function() {
    return r *= 100, "";
  });
  return !isNaN(t = Number(n)) || (n = n.replace(/[(](.*)[)]/, function(a, i) {
    return r = -r, i;
  }), !isNaN(t = Number(n))) ? t / r : t;
}
var Q1 = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function zn(e) {
  var t = new Date(e), r = /* @__PURE__ */ new Date(NaN), n = t.getYear(), a = t.getMonth(), i = t.getDate();
  if (isNaN(i)) return r;
  var s = e.toLowerCase();
  if (s.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (s = s.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), s.length > 3 && Q1.indexOf(s) == -1) return r;
  } else if (s.match(/[a-z]/)) return r;
  return n < 0 || n > 8099 ? r : (a > 0 || i > 1) && n != 101 ? t : e.match(/[^-0-9:,\/\\]/) ? r : t;
}
function de(e, t, r) {
  if (e.FullPaths) {
    if (typeof r == "string") {
      var n;
      return we ? n = qt(r) : n = w1(r), ke.utils.cfb_add(e, t, n);
    }
    ke.utils.cfb_add(e, t, r);
  } else e.file(t, r);
}
function fs() {
  return ke.utils.cfb_new();
}
var He = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`, q1 = {
  "&quot;": '"',
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&amp;": "&"
}, us = /* @__PURE__ */ cs(q1), hs = /[&<>'"]/g, Z1 = /[\u0000-\u0008\u000b-\u001f]/g;
function Ce(e) {
  var t = e + "";
  return t.replace(hs, function(r) {
    return us[r];
  }).replace(Z1, function(r) {
    return "_x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + "_";
  });
}
function L0(e) {
  return Ce(e).replace(/ /g, "_x0020_");
}
var Il = /[\u0000-\u001f]/g;
function ed(e) {
  var t = e + "";
  return t.replace(hs, function(r) {
    return us[r];
  }).replace(/\n/g, "<br/>").replace(Il, function(r) {
    return "&#x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}
function td(e) {
  var t = e + "";
  return t.replace(hs, function(r) {
    return us[r];
  }).replace(Il, function(r) {
    return "&#x" + r.charCodeAt(0).toString(16).toUpperCase() + ";";
  });
}
function rd(e) {
  return e.replace(/(\r\n|[\r\n])/g, "&#10;");
}
function nd(e) {
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
function xi(e) {
  for (var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, o = 0; r < e.length; ) {
    if (n = e.charCodeAt(r++), n < 128) {
      t += String.fromCharCode(n);
      continue;
    }
    if (a = e.charCodeAt(r++), n > 191 && n < 224) {
      s = (n & 31) << 6, s |= a & 63, t += String.fromCharCode(s);
      continue;
    }
    if (i = e.charCodeAt(r++), n < 240) {
      t += String.fromCharCode((n & 15) << 12 | (a & 63) << 6 | i & 63);
      continue;
    }
    s = e.charCodeAt(r++), o = ((n & 7) << 18 | (a & 63) << 12 | (i & 63) << 6 | s & 63) - 65536, t += String.fromCharCode(55296 + (o >>> 10 & 1023)), t += String.fromCharCode(56320 + (o & 1023));
  }
  return t;
}
function b0(e) {
  var t = Nr(2 * e.length), r, n, a = 1, i = 0, s = 0, o;
  for (n = 0; n < e.length; n += a)
    a = 1, (o = e.charCodeAt(n)) < 128 ? r = o : o < 224 ? (r = (o & 31) * 64 + (e.charCodeAt(n + 1) & 63), a = 2) : o < 240 ? (r = (o & 15) * 4096 + (e.charCodeAt(n + 1) & 63) * 64 + (e.charCodeAt(n + 2) & 63), a = 3) : (a = 4, r = (o & 7) * 262144 + (e.charCodeAt(n + 1) & 63) * 4096 + (e.charCodeAt(n + 2) & 63) * 64 + (e.charCodeAt(n + 3) & 63), r -= 65536, s = 55296 + (r >>> 10 & 1023), r = 56320 + (r & 1023)), s !== 0 && (t[i++] = s & 255, t[i++] = s >>> 8, s = 0), t[i++] = r % 256, t[i++] = r >>> 8;
  return t.slice(0, i).toString("ucs2");
}
function B0(e) {
  return qt(e, "binary").toString("utf8");
}
var pa = "foo bar bazâð£", Bn = we && (/* @__PURE__ */ B0(pa) == /* @__PURE__ */ xi(pa) && B0 || /* @__PURE__ */ b0(pa) == /* @__PURE__ */ xi(pa) && b0) || xi, jn = we ? function(e) {
  return qt(e, "utf8").toString("binary");
} : function(e) {
  for (var t = [], r = 0, n = 0, a = 0; r < e.length; )
    switch (n = e.charCodeAt(r++), !0) {
      case n < 128:
        t.push(String.fromCharCode(n));
        break;
      case n < 2048:
        t.push(String.fromCharCode(192 + (n >> 6))), t.push(String.fromCharCode(128 + (n & 63)));
        break;
      case (n >= 55296 && n < 57344):
        n -= 55296, a = e.charCodeAt(r++) - 56320 + (n << 10), t.push(String.fromCharCode(240 + (a >> 18 & 7))), t.push(String.fromCharCode(144 + (a >> 12 & 63))), t.push(String.fromCharCode(128 + (a >> 6 & 63))), t.push(String.fromCharCode(128 + (a & 63)));
        break;
      default:
        t.push(String.fromCharCode(224 + (n >> 12))), t.push(String.fromCharCode(128 + (n >> 6 & 63))), t.push(String.fromCharCode(128 + (n & 63)));
    }
  return t.join("");
}, ad = /* @__PURE__ */ (function() {
  var e = [
    ["nbsp", " "],
    ["middot", "·"],
    ["quot", '"'],
    ["apos", "'"],
    ["gt", ">"],
    ["lt", "<"],
    ["amp", "&"]
  ].map(function(t) {
    return [new RegExp("&" + t[0] + ";", "ig"), t[1]];
  });
  return function(r) {
    for (var n = r.replace(/^[\t\n\r ]+/, "").replace(/[\t\n\r ]+$/, "").replace(/>\s+/g, ">").replace(/\s+</g, "<").replace(/[\t\n\r ]+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, `
`).replace(/<[^>]*>/g, ""), a = 0; a < e.length; ++a) n = n.replace(e[a][0], e[a][1]);
    return n;
  };
})(), Nl = /(^\s|\s$|\n)/;
function qe(e, t) {
  return "<" + e + (t.match(Nl) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e + ">";
}
function Xn(e) {
  return et(e).map(function(t) {
    return " " + t + '="' + e[t] + '"';
  }).join("");
}
function J(e, t, r) {
  return "<" + e + (r != null ? Xn(r) : "") + (t != null ? (t.match(Nl) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e : "/") + ">";
}
function ji(e, t) {
  try {
    return e.toISOString().replace(/\.\d*/, "");
  } catch (r) {
    if (t) throw r;
  }
  return "";
}
function id(e, t) {
  switch (typeof e) {
    case "string":
      var r = J("vt:lpwstr", Ce(e));
      return r = r.replace(/&quot;/g, "_x0022_"), r;
    case "number":
      return J((e | 0) == e ? "vt:i4" : "vt:r8", Ce(String(e)));
    case "boolean":
      return J("vt:bool", e ? "true" : "false");
  }
  if (e instanceof Date) return J("vt:filetime", ji(e));
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
}, dn = [
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://purl.oclc.org/ooxml/spreadsheetml/main",
  "http://schemas.microsoft.com/office/excel/2006/main",
  "http://schemas.microsoft.com/office/excel/2006/2"
], gt = {
  o: "urn:schemas-microsoft-com:office:office",
  x: "urn:schemas-microsoft-com:office:excel",
  ss: "urn:schemas-microsoft-com:office:spreadsheet",
  dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
  mv: "http://macVmlSchemaUri",
  v: "urn:schemas-microsoft-com:vml",
  html: "http://www.w3.org/TR/REC-html40"
};
function sd(e, t) {
  for (var r = 1 - 2 * (e[t + 7] >>> 7), n = ((e[t + 7] & 127) << 4) + (e[t + 6] >>> 4 & 15), a = e[t + 6] & 15, i = 5; i >= 0; --i) a = a * 256 + e[t + i];
  return n == 2047 ? a == 0 ? r * (1 / 0) : NaN : (n == 0 ? n = -1022 : (n -= 1023, a += Math.pow(2, 52)), r * Math.pow(2, n - 52) * a);
}
function od(e, t, r) {
  var n = (t < 0 || 1 / t == -1 / 0 ? 1 : 0) << 7, a = 0, i = 0, s = n ? -t : t;
  isFinite(s) ? s == 0 ? a = i = 0 : (a = Math.floor(Math.log(s) / Math.LN2), i = s * Math.pow(2, 52 - a), a <= -1023 && (!isFinite(i) || i < Math.pow(2, 52)) ? a = -1022 : (i -= Math.pow(2, 52), a += 1023)) : (a = 2047, i = isNaN(t) ? 26985 : 0);
  for (var o = 0; o <= 5; ++o, i /= 256) e[r + o] = i & 255;
  e[r + 6] = (a & 15) << 4 | i & 15, e[r + 7] = a >> 4 | n;
}
var U0 = function(e) {
  for (var t = [], r = 10240, n = 0; n < e[0].length; ++n) if (e[0][n]) for (var a = 0, i = e[0][n].length; a < i; a += r) t.push.apply(t, e[0][n].slice(a, a + r));
  return t;
}, W0 = we ? function(e) {
  return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(t) {
    return Buffer.isBuffer(t) ? t : qt(t);
  })) : U0(e);
} : U0, $0 = function(e, t, r) {
  for (var n = [], a = t; a < r; a += 2) n.push(String.fromCharCode(Dn(e, a)));
  return n.join("").replace(bn, "");
}, ds = we ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("utf16le", t, r).replace(bn, "") : $0(e, t, r);
} : $0, H0 = function(e, t, r) {
  for (var n = [], a = t; a < t + r; ++a) n.push(("0" + e[a].toString(16)).slice(-2));
  return n.join("");
}, Dl = we ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("hex", t, t + r) : H0(e, t, r);
} : H0, G0 = function(e, t, r) {
  for (var n = [], a = t; a < r; a++) n.push(String.fromCharCode(Qr(e, a)));
  return n.join("");
}, ea = we ? function(t, r, n) {
  return Buffer.isBuffer(t) ? t.toString("utf8", r, n) : G0(t, r, n);
} : G0, Ml = function(e, t) {
  var r = wt(e, t);
  return r > 0 ? ea(e, t + 4, t + 4 + r - 1) : "";
}, Pl = Ml, Ll = function(e, t) {
  var r = wt(e, t);
  return r > 0 ? ea(e, t + 4, t + 4 + r - 1) : "";
}, bl = Ll, Bl = function(e, t) {
  var r = 2 * wt(e, t);
  return r > 0 ? ea(e, t + 4, t + 4 + r - 1) : "";
}, Ul = Bl, Wl = function(t, r) {
  var n = wt(t, r);
  return n > 0 ? ds(t, r + 4, r + 4 + n) : "";
}, $l = Wl, Hl = function(e, t) {
  var r = wt(e, t);
  return r > 0 ? ea(e, t + 4, t + 4 + r) : "";
}, Gl = Hl, Vl = function(e, t) {
  return sd(e, t);
}, Da = Vl, xs = function(t) {
  return Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
};
we && (Pl = function(t, r) {
  if (!Buffer.isBuffer(t)) return Ml(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, bl = function(t, r) {
  if (!Buffer.isBuffer(t)) return Ll(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, Ul = function(t, r) {
  if (!Buffer.isBuffer(t)) return Bl(t, r);
  var n = 2 * t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n - 1);
}, $l = function(t, r) {
  if (!Buffer.isBuffer(t)) return Wl(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n);
}, Gl = function(t, r) {
  if (!Buffer.isBuffer(t)) return Hl(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf8", r + 4, r + 4 + n);
}, Da = function(t, r) {
  return Buffer.isBuffer(t) ? t.readDoubleLE(r) : Vl(t, r);
}, xs = function(t) {
  return Buffer.isBuffer(t) || Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
});
var Qr = function(e, t) {
  return e[t];
}, Dn = function(e, t) {
  return e[t + 1] * 256 + e[t];
}, ld = function(e, t) {
  var r = e[t + 1] * 256 + e[t];
  return r < 32768 ? r : (65535 - r + 1) * -1;
}, wt = function(e, t) {
  return e[t + 3] * (1 << 24) + (e[t + 2] << 16) + (e[t + 1] << 8) + e[t];
}, Cr = function(e, t) {
  return e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t];
}, cd = function(e, t) {
  return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3];
};
function Un(e, t) {
  var r = "", n, a, i = [], s, o, c, l;
  switch (t) {
    case "dbcs":
      if (l = this.l, we && Buffer.isBuffer(this)) r = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else for (c = 0; c < e; ++c)
        r += String.fromCharCode(Dn(this, l)), l += 2;
      e *= 2;
      break;
    case "utf8":
      r = ea(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, r = ds(this, this.l, this.l + e);
      break;
    case "wstr":
      return Un.call(this, e, "dbcs");
    /* [MS-OLEDS] 2.1.4 LengthPrefixedAnsiString */
    case "lpstr-ansi":
      r = Pl(this, this.l), e = 4 + wt(this, this.l);
      break;
    case "lpstr-cp":
      r = bl(this, this.l), e = 4 + wt(this, this.l);
      break;
    /* [MS-OLEDS] 2.1.5 LengthPrefixedUnicodeString */
    case "lpwstr":
      r = Ul(this, this.l), e = 4 + 2 * wt(this, this.l);
      break;
    /* [MS-OFFCRYPTO] 2.1.2 Length-Prefixed Padded Unicode String (UNICODE-LP-P4) */
    case "lpp4":
      e = 4 + wt(this, this.l), r = $l(this, this.l), e & 2 && (e += 2);
      break;
    /* [MS-OFFCRYPTO] 2.1.3 Length-Prefixed UTF-8 String (UTF-8-LP-P4) */
    case "8lpp4":
      e = 4 + wt(this, this.l), r = Gl(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, r = ""; (s = Qr(this, this.l + e++)) !== 0; ) i.push(ha(s));
      r = i.join("");
      break;
    case "_wstr":
      for (e = 0, r = ""; (s = Dn(this, this.l + e)) !== 0; )
        i.push(ha(s)), e += 2;
      e += 2, r = i.join("");
      break;
    /* sbcs and dbcs support continue records in the SST way TODO codepages */
    case "dbcs-cont":
      for (r = "", l = this.l, c = 0; c < e; ++c) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return s = Qr(this, l), this.l = l + 1, o = Un.call(this, e - c, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + o;
        i.push(ha(Dn(this, l))), l += 2;
      }
      r = i.join(""), e *= 2;
      break;
    case "cpstr":
    /* falls through */
    case "sbcs-cont":
      for (r = "", l = this.l, c = 0; c != e; ++c) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return s = Qr(this, l), this.l = l + 1, o = Un.call(this, e - c, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + o;
        i.push(ha(Qr(this, l))), l += 1;
      }
      r = i.join("");
      break;
    default:
      switch (e) {
        case 1:
          return n = Qr(this, this.l), this.l++, n;
        case 2:
          return n = (t === "i" ? ld : Dn)(this, this.l), this.l += 2, n;
        case 4:
        case -4:
          return t === "i" || (this[this.l + 3] & 128) === 0 ? (n = (e > 0 ? Cr : cd)(this, this.l), this.l += 4, n) : (a = wt(this, this.l), this.l += 4, a);
        case 8:
        case -8:
          if (t === "f")
            return e == 8 ? a = Da(this, this.l) : a = Da([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, a;
          e = 8;
        /* falls through */
        case 16:
          r = Dl(this, this.l, e);
          break;
      }
  }
  return this.l += e, r;
}
var fd = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255, e[r + 2] = t >>> 16 & 255, e[r + 3] = t >>> 24 & 255;
}, ud = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >> 8 & 255, e[r + 2] = t >> 16 & 255, e[r + 3] = t >> 24 & 255;
}, hd = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255;
};
function dd(e, t, r) {
  var n = 0, a = 0;
  if (r === "dbcs") {
    for (a = 0; a != t.length; ++a) hd(this, t.charCodeAt(a), this.l + 2 * a);
    n = 2 * t.length;
  } else if (r === "sbcs") {
    for (t = t.replace(/[^\x00-\x7F]/g, "_"), a = 0; a != t.length; ++a) this[this.l + a] = t.charCodeAt(a) & 255;
    n = t.length;
  } else if (r === "hex") {
    for (; a < e; ++a)
      this[this.l++] = parseInt(t.slice(2 * a, 2 * a + 2), 16) || 0;
    return this;
  } else if (r === "utf16le") {
    var i = Math.min(this.l + e, this.length);
    for (a = 0; a < Math.min(t.length, e); ++a) {
      var s = t.charCodeAt(a);
      this[this.l++] = s & 255, this[this.l++] = s >> 8;
    }
    for (; this.l < i; ) this[this.l++] = 0;
    return this;
  } else switch (e) {
    case 1:
      n = 1, this[this.l] = t & 255;
      break;
    case 2:
      n = 2, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255;
      break;
    case 3:
      n = 3, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255, t >>>= 8, this[this.l + 2] = t & 255;
      break;
    case 4:
      n = 4, fd(this, t, this.l);
      break;
    case 8:
      if (n = 8, r === "f") {
        od(this, t, this.l);
        break;
      }
    /* falls through */
    case 16:
      break;
    case -4:
      n = 4, ud(this, t, this.l);
      break;
  }
  return this.l += n, this;
}
function zl(e, t) {
  var r = Dl(this, this.l, e.length >> 1);
  if (r !== e) throw new Error(t + "Expected " + e + " saw " + r);
  this.l += e.length >> 1;
}
function vt(e, t) {
  e.l = t, e.read_shift = /*::(*/
  Un, e.chk = zl, e.write_shift = dd;
}
function Ht(e, t) {
  e.l += t;
}
function B(e) {
  var t = Nr(e);
  return vt(t, 0), t;
}
function ht() {
  var e = [], t = we ? 256 : 2048, r = function(l) {
    var f = B(l);
    return vt(f, 0), f;
  }, n = r(t), a = function() {
    n && (n.length > n.l && (n = n.slice(0, n.l), n.l = n.length), n.length > 0 && e.push(n), n = null);
  }, i = function(l) {
    return n && l < n.length - n.l ? n : (a(), n = r(Math.max(l + 1, t)));
  }, s = function() {
    return a(), Qe(e);
  }, o = function(l) {
    a(), n = l, n.l == null && (n.l = n.length), i(t);
  };
  return { next: i, push: o, end: s, _bufs: e };
}
function G(e, t, r, n) {
  var a = +t, i;
  if (!isNaN(a)) {
    n || (n = sg[a].p || (r || []).length || 0), i = 1 + (a >= 128 ? 1 : 0) + 1, n >= 128 && ++i, n >= 16384 && ++i, n >= 2097152 && ++i;
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
    n > 0 && xs(r) && e.push(r);
  }
}
function Wn(e, t, r) {
  var n = xt(e);
  if (t.s ? (n.cRel && (n.c += t.s.c), n.rRel && (n.r += t.s.r)) : (n.cRel && (n.c += t.c), n.rRel && (n.r += t.r)), !r || r.biff < 12) {
    for (; n.c >= 256; ) n.c -= 256;
    for (; n.r >= 65536; ) n.r -= 65536;
  }
  return n;
}
function V0(e, t, r) {
  var n = xt(e);
  return n.s = Wn(n.s, t.s, r), n.e = Wn(n.e, t.s, r), n;
}
function $n(e, t) {
  if (e.cRel && e.c < 0)
    for (e = xt(e); e.c < 0; ) e.c += t > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = xt(e); e.r < 0; ) e.r += t > 8 ? 1048576 : t > 5 ? 65536 : 16384;
  var r = Fe(e);
  return !e.cRel && e.cRel != null && (r = md(r)), !e.rRel && e.rRel != null && (r = xd(r)), r;
}
function pi(e, t) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (t.biff >= 12 ? 1048575 : t.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + rt(e.s.c) + ":" + (e.e.cRel ? "" : "$") + rt(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (t.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + Ze(e.s.r) + ":" + (e.e.rRel ? "" : "$") + Ze(e.e.r) : $n(e.s, t.biff) + ":" + $n(e.e, t.biff);
}
function ps(e) {
  return parseInt(pd(e), 10) - 1;
}
function Ze(e) {
  return "" + (e + 1);
}
function xd(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function pd(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function ms(e) {
  for (var t = _d(e), r = 0, n = 0; n !== t.length; ++n) r = 26 * r + t.charCodeAt(n) - 64;
  return r - 1;
}
function rt(e) {
  if (e < 0) throw new Error("invalid column " + e);
  var t = "";
  for (++e; e; e = Math.floor((e - 1) / 26)) t = String.fromCharCode((e - 1) % 26 + 65) + t;
  return t;
}
function md(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}
function _d(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}
function vd(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function je(e) {
  for (var t = 0, r = 0, n = 0; n < e.length; ++n) {
    var a = e.charCodeAt(n);
    a >= 48 && a <= 57 ? t = 10 * t + (a - 48) : a >= 65 && a <= 90 && (r = 26 * r + (a - 64));
  }
  return { c: r - 1, r: t - 1 };
}
function Fe(e) {
  for (var t = e.c + 1, r = ""; t; t = (t - 1) / 26 | 0) r = String.fromCharCode((t - 1) % 26 + 65) + r;
  return r + (e.r + 1);
}
function Et(e) {
  var t = e.indexOf(":");
  return t == -1 ? { s: je(e), e: je(e) } : { s: je(e.slice(0, t)), e: je(e.slice(t + 1)) };
}
function $e(e, t) {
  return typeof t > "u" || typeof t == "number" ? $e(e.s, e.e) : (typeof e != "string" && (e = Fe(e)), typeof t != "string" && (t = Fe(t)), e == t ? e : e + ":" + t);
}
function Ne(e) {
  var t = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }, r = 0, n = 0, a = 0, i = e.length;
  for (r = 0; n < i && !((a = e.charCodeAt(n) - 64) < 1 || a > 26); ++n)
    r = 26 * r + a;
  for (t.s.c = --r, r = 0; n < i && !((a = e.charCodeAt(n) - 48) < 0 || a > 9); ++n)
    r = 10 * r + a;
  if (t.s.r = --r, n === i || a != 10)
    return t.e.c = t.s.c, t.e.r = t.s.r, t;
  for (++n, r = 0; n != i && !((a = e.charCodeAt(n) - 64) < 1 || a > 26); ++n)
    r = 26 * r + a;
  for (t.e.c = --r, r = 0; n != i && !((a = e.charCodeAt(n) - 48) < 0 || a > 9); ++n)
    r = 10 * r + a;
  return t.e.r = --r, t;
}
function z0(e, t) {
  var r = e.t == "d" && t instanceof Date;
  if (e.z != null) try {
    return e.w = dr(e.z, r ? dt(t) : t);
  } catch {
  }
  try {
    return e.w = dr((e.XF || {}).numFmtId || (r ? 14 : 0), r ? dt(t) : t);
  } catch {
    return "" + t;
  }
}
function Qt(e, t, r) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && r && r.dateNF && (e.z = r.dateNF), e.t == "e" ? ta[e.v] || e.v : t == null ? z0(e, e.v) : z0(e, t));
}
function Pr(e, t) {
  var r = t && t.sheet ? t.sheet : "Sheet1", n = {};
  return n[r] = e, { SheetNames: [r], Sheets: n };
}
function jl(e, t, r) {
  var n = r || {}, a = e ? Array.isArray(e) : n.dense, i = e || (a ? [] : {}), s = 0, o = 0;
  if (i && n.origin != null) {
    if (typeof n.origin == "number") s = n.origin;
    else {
      var c = typeof n.origin == "string" ? je(n.origin) : n.origin;
      s = c.r, o = c.c;
    }
    i["!ref"] || (i["!ref"] = "A1:A1");
  }
  var l = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };
  if (i["!ref"]) {
    var f = Ne(i["!ref"]);
    l.s.c = f.s.c, l.s.r = f.s.r, l.e.c = Math.max(l.e.c, f.e.c), l.e.r = Math.max(l.e.r, f.e.r), s == -1 && (l.e.r = s = f.e.r + 1);
  }
  for (var d = 0; d != t.length; ++d)
    if (t[d]) {
      if (!Array.isArray(t[d])) throw new Error("aoa_to_sheet expects an array of arrays");
      for (var u = 0; u != t[d].length; ++u)
        if (!(typeof t[d][u] > "u")) {
          var h = { v: t[d][u] }, m = s + d, x = o + u;
          if (l.s.r > m && (l.s.r = m), l.s.c > x && (l.s.c = x), l.e.r < m && (l.e.r = m), l.e.c < x && (l.e.c = x), t[d][u] && typeof t[d][u] == "object" && !Array.isArray(t[d][u]) && !(t[d][u] instanceof Date)) h = t[d][u];
          else if (Array.isArray(h.v) && (h.f = t[d][u][1], h.v = h.v[0]), h.v === null)
            if (h.f) h.t = "n";
            else if (n.nullError)
              h.t = "e", h.v = 0;
            else if (n.sheetStubs) h.t = "z";
            else continue;
          else typeof h.v == "number" ? h.t = "n" : typeof h.v == "boolean" ? h.t = "b" : h.v instanceof Date ? (h.z = n.dateNF || be[14], n.cellDates ? (h.t = "d", h.w = dr(h.z, dt(h.v))) : (h.t = "n", h.v = dt(h.v), h.w = dr(h.z, h.v))) : h.t = "s";
          if (a)
            i[m] || (i[m] = []), i[m][x] && i[m][x].z && (h.z = i[m][x].z), i[m][x] = h;
          else {
            var _ = Fe({ c: x, r: m });
            i[_] && i[_].z && (h.z = i[_].z), i[_] = h;
          }
        }
    }
  return l.s.c < 1e7 && (i["!ref"] = $e(l)), i;
}
function xn(e, t) {
  return jl(null, e, t);
}
function gd(e) {
  return e.read_shift(4, "i");
}
function Lt(e, t) {
  return t || (t = B(4)), t.write_shift(4, e), t;
}
function nt(e) {
  var t = e.read_shift(4);
  return t === 0 ? "" : e.read_shift(t, "dbcs");
}
function Xe(e, t) {
  var r = !1;
  return t == null && (r = !0, t = B(4 + 2 * e.length)), t.write_shift(4, e.length), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
function wd(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function Ed(e, t) {
  return t || (t = B(4)), t.write_shift(2, 0), t.write_shift(2, 0), t;
}
function _s(e, t) {
  var r = e.l, n = e.read_shift(1), a = nt(e), i = [], s = { t: a, h: a };
  if ((n & 1) !== 0) {
    for (var o = e.read_shift(4), c = 0; c != o; ++c) i.push(wd(e));
    s.r = i;
  } else s.r = [{ ich: 0, ifnt: 0 }];
  return e.l = r + t, s;
}
function Td(e, t) {
  var r = !1;
  return t == null && (r = !0, t = B(15 + 4 * e.t.length)), t.write_shift(1, 0), Xe(e.t, t), r ? t.slice(0, t.l) : t;
}
var Sd = _s;
function yd(e, t) {
  var r = !1;
  return t == null && (r = !0, t = B(23 + 4 * e.t.length)), t.write_shift(1, 1), Xe(e.t, t), t.write_shift(4, 1), Ed({}, t), r ? t.slice(0, t.l) : t;
}
function Rt(e) {
  var t = e.read_shift(4), r = e.read_shift(2);
  return r += e.read_shift(1) << 16, e.l++, { c: t, iStyleRef: r };
}
function Lr(e, t) {
  return t == null && (t = B(8)), t.write_shift(-4, e.c), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
function br(e) {
  var t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, { c: -1, iStyleRef: t };
}
function Br(e, t) {
  return t == null && (t = B(4)), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
var Cd = nt, Xl = Xe;
function vs(e) {
  var t = e.read_shift(4);
  return t === 0 || t === 4294967295 ? "" : e.read_shift(t, "dbcs");
}
function Ma(e, t) {
  var r = !1;
  return t == null && (r = !0, t = B(127)), t.write_shift(4, e.length > 0 ? e.length : 4294967295), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
var Fd = nt, Xi = vs, gs = Ma;
function Yl(e) {
  var t = e.slice(e.l, e.l + 4), r = t[0] & 1, n = t[0] & 2;
  e.l += 4;
  var a = n === 0 ? Da([0, 0, 0, 0, t[0] & 252, t[1], t[2], t[3]], 0) : Cr(t, 0) >> 2;
  return r ? a / 100 : a;
}
function Kl(e, t) {
  t == null && (t = B(4));
  var r = 0, n = 0, a = e * 100;
  if (e == (e | 0) && e >= -536870912 && e < 1 << 29 ? n = 1 : a == (a | 0) && a >= -536870912 && a < 1 << 29 && (n = 1, r = 1), n) t.write_shift(-4, ((r ? a : e) << 2) + (r + 2));
  else throw new Error("unsupported RkNumber " + e);
}
function Jl(e) {
  var t = { s: {}, e: {} };
  return t.s.r = e.read_shift(4), t.e.r = e.read_shift(4), t.s.c = e.read_shift(4), t.e.c = e.read_shift(4), t;
}
function kd(e, t) {
  return t || (t = B(16)), t.write_shift(4, e.s.r), t.write_shift(4, e.e.r), t.write_shift(4, e.s.c), t.write_shift(4, e.e.c), t;
}
var Ur = Jl, pn = kd;
function mn(e) {
  if (e.length - e.l < 8) throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function Dr(e, t) {
  return (t || B(8)).write_shift(8, e, "f");
}
function Ad(e) {
  var t = {}, r = e.read_shift(1), n = r >>> 1, a = e.read_shift(1), i = e.read_shift(2, "i"), s = e.read_shift(1), o = e.read_shift(1), c = e.read_shift(1);
  switch (e.l++, n) {
    case 0:
      t.auto = 1;
      break;
    case 1:
      t.index = a;
      var l = bd[a];
      l && (t.rgb = ro(l));
      break;
    case 2:
      t.rgb = ro([s, o, c]);
      break;
    case 3:
      t.theme = a;
      break;
  }
  return i != 0 && (t.tint = i > 0 ? i / 32767 : i / 32768), t;
}
function Pa(e, t) {
  if (t || (t = B(8)), !e || e.auto)
    return t.write_shift(4, 0), t.write_shift(4, 0), t;
  e.index != null ? (t.write_shift(1, 2), t.write_shift(1, e.index)) : e.theme != null ? (t.write_shift(1, 6), t.write_shift(1, e.theme)) : (t.write_shift(1, 5), t.write_shift(1, 0));
  var r = e.tint || 0;
  if (r > 0 ? r *= 32767 : r < 0 && (r *= 32768), t.write_shift(2, r), !e.rgb || e.theme != null)
    t.write_shift(2, 0), t.write_shift(1, 0), t.write_shift(1, 0);
  else {
    var n = e.rgb || "FFFFFF";
    typeof n == "number" && (n = ("000000" + n.toString(16)).slice(-6)), t.write_shift(1, parseInt(n.slice(0, 2), 16)), t.write_shift(1, parseInt(n.slice(2, 4), 16)), t.write_shift(1, parseInt(n.slice(4, 6), 16)), t.write_shift(1, 255);
  }
  return t;
}
function Rd(e) {
  var t = e.read_shift(1);
  e.l++;
  var r = {
    fBold: t & 1,
    fItalic: t & 2,
    fUnderline: t & 4,
    fStrikeout: t & 8,
    fOutline: t & 16,
    fShadow: t & 32,
    fCondense: t & 64,
    fExtend: t & 128
  };
  return r;
}
function Od(e, t) {
  t || (t = B(2));
  var r = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
  return t.write_shift(1, r), t.write_shift(1, 0), t;
}
var Ql = 2, _t = 3, ma = 11, La = 19, _a = 64, Id = 65, Nd = 71, Dd = 4108, Md = 4126, Je = 80, j0 = {
  /*::[*/
  1: { n: "CodePage", t: Ql },
  /*::[*/
  2: { n: "Category", t: Je },
  /*::[*/
  3: { n: "PresentationFormat", t: Je },
  /*::[*/
  4: { n: "ByteCount", t: _t },
  /*::[*/
  5: { n: "LineCount", t: _t },
  /*::[*/
  6: { n: "ParagraphCount", t: _t },
  /*::[*/
  7: { n: "SlideCount", t: _t },
  /*::[*/
  8: { n: "NoteCount", t: _t },
  /*::[*/
  9: { n: "HiddenCount", t: _t },
  /*::[*/
  10: { n: "MultimediaClipCount", t: _t },
  /*::[*/
  11: { n: "ScaleCrop", t: ma },
  /*::[*/
  12: {
    n: "HeadingPairs",
    t: Dd
    /* VT_VECTOR | VT_VARIANT */
  },
  /*::[*/
  13: {
    n: "TitlesOfParts",
    t: Md
    /* VT_VECTOR | VT_LPSTR */
  },
  /*::[*/
  14: { n: "Manager", t: Je },
  /*::[*/
  15: { n: "Company", t: Je },
  /*::[*/
  16: { n: "LinksUpToDate", t: ma },
  /*::[*/
  17: { n: "CharacterCount", t: _t },
  /*::[*/
  19: { n: "SharedDoc", t: ma },
  /*::[*/
  22: { n: "HyperlinksChanged", t: ma },
  /*::[*/
  23: { n: "AppVersion", t: _t, p: "version" },
  /*::[*/
  24: { n: "DigSig", t: Id },
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
  2147483648: { n: "Locale", t: La },
  /*::[*/
  2147483651: { n: "Behavior", t: La },
  /*::[*/
  1919054434: {}
}, X0 = {
  /*::[*/
  1: { n: "CodePage", t: Ql },
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
  10: { n: "EditTime", t: _a },
  /*::[*/
  11: { n: "LastPrinted", t: _a },
  /*::[*/
  12: { n: "CreatedDate", t: _a },
  /*::[*/
  13: { n: "ModifiedDate", t: _a },
  /*::[*/
  14: { n: "PageCount", t: _t },
  /*::[*/
  15: { n: "WordCount", t: _t },
  /*::[*/
  16: { n: "CharCount", t: _t },
  /*::[*/
  17: { n: "Thumbnail", t: Nd },
  /*::[*/
  18: { n: "Application", t: Je },
  /*::[*/
  19: { n: "DocSecurity", t: _t },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: La },
  /*::[*/
  2147483651: { n: "Behavior", t: La },
  /*::[*/
  1919054434: {}
};
function Pd(e) {
  return e.map(function(t) {
    return [t >> 16 & 255, t >> 8 & 255, t & 255];
  });
}
var Ld = /* @__PURE__ */ Pd([
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
]), bd = /* @__PURE__ */ xt(Ld), ta = {
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
}, Bd = {
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
}, va = {
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
function ql() {
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
function Zl(e, t) {
  var r = Y1(Bd), n = [], a;
  n[n.length] = He, n[n.length] = J("Types", null, {
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
  ].map(function(c) {
    return J("Default", null, { Extension: c[0], ContentType: c[1] });
  }));
  var i = function(c) {
    e[c] && e[c].length > 0 && (a = e[c][0], n[n.length] = J("Override", null, {
      PartName: (a[0] == "/" ? "" : "/") + a,
      ContentType: va[c][t.bookType] || va[c].xlsx
    }));
  }, s = function(c) {
    (e[c] || []).forEach(function(l) {
      n[n.length] = J("Override", null, {
        PartName: (l[0] == "/" ? "" : "/") + l,
        ContentType: va[c][t.bookType] || va[c].xlsx
      });
    });
  }, o = function(c) {
    (e[c] || []).forEach(function(l) {
      n[n.length] = J("Override", null, {
        PartName: (l[0] == "/" ? "" : "/") + l,
        ContentType: r[c][0]
      });
    });
  };
  return i("workbooks"), s("sheets"), s("charts"), o("themes"), ["strs", "styles"].forEach(i), ["coreprops", "extprops", "custprops"].forEach(o), o("vba"), o("comments"), o("threadedcomments"), o("drawings"), s("metadata"), o("people"), n.length > 2 && (n[n.length] = "</Types>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var ge = {
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
function ec(e) {
  var t = e.lastIndexOf("/");
  return e.slice(0, t + 1) + "_rels/" + e.slice(t + 1) + ".rels";
}
function en(e) {
  var t = [He, J("Relationships", null, {
    //'xmlns:ns0': XMLNS.RELS,
    xmlns: ze.RELS
  })];
  return et(e["!id"]).forEach(function(r) {
    t[t.length] = J("Relationship", null, e["!id"][r]);
  }), t.length > 2 && (t[t.length] = "</Relationships>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function ye(e, t, r, n, a, i) {
  if (a || (a = {}), e["!id"] || (e["!id"] = {}), e["!idx"] || (e["!idx"] = 1), t < 0) for (t = e["!idx"]; e["!id"]["rId" + t]; ++t)
    ;
  if (e["!idx"] = t + 1, a.Id = "rId" + t, a.Type = n, a.Target = r, [ge.HLINK, ge.XPATH, ge.XMISS].indexOf(a.Type) > -1 && (a.TargetMode = "External"), e["!id"][a.Id]) throw new Error("Cannot rewrite rId " + t);
  return e["!id"][a.Id] = a, e[("/" + a.Target).replace("//", "/")] = a, t;
}
function Ud(e) {
  var t = [He];
  t.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`), t.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);
  for (var r = 0; r < e.length; ++r) t.push('  <manifest:file-entry manifest:full-path="' + e[r][0] + '" manifest:media-type="' + e[r][1] + `"/>
`);
  return t.push("</manifest:manifest>"), t.join("");
}
function Y0(e, t, r) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (r || "odf") + "#" + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function Wd(e, t) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function $d(e) {
  var t = [He];
  t.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
  for (var r = 0; r != e.length; ++r)
    t.push(Y0(e[r][0], e[r][1])), t.push(Wd("", e[r][0]));
  return t.push(Y0("", "Document", "pkg")), t.push("</rdf:RDF>"), t.join("");
}
function tc() {
  return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + ka.version + "</meta:generator></office:meta></office:document-meta>";
}
var Ir = [
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
function mi(e, t, r, n, a) {
  a[e] != null || t == null || t === "" || (a[e] = t, t = Ce(t), n[n.length] = r ? J(e, t, r) : qe(e, t));
}
function rc(e, t) {
  var r = t || {}, n = [He, J("cp:coreProperties", null, {
    //'xmlns': XMLNS.CORE_PROPS,
    "xmlns:cp": ze.CORE_PROPS,
    "xmlns:dc": ze.dc,
    "xmlns:dcterms": ze.dcterms,
    "xmlns:dcmitype": ze.dcmitype,
    "xmlns:xsi": ze.xsi
  })], a = {};
  if (!e && !r.Props) return n.join("");
  e && (e.CreatedDate != null && mi("dcterms:created", typeof e.CreatedDate == "string" ? e.CreatedDate : ji(e.CreatedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a), e.ModifiedDate != null && mi("dcterms:modified", typeof e.ModifiedDate == "string" ? e.ModifiedDate : ji(e.ModifiedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a));
  for (var i = 0; i != Ir.length; ++i) {
    var s = Ir[i], o = r.Props && r.Props[s[1]] != null ? r.Props[s[1]] : e ? e[s[1]] : null;
    o === !0 ? o = "1" : o === !1 ? o = "0" : typeof o == "number" && (o = String(o)), o != null && mi(s[0], o, null, n, a);
  }
  return n.length > 2 && (n[n.length] = "</cp:coreProperties>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var tn = [
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
], nc = [
  "Worksheets",
  "SheetNames",
  "NamedRanges",
  "DefinedNames",
  "Chartsheets",
  "ChartNames"
];
function ac(e) {
  var t = [], r = J;
  return e || (e = {}), e.Application = "SheetJS", t[t.length] = He, t[t.length] = J("Properties", null, {
    xmlns: ze.EXT_PROPS,
    "xmlns:vt": ze.vt
  }), tn.forEach(function(n) {
    if (e[n[1]] !== void 0) {
      var a;
      switch (n[2]) {
        case "string":
          a = Ce(String(e[n[1]]));
          break;
        case "bool":
          a = e[n[1]] ? "true" : "false";
          break;
      }
      a !== void 0 && (t[t.length] = r(n[0], a));
    }
  }), t[t.length] = r("HeadingPairs", r("vt:vector", r("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + r("vt:variant", r("vt:i4", String(e.Worksheets))), { size: 2, baseType: "variant" })), t[t.length] = r("TitlesOfParts", r("vt:vector", e.SheetNames.map(function(n) {
    return "<vt:lpstr>" + Ce(n) + "</vt:lpstr>";
  }).join(""), { size: e.Worksheets, baseType: "lpstr" })), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function ic(e) {
  var t = [He, J("Properties", null, {
    xmlns: ze.CUST_PROPS,
    "xmlns:vt": ze.vt
  })];
  if (!e) return t.join("");
  var r = 1;
  return et(e).forEach(function(a) {
    ++r, t[t.length] = J("property", id(e[a]), {
      fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: r,
      name: Ce(a)
    });
  }), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
var K0 = {
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
function Hd(e, t) {
  var r = [];
  return et(K0).map(function(n) {
    for (var a = 0; a < Ir.length; ++a) if (Ir[a][1] == n) return Ir[a];
    for (a = 0; a < tn.length; ++a) if (tn[a][1] == n) return tn[a];
    throw n;
  }).forEach(function(n) {
    if (e[n[1]] != null) {
      var a = t && t.Props && t.Props[n[1]] != null ? t.Props[n[1]] : e[n[1]];
      switch (n[2]) {
        case "date":
          a = new Date(a).toISOString().replace(/\.\d*Z/, "Z");
          break;
      }
      typeof a == "number" ? a = String(a) : a === !0 || a === !1 ? a = a ? "1" : "0" : a instanceof Date && (a = new Date(a).toISOString().replace(/\.\d*Z/, "")), r.push(qe(K0[n[1]] || n[1], a));
    }
  }), J("DocumentProperties", r.join(""), { xmlns: gt.o });
}
function Gd(e, t) {
  var r = ["Worksheets", "SheetNames"], n = "CustomDocumentProperties", a = [];
  return e && et(e).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(e, i)) {
      for (var s = 0; s < Ir.length; ++s) if (i == Ir[s][1]) return;
      for (s = 0; s < tn.length; ++s) if (i == tn[s][1]) return;
      for (s = 0; s < r.length; ++s) if (i == r[s]) return;
      var o = e[i], c = "string";
      typeof o == "number" ? (c = "float", o = String(o)) : o === !0 || o === !1 ? (c = "boolean", o = o ? "1" : "0") : o = String(o), a.push(J(L0(i), o, { "dt:dt": c }));
    }
  }), t && et(t).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(t, i) && !(e && Object.prototype.hasOwnProperty.call(e, i))) {
      var s = t[i], o = "string";
      typeof s == "number" ? (o = "float", s = String(s)) : s === !0 || s === !1 ? (o = "boolean", s = s ? "1" : "0") : s instanceof Date ? (o = "dateTime.tz", s = s.toISOString()) : s = String(s), a.push(J(L0(i), s, { "dt:dt": o }));
    }
  }), "<" + n + ' xmlns="' + gt.o + '">' + a.join("") + "</" + n + ">";
}
function Vd(e) {
  var t = typeof e == "string" ? new Date(Date.parse(e)) : e, r = t.getTime() / 1e3 + 11644473600, n = r % Math.pow(2, 32), a = (r - n) / Math.pow(2, 32);
  n *= 1e7, a *= 1e7;
  var i = n / Math.pow(2, 32) | 0;
  i > 0 && (n = n % Math.pow(2, 32), a += i);
  var s = B(8);
  return s.write_shift(4, n), s.write_shift(4, a), s;
}
function J0(e, t) {
  var r = B(4), n = B(4);
  switch (r.write_shift(4, e == 80 ? 31 : e), e) {
    case 3:
      n.write_shift(-4, t);
      break;
    case 5:
      n = B(8), n.write_shift(8, t, "f");
      break;
    case 11:
      n.write_shift(4, t ? 1 : 0);
      break;
    case 64:
      n = Vd(t);
      break;
    case 31:
    case 80:
      for (n = B(4 + 2 * (t.length + 1) + (t.length % 2 ? 0 : 2)), n.write_shift(4, t.length + 1), n.write_shift(0, t, "dbcs"); n.l != n.length; ) n.write_shift(1, 0);
      break;
    default:
      throw new Error("TypedPropertyValue unrecognized type " + e + " " + t);
  }
  return Qe([r, n]);
}
var sc = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];
function zd(e) {
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
function Q0(e, t, r) {
  var n = B(8), a = [], i = [], s = 8, o = 0, c = B(8), l = B(8);
  if (c.write_shift(4, 2), c.write_shift(4, 1200), l.write_shift(4, 1), i.push(c), a.push(l), s += 8 + c.length, !t) {
    l = B(8), l.write_shift(4, 0), a.unshift(l);
    var f = [B(4)];
    for (f[0].write_shift(4, e.length), o = 0; o < e.length; ++o) {
      var d = e[o][0];
      for (c = B(8 + 2 * (d.length + 1) + (d.length % 2 ? 0 : 2)), c.write_shift(4, o + 2), c.write_shift(4, d.length + 1), c.write_shift(0, d, "dbcs"); c.l != c.length; ) c.write_shift(1, 0);
      f.push(c);
    }
    c = Qe(f), i.unshift(c), s += 8 + c.length;
  }
  for (o = 0; o < e.length; ++o)
    if (!(t && !t[e[o][0]]) && !(sc.indexOf(e[o][0]) > -1 || nc.indexOf(e[o][0]) > -1) && e[o][1] != null) {
      var u = e[o][1], h = 0;
      if (t) {
        h = +t[e[o][0]];
        var m = r[h];
        if (m.p == "version" && typeof u == "string") {
          var x = u.split(".");
          u = (+x[0] << 16) + (+x[1] || 0);
        }
        c = J0(m.t, u);
      } else {
        var _ = zd(u);
        _ == -1 && (_ = 31, u = String(u)), c = J0(_, u);
      }
      i.push(c), l = B(8), l.write_shift(4, t ? h : 2 + o), a.push(l), s += 8 + c.length;
    }
  var F = 8 * (i.length + 1);
  for (o = 0; o < i.length; ++o)
    a[o].write_shift(4, F), F += i[o].length;
  return n.write_shift(4, s), n.write_shift(4, i.length), Qe([n].concat(a).concat(i));
}
function q0(e, t, r, n, a, i) {
  var s = B(a ? 68 : 48), o = [s];
  s.write_shift(2, 65534), s.write_shift(2, 0), s.write_shift(4, 842412599), s.write_shift(16, ke.utils.consts.HEADER_CLSID, "hex"), s.write_shift(4, a ? 2 : 1), s.write_shift(16, t, "hex"), s.write_shift(4, a ? 68 : 48);
  var c = Q0(e, r, n);
  if (o.push(c), a) {
    var l = Q0(a, null, null);
    s.write_shift(16, i, "hex"), s.write_shift(4, 68 + c.length), o.push(l);
  }
  return Qe(o);
}
function jd(e, t) {
  t || (t = B(e));
  for (var r = 0; r < e; ++r) t.write_shift(1, 0);
  return t;
}
function Xd(e, t) {
  return e.read_shift(t) === 1;
}
function ct(e, t) {
  return t || (t = B(2)), t.write_shift(2, +!!e), t;
}
function oc(e) {
  return e.read_shift(2, "u");
}
function kt(e, t) {
  return t || (t = B(2)), t.write_shift(2, e), t;
}
function lc(e, t, r) {
  return r || (r = B(2)), r.write_shift(1, t == "e" ? +e : +!!e), r.write_shift(1, t == "e" ? 1 : 0), r;
}
function cc(e, t, r) {
  var n = e.read_shift(r && r.biff >= 12 ? 2 : 1), a = "sbcs-cont";
  if (r && r.biff >= 8, !r || r.biff == 8) {
    var i = e.read_shift(1);
    i && (a = "dbcs-cont");
  } else r.biff == 12 && (a = "wstr");
  r.biff >= 2 && r.biff <= 5 && (a = "cpstr");
  var s = n ? e.read_shift(n, a) : "";
  return s;
}
function Yd(e) {
  var t = e.t || "", r = B(3);
  r.write_shift(2, t.length), r.write_shift(1, 1);
  var n = B(2 * t.length);
  n.write_shift(2 * t.length, t, "utf16le");
  var a = [r, n];
  return Qe(a);
}
function Kd(e, t, r) {
  var n;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5) return e.read_shift(t, "cpstr");
    if (r.biff >= 12) return e.read_shift(t, "dbcs-cont");
  }
  var a = e.read_shift(1);
  return a === 0 ? n = e.read_shift(t, "sbcs-cont") : n = e.read_shift(t, "dbcs-cont"), n;
}
function Jd(e, t, r) {
  var n = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return n === 0 ? (e.l++, "") : Kd(e, n, r);
}
function Qd(e, t, r) {
  if (r.biff > 5) return Jd(e, t, r);
  var n = e.read_shift(1);
  return n === 0 ? (e.l++, "") : e.read_shift(n, r.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function fc(e, t, r) {
  return r || (r = B(3 + 2 * e.length)), r.write_shift(2, e.length), r.write_shift(1, 1), r.write_shift(31, e, "utf16le"), r;
}
function Z0(e, t) {
  t || (t = B(6 + e.length * 2)), t.write_shift(4, 1 + e.length);
  for (var r = 0; r < e.length; ++r) t.write_shift(2, e.charCodeAt(r));
  return t.write_shift(2, 0), t;
}
function qd(e) {
  var t = B(512), r = 0, n = e.Target;
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
  t.write_shift(4, 2), t.write_shift(4, i);
  var s = [8, 6815827, 6619237, 4849780, 83];
  for (r = 0; r < s.length; ++r) t.write_shift(4, s[r]);
  if (i == 28)
    n = n.slice(1), Z0(n, t);
  else if (i & 2) {
    for (s = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), r = 0; r < s.length; ++r) t.write_shift(1, parseInt(s[r], 16));
    var o = a > -1 ? n.slice(0, a) : n;
    for (t.write_shift(4, 2 * (o.length + 1)), r = 0; r < o.length; ++r) t.write_shift(2, o.charCodeAt(r));
    t.write_shift(2, 0), i & 8 && Z0(a > -1 ? n.slice(a + 1) : "", t);
  } else {
    for (s = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), r = 0; r < s.length; ++r) t.write_shift(1, parseInt(s[r], 16));
    for (var c = 0; n.slice(c * 3, c * 3 + 3) == "../" || n.slice(c * 3, c * 3 + 3) == "..\\"; ) ++c;
    for (t.write_shift(2, c), t.write_shift(4, n.length - 3 * c + 1), r = 0; r < n.length - 3 * c; ++r) t.write_shift(1, n.charCodeAt(r + 3 * c) & 255);
    for (t.write_shift(1, 0), t.write_shift(2, 65535), t.write_shift(2, 57005), r = 0; r < 6; ++r) t.write_shift(4, 0);
  }
  return t.slice(0, t.l);
}
function Mr(e, t, r, n) {
  return n || (n = B(6)), n.write_shift(2, e), n.write_shift(2, t), n.write_shift(2, r || 0), n;
}
function Zd(e, t, r) {
  var n = r.biff > 8 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n, "i"), s = e.read_shift(n, "i");
  return [a, i, s];
}
function ex(e) {
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(2), a = e.read_shift(2);
  return { s: { c: n, r: t }, e: { c: a, r } };
}
function uc(e, t) {
  return t || (t = B(8)), t.write_shift(2, e.s.r), t.write_shift(2, e.e.r), t.write_shift(2, e.s.c), t.write_shift(2, e.e.c), t;
}
function ws(e, t, r) {
  var n = 1536, a = 16;
  switch (r.bookType) {
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
  return i.write_shift(2, n), i.write_shift(2, t), a > 4 && i.write_shift(2, 29282), a > 6 && i.write_shift(2, 1997), a > 8 && (i.write_shift(2, 49161), i.write_shift(2, 1), i.write_shift(2, 1798), i.write_shift(2, 0)), i;
}
function tx(e, t) {
  var r = !t || t.biff == 8, n = B(r ? 112 : 54);
  for (n.write_shift(t.biff == 8 ? 2 : 1, 7), r && n.write_shift(1, 0), n.write_shift(4, 859007059), n.write_shift(4, 5458548 | (r ? 0 : 536870912)); n.l < n.length; ) n.write_shift(1, r ? 0 : 32);
  return n;
}
function rx(e, t) {
  var r = !t || t.biff >= 8 ? 2 : 1, n = B(8 + r * e.name.length);
  n.write_shift(4, e.pos), n.write_shift(1, e.hs || 0), n.write_shift(1, e.dt), n.write_shift(1, e.name.length), t.biff >= 8 && n.write_shift(1, 1), n.write_shift(r * e.name.length, e.name, t.biff < 8 ? "sbcs" : "utf16le");
  var a = n.slice(0, n.l);
  return a.l = n.l, a;
}
function nx(e, t) {
  var r = B(8);
  r.write_shift(4, e.Count), r.write_shift(4, e.Unique);
  for (var n = [], a = 0; a < e.length; ++a) n[a] = Yd(e[a]);
  var i = Qe([r].concat(n));
  return i.parts = [r.length].concat(n.map(function(s) {
    return s.length;
  })), i;
}
function ax() {
  var e = B(18);
  return e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 29280), e.write_shift(2, 17600), e.write_shift(2, 56), e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 1), e.write_shift(2, 500), e;
}
function ix(e) {
  var t = B(18), r = 1718;
  return e && e.RTL && (r |= 64), t.write_shift(2, r), t.write_shift(4, 0), t.write_shift(4, 64), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
function sx(e, t) {
  var r = e.name || "Arial", n = t && t.biff == 5, a = n ? 15 + r.length : 16 + 2 * r.length, i = B(a);
  return i.write_shift(2, e.sz * 20), i.write_shift(4, 0), i.write_shift(2, 400), i.write_shift(4, 0), i.write_shift(2, 0), i.write_shift(1, r.length), n || i.write_shift(1, 1), i.write_shift((n ? 1 : 2) * r.length, r, n ? "sbcs" : "utf16le"), i;
}
function ox(e, t, r, n) {
  var a = B(10);
  return Mr(e, t, n, a), a.write_shift(4, r), a;
}
function lx(e, t, r, n, a) {
  var i = !a || a.biff == 8, s = B(8 + +i + (1 + i) * r.length);
  return Mr(e, t, n, s), s.write_shift(2, r.length), i && s.write_shift(1, 1), s.write_shift((1 + i) * r.length, r, i ? "utf16le" : "sbcs"), s;
}
function cx(e, t, r, n) {
  var a = r && r.biff == 5;
  n || (n = B(a ? 3 + t.length : 5 + 2 * t.length)), n.write_shift(2, e), n.write_shift(a ? 1 : 2, t.length), a || n.write_shift(1, 1), n.write_shift((a ? 1 : 2) * t.length, t, a ? "sbcs" : "utf16le");
  var i = n.length > n.l ? n.slice(0, n.l) : n;
  return i.l == null && (i.l = i.length), i;
}
function fx(e, t) {
  var r = t.biff == 8 || !t.biff ? 4 : 2, n = B(2 * r + 6);
  return n.write_shift(r, e.s.r), n.write_shift(r, e.e.r + 1), n.write_shift(2, e.s.c), n.write_shift(2, e.e.c + 1), n.write_shift(2, 0), n;
}
function eo(e, t, r, n) {
  var a = r && r.biff == 5;
  n || (n = B(a ? 16 : 20)), n.write_shift(2, 0), e.style ? (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, 65524)) : (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, t << 4));
  var i = 0;
  return e.numFmtId > 0 && a && (i |= 1024), n.write_shift(4, i), n.write_shift(4, 0), a || n.write_shift(4, 0), n.write_shift(2, 0), n;
}
function ux(e) {
  var t = B(8);
  return t.write_shift(4, 0), t.write_shift(2, 0), t.write_shift(2, 0), t;
}
function hx(e, t, r, n, a, i) {
  var s = B(8);
  return Mr(e, t, n, s), lc(r, i, s), s;
}
function dx(e, t, r, n) {
  var a = B(14);
  return Mr(e, t, n, a), Dr(r, a), a;
}
function xx(e, t, r) {
  if (r.biff < 8) return px(e, t, r);
  for (var n = [], a = e.l + t, i = e.read_shift(r.biff > 8 ? 4 : 2); i-- !== 0; ) n.push(Zd(e, r.biff > 8 ? 12 : 6, r));
  if (e.l != a) throw new Error("Bad ExternSheet: " + e.l + " != " + a);
  return n;
}
function px(e, t, r) {
  e[e.l + 1] == 3 && e[e.l]++;
  var n = cc(e, t, r);
  return n.charCodeAt(0) == 3 ? n.slice(1) : n;
}
function mx(e) {
  var t = B(2 + e.length * 8);
  t.write_shift(2, e.length);
  for (var r = 0; r < e.length; ++r) uc(e[r], t);
  return t;
}
function _x(e) {
  var t = B(24), r = je(e[0]);
  t.write_shift(2, r.r), t.write_shift(2, r.r), t.write_shift(2, r.c), t.write_shift(2, r.c);
  for (var n = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), a = 0; a < 16; ++a) t.write_shift(1, parseInt(n[a], 16));
  return Qe([t, qd(e[1])]);
}
function vx(e) {
  var t = e[1].Tooltip, r = B(10 + 2 * (t.length + 1));
  r.write_shift(2, 2048);
  var n = je(e[0]);
  r.write_shift(2, n.r), r.write_shift(2, n.r), r.write_shift(2, n.c), r.write_shift(2, n.c);
  for (var a = 0; a < t.length; ++a) r.write_shift(2, t.charCodeAt(a));
  return r.write_shift(2, 0), r;
}
function gx(e) {
  return e || (e = B(4)), e.write_shift(2, 1), e.write_shift(2, 1), e;
}
function wx(e, t, r) {
  if (!r.cellStyles) return Ht(e, t);
  var n = r && r.biff >= 12 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n), s = e.read_shift(n), o = e.read_shift(n), c = e.read_shift(2);
  n == 2 && (e.l += 2);
  var l = { s: a, e: i, w: s, ixfe: o, flags: c };
  return (r.biff >= 5 || !r.biff) && (l.level = c >> 8 & 7), l;
}
function Ex(e, t) {
  var r = B(12);
  r.write_shift(2, t), r.write_shift(2, t), r.write_shift(2, e.width * 256), r.write_shift(2, 0);
  var n = 0;
  return e.hidden && (n |= 1), r.write_shift(1, n), n = e.level || 0, r.write_shift(1, n), r.write_shift(2, 0), r;
}
function Tx(e) {
  for (var t = B(2 * e), r = 0; r < e; ++r) t.write_shift(2, r + 1);
  return t;
}
function Sx(e, t, r) {
  var n = B(15);
  return na(n, e, t), n.write_shift(8, r, "f"), n;
}
function yx(e, t, r) {
  var n = B(9);
  return na(n, e, t), n.write_shift(2, r), n;
}
var Cx = /* @__PURE__ */ (function() {
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
  }, t = cs({
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
  function r(o, c) {
    var l = [], f = Nr(1);
    switch (c.type) {
      case "base64":
        f = Dt(Jt(o));
        break;
      case "binary":
        f = Dt(o);
        break;
      case "buffer":
      case "array":
        f = o;
        break;
    }
    vt(f, 0);
    var d = f.read_shift(1), u = !!(d & 136), h = !1, m = !1;
    switch (d) {
      case 2:
        break;
      // dBASE II
      case 3:
        break;
      // dBASE III
      case 48:
        h = !0, u = !0;
        break;
      // VFP
      case 49:
        h = !0, u = !0;
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
        m = !0;
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
    var x = 0, _ = 521;
    d == 2 && (x = f.read_shift(2)), f.l += 3, d != 2 && (x = f.read_shift(4)), x > 1048576 && (x = 1e6), d != 2 && (_ = f.read_shift(2));
    var F = f.read_shift(2), A = c.codepage || 1252;
    d != 2 && (f.l += 16, f.read_shift(1), f[f.l] !== 0 && (A = e[f[f.l]]), f.l += 1, f.l += 2), m && (f.l += 36);
    for (var y = [], O = {}, j = Math.min(f.length, d == 2 ? 521 : _ - 10 - (h ? 264 : 0)), Z = m ? 32 : 11; f.l < j && f[f.l] != 13; )
      switch (O = {}, O.name = Aa.utils.decode(A, f.slice(f.l, f.l + Z)).replace(/[\u0000\r\n].*$/g, ""), f.l += Z, O.type = String.fromCharCode(f.read_shift(1)), d != 2 && !m && (O.offset = f.read_shift(4)), O.len = f.read_shift(1), d == 2 && (O.offset = f.read_shift(2)), O.dec = f.read_shift(1), O.name.length && y.push(O), d != 2 && (f.l += m ? 13 : 14), O.type) {
        case "B":
          (!h || O.len != 8) && c.WTF && console.log("Skipping " + O.name + ":" + O.type);
          break;
        case "G":
        // General (FoxPro and dBASE L7)
        case "P":
          c.WTF && console.log("Skipping " + O.name + ":" + O.type);
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
          throw new Error("Unknown Field Type: " + O.type);
      }
    if (f[f.l] !== 13 && (f.l = _ - 1), f.read_shift(1) !== 13) throw new Error("DBF Terminator not found " + f.l + " " + f[f.l]);
    f.l = _;
    var R = 0, W = 0;
    for (l[0] = [], W = 0; W != y.length; ++W) l[0][W] = y[W].name;
    for (; x-- > 0; ) {
      if (f[f.l] === 42) {
        f.l += F;
        continue;
      }
      for (++f.l, l[++R] = [], W = 0, W = 0; W != y.length; ++W) {
        var P = f.slice(f.l, f.l + y[W].len);
        f.l += y[W].len, vt(P, 0);
        var H = Aa.utils.decode(A, P);
        switch (y[W].type) {
          case "C":
            H.trim().length && (l[R][W] = H.replace(/\s+$/, ""));
            break;
          case "D":
            H.length === 8 ? l[R][W] = new Date(+H.slice(0, 4), +H.slice(4, 6) - 1, +H.slice(6, 8)) : l[R][W] = H;
            break;
          case "F":
            l[R][W] = parseFloat(H.trim());
            break;
          case "+":
          case "I":
            l[R][W] = m ? P.read_shift(-4, "i") ^ 2147483648 : P.read_shift(4, "i");
            break;
          case "L":
            switch (H.trim().toUpperCase()) {
              case "Y":
              case "T":
                l[R][W] = !0;
                break;
              case "N":
              case "F":
                l[R][W] = !1;
                break;
              case "":
              case "?":
                break;
              default:
                throw new Error("DBF Unrecognized L:|" + H + "|");
            }
            break;
          case "M":
            if (!u) throw new Error("DBF Unexpected MEMO for type " + d.toString(16));
            l[R][W] = "##MEMO##" + (m ? parseInt(H.trim(), 10) : P.read_shift(4));
            break;
          case "N":
            H = H.replace(/\u0000/g, "").trim(), H && H != "." && (l[R][W] = +H || 0);
            break;
          case "@":
            l[R][W] = new Date(P.read_shift(-8, "f") - 621356832e5);
            break;
          case "T":
            l[R][W] = new Date((P.read_shift(4) - 2440588) * 864e5 + P.read_shift(4));
            break;
          case "Y":
            l[R][W] = P.read_shift(4, "i") / 1e4 + P.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
            break;
          case "O":
            l[R][W] = -P.read_shift(-8, "f");
            break;
          case "B":
            if (h && y[W].len == 8) {
              l[R][W] = P.read_shift(8, "f");
              break;
            }
          /* falls through */
          case "G":
          case "P":
            P.l += y[W].len;
            break;
          case "0":
            if (y[W].name === "_NullFlags") break;
          /* falls through */
          default:
            throw new Error("DBF Unsupported data type " + y[W].type);
        }
      }
    }
    if (d != 2 && f.l < f.length && f[f.l++] != 26) throw new Error("DBF EOF Marker missing " + (f.l - 1) + " of " + f.length + " " + f[f.l - 1].toString(16));
    return c && c.sheetRows && (l = l.slice(0, c.sheetRows)), c.DBF = y, l;
  }
  function n(o, c) {
    var l = c || {};
    l.dateNF || (l.dateNF = "yyyymmdd");
    var f = xn(r(o, l), l);
    return f["!cols"] = l.DBF.map(function(d) {
      return {
        wch: d.len,
        DBF: d
      };
    }), delete l.DBF, f;
  }
  function a(o, c) {
    try {
      return Pr(n(o, c), c);
    } catch (l) {
      if (c && c.WTF) throw l;
    }
    return { SheetNames: [], Sheets: {} };
  }
  var i = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
  function s(o, c) {
    var l = c || {};
    if (+l.codepage >= 0 && Gn(+l.codepage), l.type == "string") throw new Error("Cannot write DBF to JS string");
    var f = ht(), d = $a(o, { header: 1, raw: !0, cellDates: !0 }), u = d[0], h = d.slice(1), m = o["!cols"] || [], x = 0, _ = 0, F = 0, A = 1;
    for (x = 0; x < u.length; ++x) {
      if (((m[x] || {}).DBF || {}).name) {
        u[x] = m[x].DBF.name, ++F;
        continue;
      }
      if (u[x] != null) {
        if (++F, typeof u[x] == "number" && (u[x] = u[x].toString(10)), typeof u[x] != "string") throw new Error("DBF Invalid column name " + u[x] + " |" + typeof u[x] + "|");
        if (u.indexOf(u[x]) !== x) {
          for (_ = 0; _ < 1024; ++_)
            if (u.indexOf(u[x] + "_" + _) == -1) {
              u[x] += "_" + _;
              break;
            }
        }
      }
    }
    var y = Ne(o["!ref"]), O = [], j = [], Z = [];
    for (x = 0; x <= y.e.c - y.s.c; ++x) {
      var R = "", W = "", P = 0, H = [];
      for (_ = 0; _ < h.length; ++_)
        h[_][x] != null && H.push(h[_][x]);
      if (H.length == 0 || u[x] == null) {
        O[x] = "?";
        continue;
      }
      for (_ = 0; _ < H.length; ++_) {
        switch (typeof H[_]) {
          /* TODO: check if L2 compat is desired */
          case "number":
            W = "B";
            break;
          case "string":
            W = "C";
            break;
          case "boolean":
            W = "L";
            break;
          case "object":
            W = H[_] instanceof Date ? "D" : "C";
            break;
          default:
            W = "C";
        }
        P = Math.max(P, String(H[_]).length), R = R && R != W ? "C" : W;
      }
      P > 250 && (P = 250), W = ((m[x] || {}).DBF || {}).type, W == "C" && m[x].DBF.len > P && (P = m[x].DBF.len), R == "B" && W == "N" && (R = "N", Z[x] = m[x].DBF.dec, P = m[x].DBF.len), j[x] = R == "C" || W == "N" ? P : i[R] || 0, A += j[x], O[x] = R;
    }
    var D = f.next(32);
    for (D.write_shift(4, 318902576), D.write_shift(4, h.length), D.write_shift(2, 296 + 32 * F), D.write_shift(2, A), x = 0; x < 4; ++x) D.write_shift(4, 0);
    for (D.write_shift(4, 0 | (+t[
      /*::String(*/
      dl
      /*::)*/
    ] || 3) << 8), x = 0, _ = 0; x < u.length; ++x)
      if (u[x] != null) {
        var V = f.next(32), q = (u[x].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        V.write_shift(1, q, "sbcs"), V.write_shift(1, O[x] == "?" ? "C" : O[x], "sbcs"), V.write_shift(4, _), V.write_shift(1, j[x] || i[O[x]] || 0), V.write_shift(1, Z[x] || 0), V.write_shift(1, 2), V.write_shift(4, 0), V.write_shift(1, 0), V.write_shift(4, 0), V.write_shift(4, 0), _ += j[x] || i[O[x]] || 0;
      }
    var _e = f.next(264);
    for (_e.write_shift(4, 13), x = 0; x < 65; ++x) _e.write_shift(4, 0);
    for (x = 0; x < h.length; ++x) {
      var fe = f.next(A);
      for (fe.write_shift(1, 0), _ = 0; _ < u.length; ++_)
        if (u[_] != null)
          switch (O[_]) {
            case "L":
              fe.write_shift(1, h[x][_] == null ? 63 : h[x][_] ? 84 : 70);
              break;
            case "B":
              fe.write_shift(8, h[x][_] || 0, "f");
              break;
            case "N":
              var Ye = "0";
              for (typeof h[x][_] == "number" && (Ye = h[x][_].toFixed(Z[_] || 0)), F = 0; F < j[_] - Ye.length; ++F) fe.write_shift(1, 32);
              fe.write_shift(1, Ye, "sbcs");
              break;
            case "D":
              h[x][_] ? (fe.write_shift(4, ("0000" + h[x][_].getFullYear()).slice(-4), "sbcs"), fe.write_shift(2, ("00" + (h[x][_].getMonth() + 1)).slice(-2), "sbcs"), fe.write_shift(2, ("00" + h[x][_].getDate()).slice(-2), "sbcs")) : fe.write_shift(8, "00000000", "sbcs");
              break;
            case "C":
              var Be = String(h[x][_] != null ? h[x][_] : "").slice(0, j[_]);
              for (fe.write_shift(1, Be, "sbcs"), F = 0; F < j[_] - Be.length; ++F) fe.write_shift(1, 32);
              break;
          }
    }
    return f.next(1).write_shift(1, 26), f.end();
  }
  return {
    to_workbook: a,
    to_sheet: n,
    from_sheet: s
  };
})(), Fx = /* @__PURE__ */ (function() {
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
  }, t = new RegExp("\x1BN(" + et(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm"), r = function(u, h) {
    var m = e[h];
    return typeof m == "number" ? y0(m) : m;
  }, n = function(u, h, m) {
    var x = h.charCodeAt(0) - 32 << 4 | m.charCodeAt(0) - 48;
    return x == 59 ? u : y0(x);
  };
  e["|"] = 254;
  function a(u, h) {
    switch (h.type) {
      case "base64":
        return i(Jt(u), h);
      case "binary":
        return i(u, h);
      case "buffer":
        return i(we && Buffer.isBuffer(u) ? u.toString("binary") : qn(u), h);
      case "array":
        return i(Ya(u), h);
    }
    throw new Error("Unrecognized type " + h.type);
  }
  function i(u, h) {
    var m = u.split(/[\n\r]+/), x = -1, _ = -1, F = 0, A = 0, y = [], O = [], j = null, Z = {}, R = [], W = [], P = [], H = 0, D;
    for (+h.codepage >= 0 && Gn(+h.codepage); F !== m.length; ++F) {
      H = 0;
      var V = m[F].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, n).replace(t, r), q = V.replace(/;;/g, "\0").split(";").map(function(C) {
        return C.replace(/\u0000/g, ";");
      }), _e = q[0], fe;
      if (V.length > 0) switch (_e) {
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
          q[1].charAt(0) == "P" && O.push(V.slice(3).replace(/;;/g, ";"));
          break;
        case "C":
          var Ye = !1, Be = !1, Ot = !1, Ve = !1, Tt = -1, mt = -1;
          for (A = 1; A < q.length; ++A) switch (q[A].charAt(0)) {
            case "A":
              break;
            // TODO: comment
            case "X":
              _ = parseInt(q[A].slice(1)) - 1, Be = !0;
              break;
            case "Y":
              for (x = parseInt(q[A].slice(1)) - 1, Be || (_ = 0), D = y.length; D <= x; ++D) y[D] = [];
              break;
            case "K":
              fe = q[A].slice(1), fe.charAt(0) === '"' ? fe = fe.slice(1, fe.length - 1) : fe === "TRUE" ? fe = !0 : fe === "FALSE" ? fe = !1 : isNaN(Yt(fe)) ? isNaN(zn(fe).getDate()) || (fe = ft(fe)) : (fe = Yt(fe), j !== null && Cl(j) && (fe = Rl(fe))), Ye = !0;
              break;
            case "E":
              Ve = !0;
              var S = yp(q[A].slice(1), { r: x, c: _ });
              y[x][_] = [y[x][_], S];
              break;
            case "S":
              Ot = !0, y[x][_] = [y[x][_], "S5S"];
              break;
            case "G":
              break;
            // unknown
            case "R":
              Tt = parseInt(q[A].slice(1)) - 1;
              break;
            case "C":
              mt = parseInt(q[A].slice(1)) - 1;
              break;
            default:
              if (h && h.WTF) throw new Error("SYLK bad record " + V);
          }
          if (Ye && (y[x][_] && y[x][_].length == 2 ? y[x][_][0] = fe : y[x][_] = fe, j = null), Ot) {
            if (Ve) throw new Error("SYLK shared formula cannot have own formula");
            var b = Tt > -1 && y[Tt][mt];
            if (!b || !b[1]) throw new Error("SYLK shared formula cannot find base");
            y[x][_][1] = Cp(b[1], { r: x - Tt, c: _ - mt });
          }
          break;
        case "F":
          var k = 0;
          for (A = 1; A < q.length; ++A) switch (q[A].charAt(0)) {
            case "X":
              _ = parseInt(q[A].slice(1)) - 1, ++k;
              break;
            case "Y":
              for (x = parseInt(q[A].slice(1)) - 1, D = y.length; D <= x; ++D) y[D] = [];
              break;
            case "M":
              H = parseInt(q[A].slice(1)) / 20;
              break;
            case "F":
              break;
            /* ??? */
            case "G":
              break;
            /* hide grid */
            case "P":
              j = O[parseInt(q[A].slice(1))];
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
              for (P = q[A].slice(1).split(" "), D = parseInt(P[0], 10); D <= parseInt(P[1], 10); ++D)
                H = parseInt(P[2], 10), W[D - 1] = H === 0 ? { hidden: !0 } : { wch: H }, Es(W[D - 1]);
              break;
            case "C":
              _ = parseInt(q[A].slice(1)) - 1, W[_] || (W[_] = {});
              break;
            case "R":
              x = parseInt(q[A].slice(1)) - 1, R[x] || (R[x] = {}), H > 0 ? (R[x].hpt = H, R[x].hpx = mc(H)) : H === 0 && (R[x].hidden = !0);
              break;
            default:
              if (h && h.WTF) throw new Error("SYLK bad record " + V);
          }
          k < 1 && (j = null);
          break;
        default:
          if (h && h.WTF) throw new Error("SYLK bad record " + V);
      }
    }
    return R.length > 0 && (Z["!rows"] = R), W.length > 0 && (Z["!cols"] = W), h && h.sheetRows && (y = y.slice(0, h.sheetRows)), [y, Z];
  }
  function s(u, h) {
    var m = a(u, h), x = m[0], _ = m[1], F = xn(x, h);
    return et(_).forEach(function(A) {
      F[A] = _[A];
    }), F;
  }
  function o(u, h) {
    return Pr(s(u, h), h);
  }
  function c(u, h, m, x) {
    var _ = "C;Y" + (m + 1) + ";X" + (x + 1) + ";K";
    switch (u.t) {
      case "n":
        _ += u.v || 0, u.f && !u.F && (_ += ";E" + Ss(u.f, { r: m, c: x }));
        break;
      case "b":
        _ += u.v ? "TRUE" : "FALSE";
        break;
      case "e":
        _ += u.w || u.v;
        break;
      case "d":
        _ += '"' + (u.w || u.v) + '"';
        break;
      case "s":
        _ += '"' + u.v.replace(/"/g, "").replace(/;/g, ";;") + '"';
        break;
    }
    return _;
  }
  function l(u, h) {
    h.forEach(function(m, x) {
      var _ = "F;W" + (x + 1) + " " + (x + 1) + " ";
      m.hidden ? _ += "0" : (typeof m.width == "number" && !m.wpx && (m.wpx = ba(m.width)), typeof m.wpx == "number" && !m.wch && (m.wch = Ba(m.wpx)), typeof m.wch == "number" && (_ += Math.round(m.wch))), _.charAt(_.length - 1) != " " && u.push(_);
    });
  }
  function f(u, h) {
    h.forEach(function(m, x) {
      var _ = "F;";
      m.hidden ? _ += "M0;" : m.hpt ? _ += "M" + 20 * m.hpt + ";" : m.hpx && (_ += "M" + 20 * Ua(m.hpx) + ";"), _.length > 2 && u.push(_ + "R" + (x + 1));
    });
  }
  function d(u, h) {
    var m = ["ID;PWXL;N;E"], x = [], _ = Ne(u["!ref"]), F, A = Array.isArray(u), y = `\r
`;
    m.push("P;PGeneral"), m.push("F;P0;DG0G8;M255"), u["!cols"] && l(m, u["!cols"]), u["!rows"] && f(m, u["!rows"]), m.push("B;Y" + (_.e.r - _.s.r + 1) + ";X" + (_.e.c - _.s.c + 1) + ";D" + [_.s.c, _.s.r, _.e.c, _.e.r].join(" "));
    for (var O = _.s.r; O <= _.e.r; ++O)
      for (var j = _.s.c; j <= _.e.c; ++j) {
        var Z = Fe({ r: O, c: j });
        F = A ? (u[O] || [])[j] : u[Z], !(!F || F.v == null && (!F.f || F.F)) && x.push(c(F, u, O, j));
      }
    return m.join(y) + y + x.join(y) + y + "E" + y;
  }
  return {
    to_workbook: o,
    to_sheet: s,
    from_sheet: d
  };
})(), kx = /* @__PURE__ */ (function() {
  function e(i, s) {
    switch (s.type) {
      case "base64":
        return t(Jt(i), s);
      case "binary":
        return t(i, s);
      case "buffer":
        return t(we && Buffer.isBuffer(i) ? i.toString("binary") : qn(i), s);
      case "array":
        return t(Ya(i), s);
    }
    throw new Error("Unrecognized type " + s.type);
  }
  function t(i, s) {
    for (var o = i.split(`
`), c = -1, l = -1, f = 0, d = []; f !== o.length; ++f) {
      if (o[f].trim() === "BOT") {
        d[++c] = [], l = 0;
        continue;
      }
      if (!(c < 0)) {
        var u = o[f].trim().split(","), h = u[0], m = u[1];
        ++f;
        for (var x = o[f] || ""; (x.match(/["]/g) || []).length & 1 && f < o.length - 1; ) x += `
` + o[++f];
        switch (x = x.trim(), +h) {
          case -1:
            if (x === "BOT") {
              d[++c] = [], l = 0;
              continue;
            } else if (x !== "EOD") throw new Error("Unrecognized DIF special command " + x);
            break;
          case 0:
            x === "TRUE" ? d[c][l] = !0 : x === "FALSE" ? d[c][l] = !1 : isNaN(Yt(m)) ? isNaN(zn(m).getDate()) ? d[c][l] = m : d[c][l] = ft(m) : d[c][l] = Yt(m), ++l;
            break;
          case 1:
            x = x.slice(1, x.length - 1), x = x.replace(/""/g, '"'), x && x.match(/^=".*"$/) && (x = x.slice(2, -1)), d[c][l++] = x !== "" ? x : null;
            break;
        }
        if (x === "EOD") break;
      }
    }
    return s && s.sheetRows && (d = d.slice(0, s.sheetRows)), d;
  }
  function r(i, s) {
    return xn(e(i, s), s);
  }
  function n(i, s) {
    return Pr(r(i, s), s);
  }
  var a = /* @__PURE__ */ (function() {
    var i = function(c, l, f, d, u) {
      c.push(l), c.push(f + "," + d), c.push('"' + u.replace(/"/g, '""') + '"');
    }, s = function(c, l, f, d) {
      c.push(l + "," + f), c.push(l == 1 ? '"' + d.replace(/"/g, '""') + '"' : d);
    };
    return function(c) {
      var l = [], f = Ne(c["!ref"]), d, u = Array.isArray(c);
      i(l, "TABLE", 0, 1, "sheetjs"), i(l, "VECTORS", 0, f.e.r - f.s.r + 1, ""), i(l, "TUPLES", 0, f.e.c - f.s.c + 1, ""), i(l, "DATA", 0, 0, "");
      for (var h = f.s.r; h <= f.e.r; ++h) {
        s(l, -1, 0, "BOT");
        for (var m = f.s.c; m <= f.e.c; ++m) {
          var x = Fe({ r: h, c: m });
          if (d = u ? (c[h] || [])[m] : c[x], !d) {
            s(l, 1, 0, "");
            continue;
          }
          switch (d.t) {
            case "n":
              var _ = d.w;
              !_ && d.v != null && (_ = d.v), _ == null ? d.f && !d.F ? s(l, 1, 0, "=" + d.f) : s(l, 1, 0, "") : s(l, 0, _, "V");
              break;
            case "b":
              s(l, 0, d.v ? 1 : 0, d.v ? "TRUE" : "FALSE");
              break;
            case "s":
              s(l, 1, 0, isNaN(d.v) ? d.v : '="' + d.v + '"');
              break;
            case "d":
              d.w || (d.w = dr(d.z || be[14], dt(ft(d.v)))), s(l, 0, d.w, "V");
              break;
            default:
              s(l, 1, 0, "");
          }
        }
      }
      s(l, -1, 0, "EOD");
      var F = `\r
`, A = l.join(F);
      return A;
    };
  })();
  return {
    to_workbook: n,
    to_sheet: r,
    from_sheet: a
  };
})(), hc = /* @__PURE__ */ (function() {
  function e(d) {
    return d.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
  }
  function t(d) {
    return d.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
  }
  function r(d, u) {
    for (var h = d.split(`
`), m = -1, x = -1, _ = 0, F = []; _ !== h.length; ++_) {
      var A = h[_].trim().split(":");
      if (A[0] === "cell") {
        var y = je(A[1]);
        if (F.length <= y.r) for (m = F.length; m <= y.r; ++m) F[m] || (F[m] = []);
        switch (m = y.r, x = y.c, A[2]) {
          case "t":
            F[m][x] = e(A[3]);
            break;
          case "v":
            F[m][x] = +A[3];
            break;
          case "vtf":
            var O = A[A.length - 1];
          /* falls through */
          case "vtc":
            switch (A[3]) {
              case "nl":
                F[m][x] = !!+A[4];
                break;
              default:
                F[m][x] = +A[4];
                break;
            }
            A[2] == "vtf" && (F[m][x] = [F[m][x], O]);
        }
      }
    }
    return u && u.sheetRows && (F = F.slice(0, u.sheetRows)), F;
  }
  function n(d, u) {
    return xn(r(d, u), u);
  }
  function a(d, u) {
    return Pr(n(d, u), u);
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
`), c = "--SocialCalcSpreadsheetControlSave--";
  function l(d) {
    if (!d || !d["!ref"]) return "";
    for (var u = [], h = [], m, x = "", _ = Et(d["!ref"]), F = Array.isArray(d), A = _.s.r; A <= _.e.r; ++A)
      for (var y = _.s.c; y <= _.e.c; ++y)
        if (x = Fe({ r: A, c: y }), m = F ? (d[A] || [])[y] : d[x], !(!m || m.v == null || m.t === "z")) {
          switch (h = ["cell", x, "t"], m.t) {
            case "s":
            case "str":
              h.push(t(m.v));
              break;
            case "n":
              m.f ? (h[2] = "vtf", h[3] = "n", h[4] = m.v, h[5] = t(m.f)) : (h[2] = "v", h[3] = m.v);
              break;
            case "b":
              h[2] = "vt" + (m.f ? "f" : "c"), h[3] = "nl", h[4] = m.v ? "1" : "0", h[5] = t(m.f || (m.v ? "TRUE" : "FALSE"));
              break;
            case "d":
              var O = dt(ft(m.v));
              h[2] = "vtc", h[3] = "nd", h[4] = "" + O, h[5] = m.w || dr(m.z || be[14], O);
              break;
            case "e":
              continue;
          }
          u.push(h.join(":"));
        }
    return u.push("sheet:c:" + (_.e.c - _.s.c + 1) + ":r:" + (_.e.r - _.s.r + 1) + ":tvf:1"), u.push("valueformat:1:text-wiki"), u.join(`
`);
  }
  function f(d) {
    return [i, s, o, s, l(d), c].join(`
`);
  }
  return {
    to_workbook: a,
    to_sheet: n,
    from_sheet: f
  };
})(), Ax = /* @__PURE__ */ (function() {
  function e(f, d, u, h, m) {
    m.raw ? d[u][h] = f : f === "" || (f === "TRUE" ? d[u][h] = !0 : f === "FALSE" ? d[u][h] = !1 : isNaN(Yt(f)) ? isNaN(zn(f).getDate()) ? d[u][h] = f : d[u][h] = ft(f) : d[u][h] = Yt(f));
  }
  function t(f, d) {
    var u = d || {}, h = [];
    if (!f || f.length === 0) return h;
    for (var m = f.split(/[\r\n]/), x = m.length - 1; x >= 0 && m[x].length === 0; ) --x;
    for (var _ = 10, F = 0, A = 0; A <= x; ++A)
      F = m[A].indexOf(" "), F == -1 ? F = m[A].length : F++, _ = Math.max(_, F);
    for (A = 0; A <= x; ++A) {
      h[A] = [];
      var y = 0;
      for (e(m[A].slice(0, _).trim(), h, A, y, u), y = 1; y <= (m[A].length - _) / 10 + 1; ++y)
        e(m[A].slice(_ + (y - 1) * 10, _ + y * 10).trim(), h, A, y, u);
    }
    return u.sheetRows && (h = h.slice(0, u.sheetRows)), h;
  }
  var r = {
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
  function a(f) {
    for (var d = {}, u = !1, h = 0, m = 0; h < f.length; ++h)
      (m = f.charCodeAt(h)) == 34 ? u = !u : !u && m in r && (d[m] = (d[m] || 0) + 1);
    m = [];
    for (h in d) Object.prototype.hasOwnProperty.call(d, h) && m.push([d[h], h]);
    if (!m.length) {
      d = n;
      for (h in d) Object.prototype.hasOwnProperty.call(d, h) && m.push([d[h], h]);
    }
    return m.sort(function(x, _) {
      return x[0] - _[0] || n[x[1]] - n[_[1]];
    }), r[m.pop()[1]] || 44;
  }
  function i(f, d) {
    var u = d || {}, h = "", m = u.dense ? [] : {}, x = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    f.slice(0, 4) == "sep=" ? f.charCodeAt(5) == 13 && f.charCodeAt(6) == 10 ? (h = f.charAt(4), f = f.slice(7)) : f.charCodeAt(5) == 13 || f.charCodeAt(5) == 10 ? (h = f.charAt(4), f = f.slice(6)) : h = a(f.slice(0, 1024)) : u && u.FS ? h = u.FS : h = a(f.slice(0, 1024));
    var _ = 0, F = 0, A = 0, y = 0, O = 0, j = h.charCodeAt(0), Z = !1, R = 0, W = f.charCodeAt(0);
    f = f.replace(/\r\n/mg, `
`);
    var P = u.dateNF != null ? V1(u.dateNF) : null;
    function H() {
      var D = f.slice(y, O), V = {};
      if (D.charAt(0) == '"' && D.charAt(D.length - 1) == '"' && (D = D.slice(1, -1).replace(/""/g, '"')), D.length === 0) V.t = "z";
      else if (u.raw)
        V.t = "s", V.v = D;
      else if (D.trim().length === 0)
        V.t = "s", V.v = D;
      else if (D.charCodeAt(0) == 61)
        D.charCodeAt(1) == 34 && D.charCodeAt(D.length - 1) == 34 ? (V.t = "s", V.v = D.slice(2, -1).replace(/""/g, '"')) : Fp(D) ? (V.t = "n", V.f = D.slice(1)) : (V.t = "s", V.v = D);
      else if (D == "TRUE")
        V.t = "b", V.v = !0;
      else if (D == "FALSE")
        V.t = "b", V.v = !1;
      else if (!isNaN(A = Yt(D)))
        V.t = "n", u.cellText !== !1 && (V.w = D), V.v = A;
      else if (!isNaN(zn(D).getDate()) || P && D.match(P)) {
        V.z = u.dateNF || be[14];
        var q = 0;
        P && D.match(P) && (D = z1(D, u.dateNF, D.match(P) || []), q = 1), u.cellDates ? (V.t = "d", V.v = ft(D, q)) : (V.t = "n", V.v = dt(ft(D, q))), u.cellText !== !1 && (V.w = dr(V.z, V.v instanceof Date ? dt(V.v) : V.v)), u.cellNF || delete V.z;
      } else
        V.t = "s", V.v = D;
      if (V.t == "z" || (u.dense ? (m[_] || (m[_] = []), m[_][F] = V) : m[Fe({ c: F, r: _ })] = V), y = O + 1, W = f.charCodeAt(y), x.e.c < F && (x.e.c = F), x.e.r < _ && (x.e.r = _), R == j) ++F;
      else if (F = 0, ++_, u.sheetRows && u.sheetRows <= _) return !0;
    }
    e: for (; O < f.length; ++O) switch (R = f.charCodeAt(O)) {
      case 34:
        W === 34 && (Z = !Z);
        break;
      case j:
      case 10:
      case 13:
        if (!Z && H()) break e;
        break;
    }
    return O - y > 0 && H(), m["!ref"] = $e(x), m;
  }
  function s(f, d) {
    return !(d && d.PRN) || d.FS || f.slice(0, 4) == "sep=" || f.indexOf("	") >= 0 || f.indexOf(",") >= 0 || f.indexOf(";") >= 0 ? i(f, d) : xn(t(f, d), d);
  }
  function o(f, d) {
    var u = "", h = d.type == "string" ? [0, 0, 0, 0] : Wg(f, d);
    switch (d.type) {
      case "base64":
        u = Jt(f);
        break;
      case "binary":
        u = f;
        break;
      case "buffer":
        d.codepage == 65001 ? u = f.toString("utf8") : d.codepage && typeof Aa < "u" || (u = we && Buffer.isBuffer(f) ? f.toString("binary") : qn(f));
        break;
      case "array":
        u = Ya(f);
        break;
      case "string":
        u = f;
        break;
      default:
        throw new Error("Unrecognized type " + d.type);
    }
    return h[0] == 239 && h[1] == 187 && h[2] == 191 ? u = Bn(u.slice(3)) : d.type != "string" && d.type != "buffer" && d.codepage == 65001 ? u = Bn(u) : d.type == "binary" && typeof Aa < "u", u.slice(0, 19) == "socialcalc:version:" ? hc.to_sheet(d.type == "string" ? u : Bn(u), d) : s(u, d);
  }
  function c(f, d) {
    return Pr(o(f, d), d);
  }
  function l(f) {
    for (var d = [], u = Ne(f["!ref"]), h, m = Array.isArray(f), x = u.s.r; x <= u.e.r; ++x) {
      for (var _ = [], F = u.s.c; F <= u.e.c; ++F) {
        var A = Fe({ r: x, c: F });
        if (h = m ? (f[x] || [])[F] : f[A], !h || h.v == null) {
          _.push("          ");
          continue;
        }
        for (var y = (h.w || (Qt(h), h.w) || "").slice(0, 10); y.length < 10; ) y += " ";
        _.push(y + (F === 0 ? " " : ""));
      }
      d.push(_.join(""));
    }
    return d.join(`
`);
  }
  return {
    to_workbook: c,
    to_sheet: o,
    from_sheet: l
  };
})(), to = /* @__PURE__ */ (function() {
  function e(S, b, k) {
    if (S) {
      vt(S, S.l || 0);
      for (var C = k.Enum || Tt; S.l < S.length; ) {
        var z = S.read_shift(2), oe = C[z] || C[65535], le = S.read_shift(2), se = S.l + le, te = oe.f && oe.f(S, le, k);
        if (S.l = se, b(te, oe, z)) return;
      }
    }
  }
  function t(S, b) {
    switch (b.type) {
      case "base64":
        return r(Dt(Jt(S)), b);
      case "binary":
        return r(Dt(S), b);
      case "buffer":
      case "array":
        return r(S, b);
    }
    throw "Unsupported type " + b.type;
  }
  function r(S, b) {
    if (!S) return S;
    var k = b || {}, C = k.dense ? [] : {}, z = "Sheet1", oe = "", le = 0, se = {}, te = [], Ae = [], ve = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, it = k.sheetRows || 0;
    if (S[2] == 0 && (S[3] == 8 || S[3] == 9) && S.length >= 16 && S[14] == 5 && S[15] === 108)
      throw new Error("Unsupported Works 3 for Mac file");
    if (S[2] == 2)
      k.Enum = Tt, e(S, function(ie, St, Vt) {
        switch (Vt) {
          case 0:
            k.vers = ie, ie >= 4096 && (k.qpro = !0);
            break;
          case 6:
            ve = ie;
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
            k.qpro || (ie[1].v = ie[1].v.slice(1));
          /* falls through */
          case 13:
          /* INTEGER */
          case 14:
          /* NUMBER */
          case 16:
            Vt == 14 && (ie[2] & 112) == 112 && (ie[2] & 15) > 1 && (ie[2] & 15) < 15 && (ie[1].z = k.dateNF || be[14], k.cellDates && (ie[1].t = "d", ie[1].v = Rl(ie[1].v))), k.qpro && ie[3] > le && (C["!ref"] = $e(ve), se[z] = C, te.push(z), C = k.dense ? [] : {}, ve = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, le = ie[3], z = oe || "Sheet" + (le + 1), oe = "");
            var _r = k.dense ? (C[ie[0].r] || [])[ie[0].c] : C[Fe(ie[0])];
            if (_r) {
              _r.t = ie[1].t, _r.v = ie[1].v, ie[1].z != null && (_r.z = ie[1].z), ie[1].f != null && (_r.f = ie[1].f);
              break;
            }
            k.dense ? (C[ie[0].r] || (C[ie[0].r] = []), C[ie[0].r][ie[0].c] = ie[1]) : C[Fe(ie[0])] = ie[1];
            break;
        }
      }, k);
    else if (S[2] == 26 || S[2] == 14)
      k.Enum = mt, S[2] == 14 && (k.qpro = !0, S.l = 0), e(S, function(ie, St, Vt) {
        switch (Vt) {
          case 204:
            z = ie;
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
            if (ie[3] > le && (C["!ref"] = $e(ve), se[z] = C, te.push(z), C = k.dense ? [] : {}, ve = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, le = ie[3], z = "Sheet" + (le + 1)), it > 0 && ie[0].r >= it) break;
            k.dense ? (C[ie[0].r] || (C[ie[0].r] = []), C[ie[0].r][ie[0].c] = ie[1]) : C[Fe(ie[0])] = ie[1], ve.e.c < ie[0].c && (ve.e.c = ie[0].c), ve.e.r < ie[0].r && (ve.e.r = ie[0].r);
            break;
          case 27:
            ie[14e3] && (Ae[ie[14e3][0]] = ie[14e3][1]);
            break;
          case 1537:
            Ae[ie[0]] = ie[1], ie[0] == le && (z = ie[1]);
            break;
        }
      }, k);
    else throw new Error("Unrecognized LOTUS BOF " + S[2]);
    if (C["!ref"] = $e(ve), se[oe || z] = C, te.push(oe || z), !Ae.length) return { SheetNames: te, Sheets: se };
    for (var Ee = {}, Gt = [], Pe = 0; Pe < Ae.length; ++Pe) se[te[Pe]] ? (Gt.push(Ae[Pe] || te[Pe]), Ee[Ae[Pe]] = se[Ae[Pe]] || se[te[Pe]]) : (Gt.push(Ae[Pe]), Ee[Ae[Pe]] = { "!ref": "A1" });
    return { SheetNames: Gt, Sheets: Ee };
  }
  function n(S, b) {
    var k = b || {};
    if (+k.codepage >= 0 && Gn(+k.codepage), k.type == "string") throw new Error("Cannot write WK1 to JS string");
    var C = ht(), z = Ne(S["!ref"]), oe = Array.isArray(S), le = [];
    Q(C, 0, i(1030)), Q(C, 6, c(z));
    for (var se = Math.min(z.e.r, 8191), te = z.s.r; te <= se; ++te)
      for (var Ae = Ze(te), ve = z.s.c; ve <= z.e.c; ++ve) {
        te === z.s.r && (le[ve] = rt(ve));
        var it = le[ve] + Ae, Ee = oe ? (S[te] || [])[ve] : S[it];
        if (!(!Ee || Ee.t == "z"))
          if (Ee.t == "n")
            (Ee.v | 0) == Ee.v && Ee.v >= -32768 && Ee.v <= 32767 ? Q(C, 13, h(te, ve, Ee.v)) : Q(C, 14, x(te, ve, Ee.v));
          else {
            var Gt = Qt(Ee);
            Q(C, 15, d(te, ve, Gt.slice(0, 239)));
          }
      }
    return Q(C, 1), C.end();
  }
  function a(S, b) {
    var k = b || {};
    if (+k.codepage >= 0 && Gn(+k.codepage), k.type == "string") throw new Error("Cannot write WK3 to JS string");
    var C = ht();
    Q(C, 0, s(S));
    for (var z = 0, oe = 0; z < S.SheetNames.length; ++z) (S.Sheets[S.SheetNames[z]] || {})["!ref"] && Q(C, 27, Ve(S.SheetNames[z], oe++));
    var le = 0;
    for (z = 0; z < S.SheetNames.length; ++z) {
      var se = S.Sheets[S.SheetNames[z]];
      if (!(!se || !se["!ref"])) {
        for (var te = Ne(se["!ref"]), Ae = Array.isArray(se), ve = [], it = Math.min(te.e.r, 8191), Ee = te.s.r; Ee <= it; ++Ee)
          for (var Gt = Ze(Ee), Pe = te.s.c; Pe <= te.e.c; ++Pe) {
            Ee === te.s.r && (ve[Pe] = rt(Pe));
            var ie = ve[Pe] + Gt, St = Ae ? (se[Ee] || [])[Pe] : se[ie];
            if (!(!St || St.t == "z"))
              if (St.t == "n")
                Q(C, 23, H(Ee, Pe, le, St.v));
              else {
                var Vt = Qt(St);
                Q(C, 22, R(Ee, Pe, le, Vt.slice(0, 239)));
              }
          }
        ++le;
      }
    }
    return Q(C, 1), C.end();
  }
  function i(S) {
    var b = B(2);
    return b.write_shift(2, S), b;
  }
  function s(S) {
    var b = B(26);
    b.write_shift(2, 4096), b.write_shift(2, 4), b.write_shift(4, 0);
    for (var k = 0, C = 0, z = 0, oe = 0; oe < S.SheetNames.length; ++oe) {
      var le = S.SheetNames[oe], se = S.Sheets[le];
      if (!(!se || !se["!ref"])) {
        ++z;
        var te = Et(se["!ref"]);
        k < te.e.r && (k = te.e.r), C < te.e.c && (C = te.e.c);
      }
    }
    return k > 8191 && (k = 8191), b.write_shift(2, k), b.write_shift(1, z), b.write_shift(1, C), b.write_shift(2, 0), b.write_shift(2, 0), b.write_shift(1, 1), b.write_shift(1, 2), b.write_shift(4, 0), b.write_shift(4, 0), b;
  }
  function o(S, b, k) {
    var C = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    return b == 8 && k.qpro ? (C.s.c = S.read_shift(1), S.l++, C.s.r = S.read_shift(2), C.e.c = S.read_shift(1), S.l++, C.e.r = S.read_shift(2), C) : (C.s.c = S.read_shift(2), C.s.r = S.read_shift(2), b == 12 && k.qpro && (S.l += 2), C.e.c = S.read_shift(2), C.e.r = S.read_shift(2), b == 12 && k.qpro && (S.l += 2), C.s.c == 65535 && (C.s.c = C.e.c = C.s.r = C.e.r = 0), C);
  }
  function c(S) {
    var b = B(8);
    return b.write_shift(2, S.s.c), b.write_shift(2, S.s.r), b.write_shift(2, S.e.c), b.write_shift(2, S.e.r), b;
  }
  function l(S, b, k) {
    var C = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0, 0];
    return k.qpro && k.vers != 20768 ? (C[0].c = S.read_shift(1), C[3] = S.read_shift(1), C[0].r = S.read_shift(2), S.l += 2) : (C[2] = S.read_shift(1), C[0].c = S.read_shift(2), C[0].r = S.read_shift(2)), C;
  }
  function f(S, b, k) {
    var C = S.l + b, z = l(S, b, k);
    if (z[1].t = "s", k.vers == 20768) {
      S.l++;
      var oe = S.read_shift(1);
      return z[1].v = S.read_shift(oe, "utf8"), z;
    }
    return k.qpro && S.l++, z[1].v = S.read_shift(C - S.l, "cstr"), z;
  }
  function d(S, b, k) {
    var C = B(7 + k.length);
    C.write_shift(1, 255), C.write_shift(2, b), C.write_shift(2, S), C.write_shift(1, 39);
    for (var z = 0; z < C.length; ++z) {
      var oe = k.charCodeAt(z);
      C.write_shift(1, oe >= 128 ? 95 : oe);
    }
    return C.write_shift(1, 0), C;
  }
  function u(S, b, k) {
    var C = l(S, b, k);
    return C[1].v = S.read_shift(2, "i"), C;
  }
  function h(S, b, k) {
    var C = B(7);
    return C.write_shift(1, 255), C.write_shift(2, b), C.write_shift(2, S), C.write_shift(2, k, "i"), C;
  }
  function m(S, b, k) {
    var C = l(S, b, k);
    return C[1].v = S.read_shift(8, "f"), C;
  }
  function x(S, b, k) {
    var C = B(13);
    return C.write_shift(1, 255), C.write_shift(2, b), C.write_shift(2, S), C.write_shift(8, k, "f"), C;
  }
  function _(S, b, k) {
    var C = S.l + b, z = l(S, b, k);
    if (z[1].v = S.read_shift(8, "f"), k.qpro) S.l = C;
    else {
      var oe = S.read_shift(2);
      O(S.slice(S.l, S.l + oe), z), S.l += oe;
    }
    return z;
  }
  function F(S, b, k) {
    var C = b & 32768;
    return b &= -32769, b = (C ? S : 0) + (b >= 8192 ? b - 16384 : b), (C ? "" : "$") + (k ? rt(b) : Ze(b));
  }
  var A = {
    51: ["FALSE", 0],
    52: ["TRUE", 0],
    70: ["LEN", 1],
    80: ["SUM", 69],
    81: ["AVERAGEA", 69],
    82: ["COUNTA", 69],
    83: ["MINA", 69],
    84: ["MAXA", 69],
    111: ["T", 1]
  }, y = [
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
  function O(S, b) {
    vt(S, 0);
    for (var k = [], C = 0, z = "", oe = "", le = "", se = ""; S.l < S.length; ) {
      var te = S[S.l++];
      switch (te) {
        case 0:
          k.push(S.read_shift(8, "f"));
          break;
        case 1:
          oe = F(b[0].c, S.read_shift(2), !0), z = F(b[0].r, S.read_shift(2), !1), k.push(oe + z);
          break;
        case 2:
          {
            var Ae = F(b[0].c, S.read_shift(2), !0), ve = F(b[0].r, S.read_shift(2), !1);
            oe = F(b[0].c, S.read_shift(2), !0), z = F(b[0].r, S.read_shift(2), !1), k.push(Ae + ve + ":" + oe + z);
          }
          break;
        case 3:
          if (S.l < S.length) {
            console.error("WK1 premature formula end");
            return;
          }
          break;
        case 4:
          k.push("(" + k.pop() + ")");
          break;
        case 5:
          k.push(S.read_shift(2));
          break;
        case 6:
          {
            for (var it = ""; te = S[S.l++]; ) it += String.fromCharCode(te);
            k.push('"' + it.replace(/"/g, '""') + '"');
          }
          break;
        case 8:
          k.push("-" + k.pop());
          break;
        case 23:
          k.push("+" + k.pop());
          break;
        case 22:
          k.push("NOT(" + k.pop() + ")");
          break;
        case 20:
        case 21:
          se = k.pop(), le = k.pop(), k.push(["AND", "OR"][te - 20] + "(" + le + "," + se + ")");
          break;
        default:
          if (te < 32 && y[te])
            se = k.pop(), le = k.pop(), k.push(le + y[te] + se);
          else if (A[te]) {
            if (C = A[te][1], C == 69 && (C = S[S.l++]), C > k.length) {
              console.error("WK1 bad formula parse 0x" + te.toString(16) + ":|" + k.join("|") + "|");
              return;
            }
            var Ee = k.slice(-C);
            k.length -= C, k.push(A[te][0] + "(" + Ee.join(",") + ")");
          } else return te <= 7 ? console.error("WK1 invalid opcode " + te.toString(16)) : te <= 24 ? console.error("WK1 unsupported op " + te.toString(16)) : te <= 30 ? console.error("WK1 invalid opcode " + te.toString(16)) : te <= 115 ? console.error("WK1 unsupported function opcode " + te.toString(16)) : console.error("WK1 unrecognized opcode " + te.toString(16));
      }
    }
    k.length == 1 ? b[1].f = "" + k[0] : console.error("WK1 bad formula parse |" + k.join("|") + "|");
  }
  function j(S) {
    var b = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0];
    return b[0].r = S.read_shift(2), b[3] = S[S.l++], b[0].c = S[S.l++], b;
  }
  function Z(S, b) {
    var k = j(S);
    return k[1].t = "s", k[1].v = S.read_shift(b - 4, "cstr"), k;
  }
  function R(S, b, k, C) {
    var z = B(6 + C.length);
    z.write_shift(2, S), z.write_shift(1, k), z.write_shift(1, b), z.write_shift(1, 39);
    for (var oe = 0; oe < C.length; ++oe) {
      var le = C.charCodeAt(oe);
      z.write_shift(1, le >= 128 ? 95 : le);
    }
    return z.write_shift(1, 0), z;
  }
  function W(S, b) {
    var k = j(S);
    k[1].v = S.read_shift(2);
    var C = k[1].v >> 1;
    if (k[1].v & 1)
      switch (C & 7) {
        case 0:
          C = (C >> 3) * 5e3;
          break;
        case 1:
          C = (C >> 3) * 500;
          break;
        case 2:
          C = (C >> 3) / 20;
          break;
        case 3:
          C = (C >> 3) / 200;
          break;
        case 4:
          C = (C >> 3) / 2e3;
          break;
        case 5:
          C = (C >> 3) / 2e4;
          break;
        case 6:
          C = (C >> 3) / 16;
          break;
        case 7:
          C = (C >> 3) / 64;
          break;
      }
    return k[1].v = C, k;
  }
  function P(S, b) {
    var k = j(S), C = S.read_shift(4), z = S.read_shift(4), oe = S.read_shift(2);
    if (oe == 65535)
      return C === 0 && z === 3221225472 ? (k[1].t = "e", k[1].v = 15) : C === 0 && z === 3489660928 ? (k[1].t = "e", k[1].v = 42) : k[1].v = 0, k;
    var le = oe & 32768;
    return oe = (oe & 32767) - 16446, k[1].v = (1 - le * 2) * (z * Math.pow(2, oe + 32) + C * Math.pow(2, oe)), k;
  }
  function H(S, b, k, C) {
    var z = B(14);
    if (z.write_shift(2, S), z.write_shift(1, k), z.write_shift(1, b), C == 0)
      return z.write_shift(4, 0), z.write_shift(4, 0), z.write_shift(2, 65535), z;
    var oe = 0, le = 0, se = 0, te = 0;
    return C < 0 && (oe = 1, C = -C), le = Math.log2(C) | 0, C /= Math.pow(2, le - 31), te = C >>> 0, (te & 2147483648) == 0 && (C /= 2, ++le, te = C >>> 0), C -= te, te |= 2147483648, te >>>= 0, C *= Math.pow(2, 32), se = C >>> 0, z.write_shift(4, se), z.write_shift(4, te), le += 16383 + (oe ? 32768 : 0), z.write_shift(2, le), z;
  }
  function D(S, b) {
    var k = P(S);
    return S.l += b - 14, k;
  }
  function V(S, b) {
    var k = j(S), C = S.read_shift(4);
    return k[1].v = C >> 6, k;
  }
  function q(S, b) {
    var k = j(S), C = S.read_shift(8, "f");
    return k[1].v = C, k;
  }
  function _e(S, b) {
    var k = q(S);
    return S.l += b - 10, k;
  }
  function fe(S, b) {
    return S[S.l + b - 1] == 0 ? S.read_shift(b, "cstr") : "";
  }
  function Ye(S, b) {
    var k = S[S.l++];
    k > b - 1 && (k = b - 1);
    for (var C = ""; C.length < k; ) C += String.fromCharCode(S[S.l++]);
    return C;
  }
  function Be(S, b, k) {
    if (!(!k.qpro || b < 21)) {
      var C = S.read_shift(1);
      S.l += 17, S.l += 1, S.l += 2;
      var z = S.read_shift(b - 21, "cstr");
      return [C, z];
    }
  }
  function Ot(S, b) {
    for (var k = {}, C = S.l + b; S.l < C; ) {
      var z = S.read_shift(2);
      if (z == 14e3) {
        for (k[z] = [0, ""], k[z][0] = S.read_shift(2); S[S.l]; )
          k[z][1] += String.fromCharCode(S[S.l]), S.l++;
        S.l++;
      }
    }
    return k;
  }
  function Ve(S, b) {
    var k = B(5 + S.length);
    k.write_shift(2, 14e3), k.write_shift(2, b);
    for (var C = 0; C < S.length; ++C) {
      var z = S.charCodeAt(C);
      k[k.l++] = z > 127 ? 95 : z;
    }
    return k[k.l++] = 0, k;
  }
  var Tt = {
    /*::[*/
    0: { n: "BOF", f: oc },
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
    13: { n: "INTEGER", f: u },
    /*::[*/
    14: { n: "NUMBER", f: m },
    /*::[*/
    15: { n: "LABEL", f },
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
    51: { n: "STRING", f },
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
    204: { n: "SHEETNAMECS", f: fe },
    /*::[*/
    222: { n: "SHEETNAMELP", f: Ye },
    /*::[*/
    65535: { n: "" }
  }, mt = {
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
    22: { n: "LABEL16", f: Z },
    /*::[*/
    23: { n: "NUMBER17", f: P },
    /*::[*/
    24: { n: "NUMBER18", f: W },
    /*::[*/
    25: { n: "FORMULA19", f: D },
    /*::[*/
    26: { n: "FORMULA1A" },
    /*::[*/
    27: { n: "XFORMAT", f: Ot },
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
    37: { n: "NUMBER25", f: V },
    /*::[*/
    38: { n: "??" },
    /*::[*/
    39: { n: "NUMBER27", f: q },
    /*::[*/
    40: { n: "FORMULA28", f: _e },
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
    204: { n: "SHEETNAMECS", f: fe },
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
    1537: { n: "SHEETINFOQP", f: Be },
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
    to_workbook: t
  };
})(), Rx = /^\s|\s$|[\t\n\r]/;
function dc(e, t) {
  if (!t.bookSST) return "";
  var r = [He];
  r[r.length] = J("sst", null, {
    xmlns: dn[0],
    count: e.Count,
    uniqueCount: e.Unique
  });
  for (var n = 0; n != e.length; ++n)
    if (e[n] != null) {
      var a = e[n], i = "<si>";
      a.r ? i += a.r : (i += "<t", a.t || (a.t = ""), a.t.match(Rx) && (i += ' xml:space="preserve"'), i += ">" + Ce(a.t) + "</t>"), i += "</si>", r[r.length] = i;
    }
  return r.length > 2 && (r[r.length] = "</sst>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Ox(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function Ix(e, t) {
  return t || (t = B(8)), t.write_shift(4, e.Count), t.write_shift(4, e.Unique), t;
}
var Nx = Td;
function Dx(e) {
  var t = ht();
  G(t, 159, Ix(e));
  for (var r = 0; r < e.length; ++r) G(t, 19, Nx(e[r]));
  return G(
    t,
    160
    /* BrtEndSst */
  ), t.end();
}
function Mx(e) {
  for (var t = [], r = e.split(""), n = 0; n < r.length; ++n) t[n] = r[n].charCodeAt(0);
  return t;
}
function xc(e) {
  var t = 0, r, n = Mx(e), a = n.length + 1, i, s, o, c, l;
  for (r = Nr(a), r[0] = n.length, i = 1; i != a; ++i) r[i] = n[i - 1];
  for (i = a - 1; i >= 0; --i)
    s = r[i], o = (t & 16384) === 0 ? 0 : 1, c = t << 1 & 32767, l = o | c, t = l ^ s;
  return t ^ 52811;
}
var Px = /* @__PURE__ */ (function() {
  function e(a, i) {
    switch (i.type) {
      case "base64":
        return t(Jt(a), i);
      case "binary":
        return t(a, i);
      case "buffer":
        return t(we && Buffer.isBuffer(a) ? a.toString("binary") : qn(a), i);
      case "array":
        return t(Ya(a), i);
    }
    throw new Error("Unrecognized type " + i.type);
  }
  function t(a, i) {
    var s = i || {}, o = s.dense ? [] : {}, c = a.match(/\\trowd.*?\\row\b/g);
    if (!c.length) throw new Error("RTF missing table");
    var l = { s: { c: 0, r: 0 }, e: { c: 0, r: c.length - 1 } };
    return c.forEach(function(f, d) {
      Array.isArray(o) && (o[d] = []);
      for (var u = /\\\w+\b/g, h = 0, m, x = -1; m = u.exec(f); ) {
        switch (m[0]) {
          case "\\cell":
            var _ = f.slice(h, u.lastIndex - m[0].length);
            if (_[0] == " " && (_ = _.slice(1)), ++x, _.length) {
              var F = { v: _, t: "s" };
              Array.isArray(o) ? o[d][x] = F : o[Fe({ r: d, c: x })] = F;
            }
            break;
        }
        h = u.lastIndex;
      }
      x > l.e.c && (l.e.c = x);
    }), o["!ref"] = $e(l), o;
  }
  function r(a, i) {
    return Pr(e(a, i), i);
  }
  function n(a) {
    for (var i = ["{\\rtf1\\ansi"], s = Ne(a["!ref"]), o, c = Array.isArray(a), l = s.s.r; l <= s.e.r; ++l) {
      i.push("\\trowd\\trautofit1");
      for (var f = s.s.c; f <= s.e.c; ++f) i.push("\\cellx" + (f + 1));
      for (i.push("\\pard\\intbl"), f = s.s.c; f <= s.e.c; ++f) {
        var d = Fe({ r: l, c: f });
        o = c ? (a[l] || [])[f] : a[d], !(!o || o.v == null && (!o.f || o.F)) && (i.push(" " + (o.w || (Qt(o), o.w))), i.push("\\cell"));
      }
      i.push("\\pard\\intbl\\row");
    }
    return i.join("") + "}";
  }
  return {
    to_workbook: r,
    to_sheet: e,
    from_sheet: n
  };
})();
function ro(e) {
  for (var t = 0, r = 1; t != 3; ++t) r = r * 256 + (e[t] > 255 ? 255 : e[t] < 0 ? 0 : e[t]);
  return r.toString(16).toUpperCase().slice(1);
}
var Lx = 6, Kt = Lx;
function ba(e) {
  return Math.floor((e + Math.round(128 / Kt) / 256) * Kt);
}
function Ba(e) {
  return Math.floor((e - 5) / Kt * 100 + 0.5) / 100;
}
function Yi(e) {
  return Math.round((e * Kt + 5) / Kt * 256) / 256;
}
function Es(e) {
  e.width ? (e.wpx = ba(e.width), e.wch = Ba(e.wpx), e.MDW = Kt) : e.wpx ? (e.wch = Ba(e.wpx), e.width = Yi(e.wch), e.MDW = Kt) : typeof e.wch == "number" && (e.width = Yi(e.wch), e.wpx = ba(e.width), e.MDW = Kt), e.customWidth && delete e.customWidth;
}
var bx = 96, pc = bx;
function Ua(e) {
  return e * 96 / pc;
}
function mc(e) {
  return e * pc / 96;
}
function Bx(e) {
  var t = ["<numFmts>"];
  return [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(r) {
    for (var n = r[0]; n <= r[1]; ++n) e[n] != null && (t[t.length] = J("numFmt", null, { numFmtId: n, formatCode: Ce(e[n]) }));
  }), t.length === 1 ? "" : (t[t.length] = "</numFmts>", t[0] = J("numFmts", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
function Ux(e) {
  var t = [];
  return t[t.length] = J("cellXfs", null), e.forEach(function(r) {
    t[t.length] = J("xf", null, r);
  }), t[t.length] = "</cellXfs>", t.length === 2 ? "" : (t[0] = J("cellXfs", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
function _c(e, t) {
  var r = [He, J("styleSheet", null, {
    xmlns: dn[0],
    "xmlns:vt": ze.vt
  })], n;
  return e.SSF && (n = Bx(e.SSF)) != null && (r[r.length] = n), r[r.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', r[r.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', r[r.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', r[r.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (n = Ux(t.cellXfs)) && (r[r.length] = n), r[r.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', r[r.length] = '<dxfs count="0"/>', r[r.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', r.length > 2 && (r[r.length] = "</styleSheet>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Wx(e, t) {
  var r = e.read_shift(2), n = nt(e);
  return [r, n];
}
function $x(e, t, r) {
  r || (r = B(6 + 4 * t.length)), r.write_shift(2, e), Xe(t, r);
  var n = r.length > r.l ? r.slice(0, r.l) : r;
  return r.l == null && (r.l = r.length), n;
}
function Hx(e, t, r) {
  var n = {};
  n.sz = e.read_shift(2) / 20;
  var a = Rd(e);
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
  var c = e.read_shift(1);
  switch (c > 0 && (n.charset = c), e.l++, n.color = Ad(e), e.read_shift(1)) {
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
function Gx(e, t) {
  t || (t = B(153)), t.write_shift(2, e.sz * 20), Od(e, t), t.write_shift(2, e.bold ? 700 : 400);
  var r = 0;
  e.vertAlign == "superscript" ? r = 1 : e.vertAlign == "subscript" && (r = 2), t.write_shift(2, r), t.write_shift(1, e.underline || 0), t.write_shift(1, e.family || 0), t.write_shift(1, e.charset || 0), t.write_shift(1, 0), Pa(e.color, t);
  var n = 0;
  return n = 2, t.write_shift(1, n), Xe(e.name, t), t.length > t.l ? t.slice(0, t.l) : t;
}
var Vx = [
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
], _i, zx = Ht;
function no(e, t) {
  t || (t = B(84)), _i || (_i = cs(Vx));
  var r = _i[e.patternType];
  r == null && (r = 40), t.write_shift(4, r);
  var n = 0;
  if (r != 40)
    for (Pa({ auto: 1 }, t), Pa({ auto: 1 }, t); n < 12; ++n) t.write_shift(4, 0);
  else {
    for (; n < 4; ++n) t.write_shift(4, 0);
    for (; n < 12; ++n) t.write_shift(4, 0);
  }
  return t.length > t.l ? t.slice(0, t.l) : t;
}
function jx(e, t) {
  var r = e.l + t, n = e.read_shift(2), a = e.read_shift(2);
  return e.l = r, { ixfe: n, numFmtId: a };
}
function vc(e, t, r) {
  r || (r = B(16)), r.write_shift(2, t || 0), r.write_shift(2, e.numFmtId || 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(1, 0), r.write_shift(1, 0);
  var n = 0;
  return r.write_shift(1, n), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(1, 0), r;
}
function kn(e, t) {
  return t || (t = B(10)), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var Xx = Ht;
function Yx(e, t) {
  return t || (t = B(51)), t.write_shift(1, 0), kn(null, t), kn(null, t), kn(null, t), kn(null, t), kn(null, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Kx(e, t) {
  return t || (t = B(52)), t.write_shift(4, e.xfId), t.write_shift(2, 1), t.write_shift(1, 0), t.write_shift(1, 0), Ma(e.name || "", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Jx(e, t, r) {
  var n = B(2052);
  return n.write_shift(4, e), Ma(t, n), Ma(r, n), n.length > n.l ? n.slice(0, n.l) : n;
}
function Qx(e, t) {
  if (t) {
    var r = 0;
    [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a) t[a] != null && ++r;
    }), r != 0 && (G(e, 615, Lt(r)), [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a) t[a] != null && G(e, 44, $x(a, t[a]));
    }), G(
      e,
      616
      /* BrtEndFmts */
    ));
  }
}
function qx(e) {
  var t = 1;
  G(e, 611, Lt(t)), G(e, 43, Gx({
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
function Zx(e) {
  var t = 2;
  G(e, 603, Lt(t)), G(e, 45, no({ patternType: "none" })), G(e, 45, no({ patternType: "gray125" })), G(
    e,
    604
    /* BrtEndFills */
  );
}
function ep(e) {
  var t = 1;
  G(e, 613, Lt(t)), G(e, 46, Yx()), G(
    e,
    614
    /* BrtEndBorders */
  );
}
function tp(e) {
  var t = 1;
  G(e, 626, Lt(t)), G(e, 47, vc({
    numFmtId: 0
  }, 65535)), G(
    e,
    627
    /* BrtEndCellStyleXFs */
  );
}
function rp(e, t) {
  G(e, 617, Lt(t.length)), t.forEach(function(r) {
    G(e, 47, vc(r, 0));
  }), G(
    e,
    618
    /* BrtEndCellXFs */
  );
}
function np(e) {
  var t = 1;
  G(e, 619, Lt(t)), G(e, 48, Kx({
    xfId: 0,
    name: "Normal"
  })), G(
    e,
    620
    /* BrtEndStyles */
  );
}
function ap(e) {
  var t = 0;
  G(e, 505, Lt(t)), G(
    e,
    506
    /* BrtEndDXFs */
  );
}
function ip(e) {
  var t = 0;
  G(e, 508, Jx(t, "TableStyleMedium9", "PivotStyleMedium4")), G(
    e,
    509
    /* BrtEndTableStyles */
  );
}
function sp(e, t) {
  var r = ht();
  return G(
    r,
    278
    /* BrtBeginStyleSheet */
  ), Qx(r, e.SSF), qx(r), Zx(r), ep(r), tp(r), rp(r, t.cellXfs), np(r), ap(r), ip(r), G(
    r,
    279
    /* BrtEndStyleSheet */
  ), r.end();
}
function gc(e, t) {
  if (t && t.themeXLSX) return t.themeXLSX;
  if (e && typeof e.raw == "string") return e.raw;
  var r = [He];
  return r[r.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', r[r.length] = "<a:themeElements>", r[r.length] = '<a:clrScheme name="Office">', r[r.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', r[r.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', r[r.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', r[r.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', r[r.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', r[r.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', r[r.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', r[r.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', r[r.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', r[r.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', r[r.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', r[r.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', r[r.length] = "</a:clrScheme>", r[r.length] = '<a:fontScheme name="Office">', r[r.length] = "<a:majorFont>", r[r.length] = '<a:latin typeface="Cambria"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:majorFont>", r[r.length] = "<a:minorFont>", r[r.length] = '<a:latin typeface="Calibri"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Arial"/>', r[r.length] = '<a:font script="Hebr" typeface="Arial"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Arial"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:minorFont>", r[r.length] = "</a:fontScheme>", r[r.length] = '<a:fmtScheme name="Office">', r[r.length] = "<a:fillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="1"/>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="0"/>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:fillStyleLst>", r[r.length] = "<a:lnStyleLst>", r[r.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = "</a:lnStyleLst>", r[r.length] = "<a:effectStyleLst>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', r[r.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', r[r.length] = "</a:effectStyle>", r[r.length] = "</a:effectStyleLst>", r[r.length] = "<a:bgFillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:bgFillStyleLst>", r[r.length] = "</a:fmtScheme>", r[r.length] = "</a:themeElements>", r[r.length] = "<a:objectDefaults>", r[r.length] = "<a:spDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', r[r.length] = "</a:spDef>", r[r.length] = "<a:lnDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', r[r.length] = "</a:lnDef>", r[r.length] = "</a:objectDefaults>", r[r.length] = "<a:extraClrSchemeLst/>", r[r.length] = "</a:theme>", r.join("");
}
function op(e, t) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: nt(e)
  };
}
function lp(e) {
  var t = B(12 + 2 * e.name.length);
  return t.write_shift(4, e.flags), t.write_shift(4, e.version), Xe(e.name, t), t.slice(0, t.l);
}
function cp(e) {
  for (var t = [], r = e.read_shift(4); r-- > 0; )
    t.push([e.read_shift(4), e.read_shift(4)]);
  return t;
}
function fp(e) {
  var t = B(4 + 8 * e.length);
  t.write_shift(4, e.length);
  for (var r = 0; r < e.length; ++r)
    t.write_shift(4, e[r][0]), t.write_shift(4, e[r][1]);
  return t;
}
function up(e, t) {
  var r = B(8 + 2 * t.length);
  return r.write_shift(4, e), Xe(t, r), r.slice(0, r.l);
}
function hp(e) {
  return e.l += 4, e.read_shift(4) != 0;
}
function dp(e, t) {
  var r = B(8);
  return r.write_shift(4, e), r.write_shift(4, 1), r;
}
function xp() {
  var e = ht();
  return G(e, 332), G(e, 334, Lt(1)), G(e, 335, lp({
    name: "XLDAPR",
    version: 12e4,
    flags: 3496657072
  })), G(e, 336), G(e, 339, up(1, "XLDAPR")), G(e, 52), G(e, 35, Lt(514)), G(e, 4096, Lt(0)), G(e, 4097, kt(1)), G(e, 36), G(e, 53), G(e, 340), G(e, 337, dp(1)), G(e, 51, fp([[1, 0]])), G(e, 338), G(e, 333), e.end();
}
function wc() {
  var e = [He];
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
function pp(e) {
  var t = {};
  t.i = e.read_shift(4);
  var r = {};
  r.r = e.read_shift(4), r.c = e.read_shift(4), t.r = Fe(r);
  var n = e.read_shift(1);
  return n & 2 && (t.l = "1"), n & 8 && (t.a = "1"), t;
}
var qr = 1024;
function Ec(e, t) {
  for (var r = [21600, 21600], n = ["m0,0l0", r[1], r[0], r[1], r[0], "0xe"].join(","), a = [
    J("xml", null, { "xmlns:v": gt.v, "xmlns:o": gt.o, "xmlns:x": gt.x, "xmlns:mv": gt.mv }).replace(/\/>/, ">"),
    J("o:shapelayout", J("o:idmap", null, { "v:ext": "edit", data: e }), { "v:ext": "edit" }),
    J("v:shapetype", [
      J("v:stroke", null, { joinstyle: "miter" }),
      J("v:path", null, { gradientshapeok: "t", "o:connecttype": "rect" })
    ].join(""), { id: "_x0000_t202", "o:spt": 202, coordsize: r.join(","), path: n })
  ]; qr < e * 1e3; ) qr += 1e3;
  return t.forEach(function(i) {
    var s = je(i[0]), o = (
      /*::(*/
      { color2: "#BEFF82", type: "gradient" }
    );
    o.type == "gradient" && (o.angle = "-180");
    var c = o.type == "gradient" ? J("o:fill", null, { type: "gradientUnscaled", "v:ext": "view" }) : null, l = J("v:fill", c, o), f = { on: "t", obscured: "t" };
    ++qr, a = a.concat([
      "<v:shape" + Xn({
        id: "_x0000_s" + qr,
        type: "#_x0000_t202",
        style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (i[1].hidden ? ";visibility:hidden" : ""),
        fillcolor: "#ECFAD4",
        strokecolor: "#edeaa1"
      }) + ">",
      l,
      J("v:shadow", null, f),
      J("v:path", null, { "o:connecttype": "none" }),
      '<v:textbox><div style="text-align:left"></div></v:textbox>',
      '<x:ClientData ObjectType="Note">',
      "<x:MoveWithCells/>",
      "<x:SizeWithCells/>",
      /* Part 4 19.4.2.3 Anchor (Anchor) */
      qe("x:Anchor", [s.c + 1, 0, s.r + 1, 0, s.c + 3, 20, s.r + 5, 20].join(",")),
      qe("x:AutoFill", "False"),
      qe("x:Row", String(s.r)),
      qe("x:Column", String(s.c)),
      i[1].hidden ? "" : "<x:Visible/>",
      "</x:ClientData>",
      "</v:shape>"
    ]);
  }), a.push("</xml>"), a.join("");
}
function Tc(e) {
  var t = [He, J("comments", null, { xmlns: dn[0] })], r = [];
  return t.push("<authors>"), e.forEach(function(n) {
    n[1].forEach(function(a) {
      var i = Ce(a.a);
      r.indexOf(i) == -1 && (r.push(i), t.push("<author>" + i + "</author>")), a.T && a.ID && r.indexOf("tc=" + a.ID) == -1 && (r.push("tc=" + a.ID), t.push("<author>tc=" + a.ID + "</author>"));
    });
  }), r.length == 0 && (r.push("SheetJ5"), t.push("<author>SheetJ5</author>")), t.push("</authors>"), t.push("<commentList>"), e.forEach(function(n) {
    var a = 0, i = [];
    if (n[1][0] && n[1][0].T && n[1][0].ID ? a = r.indexOf("tc=" + n[1][0].ID) : n[1].forEach(function(c) {
      c.a && (a = r.indexOf(Ce(c.a))), i.push(c.t || "");
    }), t.push('<comment ref="' + n[0] + '" authorId="' + a + '"><text>'), i.length <= 1) t.push(qe("t", Ce(i[0] || "")));
    else {
      for (var s = `Comment:
    ` + i[0] + `
`, o = 1; o < i.length; ++o) s += `Reply:
    ` + i[o] + `
`;
      t.push(qe("t", Ce(s)));
    }
    t.push("</text></comment>");
  }), t.push("</commentList>"), t.length > 2 && (t[t.length] = "</comments>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function mp(e, t, r) {
  var n = [He, J("ThreadedComments", null, { xmlns: ze.TCMNT }).replace(/[\/]>/, ">")];
  return e.forEach(function(a) {
    var i = "";
    (a[1] || []).forEach(function(s, o) {
      if (!s.T) {
        delete s.ID;
        return;
      }
      s.a && t.indexOf(s.a) == -1 && t.push(s.a);
      var c = {
        ref: a[0],
        id: "{54EE7951-7262-4200-6969-" + ("000000000000" + r.tcid++).slice(-12) + "}"
      };
      o == 0 ? i = c.id : c.parentId = i, s.ID = c.id, s.a && (c.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + t.indexOf(s.a)).slice(-12) + "}"), n.push(J("threadedComment", qe("text", s.t || ""), c));
    });
  }), n.push("</ThreadedComments>"), n.join("");
}
function _p(e) {
  var t = [He, J("personList", null, {
    xmlns: ze.TCMNT,
    "xmlns:x": dn[0]
  }).replace(/[\/]>/, ">")];
  return e.forEach(function(r, n) {
    t.push(J("person", null, {
      displayName: r,
      id: "{54EE7950-7262-4200-6969-" + ("000000000000" + n).slice(-12) + "}",
      userId: r,
      providerId: "None"
    }));
  }), t.push("</personList>"), t.join("");
}
function vp(e) {
  var t = {};
  t.iauthor = e.read_shift(4);
  var r = Ur(e);
  return t.rfx = r.s, t.ref = Fe(r.s), e.l += 16, t;
}
function gp(e, t) {
  return t == null && (t = B(36)), t.write_shift(4, e[1].iauthor), pn(e[0], t), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var wp = nt;
function Ep(e) {
  return Xe(e.slice(0, 54));
}
function Tp(e) {
  var t = ht(), r = [];
  return G(
    t,
    628
    /* BrtBeginComments */
  ), G(
    t,
    630
    /* BrtBeginCommentAuthors */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      r.indexOf(a.a) > -1 || (r.push(a.a.slice(0, 54)), G(t, 632, Ep(a.a)));
    });
  }), G(
    t,
    631
    /* BrtEndCommentAuthors */
  ), G(
    t,
    633
    /* BrtBeginCommentList */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      a.iauthor = r.indexOf(a.a);
      var i = { s: je(n[0]), e: je(n[0]) };
      G(t, 635, gp([i, a])), a.t && a.t.length > 0 && G(t, 637, yd(a)), G(
        t,
        636
        /* BrtEndComment */
      ), delete a.iauthor;
    });
  }), G(
    t,
    634
    /* BrtEndCommentList */
  ), G(
    t,
    629
    /* BrtEndComments */
  ), t.end();
}
function Sp(e, t) {
  t.FullPaths.forEach(function(r, n) {
    if (n != 0) {
      var a = r.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      a.slice(-1) !== "/" && ke.utils.cfb_add(e, a, t.FileIndex[n].content);
    }
  });
}
var Sc = ["xlsb", "xlsm", "xlam", "biff8", "xla"], yp = /* @__PURE__ */ (function() {
  var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, t = { r: 0, c: 0 };
  function r(n, a, i, s) {
    var o = !1, c = !1;
    i.length == 0 ? c = !0 : i.charAt(0) == "[" && (c = !0, i = i.slice(1, -1)), s.length == 0 ? o = !0 : s.charAt(0) == "[" && (o = !0, s = s.slice(1, -1));
    var l = i.length > 0 ? parseInt(i, 10) | 0 : 0, f = s.length > 0 ? parseInt(s, 10) | 0 : 0;
    return o ? f += t.c : --f, c ? l += t.r : --l, a + (o ? "" : "$") + rt(f) + (c ? "" : "$") + Ze(l);
  }
  return function(a, i) {
    return t = i, a.replace(e, r);
  };
})(), Ts = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g, Ss = /* @__PURE__ */ (function() {
  return function(t, r) {
    return t.replace(Ts, function(n, a, i, s, o, c) {
      var l = ms(s) - (i ? 0 : r.c), f = ps(c) - (o ? 0 : r.r), d = f == 0 ? "" : o ? f + 1 : "[" + f + "]", u = l == 0 ? "" : i ? l + 1 : "[" + l + "]";
      return a + "R" + d + "C" + u;
    });
  };
})();
function Cp(e, t) {
  return e.replace(Ts, function(r, n, a, i, s, o) {
    return n + (a == "$" ? a + i : rt(ms(i) + t.c)) + (s == "$" ? s + o : Ze(ps(o) + t.r));
  });
}
function Fp(e) {
  return e.length != 1;
}
function We(e) {
  e.l += 1;
}
function xr(e, t) {
  var r = e.read_shift(2);
  return [r & 16383, r >> 14 & 1, r >> 15 & 1];
}
function yc(e, t, r) {
  var n = 2;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5) return Cc(e);
    r.biff == 12 && (n = 4);
  }
  var a = e.read_shift(n), i = e.read_shift(n), s = xr(e), o = xr(e);
  return { s: { r: a, c: s[0], cRel: s[1], rRel: s[2] }, e: { r: i, c: o[0], cRel: o[1], rRel: o[2] } };
}
function Cc(e) {
  var t = xr(e), r = xr(e), n = e.read_shift(1), a = e.read_shift(1);
  return { s: { r: t[0], c: n, cRel: t[1], rRel: t[2] }, e: { r: r[0], c: a, cRel: r[1], rRel: r[2] } };
}
function kp(e, t, r) {
  if (r.biff < 8) return Cc(e);
  var n = e.read_shift(r.biff == 12 ? 4 : 2), a = e.read_shift(r.biff == 12 ? 4 : 2), i = xr(e), s = xr(e);
  return { s: { r: n, c: i[0], cRel: i[1], rRel: i[2] }, e: { r: a, c: s[0], cRel: s[1], rRel: s[2] } };
}
function Fc(e, t, r) {
  if (r && r.biff >= 2 && r.biff <= 5) return Ap(e);
  var n = e.read_shift(r && r.biff == 12 ? 4 : 2), a = xr(e);
  return { r: n, c: a[0], cRel: a[1], rRel: a[2] };
}
function Ap(e) {
  var t = xr(e), r = e.read_shift(1);
  return { r: t[0], c: r, cRel: t[1], rRel: t[2] };
}
function Rp(e) {
  var t = e.read_shift(2), r = e.read_shift(2);
  return { r: t, c: r & 255, fQuoted: !!(r & 16384), cRel: r >> 15, rRel: r >> 15 };
}
function Op(e, t, r) {
  var n = r && r.biff ? r.biff : 8;
  if (n >= 2 && n <= 5) return Ip(e);
  var a = e.read_shift(n >= 12 ? 4 : 2), i = e.read_shift(2), s = (i & 16384) >> 14, o = (i & 32768) >> 15;
  if (i &= 16383, o == 1) for (; a > 524287; ) a -= 1048576;
  if (s == 1) for (; i > 8191; ) i = i - 16384;
  return { r: a, c: i, cRel: s, rRel: o };
}
function Ip(e) {
  var t = e.read_shift(2), r = e.read_shift(1), n = (t & 32768) >> 15, a = (t & 16384) >> 14;
  return t &= 16383, n == 1 && t >= 8192 && (t = t - 16384), a == 1 && r >= 128 && (r = r - 256), { r: t, c: r, cRel: a, rRel: n };
}
function Np(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = yc(e, r.biff >= 2 && r.biff <= 5 ? 6 : 8, r);
  return [n, a];
}
function Dp(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2, "i"), i = 8;
  if (r) switch (r.biff) {
    case 5:
      e.l += 12, i = 6;
      break;
    case 12:
      i = 12;
      break;
  }
  var s = yc(e, i, r);
  return [n, a, s];
}
function Mp(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += r && r.biff > 8 ? 12 : r.biff < 8 ? 6 : 8, [n];
}
function Pp(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2), i = 8;
  if (r) switch (r.biff) {
    case 5:
      e.l += 12, i = 6;
      break;
    case 12:
      i = 12;
      break;
  }
  return e.l += i, [n, a];
}
function Lp(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = kp(e, t - 1, r);
  return [n, a];
}
function bp(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += r.biff == 2 ? 6 : r.biff == 12 ? 14 : 7, [n];
}
function ao(e) {
  var t = e[e.l + 1] & 1, r = 1;
  return e.l += 4, [t, r];
}
function Bp(e, t, r) {
  e.l += 2;
  for (var n = e.read_shift(r && r.biff == 2 ? 1 : 2), a = [], i = 0; i <= n; ++i) a.push(e.read_shift(r && r.biff == 2 ? 1 : 2));
  return a;
}
function Up(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function Wp(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function $p(e) {
  var t = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [t, e.read_shift(2)];
}
function Hp(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += r && r.biff == 2 ? 3 : 4, [n];
}
function kc(e) {
  var t = e.read_shift(1), r = e.read_shift(1);
  return [t, r];
}
function Gp(e) {
  return e.read_shift(2), kc(e);
}
function Vp(e) {
  return e.read_shift(2), kc(e);
}
function zp(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = Fc(e, 0, r);
  return [n, a];
}
function jp(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = Op(e, 0, r);
  return [n, a];
}
function Xp(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(2);
  r && r.biff == 5 && (e.l += 12);
  var i = Fc(e, 0, r);
  return [n, a, i];
}
function Yp(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(r && r.biff <= 3 ? 1 : 2);
  return [Ym[a], Oc[a], n];
}
function Kp(e, t, r) {
  var n = e[e.l++], a = e.read_shift(1), i = r && r.biff <= 3 ? [n == 88 ? -1 : 0, e.read_shift(1)] : Jp(e);
  return [a, (i[0] === 0 ? Oc : Xm)[i[1]]];
}
function Jp(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function Qp(e, t, r) {
  e.l += r && r.biff == 2 ? 3 : 4;
}
function qp(e, t, r) {
  if (e.l++, r && r.biff == 12) return [e.read_shift(4, "i"), 0];
  var n = e.read_shift(2), a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function Zp(e) {
  return e.l++, ta[e.read_shift(1)];
}
function em(e) {
  return e.l++, e.read_shift(2);
}
function tm(e) {
  return e.l++, e.read_shift(1) !== 0;
}
function rm(e) {
  return e.l++, mn(e);
}
function nm(e, t, r) {
  return e.l++, cc(e, t - 1, r);
}
function am(e, t) {
  var r = [e.read_shift(1)];
  if (t == 12) switch (r[0]) {
    case 2:
      r[0] = 4;
      break;
    /* SerBool */
    case 4:
      r[0] = 16;
      break;
    /* SerErr */
    case 0:
      r[0] = 1;
      break;
    /* SerNum */
    case 1:
      r[0] = 2;
      break;
  }
  switch (r[0]) {
    case 4:
      r[1] = Xd(e, 1) ? "TRUE" : "FALSE", t != 12 && (e.l += 7);
      break;
    case 37:
    /* appears to be an alias */
    case 16:
      r[1] = ta[e[e.l]], e.l += t == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      r[1] = mn(e);
      break;
    case 2:
      r[1] = Qd(e, 0, { biff: t > 0 && t < 8 ? 2 : t });
      break;
    default:
      throw new Error("Bad SerAr: " + r[0]);
  }
  return r;
}
function im(e, t, r) {
  for (var n = e.read_shift(r.biff == 12 ? 4 : 2), a = [], i = 0; i != n; ++i) a.push((r.biff == 12 ? Ur : ex)(e));
  return a;
}
function sm(e, t, r) {
  var n = 0, a = 0;
  r.biff == 12 ? (n = e.read_shift(4), a = e.read_shift(4)) : (a = 1 + e.read_shift(1), n = 1 + e.read_shift(2)), r.biff >= 2 && r.biff < 8 && (--n, --a == 0 && (a = 256));
  for (var i = 0, s = []; i != n && (s[i] = []); ++i)
    for (var o = 0; o != a; ++o) s[i][o] = am(e, r.biff);
  return s;
}
function om(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3, a = !r || r.biff >= 8 ? 4 : 2, i = e.read_shift(a);
  switch (r.biff) {
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
function lm(e, t, r) {
  if (r.biff == 5) return cm(e);
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(2), i = e.read_shift(4);
  return [n, a, i];
}
function cm(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2, "i");
  e.l += 8;
  var n = e.read_shift(2);
  return e.l += 12, [t, r, n];
}
function fm(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3;
  e.l += r && r.biff == 2 ? 3 : 4;
  var a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function um(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function hm(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3;
  return e.l += 4, r.biff < 8 && e.l--, r.biff == 12 && (e.l += 2), [n];
}
function dm(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2), i = 4;
  if (r) switch (r.biff) {
    case 5:
      i = 15;
      break;
    case 12:
      i = 6;
      break;
  }
  return e.l += i, [n, a];
}
var xm = Ht, pm = Ht, mm = Ht;
function ra(e, t, r) {
  return e.l += 2, [Rp(e)];
}
function ys(e) {
  return e.l += 6, [];
}
var _m = ra, vm = ys, gm = ys, wm = ra;
function Ac(e) {
  return e.l += 2, [oc(e), e.read_shift(2) & 1];
}
var Em = ra, Tm = Ac, Sm = ys, ym = ra, Cm = ra, Fm = [
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
function km(e) {
  e.l += 2;
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(4), a = e.read_shift(2), i = e.read_shift(2), s = Fm[r >> 2 & 31];
  return { ixti: t, coltype: r & 3, rt: s, idx: n, c: a, C: i };
}
function Am(e) {
  return e.l += 2, [e.read_shift(4)];
}
function Rm(e, t, r) {
  return e.l += 5, e.l += 2, e.l += r.biff == 2 ? 1 : 4, ["PTGSHEET"];
}
function Om(e, t, r) {
  return e.l += r.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function Im(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function Nm(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function Dm(e) {
  return e.l += 4, [0, 0];
}
var io = {
  /*::[*/
  1: { n: "PtgExp", f: qp },
  /*::[*/
  2: { n: "PtgTbl", f: mm },
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
  23: { n: "PtgStr", f: nm },
  /*::[*/
  26: { n: "PtgSheet", f: Rm },
  /*::[*/
  27: { n: "PtgEndSheet", f: Om },
  /*::[*/
  28: { n: "PtgErr", f: Zp },
  /*::[*/
  29: { n: "PtgBool", f: tm },
  /*::[*/
  30: { n: "PtgInt", f: em },
  /*::[*/
  31: { n: "PtgNum", f: rm },
  /*::[*/
  32: { n: "PtgArray", f: bp },
  /*::[*/
  33: { n: "PtgFunc", f: Yp },
  /*::[*/
  34: { n: "PtgFuncVar", f: Kp },
  /*::[*/
  35: { n: "PtgName", f: om },
  /*::[*/
  36: { n: "PtgRef", f: zp },
  /*::[*/
  37: { n: "PtgArea", f: Np },
  /*::[*/
  38: { n: "PtgMemArea", f: fm },
  /*::[*/
  39: { n: "PtgMemErr", f: xm },
  /*::[*/
  40: { n: "PtgMemNoMem", f: pm },
  /*::[*/
  41: { n: "PtgMemFunc", f: um },
  /*::[*/
  42: { n: "PtgRefErr", f: hm },
  /*::[*/
  43: { n: "PtgAreaErr", f: Mp },
  /*::[*/
  44: { n: "PtgRefN", f: jp },
  /*::[*/
  45: { n: "PtgAreaN", f: Lp },
  /*::[*/
  46: { n: "PtgMemAreaN", f: Im },
  /*::[*/
  47: { n: "PtgMemNoMemN", f: Nm },
  /*::[*/
  57: { n: "PtgNameX", f: lm },
  /*::[*/
  58: { n: "PtgRef3d", f: Xp },
  /*::[*/
  59: { n: "PtgArea3d", f: Dp },
  /*::[*/
  60: { n: "PtgRefErr3d", f: dm },
  /*::[*/
  61: { n: "PtgAreaErr3d", f: Pp },
  /*::[*/
  255: {}
}, Mm = {
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
}, Pm = {
  /*::[*/
  1: { n: "PtgElfLel", f: Ac },
  /*::[*/
  2: { n: "PtgElfRw", f: ym },
  /*::[*/
  3: { n: "PtgElfCol", f: _m },
  /*::[*/
  6: { n: "PtgElfRwV", f: Cm },
  /*::[*/
  7: { n: "PtgElfColV", f: wm },
  /*::[*/
  10: { n: "PtgElfRadical", f: Em },
  /*::[*/
  11: { n: "PtgElfRadicalS", f: Sm },
  /*::[*/
  13: { n: "PtgElfColS", f: vm },
  /*::[*/
  15: { n: "PtgElfColSV", f: gm },
  /*::[*/
  16: { n: "PtgElfRadicalLel", f: Tm },
  /*::[*/
  25: { n: "PtgList", f: km },
  /*::[*/
  29: { n: "PtgSxName", f: Am },
  /*::[*/
  255: {}
}, Lm = {
  /*::[*/
  0: { n: "PtgAttrNoop", f: Dm },
  /*::[*/
  1: { n: "PtgAttrSemi", f: Hp },
  /*::[*/
  2: { n: "PtgAttrIf", f: Wp },
  /*::[*/
  4: { n: "PtgAttrChoose", f: Bp },
  /*::[*/
  8: { n: "PtgAttrGoto", f: Up },
  /*::[*/
  16: { n: "PtgAttrSum", f: Qp },
  /*::[*/
  32: { n: "PtgAttrBaxcel", f: ao },
  /*::[*/
  33: { n: "PtgAttrBaxcel", f: ao },
  /*::[*/
  64: { n: "PtgAttrSpace", f: Gp },
  /*::[*/
  65: { n: "PtgAttrSpaceSemi", f: Vp },
  /*::[*/
  128: { n: "PtgAttrIfError", f: $p },
  /*::[*/
  255: {}
};
function bm(e, t, r, n) {
  if (n.biff < 8) return Ht(e, t);
  for (var a = e.l + t, i = [], s = 0; s !== r.length; ++s)
    switch (r[s][0]) {
      case "PtgArray":
        r[s][1] = sm(e, 0, n), i.push(r[s][1]);
        break;
      case "PtgMemArea":
        r[s][2] = im(e, r[s][1], n), i.push(r[s][2]);
        break;
      case "PtgExp":
        n && n.biff == 12 && (r[s][1][1] = e.read_shift(4), i.push(r[s][1]));
        break;
      case "PtgList":
      /* TODO: PtgList -> PtgExtraList */
      case "PtgElfRadicalS":
      /* TODO: PtgElfRadicalS -> PtgExtraElf */
      case "PtgElfColS":
      /* TODO: PtgElfColS -> PtgExtraElf */
      case "PtgElfColSV":
        throw "Unsupported " + r[s][0];
    }
  return t = a - e.l, t !== 0 && i.push(Ht(e, t)), i;
}
function Bm(e, t, r) {
  for (var n = e.l + t, a, i, s = []; n != e.l; )
    t = n - e.l, i = e[e.l], a = io[i] || io[Mm[i]], (i === 24 || i === 25) && (a = (i === 24 ? Pm : Lm)[e[e.l + 1]]), !a || !a.f ? Ht(e, t) : s.push([a.n, a.f(e, t, r)]);
  return s;
}
function Um(e) {
  for (var t = [], r = 0; r < e.length; ++r) {
    for (var n = e[r], a = [], i = 0; i < n.length; ++i) {
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
    t.push(a.join(","));
  }
  return t.join(";");
}
var Wm = {
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
function $m(e, t) {
  if (!e && !(t && t.biff <= 5 && t.biff >= 2)) throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e + "'" : e;
}
function Rc(e, t, r) {
  if (!e) return "SH33TJSERR0";
  if (r.biff > 8 && (!e.XTI || !e.XTI[t])) return e.SheetNames[t];
  if (!e.XTI) return "SH33TJSERR6";
  var n = e.XTI[t];
  if (r.biff < 8)
    return t > 1e4 && (t -= 65536), t < 0 && (t = -t), t == 0 ? "" : e.XTI[t - 1];
  if (!n) return "SH33TJSERR1";
  var a = "";
  if (r.biff > 8) switch (e[n[0]][0]) {
    case 357:
      return a = n[1] == -1 ? "#REF" : e.SheetNames[n[1]], n[1] == n[2] ? a : a + ":" + e.SheetNames[n[2]];
    case 358:
      return r.SID != null ? e.SheetNames[r.SID] : "SH33TJSSAME" + e[n[0]][0];
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
function so(e, t, r) {
  var n = Rc(e, t, r);
  return n == "#REF" ? n : $m(n, r);
}
function hn(e, t, r, n, a) {
  var i = a && a.biff || 8, s = (
    /*range != null ? range :*/
    { s: { c: 0, r: 0 } }
  ), o = [], c, l, f, d = 0, u = 0, h, m = "";
  if (!e[0] || !e[0][0]) return "";
  for (var x = -1, _ = "", F = 0, A = e[0].length; F < A; ++F) {
    var y = e[0][F];
    switch (y[0]) {
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
        if (c = o.pop(), l = o.pop(), x >= 0) {
          switch (e[0][x][1][0]) {
            case 0:
              _ = Le(" ", e[0][x][1][1]);
              break;
            case 1:
              _ = Le("\r", e[0][x][1][1]);
              break;
            default:
              if (_ = "", a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][x][1][0]);
          }
          l = l + _, x = -1;
        }
        o.push(l + Wm[y[0]] + c);
        break;
      case "PtgIsect":
        c = o.pop(), l = o.pop(), o.push(l + " " + c);
        break;
      case "PtgUnion":
        c = o.pop(), l = o.pop(), o.push(l + "," + c);
        break;
      case "PtgRange":
        c = o.pop(), l = o.pop(), o.push(l + ":" + c);
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
        f = Wn(y[1][1], s, a), o.push($n(f, i));
        break;
      case "PtgRefN":
        f = r ? Wn(y[1][1], r, a) : y[1][1], o.push($n(f, i));
        break;
      case "PtgRef3d":
        d = /*::Number(*/
        y[1][1], f = Wn(y[1][2], s, a), m = so(n, d, a), o.push(m + "!" + $n(f, i));
        break;
      case "PtgFunc":
      /* [MS-XLS] 2.5.198.62 */
      case "PtgFuncVar":
        var O = y[1][0], j = y[1][1];
        O || (O = 0), O &= 127;
        var Z = O == 0 ? [] : o.slice(-O);
        o.length -= O, j === "User" && (j = Z.shift()), o.push(j + "(" + Z.join(",") + ")");
        break;
      case "PtgBool":
        o.push(y[1] ? "TRUE" : "FALSE");
        break;
      case "PtgInt":
        o.push(
          /*::String(*/
          y[1]
          /*::)*/
        );
        break;
      case "PtgNum":
        o.push(String(y[1]));
        break;
      case "PtgStr":
        o.push('"' + y[1].replace(/"/g, '""') + '"');
        break;
      case "PtgErr":
        o.push(
          /*::String(*/
          y[1]
          /*::)*/
        );
        break;
      case "PtgAreaN":
        h = V0(y[1][1], r ? { s: r } : s, a), o.push(pi(h, a));
        break;
      case "PtgArea":
        h = V0(y[1][1], s, a), o.push(pi(h, a));
        break;
      case "PtgArea3d":
        d = /*::Number(*/
        y[1][1], h = y[1][2], m = so(n, d, a), o.push(m + "!" + pi(h, a));
        break;
      case "PtgAttrSum":
        o.push("SUM(" + o.pop() + ")");
        break;
      case "PtgAttrBaxcel":
      /* [MS-XLS] 2.5.198.33 */
      case "PtgAttrSemi":
        break;
      case "PtgName":
        u = y[1][2];
        var R = (n.names || [])[u - 1] || (n[0] || [])[u], W = R ? R.Name : "SH33TJSNAME" + String(u);
        W && W.slice(0, 6) == "_xlfn." && !a.xlfn && (W = W.slice(6)), o.push(W);
        break;
      case "PtgNameX":
        var P = y[1][1];
        u = y[1][2];
        var H;
        if (a.biff <= 5)
          P < 0 && (P = -P), n[P] && (H = n[P][u]);
        else {
          var D = "";
          if (((n[P] || [])[0] || [])[0] == 14849 || (((n[P] || [])[0] || [])[0] == 1025 ? n[P][u] && n[P][u].itab > 0 && (D = n.SheetNames[n[P][u].itab - 1] + "!") : D = n.SheetNames[u - 1] + "!"), n[P] && n[P][u]) D += n[P][u].Name;
          else if (n[0] && n[0][u]) D += n[0][u].Name;
          else {
            var V = (Rc(n, P, a) || "").split(";;");
            V[u - 1] ? D = V[u - 1] : D += "SH33TJSERRX";
          }
          o.push(D);
          break;
        }
        H || (H = { Name: "SH33TJSERRY" }), o.push(H.Name);
        break;
      case "PtgParen":
        var q = "(", _e = ")";
        if (x >= 0) {
          switch (_ = "", e[0][x][1][0]) {
            // $FlowIgnore
            case 2:
              q = Le(" ", e[0][x][1][1]) + q;
              break;
            // $FlowIgnore
            case 3:
              q = Le("\r", e[0][x][1][1]) + q;
              break;
            // $FlowIgnore
            case 4:
              _e = Le(" ", e[0][x][1][1]) + _e;
              break;
            // $FlowIgnore
            case 5:
              _e = Le("\r", e[0][x][1][1]) + _e;
              break;
            default:
              if (a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][x][1][0]);
          }
          x = -1;
        }
        o.push(q + o.pop() + _e);
        break;
      case "PtgRefErr":
        o.push("#REF!");
        break;
      case "PtgRefErr3d":
        o.push("#REF!");
        break;
      case "PtgExp":
        f = { c: y[1][1], r: y[1][0] };
        var fe = { c: r.c, r: r.r };
        if (n.sharedf[Fe(f)]) {
          var Ye = n.sharedf[Fe(f)];
          o.push(hn(Ye, s, fe, n, a));
        } else {
          var Be = !1;
          for (c = 0; c != n.arrayf.length; ++c)
            if (l = n.arrayf[c], !(f.c < l[0].s.c || f.c > l[0].e.c) && !(f.r < l[0].s.r || f.r > l[0].e.r)) {
              o.push(hn(l[1], s, fe, n, a)), Be = !0;
              break;
            }
          Be || o.push(
            /*::String(*/
            y[1]
            /*::)*/
          );
        }
        break;
      case "PtgArray":
        o.push("{" + Um(
          /*::(*/
          y[1]
          /*:: :any)*/
        ) + "}");
        break;
      case "PtgMemArea":
        break;
      case "PtgAttrSpace":
      /* [MS-XLS] 2.5.198.38 */
      case "PtgAttrSpaceSemi":
        x = F;
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
        o.push("Table" + y[1].idx + "[#" + y[1].rt + "]");
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
        throw new Error("Unrecognized Formula Token: " + String(y));
      default:
        throw new Error("Unrecognized Formula Token: " + String(y));
    }
    var Ot = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (a.biff != 3 && x >= 0 && Ot.indexOf(e[0][F][0]) == -1) {
      y = e[0][x];
      var Ve = !0;
      switch (y[1][0]) {
        /* note: some bad XLSB files omit the PtgParen */
        case 4:
          Ve = !1;
        /* falls through */
        case 0:
          _ = Le(" ", y[1][1]);
          break;
        case 5:
          Ve = !1;
        /* falls through */
        case 1:
          _ = Le("\r", y[1][1]);
          break;
        default:
          if (_ = "", a.WTF) throw new Error("Unexpected PtgAttrSpaceType " + y[1][0]);
      }
      o.push((Ve ? _ : "") + o.pop() + (Ve ? "" : _)), x = -1;
    }
  }
  if (o.length > 1 && a.WTF) throw new Error("bad formula stack");
  return o[0];
}
function Hm(e) {
  if (e == null) {
    var t = B(8);
    return t.write_shift(1, 3), t.write_shift(1, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 65535), t;
  } else if (typeof e == "number") return Dr(e);
  return Dr(0);
}
function Gm(e, t, r, n, a) {
  var i = Mr(t, r, a), s = Hm(e.v), o = B(6), c = 33;
  o.write_shift(2, c), o.write_shift(4, 0);
  for (var l = B(e.bf.length), f = 0; f < e.bf.length; ++f) l[f] = e.bf[f];
  var d = Qe([i, s, o, l]);
  return d;
}
function Ka(e, t, r) {
  var n = e.read_shift(4), a = Bm(e, n, r), i = e.read_shift(4), s = i > 0 ? bm(e, i, a, r) : null;
  return [a, s];
}
var Vm = Ka, Ja = Ka, zm = Ka, jm = Ka, Xm = {
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
}, Oc = {
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
}, Ym = {
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
function Km(e) {
  var t = "of:=" + e.replace(Ts, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
  return t.replace(/;/g, "|").replace(/,/g, ";");
}
function Jm(e) {
  return e.replace(/\./, "!");
}
var Hn = typeof Map < "u";
function Cs(e, t, r) {
  var n = 0, a = e.length;
  if (r) {
    if (Hn ? r.has(t) : Object.prototype.hasOwnProperty.call(r, t)) {
      for (var i = Hn ? r.get(t) : r[t]; n < i.length; ++n)
        if (e[i[n]].t === t)
          return e.Count++, i[n];
    }
  } else for (; n < a; ++n)
    if (e[n].t === t)
      return e.Count++, n;
  return e[a] = { t }, e.Count++, e.Unique++, r && (Hn ? (r.has(t) || r.set(t, []), r.get(t).push(a)) : (Object.prototype.hasOwnProperty.call(r, t) || (r[t] = []), r[t].push(a))), a;
}
function Qa(e, t) {
  var r = { min: e + 1, max: e + 1 }, n = -1;
  return t.MDW && (Kt = t.MDW), t.width != null ? r.customWidth = 1 : t.wpx != null ? n = Ba(t.wpx) : t.wch != null && (n = t.wch), n > -1 ? (r.width = Yi(n), r.customWidth = 1) : t.width != null && (r.width = t.width), t.hidden && (r.hidden = !0), t.level != null && (r.outlineLevel = r.level = t.level), r;
}
function Ic(e, t) {
  if (e) {
    var r = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    e.left == null && (e.left = r[0]), e.right == null && (e.right = r[1]), e.top == null && (e.top = r[2]), e.bottom == null && (e.bottom = r[3]), e.header == null && (e.header = r[4]), e.footer == null && (e.footer = r[5]);
  }
}
function mr(e, t, r) {
  var n = r.revssf[t.z != null ? t.z : "General"], a = 60, i = e.length;
  if (n == null && r.ssf) {
    for (; a < 392; ++a) if (r.ssf[a] == null) {
      Fl(t.z, a), r.ssf[a] = t.z, r.revssf[t.z] = n = a;
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
function Qm(e, t, r) {
  if (e && e["!ref"]) {
    var n = Ne(e["!ref"]);
    if (n.e.c < n.s.c || n.e.r < n.s.r) throw new Error("Bad range (" + r + "): " + e["!ref"]);
  }
}
function qm(e) {
  if (e.length === 0) return "";
  for (var t = '<mergeCells count="' + e.length + '">', r = 0; r != e.length; ++r) t += '<mergeCell ref="' + $e(e[r]) + '"/>';
  return t + "</mergeCells>";
}
function Zm(e, t, r, n, a) {
  var i = !1, s = {}, o = null;
  if (n.bookType !== "xlsx" && t.vbaraw) {
    var c = t.SheetNames[r];
    try {
      t.Workbook && (c = t.Workbook.Sheets[r].CodeName || c);
    } catch {
    }
    i = !0, s.codeName = jn(Ce(c));
  }
  if (e && e["!outline"]) {
    var l = { summaryBelow: 1, summaryRight: 1 };
    e["!outline"].above && (l.summaryBelow = 0), e["!outline"].left && (l.summaryRight = 0), o = (o || "") + J("outlinePr", null, l);
  }
  !i && !o || (a[a.length] = J("sheetPr", o, s));
}
var e_ = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"], t_ = [
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
function r_(e) {
  var t = { sheet: 1 };
  return e_.forEach(function(r) {
    e[r] != null && e[r] && (t[r] = "1");
  }), t_.forEach(function(r) {
    e[r] != null && !e[r] && (t[r] = "0");
  }), e.password && (t.password = xc(e.password).toString(16).toUpperCase()), J("sheetProtection", null, t);
}
function n_(e) {
  return Ic(e), J("pageMargins", null, e);
}
function a_(e, t) {
  for (var r = ["<cols>"], n, a = 0; a != t.length; ++a)
    (n = t[a]) && (r[r.length] = J("col", null, Qa(a, n)));
  return r[r.length] = "</cols>", r.join("");
}
function i_(e, t, r, n) {
  var a = typeof e.ref == "string" ? e.ref : $e(e.ref);
  r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
  var i = r.Workbook.Names, s = Et(a);
  s.s.r == s.e.r && (s.e.r = Et(t["!ref"]).e.r, a = $e(s));
  for (var o = 0; o < i.length; ++o) {
    var c = i[o];
    if (c.Name == "_xlnm._FilterDatabase" && c.Sheet == n) {
      c.Ref = "'" + r.SheetNames[n] + "'!" + a;
      break;
    }
  }
  return o == i.length && i.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + a }), J("autoFilter", null, { ref: a });
}
function s_(e, t, r, n) {
  var a = { workbookViewId: "0" };
  return (((n || {}).Workbook || {}).Views || [])[0] && (a.rightToLeft = n.Workbook.Views[0].RTL ? "1" : "0"), J("sheetViews", J("sheetView", null, a), {});
}
function o_(e, t, r, n) {
  if (e.c && r["!comments"].push([t, e.c]), e.v === void 0 && typeof e.f != "string" || e.t === "z" && !e.f) return "";
  var a = "", i = e.t, s = e.v;
  if (e.t !== "z") switch (e.t) {
    case "b":
      a = e.v ? "1" : "0";
      break;
    case "n":
      a = "" + e.v;
      break;
    case "e":
      a = ta[e.v];
      break;
    case "d":
      n && n.cellDates ? a = ft(e.v, -1).toISOString() : (e = xt(e), e.t = "n", a = "" + (e.v = dt(ft(e.v)))), typeof e.z > "u" && (e.z = be[14]);
      break;
    default:
      a = e.v;
      break;
  }
  var o = qe("v", Ce(a)), c = { r: t }, l = mr(n.cellXfs, e, n);
  switch (l !== 0 && (c.s = l), e.t) {
    case "n":
      break;
    case "d":
      c.t = "d";
      break;
    case "b":
      c.t = "b";
      break;
    case "e":
      c.t = "e";
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
        o = qe("v", "" + Cs(n.Strings, e.v, n.revStrings)), c.t = "s";
        break;
      }
      c.t = "str";
      break;
  }
  if (e.t != i && (e.t = i, e.v = s), typeof e.f == "string" && e.f) {
    var f = e.F && e.F.slice(0, t.length) == t ? { t: "array", ref: e.F } : null;
    o = J("f", Ce(e.f), f) + (e.v != null ? o : "");
  }
  return e.l && r["!links"].push([t, e.l]), e.D && (c.cm = 1), J("c", o, c);
}
function l_(e, t, r, n) {
  var a = [], i = [], s = Ne(e["!ref"]), o = "", c, l = "", f = [], d = 0, u = 0, h = e["!rows"], m = Array.isArray(e), x = { r: l }, _, F = -1;
  for (u = s.s.c; u <= s.e.c; ++u) f[u] = rt(u);
  for (d = s.s.r; d <= s.e.r; ++d) {
    for (i = [], l = Ze(d), u = s.s.c; u <= s.e.c; ++u) {
      c = f[u] + l;
      var A = m ? (e[d] || [])[u] : e[c];
      A !== void 0 && (o = o_(A, c, e, t)) != null && i.push(o);
    }
    (i.length > 0 || h && h[d]) && (x = { r: l }, h && h[d] && (_ = h[d], _.hidden && (x.hidden = 1), F = -1, _.hpx ? F = Ua(_.hpx) : _.hpt && (F = _.hpt), F > -1 && (x.ht = F, x.customHeight = 1), _.level && (x.outlineLevel = _.level)), a[a.length] = J("row", i.join(""), x));
  }
  if (h) for (; d < h.length; ++d)
    h && h[d] && (x = { r: d + 1 }, _ = h[d], _.hidden && (x.hidden = 1), F = -1, _.hpx ? F = Ua(_.hpx) : _.hpt && (F = _.hpt), F > -1 && (x.ht = F, x.customHeight = 1), _.level && (x.outlineLevel = _.level), a[a.length] = J("row", "", x));
  return a.join("");
}
function Nc(e, t, r, n) {
  var a = [He, J("worksheet", null, {
    xmlns: dn[0],
    "xmlns:r": ze.r
  })], i = r.SheetNames[e], s = 0, o = "", c = r.Sheets[i];
  c == null && (c = {});
  var l = c["!ref"] || "A1", f = Ne(l);
  if (f.e.c > 16383 || f.e.r > 1048575) {
    if (t.WTF) throw new Error("Range " + l + " exceeds format limit A1:XFD1048576");
    f.e.c = Math.min(f.e.c, 16383), f.e.r = Math.min(f.e.c, 1048575), l = $e(f);
  }
  n || (n = {}), c["!comments"] = [];
  var d = [];
  Zm(c, r, e, t, a), a[a.length] = J("dimension", null, { ref: l }), a[a.length] = s_(c, t, e, r), t.sheetFormat && (a[a.length] = J("sheetFormatPr", null, {
    defaultRowHeight: t.sheetFormat.defaultRowHeight || "16",
    baseColWidth: t.sheetFormat.baseColWidth || "10",
    outlineLevelRow: t.sheetFormat.outlineLevelRow || "7"
  })), c["!cols"] != null && c["!cols"].length > 0 && (a[a.length] = a_(c, c["!cols"])), a[s = a.length] = "<sheetData/>", c["!links"] = [], c["!ref"] != null && (o = l_(c, t), o.length > 0 && (a[a.length] = o)), a.length > s + 1 && (a[a.length] = "</sheetData>", a[s] = a[s].replace("/>", ">")), c["!protect"] && (a[a.length] = r_(c["!protect"])), c["!autofilter"] != null && (a[a.length] = i_(c["!autofilter"], c, r, e)), c["!merges"] != null && c["!merges"].length > 0 && (a[a.length] = qm(c["!merges"]));
  var u = -1, h, m = -1;
  return (
    /*::(*/
    c["!links"].length > 0 && (a[a.length] = "<hyperlinks>", c["!links"].forEach(function(x) {
      x[1].Target && (h = { ref: x[0] }, x[1].Target.charAt(0) != "#" && (m = ye(n, -1, Ce(x[1].Target).replace(/#.*$/, ""), ge.HLINK), h["r:id"] = "rId" + m), (u = x[1].Target.indexOf("#")) > -1 && (h.location = Ce(x[1].Target.slice(u + 1))), x[1].Tooltip && (h.tooltip = Ce(x[1].Tooltip)), a[a.length] = J("hyperlink", null, h));
    }), a[a.length] = "</hyperlinks>"), delete c["!links"], c["!margins"] != null && (a[a.length] = n_(c["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && (a[a.length] = qe("ignoredErrors", J("ignoredError", null, { numberStoredAsText: 1, sqref: l }))), d.length > 0 && (m = ye(n, -1, "../drawings/drawing" + (e + 1) + ".xml", ge.DRAW), a[a.length] = J("drawing", null, { "r:id": "rId" + m }), c["!drawing"] = d), c["!comments"].length > 0 && (m = ye(n, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", ge.VML), a[a.length] = J("legacyDrawing", null, { "r:id": "rId" + m }), c["!legacy"] = m), a.length > 1 && (a[a.length] = "</worksheet>", a[1] = a[1].replace("/>", ">")), a.join("")
  );
}
function c_(e, t) {
  var r = {}, n = e.l + t;
  r.r = e.read_shift(4), e.l += 4;
  var a = e.read_shift(2);
  e.l += 1;
  var i = e.read_shift(1);
  return e.l = n, i & 7 && (r.level = i & 7), i & 16 && (r.hidden = !0), i & 32 && (r.hpt = a / 20), r;
}
function f_(e, t, r) {
  var n = B(145), a = (r["!rows"] || [])[e] || {};
  n.write_shift(4, e), n.write_shift(4, 0);
  var i = 320;
  a.hpx ? i = Ua(a.hpx) * 20 : a.hpt && (i = a.hpt * 20), n.write_shift(2, i), n.write_shift(1, 0);
  var s = 0;
  a.level && (s |= a.level), a.hidden && (s |= 16), (a.hpx || a.hpt) && (s |= 32), n.write_shift(1, s), n.write_shift(1, 0);
  var o = 0, c = n.l;
  n.l += 4;
  for (var l = { r: e, c: 0 }, f = 0; f < 16; ++f)
    if (!(t.s.c > f + 1 << 10 || t.e.c < f << 10)) {
      for (var d = -1, u = -1, h = f << 10; h < f + 1 << 10; ++h) {
        l.c = h;
        var m = Array.isArray(r) ? (r[l.r] || [])[l.c] : r[Fe(l)];
        m && (d < 0 && (d = h), u = h);
      }
      d < 0 || (++o, n.write_shift(4, d), n.write_shift(4, u));
    }
  var x = n.l;
  return n.l = c, n.write_shift(4, o), n.l = x, n.length > n.l ? n.slice(0, n.l) : n;
}
function u_(e, t, r, n) {
  var a = f_(n, r, t);
  (a.length > 17 || (t["!rows"] || [])[n]) && G(e, 0, a);
}
var h_ = Ur, d_ = pn;
function x_() {
}
function p_(e, t) {
  var r = {}, n = e[e.l];
  return ++e.l, r.above = !(n & 64), r.left = !(n & 128), e.l += 18, r.name = Cd(e), r;
}
function m_(e, t, r) {
  r == null && (r = B(84 + 4 * e.length));
  var n = 192;
  t && (t.above && (n &= -65), t.left && (n &= -129)), r.write_shift(1, n);
  for (var a = 1; a < 3; ++a) r.write_shift(1, 0);
  return Pa({ auto: 1 }, r), r.write_shift(-4, -1), r.write_shift(-4, -1), Xl(e, r), r.slice(0, r.l);
}
function __(e) {
  var t = Rt(e);
  return [t];
}
function v_(e, t, r) {
  return r == null && (r = B(8)), Lr(t, r);
}
function g_(e) {
  var t = br(e);
  return [t];
}
function w_(e, t, r) {
  return r == null && (r = B(4)), Br(t, r);
}
function E_(e) {
  var t = Rt(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function T_(e, t, r) {
  return r == null && (r = B(9)), Lr(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function S_(e) {
  var t = br(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function y_(e, t, r) {
  return r == null && (r = B(5)), Br(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function C_(e) {
  var t = Rt(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function F_(e, t, r) {
  return r == null && (r = B(9)), Lr(t, r), r.write_shift(1, e.v), r;
}
function k_(e) {
  var t = br(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function A_(e, t, r) {
  return r == null && (r = B(8)), Br(t, r), r.write_shift(1, e.v), r.write_shift(2, 0), r.write_shift(1, 0), r;
}
function R_(e) {
  var t = Rt(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function O_(e, t, r) {
  return r == null && (r = B(12)), Lr(t, r), r.write_shift(4, t.v), r;
}
function I_(e) {
  var t = br(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function N_(e, t, r) {
  return r == null && (r = B(8)), Br(t, r), r.write_shift(4, t.v), r;
}
function D_(e) {
  var t = Rt(e), r = mn(e);
  return [t, r, "n"];
}
function M_(e, t, r) {
  return r == null && (r = B(16)), Lr(t, r), Dr(e.v, r), r;
}
function P_(e) {
  var t = br(e), r = mn(e);
  return [t, r, "n"];
}
function L_(e, t, r) {
  return r == null && (r = B(12)), Br(t, r), Dr(e.v, r), r;
}
function b_(e) {
  var t = Rt(e), r = Yl(e);
  return [t, r, "n"];
}
function B_(e, t, r) {
  return r == null && (r = B(12)), Lr(t, r), Kl(e.v, r), r;
}
function U_(e) {
  var t = br(e), r = Yl(e);
  return [t, r, "n"];
}
function W_(e, t, r) {
  return r == null && (r = B(8)), Br(t, r), Kl(e.v, r), r;
}
function $_(e) {
  var t = Rt(e), r = _s(e);
  return [t, r, "is"];
}
function H_(e) {
  var t = Rt(e), r = nt(e);
  return [t, r, "str"];
}
function G_(e, t, r) {
  return r == null && (r = B(12 + 4 * e.v.length)), Lr(t, r), Xe(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function V_(e) {
  var t = br(e), r = nt(e);
  return [t, r, "str"];
}
function z_(e, t, r) {
  return r == null && (r = B(8 + 4 * e.v.length)), Br(t, r), Xe(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function j_(e, t, r) {
  var n = e.l + t, a = Rt(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "b"];
  if (r.cellFormula) {
    e.l += 2;
    var o = Ja(e, n - e.l, r);
    s[3] = hn(o, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
function X_(e, t, r) {
  var n = e.l + t, a = Rt(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "e"];
  if (r.cellFormula) {
    e.l += 2;
    var o = Ja(e, n - e.l, r);
    s[3] = hn(o, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
function Y_(e, t, r) {
  var n = e.l + t, a = Rt(e);
  a.r = r["!row"];
  var i = mn(e), s = [a, i, "n"];
  if (r.cellFormula) {
    e.l += 2;
    var o = Ja(e, n - e.l, r);
    s[3] = hn(o, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
function K_(e, t, r) {
  var n = e.l + t, a = Rt(e);
  a.r = r["!row"];
  var i = nt(e), s = [a, i, "str"];
  if (r.cellFormula) {
    e.l += 2;
    var o = Ja(e, n - e.l, r);
    s[3] = hn(o, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
var J_ = Ur, Q_ = pn;
function q_(e, t) {
  return t == null && (t = B(4)), t.write_shift(4, e), t;
}
function Z_(e, t) {
  var r = e.l + t, n = Ur(e), a = vs(e), i = nt(e), s = nt(e), o = nt(e);
  e.l = r;
  var c = { rfx: n, relId: a, loc: i, display: o };
  return s && (c.Tooltip = s), c;
}
function ev(e, t) {
  var r = B(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
  pn({ s: je(e[0]), e: je(e[0]) }, r), gs("rId" + t, r);
  var n = e[1].Target.indexOf("#"), a = n == -1 ? "" : e[1].Target.slice(n + 1);
  return Xe(a || "", r), Xe(e[1].Tooltip || "", r), Xe("", r), r.slice(0, r.l);
}
function tv() {
}
function rv(e, t, r) {
  var n = e.l + t, a = Jl(e), i = e.read_shift(1), s = [a];
  if (s[2] = i, r.cellFormula) {
    var o = Vm(e, n - e.l, r);
    s[1] = o;
  } else e.l = n;
  return s;
}
function nv(e, t, r) {
  var n = e.l + t, a = Ur(e), i = [a];
  if (r.cellFormula) {
    var s = jm(e, n - e.l, r);
    i[1] = s, e.l = n;
  } else e.l = n;
  return i;
}
function av(e, t, r) {
  r == null && (r = B(18));
  var n = Qa(e, t);
  r.write_shift(-4, e), r.write_shift(-4, e), r.write_shift(4, (n.width || 10) * 256), r.write_shift(
    4,
    0
    /*ixfe*/
  );
  var a = 0;
  return t.hidden && (a |= 1), typeof n.width == "number" && (a |= 2), t.level && (a |= t.level << 8), r.write_shift(2, a), r;
}
var Dc = ["left", "right", "top", "bottom", "header", "footer"];
function iv(e) {
  var t = {};
  return Dc.forEach(function(r) {
    t[r] = mn(e);
  }), t;
}
function sv(e, t) {
  return t == null && (t = B(48)), Ic(e), Dc.forEach(function(r) {
    Dr(e[r], t);
  }), t;
}
function ov(e) {
  var t = e.read_shift(2);
  return e.l += 28, { RTL: t & 32 };
}
function lv(e, t, r) {
  r == null && (r = B(30));
  var n = 924;
  return (((t || {}).Views || [])[0] || {}).RTL && (n |= 32), r.write_shift(2, n), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(2, 0), r.write_shift(2, 100), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(4, 0), r;
}
function cv(e) {
  var t = B(24);
  return t.write_shift(4, 4), t.write_shift(4, 1), pn(e, t), t;
}
function fv(e, t) {
  return t == null && (t = B(66)), t.write_shift(2, e.password ? xc(e.password) : 0), t.write_shift(4, 1), [
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
  ].forEach(function(r) {
    r[1] ? t.write_shift(4, e[r[0]] != null && !e[r[0]] ? 1 : 0) : t.write_shift(4, e[r[0]] != null && e[r[0]] ? 0 : 1);
  }), t;
}
function uv() {
}
function hv() {
}
function dv(e, t, r, n, a, i, s) {
  if (t.v === void 0) return !1;
  var o = "";
  switch (t.t) {
    case "b":
      o = t.v ? "1" : "0";
      break;
    case "d":
      t = xt(t), t.z = t.z || be[14], t.v = dt(ft(t.v)), t.t = "n";
      break;
    /* falls through */
    case "n":
    case "e":
      o = "" + t.v;
      break;
    default:
      o = t.v;
      break;
  }
  var c = { r, c: n };
  switch (c.s = mr(a.cellXfs, t, a), t.l && i["!links"].push([Fe(c), t.l]), t.c && i["!comments"].push([Fe(c), t.c]), t.t) {
    case "s":
    case "str":
      return a.bookSST ? (o = Cs(a.Strings, t.v, a.revStrings), c.t = "s", c.v = o, s ? G(e, 18, N_(t, c)) : G(e, 7, O_(t, c))) : (c.t = "str", s ? G(e, 17, z_(t, c)) : G(e, 6, G_(t, c))), !0;
    case "n":
      return t.v == (t.v | 0) && t.v > -1e3 && t.v < 1e3 ? s ? G(e, 13, W_(t, c)) : G(e, 2, B_(t, c)) : s ? G(e, 16, L_(t, c)) : G(e, 5, M_(t, c)), !0;
    case "b":
      return c.t = "b", s ? G(e, 15, y_(t, c)) : G(e, 4, T_(t, c)), !0;
    case "e":
      return c.t = "e", s ? G(e, 14, A_(t, c)) : G(e, 3, F_(t, c)), !0;
  }
  return s ? G(e, 12, w_(t, c)) : G(e, 1, v_(t, c)), !0;
}
function xv(e, t, r, n) {
  var a = Ne(t["!ref"] || "A1"), i, s = "", o = [];
  G(
    e,
    145
    /* BrtBeginSheetData */
  );
  var c = Array.isArray(t), l = a.e.r;
  t["!rows"] && (l = Math.max(a.e.r, t["!rows"].length - 1));
  for (var f = a.s.r; f <= l; ++f) {
    s = Ze(f), u_(e, t, a, f);
    var d = !1;
    if (f <= a.e.r) for (var u = a.s.c; u <= a.e.c; ++u) {
      f === a.s.r && (o[u] = rt(u)), i = o[u] + s;
      var h = c ? (t[f] || [])[u] : t[i];
      if (!h) {
        d = !1;
        continue;
      }
      d = dv(e, h, f, u, n, t, d);
    }
  }
  G(
    e,
    146
    /* BrtEndSheetData */
  );
}
function pv(e, t) {
  !t || !t["!merges"] || (G(e, 177, q_(t["!merges"].length)), t["!merges"].forEach(function(r) {
    G(e, 176, Q_(r));
  }), G(
    e,
    178
    /* BrtEndMergeCells */
  ));
}
function mv(e, t) {
  !t || !t["!cols"] || (G(
    e,
    390
    /* BrtBeginColInfos */
  ), t["!cols"].forEach(function(r, n) {
    r && G(e, 60, av(n, r));
  }), G(
    e,
    391
    /* BrtEndColInfos */
  ));
}
function _v(e, t) {
  !t || !t["!ref"] || (G(
    e,
    648
    /* BrtBeginCellIgnoreECs */
  ), G(e, 649, cv(Ne(t["!ref"]))), G(
    e,
    650
    /* BrtEndCellIgnoreECs */
  ));
}
function vv(e, t, r) {
  t["!links"].forEach(function(n) {
    if (n[1].Target) {
      var a = ye(r, -1, n[1].Target.replace(/#.*$/, ""), ge.HLINK);
      G(e, 494, ev(n, a));
    }
  }), delete t["!links"];
}
function gv(e, t, r, n) {
  if (t["!comments"].length > 0) {
    var a = ye(n, -1, "../drawings/vmlDrawing" + (r + 1) + ".vml", ge.VML);
    G(e, 551, gs("rId" + a)), t["!legacy"] = a;
  }
}
function wv(e, t, r, n) {
  if (t["!autofilter"]) {
    var a = t["!autofilter"], i = typeof a.ref == "string" ? a.ref : $e(a.ref);
    r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
    var s = r.Workbook.Names, o = Et(i);
    o.s.r == o.e.r && (o.e.r = Et(t["!ref"]).e.r, i = $e(o));
    for (var c = 0; c < s.length; ++c) {
      var l = s[c];
      if (l.Name == "_xlnm._FilterDatabase" && l.Sheet == n) {
        l.Ref = "'" + r.SheetNames[n] + "'!" + i;
        break;
      }
    }
    c == s.length && s.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + i }), G(e, 161, pn(Ne(i))), G(
      e,
      162
      /* BrtEndAFilter */
    );
  }
}
function Ev(e, t, r) {
  G(
    e,
    133
    /* BrtBeginWsViews */
  ), G(e, 137, lv(t, r)), G(
    e,
    138
    /* BrtEndWsView */
  ), G(
    e,
    134
    /* BrtEndWsViews */
  );
}
function Tv(e, t) {
  t["!protect"] && G(e, 535, fv(t["!protect"]));
}
function Sv(e, t, r, n) {
  var a = ht(), i = r.SheetNames[e], s = r.Sheets[i] || {}, o = i;
  try {
    r && r.Workbook && (o = r.Workbook.Sheets[e].CodeName || o);
  } catch {
  }
  var c = Ne(s["!ref"] || "A1");
  if (c.e.c > 16383 || c.e.r > 1048575) {
    if (t.WTF) throw new Error("Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
    c.e.c = Math.min(c.e.c, 16383), c.e.r = Math.min(c.e.c, 1048575);
  }
  return s["!links"] = [], s["!comments"] = [], G(
    a,
    129
    /* BrtBeginSheet */
  ), (r.vbaraw || s["!outline"]) && G(a, 147, m_(o, s["!outline"])), G(a, 148, d_(c)), Ev(a, s, r.Workbook), mv(a, s), xv(a, s, e, t), Tv(a, s), wv(a, s, r, e), pv(a, s), vv(a, s, n), s["!margins"] && G(a, 476, sv(s["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && _v(a, s), gv(a, s, e, n), G(
    a,
    130
    /* BrtEndSheet */
  ), a.end();
}
function yv(e, t) {
  e.l += 10;
  var r = nt(e);
  return { name: r };
}
var Cv = [
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
function Fv(e) {
  return !e.Workbook || !e.Workbook.WBProps ? "false" : nd(e.Workbook.WBProps.date1904) ? "true" : "false";
}
var kv = /* @__PURE__ */ "][*?/\\".split("");
function Mc(e, t) {
  if (e.length > 31)
    throw new Error("Sheet names cannot exceed 31 chars");
  var r = !0;
  return kv.forEach(function(n) {
    if (e.indexOf(n) != -1)
      throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
  }), r;
}
function Av(e, t, r) {
  e.forEach(function(n, a) {
    Mc(n);
    for (var i = 0; i < a; ++i) if (n == e[i]) throw new Error("Duplicate Sheet Name: " + n);
    if (r) {
      var s = t && t[a] && t[a].CodeName || n;
      if (s.charCodeAt(0) == 95 && s.length > 22) throw new Error("Bad Code Name: Worksheet" + s);
    }
  });
}
function Rv(e) {
  if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
  if (!e.SheetNames.length) throw new Error("Workbook is empty");
  var t = e.Workbook && e.Workbook.Sheets || [];
  Av(e.SheetNames, t, !!e.vbaraw);
  for (var r = 0; r < e.SheetNames.length; ++r) Qm(e.Sheets[e.SheetNames[r]], e.SheetNames[r], r);
}
function Pc(e) {
  var t = [He];
  t[t.length] = J("workbook", null, {
    xmlns: dn[0],
    //'xmlns:mx': XMLNS.mx,
    //'xmlns:s': XMLNS_main[0],
    "xmlns:r": ze.r
  });
  var r = e.Workbook && (e.Workbook.Names || []).length > 0, n = { codeName: "ThisWorkbook" };
  e.Workbook && e.Workbook.WBProps && (Cv.forEach(function(o) {
    e.Workbook.WBProps[o[0]] != null && e.Workbook.WBProps[o[0]] != o[1] && (n[o[0]] = e.Workbook.WBProps[o[0]]);
  }), e.Workbook.WBProps.CodeName && (n.codeName = e.Workbook.WBProps.CodeName, delete n.CodeName)), t[t.length] = J("workbookPr", null, n);
  var a = e.Workbook && e.Workbook.Sheets || [], i = 0;
  if (a && a[0] && a[0].Hidden) {
    for (t[t.length] = "<bookViews>", i = 0; i != e.SheetNames.length && !(!a[i] || !a[i].Hidden); ++i)
      ;
    i == e.SheetNames.length && (i = 0), t[t.length] = '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>', t[t.length] = "</bookViews>";
  }
  for (t[t.length] = "<sheets>", i = 0; i != e.SheetNames.length; ++i) {
    var s = { name: Ce(e.SheetNames[i].slice(0, 31)) };
    if (s.sheetId = "" + (i + 1), s["r:id"] = "rId" + (i + 1), a[i]) switch (a[i].Hidden) {
      case 1:
        s.state = "hidden";
        break;
      case 2:
        s.state = "veryHidden";
        break;
    }
    t[t.length] = J("sheet", null, s);
  }
  return t[t.length] = "</sheets>", r && (t[t.length] = "<definedNames>", e.Workbook && e.Workbook.Names && e.Workbook.Names.forEach(function(o) {
    var c = { name: o.Name };
    o.Comment && (c.comment = o.Comment), o.Sheet != null && (c.localSheetId = "" + o.Sheet), o.Hidden && (c.hidden = "1"), o.Ref && (t[t.length] = J("definedName", Ce(o.Ref), c));
  }), t[t.length] = "</definedNames>"), t.length > 2 && (t[t.length] = "</workbook>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Ov(e, t) {
  var r = {};
  return r.Hidden = e.read_shift(4), r.iTabID = e.read_shift(4), r.strRelID = Xi(e), r.name = nt(e), r;
}
function Iv(e, t) {
  return t || (t = B(127)), t.write_shift(4, e.Hidden), t.write_shift(4, e.iTabID), gs(e.strRelID, t), Xe(e.name.slice(0, 31), t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Nv(e, t) {
  var r = {}, n = e.read_shift(4);
  r.defaultThemeVersion = e.read_shift(4);
  var a = t > 8 ? nt(e) : "";
  return a.length > 0 && (r.CodeName = a), r.autoCompressPictures = !!(n & 65536), r.backupFile = !!(n & 64), r.checkCompatibility = !!(n & 4096), r.date1904 = !!(n & 1), r.filterPrivacy = !!(n & 8), r.hidePivotFieldList = !!(n & 1024), r.promptedSolutions = !!(n & 16), r.publishItems = !!(n & 2048), r.refreshAllConnections = !!(n & 262144), r.saveExternalLinkValues = !!(n & 128), r.showBorderUnselectedTables = !!(n & 4), r.showInkAnnotation = !!(n & 32), r.showObjects = ["all", "placeholders", "none"][n >> 13 & 3], r.showPivotChartFilter = !!(n & 32768), r.updateLinks = ["userSet", "never", "always"][n >> 8 & 3], r;
}
function Dv(e, t) {
  t || (t = B(72));
  var r = 0;
  return e && e.filterPrivacy && (r |= 8), t.write_shift(4, r), t.write_shift(4, 0), Xl(e && e.CodeName || "ThisWorkbook", t), t.slice(0, t.l);
}
function Mv(e, t, r) {
  var n = e.l + t;
  e.l += 4, e.l += 1;
  var a = e.read_shift(4), i = Fd(e), s = zm(e, 0, r), o = vs(e);
  e.l = n;
  var c = { Name: i, Ptg: s };
  return a < 268435455 && (c.Sheet = a), o && (c.Comment = o), c;
}
function Pv(e, t) {
  G(
    e,
    143
    /* BrtBeginBundleShs */
  );
  for (var r = 0; r != t.SheetNames.length; ++r) {
    var n = t.Workbook && t.Workbook.Sheets && t.Workbook.Sheets[r] && t.Workbook.Sheets[r].Hidden || 0, a = { Hidden: n, iTabID: r + 1, strRelID: "rId" + (r + 1), name: t.SheetNames[r] };
    G(e, 156, Iv(a));
  }
  G(
    e,
    144
    /* BrtEndBundleShs */
  );
}
function Lv(e, t) {
  t || (t = B(127));
  for (var r = 0; r != 4; ++r) t.write_shift(4, 0);
  return Xe("SheetJS", t), Xe(ka.version, t), Xe(ka.version, t), Xe("7262", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function bv(e, t) {
  t || (t = B(29)), t.write_shift(-4, 0), t.write_shift(-4, 460), t.write_shift(4, 28800), t.write_shift(4, 17600), t.write_shift(4, 500), t.write_shift(4, e), t.write_shift(4, e);
  var r = 120;
  return t.write_shift(1, r), t.length > t.l ? t.slice(0, t.l) : t;
}
function Bv(e, t) {
  if (!(!t.Workbook || !t.Workbook.Sheets)) {
    for (var r = t.Workbook.Sheets, n = 0, a = -1, i = -1; n < r.length; ++n)
      !r[n] || !r[n].Hidden && a == -1 ? a = n : r[n].Hidden == 1 && i == -1 && (i = n);
    i > a || (G(
      e,
      135
      /* BrtBeginBookViews */
    ), G(e, 158, bv(a)), G(
      e,
      136
      /* BrtEndBookViews */
    ));
  }
}
function Uv(e, t) {
  var r = ht();
  return G(
    r,
    131
    /* BrtBeginBook */
  ), G(r, 128, Lv()), G(r, 153, Dv(e.Workbook && e.Workbook.WBProps || null)), Bv(r, e), Pv(r, e), G(
    r,
    132
    /* BrtEndBook */
  ), r.end();
}
function Wv(e, t, r) {
  return (t.slice(-4) === ".bin" ? Uv : Pc)(e);
}
function $v(e, t, r, n, a) {
  return (t.slice(-4) === ".bin" ? Sv : Nc)(e, r, n, a);
}
function Hv(e, t, r) {
  return (t.slice(-4) === ".bin" ? sp : _c)(e, r);
}
function Gv(e, t, r) {
  return (t.slice(-4) === ".bin" ? Dx : dc)(e, r);
}
function Vv(e, t, r) {
  return (t.slice(-4) === ".bin" ? Tp : Tc)(e);
}
function zv(e) {
  return (e.slice(-4) === ".bin" ? xp : wc)();
}
function jv(e, t) {
  var r = [];
  return e.Props && r.push(Hd(e.Props, t)), e.Custprops && r.push(Gd(e.Props, e.Custprops)), r.join("");
}
function Xv() {
  return "";
}
function Yv(e, t) {
  var r = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
  return t.cellXfs.forEach(function(n, a) {
    var i = [];
    i.push(J("NumberFormat", null, { "ss:Format": Ce(be[n.numFmtId]) }));
    var s = (
      /*::(*/
      { "ss:ID": "s" + (21 + a) }
    );
    r.push(J("Style", i.join(""), s));
  }), J("Styles", r.join(""));
}
function Lc(e) {
  return J("NamedRange", null, { "ss:Name": e.Name, "ss:RefersTo": "=" + Ss(e.Ref, { r: 0, c: 0 }) });
}
function Kv(e) {
  if (!((e || {}).Workbook || {}).Names) return "";
  for (var t = e.Workbook.Names, r = [], n = 0; n < t.length; ++n) {
    var a = t[n];
    a.Sheet == null && (a.Name.match(/^_xlfn\./) || r.push(Lc(a)));
  }
  return J("Names", r.join(""));
}
function Jv(e, t, r, n) {
  if (!e || !((n || {}).Workbook || {}).Names) return "";
  for (var a = n.Workbook.Names, i = [], s = 0; s < a.length; ++s) {
    var o = a[s];
    o.Sheet == r && (o.Name.match(/^_xlfn\./) || i.push(Lc(o)));
  }
  return i.join("");
}
function Qv(e, t, r, n) {
  if (!e) return "";
  var a = [];
  if (e["!margins"] && (a.push("<PageSetup>"), e["!margins"].header && a.push(J("Header", null, { "x:Margin": e["!margins"].header })), e["!margins"].footer && a.push(J("Footer", null, { "x:Margin": e["!margins"].footer })), a.push(J("PageMargins", null, {
    "x:Bottom": e["!margins"].bottom || "0.75",
    "x:Left": e["!margins"].left || "0.7",
    "x:Right": e["!margins"].right || "0.7",
    "x:Top": e["!margins"].top || "0.75"
  })), a.push("</PageSetup>")), n && n.Workbook && n.Workbook.Sheets && n.Workbook.Sheets[r])
    if (n.Workbook.Sheets[r].Hidden) a.push(J("Visible", n.Workbook.Sheets[r].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));
    else {
      for (var i = 0; i < r && !(n.Workbook.Sheets[i] && !n.Workbook.Sheets[i].Hidden); ++i) ;
      i == r && a.push("<Selected/>");
    }
  return ((((n || {}).Workbook || {}).Views || [])[0] || {}).RTL && a.push("<DisplayRightToLeft/>"), e["!protect"] && (a.push(qe("ProtectContents", "True")), e["!protect"].objects && a.push(qe("ProtectObjects", "True")), e["!protect"].scenarios && a.push(qe("ProtectScenarios", "True")), e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells ? a.push(qe("EnableSelection", "NoSelection")) : e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells && a.push(qe("EnableSelection", "UnlockedCells")), [
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
  })), a.length == 0 ? "" : J("WorksheetOptions", a.join(""), { xmlns: gt.x });
}
function qv(e) {
  return e.map(function(t) {
    var r = rd(t.t || ""), n = J("ss:Data", r, { xmlns: "http://www.w3.org/TR/REC-html40" });
    return J("Comment", n, { "ss:Author": t.a });
  }).join("");
}
function Zv(e, t, r, n, a, i, s) {
  if (!e || e.v == null && e.f == null) return "";
  var o = {};
  if (e.f && (o["ss:Formula"] = "=" + Ce(Ss(e.f, s))), e.F && e.F.slice(0, t.length) == t) {
    var c = je(e.F.slice(t.length + 1));
    o["ss:ArrayRange"] = "RC:R" + (c.r == s.r ? "" : "[" + (c.r - s.r) + "]") + "C" + (c.c == s.c ? "" : "[" + (c.c - s.c) + "]");
  }
  if (e.l && e.l.Target && (o["ss:HRef"] = Ce(e.l.Target), e.l.Tooltip && (o["x:HRefScreenTip"] = Ce(e.l.Tooltip))), r["!merges"])
    for (var l = r["!merges"], f = 0; f != l.length; ++f)
      l[f].s.c != s.c || l[f].s.r != s.r || (l[f].e.c > l[f].s.c && (o["ss:MergeAcross"] = l[f].e.c - l[f].s.c), l[f].e.r > l[f].s.r && (o["ss:MergeDown"] = l[f].e.r - l[f].s.r));
  var d = "", u = "";
  switch (e.t) {
    case "z":
      if (!n.sheetStubs) return "";
      break;
    case "n":
      d = "Number", u = String(e.v);
      break;
    case "b":
      d = "Boolean", u = e.v ? "1" : "0";
      break;
    case "e":
      d = "Error", u = ta[e.v];
      break;
    case "d":
      d = "DateTime", u = new Date(e.v).toISOString(), e.z == null && (e.z = e.z || be[14]);
      break;
    case "s":
      d = "String", u = td(e.v || "");
      break;
  }
  var h = mr(n.cellXfs, e, n);
  o["ss:StyleID"] = "s" + (21 + h), o["ss:Index"] = s.c + 1;
  var m = e.v != null ? u : "", x = e.t == "z" ? "" : '<Data ss:Type="' + d + '">' + m + "</Data>";
  return (e.c || []).length > 0 && (x += qv(e.c)), J("Cell", x, o);
}
function eg(e, t) {
  var r = '<Row ss:Index="' + (e + 1) + '"';
  return t && (t.hpt && !t.hpx && (t.hpx = mc(t.hpt)), t.hpx && (r += ' ss:AutoFitHeight="0" ss:Height="' + t.hpx + '"'), t.hidden && (r += ' ss:Hidden="1"')), r + ">";
}
function tg(e, t, r, n) {
  if (!e["!ref"]) return "";
  var a = Ne(e["!ref"]), i = e["!merges"] || [], s = 0, o = [];
  e["!cols"] && e["!cols"].forEach(function(_, F) {
    Es(_);
    var A = !!_.width, y = Qa(F, _), O = { "ss:Index": F + 1 };
    A && (O["ss:Width"] = ba(y.width)), _.hidden && (O["ss:Hidden"] = "1"), o.push(J("Column", null, O));
  });
  for (var c = Array.isArray(e), l = a.s.r; l <= a.e.r; ++l) {
    for (var f = [eg(l, (e["!rows"] || [])[l])], d = a.s.c; d <= a.e.c; ++d) {
      var u = !1;
      for (s = 0; s != i.length; ++s)
        if (!(i[s].s.c > d) && !(i[s].s.r > l) && !(i[s].e.c < d) && !(i[s].e.r < l)) {
          (i[s].s.c != d || i[s].s.r != l) && (u = !0);
          break;
        }
      if (!u) {
        var h = { r: l, c: d }, m = Fe(h), x = c ? (e[l] || [])[d] : e[m];
        f.push(Zv(x, m, e, t, r, n, h));
      }
    }
    f.push("</Row>"), f.length > 2 && o.push(f.join(""));
  }
  return o.join("");
}
function rg(e, t, r) {
  var n = [], a = r.SheetNames[e], i = r.Sheets[a], s = i ? Jv(i, t, e, r) : "";
  return s.length > 0 && n.push("<Names>" + s + "</Names>"), s = i ? tg(i, t, e, r) : "", s.length > 0 && n.push("<Table>" + s + "</Table>"), n.push(Qv(i, t, e, r)), n.join("");
}
function ng(e, t) {
  t || (t = {}), e.SSF || (e.SSF = xt(be)), e.SSF && (ja(), za(e.SSF), t.revssf = Xa(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF, t.cellXfs = [], mr(t.cellXfs, {}, { revssf: { General: 0 } }));
  var r = [];
  r.push(jv(e, t)), r.push(Xv()), r.push(""), r.push("");
  for (var n = 0; n < e.SheetNames.length; ++n)
    r.push(J("Worksheet", rg(n, t, e), { "ss:Name": Ce(e.SheetNames[n]) }));
  return r[2] = Yv(e, t), r[3] = Kv(e), He + J("Workbook", r.join(""), {
    xmlns: gt.ss,
    "xmlns:o": gt.o,
    "xmlns:x": gt.x,
    "xmlns:ss": gt.ss,
    "xmlns:dt": gt.dt,
    "xmlns:html": gt.html
  });
}
var vi = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function ag(e, t) {
  var r = [], n = [], a = [], i = 0, s, o = D0(j0, "n"), c = D0(X0, "n");
  if (e.Props)
    for (s = et(e.Props), i = 0; i < s.length; ++i) (Object.prototype.hasOwnProperty.call(o, s[i]) ? r : Object.prototype.hasOwnProperty.call(c, s[i]) ? n : a).push([s[i], e.Props[s[i]]]);
  if (e.Custprops)
    for (s = et(e.Custprops), i = 0; i < s.length; ++i) Object.prototype.hasOwnProperty.call(e.Props || {}, s[i]) || (Object.prototype.hasOwnProperty.call(o, s[i]) ? r : Object.prototype.hasOwnProperty.call(c, s[i]) ? n : a).push([s[i], e.Custprops[s[i]]]);
  var l = [];
  for (i = 0; i < a.length; ++i)
    sc.indexOf(a[i][0]) > -1 || nc.indexOf(a[i][0]) > -1 || a[i][1] != null && l.push(a[i]);
  n.length && ke.utils.cfb_add(t, "/SummaryInformation", q0(n, vi.SI, c, X0)), (r.length || l.length) && ke.utils.cfb_add(t, "/DocumentSummaryInformation", q0(r, vi.DSI, o, j0, l.length ? l : null, vi.UDI));
}
function ig(e, t) {
  var r = t || {}, n = ke.utils.cfb_new({ root: "R" }), a = "/Workbook";
  switch (r.bookType || "xls") {
    case "xls":
      r.bookType = "biff8";
    /* falls through */
    case "xla":
      r.bookType || (r.bookType = "xla");
    /* falls through */
    case "biff8":
      a = "/Workbook", r.biff = 8;
      break;
    case "biff5":
      a = "/Book", r.biff = 5;
      break;
    default:
      throw new Error("invalid type " + r.bookType + " for XLS CFB");
  }
  return ke.utils.cfb_add(n, a, bc(e, r)), r.biff == 8 && (e.Props || e.Custprops) && ag(e, n), r.biff == 8 && e.vbaraw && Sp(n, ke.read(e.vbaraw, { type: typeof e.vbaraw == "string" ? "binary" : "buffer" })), n;
}
var sg = {
  /*::[*/
  0: {
    /* n:"BrtRowHdr", */
    f: c_
  },
  /*::[*/
  1: {
    /* n:"BrtCellBlank", */
    f: __
  },
  /*::[*/
  2: {
    /* n:"BrtCellRk", */
    f: b_
  },
  /*::[*/
  3: {
    /* n:"BrtCellError", */
    f: C_
  },
  /*::[*/
  4: {
    /* n:"BrtCellBool", */
    f: E_
  },
  /*::[*/
  5: {
    /* n:"BrtCellReal", */
    f: D_
  },
  /*::[*/
  6: {
    /* n:"BrtCellSt", */
    f: H_
  },
  /*::[*/
  7: {
    /* n:"BrtCellIsst", */
    f: R_
  },
  /*::[*/
  8: {
    /* n:"BrtFmlaString", */
    f: K_
  },
  /*::[*/
  9: {
    /* n:"BrtFmlaNum", */
    f: Y_
  },
  /*::[*/
  10: {
    /* n:"BrtFmlaBool", */
    f: j_
  },
  /*::[*/
  11: {
    /* n:"BrtFmlaError", */
    f: X_
  },
  /*::[*/
  12: {
    /* n:"BrtShortBlank", */
    f: g_
  },
  /*::[*/
  13: {
    /* n:"BrtShortRk", */
    f: U_
  },
  /*::[*/
  14: {
    /* n:"BrtShortError", */
    f: k_
  },
  /*::[*/
  15: {
    /* n:"BrtShortBool", */
    f: S_
  },
  /*::[*/
  16: {
    /* n:"BrtShortReal", */
    f: P_
  },
  /*::[*/
  17: {
    /* n:"BrtShortSt", */
    f: V_
  },
  /*::[*/
  18: {
    /* n:"BrtShortIsst", */
    f: I_
  },
  /*::[*/
  19: {
    /* n:"BrtSSTItem", */
    f: _s
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
    f: Mv
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
    f: Hx
  },
  /*::[*/
  44: {
    /* n:"BrtFmt", */
    f: Wx
  },
  /*::[*/
  45: {
    /* n:"BrtFill", */
    f: zx
  },
  /*::[*/
  46: {
    /* n:"BrtBorder", */
    f: Xx
  },
  /*::[*/
  47: {
    /* n:"BrtXF", */
    f: jx
  },
  /*::[*/
  48: {
    /* n:"BrtStyle" */
  },
  /*::[*/
  49: {
    /* n:"BrtCellMeta", */
    f: gd
  },
  /*::[*/
  50: {
    /* n:"BrtValueMeta" */
  },
  /*::[*/
  51: {
    /* n:"BrtMdb" */
    f: cp
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
    f: wx
  },
  /*::[*/
  62: {
    /* n:"BrtCellRString", */
    f: $_
  },
  /*::[*/
  63: {
    /* n:"BrtCalcChainItem$", */
    f: pp
  },
  /*::[*/
  64: {
    /* n:"BrtDVal", */
    f: uv
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
    f: Ht,
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
    f: ov
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
    f: p_
  },
  /*::[*/
  148: {
    /* n:"BrtWsDim", */
    f: h_,
    p: 16
  },
  /*::[*/
  151: {
    /* n:"BrtPane", */
    f: tv
  },
  /*::[*/
  152: {
    /* n:"BrtSel" */
  },
  /*::[*/
  153: {
    /* n:"BrtWbProp", */
    f: Nv
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
    f: Ov
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
    f: Ox
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
    f: Ur
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
    f: J_
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
    f: op
  },
  /*::[*/
  336: {
    /* n:"BrtEndEsmdtinfo", */
    T: -1
  },
  /*::[*/
  337: {
    /* n:"BrtBeginEsmdb", */
    f: hp,
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
    f: Xi
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
    f: xx
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
    f: rv
  },
  /*::[*/
  427: {
    /* n:"BrtShrFmla", */
    f: nv
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
    f: iv
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
    f: x_
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
    f: Z_
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
    f: Xi
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
    f: wp
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
    f: vp
  },
  /*::[*/
  636: {
    /* n:"BrtEndComment", */
    T: -1
  },
  /*::[*/
  637: {
    /* n:"BrtCommentText", */
    f: Sd
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
    f: yv
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
    f: hv
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
function Q(e, t, r, n) {
  var a = t;
  if (!isNaN(a)) {
    var i = n || (r || []).length || 0, s = e.next(4);
    s.write_shift(2, a), s.write_shift(2, i), /*:: len != null &&*/
    i > 0 && xs(r) && e.push(r);
  }
}
function og(e, t, r, n) {
  var a = (r || []).length || 0;
  if (a <= 8224) return Q(e, t, r, a);
  var i = t;
  if (!isNaN(i)) {
    for (var s = r.parts || [], o = 0, c = 0, l = 0; l + (s[o] || 8224) <= 8224; )
      l += s[o] || 8224, o++;
    var f = e.next(4);
    for (f.write_shift(2, i), f.write_shift(2, l), e.push(r.slice(c, c + l)), c += l; c < a; ) {
      for (f = e.next(4), f.write_shift(2, 60), l = 0; l + (s[o] || 8224) <= 8224; )
        l += s[o] || 8224, o++;
      f.write_shift(2, l), e.push(r.slice(c, c + l)), c += l;
    }
  }
}
function na(e, t, r) {
  return e || (e = B(7)), e.write_shift(2, t), e.write_shift(2, r), e.write_shift(2, 0), e.write_shift(1, 0), e;
}
function lg(e, t, r, n) {
  var a = B(9);
  return na(a, e, t), lc(r, n || "b", a), a;
}
function cg(e, t, r) {
  var n = B(8 + 2 * r.length);
  return na(n, e, t), n.write_shift(1, r.length), n.write_shift(r.length, r, "sbcs"), n.l < n.length ? n.slice(0, n.l) : n;
}
function fg(e, t, r, n) {
  if (t.v != null) switch (t.t) {
    case "d":
    case "n":
      var a = t.t == "d" ? dt(ft(t.v)) : t.v;
      a == (a | 0) && a >= 0 && a < 65536 ? Q(e, 2, yx(r, n, a)) : Q(e, 3, Sx(r, n, a));
      return;
    case "b":
    case "e":
      Q(e, 5, lg(r, n, t.v, t.t));
      return;
    /* TODO: codepage, sst */
    case "s":
    case "str":
      Q(e, 4, cg(r, n, (t.v || "").slice(0, 255)));
      return;
  }
  Q(e, 1, na(null, r, n));
}
function ug(e, t, r, n) {
  var a = Array.isArray(t), i = Ne(t["!ref"] || "A1"), s, o = "", c = [];
  if (i.e.c > 255 || i.e.r > 16383) {
    if (n.WTF) throw new Error("Range " + (t["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    i.e.c = Math.min(i.e.c, 255), i.e.r = Math.min(i.e.c, 16383), s = $e(i);
  }
  for (var l = i.s.r; l <= i.e.r; ++l) {
    o = Ze(l);
    for (var f = i.s.c; f <= i.e.c; ++f) {
      l === i.s.r && (c[f] = rt(f)), s = c[f] + o;
      var d = a ? (t[l] || [])[f] : t[s];
      d && fg(e, d, l, f);
    }
  }
}
function hg(e, t) {
  for (var r = t || {}, n = ht(), a = 0, i = 0; i < e.SheetNames.length; ++i) e.SheetNames[i] == r.sheet && (a = i);
  if (a == 0 && r.sheet && e.SheetNames[0] != r.sheet) throw new Error("Sheet not found: " + r.sheet);
  return Q(n, r.biff == 4 ? 1033 : r.biff == 3 ? 521 : 9, ws(e, 16, r)), ug(n, e.Sheets[e.SheetNames[a]], a, r), Q(n, 10), n.end();
}
function dg(e, t, r) {
  Q(e, 49, sx({
    sz: 12,
    name: "Arial"
  }, r));
}
function xg(e, t, r) {
  t && [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(n) {
    for (var a = n[0]; a <= n[1]; ++a) t[a] != null && Q(e, 1054, cx(a, t[a], r));
  });
}
function pg(e, t) {
  var r = B(19);
  r.write_shift(4, 2151), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 1), r.write_shift(4, 0), Q(e, 2151, r), r = B(39), r.write_shift(4, 2152), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 0), r.write_shift(4, 0), r.write_shift(2, 1), r.write_shift(4, 4), r.write_shift(2, 0), uc(Ne(t["!ref"] || "A1"), r), r.write_shift(4, 4), Q(e, 2152, r);
}
function mg(e, t) {
  for (var r = 0; r < 16; ++r) Q(e, 224, eo({ numFmtId: 0, style: !0 }, 0, t));
  t.cellXfs.forEach(function(n) {
    Q(e, 224, eo(n, 0, t));
  });
}
function _g(e, t) {
  for (var r = 0; r < t["!links"].length; ++r) {
    var n = t["!links"][r];
    Q(e, 440, _x(n)), n[1].Tooltip && Q(e, 2048, vx(n));
  }
  delete t["!links"];
}
function vg(e, t) {
  if (t) {
    var r = 0;
    t.forEach(function(n, a) {
      ++r <= 256 && n && Q(e, 125, Ex(Qa(a, n), a));
    });
  }
}
function gg(e, t, r, n, a) {
  var i = 16 + mr(a.cellXfs, t, a);
  if (t.v == null && !t.bf) {
    Q(e, 513, Mr(r, n, i));
    return;
  }
  if (t.bf) Q(e, 6, Gm(t, r, n, a, i));
  else switch (t.t) {
    case "d":
    case "n":
      var s = t.t == "d" ? dt(ft(t.v)) : t.v;
      Q(e, 515, dx(r, n, s, i));
      break;
    case "b":
    case "e":
      Q(e, 517, hx(r, n, t.v, i, a, t.t));
      break;
    /* TODO: codepage, sst */
    case "s":
    case "str":
      if (a.bookSST) {
        var o = Cs(a.Strings, t.v, a.revStrings);
        Q(e, 253, ox(r, n, o, i));
      } else Q(e, 516, lx(r, n, (t.v || "").slice(0, 255), i, a));
      break;
    default:
      Q(e, 513, Mr(r, n, i));
  }
}
function wg(e, t, r) {
  var n = ht(), a = r.SheetNames[e], i = r.Sheets[a] || {}, s = (r || {}).Workbook || {}, o = (s.Sheets || [])[e] || {}, c = Array.isArray(i), l = t.biff == 8, f, d = "", u = [], h = Ne(i["!ref"] || "A1"), m = l ? 65536 : 16384;
  if (h.e.c > 255 || h.e.r >= m) {
    if (t.WTF) throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    h.e.c = Math.min(h.e.c, 255), h.e.r = Math.min(h.e.c, m - 1);
  }
  Q(n, 2057, ws(r, 16, t)), Q(n, 13, kt(1)), Q(n, 12, kt(100)), Q(n, 15, ct(!0)), Q(n, 17, ct(!1)), Q(n, 16, Dr(1e-3)), Q(n, 95, ct(!0)), Q(n, 42, ct(!1)), Q(n, 43, ct(!1)), Q(n, 130, kt(1)), Q(n, 128, ux()), Q(n, 131, ct(!1)), Q(n, 132, ct(!1)), l && vg(n, i["!cols"]), Q(n, 512, fx(h, t)), l && (i["!links"] = []);
  for (var x = h.s.r; x <= h.e.r; ++x) {
    d = Ze(x);
    for (var _ = h.s.c; _ <= h.e.c; ++_) {
      x === h.s.r && (u[_] = rt(_)), f = u[_] + d;
      var F = c ? (i[x] || [])[_] : i[f];
      F && (gg(n, F, x, _, t), l && F.l && i["!links"].push([f, F.l]));
    }
  }
  var A = o.CodeName || o.name || a;
  return l && Q(n, 574, ix((s.Views || [])[0])), l && (i["!merges"] || []).length && Q(n, 229, mx(i["!merges"])), l && _g(n, i), Q(n, 442, fc(A)), l && pg(n, i), Q(
    n,
    10
    /* EOF */
  ), n.end();
}
function Eg(e, t, r) {
  var n = ht(), a = (e || {}).Workbook || {}, i = a.Sheets || [], s = (
    /*::((*/
    a.WBProps || {
      /*::CodeName:"ThisWorkbook"*/
    }
  ), o = r.biff == 8, c = r.biff == 5;
  if (Q(n, 2057, ws(e, 5, r)), r.bookType == "xla" && Q(
    n,
    135
    /* Addin */
  ), Q(n, 225, o ? kt(1200) : null), Q(n, 193, jd(2)), c && Q(
    n,
    191
    /* ToolbarHdr */
  ), c && Q(
    n,
    192
    /* ToolbarEnd */
  ), Q(
    n,
    226
    /* InterfaceEnd */
  ), Q(n, 92, tx("SheetJS", r)), Q(n, 66, kt(o ? 1200 : 1252)), o && Q(n, 353, kt(0)), o && Q(
    n,
    448
    /* Excel9File */
  ), Q(n, 317, Tx(e.SheetNames.length)), o && e.vbaraw && Q(
    n,
    211
    /* ObProj */
  ), o && e.vbaraw) {
    var l = s.CodeName || "ThisWorkbook";
    Q(n, 442, fc(l));
  }
  Q(n, 156, kt(17)), Q(n, 25, ct(!1)), Q(n, 18, ct(!1)), Q(n, 19, kt(0)), o && Q(n, 431, ct(!1)), o && Q(n, 444, kt(0)), Q(n, 61, ax()), Q(n, 64, ct(!1)), Q(n, 141, kt(0)), Q(n, 34, ct(Fv(e) == "true")), Q(n, 14, ct(!0)), o && Q(n, 439, ct(!1)), Q(n, 218, kt(0)), dg(n, e, r), xg(n, e.SSF, r), mg(n, r), o && Q(n, 352, ct(!1));
  var f = n.end(), d = ht();
  o && Q(d, 140, gx()), o && r.Strings && og(d, 252, nx(r.Strings)), Q(
    d,
    10
    /* EOF */
  );
  var u = d.end(), h = ht(), m = 0, x = 0;
  for (x = 0; x < e.SheetNames.length; ++x) m += (o ? 12 : 11) + (o ? 2 : 1) * e.SheetNames[x].length;
  var _ = f.length + m + u.length;
  for (x = 0; x < e.SheetNames.length; ++x) {
    var F = i[x] || {};
    Q(h, 133, rx({ pos: _, hs: F.Hidden || 0, dt: 0, name: e.SheetNames[x] }, r)), _ += t[x].length;
  }
  var A = h.end();
  if (m != A.length) throw new Error("BS8 " + m + " != " + A.length);
  var y = [];
  return f.length && y.push(f), A.length && y.push(A), u.length && y.push(u), Qe(y);
}
function Tg(e, t) {
  var r = t || {}, n = [];
  e && !e.SSF && (e.SSF = xt(be)), e && e.SSF && (ja(), za(e.SSF), r.revssf = Xa(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.Strings = /*::((*/
  [], r.Strings.Count = 0, r.Strings.Unique = 0, Fs(r), r.cellXfs = [], mr(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {});
  for (var a = 0; a < e.SheetNames.length; ++a) n[n.length] = wg(a, r, e);
  return n.unshift(Eg(e, n, r)), Qe(n);
}
function bc(e, t) {
  for (var r = 0; r <= e.SheetNames.length; ++r) {
    var n = e.Sheets[e.SheetNames[r]];
    if (!(!n || !n["!ref"])) {
      var a = Et(n["!ref"]);
      a.e.c > 255 && typeof console < "u" && console.error && console.error("Worksheet '" + e.SheetNames[r] + "' extends beyond column IV (255).  Data may be lost.");
    }
  }
  var i = t || {};
  switch (i.biff || 2) {
    case 8:
    case 5:
      return Tg(e, t);
    case 4:
    case 3:
    case 2:
      return hg(e, t);
  }
  throw new Error("invalid type " + i.bookType + " for BIFF");
}
function Sg(e, t, r, n) {
  for (var a = e["!merges"] || [], i = [], s = t.s.c; s <= t.e.c; ++s) {
    for (var o = 0, c = 0, l = 0; l < a.length; ++l)
      if (!(a[l].s.r > r || a[l].s.c > s) && !(a[l].e.r < r || a[l].e.c < s)) {
        if (a[l].s.r < r || a[l].s.c < s) {
          o = -1;
          break;
        }
        o = a[l].e.r - a[l].s.r + 1, c = a[l].e.c - a[l].s.c + 1;
        break;
      }
    if (!(o < 0)) {
      var f = Fe({ r, c: s }), d = n.dense ? (e[r] || [])[s] : e[f], u = d && d.v != null && (d.h || ed(d.w || (Qt(d), d.w) || "")) || "", h = {};
      o > 1 && (h.rowspan = o), c > 1 && (h.colspan = c), n.editable ? u = '<span contenteditable="true">' + u + "</span>" : d && (h["data-t"] = d && d.t || "z", d.v != null && (h["data-v"] = d.v), d.z != null && (h["data-z"] = d.z), d.l && (d.l.Target || "#").charAt(0) != "#" && (u = '<a href="' + d.l.Target + '">' + u + "</a>")), h.id = (n.id || "sjs") + "-" + f, i.push(J("td", u, h));
    }
  }
  var m = "<tr>";
  return m + i.join("") + "</tr>";
}
var yg = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>', Cg = "</body></html>";
function Fg(e, t, r) {
  var n = [];
  return n.join("") + "<table" + (r && r.id ? ' id="' + r.id + '"' : "") + ">";
}
function Bc(e, t) {
  var r = t || {}, n = r.header != null ? r.header : yg, a = r.footer != null ? r.footer : Cg, i = [n], s = Et(e["!ref"]);
  r.dense = Array.isArray(e), i.push(Fg(e, s, r));
  for (var o = s.s.r; o <= s.e.r; ++o) i.push(Sg(e, s, o, r));
  return i.push("</table>" + a), i.join("");
}
function Uc(e, t, r) {
  var n = r || {}, a = 0, i = 0;
  if (n.origin != null)
    if (typeof n.origin == "number") a = n.origin;
    else {
      var s = typeof n.origin == "string" ? je(n.origin) : n.origin;
      a = s.r, i = s.c;
    }
  var o = t.getElementsByTagName("tr"), c = Math.min(n.sheetRows || 1e7, o.length), l = { s: { r: 0, c: 0 }, e: { r: a, c: i } };
  if (e["!ref"]) {
    var f = Et(e["!ref"]);
    l.s.r = Math.min(l.s.r, f.s.r), l.s.c = Math.min(l.s.c, f.s.c), l.e.r = Math.max(l.e.r, f.e.r), l.e.c = Math.max(l.e.c, f.e.c), a == -1 && (l.e.r = a = f.e.r + 1);
  }
  var d = [], u = 0, h = e["!rows"] || (e["!rows"] = []), m = 0, x = 0, _ = 0, F = 0, A = 0, y = 0;
  for (e["!cols"] || (e["!cols"] = []); m < o.length && x < c; ++m) {
    var O = o[m];
    if (oo(O)) {
      if (n.display) continue;
      h[x] = { hidden: !0 };
    }
    var j = O.children;
    for (_ = F = 0; _ < j.length; ++_) {
      var Z = j[_];
      if (!(n.display && oo(Z))) {
        var R = Z.hasAttribute("data-v") ? Z.getAttribute("data-v") : Z.hasAttribute("v") ? Z.getAttribute("v") : ad(Z.innerHTML), W = Z.getAttribute("data-z") || Z.getAttribute("z");
        for (u = 0; u < d.length; ++u) {
          var P = d[u];
          P.s.c == F + i && P.s.r < x + a && x + a <= P.e.r && (F = P.e.c + 1 - i, u = -1);
        }
        y = +Z.getAttribute("colspan") || 1, ((A = +Z.getAttribute("rowspan") || 1) > 1 || y > 1) && d.push({ s: { r: x + a, c: F + i }, e: { r: x + a + (A || 1) - 1, c: F + i + (y || 1) - 1 } });
        var H = { t: "s", v: R }, D = Z.getAttribute("data-t") || Z.getAttribute("t") || "";
        R != null && (R.length == 0 ? H.t = D || "z" : n.raw || R.trim().length == 0 || D == "s" || (R === "TRUE" ? H = { t: "b", v: !0 } : R === "FALSE" ? H = { t: "b", v: !1 } : isNaN(Yt(R)) ? isNaN(zn(R).getDate()) || (H = { t: "d", v: ft(R) }, n.cellDates || (H = { t: "n", v: dt(H.v) }), H.z = n.dateNF || be[14]) : H = { t: "n", v: Yt(R) })), H.z === void 0 && W != null && (H.z = W);
        var V = "", q = Z.getElementsByTagName("A");
        if (q && q.length) for (var _e = 0; _e < q.length && !(q[_e].hasAttribute("href") && (V = q[_e].getAttribute("href"), V.charAt(0) != "#")); ++_e) ;
        V && V.charAt(0) != "#" && (H.l = { Target: V }), n.dense ? (e[x + a] || (e[x + a] = []), e[x + a][F + i] = H) : e[Fe({ c: F + i, r: x + a })] = H, l.e.c < F + i && (l.e.c = F + i), F += y;
      }
    }
    ++x;
  }
  return d.length && (e["!merges"] = (e["!merges"] || []).concat(d)), l.e.r = Math.max(l.e.r, x - 1 + a), e["!ref"] = $e(l), x >= c && (e["!fullref"] = $e((l.e.r = o.length - m + x - 1 + a, l))), e;
}
function Wc(e, t) {
  var r = t || {}, n = r.dense ? [] : {};
  return Uc(n, e, t);
}
function kg(e, t) {
  return Pr(Wc(e, t), t);
}
function oo(e) {
  var t = "", r = Ag(e);
  return r && (t = r(e).getPropertyValue("display")), t || (t = e.style && e.style.display), t === "none";
}
function Ag(e) {
  return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}
var Rg = /* @__PURE__ */ (function() {
  var e = [
    "<office:master-styles>",
    '<style:master-page style:name="mp1" style:page-layout-name="mp1">',
    "<style:header/>",
    '<style:header-left style:display="false"/>',
    "<style:footer/>",
    '<style:footer-left style:display="false"/>',
    "</style:master-page>",
    "</office:master-styles>"
  ].join(""), t = "<office:document-styles " + Xn({
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
    return He + t;
  };
})(), lo = /* @__PURE__ */ (function() {
  var e = function(i) {
    return Ce(i).replace(/  +/g, function(s) {
      return '<text:s text:c="' + s.length + '"/>';
    }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>");
  }, t = `          <table:table-cell />
`, r = `          <table:covered-table-cell/>
`, n = function(i, s, o) {
    var c = [];
    c.push('      <table:table table:name="' + Ce(s.SheetNames[o]) + `" table:style-name="ta1">
`);
    var l = 0, f = 0, d = Et(i["!ref"] || "A1"), u = i["!merges"] || [], h = 0, m = Array.isArray(i);
    if (i["!cols"])
      for (f = 0; f <= d.e.c; ++f) c.push("        <table:table-column" + (i["!cols"][f] ? ' table:style-name="co' + i["!cols"][f].ods + '"' : "") + `></table:table-column>
`);
    var x = "", _ = i["!rows"] || [];
    for (l = 0; l < d.s.r; ++l)
      x = _[l] ? ' table:style-name="ro' + _[l].ods + '"' : "", c.push("        <table:table-row" + x + `></table:table-row>
`);
    for (; l <= d.e.r; ++l) {
      for (x = _[l] ? ' table:style-name="ro' + _[l].ods + '"' : "", c.push("        <table:table-row" + x + `>
`), f = 0; f < d.s.c; ++f) c.push(t);
      for (; f <= d.e.c; ++f) {
        var F = !1, A = {}, y = "";
        for (h = 0; h != u.length; ++h)
          if (!(u[h].s.c > f) && !(u[h].s.r > l) && !(u[h].e.c < f) && !(u[h].e.r < l)) {
            (u[h].s.c != f || u[h].s.r != l) && (F = !0), A["table:number-columns-spanned"] = u[h].e.c - u[h].s.c + 1, A["table:number-rows-spanned"] = u[h].e.r - u[h].s.r + 1;
            break;
          }
        if (F) {
          c.push(r);
          continue;
        }
        var O = Fe({ r: l, c: f }), j = m ? (i[l] || [])[f] : i[O];
        if (j && j.f && (A["table:formula"] = Ce(Km(j.f)), j.F && j.F.slice(0, O.length) == O)) {
          var Z = Et(j.F);
          A["table:number-matrix-columns-spanned"] = Z.e.c - Z.s.c + 1, A["table:number-matrix-rows-spanned"] = Z.e.r - Z.s.r + 1;
        }
        if (!j) {
          c.push(t);
          continue;
        }
        switch (j.t) {
          case "b":
            y = j.v ? "TRUE" : "FALSE", A["office:value-type"] = "boolean", A["office:boolean-value"] = j.v ? "true" : "false";
            break;
          case "n":
            y = j.w || String(j.v || 0), A["office:value-type"] = "float", A["office:value"] = j.v || 0;
            break;
          case "s":
          case "str":
            y = j.v == null ? "" : j.v, A["office:value-type"] = "string";
            break;
          case "d":
            y = j.w || ft(j.v).toISOString(), A["office:value-type"] = "date", A["office:date-value"] = ft(j.v).toISOString(), A["table:style-name"] = "ce1";
            break;
          //case 'e':
          default:
            c.push(t);
            continue;
        }
        var R = e(y);
        if (j.l && j.l.Target) {
          var W = j.l.Target;
          W = W.charAt(0) == "#" ? "#" + Jm(W.slice(1)) : W, W.charAt(0) != "#" && !W.match(/^\w+:/) && (W = "../" + W), R = J("text:a", R, { "xlink:href": W.replace(/&/g, "&amp;") });
        }
        c.push("          " + J("table:table-cell", J("text:p", R, {}), A) + `
`);
      }
      c.push(`        </table:table-row>
`);
    }
    return c.push(`      </table:table>
`), c.join("");
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
    s.SheetNames.map(function(l) {
      return s.Sheets[l];
    }).forEach(function(l) {
      if (l && l["!cols"]) {
        for (var f = 0; f < l["!cols"].length; ++f) if (l["!cols"][f]) {
          var d = l["!cols"][f];
          if (d.width == null && d.wpx == null && d.wch == null) continue;
          Es(d), d.ods = o;
          var u = l["!cols"][f].wpx + "px";
          i.push('  <style:style style:name="co' + o + `" style:family="table-column">
`), i.push('   <style:table-column-properties fo:break-before="auto" style:column-width="' + u + `"/>
`), i.push(`  </style:style>
`), ++o;
        }
      }
    });
    var c = 0;
    s.SheetNames.map(function(l) {
      return s.Sheets[l];
    }).forEach(function(l) {
      if (l && l["!rows"]) {
        for (var f = 0; f < l["!rows"].length; ++f) if (l["!rows"][f]) {
          l["!rows"][f].ods = c;
          var d = l["!rows"][f].hpx + "px";
          i.push('  <style:style style:name="ro' + c + `" style:family="table-row">
`), i.push('   <style:table-row-properties fo:break-before="auto" style:row-height="' + d + `"/>
`), i.push(`  </style:style>
`), ++c;
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
    var c = [He], l = Xn({
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
    }), f = Xn({
      "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
      "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
    });
    o.bookType == "fods" ? (c.push("<office:document" + l + f + `>
`), c.push(tc().replace(/office:document-meta/g, "office:meta"))) : c.push("<office:document-content" + l + `>
`), a(c, s), c.push(`  <office:body>
`), c.push(`    <office:spreadsheet>
`);
    for (var d = 0; d != s.SheetNames.length; ++d) c.push(n(s.Sheets[s.SheetNames[d]], s, d));
    return c.push(`    </office:spreadsheet>
`), c.push(`  </office:body>
`), o.bookType == "fods" ? c.push("</office:document>") : c.push("</office:document-content>"), c.join("");
  };
})();
function $c(e, t) {
  if (t.bookType == "fods") return lo(e, t);
  var r = fs(), n = "", a = [], i = [];
  return n = "mimetype", de(r, n, "application/vnd.oasis.opendocument.spreadsheet"), n = "content.xml", de(r, n, lo(e, t)), a.push([n, "text/xml"]), i.push([n, "ContentFile"]), n = "styles.xml", de(r, n, Rg(e, t)), a.push([n, "text/xml"]), i.push([n, "StylesFile"]), n = "meta.xml", de(r, n, He + tc(
    /*::wb, opts*/
  )), a.push([n, "text/xml"]), i.push([n, "MetadataFile"]), n = "manifest.rdf", de(r, n, $d(
    i
    /*, opts*/
  )), a.push([n, "application/rdf+xml"]), n = "META-INF/manifest.xml", de(r, n, Ud(
    a
    /*, opts*/
  )), r;
}
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
function Wa(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function Og(e) {
  return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : Dt(jn(e));
}
function Ig(e, t) {
  e:
    for (var r = 0; r <= e.length - t.length; ++r) {
      for (var n = 0; n < t.length; ++n)
        if (e[r + n] != t[n])
          continue e;
      return !0;
    }
  return !1;
}
function pr(e) {
  var t = e.reduce(function(a, i) {
    return a + i.length;
  }, 0), r = new Uint8Array(t), n = 0;
  return e.forEach(function(a) {
    r.set(a, n), n += a.length;
  }), r;
}
function Ng(e, t, r) {
  var n = Math.floor(r == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(r))) + 6176 - 20, a = r / Math.pow(10, n - 6176);
  e[t + 15] |= n >> 7, e[t + 14] |= (n & 127) << 1;
  for (var i = 0; a >= 1; ++i, a /= 256)
    e[t + i] = a & 255;
  e[t + 15] |= r >= 0 ? 0 : 128;
}
function Yn(e, t) {
  var r = t ? t[0] : 0, n = e[r] & 127;
  e:
    if (e[r++] >= 128 && (n |= (e[r] & 127) << 7, e[r++] < 128 || (n |= (e[r] & 127) << 14, e[r++] < 128) || (n |= (e[r] & 127) << 21, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 28), ++r, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 35), ++r, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 42), ++r, e[r++] < 128)))
      break e;
  return t && (t[0] = r), n;
}
function Se(e) {
  var t = new Uint8Array(7);
  t[0] = e & 127;
  var r = 1;
  e:
    if (e > 127) {
      if (t[r - 1] |= 128, t[r] = e >> 7 & 127, ++r, e <= 16383 || (t[r - 1] |= 128, t[r] = e >> 14 & 127, ++r, e <= 2097151) || (t[r - 1] |= 128, t[r] = e >> 21 & 127, ++r, e <= 268435455) || (t[r - 1] |= 128, t[r] = e / 256 >>> 21 & 127, ++r, e <= 34359738367) || (t[r - 1] |= 128, t[r] = e / 65536 >>> 21 & 127, ++r, e <= 4398046511103))
        break e;
      t[r - 1] |= 128, t[r] = e / 16777216 >>> 21 & 127, ++r;
    }
  return t.slice(0, r);
}
function rn(e) {
  var t = 0, r = e[t] & 127;
  e:
    if (e[t++] >= 128) {
      if (r |= (e[t] & 127) << 7, e[t++] < 128 || (r |= (e[t] & 127) << 14, e[t++] < 128) || (r |= (e[t] & 127) << 21, e[t++] < 128))
        break e;
      r |= (e[t] & 127) << 28;
    }
  return r;
}
function Ge(e) {
  for (var t = [], r = [0]; r[0] < e.length; ) {
    var n = r[0], a = Yn(e, r), i = a & 7;
    a = Math.floor(a / 8);
    var s = 0, o;
    if (a == 0)
      break;
    switch (i) {
      case 0:
        {
          for (var c = r[0]; e[r[0]++] >= 128; )
            ;
          o = e.slice(c, r[0]);
        }
        break;
      case 5:
        s = 4, o = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 1:
        s = 8, o = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 2:
        s = Yn(e, r), o = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 3:
      case 4:
      default:
        throw new Error("PB Type ".concat(i, " for Field ").concat(a, " at offset ").concat(n));
    }
    var l = { data: o, type: i };
    t[a] == null ? t[a] = [l] : t[a].push(l);
  }
  return t;
}
function Ke(e) {
  var t = [];
  return e.forEach(function(r, n) {
    r.forEach(function(a) {
      a.data && (t.push(Se(n * 8 + a.type)), a.type == 2 && t.push(Se(a.data.length)), t.push(a.data));
    });
  }), pr(t);
}
function It(e) {
  for (var t, r = [], n = [0]; n[0] < e.length; ) {
    var a = Yn(e, n), i = Ge(e.slice(n[0], n[0] + a));
    n[0] += a;
    var s = {
      id: rn(i[1][0].data),
      messages: []
    };
    i[2].forEach(function(o) {
      var c = Ge(o.data), l = rn(c[3][0].data);
      s.messages.push({
        meta: c,
        data: e.slice(n[0], n[0] + l)
      }), n[0] += l;
    }), (t = i[3]) != null && t[0] && (s.merge = rn(i[3][0].data) >>> 0 > 0), r.push(s);
  }
  return r;
}
function zr(e) {
  var t = [];
  return e.forEach(function(r) {
    var n = [];
    n[1] = [{ data: Se(r.id), type: 0 }], n[2] = [], r.merge != null && (n[3] = [{ data: Se(+!!r.merge), type: 0 }]);
    var a = [];
    r.messages.forEach(function(s) {
      a.push(s.data), s.meta[3] = [{ type: 0, data: Se(s.data.length) }], n[2].push({ data: Ke(s.meta), type: 2 });
    });
    var i = Ke(n);
    t.push(Se(i.length)), t.push(i), a.forEach(function(s) {
      return t.push(s);
    });
  }), pr(t);
}
function Dg(e, t) {
  if (e != 0)
    throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var r = [0], n = Yn(t, r), a = []; r[0] < t.length; ) {
    var i = t[r[0]] & 3;
    if (i == 0) {
      var s = t[r[0]++] >> 2;
      if (s < 60)
        ++s;
      else {
        var o = s - 59;
        s = t[r[0]], o > 1 && (s |= t[r[0] + 1] << 8), o > 2 && (s |= t[r[0] + 2] << 16), o > 3 && (s |= t[r[0] + 3] << 24), s >>>= 0, s++, r[0] += o;
      }
      a.push(t.slice(r[0], r[0] + s)), r[0] += s;
      continue;
    } else {
      var c = 0, l = 0;
      if (i == 1 ? (l = (t[r[0]] >> 2 & 7) + 4, c = (t[r[0]++] & 224) << 3, c |= t[r[0]++]) : (l = (t[r[0]++] >> 2) + 1, i == 2 ? (c = t[r[0]] | t[r[0] + 1] << 8, r[0] += 2) : (c = (t[r[0]] | t[r[0] + 1] << 8 | t[r[0] + 2] << 16 | t[r[0] + 3] << 24) >>> 0, r[0] += 4)), a = [pr(a)], c == 0)
        throw new Error("Invalid offset 0");
      if (c > a[0].length)
        throw new Error("Invalid offset beyond length");
      if (l >= c)
        for (a.push(a[0].slice(-c)), l -= c; l >= a[a.length - 1].length; )
          a.push(a[a.length - 1]), l -= a[a.length - 1].length;
      a.push(a[0].slice(-c, -c + l));
    }
  }
  var f = pr(a);
  if (f.length != n)
    throw new Error("Unexpected length: ".concat(f.length, " != ").concat(n));
  return f;
}
function Nt(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = e[r++], a = e[r] | e[r + 1] << 8 | e[r + 2] << 16;
    r += 3, t.push(Dg(n, e.slice(r, r + a))), r += a;
  }
  if (r !== e.length)
    throw new Error("data is not a valid framed stream!");
  return pr(t);
}
function jr(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = Math.min(e.length - r, 268435455), a = new Uint8Array(4);
    t.push(a);
    var i = Se(n), s = i.length;
    t.push(i), n <= 60 ? (s++, t.push(new Uint8Array([n - 1 << 2]))) : n <= 256 ? (s += 2, t.push(new Uint8Array([240, n - 1 & 255]))) : n <= 65536 ? (s += 3, t.push(new Uint8Array([244, n - 1 & 255, n - 1 >> 8 & 255]))) : n <= 16777216 ? (s += 4, t.push(new Uint8Array([248, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255]))) : n <= 4294967296 && (s += 5, t.push(new Uint8Array([252, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255, n - 1 >>> 24 & 255]))), t.push(e.slice(r, r + n)), s += n, a[0] = 0, a[1] = s & 255, a[2] = s >> 8 & 255, a[3] = s >> 16 & 255, r += n;
  }
  return pr(t);
}
function gi(e, t) {
  var r = new Uint8Array(32), n = Wa(r), a = 12, i = 0;
  switch (r[0] = 5, e.t) {
    case "n":
      r[1] = 2, Ng(r, a, e.v), i |= 1, a += 16;
      break;
    case "b":
      r[1] = 6, n.setFloat64(a, e.v ? 1 : 0, !0), i |= 2, a += 8;
      break;
    case "s":
      if (t.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      r[1] = 3, n.setUint32(a, t.indexOf(e.v), !0), i |= 8, a += 4;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return n.setUint32(8, i, !0), r.slice(0, a);
}
function wi(e, t) {
  var r = new Uint8Array(32), n = Wa(r), a = 12, i = 0;
  switch (r[0] = 3, e.t) {
    case "n":
      r[2] = 2, n.setFloat64(a, e.v, !0), i |= 32, a += 8;
      break;
    case "b":
      r[2] = 6, n.setFloat64(a, e.v ? 1 : 0, !0), i |= 32, a += 8;
      break;
    case "s":
      if (t.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      r[2] = 3, n.setUint32(a, t.indexOf(e.v), !0), i |= 16, a += 4;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return n.setUint32(4, i, !0), r.slice(0, a);
}
function Zt(e) {
  var t = Ge(e);
  return Yn(t[1][0].data);
}
function Mg(e, t, r) {
  var n, a, i, s;
  if (!((n = e[6]) != null && n[0]) || !((a = e[7]) != null && a[0]))
    throw "Mutation only works on post-BNC storages!";
  var o = ((s = (i = e[8]) == null ? void 0 : i[0]) == null ? void 0 : s.data) && rn(e[8][0].data) > 0 || !1;
  if (o)
    throw "Math only works with normal offsets";
  for (var c = 0, l = Wa(e[7][0].data), f = 0, d = [], u = Wa(e[4][0].data), h = 0, m = [], x = 0; x < t.length; ++x) {
    if (t[x] == null) {
      l.setUint16(x * 2, 65535, !0), u.setUint16(x * 2, 65535);
      continue;
    }
    l.setUint16(x * 2, f, !0), u.setUint16(x * 2, h, !0);
    var _, F;
    switch (typeof t[x]) {
      case "string":
        _ = gi({ t: "s", v: t[x] }, r), F = wi({ t: "s", v: t[x] }, r);
        break;
      case "number":
        _ = gi({ t: "n", v: t[x] }, r), F = wi({ t: "n", v: t[x] }, r);
        break;
      case "boolean":
        _ = gi({ t: "b", v: t[x] }, r), F = wi({ t: "b", v: t[x] }, r);
        break;
      default:
        throw new Error("Unsupported value " + t[x]);
    }
    d.push(_), f += _.length, m.push(F), h += F.length, ++c;
  }
  for (e[2][0].data = Se(c); x < e[7][0].data.length / 2; ++x)
    l.setUint16(x * 2, 65535, !0), u.setUint16(x * 2, 65535, !0);
  return e[6][0].data = pr(d), e[3][0].data = pr(m), c;
}
function Pg(e, t) {
  if (!t || !t.numbers)
    throw new Error("Must pass a `numbers` option -- check the README");
  var r = e.Sheets[e.SheetNames[0]];
  e.SheetNames.length > 1 && console.error("The Numbers writer currently writes only the first table");
  var n = Et(r["!ref"]);
  n.s.r = n.s.c = 0;
  var a = !1;
  n.e.c > 9 && (a = !0, n.e.c = 9), n.e.r > 49 && (a = !0, n.e.r = 49), a && console.error("The Numbers writer is currently limited to ".concat($e(n)));
  var i = $a(r, { range: n, header: 1 }), s = ["~Sh33tJ5~"];
  i.forEach(function(b) {
    return b.forEach(function(k) {
      typeof k == "string" && s.push(k);
    });
  });
  var o = {}, c = [], l = ke.read(t.numbers, { type: "base64" });
  l.FileIndex.map(function(b, k) {
    return [b, l.FullPaths[k]];
  }).forEach(function(b) {
    var k = b[0], C = b[1];
    if (k.type == 2 && k.name.match(/\.iwa/)) {
      var z = k.content, oe = Nt(z), le = It(oe);
      le.forEach(function(se) {
        c.push(se.id), o[se.id] = { deps: [], location: C, type: rn(se.messages[0].meta[1][0].data) };
      });
    }
  }), c.sort(function(b, k) {
    return b - k;
  });
  var f = c.filter(function(b) {
    return b > 1;
  }).map(function(b) {
    return [b, Se(b)];
  });
  l.FileIndex.map(function(b, k) {
    return [b, l.FullPaths[k]];
  }).forEach(function(b) {
    var k = b[0];
    if (b[1], !!k.name.match(/\.iwa/)) {
      var C = It(Nt(k.content));
      C.forEach(function(z) {
        z.messages.forEach(function(oe) {
          f.forEach(function(le) {
            z.messages.some(function(se) {
              return rn(se.meta[1][0].data) != 11006 && Ig(se.data, le[1]);
            }) && o[le[0]].deps.push(z.id);
          });
        });
      });
    }
  });
  for (var d = ke.find(l, o[1].location), u = It(Nt(d.content)), h, m = 0; m < u.length; ++m) {
    var x = u[m];
    x.id == 1 && (h = x);
  }
  var _ = Zt(Ge(h.messages[0].data)[1][0].data);
  for (d = ke.find(l, o[_].location), u = It(Nt(d.content)), m = 0; m < u.length; ++m)
    x = u[m], x.id == _ && (h = x);
  for (_ = Zt(Ge(h.messages[0].data)[2][0].data), d = ke.find(l, o[_].location), u = It(Nt(d.content)), m = 0; m < u.length; ++m)
    x = u[m], x.id == _ && (h = x);
  for (_ = Zt(Ge(h.messages[0].data)[2][0].data), d = ke.find(l, o[_].location), u = It(Nt(d.content)), m = 0; m < u.length; ++m)
    x = u[m], x.id == _ && (h = x);
  var F = Ge(h.messages[0].data);
  {
    F[6][0].data = Se(n.e.r + 1), F[7][0].data = Se(n.e.c + 1);
    var A = Zt(F[46][0].data), y = ke.find(l, o[A].location), O = It(Nt(y.content));
    {
      for (var j = 0; j < O.length && O[j].id != A; ++j)
        ;
      if (O[j].id != A)
        throw "Bad ColumnRowUIDMapArchive";
      var Z = Ge(O[j].messages[0].data);
      Z[1] = [], Z[2] = [], Z[3] = [];
      for (var R = 0; R <= n.e.c; ++R) {
        var W = [];
        W[1] = W[2] = [{ type: 0, data: Se(R + 420690) }], Z[1].push({ type: 2, data: Ke(W) }), Z[2].push({ type: 0, data: Se(R) }), Z[3].push({ type: 0, data: Se(R) });
      }
      Z[4] = [], Z[5] = [], Z[6] = [];
      for (var P = 0; P <= n.e.r; ++P)
        W = [], W[1] = W[2] = [{ type: 0, data: Se(P + 726270) }], Z[4].push({ type: 2, data: Ke(W) }), Z[5].push({ type: 0, data: Se(P) }), Z[6].push({ type: 0, data: Se(P) });
      O[j].messages[0].data = Ke(Z);
    }
    y.content = jr(zr(O)), y.size = y.content.length, delete F[46];
    var H = Ge(F[4][0].data);
    {
      H[7][0].data = Se(n.e.r + 1);
      var D = Ge(H[1][0].data), V = Zt(D[2][0].data);
      y = ke.find(l, o[V].location), O = It(Nt(y.content));
      {
        if (O[0].id != V)
          throw "Bad HeaderStorageBucket";
        var q = Ge(O[0].messages[0].data);
        for (P = 0; P < i.length; ++P) {
          var _e = Ge(q[2][0].data);
          _e[1][0].data = Se(P), _e[4][0].data = Se(i[P].length), q[2][P] = { type: q[2][0].type, data: Ke(_e) };
        }
        O[0].messages[0].data = Ke(q);
      }
      y.content = jr(zr(O)), y.size = y.content.length;
      var fe = Zt(H[2][0].data);
      y = ke.find(l, o[fe].location), O = It(Nt(y.content));
      {
        if (O[0].id != fe)
          throw "Bad HeaderStorageBucket";
        for (q = Ge(O[0].messages[0].data), R = 0; R <= n.e.c; ++R)
          _e = Ge(q[2][0].data), _e[1][0].data = Se(R), _e[4][0].data = Se(n.e.r + 1), q[2][R] = { type: q[2][0].type, data: Ke(_e) };
        O[0].messages[0].data = Ke(q);
      }
      y.content = jr(zr(O)), y.size = y.content.length;
      var Ye = Zt(H[4][0].data);
      (function() {
        for (var b = ke.find(l, o[Ye].location), k = It(Nt(b.content)), C, z = 0; z < k.length; ++z) {
          var oe = k[z];
          oe.id == Ye && (C = oe);
        }
        var le = Ge(C.messages[0].data);
        {
          le[3] = [];
          var se = [];
          s.forEach(function(ve, it) {
            se[1] = [{ type: 0, data: Se(it) }], se[2] = [{ type: 0, data: Se(1) }], se[3] = [{ type: 2, data: Og(ve) }], le[3].push({ type: 2, data: Ke(se) });
          });
        }
        C.messages[0].data = Ke(le);
        var te = zr(k), Ae = jr(te);
        b.content = Ae, b.size = b.content.length;
      })();
      var Be = Ge(H[3][0].data);
      {
        var Ot = Be[1][0];
        delete Be[2];
        var Ve = Ge(Ot.data);
        {
          var Tt = Zt(Ve[2][0].data);
          (function() {
            for (var b = ke.find(l, o[Tt].location), k = It(Nt(b.content)), C, z = 0; z < k.length; ++z) {
              var oe = k[z];
              oe.id == Tt && (C = oe);
            }
            var le = Ge(C.messages[0].data);
            {
              delete le[6], delete Be[7];
              var se = new Uint8Array(le[5][0].data);
              le[5] = [];
              for (var te = 0, Ae = 0; Ae <= n.e.r; ++Ae) {
                var ve = Ge(se);
                te += Mg(ve, i[Ae], s), ve[1][0].data = Se(Ae), le[5].push({ data: Ke(ve), type: 2 });
              }
              le[1] = [{ type: 0, data: Se(n.e.c + 1) }], le[2] = [{ type: 0, data: Se(n.e.r + 1) }], le[3] = [{ type: 0, data: Se(te) }], le[4] = [{ type: 0, data: Se(n.e.r + 1) }];
            }
            C.messages[0].data = Ke(le);
            var it = zr(k), Ee = jr(it);
            b.content = Ee, b.size = b.content.length;
          })();
        }
        Ot.data = Ke(Ve);
      }
      H[3][0].data = Ke(Be);
    }
    F[4][0].data = Ke(H);
  }
  h.messages[0].data = Ke(F);
  var mt = zr(u), S = jr(mt);
  return d.content = S, d.size = d.content.length, l;
}
function Lg(e) {
  return function(r) {
    for (var n = 0; n != e.length; ++n) {
      var a = e[n];
      r[a[0]] === void 0 && (r[a[0]] = a[1]), a[2] === "n" && (r[a[0]] = Number(r[a[0]]));
    }
  };
}
function Fs(e) {
  Lg([
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
function bg(e, t) {
  return t.bookType == "ods" ? $c(e, t) : t.bookType == "numbers" ? Pg(e, t) : t.bookType == "xlsb" ? Bg(e, t) : Ug(e, t);
}
function Bg(e, t) {
  qr = 1024, e && !e.SSF && (e.SSF = xt(be)), e && e.SSF && (ja(), za(e.SSF), t.revssf = Xa(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Hn ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = t.bookType == "xlsb" ? "bin" : "xml", n = Sc.indexOf(t.bookType) > -1, a = ql();
  Fs(t = t || {});
  var i = fs(), s = "", o = 0;
  if (t.cellXfs = [], mr(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", de(i, s, rc(e.Props, t)), a.coreprops.push(s), ye(t.rels, 2, s, ge.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var c = [], l = 0; l < e.SheetNames.length; ++l)
      (e.Workbook.Sheets[l] || {}).Hidden != 2 && c.push(e.SheetNames[l]);
    e.Props.SheetNames = c;
  }
  for (e.Props.Worksheets = e.Props.SheetNames.length, de(i, s, ac(e.Props)), a.extprops.push(s), ye(t.rels, 3, s, ge.EXT_PROPS), e.Custprops !== e.Props && et(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", de(i, s, ic(e.Custprops)), a.custprops.push(s), ye(t.rels, 4, s, ge.CUST_PROPS)), o = 1; o <= e.SheetNames.length; ++o) {
    var f = { "!id": {} }, d = e.Sheets[e.SheetNames[o - 1]], u = (d || {})["!type"] || "sheet";
    switch (u) {
      case "chart":
      /* falls through */
      default:
        s = "xl/worksheets/sheet" + o + "." + r, de(i, s, $v(o - 1, s, t, e, f)), a.sheets.push(s), ye(t.wbrels, -1, "worksheets/sheet" + o + "." + r, ge.WS[0]);
    }
    if (d) {
      var h = d["!comments"], m = !1, x = "";
      h && h.length > 0 && (x = "xl/comments" + o + "." + r, de(i, x, Vv(h, x)), a.comments.push(x), ye(f, -1, "../comments" + o + "." + r, ge.CMNT), m = !0), d["!legacy"] && m && de(i, "xl/drawings/vmlDrawing" + o + ".vml", Ec(o, d["!comments"])), delete d["!comments"], delete d["!legacy"];
    }
    f["!id"].rId1 && de(i, ec(s), en(f));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, de(i, s, Gv(t.Strings, s, t)), a.strs.push(s), ye(t.wbrels, -1, "sharedStrings." + r, ge.SST)), s = "xl/workbook." + r, de(i, s, Wv(e, s)), a.workbooks.push(s), ye(t.rels, 1, s, ge.WB), s = "xl/theme/theme1.xml", de(i, s, gc(e.Themes, t)), a.themes.push(s), ye(t.wbrels, -1, "theme/theme1.xml", ge.THEME), s = "xl/styles." + r, de(i, s, Hv(e, s, t)), a.styles.push(s), ye(t.wbrels, -1, "styles." + r, ge.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", de(i, s, e.vbaraw), a.vba.push(s), ye(t.wbrels, -1, "vbaProject.bin", ge.VBA)), s = "xl/metadata." + r, de(i, s, zv(s)), a.metadata.push(s), ye(t.wbrels, -1, "metadata." + r, ge.XLMETA), de(i, "[Content_Types].xml", Zl(a, t)), de(i, "_rels/.rels", en(t.rels)), de(i, "xl/_rels/workbook." + r + ".rels", en(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function Ug(e, t) {
  qr = 1024, e && !e.SSF && (e.SSF = xt(be)), e && e.SSF && (ja(), za(e.SSF), t.revssf = Xa(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Hn ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = "xml", n = Sc.indexOf(t.bookType) > -1, a = ql();
  Fs(t = t || {});
  var i = fs(), s = "", o = 0;
  if (t.cellXfs = [], mr(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", de(i, s, rc(e.Props, t)), a.coreprops.push(s), ye(t.rels, 2, s, ge.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames)) if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
  else {
    for (var c = [], l = 0; l < e.SheetNames.length; ++l)
      (e.Workbook.Sheets[l] || {}).Hidden != 2 && c.push(e.SheetNames[l]);
    e.Props.SheetNames = c;
  }
  e.Props.Worksheets = e.Props.SheetNames.length, de(i, s, ac(e.Props)), a.extprops.push(s), ye(t.rels, 3, s, ge.EXT_PROPS), e.Custprops !== e.Props && et(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", de(i, s, ic(e.Custprops)), a.custprops.push(s), ye(t.rels, 4, s, ge.CUST_PROPS));
  var f = ["SheetJ5"];
  for (t.tcid = 0, o = 1; o <= e.SheetNames.length; ++o) {
    var d = { "!id": {} }, u = e.Sheets[e.SheetNames[o - 1]], h = (u || {})["!type"] || "sheet";
    switch (h) {
      case "chart":
      /* falls through */
      default:
        s = "xl/worksheets/sheet" + o + "." + r, de(i, s, Nc(o - 1, t, e, d)), a.sheets.push(s), ye(t.wbrels, -1, "worksheets/sheet" + o + "." + r, ge.WS[0]);
    }
    if (u) {
      var m = u["!comments"], x = !1, _ = "";
      if (m && m.length > 0) {
        var F = !1;
        m.forEach(function(A) {
          A[1].forEach(function(y) {
            y.T == !0 && (F = !0);
          });
        }), F && (_ = "xl/threadedComments/threadedComment" + o + "." + r, de(i, _, mp(m, f, t)), a.threadedcomments.push(_), ye(d, -1, "../threadedComments/threadedComment" + o + "." + r, ge.TCMNT)), _ = "xl/comments" + o + "." + r, de(i, _, Tc(m)), a.comments.push(_), ye(d, -1, "../comments" + o + "." + r, ge.CMNT), x = !0;
      }
      u["!legacy"] && x && de(i, "xl/drawings/vmlDrawing" + o + ".vml", Ec(o, u["!comments"])), delete u["!comments"], delete u["!legacy"];
    }
    d["!id"].rId1 && de(i, ec(s), en(d));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, de(i, s, dc(t.Strings, t)), a.strs.push(s), ye(t.wbrels, -1, "sharedStrings." + r, ge.SST)), s = "xl/workbook." + r, de(i, s, Pc(e)), a.workbooks.push(s), ye(t.rels, 1, s, ge.WB), s = "xl/theme/theme1.xml", de(i, s, gc(e.Themes, t)), a.themes.push(s), ye(t.wbrels, -1, "theme/theme1.xml", ge.THEME), s = "xl/styles." + r, de(i, s, _c(e, t)), a.styles.push(s), ye(t.wbrels, -1, "styles." + r, ge.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", de(i, s, e.vbaraw), a.vba.push(s), ye(t.wbrels, -1, "vbaProject.bin", ge.VBA)), s = "xl/metadata." + r, de(i, s, wc()), a.metadata.push(s), ye(t.wbrels, -1, "metadata." + r, ge.XLMETA), f.length > 1 && (s = "xl/persons/person.xml", de(i, s, _p(f)), a.people.push(s), ye(t.wbrels, -1, "persons/person.xml", ge.PEOPLE)), de(i, "[Content_Types].xml", Zl(a, t)), de(i, "_rels/.rels", en(t.rels)), de(i, "xl/_rels/workbook." + r + ".rels", en(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function Wg(e, t) {
  var r = "";
  switch ((t || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      r = Jt(e.slice(0, 12));
      break;
    case "binary":
      r = e;
      break;
    case "array":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    default:
      throw new Error("Unrecognized type " + (t && t.type || "undefined"));
  }
  return [r.charCodeAt(0), r.charCodeAt(1), r.charCodeAt(2), r.charCodeAt(3), r.charCodeAt(4), r.charCodeAt(5), r.charCodeAt(6), r.charCodeAt(7)];
}
function Hc(e, t) {
  switch (t.type) {
    case "base64":
    case "binary":
      break;
    case "buffer":
    case "array":
      t.type = "";
      break;
    case "file":
      return Zn(t.file, ke.write(e, { type: we ? "buffer" : "" }));
    case "string":
      throw new Error("'string' output type invalid for '" + t.bookType + "' files");
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return ke.write(e, t);
}
function $g(e, t) {
  var r = xt(t || {}), n = bg(e, r);
  return Hg(n, r);
}
function Hg(e, t) {
  var r = {}, n = we ? "nodebuffer" : typeof Uint8Array < "u" ? "array" : "string";
  if (t.compression && (r.compression = "DEFLATE"), t.password) r.type = n;
  else switch (t.type) {
    case "base64":
      r.type = "base64";
      break;
    case "binary":
      r.type = "string";
      break;
    case "string":
      throw new Error("'string' output type invalid for '" + t.bookType + "' files");
    case "buffer":
    case "file":
      r.type = n;
      break;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  var a = e.FullPaths ? ke.write(e, { fileType: "zip", type: (
    /*::(*/
    { nodebuffer: "buffer", string: "binary" }[r.type] || r.type
  ), compression: !!t.compression }) : e.generate(r);
  if (typeof Deno < "u" && typeof a == "string") {
    if (t.type == "binary" || t.type == "base64") return a;
    a = new Uint8Array(Va(a));
  }
  return t.password && typeof encrypt_agile < "u" ? Hc(encrypt_agile(a, t.password), t) : t.type === "file" ? Zn(t.file, a) : t.type == "string" ? Bn(
    /*::(*/
    a
    /*:: :any)*/
  ) : a;
}
function Gg(e, t) {
  var r = t || {}, n = ig(e, r);
  return Hc(n, r);
}
function Ut(e, t, r) {
  r || (r = "");
  var n = r + e;
  switch (t.type) {
    case "base64":
      return Vn(jn(n));
    case "binary":
      return jn(n);
    case "string":
      return e;
    case "file":
      return Zn(t.file, n, "utf8");
    case "buffer":
      return we ? qt(n, "utf8") : typeof TextEncoder < "u" ? new TextEncoder().encode(n) : Ut(n, { type: "binary" }).split("").map(function(a) {
        return a.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function Vg(e, t) {
  switch (t.type) {
    case "base64":
      return Vn(e);
    case "binary":
      return e;
    case "string":
      return e;
    /* override in sheet_to_txt */
    case "file":
      return Zn(t.file, e, "binary");
    case "buffer":
      return we ? qt(e, "binary") : e.split("").map(function(r) {
        return r.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function ga(e, t) {
  switch (t.type) {
    case "string":
    case "base64":
    case "binary":
      for (var r = "", n = 0; n < e.length; ++n) r += String.fromCharCode(e[n]);
      return t.type == "base64" ? Vn(r) : t.type == "string" ? Bn(r) : r;
    case "file":
      return Zn(t.file, e);
    case "buffer":
      return e;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
}
function Gc(e, t) {
  v1(), Rv(e);
  var r = xt(t || {});
  if (r.cellStyles && (r.cellNF = !0, r.sheetStubs = !0), r.type == "array") {
    r.type = "binary";
    var n = Gc(e, r);
    return r.type = "array", Va(n);
  }
  var a = 0;
  if (r.sheet && (typeof r.sheet == "number" ? a = r.sheet : a = e.SheetNames.indexOf(r.sheet), !e.SheetNames[a]))
    throw new Error("Sheet not found: " + r.sheet + " : " + typeof r.sheet);
  switch (r.bookType || "xlsb") {
    case "xml":
    case "xlml":
      return Ut(ng(e, r), r);
    case "slk":
    case "sylk":
      return Ut(Fx.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "htm":
    case "html":
      return Ut(Bc(e.Sheets[e.SheetNames[a]], r), r);
    case "txt":
      return Vg(Vc(e.Sheets[e.SheetNames[a]], r), r);
    case "csv":
      return Ut(ks(e.Sheets[e.SheetNames[a]], r), r, "\uFEFF");
    case "dif":
      return Ut(kx.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "dbf":
      return ga(Cx.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "prn":
      return Ut(Ax.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "rtf":
      return Ut(Px.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "eth":
      return Ut(hc.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "fods":
      return Ut($c(e, r), r);
    case "wk1":
      return ga(to.sheet_to_wk1(e.Sheets[e.SheetNames[a]], r), r);
    case "wk3":
      return ga(to.book_to_wk3(e, r), r);
    case "biff2":
      r.biff || (r.biff = 2);
    /* falls through */
    case "biff3":
      r.biff || (r.biff = 3);
    /* falls through */
    case "biff4":
      return r.biff || (r.biff = 4), ga(bc(e, r), r);
    case "biff5":
      r.biff || (r.biff = 5);
    /* falls through */
    case "biff8":
    case "xla":
    case "xls":
      return r.biff || (r.biff = 8), Gg(e, r);
    case "xlsx":
    case "xlsm":
    case "xlam":
    case "xlsb":
    case "numbers":
    case "ods":
      return $g(e, r);
    default:
      throw new Error("Unrecognized bookType |" + r.bookType + "|");
  }
}
function zg(e) {
  if (!e.bookType) {
    var t = {
      xls: "biff8",
      htm: "html",
      slk: "sylk",
      socialcalc: "eth",
      Sh33tJS: "WTF"
    }, r = e.file.slice(e.file.lastIndexOf(".")).toLowerCase();
    r.match(/^\.[a-z]+$/) && (e.bookType = r.slice(1)), e.bookType = t[e.bookType] || e.bookType;
  }
}
function jg(e, t, r) {
  var n = {};
  return n.type = "file", n.file = t, zg(n), Gc(e, n);
}
function Xg(e, t, r, n, a, i, s, o) {
  var c = Ze(r), l = o.defval, f = o.raw || !Object.prototype.hasOwnProperty.call(o, "raw"), d = !0, u = a === 1 ? [] : {};
  if (a !== 1)
    if (Object.defineProperty) try {
      Object.defineProperty(u, "__rowNum__", { value: r, enumerable: !1 });
    } catch {
      u.__rowNum__ = r;
    }
    else u.__rowNum__ = r;
  if (!s || e[r]) for (var h = t.s.c; h <= t.e.c; ++h) {
    var m = s ? e[r][h] : e[n[h] + c];
    if (m === void 0 || m.t === void 0) {
      if (l === void 0) continue;
      i[h] != null && (u[i[h]] = l);
      continue;
    }
    var x = m.v;
    switch (m.t) {
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
        throw new Error("unrecognized type " + m.t);
    }
    if (i[h] != null) {
      if (x == null)
        if (m.t == "e" && x === null) u[i[h]] = null;
        else if (l !== void 0) u[i[h]] = l;
        else if (f && x === null) u[i[h]] = null;
        else continue;
      else
        u[i[h]] = f && (m.t !== "n" || m.t === "n" && o.rawNumbers !== !1) ? x : Qt(m, x, o);
      x != null && (d = !1);
    }
  }
  return { row: u, isempty: d };
}
function $a(e, t) {
  if (e == null || e["!ref"] == null) return [];
  var r = { t: "n", v: 0 }, n = 0, a = 1, i = [], s = 0, o = "", c = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, l = t || {}, f = l.range != null ? l.range : e["!ref"];
  switch (l.header === 1 ? n = 1 : l.header === "A" ? n = 2 : Array.isArray(l.header) ? n = 3 : l.header == null && (n = 0), typeof f) {
    case "string":
      c = Ne(f);
      break;
    case "number":
      c = Ne(e["!ref"]), c.s.r = f;
      break;
    default:
      c = f;
  }
  n > 0 && (a = 0);
  var d = Ze(c.s.r), u = [], h = [], m = 0, x = 0, _ = Array.isArray(e), F = c.s.r, A = 0, y = {};
  _ && !e[F] && (e[F] = []);
  var O = l.skipHidden && e["!cols"] || [], j = l.skipHidden && e["!rows"] || [];
  for (A = c.s.c; A <= c.e.c; ++A)
    if (!(O[A] || {}).hidden)
      switch (u[A] = rt(A), r = _ ? e[F][A] : e[u[A] + d], n) {
        case 1:
          i[A] = A - c.s.c;
          break;
        case 2:
          i[A] = u[A];
          break;
        case 3:
          i[A] = l.header[A - c.s.c];
          break;
        default:
          if (r == null && (r = { w: "__EMPTY", t: "s" }), o = s = Qt(r, null, l), x = y[s] || 0, !x) y[s] = 1;
          else {
            do
              o = s + "_" + x++;
            while (y[o]);
            y[s] = x, y[o] = 1;
          }
          i[A] = o;
      }
  for (F = c.s.r + a; F <= c.e.r; ++F)
    if (!(j[F] || {}).hidden) {
      var Z = Xg(e, c, F, u, n, i, _, l);
      (Z.isempty === !1 || (n === 1 ? l.blankrows !== !1 : l.blankrows)) && (h[m++] = Z.row);
    }
  return h.length = m, h;
}
var co = /"/g;
function Yg(e, t, r, n, a, i, s, o) {
  for (var c = !0, l = [], f = "", d = Ze(r), u = t.s.c; u <= t.e.c; ++u)
    if (n[u]) {
      var h = o.dense ? (e[r] || [])[u] : e[n[u] + d];
      if (h == null) f = "";
      else if (h.v != null) {
        c = !1, f = "" + (o.rawNumbers && h.t == "n" ? h.v : Qt(h, null, o));
        for (var m = 0, x = 0; m !== f.length; ++m) if ((x = f.charCodeAt(m)) === a || x === i || x === 34 || o.forceQuotes) {
          f = '"' + f.replace(co, '""') + '"';
          break;
        }
        f == "ID" && (f = '"ID"');
      } else h.f != null && !h.F ? (c = !1, f = "=" + h.f, f.indexOf(",") >= 0 && (f = '"' + f.replace(co, '""') + '"')) : f = "";
      l.push(f);
    }
  return o.blankrows === !1 && c ? null : l.join(s);
}
function ks(e, t) {
  var r = [], n = t ?? {};
  if (e == null || e["!ref"] == null) return "";
  var a = Ne(e["!ref"]), i = n.FS !== void 0 ? n.FS : ",", s = i.charCodeAt(0), o = n.RS !== void 0 ? n.RS : `
`, c = o.charCodeAt(0), l = new RegExp((i == "|" ? "\\|" : i) + "+$"), f = "", d = [];
  n.dense = Array.isArray(e);
  for (var u = n.skipHidden && e["!cols"] || [], h = n.skipHidden && e["!rows"] || [], m = a.s.c; m <= a.e.c; ++m) (u[m] || {}).hidden || (d[m] = rt(m));
  for (var x = 0, _ = a.s.r; _ <= a.e.r; ++_)
    (h[_] || {}).hidden || (f = Yg(e, a, _, d, s, c, i, n), f != null && (n.strip && (f = f.replace(l, "")), (f || n.blankrows !== !1) && r.push((x++ ? o : "") + f)));
  return delete n.dense, r.join("");
}
function Vc(e, t) {
  t || (t = {}), t.FS = "	", t.RS = `
`;
  var r = ks(e, t);
  return r;
}
function Kg(e) {
  var t = "", r, n = "";
  if (e == null || e["!ref"] == null) return [];
  var a = Ne(e["!ref"]), i = "", s = [], o, c = [], l = Array.isArray(e);
  for (o = a.s.c; o <= a.e.c; ++o) s[o] = rt(o);
  for (var f = a.s.r; f <= a.e.r; ++f)
    for (i = Ze(f), o = a.s.c; o <= a.e.c; ++o)
      if (t = s[o] + i, r = l ? (e[f] || [])[o] : e[t], n = "", r !== void 0) {
        if (r.F != null) {
          if (t = r.F, !r.f) continue;
          n = r.f, t.indexOf(":") == -1 && (t = t + ":" + t);
        }
        if (r.f != null) n = r.f;
        else {
          if (r.t == "z") continue;
          if (r.t == "n" && r.v != null) n = "" + r.v;
          else if (r.t == "b") n = r.v ? "TRUE" : "FALSE";
          else if (r.w !== void 0) n = "'" + r.w;
          else {
            if (r.v === void 0) continue;
            r.t == "s" ? n = "'" + r.v : n = "" + r.v;
          }
        }
        c[c.length] = t + "=" + n;
      }
  return c;
}
function zc(e, t, r) {
  var n = r || {}, a = +!n.skipHeader, i = e || {}, s = 0, o = 0;
  if (i && n.origin != null)
    if (typeof n.origin == "number") s = n.origin;
    else {
      var c = typeof n.origin == "string" ? je(n.origin) : n.origin;
      s = c.r, o = c.c;
    }
  var l, f = { s: { c: 0, r: 0 }, e: { c: o, r: s + t.length - 1 + a } };
  if (i["!ref"]) {
    var d = Ne(i["!ref"]);
    f.e.c = Math.max(f.e.c, d.e.c), f.e.r = Math.max(f.e.r, d.e.r), s == -1 && (s = d.e.r + 1, f.e.r = s + t.length - 1 + a);
  } else
    s == -1 && (s = 0, f.e.r = t.length - 1 + a);
  var u = n.header || [], h = 0;
  t.forEach(function(x, _) {
    et(x).forEach(function(F) {
      (h = u.indexOf(F)) == -1 && (u[h = u.length] = F);
      var A = x[F], y = "z", O = "", j = Fe({ c: o + h, r: s + _ + a });
      l = Kn(i, j), A && typeof A == "object" && !(A instanceof Date) ? i[j] = A : (typeof A == "number" ? y = "n" : typeof A == "boolean" ? y = "b" : typeof A == "string" ? y = "s" : A instanceof Date ? (y = "d", n.cellDates || (y = "n", A = dt(A)), O = n.dateNF || be[14]) : A === null && n.nullError && (y = "e", A = 0), l ? (l.t = y, l.v = A, delete l.w, delete l.R, O && (l.z = O)) : i[j] = l = { t: y, v: A }, O && (l.z = O));
    });
  }), f.e.c = Math.max(f.e.c, o + u.length - 1);
  var m = Ze(s);
  if (a) for (h = 0; h < u.length; ++h) i[rt(h + o) + m] = { t: "s", v: u[h] };
  return i["!ref"] = $e(f), i;
}
function Jg(e, t) {
  return zc(null, e, t);
}
function Kn(e, t, r) {
  if (typeof t == "string") {
    if (Array.isArray(e)) {
      var n = je(t);
      return e[n.r] || (e[n.r] = []), e[n.r][n.c] || (e[n.r][n.c] = { t: "z" });
    }
    return e[t] || (e[t] = { t: "z" });
  }
  return typeof t != "number" ? Kn(e, Fe(t)) : Kn(e, Fe({ r: t, c: r || 0 }));
}
function Qg(e, t) {
  if (typeof t == "number") {
    if (t >= 0 && e.SheetNames.length > t) return t;
    throw new Error("Cannot find sheet # " + t);
  } else if (typeof t == "string") {
    var r = e.SheetNames.indexOf(t);
    if (r > -1) return r;
    throw new Error("Cannot find sheet name |" + t + "|");
  } else throw new Error("Cannot find sheet |" + t + "|");
}
function qg() {
  return { SheetNames: [], Sheets: {} };
}
function Zg(e, t, r, n) {
  var a = 1;
  if (!r) for (; a <= 65535 && e.SheetNames.indexOf(r = "Sheet" + a) != -1; ++a, r = void 0) ;
  if (!r || e.SheetNames.length >= 65535) throw new Error("Too many worksheets");
  if (n && e.SheetNames.indexOf(r) >= 0) {
    var i = r.match(/(^.*?)(\d+)$/);
    a = i && +i[2] || 0;
    var s = i && i[1] || r;
    for (++a; a <= 65535 && e.SheetNames.indexOf(r = s + a) != -1; ++a) ;
  }
  if (Mc(r), e.SheetNames.indexOf(r) >= 0) throw new Error("Worksheet with name |" + r + "| already exists!");
  return e.SheetNames.push(r), e.Sheets[r] = t, r;
}
function e2(e, t, r) {
  e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
  var n = Qg(e, t);
  switch (e.Workbook.Sheets[n] || (e.Workbook.Sheets[n] = {}), r) {
    case 0:
    case 1:
    case 2:
      break;
    default:
      throw new Error("Bad sheet visibility setting " + r);
  }
  e.Workbook.Sheets[n].Hidden = r;
}
function t2(e, t) {
  return e.z = t, e;
}
function jc(e, t, r) {
  return t ? (e.l = { Target: t }, r && (e.l.Tooltip = r)) : delete e.l, e;
}
function r2(e, t, r) {
  return jc(e, "#" + t, r);
}
function n2(e, t, r) {
  e.c || (e.c = []), e.c.push({ t, a: r || "SheetJS" });
}
function a2(e, t, r, n) {
  for (var a = typeof t != "string" ? t : Ne(t), i = typeof t == "string" ? t : $e(t), s = a.s.r; s <= a.e.r; ++s) for (var o = a.s.c; o <= a.e.c; ++o) {
    var c = Kn(e, s, o);
    c.t = "n", c.F = i, delete c.v, s == a.s.r && o == a.s.c && (c.f = r, n && (c.D = !0));
  }
  return e;
}
var Ei = {
  encode_col: rt,
  encode_row: Ze,
  encode_cell: Fe,
  encode_range: $e,
  decode_col: ms,
  decode_row: ps,
  split_cell: vd,
  decode_cell: je,
  decode_range: Et,
  format_cell: Qt,
  sheet_add_aoa: jl,
  sheet_add_json: zc,
  sheet_add_dom: Uc,
  aoa_to_sheet: xn,
  json_to_sheet: Jg,
  table_to_sheet: Wc,
  table_to_book: kg,
  sheet_to_csv: ks,
  sheet_to_txt: Vc,
  sheet_to_json: $a,
  sheet_to_html: Bc,
  sheet_to_formulae: Kg,
  sheet_to_row_object_array: $a,
  sheet_get_cell: Kn,
  book_new: qg,
  book_append_sheet: Zg,
  book_set_sheet_visibility: e2,
  cell_set_number_format: t2,
  cell_set_hyperlink: jc,
  cell_set_internal_link: r2,
  cell_add_comment: n2,
  sheet_set_array_formula: a2,
  consts: {
    SHEET_VISIBLE: 0,
    SHEET_HIDDEN: 1,
    SHEET_VERY_HIDDEN: 2
  }
};
function i2(e, t) {
  const r = e.map((o) => ({
    "Part Name": o.name,
    IPN: o.IPN || "",
    Category: o.category_path || o.category_name || "Uncategorized",
    Description: o.description || "",
    Status: ll(o).label,
    "Current Stock": o.total_stock,
    "Minimum Stock": o.minimum_stock || ""
  })), n = Ei.book_new(), a = Ei.json_to_sheet(r);
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
  ], Ei.book_append_sheet(n, a, "Critical Components");
  const s = `critical-components-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.xlsx`;
  jg(n, s);
}
const Re = window.React, Ti = window.MantineCore.Box, st = window.MantineCore.Table, er = window.MantineCore.Text;
function s2({ entries: e, loading: t }) {
  return t ? /* @__PURE__ */ Re.createElement(Ti, { px: "lg", py: "sm", bg: "gray.1" }, /* @__PURE__ */ Re.createElement(er, { size: "sm", c: "dimmed", fs: "italic" }, "Loading tracking history...")) : !e || e.length === 0 ? /* @__PURE__ */ Re.createElement(Ti, { px: "lg", py: "sm", bg: "gray.1" }, /* @__PURE__ */ Re.createElement(er, { size: "sm", c: "dimmed", fs: "italic" }, "No tracking history available")) : /* @__PURE__ */ Re.createElement(
    Ti,
    {
      px: "lg",
      py: "sm",
      bg: "gray.1",
      style: { borderLeft: "3px solid var(--mantine-color-blue-4)" }
    },
    /* @__PURE__ */ Re.createElement(er, { size: "xs", fw: 600, c: "dimmed", mb: "xs" }, "Stock Tracking History"),
    /* @__PURE__ */ Re.createElement(st, { striped: !0, highlightOnHover: !0, withTableBorder: !1 }, /* @__PURE__ */ Re.createElement(st.Thead, null, /* @__PURE__ */ Re.createElement(st.Tr, null, /* @__PURE__ */ Re.createElement(st.Th, null, "Date"), /* @__PURE__ */ Re.createElement(st.Th, null, "Action"), /* @__PURE__ */ Re.createElement(st.Th, null, "Details"), /* @__PURE__ */ Re.createElement(st.Th, null, "User"), /* @__PURE__ */ Re.createElement(st.Th, null, "Notes"))), /* @__PURE__ */ Re.createElement(st.Tbody, null, e.map((r) => /* @__PURE__ */ Re.createElement(st.Tr, { key: r.id }, /* @__PURE__ */ Re.createElement(st.Td, null, /* @__PURE__ */ Re.createElement(er, { size: "xs", c: "dimmed" }, cl(r.date))), /* @__PURE__ */ Re.createElement(st.Td, null, /* @__PURE__ */ Re.createElement(er, { size: "xs", fw: 500 }, r.label || "-")), /* @__PURE__ */ Re.createElement(st.Td, null, /* @__PURE__ */ Re.createElement(er, { size: "xs", c: "dimmed" }, r.details || "-")), /* @__PURE__ */ Re.createElement(st.Td, null, /* @__PURE__ */ Re.createElement(er, { size: "xs", c: "dimmed" }, r.user || "-")), /* @__PURE__ */ Re.createElement(st.Td, null, /* @__PURE__ */ Re.createElement(er, { size: "xs", c: "dimmed", lineClamp: 1 }, r.notes || "-"))))))
  );
}
const ue = window.React, fo = window.React.useMemo, Si = window.React.useState, o2 = window.React.useCallback, l2 = window.MantineCore.ActionIcon, yi = window.MantineCore.Anchor, c2 = window.MantineCore.Badge, uo = window.MantineCore.Box, Ie = window.MantineCore.Table, Xr = window.MantineCore.Text;
function f2({ stockItems: e, context: t }) {
  const [r, n] = Si(/* @__PURE__ */ new Set()), [a, i] = Si({}), [s, o] = Si(/* @__PURE__ */ new Set()), { hasSerial: c, hasNotes: l } = fo(() => {
    let u = !1, h = !1;
    for (const m of e)
      if (m.serial && m.serial.trim() !== "" && (u = !0), m.notes && m.notes.trim() !== "" && (h = !0), u && h) break;
    return { hasSerial: u, hasNotes: h };
  }, [e]), f = fo(() => {
    let u = 7;
    return l && (u += 1), u;
  }, [l]), d = o2(async (u) => {
    if (r.has(u))
      n((h) => {
        const m = new Set(h);
        return m.delete(u), m;
      });
    else if (n((h) => new Set(h).add(u)), !a[u]) {
      o((h) => new Set(h).add(u));
      try {
        const h = await t.api.get(`/plugin/criticalcomponents/stock-tracking/${u}/`);
        i((m) => ({ ...m, [u]: h.data.entries || [] }));
      } catch (h) {
        console.error("Failed to fetch stock tracking:", h), i((m) => ({ ...m, [u]: [] }));
      } finally {
        o((h) => {
          const m = new Set(h);
          return m.delete(u), m;
        });
      }
    }
  }, [r, a, t.api]);
  return !e || e.length === 0 ? /* @__PURE__ */ ue.createElement(uo, { px: "md", py: "sm", bg: "gray.0" }, /* @__PURE__ */ ue.createElement(Xr, { size: "sm", c: "dimmed", fs: "italic" }, "No stock items available")) : /* @__PURE__ */ ue.createElement(
    uo,
    {
      px: "md",
      py: "sm",
      bg: "gray.0",
      style: { borderTop: "1px solid var(--mantine-color-gray-3)" }
    },
    /* @__PURE__ */ ue.createElement(Ie, { striped: !0, highlightOnHover: !0, withTableBorder: !1 }, /* @__PURE__ */ ue.createElement(Ie.Thead, null, /* @__PURE__ */ ue.createElement(Ie.Tr, null, /* @__PURE__ */ ue.createElement(Ie.Th, { style: { width: 40 } }), c && /* @__PURE__ */ ue.createElement(Ie.Th, null, "Serial"), !c && /* @__PURE__ */ ue.createElement(Ie.Th, null, "Stock Item"), /* @__PURE__ */ ue.createElement(Ie.Th, null, "Location"), /* @__PURE__ */ ue.createElement(Ie.Th, { style: { textAlign: "right" } }, "Quantity"), /* @__PURE__ */ ue.createElement(Ie.Th, null, "Last Stock Count Date"), /* @__PURE__ */ ue.createElement(Ie.Th, null, "Days Since Last Stock Count"), /* @__PURE__ */ ue.createElement(Ie.Th, null, "Status"), l && /* @__PURE__ */ ue.createElement(Ie.Th, null, "Notes"))), /* @__PURE__ */ ue.createElement(Ie.Tbody, null, e.map((u) => /* @__PURE__ */ ue.createElement(ue.Fragment, { key: u.id }, /* @__PURE__ */ ue.createElement(Ie.Tr, null, /* @__PURE__ */ ue.createElement(Ie.Td, { style: { width: 40 } }, /* @__PURE__ */ ue.createElement(
      l2,
      {
        variant: "subtle",
        size: "sm",
        onClick: () => d(u.id),
        "aria-label": r.has(u.id) ? "Collapse" : "Expand"
      },
      r.has(u.id) ? /* @__PURE__ */ ue.createElement(qi, { size: 16 }) : /* @__PURE__ */ ue.createElement(Zi, { size: 16 })
    )), c && /* @__PURE__ */ ue.createElement(Ie.Td, null, /* @__PURE__ */ ue.createElement(
      yi,
      {
        size: "sm",
        fw: 500,
        onClick: () => {
          t.navigate(u.url);
        },
        style: { cursor: "pointer" }
      },
      u.serial || "-"
    )), !c && /* @__PURE__ */ ue.createElement(Ie.Td, null, /* @__PURE__ */ ue.createElement(
      yi,
      {
        size: "sm",
        fw: 500,
        onClick: () => {
          t.navigate(u.url);
        },
        style: { cursor: "pointer" }
      },
      "#",
      u.id
    )), /* @__PURE__ */ ue.createElement(Ie.Td, null, /* @__PURE__ */ ue.createElement(
      yi,
      {
        size: "sm",
        onClick: () => {
          u.location_id && t.navigate(`/stock/location/${u.location_id}/`);
        },
        style: { cursor: u.location_id ? "pointer" : "default" }
      },
      u.location_path || u.location
    )), /* @__PURE__ */ ue.createElement(Ie.Td, { style: { textAlign: "right" } }, /* @__PURE__ */ ue.createElement(Xr, { size: "sm", fw: 500 }, u.quantity)), /* @__PURE__ */ ue.createElement(Ie.Td, null, /* @__PURE__ */ ue.createElement(Xr, { size: "sm", c: "dimmed" }, cl(u.stocktake_date))), /* @__PURE__ */ ue.createElement(Ie.Td, null, u.days_since_check !== null ? /* @__PURE__ */ ue.createElement(
      c2,
      {
        color: u.check_days_configured ? u.needs_check ? "orange" : "green" : "gray",
        variant: "light",
        size: "sm",
        leftSection: u.needs_check ? /* @__PURE__ */ ue.createElement($i, { size: 10 }) : null
      },
      u.days_since_check,
      " days",
      u.check_days_configured ? u.needs_check ? " - Needs Check" : "" : " - Not Configured"
    ) : /* @__PURE__ */ ue.createElement(Xr, { size: "sm", c: "dimmed" }, "-")), /* @__PURE__ */ ue.createElement(Ie.Td, null, /* @__PURE__ */ ue.createElement(Xr, { size: "sm", c: "dimmed" }, u.status)), l && /* @__PURE__ */ ue.createElement(Ie.Td, null, /* @__PURE__ */ ue.createElement(Xr, { size: "sm", c: "dimmed", lineClamp: 2 }, u.notes || "-"))), r.has(u.id) && /* @__PURE__ */ ue.createElement(Ie.Tr, null, /* @__PURE__ */ ue.createElement(Ie.Td, { colSpan: f, style: { padding: 0 } }, /* @__PURE__ */ ue.createElement(
      s2,
      {
        entries: a[u.id] || [],
        loading: s.has(u.id)
      }
    )))))))
  );
}
const ce = window.React, wa = window.React.useCallback, An = window.React.useState, ho = window.MantineCore.ActionIcon, u2 = window.MantineCore.Anchor, h2 = window.MantineCore.Avatar, Ci = window.MantineCore.Badge, Rn = window.MantineCore.Box, xo = window.MantineCore.Button, d2 = window.MantineCore.Collapse, On = window.MantineCore.Group, x2 = window.MantineCore.NumberInput, Fi = window.MantineCore.Popover, p2 = window.MantineCore.Progress, m2 = window.MantineCore.Stack, _2 = window.MantineCore.Switch, tr = window.MantineCore.Text, In = window.MantineCore.Tooltip, po = window.MantineNotifications.notifications;
function Xc({
  part: e,
  context: t,
  showLocationQty: r = !1,
  showCategory: n = !1,
  isExpandable: a = !0,
  indent: i = 0
}) {
  const [s, o] = An(!1), c = ll(e), l = h1(e, r), f = e.stock_items && e.stock_items.length > 0, d = a && f, u = wa(() => {
    t.navigate(`/part/${e.id}/`);
  }, [t, e.id]), h = wa(() => {
    d && o((D) => !D);
  }, [d]), [m, x] = An(!1), [_, F] = An(e.lead_time ?? ""), [A, y] = An(e.lead_time_manual ?? !1), [O, j] = An(!1), Z = wa(() => {
    F(e.lead_time ?? ""), y(e.lead_time_manual ?? !1), x(!0);
  }, [e.lead_time, e.lead_time_manual]), R = wa(async () => {
    j(!0);
    try {
      const D = _ === "" || _ === null ? null : Number(_);
      await t.api.post(
        "/plugin/criticalcomponents/set-lead-time/",
        {
          part_id: e.id,
          lead_time: D,
          manual: A
        }
      ), po.show({
        title: "Lead time updated",
        message: `${e.name}: ${D != null ? `${D}d` : "cleared"}${A ? " (manual)" : ""}`,
        color: "green"
      }), x(!1), await t.queryClient.invalidateQueries({
        queryKey: ["critical-components"]
      });
    } catch (D) {
      po.show({
        title: "Failed to update lead time",
        message: D instanceof Error ? D.message : "Unknown error",
        color: "red"
      });
    } finally {
      j(!1);
    }
  }, [t, e.id, e.name, _, A]), W = n ? "30px minmax(150px, 1.5fr) 100px minmax(120px, 1fr) minmax(100px, 1fr) 100px 110px 120px minmax(140px, 1fr)" : "30px minmax(180px, 2fr) 100px minmax(100px, 1fr) 100px 110px 120px minmax(140px, 1fr)", H = !e.stock_items || e.stock_items.length === 0 ? { label: "No Stock", color: "gray" } : e.stock_items.some((V) => !V.check_days_configured) && !e.has_needs_check && e.stock_items.every((q) => !q.check_days_configured) ? { label: "Not Configured", color: "gray" } : e.has_needs_check ? { label: "Needs Check", color: "orange" } : { label: "Inv Up to Date", color: "green" };
  return /* @__PURE__ */ ce.createElement(ce.Fragment, null, /* @__PURE__ */ ce.createElement(
    Rn,
    {
      px: "md",
      py: "xs",
      style: {
        display: "grid",
        gridTemplateColumns: W,
        gap: "12px",
        alignItems: "center",
        borderBottom: "1px solid var(--mantine-color-gray-2)",
        paddingLeft: `calc(var(--mantine-spacing-md) + ${i * 16}px)`,
        backgroundColor: s ? "var(--mantine-color-gray-0)" : void 0
      },
      className: "part-row"
    },
    /* @__PURE__ */ ce.createElement(Rn, { style: { display: "flex", justifyContent: "center" } }, d ? /* @__PURE__ */ ce.createElement(ho, { variant: "subtle", size: "sm", onClick: h }, s ? /* @__PURE__ */ ce.createElement(qi, { size: 16 }) : /* @__PURE__ */ ce.createElement(Zi, { size: 16 })) : /* @__PURE__ */ ce.createElement(Rn, { style: { width: 22 } })),
    /* @__PURE__ */ ce.createElement(On, { gap: "sm", wrap: "nowrap" }, /* @__PURE__ */ ce.createElement(
      h2,
      {
        src: e.thumbnail || e.image,
        size: "sm",
        radius: "sm",
        color: "gray"
      },
      e.name.charAt(0)
    ), /* @__PURE__ */ ce.createElement(Rn, { style: { minWidth: 0, flex: 1 } }, /* @__PURE__ */ ce.createElement(On, { gap: "xs", wrap: "nowrap" }, /* @__PURE__ */ ce.createElement(
      u2,
      {
        size: "sm",
        fw: 500,
        onClick: u,
        style: { cursor: "pointer" },
        truncate: !0
      },
      e.name
    ), e.trackable && /* @__PURE__ */ ce.createElement(Ci, { size: "xs", variant: "light", color: "blue" }, "Trackable")))),
    /* @__PURE__ */ ce.createElement(In, { label: e.IPN, disabled: !e.IPN }, /* @__PURE__ */ ce.createElement(tr, { size: "sm", c: e.IPN ? "dark" : "dimmed", truncate: !0, fw: e.IPN ? 500 : 400 }, e.IPN || "-")),
    n && /* @__PURE__ */ ce.createElement(tr, { size: "sm", c: "dimmed", lineClamp: 1, title: e.category_path }, e.category_name || "Uncategorized"),
    /* @__PURE__ */ ce.createElement(In, { label: e.description, disabled: !e.description }, /* @__PURE__ */ ce.createElement(tr, { size: "sm", c: "dimmed", lineClamp: 1 }, e.description || "-")),
    /* @__PURE__ */ ce.createElement(
      Ci,
      {
        color: c.color,
        size: "sm",
        variant: "light",
        leftSection: c.label === "Low Stock" || c.label === "Out of Stock" ? /* @__PURE__ */ ce.createElement(Fa, { size: 10 }) : null
      },
      c.label
    ),
    /* @__PURE__ */ ce.createElement(
      Ci,
      {
        color: H.color,
        size: "sm",
        variant: "light"
      },
      H.label
    ),
    /* @__PURE__ */ ce.createElement(On, { gap: 4, wrap: "nowrap" }, /* @__PURE__ */ ce.createElement(tr, { size: "sm" }, e.lead_time != null ? `${e.lead_time}d` : "-"), e.lead_time_manual && /* @__PURE__ */ ce.createElement(In, { label: "Manual override (protected from recalculation)" }, /* @__PURE__ */ ce.createElement(du, { size: 12, color: "var(--mantine-color-blue-6)" })), /* @__PURE__ */ ce.createElement(
      Fi,
      {
        opened: m,
        onChange: x,
        position: "bottom",
        withArrow: !0,
        shadow: "md",
        trapFocus: !0
      },
      /* @__PURE__ */ ce.createElement(Fi.Target, null, /* @__PURE__ */ ce.createElement(In, { label: "Edit lead time" }, /* @__PURE__ */ ce.createElement(
        ho,
        {
          variant: "subtle",
          size: "xs",
          color: "gray",
          onClick: Z
        },
        /* @__PURE__ */ ce.createElement(mu, { size: 14 })
      ))),
      /* @__PURE__ */ ce.createElement(Fi.Dropdown, null, /* @__PURE__ */ ce.createElement(m2, { gap: "xs", style: { minWidth: 220 } }, /* @__PURE__ */ ce.createElement(tr, { size: "sm", fw: 600 }, "Lead time — ", e.name), /* @__PURE__ */ ce.createElement(
        x2,
        {
          label: "Lead time (days)",
          value: _,
          min: 0,
          allowDecimal: !1,
          placeholder: "—",
          onChange: (D) => {
            F(D), y(!0);
          }
        }
      ), /* @__PURE__ */ ce.createElement(
        _2,
        {
          label: "Manual override (protect from recalc)",
          checked: A,
          onChange: (D) => y(D.currentTarget.checked)
        }
      ), /* @__PURE__ */ ce.createElement(On, { justify: "flex-end", gap: "xs" }, /* @__PURE__ */ ce.createElement(
        xo,
        {
          variant: "default",
          size: "xs",
          onClick: () => x(!1),
          disabled: O
        },
        "Cancel"
      ), /* @__PURE__ */ ce.createElement(xo, { size: "xs", onClick: R, loading: O }, "Save"))))
    )),
    /* @__PURE__ */ ce.createElement(
      In,
      {
        label: l.showMin ? `${l.stock} in stock / ${l.min} minimum required` : `${l.stock} in stock`,
        position: "left"
      },
      /* @__PURE__ */ ce.createElement(On, { gap: "sm", wrap: "nowrap", justify: "flex-end" }, /* @__PURE__ */ ce.createElement(
        p2,
        {
          value: c.progressValue,
          color: c.progressColor,
          size: "sm",
          style: { width: 60 }
        }
      ), /* @__PURE__ */ ce.createElement(Rn, { style: { minWidth: 80, textAlign: "right" } }, /* @__PURE__ */ ce.createElement(tr, { size: "sm", fw: 500, component: "span" }, l.stock), l.showMin && /* @__PURE__ */ ce.createElement(tr, { size: "xs", c: "dimmed", component: "span" }, " ", "/ ", l.min, " ", /* @__PURE__ */ ce.createElement(tr, { component: "span", size: "xs", c: "dimmed", fs: "italic" }, "min"))))
    )
  ), d && /* @__PURE__ */ ce.createElement(d2, { expanded: s }, /* @__PURE__ */ ce.createElement(f2, { stockItems: e.stock_items || [], context: t })));
}
const yt = window.React, mo = window.MantineCore.Box, rr = window.MantineCore.Text, _o = window.MantineCore.Tooltip;
function Yc({
  showLocationQty: e = !1,
  showCategory: t = !1
}) {
  const r = t ? "30px minmax(150px, 1.5fr) 100px minmax(120px, 1fr) minmax(100px, 1fr) 100px 110px 120px minmax(140px, 1fr)" : "30px minmax(180px, 2fr) 100px minmax(100px, 1fr) 100px 110px 120px minmax(140px, 1fr)";
  return /* @__PURE__ */ yt.createElement(
    mo,
    {
      px: "md",
      py: "xs",
      style: {
        display: "grid",
        gridTemplateColumns: r,
        gap: "12px",
        backgroundColor: "var(--mantine-color-gray-2)",
        borderBottom: "1px solid var(--mantine-color-gray-3)"
      }
    },
    /* @__PURE__ */ yt.createElement(mo, null),
    /* @__PURE__ */ yt.createElement(rr, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "Part Name"),
    /* @__PURE__ */ yt.createElement(rr, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "IPN"),
    t && /* @__PURE__ */ yt.createElement(rr, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "Category"),
    /* @__PURE__ */ yt.createElement(rr, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "Description"),
    /* @__PURE__ */ yt.createElement(rr, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "Qty Status"),
    /* @__PURE__ */ yt.createElement(rr, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "Inv Status"),
    /* @__PURE__ */ yt.createElement(
      _o,
      {
        label: "Lead time in days (most recent received purchase order)",
        position: "left"
      },
      /* @__PURE__ */ yt.createElement(rr, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "Lead Time")
    ),
    /* @__PURE__ */ yt.createElement(
      _o,
      {
        label: "Current stock quantity / Minimum stock level",
        position: "left"
      },
      /* @__PURE__ */ yt.createElement(rr, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase", ta: "right" }, e ? "Qty at Location" : "Stock / Min")
    )
  );
}
const nr = window.React, v2 = window.React.useMemo, vo = window.MantineCore.Box, go = window.MantineCore.Paper, wo = window.MantineCore.Text;
function g2({
  parts: e,
  context: t,
  searchTerm: r,
  showLowStockOnly: n = !1,
  showNeedsCheckOnly: a = !1
}) {
  const i = v2(() => {
    let s = fl(e, r);
    return n && (s = ul(s)), a && (s = hl(s)), s;
  }, [e, r, n, a]);
  return i.length === 0 ? /* @__PURE__ */ nr.createElement(go, { withBorder: !0, p: "xl" }, /* @__PURE__ */ nr.createElement(wo, { c: "dimmed", ta: "center" }, r ? `No parts found matching "${r}"` : n ? "No low stock parts found" : a ? "No parts needing stock check found" : "No critical parts available")) : /* @__PURE__ */ nr.createElement(vo, null, /* @__PURE__ */ nr.createElement(go, { withBorder: !0, style: { overflow: "hidden" } }, /* @__PURE__ */ nr.createElement(Yc, { showCategory: !0 }), /* @__PURE__ */ nr.createElement(vo, { style: { maxHeight: "60vh", overflowY: "auto" } }, i.map((s) => /* @__PURE__ */ nr.createElement(
    Xc,
    {
      key: `part-${s.id}`,
      part: s,
      context: t,
      showCategory: !0,
      isExpandable: !0
    }
  )))), r && /* @__PURE__ */ nr.createElement(wo, { size: "sm", c: "dimmed", mt: "sm" }, "Showing ", i.length, " of ", e.length, " parts"));
}
const yr = window.React, w2 = window.React.useMemo, E2 = window.MantineCore.Badge, T2 = window.MantineCore.Group, S2 = window.MantineCore.Text, y2 = window.MantineCore.UnstyledButton;
function C2({
  group: e,
  isExpanded: t,
  onToggle: r,
  level: n = 0,
  isLocationView: a = !1
}) {
  const i = w2(() => ss(e), [e]);
  if (i === 0) return null;
  const s = a ? Wo : Uo;
  return /* @__PURE__ */ yr.createElement(
    y2,
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
    /* @__PURE__ */ yr.createElement(T2, { gap: "xs", wrap: "nowrap", style: { paddingLeft: n * 16 } }, t ? /* @__PURE__ */ yr.createElement(qi, { size: 16, color: "gray" }) : /* @__PURE__ */ yr.createElement(Zi, { size: 16, color: "gray" }), /* @__PURE__ */ yr.createElement(s, { size: 16, color: "gray" }), /* @__PURE__ */ yr.createElement(S2, { size: "sm", fw: 600, style: { flex: 1 } }, e.name), /* @__PURE__ */ yr.createElement(E2, { color: "gray", size: "sm", variant: "light" }, i))
  );
}
const Yr = window.React, Eo = window.MantineCore.Box, F2 = window.MantineCore.Collapse;
function Kc({
  group: e,
  context: t,
  expandedGroups: r,
  toggleGroup: n,
  level: a = 0,
  prefix: i,
  isLocationView: s = !1
}) {
  const o = `${i}-${e.id ?? "none"}-${a}`, c = r.has(o);
  if (ss(e) === 0) return null;
  const f = e.parts && e.parts.length > 0, d = e.children && e.children.length > 0;
  return /* @__PURE__ */ Yr.createElement(Eo, null, /* @__PURE__ */ Yr.createElement(
    C2,
    {
      group: e,
      isExpanded: c,
      onToggle: () => n(o),
      level: a,
      isLocationView: s
    }
  ), /* @__PURE__ */ Yr.createElement(F2, { expanded: c }, f && /* @__PURE__ */ Yr.createElement(Eo, null, e.parts.map((u) => /* @__PURE__ */ Yr.createElement(
    Xc,
    {
      key: `part-${u.id}-${e.id}`,
      part: u,
      context: t,
      showLocationQty: s,
      isExpandable: !0,
      indent: a + 1
    }
  ))), d && e.children.map((u) => /* @__PURE__ */ Yr.createElement(
    Kc,
    {
      key: `child-${u.id ?? "none"}-${a + 1}`,
      group: u,
      context: t,
      expandedGroups: r,
      toggleGroup: n,
      level: a + 1,
      prefix: i,
      isLocationView: s
    }
  ))));
}
const ki = window.React, k2 = window.MantineCore.CloseButton, A2 = window.MantineCore.TextInput;
function R2({
  value: e,
  onChange: t,
  placeholder: r = "Search parts by name, IPN, or description..."
}) {
  return /* @__PURE__ */ ki.createElement(
    A2,
    {
      value: e,
      placeholder: r,
      leftSection: /* @__PURE__ */ ki.createElement(wu, { size: 16 }),
      rightSection: e.length > 0 ? /* @__PURE__ */ ki.createElement(k2, { size: "sm", onClick: () => t("") }) : null,
      onChange: (n) => t(n.target.value),
      style: { flex: 1, maxWidth: 400 }
    }
  );
}
const ne = window.React, Ea = window.React.useCallback, O2 = window.React.useEffect, Ai = window.React.useMemo, Kr = window.React.useState, Ta = window.MantineCore.ActionIcon, To = window.MantineCore.Alert, Sa = window.MantineCore.Badge, I2 = window.MantineCore.Box, ya = window.MantineCore.Divider, ar = window.MantineCore.Group, N2 = window.MantineCore.Loader, So = window.MantineCore.Paper, D2 = window.MantineCore.SegmentedControl, Ri = window.MantineCore.Stack, yo = window.MantineCore.Switch, Ca = window.MantineCore.Text, Co = window.MantineCore.Title, Jr = window.MantineCore.Tooltip, Fo = window.MantineNotifications.notifications;
function M2({
  context: e
}) {
  const [t, r] = Kr("all"), [n, a] = Kr(""), [i] = xf(n, 300), [s, o] = Kr(/* @__PURE__ */ new Set()), [c, l] = Kr(!1), [f, d] = Kr(!1), [u, h] = Kr(!1), { data: m, isLoading: x, isError: _, error: F } = Yf(
    {
      queryKey: ["critical-components", t],
      queryFn: async () => (await e.api.get(
        `/plugin/criticalcomponents/list/?group_by=${t}`
      )).data
    },
    e.queryClient
  ), A = Ai(() => m ? t === "location" ? m.locations ?? [] : t === "category" ? m.categories ?? [] : [] : [], [m, t]), y = Ai(() => {
    let D = d1(A, i);
    return c && (D = x1(D)), f && (D = p1(D)), D;
  }, [A, i, c, f]), O = Ai(() => S0(y, t === "location" ? "loc" : "cat"), [y, t]), j = Ea((D) => {
    o((V) => {
      const q = new Set(V);
      return q.has(D) ? q.delete(D) : q.add(D), q;
    });
  }, []), Z = Ea(() => {
    o(new Set(O));
  }, [O]), R = Ea(() => {
    o(/* @__PURE__ */ new Set());
  }, []), W = Ea((D) => {
    r(D), o(/* @__PURE__ */ new Set());
  }, []);
  if (O2(() => {
    if (y.length > 0 && s.size === 0 && t !== "all") {
      const V = S0(y, t === "location" ? "loc" : "cat");
      o(new Set(V));
    }
  }, [y.length, t]), x)
    return /* @__PURE__ */ ne.createElement(Ri, { align: "center", justify: "center", p: "xl" }, /* @__PURE__ */ ne.createElement(N2, { size: "lg" }), /* @__PURE__ */ ne.createElement(Ca, { c: "dimmed" }, "Loading critical components..."));
  if (_)
    return /* @__PURE__ */ ne.createElement(
      To,
      {
        icon: /* @__PURE__ */ ne.createElement(Tu, { size: 16 }),
        title: "Error Loading Data",
        color: "red",
        variant: "light"
      },
      F instanceof Error ? F.message : "Failed to load critical components"
    );
  if (!m || m.total_parts === 0)
    return /* @__PURE__ */ ne.createElement(Ri, { gap: "md" }, /* @__PURE__ */ ne.createElement(ar, { justify: "space-between" }, /* @__PURE__ */ ne.createElement(Co, { order: 3 }, "Critical Components")), /* @__PURE__ */ ne.createElement(
      To,
      {
        icon: /* @__PURE__ */ ne.createElement(Fa, { size: 16 }),
        title: "No Critical Components Found",
        color: "gray",
        variant: "light"
      },
      /* @__PURE__ */ ne.createElement(Ca, { size: "sm" }, "No parts have been marked as critical components."),
      /* @__PURE__ */ ne.createElement(Ca, { size: "xs", c: "dimmed", mt: "xs" }, 'To mark a part as critical, add the "CriticalComponent" parameter to a part and set its value to "True".')
    ));
  const P = t === "location" ? "loc" : "cat", H = t === "category" || t === "location";
  return /* @__PURE__ */ ne.createElement(Ri, { gap: "md" }, /* @__PURE__ */ ne.createElement(ar, { justify: "space-between", wrap: "wrap" }, /* @__PURE__ */ ne.createElement(ar, { gap: "sm" }, /* @__PURE__ */ ne.createElement(Co, { order: 3 }, "Critical Components"), /* @__PURE__ */ ne.createElement(Sa, { color: "blue", size: "lg" }, m.total_parts, " Parts"), m.total_critical_low_stock > 0 && /* @__PURE__ */ ne.createElement(
    Sa,
    {
      color: "orange",
      size: "lg",
      leftSection: /* @__PURE__ */ ne.createElement(Fa, { size: 12 })
    },
    m.total_critical_low_stock,
    " Low Stock"
  ), (m.total_out_of_stock ?? 0) > 0 && /* @__PURE__ */ ne.createElement(
    Sa,
    {
      color: "red",
      size: "lg",
      leftSection: /* @__PURE__ */ ne.createElement(Zf, { size: 12 })
    },
    m.total_out_of_stock,
    " Out of Stock"
  ), (m.total_needs_check ?? 0) > 0 && /* @__PURE__ */ ne.createElement(
    Sa,
    {
      color: "yellow",
      size: "lg",
      leftSection: /* @__PURE__ */ ne.createElement($i, { size: 12 })
    },
    m.total_needs_check,
    " Needs Stock Count"
  ))), /* @__PURE__ */ ne.createElement(So, { p: "sm", withBorder: !0 }, /* @__PURE__ */ ne.createElement(ar, { justify: "space-between", wrap: "wrap", gap: "sm" }, /* @__PURE__ */ ne.createElement(R2, { value: n, onChange: a }), /* @__PURE__ */ ne.createElement(ar, { gap: "xs" }, /* @__PURE__ */ ne.createElement(
    D2,
    {
      value: t,
      onChange: W,
      data: [
        {
          label: /* @__PURE__ */ ne.createElement(ar, { gap: 4 }, /* @__PURE__ */ ne.createElement(uu, { size: 14 }), /* @__PURE__ */ ne.createElement("span", null, "All")),
          value: "all"
        },
        {
          label: /* @__PURE__ */ ne.createElement(ar, { gap: 4 }, /* @__PURE__ */ ne.createElement(Uo, { size: 14 }), /* @__PURE__ */ ne.createElement("span", null, "Category")),
          value: "category"
        },
        {
          label: /* @__PURE__ */ ne.createElement(ar, { gap: 4 }, /* @__PURE__ */ ne.createElement(Wo, { size: 14 }), /* @__PURE__ */ ne.createElement("span", null, "Location")),
          value: "location"
        }
      ],
      size: "xs"
    }
  ), H && /* @__PURE__ */ ne.createElement(ne.Fragment, null, /* @__PURE__ */ ne.createElement(ya, { orientation: "vertical" }), /* @__PURE__ */ ne.createElement(Jr, { label: "Expand All" }, /* @__PURE__ */ ne.createElement(Ta, { variant: "light", onClick: Z }, /* @__PURE__ */ ne.createElement(au, { size: 16 }))), /* @__PURE__ */ ne.createElement(Jr, { label: "Collapse All" }, /* @__PURE__ */ ne.createElement(Ta, { variant: "light", onClick: R }, /* @__PURE__ */ ne.createElement(su, { size: 16 })))), /* @__PURE__ */ ne.createElement(ya, { orientation: "vertical" }), /* @__PURE__ */ ne.createElement(Jr, { label: "Show only low stock items" }, /* @__PURE__ */ ne.createElement(
    yo,
    {
      checked: c,
      onChange: (D) => l(D.currentTarget.checked),
      label: "Low Stock Only",
      size: "xs",
      color: "orange",
      thumbIcon: c ? /* @__PURE__ */ ne.createElement(Fa, { size: 10, color: "orange" }) : null
    }
  )), /* @__PURE__ */ ne.createElement(Jr, { label: "Show only items needing stock check" }, /* @__PURE__ */ ne.createElement(
    yo,
    {
      checked: f,
      onChange: (D) => d(D.currentTarget.checked),
      label: "Needs Stock Count Only",
      size: "xs",
      color: "yellow",
      thumbIcon: f ? /* @__PURE__ */ ne.createElement($i, { size: 10, color: "orange" }) : null
    }
  )), /* @__PURE__ */ ne.createElement(ya, { orientation: "vertical" }), /* @__PURE__ */ ne.createElement(Jr, { label: "Recalculate lead times for all critical parts" }, /* @__PURE__ */ ne.createElement(
    Ta,
    {
      variant: "light",
      color: "blue",
      loading: u,
      onClick: async () => {
        h(!0);
        try {
          const D = await e.api.post(
            "/plugin/criticalcomponents/recalculate-lead-times/"
          ), { updated: V = 0, skipped: q = 0 } = D.data ?? {};
          Fo.show({
            title: "Lead times updated",
            message: `Updated ${V} part(s), skipped ${q}.`,
            color: "green"
          }), await e.queryClient.invalidateQueries({
            queryKey: ["critical-components"]
          });
        } catch (D) {
          Fo.show({
            title: "Failed to recalculate lead times",
            message: D instanceof Error ? D.message : "Unknown error",
            color: "red"
          });
        } finally {
          h(!1);
        }
      }
    },
    /* @__PURE__ */ ne.createElement(vu, { size: 16 })
  )), /* @__PURE__ */ ne.createElement(ya, { orientation: "vertical" }), /* @__PURE__ */ ne.createElement(Jr, { label: "Export to Excel" }, /* @__PURE__ */ ne.createElement(
    Ta,
    {
      variant: "light",
      color: "green",
      onClick: () => {
        let D = fl(m.parts ?? [], i);
        c && (D = ul(D)), f && (D = hl(D)), i2(D);
      }
    },
    /* @__PURE__ */ ne.createElement(cu, { size: 16 })
  ))))), i && H && /* @__PURE__ */ ne.createElement(Ca, { size: "sm", c: "dimmed" }, 'Showing results for "', i, '"', y.length === 0 && " - No matching parts found"), t === "all" ? (
    /* All Parts Table (flat view) */
    /* @__PURE__ */ ne.createElement(
      g2,
      {
        parts: m.parts ?? [],
        context: e,
        searchTerm: i,
        showLowStockOnly: c,
        showNeedsCheckOnly: f
      }
    )
  ) : (
    /* Grouped View (category or location) */
    y.length > 0 && /* @__PURE__ */ ne.createElement(So, { withBorder: !0, style: { overflow: "hidden" } }, /* @__PURE__ */ ne.createElement(Yc, { showLocationQty: t === "location" }), /* @__PURE__ */ ne.createElement(I2, { style: { maxHeight: "60vh", overflowY: "auto" } }, y.map((D) => /* @__PURE__ */ ne.createElement(
      Kc,
      {
        key: `group-${D.id ?? "none"}-0`,
        group: D,
        context: e,
        expandedGroups: s,
        toggleGroup: j,
        level: 0,
        prefix: P,
        isLocationView: t === "location"
      }
    ))))
  ));
}
function G2(e) {
  return Su(e), /* @__PURE__ */ ne.createElement(u1, { locale: e.locale }, /* @__PURE__ */ ne.createElement(M2, { context: e }));
}
export {
  G2 as default,
  G2 as renderPanel
};
