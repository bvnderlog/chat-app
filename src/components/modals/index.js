// eslint-disable-next-line import/extensions
import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel';

const modalTypes = {
    add: AddChannel,
    remove: RemoveChannel,
};

export default (type) => modalTypes[type];
