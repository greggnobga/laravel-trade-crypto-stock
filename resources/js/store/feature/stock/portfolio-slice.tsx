/** Vendor. */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/** Error type. */
type Error<T> = {
    error?: T;
    message?: string;
    status?: number;
};

/** Order type. */
type Order = {
    symbol: string;
    date: string;
    order: string;
    fee: string;
    share: string;
    capital: string;
};

/** Hold type. */
type Hold = {
    symbol: string;
    share: string;
    fee: string;
    capital: string;
    average: string;
    price: string;
    prospect: string;
};

/** Portfolio type. */
type Portfolio = {
    message: string;
    order: Order[];
    hold: Hold[];
    pages: number;
    loading: boolean;
    status: number;
    show_message: boolean;
};

/** Input portfolio type. */
type InputPortfolio = {
    page: number;
    token: string;
    section: string;
};

/** Fetch user data from local storage. */
const stockPortfolioFromStorage = JSON.parse(localStorage.getItem('stock-portfolio') || '{}');

/** Set inital state. */
const initialState: Portfolio = {
    loading: false,
    ...stockPortfolioFromStorage,
};

/** Portfolio request. */
export const stockPortfolioRequest = createAsyncThunk<any, InputPortfolio, { rejectValue: Error<any> }>(
    'stock/portfolio',
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
                url: `/api/stock-portfolio-retrieve`,
                params: { page, section },
            });

            /** Save to local storage. */
            if (data) {
                localStorage.setItem('stock-portfolio', JSON.stringify(data));
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
export const stockPortfolio = createSlice({
    name: 'stockPortfolio',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** Portfolio request case. */
        builder.addCase(stockPortfolioRequest.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(stockPortfolioRequest.fulfilled, (state, action: any) => {
            state.loading = false;
            state.order = action.payload.order || [];
            state.hold = action.payload.hold || [];
            state.pages = action.payload.pages || null;
            state.show_message = state.show_message ? action.payload?.show_message : state.show_message;
            state.message = action.payload?.message || 'Something went wrong!';
            state.status = action.payload?.status || null;
        });

        builder.addCase(stockPortfolioRequest.rejected, (state, action: any) => {
            state.loading = false;
            state.order = [];
            state.hold = [];
            state.show_message = true;
            state.message = action.payload?.message || 'Something went wrong!';
            state.status = action.payload?.status || null;
        });
    },
});

/** Export something. */
export default stockPortfolio.reducer;
