// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import '../assets/application.scss';
import faker from 'faker';
// @ts-ignore
import gon from 'gon';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/App.jsx';
import UserContext from './components/context.js';
import slice from './slice.js';


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);

const { channels, messages, currentChannelId } = gon;

const username = cookies.get('username');
if (!username) {
    cookies.set('username', faker.internet.userName());
}

const { reducer, actions } = slice;
const store = configureStore({ reducer });

// const socket = io();
// socket.on('newMessage', (data) => store.dispatch(actions.addMessage(data)));


const run = (channels, messages, currentChannelId) => {
  const mountNode = document.querySelector('.container');
  const username = cookies.get('username');
  render( 
    <UserContext.Provider value={username}>
      <App
        channels={channels}
        messages={messages}
        currentChannelId={currentChannelId}
      />
    </UserContext.Provider>,
    mountNode,
  );
}

run(channels, messages, currentChannelId);
