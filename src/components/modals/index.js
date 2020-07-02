// eslint-disable-next-line import/extensions
import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';

const modalTypes = {
    add: AddChannel,
    remove: RemoveChannel,
    rename: RenameChannel,
};

export default (type) => modalTypes[type];
