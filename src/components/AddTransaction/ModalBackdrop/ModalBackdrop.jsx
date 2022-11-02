import React from 'react';
import css from 'components/AddTransaction/ModalBackdrop/ModalBackdrop.module.css';

const ModalBackdrop = ({ children }) => {
  return <div className={css.backdrop}>{children}</div>;
};

export default ModalBackdrop;
