import { createSlice } from '@reduxjs/toolkit';

const channelsInfoSlice = createSlice({
  name: 'channelsInfo',
  initialState: { channels: [], currentChannelId: 1 },
  reducers: {
    addChannel(state, action) {
      const channelData = action.payload.data.attributes;
      const updatedChannels = [...state.channels, channelData];
      return { channels: updatedChannels, currentChannelId: channelData.id };
    },
    removeChannel(state, action) {
      const removedChannelId = action.payload;
      const filteredChannels = state.channels.filter(
        (channel) => channel.id !== removedChannelId,
      );
      const [lastChannel] = filteredChannels.slice(-1);
      const nextChannelId = (
        state.currentChannelId === removedChannelId
          ? lastChannel.id : state.currentChannelId
      );
      return { channels: filteredChannels, currentChannelId: nextChannelId };
    },
    renameChannel(state, action) {
      const { id, name } = action.payload.data.attributes;
      const channel = state.channels.find((item) => item.id === id);
      channel.name = name;
    },
    switchCurrentChannel(state, action) {
      return { ...state, currentChannelId: action.payload };
    },
  },
});

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
    [channelsInfoSlice.actions.removeChannel]: (state, action) => {
      const id = action.payload;
      return state.filter((message) => message.channelId !== id);
    },
  },
});

const modalInfoSlice = createSlice({
  name: 'modalInfo',
  initialState: { channel: null, type: null },
  reducers: {
    hideModal: () => ({ channel: null, type: null }),
    setModalInfo: (state, action) => action.payload,
  },
});

const reducers = {
  messages: messagesSlice.reducer,
  channelsInfo: channelsInfoSlice.reducer,
  modalInfo: modalInfoSlice.reducer,
};

const actions = {
  messages: messagesSlice.actions,
  channelsInfo: channelsInfoSlice.actions,
  modalInfo: modalInfoSlice.actions,
};

export { reducers, actions };
