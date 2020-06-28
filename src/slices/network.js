import { createSlice } from '@reduxjs/toolkit';


const networkSlice = createSlice({
    name: 'networkError',
    initialState: false,
    reducers: {
        setHasNetworkError: (state, action) => action.payload,
    },
});

const { reducer, actions } = networkSlice;

export { actions };
export default reducer;
