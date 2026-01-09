const P = window.React, U = window.LinguiReact.I18nProvider, T = window.LinguiCore.i18n;
function F({
  locale: t,
  children: n
}) {
  return P.useEffect(() => {
    T.activate(t);
  }, [t]), /* @__PURE__ */ P.createElement(U, { i18n: T }, n);
}
const e = window.React, E = window.React.useCallback, C = window.React.useMemo, v = window.React.useState, L = window.MantineCore.ActionIcon, R = window.MantineCore.Alert, H = window.MantineCore.Anchor, W = window.MantineCore.Avatar, y = window.MantineCore.Badge, f = window.MantineCore.Box, X = window.MantineCore.CloseButton, K = window.MantineCore.Collapse, O = window.MantineCore.Divider, u = window.MantineCore.Group, Y = window.MantineCore.Loader, $ = window.MantineCore.Paper, J = window.MantineCore.Progress, Z = window.MantineCore.SegmentedControl, b = window.MantineCore.Stack, d = window.MantineCore.Text, ee = window.MantineCore.TextInput, _ = window.MantineCore.Title, A = window.MantineCore.Tooltip, te = window.MantineCore.UnstyledButton, ne = window.MantineHooks.useDebouncedValue, oe = window.ReactQuery.useQuery, k = window.TablerIconsReact.IconAlertTriangle, B = window.TablerIconsReact.IconCategory, re = window.TablerIconsReact.IconChevronDown, ae = window.TablerIconsReact.IconChevronRight, ce = window.TablerIconsReact.IconChevronsDown, le = window.TablerIconsReact.IconChevronsUp, G = window.TablerIconsReact.IconMapPin, ie = window.TablerIconsReact.IconSearch, se = window.TablerIconsReact.IconX, me = window.PluginUIFeature.checkPluginVersion;
function de(t, n) {
  const o = [];
  function r(a, c) {
    for (const i of a)
      o.push(`${n}-${i.id ?? "none"}-${c}`), i.children && i.children.length > 0 && r(i.children, c + 1);
  }
  return r(t, 0), o;
}
function z(t) {
  let n = t.parts ? t.parts.length : 0;
  if (t.children)
    for (const o of t.children)
      n += z(o);
  return n;
}
function ue(t, n) {
  if (!n) return t;
  const o = n.toLowerCase();
  function r(a) {
    const c = a.parts.filter(
      (l) => l.name.toLowerCase().includes(o) || l.IPN && l.IPN.toLowerCase().includes(o) || l.description && l.description.toLowerCase().includes(o)
    ), i = a.children.map(r).filter((l) => l !== null);
    return c.length > 0 || i.length > 0 ? {
      ...a,
      parts: c,
      children: i
    } : null;
  }
  return t.map(r).filter((a) => a !== null);
}
function pe(t) {
  const n = t.total_stock ?? 0, o = t.minimum_stock ?? 0;
  return n <= 0 ? {
    label: "Out of Stock",
    color: "red",
    progressColor: "red",
    progressValue: 0
  } : t.is_low_stock || o > 0 && n < o ? {
    label: "Low Stock",
    color: "orange",
    progressColor: "orange",
    progressValue: o > 0 ? Math.min(n / o * 100, 100) : 50
  } : {
    label: "In Stock",
    color: "green",
    progressColor: "teal",
    progressValue: o > 0 ? Math.min(n / o * 100, 100) : 100
  };
}
function we(t, n = !1) {
  if (n && t.quantity_at_location !== void 0)
    return `${t.quantity_at_location}`;
  const o = t.total_stock ?? 0, r = t.minimum_stock ?? 0;
  return r > 0 ? `${o} / ${r}` : `${o}`;
}
function ge({
  part: t,
  context: n,
  showLocationQty: o = !1
}) {
  const r = pe(t), a = E(() => {
    n.navigate(`/part/${t.id}/`);
  }, [n, t.id]);
  return /* @__PURE__ */ e.createElement(
    f,
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
    /* @__PURE__ */ e.createElement(u, { gap: "sm", wrap: "nowrap", style: { paddingLeft: "32px" } }, /* @__PURE__ */ e.createElement(
      W,
      {
        src: t.thumbnail || t.image,
        size: "sm",
        radius: "sm",
        color: "gray"
      },
      t.name.charAt(0)
    ), /* @__PURE__ */ e.createElement(f, { style: { minWidth: 0, flex: 1 } }, /* @__PURE__ */ e.createElement(
      H,
      {
        size: "sm",
        fw: 500,
        onClick: a,
        style: { cursor: "pointer" },
        truncate: !0
      },
      t.name
    ), t.IPN && /* @__PURE__ */ e.createElement(d, { size: "xs", c: "dimmed", truncate: !0 }, t.IPN))),
    /* @__PURE__ */ e.createElement(d, { size: "sm", c: "dimmed", lineClamp: 1 }, t.description || "-"),
    /* @__PURE__ */ e.createElement(
      y,
      {
        color: r.color,
        size: "sm",
        variant: "light",
        leftSection: r.label === "Low Stock" ? /* @__PURE__ */ e.createElement(k, { size: 10 }) : null
      },
      r.label
    ),
    /* @__PURE__ */ e.createElement(u, { gap: "sm", wrap: "nowrap", justify: "flex-end" }, /* @__PURE__ */ e.createElement(
      J,
      {
        value: r.progressValue,
        color: r.progressColor,
        size: "sm",
        style: { width: 80 }
      }
    ), /* @__PURE__ */ e.createElement(d, { size: "sm", fw: 500, style: { minWidth: 60, textAlign: "right" } }, we(t, o)))
  );
}
function fe({
  group: t,
  isExpanded: n,
  onToggle: o,
  level: r = 0,
  icon: a
}) {
  const c = C(() => z(t), [t]);
  return c === 0 ? null : /* @__PURE__ */ e.createElement(
    te,
    {
      onClick: o,
      w: "100%",
      px: "md",
      py: "xs",
      style: {
        backgroundColor: "var(--mantine-color-gray-1)",
        borderBottom: "1px solid var(--mantine-color-gray-3)"
      }
    },
    /* @__PURE__ */ e.createElement(u, { gap: "xs", wrap: "nowrap", style: { paddingLeft: r * 16 } }, n ? /* @__PURE__ */ e.createElement(re, { size: 16, color: "gray" }) : /* @__PURE__ */ e.createElement(ae, { size: 16, color: "gray" }), a, /* @__PURE__ */ e.createElement(d, { size: "sm", fw: 600, style: { flex: 1 } }, t.name), /* @__PURE__ */ e.createElement(y, { color: "gray", size: "sm", variant: "light" }, c))
  );
}
function D({
  group: t,
  context: n,
  expandedGroups: o,
  toggleGroup: r,
  level: a = 0,
  prefix: c,
  isLocationView: i = !1
}) {
  const l = `${c}-${t.id ?? "none"}-${a}`, s = o.has(l);
  if (z(t) === 0) return null;
  const x = t.parts && t.parts.length > 0, h = t.children && t.children.length > 0;
  return /* @__PURE__ */ e.createElement(f, null, /* @__PURE__ */ e.createElement(
    fe,
    {
      group: t,
      isExpanded: s,
      onToggle: () => r(l),
      level: a,
      icon: i ? /* @__PURE__ */ e.createElement(G, { size: 16, color: "gray" }) : /* @__PURE__ */ e.createElement(B, { size: 16, color: "gray" })
    }
  ), /* @__PURE__ */ e.createElement(K, { in: s }, x && /* @__PURE__ */ e.createElement(f, null, t.parts.map((p) => /* @__PURE__ */ e.createElement(
    ge,
    {
      key: `part-${p.id}-${t.id}`,
      part: p,
      context: n,
      showLocationQty: i
    }
  ))), h && t.children.map((p) => /* @__PURE__ */ e.createElement(
    D,
    {
      key: `child-${p.id ?? "none"}-${a + 1}`,
      group: p,
      context: n,
      expandedGroups: o,
      toggleGroup: r,
      level: a + 1,
      prefix: c,
      isLocationView: i
    }
  ))));
}
function Ee({ showLocationQty: t = !1 }) {
  return /* @__PURE__ */ e.createElement(
    f,
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
    /* @__PURE__ */ e.createElement(d, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase", style: { paddingLeft: "32px" } }, "Part Name"),
    /* @__PURE__ */ e.createElement(d, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "Description"),
    /* @__PURE__ */ e.createElement(d, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase" }, "Status"),
    /* @__PURE__ */ e.createElement(d, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase", ta: "right" }, t ? "Qty at Location" : "Stock Level")
  );
}
function he({
  value: t,
  onChange: n
}) {
  return /* @__PURE__ */ e.createElement(
    ee,
    {
      value: t,
      placeholder: "Search parts by name, IPN, or description...",
      leftSection: /* @__PURE__ */ e.createElement(ie, { size: 16 }),
      rightSection: t.length > 0 ? /* @__PURE__ */ e.createElement(X, { size: "sm", onClick: () => n("") }) : null,
      onChange: (o) => n(o.target.value),
      style: { flex: 1, maxWidth: 400 }
    }
  );
}
function Ce({
  context: t
}) {
  const [n, o] = v("category"), [r, a] = v(""), [c] = ne(r, 300), [i, l] = v(/* @__PURE__ */ new Set()), { data: s, isLoading: S, isError: x, error: h } = oe(
    {
      queryKey: ["critical-components", n],
      queryFn: async () => (await t.api.get(
        `/plugin/criticalcomponents/list/?group_by=${n}`
      )).data
    },
    t.queryClient
  ), p = C(() => s ? n === "location" ? s.locations ?? [] : s.categories ?? [] : [], [s, n]), w = C(() => ue(p, c), [p, c]), M = C(() => de(w, n === "location" ? "loc" : "cat"), [w, n]), N = E((m) => {
    l((I) => {
      const g = new Set(I);
      return g.has(m) ? g.delete(m) : g.add(m), g;
    });
  }, []), V = E(() => {
    l(new Set(M));
  }, [M]), Q = E(() => {
    l(/* @__PURE__ */ new Set());
  }, []), j = E((m) => {
    o(m), l(/* @__PURE__ */ new Set());
  }, []);
  if (e.useEffect(() => {
    if (w.length > 0 && i.size === 0) {
      const m = n === "location" ? "loc" : "cat", I = w.map(
        (g) => `${m}-${g.id ?? "none"}-0`
      );
      l(new Set(I));
    }
  }, [w.length, n]), S)
    return /* @__PURE__ */ e.createElement(b, { align: "center", justify: "center", p: "xl" }, /* @__PURE__ */ e.createElement(Y, { size: "lg" }), /* @__PURE__ */ e.createElement(d, { c: "dimmed" }, "Loading critical components..."));
  if (x)
    return /* @__PURE__ */ e.createElement(
      R,
      {
        icon: /* @__PURE__ */ e.createElement(se, { size: 16 }),
        title: "Error Loading Data",
        color: "red",
        variant: "light"
      },
      h instanceof Error ? h.message : "Failed to load critical components"
    );
  if (!s || s.total_parts === 0)
    return /* @__PURE__ */ e.createElement(b, { gap: "md" }, /* @__PURE__ */ e.createElement(u, { justify: "space-between" }, /* @__PURE__ */ e.createElement(_, { order: 3 }, "Critical Components")), /* @__PURE__ */ e.createElement(
      R,
      {
        icon: /* @__PURE__ */ e.createElement(k, { size: 16 }),
        title: "No Critical Components Found",
        color: "gray",
        variant: "light"
      },
      /* @__PURE__ */ e.createElement(d, { size: "sm" }, "No parts have been marked as critical components."),
      /* @__PURE__ */ e.createElement(d, { size: "xs", c: "dimmed", mt: "xs" }, 'To mark a part as critical, add the "CriticalComponent" parameter to a part and set its value to "True".')
    ));
  const q = n === "location" ? "loc" : "cat";
  return /* @__PURE__ */ e.createElement(b, { gap: "md" }, /* @__PURE__ */ e.createElement(u, { justify: "space-between", wrap: "wrap" }, /* @__PURE__ */ e.createElement(u, { gap: "sm" }, /* @__PURE__ */ e.createElement(_, { order: 3 }, "Critical Components"), /* @__PURE__ */ e.createElement(y, { color: "blue", size: "lg" }, s.total_parts, " Parts"), s.total_critical_low_stock > 0 && /* @__PURE__ */ e.createElement(y, { color: "orange", size: "lg", leftSection: /* @__PURE__ */ e.createElement(k, { size: 12 }) }, s.total_critical_low_stock, " Low Stock"))), /* @__PURE__ */ e.createElement($, { p: "sm", withBorder: !0 }, /* @__PURE__ */ e.createElement(u, { justify: "space-between", wrap: "wrap", gap: "sm" }, /* @__PURE__ */ e.createElement(he, { value: r, onChange: a }), /* @__PURE__ */ e.createElement(u, { gap: "xs" }, /* @__PURE__ */ e.createElement(
    Z,
    {
      value: n,
      onChange: j,
      data: [
        {
          label: /* @__PURE__ */ e.createElement(u, { gap: 4 }, /* @__PURE__ */ e.createElement(B, { size: 14 }), /* @__PURE__ */ e.createElement("span", null, "Category")),
          value: "category"
        },
        {
          label: /* @__PURE__ */ e.createElement(u, { gap: 4 }, /* @__PURE__ */ e.createElement(G, { size: 14 }), /* @__PURE__ */ e.createElement("span", null, "Location")),
          value: "location"
        }
      ],
      size: "xs"
    }
  ), /* @__PURE__ */ e.createElement(O, { orientation: "vertical" }), /* @__PURE__ */ e.createElement(A, { label: "Expand All" }, /* @__PURE__ */ e.createElement(L, { variant: "light", onClick: V }, /* @__PURE__ */ e.createElement(ce, { size: 16 }))), /* @__PURE__ */ e.createElement(A, { label: "Collapse All" }, /* @__PURE__ */ e.createElement(L, { variant: "light", onClick: Q }, /* @__PURE__ */ e.createElement(le, { size: 16 })))))), c && /* @__PURE__ */ e.createElement(d, { size: "sm", c: "dimmed" }, 'Showing results for "', c, '"', w.length === 0 && " - No matching parts found"), w.length > 0 && /* @__PURE__ */ e.createElement($, { withBorder: !0, style: { overflow: "hidden" } }, /* @__PURE__ */ e.createElement(Ee, { showLocationQty: n === "location" }), /* @__PURE__ */ e.createElement(f, { style: { maxHeight: "60vh", overflowY: "auto" } }, w.map((m) => /* @__PURE__ */ e.createElement(
    D,
    {
      key: `group-${m.id ?? "none"}-0`,
      group: m,
      context: t,
      expandedGroups: i,
      toggleGroup: N,
      level: 0,
      prefix: q,
      isLocationView: n === "location"
    }
  )))));
}
function ye(t) {
  return me(t), /* @__PURE__ */ e.createElement(F, { locale: t.locale }, /* @__PURE__ */ e.createElement(Ce, { context: t }));
}
export {
  ye as default,
  ye as renderPanel
};
