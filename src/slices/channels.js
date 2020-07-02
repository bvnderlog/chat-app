import { createSlice } from '@reduxjs/toolkit';


const channelsSlice = createSlice({
    name: 'channels',
    initialState: [],
    reducers: {
        addChannel(state, action) {
            const channelData = action.payload.data.attributes;
            state.push(channelData);
        },
        removeChannel(state, action) {
            const channelId = action.payload;
            return state.filter((channel) => channel.id !== channelId);
        },
        renameChannel(state, action) {
            const { id, name } = action.payload.data.attributes;
            const channel = state.find((item) => item.id === id);
            channel.name = name;
        },
    },
});

const { reducer, actions } = channelsSlice;

export { actions };
export default reducer;
