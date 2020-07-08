import AddChannel from './AddChannel';
import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';

const modalTypes = {
  add: AddChannel,
  remove: RemoveChannel,
  rename: RenameChannel,
};

export default (type) => modalTypes[type];
