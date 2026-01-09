const h = window.React, P = window.LinguiReact.I18nProvider, C = window.LinguiCore.i18n;
function v({
  locale: t,
  children: n
}) {
  return h.useEffect(() => {
    C.activate(t);
  }, [t]), /* @__PURE__ */ h.createElement(P, { i18n: C }, n);
}
const e = window.React, w = window.React.useCallback, _ = window.React.useMemo, u = window.MantineCore.Accordion, p = window.MantineCore.Alert, f = window.MantineCore.Anchor, T = window.MantineCore.Avatar, m = window.MantineCore.Badge, M = window.MantineCore.Box, l = window.MantineCore.Group, R = window.MantineCore.Loader, E = window.MantineCore.Stack, a = window.MantineCore.Table, r = window.MantineCore.Text, z = window.MantineCore.Title, y = window.ReactQuery.useQuery, b = window.TablerIconsReact.IconAlertTriangle, L = window.TablerIconsReact.IconCategory, A = window.TablerIconsReact.IconCheck, x = window.TablerIconsReact.IconX, $ = window.PluginUIFeature.checkPluginVersion;
function g(t) {
  let n = t.parts ? t.parts.length : 0;
  if (t.children)
    for (const c of t.children)
      n += g(c);
  return n;
}
function S({
  part: t,
  context: n
}) {
  const c = _(() => t.total_stock <= 0 ? "red" : t.is_low_stock ? "orange" : "green", [t.total_stock, t.is_low_stock]), i = w(() => {
    const o = t.total_stock || 0, k = t.minimum_stock || 0;
    return k > 0 ? `${o} / ${k}` : `${o}`;
  }, [t.total_stock, t.minimum_stock]), s = w(() => {
    n.navigate(`/part/${t.pk}/`);
  }, [n, t.pk]), d = w(
    (o) => {
      n.navigate(`/stock/location/${o}/`);
    },
    [n]
  );
  return /* @__PURE__ */ e.createElement(a.Tr, null, /* @__PURE__ */ e.createElement(a.Td, null, t.thumbnail || t.image ? /* @__PURE__ */ e.createElement(T, { src: t.thumbnail || t.image, size: "sm", radius: "sm" }) : /* @__PURE__ */ e.createElement(T, { size: "sm", radius: "sm", color: "gray" }, "-")), /* @__PURE__ */ e.createElement(a.Td, null, /* @__PURE__ */ e.createElement(l, { gap: "xs" }, /* @__PURE__ */ e.createElement(
    f,
    {
      size: "sm",
      fw: 500,
      onClick: s,
      style: { cursor: "pointer" }
    },
    t.name
  ), t.IPN && /* @__PURE__ */ e.createElement(r, { size: "xs", c: "dimmed" }, "(", t.IPN, ")"))), /* @__PURE__ */ e.createElement(a.Td, null, /* @__PURE__ */ e.createElement(r, { size: "sm", c: "dimmed", lineClamp: 1, maw: 250 }, t.description || "-")), /* @__PURE__ */ e.createElement(a.Td, null, /* @__PURE__ */ e.createElement(r, { size: "sm", fw: 500, c }, i())), /* @__PURE__ */ e.createElement(a.Td, null, /* @__PURE__ */ e.createElement(l, { gap: 4 }, t.is_low_stock ? /* @__PURE__ */ e.createElement(m, { color: "orange", size: "sm", leftSection: /* @__PURE__ */ e.createElement(b, { size: 12 }) }, "Low") : /* @__PURE__ */ e.createElement(m, { color: "green", size: "sm", leftSection: /* @__PURE__ */ e.createElement(A, { size: 12 }) }, "OK"), t.trackable && /* @__PURE__ */ e.createElement(m, { color: "blue", size: "sm" }, "Track"))), /* @__PURE__ */ e.createElement(a.Td, null, t.stock_locations && t.stock_locations.length > 0 ? /* @__PURE__ */ e.createElement(l, { gap: 4 }, t.stock_locations.slice(0, 2).map((o) => /* @__PURE__ */ e.createElement(r, { key: o.location_id, size: "xs" }, /* @__PURE__ */ e.createElement(
    f,
    {
      size: "xs",
      onClick: () => d(o.location_id),
      style: { cursor: "pointer" }
    },
    o.location
  ), ": ", o.quantity)), t.stock_locations.length > 2 && /* @__PURE__ */ e.createElement(r, { size: "xs", c: "dimmed" }, "+", t.stock_locations.length - 2, " more")) : /* @__PURE__ */ e.createElement(r, { size: "xs", c: "dimmed" }, "-")));
}
function B({
  parts: t,
  context: n
}) {
  return !t || t.length === 0 ? null : /* @__PURE__ */ e.createElement(a, { striped: !0, highlightOnHover: !0, withTableBorder: !0 }, /* @__PURE__ */ e.createElement(a.Thead, null, /* @__PURE__ */ e.createElement(a.Tr, null, /* @__PURE__ */ e.createElement(a.Th, { style: { width: 40 } }), /* @__PURE__ */ e.createElement(a.Th, null, "Part"), /* @__PURE__ */ e.createElement(a.Th, null, "Description"), /* @__PURE__ */ e.createElement(a.Th, null, "Stock"), /* @__PURE__ */ e.createElement(a.Th, null, "Status"), /* @__PURE__ */ e.createElement(a.Th, null, "Locations"))), /* @__PURE__ */ e.createElement(a.Tbody, null, t.map((c) => /* @__PURE__ */ e.createElement(S, { key: c.pk, part: c, context: n }))));
}
function I({
  category: t,
  context: n,
  level: c = 0
}) {
  const i = _(() => g(t), [t]);
  if (i === 0) return null;
  const s = t.children && t.children.length > 0, d = t.parts && t.parts.length > 0;
  return /* @__PURE__ */ e.createElement(u.Item, { value: `cat-${t.id || "uncategorized"}-${c}` }, /* @__PURE__ */ e.createElement(u.Control, { icon: /* @__PURE__ */ e.createElement(L, { size: 16 }) }, /* @__PURE__ */ e.createElement(l, { justify: "space-between", mr: "md" }, /* @__PURE__ */ e.createElement(l, { gap: "xs" }, /* @__PURE__ */ e.createElement(r, { fw: 500 }, t.name), c > 0 && t.pathstring && t.pathstring !== t.name && /* @__PURE__ */ e.createElement(r, { size: "xs", c: "dimmed" }, t.pathstring)), /* @__PURE__ */ e.createElement(m, { color: "gray", size: "sm" }, i))), /* @__PURE__ */ e.createElement(u.Panel, null, /* @__PURE__ */ e.createElement(E, { gap: "md" }, d && /* @__PURE__ */ e.createElement(B, { parts: t.parts, context: n }), s && /* @__PURE__ */ e.createElement(M, { ml: "md" }, /* @__PURE__ */ e.createElement(u, { variant: "separated" }, t.children.map((o) => /* @__PURE__ */ e.createElement(
    I,
    {
      key: o.id || "uncategorized",
      category: o,
      context: n,
      level: c + 1
    }
  )))))));
}
function j({
  context: t
}) {
  const { data: n, isLoading: c, isError: i, error: s } = y(
    {
      queryKey: ["critical-components"],
      queryFn: async () => (await t.api.get("/plugin/criticalcomponents/list/")).data
    },
    t.queryClient
  );
  if (c)
    return /* @__PURE__ */ e.createElement(E, { align: "center", justify: "center", p: "xl" }, /* @__PURE__ */ e.createElement(R, { size: "lg" }), /* @__PURE__ */ e.createElement(r, { c: "dimmed" }, "Loading critical components..."));
  if (i)
    return /* @__PURE__ */ e.createElement(
      p,
      {
        icon: /* @__PURE__ */ e.createElement(x, { size: 16 }),
        title: "Error Loading Data",
        color: "red",
        variant: "light"
      },
      s instanceof Error ? s.message : "Failed to load critical components"
    );
  if (!n || !n.categories || n.total_parts === 0)
    return /* @__PURE__ */ e.createElement(E, { gap: "md" }, /* @__PURE__ */ e.createElement(l, { justify: "space-between" }, /* @__PURE__ */ e.createElement(z, { order: 3 }, "Critical Components")), /* @__PURE__ */ e.createElement(
      p,
      {
        icon: /* @__PURE__ */ e.createElement(b, { size: 16 }),
        title: "No Critical Components Found",
        color: "gray",
        variant: "light"
      },
      /* @__PURE__ */ e.createElement(r, { size: "sm" }, "No parts have been marked as critical components."),
      /* @__PURE__ */ e.createElement(r, { size: "xs", c: "dimmed", mt: "xs" }, 'To mark a part as critical, add the "CriticalComponent" parameter to a part and set its value to "True".')
    ));
  const d = n.categories.filter((o) => g(o) > 0).map((o) => `cat-${o.id || "uncategorized"}-0`);
  return /* @__PURE__ */ e.createElement(E, { gap: "md" }, /* @__PURE__ */ e.createElement(l, { justify: "space-between" }, /* @__PURE__ */ e.createElement(z, { order: 3 }, "Critical Components"), /* @__PURE__ */ e.createElement(l, { gap: "sm" }, /* @__PURE__ */ e.createElement(m, { color: "blue", size: "lg" }, n.total_parts, " Parts"), n.total_critical_low_stock > 0 && /* @__PURE__ */ e.createElement(m, { color: "orange", size: "lg" }, n.total_critical_low_stock, " Low Stock"))), /* @__PURE__ */ e.createElement(u, { variant: "separated", multiple: !0, defaultValue: d }, n.categories.map((o) => /* @__PURE__ */ e.createElement(
    I,
    {
      key: o.id || "uncategorized",
      category: o,
      context: t
    }
  ))));
}
function q(t) {
  return $(t), /* @__PURE__ */ e.createElement(v, { locale: t.locale }, /* @__PURE__ */ e.createElement(j, { context: t }));
}
export {
  q as default,
  q as renderPanel
};
