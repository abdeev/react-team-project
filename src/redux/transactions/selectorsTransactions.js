// import { createSelector } from "@reduxjs/toolkit";

// export const selectTransactionsDate = state => state.transactions.transactions.transactionDate;
// export const selectTransactionsType = state => state.transactions.transactions.type;
// export const selectTransactionsCategoryId = state => state.transactions.transactions.categoryId;
// export const selectTransactionsComment = state => state.transactions.transactions.comment;
// export const selectTransactionsAmount = state => state.transactions.transactions.amount;

export const selectTransactions = state => state.transactions.transactions.items;
export const selectTransactionsIsLoading = state => state.transactions.transactions.isLoading;

// export const selectFilter = state => state.filter.filter;

// export const selectFilteredContacts = createSelector([selectContacts, selectFilter], (contacts, filter) => {
//     return contacts.filter(contact => (contact.name.toLowerCase().includes(filter)));
// });