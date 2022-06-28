// import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Item, List } from './ContactsList.styled';

const ContactsList = ({ data, handleDelete }) => {
  return (
    <div>
      <List>
        {data.map(el => {
          return (
            <Item key={el.name}>
              {`${el.name}: ${el.number}`}
              <button
                onClick={() => {
                  handleDelete(el.name);
                }}
              >
                Delete
              </button>
            </Item>
          );
        })}
      </List>
    </div>
  );
};

ContactsList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  handleDelete: PropTypes.func.isRequired,
};

export default ContactsList;
