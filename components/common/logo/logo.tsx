import React, { useMemo } from 'react';
import { ILogo } from './types';
import Link from '@/components/common/link/link';

export const Logo: ILogo = (props) => {
  return (
    <Link href="/" className="text-[2.5rem] flex items-center font-bold">
      <div className="text-primary">منو</div>
      <div className="text-secondary">ما</div>
    </Link>
  );
};
