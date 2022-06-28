import { Component } from 'react';
import ContactForm from './ContactForm';
import ContactsList from './ContactsList';
import Filter from './Filter';
import {
  Container,
  WrapperBorder,
  Wrapper,
  MainTitle,
  Title,
} from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleSubmit = value => {
    const { name } = value;

    if (
      this.state.contacts.some(
        el => el.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in contacts`);
    }
    this.setState(({ contacts }) => {
      const newArray = [...contacts];

      newArray.push(value);

      return { contacts: newArray };
    });
  };

  handleDelete = id => {
    this.setState({
      contacts: this.state.contacts.filter(el => el.name !== id),
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
      <Container>
        <WrapperBorder>
          <MainTitle>Phonebook</MainTitle>
          <ContactForm callback={this.handleSubmit} />
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
    );
  }
}
