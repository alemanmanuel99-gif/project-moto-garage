import type { InputHTMLAttributes } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function FormField({ label, ...inputProps }: FormFieldProps) {
  return (
    <label className="form-field">
      <span className="form-field__label">{label}</span>
      <input className="form-field__input" {...inputProps} />
    </label>
  );
}

export default FormField;
