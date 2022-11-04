import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectIsLoggedIn,
  selectUserToken,
} from 'redux/authorization/selectorsAuth';
import { getCategoriesThunk } from 'redux/categories/thunkCategories';
import { selectTransactions } from 'redux/transactions/selectorsTransactions';
import { getTransactionsThunk } from 'redux/transactions/thunksTransactions';
// import AddTransactionModal from 'components/AddTransaction/AddTransactionModal';
// import { StatisticsTable } from 'components/Statistics/StatisticsTable/StatisticsTable';
import { TransactionTableItem } from 'components/TransactionTableItem/TransactionTableItem';
// import { showModal } from 'redux/modal/modalSlice';

import css from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const usertoken = useSelector(selectUserToken);

  const userTransactions = useSelector(selectTransactions);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(getCategoriesThunk());
    dispatch(getTransactionsThunk());
  }, [isLoggedIn, usertoken, dispatch]);

  return (
    <div className={css.tableWrapper}>
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
          {!!userTransactions.length &&
            userTransactions.map(transaction => (
              <TransactionTableItem
                key={transaction.id}
                transaction={transaction}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
