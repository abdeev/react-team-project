import { ContactForm } from "components/ContactForm"
import { ContactList } from "components/ContactList";
import { Filter } from "components/Filter";

const Contacts = () => { 
    return (
        <div className="flex gap-6 p-7 justify-between">
            <div className="flex flex-col gap-6">
                <ContactForm />

                <Filter />
            </div>

            <ContactList />
        </div>
    )
}

export default Contacts;