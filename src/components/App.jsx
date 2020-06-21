import React from 'react';
import Channels from './Channels.jsx';
import Chat from './Chat.jsx';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channels: props.channels,
            currentChannelId: props.currentChannelId,
            messages: props.messages,
        };
    }

    onChannelClick = (channelId) => () => {
        this.setState({ currentChannelId: channelId });
    }

    render() {
        const { channels, currentChannelId, messages } = this.state;
        const activeMessages = messages.filter(({ channelId }) => channelId === currentChannelId);
        return (
            <div className="h-100" id="chat">
                <div className="row h-100 pb-3">
                    <Channels
                        channels={channels}
                        currentChannelId={currentChannelId}
                        onChannelClick={this.onChannelClick}
                    />
                    <Chat messages={activeMessages} />
                </div>
            </div>
        );
    }
}
