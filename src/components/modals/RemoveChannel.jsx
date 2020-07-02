import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, FormGroup } from 'react-bootstrap';

import routes from '../../routes';
import { actions } from '../../slices';


const actionMakers = {
    hideModal: actions.modalInfo.hideModal,
    setModalInfo: actions.modalInfo.setModalInfo,
    removeChannel: actions.channels.removeChannel,
    setHasNetworkError: actions.networkError.setHasNetworkError,
};

const mapStateToProps = (state) => {
    const { modalInfo, networkError } = state;
    return { modalInfo, networkError };
};

const onSubmit = (props) => async (event) => {
    event.preventDefault();

    const { setHasNetworkError, hideModal, channelId } = props;
    const url = routes.channelPath(channelId);

    try {
        await axios.delete(url);
    } catch (error) {
        setHasNetworkError(true);
        return;
    }

    if (props.networkError) {
        setHasNetworkError(false);
    }

    hideModal();
};

const RemoveChannel = (props) => {
    const {
        modalInfo,
        hideModal,
        networkError,
    } = props;
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
                        <div className="d-block invalid-feedback">
                            {networkError && 'Network error'}&nbsp;
                        </div>
                    </FormGroup>
                </form>
            </Modal.Body>
        </Modal>
    );
};

RemoveChannel.propTypes = {
    hideModal: PropTypes.func,
    networkError: PropTypes.bool,
    modalInfo: PropTypes.object,
};

export default connect(mapStateToProps, actionMakers)(RemoveChannel);
