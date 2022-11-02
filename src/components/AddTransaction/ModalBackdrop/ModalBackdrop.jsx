import React from 'react';
import css from 'components/AddTransaction/ModalBackdrop/ModalBackdrop.module.css';

const ModalBackdrop = ({ children, onBackClick }) => {
  return (
    <div className={css.backdrop} onClick={onBackClick}>
      {children}
    </div>
  );
};

export default ModalBackdrop;
