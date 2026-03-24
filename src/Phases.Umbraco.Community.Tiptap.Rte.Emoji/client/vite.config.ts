import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "src/manifest.ts",   // IMPORTANT
            formats: ["es"]
        },

        /** Built assets land under RCL wwwroot (published as App_Plugins/...). */
        outDir: "../wwwroot/TipTapEmoji",

        emptyOutDir: true,

        /** Omit maps in published NuGet (~50%+ smaller static assets). */
        sourcemap: false,

        rollupOptions: {
            external: [/^@umbraco/],

            output: {
                entryFileNames: "Phases.Umbraco.Community.Tiptap.Rte.Emoji.js",
                chunkFileNames: "[name].js"
            }
        }
    },

    base: "/App_Plugins/TipTapEmoji/"
});