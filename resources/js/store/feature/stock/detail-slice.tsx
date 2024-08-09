/** Vendor. */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/** Error type. */
type Error<T> = {
    error?: T;
    message?: string;
    status?: number;
};

/** Technical type. */
type Technical = {
    price: string;
    change: string;
    volume: string;
    pricerange: string;
    supportlevel: string;
    resistantlevel: string;
    movingaverage: string;
    movingsignal: string;
};

/** Fundamental type. */
type Fundamental = {
    sector: string;
    workingcapital: string;
    netincomeaftertax: string;
    debtassetratio: string;
    priceearningratio: string;
    netprofitmargin: string;
    returnonequity: string;
    dividendyield: string;
};

/** Input detail. */
type Detail = {
    loading: boolean;
    status: number;
    message: string;
    technical: Technical[];
    fundamental: Fundamental[];
    show_message: boolean;
    updated: string;
};

/** Detail input type. */
type InputDetail = {
    symbol: string;
    section: string;
    statement: string;
};

/** Fetch user data from local storage. */
const stockDetailFromStorage = JSON.parse(localStorage.getItem('stock-detail') || '{}');

/** Set inital state. */
const initialState: Detail = {
    loading: false,
    status: 200,
    ...stockDetailFromStorage,
};

/** Login request. */
export const stockDetailRequest = createAsyncThunk<any, InputDetail, { rejectValue: Error<any> }>(
    'stock/detail',
    async (inputData, { rejectWithValue }) => {
        try {
            /** Deconstruct input data. */
            const { symbol, section, statement } = inputData;

            /** Request data from backend. */
            const { data, status } = await axios({
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
                url: `/api/stock-explorer-retrieve`,
                params: { symbol, section, statement },
            });

            /** Save to local storage. */
            if (data) {
                localStorage.setItem('stock-detail', JSON.stringify(data));
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
export const stockDetail = createSlice({
    name: 'stockDetail',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** Detail request case. */
        builder.addCase(stockDetailRequest.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(stockDetailRequest.fulfilled, (state, action: any) => {
            state.loading = false;
            state.technical = action.payload.technical;
            state.fundamental = action.payload.fundamental;
            state.show_message = state.show_message ? action.payload?.show_message : state.show_message;
            state.message = action.payload?.message || 'Something went wrong!';
            state.status = action.payload?.status || null;
            state.updated = action.payload?.updated || null;
        });

        builder.addCase(stockDetailRequest.rejected, (state, action: any) => {
            state.loading = false;
            state.technical = [];
            state.fundamental = [];
            state.show_message = true;
            state.message = action.payload?.message || 'Something went wrong!';
            state.status = action.payload?.status || null;
        });
    },
});

/** Export something. */
export default stockDetail.reducer;
