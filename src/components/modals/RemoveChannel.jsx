import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, FormGroup } from 'react-bootstrap';

import routes from '../../routes';
import { actions } from '../../slices';
import InvalidFeedback from '../InvalidFeedback';


const actionMakers = {
    hideModal: actions.modalInfo.hideModal,
    setHasError: actions.modalError.setHasError,
    setModalInfo: actions.modalInfo.setModalInfo,
    removeChannel: actions.channels.removeChannel,
};

const mapStateToProps = (state) => {
    const { modalInfo, modalError } = state;
    return { modalInfo, modalError };
};

const onSubmit = (props) => async (event) => {
    event.preventDefault();

    const {
        setHasError,
        hideModal,
        channelId,
        modalError,
    } = props;
    const url = routes.channelPath(channelId);

    try {
        await axios.delete(url);
    } catch (error) {
        setHasError(true);
        return;
    }

    if (modalError) {
        setHasError(false);
    }

    hideModal();
};

const RemoveChannel = (props) => {
    const { modalInfo, hideModal, modalError } = props;
    const submitData = { ...props, channelId: modalInfo.channel.id };

    return (
        <Modal show={modalInfo.type === 'remove'} onHide={hideModal}>
            <Modal.Header closeButton onClick={hideModal}>
                <Modal.Title>Remove</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={onSubmit(submitData)}>
                    <FormGroup>
                        <input className="btn btn-danger" type="submit" value="remove" />
                        { modalError && <InvalidFeedback />}
                    </FormGroup>
                </form>
            </Modal.Body>
        </Modal>
    );
};

RemoveChannel.propTypes = {
    hideModal: PropTypes.func,
    modalError: PropTypes.bool,
    modalInfo: PropTypes.object,
};

export default connect(mapStateToProps, actionMakers)(RemoveChannel);
