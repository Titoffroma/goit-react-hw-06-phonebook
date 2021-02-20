import { load } from '../utils/localStorage';
import { createReducer, configureStore } from '@reduxjs/toolkit';
import { addContact, removeContact, filterContacts } from './actions';

const items = load('Contacts') || [];

const InitialState = {
  contacts: {
    items,
    filter: '',
  },
};

const reducer = createReducer(InitialState, {
  [addContact]: (state, action) => {
    state.contacts.items.push(action.payload);
  },
  [removeContact]: (state, action) => {
    state.contacts.items = state.contacts.items.filter(
      item => item.id !== action.payload,
    );
  },
  [filterContacts]: (state, action) => {
    state.contacts.filter = action.payload;
  },
});

const store = configureStore({
  reducer,
});

export default store;
