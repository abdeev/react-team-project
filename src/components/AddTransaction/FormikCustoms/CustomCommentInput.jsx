import { useField } from 'formik';
import css from '../AddTransactionModal.module.css';

const CustomCommentInput = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <input
        {...field}
        {...props}
        className={meta.touched && meta.error ? css.commentError : css.comment}
      />
      {meta.touched && meta.error && (
        <div className={css.errorMessage}>{meta.error}</div>
      )}
    </>
  );
};

export default CustomCommentInput;
