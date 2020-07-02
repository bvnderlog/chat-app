import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions as allActions } from '../slices';


const mapStateToProps = (state) => {
    const { channels, currentChannelId } = state;
    return { channels, currentChannelId };
};

const { hideModal, setModalInfo } = allActions.modalInfo;
const { switchChannel } = allActions.currentChannelId;
const actions = { switchChannel, hideModal, setModalInfo };


@connect(mapStateToProps, actions)
class Channels extends React.Component {
    handleChannelSwitch = (id) => () => this.props.switchChannel(id);

    handleChannelAdd = () => this.props.setModalInfo({ type: 'add' });

    handleChannelRemove = (channel) => () => this.props.setModalInfo({ type: 'remove', channel });

    showRemoveButton = (channel) => {
        if (!channel.removable) {
            return null;
        }
        return (
            <button
                type="button"
                className="border-0 btn-link p-0"
                onClick={this.handleChannelRemove(channel)}
            >-</button>
        );
    }

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
                        onClick={this.handleChannelSwitch(id)}
                        type="button"
                        className={classes}>
                        {name}
                    </button>
                    { this.showRemoveButton(channel) }
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
                    <button
                        onClick={this.handleChannelAdd}
                        className="btn btn-link p-0 ml-auto"
                    >+</button>
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
    setModalInfo: PropTypes.func,
};

export default Channels;
