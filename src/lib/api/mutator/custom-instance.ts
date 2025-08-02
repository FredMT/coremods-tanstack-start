import Axios, { AxiosError, AxiosRequestConfig } from 'axios'

export const AXIOS_INSTANCE = Axios.create({
    baseURL: 'http://localhost:8080',
})

const getCookieValue = (name: string): string | undefined => {
    if (typeof document === 'undefined') return undefined

    const match = document.cookie.match(
        new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')
    )
    return match ? decodeURIComponent(match[3]) : undefined
}

AXIOS_INSTANCE.interceptors.request.use((config) => {
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

AXIOS_INSTANCE.interceptors.response.use(
    (response) => {
        const setCookieHeader = response.headers['set-cookie']
        if (setCookieHeader && typeof document !== 'undefined') {
            processCookieHeaders(setCookieHeader)
        }
        return response
    },
    (error) => {
        if (
            error.response?.status === 403 &&
            error.response?.headers?.location
        ) {
            if (typeof window !== 'undefined') {
                window.location.href = error.response.headers.location
            }
        }

        const serializableError: SerializableError = {
            message: error.message,
            name: error.name,
            code: error.code,
        }

        if (error.response) {
            serializableError.status = error.response.status
            serializableError.statusText = error.response.statusText
            serializableError.data = error.response.data

            serializableError.headers = {}
            if (error.response.headers) {
                const headers = error.response.headers
                Object.keys(headers).forEach((key) => {
                    if (
                        typeof headers[key] === 'string' &&
                        serializableError.headers
                    ) {
                        serializableError.headers[key] = headers[key]
                    }
                })
            }

            if (error.response.headers?.location) {
                serializableError.headers.location =
                    error.response.headers.location
            }
        }

        return Promise.reject(serializableError)
    }
)

const processCookieHeaders = (setCookieHeader: string | string[]) => {
    const cookieStrings = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader]

    cookieStrings.forEach((cookieStr) => {
        if (cookieStr.includes('SESSION=')) {
            if (
                cookieStr.includes('Max-Age=0') ||
                cookieStr.includes('Expires=Thu, 01 Jan 1970')
            ) {
                document.cookie =
                    'SESSION=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure; HttpOnly'
            } else {
                const cookieParts = parseCookieString(cookieStr)
                if (cookieParts.value) {
                    document.cookie = cookieParts.cookieString
                }
            }
        }

        if (cookieStr.includes('X-XSRF-TOKEN=')) {
            if (
                cookieStr.includes('Max-Age=0') ||
                cookieStr.includes('Expires=Thu, 01 Jan 1970')
            ) {
                document.cookie =
                    'X-XSRF-TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict'
            } else {
                const cookieParts = parseCookieString(cookieStr)
                if (cookieParts.value) {
                    document.cookie = cookieParts.cookieString
                }
            }
        }
    })
}

const parseCookieString = (cookieStr: string) => {
    const [nameValue, ...attributeParts] = cookieStr.split(';')
    const [name, value] = nameValue.split('=')

    return {
        name: name.trim(),
        value: value,
        cookieString: cookieStr,
    }
}

export const customInstance = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig
): Promise<T> => {
    const source = Axios.CancelToken.source()
    const promise = AXIOS_INSTANCE({
        ...config,
        ...options,
        cancelToken: source.token,
    })
        .then(({ data }) => data)
        .catch((error) => {
            const serializableError: SerializableError = {
                message: error.message,
                name: error.name,
                code: error.code,
            }

            if (error.response) {
                serializableError.status = error.response.status
                serializableError.statusText = error.response.statusText
                serializableError.data = error.response.data
                serializableError.headers = error.response.headers
            }

            throw serializableError
        })

    // @ts-ignore
    promise.cancel = () => {
        source.cancel('Query was cancelled')
    }

    return promise
}

export interface SerializableError {
    message: string
    name: string
    code?: string
    status?: number
    statusText?: string
    data?: any
    headers?: Record<string, string>
}

export type ErrorType<e> = AxiosError<e>
export type BodyType<BodyData> = BodyData
