'use client';
import React, { useState } from 'react';
import { ISearchBusinessBox } from './types';
import { SearchIcon } from '@/icons/search';
import { SettingConfig } from '@/icons/setting-config';
import { Button } from 'antd/lib';
import tailwindConfig from '@/tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';

const SearchBusinessBox: ISearchBusinessBox = (props) => {
  const resolvedTailwindConfig = resolveConfig(tailwindConfig);
  return (
    <div className="flex items-center border p-[.5rem] border-1 gap-[.5rem] rounded-[.63rem] bg-white">
      <SearchIcon color="#959595" />
      <input
        className="bg-none border-none outline-none w-full"
        placeholder="جستجوی اسم کافه..."
        value={props.value}
        onChange={({ target: { value } }) => props.onChange(value)}
        onKeyDown={({ key }) => {
          if (key == 'Enter') props.onSearch(props.value);
        }}
      />
      {props.onAdvancedSearchClick && (
        <Button
          type="text"
          icon={
            <SettingConfig
              color={resolvedTailwindConfig.theme?.colors![
                'typography'
              ].toString()}
            />
          }
          onClick={() => props.onAdvancedSearchClick?.()}
        />
      )}
      <Button type="primary" onClick={() => props.onSearch(props.value)}>
        جستجو
      </Button>
    </div>
  );
};

export { SearchBusinessBox };
