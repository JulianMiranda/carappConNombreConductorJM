export const formatToCurrency = (amount: number = 0) => {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};
