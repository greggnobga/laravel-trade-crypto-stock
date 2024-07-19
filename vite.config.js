/** Vendor. */
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import fs from 'fs/promises';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

/** Config. */
export default defineConfig({
    esbuild: {
        loader: 'jsx',
        include: /resources\/js\/.*\.jsx*\.tsx*$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            plugins: [
                {
                    name: 'load-js-files-as-jsx',
                    setup(build) {
                        build.onLoad({ filter: /resources\/js\/.*\.js$/ }, async (args) => ({
                            loader: 'jsx',
                            contents: await fs.readFile(args.path, 'utf8'),
                        }));
                    },
                },
            ],
        },
    },
    build: {
        minify: true,
        outDir: 'public',
        emptyOutDir: false,
        chunkSizeWarningLimit: 1500,
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
            input: ['resources/css/App.css', 'resources/js/Main.jsx'],
            refresh: ['resources/views/**'],
            manifest: true,
        }),
        //   viteStaticCopy({
        //     targets: [
        //       {
        //         src: 'resources/images/*',
        //         dest: 'images',
        //       },
        //       {
        //         src: 'resources/icons/*',
        //         dest: 'icons',
        //       },
        //     ],
        //   }),
        react(),
    ],
    resolve: {
        alias: {
            $lib: path.resolve(__dirname, './resources/js/*'),
        },
    },
    server: {
        host: '10.15.5.101',
        watch: {
            usePolling: true,
        },
    },
});
