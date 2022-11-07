export const selectCategoriesSummary = state =>
  state.statistics.statisticsTransactions.categoriesSummary;
export const selectIncomeSummary = state =>
  state.statistics.statisticsTransactions.incomeSummary;
export const selectExpenseSummary = state =>
  state.statistics.statisticsTransactions.expenseSummary;
export const selectPeriodTotal = state =>
  state.statistics.statisticsTransactions.periodTotal;
export const selectIsLoading = state => state.statistics.isLoading;
