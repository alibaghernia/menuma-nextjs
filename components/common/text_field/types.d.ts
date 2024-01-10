import { FC } from 'react';

declare interface ITextFieldProps {
  className?: string;
  onChange: (event: any) => void;
  placeholder?: string;
  required?: boolean;
  type: 'text' | 'password';
  name: string;
  id?: string;
}

declare type ITextField = FC<ITextFieldProps>;
