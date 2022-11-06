import ModalBackdrop from 'components/AddTransaction/ModalBackdrop/ModalBackdrop';
import { useNavigate } from 'react-router-dom';
import css from './LogoutModal.module.css';

export const LogoutModal = ({ onClose }) => {
  const location = useNavigate();

  const handleLogOut = e => {
    onClose();
    dispatch(logOutThunk());
    location('/');
  };
  const handleCancelLogOut = e => {
    onClose();
  };
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <>
      <ModalBackdrop onBackClick={handleBackdropClick}></ModalBackdrop>
      <div className={css.modal}>
        <p className={css.text}>Are you sure you want to quit?</p>
        <div>
          <button className={css.button} type="button" onClick={handleLogOut}>
            Log out
          </button>
          <button
            className={css.button}
            type="button"
            onClick={handleCancelLogOut}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};
LogoutModal.propTypes = {
  onClose: PropTypes.func,
};
