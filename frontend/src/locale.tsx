import React from "react";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";

/**
 * A wrapper component that provides localization support for the plugin.
 * This uses the InvenTree locale passed via the plugin context.
 */
export function LocalizedComponent({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  // Initialize i18n with the provided locale
  React.useEffect(() => {
    i18n.activate(locale);
  }, [locale]);

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
