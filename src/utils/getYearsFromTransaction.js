export const getYearsFromTransaction = transactions => {
  const yearsArray = transactions.reduce((acc, el) => {
    const year = el.transactionDate.split('-')[0];
    const isInclude = acc.filter(el => el.value === year);
    if (!isInclude.length) {
      acc.push({ value: year, label: year });
      return acc;
    }
    return acc;
  }, []);

  return yearsArray.sort((a, b) => a.value - b.value);
};
