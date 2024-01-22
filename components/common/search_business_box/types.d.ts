import { FC, PropsWithChildren } from 'react';

declare interface ISearchBusinessBoxProps {
  onSearch: (value: string) => void;
  onAdvancedSearchClick?: () => void;
  value: string;
  onChange: (value: string) => void;
}

declare type ISearchBusinessBox = FC<
  PropsWithChildren<ISearchBusinessBoxProps>
>;
