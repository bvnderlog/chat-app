import React from 'react';
import { useSelector } from 'react-redux';

import Form from './Form';
import getModal from './modals';
import Messages from './Messages';
import Channels from './Channels';


const renderModal = (modalInfo) => {
  if (!modalInfo.type) {
    return null;
  }
  const Modal = getModal(modalInfo.type);
  return <Modal />;
};

const getModalInfo = (state) => state.modalInfo;

const App = () => {
  const modalInfo = useSelector(getModalInfo);
  return (
    <>
      <div className="h-100" id="chat">
        <div className="row h-100 pb-3">
          <div className="col-3 border-right">
            <Channels />
          </div>
          <div className="col h-100">
            <div className="d-flex flex-column h-100">
              <Messages />
              <Form />
            </div>
          </div>
        </div>
      </div>
      {renderModal(modalInfo)}
    </>
  );
};

export default App;
