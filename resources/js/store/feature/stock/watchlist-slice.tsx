/** Vendor. */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/** Error type. */
type Error<T> = {
    error?: T;
    message?: string;
    status?: number;
};

/** Watchlist type. */
type Watchlist = {
    edge: number;
    symbol: string;
    value: string;
    pricerange: string;
    workingcapital: string;
    netincomeaftertax: string;
    debtassetratio: string;
    dividendyield: string;
};

/** Watchlist type. */
type Stocks = {
    message: string;
    stocks: Watchlist[];
    pages: number;
    loading: boolean;
    status: number;
    show_message: boolean;
};

/** Input watchlist type. */
type InputWatchlist = {
    page: number;
    token: string;
    section: string;
};

/** Fetch user data from local storage. */
const stockWatchlistFromStorage = JSON.parse(localStorage.getItem('stock-watchlist') || '{}');

/** Set inital state. */
const initialState: Stocks = {
    loading: false,
    ...stockWatchlistFromStorage,
};

/** Watchlist request. */
export const stockWatchlistRequest = createAsyncThunk<any, InputWatchlist, { rejectValue: Error<any> }>(
    'stock/watchlist',
    async (inputData, { rejectWithValue }) => {
        try {
            /** Deconstruct input data. */
            const { page, token, section } = inputData;

            /** Request data from backend. */
            const { data, status } = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
                url: `/api/stock-watchlist-retrieve`,
                params: { page, section },
            });

            /** Save to local storage. */
            if (data) {
                localStorage.setItem('stock-watchlist', JSON.stringify(data));
            }

            /** Return something. */
            return { status, ...(data as unknown as Record<any, unknown>) };
        } catch (error: any) {
            /** Capture error details */
            if (error.response) {
                /** The request was made and the server responded with a status code */
                return rejectWithValue({
                    status: error.response.status,
                    message: error.response.data.message || 'Something went wrong!',
                });
            } else if (error.request) {
                /** The request was made but no response was received */
                return rejectWithValue({
                    message: 'No response received from the server',
                });
            } else {
                /** Something happened in setting up the request that triggered an error */
                return rejectWithValue({
                    message: error.message || 'Something went wrong!',
                });
            }
        }
    },
);

/** Export slice. */
export const stockWatchlist = createSlice({
    name: 'stockWatchlist',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** Watchlist request case. */
        builder.addCase(stockWatchlistRequest.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(stockWatchlistRequest.fulfilled, (state, action: any) => {
            state.loading = false;
            state.stocks = action.payload.stocks || [];
            state.pages = action.payload.pages || null;
            state.show_message = state.show_message ? action.payload?.show_message : state.show_message;
            state.message = action.payload?.message || 'Something went wrong!';
            state.status = action.payload?.status || null;
        });

        builder.addCase(stockWatchlistRequest.rejected, (state, action: any) => {
            state.loading = false;
            state.stocks = [];
            state.show_message = true;
            state.message = action.payload?.message || 'Something went wrong!';
            state.status = action.payload?.status || null;
        });
    },
});

/** Export something. */
export default stockWatchlist.reducer;
