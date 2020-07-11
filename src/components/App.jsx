import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from './Form';
import getModal from './modals';
import Messages from './Messages';
import Channels from './Channels';


const mapStateToProps = (state) => ({ modalInfo: state.modalInfo });

const renderModal = (modalInfo) => {
  if (!modalInfo.type) {
    return null;
  }
  const Modal = getModal(modalInfo.type);
  return <Modal />;
};

const App = (props) => (
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
    { renderModal(props.modalInfo) }
  </>
);

App.propTypes = { modalInfo: PropTypes.object };

export default connect(mapStateToProps)(App);
