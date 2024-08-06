/** Vendor. */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/** Error type. */
type Error<T> = {
    error?: T;
    message?: string;
    status?: number;
};

/** Blue type. */
type Trade = {
    edge: number;
    symbol: string;
    price: string;
    value: string;
    pricerange: string;
    workingcapital: string;
    netincomeaftertax: string;
    debtassetratio: string;
    dividendyield: string;
};

/** Stocks type. */
type Stocks = {
    message: string;
    bluechip: Trade[];
    pages: number;
    loading: boolean;
    status: number;
    show_message: boolean;
};

/** Input trade type. */
type InputTrade = {
    page: number;
    token: string;
    section: string;
};

/** Fetch user data from local storage. */
const stockBluechipFromStorage = JSON.parse(localStorage.getItem('stock-trade-bluechip') || '{}');

/** Set inital state. */
const initialState = {
    loading: false,
    ...stockBluechipFromStorage,
};

/** Bluechip request. */
export const stockBluechipRequest = createAsyncThunk<any, InputTrade, { rejectValue: Error<any> }>(
    'stock/bluechip',
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
                url: `/api/stock-trade-retrieve`,
                params: { page, section },
            });

            /** Save to local storage. */
            if (data) {
                localStorage.setItem('stock-trade-bluechip', JSON.stringify(data));
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
export const stockTradeBluechip = createSlice({
    name: 'stockTradeBluechip',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** Bluechip request case. */
        builder.addCase(stockBluechipRequest.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(stockBluechipRequest.fulfilled, (state, action: any) => {
            state.loading = false;
            state.bluechip = action.payload.bluechip || [];
            state.pages = action.payload.pages || null;
            state.show_message = state.show_message ? action.payload?.show_message : state.show_message;
            state.message = action.payload.message || 'Something went wrong!';
            state.status = action.payload.status || null;
        });

        builder.addCase(stockBluechipRequest.rejected, (state, action: any) => {
            state.loading = false;
            state.bluechip = [];
            state.show_message = true;
            state.message = action.payload.message || 'Something went wrong!';
            state.status = action.payload.status || null;
        });
    },
});

/** Export something. */
export default stockTradeBluechip.reducer;
