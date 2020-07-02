import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, FormGroup } from 'react-bootstrap';

import routes from '../../routes';
import { actions } from '../../slices';

const { removeChannel } = actions.channels;
const { setHasNetworkError } = actions.networkError;
const { hideModal, setModalInfo } = actions.modalInfo;

const actionMakers = {
    hideModal,
    setModalInfo,
    removeChannel,
    setHasNetworkError,
};

const mapStateToProps = (state) => {
    const { modalInfo, networkError } = state;
    return { modalInfo, networkError };
};

const onSubmit = (props) => async (event) => {
    event.preventDefault();

    const url = routes.channelPath(props.channelId);
    try {
        await axios.delete(url);
    } catch (error) {
        props.setHasNetworkError(true);
        return;
    }

    if (props.networkError) {
        props.setHasNetworkError(false);
    }

    props.hideModal();
};

const RemoveChannel = (props) => {
    const submitData = {
        channelId: props.modalInfo.channel.id,
        hideModal: props.hideModal,
    };
    return (
        <Modal show={props.modalInfo.type === 'remove'} onHide={props.hideModal}>
            <Modal.Header closeButton onClick={props.hideModal}>
                <Modal.Title>Remove</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={onSubmit(submitData)}>
                    <FormGroup>
                        <input className="btn btn-danger" type="submit" value="remove" />
                    </FormGroup>
                </form>
            </Modal.Body>
        </Modal>
    );
};

RemoveChannel.propTypes = {
    hideModal: PropTypes.func,
    setModalInfo: PropTypes.func,
    networkError: PropTypes.bool,
    modalInfo: PropTypes.object,
};

export default connect(mapStateToProps, actionMakers)(RemoveChannel);
