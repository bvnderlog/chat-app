import axios from 'axios';
import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Field, Formik } from 'formik';
import { Modal, FormGroup } from 'react-bootstrap';

import routes from '../../routes';
import { actions } from '../../slices';

const { setHasNetworkError } = actions.networkError;
const { hideModal, setModalInfo } = actions.modalInfo;
const actionMakers = { hideModal, setModalInfo, setHasNetworkError };

const mapStateToProps = (state) => {
    const { modalInfo, networkError } = state;
    return { modalInfo, networkError };
};

const onSubmit = (props) => async (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);

    const url = routes.channelPath(props.modalInfo.channel.id);
    const data = { attributes: { name: values.body } };

    try {
        await axios.patch(url, { data });
    } catch (error) {
        props.setHasNetworkError(true);
        return;
    }

    resetForm();
    if (props.networkError) {
        props.setHasNetworkError(false);
    }

    props.hideModal();
};

const RenameChannel = (props) => {
    const inputClasses = cn({
        'form-control': true,
        'is-invalid': props.networkError,
    });

    const form = (
        <Formik
            initialValues={{ body: props.modalInfo.channel.name }}
            onSubmit={onSubmit(props)}
        >
            <Form>
                <FormGroup>
                    <Field required name="body" className={inputClasses} />
                    <div className="d-block invalid-feedback">
                        {props.networkError && 'Network error'}
                        &nbsp;
                    </div>
                </FormGroup>
                <input type="submit" className="btn btn-primary" value="submit" />
            </Form>
        </Formik>
    );

    return (
        <Modal show={props.modalInfo.type === 'rename'} onHide={props.hideModal}>
            <Modal.Header closeButton onClick={props.hideModal}>
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
