import { load } from '../utils/localStorage';
import { createStore } from 'redux';
import { types } from './actions';

const items = load('Contacts') || [];

const InitialState = {
  contacts: {
    items,
    filter: '',
  },
};

const reducer = (state = InitialState, action) => {
  const contacts = { ...state.contacts };

  switch (action.type) {
    case types.addContact:
      const items = [...contacts.items, action.payload];
      contacts.items = items;
      return {
        contacts,
      };
    case types.removeContact:
      contacts.items = contacts.items.filter(
        item => item.id !== action.payload,
      );
      return {
        contacts,
      };
    case types.filterContacts:
      contacts.filter = action.payload;
      return {
        contacts,
      };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
