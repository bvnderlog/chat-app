// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import '../assets/application.scss';
import faker from 'faker';
// @ts-ignore
import gon from 'gon';
import cookies from 'js-cookie';
// eslint-disable-next-line import/no-extraneous-dependencies
import io from 'socket.io-client';
import { configureStore } from '@reduxjs/toolkit';

import App from './components/App';
import UserContext from './context';
import { reducers, actions } from './slices';

export default () => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const { channels, messages, currentChannelId } = gon;

  const preloadedState = {
    messages,
    modalInfo: { channel: null, type: null },
    channelsInfo: { channels, currentChannelId },
  };

  const store = configureStore({ preloadedState, reducer: reducers });

  if (!cookies.get('username')) {
    const newUsername = faker.internet.userName();
    cookies.set('username', newUsername);
  }

  const socket = io();

  socket.on('newMessage', (data) => {
    store.dispatch(actions.messages.addMessage(data));
  });

  socket.on('newChannel', (data) => {
    store.dispatch(actions.channelsInfo.addChannel(data));
  });

  socket.on('removeChannel', (channel) => {
    const { id } = channel.data;
    store.dispatch(actions.channelsInfo.removeChannel(id));
  });

  socket.on('renameChannel', (data) => {
    store.dispatch(actions.channelsInfo.renameChannel(data));
  });

  const username = cookies.get('username');
  const mountNode = document.querySelector('.container');

  render(
    <Provider store={store}>
      <UserContext.Provider value={username}>
        <App />
      </UserContext.Provider>
    </Provider>,
    mountNode,
  );
};
