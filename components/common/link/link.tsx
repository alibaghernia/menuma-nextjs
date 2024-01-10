import React, { useContext, useMemo } from 'react';
import { ILink } from './types';
import { FireIcon } from '@/icons/fire';
import { NewIcon } from '@/icons/new';
import { ProviderContext } from '@/providers/main/provider';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';

export const Link: ILink = ({ href, children, className, ...props }) => {
  const { setLoading } = useContext(ProviderContext);
  const router = useRouter();

  return (
    <span
      {...props}
      onClick={() => {
        setLoading(true);
        router.push(href);
      }}
      className={classNames(twMerge('cursor-pointer', className))}
    >
      {children}
    </span>
  );
};
