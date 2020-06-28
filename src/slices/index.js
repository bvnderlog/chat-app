import networkReducer, { actions as networkActions } from './network';
import channelsReducer, { actions as channelsActions } from './channels';
import messagesReducer, { actions as messagesActions } from './messages';
import currentChannelReducer, { actions as currentChannelActions } from './currentChannel';

const reducers = {
    channels: channelsReducer,
    messages: messagesReducer,
    networkError: networkReducer,
    currentChannelId: currentChannelReducer,
};

const actions = {
    network: networkActions,
    channels: channelsActions,
    messages: messagesActions,
    currentChannelId: currentChannelActions,
};

export { reducers, actions };
