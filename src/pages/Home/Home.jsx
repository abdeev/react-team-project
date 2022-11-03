import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectIsLoggedIn,
  selectUserToken,
} from 'redux/authorization/selectorsAuth';
import { getCategoriesThunk } from 'redux/categories/thunkCategories';
import { getTransactionsThunk } from 'redux/transactions/thunksTransactions';
// import AddTransactionModal from 'components/AddTransaction/AddTransactionModal';
// import { StatisticsTable } from 'components/Statistics/StatisticsTable/StatisticsTable';

// import { showModal } from 'redux/modal/modalSlice';

// import css from './Home.module.css';

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

  return (
    <div>
      <ul style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
        <li>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum,
          adipisci!
        </li>
        <li>
          Nisi quasi soluta laudantium quas obcaecati quis doloremque. Modi,
          suscipit.
        </li>
        <li>
          Soluta a atque similique! Consequatur, quos! Ipsam adipisci impedit
          maiores.
        </li>
        <li>
          Doloribus mollitia, nemo quos et totam ullam inventore corporis!
          Eveniet.
        </li>
        <li>
          Sapiente cum necessitatibus dolor aperiam debitis asperiores fugiat
          aut reiciendis!
        </li>
        <li>
          Omnis mollitia exercitationem corporis in tenetur inventore culpa,
          expedita ratione!
        </li>
        <li>
          Nulla reprehenderit exercitationem dolore molestiae veniam ipsam
          voluptatum sapiente illum!
        </li>
        <li>
          Sequi, aut. Est possimus, repellendus iusto sed aspernatur illo neque.
        </li>
        <li>
          Aliquid dolorum odit praesentium quis id voluptatum quae fuga unde?
        </li>
        <li>
          Provident eligendi quae soluta saepe, deserunt nihil veniam labore
          hic?
        </li>
        <li>
          Ipsam quo magnam quae repellat molestiae iure voluptate, ducimus
          placeat?
        </li>
        <li>
          At sapiente illum vitae velit unde officiis aperiam architecto dicta!
        </li>
        <li>
          Corporis quibusdam culpa fuga voluptates, sint hic consequatur labore
          natus.
        </li>
        <li>
          Est dolor exercitationem sapiente odio perspiciatis natus incidunt
          tenetur perferendis!
        </li>
        <li>
          Maiores est hic repudiandae modi sunt neque delectus rerum corrupti?
        </li>
        <li>
          Facilis numquam voluptates voluptatibus omnis ex veniam molestias
          ullam quisquam?
        </li>
        <li>
          Praesentium quasi vitae pariatur ipsa porro maxime sint, tenetur
          soluta.
        </li>
        <li>
          Asperiores nemo ut culpa consequatur porro aliquam voluptatibus odit
          saepe?
        </li>
        <li>
          Iure animi ea nulla cupiditate tenetur expedita, illo deserunt
          perspiciatis?
        </li>
        <li>
          Repudiandae fuga odio mollitia totam pariatur illo aspernatur suscipit
          libero.
        </li>
        <li>
          Dolore, quae obcaecati optio pariatur reprehenderit magnam placeat!
          Pariatur, blanditiis?
        </li>
        <li>
          Beatae, cupiditate? Ratione id, explicabo officia numquam tenetur
          culpa illum?
        </li>
        <li>
          Quibusdam nemo aspernatur at temporibus fugiat beatae consequatur quae
          architecto!
        </li>
        <li>
          Modi facilis numquam doloremque inventore optio, labore voluptate
          neque magni!
        </li>
        <li>
          Quis debitis vitae qui minus repellendus provident perferendis ipsum
          quae?
        </li>
        <li>
          Asperiores et eligendi adipisci possimus eaque similique! Est, velit
          perspiciatis.
        </li>
        <li>
          Qui, culpa! Ducimus officia alias maxime nisi quidem consequatur
          reiciendis!
        </li>
        <li>
          Nobis voluptate sint explicabo quia praesentium, iste suscipit
          architecto repellat?
        </li>
        <li>
          Dolorem, ut modi. Mollitia eius eveniet commodi quaerat repellat!
          Commodi?
        </li>
        <li>
          Tempora rerum accusamus omnis quidem dolorem quia ab dolores vel.
        </li>
        <li>
          Ratione repellendus animi blanditiis unde ipsa accusamus quod tenetur
          nihil.
        </li>
        <li>
          Vero nobis temporibus numquam! Inventore optio magnam maxime. Dolorem,
          quasi!
        </li>
        <li>
          Suscipit veritatis eaque ad neque repellat delectus nobis minus quae.
        </li>
        <li>
          Accusamus dolorem et vitae! Iste reprehenderit corrupti deserunt
          pariatur tempore.
        </li>
        <li>
          Architecto corporis minus adipisci delectus velit iure labore vel!
          Eaque!
        </li>
        <li>
          Quam officiis quidem doloribus voluptatem explicabo provident commodi
          possimus cumque?
        </li>
        <li>
          Ipsam magni officiis ratione laborum necessitatibus vitae nesciunt sed
          eaque?
        </li>
        <li>
          Tempore laudantium harum placeat qui ullam laborum officiis quod
          accusamus!
        </li>
        <li>
          Quas suscipit beatae sequi sed harum, natus distinctio quae molestiae?
        </li>
        <li>
          Incidunt maiores, perferendis inventore sit dolore tempora ut
          deserunt? Corporis?
        </li>
      </ul>
    </div>
  );
};

export default Home;
