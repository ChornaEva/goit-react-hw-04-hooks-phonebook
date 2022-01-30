import { useState } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import {
  PhonebookTitle,
  PhonebookInputWrapper,
  PhonebookLabel,
  PhonebookInput,
  AddButton,
} from './ContactForm.styled';

const ContactForm = ({ onSubmit, contacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);

        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  //   // при отправке формы получаем введенные значения и очищаем её
  const handleSubmit = event => {
    event.preventDefault();

    // проверяем наличие имени которое записывается и которое уже есть в списке контактов
    // нет-записываем,есть-алерт
    if (contacts?.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      onSubmit({ name, number });
      reset();
    }
  };

  // после отправки данных очищаем форму
  const reset = () => {
    setName('');
    setNumber('');
  };

  //   // создаем айди для будущих обьектов
  const nameInputId = shortid.generate();
  const numberInputId = shortid.generate();

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div>
        <PhonebookTitle>Phonebook</PhonebookTitle>
        <PhonebookInputWrapper>
          <PhonebookLabel htmlFor={nameInputId}>
            <PhonebookInput
              name="name"
              type="text"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              placeholder=""
              onChange={handleInputChange}
              id={nameInputId}
            />
            Name
          </PhonebookLabel>
          <PhonebookLabel htmlFor={numberInputId}>
            <PhonebookInput
              name="number"
              type="text"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              placeholder=""
              onChange={handleInputChange}
              id={numberInputId}
            />
            Number
          </PhonebookLabel>
          <AddButton type="submit">Add contact</AddButton>
        </PhonebookInputWrapper>
      </div>
    </form>
  );
};

export default ContactForm;

// class ContactForm extends Component {
//   state = {
//     name: "",
//     number: "",
//   };

//   handleInputChange = (event) => {
//     const { name, value } = event.currentTarget;
//     this.setState({ [name]: value });
//   };

//   // при отправке формы получаем введенные значения и очищаем её
//   handleSubmit = (event) => {
//     event.preventDefault();

//     // проверяем наличие имени которое записывается и которое уже есть в списке контактов
//     // нет-записываем,есть-алерт
//     if (
//       this.props.contacts?.find((contact) => contact.name === this.state.name)
//     ) {
//       alert(`${this.state.name} is already in contacts`);
//     } else {
//       this.props.onSubmit(this.state);
//       this.reset();
//     }
//   };

//   // после отправки данных очищаем форму
//   reset = () => {
//     this.setState({ name: "", number: "" });
//   };

//   // создаем айди для будущих обьектов
//   nameInputId = shortid.generate();
//   numberInputId = shortid.generate();

//   render() {
//     return (
//       <form autoComplete="off" onSubmit={this.handleSubmit}>
//         <div>
//           <PhonebookTitle>Phonebook</PhonebookTitle>
//           <PhonebookInputWrapper>
//             <PhonebookLabel htmlFor={this.nameInputId}>
//               <PhonebookInput
//                 name="name"
//                 type="text"
//                 pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//                 title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//                 required
//                 value={this.state.name}
//                 placeholder=""
//                 onChange={this.handleInputChange}
//                 id={this.nameInputId}
//               />{" "}
//               Name
//             </PhonebookLabel>
//             <PhonebookLabel htmlFor={this.numberInputId}>
//               <PhonebookInput
//                 name="number"
//                 type="text"
//                 pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//                 title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//                 required
//                 value={this.state.number}
//                 placeholder=""
//                 onChange={this.handleInputChange}
//                 id={this.numberInputId}
//               />{" "}
//               Number
//             </PhonebookLabel>
//             <AddButton type="submit">Add contact</AddButton>
//           </PhonebookInputWrapper>
//         </div>
//       </form>
//     );
//   }
// }

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

