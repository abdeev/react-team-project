import PropTypes from 'prop-types';
import { useState } from "react";
import { useDispatch } from "react-redux";

import { deleteContactsThunk } from 'redux/contacts/thunksContacts';

import { Modal } from "components/Modal";

export const ItemListContact = ({ contact: { id, name, number } }) => {

    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    const handleOpenModal = event => {
        event.preventDefault();
        setShowModal(true);
    }

    const handleCloseModal = ({ currentTarget, target }) => {
        if (currentTarget === target) {
            setShowModal(false);
        }
    }
    
    const handleCloseModalKeyDown = ({ code }) => {
        if (code === 'Escape') {
            setShowModal(false);
        }
    }

    const handleDeleteContact = (id) => {
        dispatch(deleteContactsThunk(id));
    }

    return (
        <li className="flex justify-between gap-4 items-baseline"><span className="text-2xl font-medium">{name}: {number}</span>
            <div className="flex gap-4">
                <button className="bg-yellow-300 shadow-4x1 rounded-xl border border-solid border-black hover:border-yellow-300 hover:bg-green-500 focus:border-yellow-300 focus:bg-green-500 text-2xl font-medium hover:text-yellow-300 focus:text-yellow-300 active:bg-red-500 py-1 px-5" onClick={handleOpenModal} type="button">Edit</button>
                <button className="bg-yellow-300 shadow-4x1 rounded-xl border border-solid border-black hover:border-yellow-300 hover:bg-green-500 focus:border-yellow-300 focus:bg-green-500 text-2xl font-medium hover:text-yellow-300 focus:text-yellow-300 active:bg-red-500 py-1 px-5" onClick={() => handleDeleteContact(id)} type="button">Delete</button>
            </div>

            {showModal && <Modal
                handleCloseModal={handleCloseModal}
                handleCloseModalKeyDown={handleCloseModalKeyDown}
                setShowModal={setShowModal}
                contact={{id, name, number}}
            />}
        </li>
    )
}

ItemListContact.protoTypes = {
    contact: PropTypes.objectOf({
        id: PropTypes.string,
        name: PropTypes.string,
        number: PropTypes.string,
    }),
};