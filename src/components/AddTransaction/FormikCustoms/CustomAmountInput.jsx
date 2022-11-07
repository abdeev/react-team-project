import { useField } from 'formik';
import PropTypes from 'prop-types';
import css from '../AddTransactionModal.module.css';

const CustomAmountInput = ({ ...props }) => {
  const [field, meta] = useField(props);

  console.log(props);

  return (
    <>
      <input
        {...field}
        {...props}
        className={
          meta.touched && meta.error ? css.inputError : css.inputAmount
        }
      />
      {meta.touched && meta.error && (
        <div className={css.amountErrorMesage}>{meta.error}</div>
      )}
    </>
  );
};

CustomAmountInput.propTypes = {
  props: PropTypes.exact({
    name: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
  }),
};

export default CustomAmountInput;
