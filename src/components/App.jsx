import React from 'react';
import Channels from './Channels.jsx';
import Chat from './Chat.jsx';


const App = (props) => {
    const { channels } = props;
    return (
        <div className="h-100" id="chat">
            <div className="row h-100 pb-3">
                <Channels channels={channels}/>
                <Chat />
            </div>
        </div>
    );
};

export default App;
