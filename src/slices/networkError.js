import { createSlice } from '@reduxjs/toolkit';


const networkErrorSlice = createSlice({
    name: 'networkError',
    initialState: false,
    reducers: { setHasNetworkError: (state, action) => action.payload },
});

const { reducer, actions } = networkErrorSlice;

export { actions };
export default reducer;
