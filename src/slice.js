import { createSlice } from '@reduxjs/toolkit';


const { reducer, actions } = createSlice({
    name: 'messages',
    initialState: [],
    reducers: {
        addMessage: (state, action) => state.push(action.payload.data.attributes),
    },
});

export { actions };
export default reducer;
