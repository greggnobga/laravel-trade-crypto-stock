/** Vendor. */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/** Error type. */
type Error<T> = {
    error?: T;
    message?: string;
    status?: number;
};

/** External type. */
type External = {
    show_message: boolean;
    message: string;
    status: number;
};

/** Stock type. */
type Stock = {
    name: string;
    symbol: string;
    price: number;
    change: number;
    volume: number;
};
/** Input chart type. */
type InputStart = {
    token: string;
    input: Stock[];
};

/** Set inital state. */
const initialState: External = {
    message: '',
    show_message: true,
    status: 200,
};

/** Dashboard start request. */
export const dashboardStartRequest = createAsyncThunk<any, InputStart, { rejectValue: Error<any> }>(
    'dashboard/start',
    async (inputData, { rejectWithValue }) => {
        try {
            /** Deconstruct input data. */
            const { token, input } = inputData;

            /** Stringify item before appending. */
            let details = JSON.stringify(input);

            /** Prepare form data. */
            let form_data = new FormData();

            form_data.append('input', details as string);
            form_data.append('table', 'trade' as string);
            form_data.append('statement', 'store' as string);

            /** Send request. */
            const { data, status } = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
                url: '/api/stock-trade-store',
                data: form_data,
            });

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

type InputList = {
    token: string;
};

/** Dashboard list request. */
export const dashboardMetaRequest = createAsyncThunk<any, InputList, { rejectValue: Error<any> }>(
    'dashboard/meta',
    async (inputData, { rejectWithValue }) => {
        try {
            /** Deconstruct input data. */
            const { token } = inputData;

            /** Prepare request to external api data provider. */
            const { data, status } = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
                url: '/stock-reports-retrieve',
                params: { section: 'meta' },
            });

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
export const dashboardExternal = createSlice({
    name: 'dashboardExternal',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** Start request case. */
        builder.addCase(dashboardStartRequest.pending, (state) => {
            state.message = '';
            state.status = -1;
        });

        builder.addCase(dashboardStartRequest.fulfilled, (state, action: any) => {
            state.show_message = state.show_message ? action.payload?.show_message : state.show_message;
            state.message = action.payload?.message || 'Something went wrong!';
            state.status = action.payload?.status || -1;
        });

        builder.addCase(dashboardStartRequest.rejected, (state, action: any) => {
            state.show_message = true;
            state.message = action.payload?.message || 'Something went wrong!';
            state.status = action.payload?.status || -1;
        });

        /** Start meta case. */
        builder.addCase(dashboardMetaRequest.pending, (state) => {
            state.message = '';
            state.status = -1;
        });

        builder.addCase(dashboardMetaRequest.fulfilled, (state, action: any) => {
            state.show_message = state.show_message ? action.payload?.show_message : state.show_message;
            state.message = action.payload?.message || 'Something went wrong!';
            state.status = action.payload?.status || -1;
        });

        builder.addCase(dashboardMetaRequest.rejected, (state, action: any) => {
            state.show_message = true;
            state.message = action.payload?.message || 'Something went wrong!';
            state.status = action.payload?.status || -1;
        });
    },
});

/** Export something. */
export default dashboardExternal.reducer;
