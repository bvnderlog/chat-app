import React from 'react';
import PropTypes from 'prop-types';


const InvalidFeedback = ({ message }) => (
  message ? <div className="d-block invalid-feedback">{message}</div> : null
);

InvalidFeedback.propTypes = { message: PropTypes.string };

export default InvalidFeedback;
