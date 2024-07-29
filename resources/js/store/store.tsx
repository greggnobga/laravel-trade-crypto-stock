/** Vendor. */
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

/** Reducers. */
import authReducer from '$lib/store/feature/user/auth-slice';
import stockExplorerReducer from '$lib/store/feature/stock/explorer-slice';

/** Configure store. */
export const store = configureStore({
    reducer: {
        auth: authReducer,
        stockExplorer: stockExplorerReducer,
    },
});

/** Typescript stuff. */
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
