import React, { useMemo } from 'react';
import { ILogo } from './types';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

export const Logo: ILogo = (props) => {
  return (
    <Link href="/" className="text-[2.5rem] flex items-center">
      <div className="text-primary">منو</div>
      <div className="text-secondary">ما</div>
    </Link>
  );
};
