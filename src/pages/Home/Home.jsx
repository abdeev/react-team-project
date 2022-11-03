import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectIsLoggedIn,
  selectUserToken,
} from 'redux/authorization/selectorsAuth';
import { getCategoriesThunk } from 'redux/categories/thunkCategories';
import { getTransactionsThunk } from 'redux/transactions/thunksTransactions';
import AddTransactionModal from 'components/AddTransaction/AddTransactionModal';
// import { StatisticsTable } from 'components/Statistics/StatisticsTable/StatisticsTable';

import { showModal } from 'redux/modal/modalSlice';

import css from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const usertoken = useSelector(selectUserToken);

  // const userTransactions = useSelector(selectTransactions);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(getCategoriesThunk());
    dispatch(getTransactionsThunk());
  }, [isLoggedIn, usertoken, dispatch]);

  const handleOpenModal = () => {
    dispatch(showModal(true));
  };

  const handleEscapeKey = e => {
    if (e.key === 'Escape') {
      dispatch(showModal(false));
      //???????????????????????? stops listen only if click on some elements, maybe needs to fix!!!!!!!!!!!!!!!!!
    }
  };

  return (
    <div className="flex gap-6">
      <div className="">
        {/* <p className="text-3xl font-bold underline text-center m-5">Welcome</p>

        {isLoggedIn && (
          <div className="rounded-xl border-2 border-solid border-black p-4 bg-green-300">
            <p className="py-1 font-sm font-normal text-2xl">
              Welcome <span className="font-bold">{userName}</span>
            </p>
            <p className="py-1 font-sm font-normal text-2xl">
              Your's E-mail address:{' '}
              <span className="font-bold">{userEmail}</span>
            </p>
            <p className="py-1 font-sm font-normal text-2xl">
              Your's transactions in database:{' '}
              <span className="font-bold">{userTransactions.length}</span>
            </p>
          </div>
        )}
   
    
        {/* <TransactionsForm /> */}

        {/* <StatisticsTable/> */}

        <button
          type="button"
          onClick={handleOpenModal}
          onKeyDown={handleEscapeKey}
          className={css.openModalBtn}
        ></button>

        <AddTransactionModal />
      </div>
    </div>
  );
};

export default Home;
