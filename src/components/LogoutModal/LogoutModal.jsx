import { useDispatch } from 'react-redux';
import { logOutThunk } from 'redux/authorization/thunksAuth';
import ModalBackdrop from 'components/AddTransaction/ModalBackdrop/ModalBackdrop';
import { useNavigate } from 'react-router-dom';
import css from './LogoutModal.module.css';

export const LogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const location = useNavigate();

  const handleLogOut = e => {
    onClose();
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
