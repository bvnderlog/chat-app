import React from 'react';

const InvalidFeedback = ({ message }) => (
  message ? <div className="d-block invalid-feedback">{message}</div> : null
);

export default InvalidFeedback;
