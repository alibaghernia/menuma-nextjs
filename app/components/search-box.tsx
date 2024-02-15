'use client';
import { SearchBusinessBox } from '@/components/common/search_business_box/search_business_box';
import { LOADING_KEYS } from '@/providers/general/contants';
import { useLoadings, useCustomRouter } from '@/utils/hooks';
import React, { useState } from 'react';

const SearchBox = () => {
  const [addL, removeL] = useLoadings();
  const router = useCustomRouter();
  const [searchField, setSearchField] = useState('');

  const handleSearchBusiness = (searchPhrase: string) => {
    if (!searchPhrase) return;
    addL(LOADING_KEYS.pageLoading);
    router.push(`/search?search=${searchPhrase}`);
  };
  return (
    <SearchBusinessBox
      value={searchField}
      onChange={setSearchField}
      onSearch={handleSearchBusiness}
    />
  );
};

export default SearchBox;
