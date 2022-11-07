import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCategories } from 'redux/categories/selectCategories';
import EditTransactionModal from 'components/EditTransactionModal/EditTransactionModal';

import { formatDate } from 'utils/convertDataForChart';
import Modal from 'components/Modal/Modal';

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

  const getNameByCategoryId = id => {
    return categories.filter(category => category.id === id)[0]?.name;
  };

  const handleOpenEditModal = event => {
    event.preventDefault();
    setShowEditModal(true);
  };

  const rowBorderColor =
    type === 'EXPENSE' ? ` ${css.redBorder}` : ` ${css.greenBorder}`;
  const rowSumColor =
    type === 'EXPENSE' ? ` ${css.redSum}` : ` ${css.greenSum}`;

  return (
    <>
      <tr
        className={`${css.transactionsTableRow_data} ${rowBorderColor}`}
        onClick={handleOpenEditModal}
      >
        <td
          data-th="Date"
          className={`${css.tableData_alStart} ${css.tableDataDate}`}
        >
          {formatDate(transactionDate)}
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
        <td data-th="Sum" className={`${css.tableData_alEnd} ${rowSumColor}`}>
          {amount}
        </td>
        <td
          data-th="Balance"
          className={`${css.tableData_alEnd} ${css.tableDataBalance}`}
        >
          {balanceAfter.toFixed(2)}
        </td>
      </tr>

      {showEditModal && (
        <Modal
          isModalOpen={showEditModal}
          setIsModalOpen={setShowEditModal}
        >
          <EditTransactionModal setShowEditModal={setShowEditModal}
            transaction={{
              id,
              transactionDate,
              type,
              categoryId,
              comment,
              amount,
            }}/>
        </Modal>
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
