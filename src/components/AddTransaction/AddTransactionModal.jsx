import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

import 'react-datepicker/dist/react-datepicker.css';

import ModalBackdrop from './ModalBackdrop/ModalBackdrop';

import css from './AddTransactionModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from 'redux/modal/modalSlice';

const AddTransactionModal = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [isSubscribed, setIsSubscribed] = useState(true);

  const isModalOpen = useSelector(
    state => state.isModalAddTransactionOpen.isShowModal
  );
  const dispatch = useDispatch();

  const handleModalCloseClick = () => {
    dispatch(showModal(false));
  };

  const handleChange = () => {
    setIsSubscribed(current => !current);
  };

  const handleBackdropClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }

    dispatch(showModal(false));
  };

  const options = [
    { value: 'food', label: 'Food' },
    { value: 'movies', label: 'Movies' },
    { value: 'pharm', label: 'Pharm' },
    { value: 'food1', label: 'Food' },
    { value: 'movies1', label: 'Movies' },
    { value: 'pharm1', label: 'Pharm' },
    { value: 'food2', label: 'Food' },
    { value: 'movies3', label: 'Movies' },
    { value: 'pharm4', label: 'Pharm' },
    { value: 'food5', label: 'Food' },
    { value: 'movies6', label: 'Movies' },
    { value: 'pharm7', label: 'Pharm' },
  ];

  return (
    <div>
      {isModalOpen && (
        <div>
          <ModalBackdrop onBackClick={handleBackdropClick}>
            <div className={css.modal}>
              <button
                type="button"
                className={css.closingCross}
                onClick={handleModalCloseClick}
              ></button>
              <h1 className={css.title}>Add transaction</h1>
              <div className={css.toggle}>
                <input
                  type="checkbox"
                  id="toggle"
                  defaultChecked
                  onChange={handleChange}
                />
                <label htmlFor="toggle"></label>
                <span className={css.incomeSpan}>Income</span>
                <span className={css.expenseSpan}>Expense</span>
              </div>
              <form className={css.form}>
                {isSubscribed && (
                  <Select
                    options={options}
                    placeholder="Select category"
                    classNamePrefix="custom-select"
                  />
                )}

                <div className={css.inputsWrapper}>
                  <label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className={css.inputAmount}
                    />
                  </label>

                  <div className={css.datepickerWrapper}>
                    <DatePicker
                      selected={startDate}
                      onChange={date => setStartDate(date)}
                      className={css.input}
                    />
                  </div>
                </div>

                <label>
                  <input
                    type="text"
                    placeholder="Comment"
                    className={css.comment}
                  />
                </label>

                <button type="submit" className={css.submitBtn}>
                  ADD
                </button>
              </form>

              <button
                type="button"
                className={css.cancelBtn}
                onClick={handleModalCloseClick}
              >
                CANCEL
              </button>
            </div>
          </ModalBackdrop>
        </div>
      )}
    </div>
  );
};

export default AddTransactionModal;
