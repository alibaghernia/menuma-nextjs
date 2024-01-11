import React, { Fragment } from 'react';
import { IConfirmModal } from './types';
import { FlexBox } from '../flex_box/flex_box';
import { createPortal } from 'react-dom';
import { FlexItem } from '../flex_item/flex_item';
import { Container } from '../container/container';
import classNames from 'classnames';

export const ConfirmModal: IConfirmModal = ({
  closeButton = true,
  confirmButton = true,
  confirmText = 'باشه',
  dismissButton = true,
  dangerConfirm = true,
  outClose = true,
  dismissText = 'بیخیال',
  title,
  open,
  onClose,
  onConfirm,
  onDismiss,
  content,
  children,
}) => {
  if (typeof window == 'undefined') return <div></div>;
  return createPortal(
    <>
      {open && (
        <Container
          position="fixed"
          center
          className="z-[52] p-4 max-w-xs w-full bg-white rounded-[2rem]"
        >
          <FlexBox direction="column" className="gap-6">
            {title && (
              <FlexItem
                grow={false}
                className="text-center font-bold text-[1.2rem]"
              >
                {title}
              </FlexItem>
            )}
            <FlexItem grow>{children || content}</FlexItem>
            <FlexItem grow={false}>
              <FlexBox gap={2}>
                {dismissButton && (
                  <FlexItem
                    className="px-2 py-2 text-center rounded-[2rem] cursor-pointer"
                    onClick={() => {
                      onClose?.();
                      onDismiss?.();
                    }}
                    grow
                  >
                    {dismissText}
                  </FlexItem>
                )}
                {confirmButton && (
                  <FlexItem
                    className={classNames(
                      'px-2 py-2 text-center rounded-[2rem] cursor-pointer',
                      {
                        'bg-red-100 text-red-600': dangerConfirm,
                        'bg-green-100 text-green-600': !dangerConfirm,
                      },
                    )}
                    onClick={onConfirm}
                    grow
                  >
                    {confirmText}
                  </FlexItem>
                )}
              </FlexBox>
            </FlexItem>
          </FlexBox>
        </Container>
      )}
      <Container
        position="fixed"
        className={classNames(
          'inset-0 bg-black/[.2] z-[51] transition-all duration-[.2s]',
          {
            'opacity-0 pointer-events-none': !open,
          },
        )}
        onClick={() => {
          if (outClose) onClose?.();
        }}
      />
    </>,
    document.body.querySelector('main')!,
  );
};
export default ConfirmModal;
