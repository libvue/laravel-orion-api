// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        coverage: {
            provider: 'c8',
            reporter: ['text', 'json', 'html'],
        },
    },
})