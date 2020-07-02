import modalReducer, { actions as modalInfo } from './modalInfo';
import channelsReducer, { actions as channels } from './channels';
import messagesReducer, { actions as messages } from './messages';
import networkReducer, { actions as networkError } from './networkError';
import currentChannelIdReducer, { actions as currentChannelId } from './currentChannelId';

const reducers = {
    modalInfo: modalReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    networkError: networkReducer,
    currentChannelId: currentChannelIdReducer,
};

const actions = {
    networkError,
    modalInfo,
    channels,
    messages,
    currentChannelId,
};

export { reducers, actions };
