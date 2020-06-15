import React from 'react';
import routes from '../routes.js';
import axios from 'axios';
import _ from 'lodash';


export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inputText: '' };
    }

    handleChange = ({ target }) => {
        this.setState({ inputText: target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { currentChannelId } = this.props;
        const { channelMessagesPath } = routes;

        const url = channelMessagesPath(currentChannelId);
        const data = {
            attributes: {
                id: _.uniqueId(),
                channelId: currentChannelId,
                username: 'badcookie',
                content: event.target.value,
            }
        }
        console.log(data);
        const response = axios.post(url, data);
        console.log(response.data);

        this.setState({ inputText: '' });
    }

    render() {
        const { inputText } = this.state;
        return (
            <div className="mt-auto">
                <form onSubmit={this.handleSubmit} noValidate="" className="">
                    <div className="form-group">
                        <div className="input-group">
                            <input
                                onChange={this.handleChange}
                                name="body"
                                className="form-control"
                                value={inputText}
                            />
                            <div className="d-block invalid-feedback">&nbsp;</div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}