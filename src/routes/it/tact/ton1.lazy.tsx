import { createLazyFileRoute } from '@tanstack/react-router'
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react'

const manifestUrl = "https://www.zykov.com/manifest.json"

export const Route = createLazyFileRoute('/it/tact/ton1')({
    component: () => <TonConnectUIProvider manifestUrl={manifestUrl}>
        <div
            className='grid flex-grow-1 overflow-y-scroll p-4 min-w-0 min-h-0 w-full'
        >
            <TonConnectButton />

        </div>
    </TonConnectUIProvider>
})