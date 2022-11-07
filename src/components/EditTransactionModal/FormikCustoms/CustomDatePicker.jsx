import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker.css';
import css from '../EditTransactionModal.module.css';

export const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      dateFormat="dd.MM.yyyy"
      selected={(field.value && new Date(field.value)) || null}
      onChange={val => {
        setFieldValue(field.name, val);
      }}
      onKeyDown={e => {
        e.preventDefault();
      }}
      className={css.input}
    />
  );
};

DatePickerField.propTypes = {
  props: PropTypes.exact({
    name: PropTypes.string,
  }),
};