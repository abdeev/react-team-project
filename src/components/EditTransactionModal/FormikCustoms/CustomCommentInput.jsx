import { useField } from 'formik';
import PropTypes from 'prop-types';
import css from '../EditTransactionModal.module.css';

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

CustomCommentInput.propTypes = {
  props: PropTypes.exact({
    name: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
  }),
};

export default CustomCommentInput;
