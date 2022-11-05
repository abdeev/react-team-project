import { useField, useFormikContext } from 'formik';
import { useSelector } from 'react-redux';
import Select from 'react-select';

import css from '../EditTransactionModal.module.css';

const CustomSelect = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  const categories = useSelector(state => state.categories.categories);

  const options = categories
    .filter(el => el.type !== 'INCOME')
    .map(el => ({ value: el.name, label: el.name, id: el.id, type: el.type }));
 
  return (
    <>
      <Select
        {...props}
        {...field}
        options={options}
        value={field.value}
        onChange={val => {
          setFieldValue(field.name, val);
        }}
        placeholder="Select category"
        classNamePrefix="custom-select"
        className={
          meta.touched && meta.error ? 'custom-select__control--error' : ''
        }
      />
      {meta.touched && meta.error && (
        <div className={css.errorMessage}>{meta.error}</div>
      )}
    </>
  );
};

export default CustomSelect;
