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
    <div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem
        perferendis impedit sit harum voluptas in voluptatum similique ratione
        amet reiciendis adipisci assumenda non obcaecati natus autem iusto
        veritatis aperiam, fugit dolore vel omnis. Deserunt voluptatibus
        assumenda, dolor sint incidunt facere perspiciatis fugiat consequuntur
        et, ex facilis. Incidunt, inventore voluptate. Unde error autem
        reprehenderit cupiditate aliquam nemo porro ipsam praesentium eius.
        Nostrum blanditiis dolor soluta incidunt ducimus repudiandae, esse ipsa
        laudantium ipsam non eaque laboriosam repellat dicta eum aliquam eius,
        veniam provident, facilis nam? Ratione unde amet expedita. Perspiciatis
        rerum quos laborum in repellat architecto consectetur inventore
        explicabo sed cupiditate, aspernatur quia, vel, nulla amet at fuga?
        Eaque tempore molestiae dicta quas quam sequi ratione non culpa magnam
        alias sunt veritatis, qui saepe mollitia odit cum recusandae, illo natus
        sit? Repudiandae natus odio est neque perferendis nam delectus iure
        quisquam possimus sint ipsa, repellat, dolores doloribus nulla corrupti
        eos? Doloribus minus soluta numquam beatae dolor. Expedita dolore
        doloribus dignissimos recusandae animi eos eligendi quas nesciunt earum,
        vitae ad sint et, quibusdam impedit totam voluptate consequuntur
        reiciendis! In dicta reprehenderit doloribus laudantium nulla unde,
        inventore quia. Voluptas corrupti dolor aut earum nesciunt nisi, odit
        iure natus aspernatur numquam vel vero eligendi doloribus voluptatibus
        suscipit alias? Aut, odio? Expedita in et voluptatem nihil tempora?
        Officia labore quas minima necessitatibus quibusdam distinctio sit vero!
        Porro soluta quo ipsa. Fuga deserunt deleniti ullam sapiente sint
        dolores minima, consectetur nobis vitae, quas magnam possimus quibusdam
        id quasi cumque repellat similique suscipit unde dicta, laborum totam
        praesentium. Facere rerum totam culpa, at quaerat sunt ducimus optio
        quisquam quam vero, placeat exercitationem laboriosam hic qui sit
        reiciendis quae. Consectetur blanditiis commodi minus corporis pariatur
        dolorum adipisci facilis similique voluptates vitae mollitia totam
        quaerat doloremque hic magni perferendis distinctio, id assumenda ut sed
        quae maiores? Id perferendis eius at.
      </div>

      <button
        type="button"
        onClick={handleOpenModal}
        onKeyDown={handleEscapeKey}
        className={css.openModalBtn}
      ></button>

      <AddTransactionModal />
    </div>
  );
};

export default Home;
