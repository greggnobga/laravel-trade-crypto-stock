/** Vendor. */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/** Error type. */
type Error<T> = {
    error?: T;
    message?: string;
    status?: number;
};

/** Explorer type. */
type Explorer = {
    symbol: string;
    price: string;
    value: string;
    workingcapital: string;
    netincomeaftertax: string;
    debtassetratio: string;
    priceearningratio: string;
    netprofitmargin: string;
    returnonequity: string;
    dividendyield: string;
};

/** Explorers type. */
type Explorers = {
    message: string;
    pages: number;
    stocks: Explorer[];
    loading: boolean;
    status: number;
    show_message: boolean;
};

/** Input login type. */
type InputExplorer = {
    page: number;
    section: string;
    statement: string;
};

/** Fetch user data from local storage. */
const stockExplorerFromStorage = JSON.parse(localStorage.getItem('stock-explorer') || '{}');

/** Set inital state. */
const initialState: Explorers = {
    loading: false,
    ...stockExplorerFromStorage,
};

/** Explorer request. */
export const stockExplorerRequest = createAsyncThunk<any, InputExplorer, { rejectValue: Error<any> }>(
    'stock/explorer',
    async (inputData, { rejectWithValue }) => {
        try {
            /** Deconstruct input data. */
            const { section, statement, page } = inputData;

            /** Request data from backend. */
            const { data, status } = await axios({
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
                url: `/api/stock-explorer-retrieve`,
                params: { section, statement, page },
            });

            /** Save to local storage. */
            if (data) {
                localStorage.setItem('stock-explorer', JSON.stringify(data));
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
export const stockExplorer = createSlice({
    name: 'stockExplorer',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** Explorer request case. */
        builder.addCase(stockExplorerRequest.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(stockExplorerRequest.fulfilled, (state, action: any) => {
            state.loading = false;
            state.stocks = action.payload.stocks;
            state.show_message = state.show_message ? action.payload?.show_message : state.show_message;
            state.message = action.payload?.message || 'Something went wrong!';
            state.status = action.payload?.status || null;
        });

        builder.addCase(stockExplorerRequest.rejected, (state, action: any) => {
            state.loading = false;
            state.stocks = [];
            state.show_message = true;
            state.message = action.payload?.message || 'Something went wrong!';
            state.status = action.payload?.status || null;
        });
    },
});

/** Export something. */
export default stockExplorer.reducer;
