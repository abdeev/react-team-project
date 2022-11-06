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
      {userTransactions.length !== 0 ? (
        <table className={css.transactionsTable}>
          <tbody className={css.tableBody}>
            <tr className={css.transactionsTableRow_header}>
              <th
                className={`${css.table_head__alStart} ${css.tableHeaderDate}`}
                onClick={() =>
                  setSortTransactions(
                    SortByDate(userTransactions, sortByDate, setSortByDate)
                  )
                }
              >
                Date
              </th>
              <th
                className={`${css.table_head__alCenter} ${css.tableHeaderType}`}
                onClick={() =>
                  setSortTransactions(
                    SortByType(userTransactions, sortByType, setSortByType)
                  )
                }
              >
                Type
              </th>
              <th
                className={`${css.table_head__alStart} ${css.tableHeaderCategory}`}
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
                className={`${css.table_head__alStart} ${css.tableHeaderComment}`}
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
                className={`${css.table_head__alEnd} ${css.tableHeaderSum}`}
                onClick={() =>
                  setSortTransactions(
                    SortBySum(userTransactions, sortBySum, setSortBySum)
                  )
                }
              >
                Sum
              </th>
              <th
                className={`${css.table_head__alEnd} ${css.tableHeaderBalance}`}
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
      ) : (
        <h2 className={css.noDataText}> Try to add transaction! </h2>
      )}
    </div>
  );
};

export default Home;
