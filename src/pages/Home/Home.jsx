import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectUserToken } from 'redux/authorization/selectorsAuth';
import { getCategoriesThunk } from 'redux/categories/thunkCategories';
import { selectCategories } from 'redux/categories/selectCategories';
import { selectTransactions } from 'redux/transactions/selectorsTransactions';
import { getTransactionsThunk } from 'redux/transactions/thunksTransactions';

import { TransactionTableItem } from 'components/TransactionTableItem/TransactionTableItem';

import {
  SortDefault,
  SortByDate,
  SortByType,
  SortByCategory,
  SortByComment,
  SortBySum,
  SortByBalance,
} from './sortTransactions';

import css from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const usertoken = useSelector(selectUserToken);
  const userTransactions = useSelector(selectTransactions);
  const transactionsCategories = useSelector(selectCategories);

  const [sortByDate, setSortByDate] = useState(true);
  const [sortByType, setSortByType] = useState(true);
  const [sortByCategory, setSortByCategory] = useState(true);
  const [sortByComment, setSortByComment] = useState(true);
  const [sortBySum, setSortBySum] = useState(true);
  const [sortByBalance, setSortByBalance] = useState(true);

  const [sortTransactions, setSortTransactions] = useState([]);

  useEffect(() => {
    setSortTransactions(SortDefault(userTransactions));
  }, [userTransactions]);

  useEffect(() => {
    dispatch(getCategoriesThunk());
    dispatch(getTransactionsThunk());
  }, [usertoken, dispatch]);

  return (
    <div className={css.tableWrapper}>
      <table className={css.transactionsTable}>
        <thead>
          <tr className={css.transactionsTable_head}>
            <th
              className={css.table_head__alStart}
              onClick={() =>
                setSortTransactions(
                  SortByDate(userTransactions, sortByDate, setSortByDate)
                )
              }
            >
              Date
            </th>
            <th
              className={css.table_head__alCenter}
              onClick={() =>
                setSortTransactions(
                  SortByType(userTransactions, sortByType, setSortByType)
                )
              }
            >
              Type
            </th>
            <th
              className={css.table_head__alStart}
              onClick={() =>
                setSortTransactions(
                  SortByCategory(
                    userTransactions,
                    transactionsCategories,
                    sortByCategory,
                    setSortByCategory
                  )
                )
              }
            >
              Category
            </th>
            <th
              className={css.table_head__alStart}
              onClick={() =>
                setSortTransactions(
                  SortByComment(
                    userTransactions,
                    sortByComment,
                    setSortByComment
                  )
                )
              }
            >
              Comment
            </th>
            <th
              className={css.table_head__alEnd}
              onClick={() =>
                setSortTransactions(
                  SortBySum(userTransactions, sortBySum, setSortBySum)
                )
              }
            >
              Sum
            </th>
            <th
              className={css.table_head__alEnd}
              onClick={() =>
                setSortTransactions(
                  SortByBalance(
                    userTransactions,
                    sortByBalance,
                    setSortByBalance
                  )
                )
              }
            >
              Balance
            </th>
          </tr>
        </thead>
        <tbody>
          {!!userTransactions.length &&
            sortTransactions.map(transaction => (
              <TransactionTableItem
                className={css.transactionTableRow}
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
