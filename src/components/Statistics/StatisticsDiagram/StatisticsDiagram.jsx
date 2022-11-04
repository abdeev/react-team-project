import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { statsArray } from '../json/mock';
import s from '../StatisticsDiagram/StatisticsDiagram.module.css';

// import { convertDataForChart } from 'utils/convertDataForChart';
ChartJS.register(ArcElement, Tooltip, Legend);

const donutOptions = {
  cutout: '70%',
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const StatisticsDiagram = ({ diagram, transactionsCategories, userTransactions }) => {

  // console.log(diagram);

  // const getColor = () => {
  //   const backgroundColorItem = ('#' + Math.floor(Math.random() * 16777215).toString(16));
  //   return backgroundColorItem;
  // }

  // const handleCategoryCount = (id) => {
  //   return userTransactions.filter(transaction => transaction.categoryId === id)
  //     .map(transaction => transaction.amount)
  //     .reduce((prevAmountOfCategory, amountOfCategory) => prevAmountOfCategory + amountOfCategory, 0);
  // }

  // const diagramData = {
  //   ...diagram,
  //   datasets: [diagram.datasets[0] = {
  //     ...diagram.datasets[0],
  //     [diagram.datasets[0].data]: transactionsCategories.map(category => handleCategoryCount(category.id)),
  //   }],
  //   labels: transactionsCategories.map(category => category.name),
  // };

  // console.log(diagramData);

  return (
    <div className={s.diagram_container}>
      <div className={s.diagram_box}>
        <Doughnut
          options={donutOptions}
          data={diagram}
          plugins={[
            {
              beforeDraw(chart) {
                const { width } = chart;
                const { height } = chart;
                const { ctx } = chart;
                ctx.restore();
                const fontSize = (height / 200).toFixed(2);
                ctx.font = ` ${fontSize}em circle`;
                ctx.textBaseline = 'top';
                const text = `₴ ${statsArray.periodTotal}`;
                const textX = Math.round(
                  (width - ctx.measureText(text).width) / 2
                );
                const textY = height / 2.1;
                ctx.fillText(text, textX, textY);
                ctx.save();
              },
            },
          ]}
        />
      </div>
    </div>
  );
};
