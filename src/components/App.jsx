import React from 'react';

import Form from './Form';
import Messages from './Messages';
import Channels from './Channels';


const App = () => (
    <div className="h-100" id="chat">
        <div className="row h-100 pb-3">
            <div className="col-3 border-right">
                <Channels />
            </div>
            <div className="col h-100">
                <div className="d-flex flex-column h-100">
                    <Messages />
                    <Form />
                </div>
            </div>
        </div>
    </div>
);

export default App;
