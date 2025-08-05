import { configureAuth } from 'react-query-auth'
import { CurrentUserResponse } from '../api/endpoints.schemas'
import { AXIOS_INSTANCE } from '../api/mutator/custom-instance'

export const { useUser, useLogin, useRegister, useLogout } = configureAuth({
    userFn: () =>
        AXIOS_INSTANCE.get('/api/user/me', {
            withCredentials: true,
            withXSRFToken: true,
        }).then((res) => res.data as CurrentUserResponse),
    loginFn: (credentials) =>
        AXIOS_INSTANCE.post('/api/auth/login', credentials, {
            withCredentials: true,
            withXSRFToken: true,
        }),
    registerFn: (credentials) =>
        AXIOS_INSTANCE.post('/api/auth/register', credentials),
    logoutFn: () =>
        AXIOS_INSTANCE.post('/api/auth/logout', {
            withCredentials: true,
        }),
})
