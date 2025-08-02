import Axios, { AxiosError, AxiosRequestConfig } from 'axios'

export const AXIOS_INSTANCE = Axios.create({
    baseURL: 'http://localhost:8080',
})

// Function to get cookie value by name using document.cookie
const getCookieValue = (name: string): string | undefined => {
    if (typeof document === 'undefined') return undefined

    const match = document.cookie.match(
        new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')
    )
    return match ? decodeURIComponent(match[3]) : undefined
}

// Add CSRF token to state-changing requests
AXIOS_INSTANCE.interceptors.request.use((config) => {
    // Only add CSRF token for state-changing methods
    if (
        config.method &&
        ['post', 'put', 'delete', 'patch'].includes(config.method.toLowerCase())
    ) {
        const csrfCookie = getCookieValue('X-XSRF-TOKEN')
        if (csrfCookie && csrfCookie !== 'null' && csrfCookie !== 'undefined') {
            config.headers['X-XSRF-TOKEN'] = csrfCookie
        }
    }

    return config
})

// Handle 401 responses and process Set-Cookie headers that clear the SESSION cookie
AXIOS_INSTANCE.interceptors.response.use(
    (response) => response,
    (error) => {
        // Check if it's a 401 error
        if (error.response && error.response.status === 401) {
            // Check for Set-Cookie header that's trying to clear the SESSION cookie
            const setCookieHeader = error.response.headers['set-cookie']
            if (setCookieHeader && typeof document !== 'undefined') {
                // If the header contains instructions to clear the SESSION cookie, do it on the client side
                if (Array.isArray(setCookieHeader)) {
                    setCookieHeader.forEach((cookieStr) => {
                        if (
                            cookieStr.includes('SESSION=') &&
                            cookieStr.includes('Max-Age=0')
                        ) {
                            document.cookie =
                                'SESSION=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure; HttpOnly'
                        }
                    })
                } else if (
                    typeof setCookieHeader === 'string' &&
                    setCookieHeader.includes('SESSION=') &&
                    setCookieHeader.includes('Max-Age=0')
                ) {
                    document.cookie =
                        'SESSION=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure; HttpOnly'
                }
            }
        }
        return Promise.reject(error)
    }
)

export const customInstance = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig
): Promise<T> => {
    const source = Axios.CancelToken.source()
    const promise = AXIOS_INSTANCE({
        ...config,
        ...options,
        cancelToken: source.token,
    }).then(({ data }) => data)

    // @ts-ignore
    promise.cancel = () => {
        source.cancel('Query was cancelled')
    }

    return promise
}

export type ErrorType<Error> = AxiosError<Error>
export type BodyType<BodyData> = BodyData
