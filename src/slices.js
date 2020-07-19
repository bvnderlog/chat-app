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
      const { removedChannelId } = action.payload;
      return state.filter((channel) => channel.id !== removedChannelId);
    },
    renameChannel(state, action) {
      const { id, name } = action.payload.data.attributes;
      const channel = state.find((item) => item.id === id);
      channel.name = name;
    },
  },
});

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState: 1,
  reducers: { switchChannel: (state, action) => action.payload },
  extraReducers: {
    [channelsSlice.actions.addChannel]: (state, action) => {
      const { id } = action.payload.data.attributes;
      return id;
    },
    [channelsSlice.actions.removeChannel]: (state, action) => {
      const { removedChannelId, nextChannelId } = action.payload;
      return state === removedChannelId ? nextChannelId : state;
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
  currentChannelId: currentChannelSlice.reducer,
};

const actions = {
  messages: messagesSlice.actions,
  channels: channelsSlice.actions,
  modalInfo: modalInfoSlice.actions,
  currentChannelId: currentChannelSlice.actions,
};

export { reducers, actions };
