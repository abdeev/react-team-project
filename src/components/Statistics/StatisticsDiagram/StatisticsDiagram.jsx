import React from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { selectPeriodTotal } from 'redux/statistics/selectorsStatistics';

import s from '../StatisticsDiagram/StatisticsDiagram.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const donutOptions = {
  cutout: '70%',
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const StatisticsDiagram = ({ diagram }) => {
  const periodTotal = useSelector(selectPeriodTotal);

  return (
    <div className={s.diagram_container}>
      <p className={s.diagram_text}> ₴ {periodTotal}</p>
      <div className={s.diagram_box}>
        <Doughnut options={donutOptions} data={diagram} />
      </div>
    </div>
  );
};

StatisticsDiagram.propTypes = {
  diagram: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number),
        backgroundColor: PropTypes.arrayOf(PropTypes.string),
        borderWidth: PropTypes.number,
      })
    ),
  }),
};
