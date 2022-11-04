import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectUserToken } from 'redux/authorization/selectorsAuth';
import { getCategoriesThunk } from 'redux/categories/thunkCategories';
import { getTransactionsThunk } from 'redux/transactions/thunksTransactions';
import AddTransactionModal from 'components/AddTransaction/AddTransactionModal';
// import { StatisticsTable } from 'components/Statistics/StatisticsTable/StatisticsTable';
import { showModal } from 'redux/modal/modalSlice';
import { selectTransactions } from 'redux/transactions/selectorsTransactions';
import { TransactionTableItem } from 'components/TransactionTableItem/TransactionTableItem';

import css from './Home.module.css';

const Home = () => {

  const dispatch = useDispatch();
  const usertoken = useSelector(selectUserToken);
  const userTransactions = useSelector(selectTransactions);

  useEffect(() => {
    dispatch(getCategoriesThunk());
    dispatch(getTransactionsThunk());
  }, [usertoken, dispatch]);

  const handleOpenModal = () => {
    dispatch(showModal(true));
  };

  const handleEscapeKey = e => {
    if (e.key === 'Escape') {
      dispatch(showModal(false));
      //???????????????????????? stops listen only if click on some elements, maybe needs to fix!!!!!!!!!!!!!!!!!
    }
  };

  return (
    <div className={css.wrraper}>

      <table border="1">
        <caption>Transactions table</caption>

        <thead>
          <tr>
            <th className={css.thl}>Date</th>
            <th className={css.thc}>Type</th>
            <th className={css.thl}>Category</th>
            <th className={css.thl}>Comment</th>
            <th className={css.thr}>Sum</th>
            <th className={css.thr}>Balance</th>
          </tr>
        </thead>

        <tbody>
        {!!userTransactions.length && userTransactions.map(transaction =>
          <TransactionTableItem key={transaction.id} transaction={transaction} />
        )}
        </tbody>

      </table>

      <button
        type="button"
        onClick={handleOpenModal}
        onKeyDown={handleEscapeKey}
        className={css.openModalBtn}
      ></button>

      <AddTransactionModal />
    </div>
  );
};

export default Home;
