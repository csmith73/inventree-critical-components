import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteExternalsPlugin } from "vite-plugin-externals";

// External libraries provided by InvenTree at runtime
// Only include libraries that are officially exposed by InvenTree
// Other libraries (@mantine/hooks, @tabler/icons-react, @tanstack/react-query, @inventreedb/ui)
// will be bundled into the plugin
const externalLibs = {
  react: "React",
  "react-dom": "ReactDOM",
  "react-dom/client": "ReactDOM",
  "@mantine/core": "MantineCore",
  "@mantine/notifications": "MantineNotifications",
  "@lingui/core": "LinguiCore",
  "@lingui/react": "LinguiReact",
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
    sourcemap: false,
    minify: true,
  },
});
