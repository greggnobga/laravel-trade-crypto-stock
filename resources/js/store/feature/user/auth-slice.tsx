/** Vendor. */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/** Async thunk type. */
type Error<T> = {
    error?: T
    message?: string
    status?: number
}

/** User type. */
type User = {
    email_verified: boolean
    role: string
    access_token: string
    message: string
    show_message: boolean
    status?: number
    valid?: boolean
    loading?: boolean
}

/** Input login type. */
type InputCredentials = {
    email: string
    password: string
}

/** Input token. */
type InputToken = {
    token: string
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
export const loginRequest = createAsyncThunk<any, InputCredentials, { rejectValue: Error<any> }>(
    'user/login',
    async (inputData, { rejectWithValue }) => {
        try {
            /** Deconstruct input data. */
            const { email, password } = inputData

            /** Request data from backend. */
            const { data, status } = await axios({
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
            return { status, ...(data as unknown as Record<any, unknown>) }
        } catch (error: any) {
            /** Capture error details */
            if (error.response) {
                /** The request was made and the server responded with a status code */
                return rejectWithValue({
                    status: error.response.status,
                    message: error.response.data.message || 'Something went wrong!',
                })
            } else if (error.request) {
                /** The request was made but no response was received */
                return rejectWithValue({
                    message: 'No response received from the server',
                })
            } else {
                /** Something happened in setting up the request that triggered an error */
                return rejectWithValue({
                    message: error.message || 'Something went wrong!',
                })
            }
        }
    },
)

/** Logout request. */
export const logoutRequest = createAsyncThunk<any, InputToken, { rejectValue: Error<any> }>(
    'user/logout',
    async (inputData, { rejectWithValue }) => {
        try {
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

            /** Return something. */
            return { status, ...(data as unknown as Record<any, unknown>) }
        } catch (error: any) {
            /** Capture error details */
            if (error.response) {
                /** The request was made and the server responded with a status code */
                return rejectWithValue({
                    status: error.response.status,
                    message: error.response.data.message || 'Something went wrong!',
                })
            } else if (error.request) {
                /** The request was made but no response was received */
                return rejectWithValue({
                    message: 'No response received from the server',
                })
            } else {
                /** Something happened in setting up the request that triggered an error */
                return rejectWithValue({
                    message: error.message || 'Something went wrong!',
                })
            }
        }
    },
)

/** Logout request. */
export const validateRequest = createAsyncThunk<any, InputToken, { rejectValue: Error<any> }>(
    'user/validate',
    async (inputData, { rejectWithValue }) => {
        try {
            /** Deconstruct input data. */
            const { token } = inputData

            /** Request data from backend. */
            const { data } = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
                url: '/api/dashboard',
                params: { section: 'sentinel' },
            })

            /** Return something. */
            return { status, ...(data as unknown as Record<any, unknown>) }
        } catch (error: any) {
            /** Remove auth from local storage. */
            localStorage.removeItem('auth')

            /** Capture error details */
            if (error.response) {
                /** The request was made and the server responded with a status code */
                return rejectWithValue({
                    status: error.response.status,
                    message: error.response.data.message || 'Something went wrong!',
                })
            } else if (error.request) {
                /** The request was made but no response was received */
                return rejectWithValue({
                    message: 'No response received from the server',
                })
            } else {
                /** Something happened in setting up the request that triggered an error */
                return rejectWithValue({
                    message: error.message || 'Something went wrong!',
                })
            }
        }
    },
)

/** Export slice. */
export const AuthSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        displayNotification: () => {},
    },
    extraReducers: (builder) => {
        /** Login request case. */
        builder.addCase(loginRequest.pending, (state) => {
            state.loading = true
        })

        builder.addCase(loginRequest.fulfilled, (state, action: any) => {
            state.loading = false
            state.email_verified = action.payload.email_verified
            state.role = action.payload.role
            state.access_token = action.payload.access_token
            state.show_message = action.payload?.show_message
            state.message = action.payload?.message || 'Something went wrong!'
            state.status = action.payload?.status || null
        })

        builder.addCase(loginRequest.rejected, (state, action: any) => {
            state.loading = false
            state.email_verified = false
            state.role = ''
            state.access_token = ''
            state.show_message = false
            state.message = action.payload?.message || 'Something went wrong!'
            state.status = action.payload?.status || null
        })

        /** Logout request case. */
        builder.addCase(logoutRequest.pending, (state) => {
            state.loading = true
        })

        builder.addCase(logoutRequest.fulfilled, (state, action: any) => {
            state.loading = false
            state.access_token = ''
            state.show_message = false
            state.message = action.payload?.message || 'Adios amigo, see you next time!'
            state.status = action.payload?.status || null
        })

        builder.addCase(logoutRequest.rejected, (state, action: any) => {
            state.loading = false
            state.message = action.payload?.message || 'Something went wrong!'
            state.status = action.payload?.status || null
        })

        /** Validate request case. */
        builder.addCase(validateRequest.pending, (state) => {
            state.loading = true
        })

        builder.addCase(validateRequest.fulfilled, (state, action: any) => {
            state.loading = false
            state.valid = action.payload.valid
            state.access_token = action.payload.valid ? state.access_token : ''
        })

        builder.addCase(validateRequest.rejected, (state, action: any) => {
            state.loading = false
            state.valid = false
            state.access_token = ''
        })
    },
})

/** Export something. */
export default AuthSlice.reducer