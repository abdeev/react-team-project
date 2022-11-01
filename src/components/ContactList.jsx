import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectFilteredContacts, selectIsLoading, selectError } from 'redux/contacts/selectorsContacts';
import { getContactsThunk } from 'redux/contacts/thunksContacts';
import { selectIsLoggedIn, selectUserToken } from 'redux/authorization/selectorsAuth';

import { ItemListContact } from './ItemListContact';

export const ContactList = () => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const usertoken = useSelector(selectUserToken);
    const isLoadingStore = useSelector(selectIsLoading);
    const errorStore = useSelector(selectError);
    const filteredContacts = useSelector(selectFilteredContacts);

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        dispatch(getContactsThunk());
    }, [isLoggedIn, usertoken, dispatch]);

    return (
        <div className=" ml-9 grow">
            {isLoadingStore ? <p className="text-2xl text-red-400 font-sm mb-4">Loading data ...</p> : <p className="text-2xl text-green-700 font-sm mb-4">Contacts:</p>}

            {errorStore && <p className="text-2xl text-red-400 font-sm mb-4">Error: {errorStore}</p>}

            <ul className="flex flex-col gap-3">
                {filteredContacts.map(contact => (
                    <ItemListContact key={contact.id} contact={contact}></ItemListContact>
                ))}
            </ul>

        </div>
    )
}