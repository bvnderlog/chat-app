import React from 'react';
import { connect } from 'react-redux';
import Channels from './Channels.jsx';
import Chat from './Chat.jsx';
import routes from '../routes.js';
import UserContext from './context.js';
import axios from 'axios';


const mapStateToProps = (state) => {
    const { channels, currentChannelId } = state;
    return { channels, currentChannelId };
}


class App extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {inputText: ''};
    }

    handleChannelClick = (channelId) => () => {
        this.setState({ currentChannelId: channelId });
    }

    handleFormChange = ({ target }) => {
        this.setState({ inputText: target.value });
    }

    handleFormSubmit = async (event) => {
        event.preventDefault();
    
        const { currentChannelId } = this.props;
        const { channelMessagesPath } = routes;

        const url = channelMessagesPath(currentChannelId);
        const data = {
            attributes: {
                channelId: currentChannelId,
                username: this.context,
                content: this.state.inputText,
            }
        }

        await axios.post(url, { data });   
    }

    render() {
        const { inputText } = this.state;
        return (
            <div className="h-100" id="chat">
                <div className="row h-100 pb-3">
                    <Channels onChannelClick={this.handleChannelClick} />
                    <Chat
                        inputText={inputText}
                        onFormChange={this.handleFormChange}
                        onFormSubmit={this.handleFormSubmit}
                    />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(App);
