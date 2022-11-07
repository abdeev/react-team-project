import React from 'react';
import PropTypes from 'prop-types';

import css from 'components/Modal/ModalBackdrop/ModalBackdrop.module.css';

const ModalBackdrop = ({ children, onBackClick }) => {
  return (
    <div className={css.backdrop} onClick={onBackClick}>
      {children}
    </div>
  );
};

ModalBackdrop.propTypes = {
  children: PropTypes.node,
  onBackClick: PropTypes.func,
};

export default ModalBackdrop;
