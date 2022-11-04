import PropTypes from 'prop-types';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';

import css from './UpdateTransactionModal.module.css';

export const UpdateTransactionModal = ({ closeModalOnKey, setShowEditModal, transaction: { id, transactionDate, type, categoryId, comment, amount } }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener('keydown', closeModalOnKey);

        return () => {
            window.removeEventListener('keydown', closeModalOnKey);
        }
    }, [closeModalOnKey]);

    const handleModalCloseClick = (event) => {
        if (event.target !== event.currentTarget) {
            return;
        }
        setShowEditModal(false);
    };

    const handleEditContact = (event) => {
        event.preventDefault();
        console.log(event.currentTarget);
    }

    const handleDeleteContact = (event) => {
        console.log(event.target);
    }

    return ReactDOM.createPortal(
        <div className={css.backdrop} onClick={handleModalCloseClick} onKeyDown={closeModalOnKey}>
            <div className={css.modal}>

                <p className="text-4xl font-medium text-center mb-3">Enter new data for:</p>
                <span className="text-lg font-medium">Current comment: {comment}</span>
                <span className="text-lg font-medium">Current amount: {amount}</span>

                <form className="flex flex-col p-7 rounded-xl border border-solid border-black bg-green-300 mt-6" onSubmit={handleEditContact}>

                    <label className="mb-2 text-2xl font-medium text-red-600" htmlFor="comment" >New comment</label>
                    <input className="mb-6 text-2xl font-medium py-1 px-5 rounded-xl border border-black" id="comment" type="text" name="comment" defaultValue={comment} />
                    
                    <label className="mb-2 text-2xl font-medium text-red-600" htmlFor="amount" >New amount</label>
                    <input className="mb-6 text-2xl font-medium py-1 px-5 rounded-xl border border-black" id="amount" type="tel" name="amount" defaultValue={amount} required />

                    <button type="submit">Edit contact</button>

                    <button type="button" onClick={handleDeleteContact}>Delete</button>
                    
                </form>
            </div>
        </div>,
        document.body
    );
}

UpdateTransactionModal.protoTypes = {
    closeModalOnKey: PropTypes.func,
    setShowEditModal: PropTypes.func,
    transaction: PropTypes.objectOf({
        id: PropTypes.string,
        transactionDate: PropTypes.string,
        type: PropTypes.string,
        categoryId: PropTypes.string,
        comment: PropTypes.string,
        amount: PropTypes.number,
    }),
};