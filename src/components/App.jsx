import React from 'react';

import Chat from './Chat.jsx';
import Channels from './Channels.jsx';
import UserContext from './context.js';


export default class App extends React.Component {
    static contextType = UserContext;

    render() {
        return (
            <div className="h-100" id="chat">
                <div className="row h-100 pb-3">
                    <Channels />
                    <Chat />
                </div>
            </div>
        );
    }
}
