import { StatisticsDiagram } from 'components/Statistics/StatisticsDiagram/StatisticsDiagram';
import { StatisticsTable } from 'components/Statistics/StatisticsTable/StatisticsTable';
import { useEffect, useState } from 'react';
// import { Chart } from 'react-chartjs-2';
import { statsArray } from '../components/Statistics/json/mock';

import { convertDataForChart } from '../utils/convertDataForChart';

export const StatisticsPage = () => {
  const [diagramData, setDiagramData] = useState(null);
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    const data = convertDataForChart(statsArray.categoriesSummary);
    setDiagramData(data.diagram);
    setTableData(data.table);
  }, []);

  return (
    <div>
      {diagramData && <StatisticsDiagram diagram={diagramData} />}
      {tableData && <StatisticsTable tableData={tableData} />}
    </div>
  );
};
