import channelsReducer, { actions as channelsActions } from './channels.js';
import messagesReducer, { actions as messagesActions } from './messages.js';
import currentChannelReducer, { actions as currentChannelActions } from './currentChannel.js';

const reducers = {
    channels: channelsReducer,
    messages: messagesReducer,
    currentChannelId: currentChannelReducer,
};

const actions = {
    channels: channelsActions,
    messages: messagesActions,
    currentChannelId: currentChannelActions,
};

export { reducers, actions };
