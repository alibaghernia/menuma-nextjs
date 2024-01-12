import React, { useContext, useMemo } from 'react';
import { ILink } from './types';
import { FireIcon } from '@/icons/fire';
import { NewIcon } from '@/icons/new';
import { ProviderContext } from '@/providers/main/provider';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';
import { useCustomRouter } from '@/utils/hooks';
import { GeneralContext } from '@/providers/general/provider';
import { LOADING_KEYS } from '@/providers/general/contants';

export const Link: ILink = ({ href, children, className, ...props }) => {
  const { addLoading } = useContext(GeneralContext);
  const router = useCustomRouter();

  return (
    <div
      {...props}
      onClick={() => {
        // addLoading(LOADING_KEYS.pageLoading);
        router.push(href);
      }}
      className={classNames(twMerge('cursor-pointer w-fit', className))}
    >
      {children}
    </div>
  );
};
