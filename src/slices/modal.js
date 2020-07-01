import { createSlice } from '@reduxjs/toolkit';


const modalSlice = createSlice({
    name: 'modals',
    initialState: { channel: null, type: null },
    reducers: {
        hideModal() {
            return { channel: null, type: null };
        },
        setModalInfo(state, action) {
            const { channel, type } = action.payload;
            return { channel, type };
        },
    },
});

const { reducer, actions } = modalSlice;

export { actions };
export default reducer;
