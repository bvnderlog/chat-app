import { createSlice } from '@reduxjs/toolkit';

const modalErrorSlice = createSlice({
  name: 'modalError',
  initialState: false,
  reducers: { setHasError: (state, action) => action.payload },
});

const formErrorSlice = createSlice({
  name: 'formError',
  initialState: false,
  reducers: { setHasError: (state, action) => action.payload },
});

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState: 1,
  reducers: { switchChannel: (state, action) => action.payload },
});

const modalInfoSlice = createSlice({
  name: 'modalInfo',
  initialState: { channel: null, type: null },
  reducers: {
    hideModal: () => ({ channel: null, type: null }),
    setModalInfo: (state, action) => action.payload,
  },
});

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

const reducers = {
  formError: formErrorSlice.reducer,
  modalError: modalErrorSlice.reducer,
  messages: messagesSlice.reducer,
  channels: channelsSlice.reducer,
  modalInfo: modalInfoSlice.reducer,
  currentChannelId: currentChannelSlice.reducer,
};

const actions = {
  formError: formErrorSlice.actions,
  modalError: modalErrorSlice.actions,
  messages: messagesSlice.actions,
  channels: channelsSlice.actions,
  modalInfo: modalInfoSlice.actions,
  currentChannelId: currentChannelSlice.actions,
};

export { reducers, actions };
