import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer,} from "redux-persist";

import authorizationReducer from './authorization/sliceAuth';
import reducerCategories from './categories/sliceCategories';
import { reducerShowModal } from './modal/modalSlice';
import { reducerTransactions } from './transactions/sliceTransactions';
import { reducerFilter } from './contacts/sliceFilter';
import { reducerContacts } from './contacts/sliceContacts';

import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const authorizationPersistConfig = {
    key: 'wallet',
    storage,
    whitelist: ['userToken'],
}

export const rootReducer = combineReducers({
    authorization: persistReducer(authorizationPersistConfig, authorizationReducer),
    categories: reducerCategories,
    isModalAddTransactionOpen: reducerShowModal,
    transactions: reducerTransactions,



    filter: reducerFilter,
    contacts: reducerContacts,
});