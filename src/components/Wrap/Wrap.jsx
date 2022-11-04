import React from 'react';
import Currency from '../Currency/Currency';
import Styles from './Wrap.module.css';
import Navigation from '../Navigation/Navigation';

const Wrap = ({ children }) => {
  return (
    <div className={Styles.wrap}>
      <div className={Styles.border}>
        <Navigation />
        <div className={Styles.containerBalanceCurrencyRatesPanel}>
          <Currency />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Wrap;
