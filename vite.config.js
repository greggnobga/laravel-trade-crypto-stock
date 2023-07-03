/** Vendor. */
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import fs from "fs/promises";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

/** Config. */
export default defineConfig({
    server: {
        hmr: false,
    },
    esbuild: {
        loader: "jsx",
        include: /resources\/js\/.*\.jsx?$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            plugins: [
                {
                    name: "load-js-files-as-jsx",
                    setup(build) {
                        build.onLoad(
                            { filter: /resources\/js\/.*\.js$/ },
                            async (args) => ({
                                loader: "jsx",
                                contents: await fs.readFile(args.path, "utf8"),
                            })
                        );
                    },
                },
            ],
        },
    },
    build: {
        outDir: "public",
        emptyOutDir: false,
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`,
            },
            external: [],
        },
    },
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/main.js"],
            refresh: ["resources/views/**"],
            manifest: true,
        }),
        viteStaticCopy({
            targets: [
                {
                    src: "resources/images/*",
                    dest: "images",
                },
                {
                    src: "resources/icons/*",
                    dest: "icons",
                },
            ],
        }),
        react(),
    ],
});
