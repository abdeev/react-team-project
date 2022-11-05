import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCategories } from 'redux/categories/selectCategories';
import EditTransactionModal from 'components/EditTransactionModal/EditTransactionModal';

import css from './TransactionTableItem.module.css';

export const TransactionTableItem = ({
  transaction: {
    id,
    transactionDate,
    type,
    categoryId,
    comment,
    amount,
    balanceAfter,
  },
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const categories = useSelector(selectCategories);
  
  const date = new Date(transactionDate);
  const day = String(date.getDate()).padStart(2, 0);
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const year = date.getFullYear();
  const formatDate = `${day}.${month}.${year}`;

  const getNameByCategoryId = id => {
    return categories.filter(category => category.id === id)[0]?.name;
  };

  const handleOpenEditModal = event => {
    event.preventDefault();
    setShowEditModal(true);
  };

  const handleEscapeKey = event => {
    if (event.key === 'Escape') {
      setShowEditModal(false);
    }
  };

  return (
    <>
      <tr
        className={css.transactionsTableRow_data}
        onClick={handleOpenEditModal}
      >
        <td data-th="Date" className={css.tableData_alStart}>
          {formatDate}
        </td>
        <td data-th="Type" className={css.tableData_alCenter}>
          {type === 'EXPENSE' ? '-' : '+'}
        </td>
        <td data-th="Category" className={css.tableData_alStart}>
          {getNameByCategoryId(categoryId)}
        </td>
        <td data-th="Comment" className={css.tableData_alStart}>
          {comment}
        </td>
        <td data-th="Sum" className={css.tableData_alEnd}>
          {amount}
        </td>
        <td data-th="Balance" className={css.tableData_alEnd}>
          {balanceAfter}
        </td>
      </tr>

      {showEditModal && (
        <EditTransactionModal
          closeModalOnKey={handleEscapeKey}
          setShowEditModal={setShowEditModal}
          transaction={{
            id,
            transactionDate,
            type,
            categoryId,
            comment,
            amount,
          }}
        />
      )}
    </>
  );
};

TransactionTableItem.protoTypes = {
  contact: PropTypes.objectOf({
    transactionDate: PropTypes.string,
    type: PropTypes.string,
    categoryId: PropTypes.string,
    comment: PropTypes.string,
    amount: PropTypes.number,
    balanceAfter: PropTypes.number,
  }),
};
