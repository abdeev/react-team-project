import { useCallback, useEffect } from 'react';

import ReactDOM from 'react-dom';

import ModalBackdrop from './ModalBackdrop/ModalBackdrop';
import PropTypes from 'prop-types';

import css from 'components/Modal/Modal.module.css';

const Modal = ({ children, isModalOpen, setIsModalOpen }) => {
  const handleKeyUpEsc = useCallback(
    event => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    },
    [setIsModalOpen]
  );

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener('keyup', handleKeyUpEsc);
    }

    if (!isModalOpen) {
      window.removeEventListener('keyup', handleKeyUpEsc);
    }

    return () => window.removeEventListener('keyup', handleKeyUpEsc);
  }, [handleKeyUpEsc, isModalOpen]);

  const handleModalCloseClick = () => {
    setIsModalOpen(false);
  };

  const handleBackdropClick = e => {
    if (e.target !== e.currentTarget) return;
    setIsModalOpen(false);
  };

  return ReactDOM.createPortal(
    <>
      {isModalOpen && (
        <div onKeyUp={handleKeyUpEsc}>
          <ModalBackdrop onBackClick={handleBackdropClick}>
            <div className={css.modal}>
              <button
                type="button"
                className={css.closingCross}
                onClick={handleModalCloseClick}
              ></button>
              {children}
            </div>
          </ModalBackdrop>
        </div>
      )}
    </>,
    document.body
  );
};

Modal.propTypes = {
  isAddModalOpen: PropTypes.bool,
  setIsAddModalOpen: PropTypes.func,
};

export default Modal;
