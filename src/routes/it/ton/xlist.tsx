import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/it/ton/xlist')({
    beforeLoad: ({ location }) => {
        if (location.pathname === '/it/ton/xlist' || location.pathname === '/it/ton/xlist/') {
            throw redirect({
                to: '/it/ton/xlist/$network',
                params: { network: 'mainnet' },
                mask: { to: '/it/ton/xlist' }
            })
        }
    }
})