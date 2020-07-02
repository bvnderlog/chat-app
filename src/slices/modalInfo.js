import { createSlice } from '@reduxjs/toolkit';


const modalInfoSlice = createSlice({
    name: 'modalInfo',
    initialState: { channel: null, type: null },
    reducers: {
        hideModal: () => ({ channel: null, type: null }),
        setModalInfo: (state, action) => action.payload,
    },
});

const { reducer, actions } = modalInfoSlice;

export { actions };
export default reducer;
