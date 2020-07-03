import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channels';

const { removeChannel } = channelsActions;

const messagesSlice = createSlice({
    name: 'messages',
    initialState: [],
    reducers: {
        addMessage(state, action) {
            const messageData = action.payload.data.attributes;
            state.push(messageData);
        },
    },
    extraReducers: {
        [removeChannel]: (state, action) => {
            const id = action.payload;
            return state.filter((message) => message.channelId !== id);
        },
    },
});

const { reducer, actions } = messagesSlice;

export { actions };
export default reducer;
