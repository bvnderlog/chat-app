import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';

import { actions } from '../slices';

const mapStateToProps = (state) => {
  const { channels } = state;
  return { channels };
};

const actionMakers = {
  switchCurrentChannel: actions.channels.switchCurrentChannel,
  hideModal: actions.modalInfo.hideModal,
  setModalInfo: actions.modalInfo.setModalInfo,
};

const handleChannelSwitch = (props) => () => props.switchCurrentChannel(props.id);
const handleChannelAdd = (updateModalInfo) => () => updateModalInfo({ type: 'add' });
const handleChannelRemove = (props) => () => props.setModalInfo(
  { type: 'remove', channel: props.channel },
);
const handleChannelRename = (props) => () => props.setModalInfo(
  { type: 'rename', channel: props.channel },
);

@connect(mapStateToProps, actionMakers)
class Channels extends React.Component {
  renderDropdown(channel) {
    const { channels, setModalInfo } = this.props;
    const { currentChannelId } = channels;

    return (
      <DropdownButton
        as={ButtonGroup}
        variant={channel.id === currentChannelId ? 'primary' : 'link'}
        title={''}
      >
        <Dropdown.Item
          onClick={handleChannelRemove({ channel, setModalInfo })}
        >Remove</Dropdown.Item>
        <Dropdown.Item
          onClick={handleChannelRename({ channel, setModalInfo })}
        >Rename</Dropdown.Item>
      </DropdownButton>
    );
  }

  renderChannelButton(channel) {
    const { channels, switchCurrentChannel } = this.props;
    const { currentChannelId } = channels;

    const { id, name, removable } = channel;

    const commonAttrs = { 'nav-link': true, 'btn-block': true, 'shadow-none': true };
    const channelButtonClasses = cn({ ...commonAttrs, btn: true, active: id === currentChannelId });
    const channelButton = (
      <button
        onClick={handleChannelSwitch({ id, switchCurrentChannel })}
        type="button"
        className={channelButtonClasses}>{name}
      </button>
    );

    if (!removable) {
      return channelButton;
    }

    return (
      <ButtonGroup style={{ width: '100%' }}>
        {channelButton}
        {this.renderDropdown(channel)}
      </ButtonGroup>
    );
  }

  renderChannels() {
    const { channels } = this.props;
    if (channels.all.length === 0) {
      return null;
    }

    const renderedChannels = channels.all.map((channel) => (
      <li key={channel.id} className="nav-item">
        {this.renderChannelButton(channel)}
      </li>
    ));

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

export default Channels;
