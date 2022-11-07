import React from 'react';
import PropTypes from 'prop-types';

import css from 'components/AddTransaction/ModalBackdrop/ModalBackdrop.module.css';

const ModalBackdrop = ({ children, onBackClick }) => {
  return (
    <div className={css.backdrop} onClick={onBackClick}>
      {children}
    </div>
  );
};

// import PropTypes from 'prop-types';

ModalBackdrop.propTypes = {
  children: PropTypes.node,
  onBackClick: PropTypes.func,
};

export default ModalBackdrop;
