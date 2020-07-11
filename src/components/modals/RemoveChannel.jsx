import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Formik } from 'formik';
import { Modal, FormGroup } from 'react-bootstrap';

import routes from '../../routes';
import { actions } from '../../slices';
import InvalidFeedback from '../InvalidFeedback';


const actionMakers = {
  hideModal: actions.modalInfo.hideModal,
  setModalInfo: actions.modalInfo.setModalInfo,
  removeChannel: actions.channels.removeChannel,
};

const mapStateToProps = (state) => {
  const { modalInfo } = state;
  return { modalInfo };
};

const onSubmit = (props) => async (values, formActions) => {
  const { hideModal, channelId } = props;
  const { setSubmitting, setErrors } = formActions;
  const url = routes.channelPath(channelId);

  try {
    await axios.delete(url);
  } catch (error) {
    setErrors({ body: 'Network error' });
    return;
  }

  hideModal();
  setSubmitting(false);
};

const RemoveChannel = (props) => {
  const { modalInfo, hideModal } = props;
  const submitData = { ...props, channelId: modalInfo.channel.id };

  const form = (
    <Formik onSubmit={onSubmit(submitData)} initialValues={{}}>
      {({ errors }) => (
        <Form>
          <FormGroup>
            <input className="btn btn-danger" type="submit" value="remove" />
            {<InvalidFeedback message={errors.body} />}
          </FormGroup>
        </Form>
      )}
    </Formik>
  );

  return (
    <Modal show={modalInfo.type === 'remove'} onHide={hideModal}>
      <Modal.Header closeButton onClick={hideModal}>
        <Modal.Title>Remove</Modal.Title>
      </Modal.Header>
      <Modal.Body>{form}</Modal.Body>
    </Modal>
  );
};

RemoveChannel.propTypes = {
  hideModal: PropTypes.func,
  modalInfo: PropTypes.object,
};

export default connect(mapStateToProps, actionMakers)(RemoveChannel);
