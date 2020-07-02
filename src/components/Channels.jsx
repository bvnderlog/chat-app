import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { actions } from '../slices';


const mapStateToProps = (state) => {
    const { channels, currentChannelId } = state;
    return { channels, currentChannelId };
};

const actionMakers = {
    switchChannel: actions.currentChannelId.switchChannel,
    hideModal: actions.modalInfo.hideModal,
    setModalInfo: actions.modalInfo.setModalInfo,
};

const handleChannelSwitch = (props) => () => props.switchChannel(props.id);
const handleChannelAdd = (updateModalInfo) => () => updateModalInfo({ type: 'add' });
const handleChannelRemove = (props) => () => props.setModalInfo(
    { type: 'remove', channel: props.channel },
);
const handleChannelRename = (props) => () => props.setModalInfo(
    { type: 'rename', channel: props.channel },
);

@connect(mapStateToProps, actionMakers)
class Channels extends React.Component {
    showEditButtons(channel) {
        if (!channel.removable) {
            return null;
        }

        const { setModalInfo } = this.props;
        return (
            <>
                <button
                    type="button"
                    className="border-0 btn-link p-0"
                    onClick={handleChannelRemove({ channel, setModalInfo })}
                >-</button>
                <button
                    type="button"
                    className="border-0 btn-link p-0"
                    onClick={handleChannelRename({ channel, setModalInfo })}
                >^</button>
            </>
        );
    }

    renderChannels() {
        const { channels, currentChannelId, switchChannel } = this.props;
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
                        onClick={handleChannelSwitch({ id, switchChannel })}
                        type="button"
                        className={classes}>
                        {name}
                    </button>
                    { this.showEditButtons(channel) }
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
        const { setModalInfo } = this.props;
        return (
            <>
                <div className="d-flex mb-2">
                    <span>Channels</span>
                    <button
                        onClick={handleChannelAdd(setModalInfo)}
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
