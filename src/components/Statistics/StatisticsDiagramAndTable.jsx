import { StatisticsDiagram } from 'components/Statistics/StatisticsDiagram/StatisticsDiagram';
import { StatisticsForm } from 'components/Statistics/StatisticsForm/StatisticsForm';
import { StatisticsTable } from 'components/Statistics/StatisticsTable/StatisticsTable';
import { useEffect, useState } from 'react';
import { convertDataForChart } from '../../utils/convertDataForChart';
import { useSelector } from 'react-redux';

import {
  selectCategoriesSummary,
  selectIsLoading,
} from 'redux/statistics/selectorsStatistics';

import s from './StatisticsDiagramAndTable.module.css';
// import Loader from 'components/Loader';
import { Puff } from 'react-loader-spinner';
import { selectTransactions } from 'redux/transactions/selectorsTransactions';
import { getYearsFromTransaction } from 'utils/getYearsFromTransaction';

export const StatisticsDiagramAndTable = () => {
  const [diagramData, setDiagramData] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [yearsArray, setYearsArray] = useState(null);

  const categoriesSummary = useSelector(selectCategoriesSummary);
  const isLoading = useSelector(selectIsLoading);
  const transactions = useSelector(selectTransactions);

  useEffect(() => {
    if (!categoriesSummary.length) {
      setDiagramData(null);
      setTableData([]);
    }
    if (categoriesSummary.length) {
      const data = convertDataForChart(categoriesSummary);
      setDiagramData(data.diagram);
      setTableData(data.table);
    }
  }, [categoriesSummary]);

  useEffect(() => {
    if (transactions.length) {
      const years = getYearsFromTransaction(transactions);
      setYearsArray(years);
    }
  }, [transactions]);

  return (
    <div className={s.statistics__block}>
      <div>
        {isLoading ? (
          <Puff
            type="Puff"
            color="var(--icon-active-color)"
            height={300}
            width={300}
            timeout={3000}
          />
        ) : diagramData ? (
          <StatisticsDiagram diagram={diagramData} />
        ) : (
          <h2 className={s.statistics_warning_text}>
            There is no information for this term !
          </h2>
        )}
      </div>
      <div className={s.statistics__block__form}>
        {yearsArray && <StatisticsForm years={yearsArray} />}

        {tableData && <StatisticsTable tableData={tableData} />}
      </div>
    </div>
  );
};
