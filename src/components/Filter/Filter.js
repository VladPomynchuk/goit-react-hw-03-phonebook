import PropTypes from 'prop-types';
import { Label, Input } from './Filter.styled';

const Filter = ({ callback, value }) => {
  return (
    <>
      <Label htmlFor="filter">Find contacts by name</Label>
      <Input type="text " name="filter" onChange={callback} value={value} />
    </>
  );
};

Filter.propTypes = {
  callback: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Filter;
