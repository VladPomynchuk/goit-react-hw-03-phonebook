import { Component } from 'react';
import ContactForm from 'components/ContactForm';
import ContactsList from 'components/ContactsList';
import Filter from 'components/Filter';
import {
  Container,
  WrapperBorder,
  Wrapper,
  MainTitle,
  Title,
} from './Phonebook.styled';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';

const LS_KEY = 'contacts_array';

export default class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localStorageContacts = JSON.parse(localStorage.getItem(LS_KEY));

    if (localStorageContacts !== null) {
      this.setState({ contacts: localStorageContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(this.state.contacts));
    }
  }

  handleSubmit = value => {
    const { name } = value;

    if (
      this.state.contacts.some(
        el => el.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return toast.error(`${name} is already in contacts`);
    }
    this.setState(({ contacts }) => {
      return { contacts: [...contacts, { id: nanoid(), ...value }] };
    });
  };

  handleDelete = id => {
    this.setState({
      contacts: this.state.contacts.filter(el => el.id !== id),
    });
  };

  handleFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const { filter, contacts } = this.state;

    const filterContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <>
        <Container>
          <WrapperBorder>
            <MainTitle>Phonebook</MainTitle>
            <ContactForm onSubmit={this.handleSubmit} />
          </WrapperBorder>

          <Wrapper>
            <Title>Contacts</Title>
            <Filter callback={this.handleFilter} value={filter} />

            <ContactsList
              handleDelete={this.handleDelete}
              data={filterContacts}
            />
          </Wrapper>
        </Container>
      </>
    );
  }
}
