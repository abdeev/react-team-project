import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import Select from 'react-select';
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

// import { selectTransactionsIsLoading } from 'redux/transactions/selectorsTransactions';

// import { getCurrentUserInfoThunk } from 'redux/authorization/thunksAuth';

import css from './EditTransactionModal.module.css';
import { selectTransactionsIsLoading } from 'redux/transactions/selectorsTransactions';

const EditTransactionModal = ({
  closeModalOnKey,
  setShowEditModal,
  transaction: { id, transactionDate, type, categoryId, comment, amount },
}) => {
  // console.log(id, transactionDate, type, categoryId, comment, amount);

  const [isExpenseChecked, setIsExpenseChecked] = useState(true);
  // const dispatch = useDispatch();
  const isLoading = useSelector(selectTransactionsIsLoading);

  const initialState = {
    startDate: new Date(),
    amount: Math.abs(amount),
    comment: comment,
    selectData: null,
    isExpenseChecked: type === 'INCOME' ? false : true,
  };

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('keydown', closeModalOnKey);

    return () => {
      window.removeEventListener('keydown', closeModalOnKey);
    };
  }, [closeModalOnKey]);

  // const categories = useSelector(state => state.categories.categories);

  // const options = categories.map(el => {
  //   return { value: el.name, label: el.name, id: el.id, type: el.type };
  // });

  // const handleFormDataChange = e => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleAmountInputChange = evt => {
  //   if (evt.target.value.match(/^\d+$/) === null && evt.target.value !== '') {
  //     return;
  //   }
  //   setFormData({ ...formData, [evt.target.name]: evt.target.value });
  // };

  // const handleSelectChange = x => {
  //   setFormData(prev => {
  //     return { ...prev, selectData: x };
  //   });
  // };

  // const handleChange = () => {
  //   setFormData(prev => {
  //     return { ...prev, isExpenseChecked: !prev.isExpenseChecked };
  //   });
  // };

  const handleModalCloseClick = () => {
    setShowEditModal(false);
  };

  const handleBackdropClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    setShowEditModal(false);
  };

  // const handleModalSubmit = e => {
  //   e.preventDefault();
  // if (formData.isExpenseChecked) {
  const handleModalSubmit = (values, actions) => {
    if (values.isExpenseChecked) {
      dispatch(
        editTransactionThunk({
          id,
          transactionDate: formData.startDate?.toISOString(),
          type: 'EXPENSE',
          categoryId: formData.selectData?.id,
          comment: formData?.comment,
          amount: -formData?.amount,
        })
      )
        .then(() => {
          // setFormData(initialState);
          actions.resetForm();
          // dispatch(getCurrentUserInfoThunk());

          setShowEditModal(false);
        })
        .catch(() => {
          alert('smth went wrong, try again');
          setFormData(initialState);
        })
        .finally(dispatch(getTransactionsThunk()));
    }
    // else {
    if (!values.isExpenseChecked) {
      dispatch(
        editTransactionThunk({
          id,
          categoryId: '063f1132-ba5d-42b4-951d-44011ca46262',
          transactionDate: formData.startDate?.toISOString(),
          type: 'INCOME',
          comment: formData?.comment,
          amount: Math.abs(formData?.amount),
        })
      )
        .then(() => {
          // setFormData(initialState);

          actions.resetForm();
          // dispatch(getCurrentUserInfoThunk());
          setShowEditModal(false);
        })
        .catch(() => {
          // setFormData(initialState);
          alert('smth went wrong, try again');
          actions.resetForm();
        })
        .finally(dispatch(getTransactionsThunk()));
    }
  };

  const handleDeleteTransaction = event => {
    dispatch(deleteTransactionsThunk(id));
    dispatch(getTransactionsThunk());
    setShowEditModal(false);
  };

  return ReactDOM.createPortal(
    <>
      {isLoading && <p>ADDING ...</p>}
      {/* {isModalOpen && (  */}
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

          <h1 className={css.title}>Add transaction</h1>

          <Formik
            initialValues={{
              comment: comment,
              amount: Math.abs(amount),
              startDate: new Date(),
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
                  </div>
                </div>

                <CustomCommentInput
                  name="comment"
                  type="text"
                  placeholder="Comment"
                />

                {/* <button type="submit" className={css.submitBtn}>
                    {isLoading ? ' ADDING ...' : 'ADD'}
                  </button> */}

                <button type="submit" className={css.submitBtn}>
                  EDIT
                </button>
                <button
                  type="button"
                  className={css.deleteBtn}
                  onClick={handleDeleteTransaction}
                >
                  DELETE
                </button>
              </Form>
            )}
          </Formik>

          {/* <div className={css.toggle}>
                <input
                  type="checkbox"
                  id="toggle"
                  defaultChecked={type === 'INCOME' ? false : true}
                  onChange={handleChange}
                />
                <label htmlFor="toggle"></label>
                <span className={css.incomeSpan}>Income</span>
                <span className={css.expenseSpan}>Expense</span>
              </div> */}

          {/* <form className={css.form} onSubmit={handleModalSubmit}>
                {formData.isExpenseChecked && (
                  <Select
                    options={options}
                    value={formData.selectData}
                    onChange={handleSelectChange}
                    placeholder="Select category"
                    classNamePrefix="custom-select"
                  />
                )}

                <div className={css.inputsWrapper}>
                  <label>
                    <input
                      name="amount"
                      type="text"
                      defaultValue={formData.amount}
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
                    defaultValue={formData.comment}
                    placeholder="Comment"
                    className={css.comment}
                    onChange={handleFormDataChange}
                  />
                </label>

                <button type="submit" className={css.editBtn}>
                  EDIT
                </button>
                <button type="button" className={css.deleteBtn} onClick={handleDeleteTransaction}>
                  DELETE
                </button>
            
              </form> */}

          <button
            type="button"
            className={css.cancelBtn}
            onClick={handleModalCloseClick}
          >
            CANCEL
          </button>
        </div>
      </ModalBackdrop>
    </>,
    document.body
  );
};

export default EditTransactionModal;
