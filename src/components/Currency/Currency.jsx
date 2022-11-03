import { useState, useEffect, useCallback } from "react";


import useLocalStorage from "../../utils/useLocalStorage";
import fetchExchangeRate from  '../../utils/CurrencyApi';

import Loader from "../Loader/Loader";

import Vector from '../../icons/vector.svg';
import styles from './Currency.module.css';

const Currency = () => {
  const [requestData, setRequestData] = useLocalStorage("request", {
    currency: [],
    time: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const prepareData = (data) => {
    const filteredData = data.filter(
      (el) => el.ccy !== "RUR");
    return filteredData.map((el) => ({
      ...el,
      buy: Number(el.buy).toFixed(2),
      sale: Number(el.sale).toFixed(2),
    }));
  };

  const countPastTime = useCallback(() => {
    const pastTime = new Date(Date.now() - requestData.time);
    return pastTime / (1000 * 60);
  }, [requestData.time]);

  useEffect(() => {
    (async () => {
      try {
        if (countPastTime() < 60) {
          return;
        }
        setLoading(true);
        setError("");
        const data = await fetchExchangeRate();
        const normalizedData = prepareData(data);
        setRequestData({ currency: normalizedData, time: Date.now() });
        setLoading(false);
      } catch (error) {
        setError("Sorry, exchange rate is not available now.");
        setLoading(false);
      }
    })();
  }, [countPastTime, requestData, setRequestData]);
//поставити клас хідден на діаграму!
  return (
    <div className={styles.currencyRatesBox}>
      {loading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : null}
      {!error && !loading ? (
        <>
          <div className={styles.currencyRatesHead}>
            <p >Currency</p>
            <p >Buy</p>
            <p >Sell</p>
          </div>
          <div className={styles.conteinerdata}>
            <ul className={styles.currencyRatesList}>
            {requestData.currency?.map(({ buy, sale, ccy }) => (
              <li className={styles.currencyRatesListItem} key={ccy} >
                <span >{ccy}</span>
                <span >{buy}</span>
                <span >{sale}</span>
              </li>
            ))}
          </ul>
          <img src={Vector} alt="vector" className={styles.vector} />
          </div>
          
        </>
      ) : (
        <div >
          <p>{error}</p>
        </div>
      )}
       
    </div>
  );
};
export default Currency;

