function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const convertDataForChart = rawData => {
  const labels = [];
  const data = [];
  const backgroundColor = [];
  const newRawData = rawData.filter(el => el.type !== 'INCOME');
  // eslint-disable-next-line
  newRawData.map(el => {
    labels.push(el.name);
    data.push(el.total);
    const color = getRandomColor();
    backgroundColor.push(color);
    el.backgroundColor = color;
  });
  return {
    diagram: {
      labels: labels,
      datasets: [
        {
          label: '# of Votes',
          data: data,
          backgroundColor: backgroundColor,
          borderWidth: 0,
          radius: 144,
        },
      ],
    },
    table: newRawData,
  };
};
