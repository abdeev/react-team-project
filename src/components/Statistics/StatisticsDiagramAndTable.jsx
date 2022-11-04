import { StatisticsDiagram } from 'components/Statistics/StatisticsDiagram/StatisticsDiagram';
import { StatisticsForm } from 'components/Statistics/StatisticsForm/StatisticsForm';
import { StatisticsTable } from 'components/Statistics/StatisticsTable/StatisticsTable';
import { useEffect, useState } from 'react';
import { convertDataForChart } from '../../utils/convertDataForChart';
import { useSelector } from 'react-redux';

import { selectCategoriesSummary } from 'redux/statistics/selectorsStatistics';

import s from './StatisticsDiagramAndTable.module.css';

export const StatisticsDiagramAndTable = () => {
  const [diagramData, setDiagramData] = useState(null);
  const [tableData, setTableData] = useState(null);

  const categoriesSummary = useSelector(selectCategoriesSummary);

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

  return (
    <div className={s.statistics__block}>
      {diagramData ? (
        <StatisticsDiagram diagram={diagramData} />
      ) : (
        <h2 className={s.statistics_warning_text}>
          There is no information for this term !
        </h2>
      )}
      <div className={s.statistics__block__form}>
        <StatisticsForm />
        {tableData && <StatisticsTable tableData={tableData} />}
      </div>
    </div>
  );
};
