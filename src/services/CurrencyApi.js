const fetchExchangeRate = async () => {
  const response = await fetch(
    "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=5"
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
};

export default fetchExchangeRate;
