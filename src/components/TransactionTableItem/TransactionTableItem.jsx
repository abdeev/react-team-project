import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCategories } from 'redux/categories/selectCategories';
// import EditTransactionModal from 'components/EditTransactionModal/EditTransactionModal';
import { UpdateTransactionModal } from 'components/UpdateTransactionModal/UpdateTransactionModal';

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
    console.log(event.currentTarget);
    setShowEditModal(true);
  };
  const handleEscapeKey = event => {
    if (event.key === 'Escape') {
      setShowEditModal(false);
    }
  };
  return (
    <>
      <tr className={css.tr} onClick={handleOpenEditModal}>
        <td className={css.tdl}>{transactionDate}</td>
        <td className={css.tdc}>{type === 'EXPENSE' ? '-' : '+'}</td>
        <td className={css.tdl}>{getNameByCategoryId(categoryId)}</td>
        <td className={css.tdl}>{comment}</td>
        <td className={css.tdr}>{amount}</td>
        <td className={css.tdr}>{balanceAfter}</td>
      </tr>
      {showEditModal && (
        <UpdateTransactionModal
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
