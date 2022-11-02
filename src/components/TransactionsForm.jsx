import { useDispatch } from "react-redux";

import { addTransactionThunk } from "redux/transactions/thunksTransactions";

export const TransactionsForm = () => {

    const dispatch = useDispatch();

    const handleAddName = event => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const { transactionDate, type, categoryId, comment, amount } = Object.fromEntries(formData);

        const transaction = {
            transactionDate,
            type,
            categoryId,
            comment,
            amount,
        };

        dispatch(addTransactionThunk(transaction));
        event.target.reset();
    }

    return (
        <form className='flex flex-col p-5 rounded-xl border border-solid border-black bg-green-300' onSubmit={handleAddName} >

            <label className="mb-2 text-2xl font-sm text-red-600" htmlFor="date" >Date | YYYY-MM-DD |</label>
            <input className="mb-4 text-2xl font-sm py-1 px-5 rounded-xl border border-black" id="date" type="text" name="transactionDate" 
                placeholder="YYYY-MM-DD" required />

            <label className="mb-2 text-2xl font-sm text-red-600" htmlFor="type" >Type | INCOME / EXSPENS |</label>
            <input className="mb-4 text-2xl font-sm py-1 px-5 rounded-xl border border-black" id="type" type="text" name="type" 
                placeholder="INCOME/EXSPENS" required />
            
            <label className="mb-2 text-2xl font-sm text-red-600" htmlFor="categoryId" >Category | categoryId |</label>
            <input className="mb-4 text-2xl font-sm py-1 px-5 rounded-xl border border-black" id="categoryId" type="text" name="categoryId" 
                placeholder="categoryId" required />
            
            <label className="mb-2 text-2xl font-sm text-red-600" htmlFor="comment" >Comment</label>
            <input className="mb-4 text-2xl font-sm py-1 px-5 rounded-xl border border-black" id="comment" type="text" name="comment" 
                placeholder="Enter your comment" required />
            
            <label className="mb-2 text-2xl font-sm text-red-600" htmlFor="amount" >Sum | +XXX / -XXX |</label>
            <input className="mb-4 text-2xl font-sm py-1 px-5 rounded-xl border border-black" id="amount" type="text" name="amount" 
                placeholder="Enter sum" required />

            <button className="bg-yellow-300 shadow-4x1 rounded-xl border border-solid border-black hover:border-yellow-300 hover:bg-green-500 focus:border-yellow-300 focus:bg-green-500 text-2xl font-medium hover:text-yellow-300 focus:text-yellow-300 active:bg-red-500 py-1 px-5" type="submit">Add transaction</button>

        </form>
    )
}