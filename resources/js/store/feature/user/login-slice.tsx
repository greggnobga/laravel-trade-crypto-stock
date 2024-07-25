import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type User = {
    email_verified: string
    role: boolean
    access_token: string
    message: string
}

type initialState = {
    loading: boolean
    user: User[]
    error: string
}

const initialState: initialState = {
    loading: false,
    user: JSON.parse(localStorage.getItem('login') || '{}'),
    error: '',
}

export const loginRequest = createAsyncThunk('user/login', async (thunkAPI) => {
    /** Request data from backend. */
    const { data } = await axios({
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        url: '/api/login',
        params: { email: 'reijo@buntod.com', password: '1234567890' },
    })

    /** Save to local storage. */
    if (data) {
        localStorage.setItem('login', JSON.stringify(data))
    }

    /** Return something. */
    return data
})

export const LoginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(loginRequest.pending, (state) => {
            state.loading = true
        })

        builder.addCase(loginRequest.fulfilled, (state, action: any) => {
            state.loading = false
            state.user = action.payload
            state.error = ''
        })

        builder.addCase(loginRequest.rejected, (state, action) => {
            state.loading = false
            state.user = []
            state.error = action.error.message || 'Something went wrong during login request.'
        })
    },
})

/** Export something. */
export default LoginSlice.reducer
