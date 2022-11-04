import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import s from '../StatisticsForm/StatisticsForm.module.css';
import { monthArray } from 'constans/monthArray';
import { yearsArray } from 'constans/yearsArray';
import { getStatisticsUserThunk } from 'redux/statistics/thunkStatictics';
import { useDispatch } from 'react-redux';

export const StatisticsForm = () => {
  const [electMonth, setElectMonth] = useState('');
  const [electYear, setElectYear] = useState('');

  const dispach = useDispatch();

  useEffect(() => {
    // if (!electYear.length) return;
    // else {
    dispach(getStatisticsUserThunk({ electMonth, electYear }));
    // }
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
          options={yearsArray}
          placeholder="Years"
          captureMenuScroll
          onChange={e => setElectYear(e.value)}
        />
      </div>
    </form>
  );
};
