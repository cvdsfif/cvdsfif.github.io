import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/it/ton/xlist/$network')({
    beforeLoad: ({ location }) => {
        if (location.pathname !== '/it/ton/xlist/mainnet' && location.pathname !== '/it/ton/xlist/testnet') {
            throw redirect({
                to: '/it/ton/xlist/$network',
                params: { network: 'mainnet' }
            })
        }
    },
})