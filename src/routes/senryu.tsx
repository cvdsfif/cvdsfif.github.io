import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/senryu')({
    beforeLoad: ({ location }) => {
        if (location.pathname === '/senryu' || location.pathname === '/senryu/')
            throw redirect({
                to: '/senryu/$id',
                params: { id: '0' },
                mask: { to: '/senryu' }
            })
    }
})