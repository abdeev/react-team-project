import React from 'react';
import css from 'components/Modal/ModalBackdrop/ModalBackdrop.module.css';

const ModalBackdrop = ({ children, onBackClick, closeModalOnKey }) => {
  return (
    <div
      className={css.backdrop}
      onClick={onBackClick}
      onKeyDown={closeModalOnKey}
    >
      {children}
    </div>
  );
};

export default ModalBackdrop;
