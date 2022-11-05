import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import Select from 'react-select';
import ReactDOM from 'react-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getTransactionsThunk, editTransactionThunk, deleteTransactionsThunk } from 'redux/transactions/thunksTransactions';

import ModalBackdrop from './ModalBackdrop/ModalBackdrop';


import { Form, Formik } from 'formik';
import CustomCommentInput from './FormikCustoms/CustomCommentInput';
import CustomAmountInput from './FormikCustoms/CustomAmountInput';
import { DatePickerField } from './FormikCustoms/CustomDatePicker';
import CustomSelect from './FormikCustoms/CustomSelect';
import { addTransactionSchema } from 'validation/addTransactionSchema';

import { selectTransactionsIsEditing, selectTransactionsIsDeleting } from 'redux/transactions/selectorsTransactions';

import { getCurrentUserInfoThunk } from 'redux/authorization/thunksAuth';

import { selectCategories } from 'redux/categories/selectCategories';

import css from './EditTransactionModal.module.css';

const EditTransactionModal = ({ closeModalOnKey, setShowEditModal, transaction: { id, transactionDate, type, categoryId, comment, amount } }) => {

  const [isExpenseChecked, setIsExpenseChecked] = useState(true);

  const dispatch = useDispatch();
  const isEditing = useSelector(selectTransactionsIsEditing);
  const isDeleting = useSelector(selectTransactionsIsDeleting);
  const categories = useSelector(selectCategories);
  
  const getNameByCategoryId = id => {
    if (id === '063f1132-ba5d-42b4-951d-44011ca46262') {
      return null;
    }
    return categories.filter(category => category.id === id)[0]?.name;
  };

  useEffect(() => {
    setIsExpenseChecked(type === 'INCOME' ? false : true);
    window.addEventListener('keydown', closeModalOnKey);

    return () => { window.removeEventListener('keydown', closeModalOnKey); }
  }, [closeModalOnKey, type]);
  
  const handleModalCloseClick = () => {
    setShowEditModal(false)
  };

  const handleBackdropClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    setShowEditModal(false)
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
        .then(() => {
          actions.resetForm();
          dispatch(getCurrentUserInfoThunk());

          setShowEditModal(false);
        })
        .catch(() => {
          alert('smth went wrong, try again');
        }).finally(dispatch(getTransactionsThunk()));
    }
    // else {
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
        .then(() => {
          actions.resetForm();
          dispatch(getCurrentUserInfoThunk());
          setShowEditModal(false);
        })
        .catch(() => {
          alert('smth went wrong, try again');
          actions.resetForm();
        }).finally(dispatch(getTransactionsThunk()));
    }
  };

  const handleDeleteTransaction = () => {
    dispatch(deleteTransactionsThunk(id))
      .then(dispatch(getTransactionsThunk()))
      .catch(() => {
        alert('smth went wrong, try again');
      })
      .finally(setShowEditModal(false));    
  }

  return ReactDOM.createPortal(
    <>
        <ModalBackdrop onBackClick={handleBackdropClick} closeModalOnKey={closeModalOnKey}>
            <div className={css.modal}>
              <button
                type="button"
                className={css.closingCross}
                onClick={handleModalCloseClick}
              ></button>

              <h1 className={css.title}>Add transaction</h1>
          
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
                        props.values.isExpenseChecked = !props.values.isExpenseChecked;
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
                  <CustomSelect name="selectData" categoryName={getNameByCategoryId(categoryId)} />
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

                  <button type="submit" className={css.submitBtn}>
                    {isEditing ? ' EDITING ...' : 'EDIT'}
                  </button>
                
                  <button type="button" className={css.deleteBtn} onClick={handleDeleteTransaction}>
                    {isDeleting ? ' DELETING ...' : 'DELETE'}
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

    </>, document.body
  )
};

export default EditTransactionModal;