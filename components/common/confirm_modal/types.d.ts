import { FC } from 'react';

declare interface IConfirmModalProps {
  title?: string;
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  onDismiss?: () => void;
  closeButton?: boolean;
  confirmText?: string;
  dismissText?: string;
  confirmButton?: boolean;
  dismissButton?: boolean;
  content: any;
  outClose?: boolean;
  dangerConfirm?: boolean;
}
declare type IConfirmModal = FC<IConfirmModalProps>;
