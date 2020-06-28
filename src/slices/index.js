import channelsReducer, { actions as channelsActions } from './channels';
import messagesReducer, { actions as messagesActions } from './messages';
import currentChannelReducer, { actions as currentChannelActions } from './currentChannel';

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
