import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectExpenseSummary,
  selectIncomeSummary,
  selectIsLoading,
} from 'redux/statistics/selectorsStatistics';
import { nanoid } from 'nanoid';

import s from '../StatisticsTable/StatisticsTable.module.css';
import { Puff } from 'react-loader-spinner';

export const StatisticsTable = ({ tableData }) => {
  const expenseSummary = useSelector(selectExpenseSummary);
  const incomeSummary = useSelector(selectIncomeSummary);
  const isLoading = useSelector(selectIsLoading);

  return (
    <div>
      <table className={s.table}>
        <tbody>
          <tr className={s.table__head}>
            <th className={s.table__th__left}>Category</th>
            <th className={s.table__th__right}>Sum</th>
          </tr>
          {tableData.map(el => {
            return (
              <tr key={nanoid()}>
                <td width="250px" className={s.table__container}>
                  {isLoading ? (
                    <Puff
                      type="Puff"
                      color={el.backgroundColor}
                      height={25}
                      width={25}
                      timeout={3000}
                    />
                  ) : (
                    <div
                      style={{
                        backgroundColor: el.backgroundColor,
                        width: 25,
                        height: 25,
                      }}
                    />
                  )}

                  <div className={s.table__chategory}>{el.name}</div>
                </td>
                <td width="36px" className={s.table__td__right}>
                  {el.total}
                </td>
              </tr>
            );
          })}
          <tr className={s.table__tr__summary}>
            <td className={s.table__td__summary}>Expenses:</td>
            <td className={s.table__red__value}>{expenseSummary}</td>
          </tr>
          <tr className={s.table__tr__summary}>
            <td className={s.table__td__summary}>Income:</td>
            <td className={s.table__green__value}>{incomeSummary}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
