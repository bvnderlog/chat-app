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
import io from 'socket.io-client';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/App.jsx';
import UserContext from './components/context.js';
import { reducers, actions } from './slices';


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);

const { channels, messages, currentChannelId } = gon;

const preloadedState = { channels, messages, currentChannelId };
const store = configureStore({ preloadedState, reducer: reducers });

const username = cookies.get('username');
if (!username) {
    cookies.set('username', faker.internet.userName());
}

const socket = io();
socket.on('newMessage', (data) => store.dispatch(actions.messages.addMessage(data)));

const run = (store) => {
  const mountNode = document.querySelector('.container');
  const username = cookies.get('username');
  render( 
    <Provider store={store}>
      <UserContext.Provider value={username}>
        <App/>
      </UserContext.Provider>
    </Provider>,
    mountNode,
  );
}

run(store);
