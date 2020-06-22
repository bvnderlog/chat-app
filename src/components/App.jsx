import React from 'react';
import Channels from './Channels.jsx';
import Chat from './Chat.jsx';
import routes from '../routes.js';
import UserContext from './context.js';
import axios from 'axios';


export default class App extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            channels: props.channels,
            currentChannelId: props.currentChannelId,
            messages: props.messages,
            inputText: '',
        };
    }

    handleChannelClick = (channelId) => () => {
        this.setState({ currentChannelId: channelId });
    }

    handleFormChange = ({ target }) => {
        this.setState({ inputText: target.value });
    }

    handleFormSubmit = async (event) => {
        event.preventDefault();
    
        const { currentChannelId } = this.state;
        const { channelMessagesPath } = routes;

        const url = channelMessagesPath(currentChannelId);
        const data = {
            attributes: {
                channelId: currentChannelId,
                username: this.context,
                content: this.state.inputText,
            }
        }

        const response = await axios.post(url, { data });   
        const newMessage = response.data.data.attributes;
        this.setState({ messages: [...this.state.messages, newMessage] });
        this.setState({ inputText: '' });
    }

    render() {
        const {
            channels,
            currentChannelId,
            messages,
            inputText,
        } = this.state;
        const activeMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

        return (
            <div className="h-100" id="chat">
                <div className="row h-100 pb-3">
                    <Channels
                        channels={channels}
                        currentChannelId={currentChannelId}
                        onChannelClick={this.handleChannelClick}
                    />
                    <Chat
                        messages={activeMessages}
                        currentChannelId={currentChannelId}
                        inputText={inputText}
                        onFormChange={this.handleFormChange}
                        onFormSubmit={this.handleFormSubmit}
                    />
                </div>
            </div>
        );
    }
}
