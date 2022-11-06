import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { monthArray } from 'constans/monthArray';
import { getStatisticsUserThunk } from 'redux/statistics/thunkStatictics';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import s from '../StatisticsForm/StatisticsForm.module.css';

export const StatisticsForm = ({ years }) => {
  const [electMonth, setElectMonth] = useState('');
  const [electYear, setElectYear] = useState('');

  const dispach = useDispatch();

  useEffect(() => {
    if (!electMonth.length && !electYear.length) return;
    dispach(getStatisticsUserThunk({ electMonth, electYear }));
  }, [electMonth, electYear, dispach]);

  return (
    <form className={s.stats_form} action="submit">
      <div classmonth={s.select__block}>
        <CreatableSelect
          classNamePrefix="statistics-select"
          name="month"
          defaultInputValue={electMonth}
          options={monthArray}
          placeholder="Month"
          captureMenuScroll
          onChange={e => setElectMonth(e.value)}
        />
      </div>
      <div classmonth={s.select__block}>
        <CreatableSelect
          classNamePrefix="statistics-select"
          name="years"
          defaultInputValue={electYear}
          options={years}
          placeholder="Years"
          captureMenuScroll
          onChange={e => setElectYear(e.value)}
        />
      </div>
    </form>
  );
};

StatisticsForm.propTypes = {
  years: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
};
