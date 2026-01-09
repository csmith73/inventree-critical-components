import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteExternalsPlugin } from "vite-plugin-externals";

// External libraries provided by InvenTree at runtime
const externalLibs = {
  react: "React",
  "react-dom": "ReactDOM",
  "react-dom/client": "ReactDOM",
  "@mantine/core": "MantineCore",
  "@mantine/hooks": "MantineHooks",
  "@mantine/notifications": "MantineNotifications",
  "@tabler/icons-react": "TablerIconsReact",
  "@tanstack/react-query": "ReactQuery",
  "@lingui/core": "LinguiCore",
  "@lingui/core/macro": "LinguiCoreMacro",
  "@lingui/react": "LinguiReact",
  "@inventreedb/ui": "PluginUIFeature",
};

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    viteExternalsPlugin(externalLibs),
  ],
  esbuild: {
    jsx: "preserve",
  },
  build: {
    outDir: "../inventree_critical_components/static",
    lib: {
      entry: {
        Panel: "./src/Panel.tsx",
      },
      formats: ["es"],
    },
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
    sourcemap: true,
    minify: false,
  },
});
