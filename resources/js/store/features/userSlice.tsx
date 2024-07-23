import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    id: number;
    name: string;
}

interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: [],
};

export const fetchLoginUser = createAsyncThunk('user/fetch', async (thunkAPI) => {
    const response = await fetch('http://trade.hermes.pod/debug', {
        method: 'GET',
    });
    const data = response.json();
    return data;
});

// export const savePerson = createAsyncThunk('person/save', async (name: string, thunkAPI) => {
//     const response = await fetch('http://localhost:8000/person', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             name,
//         }),
//     });
//     const data = await response.json();
//     return data;
// });

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin: (state, action: PayloadAction<{ name: string }>) => {
            state.users.push({
                id: state.users.length,
                name: action.payload.name,
            });
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchPerson.fulfilled, (state, action) => {
    //         state.persons = action.payload;
    //     });

    //     builder.addCase(savePerson.fulfilled, (state, action) => {
    //         state.persons.push(action.payload);
    //     });
    // },
});

export default UserSlice.reducer;
export const { userLogin } = UserSlice.actions;
