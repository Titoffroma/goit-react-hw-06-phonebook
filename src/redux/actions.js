import { createAction } from '@reduxjs/toolkit';

const types = {
  ADD_CONTACT: 'contact/add',
  REMOVE_CONTACT: 'contact/remove',
  FILTER_CONTACT: 'contact/filter',
};

const addContact = createAction(types.ADD_CONTACT);

const removeContact = createAction(types.REMOVE_CONTACT);

const filterContacts = createAction(types.FILTER_CONTACT);

export { addContact, removeContact, filterContacts };
