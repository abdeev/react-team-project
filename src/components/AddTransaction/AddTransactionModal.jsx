import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  getTransactionsThunk,
  addTransactionThunk,
} from 'redux/transactions/thunksTransactions';
import { getCurrentUserInfoThunk } from 'redux/authorization/thunksAuth';
import { selectTransactionsIsLoading } from 'redux/transactions/selectorsTransactions';

import { Form, Formik } from 'formik';
import CustomCommentInput from './FormikCustoms/CustomCommentInput';
import CustomAmountInput from './FormikCustoms/CustomAmountInput';
import { DatePickerField } from './FormikCustoms/CustomDatePicker';
import CustomSelect from './FormikCustoms/CustomSelect';

import { addTransactionSchema } from 'validation/addTransactionSchema';

import { Notify } from 'notiflix';

import { RiCalendar2Fill } from 'react-icons/ri';

import Loader from 'components/Loader';

import PropTypes from 'prop-types';

import css from './AddTransactionModal.module.css';

const AddTransactionModal = ({ setIsAddModalOpen }) => {
  const [isExpenseChecked, setIsExpenseChecked] = useState(true);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectTransactionsIsLoading);

  const handleModalCloseClick = () => {
    setIsAddModalOpen(false);
    setIsExpenseChecked(true);
  };

  const handleModalSubmit = (values, actions) => {
    if (values.isExpenseChecked) {
      dispatch(
        addTransactionThunk({
          categoryId: values.selectData?.id,
          transactionDate: values.startDate?.toISOString(),
          type: 'EXPENSE',
          comment: values?.comment,
          amount: -values?.amount,
        })
      )
        .unwrap()
        .then(() => {
          Notify.success('Transaction added !');
          setIsAddModalOpen(false);
          setIsExpenseChecked(true);
          actions.resetForm();
          dispatch(getCurrentUserInfoThunk());
        })
        .catch(() => {
          Notify.failure('Oops! Smth went wrong, try again');
        })
        .finally(dispatch(getTransactionsThunk()));
    }

    if (!values.isExpenseChecked) {
      dispatch(
        addTransactionThunk({
          categoryId: '063f1132-ba5d-42b4-951d-44011ca46262',
          transactionDate: values.startDate?.toISOString(),
          type: 'INCOME',
          comment: values?.comment,
          amount: values?.amount,
        })
      )
        .unwrap()
        .then(() => {
          Notify.success('Transaction added !');
          setIsAddModalOpen(false);
          setIsExpenseChecked(true);
          actions.resetForm();
          dispatch(getCurrentUserInfoThunk());
        })
        .catch(() => {
          Notify.failure('Oops! Smth went wrong, try again');
        })
        .finally(dispatch(getTransactionsThunk()));
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          comment: '',
          amount: '',
          startDate: new Date(),
          selectData: null,
          isExpenseChecked: isExpenseChecked,
        }}
        validationSchema={addTransactionSchema}
        onSubmit={handleModalSubmit}
      >
        {props => (
          <>
            <Form className={css.form}>
              <h1 className={css.title}>Add transaction</h1>

              <div className={css.toggle}>
                <input
                  type="checkbox"
                  id="toggle"
                  defaultChecked
                  onChange={() => {
                    props.values.isExpenseChecked =
                      !props.values.isExpenseChecked;
                    setIsExpenseChecked(props.values.isExpenseChecked);
                  }}
                />
                <label htmlFor="toggle"></label>
                <span className={css.incomeSpan}>Income</span>
                <span className={css.expenseSpan}>Expense</span>
              </div>

              <div
                className={
                  isExpenseChecked ? css.selectWrapper : css.selectWrapperOut
                }
              >
                <CustomSelect name="selectData" />
              </div>

              <div className={css.inputsWrapper}>
                <div className={css.amountWrapper}>
                  <CustomAmountInput
                    name="amount"
                    type="text"
                    placeholder="0.00"
                  />
                </div>
                <div className={css.datepickerWrapper}>
                  <DatePickerField name="startDate" />
                  <RiCalendar2Fill className={css.datepickerIcon} />
                </div>
              </div>

              <CustomCommentInput
                name="comment"
                type="text"
                placeholder="Comment"
              />

              <button
                type="submit"
                className={css.submitBtn}
                disabled={isLoading}
              >
                {isLoading ? ' ADDING ...' : 'ADD'}
              </button>

              <button
                type="button"
                className={css.cancelBtn}
                onClick={handleModalCloseClick}
              >
                CANCEL
              </button>
            </Form>
          </>
        )}
      </Formik>

      {isLoading && <Loader />}
    </div>
  );
};

AddTransactionModal.propTypes = {
  setIsAddModalOpen: PropTypes.func.isRequired,
};

export default AddTransactionModal;
