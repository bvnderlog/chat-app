import { createSlice } from '@reduxjs/toolkit';


const currentChannelSlice = createSlice({
    name: 'currentChannel',
    initialState: 1,
    reducers: {
        switchChannel: (state, action) => action.payload,
    },
});

const { reducer, actions } = currentChannelSlice;

export { actions };
export default reducer;
