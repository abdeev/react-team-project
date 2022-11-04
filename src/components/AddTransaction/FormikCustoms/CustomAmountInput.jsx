import { useField } from 'formik';
import css from '../AddTransactionModal.module.css';

const CustomAmountInput = ({ ...props }) => {
  const [field, meta] = useField(props);

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

export default CustomAmountInput;
