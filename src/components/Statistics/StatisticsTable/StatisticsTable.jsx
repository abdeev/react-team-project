import React from 'react';
import { statsArray } from '../json/mock';

import s from '../StatisticsTable/StatisticsTable.module.css';

export const StatisticsTable = ({ tableData }) => {
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
              <tr key={el.name}>
                <td>
                  <div className={s.table__container}>
                    <div
                      style={{ backgroundColor: el.backgroundColor, width: 25 }}
                    ></div>
                    <div className={s.table__chategory}>{el.name}</div>
                  </div>
                </td>
                <td className={s.table__td__right}>{el.total}</td>
              </tr>
            );
          })}
          <tr className={s.table__tr__summary}>
            <td className={s.table__td__summary}>Expenses:</td>
            <td className={s.table__red__value}>{statsArray.expenseSummary}</td>
          </tr>
          <tr className={s.table__tr__summary}>
            <td className={s.table__td__summary}>Income:</td>
            <td className={s.table__green__value}>
              {' '}
              {statsArray.incomeSummary}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
