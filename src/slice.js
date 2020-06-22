import { createSlice } from '@reduxjs/toolkit';


const { reducer, actions } = createSlice({
    name: 'messages',
    initialState: [],
    reducers: {
        add: (state, action) => state.push(action.payload.message),
    },
});

export { actions };
export default reducer;
