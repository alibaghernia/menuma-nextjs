import React, { useMemo } from 'react';
import { IBadge } from './types';
import { FireIcon } from '@/icons/fire';
import { NewIcon } from '@/icons/new';

export const Badge: IBadge = (props) => {
  const typeBadge = useMemo(
    () => ({
      new: (
        // <></>
        <div
          className="
        text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100/[.75] text-green-900 flex items-center text-center"
        >
          <span className="mx-auto">جدید</span>
        </div>
      ),
      hot: (
        <div
          className="
        text-xs font-medium px-2.5 py-0.5 rounded-full bg-red-200/[.75] text-red-900"
        >
          ویژه
        </div>
      ),
      sold_out: (
        <div
          className="
        text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-200/[.75] text-typography flex items-center"
        >
          تمام شده
        </div>
      ),
    }),
    [],
  );
  const badge = useMemo(() => typeBadge[props.type!], [props.type, typeBadge]);
  return badge;
};
