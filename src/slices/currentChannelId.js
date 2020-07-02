import { createSlice } from '@reduxjs/toolkit';


const currentChannelIdSlice = createSlice({
    name: 'currentChannelId',
    initialState: 1,
    reducers: { switchChannel: (state, action) => action.payload },
});

const { reducer, actions } = currentChannelIdSlice;

export { actions };
export default reducer;
