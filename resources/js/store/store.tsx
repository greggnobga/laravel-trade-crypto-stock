/** Vendor. */
import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

/** Reducers. */
import loginReducer from '$lib/store/feature/user/login-slice'

/** Configure store. */
export const store = configureStore({
    reducer: {
        login: loginReducer,
    },
})

/** Typescript stuff. */
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
