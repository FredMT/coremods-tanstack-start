import { StartClient } from '@tanstack/react-start'
import { hydrateRoot } from 'react-dom/client'
import { createRouter } from './router'

import * as Sentry from '@sentry/tanstackstart-react'

const router = createRouter()

Sentry.init({
    dsn: 'https://cf113b75877998637688ee60cf64dffc@o4507553742520320.ingest.de.sentry.io/4509776058777680',

    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
    integrations: [],
})

hydrateRoot(document, <StartClient router={router} />)
