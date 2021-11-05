export type FiledValidatorType = (value: string) => string | undefined;

export const required: FiledValidatorType = (value) => {
  if (value) return undefined;
  return 'Field is required';
};

export const maxLengthCreator =
  (maxLength: number): FiledValidatorType =>
  (value) => {
    if (value.length > maxLength) return `Maximum length of ${maxLength} symbols has been exceeded`;
    return undefined;
  };

export const emailValidation: FiledValidatorType = (value) => {
  if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
    return `Invalid Email Address`;
  return undefined;
};
