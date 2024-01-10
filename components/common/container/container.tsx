import classNames from 'classnames';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { IContainer } from './types';

export const Container: IContainer = ({
  children,
  position = 'absolute',
  className,
  center,
  centerHorizontal,
  centerVertical,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        classNames(position, {
          'left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]':
            typeof center == 'boolean',
          'left-[50%] translate-x-[-50%]': centerHorizontal,
          'top-[50%] translate-y-[-50%]': centerVertical,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
