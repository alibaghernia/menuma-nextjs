import { FC } from 'react';

declare type ISearchField = {
  type: 'text' | 'check' | 'number';
  title: string;
  name: string;
  placeholder?: string;
  checkValue?: string;
};

type FieldName = string;
declare interface IAdvancedSearchProps {
  open: boolean;
  fields: ISearchField[];
  initial?: Record<FieldName, any>;
  float?: boolean;
  className?: string;
  loading?: boolean;
  onClose?: () => void;
  onSearch: (
    values: Record<IAdvancedSearchProps['fields'][number]['name'], any>,
  ) => void;
}

declare type IAdvancedSearch = FC<IAdvancedSearchProps>;
