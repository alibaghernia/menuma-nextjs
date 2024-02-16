'use client';
import { ProviderContext } from '@/providers/main/provider';
import { ProductEntity } from '@/services/business/business';
import React, { useContext, useEffect } from 'react';

const Client = ({ product }: { product: ProductEntity }) => {
  const { state: mainProviderState, checkCartItemsExist } =
    useContext(ProviderContext);
  useEffect(() => {
    if (
      mainProviderState.restored &&
      product &&
      product.metadata?.some((tag: string) => tag == 'sold_out')
    ) {
      checkCartItemsExist([product]);
    }
  }, [mainProviderState.restored, product]);
  return <></>;
};

export default Client;
