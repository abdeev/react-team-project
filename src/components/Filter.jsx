import { useDispatch } from "react-redux";

import { searchContacts } from 'redux/contacts/sliceFilter';

export const Filter = () => {

    const dispatch = useDispatch();

    const handleFindName = ({ target }) => {
        dispatch(searchContacts(target.value.toLowerCase()));
    }

    return (
        <div className="flex flex-col p-7 rounded-xl border border-solid border-black bg-green-300" >
            <label className="mb-2 text-2xl font-sm" htmlFor="find" >Find contacts by name</label>
            <input className="text-2xl font-sm py-1 px-5 rounded-xl border border-black" onChange={handleFindName} id="find" type="text" name="findName" pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$" placeholder="Enter name"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan" required />
        </div>
    )
}