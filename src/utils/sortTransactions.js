export const SortDefault = (userTransactions) => {
    const transactions = [...userTransactions].sort((prevTransactions, transaction) => {
        const prev = new Date(prevTransactions.transactionDate);
        const current = new Date(transaction.transactionDate);
        
        return current - prev;
    });

    return transactions;
}


export const SortByDate = (userTransactions, sortByDate, setSortByDate) => {
    setSortByDate(!sortByDate);

    const transactions = [...userTransactions].sort((prevTransactions, transaction) => {
        const prev = new Date(prevTransactions.transactionDate);
        const current = new Date(transaction.transactionDate);
        
        return sortByDate ? prev - current : current - prev;
    });

    return transactions;
}

export const SortByType = (userTransactions, sortByType, setSortByType) => {
    setSortByType(!sortByType);

    const typeEXPENSE = userTransactions.filter(transaction => transaction.type === 'EXPENSE');
    const typeINCOME = userTransactions.filter(transaction => transaction.type === 'INCOME');

    const typeEXPENSEbyDate = [...typeEXPENSE].sort((prevTransactions, transaction) => {
        const prev = new Date(prevTransactions.transactionDate);
        const current = new Date(transaction.transactionDate);
        
        return sortByType ? prev - current : current - prev;
    });

    const typeINCOMEbyDate = [...typeINCOME].sort((prevTransactions, transaction) => {
        const prev = new Date(prevTransactions.transactionDate);
        const current = new Date(transaction.transactionDate);
        
        return sortByType ? current - prev : prev - current;
    });

    return sortByType ? [...typeINCOMEbyDate, ...typeEXPENSEbyDate] : [...typeEXPENSEbyDate, ...typeINCOMEbyDate];
}

export const SortByCategory = (userTransactions, transactionsCategories, sortByCategory, setSortByCategory) => {
    setSortByCategory(!sortByCategory);

    const transactions = [...userTransactions].sort((prevTransactions, transaction) => {
        const prev = transactionsCategories.filter(category => category.id === prevTransactions.categoryId)[0].name;
        const current = transactionsCategories.filter(category => category.id === transaction.categoryId)[0].name;
        
        return sortByCategory ? prev.localeCompare(current) : current.localeCompare(prev);
    });

    return transactions;
}

export const SortByComment = (userTransactions, sortByComment, setSortByComment) => {
    setSortByComment(!sortByComment);

    const transactions = [...userTransactions].sort((prevTransactions, transaction) => {
        const prev = prevTransactions.comment;
        const current = transaction.comment;
        
        return sortByComment ? prev.localeCompare(current) : current.localeCompare(prev);
    });

    return transactions;
}

export const SortBySum = (userTransactions, sortBySum, setSortBySum) => {
    setSortBySum(!sortBySum);

    const transactions = [...userTransactions].sort((prevTransactions, transaction) => {
        const prev = prevTransactions.amount;
        const current = transaction.amount;
        
        return sortBySum ? current - prev : prev - current;
    });

    return transactions;
}

export const SortByBalance = (userTransactions, sortByBalance, setSortByBalance) => {
    setSortByBalance(!sortByBalance);

    const transactions = [...userTransactions].sort((prevTransactions, transaction) => {
        const prev = prevTransactions.balanceAfter;
        const current = transaction.balanceAfter;
        
        return sortByBalance ? current - prev : prev - current;
    });

    return transactions;
}