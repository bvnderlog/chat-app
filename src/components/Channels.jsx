import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions as allActions } from '../slices';


const mapStateToProps = (state) => {
    const { channels, currentChannelId } = state;
    return { channels, currentChannelId };
};

const { switchChannel } = allActions.currentChannelId;
const actions = { switchChannel };

@connect(mapStateToProps, actions)
class Channels extends React.Component {
    handleChannelClick = (id) => () => this.props.switchChannel(id);

    renderChannels() {
        const { channels, currentChannelId } = this.props;
        if (channels.length === 0) {
            return null;
        }

        const renderedChannels = channels.map((channel) => {
            const { name, id } = channel;
            const classes = cn({
                btn: true,
                active: id === currentChannelId,
                'nav-link': true,
                'btn-block': true,
                'shadow-none': true,
            });
            return (
                <li key={id} className="nav-item">
                    <button
                        onClick={this.handleChannelClick(id)}
                        type="button"
                        className={classes}>
                        {name}
                    </button>
                </li>
            );
        });

        return (
            <ul className="nav flex-column nav-pills nav-fill">
                {renderedChannels}
            </ul>
        );
    }

    render() {
        return (
            <>
                <div className="d-flex mb-2">
                    <span>Channels</span>
                    <button className="btn btn-link p-0 ml-auto">+</button>
                </div>
                {this.renderChannels()}
            </>
        );
    }
}

Channels.propTypes = {
    channels: PropTypes.array,
    currentChannelId: PropTypes.number,
    switchChannel: PropTypes.func,
};

export default Channels;
