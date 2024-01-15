import React from 'react';
import { Select } from 'antd/lib';
import { ISelectField } from './types';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export const SelectField: ISelectField = (props) => {
  return (
    <Select
      style={props.style}
      showSearch={props.showSearch}
      placeholder={props.placeholder}
      optionFilterProp={props.optionFilterProp}
      onChange={props.onChange}
      onSearch={props.onSearch}
      filterOption={props.filterOption}
      options={props.option}
    />
  );
};
