/** Vendor. */
import fs from 'fs/promises'
import path from 'path'
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { tscWatch } from 'vite-plugin-tsc-watch'

/** Config. */
export default defineConfig({
    base: '',
    esbuild: {
        loader: 'tsx',
        include: /resources\/js\/.*\.tsx*$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            plugins: [
                {
                    name: 'load-js-files-as-tsx',
                    setup(build) {
                        build.onLoad({ filter: /resources\/js\/.*\.js$/ }, async (args) => ({
                            loader: 'tsx',
                            contents: await fs.readFile(args.path, 'utf8'),
                        }))
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
                chunkFileNames: 'js/[name].js',
                entryFileNames: 'js/[name].js',

                assetFileNames: ({ name }) => {
                    if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
                        return 'images/[name][extname]'
                    }

                    if (/\.css$/.test(name ?? '')) {
                        return 'css/[name][extname]'
                    }
                    /** Return something. */
                    return 'assets/[name][extname]'
                },
            },
            external: [],
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/main.tsx'],
            refresh: ['resources/views/**'],
            manifest: true,
        }),
        // viteStaticCopy({
        //     targets: [
        //         {
        //             src: 'resources/images/*',
        //             dest: 'images',
        //         },
        //         {
        //             src: 'resources/icons/*',
        //             dest: 'icons',
        //         },
        //     ],
        // }),
        react(),
        tscWatch(),
    ],
    resolve: {
        alias: {
            $lib: path.resolve(__dirname, './resources/js'),
        },
    },
    server: {
        host: '10.15.5.101',
        watch: {
            usePolling: true,
        },
    },
})
