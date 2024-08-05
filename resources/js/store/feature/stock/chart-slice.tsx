/** Vendor. */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/** Error type. */
type Error<T> = {
    error?: T;
    message?: string;
    status?: number;
};

/** Chart type. */
type Chart = {
    symbol: string;
    date: string;
    supportlevel: string;
    resistantlevel: string;
    movingaverage: string;
    movingsignal: string;
};

/** Chart type. */
type Stocks = {
    message: string;
    stocks: Chart[];
    pages: number;
    loading: boolean;
    status: number;
    show_message: boolean;
};

/** Input chart type. */
type InputChart = {
    page: number;
    token: string;
    section: string;
    statement: string;
};

/** Fetch user data from local storage. */
const stockChartFromStorage = JSON.parse(localStorage.getItem('stock-chart') || '{}');

/** Set inital state. */
const initialState = {
    loading: false,
    ...stockChartFromStorage,
};

/** Chart request. */
export const stockChartRequest = createAsyncThunk<any, InputChart, { rejectValue: Error<any> }>(
    'stock/chart',
    async (inputData, { rejectWithValue }) => {
        try {
            /** Deconstruct input data. */
            const { page, token, section, statement } = inputData;

            /** Request data from backend. */
            const { data, status } = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
                url: `/api/stock-chart-retrieve`,
                params: { page, section, statement },
            });

            /** Save to local storage. */
            if (data) {
                localStorage.setItem('stock-chart', JSON.stringify(data));
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
export const stockChart = createSlice({
    name: 'stockChart',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** Chart request case. */
        builder.addCase(stockChartRequest.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(stockChartRequest.fulfilled, (state, action: any) => {
            state.loading = false;
            state.stocks = action.payload.stocks || [];
            state.pages = action.payload.pages || null;
            state.show_message = state.show_message ? action.payload?.show_message : state.show_message;
            state.message = action.payload?.message || 'Something went wrong!';
            state.status = action.payload?.status || null;
        });

        builder.addCase(stockChartRequest.rejected, (state, action: any) => {
            state.loading = false;
            state.stocks = [];
            state.show_message = true;
            state.message = action.payload?.message || 'Something went wrong!';
            state.status = action.payload?.status || null;
        });
    },
});

/** Export something. */
export default stockChart.reducer;
