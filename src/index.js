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
import { reducers, actions } from './slices';
import UserContext from './context';


if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);

const { channels, messages, currentChannelId } = gon;

const preloadedState = {
    channels,
    messages,
    currentChannelId,
    networkError: false,
};
const store = configureStore({ preloadedState, reducer: reducers });

if (!cookies.get('username')) {
    const newUsername = faker.internet.userName();
    cookies.set('username', newUsername, { sameSite: 'strict' });
}

const socket = io();
socket.on('newMessage', (data) => store.dispatch(actions.messages.addMessage(data)));

const username = cookies.get('username');
const node = document.querySelector('.container');

const run = (state, mountNode, user) => {
    render(
        <Provider store={state}>
            <UserContext.Provider value={user}>
                <App />
            </UserContext.Provider>
        </Provider>,
        mountNode,
    );
};

run(store, node, username);
