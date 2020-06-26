import React from 'react';

import Chat from './Chat.jsx';
import Channels from './Channels.jsx';


const App = () => (
    <div className="h-100" id="chat">
        <div className="row h-100 pb-3">
            <Channels />
            <Chat />
        </div>
    </div>
);

export default App;
