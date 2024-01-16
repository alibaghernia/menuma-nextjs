import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { ProviderContext } from '@/providers/main/provider';
import Link from 'next/link';
import React, { useContext } from 'react';

export const Footer = () => {
  const { state } = useContext(ProviderContext);
  return (
    <div className="mx-10 border-t p-5">
      {!state.isNotMenuma && (
        <FlexBox justify="center" alignItems="center" gap={2}>
          <FlexItem className="text-typography/[.8]">میزبانی شده توسط</FlexItem>
          <FlexItem>
            <Link
              href="https://mtserver.ir"
              target="_blank"
              className="font-bold text-typography"
            >
              MT Server
            </Link>
          </FlexItem>
        </FlexBox>
      )}
    </div>
  );
};
