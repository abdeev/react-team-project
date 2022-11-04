import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectIsLoggedIn, selectUserToken, } from 'redux/authorization/selectorsAuth';
import { selectTransactions } from 'redux/transactions/selectorsTransactions';
import { getCategoriesThunk } from 'redux/categories/thunkCategories';
import { getTransactionsThunk } from 'redux/transactions/thunksTransactions';
import { selectCategories } from 'redux/categories/selectCategories';

import { StatisticsDiagram } from 'components/Statistics/StatisticsDiagram/StatisticsDiagram';
import { StatisticsTable } from 'components/Statistics/StatisticsTable/StatisticsTable';

// import { useEffect, useState } from 'react';
// import { Chart } from 'react-chartjs-2';
import { statsArray } from '../components/Statistics/json/mock';

import { convertDataForChart } from '../utils/convertDataForChart';

export const StatisticsPage = () => {
  const [diagramData, setDiagramData] = useState(null);
  // const [tableData, setTableData] = useState(null);


  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const usertoken = useSelector(selectUserToken);
  const userTransactions = useSelector(selectTransactions);
  const transactionsCategories = useSelector(selectCategories);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(getCategoriesThunk());
    dispatch(getTransactionsThunk());
  }, [isLoggedIn, usertoken, dispatch]);

  useEffect(() => {
    const data = convertDataForChart(statsArray.categoriesSummary);
    setDiagramData(data.diagram);
    // setTableData(data.table);
  }, []);

  // const transactionCategoriesColor = transactionsCategories.map(category => { return { ...category, color }; }); // так можна прокинути одинакові кольори для діаграми та таблиці

  return (
    <div>
      {diagramData && <StatisticsDiagram diagram={diagramData} transactionsCategories={transactionsCategories} userTransactions={userTransactions}/>}
      <StatisticsTable transactionsCategories={transactionsCategories} userTransactions={userTransactions} />

      {/* {diagramData && <StatisticsDiagram diagram={diagramData} />} */}
      {/* {tableData && <StatisticsTable transactionsCategories={transactionsCategories} />} */}
    </div>
  );
};
