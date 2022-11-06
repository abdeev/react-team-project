import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectExpenseSummary,
  selectIncomeSummary,
  selectIsLoading,
} from 'redux/statistics/selectorsStatistics';
import { nanoid } from 'nanoid';
import { Puff } from 'react-loader-spinner';
import PropTypes from 'prop-types';

import s from '../StatisticsTable/StatisticsTable.module.css';

export const StatisticsTable = ({ tableData }) => {
  const expenseSummary = useSelector(selectExpenseSummary);
  const incomeSummary = useSelector(selectIncomeSummary);
  const isLoading = useSelector(selectIsLoading);

  return (
    <table className={s.Table}>
      <tbody>
        <tr className={s.table__head}>
          <th className={s.table__th__left}>Category</th>
          <th className={s.table__th__right}>Sum</th>
        </tr>
        {tableData.map(el => {
          return (
            <tr className={s.table__tr} key={nanoid()}>
              <td className={s.table__container}>
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
              <td className={s.table__td__right}>{el.total}</td>
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
  );
};

StatisticsTable.propTypes = {
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      categoriesSummary: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          type: PropTypes.string,
          total: PropTypes.number,
        })
      ),
      incomeSummary: PropTypes.number,
      expenseSummary: PropTypes.number,
      periodTotal: PropTypes.number,
      year: PropTypes.number,
      month: PropTypes.number,
    })
  ),
};
