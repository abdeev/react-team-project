import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
  getTransactionsThunk,
  editTransactionThunk,
  deleteTransactionsThunk,
} from 'redux/transactions/thunksTransactions';

import ModalBackdrop from './ModalBackdrop/ModalBackdrop';

import { Form, Formik } from 'formik';
import CustomCommentInput from './FormikCustoms/CustomCommentInput';
import CustomAmountInput from './FormikCustoms/CustomAmountInput';
import { DatePickerField } from './FormikCustoms/CustomDatePicker';
import CustomSelect from './FormikCustoms/CustomSelect';
import { addTransactionSchema } from 'validation/addTransactionSchema';

import { RiCalendar2Fill } from 'react-icons/ri';
import { Notify } from 'notiflix';
import Loader from 'components/Loader';

import {
  selectTransactionsIsEditing,
  selectTransactionsIsDeleting,
} from 'redux/transactions/selectorsTransactions';

import { getCurrentUserInfoThunk } from 'redux/authorization/thunksAuth';

import css from './EditTransactionModal.module.css';

const EditTransactionModal = ({
  closeModalOnKey,
  setShowEditModal,
  transaction: { id, transactionDate, type, categoryId, comment, amount },
}) => {
  const [isExpenseChecked, setIsExpenseChecked] = useState(true);

  const dispatch = useDispatch();
  const isEditing = useSelector(selectTransactionsIsEditing);
  const isDeleting = useSelector(selectTransactionsIsDeleting);

  useEffect(() => {
    setIsExpenseChecked(type === 'INCOME' ? false : true);
    window.addEventListener('keydown', closeModalOnKey);

    return () => {
      window.removeEventListener('keydown', closeModalOnKey);
    };
  }, [closeModalOnKey, type]);

  const handleModalCloseClick = () => {
    setShowEditModal(false);
  };

  const handleBackdropClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    setShowEditModal(false);
  };

  const handleModalSubmit = (values, actions) => {
    if (values.isExpenseChecked) {
      dispatch(
        editTransactionThunk({
          id,
          categoryId: values.selectData?.id,
          transactionDate: values.startDate?.toISOString(),
          type: 'EXPENSE',
          comment: values?.comment,
          amount: -values?.amount,
        })
      )
        .unwrap()
        .then(() => {
          actions.resetForm();
          dispatch(getCurrentUserInfoThunk());
          setShowEditModal(false);
        })
        .catch(() => {
          Notify.failure('Oops! Smth went wrong, try again');
        })
        .finally(dispatch(getTransactionsThunk()));
    }

    if (!values.isExpenseChecked) {
      dispatch(
        editTransactionThunk({
          id,
          categoryId: '063f1132-ba5d-42b4-951d-44011ca46262',
          transactionDate: values.startDate?.toISOString(),
          type: 'INCOME',
          comment: values?.comment,
          amount: Math.abs(values?.amount),
        })
      )
        .unwrap()
        .then(() => {
          actions.resetForm();
          dispatch(getCurrentUserInfoThunk());
          setShowEditModal(false);
        })
        .catch(() => {
          Notify.failure('Oops! Smth went wrong, try again');
        })
        .finally(dispatch(getTransactionsThunk()));
    }
  };

  const handleDeleteTransaction = () => {
    dispatch(deleteTransactionsThunk(id))
      .unwrap()
      .then(dispatch(getTransactionsThunk()))
      .catch(() => {
        alert('smth went wrong, try again');
      })
      .finally(() => {
        dispatch(getCurrentUserInfoThunk());
        setShowEditModal(false);
      });
  };

  return ReactDOM.createPortal(
    <>
      <ModalBackdrop
        onBackClick={handleBackdropClick}
        closeModalOnKey={closeModalOnKey}
      >
        <div className={css.modal}>
          <button
            type="button"
            className={css.closingCross}
            onClick={handleModalCloseClick}
          ></button>

          <h1 className={css.title}>Edit transaction</h1>

          <Formik
            initialValues={{
              comment: comment,
              amount: Math.abs(amount),
              startDate: new Date(transactionDate),
              selectData: null,
              isExpenseChecked: type === 'INCOME' ? false : true,
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
                    defaultChecked={type === 'INCOME' ? false : true}
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

                <button type="submit" className={css.submitBtn}>
                  {isEditing ? ' EDITING ...' : 'EDIT'}
                </button>

                <button
                  type="button"
                  className={css.deleteBtn}
                  onClick={handleDeleteTransaction}
                >
                  {isDeleting ? ' DELETING ...' : 'DELETE'}
                </button>

                <button
                  type="button"
                  className={css.cancelBtn}
                  onClick={handleModalCloseClick}
                >
                  CANCEL
                </button>
              </Form>
            )}
          </Formik>
          {isEditing && <Loader />}
        </div>
      </ModalBackdrop>
    </>,
    document.body
  );
};

export default EditTransactionModal;
