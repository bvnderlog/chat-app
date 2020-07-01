import AddChannel from './AddChannel';

const modalTypes = {
    add: AddChannel,
};

export default (type) => modalTypes[type];
