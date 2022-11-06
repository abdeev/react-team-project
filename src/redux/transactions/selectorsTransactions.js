export const selectTransactions = state => state.transactions.transactions.items;
export const selectTransactionsIsLoading = state => state.transactions.transactions.isLoading;
export const selectTransactionsIsEditing = state => state.transactions.transactions.isLoading;
export const selectTransactionsIsDeleting = state => state.transactions.transactions.isLoading;