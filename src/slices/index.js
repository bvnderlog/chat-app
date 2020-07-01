import modalReducer, { actions as modalActions } from './modal';
import networkReducer, { actions as networkActions } from './network';
import channelsReducer, { actions as channelsActions } from './channels';
import messagesReducer, { actions as messagesActions } from './messages';
import currentChannelReducer, { actions as currentChannelActions } from './currentChannel';

const reducers = {
    modalInfo: modalReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    networkError: networkReducer,
    currentChannelId: currentChannelReducer,
};

const actions = {
    network: networkActions,
    modalInfo: modalActions,
    channels: channelsActions,
    messages: messagesActions,
    currentChannelId: currentChannelActions,
};

export { reducers, actions };
