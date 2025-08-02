import { createServerFn } from '@tanstack/react-start'
import { deleteCookie, getCookie } from '@tanstack/react-start/server'
import { AxiosError } from 'axios'
import { customInstance } from '../lib/api/mutator/custom-instance'

export const getUser = createServerFn({
    method: 'GET',
}).handler(async () => {
    try {
        const cookie = getCookie('SESSION')

        if (!cookie) return null

        const response = await customInstance<any>({
            url: '/api/user/me',
            method: 'GET',
            headers: {
                Cookie: `SESSION=${cookie}`,
                'Content-Type': 'application/json',
            },
        })

        return response
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
                deleteCookie('SESSION')
                return null
            }
        }
        console.error('Non 401 error getting user from getUser.ts', error)
    }
})
