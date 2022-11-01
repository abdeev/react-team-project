import { useSelector, useDispatch } from "react-redux";

import { selectContacts } from 'redux/contacts/selectorsContacts';
import { addContactsThunk } from 'redux/contacts/thunksContacts';

export const ContactForm = () => {

    const contactsStore = useSelector(selectContacts);
    const dispatch = useDispatch();

    const handleAddName = event => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const { name, number } = Object.fromEntries(formData);

        const contact = {
            name,
            number,
        };

        if (contactsStore.map(contact => contact.name).includes(name)) {
            alert(`${name} is already in contacts`);
            return;
        }

        dispatch(addContactsThunk(contact));
        event.target.reset();
    }

    return (
        <form className='flex flex-col p-7 rounded-xl border border-solid border-black bg-green-300' onSubmit={handleAddName} >

            <label className="mb-2 text-2xl font-sm text-red-600" htmlFor="name" >Name</label>
            <input className="mb-6 text-2xl font-sm py-1 px-5 rounded-xl border border-black" id="name" type="text" name="name" pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$" placeholder="Enter name"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan" required />
            
            <label className="mb-2 text-2xl font-sm text-red-600" htmlFor="phone" >Number</label>
            <input className="mb-6 text-2xl font-sm py-1 px-5 rounded-xl border border-black" id="phone" type="tel" name="number" pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +" placeholder="000-000-0000" required />

            <button className="bg-yellow-300 shadow-4x1 rounded-xl border border-solid border-black hover:border-yellow-300 hover:bg-green-500 focus:border-yellow-300 focus:bg-green-500 text-2xl font-medium hover:text-yellow-300 focus:text-yellow-300 active:bg-red-500 py-1 px-5" type="submit">Add contact</button>

        </form>
    )
}