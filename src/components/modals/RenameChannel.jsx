import axios from 'axios';
import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Field, Formik } from 'formik';
import { Modal, FormGroup } from 'react-bootstrap';

import routes from '../../routes';
import { actions } from '../../slices';


const actionMakers = {
    hideModal: actions.modalInfo.hideModal,
    setModalInfo: actions.modalInfo.setModalInfo,
    setHasNetworkError: actions.networkError.setHasNetworkError,
};

const mapStateToProps = (state) => {
    const { modalInfo, networkError } = state;
    return { modalInfo, networkError };
};

const onSubmit = (props) => async (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);

    const {
        modalInfo,
        setHasNetworkError,
        hideModal,
        networkError,
    } = props;
    const url = routes.channelPath(modalInfo.channel.id);
    const data = { attributes: { name: values.body } };

    try {
        await axios.patch(url, { data });
    } catch (error) {
        setHasNetworkError(true);
        return;
    }

    resetForm();
    if (networkError) {
        setHasNetworkError(false);
    }

    hideModal();
};

const RenameChannel = (props) => {
    const { modalInfo, networkError, hideModal } = props;
    const inputClasses = cn({ 'form-control': true, 'is-invalid': networkError });

    const form = (
        <Formik
            initialValues={{ body: modalInfo.channel.name }}
            onSubmit={onSubmit(props)}
        >
            <Form>
                <FormGroup>
                    <Field required name="body" className={inputClasses} />
                    <div className="d-block invalid-feedback">
                        {networkError && 'Network error'}&nbsp;
                    </div>
                </FormGroup>
                <input type="submit" className="btn btn-primary" value="submit" />
            </Form>
        </Formik>
    );

    return (
        <Modal show={modalInfo.type === 'rename'} onHide={hideModal}>
            <Modal.Header closeButton onClick={hideModal}>
                <Modal.Title>Rename</Modal.Title>
            </Modal.Header>
            <Modal.Body>{form}</Modal.Body>
        </Modal>
    );
};

RenameChannel.propTypes = {
    hideModal: PropTypes.func,
    setModalInfo: PropTypes.func,
    networkError: PropTypes.bool,
    modalInfo: PropTypes.object,
};

export default connect(mapStateToProps, actionMakers)(RenameChannel);
