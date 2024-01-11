import React from 'react';
import { IFlexItem } from './types';
import classNames from 'classnames';

export const FlexItem: IFlexItem = ({
  children,
  grow,
  className,
  ...props
}) => {
  return (
    <div
      className={classNames(
        {
          grow: grow,
          'grow-0': !grow && typeof grow != 'undefined',
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
