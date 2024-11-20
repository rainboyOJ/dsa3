import {resolve} from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],

    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                dfs: resolve(__dirname, 'dfs/index.html'),
            },
        },
    },
})
