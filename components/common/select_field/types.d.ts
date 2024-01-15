import { FC } from 'react';

declare interface ISelectFieldProps {
  className?: string;
  onChange: (event: any) => void;
  onSearch: (event: any) => void;
  placeholder?: string;
  filterOption: any;
  option: any;
  name?: string;
  id?: string;
  showSearch: boolean;
  optionFilterProp: string;
  mode?: '' | 'multiple' | 'tags';
  style?: object;
}

declare type ISelectField = FC<ISelectFieldProps>;
