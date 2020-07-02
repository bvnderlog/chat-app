// eslint-disable-next-line import/extensions
import AddChannel from './AddChannel.jsx';

const modalTypes = {
    add: AddChannel,
};

export default (type) => modalTypes[type];
