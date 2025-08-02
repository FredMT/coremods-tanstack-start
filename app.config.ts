import { wrapVinxiConfigWithSentry } from '@sentry/tanstackstart-react'
import { defineConfig } from '@tanstack/react-start-config'

const config = defineConfig({
    // ... your other TanStack Start config
})

export default wrapVinxiConfigWithSentry(config, {
    org: 'frederick-theohu',
    project: 'modsanctuary-tanstackstart-react',
    authToken: process.env.SENTRY_AUTH_TOKEN,

    // Only print logs for uploading source maps in CI
    // Set to `true` to suppress logs
    silent: !process.env.CI,
})
