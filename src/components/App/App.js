import { Component, createRef } from 'react';
import { Transition, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import PhonebookCard from '../PhonebookCard/PhonebookCardStyled';
import Section from '../Section';
import Form from '../Form';
import ContactsList from '../ContactsList';
import Button from '../Button/ButtonStyled';
import Title from '../Title';
import ErrorNote from '../ErrorNote';
import { v4 as uuidv4 } from 'uuid';
import { save } from '../../utils/localStorage';
import styles from './app.module.css';
import './app.css';

class App extends Component {
  state = {
    isIn: false,
    error: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const duplicate = this.props.contacts.find(
      contact => contact.name === e.target.elements[0].value,
    );

    if (duplicate) {
      setTimeout(() => {
        this.setState({
          error: '',
        });
      }, 3000);
      return this.setState({
        error: `${duplicate.name} is already in contacts`,
      });
    }

    const name = e.target.elements[0].value;
    const number = e.target.elements[1].value;
    const id = uuidv4();

    this.props.addContact({ name, number, id });
    // this.forceUpdate();
  };

  handleChangeFilter = e => {
    this.props.filterContacts(e.target.value);
  };

  handleRemoveContact = e => {
    const id = e.target.dataset.id;
    this.props.removeContact(id);
  };

  componentDidMount() {
    this.setState({
      isIn: true,
    });
  }

  render() {
    const { isIn, error } = this.state;
    const { contacts, filter } = this.props;
    save('Contacts', contacts);
    const search = contacts.length > 1;
    const isError = error.length > 0;
    const ref = createRef(null);
    const errorRef = createRef(null);

    return (
      <>
        <CSSTransition
          in={isError}
          nodeRef={errorRef}
          timeout={500}
          classNames="error"
          unmountOnExit
        >
          <div ref={errorRef} className="error-wrapper">
            <ErrorNote>{error}</ErrorNote>
          </div>
        </CSSTransition>
        <Transition in={isIn} nodeRef={ref} timeout={200}>
          {state => (
            <Title
              title="My Phonebook App"
              fontSize={30}
              padding={20}
              tagName="h1"
              className={styles[state]}
            />
          )}
        </Transition>
        <PhonebookCard>
          <Section title="Phonebook">
            <Form handleSubmit={this.handleSubmit} />
          </Section>
          <Section title="Contacts">
            <CSSTransition
              in={search}
              nodeRef={ref}
              timeout={750}
              classNames="slide"
              unmountOnExit
            >
              <div ref={ref}>
                <Title
                  as="h3"
                  title="Find contacts by name"
                  fontSize="16"
                  textAlign="left"
                />
                <Button
                  as="input"
                  type="text"
                  id="filter"
                  onChange={this.handleChangeFilter}
                  value={filter}
                />
              </div>
            </CSSTransition>
            <ContactsList
              contactsList={contacts}
              filter={filter}
              handleRemoveContact={this.handleRemoveContact}
            />
          </Section>
        </PhonebookCard>
      </>
    );
  }
}

const mapStateToProps = ({ contacts }) => ({
  contacts: contacts.items,
  filter: contacts.filter,
});

const mapDispatchToProps = dispatch => ({
  addContact: newContact =>
    dispatch({
      type: 'ADD_CONTACT',
      payload: newContact,
    }),
  removeContact: id =>
    dispatch({
      type: 'REMOVE_CONTACT',
      payload: id,
    }),
  filterContacts: filter =>
    dispatch({
      type: 'FILTER_CONTACT',
      payload: filter,
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
