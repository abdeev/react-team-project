import PropTypes from 'prop-types';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';

import { editContactsThunk } from 'redux/contacts/thunksContacts';

export const Modal = ({ handleCloseModal, handleCloseModalKeyDown, setShowModal, contact: { id, name, number } }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener('keydown', handleCloseModalKeyDown);

        return () => {
            window.removeEventListener('keydown', handleCloseModalKeyDown);
        }
    }, [handleCloseModalKeyDown]);

    const handleEditContact = event => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const { name, number } = Object.fromEntries(formData);

        const contact = {
            id,
            name,
            number,
        };

        dispatch(editContactsThunk(contact));
        event.target.reset();
        setShowModal(false);
    }

    return ReactDOM.createPortal(
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-backdrop" onClick={handleCloseModal} onKeyDown={handleCloseModalKeyDown}>
            <div className="flex flex-col py-10 px-20 bg-white rounded-xl border-2 border-solid border-yellow-300">

                <p className="text-4xl font-medium text-center mb-3">Enter new data for:</p>
                <span className="text-lg font-medium">Name contact: {name}</span>
                <span className="text-lg font-medium">Number contact: {number}</span>

                <form className="flex flex-col p-7 rounded-xl border border-solid border-black bg-green-300 mt-6" onSubmit={handleEditContact} >

                    <label className="mb-2 text-2xl font-medium text-red-600" htmlFor="name" >Name</label>
                    <input className="mb-6 text-2xl font-medium py-1 px-5 rounded-xl border border-black" id="name" type="text" name="name" defaultValue={name} pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$" placeholder="Enter name"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan" required />
                    
                    <label className="mb-2 text-2xl font-medium text-red-600" htmlFor="phone" >Number</label>
                    <input className="mb-6 text-2xl font-medium py-1 px-5 rounded-xl border border-black" id="phone" type="tel" name="number" defaultValue={number} pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +" placeholder="000-000-0000" required />

                    <button className="bg-yellow-300 shadow-4x1 rounded-xl border border-solid border-black hover:border-yellow-300 hover:bg-green-500 focus:border-yellow-300 focus:bg-green-500 text-2xl font-medium hover:text-yellow-300 focus:text-yellow-300 active:bg-red-500 py-1 px-5" type="submit">Edit contact</button>

                </form>
            </div>
        </div>,
        document.body
    );
}

Modal.protoTypes = {
    handleCloseModalKeyDown: PropTypes.func,
    handleCloseModal: PropTypes.func,
    contact: PropTypes.objectOf({
        id: PropTypes.string,
        name: PropTypes.string,
        number: PropTypes.string,
    }),
};