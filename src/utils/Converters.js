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
  const table = [];
  // const newRawData = rawData.filter(el => el.name !== 'Income');

  // eslint-disable-next-line
  rawData.map(el => {
    labels.push(el.name);
    data.push(el.total);
    const color = getRandomColor();
    backgroundColor.push(color);
    table.push({ ...el, backgroundColor: color });
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
        },
      ],
    },
    table,
  };
};
export const formatDate = inputedDate => {
  const datePart = inputedDate.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1],
    day = datePart[2];

  return day + '.' + month + '.' + year;
};
