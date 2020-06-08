// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import '../assets/application.scss';

// import faker from 'faker';
// @ts-ignore
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';
import App from './components/App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

console.log('it works!');
console.log('gon', gon);

const { channels, messages, currentChannelId } = gon;

const run = (channels, messages, currentChannelId) => {
  const mountNode = document.querySelector('.container');
  render( 
    <App
      channels={channels}
      messages={messages}
      currentChannelId={currentChannelId}
    />,
    mountNode,
  );
}

run(channels, messages, currentChannelId);
