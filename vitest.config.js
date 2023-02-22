// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        setupFiles: ['./test/SetupRequest.js'],
        coverage: {
            provider: 'c8',
            reporter: ['text', 'json', 'html'],
        },
        globals: true,
        environment: "jsdom",
    },
})