import { FC } from 'react';

declare interface ISearchFieldProps {
  className?: string;
  inputClassNames?: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  value: string;
}

declare type ISearchField = FC<ISearchFieldProps>;
