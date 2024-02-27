import React, { useMemo } from 'react';
import { ICategoryCard } from './types';
import Image from 'next/image';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { useCurrentBreakpoints } from '@/utils/hooks';

export const CategoryCard: ICategoryCard = (props) => {
  const breakpoints = useCurrentBreakpoints();
  const element = useMemo(
    () => (
      <div
        className={twMerge(
          classNames(
            'rounded-[1.625rem] w-[8.7rem] h-[8.7rem] relative block overflow-hidden cursor-pointer transition-all duration-[.2s]',
            {
              'border-4': props.selected,
              'border-more': props.selected,
            },
          ),
          props.className,
        )}
        onClick={props.onClick}
      >
        {props.image && (
          <Image
            width={breakpoints.isXs ? 126 : 140}
            height={breakpoints.isXs ? 126 : 140}
            src={props.image}
            alt={props.title}
            className="z-0 object-cover"
          />
        )}
        <span
          className={classNames('absolute inset-0 z-0', {
            'bg-black/[.4]': props.image,
            'bg-black/[.7]': !props.image,
          })}
        />
        <div
          className={twMerge(
            'text-white text-[1.1rem] font-bold text-center absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-20',
            props.titleClassName,
          )}
        >
          {props.title}
        </div>
      </div>
    ),
    [props],
  );
  return props.url ? <a href={props.url}>{element}</a> : element;
};
