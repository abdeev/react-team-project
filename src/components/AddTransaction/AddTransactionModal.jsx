import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

import { useDispatch, useSelector } from 'react-redux';
import { showModal } from 'redux/modal/modalSlice';
import { addTransactionThunk } from 'redux/transactions/thunksTransactions';

import ModalBackdrop from './ModalBackdrop/ModalBackdrop';

import 'react-datepicker/dist/react-datepicker.css';
import css from './AddTransactionModal.module.css';
import { selectTransactionsIsLoading } from 'redux/transactions/selectorsTransactions';
import { getCurrentUserInfoThunk } from 'redux/authorization/thunksAuth';

const AddTransactionModal = () => {
  const initialState = {
    startDate: new Date(),
    amount: '',
    comment: '',
    selectData: null,
    isExpenseChecked: true,
  };

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const isModalOpen = useSelector(
    state => state.isModalAddTransactionOpen.isShowModal
  );
  const categories = useSelector(state => state.categories.categories);
  const isLoading = useSelector(selectTransactionsIsLoading);

  const options = categories
    .filter(el => el.type !== 'INCOME')
    .map(el => ({ value: el.name, label: el.name, id: el.id, type: el.type }));

  const handleFormDataChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAmountInputChange = evt => {
    if (evt.target.value.match(/^\d+$/) === null && evt.target.value !== '') {
      return;
    }
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSelectChange = x => {
    setFormData(prev => {
      return { ...prev, selectData: x };
    });
  };

  const handleModalCloseClick = () => {
    dispatch(showModal(false));
  };

  const handleChange = () => {
    setFormData(prev => {
      return { ...prev, isExpenseChecked: !prev.isExpenseChecked };
    });
  };

  const handleBackdropClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }

    dispatch(showModal(false));
  };

  const handleModalSubmit = e => {
    e.preventDefault();

    if (formData.isExpenseChecked && formData.selectData?.id) {
      dispatch(
        addTransactionThunk({
          categoryId: formData.selectData?.id,
          transactionDate: formData.startDate?.toISOString(),
          type: 'EXPENSE',
          comment: formData?.comment,
          amount: -formData?.amount,
        })
      )
        .then(() => {
          setFormData(initialState);
          dispatch(showModal(false));
          dispatch(getCurrentUserInfoThunk());
        })
        .catch(() => {
          alert('smth went wrong, try again');
          setFormData(initialState);
        });
    }

    if (!formData.isExpenseChecked) {
      dispatch(
        addTransactionThunk({
          categoryId: '063f1132-ba5d-42b4-951d-44011ca46262',
          transactionDate: formData.startDate?.toISOString(),
          type: 'INCOME',
          comment: formData?.comment,
          amount: formData?.amount,
        })
      )
        .then(() => {
          setFormData(initialState);
          dispatch(showModal(false));
          dispatch(getCurrentUserInfoThunk());
        })
        .catch(() => {
          setFormData(initialState);
          alert('Oops! Smth went wrong, try again');
        });
    }
  };

  return (
    <div>
      {isModalOpen && (
        <ModalBackdrop onBackClick={handleBackdropClick}>
          <div className={css.modal}>
            <button
              type="button"
              className={css.closingCross}
              onClick={handleModalCloseClick}
            ></button>

            <div>
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
            </div>

            <form className={css.form} onSubmit={handleModalSubmit}>
              <div
                className={
                  formData.isExpenseChecked
                    ? css.selectWrapper
                    : css.selectWrapperOut
                }
              >
                <Select
                  options={options}
                  value={formData.selectData}
                  onChange={handleSelectChange}
                  placeholder="Select category"
                  classNamePrefix="custom-select"
                />
              </div>

              <div className={css.inputsWrapper}>
                <label>
                  <input
                    name="amount"
                    type="text"
                    value={formData.amount}
                    placeholder="0.00"
                    className={css.inputAmount}
                    onChange={handleAmountInputChange}
                  />
                </label>

                <div className={css.datepickerWrapper}>
                  <DatePicker
                    selected={formData.startDate}
                    onChange={date =>
                      setFormData(prev => {
                        return { ...prev, startDate: date };
                      })
                    }
                    className={css.input}
                  />
                </div>
              </div>

              <label>
                <input
                  name="comment"
                  type="text"
                  value={formData.comment}
                  placeholder="Comment"
                  className={css.comment}
                  onChange={handleFormDataChange}
                />
              </label>

              <button type="submit" className={css.submitBtn}>
                {isLoading ? ' ADDING ...' : 'ADD'}
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
      )}
    </div>
  );
};

export default AddTransactionModal;
