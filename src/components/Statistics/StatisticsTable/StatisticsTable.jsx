import React from 'react';
import { statsArray } from '../json/mock';

import s from '../StatisticsTable/StatisticsTable.module.css';

export const StatisticsTable = ({ transactionsCategories, userTransactions }) => {

  const getColor = () => {
    const backgroundColorItem = ('#' + Math.floor(Math.random() * 16777215).toString(16));
    return backgroundColorItem;
  }

  const handleCategoryCount = (id) => {
    return userTransactions.filter(transaction => transaction.categoryId === id)
      .map(transaction => transaction.amount)
      .reduce((prevAmountOfCategory, amountOfCategory) => prevAmountOfCategory + amountOfCategory, 0);
  }

  const handleCountExpenses = (userTransactions) => {
    return userTransactions.filter(transaction => transaction.type === 'EXPENSE')
      .map(transaction => transaction.amount)
      .reduce((prevAmountOfTransaction, amountOfTransaction) => prevAmountOfTransaction + amountOfTransaction, 0);
  }

  const handleCountIncome = () => {
    return userTransactions.filter(transaction => transaction.type === 'INCOME')
      .map(transaction => transaction.amount)
      .reduce((prevAmountOfTransaction, amountOfTransaction) => prevAmountOfTransaction + amountOfTransaction, 0);
  }

  return (
    <div>
      <table className={s.table}>

        <thead>

          <tr className={s.table__head}>
            <th className={s.table__th__left}>Category</th>
            <th className={s.table__th__right}>Sum</th>
          </tr>

        </thead>

        <tbody>
          {!!transactionsCategories.length && transactionsCategories.map(category =>
              <tr key={category.id}>
                <td>
                  <div className={s.table__container}>
                  {/* <div style={{ backgroundColor: category.color, width: "25px" }}></div> */}
                  <div style={{ backgroundColor: getColor(), width: "25px", height: "25px" }}></div>
                    <div className={s.table__chategory}>{category.name}</div>
                  </div>
                </td>
              <td className={s.table__td__right}>{handleCategoryCount(category.id)}</td>
              </tr>
            )
          }
        </tbody>

        <tfoot>

          <tr className={s.table__tr__summary}>
            <td className={s.table__td__summary}>Expenses:</td>
            {/* <td className={s.table__red__value}>{statsArray.expenseSummary}</td> */}
            <td className={s.table__red__value}>{handleCountExpenses(userTransactions)}</td>
          </tr>

          <tr className={s.table__tr__summary}>
            <td className={s.table__td__summary}>Income:</td>
            {/* <td className={s.table__green__value}>{statsArray.incomeSummary}</td> */}
            <td className={s.table__green__value}>{handleCountIncome(userTransactions)}</td>
          </tr>

        </tfoot>

      </table>

    </div>
  )
};
