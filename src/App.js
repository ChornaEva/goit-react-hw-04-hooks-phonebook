import './App.css';
import { useState, useEffect, useRef } from 'react';
import shortid from 'shortid';

import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import { FormContainer, ContactsTitle } from './App.styled';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContatcts = JSON.parse(savedContacts);

    if (parsedContatcts) {
      setContacts(parsedContatcts);
    }
  }, []);

  // сравнение нового контакта с имеющимся, запись нового в локал
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const userContact = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts(prevContacts => [...prevContacts, userContact]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const normalizedFilter = filter.toLowerCase();

  const filteredContacts = contacts?.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  // сохраняем в стейт данные фильтра

  const changeInputFilter = event => {
    const { name, value } = event.currentTarget;
    setFilter(value);
  };

  return (
    <FormContainer>
      <ContactForm onSubmit={addContact} contacts={contacts} />
      <ContactsTitle>Contacts</ContactsTitle>
      <Filter filter={filter} onChange={changeInputFilter} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </FormContainer>
  );
};

export default App;
