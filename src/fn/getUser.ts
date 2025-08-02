import { createServerFn } from '@tanstack/react-start'
import { deleteCookie, getCookie } from '@tanstack/react-start/server'
import {
    AXIOS_INSTANCE,
    SerializableError,
} from '../lib/api/mutator/custom-instance'

export const getUser = createServerFn({
    method: 'GET',
}).handler(async () => {
    try {
        const cookie = getCookie('SESSION')

        if (!cookie) return null

        const response = await AXIOS_INSTANCE.get('/api/user/me', {
            headers: {
                Cookie: `SESSION=${cookie}`,
            },
        })

        return response.data
    } catch (error: unknown) {
        const err = error as SerializableError
        if (err.status === 401) {
            deleteCookie('SESSION')
            return null
        }
        return null
    }
})
