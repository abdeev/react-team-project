import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { showModal } from 'redux/modal/modalSlice';
import { addTransactionThunk } from 'redux/transactions/thunksTransactions';
import { getCurrentUserInfoThunk } from 'redux/authorization/thunksAuth';

import ModalBackdrop from './ModalBackdrop/ModalBackdrop';

import { selectTransactionsIsLoading } from 'redux/transactions/selectorsTransactions';

import { Form, Formik } from 'formik';

import CustomCommentInput from './FormikCustoms/CustomCommentInput';
import CustomAmountInput from './FormikCustoms/CustomAmountInput';
import { DatePickerField } from './FormikCustoms/CustomDatePicker';
import CustomSelect from './FormikCustoms/CustomSelect';

import { addTransactionSchema } from 'validation/addTransactionSchema';

import { selectIsModalOpen } from 'redux/modal/selectorsModal';

// import { Notify } from 'notiflix/build/notiflix-notify-aio';

import css from './AddTransactionModal.module.css';
import { Notify } from 'notiflix';

const AddTransactionModal = () => {
  const [isExpenseChecked, setIsExpenseChecked] = useState(true);
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);
  const isLoading = useSelector(selectTransactionsIsLoading);

  const handleModalCloseClick = () => {
    dispatch(showModal(false));
    setIsExpenseChecked(true);
  };

  const handleBackdropClick = e => {
    if (e.target !== e.currentTarget) return;
    dispatch(showModal(false));
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
          dispatch(showModal(false));
          setIsExpenseChecked(true);
          actions.resetForm();
          dispatch(getCurrentUserInfoThunk());
        })
        .catch(() => {
          Notify.failure('Oops! Smth went wrong, try again');
        });
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
          dispatch(showModal(false));
          setIsExpenseChecked(true);
          actions.resetForm();
          dispatch(getCurrentUserInfoThunk());
        })
        .catch(() => {
          Notify.failure('Oops! Smth went wrong, try again');
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
            </div>

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
                <Form className={css.form}>
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
                      isExpenseChecked
                        ? css.selectWrapper
                        : css.selectWrapperOut
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
                    // disabled={props.isSubmitting}
                  >
                    {isLoading ? ' ADDING ...' : 'ADD'}
                  </button>
                </Form>
              )}
            </Formik>

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
