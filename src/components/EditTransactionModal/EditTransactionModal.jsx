import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import ReactDOM from 'react-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getTransactionsThunk, editTransactionThunk, deleteTransactionsThunk } from 'redux/transactions/thunksTransactions';
import { selectCategories } from 'redux/categories/selectCategories';

import ModalBackdrop from './ModalBackdrop/ModalBackdrop';

import 'react-datepicker/dist/react-datepicker.css';
import css from './EditTransactionModal.module.css';

const EditTransactionModal = ({ closeModalOnKey, setShowEditModal, transaction: { id, transactionDate, type, categoryId, comment, amount } }) => {
  // console.log(id, transactionDate, type, categoryId, comment, amount);

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

    return () => { window.removeEventListener('keydown', closeModalOnKey); }
  }, [closeModalOnKey]);
  
  const categories = useSelector(state => state.categories.categories);

  const options = categories.map(el => {
    return { value: el.name, label: el.name, id: el.id, type: el.type };
  });

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
    setShowEditModal(false)
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
    setShowEditModal(false)
  };

  const handleModalSubmit = e => {
    e.preventDefault();
    if (formData.isExpenseChecked) {
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
        // .unwrap()
        .then(() => {
          setFormData(initialState);
          setShowEditModal(false);
        })
        .catch(() => {
          alert('smth went wrong, try again');
          setFormData(initialState);
        }).finally(dispatch(getTransactionsThunk()));
    } else {
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
        // .unwrap()
        .then(() => {
          setFormData(initialState);
          setShowEditModal(false);
        })
        .catch(() => {
          setFormData(initialState);
          alert('smth went wrong, try again');
        }).finally(dispatch(getTransactionsThunk()));
    }
  };

  const handleDelateTransaction = (event) => {
    console.log(event.target);
    dispatch(deleteTransactionsThunk(id));
    dispatch(getTransactionsThunk());
    setShowEditModal(false);
  }

  return ReactDOM.createPortal(
    <>
      {/* {isModalOpen && (  */}
        <ModalBackdrop onBackClick={handleBackdropClick} closeModalOnKey={closeModalOnKey}>
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
                  defaultChecked={type === 'INCOME' ? false : true}
                  onChange={handleChange}
                />
                <label htmlFor="toggle"></label>
                <span className={css.incomeSpan}>Income</span>
                <span className={css.expenseSpan}>Expense</span>
              </div>

              <form className={css.form} onSubmit={handleModalSubmit}>
                {formData.isExpenseChecked && (
                  <Select
                    options={options}
                    value={formData.selectData}
                    // defaultValue={paramsCategories.filter(category => category.id === categoryId)[0].name}
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
                <button type="button" className={css.deleteBtn} onClick={handleDelateTransaction}>
                  DELETE
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

    </>, document.body
  )
};

export default EditTransactionModal;
