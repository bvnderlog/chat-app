import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { all: [], currentChannelId: 1 },
  reducers: {
    addChannel(state, action) {
      const channelData = action.payload.data.attributes;
      const updatedChannels = [...state.all, channelData];
      return { all: updatedChannels, currentChannelId: channelData.id };
    },
    removeChannel(state, action) {
      const removedChannelId = action.payload;
      const filteredChannels = state.all.filter(
        (channel) => channel.id !== removedChannelId,
      );
      const [firstChannel] = filteredChannels;
      const nextChannelId = (
        state.currentChannelId === removedChannelId
          ? firstChannel.id : state.currentChannelId
      );
      return { all: filteredChannels, currentChannelId: nextChannelId };
    },
    renameChannel(state, action) {
      const { id, name } = action.payload.data.attributes;
      const channel = state.all.find((item) => item.id === id);
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
    [channelsSlice.actions.removeChannel]: (state, action) => {
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
  channels: channelsSlice.reducer,
  modalInfo: modalInfoSlice.reducer,
};

const actions = {
  messages: messagesSlice.actions,
  channels: channelsSlice.actions,
  modalInfo: modalInfoSlice.actions,
};

export { reducers, actions };
