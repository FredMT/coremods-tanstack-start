import { AXIOS_INSTANCE } from '@/lib/api/mutator/custom-instance'
import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie } from '@tanstack/react-start/server'

export const getCsrfToken = createServerFn({
    method: 'GET',
}).handler(async () => {
    const xsrfToken = getCookie('X-XSRF-TOKEN')

    try {
        if (xsrfToken) return
        const response = await AXIOS_INSTANCE.get('http://localhost:8080/csrf')

        if (response.status !== 200) return null

        const data = response.data

        setCookie(data.headerName, data.token)
    } catch (error) {
        throw error
    }
})
