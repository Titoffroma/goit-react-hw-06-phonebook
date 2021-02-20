export const types = {
  addContact: 'ADD_CONTACT',
  removeContact: 'REMOVE_CONTACT',
  filterContacts: 'FILTER_CONTACT',
};

const addContact = newContact => ({
  type: types.addContact,
  payload: newContact,
});
const removeContact = id => ({
  type: types.removeContact,
  payload: id,
});
const filterContacts = filter => ({
  type: types.filterContacts,
  payload: filter,
});

export { addContact, removeContact, filterContacts };
