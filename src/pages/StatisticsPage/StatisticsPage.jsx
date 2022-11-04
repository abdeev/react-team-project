import { StatisticsDiagramAndTable } from 'components/Statistics/StatisticsDiagramAndTable';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { selectCategoriesSummary } from 'redux/statistics/selectorsStatistics';
// import { getStatisticsUserThunk } from 'redux/statistics/thunkStatictics';

import s from '../StatisticsPage/StatisticsPage.module.css';
const StatisticsPage = () => {
  // const dispach = useDispatch();
  // const categoriesSummary = useSelector(selectCategoriesSummary);

  // useEffect(() => {
  //   dispach(getStatisticsUserThunk());
  //   // eslint-disable-next-line
  // }, []);

  return (
    <div className={s.statistics__container}>
      <h1 className={s.statistics__title}>Statistics</h1>
      <StatisticsDiagramAndTable />
    </div>
  );
};

export default StatisticsPage;
