import { createSlice } from '@reduxjs/toolkit';


const messagesSlice = createSlice({
    name: 'messages',
    initialState: [],
    reducers: {
        addMessage(state, action) {
            const messageData = action.payload.data.attributes;
            state.push(messageData);
        },
    },
});

const { reducer, actions } = messagesSlice;

export { actions };
export default reducer;
