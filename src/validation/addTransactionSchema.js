import * as yup from 'yup';

export const addTransactionSchema = yup.object().shape({
  comment: yup.string().min(2, 'Comment should be at least 2 characters long'),
  amount: yup
    .string()
    .matches(/^\d+$/, 'Should be a number')
    .required('Must enter amount'),

  isExpenseChecked: yup.boolean(),
  selectData: yup
    .object()
    .nullable(true)
    .when('isExpenseChecked', {
      is: true,
      then: yup.object().nullable(true).required('Must select category'),
    }),
});
