import { createReducer, createSlice } from '@reduxjs/toolkit';


const messagesSlice = createSlice({
    name: 'messages',
    initialState: [],
    reducers: {
        add: (state, action) => state.push(action.payload.message),
    },
});

const { reducer, actions } = messagesSlice;

export { actions };
export default reducer;
