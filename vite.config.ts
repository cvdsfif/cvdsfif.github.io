import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import pluginPurgeCss from "@mojojoejo/vite-plugin-purgecss"
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    nodePolyfills(),
    react(),
    pluginPurgeCss({
      variables: true,
      content: [
        "./src/**/*.{js,jsx,ts,tsx,html}",
        "./node_modules/primereact/**/*.js"
      ],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: ["html", "body", "p-tag-success", "p-tag-danger", "p-tag-warning", "p-tag-info",],
    }),
  ],
  envDir: "./"
})
