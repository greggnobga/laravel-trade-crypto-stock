import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/** Async thunk error argument. */
type Error = {
    errorMessage: string
}

/** Input type. */
type InputLogin = {
    email: string
    password: string
}

type InputLogout = {
    token: string
}

/** User type. */
type User = {
    loading: boolean
    email_verified: boolean
    role: string
    access_token: string
    message: string
    error: string
}

/** Fetch user data from local storage. */
const userFromStorage = JSON.parse(localStorage.getItem('auth') || '{}')

/** Set inital state. */
const initialState: User = {
    loading: false,
    ...userFromStorage,
    error: '',
}

/** Login request. */
export const loginRequest = createAsyncThunk<any, InputLogin, { rejectValue: Error }>(
    'user/login',
    async (inputData) => {
        /** Deconstruct input data. */
        const { email, password } = inputData

        /** Request data from backend. */
        const { data } = await axios({
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            url: '/api/login',
            params: { email, password },
        })

        /** Save to local storage. */
        if (data) {
            localStorage.setItem('auth', JSON.stringify(data))
        }

        /** Return something. */
        return data
    },
)

/** Logout request. */
export const logoutRequest = createAsyncThunk<any, InputLogout, { rejectValue: Error }>(
    'user/logout',
    async (inputData) => {
        /** Deconstruct input data. */
        const { token } = inputData

        /** Request data from backend. */
        const { data } = await axios({
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            method: 'POST',
            url: '/api/logout',
            params: { token },
        })

        if (data) {
            localStorage.removeItem('auth')
        }

        console.log(data)
        /** Return something. */
        return data
    },
)

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginRequest.pending, (state) => {
            state.loading = true
        })

        builder.addCase(loginRequest.fulfilled, (state, action: any) => {
            state.loading = false
            state.email_verified = action.payload.email_verified
            state.role = action.payload.role
            state.message = action.payload.message
            state.access_token = action.payload.access_token
            state.error = ''
        })

        builder.addCase(loginRequest.rejected, (state, action: any) => {
            state.loading = false
            state.email_verified = false
            state.role = ''
            state.message = ''
            state.access_token = ''
            state.error = action.error.message || 'Something went wrong during login request.'
        })

        builder.addCase(logoutRequest.pending, (state) => {
            state.loading = true
        })

        builder.addCase(logoutRequest.fulfilled, (state, action: any) => {
            state.loading = false
            state.email_verified = false
            state.role = ''
            state.message = action.payload.message || 'Adios amigo, see you next time!'
            state.access_token = ''
            state.error = ''
        })

        builder.addCase(logoutRequest.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Something went wrong during login request.'
        })
    },
})

/** Export something. */
export default AuthSlice.reducer
