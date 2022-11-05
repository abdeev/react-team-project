import { useState, useEffect, useCallback } from "react";
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const isDiagram = location.pathname === '/diagram';

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


  return (
    <div className={`${styles.currencyRatesPanel} ${isDiagram ? '' : styles.hidden}`}>  
    <ul className={styles.currencyRatesHead} >
            <li>Currency</li>
            <li>Purchase</li>
            <li>Sale</li>
          </ul>
          <div className={styles.conteinerdata}>
      {loading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : null}
      {!error && !loading ? (
            <ul className={styles.currencyRatesList}>
            {requestData.currency?.map(({ buy, sale, ccy }) => (
              <li className={styles.currencyRatesListItem} key={ccy} >
                <span className={styles.currencyData}>{ccy}</span>
                <span className={styles.currencyData}>{buy}</span>
                <span className={styles.currencyData}>{sale}</span>
              </li>
            ))}

          </ul>
      ) : (
        <div >
          <p>{error}</p>
        </div>
      )}
<img src={Vector} alt="vector" className={styles.vector} />
      </div>
              
    </div>
  );
};
export default Currency;

